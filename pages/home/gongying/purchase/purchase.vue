<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true">
			<block slot="backText">采购信息</block>
		</cu-custom>
		<!-- 选择地址 -->
		<view class="padding bg-white flex justify-between align-center padding-tb-xl" v-show="location" @click="tpLocationList">
			<view class="text-green">
				<text class="cuIcon-roundadd margin-right-sm" style="font-size: 36rpx;"></text>
				添加收获地址
			</view>
			<view class="cuIcon-right text-gray" style="font-size: 32rpx;"></view>
		</view>
		<view class="padding bg-white flex justify-between align-center  padding-tb-xl" v-show="!location">
			<view>
				<view class="text-bold margin-bottom-xs">张三 1398888888</view>
				<view class="text-gray"><text class="solid">默认</text>某某省某某市某某县</view>
			</view>
			<view class="cuIcon-right text-gray" style="font-size: 32rpx;"></view>
		</view>
		<!-- 购买信息 -->
		<view class="bg-white padding margin-top">
			<view class="flex justify-between margin-tb-xs">
				<view>钰尚园林白皮松张磊</view>
				<text class="cuIcon-right"></text>
			</view>
			<view class="flex justify-between align-center">
				<image src="../../../../static/logo.png" mode="aspectFill" style="width: 179rpx;height: 190rpx;"></image>
				<view class="margin-left">
					<view class="margin-bottom-xs">白皮松</view>
					<view class="margin-bottom-xs">高度：450-500厘米，冠幅：250-300厘米种植状态……</view>
					<view class="text-orange margin-bottom-xs">1000.00元/株</view>
				</view>
			</view>
			<view class="flex justify-between margin-tb">
				<view>购买数量</view>
				<uni-number-box :value="number" @change="change" :max="9999"/>
			</view>
			<view class="flex justify-between margin-tb solids-bottom padding-tb margin-top-xl">
				<view><text class="text-red">*</text>请选择到货日期</view>
				<picker mode="date" :value="date" start="2015-09-01" end="2100-09-01" @change="DateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			<view class="flex align-start justify-start">
				<view class="title">备注：</view>
				<textarea maxlength="200" @input="textareaInput" placeholder="（请备注详细的采购要求，最多200字）"></textarea>
			</view>
			<!-- 注意事项 -->
			<view class="text-green">
				<view style="text-indent:2em;">1、请将详细需求在备注中描述清楚，并于供应方协商一致，备注是重要凭证。</view>
				<view style="text-indent:2em;">2、供应商接受订单后未按时发货给您造成损失，平台将用供</view>
			</view>
		</view>
		<button class="cu-btn bg-green logobtn " @tap="apply">确认发布</button>
	</view>
</template>

<script>
	import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue'
	export default {
		components: {
			uniNumberBox
		},
		data() {
			return {
				location:true,
				number:0,
				date: '2018-12-25',
				textareaValue:''
			}
		},
		methods: {
			/* 选择地址 */
			tpLocationList(){
				uni.navigateTo({url: 'locationList'});
			},
			/* 输入盒子 */
			change(e) {
				this.number=e
			},
			/* 日期选择 */
			DateChange(e) {
				this.date = e.detail.value
			},
			textareaInput(e) {
				this.textareaValue = e.detail.value
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
