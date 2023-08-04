import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ApiException } from 'src/common/filters'
import { ApiErrorCode } from 'src/common/enum'
import { encryptData } from 'src/utils/crypto'
import type { SearchQuery } from 'src/common/dto/page.dto'
import type { CreateUserDto } from './dto/create-user.dto'
import type { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
  }

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

  async findAll(searchQuery: SearchQuery) {
    const [list, total] = await this.userRepository.findAndCount({
      skip: (searchQuery.pageNum - 1) * searchQuery.pageSize,
      take: searchQuery.pageSize,
      where: {
        deletedAt: null,
      },
    })

    return {
      list,
      total,
    }
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    })

    if (!user)
      throw new ApiException('未找到该用户信息', ApiErrorCode.USER_NOTEXIST)

    return user
  }

  async findOneByUserName(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
    })
    if (!user)
      throw new ApiException('未找到该用户信息', ApiErrorCode.USER_NOTEXIST)

    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id)

    updateUserDto.password = encryptData(updateUserDto.password)

    await this.userRepository.save({ ...user, ...updateUserDto })
    return '更新成功'
  }

  async remove(id: number) {
    await this.findOne(id)

    await this.userRepository
      .createQueryBuilder('user')
      .softDelete()
      .where('id= :id', { id })
      .execute()

    return '删除成功'
  }
}
