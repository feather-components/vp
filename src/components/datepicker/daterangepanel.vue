<template>
<div class="date-range">
    <div class="date" v-for="(cal, ii) in cals">
        <div class="date-days">
            <div v-for="day in days">{{ day }}</div>
        </div>
        <div class="date-list">
            <div class="date-list-items" v-for="(dates, i) in cal">
                <template v-for="(date, j) in dates">
                    <div v-if="showSimple"
                        :class="{ 
                            'simple-date': date.currentMonth,
                            'active': date.active || (!value && isToday(date) && !hasChecked) && date.currentMonth,
                            'today': isToday(date),
                            'range-cell': date.hover && !date.active,
                            'disabled': date.disabled
                        }"
                        @click="selectDate(date, ii)"><em>{{ date.currentMonth && date.date }}</em></div>
                    <div v-else
                        class="normal-date"
                        :class="{
                            'current-month': date.currentMonth,
                            'active': date.active || (!value && isToday(date) && !hasChecked),
                            'today': isToday(date),
                            'range-cell': date.hover && !date.active,
                            'disabled': date.disabled
                        }"
                        @click="selectDate(date, ii)"
                        @mouseenter="hoverDate(date)"><em>{{ date.date }}</em></div>
                </template>
            </div>
        </div>
    </div>
</div>
</template>
<script>

import { calendar, select2Range } from './calendar.js'

const langArr = {
    en: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    zh: ['日', '一', '二', '三', '四', '五', '六']
}

let d = new Date(),
    year = d.getFullYear(),
    month = d.getMonth(),
    date = d.getDate(),
    hour = d.getHours(),
    minute = d.getMinutes(),
    second = d.getSeconds();

