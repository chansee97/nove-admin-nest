import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/modules/user/user.service'
import { encryptData } from 'src/utils/crypto'
import { ApiException } from 'src/common/filters'
import { ApiErrorCode } from 'src/common/enum'
import type { LoginAuthDto } from './dto/login-auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const { username, password } = loginAuthDto

    const user = await this.validateUser(username, password)
    if (!user)
      throw new ApiException('密码错误', ApiErrorCode.USER_PASSWORD_INVALID)

    const payload = { username: user.username, sub: user.id }
    const accessToken = this.jwtService.sign(payload)
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '8d' })
    return { ...user, accessToken, refreshToken }
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByUserName(username)
    if (user.password === encryptData(password)) {
      delete user.password
      return user
    }
    return null
  }

  async refreshToken(refreshToken: string) {
    const res: any = await this.jwtService.verify(refreshToken)

    if (res) {
      const user = await this.userService.findOneByUserName(res.username)
      return this.login(user)
    }
    return null
  }
}
