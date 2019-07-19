import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

// 1.0 导入 Mint-ui 
// import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'
// Vue.use(MintUI)
import { Header, Button, Swipe, SwipeItem } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

// 2.0 导入mui样式
import './assets/lib/mui/dist/css/mui.css'
import './assets/lib/mui/dist/css/icons-extra.css'

// 3.0 导入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import router from './router.js'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
