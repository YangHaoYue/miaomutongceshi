const Detect_token_failure=function(status,message){
	if(status==401){
		uni.showToast({
			icon:'none',
			title:message
		})
		uni.removeStorageSync('token');
		setTimeout(()=>{
			uni.reLaunch({
				url: '/pages/login/login'
			});
		},1500)
	}
}
export default{
	Detect_token_failure
}