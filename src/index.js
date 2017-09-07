import Pager from './components/pager';
import Table from './components/table';

import Vue from 'vue';

var Components = [
    Pager,Table 
];

function install(Vue){
    for(let Component of Components){
        Vue.use(Component);
    }
}

export {
    Pager,Table
};

export default {install};