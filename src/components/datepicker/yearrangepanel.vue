<template>
<ul class="range">
    <li class="range-item" v-for="(range, index) in ranges">
        <span @mouseenter="curIndex = index"
            @mouseleave="curIndex = undefined"
            @click="check(range, index)"
            :class="{ 
                active: curIndex === index,
                checked: checkIndex === index,
                ignore: (index === 0 || index === ranges.length - 1)
            }">{{ range }}</span>
    </li>
</ul>
</template>
<script>
import { createYearRangArray } from './calendar'

let year = new Date().getFullYear(), begin = year - year % 10, end = begin + 9;

export default {
    name: 'yearrangepanel',
    props: {
        value: {
            type: String,
            default: begin + '~' + end
        }
    },
    data() {
        return {
            ranges: createYearRangArray(this.value),
            curIndex: undefined,
            checkIndex: undefined
        }
    },
    created() {
        this.checkIndex = this.ranges.indexOf(this.value);
    },
    methods: {
        check(range, index) {
            if(index === 0 || index === this.ranges.length - 1) {
                this.ranges = createYearRangArray(range);
            } else {
                let rg = range.split('~'), b = +rg[0], e = +rg[1];
                this.checkIndex = index;
                this.$emit('change', {
                    range,
                    begin: b,
                    end: e
                })
            }
            this.$emit('input', this.ranges[this.checkIndex]);
        }
    },
    watch: {
        value(c) {
            this.ranges = createYearRangArray(c)
            this.checkIndex = this.ranges.indexOf(c);
        }
    }
}
</script>
<style lang="less" scoped>
.range {
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
            &.ignore {
                color: rgba(0,0,0,.25);
            }
            &.active {
                background-color: #F0F8FD;
                color: #49a9ee;
            }
            &.checked {
                background-color: #4475E8;
                color: #fff;
                &.ignore {
                    background-color: transparent;
                    color: rgba(0,0,0,.25);
                }
            }
        }
    }
}
</style>