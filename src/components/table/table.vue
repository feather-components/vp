<template>
    <div class="lg-table-scroll">
        <button class="lg-btn-small" :class="btn.class" :disabled="btn.disabled" v-for="btn in btns" v-html="btn.label" @click="btnClick(btn)"></button>
        <table class="lg-table" :style="noscroll?'':'min-width:1200px'">
            <thead>
                <tr>
                    <th v-for="head in aHead">
                        <span v-if="head.type=='checkbox'" class="lg-checkbox">
                        <input type="checkbox" :id="'vtable_chb'+head.key" @click="checkAll($event,head.key)" :checked="aCheckGroup[head.key].length==aData.length && aData.length"/>
                        <label v-html="head.label" :for="'vtable_chb'+head.key"></label>
                    </span>
                        <span v-else v-html="head.label"></span>
                        <span v-if="head.sort" class="sort" :class="{'up':head.sort.desc===false,'down':head.sort.desc}" @click="sort($event,head.sort)"></span>
                        <vtip v-if="head.tip" :content="head.tip.content" :option="head.tip.option"></vtip>
                    </th>
                </tr>
            </thead>
            <tbody v-if="aData.length>0">
                <tr v-for="(item, index) in aData">
                    <td v-for="(field,key) in thead" class="nowrap">
                        <div v-if="field.type=='bodytip'" style="position:relative">
                            <span v-html="item[key].text" :title="item[key].text"></span>
                            <vtip :content="item[key].tip.content" :option="item[key].tip.option"></vtip>
                        </div>
                        <span v-else-if="field.type=='checkbox'" class="lg-checkbox">
                        <input type="checkbox" :name="key" :id="key+'_'+item[key].id" v-model="aCheckGroup[key]" @click="check($event,key,index)" :value="item[key].id"/><label v-html="item[key].label" :for="key+'_'+item[key].id"></label>
                    </span>
                        <span v-else-if="field.type=='radio'" class="lg-radio">
                        <input type="radio" :name="key" :id="key+'_'+item[key].id" v-model="aRadioGroup[key]" @click="chose($event,key,index)" :value="item[key].id"/><label v-html="item[key].label" :for="key+'_'+item[key].id"></label>
                    </span>
                        <div v-else-if="field.type=='option'">
                            <a v-for="act in item[key]" :href="act.type=='link'?act.url:'javascript:void(0)'" v-html="act.text" @click="act.cb && act.cb(act.arg)" :target="act.blank?'_blank':''"></a>
                        </div>
                        <div v-else-if="field.type=='velement'" v-format="item[key]">
                        </div>
                        <div v-else :title="!field.hideTitle?(item[key] && item[key].title?item[key].title:item[key]):''" v-html="item[key]&& item[key].html?item[key].html:item[key]">
                        </div>
                    </td>
                </tr>
            </tbody>
            <tbody v-if="tdata.length==0">
                <tr>
                    <td :colspan="colspan" v-html="'暂无数据'"></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style>
