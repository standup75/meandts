<template>
  <div class="home-component">
    <section class="top-section">
      <instagram-connect />
    </section>
    <section class="top-section"></section>
    <section class="top-section"></section>
  </div>
</template>

<script>
import InstagramConnect from "@/components/InstagramConnect.vue";

export default {
  name: "home-component",
  components: { InstagramConnect },
  async created() {
    this.$store.commit("setStepsLabels", [
      "Pick a Picture",
      "Pick a product",
      "Preview & Order",
    ]);
    this.$store.commit("setTextToPrint", null);
    if (this.$route.query.code && !this.accessToken) {
      this.$toasted.info("Connected! Checking access...");
      let response = await httpGet(
        `instagram/token?code=${this.$route.query.code}`
      );
      if (response.access_token) {
        this.accessToken = response.access_token;
        this.$router.push("/ig");
      } else {
        console.error(response);
        this.$toasted.error("Error retriving access token from Instagram");
      }
    }
  },
  head: {
    title() {
      return {
        inner: "Me & T's | Print your Instagram pictures on shirts",
      };
    },
  },
  methods: {
    setDesignUrl(url) {
      this.$store.commit("setDesignUrl", url);
    },
    async loadPage() {
      if (this.accessToken) {
        let url = `instagram/media?token=${this.accessToken}`;
        if (this.instaNextPageUrl) {
          url += `&url=${encodeURIComponent(this.instaNextPageUrl)}`;
        }
        const response = await httpGet(url);
        if (response.pictureUrls) {
          this.instaNextPageUrl = response.nextPageUrl;
          return {
            pictureUrls: response.pictureUrls,
            hasNextPage: !!this.instaNextPageUrl,
          };
        } else {
          this.$toasted.error("Could not get media from Instagram");
          this.accessToken = null;
        }
      } else {
        this.$toasted.error("No tokens to get media from Instagram");
      }
      return {};
    },
  },
};
</script>
