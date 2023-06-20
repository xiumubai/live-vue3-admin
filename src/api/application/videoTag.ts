/*
 * @Author: 朽木白
 * @Date: 2023-06-16 15:41:27
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-20 14:27:47
 * @Description: 短视频标签管理
 */

import http from '@/utils/http'
import type { PageRes } from '../types'
import type { IVideoTag } from './types'

/**
 * @description 获取分页列表(带搜索)
 * @param page
 * @param limit
 * @param roleName
 * @returns {<PageRes<IVideoTag.IResChannel>>}
 */
export function getVideoTagList(params: IVideoTag.IReqQuery) {
  return http.get<PageRes<IVideoTag.IResVideoTag>>(
    `/admin/application/videoTag/list/${params.pageSize}/${params.pageNum}`,
    { name: params.name },
  )
}
