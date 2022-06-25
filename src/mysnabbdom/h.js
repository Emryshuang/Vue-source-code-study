import vnode from './vnode'


export default function (sel, data, c) {
    if (arguments.length != 3) {
        throw new Error('h function need 3 arguments in this edition')
    }
    if (typeof c == 'string' || typeof c == 'number') {
        console.log('edition 1')
        return vnode(sel, data, undefined, c, undefined)
    } else if (Array.isArray(c)) {
        console.log('edition 2')
        const children = []
        for (let i = 0; i < c.length; ++i) {
            if (!(typeof c[i] == 'object' && Object.prototype.hasOwnProperty.call(c[i], 'sel'))) {
                throw new Error('the argument c is not a h function argument')
            }
            children.push(c[i])
        }
        return vnode(sel, data, children, undefined, undefined)
    } else if (typeof c == 'object' && Object.prototype.hasOwnProperty.call(c, 'sel')) {
        console.log('edition 3')
        return vnode(sel, data, [c], undefined, undefined)
    } else {
        throw new Error('h function need 3 arguments are selection, data, children or text')
    }
}