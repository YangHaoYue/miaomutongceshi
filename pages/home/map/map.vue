<template>
	<view class="maps-container">
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true">
			<block slot="backText">地图找苗</block>
		</cu-custom>
		<view class="bg-white cu-btn" style="height: 97rpx;width: 100%;" @click="chooseLocation">{{position}}<text class="cuIcon-triangledownfill" style="font-size: 32rpx;"></text></view>
		
		<map class="tui-map" :latitude="lat" :style="'height:'+mapHeight+'px;'" :longitude="lng" :markers="covers" @callouttap="callouttap" :scale="12"><!-- @markertap="marker" -->
			<cover-view slot="callout">
			    <cover-view :marker-id="item.id" v-for="(item,i) in covers" :key="i">
					<cover-view class="bg-white map radius padding-lr padding-tb-sm" style="height: 160rpx;width: 469rpx;border-radius: 25rpx;">
						<cover-view class="flex justify-between align-center solid-bottom padding-tb-xs">
							<cover-view class="flex align-center padding-tb-xs">
								<cover-image src="/static/images/my/shop.png" class="smart-img margin-right-sm"></cover-image>
								<cover-view>{{item.title}}</cover-view>
							</cover-view>
							<cover-image src="/static/images/my/right.png" style="width: 18rpx;height: 34rpx;"></cover-image>
						</cover-view>
						<cover-view class="flex justify-between align-center padding-tb">
							<cover-view style="width: 300rpx;overflow: hidden;text-overflow: ellipsis;">主营:{{item.business}}</cover-view>
							<cover-view class="addr-opera">
								<cover-view class="opera-box" hover-class="tui-opcity" :hover-stay-time="150 " @click="call(item.tel)" :data-id="item.id" v-if="item.tel">
									<cover-image src="/static/images/my/call.png" class="mini-img"></cover-image>
								</cover-view>
								<cover-view class="opera-box" hover-class="tui-opcity" :hover-stay-time="150" @click="go(item)" :data-id="item.id">
									<cover-image src="/static/images/my/go.png" class="mini-img"></cover-image>
								</cover-view>
							</cover-view>
						</cover-view>
					</cover-view>
				</cover-view>
			</cover-view>
		</map>
		<view class="bg-green cu-btn" style="height: 97rpx;width: 100%;" v-if="!showList" @click="show">您附近有{{nearby_count}}位供货商</view>
		
		<scroll-view scroll-y class="scrollView" :style="{height:scrollH +'px'}" @scrolltolower="pullUp" v-if="showList">
			<view class="tui-list">
				<view class="tui-list-cell" :class="[index==address.length-1?'tui-cell-last':'']" v-for="(item,index) in address"
				 :key="index">
					<view class="addr-title">
						<text>{{item.title}}</text>
					</view>
					<view class="addr-box ">
						<view class="addr-detail ">
							<!-- <text class="distance">{{item.distance}}m</text> -->
							主营:{{item.business}}
						</view>
						<view class="addr-opera">
							<view class="opera-box " hover-class="tui-opcity" :hover-stay-time="150 " @tap="call(item.tel)" :data-id="item.id" v-if="item.tel">
								<image src="/static/images/my/call.png" class="mini-img"></image>
								<view class="text">打电话</view>
							</view>
							<view class="opera-box " hover-class="tui-opcity" :hover-stay-time="150" @tap="go(item)" :data-id="item.id">
								<image src="/static/images/my/go.png" class="mini-img"></image>
								<view class="text">到这里</view>
							</view>
						</view>
					</view>
				</view>
				<tui-loadmore :index="3" v-if="loading"></tui-loadmore>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import tuiLoadmore from "@/components/tui-loadmore/tui-loadmore";
	const QQMapWX = require('@/libs/qqmap-wx-jssdk.min.js');
	export default {
		components:{
			tuiLoadmore
		},
		data() {
			return {
				qqmapsdk: null,
				key: 'JTHBZ-TMF32-BERUV-CBXUN-NWI2K-QTFMX',
				lat: 22.63137,
				lng: 114.010857,
				area_id:'',
				position:'正在获取当前地址...',
				
				mapHeight:1050,
				covers: [],
				nearby_count:0,//附近供货商
				showList:false,
				address: [],
				scrollH: 246,
				pageIndex: 1,
				last_page:2,
				loading: true,
				pullUpOn: true
			}
		},
		onLoad(options) {
			this.qqmapsdk = new QQMapWX({
				key: this.key
			});
			setTimeout(() => {
				let winHeight = uni.getSystemInfoSync().windowHeight;
				this.scrollH = winHeight - 74 - uni.upx2px(600);
				this.mapHeight=winHeight-184;
				this.getLocation();
			}, 300)
		},
		methods: {
			getLocation() {
				//当前位置
				const that = this;
				//H5：使用坐标类型为 gcj02 时，需要配置腾讯地图 sdk 信息（manifest.json -> h5）
				uni.getLocation({
					type: 'gcj02',
					altitude: true,
					success(res) {
						that.getAddress(res.longitude,res.latitude);
					},
					fail(res) {
					}
				});
			},
			getAddress: function(lng, lat) {
				this.lat = lat;
				this.lng = lng;
				//根据经纬度获取地址信息
				this.qqmapsdk.reverseGeocoder({
					location: {
						latitude: lat,
						longitude: lng
					},
					success: (res) => {
						this.area_id=res.result.ad_info.adcode;
						this.position = res.result.address;
						this.address=[];
						this.covers=[];
						this.pageIndex=1;
						this.pullUpOn=true;
						this.getPoiAround()
					},
					fail: (res) => {
						this.position = "获取位置信息失败"
					}
				})
			},
			chooseLocation(){
				uni.chooseLocation({
					success: (res) => {
						this.getAddress(res.longitude,res.latitude)
					}
				})
			},
			getResult(data) {
				let arr = [];
				let addr = [];
				for (let item of data) {
					arr.push({
						id: item.store_id,
						latitude: item.latitude,
						longitude: item.longitude,
						title: item.store_name,
						iconPath:item.image,
						business: item.business,
						tel: item.mobile,
						width:32,
						height:32,
						customCallout: {
							anchorX: 0,
							anchorY: -10,
							display: "BYCLICK"
						}
					});
					addr.push({
						id: item.store_id,
						latitude: item.latitude,
						longitude: item.longitude,
						title: item.store_name,
						/* address: item.address, */
						tel: item.mobile,
						business: item.business
					});
				}
				this.address = this.address.concat(addr);
				this.covers = this.covers.concat(arr);
				/* this.address=this.address.reverse().filter((item,index)=>{
					const _index=this.address.findIndex((_item)=>{
						return item.id==_item.id
					});
					return index==_index
				})
				console.log(this.address)
				this.covers=this.covers.reverse().filter((item,index)=>{
					const _index=this.covers.findIndex((_item)=>{
						return item.id==_item.id
					});
					return index==_index
				}) */
				this.loading = false;
				if (this.pageIndex==this.last_page) {
					this.pullUpOn = false;
				}
				this.pageIndex++;
				console.log(this.pageIndex)
				console.log(this.last_page)
			},
			pullUp() {
				if (!this.pullUpOn || this.loading) return;
				this.loading = true;
				this.getPoiAround()
			},
			getMapStores(){
				this.http.get('map/getMapStores',{
					page:this.pageIndex,
					area_id:this.area_id,
					latitude:this.lat,
					longitude:this.lng
				},true).then((res)=>{
					uni.hideLoading();
					if(res.code==1000){
						const result=res.data.data;
						this.nearby_count=res.data.nearby_count;
						this.last_page=res.data.last_page;
						this.pageIndex=res.data.current_page
						this.getResult(result);
					}
				})
			},
			getPoiAround() {
				this.http.get('map/getMapStores',{
					page:this.pageIndex,
					area_id:this.area_id,
					latitude:this.lat,
					longitude:this.lng
				},true).then((res)=>{
					uni.hideLoading();
					if(res.code==1000){
						const result=res.data.data;
						this.nearby_count=res.data.nearby_count;
						this.last_page=res.data.last_page;
						this.getResult(result);
					}
				})
				/* this.http.get('map/getMapPoints',{
					area_id:this.area_id,
					latitude:this.lat,
					longitude:this.lng
				},true).then((res)=>{
					uni.hideLoading();
					if(res.code==1000){
						const result=res.data.data;
						this.nearby_count=res.data.nearby_count;
						this.getResult(result)
					}
				}) */
			},
			/* 展示列表 */
			show(){
				this.showList=true;
				this.mapHeight=uni.upx2px(600);
			},
			callouttap(e){
				this.marker(e);
			},
			marker: function(e) {
				const that = this
				const item = that.address.filter(function(item){
					return item.id==e.detail.markerId
				})
				const menu = item[0].tel ? ["打电话", "到这里"] : ["到这里"];

				uni.showActionSheet({
					itemList: menu,
					success(res) {
						if (res.tapIndex == 0 && item[0].tel) {
							uni.makePhoneCall({
								phoneNumber:item[0].tel
							})
						} else {
							const latitude = Number(item[0].latitude)
							const longitude = Number(item[0].longitude)
							uni.openLocation({
								name: item[0].title,
								/* address: item[0].address, */
								latitude,
								longitude,
								scale: 18
							})
						}
					},
					fail(res) {
						console.log(res.errMsg)
					}
				})

			},
			call(tel) {
				uni.makePhoneCall({phoneNumber: tel})
			},
			go(item) {
				const latitude = Number(item.latitude)
				const longitude = Number(item.longitude)
				uni.openLocation({
					name: item.title,
					address: item.address,
					latitude,
					longitude,
					scale: 18
				})
			}
		}
	}
