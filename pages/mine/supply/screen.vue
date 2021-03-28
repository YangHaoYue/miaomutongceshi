<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true">
			<block slot="backText">选择规格</block>
		</cu-custom>
		<!-- 筛选条件 -->
		<view class="bg-white flex justify-center padding align-center" v-for="(item,i) in screenList" :key="i">
			<template v-if="item.type=='input'">
				<view class="flex-sub text-center">{{item.title}}</view>
				<view class="flex-treble flex justify-between align-center">
					<view class="flex-treble flex solid padding-tb-sm padding-lr-xs">
						<input name="input" v-model="item.value1" type="digit" />
						<text class=" text-lg text-gray" style="white-space: nowrap;">{{item.unit}}</text>
					</view>
					<text>-</text>
					<view class="flex-treble flex solid padding-tb-sm padding-lr-xs">
						<input name="input" v-model="item.value2" type="digit" />
						<text class=" text-lg text-gray" style="white-space: nowrap;">{{item.unit}}</text>
					</view>
				</view>
			</template>
			<template v-else-if="item.type=='picker'">
				<view class="flex-sub text-center">{{item.title}}</view>
				<picker class="flex-treble solid padding-tb-sm padding-lr-xs" @change="PickerChange($event,item)" :value="item.index" :range="item.value" range-key="text">
					<view class="flex align-center" style="height: 50rpx;">
						{{item.value[item.index].text}}<text class="cuIcon-triangledownfill" style="font-size: 48rpx;right: 0;position: absolute;"></text>
					</view>
				</picker>
			</template>
			<template v-else-if="item.type=='picker2'">
				<view class="flex-sub text-center">{{item.title}}</view>
				<view class="flex-treble flex justify-between align-center">
					<block v-for="(son,iv) in item.value" :key="iv">
						<view class="solid padding-tb-sm padding-lr-xl" :class="Cur==son.text?'bg-green':''" @click="Change($event,item,iv)" :data-cur="son.text">{{son.text}}</view>
					</block>
				</view>
			</template>
		</view>
		<!-- 底部导航栏Tabbar -->
		<view class="cu-tabbar-height"></view>
		<view class="flex justify-around btBtn">
			<view class="bg-green flex-sub text-center padding text-lg" @click="back">确定</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(e) {
			/* var _this=this;
			uni.$on('MyGYChange',function(data){
				_this.screenList=data.screenList;
				console.log(data.screenList)
			}); */
			this.screenList=JSON.parse(e.screenList)
			this.getInfo();
		},
		onShow() {
		},
		data() {
			return {
				screenList: [{
					title: '杆径',
					type:'picker',
					value1: 0,
					value2: 0,
					index:0,
					value:''
				},{
					title: '*',
					id:'',
					type:'input',
					value1: '',
					value2: '',
					unit: '公分'
				},{
					title: '高度',
					id:'',
					type:'input',
					value1: '',
					value2: '',
					unit: '厘米'
				},{
					title: '冠幅',
					id:'',
					type:'input',
					value1: '',
					value2: '',
					unit: '厘米'
				},{
					title: '种植状态',
					id:'',
					type:'picker',
					value1: 0,
					value2: 0,
					index:0,
					value:[]
				},{
					title: '树冠',
					id:'',
					type:'picker',
					value1: 0,
					value2: 0,
					index:0,
					value:[]
				},{
					title: '品质',
					id:'',
					type:'picker',
					value1: 0,
					value2: 0,
					index:0,
					value:[]
				},{
					title: '土质',
					type:'picker',
					id:'',
					value1: 0,
					value2: 0,
					index:0,
					value:[]
				},{
					title: '树形',
					type:'picker',
					id:'',
					value1: 0,
					value2: 0,
					index:0,
					value:[]
				},{
					title: '分枝点',
					id:0,
					type:'input',
					value1: '',
					value2: '',
					unit: '厘米'
				},{
					title: '茂密度',
					id:'',
					type:'picker2',
					value1: 0,
					value2: 0,
					index:0,
					value:[]
				},{
					title: '苗木形态',
					id:'',
					type:'picker',
					value1: 0,
					value2: 0,
					index:0,
					value:[]
				},],
				Cur: '',
				size:[],
				/* 
					'rodDiameter':'',
					'height':'',
					'crownWidth':'',
					'plantingStatus':'',
					'treeCrown':'',
					'quality':'',
					'soilQuality':'',
					'treeShape':'',
					'density':'',
					'branch':'',
					'nurseryForm':'' */
			}
		},
		methods: {
			getInfo(){
				this.http.post('supply/getOptions').then((res)=>{
					if(res.code==1000){
						this.screenList[0].value=res.data.rodDiameter;//杆径
						this.screenList[4].value=res.data.plantingStatus;//种植状态
						this.screenList[5].value=res.data.treeCrown;//树冠
						this.screenList[6].value=res.data.quality;//品质
						this.screenList[7].value=res.data.soilQuality;//土质
						this.screenList[8].value=res.data.treeShape;//树形
						this.screenList[10].value=res.data.density;//茂密度
						this.screenList[11].value=res.data.nurseryForm;//苗木形态
						this.screenList.forEach(item=>{
							if(item.type=='picker'){
								item.value.some((son,index)=>{
									if(item.id==son.id){
										item.index=index;
									}
								})
							}else if(item.type=='picker2'){
								item.value.forEach((son,index)=>{
									if(item.id==son.id){
										item.index=index;
										this.Cur=son.text;
									}
								})
							}
						})
						console.log(this.screenList)
					}
				})
			},
			PickerChange(e,item) {
				item.index = e.detail.value;
				item.id=item.value[item.index].id;
				console.log(this.screenList)
				if(item.title=="杆径"){
					this.screenList[1].id=item.value[item.index].id
				}
			},
			/* 选择分枝点 */
			Change(e,item,i) {
				this.Cur = e.currentTarget.dataset.cur;
				item.id=item.value[i].id
			},
			_format(e){
				return{
					id:e.id||0,
					value1:e.value1,
					value2:e.value2
				}
			},
			/* 点击确定 */
			back() {
				/* for(let i=0;i<11;i++){
					this.size[i]=this._format(this.screenList[i+1]);
				} */
				uni.$emit('GYChange', {
					screenList: this.screenList
				});
				console.log(this.screenList)
				uni.navigateBack({
					delta: 1
				});
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
