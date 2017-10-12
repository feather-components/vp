<template>
<div class="cont">
    <p>DatePanel</p>
    <div class="date-panel">
        <!-- <div>
            <p>英文头部（默认）</p>
            <div style="margin-bottom: 10px">
                <select v-model="dp1.year" @change="select1">
                    <option v-for="i in 10" :value="2010 + i">{{ 2010 + i }}</option>
                </select>
                <select v-model="dp1.month" @change="select1">
                    <option v-for="i in 12" :value="i">{{ i }}</option>
                </select>
            </div>
            <datepanel v-model="date1" ref="d1"></datepanel>
            <div>当前日期：{{ date1.toLocaleDateString() }}</div>
        </div>
        <div>
            <p>中文头部</p>
            <div style="margin-bottom: 10px">
                <select v-model="dp2.year" @change="select2">
                    <option v-for="i in 10" :value="2010 + i">{{ 2010 + i }}</option>
                </select>
                <select v-model="dp2.month" @change="select2">
                    <option v-for="i in 12" :value="i">{{ i }}</option>
                </select>
            </div>
            <datepanel lang="Zh" v-model="date2" ref="d2"></datepanel>
            <div>当前日期：{{ date2.toLocaleDateString() }}</div>
        </div>
        <div>
            <p>简式显示（中文）</p>
            <div style="margin-bottom: 10px">
                <select v-model="dp3.year" @change="select3">
                    <option v-for="i in 10" :value="2010 + i">{{ 2010 + i }}</option>
                </select>
                <select v-model="dp3.month" @change="select3">
                    <option v-for="i in 12" :value="i">{{ i }}</option>
                </select>
            </div>
            <datepanel :show-simple="true" v-model="date3" ref="d3" lang="Zh"></datepanel>
            <div>当前日期：{{ date3.toLocaleDateString() }}</div>
        </div> -->
        <div>
            <p>选择范围</p>
            <div style="margin-bottom: 39px">
            </div>
            <datepanel select-range="2017-10-09,2017-10-15"></datepanel>
        </div>
    </div>
</div>
</template>
<script>
import { Datepanel, Datepicker, Timepanel } from 'vpui'

let d = new Date(), year = d.getFullYear(), month = d.getMonth() + 1;
export default {
    name: 'datepicker-page',
    components: {
        Datepanel, Datepicker, Timepanel
    },
    data() {
        return {
            date1: new Date,
            date2: new Date,
            date3: new Date,
            dp1: {
                year,
                month
            },
            dp2: {
                year,
                month
            },
            dp3: {
                year,
                month
            }
        }
    },
    computed: {
    },
    methods: {
        select1() {
            this.$refs.d1.setCalendar(this.dp1.year, this.dp1.month);
        },
        select2() {
            this.$refs.d2.setCalendar(this.dp2.year, this.dp2.month);
        },
        select3() {
            this.$refs.d3.setCalendar(this.dp3.year, this.dp3.month);
        }
    }
}
</script>
<style lang="less" scoped>
.cont {
    margin-top: 20px;
    > p {
        margin: 10px 0;
        font-weight: bold;
        font-size: 14px;
    }
    .date-panel {
        > div {
            font-size: 12px;
            display: inline-block;
            margin-right: 20px;
            vertical-align: top;
            > p {
                font-size: 14px;
            }
        }
    }
    select {
        width: 80px;
    }
}
</style>