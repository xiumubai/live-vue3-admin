import type { ReqPage } from '../types'

/**
 * VIP等级
 */
export type Level = 'VIP' | 'SVIP'

/**
 * 性别
 */
export enum Sex {
  The0 = '0',
  The1 = '1',
}

/**
 * 开启状态
 */
export type Empty = '0' | '1'

export namespace INormalMange {
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

export namespace ICreator {
  export interface IReqQuery extends ReqPage {
    name: string
  }
  export interface IResCreator {
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
     * 长视频数量
     */
    longVideoNum: number
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
    sex: Sex
    /**
     * 短视频数量
     */
    shortVideoNum: number
  }
}

export namespace IAnchor {
  export interface IReqQuery extends ReqPage {
    name: string
  }
  export interface IResAnchor {
    /**
     * 账户余额
     */
    account: number
    /**
     * 主播认证
     */
    authStatus: number
    /**
     * 头像
     */
    avatar: string
    createTime?: string
    id?: number
    /**
     * 开播次数
     */
    liveTimes: number
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
    sex: Sex
    /**
     * 开启状态
     */
    status: Empty
  }
}

export namespace IManager {
  export interface IReqQuery extends ReqPage {
    name: string
  }

  export interface IResManager {
    /**
     * 头像
     */
    avatar: string
    createTime?: string
    id?: number
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
    sex: Sex
    /**
     * 开启状态
     */
    status: boolean
  }
}

export namespace IActor {
  export interface IReqQuery extends ReqPage {
    name: string
  }

  export interface IResActor {
    /**
     * 头像
     */
    avatar: string
    createTime?: string
    id?: number
    /**
     * 用户名
     */
    name: string
    /**
     * 手机号
     */
    phone: string
    /**
     * 性别
     */
    sex: Sex
    /**
     * 开启状态
     */
    status: boolean
  }
}
