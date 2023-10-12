import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePacienteDTO, UpdatePacienteDTO } from './dto/paciente.dto';

@Injectable()
export class PacienteService {
  constructor(private prismaService: PrismaService) {}

  async createPaciente(data: CreatePacienteDTO) {
    const { nome, documento, idUsuario, diagnostico } = data;

    const paciente = await this.prismaService.paciente.create({
      data: {
        nome,
        documento,
        Usuario: {
          connect: { id: idUsuario },
        },
      },
      select: {
        id: true,
      },
    });

    if (!paciente || !paciente.id) {
      throw new Error('Erro ao criar o paciente');
    }

    const diagnosticoCreateData = diagnostico.map((dto) => {
      const { dataDiagnostico, tratamento, subtipoTEA, gravidadeTEA } = dto;

      if (!dataDiagnostico || !subtipoTEA || !gravidadeTEA) {
        throw new BadRequestException('Dados de diagnóstico incompletos');
      }

      return {
        dataDiagnostico: new Date(dataDiagnostico).toISOString(),
        tratamento,
        subtipoTEA,
        gravidadeTEA,
        pacienteId: paciente.id,
      };
    });

    await this.prismaService.diagnostico.createMany({
      data: diagnosticoCreateData,
    });

    return {
      id: paciente.id,
      ...data,
    };
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

    if (!data || total === 0) {
      throw new NotFoundException(`Nenhum paciente encontado`);
    }
    return {
      data,
      page,
      pageSize,
      totalItems: total,
    };
  }

  async findOne(id: string) {
    const paciente = await this.prismaService.paciente.findFirst({
      where: {
        id,
      },
    });
    if (!paciente) {
      throw new NotFoundException('Paciente não encontrado');
    }
    return {
      data: paciente,
    };
  }
  async deletePaciente(id: string): Promise<void> {
    const now = new Date();
    const paciente = await this.prismaService.paciente.findUnique({
      where: { id },
    });

    if (!paciente) {
      throw new NotFoundException('Paciente não encontrado');
    }

    await this.prismaService.paciente.update({
      where: { id },
      data: {
        deletadoEm: now,
      },
    });

    await this.prismaService.diagnostico.updateMany({
      where: { pacienteId: id },
      data: {
        deletadoEm: now,
      },
    });
  }

  async updatePaciente(id: string, updateData: UpdatePacienteDTO) {
    const { nome, documento, diagnostico } = updateData;

    const paciente = await this.prismaService.paciente.findUnique({
      where: { id },
    });

    if (!paciente) {
      throw new NotFoundException('Paciente não encontrado');
    }

    await this.prismaService.paciente.update({
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
