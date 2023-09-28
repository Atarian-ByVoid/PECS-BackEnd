import { ApiProperty } from "@nestjs/swagger";
import { GravidadeTEA, SubtipoTEA } from "@prisma/client";
import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";

export class DiagnosticoDTO {

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  dataDiagnostico?: string;

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
