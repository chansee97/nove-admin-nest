import type {
  CanActivate,
  ExecutionContext,
} from '@nestjs/common'
import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { Reflector } from '@nestjs/core'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      // 即将调用的方法
      context.getHandler(),
      // controller类型
      context.getClass(),
    ])
    if (isPublic)
      return true

    const request = context.switchToHttp().getRequest()
    const authorization = request.header('authorization') || ''
    const bearer = authorization.split(' ')
    if (!bearer || bearer.length < 2)
      throw new HttpException('登录token错误', HttpStatus.FORBIDDEN)

    const token: string = bearer[1]

    try {
      const payload = await this.jwtService.verifyAsync(token)

      request.user = payload
      return true
    }
    catch (e) {
      throw new HttpException('验证不通过', HttpStatus.FORBIDDEN)
    }
  }
}
