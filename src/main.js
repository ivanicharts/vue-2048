import Vue from 'vue'
import VueTouch from 'vue-touch'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(VueTouch)

new Vue({
  render: h => h(App)
}).$mount('#app')
