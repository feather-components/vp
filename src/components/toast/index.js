import Component from './toast';
import {Util} from '../../helper';

let Toast = {};

Toast.loading = (msg, mask, millisecond) => {

    let data = {
        msg: msg,
        showMask: mask,
        millisecond: millisecond || 1500
    }
    
    return Util.appendInstance(Component, data);
};

Toast.Component = Component;
export default Util.register(Toast);