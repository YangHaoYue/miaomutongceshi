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
					<button class="cu-btn bg-yellow round text-white" v-if="person === 1">已认证</button>
					<button class="cu-btn bg-yellow round text-white" v-else @tap="toShi">去认证</button>
				</view>
			</view>
			<view class="padding-top-xl" style="border-radius: 25rpx;height: 348rpx;width: 304rpx;background-color: #F7F7F7;">
				<view style="width: 100rpx;height: 130rpx;margin: auto;">
					<image src="../../../static/mine/qi.png" mode="aspectFit" style="width: 100rpx;height: 130rpx;"></image>
				</view>
				<view class="text-bold text-black text-center text-xl margin-top-sm">企业认证</view>
				<view class="flex justify-center" style="margin: 10rpx auto;">
					<button class="cu-btn bg-cyan round text-white" v-if="enterprise === 1">已认证</button>
					<button class="cu-btn bg-cyan round text-white" @tap="toQi">去认证</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onShow() {
			this.getAuthentication()
		},
		data() {
			return {
				person:'',
				enterprise:''
			}
		},
		methods: {
			getAuthentication(){
				this.http.get('authenticate/getAuthentication').then((res)=>{
					if(res.code==1000){
						this.person=res.data.person;
						this.enterprise=res.data.enterprise;
					}
				})
			},
			toShi(){
				switch(this.person.auth){
					case -1:
						uni.navigateTo({url: 'shimin'});
						break;
					case 0:
						this.http.toast('正在审核中...');
						break;
					case 1:
						uni.navigateTo({url: 'success'});
						break;
					case 2:
						this.http.toast(this.person.reason);
						setTimeout(()=>{uni.navigateTo({url: 'shimin'});},1500)
						break;
					default:
						return;
				}
			},
			toQi(){
				switch(this.enterprise.auth){
					case -1:
						uni.navigateTo({url: 'qiye'});
						break;
					case 0:
						this.http.toast('正在审核中...');
						break;
					case 1:
						uni.navigateTo({url: 'success'});
						break;
					case 2:
						this.http.toast(this.enterprise.reason);
						setTimeout(()=>{uni.navigateTo({url: 'qiye'});},1500)
						break;
					default:
						return;
				}
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
