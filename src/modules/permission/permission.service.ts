import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ApiException } from 'src/common/filters'
import { ApiErrorCode } from 'src/common/enum'
import type { SearchQuery } from 'src/common/dto/page.dto'
import type { CreatePermissionDto } from './dto/create-permission.dto'
import type { UpdatePermissionDto } from './dto/update-permission.dto'
import { Permission } from './entities/permission.entity'

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) { }

  async create(createPermissionDto: CreatePermissionDto) {
    const name = createPermissionDto.name
    const existPermission = await this.permissionRepository.findOne({
      where: { name },
    })

    if (existPermission)
      throw new ApiException('权限字段已存在', ApiErrorCode.SERVER_ERROR)

    await this.permissionRepository.save(createPermissionDto)
    return '权限新增成功'
  }

  async findAll(searchQuery: SearchQuery) {
    const [list, total] = await this.permissionRepository.findAndCount({
      skip: (searchQuery.pageNum - 1) * searchQuery.pageSize,
      take: searchQuery.pageSize,
    })
    return {
      list,
      total,
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`
  }

  remove(id: number) {
    return `This action removes a #${id} permission`
  }
}
