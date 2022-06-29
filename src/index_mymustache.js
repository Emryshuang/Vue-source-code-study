import rander from './mymustache/rander'

const templateStr1 = `我买了{{phone.number}}件{{thing}}，我好{{mood}}啊`

const data1 = {
  thing: '手机',
  mood: '开心',
  phone:{
    number:2
  }
}

const templateStr2 = `
<div>
  <ol>
    {{#student}}
    <li>
      学生{{name}}的爱好是
      <ul>
        {{#hobbies}}
        <li>{{.}}</li>
        {{/hobbies}}
      </ul>
    </li>
    {{/student}}
  </ol>
</div>
`

const data2 = {
  student:[
    {name:'小明',hobbies:['游泳','健身']},
    {name:'小红',hobbies:['吃饭','睡觉']},
    {name:'小强',hobbies:['足球','篮球','羽毛球']}
  ]
}
console.log(data2)
const result1 = rander(templateStr1, data1)
const result2 =rander(templateStr2, data2)
console.log(result1)
console.log(result2)
const container = document.getElementById('container')
container.innerHTML = result2
