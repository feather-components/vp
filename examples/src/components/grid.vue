<template> 
    <vp-grid :thead="table.head" :tdata="table.data" :colspan="table.colspan"></vp-grid>
</template>


<script>
    import {
        Grid
    } from 'vpui';

    export default{
        components: {
            "vp-grid":Grid
        },
        data(){
            return {
                table:{
                    head:{
                        sName: {label:'姓名',type:'checkbox'},
                        sMoblie: {label:'姓名',type:'checkbox'},
                        sMoblie: '手机号码',
                        sCityName: '城市',
                        sCreateTime: '抽奖时间',
                        sType: '类型',
                        sPrizeName: '奖品',
                        sUserMobile: '获奖联系方式',
                        sBeizhu: '备注',
                        sStatus: '状态',
                        option: { label: '操作', type: 'option' }
                    },
                    data:[{
                        sName: '姓名',
                        sMoblie: '手机号码',
                        sCityName: '城市',
                        sCreateTime: '抽奖时间',
                        sType: '类型',
                        sPrizeName: '奖品',
                        sUserMobile: '获奖联系方式',
                        sBeizhu: '备注',
                        sStatus: '状态'
                    },{
                        sName: '姓名',
                        sMoblie: '手机号码',
                        sCityName: '城市',
                        sCreateTime: '抽奖时间',
                        sType: '类型',
                        sPrizeName: '奖品',
                        sUserMobile: '获奖联系方式',
                        sBeizhu: '备注',
                        sStatus: '状态'
                    }],
                    colspan:10
                }
            }
        }
    }
</script>