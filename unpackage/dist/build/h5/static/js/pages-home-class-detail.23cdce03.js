(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-home-class-detail"],{"45e0":function(t,e,a){"use strict";a.r(e);var n=a("dc96"),i=a("80bd");for(var s in i)"default"!==s&&function(t){a.d(e,t,(function(){return i[t]}))}(s);a("4a05");var r,c=a("f0c5"),o=Object(c["a"])(i["default"],n["b"],n["c"],!1,null,"2518de9e",null,!1,n["a"],r);e["default"]=o.exports},"4a05":function(t,e,a){"use strict";var n=a("e150"),i=a.n(n);i.a},"80bd":function(t,e,a){"use strict";a.r(e);var n=a("8a20"),i=a.n(n);for(var s in n)"default"!==s&&function(t){a.d(e,t,(function(){return n[t]}))}(s);e["default"]=i.a},"8a20":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={onLoad:function(t){this.getInfo(t.id)},data:function(){return{detail:""}},methods:{getInfo:function(t){var e=this;this.http.post("nurseryClass/getArticleDetail",{article_id:t}).then((function(t){1e3==t.code&&(e.detail=t.data)}))}}};e.default=n},d7f1:function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,"uni-page-body[data-v-2518de9e]{background-color:#fff;height:100vh}body.?%PAGE?%[data-v-2518de9e]{background-color:#fff}",""]),t.exports=e},dc96:function(t,e,a){"use strict";var n;a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return s})),a.d(e,"a",(function(){return n}));var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",[a("cu-custom",{attrs:{bgColor:"bg-green",isBack:!0,showBackImg:!0}},[a("template",{attrs:{slot:"backText"},slot:"backText"},[t._v("苗木课堂")])],2),a("v-uni-view",{staticClass:"padding"},[a("v-uni-view",{staticClass:"text-lg text-bold bg-white text-center"},[t._v(t._s(t.detail.title))]),a("v-uni-view",{staticClass:"flex justify-end text-sm margin"},[a("v-uni-view",{staticClass:"text-gray"},[a("v-uni-text",{staticClass:"cuIcon-attention margin-right-xs"}),t._v(t._s(t.detail.view))],1),a("v-uni-view",{staticClass:"text-gray margin-left-sm text-sm"},[t._v(t._s(t.detail.created_at))])],1),a("v-uni-view",{domProps:{innerHTML:t._s(t.detail.content)}})],1)],1)},s=[]},e150:function(t,e,a){var n=a("d7f1");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=a("4f06").default;i("07fc022c",n,!0,{sourceMap:!1,shadowMode:!1})}}]);