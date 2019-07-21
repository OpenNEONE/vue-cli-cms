<template>
    <div>
        <!-- 头部标题 -->
        <div class="details-head mui-clearfix">
            <h3>{{ detailPic.title }}</h3>

            <p class="mui-pull-left">发表时间：{{ detailPic.add_time }} 
                <span class="mui-pull-right">浏览：{{ detailPic.click }}</span>
            </p>
        </div>

        <!-- 显示缩略图 -->
        <div class="thums-pic mui-clearfix">
            <vue-preview :slides="imgs"></vue-preview>
        </div>

        <!-- 详细信息 -->
        <div class="details-body">
            <div v-html="detailPic.content"></div>
        </div>


    </div>
</template>

<script>

import { PicDetails, Imgs } from '@/api'

export default {
    data() {
        return {
            detailPic: '',
            imgs: []
        }
    },
    created() {
        this.getPicDetails()
        this.getImgs()
    },
    methods: {
        getPicDetails() {
            PicDetails(this.$route.params.id).then(res => {
                if(res.data.status == 0) {
                    this.detailPic = res.data.message[0]
                }
            })
        },
        getImgs() {
            Imgs(this.$route.params.id).then(res => {
                if(res.data.status == 0) {
                    this.imgs = res.data.message
                    this.imgs.forEach(item => {
                        item.w = 600
                        item.h = 400
                        item.msrc = item.src
                    })
                }
            })
        }
    }
}
</script>

<style>

    .details-head {
        margin-bottom: 20px;
        border-bottom: 1px solid #ccc;
    }

    .details-head h3 {
        margin: 20px;
        line-height: 36px;
        text-align: left;
    }

    .details-head p {
        width: 100%;
        padding: 0 20px;
        text-align: left;
    }

    .thums-pic {
        width: 92%;
        margin: 20px auto;
    }

    .thums-pic figure {
        float: left;
        width: 110px;
        margin: 0;
        margin-left: 10px;
    }

    .thums-pic figure img {
        width: 100%;
    }

    .details-body {
        padding: 20px;
        line-height: 36px;
        text-indent: 2em;
        text-align: left;
    }
</style>