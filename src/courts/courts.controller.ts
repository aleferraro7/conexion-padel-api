import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CourtsService } from './courts.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCourtDto, UpdateCourtDto } from './dto/court.dto';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';

@ApiTags('COURTS')
@Controller('courts')
export class CourtsController {
  constructor(private readonly _courtsService: CourtsService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  create(@Body() createCourtDto: CreateCourtDto) {
    return this._courtsService.createCourt(createCourtDto);
  }

  @Get()
  findAll() {
    return this._courtsService.getCourts();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this._courtsService.getCourtById(id);
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
