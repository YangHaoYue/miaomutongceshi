<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true">
			<block slot="backText">选择规格</block>
		</cu-custom>
		<!-- 筛选条件 -->
		<view class="bg-white flex justify-center padding align-center" v-for="(item,index) in screenList" :key="index">
			<view class="flex-sub text-center">{{item.title}}</view>
			<view class="flex-treble flex justify-between align-center">
				<view class="flex-treble flex solid padding-tb-sm padding-lr-xs">
					<input name="input" v-model="item.min" type="number" />
					<text class=" text-lg text-gray" style="white-space: nowrap;">{{item.unit}}</text>
				</view>
				<text>-</text>
				<view class="flex-treble flex solid padding-tb-sm padding-lr-xs">
					<input name="input" v-model="item.max" type="number" />
					<text class=" text-lg text-gray" style="white-space: nowrap;">{{item.unit}}</text>
				</view>
			</view>
		</view>

		<view class="bg-white flex justify-center padding align-center">
			<view class="flex-sub text-center">种植状态</view>
			<picker class="flex-treble solid padding-tb-sm padding-lr-xs" @change="PickerChange" :value="index" :range="picker">
				<view class="flex align-center" style="height: 50rpx;">
					{{picker[index]}}<text class="cuIcon-triangledownfill" style="font-size: 48rpx;right: 0;position: absolute;"></text>
				</view>
			</picker>
		</view>
		<view class="bg-white flex justify-center padding align-center">
			<view class="flex-sub text-center">树冠</view>
			<picker class="flex-treble solid padding-tb-sm padding-lr-xs" @change="PickerChange" :value="index" :range="picker">
				<view class="flex align-center" style="height: 50rpx;">
					{{picker[index]}}<text class="cuIcon-triangledownfill" style="font-size: 48rpx;right: 0;position: absolute;"></text>
				</view>
			</picker>
		</view>
		<view class="bg-white flex justify-center padding align-center">
			<view class="flex-sub text-center">品质</view>
			<picker class="flex-treble solid padding-tb-sm padding-lr-xs" @change="PickerChange" :value="index" :range="picker">
				<view class="flex align-center" style="height: 50rpx;">
					{{picker[index]}}<text class="cuIcon-triangledownfill" style="font-size: 48rpx;right: 0;position: absolute;"></text>
				</view>
			</picker>
		</view>
		<view class="bg-white flex justify-center padding align-center">
			<view class="flex-sub text-center">土质</view>
			<picker class="flex-treble solid padding-tb-sm padding-lr-xs" @change="PickerChange" :value="index" :range="picker">
				<view class="flex align-center" style="height: 50rpx;">
					{{picker[index]}}<text class="cuIcon-triangledownfill" style="font-size: 48rpx;right: 0;position: absolute;"></text>
				</view>
			</picker>
		</view>
		<view class="bg-white flex justify-center padding align-center">
			<view class="flex-sub text-center">树形</view>
			<picker class="flex-treble solid padding-tb-sm padding-lr-xs" @change="PickerChange" :value="index" :range="picker">
				<view class="flex align-center" style="height: 50rpx;">
					{{picker[index]}}<text class="cuIcon-triangledownfill" style="font-size: 48rpx;right: 0;position: absolute;"></text>
				</view>
			</picker>
		</view>

		<view class="bg-white flex justify-center padding align-center">
			<view class="flex-sub text-center">分枝点</view>
			<view class="flex-treble flex justify-between align-center">
				<view class="flex-treble flex solid padding-tb-sm padding-lr-xs">
					<input name="input" type="number" />
					<text class=" text-lg text-gray" style="white-space: nowrap;">厘米</text>
				</view>
				<text>-</text>
				<view class="flex-treble flex solid padding-tb-sm padding-lr-xs">
					<input name="input" type="number" />
					<text class=" text-lg text-gray" style="white-space: nowrap;">厘米</text>
				</view>
			</view>
		</view>

		<view class="bg-white flex justify-center padding align-center">
			<view class="flex-sub text-center">茂密度</view>
			<view class="flex-treble flex justify-between align-center">
				<view class="solid padding-tb-sm padding-lr-xl" :class="Cur=='饱满'?'bg-green':''" @click="Change" data-cur="饱满">饱满</view>
				<view class="solid padding-tb-sm padding-lr-xl" :class="Cur=='稀疏'?'bg-green':''" @click="Change" data-cur="稀疏">稀疏</view>
				<view class="solid padding-tb-sm padding-lr-xl" :class="Cur=='偏冠'?'bg-green':''" @click="Change" data-cur="偏冠">偏冠</view>
			</view>
		</view>

		<view class="bg-white flex justify-center padding align-center" style="margin-bottom: 120rpx;">
			<view class="flex-sub text-center">苗木形态</view>
			<picker class="flex-treble solid padding-tb-sm padding-lr-xs" @change="PickerChange" :value="index" :range="picker">
				<view class="flex align-center" style="height: 50rpx;">
					{{picker[index]}}<text class="cuIcon-triangledownfill" style="font-size: 48rpx;right: 0;position: absolute;"></text>
				</view>
			</picker>
		</view>
		<view class="flex justify-around btBtn">
			<view class="bg-gray flex-sub text-center padding text-lg" @click="reset">重置</view>
			<view class="bg-green flex-sub text-center padding text-lg" @click="back">确定</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				screenList: [{
					title: '杆径',
					min: '',
					max: '',
					unit: '公分'
				}, {
					title: '高度',
					min: '',
					max: '',
					unit: '厘米'
				}, {
					title: '冠幅',
					min: '',
					max: '',
					unit: '厘米'
				}],
				index: 0,
				picker: ['请选择种植状态'],
				Cur: ''
			}
		},
		methods: {
			PickerChange(e) {
				this.index = e.detail.value;
			},
			/* 选择分枝点 */
			Change(e) {
				if (e.currentTarget.dataset.cur == this.Cur) {
					this.Cur = '';
				} else {
					this.Cur = e.currentTarget.dataset.cur;
				}
			},
			/* 点击确定 */
			back() {
				uni.$emit('ScreenChange', {
					isScreenChange: true,
					cityList: ['广州', '贵州']
				});
				uni.navigateBack({
					delta: 1
				});
			},
			/* 重置 */
			reset() {

			}
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
		height: 100vh;
	}

	.btBtn {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 9999;
	}
</style>
