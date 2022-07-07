import { observe } from './Observer'
import Watcher from './Watcher'



const obj = {
  a: 1,
  b: {
    x: 100
  },
  c: [12, 32, 546, 766, 879, 415]
}

observe(obj)
// obj.a = { x: 23, y: 24 }
console.log(obj.c)
obj.c.push(1235767)
console.log(obj.b.x)
obj.b.x=233
new Watcher(obj, 'b.x', (val) => {
  console.log('★this is watcher, watching a.m.n', val)
})
obj.b.x=2323

