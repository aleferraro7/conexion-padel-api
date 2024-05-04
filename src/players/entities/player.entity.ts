import {
  Column,
  // CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

export enum Level {
  '1,00' = '1,00',
  '1,50' = '1,50',
  '2,00' = '2,00',
  '2,50' = '2,50',
  '3,00' = '3,00',
  '3,50' = '3,50',
  '4,00' = '4,00',
  '4,50' = '4,50',
  '5,00' = '5,00',
  '5,50' = '5,50',
  '6,00' = '6,00',
}

@Entity({ name: 'players' })
export class Player {
  @PrimaryGeneratedColumn()
  id?: number;

  // @CreateDateColumn({
  //   name: 'creation_at',
  //   type: 'timestamptz',
  //   default: () => 'CURRENT_TIMESTAMP',
  // })
  // creationAt: Date;

  @Column()
  name: string;

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
  // level: Level;

  // @Column()
  // gender: Gender;

  // @Column()
  // position: Position;
}
