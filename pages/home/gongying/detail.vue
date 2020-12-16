<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true"><block slot="backText">供货详情</block></cu-custom>
		<!-- 供应和详情 -->
		<scroll-view scroll-x class="bg-white nav" :scroll-into-view="scrollInto" :scroll-with-animation="true" :style="'top:'+this.CustomBar+'px;'" style="position: fixed;z-index: 999;">
			<view class="flex justify-around">
				<view class="cu-item cuitem text-lg text-bold" :class="item.tabindex==TabCur?'text-green Tabcur':''"
				 v-for="(item,id) in TabList" :key="id"
				  @tap="tabSelect(item)" :id="'tab'+item.tabindex">
					{{item.TabName}}
				</view>
			</view>
		</scroll-view>
		<!-- 轮播图 -->
		<swiper class="screen-swiper" style="margin-top: 90rpx;" :indicator-dots="false" :circular="true"
		 :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
				<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
			</swiper-item>
		</swiper>
		<!-- 介绍 -->
		<view class="flex justify-around align-center padding bg-white">
			<view class="flex-treble">
				<view class="text-xl text-black margin-bottom">美国红枫-秋火焰</view>
				<view class="flex justify-between text-gray margin-bottom">
					<view>山东省临沂市</view>
					<view><text class="cuIcon-locationfill"></text>920.96公里</view>
				</view>
				<view class="flex justify-between text-gray">
					<view class="text-orange">电议</view>
					<view>1229人查看</view>
				</view>
			</view>
			<view class="flex-twice flex justify-end">
				<view class="round cu-btn bg-white" :class="isCollection?'text-green':'text-gray'"  @tap="Collection" style="border: 1rpx solid #AAAAAA;"><text class="cuIcon-favorfill"></text>收藏</view>
			</view>
		</view>
		<!-- 安全风险 -->
		<view class="padding margin-top flex justify-between align-center" style="background-color: #F5F9FF;">
			<view style="color: #0085FF;">
				<view class="margin-bottom">交易安全提醒</view>
				<view class="text-sm">微信转账风险高，见面交易需谨慎，线上交易更安全</view>
			</view>
			<view class="cuIcon-lock" style="font-size: 48rpx;color: #0085FF;"></view>
		</view>
		<!-- 经营人 -->
		<view class="cu-list menu-avatar">
			<view class="cu-item" @click="toStoreShop">
				<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
				<view class="content">
					<view class="text-black text-lg"><view class="text-cut">李玉龙<text class="bg-blue margin-right-xs radius margin-left-sm">企</text></view></view>
					<view class="text-gray text-sm flex"> <view class="text-cut">持续经营550天 诚信等级：4级</view></view>
				</view>
				<view class="action">
					<view class="text-grey cuIcon-right"></view>
				</view>
			</view>
			<!-- 详细信息 -->
			<view class="padding bg-white">
				<view class="padding-bottom">详细信息</view>
				<view class="cu-list grid col-2">
					<view class="flex align-center" v-for="(item,id) in detailList" :key="id">
						<view class="padding-sm flex-twice text-sm" style="background-color: #D1D1D1;border: solid 2rpx #929292;white-space: nowrap;">{{item.title}}</view>
						<view class="padding-tb-sm flex-treble text-sm" style="background-color: #F7F7F7;border: solid 2rpx #929292;white-space: nowrap;">{{item.data}}</view>
					</view>
				</view>
			</view>
			<!-- 联系 -->
			<view class="padding-lr padding-bottom text-black text-bold bg-white">
				<view>【联系我时，请说是在苗木通上看到的】</view>
				<view>一品货源，想要的电议：18769911234</view>
			</view>
		</view>
		<!-- image -->
		<template>
			<view v-for="(item,i) in banList" :key="i">
				<image :src="item.url" style="width: 100%;" mode="widthFix"></image>
			</view>
		</template>
		<!-- 底部导航栏Tabbar高度 -->
		<view class="cu-tabbar-height margin-top-sm"></view>
		<!-- 导航栏Tabbar -->
		<view class="cu-bar bg-white tabbar border shop" style="position: fixed;bottom: 0;right: 0;left: 0;z-index: 999;">
			<view class="action" @click="tpPurchase">
				<view class="cuIcon-deliver" style="font-size: 48rpx;"></view>
				立即购买
			</view>
			<view class="btn-group">
				<button class="cu-btn bg-orange radius shadow-blur lg">聊一聊</button>
				<button class="cu-btn bg-green radius shadow-blur lg">打电话</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur: 0,
				scrollInto:'tab0',
				TabList:[{
					tabindex:0,
					TabName:'供应'
				},{
					tabindex:1,
					TabName:'详情'
				}],
				/* 是否收藏 */
				isCollection:false,
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
				detailList:[{
					title:'用户录入',
					data:'美国红枫-秋火焰'
				},{
					title:'米径',
					data:'10-10公分'
				},{
					title:'种植状态',
					data:'原生苗'
				},{
					title:'价格形式',
					data:'上车价'
				},{
					title:'供货数量',
					data:'10000000株'
				},],
				banList:[{
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
				}]
			}
		},
		onPageScroll(e) {
			console.log(e)
			if(e.scrollTop>=515){
				this.TabCur=1;
				this.scrollInto='tab1';
			}else{
				this.TabCur=0;
				this.scrollInto='tab0';
			}
		},
		methods: {
			/* 导航栏切换 */
			tabSelect(item) {
				this.TabCur=item.tabindex;
				this.scrollInto='tab'+item.tabindex;
				if(this.TabCur==0){
					uni.pageScrollTo({scrollTop: 0});
				}else{
					uni.pageScrollTo({scrollTop: 515});
				}
			},
			/* 收藏 */
			Collection(){
				this.isCollection =! this.isCollection;
			},
			/* 立即购买 */
			tpPurchase(){
				uni.navigateTo({url: 'purchase/purchase'});
			},
			/* 查看店铺 */
			toStoreShop(){
				uni.navigateTo({url: 'storeShop'});
			}
		}
	}
</script>

<style scoped>
	.Tabcur{
		border-bottom: solid #00913A 4upx;
	}
</style>
