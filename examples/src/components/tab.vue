<template>
    <div class="tab-example">
        <vp-tabs class="vp-tab--surround">
            <vp-tabpanel v-for="i in 10" :label="'tab' + i" :index="i">{{ i }}</vp-tabpanel>
        </vp-tabs>
        <br/>
        <vp-tabs>
            <vp-tabpanel v-for="i in 5" :label="'tab' + i" :index="i">{{ i }}</vp-tabpanel>
        </vp-tabs>
        <br/>
        <vp-tabs :isManual="true" ref="mandualTab" @vp-tab:to="tabTo">
            <vp-tabpanel label="user" index="user">user</vp-tabpanel>
            <vp-tabpanel label="role" index="role">role</vp-tabpanel>
            <vp-tabpanel label="prvi" index="prvi">prvi</vp-tabpanel>
            <vp-tabpanel label="red" index="red">red</vp-tabpanel>
            <vp-tabpanel label="green" index="green">green</vp-tabpanel>
        </vp-tabs>
        <br/>
        <input v-model="mandualTabIndex"></input><btn @click="chooseTab($refs.mandualTab, mandualTabIndex)">选择 tab</btn>
        <br/>
        <br/>
        <br/>
        <vp-tabs :hideModel = "true">
            <vp-tabpanel label="dfdsafda">1111</vp-tabpanel>
            <vp-tabpanel label="xxddd">2222</vp-tabpanel>
            <vp-tabpanel label="fdsa">3333</vp-tabpanel>
            <vp-tabpanel label="dafdsafd">4444</vp-tabpanel>
        </vp-tabs>
    </div>
</template>
<script>
    import { Tabs, TabPanel,Button,Toast } from 'vpui'
    export default {
        name: 'tab-page',
        data(){
            return{
                mandualTabIndex: 'prvi'
            } 
        },
        components: {
            'vp-tabs': Tabs,
            'vp-tabpanel': TabPanel,
            btn: Button
        },
        methods: {
            tabTo(event){
                Toast.warn('tabIndex is ' + event.index);
            },

            chooseTab(tab, index){
                tab.to(index);
            }
        }
    }
</script>
<style>
    .tab-example{
        background-color: #ccc;
        padding: 20px;
    }
</style>