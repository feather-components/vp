;
(function(factory) {
    if (typeof module === 'object' && typeof module.exports == 'object') {
        module.exports = factory(
            require('vue')
        );
    } else {
        window.Vsuggest=factory(window.Vue);
    }
})(function(Vue) {
    var vSuggest = {},
        template;
    if (document.getElementById('vsuggest-template')) {
        template = document.getElementById('vsuggest-template').innerHTML;
    } else {
        template = __inline('index.tpl');
    }
    vSuggest.install = function(Vue) {
        Vue.component('vsuggest', {
            delimiters: ['${', '}'],
            props: ['data', 'width','placeholder','update','select','clear','init'],             
            template: template,
            methods: {
                check: function(obj) {//li select  
                    this.selected=obj.text; 
                    this.select&&this.select(obj);
                    this.show=false;
                    this.$emit('input', obj.key);
                },
                focus:function () {//input focus  
                    this.show=true;
                },
                keyup:function () {//input keyup  
                    this.update&&this.update(this.selected,this.list); 
                },
                blur:function () {//input blur 
                    var _this=this;
                    if(this.over){
                        _this.show=false;   
                    }
                }, 
                clean:function () {//clean input 
                    this.selected='';
                    this.$emit('input', '');
                    this.show=false;
                    this.list=[];
                    this.clear&&this.clear(); 
                },
                enter:function () {//hover ul
                    this.over=false;
                },
                leave:function () {//leave ul
                    this.over=true;
                }
            },
            data: function() {   
                return { 
                    selected:this.init?this.init:'',
                    show:false,
                    visible:false,
                    over:true
                }
            }, 
            watch:{
                init:function(vNew,vOld){ 
                    this.selected=vNew; 
                }
            }
        })
    }
    Vue.use(vSuggest);
    return vSuggest;
});
