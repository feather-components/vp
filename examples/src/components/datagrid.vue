<template>
<div>
    <vp-grid :head="table.head" :data="table.data" :colspan="table.colspan" @grid:checkbox="click" @grid:checkall="checkall" @grid:switch="switcher" @grid:sort="sort" @grid:action="action">
    </vp-grid>

    <vp-grid :head="table.head" :data="table.data" :colspan="table.colspan" @grid:checkbox="click" @grid:checkall="checkall" @grid:switch="switcher" @grid:sort="sort">
        <template slot="header" scope="props">
            <span v-html="'<b>'+props.data.label||props.data+'</b>'"></span>
        </template>
        <template slot="cell" scope="props">
            <span v-html="'<b>'+props.data.key+'</b>'"></span>
        </template>
    </vp-grid>
    </div>
</template>
<script>
import {
    Datagrid
} from 'vpui';

export default {
    components: {
        "vp-grid": Datagrid
    },
    data() {
        return {
            table: {
                head: {
                    select: {
                        type: 'checkbox',
                        label: ''
                    },
                    select2: {
                        type: 'checkbox',
                        label: ''
                    },
                    mobile: {
                        type: 'switch',
                        label: '有手机'
                    },
                    house: {
                        type: 'switch',
                        label: '有房子',
                        on: '有',
                        off: '无'
                    },
                    sName: {
                        label: '姓名',
                        type: 'sort',
                        asc: ''
                    },
                    option: {
                        label: '操作',
                        type: 'option'
                    },
                    sMoblie: '姓名',
                    sMoblie: '手机号码',
                    sCityName: '城市',
                    sCreateTime: '抽奖时间',
                    sType: '类型',
                    sPrizeName: '奖品',
                    sUserMobile: '获奖联系方式',
                    sBeizhu: '备注',
                    sStatus: '状态',
                    slot: 'slot'
                },
                data: [{
                    select: {
                        value: 1,
                        checked: false
                    },
                    select2: {
                        value: 1,
                        checked: false
                    },
                    mobile: true,
                    house: true,
                    id: 1,
                    sName: '姓名',
                    sMoblie: '手机号码',
                    sCityName: '城市',
                    sCreateTime: '抽奖时间',
                    sType: '类型',
                    sPrizeName: '奖品',
                    sUserMobile: '获奖联系方式',
                    sBeizhu: '备注',
                    slot: 'slot',
                    sStatus: '状态',
                    option:[{
                        type:'link',
                        url:'http://www.baidu.com',
                        text:'百度'
                    },{
                        type:'action',
                        name:'new',
                        text:'新增',
                        arg:{
                            id:123
                        }
                    }]
                }, {
                    select: {
                        value: 10,
                        checked: true
                    },
                    select2: {
                        value: 1,
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
                        value: 2,
                        checked: false,
                        disable: true
                    },
                    select2: {
                        value: 1,
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
                        value: 3,
                        checked: false,
                        disable: true
                    },
                    select2: {
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
                        checked: false,
                        disable: true
                    },
                    select2: {
                        value: 1,
                        checked: false
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
                colspan: 10
            }
        }
    },
    methods: {
        click(key, index, result) {
            console.log(key, index, result);
        },
        checkall(key, result) {
            console.log(key, result);
        },
        switcher(key, index, result) {
            console.log(key, index, result);
        },
        sort(key, isAsc) {
            console.log(key, isAsc);
        },
        action(name,arg){
            console.log(name,arg);
        }
    }
}
</script>