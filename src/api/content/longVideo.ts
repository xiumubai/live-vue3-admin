/*
 * @Author: 朽木白
 * @Date: 2023-06-16 15:41:27
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-27 10:58:19
 * @Description: 长视频管理
 */

import http from '@/utils/http'
import type { PageRes, ReqPage } from '../types'
import type { ILongVideo, ISelectItem } from './types'

/**
 * @description 获取分页列表(带搜索)
 * @param page
 * @param limit
 * @param roleName
 * @returns {<PageRes<ILongVideo.IResLongVideo>>}
 */
export function getLongVideoList(params: ILongVideo.IReqQuery) {
  // 上传时间
  const uploadStartTime =
    params.uploadTime && params.uploadTime.length > 0 && params.uploadTime[0]
  const uploadEndTime =
    params.uploadTime && params.uploadTime.length > 0 && params.uploadTime[1]

  // 审核时间
  const authStartTime =
    params.authTime && params.authTime.length > 0 && params.authTime[0]
  const authEndTime =
    params.authTime && params.authTime.length > 0 && params.authTime[1]

  return http.get<PageRes<ILongVideo.IResLongVideo>>(
    `/admin/content/longVideo/list/${params.pageSize}/${params.pageNum}`,
    {
      title: params.title,
      author: params.author,
      authStatus: params.authStatus,
      category: params.category,
      uploadStartTime,
      uploadEndTime,
      authStartTime,
      authEndTime,
    },
  )
}

/** 分类 */
export function getClassList() {
  return http.get<PageRes<ISelectItem[]>>('/admin/content/longVideo/category')
}

/** 视频数据列表*/
export function getVideoRecordList(params: ReqPage) {
  return http.get<PageRes<any>>(
    `/admin/content/longVideo/videoRecordList/${params.id}`,
    {
      pageSize: params.pageSize,
      pageNum: params.pageNum,
    },
  )
}

/** 视频付费列表*/
export function getVideoPayList(params: ReqPage) {
  return http.get<PageRes<any>>(
    `/admin/content/longVideo/videoPayList/${params.id}`,
    {
      pageSize: params.pageSize,
      pageNum: params.pageNum,
    },
  )
}
