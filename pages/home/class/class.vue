<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true">
			<block slot="backText">苗木课堂</block>
		</cu-custom>
		<!-- 课堂列表 -->
		<view class="margin-tb-sm margin-lr radius bg-white flex padding-sm" v-for="(item,i) in list" :key="i" @tap="toDetail(item.id)">
			<view class="flex-sub">
				<image :src="http.resourceUrl()+item.img" mode="aspectFill" style="width: 223rpx;height: 225rpx;"></image>
			</view>
			<view class="flex-twice">
				<view class="margin padding-tb-sm">
					{{item.title}}
				</view>
				<view class="flex justify-between text-sm margin-top-xl margin-lr">
					<view class=" text-gray"><text class="cuIcon-attention margin-right-xs"></text>{{item.view}}</view>
					<view class="text-black">{{item.created_at}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.getInfo();
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
				this.http.post('nurseryClass/getArticleList',{
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
			toDetail(id){
				uni.navigateTo({url: 'detail?id='+id});
			}
		}
	}
</script>

<style>

</style>
