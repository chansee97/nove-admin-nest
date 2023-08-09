import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { ApiException } from 'src/common/filters'
import { ApiErrorCode } from 'src/common/enum'
import type { SearchQuery } from 'src/common/dto/page.dto'
import { Menu } from '../menu/entities/menu.entity'
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
     @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const existRole = await this.roleRepository.findOne({
      where: { name: createRoleDto.name },
    })

    if (existRole)
      throw new ApiException('角色已存在', ApiErrorCode.SERVER_ERROR)

    // 查询传入数组permissionIds的全部permission实体
    const permissions = await this.permissionRepository.find({
      where: {
        id: In(createRoleDto.permissionIds),
      },
    })

    // 查询传入数组menuIds的全部menu实体
    const menus = await this.menuRepository.find({
      where: {
        id: In(createRoleDto.menuIds),
      },
    })

    this.roleRepository.save({ ...createRoleDto, permissions, menus })

    return '角色新增成功'
  }

  async findAll(searchQuery: SearchQuery) {
    let skip = 0
    let take = 0

    if (searchQuery.pageNum && searchQuery.pageSize) {
      skip = (searchQuery.pageNum - 1) * searchQuery.pageSize
      take = searchQuery.pageSize
    }

    const [list, total] = await this.roleRepository.findAndCount({
      skip,
      take,
    })
    return {
      list,
      total,
    }
  }

  async findOne(id: string) {
    const existData = await this.roleRepository.findOne({
      where: { id },
      relations: ['permissions', 'menus'],
    })

    if (!existData)
      throw new ApiException('操作对象不存在', ApiErrorCode.SERVER_ERROR)

    return existData
  }

  async update(updateRoleDto: UpdateRoleDto) {
    const { id } = updateRoleDto

    const role = await this.findOne(id)

    const permissions = await this.permissionRepository.find({
      where: {
        id: In(updateRoleDto.permissionIds),
      },
    })

    const menus = await this.menuRepository.find({
      where: {
        id: In(updateRoleDto.menuIds),
      },
    })

    // 更新角色的字段
    role.permissions = permissions
    role.menus = menus
    role.name = updateRoleDto.name // 根据实际字段进行赋值

    this.roleRepository.save(role)
    return '角色修改成功'
  }

  async remove(id: string) {
    const role = await this.findOne(id)

    // 删除关联的权限
    await this.permissionRepository.remove(role.permissions)

    // 删除关联的菜单
    await this.menuRepository.remove(role.menus)

    await this.roleRepository.remove(role)
    return '删除成功'
  }
}
