const isObject = (object: any): boolean => {
  return Object.prototype.toString.call(object).substr(8, 6) === 'Object'
}

const generateId = (uid: string | number): string => {
  const time = +new Date()
  const S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  const seed = S4() + '' + S4() + '' + S4() + '' + S4()
  return uid + '_' + time + '_' + seed
}

export { isObject, generateId }
