export enum ApiErrorCode {
  /* 通用 */
  SERVER_SUCCESS = 200, // 成功
  SERVER_ERROR = 200, // 成功

  /* 业务相关 */
  USER_ID_INVALID = 1001, // 用户id无效
  USER_NOTEXIST = 1002, // 用户id无效
  USER_EXIST = 1003, // 用户已存在
  USER_PASSWORD_INVALID = 1004, // 密码无效

  /* token相关 */
  TOKEN_INVALID = 11001, // token无效
  TOKEN_MISS = 11002, // token缺失
}
