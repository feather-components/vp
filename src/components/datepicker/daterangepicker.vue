<template>
<div class="monthpicker">
    <div class="input" @click="open = !open">
        <input type="text" readonly class="input-text" :placeholder="placeholder[0]" :value="begin">
        <span class="div">-</span>
        <input type="text" readonly class="input-text" :placeholder="placeholder[1]" :value="end">
        <span class="picker-icon">
            <svg t="1509440982605" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4562" xmlns:xlink="http://www.w3.org/1999/xlink" width="22" height="22">
                <path d="M752 198.2h-58v-50c0-15.4-12.6-28-28-28s-28 12.6-28 28v50H386v-50c0-15.4-12.6-28-28-28s-28 12.6-28 28v50h-58c-79.2 0-144 64.8-144 144v428c0 79.2 64.8 144 144 144h480c79.2 0 144-64.8 144-144v-428c0-79.2-64.8-144-144-144z m88 572c0 23.4-9.2 45.4-25.8 62.2-16.8 16.8-38.8 25.8-62.2 25.8H272c-23.4 0-45.4-9.2-62.2-25.8S184 793.6 184 770.2v-428c0-23.4 9.2-45.4 25.8-62.2 16.8-16.8 38.8-25.8 62.2-25.8h58v42c0 15.4 12.6 28 28 28s28-12.6 28-28v-42h252v42c0 15.4 12.6 28 28 28s28-12.6 28-28v-42h58c23.4 0 45.4 9.2 62.2 25.8 16.8 16.8 25.8 38.8 25.8 62.2v428z" fill="#999" p-id="4563"></path>
                <path d="M358 436.2h-52c-14.2 0-26 11.6-26 26v52c0 14.4 11.8 26 26 26h52c14.4 0 26-11.6 26-26v-52c0-14.4-11.6-26-26-26zM358 616.2h-52c-14.2 0-26 11.6-26 26v52c0 14.4 11.8 26 26 26h52c14.4 0 26-11.6 26-26v-52c0-14.4-11.6-26-26-26zM538 436.2h-52c-14.2 0-26 11.6-26 26v52c0 14.4 11.8 26 26 26h52c14.4 0 26-11.6 26-26v-52c0-14.4-11.6-26-26-26zM538 616.2h-52c-14.2 0-26 11.6-26 26v52c0 14.4 11.8 26 26 26h52c14.4 0 26-11.6 26-26v-52c0-14.4-11.6-26-26-26zM718 436.2h-52c-14.2 0-26 11.6-26 26v52c0 14.4 11.8 26 26 26h52c14.4 0 26-11.6 26-26v-52c0-14.4-11.6-26-26-26zM718 616.2h-52c-14.2 0-26 11.6-26 26v52c0 14.4 11.8 26 26 26h52c14.4 0 26-11.6 26-26v-52c0-14.4-11.6-26-26-26z" fill="#999" p-id="4564"></path>
            </svg>
        </span>
    </div>
    <transition name="dropDown">
    <div class="drop-box" v-if="open">
        <div class="header-group">
            <div class="picker-header" v-for="(it, i) in 2">
                <span><i class="picker-icon left" @click="flush(i, '-')"></i></span>
                <span @click="changePanel(i)"><em>{{ title[i] }}</em></span>
                <span><i class="picker-icon right" @click="flush(i, '+')"></i></span>
            </div>
        </div>
        <div class="body-group">
            <div class="panel-group">
                <div v-for="(it,i) in 2" :class="line(i)">
                    <yearrangepanel v-model="range[i]" v-if="showRange[i]" @change="checkPanel(3, i)" class="panel"></yearrangepanel>
                    <yearpanel v-model="year[i]" v-else-if="showYear[i]" @change="checkPanel(2, i)" class="panel"></yearpanel>
                    <monthpanel v-model="month[i]" v-else-if="showMonth[i]" @change="checkPanel(1, i)" class="panel" :lang="lang"></monthpanel>
                </div>
            </div>
            <daterangepanel
                v-model="val"
                :showSimple="showSimple"
                :prevMonth="beginMonth"
                :nextMonth="endMonth"
                :validRange="validRange"
                :lang="lang"
                @change="change"></daterangepanel>
        </div>
    </div>
    </transition>
</div>
</div>
</template>
<script>
import Daterangepanel from './daterangepanel.vue'
import Yearrangepanel from './yearrangepanel.vue'
import Yearpanel from './yearpanel.vue'
import Monthpanel from './monthpanel.vue'
import { quantity } from './calendar'

import mixin from './mixin'

let d = new Date(),
    year = d.getFullYear(),
    month = d.getMonth(),
    date = d.getDate(),
    hour = d.getHours(),
    minute = d.getMinutes(),
    second = d.getSeconds();

const MONTH = {
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    zh: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一', '十二']
};

const PLACEHOLDER = {
    en: ['Begin Date', 'End Date'],
    zh: ['开始日期','结束日期']
}

