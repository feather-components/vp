<template>
    <div class="vp-checkbox-wrap clearfix">
        <div class="vp-checkbox-item" v-for="checkbox, index in checkboxArray">
            <label :for="boxId(index)">{{checkbox.label}}</label><input type="checkbox" id="boxId(index)" :value="checkbox.value"></input>
        </div>
    </div>
</template>
<script>
    export default {
        cmpName: 'vp-checkbox-array',
    
        data () {
            return {
                checkboxArray: []
            };
        },

        props: {
            opCheckBoxArray: {
                type: Array,
                required: true
            },
            name: {
                type: String
            }
        },

        computed: {
            formItem () {
                return this.$parent;
            }
        },

        methods: {
            boxId (index) {
                return `J-checkbox-${this.formItem.name}-${index}`;
            },
            setData () {
    
            }
        },

        mounted () {
            this.checkboxArray = this.opCheckBoxArray;
        }
    };
</script>
<style>
    .vp-checkbox-wrap{

    }
</style>