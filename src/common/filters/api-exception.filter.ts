import type {
  ArgumentsHost,
  ExceptionFilter,
} from '@nestjs/common'
import {
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import type { Response } from 'express'
import { ApiException } from './api-exception'

@Catch(ApiException)
export class ApiExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, next: ArgumentsHost) {
    const host = next.switchToHttp()
    const response = host.getResponse<Response>()
    // const request = host.getRequest<Request>();
    const status
      = exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    response.status(status).json({
      code: status,
      data: null,
      message:
        exception instanceof HttpException ? exception.message : exception,
    })
  }
}
