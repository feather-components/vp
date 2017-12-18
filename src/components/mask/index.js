import Mask from './mask';
import {Util} from '../../helper';

let mask = {};

Mask.show = function(options) {
    mask = Util.appendInstance(Mask);
    mask.open();
    mask.$on('click', function() {
        if(options && typeof options.click == 'function'){
            options.click.call(mask);
        }
    });
    return mask;
};

Mask.hide = function() {
    mask.destroy();
}


export default Util.register(Mask);