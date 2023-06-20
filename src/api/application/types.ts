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

export namespace IChannel {
  export interface IReqQuery extends ReqPage {
    name: string
  }
  export interface IResChannel {
    createTime?: string
    id?: number
    /**
     * 频道名称
     */
    name: string
    /**
     * 排序值
     */
    order: string
    /**
     * 所属页面
     */
    page: string
    /**
     * 状态
     */
    status: boolean
  }
}

export namespace IVideoTag {
  export interface IReqQuery extends ReqPage {
    name: string
  }
  export interface IResVideoTag {
    createTime?: string
    id?: number
    /**
     * 频道名称
     */
    name: string
    /**
     * 状态
     */
    status: boolean
    /**
     * 备注
     */
    mark: string
  }
}

export namespace IVideoClass {
  export interface IReqQuery extends ReqPage {
    name: string
  }
  export interface IResVideoClass {
    createTime?: string
    id?: number
    /**
     * 频道名称
     */
    name: string
    /**
     * 父级分类
     */
    parentName: string
    /**
     * 状态
     */
    status: boolean
    /**
     * 备注
     */
    mark: string
  }
  export interface IAllClassItem {
    label: string
    children: IAllClassItem[]
  }
}

export namespace ICreateLevel {
  export interface IReqQuery extends ReqPage {
    name: string
  }
  export interface IResCreateLevel {
    createTime?: string
    id?: number
    /**
     * 频道名称
     */
    name: string
    /**
     * 状态
     */
    status: boolean
    /**
     * 备注
     */
    mark: string
  }
}
