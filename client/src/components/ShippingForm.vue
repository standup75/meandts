<template>
  <div class="field">
    <div class="select-wrapper">
      <label>Shipping</label>
      <select v-model="shippingId" v-if="shippingOptions">
        <option
          v-for="option in shippingOptions"
          :key="option.shippingId"
          :value="option.shippingId"
          >{{ option.label }} - ${{ formatPrice(cost(option)) }}</option
        >
      </select>
      <div v-if="!shippingOptions" class="unavailable">
        - Shipping prices will be loaded here -
      </div>
    </div>
  </div>
</template>
<script>
import { formatPrice } from "@/lib/utils";
import { httpGet } from "@/lib/http";
let shippingDebounceTimer;

export default {
  name: "shipping-form-component",
  data() {
    return {
      shippingOptions: null,
    };
  },
  computed: {
    shippingId: {
      get() {
        return (
          this.$store.state.shipping && this.$store.state.shipping.shippingId
        );
      },
      set(shippingId) {
        const shipping = this.shippingOptions.find(
          (s) => s.shippingId === shippingId
        );
        this.$store.commit("setShipping", shipping);
      },
    },
    country() {
      return this.$store.state.country;
    },
  },
  mounted() {
    this.initShipping();
  },
  watch: {
    country() {
      this.initShipping();
    },
  },
  methods: {
    formatPrice,
    cost(shippingOption) {
      const quantity = Math.max(this.$store.state.quantity || 0, 1);
      return formatPrice(
        shippingOption.cost + (quantity - 1) * shippingOption.addl
      );
    },
    initShipping() {
      clearTimeout(shippingDebounceTimer);
      if (this.country) {
        shippingDebounceTimer = setTimeout(async () => {
          this.shippingOptions = await httpGet(
            `orders/shipping?country=${this.country}`
          );
          if (this.shippingOptions && this.shippingOptions.length) {
            this.shippingId = this.shippingOptions[0].shippingId;
          } else {
            console.error(
              "Error retrieving shipping options",
              this.shippingOptions
            );
            this.$toasted.error("Error retrieving shipping options");
          }
        }, 1000);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.unavailable {
  line-height: 42px;
  font-size: 15px;
}
.select-wrapper {
  position: relative;
  label {
    position: absolute;
    top: 3px;
    left: 12px;
  }
}
</style>
