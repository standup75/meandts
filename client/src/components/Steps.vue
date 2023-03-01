<template>
	<div class="steps-component">
		<div class="wrapper">
			<div
				v-for="(name, index) in steps"
				:key="index"
				class="step"
				:class="{next: current < index}"
				><img src="@/assets/step_start.svg" v-if="current >= index"
				/><img src="@/assets/step_start_next.svg" v-if="current < index" class="start"
				/><div class="step-body"><span class="number">{{index + 1}}.</span>{{name}}</div
				><img src="@/assets/step_end.svg" v-if="current >= index"
				/><img src="@/assets/step_end_next.svg" v-if="current < index"
			/></div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'steps-component',
	props: {
		current: Number,
	},
	computed: {
		steps() {
			return this.$store.state.stepsLabels
		},
	},
}
</script>
<style lang="scss" scoped>
.steps-component {
	background: #363534;
}
.wrapper {
	width: 900px;
	max-width: 100%;
	padding: 15px 0 15px 20px;
	margin: 0 auto;
	box-sizing: border-box;
}
.step {
	height: 40px;
	width: 35%;
	margin-left: -15px;
	display: inline-block;
	> * {
		display: inline-block;
	}
	.step-body {
		position: relative;
		z-index: 1;
		width: calc(100% - 40px);
		background: #EC9E22;
		vertical-align: top;
		color: #fff;
		text-transform: uppercase;
		font-size: 13px;
		font-weight: bold;
		box-sizing: border-box;
	}
	&.next {
		.step-body {
			background: transparent;
			border-top: 1px solid #EC9E22;
			border-bottom: 1px solid #EC9E22;
			color: #EC9E22;
		}
		.start {
			border-top: 1px solid #EC9E22;
			border-bottom: 1px solid #EC9E22;
		}
	}
}
@media (min-width: 551px) {
	.step {
		line-height: 40px;
	}
	&.next {
		.step-body {
			line-height: 38px;
		}
	}
}
@media (max-width: 550px) {
	.step .step-body {
		height: 40px;
		line-height: 13px;
		font-size: 10px;
		padding-top: 6px;
	}
}
</style>