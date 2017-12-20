<template>
<div class="datepicker">
    <div class="input" @click="open = !open">
        <input type="text" readonly
            class="input-text"
            v-model="ymd"
            :name="name"
            :placeholder="placeholder">
        <span class="picker-icon">
            <svg t="1509440982605" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4562" xmlns:xlink="http://www.w3.org/1999/xlink" width="22" height="22">
                <path d="M752 198.2h-58v-50c0-15.4-12.6-28-28-28s-28 12.6-28 28v50H386v-50c0-15.4-12.6-28-28-28s-28 12.6-28 28v50h-58c-79.2 0-144 64.8-144 144v428c0 79.2 64.8 144 144 144h480c79.2 0 144-64.8 144-144v-428c0-79.2-64.8-144-144-144z m88 572c0 23.4-9.2 45.4-25.8 62.2-16.8 16.8-38.8 25.8-62.2 25.8H272c-23.4 0-45.4-9.2-62.2-25.8S184 793.6 184 770.2v-428c0-23.4 9.2-45.4 25.8-62.2 16.8-16.8 38.8-25.8 62.2-25.8h58v42c0 15.4 12.6 28 28 28s28-12.6 28-28v-42h252v42c0 15.4 12.6 28 28 28s28-12.6 28-28v-42h58c23.4 0 45.4 9.2 62.2 25.8 16.8 16.8 25.8 38.8 25.8 62.2v428z" fill="#999" p-id="4563"></path>
                <path d="M358 436.2h-52c-14.2 0-26 11.6-26 26v52c0 14.4 11.8 26 26 26h52c14.4 0 26-11.6 26-26v-52c0-14.4-11.6-26-26-26zM358 616.2h-52c-14.2 0-26 11.6-26 26v52c0 14.4 11.8 26 26 26h52c14.4 0 26-11.6 26-26v-52c0-14.4-11.6-26-26-26zM538 436.2h-52c-14.2 0-26 11.6-26 26v52c0 14.4 11.8 26 26 26h52c14.4 0 26-11.6 26-26v-52c0-14.4-11.6-26-26-26zM538 616.2h-52c-14.2 0-26 11.6-26 26v52c0 14.4 11.8 26 26 26h52c14.4 0 26-11.6 26-26v-52c0-14.4-11.6-26-26-26zM718 436.2h-52c-14.2 0-26 11.6-26 26v52c0 14.4 11.8 26 26 26h52c14.4 0 26-11.6 26-26v-52c0-14.4-11.6-26-26-26zM718 616.2h-52c-14.2 0-26 11.6-26 26v52c0 14.4 11.8 26 26 26h52c14.4 0 26-11.6 26-26v-52c0-14.4-11.6-26-26-26z" fill="#999" p-id="4564"></path>
            </svg>
        </span>
    </div>
    <transition name="dropDown">
    <div class="drop-box" v-if="open">
        <div class="picker-header">
            <span><i class="picker-icon left" @click="prev"></i></span>
            <span v-if="showRange || showYear" @click="showRange = true"><em>{{ range }}</em></span>
            <span v-else-if="showMonth" @click="openRangePanel"><em>{{ year }}</em></span>
            <span v-else @click="showMonth = true"><em>{{ monthArr[month - 1] }} {{ year }}</em></span>
            <span><i class="picker-icon right" @click="next"></i></span>
        </div>
        <template v-if="showYear">
            <yearrangepanel v-model="range" @change="changeYearRange" v-if="showRange"></yearrangepanel>
            <yearpanel v-model="year" :range="range" v-else @change="showYear = false"></yearpanel>
        </template>
        <template v-else-if="showMonth">
            <monthpanel :lang="lang" v-model="month" @change="showMonth = false"></monthpanel>
        </template>
        <template v-else>
            <datepanel class="date-panel" :lang="lang" v-model="DATE" @change="changeDate()" ref="dp"></datepanel>
        </template>
    </div>
    </transition>
