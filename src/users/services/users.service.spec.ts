import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from '../repository/users.repository';
import { HttpException, HttpStatus } from '@nestjs/common';
import { RegisterDto } from 'src/common/dtos/register.dto';

const mockFindByEmail = jest.fn();
const mockRegister = jest.fn();
const mockFindOne = jest.fn();
const mockSave = jest.fn();
jest.mock('bcrypt');

const mockUserId = 1;

const mockUserEmail = 'johndoe@mail.com';

const mockHashedPassword =
  '$2b$10$TpWXVRbrR4BHFgCwf4.0dOkSZitpkOg3iFJOFUH8RI3CiHVlgrB.q';

const mockUser = {
  mockHashedPassword,
  mockUserId,
  mockUserEmail,
};

const mockCreateUser: RegisterDto = {
  email: mockUserEmail,
  password: '123456',
};

describe('UsersService', () => {
  let service: UsersService;
  const mockUsersRepository = {
    findByEmail: mockFindByEmail,
    register: mockRegister,
    findOne: mockFindOne,
    save: mockSave,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UsersRepository],
    })
      .overrideProvider(UsersRepository)
      .useValue(mockUsersRepository)
      .compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find one user by email', async () => {
    mockFindOne.mockResolvedValue(mockUser);
    const response = await service.findByEmail(mockUserEmail);

    expect(response).toEqual(mockUser);
  });

  it('should throw an error if no user is found', async () => {
    mockFindOne.mockResolvedValue(null);

    try {
      await service.findByEmail('nonexistent@example.com');
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('User with this email does not exists');
      expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
    }
  });

  it('should register a new user', async () => {
    const savedUser = {
      ...mockCreateUser,
      password: mockHashedPassword,
    };
    mockRegister.mockResolvedValue(savedUser);
    mockSave.mockResolvedValue(savedUser);
    const response = await service.register(mockCreateUser);

    expect(response).toEqual(savedUser);
    expect(mockSave).toHaveBeenCalledWith(savedUser);
  });

  it('should return error if email already exists', async () => {
    mockRegister.mockResolvedValue(mockCreateUser);

    const error = { code: '23505' };
    mockSave.mockRejectedValue(error);

    await expect(service.register(mockCreateUser)).rejects.toThrow(
      HttpException,
    );
    await expect(service.register(mockCreateUser)).rejects.toThrow(
      'User with that email already exists',
    );
  });

  it('should throw an internal server error', async () => {
    mockSave.mockRejectedValue(new Error('Unexpected error'));
    await expect(service.register(mockCreateUser)).rejects.toThrow(
      new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      ),
    );
  });
});
