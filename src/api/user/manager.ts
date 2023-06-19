/*
 * @Author: 朽木白
 * @Date: 2023-06-16 15:41:27
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-19 15:39:36
 * @Description: 创作者管理
 */

import http from '@/utils/http'
import type { PageRes } from '../types'
import type { IManager } from './types'

/**
 * @description 获取分页列表(带搜索)
 * @param page
 * @param limit
 * @param roleName
 * @returns {<PageRes<IManager.IResManager>>}
 */
export function getManagerList(params: IManager.IReqQuery) {
  return http.get<PageRes<IManager.IResManager>>(
    `/admin/user/manager/list/${params.pageSize}/${params.pageNum}`,
    { name: params.name },
  )
}
