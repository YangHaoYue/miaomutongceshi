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
					{{item.TabName}}
				</view>
			</view>
		</scroll-view>
		<!-- 列表 -->
		<view class="" v-for="(item,index) in list" :key="index">
			<view class="flex justify-between padding align-end solid-bottom">
				<view>
					<view class="text-lg text-black text-bold">{{item.breed_name}}</view>
					<view class="text-grey margin-tb">采购数量{{item.want_count}}{{item.unit}}</view>
					<view class="text-grey">截止日期：{{item.deadline}}</view>
				</view>
				<view @click="toOfferList(item.id)">
					<view class="bg-green padding-xs text-center margin-bottom-sm" v-if="item.offer_count!=0">{{item.offer_count}}条报价</view>
					<view class="text-green text-center text-df" v-if="item.has_new==1">收到新的报价</view>
				</view>
				<view class="bg-gray padding-xs text-center margin-bottom-sm" v-if="item.offer_count==0">暂无报价</view>
			</view>
			<view class="flex justify-between align-center">
				<view class="flex-sub margin-tb-sm text-black text-bold text-center text-lg solids-right" v-if="TabCur==0" @click="end(item.id)">结束报价</view>
				<view class="flex-sub margin-tb-sm text-black text-bold text-center text-lg solids-right" @click="toOfferList(item.id)">查看求购</view>
				<view class="flex-sub margin-tb-sm text-black text-bold text-center text-lg" @click="delet(item.id)">删除求购</view>
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
					TabName:'报价中'
				},{
					tabindex:1,
					TabName:'已截止'
				}],
				list:[],
				current_page:'',//当前页数
				last_page:''//总页数
			}
		},
		methods: {
			getInfo(page){
				this.http.post('want/getMine',{
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
			toQiuGou(){
				uni.navigateTo({url: '../../release/release?index=1'});
			},
			toDetail(id){
				uni.navigateTo({url: 'detail?want_id='+id});
			},
			toOfferList(want_id){
				uni.navigateTo({url: 'offerList?want_id='+want_id});
			},
			/* 结束报价 */
			end(want_id){
				this.http.post('want/modifyWant',{
					want_id:want_id,
					type:0//0停止报价1删除报价
				}).then((res)=>{
					this.http.toast(res.msg)
					if(res.code==1000){
						this.list=[];
						this.getInfo(1)
					}
				})
			},
			delet(want_id){
				this.http.post('want/modifyWant',{
					want_id:want_id,
					type:1//0停止报价1删除报价
				}).then((res)=>{
					this.http.toast(res.msg)
					if(res.code==1000){
						this.list=[];
						this.getInfo(1)
					}
				})
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
