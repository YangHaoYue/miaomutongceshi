<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true"><block slot="backText">发求购</block></cu-custom>
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
					<text style="font-size: 32rpx;" v-for="(item,id) in screenList" :key="id" v-if="item.type=='picker'&&id<3">{{item.title}}:{{item.value[item.index].text}}</text>
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
				<view class="title bg-gray text-center flex-sub padding margin-right-sm">供品数量</view>
				<view class="flex-treble flex justify-between">
					<input class="flex-treble" style="font-size: 32rpx;" v-model="count" type="number" placeholder="求购数量" name="input"></input>
					<picker class="flex-sub" @change="PickerChange" :value="index" :range="picker" range-key="text">
						<view class="flex align-center justify-end" style="font-size: 32rpx;">
							{{picker[index].text}}<text class="cuIcon-triangledownfill" style="font-size: 48rpx;"></text>
						</view>
					</picker>
				</view>
			</view>
			<view class="flex align-center bg-gray">
				<view class="title bg-gray text-center flex-sub padding">求购地区</view>
				<view class="flex-treble bg-white padding-left-sm">
					<view class="flex align-center" v-for="(item,i) in areaList" :key="i">
						<picker class="flex-treble padding-tb" mode="region" @change="areaChange($event,i)" :value="area">
							<view class="picker">
								{{item[0]}}-{{item[1]}}-{{item[2]}}
							</view>
						</picker>
						<view class="bg-green text-center flex-sub padding" v-if="i==0" @click="add(i)">添加</view>
						<view class="bg-red text-center flex-sub padding" v-else @click="delet(i)">删除</view>
					</view>
				</view>
			</view>
			<!-- <view class="flex align-center">
				<view class="title bg-gray text-center flex-sub padding margin-right-sm">心理价位</view>
				<view class="flex-treble">
					<view class="flex justify-between align-center">
						<view class="flex-treble flex solid padding-xs">
							<input name="input" v-model="min_price" type="number" />
						</view>
						<text>-</text>
						<view class="flex-treble flex solid padding-xs">
							<input name="input" v-model="max_price" type="number" />
						</view>
						<text class=" text-lg text-gray" style="white-space: nowrap;">元/株</text>
					</view>
					<view class="text-gray text-sm">心理价位卖家看不到，仅帮您筛选供应商</view>
				</view>
			</view> -->
			<!-- <view class="cu-bar bg-white">
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
					 <video :src="item.tempFilePath" muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.fileType=='video'"></video>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="chooseMedia" v-if="imgList.length<9">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view> -->
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
				<input class="flex-treble" style="font-size: 32rpx;" v-model="description" placeholder="请填写货品特色，种植情况等" name="input"></input>
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
			this.date=this.getLastMonth();
			this.name=e.name;
			this.breed_id=e.id
			this.getUnit();
		},
		onShow() {
			var _this=this;
			uni.$on('QGScreenChange',function(data){
				_this.screenList=data.screenList;
				_this.sizeChange();
				uni.$off('QGScreenChange');
			});
			this.$forceUpdate();
		},
		data() {
			return {
				breed_id:'',
				name:'',
				screenList:[],
				size:{},
				radio: 'A',
				usage_type:0,
				
				count:'',
				index: 0,
				picker: [],
				
				area: ['北京市', '北京市', '东城区'],
				areas:[110101],
				areaList:[['北京市', '北京市', '东城区']],
				
				area_id:110101,
				region: ['北京市', '北京市', '东城区'],
				
				min_price:0,
				max_price:0,
				description:'',
				
				imgList:[],
				resource:[],
				date: '2021-2-30',
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
			/* 日期 */
			getLastMonth() {
			    var date = new Date();
			    var year = date.getFullYear();   //当前年：四位数字
			    var month = date.getMonth();     //当前月：0-11
				var day=date.getDate();
			
			    if (month == 12) {   //如果是0，则说明是1月份，上一个月就是去年的12月
			        year += 1;
			        month = 1;
			    }
				if(month==2&&day>28){
					month += 1;
					day=1
				}
			
			    month =month+2;   //月份格式化：月份小于10则追加个0
			
			    let lastYearMonth = year + '-' + month + '-' + day;
			
			    return lastYearMonth;
			},
			/* 单位选择 */
			PickerChange(e) {
				this.index = e.detail.value;
			},
			/* 规格选择 */
			toGuiGe(){
				if(this.screenList.length!=0){
					uni.navigateTo({url: 'QGscreen?screenList='+encodeURIComponent(JSON.stringify(this.screenList))});
				}else{
					uni.navigateTo({url: 'QGscreen'});
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
			/* 求购地区 */
			areaChange(e,i){
				this.areaList[i]=e.detail.value;
				this.areas[i]=e.detail.code[2];
				this.$forceUpdate();
				console.log(this.areaList)
				console.log(this.areas)
			},
			add(i){
				if(this.areaList.length<3){
					this.areaList.push(this.area)
					this.areas.push(this.area_id)
				}else{
					this.http.toast('求购地区最多只有三个！')
				}
			},
			delet(i){
				this.areaList.splice(i,1);
				this.areas.splice(i,1);
			},
			/* 地址选择 */
			RegionChange(e) {
				console.log(e)
				this.region = e.detail.value;
				this.area_id=e.detail.code[2];
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
							for(let item of res.tempFiles){
								this.http.uploadFile('files/fileUploader',item.tempFilePath,item.fileType).then((res)=>{
									this.resource.push(res.path);
								})
							}
						} else {
							this.imgList = res.tempFiles;
							for(let item of res.tempFiles){
								this.http.uploadFile('files/fileUploader',item.tempFilePath,item.fileType).then((res)=>{
									this.resource.push(res.path);
								})
							}
						}
						console.log(res)
						console.log(this.imgList)
						console.log(this.resource)
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
			/* 日期选择 */
			DateChange(e) {
				this.date = e.detail.value
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
				this.size['solidDiameter']=_this._format(_this.screenList[12])
				this.size['solidThickness']=_this._format(_this.screenList[13])
				this.size['quotationRequired']=_this._format(_this.screenList[14])
				this.size['quotationMethod']=_this._format(_this.screenList[15])
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
					url: this.http.interfaceUrl()+'want/publishWant',
					method: 'POST',
					header: {
						'Authorization':'Bearer '+ this.http.getToken()
					},
					data: {
						breed_id:this.breed_id,
						size:this.size,
						unit_id:this.picker[this.index].id,
						usage_type:this.usage_type,
						count:this.count,
						areas:this.areas,
						min_price:this.min_price,
						max_price:this.max_price,
						area_id:this.area_id,
						deadline:this.date,
						img:this.resource,
						description:this.description
					},
					success: res => {
						if(res.data.code==2000){
							this.http.toast(res.data.msg)
						}
						if(res.data.code==1000){
							this.http.toast(res.data.msg)
							setTimeout(()=>{uni.redirectTo({url: '../mine/QiuGou/QiuGou'});},1000)
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
				/* this.http.post('want/publishWant',{
					breed_id:this.breed_id,
					size:this.size,
					unit_id:this.picker[this.index].id,
					usage_type:this.usage_type,
					count:this.count,
					areas:this.areas,
					min_price:this.min_price,
					max_price:this.max_price,
					area_id:this.area_id,
					deadline:this.date,
					img:this.resource,
					description:this.description
				}).then((res)=>{
					if(res.code==1000){
						this.http.toast(res.msg)
						setTimeout(()=>{uni.navigateBack({delta: 1});},1000)
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
