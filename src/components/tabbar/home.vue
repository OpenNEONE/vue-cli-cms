<template>
  <div>
    <!-- 轮播图 -->
    <swiper :swiperlist="sliderList"></swiper>

    <!-- 九宫格改造 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9 cms-nav-link">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newsList">
          <img src="../../assets/images/menu1.png" alt />
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="../../assets/images/menu2.png" alt />
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <img src="../../assets/images/menu3.png" alt />
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../assets/images/menu4.png" alt />
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../assets/images/menu5.png" alt />
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../assets/images/menu6.png" alt />
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
    
  </div>
</template>

<script>

import { Lunbo } from "@/api";
import { Toast } from "mint-ui";

import swiper from '../comments/swiper.vue'

export default {
  data() {
    return {
      sliderList: []
    }
  },
  created() {
    this.getSliders()
  },
  methods: {
    getSliders() {
      Lunbo().then(res => {
        if (res.data.status == 0) {
          this.sliderList = res.data.message;
        } else {
          Toast("轮播图请求失败");
        }
      });
    }
  },
  components: {
    swiper
  }
};
</script>

<style scoped>

.mui-grid-view.cms-nav-link {
    background-color: #fff;
    border: none;
}
.mui-grid-view.mui-grid-9 .mui-media {
    width: 33.3333%;
    border: none;
}

.mui-grid-view.mui-grid-9 .mui-media img {
    width: 50%;
}
</style>