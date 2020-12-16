<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true">
			<block slot="backText">苗木课堂</block>
		</cu-custom>
		<!-- 课堂列表 -->
		<view class="margin-tb-sm margin-lr radius bg-white flex padding-sm" v-for="i in 5" :key="i" @tap="toDetail">
			<view class="flex-sub">
				<image src="../../../static/logo.png" mode="aspectFit" style="width: 223rpx;height: 225rpx;"></image>
			</view>
			<view class="flex-twice">
				<view class="margin padding-tb-sm">
					苗木装车运输技巧你知道多少?
				</view>
				<view class="flex justify-between text-sm margin-top-xl margin-lr">
					<view class=" text-gray"><text class="cuIcon-attention"></text>1213</view>
					<view class="text-black">2020.11.03</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				classList:[{
					
				}]
			}
		},
		methods: {
			toDetail(){
				uni.navigateTo({url: 'detail'});
			}
		}
	}
</script>

<style>

</style>
