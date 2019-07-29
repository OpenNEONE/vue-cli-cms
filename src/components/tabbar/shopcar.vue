<template>
  <div>

    <div class="mui-card shopcar-info" v-for="item in proList" :key="item.id">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
            <mt-switch></mt-switch>

            <div class="info-inner">
                <h3>{{ item.title }}</h3>
                <div class="info-left">
                    <img :src="item.thumb_path" alt="">
                </div>
                <div class="info-right">
                    <p>价格：<span>￥{{ item.sell_price}}</span></p>
                    <p>
                        <numbox></numbox>
                    </p>
                </div>
                <div class="del-pro">
                    <a href="#">删除</a>
                </div>
            </div>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
            这里将来是结算购物车的信息
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
                    console.log(res.data)
                    this.proList = res.data.message
                }
            })
        }
    }
}
</script>

<style scoped>
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
        width: 240px;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-left: -10px;
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

</style>