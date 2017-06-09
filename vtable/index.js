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
    var vTable = {},
        template; 
    if (document.getElementById('vTable-template')) {
        template = document.getElementById('vTable-template').innerHTML;
    } else {
        template = __inline('index.tpl');
    }
    vTable.install = function(Vue) {
        Vue.component('vtable', {
            props: {
                'thead': {
                    type: Object,
                    require: true
                },
                'tdata': {
                    type: Array,
                    require: true 
                },
                'colspan':{
                    type:Number,
                    require:true
                }
            },
            template: template,
            methods: {
                sort:function(e,obj){  
                    if(e.srcElement.className=='sort'&&obj.desc||e.srcElement.className.indexOf('up')>=0){
                        e.srcElement.className='sort down';
                        this.$parent.$emit('table_sort','desc',obj.arg)
                    }
                    else{
                        e.srcElement.className='sort up';
                        this.$parent.$emit('table_sort','asc',obj.arg)
                    } 
                },
                tooltip:function(){

                }
            },
            data: function() { 
                var thead={};
                for(var e in this.thead){  
                    thead[e]={
                        type:this.thead[e].type||'field',
                        label:this.thead[e].label||(typeof this.thead[e] =='string'?this.thead[e]:'')
                    }; 
                    if(this.thead[e].sort){
                        thead[e].sort={};
                        thead[e].sort.desc=this.thead[e].sort.desc||false;
                        thead[e].sort.arg=this.thead[e].sort.arg||e;
                    } 
                } 

                return {
                    aHead:thead
                }  
            },
            created:function(){
                 
                 
            }, 
            watch:{
                
            }
        })
    }
    Vue.use(vTable);
});
