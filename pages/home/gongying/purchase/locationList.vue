<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true">
			<block slot="backText">收货地址</block>
		</cu-custom>
		<!-- 地址列表 -->
		<view class="bg-white margin-bottom" v-for="(item,index) in locationList" :key="index">
			<view class="flex justify-between margin-top margin-lr">
				<view><text>【默认】</text>{{item.name}}</view>
				<view>{{item.phone}}</view>
			</view>
			<view class="padding-tb-sm solid-bottom padding-lr">{{item.address}}</view>
			<view class="flex justify-around align-center margin-lr">
				<view class="flex-sub solid-right text-center padding">编辑</view>
				<view class="flex-sub text-center padding">设为默认</view>
			</view>
			<view class="bg-gray" style="height: 20rpx;width: 100%;"></view>
		</view>
		<!-- 添加新的地址 -->
		<button class="cu-btn round logobtn bg-green" @tap="toAddLocation">新增收货地址</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				locationList:[{
					name:'花花',
					phone:'19813717145',
					address:'辽宁省沈阳市苏家屯火车站'
				},{
					name:'花花',
					phone:'19813717145',
					address:'辽宁省沈阳市苏家屯火车站'
				},{
					name:'花花',
					phone:'19813717145',
					address:'辽宁省沈阳市苏家屯火车站'
				}]
			}
		},
		methods: {
			toAddLocation(){
				uni.navigateTo({url: 'addLocation'});
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
		width: 90%;
		height: 88upx;
		position: fixed;
		margin-left: 5%;
		bottom: 44upx;
		z-index: 999;
	}
</style>
