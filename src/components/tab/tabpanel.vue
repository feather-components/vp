<template>
    <section class="vp-tab-panel" v-if="isActive" :index="index" :label="label">
        <slot></slot>
    </section>
</template>
<script>
    export default {
        name: 'tabpanel',
        props: {
            label: { 
                type: String,
                required: true
            },
            index: { 
                type: Number | String,
                required: true
            }
        },
        data(){
            return {
                isActive: false
            }
        }
    }
</script>
<style>
    .vp-tab-panel{
        background-color: #fff;
        padding: 20px;
    }
</style>