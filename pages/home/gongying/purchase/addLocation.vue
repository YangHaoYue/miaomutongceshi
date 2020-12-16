<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true">
			<block slot="backText">收货地址</block>
		</cu-custom>
		<form>
			<view class="cu-form-group">
				<view class="title">联系人</view>
				<input placeholder="请输入联系人真实姓名" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号</view>
				<input placeholder="请输入收货人手机号" type="number" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">所在地区</view>
				<picker mode="region" @change="RegionChange" :value="region">
					<view class="picker">
						{{region[0]}}，{{region[1]}}，{{region[2]}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">详细地址</view>
				<input placeholder="请输入收货人详细地址" name="input"></input>
			</view>
		</form>
		<button class="cu-btn round logobtn bg-green" @tap="toAddLocation">保存</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				region: ['广东省', '广州市', '海珠区'],
			}
		},
		methods: {
			RegionChange(e) {
				console.log(e)
				this.region = e.detail.value
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
		width: 90%;
		height: 88upx;
		position: fixed;
		margin-left: 5%;
		bottom: 44upx;
		z-index: 999;
	}
</style>
