import Component from './toast';
import {Util} from '../../helper';
import Overlay from '../overlay';

let Toast = {};

['success','error','warn','loading'].forEach((type) => {

    Toast[type] = (msg, mask, millisecond) => {
        let data = {
            msg: msg,
            showMask: mask,
            millisecond: millisecond || 1500,
            iconName: `vp-toast-${type}`
        }
        return Util.appendInstance(Component, data);
    };
})


Toast.destroy = () => {
    let toast = Overlay.manager.getToast();
    toast && toast.destroy();
}

Toast.Component = Component;
export default Util.register(Toast);