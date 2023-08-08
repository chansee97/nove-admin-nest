import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Permission } from '../permission/entities/permission.entity'
import { Menu } from '../menu/entities/menu.entity'
import { RoleService } from './role.service'
import { RoleController } from './role.controller'
import { Role } from './entities/role.entity'

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [TypeOrmModule.forFeature([Role, Permission, Menu])],
})
export class RoleModule {}
