import { Controller, Post, Request, UseGuards } from '@nestjs/common'

// import { Public } from 'src/public/public.decorator'
import { LocalAuthGuard } from './auth.guard'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user)
  }
}
