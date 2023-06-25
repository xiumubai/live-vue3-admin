/*
 * @Author: 朽木白
 * @Date: 2023-06-16 15:41:27
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-25 10:44:05
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
  const startTime =
    params.createTime && params.createTime.length > 0 && params.createTime[0]
  const endTime =
    params.createTime && params.createTime.length > 0 && params.createTime[1]
  return http.get<PageRes<ICreator.IResCreator>>(
    `/admin/user/creator/list/${params.pageSize}/${params.pageNum}`,
    {
      name: params.name,
      phone: params.phone,
      sex: params.sex,
      level: params.level,
      startTime,
      endTime,
    },
  )
}
