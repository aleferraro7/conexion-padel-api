// import { FindOneOptions } from 'typeorm';
import { BaseEntity } from './base.entity';
import { IRepository } from './irepository';

export abstract class BaseService<T extends BaseEntity> {
  constructor(private readonly repository: IRepository<T>) {}

  async findAll(): Promise<T[]> {
    return await this.repository.findAll();
  }

  async findById(id: number): Promise<T> {
    return await this.repository.findById(id);
  }

  async create(data: Partial<T>): Promise<T> {
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

  // async softDeleteById(id: number): Promise<void> {
  //   return await this.repository.softDeleteById(id);
  // }
}
