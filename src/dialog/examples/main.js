import Vue from '&&vue';
import '&&css';
import '&&legoland';
import dialog from '&&js'; 

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
    } 
})
new Vue({
    el: '#vdom',
    data: { 
        option1:{
            title:'confirm', 
            btns:[
                {
                    name:'取消',
                    klass:'lg-btn-o' 
                },{
                    name:'确定' 
                } 
            ]
        },
        option2:{
            btns:[ {
                    name:'确定' 
                } 
            ]
        },
        option3:{ 
            height:300,
            width:500,
            btns:[ {
                    name:'顶' 
                } ,{
                    name:'看看' 
                } ,{
                    name:'踩' 
                } 
            ]
        }
    },
    methods: {
        open: function(i) {
            var _this=this;
            if(i==1){
                this.$refs.dialog1.open().then(function(index){ alert('click1 btn'+index); },function(){ alert('close1'); }); 
            }
            else if(i==2){
                this.$refs.dialog2.open().then(function(index){ alert('click2 btn'+index); },function(){ alert('close2'); }); 
            }
            else{
                this.$refs.dialog3.open().then(function(index){},function(){}); 
            } 
        }
    },
    mounted:function(){
        this.open(2); 
    },
    components:{
        'vdialog':dialog
    } 
})