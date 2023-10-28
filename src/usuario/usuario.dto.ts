import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { PacienteDTO } from 'src/paciente/dto/paciente.dto';
import { RelatorioDTO } from 'src/relatorio/dto/relatorio.dto';
import { RotinaDTO } from 'src/rotina/dto/rotina.dto';

export class UsuarioDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsStrongPassword()
  senha: string;

  @ApiProperty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsString()
  telefone: string;

  // @ApiProperty()
  // @IsString()
  // cpf: string;

  // @ApiProperty()
  // @IsString()
  // rg: string;

  @ApiProperty()
  dataNascimento: Date;

  // @ApiProperty()
  // @IsString()
  // logradouro: string;

  // @ApiProperty()
  // @IsString()
  // uf: string;

  // @ApiProperty()
  // @IsString()
  // bairro: string;

  // @ApiProperty()
  // @IsString()
  // cidade: string;

  @ApiProperty()
  @IsString()
  username: string;

  // @ApiProperty()
  // @IsString()
  // imageUrl: string;

  // @ApiProperty({ enum: Genero })
  // @IsEnum(Genero)
  // genero: Genero;

  @ApiPropertyOptional({ enum: Role })
  @IsEnum(Role)
  role: Role;

  @ApiPropertyOptional({ type: [PacienteDTO] })
  paciente: PacienteDTO[];

  @ApiPropertyOptional({ type: [RelatorioDTO] })
  relatorio: RelatorioDTO[];

  @ApiPropertyOptional({ type: [RotinaDTO] })
  rotina: RotinaDTO[];
}

export class CreateUsuarioDTO extends OmitType(UsuarioDTO, [
  'role',
  'id',
  // 'imageUrl',
  'paciente',
  'relatorio',
  'rotina',
]) {}
export class UpdateUsuarioDTO extends OmitType(UsuarioDTO, [
  'role',
  'senha',
  // 'cpf',
  // 'rg',
  'email',
  'dataNascimento',
  'id',
  // 'imageUrl',
  'paciente',
  'relatorio',
  'rotina',
]) {}

export class FindAllUsuariosDTO extends UsuarioDTO {}
