<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true"><block slot="backText">编辑我的苗店</block></cu-custom>
		<view>
			<view class="bg-white flex justify-between padding align-center">
				<view class="flex align-center">
					<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)"></view>
					<view class="margin-left-sm">修改头像</view>
				</view>
			</view>
			<form>
				<view class="cu-form-group">
					<view class="title">店铺名称</view>
					<input placeholder="青雉" name="input"></input>
					<text class='cuIcon-right text-gray'></text>
				</view>
				<view class="cu-form-group">
					<view class="title">手机号</view>
					<input placeholder="输入框带个图标" name="input"></input>
					<text class='cuIcon-right text-gray'></text>
				</view>
				<view class="cu-form-group">
					<view class="title">所在地</view>
					<input placeholder="输入框带个图标" name="input"></input>
					<text class='cuIcon-right text-gray'></text>
				</view>
				<view class="cu-form-group">
					<view class="title">公司</view>
					<input placeholder="输入框带个图标" name="input"></input>
					<text class='cuIcon-right text-gray'></text>
				</view>
				<view class="cu-form-group">
					<view class="title">公司</view>
					<input placeholder="输入框带个图标" name="input"></input>
					<text class='cuIcon-right text-gray'></text>
				</view>
				<view class="cu-bar bg-white">
					<view class="action">
						二维码上传
					</view>
				</view>
				<view class="cu-form-group">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
						 <image :src="imgList[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="ChooseImage" v-if="imgList.length<1">
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
	export default {
		data() {
			return {
				imgList: [],
			}
		},
		methods: {
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				this.imgList.splice(e.currentTarget.dataset.index, 1)
			},
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
