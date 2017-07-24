<template>
    <div class="vp-checkbox-wrap clearfix" :style="valueStyle" type="VP-CHECKBOXES" ref="itemWrap">
        <div class="vp-checkbox-item" v-for="item, index in dataItems">
            <label :for="boxId(index)">{{item.label}}</label><input type="checkbox" :id="boxId(index)" :value="item.value"></input>
        </div>
    </div>
</template>
<script>
    export default {
        cmpName: 'vp-checkboxes',
    
        data () {
            return {
                dataItems: []
            };
        },

        props: {
            items: {
                type: Array,
                required: true
            },
            name: {
                type: String
            },
            valueWidth: {
                type: String,
                default: '100px'
            }
        },

        computed: {
            formItem () {
                return this.$parent;
            },
            valueStyle () {
                return `width: ${this.valueWidth}`;
            }
        },

        methods: {
            boxId (index) {
                return `J-checkbox-${this.formItem.name}-${index}`;
            },
            setData () {
    
            },
            getBoxes () {
                return this.$refs.itemWrap.querySelectorAll('input[type="checkbox"]');
            },
            getValue () {
                let values = [];
                let items = this.getBoxes();
                items.forEach((checkbox) => {
                    if (checkbox.checked) {
                        values.push(checkbox.value);
                    }
                });
                return values.join(',');
            },
            setValue (value) {
                let values = [];
                let items = this.getBoxes();
                if (value.constructor === String) {
                    values = value.split(',');
                }
                if (value.constructor === Array) {
                    values = value;
                }
                values.forEach((val) => {
                    items.forEach((item) => {
                        item.checked = (val === item.value);
                    });
                });
            }
        },

        mounted () {
            this.dataItems = this.items;
            this.formItem.subItem = this;
        }
    };
</script>
<style>
    .vp-checkbox-wrap{

    }
    .vp-checkbox-item{
        float: left;
        margin-right:10px;
    }
</style>