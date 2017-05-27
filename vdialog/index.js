;
(function(factory) {
    if (typeof module === 'object' && typeof module.exports == 'object') {
        module.exports = factory(
            require('vue')
        );
    } else {
        window.Vdialog=factory(window.Vue);
    }
})(function(Vue) {
    var vDialog = {},
        template;
    if (document.getElementById('vdialog-template')) {
        template = document.getElementById('vdialog-template').innerHTML;
    } else {
        template = __inline('index.tpl');
    }
    vDialog.install = function(Vue) {
        Vue.component('vdialog', {
            props: {
                'option': {
                    type: Object 
                } 
            },
            template: template,
            methods: {
                close: function(flag) {
                    this.show=false; 
                    this.reject(flag);
                },
                sure:function(index){
                    this.show=false; 
                    this.resolve(index);
                },
                open:function (argument) {
                    var _this=this;
                    this.show=true;
                    this.promise = new Promise(function(resolve, reject){ 
                        _this.resolve = resolve;
                        _this.reject = reject;
                    }); 
                    return this.promise;  
                } 
            },
            data: function() {  
                return {                    
                    show:false,
                    resolve:'',
                    reject:''
                }
            },
            computed:{
                dialog:{
                    get:function (argument) {
                        var option=this.option;
                        var result={
                            title:option.title||'',
                            btns:option&&option.btns ? option.btns :[{text:'取消',klass:'lg-btn-o'},{text:'确定'}],
                            height:option&&option.height&&option.height>190 ? option.height+'px' :'190',                            
                            width:option&&option.width&&option.width>320 ? option.width+'px' :'320px'
                        }
                        return result;
                    }
                }
            }
        })
    }
    Vue.use(vDialog);
    return vDialog;
});
