<template>
<div class="yearpicker">
    <div class="input" @click="open = !open">
        <input type="text" readonly
            class="input-text"
            v-model="year"
            placeholder="Select year">
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
            <span><em @click="openRangePanel">{{ range }}</em></span>
            <span><i class="picker-icon right" @click="next"></i></span>
        </div>
        <yearrangepanel v-model="range" @change="changeYearRange" v-if="showRange"></yearrangepanel>
        <yearpanel v-model="year" :range="range" v-else @change="open = false"></yearpanel>
    </div>
    </transition>
</div>
</template>
<script>
import Yearpanel from './yearpanel.vue'
import Yearrangepanel from './yearrangepanel.vue'

let y = new Date().getFullYear(), begin = y - y % 10, end = begin + 9;
export default {
    name: 'yearpicker',
    props: {
        value: {
            type: Number | String | Object
        }
    },
    data() {
        return {
            open: false,
            year: y,
            range: begin + '~' + end,
            showRange: false
        }
    },
    methods: {
        changeYearRange(obj) {
            this.year = obj.begin + (this.year % 10)
            this.showRange = false;
        },
        openRangePanel() {
            let b = this.year - this.year % 10, e = b + 9;
            this.range = b + '~' + e;
            this.showRange = true;
        },
        prev() {
            if(this.showRange) {
                let rg = this.range.split('~'), begin = +rg[0] - 100, end = +rg[1] - 100;
                this.range = begin + '~' + end;
                this.year = this.year - 100;
            } else {
                let rg = this.range.split('~'), begin = +rg[0] - 10, end = +rg[1] - 10;
                this.range = begin + '~' + end;
                this.year = this.year - 10;
            }
        },
        next() {
            if(this.showRange) {
                let rg = this.range.split('~'), begin = +rg[0] + 100, end = +rg[1] + 100;
                this.range = begin + '~' + end;
                this.year = this.year + 100;
            } else {
                let rg = this.range.split('~'), begin = +rg[0] + 10, end = +rg[1] + 10;
                this.range = begin + '~' + end;
                this.year = this.year + 10;
            }
        }
    },
    components: { Yearpanel, Yearrangepanel }
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

.yearpicker {
    position: relative;
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
        transition: all .1s;
        transform-origin: center top;
    }
    &-enter,
    &-leave-to{
        opacity: 0;
        transform: scaleY(.8);
        transform-origin: center top;
    }
}
</style>