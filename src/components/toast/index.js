import Component from './toast';
import {Util} from '../../helper';
import Overlay from '../overlay';

let Toast = {};

Toast.loading = (msg, mask, millisecond) => {

    let data = {
        msg: msg,
        showMask: mask,
        millisecond: millisecond || 1500
    }
    
    return Util.appendInstance(Component, data);
};

Toast.destroy = () => {
    let toast = Overlay.manager.getToast();
    toast && toast.destroy();
}

Toast.Component = Component;
export default Util.register(Toast);