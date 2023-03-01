<template>
	<div class="orders-component">
		<admin-menu />
		<vuetable ref="vuetable"
			v-if="orders.length"
			class="table"
			:fields="fields"
			:api-mode="false"
			:data="orders"
		>
			<div slot="action" slot-scope="props">
				<button @click="checkStatus(props.rowData)">Check status</button>
			</div>
		</vuetable>
		<div class="empty" v-if="!orders.length">No Orders in the database</div>
	</div>
</template>
<script>
import { httpGet } from '@/lib/http'
import AdminMenu from '@/components/AdminMenu'
import Vuetable from 'vuetable-2'
import { DateTime } from "luxon"

export default {
	name: 'orders-component',
	components: { AdminMenu, Vuetable },
	data() {
		return {
			orders: [],
			fields: [
				'id',
				'product',
				'skuId',
				'name',
				'address', {
					name: 'createdAt',
					formatter(value) {
						const createdAt = DateTime.fromJSDate(new Date(value))
						return createdAt.toFormat('yyyy LLL dd HH:mm')
					},
				}, {
					name: 'designUrl',
					formatter(value) {
						return `<img src="${value}" class="design"/>`;
					},
				}, {
					name: 'previewUrl',
					formatter(value) {
						return `<img src="${value}" class="design"/>`;
					},
				},
				'action',
			],
		}
	},
	async created() {
		const response = await httpGet('orders')
		this.orders = response.orders.map(order => ({
			...order,
			name: `${order.firstName} ${order.lastName}`,
			address: order.country === 'US' ? `${order.address}<br/>${order.city}, ${order.state} ${order.zipCode}` : `${order.address}<br/>${order.zipCode} ${order.city}, ${order.country}`,
		}))
	},
	methods: {
		async checkStatus(order) {
			const response = await httpGet(`orders/${order.id}/status`)
			console.log(response)
		},
	},
}
</script>
<style lang="scss" scoped>
	.orders-component {
		.table {
			width: 1200px;
			margin: 20px auto 0;
		}
		/deep/ .design {
			height: 100px;
			margin: 0 10px;
		}
		.empty {
			margin-top: 50px;
		}
	}
</style>