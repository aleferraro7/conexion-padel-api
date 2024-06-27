import { Expose } from 'class-transformer';
// import * as bcrypt from 'bcrypt';
import { PaginateConfig } from 'nestjs-paginate';
import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

export enum Position {
  DRIVE = 'DRIVE',
  REVES = 'REVES',
  BOTH = 'BOTH',
}

export enum Level {
  '1,00' = '1,00',
  '1,25' = '1,25',
  '1,50' = '1,50',
  '1,75' = '1,75',
  '2,00' = '2,00',
  '2,25' = '2,25',
  '2,50' = '2,50',
  '2,75' = '2,75',
  '3,00' = '3,00',
  '3,25' = '3,25',
  '3,50' = '3,50',
  '3,75' = '3,75',
  '4,00' = '4,00',
  '4,25' = '4,25',
  '4,50' = '4,50',
  '4,75' = '4,75',
  '5,00' = '5,00',
  '5,25' = '5,25',
  '5,50' = '5,50',
  '5,75' = '5,75',
  '6,00' = '6,00',
}

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ unique: true })
  @Expose()
  email: string;

  @Column()
  password: string;

  @Column()
  username?: string;

  @Column()
  name?: string;

  @Column()
  lastname?: string;

  @Column()
  age?: number;

  @Column({ nullable: true })
  telephone_number?: string;

  @Column()
  level?: Level;

  @Column()
  position?: Position;

  // async validatePassword(password: string): Promise<boolean> {
  //   return bcrypt.compare(password, this.password);
  // }
}

export const USER_PAGINATE_CONFIG: PaginateConfig<User> = {
  sortableColumns: ['id', 'createdAt', 'updatedAt', 'deletedAt'],
  nullSort: 'last',
  defaultSortBy: [['id', 'DESC']],
  searchableColumns: ['id', 'createdAt', 'updatedAt', 'deletedAt', 'email'],
};
