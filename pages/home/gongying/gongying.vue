<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true"><block slot="backText">{{title}}</block></cu-custom>
		<!-- 搜索 -->
		<view class="cu-bar search bg-white">
			<navigator hover-class='none' :url="'/pages/home/search/search?type='+type" class="search-form round u-skeleton-fillet" redirect>
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input :adjust-position="false" type="text" placeholder="搜索供应" confirm-type="search" disabled="true"></input>
				</view>
			</navigator>
		</view>
		<!-- 三级联动 -->
		<view class="flex justify-around bg-white padding" :class="isScreenChange?'solid-bottom':'margin-bottom'">
			<view class="flex-sub text-center">
				<picker mode="region" @change="RegionChange" :value="region" @cancel="Regionall">
					{{areaName}}<text class="cuIcon-unfold"></text>
				</picker>
			</view>
			<view class="flex-sub text-center">
				<picker mode="multiSelector" @cancel="MultiAll" @change="MultiChange" @columnchange="MultiColumnChange" :value="multiIndex" :range="multiArray" range-key="text">
					{{category}}<text class="cuIcon-unfold"></text>
				</picker>
			</view>
			<view class="flex-sub text-center" @tap="toScreen">筛选<text class="cuIcon-unfold"></text></view>
		</view>
		<!-- 主产区 -->
		<view class="bg-white margin-bottom padding-top-xs" v-if="isScreenChange">
			<view class="text-center text-gray">-主产区-</view>
			<view class="flex padding-lr padding-tb-sm">
				<view class="cu-btn round margin-right-sm" :class="whichCity==id?'bg-green':'bg-nomal'" @tap="chooseCity(id)" style="width: 160rpx;" v-for="(item,id) in cityList" :key="id">
					{{item}}
				</view>
			</view>
		</view>
		<!-- 供应列表 -->
		<view class="flex padding bg-white padding-tb-sm" style="width: 100%;" v-if="type!=3" v-for="(item,index) in list" :key="index" @tap="toGYDetail(item.id)">
			<view class="flex-sub ">
				<image :src="http.resourceUrl()+item.img" mode="aspectFill" style="width: 234rpx;height: 214rpx;border-radius: 15rpx;"></image>
			</view>
			<view class="margin-left flex-twice">
				<view class="flex align-center justify-between margin-top ">
					<view class="flex align-center">
						<view class="text-black text-lg text-bold" style="white-space: nowrap;">{{item.title}}</view>
						<view v-if="item.usage_type==1" class="bg-green margin-left text-center radius text-sm" style="width: 80rpx;">工程</view>
						<view v-else class="bg-green margin-left text-center radius text-sm" style="width: 80rpx;">家庭</view>
					</view>
					<view class="text-sm" style="white-space: nowrap;">{{item.time}}</view>
				</view>
				<view class="flex align-center margin-top-sm">
					<view class="money">{{item.price}}<text>{{item.unit}}</text></view>
					<view class="margin-left">{{item.view_count}}人查看</view>
				</view>
				<view class="margin-top-sm">
					<text v-if="item.person_auth==1" class="bg-blue margin-right-xs">企</text>
					<text v-if="item.enterprise_auth==1" class="bg-green margin-right-xs">实</text>
					{{item.area}}</view>
			</view>
		</view>
		<!-- 求购列表 -->
		<view class="flex padding bg-white padding-tb-sm solid-bottom" style="width: 100%;" v-if="type==3" v-for="(item,index) in list" :key="index" @tap="toQGDetail(item.id)">
			<view class="margin-left flex-twice">
				<view class="flex align-center justify-between margin-top">
					<view class="text-black text-lg">{{item.title}}</view>
					<view>{{item.time}}</view>
				</view>
				<view class="flex align-center margin-top-sm">求购数量：{{item.count}}株 | {{item.deadline}}截至</view>
				<view class="flex align-center margin-top-sm">求购地区：{{item.area}}</view>
				<view class="margin-top-sm flex justify-between">
					<view>
						<text v-if="item.person_auth==1" class="bg-blue margin-right-xs" style="padding: 4rpx;">企</text>
						<text v-if="item.enterprise_auth==1" class="bg-green margin-right-xs" style="padding: 4rpx;">实</text>
						<text class="text-gray">{{item.offer_count}}个报价</text>
					</view>
					<navigator hover-class='none' :url="'/pages/home/offer/offer?want_id='+item.id" navigateTo>
						<button class="cu-btn line-green sm" @click.stop="toOffer(item.id)">去报价</button>
					</navigator>
				</view>
			</view>
		</view>
		<!-- 发布悬浮按钮 -->
		<view class="flex align-center justify-center round float_fabu padding-sm" @tap="showModal">
			<text class="text-center">发布</text>
		</view>
		<!-- 发布弹窗 -->
		<view class="cu-modal bottom-modal" @tap="hideModal" :class="modalName=='bottomModal'?'show':''">
			<view class="cu-dialog">
				<view class="padding-xl bg-white flex justify-around">
					<view class="" v-for="(item,index) in btnList" :key="index" @tap.stop="toRelease(index)">
						<view style="width: 90rpx;height: 90rpx;margin: auto;">
							<image :src="item.img" mode="aspectFit" style="width: 90rpx;height: 90rpx;"></image>
						</view>
						<text>{{item.title}}</text>
					</view>
				</view>
				<view class="cu-bar bg-white justify-center">
					<text class="cuIcon-close text-bold" @tap.stop="hideModal" style="font-size: 32upx;"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(e) {
			this.type=e.type;
			if(e.breed_id!=''){
				this.breed_id=e.breed_id||0;
				this.category=e.category;
			}
			if(e.cate_id!=''){
				this.cate_id=e.cate_id;
			}
			if(e.type==0){
				this.title='家庭供应'
			}else if(e.type==3){
				this.title="求购大厅"
			}else if(e.type==-1){
				this.title="供应大厅"
			}
			this.getInfo(1);
			this.getFather();
		},
		onShow() {
			var _this=this;
			uni.$on('ScreenChange',function(data){
				_this.screenList=data.screenList;
				_this.sizeChange();
				_this.list=[];
				_this.getInfo(1);
				uni.$off('ScreenChange');
			});
		},
		//下拉刷新
		onPullDownRefresh(){
			this.list=[];
			this.getInfo(1);
			uni.stopPullDownRefresh();
		},
		//上拉加载
		onReachBottom() {
			if(this.current_page<this.last_page){
				this.current_page++;
				this.getInfo(this.current_page);
			}else{
				this.http.toast('到底了！');
			}
		},
		data() {
			return {
				type:1,
				title:'工程供应',
				area_id:0,
				areaName:'全国',
				region: ['北京市', '北京市', '东城区'],
				cate_id:0,
				breed_id:0,
				category:'品类',
				
				multiArray: [[],[]],
				multiIndex: [0, 0],
				BreedCategoryList:'',
				multi_current_page:'',
				multi_last_page:'',
				
				//是否对列表进行筛选
				isScreenChange:false,
				//筛选格式
				screenList:{},
				size:{},
				//主产区列表
				cityList:[],
				whichCity:-1,
				
				current_page:'',
				last_page:'',
				list:[],
				
				modalName:'',
				btnList:[{
					title:'发布供应',
					img:'../../../static/home/category/gongcheng.png'
				},{
					title:'发布求购',
					img:'../../../static/home/category/qiugou.png'
				}]
			}
		},
		methods: {
			getInfo(page){
				let url='';
				let data={};
				if(this.type==3){
					url='want/getList';
					data={
						page:page,
						breed_id:this.breed_id,
						area_id:this.area_id,
						size:this.size
					}
				}else{
					url='supply/getList';
					data={
						page:page,
						breed_id:this.breed_id,
						area_id:this.area_id,
						cate_id:this.cate_id||0,
						supply_type:this.type||1,
						size:this.size
					}
				}
				this.http.post(url,data).then((res)=>{
					if(res.code==1000){
						if(this.list.length==0){
							this.list=res.data.data;
							this.current_page=res.data.current_page;
							this.last_page=res.data.last_page;
						}else{
							this.list=this.list.concat(res.data.data)
						}
					}
				})
			},
			/* 获取品类父类 */
			getFather(){
				let data=[];
				this.http.post('breed/getBreedCategory',{
					pid:0,
					page:1
				},true).then((res)=>{
					if(res.code==1000){
						this.multiArray[0]=res.data.data;
						this.getBreedCategory(this.multiArray[0][0].id,1,false);
					}
				})
			},
			/* 获取品类分类 */
			getBreedCategory(pid,page,isConcat){
				this.http.post('breed/getBreedCategory',{
					pid:pid,page:page,
					},true).then((res)=>{
						if(res.code==1000){
							if(page==1){
								this.multi_current_page=res.data.current_page;
								this.multi_last_page=res.data.last_page;
							}
							if(isConcat){
								this.multiArray[1]=this.multiArray[1].concat(res.data.data)
							}else{
								this.multiArray[1]=res.data.data
							}
							this.$forceUpdate();
						}
					})
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
			/* 地区选择 */
			RegionChange(e) {
				console.log(e.detail)
				this.region = e.detail.value;
				this.area_id=e.detail.code[2];
				this.areaName=e.detail.value[2]
				this.list=[];
				this.getInfo(1)
			},
			Regionall(){
				this.area_id=0;
				this.areaName='全国'
				this.list=[];
				this.getInfo(1)
			},
			/* 品类选择 */
			MultiChange(e) {
				this.multiIndex = e.detail.value
				this.breed_id=this.multiArray[1][this.multiIndex[1]].id;
				this.category=this.multiArray[1][this.multiIndex[1]].text;
				this.list=[];
				this.getInfo(1)
			},
			MultiAll(){
				this.multiIndex=[0,0];
				this.breed_id=0;
				this.category='品类'
				this.list=[];
				this.getInfo(1)
			},
			MultiColumnChange(e) {
				//column 的值表示改变了第几列（下标从0开始），value 的值表示变更值的下标
				//第几列 下标从0开始
				let column = e.detail.column;
				//第几行 下标从0开始
				let value = e.detail.value;
				if (column === 0) {
					this.getBreedCategory(this.multiArray[0][value].id,1,false)
					this.multiIndex = [value, 0]
				} else if (column === 1&&this.multi_current_page<this.multi_last_page&&(value+1)/30==this.multi_current_page) {
					this.multi_current_page++
					this.getBreedCategory(this.multiArray[0][this.multiIndex[0]].id,this.multi_current_page,true);
					this.multiIndex = [this.multiIndex[0], value]
				}
			},
			/* 筛选 */
			toScreen(){
				if(JSON.stringify(this.screenList)!='{}'){
					console.log(this.screenList)
					uni.navigateTo({url: 'screen?screenList='+encodeURIComponent(JSON.stringify(this.screenList))});
				}else{
					uni.navigateTo({url: 'screen'});
				}
			},
			/* 选择主产区 */
			chooseCity(id){
				console.log(id)
				if (this.whichCity == id) {
					this.whichCity = -1;
				} else {
					this.whichCity=id;
				}
			},
			/* 去报价 */
			toOffer(id){
				uni.navigateTo({url: '/pages/home/offer/offer?want_id='+id});
			},
			/* 详情 */
			toGYDetail(id){
				uni.navigateTo({url: 'detail?supply_id='+id});
			},
			toQGDetail(id){
				uni.navigateTo({url: '../../mine/QiuGou/detail?want_id='+id});
			},
			/* 发布弹窗 */
			showModal(){
				this.modalName='bottomModal';
			},
			hideModal(){
				this.modalName=null;
			},
			/* 发布 */
			toRelease(index){
				uni.navigateTo({url: '../../release/release?index='+index});
			}
		}
	}
</script>

<style scoped>
	.float_fabu{
		position: fixed;
		bottom: 120rpx;
		right: 50rpx;
		height: 100rpx;
		width: 100rpx;
		background-color: #00913A;
		color: #FFFFFF;
		box-shadow:2px 2px 3px gray;
	}
	.bg-nomal{
		background-color: #F7F7F7;
		color: #A9A9A9;
	}
</style>
