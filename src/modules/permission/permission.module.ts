import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { APP_GUARD } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { PermissionGuard } from '../permission/permission.guard'
import { PermissionService } from './permission.service'
import { PermissionController } from './permission.controller'
import { Permission } from './entities/permission.entity'
import { AuthService } from '@/modules/auth/auth.service'
import { UserModule } from '@/modules/user/user.module'

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
