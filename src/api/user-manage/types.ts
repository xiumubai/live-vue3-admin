import type { ReqPage } from '../types'

/**
 * VIP等级
 */
export type Level = 'VIP' | 'SVIP'

/**
 * 性别
 *
 * 开启状态
 */
export type Empty = '0' | '1'

export namespace NormalMange {
  export interface IReqQuery extends ReqPage {
    name: string
  }
  export interface IResNormal {
    /**
     * 账户余额
     */
    account: number
    authStatus: number
    /**
     * 头像
     */
    avatar: string
    createTime?: string
    id?: number
    /**
     * VIP等级
     */
    level: Level
    /**
     * 用户名
     */
    name: string
    /**
     * 在线状态
     */
    onlineStatus: number
    /**
     * 手机号
     */
    phone: string
    /**
     * 性别
     */
    sex: Empty
    /**
     * 开启状态
     */
    status: Empty
  }
}
