<template>
    <div>
		<!-- 滑动的导航 -->
        <div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
					<a class="mui-control-item mui-active" 
					   href="#"
					   data-wid="tab-top-subpage-1.html"
					   v-for="item in navlist" :key="item.id">
						{{ item.title }}
					</a>
				</div>
			</div>
		</div>

		<!-- 展示的图片信息 -->
		<ul class="message">
			<li v-for="item in picList" :key="item.id">
				<router-link :to="'/home/photoInfo/' + item.id">
					<img :src="item.img_url" alt="">
					<div class="float-bg">
						<h3>{{ item.title }}</h3>
						<p>{{ item.zhaiyao }}</p>
					</div>
				</router-link>
			</li>
		</ul>

    </div>
</template>

<script>

import { NavList, PicList } from '@/api'
import mui from '../../assets/lib/mui/dist/js/mui.js'

export default {
	data(){
		return {
			navlist: [],
			picList: []
		}
	},
	created() {
		this.getNavList()
		this.getPicList()
	},
    mounted() {
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        })
	},
	methods: {
		getNavList() {
			NavList().then(res => {
				if(res.data.status == 0) {
					this.navlist = res.data.message

					let o = {
						id: 0,
						title: '全部'
					}
					this.navlist.unshift(o)
				}
			})
		},
		getPicList() {
			PicList(0).then(res => {
				console.log(res)
				if(res.data.status == 0) {
					this.picList = res.data.message
				}
			})
		}
	}
}
</script>

<style scoped>
    
    * {
        touch-action: pan-y;
		margin: 0;
		padding: 0;
    }

	.message {
		list-style: none;
		text-align: left;
	}

	.message li {
		position: relative;
		width: 92%;
		margin: 20px auto;
		border-radius: 0 0 10px 10px;
		overflow: hidden;
	}

	.message img {
		width: 100%;
		display: block;
	}

	.message h3 {
		width: 92%;
		margin: 0 auto;
		font-size: 18px;
		line-height: 26px;
		color: #fff;
		padding: 10px 20px;

		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;

	}

	.message p {
		width: 92%;
		margin: 0 auto;
		line-height: 24px;
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

		color: #eee;
		padding: 0 20px;
		text-indent: 2em;
		font-size: 16px;
	}

	.message .float-bg {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		background-color: rgba(0, 0, 0, .6);
		padding-bottom: 20px;
	}





</style>