export interface INTERFACE_MESSAGE {
  id: number | string
  sender: number | string
  receiver: number | string
  body: number | string
  msgtype: number | string
  mimetype: number | string
  status: number | string
  create_time: number | string
  kid: number | string
  ktype: number | string
  activity_id: number | string
  sender_name: number | string
  sender_role: number | string
  receiver_name: number | string
  receiver_role: number | string
}

export interface INTERFACE_ROOM_USER {
  contact_role: string | number
  contact_id: string | number
  contact_name: string
}

export interface INTERFACE_SOCKET_OPT_BASE {
  socketUrl: string
  userId?: string | number
  userType?: string | number
  loginType?: string | number
  token?: string
  userRole?: string | number
}

export interface INTERFACE_SOCKET_OPT extends INTERFACE_SOCKET_OPT_BASE {
  bussinessId: string | number
  autoCreateSocket?: boolean
}

export interface IHttpBaseUrlObj {
  finishCurrentSessionUrl?: string
  getSessionListUrl?: string
  setUnreadMessagesUrl?: string
  getChatHistoryUrl?: string
}
