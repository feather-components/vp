<template>
    <ul :class="['vp-pager', className]" v-show="isShow">
        <li :class="['vp-pager-item', previousClass]" v-if="showPrevious">
            <a href="javascript:;" @click="to(index-1)">{{previous}}</a>
        </li>
        <li class="vp-pager-item" v-if="showFirstBtnCmp">
            <a href="javascript:" @click="to(1)">1</a>
        </li>
        <li class="vp-pager-point vp-pager-item" v-if="showPreviousPoint">
            <a href="javascript:">···</a>
        </li>
        <li :class="['vp-pager-item', numClass(num)]" v-for="num,index in pageNumbers">
            <a href="javascript:" @click="to(num)">{{ num }}</a>
        </li>
        <li class="vp-pager-point vp-pager-item" v-if="showNextPoint">
            <a href="javascript:">···</a>
        </li>
        <li class="vp-pager-item" v-if="showLastBtnCmp">
            <a href="javascript:" @click="to(total)">{{ total }}</a>
        </li>
        <li :class="['vp-pager-item', nextClass]" v-if="showNext">
            <a href="javascript:;" @click="to(index+1)">{{next}}</a>
        </li>
        <li class="vp-pager-shortcut" v-if="showShortCutCmp" >
            <div class="vp-pager-shortcut-item">共&nbsp;{{ this.total }}&nbsp;页，到第&nbsp;</div>
            <input type="text" :value="index" ref="jumpToInput"/>
            <div class="vp-pager-shortcut-item">&nbsp;页</div>
            <a href="javascript:" class="vp-pager-shortcut-confirm" @click="jumpTo()">确定</a>
        </li>
    </ul>
</template>


<script>
module.exports = {
    data () {
        return {
            index: 1,
            total: 0,
            pageNumbers: [],
            isShow: false,
            showPrevious: true,
            showNext: true,
            showPreviousPoint: false,
            showNextPoint: false,
            showFirstBtnCmp: false,
            showLastBtnCmp: false,
            showShortCutCmp: false
        };
    },

    props: {
        current: {
            type: Number,
            default: 1
        },

        /* total: {
            type: Number,
            required: true
        }, */

        visibleCount: {
            type: Number,
            default: 10
        },

        url: String,

        showFirstBtn: {
            type: Boolean,
            default: true
        },

        showLastBtn: {
            type: Boolean,
            default: true
        },

        currentClassName: String,

        showShortCut: {
            type: Boolean,
            default: false
        },

        previous: {
            type: String,
            default: '上一页'
        },

        next: {
            type: String,
            default: '下一页'
        }

    },

    mounted () {
        var self = this;
        self.createItems();
    },

    computed: {
        previousClass () {
            if (this.previous) {
                return 'vp-pager-previous';
            }
            return 'vp-pager-previous vp-pager-w28';
        },

        nextClass () {
            if (this.next) {
                return 'vp-pager-next';
            }
            return 'vp-pager-next vp-pager-w28';
        },

        className () {
            return this['class'];
        }
    },

    methods: {

        setPage (total, index) {
            if (total && total > 0) {
                this.isShow = true;
            } else {
                this.isShow = false;
                return;
            }
            this.index = parseInt(index, 10) || 1;
            this.total = parseInt(total, 10);
            this.createItems();
            this.setControl();
        },

        jumpTo () {
            var index = parseInt(this.$refs.jumpToInput.value, 10);
            this.to(index);
        },

        to (index) {
            if (index === 0 || index > this.total) {
                return;
            }
            this.$emit('to', index);
        },

        numClass (num) {
            var self = this;
            if (self.index === num) {
                return 'vp-pager-current';
            }
            return '';
        },

        setControl () {
            this.showShortCutCmp = this.showShortCut;

            this.showNext = true;
            this.showPrevious = true;
            if (this.total <= this.visibleCount) {
                this.showPreviousPoint = false;
                this.showNextPoint = false;
                this.showFirstBtnCmp = false;
                this.showLastBtnCmp = false;
                this.showShortCutCmp = false;
                if (this.total === 1) {
                    this.showNext = false;
                    this.showPrevious = false;
                }
                return;
            }

            if (this.index > this.total || this.index < 1) {
                return;
            }

            if (this.index === 1 || this.index === 2) {
                // this.showPrevious = false;
                this.showPreviousPoint = false;
                this.showFirstBtnCmp = false;
            }


            if (this.index > Math.ceil(this.visibleCount / 2)) {
                this.showPreviousPoint = true;
                if (this.showFirstBtn) {
                    this.showFirstBtnCmp = true;
                }
            }

            if(this.index === 3 || this.index === 4 || this.index === 5) {
                this.showPreviousPoint = false;
                this.showFirstBtnCmp = false;
            }

            if ((this.total - this.index) >= Math.ceil(this.visibleCount / 2)) {
                this.showNextPoint = true;
                if (this.showLastBtn) {
                    this.showLastBtnCmp = true;
                }
            } else {
                this.showNextPoint = false;
                this.showLastBtnCmp = false;
            }

            if (this.total > 2 && this.index === this.total - 1 || this.index === this.total - 2) {
                this.showNextPoint = false;
            }
        },

        createItems () {
            let self = this;
            let start = 0;
            let end = 0;
            self.pageNumbers = [];
            const total = self.total;
            const visible = self.visibleCount;
            const middle = Math.ceil(visible / 2);
            const index = self.index;
            const m = parseInt(visible / 2, 10);

            if (total < visible) {
                start = 1;
                end = total;
            } else {
                if (index <= middle) {
                    start = 1;
                    end = visible;
                } else if (index > middle) {
                    if (index + middle <= total) {
                        start = index - middle + 1;
                        end = index + m;
                    } else {
                        start = total - visible + 1;
                        end = total;
                    }
                }
            }

            let i = start;
            while (i <= end) {
                self.pageNumbers.push(i);
                i++;
            }
        }
    }
};
</script>
<style>
.vp-pager {
    margin: 5px auto;
    font: 12px Tahoma, Helvetica Neue, Hiragino Sans GB, Microsoft Yahei, sans-serif;
    overflow: auto;
    .vp-pager-w28 a{
        width: 28px;
    }
}

