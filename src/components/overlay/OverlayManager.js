import { Event } from '../../helper';


var OverlayManager = (function(){
    let instance = false;
    let overlays = {};
    let types = {
        alert: 'alert',
        picker: 'picker',
    };

    function init() {
        //let manager = this;
        Event.on(document, 'click', (event) => {
            //console.log(event);
            //alert('click');
            //console.log(overlays);
            //overlays
            for(let key in overlays){
                console.log(key);
                let overlay = overlays[key];
                
                if(overlay.autoClose){
                    overlay.close();
                }
                if(overlay.autoDestroy){
                    overlay.destroy();
                }
                switch(key){
                case types.alert:

                    break;
                default:
                    console.log('clicke --_ddfdas');
                    break;
                }
            }
        });

        return {
            addOverlay(overlay, type){
                overlays[overlay._uid] = overlay;
                overlays[overlay._uid]['type'] = type;
                console.log(overlays);
            },
            getOverlays(){
                return overlays;
            },
            deleteOverlay(overlay){
                delete overlays[overlay._uid];
            },
            types
        }
    }


    return {
        getInstance: function(){
            if(!instance){
                instance = init();
            }
            return instance;
        }
    };
})();

export default OverlayManager.getInstance();