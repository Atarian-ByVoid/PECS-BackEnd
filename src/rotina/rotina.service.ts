import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRotinaDTO, DeleteManyItensRotina } from './dto/rotina.dto';

@Injectable()
export class RotinaService {
  constructor(private prismaService: PrismaService) {}

  async create(createRotinaDTO: CreateRotinaDTO) {
    const { pacienteId, usuarioId } = createRotinaDTO;

    const [paciente, usuario] = await Promise.all([
      this.prismaService.paciente.findUnique({
        where: { id: pacienteId },
      }),
      this.prismaService.usuario.findUnique({
        where: { id: usuarioId },
      }),
    ]);

    if (!paciente) {
      throw new NotFoundException('Paciente não encontrado');
    }

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const { itens, descricao, nome } = createRotinaDTO;

    const rotina = await this.prismaService.rotina.create({
      data: {
        nome,
        descricao,
        usuario: { connect: { id: usuarioId } },
        paciente: { connect: { id: pacienteId } },
        itens: {
          create: itens.map((item) => ({
            hora: item.hora,
            descricao: item.descricao,
          })),
        },
      },
      include: { itens: true },
    });

    return rotina;
  }

  async findAll(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      this.prismaService.rotina.findMany({
        skip,
        take: pageSize,
        include: {
          itens: true,
        },
      }),
      this.prismaService.rotina.count(),
    ]);

    if (!data || total === 0) {
      throw new NotFoundException(`Nenhuma rotina encontrada`);
    }

    return {
      data,
      page,
      pageSize,
      totalItems: total,
    };
  }

  async findOne(id: string) {
    const rotina = await this.prismaService.rotina.findFirst({
      where: {
        id,
      },
      include: {
        itens: true,
      },
    });
    if (!rotina) {
      throw new NotFoundException('Relatório não encontrado');
    }
    return {
      data: rotina,
    };
  }

  async deleteRotina(id: string): Promise<void> {
    const now = new Date();

    await this.prismaService.itemRotina.updateMany({
      where: { rotinaId: id },
      data: {
        deletadoEm: now,
      },
    });

    await this.prismaService.rotina.update({
      where: { id },
      data: {
        deletadoEm: now,
      },
    });
  }

  async deleteItemsFromRotina(dto: DeleteManyItensRotina) {
    const { rotinaId, itemIds } = dto;

    const rotina = await this.prismaService.rotina.findUnique({
      where: { id: rotinaId },
    });

    if (!rotina) {
      throw new NotFoundException('Rotina não encontrada');
    }

    const itensDaRotina = await this.prismaService.rotina
      .findUnique({
        where: { id: rotinaId },
      })
      .itens();

    const itemIdsDaRotina = itensDaRotina.map((item) => item.id);

    const itemsNotInRotina = itemIds.filter((itemId) => {
      return !itemIdsDaRotina.includes(itemId);
    });

    if (itemsNotInRotina.length > 0) {
      throw new NotFoundException('Alguns itens não pertencem à rotina');
    }

    await this.prismaService.itemRotina.updateMany({
      where: {
        rotinaId,
        id: { in: itemIds },
      },
      data: {
        deletadoEm: new Date(),
      },
    });
  }
}
