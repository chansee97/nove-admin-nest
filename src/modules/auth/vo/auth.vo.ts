import { ApiProperty } from '@nestjs/swagger'

export class LoginResponse {
  @ApiProperty({ example: 200 })
  code: number

  @ApiProperty({
    example: {
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjozLCJpYXQiOjE2OTEzMzU1NTUsImV4cCI6MTY5MTMzOTE1NX0.GjSDzdwLV22TWqpVGOc4m06lWBtEj-GyucWcrwbF6AI',
      refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjozLCJpYXQiOjE2OTEzMzU1NTUsImV4cCI6MTY5MjAyNjc1NX0.cCS0J7fWSLcIezcQtZ3V0QGLJxBs2Bx6IhFBSv5IMag',
    },
  })
  data: string

  @ApiProperty({ example: '请求成功' })
  message: string
}
