function def(obj, key, value,enumerable){
  Object.defineProperty(obj,key,{
    value,
    enumerable,
    writable:true,
    configurable:true
  })
}
function parsePath(str) {
  let segments = str.split('.')

  return (obj) => {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}
export {def,parsePath}