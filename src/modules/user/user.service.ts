import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ApiErrorCode, ApiException } from 'src/filter/api-exception'
import type { CreateUserDto } from './dto/create-user.dto'
import type { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { username } = createUserDto
    const existUser = await this.userRepository.findOne({
      where: { username },
    })

    if (existUser)
      throw new ApiException('用户已存在', ApiErrorCode.USER_EXIST)

    try {
      const newUser = this.userRepository.create(createUserDto)
      await this.userRepository.save(newUser)
      return '注册成功'
    }
    catch (error: unknown) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll() {
    return await this.userRepository.find()
  }

  findOne(id: number) {
    return `This action get a #${id} user`
  }

  async findOneByUserName(username: string) {
    const res = await this.userRepository.findOne({
      where: { username },
    })
    if (!res)
      throw new ApiException('未找到该用户信息', ApiErrorCode.USER_NOTEXIST)

    return res
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
