<template>
<ul class="year">
    <li class="year-item" v-for="(year, index) in years">
        <span @mouseenter="curIndex = index"
            @mouseleave="curIndex = undefined"
            @click="check(year, index)"
            :class="{ 
                active: curIndex === index,
                checked: checkIndex === index,
                ignore: (index === 0 || index === years.length - 1)
            }">{{ year }}</span>
    </li>
</ul>
</template>
<script>
import { createYearArray } from './calendar'
let year = new Date().getFullYear();
export default {
    name: 'yearpanel',
    props: {
        value: {
            type: Number | String
        },
        range: {
            type: String | Array
        }
    },
    data() {
        return {
            years: createYearArray(this.range || this.value || year),
            curIndex: undefined,
            checkIndex: undefined
        }
    },
    created() {
        this.checkIndex = this.years.indexOf(this.value);
    },
    methods: {
        check(year, index) {
            if(index === 0 || index === this.years.length - 1) {
                this.years = createYearArray(year);
            } else {
                this.checkIndex = index;
                this.$emit('change', this.years[this.checkIndex]);
            }
            this.$emit('input', this.years[this.checkIndex]);
        }
    },
    watch: {
        value(c) {
            this.years = createYearArray(c)
        },
        range(r) {
            this.years = createYearArray(r)
        }
    }
}
</script>
<style lang="less" scoped>
.year {
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