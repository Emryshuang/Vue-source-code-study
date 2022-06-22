import vnode from "./vnode";
// console.log(vnode)

export default function (sel, data, c) {
    if (arguments.length != 3) {
        throw new Error('h function need 3 arguments in this edtion')
    }
    if (typeof c == 'string' || typeof c == 'number') {
        console.log('edtion 1');
        return vnode(sel, data, undefined, c, undefined)
    } else if (Array.isArray(c)) {
        console.log('edtion 2');
        const children = []
        for (let i = 0; i < c.length; ++i) {
            if (!(typeof c[i] == 'object' && c[i].hasOwnProperty('sel'))) {
                throw new Error('the argument c is not a h function argument')
            }
            children.push(c[i])
        }
        return vnode(sel, data, children, undefined, undefined)
    } else if (typeof c == 'object' && c.hasOwnProperty('sel')) {
        console.log('edtion 3');
        return vnode(sel, data, [c], undefined, undefined)
    } else {
        console.log('edtion wrong');
    }
}