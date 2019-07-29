<template>
    <div>
        <div class="mui-content">

            <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter">
                <div class="ball" v-show="ballFlag" ref="ball"></div>
            </transition>

			<div class="mui-card lunbo">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swiper :swiperlist="picList"></swiper>
					</div>
				</div>
			</div>

			<div class="mui-card">
                <div class="mui-card-header">{{ proDetail.title }}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner pro-info">
                        <p class="price">
                            市场价：
                            <span>￥{{ proDetail.market_price }}</span>
                            销售价：
                            <strong>￥{{ proDetail.sell_price }}</strong>
                        </p>
                        <div class="number-box">
                            购买数量：<number-box @getcount="getCount" :maxNum="proDetail.stock_quantity"></number-box>
                        </div>
                        <p class="choose-btn">
                            <mt-button type="primary" size="small">立即购买</mt-button>
                            <mt-button type="danger" size="small" @click="addToShopcar">加入购物车</mt-button>
                        </p>
					</div>
				</div>
			</div>

            <div class="mui-card">
                <div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner pro-info">
                        <p>商品货号：<span>{{ proDetail.goods_no }}</span></p>
                        <p>库存情况：<span>{{ proDetail.stock_quantity }}</span></p>
                        <p>上架时间：<span>{{ proDetail.add_time | format }}</span></p>
					</div>
				</div>
                <div class="mui-card-footer">
                    <div class="res-btn">
                        <mt-button type="primary" plain size="large" @click="getDesc(id)">图文介绍</mt-button>
                        <mt-button type="danger" plain size="large"  @click="sendComm(id)">发表评论</mt-button>
                    </div>
                </div>
			</div>

		</div>
    </div>
</template>

<script>
import { SwiperList, ProDetail } from '@/api'
import moment from 'moment'
import swiper from '../comments/swiper'
import numberBox from '../comments/numberBox'
export default {
    data() {
        return {
            id: this.$route.params.id,
            picList: [],
            proDetail: "",
            ballFlag: false,
            selectedCount: 1
        }
    },
    created() {
        this.getPicList()
        this.getDetail()
    },
    methods: {
        getPicList() {
            SwiperList(this.id).then(res => {
                if(res.data.status == 0) {
                    res.data.message.forEach(item => {
                        item.img = item.src
                    })
                    this.picList = res.data.message
                }
            })
        },
        getDetail() {
            ProDetail(this.id).then(res => {
                // console.log(res.data.message)
                if(res.data.status == 0) {
                    this.proDetail = res.data.message[0]
                }
            })
        },
        getDesc(id) {
            this.$router.push({ name: "commentDesc", params: { id: id } })
        },
        sendComm(id) {
            this.$router.push({ name: "comments", params: { id: id }  })
        },
        addToShopcar() {
            this.ballFlag = !this.ballFlag

            // 产生需要添加到购物车中的商品信息对象
            let proO = {
                id: this.id,
                count: this.selectedCount,
                price: this.proDetail.sell_price,
                selected: true
            }
            // commit 执行vuex中对应的函数，传入数据
            this.$store.commit("addCart", proO)
        },
        beforeEnter(el) {
            el.style.opacity = 1
            el.style.transform = "translate(0, 0)"
        },
        enter(el, done) {
            el.offsetWidth

            const ball = this.$refs.ball.getBoundingClientRect()
            const badge = document.querySelector("#badge").getBoundingClientRect()

            const x = badge.left - ball.left
            const y = badge.top - ball.top

            el.style.transform = `translate(${x}px, ${y}px)`
            el.style.transition = 'all .5s ease-in'
            done()
        },
        afterEnter() {
            this.ballFlag = !this.ballFlag
        },
        getCount(count) {
            this.selectedCount = count
        }
    },
    components: {
        swiper,
        numberBox
    },
    filters: {
      format(daraStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
        return moment(daraStr).format(pattern)
      }
    },
}
</script>

<style>
    .lunbo img {
        height: 130px;
        width: auto !important;
    }

    .mui-content {
        padding-bottom: 50px;
        position: relative;
        overflow: hidden;
    }
    .pro-info {
        text-align: left;
    }

    .pro-info p {
        font-size: 16px;
        color: #333;
    }

    .price {
        margin: 10px 0;
    }

    .price span {
        color: #ccc;
        text-decoration: line-through;
        padding-right: 20px;
    }

    .price strong {
        color: #f80;
    }

    .number-box {
        display: flex;
        line-height: 36px;
        margin: 10px 0;
    }

    .choose-btn button {
        margin-right: 20px;
    }

    .mui-card-footer {
        display: block;
    }

    .res-btn button {
        margin: 20px 0;
    }

    .ball {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
        top: 292px;
        left: 146px;
    }
</style>