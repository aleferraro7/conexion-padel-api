import { Expose } from 'class-transformer';
// import * as bcrypt from 'bcrypt';
import { PaginateConfig } from 'nestjs-paginate';
import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  // @PrimaryGeneratedColumn()
  // id?: number;

  @Column({ unique: true })
  @Expose()
  email: string;

  @Column()
  password: string;

  // async validatePassword(password: string): Promise<boolean> {
  //   return bcrypt.compare(password, this.password);
  // }
}

export const USER_PAGINATE_CONFIG: PaginateConfig<User> = {
  sortableColumns: ['email', 'id', 'createdAt', 'updatedAt', 'deletedAt'],
  nullSort: 'last',
  defaultSortBy: [['id', 'DESC']],
  searchableColumns: ['id', 'createdAt', 'updatedAt', 'deletedAt'],
};
