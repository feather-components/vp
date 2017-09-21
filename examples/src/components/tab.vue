<template>
<div class="tab">
    <vp-tabs id="1">
        <vp-tab v-for="i in 10" :name="'tab' + i" class="tab-panel">{{ i }}</vp-tab>
    </vp-tabs>
    <vp-tabs type="1">
        <vp-tab v-for="i in 5" :name="'tab' + i" class="tab-panel">{{ i }}</vp-tab>
    </vp-tabs>
</div>
</template>
<script>
import { Tabs, Tab } from 'vpui'
export default {
    name: 'tab-page',
    components: {
        'vp-tabs': Tabs,
        'vp-tab': Tab
    }
}
</script>
<style lang="less" scoped>
.tab {
    margin-top: 20px;
    &-panel {
        padding: 20px;
    }
}
</style>