.lg-table {
    span.sort {
        height: 14px;
        display: inline-block;
        line-height: 20px;
        margin-right: 5px;
        position: relative;
        top: 1px;
        cursor: pointer;
        &:before {
            content: '';
            border-bottom: 6px solid white;
            border-right: 4px solid transparent;
            border-left: 4px solid transparent;
            border-top: none;
            position: absolute;
            top: 0;
        }
        &:after {
            content: '';
            border-top: 6px solid white;
            border-right: 4px solid transparent;
            border-left: 4px solid transparent;
            border-bottom: none;
            position: absolute;
            bottom: 0;
        }
    }
    span.up {
        &:before {
            border-bottom: 7px solid white;
            border-right: 5px solid transparent;
            border-left: 5px solid transparent;
            top: 4px;
        }
        &:after {
            display: none;
        }
    }
    span.down {
        &:before {
            display: none;
        }
        &:after {
            border-top: 7px solid white;
            border-right: 5px solid transparent;
            border-left: 5px solid transparent;
            bottom: 2px;
        }
    }

    .lg-tiphand {
        height: 20px;
        line-height: 20px;
    }
    a {
        margin: 0 5px;
    }
}
</style>
<script>
var Table = {
    name: 'table',
    props: {
        'thead': {
            type: Object,
            require: true
        },
        'tdata': {
            type: Array,
            require: true
        },
        'colspan': {
            type: Number,
            require: true
        },
        'btns': {
            type: Array,
            require: false
        },
        'parent': {
            type: Object,
            require: false
        },
        'noscroll': {
            type: Boolean,
            require: false
        }
    },
    methods: {
        sort: function(e, obj) {
            if (obj.desc === false) {
                this.p.$emit('table_sort', 'desc', obj.arg);
                this.sortClean();
                obj.desc = true;
            } else {
                this.p.$emit('table_sort', 'asc', obj.arg);
                this.sortClean();
                obj.desc = false;
            }
        },
        sortClean: function() {
            for (var head in this.aHead) {
                if (this.aHead[head].sort)
                    this.aHead[head].sort.desc = '';
            }
        },
        checkAll: function(e, key) {
            var _this = this;
            var result = [];
            this.aCheckGroup[key] = [];
            this.tdata.forEach(function(item, i) {
                result.push(item[key]);
                if (e.target.checked) {
                    _this.aCheckGroup[key].push(item[key].id);
                }
            })
            this.p.$emit('table_checkall', e.target.checked, key, result);
        },
        check: function(e, key, i) {
            this.p.$emit('table_check', e.target.checked, key, this.tdata[i][key]);
        },
        chose: function(e, key, i) {
            this.p.$emit('table_radioclick', e.target.checked, key, this.tdata[i][key])
        },
        initCheckbox: function(source) {
            var _this = this;
            for (var key in this.aCheckGroup) {
                this.aCheckGroup[key] = [];
                source.forEach(function(item, i) {
                    if (item[key].checked)
                        _this.aCheckGroup[key].push(item[key].id)
                })
            }
        },
        initRadio: function(source) {
            var _this = this;
            for (var key in this.aRadioGroup) {
                this.aRadioGroup[key] = [];
                source.forEach(function(item, i) {
                    if (item[key].checked)
                        _this.aCheckGroup[key].push(item[key].id)
                })
            }
        },
        btnClick: function(b) {
            this.p.$emit(b.emit, this.aCheckGroup, this.aRadioGroup);
        }
    },
    data: function() {
        var thead = {},
            checkGroup = {},
            radioGroup = {},
            hasCheckbox = false,
            hasRadio = false;
        for (var e in this.thead) {
            thead[e] = {
                type: this.thead[e].type || 'field',
                label: this.thead[e].label || (typeof this.thead[e] == 'string' ? this.thead[e] : ''),
                key: e
            };
            if (this.thead[e].sort) {
                thead[e].sort = {};
                thead[e].sort.desc = this.thead[e].sort.desc || '';
                thead[e].sort.arg = this.thead[e].sort.arg || e;
            }
            if (this.thead[e].tip) {
                thead[e].tip = {};
                thead[e].tip.option = this.thead[e].tip.option || { direction: 'b' };
                thead[e].tip.content = this.thead[e].tip.content || '';
            }
            if (this.thead[e].type == "checkbox") {
                checkGroup[e] = [];
                hasCheckbox = true;
            } else if (this.thead[e].type == "radio") {
                radioGroup[e] = [];
                hasRadio = true;
            }
        }
        var parent = this.parent || this.$parent;
        return {
            aHead: thead,
            aData: this.tdata,
            aCheckGroup: checkGroup,
            aRadioGroup: radioGroup,
            hasCheckbox: hasCheckbox,
            hasRadio: hasRadio,
            p: parent
        }
    },
    created: function() {
        var _this = this;
    },
    watch: {
        'tdata': function(newV) {
            this.aData = newV;
            if (this.hasCheckbox) {
                this.initCheckbox(this.aData);
            }
            if (this.hasRadio) {
                this.initRadio(this.aData);
            }
        }
    },
    directives: {
        format: {
            inserted: function(el, data) {
                var MyComponent = Vue.extend({
                    template: data.value.template,
                    data: function() {
                        return data.value.data
                    },
                    methods: data.value.method ? data.value.method : {},
                    components: data.value.component ? data.value.component : {}
                })
                var component = new MyComponent().$mount();
                el.appendChild(component.$el)
            },
            update: function(el, data) {
                var child = el.childNodes;
                if (child) {
                    child.forEach(function(c) {
                        el.removeChild(c);
                    })
                }
                var MyComponent = Vue.extend({
                    template: data.value.template,
                    data: function() {
                        return data.value.data
                    },
                    methods: data.value.method ? data.value.method : {},
                    components: data.value.component ? data.value.component : {}
                })
                var component = new MyComponent().$mount();
                el.appendChild(component.$el)
            }
        }
    }
}
export default Table;
</script>