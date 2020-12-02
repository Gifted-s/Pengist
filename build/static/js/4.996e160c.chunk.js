(window.webpackJsonpclient=window.webpackJsonpclient||[]).push([[4],{203:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},r=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),o=n(0),l=s(o),i=s(n(204)),c=s(n(207));function s(e){return e&&e.__esModule?e:{default:e}}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function p(e){var t=/(?:\.([^.]+))?$/.exec(e);return null!=t&&null!=t[0]?t[0]:""}var f=function(e){function t(){var e,n,a;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var r=arguments.length,o=Array(r),l=0;l<r;l++)o[l]=arguments[l];return n=a=u(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(o))),a.uploadTasks=[],a.handleFileSelection=function(e){for(var t=e.target.files,n=0;n<t.length;n++)a.startUpload(t[n])},u(a,n)}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.Component),r(t,[{key:"componentWillUnmount",value:function(){this.cancelRunningUploads()}},{key:"cancelRunningUploads",value:function(){for(;this.uploadTasks.length>0;){var e=this.uploadTasks.pop();"running"===e.snapshot.state&&e.cancel()}}},{key:"removeTask",value:function(e){for(var t=0;t<this.uploadTasks.length;t++)if(this.uploadTasks[t]===e)return void this.uploadTasks.splice(t,1)}},{key:"startUpload",value:function(e){var t=this,n=this.props,a=n.onUploadStart,r=n.onProgress,o=n.onUploadError,l=n.onUploadSuccess,s=n.storageRef,u=n.metadata,f=n.randomizeFilename,d=n.filename,m=void 0;p(m=d?"function"===typeof d?d(e):d:f?(0,i.default)():e.name)||(m+=p(e.name)),Promise.resolve().then(function(){return e.type.match(/image.*/)&&(t.props.maxWidth||t.props.maxHeight)?(0,c.default)(e,t.props.maxWidth,t.props.maxHeight):e}).then(function(e){var n=s.child(m).put(e,u);a&&a(e,n),n.on("state_changed",function(e){return r&&r(Math.round(100*e.bytesTransferred/e.totalBytes),n)},function(e){return o&&o(e,n)},function(){return t.removeTask(n),l&&l(n.snapshot.metadata.name,n)}),t.uploadTasks.push(n)})}},{key:"render",value:function(){var e=this.props,t=(e.storageRef,e.onUploadStart,e.onProgress,e.onUploadSuccess,e.onUploadError,e.randomizeFilename,e.metadata,e.filename,e.maxWidth,e.maxHeight,e.hidden),n=e.as,r=void 0===n?"input":n,o=function(e,t){var n={};for(var a in e)t.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a]);return n}(e,["storageRef","onUploadStart","onProgress","onUploadSuccess","onUploadError","randomizeFilename","metadata","filename","maxWidth","maxHeight","hidden","as"]),i=t?Object.assign({},o.style,{width:"0.1px",height:"0.1px",opacity:0,overflow:"hidden",position:"absolute",zIndex:-1}):o.style;return l.default.createElement(r,a({type:"file",onChange:this.handleFileSelection},o,{style:i}))}}]),t}();t.default=f},204:function(e,t,n){var a=n(205),r=n(206);e.exports=function(e,t,n){var o=t&&n||0;"string"==typeof e&&(t="binary"===e?new Array(16):null,e=null);var l=(e=e||{}).random||(e.rng||a)();if(l[6]=15&l[6]|64,l[8]=63&l[8]|128,t)for(var i=0;i<16;++i)t[o+i]=l[i];return t||r(l)}},205:function(e,t){var n="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(n){var a=new Uint8Array(16);e.exports=function(){return n(a),a}}else{var r=new Array(16);e.exports=function(){for(var e,t=0;t<16;t++)0===(3&t)&&(e=4294967296*Math.random()),r[t]=e>>>((3&t)<<3)&255;return r}}},206:function(e,t){for(var n=[],a=0;a<256;++a)n[a]=(a+256).toString(16).substr(1);e.exports=function(e,t){var a=t||0,r=n;return[r[e[a++]],r[e[a++]],r[e[a++]],r[e[a++]],"-",r[e[a++]],r[e[a++]],"-",r[e[a++]],r[e[a++]],"-",r[e[a++]],r[e[a++]],"-",r[e[a++]],r[e[a++]],r[e[a++]],r[e[a++]],r[e[a++]],r[e[a++]]].join("")}},207:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n){HTMLCanvasElement.prototype.toBlob||(0,o.default)();return new Promise(function(a,r){var o=new FileReader;o.onload=function(o){var l=new Image;l.onload=function(o){var i=document.createElement("canvas"),c=t||l.width,s=n||l.height;i.width=c,i.height=s;var u=c/l.width,p=s/l.height,f=Math.max(u,p),d=f*l.width,m=f*l.height,h=Math.min((s-m)/2,0),b=Math.min((c-d)/2,0),g=i.getContext("2d");if(!g)return r("Could not get the context of the canvas element");g.drawImage(l,b,h,d,m),i.toBlob(function(e){a(e)},e.type)},l.src=o.target.result},o.readAsDataURL(e)})};var a,r=n(208),o=(a=r)&&a.__esModule?a:{default:a}},208:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){Object.defineProperty(HTMLCanvasElement.prototype,"toBlob",{value:function(e,t,n){for(var a=atob(this.toDataURL(t,n).split(",")[1]),r=a.length,o=new Uint8Array(r),l=0;l<r;l++)o[l]=a.charCodeAt(l);e(new Blob([o],{type:t||"image/png"}))}})}},209:function(e,t,n){"use strict";function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],a=!0,r=!1,o=void 0;try{for(var l,i=e[Symbol.iterator]();!(a=(l=i.next()).done)&&(n.push(l.value),!t||n.length!==t);a=!0);}catch(c){r=!0,o=c}finally{try{a||null==i.return||i.return()}finally{if(r)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}n.d(t,"a",function(){return a})},211:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),o=n(6),l=n(209),i=n(0),c=n.n(i),s=n(5),u=n.n(s),p=n(203),f=n.n(p),d=n(48),m=n.n(d);t.default=function(e){e.back;var t=e.user,n=(e.change,Object(i.useState)("")),a=Object(l.a)(n,2),s=a[0],p=a[1],d=Object(i.useState)(!1),h=Object(l.a)(d,2),b=h[0],g=h[1],y=Object(i.useState)(0),v=Object(l.a)(y,2),w=v[0],E=v[1],O=Object(i.useState)(""),j=Object(l.a)(O,2),x=j[0],k=j[1],S=Object(i.useState)(""),U=Object(l.a)(S,2),_=(U[0],U[1]),P=Object(i.useState)(""),C=Object(l.a)(P,2),T=(C[0],C[1]),R=Object(i.useState)(""),M=Object(l.a)(R,2),N=M[0],A=M[1],F=Object(i.useState)(""),H=Object(l.a)(F,2),W=H[0],z=H[1],B=Object(i.useState)(""),I=Object(l.a)(B,2),L=I[0],V=I[1];function D(){return(D=Object(o.a)(r.a.mark(function e(){var n;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(W){e.next=2;break}return e.abrupt("return",u()("Oops","Enter title","error"));case 2:if(s){e.next=4;break}return e.abrupt("return",u()("Oops","Enter content please","error"));case 4:return u()("Please wait...","","info"),e.next=7,fetch("https://apiarticlepengist.herokuapp.com/post-tweet",{method:"Post",headers:{"Content-type":"application/json"},body:JSON.stringify({title:W,name:t.name,url:N,content:s,imageUrl:L})}).then(function(e){return e.json()}).then(function(e){return e}).catch(function(e){return e.message});case 7:if(n=e.sent,console.log(n),!n.error){e.next=13;break}return e.abrupt("return",u()("",n.error,"error"));case 13:if("Failed to fetch"!==n){e.next=17;break}return e.abrupt("return",u()("","we could not access the server try again and ensure internet connection is on","error"));case 17:u()("Tweet Posted","","success");case 18:case"end":return e.stop()}},e)}))).apply(this,arguments)}return c.a.createElement("div",{style:{paddingTop:45}},c.a.createElement("label",{className:"label_login"},"Enter the title of tweet"),c.a.createElement("br",null),c.a.createElement("input",{onChange:function(e){return z(e.target.value)},type:"text",placeholder:"Enter title",className:"input-box"}),c.a.createElement("br",null),c.a.createElement("div",null,c.a.createElement("label",{className:"mt-4"},"(Optional) Add image file(Image will show here after upload):"),b&&c.a.createElement("div",null,c.a.createElement("p",{style:{fontWeight:"bolder"}},"Uploading image please wait: ",w,"%"),c.a.createElement("div",{className:"progress mt-2 mb-2",style:{height:20}},c.a.createElement("div",{className:"progress-bar progress-bar-success",role:"progressbar",style:{width:"".concat(w,"%")},"aria-valuenow":"0","aria-valuemin":"0","aria-valuemax":"100"}))),x&&c.a.createElement("img",{alt:"image...",style:{width:126,height:120},src:x}),c.a.createElement(f.a,{accept:"image/*",name:"avatar",randomizeFilename:!0,storageRef:m.a.storage().ref("images"),onUploadStart:function(){g(!0),E(0)},onUploadError:function(e){g(!1),console.error(e)},onUploadSuccess:function(e){T(e),E(100),g(!1),m.a.storage().ref("images").child(e).getDownloadURL().then(function(e){k(e),V(e),_(e)})},onProgress:function(e){return E(e)}})),c.a.createElement("br",null),c.a.createElement("label",{className:"label_login mt-4"},"Enter tweet content "),c.a.createElement("br",null),c.a.createElement("textarea",{onChange:function(e){return p(e.target.value)},type:"text",placeholder:"Enter tweeter content",className:"form-control"}),c.a.createElement("br",null),c.a.createElement("label",{className:"label_login mt-4"},"(Optional) Enter url link to make readers read more"),c.a.createElement("br",null),c.a.createElement("input",{onChange:function(e){return A(e.target.value)},type:"text",placeholder:"Enter link",className:"input-box"}),c.a.createElement("br",null),c.a.createElement("button",{className:"btn btn-success mt-4 form-control",onClick:function(){!function(){D.apply(this,arguments)}()}},"Submit"))}}}]);
//# sourceMappingURL=4.996e160c.chunk.js.map