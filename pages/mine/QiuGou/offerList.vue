<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true">
			<block slot="backText">收到报价</block>
		</cu-custom>
		<!-- 求购信息 -->
		<view class="padding">
			<view class="margin-tb-sm">{{topData.breed_name}}</view>
			<view class="margin-tb-sm">采购数量{{topData.want_count}}{{topData.unit}}</view>
			<view class="margin-tb-sm">截止日期:{{topData.deadline}}</view>
		</view>
		<view class="bg-gray" style="height: 20rpx;"></view>
		<!-- 报价列表 -->
		<view class="margin-tb" v-for="(item,index) in list" :key="index">
			<view class="flex justify-between align-center margin-bottom-sm padding-lr">
				<view><text class="text-green text-lg">{{item.price}}</text>【{{item.price_type}}】</view>
				<view class="cuIcon-phone text-green" style="font-size: 42rpx;" @click="makePhoneCall(item.mobile)"></view>
			</view>
			<view class="margin-bottom-sm padding-lr">{{item.store_name}} | {{item.area}}</view>
			<view class="flex justify-between align-center margin-bottom-sm padding-lr">
				<view class="flex align-center">
					<view class="bg-blue margin-right-xs" style="padding: 5rpx;" v-if="item.person_auth==1">企 </view>
					<view class="bg-green margin-right-xs" style="padding: 5rpx;" v-if="item.enterprise_auth==1">实 </view>
				</view>
				<button class="cu-btn line-green radius sm" @click="showImg(item.img)">查看图片</button>
			</view>
			<view class="bg-gray" style="height: 20rpx;"></view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(e) {
			this.want_id=e.want_id;
			this.getTopData();
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
				want_id:"",
				topData:"",
				
				list:[],
				current_page:'',//当前页数
				last_page:''//总页数
			}
		},
		methods: {
			getTopData(){
				this.http.post('want/getOffersDetail',{
					want_id:this.want_id
				}).then((res)=>{
					if(res.code==1000){
						this.topData=res.data
					}
				})
			},
			getInfo(page){
				this.http.get('want/getOffersList',{
					page:page,
					want_id:this.want_id
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
			showImg(imgs){
				var imgList= JSON.parse(JSON.stringify(imgs));
				imgList.forEach((item,index)=>{
					imgList[index]=this.http.resourceUrl()+item;
				})
				console.log(imgList)
				uni.previewImage({
					urls:imgList
				})
			},
			makePhoneCall(phoneNumber){
				uni.makePhoneCall({
					phoneNumber:phoneNumber
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
</style>
