<template>
    <div class="vp-tl-line" :class="lineClass"> 
        <div class="vp-tl-item" v-for="(n,i) in aNode" :class="nodeClass[i]" :style="nodeStyle">
             
            <div class="vp-tl-point" @click="onClick(i)">
                <slot :name="'icon'+i">
                    <div class="vp-tl-dot">{{n.dotIndex}}</div>
                </slot>
            </div>
            <div class="vp-tl-label">
                <div class="vp-tl-title" @click="onClick(i)">{{n.title}}</div>
                <slot :name="'remark'+i">
                    <div class="vp-tl-remark" v-html="n.remark"></div>
                </slot>
            </div>
        </div>
    </div>
</template>
<style>
.vp-tl-line .vp-tl-item {
    position: relative;
}

.vp-tl-item.vp-tl-right:before,
.vp-tl-item.vp-tl-left:before {
    content: '';
    position: absolute;
    top: 50%;
    right: -35px;
    left: 35px;
    margin-top: -1px;
    margin-left: 4px;
    margin-right: 49px;
    border-bottom: 2px dashed rgba(0, 0, 0, 0.43);
}

.vp-tl-item.vp-tl-down:before,
.vp-tl-item.vp-tl-up:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    height: 50%;
    margin-top: 4px;
    margin-left: -1px;
    border-left: 2px dashed #108ee9;
}

.vp-tl-item.vp-tl-active:before {
    background-color: #108ee9;
    border-bottom: 2px dashed #108ee9;
}

.vp-tl-item.vp-tl-cur.vp-tl-left:before,
.vp-tl-line .vp-tl-item.vp-tl-cur.vp-tl-up:before {
    background-color: #108ee9;
}

.vp-tl-item.vp-tl-cur:before {
    background-color: transparent;
    border-bottom: 2px dashed rgba(0, 0, 0, 0.43);
}

.vp-tl-item.vp-tl-last:before {
    display: none;
}

.vp-tl-point {
    width: 24px;
    height: 24px;
    position: relative;
    top: 50%; 
    margin-top: -13px;
    z-index: 1;
    cursor: pointer;
}

.vp-tl-line-small .vp-tl-point {
    transform: scale(0.7, 0.7);
    margin-left: -2px;
}

.vp-tl-dot {
    border: 1px solid rgba(0, 0, 0, 0.43);
    border-radius: 13px;
    background-color: white;
    height: 100%;
    text-align: center;
    line-height: 24px;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.43);
}

.vp-tl-item.vp-tl-active .vp-tl-point .vp-tl-dot {
    border: 1px solid #108ee9;
    color: #108ee9;
}

.vp-tl-item.vp-tl-cur .vp-tl-point .vp-tl-dot {
    background-color: #108ee9;
    color: white;
}

.vp-tl-line-small .vp-tl-dot {
    font-size: 14px;
}


.vp-tl-label {
    position: relative;
    top: 50%;
    left: 35px;
    margin-top: -26px;
    line-height: 30px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.43);
    font-weight: bold;
    word-wrap: break-word;
}

.vp-tl-line-small .vp-tl-label {
    margin-left: -14px;
}

.vp-tl-item.vp-tl-down .vp-tl-label,
.vp-tl-item.vp-tl-up .vp-tl-label {
    position: relative;
    top: 0;
    left: 50%;
    padding-top: 0;
    padding-left: 20px;
    align-self: center;
    text-align: left;
}

.vp-tl-title {
    cursor: pointer;
    display: inline;
    padding-right: 12px;
    background-color: white;
}

.vp-tl-remark {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.23);
    line-height: 16px; 
}

.vp-tl-horizon {
    height: 100px;
    display: inline-flex;
}

.vp-tl-horizon .vp-tl-item {
    display: inline-block;
    height: 100px;
}

.vp-tl-flex {
    display: flex;
}

.vp-tl-flex .vp-tl-item {
    flex: 1;
    align-items: stretch;
} 

.vp-tl-auto .vp-tl-label{
    padding: 0 35px;
    left: auto;
}
</style>
<script>
var nodeStatus = {
    'FINISHED': 0,
    'CURRENT': 1,
    'TODO': 2
}
var Timeline = {
    name: 'timeline',
    props: {
        'node': {
            type: Array,
            require: true
        },
        'current': {
            type: Number,
            require: false,
            default: 0
        },
        'width': {
            require: false,
            default: 'flex' //flex,auto,...px
        },
        'direction': {
            type: String,
            require: false,
            default: 'right'
        },
        'type': {
            type: String,
            require: false,
            default: 'dot'
        },
        size: {
            type: String,
            require: false,
            default: null
        }
    },
    data() {
        var data = {
            klass: '',
            style: ''
        }

        // if (opt.width) {
        //     data.style = 'width:' + opt.width + ';';
        // }
        // if (opt.height) {
        //     data.style += 'height:' + opt.height + ';';
        // }

        // if ((dir == 'up' || dir == 'down') && opt.autoHeight) { //vertical line can set self-adapting height
        //     data.style = "height:auto;padding:15px 0;";
        // } else if (opt.autoWidth) { //horizontal line can set self-adapting width
        //     data.style = "width:auto;padding:0 15px;";
        // }

        return data;
    },
    computed: {
        cur() {
            return this.current || 0;
        },
        aNode() {
            //if reverse
            //:todo
            var _this = this;
            var aNode = [];

            this.node.forEach(function(node, i) {
                if (typeof node != 'object') {
                    node = {
                        title: node
                    }
                }
                node.status = _this.getStatus(i, _this.cur);
                _this.type == 'number' && (node.dotIndex = i + 1) || (node.dotIndex = '');
                node.klass = _this.getIcon();
                aNode.push(node);
            })
            if (this.direction == 'left' || this.direction == 'up') {
                aNode = aNode.reverse();
            }
            return aNode;
        },
        nodeClass: (vm) => {
            var result = [];
            vm.node.forEach(function(node, i) {
                var klass = ['vp-tl-' + vm.direction];
                i == 0 && klass.push('vp-tl-first');
                i == vm.node.length - 1 && klass.push('vp-tl-last');
                var index = vm.direction == 'left' || vm.direction == 'up' ? vm.node.length - i - 1 : i;
                index <= vm.cur && klass.push('vp-tl-active');
                index == vm.cur && klass.push('vp-tl-cur');
                result.push(klass.join(' '));
            })
            return result;
        },
        nodeStyle: (vm) => {
            if (vm.width.indexOf('px')) {
                return 'width:' + vm.width;
            }
            return '';
        },
        lineClass: (vm) => {
            return { 'vp-tl-horizon': vm.direction == 'right' || vm.direction == 'left', 'vp-tl-line-small': vm.size == 'small', 'vp-tl-flex': !vm.width || vm.width == 'flex' , 'vp-tl-auto': vm.width == 'auto' };
        }
    },
    methods: {
        getStatus(index, current) {
            return index == current ? nodeStatus.CURRENT : (index > current ? nodeStatus.TODO : nodeStatus.FINISHED);
        },
        getIcon(status) {

            switch (status) {
                case nodeStatus.FINISHED:
                    break;
                case nodeStatus.CURRENT:
                    break;
                default:
                    break;
            }
        },
        onClick(index) {
            this.$emit('nodeClick', index);
        }
    }
}
export default Timeline;
</script>