<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :showBackImg="true">
			<block slot="backText">苗木课堂</block>
		</cu-custom>
		<view class="padding">
			<view class="text-lg text-bold bg-white text-center">{{detail.title}}</view>
			<view class="flex justify-end text-sm margin">
				<view class="text-gray"><text class="cuIcon-attention margin-right-xs"></text>{{detail.view}}</view>
				<view class="text-gray margin-left-sm text-sm">{{detail.created_at}}</view>
			</view>
			<view v-html="detail.content"></view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(e) {
			this.getInfo(e.id)
		},
		data() {
			return {
				detail:''
			}
		},
		methods: {
			getInfo(id){
				this.http.post('nurseryClass/getArticleDetail',{
					article_id:id
				}).then((res)=>{
					if(res.code==1000){
						this.detail=res.data;
					}
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
</style>
