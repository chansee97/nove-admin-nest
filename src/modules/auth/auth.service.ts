import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/modules/user/user.service'
import { encryptData } from 'src/utils/crypto'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  login(user: any) {
    const payload = { username: user.username, sub: user.id }
    const accessToken = this.jwtService.sign(payload)
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '8d' })
    return { accessToken, refreshToken }
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByUserName(username)
    if (user && user.password === encryptData(password)) {
      const { password, ...result } = user
      return result
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
