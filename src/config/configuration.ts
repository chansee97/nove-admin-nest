function env(targetName: string) {
  return process.env[targetName]
}
export default () => ({
  // 基础相关
  server: {
    port: parseInt(env('SERVER_PORT'), 10) || 3000,
    name: env('SERVER_TITLE'),
  },
  // 数据库相关
  database: {
    host: env('DB_HOST'),
    port: parseInt(env('DB_PORT'), 10) || 5210,
    user: env('DB_USER'),
    name: env('DB_NAME'),
    type: env('DB_TYPE'),
    password: env('DB_PASSWORD'),
  },
})
