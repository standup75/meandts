<template>
  <div class="instagram-component">
    <preview-maker v-if="!isLoading">
      <div v-if="!accessToken">
        <instagram-connect />
        <router-link to="hashtag" class="switch-link"
          >No, I want to print some words instead</router-link
        >
      </div>
      <gallery
        v-if="accessToken"
        @select="setDesignUrl"
        :load-page="loadPage"
        confirm="Is that the picture you want to print?"
      />
    </preview-maker>
    <loader v-if="isLoading" />
  </div>
</template>

<script>
import PreviewMaker from "@/components/PreviewMaker.vue";
import Gallery from "@/components/Gallery.vue";
import InstagramConnect from "@/components/InstagramConnect.vue";
import Loader from "@/components/Loader.vue";
import { httpGet, httpPost } from "@/lib/http";

export default {
  name: "instagram-component",
  components: { Gallery, InstagramConnect, PreviewMaker, Loader },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    accessToken: {
      get() {
        return this.$store.state.accessToken;
      },
      set(accessToken) {
        this.$store.commit("setAccessToken", accessToken);
      },
    },
  },
  async created() {
    this.$store.commit("setStepsLabels", [
      "Pick a Picture",
      "Pick a product",
      "Preview & Order",
    ]);
    this.$store.commit("setTextToPrint", null);
    if (this.$route.query.code && !this.accessToken) {
      this.isLoading = true;
      let response = await httpGet(
        `instagram/token?code=${this.$route.query.code}`
      );
      if (response.access_token) {
        this.accessToken = response.access_token;
      } else {
        console.error(response);
        this.$toasted.error("Error retriving access token from Instagram");
      }
      this.isLoading = false;
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
