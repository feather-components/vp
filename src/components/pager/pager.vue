<template>
    <div class="lg-pager" :class="klass" v-if="showPager">
        <div v-if="totalCount !== 0" class="lg-pager-total">共{{ totalCount }}条</div>  
        <ul class="lg-pager-items">
            <li class="lg-pager-item lg-pager-previous" :class="{'disable': isHead}">
                <a href="javascript:" @click="to(pager.current - 1)"></a>
            </li>
            <li class="lg-pager-item" :class="{'lg-pager-current': isHead}">
                <a href="javascript:" @click="to(1)">1</a>
            </li>
            <li class="lg-pager-item lg-pager-dot" v-if="pager.start != 2">
                ...
            </li>
            <li class="lg-pager-item" v-for="n in (pager.end - pager.start + 1)" :class="{'lg-pager-current': pager.current == (pager.start + n - 1)}">
                <a href="javascript:" @click="to(pager.start + n - 1)">{{ pager.start + n - 1 }}</a>
            </li>
            <li class="lg-pager-item lg-pager-dot" v-if="pager.end < pageCount - 1">
                ...
            </li>
            <li class="lg-pager-item" :class="{ 'lg-pager-current': isTail }" v-if="pageCount > 1">
                <a href="javascript:" @click="to( pageCount )">{{ pageCount }}</a>
            </li>
            <li class="lg-pager-item lg-pager-next" :class="{ 'disable': isTail }">
                <a href="javascript:" @click="to( pager.current + 1 )"></a>
            </li>
            <li class="lg-pager-shortcut">
                去第<input type="text" v-model="shortcut" class="lg-pager-input-to" @keydown="scHandler(shortcut)">页<!-- <a href="javascript:" class="lg-pager-shortcut-confirm" @click="to(shortcut)">确定</a> -->
            </li>
            <li slot="before" v-if="$slots.before">
                <slot name="before"></slot> 
            </li>
            <!-- <li class="lg-pager-total">共{{pageCount}}页</li> -->
            <li slot="after" v-if="$slots.after">
                <slot name="after"></slot> 
            </li>             
        </ul> 
    </div>
</template>
<script>
var Pager = {
    name: 'pager',
    data() {
        return {
            pager: {
                total: this.total,
                current: this.current
            },
            klass: {
                'lg-pager-left': this.position == 'left',
                'lg-pager-right': this.position == 'right'
            },
            shortcut:''
        }
    },
    props: {
        'totalCount': {
            type: Number,
            default: 0
        },
        'pageSize': {
            type: Number,
            default: 10
        },
        //总页数 不建议使用
        'total': {
            type: Number
        },
        'current': {
            type: Number,
            require: true,
            default: 1
        },
        'position': {
            type: String
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
        //shortCutHandler
        scHandler(pageNum){
            var self = this;
            switch(event.keyCode){
                case 13: 
                    self.to(pageNum)
                break;
                default: 
                break;
            }
        },
        
        to(number) {
            var cur = parseInt(number, 10)
            if (isNaN(cur)) {
                alert('别任性~');
                return;
            }



            if (cur <= this.pageCount && cur >= 1 && cur != this.pager.current) {
                this.calculate(cur);
                this.$emit('to', cur);
            }
        },

        calculate(current) {
            var cPage = Math.floor(current / 1);
            var start = 2;
            var end = this.pageCount - 1;
            if (this.pageCount > this.vol) {
                if (cPage - this.pre > 1) {
                    start = cPage - this.pre;
                    if (cPage + this.next - this.pageCount < 0) {
                        end = cPage + this.next
                    } else {
                        start = end - (this.vol - 3);
                    }
                } else {
                    end = start + this.vol - 3;
                }
            } else if (start > end) {
                end = 1;
            }
            this.pager.start = start;
            this.pager.end = end;
            this.pager.current = cPage;
        },
        update() {
            this.vol = this.volumn;
            this.pre = Math.floor((this.vol - 3) / 2);
            this.next = Math.ceil((this.vol - 3) / 2);
            this.calculate(this.current);
        }
    },
    created() {
        this.update();
    },
    computed: {
        isHead() {
            return this.pager.current == 1;
        },
        isTail() {
            return this.pager.current == this.pageCount;
        },
        showPager() {
            return !!this.totalCount || !!this.pageCount;
        },
        propsUpdate() {
            return this.pageCount + '&' + this.current + '&' + this.volumn;
        },
        //total: 页数、totalCount: 记录数
        pageCount() { // 计算后的页数
            if(this.totalCount) {
                let resultPage = this.totalCount / this.pageSize;
                return Math.ceil(resultPage);
            } else {
                return this.total;
            }
        }
    },
    watch: {
        'propsUpdate': function() {
            this.update();
        }
    }
}
export default Pager;
</script>