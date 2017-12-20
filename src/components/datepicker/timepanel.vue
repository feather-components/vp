<template>
<div class="timepanel">
    <listpicker :list="hours" v-model="hour" class="time-list"></listpicker>
    <listpicker :list="minutes" v-model="minute" class="time-list"></listpicker>
    <listpicker :list="seconds" v-model="second" class="time-list" v-if="hasSeconds"></listpicker>
</div>
</template>
<script>
import Listpicker from './listpicker.vue'

import { quantity } from './calendar'

const createList = n => new Array(n).fill(true).map((it,i) => i);

export default {
    name: 'timepanel',
    props: {
        value:{
            type: String | Date
        },
        hasSeconds: {
            type: Boolean,
            default: false
        }
    },
    components: {
        Listpicker
    },
    data() {
        return {
            hours: createList(24),
            minutes: createList(60),
            seconds: createList(60),
            hour: undefined,
            minute: undefined,
            second: undefined,
            date: undefined
        }
    },
    methods: {
        change() {
            let second = this.hasSeconds ? ':' + quantity(this.second || 0) : '', time;
            if(this.value instanceof Date) {
                time = new Date(this.date + ' ' + quantity(this.hour) + ':' + quantity(this.minute) + ':' + quantity(this.second));
            } else {
                time = this.date + ' ' + quantity(this.hour || 0) + ':' + quantity(this.minute || 0) + second;
            }
            this.$emit('input', time);
            this.$emit('change', time);
        },
        setTime(c) {
            if(this.value) {
                let d = this.value ? new Date(this.value) : new Date();
                this.hour = d.getHours();
                this.minute = d.getMinutes();
                this.second = d.getSeconds();
                this.date = d.toLocaleDateString();
            } else {
                this.hour = 0;
                this.minute = 0;
                this.second = 0;
                this.date = new Date().toLocaleDateString();
            }
        }
    },
    created() {
        this.setTime();
    },
    watch: {
        hour(c) {
            this.change()
        },
        minute(c) {
            this.change()
        },
        second(c) {
            this.change()
        },
        value(c) {
            this.setTime(c);
        }
    }
}
</script>
<style lang="less" scoped>
.timepanel {
    width: 216px;
    display: flex;
    .time-list {
        flex: 1;
        display: block;
    }
}
</style>