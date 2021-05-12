<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true"><block slot="backText">供货详情</block></cu-custom>
		<!-- 供应和详情 -->
		<scroll-view scroll-x class="bg-white nav" :scroll-into-view="scrollInto" :scroll-with-animation="true" :style="'top:'+this.CustomBar+'px;'" style="position: fixed;z-index: 999;">
			<view class="flex justify-around">
				<view class="cu-item cuitem text-lg text-bold" :class="item.tabindex==TabCur?'text-green Tabcur':''"
				 v-for="(item,id) in TabList" :key="id"
				  @tap="tabSelect(item)" :id="'tab'+item.tabindex">
					{{item.TabName}}
				</view>
			</view>
		</scroll-view>
		<!-- 轮播图 -->
		<swiper class="screen-swiper" style="margin-top: 90rpx;" :indicator-dots="false" :circular="true"
		 :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index" @click="viewImg(http.resourceUrl()+item.path)" v-if="item.is_video==0">
				<image :src="http.resourceUrl()+item.path" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<!-- 介绍 -->
		<view class="flex justify-around align-center padding bg-white">
			<view class="flex-treble">
				<view class="text-xl text-black margin-bottom">{{detail.title}}</view>
				<view class="flex justify-between text-gray margin-bottom">
					<view>{{detail.area}}</view>
					<view><text class="cuIcon-locationfill"></text>{{detail.distance}}公里</view>
				</view>
				<view class="flex justify-between text-gray">
					<view class="text-orange">{{detail.price}}</view>
					<view>{{detail.view_count}}人查看</view>
				</view>
			</view>
			<view class="flex-sub flex justify-end">
				<view class="round cu-btn bg-white" :class="detail.is_favorite==1?'text-green':'text-gray'"  @tap="Collection" style="border: 1rpx solid #AAAAAA;"><text class="cuIcon-favorfill"></text>收藏</view>
			</view>
		</view>
		<!-- 安全风险 -->
		<view class="padding margin-top flex justify-between align-center" style="background-color: #F5F9FF;">
			<view style="color: #0085FF;">
				<view class="margin-bottom">交易安全提醒</view>
				<view class="text-sm">微信转账风险高，见面交易需谨慎，线上交易更安全</view>
			</view>
			<view class="cuIcon-lock" style="font-size: 48rpx;color: #0085FF;"></view>
		</view>
		<!-- 经营人 -->
		<view class="cu-list menu-avatar">
			<view class="cu-item" @click="toStoreShop">
				<view class="cu-avatar round lg">
					<image class="cu-avatar round lg" :src="http.resourceUrl()+detail.store.avatar"></image>
				</view>
				<view class="content">
					<view class="text-black text-lg">
						<view class="text-cut">{{detail.store.store_name}}
						<text v-if="detail.store.enterprise_auth==1" class="bg-blue margin-right-xs radius margin-left-sm">企</text>
						<text v-if="detail.store.person_auth==1" class="bg-green margin-right-xs radius margin-left-sm">实</text>
					</view>
					</view>
					<view class="text-gray text-sm flex"> <view class="text-cut">持续经营{{detail.store.day}}</view></view>
				</view>
				<view class="action">
					<view class="text-grey cuIcon-right"></view>
				</view>
			</view>
			<!-- 详细信息 -->
			<view class="padding bg-white" id="Details">
				<view class="padding-bottom">详细信息</view>
				<view class="cu-list grid col-2">
					<view class="flex align-center" v-for="(item,id) in detailList" :key="id">
						<view class="padding-sm flex-twice text-sm" style="background-color: #D1D1D1;border: solid 2rpx #929292;white-space: nowrap;height: 80rpx;">{{item.text}}</view>
						<view class="padding-tb-sm flex-treble text-sm" style="background-color: #F7F7F7;border: solid 2rpx #929292;white-space: nowrap;height: 80rpx;">{{item.value}}</view>
					</view>
				</view>
			</view>
			<!-- 联系 -->
			<view class="padding-lr padding-bottom text-black text-bold bg-white">
				<!-- <view>【联系我时，请说是在苗木通上看到的】</view>
				<view>一品货源，想要的电议：{{detail.phone}}</view> -->
				<view>{{detail.desc}}</view>
			</view>
		</view>
		<!-- image -->
		<template>
			<view v-for="(item,i) in swiperList" :key="i">
				<video :src="http.resourceUrl()+item.path" loop  :show-play-btn="true" :controls="true" objectFit="cover" style="width: 100%;" v-if="item.is_video==1"></video>
			</view>
		</template>
		
		<!-- 聊一聊弹窗 -->
		<view class="bg-white showMadol" v-show="showMOdal">
			<view class="text-center text-lg text-bold margin-top">扫描二维码加商户微信</view>
			<view class="flex justify-center margin-top">
				<image :src="http.resourceUrl()+detail.qrcode" mode="aspectFit" style="height: 300rpx;width: 300rpx;" :show-menu-by-longpress="true"></image>
			</view>
		</view>
		<!-- 底部导航栏Tabbar高度 -->
		<view class="cu-tabbar-height margin-top-sm"></view>
		<!-- 导航栏Tabbar -->
		<view class="cu-bar bg-white tabbar border shop" style="position: fixed;bottom: 0;right: 0;left: 0;z-index: 999;">
			<view class="action" @click="tpPurchase">
				<view class="cuIcon-deliver" style="font-size: 48rpx;"></view>
				立即购买
			</view>
			<view class="btn-group">
				<button class="cu-btn bg-orange radius shadow-blur lg" @click="showModal">聊一聊</button>
				<button class="cu-btn bg-green radius shadow-blur lg" @click="makePhoneCall">打电话</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(e) {
			this.supply_id=e.supply_id;
			this.getInfo();
		},
		data() {
			return {
				supply_id:'',
				detail:'',
				
				TabCur: 0,
				scrollInto:'tab0',
				TabList:[{
					tabindex:0,
					TabName:'供应'
				},{
					tabindex:1,
					TabName:'详情'
				}],
				
				/* 轮播图列表 */
				swiperList: [],
				
				detailList:[],
				/* 展示聊一聊 */
				showMOdal:false
			}
		},
		onPageScroll(e) {
			if(e.scrollTop>=495){
				this.TabCur=1;
				this.scrollInto='tab1';
			}else{
				this.TabCur=0;
				this.scrollInto='tab0';
			}
		},
		methods: {
			getInfo(){
				const latitude=uni.getStorageSync('latitude');
				const longitude=uni.getStorageSync('longitude');
				this.http.post('supply/getSupplyDetail',{
					supply_id:this.supply_id,
					longitude:longitude,
					latitude:latitude,
					member_id:this.member_id
				}).then((res)=>{
					if(res.code==1000){
						this.swiperList=res.data.img;
						this.detail=res.data;
						this.detailList=res.data.size
					}
				})
			},
			/* 导航栏切换 */
			tabSelect(item) {
				this.TabCur=item.tabindex;
				this.scrollInto='tab'+item.tabindex;
				if(this.TabCur==0){
					uni.pageScrollTo({scrollTop: 0});
				}else{
					uni.pageScrollTo({selector:'#Details'});
				}
			},
			/* 查看大图 */
			viewImg(e){
				uni.previewImage({
					urls:[e]
				})
			},
			/* 收藏 */
			Collection(){
				this.http.post('supply/updateSupplyFavorite',{
					supply_id:this.supply_id
				}).then((res)=>{
					this.http.toast(res.msg)
					if(res.code=1000 && this.detail.is_favorite === 0){
						this.detail.is_favorite=1;
					}else{
						this.detail.is_favorite=0;
					}
				})
			},
			/* 立即购买 */
			tpPurchase(){
				uni.navigateTo({url: 'purchase/purchase?supply_id='+this.supply_id});
			},
			/* 查看店铺 */
			toStoreShop(){
				uni.navigateTo({url: 'storeShop?store_id='+this.detail.store.id});
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
					phoneNumber:this.detail.phone
				})
			}
		}
	}
</script>

<style scoped>
	.Tabcur{
		border-bottom: solid #00913A 4upx;
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
