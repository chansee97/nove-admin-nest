import { Controller } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'

@ApiBearerAuth()
@Controller()
export class AppController {
  constructor() {}
}
