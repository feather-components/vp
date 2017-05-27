;
(function(factory) {
    if (typeof module === 'object' && typeof module.exports == 'object') {
        module.exports = factory(
            require('vue')
        );
    } else {
        factory(window.Vue);
    }
})(function(Vue) {
    var selectGroup={};
    selectGroup.install = function(Vue) { 
        Vue.component('select-group',{
            delimiters: ['${', '}'],
            props: ['data', 'model', 'keyset','defaultVal', 'hide'],
            template: '<select @change="change" v-model="selected" v-if="!hide"><option v-for="item in data" :value="item.val" >${item.text}</option></select>',
            methods: {
                change: function(event) {
                    //if model is pased by object, components can set value by reference whitch is suggested when modify value only
                    if (typeof this.model == 'object') {
                        this.model[this.keyset] = this.selected;
                    }
                    //if model is pased by value,we cannot modify it directly,so we use $emit whitch is suggested when need callback
                    else {  
                        this.$parent.$emit(this.keyset, this.selected,event.target['options'][event.target['selectedIndex']].label);
                    }
                }
            },
            data: function() {  
                return {
                    selected: this.defaultVal!=undefined ? this.defaultVal: this.data[0] ? this.data[0].val : ''
                };
            },
            watch: {
                data: function(val, oldVal) {  
                    if(this.data[0])
                        this.selected = this.defaultVal!=undefined ? this.defaultVal:this.data[0].val;
                }
            } 
        }) 
    } 
    Vue.use(selectGroup);
});
