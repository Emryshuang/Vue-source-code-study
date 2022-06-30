import parse from './parse'

const templateString = `
<div>
  <h3 class='box' id='mybox'>你好</h3>
  <ul>
    <li>A</li>
    <li>B</li>
    <li>C</li>
  </ul>
  <div>
    <div>哈哈</div>
  </div>
</div>
`
const result = parse(templateString)
console.log(result)