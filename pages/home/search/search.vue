<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true"><block slot="backText">搜索</block></cu-custom>
		<!-- 搜索框 -->
		<view class="cu-bar search bg-white padding-lr">
			<view class="action text-gray text-sm">
				<picker @change="PickerChange" :value="index" :range="picker" range-key="name">
					{{picker[index].name}}<text class="cuIcon-triangledownfill"></text>
				</picker>
			</view>
			<view class="search-form round bg-white">
				<text class="cuIcon-search"></text>
				<input @input="InputFocus" v-model="searchData" :adjust-position="false" type="text" placeholder="搜索供应" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn line-yellow shadow-blur round" @click="empty">取消</button>
			</view>
		</view>
		<!-- 历史搜索 -->
		<view class="bg-white padding-lr-xl" v-show="!showSearchList">
			<view class="flex align-center margin-bottom">
				<view class="bg-green padding-xs radius text-center margin-right-sm flex align-center justify-center" style="width: 60rpx;height: 60rpx;"><text class="cuIcon-search" style="font-size: 48rpx;"></text></view>
				<view class="text-df text-black text-bold">历史搜索</view>
			</view>
			<view class="cu-list grid col-4 no-border">
				<view class="cu-item" v-for="(item,index) in historyList" :key="index" @click="toGongYing(item)">
					{{item.name}}
				</view>
			</view>
		</view>
		<!-- 热门搜索 -->
		<view class="bg-white padding-lr-xl padding-top-xl" v-show="!showSearchList">
			<view class="flex align-center margin-bottom">
				<view class="bg-orange padding-xs radius text-center margin-right-sm flex align-center justify-center" style="width: 60rpx;height: 60rpx;"><text class="cuIcon-hot" style="font-size: 48rpx;"></text></view>
				<view class="text-df text-black text-bold">热门搜索</view>
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
			if(e.isSupply){
				this.isSupply=true;
			}
			if(e.type){
				console.log(e)
				this.type=e.type;
				this.picker.forEach((item,index)=>{
					if(item.type==this.type)
					this.index=index;
				})
			}
			this.getHistoryList();
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
				isSupply:false,
				index:0,
				type:1,
				picker:[{
					name:'工程供应',
					type:1
				},{
					name:'家庭供应',
					type:0
				},{
					name:'求购',
					type:3
				}],
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
			getHistoryList(){
				this.historyList=uni.getStorageSync('historyList');
			},
			setHistoryList(data){
				let list=[];
				const historyList=uni.getStorageSync('historyList')
				if(historyList.length!=0){
					list=historyList
				}
				if(list.length==0||list.length<8){
					list.push(this._format_historyList(data));
					if(list.length>2){
						list=list.reverse().filter((item,index)=>{
							const _index=list.findIndex((_item)=>{
								return item.id==_item.id
							});
							return index==_index
						})
					}
				}else if(list.length==8){
					if(list.findIndex(item=>{return item.id==this._format_historyList(data).id})==-1){
						list.splice(0,1);
						list.push(this._format_historyList(data));
					}
				}
				uni.setStorageSync('historyList',list)
			},
			_format_historyList(e){
				return{
					id:e.id||e.breed_id,
					name:e.name||e.breed_name
				}
			},
			getHotSearch(){
				this.http.post('breed/getHotSearch').then((res)=>{
					if(res.code==1000){
						this.hotList=res.data
					}
				})
			},
			toGongYing(item){
				this.setHistoryList(item);
				if(this.isSupply){
					uni.setStorageSync('Supply_breed_id',item.id)
					uni.navigateBack({delta: 1});
					return;
				}
				uni.redirectTo({url:'../gongying/gongying?breed_id='+item.id+'&type='+this.type+'&category='+item.name})
			},
			StoGongYing(item){
				this.setHistoryList(item);
				if(this.isSupply){
					uni.setStorageSync('Supply_breed_id',item.breed_id)
					/* uni.$emit('Supply_breed_id', {
						Supply_breed_id:item.breed_id
					}); */
					uni.navigateBack({delta: 1});
					return;
				}
				uni.redirectTo({url:'../gongying/gongying?breed_id='+item.breed_id+'&type='+this.type+'&category='+item.breed_name})
			},
			PickerChange(e) {
				this.index = e.detail.value;
				this.type=this.picker[this.index].type;
			},
			InputFocus(e) {
				if(this.searchData!=''){
					this.showSearchList=true;
					this.getSearchList(1)
				}else{
					this.showSearchList=false;
				}
			},
			empty(){
				this.showSearchList=false;
				this.searchData='';
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
