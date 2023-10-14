import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {
  CreateDiagnosticoDTO,
  DiagnosticoDTO,
} from 'src/diagnostico/dto/diagnostico.dto';
import { RelatorioDTO } from 'src/relatorio/dto/relatorio.dto';
import { RotinaDTO } from 'src/rotina/dto/rotina.dto';
import { UsuarioDTO } from 'src/usuario/usuario.dto';

export class PacienteDTO {
  @ApiPropertyOptional({ required: false })
  @IsString()
  @IsOptional()
  idUsuario?: string;

  @ApiPropertyOptional({ required: false })
  @IsOptional()
  dataNascimento?: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  documento: string;

  @ApiPropertyOptional({ type: () => [DiagnosticoDTO], required: false })
  @IsArray()
  @IsOptional()
  diagnostico?: DiagnosticoDTO[];

  @ApiPropertyOptional({ type: () => [UsuarioDTO], required: false })
  @IsArray()
  @IsOptional()
  usuarios?: UsuarioDTO[];

  @ApiPropertyOptional({ type: [RelatorioDTO] })
  relatorio: RelatorioDTO[];

  @ApiPropertyOptional({ type: [RotinaDTO] })
  rotina: RotinaDTO[];
}

export class CreatePacienteDTO extends OmitType(PacienteDTO, [
  'usuarios',
  'relatorio',
  'diagnostico',
  'rotina',
]) {
  @ApiProperty({ type: () => [CreateDiagnosticoDTO], required: false })
  @IsArray()
  @IsOptional()
  diagnostico?: CreateDiagnosticoDTO[];
}

export class UpdatePacienteDTO extends OmitType(CreatePacienteDTO, [
  'idUsuario',
]) {}
