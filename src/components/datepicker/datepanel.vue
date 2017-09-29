<template>
<div class="date">
    <div class="date-days">
        <div v-for="day in days">{{ day }}</div>
    </div>
    <div class="date-list">
        <div class="date-list-items" v-for="(dates, i) in calendarData">
            <template v-for="(date, j) in dates">
                <div v-if="showSimple"
                    :class="{ 'simple-date': date.currentMonth, 'active': date.active || (isToday(date) && !hasChecked), 'today': isToday(date) }"
                    @click="selectDate(date, [i,j])">{{ date.currentMonth && (isToday(date) ? '今' : date.date) }}</div>
                <div v-else
                    class="normal-date"
                    :class="{ 'current-month': date.currentMonth, 'active': date.active || (isToday(date) && !hasChecked), 'today': isToday(date) }"
                    @click="selectDate(date, [i,j])">{{ isToday(date) ? '今' : date.date }}</div>
            </template>
        </div>
    </div>
</div>
</template>
<script>

import { calendar } from './calendar.js'

const langArr = {
    En: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    Zh: ['日', '一', '二', '三', '四', '五', '六']
}

export default {
    name: 'datepanel',
    props: {
        value: {
            type: Date,
            default: () => new Date
        },
        today: {
            type: String | Date,
            default: () => new Date
        },
        lang: {
            type: String,
            default: 'En' // En Zh
        },
        showSimple: {
            type: Boolean,
            default: false
        },
        year: {
            type: Number | String,
            default: new Date().getFullYear()
        },
        month: {
            type: Number | String,
            default: new Date().getMonth() + 1
        }
    },
    data() {
        return {
            calendarData: [],
            prevPos: [],
            hasChecked: false, //判断是否选择过日历
        }
    },
    computed: {
        days() {
            return langArr[this.lang] || langArr['En']
        },
        curYear(){
            return isNaN(this.year) ? new Date().getFullYear() : this.year
        },
        curMonth(){
            return isNaN(this.month) ? (new Date().getMonth() + 1) : this.month
        },
        now() {
            let td = new Date(this.today), curDate = td instanceof Date ? td : new Date();
            return curDate;
        }
    },
    methods: {
        selectDate(dateObj, pos) {
            if(this.showSimple && !dateObj.currentMonth) return ;
            !this.hasChecked && (this.hasChecked = true);
            let pPos = this.prevPos;
            if(pPos.length) {
                this.calendarData[pPos[0]][pPos[1]].active = false;
            }
            dateObj.active = true;
            this.prevPos = pos;
            this.$emit('select', dateObj);
            this.$emit('input', new Date(dateObj.year, dateObj.month - 1, dateObj.date));
        },
        isToday(dateObj) {
            return dateObj.date === this.now.getDate() &&
                this.now.getMonth() + 1 === dateObj.month &&
                this.now.getFullYear() === dateObj.year;
        },
        setCalendar(year,month) {
            this.calendarData = calendar(year, month - 1)
            this.$emit('input', new Date(year, month - 1));
        }
    },
    created() {
        this.calendarData = calendar(this.curYear, this.curMonth - 1)
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
                height: 20px;
                line-height: 20px;
                flex: 1;
                text-align: center;
                margin: 4px;
                border: 1px solid transparent;
                border-radius: 2px;
                transition: all .2s;
                &:first-child, &:first-child.current-month {
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
                &.active {
                    color: #fff !important;
                    background-color: #4475E8;
                }
                &.today {
                    border-color: #4475E8;
                }
            }
        }
    }
}
</style>