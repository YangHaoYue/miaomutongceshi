<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true"><block slot="backText">立即报价</block></cu-custom>
		<view class="cu-list menu-avatar">
			<view class="cu-item">
				<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
				<view class="content">
					<view class="text-black text-lg"><view class="text-cut">李玉龙<text class="bg-blue margin-right-xs radius margin-left-sm">企</text></view></view>
					<view class="text-gray text-sm flex"> <view class="text-cut">正在采购120厘米六道木</view></view>
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
						<view class="flex-sub padding-tb-sm text-center solid-right" style="border-radius: 15rpx 0 0 15rpx;" :class="Cur=='上车价'?'bg-green':''" @click="Change" data-cur="上车价">上车价</view>
						<view class="flex-sub padding-tb-sm text-center" style="border-radius:0 15rpx 15rpx 0;" :class="Cur=='到货价'?'bg-green':''" @click="Change" data-cur="到货价">到货价</view>
					</view>
					<view class="solid flex padding-lr padding-tb-sm justify-between" style="border-radius: 25rpx;">
						<input placeholder="请输入供货价格" />
						<text>元/株</text>
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
				添加图片或视频(最多9张)
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
				<view class="solids" @tap="ChooseImage" v-if="imgList.length<9">
					<text class='cuIcon-cameraadd'></text>
				</view>
			</view>
		</view>
		<button class="cu-btn bg-green logobtn " @tap="apply">确认报价</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				/* 上车到货 */
				Cur:'上车价',
				region: [],
				imgList:[]
			}
		},
		methods: {
			/* 选择上车到货 */
			Change(e) {
				if (e.currentTarget.dataset.cur == this.Cur) {
					this.Cur = '';
				} else {
					this.Cur = e.currentTarget.dataset.cur;
				}
			},
			/* 地址选择 */
			RegionChange(e) {
				console.log(e)
				this.region = e.detail.value
			},
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
			apply(){
				
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
