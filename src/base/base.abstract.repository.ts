import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { BaseInterfaceRepository } from './base.interface.repository';

interface HasId {
  id: number;
}
export abstract class BaseAbstractRepository<T extends HasId>
  implements BaseInterfaceRepository<T>
{
  private repository: Repository<T>;
  protected constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  public async create(data: T): Promise<T> {
    return await this.repository.save(data);
  }

  public async save(data: T): Promise<T> {
    return await this.repository.save(data);
  }

  // public async findOneById(id: number): Promise<T> {
  //   return await this.repository.findOneBy({ id });
  // }

  public async findOneById(id: any): Promise<T> {
    const options: FindOptionsWhere<T> = {
      id: id,
    };
    return await this.repository.findOneBy(options);
  }

  // async findById(id: number): Promise<T> {
  //   return this.repository.findOne(id);
  // }

  public async findOne(options: FindOneOptions<T>): Promise<T> {
    return await this.findOne(options);
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
}
