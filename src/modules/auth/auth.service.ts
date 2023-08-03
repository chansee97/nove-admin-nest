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
    const access_token = this.jwtService.sign(payload)
    return { access_token }
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByUserName(username)
    if (user && user.password === encryptData(password)) {
      const { password, ...result } = user
      return result
    }
    return null
  }
}
