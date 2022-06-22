import h from './mysnabbdom/h'


const myVnode1 = h('a', {
    props: {
        href: 'https://www.bilibili.com',
        target: '_blank'
    }
}, '怪蜀黍的啊B!!!!')
console.log(myVnode1)
const myVnode2 = h('div', {}, [
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
console.log(myVnode2)
