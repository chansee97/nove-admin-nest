import { IsNotEmpty } from 'class-validator'

export class SetPermissionsDto {
  @IsNotEmpty()
  roleId: number

  @IsNotEmpty()
  permissionIds: number[]
}
