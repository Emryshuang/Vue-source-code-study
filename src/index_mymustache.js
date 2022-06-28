import Scanner from './mymustache/Scanner'

const templateStr = `我买了一件{{thing}}，我好{{mood}}啊`
// const data = {
//   thing: '手机',
//   mood: 'mood'
// }
const scanner = new Scanner(templateStr)

let word = undefined
console.time('@')
word = scanner.scanUtil('{{')
console.log(word)
scanner.scan('{{')
word = scanner.scanUtil('}}')
console.log(word)
scanner.scan('}}')




while(!scanner.eos()){
  // eslint-disable-next-line no-debugger
  debugger
  word = scanner.scanUtil('{{')
  console.log(word)
  scanner.scan('{{')
  word = scanner.scanUtil('}}')
  console.log(word)
  scanner.scan('}}')
}
console.timeEnd('@')