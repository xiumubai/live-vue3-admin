const MSG_EVENT_CONSTANT = {
  // 用户的登录状态变化： 1: 成功登录， 0： 登录失败 （oms）
  LOGIN_STATUS_CHANGE: 'loginStatusChange',
  // socket的连接状态变化： 1: 成功连接   0： 连接断开
  CONNECT_CHANGE: 'connectChange',
  // 接收到P2P消息
  RECEIVE_MSG: 'chatNotify',
  // 接收到消息回执
  CHAT_RESPONSE: 'chatResponse',
  // 接收到离线/未读消息 -> socket重连后接收
  RECEIVE_UNREAD: 'chatUnread',
  SEND_MESSAGE: 'roomSendMessage', // 发送消息的监听
  CHAT_RESPONSE_TIMEOUT: 'CHAT_RESPONSE_TIMEOUT',
  ADD_SESSION: 'ADD_SESSION', // 新增会话
  DEL_SESSION: 'DEL_SESSION', // 删除会话
}
// 最大会话数量
const SESSION_MAX_COUNT = 20
// 房间类型
const ROOM_TYPE = {
  USER: 'USER',
  GROUP: 'GROUP',
}
// 单次历史消息数量
const HISTORY_COUNT = 20
// 消息类型
const MSG_TYPE = 'chat'
// 消息内容类型
const MESSAGE_TYPE = {
  TEXT: 'text',
  IMAGE: 'image',
  AUDIO: 'audio',
  VIDEO: 'video',
  EMOJI: 'emoji',
}

export {
  MSG_EVENT_CONSTANT,
  ROOM_TYPE,
  HISTORY_COUNT,
  MESSAGE_TYPE,
  SESSION_MAX_COUNT,
  MSG_TYPE,
}

export const CHAT_SUCCESS = 1
export const CHAT_FAIL = -1
export const CHAT_PENDING = 0
export const CHAT_INITIAL = -2
export const CHAT_TIMEOUT = 5000 // 5000毫秒后自动发送失败回执。
