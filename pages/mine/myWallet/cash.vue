<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true">
			<block slot="backText">提现</block>
		</cu-custom>
		<view class="bg-gray" style="height: 20rpx;"></view>
		<view class="flex justify-between bg-white padding-lr padding-tb-xl" @tap="writeInfo">
			<view class="title">提现至银行卡<text class="text-gray margin-left-sm">{{card_info.bank}}</text></view>
			<view class="cuIcon-right nameicon"></view>
		</view>
		<view class="bg-gray" style="height: 20rpx;"></view>
		
		<view class="cashCard bg-white">
			<view class="">总余额￥{{balance}}</view>
			<view class="input flex align-center">
				<view class="text">￥</view>
				<input type="digit" placeholder="请输入提现金额" v-model="money" />
			</view>
			<view class="flex justify-between">
				<view class="content">可提现余额￥{{can_withdraw}}(收取{{service_fee}}%手续费)</view>
				<view class="btn" @tap="all">全部提现</view>
			</view>
		</view>
		<button class="cu-btn cashBtn bg-green round" @tap="toCash">申请提现</button>
	</view>
</template>

<script>
	
	export default {
		onShow() {
			this.getInfo();
		},
		data() {
			return {
				card_info:{
					bank:'暂未绑定银行卡',
					id:''
				},
				
				money:0,
				balance:0,
				can_withdraw:0,
				service_fee:0,
				account:''
			}
		},
		methods: {
			getInfo(){
				this.http.post('withdraw/getWithdrawInfo').then((res)=>{
					if(res.code==1000){
						this.balance=res.data.balance;
						this.service_fee=res.data.service_fee;
						this.can_withdraw=res.data.can_withdraw;
						this.card_info=res.data.card_info;
					}
				})
			},
			all(){
				this.money=this.balance;
			},
			/* 填写账户 */
			writeInfo(){
				uni.navigateTo({url: 'information'});
			},
			toCash(){
				this.http.post('withdraw/startWithdraw',{
					money:this.money,
					bank_id:this.card_info.id
				}).then((res)=>{
					if(res.code==1000){
						this.http.toast(res.msg);
						setTimeout(()=>{uni.navigateBack({
							delta: 1
						});},1000)
					}
				})
				
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
				height: 74upx;
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
