import Vue from 'vue'
import App from '@/App.vue'
import Vuex from 'vuex'

//import store from '@/store' 
import router from '@/router'

//import messages from './modules/messages'

Vue.use(Vuex)

Vue.config.productionTip = false

// Vue.use(VueRouter)

const store = new Vuex.Store({
	state: {
		
	}
})

const vue = new Vue({
  router,
  store,
  render: h => h(App)
})

vue.$mount('#app')
