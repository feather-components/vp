<template>
<div class="date">
    <div class="date-days">
        <div v-for="day in days">{{ day }}</div>
    </div>
    <div class="date-list">
        <div class="date-list-items" v-for="(dates, i) in calendarData">
            <template v-for="(date, j) in dates">
                <div v-if="showSimple"
                    :class="{ 
                        'simple-date': date.currentMonth,
                        'active': date.active || (isToday(date) && !hasChecked) && date.currentMonth,
                        'today': isToday(date)
                    }"
                    @click="selectDate(date)">{{ date.currentMonth && date.date }}</div>
                <div v-else
                    class="normal-date"
                    :class="{
                        'current-month': date.currentMonth,
                        'active': date.active || (isToday(date) && !hasChecked),
                        'today': isToday(date),
                        'range-cell': date.hover && !date.active
                    }"
                    @click="selectDate(date)"
                    @mouseenter="hoverDate(date)"><em>{{ date.date }}</em></div>
            </template>
        </div>
    </div>
</div>
</template>
<script>

import { calendar } from './calendar.js'

const langArr = {
    en: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    zh: ['日', '一', '二', '三', '四', '五', '六']
}

export default {
    name: 'datepanel',
    props: {
        value: {
            type: Date | String,
            default: () => new Date
        },
        today: {
            type: String | Date,
            default: () => new Date
        },
        lang: {
            type: String,
            default: 'en' // en zh
        },
        showSimple: {
            type: Boolean,
            default: false
        },
        year: {
            type: Number | String
        },
        month: {
            type: Number | String
        },
        selectRange: {
            type: String | Array
        }
    },
    data() {
        return {
            val: this.value ? new Date(this.value) : new Date(),
            selectPoints: {},
            calendarData: [],
            prevPos: [],
            curDate: undefined,
            hasChecked: false, //判断是否选择过日历
        }
    },
    computed: {
        days() {
            return langArr[this.lang] || langArr['en']
        },
        curYear(){
            return  this.year || this.val.getFullYear()
        },
        curMonth(){
            return this.month || (this.val.getMonth() + 1)
        },
        now() {
            let td = new Date(this.today), cdate = td instanceof Date ? td : new Date();
            return cdate;
        }
    },
    methods: {
        selectDate(dateObj) {
            if(this.showSimple && !dateObj.currentMonth) return ;
            !this.hasChecked && (this.hasChecked = true);
            if(this.selectRange) {
                this.setRangeAnchor(dateObj);
            } else {
                this.setActiveDate(dateObj);
                let d = this.val, h = d.getHours(), m = d.getMinutes(), s = d.getSeconds();
                let { year, month, date } = dateObj;
                this.$emit('input', new Date(year, month - 1, date, h, m, s));
                this.$emit('change', dateObj);
            }
        },
        setActiveDate(obj) {
            let { year, month, date } = obj;
            let i = 0, j = 0;
            let pp = this.prevPos;
            pp.length && (this.calendarData[pp[0]][pp[1]].active = false);
            this.calendarData.forEach((item, ii) => {
                item.forEach((st, jj) => {
                    if(st.year === year && st.month === month && st.date === date) {
                        i = ii;
                        j = jj;
                    }
                })
            });
            this.prevPos = [i,j];
            this.calendarData[i][j].active = true;
            this.curDate = this.calendarData[i][j].date;
        },
        setRangeAnchor(obj) {
            let start = this.selectPoints.startPoint, stop = this.selectPoints.stopPoint;
            if(!obj.currentMonth) return ;
            if(start && stop && start.date > stop.date) {
                [start, stop] = [stop, start];
                this.calendarData.forEach(item => {
                    item.forEach(sItem => {
                        sItem.hover = false;
                    })
                })
            }
            if(start && stop) {
                this.calendarData.forEach(item => {
                    item.forEach(sItem => {
                        if(stop.date === sItem.date || start.date === sItem.date) {
                            sItem.active = false;
                        }
                    })
                })
                obj.active = true;
                this.selectPoints.startPoint = start = obj;
                this.selectPoints.stopPoint = stop = undefined;
            } else {
                if(!start) {
                    obj.active = true;
                    this.selectPoints.startPoint = start = obj;
                } else {
                    if(stop) {
                        this.calendarData.forEach(item => {
                            item.forEach(sItem => {
                                if(stop.date === sItem.date) {
                                    sItem.active = false;
                                }
                            })
                        })
                    }
                    obj.active = true;
                    this.selectPoints.stopPoint = stop = obj;
                }

            }
            
            this.selectPoints.startPoint = start;
            this.selectPoints.stopPoint = stop;
        },
        hoverDate(obj) {
            let start = this.selectPoints.startPoint, stop = this.selectPoints.stopPoint, calendar = [...this.calendarData];
            if(stop) return ;
            if(start) {
                calendar.forEach(item => {
                    item.forEach(sItem => {
                        if(this.compareItem(obj,start)) {
                            sItem.hover = this.compareItem(sItem,start) && this.compareItem(obj, sItem) && sItem.currentMonth;
                        } else {
                            sItem.hover = this.compareItem(start,sItem) && this.compareItem(sItem, obj) && sItem.currentMonth;
                        }
                    })
                })
                this.calendarData = calendar;
            }
        },
        compareItem(o1,o2) {
            let d1 = new Date(o1.year, o1.month - 1, o1.date), d2 = new Date(o2.year, o2.month - 1, o2.date);
            return d1.getTime() - d2.getTime() >= 0
        },
        isToday(dateObj) {
            return dateObj.date === this.now.getDate() &&
                this.now.getMonth() + 1 === dateObj.month &&
                this.now.getFullYear() === dateObj.year;
        },
        setCalendar(year, month) {
            this.calendarData = calendar(year, month - 1);
            this.selectDate({ year, month, date: this.curDate }, true);
        }
    },
    created() {
        this.curDate = this.val.getDate() || this.now.getDate();
        this.calendarData = calendar(this.curYear, this.curMonth - 1);
        !this.hasChecked && (this.hasChecked = true);
        this.setActiveDate({ year: this.curYear, month: this.curMonth, date: this.curDate });

        // 打印矩阵
        /*this.calendarData.forEach(item => {
            let str = '';
            item.forEach(it => {
                str += it.year+'.'+it.month+'.'+it.date + '\t';
            })
            console.log(str)
        })*/
    },
    watch: {
        value(c) {
            c = !!+c && c instanceof Date ? c : new Date(c);
            let year = c.getFullYear(), month = c.getMonth() + 1, date = c.getDate();
            this.curDate = date;
            this.setActiveDate({ year, month, date })
            this.val = new Date(c);
        }
    }
}
</script>
<style lang="less" scoped>
.date {
    // box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    display: inline-block;
    font-size: 12px;
    width: 216px;
    color: #333;
    vertical-align: top;
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
                }
                &:first-child, &:first-child.current-month, &:first-child.simple-date {
                    color: #FF6E40;
                }
                &.normal-date,
                &.simple-date {
                    cursor: pointer;
                    text-align: center;
                }
                &.current-month,
                &.simple-date {
                    color: #333;
                }
                &.normal-date:hover,
                &.simple-date:hover {
                    border-color: #4475E8;
                    color: #4475E8;
                }
                &.today {
                    border-color: #4475E8;
                    color: #4475E8;
                    em {
                        color: #4475E8;
                    }
                }
                &.active {
                    color: #fff !important;
                    background-color: #4475E8;
                    em {
                        color: #fff !important;
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