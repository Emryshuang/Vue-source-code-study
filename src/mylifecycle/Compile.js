import Watcher from '../myreactive/Watcher'

export default class Compile {
  constructor(el, vue) {
    this.$vue = vue
    this.$el = document.querySelector(el)

    if (this.$el) {  
      const $fragment = this.node2Fragment(this.$el)
      this.compile($fragment)
      this.$el.appendChild($fragment)
    }
  }


  node2Fragment(el) {
    const fragment = document.createDocumentFragment()

    let child = el.firstChild
    while (child) {
      fragment.appendChild(child)
      child = el.firstChild
    }
    return fragment
  }


  compile(el) {
    const nodeList = el.childNodes
    const regExp = /\{\{(.*)\}\}/
    nodeList.forEach(item => {
      const text = item.textContent
      if (item.nodeType === 1) {
        this.compileElement(item)
      } else if (item.nodeType === 3 && regExp.test(text)) {
        const dataName = text.match(regExp)[1].trim()
        this.compileText(item, dataName)
      }
    })
  }


  compileElement(node) {
    const attrs = node.attributes
    Array.prototype.slice.call(attrs).forEach(item => {
      const name = item.name
      const value = item.value
      if (name.indexOf('v-') === 0) {
        const directiveName = name.substring(2)
        if (directiveName === 'model') {
          console.log('there is a model')
          new Watcher(this.$vue, value, newVal => {
            node.value = newVal
          })
          const v = this.getDataValue(this.$vue, value)
          node.value = v
          node.addEventListener('input', e => {
            this.setDataValue(this.$vue, value, e.target.value)
          })
        }
      }
    })
  }


  compileText(node, dataName) {
    node.textContent = this.getDataValue(this.$vue, dataName)
    new Watcher(this.$vue, dataName, newVal => {
      node.textContent = newVal
    })
  }


  getDataValue(obj, dataName) {
    const nameArr = dataName.split('.')
    const value = nameArr.reduce((acc, cur) => {
      return acc[cur]
    }, obj)
    return value
  }

  setDataValue(obj, dataName, dataValue) {
    const nameArr = dataName.split('.')
    let val = obj
    nameArr.forEach((item, index, arr) => {
      if (index < arr.length - 1) {
        val = val[item]
      } else {
        val[item] = dataValue
      }
    })
  }
}