<template>
    <div class="lg-pager" :class="klass" v-if="showPager">     
        <ul>
            <li v-if="totalCount !== 0">共{{ totalCount }}条</li>                    
            <li class="lg-pager-item lg-pager-previous" :class="{'disable': isHead}">
                <a href="javascript:" @click="to(pager.current-1)"></a>
            </li>
            <li class="lg-pager-item" :class="{'lg-pager-current': isHead}">
                <a href="javascript:" @click="to(1)">1</a>
            </li>
            <li class="lg-pager-item lg-pager-dot" v-if="pager.start != 2">
                ...
            </li>
            <li class="lg-pager-item" v-for="n in (pager.end-pager.start + 1)" :class="{'lg-pager-current': pager.current == (pager.start + n - 1)}">
                <a href="javascript:" @click="to(pager.start + n - 1)">{{pager.start + n - 1}}</a>
            </li>
            <li class="lg-pager-item lg-pager-dot" v-if="pager.end < calPage - 1">
                ...
            </li>
            <li class="lg-pager-item" :class="{'lg-pager-current': isTail}" v-if="calPage > 1">
                <a href="javascript:" @click="to(calPage)">{{calPage}}</a>
            </li>
            <li class="lg-pager-item lg-pager-next" :class="{'disable': isTail}">
                <a href="javascript:" @click="to(pager.current + 1)"></a>
            </li>
            <li class="lg-pager-shortcut">
                去第<input type="text" v-model="shortcut">页<a href="javascript:" class="lg-pager-shortcut-confirm" @click="to(shortcut)">确定</a>
            </li>
            <li slot="before" v-if="$slots.before">
                <slot name="before"></slot> 
            </li>
            <li class="lg-pager-total">共{{calPage}}页</li>
            <li slot="after" v-if="$slots.after">
                <slot name="after"></slot> 
            </li>             
        </ul>         
    </div>
</template>
<style>
.lg-pager {
    margin: 5px auto;
    font: 12px Tahoma, Helvetica Neue, Hiragino Sans GB, Microsoft Yahei, sans-serif;
    overflow: hidden;
    height: 50px;
    text-align: center;
}

.lg-pager-left {
    text-align: left;
}

.lg-pager-right {
    text-align: right;
}

.lg-pager ul {
    display: inline-block;
}

.lg-pager li {
    float: left;
    list-style: none;
    margin: 2px 3px;
    line-height: 28px;
    font-size: 12px;
    height: 28px;
}

.lg-pager-item {
    border: 1px solid #dfdfdf;
    border-radius: 2px;
    background-color: #fff;
}

.lg-pager-item:hover {
    border-color: #5986E1;
}

.lg-pager-item.disable a {
    color: #a3a3a3;
}

.lg-pager-item.disable a:after,
.lg-pager-item.disable a:before {
    color: #a3a3a3;
    border-left-color: #a3a3a3;
}

.lg-pager-item.disable:hover {
    border-color: #dfdfdf;
}

.lg-pager-item a {
    display: inline-block;
    text-align: center;
    color: #666;
    height: 28px;
    min-width: 28px;
    line-height: 28px;
    padding: 0 5px;
    text-decoration: none;
}

.lg-pager-total {
    border: 1px solid transparent;
}

.lg-pager-current {
    background: #5986E1;
    border-color: #5986E1;
}

.lg-pager-current a {
    color: #fff;
}

.lg-pager-item-large a {
    padding: 0px 4px;
}

.lg-pager-previous a:before {
    content: '';
    display: inline-block;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 7px solid #666;
    border-right: none;
    -webkit-transform: rotateZ(180deg);
    -moz-transform: rotateZ(180deg);
    -o-transform: rotateZ(180deg);
    -ms-transform: rotateZ(180deg);
    transform: rotateZ(180deg);
}

.lg-pager-next a:after {
    content: '';
    display: inline-block;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 7px solid #666;
    border-right: none;
}

.lg-pager-current a,
.lg-pager-point a {
    currentsor: default;
}

.lg-pager-shortcut {
    height: 24px;
    color: #a3a3a3;
    border: 1px solid transparent;
}

.lg-pager-shortcut input {
    height: 24px;
    width: 38px;
    padding: 0px;
    outline: none;
    text-align: center;
    margin: 0 6px;
    border-radius: 3px;
    border: 1px solid #a3a3a3;
    box-size: border-box;
}

.lg-pager-shortcut-confirm {
    border-radius: 3px;
    background: #5986E1;
    text-decoration: none;
    text-align: center;
    display: inline-block;
    color: #fff;
    width: 50px;
    height: 24px;
    line-height: 24px;
    margin: 0 5px;
}

.lg-pager-dot {
    border: none;
}
</style>
<script>
var Pager = {
    name: 'pager',
    props: {
        'totalCount': {
            type: Number,
            default: 0
        },
        'pageSize': {
            type: Number,
            default: 10
        },
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
        to(current) {
            var cur = Math.floor(Number(current));
            if (isNaN(cur)) {
                alert('别任性~');
                return;
            }
            if (cur <= this.calPage && cur >= 1 && cur != this.pager.current) {
                this.calculate(cur);
                this.$emit('to', cur);
            }
        },
        calculate(current) {
            var current = Math.floor(current / 1);
            var start = 2,
                end = this.calPage - 1;
            if (this.calPage > this.vol) {
                if (current - this.pre > 1) {
                    start = current - this.pre;
                    if (current + this.next - this.calPage < 0) {
                        end = current + this.next
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
            this.pager.current = current;
        },
        update() {
            this.vol = this.volumn;
            this.pre = Math.floor((this.vol - 3) / 2);
            this.next = Math.ceil((this.vol - 3) / 2);
            this.calculate(this.current);
        }
    },
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
    created() {
        this.update();
    },
    computed: {
        isHead() {
            return this.pager.current == 1;
        },
        isTail() {
            return this.pager.current == this.calPage;
        },
        showPager() {
            return !!this.totalCount;
        },
        propsUpdate() {
            return this.total + '&' + this.current + '&' + this.volumn;
        },
        calPage() { // 计算后的页数
            let resultPage = this.totalCount / this.pageSize;
            if(String(resultPage).indexOf('.') > -1) {
                return Math.floor(resultPage) + 1
            } else {
                return resultPage;
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