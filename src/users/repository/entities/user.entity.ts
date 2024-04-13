import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// export enum Gender {
//   MALE = 'MALE',
//   FEMALE = 'FEMALE',
//   NON_BINARY = 'NON BINARY',
//   OTHER = 'OTHER',
// }

// export enum Position {
//   DRIVE = 'DRIVE',
//   REVES = 'REVES',
//   BOTH = 'BOTH',
// }

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  // @CreateDateColumn({
  //   name: 'creation_at',
  //   type: 'timestamptz',
  //   default: () => 'CURRENT_TIMESTAMP',
  // })
  // creationAt: Date;

  // @Column()
  // name: string;

  // @Column()
  // lastname: string;

  // @Column()
  // age: number;

  // @Column()
  // country: string;

  // @Column()
  // city: string;

  // @Column()
  // telephone_number: string;

  // @Column()
  // level: number;

  // @Column()
  // gender: Gender;

  // @Column()
  // position: Position;
}
