<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true">
			<block slot="backText">我的订单</block>
		</cu-custom>
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
		<view class="bg-gray" style="height: 20rpx;"></view>
		<view class="" v-for="(item,i) in list" :key="i" @click="toorder(item.order_id)">
			<view class="flex justify-between align-center padding">
				<view class="text-black text-bold text-lg">
					{{item.title}}
					<text class="bg-blue margin-right-xs text-lg margin-left" v-if="item.enterprise_auth==1" style="padding: 5rpx;">企 </text>
					<text class="bg-yellow text-white margin-right-xs text-lg" v-if="item.person_auth==1" style="padding: 5rpx;">实 </text>
				</view>
				<view class="text-yellow text-lg text-bold" v-if="item.status==0">待确认</view>
				<view class="text-yellow text-lg text-bold" v-if="item.status==1">待支付</view>
				<view class="text-yellow text-lg text-bold" v-if="item.status==3">待发货</view>
				<view class="text-yellow text-lg text-bold" v-if="item.status==4">已发货</view>
				<view class="text-yellow text-lg text-bold" v-if="item.status==5">已完成</view>
				<view class="text-yellow text-lg text-bold" v-if="item.status==7">订单关闭</view>
			</view>
			<view class="flex align-center bg-white padding-tb-sm padding-lr solid-bottom" style="width: 100%;">
				<view class="flex-sub">
					<image :src="http.resourceUrl()+item.img" mode="aspectFit" style="width: 234rpx;height: 214rpx;border-radius: 15rpx;"></image>
				</view>
				<view class="margin-left flex-twice">
					<view class="text-black text-lg text-bold margin-top-sm">{{item.breed_name}}</view>
					<view class="margin-top-xs text-lg">{{item.sell_price}}</view>
					<view class="margin-top-sm"></view>
					<view class="margin-top-xs">采购数量:{{item.count}}</view>
				</view>
			</view>
			<view class="text-yellow text-lg text-bold padding">{{item.total_price}}</view>
			<view class="bg-gray" style="height: 20rpx;"></view>
		</view>
		<!-- 暂无订单 -->
		<view style="margin: 180rpx auto;" v-if="list.length==0">
			<view class="flex align-center justify-center">
				<image src="../../../static/mine/no_orders.png" mode="aspectFit" style="height: 278rpx;width: 255rpx;"></image>
			</view>
			<view class="text-center margin-top-xl" style="color: #333333;">暂无订单</view>
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
				scrollInto:'',
				TabCur: 0,
				TabList:[{
					tabindex:0,
					TabName:'全部'
				},{
					tabindex:1,
					TabName:'待付款'
				},{
					tabindex:2,
					TabName:'待收货'
				}],
				list:[],
				current_page:'',//当前页数
				last_page:''//总页数
			}
		},
		methods: {
			getInfo(page){
				this.http.get('order/getMine',{
					page:page,
					type:1,
					tab:this.TabCur
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
				this.list=[];
				this.getInfo(1)
			},
			toorder(order_id){
				uni.navigateTo({url: '../../home/gongying/purchase/order?order_id='+order_id});
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
