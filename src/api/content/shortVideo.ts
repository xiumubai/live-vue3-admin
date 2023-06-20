/*
 * @Author: 朽木白
 * @Date: 2023-06-16 15:41:27
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-20 14:27:09
 * @Description: 短视频管理
 */

import http from '@/utils/http'
import type { PageRes } from '../types'
import type { IShortVideo } from './types'

/**
 * @description 获取分页列表(带搜索)
 * @param page
 * @param limit
 * @param roleName
 * @returns {<PageRes<IShortVideo.IResShortVideo>>}
 */
export function getShortVideoList(params: IShortVideo.IReqQuery) {
  return http.get<PageRes<IShortVideo.IResShortVideo>>(
    `/admin/content/shortVideo/list/${params.pageSize}/${params.pageNum}`,
    { name: params.name },
  )
}
