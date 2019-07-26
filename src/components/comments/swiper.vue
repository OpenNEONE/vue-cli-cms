<template>
    <div>
        <mt-swipe :auto="4000" class="sliders">
            <mt-swipe-item v-for="item in swiperlist" :key="item.id">
                <img :src="item.img" alt />
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
    props: ["swiperlist"]
}
</script>

<style scoped>
    .sliders {
        height: 130px;
    }
    .sliders img {
        width: 100%;
    }
</style>