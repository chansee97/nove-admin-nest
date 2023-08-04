import { getEnvVar } from 'src/utils/env'

export default () => ({
  // 基础相关
  server: {
    port: parseInt(getEnvVar('SERVER_PORT'), 10) || 3000,
    name: getEnvVar('SERVER_TITLE'),
  },
  // 数据库相关
  database: {
    host: getEnvVar('DB_HOST'),
    port: parseInt(getEnvVar('DB_PORT'), 10) || 5210,
    user: getEnvVar('DB_USER'),
    name: getEnvVar('DB_NAME'),
    type: getEnvVar('DB_TYPE'),
    password: getEnvVar('DB_PASSWORD'),
  },
})
