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
    var autoinput={};
    autoinput.install = function(Vue) { 
        Vue.component('autoinput',{
            delimiters: ['${', '}'],
            props: ['data', 'width','placeholder','update','select','clear','value'],
            template: '<div class="lg-autoinput"><i></i><input @keyup="keyup" @focus="focus" @blur="blur" :style="width?\'width:\'+width:\'\'" type="text" :placeholder="placeholder" :value="selected" v-model="selected"/><i class="c" @click="clean" v-if="selected"></i><ul @mouseenter="enter" @mouseleave="leave" v-if="show" :style="width?\'width:\'+width:\'\'"><li v-for="item in data" :title="item.text"><a @click="check(item)" >${item.text}</a></li></ul></div>',
            methods: {
                check: function(obj) {//li select  
                    this.selected=obj.text; 
                    this.select&&this.select(obj);
                    this.show=false;
                },
                focus:function (argument) {//input focus  
                    this.show=true;
                },
                keyup:function (event) {//input keyup  
                    this.update&&this.update(this.selected,this.list); 
                },
                blur:function (event) {//input blur 
                    var _this=this;
                    if(this.over){
                        _this.show=false;   
                    }
                }, 
                clean:function (argument) {//clean input 
                    this.selected='';
                    this.show=false;
                    this.list=[];
                    this.clear&&this.clear(); 
                },
                enter:function (argument) {//hover ul
                    this.over=false;
                },
                leave:function (argument) {//leave ul
                    this.over=true;
                }
            },
            data:function (argument) { 
                return { 
                    selected:this.value?this.value:'',
                    show:false,
                    visible:false,
                    over:true
                }
            }, 
            watch:{
                value:function(vNew,vOld){ 
                    this.selected=vNew; 
                }
            }
        }) 
    }
    Vue.use(autoinput);
});
