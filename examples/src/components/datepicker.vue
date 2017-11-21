<template>
<div>
    <section>
        <strong>Pickers</strong>
        <div class="cont">
            <p>Yearpicker</p>
            <div class="panel">
                <yearpicker></yearpicker>
            </div>

            <br/>
            <p>Monthpicker 格式中间的分隔符可以自定义</p>
            <div class="panel">
                <div>
                    format: YYYY-MM
                    <monthpicker></monthpicker>
                </div>
                <div>
                    format:YYYY~MM
                    <monthpicker format="YYYY~MM"></monthpicker>
                </div>
                <div>
                    format:YYYY/MM
                    <monthpicker format="YYYY/MM"></monthpicker>
                </div>
                <div>
                    format:YYYY.MM
                    <monthpicker format="YYYY.MM"></monthpicker>
                </div>
                <div>
                    中文
                    <monthpicker lang="zh"></monthpicker>
                </div>
            </div>

            <br/>
            <p>Datepicker 格式中间的分隔符可以自定义</p>
            <div class="panel">
                <div>
                    默认 format:YYYY-MM-DD
                    <datepicker></datepicker>
                </div>
                <div>
                    format:YYYY~MM~DD
                    <datepicker format="YYYY~MM~DD"></datepicker>
                </div>
                <div>
                    format:YYYY/MM/DD
                    <datepicker format="YYYY/MM/DD"></datepicker>
                </div>
                <div>
                    format:YYYY.MM.DD
                    <datepicker format="YYYY.MM.DD"></datepicker>
                </div>
                <div>
                    中文
                    <datepicker lang="zh"></datepicker>
                </div>
            </div>
        </div>
    </section>
    <section>
        <strong>Parts</strong>
        <div class="cont cont-panel">
            <p>Yearpanel & Monthpanel</p>
            <div class="panel">
                <div>
                    <p>年份&nbsp;&nbsp;当前年份：{{ year }}</p>
                    <yearpanel v-model="year"></yearpanel>
                </div>
                <div>
                    <p>月份（默认）&nbsp;&nbsp;当前月份：{{ month1 }}</p>
                    <monthpanel v-model="month1"></monthpanel>
                </div>
                <div>
                    <p>月份（中文）&nbsp;&nbsp;当前月份：{{ month2 }}</p>
                    <monthpanel v-model="month2" lang="zh"></monthpanel>
                </div>
            </div>

            <br/>
            <p>Datepanel</p>
            <div class="panel">
                <div>
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
                    <datepanel lang="zh" v-model="date2" ref="d2"></datepanel>
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
                    <datepanel :show-simple="true" v-model="date3" ref="d3" lang="zh"></datepanel>
                    <div>当前日期：{{ date3.toLocaleDateString() }}</div>
                </div>
                <div>
                    <p>选择范围</p>
                    <div style="margin-bottom: 39px">
                    </div>
                    <datepanel select-range="2017-10-09,2017-10-15"></datepanel>
                </div>
            </div>

            <br/>
            <p>Timepanel</p>
            <div class="panel">
                <div>
                    <p>时分&nbsp;&nbsp;当前时间：{{ time1 }}</p>
                    <timepanel v-model="time1"></timepanel>
                </div>
                <div>
                    <p>时分秒&nbsp;&nbsp;当前时间：{{ time2 }}</p>
                    <timepanel v-model="time2" :hasSeconds="true"></timepanel>
                </div>
            </div>
        </div>
    </section>
</div>
</template>
<script>
import { Yearpanel, Monthpanel, Datepanel, Timepanel, Yearpicker, Monthpicker, Datepicker } from 'vpui'

const dbv = v => v < 10 ? ''.concat(0,v) : v;

let d = new Date(), year = d.getFullYear(), month = d.getMonth() + 1, hours = d.getHours(), minutes = d.getMinutes(), seconds = d.getSeconds(), ms = d.getMilliseconds();
export default {
    name: 'datepicker-page',
    components: {
        Yearpanel, Monthpanel, Datepanel, Timepanel, Yearpicker, Monthpicker, Datepicker
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
            },
            year: 2017,
            month1: 10,
            month2: 10,
            time1: dbv(hours) + ':' + dbv(minutes),
            time2: dbv(hours) + ':' + dbv(minutes) + ':' + dbv(seconds),
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
    },
    mounted() {
        setInterval(() => {
            let dd = new Date(), h = dd.getHours(), m = dd.getMinutes(), s = dd.getSeconds(), ms = dd.getMilliseconds();
            this.time1 = dbv(h) + ':' + dbv(m);
            this.time2 = dbv(h) + ':' + dbv(m) + ':' + dbv(s);
        }, 1000);
    }
}
</script>
<style lang="less" scoped>
section {
    strong {
        display: block;
        border-bottom: 1px solid #ccc;
        padding: 10px 0 5px;
        font-size: 20px;
    }
}
.cont {
    margin-top: 20px;
    > p {
        margin: 10px 0;
        font-weight: bold;
        font-size: 14px;
    }
    .panel {
        > div {
            font-size: 12px;
            display: inline-block;
            margin-right: 20px;
            vertical-align: bottom;
            > p {
                font-size: 14px;
            }
        }
    }
    &.cont-panel {
        .panel > div {
            vertical-align: top;
        }
    }
    select {
        width: 80px;
    }
}
</style>