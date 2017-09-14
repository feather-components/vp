import Component from './alert';
import {Util} from '../../helper';

var override = (callback) => {
    return (...args) => {
        if(typeof args[1] != 'object'){
            args.splice(1, 0, {});
        }else if(!args[1]){
            args[1] = '';
        }

        return callback.apply(window, args);
    }
};

var Alert = override((content, options) => {
    return Util.appendInstance(Component, {
        content: content,
        extras: options.extras,
        buttons: options.buttons || {
            '确定' : {
                type: 'main',
                click(){
                    this.destroy();
                }
            }
        }
    });
});

Alert.confirm = override((content, options, callback, manualClose) => {
    return Util.appendInstance(Component, {
        content: content,
        extras: options.extras,
        buttons: options.buttons || {
            '确定': {
                type: 'main',
                click(){
                    callback && callback();
                    !manualClose && this.destroy(false);
                }
            },
            '取消': {
                type: 'pain',
                click(){
                    this.destroy(false);
                }
            }
        }
    });
});

Alert.Component = Component;
export default Util.register(Alert);