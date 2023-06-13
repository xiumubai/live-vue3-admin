/*
 * @Author: 朽木白
 * @Date: 2023-02-27 09:50:34
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-13 16:34:43
 * @Description: 系统用户登陆信息接口
 */
import http from '@/utils/http'
import type { LoginData, UserRes } from './types'

/**
 * 登录
 */
export function login(data: LoginData) {
  return http.post<string>('/live/admin/acl/login', data)
}

/**
 * 获取登录用户信息
 */
export function getUserInfo() {
  return http.get<UserRes>('/live/admin/acl/index/info')
}

/**
 * 退出登陆
 */
export function logout() {
  return http.post('/admin/acl/index/logout')
}
