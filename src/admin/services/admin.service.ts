// import { BadRequestException, Injectable } from '@nestjs/common';
// import { Admin } from './schemas/admin.schema';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { CreateAdminDto, UpdateAdminDto } from './dto/admin.dto';
// import * as bcryptjs from 'bcryptjs';

// @Injectable()
// export class AdminService {
//   constructor(
//     @InjectModel(Admin.name) private readonly adminService: Model<Admin>,
//   ) {}
//   async create({ password, ...createAdminDto }: CreateAdminDto) {
//     const admin = await this.findOneByEmail(createAdminDto.email);

//     if (admin) {
//       throw new BadRequestException('The admin already exists');
//     }

//     await this.adminService.create({
//       ...createAdminDto,
//       password: await bcryptjs.hash(password, 10),
//     });
//     const newAdmin = new this.adminService(createAdminDto);
//     return await newAdmin.save();
//   }

//   async findAll() {
//     return await this.adminService.find();
//   }

//   async findOneById(id: string) {
//     return await this.adminService.findById(id);
//   }

//   async update(id: string, updateAdminDto: UpdateAdminDto) {
//     return await this.adminService.findByIdAndUpdate(id, updateAdminDto);
//   }

//   async remove(id: string) {
//     return await this.adminService.findByIdAndDelete(id);
//   }

//   async findOneByEmail(email: string) {
//     return await this.adminService.findOne({ email });
//   }

//   async findByEmailWithPassword(email) {
//     return this.adminService.findOne({
//       where: { email },
//       select: ['id', 'email', 'role', 'name', 'password'],
//     });
//   }
// }
