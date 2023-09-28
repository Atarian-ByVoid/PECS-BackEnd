import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDateString, IsInt, IsOptional, IsString } from "class-validator";
import { DiagnosticoDTO } from "src/diagnostico/dto/diagnostico.dto";
import { UsuarioDTO } from "src/usuario/usuario.dto";

export class PacienteDTO {

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  id?: number;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  dataNascimento?: string | null;

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