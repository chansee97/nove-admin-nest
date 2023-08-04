import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ApiException } from 'src/common/filters'
import { ApiErrorCode } from 'src/common/enum'
import { AuthService } from './auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super()
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password)
    if (!user)
      throw new ApiException('密码错误', ApiErrorCode.USER_PASSWORD_INVALID)

    return user
  }
}
