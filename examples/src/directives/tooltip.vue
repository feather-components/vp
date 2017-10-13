<template>
    <div>
    <span style="display:inline-block;cursor:pointer;" v-tooltip.down="中国工商银行中国建设银行中国农业银行中国社会科学院">中华人民共和国中国社会科学院</span>
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
    .tip {
        position: absolute;
        bottom: 20px;
        padding: 3px 5px;
        color: #fff;
        background: rgba(0,0,0,.7);
        border-radius: 2px;
    }
    .tip::before {
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
</style>