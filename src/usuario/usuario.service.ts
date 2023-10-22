import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUsuarioDTO } from './usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      this.prisma.usuario.findMany({
        skip,
        take: pageSize,
      }),
      this.prisma.usuario.count(),
    ]);

    if (!data || total === 0) {
      throw new NotFoundException(`Nenhum usuario encontado`);
    }

    return {
      data,
      page,
      pageSize,
      totalItems: total,
    };
  }

  async findOne(id: string) {
    const dataUsuario = await this.prisma.usuario.findFirst({
      where: {
        id,
      },
    });
    if (!dataUsuario) {
      throw new NotFoundException(`Usuario com ID ${id} não encontrado`);
    }
    return dataUsuario;
  }

  async deleteUser(id: string): Promise<void> {
    const now = new Date();
    await this.prisma.usuario.update({
      where: {
        id,
      },
      data: {
        deletadoEm: now,
      },
    });
  }

  async updateUser(
    id: string,
    updateUsuarioDTO: UpdateUsuarioDTO,
  ): Promise<UpdateUsuarioDTO> {
    const user = await this.prisma.usuario.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario com ID ${id} não encontrado`);
    }

    const updatedUserData: { [key: string]: any } = {};

    if (updateUsuarioDTO.nome) {
      updatedUserData.nome = updateUsuarioDTO.nome;

      if (updateUsuarioDTO.telefone) {
        updatedUserData.telefone = updateUsuarioDTO.telefone;
      }
      if (updateUsuarioDTO.cidade) {
        updatedUserData.cidade = updateUsuarioDTO.cidade;
      }
      if (updateUsuarioDTO.uf) {
        updatedUserData.uf = updateUsuarioDTO.uf;
      }
      if (updateUsuarioDTO.logradouro) {
        updatedUserData.logradouro = updateUsuarioDTO.logradouro;
      }
      const updatedUser = await this.prisma.usuario.update({
        where: { id },
        data: updatedUserData,
      });

      return {
        ...updatedUser,
      };
    }
  }
}
