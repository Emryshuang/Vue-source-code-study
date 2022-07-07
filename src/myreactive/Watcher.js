import Dep from './Dep'
import { parsePath } from './utils'
let uid = 0
export default class Watcher {
  constructor(target, expression, callback) {
    console.log('This is constructor of Watcher')
    this.id = uid++
    this.target = target
    this.getter = parsePath(expression)
    this.callback = callback
    this.value = this.get()
  }

  addDep(dep) {
    dep.addSub(this)
  }

  update() {
    this.run()
  }
  get() {
    Dep.target = this
    const obj = this.target
    let value

    try {
      value = this.getter(obj)
    } finally {
      Dep.target = null
    }

    return value
  }
  run() {
    this.getAndInvoke(this.callback)
  }
  getAndInvoke(cb) {

    const value = this.getter(this.target)
    if (value !== this.value || typeof value == 'object') {
      const oldValue = this.value
      this.value = value
      cb.call(this.target, value, oldValue)
    }
  }
}

