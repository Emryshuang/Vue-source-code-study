import Vue from './Vue'

const mv = new Vue({
  el: '#app',
  data:{
    a:10
  },
  watch:{
    a(){
      console.log('I am watching a')
    }
  }
})

console.log(mv)
mv.a++