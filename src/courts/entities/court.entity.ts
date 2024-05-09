// import { Transform } from 'class-transformer';
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
