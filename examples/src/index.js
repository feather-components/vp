import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

import Pager from './components/pager.vue';
import Table from './components/table.vue';

import Tablepager from './modules/tablepager.vue';

import Valid from './directives/valid.vue';

const router = new VueRouter({
    //COMPONENTS
    routes: [{
        path: '/components/pager',
        component: Pager
    },{
        path: '/components/table',
        component: Table
    },{
    //MODULES
        path: '/modules/tablepager', 
        component: Tablepager
    },{
    //DIRECTIVES
        path:'/directives/valid',
        component: Valid
    }]
});

new Vue({
    el: '#app',
    router: router,
    data() {
        return {
            com: [{
                text: '分页Pager',
                url: '#/components/pager',
                id: 'com_1'
            }, {
                text: '表格Table',
                url: '#/components/table',
                id: 'com_2'
            }],
            mod:[{
                text: '列表分页Tablepager',
                url: '#/modules/tablepager',
                id: 'mod_1'
            }],
            dir:[{
                text: '表单验证Valid',
                url: '#/directives/valid',
                id: 'dir_1'
            }],
            active: 'com_1'
        }
    },
    method: {
        sideBarClick(id) {
            this.active = id;
        }
    }
});