import h from './mysnabbdom/h'
import patch from './mysnabbdom/patch'

const myVnode1 = h('a', {
    props: {
        href: 'https://www.bilibili.com',
        target: '_blank'
    }
}, '怪蜀黍的啊B!!!!')
// console.log(myVnode1)
const myVnode2 = h('section', {}, [
    h('p', {}, "文字1"),
    h('p', {}, "文字2"),
    h('p', {}, "文字3"),
    h('p', {}, [
        h('span', {}, '文字4.1'),
        h('span', {}, '文字4.2')
    ]),
    h('p', {},
        h('span', {}, 'span文字5')
    ),
])
// console.log(myVnode2)
// const myVnode3 = h('section', {}, [
//     h('p', {}, "文字1"),
//     h('p', {}, "文字2"),
//     h('p', {}, "文字3"),
//     h('p', {}, "文字4"),
//     h('p', {}, '文字5')
// ])
// const myVnode4 = h('p', {}, 'Hi')
const btn = document.querySelector('button')
const container = document.getElementById('container')
patch(container, myVnode1)
btn.onclick = function(){
    patch(myVnode1, myVnode2)
}

