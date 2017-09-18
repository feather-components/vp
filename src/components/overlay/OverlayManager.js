var OverlayManager = (function(){
    let instance = false;
    let pickerMap = {};

    function init() {
        return {
            addPicker(picker){
                pickerMap[picker._uid] = picker;
                console.log(pickerMap);
            },
            getPickerList(){
                return pickerMap;
            },
            deletePicker(picker){
                delete pickerMap[picker._uid];
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