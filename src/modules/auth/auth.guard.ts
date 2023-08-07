import type {
  CanActivate,
  ExecutionContext,
} from '@nestjs/common'
import {
  Injectable,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import type { Request } from 'express'
import { ConfigService } from '@nestjs/config'
import { ApiException } from 'src/common/filters'
import { ApiErrorCode } from 'src/common/enum'
import { Reflector } from '@nestjs/core'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic)
      return true

    const request: Request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)

    if (!token) throw new ApiException('未登录', ApiErrorCode.TOKEN_MISS)

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      })
      request.user = payload
    }
    catch {
      throw new ApiException('token验证失败', ApiErrorCode.TOKEN_INVALID)
    }

    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
