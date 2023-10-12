import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreateUsuarioDTO } from 'src/usuario/usuario.dto';
import { AuthUserDTO, UpdateRoleDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(@Body() createUsuarioDTO: CreateUsuarioDTO) {
    try {
      return await this.authService.create(createUsuarioDTO);
    } catch (error) {
      throw new UnauthorizedException('Erro ao cadastrar o usuário');
    }
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
  @ApiSecurity('bearer')
  @UseGuards(JwtAuthGuard)
  async updateUserRole(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDTO,
  ) {
    const updatedUser = await this.authService.updateUserRole(
      id,
      updateRoleDto.role,
    );

    if (!updatedUser) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }

    return updatedUser;
  }
}
