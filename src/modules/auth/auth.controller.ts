import { Body, Controller, Post } from '@nestjs/common'
import { Public } from 'src/common/decorators'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { LoginResponse } from './vo/auth.vo'
import { LoginAuthDto } from './dto/login-auth.dto'

@ApiTags('登录验证模块')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '登录接口', // 接口描述信息
  })
  @ApiOkResponse({ description: '登录成功返回', type: LoginResponse })
  @Public()
  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto)
  }

  @ApiOperation({
    summary: 'token刷新接口', // 接口描述信息
  })
  @Public()
  @Post('refreshToken')
  refreshToken(@Body() updateToken: { refreshToken: string }) {
    return this.authService.refreshToken(updateToken.refreshToken)
  }
}