export default {
    name: 'daterangepicker',
    mixins: [mixin],
    components: { Daterangepanel, Yearpanel, Monthpanel, Yearrangepanel },
    props: {
        value: {
            type: Array | Object
        },
        prevMonth: {
            type: String | Date,
            default: year + '/' + (month + 1)
        },
        nextMonth: {
            type: String | Date,
            default: (parseInt((month + 1) / 12) + year) + '/' + ((month + 1) % 12 + 1)
        },
        today: {
            type: String | Date,
            default: () => d
        },
        lang: {
            type: String,
            default: 'en' // en zh
        },
        showSimple: {
            type: Boolean,
            default: false
        },
        validRange: {
            type: String | Array
        },
        format: {
            type: String,
            default: 'YYYY/MM/DD'
        }
    },
    data() {
        return {
            beginMonth: this.prevMonth,
            endMonth: this.nextMonth,
            val: new Array(2),
            showRange: [false, false],
            showYear: [false, false],
            showMonth: [false, false],
            range: new Array(2),
            year: new Array(2),
            month: new Array(2),
            open: false,
            show: false
        }
    },
    computed: {
        begin() {
            let b;
            if(this.val[0] instanceof Date) {
                b = this.val[0].toLocaleDateString().split('/');
            } else if(typeof this.val[0] === 'string') {
                b = this.val[0].split('/');
            }
            return b ? this.format.replace('YYYY', b[0]).replace('MM', quantity(b[1])).replace('DD', quantity(b[2])) : '';
        },
        end() {
            let e;
            if(this.val[1] instanceof Date) {
                e = this.val[1].toLocaleDateString().split('/');
            } else if(typeof this.val[1] === 'string') {
                e = this.val[1].split('/');
            }
            return e ? this.format.replace('YYYY', e[0]).replace('MM', quantity(e[1])).replace('DD', quantity(e[2])) : '';
        },
        monthArr() {
            if('undefined' === typeof this.lang) return [];
            return ['en','zh'].indexOf(this.lang) > -1 ? MONTH[this.lang] : MONTH['en']
        },
        title() {
            let tits = new Array(2);
            for(let i = 0; i < 2; i++) {
                let year = this.year[i], month = this.month[i] - 1, range = this.range[i];
                if(this.showRange[i] || this.showYear[i]) {
                    tits[i] = range;
                } else if(this.showMonth[i]) {
                    tits[i] = year;
                } else {
                    tits[i] = (this.monthArr[month] + ' ') + year
                }
            }
            return tits;
        },
        placeholder() {
            return ['en','zh'].indexOf(this.lang) > -1 ? PLACEHOLDER[this.lang] : PLACEHOLDER['en'];
        }
    },
    watch: {
        value(c) {
            if(!(c instanceof Array)) return ;
            let st = new Date(c[0]), et = new Date(c[1]);
            if(!!+st && !!+et && st instanceof Date && et instanceof Date) {
                this.$nextTick(() => {
                    this.val = c;
                    let stY = st.getFullYear(), stM = st.getMonth() + 1, etY = et.getFullYear(), etM = et.getMonth() + 1, stR = (stY - stY % 10) + '~' + (stY - stY % 10 + 9), etR = (etY - etY % 10) + '~' + (etY - etY % 10 + 9)
                    this.beginMonth = stY + '/' + stM;
                    this.endMonth = etY + '/' + etM;
                    this.year = [stY, etY];
                    this.month = [stM, etM];
                    this.range = [stR, etR];
                })
            } else {
                this.$nextTick(() => {
                    this.val = c;
                    let sy = year, ey = sy + parseInt((month + 2) / 12),
                        sm = month + 1, em = (month + 2) % 12,
                        sr = (sy - sy % 10) + '~' + (sy - sy % 10 + 9),
                        er = (ey - ey % 10) + '~' + (ey - ey % 10 + 9);
                    this.beginMonth = sy + '/' + sm;
                    this.endMonth = ey + '/' + em;
                    this.year = [sy, ey];
                    this.month = [sm, em];
                    this.range = [sr, er];
                })
            }
        },
        val(c) {
            this.$emit('input', c);
        },
        month(c) {
            this.$nextTick(() => {
                this.beginMonth = this.year[0] + '/' + this.month[0];
                this.endMonth = this.year[1] + '/' + this.month[1];
            })
        }
    },
    methods: {
        change() {
            this.$emit('change', this.val);
            setTimeout(() => {
                this.open = false;
            }, 0)
        },
        flush(index, operator) {
            let arr = [];
            if(this.showRange[index]) { //世纪
                arr = [...this.range];
                let rg = +arr[index].split('~')[0], year = parseInt(rg / 100) * 100;
                if(operator === '+') {
                    year += 100;
                } else {
                    year -= 100;
                }
                arr.splice(index, 1, year + '~' + (year + 99));
                this.range = arr;
            } else if(this.showYear[index]) { //年
                arr = [...this.year];
                let year = arr[index];
                if(operator === '+') {
                    year += 10;
                } else {
                    year -= 10;
                }
                let rg = [...this.range], unit = year - year % 10;
                arr.splice(index, 1, year);
                rg.splice(index, 1, unit + '~' + (unit + 9))
                this.year = arr;
                this.range = rg;
            } else if(this.showMonth[index]) { //月
                arr = [...this.year];
                let year = arr[index];
                if(operator === '+') {
                    year += 1;
                } else {
                    year -= 1;
                }
                arr.splice(index, 1, year);
                this.year = arr;
            } else { //日
                arr = [...this.month];
                let month = arr[index], yr = [...this.year], year = yr[index];
                if(operator === '+') {
                    if(month > 11) {
                        month = 1;
                        year++;
                    } else {
                        month += 1;
                    }
                } else {
                    if(month < 2) {
                        month = 12;
                        year--;
                    } else {
                        month -= 1;
                    }
                }
                arr.splice(index, 1, month);
                yr.splice(index, 1, year);
                this.month = arr;
                this.year = yr;
            }
        },
        changePanel(index) {
            let arr = [];
            this.show = true;
            if(this.showRange[index]) {
                return ;
            } else if(this.showYear[index]) {
                arr = [...this.showRange];
                arr[index] = !arr[index];
                this.showRange = arr;
            } else if(this.showMonth[index]) {
                arr = [...this.showYear];
                arr[index] = !arr[index];
                this.showYear = arr;
            } else {
                arr = [...this.showMonth];
                arr[index] = !arr[index];
                this.showMonth = arr;
            }
        },
        checkPanel(pid, index) {
            let arr = [];
            switch(pid) {
                case 1:
                    arr = [...this.showMonth];
                    arr[index] = false;
                    this.showMonth = arr;
                    break;
                case 2:
                    arr = [...this.showYear];
                    arr[index] = false;
                    this.showYear = arr;
                    break;
                case 3:
                    arr = [...this.showRange];
                    arr[index] = false;
                    this.showRange = arr;
                    this.$nextTick(() => {
                        let mod = this.year[index] % 10,
                            arr = [...this.year],
                            year = +this.range[index].split('~')[0] + mod;
                        arr.splice(index, 1, year);
                        this.year = arr;
                    })
                    break;
                default: break;
            }
        },
        line(index) {
            let flag = new Array(2);
            for(let i = 0; i < 2; i++) {
                flag[i] = this.showMonth[i] | this.showYear[i] | this.showRange[i];
            }
            if(flag[0]) {
                return 'line-right'
            } else if(!flag[0] && flag[1]) {
                return 'line-left'
            } else {
                return ''
            }
        }
    },
    created() {
        let begin, end;
        this.val = (this.value instanceof Array && this.value.length) ? this.value : new Array(2);
        if(this.val instanceof Array && this.val.length === 2 && this.val[0] && this.val[1]) {
            begin = new Date(this.val[0]);
            end = new Date(this.val[1]);
            this.year = [begin.getFullYear(), end.getFullYear()];
            this.month = [begin.getMonth() + 1, end.getMonth() + 1];
        } else {
            this.month = [d.getMonth() + 1, (d.getMonth() + 1) % 12 + 1];
            this.year = [d.getFullYear(), d.getFullYear() + parseInt((d.getMonth() + 1) / 12)];
        }
        this.year.forEach((yr, i) => {
            this.range[i] = (yr - yr % 10) + '~' + (yr - yr % 10 + 9);
        });
        this.beginMonth = this.year[0] + '/' + this.month[0];
        this.endMonth = this.year[1] + '/' + this.month[1];
    }
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
    .body-group {
        position: relative;
    }
    .header-group {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #e1e1e1;
        > div {
            width: 206px;
        }
    }
    .panel-group {
        position: absolute;
        height: 196px;
        z-index: 20;
        display: table;
        justify-content: space-between;
        > div {
            display: table-cell;
            width: 50%;
            box-sizing: border-box;
            &.line-right {
                border-right: 1px solid #e1e1e1;
            }
            &.line-left {
                border-left: 1px solid #e1e1e1;
            }
        }
    }
    .panel {
        background-color: #fff;
        height: 100%;
    }
    .picker-header {
        height: 30px;
        line-height: 32px;
        display: flex;
        em {
            font-style: normal;
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
    width: 196px;
    cursor: pointer;
    &-text {
        line-height: 28px;
        height: 28px;
        width: 72px;
        border: none;
        cursor: pointer;
        display: inline-block;
        margin-right: 0;
        &:focus, &:active, &:visited {
            box-shadow: none;
            outline: none;
            border: none;
        }
    }
    .div {
        display: inline-block;
        height: 28px;
        line-height: 28px;
        text-align: center;
        padding: 0 5px;
    }
    .picker-icon {
        vertical-align: bottom;
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

.footer {
    text-align: right;
    padding: 10px 15px;
    border-top: 1px solid #e1e1e1;
    span {
        margin-right: 10px;
        color: #4475E8;
        cursor: pointer;
    }
    button {
        color: #fff;
        width: 40px;
        height: 24px;
        border: none;
        border-radius: 2px;
        background-color: #4475E8;
        cursor: pointer;
    }
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