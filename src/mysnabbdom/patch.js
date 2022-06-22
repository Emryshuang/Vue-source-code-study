import vnode from './vnode'

function isSameVnode(vnode1, vnode2) {
  const isSameKey = vnode1.key === vnode2.key;
  const isSameSel = vnode1.sel === vnode2.sel;

  return isSameSel && isSameKey;
}
function createElement(vnode) {
  const domNode = document.createElement(vnode.sel)

  if (vnode.text != '' && (vnode.children == undefined || vnode.children.length == 0)) {
    domNode.innerText = vnode.text;
    // pivot.parentNode.insertBefore(domNode, pivot)
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
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

  } else {
    console.log('the old one and the new one is not same node')
    const newVnodeElmDom = createElement(newVnode)
    if (oldVnode.elm.parentNode && newVnodeElmDom) {
      oldVnode.elm.parentNode.insertBefore(newVnodeElmDom, oldVnode.elm)
      oldVnode.elm.parentNode.removeChild(oldVnode.elm)
    }

  }
}