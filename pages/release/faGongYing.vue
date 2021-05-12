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
				<input class="flex-treble" style="font-size: 32rpx;" v-if="screenList.length==0" disabled="true" @tap="toGuiGe" placeholder="请选择货品规格" name="input"/>
				<view class="flex-treble flex align-center" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" v-else @tap="toGuiGe">
					<text style="font-size: 32rpx;" v-for="(item,id) in screenList" :key="id" v-if="item.type=='input'&&id<3">{{item.title}}:{{item.value1}}-{{item.value2}}</text>
					<text style="font-size: 32rpx;" v-for="(item,i) in screenList" :key="i" v-if="item.type=='picker'&&id<3">{{item.title}}:{{item.value[item.index].text}}</text>
				</view>
			</view>
			<view class="flex align-center">
				<view class="title bg-gray text-center flex-sub padding margin-right-sm">选择类型</view>
				<radio-group class="flex-treble block flex justify-start" @change="RadioTypeChange">
					<label class="flex justify-center align-center margin-right-xl">
						<radio :class="typeRadio=='A'?'checked':''" style="transform: scale(0.6);" :checked="typeRadio=='A'?true:false" value="A"></radio>
						<view class="title">电议</view>
					</label>
					<label class="flex justify-center align-center">
						<radio :class="typeRadio=='B'?'checked':''" style="transform: scale(0.6);" :checked="typeRadio=='B'?true:false" value="B"></radio>
						<view class="title">单位价格</view>
						<input type="digit" v-model="single_price" placeholder="输入价格" placeholder-class="text-sm" class="solid margin-left-xs text-sm padding-xs" style="width: 150rpx;" />
					</label>
				</radio-group>
			</view>
			<view class="flex align-center">
				<view class="title bg-gray text-center flex-sub padding margin-right-sm">供品数量</view>
				<view class="flex-treble flex justify-between">
					<input class="flex-treble" style="font-size: 32rpx;" type="number" v-model="stock" placeholder="请输入供品数量" name="input"></input>
					<picker class="flex-sub" @change="PickerChange" :value="index" :range="picker" range-key="text">
						<view class="flex align-center justify-end" style="font-size: 32rpx;">
							{{picker[index].text}}<text class="cuIcon-triangledownfill" style="font-size: 48rpx;"></text>
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
				<textarea class="flex-treble padding-top" style="font-size: 32rpx;height: 200rpx;" maxlength="-1" @input="textareaBInput" placeholder="请填写货品特色，种植情况等"></textarea>
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
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage(item.tempFilePath)" :data-url="imgList[index].tempFilePath">
					 <image :src="item.tempFilePath" mode="aspectFill" v-if="item.fileType=='image'"></image>
					 <image :src="item.thumbTempFilePath" mode="aspectFill" v-if="item.fileType=='video'"></image>
					 <!-- <video :src="item.tempFilePath" muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.fileType=='video'"></video> -->
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="chooseMedia" v-if="imgList.length<9">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
		</form>
		<!-- 底部导航栏Tabbar -->
		<view class="cu-tabbar-height"></view>
		<button class="cu-btn bg-green logobtn " @tap="apply">确认发布</button>
	</view>
</template>

