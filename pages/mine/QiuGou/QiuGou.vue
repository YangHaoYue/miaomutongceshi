<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true">
			<block slot="backText">我的求购</block>
		</cu-custom>
		<!-- 导航栏 -->
		<scroll-view scroll-x class="bg-white nav padding-bottom-sm solids-bottom" :scroll-into-view="scrollInto" :scroll-with-animation="true">
			<view class="flex justify-around">
				<view class="cu-item cuitem text-lg text-bold" :class="item.tabindex==TabCur?'text-green Tabcur':''"
				 v-for="(item,id) in TabList" :key="id"
				  @tap="tabSelect(item)" :id="'tab'+item.tabindex">
					{{item.TabName}}(2)
				</view>
			</view>
		</scroll-view>
		<!-- 列表 -->
		<view class="" v-for="i in 5" :key="i">
			<view class="flex justify-between padding align-end solid-bottom">
				<view>
					<view class="text-lg text-black text-bold">25公分国槐</view>
					<view class="text-grey margin-tb">采购数量11株</view>
					<view class="text-grey">截止日期：2020-12-06</view>
				</view>
				<view>
					<view class="bg-green padding-xs text-center margin-bottom-sm" @click="toOfferList">5条报价</view>
					<view class="text-green text-center text-df">收到新的报价</view>
				</view>
				<!-- <view class="bg-gray padding-xs text-center margin-bottom-sm">暂无报价</view> -->
			</view>
			<view class="flex justify-between align-center">
				<view class="flex-sub margin-tb-sm text-black text-bold text-center text-lg solids-right">结束报价</view>
				<view class="flex-sub margin-tb-sm text-black text-bold text-center text-lg solids-right" @click="toDetail">查看求购</view>
				<view class="flex-sub margin-tb-sm text-black text-bold text-center text-lg">删除求购</view>
			</view>
			<view class="bg-gray" style="height: 20rpx;width: 100%;"></view>
		</view>
		<!-- 底部导航栏Tabbar -->
		<view class="cu-tabbar-height"></view>
		<button class="cu-btn bg-green logobtn " @tap="toQiuGou">发布新求购</button>
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
					TabName:'报价中'
				},{
					tabindex:1,
					TabName:'已截至'
				}],
			}
		},
		methods: {
			/* 导航栏切换 */
			tabSelect(item) {
				this.TabCur=item.tabindex;
				this.scrollInto='tab'+item.tabindex;
			},
			toQiuGou(){
				uni.navigateTo({url: '../../release/release?index=1'});
			},
			toDetail(){
				uni.navigateTo({url: 'detail'});
			},
			toOfferList(){
				uni.navigateTo({url: 'offerList'});
			}
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
		height: 100vh;
	}
	.Tabcur{
		border-bottom: solid #00913A 4upx;
	}
	.logobtn{
		width: 100%;
		height: 88upx;
		position: fixed;
		bottom: 0upx;
		border-radius: 0;
		z-index: 999;
	}
</style>
