<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true"><block slot="backText">实名认证</block></cu-custom>
		<view class="cu-form-group margin-lr-xl padding-lr" style="padding-bottom: 42upx;flex-direction: column;">
			<view class="grid-square flex-sub margin-top-xl">
				<view class="personCamera" v-for="(item,index) in RimgList" :key="index" @tap="ViewImage('R')" :data-url="RimgList[index]">
				 <image :src="RimgList[index]" mode="aspectFill"></image>
					<view class="cu-tag bg-oyellow" @tap.stop="DelImg('R')" :data-index="index">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<view class="personCamera" @tap="ChooseImage('R')" v-if="RimgList.length<1">
					<view class="img"><image src="../../../static/mine/renzheng/shenfen_on.png" mode="aspectFit"></image></view>
				</view>
			</view>
			<view class="grid-square flex-sub margin-top">
				<view class="personCamera" v-for="(item,index) in GimgList" :key="index" @tap="ViewImage('G')" :data-url="GimgList[index]">
				 <image :src="GimgList[index]" mode="aspectFill"></image>
					<view class="cu-tag bg-oyellow" @tap.stop="DelImg('G')" :data-index="index">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<view class="personCamera" @tap="ChooseImage('G')" v-if="GimgList.length<1">
					<view class="img"><image src="../../../static/mine/renzheng/shenfen_off.png" mode="aspectFit"></image></view>
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
				this.http.uploadFile('files/fileUploader',tempFilePaths).then((res)=>{
					this.id_card_imgs[e]=res.path;
				})
			},
			ViewImage(e) {
				switch (e) {
					case 'R':
						uni.previewImage({urls: this.RimgList});
						break;
					case 'G':
						uni.previewImage({urls: this.GimgList});
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
			apply(){
				this.http.get('authenticate/setPersonAuthImg',{
					front:this.id_card_imgs[0],
					back:this.id_card_imgs[1]
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
			border: 1rpx solid #DDDDDD;
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
