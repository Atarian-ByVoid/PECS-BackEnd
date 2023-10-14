import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateRotinaDTO, DeleteManyItensRotina } from './dto/rotina.dto';
import { RotinaService } from './rotina.service';

@Controller('rotina')
@ApiTags('Rotina')
// @ApiSecurity('bearer')
// @UseGuards(JwtAuthGuard)
export class RotinaController {
  constructor(private readonly rotinaService: RotinaService) {}

  @Post()
  create(@Body() createRotinaDTO: CreateRotinaDTO) {
    return this.rotinaService.create(createRotinaDTO);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    try {
      return await this.rotinaService.findAll(page, pageSize);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const rotina = await this.rotinaService.findOne(id);
      if (!rotina) {
        throw new NotFoundException(`Rotina com ID ${id} não encontrada`);
      }
      return rotina;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar a rotina');
    }
  }

  @Delete(':id')
  async deleteRotina(@Param('id') id: string) {
    return await this.rotinaService.deleteRotina(id);
  }

  @Delete(':rotinaId/items')
  async deleteItemsFromRotina(@Body() dto: DeleteManyItensRotina) {
    try {
      await this.rotinaService.deleteItemsFromRotina(dto);
      return { message: 'Itens da rotina excluídos com sucesso' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
