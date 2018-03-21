<template>
    <section class="vp-tab-panel" v-if="isActive" v-show="isShow" :index="index" :label="label">
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
                required: false
            }
        },
        data(){
            return {
                isActive: false,
                isShow: true, 
                autoIndex: 0
            }
        },
        methods: {
            getIndex(){
                return typeof this.index === 'undefined' ? this.autoIndex : this.index;
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