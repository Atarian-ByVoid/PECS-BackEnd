import { ApiProperty, PickType } from '@nestjs/swagger';
import { Role, Usuario, } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { UsuarioDTO } from 'src/usuario/usuario.dto';

export class AuthUserDTO extends PickType(UsuarioDTO, ['email', 'senha']) { }

export class BearerTokenDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  bearerToken: string;
}

export class JWTPayloadDTO extends PickType(UsuarioDTO, ['id', 'email']) {
  constructor(user: Usuario) {
    super();

    this.id = user.id;
    this.email = user.email;
  }
}

export class UpdateRoleDTO extends PickType(UsuarioDTO, ['role']) {
  @ApiProperty({
    type: Role,
    enum: Role,
    description: 'O novo papel do usuario',
    example: Role.ADMIN,
  })
  @IsEnum(Role, { message: 'O papel do usuario deve ser um valor válido' })
  @IsNotEmpty({ message: 'O papel do usuario não pode ser vazio' })
  role: Role;
}
