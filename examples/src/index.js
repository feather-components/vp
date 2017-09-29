import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

import Button from './components/button.vue';
import Radio from './components/radio.vue';
import Checkbox from './components/checkbox.vue';
import Select from './components/select.vue';

import Tab from './components/tab.vue';
import Pager from './components/pager.vue';

import Datagrid from './components/datagrid.vue';
import Timeline from './components/timeline.vue';

import OverlayView from './components/overlay.vue';
import WaterFall from './components/waterfall.vue';

import CityPicker from './components/citypicker.vue';
import DatePicker from './components/datepicker.vue';
import Uploader from './components/uploader.vue';
import ProgressBar from './components/progressbar.vue';

import Tablepager from './modules/tablepager.vue';

import Valid from './directives/valid.vue';
import Clickoutside from './directives/clickoutside.vue';


// COMPONENTS
const com = [
    // elements
    { path: '/components/button', component: Button, text: 'Button', id: 'com_1' },
    { path: '/components/radio', component: Radio, text: 'Radio' },
    { path: '/components/checkbox', component: Checkbox, text: 'Checkbox' },
    { path: '/components/select', component: Select, text: 'Select'},

    // groups
    { path: '/components/pager', component: Pager, text: 'Pager' },
    { path: '/components/tab', component: Tab, text: 'Tab' },

    // data
    { path: '/components/datagrid', component: Datagrid, text: 'Datagrid' },
    { path: '/components/timeline', component: Timeline, text: 'Timeline' },

    // overlays
    { path: '/components/overlay', component: OverlayView, text: 'OverlayView' },

    // pickers
    { path: '/components/citypicker', component: CityPicker, text: 'CityPicker' },
    { path: '/components/datepicker', component: DatePicker, text: 'DatePicker' },
    { path: '/components/waterfall', component: WaterFall, text: 'WaterFall' },
    { path: '/components/uploader', component: Uploader, text: 'Uploader' },
    { path: '/components/progressbar', component: ProgressBar, text: 'ProgressBar' }
       
]

// MODULES
const mod = [
    { path: '/modules/tablepager', component: Tablepager, text: 'Tablepager', id: 'mod_1' }
]

// DIRECTIVES
const dir = [
    { path: '/directives/valid', component: Valid, text: 'Valid', id: 'dir_1' },
    { path:'/directives/clickoutside', component: Clickoutside, text: 'Clickoutside', id: 'dir_2' }
]

const router = new VueRouter({
    routes: [...com, ...mod, ...dir].map(({ path, component }) => ({ path, component }))
})

router.afterEach( (route) => {
    //console.log(route);
    let paths = route.path.split('/');
    let text = paths.pop();
    document.getElementById('J-page-title-text').innerHTML = text;
});


new Vue({
    el: '#app',
    router: router,
    data() {
        return {
            active: 'com_1',
            com: com.map(({ text, path }) => ({ url: '#' + path, text })),
            mod: mod.map(({ text, path }) => ({ url: '#' + path, text })),
            dir: dir.map(({ text, path }) => ({ url: '#' + path, text }))
        }
    },
    method: {
        sideBarClick(id) {
            this.active = id;
        }
    }
})
