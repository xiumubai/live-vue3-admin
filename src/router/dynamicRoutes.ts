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
    redirect: '/user/normal/list',
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
        path: '/user/normal/show/:id',
        component: () => import('@/views/user/normal/show.vue'),
        meta: {
          title: '普通用户管理详情',
          isHide: true,
          noAuth: true,
          icon: 'Grid',
        },
      },
      {
        path: '/user/creator/list',
        name: 'UserCreator',
        component: () => import('@/views/user/creator/index.vue'),
        meta: { title: '创作者管理', icon: 'Grid' },
      },
      {
        path: '/user/creator/show/:id',
        component: () => import('@/views/user/creator/show.vue'),
        meta: {
          title: '创作者详情',
          isHide: true,
          noAuth: true,
          icon: 'Grid',
        },
      },
      {
        path: '/user/anchor/list',
        name: 'UserAnchor',
        component: () => import('@/views/user/anchor/index.vue'),
        meta: { title: '主播管理', icon: 'Grid' },
      },
      {
        path: '/user/anchor/show/:id',
        component: () => import('@/views/user/anchor/show.vue'),
        meta: {
          title: '主播详情',
          isHide: true,
          noAuth: true,
          icon: 'Grid',
        },
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
  // 内容管理
  {
    name: 'Content',
    path: '/content',
    component: Layout,
    redirect: '/content/long-video',
    meta: {
      title: '内容管理',
      icon: 'Menu',
    },
    children: [
      {
        name: 'LongVideo',
        path: '/content/long-video',
        component: () => import('@/views/content/longVideo/index.vue'),
        meta: {
          title: '长视频管理',
          icon: 'Grid',
        },
      },
      {
        path: '/content/long-video/show/:id',
        component: () => import('@/views/content/longVideo/show.vue'),
        meta: {
          title: '视频详情',
          isHide: true,
          noAuth: true,
          icon: 'Grid',
        },
      },
      {
        name: 'ShortVideo',
        path: '/content/short-video',
        component: () => import('@/views/content/shortVideo/index.vue'),
        meta: {
          title: '短视频管理',
          icon: 'Grid',
        },
      },
      {
        name: 'Live',
        path: '/content/live',
        component: () => import('@/views/content/live/index.vue'),
        meta: {
          title: '直播管理',
          icon: 'Grid',
        },
      },
      {
        name: 'Post',
        path: '/content/post',
        component: () => import('@/views/content/post/index.vue'),
        meta: {
          title: '帖子管理',
          icon: 'Grid',
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
      // 暂时屏蔽
      // {
      //   name: 'VIPManager',
      //   path: '/marketManager/vip',
      //   component: () => import('@/views/market/vip/index.vue'),
      //   meta: {
      //     title: 'VIP设置',
      //     icon: 'UserFilled',
      //   },
      // },
      // {
      //   name: 'ProxyManager',
      //   path: '/marketManager/proxyManager',
      //   component: () => import('@/views/market/proxyManager/index.vue'),
      //   meta: {
      //     title: '代理设置',
      //     icon: 'UserFilled',
      //   },
      // },
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

  // app管理
  {
    name: 'Application',
    path: '/app',
    component: Layout,
    redirect: '/app/channel',
    meta: {
      title: 'app管理',
      icon: 'Menu',
    },
    children: [
      {
        name: 'Channel',
        path: '/app/channel',
        component: () => import('@/views/application/channel/index.vue'),
        meta: {
          title: '频道管理',
          icon: 'Grid',
        },
      },
      {
        name: 'VideoClass',
        path: '/app/video-class',
        component: () => import('@/views/application/videoClass/index.vue'),
        meta: {
          title: '长视频分类管理',
          icon: 'Grid',
        },
      },
      {
        name: 'VideoTag',
        path: '/app/video-tag',
        component: () => import('@/views/application/videoTag/index.vue'),
        meta: {
          title: '短视频标签管理',
          icon: 'Grid',
        },
      },
      {
        name: 'LiveClass',
        path: '/app/live-class',
        component: () => import('@/views/application/liveClass/index.vue'),
        meta: {
          title: '直播分类管理',
          icon: 'Grid',
        },
      },
      {
        name: 'CreateLevel',
        path: '/app/create-level',
        component: () => import('@/views/application/createLevel/index.vue'),
        meta: {
          title: '创作等级管理',
          icon: 'Grid',
        },
      },
    ],
  },

  // 权限管理 *此路由放在最后*
  {
    name: 'Acl',
    path: '/acl',
    component: Layout,
    redirect: '/acl/user',
    meta: {
      title: '系统管理',
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
]
