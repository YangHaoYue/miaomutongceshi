<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true"><block slot="backText">认证信息</block></cu-custom>
		<view class="flex justify-around padding-lr-xl margin-top">
			<view class="padding-top-xl" style="border-radius: 25rpx;height: 348rpx;width: 304rpx;background-color: #F7F7F7;">
				<view style="width: 100rpx;height: 130rpx;margin: auto;">
					<image src="../../../static/mine/shi.png" mode="aspectFit" style="width: 100rpx;height: 130rpx;"></image>
				</view>
				<view class="text-bold text-black text-center text-xl margin-top-sm">实名认证</view>
				<view class="flex justify-center" style="margin: 10rpx auto;">
					<button class="cu-btn bg-yellow round text-white" @tap="toShi">去认证</button>
				</view>
			</view>
			<view class="padding-top-xl" style="border-radius: 25rpx;height: 348rpx;width: 304rpx;background-color: #F7F7F7;">
				<view style="width: 100rpx;height: 130rpx;margin: auto;">
					<image src="../../../static/mine/qi.png" mode="aspectFit" style="width: 100rpx;height: 130rpx;"></image>
				</view>
				<view class="text-bold text-black text-center text-xl margin-top-sm">企业认证</view>
				<view class="flex justify-center" style="margin: 10rpx auto;">
					<button class="cu-btn bg-cyan round text-white" @tap="toQi">去认证</button>
				</view>
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
			toShi:function(){
				uni.navigateTo({url: 'shimin'});
			},
			toQi:function(){
				uni.navigateTo({url: 'qiye'});
			}
		}
	}
</script>

<style>
	page{
		background-color: #FFFFFF;
		height: 100vh;
	}
</style>
