<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true">
			<block slot="backText">店铺详情</block>
		</cu-custom>
		<!-- 店铺店主信息 -->
		<view class="padding text-white" style="background-image: url(../../../static/home/soreshop_img.png);background-size: 100% 100%;">
			<view class="text-center margin-tb ">朴树草坪种植基地</view>
			<view class="flex justify-center">
				<image class="cu-avatar xl round" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg" mode="scaleToFill"></image>
			</view>
			<view class="text-center margin-tb-sm ">刘忠国</view>
			<view class="text-center margin-tb-sm text-sm">主营：朴树、草坪、红叶石楠、乌桕、榉树、丛生</view>
			<view class="text-center margin-tb-sm text-sm">安徽滁州市</view>
		</view>
		<view class="flex justify-between align-center">
			<view class="padding text-center flex-sub text-sm">
				<view class="margin-bottom-xs">2.3万人</view>
				<view>浏览记录</view>
			</view>
			<view class="padding text-center flex-sub text-sm">
				<view class="margin-bottom-xs">3人</view>
				<view>关注了他</view>
			</view>
			<view class="padding text-center flex-sub text-sm">
				<view class="margin-bottom-xs">241天</view>
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
		<view v-show="TabCur==0">
			<view class="flex justify-start padding-lr padding-tb-sm" style="flex-wrap: wrap;">
				<view class="padding-tb-sm padding-lr margin-xs solid" @click="change(-1)" :class="whichPlant==-1?'line-green':'solid'" style="flex-wrap: nowrap;">全部</view>
				<view v-for="(item,ind) in plantsTypeList" v-show="ind<plantNumber" :key="ind"
				 class="padding-tb-sm padding-lr solid margin-xs" 
				 :class="whichPlant==ind?'line-green':'solid'"
				  style="flex-wrap: nowrap;"
				  @click="change(ind)"
				  >{{item}}</view>
				  <view class="padding-tb-sm padding-lr margin-xs solid" v-show="plantNumber<plantsTypeList.length" @click="changePNumber" style="flex-wrap: nowrap;">更多<text class="cuIcon-unfold"></text></view>
			</view>
			<view class="cuIcon-fold text-center padding-tb-xs" v-show="plantNumber==plantsTypeList.length" @click="backPNumber"></view>
			<view class="bg-gray padding flex justify-center" style="flex-wrap: wrap;">
				<view class="margin-bottom-sm" v-for="(item,id) in plantsList" :key="id" :class="id%2==1?'margin-left':''">
					<view style="height: 340rpx;width: 315rpx;">
						<image src="../../../static/logo.png" mode="aspectFill" style="height: 340rpx;width: 315rpx;"></image>
					</view>
					<view class="bg-white padding-tb padding-lr-xs">
						<view class="margin-bottom-sm">100公分丛生朴树</view>
						<view class="flex justify-between">
							<view class="text-orange">电议</view>
							<view class="text-black text-sm">27人查看</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 求购信息 -->
		<view class="flex padding bg-white padding-tb-sm solid-bottom" style="width: 100%;" v-for="i in 5" :key="i" v-show="TabCur==1">
			<view class="margin-left flex-twice">
				<view class="flex align-center justify-between margin-top">
					<view class="text-black text-lg">60公分五角枫</view>
					<view>1212人查看</view>
				</view>
				<view class="flex align-center margin-top-sm text-sm">求购数量：2株 | 2020-12-04截至</view>
				<view class="flex align-center margin-top-sm text-sm">求购地区：北京市… </view>
				<view class="margin-top-sm flex justify-between text-sm">
					<view>
						<text class="bg-blue margin-right-xs text-lg">企 </text>
						<text  class="bg-green margin-right-xs text-lg">保</text>
						<text class="text-gray">7个报价</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 实力展示 -->
		<view v-show="TabCur==2" class="padding">
			<view class="">
				<view class="margin-tb-xl">公司简介</view>
				<view class="text-sm" style="height: 100rpx;">努力将产品达到最优，为您带来最好的服务</view>
			</view>
			<view>
				<view class="margin-tb-xl">认证信息</view>
				<view class="flex justify-start align-center">
					<image class="margin-right" src="../../../static/home/storeshop_shimin.png" style="height: 158rpx;width: 169rpx;" mode="aspectFit"></image>
					<image src="../../../static/home/storeshop_qiye.png" style="height: 158rpx;width: 169rpx;" mode="aspectFit"></image>
				</view>
			</view>
			<view class="flex justify-between margin-tb-sm">
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
			</view>
		</view>
		<!-- 聊一聊弹窗 -->
		<view class="bg-white showMadol" v-show="showMOdal" @click="hideModal">
			<view class="text-center text-lg text-bold margin-top">扫描二维码加商户微信</view>
			<view class="flex justify-center">
				<image src="../../../static/logo.png" mode="aspectFit" style="height: 300rpx;width: 300rpx;"></image>
			</view>
		</view>
		<!-- 底部导航栏Tabbar -->
		<view class="cu-tabbar-height"></view>
		<view class="flex justify-between align-center solid-top" style="position: fixed;bottom: 0;width: 100%;z-index: 999;">
			<view class="flex-sub flex justify-center align-center padding solids-right text-lg" style="background-color: #F7F7F7;" @click="showModal">
				<text class="cuIcon-comment" style="font-size: 48rpx;"></text>聊一聊</view>
			<view class="flex-sub flex justify-center align-center padding text-lg" style="background-color: #F7F7F7;">
				<text class="cuIcon-phone" style="font-size: 48rpx;"></text>打电话</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
				whichPlant:-1,
				plantNumber:2,
				plantsTypeList:['朴树','乌柏','朴树','乌柏乌','朴树','乌柏乌','朴树','乌柏乌乌','朴树','乌乌柏乌乌柏','乌柏乌乌','朴乌柏','朴树','乌柏','朴树','乌柏2',],
				plantsList:['1','1','1','1'],
				/* 展示聊一聊 */
				showMOdal:false
			}
		},
		methods: {
			/* 导航栏切换 */
			tabSelect(item) {
				this.TabCur=item.tabindex;
				this.scrollInto='tab'+item.tabindex;
			},
			/* 切换植物种类 */
			change(ind){
				this.whichPlant=ind;
			},
			/* 查看更多 */
			changePNumber(){
				this.plantNumber=this.plantsTypeList.length;
			},
			/* 收回更多 */
			backPNumber(){
				this.plantNumber=2;
			},
			/* 展示微信二维码 */
			showModal(){
				this.showMOdal=true;
			},
			hideModal(){
				this.showMOdal=false;
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
