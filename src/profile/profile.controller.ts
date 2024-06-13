import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateProfileDto, UpdateProfileDto } from './dto/profile.dto';
import { PROFILE_PAGINATE_CONFIG, Profile } from './entities/profile.entity';
import {
  ApiOkPaginatedResponse,
  ApiPaginationQuery,
  Paginate,
  PaginateQuery,
  Paginated,
} from 'nestjs-paginate';

@ApiTags('PROFILES')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  create(@Body() createProfileDto: CreateProfileDto): Promise<Profile> {
    return this.profileService.create(createProfileDto);
  }

  @Get()
  @ApiOkPaginatedResponse(Profile, PROFILE_PAGINATE_CONFIG)
  @ApiPaginationQuery(PROFILE_PAGINATE_CONFIG)
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Profile>> {
    return this.profileService.findAll(query);
  }

  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.profileService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.profileService.deleteById(id);
  }
}
