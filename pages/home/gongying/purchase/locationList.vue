<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true">
			<block slot="backText">收货地址</block>
		</cu-custom>
		<!-- 地址列表 -->
		<view class="padding text-lg text-bold" v-if="locationList.length==0">
			点击下方按钮添加地址
		</view>
		<view class="bg-white margin-bottom" v-for="(item,index) in locationList" :key="index" @click="choose(item.id)">
			<view class="flex justify-between margin-top margin-lr">
				<view><text v-if="item.is_default==1">【默认】</text>{{item.receive_name}}</view>
				<view>{{item.receive_phone}}</view>
			</view>
			<view class="padding-tb-sm solid-bottom padding-lr">{{item.area.merger_name}}{{item.address}}</view>
			<view class="flex justify-around align-center margin-lr">
				<view class="flex-sub solid-right text-center padding" @tap.stop="toLocation(item.id)">编辑</view>
				<view class="flex-sub text-center padding" @tap.stop="makeDefault(item)">设为默认</view>
			</view>
			<view class="bg-gray" style="height: 20rpx;width: 100%;"></view>
		</view>
		<!-- 添加新的地址 -->
		<button class="cu-btn round logobtn bg-green" @tap="toAddLocation">新增收货地址</button>
	</view>
</template>

<script>
	export default {
		onShow() {
			this.getInfo()
		},
		data() {
			return {
				locationList:[]
			}
		},
		methods: {
			getInfo(){
				this.http.post('address/getList').then((res)=>{
					if(res.code==1000){
						this.locationList=res.data
					}
				})
			},
			toLocation(address_id){
				uni.navigateTo({url: 'addLocation?address_id='+address_id});
			},
			toAddLocation(){
				uni.navigateTo({url: 'addLocation'});
			},
			makeDefault(item){
				this.http.post('address/setDefault',{
					address_id:item.id
				}).then((res)=>{
					if(res.code==1000){
						this.http.toast(res.msg);
						this.getInfo()
					}
				})
			},
			choose(id){
				uni.setStorageSync('address_id',id);
				uni.navigateBack({delta: 1});
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
