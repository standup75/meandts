<template>
  <div class="mockup-explorer">
    <admin-menu />
    <loader v-if="isLoading" />
    <div class="list" v-if="!isLoading">
      <button @click="refresh">Refresh</button>
      <div class="filters">
        <div class="published-only" @click="publishedOnly = !publishedOnly">
          <nice-check :checked="publishedOnly" />
          Show published products only
        </div>
        <div
          v-for="category in categories"
          :key="category.name"
          @click="toggleCategory(category.name)"
        >
          <nice-check :checked="selectedCategories.includes(category.name)" />
          {{ category.name }} ({{ category.publishedCount }} /
          {{ category.count }})
        </div>
      </div>
      <div
        v-for="mockup in filteredMockups"
        :key="mockup.id"
        class="mockup"
      >
        <img :src="mockup.url" />
        <div class="details">
          <div class="publish" @click="togglePublished(mockup)">
            <nice-check :checked="mockup.published" />
            Published
          </div>
          <button
            :class="{ clicked: mockup.sex.includes('women') }"
            @click="toggleSex(mockup, 'women')"
          >
            Women
          </button>
          <button
            :class="{ clicked: mockup.sex.includes('men') }"
            @click="toggleSex(mockup, 'men')"
          >
            Men
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { httpGet, httpPut } from "@/lib/http";
import Loader from "@/components/Loader";
import NiceCheck from "@/components/NiceCheck";
import AdminMenu from "@/components/AdminMenu";

export default {
  name: "mockup-explorer",
  components: { Loader, AdminMenu, NiceCheck },
  data() {
    return {
      isLoading: true,
      publishedOnly: true,
      mockups: [],
      selectedCategories: [],
      categories: [],
    };
  },
  computed: {
    publishedMockups() {
      return this.mockups.filter((p) => p.published);
    },
    filteredMockups() {
      let mockups = this.publishedOnly
        ? this.mockups.filter((p) => p.published)
        : this.mockups;
      if (this.selectedCategories.length) {
        mockups = mockups.filter((p) =>
          this.selectedCategories.includes(p.category)
        );
      }
      return mockups.sort((a, b) => a.minCost - b.minCost);
    },
  },
  created() {
    this.getMockups();
  },
  methods: {
    toggleCategory(categoryName) {
      if (this.selectedCategories.includes(categoryName)) {
        this.selectedCategories = this.selectedCategories.filter(
          (name) => categoryName !== name
        );
      } else {
        this.selectedCategories.push(categoryName);
      }
    },
    async togglePublished(mockup) {
      mockup.published = !mockup.published;
      await httpPut(`mockups/${mockup.id}`, { published: mockup.published });
    },
    async toggleSex(mockup, sex) {
      if (mockup.sex.includes(sex)) {
        mockup.sex = mockup.sex.filter((s) => s !== sex);
      } else {
        mockup.sex.push(sex);
      }
      await httpPut(`mockups/${mockup.id}`, { sex: mockup.sex });
    },
    async refresh() {
      this.isLoading = true;
      const response = await httpPut("mockups/refresh", null, {
        parseJson: true,
      });
      this.$toasted.info(
        `Mockups added: ${response.added} - Mockups removed: ${response.removed}`
      );
      await this.getMockups();
    },
    async getMockups() {
      this.isLoading = true;
      this.mockups = (await httpGet("mockups?all=true")).mockups;
      this.mockups.forEach((m) => {
        let category = this.categories.find((c) => c.name === m.category);
        if (!category) {
          category = {
            count: 0,
            name: m.category,
            publishedCount: 0,
          };
          this.categories.push(category);
        }
        category.count++;
        if (category.published) category.publishedCount++;
      });
      this.isLoading = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.mockup-explorer {
  padding-bottom: 30px;
  width: 100%;
}
.mockup {
  overflow: hidden;
  width: 400px;
  margin: 30px auto;
  img {
    width: 200px;
    float: left;
  }
  .details {
    width: 200px;
    float: left;
  }
}
</style>
