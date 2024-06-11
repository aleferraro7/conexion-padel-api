import { AuthController } from './auth.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service.';
import { UsersService } from 'src/users/services/users.service';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { LoginDto } from 'src/common/dtos/login.dto';

const mockRegister = jest.fn();
const mockLogin = jest.fn();
const mockProfile = jest.fn();
const mockLogout = jest.fn();

const mockCreateUserDto: CreateUserDto = {
  email: 'johndoe@mail.com',
  password: '123456',
};

const mockUserId = 1;

const mockUser = {
  ...mockCreateUserDto,
  mockUserId,
};

const mockLogIn: LoginDto = {
  email: 'johndoe@mail.com',
  password: '123456',
};

const mockReqUser = {
  mockUserId,
  email: 'johndoe@mail.com',
};

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    login: mockLogin,
    profile: mockProfile,
    mockLogout: mockLogout,
  };

  const mockUsersService = {
    register: mockRegister,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an user', async () => {
    mockRegister.mockResolvedValue(mockUser);
    const response = await controller.register(mockCreateUserDto);

    expect(response).toEqual(mockUser);
  });

  it('should return error on create an user', async () => {
    const error = new Error('Invalid data');
    mockRegister.mockRejectedValue(error);

    expect(controller.register(mockCreateUserDto)).rejects.toThrow(error);
  });

  it('should login and set cookie', async () => {
    const signInDto: LoginDto = mockLogIn;
    const res = {
      cookie: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };

    await controller.login(signInDto, res as any);

    expect(res.cookie).toHaveBeenCalledWith(
      'access_token',
      'token',
      expect.any(Object),
    );
    expect(res.send).toHaveBeenCalledWith({
      access_token: 'token',
      status: 'ok',
    });
  });

  it('should return user profile', () => {
    const req = { user: mockReqUser };
    const result = controller.getProfile(req as any);
    expect(result).toEqual(req.user);
  });

  it('should log out user', async () => {
    const res = { clearCookie: jest.fn() };

    await controller.logOut(res as any);

    expect(controller.logOut).toHaveBeenCalledWith(res);
  });
});
