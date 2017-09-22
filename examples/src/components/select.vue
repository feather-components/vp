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
            val: undefined,
            option: {},
            list: [
                { value: 1, text: 'option1' },
                { value: 2, text: 'option2' },
                { value: 3, text: 'option3' },
                { value: 4, text: 'option4' },
                { value: 5, text: 'option5' },
                { value: 6, text: 'option6' },
                { value: 7, text: 'option7' },
                { value: 8, text: 'option8' },
                { value: 9, text: 'option9', disabled: true }
            ]
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