</script>

<style>
	page {
		height: 100%;
	}

	.tui-list {
		background-color: #fff;
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-list-cell {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.tui-list-cell::after {
		content: '';
		position: absolute;
		border-bottom: 1rpx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		bottom: 0;
		right: 0;
		left: 30rpx;
	}

	.tui-cell-last::after {
		border-bottom: 0;
	}

	.maps-container {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.tui-map {
		width: 100%;
		display: block;
	}

	.scrollView {
		width: 100%;
		padding-bottom: 100rpx;
		background-color: #fff;
	}

	.search-bar {
		position: relative;
		padding: 8px 10px;
		display: -webkit-flex;
		display: flex;
		box-sizing: border-box;
		align-items: center;
		background-color: #fff;
	}

	.icon-search {
		margin-right: 8px;
	}

	.icon-search-in-box {
		margin-right: 8rpx;
	}

	.search-bar-form {
		position: relative;
		-webkit-box-flex: 1;
		-webkit-flex: auto;
		flex: auto;
		border-radius: 5px;
		background-color: #f0f0f0;
	}

	.search-bar-text {
		display: inline-block;
		font-size: 14px;
		vertical-align: middle;
	}

	.search-bar-box {
		width: 100%;
		height: 30px;
		padding-left: 10px;
		padding-right: 30px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		position: relative;
		z-index: 1;
		
	}

	.search-bar-input {
		font-size: 14px;
		flex: 1;
	}

	.icon-clear {
		height: 100%;
		position: absolute;
		top: 0;
		right: 0;
		padding: 0 8px;
		font-size: 0;
		display: flex;
		align-items: center;
	}

	.search-bar-label {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 2;
		border-radius: 3px;
		text-align: center;
		color: #9b9b9b;
		background: #f0f0f0;
		display: flex;
		align-items: center;
		justify-content: center;

	}

	.cancel-btn {
		margin-left: 10px;
		line-height: 30px;
		color: #5982fd;
		white-space: nowrap;
		font-size: 15px;
	}

	.tui-list-cell {
		display: initial;
		padding: 30rpx;
	}

	.addr-title {
		font-size: 30rpx;
		line-height: 40rpx;
		color: #000;
		font-weight: bold;
		width: 100%;
		padding-bottom: 20rpx;
	}

	.addr-box {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}

	.addr-detail {
		width: 450rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		/* autoprefixer: off */
		-webkit-box-orient: vertical;
		/* autoprefixer: on */
		font-size: 24rpx;
		color: #999;
	}

	.distance {
		color: #5677fc;
		padding-right: 6rpx;
	}

	.addr-opera {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.opera-box {
		text-align: center;
		margin-left: 26rpx;
	}

	.mini-img {
		width: 44rpx;
		height: 44rpx;
	}
	.smart-img{
		width:32rpx;
		height: 30rpx;
	}

	.text {
		color: #333;
		font-size: 24rpx;
		line-height: 30rpx;
	}
	.map::after {
		content: '';
		position: absolute;
		width: 0;
		height: 0;
		border-top: solid 6px #FFFFFF;
		border-right: solid 6px transparent;
		border-left: solid 6px transparent;
		left: 50%;
		bottom: -6px;
		margin-left: -6px;
	}
</style>
