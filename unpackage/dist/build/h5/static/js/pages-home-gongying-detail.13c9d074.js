(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-home-gongying-detail"],{"108e":function(t,i,e){var a=e("24fb");i=a(!1),i.push([t.i,'.Tabcur[data-v-7ba10669]{border-bottom:solid #00913a %?4?%}.showMadol[data-v-7ba10669]{height:%?497?%;width:100%;position:fixed;bottom:calc(%?120?% + env(safe-area-inset-bottom) / 2);z-index:999}.showMadol[data-v-7ba10669]::after{content:"";position:absolute;width:0;height:0;border-top:solid 6px #fff;border-right:solid 6px transparent;border-left:solid 6px transparent;left:50%;bottom:-6px;margin-left:-6px}',""]),t.exports=i},"8b1b":function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a={onLoad:function(t){this.supply_id=t.supply_id,this.getInfo()},data:function(){return{supply_id:"",detail:"",TabCur:0,scrollInto:"tab0",TabList:[{tabindex:0,TabName:"供应"},{tabindex:1,TabName:"详情"}],swiperList:[],detailList:[],showMOdal:!1}},onPageScroll:function(t){t.scrollTop>=495?(this.TabCur=1,this.scrollInto="tab1"):(this.TabCur=0,this.scrollInto="tab0")},methods:{getInfo:function(){var t=this,i=uni.getStorageSync("latitude"),e=uni.getStorageSync("longitude");this.http.post("supply/getSupplyDetail",{supply_id:this.supply_id,longitude:e,latitude:i,member_id:this.member_id}).then((function(i){1e3==i.code&&(t.swiperList=i.data.img,t.detail=i.data,t.detailList=i.data.size)}))},tabSelect:function(t){this.TabCur=t.tabindex,this.scrollInto="tab"+t.tabindex,0==this.TabCur?uni.pageScrollTo({scrollTop:0}):uni.pageScrollTo({selector:"#Details"})},viewImg:function(t){uni.previewImage({urls:[t]})},Collection:function(){var t=this;this.http.post("supply/updateSupplyFavorite",{supply_id:this.supply_id}).then((function(i){t.http.toast(i.msg),(i.code=1e3)&&(t.detail.is_favorite=1)}))},tpPurchase:function(){uni.navigateTo({url:"purchase/purchase?supply_id="+this.supply_id})},toStoreShop:function(){uni.navigateTo({url:"storeShop?store_id="+this.detail.store.id})},showModal:function(){this.showMOdal=!0},hideModal:function(){this.showMOdal=!1},makePhoneCall:function(){uni.makePhoneCall({phoneNumber:this.detail.phone})}}};i.default=a},a2a3:function(t,i,e){"use strict";var a=e("af7a"),s=e.n(a);s.a},a8c0:function(t,i,e){"use strict";var a;e.d(i,"b",(function(){return s})),e.d(i,"c",(function(){return n})),e.d(i,"a",(function(){return a}));var s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",[e("cu-custom",{attrs:{bgColor:"bg-green",isBack:!0,showBackImg:!0}},[e("template",{attrs:{slot:"backText"},slot:"backText"},[t._v("供货详情")])],2),e("v-uni-scroll-view",{staticClass:"bg-white nav",staticStyle:{position:"fixed","z-index":"999"},style:"top:"+this.CustomBar+"px;",attrs:{"scroll-x":!0,"scroll-into-view":t.scrollInto,"scroll-with-animation":!0}},[e("v-uni-view",{staticClass:"flex justify-around"},t._l(t.TabList,(function(i,a){return e("v-uni-view",{key:a,staticClass:"cu-item cuitem text-lg text-bold",class:i.tabindex==t.TabCur?"text-green Tabcur":"",attrs:{id:"tab"+i.tabindex},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.tabSelect(i)}}},[t._v(t._s(i.TabName))])})),1)],1),e("v-uni-swiper",{staticClass:"screen-swiper",staticStyle:{"margin-top":"90rpx"},attrs:{"indicator-dots":!1,circular:!0,autoplay:!0,interval:"5000",duration:"500"}},t._l(t.swiperList,(function(i,a){return e("v-uni-swiper-item",{key:a,on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.viewImg(t.http.resourceUrl()+i.path)}}},[0==i.is_video?e("v-uni-image",{attrs:{src:t.http.resourceUrl()+i.path,mode:"aspectFill"}}):t._e(),1==i.is_video?e("v-uni-video",{attrs:{src:t.http.resourceUrl()+i.path,autoplay:!0,loop:!0,muted:!0,"show-play-btn":!1,controls:!1,objectFit:"cover"}}):t._e()],1)})),1),e("v-uni-view",{staticClass:"flex justify-around align-center padding bg-white"},[e("v-uni-view",{staticClass:"flex-treble"},[e("v-uni-view",{staticClass:"text-xl text-black margin-bottom"},[t._v(t._s(t.detail.title))]),e("v-uni-view",{staticClass:"flex justify-between text-gray margin-bottom"},[e("v-uni-view",[t._v(t._s(t.detail.area))]),e("v-uni-view",[e("v-uni-text",{staticClass:"cuIcon-locationfill"}),t._v(t._s(t.detail.distance)+"公里")],1)],1),e("v-uni-view",{staticClass:"flex justify-between text-gray"},[e("v-uni-view",{staticClass:"text-orange"},[t._v(t._s(t.detail.price))]),e("v-uni-view",[t._v(t._s(t.detail.view_count)+"人查看")])],1)],1),e("v-uni-view",{staticClass:"flex-sub flex justify-end"},[e("v-uni-view",{staticClass:"round cu-btn bg-white",class:1==t.detail.is_favorite?"text-green":"text-gray",staticStyle:{border:"1rpx solid #AAAAAA"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.Collection.apply(void 0,arguments)}}},[e("v-uni-text",{staticClass:"cuIcon-favorfill"}),t._v("收藏")],1)],1)],1),e("v-uni-view",{staticClass:"padding margin-top flex justify-between align-center",staticStyle:{"background-color":"#F5F9FF"}},[e("v-uni-view",{staticStyle:{color:"#0085FF"}},[e("v-uni-view",{staticClass:"margin-bottom"},[t._v("交易安全提醒")]),e("v-uni-view",{staticClass:"text-sm"},[t._v("微信转账风险高，见面交易需谨慎，线上交易更安全")])],1),e("v-uni-view",{staticClass:"cuIcon-lock",staticStyle:{"font-size":"48rpx",color:"#0085FF"}})],1),e("v-uni-view",{staticClass:"cu-list menu-avatar"},[e("v-uni-view",{staticClass:"cu-item",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.toStoreShop.apply(void 0,arguments)}}},[e("v-uni-view",{staticClass:"cu-avatar round lg"},[e("v-uni-image",{staticClass:"cu-avatar round lg",attrs:{src:t.http.resourceUrl()+t.detail.store.avatar}})],1),e("v-uni-view",{staticClass:"content"},[e("v-uni-view",{staticClass:"text-black text-lg"},[e("v-uni-view",{staticClass:"text-cut"},[t._v(t._s(t.detail.store.store_name)),1==t.detail.store.enterprise_auth?e("v-uni-text",{staticClass:"bg-blue margin-right-xs radius margin-left-sm"},[t._v("企")]):t._e(),1==t.detail.store.person_auth?e("v-uni-text",{staticClass:"bg-blue margin-right-xs radius margin-left-sm"},[t._v("保")]):t._e()],1)],1),e("v-uni-view",{staticClass:"text-gray text-sm flex"},[e("v-uni-view",{staticClass:"text-cut"},[t._v("持续经营"+t._s(t.detail.store.day)+"天 诚信等级：4级")])],1)],1),e("v-uni-view",{staticClass:"action"},[e("v-uni-view",{staticClass:"text-grey cuIcon-right"})],1)],1),e("v-uni-view",{staticClass:"padding bg-white",attrs:{id:"Details"}},[e("v-uni-view",{staticClass:"padding-bottom"},[t._v("详细信息")]),e("v-uni-view",{staticClass:"cu-list grid col-2"},t._l(t.detailList,(function(i,a){return e("v-uni-view",{key:a,staticClass:"flex align-center"},[e("v-uni-view",{staticClass:"padding-sm flex-twice text-sm",staticStyle:{"background-color":"#D1D1D1",border:"solid 2rpx #929292","white-space":"nowrap",height:"80rpx"}},[t._v(t._s(i.text))]),e("v-uni-view",{staticClass:"padding-tb-sm flex-treble text-sm",staticStyle:{"background-color":"#F7F7F7",border:"solid 2rpx #929292","white-space":"nowrap",height:"80rpx"}},[t._v(t._s(i.value))])],1)})),1)],1),e("v-uni-view",{staticClass:"padding-lr padding-bottom text-black text-bold bg-white"},[e("v-uni-view",[t._v(t._s(t.detail.desc))])],1)],1),t._l(t.swiperList,(function(i,a){return e("v-uni-view",{key:a},[0==i.is_video?e("v-uni-image",{staticStyle:{width:"100%"},attrs:{src:t.http.resourceUrl()+i.path,mode:"widthFix"}}):t._e()],1)})),e("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:t.showMOdal,expression:"showMOdal"}],staticClass:"bg-white showMadol",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.hideModal.apply(void 0,arguments)}}},[e("v-uni-view",{staticClass:"text-center text-lg text-bold margin-top"},[t._v("扫描二维码加商户微信")]),e("v-uni-view",{staticClass:"flex justify-center margin-top"},[e("v-uni-image",{staticStyle:{height:"300rpx",width:"300rpx"},attrs:{src:t.http.resourceUrl()+t.detail.qrcode,mode:"aspectFit"}})],1)],1),e("v-uni-view",{staticClass:"cu-tabbar-height margin-top-sm"}),e("v-uni-view",{staticClass:"cu-bar bg-white tabbar border shop",staticStyle:{position:"fixed",bottom:"0",right:"0",left:"0","z-index":"999"}},[e("v-uni-view",{staticClass:"action",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.tpPurchase.apply(void 0,arguments)}}},[e("v-uni-view",{staticClass:"cuIcon-deliver",staticStyle:{"font-size":"48rpx"}}),t._v("立即购买")],1),e("v-uni-view",{staticClass:"btn-group"},[e("v-uni-button",{staticClass:"cu-btn bg-orange radius shadow-blur lg",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.showModal.apply(void 0,arguments)}}},[t._v("聊一聊")]),e("v-uni-button",{staticClass:"cu-btn bg-green radius shadow-blur lg",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.makePhoneCall.apply(void 0,arguments)}}},[t._v("打电话")])],1)],1)],2)},n=[]},af7a:function(t,i,e){var a=e("108e");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var s=e("4f06").default;s("f9fe4a96",a,!0,{sourceMap:!1,shadowMode:!1})},ee95:function(t,i,e){"use strict";e.r(i);var a=e("8b1b"),s=e.n(a);for(var n in a)"default"!==n&&function(t){e.d(i,t,(function(){return a[t]}))}(n);i["default"]=s.a},fe17:function(t,i,e){"use strict";e.r(i);var a=e("a8c0"),s=e("ee95");for(var n in s)"default"!==n&&function(t){e.d(i,t,(function(){return s[t]}))}(n);e("a2a3");var o,l=e("f0c5"),r=Object(l["a"])(s["default"],a["b"],a["c"],!1,null,"7ba10669",null,!1,a["a"],o);i["default"]=r.exports}}]);