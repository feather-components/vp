import Pager from './components/pager';
import Datagrid from './components/datagrid';
import Button from './components/button';
import Overlay from './components/overlay';
import Mask from './components/mask';
import Alert from './components/alert';
import Picker from './components/picker';
import CityPicker from './components/citypicker';
import { Timepanel, Datepanel, Datepicker } from './components/datepicker';
import Checkbox from './components/checkbox';
import Radio from './components/radio';
import { Tabs, Tab } from './components/tab';
import Select from './components/select';
import { WaterFall, WaterFallItem} from './components/waterfall';
import Timeline from './components/timeline';
//--------------------------------------------------------
import Tablepager from './modules/tablepager';
//--------------------------------------------------------
import Valid from './directives/valid';
import AutoPosition from './directives/autoposition';
import Clickoutside from './directives/clickoutside';
import Toast from './components/toast';
import Uploader from './components/uploader';
import ProgressBar from './components/progressbar';
//--------------------------------------------------------
import Vue from 'vue';

var Components = [
    Pager, Datagrid, Checkbox, Radio, Tabs, Tab, Select, Timepanel, Datepanel, Datepicker,WaterFall,Uploader,ProgressBar,Timeline
];

var Modules = [
    Tablepager
];

var Directives = [
    Valid,
    Clickoutside
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
    Clickoutside,
    Valid,
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
    Tabs,
    Tab,
    Select,
    Picker,
    CityPicker,
    Timepanel,
    Datepanel,
    Datepicker,
    Toast,
    WaterFall,
    Uploader,
    ProgressBar,
    WaterFallItem,
    Timeline
};

export default {install};