export default {
    name: 'daterangepanel',
    props: {
        value: {
            type: Array | Object,
            default: () => [d.toLocalDateString(), d.toLocaleString()]
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
        }
    },
    data() {
        return {
            cals: [],
            tempCal: [],
            cal1: undefined,
            cal2: undefined,
            hasChecked: false,
            curDate: undefined,
            beginDate: undefined,
            endDate: undefined,
            prev: undefined,
            next: undefined
        }
    },
    computed: {
        days() {
            return langArr[this.lang] || langArr['en']
        },
        now() {
            let td = new Date(this.today), cdate = td instanceof Date ? td : new Date();
            return cdate;
        }
    },
    methods: {
        selectDate(date, index) {
            if(!date.currentMonth) return ;
            this.hasChecked = true;
            this.setActiveDate(date)
        },
        setActiveDate(obj) {
            if(obj.disabled) return;
            // 设置第一次、第二次点击的日期
            if(this.endDate) {
                this.cals.forEach(cal => {
                    cal.forEach(dates => {
                        dates.forEach(date => {
                            date.active = false;
                            date.hover = false;
                        })
                    })
                });
                this.beginDate = obj;
                this.endDate = undefined;
            } else if(this.beginDate) {
                this.endDate = obj;
                let begin = +new Date(this.beginDate.year, this.beginDate.month - 1, this.beginDate.date),
                    end = +new Date(this.endDate.year, this.endDate.month - 1, this.endDate.date);
                if(begin > end) {
                    [this.beginDate, this.endDate] = [this.endDate, this.beginDate];
                }

                let min, max, outMin, outMax, val = this.value, b = this.beginDate, e = this.endDate;
                if(!!val && val instanceof Array) {
                    min = val[0], max = val[1];
                    if(typeof min === 'string') {
                        outMin = b.year + '/' + b.month + '/' + b.date;
                    } else {
                        outMin = new Date(b.year, b.month - 1, b.date).toLocaleDateString();
                    }
                    if(typeof max === 'string') {
                        outMax = e.year + '/' + e.month + '/' + e.date;
                    } else {
                        outMax = new Date(e.year, e.month - 1, e.date).toLocaleDateString();
                    }
                }
                this.$emit('input', [outMin, outMax]);
                this.$emit('change', [outMin, outMax]);
            } else {
                this.clearActives();
                this.beginDate = obj;
            }

            obj.active = true; //直接激活当前日期
            this.setDuring(this.beginDate, this.endDate);
        },
        setDuring(begin, end, def) {
            //设置两个日期间的过渡区间
            if(begin && end) {
                let prev = +new Date(begin.year, begin.month - 1, begin.date, 0, 0, 0),
                next = +new Date(end.year, end.month - 1, end.date, 0, 0, 0);
                if(prev > next) {
                    [begin, end] = [end, begin];
                }
                this.cals.forEach(cal => {
                    cal.forEach(dates => {
                        dates.forEach(date => {
                            let cur = +new Date(date.year, date.month - 1, date.date);
                            date.hover = cur >= prev && cur <= next && date.currentMonth
                            if(def && date.currentMonth) {
                                date.active = cur === prev || cur === next;
                            }
                        })
                    })
                });
            }
        },
        clearActives() { //清除所有选中与区间
            this.cals.forEach(cal => {
                cal.forEach(dates => {
                    dates.forEach(date => {
                        date.active = false;
                        date.hover = false;
                    })
                })
            })
        },
        hoverDate(obj) {
            if(obj.disabled) return ;
            if(this.beginDate && !this.endDate) {
                const cals = [...this.cals];
                let begin = +new Date(this.beginDate.year, this.beginDate.month - 1, this.beginDate.date),
                    hover = +new Date(obj.year, obj.month - 1, obj.date);
                if(begin > hover) {
                    [begin, hover] = [hover, begin];
                }
                cals.forEach(cal => {
                    cal.forEach(dates => {
                        dates.forEach(date => {
                            let cur = +new Date(date.year, date.month - 1, date.date);
                            date.hover = date.currentMonth && (date.month === this.beginDate.month || date.month === obj.month) && cur >= begin && cur <= hover
                        })
                    })
                });
                this.cals = cals;
            }
        },
        isToday(dateObj) {
            return dateObj.currentMonth && dateObj.date === this.now.getDate() &&
                this.now.getMonth() + 1 === dateObj.month &&
                this.now.getFullYear() === dateObj.year;
        },
        setCalendar(prev, next) {
            const pd = new Date(prev || this.prevMonth), nd = new Date(next || this.nextMonth);
            let pdY = pd.getFullYear(), pdM = pd.getMonth(), ndY = nd.getFullYear(), ndM = nd.getMonth();
            this.cal1 = calendar(pdY, pdM);
            this.cal2 = calendar(ndY, ndM);
            this.cals = [this.cal1, this.cal2];
        },
        setValidRange() { //设置可选范围
            if(!(this.validRange instanceof Array)) return;
            const rg = this.validRange;
            let min = rg[0], max = rg[1], b, e;
            b = min instanceof Date ? min : new Date(rg[0].split(' ')[0] + ' 00:00:00');
            e = max instanceof Date ? max : new Date(rg[1].split(' ')[0]  + ' 00:00:00');
            let vp = +b,
                vn = +e;
            this.cals.forEach((cal, index) => {
                cal.forEach(dates => {
                    dates.forEach(date => {
                        let d = +new Date(date.year, date.month - 1, date.date);
                        date.disabled = d < vp || d > vn;
                    })
                })
            });
        },
        setSelectRange(range) {
            let rg = range || this.value;
            if(!rg || typeof rg === 'string' || !(rg instanceof Array) && !rg[0] && !rg[1]) return;
            rg = rg.map(it => typeof it === 'string' ? it.split(' ')[0] : it);
            let min = rg[0], max = rg[1], b, e, begin, end;
            b = min instanceof Date ? min : new Date(rg[0] + ' 00:00:00');
            e = max instanceof Date ? max : new Date(rg[1] + ' 00:00:00');
            begin = { year: b.getFullYear(), month: b.getMonth() + 1, date: b.getDate() };
            end = { year: e.getFullYear(), month: e.getMonth() + 1, date: e.getDate() };
            this.setDuring(begin, end, true);
        }
    },
    created() {
        this.setCalendar();
        this.setValidRange();
        this.setSelectRange();
    },
    watch: {
        prevMonth(c) {
            this.setCalendar(c);
            this.setValidRange();
        },
        nextMonth(c) {
            this.setCalendar(undefined, c);
            this.setValidRange();
        },
        value(c) {
            this.setSelectRange(c);
        }
    }
}
</script>
<style lang="less" scoped>
.date-range {
    width: 432px;
    display: flex;
    justify-content: space-between;
}
.date {
    font-size: 12px;
    width: 216px;
    color: #333;
    padding: 0 10px;
    vertical-align: top;
    box-sizing: border-box;
    &-days {
        display: flex;
        color: #666;
        > div {
            flex: 1;
            text-align: center;
            margin: 4px;
            height: 20px;
            line-height: 20px;
            &:first-child {
                color: #FF6E40;
            }
        }
    }
    &-list {
        &-items {
            display: flex;
            > div {
                color: #999;
                height: 18px;
                width: 18px;
                line-height: 18px;
                flex: 1;
                text-align: center;
                margin: 4px;
                border: 1px solid transparent;
                border-radius: 2px;
                transition: all .2s;
                &.range-cell {
                    border-radius: 0;
                    position: relative;
                    &:before {
                        content: "";
                        display: block;
                        background: #ecf6fd;
                        border-radius: 0;
                        border: 0;
                        position: absolute;
                        top: -1px;
                        bottom: -1px;
                        left: -4px;
                        right: -4px;
                        z-index: 1;
                        width: 100%;
                        height: 100%;
                        padding: 1px 5px;
                    }
                    &.active em {
                        color: #333 !important;
                    }
                }
                &:first-child, &:first-child.current-month, &:first-child.simple-date {
                    color: #FF6E40;
                }
                &.normal-date,
                &.simple-date {
                    text-align: center;
                    cursor: default;
                }
                &.current-month {
                    &.normal-date,
                    &.simple-date {
                        cursor: pointer;
                    }
                }
                &.current-month,
                &.simple-date {
                    color: #333;
                }
                &.normal-date.current-month:hover,
                &.simple-date.current-month:hover {
                    border-color: #4475E8;
                    color: #4475E8;
                }
                &.today {
                    border-color: #4475E8;
                    color: #4475E8;
                    em {
                        color: #4475E8;
                    }
                    &.disabled {
                        border-color: #ccc;
                    }
                }
                &.active {
                    color: #fff;
                    background-color: #4475E8;
                    em {
                        color: #fff !important;
                    }
                }
                &.disabled {
                    background-color: transparent;
                    cursor: default !important;
                    &.current-month:hover {
                        border-color: transparent;
                        color: #ccc;
                    }
                    &.today:hover {
                        border-color: #ccc;
                    }
                    &.active em {
                        color: #ccc !important;
                    }
                    em {
                        color: #ccc !important;
                    }
                }
                em {
                    font-style: normal;
                    position: relative;
                    z-index: 2;
                }
            }
        }
    }
}
</style>