export interface BaseInterfaceRepository<T> {
  create(data: T): Promise<T>;

  // findOneById(id: any): Promise<T>;

  findAll(): Promise<T[]>;

  deleteById(id: number): Promise<void>;
}
