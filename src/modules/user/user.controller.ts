import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { SetRoleDto } from './dto/set-roles.dto'
import { SearchQuery } from '@/common/dto'
import { Permissions, Public } from '@/common/decorators'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Get('page')
  findAll(@Query() searchQuery: SearchQuery) {
    return this.userService.findAll(searchQuery)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id)
  }

  @Patch('update')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto)
  }

  @Post('setRole')
  setRole(@Body() setRoleDto: SetRoleDto) {
    return this.userService.setRole(setRoleDto)
  }

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
