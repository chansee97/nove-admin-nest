import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MenuService } from './menu.service'
import { MenuController } from './menu.controller'
import { Menu } from './entities/menu.entity'

@Module({
  controllers: [MenuController],
  providers: [MenuService],
  imports: [TypeOrmModule.forFeature([Menu])],
})
export class MenuModule {}
