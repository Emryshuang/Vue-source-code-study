import parseTemplate2Tokens from './parseTemplate2Tokens'
import {lookup} from './utils'

function renderTemplate(tokens, data) {
  let resultStr = ''
 
  for (let token of tokens) {
    if (token[0] == 'text') {
      resultStr += token[1]
    } else if (token[0] == 'name') {      
      resultStr+=lookup(data,token[1])
    } else if( token[0] == '#'){
      resultStr += parseArray(token[2],lookup(data,token[1]))
    }
  }
  return resultStr
}

function parseArray(token, data){
  // console.log(token,data)
  
  let resultStr = ''
  for(let i in data){
    resultStr+=renderTemplate(token,data[i])
  }
  return resultStr
}

export default function rander(templateStr, data) {
  const tokens = parseTemplate2Tokens(templateStr)
  // console.log(tokens,data)
  const result = renderTemplate(tokens, data)
  // console.log('@',result)
  return result
}