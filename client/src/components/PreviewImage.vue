<template>
	<div class="preview-image-component" :class="{'with-accept': showAccept, 'no-accept': !showAccept}">
		<div class="sw-check" @click="$emit('accept')" v-if="showAccept"/>
		<div class="sw-x" @click="$emit('refuse')"/>
		<img :src="src" />
	</div>
</template>
<script>
export default {
	name: 'preview-image-component',
	props: [ 'showAccept', 'src' ],
}
</script>
<style lang="scss" scoped>
	.preview-image-component {
		margin: 20px;
		width: 700px;
		max-width: calc(100% - 40px);
		position: relative;
		margin: 15px auto;
		img {
			width: 100%;
			border: 1px solid #333;
		}
		&.no-accept {
			.sw-x {
				position: absolute;
				right: -17px;
				top: -17px;
				border-radius: 50px;
				font-size: 20px;
				cursor: pointer;
				background: #fff;
				color: #888;
				border: 1px solid #888;
				padding: 6px;
			}
		}
		&.with-accept {
			div {
				float: left;
				margin: 0 10px;
				padding: 10px;
				border-radius: 50px;
				font-size: 40px;
				cursor: pointer;
			}
			.sw-check {
				background: #050;
				color: #dfd;
			}
		}
	}

</style>