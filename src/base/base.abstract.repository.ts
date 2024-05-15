import {
  DeepPartial,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { FindOptions } from './base.interface.repository';

export abstract class BaseAbstractRepository<T extends BaseEntity> {
  private readonly repository: Repository<T>;
  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  public async create(data: DeepPartial<T>): Promise<T> {
    return await this.repository.create(data);
  }

  public async save(data: T): Promise<T> {
    return await this.repository.save(data);
  }

  public async findOneById(id: number): Promise<T> {
    return await this.repository.findOne({
      where: { id } as FindOptionsWhere<T>,
    });
  }

  public async findOne(options: FindOptions<T>): Promise<T> {
    const queryOption: FindOneOptions<T> = {
      where: {
        ...options.where,
      },
    } as FindOneOptions;
    return await this.repository.findOne(queryOption);
  }

  public async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  public async deleteById(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  public async softDeleteById(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }

  public async update(id: number, data: DeepPartial<T>): Promise<T> {
    const obj = await this.findOneById(id);
    return this.repository.save({
      ...obj,
      ...data,
    });
  }
}
