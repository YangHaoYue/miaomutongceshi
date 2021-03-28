<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true"><block slot="backText">选择货品品种</block></cu-custom>
		<!-- 搜索框 -->
		<view class="cu-bar search bg-white padding-lr">
			<view class="search-form round bg-white">
				<text class="cuIcon-search"></text>
				<input @input="InputFocus" v-model="searchData" :adjust-position="false" type="text" placeholder="搜索供应" confirm-type="search"></input>
			</view>
		</view>
		<!-- 热门搜索 -->
		<view class="bg-white padding-lr-xl padding-top-xl" v-show="!showSearchList">
			<view class="flex align-center margin-bottom">
				<view class="bg-orange padding-xs radius text-center margin-right-sm flex align-center justify-center" style="width: 60rpx;height: 60rpx;"><text class="cuIcon-hot" style="font-size: 48rpx;"></text></view>
				<view class="text-df text-black text-bold">常用名称</view>
			</view>
			<view class="cu-list grid col-4 no-border">
				<view class="cu-item" v-for="(item,index) in hotList" :key="index" @click="toGongYing(item)">
					{{item.name}}
				</view>
			</view>
		</view>
		<!-- 搜索列表 -->
		<view class="bg-white" v-show="showSearchList">
			<view class="padding-xl solid-bottom" v-for="(item,id) in searchList" :key="id" @click="StoGongYing(item)">
				{{item.category}}—>{{item.breed_name}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(e) {
			this.getNomalUserInfo();
			this.type=e.index
			this.getHotSearch();
		},
		onReachBottom() {
			if(this.showSearchList){
				if(this.current_page<this.last_page){
					this.current_page++;
					this.getInfo(this.current_page);
				}else{
					this.http.toast('到底了！');
				}
			}
		},
		data() {
			return {
				searchData:"",
				
				historyList:[],
				hotList:[],
				
				current_page:0,
				last_page:0,
				showSearchList:false,
				searchList:[]
			}
		},
		methods: {
			getHotSearch(){
				this.http.post('breed/getHotSearch').then((res)=>{
					if(res.code==1000){
						this.hotList=res.data
					}
				})
			},
			getNomalUserInfo(){
				this.http.get('user/getUserInfo').then((res)=>{
					
				})
			},
			toGongYing(item){
				if(this.type=='0'){
					uni.navigateTo({url: 'faGongYing?id='+item.id+'&name='+item.name});
				}else{
					uni.navigateTo({url: 'faQiuGou?id='+item.id+'&name='+item.name});
				}
			},
			StoGongYing(item){
				if(this.type=='0'){
					uni.navigateTo({url: 'faGongYing?id='+item.breed_id+'&name='+item.breed_name});
				}else{
					uni.navigateTo({url: 'faQiuGou?id='+item.breed_id+'&name='+item.breed_name});
				}
			},
			InputFocus(e) {
				if(this.searchData!=''){
					this.showSearchList=true;
					this.getSearchList(1)
				}else{
					this.showSearchList=false;
				}
			},
			getSearchList(page){
				this.http.post('breed/searchBreeds',{
					keyword:this.searchData,
					page:page
				}).then((res)=>{
					if(res.code==1000){
						if(this.searchList.length==0){
							this.searchList=res.data.data;
							this.current_page=res.data.current_page;
							this.last_page=res.data.last_page;
						}else{
							this.searchList=this.searchList.concat(res.data.data);
						}
					}
				})
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
