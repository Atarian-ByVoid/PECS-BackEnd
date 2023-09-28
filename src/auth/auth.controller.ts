import { Body, Controller, Post, Put, Param, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDTO } from 'src/usuario/usuario.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import { AuthService } from './auth.service';
import { ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Usuario } from '@prisma/client';
import { AuthUserDTO, UpdateRoleDTO } from './auth.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  async create(@Body() createUsuarioDTO: CreateUsuarioDTO) {
    return await this.authService.create(createUsuarioDTO);
  }


  @Post('login')
  async login(@Body() authUserDTO: AuthUserDTO) {
    try {
      const bearerToken = await this.authService.login(authUserDTO);
      return { token: bearerToken };
    } catch (error) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
  }

  @Put(':id/update-role')
  async updateUserRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDTO) {
    const updatedUser = await this.authService.updateUserRole(id, updateRoleDto.role);

    if (!updatedUser) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }

    return updatedUser;
  }

}
