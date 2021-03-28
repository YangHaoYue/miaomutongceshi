<template name="mine">
	<view>
		<cu-custom Color="#0BA958" bgColor="bg-green" :isBack="true" :showBackImg="false"><block slot="backText">我的</block></cu-custom>
		<!-- 头部 -->
		<view class=" flex justify-between padding align-center" style="background-image: url(https://7778-wxpay-yai0c-1303163285.tcb.qcloud.la/bg_img.png?sign=1e3f552884d41db931ff3d8f060d2735&t=1610538345);background-size: 100% 100%;">
			<view class="flex align-center">
				<view class="cu-avatar round lg">
					<image class="cu-avatar round lg" :src="avatarUrl"></image>
				</view>
				<view class="margin-left-sm text-white" v-if="http.isLogin()">{{nick_name}}</view>
				<button class="cu-btn round line-green margin-left-sm text-white" v-else open-type="getUserInfo" @getuserinfo="getUserInfo">请登录</button>
			</view>
			<navigator hover-class='none' url="/pages/mine/myStore/myStore" navigateTo>
				<view style="width: 70rpx;height: 70rpx;margin: auto;">
					<image src="../../static/mine/store.png" mode="aspectFit" style="width: 70rpx;height: 70rpx;"></image>
				</view>
				<text class="text-white text-sm">编辑苗店</text>
			</navigator>
		</view>
		<!-- 认证信息 -->
		<view class="margin flex justify-between bg-white align-center padding-lr-sm padding-tb radius">
			<view>
				<view class="text-bold text-black margin-bottom-xs text-lg">认证信息</view>
				<view class="text-grey text-sm">点亮更多图标，增加诚信值，获得更多生意机会</view>
			</view>
			<navigator hover-class='none' url="/pages/mine/authentication/authentication" navigateTo>
				<button class="cu-btn round bg-green sm" style="white-space: nowrap;">前往认证<text class="cuIcon-right"></text></button>
			</navigator>
		</view>
		<!-- 必备工具 -->
		<view class="margin bg-white padding-lr-sm padding-top radius">
			<view class="text-bold text-black margin-bottom-xs text-lg solids-bottom padding-bottom-xs">必备工具</view>
			<view class="cu-list grid col-4 no-border margin-top-sm">
				<view class="cu-item" v-for="(item,index) in toolList" :key="index" >
					<navigator hover-class='none' :url="item.url" navigateTo>
						<view style="width: 60rpx;height: 60rpx;margin: auto;">
							<image :src="item.img" mode="aspectFit" style="width: 60rpx;height: 60rpx;"></image>
						</view>
						<text>{{item.title}}</text>
					</navigator>
				</view>
			</view>
		</view>
		<!-- 客服电话 -->
		<view class="margin-top margin-lr bg-white padding-lr-sm padding-top radius">
			<view class="text-bold text-black margin-bottom-xs text-lg solid-bottom padding-bottom-xs">帮助中心</view>
			<view class="cu-list grid col-4 no-border margin-top-sm" @click="makePhoneCall">
				<view class="cu-item">
					<view style="width: 60rpx;height: 60rpx;margin: auto;">
						<image src="../../static/mine/phone.png" mode="aspectFit" style="width: 60rpx;height: 60rpx;"></image>
					</view>
					<text>客服电话</text>
				</view>
			</view>
		</view>
		<!-- 退出登录 -->
		<view class="padding-lr flex flex-direction" v-if="http.isLogin()">
			<button class="cu-btn line-orange radius margin-tb-sm" @click="exit">退出登录</button>
		</view>
		<!-- 底部导航栏Tabbar -->
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	export default {
		created() {
			this.getphoneNumber();
			if(this.http.isLogin()){
				this.login()
				/* this.getNomalUserInfo() */
			}
		},
		data() {
			return {
				nick_name:'',
				avatarUrl:'',
				phone:'',
				toolList:[{
					title:'我的供应',
					img:'../../static/mine/gongqiu.png',
					url:'/pages/mine/supply/supply'
				},{
					title:'我的求购',
					img:'../../static/mine/qiugou.png',
					url:'/pages/mine/QiuGou/QiuGou'
				},{
					title:'供应订单',
					img:'../../static/mine/order.png',
					url:'/pages/mine/myOrders/myOrders'
				},{
					title:'求购订单',
					img:'../../static/mine/order.png',
					url:'/pages/mine/myOrders/QGorders'
				},{
					title:'我的钱包',
					img:'../../static/mine/wallet.png',
					url:'/pages/mine/myWallet/myWallet'
				},{
					title:'我的收藏',
					img:'../../static/mine/shoucang.png',
					url:'/pages/mine/myCollection/myCollection'
				}]
			}
		},
		methods: {
			getUserInfo(e){
				if(e.detail.userInfo){
					//用户按了允许授权按钮
					this.login(e)
				}
			},
			login(e){
				uni.login({
					provider:'weixin',
					success: (res) => {
						this.http.post('user/wxLogin',{
							code:res.code,
							avatar:uni.getStorageSync('personImg')||e.detail.userInfo.avatarUrl,
							name:uni.getStorageSync('nickName')||e.detail.userInfo.nickName
						}).then((res)=>{
							if(res.code==1000){
								this.http.setUserInfo(res.data.token,uni.getStorageSync('personImg')||e.detail.userInfo.avatarUrl,uni.getStorageSync('nickName')||e.detail.userInfo.nickName);
								this.nick_name=uni.getStorageSync('nickName');
								this.avatarUrl=uni.getStorageSync('personImg');
							}
						}).catch((rej)=>{
							console.log(rej)
						})
					}
				})
			},
			getNomalUserInfo(){
				this.http.get('user/getUserInfo').then((res)=>{
					
				})
			},
			getphoneNumber(){
				this.http.get('user/getSystemInfo').then((res)=>{
					this.phone=res.data.service_mobile
				})
			},
			makePhoneCall(){
				uni.makePhoneCall({
					phoneNumber:this.phone
				})
			},
			exit(){
				this.nick_name='';
				this.avatarUrl='';
				this.nick_name='';
				uni.clearStorageSync();
			}
		}
	}
</script>

<style>

</style>
