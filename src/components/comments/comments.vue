<template>
    <div class="comments-list">
        <h3>发表评论</h3>
        <textarea 
            placeholder="请输入要BB的内容（做多吐槽120字）" 
            maxlength="120"
            v-model="msg"
        ></textarea>

        <div class="mui-clearfix add-comments">
            <mt-button 
            class="mui-pull-right"
            type="primary" 
            size="normal" 
            @click="postComment">发表评论</mt-button>
        </div>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, i) in comments" :key="i">
                <div class="cmt-title">
                    {{ i+1 }}楼.{{ item.user_name }}&nbsp;&nbsp;
                    <span class="mui-pull-right">{{ item.add_time | format }}</span>
                </div>
            <div class="cmt-body">
                {{ item.content === 'undefined' ? '此用户很懒，嘛都没说': item.content }}
            </div>
        </div>

    </div>

        <div class="get-more-btn">
            <mt-button type="danger" size="normal" plain @click="getMore">加载更多</mt-button>
        </div>
        
    </div>
</template>

<script>

import { Toast } from "mint-ui"
import moment from 'moment'
import { Comments, PostComment } from '@/api'

export default {
  data() {
    return {
      pageIndex: 1, 
      comments: [],
      msg: ''
    }
  },
  created() {
    this.getComments()
  },
  methods: {
    getComments() {
      Comments({
        id: this.id,
        pageIndex: this.pageIndex
      })
        .then(res => {
          if (res.data.status === 0) {
            this.comments = this.comments.concat(res.data.message)
          } else {
            Toast("获取评论失败！")
          }
        })
    },
    getMore() {
      this.pageIndex++;
      this.getComments()
    },
    postComment() {
        // 1.0 发送请求携带的数据
        PostComment(this.id, { content: this.msg })
        .then(res => {
            if(res.data.status == 0) {
                // 2.0 发表成功之后的后续操作
                let info = {
                    user_name: '匿名',
                    add_time: Date.now(),
                    content: this.msg
                }
                this.comments.unshift(info)
                this.msg = ''
            }
        })
        
    }
  },
    filters: {
      format(daraStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
        return moment(daraStr).format(pattern)
      }
    },
  props: ["id"]
}
</script>

<style scoped>
    .comments-list h3 {
        margin: 20px 0;
        border-top: 1px solid #f8f8f8;
        text-indent: 10px;
        color: gray;
    }

    .comments-list textarea {
        width: 90%;
        height: 100px;
    }

    .comments-list .add-comments {
        padding: 0 40px 20px 0;
        border-bottom: 1px solid #e4e4e4;
    }

    .comments-list .cmt-list {
        padding: 20px 20px;
    }
    .comments-list .cmt-list .cmt-item {
        text-align: left;
        line-height: 28px;
        margin-bottom: 20px;
        border-bottom: 1px dashed #ccc;
    }

    .comments-list .cmt-list .cmt-item .cmt-title {
        margin-bottom: 10px;
    }
    .comments-list .cmt-list .cmt-item .cmt-body {
        margin-top: 10px;
        margin-bottom: 10px;
        text-indent: 2em;
    }

    .comments-list .get-more-btn button {
        margin: 0 auto;
    }
    .comments-list .get-more-btn {
        margin-bottom: 20px;
    }
</style>