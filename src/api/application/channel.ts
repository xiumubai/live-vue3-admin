/*
 * @Author: 朽木白
 * @Date: 2023-06-16 15:41:27
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-20 14:27:16
 * @Description: 频道管理
 */

import http from '@/utils/http'
import type { PageRes } from '../types'
import type { IChannel } from './types'

/**
 * @description 获取分页列表(带搜索)
 * @param page
 * @param limit
 * @param roleName
 * @returns {<PageRes<IChannel.IResChannel>>}
 */
export function getChannelList(params: IChannel.IReqQuery) {
  return http.get<PageRes<IChannel.IResChannel>>(
    `/admin/application/channel/list/${params.pageSize}/${params.pageNum}`,
    { name: params.name },
  )
}
