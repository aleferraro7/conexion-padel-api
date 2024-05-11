import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCourtDto } from './dto/court.dto';
import { CourtsService } from './courts.service';
// import { CourtsServiceInterface } from './courts.service.interface';

@ApiTags('COURTS')
@Controller('courts')
export class CourtsController {
  constructor(
    // @Inject('CourtsServiceInterface')
    // private readonly courtsService: CourtsServiceInterface,
    private readonly courtsService: CourtsService,
  ) {}

  @Post()
  create(@Body() createCourtDto: CreateCourtDto) {
    return this.courtsService.create(createCourtDto);
  }

  @Get()
  findAll() {
    return this.courtsService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.courtsService.findOneById(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: number, @Body() updateCourtDto: UpdateCourtDto) {
  //   return this._courtsService.updateCourt(id, updateCourtDto);
  // }

  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.courtsService.deleteById(id);
  }
}
