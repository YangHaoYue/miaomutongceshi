<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true"><block slot="backText">选择货品品种</block></cu-custom>
		<!-- 搜索框 -->
		<view class="cu-bar search bg-white padding-lr">
			<view class="search-form round bg-white">
				<text class="cuIcon-search"></text>
				<input @input="InputFocus" v-model="searchData" :adjust-position="false" type="text" placeholder="搜索品种名称" confirm-type="search"></input>
			</view>
		</view>
		<!-- 热门搜索 -->
		<view class="bg-white padding-lr-xl padding-top-xl" v-show="!showSearchList">
			<view class="flex align-center margin-bottom-xl">
				<view class="bg-green radius text-center margin-right-sm flex align-center justify-center" style="width: 60rpx;height: 60rpx;"><text class="cuIcon-apps" style="font-size: 48rpx;"></text></view>
				<view class="text-df text-black text-bold">常用名称</view>
			</view>
			<view class="cu-list grid col-4 no-border">
				<view class="cu-item" v-for="(item,index) in List" :key="index" @click="toRelease(item)">
					{{item}}
				</view>
			</view>
		</view>
		<!-- 搜索列表 -->
		<view class="bg-white" v-show="showSearchList">
			<view class="padding-xl solid-bottom" v-for="(item,id) in searchList" :key="id" @click="toRelease(item)">
				{{item}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(e) {
			this.type=e.index;
		},
		data() {
			return {
				//发布类型
				type:'',
				/* 常用名称列表 */
				List:['桂花','桂花','桂花','桂花','桂花','桂花','桂花','桂花'],
				searchData:'',
				/* 搜索列表 */
				showSearchList:false,
				searchList:['桂花','桂花','桂花','桂花','桂花','桂花','桂花','桂花','桂花','桂花','桂花','桂花']
			}
		},
		methods: {
			InputFocus(e) {
				if(this.searchData!=''){
					this.showSearchList=true
				}
			},
			toRelease(item){
				if(this.type==0){
					uni.navigateTo({url: 'faGongYing?name='+item});
				}else if(this.type==1){
					uni.navigateTo({url: 'faQiuGou?name='+item});
				}
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
