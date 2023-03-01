import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toasted from 'vue-toasted'
import VueHead from 'vue-head'

Vue.use(VueHead, {
  separator: '-',
  complement: 'Me & T\'s',
})
Vue.use(Toasted, {
	duration: 2500,
	className: 'toast',
	position: 'top-left',
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
