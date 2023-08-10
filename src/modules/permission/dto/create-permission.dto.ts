import { IsNotEmpty } from 'class-validator'

export class CreatePermissionDto {
  /*
  权限标识
  */
  @IsNotEmpty()
  name: string

  /*
  权限描述
  */
  @IsNotEmpty()
  desc: string
}
