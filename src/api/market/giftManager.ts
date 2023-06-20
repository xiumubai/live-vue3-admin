/*
 * @Author: 李海波
 * @Date: 2023-03-10 11:31:11
 * @LastEditors: gjzxlihaibo@163.com
 * @LastEditTime: 2023-06-20 17:04:40
 * @Description: 礼物管理
 */
import http from '@/utils/http'
import type { PageRes } from '../types'
import type { GiftManager } from './types'

/**
 * @description 获取后台用户分页列表(带搜索)
 * @param page
 * @param username
 * @returns {<PageRes<GiftManager.Data>>}
 */
export function getGiftManagerList(params: GiftManager.GiftManagerListParams) {
  return http.get<PageRes<GiftManager.Data>>(
    `/admin/market/giftManager/list`,
    params,
  )
}

/**
 * @description: 批量删除
 * @param {string[]} ids
 * @returns {<PageRes<any>>}
 */
export function batchGiftManager(ids: string[]) {
  return http.delete<PageRes<any>>(`/admin/market/giftManager/batchDelete`, ids)
}

/**
 * @description: 编辑
 * @param {AclUser} user
 * @returns {<PageRes<any>>}
 */
export function updateGiftManager(params: GiftManager.GiftManagerUpdate) {
  return http.put<PageRes<any>>(`/admin/market/giftManager/update`, params)
}

/**
 * @description 新增
 * @param  {string} advertisingName
 * @param {number} price
 * @returns {<PageRes<any>>}
 */
export function addGiftManager(params: GiftManager.GiftManagerAdd) {
  return http.post<PageRes<any>>(`/admin/market/giftManager/add`, params)
}
