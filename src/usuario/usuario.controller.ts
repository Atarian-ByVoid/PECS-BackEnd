import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { UpdateUsuarioDTO } from './usuario.dto';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
@ApiTags('Usuario')
@ApiSecurity('bearer')
@UseGuards(JwtAuthGuard)
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return await this.usuarioService.findAll(page, pageSize);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.usuarioService.findOne(id);
      if (!user) {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar o usuário');
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    try {
      await this.usuarioService.deleteUser(id);

      return { message: `Usuário com ID ${id} foi excluído com sucesso` };
    } catch (error) {
      throw new InternalServerErrorException('Erro ao excluir o usuário');
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUsuarioDTO: UpdateUsuarioDTO,
  ) {
    try {
      const updatedUser = await this.usuarioService.updateUser(
        id,
        updateUsuarioDTO,
      );
      if (!updatedUser) {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
      }
      return updatedUser;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao atualizar o usuário');
    }
  }
}
