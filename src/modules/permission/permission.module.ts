import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { APP_GUARD } from '@nestjs/core'
import { UserModule } from 'src/modules/user/user.module'
import { AuthService } from 'src/modules/auth/auth.service'
import { JwtService } from '@nestjs/jwt'
import { PermissionGuard } from '../permission/permission.guard'
import { PermissionService } from './permission.service'
import { PermissionController } from './permission.controller'
import { Permission } from './entities/permission.entity'

@Module({
  controllers: [PermissionController],
  providers: [
    PermissionService,
    AuthService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
  imports: [UserModule, TypeOrmModule.forFeature([Permission])],
})
export class PermissionModule {}
