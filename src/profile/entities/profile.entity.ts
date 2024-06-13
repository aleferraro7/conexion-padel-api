import { PaginateConfig } from 'nestjs-paginate';
import { BaseEntity } from 'src/base/base.entity';
import { User } from 'src/users/repository/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

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

@Entity({ name: 'profiles' })
export class Profile extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  age: number;

  @Column()
  telephone_number: string;

  @Column()
  level?: Level;

  @Column()
  position: Position;

  @OneToOne(() => User, (user) => user.profile, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  user: User;
}

export const PROFILE_PAGINATE_CONFIG: PaginateConfig<Profile> = {
  sortableColumns: [
    'id',
    'createdAt',
    'updatedAt',
    'deletedAt',
    'username',
    'name',
    'lastname',
    'age',
    'telephone_number',
    'level',
    'position',
    'user',
  ],
  nullSort: 'last',
  defaultSortBy: [['id', 'DESC']],
  searchableColumns: [
    'id',
    'createdAt',
    'updatedAt',
    'deletedAt',
    'username',
    'name',
    'lastname',
    'age',
    'telephone_number',
    'level',
    'position',
    'user',
  ],
};
