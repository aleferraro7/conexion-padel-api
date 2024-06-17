import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service.';
import { UsersService } from 'src/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/common/dtos/login.dto';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const mockLogout = jest.fn();
const mockFindByEmail = jest.fn();
const mockSignAsync = jest.fn();
const mockComparePass = jest.fn();

const mockBcriptCompare = true;

const mockUserId = 1;

const mockUserEmail = 'johndoe@mail.com';

const mockHashedPassword =
  '$2b$10$GNykHTbgaKCPoOdeWAl0lO0DX6.rlSpQDbAERqv8BdsFyvSj9laJS';

const mockUser = {
  mockUserId,
  mockUserEmail,
  mockHashedPassword,
};

const mockLogIn: LoginDto = {
  email: 'johndoe@mail.com',
  password: '$2b$10$GNykHTbgaKCPoOdeWAl0lO0DX6.rlSpQDbAERqv8BdsFyvSj9laJS',
};

const mockClearCookie = {};

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUsersService = {
    findByEmail: mockFindByEmail,
    compare: mockComparePass,
  };

  const mockJwtService = {
    signAsync: mockSignAsync,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(usersService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  it('should return access token if email and password are valid', async () => {
    const bcryptCompare = jest.fn().mockResolvedValue(true);
    (bcrypt.compare as jest.Mock) = bcryptCompare;

    mockFindByEmail.mockResolvedValue(mockUser);
    mockComparePass.mockResolvedValue(mockBcriptCompare);
    mockSignAsync.mockResolvedValue('token');

    const response = await authService.login(mockLogIn);
    expect(response).toEqual({ access_token: 'token' });
  });

  it('should throw UnauthorizedException if email is invalid', async () => {
    mockFindByEmail.mockResolvedValue(null);

    await expect(authService.login(mockLogIn)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw error if password is invalid', async () => {
    const bcryptCompare = jest.fn().mockRejectedValue(false);
    (bcrypt.compare as jest.Mock) = bcryptCompare;

    await expect(authService.login(mockLogIn)).rejects.toThrow(
      UnauthorizedException,
    );
  });
  it('should clear the access_token cookie', async () => {
    const res = {
      cookie: jest.fn(),
    };

    mockLogout.mockResolvedValue(mockClearCookie);
    const response = await authService.logOut(res);

    expect(response).toEqual(mockClearCookie);
  });
});
