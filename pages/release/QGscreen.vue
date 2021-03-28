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
						<view class="solid padding-tb-sm padding-lr-xl" :class="item.cur==son.text?'bg-green':''" @click="Change($event,item,iv)" :data-cur="son.text">{{son.text}}</view>
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
			if(e.screenList){
				this.screenList=JSON.parse(decodeURIComponent(e.screenList));
			}else{
				this.getInfo()
			}
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
					cur:'',
					value:[]
				},{
					title: '苗木形态',
					id:'',
					type:'picker',
					value1: 0,
					value2: 0,
					index:0,
					value:[]
				},{
					title: '土球直径',
					id:0,
					type:'input',
					value1: '',
					value2: '',
					unit: '厘米'
				},{
					title: '土球厚度',
					id:0,
					type:'input',
					value1: '',
					value2: '',
					unit: '厘米'
				}/* ,{
					title: '报价必填',
					id:'',
					type:'picker2',
					value1: 0,
					value2: 0,
					cur:'',
					value:[]
				},{
					title: '报价方式',
					id:'',
					type:'picker2',
					value1: 0,
					value2: 0,
					cur:'',
					value:[]
				} */],
				Cur: '',
				size:[],
				
				/* 'rodDiameter':'',
				'height':'',
				'crownWidth':'',
				'plantingStatus':'',
				'treeCrown':'',
				'quality':'',
				'soilQuality':'',
				'treeShape':'',
				'density':'',
				'branch':'',
				'nurseryForm':'',
				'solidDiameter':'',
				'solidThickness':'',
				'quotationRequired':'',
				'quotationMethod':'' */
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
						/* this.screenList[14].value=res.data.quotationRequired;//报价必填
						this.screenList[15].value=res.data.quotationMethod;//报价方式 */
						
						this.screenList[1].id=res.data.rodDiameter[0].id;
						this.screenList[4].id=res.data.plantingStatus[0].id;
						this.screenList[7].id=res.data.soilQuality[0].id;
						this.screenList[8].id=res.data.treeShape[0].id;
						/* this.screenList[10].id=res.data.density[0].id; */
						this.screenList[11].id=res.data.nurseryForm[0].id;
						
						/* this.screenList[10].cur=res.data.density[0].text; */
						/* this.screenList[14].cur=res.data.quotationRequired[0].text;
						this.screenList[15].cur=res.data.quotationMethod[0].text; */
						
						console.log(this.screenList)
						/* this.screenList[14].id=res.data.quotationRequired[0].id;
						this.screenList[15].id=res.data.quotationMethod[0].id; */
						this.screenList[5].id=res.data.treeCrown[0].id;
						this.screenList[6].id=res.data.quality[0].id;
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
				item.cur = e.currentTarget.dataset.cur;
				item.id=item.value[i].id;
			},
			/* 点击确定 */
			back() {
				uni.$emit('QGScreenChange', {
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
