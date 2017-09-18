var OverlayManager = (function(){
    let instance = false;
    let overlays = {};

    function init() {
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
            }
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