</div>
</template>
<script>
import Datepanel from './datepanel.vue'
import Monthpanel from './monthpanel.vue'
import Yearpanel from './yearpanel.vue'
import Yearrangepanel from './yearrangepanel.vue'

import { quantity } from './calendar'
import mixin from './mixin'

const MONTH = {
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    zh: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一', '十二']
};

const PLACEHOLDER = {
    en: 'Select Date',
    zh: '选择日期'
}

let _d = new Date(), y = _d.getFullYear(), m = _d.getMonth() + 1, d = _d.getDate(), begin = y - y % 10, end = begin + 9;
export default {
    name: 'datepicker',
    mixins: [mixin],
    props: {
        value: {
            type: String | Object
        },
        lang: {
            type: String,
            default: 'en'
        },
        format: {
            type: String,
            default: 'YYYY/MM/DD' // YYYY-MM-DD YYYY/MM/DD YYYY~MM~DD YYYY.MM.DD
        },
        name: String
    },
    data() {
        return {
            open: false,
            val: this.value,
            year: undefined,
            month: undefined,
            date: undefined,
            range: begin + '~' + end,
            showRange: false,
            showYear: false,
            showMonth: false,
            DATE: undefined
        }
    },
    computed: {
        ymd() {
            return this.val ? this.format
                .replace('YYYY', this.year)
                .replace('MM', quantity(this.month))
                .replace('DD', quantity(this.date)) : ''
        },
        monthArr() {
            if('undefined' === typeof this.lang) return [];
            return ['en','zh'].indexOf(this.lang) > -1 ? MONTH[this.lang] : MONTH['en']
        },
        placeholder() {
            return ['en','zh'].indexOf(this.lang) > -1 ? PLACEHOLDER[this.lang] : PLACEHOLDER['en']
        }
    },
    created() {
        if(this.val) {
            if(typeof this.val === 'string') {
                let ymd = this.val.split('/');
                this.year = +ymd[0];
                this.month = +ymd[1];
                this.date = +ymd[2];
            } else {
                let { year, month, date } = this.val;
                this.year = year;
                this.month = month;
                this.date = date;
            }
        } else {
            this.year = y;
            this.month = m;
            this.date = d;
        }
        this.DATE = new Date(this.year, this.month - 1, this.date);
    },
    methods: {
        changeYearRange(obj) {
            this.year = obj.begin + (this.year % 10)
            this.showRange = false;
        },
        openRangePanel() {
            let b = this.year - this.year % 10, e = b + 9;
            if(this.showYear) {
                if(this.showRange) {
                    b = this.year - this.year % 100, e = b + 90;
                }
                this.showRange = true;
            } else {
                this.showYear = true;
            }
            this.range = b + '~' + e;
        },
        prev() {
            if(this.showYear) {
                if(this.showRange) {
                    this.year = this.year - 100;
                } else {
                    this.year = this.year - 10;
                }
                let begin = this.year - this.year % 10, end = begin + 9;
                this.range = begin + '~' + end;
            } else if(this.showMonth) {
                this.year--;
            } else {
                this.month = this.month - 1;
                if(this.month === 0) {
                    this.month = 12
                    this.year--;
                }
                this.$refs.dp.setCalendar(this.year, this.month);
                this.open = true;
            }
        },
        next() {
            if(this.showYear) {
                if(this.showRange) {
                    this.year = this.year + 100;
                } else {
                    this.year = this.year + 10;
                }
                let begin = this.year - this.year % 10, end = begin + 9;
                this.range = begin + '~' + end;
            } else if(this.showMonth) {
                this.year++;
            } else {
                this.month = this.month + 1;
                if(this.month === 13) {
                    this.month = 1;
                    this.year++;
                }
                this.$refs.dp.setCalendar(this.year, this.month);
                this.open = true;
            }
        },
        changeDate(d) {
            this.val = this.DATE.toLocaleDateString();
            this.$nextTick(() => {
                if(this.value && typeof this.value !== 'string') {
                    this.$emit('input', { year: this.year, month: this.month, date: this.date })
                    this.$emit('change', { year: this.year, month: this.month, date: this.date })
                } else {
                    this.$emit('input', this.ymd)
                    this.$emit('change', this.ymd)
                }
            });
            this.open = false;
        }
    },
    watch: {
        DATE(c) {
            this.date = c.getDate();
            this.month = c.getMonth() + 1;
            this.year = c.getFullYear();
        },
        year(c) {
            this.DATE.setFullYear(c);
        },
        month(c) {
            this.DATE.setMonth(c - 1);
        },
        date(c) {
            this.DATE.setDate(c);
        },
        value(c) {
            let dt = new Date(c)
            if(!!+dt && dt instanceof Date) {
                this.year = dt.getFullYear();
                this.month = dt.getMonth() + 1;
                this.date = dt.getDate();
                this.val = c;
            } else {
                this.val = c;
                let d = new Date();
                this.year = d.getFullYear();
                this.month = d.getMonth() + 1;
                this.date = d.getDate();
            }
        }
    },
    components: { Datepanel, Monthpanel, Yearpanel, Yearrangepanel }
}
</script>
<style lang="less" scoped>
::-webkit-input-placeholder {
    color: #ccc;
}
:-moz-placeholder {
    color: #ccc;
}
::-moz-placeholder {
    color: #ccc;
}

