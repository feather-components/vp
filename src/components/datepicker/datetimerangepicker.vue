<template>
<div class="monthpicker">
    <div class="range-picker-input-wrap" @click="open = !open">
        <input type="text" readonly class="range-picker-input-text" :placeholder="placeholder[0]" :value="begin">
        <span class="div">-</span>
        <input type="text" readonly class="range-picker-input-text" :placeholder="placeholder[1]" :value="end">
        <span class="picker-icon">
            <svg t="1509440995295" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4681" xmlns:xlink="http://www.w3.org/1999/xlink" width="22" height="22">
                <path d="M358.2 436h-52c-14.4 0-26 11.6-26 26v52c0 14.2 11.6 26 26 26h52c14.4 0 26-11.8 26-26v-52c0-14.4-11.8-26-26-26zM358.2 616h-52c-14.4 0-26 11.6-26 26v52c0 14.2 11.6 26 26 26h52c14.4 0 26-11.8 26-26v-52c0-14.4-11.8-26-26-26zM538.2 436h-52c-14.4 0-26 11.6-26 26v52c0 14.2 11.6 26 26 26h52c14.4 0 26-11.8 26-26v-52c0-14.4-11.8-26-26-26zM538.2 616h-52c-14.4 0-26 11.6-26 26v52c0 14.2 11.6 26 26 26h52c14.4 0 26-11.8 26-26v-52c0-14.4-11.8-26-26-26zM718.2 540c14.4 0 26-11.8 26-26v-52c0-14.4-11.6-26-26-26h-52c-14.4 0-26 11.6-26 26v52c0 14.2 11.6 26 26 26h52zM816.2 738v-44c0-15.4-12.6-28-28-28s-28 12.6-28 28v72c0 15.4 12.6 28 28 28h72c15.4 0 28-12.6 28-28s-12.6-28-28-28h-44z" fill="#999" p-id="4682"></path>
                <path d="M898 623.8V344c0-79.2-64.8-144-144-144h-58V150c0-15.4-12.6-28-28-28s-28 12.6-28 28v50H388V150c0-15.4-12.6-28-28-28s-28 12.6-28 28v50h-58c-79.2 0-144 64.8-144 144v428c0 79.2 64.8 144 144 144h413.8c29 20.2 64.4 32 102.4 32 99.4 0 180-80.6 180-180 0.2-59-28.4-111.4-72.2-144.2zM635.6 860H274c-23.4 0-45.4-9.2-62.2-25.8C195.2 817.4 186 795.4 186 772V344c0-23.4 9.2-45.4 25.8-62.2 16.8-16.8 38.8-25.8 62.2-25.8h58v42c0 15.4 12.6 28 28 28s28-12.6 28-28v-42h252v42c0 15.4 12.6 28 28 28s28-12.6 28-28v-42h58c23.4 0 45.4 9.2 62.2 25.8 16.8 16.8 25.8 38.8 25.8 62.2v251.6c-16.4-5-33.8-7.6-51.6-7.6-99.4 0-180 80.6-180 180 0 33.6 9.2 65 25.2 92z m154.8 32c-68.4 0-124-55.6-124-124s55.6-124 124-124 124 55.6 124 124-55.8 124-124 124z" fill="#999" p-id="4683"></path>
            </svg>
        </span>
    </div>
    <transition name="dropDown">
    <div class="drop-box" v-if="open">
        <template v-if="!showTime">
            <div class="header-group">
                <div class="picker-header" v-for="(it, i) in 2">
                    <span><i class="picker-icon left" @click="flush(i, '/')"></i></span>
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
                    :hasTime="true"></daterangepanel>
            </div>
            <div class="footer">
                <span @click="showTime = !showTime">{{ lang === 'zh' ? '选择时间' : 'Select Time' }}</span><button @click="OK">{{ lang === 'zh' ? '确定' : 'OK' }}</button>
            </div>
        </template>
        <template v-else>
            <div class="header-group time">
                <div class="picker-header" v-for="(it, i) in 2">
                    <span>{{ title[i] }}</span>
                </div>
            </div>
            <div class="time-group">
                <div v-for="(it, i) in 2" :key="i">
                    <timpepanel v-model="time[i]" :hasSeconds="hasSeconds"></timpepanel>
                </div>
            </div>
            <div class="footer">
                <span @click="showTime = !showTime">{{ lang === 'zh' ? '选择日期' : 'Select Date' }}</span><button @click="OK">{{ lang === 'zh' ? '确定' : 'OK' }}</button>
            </div>
        </template>
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
import Timpepanel from './timepanel.vue'
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
    en: ['Begin DateTime', 'End DateTime'],
    zh: ['开始时间','结束时间']
}

