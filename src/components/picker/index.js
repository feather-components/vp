import { Util } from '../../helper';
import Picker from './picker';
import DatePicker from './datePicker';
import CityPicker from './cityPicker';

Picker.datePicker = (options) => {
    let datePicker = Util.appendInstanceTo(DatePicker);
    datePicker.init(options);
    return datePicker;
}

Picker.cityPicker = (options) => {
    let cityPicker = Util.appendInstanceTo(CityPicker);
    cityPicker.init(options);
    return cityPicker;
}

Picker.picker = (options) => {
    let el = options.ref.$el;
    let picker = Util.getInstace(Picker);
    picker.setPosition(el);
    return picker;
}


Picker.Component = Picker;

export default Util.register(Picker);
