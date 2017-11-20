import Mask from './mask';
import {Util} from '../../helper';

let mask = Util.appendInstance(Mask);

Mask.show = function(options) {
    mask.open();
    mask.$on('click', function() {
        if(options && typeof options.click == 'function'){
            options.click.call(mask);
        }
    });
    return mask;
};

Mask.hide = function() {
    mask.close();
}


export default Util.register(Mask);