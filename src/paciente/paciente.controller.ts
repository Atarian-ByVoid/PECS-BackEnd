import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { CreatePacienteDTO, UpdatePacienteDTO } from './dto/paciente.dto';
import { PacienteService } from './paciente.service';

@Controller('paciente')
@ApiTags('Paciente')
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @Post()
  async create(@Body() data: CreatePacienteDTO) {
    return await this.pacienteService.createPaciente(data);
  }

  @Put(':id')
  async updatePaciente(
    @Param('id') id: string,
    @Body() updateData: UpdatePacienteDTO,
  ) {
    return this.pacienteService.updatePaciente(id, updateData);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    try {
      return await this.pacienteService.findAll(page, pageSize);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.pacienteService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    return await this.pacienteService.deletePaciente(id);
  }
}
