(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mine-supply-supply"],{"0a15":function(t,i,e){"use strict";e("99af"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n={onLoad:function(){this.getInfo(1)},onShow:function(){var t=this;uni.$on("Supply_breed_id",(function(i){t.breed_id=i.Supply_breed_id,t.list=[],t.getInfo(1)}))},onPullDownRefresh:function(){this.list=[],this.getInfo(1),uni.stopPullDownRefresh()},onReachBottom:function(){this.current_page<this.last_page?(this.current_page++,this.getInfo(this.current_page)):this.http.toast("到底了！")},data:function(){return{breed_id:0,scrollInto:"",TabCur:0,TabList:[{tabindex:0,TabName:"发布中"},{tabindex:1,TabName:"已下架"}],modalName:null,list:[],current_page:"",last_page:""}},methods:{getInfo:function(t){var i=this;this.http.post("supply/getMine",{breed_id:this.breed_id,tab:this.TabCur,page:t}).then((function(t){1e3==t.code&&(0==i.list.length?(i.list=t.data.data,i.current_page=t.data.current_page,i.last_page=t.data.last_page):i.list=i.list.concat(t.data.data))}))},tabSelect:function(t){this.TabCur=t.tabindex,this.scrollInto="tab"+t.tabindex,this.list=[],this.getInfo(1)},toSearch:function(){uni.navigateTo({url:"../../home/search/search?isSupply=true"})},toGongYing:function(){uni.navigateTo({url:"../../release/release?index=0"})},refresh:function(){var t=this;uni.showLoading({title:"正在刷新...",mask:!0}),this.list=[],setTimeout((function(){t.getInfo(1),uni.hideLoading(),uni.showToast({icon:"none",title:"刷新成功！"})}),1500)},on:function(t){var i=this;this.http.get("supply/modifySupply",{supply_id:t,type:0}).then((function(t){i.http.toast(t.msg),1e3==t.code&&setTimeout((function(){i.list=[],i.getInfo(1)}),1e3)}))},off:function(t){var i=this;this.http.get("supply/modifySupply",{supply_id:t,type:1}).then((function(t){i.http.toast(t.msg),1e3==t.code&&setTimeout((function(){i.list=[],i.getInfo(1)}),1e3)}))},delet:function(t){var i=this;this.http.get("supply/modifySupply",{supply_id:t,type:2}).then((function(t){i.http.toast(t.msg),1e3==t.code&&setTimeout((function(){i.list=[],i.getInfo(1)}),1e3)}))},toDetail:function(t){uni.navigateTo({url:"detail?id="+t})},ListTouchStart:function(t){this.listTouchStart=t.touches[0].pageX},ListTouchMove:function(t){this.listTouchDirection=t.touches[0].pageX-this.listTouchStart>0?"right":"left"},ListTouchEnd:function(t){"left"==this.listTouchDirection?this.modalName=t.currentTarget.dataset.target:this.modalName=null,this.listTouchDirection=null}}};i.default=n},"18bc":function(t,i,e){"use strict";var n;e.d(i,"b",(function(){return a})),e.d(i,"c",(function(){return s})),e.d(i,"a",(function(){return n}));var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",[e("cu-custom",{attrs:{bgColor:"bg-green",isBack:!0,showBackImg:!0}},[e("template",{attrs:{slot:"backText"},slot:"backText"},[t._v("我的供应")])],2),e("v-uni-view",{staticClass:"cu-bar search bg-white"},[e("v-uni-view",{staticClass:"search-form round bg-white"},[e("v-uni-text",{staticClass:"cuIcon-search"}),e("v-uni-input",{attrs:{disabled:"true","adjust-position":!1,type:"text",placeholder:"搜索供应","confirm-type":"search"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.toSearch.apply(void 0,arguments)}}})],1)],1),e("v-uni-scroll-view",{staticClass:"bg-white nav margin-bottom-sm",attrs:{"scroll-x":!0,"scroll-into-view":t.scrollInto,"scroll-with-animation":!0}},[e("v-uni-view",{staticClass:"flex justify-around"},t._l(t.TabList,(function(i,n){return e("v-uni-view",{key:n,staticClass:"cu-item cuitem text-lg text-bold",class:i.tabindex==t.TabCur?"text-green Tabcur":"",attrs:{id:"tab"+i.tabindex},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.tabSelect(i)}}},[t._v(t._s(i.TabName))])})),1)],1),e("v-uni-view",{staticClass:"cu-list menu-avatar"},t._l(t.list,(function(i,n){return e("v-uni-view",{key:n,staticClass:"cu-item flex padding-lr bg-white padding-tb-xs",class:t.modalName=="move-box-"+n?"move-cur":"",staticStyle:{width:"100%",height:"100%"},attrs:{"data-target":"move-box-"+n},on:{touchstart:function(i){arguments[0]=i=t.$handleEvent(i),t.ListTouchStart.apply(void 0,arguments)},touchmove:function(i){arguments[0]=i=t.$handleEvent(i),t.ListTouchMove.apply(void 0,arguments)},touchend:function(i){arguments[0]=i=t.$handleEvent(i),t.ListTouchEnd.apply(void 0,arguments)}}},[e("v-uni-view",{staticClass:"flex-sub "},[e("v-uni-image",{staticStyle:{width:"234rpx",height:"214rpx"},attrs:{src:t.http.resourceUrl()+i.img,mode:"aspectFit"}})],1),e("v-uni-view",{staticClass:"margin-left flex-twice"},[e("v-uni-view",{staticClass:"flex align-center justify-between margin-top "},[e("v-uni-view",{staticClass:"flex align-center"},[e("v-uni-view",{staticClass:"text-black text-lg text-bold"},[t._v(t._s(i.title))]),0==i.usage_type?e("v-uni-view",{staticClass:"bg-green margin-left text-center radius text-sm",staticStyle:{width:"80rpx"}},[t._v("家庭")]):e("v-uni-view",{staticClass:"bg-green margin-left text-center radius text-sm",staticStyle:{width:"80rpx"}},[t._v("工程")])],1),e("v-uni-view",{staticClass:"cuIcon-writefill text-grey",staticStyle:{"font-size":"42rpx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toDetail(i.id)}}})],1),e("v-uni-view",{staticClass:"flex align-center margin-top-sm"},[e("v-uni-view",{staticClass:"text-orange text-xl"},[t._v(t._s(i.price)+t._s(i.unit))]),e("v-uni-view",{staticClass:"margin-left"},[t._v(t._s(i.view_count)+"人查看")])],1),e("v-uni-view",{staticClass:"margin-top-sm"},[1==i.person_auth?e("v-uni-text",{staticClass:"bg-blue margin-right-xs"},[t._v("企")]):t._e(),1==i.enterprise_auth?e("v-uni-text",{staticClass:"bg-green margin-right-xs"},[t._v("保")]):t._e(),t._v(t._s(i.area))],1)],1),e("v-uni-view",{staticClass:"move"},[0==t.TabCur?e("v-uni-view",{staticClass:"bg-grey",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.off(i.id)}}},[t._v("下架")]):t._e(),1==t.TabCur?e("v-uni-view",{staticClass:"bg-grey",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.on(i.id)}}},[t._v("上架")]):t._e(),e("v-uni-view",{staticClass:"bg-red",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.delet(i.id)}}},[t._v("删除")])],1)],1)})),1),e("v-uni-view",{staticClass:"cu-tabbar-height margin-bottom-lg"}),e("v-uni-view",{staticClass:"flex justify-around padding",staticStyle:{position:"fixed",bottom:"0",width:"100%","z-index":"999"}},[e("v-uni-button",{staticClass:"cu-btn flex-sub shadow margin bg-gradual-green lg",staticStyle:{"border-radius":"25rpx"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.toGongYing.apply(void 0,arguments)}}},[e("v-uni-text",{staticClass:"cuIcon-evaluate_fill",staticStyle:{"font-size":"36rpx"}}),t._v("发布新供应")],1),e("v-uni-button",{staticClass:"cu-btn flex-sub shadow margin bg-gradual-orange lg",staticStyle:{"border-radius":"25rpx"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.refresh.apply(void 0,arguments)}}},[e("v-uni-text",{staticClass:"cuIcon-refresh",staticStyle:{"font-size":"36rpx"}}),t._v("一键刷新")],1)],1)],1)},s=[]},"456f":function(t,i,e){var n=e("24fb");i=n(!1),i.push([t.i,"uni-page-body[data-v-fc835896]{background-color:#fff;height:100vh}.Tabcur[data-v-fc835896]{border-bottom:solid #00913a %?4?%}body.?%PAGE?%[data-v-fc835896]{background-color:#fff}",""]),t.exports=i},"852f":function(t,i,e){var n=e("456f");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=e("4f06").default;a("110e0ae8",n,!0,{sourceMap:!1,shadowMode:!1})},"95b2":function(t,i,e){"use strict";e.r(i);var n=e("18bc"),a=e("f10e");for(var s in a)"default"!==s&&function(t){e.d(i,t,(function(){return a[t]}))}(s);e("e4a3");var o,u=e("f0c5"),c=Object(u["a"])(a["default"],n["b"],n["c"],!1,null,"fc835896",null,!1,n["a"],o);i["default"]=c.exports},e4a3:function(t,i,e){"use strict";var n=e("852f"),a=e.n(n);a.a},f10e:function(t,i,e){"use strict";e.r(i);var n=e("0a15"),a=e.n(n);for(var s in n)"default"!==s&&function(t){e.d(i,t,(function(){return n[t]}))}(s);i["default"]=a.a}}]);