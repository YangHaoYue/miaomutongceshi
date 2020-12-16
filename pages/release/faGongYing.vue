<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true"><block slot="backText">发供应</block></cu-custom>
		<form>
			<view class="flex align-center">
				<view class="title bg-gray text-center flex-sub padding margin-right-sm">货品名称</view>
				<input class="flex-treble" style="font-size: 32rpx;" v-model="name" name="input"></input>
			</view>
			<view class="flex align-center">
				<view class="title bg-gray text-center flex-sub padding margin-right-sm">货品规格</view>
				<input class="flex-treble" style="font-size: 32rpx;" disabled="true" @tap="toGuiGe" v-model="screen" placeholder="请选择货品规格" name="input"></input>
			</view>
			<view class="flex align-center">
				<view class="title bg-gray text-center flex-sub padding margin-right-sm">货品价格</view>
				<view class="flex-treble flex justify-between">
					<input class="flex-treble" style="font-size: 32rpx;" type="number" placeholder="请输入货品价格" name="input"></input>
					<text class='text-black margin-lr' style="font-size: 32rpx;">元</text>
				</view>
			</view>
			<view class="flex align-center">
				<view class="title bg-gray text-center flex-sub padding margin-right-sm">供品数量</view>
				<view class="flex-treble flex justify-between">
					<input class="flex-treble" style="font-size: 32rpx;" type="number" placeholder="请输入供品数量" name="input"></input>
					<picker class="flex-sub" @change="PickerChange" :value="index" :range="picker">
						<view class="flex align-center justify-end" style="font-size: 32rpx;">
							{{picker[index]}}<text class="cuIcon-triangledownfill" style="font-size: 48rpx;"></text>
						</view>
					</picker>
				</view>
			</view>
			<view class="flex align-center">
				<view class="title bg-gray text-center flex-sub padding margin-right-sm">选择类型</view>
				<radio-group class="flex-treble block flex justify-start" @change="RadioChange">
					<label class="flex justify-center align-center margin-right-xl">
						<radio :class="radio=='A'?'checked':''" style="transform: scale(0.6);" :checked="radio=='A'?true:false" value="A"></radio>
						<view class="title">家庭供应</view>
					</label>
					<label class="flex justify-center align-center">
						<radio :class="radio=='B'?'checked':''" style="transform: scale(0.6);" :checked="radio=='B'?true:false" value="B"></radio>
						<view class="title">工程供应</view>
					</label>
				</radio-group>
			</view>
			<view class="flex align-center">
				<view class="title bg-gray text-center flex-sub padding margin-right-sm">选择地区</view>
				<picker class="flex-treble" mode="region" @change="RegionChange" :value="region">
					<view class="picker">
						{{region[0]}}-{{region[1]}}-{{region[2]}}
					</view>
				</picker>
			</view>
			<view class="flex align-center">
				<view class="title bg-gray text-center flex-sub padding margin-right-sm" style="height: 200rpx;">货品说明</view>
				<textarea class="flex-treble padding-top"style="font-size: 32rpx;height: 200rpx;" maxlength="-1" @input="textareaBInput" placeholder="请填写货品特色，种植情况等"></textarea>
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
			uni.$on('GYScreenChange',function(data){
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
				textareaBValue:'',
				imgList:[]
			}
		},
		methods: {
			/* 单位选择 */
			PickerChange(e) {
				this.index = e.detail.value;
			},
			/* 规格选择 */
			toGuiGe(){
				uni.navigateTo({url: 'GYscreen'});
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
			/* 说明 */
			textareaBInput(e) {
				this.textareaBValue = e.detail.value
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
