<template>
    <table class="lg-table">
        <thead :class="{'multi' : aColumn.length > 1}">
            <tr v-for="(columns, index) in aColumn">
                <th v-if="expand && aData.length > 0 && index == 0" style="width:50px" :rowspan="aColumn.length">
                    <span class="lg-checkbox-plain">
                        <input type="checkbox" :id="uid('exp')" @click="onExpandAll()" value="exp" v-model="isAllExpand"/>
                            <label :for="uid('exp')"><span class="lg-i lg-color-sys" :class="expklass('all')"></span></label>
                    </span>
                </th>
                <th v-for="(col,i) in columns" :style="col.style" :colspan="col.colspan || 1" :rowspan="col.rowspan || 1">
                    <slot :name="colname(col)">
                        <span v-if="isType('checkbox',col,true)" class="lg-checkbox">
                            <input type="checkbox" :id="uid(col)" @click="onCheckAll(col.key)" :value="col.key" v-model="isAllCheck"/>
                            <label v-html="col.label" :for="uid(col)"></label>
                        </span>
                        <span v-else-if="isType('sort',col,true)" class="grid-sort" :class="col.klass" @click="onSort(col,col.asc,i)" v-html="headerFormat(col)"></span>
                        <span v-else v-html="headerFormat(col)"></span>
                    </slot>
                </th>
            </tr>
        </thead>
        <tbody v-if="aData.length > 0">
            <template v-for="(item, i) in aData">
                <tr v-line="{lineElements,i}">
                    <td v-if="expand">
                        <span class="lg-checkbox-plain">
                            <input type="checkbox" :value="'exp'+i" :id="uid('exp',i)" @click="onExpand(i)" v-model="checkResults.exp"/>
                            <label :for="uid('exp',i)"><span class="lg-i lg-ihollowadd lg-color-sys" :class="expklass(i)"></span></label>
                        </span>
                    </td>
                    <td v-for="col in aLeafColumn" class="nowrap">
                        <slot :name="cellname(col, i)" :title="item[col.key]">
                            <span v-if="isType('checkbox',col,item[col.key])" class="lg-checkbox">
                                <input type="checkbox" :value="item[col.key].value" :id="uid(col,i)" @click="onCheck(col.key, i)" v-model="checkResults[col.key]"/>
                                <label :for="uid(col,i)"></label>
                            </span>
                            <span v-if="isType('radio',col,item[col.key])" class="lg-radio">
                                <input type="radio" :name="uid(col)" :id="uid(col,i)" v-model="checkResults[col.key]" @click="onRadio(col.key,i)" :value="item[col.key].value"/><label v-html="item[col.key].label" :for="uid(col,i)"></label> 
                            </span>
                            <span v-else-if="isType('switch',col,item[col.key])" class="lg-switch">
                                <input type="checkbox" :id="uid(col,i)" @click="onSwitch(col.key, i, item[col.key])" v-model="item[col.key].checked"/>
                                <label :for="uid(col,i)">{{col.off || 'OFF'}}</label>
                                <label :for="uid(col,i)">{{col.on || 'ON'}}</label>
                            </span>
                            <a v-else-if="isType('action',col,true)" v-action="{act,item}" v-for="(act,key) in col.actions">{{key}}</a>
                            <span v-else v-html="cellFormat(item, col.key)"></span>
                        </slot>
                    </td>
                </tr>
                <tr v-if="expand && isExpand(i)">
                    <td :colspan="colspan+1">
                        <slot :name="trname(i)">
                            <div v-html="item.$expand()"></div>
                        </slot>
                    </td>
                </tr>
            </template>
        </tbody>
        <tbody v-else>
            <tr>
                <td :colspan="colspan">暂无数据</td>
            </tr>
        </tbody>
    </table>
