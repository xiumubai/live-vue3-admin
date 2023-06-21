import socketIO from './socket'
interface SubscriptionsType {
  [subscriptionId: string]: SubscribeItem
}
interface SubscribeItem {
  type: string
  callback: (message: any) => void
  params?: any
  socketServer: SocketServer
}
export enum SocketServer {
  SYSTEM = 'SYSTEM',
}

interface UnSubscribeParam {
  subscriptionId: string
  type: string
}
export interface SubscribeParam<K = any, T = any> {
  type: string
  params?: K
  callback: (message: T) => void
}
const broadcastSubscriptions: SubscriptionsType = {}
const socketMap: { [socketServer: string]: any } = {}
//name后端搞现在存一下
let name = ''
let socket: any
const createWebSocket = (url: string, socketServer: SocketServer, opt: any) => {
  opt = Object.assign(
    {
      token: '',
      userId: '',
      loginType: '',
      userType: '',
      name: '',
    },
    opt,
  )
  socket = new socketIO({
    url,
    query: {
      systemId: opt.userId,
      token: opt.token,
      userType: opt.userType,
      loginType: opt.loginType,
    },
  })
  name = opt.name
  Object.keys(broadcastSubscriptions).map((subscriptionId: string) => {
    const subscribeItem = broadcastSubscriptions[subscriptionId]
    if (subscribeItem.socketServer === socketServer) {
      const { type, params, callback } = subscribeItem
      delete broadcastSubscriptions[subscriptionId]
      subscribeMessage(
        {
          type,
          params,
          callback,
        },
        socketServer,
      )
    }
  })

  socketMap[socketServer] = socket
}
const subscribeMessage = (
  subscribeParam: SubscribeParam,
  socketServer: SocketServer,
): string => {
  const websocket = socketMap[socketServer]

  if (websocket) {
    const subscriptionId =
      new Date().getTime() + Math.random().toString(36).substr(3, 5)
    const subscribeItem: SubscribeItem = {
      type: subscribeParam.type,
      callback: subscribeParam.callback,
      params: subscribeParam.params,
      socketServer: socketServer,
    }

    broadcastSubscriptions[subscriptionId] = subscribeItem

    websocket.emit(subscribeParam.type, {
      commandType: 'SUBSCRIPT',
      type: socketServer,
      params:
        { ...subscribeParam.params, name, time: new Date().getTime() } || {},
      subscriptionId,
    })
    return subscriptionId
  } else {
    return ''
  }
}
const unSubscribeMessage = (
  unSubscribeParam: UnSubscribeParam,
  socketServer?: SocketServer,
): void => {
  const websocket = socketMap[socketServer!]
  const subscribeItem = broadcastSubscriptions[unSubscribeParam.subscriptionId]
  if (subscribeItem && websocket) {
    delete broadcastSubscriptions[unSubscribeParam.subscriptionId]

    websocket.emit(
      unSubscribeParam.type,
      JSON.stringify({
        commandType: 'UNSUBSCRIPT',
        type: socketServer,
        subscriptionId: unSubscribeParam.subscriptionId,
      }),
    )
  }
}
export { createWebSocket, subscribeMessage, unSubscribeMessage }
