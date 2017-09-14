<template>
    <div class="lg-table-scroll" oncontextmenu="return false">
        <table class="lg-table" :style="scroll ? 'min-width:1200px' : ''">
            <thead>
                <tr>
                    <th v-for="head in aHead">
                        <slot name="header" :data="head">
                            <span v-if="head.type == 'checkbox'" class="lg-checkbox">
                                <input type="checkbox" :id="'grid_chb'+head.key" @click="checkAll(head.key)" :value="head.key" v-model="isAllCheck"/>
                                <label class="test" v-html="head.label" :for="'grid_chb'+head.key">{{headerFormat(head)}}</label>
                            </span>
                            <span v-else-if="head.type == 'sort'" class="grid-sort" :class="{'up':head.asc===true,'down':head.asc===false}" @click="sort(head,head.asc)">{{headerFormat(head)}}</span>
                            <span v-else>{{headerFormat(head)}}</span>
                        </slot>
                    </th>
                </tr>
            </thead>
            <tbody v-if="aData.length>0">
                <tr v-for="(item, index) in aData">
                    <td v-for="head in aHead" class="nowrap">
                        <slot name="cell" :title="item[head.key]" :data="{item: item, key: head.key}" @click="cellClick(item)">
                            <span v-if="head.type == 'checkbox' && item[head.key] && !item[head.key].disable" class="lg-checkbox">
                                <input type="checkbox" :value="item[head.key].value" :id="'grid_chb' + head.key + '_' + index" @click="check(head.key, index)" v-model="checkResults[head.key]"/>
                                <label :for="'grid_chb' + head.key + '_' + index"></label>
                            </span>
                            <span v-else-if="head.type == 'switch' && item[head.key] != 'undefined' && !item[head.key].disable" class="lg-switch">
                                <input type="checkbox"  :id="'grid_swh' + head.key + '_' + index" @click="switcher(head.key, index, item[head.key])" v-model="item[head.key]"/>
                                <label :for="'grid_swh' + head.key + '_' + index">{{head.off || 'OFF'}}</label>
                                <label :for="'grid_swh' + head.key + '_' + index">{{head.on || 'ON'}}</label>
                            </span>
                            <a v-else-if="head.type == 'option'" v-for="act in item[head.key]" :href="act.type == 'link' ? act.url : 'javascript:void(0)'" :target="act.blank?'_blank':''" @click="action(act.name,act.arg)">{{act.text}}</a>
                            <span v-else>{{cellFormat(item, head.key)}}</span>
                        </slot>
                    </td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr>
                    <td :colspan="colspan">暂无数据</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style>
.lg-table thead label {
    color: white;
}

.lg-table span.grid-sort {
    display: inline-block;
    line-height: 13px;
    margin-right: 5px;
    position: relative;
    top: 1px;
    cursor: pointer;
}

.lg-table span.grid-sort:before {
    content: '';
    border-bottom: 6px solid white;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
    border-top: none;
    position: absolute;
    top: 0;
    right: -10px;
}

.lg-table span.grid-sort:after {
    content: '';
    border-top: 6px solid white;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
    border-bottom: none;
    position: absolute;
    bottom: 0;
    right: -10px;
}

.lg-table span.up:before {
    border-bottom: 7px solid white;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    top: 4px;
}

.lg-table span.up:after {
    display: none;
}

.lg-table span.down:before {
    display: none;
}

.lg-table span.down:after {
    border-top: 7px solid white;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    bottom: 2px;
}
.lg-table a{
    margin-right: 5px;
}
</style>
<script>
var Datagrid = {
    name: 'table',
    props: {
        'head': {
            type: Object,
            require: true
        },
        'data': {
            type: Array,
            require: true
        },
        'colspan': {
            type: Number,
            require: true
        },
        'parent': {
            type: Object,
            require: false
        },
        'scroll': {
            type: Boolean,
            require: false,
            default: true
        },
        'headerFormat': {
            type: Function,
            require: false,
            default: function(data) {
                return data.label;
            }
        },
        'cellFormat': {
            type: Function,
            require: false,
            default: function(data, key) {
                if (data[key]) {
                    if (typeof data[key] != 'function' && typeof data[key] != 'object') {
                        return data[key];
                    } else if (data[key].label) {
                        return data[key].label;
                    }
                }
            }
        }
    },
    data: function() {
        var parent = this.parent || this.$parent;
        var checkResults = {};
        var isAllCheck = [];
        var _this = this;
        for (var key in this.head) {
            var type = this.head[key].type;
            if (type == 'checkbox' || type == 'radio') {
                checkResults[key] = [];
                var count = 0;
                _this.data.forEach(function(line, i) {
                    line[key] && line[key].checked && checkResults[key].push(line[key].value);
                    (line[key].checked || line[key].disable) && (count++);
                })
                _this.data.length && _this.data.length == count && isAllCheck.pus(key);
            }
        }
        return {
            p: parent,
            checkResults: checkResults,
            isAllCheck:isAllCheck
        }
    },
    computed: {
        aData() {
            return this.data;
        },
        aHead() {
            var header = [];
            for (var key in this.head) {
                if (typeof this.head[key] == 'object') {
                    header.push(Object.assign(this.head[key], { key: key }));
                } else {
                    header.push({
                        key: key,
                        type: 'field',
                        label: this.head[key]
                    })
                }
            }
            return header;
        }
    },
    methods: {
        cellClick(data) {
            this.$emit('grid:click', data);
        },
        checkAll(key) {
            var _this = this;
            var disableLength = this.aData.filter(function(item, i) {
                return item[key].disable;
            }).length;
            var length = this.checkResults[key].length + disableLength;
            this.checkResults[key] = [];            
            if(length != this.aData.length) {
                this.aData.forEach(function(line) {
                    !line[key].disable && _this.checkResults[key].push(line[key].value);
                })                 
            }else{ 
            }
            this.$emit('grid:checkall', key, this.checkResults[key].join(','));
            this.computeCheckAll(key);
        },
        computeCheckAll(key){
            var disableLength = this.aData.filter(function(item, i) {
                return item[key].disable;
            }).length;
            var length = this.checkResults[key].length + disableLength;
            var index=this.isAllCheck.indexOf(key);
            if(length != this.aData.length){                
                index>-1&&this.isAllCheck.splice(index,1);
            }
            else{
                this.isAllCheck.push(key);
            }
        },
        check(key, index) {
            this.$emit('grid:checkbox', key, index, this.checkResults[key].join(','));
            this.computeCheckAll(key);
        },
        switcher(key, index, reuslt) {
            this.$emit('grid:switch', key, index, reuslt);
        },
        sort(head, asc) {
            var next = asc === true ? false : (asc === false ? '' : true);
            head.asc = next;
            this.$emit('grid:sort', head.key, next);
        },
        action(name, arg) {
            this.$emit('grid:action', name, arg)
        }
    }
}
export default Datagrid;
</script>