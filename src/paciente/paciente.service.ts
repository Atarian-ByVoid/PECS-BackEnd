import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePacienteDTO } from './dto/paciente.dto';


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

    const paciente = await this.prismaService.paciente.create({
      data: createData,
    });

    return data;
  }



}
