import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

import Pager from './components/pager.vue';
import Table from './components/table.vue';

import Tablepager from './modules/tablepager.vue';

const router = new VueRouter({
    routes: [{
        path: '/components/pager',
        component: Pager
    },{
        path: '/components/table',
        component: Table
    },{
        path: '/modules/tablepager', 
        component: Tablepager
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
            active: 'com_1'
        }
    },
    method: {
        sideBarClick(id) {
            this.active = id;
        }
    }
});