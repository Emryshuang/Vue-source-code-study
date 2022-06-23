import vnode from './vnode'

function isSameVnode(vnode1, vnode2) {
  const isSameKey = vnode1.key === vnode2.key;
  const isSameSel = vnode1.sel === vnode2.sel;

  return isSameSel && isSameKey;
}

function isSameObj(Obj1, Obj2) {
  return Obj1 === Obj2
}

function isVnodeHasChildren(vnode) {
  return Array.isArray(vnode.children) && vnode.children.length > 0
}
function createElement(vnode) {
  const domNode = document.createElement(vnode.sel)

  if (vnode.text != '' && (vnode.children == undefined || vnode.children.length == 0)) {
    domNode.innerText = vnode.text;
  } else if (isVnodeHasChildren(vnode)) {
    console.log(vnode.children)
    for (let i = 0; i < vnode.children.length; ++i) {
      const chDom = createElement(vnode.children[i])
      domNode.appendChild(chDom)
    }
  }
  vnode.elm = domNode;

  return vnode.elm
}
export default function patch(oldVnode, newVnode) {
  // the oldVnode is DOM node or Virtual node
  if (oldVnode.sel == '' || oldVnode.sel == undefined) {
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  }
  console.log('@patch file', oldVnode)
  // is the old one and the new one same node
  if (isSameVnode(oldVnode, newVnode)) {
    console.log('the old one and the new one is same node')
    // is the old one and the new one same obj(same memory address)
    if (isSameObj(oldVnode, newVnode)) {
      return
    }
    // if (newVnode.text != undefined && !(Array.isArray(newVnode.children) && newVnode.children.length > 0)) 
    if (newVnode.text != undefined && !(isVnodeHasChildren(newVnode))) {
      console.log('newVnode contains text and does not contain children')
      if (oldVnode.text != newVnode.text) {
        console.log('newVnode text is diffident as oldVnode text')
        oldVnode.elm.innerText = newVnode.text
      }
    } else {
      console.log('newVnode does not contain text and contains children')
      if (isVnodeHasChildren(oldVnode)) {
        console.log('oldVnode contains children')
      } else {
        console.log('oldVnode does not contain children')
        oldVnode.elm.innerHTML = ''
        for (const child of newVnode.children) {
          const dom = createElement(child)
          oldVnode.elm.appendChild(dom)
        }
      }
    }

  } else {
    console.log('the old one and the new one is not same node')
    const newVnodeElmDom = createElement(newVnode)
    if (oldVnode.elm.parentNode && newVnodeElmDom) {
      oldVnode.elm.parentNode.insertBefore(newVnodeElmDom, oldVnode.elm)
      oldVnode.elm.parentNode.removeChild(oldVnode.elm)
    }

  }
}