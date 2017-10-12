
<template>
    <div class="water-fall-item">
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
            }
        },
        mounted(){

        }
    }
</script>
<style>

</style>