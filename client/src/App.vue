<style src="./styles/main.scss" lang="scss"></style>
<template>
  <div id="app">
    <app-header v-if="!home" />
    <div class="content">
      <router-view/>
    </div>
    <app-footer />
  </div>
</template>
<script>
import AppHeader from '@/components/Header'
import AppFooter from '@/components/Footer'
export default {
  name: 'home',
  components: { AppHeader, AppFooter },
  computed: {
    home() {
      return this.$route.name === 'home'
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.content {
  padding-top: 44px;
  min-height: 100%;
  background: #fff;
}
</style>
