<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true">
			<block slot="backText">收支明细</block>
		</cu-custom>
		<!-- 导航栏 -->
		<scroll-view scroll-x class="bg-white nav margin-top " :scroll-into-view="scrollInto" :scroll-with-animation="true">
			<view class="flex justify-around">
				<view class="cu-item cuitem text-lg text-bold" :class="item.tabindex==TabCur?'text-green Tabcur':''"
				 v-for="(item,id) in TabList" :key="id"
				  @tap="tabSelect(item)" :id="'tab'+item.tabindex">
					{{item.TabName}}
				</view>
			</view>
		</scroll-view>
		<!-- 明细列表 -->
		<view>
			<view class="cu-list menu-avatar margin-top">
				<view class="item bg-white flex justify-between" v-for="(item,index) in list" :key="index">
					<view class="Profitcontent">
						<view class="text-black"><view class="text-cut">{{item.title}}</view></view>
						<view class="text-black text-sm flex margin-top-sm"> <view class="text-cut">{{item.time}}</view></view>
					</view>
					<view class="action text-right">
						<view class="text-xs" style="font-size: 32upx;">{{item.count.toFixed(2)}}元</view>
					</view>
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
				scrollInto:'',
				TabCur: 0,
				TabList:[{
					tabindex:0,
					TabName:'全部'
				},{
					tabindex:1,
					TabName:'收入'
				},{
					tabindex:2,
					TabName:'支出'
				}],
				list:[],
				current_page:'',//当前页数
				last_page:''//总页数
			}
		},
		methods: {
			getInfo(page){
				this.http.get('user/getCashInfo',{
					page:page,
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
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #FFFFFF;
		height: 100vh;
	}
	.Tabcur{
		border-bottom: solid #00913A 4upx;
	}
	.cu-list{
		.item{
			height: 114upx;
			padding: auto 27upx auto 34upx;
			border-bottom: 1upx solid #EEEEEE;
			.Profitcontent{
				margin: auto 0upx auto 34upx;
				color: #333333;
			}
			.action{
				margin: auto 27upx auto 0upx;
			}
		}
	}
</style>
