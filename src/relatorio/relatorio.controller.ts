import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { CreateRelatorioDTO, UpdateRelatorioDTO } from './dto/relatorio.dto';
import { RelatorioService } from './relatorio.service';

@Controller('relatorio')
@ApiTags('Relatório')
@ApiSecurity('bearer')
@UseGuards(JwtAuthGuard)
export class RelatorioController {
  constructor(private readonly relatorioService: RelatorioService) {}

  @Post()
  async create(@Body() createRelatorioDTO: CreateRelatorioDTO) {
    try {
      await this.relatorioService.create(createRelatorioDTO);

      return { message: `Relatório criado com sucesso` };
    } catch (error) {
      throw new InternalServerErrorException('Erro ao criar o relatório');
    }
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    try {
      return await this.relatorioService.findAll(page, pageSize);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const relatorio = await this.relatorioService.findOne(id);
      if (!relatorio) {
        throw new NotFoundException(`Relatório com ID ${id} não encontrado`);
      }
      return relatorio;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar o relatório');
    }
  }

  @Delete(':id')
  async deleteRelatorio(@Param('id') id: string) {
    return await this.relatorioService.deleteRelatorio(id);
  }

  @Put(':id')
  async updatePaciente(
    @Param('id') id: string,
    @Body() updateRelatorioDTO: UpdateRelatorioDTO,
  ) {
    try {
      const updatedRelatorio = await this.relatorioService.updateRelatorio(
        id,
        updateRelatorioDTO,
      );
      if (!updatedRelatorio) {
        throw new NotFoundException(`Relatório com ID ${id} não encontrado`);
      }
      return updatedRelatorio;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao atualizar o relatório');
    }
  }
}
