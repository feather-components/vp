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
            
            for(let key in overlays){
                let overlay = overlays[key];

                switch(key){
                case types.alert:
                    break;
                default:
                    break;
                }

                ((overlay.$attrs && overlay.$attrs.autoClose) || overlay.autoClose) && overlay.close();
                ((overlay.$attrs && overlay.$attrs.autoDestroy) || overlay.autoDestroy) && overlay.destroy();
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