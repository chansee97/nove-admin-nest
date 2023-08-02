import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UserModule } from 'src/modules/user/user.module'
import { JwtModule } from '@nestjs/jwt'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from 'src/guard/auth.guard'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  controllers: [AuthController],
  providers: [AuthService, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  }],
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          global: true,
          signOptions: {
            expiresIn: '2h',
          },
        }
      },
    }),
  ],
})
export class AuthModule {}
