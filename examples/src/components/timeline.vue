<template>
    <div>
        <div class="example-box">
            <vp-timeline :type="exp1.icon" :node="node" :current="2" @nodeClick="exp1.click"></vp-timeline>
            <div class="example-remark">
                <div class="example-title">
                    <span>Base TimeLine</span>
                </div>                
                <div class="example-memo">
                    <btn v-for="(btn,i) in exp1.aType" @click="exp1click(i)" :type="exp1.btnType[i]?'main':'plain'">{{btn}}</btn> 
                </div>
            </div>
        </div> 
        <div class="example-box">
            <vp-timeline size="small" :node="node" :current="2"></vp-timeline>
            <div class="example-remark">
                <div class="example-title">
                    <span>Small TimeLine</span>
                </div> 
            </div>
        </div>
        <div class="example-box">
            <vp-timeline type="userdefine" :node="node" :current="2">
                <span v-for="(n,i) in node" :slot="'icon'+i" class="lg-i lg-ihollowcheck lg-color-success" style="font-size:24px"></span>
                <div v-for="(n,i) in node" :slot="'remark'+i">
                    <div class="lg-color-success" style="line-height:16px;font-size:12px">{{n.remark}}</div>
                </div>
            </vp-timeline>
            <div class="example-remark">
                <div class="example-title">
                    <span>Userdefine</span>
                </div> 
            </div>
        </div> 
        <div class="example-box">
            <vp-timeline :node="node" :width="exp4.width" :current="2"></vp-timeline>
            <div class="example-remark">
                <div class="example-title">
                    <span>Step Width</span>
                </div>
                <div class="example-memo">
                    <btn v-for="(btn,i) in exp4.aType" @click="exp4click(i)" :type="exp4.btnType[i]?'main':'plain'">{{btn}}</btn> 
                </div>
            </div>
        </div>        
    </div>
</template>
<style>
.example-box{
    border:1px solid rgba(0,0,0,0.1);
    border-radius: 3px;
    padding:15px;
    margin:15px;
}
.example-remark{
    padding-left: 10px;
    border-top:1px solid rgba(0,0,0,0.08);
    margin-top:10px;
}
.example-title{
    height: 20px;
    line-height: 0;  
}
.example-title span{
    font-size: 16px;
    padding: 0 10px;
    color: rgba(0,0,0,0.6);
    font-weight: bold;
    background-color: white;
}

</style>
<script>
import Vue from 'vue';
import {
    Timeline, Button
} from 'vpui';

export default {
    components: {
        "vp-timeline": Timeline,
        "btn": Button
    },
    data() {
        return {
            exp1:{
                btnType:[0,1],
                icon:'number',
                aType:['dot','number'],
                click(index){
                    alert('click node:'+(index+1))
                }
            },
            exp4:{
                btnType:[1,0,0,0],
                width:'',
                aType:['flex','auto','100px','200px']
            },
            node:[{
                title:'Start'
            },{
                title:'Second',
                remark:'2017-09-09 12:00:00'
            },{
                title:'Third',
                remark:'2017-09-09 12:00:00'
            },{
                title:'Last',
                remark:'2017-09-09 12:00:00'
            },{
                title:'Last',
                remark:'2017-09-09 12:00:00'
            }],
            current:2
        }
    },
    created() {
    },
    methods: {
        exp1click(index){
            this.setBtn(this.exp1,index); 
            this.exp1.icon=this.exp1.aType[index];
        },
        exp4click(index){
            this.setBtn(this.exp4,index); 
            this.exp4.width=this.exp4.aType[index];
        },
        setBtn(target,index){
            target.btnType=[0,0,0,0];
            target.btnType[index]=1;
        }
    }
}
</script>