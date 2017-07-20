import Vue from 'vue';
import Router from 'vue-router';
import pagerDemo from '../demos/pager/pager.vue';
import formDemo from '../demos/form/form.vue';
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: pagerDemo
        }, {
            path: '/pager',
            component: pagerDemo
        }, {
            path: '/form',
            component: formDemo
        }
    ]
});
