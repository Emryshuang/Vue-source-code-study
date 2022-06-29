import Scanner from './Scanner'

function nestTokens(tokens) {
  const result = []
  const section = []
  let collection = result

  for (let token of tokens) {

    switch (token[0]) {
      case '#':
        collection.push(token)
        section.push(token)
        token[2] = []
        collection = token[2]
        break
      case '/':
        section.pop()
        collection = section.length > 0 ? section[section.length-1][2] : result
      break

      default:
        collection.push(token)
        break
    }
  }

  return result
}

export default function parseTemplate2Tokens(templateStr) {
  const scanner = new Scanner(templateStr)

  const result = []
  let word = undefined
  while (!scanner.eos()) {
    // eslint-disable-next-line no-debugger
    // debugger
    word = scanner.scanUtil('{{')
    // console.log(word)
    if (word != '') {
      result.push(['text', word])
    }
    scanner.scan('{{')
    word = scanner.scanUtil('}}')
    // console.log(word)
    if (word != '') {
      if (word[0] == '#') {
        result.push(['#', word.substring(1)])
      }
      else if (word[0] == '/') {
        result.push(['/', word.substring(1)])
      } else {
        result.push(['name', word])
      }
    }
    scanner.scan('}}')
  }

  return nestTokens(result)
}
