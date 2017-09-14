import Pager from './components/pager';
import Datagrid from './components/datagrid';
import Button from './components/button';
//--------------------------------------------------------
import Tablepager from './modules/tablepager';
//--------------------------------------------------------
import Valid from './directives/valid';
//--------------------------------------------------------
import Vue from 'vue';

var Components = [
    Pager,Datagrid ,
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
    Pager,Datagrid,

    Tablepager,

    Button
};

export default {install};