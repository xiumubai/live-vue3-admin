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

export namespace ILongVideo {
  export interface IReqQuery extends ReqPage {
    name: string
  }
  export interface IResLongVideo {
    /**
     * 审核管理员
     */
    authName: string
    /**
     * 上传者
     */
    author: string
    /**
     * 审核状态
     */
    authStatus: number
    /**
     * 审核时间
     */
    authTime: string
    /**
     * 封面
     */
    postUrl: string
    /**
     * 分类
     */
    category: string
    createTime?: string
    id?: number
    /**
     * 手机号
     */
    phone: string

    /**
     * 视频地址
     */
    src: string
    /**
     * 开启状态
     */
    status: boolean
    /**
     * 标题
     */
    title: string
    /**
     * 上传时间
     */
    uploadTime: string
  }
}

export namespace IShortVideo {
  export interface IReqQuery extends ReqPage {
    name: string
  }
  export interface IResShortVideo {
    /**
     * 审核管理员
     */
    authName: string
    /**
     * 上传者
     */
    author: string
    /**
     * 审核状态
     */
    authStatus: number
    /**
     * 审核时间
     */
    authTime: string
    /**
     * 封面
     */
    postUrl: string
    /**
     * 标签
     */
    tagName: string
    createTime?: string
    id?: number
    /**
     * 手机号
     */
    phone: string

    /**
     * 视频地址
     */
    src: string
    /**
     * 开启状态
     */
    status: boolean
    /**
     * 标题
     */
    title: string
    /**
     * 上传时间
     */
    uploadTime: string
  }
}
