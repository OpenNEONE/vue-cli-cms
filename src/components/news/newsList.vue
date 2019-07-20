<template>
  <div class="content">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
        <router-link :to="'/home/newsInfo/' + item.id" class>
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            <h4>{{ item.title }}</h4>
            <p class="mui-ellipsis bottom-info">
                <span>发表日期：{{ item.add_time | format }}</span>
                <span>点击次数：{{ item.click }}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>

import moment from 'moment'
import { NewList } from '@/api'

export default {
    data() {
        return {
            newsList: []
        }
    },
    created() {
       this.getNewsList()
    },
    methods: {
        getNewsList() {
            NewList("api/getnewslist").then(res => {
                if(res.data.status == 0) {
                    this.newsList = res.data.message
                }
            })
        }
    },
    filters: {
      format(daraStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
        return moment(daraStr).format(pattern)
      }
    }
}
</script>

<style scoped>

    .bottom-info {
        display: flex;
        justify-content: space-between;
    }

    h4 {
        text-align: left;
    }

</style>