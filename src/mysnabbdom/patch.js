import vnode from './vnode'

function isSameVnode(vnode1, vnode2) {
  const isSameKey = vnode1.key === vnode2.key;
  const isSameSel = vnode1.sel === vnode2.sel;

  return isSameSel && isSameKey;
}
function createElement(vnode, pivot) {
  const domNode = document.createElement(vnode.sel)

  if (vnode.text != '' && (vnode.children == undefined || vnode.children.length == 0)) {
    domNode.innerText = vnode.text;
    pivot.parentNode.insertBefore(domNode, pivot)
  }
}
export default function (oldVnode, newVnode) {
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
    createElement(newVnode, oldVnode.elm)
  }
}