import { IsNotEmpty } from 'class-validator'

export class CreateRoleDto {
  @IsNotEmpty()
  name: string

  notes: string // 备注
}
