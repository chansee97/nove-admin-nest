import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { SearchQuery } from 'src/common/dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { PermissionService } from './permission.service'
import { CreatePermissionDto } from './dto/create-permission.dto'
import { UpdatePermissionDto } from './dto/update-permission.dto'

@ApiTags('权限管理模块')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @ApiOperation({
    summary: '创建权限',
  })
  @Post('create')
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto)
  }

  @Get('page')
  findAll(@Query() searchQuery: SearchQuery) {
    return this.permissionService.findAll(searchQuery)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionService.findOne(id)
  }

  @Patch('update')
  update(@Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionService.update(updatePermissionDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionService.remove(id)
  }
}
