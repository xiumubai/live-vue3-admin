/*
 * @Author: 朽木白
 * @Date: 2023-06-16 15:41:27
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-16 16:53:03
 * @Description: 普通用户管理
 */

import http from '@/utils/http'
import type { PageRes } from '../types'
import type { NormalMange } from './types'

/**
 * @description 获取后台用户分页列表(带搜索)
 * @param page
 * @param limit
 * @param roleName
 * @returns {<PageRes<Role.ResRoleList>>}
 */
export function getNormalUserList(params: NormalMange.IReqQuery) {
  return http.get<PageRes<NormalMange.IResNormal>>(
    `/admin/user/normal/list/${params.pageSize}/${params.pageNum}`,
    { name: params.name },
  )
}
