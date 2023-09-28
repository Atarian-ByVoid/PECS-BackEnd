import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePacienteDTO, UpdatePacienteDTO, } from './dto/paciente.dto';


@Injectable()
export class PacienteService {
  constructor(private prismaService: PrismaService) { }

  async createPaciente(data: CreatePacienteDTO) {
    const { dataNascimento, nome, documento, id, diagnostico } = data;

    const user = await this.prismaService.usuario.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    const isoDate = new Date(dataNascimento).toISOString();

    const createData = {
      nome,
      dataNascimento: isoDate,
      documento,
      Usuario: {
        connect: { id: id },
      },
      diagnostico: {
        create: diagnostico.map((dto) => {
          const { dataDiagnostico, tratamento, subtipoTEA, gravidadeTEA } = dto;

          if (!dataDiagnostico || !subtipoTEA || !gravidadeTEA) {
            throw new BadRequestException('Dados de diagnóstico incompletos');
          }
          const isoDate = new Date(dataDiagnostico).toISOString();

          return {
            dataDiagnostico: isoDate,
            tratamento,
            subtipoTEA,
            gravidadeTEA,
          };
        }),
      },
    };

    await this.prismaService.paciente.create({
      data: createData,
    });

    return data;
  }

  async findAll(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      this.prismaService.paciente.findMany({
        skip,
        take: pageSize,
      }),
      this.prismaService.paciente.count(),
    ]);

    return {
      statusCode: 200,
      data,
      page,
      pageSize,
      totalItems: total,
    };
  }

  async findOne(id: string) {
    const dataTask = await this.prismaService.paciente.findFirst({
      where: {
        id,
      },
    });
    return {
      statusCode: 200,
      data: dataTask,
    };
  }
  async deletePaciente(id: string): Promise<void> {
    await this.prismaService.paciente.delete({
      where: {
        id,
      },
    });
  }

  async updatePaciente(id: string, updateData: UpdatePacienteDTO) {
    const { nome, documento, diagnostico } = updateData;

    const existingPaciente = await this.prismaService.paciente.findUnique({
      where: { id },
    });

    if (!existingPaciente) {
      throw new NotFoundException('Paciente não encontrado');
    }

    const updatedPaciente = await this.prismaService.paciente.update({
      where: { id },
      data: {
        nome,
        documento,
      },
    });

    if (diagnostico) {
      await this.prismaService.diagnostico.deleteMany({
        where: { pacienteId: id },
      });

      const diagnosticoCreateData = diagnostico.map((dto) => {
        const { dataDiagnostico, tratamento, subtipoTEA, gravidadeTEA } = dto;

        return {
          dataDiagnostico,
          tratamento,
          subtipoTEA,
          gravidadeTEA,
          pacienteId: id,
        };
      });

      await this.prismaService.diagnostico.createMany({
        data: diagnosticoCreateData,
      });
    }

    return updateData;
  }



}