export default {
    name: 'datetimerangepicker',
    mixins: [mixin],
    components: { Daterangepanel, Yearpanel, Monthpanel, Yearrangepanel, Timpepanel },
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
            default: 'YYYY/MM/DD hh:mm:ss'
        },
        hasSeconds: {
            type: Boolean,
            default: false
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
            showTime: false,
            range: new Array(2),
            year: new Array(2),
            month: new Array(2),
            time: new Array(2),
            open: false,
            show: false,
            dtFormat: this.hasSeconds ? this.format : this.format.replace(':ss', '')
        }
    },
    computed: {
        begin() {
            if(typeof this.val[0] !== 'string') return '';
            let date = this.val[0].split(' '), b = date[0].split('/'), time = this.time[0], h = time.getHours(), m = time.getMinutes(), s = time.getSeconds();
            return this.dtFormat
                .replace('YYYY', b[0])
                .replace('MM', quantity(+b[1]) || '00')
                .replace('DD', quantity(+b[2]) || '00')
                .replace('hh', quantity(h) || '00')
                .replace('mm', quantity(m) || '00')
                .replace('ss', quantity(s) || '00');
        },
        end() {
            if(typeof this.val[1] !== 'string') return '';
            let et = this.val[1].split(' '), e = et[0].split('/'), time = this.time[1], h = time.getHours(), m = time.getMinutes(), s = time.getSeconds();
            return this.dtFormat
                .replace('YYYY', e[0])
                .replace('MM', quantity(+e[1]) || '00')
                .replace('DD', quantity(+e[2]) || '00')
                .replace('hh', quantity(h) || '00')
                .replace('mm', quantity(m) || '00')
                .replace('ss', quantity(s) || '00');
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
                if(this.showTime && this.val[i]) {
                    tits[i] = this.monthArr[month] + ' ' + this.val[i].split(' ')[0].split('/').pop() + ' ' + year
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
            let val = [], time = [];
            c instanceof Array && c.forEach((d, i) => {
                val[i] = d instanceof Date ? d.toLocaleDateString() : d.split(' ')[0];
                time[i] = d instanceof Date ? d : new Date(d);
            });
            this.val = val;
            if(c.length == 0) {
                let sy = year, ey = year + parseInt((month + 2) / 12),
                    sm = month + 1, em = (month + 2) % 12,
                    sr = (sy - sy % 10) + '~' + (sy - sy % 10 + 9),
                    er = (ey - ey % 10) + '~' + (ey - ey % 10 + 9);
                this.year = [sy, ey];
                this.month = [sm, em];
                this.range = [sr, er];
                this.hour = [0, 0];
                this.minute = [0, 0];
                this.second = [0, 0];
                this.beginMonth = sy + '/' + sm;
                this.endMonth = ey + '/' + em;
                this.time = [new Date(sy, sm - 1, date, 0, 0, 0), new Date(ey, em - 1, date, 0, 0, 0)];
            } else {
                let s = new Date(val[0]), e = new Date(val[1]),
                    sy = s.getFullYear(), ey = e.getFullYear(),
                    sm = s.getMonth() + 1, em = e.getMonth() + 1,
                    sr = (sy - sy % 10) + '~' + (sy - sy % 10 + 9),
                    er = (ey - ey % 10) + '~' + (ey - ey % 10 + 9),
                    sh = s.getHours(), eh = e.getHours(),
                    smm = s.getMinutes(), emm = e.getMinutes(),
                    ss = s.getSeconds(), es = e.getSeconds();
                this.year = [sy, ey];
                this.month = [sm, em];
                this.range = [sr, er];
                this.hour = [sh, eh];
                this.minute = [smm, emm];
                this.second = [ss, es];
                this.beginMonth = sy + '/' + sm;
                this.endMonth = ey + '/' + em;
                this.time = time;
            }
        },
        month(c) {
            this.$nextTick(() => {
                this.beginMonth = this.year[0] + '/' + this.month[0];
                this.endMonth = this.year[1] + '/' + this.month[1];
            })
        },
        open() {
            this.showTime = false;
        }
    },
    methods: {
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
        },
        OK() {
            let time = this.time.map(t => t.toTimeString().split(' ')[0]);
            let val = this.val.map((d, i) => {
                return d.split(' ')[0] + ' ' + time[i]
            });
            this.$emit('input', val);
            this.$emit('change', val);
            this.showTime = false;
            this.open = false;
        }
    },
    created() {
        let begin, end;
        this.val = this.value || new Array(2);
        if(this.val instanceof Array && this.val.length === 2 && this.val[0] && this.val[1]) {
            begin = new Date(this.val[0]);
            end = new Date(this.val[1]);
            this.year = [begin.getFullYear(), end.getFullYear()];
            this.month = [begin.getMonth() + 1, end.getMonth() + 1];
            this.time = [begin, end];
        } else {
            this.month = [d.getMonth() + 1, (d.getMonth() + 1) % 12 + 1];
            this.year = [d.getFullYear(), d.getFullYear() + parseInt((d.getMonth() + 1) / 12)];
            this.time = [new Date(d.toLocaleDateString() + ' 00:00:00'), new Date(d.toLocaleDateString() + ' 00:00:00')];
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

.range-picker-input-text{
    width: 125px;
    border: 0;
    outline: none;
    cursor: pointer;
}

.range-picker-input-text:focus{
    border: 0;
}

.range-picker-input-wrap {
    position: relative;
    border: 1px solid #999;
    width: 295px;
    cursor: pointer;
    &-text {
        line-height: 28px;
        height: 28px;
        width: 120px;
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


.drop-box {
    .body-group {
        position: relative;
    }
    .header-group {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #e1e1e1;
        &.time .picker-header:first-child {
            border-right: 1px solid #e1e1e1;
        }
        > div {
            width: 216px;
        }
    }
    .panel-group {
        position: absolute;
        height: 196px;
        z-index: 20;
        display: table;
        justify-content: space-between;
        font-size: 12px;
        > div {
            display: table-cell;
            width: 50%;
            &.line-right {
                border-right: 1px solid #e1e1e1;
            }
            &.line-left {
                border-left: 1px solid #e1e1e1;
            }
        }
    }
    .time-group {
        display: flex;
        > div {
            flex: 1;
            font-size: 12px;
            &:first-child {
                border-right: 1px solid #e1e1e1;
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