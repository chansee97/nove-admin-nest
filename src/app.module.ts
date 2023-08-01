import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppService } from './app.service'

/* 控制层 */
import { AppController } from './app.controller'

/* 业务模块 */
import { UserModule } from './user/user.module'

/* 辅助工具 */
import { getEnvFilePath } from './utils/env'
import configuration from './config/configuration'

@Module({
  imports: [
    /* 全局环境变量 */
    ConfigModule.forRoot({
      envFilePath: getEnvFilePath(),
      load: [configuration],
      isGlobal: true,
    }),
    /* 数据库链接 */
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return {
          host: config.get<string>('database.host'),
          type: config.get<string>('database.type') as any,
          username: config.get<string>('database.user'),
          password: config.get<string>('database.password'),
          port: config.get<number>('database.port'),
          database: config.get<string>('database.name'),
          synchronize: true,
          autoLoadEntities: true,
        }
      },
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
