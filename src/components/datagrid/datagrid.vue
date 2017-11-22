<template>
    <div style="position:relative">
        <div v-for="table in tables" class="lg-table-scroll" :class="table.klass">
            <basegrid :column="getHead(column, table.ref, fix)" :data="data" :colspan="colspan" :expand="expand" :style="table.style" :ref="table.ref" @action="onAction" @check="onCheck" @checkall="onCheckAll" @radio="onRadio" @switch="onSwitch" @sort="onSort">
                <template v-for="col in column">
                    <div :slot="colname(col)" v-if="$slots[colname(col)]">
                        <slot :name="colname(col)"></slot>
                    </div>
                    <div :slot="cellname(col, i)" v-for="(item, i) in data" v-if="$slots[cellname(col, i)]">
                        <slot :name="cellname(col, i)"></slot>
                    </div>
                </template>
                <template v-for="(item, i) in data">
                    <div :slot="trname(i)" v-if="$slots[trname(i)]">
                        <slot :name="trname(i)"></slot>
                    </div>
                </template>
            </basegrid>
        </div>
    </div>
</template>
<script>
import baseGrid from './basegrid';
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
        'fix': {
            type: Object,
            require: false,
            default () {
                return {};
            }
        },
        'expand': {
            type: Boolean,
            require: false,
            default: false
        }
    },
    data: function() {
        var tables = [{
            klass: 'lg-table-main',
            /*style: 'min-width:1200px',*/
            ref: 'main'
        }];
        this.fix.right && tables.push({
            klass: 'lg-table-fixright',
            style: '',
            ref: 'right'
        })
        this.fix.left && tables.push({
            klass: 'lg-table-fixleft',
            style: '',
            ref: 'left'
        })
        return {
            tables: tables
        };
    },
    computed: {
        column() {
            return this.getColumn(this.head);
        }
    },
    mounted() {
        //synchronous row height of main if (left,right) exist
        if (this.fix.left || this.fix.right) {
            this.setRowHeight();
            var that = this;
            window.onresize = () => {
                that.setRowHeight();
            }
        }
    },
    methods: {
        getColumn(column) {
            var _this = this;
            var result = []; 
            for (var key in column) {
                var temp;
                if (typeof column[key] == 'object') {
                    var style = '';
                    column[key].width ? style = 'width:' + column[key].width : '';
                    temp = Object.assign(column[key], { key: key, style: style });
                } else {
                    temp = {
                        key: key,
                        type: 'field',
                        label: column[key]
                    };
                }
                if (column[key].children) {
                    temp.children = this.getColumn(column[key].children);
                }
                result.push(temp);
            }
            return result;
        },
        getHead(heads, type, fix) {
            if (type == 'right') {
                return this.getFixHead(heads, fix.right, true);
            } else if (type == 'left') {
                return this.getFixHead(heads, fix.left);
            }
            return heads;
        },
        getFixHead(heads, length, reverse) {
            return reverse ? heads.slice(heads.length - length) : heads.slice(0, length);
        },
        setRowHeight() {
            var mainHeight = this.$refs.main[0].getRowHeight();
            var leftHeight = this.fix.left ? this.$refs.left[0].getRowHeight() : mainHeight;
            var rightHeight = this.fix.right ? this.$refs.right[0].getRowHeight() : mainHeight;
            mainHeight.forEach(function(h, i) {
                var temp = [h, leftHeight[i], rightHeight[i]];
                h = temp.sort()[2];
            })
            this.$refs.main[0].setRowHeight(mainHeight);
            this.$refs.left && this.$refs.left[0].setRowHeight(mainHeight);
            this.$refs.right && this.$refs.right[0].setRowHeight(mainHeight);
        },
        onCheck(key, index, result) {
            this.$emit('check', key, index, result);
        },
        onCheckAll(key, result) {
            this.$emit('checkall', key, result);
        },
        onRadio(key, index, result) {
            this.$emit('radio', key, index, result);
        },
        onSwitch(key, index, checked) {
            this.$emit('switch', key, index, checked);
        },
        onSort(key, sortStatus) {
            this.$emit('sort', key, sortStatus);
        },
        onAction(actionName, data) {
            this.$emit('callback:' + actionName, data);
        },
        colname(col) {
            return 'col:' + col.key;
        },
        cellname(col, index) {
            return 'cell:' + col.key + '_' + index;
        },
        trname(index) {
            return 'trexpand:' + index;
        }
    },
    components: {
        'basegrid': baseGrid
    }
}
export default Datagrid;
</script>
<style>
.lg-table thead label {
    color: white;
}

.lg-table thead.multi th {
    border:1px solid white;
}

.lg-table-main,
.lg-table-fixleft,
.lg-table-fixright {
    background-color: white;
}

.lg-table-fixleft,
.lg-table-fixright {
    position: absolute;
    top: 0;
}

.lg-table-main .lg-table {
    table-layout: fixed;
}

.lg-table-fixleft {
    border-right: 1px solid #eee;
}

.lg-table-fixright {
    border-left: 1px solid #eee;
    right: 0;
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

.lg-table a {
    margin-right: 5px;
}

.lg-table .lg-ihollowadd,
.lg-table .lg-ihollowminus {
    line-height: 16px;
    font-size: 20px;
    cursor: pointer;
}
</style>