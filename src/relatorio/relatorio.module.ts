import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { RelatorioController } from './relatorio.controller';
import { RelatorioService } from './relatorio.service';

@Module({
  controllers: [RelatorioController],
  providers: [RelatorioService, PrismaService],
  imports: [PrismaModule],
})
export class RelatorioModule {}
