import { Expose } from 'class-transformer';
// import * as bcrypt from 'bcrypt';
import { PaginateConfig } from 'nestjs-paginate';
import { BaseEntity } from 'src/base/base.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Column, Entity, ManyToMany, OneToOne } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ unique: true })
  @Expose()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Profile, (profile: Profile) => profile.user)
  profile?: Profile;

  @ManyToMany(() => Room, (room: Room) => room.users)
  rooms?: Room[];

  @ManyToMany(() => Room, (room: Room) => room.creator)
  createdRooms?: Room[];
}

// async validatePassword(password: string): Promise<boolean> {
//   return bcrypt.compare(password, this.password);
// }

export const USER_PAGINATE_CONFIG: PaginateConfig<User> = {
  sortableColumns: ['email', 'id', 'createdAt', 'updatedAt', 'deletedAt'],
  nullSort: 'last',
  defaultSortBy: [['id', 'DESC']],
  searchableColumns: ['id', 'createdAt', 'updatedAt', 'deletedAt'],
};
