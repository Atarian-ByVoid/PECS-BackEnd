import { ApiProperty } from "@nestjs/swagger";
import { GravidadeTEA, SubtipoTEA } from "@prisma/client";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class DiagnosticoDTO {

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  idDiagnostico?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  dataDiagnostico?: Date;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  tratamento?: string | null;

  @ApiProperty({ enum: SubtipoTEA })
  @IsEnum(SubtipoTEA)
  subtipoTEA: SubtipoTEA;

  @ApiProperty({ enum: GravidadeTEA })
  @IsEnum(GravidadeTEA)
  gravidadeTEA: GravidadeTEA;


}

export class CreateDiagnosticoDTO extends DiagnosticoDTO {

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  idDiagnostico?: string;
}
