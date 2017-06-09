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
    var vTip = {},
        template; 
    if (document.getElementById('vtip-template')) {
        template = document.getElementById('vtip-template').innerHTML;
    } else {
        template = __inline('index.tpl');
    }
    vTip.install = function(Vue) {
        Vue.component('vtip', {
            props: {
                'option': {
                    type: Object,
                    require: false
                },
                'content': {
                    require: true
                }
            },
            template: template,
            methods: {
                showTip:function(e){
                    this.makeTip(e.srcElement.offsetHeight,e.srcElement.offsetWidth,e.srcElement.offsetTop,e.srcElement.offsetLeft,this.direction);
                    this.show=true;                     
                },
                hideTip:function(){ 
                    this.show=false;
                },
                makeTip:function(h,w,t,l,type){ 
                    var aPointer=this.makePoint(h,w,t,l);
                    var aStyle=this.makeBaseStyle(aPointer);
                    switch(type){
                        case 't':
                            this.style=aStyle[2-1];
                            this.klass='dirTopLeft-2';
                            break;
                        case 'tl':
                            this.style=aStyle[1-1];
                            this.klass='dirTop lg-bubble-tl';
                            break;
                        case 'tr':
                            this.style=aStyle[3-1];
                            this.klass='dirTopLeft lg-bubble-tr';
                            break;
                        case 'b':
                            this.style=aStyle[7-1];
                            this.klass='dirLeft-2 lg-bubble-b';
                            break;
                        case 'bl':
                            this.style=aStyle[6-1];
                            this.klass='lg-bubble-bl';
                            break;
                        case 'br':
                            this.style=aStyle[8-1];
                            this.klass='dirLeft lg-bubble-br';
                            break;
                        case 'l':
                            this.style=aStyle[4-1];
                            this.klass='dirLeftTop-2 lg-bubble-l';
                            break;
                        case 'lt':
                            this.style=aStyle[1-1];
                            this.klass='dirLeft lg-bubble-lt';
                            break;
                        case 'lb':
                            this.style=aStyle[6-1];
                            this.klass='dirTopLeft lg-bubble-lb';
                            break;
                        case 'r':
                            this.style=aStyle[5-1];
                            this.klass='dirTop-2 lg-bubble-r';
                            break;
                        case 'rt':
                            this.style=aStyle[3-1];
                            this.klass='lg-bubble-rt';
                            break;
                        case 'rb':
                            this.style=aStyle[8-1];
                            this.klass='dirTop lg-bubble-rb';
                            break;
                        default:
                            this.style=aStyle[2-1];
                            this.klass='dirTopLeft-2';
                            break;
                    }

                },
                makePoint:function(h,w,t,l){
                    return [{x:l-10,y:t-10},
                    {x:l+w/2,y:t-10},
                    {x:l+w+10,y:t-10},
                    {x:l-10,y:t+h/2},
                    {x:l+w+10,y:t+h/2},
                    {x:l-10,y:t+h+10},
                    {x:l+w/2,y:t+h+10},
                    {x:l+w+10,y:t+h+10}] 
                },
                makeBaseStyle:function(aPointer){
                    var result=[];
                    for(var i=1;i<=8;i++){
                        result.push("top:"+aPointer[i-1].y+'px;left:'+aPointer[i-1].x+'px;');
                    }
                    return result;
                }
            },
            data: function() {  
                var content='';
                if(typeof this.content=='object'){ 
                    content=this.content.innerHTML;
                }
                else{
                    content=this.content;
                }
                return {
                    label:this.option&&this.option.label?this.option.label:'?',
                    classname:this.option&&this.option.classname?this.option.classname:'lg-tiphand',
                    body:content,
                    show:this.option&&this.option.auto,
                    style:'',
                    klass:'',
                    direction:this.option&&this.option.direction?this.option.direction:''
                }  
            },
            created:function(){
                
                 
                 
            }, 
            watch:{
                
            }
        })
    }
    Vue.use(vTip);
});
