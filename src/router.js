import VueRouter from 'vue-router'

import home from './components/tabbar/home.vue'
import member from './components/tabbar/member.vue'
import shopcar from './components/tabbar/shopcar.vue'
import search from './components/tabbar/search.vue'

import newsList from './components/news/newsList.vue'
import newsInfo from './components/news/newsInfo.vue'
import photolist from './components/photos/photoList.vue'
import photoInfo from './components/photos/photoInfo.vue'
import goodsList from './components/goods/goodsList.vue'
import goodsInfo from './components/goods/goodsInfo.vue'
import commentDesc from './components/comments/commentDesc.vue'
import comments from './components/comments/proComment.vue'

export default new VueRouter({
    routes: [
        { path: '/', redirect: "/home" },
        { path: "/home", component: home },
        { path: "/member", component: member },
        { path: "/shopcar", component: shopcar },
        { path: "/search", component: search },
        { path: '/home/newsList', component: newsList },
        { path: '/home/newsInfo/:id', component: newsInfo },
        { path: '/home/photolist', component: photolist },
        { path: '/home/photoInfo/:id', component: photoInfo },
        { path: '/home/goodslist', component: goodsList },
        { path: '/home/goodsInfo/:id', component: goodsInfo, name: "goodsInfo" },
        { path: '/home/commentDesc/:id', component: commentDesc, name: "commentDesc" },
        { path: '/home/comments/:id', component: comments, name: "comments" }

    ],
    linkActiveClass: "mui-active"
})