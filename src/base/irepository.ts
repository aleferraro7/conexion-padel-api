import { FindOneOptions } from 'typeorm';
import { BaseEntity } from './base.entity';

export interface IRepository<T extends BaseEntity> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T>;
  findOne(options: FindOneOptions): Promise<T>;
  save(data: Partial<T>): Promise<T>;
  create(data: Partial<T>): Promise<T>;
  deleteById(id: number): Promise<void>;
  softDeleteById(id: number): Promise<void>;
}
