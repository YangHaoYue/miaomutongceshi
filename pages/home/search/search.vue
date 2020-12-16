<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true"><block slot="backText">搜索</block></cu-custom>
		<!-- 搜索框 -->
		<view class="cu-bar search bg-white padding-lr">
			<view class="action text-gray text-sm">
				<text>供应</text>
				<text class="cuIcon-triangledownfill"></text>
			</view>
			<view class="search-form round bg-white">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索供应" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn line-yellow shadow-blur round">取消</button>
			</view>
		</view>
		<!-- 历史搜索 -->
		<view class="bg-white padding-lr-xl">
			<view class="flex align-center margin-bottom-xl">
				<view class="bg-green padding-xs radius text-center margin-right-sm flex align-center justify-center" style="width: 60rpx;height: 60rpx;"><text class="cuIcon-search" style="font-size: 48rpx;"></text></view>
				<view class="text-df text-black text-bold">历史搜索</view>
			</view>
			<view v-for="(item,index) in historyList" :key="index">{{item}}</view>
		</view>
		<!-- 热门搜索 -->
		<view class="bg-white padding-lr-xl padding-top-xl">
			<view class="flex align-center margin-bottom-xl">
				<view class="bg-orange padding-xs radius text-center margin-right-sm flex align-center justify-center" style="width: 60rpx;height: 60rpx;"><text class="cuIcon-hot" style="font-size: 48rpx;"></text></view>
				<view class="text-df text-black text-bold">热门搜索</view>
			</view>
			<view class="cu-list grid col-4 no-border">
				<view class="cu-item" v-for="(item,index) in hotList" :key="index" >
					{{item}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(e) {
			console.log(e)
		},
		data() {
			return {
				historyList:['美国红枫秋火焰'],
				hotList:['桂花','桂花','桂花','桂花','桂花','桂花','桂花','桂花'],
			}
		},
		methods: {
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			}
		}
	}
</script>

<style>
	page{
		background: #FFFFFF;
		height: 100vh;
	}
</style>
