<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true">
			<block slot="backText">我的钱包</block>
		</cu-custom>
		<view class="text-center" style="margin: 180rpx 0 120rpx;">
			<view>账户余额(元)</view>
			<view class="text-sl text-black text-bold margin-top">{{money}}</view>
		</view>
		<button class="cu-btn radius text-white lg" style="width: 550rpx;margin: 20rpx 100rpx;background-color: #15C66B;" @click="toCash">提现</button>
		<button class="cu-btn radius text-white lg" style="width: 550rpx;margin: 20rpx 100rpx;background-color: #FA7F43;" @click="toDetail">收支明细</button>
	</view>
</template>

<script>
	export default {
		onShow() {
			this.getInfo()
		},
		data() {
			return {
				money:0.00
			}
		},
		methods: {
			getInfo(){
				this.http.post('packet/getBalance').then((res)=>{
					if(res.code==1000){
						this.money=res.data.balance;
					}
				})
			},
			toCash(){
				uni.navigateTo({url: 'cash'});
			},
			toDetail(){
				uni.navigateTo({url: 'detail'});
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
