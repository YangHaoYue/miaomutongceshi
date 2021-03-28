<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true">
			<block slot="backText">求购详情</block>
		</cu-custom>
		<!-- 个人简介 -->
		<view class="cu-list menu-avatar" @click="toShop">
			<view class="cu-item">
				<view class="cu-avatar round lg">
					<image class="cu-avatar round lg" :src="data.member.head_img"></image>
				</view>
				<view class="content">
					<view class="text-black text-lg">
						<view class="text-cut">{{data.member.name}}
							<text class="bg-blue margin-right-xs" style="padding: 5rpx;" v-if="data.member.person_auth==1">企 </text>
							<text class="bg-green margin-right-xs" style="padding: 5rpx;" v-if="data.member.enterprise_auth==1">实 </text>
						</view>
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">{{data.member.area}}</view>
						<!-- <view class="text-cut"><text class="cuIcon-locationfill"></text>899.5公里</view> -->
					</view>
				</view>
			</view>
		</view>
		<view class="flex align-center">
			<view class="title bg-gray text-center flex-sub padding margin-right-sm">求购品种</view>
			<view class="flex-treble">
				{{data.breed_name}}
			</view>
		</view>
		<view class="flex align-center">
			<view class="title bg-gray text-center flex-sub padding margin-right-sm">求购数量</view>
			<view class="flex-treble">
				{{data.want_count}}
			</view>
		</view>
		<view class="flex align-center bg-gray">
			<view class="title bg-gray text-center flex-sub padding">求购规格</view>
			<view class="flex-treble bg-white padding-left-sm">
				<view :class="data.size.length==1?'padding-tb':''" v-for="(item,index) in data.size" :key="index">{{item.text}}：{{item.value}} </view>
			</view>
		</view>
		<view class="flex align-center bg-gray">
			<view class="title bg-gray text-center flex-sub padding">求购地区</view>
			<view class="flex-treble bg-white padding-left-sm" :class="[data.areas.length==1?'padding-tb':'',data.areas.length==2?'padding-tb-sm':'']">
				<view v-for="(item,i) in data.areas" :key="i">{{item.name}}</view>
			</view>
		</view>
		<view class="flex align-center">
			<view class="title bg-gray text-center flex-sub padding margin-right-sm">收货地址</view>
			<view class="flex-treble">
				{{data.getAddress}}
			</view>
		</view>
		<view class="flex align-center">
			<view class="title bg-gray text-center flex-sub padding margin-right-sm">截止时间</view>
			<view class="flex-treble">
				{{data.deadline}}
			</view>
		</view>
		<!-- 聊一聊弹窗 -->
		<view class="bg-white showMadol" v-show="showMOdal">
			<view class="text-center text-lg text-bold margin-top">扫描二维码加商户微信</view>
			<view class="flex justify-center margin-top">
				<image :src="http.resourceUrl()+data.member.qrcode" mode="aspectFit" style="height: 300rpx;width: 300rpx;" :show-menu-by-longpress="true"></image>
			</view>
		</view>
		<!-- 底部导航栏Tabbar -->
		<view class="cu-tabbar-height"></view>
		<view class="cu-bar bg-white tabbar border shop solids-top" style="position: fixed;bottom: 0;z-index: 999;width: 100%;">
			<view class="flex-sub text-center" @click="showModal">
				<view class="cuIcon-comment text-pink" style="font-size: 36rpx;"></view>聊一聊
			</view>
			<view class="flex-sub text-center" @click="makePhomeCall">
				<view class="cuIcon-phone text-green" style="font-size: 36rpx;" ></view>打电话
			</view>
			<button class="cu-btn margin-lr bg-green shadow-blur lg flex-twice" @click="toOffer">立即报价</button>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(e) {
			this.want_id=e.want_id;
			this.getInfo()
		},
		data() {
			return {
				want_id:'',
				data:'',
				/* 展示聊一聊 */
				showMOdal:false
			}
		},
		methods: {
			getInfo(){
				this.http.post('want/getWantDetail',{
					want_id:this.want_id
				}).then((res)=>{
					if(res.code==1000){
						this.data=res.data;
					}
				})
			},
			makePhomeCall(){
				uni.makePhoneCall({
					phoneNumber:this.data.member.mobile
				})
			},
			/* 展示微信二维码 */
			showModal(){
				this.showMOdal=!this.showMOdal;
			},
			hideModal(){
				this.showMOdal=false;
			},
			toOffer(){
				uni.navigateTo({url: '/pages/home/offer/offer?want_id='+this.data.id});
			},
			toShop(){
				uni.navigateTo({url: '/pages/home/gongying/storeShop?store_id='+this.data.member.store_id});
			}
		}
	}
</script>

<style>
	page{
		background-color: #FFFFFF;
		height: 100vh;
	}
	.logoBtn{
		
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
</style>
