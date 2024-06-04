import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from '../repository/users.repository';
import { HttpException, HttpStatus } from '@nestjs/common';
import { RegisterDto } from 'src/common/dtos/register.dto';

const mockFindByEmail = jest.fn();
const mockRegister = jest.fn();
const mockFindOne = jest.fn();
const mockSave = jest.fn();

const mockUserId = 1;

const mockUserEmail = 'johndoe@mail.com';

const mockPassword =
  '$2b$10$TpWXVRbrR4BHFgCwf4.0dOkSZitpkOg3iFJOFUH8RI3CiHVlgrB.q';

const mockUser = {
  mockPassword,
  mockUserId,
  mockUserEmail,
};

const mockCreateUser: RegisterDto = {
  email: mockUserEmail,
  password: mockPassword,
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

  // it('should find one user by email', async () => {
  //   const options = { where: { email: mockUserEmail } };
  //   mockFindOne.mockResolvedValue(mockUser);
  //   const response = await service.findOne(options);

  //   expect(response).toEqual(mockUser);
  // });

  it('should find one user by email', async () => {
    mockFindOne.mockResolvedValue(mockUser);
    const response = await service.findByEmail(mockUserEmail);

    expect(response).toEqual(mockUser);
  });

  // it('should return error on find an user by email', async () => {
  //   const error = new HttpException(
  //     'User with this email does not exists',
  //     HttpStatus.NOT_FOUND,
  //   );
  //   mockFindOne.mockRejectedValue(error);

  //   expect(service.findByEmail(mockUserEmail)).toThrow(error);
  // });

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
    mockSave.mockResolvedValue(mockUser);

    const response = await service.save(mockCreateUser);
    // mockCreateUser.mockPassword = undefined;

    expect(response).toEqual(mockUser);
  });
});
