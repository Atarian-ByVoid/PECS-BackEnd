import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDTO, UpdateUsuarioDTO, UsuarioDTO } from './usuario.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@Controller('usuario')
@ApiTags('Usuario')
@ApiSecurity('bearer')
@UseGuards(JwtAuthGuard)
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return await this.usuarioService.findAll(page, pageSize);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usuarioService.findOne(id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.usuarioService.deleteUser(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUsuarioDTO: UpdateUsuarioDTO,
  ) {
    try {
      const updatedUser = await this.usuarioService.updateUser(id, updateUsuarioDTO);
      if (!updatedUser) {
        throw new NotFoundException(`Usuario com ID ${id} não encontrado`);
      }
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
}
