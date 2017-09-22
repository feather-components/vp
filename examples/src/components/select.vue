<template>
<div class="content">
    <p>普通</p>
    <vp-select v-model="val" :options="list" @select="select"></vp-select>
    <span>当前选项值：{{ val }}， 选择项：{{ option }}</span>
</div>
</template>
<script>
import { Select } from 'vpui';
export default {
    name: 'select-page',
    components: {
        'vp-select': Select
    },
    data() {
        return {
            val: 2,
            option: {},
            list: new Array(5).fill(true).map((item, i) => ({ value: i + 1, text: `option${ i + 1 }` }))
        }
    },
    methods: {
        select(o) {
            // console.log(o);
            this.option = o;
        }
    }
}
</script>
<style leng="less" scoped>
.content {
}
p {
    margin: 20px 0 10px;
}
</style>