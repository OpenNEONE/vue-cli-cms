import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

// 1.0 导入 Mint-ui 
// import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'
// Vue.use(MintUI)
import { Header, Button, Swipe, SwipeItem, Switch } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Switch.name, Switch)

import Vuex from 'vuex'
Vue.use(Vuex)

var store = new Vuex.Store({
    state: {
      car: JSON.parse(localStorage.getItem('proCar')) || []
    },
    mutations: {
      addCart(state, proO) {
        var flag = false
        // 通过 some 循环是否已经添加过对应的商品
        state.car.some(item => {
          if(item.id == proO.id) {
            // 如果已经存在这个商品信息，只需要累加商品数量即可
            item.count += parseInt(proO.count)
            flag = true
            return true
          }
        })
        // 如果没有添加过对应的产品，需要直接加入
        if(!flag) state.car.push(proO)

        localStorage.setItem('proCar', JSON.stringify(state.car))
      },
      updateGoodsInfo(state, goodsinfo) {
        state.car.some(item => {
          if(item.id == goodsinfo.id) {
            item.count = parseInt(goodsinfo.count)
            return true
          }
        })

        localStorage.setItem('proCar', JSON.stringify(state.car))
      },
      removeInfo(state, id) {
        // 这里需要对应的每一条数据和其对应的索引
        state.car.some((item, i) => {
          if(item.id == id) {
            // 删除数据的第索引项开始的一条
            state.car.splice(i, 1)
            return true
          }
        })

        localStorage.setItem('proCar', JSON.stringify(state.car))
      },
      updateGoodSelected(state, msg) {
        state.car.some(item => {
          if(item.id == msg.id) {
            // 将传过来的状态在仓库管理中改变
            item.selected = msg.selected
            return true
          }
        })

        localStorage.setItem('proCar', JSON.stringify(state.car))
      }
    },
    getters: {
      getAll(state) {
        var c = 0
        state.car.forEach(item => {
          if(item.selected) {
            c += item.count
          }
        })
        return c
      },
      getGoodsCount(state) {
        var o = {}
        state.car.forEach(item => {
          o[item.id] = item.count
        })
        return o
      },
      getGoodsSelected(state) {
        var o = {}
        state.car.forEach(item => {
          // 将每条数据中的状态赋值给对应id的属性
          o[item.id] = item.selected
        })
        return o
      },
      getGoodsCountAndPrice(state) {
        var o = {
          count: 0,
          amount: 0
        } 
        // 遍历计算总数
        state.car.forEach(item => {
          if(item.selected) {
            o.count += item.count
            o.amount += item.price * item.count
          }
        })
        return o
      }
    }
})


// 2.0 导入mui样式
import './assets/lib/mui/dist/css/mui.css'
import './assets/lib/mui/dist/css/icons-extra.css'

// 3.0 导入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 4.0 使用 vue-preview
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

import router from './router.js'

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
