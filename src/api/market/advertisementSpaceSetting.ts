/*
 * @Author: 李海波
 * @Date: 2023-03-10 11:31:11
 * @LastEditors: gjzxlihaibo@163.com
 * @LastEditTime: 2023-06-20 14:18:13
 * @Description: 广告位设置页面
 */
import http from '@/utils/http'
import type { AdSpaceSetting } from './types'

/**
 * @description 获取广告位设置信息
 */
export function getAdSpaceSettingList() {
  return http.get<AdSpaceSetting.Data>(
    `/admin/market/advertisementSpaceSetting/list`,
  )
}
/**
 * @description 更新广告位设置信息
 */
export function updateAdSpaceSettingList(params: AdSpaceSetting.Data) {
  return http.post<AdSpaceSetting.Data>(
    `/admin/market/advertisementSpaceSetting/update`,
    params,
  )
}
