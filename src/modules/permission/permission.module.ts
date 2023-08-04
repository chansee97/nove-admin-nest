import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PermissionService } from './permission.service'
import { PermissionController } from './permission.controller'
import { Permission } from './entities/permission.entity'

@Module({
  controllers: [PermissionController],
  providers: [PermissionService],
  imports: [TypeOrmModule.forFeature([Permission])],
})
export class PermissionModule {}
