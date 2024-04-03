import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNumber, IsString } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/common/enums/role.enum';

export type UserDocument = HydratedDocument<User>;

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  NON_BINARY = 'NON BINARY',
  OTHER = 'OTHER',
}

export enum Position {
  DRIVE = 'DRIVE',
  REVES = 'REVES',
  BOTH = 'BOTH',
}

@Schema()
export class User {
  @Prop({
    required: true,
  })
  @IsString()
  username: string;

  @Prop({
    required: true,
  })
  @IsString()
  name: string;

  @Prop({
    required: true,
  })
  @IsString()
  lastname: string;

  @Prop({
    required: true,
  })
  @IsNumber()
  age: number;

  @Prop({
    required: true,
  })
  city: string;

  @Prop({
    required: true,
  })
  community: string;

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
  gender: Gender;

  @Prop({
    required: true,
  })
  @IsNumber()
  telephone_number: number;

  @Prop({
    required: true,
  })
  @IsNumber()
  level: number;

  @Prop({
    required: true,
  })
  position: Position;

  @Prop({
    required: true,
  })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
