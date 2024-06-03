import { Test, TestingModule } from '@nestjs/testing';
import { CourtsRepository } from './courts.repository';
import { PaginateQuery, Paginated } from 'nestjs-paginate';
import { Court } from './entities/court.entity';
import { CreateCourtDto, UpdateCourtDto } from './dto/court.dto';
import { FindOptions } from 'src/base/base.interface.repository';

const mockCreate = jest.fn();
const mockSave = jest.fn();
const mockFindOneById = jest.fn();
const mockFindOne = jest.fn();
const mockFindAll = jest.fn();
const mockSoftDeleteById = jest.fn();
const mockDeleteById = jest.fn();
const mockUpdate = jest.fn();

const mockCourtId = 1;

const mockCreateCourtDto: CreateCourtDto = {
  number: 10,
};

const mockCourt = {
  ...mockCreateCourtDto,
  mockCourtId,
};

const mockUpdateCourtDto: UpdateCourtDto = {
  number: 1000,
};

const savedCourt = {
  ...mockCourt,
  ...mockUpdateCourtDto,
};

const mockPaginateQuery: PaginateQuery = {
  page: 1,
  limit: 10,
  sortBy: [['id', 'DESC']],
  searchBy: ['number'],
  search: 'string',
  filter: {
    number: ['1', '2'],
  },
  select: ['id', 'number'],
  path: '',
};

const mockPaginatedResponse: Paginated<Court> = {
  data: [mockCourt],
  meta: {
    itemsPerPage: 1,
    totalItems: 1,
    currentPage: 1,
    totalPages: 1,
    sortBy: [['id', 'DESC']],
    searchBy: ['number'],
    search: '',
    select: [''],
  },
  links: {
    current: 'current',
  },
};

describe('CourtsRepository', () => {
  // let baseRepository: BaseAbstractRepository<Court>;
  let repository: CourtsRepository;
  const mockCourtsRepository = {
    create: mockCreate,
    save: mockSave,
    findOneById: mockFindOneById,
    findOne: mockFindOne,
    findAll: mockFindAll,
    softDeleteById: mockSoftDeleteById,
    deleteById: mockDeleteById,
    update: mockUpdate,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourtsRepository],
    })
      .overrideProvider(CourtsRepository)
      .useValue(mockCourtsRepository)
      .compile();

    repository = module.get<CourtsRepository>(CourtsRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should create a court', async () => {
    mockCreate.mockResolvedValue(mockCourt);
    const response = await repository.create(mockCreateCourtDto);
    expect(response).toEqual(mockCourt);
  });

  it('should return error on create a court', async () => {
    const error = new Error('Invalid number');
    mockCreate.mockRejectedValueOnce(error);

    expect(repository.create(mockCreateCourtDto)).rejects.toThrow(error);
  });

  it('should save a court', async () => {
    mockSave.mockResolvedValue(savedCourt);
    const response = await repository.save(mockCourt);
    expect(response).toEqual(savedCourt);
  });

  it('should return error on save a court', async () => {
    const error = new Error('Court not saved');
    mockSave.mockRejectedValue(error);

    expect(repository.save(savedCourt)).rejects.toThrow(error);
  });

  it('should find all the courts', async () => {
    mockFindAll.mockResolvedValue(mockPaginatedResponse);

    const response = await repository.findAll(mockPaginateQuery);

    expect(response).toEqual(mockPaginatedResponse);
  });

  it('should return error on find all the courts', async () => {
    const error = new Error('Courts not found');
    mockFindAll.mockRejectedValue(error);

    expect(repository.findAll(mockPaginateQuery)).rejects.toThrow(error);
  });

  it('should find one court by id', async () => {
    mockFindOneById.mockResolvedValue(mockCourt);
    const response = await repository.findOneById(mockCourtId);
    expect(response).toEqual(mockCourt);
  });

  it('should return error on find one court by id', async () => {
    const error = new Error('Court not found');

    mockFindOneById.mockRejectedValue(error);

    expect(repository.findOneById(mockCourtId)).rejects.toThrow(error);
  });

  it('should find one court', async () => {
    mockFindOne.mockResolvedValue(mockCourt);
    const options: FindOptions<typeof mockCourt> = { where: { number: 10 } };
    const response = await repository.findOne(options);
    expect(response).toEqual(mockCourt);
  });

  it('should return error on find one court', async () => {
    const error = new Error('Court not found');

    mockFindOne.mockRejectedValue(error);

    const options: FindOptions<typeof mockCourt> = { where: { number: 10 } };

    expect(repository.findOne(options)).rejects.toThrow(error);
  });

  it('should update a court', async () => {
    mockUpdate.mockResolvedValue(savedCourt);

    const response = await repository.update(mockCourtId, savedCourt);

    expect(response).toEqual(savedCourt);
  });

  it('should return error on update a court', async () => {
    const error = new Error('Court not found');

    mockUpdate.mockRejectedValue(error);

    await expect(
      repository.update(mockCourtId, mockUpdateCourtDto),
    ).rejects.toThrow(error);
  });

  it('should delete a court', async () => {
    mockDeleteById.mockResolvedValue(undefined);

    const response = await repository.deleteById(mockCourtId);

    expect(response).toBeUndefined();
    expect(mockDeleteById).toHaveBeenCalledTimes(1);
  });

  it('should return error on delete a court', async () => {
    const error = new Error('Court not found');
    mockDeleteById.mockRejectedValue(error);

    expect(repository.deleteById(mockCourtId)).rejects.toThrow(error);
  });

  it('should soft delete a court', async () => {
    mockSoftDeleteById.mockResolvedValue(undefined);

    const response = await repository.softDeleteById(mockCourtId);

    expect(response).toBeUndefined();
    expect(mockSoftDeleteById).toHaveBeenCalledTimes(1);
  });

  it('should return error on soft delete a court', async () => {
    const error = new Error('Court not found');
    mockSoftDeleteById.mockRejectedValue(error);

    expect(repository.softDeleteById(mockCourtId)).rejects.toThrow(error);
  });
});
