import { PartialType } from '@nestjs/mapped-types'
import { IsNotEmpty } from 'class-validator'
import { CreatePermissionDto } from './create-permission.dto'

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
  /*
  权限ID
  */
  @IsNotEmpty()
  id: string
}
