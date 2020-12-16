<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true">
			<block slot="backText">提现</block>
		</cu-custom>
		<view class="bg-gray" style="height: 20rpx;"></view>
		<view class="flex justify-between bg-white padding-lr padding-tb-xl" @tap="writeInfo">
			<view class="title">提现至银行卡<text class="text-gray margin-left-sm">{{bankname}}({{name}})</text></view>
			<view class="cuIcon-right nameicon"></view>
		</view>
		<view class="bg-gray" style="height: 20rpx;"></view>
		
		<view class="cashCard bg-white">
			<view class="">可提现余额￥{{balance}}</view>
			<view class="input flex align-center">
				<view class="text">￥</view>
				<input type="number" :maxlength="balance" placeholder="请输入提现金额" v-model="money" />
			</view>
			<view class="flex justify-between">
				<view class="content">可提现余额￥{{balance}}(收取{{poundage}}%手续费)</view>
				<view class="btn" @tap="all">全部提现</view>
			</view>
		</view>
		<button class="cu-btn cashBtn bg-green round" @tap="toCash">申请提现</button>
	</view>
</template>

<script>
	
	export default {
		onLoad() {
			/* this.getInfo(); */
		},
		onShow() {
			/* this.getBankInfo(); */
		},
		data() {
			return {
				name:'请前去填写银行卡信息',
				bankname:'',
				
				money:0,
				balance:11,
				poundage:0,
				account:''
			}
		},
		methods: {
			getInfo(){
				let token=uni.getStorageSync('token');
				uni.request({
					url: Url.websiteUrl+'user/getCashInfo',
					method: 'POST',
					header:{Authorization:'Bearer '+token},
					data: {},
					success: res => {
						if(res.data.status_code==0){
							this.balance=res.data.data.canCash;
							this.poundage=res.data.data.poundage;
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			//获取银行卡信息
			getBankInfo(){
				let token=uni.getStorageSync('token');
				uni.request({
					url: Url.websiteUrl+'user/getBankInfo',
					method: 'POST',
					header:{Authorization:'Bearer '+token},
					data: {},
					success: res => {
						if(res.data.status_code==0){
							this.name=res.data.data.name;
							this.bankname=res.data.data.bank_name;
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			all(){
				this.money=this.balance;
			},
			/* 填写账户 */
			writeInfo(){
				uni.navigateTo({url: 'information'});
			},
			toCash(){
				let token=uni.getStorageSync('token');
				uni.request({
					url: Url.websiteUrl+'user/applyCash',
					method: 'POST',
					header:{Authorization:'Bearer '+token},
					data: {
						money:this.money
					},
					success: res => {
						uni.showToast({
							icon:'none',
							title: res.data.message
						});
						if(res.data.status_code==0){
							setTimeout(()=>{
								uni.navigateBack({
									delta: 1
								});
							},1500)
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #FFFFFF;
		height: 100vh;
	}
	.cashCard{
		width: 100%;
		height: 360upx;
		padding: 20upx 20upx;
		.title{
			margin-left: 27upx;
			color: #333333;
			font-size: 30upx;
			text{
				color: #999999;
				margin-left: 25upx;
			}
		}
		.nameicon{
			font-size: 42upx;
			color: #333333;
		}
		.input{
			color: #333333;
			padding: 20upx 30upx 0;
			border-bottom: 1upx solid #EEEEEE;
			.text{
				font-size: 72upx;
				line-height: 1.5;
			}
			input{
				font-size: 72upx;
				height: 72upx;
			}
		}
		.content{
			color: #999999;
			font-size: 24upx;
			margin: 19upx 0 0 27upx;
		}
		.btn{
			color: #0C5EA1;
			font-size: 24upx;
			margin: 19upx 9upx 0 0;
		}
	}
	.cashBtn{
		width: 650rpx;
		height: 90rpx;
		margin: 0 50rpx;
		position: fixed;
		bottom: 103rpx;
	}
</style>