<script>
	export default {
		onLoad(e) {
			this.name=e.name;
			this.breed_id=e.id
			this.getUnit()
		},
		onShow() {
			var _this=this;
			uni.$on('GYScreenChange',function(data){
				_this.screenList=data.screenList;
				_this.sizeChange();
				uni.$off('GYScreenChange');
			});
			this.$forceUpdate();
		},
		data() {
			return {
				breed_id:'',
				name:'',
				screenList:[],
				size:{},
				index: 0,
				typeRadio:'A',
				sell_type:1,
				single_price:0,
				stock:'',
				picker: [],
				
				radio: 'A',
				usage_type:0,
				area_id:110101,
				region: ['北京市', '北京市', '东城区'],
				textareaBValue:'',
				imgList:[],
				resource:[]
			}
		},
		methods: {
			getUnit(){
				this.http.post('breed/getUnit').then((res)=>{
					if(res.code==1000){
						this.picker=res.data
					}
				})
			},
			/* 单位选择 */
			PickerChange(e) {
				this.index = e.detail.value;
			},
			/* 规格选择 */
			toGuiGe(){
				if(this.screenList.length!=0){
					uni.navigateTo({url: 'GYscreen?screenList='+encodeURIComponent(JSON.stringify(this.screenList))});
				}else{
					uni.navigateTo({url: 'GYscreen'});
				}
			},
			RadioTypeChange(e){
				this.typeRadio = e.detail.value;
				if(this.typeRadio=='B'){
					this.sell_type=0;
				}else{
					this.sell_type=1;
				}
			},
			/* 单项选择 */
			RadioChange(e) {
				this.radio = e.detail.value;
				if(this.radio=='B'){
					this.usage_type=1;
				}else{
					this.usage_type=0;
					this.single_price=0;
				}
			},
			/* 地址选择 */
			RegionChange(e) {
				console.log(e)
				this.region = e.detail.value
				this.area_id=e.detail.code[2];
			},
			/* 说明 */
			textareaBInput(e) {
				this.textareaBValue = e.detail.value
			},
			chooseMedia() {
				uni.chooseMedia({
					count: 9,
					mediaType: ['image','video'],
					sourceType: ['album', 'camera'],
					maxDuration: 10,
					camera: 'back',
					success:(res)=>{
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFiles);
							res.tempFiles.forEach((item,index)=>{
								if(item.duration&&item.duration>10){
									let position=this.imgList.length-res.tempFiles.length+index
									this.http.toast('请选择时长小于10s的视频！');
									this.imgList.splice(position,1)
								}else{
									this.http.uploadFile('files/fileUploader',item.tempFilePath,item.fileType).then((res)=>{
										this.resource.push(res.path);
									})
								}
							})
						} else {
							this.imgList = res.tempFiles;
							res.tempFiles.forEach((item,index)=>{
								if(item.duration&&item.duration>10){
									this.http.toast('请选择时长小于10s的视频！');
									this.imgList.splice(index,1)
								}else{
									this.http.uploadFile('files/fileUploader',item.tempFilePath,item.fileType).then((res)=>{
										this.resource.push(res.path);
									})
								}
							})
						}
					}
				})
			},
			ViewImage(e) {
				uni.previewImage({
					urls: [e]
				});
			},
			DelImg(e) {
				this.imgList.splice(e.currentTarget.dataset.index, 1);
				this.resource.splice(e.currentTarget.dataset.index, 1)
			},
			sizeChange(){
				let _this=this;
				this.size['rodDiameter']=_this._format(_this.screenList[1])
				this.size['height']=_this._format(_this.screenList[2])
				this.size['crownWidth']=_this._format(_this.screenList[3])
				this.size['plantingStatus']=_this._format(_this.screenList[4])
				this.size['treeCrown']=_this._format(_this.screenList[5])
				this.size['quality']=_this._format(_this.screenList[6])
				this.size['soilQuality']=_this._format(_this.screenList[7])
				this.size['treeShape']=_this._format(_this.screenList[8])
				this.size['branch']=_this._format(_this.screenList[9])
				this.size['density']=_this._format(_this.screenList[10])
				this.size['nurseryForm']=_this._format(_this.screenList[11])
				console.log(this.size)
			},
			_format(e){
				let data={};
				data['id']=e.id||0;
				data['value1']=e.value1||0;
				data['value2']=e.value2||0;
				return data
			},
			apply(){
				uni.request({
					url: this.http.interfaceUrl()+'supply/publishSupply',
					method: 'POST',
					header: {
						'Authorization':'Bearer '+ this.http.getToken()
					},
					data: {
						breed_id:this.breed_id,
						size:this.size,
						sell_type:this.sell_type,//销售类型0标价，1电议
						stock:this.stock,
						single_price:this.single_price,
						unit_id:this.picker[this.index].id,
						usage_type:this.usage_type,//0家用1工程
						area_id:this.area_id,
						img:this.resource,
						description:this.textareaBValue,
					},
					success: res => {
						if(res.data.code==2000){
							this.http.toast(res.data.msg)
						}
						if(res.data.code==1000){
							this.http.toast(res.data.msg)
							setTimeout(()=>{uni.redirectTo({url: '../mine/supply/supply'});},1000)
						}
						if(res.data.code==401){
							uni.clearStorageSync()
							this.http.modal("","登录信息已失效，请重新登录", false, () => {
								//store.commit("logout") 登录页面执行
								uni.redirectTo({
									url:'/pages/index/index?mine=true'
								})
							})
						}
					},
					fail: () => {},
					complete: () => {}
				});
				/* this.http.post('supply/publishSupply',{
					breed_id:this.breed_id,
					size:this.size,
					sell_type:this.sell_type,//销售类型0标价，1电议
					stock:this.stock,
					single_price:this.single_price,
					unit_id:this.picker[this.index].id,
					usage_type:this.usage_type,//0家用1工程
					area_id:this.area_id,
					img:this.resource,
					description:this.textareaBValue,
				}).then((res)=>{
					if(res.code==1000){
						this.http.toast(res.msg)
						setTimeout(()=>{uni.redirectTo({url: '../mine/supply/supply'});},1000)
					}
				}) */
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
