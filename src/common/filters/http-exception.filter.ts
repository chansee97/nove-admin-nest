import type {
  ArgumentsHost,
  ExceptionFilter,
} from '@nestjs/common'
import {
  Catch,
  HttpException,
} from '@nestjs/common'
import type { Request, Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()

    console.error(`
    error==>${request.method}
    path==>${request.url}
    reason==>${exception.message}`,
    )

    response.status(status).json({
      code: status,
      data: null,
      message: (exception.getResponse() as any).message || exception.message,
    })
  }
}
