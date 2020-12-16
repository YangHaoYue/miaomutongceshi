<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true"><block slot="backText">{{title}}</block></cu-custom>
		<!-- 搜索 -->
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input :adjust-position="false" type="text" placeholder="搜索供应" confirm-type="search"></input>
			</view>
		</view>
		<!-- 三级联动 -->
		<view class="flex justify-around bg-white padding" :class="isScreenChange?'solid-bottom':'margin-bottom'">
			<view class="flex-sub text-center">
				<picker mode="region" @change="RegionChange" :value="region">
					地区<text class="cuIcon-unfold"></text>
				</picker>
			</view>
			<view class="flex-sub text-center">
				<picker mode="multiSelector" @change="MultiChange" @columnchange="MultiColumnChange" :value="multiIndex" :range="multiArray">
					品类<text class="cuIcon-unfold"></text>
				</picker>
			</view>
			<view class="flex-sub text-center" @tap="toScreen">筛选<text class="cuIcon-unfold"></text></view>
		</view>
		<!-- 主产区 -->
		<view class="bg-white margin-bottom padding-top-xs" v-if="isScreenChange">
			<view class="text-center text-gray">-主产区-</view>
			<view class="flex padding-lr padding-tb-sm">
				<view class="cu-btn round margin-right-sm" :class="whichCity==id?'bg-green':'bg-nomal'" @tap="chooseCity(id)" style="width: 160rpx;" v-for="(item,id) in cityList" :key="id">
					{{item}}
				</view>
			</view>
		</view>
		<!-- 列表 -->
		<view class="flex padding bg-white padding-tb-sm" style="width: 100%;" v-for="i in 5" :key="i" @tap="toDetail">
			<view class="flex-sub ">
				<image src="../../../static/logo.png" mode="aspectFit" style="width: 234rpx;height: 214rpx;"></image>
			</view>
			<view class="margin-left flex-twice">
				<view class="flex align-center justify-between margin-top ">
					<view class="flex align-center">
						<view class="text-black text-lg text-bold">樱花</view>
						<view class="bg-green margin-left text-center radius text-sm" style="width: 80rpx;">工程</view>
					</view>
					<view>五分钟前</view>
				</view>
				<view class="flex align-center margin-top-sm">
					<view class="money">100.00<text>元/株</text></view>
					<view class="margin-left">1213人查看</view>
				</view>
				<view class="margin-top-sm"><text class="bg-blue margin-right-xs">企 </text> 江苏省徐州市</view>
			</view>
		</view>
		<!-- 发布悬浮按钮 -->
		<view class="flex align-center justify-center round float_fabu padding-sm" @tap="showModal">
			<text class="text-center">发布</text>
		</view>
		<!-- 发布弹窗 -->
		<view class="cu-modal bottom-modal" @tap="hideModal" :class="modalName=='bottomModal'?'show':''">
			<view class="cu-dialog">
				<view class="padding-xl bg-white flex justify-around">
					<view class="" v-for="(item,index) in btnList" :key="index" @tap.stop="toRelease(index)">
						<view style="width: 90rpx;height: 90rpx;margin: auto;">
							<image :src="item.img" mode="aspectFit" style="width: 90rpx;height: 90rpx;"></image>
						</view>
						<text>{{item.title}}</text>
					</view>
				</view>
				<view class="cu-bar bg-white justify-center">
					<text class="cuIcon-close text-bold" @tap.stop="hideModal" style="font-size: 32upx;"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(e) {
			this.title=e.title
		},
		onShow() {
			var _this=this;
			uni.$on('ScreenChange',function(data){
				_this.isScreenChange=data.isScreenChange;
				_this.cityList=data.cityList;
			});
			console.log(this.isScreenChange)
		},
		data() {
			return {
				title:'',
				region: ['北京市', '北京市', '东城区'],
				multiArray: [
					['无脊柱动物', '脊柱动物'],
					['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物']
				],
				multiIndex: [0, 0],
				//是否对列表进行筛选
				isScreenChange:false,
				//主产区列表
				cityList:[],
				whichCity:-1,
				
				modalName:'',
				btnList:[{
					title:'发布供应',
					img:'../../../static/home/category/gongcheng.png'
				},{
					title:'发布求购',
					img:'../../../static/home/category/qiugou.png'
				}]
			}
		},
		methods: {
			/* 地区选择 */
			RegionChange(e) {
				console.log(e.detail)
				this.region = e.detail.value
			},
			/* 品类选择 */
			MultiChange(e) {
				console.log(e.detail)
				this.multiIndex = e.detail.value
			},
			MultiColumnChange(e) {
				//column 的值表示改变了第几列（下标从0开始），value 的值表示变更值的下标
				console.log(e.detail)
			},
			/* 筛选 */
			toScreen(){
				uni.navigateTo({url: 'screen'});
			},
			/* 选择主产区 */
			chooseCity(id){
				console.log(id)
				if (this.whichCity == id) {
					this.whichCity = -1;
				} else {
					this.whichCity=id;
				}
			},
			/* 详情 */
			toDetail(){
				uni.navigateTo({url: 'detail'});
			},
			/* 发布弹窗 */
			showModal(){
				this.modalName='bottomModal';
			},
			hideModal(){
				this.modalName=null;
			},
			/* 发布 */
			toRelease(index){
				uni.navigateTo({url: '../../release/release?index='+index});
			}
		}
	}
</script>

<style scoped>
	.float_fabu{
		position: fixed;
		bottom: 120rpx;
		right: 50rpx;
		height: 100rpx;
		width: 100rpx;
		background-color: #00913A;
		color: #FFFFFF;
		box-shadow:2px 2px 3px gray;
	}
	.bg-nomal{
		background-color: #F7F7F7;
		color: #A9A9A9;
	}
</style>
