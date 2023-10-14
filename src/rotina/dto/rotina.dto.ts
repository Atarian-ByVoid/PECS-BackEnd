import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { PacienteDTO } from 'src/paciente/dto/paciente.dto';
import { UsuarioDTO } from 'src/usuario/usuario.dto';

export class ItemRotinaDTO {
  @ApiProperty()
  @IsDateString()
  hora: Date;

  @ApiProperty()
  @IsString()
  descricao: string;
}

export class RotinaDTO {
  @ApiPropertyOptional({ required: false })
  @IsString()
  @IsOptional()
  usuarioId?: string;

  @ApiPropertyOptional({ required: false })
  @IsString()
  @IsOptional()
  pacienteId?: string;

  @ApiProperty()
  @IsString()
  nome: string;

  @ApiPropertyOptional()
  @IsString()
  descricao?: string;

  @ApiPropertyOptional({ type: [UsuarioDTO] })
  usuario: UsuarioDTO[];

  @ApiPropertyOptional({ type: [PacienteDTO] })
  paciente: PacienteDTO[];

  @ApiPropertyOptional({ type: [ItemRotinaDTO] })
  itens: ItemRotinaDTO[];
}

export class CreateRotinaDTO extends OmitType(RotinaDTO, [
  'usuario',
  'paciente',
]) {}
export class UpdateRotinaDTO extends OmitType(RotinaDTO, [
  'usuario',
  'paciente',
  'usuarioId',
  'pacienteId',
]) {}

export class DeleteManyItensRotina {
  @ApiProperty()
  @IsArray()
  @IsUUID('4', { each: true })
  itemIds: string[];

  @ApiProperty()
  @IsString()
  rotinaId: string;
}
