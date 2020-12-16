<template name="home">
	<view class="container">
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="false">
			<block slot="backText"><image src="../../static/home/home_title_img.png" style="width: 224rpx;height: 72rpx;" mode="aspectFit"></image></block>
		</cu-custom>
		<!-- 搜索框 -->
		<view class="cu-bar search bg-white">
			<view class="action text-green text-sm">
				<text class="cuIcon-location"></text>
				<text>{{city}}</text>
				<text class="cuIcon-triangledownfill"></text>
			</view>
			<navigator hover-class='none' url="/pages/home/search/search" class="search-form round" navigateTo>
				<text class="cuIcon-search"></text>
				<input disabled="true" :adjust-position="false" type="text" placeholder="搜索苗木信息" confirm-type="search"></input>
			</navigator>
		</view>
		<!-- 轮播图 -->
		<swiper class="screen-swiper" :indicator-dots="false" :circular="true"
		 :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
				<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
			</swiper-item>
		</swiper>
		<!-- 分类 -->
		<view class="flex justify-around bg-white padding">
			<view v-for="(item,index) in categoryList" :key="index" class="align-center ">
				<navigator hover-class='none' :url="item.url" class="search-form round" navigateTo>
					<image :src="item.img" mode="aspectFit" style="width: 90rpx;height: 90rpx;"></image>
					<view class="text-sm">{{item.title}}</view>
				</navigator>
			</view>
		</view>
		<!-- 苗科分类 -->
		<view class="cu-list grid col-4 no-border margin-top">
			<view class="cu-item" v-for="(item,index) in botanyList" :key="index" >
				<view style="width: 90rpx;height: 90rpx;margin: auto;" >
					<image :src="item.img" mode="aspectFit" style="width: 90rpx;height: 90rpx;"></image>
				</view>
				<text>{{item.title}}</text>
			</view>
		</view>
		<!-- 供应大厅和求购大厅 -->
		<scroll-view scroll-x class="bg-white nav margin-top " :scroll-into-view="scrollInto" :scroll-with-animation="true">
			<view class="flex justify-around">
				<view class="cu-item cuitem text-lg text-bold" :class="item.tabindex==TabCur?'text-green Tabcur':''"
				 v-for="(item,id) in TabList" :key="id"
				  @tap="tabSelect(item)" :id="'tab'+item.tabindex">
					{{item.TabName}}
				</view>
			</view>
		</scroll-view>
		<!-- 供应列表 -->
		<view class="flex padding bg-white padding-tb-sm" style="width: 100%;" v-for="i in 5" :key="i" v-show="TabCur==0">
			<view class="flex-sub ">
				<image src="../../static/logo.png" mode="aspectFit" style="width: 234rpx;height: 214rpx;"></image>
			</view>
			<view class="margin-left flex-twice">
				<view class="flex align-center justify-between margin-top ">
					<view class="flex align-center">
						<view class="text-black text-lg text-bold">樱花</view>
						<view class="bg-green margin-left text-center radius text-sm" style="width: 80rpx;">家庭</view>
					</view>
					<view>五分钟前</view>
				</view>
				<view class="flex align-center margin-top-sm">
					<view class="money">100.00<text>元/株</text></view>
					<view class="margin-left">1213人查看</view>
				</view>
				<view class="margin-top-sm"><text class="bg-blue margin-right-xs">企 </text> 江苏省徐州市</view>
			</view>
		</view>
		<!-- 求购列表 -->
		<view class="flex padding bg-white padding-tb-sm solid-bottom" style="width: 100%;" v-for="i in 5" :key="i" v-show="TabCur==1">
			<view class="margin-left flex-twice">
				<view class="flex align-center justify-between margin-top">
					<view class="text-black text-lg">60公分五角枫</view>
					<view>五分钟前</view>
				</view>
				<view class="flex align-center margin-top-sm">求购数量：2株 | 2020-12-04截至</view>
				<view class="flex align-center margin-top-sm">求购地区：北京市… </view>
				<view class="margin-top-sm flex justify-between">
					<view>
						<text class="bg-blue margin-right-xs text-lg">企 </text>
						<text  class="bg-green margin-right-xs text-lg">保</text>
						<text class="text-gray">7个报价</text>
					</view>
					<navigator hover-class='none' url="/pages/home/offer/offer" navigateTo>
						<button class="cu-btn line-green sm" >去报价</button>
					</navigator>
				</view>
			</view>
		</view>
		<!-- 底部导航栏Tabbar -->
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	export default {
		
		created() {
			
		},
		data() {
			return {
				scrollTop:0,
				skeletonShow:true,
				
				city:'萧山区',
				InputBottom: 0,
				
				/* 轮播图列表 */
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}],
				/* 分类列表 */
				categoryList:[{
					title:'工程供应',
					img:'../../static/home/category/gongcheng.png',
					url:'/pages/home/gongying/gongying?title=工程供应'
				},{
					title:'家庭供应',
					img:'../../static/home/category/jiating.png',
					url:'/pages/home/gongying/gongying?title=家庭供应'
				},{
					title:'求购大厅',
					img:'../../static/home/category/qiugou.png',
					url:'/pages/home/gongying/gongying?title=求购大厅'
				},{
					title:'地图找苗',
					img:'../../static/home/category/map.png',
					url:'/pages/home/gongying/gongying'
				},{
					title:'苗木课堂',
					img:'../../static/home/category/class.png',
					url:'/pages/home/class/class'
				}],
				/* 苗科列表 */
				botanyList:[{
					title:'工程小苗',
					img:'../../static/home/category/gongcheng.png'
				},{
					title:'容器苗',
					img:'../../static/home/category/gongcheng.png'
				},{
					title:'造型树',
					img:'../../static/home/category/gongcheng.png'
				},{
					title:'水生植物',
					img:'../../static/home/category/gongcheng.png'
				},{
					title:'资材',
					img:'../../static/home/category/gongcheng.png'
				},{
					title:'草坪草种',
					img:'../../static/home/category/gongcheng.png'
				},{
					title:'地被花草',
					img:'../../static/home/category/gongcheng.png'
				},{
					title:'绿植',
					img:'../../static/home/category/gongcheng.png'
				},],
				/* 供应大厅和求购大厅 */
				scrollInto:'',
				TabCur: 0,
				TabList:[{
					tabindex:0,
					TabName:'供应大厅'
				},{
					tabindex:1,
					TabName:'求购大厅'
				}],
			}
		},
		methods: {
			/* 导航栏切换 */
			tabSelect(item) {
				this.TabCur=item.tabindex;
				this.scrollInto='tab'+item.tabindex;
			},
			/* 报价 */
			toOffer(){
				uni.navigateTo({url: 'offer/offer'});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.Tabcur{
		border-bottom: solid #00913A 4upx;
	}
	.money{
		font-size: 40rpx;
		color: #FA7F43;
		text{
			font-size: 32rpx;
		}
	}
</style>
