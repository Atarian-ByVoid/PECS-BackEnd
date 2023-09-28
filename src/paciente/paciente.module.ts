import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PacienteController } from './paciente.controller';
import { PacienteService } from './paciente.service';

@Module({
  controllers: [PacienteController],
  providers: [PacienteService, PrismaService]
})
export class PacienteModule { }
