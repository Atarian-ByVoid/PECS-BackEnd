import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GravidadeTEA, SubtipoTEA } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class DiagnosticoDTO {
  @ApiPropertyOptional({ required: false })
  @IsOptional()
  dataDiagnostico?: Date;

  @ApiPropertyOptional({ required: false })
  @IsString()
  @IsOptional()
  tratamento?: string | null;

  @ApiProperty({ enum: SubtipoTEA })
  @IsEnum(SubtipoTEA)
  @IsNotEmpty()
  subtipoTEA: SubtipoTEA;

  @ApiProperty({ enum: GravidadeTEA })
  @IsEnum(GravidadeTEA)
  @IsNotEmpty()
  gravidadeTEA: GravidadeTEA;
}

export class CreateDiagnosticoDTO extends DiagnosticoDTO {}
