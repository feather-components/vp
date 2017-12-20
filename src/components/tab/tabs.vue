<template>
    <transition name="fade">
        <div :class="className">
            <ul class="vp-tab__nav">
                <li 
                    v-for="tabPanel in tabPanels"
                    v-html="tabPanel.label"
                    @click="to(tabPanel.index)"
                    :class="'vp-tabnav__item' + (tabPanel.isActive ? '--active' : '')">
                </li>
            </ul>
            <div class="tab-panel">
                <slot></slot>
            </div>
        </div>
    </transition> 
</template>
<script>
    export default {
        name: 'tabs',
        props: {
            index: {
                type: Number | String,
                default: 'index-not-set'
            },
            isManual: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        data() {
            return {
                tabPanels: [],
                className: ''
            }
        },
        created() {
            this.tabPanels = this.$children;
        },
        mounted() {
            if(!this.$el.className){
                this.className = 'vp-tab--default';
            }

            if(!this.isManual){
                if(this.index === 'index-not-set'){
                    this.to(this.tabPanels[0].index);
                }else{
                    this.to(this.index);
                }
            }
        },
        methods: {
            to(index) {
                let findTab = false;
                this.tabPanels.forEach((tabPanel, i) => {
                    if(tabPanel.index === index){
                        tabPanel.isActive = true;
                        findTab = true;
                    } else {
                        tabPanel.isActive = false;
                    }
                });

                if(!findTab){
                    console.error('vpui: tab not found, the index missed');
                }

                this.$emit('vp-tab:to', { index });
            }
        }
    }
</script>
<style lang="less">
    .vp-tab {

    }

    .vp-tab__nav{
        display: flex;
    }

    .vp-tabnav__item{
        cursor: pointer;
        height: 44px;
        line-height: 44px;
        font-size: 14px;
        color: #333;
        text-align: center;
    }




    .vp-tab--default {
        .vp-tab;
        background-color: #FFFFFF;
        .vp-tabnav__item{
            .vp-tabnav__item;
            margin: 0 20px;
        }
        .vp-tabnav__item--active{
            .vp-tabnav__item;
            color: #4475E8;
        }
        .vp-tabnav__item--active:after{
            content: "";
            display: block;
            height: 2px;
            background-color: #4475E8;
            margin-top: -1px;
        }
    }

    .vp-tab--surround {
        .vp-tab;
        border: 1px solid  #DBDEE2;
        .vp-tabnav__item{
            .vp-tabnav__item;
            background-color: #F7F7F8;
            border-right: 1px solid #DBDEE2;
            min-width: 90px;
        }
        .vp-tabnav__item--active{
            .vp-tabnav__item;
            background-color: #fff;
            color: #4475E8;
        }
    }

    /*.fade {
        &-enter-active,
        &-leave-active {
            transition: all .3s;
        }
        &-enter,
        &-leave-to{
            opacity: 0;
        }
    } */
</style>