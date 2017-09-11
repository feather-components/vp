import Pager from './components/pager';
import Table from './components/table';
//--------------------------------------------------------
import Tablepager from './modules/tablepager';
//--------------------------------------------------------
import Valid from './directives/valid';
//--------------------------------------------------------
import Vue from 'vue';

var Components = [
    Pager,Table 
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
    Pager,Table,

    Tablepager,

    Valid
};

export default {install};