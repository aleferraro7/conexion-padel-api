import { DeepPartial, Repository } from 'typeorm';
import { BaseInterfaceRepository } from './base.interface.repository';

export abstract class BaseAbstractRepository<T>
  implements BaseInterfaceRepository<T>
{
  private repository: Repository<T>;
  protected constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  public async create(data: T): Promise<T> {
    return await this.repository.save(data);
  }

  // public async findOneById(id: any): Promise<T> {
  //   return await this.repository.findOneBy({ id });
  // }

  // public async findOneById(id: any): Promise<T> {
  //   const user = await this.repository.findBy({ id });
  //   if (user) {
  //     return user;
  //   }
  // }

  // async findById(id: number): Promise<T> {
  //   return this.repository.findOne(id);
  // }

  public async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  public async deleteById(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
