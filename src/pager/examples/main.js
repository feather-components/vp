import Vue from '&&vue';
import '&&css';
import pager from '&&js';


new Vue({
    el: '#vdom',
    data: {
        pager: {
            total: 356,
            cur: 1
        },
        pager2: {
            total: 356,
            size: 8,
            cur: 1
        },
        option: [10,20,30]
    },
    methods: {
        cb: function(p) {
            console.log('page', p);
        }
    },
    components:{
        'vpager':pager
    } 
})