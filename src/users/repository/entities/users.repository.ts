import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from 'src/base/base.abstract.repository';
import { USER_PAGINATE_CONFIG, User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository extends BaseAbstractRepository<User> {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
    super(usersRepository, USER_PAGINATE_CONFIG);
  }
}
