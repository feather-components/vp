import Vue from 'vue';
import Router from 'vue-router';
import pagerDemo from '../demos/pager/pager.vue';
import index from '../demos/index.vue';

Vue.use(Router);

const test = { templage: '<div>test</div>' };

export default new Router({
    routes: [
        {
            path: '/',
            component: index
        }, {
            path: '/pager',
            component: pagerDemo
        }
    ]
});
