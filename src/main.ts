import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'

import { HttpExceptionFilter } from 'src/common/filters'
import { TransformInterceptor } from 'src/common/interceptor'
import { AppModule } from './app.module'

async function bootstrap() {
  // 创建服务实例
  const app = await NestFactory.create(AppModule)

  // 全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor())

  // 全局过滤器
  app.useGlobalFilters(new HttpExceptionFilter())

  // 服务启动
  const configService = app.get(ConfigService)
  const port = configService.get<number>('server.port')
  await app.listen(port)
}
bootstrap()
