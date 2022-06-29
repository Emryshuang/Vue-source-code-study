import parseTemplate2Tokens from './mymustache/parseTemplate2Tokens'


// const templateStr1 = `我买了一件{{thing}}，我好{{mood}}啊`
const templateStr2 = `
<div>
  <ol>
    {{#student}}
    <li>
      学生{{item.name}}的爱好是
      <ul>
        {{#item.hobbies}}
        <li>{{.}}</li>
        {{/item.hobbies}}
      </ul>
    </li>
    {{/student}}
  </ol>
</div>
`

// const data1 = {
//   thing: '手机',
//   mood: 'mood'
// }

const data2 = {
  student:[
    {name:'小明',hobbies:['游泳','健身']},
    {name:'小红',hobbies:['吃饭','睡觉']},
    {name:'小强',hobbies:['足球','篮球','羽毛球']}
  ]
}
const tokens = parseTemplate2Tokens(templateStr2)
console.log(tokens)