<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true"><block slot="backText">发供应</block></cu-custom>
		<form>
			<view class="flex align-center">
				<view class="title bg-gray text-center flex-sub padding margin-right-sm">货品名称</view>
				<input class="flex-treble" style="font-size: 32rpx;" v-model="name" disabled="true" name="input"></input>
			</view>
			<view class="flex align-center">
				<view class="title bg-gray text-center flex-sub padding margin-right-sm">货品规格</view>
				<input class="flex-treble" style="font-size: 32rpx;" disabled="true" @tap="toGuiGe" v-model="screen" placeholder="请选择货品规格" name="input"></input>
			</view>
			<view class="flex align-center">
				<view class="title bg-gray text-center flex-sub padding margin-right-sm">供品数量</view>
				<view class="flex-treble flex justify-between">
					<input class="flex-treble" style="font-size: 32rpx;" type="number" placeholder="求购数量" name="input"></input>
					<picker class="flex-sub" @change="PickerChange" :value="index" :range="picker">
						<view class="flex align-center justify-end" style="font-size: 32rpx;">
							{{picker[index]}}<text class="cuIcon-triangledownfill" style="font-size: 48rpx;"></text>
						</view>
					</picker>
				</view>
			</view>
			<view class="flex align-center">
				<view class="title bg-gray text-center flex-sub padding margin-right-sm">求购地区</view>
				<picker class="flex-treble" mode="region" @change="RegionChange" :value="region">
					<view class="picker">
						{{region[0]}}-{{region[1]}}-{{region[2]}}
					</view>
				</picker>
			</view>
			<view class="flex align-center">
				<view class="title bg-gray text-center flex-sub padding margin-right-sm">心理价位</view>
				<view class="flex-treble">
					<view class="flex justify-between align-center">
						<view class="flex-treble flex solid padding-xs">
							<input name="input" v-model="min" type="number" />
						</view>
						<text>-</text>
						<view class="flex-treble flex solid padding-xs">
							<input name="input" v-model="max" type="number" />
						</view>
						<text class=" text-lg text-gray" style="white-space: nowrap;">元/株</text>
					</view>
					<view class="text-gray text-sm">心理价位卖家看不到，仅帮您筛选供应商</view>
				</view>
			</view>
			<view class="cu-bar bg-white">
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
			<view class="flex align-center">
				<view class="title bg-gray text-center flex-sub padding margin-right-sm">截止日期</view>
				<picker class="flex-treble" mode="date" :value="date" start="2015-09-01" end="2100-09-01" @change="DateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			<view class="flex align-center">
				<view class="title bg-gray text-center flex-sub padding margin-right-sm">收货地区</view>
				<picker class="flex-treble" mode="region" @change="RegionChange" :value="region">
					<view class="picker">
						{{region[0]}}-{{region[1]}}-{{region[2]}}
					</view>
				</picker>
			</view>
			<view class="flex align-center">
				<view class="title bg-gray text-center flex-sub padding margin-right-sm">货品说明</view>
				<input class="flex-treble" style="font-size: 32rpx;" placeholder="请填写货品特色，种植情况等" name="input"></input>
			</view>
		</form>
		<button class="cu-btn bg-green logobtn " @tap="apply">确认发布</button>
	</view>
</template>

<script>
	export default {
		onLoad(e) {
			this.name=e.name
		},
		onShow() {
			var _this=this;
			uni.$on('QGScreenChange',function(data){
				_this.screen=data.screen;
			});
			
		},
		data() {
			return {
				name:'',
				screen:'',
				index: 0,
				picker: ['株','棵','例','斤','公斤'],
				radio: 'A',
				region: ['广东省', '广州市', '海珠区'],
				imgList:[],
				date: '2018-12-25',
			}
		},
		methods: {
			/* 单位选择 */
			PickerChange(e) {
				this.index = e.detail.value;
			},
			/* 规格选择 */
			toGuiGe(){
				uni.navigateTo({url: 'QGscreen'});
			},
			/* 单项选择 */
			RadioChange(e) {
				console.log(e)
				this.radio = e.detail.value
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
			/* 日期选择 */
			DateChange(e) {
				this.date = e.detail.value
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
		z-index: 999;
	}
</style>
