import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { BaseAbstractRepository } from './base.abstract.repository';
import { BaseEntity } from './base.entity';
import { FindOptions } from './base.interface.repository';
import { PageDto } from 'src/common/dtos/page.dto';

export abstract class BaseService<T extends BaseEntity> {
  constructor(private readonly baseRepository: BaseAbstractRepository<T>) {}

  public async create(data: T): Promise<T> {
    return await this.baseRepository.save(data);
  }

  public async save(data: T): Promise<T> {
    return await this.baseRepository.save(data);
  }

  public async findOneById(id: number): Promise<T> {
    return await this.baseRepository.findOneById(id);
  }

  public async findOne(options: FindOptions<T>): Promise<T> {
    return await this.findOne(options);
  }

  // public async findAll(): Promise<T[]> {
  //   return await this.baseRepository.findAll();
  // }

  public async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<T>> {
    return await this.baseRepository.findAll(pageOptionsDto);
  }

  public async deleteById(id: number): Promise<void> {
    await this.baseRepository.deleteById(id);
  }

  public async softDeleteById(id: number): Promise<void> {
    await this.baseRepository.softDeleteById(id);
  }

  public async update(id: number, data: Partial<T>): Promise<T> {
    const obj = await this.findOneById(id);
    return this.baseRepository.save({
      ...obj,
      ...data,
    });
  }
}
