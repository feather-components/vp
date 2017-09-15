import Pager from './components/pager';
import Grid from './components/grid';
import Button from './components/button';
import Overlay from './components/overlay';
import Mask from './components/mask';
import Alert from './components/alert';
import Picker from './components/picker';
//--------------------------------------------------------
import Tablepager from './modules/tablepager';
//--------------------------------------------------------
import Valid from './directives/valid';
import AutoPosition from './directives/autoposition';

var Components = [
    Pager,Grid ,
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
    Grid,
    Tablepager,
    Button,
    Overlay,
    Mask,
    Alert,
    AutoPosition,
    Picker,
};

export default {install};