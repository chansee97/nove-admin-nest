import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { ValidationPipe } from '@nestjs/common/pipes'
import { Public } from 'src/common/decorators'
import { SearchQuery } from 'src/common/dto'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('register')
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Get()
  findAll(@Query() searchQuery: SearchQuery) {
    return this.userService.findAll(searchQuery)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }
}
