import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { UserService } from './user.service'
import { User } from './entities/user.entity'
import { UserController } from './user.controller'

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  exports: [UserService],
})
export class UserModule {}
