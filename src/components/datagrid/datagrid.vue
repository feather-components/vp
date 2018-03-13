<template>
    <div style="position:relative">
        <div v-for="table in tables" class="lg-table-scroll" :class="table.klass">
            <basegrid 
                :columns="getHead(columns, table.fixType, fix)" 
                :rows="rowList" :expand="expand" 
                :style="table.style" :fixType="table.fixType" 
                @action="onAction" @check="onCheck" @checkall="onCheckAll" @radio="onRadio" @switch="onSwitch" @sort="onSort" @expand="handleExpand"
                :ref="table.fixType">
                <template v-for="col in columns">
                    <div :slot="colName(col)" v-if="$slots[colName(col)]">
                        <slot :name="colName(col)"></slot>
                    </div>
                    <div :slot="cellContent(col, rowIndex)" v-for="(item, rowIndex) in rowList" v-if="$slots[cellContent(col, rowIndex)]">
                        <slot :name="cellContent(col, rowIndex)"></slot>
                    </div>
                </template>
                <template v-for="(item, i) in rowList">
                    <div :slot="trContent(i)" v-if="$slots[trContent(i)]">
                        <slot :name="trContent(i)"></slot>
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
        //不建议使用
        'data': {
            type: [Array, Boolean],
            require: false,
            default: false
        },
        //grid 数据列表
        'rows': {
            type: [Array, Boolean],
            require: false,
            default: false
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
            type: [Boolean, Object],
            require: false,
            default: false
        }
    },
    data: function() {
        var tables = [{
            klass: 'lg-table-main',
            /*style: 'min-width:1200px',*/
            fixType: 'main'
        }];
        this.fix.right && tables.push({
            klass: 'lg-table-fixright',
            style: '',
            fixType: 'right'
        })
        this.fix.left && tables.push({
            klass: 'lg-table-fixleft',
            style: '',
            fixType: 'left'
        })
        return {
            tables: tables
        };
    },
    computed: {
        columns() {
            return this.getColumns(this.head);
        },
        //兼容 rows, data
        rowList() {
            return this.rows || this.data;
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
        getColumns(headDefinition) {
            var result = []; 
            for (var key in headDefinition) {
                var temp;
                if (typeof headDefinition[key] == 'object') {
                    var style = '';
                    headDefinition[key].width ? style = ('width:' + headDefinition[key].width + ';' ) : '';
                    headDefinition[key].style ? style += (headDefinition[key].style) : '';
                    
                    temp = Object.assign(headDefinition[key], { key: key, style: style });
                } else {
                    temp = {
                        key: key,
                        type: 'field',
                        label: headDefinition[key]
                    };
                }
                if (headDefinition[key].children) {
                    temp.children = this.getColumns(headDefinition[key].children);
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
        onCheck(key, index, result, checkedRows, currentRow) {
            this.$emit('check', key, index, result, checkedRows, currentRow);
        },
        onCheckAll(key, result, checkedRows) {
            this.$emit('checkall', key, result, checkedRows);
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
        colName(col) {
            return 'col:' + col.key;
        },
        cellContent(col, index) {
            return 'cell:' + col.key + '_' + index;
        },
        trContent(index) {
            return 'trexpand:' + index;
        },
        handleExpand(index, data, isExpand){
            if(Object.prototype.toString.call(data) == '[object Array]'){
                this.$emit('expand', index, data)
            }else {
                this.$emit('expand', index, data, isExpand)
            }
        }
    },
    components: {
        'basegrid': baseGrid
    }
}
export default Datagrid;
</script>