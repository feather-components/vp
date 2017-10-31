<template>
<ul class="scroll" ref="scroll">
    <li class="scroll-item"
        v-for="(item,index) in items"
        @mouseenter="curIndex = index"
        @mouseleave="curIndex = undefined"
        @click="check(item,index)"
        :class="{ checked: index === checkIndex, active: index === curIndex }">{{ item | dbv }}</li>
</ul>
</template>
<script>
export default {
    name: 'scrollpicker',
    props: {
        value: {
            type: Number
        },
        list: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            items: this.list,
            curIndex: undefined,
            checkIndex: this.list.indexOf(this.value)
        }
    },
    methods: {
        check(item, index) {
            this.checkIndex = index;
            this.$emit('input', item);
        }
    },
    mounted() {
        this.checkIndex > -1 && this.$refs.scroll.scrollTo(0, this.checkIndex * 28);
    },
    watch: {
        value(c) {
            var index = this.checkIndex = this.list.indexOf(c);
            this.$refs.scroll.scrollTo(0, index * 28);
        }
    },
    filters: {
        dbv(v) {
            return v < 10 ? ''.concat(0,v) : v
        }
    }
}
</script>
<style lang="less" scoped>
.scroll {
    width: 108px;
    background-color: #fff;
    height: 180px;
    overflow: auto;
    display: inline-block;
    &-item {
        height: 28px;
        line-height: 28px;
        text-align: center;
        cursor: pointer;
        transition: all .2s;
        &.active {
            background-color: #F0F8FD;
        }
        &.checked {
            color: #4475E8;
        }
    }
}
</style>