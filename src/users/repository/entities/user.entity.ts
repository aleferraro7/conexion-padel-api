import { Expose } from 'class-transformer';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class User {
  // export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  @Expose()
  email: string;

  // @Column()
  // name: string;

  @Column()
  password: string;

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
