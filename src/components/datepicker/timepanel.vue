<template>
<div class="timepanel">
    <listpicker :list="hours" v-model="hour" class="time-list"></listpicker>
    <listpicker :list="minutes" v-model="minute" class="time-list"></listpicker>
    <listpicker :list="seconds" v-model="second" class="time-list" v-if="hasSeconds"></listpicker>
</div>
</template>
<script>
import Listpicker from './listpicker.vue'
const createList = n => new Array(n).fill(true).map((it,i) => i);
const dbv = v => v < 10 ? ''.concat(0,v) : v;

export default {
    name: 'timepanel',
    props: {
        value: String | Date,
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
            second: undefined
        }
    },
    methods: {
        change() {
            let second = this.hasSeconds ? ':' + dbv(this.second) : '';
            this.$emit('input', dbv(this.hour) + ':' + dbv(this.minute) + second);
        },
        setTime() {
            let v = this.value, hms;
            if(v && typeof v === 'string') {
                hms = v.split(':');
                if(hms.length) {
                    this.hour = +hms[0]
                    this.minute = +hms[1]
                    hms.length > 2 && (this.second = +hms[2])
                }
            }
        }
    },
    created() {
        this.setTime();
    },
    watch: {
        hour() {
            this.change()
        },
        minute() {
            this.change()
        },
        second() {
            this.change()
        },
        value(c) {
            this.setTime();
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