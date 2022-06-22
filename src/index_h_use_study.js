import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
    h,
} from "snabbdom"
const patch = init([classModule, propsModule, styleModule, eventListenersModule])

const myVnode = h('a', {
    props: {
        href: 'https://www.bilibili.com',
        target: '_blank'
    }
}, '怪蜀黍的啊B')

console.log(myVnode)

const container = document.getElementById('container')
patch(container, myVnode)