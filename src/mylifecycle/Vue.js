import Compile from './Compile'
import Watcher from '../myreactive/Watcher'
import {observe} from '../myreactive/Observer'
export default class Vue {
  constructor(options) {
    this.$options = options || {}
    this._data = options.data || undefined

    this._initData()
    observe(this._data)
    this._initWatch()
    new Compile(this.$options.el, this)
  }

  _initData() {
    Object.keys(this._data).forEach(item => {
      Object.defineProperty(this, item, {
        configurable: true,
        enumerable: true,
        get() {
          return this._data[item]
        },
        set(newVal) {
          this._data[item] = newVal
        }
      })
    })
  }

  _initWatch() {
    const watch = this.$options.watch
    Object.keys(watch).forEach(item => {

      new Watcher(this, item, watch[item])
    })
  }


}