import EventEmitter from './event'
export default class ListenerMidWare extends EventEmitter {
  interceptMap: Map<string, any[]>
  constructor() {
    super()
    this.interceptMap = new Map()
  }
  addListener(key: string, fn: any) {
    //key :"getSessionList.before"
    const mapValue = this.interceptMap.get(key) || []
    if (this.interceptMap.has(key)) {
      mapValue.push(fn)
      this.interceptMap.set(key, mapValue)
    } else {
      this.interceptMap.set(key, [fn])
    }
  }
  runListener(loc: string, key: string, ...param: any) {
    const longKey = `${key}.${loc}`
    let mapValue: any[] = []
    if (this.interceptMap.has(longKey)) {
      mapValue = this.interceptMap.get(longKey) || []
    } else if (this.interceptMap.has(key)) {
      mapValue = this.interceptMap.get(key) || []
    }
    mapValue.forEach((fn) => (param = fn(...param)))
    return param.length === 1 ? param[0] : param
  }
}
