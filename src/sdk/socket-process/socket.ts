/*
 * @Description:长链接包源头使用
 * @Autor: codeBo
 * @Date: 2023-06-21 10:21:18
 * @LastEditors: gjzxlihaibo@163.com
 * @LastEditTime: 2023-06-21 10:27:23
 */
import io from 'socket.io-client'
// 实例化 io 类
class socketIO {
  socket: any
  constructor(opt: { url: string; query: any }) {
    // 最新版直接使用 io 调用，不需要使用 io.connnet ， 第一个参数是 url ，第二个参数是配置项 后端可通过 on connection 事件 参数中 解构出来 handshake 读取
    this.socket = io(opt.url, {
      reconnection: true,
      transports: ['websocket'],
      query: opt.query || {},
    })
  }
  // 派发事件
  emit(event: string, param: any): void {
    console.log('=============send:', event, ':', param)
    this.socket.emit(event, param)
  }
  // 侦听事件， callback 是回调， 后端直接调用传参给前端
  addListener(event: string, callback: (res: any) => undefined) {
    this.socket.on(event, (data: any) => {
      callback(data)
    })
  }
  // 开启长链接
  open(): void {
    console.log('=============socket-open')
    this.socket.open()
  }
  // 链接
  connect(): void {
    this.socket.connect()
  }
  // 关闭
  close(): void {
    this.socket.close()
  }
}

export default socketIO
