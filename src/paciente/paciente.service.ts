import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePacienteDTO, UpdatePacienteDTO } from './dto/paciente.dto';


@Injectable()
export class PacienteService {
  constructor(private prismaService: PrismaService) { }


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

  // async createPaciente(data: CreatePacienteDTO) {
  //   const { dataNascimento, nome, documento, idUsuario, diagnostico } = data;

  //   const user = await this.prismaService.usuario.findUnique({
  //     where: { id: idUsuario },
  //   });

  //   if (!user) {
  //     throw new NotFoundException('Usuário não encontrado');
  //   }
  //   const isoDate = new Date(dataNascimento).toISOString();

  //   const createData = {
  //     nome,
  //     dataNascimento: isoDate,
  //     documento,
  //     Usuario: {
  //       connect: { id: idUsuario },
  //     },
  //     diagnostico: {
  //       create: diagnostico.map((dto) => {
  //         const { dataDiagnostico, tratamento, subtipoTEA, gravidadeTEA } = dto;

  //         if (!dataDiagnostico || !subtipoTEA || !gravidadeTEA) {
  //           throw new BadRequestException('Dados de diagnóstico incompletos');
  //         }
  //         const isoDate = new Date(dataDiagnostico).toISOString();

  //         return {
  //           dataDiagnostico: isoDate,
  //           tratamento,
  //           subtipoTEA,
  //           gravidadeTEA,
  //         };
  //       }),
  //     },
  //   };

  //   await this.prismaService.paciente.create({
  //     data: createData,
  //   });

  //   return data;
  // }

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
    const now = new Date();
    const existingPaciente = await this.prismaService.paciente.findUnique({
      where: { id },
    });

    if (!existingPaciente) {
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

    const existingPaciente = await this.prismaService.paciente.findUnique({
      where: { id },
    });

    if (!existingPaciente) {
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
