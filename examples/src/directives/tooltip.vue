<template>
    <div class="wrap">
        <p class="target" v-tooltip.up="我是工具提示信息1">我是工具提示1</p>
        <p class="target" v-tooltip.down="我是工具提示信息2">我是工具提示2</p>
        <!-- <p class="target" v-tooltip.left="我是工具提示信息3">我是工具提示3</p> -->
        <!-- <p class="target" v-tooltip.right="我是工具提示信息4">我是工具提示4</p> -->
    </div>
</template>
<script>
    import { Tooltip } from 'vpui';
    export default {
        directives: {
            tooltip: Tooltip,
        }
    }
</script>
<style>
    .target {
        display: inline-block;
        margin-top: 50px;
        margin-right: 30px;
        cursor: pointer;
    }
    .tip {
        position: absolute;
        padding: 3px 5px;
        color: #fff;
        background: rgba(0,0,0,.7);
        border-radius: 2px;
    }
    .tip-up {bottom: 24px;}
    /*.tip-right {bottom: 24px;}*/
    .tip-down {top: 24px;}
    /*.tip-left {bottom: 24px;}*/
    .tip-up::before {
        content: '';
        display: block;
        position: absolute;
        bottom: -5px;
        left: 50%;
        width: 0;
        height: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 5px solid rgba(0,0,0,.7);
        -webkit-transform: -webkit-translateX(-3px);
                transform: translateX(-3px);
    }
    .tip-down::before {
        content: '';
        display: block;
        position: absolute;
        top: -5px;
        left: 50%;
        width: 0;
        height: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 5px solid rgba(0,0,0,.7);
        -webkit-transform: -webkit-translateX(-3px);
                transform: translateX(-3px);
    }
</style>