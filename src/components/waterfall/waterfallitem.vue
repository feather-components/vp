
<template>
    <div class="water-fall-item" @click="clickAbc">
        <slot></slot>
    </div>
</template>
<script>
    export default{
        props:{
            itemData: Object,
        },
        methods:{
            move(){
                let self = this;
                self.$parent.getColumn(0).append(self.$el);
            },
            clickAbc(){
                alert('abc')
            }
        },
        mounted(){

        }
    }
</script>
<style>

</style>