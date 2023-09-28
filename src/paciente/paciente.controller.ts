import { Body, Controller, Post } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { CreatePacienteDTO } from './dto/paciente.dto';
import { PacienteService } from './paciente.service';

@Controller('paciente')
@ApiTags('Paciente')
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) { }

  @Post()
  async create(@Body() data: CreatePacienteDTO) {
    return await this.pacienteService.createPaciente(data);
  }


}
