import {
  DeepPartial,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { FindOptions } from './base.interface.repository';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';

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

  // public async findAll(): Promise<T[]> {
  //   return await this.repository.find();
  // }

  public async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<T>> {
    const queryBuilder = this.repository.createQueryBuilder('entity');

    queryBuilder
      .orderBy('entity.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
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
