<template>
	<div class="admin-view">
		<admin-menu />
		<div class="main">
      <h1>Welcome Admin!</h1>
    </div>
	</div>
</template>
<script>
import AdminMenu from '@/components/AdminMenu'

export default {
	name: 'admin-view',
	components: { AdminMenu },
}
</script>
<style lang="scss" scoped>
h1 {
  margin: 50px 0 0 0;
  font-size: 50px;
}
</style>