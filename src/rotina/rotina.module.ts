import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { RotinaController } from './rotina.controller';
import { RotinaService } from './rotina.service';

@Module({
  controllers: [RotinaController],
  providers: [RotinaService, PrismaService],
  imports: [PrismaModule],
})
export class RotinaModule {}
