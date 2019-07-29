<template>
    <div>
        <div class="mui-numbox" data-numbox-step='1' data-numbox-min='1' data-numbox-max='100'>
            <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
            <input class="mui-numbox-input" type="number" 
                    :value="initCount"
                    @change="changeGoodsVal"
                    ref="numbox" />
            <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
        </div>
    </div>
</template>

<script>

import mui from '../../assets/lib/mui/dist/js/mui.js'

export default {
    mounted() {
        mui(".mui-numbox").numbox()
    },
    props: ['initCount', 'goodsid'],
    methods: {
        changeGoodsVal() {
            this.$store.commit("updateGoodsInfo", {
                id: this.goodsid,
                count: this.$refs.numbox.value
            })
        }
    }
}
</script>

<style scoped>
    .mui-numbox {
        height: 30px;
        line-height: 30px;
    }
</style>