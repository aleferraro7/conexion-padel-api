import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new JwtAuthGuard(reflector);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return true when IS_PUBLIC is true', () => {
    reflector.getAllAndOverride = jest.fn().mockReturnValue(true);
    const context = createMock<ExecutionContext>();
    const canActivate = guard.canActivate(context);

    expect(canActivate).toBe(true);
  });
});
