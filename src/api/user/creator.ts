/*
 * @Author: 朽木白
 * @Date: 2023-06-16 15:41:27
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-19 15:31:59
 * @Description: 创作者管理
 */

import http from '@/utils/http'
import type { PageRes } from '../types'
import type { ICreator } from './types'

/**
 * @description 获取分页列表(带搜索)
 * @param page
 * @param limit
 * @param roleName
 * @returns {<PageRes<ICreator.IResCreator>>}
 */
export function getCreatorList(params: ICreator.IReqQuery) {
  return http.get<PageRes<ICreator.IResCreator>>(
    `/admin/user/creator/list/${params.pageSize}/${params.pageNum}`,
    { name: params.name },
  )
}
