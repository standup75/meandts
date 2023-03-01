<template>
	<div class="admin-menu-component">
		<ul>
			<li @click="$router.push('/admin/products')" :class="{selected: isCurrent('productexplorer')}">Product Explorer</li>
			<li @click="$router.push('/admin/tweets')" :class="{selected: isCurrent('tweetlauncher')}">Tweet Launcher</li>
			<li @click="$router.push('/admin/mockups')" :class="{selected: isCurrent('mockups')}">Mockups</li>
			<li @click="$router.push('/admin/orders')" :class="{selected: isCurrent('orders')}">Orders</li>
			<li @click="$router.push('/components')">Components</li>
		</ul>
	</div>
</template>
<script>
export default {
	name: 'admin-menu-component',
	methods: {
		isCurrent(name) {
			return this.$route.name === name
		}
	},
}
</script>
<style lang="scss" scoped>
	.admin-menu-component {
    background: #363534;
	}
	ul {
		padding: 0;
		list-style: none;
		overflow: hidden;
		width: 600px;
		max-width: 100%;
		margin: 0 auto;
		padding: 5px 0;
	}
	li {
		cursor: pointer;
		color: #ffa;
		padding: 10px 0;
		width: 20%;
		box-sizing: border-box;
		float: left;
		&.selected, &:hover {
			background: #ffa;
			color: #333;
		}
	}
</style>