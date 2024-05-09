// import { FindOneOptions } from 'typeorm';
import { BaseEntity } from './base.entity';

export interface IRepository<T extends BaseEntity> {
  findAll(): Promise<T[]>;
  // findById(id: string): Promise<T>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
  // findAll(): Promise<T[]>;
  findById(id: number): Promise<T>;
  // findOne(options: FindOneOptions): Promise<T>;
  // save(data: Partial<T>): Promise<T>;
  // create(data: Partial<T>): Promise<T>;
  deleteById(id: number): Promise<void>;
  // softDeleteById(id: number): Promise<void>;
}
