<template>
<span class="progressbar">
    <span class="progress" :class="type+' '+(error?'error':'')"><span :style="{width:parseInt(scale)+'%'}" :class=""></span></span>
    <span class="percent" v-if="scale<100&&!error">{{parseInt(scale)+'%'}}</span>
    <span class="complete" v-if="scale==100&&!error">&#10003</span>
    <span class="errorsymbol" v-if="error" @click="closeProgress">&#10005</span>
</span>
</template>

<script>
    // import ProgressBar from '../progressbar';
    export default{
        name: 'progressBar',
        data(){
            return{
                
            }
        },
        props: {
            scale:{
                type: Number,
                default:0
            },
            type:{
                type: String,
                default:""
            },
            error:{
                type: Boolean,
                default:false
            }
        },
        methods:{
            closeProgress(){
                this.$emit('close');
            }
        },
        components: {
            //ProgressBar
        }
    }
</script>

<style scoped lang="less">
    .progressbar{
        height: 14px;
        line-height: 14px;
        .progress{
            margin-top: 3px;
            width: 328px;
            height: 8px;
            display: inline-block;
            span{
                height: 8px;
                border-radius: 3px;
                display: block;
                background-color: #3DBD7D;
                float: left;
            }
            &.small{
                margin-top: 5px;
                width: 128px;
                height: 4px;
                span{
                    height: 4px;
                }
            }
            &.error{
                span{
                    background-color: #CC3232;
                }
            }
        }
        .percent{
            font-size: 14px;
        }
        .complete,.errorsymbol{
            margin-left: 5px;
            width: 14px;
            height: 14px;
            line-height: 14px;
            border-radius: 7px;
            color: #fff;
            background-color: #3DBD7D;
            text-align: center;
            display: inline-block;
        }
        .errorsymbol{
            background-color: #CC3232;
            cursor: pointer;
        }
    }
    
</style>