import Pager from './components/pager';
import Table from './components/table';

import Tablepager from './modules/tablepager';

import Vue from 'vue';

var Components = [
    Pager,Table 
];

var Modules = [
    Tablepager
];

function install(Vue){
    for(let Component of Components){
        Vue.use(Component);
    }
    for(let Module of Modules){
        Vue.use(Module);
    }
}

export {
    Pager,Table,

    Tablepager
};

export default {install};