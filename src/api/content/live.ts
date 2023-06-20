/*
 * @Author: 朽木白
 * @Date: 2023-06-16 15:41:27
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-20 14:29:56
 * @Description: 直播管理
 */

import http from '@/utils/http'
import type { PageRes } from '../types'
import type { ILive } from './types'

/**
 * @description 获取分页列表(带搜索)
 * @param page
 * @param limit
 * @param roleName
 * @returns {<PageRes<ILive.IResLive>>}
 */
export function getLiveList(params: ILive.IReqQuery) {
  return http.get<PageRes<ILive.IResLive>>(
    `/admin/content/live/list/${params.pageSize}/${params.pageNum}`,
    { name: params.name },
  )
}
