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
import { CreatePacienteDTO, UpdatePacienteDTO } from './dto/paciente.dto';
import { PacienteService } from './paciente.service';

@Controller('paciente')
@ApiTags('Paciente')
@ApiSecurity('bearer')
@UseGuards(JwtAuthGuard)
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @Post()
  async create(@Body() data: CreatePacienteDTO) {
    try {
      await this.pacienteService.createPaciente(data);

      return { message: `Paciente criado com sucesso` };
    } catch (error) {
      throw new InternalServerErrorException('Erro ao criar o paciente');
    }
  }

  @Put(':id')
  async updatePaciente(
    @Param('id') id: string,
    @Body() udpatePacienteDTO: UpdatePacienteDTO,
  ) {
    try {
      const updatedPaciente = await this.pacienteService.updatePaciente(
        id,
        udpatePacienteDTO,
      );
      if (!updatedPaciente) {
        throw new NotFoundException(`Paciente com ID ${id} não encontrado`);
      }
      return updatedPaciente;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao atualizar o paciente');
    }
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
      const paciente = await this.pacienteService.findOne(id);
      if (!paciente) {
        throw new NotFoundException(`Paciente com ID ${id} não encontrado`);
      }
      return paciente;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar o paciente');
    }
  }

  @Delete(':id')
  async deletePaciente(@Param('id') id: string) {
    try {
      await this.pacienteService.deletePaciente(id);

      return { message: `Paciente com ID ${id} foi excluído com sucesso` };
    } catch (error) {
      throw new InternalServerErrorException('Erro ao excluir o paciente');
    }
  }
}
