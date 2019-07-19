<template>
    <div>
        <!-- 轮播图 -->
        <mt-swipe :auto="4000" class="sliders">
            <mt-swipe-item v-for="item in sliderList" :key="item.id">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>

        <!-- 九宫格改造 -->
    </div>
</template>

<script>

import axios from 'axios'
import { Toast } from "mint-ui"

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
            axios.get("http://www.liulongbin.top:3005/api/getlunbo")
            .then(res => {
                if(res.data.status == 0) {
                    this.sliderList = res.data.message
                } else {
                    Toast("轮播图请求失败")
                }
            })
        }
    }
}
</script>

<style scoped>
    .sliders {
        height: 130px;
    }
    .sliders img {
        width: 100%;
    }
</style>