// import { MaxLength, MinLength } from 'class-validator';
import { PaginateConfig } from 'nestjs-paginate';
import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'rooms' })
export class Room extends BaseEntity {
  @Column()
  name: string;
}

export const ROOM_PAGINATE_CONFIG: PaginateConfig<Room> = {
  sortableColumns: ['name', 'id', 'createdAt', 'updatedAt', 'deletedAt'],
  nullSort: 'last',
  defaultSortBy: [['id', 'DESC']],
  searchableColumns: ['name', 'id', 'createdAt', 'updatedAt', 'deletedAt'],
};
