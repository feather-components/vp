<template>
	<div>
		<div class="drag" v-drag></div>
		<div></div>
	</div>
</template>
<style lang="less" scoped>
	.drag{
		width:200px;height:200px;background-color:#ccc;
	}
</style>
<script>
	import { Drag } from 'vpui';
	export default {
		directives: {
		    drag : Drag
		}
	};

</script>