.drop-box {
    .picker-header {
        height: 30px;
        line-height: 32px;
        border-bottom: 1px solid #e1e1e1;
        display: flex;
        em {
            font-style: normal;
            // color: #4475E8;
            cursor: pointer;
        }
        > span {
            display: block;
            flex: 1;
            text-align: center;
            position: relative;
            &:nth-child(2) {
                flex: 5;
            }
        }
        .picker-icon {
            display: inline-block;
            width: 0;
            height: 0;
            border-top: 7px solid transparent;
            border-bottom: 7px solid transparent;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: auto;
            cursor: pointer;
            &:after {
                content: '';
                display: block;
                width: 0;
                height: 0;
                position: absolute;
                top: -8px;
                border-top: 8px solid transparent;
                border-bottom: 8px solid transparent;
                z-index: 1;
            }
            &.left {
                border-right: 7px solid #999;
                &:after {
                    right: -9px;
                    border-right: 8px solid white;
                }
            }
            &.right {
                border-left: 7px solid #999;
                &:after {
                    left: -9px;
                    border-left: 8px solid white;
                }
            }
        }
    }
}

.input {
    position: relative;
    border: 1px solid #999;
    width: 128px;
    cursor: pointer;
    &-text {
        line-height: 28px;
        height: 28px;
        width: 100px;
        border: none;
        cursor: pointer;
        &:focus, &:active, &:visited {
            box-shadow: none;
            outline: none;
            border: none;
        }
    }
    .picker-icon {
        position: absolute;
        right: 2px;
        top: 2px;
        display: block;
        width: 22px;
        height: 22px;
    }
}

.datepicker {
    position: relative;
}
.date-panel {
    padding: 10px;
    box-sizing: border-box;
}
.drop-box {
    position: absolute;
    margin-top: 2px;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
    background-color: #fff;
    z-index: 10;
}

.dropDown {
    &-enter-active,
    &-leave-active {
        transform-origin: 0 0;
        transform: scaleY(1);
        transition-property: all;
        transition-duration: .2s;
        transition-delay: 0s;
    }
    &-enter-active {
        transition-timing-function: cubic-bezier(.23, 1, .32, 1);
    }
    &-leave-active {
        transition-timing-function: cubic-bezier(.755, .05, .855, .06);
    }
    &-enter,
    &-appear,
    &-leave-to{
        opacity: 0;
        transform-origin: center top;
        transform: scaleY(.8);
    }
}
</style>