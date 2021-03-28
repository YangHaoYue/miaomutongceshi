<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true">
			<block slot="backText">我的供应</block>
		</cu-custom>
		<!-- 搜索框 -->
		<view class="cu-bar search bg-white">
			<view class="search-form round bg-white">
				<text class="cuIcon-search"></text>
				<input disabled="true" @click="toSearch" :adjust-position="false" type="text" placeholder="搜索供应" confirm-type="search"></input>
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
		<view class="cu-list menu-avatar">
			<view class="cu-item flex padding-lr bg-white padding-tb-xs" style="width: 100%;height: 100%;" :class="modalName=='move-box-'+ index?'move-cur':''" 
			v-for="(item,index) in list" :key="index"
			 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index">
			 	<view class="flex-sub ">
			 		<image :src="http.resourceUrl()+item.img" mode="aspectFill" style="width: 234rpx;height: 214rpx;border-radius: 15rpx;"></image>
			 	</view>
			 	<view class="margin-left flex-twice">
			 		<view class="flex align-center justify-between margin-top ">
			 			<view class="flex align-center">
			 				<view class="text-black text-lg text-bold">{{item.title}}</view>
			 				<view class="bg-green margin-left text-center radius text-sm" style="width: 80rpx;" v-if="item.usage_type==0">家庭</view>
			 				<view class="bg-green margin-left text-center radius text-sm" style="width: 80rpx;" v-else>工程</view>
			 			</view>
			 			<view class="cuIcon-writefill text-grey" style="font-size: 42rpx;" @click="toDetail(item.id)"></view>
			 		</view>
			 		<view class="flex align-center margin-top-sm">
			 			<view class="text-orange text-xl">{{item.price}}{{item.unit}}</view>
			 			<view class="margin-left">{{item.view_count}}人查看</view>
			 		</view>
			 		<view class="margin-top-sm">
			 			<text v-if="item.person_auth==1" class="bg-blue margin-right-xs">企</text>
			 			<text v-if="item.enterprise_auth==1" class="bg-green margin-right-xs">实</text>
			 			{{item.area}}</view>
			 	</view>
				<view class="move">
					<view class="bg-grey" v-if="TabCur==0" @click.stop="off(item.id)">下架</view>
					<view class="bg-grey" v-if="TabCur==1" @click.stop="on(item.id)">上架</view>
					<view class="bg-red" @click.stop="delet(item.id)">删除</view>
				</view>
			</view>
		</view>
		<!-- 底部导航栏Tabbar -->
		<view class="cu-tabbar-height margin-bottom-lg"></view>
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
		onLoad() {
			this.getInfo(1);
		},
		onShow() {
			let Supply_breed_id=uni.getStorageSync('Supply_breed_id');
			if(Supply_breed_id){
				this.list=[];
				this.breed_id=Supply_breed_id;
				this.getInfo(1);
				uni.removeStorageSync('Supply_breed_id')
			}
			/* var _this=this;
			uni.$on('Supply_breed_id',function(data){
			}); */
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
				breed_id:0,
				scrollInto:'',
				TabCur: 0,
				TabList:[{
					tabindex:0,
					TabName:'发布中'
				},{
					tabindex:1,
					TabName:'已下架'
				}],
				modalName:null,
				list:[],
				current_page:'',//当前页数
				last_page:''//总页数
			}
		},
		methods: {
			getInfo(page){
				this.http.post('supply/getMine',{
					breed_id:this.breed_id,
					tab:this.TabCur,
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
				this.list=[];
				this.getInfo(1);
			},
			/* 搜索 */
			toSearch(){
				uni.navigateTo({url: '../../home/search/search?isSupply=true'});
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
				this.list=[];
				this.breed_id=0;
				setTimeout(()=>{
					this.getInfo(1);
					uni.hideLoading();
					uni.showToast({
						icon:'none',
						title: '刷新成功！'
					});
				},1500)
			},
			on(id){
				uni.showModal({
					title: '提示',
					content: '请确认是否上架该商品？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确认',
					success: res => {
						if(res.confirm){
							this.http.get('supply/modifySupply',{
								supply_id:id,
								type:0//0上架1下架2删除
							}).then((res)=>{
								this.http.toast(res.msg);
								if(res.code==1000){
									setTimeout(()=>{this.list=[];this.getInfo(1)},1000)
								}
							})
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			off(id){
				uni.showModal({
					title: '提示',
					content: '请确认是否下架该商品？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确认',
					success: res => {
						if(res.confirm){
							this.http.get('supply/modifySupply',{
								supply_id:id,
								type:1//0上架1下架2删除
							}).then((res)=>{
								this.http.toast(res.msg);
								if(res.code==1000){
									setTimeout(()=>{this.list=[];this.getInfo(1)},1000)
								}
							})
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			delet(id){
				uni.showModal({
					title: '提示',
					content: '请确认是否删除该商品？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确认',
					success: res => {
						if(res.confirm){
							this.http.get('supply/modifySupply',{
								supply_id:id,
								type:2//0上架1下架2删除
							}).then((res)=>{
								this.http.toast(res.msg);
								if(res.code==1000){
									setTimeout(()=>{this.list=[];this.getInfo(1)},1000)
								}
							})
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			toDetail(id){
				uni.navigateTo({url: 'detail?id='+id});
			},
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},
			
			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},
			
			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
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
