!function(){"use strict";const C="[PROMPT]",k="[TARGETLANGUAGE]",m="https://api.workengine.ai/api",h={PUBLIC:"public",OWN:"own"},s={SUCCESS:"success",WARNING:"warning",ERROR:"error"},T={UNKNOWN:0,PRIVATE:1,PUBLIC:2,PAID:3},o={UNKNOWN:0,GENERIC_CONCERN:1,GENERIC_LEGAL_CONCERN:2,LEGAL_COPYRIGHT:10,LEGAL_DMCA:11,LEGAL_TRADEMARK:12,PERSONAL_INFO:20,ABUSIVE:21,ILLEGAL:22,NOT_MULTILINGUAL:51,NOT_GENERIC:52,SPAM:91,PROMPT_SUPPORT_FREE:101,PROMPT_SUPPORT_PAID:102,PROMPT_SUPPORT_WANT_PAID:103},e=0,t=16,r=32;const S={UNKNOWN:0,DELETE_MARK:20,DELETE_DONE:29,INACTIVE:99,ACTIVE:100},N={UNKNOWN:0,INFO:1,SUCCESS:2,UPDATE:4,MANDATORY_MUST_CONFIRM:8},I={UNKNOWN:e,MESSAGE_LIKE:t,MESSAGE_DISLIKE:r},a={UNKNOWN:0,NORMAL:1,ADMIN:2,BLACKLIST_BAN:4,BLACKLIST_NO_WRITE:8,BLACKLIST_NO_PUBLIC:16},P=70005,Z=70009,G=70100,Y=70101,K=70102,X=70103,J=70104,Q=70105,ee=70106,te={[P]:"The requested action is not allowed.",[Z]:"You've reached the maximum number of prompts.",[G]:"The prompt title is not in English.",[Y]:"The prompt teaser is not in English.",[K]:"The prompt hint is not in English.",[X]:"The prompt title has too many uppercase letters.",[J]:"The prompt title is too long.",[Q]:"The prompt teaser has too many uppercase letters.",[ee]:"The prompt hint has too many uppercase letters."};class re extends Error{message="";constructor(e){super(e),this.message=e}static mapReactionNo(e){return new re(te[e]||"Something went wrong, please try again later.")}}var ae={APIEndpoint:m,User:null,async init(){return fetch("/api/auth/session").then(e=>{if(e.ok)return e.json();throw new Error("Network response was not OK.")}).then(e=>{this.User={Email:e.user.email,Name:e.user.name}})},savePrompt(e){var t=e;return t.RevisionTime=(new Date).toISOString(),t.AuthorName=this.User.Name,t.AuthorURL=this.User.Email,fetch(`${this.APIEndpoint}/prompts?user=${this.User.Email}&company=${IN_BOUND.Company}&id=`+e.ID,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...t})}).then(e=>Promise.all([e.json(),e])).then(([e,t])=>{if(t.ok)return e;if(e&&e.ReactionNo)throw re.mapReactionNo(e.ReactionNo);throw new Error("Network response was not OK.")})},pinActionForPrompt(e,t){return fetch(`${this.APIEndpoint}/prompts?user=${this.User.Email}&company=${IN_BOUND.Company}&id=`+e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pin:1===t})}).then(e=>{if(e.ok)return e;throw new Error("Network response was not OK")})},reportPrompt(e,t,r,a){return fetch(this.APIEndpoint+"?act=promptsFeedback&promptID="+e,{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify({FeedbackContact:a,FeedbackText:r,FeedbackTypeNo:t,PromptID:e,User:this.User})}).then(e=>{if(e.ok)return e;throw new Error("Network response was not OK")})},saveNewTone(e){return fetch(`${this.APIEndpoint}variations?user=${this.User.Email}&company=${IN_BOUND.Company}&id=`+e.id,{method:"POST",body:JSON.stringify({...e})}).then(e=>{if(e.ok)return e;throw new Error("Network response was not OK")})},saveEditTone(e){return fetch(`${this.APIEndpoint}/variations?user=${this.User.Email}&company=${IN_BOUND.Company}&id=`+e.id,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(e=>{if(e.ok)return e;throw new Error("Network response was not OK")})},deleteTone(e){return fetch(`${this.APIEndpoint}/variations?user=${this.User.Email}&company=${IN_BOUND.Company}&id=`+e,{method:"DELETE",headers:{"Content-Type":"application/json"}}).then(e=>{if(!e.ok)throw new Error("Network response was not OK")})},deletePrompt(e){return fetch(`${this.APIEndpoint}/prompt?user=${this.User.Email}&company=${IN_BOUND.Company}&id=`+e,{method:"DELETE",headers:{"Content-Type":"application/json"}}).then(e=>{if(!e.ok)throw new Error("Network response was not OK")})},voteForPrompt(e,t){return fetch(`${this.APIEndpoint}/prompts?user=${this.User.Email}&company=${IN_BOUND.Company}&id=`+e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({favourite:1===t})}).then(e=>{if(e.ok)return e;throw new Error("Network response was not OK")})},getBingResults(e){},getDdgResults(e){},getGoogleNewsResults(e){},getWebContentResults(e){}};function oe(t,e){var r,a=Object.keys(t);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(t),e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),a.push.apply(a,r)),a}function ie(a){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?oe(Object(o),!0).forEach(function(e){var t,r;t=a,r=o[e=e],e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(o)):oe(Object(o)).forEach(function(e){Object.defineProperty(a,e,Object.getOwnPropertyDescriptor(o,e))})}return a}function ne(e){return(ne="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function n(){return(n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r,a=arguments[t];for(r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}function le(e,t){if(null==e)return{};var r,a=function(e,t){if(null==e)return{};for(var r,a={},o=Object.keys(e),i=0;i<o.length;i++)r=o[i],0<=t.indexOf(r)||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols)for(var o=Object.getOwnPropertySymbols(e),i=0;i<o.length;i++)r=o[i],0<=t.indexOf(r)||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r]);return a}function se(e){return function(e){if(Array.isArray(e))return de(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){var r;if(e)return"string"==typeof e?de(e,t):"Map"===(r="Object"===(r=Object.prototype.toString.call(e).slice(8,-1))&&e.constructor?e.constructor.name:r)||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?de(e,t):void 0}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function de(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}function ce(e){if("undefined"!=typeof window&&window.navigator)return!!navigator.userAgent.match(e)}var pe=ce(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),he=ce(/Edge/i),ge=ce(/firefox/i),me=ce(/safari/i)&&!ce(/chrome/i)&&!ce(/android/i),ue=ce(/iP(ad|od|hone)/i),ve=ce(/chrome/i)&&ce(/android/i),ye={capture:!1,passive:!1};function d(e,t,r){e.addEventListener(t,r,!pe&&ye)}function i(e,t,r){e.removeEventListener(t,r,!pe&&ye)}function fe(e,t){if(t&&(">"===t[0]&&(t=t.substring(1)),e))try{if(e.matches)return e.matches(t);if(e.msMatchesSelector)return e.msMatchesSelector(t);if(e.webkitMatchesSelector)return e.webkitMatchesSelector(t)}catch(e){return}}function L(e,t,r,a){if(e){r=r||document;do{if(null!=t&&(">"!==t[0]||e.parentNode===r)&&fe(e,t)||a&&e===r)return e}while(e!==r&&(e=(o=e).host&&o!==document&&o.host.nodeType?o.host:o.parentNode))}var o;return null}var we,be=/\s+/g;function O(e,t,r){var a;e&&t&&(e.classList?e.classList[r?"add":"remove"](t):(a=(" "+e.className+" ").replace(be," ").replace(" "+t+" "," "),e.className=(a+(r?" "+t:"")).replace(be," ")))}function E(e,t,r){var a=e&&e.style;if(a){if(void 0===r)return document.defaultView&&document.defaultView.getComputedStyle?r=document.defaultView.getComputedStyle(e,""):e.currentStyle&&(r=e.currentStyle),void 0===t?r:r[t];a[t=t in a||-1!==t.indexOf("webkit")?t:"-webkit-"+t]=r+("string"==typeof r?"":"px")}}function xe(e,t){var r="";if("string"==typeof e)r=e;else do{var a=E(e,"transform")}while(a&&"none"!==a&&(r=a+" "+r),!t&&(e=e.parentNode));var o=window.DOMMatrix||window.WebKitCSSMatrix||window.CSSMatrix||window.MSCSSMatrix;return o&&new o(r)}function Ce(e,t,r){if(e){var a=e.getElementsByTagName(t),o=0,i=a.length;if(r)for(;o<i;o++)r(a[o],o);return a}return[]}function ke(){var e=document.scrollingElement;return e||document.documentElement}function M(e,t,r,a,o){if(e.getBoundingClientRect||e===window){var i,n,l,s,d,c,p=e!==window&&e.parentNode&&e!==ke()?(n=(i=e.getBoundingClientRect()).top,l=i.left,s=i.bottom,d=i.right,c=i.height,i.width):(l=n=0,s=window.innerHeight,d=window.innerWidth,c=window.innerHeight,window.innerWidth);if((t||r)&&e!==window&&(o=o||e.parentNode,!pe))do{if(o&&o.getBoundingClientRect&&("none"!==E(o,"transform")||r&&"static"!==E(o,"position"))){var h=o.getBoundingClientRect();n-=h.top+parseInt(E(o,"border-top-width")),l-=h.left+parseInt(E(o,"border-left-width")),s=n+i.height,d=l+i.width;break}}while(o=o.parentNode);return a&&e!==window&&(a=(t=xe(o||e))&&t.a,e=t&&t.d,t)&&(s=(n/=e)+(c/=e),d=(l/=a)+(p/=a)),{top:n,left:l,bottom:s,right:d,width:p,height:c}}}function Te(e,t,r){for(var a=De(e,!0),o=M(e)[t];a;){var i=M(a)[r];if(!("top"===r||"left"===r?i<=o:o<=i))return a;if(a===ke())break;a=De(a,!1)}return!1}function Se(e,t,r,a){for(var o=0,i=0,n=e.children;i<n.length;){if("none"!==n[i].style.display&&n[i]!==j.ghost&&(a||n[i]!==j.dragged)&&L(n[i],r.draggable,e,!1)){if(o===t)return n[i];o++}i++}return null}function Ne(e,t){for(var r=e.lastElementChild;r&&(r===j.ghost||"none"===E(r,"display")||t&&!fe(r,t));)r=r.previousElementSibling;return r||null}function _(e,t){var r=0;if(!e||!e.parentNode)return-1;for(;e=e.previousElementSibling;)"TEMPLATE"===e.nodeName.toUpperCase()||e===j.clone||t&&!fe(e,t)||r++;return r}function Ie(e){var t=0,r=0,a=ke();if(e)do{var o=xe(e),i=o.a,o=o.d}while(t+=e.scrollLeft*i,r+=e.scrollTop*o,e!==a&&(e=e.parentNode));return[t,r]}function De(e,t){if(e&&e.getBoundingClientRect){var r=e,a=!1;do{if(r.clientWidth<r.scrollWidth||r.clientHeight<r.scrollHeight){var o=E(r);if(r.clientWidth<r.scrollWidth&&("auto"==o.overflowX||"scroll"==o.overflowX)||r.clientHeight<r.scrollHeight&&("auto"==o.overflowY||"scroll"==o.overflowY)){if(!r.getBoundingClientRect||r===document.body)return ke();if(a||t)return r;a=!0}}}while(r=r.parentNode)}return ke()}function Pe(e,t){return Math.round(e.top)===Math.round(t.top)&&Math.round(e.left)===Math.round(t.left)&&Math.round(e.height)===Math.round(t.height)&&Math.round(e.width)===Math.round(t.width)}function Le(t,r){return function(){var e;we||(1===(e=arguments).length?t.call(this,e[0]):t.apply(this,e),we=setTimeout(function(){we=void 0},r))}}function Oe(e,t,r){e.scrollLeft+=t,e.scrollTop+=r}function Ee(e){var t=window.Polymer,r=window.jQuery||window.Zepto;return t&&t.dom?t.dom(e).cloneNode(!0):r?r(e).clone(!0)[0]:e.cloneNode(!0)}function Me(e,t){E(e,"position","absolute"),E(e,"top",t.top),E(e,"left",t.left),E(e,"width",t.width),E(e,"height",t.height)}function _e(e){E(e,"position",""),E(e,"top",""),E(e,"left",""),E(e,"width",""),E(e,"height","")}var $="Sortable"+(new Date).getTime();function $e(){var t,a=[];return{captureAnimationState:function(){a=[],this.options.animation&&[].slice.call(this.el.children).forEach(function(e){var t,r;"none"!==E(e,"display")&&e!==j.ghost&&(a.push({target:e,rect:M(e)}),t=ie({},a[a.length-1].rect),e.thisAnimationDuration&&(r=xe(e,!0))&&(t.top-=r.f,t.left-=r.e),e.fromRect=t)})},addAnimationState:function(e){a.push(e)},removeAnimationState:function(e){a.splice(function(e,t){for(var r in e)if(e.hasOwnProperty(r))for(var a in t)if(t.hasOwnProperty(a)&&t[a]===e[r][a])return Number(r);return-1}(a,{target:e}),1)},animateAll:function(e){var d,c,p=this;this.options.animation?(d=!1,c=0,a.forEach(function(e){var t,r=0,a=e.target,o=a.fromRect,i=M(a),n=a.prevFromRect,l=a.prevToRect,e=e.rect,s=xe(a,!0);s&&(i.top-=s.f,i.left-=s.e),a.toRect=i,a.thisAnimationDuration&&Pe(n,i)&&!Pe(o,i)&&(e.top-i.top)/(e.left-i.left)==(o.top-i.top)/(o.left-i.left)&&(s=e,n=n,l=l,t=p.options,r=Math.sqrt(Math.pow(n.top-s.top,2)+Math.pow(n.left-s.left,2))/Math.sqrt(Math.pow(n.top-l.top,2)+Math.pow(n.left-l.left,2))*t.animation),Pe(i,o)||(a.prevFromRect=o,a.prevToRect=i,r=r||p.options.animation,p.animate(a,e,i,r)),r&&(d=!0,c=Math.max(c,r),clearTimeout(a.animationResetTimer),a.animationResetTimer=setTimeout(function(){a.animationTime=0,a.prevFromRect=null,a.fromRect=null,a.prevToRect=null,a.thisAnimationDuration=null},r),a.thisAnimationDuration=r)}),clearTimeout(t),d?t=setTimeout(function(){"function"==typeof e&&e()},c):"function"==typeof e&&e(),a=[]):(clearTimeout(t),"function"==typeof e&&e())},animate:function(e,t,r,a){var o,i;a&&(E(e,"transition",""),E(e,"transform",""),i=(o=xe(this.el))&&o.a,o=o&&o.d,i=(t.left-r.left)/(i||1),t=(t.top-r.top)/(o||1),e.animatingX=!!i,e.animatingY=!!t,E(e,"transform","translate3d("+i+"px,"+t+"px,0)"),this.forRepaintDummy=e.offsetWidth,E(e,"transition","transform "+a+"ms"+(this.options.easing?" "+this.options.easing:"")),E(e,"transform","translate3d(0,0,0)"),"number"==typeof e.animated&&clearTimeout(e.animated),e.animated=setTimeout(function(){E(e,"transition",""),E(e,"transform",""),e.animated=!1,e.animatingX=!1,e.animatingY=!1},a))}}}var Be=[],Ue={initializeByDefault:!0},Ae={mount:function(t){for(var e in Ue)!Ue.hasOwnProperty(e)||e in t||(t[e]=Ue[e]);Be.forEach(function(e){if(e.pluginName===t.pluginName)throw"Sortable: Cannot mount plugin ".concat(t.pluginName," more than once")}),Be.push(t)},pluginEvent:function(t,r,a){var e=this,o=(this.eventCanceled=!1,a.cancel=function(){e.eventCanceled=!0},t+"Global");Be.forEach(function(e){r[e.pluginName]&&(r[e.pluginName][o]&&r[e.pluginName][o](ie({sortable:r},a)),r.options[e.pluginName])&&r[e.pluginName][t]&&r[e.pluginName][t](ie({sortable:r},a))})},initializePlugins:function(r,a,o,e){for(var t in Be.forEach(function(e){var t=e.pluginName;(r.options[t]||e.initializeByDefault)&&((e=new e(r,a,r.options)).sortable=r,e.options=r.options,r[t]=e,n(o,e.defaults))}),r.options){var i;r.options.hasOwnProperty(t)&&void 0!==(i=this.modifyOption(r,t,r.options[t]))&&(r.options[t]=i)}},getEventProperties:function(t,r){var a={};return Be.forEach(function(e){"function"==typeof e.eventProperties&&n(a,e.eventProperties.call(r[e.pluginName],t))}),a},modifyOption:function(t,r,a){var o;return Be.forEach(function(e){t[e.pluginName]&&e.optionListeners&&"function"==typeof e.optionListeners[r]&&(o=e.optionListeners[r].call(t[e.pluginName],a))}),o}};function Re(e){var t=e.sortable,r=e.rootEl,a=e.name,o=e.targetEl,i=e.cloneEl,n=e.toEl,l=e.fromEl,s=e.oldIndex,d=e.newIndex,c=e.oldDraggableIndex,p=e.newDraggableIndex,h=e.originalEvent,g=e.putSortable,e=e.extraEventProperties;if(t=t||r&&r[$]){var m,u,v=t.options,y="on"+a.charAt(0).toUpperCase()+a.substr(1),f=(!window.CustomEvent||pe||he?(m=document.createEvent("Event")).initEvent(a,!0,!0):m=new CustomEvent(a,{bubbles:!0,cancelable:!0}),m.to=n||r,m.from=l||r,m.item=o||r,m.clone=i,m.oldIndex=s,m.newIndex=d,m.oldDraggableIndex=c,m.newDraggableIndex=p,m.originalEvent=h,m.pullMode=g?g.lastPutMode:void 0,ie(ie({},e),Ae.getEventProperties(a,t)));for(u in f)m[u]=f[u];r&&r.dispatchEvent(m),v[y]&&v[y].call(t,m)}}function B(e,t){var r=(a=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{}).evt,a=le(a,Fe);Ae.pluginEvent.bind(j)(e,t,ie({dragEl:A,parentEl:R,ghostEl:F,rootEl:H,nextEl:Ze,lastDownEl:Ge,cloneEl:l,cloneHidden:Ye,dragStarted:it,putSortable:z,activeSortable:j.active,originalEvent:r,oldIndex:Ke,oldDraggableIndex:Xe,newIndex:V,newDraggableIndex:Je,hideGhostForTarget:ze,unhideGhostForTarget:je,cloneNowHidden:function(){Ye=!0},cloneNowShown:function(){Ye=!1},dispatchSortableEvent:function(e){U({sortable:t,name:e,originalEvent:r})}},a))}var Fe=["evt"];function U(e){Re(ie({putSortable:z,cloneEl:l,targetEl:A,rootEl:H,oldIndex:Ke,oldDraggableIndex:Xe,newIndex:V,newDraggableIndex:Je},e))}function He(e,t){var r,a=E(e),o=parseInt(a.width)-parseInt(a.paddingLeft)-parseInt(a.paddingRight)-parseInt(a.borderLeftWidth)-parseInt(a.borderRightWidth),i=Se(e,0,t),e=Se(e,1,t),t=i&&E(i),n=e&&E(e),l=t&&parseInt(t.marginLeft)+parseInt(t.marginRight)+M(i).width,s=n&&parseInt(n.marginLeft)+parseInt(n.marginRight)+M(e).width;return"flex"===a.display?"column"===a.flexDirection||"column-reverse"===a.flexDirection?"vertical":"horizontal":"grid"===a.display?a.gridTemplateColumns.split(" ").length<=1?"vertical":"horizontal":i&&t.float&&"none"!==t.float?(r="left"===t.float?"left":"right",!e||"both"!==n.clear&&n.clear!==r?"horizontal":"vertical"):i&&("block"===t.display||"flex"===t.display||"table"===t.display||"grid"===t.display||o<=l&&"none"===a[wt]||e&&"none"===a[wt]&&o<l+s)?"vertical":"horizontal"}function Ve(e){function l(i,n){return function(e,t,r,a){var o=e.options.group.name&&t.options.group.name&&e.options.group.name===t.options.group.name;return!(null!=i||!n&&!o)||null!=i&&!1!==i&&(n&&"clone"===i?i:"function"==typeof i?l(i(e,t,r,a),n)(e,t,r,a):(o=(n?e:t).options.group.name,!0===i||"string"==typeof i&&i===o||i.join&&-1<i.indexOf(o)))}}var t={},r=e.group;r&&"object"==ne(r)||(r={name:r}),t.name=r.name,t.checkPull=l(r.pull,!0),t.checkPut=l(r.put),t.revertClone=r.revertClone,e.group=t}function ze(){!xt&&F&&E(F,"display","none")}function je(){!xt&&F&&E(F,"display","")}function qe(e){if(A){e=e.touches?e.touches[0]:e;o=e.clientX,i=e.clientY,pt.some(function(e){var t,r,a=e[$].options.emptyInsertThreshold;if(a&&!Ne(e))return r=M(e),t=o>=r.left-a&&o<=r.right+a,r=i>=r.top-a&&i<=r.bottom+a,t&&r?n=e:void 0});var t=n;if(t){var r,a={};for(r in e)e.hasOwnProperty(r)&&(a[r]=e[r]);a.target=a.rootEl=t,a.preventDefault=void 0,a.stopPropagation=void 0,t[$]._onDragOver(a)}}var o,i,n}function We(e){A&&A.parentNode[$]._isOutsideThisEl(e.target)}var A,R,F,H,Ze,Ge,l,Ye,Ke,V,Xe,Je,Qe,z,et,c,tt,rt,at,ot,it,nt,lt,st,p,dt=!1,ct=!1,pt=[],ht=!1,gt=!1,mt=[],ut=!1,vt=[],yt="undefined"!=typeof document,ft=ue,wt=he||pe?"cssFloat":"float",bt=yt&&!ve&&!ue&&"draggable"in document.createElement("div"),xt=function(){var e;if(yt)return!pe&&((e=document.createElement("x")).style.cssText="pointer-events:auto","auto"===e.style.pointerEvents)}();yt&&!ve&&document.addEventListener("click",function(e){if(ct)return e.preventDefault(),e.stopPropagation&&e.stopPropagation(),e.stopImmediatePropagation&&e.stopImmediatePropagation(),ct=!1},!0);function j(e,t){if(!e||!e.nodeType||1!==e.nodeType)throw"Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(e));this.el=e,this.options=t=n({},t),e[$]=this;var r,a,o={group:null,sort:!0,disabled:!1,store:null,handle:null,draggable:/^[uo]l$/i.test(e.nodeName)?">li":">*",swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(){return He(e,this.options)},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(e,t){e.setData("Text",t.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:!1,touchStartThreshold:(Number.parseInt?Number:window).parseInt(window.devicePixelRatio,10)||1,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:!1!==j.supportPointer&&"PointerEvent"in window&&!me,emptyInsertThreshold:5};for(r in Ae.initializePlugins(this,e,o),o)r in t||(t[r]=o[r]);for(a in Ve(t),this)"_"===a.charAt(0)&&"function"==typeof this[a]&&(this[a]=this[a].bind(this));this.nativeDraggable=!t.forceFallback&&bt,this.nativeDraggable&&(this.options.touchStartThreshold=1),t.supportPointer?d(e,"pointerdown",this._onTapStart):(d(e,"mousedown",this._onTapStart),d(e,"touchstart",this._onTapStart)),this.nativeDraggable&&(d(e,"dragover",this),d(e,"dragenter",this)),pt.push(this.el),t.store&&t.store.get&&this.sort(t.store.get(this)||[]),n(this,$e())}function Ct(e,t,r,a,o,i,n,l){var s,d,c=e[$],p=c.options.onMove;return!window.CustomEvent||pe||he?(s=document.createEvent("Event")).initEvent("move",!0,!0):s=new CustomEvent("move",{bubbles:!0,cancelable:!0}),s.to=t,s.from=e,s.dragged=r,s.draggedRect=a,s.related=o||t,s.relatedRect=i||M(t),s.willInsertAfter=l,s.originalEvent=n,e.dispatchEvent(s),d=p?p.call(c,s,n):d}function kt(e){e.draggable=!1}function Tt(){ut=!1}function St(e){return setTimeout(e,0)}function Nt(e){return clearTimeout(e)}j.prototype={constructor:j,_isOutsideThisEl:function(e){this.el.contains(e)||e===this.el||(nt=null)},_getDirection:function(e,t){return"function"==typeof this.options.direction?this.options.direction.call(this,e,t,A):this.options.direction},_onTapStart:function(t){if(t.cancelable){for(var r=this,a=this.el,e=this.options,o=e.preventOnFilter,i=t.type,n=t.touches&&t.touches[0]||t.pointerType&&"touch"===t.pointerType&&t,l=(n||t).target,s=t.target.shadowRoot&&(t.path&&t.path[0]||t.composedPath&&t.composedPath()[0])||l,d=e.filter,c=a,p=(vt.length=0,c.getElementsByTagName("input")),h=p.length;h--;){var g=p[h];g.checked&&vt.push(g)}if(!A&&!(/mousedown|pointerdown/.test(i)&&0!==t.button||e.disabled)&&!s.isContentEditable&&(this.nativeDraggable||!me||!l||"SELECT"!==l.tagName.toUpperCase())&&!((l=L(l,e.draggable,a,!1))&&l.animated||Ge===l)){if(Ke=_(l),Xe=_(l,e.draggable),"function"==typeof d){if(d.call(this,t,l,this))return U({sortable:r,rootEl:s,name:"filter",targetEl:l,toEl:a,fromEl:a}),B("filter",r,{evt:t}),void(o&&t.cancelable&&t.preventDefault())}else if(d=d&&d.split(",").some(function(e){if(e=L(s,e.trim(),a,!1))return U({sortable:r,rootEl:e,name:"filter",targetEl:l,fromEl:a,toEl:a}),B("filter",r,{evt:t}),!0}))return void(o&&t.cancelable&&t.preventDefault());e.handle&&!L(s,e.handle,a,!1)||this._prepareDragStart(t,n,l)}}},_prepareDragStart:function(e,t,r){var a,o=this,i=o.el,n=o.options,l=i.ownerDocument;r&&!A&&r.parentNode===i&&(a=M(r),H=i,R=(A=r).parentNode,Ze=A.nextSibling,Ge=r,Qe=n.group,et={target:j.dragged=A,clientX:(t||e).clientX,clientY:(t||e).clientY},at=et.clientX-a.left,ot=et.clientY-a.top,this._lastX=(t||e).clientX,this._lastY=(t||e).clientY,A.style["will-change"]="all",i=function(){B("delayEnded",o,{evt:e}),j.eventCanceled?o._onDrop():(o._disableDelayedDragEvents(),!ge&&o.nativeDraggable&&(A.draggable=!0),o._triggerDragStart(e,t),U({sortable:o,name:"choose",originalEvent:e}),O(A,n.chosenClass,!0))},n.ignore.split(",").forEach(function(e){Ce(A,e.trim(),kt)}),d(l,"dragover",qe),d(l,"mousemove",qe),d(l,"touchmove",qe),d(l,"mouseup",o._onDrop),d(l,"touchend",o._onDrop),d(l,"touchcancel",o._onDrop),ge&&this.nativeDraggable&&(this.options.touchStartThreshold=4,A.draggable=!0),B("delayStart",this,{evt:e}),!n.delay||n.delayOnTouchOnly&&!t||this.nativeDraggable&&(he||pe)?i():j.eventCanceled?this._onDrop():(d(l,"mouseup",o._disableDelayedDrag),d(l,"touchend",o._disableDelayedDrag),d(l,"touchcancel",o._disableDelayedDrag),d(l,"mousemove",o._delayedDragTouchMoveHandler),d(l,"touchmove",o._delayedDragTouchMoveHandler),n.supportPointer&&d(l,"pointermove",o._delayedDragTouchMoveHandler),o._dragStartTimer=setTimeout(i,n.delay)))},_delayedDragTouchMoveHandler:function(e){e=e.touches?e.touches[0]:e;Math.max(Math.abs(e.clientX-this._lastX),Math.abs(e.clientY-this._lastY))>=Math.floor(this.options.touchStartThreshold/(this.nativeDraggable&&window.devicePixelRatio||1))&&this._disableDelayedDrag()},_disableDelayedDrag:function(){A&&kt(A),clearTimeout(this._dragStartTimer),this._disableDelayedDragEvents()},_disableDelayedDragEvents:function(){var e=this.el.ownerDocument;i(e,"mouseup",this._disableDelayedDrag),i(e,"touchend",this._disableDelayedDrag),i(e,"touchcancel",this._disableDelayedDrag),i(e,"mousemove",this._delayedDragTouchMoveHandler),i(e,"touchmove",this._delayedDragTouchMoveHandler),i(e,"pointermove",this._delayedDragTouchMoveHandler)},_triggerDragStart:function(e,t){t=t||"touch"==e.pointerType&&e,!this.nativeDraggable||t?this.options.supportPointer?d(document,"pointermove",this._onTouchMove):d(document,t?"touchmove":"mousemove",this._onTouchMove):(d(A,"dragend",this),d(H,"dragstart",this._onDragStart));try{document.selection?St(function(){document.selection.empty()}):window.getSelection().removeAllRanges()}catch(e){}},_dragStarted:function(e,t){var r;dt=!1,H&&A?(B("dragStarted",this,{evt:t}),this.nativeDraggable&&d(document,"dragover",We),r=this.options,e||O(A,r.dragClass,!1),O(A,r.ghostClass,!0),j.active=this,e&&this._appendGhost(),U({sortable:this,name:"start",originalEvent:t})):this._nulling()},_emulateDragOver:function(){if(c){this._lastX=c.clientX,this._lastY=c.clientY,ze();for(var e=document.elementFromPoint(c.clientX,c.clientY),t=e;e&&e.shadowRoot&&(e=e.shadowRoot.elementFromPoint(c.clientX,c.clientY))!==t;)t=e;if(A.parentNode[$]._isOutsideThisEl(e),t)do{if(t[$])if(t[$]._onDragOver({clientX:c.clientX,clientY:c.clientY,target:e,rootEl:t})&&!this.options.dragoverBubble)break}while(t=(e=t).parentNode);je()}},_onTouchMove:function(e){if(et){var t=this.options,r=t.fallbackTolerance,t=t.fallbackOffset,a=e.touches?e.touches[0]:e,o=F&&xe(F,!0),i=F&&o&&o.a,n=F&&o&&o.d,l=ft&&p&&Ie(p),i=(a.clientX-et.clientX+t.x)/(i||1)+(l?l[0]-mt[0]:0)/(i||1),t=(a.clientY-et.clientY+t.y)/(n||1)+(l?l[1]-mt[1]:0)/(n||1);if(!j.active&&!dt){if(r&&Math.max(Math.abs(a.clientX-this._lastX),Math.abs(a.clientY-this._lastY))<r)return;this._onDragStart(e,!0)}F&&(o?(o.e+=i-(tt||0),o.f+=t-(rt||0)):o={a:1,b:0,c:0,d:1,e:i,f:t},l="matrix(".concat(o.a,",").concat(o.b,",").concat(o.c,",").concat(o.d,",").concat(o.e,",").concat(o.f,")"),E(F,"webkitTransform",l),E(F,"mozTransform",l),E(F,"msTransform",l),E(F,"transform",l),tt=i,rt=t,c=a),e.cancelable&&e.preventDefault()}},_appendGhost:function(){if(!F){var e=this.options.fallbackOnBody?document.body:H,t=M(A,!0,ft,!0,e),r=this.options;if(ft){for(p=e;"static"===E(p,"position")&&"none"===E(p,"transform")&&p!==document;)p=p.parentNode;p!==document.body&&p!==document.documentElement?(p===document&&(p=ke()),t.top+=p.scrollTop,t.left+=p.scrollLeft):p=ke(),mt=Ie(p)}O(F=A.cloneNode(!0),r.ghostClass,!1),O(F,r.fallbackClass,!0),O(F,r.dragClass,!0),E(F,"transition",""),E(F,"transform",""),E(F,"box-sizing","border-box"),E(F,"margin",0),E(F,"top",t.top),E(F,"left",t.left),E(F,"width",t.width),E(F,"height",t.height),E(F,"opacity","0.8"),E(F,"position",ft?"absolute":"fixed"),E(F,"zIndex","100000"),E(F,"pointerEvents","none"),j.ghost=F,e.appendChild(F),E(F,"transform-origin",at/parseInt(F.style.width)*100+"% "+ot/parseInt(F.style.height)*100+"%")}},_onDragStart:function(e,t){var r=this,a=e.dataTransfer,o=r.options;B("dragStart",this,{evt:e}),j.eventCanceled?this._onDrop():(B("setupClone",this),j.eventCanceled||((l=Ee(A)).removeAttribute("id"),l.draggable=!1,l.style["will-change"]="",this._hideClone(),O(l,this.options.chosenClass,!1),j.clone=l),r.cloneId=St(function(){B("clone",r),j.eventCanceled||(r.options.removeCloneOnHide||H.insertBefore(l,A),r._hideClone(),U({sortable:r,name:"clone"}))}),t||O(A,o.dragClass,!0),t?(ct=!0,r._loopId=setInterval(r._emulateDragOver,50)):(i(document,"mouseup",r._onDrop),i(document,"touchend",r._onDrop),i(document,"touchcancel",r._onDrop),a&&(a.effectAllowed="move",o.setData)&&o.setData.call(r,a,A),d(document,"drop",r),E(A,"transform","translateZ(0)")),dt=!0,r._dragStartId=St(r._dragStarted.bind(r,t,e)),d(document,"selectstart",r),it=!0,me&&E(document.body,"user-select","none"))},_onDragOver:function(r){var a,o,i,n=this.el,l=r.target,t=this.options,e=t.group,s=j.active,d=Qe===e,c=t.sort,p=z||s,h=this,g=!1;if(!ut){if(void 0!==r.preventDefault&&r.cancelable&&r.preventDefault(),l=L(l,t.draggable,n,!0),N("dragOver"),j.eventCanceled)return g;if(A.contains(r.target)||l.animated&&l.animatingX&&l.animatingY||h._ignoreWhileAnimating===l)return D(!1);if(ct=!1,s&&!t.disabled&&(d?c||(o=R!==H):z===this||(this.lastPutMode=Qe.checkPull(this,s,A,r))&&e.checkPut(this,s,A,r))){if(i="vertical"===this._getDirection(r,l),a=M(A),N("dragOverValid"),j.eventCanceled)return g;if(o)return R=H,I(),this._hideClone(),N("revert"),j.eventCanceled||(Ze?H.insertBefore(A,Ze):H.appendChild(A)),D(!0);e=Ne(n,t.draggable);if(!e||function(e,t,r){r=M(Ne(r.el,r.options.draggable));return t?e.clientX>r.right+10||e.clientX<=r.right&&e.clientY>r.bottom&&e.clientX>=r.left:e.clientX>r.right&&e.clientY>r.top||e.clientX<=r.right&&e.clientY>r.bottom+10}(r,i,this)&&!e.animated){if(e===A)return D(!1);if((l=e&&n===r.target?e:l)&&(y=M(l)),!1!==Ct(H,n,A,a,l,y,r,!!l))return I(),e&&e.nextSibling?n.insertBefore(A,e.nextSibling):n.appendChild(A),R=n,P(),D(!0)}else if(e&&function(e,t,r){r=M(Se(r.el,0,r.options,!0));return t?e.clientX<r.left-10||e.clientY<r.top&&e.clientX<r.right:e.clientY<r.top-10||e.clientY<r.bottom&&e.clientX<r.left}(r,i,this)){e=Se(n,0,t,!0);if(e===A)return D(!1);if(y=M(l=e),!1!==Ct(H,n,A,a,l,y,r,!1))return I(),n.insertBefore(A,e),R=n,P(),D(!0)}else if(l.parentNode===n){var m,u,v,y=M(l),e=A.parentNode!==n,f=(k=A.animated&&A.toRect||a,f=l.animated&&l.toRect||y,x=(S=i)?k.left:k.top,w=S?k.right:k.bottom,k=S?k.width:k.height,T=S?f.left:f.top,b=S?f.right:f.bottom,S=S?f.width:f.height,!(x===T||w===b||x+k/2===T+S/2)),w=i?"top":"left",b=Te(l,"top","top")||Te(A,"top","top"),x=b?b.scrollTop:void 0;if(nt!==l&&(u=y[w],ht=!1,gt=!f&&t.invertSwap||e),0!==(m=function(e,t,r,a,o,i,n,l){var e=a?e.clientY:e.clientX,s=a?r.height:r.width,d=a?r.top:r.left,a=a?r.bottom:r.right,r=!1;if(!n)if(l&&st<s*o){if(ht=!ht&&(1===lt?d+s*i/2<e:e<a-s*i/2)?!0:ht)r=!0;else if(1===lt?e<d+st:a-st<e)return-lt}else if(d+s*(1-o)/2<e&&e<a-s*(1-o)/2)return function(e){return _(A)<_(e)?1:-1}(t);if((r=r||n)&&(e<d+s*i/2||a-s*i/2<e))return d+s/2<e?1:-1;return 0}(r,l,y,i,f?1:t.swapThreshold,null==t.invertedSwapThreshold?t.swapThreshold:t.invertedSwapThreshold,gt,nt===l)))for(var C=_(A);(v=R.children[C-=m])&&("none"===E(v,"display")||v===F););if(0===m||v===l)return D(!1);lt=m;var k=(nt=l).nextElementSibling,T=!1,S=Ct(H,n,A,a,l,y,r,T=1===m);if(!1!==S)return 1!==S&&-1!==S||(T=1===S),ut=!0,setTimeout(Tt,30),I(),T&&!k?n.appendChild(A):l.parentNode.insertBefore(A,T?k:l),b&&Oe(b,0,x-b.scrollTop),R=A.parentNode,void 0===u||gt||(st=Math.abs(u-M(l)[w])),P(),D(!0)}if(n.contains(A))return D(!1)}return!1}function N(e,t){B(e,h,ie({evt:r,isOwner:d,axis:i?"vertical":"horizontal",revert:o,dragRect:a,targetRect:y,canSort:c,fromSortable:p,target:l,completed:D,onMove:function(e,t){return Ct(H,n,A,a,e,M(e),r,t)},changed:P},t))}function I(){N("dragOverAnimationCapture"),h.captureAnimationState(),h!==p&&p.captureAnimationState()}function D(e){return N("dragOverCompleted",{insertion:e}),e&&(d?s._hideClone():s._showClone(h),h!==p&&(O(A,(z||s).options.ghostClass,!1),O(A,t.ghostClass,!0)),z!==h&&h!==j.active?z=h:h===j.active&&(z=z&&null),p===h&&(h._ignoreWhileAnimating=l),h.animateAll(function(){N("dragOverAnimationComplete"),h._ignoreWhileAnimating=null}),h!==p)&&(p.animateAll(),p._ignoreWhileAnimating=null),(l===A&&!A.animated||l===n&&!l.animated)&&(nt=null),t.dragoverBubble||r.rootEl||l===document||(A.parentNode[$]._isOutsideThisEl(r.target),e)||qe(r),!t.dragoverBubble&&r.stopPropagation&&r.stopPropagation(),g=!0}function P(){V=_(A),Je=_(A,t.draggable),U({sortable:h,name:"change",toEl:n,newIndex:V,newDraggableIndex:Je,originalEvent:r})}},_ignoreWhileAnimating:null,_offMoveEvents:function(){i(document,"mousemove",this._onTouchMove),i(document,"touchmove",this._onTouchMove),i(document,"pointermove",this._onTouchMove),i(document,"dragover",qe),i(document,"mousemove",qe),i(document,"touchmove",qe)},_offUpEvents:function(){var e=this.el.ownerDocument;i(e,"mouseup",this._onDrop),i(e,"touchend",this._onDrop),i(e,"pointerup",this._onDrop),i(e,"touchcancel",this._onDrop),i(document,"selectstart",this)},_onDrop:function(e){var t=this.el,r=this.options;V=_(A),Je=_(A,r.draggable),B("drop",this,{evt:e}),R=A&&A.parentNode,V=_(A),Je=_(A,r.draggable),j.eventCanceled||(ht=gt=dt=!1,clearInterval(this._loopId),clearTimeout(this._dragStartTimer),Nt(this.cloneId),Nt(this._dragStartId),this.nativeDraggable&&(i(document,"drop",this),i(t,"dragstart",this._onDragStart)),this._offMoveEvents(),this._offUpEvents(),me&&E(document.body,"user-select",""),E(A,"transform",""),e&&(it&&(e.cancelable&&e.preventDefault(),r.dropBubble||e.stopPropagation()),F&&F.parentNode&&F.parentNode.removeChild(F),(H===R||z&&"clone"!==z.lastPutMode)&&l&&l.parentNode&&l.parentNode.removeChild(l),A)&&(this.nativeDraggable&&i(A,"dragend",this),kt(A),A.style["will-change"]="",it&&!dt&&O(A,(z||this).options.ghostClass,!1),O(A,this.options.chosenClass,!1),U({sortable:this,name:"unchoose",toEl:R,newIndex:null,newDraggableIndex:null,originalEvent:e}),H!==R?(0<=V&&(U({rootEl:R,name:"add",toEl:R,fromEl:H,originalEvent:e}),U({sortable:this,name:"remove",toEl:R,originalEvent:e}),U({rootEl:R,name:"sort",toEl:R,fromEl:H,originalEvent:e}),U({sortable:this,name:"sort",toEl:R,originalEvent:e})),z&&z.save()):V!==Ke&&0<=V&&(U({sortable:this,name:"update",toEl:R,originalEvent:e}),U({sortable:this,name:"sort",toEl:R,originalEvent:e})),j.active)&&(null!=V&&-1!==V||(V=Ke,Je=Xe),U({sortable:this,name:"end",toEl:R,originalEvent:e}),this.save())),this._nulling()},_nulling:function(){B("nulling",this),H=A=R=F=Ze=l=Ge=Ye=et=c=it=V=Je=Ke=Xe=nt=lt=z=Qe=j.dragged=j.ghost=j.clone=j.active=null,vt.forEach(function(e){e.checked=!0}),vt.length=tt=rt=0},handleEvent:function(e){switch(e.type){case"drop":case"dragend":this._onDrop(e);break;case"dragenter":case"dragover":var t;A&&(this._onDragOver(e),(t=e).dataTransfer&&(t.dataTransfer.dropEffect="move"),t.cancelable)&&t.preventDefault();break;case"selectstart":e.preventDefault()}},toArray:function(){for(var e,t=[],r=this.el.children,a=0,o=r.length,i=this.options;a<o;a++)L(e=r[a],i.draggable,this.el,!1)&&t.push(e.getAttribute(i.dataIdAttr)||function(e){var t=e.tagName+e.className+e.src+e.href+e.textContent,r=t.length,a=0;for(;r--;)a+=t.charCodeAt(r);return a.toString(36)}(e));return t},sort:function(e,t){var r={},a=this.el;this.toArray().forEach(function(e,t){t=a.children[t];L(t,this.options.draggable,a,!1)&&(r[e]=t)},this),t&&this.captureAnimationState(),e.forEach(function(e){r[e]&&(a.removeChild(r[e]),a.appendChild(r[e]))}),t&&this.animateAll()},save:function(){var e=this.options.store;e&&e.set&&e.set(this)},closest:function(e,t){return L(e,t||this.options.draggable,this.el,!1)},option:function(e,t){var r=this.options;if(void 0===t)return r[e];var a=Ae.modifyOption(this,e,t);r[e]=void 0!==a?a:t,"group"===e&&Ve(r)},destroy:function(){B("destroy",this);var e=this.el;e[$]=null,i(e,"mousedown",this._onTapStart),i(e,"touchstart",this._onTapStart),i(e,"pointerdown",this._onTapStart),this.nativeDraggable&&(i(e,"dragover",this),i(e,"dragenter",this)),Array.prototype.forEach.call(e.querySelectorAll("[draggable]"),function(e){e.removeAttribute("draggable")}),this._onDrop(),this._disableDelayedDragEvents(),pt.splice(pt.indexOf(this.el),1),this.el=e=null},_hideClone:function(){Ye||(B("hideClone",this),j.eventCanceled)||(E(l,"display","none"),this.options.removeCloneOnHide&&l.parentNode&&l.parentNode.removeChild(l),Ye=!0)},_showClone:function(e){"clone"!==e.lastPutMode?this._hideClone():Ye&&(B("showClone",this),j.eventCanceled||(A.parentNode!=H||this.options.group.revertClone?Ze?H.insertBefore(l,Ze):H.appendChild(l):H.insertBefore(l,A),this.options.group.revertClone&&this.animate(A,l),E(l,"display",""),Ye=!1))}},yt&&d(document,"touchmove",function(e){(j.active||dt)&&e.cancelable&&e.preventDefault()}),j.utils={on:d,off:i,css:E,find:Ce,is:function(e,t){return!!L(e,t,e,!1)},extend:function(e,t){if(e&&t)for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);return e},throttle:Le,closest:L,toggleClass:O,clone:Ee,index:_,nextTick:St,cancelNextTick:Nt,detectDirection:He,getChild:Se},j.get=function(e){return e[$]},j.mount=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];(t=t[0].constructor===Array?t[0]:t).forEach(function(e){if(!e.prototype||!e.prototype.constructor)throw"Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(e));e.utils&&(j.utils=ie(ie({},j.utils),e.utils)),Ae.mount(e)})},j.create=function(e,t){return new j(e,t)};var It,Dt,Pt,Lt,Ot,Et,D=[],Mt=!(j.version="1.15.0");function _t(){D.forEach(function(e){clearInterval(e.pid)}),D=[]}function $t(){clearInterval(Et)}function Bt(e){var t=e.originalEvent,r=e.putSortable,a=e.dragEl,o=e.activeSortable,i=e.dispatchSortableEvent,n=e.hideGhostForTarget,e=e.unhideGhostForTarget;t&&(o=r||o,n(),n=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:t,t=document.elementFromPoint(n.clientX,n.clientY),e(),o)&&!o.el.contains(t)&&(i("spill"),this.onSpill({dragEl:a,putSortable:r}))}var Ut,At=Le(function(r,e,t,a){if(e.scroll){var o,i=(r.touches?r.touches[0]:r).clientX,n=(r.touches?r.touches[0]:r).clientY,l=e.scrollSensitivity,s=e.scrollSpeed,d=ke(),c=!1,p=0,h=It=Dt!==t&&(Dt=t,_t(),It=e.scroll,o=e.scrollFn,!0===It)?De(t,!0):It;do{var g=h,m=M(g),u=m.top,v=m.bottom,y=m.left,f=m.right,w=m.width,m=m.height,b=void 0,x=void 0,C=g.scrollWidth,k=g.scrollHeight,T=E(g),S=g.scrollLeft,N=g.scrollTop,x=g===d?(b=w<C&&("auto"===T.overflowX||"scroll"===T.overflowX||"visible"===T.overflowX),m<k&&("auto"===T.overflowY||"scroll"===T.overflowY||"visible"===T.overflowY)):(b=w<C&&("auto"===T.overflowX||"scroll"===T.overflowX),m<k&&("auto"===T.overflowY||"scroll"===T.overflowY)),T=b&&(Math.abs(f-i)<=l&&S+w<C)-(Math.abs(y-i)<=l&&!!S),b=x&&(Math.abs(v-n)<=l&&N+m<k)-(Math.abs(u-n)<=l&&!!N);if(!D[p])for(var I=0;I<=p;I++)D[I]||(D[I]={});D[p].vx==T&&D[p].vy==b&&D[p].el===g||(D[p].el=g,D[p].vx=T,D[p].vy=b,clearInterval(D[p].pid),0==T&&0==b)||(c=!0,D[p].pid=setInterval(function(){a&&0===this.layer&&j.active._onTouchMove(Ot);var e=D[this.layer].vy?D[this.layer].vy*s:0,t=D[this.layer].vx?D[this.layer].vx*s:0;"function"==typeof o&&"continue"!==o.call(j.dragged.parentNode[$],t,e,r,Ot,D[this.layer].el)||Oe(D[this.layer].el,t,e)}.bind({layer:p}),24)),p++}while(e.bubbleScroll&&h!==d&&(h=De(h,!1)));Mt=c}},30);function Rt(){}function Ft(){}Rt.prototype={startIndex:null,dragStart:function(e){e=e.oldDraggableIndex;this.startIndex=e},onSpill:function(e){var t=e.dragEl,e=e.putSortable,r=(this.sortable.captureAnimationState(),e&&e.captureAnimationState(),Se(this.sortable.el,this.startIndex,this.options));r?this.sortable.el.insertBefore(t,r):this.sortable.el.appendChild(t),this.sortable.animateAll(),e&&e.animateAll()},drop:Bt},n(Rt,{pluginName:"revertOnSpill"}),Ft.prototype={onSpill:function(e){var t=e.dragEl,e=e.putSortable||this.sortable;e.captureAnimationState(),t.parentNode&&t.parentNode.removeChild(t),e.animateAll()},drop:Bt},n(Ft,{pluginName:"removeOnSpill"});var Ht,Vt,y,zt,jt,f=[],w=[],qt=!1,b=!1,Wt=!1;function Zt(r,a){w.forEach(function(e,t){t=a.children[e.sortableIndex+(r?Number(t):0)];t?a.insertBefore(e,t):a.appendChild(e)})}function Gt(){f.forEach(function(e){e!==y&&e.parentNode&&e.parentNode.removeChild(e)})}j.mount(new function(){function e(){for(var e in this.defaults={scroll:!0,forceAutoScrollFallback:!1,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0},this)"_"===e.charAt(0)&&"function"==typeof this[e]&&(this[e]=this[e].bind(this))}return e.prototype={dragStarted:function(e){e=e.originalEvent;this.sortable.nativeDraggable?d(document,"dragover",this._handleAutoScroll):this.options.supportPointer?d(document,"pointermove",this._handleFallbackAutoScroll):e.touches?d(document,"touchmove",this._handleFallbackAutoScroll):d(document,"mousemove",this._handleFallbackAutoScroll)},dragOverCompleted:function(e){e=e.originalEvent;this.options.dragOverBubble||e.rootEl||this._handleAutoScroll(e)},drop:function(){this.sortable.nativeDraggable?i(document,"dragover",this._handleAutoScroll):(i(document,"pointermove",this._handleFallbackAutoScroll),i(document,"touchmove",this._handleFallbackAutoScroll),i(document,"mousemove",this._handleFallbackAutoScroll)),$t(),_t(),clearTimeout(we),we=void 0},nulling:function(){Ot=Dt=It=Mt=Et=Pt=Lt=null,D.length=0},_handleFallbackAutoScroll:function(e){this._handleAutoScroll(e,!0)},_handleAutoScroll:function(t,r){var a,o=this,i=(t.touches?t.touches[0]:t).clientX,n=(t.touches?t.touches[0]:t).clientY,e=document.elementFromPoint(i,n);Ot=t,r||this.options.forceAutoScrollFallback||he||pe||me?(At(t,this.options,e,r),a=De(e,!0),!Mt||Et&&i===Pt&&n===Lt||(Et&&$t(),Et=setInterval(function(){var e=De(document.elementFromPoint(i,n),!0);e!==a&&(a=e,_t()),At(t,o.options,e,r)},10),Pt=i,Lt=n)):this.options.bubbleScroll&&De(e,!0)!==ke()?At(t,this.options,De(e,!1),!1):_t()}},n(e,{pluginName:"scroll",initializeByDefault:!0})}),j.mount(Ft,Rt),j.mount(new function(){function e(){this.defaults={swapClass:"sortable-swap-highlight"}}return e.prototype={dragStart:function(e){e=e.dragEl;Ut=e},dragOverValid:function(e){var t,r=e.completed,a=e.target,o=e.onMove,i=e.activeSortable,n=e.changed,e=e.cancel;i.options.swap&&(i=this.sortable.el,t=this.options,a&&a!==i&&(i=Ut,Ut=!1!==o(a)?(O(a,t.swapClass,!0),a):null,i)&&i!==Ut&&O(i,t.swapClass,!1),n(),r(!0),e())},drop:function(e){var t,r,a,o=e.activeSortable,i=e.putSortable,e=e.dragEl,n=i||this.sortable,l=this.options;Ut&&O(Ut,l.swapClass,!1),Ut&&(l.swap||i&&i.options.swap)&&e!==Ut&&(n.captureAnimationState(),n!==o&&o.captureAnimationState(),l=Ut,e=(i=e).parentNode,a=l.parentNode,e&&a&&!e.isEqualNode(l)&&!a.isEqualNode(i)&&(t=_(i),r=_(l),e.isEqualNode(a)&&t<r&&r++,e.insertBefore(l,e.children[t]),a.insertBefore(i,a.children[r])),n.animateAll(),n!==o)&&o.animateAll()},nulling:function(){Ut=null}},n(e,{pluginName:"swap",eventProperties:function(){return{swapItem:Ut}}})}),j.mount(new function(){function e(a){for(var e in this)"_"===e.charAt(0)&&"function"==typeof this[e]&&(this[e]=this[e].bind(this));a.options.avoidImplicitDeselect||(a.options.supportPointer?d(document,"pointerup",this._deselectMultiDrag):(d(document,"mouseup",this._deselectMultiDrag),d(document,"touchend",this._deselectMultiDrag))),d(document,"keydown",this._checkKeyDown),d(document,"keyup",this._checkKeyUp),this.defaults={selectedClass:"sortable-selected",multiDragKey:null,avoidImplicitDeselect:!1,setData:function(e,t){var r="";f.length&&Vt===a?f.forEach(function(e,t){r+=(t?", ":"")+e.textContent}):r=t.textContent,e.setData("Text",r)}}}return e.prototype={multiDragKeyDown:!1,isMultiDrag:!1,delayStartGlobal:function(e){e=e.dragEl;y=e},delayEnded:function(){this.isMultiDrag=~f.indexOf(y)},setupClone:function(e){var t=e.sortable,e=e.cancel;if(this.isMultiDrag){for(var r=0;r<f.length;r++)w.push(Ee(f[r])),w[r].sortableIndex=f[r].sortableIndex,w[r].draggable=!1,w[r].style["will-change"]="",O(w[r],this.options.selectedClass,!1),f[r]===y&&O(w[r],this.options.chosenClass,!1);t._hideClone(),e()}},clone:function(e){var t=e.sortable,r=e.rootEl,a=e.dispatchSortableEvent,e=e.cancel;this.isMultiDrag&&!this.options.removeCloneOnHide&&f.length&&Vt===t&&(Zt(!0,r),a("clone"),e())},showClone:function(e){var t=e.cloneNowShown,r=e.rootEl,e=e.cancel;this.isMultiDrag&&(Zt(!1,r),w.forEach(function(e){E(e,"display","")}),t(),jt=!1,e())},hideClone:function(e){var t=this,r=(e.sortable,e.cloneNowHidden),e=e.cancel;this.isMultiDrag&&(w.forEach(function(e){E(e,"display","none"),t.options.removeCloneOnHide&&e.parentNode&&e.parentNode.removeChild(e)}),r(),jt=!0,e())},dragStartGlobal:function(e){e.sortable,!this.isMultiDrag&&Vt&&Vt.multiDrag._deselectMultiDrag(),f.forEach(function(e){e.sortableIndex=_(e)}),f=f.sort(function(e,t){return e.sortableIndex-t.sortableIndex}),Wt=!0},dragStarted:function(e){var t,r=this,e=e.sortable;this.isMultiDrag&&(this.options.sort&&(e.captureAnimationState(),this.options.animation)&&(f.forEach(function(e){e!==y&&E(e,"position","absolute")}),t=M(y,!1,!0,!0),f.forEach(function(e){e!==y&&Me(e,t)}),qt=b=!0),e.animateAll(function(){qt=b=!1,r.options.animation&&f.forEach(function(e){_e(e)}),r.options.sort&&Gt()}))},dragOver:function(e){var t=e.target,r=e.completed,e=e.cancel;b&&~f.indexOf(t)&&(r(!1),e())},revert:function(e){var r,a,t=e.fromSortable,o=e.rootEl,i=e.sortable,n=e.dragRect;1<f.length&&(f.forEach(function(e){i.addAnimationState({target:e,rect:b?M(e):n}),_e(e),e.fromRect=n,t.removeAnimationState(e)}),b=!1,r=!this.options.removeCloneOnHide,a=o,f.forEach(function(e,t){t=a.children[e.sortableIndex+(r?Number(t):0)];t?a.insertBefore(e,t):a.appendChild(e)}))},dragOverCompleted:function(e){var t,r=e.sortable,a=e.isOwner,o=e.insertion,i=e.activeSortable,n=e.parentEl,e=e.putSortable,l=this.options;o&&(a&&i._hideClone(),qt=!1,l.animation&&1<f.length&&(b||!a&&!i.options.sort&&!e)&&(t=M(y,!1,!0,!0),f.forEach(function(e){e!==y&&(Me(e,t),n.appendChild(e))}),b=!0),a||(b||Gt(),1<f.length?(o=jt,i._showClone(r),i.options.animation&&!jt&&o&&w.forEach(function(e){i.addAnimationState({target:e,rect:zt}),e.fromRect=zt,e.thisAnimationDuration=null})):i._showClone(r)))},dragOverAnimationCapture:function(e){var t=e.dragRect,r=e.isOwner,e=e.activeSortable;f.forEach(function(e){e.thisAnimationDuration=null}),e.options.animation&&!r&&e.multiDrag.isMultiDrag&&(zt=n({},t),r=xe(y,!0),zt.top-=r.f,zt.left-=r.e)},dragOverAnimationComplete:function(){b&&(b=!1,Gt())},drop:function(e){var t=e.originalEvent,r=e.rootEl,a=e.parentEl,o=e.sortable,i=e.dispatchSortableEvent,n=e.oldIndex,e=e.putSortable,l=e||this.sortable;if(t){var s,d,c,p=this.options,h=a.children;if(!Wt)if(p.multiDragKey&&!this.multiDragKeyDown&&this._deselectMultiDrag(),O(y,p.selectedClass,!~f.indexOf(y)),~f.indexOf(y))f.splice(f.indexOf(y),1),Ht=null,Re({sortable:o,rootEl:r,name:"deselect",targetEl:y,originalEvent:t});else{if(f.push(y),Re({sortable:o,rootEl:r,name:"select",targetEl:y,originalEvent:t}),t.shiftKey&&Ht&&o.el.contains(Ht)){var g=_(Ht),m=_(y);if(~g&&~m&&g!==m)for(var u,v=g<m?(u=g,m):(u=m,g+1);u<v;u++)~f.indexOf(h[u])||(O(h[u],p.selectedClass,!0),f.push(h[u]),Re({sortable:o,rootEl:r,name:"select",targetEl:h[u],originalEvent:t}))}else Ht=y;Vt=l}Wt&&this.isMultiDrag&&(b=!1,(a[$].options.sort||a!==r)&&1<f.length&&(s=M(y),d=_(y,":not(."+this.options.selectedClass+")"),!qt&&p.animation&&(y.thisAnimationDuration=null),l.captureAnimationState(),qt||(p.animation&&(y.fromRect=s,f.forEach(function(e){var t;e.thisAnimationDuration=null,e!==y&&(t=b?M(e):s,e.fromRect=t,l.addAnimationState({target:e,rect:t}))})),Gt(),f.forEach(function(e){h[d]?a.insertBefore(e,h[d]):a.appendChild(e),d++}),n===_(y)&&(c=!1,f.forEach(function(e){e.sortableIndex!==_(e)&&(c=!0)}),c)&&i("update")),f.forEach(function(e){_e(e)}),l.animateAll()),Vt=l),(r===a||e&&"clone"!==e.lastPutMode)&&w.forEach(function(e){e.parentNode&&e.parentNode.removeChild(e)})}},nullingGlobal:function(){this.isMultiDrag=Wt=!1,w.length=0},destroyGlobal:function(){this._deselectMultiDrag(),i(document,"pointerup",this._deselectMultiDrag),i(document,"mouseup",this._deselectMultiDrag),i(document,"touchend",this._deselectMultiDrag),i(document,"keydown",this._checkKeyDown),i(document,"keyup",this._checkKeyUp)},_deselectMultiDrag:function(e){if(!(void 0!==Wt&&Wt||Vt!==this.sortable||e&&L(e.target,this.options.draggable,this.sortable.el,!1)||e&&0!==e.button))for(;f.length;){var t=f[0];O(t,this.options.selectedClass,!1),f.shift(),Re({sortable:this.sortable,rootEl:this.sortable.el,name:"deselect",targetEl:t,originalEvent:e})}},_checkKeyDown:function(e){e.key===this.options.multiDragKey&&(this.multiDragKeyDown=!0)},_checkKeyUp:function(e){e.key===this.options.multiDragKey&&(this.multiDragKeyDown=!1)}},n(e,{pluginName:"multiDrag",utils:{select:function(e){var t=e.parentNode[$];t&&t.options.multiDrag&&!~f.indexOf(e)&&(Vt&&Vt!==t&&(Vt.multiDrag._deselectMultiDrag(),Vt=t),O(e,t.options.selectedClass,!0),f.push(e))},deselect:function(e){var t=e.parentNode[$],r=f.indexOf(e);t&&t.options.multiDrag&&~r&&(O(e,t.options.selectedClass,!1),f.splice(r,1))}},eventProperties:function(){var r=this,a=[],o=[];return f.forEach(function(e){var t;a.push({multiDragElement:e,index:e.sortableIndex}),t=b&&e!==y?-1:b?_(e,":not(."+r.options.selectedClass+")"):_(e),o.push({multiDragElement:e,index:t})}),{items:se(f),clones:[].concat(w),oldIndicies:a,newIndicies:o}},optionListeners:{multiDragKey:function(e){return"ctrl"===(e=e.toLowerCase())?e="Control":1<e.length&&(e=e.charAt(0).toUpperCase()+e.substr(1)),e}}})});const q="undefined"!=typeof window?window:null,Yt=null===q,Kt=Yt?void 0:q.document,Xt="addEventListener",Jt="removeEventListener",Qt="getBoundingClientRect",er="horizontal",tr=()=>!1,rr=Yt?"calc":["","-webkit-","-moz-","-o-"].filter(e=>{var t=Kt.createElement("div");return t.style.cssText=`width:${e}calc(9px)`,!!t.style.length}).shift()+"calc",ar=e=>"string"==typeof e||e instanceof String,or=e=>{if(ar(e)){var t=Kt.querySelector(e);if(t)return t;throw new Error(`Selector ${e} did not match a DOM element`)}return e},W=(e,t,r)=>{e=e[t];return void 0!==e?e:r},ir=(e,t,r,a)=>{if(t){if("end"===a)return 0;if("center"===a)return e/2}else if(r){if("start"===a)return 0;if("center"===a)return e/2}return e},nr=(e,t)=>{var r=Kt.createElement("div");return r.className="gutter gutter-"+t,r},lr=(e,t,r)=>{var a={};return ar(t)?a[e]=t:a[e]=rr+`(${t}% - ${r}px)`,a},sr=(e,t)=>({[e]:t+"px"}),dr=(e,o={})=>{if(Yt)return{};let s=e,d,t,r,a,l,n;Array.from&&(s=Array.from(s));const c=or(s[0]).parentNode;e=getComputedStyle?getComputedStyle(c):null;const p=e?e.flexDirection:null;let h=W(o,"sizes")||s.map(()=>100/s.length);const i=W(o,"minSize",100),g=Array.isArray(i)?i:s.map(()=>i),m=W(o,"maxSize",1/0),u=Array.isArray(m)?m:s.map(()=>m),v=W(o,"expandToMin",!1),y=W(o,"gutterSize",10),f=W(o,"gutterAlign","center"),w=W(o,"snapOffset",30),b=Array.isArray(w)?w:s.map(()=>w),x=W(o,"dragInterval",1),C=W(o,"direction",er),k=W(o,"cursor",C===er?"col-resize":"row-resize"),T=W(o,"gutter",nr),S=W(o,"elementStyle",lr),N=W(o,"gutterStyle",sr);function I(t,e,r,a){const o=S(d,e,r,a);Object.keys(o).forEach(e=>{t.style[e]=o[e]})}function D(){return n.map(e=>e.size)}function P(e){return("touches"in e?e.touches[0]:e)[t]}function L(e){var t=n[this.a],r=n[this.b],a=t.size+r.size;t.size=e/this.size*a,r.size=a-e/this.size*a,I(t.element,t.size,this._b,t.i),I(r.element,r.size,this._c,r.i)}function O(){var e=n[this.a].element,t=n[this.b].element,e=e[Qt](),t=t[Qt]();this.size=e[d]+t[d]+this._b+this._c,this.start=e[r],this.end=e[a]}function E(a){const o=function(e){if(!getComputedStyle)return null;var t=getComputedStyle(e);if(!t)return null;let r=e[l];return 0===r?null:(C===er?r-=parseFloat(t.paddingLeft)+parseFloat(t.paddingRight):r-=parseFloat(t.paddingTop)+parseFloat(t.paddingBottom),r)}(c);if(null===o)return a;if(g.reduce((e,t)=>e+t,0)>o)return a;let i=0;const n=[];var e=a.map((e,t)=>{var e=o*e/100,r=ir(y,0===t,t===a.length-1,f),t=g[t]+r;return e<t?(i+=t-e,n.push(0),t):(n.push(e-t),e)});return 0===i?a:e.map((e,t)=>{let r=e;return 0<i&&0<n[t]-i&&(t=Math.min(i,n[t]-i),i-=t,r=e-t),r/o*100})}function M(e){var t,r,a;"button"in e&&0!==e.button||(t=this,r=n[t.a].element,a=n[t.b].element,t.dragging||W(o,"onDragStart",tr)(D()),e.preventDefault(),t.dragging=!0,t.move=function(e){let t;var r=n[this.a],a=n[this.b];this.dragging&&(t=P(e)-this.start+(this._b-this.dragOffset),(t=1<x?Math.round(t/x)*x:t)<=r.minSize+r.snapOffset+this._b?t=r.minSize+this._b:t>=this.size-(a.minSize+a.snapOffset+this._c)&&(t=this.size-(a.minSize+this._c)),t>=r.maxSize-r.snapOffset+this._b?t=r.maxSize+this._b:t<=this.size-(a.maxSize-a.snapOffset+this._c)&&(t=this.size-(a.maxSize+this._c)),L.call(this,t),W(o,"onDrag",tr)(D()))}.bind(t),t.stop=function(){var e=this,t=n[e.a].element,r=n[e.b].element;e.dragging&&W(o,"onDragEnd",tr)(D()),e.dragging=!1,q[Jt]("mouseup",e.stop),q[Jt]("touchend",e.stop),q[Jt]("touchcancel",e.stop),q[Jt]("mousemove",e.move),q[Jt]("touchmove",e.move),e.stop=null,e.move=null,t[Jt]("selectstart",tr),t[Jt]("dragstart",tr),r[Jt]("selectstart",tr),r[Jt]("dragstart",tr),t.style.userSelect="",t.style.webkitUserSelect="",t.style.MozUserSelect="",t.style.pointerEvents="",r.style.userSelect="",r.style.webkitUserSelect="",r.style.MozUserSelect="",r.style.pointerEvents="",e.gutter.style.cursor="",e.parent.style.cursor="",Kt.body.style.cursor=""}.bind(t),q[Xt]("mouseup",t.stop),q[Xt]("touchend",t.stop),q[Xt]("touchcancel",t.stop),q[Xt]("mousemove",t.move),q[Xt]("touchmove",t.move),r[Xt]("selectstart",tr),r[Xt]("dragstart",tr),a[Xt]("selectstart",tr),a[Xt]("dragstart",tr),r.style.userSelect="none",r.style.webkitUserSelect="none",r.style.MozUserSelect="none",r.style.pointerEvents="none",a.style.userSelect="none",a.style.webkitUserSelect="none",a.style.MozUserSelect="none",a.style.pointerEvents="none",t.gutter.style.cursor=k,t.parent.style.cursor=k,Kt.body.style.cursor=k,O.call(t),t.dragOffset=P(e)-t.end)}C===er?(d="width",t="clientX",r="left",a="right",l="clientWidth"):"vertical"===C&&(d="height",t="clientY",r="top",a="bottom",l="clientHeight"),h=E(h);const _=[];function $(e){var t=e.i===_.length,r=t?_[e.i-1]:_[e.i],t=(O.call(r),t?r.size-e.minSize-r._c:e.minSize+r._b);L.call(r,t)}return(n=s.map((e,t)=>{e={element:or(e),size:h[t],minSize:g[t],maxSize:u[t],snapOffset:b[t],i:t};let r;if(0<t&&((r={a:t-1,b:t,dragging:!1,direction:C,parent:c})._b=ir(y,t-1==0,!1,f),r._c=ir(y,!1,t===s.length-1,f),"row-reverse"!==p&&"column-reverse"!==p||(a=r.a,r.a=r.b,r.b=a)),0<t){var a=T(t,C,e.element);{var o=a;var i=y;var n=t;const l=N(d,i,n);Object.keys(l).forEach(e=>{o.style[e]=l[e]})}r._a=M.bind(r),a[Xt]("mousedown",r._a),a[Xt]("touchstart",r._a),c.insertBefore(a,e.element),r.gutter=a}return I(e.element,e.size,ir(y,0===t,t===s.length-1,f),t),0<t&&_.push(r),e})).forEach(e=>{var t=e.element[Qt]()[d];t<e.minSize&&(v?$(e):e.minSize=t)}),{setSizes:function(e){const i=E(e);i.forEach((e,t)=>{var r,a,o;0<t&&(r=_[t-1],a=n[r.a],o=n[r.b],a.size=i[t-1],o.size=e,I(a.element,a.size,r._b,a.i),I(o.element,o.size,r._c,o.i))})},getSizes:D,collapse(e){$(n[e])},destroy:function(r,a){_.forEach(t=>{var e;!0!==a?t.parent.removeChild(t.gutter):(t.gutter[Jt]("mousedown",t._a),t.gutter[Jt]("touchstart",t._a)),!0!==r&&(e=S(d,t.a.size,t._b),Object.keys(e).forEach(e=>{n[t.a].element.style[e]="",n[t.b].element.style[e]=""}))})},parent:c,pairs:_}};function g(e){switch(e=Array.isArray(e)?e[0]:e){case"VersionInfo":case"ExportButton":return"flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm";case"column":return"flex flex-col gap-3.5 flex-1";case"h2":return'text-lg font-normal">IN_BOUND</h2><ul class="flex flex-col gap-3.5 mb-4';case"h3":return"m-0 cursor-pointer tracking-tight leading-8 text-gray-900 dark:text-gray-100 text-lg font-bold";case"ul":return"gap-3.5";case"card":return" cursor-default flex flex-col gap-1 bg-gray-50 dark:bg-white/5 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900 text-left border shadow border-gray-300 dark:border-gray-700 hover:shadow-lg transition duration-300 ease-in-out tw-border-2 tw-border-blue-500 tw-rounded-xl";case"p":return"m-0 cursor-pointer font-light text-gray-500";case"paginationText":return"text-sm text-gray-700 dark:text-gray-400";case"paginationNumber":return"font-semibold text-gray-900 dark:text-white";case"paginationButtonGroup":return"inline-flex xs:mt-0";case"paginationButton":return"px-1 py-1 font-small bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white";case"saveSearchChips":return"px-2 py-1 rounded font-small bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white";case"continueButton":return" font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:border-gray-600 dark:hover:bg-gray-800 bg-gray disabled:text-gray-300 disabled:hover:bg-transparent rounded-l-md px-4";case"continueActionSelect":return"bg-gray-100 border-0 p-1 border-l text-xs rounded-r-md block w-2 dark:bg-gray-600 border-gray-200 dark:border-gray-600 dark:hover:bg-gray-800 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0 focus:border-gray-200 pr-6";case"action":return"p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400 md:invisible md:group-hover:visible";case"tag":return"inline-flex flex-col w-full items-start py-1 px-2 mr-2 mb-2 text-sm font-medium text-white rounded bg-gray-600 whitespace-nowrap";case"languageSelectWrapper":return"flex gap-3 lg:max-w-3xl md:last:mb-6  pt-0 stretch justify-around text-xs items-end lg:-mb-4 pb-9 mb-0  sm:flex-col";case"select":return"bg-gray-100 p-1 px-2 border-0 text-xs rounded block w-full dark:bg-gray-600 dark:border-gray-600 dark:hover:bg-gray-800 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0";case"select-v2":return"bg-gray-100 p-1 px-2 border-0 text-xs w-full dark:bg-gray-600 dark:border-gray-600 dark:hover:bg-gray-800 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0";case"selectLabel":return"block text-xs font-thin"}}function u(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;")}function cr(e){return(e=new Date(e))&&"Invalid Date"!=e?e.toISOString().split("T")[0]+" "+e.toTimeString().split(" ")[0]:""}function pr(e){if(!(e=new Date(e))||"Invalid Date"==e)return"";var t=new Date,r=Math.max(0,t-e),a=[{name:"year",value:31556952e3},{name:"month",value:2629746e3},{name:"week",value:6048e5},{name:"day",value:864e5},{name:"hour",value:36e5},{name:"minute",value:6e4},{name:"second",value:1e3}];for(let e=0;e<a.length;e++){var o,i=a[e];if(r>=i.value)return(o=Math.floor(r/i.value))+` ${1<o?i.name+"s":i.name} ago`}return"just now"}function hr(e,t,r,a){if(t!==h.OWN){t=r[e];if(t){let e=document.getElementById("reportPromptModal");e||((e=document.createElement("div")).id="reportPromptModal",e.addEventListener("submit",a),document.body.appendChild(e)),e.innerHTML=`
      <div class="fixed inset-0 text-center transition-opacity z-50">
        <div class="absolute bg-gray-900 inset-0 opacity-90">
        </div>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex items-center justify-center min-h-full">
            <div
              class="align-center bg-white dark:bg-gray-800 dark:text-gray-200 inline-block overflow-hidden sm:rounded-lg shadow-xl sm:align-middle sm:max-w-lg sm:my-8 sm:w-full text-left transform transition-all"
              role="dialog" aria-modal="true" aria-labelledby="modal-headline" style="text-align: left;">

              <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                <div id="reportPromptIntroText">
                  <p class="mb-6">
                    Thanks for helping us improve.<br><br>

                    We need you to answer a few questions so we can better understand what's going on with this Prompt.<br><br>

                    You'll also have the option to add more info in your own words and add more details to the report.<br><br>

                    We take reports seriously.<br><br>

                    If we find a rule violation, we'll either remove the Prompt immediately or ask them to revise, or lock or suspend the account.
                  </p>

                  <div class="mt-2">
                    <label for="FeedbackTypeNo" class="block">What would you like to report?</label>
                    <select data-prompt-id="${t.ID}" id="FeedbackTypeNo" name="FeedbackTypeNo" class="mt-2 mb-3 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-900 rounded w-full" required>
                      <option value="${o.GENERIC_LEGAL_CONCERN}">
                      Legal concerns
                      </option>
                      <optgroup label="Result concerns">                        
                        <option value="${o.NOT_MULTILINGUAL}">
                          Result in wrong language
                        </option>
                        <option value="${o.NOT_GENERIC}">
                          Result on wrong topic/keywords
                        </option>                        
                        <option value="${o.GENERIC_CONCERN}">
                          Prompt not working as expected
                        </option>
                      </optgroup>                  
                      <option value="${o.SPAM}">Spam</option>
                    </select>
                  </div>
                </div>

                <div class="reportPromptFeedbackContainer hidden overflow-y-auto" id="reportPromptFeedbackForm"></div>
              </div>

              <div class="bg-gray-200 dark:bg-gray-700 px-4 py-3 text-right">
                <button type="button" class="bg-gray-600 hover:bg-gray-800 mr-2 px-4 py-2 rounded text-white"
                        onclick="IN_BOUND.hideModal('reportPromptModal')"> Cancel
                </button>
                <button type="button" id="reportPromptSubmitButton" class="bg-green-600 hover:bg-green-700 mr-2 px-4 py-2 rounded text-white">Start Report
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>`,e.querySelector("#reportPromptSubmitButton").addEventListener("click",e=>{document.getElementById("reportPromptIntroText").style="display: none;";var t=document.getElementById("FeedbackTypeNo"),r=document.getElementById("reportPromptFeedbackForm");r.innerHTML=((e,t)=>{const r=[o.GENERIC_CONCERN,o.GENERIC_LEGAL_CONCERN].includes(e);return`
    <p class="mb-6">
      Since we are not affiliated with OpenAI or ChatGPT,
      we are not responsible for the output of ChatGPT.<br><br>

      ${e===o.GENERIC_CONCERN?`
          But we can try to help you with results.<br><br>

          We can do this by looking at the prompt reported,
          and the output generated.
        `:"But we will take your report about the prompt and evaluate it."}
    </p>

    <form>
      <input type="hidden" name="PromptID" value="${t}" />

      ${e!==o.GENERIC_CONCERN?`<input type="hidden" name="FeedbackTypeNo" value="${e}" />`:""}

      <label>Contact Email${!r?' <span class="text-sm text-gray-500">(optional)</span>':""}</label>
      <input name="FeedbackContact" 
        ${r?" required ":""} type="email"
        title="Email address to contact you in case we need more information"
        class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded p-2 mt-2 mb-3"
        placeholder="example@example.com" />

      <label>Feedback${!r?' <span class="text-sm text-gray-500">(optional)</span>':""}</label>
      <textarea name="FeedbackText" 
        ${r?" required ":""}
        title="Short description of the issue"
        class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded p-2 mt-2 mb-3" style="height: 140px;"
        placeholder="Please describe the issue you are having with this prompt.${e===o.GENERIC_CONCERN?" Please include your full history of the prompt including the original prompt used.":""}"></textarea>

      ${e===o.GENERIC_CONCERN?`
            <label class="block">Are you a customer paying for IN_BOUND support? Would you like to hire us to improve your prompt and create a private prompt specifically for you?</label>
            <select name="FeedbackTypeNo" class="mt-2 mb-3 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-900 rounded w-full" required>
              <option value="${o.PROMPT_SUPPORT_FREE}">I want free support</option>
              <option value="${o.PROMPT_SUPPORT_WANT_PAID}">I want to pay for support</option>
              <option value="${o.PROMPT_SUPPORT_PAID}">I am already paying for support</option>
            </select>
          `:""}
    </form>
  `})(+t.value,t.dataset.promptId),r.classList.remove("hidden"),e.target.innerText="Send Report",e.target.addEventListener("click",()=>{document.querySelector("#reportPromptModal .reportPromptFeedbackContainer:not(.hidden) form").requestSubmit()})},{once:!0}),e.style="display: block;",document.addEventListener("keydown",e=>{"Escape"===e.key&&gr("reportPromptModal")})}}}const v=function(e){switch(e=Array.isArray(e)?e[0]:e){case"Logo-dark":return`<?xml version="1.0" encoding="utf-8"?>
      <!-- Generator: Adobe Illustrator 25.2.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
      <svg version="1.1" class="logo-bg" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         viewBox="0 0 940.4 196.4" style="enable-background:new 0 0 940.4 196.4;" xml:space="preserve">
      <style type="text/css">
        .st0{enable-background:new    ;}
        .st1{fill:#1E303A;}
        .st2{fill:none;stroke:#1E303A;stroke-width:2;stroke-miterlimit:10;}
        .st3{fill:#505D69;stroke:#505D69;stroke-width:4;stroke-miterlimit:10;}
        .st4{fill:#FFFFFF;}
      </style>
      <g class="st0">
        <path class="st1" d="M247.6,63.1L271,126l23.1-61l11.2,0.1l23.3,60.9l23.4-62.9h11.4l-29.1,76.6h-10.9l-23.6-62.3l-23.7,62.3h-10.9
          l-29-76.6H247.6z"/>
      </g>
      <g class="st0">
        <path class="st2" d="M247.6,63.1L271,126l23.1-61l11.2,0.1l23.3,60.9l23.4-62.9h11.4l-29.1,76.6h-10.9l-23.6-62.3l-23.7,62.3h-10.9
          l-29-76.6H247.6z"/>
      </g>
      <g class="st0">
        <path class="st1" d="M442.5,63.1c4.8,0,8.9,1.7,12.4,5.1c3.4,3.4,5.1,7.4,5.1,12.2v42c0,4.8-1.7,8.8-5.1,12.2
          c-3.4,3.4-7.6,5.1-12.4,5.1h-46.7c-4.8,0-8.9-1.7-12.3-5.1c-3.4-3.4-5.1-7.4-5.1-12.2v-42c0-4.8,1.7-8.8,5.1-12.2
          c3.4-3.4,7.5-5.1,12.3-5.1H442.5z M391.6,75.2c-1.7,1.8-2.6,4-2.6,6.6V121c0,2.7,0.9,4.9,2.6,6.6c1.7,1.7,4,2.6,6.6,2.6H440
          c2.7,0,4.9-0.9,6.7-2.6c1.8-1.8,2.7-3.9,2.7-6.5V81.8c0-2.6-0.9-4.8-2.7-6.6c-1.8-1.8-4-2.7-6.7-2.7h-41.7
          C395.6,72.6,393.4,73.4,391.6,75.2z"/>
      </g>
      <g class="st0">
        <path class="st2" d="M442.5,63.1c4.8,0,8.9,1.7,12.4,5.1c3.4,3.4,5.1,7.4,5.1,12.2v42c0,4.8-1.7,8.8-5.1,12.2
          c-3.4,3.4-7.6,5.1-12.4,5.1h-46.7c-4.8,0-8.9-1.7-12.3-5.1c-3.4-3.4-5.1-7.4-5.1-12.2v-42c0-4.8,1.7-8.8,5.1-12.2
          c3.4-3.4,7.5-5.1,12.3-5.1H442.5z M391.6,75.2c-1.7,1.8-2.6,4-2.6,6.6V121c0,2.7,0.9,4.9,2.6,6.6c1.7,1.7,4,2.6,6.6,2.6H440
          c2.7,0,4.9-0.9,6.7-2.6c1.8-1.8,2.7-3.9,2.7-6.5V81.8c0-2.6-0.9-4.8-2.7-6.6c-1.8-1.8-4-2.7-6.7-2.7h-41.7
          C395.6,72.6,393.4,73.4,391.6,75.2z"/>
      </g>
      <g class="st0">
        <path class="st1" d="M537.3,63.1c5.2,0,9.4,1.1,12.6,3.4c3.3,2.3,4.9,5.7,4.9,10.2v12.8c0,4.8-0.9,8-2.6,9.6
          c-1.7,1.6-4.5,2.4-8.2,2.4c3.7,0.9,6.5,2.5,8.2,4.6c1.7,2.1,2.6,5.5,2.6,10.2v23.3h-11.1v-25.1c0-4.5-3.1-6.7-9.3-6.7h-45.5v31.8
          h-10.7V63.1H537.3z M488.9,98.3h45.5c6.2,0,9.3-2.2,9.3-6.7V78.8c0-4.5-3.1-6.7-9.3-6.7h-45.5V98.3z"/>
      </g>
      <g class="st0">
        <path class="st2" d="M537.3,63.1c5.2,0,9.4,1.1,12.6,3.4c3.3,2.3,4.9,5.7,4.9,10.2v12.8c0,4.8-0.9,8-2.6,9.6
          c-1.7,1.6-4.5,2.4-8.2,2.4c3.7,0.9,6.5,2.5,8.2,4.6c1.7,2.1,2.6,5.5,2.6,10.2v23.3h-11.1v-25.1c0-4.5-3.1-6.7-9.3-6.7h-45.5v31.8
          h-10.7V63.1H537.3z M488.9,98.3h45.5c6.2,0,9.3-2.2,9.3-6.7V78.8c0-4.5-3.1-6.7-9.3-6.7h-45.5V98.3z"/>
      </g>
      <g class="st0">
        <path class="st1" d="M583.9,63.1v38.9l47.4-38.9h15.8l-44,36.3l44,40.2H631l-36.6-33.3l-10.5,8.7v24.6h-10.7V63.1H583.9z"/>
      </g>
      <g class="st0">
        <path class="st2" d="M583.9,63.1v38.9l47.4-38.9h15.8l-44,36.3l44,40.2H631l-36.6-33.3l-10.5,8.7v24.6h-10.7V63.1H583.9z"/>
      </g>
      <g class="st0">
        <path class="st1" d="M734.8,63.1v9.4h-54.7c-2.7,0-4.9,0.9-6.6,2.6c-1.7,1.7-2.6,3.9-2.6,6.6V121c0,2.7,0.9,4.9,2.6,6.6
          c1.7,1.7,4,2.6,6.6,2.6h40.1c2.7,0,4.9-0.9,6.7-2.6c1.8-1.8,2.7-3.9,2.7-6.5v-16.6h-21.2V95h31.9v27.5c0,4.8-1.7,8.8-5.1,12.2
          c-3.4,3.4-7.6,5-12.4,5h-45.1c-4.8,0-8.9-1.7-12.3-5c-3.4-3.4-5.1-7.4-5.1-12.2V80.4c0-4.8,1.7-8.8,5.1-12.2
          c3.4-3.4,7.5-5.1,12.3-5.1H734.8z"/>
      </g>
      <g class="st0">
        <path class="st1" d="M768.8,63.1h44.9c4.8,0,8.9,1.7,12.3,5.1c3.4,3.4,5.1,7.4,5.1,12.2v12.8c0,4.8-1.7,8.8-5.1,12.2s-7.5,5-12.3,5
          h-44.9v29.2h-10.6v-29.2V63.1H768.8z M768.8,101h42.4c2.7,0,4.9-0.9,6.7-2.6c1.8-1.7,2.7-3.9,2.7-6.5v-10c0-2.6-0.9-4.8-2.7-6.6
          c-1.8-1.8-4-2.7-6.7-2.7h-42.4V101z"/>
      </g>
      <g class="st0">
        <path class="st1" d="M922.4,63.1v9.4h-31.6v67.1h-10.7V72.6h-31.6v-9.4H922.4z"/>
      </g>
      <path class="st3" d="M22,2h152.4c11,0,20,9,20,20v152.4c0,11-9,20-20,20H22c-11,0-20-9-20-20V22C2,11,11,2,22,2z"/>
      <path class="st4" d="M118.8,131.2l-13.1-16.4L87.8,92.6l0,0l-32-40.1c-0.9-1.2-2.4-1.9-3.9-1.9l0,0H33.1c-2.8,0-5,2.2-5.1,4.9
        c0,1,0.3,1.9,0.8,2.7L70.4,143c1.2,2.5,4.2,3.5,6.7,2.3c0,0,0,0,0,0c0.6-0.3,1.2-0.8,1.7-1.3l12.8-15.6l-6.4-8l-9.2,11.2L41.2,60.6
        h8.3l40,50l12.3,15.4l0,0l14,17.5c0.5,0.7,1.2,1.3,2,1.7c2.5,1.2,5.5,0.1,6.7-2.4c0,0,0,0,0,0l42.7-84.7c0.4-0.8,0.6-1.6,0.6-2.5
        c0-2.8-2.2-5-5-5h-18l0,0c-1.5,0-2.9,0.7-3.9,1.8l-37,45.1l6.4,8l36.8-44.9h7.6L118.8,131.2L118.8,131.2z"/>
      </svg>
      `;case"Logo-light":return`<?xml version="1.0" encoding="utf-8"?>
      <!-- Generator: Adobe Illustrator 25.2.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
      <svg class="logo-bg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         viewBox="0 0 959.5 196.4" style="enable-background:new 0 0 959.5 196.4;" xml:space="preserve">
      <style type="text/css">
        .st0{enable-background:new    ;}
        .st1{fill:#FFFFFF;}
        .st2{fill:none;stroke:#FFFFFF;stroke-width:2;stroke-miterlimit:10;}
        .st3{fill:none;stroke:#FFFFFF;stroke-width:4;stroke-miterlimit:10;}
      </style>
      <g class="st0">
        <path class="st1" d="M260.2,63.1l23.3,62.9l23.1-61l11.2,0.1l23.3,60.9l23.4-62.9H376L347,139.7H336l-23.6-62.3l-23.7,62.3h-10.9
          l-29-76.6H260.2z"/>
      </g>
      <g class="st0">
        <path class="st2" d="M260.2,63.1l23.3,62.9l23.1-61l11.2,0.1l23.3,60.9l23.4-62.9H376L347,139.7H336l-23.6-62.3l-23.7,62.3h-10.9
          l-29-76.6H260.2z"/>
      </g>
      <g class="st0">
        <path class="st1" d="M455,63.1c4.8,0,8.9,1.7,12.4,5.1c3.4,3.4,5.1,7.4,5.1,12.2v42c0,4.8-1.7,8.8-5.1,12.2
          c-3.4,3.4-7.6,5.1-12.4,5.1h-46.7c-4.8,0-8.9-1.7-12.3-5.1c-3.4-3.4-5.1-7.4-5.1-12.2v-42c0-4.8,1.7-8.8,5.1-12.2
          c3.4-3.4,7.5-5.1,12.3-5.1H455z M404.2,75.2c-1.7,1.8-2.6,4-2.6,6.6V121c0,2.7,0.9,4.9,2.6,6.6c1.7,1.7,4,2.6,6.6,2.6h41.7
          c2.7,0,4.9-0.9,6.7-2.6c1.8-1.8,2.7-3.9,2.7-6.5V81.8c0-2.6-0.9-4.8-2.7-6.6c-1.8-1.8-4-2.7-6.7-2.7h-41.7
          C408.1,72.6,405.9,73.4,404.2,75.2z"/>
      </g>
      <g class="st0">
        <path class="st2" d="M455,63.1c4.8,0,8.9,1.7,12.4,5.1c3.4,3.4,5.1,7.4,5.1,12.2v42c0,4.8-1.7,8.8-5.1,12.2
          c-3.4,3.4-7.6,5.1-12.4,5.1h-46.7c-4.8,0-8.9-1.7-12.3-5.1c-3.4-3.4-5.1-7.4-5.1-12.2v-42c0-4.8,1.7-8.8,5.1-12.2
          c3.4-3.4,7.5-5.1,12.3-5.1H455z M404.2,75.2c-1.7,1.8-2.6,4-2.6,6.6V121c0,2.7,0.9,4.9,2.6,6.6c1.7,1.7,4,2.6,6.6,2.6h41.7
          c2.7,0,4.9-0.9,6.7-2.6c1.8-1.8,2.7-3.9,2.7-6.5V81.8c0-2.6-0.9-4.8-2.7-6.6c-1.8-1.8-4-2.7-6.7-2.7h-41.7
          C408.1,72.6,405.9,73.4,404.2,75.2z"/>
      </g>
      <g class="st0">
        <path class="st1" d="M549.8,63.1c5.2,0,9.4,1.1,12.6,3.4c3.3,2.3,4.9,5.7,4.9,10.2v12.8c0,4.8-0.9,8-2.6,9.6
          c-1.7,1.6-4.5,2.4-8.2,2.4c3.7,0.9,6.5,2.5,8.2,4.6c1.7,2.1,2.6,5.5,2.6,10.2v23.3h-11.1v-25.1c0-4.5-3.1-6.7-9.3-6.7h-45.5v31.8
          h-10.7V63.1H549.8z M501.4,98.3h45.5c6.2,0,9.3-2.2,9.3-6.7V78.8c0-4.5-3.1-6.7-9.3-6.7h-45.5V98.3z"/>
      </g>
      <g class="st0">
        <path class="st2" d="M549.8,63.1c5.2,0,9.4,1.1,12.6,3.4c3.3,2.3,4.9,5.7,4.9,10.2v12.8c0,4.8-0.9,8-2.6,9.6
          c-1.7,1.6-4.5,2.4-8.2,2.4c3.7,0.9,6.5,2.5,8.2,4.6c1.7,2.1,2.6,5.5,2.6,10.2v23.3h-11.1v-25.1c0-4.5-3.1-6.7-9.3-6.7h-45.5v31.8
          h-10.7V63.1H549.8z M501.4,98.3h45.5c6.2,0,9.3-2.2,9.3-6.7V78.8c0-4.5-3.1-6.7-9.3-6.7h-45.5V98.3z"/>
      </g>
      <g class="st0">
        <path class="st1" d="M596.4,63.1v38.9l47.4-38.9h15.8l-44,36.3l44,40.2h-16.1l-36.6-33.3l-10.5,8.7v24.6h-10.7V63.1H596.4z"/>
      </g>
      <g class="st0">
        <path class="st2" d="M596.4,63.1v38.9l47.4-38.9h15.8l-44,36.3l44,40.2h-16.1l-36.6-33.3l-10.5,8.7v24.6h-10.7V63.1H596.4z"/>
      </g>
      <g class="st0">
        <path class="st1" d="M753.9,63.1v9.4h-54.7c-2.7,0-4.9,0.9-6.6,2.6c-1.7,1.7-2.6,3.9-2.6,6.6V121c0,2.7,0.9,4.9,2.6,6.6
          c1.7,1.7,4,2.6,6.6,2.6h40.1c2.7,0,4.9-0.9,6.7-2.6c1.8-1.8,2.7-3.9,2.7-6.5v-16.6h-21.2V95h31.9v27.5c0,4.8-1.7,8.8-5.1,12.2
          c-3.4,3.4-7.6,5-12.4,5h-45.1c-4.8,0-8.9-1.7-12.3-5c-3.4-3.4-5.1-7.4-5.1-12.2V80.4c0-4.8,1.7-8.8,5.1-12.2
          c3.4-3.4,7.5-5.1,12.3-5.1H753.9z"/>
      </g>
      <g class="st0">
        <path class="st1" d="M787.9,63.1h44.9c4.8,0,8.9,1.7,12.3,5.1c3.4,3.4,5.1,7.4,5.1,12.2v12.8c0,4.8-1.7,8.8-5.1,12.2s-7.5,5-12.3,5
          h-44.9v29.2h-10.6v-29.2V63.1H787.9z M787.9,101h42.4c2.7,0,4.9-0.9,6.7-2.6c1.8-1.7,2.7-3.9,2.7-6.5v-10c0-2.6-0.9-4.8-2.7-6.6
          c-1.8-1.8-4-2.7-6.7-2.7h-42.4V101z"/>
      </g>
      <g class="st0">
        <path class="st1" d="M941.4,63.1v9.4h-31.6v67.1h-10.7V72.6h-31.6v-9.4H941.4z"/>
      </g>
      <path class="st3" d="M22,2h152.4c11,0,20,9,20,20v152.4c0,11-9,20-20,20H22c-11,0-20-9-20-20V22C2,11,11,2,22,2z"/>
      <path class="st1" d="M118.8,131.2l-13.1-16.3L87.8,92.6h0.1L55.8,52.5c-1-1.2-2.4-1.9-3.9-1.9l0,0H33.1c-2.8,0-5,2.2-5.1,4.9
        c0,1,0.3,1.9,0.8,2.7L70.4,143c1.2,2.5,4.2,3.5,6.7,2.3c0,0,0,0,0,0c0.6-0.3,1.2-0.8,1.7-1.3l12.8-15.6l-6.4-8L76,131.6L41.2,60.7
        h8.3l40,50l12.4,15.4l0,0l13.9,17.5c0.5,0.7,1.2,1.3,2,1.7c2.5,1.2,5.5,0.1,6.7-2.4c0,0,0,0,0,0l42.7-84.7c1.4-2.4,0.6-5.4-1.8-6.8
        c-0.8-0.4-1.7-0.7-2.6-0.7h-18l0,0c-1.5,0-2.9,0.7-3.9,1.8l-37,45.1l6.4,8L147,60.7h7.6l-36,70.6L118.8,131.2z"/>
      </svg>
      `;case"Rocket":return'<svg fill="#f1c40f" height="1rem" width="1rem" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-25.91 -25.91 310.92 310.92" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M256.468,2.637c-1.907-1.907-4.575-2.855-7.25-2.593L228.027,2.14c-33.604,3.324-65.259,18.304-89.135,42.18 l-0.365,0.365l-5.298-2.038c-23.593-9.073-50.386-3.388-68.262,14.486l-54.008,54.008c-0.096,0.091-0.188,0.184-0.279,0.279 l-8.044,8.043c-3.515,3.515-3.515,9.213,0,12.728c3.516,3.515,9.213,3.515,12.729,0l4.051-4.051l32.714,12.582 c0.372,0.618,0.813,1.206,1.347,1.739l3.65,3.65l-10.583,10.583c-3.49,3.49-3.51,9.129-0.071,12.649 c-17.598,19.116-23.107,33.004-32.352,56.335c-1.229,3.099-2.53,6.384-3.942,9.889c-1.543,3.823-0.657,8.178,2.257,11.095 c1.965,1.966,4.584,3.011,7.255,3.011c1.291,0,2.595-0.244,3.842-0.746c3.509-1.414,6.793-2.715,9.892-3.943 c23.33-9.246,37.219-14.755,56.336-32.353c1.748,1.707,4.015,2.564,6.285,2.564c2.304,0,4.606-0.879,6.364-2.636l10.582-10.582 l3.649,3.649c0.525,0.524,1.112,0.968,1.738,1.344l12.583,32.718l-4.051,4.051c-3.515,3.515-3.515,9.213,0,12.728 c1.758,1.758,4.061,2.636,6.364,2.636c2.303,0,4.606-0.879,6.364-2.636l8.043-8.043c0.096-0.091,0.188-0.185,0.279-0.28 l54.01-54.009c17.874-17.875,23.56-44.669,14.485-68.261l-2.037-5.298l0.365-0.365c23.876-23.876,38.856-55.532,42.18-89.135 l2.096-21.191C259.325,7.204,258.374,4.543,256.468,2.637z M33.343,114.214l44.353-44.352 c12.291-12.291,30.45-16.558,46.85-11.196l-65.453,65.452L33.343,114.214z M33.537,225.569 c7.256-18.099,12.332-28.892,25.667-43.484l17.816,17.816C62.428,213.236,51.633,218.313,33.537,225.569z M96.044,193.469 L65.635,163.06l4.219-4.219l30.409,30.409L96.044,193.469z M123.005,186.536L72.568,136.1l59.424-59.423l50.436,50.436 L123.005,186.536z M189.242,181.409l-44.352,44.352l-9.904-25.751l65.451-65.451 C205.801,150.958,201.534,169.117,189.242,181.409z M239.052,29.306c-2.915,29.473-16.054,57.237-36.996,78.179l-6.9,6.9 L144.72,63.949l6.901-6.901c20.94-20.941,48.705-34.08,78.178-36.995l10.27-1.016L239.052,29.306z"></path> <path d="M195.926,40.017c-6.187,0-12.003,2.409-16.378,6.784c-9.03,9.03-9.03,23.725,0,32.755 c4.375,4.375,10.191,6.784,16.378,6.784s12.003-2.409,16.378-6.784c9.03-9.03,9.03-23.725,0-32.755 C207.929,42.426,202.113,40.017,195.926,40.017z M199.575,66.828c-0.975,0.975-2.271,1.512-3.649,1.512 c-1.378,0-2.675-0.537-3.649-1.512c-2.013-2.013-2.013-5.287,0-7.3c0.975-0.975,2.271-1.512,3.649-1.512 c1.378,0,2.675,0.537,3.649,1.512C201.588,61.541,201.588,64.816,199.575,66.828z"></path> </g> </g> </g> </g></svg>';case"Export":return'<svg fill="#FFC300" height="1rem" width="1rem" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 29.978 29.978" xml:space="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M25.462,19.105v6.848H4.515v-6.848H0.489v8.861c0,1.111,0.9,2.012,2.016,2.012h24.967c1.115,0,2.016-0.9,2.016-2.012 v-8.861H25.462z"></path> <path d="M14.62,18.426l-5.764-6.965c0,0-0.877-0.828,0.074-0.828s3.248,0,3.248,0s0-0.557,0-1.416c0-2.449,0-6.906,0-8.723 c0,0-0.129-0.494,0.615-0.494c0.75,0,4.035,0,4.572,0c0.536,0,0.524,0.416,0.524,0.416c0,1.762,0,6.373,0,8.742 c0,0.768,0,1.266,0,1.266s1.842,0,2.998,0c1.154,0,0.285,0.867,0.285,0.867s-4.904,6.51-5.588,7.193 C15.092,18.979,14.62,18.426,14.62,18.426z"></path> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g> </g></svg>';case"PromptBubble":return'<img class="logo-bg" src="" />';case"Save":return`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <path d="M16 8.98987V20.3499C16 21.7999 14.96 22.4099 13.69 21.7099L9.76001 19.5199C9.34001 19.2899 8.65999 19.2899 8.23999 19.5199L4.31 21.7099C3.04 22.4099 2 21.7999 2 20.3499V8.98987C2 7.27987 3.39999 5.87988 5.10999 5.87988H12.89C14.6 5.87988 16 7.27987 16 8.98987Z" stroke="#FFC300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M22 5.10999V16.47C22 17.92 20.96 18.53 19.69 17.83L16 15.77V8.98999C16 7.27999 14.6 5.88 12.89 5.88H8V5.10999C8 3.39999 9.39999 2 11.11 2H18.89C20.6 2 22 3.39999 22 5.10999Z" stroke="#FFC300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M7 12H11" stroke="#FFC300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9 14V10" stroke="#FFC300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;case"Cross":return'<svg stroke="gray" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';case"Cross-Round":return`<svg xmlns="http://www.w3.org/2000/svg" fill="gray" class="h-5 w-5" viewBox="0 0 32 32" version="1.1">
      <path d="M0 16q0 3.264 1.28 6.208t3.392 5.12 5.12 3.424 6.208 1.248 6.208-1.248 5.12-3.424 3.392-5.12 1.28-6.208-1.28-6.208-3.392-5.12-5.088-3.392-6.24-1.28q-3.264 0-6.208 1.28t-5.12 3.392-3.392 5.12-1.28 6.208zM4 16q0-3.264 1.6-6.016t4.384-4.352 6.016-1.632 6.016 1.632 4.384 4.352 1.6 6.016-1.6 6.048-4.384 4.352-6.016 1.6-6.016-1.6-4.384-4.352-1.6-6.048zM9.76 20.256q0 0.832 0.576 1.408t1.44 0.608 1.408-0.608l2.816-2.816 2.816 2.816q0.576 0.608 1.408 0.608t1.44-0.608 0.576-1.408-0.576-1.408l-2.848-2.848 2.848-2.816q0.576-0.576 0.576-1.408t-0.576-1.408-1.44-0.608-1.408 0.608l-2.816 2.816-2.816-2.816q-0.576-0.608-1.408-0.608t-1.44 0.608-0.576 1.408 0.576 1.408l2.848 2.816-2.848 2.848q-0.576 0.576-0.576 1.408z"/>
      </svg>`;case"trash":return`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <path d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z" stroke="gray" stroke-width="2"/>
      <path d="M19.5 5H4.5" stroke="gray" stroke-width="2" stroke-linecap="round"/>
      <path d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z" stroke="gray" stroke-width="2"/>
      </svg>`;case"info":return`<svg xmlns="http://www.w3.org/2000/svg" fill="gray" class="h-5 w-5" viewBox="0 0 1920 1920">
          <path d="M960 0c530.193 0 960 429.807 960 960s-429.807 960-960 960S0 1490.193 0 960 429.807 0 960 0Zm0 101.053c-474.384 0-858.947 384.563-858.947 858.947S485.616 1818.947 960 1818.947 1818.947 1434.384 1818.947 960 1434.384 101.053 960 101.053Zm-42.074 626.795c-85.075 39.632-157.432 107.975-229.844 207.898-10.327 14.249-10.744 22.907-.135 30.565 7.458 5.384 11.792 3.662 22.656-7.928 1.453-1.562 1.453-1.562 2.94-3.174 9.391-10.17 16.956-18.8 33.115-37.565 53.392-62.005 79.472-87.526 120.003-110.867 35.075-20.198 65.9 9.485 60.03 47.471-1.647 10.664-4.483 18.534-11.791 35.432-2.907 6.722-4.133 9.646-5.496 13.23-13.173 34.63-24.269 63.518-47.519 123.85l-1.112 2.886c-7.03 18.242-7.03 18.242-14.053 36.48-30.45 79.138-48.927 127.666-67.991 178.988l-1.118 3.008a10180.575 10180.575 0 0 0-10.189 27.469c-21.844 59.238-34.337 97.729-43.838 138.668-1.484 6.37-1.484 6.37-2.988 12.845-5.353 23.158-8.218 38.081-9.82 53.42-2.77 26.522-.543 48.24 7.792 66.493 9.432 20.655 29.697 35.43 52.819 38.786 38.518 5.592 75.683 5.194 107.515-2.048 17.914-4.073 35.638-9.405 53.03-15.942 50.352-18.932 98.861-48.472 145.846-87.52 41.11-34.26 80.008-76 120.788-127.872 3.555-4.492 3.555-4.492 7.098-8.976 12.318-15.707 18.352-25.908 20.605-36.683 2.45-11.698-7.439-23.554-15.343-19.587-3.907 1.96-7.993 6.018-14.22 13.872-4.454 5.715-6.875 8.77-9.298 11.514-9.671 10.95-19.883 22.157-30.947 33.998-18.241 19.513-36.775 38.608-63.656 65.789-13.69 13.844-30.908 25.947-49.42 35.046-29.63 14.559-56.358-3.792-53.148-36.635 2.118-21.681 7.37-44.096 15.224-65.767 17.156-47.367 31.183-85.659 62.216-170.048 13.459-36.6 19.27-52.41 26.528-72.201 21.518-58.652 38.696-105.868 55.04-151.425 20.19-56.275 31.596-98.224 36.877-141.543 3.987-32.673-5.103-63.922-25.834-85.405-22.986-23.816-55.68-34.787-96.399-34.305-45.053.535-97.607 15.256-145.963 37.783Zm308.381-388.422c-80.963-31.5-178.114 22.616-194.382 108.33-11.795 62.124 11.412 115.76 58.78 138.225 93.898 44.531 206.587-26.823 206.592-130.826.005-57.855-24.705-97.718-70.99-115.729Z" fill-rule="evenodd"/>
        </svg>`;case"CrossOrange":return'<svg stroke="#E06C2B" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';case"Edit":return`<svg xmlns="http://www.w3.org/2000/svg" fill="gray" class="h-4 w-4" viewBox="0 0 32 32" version="1.1">
      <path d="M7.263 19.051l-1.656 5.797c-0.030 0.102-0.048 0.22-0.048 0.342 0 0.691 0.559 1.251 1.25 1.252h0c0.126-0 0.248-0.019 0.363-0.053l-0.009 0.002 5.622-1.656c0.206-0.063 0.383-0.17 0.527-0.311l-0 0 17.568-17.394c0.229-0.227 0.371-0.541 0.371-0.889 0-0.345-0.14-0.657-0.365-0.883l-4.141-4.142c-0.227-0.226-0.539-0.366-0.885-0.366s-0.658 0.14-0.885 0.366v0l-17.394 17.394c-0.146 0.146-0.256 0.329-0.316 0.532l-0.002 0.009zM25.859 3.768l2.369 2.369-2.369 2.346-2.37-2.345zM9.578 20.049l12.144-12.144 2.361 2.336-12.307 12.184-3.141 0.924zM30 12.75c-0.69 0-1.25 0.56-1.25 1.25v14.75h-25.5v-25.5h14.75c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0h-16c-0.69 0-1.25 0.56-1.25 1.25v0 28c0 0.69 0.56 1.25 1.25 1.25h28c0.69-0.001 1.249-0.56 1.25-1.25v-16c-0-0.69-0.56-1.25-1.25-1.25h-0z"/>
      </svg>`;case"EditOrange":return'<svg stroke="#E06C2B" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>';case"ThumbUp":return'<svg stroke="#2ecc71" fill="none" stroke-width="2" viewBox="0 0 24 24" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path xmlns="http://www.w3.org/2000/svg" d="M4.42602 12.9469L10.1622 19.1217C11.1546 20.1899 12.8454 20.1899 13.8378 19.1217L19.574 12.9469C21.4753 10.9002 21.4753 7.58179 19.574 5.53505C17.6726 3.48832 14.5899 3.48832 12.6885 5.53505V5.53505C12.3168 5.93527 11.6832 5.93527 11.3115 5.53505V5.53505C9.4101 3.48832 6.32738 3.48832 4.42602 5.53505C2.52466 7.58178 2.52466 10.9002 4.42602 12.9469Z"  stroke-width="2"/></svg>';case"ThumbDown":return'<svg stroke="#e74c3c" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg>';case"Report":return'<svg stroke="#f39c12" fill="none" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>';case"Plus":return'<svg stroke="#f39c12" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';case"Globe":return'<svg fill="none" stroke="gray" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4" height="1em" width="1em"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"></path></svg>';case"Lock":return'<svg fill="none" stroke="gray" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4" height="1em" width="1em"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"></path></svg>';case"Eye":return'<svg fill="none" stroke="#8e44ad" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4" height="1em" width="1em"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>';case"Quote":return'<svg stroke="#FFC300" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';case"Link":return'<svg fill="none" stroke="gray" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4" height="1em" width="1em" stroke-linecap="round" stroke-linejoin="round" class="feather feather-share-2" ><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>';case"Community":return'<svg fill="none" stroke="#e67e22" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4"><path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"></path></svg>';case"star-gray":return`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <g id="Interface / Star">
      <path id="Vector" d="M2.33496 10.3368C2.02171 10.0471 2.19187 9.52339 2.61557 9.47316L8.61914 8.76107C8.79182 8.74059 8.94181 8.63215 9.01465 8.47425L11.5469 2.98446C11.7256 2.59703 12.2764 2.59695 12.4551 2.98439L14.9873 8.47413C15.0601 8.63204 15.2092 8.74077 15.3818 8.76124L21.3857 9.47316C21.8094 9.52339 21.9791 10.0472 21.6659 10.3369L17.2278 14.4419C17.1001 14.56 17.0433 14.7357 17.0771 14.9063L18.255 20.8359C18.3382 21.2544 17.8928 21.5787 17.5205 21.3703L12.2451 18.4166C12.0934 18.3317 11.9091 18.3321 11.7573 18.417L6.48144 21.3695C6.10913 21.5779 5.66294 21.2544 5.74609 20.8359L6.92414 14.9066C6.95803 14.7361 6.90134 14.5599 6.77367 14.4419L2.33496 10.3368Z" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      </svg>`;case"star-yellow":return`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <g id="Interface / Star">
      <path id="Vector" d="M2.33496 10.3368C2.02171 10.0471 2.19187 9.52339 2.61557 9.47316L8.61914 8.76107C8.79182 8.74059 8.94181 8.63215 9.01465 8.47425L11.5469 2.98446C11.7256 2.59703 12.2764 2.59695 12.4551 2.98439L14.9873 8.47413C15.0601 8.63204 15.2092 8.74077 15.3818 8.76124L21.3857 9.47316C21.8094 9.52339 21.9791 10.0472 21.6659 10.3369L17.2278 14.4419C17.1001 14.56 17.0433 14.7357 17.0771 14.9063L18.255 20.8359C18.3382 21.2544 17.8928 21.5787 17.5205 21.3703L12.2451 18.4166C12.0934 18.3317 11.9091 18.3321 11.7573 18.417L6.48144 21.3695C6.10913 21.5779 5.66294 21.2544 5.74609 20.8359L6.92414 14.9066C6.95803 14.7361 6.90134 14.5599 6.77367 14.4419L2.33496 10.3368Z" stroke="#FFC300" fill="#FFC300" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      </svg>
      `;case"grid":return'<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 -5 20 20" id="meteor-icon-kit__solid-grip-lines" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 8.5C0 7.6716 0.67157 7 1.5 7H18.5C19.3284 7 20 7.6716 20 8.5C20 9.3284 19.3284 10 18.5 10H1.5C0.67157 10 0 9.3284 0 8.5zM0 1.5C0 0.67157 0.67157 0 1.5 0H18.5C19.3284 0 20 0.67157 20 1.5C20 2.32843 19.3284 3 18.5 3H1.5C0.67157 3 0 2.32843 0 1.5z" fill="gray"/></svg>';case"grid-yellow":return'<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 -5 20 20" id="meteor-icon-kit__solid-grip-lines" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 8.5C0 7.6716 0.67157 7 1.5 7H18.5C19.3284 7 20 7.6716 20 8.5C20 9.3284 19.3284 10 18.5 10H1.5C0.67157 10 0 9.3284 0 8.5zM0 1.5C0 0.67157 0.67157 0 1.5 0H18.5C19.3284 0 20 0.67157 20 1.5C20 2.32843 19.3284 3 18.5 3H1.5C0.67157 3 0 2.32843 0 1.5z" fill="#FFC300"/></svg>';case"list":return`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="h-4 w-4" viewBox="0 0 24 24" version="1.1">
      <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="Design" transform="translate(-528.000000, -192.000000)" fill-rule="nonzero">
              <g id="distribute_spacing_vertical_line" transform="translate(528.000000, 192.000000)">
                  <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="MingCute" fill-rule="nonzero">
  
  </path>
                  <path d="M20,19 C20.5523,19 21,19.4477 21,20 C21,20.5523 20.5523,21 20,21 L4,21 C3.44772,21 3,20.5523 3,20 C3,19.4477 3.44772,19 4,19 L20,19 Z M17,8 C18.1046,8 19,8.89543 19,10 L19,14 C19,15.1046 18.1046,16 17,16 L7,16 C5.89543,16 5,15.1046 5,14 L5,10 C5,8.89543 5.89543,8 7,8 L17,8 Z M17,10 L7,10 L7,14 L17,14 L17,10 Z M20,3 C20.5523,3 21,3.44772 21,4 C21,4.51283143 20.613973,4.93550653 20.1166239,4.9932722 L20,5 L4,5 C3.44772,5 3,4.55228 3,4 C3,3.48716857 3.38604429,3.06449347 3.88337975,3.0067278 L4,3 L20,3 Z" id="形状" fill="gray">
  
  </path>
              </g>
          </g>
      </g>
  </svg>`;case"list-yellow":return`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="h-4 w-4" viewBox="0 0 24 24" version="1.1">
      <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="Design" transform="translate(-528.000000, -192.000000)" fill-rule="nonzero">
              <g id="distribute_spacing_vertical_line" transform="translate(528.000000, 192.000000)">
                  <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="MingCute" fill-rule="nonzero">
  
  </path>
                  <path d="M20,19 C20.5523,19 21,19.4477 21,20 C21,20.5523 20.5523,21 20,21 L4,21 C3.44772,21 3,20.5523 3,20 C3,19.4477 3.44772,19 4,19 L20,19 Z M17,8 C18.1046,8 19,8.89543 19,10 L19,14 C19,15.1046 18.1046,16 17,16 L7,16 C5.89543,16 5,15.1046 5,14 L5,10 C5,8.89543 5.89543,8 7,8 L17,8 Z M17,10 L7,10 L7,14 L17,14 L17,10 Z M20,3 C20.5523,3 21,3.44772 21,4 C21,4.51283143 20.613973,4.93550653 20.1166239,4.9932722 L20,5 L4,5 C3.44772,5 3,4.55228 3,4 C3,3.48716857 3.38604429,3.06449347 3.88337975,3.0067278 L4,3 L20,3 Z" id="形状" fill="#FFC300">
  
  </path>
              </g>
          </g>
      </g>
  </svg>`;case"next":return`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="gray" class="h-4 w-4 " version="1.1" id="Layer_1" width="800px" height="800px" viewBox="0 0 8 8" enable-background="new 0 0 8 8" xml:space="preserve">
      <rect x="2.95" y="1.921" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 7.6689 8.4842)" width="5.283" height="1.466"/>
      <rect x="0.024" y="3.157" width="6.375" height="1.683"/>
      <rect x="2.956" y="4.615" transform="matrix(-0.7069 0.7073 -0.7073 -0.7069 13.3369 5.1684)" width="5.284" height="1.465"/>
      </svg>`;case"previous":return`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="gray" class="h-4 w-4 " version="1.1" id="Layer_1"  viewBox="0 0 8 8" enable-background="new 0 0 8 8" xml:space="preserve">
      <rect x="-0.226" y="4.614" transform="matrix(0.7071 0.7071 -0.7071 0.7071 4.4884 -0.1417)" width="5.283" height="1.466"/>
      <rect x="1.607" y="3.161" width="6.375" height="1.683"/>
      <rect x="-0.233" y="1.921" transform="matrix(0.7069 -0.7073 0.7073 0.7069 -1.1708 2.4817)" width="5.284" height="1.465"/>
      </svg>`;case"setting":return`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " viewBox="0 0 24 24" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8.00002C9.79085 8.00002 7.99999 9.79088 7.99999 12C7.99999 14.2092 9.79085 16 12 16C14.2091 16 16 14.2092 16 12C16 9.79088 14.2091 8.00002 12 8.00002ZM9.99999 12C9.99999 10.8955 10.8954 10 12 10C13.1046 10 14 10.8955 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 9.99999 13.1046 9.99999 12Z" fill="gray"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8.00002C9.79085 8.00002 7.99999 9.79088 7.99999 12C7.99999 14.2092 9.79085 16 12 16C14.2091 16 16 14.2092 16 12C16 9.79088 14.2091 8.00002 12 8.00002ZM9.99999 12C9.99999 10.8955 10.8954 10 12 10C13.1046 10 14 10.8955 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 9.99999 13.1046 9.99999 12Z" fill="gray"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7673 1.01709C10.9925 0.999829 11.2454 0.99993 11.4516 1.00001L12.5484 1.00001C12.7546 0.99993 13.0075 0.999829 13.2327 1.01709C13.4989 1.03749 13.8678 1.08936 14.2634 1.26937C14.7635 1.49689 15.1915 1.85736 15.5007 2.31147C15.7454 2.67075 15.8592 3.0255 15.9246 3.2843C15.9799 3.50334 16.0228 3.75249 16.0577 3.9557L16.1993 4.77635L16.2021 4.77788C16.2369 4.79712 16.2715 4.81659 16.306 4.8363L16.3086 4.83774L17.2455 4.49865C17.4356 4.42978 17.6693 4.34509 17.8835 4.28543C18.1371 4.2148 18.4954 4.13889 18.9216 4.17026C19.4614 4.20998 19.9803 4.39497 20.4235 4.70563C20.7734 4.95095 21.0029 5.23636 21.1546 5.4515C21.2829 5.63326 21.4103 5.84671 21.514 6.02029L22.0158 6.86003C22.1256 7.04345 22.2594 7.26713 22.3627 7.47527C22.4843 7.7203 22.6328 8.07474 22.6777 8.52067C22.7341 9.08222 22.6311 9.64831 22.3803 10.1539C22.1811 10.5554 21.9171 10.8347 21.7169 11.0212C21.5469 11.1795 21.3428 11.3417 21.1755 11.4746L20.5 12L21.1755 12.5254C21.3428 12.6584 21.5469 12.8205 21.7169 12.9789C21.9171 13.1653 22.1811 13.4446 22.3802 13.8461C22.631 14.3517 22.7341 14.9178 22.6776 15.4794C22.6328 15.9253 22.4842 16.2797 22.3626 16.5248C22.2593 16.7329 22.1255 16.9566 22.0158 17.14L21.5138 17.9799C21.4102 18.1535 21.2828 18.3668 21.1546 18.5485C21.0028 18.7637 20.7734 19.0491 20.4234 19.2944C19.9803 19.6051 19.4613 19.7901 18.9216 19.8298C18.4954 19.8612 18.1371 19.7852 17.8835 19.7146C17.6692 19.6549 17.4355 19.5703 17.2454 19.5014L16.3085 19.1623L16.306 19.1638C16.2715 19.1835 16.2369 19.2029 16.2021 19.2222L16.1993 19.2237L16.0577 20.0443C16.0228 20.2475 15.9799 20.4967 15.9246 20.7157C15.8592 20.9745 15.7454 21.3293 15.5007 21.6886C15.1915 22.1427 14.7635 22.5032 14.2634 22.7307C13.8678 22.9107 13.4989 22.9626 13.2327 22.983C13.0074 23.0002 12.7546 23.0001 12.5484 23H11.4516C11.2454 23.0001 10.9925 23.0002 10.7673 22.983C10.5011 22.9626 10.1322 22.9107 9.73655 22.7307C9.23648 22.5032 8.80849 22.1427 8.49926 21.6886C8.25461 21.3293 8.14077 20.9745 8.07542 20.7157C8.02011 20.4967 7.97723 20.2475 7.94225 20.0443L7.80068 19.2237L7.79791 19.2222C7.7631 19.2029 7.72845 19.1835 7.69396 19.1637L7.69142 19.1623L6.75458 19.5014C6.5645 19.5702 6.33078 19.6549 6.11651 19.7146C5.86288 19.7852 5.50463 19.8611 5.07841 19.8298C4.53866 19.7901 4.01971 19.6051 3.57654 19.2944C3.2266 19.0491 2.99714 18.7637 2.84539 18.5485C2.71718 18.3668 2.58974 18.1534 2.4861 17.9798L1.98418 17.14C1.87447 16.9566 1.74067 16.7329 1.63737 16.5248C1.51575 16.2797 1.36719 15.9253 1.32235 15.4794C1.26588 14.9178 1.36897 14.3517 1.61976 13.8461C1.81892 13.4446 2.08289 13.1653 2.28308 12.9789C2.45312 12.8205 2.65717 12.6584 2.82449 12.5254L3.47844 12.0054V11.9947L2.82445 11.4746C2.65712 11.3417 2.45308 11.1795 2.28304 11.0212C2.08285 10.8347 1.81888 10.5554 1.61972 10.1539C1.36893 9.64832 1.26584 9.08224 1.3223 8.52069C1.36714 8.07476 1.51571 7.72032 1.63732 7.47528C1.74062 7.26715 1.87443 7.04347 1.98414 6.86005L2.48605 6.02026C2.58969 5.84669 2.71714 5.63326 2.84534 5.45151C2.9971 5.23637 3.22655 4.95096 3.5765 4.70565C4.01966 4.39498 4.53862 4.20999 5.07837 4.17027C5.50458 4.1389 5.86284 4.21481 6.11646 4.28544C6.33072 4.34511 6.56444 4.4298 6.75451 4.49867L7.69141 4.83775L7.69394 4.8363C7.72844 4.8166 7.7631 4.79712 7.79791 4.77788L7.80068 4.77635L7.94225 3.95571C7.97723 3.7525 8.02011 3.50334 8.07542 3.2843C8.14077 3.0255 8.25461 2.67075 8.49926 2.31147C8.80849 1.85736 9.23648 1.49689 9.73655 1.26937C10.1322 1.08936 10.5011 1.03749 10.7673 1.01709ZM14.0938 4.3363C14.011 3.85634 13.9696 3.61637 13.8476 3.43717C13.7445 3.2858 13.6019 3.16564 13.4352 3.0898C13.2378 3.00002 12.9943 3.00002 12.5073 3.00002H11.4927C11.0057 3.00002 10.7621 3.00002 10.5648 3.0898C10.3981 3.16564 10.2555 3.2858 10.1524 3.43717C10.0304 3.61637 9.98895 3.85634 9.90615 4.3363L9.75012 5.24064C9.69445 5.56333 9.66662 5.72467 9.60765 5.84869C9.54975 5.97047 9.50241 6.03703 9.40636 6.13166C9.30853 6.22804 9.12753 6.3281 8.76554 6.52822C8.73884 6.54298 8.71227 6.55791 8.68582 6.57302C8.33956 6.77078 8.16643 6.86966 8.03785 6.90314C7.91158 6.93602 7.83293 6.94279 7.70289 6.93196C7.57049 6.92094 7.42216 6.86726 7.12551 6.7599L6.11194 6.39308C5.66271 6.2305 5.43809 6.14921 5.22515 6.16488C5.04524 6.17811 4.87225 6.23978 4.72453 6.34333C4.5497 6.46589 4.42715 6.67094 4.18206 7.08103L3.72269 7.84965C3.46394 8.2826 3.33456 8.49907 3.31227 8.72078C3.29345 8.90796 3.32781 9.09665 3.41141 9.26519C3.51042 9.4648 3.7078 9.62177 4.10256 9.9357L4.82745 10.5122C5.07927 10.7124 5.20518 10.8126 5.28411 10.9199C5.36944 11.036 5.40583 11.1114 5.44354 11.2504C5.47844 11.379 5.47844 11.586 5.47844 12C5.47844 12.414 5.47844 12.621 5.44354 12.7497C5.40582 12.8887 5.36944 12.9641 5.28413 13.0801C5.20518 13.1875 5.07927 13.2876 4.82743 13.4879L4.10261 14.0643C3.70785 14.3783 3.51047 14.5352 3.41145 14.7349C3.32785 14.9034 3.29349 15.0921 3.31231 15.2793C3.33461 15.501 3.46398 15.7174 3.72273 16.1504L4.1821 16.919C4.4272 17.3291 4.54974 17.5342 4.72457 17.6567C4.8723 17.7603 5.04528 17.8219 5.2252 17.8352C5.43813 17.8508 5.66275 17.7695 6.11199 17.607L7.12553 17.2402C7.42216 17.1328 7.5705 17.0791 7.7029 17.0681C7.83294 17.0573 7.91159 17.064 8.03786 17.0969C8.16644 17.1304 8.33956 17.2293 8.68582 17.427C8.71228 17.4421 8.73885 17.4571 8.76554 17.4718C9.12753 17.6719 9.30853 17.772 9.40635 17.8684C9.50241 17.963 9.54975 18.0296 9.60765 18.1514C9.66662 18.2754 9.69445 18.4367 9.75012 18.7594L9.90615 19.6637C9.98895 20.1437 10.0304 20.3837 10.1524 20.5629C10.2555 20.7142 10.3981 20.8344 10.5648 20.9102C10.7621 21 11.0057 21 11.4927 21H12.5073C12.9943 21 13.2378 21 13.4352 20.9102C13.6019 20.8344 13.7445 20.7142 13.8476 20.5629C13.9696 20.3837 14.011 20.1437 14.0938 19.6637L14.2499 18.7594C14.3055 18.4367 14.3334 18.2754 14.3923 18.1514C14.4502 18.0296 14.4976 17.963 14.5936 17.8684C14.6915 17.772 14.8725 17.6719 15.2344 17.4718C15.2611 17.4571 15.2877 17.4421 15.3141 17.427C15.6604 17.2293 15.8335 17.1304 15.9621 17.0969C16.0884 17.064 16.167 17.0573 16.2971 17.0681C16.4295 17.0791 16.5778 17.1328 16.8744 17.2402L17.888 17.607C18.3372 17.7696 18.5619 17.8509 18.7748 17.8352C18.9547 17.8219 19.1277 17.7603 19.2754 17.6567C19.4502 17.5342 19.5728 17.3291 19.8179 16.919L20.2773 16.1504C20.536 15.7175 20.6654 15.501 20.6877 15.2793C20.7065 15.0921 20.6721 14.9034 20.5885 14.7349C20.4895 14.5353 20.2921 14.3783 19.8974 14.0643L19.1726 13.4879C18.9207 13.2876 18.7948 13.1875 18.7159 13.0801C18.6306 12.9641 18.5942 12.8887 18.5564 12.7497C18.5215 12.6211 18.5215 12.414 18.5215 12C18.5215 11.586 18.5215 11.379 18.5564 11.2504C18.5942 11.1114 18.6306 11.036 18.7159 10.9199C18.7948 10.8126 18.9207 10.7124 19.1725 10.5122L19.8974 9.9357C20.2922 9.62176 20.4896 9.46479 20.5886 9.26517C20.6722 9.09664 20.7065 8.90795 20.6877 8.72076C20.6654 8.49906 20.5361 8.28259 20.2773 7.84964L19.8179 7.08102C19.5728 6.67093 19.4503 6.46588 19.2755 6.34332C19.1277 6.23977 18.9548 6.1781 18.7748 6.16486C18.5619 6.14919 18.3373 6.23048 17.888 6.39307L16.8745 6.75989C16.5778 6.86725 16.4295 6.92093 16.2971 6.93195C16.167 6.94278 16.0884 6.93601 15.9621 6.90313C15.8335 6.86965 15.6604 6.77077 15.3142 6.57302C15.2877 6.55791 15.2611 6.54298 15.2345 6.52822C14.8725 6.3281 14.6915 6.22804 14.5936 6.13166C14.4976 6.03703 14.4502 5.97047 14.3923 5.84869C14.3334 5.72467 14.3055 5.56332 14.2499 5.24064L14.0938 4.3363Z" fill="gray"/>
      </svg>`;case"add":return`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 "  viewBox="0 0 22 22" fill="none">
      <path d="M7 12L12 12M12 12L17 12M12 12V7M12 12L12 17" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="12" r="9" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;case"add-5":return`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 "  viewBox="0 0 22 22" fill="none">
      <path d="M7 12L12 12M12 12L17 12M12 12V7M12 12L12 17" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="12" r="9" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;case"add-white":return`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 "  viewBox="0 0 22 22" fill="none">
      <path d="M7 12L12 12M12 12L17 12M12 12V7M12 12L12 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="12" r="9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;case"add-go":return`<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 "  viewBox="0 0 22 22" fill="none">
      <path d="M7 12L12 12M12 12L17 12M12 12V7M12 12L12 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="12" r="9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;case"pin-yellow":return`<svg xmlns="http://www.w3.org/2000/svg" fill="#FFC300" class="h-4 w-4 " viewBox="0 0 16 16"><link xmlns="" type="text/css" rel="stylesheet" id="dark-mode-custom-link"/><link xmlns="" type="text/css" rel="stylesheet" id="dark-mode-general-link"/><style xmlns="" lang="en" type="text/css" id="dark-mode-custom-style"/><style xmlns="" lang="en" type="text/css" id="dark-mode-native-style"/><style xmlns="" lang="en" type="text/css" id="dark-mode-native-sheet"/>

      <g>
      
      <polygon points="13 8 11 6 11 3 12 3 12 1 4 1 4 3 5 3 5 6 3 8 3 10 7.3 10 7.3 16 8.7 16 8.7 10 13 10 13 8"/>
      
      </g>
      
      </svg>`;case"pin-gray":return`<svg xmlns="http://www.w3.org/2000/svg" transform="rotate(-45)" class="h-4 w-4 " viewBox="0 0 15 15" fill="none">
      <path d="M0.5 14.5L5 10M0.5 5.5L9.5 14.5M8.5 0.5L14.5 6.5M1.5 6.5L9.5 1.5M8.5 13.5L13.5 5.5" stroke="gray"/>
      </svg>`;case"fork":return`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="gray" class="h-4 w-4 " viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet">
      <path d="M24,10V6a2,2,0,0,0-2-2H6A2,2,0,0,0,4,6V22a2,2,0,0,0,2,2h4V12a2,2,0,0,1,2-2Z" class="clr-i-solid clr-i-solid-path-1"/><path d="M30,12H14a2,2,0,0,0-2,2V30a2,2,0,0,0,2,2H30a2,2,0,0,0,2-2V14A2,2,0,0,0,30,12ZM28,23H23v5H21V23H16V21h5V16h2v5h5Z" class="clr-i-solid clr-i-solid-path-2"/>
      <rect x="0" y="0" width="36" height="36" fill-opacity="0"/>
  </svg>`;case"fork-yellow":return`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#FFC300" class="h-4 w-4 " viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet">
      <path d="M24,10V6a2,2,0,0,0-2-2H6A2,2,0,0,0,4,6V22a2,2,0,0,0,2,2h4V12a2,2,0,0,1,2-2Z" class="clr-i-solid clr-i-solid-path-1"/><path d="M30,12H14a2,2,0,0,0-2,2V30a2,2,0,0,0,2,2H30a2,2,0,0,0,2-2V14A2,2,0,0,0,30,12ZM28,23H23v5H21V23H16V21h5V16h2v5h5Z" class="clr-i-solid clr-i-solid-path-2"/>
      <rect x="0" y="0" width="36" height="36" fill-opacity="0"/>
  </svg>`;case"import":return`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " viewBox="0 0 24 24" fill="none">
      <path d="M12.44 14.75H3.75C3.34 14.75 3 14.41 3 14C3 13.59 3.34 13.25 3.75 13.25H12.44L10.72 11.53C10.43 11.24 10.43 10.76 10.72 10.47C11.01 10.18 11.49 10.18 11.78 10.47L14.78 13.47C14.85 13.54 14.9 13.62 14.94 13.71C15.02 13.89 15.02 14.1 14.94 14.28C14.9 14.37 14.85 14.45 14.78 14.52L11.78 17.52C11.63 17.67 11.44 17.74 11.25 17.74C11.06 17.74 10.87 17.67 10.72 17.52C10.43 17.23 10.43 16.75 10.72 16.46L12.44 14.74V14.75ZM21 9.5V18C21 19.52 19.77 20.75 18.25 20.75H10.75C9.23 20.75 8 19.52 8 18V17C8 16.59 8.34 16.25 8.75 16.25C9.16 16.25 9.5 16.59 9.5 17V18C9.5 18.69 10.06 19.25 10.75 19.25H18.25C18.94 19.25 19.5 18.69 19.5 18V10.25H14.75C14.34 10.25 14 9.91 14 9.5V4.75H10.75C10.06 4.75 9.5 5.31 9.5 6V11C9.5 11.41 9.16 11.75 8.75 11.75C8.34 11.75 8 11.41 8 11V6C8 4.48 9.23 3.25 10.75 3.25H14.75C14.95 3.25 15.14 3.33 15.28 3.47L20.78 8.97C20.92 9.11 21 9.3 21 9.5ZM15.5 8.75H18.44L15.5 5.81V8.75Z" fill="gray"/>
      </svg>`;case"import-h5":return`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 " viewBox="0 0 24 24" fill="none">
      <path d="M12.44 14.75H3.75C3.34 14.75 3 14.41 3 14C3 13.59 3.34 13.25 3.75 13.25H12.44L10.72 11.53C10.43 11.24 10.43 10.76 10.72 10.47C11.01 10.18 11.49 10.18 11.78 10.47L14.78 13.47C14.85 13.54 14.9 13.62 14.94 13.71C15.02 13.89 15.02 14.1 14.94 14.28C14.9 14.37 14.85 14.45 14.78 14.52L11.78 17.52C11.63 17.67 11.44 17.74 11.25 17.74C11.06 17.74 10.87 17.67 10.72 17.52C10.43 17.23 10.43 16.75 10.72 16.46L12.44 14.74V14.75ZM21 9.5V18C21 19.52 19.77 20.75 18.25 20.75H10.75C9.23 20.75 8 19.52 8 18V17C8 16.59 8.34 16.25 8.75 16.25C9.16 16.25 9.5 16.59 9.5 17V18C9.5 18.69 10.06 19.25 10.75 19.25H18.25C18.94 19.25 19.5 18.69 19.5 18V10.25H14.75C14.34 10.25 14 9.91 14 9.5V4.75H10.75C10.06 4.75 9.5 5.31 9.5 6V11C9.5 11.41 9.16 11.75 8.75 11.75C8.34 11.75 8 11.41 8 11V6C8 4.48 9.23 3.25 10.75 3.25H14.75C14.95 3.25 15.14 3.33 15.28 3.47L20.78 8.97C20.92 9.11 21 9.3 21 9.5ZM15.5 8.75H18.44L15.5 5.81V8.75Z" fill="gray"/>
      </svg>`;case"import-yellow":return`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 "  viewBox="0 0 16 16">
      <path fill="#FFC300" fill-rule="evenodd" d="M14,9 C14.5523,9 15,9.44772 15,10 L15,13 C15,14.1046 14.1046,15 13,15 L3,15 C1.89543,15 1,14.1046 1,13 L1,10 C1,9.44772 1.44772,9 2,9 C2.55228,9 3,9.44771 3,10 L3,13 L13,13 L13,10 C13,9.44771 13.4477,9 14,9 Z M8,1 C8.55228,1 9,1.44772 9,2 L9,6.58579 L10.2929,5.29289 C10.6834,4.90237 11.3166,4.90237 11.7071,5.29289 C12.0976,5.68342 12.0976,6.31658 11.7071,6.70711 L8,10.4142 L4.29289,6.70711 C3.90237,6.31658 3.90237,5.68342 4.29289,5.29289 C4.68342,4.90237 5.31658,4.90237 5.70711,5.29289 L7,6.58579 L7,2 C7,1.44772 7.44772,1 8,1 Z"/>
    </svg>`;case"export":return`<svg xmlns="http://www.w3.org/2000/svg" fill="gray" class="h-4 w-4 " viewBox="0 0 256 256" id="Flat">
   <path d="M71.51465,88.48535a12.0001,12.0001,0,0,1,16.9707-16.9707L116,99.0293V24a12,12,0,0,1,24,0V99.0293l27.51465-27.51465a12.0001,12.0001,0,0,1,16.9707,16.9707l-48,48c-.01855.01856-.03906.03369-.05762.05225q-.394.38892-.82128.7417c-.14112.11621-.29.21728-.43555.32617-.168.12549-.33252.25586-.50733.37305-.17138.11425-.34912.21386-.5249.31836-.16015.09619-.31738.19677-.48291.28564-.17822.09521-.36133.17578-.543.26172-.17334.08154-.34326.168-.521.2417-.17676.07324-.35742.13183-.53711.19629-.18946.06836-.377.14111-.57129.20019-.17969.0542-.36182.09375-.543.13965-.19824.04981-.394.10547-.59619.14551-.2085.041-.41944.06592-.62988.09619-.17676.02539-.35108.05908-.53077.07666C128.79,139.979,128.395,140,128,140s-.79-.021-1.18359-.05957c-.17969-.01758-.354-.05127-.53077-.07666-.21044-.03027-.42138-.05518-.62988-.09619-.20215-.04-.39795-.0957-.59619-.14551-.18115-.0459-.36328-.08545-.543-.13965-.19433-.05908-.38232-.13183-.57226-.20019-.1792-.06446-.35938-.12305-.53614-.19629-.17773-.07373-.34814-.16016-.52148-.24219-.18164-.08545-.36475-.166-.54248-.26123-.16553-.08887-.32276-.18945-.48291-.28564-.17578-.1045-.35352-.20411-.5249-.31836-.17481-.11719-.33936-.24756-.50733-.37305-.14551-.10889-.29443-.21-.43555-.32617q-.42846-.35157-.82128-.7417c-.01856-.01856-.03907-.03369-.05762-.05225ZM204,168a16,16,0,1,0-16,16A16.01833,16.01833,0,0,0,204,168Zm20-52H184.56836a12,12,0,1,0,0,24H220v56H36V140H71.43164a12,12,0,1,0,0-24H32a20.02229,20.02229,0,0,0-20,20v64a20.02229,20.02229,0,0,0,20,20H224a20.02229,20.02229,0,0,0,20-20V136A20.02229,20.02229,0,0,0,224,116Z"/>
 </svg>`;case"go-back":return`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " viewBox="0 0 16 16">
      <path fill="gray" fill-rule="evenodd" d="M4.297105,3.29289 L0.59,7 L4.297105,10.7071 C4.687635,11.0976 5.320795,11.0976 5.711315,10.7071 C6.101845,10.3166 6.101845,9.68342 5.711315,9.29289 L4.418425,8 L11.504215,8 C12.332615,8 13.004215,8.67157 13.004215,9.5 C13.004215,10.3284 12.332615,11 11.504215,11 L10.004215,11 C9.451935,11 9.004215,11.4477 9.004215,12 C9.004215,12.5523 9.451935,13 10.004215,13 L11.504215,13 C13.437215,13 15.004215,11.433 15.004215,9.5 C15.004215,7.567 13.437215,6 11.504215,6 L4.418425,6 L5.711315,4.70711 C6.101845,4.31658 6.101845,3.68342 5.711315,3.29289 C5.320795,2.90237 4.687635,2.90237 4.297105,3.29289 Z"/>
    </svg>`;case"copy":return`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " viewBox="0 0 24 24" fill="none">
      <g id="Edit / Copy">
      <path id="Vector" d="M9 9V6.2002C9 5.08009 9 4.51962 9.21799 4.0918C9.40973 3.71547 9.71547 3.40973 10.0918 3.21799C10.5196 3 11.0801 3 12.2002 3H17.8002C18.9203 3 19.4801 3 19.9079 3.21799C20.2842 3.40973 20.5905 3.71547 20.7822 4.0918C21.0002 4.51962 21.0002 5.07967 21.0002 6.19978V11.7998C21.0002 12.9199 21.0002 13.48 20.7822 13.9078C20.5905 14.2841 20.2839 14.5905 19.9076 14.7822C19.4802 15 18.921 15 17.8031 15H15M9 9H6.2002C5.08009 9 4.51962 9 4.0918 9.21799C3.71547 9.40973 3.40973 9.71547 3.21799 10.0918C3 10.5196 3 11.0801 3 12.2002V17.8002C3 18.9203 3 19.4801 3.21799 19.9079C3.40973 20.2842 3.71547 20.5905 4.0918 20.7822C4.5192 21 5.07899 21 6.19691 21H11.8036C12.9215 21 13.4805 21 13.9079 20.7822C14.2842 20.5905 14.5905 20.2839 14.7822 19.9076C15 19.4802 15 18.921 15 17.8031V15M9 9H11.8002C12.9203 9 13.4801 9 13.9079 9.21799C14.2842 9.40973 14.5905 9.71547 14.7822 10.0918C15 10.5192 15 11.079 15 12.1969L15 15" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      </svg>`;case"horizontal-menu":return`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " viewBox="0 0 24 24" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M4 12C4 11.4477 4.44772 11 5 11C5.55228 11 6 11.4477 6 12C6 12.5523 5.55228 13 5 13C4.44772 13 4 12.5523 4 12ZM5 15C6.65685 15 8 13.6569 8 12C8 10.3431 6.65685 9 5 9C3.34315 9 2 10.3431 2 12C2 13.6569 3.34315 15 5 15ZM12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11ZM15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12ZM19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11ZM22 12C22 13.6569 20.6569 15 19 15C17.3431 15 16 13.6569 16 12C16 10.3431 17.3431 9 19 9C20.6569 9 22 10.3431 22 12Z" fill="gray"/>
      </svg>`;case"drag-hand":return`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " fill="gray" width="800px" height="800px" viewBox="0 0 24 24"><script xmlns=""/>
      <path d="M6,7 L3.70710678,7 L3.85355339,7.14644661 C4.04881554,7.34170876 4.04881554,7.65829124 3.85355339,7.85355339 C3.65829124,8.04881554 3.34170876,8.04881554 3.14644661,7.85355339 L2.14644661,6.85355339 C1.95118446,6.65829124 1.95118446,6.34170876 2.14644661,6.14644661 L3.14644661,5.14644661 C3.34170876,4.95118446 3.65829124,4.95118446 3.85355339,5.14644661 C4.04881554,5.34170876 4.04881554,5.65829124 3.85355339,5.85355339 L3.70710678,6 L6,6 L6,3.70710678 L5.85355339,3.85355339 C5.65829124,4.04881554 5.34170876,4.04881554 5.14644661,3.85355339 C4.95118446,3.65829124 4.95118446,3.34170876 5.14644661,3.14644661 L6.14644661,2.14644661 C6.34170876,1.95118446 6.65829124,1.95118446 6.85355339,2.14644661 L7.85355339,3.14644661 C8.04881554,3.34170876 8.04881554,3.65829124 7.85355339,3.85355339 C7.65829124,4.04881554 7.34170876,4.04881554 7.14644661,3.85355339 L7,3.70710678 L7,6 L9.29289322,6 L9.14644661,5.85355339 C8.95118446,5.65829124 8.95118446,5.34170876 9.14644661,5.14644661 C9.34170876,4.95118446 9.65829124,4.95118446 9.85355339,5.14644661 L10.8535534,6.14644661 C11.0488155,6.34170876 11.0488155,6.65829124 10.8535534,6.85355339 L9.85355339,7.85355339 C9.65829124,8.04881554 9.34170876,8.04881554 9.14644661,7.85355339 C8.95118446,7.65829124 8.95118446,7.34170876 9.14644661,7.14644661 L9.29289322,7 L7,7 L7,9.29289322 L7.14644661,9.14644661 C7.34170876,8.95118446 7.65829124,8.95118446 7.85355339,9.14644661 C8.04881554,9.34170876 8.04881554,9.65829124 7.85355339,9.85355339 L6.85355339,10.8535534 C6.65829124,11.0488155 6.34170876,11.0488155 6.14644661,10.8535534 L5.14644661,9.85355339 C4.95118446,9.65829124 4.95118446,9.34170876 5.14644661,9.14644661 C5.34170876,8.95118446 5.65829124,8.95118446 5.85355339,9.14644661 L6,9.29289322 L6,7 Z M14,9.5 L14,12.0474376 C14,12.3783481 13.8839855,12.698786 13.6721417,12.9529985 C13.1720143,13.5531514 12.2800608,13.6342381 11.6799078,13.1341106 L10.7560738,12.3642489 C10.4736449,12.1288916 10.11764,12 9.75,12 C9.48363526,12 9.24082605,12.1526146 9.12532205,12.3926334 L9.08962348,12.4668155 C8.95447865,12.7476481 8.99541029,13.0814869 9.19439734,13.321352 L13.607865,18.6414804 C14.3217788,19.502054 15.3818498,20 16.5,20 C18.9852814,20 21,17.9852814 21,15.5 L21,11.5 C21,11.2238576 20.7761424,11 20.5,11 C20.2238576,11 20,11.2238576 20,11.5 L20,12.5 C20,12.7761424 19.7761424,13 19.5,13 C19.2238576,13 19,12.7761424 19,12.5 L19,10.5 C19,10.2238576 18.7761424,10 18.5,10 C18.2238576,10 18,10.2238576 18,10.5 L18,12.5 C18,12.7761424 17.7761424,13 17.5,13 C17.2238576,13 17,12.7761424 17,12.5 L17,9.5 C17,9.22385763 16.7761424,9 16.5,9 C16.2238576,9 16,9.22385763 16,9.5 L16,12.5 C16,12.7761424 15.7761424,13 15.5,13 C15.2238576,13 15,12.7761424 15,12.5 L15,5.5 C15,5.22385763 14.7761424,5 14.5,5 C14.2238576,5 14,5.22385763 14,5.5 L14,9.5 Z M13,9.49999997 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 C15.3284271,4 16,4.67157288 16,5.5 L16,8.08535285 C16.1563895,8.03007711 16.3246823,8 16.5,8 C17.191734,8 17.7741062,8.46823386 17.9474595,9.10504462 C18.1184541,9.03725677 18.3048761,9 18.5,9 C19.191734,9 19.7741062,9.46823386 19.9474595,10.1050446 C20.1184541,10.0372568 20.3048761,10 20.5,10 C21.3284271,10 22,10.6715729 22,11.5 L22,15.5 C22,18.5375661 19.5375661,21 16.5,21 C15.0842933,21 13.7421216,20.3695431 12.8382246,19.279958 L8.42475695,13.9598296 C7.97611908,13.4190278 7.88383427,12.6663521 8.18853292,12.0331845 L8.2242315,11.9590024 C8.50634865,11.3727595 9.09940726,11 9.75,11 C10.3515765,11 10.9341143,11.2109078 11.3962582,11.5960277 L12.3200922,12.3658894 C12.4959683,12.5124527 12.7573571,12.4886901 12.9039205,12.3128141 C12.9660017,12.2383166 13,12.1444116 13,12.0474376 L13,9.5 Z"/>
    </svg>`;case"drag-lines":return`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 drag-icon cursor-move " fill="gray" viewBox="0 0 48 48"><link xmlns="" type="text/css" rel="stylesheet" id="dark-mode-custom-link"/><link xmlns="" type="text/css" rel="stylesheet" id="dark-mode-general-link"/><style xmlns="" lang="en" type="text/css" id="dark-mode-custom-style"/><style xmlns="" lang="en" type="text/css" id="dark-mode-native-style"/><style xmlns="" lang="en" type="text/css" id="dark-mode-native-sheet"/>
      
      <g id="Layer_2" data-name="Layer 2">
        <g id="invisible_box" data-name="invisible box">
          <rect width="48" height="48" fill="none"/>
        </g>
        <g id="icons_Q2" data-name="icons Q2">
          <g>
            <path d="M46,20a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2H2a2,2,0,0,1,2-2H44a2,2,0,0,1,2,2Z"/>
            <path d="M46,28a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2H2a2,2,0,0,1,2-2H44a2,2,0,0,1,2,2Z"/>
          </g>
        </g>
      </g>
    </svg>`;case"drag-prompt":return`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 drag-icon-prompt cursor-grab " fill="gray" viewBox="0 0 48 48"><link xmlns="" type="text/css" rel="stylesheet" id="dark-mode-custom-link"/><link xmlns="" type="text/css" rel="stylesheet" id="dark-mode-general-link"/><style xmlns="" lang="en" type="text/css" id="dark-mode-custom-style"/><style xmlns="" lang="en" type="text/css" id="dark-mode-native-style"/><style xmlns="" lang="en" type="text/css" id="dark-mode-native-sheet"/>
      
      <g id="Layer_2" data-name="Layer 2">
        <g id="invisible_box" data-name="invisible box">
          <rect width="48" height="48" fill="none"/>
        </g>
        <g id="icons_Q2" data-name="icons Q2">
          <g>
            <path d="M46,20a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2H2a2,2,0,0,1,2-2H44a2,2,0,0,1,2,2Z"/>
            <path d="M46,28a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2H2a2,2,0,0,1,2-2H44a2,2,0,0,1,2,2Z"/>
          </g>
        </g>
      </g>
    </svg>`;case"no-txt-logo-light":return'<svg id="Layer_1" style="width:5em; margin-left:25%;"  data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 198.6 198.6"><defs><style>.cls-1{fill:#505d69;stroke:#505d69;stroke-miterlimit:10;stroke-width:4px;}.cls-2{fill:#fff;}</style></defs><rect class="cls-1" x="3.35" y="3.11" width="192.39" height="192.39" rx="20"/><path class="cls-2" d="M120.14,132.35,107.07,116,89.16,93.72l0,0L57.14,53.6a5,5,0,0,0-3.91-1.88v0H34.45a5,5,0,0,0-4.3,7.67L71.79,144.1a5,5,0,0,0,6.71,2.3,5,5,0,0,0,1.67-1.32L93,129.5l-6.43-8-9.16,11.18L42.51,61.76h8.33l40,49.95,12.35,15.38,0,0,14,17.47a5,5,0,0,0,2,1.72,5,5,0,0,0,6.69-2.4l42.68-84.71a5,5,0,0,0,.64-2.46,5,5,0,0,0-5-5h-18v0a5,5,0,0,0-3.87,1.83l-37,45.11,6.42,8,36.8-44.88h7.65l-36,70.59Z"/></svg>';case"no-txt-logo-dark":return'<svg id="Layer_1" style="width:5em; margin-left:25%;" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200.7 200.7"><defs><style>.cls-1{fill:none;stroke:#fff;stroke-miterlimit:10;stroke-width:4px;}.cls-2{fill:#fff;}</style></defs><rect class="cls-1" x="4.3" y="4.51" width="192.39" height="192.39" rx="20"/><path class="cls-2" d="M121.08,133.74,108,117.41,90.1,95.12l.05,0L58.09,55a5,5,0,0,0-3.92-1.88v0H35.39a5,5,0,0,0-4.29,7.67L72.73,145.5a5,5,0,0,0,6.71,2.3,4.85,4.85,0,0,0,1.67-1.32L93.89,130.9l-6.42-8L78.3,134.09,43.45,63.16h8.34l39.95,50,12.36,15.37,0,0L118,146a4.94,4.94,0,0,0,2,1.71,5,5,0,0,0,6.68-2.39l42.68-84.71a5,5,0,0,0-4.39-7.5h-18v0a5,5,0,0,0-3.87,1.83l-37,45.11,6.42,8,36.8-44.88h7.65l-36,70.59Z"/></svg>';case"reload":return`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="gray" class="h-4 w-4 " version="1.1" id="Capa_1" viewBox="0 0 489.533 489.533" xml:space="preserve"><link xmlns="" type="text/css" rel="stylesheet" id="dark-mode-custom-link"/><link xmlns="" type="text/css" rel="stylesheet" id="dark-mode-general-link"/><style xmlns="" lang="en" type="text/css" id="dark-mode-custom-style"/><style xmlns="" lang="en" type="text/css" id="dark-mode-native-style"/><style xmlns="" lang="en" type="text/css" id="dark-mode-native-sheet"/>
      <g>
        <path d="M268.175,488.161c98.2-11,176.9-89.5,188.1-187.7c14.7-128.4-85.1-237.7-210.2-239.1v-57.6c0-3.2-4-4.9-6.7-2.9   l-118.6,87.1c-2,1.5-2,4.4,0,5.9l118.6,87.1c2.7,2,6.7,0.2,6.7-2.9v-57.5c87.9,1.4,158.3,76.2,152.3,165.6   c-5.1,76.9-67.8,139.3-144.7,144.2c-81.5,5.2-150.8-53-163.2-130c-2.3-14.3-14.8-24.7-29.2-24.7c-17.9,0-31.9,15.9-29.1,33.6   C49.575,418.961,150.875,501.261,268.175,488.161z"/>
      </g>
      </svg>`;case"menu-vertical":return`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " viewBox="0 0 24 24" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4ZM15 5C15 6.65685 13.6569 8 12 8C10.3431 8 9 6.65685 9 5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5ZM12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11ZM15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12ZM11 19C11 18.4477 11.4477 18 12 18C12.5523 18 13 18.4477 13 19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19ZM12 22C13.6569 22 15 20.6569 15 19C15 17.3431 13.6569 16 12 16C10.3431 16 9 17.3431 9 19C9 20.6569 10.3431 22 12 22Z" fill="gray"/>
      </svg>`;case"document":return`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " viewBox="0 0 24 24" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.29289 1.29289C9.48043 1.10536 9.73478 1 10 1H18C19.6569 1 21 2.34315 21 4V20C21 21.6569 19.6569 23 18 23H6C4.34315 23 3 21.6569 3 20V8C3 7.73478 3.10536 7.48043 3.29289 7.29289L9.29289 1.29289ZM18 3H11V8C11 8.55228 10.5523 9 10 9H5V20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20V4C19 3.44772 18.5523 3 18 3ZM6.41421 7H9V4.41421L6.41421 7ZM7 13C7 12.4477 7.44772 12 8 12H16C16.5523 12 17 12.4477 17 13C17 13.5523 16.5523 14 16 14H8C7.44772 14 7 13.5523 7 13ZM7 17C7 16.4477 7.44772 16 8 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H8C7.44772 18 7 17.5523 7 17Z" fill="gray"/>
      </svg>`;case"html-doc":return`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="gray" class="h-4 w-4 " version="1.1" id="Capa_1" viewBox="0 0 511 511" xml:space="preserve">
      <g>
        <path d="M498.962,102.751c-0.018-0.182-0.049-0.359-0.08-0.537c-0.011-0.063-0.016-0.128-0.029-0.191   c-0.042-0.21-0.096-0.416-0.156-0.619c-0.009-0.03-0.014-0.061-0.023-0.091c-0.063-0.207-0.138-0.409-0.218-0.608   c-0.011-0.027-0.019-0.055-0.03-0.081c-0.078-0.189-0.168-0.372-0.261-0.552c-0.019-0.037-0.034-0.075-0.054-0.112   c-0.09-0.167-0.189-0.327-0.291-0.486c-0.031-0.048-0.057-0.098-0.088-0.145c-0.101-0.151-0.212-0.295-0.324-0.438   c-0.039-0.05-0.073-0.102-0.113-0.151c-0.156-0.189-0.32-0.372-0.493-0.545L400.804,2.198c-0.173-0.173-0.355-0.338-0.545-0.493   c-0.049-0.04-0.101-0.074-0.151-0.113c-0.143-0.112-0.287-0.223-0.438-0.324c-0.047-0.032-0.097-0.058-0.145-0.088   c-0.159-0.101-0.319-0.201-0.486-0.291c-0.036-0.02-0.075-0.035-0.112-0.054c-0.181-0.093-0.364-0.183-0.552-0.261   c-0.027-0.011-0.054-0.019-0.081-0.03c-0.199-0.08-0.401-0.155-0.608-0.218c-0.03-0.009-0.061-0.015-0.091-0.023   c-0.203-0.059-0.409-0.114-0.619-0.156c-0.063-0.013-0.128-0.018-0.191-0.029c-0.177-0.031-0.355-0.062-0.537-0.08   C396.001,0.013,395.751,0,395.5,0h-224C149.72,0,132,17.72,132,39.5V80H43.5C26.131,80,12,94.131,12,111.5v80   c0,17.369,14.131,31.5,31.5,31.5H132v248.5c0,21.78,17.72,39.5,39.5,39.5h288c21.78,0,39.5-17.72,39.5-39.5v-368   C499,103.249,498.987,102.999,498.962,102.751z M403,25.606L473.394,96H427.5C413.991,96,403,85.009,403,71.5V25.606z M27,191.5   v-80c0-9.098,7.402-16.5,16.5-16.5h304c9.098,0,16.5,7.402,16.5,16.5v80c0,9.098-7.402,16.5-16.5,16.5H139.519   c-0.007,0-0.013-0.001-0.019-0.001S139.487,208,139.481,208H43.5C34.402,208,27,200.598,27,191.5z M459.5,496h-288   c-13.509,0-24.5-10.991-24.5-24.5V223h200.5c17.369,0,31.5-14.131,31.5-31.5v-80c0-17.369-14.131-31.5-31.5-31.5H147V39.5   c0-13.509,10.991-24.5,24.5-24.5H388v56.5c0,21.78,17.72,39.5,39.5,39.5H484v360.5C484,485.009,473.009,496,459.5,496z"/>
        <path d="M115.5,112c-4.142,0-7.5,3.358-7.5,7.5V152H67v-32.5c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v64   c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5V167h41v16.5c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5v-64   C123,115.358,119.642,112,115.5,112z"/>
        <path d="M211.5,191c4.142,0,7.5-3.358,7.5-7.5v-36.923l10.069,16.782c1.355,2.259,3.797,3.641,6.431,3.641h8   c2.634,0,5.076-1.382,6.431-3.641L260,146.577V183.5c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5v-64   c0-3.371-2.249-6.328-5.498-7.228c-3.249-0.9-6.698,0.478-8.433,3.369L239.5,151.589l-21.569-35.948   c-1.734-2.891-5.186-4.267-8.433-3.369c-3.249,0.9-5.498,3.857-5.498,7.228v64C204,187.642,207.358,191,211.5,191z"/>
        <path d="M139.5,127H156v56.5c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5V127h16.5c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5   h-48c-4.142,0-7.5,3.358-7.5,7.5S135.358,127,139.5,127z"/>
        <path d="M299.5,191h40c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5H307v-56.5c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v64   C292,187.642,295.358,191,299.5,191z"/>
        <path d="M341.872,280.385c-3.929-1.309-8.177,0.814-9.487,4.744l-48,144c-1.31,3.929,0.814,8.177,4.744,9.487   c0.787,0.262,1.586,0.387,2.373,0.387c3.14,0,6.066-1.988,7.114-5.13l48-144C347.925,285.942,345.801,281.695,341.872,280.385z"/>
        <path d="M272.803,298.197c-2.929-2.929-7.678-2.929-10.606,0l-56,56c-2.929,2.929-2.929,7.678,0,10.606l56,56   c1.464,1.464,3.384,2.197,5.303,2.197s3.839-0.732,5.303-2.197c2.929-2.929,2.929-7.678,0-10.606L222.106,359.5l50.697-50.697   C275.732,305.875,275.732,301.125,272.803,298.197z"/>
        <path d="M368.803,298.197c-2.929-2.929-7.678-2.929-10.606,0c-2.929,2.929-2.929,7.678,0,10.606l50.697,50.697l-50.697,50.697   c-2.929,2.929-2.929,7.678,0,10.606c1.464,1.464,3.384,2.197,5.303,2.197s3.839-0.732,5.303-2.197l56-56   c2.929-2.929,2.929-7.678,0-10.606L368.803,298.197z"/>
      </g>
      </svg>
      `;case"save":return`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " viewBox="0 0 24 24" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M6.85665 2.30447C8.2922 2.16896 10.3981 2 12 2C13.6019 2 15.7078 2.16896 17.1433 2.30447C18.4976 2.4323 19.549 3.51015 19.6498 4.85178C19.7924 6.74918 20 9.90785 20 12.2367C20 14.022 19.8781 16.2915 19.7575 18.1035C19.697 19.0119 19.6365 19.8097 19.5911 20.3806C19.5685 20.6661 19.5496 20.8949 19.5363 21.0526L19.5209 21.234L19.5154 21.2966L19.5153 21.2976C19.5153 21.2977 19.5153 21.2977 18.7441 21.2308L19.5153 21.2976C19.4927 21.5553 19.3412 21.7845 19.1122 21.9075C18.8831 22.0305 18.6072 22.0309 18.3779 21.9085L12.1221 18.5713C12.0458 18.5307 11.9542 18.5307 11.8779 18.5713L5.62213 21.9085C5.39277 22.0309 5.11687 22.0305 4.88784 21.9075C4.65881 21.7845 4.50732 21.5554 4.48466 21.2977L5.25591 21.2308C4.48466 21.2977 4.48467 21.2978 4.48466 21.2977L4.47913 21.234L4.46371 21.0526C4.45045 20.8949 4.43154 20.6661 4.40885 20.3806C4.3635 19.8097 4.30303 19.0119 4.24255 18.1035C4.12191 16.2915 4 14.022 4 12.2367C4 9.90785 4.20763 6.74918 4.3502 4.85178C4.45102 3.51015 5.50236 2.4323 6.85665 2.30447ZM5.93179 19.9971L11.1455 17.2159C11.6791 16.9312 12.3209 16.9312 12.8545 17.2159L18.0682 19.9971C18.1101 19.4598 18.1613 18.7707 18.2124 18.0019C18.3327 16.1962 18.4516 13.9687 18.4516 12.2367C18.4516 9.97099 18.2482 6.86326 18.1057 4.96632C18.0606 4.366 17.5938 3.89237 16.9969 3.83603C15.5651 3.70088 13.5225 3.53846 12 3.53846C10.4775 3.53846 8.43487 3.70088 7.00309 3.83603C6.40624 3.89237 5.9394 4.366 5.89429 4.96632C5.75175 6.86326 5.54839 9.97099 5.54839 12.2367C5.54839 13.9687 5.66734 16.1962 5.78756 18.0019C5.83874 18.7707 5.88993 19.4598 5.93179 19.9971Z" fill="gray"/>
      </svg>`;case"empty_checkbox":return`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " viewBox="0 0 24 24" fill="none">
      <g id="Interface / Checkbox_Unchecked">
      <path id="Vector" d="M4 7.2002V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2842 19.7822 18.9079C20 18.4805 20 17.9215 20 16.8036V7.19691C20 6.07899 20 5.5192 19.7822 5.0918C19.5905 4.71547 19.2837 4.40973 18.9074 4.21799C18.4796 4 17.9203 4 16.8002 4H7.2002C6.08009 4 5.51962 4 5.0918 4.21799C4.71547 4.40973 4.40973 4.71547 4.21799 5.0918C4 5.51962 4 6.08009 4 7.2002Z" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      </svg>`;case"checked_checkbox":return`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " viewBox="0 0 24 24" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7 2C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2H7ZM15.7295 10.6839C16.1073 10.281 16.0869 9.6482 15.684 9.27047C15.281 8.89274 14.6482 8.91315 14.2705 9.31606L11.1865 12.6056L9.66437 11.2526C9.25159 10.8857 8.61952 10.9229 8.2526 11.3356C7.88568 11.7484 7.92286 12.3805 8.33565 12.7474L10.5856 14.7474C10.9907 15.1075 11.6089 15.0793 11.9795 14.6839L15.7295 10.6839Z" fill="#FFC300"/>
      </svg>`;case"folder":return`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " viewBox="0 0 24 24">
        <title/>
        <g id="Complete">
        <g id="folder">
        <path d="M2,18.8V5.3A2.3,2.3,0,0,1,4.3,3H9.6a1.1,1.1,0,0,1,.8.4l2.8,3.2a1.1,1.1,0,0,0,.8.4h5.6A2.2,2.2,0,0,1,22,9.2v9.7A2.2,2.2,0,0,1,19.8,21H4.2A2.2,2.2,0,0,1,2,18.8Z" fill="none" stroke="gray" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
        </g>
        </g>
      </svg>`;case"eye_off":return`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " viewBox="0 0 24 24" fill="none">
      <g id="Edit / Hide">
      <path id="Vector" d="M3.99989 4L19.9999 20M16.4999 16.7559C15.1473 17.4845 13.6185 17.9999 11.9999 17.9999C8.46924 17.9999 5.36624 15.5478 3.5868 13.7788C3.1171 13.3119 2.88229 13.0784 2.7328 12.6201C2.62619 12.2933 2.62616 11.7066 2.7328 11.3797C2.88233 10.9215 3.11763 10.6875 3.58827 10.2197C4.48515 9.32821 5.71801 8.26359 7.17219 7.42676M19.4999 14.6335C19.8329 14.3405 20.138 14.0523 20.4117 13.7803L20.4146 13.7772C20.8832 13.3114 21.1182 13.0779 21.2674 12.6206C21.374 12.2938 21.3738 11.7068 21.2672 11.38C21.1178 10.9219 20.8827 10.6877 20.4133 10.2211C18.6338 8.45208 15.5305 6 11.9999 6C11.6624 6 11.3288 6.02241 10.9999 6.06448M13.3228 13.5C12.9702 13.8112 12.5071 14 11.9999 14C10.8953 14 9.99989 13.1046 9.99989 12C9.99989 11.4605 10.2135 10.9711 10.5608 10.6113" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      </svg>`;case"eye":return`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " viewBox="0 0 24 24" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M6.30147 15.5771C4.77832 14.2684 3.6904 12.7726 3.18002 12C3.6904 11.2274 4.77832 9.73158 6.30147 8.42294C7.87402 7.07185 9.81574 6 12 6C14.1843 6 16.1261 7.07185 17.6986 8.42294C19.2218 9.73158 20.3097 11.2274 20.8201 12C20.3097 12.7726 19.2218 14.2684 17.6986 15.5771C16.1261 16.9282 14.1843 18 12 18C9.81574 18 7.87402 16.9282 6.30147 15.5771ZM12 4C9.14754 4 6.75717 5.39462 4.99812 6.90595C3.23268 8.42276 2.00757 10.1376 1.46387 10.9698C1.05306 11.5985 1.05306 12.4015 1.46387 13.0302C2.00757 13.8624 3.23268 15.5772 4.99812 17.0941C6.75717 18.6054 9.14754 20 12 20C14.8525 20 17.2429 18.6054 19.002 17.0941C20.7674 15.5772 21.9925 13.8624 22.5362 13.0302C22.947 12.4015 22.947 11.5985 22.5362 10.9698C21.9925 10.1376 20.7674 8.42276 19.002 6.90595C17.2429 5.39462 14.8525 4 12 4ZM10 12C10 10.8954 10.8955 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8955 14 10 13.1046 10 12ZM12 8C9.7909 8 8.00004 9.79086 8.00004 12C8.00004 14.2091 9.7909 16 12 16C14.2092 16 16 14.2091 16 12C16 9.79086 14.2092 8 12 8Z" fill="gray"/>
      </svg>`}},gr=function(e){e=document.getElementById(e);e&&(e.style="display: none;")},mr={[N.INFO]:"bg-gray-500",[N.SUCCESS]:"bg-green-500",[N.UPDATE]:"bg-[#5436DA]"},ur=(e,t,r)=>{var a=e.find(e=>e.MessageStatusNo===S.ACTIVE&&e.MessageSeverityNo===N.MANDATORY_MUST_CONFIRM&&(!e.ExpiryTime||new Date(e.ExpiryTime)>new Date));if(a){var o=a,i=t;let e=document.getElementById("confirmMessageModal");e||((e=document.createElement("div")).id="confirmMessageModal",e.addEventListener("submit",async e=>{e.preventDefault();e=e.target.MessageID.value;await i(e)&&gr("confirmMessageModal")}),document.body.appendChild(e)),e.innerHTML=`
      <div class="fixed inset-0 text-center transition-opacity z-50">
        <div class="absolute bg-gray-900 inset-0 opacity-90">
        </div>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex items-center justify-center min-h-full">
            <form>
              <div
                class="align-center bg-white dark:bg-gray-800 dark:text-gray-200 inline-block overflow-hidden sm:rounded-lg shadow-xl sm:align-middle sm:max-w-2xl sm:my-8 sm:w-full text-left transform transition-all prose dark:prose-invert"
                role="dialog" aria-modal="true" aria-labelledby="modal-headline" style="text-align: left;">

                <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                  <h3 class="mt-1 mb-6">${o.MessageSubject}</h3>

                  <div class="mb-6 overflow-y-auto">${o.MessageBodyHTML}</div>

                  <label class="font-semibold">
                    <input name="MessageID" value="${o.MessageID}" type="checkbox" class="mr-2 dark:bg-gray-700" required> 
                    I read and accept these terms & conditions
                  </label>
                </div>

                <div class="bg-gray-200 dark:bg-gray-700 px-4 py-3 text-right">
                  <button type="submit" id="reportPromptSubmitButton" class="bg-green-600 hover:bg-green-700 mr-2 px-4 py-2 rounded text-white">Confirm
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

      </div>`,e.style="display: block;"}else if(a=e.find(e=>e.MessageStatusNo===S.ACTIVE&&e.MessageSeverityNo!==N.MANDATORY_MUST_CONFIRM&&(!e.ExpiryTime||new Date(e.ExpiryTime)>new Date))){var n=a;var l=r;const s=mr[n.MessageSeverityNo],d=document.createElement("div");d.innerHTML=`
      <div class="fixed flex justify-center w-full top-2 px-2 z-50 pointer-events-none">
        <div class="${s} flex pointer-events-auto px-6 py-3 rounded-md text-white" role="alert" style="min-width: 30rem;">
          <div class="flex flex-col gap-2 w-full">

            <h4 class="w-full">${n.MessageSubject}</h4>

            <div class="prose w-full text-white">
              ${n.MessageBodyHTML}
            </div> 

            <div class="flex gap-4 mt-4" style="justify-content: end;">
              <button data-message-vote-type-no="${I.MESSAGE_LIKE}" title="I like this">${v("ThumbUp")}</button>
              <button data-message-vote-type-no="${I.MESSAGE_DISLIKE}" title="I don't like this">${v("ThumbDown")}</button>
            </div>

          </div>
        </div>
      </div>
    `,d.querySelectorAll("button").forEach(e=>{e.addEventListener("click",async e=>{await l(n.MessageID,+e.target.closest("button").dataset.messageVoteTypeNo)&&d.remove()})}),document.body.appendChild(d)}},vr={english:{tabsLabel:["All Shared","My Prompts"],topicLabel:"Topic",activityLabel:"Activity",sortLabel:"Sort by",feedLabel:"Feed type",search:"Search",newPromptLabel:"Add new prompt template",likeTitle:["Vote ","Vote for this prompt with thumbs up"],dislikeTitle:"Vote for this prompt with thumbs down",forkTitle:["Copy to My Prompts","Prompt already copied!"],labelsOverTextareaElems:["Output in","Tone","Writing Style"],titleOnTopIcons:["Setting","Add New Prompt Templates","Import Prompt Template","Expanded View","Collapsed View","View Favorites"],cardIconsTitle:["Add prompt to favorites","Remove prompt from favorites","Save it as My Prompts","Prompt already copied!","Pin this prompt","UnPin this prompt","Download prompt template"],plusOnTextarea:"Add to My Prompts",reportTitle:"Report this prompt",useTitle:"Usages",topicTitle:"Topic: ",activityTitle:"Activity: ",authorTitle:"Created by ",timeTitle:"Last updated on ",shareTitle:"Copy link to this prompt ",editPrmptTitle:"Edit this prompt",dltPrmptTitle:"Delete this prompt",publicTitle:"Public",ownTitle:"Private",textareaPlaceholderIdentifier:"Enter: ",inputform:{saveAsNew:"Save as New Template",title:{label:"Title",placeholder:"Keyword Stretegy"},teaser:{label:"Teaser",placeholder:"Create a keyword strategy and SEO cotent plan from 1 [KEYWORD]"},promptHint:{label:"Prompt Hint",placeholder:"[KEYWORD] or [Your list of keywords]"},promptTemplate:{label:"Prompt Template",placeholer:"Prompt text including placeholders"},addPromptBtn:"Add New Prompt",topic:"Topic",activity:"Tags",share:"Add to shared prompts",author:{label:"Author Name",placeholder:"Author Name"},authorUrl:{label:"Author URL",placeholder:"https://www.example.com"},agreeText:"Please be mindful of what you share, and do not include any confidential information, as we are not responsible for any actions taken by others with the information you choose to share.",save:"Save Prompt",cancel:"Cancel"}},danish:{tabsLabel:["Offentlige forslag","Egne forslag"],topicLabel:"Emne",activityLabel:"Aktivitet",sortLabel:"Sortér efter",feedLabel:"Feed type",search:"Søg",newPromptLabel:"Tilføj nyt prompt-mal",likeTitle:["Stem ","Stem på dette prompt med en tommelfinger op"],dislikeTitle:"Stem på dette prompt med en tommelfinger nedad",forkTitle:["Kopier til mine meddelelser","Prompt er allerede kopieret!"],labelsOverTextareaElems:["Output ind","Tone","Skrivestil"],titleOnTopIcons:["Indstilling","Tilføj nye promptskabeloner","Importer promptskabelon","Udvidet visning","Skjult visning","Se favoritter"],cardIconsTitle:["Tilføj prompt til favoritter","Fjern prompt fra favoritter","Gem det som Mine prompter","Prompt er allerede kopieret!","Fastgør denne prompt","Fjern fastgør denne prompt","Download prompt skabelon"],plusOnTextarea:"Føj til mine meddelelser",reportTitle:"Rapporter dette prompt",useTitle:"Anvendelser",topicTitle:"Emne: ",activityTitle:"Aktivitet: ",authorTitle:"Oprettet af ",timeTitle:"Sidst opdateret den ",shareTitle:"Kopier link til dette prompt ",editPrmptTitle:"Rediger dette prompt",dltPrmptTitle:"Slet dette prompt",publicTitle:"Offentligt",ownTitle:"Privat",textareaPlaceholderIdentifier:"Indtast: ",inputform:{saveAsNew:"Gem som ny skabelon",title:{label:"Titel",placeholder:"Keyword Strategi"},teaser:{label:"Teaser",placeholder:"Opret en nøgleord strategi og SEO indholdsplan fra 1 [NØGLEORD]"},promptHint:{label:"Prompt Tip",placeholder:"[NØGLEORD] eller [Din liste over nøgleord]"},promptTemplate:{label:"Prompt-mal",placeholer:"Prompt tekst inklusive pladsholdere"},addPromptBtn:"Tilføj nyt Prompt",topic:"Emne",activity:"Aktivitet",share:"Del prompt-mal offentligt",author:{label:"Forfatternavn",placeholder:"Forfatternavn"},authorUrl:{label:"Forfatter-URL",placeholder:"https://www.example.com"},agreeText:"Vær venlig at være opmærksom på hvad du deler, og inkluder ikke fortrolige oplysninger, da vi ikke er ansvarlige for eventuelle handlinger foretaget af andre med de oplysninger, du vælger at dele.",save:"Gem Prompt",cancel:"Annuller"}}};const yr="all",fr="English*";const wr="lastTargetLanguage",br="IN_BOUND_PromptID";let x=vr.english;const xr=[4,8,12,16,20,24],Cr="editPromptTemplate";window.IN_BOUND={fetch:window._fetch=window._fetch||window.fetch,CacheBuster:btoa((new Date).toISOString().slice(0,16).toString()),Client:ae,feedSelect:["All","Favourites"],feedSelected:window.localStorage.feedSelected||"All",ExtLang:"english",demoInterface:!1,access:{cardMenuInDots:!0},feedView:window.localStorage.feedView||"grid",feedViewList:["grid","list"],TargetLanguage:null===localStorage.getItem(wr)?fr:localStorage.getItem(wr),WebAccess:null!==localStorage.getItem("WebAccess")&&localStorage.getItem("WebAccess"),Tone:null,WritingStyle:null,PromptTopic:localStorage.getItem("lastPromptTopic")||yr,PromptActivity:"all",PromptSortMode:1,PromptSearch:"",PromptTemplatesType:localStorage.getItem("PromptTemplatesType")||h.PUBLIC,PromptTemplates:[],FavouritePromptTemplates:[],PinPromptTemplates:[],forkPromptTemplates:[],activePromptID:"",themeMode:"",ToneCategories:[],DefaultTones:[],userTones:[],tonesOrderLocal:[],promptsOrderLocal:[],ToneCategorySelected:"",InputToneCategorySelected:"",promptVariables:[],settingsActiveTab:"settings",editActivatedTonesInSetting:"",activatedToneSelected:{title:"",tone:""},searchPredictionList:[],webResults:[],current_active_prompts:[],Company:"",companyMeta:{},longInputText:"",features:{variations:{allow:!0},languages:{allow:!0},writing_styles:{allow:!0},favourites:{allow:!0},pin:{allow:!0},import_export:{allow:!0},copy:{allow:!0},delete:{allow:!0},edit:{allow:!0},public_prompts:{allow:!0},private_prompts:{allow:!0},search:{allow:!0},setting:{allow:!0},expanded_view:{allow:!0},collapsed_view:{allow:!0},variables:{allow:!0},reload:{allow:!0},add_prompt:{allow:!0}},team:{},allTeams:[],selectedTeam:localStorage.getItem("team_id"),usedPrompts:[],allCompanies:[],selectedCompany:localStorage.getItem("company_id"),savedSearchList:JSON.parse(localStorage.getItem("savedSearchList"))||[],chunkProcessingState:!1,SelectedPromptTemplateID:"",hiddenVariations:JSON.parse(localStorage.getItem("hiddenVariations"))||[],APIEndpoint:m,companyTones:[],isLoading:!1,import:!1,companyTonesState:!1,companyToneText:"",DefaultPromptTemplates:[],OwnPrompts:[],Languages:[],Tone:"",Theme:"",WritingStyles:[],ContinueActions:[],Topics:[],Activities:[],AdminMode:!1,PromptTemplateSection:{currentPage:0,pageSize:5e3},SelectedPromptTemplate:null,async init(){this.setupSidebar(),this.folderManager.initializeFolders(),this.isLoading=!0,this.showLoadingInterface(""),this.tonesOrderLocal=JSON.parse(localStorage.getItem("tonesOrderLocal"))?.index||{index:[]},this.boundHandleArrowKey=this.handleArrowKey.bind(this),await this.Client.init(),this.replaceFetch(),this.createObserver(),await Promise.all([this.fetchUserData()]),this.fetchPromptFromDeepLink(),this.sendBtnObserver(),this.createThemeObserver(),this.getTheme(),this.isLoading=!1,this.hideLoadingInterface(),this.insertPromptTemplatesSection(),this.observeForTextareaElemChanges(),this.sendBtnObserverForChunks(),this.insertConversationMenu(),document.addEventListener("IN_BOUND.getRequest",async e=>{this.handleGetRequestEvent(e)}),window.addEventListener("popstate",()=>{this.fetchPromptFromDeepLink()});let e=localStorage.getItem("split-sizes");e=e?JSON.parse(e):[65,35],dr(["#__next","#nav"],{sizes:e,gutterSize:2,onDragEnd:function(e){localStorage.setItem("split-sizes",JSON.stringify(e))}});var t=document.querySelector("#__next").getElementsByClassName("overflow-hidden w-full h-full relative flex z-0")[0].children;t[0].id="sidebar-resize",t[1].id="chat-resize",this.hidePromptCardOptionsOnClickOutside()},hidePromptCardOptionsOnClickOutside(){document.addEventListener("click",function(t){var e=document.getElementsByClassName("PromptCardOptions"),r=document.querySelectorAll("#PromptCardOptionsBtn"),r=Array.from(r)?.some(function(e){return e.contains(t.target)});Array.from(e)?.some(function(e){return e.contains(t.target)})||r||Array.from(e)?.forEach(function(e){setTimeout(()=>{-1<e.className.indexOf("hidden")||(e.className=e.className.replace("flex ","hidden "))},10)})})},injectStyleSheet(){var e=document.createElement("link");e.rel="stylesheet",e.href=m+"/css/chatgpt_style",document.head.appendChild(e)},changeLoadingText(e){document.querySelector(".loading-text")&&(document.querySelector(".loading-text").innerHTML=e)},async reloadAllData(){this.showLoadingInterface(),await this.fetchUserData(),this.hideLoadingInterface(),this.insertPromptTemplatesSection(),this.insertLanguageToneWritingStyleContinueActions()},async fetchUserData(){this.changeLoadingText("Loading..."),setTimeout(()=>{this.changeLoadingText("Fetching User Data...")},1500),setTimeout(()=>{this.changeLoadingText("Fetching Company Data...")},3e3),setTimeout(()=>{this.changeLoadingText("Fetching Prompts...")},4500),setTimeout(()=>{this.changeLoadingText("Fetching Variations...")},6e3);var e=this.selectedCompany;let t={};try{t=e?await fetch(m+`/user-data-multi?user=${this.Client.User.Email}&company=`+e).then(e=>(500===e.status&&(window.localStorage.removeItem("company_id"),window.location.reload()),e.json())):await fetch(m+"/user-data?user="+this.Client.User.Email).then(e=>(500===e.status&&(window.localStorage.removeItem("company_id"),window.location.reload()),e.json()))}catch(e){return this.changeLoadingText("Reloading..."),void IN_BOUND.fetchUserData()}var r,a,o,i,n,{user:e,company:l,ownPrompts:s,publicPrompts:d,userVariations:c,companyVariations:p,userMulti:h,teams:g}=t;null===e?(localStorage.setItem("company_id",""),this.selectedCompany=null,this.fetchUserData()):(this.Company=e.company_email,this.allCompanies=h,this.allTeams=[{tag:"No Team",id:"",company_id:e.company_email},...g],{...e,company:e.company_email},this.companyToneText=l.company_tone,{dark_logo:h,description:g,email:e,id:r,light_logo:a,name:o,website:i,features:n}=l,this.companyMeta={dark_logo:h,description:g,email:e,id:r,light_logo:a,name:o,website:i},this.WritingStyles=l.writing_styles?.sort((e,t)=>e.label.localeCompare(t.label)).map((e,t)=>{var{id:e,label:r,prompt:a}=e;return{ID:e,Label:r,Prompt:a}})||[],this.ContinueActions=l.continue_actions?.sort((e,t)=>e.label.localeCompare(t.label)).map((e,t)=>{var{id:e,label:r,prompt:a}=e;return{ID:e,Label:r,Prompt:a}})||[],this.Languages=l.languages?.sort((e,t)=>e.language.localeCompare(t.language)).map((e,t)=>{var{langcode:e,language:r,id:a}=e;return{langcode:e,languageEnglish:r,languageLabel:r,id:a}})||[],this.features=n||this.features,this.PromptTemplates=d?.map((e,t)=>({...e,OwnPrompt:!1,favourite:!1,pin:!1})).sort((e,t)=>new Date(t.RevisionTime)-new Date(e.RevisionTime))||[],this.DefaultPromptTemplates=this.PromptTemplates,this.OwnPrompts=s?.map((e,t)=>({...e,OwnPrompt:!0})).sort((e,t)=>new Date(t.RevisionTime)-new Date(e.RevisionTime))||[],this.userTones=c?.map((e,t)=>({ID:e.id,Label:e.label,Description:e.prompt,type:"user"}))||[],this.companyTones=p?.map((e,t)=>({ID:e.id,Label:e.label,Description:e.prompt,type:"org"}))||[],"iqbalnawaz123750@gmail.com"===t.user.email&&(window.IN_BOUND.demoInterface=!0,this.OwnPrompts=[],this.userTones=[],this.companyTones=[],window.localStorage.setItem("PromptTemplatesType","public"),this.features.copy.allow=!1,this.features.add_prompt.allow=!1,this.features.favourites.allow=!1,this.features.reload.allow=!1,this.features.private_prompts.allow=!1,this.features.setting.allow=!1,this.features.import_export.allow=!1),this.insertPromptTemplatesSection())},async fetchUser(){this.changeLoadingText("Fetching User...");var e=this.Client.User.Email,e=await(await fetch(m+"/user?user="+e)).json();this.Company=e.company_email,{...e,company:e.company_email}},async fetchCompany(e,t){this.changeLoadingText("Fetching Organization...");var r=this.Client.User.Email,r=await(await fetch(m+`/company?user=${r}&company=${e}&teamID=`+t)).json(),{dark_logo:e,description:t,email:a,id:o,light_logo:i,name:n,website:l,features:s}=(this.companyToneText=r.company_tone,r);this.companyMeta={dark_logo:e,description:t,email:a,id:o,light_logo:i,name:n,website:l},this.WritingStyles=r.writing_styles.sort((e,t)=>e.label.localeCompare(t.label)).map((e,t)=>{var{id:e,label:r,prompt:a}=e;return{ID:e,Label:r,Prompt:a}}),this.ContinueActions=r.continue_actions.sort((e,t)=>e.label.localeCompare(t.label)).map((e,t)=>{var{id:e,label:r,prompt:a}=e;return{ID:e,Label:r,Prompt:a}}),this.Languages=r.languages.sort((e,t)=>e.language.localeCompare(t.language)).map((e,t)=>{var{langcode:e,language:r,id:a}=e;return{langcode:e,languageEnglish:r,languageLabel:r,id:a}}),this.features=s},async fetchPublicPrompts(e,t){this.changeLoadingText("Fetching Public Prompts...");var r=this.Client.User.Email,r=await(await fetch(m+`/prompts?user=${r}&company=${e}&type=2&teamID=`+t)).json();this.PromptTemplates=r.documents.map((e,t)=>({...e,OwnPrompt:!1,favourite:!1,pin:!1})).sort((e,t)=>new Date(t.RevisionTime)-new Date(e.RevisionTime)),this.DefaultPromptTemplates=this.PromptTemplates},async fetchPrivatePrompts(e,t){this.changeLoadingText("Fetching User Prompts...");var r=this.Client.User.Email,r=await(await fetch(m+`/prompts?user=${r}&company=${e}&type=1&teamID=`+t)).json();this.OwnPrompts=r.documents.map((e,t)=>({...e,OwnPrompt:!0})).sort((e,t)=>new Date(t.RevisionTime)-new Date(e.RevisionTime))},async fetchUserVariations(e,t){this.changeLoadingText("Fetching User Variations...");var r=this.Client.User.Email,r=await(await fetch(m+`/variations?user=${r}&company=${e}&type=user&teamID=`+t)).json();this.userTones=r.documents.map((e,t)=>({ID:e.id,Label:e.label,Description:e.prompt,type:"user"}))},async fetchCompanyVariations(e,t){this.changeLoadingText("Fetching Org Variations...");var r=this.Client.User.Email,r=await(await fetch(m+`/variations?user=${r}&company=${e}&type=org&teamID=`+t)).json();this.companyTones=r.documents.map((e,t)=>({ID:e.id,Label:e.label,Description:e.prompt,type:"org"}))},async fetchUserPrompt(e){var t=this.Client.User.Email,t=await(await fetch(m+`/prompt?user=${t}&company=${this.Company}&promptID=`+e)).json();return{...null!==t?t:{},OwnPrompt:!0}},pinActionForPrompt(e,t){return fetch(`${this.APIEndpoint}/prompts?user=${this.Client.User.Email}&company=${this.Company}&id=`+e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pin:1===t})}).then(e=>{if(e.ok)return e;throw new Error("Network response was not OK")})},getTheme(){this.Theme=document.documentElement.style.colorScheme},handleGetRequestEvent(e){document.createElement("div").innerHTML=e.detail.data,e.detail;var t=e.detail.data;"getBingResults"===e.detail.returnType?this.processBingResults(t):"getDdgResults"===e.detail.returnType?this.processDDGResults(t):"getGoogleNewsResults"===e.detail.returnType?this.processGoogleNewsResults(t):"getWebContentResults"===e.detail.returnType&&this.processWebContentResults(t)},processBingResults(e){var t=document.createElement("div");t.innerHTML=e,Array.from(t?.querySelector("#b_results")?.children)?.forEach(e=>{var t=e?.querySelector("p")?.innerText.slice(3,-3),e=e?.querySelector("a")?.href;t&&this.webResults.push({text:t,url:e})});let r=this.SelectedPromptTemplate.Prompt;e=this.webResults.map((e,t)=>`[${t+1}] ${e.text} (URL: ${e.url})`).slice(0,4).join("\n"),t=r.split("{{BingSearch");r=t[0]+e+t[1].split("}}")[1],this.SelectedPromptTemplate={...this.SelectedPromptTemplate,Prompt:r},this.showNotification(s.SUCCESS,"Results added!")},processDDGResults(e){var t=document.createElement("div"),e=(t.innerHTML=e,(IN_BOUND.searchDiv=t)?.querySelector(".results")?.children||t?.querySelector(".serp__results")?.querySelectorAll("result"));Array.from(e)?.forEach(e=>{var t=e?.querySelector(".result__snippet")?.innerText,e=e?.querySelector(".result__snippet")?.href;t&&20<t.length&&this.webResults.push({text:t,url:e})});let r=this.SelectedPromptTemplate.Prompt;t=this.webResults.map((e,t)=>`[${t+1}] ${e.text} (Link:${e.url})`).slice(0,5+Math.floor(5*Math.random())).join("\n"),e=r.split("{{WebSearch");return r=e[0]+t+e[1].split("}}")[1],this.SelectedPromptTemplate={...this.SelectedPromptTemplate,Prompt:r},this.showNotification(s.SUCCESS,"Results added!"),r},processGoogleNewsResults(e){var t=document.createElement("div"),e=(t.innerHTML=e,t?.querySelector("#search")?.querySelectorAll("a")||t?.querySelector("#main")?.querySelectorAll("a"));Array.from(e)?.forEach(e=>{var t=e?.innerText,e=e?.href;t&&20<t.length&&this.webResults.push({text:t,url:e})});let r=this.SelectedPromptTemplate.Prompt;t=this.webResults.map((e,t)=>`[${t+1}] ${e.text} (Link:${e.url})`).slice(0,5+Math.floor(5*Math.random())).join("\n"),e=r.split("{{WebNews");return r=e[0]+t+e[1].split("}}")[1],this.SelectedPromptTemplate={...this.SelectedPromptTemplate,Prompt:r},this.showNotification(s.SUCCESS,"Results added!"),r},processWebContentResults(e){var t=document.createElement("div");t.innerHTML=e,IN_BOUND.contentDiv=t,IN_BOUND.rawDiv=e;let r=this.SelectedPromptTemplate.Prompt;t=this.getTextFromHTML(e),this.longInputText=this.sanitizeTextContent(t),e=this.longInputText,t=r.split("{{WebContent");r=t[0]+e+t[1].split("}}")[1],this.SelectedPromptTemplate={...this.SelectedPromptTemplate,Prompt:r},this.showNotification(s.SUCCESS,"Results added!")},processWebContentResultsFromAPI(e){let t=this.SelectedPromptTemplate.Prompt;var e={...e,rules:["Use the language that the user previously used or the language requested by the user.","Respond to the user's request, which may include asking questions or requesting specific actions (such as translation, rewriting, etc.), based on the provided content.","If the user does not make a request, perform the following tasks: 1. Display the title in the user's language; 2. Summarize the article content into a brief and easily understandable paragraph; 3. Depending on the content, present three thought-provoking questions or insights with appropriate subheadings. For articles, follow this approach; for code, formulas, or content not suited for questioning, this step may be skipped."]},e=JSON.stringify(e),r=t.split("{{WebContent");t=r[0]+e+r[1].split("}}")[1],this.SelectedPromptTemplate={...this.SelectedPromptTemplate,Prompt:t},this.showNotification(s.SUCCESS,"Results added!")},getTextFromHTML(e){for(var t=document.createElement("div"),r=(t.innerHTML=e,t.getElementsByTagName("script")),a=t.getElementsByTagName("style"),o=0;o<r.length;o++)r[o].parentNode.removeChild(r[o]);for(var i=0;i<a.length;i++)a[i].parentNode.removeChild(a[i]);return(t.textContent||t.innerText).trim().replace(/\n\s*\n/g,"\n")},async refreshData(){await this.fetchPrivatePrompts(this.Company,this.selectedTeam),await this.fetchPublicPrompts(this.Company,this.selectedTeam),await this.fetchUserVariations(this.Company,this.selectedTeam),this.insertPromptTemplatesSection()},async refreshActions(){return await this.fetchUserVariations(this.Company,this.selectedTeam),this.insertLanguageToneWritingStyleContinueActions(),this.showSettingModal(),!0},async fetchPromptFromDeepLink(){var t=new URLSearchParams(window.location.search).get(br);if(t){let e;try{(e=await this.fetchUserPrompt(t)).ID&&this.selectPromptTemplate(e)}catch(e){return void this.showNotification(s.ERROR,"Something went wrong. Please try again.")}e}else this.selectPromptTemplateByIndex(null)},async fetchMessages(){ur(await this.Client.getMessages(this.PromptTopic===yr?"":this.PromptTopic),this.confirmMessage.bind(this),this.voteForMessage.bind(this))},async confirmMessage(e){try{await this.Client.confirmMessage(e)}catch(e){return this.showNotification(s.ERROR,"Something went wrong. Please try again."),!1}return this.showNotification(s.SUCCESS,"Thanks for the confirmation!"),!0},async voteForMessage(e,t){try{await this.Client.voteForMessage(e,t)}catch(e){return this.showNotification(s.ERROR,"Something went wrong. Please try again."),!1}return!0},setupSidebar(){var e;this.addExportButton(),this.getNewChatButtons().forEach(e=>{e.onclick=()=>{this.selectPromptTemplateByIndex(null),this.hideContinueActionsButton()}}),document.getElementById("nav")||(document.body.classList.toggle("show-nav"),document.body.classList.toggle("split"),(e=document.createElement("div")).id="nav",document.body.appendChild(e))},createObserver(){new MutationObserver(e=>{e.forEach(e=>{"childList"!==e.type&&0==e.addedNodes.length||(e=e.addedNodes[0])&&e.querySelector&&this.handleElementAdded(e)})}).observe(document.body,{subtree:!0,childList:!0})},createThemeObserver(){var e=document.documentElement;new MutationObserver((e,t)=>{for(const a of e){var r;"childList"!==a.type&&"attributes"===a.type&&(r=document.documentElement.style.colorScheme,IN_BOUND.Theme!==r)&&(IN_BOUND.Theme=r,IN_BOUND.insertPromptTemplatesSection())}}).observe(e,{attributes:!0,childList:!0,subtree:!0})},sendBtnObserver(){var e=document.querySelector("textarea").nextElementSibling;new MutationObserver((e,t)=>{for(const r of e)"childList"!==r.type&&"attributes"===r.type&&IN_BOUND.hideLanguageToneWritingStyleContinueActions()}).observe(e,{attributes:!0,childList:!0,subtree:!0})},insertConversationMenu(){var e=document.getElementsByClassName("text-gray-400 flex self-end lg:self-center justify-center mt-2 gap-2 md:gap-3 lg:gap-1 lg:absolute lg:top-0 lg:translate-x-full lg:right-0 lg:mt-0 lg:pl-2 visible");Array.from(e)?.forEach((e,t)=>{if(t%2!=0&&!e.querySelector("#chat-menu")){t=document.createElement("button");t.className="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400",t.innerHTML=v("menu-vertical"),t.id="chat-menu",e.append(t);const a=document.createElement("div");a.className="hidden absolute right-1 rounded shadow-lg px-1 py-1 flex-col bg-white dark:bg-gray-800  dark:border-bg-ray-700 gap-2 justify-center  mt-1 text-gray-600 group-hover:visible",a.style="top:40px; z-index:99999; box-shadow:0 2px 5px 6px rgba(0, 0, 0, 0.1); width: 12em;",a.innerHTML=`
            <a title="Copy Markdown" id="copy_markdown" class=" relative flex flex-row text-sm gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" >
                ${v("copy")}
                Copy Markdown</a>

            <a title="Copy HTML" id="copy_html" class=" relative flex flex-row text-sm gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" >
            ${v("html-doc")}
            Copy HTML</a>

            <a title="Share Link" id="share_link" class=" relative flex flex-row text-sm gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" >
                ${v("Link")}
                Share Link</a>`,a.id="chat-menu-options",t.appendChild(a),t.addEventListener("click",()=>{a.className.split(" ").includes("hidden")?a.className=a.className.replace("hidden ","flex "):a.className=a.className.replace("flex ","hidden ")}),a.querySelector("#copy_markdown")?.addEventListener("click",()=>{let t="";var e=document.getElementsByClassName("group w-full text-token-text-primary border-b border-black/10");Array.from(e)?.forEach(e=>{t+=e.querySelector(".markdown")?e.querySelector(".markdown").innerHTML:`<h2>${e.innerHTML}</h2>`}),t=IN_BOUND.htmlToMarkdown(t),console.log(t),navigator.clipboard.writeText(t).then(()=>{a.className=a.className.replace("flex ","hidden "),IN_BOUND.showNotification(s.SUCCESS,"Markdown copied to clipboard!")}).catch(()=>{IN_BOUND.showNotification(s.ERROR,"Failed to copy Markdown to clipboard!")})}),a.querySelector("#copy_html")?.addEventListener("click",()=>{let t="";var e=document.getElementsByClassName("group w-full text-token-text-primary border-b border-black/10");Array.from(e)?.forEach(e=>{t+=e.querySelector(".markdown")?e.querySelector(".markdown").innerHTML:`<h2>${e.innerHTML}</h2>`}),navigator.clipboard.writeText(t).then(()=>{a.className=a.className.replace("flex ","hidden "),IN_BOUND.showNotification(s.SUCCESS,"HTML copied to clipboard!")}).catch(()=>{IN_BOUND.showNotification(s.ERROR,"Failed to copy HTML to clipboard!")})}),a.querySelector("#share_link")?.addEventListener("click",()=>{var e=document.getElementsByClassName("flex flex-col text-sm dark:bg-gray-800")[0],t=document.createElement("div"),e=(t.innerHTML=e.innerHTML,t.className="flex flex-col text-sm dark:bg-gray-800",t.querySelector("#chat-menu")?.remove(),t.querySelector("#chat-menu-options")?.remove(),t.getElementsByClassName("text-gray-400 flex self-end lg:self-center justify-center mt-2 gap-2 md:gap-3 lg:gap-1 lg:absolute lg:top-0 lg:translate-x-full lg:right-0 lg:mt-0 lg:pl-2 visible")),e=(Array.from(e)?.forEach(e=>{e.className.replace(" visible"," hidden"),e.remove()}),t.getElementsByClassName("group w-full text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 dark:bg-gray-800")),e=(Array.from(e)?.forEach(e=>{e.className=e.className+" bg-white dark:bg-gray-800"}),t.innerHTML.replaceAll("/_next/image?url=https%3A%2F%2F","https://chat.openai.com/_next/image?url=https%3A%2F%2F"));IN_BOUND.showNotification(s.SUCCESS,"Generating link..");const r=crypto.randomUUID();t=m+`/chatgpt-conversations?id=${r}&user=${this.Client.User.Email}&company=${this.Company}&promptID=`+this.SelectedPromptTemplateID;fetch(t,{method:"POST",headers:{"Content-Type":"text/plain"},body:e}).then(e=>{if(e.ok){const t="https://api.workengine.ai/chatgpt-conversations?chatid="+r;navigator.clipboard.writeText(t).then(()=>{a.className=a.className.replace("flex ","hidden "),IN_BOUND.showNotification(s.SUCCESS,"Url copied to clipboard!"),window.open(t,"_blank")}).catch(()=>{IN_BOUND.showNotification(s.ERROR,"Failed to copy Url to clipboard!")})}else IN_BOUND.showNotification(s.ERROR,"Failed to share chat!")})})}}),setTimeout(()=>{IN_BOUND.insertConversationMenu(),IN_BOUND.getParsedJSONFromCodeBlock()},5e3)},htmlToMarkdown(e){return e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=e.replace(/<h1(?:[\s\S]*?)>([\s\S]*?)<\/h1>/gi,"# $1\n\n")).replace(/<h2(?:[\s\S]*?)>([\s\S]*?)<\/h2>/gi,"## $1\n\n")).replace(/<h3(?:[\s\S]*?)>([\s\S]*?)<\/h3>/gi,"### $1\n\n")).replace(/<h4(?:[\s\S]*?)>([\s\S]*?)<\/h4>/gi,"#### $1\n\n")).replace(/<h5(?:[\s\S]*?)>([\s\S]*?)<\/h5>/gi,"##### $1\n\n")).replace(/<h6(?:[\s\S]*?)>([\s\S]*?)<\/h6>/gi,"###### $1\n\n")).replace(/<p(?:[\s\S]*?)>([\s\S]*?)<\/p>/gi,"$1\n\n")).replace(/<a(?:[\s\S]*?)href="(.*?)"(?:[\s\S]*?)>([\s\S]*?)<\/a>/gi,"[$2]($1)")).replace(/<strong(?:[\s\S]*?)>([\s\S]*?)<\/strong>/gi,"**$1**")).replace(/<em(?:[\s\S]*?)>([\s\S]*?)<\/em>/gi,"*$1*")).replace(/<ul(?:[\s\S]*?)>([\s\S]*?)<\/ul>/gi,"$1\n")).replace(/<ol(?:[\s\S]*?)>([\s\S]*?)<\/ol>/gi,"$1\n")).replace(/<li(?:[\s\S]*?)>([\s\S]*?)<\/li>/gi,"- $1\n")).replace(/<blockquote(?:[\s\S]*?)>([\s\S]*?)<\/blockquote>/gi,"> $1\n")).replace(/<code(?:[\s\S]*?)>([\s\S]*?)<\/code>/gi,"`$1`")).replace(/<pre(?:[\s\S]*?)>([\s\S]*?)<\/pre>/gi,"```\n$1\n```")).replace(/<code(?:[\s\S]*?)>/gi,"```")).replace(/<\/code>/gi,"```")).replace(/<table(?:[\s\S]*?)>([\s\S]*?)<\/table>/gi,"\n$1\n")).replace(/<th(?:[\s\S]*?)>([\s\S]*?)<\/th>/gi,"| $1 ")).replace(/<\/th>/gi,"|")).replace(/<tr(?:[\s\S]*?)>/gi,"|")).replace(/<\/tr>/gi,"|\n")).replace(/<td(?:[\s\S]*?)>([\s\S]*?)<\/td>/gi,"| $1 ")).replace(/<\/td>/gi,"|")).replace(/<\/?[a-z]+(?:[\s\S]*?)>/gi,"")},getParsedJSONFromCodeBlock(){var e=document.querySelectorAll(".markdown.prose.w-full.break-words.dark\\:prose-invert");return Array.from(e).forEach(e=>{e.querySelectorAll("#save-json").length!==e.querySelectorAll(".language-json").length&&e.querySelectorAll(".language-json").forEach(e=>{if(e?.className.includes("language-json")){var t=e.textContent.trim();try{var r=JSON.parse(t);r.Prompt&&r.Title?this.insertButtonCodeBlock(e,r):console.error("Error: JSON object must contain Prompt and Title keys.")}catch(e){console.error("Error: JSON object must contain Prompt and Title keys.")}}})}),null},insertButtonCodeBlock(e,t){var r,e=e.parentElement.previousElementSibling;e&&!e.querySelector("#save-json")&&((r=document.createElement("button")).classList.add("flex","ml-auto","gap-2"),r.innerHTML=v("save")+"Save as Template",r.id="save-json",r.addEventListener("click",function(){t&&IN_BOUND.saveImportedPrompt(t)}),e.appendChild(r))},sendBtnObserverForChunks(){var e=document.querySelector("textarea").nextElementSibling;let i=!1;var t=new MutationObserver(async(e,t)=>{for(const o of e){var r,a;"childList"===o.type&&(""===(r=document.querySelector("textarea").nextElementSibling).children[0].className&&0<IN_BOUND.longInputText.length?!1===i&&(i=!0,0<IN_BOUND.longInputText.length)&&(a=document.querySelector("textarea[tabindex='0']"),IN_BOUND.longInputText.slice(0,9e3).length,a.value=IN_BOUND.longInputText.slice(0,9e3),a.dispatchEvent(new Event("input",{bubbles:!0})),r.disabled&&(r.disabled=!1),await new Promise(e=>setTimeout(e,1e3)),r.click()):i=!1)}});t.observe(e,{attributes:!0,childList:!0,subtree:!0}),IN_BOUND.sendBtnObserverObject=t},copyResponse(e){e=e.srcElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.innerText;navigator.clipboard.writeText(e).then(this.showNotification(s.SUCCESS,"The response was copied to your clipboard."))},replaceFetch(){window.fetch=(...t)=>{if("https://chat.openai.com/backend-api/conversation"!==t[0])return this.fetch(...t);if(!(this.SelectedPromptTemplate||this.Tone||this.WritingStyle||this.TargetLanguage))return this.fetch(...t);var e=this.SelectedPromptTemplate;try{var r=t[1],a=JSON.parse(r.body);if(e){var o=a.messages[0].content.parts[0];if(this.SelectedPromptTemplateID=e.ID,!o)return;var i=(this.TargetLanguage||fr).replace("*","");-1===e.Prompt.indexOf(C)&&(e.Prompt=e.Prompt+`
`+o),a.messages[0].content.parts[0]=e.Prompt.replaceAll(C,o).replaceAll(k,i)}var n=this.userTones.filter(e=>this.Tone===e.ID)[0],l=(n?.Description&&(a.messages[0].content.parts[0]+=`

Please write in ${n.Description}.`),this.TargetLanguage&&(a.messages[0].content.parts[0]+=`
Please write in ${this.TargetLanguage} language.
`),this.WritingStyle&&(a.messages[0].content.parts[0]+=`
Please write in ${this.WritingStyles.find(e=>e.ID===this.WritingStyle)?.prompt} writing style.`),a.messages[0].content.parts[0]),s=l.slice(0,9e3);return 0<l.slice(9e3)?.length?(IN_BOUND.longInputText=l.slice(9e3),IN_BOUND.SelectedPromptTemplate={...IN_BOUND.SelectedPromptTemplate,Prompt:IN_BOUND.longInputText},IN_BOUND.sendBtnObserverForChunks()):(IN_BOUND.longInputText=l.slice(9e3),IN_BOUND.SelectedPromptTemplate={...IN_BOUND.SelectedPromptTemplate,Prompt:IN_BOUND.longInputText},IN_BOUND.selectPromptTemplateByIndex(null)),a.messages[0].content.parts[0]=s,r.body=JSON.stringify(a),this.fetch(t[0],r)}catch(e){return this.fetch(...t)}}},observeForTextareaElemChanges(){document.querySelector("#prompt-textarea"),new MutationObserver(e=>{e.forEach(e=>{e.addedNodes&&0<e.addedNodes.length&&e.addedNodes.forEach(e=>{}),e.removedNodes&&0<e.removedNodes.length&&e.removedNodes.forEach(e=>{})})}).observe(document,{subtree:!0,childList:!0})},handleElementAdded(e){"headlessui-portal-root"===e.id||"language-select-wrapper"===e.id?this.setupSidebar():(e.querySelector("h1.text-4xl")&&(this.insertPromptTemplatesSection(),(e=document.getElementById("export-button"))&&(e.style="pointer-events: none;opacity: 0.5"),this.insertLanguageToneWritingStyleContinueActions()),document.querySelector(".xl\\:max-w-3xl")&&((e=document.getElementById("export-button"))&&(e.style=""),this.insertLanguageToneWritingStyleContinueActions()),document.querySelector(".whitespace-pre-wrap")&&this.insertSavePromptAsTemplateButton())},insertSavePromptAsTemplateButton(){var e,t=document.querySelector(".flex.flex-col.items-center .whitespace-pre-wrap:not(:has(*))");!t||!(t=t.parentElement.parentElement.querySelector("button"))||(this.showContinueActionsButton(),e=t.parentElement.querySelector(".save-prompt-button"))||((e=document.createElement("button")).className="save-prompt-button p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400 md:invisible md:group-hover:visible",e.title="Save prompt as template",e.addEventListener("click",this.showSavePromptModal.bind(this)),e.innerHTML=v("Save"),t.parentElement.prepend(e))},getActivities(t=yr){var e=this.Activities.filter(e=>!t||t===yr||e.TopicID===t);return[...new Set(e.map(e=>e.Label))].map(t=>({ID:this.Activities.find(e=>e.Label===t).ID,Label:t}))},validatePrompt(t){var e=[],r=[...this.PromptTemplates,...this.OwnPrompts].find(e=>e.ID===t.ID),a=r&&r.PromptTypeNo!==t.PromptTypeNo;if(this.canCreatePromptTemplate()||r)if(t.PromptTypeNo!==T.PUBLIC||this.canCreatePublicPromptTemplate()||r&&!a){if(t.PromptTypeNo!==T.PRIVATE||this.canCreatePrivatePromptTemplate()||r&&!a)return t.PromptTypeNo!==T.PUBLIC||t.AuthorName.trim()&&t.AuthorURL.trim()||e.push("Please identify with Author Name and URL to publish a prompt template as public."),r=[],t.PromptTypeNo!==T.PUBLIC||t.Prompt.includes(k)||r.push(k),t.Prompt.includes(C)||r.push(C),0<r.length&&e.push(`
          Make sure you follow the Prompt Template guidelines. <br>
          You must use ${r.join(" and ")} correctly. <br><br>
          Learn more <a class="underline" href="https://lrt.li/IN_BOUNDpromptguide" target="_blank" rel="noopener noreferrer">here</a>.
        `),0<e.length&&(a=`
        <div>
          <strong>Please fix the following errors:</strong> <br><br>
          ${e.join("<br><br>")}
        </div>
      `,this.showNotification(s.ERROR,a,!1)),0===e.length;this.cannotCreatePrivatePromptTemplateError()}else this.cannotCreatePublicPromptTemplateError();else this.cannotCreatePromptTemplateError()},async savePromptAsTemplate(e){var t,r,a={};for([t,r]of new FormData(e.target))a[t]=r;a.ID=a.ID||window.crypto.randomUUID()||(new Date).getTime()+Math.random().toString(16).slice(2),a.PromptTypeNo=1,a.teamID=this.selectedTeam,a.CreationTime=(new Date).toISOString(),a.PromptTypeNo=a.Public?T.PUBLIC:T.PRIVATE;try{var o=await this.Client.savePrompt(a);this.refreshData(),a.RevisionTime=(new Date).toISOString(),a.ID||this.PromptTopic!==yr&&a.Community!==this.PromptTopic||(a.ID=o.ID,this.OwnPrompts.push(a),a.Public&&this.PromptTemplates.push(a))}catch(e){return void this.showNotification(s.ERROR,e instanceof re?e.message:"Something went wrong. Please try again.")}this.hideSavePromptModal(),this.showNotification(s.SUCCESS,'Prompt template was saved successfully to "My Prompts".'),this.insertPromptTemplatesSection()},updatePromptsState(t){var e,r;t.Community!==this.PromptTopic&&this.PromptTopic!==yr?(this.PromptTemplates=this.PromptTemplates.filter(e=>e.ID!==t.ID),this.OwnPrompts=this.OwnPrompts.filter(e=>e.ID!==t.ID)):(this.OwnPrompts=this.OwnPrompts.map(e=>e.ID===t.ID?t:e),e=this.PromptTemplates.find(e=>e.ID===t.ID),!(r=t.PromptTypeNo===T.PUBLIC)&&e?this.PromptTemplates=this.PromptTemplates.filter(e=>e.ID!==t.ID):r&&!e?this.PromptTemplates.push(t):r&&e&&(this.PromptTemplates=this.PromptTemplates.map(e=>e.ID===t.ID?t:e)))},showNotification(e=s.SUCCESS,t="",r=!0){var a="IN_BOUND-Notification";let o=document.getElementById(a);o||((o=document.createElement("div")).id=a),o.innerHTML='<div style="z-index:999999999999;" class="fixed top-0 right-0 p-6 space-y-4 max-w-md">'+(e===s.SUCCESS?`
    <div class="flex items-center bg-green-500 border-l-4 border-green-700 py-2 px-3 shadow-md mb-2">
        <div class="text-green-500 rounded-full bg-white mr-3">
            <svg width="1.8em" height="1.8em" viewBox="0 0 16 16" class="bi bi-check-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.5 10.5L4 8l1.5-1.5L6.5 7l3-3L12 5l-5.5 5.5z"/>
            </svg>
        </div>
        <div class="text-white max-w-xs  text-xl ">
        ${t}
        </div>
    </div>`:e===s.WARNING?`
  <div class="flex items-center bg-yellow-500 border-l-4 border-yellow-700 py-2 px-3 shadow-md mb-2">
      <div class="text-yellow-500 rounded-full bg-white mr-3">
          <svg width="1.8em" height="1.8em" viewBox="0 0 16 16" class="bi bi-exclamation-triangle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M7.938 2.016A.13.13 0 0 1 8 2h.001a.13.13 0 0 1 .095.047l6.857 9.5a.13.13 0 0 1-.034.154l-.034.034a.13.13 0 0 1-.183 0H1.217a.13.13 0 0 1-.183 0 .13.13 0 0 1-.034-.154l6.857-9.5a.13.13 0 0 1 .08-.047ZM7.002 12a1 1 0 1 0 2 0 1 1 0 0 0-2 0Zm.82-3.466a.563.563 0 1 1-1.22 0 .562.562 0 0 1 1.22 0Z"/>
          </svg>
      </div>
      <div class="text-white max-w-xs  text-xl">
      ${t}
      </div>
  </div>`:`<div class="flex items-center bg-red-500 border-l-4 border-red-700 py-2 px-3 shadow-md mb-2">
  <div class="text-red-500 rounded-full bg-white mr-3">
      <svg width="1.8em" height="1.8em" viewBox="0 0 16 16" class="bi bi-x-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
      </svg>
  </div>
  <div class="text-white max-w-xs text-xl">
  ${t}
  </div>
</div>

  `)+"</div>",o.addEventListener("click",()=>{o.remove()}),r&&setTimeout(()=>{o.remove()},5e3),document.body.appendChild(o)},hideModal:gr,hideSavePromptModal(){this.hideModal("savePromptModal")},showReportPromptModal(e){hr(e,this.PromptTemplatesType,this.PromptTemplates,this.reportPrompt.bind(this))},async showSavePromptModal(e,t,r){let a="";var o=e&&e.type===Cr;let i={},n=!1,l=(e&&e.type!==Cr&&(e.target.closest("button"),i=this.DefaultPromptTemplates.filter(e=>e.ID===this.activePromptID)[0]||this.OwnPrompts.filter(e=>e.ID===this.activePromptID)[0])&&(a=i.Prompt,n=!0),document.getElementById("savePromptModal"));l||((l=document.createElement("div")).id="savePromptModal",l.addEventListener("submit",e=>{e.preventDefault(),"savePromptAsTemplate"===e.submitter.name?this.savePromptAsTemplate(e):this.saveAsNewPromptTemplate(e)}),document.body.appendChild(l)),l.innerHTML=`
      <div style="z-index:1000;" class="fixed inset-0 text-center transition-opacity w-full ">
        <div onclick="IN_BOUND.hideModal('savePromptModal')" class="absolute bg-gray-900 inset-0 opacity-90">
        </div>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex items-center justify-center min-h-full">
            <form id="savePromptForm">
              <input type="hidden" name="ID" ${t?`value="${t}"`:""}  />
              
              <div
              class="align-center bg-white dark:bg-gray-800 dark:text-gray-200 inline-block overflow-hidden sm:rounded-lg shadow-xl sm:align-middle  sm:my-8  text-left transform transition-all"
              role="dialog" aria-modal="true" aria-labelledby="modal-headline" style="text-align: left;">
          
                <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-y-auto">
                <label>${x.inputform.title.label}</label>
                  <input name="Title" type="text" ${n?`value="${u(i.Title)}"`:""}
                    title="${x.inputform.title.placeholder}" required placeholder="${x.inputform.title.placeholder}" class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded mb-3 mt-2 p-2 w-full" />
            

                    <label>${x.inputform.teaser.label}</label>
                  <textarea name="Teaser" required
                    title="${x.inputform.teaser.placeholder}'"
                    class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded p-2 mt-2 mb-3" style="height: 71px;"
                    placeholder="${x.inputform.teaser.placeholder}"> ${n?`value="${u(i.Teaser)}"`:""}</textarea>
                    
                  <label>${x.inputform.promptHint.label}</label>
                  <input name="PromptHint" required type="text"  ${n?`value="${u(i.PromptHint)}"`:""}
                    title="${x.inputform.promptHint.placeholder}"
                    class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded p-2 mt-2 mb-3" placeholder="${x.inputform.promptHint.placeholder}" />

                  <label>${x.inputform.promptTemplate.label}</label>
                  <textarea name="Prompt" class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded p-2 mt-2 mb-3" style="height: 120px;" required
                            placeholder="${x.inputform.promptTemplate.placeholer}"
                            title="${x.inputform.promptTemplate.placeholer}">${u(a)}</textarea>
            
                  
                  
                  <div class="flex" >
                    <div class="w-full mr-2">
                      <label>${x.inputform.activity}</label>
                      <input type="text" list="tagsList" name="Tags" id="Category" multiple placeholder="Comma Separated Tags"
                        class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded p-2 mt-2 mb-3" >
                      <datalist id="tagsList" >
                        ${this.searchPredictionList.map(e=>`
                              <option value="${e}">`).join("")}
                      </datalist>
                    </div>

                  ${this.userTones[0]?`<div class="w-full ml-2 items-start justify-center flex flex-col">
                      <label>Pompt Variation</label>
                        <select name="Tone" class="mt-2 mb-3 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-900 rounded w-full">
                        <option  value="" selected  > No Variation </option>

                          ${this.userTones.map(e=>`
                                <option  value="${u(e.ID)}">${u(e.Label)}</option>`).join("")}
                        </select>`:`<div class="w-full ml-2 items-start justify-center flex flex-col">
                        <label>Pompt Variation</label>
                          <select name="Tone" disabled class="mt-2 mb-3 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-900 rounded w-full">
                          <option  value="" selected  > None Defined </option>
  
                          </select>`}

                        
                        
                        </div>

                        <a style="padding-top: 4%;padding-left: 10px;" title="Goto setting and click on My Variations to Manage Variations.">${v("info")}</a>

                        
                      


                </div>

                ${o?"":`<div class="block mx-6 mt-4 gap-4">
                    <label class="text-sm">
                      <input name="Public" value="true" type="checkbox" class="mx-4 dark:bg-gray-700"> 
                      ${x.inputform.share}
                    </label>
                    
                    <label class="text-sm mx-6">
                        <input name="companyTonesState" type="checkbox" class="mx-4 dark:bg-gray-700"> 
                        Apply overall company tone
                      </label>
            
                  
                </div>`}
            
                <div class=" px-4 py-3 text-right">
                ${!0===o?`<button type="submit" name="saveAsNewPromptTemplate" class="bg-gray-600 hover:bg-gray-400 mr-2 px-4 py-2 mt-2 rounded text-white"
                          > ${x.inputform.saveAsNew}
                  </button>`:""}
                  <button type="button" class="bg-gray-600 hover:bg-gray-400 mr-2 px-4 py-2 mt-2 rounded text-white"
                          onclick="IN_BOUND.hideSavePromptModal()"> ${x.inputform.cancel}
                  </button>
                  <button type="submit" name="savePromptAsTemplate" class="bg-orange-500 hover:bg-orange-500/10 mr-2 px-4 py-2 mt-2 rounded text-white">${x.inputform.save}
                  </button>
                </div>


                </div>

                  

                 
            
              </div>
            </form>
          </div>
        </div>
        
      </div>
    `,l.style="display: block;",document.addEventListener("keydown",e=>{"Escape"===e.key&&this.hideSavePromptModal()})},addNewEmptyTone(){var e=[{ID:(new Date).getTime()+Math.random().toString(16).slice(2),Label:"My New Variation",Description:"My Variation Detail"}];this.userTones=[...e,...this.userTones],this.showSettingModal()},async deleteToneFromSetting(e){await this.Client.deleteTone(e),this.refreshActions(),this.showNotification(s.SUCCESS,"Tone was deleted!")},async showSettingModal(){this.tonesOrderLocal=JSON.parse(localStorage.getItem("tonesOrderLocal"))||[],this.tonesOrderLocal?.index&&(this.tonesOrderLocal=[this.tonesOrderLocal]);const t=this.tonesOrderLocal?.filter(e=>e.team===IN_BOUND.selectedTeam&&e.company===IN_BOUND.selectedCompany&&e.folder===IN_BOUND.folderManager.selectedFolder)[0]?.index||[];t.length<this.userTones.length&&this.userTones.filter(e=>!t.map(e=>e[0]).includes(e.ID)).map(e=>{t.push([e.ID,t.length])});var e=[];for(const[n,l]of t){var r=this.userTones.find(e=>e.ID===n);r&&(e[l]=r)}var a=e.filter(e=>void 0!==e);let o=document.getElementById("settingModal");o||((o=document.createElement("div")).id="settingModal",document.body.appendChild(o)),o.innerHTML=`
      <div style="z-index:100;" class="fixed inset-0 text-center transition-opacity z-50 ">
          <div onclick="IN_BOUND.hideModal('settingModal')" class="absolute bg-gray-900 inset-0 opacity-90">
          </div>

            <div class="fixed inset-0 overflow-y-auto">
              <div  class="flex items-center min-h-full justify-center flex-col">
                <div
                class="w-1/2 align-center px-4 py-4 bg-white dark:bg-gray-800 dark:text-gray-200 inline-block overflow-hidden sm:rounded-lg shadow-xl sm:align-middle sm:max-w-lg sm:my-8 sm:w-full text-left transform transition-all"
                role="dialog" aria-modal="true" aria-labelledby="modal-headline" style="text-align: left;">

                <div class="flex" style="justify-content:flex-end;">
                <a title="Close" 
                  class="pb-4 rounded-md hover:bg-gray-100 cursor-pointer hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                  onclick="IN_BOUND.hideModal('settingModal')"  >  ${v("Cross-Round")}</a>
                </div>

                <div class="flex flex-wrap text-sm font-medium text-center text-gray-900 dark:text-gray-400 w-full border-b mb-4 pb-2">
                    
                  <button class="inline-block px-2 py-1  rounded-sm mr-2 ${"settings"===this.settingsActiveTab?"bg-orange-500 text-white":""} " 
                  onclick="IN_BOUND.settingsActiveTab = 'settings'; IN_BOUND.showSettingModal() " > Setting </button>

                  <button class="inline-block px-2 py-1  rounded-sm mr-2 ${"tones"===this.settingsActiveTab?"bg-orange-500 text-white":""} " 
                  onclick="IN_BOUND.settingsActiveTab = 'tones' ; IN_BOUND.showSettingModal()" > My Variations </button>
                  
                  <button class="inline-block px-2 py-1  rounded-sm mr-2 ${"companyTones"===this.settingsActiveTab?"bg-orange-500 text-white":""} " 
                  onclick="IN_BOUND.settingsActiveTab = 'companyTones'; IN_BOUND.showSettingModal() " > Company Variations </button>
                   
                   
                </div>


                ${"settings"===this.settingsActiveTab?`<div class="mr-4 w-1/5 text-left text-gray-900 dark:text-gray-400">
                  <p class="text-right text-gray-500 dark:text-gray-400" >Version: 13.15.4</p>
                  <label>Extension Language</label>
                  <select id="languageExtSelect" name="Community" class="mt-2 mb-3 text-gray-500 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-900 rounded w-full" required>
                  ${Object.keys(vr).map(e=>`<option   value="${e}" ${this.ExtLang===e?"selected":""}>${e.charAt(0).toUpperCase()+e.slice(1)}</option>`).join("")}
                  </select>

                </div>`:""}


                ${"tones"===this.settingsActiveTab?`

                    <div class="flex justify-between items-center text-center ">
                        <h3>Variations</h3>
                        <div class="flex text-center row">
                        
                        <a  class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                              onclick="IN_BOUND.importToneinSetting()"> ${v("import-h5")} <input id="dropzone-file589325" type="file" accept=".json" class="hidden" /> </a>

                        <a  class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                             onclick="IN_BOUND.addNewEmptyTone()"> ${v("add-5")}  </a>

                              </div>
                    </div>
                    <div id="variationBox" class="list-group">
                       ${a.map(e=>`<div class=" list-group-item " data-id="${e.ID}" >
                       
                       <div  class="flex items-center   justify-between m-2 bg-gray-50 dark:bg-gray-700  p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900 border shadow border-gray-300 dark:border-gray-700 hover:shadow-lg transition duration-300 ease-in-out tw-border-2 tw-border-blue-500 tw-rounded-xl">
                        <div class="flex gap-1 justify-center items-center">
                          ${v("drag-lines")}
                           <p class="ml-5">${e.Label}</p> 
                        </div>
                          <div class="flex gap-1 justify-end items-start"> 

                              <a title="Copy variation" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                              onclick =" ${-1===this.hiddenVariations.indexOf(e.ID)?`IN_BOUND.hideVariation('${e.ID}')"> `+v("eye"):`IN_BOUND.unHideVariation('${e.ID}')"> `+v("eye_off")}   </a>

                              <a title="Copy variation" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                              onclick="IN_BOUND.copyToneFromSetting('${e.ID}')"> ${v("copy")}  </a>

                              <a title="Download variation" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                              onclick="IN_BOUND.exportToneFromSetting('${e.ID}')"> ${v("export")}  </a>
                            
                            
                              <a title="Edit variation" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                              onclick="${IN_BOUND.editActivatedTonesInSetting!==e.ID?`IN_BOUND.editActivatedTonesInSetting = '${e.ID}'; IN_BOUND.showSettingModal();`:"IN_BOUND.editActivatedTonesInSetting = ''; IN_BOUND.showSettingModal()"}"> ${IN_BOUND.editActivatedTonesInSetting===e.ID?v("EditOrange"):v("Edit")}  </a>
                            
                              <a title="Delete variation" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                              onclick="IN_BOUND.deleteToneFromSetting('${e.ID}')"> ${v("Cross")}  </a>
                          
                              </div> 
                        </div>
                        
                        <form id="saveToneForm" class="${IN_BOUND.editActivatedTonesInSetting===e.ID?"":"hidden"}   " >
                        <input type="hidden" name="ID" value="${e.ID}" />
                        
                      <div
                        class="align-center bg-white dark:bg-gray-800 dark:text-gray-200 inline-block overflow-hidden sm:rounded-lg shadow-xl sm:align-middle w-full text-left transform transition-all"
                        role="dialog" aria-modal="true" aria-labelledby="modal-headline" style="text-align: left;">
                    
                        <div class="bg-white dark:bg-gray-800 px-4 overflow-y-auto">
                          <label>Title</label>
                            <input name="Label" type="text" value="${e.Label}"}
                              title="Tone Label" required placeholder="Tone Label" class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded mb-3 mt-2 p-2 w-full" />
                      
                            <label>Tone</label>
                            <textarea name="Description" class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded p-2 mt-2 mb-3" style="height: 120px;" required
                                      placeholder="Tone"
                                      title="Tone">${e.Description}</textarea>
                      
                            <div class=" px-4 py-3 text-right">
                              
                                <button type="button" class="bg-gray-600 hover:bg-gray-400 mr-2 px-4 py-2 mt-2 rounded text-white"
                                        onclick=" IN_BOUND.editActivatedTonesInSetting = ''; IN_BOUND.showSettingModal() " "> Cancel
                                </button>
                                <button type="submit" class="bg-orange-500 hover:bg-orange-500/10 mr-2 px-4 py-2 mt-2 rounded text-white">Save
                                </button>
                            </div>
              
                        </div>
                      </form>

                        </div></div>`).join("")}
                        </div>
                        
                `:""}


              ${"companyTones"===this.settingsActiveTab?`

                <div class="flex justify-between items-center text-center ">
                    <h3>Company Variations</h3>
                </div>
                   ${this.companyTones.map(e=>`<div class="  ">
                   <div class="flex items-center  justify-between m-2 bg-gray-50 dark:bg-white/5 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900 border shadow border-gray-300 dark:border-gray-700 hover:shadow-lg transition duration-300 ease-in-out tw-border-2 tw-border-blue-500 tw-rounded-xl">
                      <div> <p>${e.Label}</p> </div>
                      <div class="flex gap-1 justify-end items-start"> 
                        
                          <a title="Copy to user variations"  class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                          onclick="IN_BOUND.forkActivatedTonesInSetting('${e.ID}'); IN_BOUND.showSettingModal();"> ${v("fork")}  </a>
                        
                      
                          </div> 
                    </div>
                    `).join("")}
                    
            `:""}


              </div>
            </div>
          <div>
        </div>
  `,o.style="display: block;",o?.querySelector("#languageExtSelect")?.addEventListener("change",this.changeExtLanguage.bind(this));var a=o?.querySelector("#variationBox"),i=(a&&j.create(a,{forceFallback:!0,fallbackClass:"dragged-item",animation:100,easing:"cubic-bezier(1, 0, 0, 1)",handle:".drag-icon",onEnd:function(e){e.item,e.to,e.from,e.oldIndex,e.newIndex,e.oldDraggableIndex,e.newDraggableIndex,e.clone,e.pullMode;let r=[];Array.from(e.target.children).forEach((e,t)=>{e=e.attributes["data-id"].value;r.push([e,t])});e=IN_BOUND.tonesOrderLocal?.filter(e=>!(e.team===IN_BOUND.selectedTeam&&e.company===IN_BOUND.selectedCompany&&e.folder===IN_BOUND.folderManager.selectedFolder))||[];localStorage.setItem("tonesOrderLocal",JSON.stringify([...e,{index:r,company:IN_BOUND.selectedCompany,team:IN_BOUND.selectedTeam,folder:IN_BOUND.folderManager.selectedFolder}])),IN_BOUND.tonesOrderLocal=JSON.parse(localStorage.getItem("tonesOrderLocal")),IN_BOUND.insertLanguageToneWritingStyleContinueActions()}}),o.querySelectorAll("#saveToneForm"));for(let e=0;e<i.length;e++)i[e]?.addEventListener("submit",async function(e){e.preventDefault();e={ID:e.target[0].value,Label:e.target[1].value,Description:e.target[2].value},IN_BOUND.showNotification(s.SUCCESS,"Sync.."),IN_BOUND.editActivatedTonesInSetting="",e={id:e.ID,label:e.Label,prompt:e.Description,user:IN_BOUND.Client.User.Email,company:IN_BOUND.Company};await IN_BOUND.Client.saveEditTone(e),IN_BOUND.refreshActions(),IN_BOUND.showNotification(s.SUCCESS,"Tone changes was saved!"),IN_BOUND.showSettingModal()});o?.querySelector("#companyToneState")?.addEventListener("click",this.changeCompanyToneState.bind(this)),document.addEventListener("keydown",e=>{"Escape"===e.key&&this.hideModal("settingModal")})},hideVariation(e){this.hiddenVariations.push(e),localStorage.setItem("hiddenVariations",JSON.stringify(this.hiddenVariations)),this.showSettingModal(),this.insertLanguageToneWritingStyleContinueActions()},unHideVariation(t){this.hiddenVariations=this.hiddenVariations.filter(e=>e!==t),localStorage.setItem("hiddenVariations",JSON.stringify(this.hiddenVariations)),this.showSettingModal(),this.insertLanguageToneWritingStyleContinueActions()},async forkActivatedTonesInSetting(t){var e=IN_BOUND.companyTones.filter(e=>e.ID===t)[0],r=Math.random().toString(36).substring(2)+"-"+(new Date).getTime().toString(36);e.ID=window.crypto?.randomUUID()||r,e&&(r={id:e.ID,label:"Copy of: "+e.Label,prompt:e.Description,user:IN_BOUND.Client.User.Email,company:IN_BOUND.Company},await IN_BOUND.Client.saveEditTone(r),await IN_BOUND.refreshActions(),IN_BOUND.showSettingModal(),IN_BOUND.showNotification(s.SUCCESS,"Variation added!"))},exportToneFromSetting(t){var e=this.userTones.filter(e=>e.ID===t)[0],r=Math.random().toString(36).substring(2)+"-"+(new Date).getTime().toString(36);e.ID=window.crypto?.randomUUID()||r,e&&(r={id:e.ID,label:e.Label,prompt:e.Description,user:IN_BOUND.Client.User.Email,company:IN_BOUND.Company},this.exportContent(r,r.label),IN_BOUND.showNotification(s.SUCCESS,"Variation downloaded!"))},copyToneFromSetting(t){var e=this.userTones.filter(e=>e.ID===t)[0];e&&(this.copyTextClipboard(e.Description),IN_BOUND.showNotification(s.SUCCESS,"Variation copied!"))},importToneinSetting(){var e=document.getElementById("dropzone-file589325");e.click(),e.onchange=e=>{var e=e.target.files,r=new FileReader;r.onload=async function(){var e=r.result,e=JSON.parse(e),t=Math.random().toString(36).substring(2)+"-"+(new Date).getTime().toString(36);e.id=window.crypto?.randomUUID()||t,e&&(e.id,e.label,e.prompt,e.prompt?(await IN_BOUND.Client.saveEditTone(e),IN_BOUND.showNotification(s.SUCCESS,"Variation added!"),await IN_BOUND.refreshActions(),IN_BOUND.showSettingModal()):IN_BOUND.showNotification(s.SUCCESS,"Invalid Variation!"))},r.readAsText(e[0])}},async showVariablesModal(e){const t=["PdfRead"];e=e.Prompt.split("{{").map(e=>-1<e.indexOf("}}")?e.split("}}")[0]:"").filter(e=>""!==e);let r=document.getElementById("variablesModal");r||((r=document.createElement("div")).id="variablesModal",r.addEventListener("submit",function(e){e.preventDefault(),IN_BOUND.addVariablesToPrompt(e)}),document.body.appendChild(r)),r.innerHTML=`
      <div style="z-index:1000;" class="fixed inset-0 text-center transition-opacity ">
        <div  class="absolute bg-gray-900 inset-0 opacity-90">
        </div>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex items-center justify-center min-h-full">
            <form id="saveVariableForm">
              
              <div
              class="align-center px-6 py-4 bg-white dark:bg-gray-800 dark:text-gray-200 inline-block overflow-hidden sm:rounded-lg shadow-xl sm:align-middle sm:max-w-lg sm:my-8 sm:w-full text-left transform transition-all"
              role="dialog" aria-modal="true" aria-labelledby="modal-headline" style="text-align: left;">
          
                ${e?.map(e=>-1===t?.indexOf(e?.split(":")[0])?`
                    <label>${e?.split(":")[0]}</label>
                    <textarea name="{{${e?.split(":")[0]}" class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded p-2 mt-2 mb-3" style="height: 120px;" required
                              placeholder=" ${e?.split(":")[1]||""}"
                              title=" ${e?.split(":")[1]||""}"></textarea>
                    `:`
                    <label for="${e?.split(":")[0]}" >PDF File:</label>
                    <input type="file" id="${e?.split(":")[0]}" accept="application/pdf" name="${e?.split(":")[0]}" class=" rounded py-2 px-3 w-full">    
                    `).join("")}
            
                <div class=" px-4 py-3 text-right">
                  <button type="button" class="IN_BOUND_hideVariablesModal bg-gray-600 hover:bg-gray-400 mr-2 px-4 py-2 mt-2 rounded text-white"
                          > Cancel
                  </button>
                  <button type="submit" name="savePromptVariables" class="bg-orange-500 hover:bg-orange-500/10 mr-2 px-4 py-2 mt-2 rounded text-white"> Submit
                  </button>
                </div>
            
              </div>
            </form>
          </div>
        </div>
        
      </div>
    `,0<e.length?r.style="display: block;":r.style="display: none;",r?.querySelector(".IN_BOUND_hideVariablesModal")?.addEventListener("click",()=>{IN_BOUND.hideModal("variablesModal"),this.selectPromptTemplate(null)}),document.addEventListener("keydown",e=>{"Escape"===e.key&&this.hideModal("variablesModal")})},async addVariablesToPrompt(e){var t,r,a,e=new FormData(e.target);let o=this.SelectedPromptTemplate.Prompt;for([t,r]of e)9e3<(o="object"==typeof r?(a=this.sanitizeTextContent(await this.readPDFFile(r)),o.split(t)[0]+a+o.split(t)[1]?.split("}}")[1]):o.split(t)[0]+r+o.split(t)[1]?.slice(o.split(t)[1]?.indexOf("}}")+2)).length&&(IN_BOUND.longInputText=o,IN_BOUND.chunkProcessingState=!1),this.SelectedPromptTemplate={...this.SelectedPromptTemplate,Prompt:o};this.hideModal("variablesModal")},readPDFFile(t){return new Promise((o,i)=>{var e=new FileReader;e.onload=function(){var e=new Uint8Array(this.result);pdfjsLib.getDocument(e).promise.then(t=>{var r=t.numPages,a=[];for(let e=1;e<=r;e++)a.push(t.getPage(e));Promise.all(a).then(e=>{var t,r=[];for(t of e)r.push(t.getTextContent());Promise.all(r).then(e=>{let t="";for(var r of e)for(var a of r.items)t+=a.str+" ";o(t)}).catch(i)}).catch(i)}).catch(i)},e.readAsArrayBuffer(t)})},sanitizeTextContent(e){return e=(e=(e=(e=e.replace(/\s+/g," ")).replace(/\./g,"")).replace(/[^\x00-\x7F]+/g,"")).trim()},changeCompanyToneState(e){this.companyTonesState=e.target.checked,window.localStorage.setItem("companyTonesState",this.companyTonesState),this.refreshActions()},addExportButton(){var e,t=document.querySelector("nav");t&&!t.querySelector("#export-button")&&((e=document.createElement("a")).id="export-button",e.className=g`ExportButton`,e.innerHTML=v`Export`+" Export Conversation",e.onclick=this.exportCurrentChat.bind(this),document.querySelector(".flex-1.overflow-hidden h1")&&(e.style="pointer-events: none;opacity: 0.5"),[...t.children].find(e=>e.innerText.includes("Log out")))},getNewChatButtons(){var e=document.querySelector("#nav"),t=document.querySelector(".sticky");return[[...e?.querySelectorAll(".cursor-pointer")??[]].find(e=>"New chat"===e.innerText),t?.querySelector("button.px-3")].filter(e=>e)},copyPromptClipboard(t){setTimeout(function(){var e=IN_BOUND.current_active_prompts.filter(e=>e.promptID===t)[0].Prompt;navigator.clipboard.writeText(e).then(()=>{IN_BOUND.showNotification(s.SUCCESS,"The prompt template was copied to your clipboard.")},()=>{IN_BOUND.showNotification(s.ERROR,"Something went wrong. Please try again.")})},100)},copyTextClipboard(e){navigator.clipboard.writeText(e).then()},filterPromptTemplates(e){return e.filter(e=>!this.PromptSearch||e.Teaser.toLowerCase().includes(this.PromptSearch.toLowerCase())||e.Title.toLowerCase().includes(this.PromptSearch.toLowerCase())||e.Tags.toLowerCase().includes(this.PromptSearch.replace("#","").toLowerCase()))},showLoadingInterface(e){this.getTheme();e=`
    <div id="custom__ripple_Loader" class="box">
        <div class="ripple__rounds">
        ${"dark"===this.Theme?v("no-txt-logo-dark"):v("no-txt-logo-light")}
        <p class="loading-text">${e}</p>
        </div>
        
    </div>

    `;let t=document.createElement("div");t.id="templates-wrapper",t.className="mt-2 md:flex items-start text-center gap-2.5 md:max-w-2xl lg:max-w-3xl m-auto text-sm";var r=document.querySelector("#nav");r?.querySelector("#templates-wrapper")?t=r.querySelector("#templates-wrapper"):r.appendChild(t),t.innerHTML=e,r.classList.add("loading")},hideLoadingInterface(){(document?.querySelector("#nav"))?.querySelector(".box")?.classList?.add("not-show")},checkLoader(){this.isLoading?this.showLoadingInterface():(this.hideLoadingInterface(),this.insertPromptTemplatesSection())},showSavedSearchModal(){let e=document.getElementById("savedSearchModal");e||((e=document.createElement("div")).id="savedSearchModal",document.body.appendChild(e)),e.innerHTML=`
    <div style="z-index:100;" class="fixed inset-0 text-center transition-opacity z-50 ">
          <div onclick="IN_BOUND.hideModal('savedSearchModal')"  class="absolute bg-gray-900 inset-0 opacity-90">
          </div>

            <div class="fixed inset-0 overflow-y-auto">
              <div  class="flex items-center min-h-full justify-center flex-col">
              <div class=" align-center px-4 py-4 bg-white dark:bg-gray-800 dark:text-gray-200 inline-block overflow-hidden sm:rounded-lg shadow-xl sm:align-middle sm:max-w-lg sm:my-8 sm:w-full text-left transform transition-all"
                role="dialog" aria-modal="true" aria-labelledby="modal-headline" style="text-align: left;">

              <div class="flex" style="justify-content:flex-end;">
                <a title="Close" 
                  class="pb-4 rounded-md hover:bg-gray-100 cursor-pointer hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                  onclick="IN_BOUND.hideModal('savedSearchModal')"  >  ${v("Cross-Round")}</a>
                </div>

                <h2> Saved Searches </h2>
              
    <div id="show_chips_modal" class="flex items-center justify-center gap-2 flex-wrap p-4 max-w-lg">
      ${0<this.savedSearchList.length?this.savedSearchList?.map(e=>`<div class="flex-none p-2">
        <button onclick="IN_BOUND.searchIntoPrompts('${e}')" 
        class="${g`saveSearchChips`} 
        border-0 border border-gray-500" >${e}</button> </div>`).join(""):`
        <p class="text-gray-400" >No saved searches</p>
        `}
    </div>
    </div></div></div></div>`,e.style="display: block;",e?.querySelector("#InputToneCategory")?.addEventListener("change",this.changeInputToneCategory.bind(this))},showMultipleCompanyModal(){let e=document.getElementById("multipleCompanyModal");e||((e=document.createElement("div")).id="multipleCompanyModal",document.body.appendChild(e)),e.innerHTML=`
    <div style="z-index:100;" class="fixed inset-0 text-center transition-opacity z-50 ">
          <div onclick="IN_BOUND.hideModal('multipleCompanyModal')"  class="absolute bg-gray-900 inset-0 opacity-90">
          </div>

            <div  class="fixed inset-0 overflow-y-auto">
              <div  class="flex items-center min-h-full justify-center flex-col">
              <div class=" align-center px-4 py-4 bg-white dark:bg-gray-800 dark:text-gray-200 inline-block overflow-hidden sm:rounded-lg shadow-xl sm:align-middle sm:max-w-lg sm:my-8 sm:w-full text-left transform transition-all"
                role="dialog" aria-modal="true" aria-labelledby="modal-headline" style="text-align: left;">

              <div  class="flex" style="justify-content:flex-end;">
                <a title="Close" 
                  class="pb-4 rounded-md hover:bg-gray-100 cursor-pointer hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                  onclick="IN_BOUND.hideModal('multipleCompanyModal')"  >  ${v("Cross-Round")}</a>
                </div>

                <h2> Select Company </h2>
              
    <div id="show_chips_modal" class="flex items-center justify-center gap-2 flex-wrap p-4 max-w-lg">
      ${1<this.allCompanies.length?this.allCompanies?.map(e=>`<div class="flex-none p-2">
        <button onclick="IN_BOUND.selectCompany('${e.id}')" 
        class="${g`saveSearchChips`} 
          ${e.id===this.selectedCompany?"border":"border-0"} border-gray-500" >${e.name}</button> </div>`).join(""):`
        <p class="text-gray-400" >You're not member of multiple companies!</p>
        `}
    </div>
    </div></div></div></div>`,e.style="display: block;"},showMultipleTeamsModal(){let e=document.getElementById("showMultipleTeamsModal");e||((e=document.createElement("div")).id="showMultipleTeamsModal",document.body.appendChild(e)),e.innerHTML=`
    <div style="z-index:100;" class="fixed inset-0 text-center transition-opacity z-50 ">
          <div onclick="IN_BOUND.hideModal('showMultipleTeamsModal')"  class="absolute bg-gray-900 inset-0 opacity-90">
          </div>

            <div  class="fixed inset-0 overflow-y-auto">
              <div  class="flex items-center min-h-full justify-center flex-col">
              <div class=" align-center px-4 py-4 bg-white dark:bg-gray-800 dark:text-gray-200 inline-block overflow-hidden sm:rounded-lg shadow-xl sm:align-middle sm:max-w-lg sm:my-8 sm:w-full text-left transform transition-all"
                role="dialog" aria-modal="true" aria-labelledby="modal-headline" style="text-align: left;">

              <div  class="flex" style="justify-content:flex-end;">
                <a title="Close" 
                  class="pb-4 rounded-md hover:bg-gray-100 cursor-pointer hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                  onclick="IN_BOUND.hideModal('showMultipleTeamsModal')"  >  ${v("Cross-Round")}</a>
                </div>

                <h2> Select Company </h2>
              
    <div id="show_chips_modal" class="flex items-center justify-center gap-2 flex-wrap p-4 max-w-lg">
      ${1<this.allTeams.length?this.allTeams?.map(e=>`<div class="flex-none p-2">
        <button onclick="IN_BOUND.selectTeam('${e.id}')" 
        class="${g`saveSearchChips`} 
          ${e.id===this.selectedTeam?"border":"border-0"} border-gray-500" >${e.tag}</button> </div>`).join(""):`
        <p class="text-gray-400" >You're not member of multiple teams!</p>
        `}
    </div>
    </div></div></div></div>`,e.style="display: block;"},showFolderModal(){let e=document.getElementById("showFolderModal");e||((e=document.createElement("div")).id="showFolderModal",document.body.appendChild(e)),e.innerHTML=`
    <div style="z-index:100;" class="fixed inset-0 text-center transition-opacity z-50 ">
          <div onclick="IN_BOUND.hideModal('showFolderModal')"  class="absolute bg-gray-900 inset-0 opacity-90">
          </div>

            <div  class="fixed inset-0 overflow-y-auto">
              <div  class="flex items-center min-h-full justify-center flex-col">
              <div class=" w-1/2 align-center px-4 py-4 bg-white dark:bg-gray-800 dark:text-gray-200 inline-block overflow-hidden sm:rounded-lg shadow-xl sm:align-middle sm:max-w-lg sm:my-8 sm:w-full text-left transform transition-all"
                role="dialog" aria-modal="true" aria-labelledby="modal-headline" style="text-align: left;">

              <div  class="flex" style="justify-content:flex-end;">
                <a title="Close" 
                  class="pb-4 rounded-md hover:bg-gray-100 cursor-pointer hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                  onclick="IN_BOUND.hideModal('showFolderModal')"  >  ${v("Cross-Round")}</a>
                </div>

                <h2> Manage Folders </h2>

                <div class="p-1 flex flex-row gap-4 justify-between w-full" >

                <div class="flex items-center justify-centerflex-wrap w-full">
                  <input id="folderName" type="text" title="Folder Name" required="" placeholder="Folder Name" class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded p-=1 w-full">
                </div>

                <div class="flex items-center justify-center flex-wrap">
                <button id="addFolder" class="p-1 rounded-md hover:bg-gray-100 cursor-pointer hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200" >
                    Add Folder 
                </button></div>

                <div  class="flex items-center justify-center flex-wrap" >
                <a 
                class="p-1 text-center rounded-md hover:bg-gray-100 cursor-pointer hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                  onclick="IN_BOUND.folderManager.selectFolder('')"   >  Clear Selection </a>
                </div>

                </div>

                
              
    <div id="show_chips_modal" class="flex items-center justify-center gap-2 flex-wrap p-4">
      ${1<this.folderManager.folders.length?this.folderManager.folders?.map(e=>`<div class="flex-none p-2 rounded border border-gray-500 dark:border-gray-600">
        <button onclick="IN_BOUND.folderManager.selectFolder('${e.name}')" 
        class="rounded font-small bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white px-2 py-1
          ${e.name===this.folderManager.selectedFolder?"border":"border-0"} border-gray-500" >${e.name} </button> 
          <button onclick="IN_BOUND.folderManager.deleteFolder('${e.name}'); IN_BOUND.showFolderModal();" class="p-1 rounded-md hover:bg-gray-100 cursor-pointer hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200" > 
              ${v("Cross")} </button>
          </div>`).join(""):`
        <p class="text-gray-400" >You're not member of multiple teams!</p>
        `}
    </div>
    </div></div></div></div>`,e.style="display: block;",e.querySelector("#addFolder").addEventListener("click",()=>{IN_BOUND.folderManager.createFolder(document.querySelector("#folderName")?.value),IN_BOUND.showFolderModal()})},showFolderSelectionModal(){let e=document.getElementById("showFolderSelectionModal");e||((e=document.createElement("div")).id="showFolderSelectionModal",document.body.appendChild(e)),e.innerHTML=`
    <div style="z-index:100;" class="fixed inset-0 text-center transition-opacity z-50 ">
          <div onclick="IN_BOUND.hideModal('showFolderSelectionModal')"  class="absolute bg-gray-900 inset-0 opacity-90">
          </div>

            <div  class="fixed inset-0 overflow-y-auto">
              <div  class="flex items-center min-h-full justify-center flex-col">
              <div class=" w-1/2 align-center px-4 py-4 bg-white dark:bg-gray-800 dark:text-gray-200 inline-block overflow-hidden sm:rounded-lg shadow-xl sm:align-middle sm:max-w-lg sm:my-8 sm:w-full text-left transform transition-all"
                role="dialog" aria-modal="true" aria-labelledby="modal-headline" style="text-align: left;">

              <div  class="flex" style="justify-content:flex-end;">
                <a title="Close" 
                  class="pb-4 rounded-md hover:bg-gray-100 cursor-pointer hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                  onclick="IN_BOUND.hideModal('showFolderSelectionModal')"  >  ${v("Cross-Round")}</a>
                </div>

                <h2> Choose A Folder </h2>

                
              
    <div id="show_chips_modal" class="flex items-center justify-center gap-2 flex-wrap p-4">
      ${1<this.folderManager.folders.length?this.folderManager.folders?.map(e=>`<div class="flex-none p-2">
        <button onclick="IN_BOUND.promptSelectionManager.addToFolder('${e.name}')" 
        class="${g`saveSearchChips`} 
          border-0 border-gray-500" >${e.name}</button> </div>`).join(""):`
        <p class="text-gray-400" >You're not member of multiple teams!</p>
        `}
    </div>
    </div></div></div></div>`,e.style="display: block;"},selectTeam(e){this.selectedTeam=e,localStorage.setItem("team_id",e),this.insertPromptTemplatesSection(),this.hideModal("showMultipleTeamsModal")},selectCompany(e){this.selectedCompany=e,localStorage.setItem("company_id",e),localStorage.setItem("team_id",""),this.selectTeam(""),this.reloadAllData(),this.hideModal("multipleCompanyModal")},folderManager:{folders:[],selectedFolder:"",initializeFolders(){var e=localStorage.getItem("folders");this.selectedFolder=localStorage.getItem("selectedFolder")||"",e&&(this.folders=JSON.parse(e))},saveFolders(){localStorage.setItem("folders",JSON.stringify(this.folders))},selectFolder(e){this.selectedFolder=e,localStorage.setItem("selectedFolder",e),IN_BOUND.hideModal("showFolderModal"),IN_BOUND.insertPromptTemplatesSection()},createFolder(e){e&&(e={name:e,company:IN_BOUND.selectedCompany,team:IN_BOUND.selectedTeam,prompts:[]},this.folders.push(e),this.saveFolders())},editFolder(e,t){e=this.getFolder(e);e&&(e.name=t,this.saveFolders())},deleteFolder(e){e=this.getFolderIndex(e);-1!==e&&(this.folders.splice(e,1),this.saveFolders())},addPrompt(e,t){var r,e=this.getFolder(e);e&&(r=t,e.prompts.find(e=>e===t)||(e.prompts.push(r),this.saveFolders()))},getFolder(t){return this.folders.find(e=>e.name===t)},getFolderIndex(t){return this.folders.findIndex(e=>e.name===t)}},promptSelectionManager:{selectedIds:[],manageId:function(e){var t;this.selectedIds.includes(e)?-1<(t=this.selectedIds.indexOf(e))&&this.selectedIds.splice(t,1):this.selectedIds.push(e),IN_BOUND.insertPromptTemplatesSection()},addToFolder:function(t){this.selectedIds?.map(e=>{IN_BOUND.folderManager.addPrompt(t,e)}),IN_BOUND.hideModal("showFolderSelectionModal"),this.selectedIds=[],IN_BOUND.insertPromptTemplatesSection()}},insertPromptTemplatesSection(){let r=this.PromptTemplates;if(r){r=(r=this.PromptTemplatesType===h.OWN?this.OwnPrompts:r).map((e,t)=>({...e,promptID:e.ID,ID:t,pin:void 0!==e.pin&&e.pin,favourite:void 0!==e.favourite&&e.favourite}));var a=(r=this.filterPromptTemplates(r)).filter(e=>!0===e.pin),o=r.filter(e=>!1===e.pin);r=[...a,...o];let e=r="All"===this.feedSelected?r:r.filter(e=>!0===e.favourite)||[];if(this.PromptTemplatesType===h.OWN){this.promptsOrderLocal=JSON.parse(localStorage.getItem("promptsOrderLocal")),this.promptsOrderLocal?.index&&(this.promptsOrderLocal=[this.promptsOrderLocal]);const d=this.promptsOrderLocal?.filter(e=>e.team===IN_BOUND.selectedTeam&&e.company===IN_BOUND.selectedCompany&&e.folder===IN_BOUND.folderManager.selectedFolder)[0]?.index||[];let t=[];d.length<e.length&&e.filter(e=>!d.map(e=>e[0]).includes(e.promptID)).map(e=>{t.push(e)});var i=[];for(const[c,p]of d){var n=e.find(e=>e.promptID===c);n&&(i[p]=n)}o=i.filter(e=>void 0!==e);0<o.length?e=[...t,...o]:e,e=e.filter(e=>!1===e.pin)}var{currentPage:o,pageSize:l}=this.PromptTemplateSection,s=l*o,l=Math.min(l*(o+1),r.length),o=(this.current_active_prompts=e).map(e=>e.Tags.toString().split(",")).flat(1),o=(this.searchPredictionList=Array.from(new Set(o)),1<this.allCompanies.length?`
        <div id="show_chips_modal" class="flex items-center overflow-hidden space-x-2 px-2 min-w-xs max-w-md">
      ${""}

          ${""}


          ${1<this.allCompanies.length?`<div class="flex-none">
          <button onclick="IN_BOUND.showMultipleCompanyModal()" 
          class="${g`saveSearchChips`} 
          border-0 border border-gray-500" > ${this.allCompanies?.filter(e=>e.id===IN_BOUND.selectedCompany)[0]?.name||"Companies"}  </button> </div>`:""}

          ${"djdghwyeiwudb"===this.allTeams.length?`<div class="flex-none">
          <button onclick="IN_BOUND.showMultipleTeamsModal()" 
          class="${g`saveSearchChips`} 
          border-0 border border-gray-500" >Teams</button> </div>`:""}

      </div>
  `:""),s=`
    
    <div class="flex flex-1 gap-3.5 justify-between items-center sm:flex-col ">
    <span class="${g`paginationText`}">
        Showing <span class="${g`paginationNumber`}">${1+s}</span> to <span class="${g`paginationNumber`}">${l}</span> of <span class="${g`paginationNumber`}">${r.length} Prompts</span>
      </span>

      <div class="${g`paginationButtonGroup`}">
        <button onclick="IN_BOUND.prevPromptTemplatesPage()" class="${g`paginationButton`}" style="border-radius: 6px 0 0 6px">${v`previous`}</button>
        <button onclick="IN_BOUND.nextPromptTemplatesPage()" class="${g`paginationButton`} border-0 border-l border-gray-500" style="border-radius: 0 6px 6px 0">${v`next`}</button>
      </div>
    </div>
  `,l=`
    <div class="${g`column`} relative">

      ${this.isAdmin()?`
            <div class="absolute top-0 right-0">
              <label class="relative inline-flex items-center mb-5 cursor-pointer flex-col" title="Admin Mode">
                <input type="checkbox" value="" class="sr-only peer" id="adminMode" onchange="IN_BOUND.toggleAdminMode()" ${this.AdminMode?" checked":""}>
                <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"></div>
                <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
              </label>
            </div>
          `:""}

    
      <div class="flex flex-1 gap-3.5 justify-between items-center"  >
        <div>
        ${"dark"===this.Theme?this.companyMeta.light_logo?`<img src='${this.companyMeta.light_logo}' class="logo-bg" />`:v("Logo-light"):this.companyMeta.dark_logo?`<img src='${this.companyMeta.dark_logo}' class="logo-bg" />`:v("Logo-dark")}
        </div>
        <div  class="flex gap-1 justify-end items-start" >
        
       ${this.features.search?.allow?`<div class="flex flex-row items-center " >
          <input list="prediction" id="promptSearchInput" type="text" class="bg-gray-100 border-0 text-sm rounded-l block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0 md:w-full" placeholder="${x.search}" 
          value="${u(this.PromptSearch)}" onfocus="this.value = this.value">
            <datalist id="prediction">
            ${this.searchPredictionList.map(e=>`<option style="font-size:small; padding:0;" value="${e}"></option>`).join("")}
            </datalist>
            ${""}
        </div>`:""}

        </div>
      </div>
      


  
      <div class="flex flex-1 gap-3.5 justify-between items-center  ">
      <div class="flex flex-1 gap-3.5 justify-between  ">

        <div class="flex flex-1 gap-3.5 justify-start items-start sm:flex-col ">
      
       <div>
          <select id="promptTypeSelect" class="bg-gray-100 pr-7 border-0 text-xs rounded block w-full dark:bg-gray-600 dark:border-gray-600 dark:hover:bg-gray-700 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0">
            
          ${this.features.public_prompts?.allow?`<option class="mx-1 dark:bg-gray-700 dark:text-white"  value="${h.PUBLIC}" ${this.PromptTemplatesType===h.PUBLIC?"selected":""}>${x.tabsLabel[0]}</option>`:""}

          ${this.features.private_prompts?.allow?`<option class="mx-1 dark:bg-gray-700 dark:text-white"  value="${h.OWN}" ${this.PromptTemplatesType===h.OWN?"selected":""}>${x.tabsLabel[1]}</option>`:""}
            
          </select>
        </div>

        
        

      </div>

      <div class="flex gap-1 justify-end items-start">

      ${this.features.reload?.allow?`<a title="Reload All Data" class="p-1 rounded-md hover:bg-gray-100 cursor-pointer hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
        onclick="IN_BOUND.reloadAllData()">${v("reload")}</a>`:""}
      
       ${this.features.setting?.allow?`<a title="${x.titleOnTopIcons[0]}" class="p-1 rounded-md hover:bg-gray-100 cursor-pointer hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
        onclick="IN_BOUND.showSettingModal()">${v("setting")}</a>`:""}
        
        ${this.features.add_prompt?.allow?`<a title="${x.titleOnTopIcons[1]}" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
        onclick="IN_BOUND.showSavePromptModal()">${v("add")}</a>`:""}

        ${this.features.import_export?.allow?`<a title="${x.titleOnTopIcons[2]}" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
        onclick="IN_BOUND.clickeFileInput()"> ${v("import")} <input id="dropzone-file589" type="file" accept=".json" class="hidden" /></a>`:""}

        ${this.features.favourites?.allow?`<a title="${x.titleOnTopIcons[5]}" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="IN_BOUND.changeFeedSelect('${"All"===this.feedSelected?"Favourites":"All"}')">
        ${"All"===this.feedSelected?v`star-gray`:v`star-yellow`} </a>`:""}
  
        ${this.features.expanded_view?.allow?`<a title="${x.titleOnTopIcons[3]}" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="IN_BOUND.changeFeedView('list')">
        ${"list"===this.feedView?v`list-yellow`:v`list`} </a>`:""}
  
        ${this.features.collapsed_view?.allow?`<a title="${x.titleOnTopIcons[4]}" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="IN_BOUND.changeFeedView('grid')">
        ${"grid"===this.feedView?v`grid-yellow`:v`grid`} </a>`:""}

      </div>

      </div>
      </div>



       ${o}


        ${"All"!==this.feedSelected?0===e.length?"<p>No Favourite Prompts!</p>":"":0===e.length?"<p>No Prompts!</p>":""} 


      ${0<a.length?`<div class="${g`ul`} grid grid-cols-1 "  >
        ${("list"===this.feedView?a?.map(e=>`
          <button  data-id="${e.promptID}" class="${g`card`} relative group  " >
            <div class="flex items-center w-full justify-between">

            <div class="text-gray-500 text-xs flex  max-w-full">

            ${this.PromptTemplatesType===h.OWN?.length?`<a title="Select/ Unselect" class=" rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="IN_BOUND.promptSelectionManager.manageId('${e.promptID}')">
              ${-1<this.promptSelectionManager.selectedIds.indexOf(e.promptID)?v`checked_checkbox`:v`empty_checkbox`} </a>`:""}
             
              ${e.AuthorURL&&e.AuthorName?`
                    <a href="#" class="mx-1 overflow-hidden text-ellipsis flex-1"
                      style="white-space: nowrap;"
                      onclick="event.stopPropagation()"
                      rel="noopener noreferrer" 
                      title="${x.authorTitle} ${u(e.AuthorName)} - ${u(e.AuthorURL)}">
                      ${u(e.AuthorName).slice(0,15)}
                    </a>`:""}            
              · 
              <span title="${x.timeTitle} ${cr(e.RevisionTime)}" class="mx-1">${pr(e.RevisionTime)}</span>

            </div>

            ${this.PromptTemplatesType===h.PUBLIC&&2===e.PromptTypeNo?`
              
            `+(this.access.cardMenuInDots?`<div class="flex gap-4 justify-center lg:gap-1 lg:pl-2 mt-1 right-2 text-gray-400   group-hover:visible">

            ${""}

            ${this.features.copy?.allow?`<a title="${this.forkPromptTemplates.includes(e.promptID)?x.cardIconsTitle[3]:x.cardIconsTitle[2]}" class="p-1 ${this.forkPromptTemplates.includes(e.promptID)?"cursor-not-allowed":""} rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                      onclick=" ${this.forkPromptTemplates.includes(e.promptID)?"":`IN_BOUND.forkPrompt('${e.promptID}')`}"> ${this.forkPromptTemplates.includes(e.promptID)?v("fork-yellow"):v("fork")}</a>`:""}

               <a title="Show Options" id="PromptCardOptionsBtn" onclick="IN_BOUND.toogleOptionsVisibility('PromptCardOptions-${e.ID}')" class=" hidden p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" >${v("horizontal-menu")}</a>
            </div>`:""):`<div class="flex gap-4 justify-center lg:gap-1 lg:pl-2 mt-1 right-2 text-gray-400   group-hover:visible">

            ${this.features.favourites?.allow?`<a title="${e.favourite?x.cardIconsTitle[1]:x.cardIconsTitle[0]}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.${e.favourite?"voteThumbsDown":"voteThumbsUp"}('${e.promptID}')">${v(e.favourite?"star-yellow":"star-gray")}</a>`:""}

            ${this.features.pin?.allow?` <a title="${e.pin?x.cardIconsTitle[5]:x.cardIconsTitle[4]}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.${e.pin?"removePin":"addToPin"}('${e.promptID}')">${v(e.pin?"pin-yellow":"pin-gray")}</a>`:""}

               <a title="Show Options" id="PromptCardOptionsBtn" onclick="IN_BOUND.toogleOptionsVisibility('PromptCardOptions-${e.ID}')" class=" p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" >${v("horizontal-menu")}</a>
            </div>`}



            <div style="top:40px; z-index:99999; box-shadow:0 2px 5px 6px rgba(0, 0, 0, 0.1); " class="${this.access.cardMenuInDots?"hidden absolute right-1 rounded shadow-lg px-1 py-1 flex-col bg-white dark:bg-gray-800  dark:border-bg-ray-700":"flex right-1"} gap-2 justify-center  mt-1 text-gray-600 group-hover:visible PromptCardOptions"  id="PromptCardOptions-${e.ID}">

                ${this.PromptTemplatesType===h.PUBLIC&&2===e.PromptTypeNo?`
                    
                    ${this.features.copy?.allow?`<a title="${this.forkPromptTemplates.includes(e.promptID)?x.cardIconsTitle[3]:x.cardIconsTitle[2]}" class="p-1 ${this.forkPromptTemplates.includes(e.promptID)?"cursor-not-allowed":""} rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                      onclick=" ${this.forkPromptTemplates.includes(e.promptID)?"":`IN_BOUND.forkPrompt('${e.promptID}')`}"> ${this.forkPromptTemplates.includes(e.promptID)?v("fork-yellow"):v("fork")}</a>`:""}

                    `:`
                      
                      

                    `}
                
                ${this.PromptTemplatesType===h.OWN||1===e.PromptTypeNo||this.isAdminMode()?`

                    `+(-1<this.promptSelectionManager.selectedIds.indexOf(e.promptID)?`

                      <a title="Add to Folder" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="IN_BOUND.showFolderSelectionModal()">
                      ${v("folder")} Add to Folder</a>

                    `:`
                    ${this.features.edit?.allow?`<a title="${x.editPrmptTitle}" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.editPromptTemplate(${e.ID})">${v("Edit")} Edit</a>`:""}

                    ${this.features.import_export?.allow?`<a title="${x.cardIconsTitle[6]}" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.exportPromptTemplate('${e.promptID}')">${v("export")} Download</a>`:""}

                    ${this.features.copy?.allow?`<a title="Copy Prompt" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                      onclick="event.stopPropagation(); IN_BOUND.copyPromptClipboard('${e.promptID}')">${v("copy")} Copy</a>`:""}

                  ${this.features.delete?.allow?`<a title="${x.dltPrmptTitle}" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.deletePromptTemplate(${e.ID})">${v("trash")} Delete</a>`:""}
                    
                    `):""}


              </div>
            </div>      

            <div onclick="IN_BOUND.selectPromptTemplateByIndex(${e.ID})" class="w-full">
            <h4 class="${g`h3`}" style="overflow-wrap: anywhere;">${u(e.Title)}</h4>
            
            <p class="${g`p`} text-gray-600 dark:text-gray-200 overflow-hidden text-ellipsis" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;"
              title="${u(e.Teaser)}">
              ${u(e.Teaser)}
            </p>
            </div>
            

        </button>
      `):a?.map(e=>`
          <button  class="${g`card`} relative group  "  data-id="${e.promptID}"  >
            <div   class="flex gap-2 items-center w-full justify-between">
            
            ${this.PromptTemplatesType===h.OWN?.length?`<a title="Select/ Unselect" class=" rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="IN_BOUND.promptSelectionManager.manageId('${e.promptID}')">
              ${-1<this.promptSelectionManager.selectedIds.indexOf(e.promptID)?v`checked_checkbox`:v`empty_checkbox`} </a>`:""}

              <h4 onclick="IN_BOUND.selectPromptTemplateByIndex(${e.ID})" class="${g`h3`}" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width:100%; ">${u(e.Title)}</h4>

            ${this.PromptTemplatesType===h.PUBLIC&&2===e.PromptTypeNo?this.access.cardMenuInDots?`<div class="flex gap-4 justify-center lg:gap-1 lg:pl-2 mt-1 right-2 text-gray-400   group-hover:visible">

            ${""}

            ${this.features.copy?.allow?`<a title="${this.forkPromptTemplates.includes(e.promptID)?x.cardIconsTitle[3]:x.cardIconsTitle[2]}" class="p-1 ${this.forkPromptTemplates.includes(e.promptID)?"cursor-not-allowed":""} rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                      onclick=" ${this.forkPromptTemplates.includes(e.promptID)?"":`IN_BOUND.forkPrompt('${e.promptID}')`}"> ${this.forkPromptTemplates.includes(e.promptID)?v("fork-yellow"):v("fork")}</a> `:""}


            <a title="Show Options" id="PromptCardOptionsBtn" onclick="IN_BOUND.toogleOptionsVisibility('PromptCardOptions-${e.ID}')" class=" hidden p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" >${v("horizontal-menu")}</a>
            </div>`:"":this.access.cardMenuInDots?`<div class="flex gap-4 justify-center lg:gap-1 lg:pl-2 mt-1 right-2 text-gray-400   group-hover:visible">

            ${this.features.favourites?.allow?`<a title="${e.favourite?x.cardIconsTitle[1]:x.cardIconsTitle[0]}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.${e.favourite?"voteThumbsDown":"voteThumbsUp"}('${e.promptID}')">${v(e.favourite?"star-yellow":"star-gray")}</a>`:""}

            ${this.features.pin?.allow?`<a title="${e.pin?x.cardIconsTitle[5]:x.cardIconsTitle[4]}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.${e.pin?"removePin":"addToPin"}('${e.promptID}')">${v(e.pin?"pin-yellow":"pin-gray")}</a>`:""}

            <a title="Show Options" id="PromptCardOptionsBtn" onclick="IN_BOUND.toogleOptionsVisibility('PromptCardOptions-${e.ID}')" class=" p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" >${v("horizontal-menu")}</a>
            </div>`:""}
            

            <div style="top:40px; z-index:99999; box-shadow:0 2px 5px 6px rgba(0, 0, 0, 0.1); " class="${this.access.cardMenuInDots?"hidden absolute right-1 flex flex-col px-1 py-1 gap-2 rounded border bg-white dark:bg-gray-800  dark:border-bg-ray-700":"flex right-1"} gap-4 justify-center lg:gap-1 lg:pl-2 mt-1 text-gray-600 group-hover:visible PromptCardOptions"  id="PromptCardOptions-${e.ID}">

                ${this.PromptTemplatesType===h.OWN||1===e.PromptTypeNo||this.isAdminMode()?`

                    `+(-1<this.promptSelectionManager.selectedIds.indexOf(e.promptID)?`

                      <a title="Add to Folder" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="IN_BOUND.showFolderSelectionModal()">
                      ${v("folder")} Add to Folder</a>

                    `:`
                    ${this.features.edit?.allow?`<a title="${x.editPrmptTitle}" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.editPromptTemplate(${e.ID})">${v("Edit")} Edit</a>`:""}

                    ${this.features.import_export?.allow?`<a title="${x.cardIconsTitle[6]}" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.exportPromptTemplate('${e.promptID}')">${v("export")} Download</a>`:""}

                    ${this.features.copy?.allow?`<a title="Copy Prompt" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                      onclick="event.stopPropagation(); IN_BOUND.copyPromptClipboard('${e.promptID}')">${v("copy")} Copy</a>`:""}

                  ${this.features.delete?.allow?`<a title="${x.dltPrmptTitle}" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.deletePromptTemplate(${e.ID})">${v("trash")} Delete</a>`:""}
                    
                    `):""}
              </div>
            </div>      

            <div class="-mt-0.5 text-gray-500 text-xs pb-1 max-w-full">
              
            </div>

        </button>
      `)).join("")}
      
      </div>`:""}


      
      <div class="${g`ul`} grid grid-cols-1 list-group" id="promptsContainer" >
        ${("list"===this.feedView?e?.map(e=>`
          <button ${-1<pr(e.RevisionTime).indexOf("seconds")?'style="border: 1px gray solid; "':""}  data-id="${e.promptID}" class="${g`card`} relative group list-group-item  " >
            <div class="flex items-center w-full justify-between">

            <div class="text-gray-500 text-xs flex  max-w-full">

            ${this.PromptTemplatesType===h.OWN?.length?`<a title="Select/ Unselect" class=" rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="IN_BOUND.promptSelectionManager.manageId('${e.promptID}')">
              ${-1<this.promptSelectionManager.selectedIds.indexOf(e.promptID)?v`checked_checkbox`:v`empty_checkbox`} </a>`:""}
              
             
              ${e.AuthorURL&&e.AuthorName?`
                    <a href="#" class="mx-1 overflow-hidden text-ellipsis flex-1"
                      style="white-space: nowrap;"
                      onclick="event.stopPropagation()"
                      rel="noopener noreferrer" 
                      title="${x.authorTitle} ${u(e.AuthorName)} - ${u(e.AuthorURL)}">
                      ${u(e.AuthorName).slice(0,15)}
                    </a>`:""}            
              · 
              <span title="${x.timeTitle} ${cr(e.RevisionTime)}" class="mx-1">${pr(e.RevisionTime)}</span>

            </div>

            ${this.PromptTemplatesType===h.PUBLIC&&2===e.PromptTypeNo?`
              
            `+(this.access.cardMenuInDots?`<div class="flex gap-4 justify-center lg:gap-1 lg:pl-2 mt-1 right-2 text-gray-400   group-hover:visible">

            ${""}

            ${this.features.copy?.allow?`<a title="${this.forkPromptTemplates.includes(e.promptID)?x.cardIconsTitle[3]:x.cardIconsTitle[2]}" class="p-1 ${this.forkPromptTemplates.includes(e.promptID)?"cursor-not-allowed":""} rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                      onclick=" ${this.forkPromptTemplates.includes(e.promptID)?"":`IN_BOUND.forkPrompt('${e.promptID}')`}"> ${this.forkPromptTemplates.includes(e.promptID)?v("fork-yellow"):v("fork")}</a>`:""}

               <a title="Show Options" id="PromptCardOptionsBtn" onclick="IN_BOUND.toogleOptionsVisibility('PromptCardOptions-${e.ID}')" class=" hidden p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" >${v("horizontal-menu")}</a>
            </div>`:""):`<div class="flex gap-4 justify-center lg:gap-1 lg:pl-2 mt-1 right-2 text-gray-400   group-hover:visible">

            ${this.features.favourites?.allow?`<a title="${e.favourite?x.cardIconsTitle[1]:x.cardIconsTitle[0]}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.${e.favourite?"voteThumbsDown":"voteThumbsUp"}('${e.promptID}')">${v(e.favourite?"star-yellow":"star-gray")}</a>`:""}

            ${this.features.pin?.allow?` <a title="${e.pin?x.cardIconsTitle[5]:x.cardIconsTitle[4]}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.${e.pin?"removePin":"addToPin"}('${e.promptID}')">${v(e.pin?"pin-yellow":"pin-gray")}</a>`:""}

               <a title="Show Options" id="PromptCardOptionsBtn" onclick="IN_BOUND.toogleOptionsVisibility('PromptCardOptions-${e.ID}')" class=" p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" >${v("horizontal-menu")}</a>
            </div>`}



            <div style="top:40px; z-index:99999; box-shadow:0 2px 5px 6px rgba(0, 0, 0, 0.1); " class="${this.access.cardMenuInDots?"hidden absolute right-1 rounded shadow-lg px-1 py-1 flex-col bg-white dark:bg-gray-800  dark:border-bg-ray-700":"flex right-1"} gap-2 justify-center  mt-1 text-gray-600 group-hover:visible PromptCardOptions"  id="PromptCardOptions-${e.ID}">

                ${this.PromptTemplatesType===h.PUBLIC&&2===e.PromptTypeNo?`
                    
                    ${this.features.copy?.allow?`<a title="${this.forkPromptTemplates.includes(e.promptID)?x.cardIconsTitle[3]:x.cardIconsTitle[2]}" class="p-1 ${this.forkPromptTemplates.includes(e.promptID)?"cursor-not-allowed":""} rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                      onclick=" ${this.forkPromptTemplates.includes(e.promptID)?"":`IN_BOUND.forkPrompt('${e.promptID}')`}"> ${this.forkPromptTemplates.includes(e.promptID)?v("fork-yellow"):v("fork")}</a>`:""}

                    `:`
                      
                      

                    `}
                
                ${this.PromptTemplatesType===h.OWN||1===e.PromptTypeNo||this.isAdminMode()?`

                    `+(-1<this.promptSelectionManager.selectedIds.indexOf(e.promptID)?`

                      <a title="Add to Folder" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="IN_BOUND.showFolderSelectionModal()">
                      ${v("folder")} Add to Folder</a>

                    `:`
                    ${this.features.edit?.allow?`<a title="${x.editPrmptTitle}" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.editPromptTemplate(${e.ID})">${v("Edit")} Edit</a>`:""}

                    ${this.features.import_export?.allow?`<a title="${x.cardIconsTitle[6]}" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.exportPromptTemplate('${e.promptID}')">${v("export")} Download</a>`:""}

                    ${this.features.copy?.allow?`<a title="Copy Prompt" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                      onclick="event.stopPropagation(); IN_BOUND.copyPromptClipboard('${e.promptID}')">${v("copy")} Copy</a>`:""}

                  ${this.features.delete?.allow?`<a title="${x.dltPrmptTitle}" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.deletePromptTemplate(${e.ID})">${v("trash")} Delete</a>`:""}
                    
                    `):""}


              </div>
            </div>      

            <div onclick="IN_BOUND.selectPromptTemplateByIndex(${e.ID})" class="w-full">

            <div class=" flex flex-row gap-2 items-center " >
            ${this.PromptTemplatesType===h.OWN?v("drag-prompt"):""}

            <h4 class="${g`h3`}" style="overflow-wrap: anywhere;">${u(e.Title)}</h4>
            </div>
            
            <p class="${g`p`} text-gray-600 dark:text-gray-200 overflow-hidden text-ellipsis" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;"
              title="${u(e.Teaser)}">
              ${u(e.Teaser)}
            </p>
            </div>
            

        </button>
      `):e?.map(e=>`
          <button  class="${g`card`} relative group list-group-item "  data-id="${e.promptID}"  >
            <div   class="flex gap-2 items-center w-full justify-between">

            ${this.PromptTemplatesType===h.OWN?.length?`<a title="Select/ Unselect" class=" rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="IN_BOUND.promptSelectionManager.manageId('${e.promptID}')">
              ${-1<this.promptSelectionManager.selectedIds.indexOf(e.promptID)?v`checked_checkbox`:v`empty_checkbox`} </a>`:""}


            <span class="w-5 h-5" >
            ${this.PromptTemplatesType===h.OWN?v("drag-prompt"):""}
            </span>

              <h4 onclick="IN_BOUND.selectPromptTemplateByIndex(${e.ID})" class="${g`h3`}" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width:100%; ">${u(e.Title)}</h4>

            ${this.PromptTemplatesType===h.PUBLIC&&2===e.PromptTypeNo?this.access.cardMenuInDots?`<div class="flex gap-4 justify-center lg:gap-1 lg:pl-2 mt-1 right-2 text-gray-400   group-hover:visible">

            ${""}

            ${this.features.copy?.allow?`<a title="${this.forkPromptTemplates.includes(e.promptID)?x.cardIconsTitle[3]:x.cardIconsTitle[2]}" class="p-1 ${this.forkPromptTemplates.includes(e.promptID)?"cursor-not-allowed":""} rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                      onclick=" ${this.forkPromptTemplates.includes(e.promptID)?"":`IN_BOUND.forkPrompt('${e.promptID}')`}"> ${this.forkPromptTemplates.includes(e.promptID)?v("fork-yellow"):v("fork")}</a> `:""}


            <a title="Show Options" id="PromptCardOptionsBtn" onclick="IN_BOUND.toogleOptionsVisibility('PromptCardOptions-${e.ID}')" class=" hidden p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" >${v("horizontal-menu")}</a>
            </div>`:"":this.access.cardMenuInDots?`<div class="flex gap-4 justify-center lg:gap-1 lg:pl-2 mt-1 right-2 text-gray-400   group-hover:visible">

            ${this.features.favourites?.allow?`<a title="${e.favourite?x.cardIconsTitle[1]:x.cardIconsTitle[0]}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.${e.favourite?"voteThumbsDown":"voteThumbsUp"}('${e.promptID}')">${v(e.favourite?"star-yellow":"star-gray")}</a>`:""}

            ${this.features.pin?.allow?`<a title="${e.pin?x.cardIconsTitle[5]:x.cardIconsTitle[4]}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.${e.pin?"removePin":"addToPin"}('${e.promptID}')">${v(e.pin?"pin-yellow":"pin-gray")}</a>`:""}

            <a title="Show Options" id="PromptCardOptionsBtn" onclick="IN_BOUND.toogleOptionsVisibility('PromptCardOptions-${e.ID}')" class=" p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" >${v("horizontal-menu")}</a>
            </div>`:""}
            

            <div style="top:40px; z-index:99999; box-shadow:0 2px 5px 6px rgba(0, 0, 0, 0.1); " class="${this.access.cardMenuInDots?"hidden absolute flex flex-col px-2 py-2 gap-1 right-9 rounded border bg-white dark:bg-gray-800  dark:border-bg-ray-700":"flex right-1"} gap-4 justify-center lg:gap-1 lg:pl-2 mt-1 text-gray-600 group-hover:visible PromptCardOptions"  id="PromptCardOptions-${e.ID}">

                ${this.PromptTemplatesType===h.PUBLIC&&2===e.PromptTypeNo?`
                    
                     
                      
                    `:`

                    
                    
                    `}
                
                ${this.PromptTemplatesType===h.OWN||1===e.PromptTypeNo||this.isAdminMode()?`

                    `+(-1<this.promptSelectionManager.selectedIds.indexOf(e.promptID)?`

                      <a title="Add to Folder" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="IN_BOUND.showFolderSelectionModal()">
                      ${v("folder")} Add to Folder</a>

                    `:`
                    ${this.features.edit?.allow?`<a title="${x.editPrmptTitle}" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.editPromptTemplate(${e.ID})">${v("Edit")} Edit</a>`:""}

                    ${this.features.import_export?.allow?`<a title="${x.cardIconsTitle[6]}" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.exportPromptTemplate('${e.promptID}')">${v("export")} Download</a>`:""}

                    ${this.features.copy?.allow?`<a title="Copy Prompt" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                      onclick="event.stopPropagation(); IN_BOUND.copyPromptClipboard('${e.promptID}')">${v("copy")} Copy</a>`:""}

                  ${this.features.delete?.allow?`<a title="${x.dltPrmptTitle}" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.deletePromptTemplate(${e.ID})">${v("trash")} Delete</a>`:""}
                    
                    `):""}
              </div>
            </div>      

            <div class="-mt-0.5 text-gray-500 text-xs pb-1 max-w-full">
              
            </div>

        </button>
      `)).join("")}
      
      </div>
    
      ${r.length>this.PromptTemplateSection.pageSize?s:""}
      
    </div>
   `;let t=document.createElement("div");t.id="templates-wrapper",t.className="mt-2 md:flex items-start text-center gap-2.5 md:max-w-2xl lg:max-w-3xl m-auto text-sm";o=document.querySelector("#nav"),a=(o.querySelector("#templates-wrapper")?t=o.querySelector("#templates-wrapper"):o.appendChild(t),t.innerHTML=l,t?.querySelector("#promptsContainer")),s=(a&&(this.sortElems=j.create(a,{animation:200,easing:"cubic-bezier(0.37, 0, 0.63, 1)",handle:".drag-icon-prompt",dataIdAttr:"data-id",ghostClass:"sortable-ghost",swapThreshold:2,onEnd:function(e){e.item,e.to,e.from,e.oldIndex,e.newIndex,e.oldDraggableIndex,e.newDraggableIndex,e.clone,e.pullMode;let r=[];Array.from(e.target.children).forEach((e,t)=>{e=e.attributes["data-id"].value;r.push([e,t])});e=IN_BOUND.promptsOrderLocal?.filter(e=>!(e.team===IN_BOUND.selectedTeam&&e.company===IN_BOUND.selectedCompany&&e.folder===IN_BOUND.folderManager.selectedFolder))||[];localStorage.setItem("promptsOrderLocal",JSON.stringify([...e,{index:r,company:IN_BOUND.selectedCompany,team:IN_BOUND.selectedTeam,folder:IN_BOUND.folderManager.selectedFolder}])),IN_BOUND.promptsOrderLocal=JSON.parse(localStorage.getItem("promptsOrderLocal")),setTimeout(()=>{IN_BOUND.insertPromptTemplatesSection()},300)}})),t?.querySelector("#promptTypeSelect")?.addEventListener("change",this.changePromptTemplatesType.bind(this)),t?.querySelector("#save_search")?.addEventListener("click",this.savedSearch.bind(this)),t?.querySelector("#promptSearchInput")?.addEventListener("input",this.debounce(this.changePromptSearch.bind(this),1e3).bind(this)),t?.querySelectorAll("select.pageSizeSelect"));document.removeEventListener("keydown",this.boundHandleArrowKey),0<s.length&&(s.forEach(e=>{e.addEventListener("change",this.changePromptPageSize.bind(this))}),document.addEventListener("keydown",this.boundHandleArrowKey))}},toogleOptionsVisibility(e){e=document.getElementById(e);e.className.split(" ").includes("hidden")?e.className=e.className.replace("hidden ","flex "):e.className=e.className.replace("flex ","hidden ")},hideOptionsVisibility(t){setTimeout(function(){var e=document.getElementById(t);e.className=e.className.replace("flex ","hidden ")},500)},dragPromptIDOrder(e,t){let r=window.localStorage.getItem("promptCardOrder")?.split(",");var a,o;r?(o=this.OwnPrompts.map(e=>e.ID).filter(function(e){return-1===r.indexOf(e)}),o=(r=[...o,...r]).indexOf(e),a=r.indexOf(t),r.splice(o,1),r.splice(a,0,e),window.localStorage.setItem("promptCardOrder",r)):(o=this.OwnPrompts.map(e=>e.ID),window.localStorage.setItem("promptCardOrder",o),this.dragPromptIDOrder(e,t))},dragSortPromptsList(){},clickeFileInput(){var e=document.getElementById("dropzone-file589");e.click(),e.onchange=e=>{var e=e.target.files,t=new FileReader;t.onload=function(){var e=t.result,e=JSON.parse(e);IN_BOUND.saveImportedPrompt(e)},t.readAsText(e[0])}},async saveImportedPrompt(e){var{Title:e,PromptHint:t,Prompt:r,Tags:a,Teaser:o}=e,e={Title:e,PromptHint:t,Prompt:r,Tags:a,Teaser:o};""===e.Prompt||void 0===e.Prompt?IN_BOUND.showNotification(s.ERROR,"Invalid Prompt!"):(e.AuthorName=this.Client.User.Name,e.AuthorURL=this.Client.User.Email,t=window.crypto.randomUUID()||(new Date).getTime()+Math.random().toString(16).slice(2),e.ID=t,e.id=t,e.CreationTime="",e.RevisionTime="",e.PromptTypeNo=1,e.pin=!1,e.OwnPrompt=!0,e.favourite=!1,e.teamID=this.selectedTeam,this.showNotification(s.SUCCESS,"Sync.."),await this.Client.savePrompt(e),this.showNotification(s.SUCCESS,"Prompt imported!"),this.refreshData())},exportPromptTemplate(t){var e={...this.DefaultPromptTemplates.filter(e=>e.ID===t)[0]||this.OwnPrompts.filter(e=>e.ID===t)[0]};delete e.AuthorName,delete e.AuthorURL,delete e.User,e.forkID=e.ID,e.CreationTime="",e.RevisionTime="",e.ID="",this.exportContent(e,e.Title.slice(0,20))},exportContent(e,t){var e=new Blob([JSON.stringify(e)],{type:"text/plain"}),r=document.createElement("a");r.href=URL.createObjectURL(e),r.download=t+".json",document.body.appendChild(r),r.click()},showImport(){this.showNotification(s.SUCCESS,this.import?"Going back to prompts...":"Getting import prompt templates..."),this.import=!this.import,this.refreshData()},async saveAsNewPromptTemplate(e){var t,r,a={};for([t,r]of new FormData(e.target))a[t]=r;a.AuthorName=this.Client.User.Name,a.AuthorURL=this.Client.User.Email,a.forkID=a.ID,a.ID=window.crypto.randomUUID()||(new Date).getTime()+Math.random().toString(16).slice(2),a.CreationTime="",a.RevisionTime="",a.PromptTypeNo=1,a.pin=!1,a.favourite=!1,a.teamID=this.selectedTeam,this.showNotification(s.SUCCESS,"Sync.."),await this.Client.savePrompt(a),this.showNotification(s.SUCCESS,"Prompt saved as new template!"),this.hideSavePromptModal(),this.refreshData()},async forkPrompt(t){var e=this.PromptTemplates.filter(e=>e.ID===t)[0];e.AuthorName=this.Client.User.Name,e.AuthorURL=this.Client.User.Email,e.Title="Copy of: "+e.Title,e.forkID=e.ID,e.ID=window.crypto.randomUUID()||(new Date).getTime()+Math.random().toString(16).slice(2),e.CreationTime=(new Date).toISOString(),e.RevisionTime=(new Date).toISOString(),e.PromptTypeNo=1,e._id&&delete e._id,e.teamID=this.selectedTeam,this.showNotification(s.SUCCESS,"Sync.."),await this.Client.savePrompt(e),this.showNotification(s.SUCCESS,"Prompt saved to My Prompts!"),this.refreshData()},async removePin(e){this.showNotification(s.SUCCESS,"Sync.."),await this.pinActionForPrompt(e,-1),this.showNotification(s.SUCCESS,"Prompt removed from pin!"),this.refreshData()},async addToPin(e){3<this.PinPromptTemplates.length?this.showNotification(s.ERROR,"You cannot pin more than 4 prompts!"):(this.showNotification(s.SUCCESS,"Sync.."),await this.pinActionForPrompt(e,1),this.showNotification(s.SUCCESS,"Prompt added to pin!"),this.refreshData())},changeExtLanguage(e){this.ExtLang=e.target.value,x=vr[e.target.value],this.insertPromptTemplatesSection(),this.insertLanguageToneWritingStyleContinueActions()},changeFeedSelect(e){this.feedSelected=e,localStorage.setItem("feedSelected",e),this.insertPromptTemplatesSection()},changeFeedView(e){this.feedView=e,window.localStorage.setItem("feedView",e),this.insertPromptTemplatesSection()},boundHandleArrowKey:null,handleArrowKey(e){var t="ArrowLeft"===e.key||"ArrowRight"===e.key,r="INPUT"===e.target.tagName||"TEXTAREA"===e.target.tagName;t&&!r&&("ArrowLeft"===e.key?this.prevPromptTemplatesPage():this.nextPromptTemplatesPage())},changePromptPageSize(e){e=+e.target.value,e=xr.includes(e)?e:5e3;localStorage.setItem("lastPageSize",e),this.PromptTemplateSection.currentPage=0,this.PromptTemplateSection.pageSize=e,this.insertPromptTemplatesSection()},changePromptSearch(e){this.PromptSearch=e.target.value,this.PromptTemplateSection.currentPage=0,this.insertPromptTemplatesSection();e=document.querySelector("#promptSearchInput");e.selectionStart=e.selectionEnd=e.value.length,e.focus()},savedSearch(){this.savedSearchList.push(this.PromptSearch),localStorage.setItem("savedSearchList",JSON.stringify(this.savedSearchList)),setTimeout(()=>{IN_BOUND.insertPromptTemplatesSection()},200)},searchIntoPrompts(e){this.PromptSearch=e,this.PromptTemplateSection.currentPage=0,this.insertPromptTemplatesSection();var t=document.querySelector("#promptSearchInput");t.value=e,t.selectionStart=t.selectionEnd=t.value.length,t.focus(),IN_BOUND.hideModal("savedSearchModal")},changePromptTemplatesType(e){e=e.target.value;this.PromptTemplatesType!==e&&(this.PromptTemplatesType=e,localStorage.setItem("PromptTemplatesType",e),this.PromptTemplateSection.currentPage=0,this.insertPromptTemplatesSection())},debounce(t,r){let a;return e=>{clearTimeout(a),a=setTimeout(()=>t(e),r)}},showToneOptions(){var e,t,r;document.getElementsByClassName("tonesList")[0]?((e=document.getElementsByClassName("tonesList")[0]).style.display="flex",t=document.getElementById("optionOpener").getBoundingClientRect(),e.style.left=t.right+"px"):((e=document.createElement("div")).classList.add("chatgpt-all-in-one-toolbar2","gap-3","tonesList"),e.style.overflow="hidden",(t=document.createElement("div")).classList.add("tones-list-container"),t.id="tones-list-container",t.style.overflow="scroll",t.style.maxHeight="332px",t.style.position="absolute",t.style.backgroundColor="#353740",t.style.padding="0.1em",t.style.borderRadius="5px",t.style.width="fit-content",t.style.position="absolute",r=document.getElementById("optionOpener").getBoundingClientRect(),t.style.left=r.x/2-40+"px",t.style.bottom="7vh",t.onmouseleave=function(){IN_BOUND.hideToneOptions()},t.style.borderColor="#202123",t.style.borderWidth="1px",e.appendChild(t),(r=document.querySelector("form textarea")).parentNode.insertBefore(e,r)),this.insertToneOptionsInContainer()},insertToneOptionsInContainer(){var e=document.querySelector(".tones-list-container"),t=`<ul >${this.Tones.map((e,t)=>`
    <li class="tonesLI" style="cursor:pointer; padding:1px; margin:1px;  flex-direction:row; display:flex; align-content:space-between; flex-wrap: wrap; justify-content: space-between; " >

    <p class="tonesLabel" onClick='IN_BOUND.setToneIndexAndRefresh("${e.ID}")' style="font-size:small; font-weight:light; padding:0px; margin:0px; line-height:normal; display:block;">${e.Label}</p>

    ${"user"===e.type?`<div style="display:flex; flex-direction:row;">
    <a style="margin-left:3px; display:block;" class="tonesEdit" onclick="IN_BOUND.editTone('${e.ID}')" > ${v("Edit")} </a>
    <a style="margin-left:3px; display:block;" class="tonesCross" onclick="IN_BOUND.deleteTone('${e.ID}')" > ${v("Cross")} </a>
    </div>`:""}

    </li>`).join("")}</ul>  `;e.innerHTML=t},setToneIndexAndRefresh(e){this.hideToneOptions(),this.insertLanguageToneWritingStyleContinueActions()},hideToneOptions(){document.getElementsByClassName("tonesList")[0].style.display="none"},editTone(e){this.showeditToneModal(e)},async deleteTone(e){this.hideToneOptions(),await this.Client.deleteTone(e),this.refreshData(),this.showNotification(s.SUCCESS,"Tone was deleted!")},async showeditToneModal(t){var e=this.Tones.filter(e=>e.ID===t)[0];this.InputToneCategorySelected=e.CategoryID;let r=document.getElementById("editToneModal");r||((r=document.createElement("div")).id="editToneModal",r.addEventListener("submit",this.saveEditedTone.bind(this)),document.body.appendChild(r)),r.innerHTML=`
      <div style="z-index:100;" class="fixed inset-0 text-center transition-opacity z-50">
        <div onclick="IN_BOUND.hideModal('editToneModal')"  class="absolute bg-gray-900 inset-0 opacity-90">
        </div>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex items-center justify-center min-h-full flex-col">

        <form id="saveToneForm">
          <input type="hidden" name="ID" value="${e.ID}" />
          
          <div
          class="align-center bg-white dark:bg-gray-800 dark:text-gray-200 inline-block overflow-hidden sm:rounded-lg shadow-xl sm:align-middle sm:max-w-lg sm:my-8 sm:w-full text-left transform transition-all"
          role="dialog" aria-modal="true" aria-labelledby="modal-headline" style="text-align: left;">
      
            <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-y-auto">
            <label>Title</label>
              <input name="Label" type="text" value="${e.Label}"}
                title="Tone Label" required placeholder="Tone Label" class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded mb-3 mt-2 p-2 w-full" />
        
              <label>Tone</label>
              <textarea name="Description" class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded p-2 mt-2 mb-3" style="height: 120px;" required
                        placeholder="Tone"
                        title="Tone">${e.Description}</textarea>
        
                  


                      <div class=" px-4 py-3 text-right">
                
                  <button type="button" class="bg-gray-600 hover:bg-gray-400 mr-2 px-4 py-2 mt-2 rounded text-white"
                          onclick="IN_BOUND.hideModal('editToneModal')"> Cancel
                  </button>
                  <button type="submit" class="bg-orange-500 hover:bg-orange-500/10 mr-2 px-4 py-2 mt-2 rounded text-white">Save
                  </button>
              </div>

          </div>
        </form>
        </div>
          <div>
        </div>
          </div>
        </div>
        
      </div>
    `,r.style="display: block;",document.addEventListener("keydown",e=>{"Escape"===e.key&&this.hideModal("editToneModal")})},async saveEditedTone(e){e.preventDefault();const t={};var r,a;for([r,a]of new FormData(e.target))t[r]=a;e=this.ToneCategories.filter(e=>e.Label===t.Category)[0],t.CategoryID=e.ID,t.Category=e.Label,this.showNotification(s.SUCCESS,"Sync.."),this.hideModal("editToneModal"),e={id:t.ID,label:t.Label,prompt:t.Description,user:IN_BOUND.Client.User.Email,company:IN_BOUND.Company};await this.Client.saveEditTone(e),this.refreshData(),this.showNotification(s.SUCCESS,"Tone changes was saved!")},async showNewToneModal(){let e=document.getElementById("newToneModal");this.InputToneCategorySelected=this.ToneCategories[0].ID,e||((e=document.createElement("div")).id="newToneModal",e.addEventListener("submit",this.saveNewTone.bind(this)),document.body.appendChild(e)),e.innerHTML=`
      <div style="z-index:100;" class="fixed inset-0 text-center transition-opacity z-50">
        <div onclick="IN_BOUND.hideModal('newToneModal')" class="absolute bg-gray-900 inset-0 opacity-90">
        </div>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex items-center justify-center min-h-full flex-col">

          <form id="saveToneForm">
          <input type="hidden" name="ID" value="" />
          
          <div
          class="align-center bg-white dark:bg-gray-800 dark:text-gray-200 inline-block overflow-hidden sm:rounded-lg shadow-xl sm:align-middle sm:max-w-lg sm:my-8 sm:w-full text-left transform transition-all"
          role="dialog" aria-modal="true" aria-labelledby="modal-headline" style="text-align: left;">
      
            <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-y-auto">
            <label>Title</label>
              <input name="Label" type="text" value=""}
                title="Tone Label" required placeholder="Tone Label" class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded mb-3 mt-2 p-2 w-full" />
        
              <label>Tone</label>
              <textarea name="Description" class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded p-2 mt-2 mb-3" style="height: 120px;" required
                        placeholder="Tone"
                        title="Tone"></textarea>
        
                      <div class="mr-4 w-1/5 text-left">
                        <label>Select Category</label>
                        <input name="Category" list="InputToneCategory" class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded mb-3 mt-2 p-2 w-full" />
                        <datalist id="InputToneCategory" class="mt-2 mb-3 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-900 rounded w-full">
                          ${this.ToneCategories?.map(e=>`
                            <option value="${e.Label}" >
                              </option> 
                          `).join("")}
                        </datalist >
                      </div>


                      <div class=" px-4 py-3 text-right">
                
                  <button type="button" class="bg-gray-600 hover:bg-gray-400 mr-2 px-4 py-2 mt-2 rounded text-white"
                          onclick="IN_BOUND.hideModal('newToneModal')"> Cancel
                  </button>
                  <button type="submit" class="bg-orange-500 hover:bg-orange-500/10 mr-2 px-4 py-2 mt-2 rounded text-white">Save
                  </button>
                </div>

          </div>
        </form>
        </div>
          <div>
        </div>
          </div>
        </div>
        
      </div>
    `,e.style="display: block;",e.querySelector("#InputToneCategory").addEventListener("change",this.changeInputToneCategory.bind(this)),document.addEventListener("keydown",e=>{"Escape"===e.key&&this.hideModal("newToneModal")})},async saveNewTone(e){e.preventDefault(),this.hideModal("newToneModal");const t={};var r,a;for([r,a]of new FormData(e.target))t[r]=a;e=this.ToneCategories.filter(e=>e.Label===t.Category)[0];t.CategoryID=e.ID,t.Category=e.Label,this.showNotification(s.SUCCESS,"Sync.."),await this.Client.saveNewTone(t),this.refreshData(),this.showNotification(s.SUCCESS,"Tone was added!")},changeInputToneCategory(e){this.InputToneCategorySelected=e.target.value},insertLanguageToneWritingStyleContinueActions(){this.tonesOrderLocal=JSON.parse(localStorage.getItem("tonesOrderLocal"))?.index||[];const t=this.tonesOrderLocal;t.length<this.userTones.length&&this.userTones.filter(e=>!t.map(e=>e[0]).includes(e.ID)).map(e=>{t.push([e.ID,t.length])});var e=[];for(const[n,l]of t){var r=this.userTones.find(e=>e.ID===n);r&&(e[l]=r)}var a,o=e.filter(e=>void 0!==e);let i=document.createElement("div");i.id="language-select-wrapper",i.className=g("languageSelectWrapper"),this.Languages&&(a=document.querySelector("form textarea"))&&(document.querySelector(".w-full.h-32.md\\:h-48.flex-shrink-0"),a.form.parentElement,a=a.parentElement)&&(a.classList.add("pr-4"),a.querySelector("#"+i.id)?i=a.querySelector("#"+i.id):a.prepend(i),i.innerHTML=`
    <div class="flex w-full justify-between">
     ${this.features.languages?.allow?`<div>
        <select id="languageSelect" class="${g("select")} pr-10">
          <option value ${this.TargetLanguage?"":" selected"}>Default language</option>  

          ${this.Languages.map(e=>`
            <option value="${e.languageEnglish}" ${this.TargetLanguage===e.languageEnglish?" selected":""}>
              ${e.languageLabel}
              </option> 
          `).join("")}
        </select>
      </div>`:""}
      

      ${this.features.writing_styles?.allow?`<div class="ml-2">
        <select id="writingStyleSelect" class="${g("select")} pr-10">
          <option value ${this.WritingStyle?"":" selected"}>Default style</option>

          ${this.WritingStyles.map(e=>`
            <option value="${e.ID}" ${this.WritingStyle===e.ID?" selected":""}>
              ${this.WritingStyle===e.ID?e.Label+" style":e.Label}
              </option> 
          `).join("")}
        </select>
      </div>`:""}

      ${""}

      ${this.features.variations.allow?`<div class="ml-2">
        <select id="toneSelect" class="${g("select")} pr-10">

        <option value="" selected > No Variation</option>

          ${o.filter(e=>!IN_BOUND.hiddenVariations.includes(e.ID)).map(e=>`
            <option value="${e.ID}" ${this.Tone===e.ID?" selected":""}>
              ${this.Tone===e.ID?e.Label+" variation":e.Label}
              </option> 
          `).join("")}
        </select>
      </div>`:""}

    </div>

    <div class="inline-flex invisible" role="group" id="continueActionsGroup">
      <button id="continueWritingButton" title="Continue writing please" class="${g("continueButton")}" onclick="event.stopPropagation(); IN_BOUND.continueWriting()" type="button">
        Continue
      </button>

      <select id="continueActionSelect" class="${g("continueActionSelect")}">
        <option value selected disabled>-- Select an action --</option>

        ${this.ContinueActions.map(e=>`
          <option value="${e.ID}">${e.Label}</option>
        `).join("")}
      </select>
    </div>
  `,i?.querySelector("#languageSelect")?.addEventListener("change",this.changeTargetLanguage.bind(this)),i?.querySelector("#toneSelect")?.addEventListener("change",this.changeTone.bind(this)),i.querySelector("#variationButton")?.addEventListener("click",function(){i.querySelector("#variationButtonContent")?.classList.toggle("hidden")}),i?.querySelector("#writingStyleSelect")?.addEventListener("change",this.changeWritingStyle.bind(this)),i?.querySelector("#continueActionSelect")?.addEventListener("change",this.changeContinueAction.bind(this)))},hideLanguageToneWritingStyleContinueActions(){},changeTargetLanguage(e){this.TargetLanguage=e.target.value,localStorage.setItem(wr,this.TargetLanguage)},changeTone(e){e=e.target.value;this.Tone=e},changeToneCategory(e){e=e.target.value,this.ToneCategorySelected=e,e=this.companyTonesState?[...this.DefaultTones,...this.userTones]:this.userTones;this.Tones=e.filter(e=>e.CategoryID===this.ToneCategorySelected),this.Tones.sort((e,t)=>e.Label.localeCompare(t.Label)),this.insertLanguageToneWritingStyleContinueActions()},changeWritingStyle(e){this.WritingStyle=e.target.value,this.insertLanguageToneWritingStyleContinueActions()},changeContinueAction(e){const t=e.target.value;e=this.ContinueActions.find(e=>e.ID===t);e&&this.submitContinueActionPrompt(e.Prompt)},continueWriting(){this.submitContinueActionPrompt("Continue writing please")},submitContinueActionPrompt(e=""){var t=document.querySelector("form textarea");t.value.trim()&&"Continue writing please"!==t.value.trim()&&!confirm("Are you sure you want to continue? The current prompt text will be lost.")||(t.value=e,t.focus(),(e=t.nextElementSibling)&&e.tagName&&"button"===e.tagName.toLowerCase()&&(e.click(),e=new KeyboardEvent("keydown",{bubbles:!0,cancelable:!0,keyCode:13}),t.dispatchEvent(e)))},hideContinueActionsButton(){var e=document.querySelector("#continueActionsGroup");e&&e.classList.add("invisible")},showContinueActionsButton(){var e=document.querySelector("#continueActionsGroup");e&&e.classList.remove("invisible")},prevPromptTemplatesPage(){this.PromptTemplateSection.currentPage--,this.PromptTemplateSection.currentPage=Math.max(0,this.PromptTemplateSection.currentPage),this.insertPromptTemplatesSection()},nextPromptTemplatesPage(){var e=this.PromptTemplatesType===h.OWN?this.OwnPrompts:this.DefaultPromptTemplates;e&&Array.isArray(e)&&0!==(e=this.filterPromptTemplates(e)).length&&(this.PromptTemplateSection.currentPage++,this.PromptTemplateSection.currentPage=Math.min(Math.floor((e.length-1)/this.PromptTemplateSection.pageSize),this.PromptTemplateSection.currentPage),this.insertPromptTemplatesSection())},exportCurrentChat(){let e=[...document.querySelector(".flex.flex-col.items-center").children].map(e=>{e=e.querySelector(".whitespace-pre-wrap");return e?0===e.children.length?"**User:**\n"+e.innerText:"**ChatGPT:**\n"+[...e.firstChild.children].map(e=>"PRE"!==e.nodeName?""+e.innerHTML:`\`\`\`${e.getElementsByTagName("code")[0].classList[2].split("-")[1]}
${e.innerText.replace(/^Copy code/g,"").trim()}
\`\`\``).join("\n"):""});if(!(e=e.filter(e=>e)))return!1;let t="";try{t="\n```\n"+window.__NEXT_DATA__.props.pageProps.user.name+" on "+(new Date).toLocaleString()+"\n```\n\n---"}catch{console.error("Failed to get user name from window.__NEXT_DATA__.props.pageProps.user.name. Using default header instead.")}var r=new Blob([t+"\n\n\n"+e.join("\n\n---\n\n")],{type:"text/plain"}),a=document.createElement("a");a.href=URL.createObjectURL(r),a.download="IN_BOUND-export-chatgpt-thread_"+(new Date).toISOString()+".md",document.body.appendChild(a),a.click()},async editPromptTemplate(e){var t,e=(this.PromptTemplatesType===h.OWN?this.OwnPrompts:this.PromptTemplates)[e];(this.PromptTemplatesType===h.OWN||e.OwnPrompt||this.isAdminMode())&&(await this.showSavePromptModal(new CustomEvent(Cr),e.ID,e),(t=document.getElementById("savePromptForm")).elements.Prompt.value=e.Prompt,t.elements.Teaser.value=e.Teaser,t.elements.PromptHint.value=e.PromptHint,t.elements.Title.value=e.Title,t.elements.ID.value=e.ID,e.Tone&&(t.elements.Tone.value=e.Tone),t.elements.companyTonesState.checked=e.companyTonesState,e.PromptTypeNo===T.PUBLIC&&(t.elements.Public.checked=!0),t.elements.Tags.value=e.Tags)},async deletePromptTemplate(e){const t=(this.PromptTemplatesType===h.OWN?this.OwnPrompts:this.PromptTemplates)[e];if((this.PromptTemplatesType===h.OWN||t.OwnPrompt||this.isAdminMode())&&confirm(`Are you sure you want to delete prompt template "${t.Title}"?`)){try{this.showNotification(s.SUCCESS,"Sync.."),await this.Client.deletePrompt(t.ID,this.Company),this.refreshData(),this.OwnPrompts=this.OwnPrompts.filter(e=>e.ID!==t.ID),t.PromptTypeNo===T.PUBLIC&&(this.PromptTemplates=this.PromptTemplates.filter(e=>e.ID!==t.ID))}catch(e){return void this.showNotification(s.ERROR,"Something went wrong. Please try again.")}this.insertPromptTemplatesSection()}},async voteThumbsUp(e){this.showNotification(s.SUCCESS,"Sync..");try{await this.Client.voteForPrompt(e,1),this.refreshData()}catch(e){return void this.showNotification(s.ERROR,"Something went wrong. Please try again.")}this.showNotification(s.SUCCESS,"Prompt added to favorites!")},async likeForPrompt(e){this.showNotification(s.SUCCESS,"Sync..");try{await this.Client.likeForPrompt(e),this.refreshData()}catch(e){return void this.showNotification(s.ERROR,"Something went wrong. Please try again.")}this.showNotification(s.SUCCESS,"Thanks for your like!")},async voteThumbsDown(e){this.showNotification(s.SUCCESS,"Sync..");try{await this.Client.voteForPrompt(e,-1),this.refreshData()}catch(e){return void this.showNotification(s.ERROR,"Something went wrong. Please try again.")}this.showNotification(s.SUCCESS,"Prompt removed from favorites!")},async reportPrompt(e){e.preventDefault();e=new FormData(e.target);try{await this.Client.reportPrompt(e.get("PromptID"),+e.get("FeedbackTypeNo"),e.get("FeedbackText"),e.get("FeedbackContact"))}catch(e){return void this.showNotification(s.ERROR,"Something went wrong. Please try again.")}this.showNotification(s.SUCCESS,"Thanks for your feedback! We will review this prompt."),this.hideModal("reportPromptModal")},copyPromptDeepLink(e){const t=(this.PromptTemplatesType===h.OWN?this.OwnPrompts:this.PromptTemplates)[e];t&&(e=`https://chat.openai.com/chat?${br}=`+t.ID,navigator.clipboard.writeText(e).then(()=>{t.PromptTypeNo!==T.PUBLIC?this.showNotification(s.WARNING,"The link to the prompt template was copied to your clipboard.<br>This prompt is not shared as public. Only you can access it."):this.showNotification(s.SUCCESS,"The link to the prompt template was copied to your clipboard.")},()=>{this.showNotification(s.ERROR,"Something went wrong. Please try again.")}))},selectPromptTemplateByIndex(e){var t=this.PromptTemplatesType===h.OWN?this.OwnPrompts:this.PromptTemplates;t&&Array.isArray(t)&&(this.selectPromptTemplate(t[e]),this.hideContinueActionsButton(),setTimeout(function(){IN_BOUND.insertLanguageToneWritingStyleContinueActions()},300))},addToOwnPrompts(e){this.forkPrompt(e)},isObserverExist(e){for(const t of window.performance.getEntriesByType("layout-shift"))if(t.source&&t.source.node===e)return!0;return!1},selectPromptTemplate(t){var r=document.querySelector("textarea");if(r){var a=r.parentElement;let e=document.createElement("div");e.id="prompt-wrapper",a.querySelector("#prompt-wrapper")?e=a.querySelector("#prompt-wrapper"):r.parentNode.insertBefore(e,r);a=new URL(window.location.href);if(t){if(this.Tone=t?.Tone||this.Tone,this.companyTonesState=t.companyTonesState||!1,this.features.variables?.allow&&this.showVariablesModal(t),this.activePromptID=t.ID,e.innerHTML=`
        <span class="${g`tag`}" title="${u(t.Prompt)}">

        <span class="items-center">
          ${u(t.Title)}

          ${this.OwnPrompts.map(e=>e.ID).includes(t.ID)?"":`<span class="inline-flex items-center ml-2" >
              <a title="${x.plusOnTextarea}" class="px-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                onclick="IN_BOUND.addToOwnPrompts('${t.ID}')">${v("add-go")}</a> </span>`}
                </span>

              <span style="font-weight:normal;" class="text-xs font-thin ">
              ${x.textareaPlaceholderIdentifier}  ${u(t.PromptHint)}
              </span>

        </span>
        `,r.placeholder="Enter your prompt",-1<(this.SelectedPromptTemplate=t).Prompt.indexOf(C)&&(r.value=" ",r.nextElementSibling.disabled=!1),r.focus(),a.searchParams.get(br)===t.ID)return;a.searchParams.set(br,t.ID)}else{if(e.innerHTML="",this.SelectedPromptTemplate=null,!a.searchParams.get(br))return;a.searchParams.delete(br)}window.history.pushState({},"",a)}},CSVToArray(e,t){t=t||",";for(var r,a=new RegExp("(\\"+t+'|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\'+t+"\\r\\n]*))","gi"),o=[[]];r=a.exec(e);){var i=r[1],i=(i.length&&i!==t&&o.push([]),r[2]?r[2].replace(new RegExp('""',"g"),'"'):r[3]);o[o.length-1].push(i)}return o},getTopicLabel(t){var e=this.Topics.find(e=>e.ID===t);return e?e.Label:""},getActivityLabel(t){var e=this.Activities.find(e=>e.ID===t);return e?e.Label:""},isAdmin(){return this.Client.User.UserStatusNo===a.ADMIN},isAdminMode(){return this.isAdmin()&&this.AdminMode},toggleAdminMode(){this.isAdmin()&&(this.AdminMode=!this.AdminMode,this.insertPromptTemplatesSection())},canCreatePromptTemplate(){return this.canCreatePublicPromptTemplate()||this.canCreatePrivatePromptTemplate()||!0},canCreatePrivatePromptTemplate(){return this.isAdmin()||0<this.Client.User.MaxNewPrivatePromptsAllowed},canCreatePublicPromptTemplate(){return this.isAdmin()||0<this.Client.User.MaxNewPublicPromptsAllowed},cannotCreatePublicPromptTemplateError(){this.showNotification(s.WARNING,"Cannot Create Public Prompt Template",!1)},cannotCreatePrivatePromptTemplateError(){this.showNotification(s.WARNING,"Cannot Create Private Prompt Template",!1)},cannotCreatePromptTemplateError(){this.showNotification(s.WARNING,"Cannot Create Prompt Template",!1)}},"chat.openai.com"===window.location.hostname&&setTimeout(function(){window.IN_BOUND.init()},200)}();