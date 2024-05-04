import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CourtsService } from './courts.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCourtDto, UpdateCourtDto } from './dto/court.dto';
import { FindOneParams } from 'src/utils/find-one-params';

@ApiTags('COURTS')
@Controller('courts')
export class CourtsController {
  constructor(private readonly _courtsService: CourtsService) {}

  @Post()
  create(@Body() createCourtDto: CreateCourtDto) {
    return this._courtsService.createCourt(createCourtDto);
  }

  @Get()
  findAll() {
    return this._courtsService.getCourts();
  }

  @Get(':id')
  findOne(@Param() { id }: FindOneParams) {
    return this._courtsService.getCourtById(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCourtDto: UpdateCourtDto) {
    return this._courtsService.updateCourt(id, updateCourtDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this._courtsService.deleteCourt(id);
  }
}
