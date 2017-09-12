<template>
    <overlay :visible="visibility" class="vp-mask" @click="$emit('click')"><slot></slot></overlay>
</template>

<style>
    .vp-mask.vp-overlay{
        width: 100%;
        height: 100%;
        left: 0px;
        top: 0px;
        background: rgba(0, 0, 0, 0.6);
    }
</style>

<script>
    import Overlay from '../overlay';
    export default{
        mixins: [Overlay],
        name: 'mask',
        components: {
            Overlay
        }
    }
</script>