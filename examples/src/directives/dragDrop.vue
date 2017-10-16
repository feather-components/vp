<template>
	<div>
		<div id="dd">
			<div id="div2" v-dd>
				<div class="list1" style="background:#D8BFD8">1</div>
				<div class="list1" style="background:#EE7600">2</div>
				<div class="list1" style="background:#BFEFFF">3</div>
				<div class="list1" style="background:#9ACD32">4</div>
				<div class="list1" style="background:#8F8F8F">5</div>
				<div class="list1" style="background:#8B5A00">6</div>
			</div>
			<div id="div3" v-dd>
				<div class="list2" style="background:#D8BFD8">1111</div>
				<div class="list2" style="background:#EE7600">2222</div>
				<div class="list2" style="background:#BFEFFF">3333</div>
				<div class="list2" style="background:#9ACD32">4444</div>
				<div class="list2" style="background:#8F8F8F">5555</div>
				<div class="list2" style="background:#8B5A00">6666</div>
			</div>
			<div id="div4" v-dd>
				<div class="list3" style="background:#D8BFD8">1111111111111111</div>
				<div class="list3" style="background:#EE7600">2222222222222222</div>
				<div class="list3" style="background:#BFEFFF">3333333333333333</div>
				<div class="list3" style="background:#9ACD32">4444444444444444</div>
				<div class="list3" style="background:#8F8F8F">5555555555555555</div>
				<div class="list3" style="background:#8B5A00">6666666666666666</div>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
	.list1,.list2,.list3{width:300px;line-height:40px;border:2px solid #333;margin:20px;font-size:22px;text-align:center;}
	#div2,#div3,#div4{padding:10px;border:1px solid #ccc; float:left; margin:50px;color:#000;}
</style>
<script>
	import { DragDrop } from 'vpui';
	export default {
		directives: {
		    dd : DragDrop
		}
	};
	
</script>