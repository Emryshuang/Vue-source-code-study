export default function parseAttrsString(attrsString) {
  if (!attrsString) {
    return []
  }
  attrsString = attrsString.trim()
  attrsString+=' '
  console.log(attrsString)

  let attrs = []
  let index = 0
  let isQuotes = false

  for (let i = 0; i < attrsString.length; ++i) {
    if (attrsString[i] == "'") {
      isQuotes = !isQuotes
    } else if (attrsString[i] == ' ' && !isQuotes) {
      attrs.push(attrsString.substring(index, i))
      index = i
    }
  }

  console.log(attrs)
  const result = attrs.map((item) => {
    item = item.trim()
    const o = item.match(/^(.+)='(.+)'$/)
    return {
      name: o[1],
      value: o[2]
    }
  })
  return result
}