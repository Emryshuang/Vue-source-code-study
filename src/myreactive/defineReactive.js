import Dep from './Dep'
import { observe } from './Observer'

export default function defineReactive(data, key, val = data[key]) {


  // eslint-disable-next-line no-unused-vars
  let childOb = observe(val)
  const dep = new Dep()
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,


    get() {
      console.log(`the @${key} property of obj is accessed, it is @${val}`)
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
        }
      }     

      return val
    },

    set(newValue) {
      console.log(`the @${key} property of obj is modified, new value is @${newValue}`)
      if (newValue == val) {
        return
      }
      val = newValue
      childOb = observe(newValue)
      dep.notify()
    }
  })

}