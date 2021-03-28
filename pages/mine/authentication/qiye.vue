<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true"><block slot="backText">企业认证</block></cu-custom>
		<view class="cu-form-group margin-lr-xl padding-lr" style="padding-bottom: 42upx;flex-direction: column;">
			<view class="grid-square flex-sub margin-top-xl">
				<view class="personCamera" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
				 <image :src="imgList[index]" mode="aspectFill"></image>
					<view class="cu-tag bg-oyellow" @tap.stop="DelImg" :data-index="index">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<view class="personCamera" @tap="ChooseImage('R')" v-if="imgList.length<1">
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
		},
		data() {
			return {
				imgList: [],
				id_card_imgs:[]
			}
		},
		methods: {
			ChooseImage(e) {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						this.imgList = res.tempFilePaths;
						this.id_card_imgsUpload(res.tempFilePaths[0])
					}
				});
			},
			id_card_imgsUpload(tempFilePaths){
				this.http.uploadFile('files/fileUploader',tempFilePaths).then((res)=>{
					this.id_card_imgs[0]=res.path;
				})
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList
				});
			},
			DelImg() {
				this.imgList.splice(0, 1)
				this.id_card_imgs.splice(0,1)
			},
			apply(){
				this.http.get('authenticate/setEnterpriseAuthImg',{
					path:this.id_card_imgs[0]
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
