import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'courts' })
export class Court {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  number: number;
}
