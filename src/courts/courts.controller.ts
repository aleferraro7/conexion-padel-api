import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CourtDto, CreateCourtDto, UpdateCourtDto } from './dto/court.dto';
import { CourtsService } from './courts.service';
import { Court } from './entities/court.entity';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { ApiPaginatedResponse } from 'src/common/decorators/paginated-response.decorator';

@ApiTags('COURTS')
@Controller('courts')
export class CourtsController {
  constructor(private readonly courtsService: CourtsService) {}

  @Post()
  create(@Body() createCourtDto: CreateCourtDto): Promise<Court> {
    return this.courtsService.create(createCourtDto);
  }

  // @Get()
  // findAll() {
  //   return this.courtsService.findAll();
  // }

  @Get()
  @ApiPaginatedResponse(CourtDto)
  findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<CourtDto>> {
    return this.courtsService.findAll(pageOptionsDto);
  }

  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.courtsService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCourtDto: UpdateCourtDto) {
    return this.courtsService.update(id, updateCourtDto);
  }

  @Delete(':id')
  softDeleteById(@Param('id') id: number) {
    return this.courtsService.softDeleteById(id);
  }
}
