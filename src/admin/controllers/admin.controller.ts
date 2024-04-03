// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   UseGuards,
// } from '@nestjs/common';
// import { AdminService } from './admin.service';
// import { CreateAdminDto, UpdateAdminDto } from './dto/admin.dto';
// import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// import { Roles } from 'src/auth/decorators/roles.decorator';
// import { Role } from 'src/common/enums/role.enum';
// import { AuthGuard } from 'src/auth/guard/auth-guard';

// @ApiTags('ADMIN')
// @Controller('admin')
// @Roles(Role.ADMIN)
// @UseGuards(AuthGuard)
// @ApiBearerAuth()
// export class AdminController {
//   constructor(private readonly adminService: AdminService) {}

//   @Post()
//   async create(@Body() createAdminDto: CreateAdminDto) {
//     return this.adminService.create(createAdminDto);
//   }

//   @Get()
//   async findAll() {
//     return this.adminService.findAll();
//   }

//   @Get(':id')
//   async findOne(@Param('id') id: string) {
//     return this.adminService.findOneById(id);
//   }

//   @Patch(':id')
//   async update(
//     @Param('id') id: string,
//     @Body() updateAdminDto: UpdateAdminDto,
//   ) {
//     return this.adminService.update(id, updateAdminDto);
//   }

//   @Delete(':id')
//   async remove(@Param('id') id: string) {
//     return this.adminService.remove(id);
//   }
// }
