import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { ApiException } from 'src/common/filters'
import { ApiErrorCode } from 'src/common/enum'
import type { SearchQuery } from 'src/common/dto/page.dto'
import { Permission } from '../permission/entities/permission.entity'
import type { CreateRoleDto } from './dto/create-role.dto'
import type { UpdateRoleDto } from './dto/update-role.dto'
import { Role } from './entities/role.entity'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const permissions = await this.permissionRepository.find({
      where: {
        id: In(createRoleDto.permissionIds),
      },
    })
    const name = createRoleDto.name
    const existRole = await this.roleRepository.findOne({
      where: { name },
    })

    if (existRole)
      throw new ApiException('角色已存在', ApiErrorCode.SERVER_ERROR)

    this.roleRepository.save({ permissions, name })

    return '角色新增成功'
  }

  async findAll(searchQuery: SearchQuery) {
    const [list, total] = await this.roleRepository.findAndCount({
      skip: (searchQuery.pageNum - 1) * searchQuery.pageSize,
      take: searchQuery.pageSize,
    })
    return {
      list,
      total,
    }
  }

  async findOne(id: string) {
    const existData = await this.roleRepository.findOne({
      where: { id },
      relations: ['permissions'],
    })

    if (!existData)
      throw new ApiException('操作对象不存在', ApiErrorCode.SERVER_ERROR)

    return existData
  }

  async update(updateRoleDto: UpdateRoleDto) {
    const { id } = updateRoleDto

    const permissions = await this.permissionRepository.find({
      where: {
        id: In(updateRoleDto.permissionIds),
      },
    })

    const role = await this.findOne(id)

    // this.roleRepository.merge(role, updateRoleDto)
    // 更新角色的字段
    role.permissions = permissions
    role.name = updateRoleDto.name // 根据实际字段进行赋值

    this.roleRepository.save(role)
    return '角色修改成功'
  }

  async remove(id: string) {
    await this.findOne(id)
    await this.roleRepository.delete(id)
    return '删除成功'
  }
}
