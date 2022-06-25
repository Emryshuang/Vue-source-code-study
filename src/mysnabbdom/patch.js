import vnode from './vnode'

function isSameVnode(vnode1, vnode2) {
  const isSameKey = vnode1.key === vnode2.key
  const isSameSel = vnode1.sel === vnode2.sel

  return isSameSel && isSameKey
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
    domNode.innerText = vnode.text
  } else if (isVnodeHasChildren(vnode)) {
    console.log(vnode.children)
    for (let i = 0; i < vnode.children.length; ++i) {
      const chDom = createElement(vnode.children[i])
      domNode.appendChild(chDom)
    }
  }
  vnode.elm = domNode

  return vnode.elm
}

function createIdxInOld(children,startIdx,endIdx){
  const result={}
  for (let i = startIdx; i < endIdx; i++) {
    const key = children[i].key
    if (key != undefined) {
      result[key] = i
    }
  }
  return result
}
function updateChildren(parentElm, oldChildren, newChildren) {
  console.log('this is updateChildren function', oldChildren, newChildren)
  let oldStartIdx = 0,
    oldEndIdx = oldChildren.length - 1,
    newStartIdx = 0,
    newEndIdx = newChildren.length - 1
  let oldStartVnode = oldChildren[oldStartIdx],
    oldEndVnode = oldChildren[oldEndIdx],
    newStartVnode = newChildren[newStartIdx],
    newEndVnode = newChildren[newEndIdx]
  let keyMap = undefined
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    console.log('@')
    if(oldStartVnode == undefined){
      oldStartVnode = oldChildren[++oldStartIdx]
      continue
    }
    if(oldEndVnode == undefined){
      oldEndVnode = oldChildren[--oldEndIdx]
      continue
    }
    
    if (isSameVnode(oldStartVnode, newStartVnode)) {
      console.log('①the old start and new start')
      patchVNode(oldStartVnode, newStartVnode)
      oldStartVnode = oldChildren[++oldStartIdx]
      newStartVnode = newChildren[++newStartIdx]
    } else if (isSameVnode(oldEndVnode, newEndVnode)) {
      console.log('②the old end and new end')
      patchVNode(oldEndVnode, newEndVnode)
      oldEndVnode = oldChildren[--oldEndIdx]
      newEndVnode = newChildren[--newEndIdx]
    } else if (isSameVnode(oldStartVnode, newEndVnode)) {
      console.log('③the old start and new end')
      patchVNode(oldStartVnode, newEndVnode)
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
      oldStartVnode = oldChildren[++oldStartIdx]
      newEndVnode = newChildren[--newEndIdx]
    } else if (isSameVnode(oldEndVnode, newStartVnode)) {
      console.log('④the old start and new end')
      patchVNode(oldEndVnode, newStartVnode)
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldChildren[--oldEndIdx]
      newStartVnode = newChildren[++newStartIdx]
    } else {
      if (!keyMap) {
        keyMap = createIdxInOld        
      }

      const idxInOld = keyMap[newStartVnode.key]
      if (idxInOld == undefined) {
        parentElm.insertBefore(createElement(newStartVnode),oldStartVnode.elm)
       }
      else {
        const elmToMove = oldChildren[idxInOld]
        patchVNode(elmToMove, newStartVnode)
        oldChildren[idxInOld] = undefined
        parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm)
      }
      newStartVnode = newChildren[++newStartIdx]
    }
  }

  if (oldStartIdx <= oldEndIdx) {
    console.log('old Array has some node to be delete')
    while (oldStartIdx <= oldEndIdx) {
      if (oldChildren[oldStartIdx] == undefined) {
        oldStartIdx++
        continue
      }
      // console.log(oldChildren[oldStartIdx])
      parentElm.removeChild(oldChildren[oldStartIdx++].elm)
    }
  }

  if (newStartIdx <= newEndIdx) {
    console.log('new Array has some node to be create')
    const before = newChildren[newEndIdx + 1] == null ? null : newChildren[newEndIdx + 1].elm
    while (newStartIdx <= newEndIdx) {
      parentElm.insertBefore(createElement(newChildren[newStartIdx++]), before)
    }
  }
}

function patchVNode(oldVnode, newVnode) {
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
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
    } else {
      console.log('oldVnode does not contain children')
      oldVnode.elm.innerHTML = ''
      for (const child of newVnode.children) {
        const dom = createElement(child)
        oldVnode.elm.appendChild(dom)
      }
    }
  }
  newVnode.elm = oldVnode.elm
}

export default function patch(oldVnode, newVnode) {
  // the oldVnode is DOM node or Virtual node
  if (oldVnode.sel == '' || oldVnode.sel == undefined) {
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  }
  console.log('@patch file', oldVnode)
  // is the old one and the new one same node
  if (isSameVnode(oldVnode, newVnode)) {
    patchVNode(oldVnode, newVnode)
  } else {
    console.log('the old one and the new one is not same node')
    const newVnodeElmDom = createElement(newVnode)
    if (oldVnode.elm.parentNode && newVnodeElmDom) {
      oldVnode.elm.parentNode.insertBefore(newVnodeElmDom, oldVnode.elm)
      oldVnode.elm.parentNode.removeChild(oldVnode.elm)
    }

  }
}