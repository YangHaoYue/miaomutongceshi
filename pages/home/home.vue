<template name="home">
	<view class="container u-skeleton">
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="false">
			<block slot="backText"><image src="../../static/home/home_title_img.png" style="width: 224rpx;height: 72rpx;" mode="aspectFit"></image></block>
		</cu-custom>
		<!-- 搜索框 -->
		<view class="cu-bar search bg-white">
			<view class="action text-green text-sm u-skeleton-fillet">
				<text class="cuIcon-location"></text>
				<text>{{address}}</text>
				<text class="cuIcon-triangledownfill"></text>
			</view>
			<navigator hover-class='none' url="/pages/home/search/search" class="search-form round u-skeleton-fillet" navigateTo>
				<text class="cuIcon-search"></text>
				<input disabled="true" :adjust-position="false" type="text" placeholder="搜索苗木信息" confirm-type="search"></input>
			</navigator>
		</view>
		<!-- 轮播图 -->
		<swiper class="screen-swiper u-skeleton-rect" :indicator-dots="false" :circular="true"
		 :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="http.resourceUrl()+item.img" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<!-- 分类 -->
		<view class="flex justify-around bg-white padding">
			<view v-for="(item,index) in categoryList" :key="index">
				<navigator hover-class='none' :url="item.link" class="search-form round" navigateTo>
					<view style="width: 90rpx;height: 90rpx;margin: auto;">
						<image class="u-skeleton-circle" :src="http.resourceUrl()+item.img" mode="aspectFit" style="width: 90rpx;height: 90rpx;"></image>
					</view>
					<view class="text-sm u-skeleton-fillet text-center margin-top-xs" style="width: 100rpx;">{{item.name}}</view>
				</navigator>
			</view>
		</view>
		<!-- 苗科分类 -->
		<view class="cu-list grid col-4 no-border margin-top">
			<view class="cu-item" v-for="(item,index) in botanyList" :key="index" >
				<navigator hover-class='none' :url="'/pages/home/gongying/gongying?type=-1&cate_id='+item.id" class="search-form round" navigateTo>
					<view style="width: 90rpx;height: 90rpx;margin: auto;" >
						<image class="u-skeleton-circle" :src="http.resourceUrl()+item.img" mode="aspectFit" style="width: 90rpx;height: 90rpx;"></image>
					</view>
					<text class="">{{item.name}}</text>
				</navigator>
			</view>
		</view>
		<!-- 供应大厅和求购大厅 -->
		<scroll-view scroll-x class="bg-white nav margin-top u-skeleton-fillet" :scroll-into-view="scrollInto" :scroll-with-animation="true">
			<view class="flex justify-around">
				<view class="cu-item cuitem text-lg text-bold" :class="item.tabindex==TabCur?'text-green Tabcur':''"
				 v-for="(item,id) in TabList" :key="id"
				  @tap="tabSelect(item)" :id="'tab'+item.tabindex">
					{{item.TabName}}
				</view>
			</view>
		</scroll-view>
		<!-- 供应列表 -->
		<view v-if="TabCur==0" v-for="(item,index) in GYlist" :key="index">
			<navigator hover-class='none' class="flex padding bg-white padding-tb-sm" style="width: 100%;" :url="'/pages/home/gongying/detail?supply_id='+item.id" navigateTo>
				<view class="flex-sub u-skeleton-fillet">
					<image :src="http.resourceUrl()+item.img" mode="aspectFill" style="width: 234rpx;height: 214rpx;border-radius: 15rpx;"></image>
				</view>
				<view class="margin-left flex-twice">
					<view class="flex align-center justify-between margin-top u-skeleton-fillet">
						<view class="flex align-center">
							<view class="text-black text-lg text-bold u-skeleton-fillet" style="white-space: nowrap;">{{item.title}}</view>
							<view v-if="item.usage_type==1" class="bg-green margin-left text-center radius text-sm u-skeleton-fillet" style="width: 80rpx;">工程</view>
							<view v-else class="bg-green margin-left text-center radius text-sm u-skeleton-fillet" style="width: 80rpx;">家庭</view>
						</view>
						<view class="text-sm u-skeleton-fillet" style="white-space: nowrap;">{{item.time}}</view>
					</view>
					<view class="flex align-center margin-top-sm u-skeleton-fillet">
						<view class="money">{{item.price}}<text>{{item.unit}}</text></view>
						<view class="margin-left">{{item.view_count}}人查看</view>
					</view>
					<view class="margin-top-sm u-skeleton-fillet">
						<text v-if="item.person_auth==1" class="bg-blue margin-right-xs">企</text>
						<text v-if="item.enterprise_auth==1" class="bg-green margin-right-xs">实</text>
						{{item.area}}</view>
				</view>
			</navigator>
		</view>
		<!-- 求购列表 -->
		<view v-if="TabCur==1" v-for="(item,i) in QGlist" :key="i">
			<navigator hover-class='none' class="flex padding bg-white padding-tb-sm solid-bottom" style="width: 100%;" :url="'/pages/mine/QiuGou/detail?want_id='+item.id" navigateTo>
				<view class="margin-left flex-twice">
					<view class="flex align-center justify-between margin-top">
						<view class="text-black text-lg">{{item.title}}</view>
						<view>{{item.time}}</view>
					</view>
					<view class="flex align-center margin-top-sm">求购数量：{{item.count}}株 | {{item.deadline}}截至</view>
					<view class="flex align-center margin-top-sm">求购地区：{{item.area}}</view>
					<view class="margin-top-sm flex justify-between">
						<view>
							<text v-if="item.person_auth==1" class="bg-blue margin-right-xs" style="padding: 4rpx;">企</text>
							<text v-if="item.enterprise_auth==1" class="bg-green margin-right-xs" style="padding: 4rpx;">实</text>
							<text class="text-gray">{{item.offer_count}}个报价</text>
						</view>
						<button class="cu-btn line-green sm" @click.stop="toOffer(item.id)">去报价</button>
					</view>
				</view>
			</navigator>
		</view>
		<!-- 底部导航栏Tabbar -->
		<view class="cu-tabbar-height"></view>
		<!--引用组件-->
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
	import uSkeleton from "@/components/u-skeleton/u-skeleton";
	const QQMapWX = require('@/libs/qqmap-wx-jssdk.min.js');
	export default {
		components:{
			uSkeleton
		},
		created() {
			setTimeout(()=>{
				this.qqmapsdk = new QQMapWX({
					key: this.key
				});
				this.getLocation();
			},100)
			this.getHomeInfo();
			this.getGYlist(1);
			this.getQGList(1);
		},
		mounted() {
			var _this=this;
			uni.$on('onPullDownRefresh',function(data){
				if(data.onPullDownRefresh){
					_this.GYlist=[];
					_this.QGlist=[];
					_this.getGYlist(1);
					_this.getQGList(1);
					uni.$off('onPullDownRefresh');
				}
			});
			uni.$on('onReachBottom',function(data){
				if(data.onReachBottom){
					if(_this.TabCur==0&&_this.GYcurrent_page<_this.GYlast_page){
						_this.GYcurrent_page++
						_this.getGYlist(_this.GYcurrent_page);
					}
					if(_this.TabCur==1&&_this.QGcurrent_page<_this.QGlast_page){
						_this.QGcurrent_page++
						_this.getQGList(_this.QGcurrent_page);
					}
					uni.$off('onReachBottom');
				}
			});
		},
		data() {
			return {
				loading:true,
				scrollTop:0,
				skeletonShow:true,
				
				qqmapsdk:null,
				address:null,
				key: 'JTHBZ-TMF32-BERUV-CBXUN-NWI2K-QTFMX',
				
				/* 轮播图列表 */
				swiperList: [],
				/* 分类列表 */
				categoryList:[{
					title:'工程供应',
					url:'/pages/home/gongying/gongying?title=工程供应'
				},{
					title:'家庭供应',
					url:'/pages/home/gongying/gongying?title=家庭供应'
				},{
					title:'求购大厅',
					url:'/pages/home/gongying/gongying?title=求购大厅'
				},{
					title:'地图找苗',
					url:'/pages/home/map/map'
				},{
					title:'苗木课堂',
					url:'/pages/home/class/class'
				}],
				/* 苗科列表 */
				botanyList:[{
					title:'工程小苗',
					img:'../../static/logo.png',
					url:'/pages/home/gongying/gongying'
				},{
					title:'容器苗',
					img:'../../static/logo.png',
				},{
					title:'造型树',
					img:'../../static/logo.png',
				},{
					title:'水生植物',
					img:'../../static/logo.png',
				},{
					title:'资材',
					img:'../../static/logo.png',
				},{
					title:'草坪草种',
					img:'../../static/logo.png',
				},{
					title:'地被花草',
					img:'../../static/logo.png',
				},{
					title:'绿植',
					img:'../../static/logo.png',
				},],
				/* 供应大厅和求购大厅 */
				scrollInto:'',
				TabCur: 0,
				TabList:[{
					tabindex:0,
					TabName:'供应大厅'
				},{
					tabindex:1,
					TabName:'求购大厅'
				}],
				GYlist:[],
				QGlist:[],
				GYcurrent_page:'',
				GYlast_page:'',
				QGcurrent_page:'',
				QGlast_page:''
			}
		},
		methods: {
			getLocation(){
				uni.getLocation({
					type: 'gcj02',
					success: (res) => {
						console.log(res)
						uni.setStorageSync('longitude',res.longitude);
						uni.setStorageSync('latitude',res.latitude);
						this.getAddress(res.longitude, res.latitude)
					}
				})
			},
			getAddress: function(lng, lat) {
				//根据经纬度获取地址信息
				this.qqmapsdk.reverseGeocoder({
					location: {
						latitude: lat,
						longitude: lng
					},
					success: (res) => {
						this.address = res.result.address_component.district;
					},
					fail: (res) => {
						this.address = "获取位置信息失败"
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
			getHomeInfo(){
				this.http.get('index/getIndex',{},false).then((res)=>{
					if(res.code==1000){
						this.swiperList=res.data.banners;
						this.categoryList=res.data.navs;
						this.botanyList=res.data.categories;
						this.loading=false;
					}
				})
			},
			getGYlist(page){
				this.http.get('supply/getList',{
					page:page,
					breed_id:0,
					area_id:0,
					cate_id:0,
					size:''
				}).then((res)=>{
					if(res.code==1000){
						if(this.GYlist.length==0){
							this.GYlist=res.data.data;
							this.GYcurrent_page=res.data.current_page;
							this.GYlast_page=res.data.last_page;
						}else{
							this.GYlist=this.GYlist.concat(res.data.data)
						}
					}
				})
			},
			getQGList(page){
				this.http.get('want/getList',{
					page:page,
					breed_id:0,
					area_id:0,
					size:''
				}).then((res)=>{
					if(res.code==1000){
						if(this.QGlist.length==0){
							this.QGlist=res.data.data;
							this.QGcurrent_page=res.data.current_page;
							this.QGlast_page=res.data.last_page;
						}else{
							this.QGlist=this.QGlist.concat(res.data.data)
						}
					}
				})
			},
			/* 导航栏切换 */
			tabSelect(item) {
				this.TabCur=item.tabindex;
				this.scrollInto='tab'+item.tabindex;
			},
			/* 报价 */
			toOffer(id){
				uni.navigateTo({url: '/pages/home/offer/offer?want_id='+id});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.Tabcur{
		border-bottom: solid #00913A 4upx;
	}
	.money{
		font-size: 40rpx;
		color: #FA7F43;
		text{
			font-size: 32rpx;
		}
	}
</style>
