var OverlayManager = (function(){
    let instance = false;
    let pickerList = [];

    function init() {
        return {
            addPicker(picker){
                pickerList.push(picker);
                console.log(pickerList);
            },
            getPickerList(){
                return pickerList;
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