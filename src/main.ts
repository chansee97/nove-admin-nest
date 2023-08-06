import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'

import { HttpExceptionFilter } from 'src/common/filters'
import { TransformInterceptor } from 'src/common/interceptor'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  // 创建服务实例
  const app = await NestFactory.create(AppModule)

  // 全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor())

  // 全局过滤器
  app.useGlobalFilters(new HttpExceptionFilter())

  /* swagger options */
  const options = new DocumentBuilder()
    .setTitle('nova-api') // 标题
    .setDescription('nova-nest-api 文档') // 描述
    .setVersion('1.0') // 版本
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, options)
  // 配置swgger地址
  SwaggerModule.setup('/api/swagger', app, document)

  // 服务启动
  const configService = app.get(ConfigService)
  const port = configService.get<number>('server.port')
  await app.listen(port)
}
bootstrap()
