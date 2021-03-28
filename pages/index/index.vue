<template>
	<view>
		<home v-show="PageCur=='home'"></home>
		<mine v-show="PageCur=='mine'"></mine>
		<!-- 底部弹窗 -->
		<view class="cu-modal bottom-modal" @tap="hideModal" :class="modalName=='bottomModal'?'show':''">
			<view class="cu-dialog">
				<view class="padding-xl bg-white flex justify-around">
					<view class="" v-for="(item,index) in btnList" :key="index" @tap.stop="toRelease(index)">
						<view style="width: 90rpx;height: 90rpx;margin: auto;">
							<image :src="item.img" mode="aspectFit" style="width: 90rpx;height: 90rpx;"></image>
						</view>
						<text>{{item.title}}</text>
					</view>
				</view>
				<view class="cu-bar bg-white justify-center">
					<text class="cuIcon-close text-bold" @tap.stop="hideModal" style="font-size: 32upx;"></text>
				</view>
			</view>
		</view>
		
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @tap="NavChange" data-cur="home">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/home' + [PageCur=='home'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='home'?'text-green':'text-gray'">首页</view>
			</view>
			<view class="action text-gray add-action">
				<button class="cu-btn cuIcon-add bg-green shadow" @tap="showModal"></button>
				发布信息
			</view>
			<view class="action" @tap="NavChange" data-cur="mine">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/mine' + [PageCur == 'mine'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='mine'?'text-green':'text-gray'">我的</view>
			</view>
		</view>
		<!-- 回到顶部 -->
		<tui-scroll-top :scrollTop="scrollTop"></tui-scroll-top>
	</view>
</template>

<script>
	import tuiScrollTop from "@/components/tui-scroll-top/tui-scroll-top"
	export default {
		components:{
				tuiScrollTop
		},
		onLoad(e) {
			if(e.mine){
				this.PageCur='mine'
			}
		},
		onPullDownRefresh() {
			uni.$emit('onPullDownRefresh',{
				onPullDownRefresh:true
			});
			setTimeout(()=>{uni.stopPullDownRefresh();},1000)
		},
		onReachBottom() {
			uni.$emit('onReachBottom',{
				onReachBottom:true
			});
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		data() {
			return {
					PageCur: 'home',
					scrollTop:0,
					modalName:'',
					btnList:[{
						title:'发布供应',
						img:'../../static/home/category/gongcheng.png'
					},{
						title:'发布求购',
						img:'../../static/home/category/qiugou.png'
					}]
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			},
			showModal:function(){
				this.modalName='bottomModal'
			},
			hideModal:function(){
				this.modalName=''
			},
			toRelease:function(index){
				uni.navigateTo({url: '../release/release?index='+index});
			}
		}
	}
</script>

<style>

</style>