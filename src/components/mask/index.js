import Mask from './mask';
import {Util} from '../../helper';

Mask.show = function(options) {
    let mask = Util.appendInstance(Mask);
    mask.open();
    if(typeof options.click == 'function'){
        mask.$on('click', function() {
            options.click.call(mask);
        });
    }

    return mask;
}


export default Util.register(Mask);