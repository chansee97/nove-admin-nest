import { IsNotEmpty, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginAuthDto {
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  @Length(2, 10, {
    message: '用户名长度必须为2-10之间',
  })
  @ApiProperty({
    example: 'admin',
    description: '用户名',
  })
  username: string

  @IsNotEmpty()
  @Length(5, 15, {
    message: '密码长度必须为5-15之间',
  })
  @ApiProperty({
    example: '123456',
    description: '密码',
  })
  password: string
}
