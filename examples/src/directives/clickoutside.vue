<template>
<div>
    <div v-clickoutside="outside" class="area">点击红色区域之外感受一下吧！</div>
    <div v-html="tips"></div>
</div>
</template>
<script>
import {
    Clickoutside
} from 'vpui';
export default{
    directives: {
        "clickoutside":Clickoutside
    },
    data() {
        return {
            tips: ''
        }
    },
    methods:{
        outside() {
            this.tips += 'you click this area\'s outside!!!<br/>'
            console.log('you click this area\'s outside!!!');
        }
    }
}
</script>
<style lang="less" scoped>
.area {
    background-color: #f00;
    width: 100px;
    height: 50px;
    margin-top: 20px;
    font-size: 12px;
    color: #fff;
}
</style>