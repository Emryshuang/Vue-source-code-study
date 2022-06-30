import h from './h'
import patch from './patch'

// const myVnode1 = h('section', {}, '怪蜀黍的啊B!!!!')
// console.log(myVnode1)
// const myVnode2 = h('section', {}, [
//     h('p', {}, "文字1"),
//     h('p', {}, "文字2"),
//     h('p', {}, "文字3"),
//     h('p', {}, [
//         h('span', {}, '文字4.1'),
//         h('span', {}, '文字4.2')
//     ]),
//     h('p', {},
//         h('span', {}, 'span文字5')
//     ),
// ])
// console.log(myVnode2)
const myVnode3 = h('section', {}, [
    h('p', { key: '1' }, '文字1'),
    h('p', { key: '2' }, '文字2'),
    h('p', { key: '3' }, '文字3'),
    h('p', { key: '4' }, '文字4'),
    h('p', { key: '5' }, '文字5'),
])
// const myVnode4 = h('p', {}, 'Hi')
const myVnode5 = h('section', {}, [
    h('p', { key: '6' }, '文字6'),
    h('p', { key: '1' }, '文字1'),
    h('p', { key: '7' }, '文字7'),
    h('p', { key: '4' }, '文字4'),
    h('p', { key: '2' }, '文字2'),
    h('p', { key: '5' }, '文字5'),
    h('p', { key: '8' }, '文字8'),
   

])
const btn = document.querySelector('button')
const container = document.getElementById('container')
patch(container, myVnode3)
btn.onclick = function () {
    patch(myVnode3, myVnode5)
}

