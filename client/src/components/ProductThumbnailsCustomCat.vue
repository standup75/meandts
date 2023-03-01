<template>
  <div class="product-thumbnails-component">
		<loader v-if="isLoading" />
    <ul class="thumbnails" v-if="!isLoading">
      <li
        v-for="product in products"
        :key="product.id"
        @click="selectThumb(product)"
        :class="{selected: selectedProductIds.includes(product.product_name)}"
      >
				<div class="title">{{product.product_name}}</div>
				<div class="description">
					<div v-for="d in getDescriptions(product)" :key="d">
						{{d}}
					</div>
				</div>
        <img :src="product.product_colors[0].product_image" />
      </li>
    </ul>
  </div>
</template>

<script>
import Loader from '@/components/Loader.vue'
import { httpGet } from '@/lib/http'
const colors = ['Black', 'White']

export default {
  name: "ProductThmbnails",
  data() {
    return {
			selectedProducts: [],
			isLoading: true,
			products: [],
    };
	},
	components: { Loader },
  computed: {
    selectedProductIds() {
      return this.selectedProducts.map(t => t.product_name);
    }
	},
	async created() {
		this.products = await httpGet('products/customcat')
		// this.products = this.products
		// 	.filter(p => {
		// 		if (p.product_colors && p.product_colors.length) {
		// 			p.colors = p.product_colors.filter(pc => colors.includes(pc.color))
		// 		}
		// 		return p.colors && p.colors.length === 2
		// 	})
		this.isLoading = false
	},
  methods: {
		getDescriptions(product) {
			const descriptions = []
			for (let i = 1; i < 6; i++) {
				if (product[`product_description_bullet${i}`]) {
					descriptions.push(product[`product_description_bullet${i}`])
				}
			}
			return descriptions
		},
    selectThumb(product) {
      if (this.selectedProductIds.includes(product.product_name)) {
        this.selectedProducts = this.selectedProducts.filter(t => t.product_name !== product.product_name);
      } else {
        this.selectedProducts.push(product);
			}
			console.log()
			console.log(JSON.stringify(this.selectedProducts))
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.thumbnails {
  li {
    border: 1px solid transparent;
    &.selected {
      border: 1px solid #ffff00;
    }
  }
}
.description {
	font-size: 10px;
}
</style>
