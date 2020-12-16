<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true">
			<block slot="backText">收到报价</block>
		</cu-custom>
		<!-- 求购信息 -->
		<view class="padding">
			<view class="margin-tb-sm">25公分国槐</view>
			<view class="margin-tb-sm">采购数量1125公分</view>
			<view class="margin-tb-sm">截止日期:2020-12-06</view>
		</view>
		<view class="bg-gray" style="height: 20rpx;"></view>
		<!-- 报价列表 -->
		<view class="margin-tb" v-for="i in 5" :key="i">
			<view class="flex justify-between align-center margin-bottom-sm padding-lr">
				<view><text class="text-green text-lg">250元/株</text>【上车价】</view>
				<view class="cuIcon-phone text-green" style="font-size: 42rpx;"></view>
			</view>
			<view class="margin-bottom-sm padding-lr">双子苗木 | 山东省济南市</view>
			<view class="flex justify-between align-center margin-bottom-sm padding-lr">
				<view class="bg-blue margin-right-xs" style="padding: 5rpx;">企 </view>
				<button class="cu-btn line-green radius sm">查看图片</button>
			</view>
			<view class="bg-gray" style="height: 20rpx;"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
		height: 100vh;
	}
</style>
