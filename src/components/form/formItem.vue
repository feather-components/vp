<template>
    <div class="vp-form-item">
        <label class="vp-form-item-label" v-if="label" style="labelStyle">
            <slot name="label">{{ label + form.labelSuffix }}</slot>
        </label>
        <slot></slot>
        <div class="vp-form-item-error"></div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
            };
        },
        props: {
            label: String,
            labelWidth: String,
            name: String
        },

        computed: {
            form () {
                let self = this;
                let parent = self.$parent;
                let count = 0;
                while (parent.$options.cmpName !== 'vp-form' && count < 5) {
                    parent = parent.$parent;
                    count++;
                };
                if (parent.$options.cmpName !== 'vp-form') {
                    return false;
                }
                return parent;
            }
        },
    
        methods: {
    
        },
    
        mounted () {
            if (this.form) {
                this.form.fields.push(this);
            }
        }
    };
</script>
<style>
    
</style>