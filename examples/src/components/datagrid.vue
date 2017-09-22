<template>
    <div>
        <span class="lg-title">Base： 最简单的表格</span>
        <vp-grid :head="table_base.col" :data="table.data" :colspan="table_base.colspan"></vp-grid>

        <span class="lg-title">Action：带操作的表格</span>
        <vp-grid :head="table_action.col" :data="table.data" :colspan="table_action.colspan" @callback:userdefine="userdefine"></vp-grid>

        <span class="lg-title">Dynamic Slot：自定义单元格</span>
        <vp-grid :head="table_base.col" :data="table.data" :colspan="table_base.colspan">
            <div style="background-color:lightblue" :slot="'cell:sName_'+i" v-if="i%2" v-for="(item,i) in table.data" v-html="'<a><b>'+item.sName+'</b></a>'"></div>
            <div class="lg-color-plain-bg" slot="col:sName" v-if="key == 'sName'" v-for="(item,key) in table_base.col" v-html="'<a><b>' + table_base.col[key] + '</b></a>'"></div>
        </vp-grid>        

        <span class="lg-title">CheckBox & Radio & Switch & Sort： 常用操作</span>
        <vp-grid :head="table_check.col" :data="table.data" :colspan="table_check.colspan" @check="check" @checkall="checkall" @radio="radio" @switch="switcher" @sort="sort"></vp-grid>

        <span class="lg-title">Fix：表头固定</span>
        <vp-grid :head="table.head" :data="table.data" :colspan="table.colspan" @check="check" @checkall="checkall" @switch="switcher" :fix="table.fix">
        </vp-grid>

        <span class="lg-title">Expand： 扩展行</span>
        <vp-grid :head="table_base.col" :data="table.data" :colspan="table_base.colspan" :expand="true">
            <vp-grid slot="trexpand:0" :head="table_base.col" :data="table.data" :colspan="table_base.colspan"></vp-grid>
        </vp-grid>

        <!-- <vp-grid :head="table.head" :data="table.data" :colspan="table.colspan" @grid:checkbox="click" @grid:checkall="checkall" @grid:switch="switcher" @grid:sort="sort">
            <template slot="header" scope="props">
                <span v-html="'<b>'+props.data.label||props.data+'</b>'"></span>
            </template>
            <template slot="cell" scope="props">
                <span v-html="'<b>'+props.data.key+'</b>'"></span>
            </template>
        </vp-grid>  -->
    </div>
</template>
<style>
.red {
    background-color: red;
    height: 200px;
}

.green {
    background-color: green;
    height: 200px;
}

.yellow {
    background-color: yellow;
    height: 200px;
}
</style>
<script>
import Vue from 'vue';
import {
    Datagrid
} from 'vpui';

