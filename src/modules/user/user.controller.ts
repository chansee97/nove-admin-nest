import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { ValidationPipe } from '@nestjs/common/pipes'
import { Permissions, Public } from 'src/common/decorators'
import { SearchQuery } from 'src/common/dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@ApiTags('用户管理模块')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: '创建用户',
  })
  @Public()
  @Post('register')
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @ApiOperation({
    summary: '获取分页数据',
  })
  @Get('page')
  findAll(@Query() searchQuery: SearchQuery) {
    return this.userService.findAll(searchQuery)
  }

  @ApiOperation({
    summary: '获取单个用户信息',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id)
  }

  @ApiOperation({
    summary: '更新单个用户信息',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto)
  }

  @ApiOperation({
    summary: '删除单个用户信息',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }

  @Post('test')
  @Permissions('user:create')
  test(@Body() testParams) {
    return this.userService.test(testParams)
  }
}
