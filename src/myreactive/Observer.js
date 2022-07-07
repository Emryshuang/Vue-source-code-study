import { arrayMethods } from './array'
import defineReactive from './defineReactive'
import Dep from './Dep'
import {def} from './utils'

class Observer{
  constructor(value){
    console.log('This is Observer constructor @',value)
    this.dep = new Dep
    def(value, '__ob__', this, false)
    
    if(Array.isArray(value)){
      Object.setPrototypeOf(value,arrayMethods)
      this.observeArray(value)
    }else{
      this.walk(value)
    }
  }

  walk(value){
    for(let k in value){
      defineReactive(value,k)
    }
  }

  observeArray(arr){
    for(let i = 0; i < arr.length; i++){
      observe(arr[i])
    }
  }
}


function observe(value){
  console.log('This is function observe')
  if(typeof value != 'object') return

  let ob = undefined
  if(typeof value.__ob__ !== 'undefined'){
    ob = value.__ob__
  }else{
    ob = new Observer(value)
  }
  return ob
}

export {observe}