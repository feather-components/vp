import { Event, Dom, Util } from '../../helper';

export default {
    name: 'autoposition',
    bind(el, binding, vnode) {
        console.log(el);
        console.log(vnode);
        Util.observer(el, {
            attributes: true,
            subtree: true
        }, (mutations) => {
            console.log(mutations);
        });
    },
    unbind(el, binding, vnode) {
       
    }
}