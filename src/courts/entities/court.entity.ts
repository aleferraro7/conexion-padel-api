// import { Transform } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'courts' })
export class Court {
  @PrimaryGeneratedColumn()
  id?: number;

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
