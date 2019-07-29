<template>
    <div>
        <div class="mui-numbox" data-numbox-step='1' data-numbox-min='0' data-numbox-max='100'>
            <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
            <input class="mui-numbox-input" type="number"/>
            <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
        </div>
    </div>
</template>

<script>

import mui from '../../assets/lib/mui/dist/js/mui.js'

export default {
    mounted() {
        mui(".mui-numbox").numbox().setValue(1)
    }
}
</script>

<style scoped>
    .mui-numbox {
        height: 30px;
        line-height: 30px;
    }
</style>