import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

import Pager from './components/pager.vue';
import Table from './components/table.vue';

const router = new VueRouter({
    routes: [{
        path: '/components/pager',
        component: Pager
    },{
        path: '/components/table',
        component: Table
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
                id: 1
            }, {
                text: '表格Table',
                url: '#/components/table',
                id: 2
            }],
            unit:[{

            }],
            active: 1
        }
    },
    method: {
        sideBarClick(id) {
            this.active = id;
        }
    }
});