<template>
<div class="content">
    <div>
        <p>Normal</p>
        <vp-select v-model="val" :options="list" @select="function(o){ option = o }"></vp-select>
        <span>当前选项值：{{ val }}， 选择项：{{ option }}</span>
    </div>
    <div>
        <p>Disabled Part Options</p>
        <vp-select v-model="val2" :options="list2" @select="function(o){ option2 = o }"></vp-select>
        <span>当前选项值：{{ val2 }}， 选择项：{{ option2 }}</span>
    </div>
    <div>
        <p style="color: #ccc">Disabled</p>
        <vp-select :disabled="true"></vp-select>
    </div>
    <div>
        <p>Multiple</p>
        <vp-select></vp-select>
    </div>
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
            list: new Array(5).fill(true).map((item, i) => ({ value: i + 1, text: `option${ i + 1 }` })),
            val2: 1,
            option2: {},
            list2: new Array(3).fill(true).map((item, i) => ({ value: i + 1, text: `option${ i + 1 }` })).concat([{ value: 4, text: 'option4', disabled: true }, { value: 5, text: 'option5', disabled: true }])
        }
    }
}
</script>
<style leng="less" scoped>
.content{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
}
.content > div {
    margin-bottom: 50px;
    width: 33.33%;
}
p {
    margin: 20px 0 10px;
    font-weight: bold;
}
</style>