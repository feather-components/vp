<template>
    <div class="vp-water-fall" @resize="fallResize">
        <div ref="waterFallColumnWrap" class="vp-water-fall-column-wrap"></div>
        <div ref="tempBlock" class="vp-water-fall-temp">
            <slot></slot>
        </div>
    </div>    
</template>
<script>
    let columns = [];
    export default{
        name: 'waterfall',
        props: {
            source: Array,
            column: {
                type: Number,
                default: 2
            }
        },
        methods: {
            appendColumn(){
                let columnSize = this.column;
                let el = this.$refs.waterFallColumnWrap;
                let columnWidth = this.$el.clientWidth / columnSize + 'px';
                while(columnSize > 0){
                    let div = document.createElement('div');
                    div.className = "vp-water-fall-column column-" + columnSize;
                    div.style.width = columnWidth;
                    el.appendChild(div);
                    columns.push(div);
                    columnSize-- ;
                }
            },
            getColumn(index){
                return columns[index];
            },
            cloneItemToCloumn(){
                let itemList = this.$refs.tempBlock.children;
                let item = false;
                while(itemList.length > 0){
                    item = itemList.item(0);
                    this.getColumn(0).appendChild(item);
                    this.getShortColumn();

                }
            },

            getShortColumn(){
                for(let index  = 0; index < columns.length -1; index ++){
                    let tempColumn = {};
                    if(columns[index].clientHeight > columns[index + 1].clientHeight){
                        tempColumn = columns[index];
                        columns[index] = columns[index + 1];
                        columns[index + 1] = tempColumn;
                    }
                }
            },

            fallResize(event){
                alert('ddff');
                console.log(eveent.target);
            }
        },
        mounted(){
            this.appendColumn();
            this.$nextTick(() => {
                this.cloneItemToCloumn();
            });
            this.$el.onresize = function(){
                console.log('resize');
            }
        }
    }
</script>
<style>
    .vp-water-fall{
        display: block;
    }
    .vp-water-fall-column{
        float: left;
    }
    .vp-water-fall-temp{
        display: none;
    }
</style>