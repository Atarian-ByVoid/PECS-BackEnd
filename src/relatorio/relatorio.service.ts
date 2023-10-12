import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRelatorioDTO, UpdateRelatorioDTO } from './dto/relatorio.dto';

@Injectable()
export class RelatorioService {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateRelatorioDTO) {
    const {
      descricao,
      acoesNecessarias,
      outrasAnotacoes,
      idUsuario,
      idPaciente,
    } = data;

    const paciente = await this.prismaService.paciente.findUnique({
      where: { id: idPaciente },
    });

    if (!paciente || !idPaciente) {
      throw new NotFoundException('Paciente não encontrado');
    }

    const usuario = await this.prismaService.usuario.findUnique({
      where: { id: idUsuario },
    });

    if (!usuario || !idUsuario) {
      throw new NotFoundException('Usuario não encontrado');
    }

    const createData = {
      descricao,
      tipo: data.tipoRelatorio,
      acoesNecessarias,
      outrasAnotacoes,
      Paciente: {
        connect: { id: idPaciente },
      },
      Usuario: {
        connect: { id: idUsuario },
      },
    };

    await this.prismaService.relatorio.create({
      data: createData,
    });
  }

  async findAll(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      this.prismaService.relatorio.findMany({
        skip,
        take: pageSize,
      }),
      this.prismaService.relatorio.count(),
    ]);

    if (!data || total === 0) {
      throw new NotFoundException(`Nenhum relatório encontado`);
    }

    return {
      data,
      page,
      pageSize,
      totalItems: total,
    };
  }
  async findOne(id: string) {
    const relatorio = await this.prismaService.relatorio.findFirst({
      where: {
        id,
      },
    });
    if (!relatorio) {
      throw new NotFoundException('Relatório não encontrado');
    }
    return {
      data: relatorio,
    };
  }

  async deleteRelatorio(id: string): Promise<void> {
    const now = new Date();
    const relatorio = await this.prismaService.relatorio.findUnique({
      where: { id },
    });

    if (!relatorio) {
      throw new NotFoundException('Relatorio não encontrado');
    }

    await this.prismaService.relatorio.update({
      where: { id },
      data: {
        deletadoEm: now,
      },
    });
  }

  async updateRelatorio(
    id: string,
    updateRelatorioDTO: UpdateRelatorioDTO,
  ): Promise<UpdateRelatorioDTO> {
    const user = await this.prismaService.relatorio.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`Relatório com ID ${id} não encontrado`);
    }

    const updatedRelatorioData: { [key: string]: any } = {};

    if (updateRelatorioDTO.acoesNecessarias) {
      updatedRelatorioData.acoesNecessarias =
        updateRelatorioDTO.acoesNecessarias;
    }

    if (updateRelatorioDTO.descricao) {
      updatedRelatorioData.descricao = updateRelatorioDTO.descricao;
    }

    if (updateRelatorioDTO.outrasAnotacoes) {
      updatedRelatorioData.outrasAnotacoes = updateRelatorioDTO.outrasAnotacoes;
    }

    const updatedRelatorio = await this.prismaService.relatorio.update({
      where: { id },
      data: updatedRelatorioData,
    });

    return {
      ...updatedRelatorio,
    };
  }
}
