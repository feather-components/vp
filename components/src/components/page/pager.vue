
<template>
	<ul :class="['vp-pager', className]">

		<li :class="['vp-pager-item', previousClass]">
			<a href="javascript:;" @click="to(index)">{{previous}}</a>
		</li>

		<li class="vp-pager-item">
			<a href="javascript:">1</a>
		</li>

		<li class="vp-pager-point vp-pager-item">
			<a href="javascript:">···</a>
		</li>
		<li :class="['vp-pager-item', numClass(num)]" v-for="num,index in pageNumbers">
			<a href="javascript:" @click="to(num)">{{ num }}</a>
		</li>
		<li class="vp-pager-point vp-pager-item">
			<a href="javascript:">···</a>
		</li>
		<li class="vp-pager-item">
			<a href="javascript:">{{ total }}</a>
		</li>
		<li :class="['vp-pager-item', nextClass]"><a href="javascript:;" @click="_to(index)" >{{next}}</a></li>

		<li class="vp-pager-shortcut" v-if="showShortCut">
			共&nbsp;{{ this.total }}&nbsp;页，到第 
			<input type="text" /> 页 
			<a href="javascript:" class="vp-pager-shortcut-confirm">确定</a>
		</li>
	</ul>
</template>

<script>
	module.exports = {
		data() {
			return {
				index: 1,
				pageNumbers: [],
			};
		},

		props: {
        	current: {
        		type: Number,
        		default: 1,
        	},

        	total: {
        		type: Number,
        		required: true,
        	},

        	visibleCount: {
        		type: Number,
        		default: 10,
        	},

        	url: String,
        	
        	showFirstBtn: {
        		type: Boolean,
        		default: true,
        	},
        	
        	showLastBtn: {
        		type: Boolean,
        		default: true,
        	},

        	currentClassName: String,

        	showShortCut: {
        		type: Boolean,
        		default: false,
        	},

        	previous: {
        		type: String,
        		default: '上一页',
        	},

        	next: {
        		type: String,
        		default: '下一页',
        	}

        },

        mounted() {
        	var self = this;
        	self.calculate();
        },

        computed: {
        	previousClass() {
        		return 'vp-pager-previous';
        	},

        	nextClass() {
        		return 'vp-pager-next';
        	},

        	className() {
        		return this.class;
        	},

        	
        },

        methods: {
        	to(index) {
        		this.index = index;
        	},

        	numClass(num) {
        		var self = this;
        		if(self.index === num){
        			return 'vp-pager-current'
        		}
        	},

        	calculate() {
        		let self = this;
        		let start = 0;
        		let end = 0;
        		const total = self.total;
        		const visible = self.visibleCount;
        		const middle = Math.ceil(self.visible / 2);
        		const index = self.index;

        		if(total < visible){
        			start = 1;
        			end = visible;
        		} else {
        			if(index <= middle){
        				start = 1;
        				end = visible;
        			}else if(index > middle){
        				if(index + middle <= total){
		                    start = index - middle + 1;
		                    end = index + m;
		                }else{
		                    start = total - visible + 1;
		                    end = total;
		                }
        			}
        		}

        		let i = start;
        		while(i <= end){
        			self.pageNumbers.push(i);
        			i++;
        		} 
        	}
        }
	};
</script>

<style>
	.vp-pager{
	    margin:5px auto;
	    font: 12px Tahoma,Helvetica Neue,Hiragino Sans GB,Microsoft Yahei,sans-serif;
	    overflow:auto;
	}

	.vp-pager li{
	    float: left;
	    list-style: none;
	}

	.vp-pager-item{
	    border: 1px solid #dfdfdf;
	    border-radius: 2px;
	    background-color: #fff;
	    margin: 0px 3px;
	    height: 28px;
	    line-height: 28px;
	    font-size: 12px;
	}

	.vp-pager-item:hover{
	    border-color:  #5986E1;
	}

	.vp-pager-point{
	    border-color: transparent !important;
	    background: transparent !important;
	}

	.vp-pager-item a{
	    display: inline-block;
	    text-align: center;
	    color: #666;
	    height: 28px;
	    min-width: 28px;
	    line-height: 28px;
	    padding:0 5px;
	    text-decoration: none;
	}

	.vp-pager-point a{
	    color: #a3a3a3;
	    letter-spacing: 0px;
	    width: 12px;
	}

	.vp-pager-current{
	    background: #5986E1;
	    border-color:  #5986E1;
	}

	.vp-pager-current a{
	    color: #fff;
	}

	.vp-pager-item-large a{
	    padding: 0px 4px;
	}

	.vp-pager-previous a, .vp-pager-next a{
	    width: 58px;
	}

	.vp-pager-previous a:before{
	    content: '<';
	    font-family: consolas;
	    margin-right: 2px;
	    font-size: 16px;
	}

	.vp-pager-next a:after{
	    content: '>';
	    margin-left: 2px;
	    font-family: consolas;
	    font-size: 16px;
	}

	.vp-pager-current a, .vp-pager-point a{
	    cursor: default;
	}

	.vp-pager-shortcut{
	    height: 24px;
	    color: #a3a3a3;
	    padding: 3px;
	}

	.vp-pager-shortcut input{
	    height: 23px;
	    width: 38px;
	    padding: 0px;
	    outline: none;
	    text-align: center;
	    margin: 0px;
	    border-radius: 3px;
	    border: 1px solid #a3a3a3;
	}

	.vp-pager-shortcut-confirm{
	    border-radius: 3px;
	    background:  #5986E1;
	    text-decoration: none;
	    text-align: center;
	    display: inline-block;
	    color: #fff;
	    width: 50px;
	    height: 24px;
	    line-height: 24px;
	    margin-left: 5px;
	}
</style>