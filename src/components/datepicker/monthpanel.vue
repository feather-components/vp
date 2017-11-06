<template>
<ul class="month">
    <li class="month-item" v-for="(month, index) in months">
        <span @mouseenter="curIndex = index"
            @mouseleave="curIndex = undefined"
            @click="check(month, index)"
            :class="{ 
                active: curIndex === index,
                checked: checkIndex === index
            }">{{ month }}</span>
    </li>
</ul>
</template>
<script>
const MONTH = {
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    zh: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一', '十二']
};
import { createYearArray } from './calendar'
export default {
    name: 'monthpanel',
    props: {
        value: {
            type: Number | String,
            default: new Date().getMonth()
        },
        type: {
            type: String,
            default: 'en'
        }
    },
    data() {
        return {
            months: MONTH[this.type],
            curIndex: undefined,
            checkIndex: undefined
        }
    },
    created() {
        this.checkIndex = this.months.indexOf(this.months[this.value - 1]);
    },
    methods: {
        check(month, index) {
            this.checkIndex = index;
            this.$emit('input', this.months.indexOf(month) + 1);
            this.$emit('change', this.months.indexOf(month) + 1);
        }
    },
    watch: {
        value(c) {
            this.checkIndex = this.months.indexOf(this.months[c - 1])
        }
    }
}
</script>
<style lang="less" scoped>
.month {
    width: 216px;
    height: 180px;
    display: flex;
    flex-wrap: wrap;
    &-item {
        width: 33.33%;
        text-align: center;
        height: 45px;
        line-height: 45px;
        > span {
            cursor: pointer;
            line-height: 1;
            padding: 4px 6px;
            border-radius: 3px;
            transition: all .2s;
            &.active {
                background-color: #F0F8FD;
                color: #49a9ee;
            }
            &.checked {
                background-color: #4475E8;
                color: #fff;
            }
        }
    }
}
</style>