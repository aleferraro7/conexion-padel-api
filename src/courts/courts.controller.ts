import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCourtDto, UpdateCourtDto } from './dto/court.dto';
import { CourtsService } from './courts.service';
import { COURT_PAGINATE_CONFIG, Court } from './entities/court.entity';
import {
  ApiOkPaginatedResponse,
  ApiPaginationQuery,
  Paginate,
  PaginateQuery,
  Paginated,
} from 'nestjs-paginate';

@ApiTags('COURTS')
@Controller('courts')
export class CourtsController {
  constructor(private readonly courtsService: CourtsService) {}

  @Post()
  create(@Body() createCourtDto: CreateCourtDto): Promise<Court> {
    return this.courtsService.create(createCourtDto);
  }

  @Get()
  @ApiOkPaginatedResponse(Court, COURT_PAGINATE_CONFIG)
  @ApiPaginationQuery(COURT_PAGINATE_CONFIG)
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Court>> {
    return this.courtsService.findAll(query);
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
  async deleteById(@Param('id') id: number) {
    return this.courtsService.deleteById(id);
  }
}
