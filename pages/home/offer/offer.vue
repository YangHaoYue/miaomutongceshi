<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true"><block slot="backText">立即报价</block></cu-custom>
		<view class="cu-list menu-avatar">
			<view class="cu-item">
				<view class="cu-avatar round lg">
					<image class="cu-avatar round lg" :src="user.avatar"></image>
				</view>
				<view class="content">
					<view class="text-black text-lg">
						<view class="text-cut">{{user.nickname}}
						<text v-if="user.enterprise_auth==1" class="bg-blue margin-right-xs radius margin-left-sm" style="padding: 4rpx;">企</text>
						<text v-if="user.person_auth==1" class="bg-green margin-right-xs radius margin-left-sm" style="padding: 4rpx;">实</text>
						</view>
					</view>
					<view class="text-gray text-sm flex"> <view class="text-cut">正在采购{{breed}}</view></view>
				</view>
			</view>
		</view>
		<!-- 我的报价 -->
		<view class="margin-top bg-white padding">
			<view class="flex align-center">
				<view class="padding text-center flex-sub">
					我的报价<text class="text-red">*</text>
				</view>
				<view class="flex-treble">
					<view class="solid flex justify-center margin-bottom-sm" style="border-radius: 25rpx;">
						<view class="flex-sub padding-tb-sm text-center solid-right" style="border-radius: 15rpx 0 0 15rpx;" :class="Cur=='上车价'?'bg-green':''" @click="Change($event,0)" data-cur="上车价">上车价</view>
						<view class="flex-sub padding-tb-sm text-center" style="border-radius:0 15rpx 15rpx 0;" :class="Cur=='到货价'?'bg-green':''" @click="Change($event,1)" data-cur="到货价">到货价</view>
					</view>
					<view class="solid flex padding-lr padding-tb-sm justify-between" style="border-radius: 25rpx;">
						<input placeholder="请输入供货价格" v-model="price" />
						<text>{{unit}}</text>
					</view>
				</view>
			</view>
			<view class="flex align-center margin-top-sm">
				<view class="padding text-center flex-sub">
					供货地区<text class="text-red">*</text>
				</view>
				<view class="flex-treble">
					<view class="solid flex padding-lr padding-tb-sm justify-between flex-treble" style="border-radius: 25rpx;">
						<picker class="padding-tb-xs" mode="region" @change="RegionChange" :value="region">
							<view class="picker" v-if="region.length!=0">
								{{region[0]}}-{{region[1]}}-{{region[2]}}
							</view>
							<view class="picker" style="color: #808080;" v-else>
								请选择供货地区
							</view>
						</picker>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				图片上传
			</view>
			<view class="action">
				添加图片(最多9张)
			</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage(item.tempFilePath)" :data-url="imgList[index].tempFilePath">
				 <image :src="item.tempFilePath" mode="aspectFill" v-if="item.fileType=='image'"></image>
				 <image :src="item.thumbTempFilePath" mode="aspectFill" v-if="item.fileType=='video'"></image>
				 <!-- <video :src="item.tempFilePath" muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.fileType=='video'"></video> -->
					<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<view class="solids" @tap="chooseMedia" v-if="imgList.length<9">
					<text class='cuIcon-cameraadd'></text>
				</view>
			</view>
		</view>
		<button class="cu-btn bg-green logobtn " @tap="apply">确认报价</button>
	</view>
</template>

<script>
	export default {
		onLoad(e) {
			this.want_id=e.want_id;
			this.getInfo()
		},
		data() {
			return {
				user:'',
				unit:'',
				breed:'',
				price:'',
				/* 上车到货 */
				Cur:'上车价',
				index:0,
				area_id:110101,
				region: ['北京市', '北京市', '东城区'],
				imgList:[],
				resource:[]
			}
		},
		methods: {
			getInfo(){
				this.http.post('want/getOfferDetail',{
					want_id:this.want_id
				}).then((res)=>{
					if(res.code==1000){
						this.user=res.data.user;
						this.unit=res.data.unit;
						this.breed=res.data.breed;
					}
				})
			},
			/* 选择上车到货 */
			Change(e,i) {
				this.Cur = e.currentTarget.dataset.cur;
				this.index=i;
			},
			/* 地址选择 */
			RegionChange(e) {
				this.region = e.detail.value;
				this.area_id=e.detail.code[2];
			},
			chooseMedia() {
				uni.chooseMedia({
					count: 9,
					mediaType: ['image'],//['image','video'],
					sourceType: ['album', 'camera'],
					maxDuration: 10,
					camera: 'back',
					success:(res)=>{
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFiles);
							for(let item of res.tempFiles){
								this.http.uploadFile('files/fileUploader',item.tempFilePath,item.fileType).then((res)=>{
									this.resource.push(res.path);
								})
							}
						} else {
							this.imgList = res.tempFiles;
							for(let item of res.tempFiles){
								this.http.uploadFile('files/fileUploader',item.tempFilePath,item.fileType).then((res)=>{
									this.resource.push(res.path);
								})
							}
						}
					}
				})
			},
			ViewImage(e) {
				uni.previewImage({
					urls: [e]
				});
			},
			DelImg(e) {
				this.imgList.splice(e.currentTarget.dataset.index, 1);
				this.resource.splice(e.currentTarget.dataset.index, 1)
			},
			apply(){
				this.http.post('want/publishWantOffer',{
					want_id:this.want_id,
					type:this.index,
					price:this.price,
					area_id:this.area_id,
					img:this.resource
				}).then((res)=>{
					if(res.code==1000){
						this.http.toast(res.msg);
						setTimeout(()=>{uni.navigateBack({
							delta: 1
						});},1000)
					}
				})
			}
		}
	}
</script>

<style>
	.logobtn{
		width: 100%;
		height: 88upx;
		position: fixed;
		bottom: 0upx;
		border-radius: 0;
		z-index: 999;
	}
</style>
