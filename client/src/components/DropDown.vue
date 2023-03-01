<template>
  <div class="dropdown-component">
    <div class="selected" @click="toggleDropdown">
      <span class="label" v-html="selectedOptionLabel" />
      <span class="description" v-if="selectedOptionDescription">{{
        selectedOptionDescription
      }}</span>
      <span
        class="carrot"
        :class="{ 'sw-carrot_up': openTop, 'sw-carrot_down': !openTop }"
      />
    </div>
    <div class="dropdown" v-if="showDropdown" :class="{ 'open-top': openTop }">
      <div
        class="option"
        :class="{ selected: option.value === selectedOption }"
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
      >
        <span class="label" v-html="option.label" />
        <span class="description" v-if="option.description">{{
          option.description
        }}</span>
        <span class="sw-check" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "dropdown-component",
  props: {
    selectedOption: String,
    options: Array,
    select: Function,
    openTop: Boolean,
  },
  data() {
    return {
      showDropdown: false,
    };
  },
  created() {
    document.addEventListener("click", this.closeDropdown);
    document.addEventListener("keydown", this.closeDropdownIfEsc);
  },
  destroyed() {
    document.removeEventListener("click", this.closeDropdown);
    document.removeEventListener("keydown", this.closeDropdownIfEsc);
  },
  computed: {
    selectedOptionObject() {
      return this.options.find((o) => o.value === this.selectedOption);
    },
    selectedOptionLabel() {
      return this.selectedOptionObject ? this.selectedOptionObject.label : "-";
    },
    selectedOptionDescription() {
      return this.selectedOptionObject && this.selectedOptionObject.description;
    },
  },
  methods: {
    closeDropdownIfEsc(ev) {
      if (ev.which === 27) {
        this.closeDropdown();
      }
    },
    toggleDropdown(ev) {
      ev.stopPropagation();
      ev.preventDefault();
      this.showDropdown = !this.showDropdown;
    },
    selectOption(option) {
      this.closeDropdown();
      this.select(option);
    },
    closeDropdown() {
      this.showDropdown = false;
    },
  },
};
</script>
<style scoped lang="scss">
.dropdown-component {
  position: relative;
  text-align: left;
}
.selected {
  position: relative;
  padding: 5px 20px;
  background: #f0f0f0;
  color: #333;
}
.carrot {
  float: right;
  margin: 4px;
}
.description {
  position: absolute;
  top: 4px;
  right: 45px;
  font-style: italic;
  opacity: 0.4;
  margin-left: 15px;
}
.dropdown {
  position: absolute;
  top: 28px;
  left: 0;
  right: 0;
  color: #555;
  z-index: 10;
  &.open-top {
    top: auto;
    bottom: 32px;
  }
  .sw-check {
    margin-left: 5px;
    display: none;
    position: absolute;
    top: 8px;
    right: 20px;
  }
  .option {
    position: relative;
    background: #f0f0f0;
    padding: 5px 20px;
    cursor: pointer;
    &:hover {
      background: #888;
      color: #fff;
    }
    &.selected {
      color: #ec9e22;
      .sw-check {
        display: inline;
      }
    }
    .label {
      /deep/ .sub {
        opacity: 0.5;
        font-size: 12px;
        margin-left: 5px;
      }
    }
  }
}
</style>
