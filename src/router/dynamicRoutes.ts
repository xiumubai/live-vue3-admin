/**
 * @description 📚 路由参数配置简介
 * @param path ==> 菜单路径
 * @param name ==> 菜单别名
 * @param redirect ==> 重定向地址
 * @param component ==> 视图文件路径
 * @param meta ==> 菜单信息
 * @param meta.icon ==> 菜单图标
 * @param meta.title ==> 菜单标题
 * @param meta.activeMenu ==> 当前路由为详情页时，需要高亮的菜单
 * @param meta.isLink ==> 是否外链
 * @param meta.isHide ==> 是否隐藏
 * @param meta.isFull ==> 是否全屏(示例：数据大屏页面)
 * @param meta.isAffix ==> 是否固定在 tabs nav
 * @param meta.isKeepAlive ==> 是否缓存
 * */
import { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layouts/index.vue')

export const dynamicRoutes: RouteRecordRaw[] = [
  // 基础数据模块
  {
    path: '/user',
    component: Layout,
    redirect: '/base/dict/list',
    name: 'UserManage',
    meta: {
      title: '用户管理',
      icon: 'Menu',
    },
    children: [
      {
        path: '/user/normal/list',
        name: 'UserNormal',
        component: () => import('@/views/user/normal/index.vue'),
        meta: { title: '普通用户管理', icon: 'Grid' },
      },
      {
        path: '/user/creator/list',
        name: 'UserCreator',
        component: () => import('@/views/user/creator/index.vue'),
        meta: { title: '创作者管理', icon: 'Grid' },
      },
      {
        path: '/user/anchor/list',
        name: 'UserAnchor',
        component: () => import('@/views/user/anchor/index.vue'),
        meta: { title: '主播管理', icon: 'Grid' },
      },
      {
        path: '/user/manager/list',
        name: 'UserManager',
        component: () => import('@/views/user/manager/index.vue'),
        meta: { title: '房管管理', icon: 'Grid' },
      },
      {
        path: '/user/actor/list',
        name: 'UserActor',
        component: () => import('@/views/user/actor/index.vue'),
        meta: { title: '演员管理', icon: 'Grid' },
      },
    ],
  },
  // 权限管理
  {
    name: 'Acl',
    path: '/acl',
    component: Layout,
    redirect: '/acl/user',
    meta: {
      title: '权限管理',
      icon: 'Setting',
    },
    children: [
      {
        name: 'User',
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'UserFilled',
        },
      },
      {
        name: 'Role',
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'Avatar',
        },
      },
      {
        name: 'Permission',
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        meta: {
          title: '菜单管理',
          icon: 'Menu',
        },
      },
    ],
  },
  // 营销管理
  {
    name: 'MarketManager',
    path: '/marketManager',
    component: Layout,
    redirect: '/marketManager/vip',
    meta: {
      title: '营销管理',
      icon: 'Setting',
    },
    children: [
      {
        name: 'AdvertisementSetting',
        path: '/marketManager/advertisementSetting',
        component: () =>
          import('@/views/market/advertisementSetting/index.vue'),
        meta: {
          title: '广告设置',
          icon: 'UserFilled',
        },
      },
      {
        name: 'AdvertisementSpaceSetting',
        path: '/marketManager/advertisementSpaceSetting',
        component: () =>
          import('@/views/market/advertisementSpaceSetting/index.vue'),
        meta: {
          title: '广告位设置',
          icon: 'UserFilled',
        },
      },
      {
        name: 'VIPManager',
        path: '/marketManager/vip',
        component: () => import('@/views/market/vip/index.vue'),
        meta: {
          title: 'VIP设置',
          icon: 'UserFilled',
        },
      },
      {
        name: 'ProxyManager',
        path: '/marketManager/proxyManager',
        component: () => import('@/views/market/proxyManager/index.vue'),
        meta: {
          title: '代理设置',
          icon: 'UserFilled',
        },
      },
      {
        name: 'FreeVideoPermissionManager',
        path: '/marketManager/freeVideoPermissionManager',
        component: () =>
          import('@/views/market/freeVideoPermissionManager/index.vue'),
        meta: {
          title: '免费视频权限设置',
          icon: 'UserFilled',
        },
      },
      {
        name: 'GiftManager',
        path: '/marketManager/giftManager',
        component: () => import('@/views/market/giftManager/index.vue'),
        meta: {
          title: '礼物管理',
          icon: 'UserFilled',
        },
      },
    ],
  },
]
