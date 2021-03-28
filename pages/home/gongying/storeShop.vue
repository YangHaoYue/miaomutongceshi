<template>
	<view @click="hideModal">
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true">
			<block slot="backText">店铺详情</block>
		</cu-custom>
		<!-- 店铺店主信息 -->
		<view class="padding text-white" style="background-image: url(https://7778-wxpay-yai0c-1303163285.tcb.qcloud.la/soreshop_img.png?sign=b66f938c9196372608304ebab3d3644d&t=1610538400);background-size: 100% 100%;">
			<view class="text-center margin-tb ">{{storeInfo.header_title}}</view>
			<view class="flex justify-center">
				<image class="cu-avatar xl round" :src="storeInfo.header_img" mode="scaleToFill"></image>
			</view>
			<view class="text-center margin-tb-sm ">{{storeInfo.nickname}}</view>
			<view class="text-center margin-tb-sm text-sm">主营：<text v-for="(item,i) in plantsTypeList" :key="i">{{item.name}}</text></view>
			<view class="text-center margin-tb-sm text-sm">{{storeInfo.area}}</view>
		</view>
		<view class="flex justify-between align-center">
			<view class="padding text-center flex-sub text-sm">
				<view class="margin-bottom-xs">{{storeInfo.view_count}}人</view>
				<view>浏览记录</view>
			</view>
			<view class="padding text-center flex-sub text-sm">
				<view class="margin-bottom-xs">{{storeInfo.fav_count}}人</view>
				<view>关注了他</view>
			</view>
			<view class="padding text-center flex-sub text-sm">
				<view class="margin-bottom-xs">{{storeInfo.last_deal}}</view>
				<view>持续经营</view>
			</view>
		</view>
		<!-- 分割线 -->
		<view class="bg-gray" style="height: 20rpx;"></view>
		<!-- 导航栏 -->
		<scroll-view scroll-x class="bg-white nav padding-bottom-xs solid-bottom" :scroll-into-view="scrollInto" :scroll-with-animation="true">
			<view class="flex justify-around">
				<view class="cu-item cuitem text-lg text-bold" :class="item.tabindex==TabCur?'text-green Tabcur':''"
				 v-for="(item,id) in TabList" :key="id"
				  @tap="tabSelect(item)" :id="'tab'+item.tabindex">
					{{item.TabName}}
				</view>
			</view>
		</scroll-view>
		<!-- 供应信息 -->
		<view v-if="TabCur==0">
			<view class="flex justify-start padding-lr padding-tb-sm" style="flex-wrap: wrap;">
				<!-- <view class="padding-tb-sm padding-lr margin-xs solid" @click="change(-1)" :class="whichPlant==-1?'line-green':'solid'" style="flex-wrap: nowrap;">全部</view> -->
				<view v-for="(item,ind) in plantsTypeList" v-if="ind<plantNumber" :key="ind"
				 class="padding-tb-sm padding-lr solid margin-xs" 
				 :class="whichPlant==ind?'line-green':'solid'"
				  style="flex-wrap: nowrap;"
				  @click="change(ind)"
				  >{{item.name}}</view>
				  <view class="padding-tb-sm padding-lr margin-xs solid" v-if="plantNumber<plantsTypeList.length" @click="changePNumber" style="flex-wrap: nowrap;">更多<text class="cuIcon-unfold"></text></view>
			</view>
			<view class="cuIcon-fold text-center padding-tb-xs" v-if="plantNumber==plantsTypeList.length" @click="backPNumber"></view>
			<view class="bg-gray padding flex justify-center" style="flex-wrap: wrap;" v-if="plantsList.length!=0">
				<view class="margin-bottom-sm" v-for="(item,id) in plantsList" :key="id" :class="id%2==1?'margin-left':''" @click="toGYDetail(item.id)">
					<view style="height: 340rpx;width: 315rpx;">
						<image :src="http.resourceUrl()+item.img" mode="aspectFill" style="height: 340rpx;width: 315rpx;"></image>
					</view>
					<view class="bg-white padding-tb padding-lr-xs">
						<view class="margin-bottom-sm">{{item.title}}</view>
						<view class="flex justify-between">
							<view class="text-orange">{{item.price}}</view>
							<view class="text-black text-sm">{{item.view_count}}人查看</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 求购信息 -->
		<view class="flex padding bg-white padding-tb-sm solid-bottom" style="width: 100%;" v-for="(item,i) in list" :key="i" v-if="TabCur==1" @click="toQGDetail(item.id)">
			<view class="margin-left flex-twice">
				<view class="flex align-center justify-between margin-top">
					<view class="text-black text-lg">{{item.title}}</view>
					<view>{{item.view_count}}人查看</view>
				</view>
				<view class="flex align-center margin-top-sm text-sm">求购数量：{{item.count}}{{item.unit}} | {{item.deadline}}截至</view>
				<view class="flex align-center margin-top-sm text-sm">求购地区：{{item.area}}</view>
				<view class="margin-top-sm flex justify-between text-sm">
					<view>
						<text class="bg-blue margin-right-xs text-lg" v-if="item.enterprise_auth==1">企 </text>
						<text  class="bg-green margin-right-xs text-lg" v-if="item.person_auth==1">实</text>
						<text class="text-gray">{{item.offer_count}}个报价</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 实力展示 -->
		<view v-if="TabCur==2" class="padding">
			<view class="">
				<view class="margin-tb-xl">公司简介</view>
				<view class="text-sm" style="height: 100rpx;" v-if="storeInfo.desc!=''&&storeInfo.desc!=null">{{storeInfo.desc}}</view>
			</view>
			<view v-if="storeInfo.enterprise_auth==1||storeInfo.person_auth==1">
				<view class="margin-tb-xl">认证信息</view>
				<view class="flex justify-start align-center">
					<image class="margin-right" v-if="storeInfo.person_auth==1" src="../../../static/home/storeshop_shimin.png" style="height: 158rpx;width: 169rpx;" mode="aspectFit"></image>
					<image src="../../../static/home/storeshop_qiye.png" v-if="storeInfo.enterprise_auth==1" style="height: 158rpx;width: 169rpx;" mode="aspectFit"></image>
				</view>
			</view>
			<!-- <view class="flex justify-between margin-tb-sm">
				<view >认证信息</view>
				<view class="text-sm text-right">5级(一般)</view>
			</view>
			<view class="flex justify-between margin-tb-sm">
				<view >线上交易</view>
				<view class="text-sm text-right">无</view>
			</view>
			<view class="flex justify-between margin-tb-sm">
				<view >信誉评价</view>
				<view class="text-sm text-right">无(一般)</view>
			</view> -->
		</view>
		<!-- 聊一聊弹窗 -->
		<view class="bg-white showMadol" v-if="showMOdal">
			<view class="text-center text-lg text-bold margin-top">扫描二维码加商户微信</view>
			<view class="flex justify-center margin-top">
				<image :src="http.resourceUrl()+storeInfo.qr_code" mode="aspectFit" style="height: 300rpx;width: 300rpx;" :show-menu-by-longpress="true"></image>
			</view>
		</view>
		<!-- 底部导航栏Tabbar -->
		<view class="cu-tabbar-height"></view>
		<view class="flex justify-between align-center solid-top" style="position: fixed;bottom: 0;width: 100%;z-index: 999;">
			<view class="flex-sub flex justify-center align-center padding solids-right text-lg" style="background-color: #F7F7F7;" @click.stop="showModal">
				<text class="cuIcon-comment" style="font-size: 48rpx;"></text>聊一聊</view>
			<view class="flex-sub flex justify-center align-center padding text-lg" style="background-color: #F7F7F7;" @click="makePhoneCall">
				<text class="cuIcon-phone" style="font-size: 48rpx;"></text>打电话</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(e) {
			this.store_id=e.store_id;
			this.getStoreInfo();
			this.getSupplyList(1);
			this.getWantList(1);
		},
		//上拉加载
		onReachBottom() {
			if(this.current_page<this.last_page){
				this.current_page++;
				this.getSupplyList(this.current_page);
			}else{
				this.http.toast('到底了！');
			}
		},
		data() {
			return {
				store_id:'',
				scrollInto:'',
				TabCur: 0,
				TabList:[{
					tabindex:0,
					TabName:'供应信息'
				},{
					tabindex:1,
					TabName:'求购信息'
				},{
					tabindex:2,
					TabName:'实力展示'
				}],
				storeInfo:'',
				whichPlant:0,
				breed_id:'',
				plantNumber:2,
				plantsTypeList:[],
				plantsList:[],
				
				list:[],
				current_page:'',
				last_page:'',
				/* 展示聊一聊 */
				showMOdal:false
			}
		},
		methods: {
			getStoreInfo(){
				this.http.post('stores/getStoreDetailInfo',{
					store_id:this.store_id
				}).then((res)=>{
					if(res.code==1000){
						this.storeInfo=res.data.store;
						this.plantsTypeList=res.data.supply
					}
				})
			},
			getSupplyList(page){
				this.http.post('stores/getSupplyList',{
					store_id:this.store_id,
					page:page,
					breed_id:this.breed_id,
				}).then((res)=>{
					if(res.code==1000){
						if(this.plantsList.length==0){
							this.plantsList=res.data.data;
							this.current_page=res.data.current_page;
							this.last_page=res.data.last_page;
						}else{
							this.plantsList=this.plantsList.concat(res.data.data)
						}
					}
				})
			},
			getWantList(page){
				this.http.post('stores/getWantList',{
					store_id:this.store_id,
					page:page
				}).then((res)=>{
					if(res.code==1000){
						if(this.list.length==0){
							this.list=res.data.data;
							this.current_page=res.data.current_page;
							this.last_page=res.data.last_page;
						}else{
							this.list=this.list.concat(res.data.data)
						}
					}
				})
			},
			/* 导航栏切换 */
			tabSelect(item) {
				this.TabCur=item.tabindex;
				this.scrollInto='tab'+item.tabindex;
			},
			/* 切换植物种类 */
			change(ind){
				this.whichPlant=ind;
				if(ind!=-1){
					this.breed_id=this.plantsTypeList[ind].id;
					this.plantsList=[];
					this.getSupplyList(1);
				}else{
					this.plantsList=[];
					this.getSupplyList(1);
				}
			},
			/* 查看更多 */
			changePNumber(){
				this.plantNumber=this.plantsTypeList.length;
			},
			/* 收回更多 */
			backPNumber(){
				this.plantNumber=2;
			},
			/* 详情 */
			toGYDetail(id){
				uni.navigateTo({url: 'detail?supply_id='+id});
			},
			toQGDetail(id){
				uni.navigateTo({url: '../../mine/QiuGou/detail?want_id='+id});
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
					phoneNumber:this.storeInfo.mobile
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
