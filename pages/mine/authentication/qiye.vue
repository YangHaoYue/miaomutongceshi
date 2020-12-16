<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true"><block slot="backText">企业认证</block></cu-custom>
		<view class="cu-form-group margin-lr-xl padding-lr" style="padding-bottom: 42upx;flex-direction: column;">
			<view class="grid-square flex-sub margin-top-xl">
				<view class="personCamera" v-for="(item,index) in RimgList" :key="index" @tap="ViewImage('R')" :data-url="RimgList[index]">
				 <image :src="RimgList[index]" mode="aspectFill"></image>
					<view class="cu-tag bg-oyellow" @tap.stop="DelImg('R')" :data-index="index">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<view class="personCamera" @tap="ChooseImage('R')" v-if="RimgList.length<1">
					<view class="img"><image src="../../../static/mine/renzheng/yingyezhizhao.png" mode="aspectFit"></image></view>
				</view>
			</view>
		</view>
		
		<button class="cu-btn bg-green logobtn round" @tap="apply">确认提交</button>
	</view>
</template>

<script>
	export default {
		onLoad() {
			/* this.getImageInfo(); */
		},
		data() {
			return {
				ResourcesUrl:'',
				
				RimgList: [],
				GimgList: [],
				id_card_imgs:[]
			}
		},
		methods: {
			getImageInfo(){
				let IDCardImg=uni.getStorageSync('id_card_img');
				if(IDCardImg!=''&&IDCardImg!=null){
					this.LogoimgList.push(Url.ResourcesUrl+IDCardImg)
				}
			},
			ChooseImage(e) {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						switch (e) {
							case 'R':
								this.RimgList = res.tempFilePaths
								this.id_card_imgsUpload(res.tempFilePaths[0],0)
								break;
							case 'G':
								this.GimgList = res.tempFilePaths
								this.id_card_imgsUpload(res.tempFilePaths[0],1)
								break;
								return;
						}
					}
				});
			},
			id_card_imgsUpload(tempFilePaths,e){
				let token=uni.getStorageSync('token');
				uni.uploadFile({
					url:Url.websiteUrl+'common/uploader',
					fileType:'image',
					filePath:tempFilePaths,
					name:'file',
					header: {Authorization:'Bearer ' + token},
					success: (res) => {
						uni.showToast({
							icon:'none',
							title: JSON.parse(res.data).msg
						});
						this.id_card_imgs[e]=JSON.parse(res.data).data
					},
					fail: () => {
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList
				});
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
			apply(){
				let token=uni.getStorageSync('token');
				uni.request({
					url: Url.websiteUrl+'identify/idMessage',
					method: 'POST',
					header: {Authorization:'Bearer ' + token},
					data: {
						real_name:this.name,
						id_card:this.IDcard,
						id_card_img:this.id_card_imgs[0],
						id_card_back_img:this.id_card_imgs[1],
					},
					success: res => {
						uni.showToast({
							icon:'none',
							title: res.data.msg
						});
						if(res.data.code==1000){
							setTimeout(()=>{
								uni.navigateBack({
									delta: 1
								});
							},1500)
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #FFFFFF;
		height: 100vh;
	}
	.logobtn{
		width: 650upx;
		height: 88upx;
		margin: 0 50upx;
		position: fixed;
		bottom: 180upx;
	}
	.personCamera{
		width: 536rpx;
		height: 346rpx;
		border-radius: 15rpx;
		border: 1rpx solid #DDDDDD;
		margin: auto 13rpx;
		image{
			width: 536rpx;
			height: 346rpx;
			border-radius: 15rpx;
		}
		.cu-tag{
			position: relative;
			bottom: 70upx;
			left: 80%;
			border-radius: 15upx;
		}
		.img{
			width: 536rpx;
			height: 346rpx;
			image{
				width: 536rpx;
				height: 346rpx;
			}
		}
		.text{
			font-size: 30upx;
			color: #999999;
			text-align: center;
		}
	}
</style>
