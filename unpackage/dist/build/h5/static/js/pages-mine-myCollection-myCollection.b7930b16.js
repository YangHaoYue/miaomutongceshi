(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mine-myCollection-myCollection"],{"31a1":function(t,e,i){"use strict";var n=i("ac70"),a=i.n(n);a.a},"4e78":function(t,e,i){"use strict";i("99af"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={onLoad:function(){this.getInfo(1)},onPullDownRefresh:function(){this.list=[],this.getInfo(1),uni.stopPullDownRefresh()},onReachBottom:function(){this.current_page<this.last_page?(this.current_page++,this.getInfo(this.current_page)):this.http.toast("到底了！")},data:function(){return{list:[],current_page:"",last_page:""}},methods:{getInfo:function(t){var e=this;this.http.post("user/getMyCollects",{page:t}).then((function(t){1e3==t.code&&(0==e.list.length?(e.list=t.data.data,e.current_page=t.data.current_page,e.last_page=t.data.last_page):e.list=e.list.concat(t.data.data))}))},toHome:function(){uni.redirectTo({url:"/pages/home/gongying/gongying?title=工程供应"})},todetail:function(t){uni.navigateTo({url:"../../home/gongying/detail?supply_id="+t})}}};e.default=n},"59bd":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,"uni-page-body[data-v-05b1e364]{background-color:#fff;height:100vh}.logobtn[data-v-05b1e364]{width:%?650?%;height:%?88?%;margin:0 %?50?%;position:fixed;bottom:%?180?%}body.?%PAGE?%[data-v-05b1e364]{background-color:#fff}",""]),t.exports=e},7516:function(t,e,i){"use strict";i.r(e);var n=i("d668"),a=i("abb0");for(var s in a)"default"!==s&&function(t){i.d(e,t,(function(){return a[t]}))}(s);i("31a1");var r,o=i("f0c5"),c=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,"05b1e364",null,!1,n["a"],r);e["default"]=c.exports},abb0:function(t,e,i){"use strict";i.r(e);var n=i("4e78"),a=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);e["default"]=a.a},ac70:function(t,e,i){var n=i("59bd");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("40f65142",n,!0,{sourceMap:!1,shadowMode:!1})},d668:function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return n}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("cu-custom",{attrs:{bgColor:"bg-green",isBack:!0,showBackImg:!0}},[n("template",{attrs:{slot:"backText"},slot:"backText"},[t._v("我的收藏")])],2),0==t.list.length?n("v-uni-view",[n("v-uni-view",{staticStyle:{width:"283rpx",height:"279rpx",margin:"240rpx auto 120rpx"}},[n("v-uni-image",{staticStyle:{width:"283rpx",height:"279rpx"},attrs:{src:i("e8ec"),mode:"aspectFit"}})],1),n("v-uni-view",{staticClass:"text-black text-sm text-center text-bold"},[t._v("暂无收藏记录，去供应大厅看看")]),n("v-uni-button",{staticClass:"cu-btn bg-green logobtn round",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toHome.apply(void 0,arguments)}}},[t._v("点击进入供应大厅")])],1):t._e(),t._l(t.list,(function(e,i){return 0!=t.list.length?n("v-uni-view",{key:i,staticClass:"flex padding bg-white padding-tb-xs margin-tb",staticStyle:{width:"100%"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.todetail(e.id)}}},[n("v-uni-view",{staticClass:"flex-sub "},[n("v-uni-image",{staticStyle:{width:"234rpx",height:"214rpx"},attrs:{src:t.http.resourceUrl()+e.img,mode:"aspectFit"}})],1),n("v-uni-view",{staticClass:"margin-left flex-twice"},[n("v-uni-view",{staticClass:"flex align-center justify-between margin-top "},[n("v-uni-view",{staticClass:"flex align-center"},[n("v-uni-view",{staticClass:"text-black text-lg text-bold"},[t._v(t._s(e.title))]),0==t.usage_type?n("v-uni-view",{staticClass:"bg-green margin-left text-center radius text-sm",staticStyle:{width:"80rpx"}},[t._v("家庭")]):n("v-uni-view",{staticClass:"bg-green margin-left text-center radius text-sm",staticStyle:{width:"80rpx"}},[t._v("工程")])],1),n("v-uni-view",[t._v(t._s(e.time))])],1),n("v-uni-view",{staticClass:"flex align-center margin-top-sm"},[n("v-uni-view",{staticClass:"money"},[t._v(t._s(e.price)),n("v-uni-text",[t._v(t._s(e.unit))])],1),n("v-uni-view",{staticClass:"margin-left"},[t._v(t._s(e.view_count)+"人查看")])],1),n("v-uni-view",{staticClass:"margin-top-sm"},[1==e.person_auth?n("v-uni-text",{staticClass:"bg-blue margin-right-xs"},[t._v("企")]):t._e(),1==e.enterprise_auth?n("v-uni-text",{staticClass:"bg-green margin-right-xs"},[t._v("保")]):t._e(),t._v(t._s(e.area))],1)],1)],1):t._e()}))],2)},s=[]},e8ec:function(t,e,i){t.exports=i.p+"static/img/nobox.ab0b631b.png"}}]);