<template>
    <pager :total="pages" :current="cur" :position="position" :volumn="volumn" @to="to" ref="pager">
        <div class="lg-tablepager-option" slot="before">
            <span>每页</span>
            <select  v-model="pageSize" @change="changeSize(pageSize)">
                <option v-for="num in sizeList" :value="num">{{num}}条</option>
            </select> 
        </div>
        <div class="lg-tablepager-option" slot="after"> 
            <span class="lg-tablepager-total">,&nbsp;{{total}}条</span>
        </div>
    </pager>
</template>
<style> 
.lg-tablepager-option{
    border:1px solid transparent;
}
select {
    height: 24px;
    width: auto;
    padding: 0 3px;
    outline: none;
    text-align: center;
    margin: 0 5px;
    border-radius: 3px;
    border: 1px solid #a3a3a3;
    box-size: border-box;
} 
</style>
<script>
import Pager from '../../components/pager';
var Tablepager = {
    name: 'tablepager',
    props: {
        'total': {
            type: Number,
            require: true
        },
        'current': {
            type: Number,
            require: true,
            default: 1
        },
        'position': {
            type: String,
            default:'center'
        },
        'size':{
            type: Number,
            require: true,
            default: 10
        },
        'sizeList': {
            type: Array,
            default () {
                return [10,20,50];
            }
        },
        'volumn': {
            type: Number,
            default: 10,
            validator(value) {
                return value > 5;
            }
        }
    },
    methods: {
        to(current) {
            this.$emit('to', current,this.pageSize); 
            this.cur=current;
        },
        changeSize(size) {
            this.pageSize=size; 
            this.$refs.pager.shortcut='';
            this.$refs.pager.to(1);             
        } 
    },
    data() {
        var size=this.size;
        if(this.sizeList&&this.sizeList.indexOf(this.size)==-1)
            size=this.sizeList[0];
        return {
            pageSize:size,
            cur:this.current
        }
    },
    computed: {
        pages() {
            return Math.ceil(this.total / this.pageSize);
        }
    },
    components:{
        Pager
    }
}
export default Tablepager;
</script>