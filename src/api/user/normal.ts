/*
 * @Author: 朽木白
 * @Date: 2023-06-16 15:41:27
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-26 10:28:53
 * @Description: 普通用户管理
 */

import http from '@/utils/http'
import type { PageRes, ReqPage } from '../types'
import type { INormalMange } from './types'

/**
 * @description 获取分页列表(带搜索)
 * @param page
 * @param limit
 * @param roleName
 * @returns {<PageRes<INormalMange.IResNormal>>}
 */
export function getNormalUserList(params: INormalMange.IReqQuery) {
  const startTime =
    params.createTime && params.createTime.length > 0 && params.createTime[0]
  const endTime =
    params.createTime && params.createTime.length > 0 && params.createTime[1]
  return http.get<PageRes<INormalMange.IResNormal>>(
    `/admin/user/normal/list/${params.pageSize}/${params.pageNum}`,
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

/** 新增用户 */
export function addNormalUser(params: INormalMange.NormalUserModel) {
  return http.post<PageRes<any>>(`/admin/user/normal/save`, params)
}

/** 编辑用户 */
export function updateNormalUser(params: INormalMange.NormalUserModel) {
  return http.put<PageRes<any>>(`/admin/user/normal/update`, params)
}

/** 获取视频列表*/
export function getVideoList(params: ReqPage) {
  return http.get<PageRes<INormalMange.IResNormal>>(
    `/admin/user/normal/videoList/${params.id}`,
    {
      pageSize: params.pageSize,
      pageNum: params.pageNum,
    },
  )
}

/** 获取账户余额列表*/
export function getAccountList(params: ReqPage) {
  return http.get<PageRes<INormalMange.IResNormal>>(
    `/admin/user/normal/accountList/${params.id}`,
    {
      pageSize: params.pageSize,
      pageNum: params.pageNum,
    },
  )
}
