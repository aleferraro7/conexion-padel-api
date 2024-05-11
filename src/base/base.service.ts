// import { FindOneOptions } from 'typeorm';
import { BaseEntity } from './base.entity';
import { BaseInterfaceRepository } from './base.interface.repository';

export abstract class BaseService<T extends BaseEntity> {
  constructor(private readonly repository: BaseInterfaceRepository<T>) {}

  async findAll(): Promise<T[]> {
    return await this.repository.findAll();
  }

  async findOneById(id: number): Promise<T> {
    return await this.repository.findOneById(id);
  }

  async create(data: T): Promise<T> {
    return await this.repository.create(data);
  }

  // async findOne(options: FindOneOptions): Promise<T> {
  //   return await this.repository.findOne(options);
  // }

  // async save(data: Partial<T>): Promise<T> {
  //   return await this.repository.save(data);
  // }

  async deleteById(id: number): Promise<void> {
    return await this.repository.deleteById(id);
  }

  async softDeleteById(id: number): Promise<void> {
    return await this.repository.softDeleteById(id);
  }
}
