<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true"><block slot="backText">编辑我的苗店</block></cu-custom>
		<view>
			<view class="bg-white flex justify-between padding align-center">
				<view class="flex align-center">
					<view class="cu-avatar round lg">
						<image class="cu-avatar round lg" :src="http.resourceUrl()+RimgList[0]" @tap="ViewImage('R')"></image>
					</view>
					<view class="margin-left-sm" @tap="ChooseImage('R')">修改头像</view>
				</view>
			</view>
			<form>
				<view class="cu-form-group">
					<view class="title" style="width: 150rpx;">店铺名称</view>
					<input placeholder="请输入店铺名称" v-model="storeInfo.name" name="input"></input>
					<text class='cuIcon-right text-gray'></text>
				</view>
				<view class="cu-form-group">
					<view class="title" style="width: 150rpx;">手机号</view>
					<input placeholder="请输入手机号" type="number" v-model="storeInfo.mobile" name="input"></input>
					<text class='cuIcon-right text-gray'></text>
				</view>
				<view class="cu-form-group">
					<view class="title" style="width: 150rpx;">所在地</view>
					<input placeholder="请选择所在地" v-model="storeInfo.address" disabled="true" @click="chooseLocation" name="input"></input>
					<text class='cuIcon-right text-gray'></text>
				</view>
				<!-- <view class="cu-form-group">
					<view class="title">公司</view>
					<input placeholder="请输入公司名称" v-model="storeInfo.business" name="input"></input>
					<text class='cuIcon-right text-gray'></text>
				</view> -->
				<view class="cu-form-group">
					<view class="title" style="width: 150rpx;">公司介绍</view>
					<input placeholder="请输入公司名称" v-model="storeInfo.enterprise_intro" name="input"></input>
					<text class='cuIcon-right text-gray'></text>
				</view>
				<view class="cu-form-group">
					<view class="title" style="width: 150rpx;">主营</view>
					<input placeholder="请输入主营" v-model="storeInfo.business" name="input"></input>
					<text class='cuIcon-right text-gray'></text>
				</view>
				<view class="cu-bar bg-white">
					<view class="action">
						二维码上传
					</view>
				</view>
				<view class="cu-form-group">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in GimgList" :key="index" @tap="ViewImage('G')" :data-url="GimgList[index]">
						 <image :src="http.resourceUrl()+GimgList[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg('G')" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="ChooseImage('G')" v-if="GimgList.length<1">
							<text class='cuIcon-cameraadd'></text>
						</view>
					</view>
				</view>
			</form>
			<button class="cu-btn bg-green logobtn " @tap="apply">保存</button>
		</view>
	</view>
</template>

<script>
	const QQMapWX = require('@/libs/qqmap-wx-jssdk.min.js');
	export default {
		onLoad() {
			this.getStoreInfo();
			this.qqmapsdk = new QQMapWX({
				key: this.key
			});
		},
		data() {
			return {
				qqmapsdk:null,
				key: 'JTHBZ-TMF32-BERUV-CBXUN-NWI2K-QTFMX',
				
				storeInfo:'',
				RimgList: [],
				GimgList: [],
				id_card_imgs:[]
			}
		},
		methods: {
			getStoreInfo(){
				this.http.get('user/getStoreInfo').then((res)=>{
					if(res.code==1000){
						this.storeInfo=res.data;
						if(res.data.qrcode_img){
							this.GimgList[0]=res.data.qrcode_img;
						}
						this.RimgList[0]=res.data.head_img;
					}
				})
			},
			ChooseImage(e) {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						switch (e) {
							case 'R':
								this.http.uploadFile('files/fileUploader',res.tempFilePaths[0]).then((res)=>{
									this.RimgList[0] = res.path
									this.id_card_imgs[0]=res.path;
									this.$forceUpdate();
								})
								break;
							case 'G':
								this.http.uploadFile('files/fileUploader',res.tempFilePaths[0]).then((res)=>{
									this.GimgList[0] = res.path
									this.id_card_imgs[1]=res.path;
									this.$forceUpdate();
								})
								break;
								return;
						}
					}
				});
			},
			ViewImage(e) {
				switch (e) {
					case 'R':
						uni.previewImage({urls: [this.http.resourceUrl()+this.RimgList[0]]});
						break;
					case 'G':
						uni.previewImage({urls: [this.http.resourceUrl()+this.GimgList[0]]});
						break;
						return;
				}
			},
			DelImg(e) {
				switch (e) {
					case 'R':
						this.RimgList.splice(0, 1)
						this.id_card_imgs.splice(0,1)
						break;
					case 'G':
						this.GimgList.splice(0, 1)
						this.id_card_imgs.splice(1,1)
						break;
					default:
						return;
				}
			},
			chooseLocation(){
				uni.chooseLocation({
					success: (res) => {
						//根据经纬度获取地址信息
						this.qqmapsdk.reverseGeocoder({
							location: {
								latitude: res.latitude,
								longitude: res.longitude
							},
							success: (rej) => {
								console.log(rej)
								this.http.post('user/editStorePosition',{
									latitude: res.latitude,
									longitude: res.longitude,
									adcode:rej.result.ad_info.adcode,
									address:rej.result.address
								}).then((res)=>{
									this.http.toast(res.msg);
									if(res.code==1000){
										this.storeInfo.address=rej.result.address
									}
								})
							},
							fail: (res) => {
								this.http.toast("获取位置信息失败");
							}
						})
					}
				})
			},
			apply(){
				this.http.post('user/edit',{
					name:this.storeInfo.name,
					head_img:this.id_card_imgs[0],
					mobile:this.storeInfo.mobile,
					business:this.storeInfo.business,
					enterprise_intro:this.storeInfo.enterprise_intro,
					qrcode_img:this.id_card_imgs[1]
				}).then((res)=>{
					if(res.code==1000){
						this.http.toast(res.msg);
						setTimeout(()=>{uni.navigateBack({delta: 1});},1000)
					}
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #FFFFFF;
		height: 100vh;
	}
	.logobtn{
		width: 100%;
		height: 88upx;
		position: fixed;
		bottom: 0upx;
		border-radius: 0;
	}
</style>
