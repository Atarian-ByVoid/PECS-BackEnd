import { ApiProperty, ApiPropertyOptional, OmitType } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString } from "class-validator";
import { CreateDiagnosticoDTO, DiagnosticoDTO } from "src/diagnostico/dto/diagnostico.dto";
import { UsuarioDTO } from "src/usuario/usuario.dto";

export class PacienteDTO {

  @ApiPropertyOptional({ required: false })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  dataNascimento?: Date;

  @ApiProperty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsString()
  documento: string;

  @ApiProperty({ type: () => [DiagnosticoDTO], required: false })
  @IsArray()
  @IsOptional()
  diagnostico?: DiagnosticoDTO[];

  @ApiProperty({ type: () => [UsuarioDTO], required: false })
  @IsArray()
  @IsOptional()
  usuarios?: UsuarioDTO[];
}

export class CreatePacienteDTO extends OmitType(PacienteDTO, ['usuarios', 'diagnostico']) {

  @ApiProperty({ type: () => [CreateDiagnosticoDTO], required: false })
  @IsArray()
  @IsOptional()
  diagnostico?: CreateDiagnosticoDTO[];
}

export class UpdatePacienteDTO extends OmitType(CreatePacienteDTO, ['id']) { }