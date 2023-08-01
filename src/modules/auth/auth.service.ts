import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/modules/user/user.service'
import { encryptData } from 'src/utils/crypto'
import type { LoginAuthDto } from './dto/login-auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const { username, password } = loginAuthDto

    const user = await this.userService.findOneByUserName(username)
    if (user?.password !== encryptData(password))
      throw new HttpException('密码错误', HttpStatus.UNAUTHORIZED)

    const payload = { username: user.username, sub: user.id }
    return await this.jwtService.signAsync(payload)
  }
}
