import http from '../index.js'

/**
 * 注册
 * @param {User} user
 * user.email {String}
 * user.nikename {String}
 * user.password {String}
 * user.phone {String}
 * user.userName {String}
 */
export function register(user) {
  return http.post('/user/register', user)
}

/**
 * 登录
 * @param {User} user
 * user.userName {String}
 * user.password {String}
 */
export function login(user) {
  return http.get(`/user/login?userName=${user.userName}&passWord=${user.password}`)
}
