<template>
    <div class="desc-pic">
        <h3>{{ descInfo.title }}</h3>
        <div class="desc-content" v-html="descInfo.content"></div>
    </div>
</template>

<script>

import { ProDesc } from '@/api'

export default {
    data() {
        return {
            id: this.$route.params.id,
            descInfo: "",
            backIcon: true
        }
    },
    created() {
        this.getDesc()
    },
    methods: {
        getDesc() {
            ProDesc(this.id).then(res => {
                // console.log(res.data.message[0])
                if(res.data.status == 0) {
                    this.descInfo = res.data.message[0]
                }
            })
        }
    },
}
</script>

<style>
    .desc-pic {
        text-align: left;
        background-color: #fff;
    }

    .desc-pic h3 {
        padding: 20px;
        border-bottom: 1px solid #f4f4f4;
        margin: 0;
        /* 1.0 需要文字在一行上显示 */
		white-space: nowrap;
		/* 2.0 溢出部分隐藏 */
		overflow: hidden;
		/* 3.0 文字溢出部分转换成省略号 */
		text-overflow: ellipsis;
    }

    .desc-content {
        text-indent: 2em;
        padding: 0 20px;
    }

    .desc-content p {
        margin: 0;
        font-size: 16px;
        line-height: 34px;
    }

    .desc-content img {
        display: block;
        width: 100%;
        height: auto !important;
    }

</style>