import Mask from './mask';
import {Util} from '../../helper'; 

Mask.show = function(options) {
    let mask = Util.appendInstance(Mask);
    mask.open();
    mask.$on('click', function() {
        if(options && typeof options.click == 'function'){
            options.click.call(mask);
        }
    });
    return mask;
} 
export default Util.register(Mask);