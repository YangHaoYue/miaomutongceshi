<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true">
			<block slot="backText">采购信息</block>
		</cu-custom>
		<!-- 选择地址 -->
		<view class="padding bg-white flex justify-between align-center padding-tb-xl" v-show="location" @click="tpLocationList">
			<view class="text-green">
				<text class="cuIcon-roundadd margin-right-sm" style="font-size: 36rpx;"></text>
				添加收货地址
			</view>
			<view class="cuIcon-right text-gray" style="font-size: 32rpx;"></view>
		</view>
		<view class="padding bg-white flex justify-between align-center  padding-tb-xl" v-show="!location" @click="tpLocationList">
			<view>
				<view class="text-bold margin-bottom-xs">{{address.receive_name}} {{address.receive_phone}}</view>
				<view class="text-gray"><text class="text-black" v-if="address.is_default==1">【默认】</text>{{city}}{{address.address}}</view>
			</view>
			<view class="cuIcon-right text-black" style="font-size: 32rpx;"></view>
		</view>
		<!-- 购买信息 -->
		<view class="bg-white padding margin-top">
			<view class="flex justify-between margin-tb-xs">
				<view>{{storeInfo.store_name}}</view>
				<text class="cuIcon-right"></text>
			</view>
			<view class="flex align-center">
				<image :src="http.resourceUrl()+storeInfo.img" mode="aspectFill" style="width: 185rpx;height: 190rpx;"></image>
				<view class="margin-left" style="width: 460rpx;">
					<view class="margin-bottom-xs">{{storeInfo.breed_name}}</view>
					<view class="margin-bottom-xs">{{storeInfo.desc}}</view>
					<view class="text-orange margin-bottom-xs">{{storeInfo.price}}</view>
				</view>
			</view>
			<view class="flex justify-between margin-tb">
				<view>购买数量</view>
				<uni-number-box :value="number" @change="change" :max="9999"/>
			</view>
			<view class="flex justify-between margin-tb solids-bottom padding-tb margin-top-xl">
				<view><text class="text-red">*</text>请选择到货日期</view>
				<picker mode="date" :value="date" start="2015-09-01" end="2100-09-01" @change="DateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			<view class="flex align-start justify-start">
				<view class="title" style="width: 120rpx;">备注：</view>
				<textarea maxlength="200" @input="textareaInput" placeholder="（请备注详细的采购要求，最多200字）"></textarea>
			</view>
			<!-- 注意事项 -->
			<view class="text-green">
				<view style="text-indent:2em;">1、请将详细需求在备注中描述清楚，并于供应方协商一致，备注是重要凭证。</view>
				<view style="text-indent:2em;">2、供应商接受订单后未按时发货给您造成损失，平台将用供</view>
			</view>
		</view>
		<!-- 底部导航栏Tabbar -->
		<view class="cu-tabbar-height"></view>
		<button class="cu-btn bg-green logobtn " @tap="order">立即购买</button>
	</view>
</template>

<script>
	import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue'
	export default {
		components: {
			uniNumberBox
		},
		onLoad(e) {
			var ti= new Date();
			this.date=this.http.dateFormat("YYYY-mm-dd",ti);
			this.supply_id=e.supply_id;
			this.getInfo();
		},
		onShow() {
			this.address_id=uni.getStorageSync('address_id');
			if(this.address_id){
				this.getAddress();
			}else{
				this.getDefaultAddress();
			}
		},
		data() {
			return {
				supply_id:'',
				address_id:'',
				city:'',
				location:true,
				address:'',
				
				storeInfo:'',
				
				number:1,
				date: '2021-1-1',
				textareaValue:''
			}
		},
		methods: {
			getInfo(){
				this.http.post('order/getReadyOrderDetail',{
					supply_id:this.supply_id
				}).then((res)=>{
					if(res.code==1000){
						this.storeInfo=res.data;
					}
				})
			},
			getDefaultAddress(){
				this.http.post('address/getList').then((res)=>{
					if(res.code==1000){
						if(res.data.length!=0){
							res.data.forEach(item=>{
								if(item.is_default==1){
									this.location=false;
									this.address=item;
									this.address_id=item.id;
									this.city=item.area.merger_name;
								}
							})
						}
					}
				})
			},
			getAddress(){
				this.http.post('address/getAddressDetail',{
					address_id:this.address_id
				}).then((res)=>{
					if(res.code==1000){
						this.location=false;
						this.address=res.data;
						this.city=res.data.city;
					}
				})
			},
			/* 选择地址 */
			tpLocationList(){
				uni.navigateTo({url: 'locationList'});
			},
			/* 输入盒子 */
			change(e) {
				this.number=e
			},
			/* 日期选择 */
			DateChange(e) {
				this.date = e.detail.value
			},
			textareaInput(e) {
				this.textareaValue = e.detail.value
			},
			order(){
				uni.showLoading({
					title: '正在下单...',
					mask: true
				});
				this.http.post('order/createOrder',{
					supply_id:this.supply_id,
					address_id:this.address_id,
					count:this.number,
					arrive_at:this.date,
					memo:this.textareaValue,
				},true).then((res)=>{
					if(res.code==1000){
						uni.hideLoading();
						this.http.toast(res.msg);
						setTimeout(()=>{uni.redirectTo({url:'order?order_id='+res.data.order_id})},1000)
					}
				})
			}
		}
	}
</script>

<style>
	.logobtn{
		width: 100%;
		height: 88upx;
		position: fixed;
		bottom: 0upx;
		border-radius: 0;
		z-index: 999;
	}
</style>
