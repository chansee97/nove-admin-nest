import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { APP_GUARD } from '@nestjs/core'
import { UserModule } from 'src/modules/user/user.module'
import { PermissionGuard } from '../permission/permission.guard'
import { PermissionService } from './permission.service'
import { PermissionController } from './permission.controller'
import { Permission } from './entities/permission.entity'

@Module({
  controllers: [PermissionController],
  providers: [
    PermissionService,
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
  imports: [UserModule, TypeOrmModule.forFeature([Permission])],
})
export class PermissionModule {}
