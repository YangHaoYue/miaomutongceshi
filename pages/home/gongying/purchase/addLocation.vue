<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true">
			<block slot="backText">收货地址</block>
		</cu-custom>
		<form>
			<view class="cu-form-group">
				<view class="title">联系人</view>
				<input placeholder="请输入联系人真实姓名" v-model="name" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号</view>
				<input placeholder="请输入收货人手机号" v-model="mobile" type="number" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">所在地区</view>
				<picker mode="region" @change="RegionChange" :value="region">
					<view class="text-left">
						{{region[0]}}，{{region[1]}}，{{region[2]}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">详细地址</view>
				<input placeholder="请输入收货人详细地址" v-model="address" name="input"></input>
			</view>
		</form>
		<button class="cu-btn round logobtn bg-green" @tap="save">保存</button>
	</view>
</template>

<script>
	export default {
		onLoad(e) {
			this.address_id=e.address_id;
			if(e.address_id){
				this.getAddressDetail(e.address_id)
			}
		},
		data() {
			return {
				address_id:null,
				name:'',
				mobile:'',
				area_id:'',
				address:'',
				region: ['广东省', '广州市', '海珠区'],
			}
		},
		methods: {
			getAddressDetail(address_id){
				this.http.post('address/getAddressDetail',{
					address_id:address_id
				}).then((res)=>{
					if(res.code==1000){
						this.name=res.data.receive_name;
						this.mobile=res.data.receive_phone;
						this.area_id=res.data.area_id;
						var reg = /.+?(省|市|自治区|自治州|县|区)/g;
						this.region=res.data.city.match(reg);
						this.address=res.data.address;
					}
				})
			},
			RegionChange(e) {
				console.log(e)
				this.region = e.detail.value
				this.area_id=e.detail.code[2]
			},
			save(){
				if(this.address_id){
					this.editAddress()
				}else{
					this.createAddress();
				}
			},
			editAddress(){
				this.http.post('address/createAddress',{
					address_id:this.address_id,
					address:this.address,
					area_id:this.area_id,
					name:this.name,
					mobile:this.mobile
				}).then((res)=>{
					this.http.toast(res.msg)
					if(res.code==1000){setTimeout(()=>{uni.navigateBack({delta: 1});},1000)}
				})
			},
			createAddress(){
				this.http.post('address/createAddress',{
					address:this.address,
					area_id:this.area_id,
					name:this.name,
					mobile:this.mobile
				}).then((res)=>{
					this.http.toast(res.msg)
					if(res.code==1000){setTimeout(()=>{uni.navigateBack({delta: 1});},1000)}
				})
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
		width: 90%;
		height: 88upx;
		position: fixed;
		margin-left: 5%;
		bottom: 44upx;
		z-index: 999;
	}
</style>