export default {
    components: {
        "vp-grid": Datagrid
    },
    data() {
        return {
            table_base: {
                col: {
                    sName: '姓名',
                    sType: '类型',
                    sUserMobile: '获奖联系方式',
                    sPrizeName: '奖品'
                },
                colspan: 4
            },
            table_action: {
                col: {
                    sName: '姓名',
                    sType: '类型',
                    sUserMobile: '获奖联系方式',
                    sPrizeName: '奖品',
                    option: {
                        type: 'action',
                        label: '操作',
                        actions: {
                            '百度blank': {
                                type: 'link',
                                render: function(data) {
                                    return {
                                        url: 'http://www.baidu.com?id=' + data.id,
                                        blank: true
                                    }
                                },
                                disable: function(data) {
                                    return data.id != 1;
                                }
                            },
                            'Google': {
                                type: 'link',
                                render: function(data) {
                                    return {
                                        url: 'http://www.google.com?id=' + data.id
                                    }
                                }
                            },
                            '自定义事件': {
                                type: 'callback',
                                eventName: 'userdefine',
                                disable: function(data) {
                                    return data.id == 10;
                                }
                            }
                        }
                    }
                },
                colspan: 5
            },
            table_check: {
                col: {
                    select: {
                        type: 'checkbox'
                    },
                    radio: {
                        type: 'radio',
                        label: 'radio'
                    },
                    switch1:{
                        type:'switch',
                        label:'switch'
                    },
                    switch2:{
                        type:'switch',
                        label:'开关',
                        on:'开',
                        off:'关'
                    },
                    sName: {
                        type:'sort',
                        label:'姓名',
                        klass:'qw'
                    },
                    sType: '类型',
                    sUserMobile: '获奖联系方式',
                    sPrizeName: '奖品'
                },
                colspan: 10
            },
            table: {
                head: {
                    select: {
                        type: 'checkbox',
                        label: '',
                        width: '100px'
                    },
                    switch1: {
                        type: 'checkbox',
                        label: '',
                        width: '50px'
                    },
                    mobile: {
                        type: 'switch',
                        label: '有手机',
                        width: '150px'
                    },
                    house: {
                        type: 'switch',
                        label: '有房子',
                        width: '100px',
                        on: '有',
                        off: '无'
                    },
                    sName: {
                        label: '姓名',
                        type: 'sort',
                        width: '100px',
                        asc: ''
                    },
                    option: {
                        label: '操作',
                        type: 'option',
                        width: '100px'
                    },
                    sMoblie: {
                        label: '姓名',
                        width: '100px'
                    },
                    sMoblie: {
                        label: '手机号码',
                        width: '100px'
                    },
                    sCityName: {
                        label: '城市',
                        width: '100px'
                    },
                    sCreateTime: {
                        label: '抽奖时间',
                        width: '100px'
                    },
                    sType: {
                        label: '类型',
                        width: '100px'
                    },
                    sPrizeName: {
                        label: '奖品',
                        width: '100px'
                    },
                    sUserMobile: {
                        label: '获奖联系方式',
                        width: '100px'
                    },
                    sBeizhu: {
                        label: '备注',
                        width: '100px'
                    },
                    sStatus: {
                        label: '状态'
                    },
                    slot: {
                        label: 'slot',
                        width: '90px'
                    }
                },
                data: [{
                    select: {
                        value: 1,
                        disable:true
                    },
                    radio:{
                        value:'r1'
                    },
                    switch1: { 
                        checked: false
                    },
                    switch2: { 
                        checked: false
                    },
                    mobile: true,
                    house: true,
                    id: 1,
                    sName: '姓名',
                    sMoblie: '手机号复旦复华的积分丰厚的交话费的123415465465减肥码<b/>fdfd',
                    sCityName: '城市',
                    sCreateTime: '抽奖时间',
                    sType: '类型',
                    sPrizeName: '奖品',
                    sUserMobile: '获奖联系方式',
                    sBeizhu: '备注',
                    slot: 'slot',
                    sStatus: '状态',
                    $expand:'qqq',
                    option: [{
                        type: 'link',
                        url: 'http://www.baidu.com',
                        text: '百度'
                    }, {
                        type: 'action',
                        name: 'new',
                        text: '新增',
                        arg: {
                            id: 123
                        }
                    }]
                }, {
                    select: {
                        value: 10
                    },
                    radio:{
                        value:'r2',
                        disable:true
                    },
                    switch1: { 
                        checked: false
                    },
                    switch2: { 
                        checked: false
                    },
                    mobile: {
                        value: false,
                        label: '无'
                    },
                    house: true,
                    id: 10,
                    sName: '姓名',
                    sMoblie: '手机号码',
                    sCityName: '城市',
                    sCreateTime: '抽奖时间',
                    sType: '类型',
                    sPrizeName: '奖品',
                    sUserMobile: '获奖联系方式',
                    sBeizhu: '备注',
                    slot: 'slot',
                    sStatus: '状态'
                }, {
                    select: {
                        value: 2
                    },                    
                    radio:{
                        value:'r3'
                    },
                    switch1: { 
                        disable:true,
                        label:'禁用'
                    },
                    switch2: { 
                        checked: false
                    },
                    mobile: {
                        disable: true,
                        label: '有'
                    },
                    house: true,
                    id: 2,
                    sName: '姓名',
                    sMoblie: '手机号码',
                    sCityName: '城市',
                    sCreateTime: '抽奖时间',
                    sType: '类型',
                    sPrizeName: '奖品',
                    sUserMobile: '获奖联系方式',
                    sBeizhu: '备注',
                    slot: 'slot',
                    sStatus: '状态'
                }, {
                    select: {
                        value: 3
                    },
                    radio:{
                        value:'r4'
                    },
                    switch1: {
                        value: 1,
                        checked: false
                    },
                    switch12: {
                        value: 1,
                        checked: false
                    },
                    mobile: true,
                    house: true,
                    id: 3,
                    sName: '姓名',
                    sMoblie: '手机号码',
                    sCityName: '城市',
                    sCreateTime: '抽奖时间',
                    sType: '类型',
                    sPrizeName: '奖品',
                    sUserMobile: '获奖联系方式',
                    sBeizhu: '备注',
                    slot: 'slot',
                    sStatus: '状态'
                }, {
                    select: {
                        value: 4,
                        checked: true
                    },                    
                    radio:{
                        value:'r5',
                        checked:true
                    },
                    switch1: {
                        value: 1,
                        checked: true
                    },
                    switch2: {
                        value: 1,
                        checked: true
                    },
                    mobile: true,
                    house: true,
                    id: 4,
                    sName: '姓名',
                    sMoblie: '手机号码',
                    sCityName: '城市',
                    sCreateTime: '抽奖时间',
                    sType: '类型',
                    sPrizeName: '奖品',
                    sUserMobile: '获奖联系方式',
                    sBeizhu: '备注',
                    slot: 'slot',
                    sStatus: '状态'
                }],
                colspan: 10,
                fix: {
                    left: 2,
                    right: 1,
                    head: true
                }
            }
        }
    },
    created(){
        this.table.data.forEach(function(data){
            data.$expand=function(){
                return 'I am expanded';
            }
        })
    },
    methods: {
        check(key, index, result) {             
            console.log('checkbox', key, index, result);
        },
        checkall(key, result) {
            console.log('checkall', key, result);
        },
        radio(key, index, result){
            console.log('radio', key, index, result);
        },
        switcher(key, index, result) {
            console.log('switch',key, index, result);
        },
        sort(key, isAsc) {
            console.log('sort',key, isAsc);
        },
        action(name, arg) {
            console.log(name, arg);
        },
        userdefine(data) {
            alert('just do it !(id:' + data.id + ')');
            console.log(data);
        },
        test(data) {
            console.log(data);
        }
    }
}
</script>