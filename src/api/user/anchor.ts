/*
 * @Author: 朽木白
 * @Date: 2023-06-16 15:41:27
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-19 15:31:48
 * @Description: 主播管理
 */

import http from '@/utils/http'
import type { PageRes } from '../types'
import type { IAnchor } from './types'

/**
 * @description 获取分页列表(带搜索)
 * @param page
 * @param limit
 * @param roleName
 * @returns {<PageRes<ICreator.IResCreator>>}
 */
export function getAnchorList(params: IAnchor.IReqQuery) {
  return http.get<PageRes<IAnchor.IResAnchor>>(
    `/admin/user/anchor/list/${params.pageSize}/${params.pageNum}`,
    { name: params.name },
  )
}