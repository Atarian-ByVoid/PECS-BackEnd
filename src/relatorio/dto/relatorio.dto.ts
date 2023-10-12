import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { Paciente, TipoRelatorio } from '@prisma/client';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { PacienteDTO } from 'src/paciente/dto/paciente.dto';
import { UsuarioDTO } from 'src/usuario/usuario.dto';

export class RelatorioDTO {
  @ApiPropertyOptional({ required: false })
  @IsString()
  @IsOptional()
  idUsuario?: string;

  @ApiPropertyOptional({ required: false })
  @IsString()
  @IsOptional()
  idPaciente?: string;

  @ApiProperty({ enum: TipoRelatorio })
  @IsEnum(TipoRelatorio)
  @IsNotEmpty()
  tipoRelatorio: TipoRelatorio;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  acoesNecessarias?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  outrasAnotacoes?: string;

  @ApiPropertyOptional({ type: () => [PacienteDTO], required: false })
  @IsArray()
  @IsOptional()
  paciente?: Paciente[];

  @ApiPropertyOptional({ type: () => [UsuarioDTO], required: false })
  @IsArray()
  @IsOptional()
  usuarios?: UsuarioDTO[];
}

export class CreateRelatorioDTO extends OmitType(RelatorioDTO, [
  'usuarios',
  'paciente',
]) {}

export class UpdateRelatorioDTO extends OmitType(RelatorioDTO, [
  'usuarios',
  'paciente',
  'idPaciente',
  'idUsuario',
  'tipoRelatorio',
]) {}
