<template>
    <div class="pro-list">
        <div class="goods-item" v-for="item in dataList" :key="item.id" @click="detail(item.id)">
            <img :src="item.img_url" alt="">
            <h3 class="title">{{ item.title }}</h3>
            <div class="info">
                <p class="price">
                <span class="now">￥{{ item.sell_price }}</span>
                <span class="old">￥{{ item.market_price }}</span>
                </p>
                <p class="sell">
                <span>热卖中</span>
                <span>剩 <strong>{{ item.stock_quantity }}</strong> 件</span>
                </p>
            </div>
        </div>


        <mt-button type="danger" v-if="flag" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
import {GoodList} from '@/api'

export default {
    data() {
        return {
            pageIndex: 1,
            dataList: [],
            flag: true
        }
    },
    created() {
        this.getDataList()
    },  
    methods: {
        getDataList() {
            GoodList(this.pageIndex).then(res => {
                // console.log(res)
                // console.log(res.data.message)
                if(res.data.status == 0) {
                    this.dataList = this.dataList.concat(res.data.message)
                }
                if(res.data.message.length < 10) {
                    this.flag = false
                }
            })
        },
        getMore() {
            this.pageIndex++
            this.getDataList()
        },
        detail(id) {
            // 1.0 从列表页的商品信息，跳转至对应的详情页，不需要改造页面，可以通过事件调用的方式
            // 2.0 实现跳转的功能，可以使用 this.$router 内部提供的功能
            // 3.0 push方法可以实现触发路由的请求，并且携带参数，通过name值可以约束对应的路由规则
            // 4.0 push方法内部的传值方式有很多种，比较推荐对象传值，方便后期维护和修改
            this.$router.push({ name: "goodsInfo", params: { id: id } })
        }
    },
}
</script>

<style scoped>
    .pro-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 10px;
        padding-bottom: 60px;
    }
    .pro-list > div {
        width: 48%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: left;
        background-color: #fff;
        margin: 10px 0;
        padding: 10px;
    }
    .pro-list > div img {
        width: 100%;
    }
    .pro-list h3 {
        font-size: 18px;
        margin: 10px 0;
        line-height: 28px;
        /* 1.0 溢出部分隐藏 */
		overflow: hidden;
		/* 2.0 文字溢出部分显示省略号 */
		text-overflow: ellipsis;
		/* 3.0 需要设置成弹性盒子 */
		display: -webkit-box;
		/* 4.0 最多显示的行数 (不规范的属性) */
		-webkit-line-clamp: 2;
		/* 5.0 子元素的排列方式 (不规范的属性) */
		-webkit-box-orient: vertical;
    }
    .price .now {
        font-size: 18px;
        color: #f80;
    }
    .price .old {
        font-size: 16px;
        padding-left: 10px;
        text-decoration: line-through;
    }

    .info strong {
        color: #f40;
    }
</style>