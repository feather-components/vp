<template>
<div>
    <div class="input">
        <input type="text" readonly
            class="input-text"
            placeholder="Select date">
        <span class="picker-icon">
            <svg t="1509440995295" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4681" xmlns:xlink="http://www.w3.org/1999/xlink" width="22" height="22">
                <path d="M358.2 436h-52c-14.4 0-26 11.6-26 26v52c0 14.2 11.6 26 26 26h52c14.4 0 26-11.8 26-26v-52c0-14.4-11.8-26-26-26zM358.2 616h-52c-14.4 0-26 11.6-26 26v52c0 14.2 11.6 26 26 26h52c14.4 0 26-11.8 26-26v-52c0-14.4-11.8-26-26-26zM538.2 436h-52c-14.4 0-26 11.6-26 26v52c0 14.2 11.6 26 26 26h52c14.4 0 26-11.8 26-26v-52c0-14.4-11.8-26-26-26zM538.2 616h-52c-14.4 0-26 11.6-26 26v52c0 14.2 11.6 26 26 26h52c14.4 0 26-11.8 26-26v-52c0-14.4-11.8-26-26-26zM718.2 540c14.4 0 26-11.8 26-26v-52c0-14.4-11.6-26-26-26h-52c-14.4 0-26 11.6-26 26v52c0 14.2 11.6 26 26 26h52zM816.2 738v-44c0-15.4-12.6-28-28-28s-28 12.6-28 28v72c0 15.4 12.6 28 28 28h72c15.4 0 28-12.6 28-28s-12.6-28-28-28h-44z" fill="#999" p-id="4682"></path>
                <path d="M898 623.8V344c0-79.2-64.8-144-144-144h-58V150c0-15.4-12.6-28-28-28s-28 12.6-28 28v50H388V150c0-15.4-12.6-28-28-28s-28 12.6-28 28v50h-58c-79.2 0-144 64.8-144 144v428c0 79.2 64.8 144 144 144h413.8c29 20.2 64.4 32 102.4 32 99.4 0 180-80.6 180-180 0.2-59-28.4-111.4-72.2-144.2zM635.6 860H274c-23.4 0-45.4-9.2-62.2-25.8C195.2 817.4 186 795.4 186 772V344c0-23.4 9.2-45.4 25.8-62.2 16.8-16.8 38.8-25.8 62.2-25.8h58v42c0 15.4 12.6 28 28 28s28-12.6 28-28v-42h252v42c0 15.4 12.6 28 28 28s28-12.6 28-28v-42h58c23.4 0 45.4 9.2 62.2 25.8 16.8 16.8 25.8 38.8 25.8 62.2v251.6c-16.4-5-33.8-7.6-51.6-7.6-99.4 0-180 80.6-180 180 0 33.6 9.2 65 25.2 92z m154.8 32c-68.4 0-124-55.6-124-124s55.6-124 124-124 124 55.6 124 124-55.8 124-124 124z" fill="#999" p-id="4683"></path>
            </svg>
        </span>
    </div>
</div>
</template>
<script>
export default {
    name: 'datepicker'
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
</style>
