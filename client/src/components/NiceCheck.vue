<template>
	<div class="check" :class="{checked}"><div class="sw-check"></div></div>
</template>
<script>
export default {
	name: 'checked-component',
	props: [ 'checked' ],
}
</script>
<style lang="scss" scoped>
	.check {
		vertical-align: sub;
		margin-right: 5px;
		display: inline-block;
		width: 15px;
		height: 15px;
		border: 1px solid #aaa;
		color: #333;
		position: relative;
		border-radius: 10px;
		.sw-check {
			position: absolute;
			top: -9px;
			left: -1px;
			display: none;
			font-size: 24px;
		}
		&.checked {
			.sw-check {
				display: block;
			}
		}
	}
</style>