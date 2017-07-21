<template>
    <div class="vp-radiobox-wrap clearfix" :style="valueStyle" type="VP-RADIOBOXES" ref="itemWrap">
        <div class="vp-radiobox-item" v-for="item, index in items">
            <label :for="boxId(index)">{{item.label}}</label><input type="radio" :id="boxId(index)" :value="item.value" :name="name"></input>
        </div>
    </div>
</template>
<script>
    export default {
        cmpName: 'vp-radioboxes',
    
        data () {
            return {
                items: [],
                name: ''
            };
        },

        props: {
            poItems: {
                type: Array,
                required: true
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
                return `J-radiobox-${this.formItem.name}-${index}`;
            },
            setData () {
    
            },
            getBoxes () {
                return this.$refs.itemWrap.querySelectorAll('input[type="radio"]');
            },
            getValue () {
                let values = [];
                let items = this.getBoxes();
                items.forEach((radiobox) => {
                    if (radiobox.checked) {
                        values.push(radiobox.value);
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
            this.items = this.poItems;
            this.formItem.subItem = this;
            this.name = this.formItem.name;
        }
    };
</script>
<style>
    .vp-radiobox-wrap{

    }
    .vp-radiobox-item{
        float: left;
        margin-right:10px;
    }
</style>