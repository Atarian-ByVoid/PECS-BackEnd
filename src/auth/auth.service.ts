import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, Role, Usuario } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsuarioDTO } from 'src/usuario/usuario.dto';
import { AuthUserDTO } from './auth.dto';
@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}
  async create(createUsuarioDTO: CreateUsuarioDTO) {
    const { senha, dataNascimento, ...rest } = createUsuarioDTO;

    const createData: Prisma.UsuarioCreateInput = {
      ...rest,
      senha: await bcrypt.hash(senha, 10),
      dataNascimento: new Date(dataNascimento),
    };

    try {
      await this.checkUniqueFields(rest.email, rest.cpf, rest.rg);

      const usuario = await this.prismaService.usuario.create({
        data: createData,
      });

      return {
        statusCode: 200,
        data: usuario,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao criar o usuário: ' + error.message,
      );
    }
  }

  async login(body: AuthUserDTO) {
    const payload = {
      email: body.email,
    };

    const user = await this.validateUser(payload);

    if (!user) {
      throw new UnauthorizedException('Usuário não cadastrado.');
    }

    const isPasswordValid = await bcrypt.compare(body.senha, user.senha);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha incorreta.');
    }

    const secretKey = process.env.JWT_KEY;

    if (user.role) {
      payload['role'] = user.role;
      payload['id'] = user.id;
    }

    return this.jwtService.sign(
      { ...payload, sub: user.id },
      { secret: secretKey },
    );
  }

  async validateUser(payload: any): Promise<Usuario | null> {
    try {
      const { email } = payload;

      const user = await this.prismaService.usuario.findUnique({
        where: {
          email,
        },
      });

      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao validar o usuário: ' + error.message,
      );
    }
  }

  async updateUserRole(userId: string, newRole: Role): Promise<Usuario | null> {
    try {
      const updatedUser = await this.prismaService.usuario.update({
        where: { id: userId },
        data: { role: newRole },
      });

      return updatedUser;
    } catch (error) {
      throw new NotFoundException('Erro ao atualizar o papel do usuário.');
    }
  }

  async checkUniqueFields(
    email: string,
    cpf: string,
    rg: string,
  ): Promise<void> {
    const existingUser = await this.prismaService.usuario.findFirst({
      where: {
        OR: [{ email }, { cpf }, { rg }],
      },
    });

    if (existingUser) {
      throw new Error('Email, CPF ou RG já estão em uso.');
    }
  }
}
