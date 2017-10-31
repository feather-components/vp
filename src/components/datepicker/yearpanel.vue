<template>
<ul class="year">
    <li class="year-item" v-for="(year, index) in years">
        <span @mouseenter="curIndex = index"
            @mouseleave="curIndex = undefined"
            @click="check(year, index)"
            :class="{ 
                active: curIndex === index,
                checked: curYear === year,
                ignore: (index === 0 || index === years.length - 1)
            }">{{ year }}</span>
    </li>
</ul>
</template>
<script>
import { createYearArray } from './calendar'
export default {
    name: 'yearpanel',
    props: {
        value: {
            type: Number | String,
            default: new Date().getFullYear()
        }
    },
    data() {
        return {
            years: createYearArray(this.value),
            curYear: this.value,
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
                if(index === 0) {
                    this.years = createYearArray(year);
                } else {
                    this.years = createYearArray(year);
                }
            } else {
                this.curYear = year;
                this.checkIndex = index;
                this.$emit('input', year);
            }
        }
    },
    watch: {
        value(c) {
            this.years = createYearArray(c)
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
        cursor: pointer;
        width: 33.33%;
        text-align: center;
        height: 45px;
        line-height: 45px;
        > span {
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