import {
  DeepPartial,
  // FindOneOptions,
  // FindOptionsWhere,
  Repository,
} from 'typeorm';
import { BaseEntity } from './base.entity';

export abstract class BaseRepository<T extends BaseEntity> {
  constructor(private readonly repository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<T> {
    return await this.findById(id);
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  // async update(id: number, data: Partial<T>): Promise<T> {
  //   await this.repository.update(id, data);
  //   return this.findById(id);
  // }

  // async findById(id: any): Promise<T> {
  //   const options: FindOptionsWhere<T> = {
  //     id: id,
  //   };
  //   return await this.repository.findOneBy(options);
  // }

  // async findOne(options: FindOneOptions<T>): Promise<T> {
  //   return this.repository.findOne(options);
  // }

  // async save(data: DeepPartial<T>): Promise<T> {
  //   return await this.repository.save(data);
  // }

  // async deleteById(id: number): Promise<void> {
  //   await this.repository.delete(id);
  // }

  // async softDeleteById(id: number): Promise<void> {
  //   await this.repository.softDelete(id);
  // }
}