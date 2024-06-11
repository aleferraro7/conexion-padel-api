import { PaginateQuery, Paginated } from 'nestjs-paginate';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { User } from '../repository/entities/user.entity';
import { UsersController } from './users.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../services/users.service';
// import { PinoLogger } from 'nestjs-pino';

const mockUpdate = jest.fn();
const mockFindOneById = jest.fn();
const mockFindAll = jest.fn();
const mockDeleteById = jest.fn();

const mockUserId = 1;

const mockCreateUserDto: CreateUserDto = {
  email: 'johndoe@mail.com',
  password: '123456',
};

const mockUser = {
  ...mockCreateUserDto,
  mockUserId,
};

const mockUpdateUserDto: UpdateUserDto = {
  ...mockUser,
  password: '1000000',
};

const mockPaginateQuery: PaginateQuery = {
  page: 1,
  limit: 10,
  sortBy: [['id', 'DESC']],
  searchBy: ['email'],
  search: 'string',
  filter: {
    email: ['johndoe@mail.com', ''],
  },
  select: ['id', 'email'],
  path: '',
};

const mockPaginatedResponse: Paginated<User> = {
  data: [mockUser],
  meta: {
    itemsPerPage: 1,
    totalItems: 1,
    currentPage: 1,
    totalPages: 1,
    sortBy: [['id', 'DESC']],
    searchBy: ['email'],
    search: '',
    select: [''],
  },
  links: {
    current: 'current',
  },
};

describe('UsersController', () => {
  let controller: UsersController;

  const mockUserService = {
    update: mockUpdate,
    findOneById: mockFindOneById,
    findAll: mockFindAll,
    deleteById: mockDeleteById,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      // .setLogger(PinoLogger)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find all the users', async () => {
    mockFindAll.mockResolvedValue(mockPaginatedResponse);
    const response = await controller.findAll(mockPaginateQuery);

    expect(response).toEqual(mockPaginatedResponse);
  });

  it('should return error on find all the users', async () => {
    const error = new Error('Users not found');
    mockFindAll.mockRejectedValue(error);

    expect(controller.findAll(mockPaginateQuery)).rejects.toThrow(error);
  });

  it('should find one user by id', async () => {
    mockFindOneById.mockResolvedValue(mockUser);
    const response = await controller.findOneById(mockUserId);

    expect(response).toEqual(mockUser);
  });

  it('should return error on find one user by id', async () => {
    const error = new Error('User not found');
    mockFindOneById.mockRejectedValue(error);

    expect(controller.findOneById(mockUserId)).rejects.toThrow(error);
  });

  it('should update an user', async () => {
    mockUpdate.mockResolvedValue(mockUpdateUserDto);
    const response = await controller.update(mockUserId, mockUpdateUserDto);

    expect(response).toEqual(mockUpdateUserDto);
  });

  it('should return error on update user', async () => {
    const error = new Error('Invalid data');

    mockUpdate.mockRejectedValue(error);

    await expect(
      controller.update(mockUserId, mockUpdateUserDto),
    ).rejects.toThrow(error);
  });

  it('should delete an user', async () => {
    mockDeleteById.mockResolvedValue(undefined);
    const response = await controller.delete(mockUserId);

    expect(response).toBeUndefined();
    expect(mockDeleteById).toHaveBeenCalledTimes(1);
  });

  it('should return error on delete user', async () => {
    const error = new Error('User not found');

    mockDeleteById.mockRejectedValue(error);

    expect(controller.delete(mockUserId)).rejects.toThrow(error);
  });
});
