import Pager from './components/pager';
import Datagrid from './components/datagrid';
import Button from './components/button';
import Overlay from './components/overlay';
import Mask from './components/mask';
import Alert from './components/alert';
import Picker from './components/picker';
import CityPicker from './components/CityPicker';
import Checkbox from './components/checkbox';
import Radio from './components/radio';
//--------------------------------------------------------
import Tablepager from './modules/tablepager';
//--------------------------------------------------------
import Valid from './directives/valid';
import AutoPosition from './directives/autoposition';

var Components = [
    Pager, Datagrid, Checkbox, Radio
];

var Modules = [
    Tablepager
];

var Directives = [
    Valid
];

function install(Vue){
    for(let Component of Components){
        Vue.use(Component);
    }
    for(let Module of Modules){
        Vue.use(Module);
    }
    for(let Directive of Directives){
        Vue.use(Directive);
    }
}

export {
    Pager,
    Datagrid,
    Tablepager,
    Button,
    Overlay,
    Mask,
    Alert,
    AutoPosition,
    Checkbox,
    Radio,
    Picker,
    CityPicker
};

export default {install};