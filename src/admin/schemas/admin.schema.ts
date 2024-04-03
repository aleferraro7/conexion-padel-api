import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsString } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

@Schema()
export class Admin {
  @Prop({
    required: true,
  })
  username: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  lastname: string;

  @Prop({
    required: true,
  })
  @IsEmail()
  email: string;

  @Prop({
    required: true,
  })
  @IsString()
  password: string;

  @Prop({
    required: true,
  })
  role: Role;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
