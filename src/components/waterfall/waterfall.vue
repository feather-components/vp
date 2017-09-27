<template>
    <div class="water-fall">
        <div v-for="item in source">
            <slot></slot>
        </div>
    </div>    
</template>
<script>
    import fallSlot  from './slot.vue';

    export default{
        name: 'waterfall',
        components: {
            fallSlot
        },
        props: {
            source: Array
        }
    }
</script>
<style>

</style>