<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true">
			<block slot="backText">我的供应</block>
		</cu-custom>
		<!-- 搜索框 -->
		<view class="cu-bar search bg-white">
			<view class="search-form round bg-white">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索供应" confirm-type="search"></input>
			</view>
		</view>
		<!-- 导航栏 -->
		<scroll-view scroll-x class="bg-white nav margin-bottom-sm" :scroll-into-view="scrollInto" :scroll-with-animation="true">
			<view class="flex justify-around">
				<view class="cu-item cuitem text-lg text-bold" :class="item.tabindex==TabCur?'text-green Tabcur':''"
				 v-for="(item,id) in TabList" :key="id"
				  @tap="tabSelect(item)" :id="'tab'+item.tabindex">
					{{item.TabName}}
				</view>
			</view>
		</scroll-view>
		<!-- 列表 -->
		<view class="flex padding bg-white padding-tb-sm" style="width: 100%;" v-for="i in 5" :key="i">
			<view class="flex-sub ">
				<image src="../../../static/logo.png" mode="aspectFit" style="width: 234rpx;height: 214rpx;"></image>
			</view>
			<view class="margin-left flex-twice">
				<view class="flex align-center justify-between margin-top ">
					<view class="flex align-center">
						<view class="text-black text-lg text-bold">樱花</view>
						<view class="bg-green margin-left text-center radius text-sm" style="width: 80rpx;">家庭</view>
					</view>
					<view class="cuIcon-writefill text-grey" style="font-size: 42rpx;"></view>
				</view>
				<view class="flex align-center margin-top-sm">
					<view class="text-orange text-xl">电议</view>
					<view class="margin-left">1213人查看</view>
				</view>
				<view class="margin-top-sm"><text class="bg-blue margin-right-xs">企 </text> 江苏省徐州市</view>
			</view>
		</view>
		<!-- 底部导航栏Tabbar -->
		<view class="cu-tabbar-height margin-bottom"></view>
		<view class="flex justify-around padding" style="position: fixed;bottom:0;width: 100%;z-index: 999;">
			<button class="cu-btn flex-sub shadow margin bg-gradual-green lg" style="border-radius: 25rpx;" @click="toGongYing">
				<text class="cuIcon-evaluate_fill" style="font-size: 36rpx;"></text>发布新供应
			</button>
			<button class="cu-btn flex-sub shadow margin bg-gradual-orange lg" style="border-radius: 25rpx;" @click="refresh">
				<text class="cuIcon-refresh" style="font-size: 36rpx;"></text>一键刷新
			</button>
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
					TabName:'发布中'
				},{
					tabindex:1,
					TabName:'已下架'
				}],
				list:[]
			}
		},
		methods: {
			/* 导航栏切换 */
			tabSelect(item) {
				this.TabCur=item.tabindex;
				this.scrollInto='tab'+item.tabindex;
			},
			/* 发布供应 */
			toGongYing(){
				uni.navigateTo({url: '../../release/release?index=0'});
			},
			refresh(){
				uni.showLoading({
					title: '正在刷新...',
					mask: true
				});
				setTimeout(()=>{
					uni.hideLoading();
					uni.showToast({
						icon:'none',
						title: '刷新成功！'
					});
				},1500)
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
</style>
