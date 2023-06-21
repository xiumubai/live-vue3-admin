/*
 * @Description:类型哦
 * @Autor: codeBo
 * @Date: 2023-06-16 14:22:06
 * @LastEditors: gjzxlihaibo@163.com
 * @LastEditTime: 2023-06-20 17:04:24
 */
import type { ReqPage } from '../types'
// 广告设置模块
export namespace AdSetting {
  export interface ReqAdSettingListParams extends ReqPage {
    name: string
    createTime: string
  }
  export interface ResAdSettingList {
    deleted: boolean
    gmtCreate: string
    gmtModified: string
    id: string
    nickName: string
    password: string
    roleName: string
    salt: null
    token: null
    username: string
  }
  export interface ResAdSettingAdd {
    advertisingName?: string
    order?: number
  }
  export interface ResAdSettingUpdate {
    advertisingName?: string
    id?: string
    order?: number
  }
}
// 广告位设置
export namespace AdSpaceSetting {
  export interface Data {
    commentBottom: boolean
    everyInvitationAdvertising: number
    everyLiveCoverAdvertising: number
    everyShortVideoAdvertising: number
    forYouCommentAdvertising: number
    homeAdvertisingFrequency: number
    playVideoBottom: boolean
    swpperBottom: boolean
    topAdvertising: boolean
  }
}
// 免费视频权限设置

export namespace FreeVideoPermission {
  export interface Data {
    generalSeeLongVideo: number
    generalSeeShortVideo: number
    userDownloadVideo: number
    userFreeLongVideo: number
    userFreeShortVideo: number
    userOfflineCacheVideo: number
    userShare: boolean
    vipSwitch: boolean
    visitorFreeLongVideo: number
    visitorFreeShortVideo: number
    visitorShare: boolean
  }
}
// 礼物管理
export namespace GiftManager {
  export interface GiftManagerListParams extends ReqPage {
    name: string
    createTime: string
  }
  export interface Data {
    id: number
    username: string
    name: string
    advertisingName: string
    roleName: string
    smallPic: string
    order: number
    price: number
    status: boolean
    createTime: string
    updateTime: string
    pageContainer: string
  }
  export interface GiftManagerAdd {
    advertisingName?: string
    price?: number
    file: any
  }
  export interface GiftManagerUpdate {
    advertisingName?: string
    id?: string
    price?: number
    file: any
  }
}
