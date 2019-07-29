<template>
  <div id="app">
    <!-- topNav -->
    <mt-header fixed title="cms案例">
      <span slot="left" @click="backToPage" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>

    <!-- main区域 -->
    <transition>
        <router-view></router-view>
    </transition>

    <!-- TabBar -->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/member">
				<span class="mui-icon mui-icon-email"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">{{ $store.getters.getAll }}</span>
        </span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  </div>
</template>


<script>

import mui from './assets/lib/mui/dist/js/mui.js'

export default {
  data() {
    return {
      flag: false
    }
  },
  created() {
    this.flag = this.$route.path == '/home' ? false : true
  },
  mounted() {
    mui("header, nav").on("tap", "a", function() {
      mui.openWindow({url: this.href})
    })
  },
  methods: {
    backToPage() {
      this.$router.go(-1)
    }
  },
  watch: {
    '$route.path': function(newVal) {
      if(newVal == '/home') {
        this.flag = false
      } else {
        this.flag = true
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 40px;
  overflow-x: hidden;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}
.v-enter {
  transform: translateX(100%);
}
.v-leave-to {
  transform: translateX(-100%);
  position: absolute;
}

.v-enter-active,
.v-leave-active {
  transition: all .2s ease;
}

nav {
  touch-action: pan-y;
}
</style>
