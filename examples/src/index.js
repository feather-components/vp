import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

import Pager from './components/pager.vue';
import Datagrid from './components/datagrid.vue';
import Checkbox from './components/checkbox.vue';
import Radio from './components/radio.vue';
import OverlayView from './views/overlay.vue'; 
import Tab from './components/tab.vue';
import CityPicker from './views/citypicker.vue';

import Tablepager from './modules/tablepager.vue';

import Valid from './directives/valid.vue';

const router = new VueRouter({
    //COMPONENTS
    routes: [{
        path: '/components/pager',
        component: Pager
    }, {
        path: '/components/datagrid',
        component: Datagrid
    }, {
        path: '/components/overlay',
        component: OverlayView
    }, {
        path: '/components/citypicker',
        component: CityPicker
    }, {
        path: '/components/checkbox',
        component: Checkbox
    }, {
        path: '/components/radio',
        component: Radio
    }, {
        path: '/components/tab',
        component: Tab
    }, {
        //MODULES
        path: '/modules/tablepager',
        component: Tablepager
    }, {
        //DIRECTIVES
        path: '/directives/valid',
        component: Valid
    }]
});

new Vue({
    el: '#app',
    router: router,
    data() {
        return {
            com: [{
                text: 'Radio',
                url: '#/components/radio'
            }, {
                text: 'Checkbox',
                url: '#/components/checkbox'
            }, {
                text: 'Pager',
                url: '#/components/pager',
                id: 'com_1'
            }, {
                text: 'Datagrid',
                url: '#/components/datagrid',
                id: 'com_2'
            }, {
                text: 'Overlay',
                url: '#/components/overlay'
            }, {
                text: 'Tab',
                url: '#/components/tab'
            }, {
                text: 'CityPicker',
                url: '#/components/citypicker'
            }],
            mod: [{
                text: 'Tablepager',
                url: '#/modules/tablepager',
                id: 'mod_1'
            }],
            dir: [{
                text: 'Valid',
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