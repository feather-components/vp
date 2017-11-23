<template>
<div>
    <Daterangepanel></Daterangepanel>
</div>
</template>
<script>
import Daterangepanel from './daterangepanel.vue'
export default {
    name: 'daterangepicker',
    components: { Daterangepanel }
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
    width: 148px;
    cursor: pointer;
    &-text {
        line-height: 28px;
        height: 28px;
        width: 124px;
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