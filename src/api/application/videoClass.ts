/*
 * @Author: 朽木白
 * @Date: 2023-06-16 15:41:27
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-20 16:09:16
 * @Description: 短视频标签管理
 */

import http from '@/utils/http'
import type { PageRes } from '../types'
import type { IVideoClass } from './types'

/**
 * @description 获取分页列表(带搜索)
 * @param page
 * @param limit
 * @param roleName
 * @returns {<PageRes<ILongVideo.IResChannel>>}
 */
export function getVideoClassList(params: IVideoClass.IReqQuery) {
  return http.get<PageRes<IVideoClass.IResVideoClass>>(
    `/admin/application/videoClass/list/${params.pageSize}/${params.pageNum}`,
    { name: params.name },
  )
}

/**
 * @description: 获取视频所有分类（树结构）
 * @returns {*}
 */
export function getAllClass() {
  return http.get<IVideoClass.IAllClassItem>(
    `/admin/application/videoClass/getAll`,
  )
}
