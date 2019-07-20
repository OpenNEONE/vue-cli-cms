<template>
    <div class='news-info'>
        <!-- 大标题 -->
        <h3 class="title">{{ newsinfo.title }}</h3>
        <!-- 小标题 -->
        <p class="subtitle">
            <span>发表时间：{{ newsinfo.add_time | format }}</span>
            <span class="mui-pull-right">浏览：{{ newsinfo.click }}次</span>
        </p>

        <!-- 内容部分 -->
        <div class="content" v-html="newsinfo.content"></div>

        <!-- 评论子组件区域 -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import moment from 'moment'
import { NewsInfo } from '@/api'
import commentBox from '../comments/comments'

export default {
    data() {
        return {
            id: this.$route.params.id,
            newsinfo: ''
        }
    },
    created() {
        this.getNewsInfo()
    },
    methods: {
        getNewsInfo() {
            NewsInfo('/api/getnew/' + this.id)
            .then(res => {
                if(res.data.status == 0) {
                    this.newsinfo = res.data.message[0]
                }
            })
        }
    },
    filters: {
      format(daraStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
        return moment(daraStr).format(pattern)
      }
    },
    components: {
        commentBox
    }
}
</script>

<style>

    .news-info {
        background-color: #fff;
        padding-bottom: 50px;
    }

    .news-info h3 {
        text-align: left;
        padding: 20px 20px 0;
        line-height: 34px;
        margin: 0;
    }

    .news-info .subtitle {
        padding-bottom: 20px;
        border-bottom: 1px solid #e4e4e4;
        margin: 10px 0 20px;
    }

    .news-info p {
        padding: 0 20px;
        text-align: left;
    }

    .news-info .content p {
        font-size: 16px;
        line-height: 26px;
        color: #333;
    }

    .news-info .content p strong {
        display: block;
        text-indent: -4px;
    }
</style>