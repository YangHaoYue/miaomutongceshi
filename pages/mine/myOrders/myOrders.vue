<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true">
			<block slot="backText">我的订单</block>
		</cu-custom>
		<!-- 导航栏 -->
		<scroll-view scroll-x class="bg-white nav margin-bottom-sm" :scroll-into-view="scrollInto" :scroll-with-animation="true">
			<view class="flex justify-around">
				<view class="cu-item cuitem text-lg text-bold" :class="item.tabindex==TabCur?'text-green Tabcur':''"
				 v-for="(item,id) in TabList" :key="id"
				  @tap="tabSelect(item)" :id="'tab'+item.tabindex">
					{{item.TabName}}
				</view>
			</view>
		</scroll-view>
		<!-- 列表 -->
		<view class="bg-gray" style="height: 20rpx;"></view>
		<view class="" v-for="i in 5" :key="i" v-show="TabCur==0">
			<view class="flex justify-between align-center padding">
				<view class="text-black text-bold text-lg">
					卖家：青州市黄楼润通花卉
					<text class="bg-blue margin-right-xs text-lg margin-left" style="padding: 5rpx;">企 </text>
					<text class="bg-yellow text-white margin-right-xs text-lg" style="padding: 5rpx;">实 </text>
				</view>
				<view class="text-yellow text-lg text-bold">待确认</view>
				<!-- <view class="text-yellow text-lg text-bold">待发货</view> -->
			</view>
			<view class="flex align-center bg-white padding-tb-sm padding-lr solid-bottom" style="width: 100%;">
				<view class="flex-sub">
					<image src="../../../static/logo.png" mode="aspectFit" style="width: 234rpx;height: 214rpx;"></image>
				</view>
				<view class="margin-left flex-twice">
					<view class="text-black text-lg text-bold margin-top-sm">樱花</view>
					<view class="margin-top-xs text-lg">电议</view>
					<view class="margin-top-sm">主蔓长度:20-25厘米，高度...</view>
					<view class="margin-top-xs">采购数量:1株</view>
				</view>
			</view>
			<view class="text-yellow text-lg text-bold padding">电议</view>
			<view class="bg-gray" style="height: 20rpx;"></view>
		</view>
		<!-- 暂无订单 -->
		<view style="margin: 180rpx auto;">
			<view class="flex align-center justify-center">
				<image src="../../../static/mine/no_orders.png" mode="aspectFit" style="height: 278rpx;width: 255rpx;"></image>
			</view>
			<view class="text-center margin-top-xl" style="color: #333333;">暂无订单</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollInto:'',
				TabCur: 0,
				TabList:[{
					tabindex:0,
					TabName:'全部'
				},{
					tabindex:1,
					TabName:'待收款'
				},{
					tabindex:2,
					TabName:'待收货'
				}],
				list:[]
			}
		},
		methods: {
			/* 导航栏切换 */
			tabSelect(item) {
				this.TabCur=item.tabindex;
				this.scrollInto='tab'+item.tabindex;
			},
		}
	}
</script>

<style>
	page{
		background-color: #FFFFFF;
		height: 100vh;
	}
	.Tabcur{
		border-bottom: solid #00913A 4upx;
	}
</style>
