// import { Transform } from 'class-transformer';
import { PaginateConfig } from 'nestjs-paginate';
import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'courts' })
export class Court extends BaseEntity {
  @Column()
  number: number;

  @Column({ nullable: true })
  // @Transform((value) => {
  //   if (value !== null) {
  //     return value;
  //   }
  // })
  price?: number;
}

export const COURT_PAGINATE_CONFIG: PaginateConfig<Court> = {
  sortableColumns: ['id', 'createdAt', 'updatedAt', 'deletedAt'],
  nullSort: 'last',
  defaultSortBy: [['id', 'DESC']],
  searchableColumns: ['id', 'createdAt', 'updatedAt', 'deletedAt'],
};
