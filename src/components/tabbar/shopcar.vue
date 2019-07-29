<template>
  <div class="content-box">

    <div class="mui-card shopcar-info" v-for="(item, i) in proList" :key="item.id">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
            <mt-switch v-model="$store.getters.getGoodsSelected[item.id]"
                       @change="selectChange(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>

            <div class="info-inner">
                <h3>{{ item.title }}</h3>
                <div class="info-left">
                    <img :src="item.thumb_path" alt="">
                </div>
                <div class="info-right">
                    <p>价格：<span>￥{{ item.sell_price}}</span></p>
                    <p>
                        <numbox :initCount="$store.getters.getGoodsCount[item.id]"
                                :goodsid="item.id" ></numbox>
                    </p>
                </div>
                <div class="del-pro">
                    <a href="#" @click="delGoods(item.id, i)">删除</a>
                </div>
            </div>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
            <div class="total">
                <div class="total-price">
                    <h4>结算清单：</h4>
                    <p>
                        <span>已选：<strong>{{ $store.getters.getGoodsCountAndPrice.count }}</strong> 件</span>
                        <span>总计：<strong>￥{{ $store.getters.getGoodsCountAndPrice.amount }}</strong></span>
                    </p>
                </div>
                <div class="total-btn">
                    <mt-button type="danger">立即支付</mt-button>
                </div>
            </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { AllPro } from '@/api'
import numbox from '../comments/shopCar_numbox.vue'

export default {
    data() {
        return {
            proList: []
        }
    },
    components: {
        numbox
    },
    created() {
        this.getAllPro()
    },
    methods: {
        getAllPro() {
            var idArr = []
            // 获取 vuex 内部所有的商品信息
            this.$store.state.car.forEach(item => {
                idArr.push(parseInt(item.id))
            })

            if(idArr.length <= 0) return 

            AllPro(idArr.join()).then(res => {
                if(res.data.status == 0) {
                    // console.log(res.data)
                    this.proList = res.data.message
                }
            })
        },
        delGoods(id, i) {
            // 1.0 删除本地的数据
            this.proList.splice(i, 1)
            this.$store.commit("removeInfo", id)
        },
        selectChange(id, val) {
            this.$store.commit('updateGoodSelected', {
                id: id,
                selected: val
            })
        }
    }
}
</script>

<style scoped>
    .content-box {
        padding-bottom: 60px;
        overflow: hidden;
    }

    .shopcar-info .mui-card-content-inner {
        display: flex;
        padding: 5px 10px;
    }

    .shopcar-info img {
        width: 60px;
        height: auto!important;
    }

    .shopcar-info .info-inner {
        padding-left: 20px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
    }

    .shopcar-info h3 {
        flex: 1 1 auto;
        width: 260px;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-left: -10px;
        text-align: left;
    }

    .info-right {
        margin-left: 20px;
        margin-top: 5px;
    }

    .info-left {
        margin-top: 10px;
    }

    .info-right p {
        text-align: left;
        color: #666;
    }

    .info-right p span {
        font-weight: 700;
        color: #f40;
    }

    .info-inner .del-pro {
        flex-grow: 1;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
    }

    .total {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: left;
        text-indent: 2em;
    }

    .total > div {
        flex: 1;
    }

    .total span {
        display: block;
        margin-top: 10px;
        font-size: 16px;
    }

    .total strong {
        color: #f40;
    }

</style>