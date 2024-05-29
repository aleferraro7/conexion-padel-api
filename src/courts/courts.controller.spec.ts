import { Test, TestingModule } from '@nestjs/testing';
import { CourtsController } from './courts.controller';
import { CourtsService } from './courts.service';
import { CreateCourtDto, UpdateCourtDto } from './dto/court.dto';
import { PaginateQuery, Paginated } from 'nestjs-paginate';
import { Court } from './entities/court.entity';

const mockUpdate = jest.fn();
const mockFindOneById = jest.fn();
const mockFindAll = jest.fn();
const mockDeleteById = jest.fn();
const mockCreate = jest.fn();

const mockCourtId = 1;

const mockCreateCourtDto: CreateCourtDto = {
  number: 10,
};

const mockCourt = {
  ...mockCreateCourtDto,
  mockCourtId,
};

const mockUpdateCourtDto: UpdateCourtDto = {
  ...mockCourt,
  number: 1000,
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

describe('CourtsController', () => {
  let controller: CourtsController;
  const mockCourtService = {
    update: mockUpdate,
    findOneById: mockFindOneById,
    findAll: mockFindAll,
    deleteById: mockDeleteById,
    create: mockCreate,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourtsController],
      providers: [CourtsService],
    })
      .overrideProvider(CourtsService)
      .useValue(mockCourtService)
      .compile();

    controller = module.get<CourtsController>(CourtsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find all the courts', async () => {
    mockFindAll.mockResolvedValue(mockPaginatedResponse);

    const response = await controller.findAll(mockPaginateQuery);

    expect(response).toEqual(mockPaginatedResponse);
  });

  it('should return error on find all courts', async () => {
    const error = new Error('Courts not found');
    mockFindAll.mockRejectedValue(error);

    expect(controller.findAll(mockPaginateQuery)).rejects.toThrow(error);
  });

  it('should create a court', async () => {
    mockCreate.mockResolvedValue(mockCourt);
    const response = await controller.create(mockCreateCourtDto);
    expect(response).toEqual(mockCourt);
  });

  it('should return error on create a court', async () => {
    const error = new Error('Invalid number');

    mockCreate.mockRejectedValueOnce(error);

    await expect(controller.create(mockCreateCourtDto)).rejects.toThrow(error);
  });

  it('should update a court', async () => {
    mockUpdate.mockResolvedValue(mockUpdateCourtDto);

    const response = await controller.update(mockCourtId, mockUpdateCourtDto);

    expect(response).toEqual(mockUpdateCourtDto);
  });

  it('should return error on update court', async () => {
    const error = new Error('Invalid data');

    mockUpdate.mockRejectedValue(error);

    await expect(
      controller.update(mockCourtId, mockUpdateCourtDto),
    ).rejects.toThrow(error);
  });

  it('should find one court', async () => {
    mockFindOneById.mockResolvedValue(mockCourt);

    const response = await controller.findOneById(mockCourtId);

    expect(response).toEqual(mockCourt);
  });

  it('should return error on find one court', async () => {
    const error = new Error('Court not found');

    mockFindOneById.mockRejectedValue(error);

    expect(controller.findOneById(mockCourtId)).rejects.toThrow(error);
  });

  it('should delete a court', async () => {
    mockDeleteById.mockResolvedValue(undefined);

    const response = await controller.deleteById(mockCourtId);

    expect(response).toBeUndefined();
    expect(mockDeleteById).toHaveBeenCalledTimes(1);
  });

  it('should return error on delete court', async () => {
    const error = new Error('Court not found');

    mockDeleteById.mockRejectedValue(error);

    expect(controller.deleteById(mockCourtId)).rejects.toThrow(error);
  });
});
