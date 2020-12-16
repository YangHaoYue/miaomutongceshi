<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true"><block slot="backText">我的收藏</block></cu-custom>
		<!-- 无收藏 -->
		<view v-show="true">
			<view style="width: 283rpx;height: 279rpx;margin: 240rpx auto 120rpx">
				<image src="../../../static/mine/nobox.png" mode="aspectFit" style="width: 283rpx;height: 279rpx;"></image>
			</view>
			<view class="text-black text-sm text-center text-bold">暂无收藏记录，去供应大厅看看</view>
			<button class="cu-btn bg-green logobtn round" @click="toHome">点击进入供应大厅</button>
		</view>
		<!-- 收藏列表 -->
		<view class="flex padding bg-white padding-tb-xs margin-tb" style="width: 100%;" v-for="i in 5" :key="i" v-show="false">
			<view class="flex-sub ">
				<image src="../../../static/logo.png" mode="aspectFit" style="width: 234rpx;height: 214rpx;"></image>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toHome(){
				uni.reLaunch({url:'../../index/index?toGYDT=true'});
			}
		}
	}
</script>

<style>
	page{
		background-color: #FFFFFF;
		height: 100vh;
	}
	.logobtn{
		width: 650upx;
		height: 88upx;
		margin: 0 50upx;
		position: fixed;
		bottom: 180upx;
	}
</style>