</template>
<script>
var BaseGrid = {
    name: 'basegrid',
    props: {
        'column': {
            type: Array,
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
        },
        'expand': {
            type: Boolean,
            require: false,
            default: false
        }
    },
    data: function() {
        var checkResults = {},
            isAllCheck = [],
            isAllExpand = false,
            row = this.data.length;
        var _this = this;
        this.column.forEach(function(col, i) {
            var type = col.type;
            var key = col.key;
            if (type == 'checkbox') {
                checkResults[key] = [];
                var count = 0;
                _this.data.forEach(function(line, i) {
                    line[key] && line[key].checked && checkResults[key].push(line[key].value);
                    (line[key].checked || line[key].disable) && (count++);
                })
                _this.data.length && _this.data.length == count && isAllCheck.push(key);
            } else if (type == 'radio') {
                checkResults[key] = '';
                _this.data.forEach(function(line, i) {
                    line[key] && line[key].checked && (checkResults[key] = line[key].value)
                })
            }
        })
        if (this.expand) {
            checkResults.exp = [];
        }
        return {
            checkResults: checkResults,
            isAllCheck: isAllCheck,
            isAllExpand: isAllExpand,
            lineElements: new Array(row),
            perfix: new Date().getTime() + ''
        }
    },
    computed: {
        aData() {
            return this.data;
        },
        aLeafColumn() {
            return this.getLeaves(this.column).leaves;
        },
        aColumn() {
            var level = this.getLeaves(this.column).level;
            var trLine = new Array();
            for (var i = 0; i < level; i++) {
                trLine[i] = new Array();
            }
            this.getColumnLine(this.column, 0, trLine);
            return trLine;
        }
    },
    methods: {
        //events
        onClick(data) {
            this.$emit('cell:click', data);
        },
        onCheck(key, index) {
            this.$emit('check', key, index, this.checkResults[key].join(','));
            this.computeCheckAll(key);
        },
        onCheckAll(key) {
            var _this = this;
            var disableLength = this.aData.filter(function(item, i) {
                return item[key].disable;
            }).length;
            var length = this.checkResults[key].length + disableLength;
            this.checkResults[key] = [];
            if (length != this.aData.length) {
                this.aData.forEach(function(line) {
                    !line[key].disable && _this.checkResults[key].push(line[key].value);
                })
            } else {}
            this.$emit('checkall', key, this.checkResults[key].join(','));
            this.computeCheckAll(key);
        },
        onRadio(key, index) {
            this.$emit('radio', key, index, this.checkResults[key]);
        },
        onSwitch(key, index, checked) {
            this.$emit('switch', key, index, checked);
        },
        onSort(head, asc, index) {
            var next = asc === true ? false : (asc === false ? '' : true);
            head.asc = next;
            head.klass = next === true ? 'up' : (next === false ? 'down' : '');
            this.$emit('sort', head.key, next);
        },
        onExpandAll() {
            var _this = this;
            var length = this.checkResults.exp.length;
            this.checkResults.exp = [];
            if (length != this.aData.length) {
                this.aData.forEach(function(line, i) {
                    _this.checkResults.exp.push('exp' + i);
                })
            } else {}
            this.$emit('expandall');
            this.computeExpandAll();
        },
        onExpand(index) {
            this.$emit('expand', index, this.checkResults.exp.join(','));
            this.computeExpandAll();
        },
        getRowHeight() {
            var result = [];
            this.lineElements.forEach(function(element) {
                //clean style to get real height;
                var currentHeight = element.offsetHeight;
                element.style.height = 'auto';
                result.push(element.offsetHeight);
                element.style.height = currentHeight + 'px';
            })
            return result;
        },
        setRowHeight(heights) {
            var _this = this;
            heights.forEach(function(h, i) {
                _this.lineElements[i].style.height = h + 'px';
            })
        },
        //-----util------------------------------
        uid(col, index) {
            return this.perfix + (col.key ? col.key : col) + '_' + index;
        },
        colname(col) {
            return 'col:' + col.key;
        },
        cellname(col, index) {
            return 'cell:' + col.key + '_' + index;
        },
        trname(index) {
            return 'trexpand:' + index;
        },
        expklass(index) {
            if (index == 'all') {
                return this.isAllExpand ? 'lg-ihollowminus' : 'lg-ihollowadd';
            }
            return this.isExpand(index) ? 'lg-ihollowminus' : 'lg-ihollowadd';
        },
        isExpand(index) {
            return this.checkResults.exp.indexOf('exp' + index) >= 0;
        },
        isType(typeName, col, cell) {
            return col.type && col.type == typeName && cell && !cell.disable;
        },
        computeCheckAll(key) {
            var disableLength = this.aData.filter(function(item, i) {
                return item[key].disable;
            }).length;
            var length = this.checkResults[key].length + disableLength;
            var index = this.isAllCheck.indexOf(key);
            if (length != this.aData.length) {
                index > -1 && this.isAllCheck.splice(index, 1);
            } else {
                this.isAllCheck.push(key);
            }
        },
        computeExpandAll() {
            var length = this.checkResults.exp.length;
            if (length != this.aData.length) {
                this.isAllExpand = false;
            } else {
                this.isAllExpand = true;
            }
        },
        getLeaves(column) {
            var _this = this;
            var leaves = [];
            var level = 0;
            column.forEach(function(col) {
                if (col.children) {
                    var child = _this.getLeaves(col.children);
                    leaves = leaves.concat(child.leaves);
                    level = level > child.level ? level : child.level;
                } else {
                    leaves.push(col);
                }
            })
            level++;
            return { leaves, level };
        },
        getColumnLine(column, level, result) {
            // debugger;
            var _this = this;
            column.forEach(function(col) {
                result[level].push(col);
                if (col.children) {
                    _this.getColumnLine(col.children, level + (col.rowspan || 1), result);
                }
            })
        }
    },
    directives: {
        line: { //suport auto row height
            inserted(el, { value }) {
                value.lineElements[value.i] = el;
                value.lineElements[value.i].expand = false;
            },
            update(el, { value }) {
                value.lineElements[value.i] = el;
                value.lineElements[value.i].expand = false;
            }
        },
        action: { //enable dynamic action
            inserted(el, { value }, vnode) {
                var _this = this;
                var action = value.act,
                    data = value.item;
                if (action.disable && action.disable(data)) {
                    el.style.display = "none";
                    return;
                }
                if (action.type == 'link') {
                    var arg = action.render(data);
                    if (arg) {
                        el.setAttribute('href', arg.url);
                        el.setAttribute('target', arg.blank ? '_blank' : '');
                    }
                } else if (action.type == 'callback') {
                    el.setAttribute('href', 'javascript:void(0);');
                    el.addEventListener('click', function() {
                        vnode.context.$emit('action', action.eventName, data);
                    })
                }
            },
            update(el, { value }) {}
        }
    }
}

export default BaseGrid;
</script>