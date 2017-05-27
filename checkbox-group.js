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
    var checkboxGroup = {};
    checkboxGroup.install = function(Vue) {
        Vue.component('checkbox-group', {
            delimiters: ['${', '}'],
            props: ['data', 'model', 'className','index'],
            template: '<span><span :class="className?className:\'lg-checkbox-plain\'" v-for="item in data"><input v-model="selected" v-on:click="check()" type="checkbox" :name="name(item.name,index)" :id="id(item.id,index)" :value="item.value"/><label :for="id(item.id,index)">${item.text}</label></span></span>',
            methods: {
                check: function() { 
                    this.$emit('input',this.selected.join(',')); 
                },
                name:function(name,index){
                    if(index!=undefined){
                        return name+index;
                    }
                    return name;
                },
                id:function(id,index){
                    if(index!=undefined){
                        return id+index;
                    }
                    return id;
                }
            }, 
            data:function(){                
                return {
                    selected:getVal(this.model)
                } 
            },
            watch:{
                model:function(val){
                    this.selected=getVal(val); 
                }
            }
        })
    }
    function getVal(value){
        var result=[];
        if(value&&value!=''){
            result=value.split(',');
        }                 
        return result
    }
    Vue.use(checkboxGroup);
});
