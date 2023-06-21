import EventEmitter from '../util/event'
import { MSG_EVENT_CONSTANT } from '../util/constant'
import socketIO from './socket'
import { INTERFACE_SOCKET_OPT_BASE } from './interface'
export class ProcessSocket extends EventEmitter {
  socket: any
  opt: INTERFACE_SOCKET_OPT_BASE
  constructor(opt: INTERFACE_SOCKET_OPT_BASE) {
    super()
    // opt socket 配置项， 可以根据需求自行更改， socketUrl 必填
    this.opt = Object.assign(
      {
        socketUrl: '',
        token: '',
        userId: '',
        loginType: '',
        userType: '',
      },
      opt,
    )
    this.socket = new socketIO({
      url: opt.socketUrl,
      query: {
        systemId: this.opt.userId,
        token: this.opt.token,
        userType: this.opt.userType,
        loginType: this.opt.loginType,
      },
    })
    this.bindEvent()
  }
  bindEvent = (): void => {
    // 连接成功
    this.socket.addListener('connect', () => {
      console.log('=============connected:')
      this.emit(MSG_EVENT_CONSTANT.CONNECT_CHANGE, 1)
      // 用户信息校验
      const param = {
        cmd: 'register',
        userId: this.opt.userId,
        role: this.opt.userRole || 'default',
        deviceVersion: 'web service system',
        token: this.opt.token,
      }
      this.socket.emit('my_event', param)
    })
    // 连接断开
    this.socket.addListener('disconnect', (reason: string) => {
      console.log('=============discounnect:', reason)
      // if (reason === "io server disconnect") {
      //     this.socket.connect();
      // }
      this.emit(MSG_EVENT_CONSTANT.CONNECT_CHANGE, 0)
      //this.socket.connect();
    })
    // 连接错误
    this.socket.addListener('error', (reason: string) => {
      console.log('=============error连接错误:', reason)
      this.emit(MSG_EVENT_CONSTANT.CONNECT_CHANGE, 0)
    })
    // 连接错误
    this.socket.addListener('connect_error', (reason: string) => {
      console.log('=============connect_error连接错误', reason)
      this.emit(MSG_EVENT_CONSTANT.CONNECT_CHANGE, 0)
    })
    // 接收消息
    this.socket.addListener('connect_msg', (reason: string) => {
      console.log('=============接收消息', reason)
    })
  }
  // 登录
  login(): void {
    this.socket.open()
  }
  // 发送消息
  sendMessage(dataObj: any): void {
    const sendData = {
      cmd: 'chat',
      message: dataObj,
    }
    this.socket.emit('my_event', sendData)
  }
}
