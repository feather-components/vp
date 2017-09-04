<template>
    <div class="lg-pager" :class="{'lg-pager-left':position=='left','lg-pager-center':position=='center'}" v-if="pager.total">
        <ul>
            <li class="lg-pager-item" v-if="pager.page>max" :class="{'disable':pager.current==1}">
                <a href="javascript:" @click="to(1,pager.current==1)">首页</a>
            </li>
            <li class="lg-pager-previous lg-pager-item" :class="{'disable':pager.current==1}">
                <a href="javascript:" @click="to(pager.current-1,pager.current==1)"></a>
            </li>
            <li class="lg-pager-item" :class="{'lg-pager-current':pager.current==1}">
                <a href="javascript:" @click="to(1,pager.current==1)" v-html="1"></a>
            </li>
            <li class="lg-pager-item lg-pager-dot" v-if="pager.start!=2">
                ...
            </li>
            <li v-for="n in (pager.end-pager.start+1)" class="lg-pager-item" :class="{'lg-pager-current':pager.current==(pager.start+n-1)}" v-if="pager.page>0">
                <a href="javascript:" @click="to(pager.start+n-1,pager.current==(pager.start+n-1))" v-html="pager.start+n-1"></a>
            </li>
            <li class="lg-pager-item lg-pager-dot" v-if="pager.end<pager.page-1">
                ...
            </li>
            <li class="lg-pager-item" :class="{'lg-pager-current':pager.current==pager.page}" v-if="pager.page>1">
                <a href="javascript:" @click="to(pager.page)" v-html="pager.page"></a>
            </li>
            <li class="lg-pager-next lg-pager-item" :class="{'disable':pager.current==pager.page}">
                <a href="javascript:" @click="to(pager.current+1,pager.current==pager.page)"></a>
            </li>
            <li class="lg-pager-item" v-if="pager.page>max" :class="{'disable':pager.current==pager.page}">
                <a href="javascript:" @click="to(pager.page,pager.current==pager.page)">尾页</a>
            </li>
            <li class="lg-pager-shortcut">去第
                <input type="text" v-model="shortcut"> 页<a href="javascript:" class="lg-pager-shortcut-confirm" @click="to(shortcut)">确定</a>每页
                <select v-model="pager.size" @change="select(pager.size)">
                    <option v-for="o in opt" :value="o" v-html="o+'条'"></option>
                </select>共{{pager.page}}页，{{pager.total}}条
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
        text-align: right;
    }

    .lg-pager-left {
        text-align: left;
    }

    .lg-pager-center {
        text-align: center;
    }

    .lg-pager ul {
        display: inline-block;
    }

    .lg-pager li {
        float: left;
        list-style: none;
    }

    .lg-pager-item {
        border: 1px solid #dfdfdf;
        border-radius: 2px;
        background-color: #fff;
        margin: 2px 3px;
        height: 28px;
        line-height: 28px;
        font-size: 12px;
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
        padding: 5px;
    }

    .lg-pager-shortcut input,
    .lg-pager-shortcut select {
        height: 24px;
        width: 38px;
        padding: 0px;
        outline: none;
        text-align: center;
        margin: 0px;
        border-radius: 3px;
        border: 1px solid #a3a3a3;
        box-size: border-box;
    }

    .lg-pager-shortcut select {
        padding: 0 3px;
        width: auto;
        margin: 0 5px;
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
        name:'pager',
        props: {
            'model': {
                type: Object,
                require: true
            },
            'callback': {
                type: Function
            },
            'position': {
                type: String
            },
            'max': {
                type: Number,
                default: 10,
                validator: function(value) {
                    return value > 5;
                }
            },
            'option': {
                type: Array
            }
        },
        methods: {
            to: function(page, disable) {
                if (disable)
                    return;
                if (isNaN(Number(page))) {
                    alert('别任性~');
                    this.shortcut = '';
                    return;
                }
                if (Number(page) > this.pager.page)
                    page = this.pager.page;
                if (Number(page) < 1)
                    page = 1;
                this.calc(this.pager, page);
                this.callback && this.callback(page, this.pager.size);
                this.shortcut = '';
            },
            calc: function(pager, current) {
                var current = Math.floor(current / 1);
                var start = 2, end = pager.page - 1;
                if (pager.page > this.m) {
                    if (current - this.pre > 1) {
                        start = current - this.pre;
                        if (current + this.next - pager.page < 0) {
                            end = current + this.next
                        } else {
                            start = end - (this.m - 3);
                        }
                    } else {
                        end = start + this.m - 3;
                    }
                } else if (start > end) {
                    end = 1;
                }
                pager.start = start;
                pager.end = end;
                pager.current = current;
            },
            select: function(size) {
                this.update();
                this.to(1);
            },
            update: function(size) {
                if (size) {
                    this.pager.size = size;
                }
                this.pager.total = this.model.total;
                this.pager.current = this.model.current;
                this.pager.page = Math.ceil(this.pager.total / this.pager.size);
                this.calc(this.pager, this.pager.current);
            }
        },
        data: function() {
            var option = this.option ? this.option : [10, 20, 50];
            var size = option.indexOf(this.model.size) >= 0 ? this.model.size : option[0];
            return {
                pager: {
                    page: Math.ceil(this.model.total / size),
                    size: size,
                    total: this.model.total,
                    current: this.model.current
                },
                shortcut: '',
                m: this.max,
                pre: Math.floor((this.max - 3) / 2),
                next: Math.ceil((this.max - 3) / 2),
                opt: option
            }
        },
        created: function() {
            this.calc(this.pager, this.pager.current);
        },
        watch: {
            model: {
                handler() {
                    this.update(this.model.size);
                },
                deep: true
            }
        }
    } 
    export default Pager;
</script>
