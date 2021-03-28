<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true">
			<block slot="backText">订单信息</block>
		</cu-custom>
		<!-- 确认信息 -->
		<view class="padding text-white" style="height: 180rpx;background: -webkit-linear-gradient(top,#00913A,#32A761);">
			<view class="text-lg text-bold flex align-center"><text class="cuIcon-time margin-right-xs" style="font-size: 42rpx;"></text>{{title}}</view>
		</view>
		<!-- 注意事项 -->
		<view class="bg-white radius margin-lr-lg padding-sm text-sm text-bold" style="color: #717171;transform: translateY(-90rpx);box-shadow: 8upx 8upx 8upx rgba(0, 0, 0, 0.1);">
			<view class="margin-tb-xs">需要卖家确认单价，杂费，运费...</view>
			<view class="margin-tb-xs">您可以通过印象花木城卖家确认订单</view>
			<view class="margin-tb-xs">打电话/聊一聊的记录，可作为交易的纠纷凭证</view>
			<view class="margin-tb-xs">通过在线交易，可以安全的保障您的资金安全</view>
		</view>
		<!-- 步骤条 -->
		<view class="bg-white margin" style="transform: translateY(-90rpx);" v-if="detail.status!=7">
			<view class="cu-steps">
				<view class="cu-item" :class="index>basics?'':'text-green'" v-for="(item,index) in basicsList" :key="index">
					<text class="cuIcon-radioboxfill"></text> <text :class="index>basics?'text-gray':'text-black'">{{item.name}}</text>
				</view>
			</view>
		</view>
		<!-- <button class="cu-btn bg-green shadow" @tap="BasicsSteps">下一步</button> -->
		<!-- 购买信息 -->
		<view class="bg-white margin" style="transform: translateY(-90rpx);">
			<view class="flex margin-tb-xs">
				<view class="text-lg text-bold">{{detail.title}}</view>
				<text class="bg-blue margin-lr-xs text-lg" style="padding: 4rpx;" v-if="detail.enterprise_auth==1">企 </text>
				<text  class="bg-green margin-right-xs text-lg" style="padding: 4rpx;" v-if="detail.person_auth==1">实 </text>
			</view>
			<view class="flex align-center">
				<image :src="http.resourceUrl()+detail.img" mode="aspectFill" style="width: 188rpx;height: 166rpx;"></image>
				<view class="margin-left">
					<view class="margin-bottom-xs text-lg text-bold">{{detail.breed_name}}</view>
					<view class="margin-bottom-xs">{{detail.desc}}</view>
				</view>
			</view>
			<view class="flex justify-between padding-tb">
				<view class="text-gray">待议单价</view>
				<view class="text-lg text-bold">{{detail.single_price}}</view>
			</view>
			<view class="flex justify-between padding-tb solid-bottom">
				<view class="text-gray">采购数量</view>
				<view class="text-lg text-bold">{{detail.count}}</view>
			</view>
			<view class="flex justify-end align-end" style="height: 150rpx;">
				<view class="text-lg text-bold flex align-center" v-if="detail.type==1&&detail.status==0">订单金额：<input v-model="price" class="text-green solid" placeholder-class="text-sm" type="digit" placeholder="输入与买家确认价格"/>元</view>
				<view class="text-lg text-bold" v-else>订单金额：<text class="text-green">{{detail.total_price}}</text></view>
			</view>
		</view>
		<!-- 订单详情 -->
		<view class="bg-gray" style="height: 20rpx;transform: translateY(-90rpx);" ></view>
		<view class="padding-lr bg-white" style="transform: translateY(-90rpx);">
			<view class="flex justify-between align-center">
				<view class="margin-tb flex align-center text-black text-bold">订单详情</view>
				<button class="cu-btn lines-green round sm" v-if="detail.type==0" @click="makePhoneCall">联系卖家</button>
				<button class="cu-btn lines-green round sm" v-if="detail.type==1" @click="makePhoneCall">联系买家</button>
			</view>
			<view class="margin-tb flex align-center"><text class="text-gray flex-sub">到货日期：</text><text class="flex-treble">{{address.arrive_at}}</text></view>
			<view class="margin-tb flex align-center"><text class="text-gray flex-sub">收货地址：</text><text class="flex-treble">{{address.receive_name}}  {{address.receive_phone}}</text></view>
			<view class="margin-tb flex align-center"><text class="text-gray flex-sub"></text><text class="flex-treble">{{address.address}}</text></view>
		</view>
		<!-- 聊一聊弹窗 -->
		<view class="bg-white showMadol" v-show="showMOdal" >
			<view class="text-center text-lg text-bold margin-top">扫描二维码加商户微信</view>
			<view class="flex justify-center margin-top">
				<image :src="http.resourceUrl()+detail.store.qrcode" mode="aspectFit" style="height: 300rpx;width: 300rpx;" :show-menu-by-longpress="true"></image>
			</view>
		</view>
		<!-- buttons -->
		<view v-if="detail.type==0&&detail.status==0">
			<!-- 底部导航栏Tabbar -->
			<view class="cu-tabbar-height"></view>
			<view class="flex justify-around btBtn text-center text-lg">
				<view class="bg-white flex-sub radius padding margin-right-xs solids" @click="showModal">聊一聊</view>
				<view class="bg-white flex-sub radius padding solids" @click="makePhoneCall">打电话</view>
			</view>
		</view>
		<view v-if="detail.type==1&&detail.status==0">
			<!-- 底部导航栏Tabbar -->
			<view class="cu-tabbar-height"></view>
			<view class="flex justify-around btBtn text-center text-lg">
				<view class="bg-white flex-sub radius padding margin-right-xs solids" @click="cancel">取消订单</view>
				<view class="bg-green flex-treble radius padding solids" @click="makeSure">确认订单</view>
			</view>
		</view>
		<view v-if="detail.type==1&&detail.status==3">
			<!-- 底部导航栏Tabbar -->
			<view class="cu-tabbar-height"></view>
			<button class="cu-btn cashBtn bg-green" @tap="send">确认发货</button>
		</view>
		<view v-if="detail.type==0&&detail.status==4">
			<!-- 底部导航栏Tabbar -->
			<view class="cu-tabbar-height"></view>
			<button class="cu-btn cashBtn bg-green" @tap="recive">确认收货</button>
		</view>
		<view v-if="detail.type==0&&detail.status==1">
			<!-- 底部导航栏Tabbar -->
			<view class="cu-tabbar-height"></view>
			<button class="cu-btn cashBtn bg-green" @tap="toCash">确认付款</button>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(e){
			this.order_id=e.order_id
			this.getInfo()
		},
		data() {
			return {
				order_id:'',
				title:'等待买家确认付款',
				basics: 1,
				basicsList: [{
					cuIcon: 'radioboxfill',
					name: '已下单'
				}, {
					cuIcon: 'radioboxfill',
					name: '确认'
				}, {
					cuIcon: 'radioboxfill',
					name: '付款'
				}, {
					cuIcon: 'radioboxfill',
					name: '发货'
				}, {
					cuIcon: 'radioboxfill',
					name: '收货'
				}, {
					cuIcon: 'radioboxfill',
					name: '收款'
				}, ],
				
				price:'',
				detail:'',
				address:'',
				/* 展示聊一聊 */
				showMOdal:false
			}
		},
		methods: {
			getInfo(){
				this.http.post('order/getOrderDetail',{
					order_id:this.order_id
				}).then((res)=>{
					if(res.code==1000){
						this.address=res.data.address;
						this.detail=res.data;
						if(this.detail.type==1){
							switch(this.detail.status){
								case 0:
									this.title='等待卖家确认订单';
									this.basics=1
									break;
								case 1:
									this.title='等待买家支付';
									this.basics=2
									break;
								case 3:
									this.title='已支付 等待发货';
									this.basics=3
									break;
								case 4:
									this.title='等待买家确认收货';
									this.basics=4
									break;
								case 5:
									this.title='交易成功';
									this.basics=5
									break;
								case 7:
									this.title='订单关闭';
									break;
								default:
									return;
							}
						}else{
							switch(this.detail.status){
								case 0:
									this.title='等待卖家确认订单';
									this.basics=1
									break;
								case 1:
									this.title='等待买家支付';
									this.basics=2
									break;
								case 3:
									this.title='等待卖家发货';
									this.basics=3
									break;
								case 4:
									this.title='等待买家确认收货';
									this.basics=4
									break;
								case 5:
									this.title='交易成功';
									this.basics=5
									break;
								case 7:
									this.title='订单关闭';
									break;
								default:
									return;
							}
						}
					}
				})
			},
			BasicsSteps() {
				this.basics= this.basics == this.basicsList.length - 1 ? 0 : this.basics + 1				
			},
			/* 展示微信二维码 */
			showModal(){
				this.showMOdal=!this.showMOdal;
			},
			hideModal(){
				this.showMOdal=false;
			},
			/* 打电话 */
			makePhoneCall(){
				uni.makePhoneCall({
					phoneNumber:this.detail.store.mobile
				})
			},
			/* 取消订单 */
			cancel(){
				this.http.post('order/cancelOrder',{
					order_id:this.order_id
				}).then((res)=>{
					if(res.code==1000){
						uni.showToast({
							title: res.msg,
							mask:true,
							icon:'none'
						});
						setTimeout(()=>{
							this.getInfo();
						},1000)
					}
				})
			},
			/* 确认订单 */
			makeSure(){
				this.http.post('order/sellerConfirmOrder',{
					order_id:this.order_id,
					price:this.price
				}).then((res)=>{
					if(res.code==1000){
						uni.showToast({
							title: res.msg,
							mask:true,
							icon:'none'
						});
						setTimeout(()=>{
							this.getInfo();
						},1000)
					}
				})
			},
			send(){
				this.http.post('order/confirmSend',{
					order_id:this.order_id
				}).then((res)=>{
					if(res.code==1000){
						uni.showToast({
							title: res.msg,
							mask:true,
							icon:'none'
						});
						setTimeout(()=>{
							this.getInfo();
						},1000)
					}
				})
			},
			recive(){
				this.http.post('order/confirmGet',{
					order_id:this.order_id
				}).then((res)=>{
					if(res.code==1000){
						uni.showToast({
							title: res.msg,
							mask:true,
							icon:'none'
						});
						setTimeout(()=>{
							this.getInfo();
						},1000)
					}
				})
			},
			/* 付款 */
			toCash(){
				this.http.post('order/startPay',{
					order_id:this.order_id
				}).then((res)=>{
					if(res.code==1000){
						wx.requestPayment({
							appId:res.data.appId,
							timeStamp:res.data.timestamp,
							nonceStr:res.data.nonceStr,
							package:res.data.package,
							paySign:res.data.paySign,
							signType:res.data.signType,
							success: (res) => {
								uni.hideLoading();
								this.http.toast(res.msg);
								this.getInfo();
							},
							fail:(res)=>{
								uni.hideLoading();
								console.log(res)
								uni.showToast({
									icon:'none',
									title:'支付失败!'
								})
							}
						});
					}
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #FFFFFF;
		height: 100vh;
	}
	.showMadol{
		height: 497rpx;
		width:100%;
		position: fixed;
		bottom: calc(120upx + env(safe-area-inset-bottom) / 2);
		z-index: 999;
	}
	.showMadol::after {
		content: '';
		position: absolute;
		width: 0;
		height: 0;
		border-top: solid 6px #FFFFFF;
		border-right: solid 6px transparent;
		border-left: solid 6px transparent;
		left: 50%;
		bottom: -6px;
		margin-left: -6px;
	}
	.btBtn {
		position: fixed;
		bottom: 20rpx;
		left: 30rpx;
		right: 30rpx;
		z-index: 9999;
	}
	.cashBtn{
		width: 650rpx;
		height: 90rpx;
		margin: 0 50rpx;
		position: fixed;
		bottom: 20rpx;
	}
</style>
