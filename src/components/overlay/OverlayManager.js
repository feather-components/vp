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
        Event.on(document, 'click', () => {
            
            for(let key in overlays){
                let overlay = overlays[key];
                let overlayType = overlay.type;

                switch(overlayType){
                case types.alert:
                    break;
                case types.picker:
                    if(overlay.$attrs && typeof overlay.$attrs.autoClose != 'undefined' && !overlay.$attrs.autoClose){
                    }else{
                        overlay.close();
                    }
                    break;
                default:
                    break;
                }

                if(overlay.autoClose){
                    overlay.close();
                }

                if(overlay.autoDestroy){
                    overlay.destroy();
                }
            }
        });

        Event.on(document.body, 'scroll', () => {
            alert('scroll');
        });

        return {
            addOverlay(overlay, type){
                overlays[overlay._uid] = overlay;
                overlays[overlay._uid]['type'] = type;
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