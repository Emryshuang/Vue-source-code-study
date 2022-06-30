import parseAttrsString from './parseAttrsString'

export default function (templateString) {

  let index = 0
  let rest = undefined

  const startRegExp = /^<([a-z]+[1-6]?)(\s[^<]+)?>/
  const endRegExp = /^<\/([a-z]+[1-6]?)>/
  const wordRegExp = /^([^<]+)<\/[a-z]+[1-6]?>/

  const tagStack = []
  const innerStack = [{ 'tag': 'root', 'children': [] }]


  while (index < templateString.length - 1) {
    rest = templateString.substring(index)
    if (startRegExp.test(rest)) {
      let tag = rest.match(startRegExp)[1]
      let attrsString = rest.match(startRegExp)[2]
      // console.log('检测到开始标记', tag, '@', attrsString)
      tagStack.push(tag)
      innerStack.push({ 'tag': tag, 'children': [], attrs: parseAttrsString(attrsString) })
      index += attrsString ? tag.length + 2 + attrsString.length : tag.length + 2
      // index += tag.length + 2 + attrsString.length
    } else if (endRegExp.test(rest)) {
      // console.log('检测到结束标记', tag) 
      let tag = rest.match(endRegExp)[1]
      if (tagStack.length > 0) {
        let pop_tag = tagStack.pop()
        if (tag == pop_tag) {
          let pop_inner = innerStack.pop()
          innerStack[innerStack.length - 1].children.push(pop_inner)
        } else {
          throw new Error(`${tagStack[tagStack.length - 1]}标签没有封闭`)
        }
      } else {
        throw new Error(`${tag}标签没有开始标签`)
      }

      index += tag.length + 3
    } else if (wordRegExp.test(rest)) {
      let word = rest.match(wordRegExp)[1]
      if (!/^\s+$/.test(word)) {
        // console.log('检测到文字', word)
        innerStack[innerStack.length - 1].children.push({ 'text': word, 'type': 3 })
      }
      index += word.length
    } else {
      ++index
    }
  }
  return innerStack[0].children[0]
}