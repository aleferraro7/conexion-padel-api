import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { Profile } from './entities/profile.entity';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService extends BaseService<Profile> {
  constructor(private readonly profileRepository: ProfileRepository) {
    super(profileRepository);
  }
}
