import { IsNotEmpty, IsString, Length, Matches } from 'class-validator'

/**
 * 注册的时候，用户名密码不能为空，长度为 6-30，并且限定了不能是特殊字符。
 */
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 30)
  @Matches(/^[a-zA-Z0-9#$%_-]+$/, {
    message: '用户名只能是字母、数字或者 #、$、%、_、- 这些字符',
  })
   username: string

  @IsString()
  @IsNotEmpty()
  @Length(6, 30)
  password: string
}
