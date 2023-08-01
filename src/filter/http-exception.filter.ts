import type {
  ArgumentsHost,
  ExceptionFilter,
} from '@nestjs/common'
import {
  Catch,
  HttpException,
} from '@nestjs/common'
import type { Request, Response } from 'express'
import { ApiException } from './api-exception'

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

    /* 返回业务错误 */
    if (exception instanceof ApiException) {
      response.status(status).json({
        code: exception.getErrorCode(),
        data: null,
        message: exception.getErrorMessage(),
      })
      return
    }

    /* 返回其他错误 */
    response.status(status).json({
      code: status,
      data: null,
      message: exception.message,
    })
  }
}
