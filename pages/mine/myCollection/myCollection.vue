<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true"><block slot="backText">我的收藏</block></cu-custom>
		<!-- 无收藏 -->
		<view v-if="list.length==0">
			<view style="width: 283rpx;height: 279rpx;margin: 240rpx auto 120rpx">
				<image src="../../../static/mine/nobox.png" mode="aspectFit" style="width: 283rpx;height: 279rpx;"></image>
			</view>
			<view class="text-black text-sm text-center text-bold">暂无收藏记录，去供应大厅看看</view>
			<button class="cu-btn bg-green logobtn round" @click="toHome">点击进入供应大厅</button>
		</view>
		<!-- 收藏列表 -->
		<view class="flex padding bg-white padding-tb-xs margin-tb" style="width: 100%;" v-for="(item,index) in list" :key="index" v-if="list.length!=0" @click="todetail(item.id)">
			<view class="flex-sub ">
				<image :src="http.resourceUrl()+item.img" mode="aspectFill" style="width: 234rpx;height: 214rpx;border-radius: 15rpx;"></image>
			</view>
			<view class="margin-left flex-twice">
				<view class="flex align-center justify-between margin-top ">
					<view class="flex align-center">
						<view class="text-black text-lg text-bold">{{item.title}}</view>
						<view class="bg-green margin-left text-center radius text-sm" style="width: 80rpx;" v-if="usage_type==0">家庭</view>
						<view class="bg-green margin-left text-center radius text-sm" style="width: 80rpx;" v-else>工程</view>
					</view>
					<view>{{item.time}}</view>
				</view>
				<view class="flex align-center margin-top-sm">
					<view class="money">{{item.price}}<text>{{item.unit}}</text></view>
					<view class="margin-left">{{item.view_count}}人查看</view>
				</view>
				<view class="margin-top-sm">
					<text v-if="item.person_auth==1" class="bg-blue margin-right-xs">企</text>
					<text v-if="item.enterprise_auth==1" class="bg-green margin-right-xs">实</text>
					{{item.area}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.getInfo(1)
		},
		//下拉刷新
		onPullDownRefresh(){
			this.list=[];
			this.getInfo(1);
			uni.stopPullDownRefresh();
		},
		//上拉加载
		onReachBottom() {
			if(this.current_page<this.last_page){
				this.current_page++;
				this.getInfo(this.current_page);
			}else{
				this.http.toast('到底了！');
			}
		},
		data() {
			return {
				list:[],
				current_page:'',//当前页数
				last_page:''//总页数
			}
		},
		methods: {
			getInfo(page){
				this.http.post('user/getMyCollects',{
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
			toHome(){
				uni.redirectTo({url:'/pages/home/gongying/gongying?title=工程供应'});
			},
			todetail(id){
				uni.navigateTo({url: '../../home/gongying/detail?supply_id='+id});
			}
		}
	}
</script>

<style>
	page{
		background-color: #FFFFFF;
		height: 100vh;
	}
	.logobtn{
		width: 650upx;
		height: 88upx;
		margin: 0 50upx;
		position: fixed;
		bottom: 180upx;
	}
</style>
