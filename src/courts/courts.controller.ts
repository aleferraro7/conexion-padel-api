import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
} from '@nestjs/common';
import { CourtsService } from './courts.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCourtDto, UpdateCourtDto } from './dto/court.dto';
import { FindOneParams } from 'src/utils/find-one-params';
import { CourtsServiceInterface } from './courts.service.interface';

@ApiTags('COURTS')
@Controller('courts')
export class CourtsController {
  // constructor(private readonly _courtsService: CourtsService) {}
  constructor(
    @Inject('CourtsServiceInterface')
    private readonly courtsService: CourtsServiceInterface,
  ) {}

  @Post()
  create(@Body() createCourtDto: CreateCourtDto) {
    return this.courtsService.create(createCourtDto);
  }

  @Get()
  findAll() {
    return this.courtsService.findAll();
  }

  // @Get(':id')
  // findOneById(@Param('id') id: number) {
  //   return this.courtsService.findOneById(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: number, @Body() updateCourtDto: UpdateCourtDto) {
  //   return this._courtsService.updateCourt(id, updateCourtDto);
  // }

  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.courtsService.deleteById(id);
  }
}
