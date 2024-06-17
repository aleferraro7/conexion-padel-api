import { MaxLength, MinLength } from 'class-validator';
import { PaginateConfig } from 'nestjs-paginate';
import { BaseEntity } from 'src/base/base.entity';
import { User } from 'src/users/repository/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity({ name: 'rooms' })
export class Room extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.createdRooms)
  creator: User;

  @ManyToMany(() => User, (user) => user.rooms)
  @JoinTable()
  @MinLength(1)
  @MaxLength(4)
  users: User[];
}

export const ROOM_PAGINATE_CONFIG: PaginateConfig<Room> = {
  sortableColumns: [
    'name',
    'id',
    'creator',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ],
  nullSort: 'last',
  defaultSortBy: [['id', 'DESC']],
  searchableColumns: [
    'name',
    'id',
    'creator',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ],
};
