/*
 * @Author: 李海波
 * @Date: 2023-03-10 11:31:11
 * @LastEditors: gjzxlihaibo@163.com
 * @LastEditTime: 2023-06-16 17:22:34
 * @Description: vip设置页面
 */
import http from '@/utils/http'
import type { PageRes } from '../types'
import type { AdSetting } from './types'

/**
 * @description 获取后台用户分页列表(带搜索)
 * @param page
 * @param limit
 * @param username
 * @returns {<PageRes<AdSetting.ResAdSettingList>>}
 */
export function getAdSettingList(params: AdSetting.ReqAdSettingListParams) {
  return http.get<PageRes<AdSetting.ResAdSettingList>>(
    `/admin/market/advertisementSetting/list`,
    params,
  )
}

/**
 * @description: 批量删除
 * @param {string[]} ids
 * @returns {<PageRes<any>>}
 */
export function batchAdSetting(ids: string[]) {
  return http.delete<PageRes<any>>(
    `/admin/market/advertisementSetting/batchDelete`,
    ids,
  )
}

/**
 * @description: 编辑
 * @param {AclUser} user
 * @returns {<PageRes<any>>}
 */
export function updateAdSetting(params: AdSetting.ResAdSettingUpdate) {
  return http.put<PageRes<any>>(
    `/admin/market/advertisementSetting/update`,
    params,
  )
}

/**
 * @description 新增
 * @param  {string} advertisingName
 * @param {number} order
 * @returns {<PageRes<any>>}
 */
export function addAdSetting(params: AdSetting.ResAdSettingAdd) {
  return http.post<PageRes<any>>(
    `/admin/market/advertisementSetting/add`,
    params,
  )
}
