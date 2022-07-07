let uid = 0
export default class Dep {
  constructor() {
    this.id = uid++


    this.subs = []
  }
  // 添加订阅
  addSub(sub) {
    this.subs.push(sub)
  }
  // 添加依赖
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify() {
    console.log('This is function notify')

    const subs = this.subs.slice()

    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

Dep.target = null
const TargetStack = []

export function pushTarget(_target) {
  TargetStack.push(Dep.target)
  Dep.target = _target
}

export function popTarget() {
  Dep.target = TargetStack.pop()
}