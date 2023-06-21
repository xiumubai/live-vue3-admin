export default class EventEmitter {
  _eventMap: Map<string, any[]>
  constructor() {
    this._eventMap = new Map()
  }

  emit(type: string, ...args: any) {
    if (this._eventMap.has(type)) {
      const cbs: any = this._eventMap.get(type)
      for (const fn of cbs) {
        fn.apply(this, args)
      }
      return true
    } else {
      return false
    }
  }

  off(type: string, fn: any) {
    if (type === undefined) {
      this._eventMap.clear()
    } else if (this._eventMap.has(type)) {
      if (fn === undefined) {
        this._eventMap.delete(type)
      } else {
        const cbs: any[] | undefined = this._eventMap.get(type)
        if (cbs && cbs.length > 1) {
          cbs.splice(cbs.indexOf(fn), 1)
        } else {
          this._eventMap.delete(type)
        }
      }
    }
    return this
  }

  on(type: string, fn: any) {
    if (this._eventMap.has(type)) {
      const cbs: any[] | undefined = this._eventMap.get(type)
      cbs && cbs.push(fn)
    } else {
      this._eventMap.set(type, [fn])
    }
    return this
  }

  once(type: string, fn: any) {
    this.on(type, (...args: any) => {
      this.off(type, fn)
      fn.apply(this, args)
    })
    return this
  }
}