.vp-pager li {
    float: left;
    list-style: none;
}

.vp-pager-item {
    border: 1px solid #dfdfdf;
    border-radius: 2px;
    background-color: #fff;
    margin: 0px 3px;
    height: 28px;
    line-height: 28px;
    font-size: 12px;
}

.vp-pager-item:hover {
    border-color: #5986E1;
}

.vp-pager-point {
    border-color: transparent !important;
    background: transparent !important;
}

.vp-pager-item a {
    display: inline-block;
    text-align: center;
    color: #666;
    height: 28px;
    min-width: 28px;
    line-height: 28px;
    padding: 0 5px;
    text-decoration: none;
}

.vp-pager-point a {
    color: #a3a3a3;
    letter-spacing: 0px;
    width: 12px;
}

.vp-pager-current {
    background: #5986E1;
    border-color: #5986E1;
}

.vp-pager-current a {
    color: #fff;
}

.vp-pager-item-large a {
    padding: 0px 4px;
}

.vp-pager-previous a,
.vp-pager-next a {
    width: 58px;
}

.vp-pager-previous a:before {
    content: '<';
    font-family: consolas;
    margin-right: 2px;
    font-size: 16px;
}

.vp-pager-next a:after {
    content: '>';
    margin-left: 2px;
    font-family: consolas;
    font-size: 16px;
}

.vp-pager-current a,
.vp-pager-point a {
    cursor: default;
}

.vp-pager-shortcut {
    color: #a3a3a3;
}

.vp-pager-shortcut input {
    height: 28px;
    line-height: 28px;
    width: 38px;
    padding: 0px;
    outline: none;
    text-align: center;
    margin: 0px;
    border-radius: 3px;
    border: 1px solid #a3a3a3;
    float: left;
}

.vp-pager-shortcut .vp-pager-shortcut-confirm {
    border-radius: 3px;
    background: #5986E1;
    text-decoration: none;
    text-align: center;
    display: inline-block;
    color: #fff;
    width: 50px;
    height: 28px;
    line-height: 28px;
    margin-left: 5px;
}

.vp-pager-shortcut .vp-pager-shortcut-item {
    float: left;
    height: 28px;
    line-height: 28px;
}
</style>