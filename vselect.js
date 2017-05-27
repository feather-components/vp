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
    var vselect={};
    vselect.install = function(Vue) { 
        Vue.component('vselect',{
            delimiters: ['${', '}'],
            props: ['data','model','keyset','hide','style'],
            template: '<select @change="change" v-model="selected" v-if="!hide" :style="style"><option v-for="item in data" :value="item.val" >${item.text}</option></select>',
            methods: {
                change: function(event) {  
                    if(typeof this.keyset=='function'&&event.target['selectedIndex']>=0){
                        this.keyset(this.selected,event.target['options'][event.target['selectedIndex']].label);
                    }else if(this.keyset&&event.target['selectedIndex']>=0){  
                        this.$parent.$emit(this.keyset, this.selected,event.target['options'][event.target['selectedIndex']].label); 
                    }                  
                    this.$emit('input', this.selected); 
                }
            },
            data: function() {  
                return {
                    selected: this.model!=undefined?this.model:this.data[0]?this.data[0].val:''
                };
            },
            watch: {
                data: function(val, oldVal) {  
                    if(this.data[0]){ 
                        this.selected = this.model!=undefined?this.model:this.data[0].val; 
                        this.$emit('input', this.selected);
                    }
                },
                model:function(val,oldVal){ 
                    this.selected=val;
                    var label=this.data.filter(function(item){
                        return item.val==val
                    });                   
                    this.$emit('input',val);  
                }
            } 
        }) 
    } 
    Vue.use(vselect); 
}); 
