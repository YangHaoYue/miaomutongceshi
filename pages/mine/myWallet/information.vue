<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true">
			<block slot="backText">提现管理</block>
		</cu-custom>
		<view class="cu-list menu margin-top">
			<view class="cu-item">
				<view class="content flex">
					<text class="text-red">*</text>
					<!-- <text class="text-gray">姓名</text> -->
					<input placeholder="姓名" v-model="name" />
				</view>
			</view>
			<view class="cu-item">
				<view class="content flex">
					<text class="text-red">*</text>
					<!-- <text class="text-gray">身份证号</text> -->
					<input placeholder="身份证号" type="number" v-model="IDcard" />
				</view>
			</view>
			<view class="cu-item">
				<view class="content flex">
					<text class="text-red">*</text>
					<!-- <text class="text-gray">银行卡号</text> -->
					<input placeholder="银行卡号" type="number" v-model="bankId" />
				</view>
			</view>
			<view class="cu-item">
				<view class="content flex">
					<text class="text-red">*</text>
					<!-- <text class="text-gray">开户行</text> -->
					<input placeholder="开户行" v-model="bankname" />
				</view>
			</view>
		</view>
		<button class="cu-btn setBtn bg-green round" @click="submit">提交</button>
	</view>
</template>

<script>
	export default {
		onLoad() {
			/* this.getBankInfo(); */
		},
		data() {
			return {
				name:'',
				IDcard:'',
				bankId:'',
				bankname:''
			}
		},
		methods: {
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
							this.IDcard=res.data.data.id_card;
							this.bankId=res.data.data.bank_no;
							this.bankname=res.data.data.bank_name;
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			submit(){
				if(this.name==''||this.IDcard==''||this.bankId==''||this.bankname==''){
					uni.showToast({
						icon:'none',
						title: '请完整填写所有信息！',
						mask:true
					});
					return;
				}
				let token=uni.getStorageSync('token');
				uni.request({
					url: Url.websiteUrl+'user/editBankInfo',
					method: 'POST',
					header:{Authorization:'Bearer '+token},
					data: {
						name:this.name,
						id_card:this.IDcard,
						bank_no:this.bankId,
						bank_name:this.bankname//name 开户人 id_card 身份证 bank_no 卡号 bank_name 开户行
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
	.setBtn{
		width: 650rpx;
		height: 90rpx;
		margin: 0 50rpx;
		position: fixed;
		bottom: 103rpx;
	}
</style>
