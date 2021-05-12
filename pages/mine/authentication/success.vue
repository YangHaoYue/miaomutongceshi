<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true"><block slot="backText">认证成功</block></cu-custom>
		<view style="width: 365rpx;height: 231rpx;margin: 120rpx auto 60rpx;">
			<image src="../../../static/mine/renzheng/success.png" mode="aspectFit" style="width: 355rpx;height: 231rpx;margin-left: 20rpx;"></image>
		</view>
		<view class="text-black text-bold text-xxl text-center">认证成功!</view>
		<view class="text-gray text-lg text-center">恭喜您!</view>
		<view class="text-gray text-lg text-center">您已完成认证，可返回查看。</view>
		<button class="cu-btn bg-green logobtn round" @tap="back">完成</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			back:function(){
				uni.navigateBack({
					delta: 2
				});
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
