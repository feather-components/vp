<template>
    <div class="vp-water-fall">
        <div ref="waterFallColumnWrap" class="vp-water-fall-column-wrap"></div>
        <div ref="tempBlock" class="vp-water-fall-temp">
            <slot></slot>
        </div>
    </div>    
</template>
<script>
    let columns = [];
    let reResizeTimer = {};
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
                //let columnWidth = this.$el.clientWidth / columnSize + 'px';
                let columnWidth = (Math.ceil((1 / columnSize) * 10000)) / 100 + "%";
                console.log(columnWidth);

                let index = 0;
                while(index < columnSize){
                    let div = document.createElement('div');
                    div.className = `vp-water-fall-column column-${index}`;
                    div.style.width = columnWidth;
                    el.appendChild(div);
                    columns.push(div);
                    index++ ;
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

            reWidth(){
               /* clearTimeout(reResizeTimer);
                let self = this;
                reResizeTimer = setTimeout(function(){
                    let columnSize = self.column;
                    let columnWidth = self.$el.clientWidth / columnSize + 'px';
                    columns.forEach((column) => {
                        column.style.width = columnWidth;
                    });
                }, 200)*/
            }   

        },
        mounted(){
            this.appendColumn();
            this.$nextTick(() => {
                this.cloneItemToCloumn();
            });
        },
        deactivated(){
        
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
    .vp-water-fall-column-wrap{
        width: 100%;
    }
</style>