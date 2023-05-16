(function () {
  'use strict';

  // Define global constants
  const PromptPlaceholder = '[PROMPT]';
  const TargetLanguagePlaceholder = '[TARGETLANGUAGE]';
  // Database global constants

  const EndpointConversation = 'https://chat.openai.com/backend-api/conversation';
  const AppSlogan = 'IN_BOUND';
  const ExportFilePrefix = 'IN_BOUND-export-chatgpt-thread_';
  const ExportHeaderPrefix =
    '\n```\n';
  // const APIEndpoint = 'https://mongo-inbound.iqbalnawaz.repl.co';
  const APIEndpoint = "https://api.workengine.ai/api";

  /** @enum {string} */
  const PromptTemplatesType = {
    PUBLIC: 'public',
    OWN: 'own',
  };

  /** @enum {string} */
  const NotificationSeverity = {
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error',
  };

  /** @enum {number} */
  const PromptTypeNo = {
    UNKNOWN: 0,
    PRIVATE: 1,
    PUBLIC: 2,
    PAID: 3,
  };

  /** @enum {number} */
  const FeedbackTypeNo = {
    UNKNOWN: 0,
    GENERIC_CONCERN: 1,
    GENERIC_LEGAL_CONCERN: 2,
    LEGAL_COPYRIGHT: 10,
    LEGAL_DMCA: 11,
    LEGAL_TRADEMARK: 12,
    PERSONAL_INFO: 20,
    ABUSIVE: 21,
    ILLEGAL: 22,
    NOT_MULTILINGUAL: 51,
    NOT_GENERIC: 52,
    SPAM: 91,
    PROMPT_SUPPORT_FREE: 101,
    PROMPT_SUPPORT_PAID: 102,
    PROMPT_SUPPORT_WANT_PAID: 103,
  };

  /** @enum {number} */
  const VoteTypeNo = {
    UNKNOWN: 0,
    PROMPT_TEASER_THUMBS: 1,
    RESULT_THUMBS: 2,
    FOLLOW_UP_THUMBS: 4,
    MESSAGE_CONFIRM: 8,
    MESSAGE_LIKE: 16,
    MESSAGE_DISLIKE: 32,
  };

  /** @enum {number} */
  const SortModeNo = {
    //UNKNOWN: 0, // not used & not displayed in the "Sort by" dropdown
    TOP_VIEWS: 1,
    TOP_VOTES: 2,
    LATEST_UPDATES: 4,
  };

  /** @enum {number} */
  const MessageStatusNo = {
    UNKNOWN: 0,
    DELETE_MARK: 20,
    DELETE_DONE: 29,
    INACTIVE: 99,
    ACTIVE: 100,
  };

  /** @enum {number} */
  const MessageSeverityNo = {
    UNKNOWN: 0,
    INFO: 1,
    SUCCESS: 2,
    UPDATE: 4,
    MANDATORY_MUST_CONFIRM: 8,
  };

  /** @enum {number} */
  const MessageVoteTypeNo = {
    UNKNOWN: VoteTypeNo.UNKNOWN,
    MESSAGE_LIKE: VoteTypeNo.MESSAGE_LIKE,
    MESSAGE_DISLIKE: VoteTypeNo.MESSAGE_DISLIKE,
  };

  /** @enum {number} */
  const UserStatusNo = {
    UNKNOWN: 0,
    NORMAL: 1,
    ADMIN: 2,
    BLACKLIST_BAN: 4,
    BLACKLIST_NO_WRITE: 8,
    BLACKLIST_NO_PUBLIC: 16,
  };

  /**
   * FingerprintJS v3.4.0 - Copyright (c) FingerprintJS, Inc, 2023 (https://fingerprint.com)
   * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
   *
   * This software contains code from open-source projects:
   * MurmurHash3 by Karan Lyons (https://github.com/karanlyons/murmurHash3.js)
   */
  var e=function(){return e=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var o in n=arguments[t])Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o]);return e},e.apply(this,arguments)};function n(e,n,t,r){return new(t||(t=Promise))((function(o,a){function i(e){try{u(r.next(e));}catch(n){a(n);}}function c(e){try{u(r.throw(e));}catch(n){a(n);}}function u(e){var n;e.done?o(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n);}))).then(i,c);}u((r=r.apply(e,n||[])).next());}))}function t(e,n){var t,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function c(c){return function(u){return function(c){if(t)throw new TypeError("Generator is already executing.");for(;a&&(a=0,c[0]&&(i=0)),i;)try{if(t=1,r&&(o=2&c[0]?r.return:c[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,c[1])).done)return o;switch(r=0,o&&(c=[2&c[0],o.value]),c[0]){case 0:case 1:o=c;break;case 4:return i.label++,{value:c[1],done:!1};case 5:i.label++,r=c[1],c=[0];continue;case 7:c=i.ops.pop(),i.trys.pop();continue;default:if(!(o=i.trys,(o=o.length>0&&o[o.length-1])||6!==c[0]&&2!==c[0])){i=0;continue}if(3===c[0]&&(!o||c[1]>o[0]&&c[1]<o[3])){i.label=c[1];break}if(6===c[0]&&i.label<o[1]){i.label=o[1],o=c;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(c);break}o[2]&&i.ops.pop(),i.trys.pop();continue}c=n.call(e,i);}catch(u){c=[6,u],r=0;}finally{t=o=0;}if(5&c[0])throw c[1];return {value:c[0]?c[1]:void 0,done:!0}}([c,u])}}}function r(e,n,t){if(t||2===arguments.length)for(var r,o=0,a=n.length;o<a;o++)!r&&o in n||(r||(r=Array.prototype.slice.call(n,0,o)),r[o]=n[o]);return e.concat(r||Array.prototype.slice.call(n))}function o(e,n){return new Promise((function(t){return setTimeout(t,e,n)}))}function a(e){return !!e&&"function"==typeof e.then}function i(e,n){try{var t=e();a(t)?t.then((function(e){return n(!0,e)}),(function(e){return n(!1,e)})):n(!0,t);}catch(r){n(!1,r);}}function c(e,r,a){return void 0===a&&(a=16),n(this,void 0,void 0,(function(){var n,i,c;return t(this,(function(t){switch(t.label){case 0:n=Date.now(),i=0,t.label=1;case 1:return i<e.length?(r(e[i],i),(c=Date.now())>=n+a?(n=c,[4,o(0)]):[3,3]):[3,4];case 2:t.sent(),t.label=3;case 3:return ++i,[3,1];case 4:return [2]}}))}))}function u(e){e.then(void 0,(function(){}));}function l(e,n){e=[e[0]>>>16,65535&e[0],e[1]>>>16,65535&e[1]],n=[n[0]>>>16,65535&n[0],n[1]>>>16,65535&n[1]];var t=[0,0,0,0];return t[3]+=e[3]+n[3],t[2]+=t[3]>>>16,t[3]&=65535,t[2]+=e[2]+n[2],t[1]+=t[2]>>>16,t[2]&=65535,t[1]+=e[1]+n[1],t[0]+=t[1]>>>16,t[1]&=65535,t[0]+=e[0]+n[0],t[0]&=65535,[t[0]<<16|t[1],t[2]<<16|t[3]]}function s(e,n){e=[e[0]>>>16,65535&e[0],e[1]>>>16,65535&e[1]],n=[n[0]>>>16,65535&n[0],n[1]>>>16,65535&n[1]];var t=[0,0,0,0];return t[3]+=e[3]*n[3],t[2]+=t[3]>>>16,t[3]&=65535,t[2]+=e[2]*n[3],t[1]+=t[2]>>>16,t[2]&=65535,t[2]+=e[3]*n[2],t[1]+=t[2]>>>16,t[2]&=65535,t[1]+=e[1]*n[3],t[0]+=t[1]>>>16,t[1]&=65535,t[1]+=e[2]*n[2],t[0]+=t[1]>>>16,t[1]&=65535,t[1]+=e[3]*n[1],t[0]+=t[1]>>>16,t[1]&=65535,t[0]+=e[0]*n[3]+e[1]*n[2]+e[2]*n[1]+e[3]*n[0],t[0]&=65535,[t[0]<<16|t[1],t[2]<<16|t[3]]}function d(e,n){return 32===(n%=64)?[e[1],e[0]]:n<32?[e[0]<<n|e[1]>>>32-n,e[1]<<n|e[0]>>>32-n]:(n-=32,[e[1]<<n|e[0]>>>32-n,e[0]<<n|e[1]>>>32-n])}function m(e,n){return 0===(n%=64)?e:n<32?[e[0]<<n|e[1]>>>32-n,e[1]<<n]:[e[1]<<n-32,0]}function f(e,n){return [e[0]^n[0],e[1]^n[1]]}function v(e){return e=f(e,[0,e[0]>>>1]),e=f(e=s(e,[4283543511,3981806797]),[0,e[0]>>>1]),e=f(e=s(e,[3301882366,444984403]),[0,e[0]>>>1])}function h(e,n){n=n||0;var t,r=(e=e||"").length%16,o=e.length-r,a=[0,n],i=[0,n],c=[0,0],u=[0,0],h=[2277735313,289559509],b=[1291169091,658871167];for(t=0;t<o;t+=16)c=[255&e.charCodeAt(t+4)|(255&e.charCodeAt(t+5))<<8|(255&e.charCodeAt(t+6))<<16|(255&e.charCodeAt(t+7))<<24,255&e.charCodeAt(t)|(255&e.charCodeAt(t+1))<<8|(255&e.charCodeAt(t+2))<<16|(255&e.charCodeAt(t+3))<<24],u=[255&e.charCodeAt(t+12)|(255&e.charCodeAt(t+13))<<8|(255&e.charCodeAt(t+14))<<16|(255&e.charCodeAt(t+15))<<24,255&e.charCodeAt(t+8)|(255&e.charCodeAt(t+9))<<8|(255&e.charCodeAt(t+10))<<16|(255&e.charCodeAt(t+11))<<24],c=d(c=s(c,h),31),a=l(a=d(a=f(a,c=s(c,b)),27),i),a=l(s(a,[0,5]),[0,1390208809]),u=d(u=s(u,b),33),i=l(i=d(i=f(i,u=s(u,h)),31),a),i=l(s(i,[0,5]),[0,944331445]);switch(c=[0,0],u=[0,0],r){case 15:u=f(u,m([0,e.charCodeAt(t+14)],48));case 14:u=f(u,m([0,e.charCodeAt(t+13)],40));case 13:u=f(u,m([0,e.charCodeAt(t+12)],32));case 12:u=f(u,m([0,e.charCodeAt(t+11)],24));case 11:u=f(u,m([0,e.charCodeAt(t+10)],16));case 10:u=f(u,m([0,e.charCodeAt(t+9)],8));case 9:u=s(u=f(u,[0,e.charCodeAt(t+8)]),b),i=f(i,u=s(u=d(u,33),h));case 8:c=f(c,m([0,e.charCodeAt(t+7)],56));case 7:c=f(c,m([0,e.charCodeAt(t+6)],48));case 6:c=f(c,m([0,e.charCodeAt(t+5)],40));case 5:c=f(c,m([0,e.charCodeAt(t+4)],32));case 4:c=f(c,m([0,e.charCodeAt(t+3)],24));case 3:c=f(c,m([0,e.charCodeAt(t+2)],16));case 2:c=f(c,m([0,e.charCodeAt(t+1)],8));case 1:c=s(c=f(c,[0,e.charCodeAt(t)]),h),a=f(a,c=s(c=d(c,31),b));}return a=l(a=f(a,[0,e.length]),i=f(i,[0,e.length])),i=l(i,a),a=l(a=v(a),i=v(i)),i=l(i,a),("00000000"+(a[0]>>>0).toString(16)).slice(-8)+("00000000"+(a[1]>>>0).toString(16)).slice(-8)+("00000000"+(i[0]>>>0).toString(16)).slice(-8)+("00000000"+(i[1]>>>0).toString(16)).slice(-8)}function b(e){return parseInt(e)}function p(e){return parseFloat(e)}function y(e,n){return "number"==typeof e&&isNaN(e)?n:e}function g(e){return e.reduce((function(e,n){return e+(n?1:0)}),0)}function w(e,n){if(void 0===n&&(n=1),Math.abs(n)>=1)return Math.round(e/n)*n;var t=1/n;return Math.round(e*t)/t}function L(e){return e&&"object"==typeof e&&"message"in e?e:{message:e}}function k(e){return "function"!=typeof e}function V(e,r,a){var l=Object.keys(e).filter((function(e){return !function(e,n){for(var t=0,r=e.length;t<r;++t)if(e[t]===n)return !0;return !1}(a,e)})),s=Array(l.length);return c(l,(function(n,t){s[t]=function(e,n){var t=new Promise((function(t){var r=Date.now();i(e.bind(null,n),(function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];var o=Date.now()-r;if(!e[0])return t((function(){return {error:L(e[1]),duration:o}}));var a=e[1];if(k(a))return t((function(){return {value:a,duration:o}}));t((function(){return new Promise((function(e){var n=Date.now();i(a,(function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];var a=o+Date.now()-n;if(!t[0])return e({error:L(t[1]),duration:a});e({value:t[1],duration:a});}));}))}));}));}));return u(t),function(){return t.then((function(e){return e()}))}}(e[n],r);})),function(){return n(this,void 0,void 0,(function(){var e,n,r,a,i,d;return t(this,(function(m){switch(m.label){case 0:for(e={},n=0,r=l;n<r.length;n++)a=r[n],e[a]=void 0;i=Array(l.length),d=function(){var n;return t(this,(function(t){switch(t.label){case 0:return n=!0,[4,c(l,(function(t,r){if(!i[r])if(s[r]){var o=s[r]().then((function(n){return e[t]=n}));u(o),i[r]=o;}else n=!1;}))];case 1:return t.sent(),n?[2,"break"]:[4,o(1)];case 2:return t.sent(),[2]}}))},m.label=1;case 1:return [5,d()];case 2:if("break"===m.sent())return [3,4];m.label=3;case 3:return [3,1];case 4:return [4,Promise.all(i)];case 5:return m.sent(),[2,e]}}))}))}}function Z(){var e=window,n=navigator;return g(["MSCSSMatrix"in e,"msSetImmediate"in e,"msIndexedDB"in e,"msMaxTouchPoints"in n,"msPointerEnabled"in n])>=4}function S(){var e=window,n=navigator;return g(["msWriteProfilerMark"in e,"MSStream"in e,"msLaunchUri"in n,"msSaveBlob"in n])>=3&&!Z()}function X(){var e=window,n=navigator;return g(["webkitPersistentStorage"in n,"webkitTemporaryStorage"in n,0===n.vendor.indexOf("Google"),"webkitResolveLocalFileSystemURL"in e,"BatteryManager"in e,"webkitMediaStream"in e,"webkitSpeechGrammar"in e])>=5}function x(){var e=window,n=navigator;return g(["ApplePayError"in e,"CSSPrimitiveValue"in e,"Counter"in e,0===n.vendor.indexOf("Apple"),"getStorageUpdates"in n,"WebKitMediaKeys"in e])>=4}function F(){var e=window;return g(["safari"in e,!("DeviceMotionEvent"in e),!("ongestureend"in e),!("standalone"in navigator)])>=3}function Y(){var e,n,t=window;return g(["buildID"in navigator,"MozAppearance"in(null!==(n=null===(e=document.documentElement)||void 0===e?void 0:e.style)&&void 0!==n?n:{}),"onmozfullscreenchange"in t,"mozInnerScreenX"in t,"CSSMozDocumentRule"in t,"CanvasCaptureMediaStream"in t])>=4}function C(){var e=document;return e.fullscreenElement||e.msFullscreenElement||e.mozFullScreenElement||e.webkitFullscreenElement||null}function R(){var e=X(),n=Y();if(!e&&!n)return !1;var t=window;return g(["onorientationchange"in t,"orientation"in t,e&&!("SharedWorker"in t),n&&/android/i.test(navigator.appVersion)])>=2}function G(e){var n=new Error(e);return n.name=e,n}function M(e,r,a){var i,c,u;return void 0===a&&(a=50),n(this,void 0,void 0,(function(){var n,l;return t(this,(function(t){switch(t.label){case 0:n=document,t.label=1;case 1:return n.body?[3,3]:[4,o(a)];case 2:return t.sent(),[3,1];case 3:l=n.createElement("iframe"),t.label=4;case 4:return t.trys.push([4,,10,11]),[4,new Promise((function(e,t){var o=!1,a=function(){o=!0,e();};l.onload=a,l.onerror=function(e){o=!0,t(e);};var i=l.style;i.setProperty("display","block","important"),i.position="absolute",i.top="0",i.left="0",i.visibility="hidden",r&&"srcdoc"in l?l.srcdoc=r:l.src="about:blank",n.body.appendChild(l);var c=function(){var e,n;o||("complete"===(null===(n=null===(e=l.contentWindow)||void 0===e?void 0:e.document)||void 0===n?void 0:n.readyState)?a():setTimeout(c,10));};c();}))];case 5:t.sent(),t.label=6;case 6:return (null===(c=null===(i=l.contentWindow)||void 0===i?void 0:i.document)||void 0===c?void 0:c.body)?[3,8]:[4,o(a)];case 7:return t.sent(),[3,6];case 8:return [4,e(l,l.contentWindow)];case 9:return [2,t.sent()];case 10:return null===(u=l.parentNode)||void 0===u||u.removeChild(l),[7];case 11:return [2]}}))}))}function I(e){for(var n=function(e){for(var n,t,r="Unexpected syntax '".concat(e,"'"),o=/^\s*([a-z-]*)(.*)$/i.exec(e),a=o[1]||void 0,i={},c=/([.:#][\w-]+|\[.+?\])/gi,u=function(e,n){i[e]=i[e]||[],i[e].push(n);};;){var l=c.exec(o[2]);if(!l)break;var s=l[0];switch(s[0]){case".":u("class",s.slice(1));break;case"#":u("id",s.slice(1));break;case"[":var d=/^\[([\w-]+)([~|^$*]?=("(.*?)"|([\w-]+)))?(\s+[is])?\]$/.exec(s);if(!d)throw new Error(r);u(d[1],null!==(t=null!==(n=d[4])&&void 0!==n?n:d[5])&&void 0!==t?t:"");break;default:throw new Error(r)}}return [a,i]}(e),t=n[0],r=n[1],o=document.createElement(null!=t?t:"div"),a=0,i=Object.keys(r);a<i.length;a++){var c=i[a],u=r[c].join(" ");"style"===c?j(o.style,u):o.setAttribute(c,u);}return o}function j(e,n){for(var t=0,r=n.split(";");t<r.length;t++){var o=r[t],a=/^\s*([\w-]+)\s*:\s*(.+?)(\s*!([\w-]+))?\s*$/.exec(o);if(a){var i=a[1],c=a[2],u=a[4];e.setProperty(i,c,u||"");}}}var A=["monospace","sans-serif","serif"],J=["sans-serif-thin","ARNO PRO","Agency FB","Arabic Typesetting","Arial Unicode MS","AvantGarde Bk BT","BankGothic Md BT","Batang","Bitstream Vera Sans Mono","Calibri","Century","Century Gothic","Clarendon","EUROSTILE","Franklin Gothic","Futura Bk BT","Futura Md BT","GOTHAM","Gill Sans","HELV","Haettenschweiler","Helvetica Neue","Humanst521 BT","Leelawadee","Letter Gothic","Levenim MT","Lucida Bright","Lucida Sans","Menlo","MS Mincho","MS Outlook","MS Reference Specialty","MS UI Gothic","MT Extra","MYRIAD PRO","Marlett","Meiryo UI","Microsoft Uighur","Minion Pro","Monotype Corsiva","PMingLiU","Pristina","SCRIPTINA","Segoe UI Light","Serifa","SimHei","Small Fonts","Staccato222 BT","TRAJAN PRO","Univers CE 55 Medium","Vrinda","ZWAdobeF"];function H(e){return e.toDataURL()}var N,P;function z(){var e=this;return function(){if(void 0===P){var e=function(){var n=D();E(n)?P=setTimeout(e,2500):(N=n,P=void 0);};e();}}(),function(){return n(e,void 0,void 0,(function(){var e;return t(this,(function(n){switch(n.label){case 0:return E(e=D())?N?[2,r([],N,!0)]:C()?[4,(t=document,(t.exitFullscreen||t.msExitFullscreen||t.mozCancelFullScreen||t.webkitExitFullscreen).call(t))]:[3,2]:[3,2];case 1:n.sent(),e=D(),n.label=2;case 2:return E(e)||(N=e),[2,e]}var t;}))}))}}function D(){var e=screen;return [y(p(e.availTop),null),y(p(e.width)-p(e.availWidth)-y(p(e.availLeft),0),null),y(p(e.height)-p(e.availHeight)-y(p(e.availTop),0),null),y(p(e.availLeft),null)]}function E(e){for(var n=0;n<4;++n)if(e[n])return !1;return !0}function B(e){var r;return n(this,void 0,void 0,(function(){var n,a,i,c,u,l,s;return t(this,(function(t){switch(t.label){case 0:for(n=document,a=n.createElement("div"),i=new Array(e.length),c={},T(a),s=0;s<e.length;++s)u=I(e[s]),T(l=n.createElement("div")),l.appendChild(u),a.appendChild(l),i[s]=u;t.label=1;case 1:return n.body?[3,3]:[4,o(50)];case 2:return t.sent(),[3,1];case 3:n.body.appendChild(a);try{for(s=0;s<e.length;++s)i[s].offsetParent||(c[e[s]]=!0);}finally{null===(r=a.parentNode)||void 0===r||r.removeChild(a);}return [2,c]}}))}))}function T(e){e.style.setProperty("display","block","important");}function O(e){return matchMedia("(inverted-colors: ".concat(e,")")).matches}function _(e){return matchMedia("(forced-colors: ".concat(e,")")).matches}function Q(e){return matchMedia("(prefers-contrast: ".concat(e,")")).matches}function U(e){return matchMedia("(prefers-reduced-motion: ".concat(e,")")).matches}function K(e){return matchMedia("(dynamic-range: ".concat(e,")")).matches}var q=Math,$=function(){return 0};var ee={default:[],apple:[{font:"-apple-system-body"}],serif:[{fontFamily:"serif"}],sans:[{fontFamily:"sans-serif"}],mono:[{fontFamily:"monospace"}],min:[{fontSize:"1px"}],system:[{fontFamily:"system-ui"}]};var ne={fonts:function(){return M((function(e,n){var t=n.document,r=t.body;r.style.fontSize="48px";var o=t.createElement("div"),a={},i={},c=function(e){var n=t.createElement("span"),r=n.style;return r.position="absolute",r.top="0",r.left="0",r.fontFamily=e,n.textContent="mmMwWLliI0O&1",o.appendChild(n),n},u=A.map(c),l=function(){for(var e={},n=function(n){e[n]=A.map((function(e){return function(e,n){return c("'".concat(e,"',").concat(n))}(n,e)}));},t=0,r=J;t<r.length;t++){n(r[t]);}return e}();r.appendChild(o);for(var s=0;s<A.length;s++)a[A[s]]=u[s].offsetWidth,i[A[s]]=u[s].offsetHeight;return J.filter((function(e){return n=l[e],A.some((function(e,t){return n[t].offsetWidth!==a[e]||n[t].offsetHeight!==i[e]}));var n;}))}))},domBlockers:function(e){var r=(void 0===e?{}:e).debug;return n(this,void 0,void 0,(function(){var e,n,o,a,i;return t(this,(function(t){switch(t.label){case 0:return x()||R()?(c=atob,e={abpIndo:["#Iklan-Melayang","#Kolom-Iklan-728","#SidebarIklan-wrapper",c("YVt0aXRsZT0iN25hZ2EgcG9rZXIiIGld"),'[title="ALIENBOLA" i]'],abpvn:["#quangcaomb",c("Lmlvc0Fkc2lvc0Fkcy1sYXlvdXQ="),".quangcao",c("W2hyZWZePSJodHRwczovL3I4OC52bi8iXQ=="),c("W2hyZWZePSJodHRwczovL3piZXQudm4vIl0=")],adBlockFinland:[".mainostila",c("LnNwb25zb3JpdA=="),".ylamainos",c("YVtocmVmKj0iL2NsaWNrdGhyZ2guYXNwPyJd"),c("YVtocmVmXj0iaHR0cHM6Ly9hcHAucmVhZHBlYWsuY29tL2FkcyJd")],adBlockPersian:["#navbar_notice_50",".kadr",'TABLE[width="140px"]',"#divAgahi",c("I2FkMl9pbmxpbmU=")],adBlockWarningRemoval:["#adblock-honeypot",".adblocker-root",".wp_adblock_detect",c("LmhlYWRlci1ibG9ja2VkLWFk"),c("I2FkX2Jsb2NrZXI=")],adGuardAnnoyances:['amp-embed[type="zen"]',".hs-sosyal","#cookieconsentdiv",'div[class^="app_gdpr"]',".as-oil"],adGuardBase:[".BetterJsPopOverlay",c("I2FkXzMwMFgyNTA="),c("I2Jhbm5lcmZsb2F0MjI="),c("I2FkLWJhbm5lcg=="),c("I2NhbXBhaWduLWJhbm5lcg==")],adGuardChinese:[c("LlppX2FkX2FfSA=="),c("YVtocmVmKj0iL29kMDA1LmNvbSJd"),c("YVtocmVmKj0iLmh0aGJldDM0LmNvbSJd"),".qq_nr_lad","#widget-quan"],adGuardFrench:[c("I2Jsb2NrLXZpZXdzLWFkcy1zaWRlYmFyLWJsb2NrLWJsb2Nr"),"#pavePub",c("LmFkLWRlc2t0b3AtcmVjdGFuZ2xl"),".mobile_adhesion",".widgetadv"],adGuardGerman:[c("LmJhbm5lcml0ZW13ZXJidW5nX2hlYWRfMQ=="),c("LmJveHN0YXJ0d2VyYnVuZw=="),c("LndlcmJ1bmcz"),c("YVtocmVmXj0iaHR0cDovL3d3dy5laXMuZGUvaW5kZXgucGh0bWw/cmVmaWQ9Il0="),c("YVtocmVmXj0iaHR0cHM6Ly93d3cudGlwaWNvLmNvbS8/YWZmaWxpYXRlSWQ9Il0=")],adGuardJapanese:["#kauli_yad_1",c("YVtocmVmXj0iaHR0cDovL2FkMi50cmFmZmljZ2F0ZS5uZXQvIl0="),c("Ll9wb3BJbl9pbmZpbml0ZV9hZA=="),c("LmFkZ29vZ2xl"),c("LmFkX3JlZ3VsYXIz")],adGuardMobile:[c("YW1wLWF1dG8tYWRz"),c("LmFtcF9hZA=="),'amp-embed[type="24smi"]',"#mgid_iframe1",c("I2FkX2ludmlld19hcmVh")],adGuardRussian:[c("YVtocmVmXj0iaHR0cHM6Ly9hZC5sZXRtZWFkcy5jb20vIl0="),c("LnJlY2xhbWE="),'div[id^="smi2adblock"]',c("ZGl2W2lkXj0iQWRGb3hfYmFubmVyXyJd"),c("I2FkX3NxdWFyZQ==")],adGuardSocial:[c("YVtocmVmXj0iLy93d3cuc3R1bWJsZXVwb24uY29tL3N1Ym1pdD91cmw9Il0="),c("YVtocmVmXj0iLy90ZWxlZ3JhbS5tZS9zaGFyZS91cmw/Il0="),".etsy-tweet","#inlineShare",".popup-social"],adGuardSpanishPortuguese:["#barraPublicidade","#Publicidade","#publiEspecial","#queTooltip",c("W2hyZWZePSJodHRwOi8vYWRzLmdsaXNwYS5jb20vIl0=")],adGuardTrackingProtection:["#qoo-counter",c("YVtocmVmXj0iaHR0cDovL2NsaWNrLmhvdGxvZy5ydS8iXQ=="),c("YVtocmVmXj0iaHR0cDovL2hpdGNvdW50ZXIucnUvdG9wL3N0YXQucGhwIl0="),c("YVtocmVmXj0iaHR0cDovL3RvcC5tYWlsLnJ1L2p1bXAiXQ=="),"#top100counter"],adGuardTurkish:["#backkapat",c("I3Jla2xhbWk="),c("YVtocmVmXj0iaHR0cDovL2Fkc2Vydi5vbnRlay5jb20udHIvIl0="),c("YVtocmVmXj0iaHR0cDovL2l6bGVuemkuY29tL2NhbXBhaWduLyJd"),c("YVtocmVmXj0iaHR0cDovL3d3dy5pbnN0YWxsYWRzLm5ldC8iXQ==")],bulgarian:[c("dGQjZnJlZW5ldF90YWJsZV9hZHM="),"#ea_intext_div",".lapni-pop-over","#xenium_hot_offers",c("I25ld0Fk")],easyList:[c("I0FEX0NPTlRST0xfMjg="),c("LnNlY29uZC1wb3N0LWFkcy13cmFwcGVy"),".universalboxADVBOX03",c("LmFkdmVydGlzZW1lbnQtNzI4eDkw"),c("LnNxdWFyZV9hZHM=")],easyListChina:[c("YVtocmVmKj0iLndlbnNpeHVldGFuZy5jb20vIl0="),c("LmFwcGd1aWRlLXdyYXBbb25jbGljayo9ImJjZWJvcy5jb20iXQ=="),c("LmZyb250cGFnZUFkdk0="),"#taotaole","#aafoot.top_box"],easyListCookie:["#AdaCompliance.app-notice",".text-center.rgpd",".panel--cookie",".js-cookies-andromeda",".elxtr-consent"],easyListCzechSlovak:["#onlajny-stickers",c("I3Jla2xhbW5pLWJveA=="),c("LnJla2xhbWEtbWVnYWJvYXJk"),".sklik",c("W2lkXj0ic2tsaWtSZWtsYW1hIl0=")],easyListDutch:[c("I2FkdmVydGVudGll"),c("I3ZpcEFkbWFya3RCYW5uZXJCbG9jaw=="),".adstekst",c("YVtocmVmXj0iaHR0cHM6Ly94bHR1YmUubmwvY2xpY2svIl0="),"#semilo-lrectangle"],easyListGermany:[c("I0FkX1dpbjJkYXk="),c("I3dlcmJ1bmdzYm94MzAw"),c("YVtocmVmXj0iaHR0cDovL3d3dy5yb3RsaWNodGthcnRlaS5jb20vP3NjPSJd"),c("I3dlcmJ1bmdfd2lkZXNreXNjcmFwZXJfc2NyZWVu"),c("YVtocmVmXj0iaHR0cDovL2xhbmRpbmcucGFya3BsYXR6a2FydGVpLmNvbS8/YWc9Il0=")],easyListItaly:[c("LmJveF9hZHZfYW5udW5jaQ=="),".sb-box-pubbliredazionale",c("YVtocmVmXj0iaHR0cDovL2FmZmlsaWF6aW9uaWFkcy5zbmFpLml0LyJd"),c("YVtocmVmXj0iaHR0cHM6Ly9hZHNlcnZlci5odG1sLml0LyJd"),c("YVtocmVmXj0iaHR0cHM6Ly9hZmZpbGlhemlvbmlhZHMuc25haS5pdC8iXQ==")],easyListLithuania:[c("LnJla2xhbW9zX3RhcnBhcw=="),c("LnJla2xhbW9zX251b3JvZG9z"),c("aW1nW2FsdD0iUmVrbGFtaW5pcyBza3lkZWxpcyJd"),c("aW1nW2FsdD0iRGVkaWt1b3RpLmx0IHNlcnZlcmlhaSJd"),c("aW1nW2FsdD0iSG9zdGluZ2FzIFNlcnZlcmlhaS5sdCJd")],estonian:[c("QVtocmVmKj0iaHR0cDovL3BheTRyZXN1bHRzMjQuZXUiXQ==")],fanboyAnnoyances:["#feedback-tab","#taboola-below-article",".feedburnerFeedBlock",".widget-feedburner-counter",'[title="Subscribe to our blog"]'],fanboyAntiFacebook:[".util-bar-module-firefly-visible"],fanboyEnhancedTrackers:[".open.pushModal","#issuem-leaky-paywall-articles-zero-remaining-nag","#sovrn_container",'div[class$="-hide"][zoompage-fontsize][style="display: block;"]',".BlockNag__Card"],fanboySocial:[".td-tags-and-social-wrapper-box",".twitterContainer",".youtube-social",'a[title^="Like us on Facebook"]','img[alt^="Share on Digg"]'],frellwitSwedish:[c("YVtocmVmKj0iY2FzaW5vcHJvLnNlIl1bdGFyZ2V0PSJfYmxhbmsiXQ=="),c("YVtocmVmKj0iZG9rdG9yLXNlLm9uZWxpbmsubWUiXQ=="),"article.category-samarbete",c("ZGl2LmhvbGlkQWRz"),"ul.adsmodern"],greekAdBlock:[c("QVtocmVmKj0iYWRtYW4ub3RlbmV0LmdyL2NsaWNrPyJd"),c("QVtocmVmKj0iaHR0cDovL2F4aWFiYW5uZXJzLmV4b2R1cy5nci8iXQ=="),c("QVtocmVmKj0iaHR0cDovL2ludGVyYWN0aXZlLmZvcnRobmV0LmdyL2NsaWNrPyJd"),"DIV.agores300","TABLE.advright"],hungarian:["#cemp_doboz",".optimonk-iframe-container",c("LmFkX19tYWlu"),c("W2NsYXNzKj0iR29vZ2xlQWRzIl0="),"#hirdetesek_box"],iDontCareAboutCookies:['.alert-info[data-block-track*="CookieNotice"]',".ModuleTemplateCookieIndicator",".o--cookies--container",".cookie-msg-info-container","#cookies-policy-sticky"],icelandicAbp:[c("QVtocmVmXj0iL2ZyYW1ld29yay9yZXNvdXJjZXMvZm9ybXMvYWRzLmFzcHgiXQ==")],latvian:[c("YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiAxMjBweDsgaGVpZ2h0OiA0MHB4OyBvdmVyZmxvdzogaGlkZGVuOyBwb3NpdGlvbjogcmVsYXRpdmU7Il0="),c("YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiA4OHB4OyBoZWlnaHQ6IDMxcHg7IG92ZXJmbG93OiBoaWRkZW47IHBvc2l0aW9uOiByZWxhdGl2ZTsiXQ==")],listKr:[c("YVtocmVmKj0iLy9hZC5wbGFuYnBsdXMuY28ua3IvIl0="),c("I2xpdmVyZUFkV3JhcHBlcg=="),c("YVtocmVmKj0iLy9hZHYuaW1hZHJlcC5jby5rci8iXQ=="),c("aW5zLmZhc3R2aWV3LWFk"),".revenue_unit_item.dable"],listeAr:[c("LmdlbWluaUxCMUFk"),".right-and-left-sponsers",c("YVtocmVmKj0iLmFmbGFtLmluZm8iXQ=="),c("YVtocmVmKj0iYm9vcmFxLm9yZyJd"),c("YVtocmVmKj0iZHViaXp6bGUuY29tL2FyLz91dG1fc291cmNlPSJd")],listeFr:[c("YVtocmVmXj0iaHR0cDovL3Byb21vLnZhZG9yLmNvbS8iXQ=="),c("I2FkY29udGFpbmVyX3JlY2hlcmNoZQ=="),c("YVtocmVmKj0id2Vib3JhbWEuZnIvZmNnaS1iaW4vIl0="),".site-pub-interstitiel",'div[id^="crt-"][data-criteo-id]'],officialPolish:["#ceneo-placeholder-ceneo-12",c("W2hyZWZePSJodHRwczovL2FmZi5zZW5kaHViLnBsLyJd"),c("YVtocmVmXj0iaHR0cDovL2Fkdm1hbmFnZXIudGVjaGZ1bi5wbC9yZWRpcmVjdC8iXQ=="),c("YVtocmVmXj0iaHR0cDovL3d3dy50cml6ZXIucGwvP3V0bV9zb3VyY2UiXQ=="),c("ZGl2I3NrYXBpZWNfYWQ=")],ro:[c("YVtocmVmXj0iLy9hZmZ0cmsuYWx0ZXgucm8vQ291bnRlci9DbGljayJd"),'a[href^="/magazin/"]',c("YVtocmVmXj0iaHR0cHM6Ly9ibGFja2ZyaWRheXNhbGVzLnJvL3Ryay9zaG9wLyJd"),c("YVtocmVmXj0iaHR0cHM6Ly9ldmVudC4ycGVyZm9ybWFudC5jb20vZXZlbnRzL2NsaWNrIl0="),c("YVtocmVmXj0iaHR0cHM6Ly9sLnByb2ZpdHNoYXJlLnJvLyJd")],ruAd:[c("YVtocmVmKj0iLy9mZWJyYXJlLnJ1LyJd"),c("YVtocmVmKj0iLy91dGltZy5ydS8iXQ=="),c("YVtocmVmKj0iOi8vY2hpa2lkaWtpLnJ1Il0="),"#pgeldiz",".yandex-rtb-block"],thaiAds:["a[href*=macau-uta-popup]",c("I2Fkcy1nb29nbGUtbWlkZGxlX3JlY3RhbmdsZS1ncm91cA=="),c("LmFkczMwMHM="),".bumq",".img-kosana"],webAnnoyancesUltralist:["#mod-social-share-2","#social-tools",c("LmN0cGwtZnVsbGJhbm5lcg=="),".zergnet-recommend",".yt.btn-link.btn-md.btn"]},n=Object.keys(e),[4,B((i=[]).concat.apply(i,n.map((function(n){return e[n]}))))]):[2,void 0];case 1:return o=t.sent(),r&&function(e,n){for(var t="DOM blockers debug:\n```",r=0,o=Object.keys(e);r<o.length;r++){var a=o[r];t+="\n".concat(a,":");for(var i=0,c=e[a];i<c.length;i++){var u=c[i];t+="\n  ".concat(n[u]?"🚫":"➡️"," ").concat(u);}}console.log("".concat(t,"\n```"));}(e,o),(a=n.filter((function(n){var t=e[n];return g(t.map((function(e){return o[e]})))>.6*t.length}))).sort(),[2,a]}var c;}))}))},fontPreferences:function(){return function(e,n){void 0===n&&(n=4e3);return M((function(t,o){var a=o.document,i=a.body,c=i.style;c.width="".concat(n,"px"),c.webkitTextSizeAdjust=c.textSizeAdjust="none",X()?i.style.zoom="".concat(1/o.devicePixelRatio):x()&&(i.style.zoom="reset");var u=a.createElement("div");return u.textContent=r([],Array(n/20<<0),!0).map((function(){return "word"})).join(" "),i.appendChild(u),e(a,i)}),'<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1">')}((function(e,n){for(var t={},r={},o=0,a=Object.keys(ee);o<a.length;o++){var i=a[o],c=ee[i],u=c[0],l=void 0===u?{}:u,s=c[1],d=void 0===s?"mmMwWLliI0fiflO&1":s,m=e.createElement("span");m.textContent=d,m.style.whiteSpace="nowrap";for(var f=0,v=Object.keys(l);f<v.length;f++){var h=v[f],b=l[h];void 0!==b&&(m.style[h]=b);}t[i]=m,n.appendChild(e.createElement("br")),n.appendChild(m);}for(var p=0,y=Object.keys(ee);p<y.length;p++){r[i=y[p]]=t[i].getBoundingClientRect().width;}return r}))},audio:function(){var e=window,n=e.OfflineAudioContext||e.webkitOfflineAudioContext;if(!n)return -2;if(x()&&!F()&&!function(){var e=window;return g(["DOMRectList"in e,"RTCPeerConnectionIceEvent"in e,"SVGGeometryElement"in e,"ontransitioncancel"in e])>=3}())return -1;var t=new n(1,5e3,44100),r=t.createOscillator();r.type="triangle",r.frequency.value=1e4;var o=t.createDynamicsCompressor();o.threshold.value=-50,o.knee.value=40,o.ratio.value=12,o.attack.value=0,o.release.value=.25,r.connect(o),o.connect(t.destination),r.start(0);var a=function(e){var n=3,t=500,r=500,o=5e3,a=function(){};return [new Promise((function(i,c){var u=!1,l=0,s=0;e.oncomplete=function(e){return i(e.renderedBuffer)};var d=function(){setTimeout((function(){return c(G("timeout"))}),Math.min(r,s+o-Date.now()));},m=function(){try{switch(e.startRendering(),e.state){case"running":s=Date.now(),u&&d();break;case"suspended":document.hidden||l++,u&&l>=n?c(G("suspended")):setTimeout(m,t);}}catch(r){c(r);}};m(),a=function(){u||(u=!0,s>0&&d());};})),a]}(t),i=a[0],c=a[1],l=i.then((function(e){return function(e){for(var n=0,t=0;t<e.length;++t)n+=Math.abs(e[t]);return n}(e.getChannelData(0).subarray(4500))}),(function(e){if("timeout"===e.name||"suspended"===e.name)return -3;throw e}));return u(l),function(){return c(),l}},screenFrame:function(){var e=this,r=z();return function(){return n(e,void 0,void 0,(function(){var e,n;return t(this,(function(t){switch(t.label){case 0:return [4,r()];case 1:return e=t.sent(),[2,[(n=function(e){return null===e?null:w(e,10)})(e[0]),n(e[1]),n(e[2]),n(e[3])]]}}))}))}},osCpu:function(){return navigator.oscpu},languages:function(){var e,n=navigator,t=[],r=n.language||n.userLanguage||n.browserLanguage||n.systemLanguage;if(void 0!==r&&t.push([r]),Array.isArray(n.languages))X()&&g([!("MediaSettingsRange"in(e=window)),"RTCEncodedAudioFrame"in e,""+e.Intl=="[object Intl]",""+e.Reflect=="[object Reflect]"])>=3||t.push(n.languages);else if("string"==typeof n.languages){var o=n.languages;o&&t.push(o.split(","));}return t},colorDepth:function(){return window.screen.colorDepth},deviceMemory:function(){return y(p(navigator.deviceMemory),void 0)},screenResolution:function(){var e=screen,n=function(e){return y(b(e),null)},t=[n(e.width),n(e.height)];return t.sort().reverse(),t},hardwareConcurrency:function(){return y(b(navigator.hardwareConcurrency),void 0)},timezone:function(){var e,n=null===(e=window.Intl)||void 0===e?void 0:e.DateTimeFormat;if(n){var t=(new n).resolvedOptions().timeZone;if(t)return t}var r,o=(r=(new Date).getFullYear(),-Math.max(p(new Date(r,0,1).getTimezoneOffset()),p(new Date(r,6,1).getTimezoneOffset())));return "UTC".concat(o>=0?"+":"").concat(Math.abs(o))},sessionStorage:function(){try{return !!window.sessionStorage}catch(e){return !0}},localStorage:function(){try{return !!window.localStorage}catch(e){return !0}},indexedDB:function(){if(!Z()&&!S())try{return !!window.indexedDB}catch(e){return !0}},openDatabase:function(){return !!window.openDatabase},cpuClass:function(){return navigator.cpuClass},platform:function(){var e=navigator.platform;return "MacIntel"===e&&x()&&!F()?function(){if("iPad"===navigator.platform)return !0;var e=screen,n=e.width/e.height;return g(["MediaSource"in window,!!Element.prototype.webkitRequestFullscreen,n>.65&&n<1.53])>=2}()?"iPad":"iPhone":e},plugins:function(){var e=navigator.plugins;if(e){for(var n=[],t=0;t<e.length;++t){var r=e[t];if(r){for(var o=[],a=0;a<r.length;++a){var i=r[a];o.push({type:i.type,suffixes:i.suffixes});}n.push({name:r.name,description:r.description,mimeTypes:o});}}return n}},canvas:function(){var e,n,t=!1,r=function(){var e=document.createElement("canvas");return e.width=1,e.height=1,[e,e.getContext("2d")]}(),o=r[0],a=r[1];if(function(e,n){return !(!n||!e.toDataURL)}(o,a)){t=function(e){return e.rect(0,0,10,10),e.rect(2,2,6,6),!e.isPointInPath(5,5,"evenodd")}(a),function(e,n){e.width=240,e.height=60,n.textBaseline="alphabetic",n.fillStyle="#f60",n.fillRect(100,1,62,20),n.fillStyle="#069",n.font='11pt "Times New Roman"';var t="Cwm fjordbank gly ".concat(String.fromCharCode(55357,56835));n.fillText(t,2,15),n.fillStyle="rgba(102, 204, 0, 0.2)",n.font="18pt Arial",n.fillText(t,4,45);}(o,a);var i=H(o);i!==H(o)?e=n="unstable":(n=i,function(e,n){e.width=122,e.height=110,n.globalCompositeOperation="multiply";for(var t=0,r=[["#f2f",40,40],["#2ff",80,40],["#ff2",60,80]];t<r.length;t++){var o=r[t],a=o[0],i=o[1],c=o[2];n.fillStyle=a,n.beginPath(),n.arc(i,c,40,0,2*Math.PI,!0),n.closePath(),n.fill();}n.fillStyle="#f9c",n.arc(60,60,60,0,2*Math.PI,!0),n.arc(60,60,20,0,2*Math.PI,!0),n.fill("evenodd");}(o,a),e=H(o));}else e=n="";return {winding:t,geometry:e,text:n}},touchSupport:function(){var e,n=navigator,t=0;void 0!==n.maxTouchPoints?t=b(n.maxTouchPoints):void 0!==n.msMaxTouchPoints&&(t=n.msMaxTouchPoints);try{document.createEvent("TouchEvent"),e=!0;}catch(r){e=!1;}return {maxTouchPoints:t,touchEvent:e,touchStart:"ontouchstart"in window}},vendor:function(){return navigator.vendor||""},vendorFlavors:function(){for(var e=[],n=0,t=["chrome","safari","__crWeb","__gCrWeb","yandex","__yb","__ybro","__firefox__","__edgeTrackingPreventionStatistics","webkit","oprt","samsungAr","ucweb","UCShellJava","puffinDevice"];n<t.length;n++){var r=t[n],o=window[r];o&&"object"==typeof o&&e.push(r);}return e.sort()},cookiesEnabled:function(){var e=document;try{e.cookie="cookietest=1; SameSite=Strict;";var n=-1!==e.cookie.indexOf("cookietest=");return e.cookie="cookietest=1; SameSite=Strict; expires=Thu, 01-Jan-1970 00:00:01 GMT",n}catch(t){return !1}},colorGamut:function(){for(var e=0,n=["rec2020","p3","srgb"];e<n.length;e++){var t=n[e];if(matchMedia("(color-gamut: ".concat(t,")")).matches)return t}},invertedColors:function(){return !!O("inverted")||!O("none")&&void 0},forcedColors:function(){return !!_("active")||!_("none")&&void 0},monochrome:function(){if(matchMedia("(min-monochrome: 0)").matches){for(var e=0;e<=100;++e)if(matchMedia("(max-monochrome: ".concat(e,")")).matches)return e;throw new Error("Too high value")}},contrast:function(){return Q("no-preference")?0:Q("high")||Q("more")?1:Q("low")||Q("less")?-1:Q("forced")?10:void 0},reducedMotion:function(){return !!U("reduce")||!U("no-preference")&&void 0},hdr:function(){return !!K("high")||!K("standard")&&void 0},math:function(){var e,n=q.acos||$,t=q.acosh||$,r=q.asin||$,o=q.asinh||$,a=q.atanh||$,i=q.atan||$,c=q.sin||$,u=q.sinh||$,l=q.cos||$,s=q.cosh||$,d=q.tan||$,m=q.tanh||$,f=q.exp||$,v=q.expm1||$,h=q.log1p||$;return {acos:n(.12312423423423424),acosh:t(1e308),acoshPf:(e=1e154,q.log(e+q.sqrt(e*e-1))),asin:r(.12312423423423424),asinh:o(1),asinhPf:function(e){return q.log(e+q.sqrt(e*e+1))}(1),atanh:a(.5),atanhPf:function(e){return q.log((1+e)/(1-e))/2}(.5),atan:i(.5),sin:c(-1e300),sinh:u(1),sinhPf:function(e){return q.exp(e)-1/q.exp(e)/2}(1),cos:l(10.000000000123),cosh:s(1),coshPf:function(e){return (q.exp(e)+1/q.exp(e))/2}(1),tan:d(-1e300),tanh:m(1),tanhPf:function(e){return (q.exp(2*e)-1)/(q.exp(2*e)+1)}(1),exp:f(1),expm1:v(1),expm1Pf:function(e){return q.exp(e)-1}(1),log1p:h(10),log1pPf:function(e){return q.log(1+e)}(10),powPI:function(e){return q.pow(q.PI,e)}(-100)}},videoCard:function(){var e,n=document.createElement("canvas"),t=null!==(e=n.getContext("webgl"))&&void 0!==e?e:n.getContext("experimental-webgl");if(t&&"getExtension"in t){var r=t.getExtension("WEBGL_debug_renderer_info");if(r)return {vendor:(t.getParameter(r.UNMASKED_VENDOR_WEBGL)||"").toString(),renderer:(t.getParameter(r.UNMASKED_RENDERER_WEBGL)||"").toString()}}},pdfViewerEnabled:function(){return navigator.pdfViewerEnabled},architecture:function(){var e=new Float32Array(1),n=new Uint8Array(e.buffer);return e[0]=1/0,e[0]=e[0]-e[0],n[3]}};function te(e){var n=function(e){if(R())return .4;if(x())return F()?.5:.3;var n=e.platform.value||"";if(/^Win/.test(n))return .6;if(/^Mac/.test(n))return .5;return .7}(e),t=function(e){return w(.99+.01*e,1e-4)}(n);return {score:n,comment:"$ if upgrade to Pro: https://fpjs.dev/pro".replace(/\$/g,"".concat(t))}}function re(n){return JSON.stringify(n,(function(n,t){return t instanceof Error?e({name:(r=t).name,message:r.message,stack:null===(o=r.stack)||void 0===o?void 0:o.split("\n")},r):t;var r,o;}),2)}function oe(e){return h(function(e){for(var n="",t=0,r=Object.keys(e).sort();t<r.length;t++){var o=r[t],a=e[o],i=a.error?"error":JSON.stringify(a.value);n+="".concat(n?"|":"").concat(o.replace(/([:|\\])/g,"\\$1"),":").concat(i);}return n}(e))}function ae(e){return void 0===e&&(e=50),function(e,n){void 0===n&&(n=1/0);var t=window.requestIdleCallback;return t?new Promise((function(e){return t.call(window,(function(){return e()}),{timeout:n})})):o(Math.min(e,n))}(e,2*e)}function ie(e,r){var o=Date.now();return {get:function(a){return n(this,void 0,void 0,(function(){var n,i,c;return t(this,(function(t){switch(t.label){case 0:return n=Date.now(),[4,e()];case 1:return i=t.sent(),c=function(e){var n;return {get visitorId(){return void 0===n&&(n=oe(this.components)),n},set visitorId(e){n=e;},confidence:te(e),components:e,version:"3.4.0"}}(i),(r||(null==a?void 0:a.debug))&&console.log("Copy the text below to get the debug data:\n\n```\nversion: ".concat(c.version,"\nuserAgent: ").concat(navigator.userAgent,"\ntimeBetweenLoadAndGet: ").concat(n-o,"\nvisitorId: ").concat(c.visitorId,"\ncomponents: ").concat(re(i),"\n```")),[2,c]}}))}))}}}function ce(e){var r=void 0===e?{}:e,o=r.delayFallback,a=r.debug;return r.monitoring,n(this,void 0,void 0,(function(){return t(this,(function(e){switch(e.label){case 0:return [4,ae(o)];case 1:return e.sent(),[2,ie(V(ne,{debug:a},[]),a)]}}))}))}var ue={load:ce,hashComponents:oe,componentsToDebugString:re};

  /** @enum {number} */
  const ReactionNo = {
    RXN_INBOUND_ACCESS_FORBIDDEN: 70005,

    RXN_INBOUND_OVER_LIMIT_PROMPTS: 70009,

    RXN_INBOUND_INVALID_PROMPT_TITLE_LANG: 70100,
    RXN_INBOUND_INVALID_PROMPT_TEASER_LANG: 70101,
    RXN_INBOUND_INVALID_PROMPT_HINT_LANG: 70102,
    RXN_INBOUND_INVALID_PROMPT_TITLE_UPPERCASE: 70103,
    RXN_INBOUND_INVALID_PROMPT_TITLE_WORD_COUNT: 70104,
    RXN_INBOUND_INVALID_PROMPT_TEASER_UPPERCASE: 70105,
    RXN_INBOUND_INVALID_PROMPT_HINT_UPPERCASE: 70106,
  };

  /** @enum {string} */
  const ReactionMessage = {
    [ReactionNo.RXN_INBOUND_ACCESS_FORBIDDEN]:
      'The requested action is not allowed.',

    [ReactionNo.RXN_INBOUND_OVER_LIMIT_PROMPTS]:
      "You've reached the maximum number of prompts.",

    [ReactionNo.RXN_INBOUND_INVALID_PROMPT_TITLE_LANG]:
      'The prompt title is not in English.',
    [ReactionNo.RXN_INBOUND_INVALID_PROMPT_TEASER_LANG]:
      'The prompt teaser is not in English.',
    [ReactionNo.RXN_INBOUND_INVALID_PROMPT_HINT_LANG]:
      'The prompt hint is not in English.',
    [ReactionNo.RXN_INBOUND_INVALID_PROMPT_TITLE_UPPERCASE]:
      'The prompt title has too many uppercase letters.',
    [ReactionNo.RXN_INBOUND_INVALID_PROMPT_TITLE_WORD_COUNT]:
      'The prompt title is too long.',
    [ReactionNo.RXN_INBOUND_INVALID_PROMPT_TEASER_UPPERCASE]:
      'The prompt teaser has too many uppercase letters.',
    [ReactionNo.RXN_INBOUND_INVALID_PROMPT_HINT_UPPERCASE]:
      'The prompt hint has too many uppercase letters.',
  };

  class Reaction extends Error {
    /** @type {string} - mapped reaction message shown to user */
    message = '';

    /** @param {string} message */
    constructor(message) {
      super(message);

      this.message = message;
    }

    /**
     * Maps a ReactionNo to a ReactionMessage and returns a new Reaction
     *
     * @param {ReactionNo} currentReactionNo
     * @returns {Reaction}
     */
    static mapReactionNo(currentReactionNo) {
      return new Reaction(
        ReactionMessage[currentReactionNo]
          ? ReactionMessage[currentReactionNo]
          : 'Something went wrong, please try again later.'
      );
    }
  }

  /** @typedef {{MessageID: string, MessageGroupNo: MessageGroupNo, MessageSeverityNo: MessageSeverityNo, MessageStatusNo: MessageStatusNo, MessageSubject: string, MessageBodyHTML: string, OnlyExternalID: string, OnlyExternalSystemNo: ExternalSystemNo, ExpiryTime: string, CreationTime: string}} Message */

  const userFootprintVersion = '01';

  // generate anonymous user footprint using FingerprintJS to prevent abuse
  async function generateUserFootprint() {
    const fpPromise = ue.load({
      monitoring: false,
    });

    const fp = await fpPromise;
    const result = await fp.get();

    return `${userFootprintVersion}-${result.visitorId}`;
  }

  const IN_BOUNDClient = {
    APIEndpoint,

    /** @type {{ExternalID: string, ExternalSystemNo: ExternalSystemNo, Email: string, Name: string, UserStatusNo: UserStatusNo, UserFootprint: string, MaxNewPublicPromptsAllowed: number, MaxNewPrivatePromptsAllowed: number}} */
    User: null,

    // fetch the user profile from ChatGPT session API endpoint
    async init() {
      await generateUserFootprint();

      return (
        fetch('/api/auth/session')
          // check if the response is OK
          .then((response) => {
            if (response.ok) {
              // parse the JSON response
              return response.json();
            }
            throw new Error('Network response was not OK.');
          })
          // set the user object
          .then((res) => {
            this.User = {
              // Send the anonymous, not identifiable OpenAI hashed user ID to IN_BOUND to link the user to his own prompts
              // ExternalID: res.user.id,
              // ExternalSystemNo: ExternalSystemNo.OPENAI,
              // So far no reason to send email and name to IN_BOUND. This may change in the future, but needs consent from the user.
              Email: res.user.email,
              Name: res.user.name,
              // UserStatusNo: UserStatusNo.UNKNOWN,
              // UserFootprint,
              // MaxNewPrivatePromptsAllowed: 0,
              // MaxNewPublicPromptsAllowed: 0,
            };
          })
      );
    },

    // save the prompt using IN_BOUND API endpoint
    savePrompt(prompt) {
      // console.log(prompt)
      let newPromptSchema = prompt;
      newPromptSchema.RevisionTime = (new Date()).toISOString();
      newPromptSchema.AuthorName = this.User.Name;
      newPromptSchema.AuthorURL = this.User.Email;
      return (
        fetch(`${this.APIEndpoint}/prompts?user=${this.User.Email}&company=${IN_BOUND.Company}&id=${prompt.ID}`, { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...newPromptSchema
          }),
        })
          .then((response) => {
            return Promise.all([response.json(), response]);
          })
          // check if the response is OK
          .then(([json, response]) => {
            if (response.ok) {
              // parse the JSON response
              return json;
            }

            if (json && json.ReactionNo) {
              throw Reaction.mapReactionNo(json.ReactionNo);
            }

            throw new Error('Network response was not OK.');
          })
      );
    },

    /**
     * Fetch the forks from IN_BOUND API endpoint
     *
     * @returns {Promise<Prompt>}
     */
    // getForks() {
    //   return (
    //     fetch(`https://docs.google.com/a/google.com/spreadsheets/d/${promptsDBID}/gviz/tq?tqx=out:csv&tq=select%20*%20where%20A%20contains%20'"forkID":"'`)
    //       // check if response is OK
    //       .then((res) => {
    //         if (!res.ok) {
    //           throw new Error('Network response was not OK');
    //         }
    //         return res;
    //       })
    //       // parse response as JSON
    //       .then((res) => res.text())
    //       .then(txt => {
    //         const jsonl_data = txt.split('\n')
    //         if(jsonl_data[0]===''){
    //           return []
    //         }
    //         // console.log(jsonl_data)
    //         for(let i=0; i<jsonl_data.length; i++){
    //           jsonl_data[i] = JSON.parse(jsonl_data[i].slice(1,-1).replace(/""/gi,'"'))
    //         }
    //         return jsonl_data;
    //       })
    //   );
    // },

      /**
     * Pin Action for a prompt using IN_BOUND API endpoint
     *
     * @param {string} PromptID
     * @param {(1|-1)} Vote
     */
      pinActionForPrompt(PromptID, Vote) {
        return (
            fetch(`${this.APIEndpoint}/prompts?user=${this.User.Email}&company=${IN_BOUND.Company}&id=${PromptID}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                pin: Vote === 1
              }),
            })
            // check if response is OK
            .then((res) => {
              if (!res.ok) {
                throw new Error('Network response was not OK');
              }

              return res;
            })
        );
      },


    /**
     * Report a prompt using IN_BOUND API endpoint
     *
     * @param {string} PromptID
     * @param {FeedbackTypeNo} FeedbackTypeNo
     * @param {string} FeedbackText
     * @param {string} FeedbackContact
     */
    reportPrompt(PromptID, FeedbackTypeNo, FeedbackText, FeedbackContact) {
      return (
        fetch(`${this.APIEndpoint}?act=promptsFeedback&promptID=${PromptID}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: JSON.stringify({
            FeedbackContact,
            FeedbackText,
            FeedbackTypeNo,
            PromptID,
            User: this.User,
          }),
        })
          // check if response is OK
          .then((res) => {
            if (!res.ok) {
              throw new Error('Network response was not OK');
            }

            return res;
          })
      );
    },

    saveNewTone(tone) {
      return (
        fetch(`${this.APIEndpoint}variations?user=${this.User.Email}&company=${IN_BOUND.Company}&id=${tone.id}`, {
          method: 'POST',
          body: JSON.stringify({
            ...tone
          }),
        })
          // check if response is OK
          .then((res) => {
            if (!res.ok) {
              throw new Error('Network response was not OK');
            }

            return res;
          })
      );
    },

    saveEditTone(tone) {
      console.log(tone);
      return (
        fetch(`${this.APIEndpoint}/variations?user=${this.User.Email}&company=${IN_BOUND.Company}&id=${tone.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tone),
        })
          // check if response is OK
          .then((res) => {
            if (!res.ok) {
              throw new Error('Network response was not OK');
            }

            return res;
          })
      );
    },

    deleteTone(ID) {
      console.log(ID);
      return (
        fetch(
          `${this.APIEndpoint}/variations?user=${this.User.Email}&company=${IN_BOUND.Company}&id=${ID}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
          }
        )
          // check if response is OK
          .then((res) => {
            if (!res.ok) {
              throw new Error('Network response was not OK');
            }
          })
      );
    },

    // delete prompt using IN_BOUND API endpoint
    deletePrompt(PromptID) {
      return (
        fetch(
          `${this.APIEndpoint}/prompt?user=${this.User.Email}&company=${IN_BOUND.Company}&id=${PromptID}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
          // check if response is OK
          .then((res) => {
            if (!res.ok) {
              throw new Error('Network response was not OK');
            }
          })
      );
    },

    /**
     * vote for a prompt using IN_BOUND API endpoint
     *
     * @param {string} PromptID
     * @param {(1|-1)} Vote
     */
    voteForPrompt(PromptID, Vote) {
      return (
        fetch(`${this.APIEndpoint}/prompts?user=${this.User.Email}&company=${IN_BOUND.Company}&id=${PromptID}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            favourite: Vote === 1
          }),
        })
          // check if response is OK
          .then((res) => {
            if (!res.ok) {
              throw new Error('Network response was not OK');
            }

            return res;
          })
      );
    },

    getBingResults(query){
      IN_BOUND.showNotification(
        NotificationSeverity.SUCCESS,
        'Fetching web results...'
      );

      const url = `https://www.bing.com/search?q=${query}`;
      document.dispatchEvent( new CustomEvent('IN_BOUND.SendBgMsg', {detail: {url, type:"IN_BOUND.getRequest", returnType:"getBingResults"}, bubbles:true }));
      
      // return (
      //   fetch(`${this.APIEndpoint}/bing-search?user=${this.User.Email}&company=${IN_BOUND.Company}&query=${query.replace(/\n/gi, " ")}`)
      //     // check if response is OK
      //     .then((res) => {
      //       if (!res.ok) {
      //         throw new Error('Network response was not OK');
      //       }
      //       return res.text()
      //     }).then( res => {
      //       return res
      //     })
      // );
      
    },

    getDdgResults(query){
      IN_BOUND.showNotification(
        NotificationSeverity.SUCCESS,
        'Fetching web results...'
      );

      const url = `https://html.duckduckgo.com/html/?q=${query}`;
      document.dispatchEvent( new CustomEvent('IN_BOUND.SendBgMsg', {detail: {url, type:"IN_BOUND.getRequest", returnType:"getDdgResults"}, bubbles:true }));
      
      // return (
      //   fetch(`${this.APIEndpoint}/ddg-search?user=${this.User.Email}&company=${IN_BOUND.Company}&query=${query.replace(/\n/gi, " ")}`)
      //     // check if response is OK
      //     .then((res) => {
      //       if (!res.ok) {
      //         throw new Error('Network response was not OK');
      //       }
      //       return res.text()
      //     }).then( res => {
      //       return res
      //     })
      // );
      
    },

    getGoogleNewsResults(query){
      IN_BOUND.showNotification(
        NotificationSeverity.SUCCESS,
        'Fetching web results...'
      );

      const url = `https://www.google.com/search?q=${query}&tbm=nws`;
      document.dispatchEvent( new CustomEvent('IN_BOUND.SendBgMsg', {detail: {url, type:"IN_BOUND.getRequest", returnType:"getGoogleNewsResults"}, bubbles:true }));
      
      // return (
      //   fetch(`${this.APIEndpoint}/google-news?user=${this.User.Email}&company=${IN_BOUND.Company}&query=${query.replace(/\n/gi, " ")}`)
      //     // check if response is OK
      //     .then((res) => {
      //       if (!res.ok) {
      //         throw new Error('Network response was not OK');
      //       }
      //       return res.text()
      //     }).then( res => {
      //       return res
      //     })
      // );
      
    },


  };

  const svg = function (name) {
    name = Array.isArray(name) ? name[0] : name;
    switch (name) {
      case 'Logo-dark':
        return `<?xml version="1.0" encoding="utf-8"?>
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
      `
      case 'Logo-light':
        return `<?xml version="1.0" encoding="utf-8"?>
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
      `
      case 'Rocket':
        return '<svg fill="#f1c40f" height="1rem" width="1rem" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-25.91 -25.91 310.92 310.92" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M256.468,2.637c-1.907-1.907-4.575-2.855-7.25-2.593L228.027,2.14c-33.604,3.324-65.259,18.304-89.135,42.18 l-0.365,0.365l-5.298-2.038c-23.593-9.073-50.386-3.388-68.262,14.486l-54.008,54.008c-0.096,0.091-0.188,0.184-0.279,0.279 l-8.044,8.043c-3.515,3.515-3.515,9.213,0,12.728c3.516,3.515,9.213,3.515,12.729,0l4.051-4.051l32.714,12.582 c0.372,0.618,0.813,1.206,1.347,1.739l3.65,3.65l-10.583,10.583c-3.49,3.49-3.51,9.129-0.071,12.649 c-17.598,19.116-23.107,33.004-32.352,56.335c-1.229,3.099-2.53,6.384-3.942,9.889c-1.543,3.823-0.657,8.178,2.257,11.095 c1.965,1.966,4.584,3.011,7.255,3.011c1.291,0,2.595-0.244,3.842-0.746c3.509-1.414,6.793-2.715,9.892-3.943 c23.33-9.246,37.219-14.755,56.336-32.353c1.748,1.707,4.015,2.564,6.285,2.564c2.304,0,4.606-0.879,6.364-2.636l10.582-10.582 l3.649,3.649c0.525,0.524,1.112,0.968,1.738,1.344l12.583,32.718l-4.051,4.051c-3.515,3.515-3.515,9.213,0,12.728 c1.758,1.758,4.061,2.636,6.364,2.636c2.303,0,4.606-0.879,6.364-2.636l8.043-8.043c0.096-0.091,0.188-0.185,0.279-0.28 l54.01-54.009c17.874-17.875,23.56-44.669,14.485-68.261l-2.037-5.298l0.365-0.365c23.876-23.876,38.856-55.532,42.18-89.135 l2.096-21.191C259.325,7.204,258.374,4.543,256.468,2.637z M33.343,114.214l44.353-44.352 c12.291-12.291,30.45-16.558,46.85-11.196l-65.453,65.452L33.343,114.214z M33.537,225.569 c7.256-18.099,12.332-28.892,25.667-43.484l17.816,17.816C62.428,213.236,51.633,218.313,33.537,225.569z M96.044,193.469 L65.635,163.06l4.219-4.219l30.409,30.409L96.044,193.469z M123.005,186.536L72.568,136.1l59.424-59.423l50.436,50.436 L123.005,186.536z M189.242,181.409l-44.352,44.352l-9.904-25.751l65.451-65.451 C205.801,150.958,201.534,169.117,189.242,181.409z M239.052,29.306c-2.915,29.473-16.054,57.237-36.996,78.179l-6.9,6.9 L144.72,63.949l6.901-6.901c20.94-20.941,48.705-34.08,78.178-36.995l10.27-1.016L239.052,29.306z"></path> <path d="M195.926,40.017c-6.187,0-12.003,2.409-16.378,6.784c-9.03,9.03-9.03,23.725,0,32.755 c4.375,4.375,10.191,6.784,16.378,6.784s12.003-2.409,16.378-6.784c9.03-9.03,9.03-23.725,0-32.755 C207.929,42.426,202.113,40.017,195.926,40.017z M199.575,66.828c-0.975,0.975-2.271,1.512-3.649,1.512 c-1.378,0-2.675-0.537-3.649-1.512c-2.013-2.013-2.013-5.287,0-7.3c0.975-0.975,2.271-1.512,3.649-1.512 c1.378,0,2.675,0.537,3.649,1.512C201.588,61.541,201.588,64.816,199.575,66.828z"></path> </g> </g> </g> </g></svg>';
      case 'Export':
        return '<svg fill="#FFC300" height="1rem" width="1rem" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 29.978 29.978" xml:space="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M25.462,19.105v6.848H4.515v-6.848H0.489v8.861c0,1.111,0.9,2.012,2.016,2.012h24.967c1.115,0,2.016-0.9,2.016-2.012 v-8.861H25.462z"></path> <path d="M14.62,18.426l-5.764-6.965c0,0-0.877-0.828,0.074-0.828s3.248,0,3.248,0s0-0.557,0-1.416c0-2.449,0-6.906,0-8.723 c0,0-0.129-0.494,0.615-0.494c0.75,0,4.035,0,4.572,0c0.536,0,0.524,0.416,0.524,0.416c0,1.762,0,6.373,0,8.742 c0,0.768,0,1.266,0,1.266s1.842,0,2.998,0c1.154,0,0.285,0.867,0.285,0.867s-4.904,6.51-5.588,7.193 C15.092,18.979,14.62,18.426,14.62,18.426z"></path> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g> </g></svg>';
      case 'PromptBubble':
        return `<img class="logo-bg" src="" />`;
      case 'Save':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <path d="M16 8.98987V20.3499C16 21.7999 14.96 22.4099 13.69 21.7099L9.76001 19.5199C9.34001 19.2899 8.65999 19.2899 8.23999 19.5199L4.31 21.7099C3.04 22.4099 2 21.7999 2 20.3499V8.98987C2 7.27987 3.39999 5.87988 5.10999 5.87988H12.89C14.6 5.87988 16 7.27987 16 8.98987Z" stroke="#FFC300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M22 5.10999V16.47C22 17.92 20.96 18.53 19.69 17.83L16 15.77V8.98999C16 7.27999 14.6 5.88 12.89 5.88H8V5.10999C8 3.39999 9.39999 2 11.11 2H18.89C20.6 2 22 3.39999 22 5.10999Z" stroke="#FFC300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M7 12H11" stroke="#FFC300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9 14V10" stroke="#FFC300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`
      case 'Cross':
        return '<svg stroke="gray" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
      case 'Cross-Round':
        return `<svg xmlns="http://www.w3.org/2000/svg" fill="gray" class="h-5 w-5" viewBox="0 0 32 32" version="1.1">
      <path d="M0 16q0 3.264 1.28 6.208t3.392 5.12 5.12 3.424 6.208 1.248 6.208-1.248 5.12-3.424 3.392-5.12 1.28-6.208-1.28-6.208-3.392-5.12-5.088-3.392-6.24-1.28q-3.264 0-6.208 1.28t-5.12 3.392-3.392 5.12-1.28 6.208zM4 16q0-3.264 1.6-6.016t4.384-4.352 6.016-1.632 6.016 1.632 4.384 4.352 1.6 6.016-1.6 6.048-4.384 4.352-6.016 1.6-6.016-1.6-4.384-4.352-1.6-6.048zM9.76 20.256q0 0.832 0.576 1.408t1.44 0.608 1.408-0.608l2.816-2.816 2.816 2.816q0.576 0.608 1.408 0.608t1.44-0.608 0.576-1.408-0.576-1.408l-2.848-2.848 2.848-2.816q0.576-0.576 0.576-1.408t-0.576-1.408-1.44-0.608-1.408 0.608l-2.816 2.816-2.816-2.816q-0.576-0.608-1.408-0.608t-1.44 0.608-0.576 1.408 0.576 1.408l2.848 2.816-2.848 2.848q-0.576 0.576-0.576 1.408z"/>
      </svg>`;
      case 'info':
        return `<svg xmlns="http://www.w3.org/2000/svg" fill="gray" class="h-5 w-5" viewBox="0 0 1920 1920">
          <path d="M960 0c530.193 0 960 429.807 960 960s-429.807 960-960 960S0 1490.193 0 960 429.807 0 960 0Zm0 101.053c-474.384 0-858.947 384.563-858.947 858.947S485.616 1818.947 960 1818.947 1818.947 1434.384 1818.947 960 1434.384 101.053 960 101.053Zm-42.074 626.795c-85.075 39.632-157.432 107.975-229.844 207.898-10.327 14.249-10.744 22.907-.135 30.565 7.458 5.384 11.792 3.662 22.656-7.928 1.453-1.562 1.453-1.562 2.94-3.174 9.391-10.17 16.956-18.8 33.115-37.565 53.392-62.005 79.472-87.526 120.003-110.867 35.075-20.198 65.9 9.485 60.03 47.471-1.647 10.664-4.483 18.534-11.791 35.432-2.907 6.722-4.133 9.646-5.496 13.23-13.173 34.63-24.269 63.518-47.519 123.85l-1.112 2.886c-7.03 18.242-7.03 18.242-14.053 36.48-30.45 79.138-48.927 127.666-67.991 178.988l-1.118 3.008a10180.575 10180.575 0 0 0-10.189 27.469c-21.844 59.238-34.337 97.729-43.838 138.668-1.484 6.37-1.484 6.37-2.988 12.845-5.353 23.158-8.218 38.081-9.82 53.42-2.77 26.522-.543 48.24 7.792 66.493 9.432 20.655 29.697 35.43 52.819 38.786 38.518 5.592 75.683 5.194 107.515-2.048 17.914-4.073 35.638-9.405 53.03-15.942 50.352-18.932 98.861-48.472 145.846-87.52 41.11-34.26 80.008-76 120.788-127.872 3.555-4.492 3.555-4.492 7.098-8.976 12.318-15.707 18.352-25.908 20.605-36.683 2.45-11.698-7.439-23.554-15.343-19.587-3.907 1.96-7.993 6.018-14.22 13.872-4.454 5.715-6.875 8.77-9.298 11.514-9.671 10.95-19.883 22.157-30.947 33.998-18.241 19.513-36.775 38.608-63.656 65.789-13.69 13.844-30.908 25.947-49.42 35.046-29.63 14.559-56.358-3.792-53.148-36.635 2.118-21.681 7.37-44.096 15.224-65.767 17.156-47.367 31.183-85.659 62.216-170.048 13.459-36.6 19.27-52.41 26.528-72.201 21.518-58.652 38.696-105.868 55.04-151.425 20.19-56.275 31.596-98.224 36.877-141.543 3.987-32.673-5.103-63.922-25.834-85.405-22.986-23.816-55.68-34.787-96.399-34.305-45.053.535-97.607 15.256-145.963 37.783Zm308.381-388.422c-80.963-31.5-178.114 22.616-194.382 108.33-11.795 62.124 11.412 115.76 58.78 138.225 93.898 44.531 206.587-26.823 206.592-130.826.005-57.855-24.705-97.718-70.99-115.729Z" fill-rule="evenodd"/>
        </svg>`;
      case 'CrossOrange':
        return '<svg stroke="#E06C2B" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
      case 'Edit':
        return `<svg xmlns="http://www.w3.org/2000/svg" fill="gray" class="h-4 w-4" viewBox="0 0 32 32" version="1.1">
      <path d="M7.263 19.051l-1.656 5.797c-0.030 0.102-0.048 0.22-0.048 0.342 0 0.691 0.559 1.251 1.25 1.252h0c0.126-0 0.248-0.019 0.363-0.053l-0.009 0.002 5.622-1.656c0.206-0.063 0.383-0.17 0.527-0.311l-0 0 17.568-17.394c0.229-0.227 0.371-0.541 0.371-0.889 0-0.345-0.14-0.657-0.365-0.883l-4.141-4.142c-0.227-0.226-0.539-0.366-0.885-0.366s-0.658 0.14-0.885 0.366v0l-17.394 17.394c-0.146 0.146-0.256 0.329-0.316 0.532l-0.002 0.009zM25.859 3.768l2.369 2.369-2.369 2.346-2.37-2.345zM9.578 20.049l12.144-12.144 2.361 2.336-12.307 12.184-3.141 0.924zM30 12.75c-0.69 0-1.25 0.56-1.25 1.25v14.75h-25.5v-25.5h14.75c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0h-16c-0.69 0-1.25 0.56-1.25 1.25v0 28c0 0.69 0.56 1.25 1.25 1.25h28c0.69-0.001 1.249-0.56 1.25-1.25v-16c-0-0.69-0.56-1.25-1.25-1.25h-0z"/>
      </svg>`;
      case 'EditOrange':
        return '<svg stroke="#E06C2B" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>';
      case 'ThumbUp':
        return '<svg stroke="#2ecc71" fill="none" stroke-width="2" viewBox="0 0 24 24" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path xmlns="http://www.w3.org/2000/svg" d="M4.42602 12.9469L10.1622 19.1217C11.1546 20.1899 12.8454 20.1899 13.8378 19.1217L19.574 12.9469C21.4753 10.9002 21.4753 7.58179 19.574 5.53505C17.6726 3.48832 14.5899 3.48832 12.6885 5.53505V5.53505C12.3168 5.93527 11.6832 5.93527 11.3115 5.53505V5.53505C9.4101 3.48832 6.32738 3.48832 4.42602 5.53505C2.52466 7.58178 2.52466 10.9002 4.42602 12.9469Z"  stroke-width="2"/></svg>';
      case 'ThumbDown':
        return '<svg stroke="#e74c3c" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg>';
      case 'Report':
        return '<svg stroke="#f39c12" fill="none" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>';
      case 'Plus':
        return '<svg stroke="#f39c12" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
      case 'Globe':
        return '<svg fill="none" stroke="gray" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4" height="1em" width="1em"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"></path></svg>';
      case 'Lock':
        return '<svg fill="none" stroke="gray" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4" height="1em" width="1em"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"></path></svg>';
      case 'Eye':
        return '<svg fill="none" stroke="#8e44ad" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4" height="1em" width="1em"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>';
      case 'Quote':
        return '<svg stroke="#FFC300" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
      case 'Link':
        return '<svg fill="none" stroke="gray" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4" height="1em" width="1em" stroke-linecap="round" stroke-linejoin="round" class="feather feather-share-2" ><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>';
      case 'Community':
        return '<svg fill="none" stroke="#e67e22" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4"><path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"></path></svg>';
      case 'star-gray':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <g id="Interface / Star">
      <path id="Vector" d="M2.33496 10.3368C2.02171 10.0471 2.19187 9.52339 2.61557 9.47316L8.61914 8.76107C8.79182 8.74059 8.94181 8.63215 9.01465 8.47425L11.5469 2.98446C11.7256 2.59703 12.2764 2.59695 12.4551 2.98439L14.9873 8.47413C15.0601 8.63204 15.2092 8.74077 15.3818 8.76124L21.3857 9.47316C21.8094 9.52339 21.9791 10.0472 21.6659 10.3369L17.2278 14.4419C17.1001 14.56 17.0433 14.7357 17.0771 14.9063L18.255 20.8359C18.3382 21.2544 17.8928 21.5787 17.5205 21.3703L12.2451 18.4166C12.0934 18.3317 11.9091 18.3321 11.7573 18.417L6.48144 21.3695C6.10913 21.5779 5.66294 21.2544 5.74609 20.8359L6.92414 14.9066C6.95803 14.7361 6.90134 14.5599 6.77367 14.4419L2.33496 10.3368Z" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      </svg>`;
      case 'star-yellow':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <g id="Interface / Star">
      <path id="Vector" d="M2.33496 10.3368C2.02171 10.0471 2.19187 9.52339 2.61557 9.47316L8.61914 8.76107C8.79182 8.74059 8.94181 8.63215 9.01465 8.47425L11.5469 2.98446C11.7256 2.59703 12.2764 2.59695 12.4551 2.98439L14.9873 8.47413C15.0601 8.63204 15.2092 8.74077 15.3818 8.76124L21.3857 9.47316C21.8094 9.52339 21.9791 10.0472 21.6659 10.3369L17.2278 14.4419C17.1001 14.56 17.0433 14.7357 17.0771 14.9063L18.255 20.8359C18.3382 21.2544 17.8928 21.5787 17.5205 21.3703L12.2451 18.4166C12.0934 18.3317 11.9091 18.3321 11.7573 18.417L6.48144 21.3695C6.10913 21.5779 5.66294 21.2544 5.74609 20.8359L6.92414 14.9066C6.95803 14.7361 6.90134 14.5599 6.77367 14.4419L2.33496 10.3368Z" stroke="#FFC300" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      </svg>`;
      case 'grid':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 -5 20 20" id="meteor-icon-kit__solid-grip-lines" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 8.5C0 7.6716 0.67157 7 1.5 7H18.5C19.3284 7 20 7.6716 20 8.5C20 9.3284 19.3284 10 18.5 10H1.5C0.67157 10 0 9.3284 0 8.5zM0 1.5C0 0.67157 0.67157 0 1.5 0H18.5C19.3284 0 20 0.67157 20 1.5C20 2.32843 19.3284 3 18.5 3H1.5C0.67157 3 0 2.32843 0 1.5z" fill="gray"/></svg>`;
      case 'grid-yellow':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 -5 20 20" id="meteor-icon-kit__solid-grip-lines" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 8.5C0 7.6716 0.67157 7 1.5 7H18.5C19.3284 7 20 7.6716 20 8.5C20 9.3284 19.3284 10 18.5 10H1.5C0.67157 10 0 9.3284 0 8.5zM0 1.5C0 0.67157 0.67157 0 1.5 0H18.5C19.3284 0 20 0.67157 20 1.5C20 2.32843 19.3284 3 18.5 3H1.5C0.67157 3 0 2.32843 0 1.5z" fill="#FFC300"/></svg>`;
      case 'list':
        return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="h-4 w-4" viewBox="0 0 24 24" version="1.1">
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
  </svg>`;
      case 'list-yellow':
        return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="h-4 w-4" viewBox="0 0 24 24" version="1.1">
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
  </svg>`;
      case 'next':
        return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="gray" class="h-4 w-4 " version="1.1" id="Layer_1" width="800px" height="800px" viewBox="0 0 8 8" enable-background="new 0 0 8 8" xml:space="preserve">
      <rect x="2.95" y="1.921" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 7.6689 8.4842)" width="5.283" height="1.466"/>
      <rect x="0.024" y="3.157" width="6.375" height="1.683"/>
      <rect x="2.956" y="4.615" transform="matrix(-0.7069 0.7073 -0.7073 -0.7069 13.3369 5.1684)" width="5.284" height="1.465"/>
      </svg>`  
      case 'previous':
        return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="gray" class="h-4 w-4 " version="1.1" id="Layer_1"  viewBox="0 0 8 8" enable-background="new 0 0 8 8" xml:space="preserve">
      <rect x="-0.226" y="4.614" transform="matrix(0.7071 0.7071 -0.7071 0.7071 4.4884 -0.1417)" width="5.283" height="1.466"/>
      <rect x="1.607" y="3.161" width="6.375" height="1.683"/>
      <rect x="-0.233" y="1.921" transform="matrix(0.7069 -0.7073 0.7073 0.7069 -1.1708 2.4817)" width="5.284" height="1.465"/>
      </svg>`   
      case 'setting':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " viewBox="0 0 24 24" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8.00002C9.79085 8.00002 7.99999 9.79088 7.99999 12C7.99999 14.2092 9.79085 16 12 16C14.2091 16 16 14.2092 16 12C16 9.79088 14.2091 8.00002 12 8.00002ZM9.99999 12C9.99999 10.8955 10.8954 10 12 10C13.1046 10 14 10.8955 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 9.99999 13.1046 9.99999 12Z" fill="gray"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8.00002C9.79085 8.00002 7.99999 9.79088 7.99999 12C7.99999 14.2092 9.79085 16 12 16C14.2091 16 16 14.2092 16 12C16 9.79088 14.2091 8.00002 12 8.00002ZM9.99999 12C9.99999 10.8955 10.8954 10 12 10C13.1046 10 14 10.8955 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 9.99999 13.1046 9.99999 12Z" fill="gray"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7673 1.01709C10.9925 0.999829 11.2454 0.99993 11.4516 1.00001L12.5484 1.00001C12.7546 0.99993 13.0075 0.999829 13.2327 1.01709C13.4989 1.03749 13.8678 1.08936 14.2634 1.26937C14.7635 1.49689 15.1915 1.85736 15.5007 2.31147C15.7454 2.67075 15.8592 3.0255 15.9246 3.2843C15.9799 3.50334 16.0228 3.75249 16.0577 3.9557L16.1993 4.77635L16.2021 4.77788C16.2369 4.79712 16.2715 4.81659 16.306 4.8363L16.3086 4.83774L17.2455 4.49865C17.4356 4.42978 17.6693 4.34509 17.8835 4.28543C18.1371 4.2148 18.4954 4.13889 18.9216 4.17026C19.4614 4.20998 19.9803 4.39497 20.4235 4.70563C20.7734 4.95095 21.0029 5.23636 21.1546 5.4515C21.2829 5.63326 21.4103 5.84671 21.514 6.02029L22.0158 6.86003C22.1256 7.04345 22.2594 7.26713 22.3627 7.47527C22.4843 7.7203 22.6328 8.07474 22.6777 8.52067C22.7341 9.08222 22.6311 9.64831 22.3803 10.1539C22.1811 10.5554 21.9171 10.8347 21.7169 11.0212C21.5469 11.1795 21.3428 11.3417 21.1755 11.4746L20.5 12L21.1755 12.5254C21.3428 12.6584 21.5469 12.8205 21.7169 12.9789C21.9171 13.1653 22.1811 13.4446 22.3802 13.8461C22.631 14.3517 22.7341 14.9178 22.6776 15.4794C22.6328 15.9253 22.4842 16.2797 22.3626 16.5248C22.2593 16.7329 22.1255 16.9566 22.0158 17.14L21.5138 17.9799C21.4102 18.1535 21.2828 18.3668 21.1546 18.5485C21.0028 18.7637 20.7734 19.0491 20.4234 19.2944C19.9803 19.6051 19.4613 19.7901 18.9216 19.8298C18.4954 19.8612 18.1371 19.7852 17.8835 19.7146C17.6692 19.6549 17.4355 19.5703 17.2454 19.5014L16.3085 19.1623L16.306 19.1638C16.2715 19.1835 16.2369 19.2029 16.2021 19.2222L16.1993 19.2237L16.0577 20.0443C16.0228 20.2475 15.9799 20.4967 15.9246 20.7157C15.8592 20.9745 15.7454 21.3293 15.5007 21.6886C15.1915 22.1427 14.7635 22.5032 14.2634 22.7307C13.8678 22.9107 13.4989 22.9626 13.2327 22.983C13.0074 23.0002 12.7546 23.0001 12.5484 23H11.4516C11.2454 23.0001 10.9925 23.0002 10.7673 22.983C10.5011 22.9626 10.1322 22.9107 9.73655 22.7307C9.23648 22.5032 8.80849 22.1427 8.49926 21.6886C8.25461 21.3293 8.14077 20.9745 8.07542 20.7157C8.02011 20.4967 7.97723 20.2475 7.94225 20.0443L7.80068 19.2237L7.79791 19.2222C7.7631 19.2029 7.72845 19.1835 7.69396 19.1637L7.69142 19.1623L6.75458 19.5014C6.5645 19.5702 6.33078 19.6549 6.11651 19.7146C5.86288 19.7852 5.50463 19.8611 5.07841 19.8298C4.53866 19.7901 4.01971 19.6051 3.57654 19.2944C3.2266 19.0491 2.99714 18.7637 2.84539 18.5485C2.71718 18.3668 2.58974 18.1534 2.4861 17.9798L1.98418 17.14C1.87447 16.9566 1.74067 16.7329 1.63737 16.5248C1.51575 16.2797 1.36719 15.9253 1.32235 15.4794C1.26588 14.9178 1.36897 14.3517 1.61976 13.8461C1.81892 13.4446 2.08289 13.1653 2.28308 12.9789C2.45312 12.8205 2.65717 12.6584 2.82449 12.5254L3.47844 12.0054V11.9947L2.82445 11.4746C2.65712 11.3417 2.45308 11.1795 2.28304 11.0212C2.08285 10.8347 1.81888 10.5554 1.61972 10.1539C1.36893 9.64832 1.26584 9.08224 1.3223 8.52069C1.36714 8.07476 1.51571 7.72032 1.63732 7.47528C1.74062 7.26715 1.87443 7.04347 1.98414 6.86005L2.48605 6.02026C2.58969 5.84669 2.71714 5.63326 2.84534 5.45151C2.9971 5.23637 3.22655 4.95096 3.5765 4.70565C4.01966 4.39498 4.53862 4.20999 5.07837 4.17027C5.50458 4.1389 5.86284 4.21481 6.11646 4.28544C6.33072 4.34511 6.56444 4.4298 6.75451 4.49867L7.69141 4.83775L7.69394 4.8363C7.72844 4.8166 7.7631 4.79712 7.79791 4.77788L7.80068 4.77635L7.94225 3.95571C7.97723 3.7525 8.02011 3.50334 8.07542 3.2843C8.14077 3.0255 8.25461 2.67075 8.49926 2.31147C8.80849 1.85736 9.23648 1.49689 9.73655 1.26937C10.1322 1.08936 10.5011 1.03749 10.7673 1.01709ZM14.0938 4.3363C14.011 3.85634 13.9696 3.61637 13.8476 3.43717C13.7445 3.2858 13.6019 3.16564 13.4352 3.0898C13.2378 3.00002 12.9943 3.00002 12.5073 3.00002H11.4927C11.0057 3.00002 10.7621 3.00002 10.5648 3.0898C10.3981 3.16564 10.2555 3.2858 10.1524 3.43717C10.0304 3.61637 9.98895 3.85634 9.90615 4.3363L9.75012 5.24064C9.69445 5.56333 9.66662 5.72467 9.60765 5.84869C9.54975 5.97047 9.50241 6.03703 9.40636 6.13166C9.30853 6.22804 9.12753 6.3281 8.76554 6.52822C8.73884 6.54298 8.71227 6.55791 8.68582 6.57302C8.33956 6.77078 8.16643 6.86966 8.03785 6.90314C7.91158 6.93602 7.83293 6.94279 7.70289 6.93196C7.57049 6.92094 7.42216 6.86726 7.12551 6.7599L6.11194 6.39308C5.66271 6.2305 5.43809 6.14921 5.22515 6.16488C5.04524 6.17811 4.87225 6.23978 4.72453 6.34333C4.5497 6.46589 4.42715 6.67094 4.18206 7.08103L3.72269 7.84965C3.46394 8.2826 3.33456 8.49907 3.31227 8.72078C3.29345 8.90796 3.32781 9.09665 3.41141 9.26519C3.51042 9.4648 3.7078 9.62177 4.10256 9.9357L4.82745 10.5122C5.07927 10.7124 5.20518 10.8126 5.28411 10.9199C5.36944 11.036 5.40583 11.1114 5.44354 11.2504C5.47844 11.379 5.47844 11.586 5.47844 12C5.47844 12.414 5.47844 12.621 5.44354 12.7497C5.40582 12.8887 5.36944 12.9641 5.28413 13.0801C5.20518 13.1875 5.07927 13.2876 4.82743 13.4879L4.10261 14.0643C3.70785 14.3783 3.51047 14.5352 3.41145 14.7349C3.32785 14.9034 3.29349 15.0921 3.31231 15.2793C3.33461 15.501 3.46398 15.7174 3.72273 16.1504L4.1821 16.919C4.4272 17.3291 4.54974 17.5342 4.72457 17.6567C4.8723 17.7603 5.04528 17.8219 5.2252 17.8352C5.43813 17.8508 5.66275 17.7695 6.11199 17.607L7.12553 17.2402C7.42216 17.1328 7.5705 17.0791 7.7029 17.0681C7.83294 17.0573 7.91159 17.064 8.03786 17.0969C8.16644 17.1304 8.33956 17.2293 8.68582 17.427C8.71228 17.4421 8.73885 17.4571 8.76554 17.4718C9.12753 17.6719 9.30853 17.772 9.40635 17.8684C9.50241 17.963 9.54975 18.0296 9.60765 18.1514C9.66662 18.2754 9.69445 18.4367 9.75012 18.7594L9.90615 19.6637C9.98895 20.1437 10.0304 20.3837 10.1524 20.5629C10.2555 20.7142 10.3981 20.8344 10.5648 20.9102C10.7621 21 11.0057 21 11.4927 21H12.5073C12.9943 21 13.2378 21 13.4352 20.9102C13.6019 20.8344 13.7445 20.7142 13.8476 20.5629C13.9696 20.3837 14.011 20.1437 14.0938 19.6637L14.2499 18.7594C14.3055 18.4367 14.3334 18.2754 14.3923 18.1514C14.4502 18.0296 14.4976 17.963 14.5936 17.8684C14.6915 17.772 14.8725 17.6719 15.2344 17.4718C15.2611 17.4571 15.2877 17.4421 15.3141 17.427C15.6604 17.2293 15.8335 17.1304 15.9621 17.0969C16.0884 17.064 16.167 17.0573 16.2971 17.0681C16.4295 17.0791 16.5778 17.1328 16.8744 17.2402L17.888 17.607C18.3372 17.7696 18.5619 17.8509 18.7748 17.8352C18.9547 17.8219 19.1277 17.7603 19.2754 17.6567C19.4502 17.5342 19.5728 17.3291 19.8179 16.919L20.2773 16.1504C20.536 15.7175 20.6654 15.501 20.6877 15.2793C20.7065 15.0921 20.6721 14.9034 20.5885 14.7349C20.4895 14.5353 20.2921 14.3783 19.8974 14.0643L19.1726 13.4879C18.9207 13.2876 18.7948 13.1875 18.7159 13.0801C18.6306 12.9641 18.5942 12.8887 18.5564 12.7497C18.5215 12.6211 18.5215 12.414 18.5215 12C18.5215 11.586 18.5215 11.379 18.5564 11.2504C18.5942 11.1114 18.6306 11.036 18.7159 10.9199C18.7948 10.8126 18.9207 10.7124 19.1725 10.5122L19.8974 9.9357C20.2922 9.62176 20.4896 9.46479 20.5886 9.26517C20.6722 9.09664 20.7065 8.90795 20.6877 8.72076C20.6654 8.49906 20.5361 8.28259 20.2773 7.84964L19.8179 7.08102C19.5728 6.67093 19.4503 6.46588 19.2755 6.34332C19.1277 6.23977 18.9548 6.1781 18.7748 6.16486C18.5619 6.14919 18.3373 6.23048 17.888 6.39307L16.8745 6.75989C16.5778 6.86725 16.4295 6.92093 16.2971 6.93195C16.167 6.94278 16.0884 6.93601 15.9621 6.90313C15.8335 6.86965 15.6604 6.77077 15.3142 6.57302C15.2877 6.55791 15.2611 6.54298 15.2345 6.52822C14.8725 6.3281 14.6915 6.22804 14.5936 6.13166C14.4976 6.03703 14.4502 5.97047 14.3923 5.84869C14.3334 5.72467 14.3055 5.56332 14.2499 5.24064L14.0938 4.3363Z" fill="gray"/>
      </svg>` 
      case 'add':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 "  viewBox="0 0 22 22" fill="none">
      <path d="M7 12L12 12M12 12L17 12M12 12V7M12 12L12 17" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="12" r="9" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`
      case 'add-5':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 "  viewBox="0 0 22 22" fill="none">
      <path d="M7 12L12 12M12 12L17 12M12 12V7M12 12L12 17" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="12" r="9" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`
      case 'add-white':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 "  viewBox="0 0 22 22" fill="none">
      <path d="M7 12L12 12M12 12L17 12M12 12V7M12 12L12 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="12" r="9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`
      case 'add-go':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 "  viewBox="0 0 22 22" fill="none">
      <path d="M7 12L12 12M12 12L17 12M12 12V7M12 12L12 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="12" r="9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`
      case 'pin-yellow':
        return `<svg xmlns="http://www.w3.org/2000/svg" transform="rotate(-45)" class="h-4 w-4 " viewBox="0 0 15 15" fill="none">
      <path d="M0.5 14.5L5 10M0.5 5.5L9.5 14.5M8.5 0.5L14.5 6.5M1.5 6.5L9.5 1.5M8.5 13.5L13.5 5.5" stroke="#FFC300"/>
      </svg>`
      case 'pin-gray':
        return `<svg xmlns="http://www.w3.org/2000/svg" transform="rotate(-45)" class="h-4 w-4 " viewBox="0 0 15 15" fill="none">
      <path d="M0.5 14.5L5 10M0.5 5.5L9.5 14.5M8.5 0.5L14.5 6.5M1.5 6.5L9.5 1.5M8.5 13.5L13.5 5.5" stroke="gray"/>
      </svg>`
      case 'fork':
        return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="gray" class="h-4 w-4 " viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet">
      <path d="M24,10V6a2,2,0,0,0-2-2H6A2,2,0,0,0,4,6V22a2,2,0,0,0,2,2h4V12a2,2,0,0,1,2-2Z" class="clr-i-solid clr-i-solid-path-1"/><path d="M30,12H14a2,2,0,0,0-2,2V30a2,2,0,0,0,2,2H30a2,2,0,0,0,2-2V14A2,2,0,0,0,30,12ZM28,23H23v5H21V23H16V21h5V16h2v5h5Z" class="clr-i-solid clr-i-solid-path-2"/>
      <rect x="0" y="0" width="36" height="36" fill-opacity="0"/>
  </svg>`
      case 'fork-yellow':
        return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#FFC300" class="h-4 w-4 " viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet">
      <path d="M24,10V6a2,2,0,0,0-2-2H6A2,2,0,0,0,4,6V22a2,2,0,0,0,2,2h4V12a2,2,0,0,1,2-2Z" class="clr-i-solid clr-i-solid-path-1"/><path d="M30,12H14a2,2,0,0,0-2,2V30a2,2,0,0,0,2,2H30a2,2,0,0,0,2-2V14A2,2,0,0,0,30,12ZM28,23H23v5H21V23H16V21h5V16h2v5h5Z" class="clr-i-solid clr-i-solid-path-2"/>
      <rect x="0" y="0" width="36" height="36" fill-opacity="0"/>
  </svg>`
      case 'import':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " viewBox="0 0 24 24" fill="none">
      <path d="M12.44 14.75H3.75C3.34 14.75 3 14.41 3 14C3 13.59 3.34 13.25 3.75 13.25H12.44L10.72 11.53C10.43 11.24 10.43 10.76 10.72 10.47C11.01 10.18 11.49 10.18 11.78 10.47L14.78 13.47C14.85 13.54 14.9 13.62 14.94 13.71C15.02 13.89 15.02 14.1 14.94 14.28C14.9 14.37 14.85 14.45 14.78 14.52L11.78 17.52C11.63 17.67 11.44 17.74 11.25 17.74C11.06 17.74 10.87 17.67 10.72 17.52C10.43 17.23 10.43 16.75 10.72 16.46L12.44 14.74V14.75ZM21 9.5V18C21 19.52 19.77 20.75 18.25 20.75H10.75C9.23 20.75 8 19.52 8 18V17C8 16.59 8.34 16.25 8.75 16.25C9.16 16.25 9.5 16.59 9.5 17V18C9.5 18.69 10.06 19.25 10.75 19.25H18.25C18.94 19.25 19.5 18.69 19.5 18V10.25H14.75C14.34 10.25 14 9.91 14 9.5V4.75H10.75C10.06 4.75 9.5 5.31 9.5 6V11C9.5 11.41 9.16 11.75 8.75 11.75C8.34 11.75 8 11.41 8 11V6C8 4.48 9.23 3.25 10.75 3.25H14.75C14.95 3.25 15.14 3.33 15.28 3.47L20.78 8.97C20.92 9.11 21 9.3 21 9.5ZM15.5 8.75H18.44L15.5 5.81V8.75Z" fill="gray"/>
      </svg>`
      case 'import-h5':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 " viewBox="0 0 24 24" fill="none">
      <path d="M12.44 14.75H3.75C3.34 14.75 3 14.41 3 14C3 13.59 3.34 13.25 3.75 13.25H12.44L10.72 11.53C10.43 11.24 10.43 10.76 10.72 10.47C11.01 10.18 11.49 10.18 11.78 10.47L14.78 13.47C14.85 13.54 14.9 13.62 14.94 13.71C15.02 13.89 15.02 14.1 14.94 14.28C14.9 14.37 14.85 14.45 14.78 14.52L11.78 17.52C11.63 17.67 11.44 17.74 11.25 17.74C11.06 17.74 10.87 17.67 10.72 17.52C10.43 17.23 10.43 16.75 10.72 16.46L12.44 14.74V14.75ZM21 9.5V18C21 19.52 19.77 20.75 18.25 20.75H10.75C9.23 20.75 8 19.52 8 18V17C8 16.59 8.34 16.25 8.75 16.25C9.16 16.25 9.5 16.59 9.5 17V18C9.5 18.69 10.06 19.25 10.75 19.25H18.25C18.94 19.25 19.5 18.69 19.5 18V10.25H14.75C14.34 10.25 14 9.91 14 9.5V4.75H10.75C10.06 4.75 9.5 5.31 9.5 6V11C9.5 11.41 9.16 11.75 8.75 11.75C8.34 11.75 8 11.41 8 11V6C8 4.48 9.23 3.25 10.75 3.25H14.75C14.95 3.25 15.14 3.33 15.28 3.47L20.78 8.97C20.92 9.11 21 9.3 21 9.5ZM15.5 8.75H18.44L15.5 5.81V8.75Z" fill="gray"/>
      </svg>`
      case 'import-yellow':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 "  viewBox="0 0 16 16">
      <path fill="#FFC300" fill-rule="evenodd" d="M14,9 C14.5523,9 15,9.44772 15,10 L15,13 C15,14.1046 14.1046,15 13,15 L3,15 C1.89543,15 1,14.1046 1,13 L1,10 C1,9.44772 1.44772,9 2,9 C2.55228,9 3,9.44771 3,10 L3,13 L13,13 L13,10 C13,9.44771 13.4477,9 14,9 Z M8,1 C8.55228,1 9,1.44772 9,2 L9,6.58579 L10.2929,5.29289 C10.6834,4.90237 11.3166,4.90237 11.7071,5.29289 C12.0976,5.68342 12.0976,6.31658 11.7071,6.70711 L8,10.4142 L4.29289,6.70711 C3.90237,6.31658 3.90237,5.68342 4.29289,5.29289 C4.68342,4.90237 5.31658,4.90237 5.70711,5.29289 L7,6.58579 L7,2 C7,1.44772 7.44772,1 8,1 Z"/>
    </svg>`
      case 'export':
     return  `<svg xmlns="http://www.w3.org/2000/svg" fill="gray" class="h-4 w-4 " viewBox="0 0 256 256" id="Flat">
   <path d="M71.51465,88.48535a12.0001,12.0001,0,0,1,16.9707-16.9707L116,99.0293V24a12,12,0,0,1,24,0V99.0293l27.51465-27.51465a12.0001,12.0001,0,0,1,16.9707,16.9707l-48,48c-.01855.01856-.03906.03369-.05762.05225q-.394.38892-.82128.7417c-.14112.11621-.29.21728-.43555.32617-.168.12549-.33252.25586-.50733.37305-.17138.11425-.34912.21386-.5249.31836-.16015.09619-.31738.19677-.48291.28564-.17822.09521-.36133.17578-.543.26172-.17334.08154-.34326.168-.521.2417-.17676.07324-.35742.13183-.53711.19629-.18946.06836-.377.14111-.57129.20019-.17969.0542-.36182.09375-.543.13965-.19824.04981-.394.10547-.59619.14551-.2085.041-.41944.06592-.62988.09619-.17676.02539-.35108.05908-.53077.07666C128.79,139.979,128.395,140,128,140s-.79-.021-1.18359-.05957c-.17969-.01758-.354-.05127-.53077-.07666-.21044-.03027-.42138-.05518-.62988-.09619-.20215-.04-.39795-.0957-.59619-.14551-.18115-.0459-.36328-.08545-.543-.13965-.19433-.05908-.38232-.13183-.57226-.20019-.1792-.06446-.35938-.12305-.53614-.19629-.17773-.07373-.34814-.16016-.52148-.24219-.18164-.08545-.36475-.166-.54248-.26123-.16553-.08887-.32276-.18945-.48291-.28564-.17578-.1045-.35352-.20411-.5249-.31836-.17481-.11719-.33936-.24756-.50733-.37305-.14551-.10889-.29443-.21-.43555-.32617q-.42846-.35157-.82128-.7417c-.01856-.01856-.03907-.03369-.05762-.05225ZM204,168a16,16,0,1,0-16,16A16.01833,16.01833,0,0,0,204,168Zm20-52H184.56836a12,12,0,1,0,0,24H220v56H36V140H71.43164a12,12,0,1,0,0-24H32a20.02229,20.02229,0,0,0-20,20v64a20.02229,20.02229,0,0,0,20,20H224a20.02229,20.02229,0,0,0,20-20V136A20.02229,20.02229,0,0,0,224,116Z"/>
 </svg>`
      case 'go-back':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " viewBox="0 0 16 16">
      <path fill="gray" fill-rule="evenodd" d="M4.297105,3.29289 L0.59,7 L4.297105,10.7071 C4.687635,11.0976 5.320795,11.0976 5.711315,10.7071 C6.101845,10.3166 6.101845,9.68342 5.711315,9.29289 L4.418425,8 L11.504215,8 C12.332615,8 13.004215,8.67157 13.004215,9.5 C13.004215,10.3284 12.332615,11 11.504215,11 L10.004215,11 C9.451935,11 9.004215,11.4477 9.004215,12 C9.004215,12.5523 9.451935,13 10.004215,13 L11.504215,13 C13.437215,13 15.004215,11.433 15.004215,9.5 C15.004215,7.567 13.437215,6 11.504215,6 L4.418425,6 L5.711315,4.70711 C6.101845,4.31658 6.101845,3.68342 5.711315,3.29289 C5.320795,2.90237 4.687635,2.90237 4.297105,3.29289 Z"/>
    </svg>`
      case 'copy':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " viewBox="0 0 24 24" fill="none">
      <g id="Edit / Copy">
      <path id="Vector" d="M9 9V6.2002C9 5.08009 9 4.51962 9.21799 4.0918C9.40973 3.71547 9.71547 3.40973 10.0918 3.21799C10.5196 3 11.0801 3 12.2002 3H17.8002C18.9203 3 19.4801 3 19.9079 3.21799C20.2842 3.40973 20.5905 3.71547 20.7822 4.0918C21.0002 4.51962 21.0002 5.07967 21.0002 6.19978V11.7998C21.0002 12.9199 21.0002 13.48 20.7822 13.9078C20.5905 14.2841 20.2839 14.5905 19.9076 14.7822C19.4802 15 18.921 15 17.8031 15H15M9 9H6.2002C5.08009 9 4.51962 9 4.0918 9.21799C3.71547 9.40973 3.40973 9.71547 3.21799 10.0918C3 10.5196 3 11.0801 3 12.2002V17.8002C3 18.9203 3 19.4801 3.21799 19.9079C3.40973 20.2842 3.71547 20.5905 4.0918 20.7822C4.5192 21 5.07899 21 6.19691 21H11.8036C12.9215 21 13.4805 21 13.9079 20.7822C14.2842 20.5905 14.5905 20.2839 14.7822 19.9076C15 19.4802 15 18.921 15 17.8031V15M9 9H11.8002C12.9203 9 13.4801 9 13.9079 9.21799C14.2842 9.40973 14.5905 9.71547 14.7822 10.0918C15 10.5192 15 11.079 15 12.1969L15 15" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      </svg>`
      case 'horizontal-menu':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " viewBox="0 0 24 24" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M4 12C4 11.4477 4.44772 11 5 11C5.55228 11 6 11.4477 6 12C6 12.5523 5.55228 13 5 13C4.44772 13 4 12.5523 4 12ZM5 15C6.65685 15 8 13.6569 8 12C8 10.3431 6.65685 9 5 9C3.34315 9 2 10.3431 2 12C2 13.6569 3.34315 15 5 15ZM12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11ZM15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12ZM19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11ZM22 12C22 13.6569 20.6569 15 19 15C17.3431 15 16 13.6569 16 12C16 10.3431 17.3431 9 19 9C20.6569 9 22 10.3431 22 12Z" fill="gray"/>
      </svg>`
      case 'drag-hand':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " fill="gray" width="800px" height="800px" viewBox="0 0 24 24"><script xmlns=""/>
      <path d="M6,7 L3.70710678,7 L3.85355339,7.14644661 C4.04881554,7.34170876 4.04881554,7.65829124 3.85355339,7.85355339 C3.65829124,8.04881554 3.34170876,8.04881554 3.14644661,7.85355339 L2.14644661,6.85355339 C1.95118446,6.65829124 1.95118446,6.34170876 2.14644661,6.14644661 L3.14644661,5.14644661 C3.34170876,4.95118446 3.65829124,4.95118446 3.85355339,5.14644661 C4.04881554,5.34170876 4.04881554,5.65829124 3.85355339,5.85355339 L3.70710678,6 L6,6 L6,3.70710678 L5.85355339,3.85355339 C5.65829124,4.04881554 5.34170876,4.04881554 5.14644661,3.85355339 C4.95118446,3.65829124 4.95118446,3.34170876 5.14644661,3.14644661 L6.14644661,2.14644661 C6.34170876,1.95118446 6.65829124,1.95118446 6.85355339,2.14644661 L7.85355339,3.14644661 C8.04881554,3.34170876 8.04881554,3.65829124 7.85355339,3.85355339 C7.65829124,4.04881554 7.34170876,4.04881554 7.14644661,3.85355339 L7,3.70710678 L7,6 L9.29289322,6 L9.14644661,5.85355339 C8.95118446,5.65829124 8.95118446,5.34170876 9.14644661,5.14644661 C9.34170876,4.95118446 9.65829124,4.95118446 9.85355339,5.14644661 L10.8535534,6.14644661 C11.0488155,6.34170876 11.0488155,6.65829124 10.8535534,6.85355339 L9.85355339,7.85355339 C9.65829124,8.04881554 9.34170876,8.04881554 9.14644661,7.85355339 C8.95118446,7.65829124 8.95118446,7.34170876 9.14644661,7.14644661 L9.29289322,7 L7,7 L7,9.29289322 L7.14644661,9.14644661 C7.34170876,8.95118446 7.65829124,8.95118446 7.85355339,9.14644661 C8.04881554,9.34170876 8.04881554,9.65829124 7.85355339,9.85355339 L6.85355339,10.8535534 C6.65829124,11.0488155 6.34170876,11.0488155 6.14644661,10.8535534 L5.14644661,9.85355339 C4.95118446,9.65829124 4.95118446,9.34170876 5.14644661,9.14644661 C5.34170876,8.95118446 5.65829124,8.95118446 5.85355339,9.14644661 L6,9.29289322 L6,7 Z M14,9.5 L14,12.0474376 C14,12.3783481 13.8839855,12.698786 13.6721417,12.9529985 C13.1720143,13.5531514 12.2800608,13.6342381 11.6799078,13.1341106 L10.7560738,12.3642489 C10.4736449,12.1288916 10.11764,12 9.75,12 C9.48363526,12 9.24082605,12.1526146 9.12532205,12.3926334 L9.08962348,12.4668155 C8.95447865,12.7476481 8.99541029,13.0814869 9.19439734,13.321352 L13.607865,18.6414804 C14.3217788,19.502054 15.3818498,20 16.5,20 C18.9852814,20 21,17.9852814 21,15.5 L21,11.5 C21,11.2238576 20.7761424,11 20.5,11 C20.2238576,11 20,11.2238576 20,11.5 L20,12.5 C20,12.7761424 19.7761424,13 19.5,13 C19.2238576,13 19,12.7761424 19,12.5 L19,10.5 C19,10.2238576 18.7761424,10 18.5,10 C18.2238576,10 18,10.2238576 18,10.5 L18,12.5 C18,12.7761424 17.7761424,13 17.5,13 C17.2238576,13 17,12.7761424 17,12.5 L17,9.5 C17,9.22385763 16.7761424,9 16.5,9 C16.2238576,9 16,9.22385763 16,9.5 L16,12.5 C16,12.7761424 15.7761424,13 15.5,13 C15.2238576,13 15,12.7761424 15,12.5 L15,5.5 C15,5.22385763 14.7761424,5 14.5,5 C14.2238576,5 14,5.22385763 14,5.5 L14,9.5 Z M13,9.49999997 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 C15.3284271,4 16,4.67157288 16,5.5 L16,8.08535285 C16.1563895,8.03007711 16.3246823,8 16.5,8 C17.191734,8 17.7741062,8.46823386 17.9474595,9.10504462 C18.1184541,9.03725677 18.3048761,9 18.5,9 C19.191734,9 19.7741062,9.46823386 19.9474595,10.1050446 C20.1184541,10.0372568 20.3048761,10 20.5,10 C21.3284271,10 22,10.6715729 22,11.5 L22,15.5 C22,18.5375661 19.5375661,21 16.5,21 C15.0842933,21 13.7421216,20.3695431 12.8382246,19.279958 L8.42475695,13.9598296 C7.97611908,13.4190278 7.88383427,12.6663521 8.18853292,12.0331845 L8.2242315,11.9590024 C8.50634865,11.3727595 9.09940726,11 9.75,11 C10.3515765,11 10.9341143,11.2109078 11.3962582,11.5960277 L12.3200922,12.3658894 C12.4959683,12.5124527 12.7573571,12.4886901 12.9039205,12.3128141 C12.9660017,12.2383166 13,12.1444116 13,12.0474376 L13,9.5 Z"/>
    </svg>`
      case 'no-txt-logo-light':
        return `<svg id="Layer_1" style="width:5em; margin-left:25%;"  data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 198.6 198.6"><defs><style>.cls-1{fill:#505d69;stroke:#505d69;stroke-miterlimit:10;stroke-width:4px;}.cls-2{fill:#fff;}</style></defs><rect class="cls-1" x="3.35" y="3.11" width="192.39" height="192.39" rx="20"/><path class="cls-2" d="M120.14,132.35,107.07,116,89.16,93.72l0,0L57.14,53.6a5,5,0,0,0-3.91-1.88v0H34.45a5,5,0,0,0-4.3,7.67L71.79,144.1a5,5,0,0,0,6.71,2.3,5,5,0,0,0,1.67-1.32L93,129.5l-6.43-8-9.16,11.18L42.51,61.76h8.33l40,49.95,12.35,15.38,0,0,14,17.47a5,5,0,0,0,2,1.72,5,5,0,0,0,6.69-2.4l42.68-84.71a5,5,0,0,0,.64-2.46,5,5,0,0,0-5-5h-18v0a5,5,0,0,0-3.87,1.83l-37,45.11,6.42,8,36.8-44.88h7.65l-36,70.59Z"/></svg>`
      case 'no-txt-logo-dark':
        return `<svg id="Layer_1" style="width:5em; margin-left:25%;" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200.7 200.7"><defs><style>.cls-1{fill:none;stroke:#fff;stroke-miterlimit:10;stroke-width:4px;}.cls-2{fill:#fff;}</style></defs><rect class="cls-1" x="4.3" y="4.51" width="192.39" height="192.39" rx="20"/><path class="cls-2" d="M121.08,133.74,108,117.41,90.1,95.12l.05,0L58.09,55a5,5,0,0,0-3.92-1.88v0H35.39a5,5,0,0,0-4.29,7.67L72.73,145.5a5,5,0,0,0,6.71,2.3,4.85,4.85,0,0,0,1.67-1.32L93.89,130.9l-6.42-8L78.3,134.09,43.45,63.16h8.34l39.95,50,12.36,15.37,0,0L118,146a4.94,4.94,0,0,0,2,1.71,5,5,0,0,0,6.68-2.39l42.68-84.71a5,5,0,0,0-4.39-7.5h-18v0a5,5,0,0,0-3.87,1.83l-37,45.11,6.42,8,36.8-44.88h7.65l-36,70.59Z"/></svg>`
      case 'reload':
        return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="gray" class="h-4 w-4 " version="1.1" id="Capa_1" viewBox="0 0 489.533 489.533" xml:space="preserve"><link xmlns="" type="text/css" rel="stylesheet" id="dark-mode-custom-link"/><link xmlns="" type="text/css" rel="stylesheet" id="dark-mode-general-link"/><style xmlns="" lang="en" type="text/css" id="dark-mode-custom-style"/><style xmlns="" lang="en" type="text/css" id="dark-mode-native-style"/><style xmlns="" lang="en" type="text/css" id="dark-mode-native-sheet"/>
      <g>
        <path d="M268.175,488.161c98.2-11,176.9-89.5,188.1-187.7c14.7-128.4-85.1-237.7-210.2-239.1v-57.6c0-3.2-4-4.9-6.7-2.9   l-118.6,87.1c-2,1.5-2,4.4,0,5.9l118.6,87.1c2.7,2,6.7,0.2,6.7-2.9v-57.5c87.9,1.4,158.3,76.2,152.3,165.6   c-5.1,76.9-67.8,139.3-144.7,144.2c-81.5,5.2-150.8-53-163.2-130c-2.3-14.3-14.8-24.7-29.2-24.7c-17.9,0-31.9,15.9-29.1,33.6   C49.575,418.961,150.875,501.261,268.175,488.161z"/>
      </g>
      </svg>`

    }
  };

  const css = function (name) {
    name = Array.isArray(name) ? name[0] : name;

    switch (name) {
      case 'VersionInfo':
        return 'flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm';
      case 'ExportButton':
        return 'flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm';
      case 'column':
        return 'flex flex-col gap-3.5 flex-1';
      case 'h2':
        return (
          'text-lg font-normal">' +
          AppSlogan +
          '</h2><ul class="flex flex-col gap-3.5 mb-4'
        );
      case 'h3':
        return 'm-0 tracking-tight leading-8 text-gray-900 dark:text-gray-100 text-lg font-bold';
      case 'ul':
        return 'gap-3.5';
      case 'card':
        return 'flex flex-col gap-1 w-full bg-gray-50 dark:bg-white/5 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900 text-left border shadow border-gray-300 dark:border-gray-700 hover:shadow-lg transition duration-300 ease-in-out tw-border-2 tw-border-blue-500 tw-rounded-xl';
      case 'p':
        return 'm-0 font-light text-gray-500';
      case 'paginationText':
        return 'text-sm text-gray-700 dark:text-gray-400';
      case 'paginationNumber':
        return 'font-semibold text-gray-900 dark:text-white';
      case 'paginationButtonGroup':
        return 'inline-flex xs:mt-0';
      case 'paginationButton':
        return 'px-1 py-1 font-small bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white';
      case 'continueButton':
        return 'py-2 font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:border-gray-600 dark:hover:bg-gray-800 bg-gray disabled:text-gray-300 disabled:hover:bg-transparent rounded-l-md px-4';
      case 'continueActionSelect':
        return 'bg-gray-100 border-0 p-1 border-l text-xs rounded-r-md block w-2 dark:bg-gray-600 border-gray-200 dark:border-gray-600 dark:hover:bg-gray-800 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0 focus:border-gray-200 pr-6';
      case 'action':
        return 'p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400 md:invisible md:group-hover:visible';
      case 'tag':
        return 'inline-flex flex-col w-full items-start py-1 px-2 mr-2 mb-2 text-sm font-medium text-white rounded bg-gray-600 whitespace-nowrap';
      case 'languageSelectWrapper':
        return 'flex gap-3 lg:max-w-3xl md:last:mb-6  pt-0 stretch justify-around text-xs items-end lg:-mb-4 pb-9 mb-0  sm:flex-col';
      case 'select':
        return 'bg-gray-100 p-1 px-2 border-0 text-xs rounded block w-full dark:bg-gray-600 dark:border-gray-600 dark:hover:bg-gray-800 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0';
      case 'select-v2':
          return 'bg-gray-100 p-1 px-2 border-0 text-xs w-full dark:bg-gray-600 dark:border-gray-600 dark:hover:bg-gray-800 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0';
      case 'selectLabel':
        return 'block text-xs font-thin';
    }
  };

  // See also https://developer.chrome.com/docs/extensions/mv3/security/#sanitize
  const sanitizeInput = function (input) {
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/"/g, '&quot;');
  };

  // hide modal with modalID
  const hideModal = function (modalID) {
    const modal = document.getElementById(modalID);

    if (!modal) {
      return;
    }

    modal.style = 'display: none;';
  };

  // format the date and time as YYYY-MM-DD HH:MM:SS
  const formatDateTime = function (timestamp) {
    const d = new Date(timestamp);

    if (!d || d == 'Invalid Date') {
      return '';
    }

    const date = d.toISOString().split('T')[0];
    const time = d.toTimeString().split(' ')[0];

    return `${date} ${time}`;
  };

  // format the timestamp as X {unit} ago
  const formatAgo = function (timestamp) {
    const d = new Date(timestamp);

    if (!d || d == 'Invalid Date') {
      return '';
    }

    const now = new Date();
    const diff = Math.max(0, now - d);

    const units = [
      { name: 'year', value: 31556952000 },
      { name: 'month', value: 2629746000 },
      { name: 'week', value: 604800000 },
      { name: 'day', value: 86400000 },
      { name: 'hour', value: 3600000 },
      { name: 'minute', value: 60000 },
      { name: 'second', value: 1000 },
    ];

    for (let i = 0; i < units.length; i++) {
      const unit = units[i];

      if (diff >= unit.value) {
        const unitCount = Math.floor(diff / unit.value);
        const unitName = unitCount > 1 ? unit.name + 's' : unit.name;

        return `${unitCount} ${unitName} ago`;
      }
    }

    return 'just now';
  };

  /**
   * Create modal to report feedback for a prompt
   *
   * @param {number} PromptIndex
   * @param {PromptTemplatesType} CurrentPromptTemplatesType
   * @param {import('./app.js').Prompt[]} PromptTemplates
   * @param {function(Event)} reportPrompt
   */
  const createReportPromptModal = function (
    PromptIndex,
    CurrentPromptTemplatesType,
    PromptTemplates,
    reportPrompt
  ) {
    // cannot report own prompts
    if (CurrentPromptTemplatesType === PromptTemplatesType.OWN) {
      return;
    }

    const prompt = PromptTemplates[PromptIndex];

    // prompt does not exist
    if (!prompt) {
      return;
    }

    let reportPromptModal = document.getElementById('reportPromptModal');

    // if modal does not exist, create it, add event listener on submit and append it to body
    if (!reportPromptModal) {
      reportPromptModal = document.createElement('div');
      reportPromptModal.id = 'reportPromptModal';

      reportPromptModal.addEventListener('submit', reportPrompt);

      document.body.appendChild(reportPromptModal);
    }

    reportPromptModal.innerHTML = /*html*/ `
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
                    <select data-prompt-id="${prompt.ID}" id="FeedbackTypeNo" name="FeedbackTypeNo" class="mt-2 mb-3 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-900 rounded w-full" required>
                      <option value="${FeedbackTypeNo.GENERIC_LEGAL_CONCERN}">
                      Legal concerns
                      </option>
                      <optgroup label="Result concerns">                        
                        <option value="${FeedbackTypeNo.NOT_MULTILINGUAL}">
                          Result in wrong language
                        </option>
                        <option value="${FeedbackTypeNo.NOT_GENERIC}">
                          Result on wrong topic/keywords
                        </option>                        
                        <option value="${FeedbackTypeNo.GENERIC_CONCERN}">
                          Prompt not working as expected
                        </option>
                      </optgroup>                  
                      <option value="${FeedbackTypeNo.SPAM}">Spam</option>
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

      </div>`;

    // add event listener to change button text and type on click
    reportPromptModal.querySelector('#reportPromptSubmitButton').addEventListener(
      'click',
      (e) => {
        // hide intro text
        document.getElementById('reportPromptIntroText').style = 'display: none;';

        const feedbackTypeNoSelect = document.getElementById('FeedbackTypeNo');

        // show feedback type specific text & form
        const feedbackForm = document.getElementById('reportPromptFeedbackForm');

        feedbackForm.innerHTML = getFeedbackFormTemplate(
          +feedbackTypeNoSelect.value,
          feedbackTypeNoSelect.dataset.promptId
        );

        feedbackForm.classList.remove('hidden');

        // change button text to "Send Report" and replace event listener
        e.target.innerText = 'Send Report';

        e.target.addEventListener('click', () => {
          // submit the visible form in reportPromptModal
          document
            .querySelector(
              '#reportPromptModal .reportPromptFeedbackContainer:not(.hidden) form'
            )
            .requestSubmit();
        });
      },
      { once: true }
    );

    reportPromptModal.style = 'display: block;';

    // add event listener to close the modal on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        hideModal('reportPromptModal');
      }
    });
  };

  /**
   * Get the feedback form template for a specific feedback type
   * 
   * @param {FeedbackTypeNo} selectedFeedbackTypeNo
   * @param {string} promptID
   * @returns {string} - HTML string
   s*/
  const getFeedbackFormTemplate = (selectedFeedbackTypeNo, promptID) => {
    const requiresFeedbackContactText = [
      FeedbackTypeNo.GENERIC_CONCERN,
      FeedbackTypeNo.GENERIC_LEGAL_CONCERN,
    ].includes(selectedFeedbackTypeNo);

    return /*html*/ `
    <p class="mb-6">
      Since we are not affiliated with OpenAI or ChatGPT,
      we are not responsible for the output of ChatGPT.<br><br>

      ${
        selectedFeedbackTypeNo === FeedbackTypeNo.GENERIC_CONCERN
          ? /*html*/ `
          But we can try to help you with results.<br><br>

          We can do this by looking at the prompt reported,
          and the output generated.
        `
          : 'But we will take your report about the prompt and evaluate it.'
      }
    </p>

    <form>
      <input type="hidden" name="PromptID" value="${promptID}" />

      ${
        selectedFeedbackTypeNo !== FeedbackTypeNo.GENERIC_CONCERN
          ? /*html*/ `<input type="hidden" name="FeedbackTypeNo" value="${selectedFeedbackTypeNo}" />`
          : ''
      }

      <label>Contact Email${
        !requiresFeedbackContactText
          ? ' <span class="text-sm text-gray-500">(optional)</span>'
          : ''
      }</label>
      <input name="FeedbackContact" 
        ${requiresFeedbackContactText ? ' required ' : ''} type="email"
        title="Email address to contact you in case we need more information"
        class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded p-2 mt-2 mb-3"
        placeholder="example@example.com" />

      <label>Feedback${
        !requiresFeedbackContactText
          ? ' <span class="text-sm text-gray-500">(optional)</span>'
          : ''
      }</label>
      <textarea name="FeedbackText" 
        ${requiresFeedbackContactText ? ' required ' : ''}
        title="Short description of the issue"
        class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded p-2 mt-2 mb-3" style="height: 140px;"
        placeholder="Please describe the issue you are having with this prompt.${
          selectedFeedbackTypeNo === FeedbackTypeNo.GENERIC_CONCERN
            ? ' Please include your full history of the prompt including the original prompt used.'
            : ''
        }"></textarea>

      ${
        selectedFeedbackTypeNo === FeedbackTypeNo.GENERIC_CONCERN
          ? /*html*/ `
            <label class="block">Are you a customer paying for IN_BOUND support? Would you like to hire us to improve your prompt and create a private prompt specifically for you?</label>
            <select name="FeedbackTypeNo" class="mt-2 mb-3 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-900 rounded w-full" required>
              <option value="${FeedbackTypeNo.PROMPT_SUPPORT_FREE}">I want free support</option>
              <option value="${FeedbackTypeNo.PROMPT_SUPPORT_WANT_PAID}">I want to pay for support</option>
              <option value="${FeedbackTypeNo.PROMPT_SUPPORT_PAID}">I am already paying for support</option>
            </select>
          `
          : ''
      }
    </form>
  `;
  };

  /* eslint-disable no-unused-vars */

  // Mapping of MessageSeverityNo to the corresponding CSS class name for the notification message
  const NotificationMessageSeverityClassName = {
    [MessageSeverityNo.INFO]: 'bg-gray-500',
    [MessageSeverityNo.SUCCESS]: 'bg-green-500',
    [MessageSeverityNo.UPDATE]: 'bg-[#5436DA]',
  };

  /**
   * Show the first active and not expired message with MessageSeverityNo.MANDATORY_MUST_CONFIRM (if any)
   * otherwise show the first active and not expired message with other MessageSeverityNo (if any)
   *
   * @param {import("./client").Message[]} messages
   * @param {(MessageID: string)} confirmCallback
   * @param {(MessageID: string, Vote: MessageVoteTypeNo)} voteCallback
   */
  const showMessage = (messages, confirmCallback, voteCallback) => {
    // get the first active and not expired message with MessageSeverityNo.MANDATORY_MUST_CONFIRM
    let message = messages.find(
      (message) =>
        message.MessageStatusNo === MessageStatusNo.ACTIVE &&
        message.MessageSeverityNo === MessageSeverityNo.MANDATORY_MUST_CONFIRM &&
        (!message.ExpiryTime || new Date(message.ExpiryTime) > new Date())
    );

    // if there is a message with MessageSeverityNo.MANDATORY_MUST_CONFIRM, show it
    if (message) {
      createConfirmMessageModal(message, confirmCallback);

      return;
    }

    // otherwise, get the first active and not expired message with other MessageSeverityNo (if any)
    message = messages.find(
      (message) =>
        message.MessageStatusNo === MessageStatusNo.ACTIVE &&
        message.MessageSeverityNo !== MessageSeverityNo.MANDATORY_MUST_CONFIRM &&
        (!message.ExpiryTime || new Date(message.ExpiryTime) > new Date())
    );

    // if there is no message, return - otherwise show it
    if (!message) {
      return;
    }

    createNotificationMessage(message, voteCallback);
  };

  /**
   * Create a modal to confirm a message with MessageSeverityNo.MANDATORY_MUST_CONFIRM
   *
   * @param {import("./client").Message} message
   * @param {(MessageID: string)} confirmCallback
   */
  const createConfirmMessageModal = (message, confirmCallback) => {
    let confirmMessageModal = document.getElementById('confirmMessageModal');

    // if modal does not exist, create it, add event listener on submit and append it to body
    if (!confirmMessageModal) {
      confirmMessageModal = document.createElement('div');
      confirmMessageModal.id = 'confirmMessageModal';

      // add event listener on submit to call confirmCallback and hide modal on success
      confirmMessageModal.addEventListener('submit', async (e) => {
        e.preventDefault();

        const MessageID = e.target.MessageID.value;

        if (await confirmCallback(MessageID)) {
          hideModal('confirmMessageModal');
        }
      });

      document.body.appendChild(confirmMessageModal);
    }

    confirmMessageModal.innerHTML = /*html*/ `
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

                  <h3 class="mt-1 mb-6">${message.MessageSubject}</h3>

                  <div class="mb-6 overflow-y-auto">${message.MessageBodyHTML}</div>

                  <label class="font-semibold">
                    <input name="MessageID" value="${message.MessageID}" type="checkbox" class="mr-2 dark:bg-gray-700" required> 
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

      </div>`;

    confirmMessageModal.style = 'display: block;';
  };

  /**
   * Create a notification message with thumb up/down buttons
   *
   * @param {import("./client").Message} message
   * @param {(MessageID: string, Vote: MessageVoteTypeNo)} voteCallback
   */
  const createNotificationMessage = (message, voteCallback) => {
    const className =
      NotificationMessageSeverityClassName[message.MessageSeverityNo];

    const notificationElement = document.createElement('div');

    notificationElement.innerHTML = /*html*/ `
      <div class="fixed flex justify-center w-full top-2 px-2 z-50 pointer-events-none">
        <div class="${className} flex pointer-events-auto px-6 py-3 rounded-md text-white" role="alert" style="min-width: 30rem;">
          <div class="flex flex-col gap-2 w-full">

            <h4 class="w-full">${message.MessageSubject}</h4>

            <div class="prose w-full text-white">
              ${message.MessageBodyHTML}
            </div> 

            <div class="flex gap-4 mt-4" style="justify-content: end;">
              <button data-message-vote-type-no="${
                MessageVoteTypeNo.MESSAGE_LIKE
              }" title="I like this">${svg('ThumbUp')}</button>
              <button data-message-vote-type-no="${
                MessageVoteTypeNo.MESSAGE_DISLIKE
              }" title="I don't like this">${svg('ThumbDown')}</button>
            </div>

          </div>
        </div>
      </div>
    `;

    // add event listener on like and dislike button to call voteCallback with MessageVoteTypeNo from data attribute and hide notification on success
    notificationElement.querySelectorAll('button').forEach((button) => {
      button.addEventListener('click', async (e) => {
        if (
          await voteCallback(
            message.MessageID,
            +e.target.closest('button').dataset.messageVoteTypeNo
          )
        ) {
          notificationElement.remove();
        }
      });
    });

    document.body.appendChild(notificationElement);
  };

  const extensionLanguages={
      english:{
          tabsLabel: ["All Shared","My Prompts"],
          topicLabel: "Topic",
          activityLabel:"Activity",
          sortLabel:"Sort by",
          feedLabel:"Feed type",
          search:"Search",
          newPromptLabel:"Add new prompt template",
          likeTitle:["Vote ","Vote for this prompt with thumbs up"],
          dislikeTitle:"Vote for this prompt with thumbs down",
          forkTitle: ["Copy to My Prompts","Prompt already copied!"],
          labelsOverTextareaElems: ["Output in", "Tone", "Writing Style"],
          titleOnTopIcons: ["Setting","Add New Prompt Templates","Import Prompt Template","Expanded View","Collapsed View","View Favorites"],
          cardIconsTitle: ["Add prompt to favorites","Remove prompt from favorites","Save it as My Prompts","Prompt already copied!","Pin this prompt","UnPin this prompt","Download prompt template"],
          plusOnTextarea: "Add to My Prompts",
          reportTitle:"Report this prompt",
          useTitle:"Usages",
          topicTitle:"Topic: ",
          activityTitle:"Activity: ",
          authorTitle:"Created by ",
          timeTitle:"Last updated on ",
          shareTitle:"Copy link to this prompt ",
          editPrmptTitle:"Edit this prompt",
          dltPrmptTitle:"Delete this prompt",
          publicTitle:"Public",
          ownTitle:"Private",
          textareaPlaceholderIdentifier:"Enter: ",
          inputform:{
            saveAsNew:"Save as New Template",
            title: {
              label:"Title",
              placeholder:"Keyword Stretegy"
            },
            teaser:{
              label:"Teaser",
              placeholder:"Create a keyword strategy and SEO cotent plan from 1 [KEYWORD]"
            },
            promptHint:{
              label:"Prompt Hint",
              placeholder:"[KEYWORD] or [Your list of keywords]"
            },
            promptTemplate:{
              label:"Prompt Template",
              placeholer:"Prompt text including placeholders"
            },
            addPromptBtn:"Add New Prompt",
            topic:"Topic",
            activity:"Tags",
            share:"Share prompt template publicly",
            author:{
              label:"Author Name",
              placeholder:"Author Name"
            },
            authorUrl:{
              label:"Author URL",
              placeholder:"https://www.example.com"
            },
            agreeText:"Please be mindful of what you share, and do not include any confidential information, as we are not responsible for any actions taken by others with the information you choose to share.",
            save:"Save Prompt",
            cancel:"Cancel"
          }
        },
      danish:{
          tabsLabel: ["Offentlige forslag","Egne forslag"],
          topicLabel: "Emne",
          activityLabel:"Aktivitet",
          sortLabel:"Sortér efter",
          feedLabel:"Feed type",
          search:"Søg",
          newPromptLabel:"Tilføj nyt prompt-mal",
          likeTitle:["Stem ","Stem på dette prompt med en tommelfinger op"],
          dislikeTitle:"Stem på dette prompt med en tommelfinger nedad",
          forkTitle: ["Kopier til mine meddelelser", "Prompt er allerede kopieret!"],
          labelsOverTextareaElems: ["Output ind", "Tone", "Skrivestil"],
          titleOnTopIcons: ["Indstilling","Tilføj nye promptskabeloner","Importer promptskabelon","Udvidet visning","Skjult visning","Se favoritter"],
          cardIconsTitle: ["Tilføj prompt til favoritter","Fjern prompt fra favoritter","Gem det som Mine prompter","Prompt er allerede kopieret!","Fastgør denne prompt","Fjern fastgør denne prompt","Download prompt skabelon"],
          plusOnTextarea: "Føj til mine meddelelser",
          reportTitle:"Rapporter dette prompt",
          useTitle:"Anvendelser",
          topicTitle:"Emne: ",
          activityTitle:"Aktivitet: ",
          authorTitle:"Oprettet af ",
          timeTitle:"Sidst opdateret den ",
          shareTitle:"Kopier link til dette prompt ",
          editPrmptTitle:"Rediger dette prompt",
          dltPrmptTitle:"Slet dette prompt",
          publicTitle:"Offentligt",
          ownTitle:"Privat",
          textareaPlaceholderIdentifier:"Indtast: ",
          inputform:{
            saveAsNew:"Gem som ny skabelon",
          title: {
          label:"Titel",
          placeholder:"Keyword Strategi"
          },
          teaser:{
          label:"Teaser",
          placeholder:"Opret en nøgleord strategi og SEO indholdsplan fra 1 [NØGLEORD]"
          },
          promptHint:{
          label:"Prompt Tip",
          placeholder:"[NØGLEORD] eller [Din liste over nøgleord]"
          },
          promptTemplate:{
          label:"Prompt-mal",
          placeholer:"Prompt tekst inklusive pladsholdere"
          },
          addPromptBtn:"Tilføj nyt Prompt",
          topic:"Emne",
          activity:"Aktivitet",
          share:"Del prompt-mal offentligt",
          author:{
          label:"Forfatternavn",
          placeholder:"Forfatternavn"
          },
          authorUrl:{
          label:"Forfatter-URL",
          placeholder:"https://www.example.com"
          },
          agreeText:"Vær venlig at være opmærksom på hvad du deler, og inkluder ikke fortrolige oplysninger, da vi ikke er ansvarlige for eventuelle handlinger foretaget af andre med de oplysninger, du vælger at dele.",
          save:"Gem Prompt",
          cancel:"Annuller"
          }
          }
        
  };

  /**
   * @typedef {Object} Prompt
   * @property {string} ID
   * @property {string} Category - Activity of the prompt (e.g. "Writing")
   * @property {string} Community - Topic of the prompt (e.g. "SEO")
   * @property {string} Prompt - The prompt text
   * @property {string} PromptHint - The prompt hint text (placeholder)
   * @property {PromptTypeNo} PromptTypeNo - public, private or paid prompt
   * @property {string} Title
   * @property {string} Help
   * @property {string} Teaser
   * @property {boolean} OwnPrompt - Whether the prompt is owned by the current user
   * @property {string} RevisionTime
   * @property {string} AuthorName
   * @property {string} AuthorURL
   * @property {number} Usages
   * @property {number} Views
   * @property {number} Votes
   */

  /** @typedef {{langcode: string, languageEnglish: string, languageLabel: string}} Language */

  /** @typedef {{ID: string, Label: string}} Topic */

  /** @typedef {{ID: string, TopicID: string, Label: string}} Activity */

  const DefaultPromptActivity = 'all';
  const DefaultPromptTopic = 'all';
  const DefaultTargetLanguage = 'English*';

  const lastPromptTopicKey = 'lastPromptTopic';
  const lastTargetLanguageKey = 'lastTargetLanguage';
  const lastPageSizeKey = 'lastPageSize';

  const queryParamPromptID = 'IN_BOUND_PromptID';

  let extensionText = extensionLanguages.english;

  // The number of prompts per page in the prompt templates section
  const pageSizeOptions = [4, 8, 12, 16, 20, 24];
  const pageSizeDefault = 30;

  const editPromptTemplateEvent = 'editPromptTemplate';

  window.IN_BOUND = {
    // Save a reference to the original fetch function
    fetch: (window._fetch = window._fetch || window.fetch),

    CacheBuster: btoa(new Date().toISOString().slice(0, 16).toString()),

    Client: IN_BOUNDClient,

    feedSelect: ["All","Favourites"],

    feedSelected: "All",

    ExtLang:"english",

    access: {
      cardMenuInDots: false
    },

    feedView: window.localStorage.feedView || "grid",
    feedViewList: ["grid","list"],

    // Set default TargetLanguage based on last used language or default to English
    TargetLanguage:
      localStorage.getItem(lastTargetLanguageKey) === null
        ? DefaultTargetLanguage
        : localStorage.getItem(lastTargetLanguageKey),

    WebAccess: localStorage.getItem('WebAccess') === null ? false : localStorage.getItem('WebAccess'),

    // Set default Tone
    Tone: null,

    // Set default WritingStyle
    WritingStyle: null,

    // Set default topic
    PromptTopic: localStorage.getItem(lastPromptTopicKey) || DefaultPromptTopic,

    // Set default activity
    PromptActivity: DefaultPromptActivity,

    // Set default sort mode
    /** @type {SortModeNo} */
    PromptSortMode: SortModeNo.TOP_VIEWS,

    // Set default search query
    PromptSearch: '',

    // Set default prompt templates type
    /** @type {PromptTemplatesType} */
    PromptTemplatesType: PromptTemplatesType.OWN,

    /** @type {Prompt[]} */
    PromptTemplates: [],

   
    FavouritePromptTemplates: [],
    PinPromptTemplates: [],
    forkPromptTemplates:[],
    activePromptID: "",
    themeMode:"",
    ToneCategories: [],
    DefaultTones: [],
    userTones: [],
    ToneCategorySelected: "",
    InputToneCategorySelected: "",
    promptVariables: [],
    settingsActiveTab: "settings",
    editActivatedTonesInSetting: "",
    activatedToneSelected: {title: "", tone: ""},
    searchPredictionList: [],
    webResults: [],
    current_active_prompts: [],
    Company: "",
    companyMeta:{},
    
    APIEndpoint,

    companyTones: [],

    isLoading:false,

    import: false ,
    companyTonesState: false ,
    companyToneText: "",

  /** @type {Prompt[]} */
    DefaultPromptTemplates:[],

    /** @type {Prompt[]} */
    OwnPrompts: [],

    /** @type {Language[]} */
    Languages: [],

    /** @typedef {{ID: number, Label: string}} Tone */

    /** @type {Tone[]} */
    Tone: "",
    Theme: "",

    /** @typedef {{ID: number, Label: string}} WritingStyle */

    /** @type {WritingStyle[]} */
    WritingStyles: [],

    /** @typedef {{ID: number, Label: string, Prompt: string}} ContinueAction */

    /** @type {ContinueAction[]} */
    ContinueActions: [],

    /** @type {Topic[]} */
    Topics: [],

    /** @type {Activity[]} */
    Activities: [],

    // true if admin mode is enabled
    AdminMode: false,

    // This object contains properties for the prompt templates section
    PromptTemplateSection: {
      currentPage: 0, // The current page number
      pageSize:  pageSizeDefault, // The number of prompts per page
    },

    /** @type {Prompt} */
    SelectedPromptTemplate: null,

    async init() {
      this.setupSidebar();
      this.isLoading = true;
      this.showLoadingInterface("");
      console.log('IN_BOUND init');

      // Bind event handler for arrow keys
      this.boundHandleArrowKey = this.handleArrowKey.bind(this);

      await this.Client.init();

      this.replaceFetch();

      this.createObserver();

      // this.fetchMessages();

      

      // Wait for languages, tones, writing styles and continue actions
      await Promise.all([
        this.fetchUser()
      ]);

      this.insertLanguageToneWritingStyleContinueActions();
      // await this.fetchForks();
      

      this.fetchPromptFromDeepLink();


      this.sendBtnObserver();

      this.createThemeObserver();

      this.getTheme();

      this.isLoading = false;
      this.hideLoadingInterface();
      this.insertPromptTemplatesSection();

      // listen for IN_BOUND.tokens event from  APP
      document.addEventListener('IN_BOUND.getRequest', async (event) => {
        this.handleGetRequestEvent(event);
      });

      // on state change (e.g. back button) fetch the prompt from the deep link
      window.addEventListener('popstate', () => {
        this.fetchPromptFromDeepLink();
      });

      // document.addEventListener('click', (event) => {
      //   const myDiv = document.getElementsByClassName('tonesList')[0] || ""
      //   if (!myDiv.contains(event.target)) {
      //     myDiv.style.display = 'none';
      //   }
      // });
    },

    changeLoadingText(txt){
      document.querySelector('.loading-text') ? document.querySelector('.loading-text').innerHTML = txt : "";
    },


    async reloadAllData(){
      this.showLoadingInterface();
      await this.fetchUser();
      this.hideLoadingInterface();
      this.insertPromptTemplatesSection();
    },


    // ----------------------------------Network Requests ----------------------------
    async fetchUser(){
      this.changeLoadingText("Fetching User...");
      const user = this.Client.User.Email;
      const res_0 = await fetch(`${APIEndpoint}/user?user=${user}`);
      const res = await res_0.json();
      // console.log(res)
      this.Company = res.company;
      await this.fetchCompany(res.company);
      await this.fetchPublicPrompts(res.company);
      await this.fetchPrivatePrompts(res.company);
      await this.fetchUserVariations(res.company);
      await this.fetchCompanyVariations(res.company);
    },
    async fetchCompany(company){
      this.changeLoadingText("Fetching Organization...");

      const user = this.Client.User.Email;
      const res_0 = await fetch(`${APIEndpoint}/company?user=${user}&company=${company}`);
      const res = await res_0.json();
      // console.log(res)

      this.companyToneText = res.company_tone;
      let { dark_logo, description, email, id , light_logo, name, website } = res;
      this.companyMeta = { dark_logo, description, email, id , light_logo, name, website };
      this.WritingStyles = res.writing_styles.sort( (a,b) => a.label.localeCompare(b.label) ).map( (data, index) => {
        let { id, label, prompt} = data;
        return ({ID: id, Label:label, Prompt:prompt})
      });
      this.ContinueActions = res.continue_actions.sort( (a,b) => a.label.localeCompare(b.label) ).map( (data, index) => {
        let { id, label, prompt} = data;
        return ({ID: id, Label:label, Prompt:prompt})
      });
      this.Languages = res.languages.sort( (a,b) => a.language.localeCompare(b.language) ).map( (data, index) => {
        let { langcode, language, id } = data;
        return ({langcode, languageEnglish:language, languageLabel:language, id})
      } );
    },

    async fetchPublicPrompts(company){
      this.changeLoadingText("Fetching Public Prompts...");

      const user = this.Client.User.Email;
      const res_0 = await fetch(`${APIEndpoint}/prompts?user=${user}&company=${company}&type=2`);
      const res = await res_0.json();

      this.PromptTemplates = res.documents.map( (data, index) => ({...data, OwnPrompt:false, favourite:false, pin:false }) ).sort( (a,b) =>  new Date(b.RevisionTime) - new Date(a.RevisionTime) );
      this.DefaultPromptTemplates = this.PromptTemplates;

      // console.log(res)
    },

    async fetchPrivatePrompts(company){
      this.changeLoadingText("Fetching User Prompts...");

      const user = this.Client.User.Email;
      const res_0 = await fetch(`${APIEndpoint}/prompts?user=${user}&company=${company}&type=1`);
      const res = await res_0.json();
      this.OwnPrompts = res.documents.map( (data, index) => ({...data, OwnPrompt:true}) ).sort( (a,b) =>  new Date(b.RevisionTime) - new Date(a.RevisionTime) );
      // console.log(res)
    },

    async fetchUserVariations(company){
      this.changeLoadingText("Fetching User Variations...");

      const user = this.Client.User.Email;
      const res_0 = await fetch(`${APIEndpoint}/variations?user=${user}&company=${company}&type=user`);
      const res = await res_0.json();
      this.userTones = res.documents.map( (data, index) => ({ ID: data.id, Label: data.label, Description:data.prompt, type:"user"}) );
      // console.log(res)
    },

    async fetchCompanyVariations(company){
      this.changeLoadingText("Fetching Org Variations...");

      const user = this.Client.User.Email;
      const res_0 = await fetch(`${APIEndpoint}/variations?user=${user}&company=${company}&type=org`);
      const res = await res_0.json();
      this.companyTones = res.documents.map( (data, index) => ({ ID: data.id, Label: data.label, Description:data.prompt, type:"user"}) );
      // console.log(res)
    },

    async fetchUserPrompt(promptID){
      const user = this.Client.User.Email;
      const res_0 = await fetch(`${APIEndpoint}/prompt?user=${user}&company=${this.Company}&promptID=${promptID}`);
      const res = await res_0.json();
      const prompt = res !== null ? res : {};
      // console.log(res)
      return {...prompt, OwnPrompt:true}
    },

    pinActionForPrompt(PromptID, Vote) {
      return (
          fetch(`${this.APIEndpoint}/prompts?user=${this.Client.User.Email}&company=${this.Company}&id=${PromptID}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              pin: Vote === 1
            }),
          })
          // check if response is OK
          .then((res) => {
            if (!res.ok) {
              throw new Error('Network response was not OK');
            }

            return res;
          })
      );
    },

    // ----------------------------------Network Requests ----------------------------


    getTheme(){
        this.Theme = document.documentElement.style.colorScheme;
    },

    handleGetRequestEvent(ev){
      // console.log("Got in Main App: ",ev.detail)
      let searchDiv = document.createElement('div');
      searchDiv.innerHTML = ev.detail.data;
      const rawOBJ = ev.detail;
      const rawData = ev.detail.data;
      console.log(rawOBJ);

      // Extract Search Results
      // let searchEnguine = searchDiv?.querySelector('#b_results')?.children ? "bing" : searchDiv.querySelector('#search')? "googlenews" : "ddg"

      if(ev.detail.returnType === "getBingResults"){
        this.processBingResults(rawData);
      }else if(ev.detail.returnType === "getDdgResults"){
        this.processDDGResults(rawData);
      }else if(ev.detail.returnType === "getGoogleNewsResults"){
        this.processGoogleNewsResults(rawData);
      }
      
      // console.log(this.webResults)
      

      // console.log(this.SelectedPromptTemplate.Prompt)
      // this.showNotification(
      //   NotificationSeverity.SUCCESS,
      //   'Results added!'
      // );
    },

    processBingResults(data){
      let searchDiv = document.createElement('div');
      searchDiv.innerHTML = data;

      let allElems = Array.from(searchDiv?.querySelector('#b_results')?.children);
      allElems?.forEach( elem => {
        let text = elem?.querySelector('p')?.innerText.slice(3,-3);
        let url = elem?.querySelector('a')?.href;
        text ? this.webResults.push({text, url}) : "";
      });

      let prompt = this.SelectedPromptTemplate.Prompt;

      let searchResultsExtract = this.webResults.map((s,i) => `[${i+1}] ${s.text} (URL: ${s.url})`).slice(0,4).join('\n');
      prompt = prompt.replace('{{WebSearch}}', searchResultsExtract);
      this.SelectedPromptTemplate = {...this.SelectedPromptTemplate, Prompt: prompt};
      // this.selectPromptTemplate(this.SelectedPromptTemplate)

      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Results added!'
      );

    },

    processDDGResults(data){
      let searchDiv = document.createElement('div');
      searchDiv.innerHTML = data;
      // console.log(searchDiv)
      IN_BOUND.searchDiv = searchDiv;

      let elems = searchDiv?.querySelector('.results')?.children || searchDiv?.querySelector('.serp__results')?.querySelectorAll('result');
      let allElems = Array.from(elems);
      allElems?.forEach( elem => {
        let text = elem?.querySelector('.result__snippet')?.innerText;
        let url = elem?.querySelector('.result__snippet')?.href;
        text ? text.length > 20 ? this.webResults.push({text, url}) : "" : "";
      });

      console.log(this.webResults);

      let prompt = this.SelectedPromptTemplate.Prompt;

      let searchResultsExtract = this.webResults.map((s,i) => `[${i+1}] ${s.text} (Link:${s.url})`).slice(0,5 + Math.floor(Math.random()*5) ).join('\n');
      prompt = prompt.replace('{{WebSearch}}', searchResultsExtract);
      this.SelectedPromptTemplate = {...this.SelectedPromptTemplate, Prompt: prompt};
      // this.selectPromptTemplate(this.SelectedPromptTemplate)

      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Results added!'
      );

      return prompt
    },

    processGoogleNewsResults(data){
      let searchDiv = document.createElement('div');
      searchDiv.innerHTML = data;
      console.log(searchDiv);

      let elems = searchDiv?.querySelector('#search')?.querySelectorAll('a') || searchDiv?.querySelector('#main')?.querySelectorAll('a');
      // IN_BOUND.searchDiv = searchDiv
      console.log(elems);
      let allElems = Array.from(elems);
      allElems?.forEach( elem => {
        let text = elem?.innerText;
        let url = elem?.href;
        text ? text.length > 20 ? this.webResults.push({text, url}) : "" : "";
      });

      let prompt = this.SelectedPromptTemplate.Prompt;

      let searchResultsExtract = this.webResults.map((s,i) => `[${i+1}] ${s.text} (Link:${s.url})`).slice(0,5 + Math.floor(Math.random()*5) ).join('\n');
      console.log(this.webResults);
      prompt = prompt.replace('{{WebNews}}', searchResultsExtract);
      this.SelectedPromptTemplate = {...this.SelectedPromptTemplate, Prompt: prompt};
      // this.selectPromptTemplate(this.SelectedPromptTemplate)

      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Results added!'
      );

      return prompt
    },

    async refreshData(){
      // console.log("Refresh")
      // setTimeout(function() {
        await this.fetchPrivatePrompts(this.Company);
        await this.fetchUserVariations(this.Company);
      // }.bind(this), 2000);

      // setTimeout(function() {
        this.insertPromptTemplatesSection();
      // }.bind(this), 3000);
     
    },

    async refreshActions(){
      // console.log("Refresh")
      // setTimeout(function() {
      await  this.fetchUserVariations(this.Company);
      // }.bind(this), 200);

      // setTimeout(function() {
        this.insertLanguageToneWritingStyleContinueActions();
        this.showSettingModal();
      // }.bind(this), 1000);
      return true
     
    },

    // get the prompt ID from the URL and select the prompt template
    async fetchPromptFromDeepLink() {
      // Get the prompt ID from the URL (IN_BOUND_PromptID)
      const promptID = new URLSearchParams(window.location.search).get(
        queryParamPromptID
      );

      if (!promptID) {
        // If there is no prompt ID in the URL - deselect the prompt template
        this.selectPromptTemplateByIndex(null);

        return;
      }

      // If the prompt is already selected, do nothing
      if (
        this.SelectedPromptTemplate &&
        this.SelectedPromptTemplate.ID === promptID
      ) {
        return;
      }

      let prompt;

      try {
        // Fetch the prompt using the IN_BOUND API client
        prompt = await this.fetchUserPrompt(promptID);
        // console.log("Prompt: ",prompt)
      } catch (error) {
        // console.log(error)
        this.showNotification(
          NotificationSeverity.ERROR,
          'Something went wrong. Please try again.'
        );
        return;
      }

      if (!prompt) {
        return;
      }

      // Select the prompt template
      this.selectPromptTemplate(prompt);
    },

    // Fetch the list of messages from the server
    async fetchMessages() {
      showMessage(
        await this.Client.getMessages(
          this.PromptTopic === DefaultPromptTopic ? '' : this.PromptTopic
        ),
        this.confirmMessage.bind(this),
        this.voteForMessage.bind(this)
      );
    },

    /**
     * Confirm a message using the IN_BOUND API client
     *
     * @param {string} MessageID
     * @returns {Promise<boolean>} Whether the message was confirmed successfully
     */
    async confirmMessage(MessageID) {
      try {
        await this.Client.confirmMessage(MessageID);
      } catch (error) {
        this.showNotification(
          NotificationSeverity.ERROR,
          'Something went wrong. Please try again.'
        );
        return false;
      }

      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Thanks for the confirmation!'
      );

      return true;
    },

    /**
     * Vote for a message using the IN_BOUND API client
     *
     * @param {string} MessageID
     * @param {MessageVoteTypeNo} VoteTypeNo
     * @returns boolean Whether the message was voted for successfully
     */
    async voteForMessage(MessageID, VoteTypeNo) {
      try {
        await this.Client.voteForMessage(MessageID, VoteTypeNo);
      } catch (error) {
        this.showNotification(
          NotificationSeverity.ERROR,
          'Something went wrong. Please try again.'
        );
        return false;
      }

      return true;
    },

    // This function sets up the chat sidebar by adding an "Export Button" and modifying
    // the "New Chat" buttons to clear the selected prompt template when clicked
    setupSidebar() {
      // Add the "Export Button" to the sidebar
      this.addExportButton();
      // Get the "New Chat" buttons
      const buttons = this.getNewChatButtons();
      // Set the onclick event for each button to clear the selected prompt template
      buttons.forEach((button) => {
        button.onclick = () => {
          this.selectPromptTemplateByIndex(null);

          // Hide the "Continue Writing" button (no prompt selected/new chat)
          this.hideContinueActionsButton();
        };
      });


      // ----------------------------------------------

      if(!document.getElementById("sideBarWrapper")){
        document.body.classList.toggle("show-nav");

        // document.getElementById('__next').style.width = '80%'
        let sideBarWrapper = document.createElement('div');
        sideBarWrapper.id = 'sideBarWrapper';
        // sideBarWrapper.className = 'text-gray-800 w-full md:max-w-2xl lg:max-w-3xl md:flex md:flex-col px-6 dark:text-gray-100'
        sideBarWrapper.innerHTML = `
      
      <nav class="nav">
      </nav>`;
        document.body.appendChild(sideBarWrapper);
      }
      
    },

    // Fetch the list of topics from a remote CSV file
    async fetchTopics() {
      this.fetch(TopicFeedURL + this.CacheBuster)
        // Convert the response to text
        .then((res) => res.text())
        // Convert the CSV text to an array of records
        .then((csv) => this.CSVToArray(csv))
        // Map the records to topic objects with properties 'ID' and 'Label'
        .then((records) => {
          return (
            records
              .map(([ID, Label]) => {
                return { ID, Label };
              })
              // Filter out records that do not have an ID, or it is the header row (with "ID" as its title)
              .filter(({ ID }) => ID && ID !== 'ID')
          );
        })
        .then((topics) => {
          // Sort and save the topics
          this.Topics = topics.sort((a, b) => a.Label.localeCompare(b.Label));
        });
    },

    fetchFavourites(){
      this.fetch(dbMetaURL.query(promptsLikesDBID,this.Client.User.Email))
      // Convert the response to text
      .then((res) => res.text())
      // Convert the CSV text to an array of records
      .then((json) => json.slice(1,-1).replace(/""/gi,'"'))
      // Map the records to topic objects with properties 'ID' and 'Label'
      .then((obj) => {
        // console.log(obj)
        if(obj[0]==='' || !obj[0]){
          return {likesCollection:[]}
        }else {
          return (
            JSON.parse(obj)
          );
        }
      })
      .then((likes) => {
        // console.log(likes)
        // Sort and save the topics
        this.FavouritePromptTemplates = likes.likesCollection;
        this.PinPromptTemplates = likes?.pinCollection || [];
        this.userTones = likes?.userTones?.map(d => JSON.parse(d)) || [];
        this.userTones = this.userTones?.map(d => ({...d, type:"user"}) )  || [];

        this.fetchToneCategories();
      });
    },

    // Fetch the list of activities from a remote CSV file
    async fetchActivities() {
      this.fetch(ActivityFeedURL + this.CacheBuster)
        // Convert the response to text
        .then((res) => res.text())
        // Convert the CSV text to an array of records
        .then((csv) => this.CSVToArray(csv))
        // Map the records to activity objects with properties 'TopicID', 'ID', and 'Label'
        .then((records) => {
          // console.log(records)
          return (
            records
              .map(([TopicID, ID, Label]) => {
                return { TopicID, ID, Label };
              })
              // Filter out records that do not have an ID, or it is the header row (with "ID" as its title)
              .filter(({ ID }) => ID && ID !== 'ID')
          );
        })
        .then((activities) => {
          // console.log(activities)
          // Sort and save the array of activities
          this.Activities = activities.sort((a, b) =>
            a.Label.localeCompare(b.Label)
          );
        });
    },

    fetchLanguages() {
      // Fetch the list of languages from a remote CSV file
      return (
        this.fetch(LanguageFeedURL + this.CacheBuster)
          // Convert the response to text
          .then((res) => res.text())
          // Convert the CSV text to an array of records
          .then((csv) => this.CSVToArray(csv))
          // Map the records to language objects with properties 'langcode', 'languageEnglish' and 'languageLabel'
          .then((records) => {
            return (
              records
                .map(([langcode, languageEnglish, languageLabel]) => {
                  return { langcode, languageEnglish, languageLabel };
                })
                // Filter out records that do not have a language code, or it is the header row (with "langcode" as its title)
                .filter(({ langcode }) => langcode && langcode !== 'langcode')
            );
          })
          .then((languages) => {
            // Save the array of languages to a global variable
            this.Languages = languages;
          })
      );
    },

    // Fetch list of company tones from a remote CSV file
    fetchTones() {
      return (
        this.fetch(ToneFeedURL + this.CacheBuster)
          // Convert the response to text
          .then((res) => res.text())
          // Convert the CSV text to an array of records
          .then((csv) => this.CSVToArray(csv))
          // Map the records to tone objects with properties 'ID' and 'Label'
          .then((records) => {
            return (
              records
                .map(([ID, Label, Description, Category, CategoryID]) => {
                  return { ID, Label, Description, Category, CategoryID, type:"company" };
                })
                // Filter out records that do not have an ID, or it is the header row (with "ID" as its title)
                .filter(({ ID }) => ID && ID !== 'ID')
                // Sort the tones by Label
                .sort((a, b) => a.Label.localeCompare(b.Label))
            );
          })
          .then((tones) => {
            // Save the array of tones to a global variable
            this.DefaultTones = tones;
            this.fetchToneCategories();
          })
      );
    },

    fetchCompanyTone(){
      this.fetch(CompanyToneUrl)
        .then(c => c.text())
        .then( tone => {
          this.companyToneText = tone.slice(1,-1);
        });
    },

    fetchToneCategories(){
      const tones = this.companyTonesState? [ ...this.DefaultTones, ...this.userTones ] : this.userTones;
      const categories = tones.map(d => d.Category + "___||__=" + d.CategoryID);
      let uniqCategories = [];
      categories.forEach(function(item) {
          if(uniqCategories.indexOf(item) < 0) {
              uniqCategories.push(item);
          }
      });

      let arrayCategories = uniqCategories.map(d => d.split('___||__='));
      this.ToneCategories = arrayCategories.map(d => ({ ID: d[1], Label: d[0] }) )?.sort((a, b) => a.Label.localeCompare(b.Label)) || [];
      this.ToneCategorySelected = this.ToneCategories[0]?.ID || [];
      this.Tones = tones?.filter(d => d.CategoryID === this.ToneCategorySelected) || [];
      // this.Tone = this.Tones[0]?.ID || ""

      this.insertLanguageToneWritingStyleContinueActions();
    },

    // Fetch list of writing styles from a remote CSV file
    fetchWritingStyles() {
      return (
        this.fetch(WritingStyleFeedURL + this.CacheBuster)
          // Convert the response to text
          .then((res) => res.text())
          // Convert the CSV text to an array of records
          .then((csv) => this.CSVToArray(csv))
          // Map the records to writing style objects with properties 'ID' and 'Label'
          .then((records) => {
            return (
              records
                .map(([ID, Label]) => {
                  return { ID: parseInt(ID), Label };
                })
                // Filter out records that do not have an ID, or it is the header row (with "ID" as its title)
                .filter(({ ID }) => ID && ID !== 'ID')
                // Sort the writing styles by Label
                .sort((a, b) => a.Label.localeCompare(b.Label))
            );
          })
          .then((writingStyles) => {
            // Save the array of writing styles to a global variable
            this.WritingStyles = writingStyles;
          })
      );
    },

    // Fetch list of continue actions from a remote CSV file
    fetchContinueActions() {
      return (
        this.fetch(ContinueActionsFeedURL + this.CacheBuster)
          // Convert the response to text
          .then((res) => res.text())
          // Convert the CSV text to an array of records
          .then((csv) => this.CSVToArray(csv))
          // Map the records to continue action objects with properties 'ID', 'Label, and 'Prompt'
          .then((records) => {
            return (
              records
                .map(([ID, Label, Prompt]) => {
                  return { ID: parseInt(ID), Label, Prompt };
                })
                // Filter out records that do not have an ID, or it is the header row (with "ID" as its title)
                .filter(({ ID }) => ID && ID !== 'ID')
                // Sort the continue actions alphabetically
                .sort((a, b) => a.Label.localeCompare(b.Label))
            );
          })
          .then((continueActions) => {
            // Save the array of continue actions to a global variable
            this.ContinueActions = continueActions;
          })
      );
    },

    async fetchPromptTemplates() {
      /** @type {Prompt[]} */
      const templates =  this.import? await this.Client.importPrompts(
        this.PromptTopic === DefaultPromptTopic ? '' : this.PromptTopic,
      this.PromptSortMode
      ) : await this.Client.getPrompts(
        this.PromptTopic === DefaultPromptTopic ? '' : this.PromptTopic,
        this.PromptSortMode
      );

      
      // split templates into public and own
      [this.PromptTemplates, this.OwnPrompts] = templates.reduce(
        (publicPrivatePrompts, template) => {
          // Public template
          if (template.PromptTypeNo === PromptTypeNo.PUBLIC) {
            publicPrivatePrompts[0].push(template);
          }

          // Private or public template owned by current user
          if ( template.AuthorURL === this.Client.User.Email) {
            publicPrivatePrompts[1].push(template);
          }

          return publicPrivatePrompts;
        },
        [[], []]
      );
      
      await this.fetchForks();

      this.DefaultPromptTemplates = this.PromptTemplates;

      this.insertPromptTemplatesSection();
    },

    async fetchForks(){
      const forks = await this.Client.getForks();
      const userForks = forks.filter(fork => fork.AuthorURL === this.Client.User.Email);
      this.forkPromptTemplates = userForks.map(fork => fork.forkID );
      // console.log(this.forkPromptTemplates)
    },

    createObserver() {
      // Create a new observer for the chat sidebar to watch for changes to the document body
      const observer = new MutationObserver((mutations) => {
        // For each mutation (change) to the document body
        mutations.forEach((mutation) => {
          // If the mutation is not a change to the list of child nodes, skip it
          if (mutation.type !== 'childList')
            if (mutation.addedNodes.length == 0)
              // If no new nodes were added, skip this mutation
              return;
          // Get the first added node
          const node = mutation.addedNodes[0];
          // If the node is not an element or does not have a `querySelector` method, skip it
          if (!node || !node.querySelector) return;
          // Call the `handleElementAdded` function with the added node
          this.handleElementAdded(node);
        });
      });

      // Start observing the document body for changes
      observer.observe(document.body, { subtree: true, childList: true });
    },

    createThemeObserver(){
      // const targetParent = document.getElementsByClassName("scrollbar-trigger")[0]
      // let targetNode
      // for(let i=0; i<targetParent.children[0].children.length; i++){
      //     if(targetParent.children[0].children[i].innerText === "Light mode" || targetParent.children[0].children[i].innerText === "Dark mode"){
      //       targetNode = targetParent.children[0].children[i]
      //     }
      // }

      // if(!targetNode){
      //   return
      // }

      let targetNode = document.documentElement;

      // Options for the observer (which mutations to observe)
      const config = { attributes: true, childList: true, subtree: true };
      
      // Callback function to execute when mutations are observed
      const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
          if (mutation.type === "childList") ; else if (mutation.type === "attributes") {
            // console.log(`The ${mutation.attributeName} attribute was modified.`);
            let currentTheme = document.documentElement.style.colorScheme;
            if(IN_BOUND.Theme !== currentTheme){
              // console.log('Theme Change: ',currentTheme)
              IN_BOUND.Theme = currentTheme;
              IN_BOUND.insertPromptTemplatesSection();
            }
            
          }
        }
      };
      
      // Create an observer instance linked to the callback function
      const observer = new MutationObserver(callback);
      
      // Start observing the target node for configured mutations
      observer.observe(targetNode, config);

    },


    sendBtnObserver(){
      // console.log("observer init")
      const targetNode = document.querySelector('textarea').nextElementSibling;


      // Options for the observer (which mutations to observe)
      const config = { attributes: true, childList: true, subtree: true };
      
      // Callback function to execute when mutations are observed
      const callback = (mutationList, observer) => {
        // console.log("Change!")
        for (const mutation of mutationList) {
          // console.log("Change!")
          if (mutation.type === "childList") {
            const allDivs = document.getElementsByClassName('text-gray-400 flex self-end lg:self-center justify-center mt-2 gap-2 md:gap-3 lg:gap-1 lg:absolute lg:top-0 lg:translate-x-full lg:right-0 lg:mt-0 lg:pl-2 visible');
            const resDivs = allDivs[allDivs.length-1];
            // console.log(allDivs,resDivs)

            if(!resDivs){
              return 
            }

            if(!resDivs.querySelector('#copy-btn')){
              const elem = document.createElement('button');
              elem.className = 'p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400';
              elem.innerHTML = svg(`copy`);
              elem.id = 'copy-btn';
              resDivs.prepend(elem);

              elem.onclick = function(e){
                IN_BOUND.copyResponse(e);
              };
            }
            
            // console.log(resDivs)
          } else if (mutation.type === "attributes") ;
        }
      };
      
      // Create an observer instance linked to the callback function
      const observer = new MutationObserver(callback);
      
      // Start observing the target node for configured mutations
      observer.observe(targetNode, config);

    },

    copyResponse(e){
      const copyText = e.srcElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.innerText;
      // console.log(copyText)
      navigator.clipboard
      .writeText(copyText)
      .then(
        // Success - copied & public
        this.showNotification(
          NotificationSeverity.SUCCESS,
          'The response was copied to your clipboard.'
        )
        
      );
    },

    replaceFetch() {
      window.fetch = (...t) => {
        // console.log("Tem: ",this.SelectedPromptTemplate)
        // If the request is not for the chat backend API, just use the original fetch function
        if (t[0] !== EndpointConversation) return this.fetch(...t);

        // If no prompt template, tone, writing style or target language has been selected, use the original fetch function
        if (
          !this.SelectedPromptTemplate &&
          !this.Tone &&
          !this.WritingStyle &&
          !this.TargetLanguage
        ) {
          return this.fetch(...t);
        }

        // Get the selected prompt template
        const template = this.SelectedPromptTemplate;

        // Allow the user to use continue actions after sending a prompt
        this.showContinueActionsButton();

        try {
          // Get the options object for the request, which includes the request body
          const options = t[1];
          // Parse the request body from JSON
          const body = JSON.parse(options.body);

          if (template) {
            // Get the prompt from the request body
            const prompt = body.messages[0].content.parts[0];
            // console.log(prompt)

            // Use the default target language if no target language has been selected
            const targetLanguage = (
              this.TargetLanguage ? this.TargetLanguage : DefaultTargetLanguage
            ).replace('*', '');

            // Replace the prompt in the request body with the selected prompt template,
            // inserting the original prompt into the template and replacing the target language placeholder
            body.messages[0].content.parts[0] = template.Prompt.replaceAll(
              PromptPlaceholder,
              prompt
            ).replaceAll(TargetLanguagePlaceholder, targetLanguage);

          }

          /** @type {string[]} */
          const toneWritingStyleLanguagePrompt = [];

          // If the user has selected a tone, add it to the request body
          const tone = this.companyTonesState === 'true' 
          ? {Description: this.companyToneText  }
          : this.Tone
            ? this.userTones.find((tone) => tone.ID === this.Tone)
            : null;

          

          //   console.log("Tone replacefetch: ",tone,this.companyTonesState,this.companyToneText)

          if (tone) {
            toneWritingStyleLanguagePrompt.push(
              `[${tone.Description.toLowerCase()}] tone`
            );

            // Track the tone usage
            // this.Client.usePrompt(`${tone.ID}`, UsageTypeNo.SEND);
          }

          // If the user has selected a writing style, add it to the request body
          const writingStyle = this.WritingStyle
            ? this.WritingStyles.find(
                (writingStyle) => writingStyle.ID === this.WritingStyle
              )
            : null;

          if (writingStyle) {
            toneWritingStyleLanguagePrompt.push(
              `${writingStyle.Label.toLowerCase()} writing style`
            );

            // Track the writing style usage
            // this.Client.usePrompt(`${writingStyle.ID}`, UsageTypeNo.SEND);
          }

          // If the user has selected a target language, add it to the request body
          if (!template && this.TargetLanguage) {
            toneWritingStyleLanguagePrompt.push(
              `${this.TargetLanguage.replace('*', '')} language`
            );
          }

          // If the user has selected a tone, writing style or target language, add a prompt to the request body
          if (toneWritingStyleLanguagePrompt.length > 0) {
            body.messages[0].content.parts[0] += `\n\nPlease write in ${toneWritingStyleLanguagePrompt.join(
            ', '
          )}.`;
          }

          // console.log(template)
          // Stringify the modified request body and update the options object
          options.body = JSON.stringify(body);
          // Use the modified fetch function to make the request
          console.log("Submit Prompt:  ",options.body);
          // Clear the selected prompt template
          this.selectPromptTemplateByIndex(null);
          return this.fetch(t[0], options);
        } catch(er) {
          console.log('error:::', er);
          // If there was an error parsing the request body or modifying the request,
          // just use the original fetch function
          return this.fetch(...t);
        }
      };
    },

    // This function is called for each new element added to the document body
    handleElementAdded(e) {
      // If the element added is the root element for the chat sidebar, set up the sidebar
      if (
        e.id === 'headlessui-portal-root' ||
        e.id === 'language-select-wrapper'
      ) {
        this.setupSidebar();
        return;
      }

      // Disable "Export Button" when no chat were started.
      // Insert "Prompt Templates" section to the main page.
      // Insert language select and continue button above the prompt textarea input
      if (e.querySelector('h1.text-4xl')) {
        this.insertPromptTemplatesSection();
        const button = document.getElementById('export-button');
        if (button) button.style = 'pointer-events: none;opacity: 0.5';

        this.insertLanguageToneWritingStyleContinueActions();
      }

      // Enable "Export Button" when a new chat started.
      // Insert language select and continue button above the prompt textarea input
      if (document.querySelector('.xl\\:max-w-3xl')) {
        const button = document.getElementById('export-button');
        if (button) button.style = '';

        this.insertLanguageToneWritingStyleContinueActions();
      }

      // Add "Save prompt as template" button, if new prompt was added
      if (document.querySelector('.whitespace-pre-wrap')) {
        this.insertSavePromptAsTemplateButton();
      }
    },

    // Add "Save prompt as template" button to the user prompt container next to the "Edit" button
    insertSavePromptAsTemplateButton() {
      // get the first element with selector '.flex.flex-col.items-center .whitespace-pre-wrap' and no children elements
      const firstPrompt = document.querySelector(
        '.flex.flex-col.items-center .whitespace-pre-wrap:not(:has(*))'
      );

      if (!firstPrompt) {
        return;
      }

      // get parent element of the first prompt to find the "Edit" button
      const button =
        firstPrompt.parentElement.parentElement.querySelector('button');

      if (!button) {
        return;
      }

      // Allow user to continue writing from chat history
      this.showContinueActionsButton();

      let saveButton = button.parentElement.querySelector('.save-prompt-button');

      // if button already exists, skip
      if (saveButton) {
        return;
      }

      saveButton = document.createElement('button');
      saveButton.className =
        'save-prompt-button p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400 md:invisible md:group-hover:visible';
      saveButton.title = 'Save prompt as template';
      saveButton.addEventListener('click', this.showSavePromptModal.bind(this));
      saveButton.innerHTML = svg('Save');

      // add HTML before children in button.parentElement
      button.parentElement.prepend(saveButton);
    },

    // get all available activities for the selected topic
    getActivities(TopicID = DefaultPromptTopic) {
      const currentActivities = this.Activities.filter(
        (activity) =>
          !TopicID ||
          TopicID === DefaultPromptTopic ||
          activity.TopicID === TopicID
      );

      // keep only unique activity.Label and extract activity.ID and activity.Label
      return [
        ...new Set(currentActivities.map((activity) => activity.Label)),
      ].map((label) => ({
        ID: this.Activities.find((activity) => activity.Label === label).ID,
        Label: label,
      }));
    },

    /**
     * Validate prompt template before saving
     *
     * @param {Prompt} prompt
     * @returns {boolean} true if prompt is valid
     */
    validatePrompt(prompt) {
      const errors = [];

      // find existing prompt based on ID in PromptTemplates or OwnPrompts
      const existingPrompt = [...this.PromptTemplates, ...this.OwnPrompts].find(
        (p) => p.ID === prompt.ID
      );

      // prompt type was changed between public and private
      const promptTypeChanged =
        existingPrompt && existingPrompt.PromptTypeNo !== prompt.PromptTypeNo;

      // current user cannot create any prompt template, but can edit existing prompt
      if (!this.canCreatePromptTemplate() && !existingPrompt) {
        this.cannotCreatePromptTemplateError();

        return;
      }

      // current user cannot create public prompt template, but can edit existing public prompt template
      if (
        prompt.PromptTypeNo === PromptTypeNo.PUBLIC &&
        !this.canCreatePublicPromptTemplate() &&
        (!existingPrompt || promptTypeChanged)
      ) {
        this.cannotCreatePublicPromptTemplateError();

        return;
      }

      // current user cannot create private prompt template, but can edit existing private prompt template
      if (
        prompt.PromptTypeNo === PromptTypeNo.PRIVATE &&
        !this.canCreatePrivatePromptTemplate() &&
        (!existingPrompt || promptTypeChanged)
      ) {
        this.cannotCreatePrivatePromptTemplateError();

        return;
      }

      // require AuthorName and AuthorURL if prompt is public
      if (
        prompt.PromptTypeNo === PromptTypeNo.PUBLIC &&
        (!prompt.AuthorName.trim() || !prompt.AuthorURL.trim())
      ) {
        errors.push(
          'Please identify with Author Name and URL to publish a prompt template as public.'
        );
      }

      const missingPlaceholders = [];

      // require usage of target language placeholder if prompt is public
      if (
        prompt.PromptTypeNo === PromptTypeNo.PUBLIC &&
        !prompt.Prompt.includes(TargetLanguagePlaceholder)
      ) {
        missingPlaceholders.push(TargetLanguagePlaceholder);
      }

      // require usage of prompt placeholder in prompt template
      if (!prompt.Prompt.includes(PromptPlaceholder)) {
        missingPlaceholders.push(PromptPlaceholder);
      }

      // there is at least one missing placeholder
      if (missingPlaceholders.length > 0) {
        errors.push(
          `
          Make sure you follow the Prompt Template guidelines. <br>
          You must use ${missingPlaceholders.join(' and ')} correctly. <br><br>
          Learn more <a class="underline" href="https://lrt.li/IN_BOUNDpromptguide" target="_blank" rel="noopener noreferrer">here</a>.
        `
        );
      }

      // show error notification if there are any errors
      if (errors.length > 0) {
        const errorMessage = /*html*/ `
        <div>
          <strong>Please fix the following errors:</strong> <br><br>
          ${errors.join('<br><br>')}
        </div>
      `;

        this.showNotification(NotificationSeverity.ERROR, errorMessage, false);
      }

      return errors.length === 0;
    },

    // save prompt template via API and update client state
    async savePromptAsTemplate(e) {
      // e.preventDefault();

      /** @type Prompt */
      const prompt = {};
      const formData = new FormData(e.target);

      for (const [key, value] of formData) {
        prompt[key] = value;
      }

      // console.log(prompt)

      prompt.ID = prompt.ID ? prompt.ID : window.crypto.randomUUID() || (new Date()).getTime() + Math.random().toString(16).slice(2);
      prompt.PromptTypeNo = 1;
      prompt.pin = false;
      prompt.favourite = false;
      prompt.CreationTime = (new Date()).toISOString();

      prompt.PromptTypeNo = prompt.Public
        ? PromptTypeNo.PUBLIC
        : PromptTypeNo.PRIVATE;

      // re-check user status
      // await this.Client.checkUserStatus();

      // if (!this.validatePrompt(prompt)) {
      //   return;
      // }

      try {
        const savedPrompt = await this.Client.savePrompt(prompt);

        this.refreshData();

        // Update revision time to current time
        prompt.RevisionTime = new Date().toISOString();

        // Update existing prompt template
        if (prompt.ID) {
          // this.updatePromptsState(prompt);
        }
        // Add new prompt template to client state if it belongs to the current topic
        else if (
          this.PromptTopic === DefaultPromptTopic ||
          prompt.Community === this.PromptTopic
        ) {
          // New prompt template was created, set the ID
          prompt.ID = savedPrompt.ID;

          this.OwnPrompts.push(prompt);

          // Add prompt to public prompt templates if it is public
          if (prompt.Public) {
            this.PromptTemplates.push(prompt);
          }
        }
      } catch (error) {
        // console.log(error)
        this.showNotification(
          NotificationSeverity.ERROR,
          error instanceof Reaction
            ? error.message
            : 'Something went wrong. Please try again.'
        );
        return;
      }

      this.hideSavePromptModal();

      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Prompt template was saved successfully to "My Prompts".'
      );

      this.insertPromptTemplatesSection();
    },

    /**
     * Update prompt templates in client state
     *
     * @param {Prompt} prompt
     */
    updatePromptsState(prompt) {
      // if topic doesn't match, remove prompt from PromptTemplates and OwnPrompts
      if (
        prompt.Community !== this.PromptTopic &&
        this.PromptTopic !== DefaultPromptTopic
      ) {
        this.PromptTemplates = this.PromptTemplates.filter(
          (template) => template.ID !== prompt.ID
        );

        this.OwnPrompts = this.OwnPrompts.filter(
          (ownPrompt) => ownPrompt.ID !== prompt.ID
        );

        return;
      }

      // find prompt in OwnPrompts by ID and update it
      this.OwnPrompts = this.OwnPrompts.map((ownPrompt) =>
        ownPrompt.ID === prompt.ID ? prompt : ownPrompt
      );

      // find the prompt in PromptTemplates by ID
      const promptTemplate = this.PromptTemplates.find(
        (template) => template.ID === prompt.ID
      );

      const isPublicPrompt = prompt.PromptTypeNo === PromptTypeNo.PUBLIC;

      // if prompt is not public and it is in PromptTemplates, remove it
      if (!isPublicPrompt && promptTemplate) {
        this.PromptTemplates = this.PromptTemplates.filter(
          (template) => template.ID !== prompt.ID
        );

        return;
      }

      // if prompt is public and it is not in PromptTemplates, add it
      if (isPublicPrompt && !promptTemplate) {
        this.PromptTemplates.push(prompt);

        return;
      }

      // if prompt is public and it is in PromptTemplates, update it
      if (isPublicPrompt && promptTemplate) {
        this.PromptTemplates = this.PromptTemplates.map((template) =>
          template.ID === prompt.ID ? prompt : template
        );
      }
    },

    /**
     * Simple notification based on ChatGPT "high demand" notification
     *
     * @param {NotificationSeverity} severity
     * @param {string} message
     * @param {boolean} autoHide
     */
    showNotification(
      severity = NotificationSeverity.SUCCESS,
      message = '',
      autoHide = true
    ) {
      const notificationElementID = 'IN_BOUND-Notification';

      let notificationElement = document.getElementById(notificationElementID);

      // if notification doesn't exist, create it
      if (!notificationElement) {
        notificationElement = document.createElement('div');
        notificationElement.id = notificationElementID;
      }

      const severityClassName = {
        [NotificationSeverity.SUCCESS]: 'bg-green-500',
        [NotificationSeverity.WARNING]: 'bg-orange-500',
        [NotificationSeverity.ERROR]: 'bg-red-500',
      };

      notificationElement.innerHTML = /*html*/ `
      <div style="z-index:999999999999999;" class="fixed flex justify-center w-full top-2 px-2 pointer-events-none">
        <div class="${
          severityClassName[severity]
        } flex flex-row inline-flex pointer-events-auto px-6 py-3 rounded-md text-white" role="alert">
          <div class="flex gap-4">
            <p class="max-w-md">${message}</p>
            <button>${svg('Cross')}</button>
          </div>
        </div>
      </div>
    `;

      // remove notificationElement from DOM on click
      notificationElement
        .querySelector('button')
        .addEventListener('click', () => {
          notificationElement.remove();
        });

      // or remove notificationElement from DOM after 5 seconds
      if (autoHide) {
        setTimeout(() => {
          notificationElement.remove();
        }, 5000);
      }

      document.body.appendChild(notificationElement);
    },

    hideModal,

    hideSavePromptModal() {
      this.hideModal('savePromptModal');
    },

    // show modal to report prompt
    showReportPromptModal(PromptIndex) {
      createReportPromptModal(
        PromptIndex,
        this.PromptTemplatesType,
        this.PromptTemplates,
        this.reportPrompt.bind(this)
      );
    },

    /**
     * Show modal to save prompt as template
     *
     * @param {Event|null} e
     */
    async showSavePromptModal(e,promptID, promptFull) {
      let promptTemplate = '';

      
      const isEditPromptEvent = e && e.type === editPromptTemplateEvent;

      // cannot add new prompt template, but still can edit existing one
      // if (!this.canCreatePromptTemplate() && !isEditPromptEvent) {
      //   this.cannotCreatePromptTemplateError();

      //   return;
      // }

      let prompt = {};
      let promptExist = false;     //used in save prompt from chat
      // get the prompt template from current chat log if showSavePromptModal was called from "Save prompt as template" button (with event)
      if (e && e.type !== editPromptTemplateEvent) {
        // get the element that triggered this onclick event
        e.target.closest('button');
        // console.log(this.activePromptID, this.DefaultPromptTemplates.filter(prompt => prompt.ID === this.activePromptID)[0] || this.OwnPrompts.filter(prompt => prompt.ID === this.activePromptID)[0])
        
        // get the parent element of the button (the prompt container)
         prompt = this.DefaultPromptTemplates.filter(prompt => prompt.ID === this.activePromptID)[0] || this.OwnPrompts.filter(prompt => prompt.ID === this.activePromptID)[0];
        //  console.log(prompt)
        if (prompt) {
          promptTemplate = prompt.Prompt;
          promptExist = true;
        }
      }


      let savePromptModal = document.getElementById('savePromptModal');

      // if modal does not exist, create it, add event listener on submit and append it to body
      if (!savePromptModal) {
        savePromptModal = document.createElement('div');
        savePromptModal.id = 'savePromptModal';

        savePromptModal.addEventListener(
          'submit',(e)=> {
            e.preventDefault();
            // console.log(e.submitter.name)
            e.submitter.name === "savePromptAsTemplate" ? this.savePromptAsTemplate(e): this.saveAsNewPromptTemplate(e);
          }
          
        );

        document.body.appendChild(savePromptModal);
      }

      // console.log("Modal: ",promptFull,promptFull?.Tone)

      savePromptModal.innerHTML = /*html*/ `
      <div style="z-index:1000;" class="fixed inset-0 text-center transition-opacity w-full ">
        <div class="absolute bg-gray-900 inset-0 opacity-90">
        </div>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex items-center justify-center min-h-full">
            <form id="savePromptForm">
              <input type="hidden" name="ID" ${promptID?`value="${promptID}"` : ""}  />
              
              <div
              class="align-center bg-white dark:bg-gray-800 dark:text-gray-200 inline-block overflow-hidden sm:rounded-lg shadow-xl sm:align-middle  sm:my-8  text-left transform transition-all"
              role="dialog" aria-modal="true" aria-labelledby="modal-headline" style="text-align: left;">
          
                <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-y-auto">
                <label>${extensionText.inputform.title.label}</label>
                  <input name="Title" type="text" ${promptExist?`value="${sanitizeInput(prompt.Title)}"` : ""}
                    title="${extensionText.inputform.title.placeholder}" required placeholder="${extensionText.inputform.title.placeholder}" class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded mb-3 mt-2 p-2 w-full" />
            

                    <label>${extensionText.inputform.teaser.label}</label>
                  <textarea name="Teaser" required
                    title="${extensionText.inputform.teaser.placeholder}'"
                    class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded p-2 mt-2 mb-3" style="height: 71px;"
                    placeholder="${extensionText.inputform.teaser.placeholder}"> ${promptExist?`value="${sanitizeInput(prompt.Teaser)}"` : ""}</textarea>
                    
                  <label>${extensionText.inputform.promptHint.label}</label>
                  <input name="PromptHint" required type="text"  ${promptExist?`value="${sanitizeInput(prompt.PromptHint)}"` : ""}
                    title="${extensionText.inputform.promptHint.placeholder}"
                    class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded p-2 mt-2 mb-3" placeholder="${extensionText.inputform.promptHint.placeholder}" />

                  <label>${extensionText.inputform.promptTemplate.label}</label>
                  <textarea name="Prompt" class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded p-2 mt-2 mb-3" style="height: 120px;" required
                            placeholder="${extensionText.inputform.promptTemplate.placeholer}"
                            title="${extensionText.inputform.promptTemplate.placeholer}">${sanitizeInput(
                              promptTemplate
                            )}</textarea>
            
                  
                  
                  <div class="flex" >
                    <div class="w-full mr-2">
                      <label>${extensionText.inputform.activity}</label>
                      <input type="text" list="tagsList" name="Tags" id="Category" multiple 
                      class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded p-2 mt-2 mb-3" >
                      <datalist id="tagsList" >
                        ${this.searchPredictionList.map(p => `
                              <option value="${p}">`
                          )
                          .join('')}
                      </datalist>
                    </div>

                  ${this.userTones[0] ? `<div class="w-full ml-2 items-start justify-center flex flex-col">
                      <label>Pompt Variation</label>
                        <select name="Tone" class="mt-2 mb-3 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-900 rounded w-full">
                        <option  value="" selected  > No Variation </option>

                          ${this.userTones
                            .map(
                              (tone) => /*html*/ `
                                <option  value="${sanitizeInput(
                                  tone.ID
                                )}">${sanitizeInput(tone.Label)}</option>`
                            )
                            .join('')}
                        </select>` : `<p  py-2 px-2 mt-6>None Defined</p>`}

                        <label class="text-sm">
                        <input name="companyTonesState" type="checkbox" class="mx-4 dark:bg-gray-700"> 
                        Apply overall company tone
                      </label>
                        
                        </div>

                        <a style="padding-top: 4%;padding-left: 10px;" title="Goto setting and click on My Variations to Manage Variations.">${svg('info')}</a>

                        
                      


                </div>
                </div>

                  

                 ${ isEditPromptEvent ? "" : `<div class="block mx-6 mt-4">
                    <label class="text-sm">
                      <input name="Public" value="true" type="checkbox" class="mx-4 dark:bg-gray-700"> 
                      ${extensionText.inputform.share}
                    </label>
                    
                    
            
                  <p class="mt-6 mx-4 text-[10px]">${extensionText.inputform.agreeText}</p>
                </div>`}
            
                <div class=" px-4 py-3 text-right">
                ${isEditPromptEvent === true ? `<button type="submit" name="saveAsNewPromptTemplate" class="bg-gray-600 hover:bg-gray-400 mr-2 px-4 py-2 mt-2 rounded text-white"
                          > ${extensionText.inputform.saveAsNew}
                  </button>`:"" }
                  <button type="button" class="bg-gray-600 hover:bg-gray-400 mr-2 px-4 py-2 mt-2 rounded text-white"
                          onclick="IN_BOUND.hideSavePromptModal()"> ${extensionText.inputform.cancel}
                  </button>
                  <button type="submit" name="savePromptAsTemplate" class="bg-orange-500 hover:bg-orange-500/10 mr-2 px-4 py-2 mt-2 rounded text-white">${extensionText.inputform.save}
                  </button>
                </div>
            
              </div>
            </form>
          </div>
        </div>
        
      </div>
    `;

      // add onchange event listener to select[name="Community"] to update the activities
      // savePromptModal.querySelector('select[name="Community"]').onchange = (
      //   event
      // ) => {
      //   // replace select[name="Category"] with new activities
      //   savePromptModal.querySelector('select[name="Category"]').innerHTML =
      //     this.getActivities(event.target.value)
      //       .map(
      //         (activity) => /*html*/ `
      //         <option value="${sanitizeInput(activity.ID)}">${sanitizeInput(
      //           activity.Label
      //         )}</option>`
      //       )
      //       .join('');
      // };

      savePromptModal.style = 'display: block;';

      // add event listener to close the modal on ESC
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.hideSavePromptModal();
        }
      });

    },

    addNewEmptyTone(){
      const newTone = [{ID:(new Date()).getTime() + Math.random().toString(16).slice(2), Label:"My New Variation", Description:"My Variation Detail"}];
      this.userTones = [...newTone, ...this.userTones];
      this.showSettingModal();
    },

    async deleteToneFromSetting(ID){
      // console.log('Delete Tone: ',ID)
      await this.Client.deleteTone(ID);
      this.refreshActions();
      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Tone was deleted!'
      );
    },

    async showSettingModal() {

      let settingModal = document.getElementById('settingModal');

      // if modal does not exist, create it, add event listener on submit and append it to body
      if (!settingModal) {
        settingModal = document.createElement('div');
        settingModal.id = 'settingModal';

        document.body.appendChild(settingModal);
      }


      settingModal.innerHTML =    `
      <div style="z-index:100;" class="fixed inset-0 text-center transition-opacity z-50 ">
          <div class="absolute bg-gray-900 inset-0 opacity-90">
          </div>

            <div class="fixed inset-0 overflow-y-auto">
              <div  class="flex items-center min-h-full justify-center flex-col">
                <div
                class="w-1/2 align-center px-4 py-4 bg-white dark:bg-gray-800 dark:text-gray-200 inline-block overflow-hidden sm:rounded-lg shadow-xl sm:align-middle sm:max-w-lg sm:my-8 sm:w-full text-left transform transition-all"
                role="dialog" aria-modal="true" aria-labelledby="modal-headline" style="text-align: left;">

                <div class="flex" style="justify-content:flex-end;">
                <a title="Close" 
                  class="pb-4 rounded-md hover:bg-gray-100 cursor-pointer hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                  onclick="IN_BOUND.hideModal('settingModal')"  >  ${svg('Cross-Round')}</a>
                </div>

                <div class="flex flex-wrap text-sm font-medium text-center text-gray-900 dark:text-gray-400 w-full border-b mb-4 pb-2">
                    
                  <button class="inline-block px-2 py-1  rounded-sm mr-2 ${this.settingsActiveTab === "settings"? 'bg-orange-500 text-white' : ""} " 
                  onclick="IN_BOUND.settingsActiveTab = 'settings'; IN_BOUND.showSettingModal() " > Setting </button>

                  <button class="inline-block px-2 py-1  rounded-sm mr-2 ${this.settingsActiveTab === "tones"? 'bg-orange-500 text-white' : ""} " 
                  onclick="IN_BOUND.settingsActiveTab = 'tones' ; IN_BOUND.showSettingModal()" > My Variations </button>
                  
                  <button class="inline-block px-2 py-1  rounded-sm mr-2 ${this.settingsActiveTab === "companyTones"? 'bg-orange-500 text-white' : ""} " 
                  onclick="IN_BOUND.settingsActiveTab = 'companyTones'; IN_BOUND.showSettingModal() " > Company Variations </button>
                   
                   
                </div>


                ${this.settingsActiveTab === "settings" ? `<div class="mr-4 w-1/5 text-left text-gray-900 dark:text-gray-400">
                  <label>Extension Language</label>
                  <select id="languageExtSelect" name="Community" class="mt-2 mb-3 text-gray-500 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-900 rounded w-full" required>
                  ${Object.keys(extensionLanguages)
                    .map(
                      (lang) =>
                        /*html*/ `<option   value="${lang}" ${
                          this.ExtLang === lang ? 'selected' : ''
                        }>${lang.charAt(0).toUpperCase() + lang.slice(1)}</option>`
                    )
                    .join('')}
                  </select>

                  


                </div>` : ""}

                
                ${this.settingsActiveTab === "tones" ? `

                    <div class="flex justify-between items-center text-center ">
                        <h3>Variations</h3>
                        <div class="flex text-center row">
                        
                        <a  class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                              onclick="IN_BOUND.importToneinSetting()"> ${svg('import-h5') } <input id="dropzone-file589325" type="file" accept=".json" class="hidden" /> </a>

                        <a  class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                             onclick="IN_BOUND.addNewEmptyTone()"> ${svg('add-5') }  </a>

                              </div>
                    </div>
                       ${ this.userTones.map( (tone) => ( `<div class="  ">
                       <div class="flex items-center  justify-between m-2 bg-gray-50 dark:bg-white/5 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900 border shadow border-gray-300 dark:border-gray-700 hover:shadow-lg transition duration-300 ease-in-out tw-border-2 tw-border-blue-500 tw-rounded-xl">
                          <div> <p>${tone.Label}</p> </div>
                          <div class="flex gap-1 justify-end items-start"> 

                              <a title="Copy variation" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                              onclick="IN_BOUND.copyToneFromSetting('${tone.ID}')"> ${svg('copy')}  </a>

                              <a title="Download variation" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                              onclick="IN_BOUND.exportToneFromSetting('${tone.ID}')"> ${svg('export')}  </a>
                            
                            
                              <a title="Edit variation" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                              onclick="${IN_BOUND.editActivatedTonesInSetting !== tone.ID ? `IN_BOUND.editActivatedTonesInSetting = '${tone.ID}'; IN_BOUND.showSettingModal();` : `IN_BOUND.editActivatedTonesInSetting = ''; IN_BOUND.showSettingModal()`}"> ${IN_BOUND.editActivatedTonesInSetting === tone.ID ? svg('EditOrange') : svg('Edit')}  </a>
                            
                              <a title="Delete variation" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                              onclick="IN_BOUND.deleteToneFromSetting('${tone.ID}')"> ${svg('Cross') }  </a>
                          
                              </div> 
                        </div>
                        
                        <form id="saveToneForm" class="${IN_BOUND.editActivatedTonesInSetting === tone.ID ? '' : "hidden"}   " >
                        <input type="hidden" name="ID" value="${tone.ID}" />
                        
                      <div
                        class="align-center bg-white dark:bg-gray-800 dark:text-gray-200 inline-block overflow-hidden sm:rounded-lg shadow-xl sm:align-middle w-full text-left transform transition-all"
                        role="dialog" aria-modal="true" aria-labelledby="modal-headline" style="text-align: left;">
                    
                        <div class="bg-white dark:bg-gray-800 px-4 overflow-y-auto">
                          <label>Title</label>
                            <input name="Label" type="text" value="${tone.Label}"}
                              title="Tone Label" required placeholder="Tone Label" class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded mb-3 mt-2 p-2 w-full" />
                      
                            <label>Tone</label>
                            <textarea name="Description" class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded p-2 mt-2 mb-3" style="height: 120px;" required
                                      placeholder="Tone"
                                      title="Tone">${tone.Description}</textarea>
                      
                            <div class=" px-4 py-3 text-right">
                              
                                <button type="button" class="bg-gray-600 hover:bg-gray-400 mr-2 px-4 py-2 mt-2 rounded text-white"
                                        onclick=" IN_BOUND.editActivatedTonesInSetting = ''; IN_BOUND.showSettingModal() " "> Cancel
                                </button>
                                <button type="submit" class="bg-orange-500 hover:bg-orange-500/10 mr-2 px-4 py-2 mt-2 rounded text-white">Save
                                </button>
                            </div>
              
                        </div>
                      </form>

                        </div></div>`)).join('')}
                        
                ` : ""}


              ${this.settingsActiveTab === "companyTones" ? `

                <div class="flex justify-between items-center text-center ">
                    <h3>Company Variations</h3>
                </div>
                   ${ this.companyTones.map( (tone) => ( `<div class="  ">
                   <div class="flex items-center  justify-between m-2 bg-gray-50 dark:bg-white/5 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900 border shadow border-gray-300 dark:border-gray-700 hover:shadow-lg transition duration-300 ease-in-out tw-border-2 tw-border-blue-500 tw-rounded-xl">
                      <div> <p>${tone.Label}</p> </div>
                      <div class="flex gap-1 justify-end items-start"> 
                        
                          <a title="Copy to user variations"  class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                          onclick="IN_BOUND.forkActivatedTonesInSetting('${tone.ID}'); IN_BOUND.showSettingModal();"> ${svg('fork')}  </a>
                        
                      
                          </div> 
                    </div>
                    `)).join('')}
                    
            ` : ""}


              </div>
            </div>
          <div>
        </div>
  `;

      

      settingModal.style = 'display: block;';

      settingModal
        ?.querySelector('#languageExtSelect')
        ?.addEventListener('change', this.changeExtLanguage.bind(this));

      // settingModal
      //   ?.querySelector('#webAccess')
      //   ?.addEventListener('change', this.changeWebAccess.bind(this));

      const allSaveForms = settingModal.querySelectorAll('#saveToneForm');

      for(let i=0; i< allSaveForms.length; i++){
        allSaveForms[i]?.addEventListener(
          'submit', async function(e){
            e.preventDefault();
            // console.log(e)
            
            const tone = {
              ID: e.target[0].value,
              Label: e.target[1].value,
              Description: e.target[2].value,
            };

            // console.log(tone)

            IN_BOUND.showNotification(
              NotificationSeverity.SUCCESS,
              'Sync..'
            );

            IN_BOUND.editActivatedTonesInSetting = "";

            const toneNew = {id: tone.ID, label:tone.Label, prompt:tone.Description, user:IN_BOUND.Client.User.Email, company:IN_BOUND.Company};
            
            await IN_BOUND.Client.saveEditTone(toneNew);
        
            IN_BOUND.refreshActions();
        
            IN_BOUND.showNotification(
              NotificationSeverity.SUCCESS,
              'Tone changes was saved!'
            );
            
            IN_BOUND.showSettingModal();

          });
      }
      // this.saveEditedTone.bind(this)

      settingModal
        ?.querySelector('#companyToneState')
        ?.addEventListener('click', this.changeCompanyToneState.bind(this));

      // add event listener to close the modal on ESC
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.hideModal('settingModal');
        }
      });
    },

    async forkActivatedTonesInSetting(id){
      const tone = this.companyTones.filter(d => d.ID === id)[0];
      const randonUUID = Math.random().toString(36).substring(2) + '-' + (new Date().getTime()).toString(36);
      tone.ID = window.crypto?.randomUUID() || randonUUID;
      if(tone){
        const toneNew = {id: tone.ID, label: "Copy of: "+tone.Label, prompt:tone.Description, user:IN_BOUND.Client.User.Email, company:IN_BOUND.Company};
        await IN_BOUND.Client.saveEditTone(toneNew);
        await IN_BOUND.refreshActions();
        this.showSettingModal();
        IN_BOUND.showNotification(
          NotificationSeverity.SUCCESS,
          'Variation added!'
        );
      }
    },

    exportToneFromSetting(id){
      const tone = this.userTones.filter(d => d.ID === id)[0];
      const randonUUID = Math.random().toString(36).substring(2) + '-' + (new Date().getTime()).toString(36);
      tone.ID = window.crypto?.randomUUID() || randonUUID;
      if(tone){
        const toneNew = {id: tone.ID, label: tone.Label, prompt:tone.Description, user:IN_BOUND.Client.User.Email, company:IN_BOUND.Company};
        this.exportContent(toneNew, toneNew.label);

        IN_BOUND.showNotification(
          NotificationSeverity.SUCCESS,
          'Variation downloaded!'
        );
      }
    },

    copyToneFromSetting(id){
      const tone = this.userTones.filter(d => d.ID === id)[0];
      if(tone){

        this.copyTextClipboard(tone.Description);

        IN_BOUND.showNotification(
          NotificationSeverity.SUCCESS,
          'Variation copied!'
        );
      }
    },

    importToneinSetting(){
      const inputFileDiv = document.getElementById('dropzone-file589325');
      inputFileDiv.click();

      inputFileDiv.onchange = (event) => {
        // event.stopPropagation();
        // event.preventDefault();

        const fileList = event.target.files;
        // console.log(fileList);

        var reader = new FileReader();
        reader.onload = async function() {
          var text = reader.result;
          let tone = JSON.parse(text);
          const randonUUID = Math.random().toString(36).substring(2) + '-' + (new Date().getTime()).toString(36);
          tone.id = window.crypto?.randomUUID() || randonUUID;
          // console.log(tone);
          if(tone){
            ({ ID: tone.id, Label: "Import of: "+tone.label, Description: tone.prompt, type:"user"});
            if(tone.prompt){
              await IN_BOUND.Client.saveEditTone(tone);
              IN_BOUND.showNotification(
                NotificationSeverity.SUCCESS,
                'Variation added!'
              );
              await IN_BOUND.refreshActions();
              IN_BOUND.showSettingModal();
            }else {
              IN_BOUND.showNotification(
                NotificationSeverity.SUCCESS,
                'Invalid Variation!'
              );
            }
          }
          
        };
        reader.readAsText(fileList[0]);
      };
    },

    changeWebAccess(){
      this.WebAccess = !this.WebAccess;
      window.localStorage.setItem('WebAccess','true');
      this.showSettingModal();
    },

    async showVariablesModal(template) {
      
      // console.log(template)

      let prompt = template.Prompt;
      let variables_0 = prompt.split('{{');
      let variables = variables_0.map(d => d.indexOf('}}') > -1 ? d.split('}}')[0] : "").filter(d => d!== '');
      let variablesModal = document.getElementById('variablesModal');

      // if modal does not exist, create it, add event listener on submit and append it to body
      if (!variablesModal) {
        variablesModal = document.createElement('div');
        variablesModal.id = 'variablesModal';

        variablesModal.addEventListener('submit', function(e){
          e.preventDefault();

          IN_BOUND.addVariablesToPrompt(e);
        });

        document.body.appendChild(variablesModal);
      }

      variablesModal.innerHTML = /*html*/ `
      <div style="z-index:1000;" class="fixed inset-0 text-center transition-opacity ">
        <div class="absolute bg-gray-900 inset-0 opacity-90">
        </div>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex items-center justify-center min-h-full">
            <form id="saveVariableForm">
              
              <div
              class="align-center px-6 py-4 bg-white dark:bg-gray-800 dark:text-gray-200 inline-block overflow-hidden sm:rounded-lg shadow-xl sm:align-middle sm:max-w-lg sm:my-8 sm:w-full text-left transform transition-all"
              role="dialog" aria-modal="true" aria-labelledby="modal-headline" style="text-align: left;">
          
                ${variables.map(variable => {
                  return `
                  <label>${variable}</label>
                  <textarea name="{{${variable}}}" class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded p-2 mt-2 mb-3" style="height: 120px;" required
                            placeholder="Add ${variable}"
                            title="Add ${variable}"></textarea>
                  `
                }).join('')}
            
                <div class=" px-4 py-3 text-right">
                  <button type="button" class="bg-gray-600 hover:bg-gray-400 mr-2 px-4 py-2 mt-2 rounded text-white"
                          onclick="IN_BOUND.hideModal('variablesModal')"> Cancel
                  </button>
                  <button type="submit" name="savePromptVariables" class="bg-orange-500 hover:bg-orange-500/10 mr-2 px-4 py-2 mt-2 rounded text-white"> Submit
                  </button>
                </div>
            
              </div>
            </form>
          </div>
        </div>
        
      </div>
    `;

      variables.length>0 ? variablesModal.style = 'display: block;' : variablesModal.style = 'display: none;';
      

      // add event listener to close the modal on ESC
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.hideModal('variablesModal');
        }
      });
    },

    async addVariablesToPrompt(e){
      const formData = new FormData(e.target);
      let prompt = this.SelectedPromptTemplate.Prompt;

      for (const [key, value] of formData) {
        // console.log(prompt.indexOf(key), key, value)

        if(key === "{{WebSearch}}"){
          this.webResults = [];
          this.Client.getDdgResults(value);
          // console.log(results)
          // prompt = await this.processDDGResults(results)
        }else if(key === "{{WebNews}}"){
          this.webResults = [];
          this.Client.getGoogleNewsResults(value);
          // console.log(results)
          // prompt = await this.processGoogleNewsResults(results)
        }else {
          prompt = prompt.replace(key,value);
        }
        
      }
      // console.log(prompt)

      
      this.SelectedPromptTemplate = {...this.SelectedPromptTemplate, Prompt: prompt};
      // console.log(variables, this.SelectedPromptTemplate)
      this.hideModal('variablesModal');
    },

    changeCompanyToneState(e){
      this.companyTonesState = e.target.checked;
      window.localStorage.setItem('companyTonesState',this.companyTonesState);

      this.refreshActions();
      // this.insertLanguageToneWritingStyleContinueActions();
    },


    // This function adds an "Export Button" to the sidebar
    addExportButton() {
      // Get the nav element in the sidebar
      const nav = document.querySelector('nav');
      // If there is no nav element or the "Export Button" already exists, skip
      if (!nav || nav.querySelector('#export-button')) return;

      // Create the "Export Button" element
      const button = document.createElement('a');
      button.id = 'export-button';
      button.className = css`ExportButton`;
      button.innerHTML = /*html*/ `${svg`Export`} Export Conversation`;
      button.onclick = this.exportCurrentChat.bind(this);

      // If there is no chat started, disable the button
      if (document.querySelector('.flex-1.overflow-hidden h1')) {
        button.style = 'pointer-events: none;opacity: 0.5';
      }

      // Get the Log out button as a reference
      const colorModeButton = [...nav.children].find((child) =>
        child.innerText.includes('Log out')
      );
      // Insert the "Export Button" before the "Color Mode" button
      nav.insertBefore(button, colorModeButton);

      // Create the "Version" element
      // const version = document.createElement('a');
      // version.id = 'AppName';
      // version.className = css`VersionInfo`;
      // version.innerHTML = /*html*/ `${svg`Rocket`}` + AppName + ' powered';
      //version.onclick = exportCurrentChat
      // version.href = AppURL;

      // Get the Log out button as a reference
      // const colorModeButton2 = [...nav.children].find((child) =>
      //   child.innerText.includes('Log out')
      // );
      // Insert the "Export Button" before the "Color Mode" button

      // nav.insertBefore(version, colorModeButton2);

      // Create the "IN_BOUND Community Forum" element
      // const forum = document.createElement('a');
      // forum.className = css('VersionInfo');
      // forum.innerHTML = `${svg('Community')} IN_BOUND Community Forum`;
      // forum.href = AppCommunityForumURL;

      // nav.insertBefore(forum, colorModeButton);
    },

    // This function gets the "New Chat" buttons
    getNewChatButtons() {
      // Get the sidebar and topbar elements
      const sidebar = document.querySelector('nav');
      const topbar = document.querySelector('.sticky');
      // Get the "New Chat" button in the sidebar
      const newChatButton = [
        ...(sidebar?.querySelectorAll('.cursor-pointer') ?? []),
      ].find((e) => e.innerText === 'New chat');
      // Get the "Plus" button in the topbar
      const AddButton = topbar?.querySelector('button.px-3');
      // Return an array containing the buttons, filtering out any null elements
      return [newChatButton, AddButton].filter((button) => button);
    },


    copyPromptClipboard(id) {
      // console.log(id)
      setTimeout( function() {
        const prompt = IN_BOUND.current_active_prompts.filter(p => p.promptID === id)[0].Prompt;
        // console.log(prompt)
        navigator.clipboard
        .writeText(prompt)
        .then(
          // successfully copied
          () => {
            

            // Success - copied & public
            IN_BOUND.showNotification(
              NotificationSeverity.SUCCESS,
              'The prompt template was copied to your clipboard.'
            );
          },
          // error - something went wrong (permissions?)
          () => {
            IN_BOUND.showNotification(
              NotificationSeverity.ERROR,
              'Something went wrong. Please try again.'
            );
          }
        );
      },100);
      
    },


    copyTextClipboard(txt){
      navigator.clipboard
      .writeText(txt)
      .then(
      );
    },
    

    /**
     * Filter templates based on selected activity and search query
     *
     * @param {Prompt[]} templates
     * @returns {Prompt[]} filtered templates
     */
    filterPromptTemplates(templates) {
      return templates.filter((template) => {
        return (
          (!this.PromptSearch ||
            template.Teaser.toLowerCase().includes(
              this.PromptSearch.toLowerCase()
            ) ||
            template.Title.toLowerCase().includes(
              this.PromptSearch.toLowerCase()
            ) || template.Tags.toLowerCase().includes(
              this.PromptSearch.replace('#','').toLowerCase()
            ))
        );
      });
    },

    showLoadingInterface(txt) {
      this.getTheme();
      console.log("Theme 1:"+this.themeMode, "Theme 2:"+this.Theme);

      const html = `
    <div id="custom__ripple_Loader" class="box">
        <div class="ripple__rounds">
        ${this.Theme === 'dark' ? svg('no-txt-logo-dark') :  svg('no-txt-logo-light')}
        <p class="loading-text">${txt}</p>
        </div>
        
    </div>

    `;


      let wrapper = document.createElement('div');
     wrapper.id = 'templates-wrapper';
     wrapper.className =
       'mt-2 md:flex items-start text-center gap-2.5 md:max-w-2xl lg:max-w-3xl m-auto text-sm';

      let sideBarWrapper = document.getElementById('sideBarWrapper').querySelector('nav');
      if (sideBarWrapper.querySelector('#templates-wrapper')) {
        wrapper = sideBarWrapper.querySelector('#templates-wrapper');
      } else {
        sideBarWrapper.appendChild(wrapper);
      }

      wrapper.innerHTML = html;
      // sideBarWrapper.classList.add("loading")
    },

    hideLoadingInterface(){
      let sideBarWrapper = document.getElementById('sideBarWrapper').querySelector('nav');
      sideBarWrapper.querySelector('.box').classList.add("not-show");
    },

    checkLoader() {
      if(this.isLoading){
        this.showLoadingInterface();
      }else {
        this.hideLoadingInterface();
        this.insertPromptTemplatesSection();
      }
    },

    // This function inserts a section containing a list of prompt templates into the chat interface
    insertPromptTemplatesSection() {

      let templates = this.PromptTemplates;

      if (!templates) return;

      templates =
        this.PromptTemplatesType === PromptTemplatesType.OWN
          ? this.OwnPrompts
          : templates;

      // Use index as ID for each template actions
      templates = templates.map((template, index) => ({
        ...template,
        promptID: template.ID,
        ID: index,
        pin: template.pin === undefined ? false : template.pin,
        favourite: template.favourite === undefined ? false : template.favourite,
      }));
      // console.log(templates)

      templates = this.filterPromptTemplates(templates);

      // console.log(templates)

      let pinTemplates = templates.filter(template => template.pin === true );
      let normalTemplates = templates.filter(template => template.pin === false );
      templates = [...pinTemplates, ...normalTemplates];

      // console.log(templates)

      templates = this.feedSelected === "All" ? templates : templates.filter(prompt => prompt.favourite === true) || [];

      // console.log(templates)

      
      // Get the current page number and page size from the promptTemplateSection object
      const { currentPage, pageSize } = this.PromptTemplateSection;
      // Calculate the start and end indices of the current page of prompt templates
      const start = pageSize * currentPage;
      const end = Math.min(pageSize * (currentPage + 1), templates.length);
      // Get the current page of prompt templates
      let currentTemplates = templates.slice(start, end);


      let dragSortList = [];
      let savedList = window.localStorage.getItem('promptCardOrder')?.split(',');
      let currenTemplatesList = currentTemplates.slice();
      // console.log(savedList)
      let promptTypeGetting = this.PromptTemplatesType === PromptTemplatesType.OWN;
  // console.log(promptTypeGetting)
      if(savedList && promptTypeGetting){
        for(let i=0; i< savedList.length; i++){
          let item = currenTemplatesList.filter( el => el.promptID === savedList[i])[0];
          if(!item);else {
            dragSortList.push(item);
            currenTemplatesList = currenTemplatesList.filter( el => el.promptID !== savedList[i]);
            // console.log(currenTemplatesList)
          }
        }
        currenTemplatesList.length > 0 ? dragSortList = [...currenTemplatesList, ...dragSortList] : "";
        currentTemplates = dragSortList;
      }
      this.current_active_prompts = currentTemplates;
      // console.log("Templates: ", currentTemplates)

      /**
       * Add search typed prediction words to a list
       */
      let predict = currentTemplates.map(t => '#' + t.Tags);
      this.searchPredictionList = Array.from(new Set(predict));

      // Pagination buttons (conditionally rendered, depending on the number of prompt templates)

      const paginationContainerTop = ``;

    //   const paginationContainerTop = /*html*/ `
      

    //   <div class="flex flex-1 gap-3.5 justify-between items-center sm:flex-col ">
    //   <div></div>
      
    //     <div class="${css`paginationButtonGroup`}">
    //       <button onclick="IN_BOUND.prevPromptTemplatesPage()" class="${css`paginationButton`}" style="border-radius: 6px 0 0 6px">${svg`previous`}</button>
    //       <button onclick="IN_BOUND.nextPromptTemplatesPage()" class="${css`paginationButton`} border-0 border-l border-gray-500" style="border-radius: 0 6px 6px 0">${svg`next`}</button>
    //     </div>
    //   </div>
    // `;

      const paginationContainerBottom = /*html*/ `
    
    <div class="flex flex-1 gap-3.5 justify-between items-center sm:flex-col ">
    <span class="${css`paginationText`}">
        Showing <span class="${css`paginationNumber`}">${
      start + 1
    }</span> to <span class="${css`paginationNumber`}">${end}</span> of <span class="${css`paginationNumber`}">${
      templates.length
    } Prompts</span>
      </span>

      <div class="${css`paginationButtonGroup`}">
        <button onclick="IN_BOUND.prevPromptTemplatesPage()" class="${css`paginationButton`}" style="border-radius: 6px 0 0 6px">${svg`previous`}</button>
        <button onclick="IN_BOUND.nextPromptTemplatesPage()" class="${css`paginationButton`} border-0 border-l border-gray-500" style="border-radius: 0 6px 6px 0">${svg`next`}</button>
      </div>
    </div>
  `;

      // Create the HTML for the prompt templates section
      const html = /*html*/ `
    <div class="${css`column`} relative">

      ${
        this.isAdmin()
          ? /*html*/ `
            <div class="absolute top-0 right-0">
              <label class="relative inline-flex items-center mb-5 cursor-pointer flex-col" title="Admin Mode">
                <input type="checkbox" value="" class="sr-only peer" id="adminMode" onchange="IN_BOUND.toggleAdminMode()" ${
                  this.AdminMode ? ' checked' : ''
                }>
                <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"></div>
                <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
              </label>
            </div>
          `
          : ''
      }

    
      <div class="flex flex-1 gap-3.5 justify-between items-center"  >
        <div>
        ${this.Theme === 'dark' ? this.companyMeta.light_logo? `<img src='${this.companyMeta.light_logo}' class="logo-bg" />` : svg('Logo-light') : this.companyMeta.dark_logo? `<img src='${this.companyMeta.dark_logo}' class="logo-bg" />` : svg('Logo-dark')}
        </div>
        <div  class="flex gap-1 justify-end items-start" >
        
        <div>
          <input list="prediction" id="promptSearchInput" type="text" class="bg-gray-100 border-0 text-sm rounded block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0 md:w-full" placeholder="${extensionText.search}" 
          value="${sanitizeInput(
            this.PromptSearch
          )}" onfocus="this.value = this.value">
            <datalist id="prediction">
            ${this.searchPredictionList.map(p => (
              `<option style="font-size:small; padding:0;" value="${p}"></option>`
            )).join('')}
            </datalist>
        </div>

        </div>
      </div>
      


  
      <div class="flex flex-1 gap-3.5 justify-between items-center  ">
      <div class="flex flex-1 gap-3.5 justify-between  ">

        <div class="flex flex-1 gap-3.5 justify-start items-start sm:flex-col ">
      
      ${this.import? '' : ` <div>
          <select id="promptTypeSelect" class="bg-gray-100 pr-7 border-0 text-xs rounded block w-full dark:bg-gray-600 dark:border-gray-600 dark:hover:bg-gray-700 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0">
            
          <option class="mx-1 dark:bg-gray-700 dark:text-white"  value="${PromptTemplatesType.PUBLIC}" ${
            this.PromptTemplatesType === PromptTemplatesType.PUBLIC ? 'selected' : ''
          }>${extensionText.tabsLabel[0]}</option>

          <option class="mx-1 dark:bg-gray-700 dark:text-white"  value="${PromptTemplatesType.OWN}" ${
            this.PromptTemplatesType === PromptTemplatesType.OWN ? 'selected' : ''
          }>${extensionText.tabsLabel[1]}</option>
            
          </select>
        </div>`}

        
        

      </div>

      <div class="flex gap-1 justify-end items-start">

      <a title="Reload All Data" class="p-1 rounded-md hover:bg-gray-100 cursor-pointer hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
        onclick="IN_BOUND.reloadAllData()">${svg('reload')}</a>
      
      <a title="${extensionText.titleOnTopIcons[0]}" class="p-1 rounded-md hover:bg-gray-100 cursor-pointer hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
        onclick="IN_BOUND.showSettingModal()">${svg('setting')}</a>
        
        <a title="${extensionText.titleOnTopIcons[1]}" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
        onclick="IN_BOUND.showSavePromptModal()">${svg('add')}</a>

        <a title="${extensionText.titleOnTopIcons[2]}" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
        onclick="IN_BOUND.clickeFileInput()">${this.import? svg('import-yellow') : svg('import')} <input id="dropzone-file589" type="file" accept=".json" class="hidden" /></a>

        ${this.import? '' :`<a title="${extensionText.titleOnTopIcons[5]}" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="IN_BOUND.changeFeedSelect('${this.feedSelected === "All" ? "Favourites":"All"}')">
        ${this.feedSelected === "All"? svg`star-gray` : svg`star-yellow`} </a>`}
  
        <a title="${extensionText.titleOnTopIcons[3]}" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="IN_BOUND.changeFeedView('list')">
        ${this.feedView ==="list"? svg`list-yellow`: svg`list`} </a>
  
        <a title="${extensionText.titleOnTopIcons[4]}" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="IN_BOUND.changeFeedView('grid')">
        ${this.feedView ==="grid"? svg`grid-yellow`: svg`grid`} </a>

      </div>

      </div>
      </div>

<div class="flex flex-1 gap-3.5 justify-between items-center sm:flex-col ">
        
      

    </div>

      ${
        templates.length > this.PromptTemplateSection.pageSize
          ? paginationContainerTop
          : ''
      }
      
      <ul class="${css`ul`} grid grid-cols-1 lg:grid-cols-1 ">
        ${this.feedView === "list"? currentTemplates
          .map(
            (template) => /*html*/ `
          <button onclick="IN_BOUND.selectPromptTemplateByIndex(${
            template.ID
          })" data-id="${template.promptID}" class="${css`card`} relative group  ">
            <div class="flex items-center w-full justify-between">

            <div class="text-gray-500 text-xs flex  max-w-full">
             
              ${
                template.AuthorURL && template.AuthorName
                  ? /*html*/ `
                    <a href="#" class="mx-1 overflow-hidden text-ellipsis flex-1"
                      style="white-space: nowrap;"
                      onclick="event.stopPropagation()"
                      rel="noopener noreferrer" 
                      title="${extensionText.authorTitle} ${sanitizeInput(template.AuthorName)} - ${sanitizeInput(template.AuthorURL)}">
                      ${sanitizeInput(template.AuthorName).slice(0,15)}
                    </a>`
                  : ''
              }            
              · 
              <span title="${extensionText.timeTitle} ${formatDateTime(
                template.RevisionTime
              )}" class="mx-1">${formatAgo(template.RevisionTime)}</span>

            </div>
              
            ${this.access.cardMenuInDots ? `<div class="flex gap-4 justify-center lg:gap-1 lg:pl-2 mt-1 right-2 text-gray-400   group-hover:visible">
               <a title="Show Options" id="PromptCardOptionsBtn" onclick="IN_BOUND.toogleOptionsVisibility('PromptCardOptions-${template.ID}')" class=" p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" >${svg('horizontal-menu')}</a>
            </div>` : ""}

            <div class="${this.access.cardMenuInDots ? "hidden absolute right-9 rounded border bg-white dark:bg-gray-800  dark:border-bg-ray-700" : "flex right-1" } gap-4 justify-center lg:gap-1 lg:pl-2 mt-1 text-gray-600 group-hover:visible " ${this.access.cardMenuInDots ? `onmouseleave="IN_BOUND.hideOptionsVisibility('PromptCardOptions-${template.ID}')"` : ""} id="PromptCardOptions-${template.ID}">

                ${
                  this.PromptTemplatesType === PromptTemplatesType.PUBLIC &&
                  !template.OwnPrompt
                    ? /*html*/ `
                    ${this.import? '' : `<a title="${template.favourite? extensionText.cardIconsTitle[1] : extensionText.cardIconsTitle[0]}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.${template.favourite? 'voteThumbsDown' :'voteThumbsUp'}('${
                      template.promptID
                    }')">${svg(template.favourite? 'star-yellow' : 'star-gray')}</a>`}

                      <a title="${this.forkPromptTemplates.includes(template.promptID)? extensionText.cardIconsTitle[3] : extensionText.cardIconsTitle[2] }" class="p-1 ${this.forkPromptTemplates.includes(template.promptID)? "cursor-not-allowed" : ""} rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                      onclick=" ${this.forkPromptTemplates.includes(template.promptID)? "" : `IN_BOUND.forkPrompt('${ template.promptID }')` }"> ${this.forkPromptTemplates.includes(template.promptID)? svg('fork-yellow') : svg('fork')}</a>

                      

                      ${this.import? '' : `<a title="${template.pin? extensionText.cardIconsTitle[5] : extensionText.cardIconsTitle[4]}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.${template.pin? 'removePin' :'addToPin'}('${
                        template.promptID
                      }')">${svg(template.pin? 'pin-yellow' : 'pin-gray')}</a>
                      
                      
                    `}

                      
                  
                    `
                    : `<a title="${template.favourite? extensionText.cardIconsTitle[1] : extensionText.cardIconsTitle[0]}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.${template.favourite? 'voteThumbsDown' :'voteThumbsUp'}('${
                      template.promptID
                    }')">${svg(template.favourite? 'star-yellow' : 'star-gray')}</a>

                      ${this.import? '' : `<a title="${template.pin? extensionText.cardIconsTitle[5] : extensionText.cardIconsTitle[4]}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.${template.pin? 'removePin' :'addToPin'}('${
                        template.promptID
                      }')">${svg(template.pin? 'pin-yellow' : 'pin-gray')}</a>
                      
                      <a title="${extensionText.cardIconsTitle[6]}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.exportPromptTemplate('${
                        template.promptID
                      }')">${svg('export')}</a>

                      <a title="Drag" class=" PromptCardSelector p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                      >${svg('drag-hand')}</a>

                      

                      
                    
                    `}`
                }
                
                ${
                  this.PromptTemplatesType === PromptTemplatesType.OWN ||
                  template.OwnPrompt ||
                  this.isAdminMode()
                    ? /*html*/ `

                    <a title="Copy Prompt" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                    onclick="event.stopPropagation(); IN_BOUND.copyPromptClipboard('${template.promptID}')">${svg('copy')}</a>

                  <a title="${extensionText.editPrmptTitle}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.editPromptTemplate(${
                    template.ID
                  })">${svg('Edit')}</a>
                  <a title="${extensionText.dltPrmptTitle}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.deletePromptTemplate(${
                    template.ID
                  })">${svg('Cross')}</a>

                  
                  `
                    : ''
                }
              </div>
            </div>      

            <h4 class="${css`h3`}" style="overflow-wrap: anywhere;">${sanitizeInput(
              template.Title
            )}</h4>
            
            <p class="${css`p`} text-gray-600 dark:text-gray-200 overflow-hidden text-ellipsis" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;"
              title="${sanitizeInput(template.Teaser)}">
              ${sanitizeInput(template.Teaser)}
            </p>

            

        </button>
      `
          )
          .join('')
        :
        currentTemplates
          .map(
            (template) => /*html*/ `
          <button onclick="IN_BOUND.selectPromptTemplateByIndex(${
            template.ID
          })" class="${css`card`} relative group "  data-id="${template.promptID}"  >
            <div  class="flex items-start w-full justify-between">
              <h4 class="${css`h3`}" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${sanitizeInput(
                template.Title
            )}</h4>

            ${this.access.cardMenuInDots ? `<div class="flex gap-4 justify-center lg:gap-1 lg:pl-2 mt-1 right-2 text-gray-400   group-hover:visible">
            <a title="Show Options" id="PromptCardOptionsBtn" onclick="IN_BOUND.toogleOptionsVisibility('PromptCardOptions-${template.ID}')" class=" p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" >${svg('horizontal-menu')}</a>
            </div>` : ""}

            <div class="${this.access.cardMenuInDots ? "hidden absolute right-9 rounded border bg-white dark:bg-gray-800  dark:border-bg-ray-700" : "flex right-1" } gap-4 justify-center lg:gap-1 lg:pl-2 mt-1 text-gray-600 group-hover:visible " ${this.access.cardMenuInDots ? `onmouseleave="IN_BOUND.hideOptionsVisibility('PromptCardOptions-${template.ID}')"` : ""} id="PromptCardOptions-${template.ID}">

                ${
                  this.PromptTemplatesType === PromptTemplatesType.PUBLIC &&
                  !template.OwnPrompt
                    ? /*html*/ `
                      <a title="${template.favourite ? extensionText.cardIconsTitle[1] : extensionText.cardIconsTitle[0]}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.${template.favourite ? 'voteThumbsDown' :'voteThumbsUp'}('${
                        template.promptID
                      }')">${svg(template.favourite ? 'star-yellow' : 'star-gray')}</a>

                      <a title="${this.forkPromptTemplates.includes(template.promptID)? extensionText.cardIconsTitle[3] : extensionText.cardIconsTitle[2] }" class="p-1 ${this.forkPromptTemplates.includes(template.promptID)? "cursor-not-allowed" : ""} rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                      onclick=" ${this.forkPromptTemplates.includes(template.promptID)? "" : `IN_BOUND.forkPrompt('${ template.promptID }')` }"> ${this.forkPromptTemplates.includes(template.promptID)? svg('fork-yellow') : svg('fork')}</a>

                      

                      <a title="${template.pin ? extensionText.cardIconsTitle[5] : extensionText.cardIconsTitle[4]}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.${template.pin ? 'removePin' :'addToPin'}('${
                        template.promptID
                      }')">${svg(template.pin ? 'pin-yellow' : 'pin-gray')}</a>
                      
                  
                    `
                    : `<a title="${template.favourite ? extensionText.cardIconsTitle[1] : extensionText.cardIconsTitle[0]}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.${template.favourite ? 'voteThumbsDown' :'voteThumbsUp'}('${
                      template.promptID
                    }')">${svg(template.favourite ? 'star-yellow' : 'star-gray')}</a>

                    <a title="${extensionText.cardIconsTitle[6]}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.exportPromptTemplate('${
                      template.promptID
                    }')">${svg('export')}</a>

                    <a title="${template.pin ? extensionText.cardIconsTitle[5] : extensionText.cardIconsTitle[4]}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.${template.pin ? 'removePin' :'addToPin'}('${
                      template.promptID
                    }')">${svg(template.pin ? 'pin-yellow' : 'pin-gray')}</a>
                    
                    
                    
                    `
                }
                
                ${
                  this.PromptTemplatesType === PromptTemplatesType.OWN ||
                  template.OwnPrompt ||
                  this.isAdminMode()
                    ? /*html*/ `

                    <a title="Copy Prompt" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                    onclick="event.stopPropagation(); IN_BOUND.copyPromptClipboard('${template.promptID}')">${svg('copy')}</a>

                  <a title="${extensionText.editPrmptTitle}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.editPromptTemplate(${
                    template.ID
                  })">${svg('Edit')}</a>
                  <a title="${extensionText.dltPrmptTitle}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.deletePromptTemplate(${
                    template.ID
                  })">${svg('Cross')}</a>
                  `
                    : ''
                }
              </div>
            </div>      

            <div class="-mt-0.5 text-gray-500 text-xs pb-1 max-w-full">
              
            </div>

        </button>
      `
          )
          .join('')
      }
            
        
      </ul>
    
      ${
        templates.length > this.PromptTemplateSection.pageSize
          ? paginationContainerBottom
          : ''
      }
      
    </div>
   `;

     let wrapper = document.createElement('div');
     wrapper.id = 'templates-wrapper';
     wrapper.className =
       'mt-2 md:flex items-start text-center gap-2.5 md:max-w-2xl lg:max-w-3xl m-auto text-sm';

       let sideBarWrapper = document.getElementById('sideBarWrapper').querySelector('nav');
      if (sideBarWrapper.querySelector('#templates-wrapper')) {
       wrapper = sideBarWrapper.querySelector('#templates-wrapper');
     } else {
       sideBarWrapper.appendChild(wrapper);
     }

      wrapper.innerHTML = html;

      // Add event listeners for topic, activity, sort by select, search input and prompts per page select
      
      

      wrapper
        ?.querySelector('#promptTypeSelect')
        ?.addEventListener('change', this.changePromptTemplatesType.bind(this));

      // wrapper
      //   ?.querySelector('#activitySelect')
      //   ?.addEventListener('change', this.changePromptActivity.bind(this));

      // wrapper
      //   ?.querySelector('#sortBySelect')
      //   ?.addEventListener('change', this.changePromptSortBy.bind(this));

      wrapper
        ?.querySelector('#promptSearchInput')
        ?.addEventListener(
          'input',
          this.debounce(this.changePromptSearch.bind(this), 1000).bind(this)
        );

      const pageSizeSelectElements = wrapper?.querySelectorAll(
        'select.pageSizeSelect'
      );

      // this.PromptTemplatesType === PromptTemplatesType.PUBLIC ? "" : this.dragSortPromptsList()
      
      

      // Remove event listener for the pagination buttons (if not needed/already added)
      document.removeEventListener('keydown', this.boundHandleArrowKey);

      // Add event listener for the pagination buttons and page size select elements
      if (pageSizeSelectElements.length > 0) {
        pageSizeSelectElements.forEach((select) => {
          select.addEventListener('change', this.changePromptPageSize.bind(this));
        });

        // Add event listener for the pagination buttons
        document.addEventListener('keydown', this.boundHandleArrowKey);
      }
    },

    toogleOptionsVisibility(id){
      // ev.preventDefault();
      let options = document.getElementById(id);
      // console.log(options)
      options.className.split(' ').includes('hidden')? options.className = options.className.replace('hidden ',"flex ") : options.className = options.className.replace('flex ',"hidden ");
    },

    hideOptionsVisibility(id){
      setTimeout(function(){
        let options = document.getElementById(id);
        options.className = options.className.replace('flex ',"hidden ");
      },500);
      
    },

    dragPromptIDOrder(current, before){
      let promptIDs = window.localStorage.getItem('promptCardOrder')?.split(',');
      // console.log(promptIDs)
      if(promptIDs){
        let allEntries = this.OwnPrompts.map( p => p.ID);
        let newItems = allEntries.filter(function(obj) { return promptIDs.indexOf(obj) === -1; });
        promptIDs = [...newItems, ...promptIDs];
        let curIndex = promptIDs.indexOf(current);
        let befIndex = promptIDs.indexOf(before);
        promptIDs.splice(curIndex,1);
        promptIDs.splice(befIndex,0,current);
        window.localStorage.setItem('promptCardOrder',promptIDs);
      }else {
        let promptIDs = this.OwnPrompts.map( p => p.ID);
        window.localStorage.setItem('promptCardOrder',promptIDs);
        this.dragPromptIDOrder(current,before);
      }
      
    },

    dragSortPromptsList(){

        // document.getElementsByClassName('PromptCardContainer')[0]?.addEventListener('mouseleave', function(event) {
        //   if (dragItem !== null) {
        //     mouseUp(event);
        //   }
        // });
        

        // document.querySelectorAll('.PromptCard')?.forEach(item => {
        //   item.addEventListener('mousedown', mouseDown);
        // });

        // document?.addEventListener('mousemove', mouseMove);
        // document?.addEventListener('mouseup', mouseUp);



    },



    clickeFileInput(){
      const inputFileDiv = document.getElementById('dropzone-file589');
      inputFileDiv.click();

      inputFileDiv.onchange = (event) => {
        // event.stopPropagation();
        // event.preventDefault();

        const fileList = event.target.files;
        // console.log(fileList);

        var reader = new FileReader();
        reader.onload = function() {
          var text = reader.result;
          let json = JSON.parse(text);
          // console.log(json);
          IN_BOUND.saveImportedPrompt(json);
          
        };
        reader.readAsText(fileList[0]);
      };
    },

     async saveImportedPrompt(data){
      let prompt = data;
      if(prompt.Prompt === "" || prompt.Prompt === undefined){
        IN_BOUND.showNotification(
          NotificationSeverity.ERROR,
          'Invalid Prompt!'
        );
        return
      }

      prompt.AuthorName = this.Client.User.Name;
      prompt.AuthorURL = this.Client.User.Email;
      prompt.ID = window.crypto.randomUUID() || (new Date()).getTime() + Math.random().toString(16).slice(2);
      prompt.CreationTime = "";
      prompt.RevisionTime = "";
      prompt.PromptTypeNo = 1;
      prompt.pin = false;
      prompt.favourite = false;
      prompt.Title = "Copy via Import: " + prompt.Title;

      // console.log(prompt)

      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Sync..'
      );
      
      await this.Client.savePrompt(prompt);
      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Prompt imported!'
      );
      
      this.refreshData();

    },

    exportPromptTemplate(promptID){
      // console.log(promptID)
      let prompt_0 = this.DefaultPromptTemplates.filter(prompt => prompt.ID === promptID)[0] || this.OwnPrompts.filter(prompt => prompt.ID === promptID)[0];
      let prompt = {...prompt_0};
      delete prompt['AuthorName'];
      delete prompt['AuthorURL'];
      delete prompt['User'];
      prompt.forkID = prompt.ID;
      prompt.CreationTime = "";
      prompt.RevisionTime = "";
      prompt.ID = "";
      // console.log(prompt)
      this.exportContent(prompt,prompt.Title.slice(0,20));
    },

    exportContent(content, name){
      const blob = new Blob([JSON.stringify(content)], {
        type: 'text/plain',
      });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = name + '.json';
      document.body.appendChild(a);
      a.click();
    },

    showImport(){
      this.showNotification(
        NotificationSeverity.SUCCESS,
        this.import? 'Going back to prompts...' : 'Getting import prompt templates...'
      );

      this.import = !this.import;
      this.refreshData();
    },

    async saveAsNewPromptTemplate(e){
      // console.log(e)

      const prompt = {};
      const formData = new FormData(e.target);

      for (const [key, value] of formData) {
        prompt[key] = value;
      }

      // console.log(prompt)
      // let prompt = this.DefaultPromptTemplates.filter(prompt => prompt.ID === promptID)[0] || this.OwnPrompts.filter(prompt => prompt.ID === promptID)[0]
      prompt.AuthorName = this.Client.User.Name;
      prompt.AuthorURL = this.Client.User.Email;
      prompt.Title =  prompt.Title;
      prompt.forkID = prompt.ID;
      prompt.ID = window.crypto.randomUUID() || (new Date()).getTime() + Math.random().toString(16).slice(2);
      prompt.CreationTime = '';
      prompt.RevisionTime = '';
      prompt.PromptTypeNo = 1;
      prompt.pin = false;
      prompt.favourite = false;
      // console.log(prompt)
      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Sync..'
      );
      await this.Client.savePrompt(prompt);
      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Prompt saved as new template!'
      );
      this.hideSavePromptModal();
      this.refreshData();
    },

     async forkPrompt(id){
      let prompt = this.PromptTemplates.filter(template => template.ID === id)[0];
      prompt.AuthorName = this.Client.User.Name;
      prompt.AuthorURL = this.Client.User.Email;
      prompt.Title = "Copy of: " + prompt.Title;
      prompt.forkID = prompt.ID;
      prompt.ID = window.crypto.randomUUID() || (new Date()).getTime() + Math.random().toString(16).slice(2);
      prompt.CreationTime = (new Date()).toISOString();
      prompt.RevisionTime = (new Date()).toISOString();
      prompt.PromptTypeNo = 1;
      // console.log(prompt)
      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Sync..'
      );
      await this.Client.savePrompt(prompt);
      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Prompt saved to My Prompts!'
      );
      
      this.refreshData();
    },

    async removePin(id){
      
      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Sync..'
      );
      
      await this.pinActionForPrompt(id,-1);
      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Prompt removed from pin!'
      );
      this.refreshData();
    },

    async addToPin(id){
      if(this.PinPromptTemplates.length>3){
        this.showNotification(
          NotificationSeverity.ERROR,
          'You cannot pin more than 4 prompts!'
        );
        return
      }

      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Sync..'
      );
      await this.pinActionForPrompt(id,1);
      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Prompt added to pin!'
      );
      this.refreshData();
    },

    changeExtLanguage(e){
      this.ExtLang = e.target.value;
      extensionText = extensionLanguages[e.target.value];
      // console.log(this.ExtLang,extensionText);
      this.insertPromptTemplatesSection();
      this.insertLanguageToneWritingStyleContinueActions();
    },

    

    changeFeedSelect(val){
      this.feedSelected = val;
      this.insertPromptTemplatesSection();
    },

    changeFeedView(val){
      this.feedView = val;
      window.localStorage.setItem('feedView',val);
      this.insertPromptTemplatesSection();
    },

    /**
     * boundHandleArrowKey is the bound version of the handleArrowKey function
     *
     * @type {function(e: KeyboardEvent): void}
     */
    boundHandleArrowKey: null,

    // handleArrowKey handles the arrow key presses for the page navigation
    handleArrowKey(e) {
      const isArrowKey = e.key === 'ArrowLeft' || e.key === 'ArrowRight';

      const isInput =
        e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA';

      if (!isArrowKey || isInput) {
        // If the key pressed is not an arrow key or if it was pressed in an input or textarea element, do nothing
        return;
      }

      // If the key pressed is a left arrow key, call the previous page function
      if (e.key === 'ArrowLeft') {
        this.prevPromptTemplatesPage();

        return;
      }

      // Otherwise, call the next page function
      this.nextPromptTemplatesPage();
    },

    // changePromptPageSize updates the this.PromptTemplateSection.pageSize variable and re-renders the templates
    changePromptPageSize(e) {
      let pageSize = +e.target.value;

      // if the pageSize is not in the pageSizeOptions array, use the default pageSize option
      pageSize = pageSizeOptions.includes(pageSize) ? pageSize : pageSizeDefault;

      // persist the last selected page size in local storage
      localStorage.setItem(lastPageSizeKey, pageSize);

      this.PromptTemplateSection.currentPage = 0;
      this.PromptTemplateSection.pageSize = pageSize;

      this.insertPromptTemplatesSection();
    },

    // changePromptSearch updates the this.PromptSearch variable and re-renders the templates
    changePromptSearch(e) {
      this.PromptSearch = e.target.value;
      // console.log(this.PromptSearch)

      this.PromptTemplateSection.currentPage = 0;

      this.insertPromptTemplatesSection();

      const searchInput = document.querySelector('#promptSearchInput');

      searchInput.selectionStart = searchInput.selectionEnd =
        searchInput.value.length;
      searchInput.focus();
      
    },
    
    changePromptTemplatesType(e) {
      const type = e.target.value;
      if (this.PromptTemplatesType === type) {
        return;
      }

      this.PromptTemplatesType = type;

      this.PromptTemplateSection.currentPage = 0;

      this.insertPromptTemplatesSection();
    },

    // debounce is a function that returns a function that will only execute after a certain amount of time has passed
    debounce(callback, milliseconds) {
      let timeout;

      return (argument) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => callback(argument), milliseconds);
      };
    },

    showToneOptions(){
      if(document.getElementsByClassName('tonesList')[0]){
        let listContainer = document.getElementsByClassName('tonesList')[0];
        listContainer.style.display = 'flex';
        const position = document.getElementById('optionOpener').getBoundingClientRect();
        listContainer.style.left = position.right  + 'px';
      }else {
        var toolbarDiv = document.createElement("div");
        toolbarDiv.classList.add("chatgpt-all-in-one-toolbar2", "gap-3", "tonesList");

        toolbarDiv.style.overflow = 'hidden';

        let listContainer = document.createElement('div');
        listContainer.classList.add('tones-list-container');
        listContainer.id = "tones-list-container";
        listContainer.style.overflow = 'scroll';
        listContainer.style.maxHeight = '332px';
        listContainer.style.position = 'absolute';
        listContainer.style.backgroundColor = '#353740';
        listContainer.style.padding = "0.1em";
        listContainer.style.borderRadius = "5px";
        listContainer.style.width = 'fit-content';
        listContainer.style.position = "absolute";
        const position = document.getElementById('optionOpener').getBoundingClientRect();
        listContainer.style.left = ((position.x/2) - 40)  + 'px';
        // console.log(position)
        listContainer.style.bottom = '7vh';
        listContainer.onmouseleave = function(){
          // console.log('leave')
          IN_BOUND.hideToneOptions();
        };


        listContainer.style.borderColor = "#202123";
        listContainer.style.borderWidth = '1px';

        toolbarDiv.appendChild(listContainer);

        var textareaWrapper = document.querySelector("form textarea");
        textareaWrapper.parentNode.insertBefore(toolbarDiv, textareaWrapper);
      }
      this.insertToneOptionsInContainer();
    },

    insertToneOptionsInContainer(){
      let tonesContainer = document.querySelector('.tones-list-container');

      let tones = this.Tones;

      // console.log(tones)

      const htmlForContainer = `<ul >${tones.map((item,index) => `
    <li class="tonesLI" style="cursor:pointer; padding:1px; margin:1px;  flex-direction:row; display:flex; align-content:space-between; flex-wrap: wrap; justify-content: space-between; " >

    <p class="tonesLabel" onClick='IN_BOUND.setToneIndexAndRefresh("${item.ID}")' style="font-size:small; font-weight:light; padding:0px; margin:0px; line-height:normal; display:block;">${item.Label}</p>

    ${ item.type === "user" ? `<div style="display:flex; flex-direction:row;">
    <a style="margin-left:3px; display:block;" class="tonesEdit" onclick="IN_BOUND.editTone('${item.ID}')" > ${svg(`Edit`)} </a>
    <a style="margin-left:3px; display:block;" class="tonesCross" onclick="IN_BOUND.deleteTone('${item.ID}')" > ${svg(`Cross`)} </a>
    </div>` : ""}

    </li>`).join('')}</ul>  `;

      tonesContainer.innerHTML = htmlForContainer;
    },

    setToneIndexAndRefresh(ID){
      this.hideToneOptions();
      // this.Tone = ID;
      this.insertLanguageToneWritingStyleContinueActions();
    },


    hideToneOptions(){
      document.getElementsByClassName('tonesList')[0].style.display = 'none';
    },

    editTone(ID){
      // console.log('edit',ID)
      // this.hideToneOptions();
      this.showeditToneModal(ID);
    },

    async deleteTone(ID){
      // console.log('cross',ID)
      this.hideToneOptions();
      await this.Client.deleteTone(ID);
      this.refreshData();
      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Tone was deleted!'
      );
    },

    async showeditToneModal(ID) {

      const selectedTone = this.Tones.filter(d => d.ID === ID)[0];

      // console.log(selectedTone,ID)

      this.InputToneCategorySelected = selectedTone.CategoryID;

      let editToneModal = document.getElementById('editToneModal');

      // if modal does not exist, create it, add event listener on submit and append it to body
      if (!editToneModal) {
        editToneModal = document.createElement('div');
        editToneModal.id = 'editToneModal';

        editToneModal.addEventListener(
          'submit',
          this.saveEditedTone.bind(this));

        document.body.appendChild(editToneModal);
      }

      editToneModal.innerHTML = /*html*/ `
      <div style="z-index:100;" class="fixed inset-0 text-center transition-opacity z-50">
        <div class="absolute bg-gray-900 inset-0 opacity-90">
        </div>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex items-center justify-center min-h-full flex-col">

        <form id="saveToneForm">
          <input type="hidden" name="ID" value="${selectedTone.ID}" />
          
          <div
          class="align-center bg-white dark:bg-gray-800 dark:text-gray-200 inline-block overflow-hidden sm:rounded-lg shadow-xl sm:align-middle sm:max-w-lg sm:my-8 sm:w-full text-left transform transition-all"
          role="dialog" aria-modal="true" aria-labelledby="modal-headline" style="text-align: left;">
      
            <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-y-auto">
            <label>Title</label>
              <input name="Label" type="text" value="${selectedTone.Label}"}
                title="Tone Label" required placeholder="Tone Label" class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded mb-3 mt-2 p-2 w-full" />
        
              <label>Tone</label>
              <textarea name="Description" class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded p-2 mt-2 mb-3" style="height: 120px;" required
                        placeholder="Tone"
                        title="Tone">${selectedTone.Description}</textarea>
        
                  


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
    `;

      

      editToneModal.style = 'display: block;';

      // editToneModal
      //   .querySelector('#InputToneCategory')
      //   .addEventListener('change', this.changeInputToneCategory.bind(this));

      // add event listener to close the modal on ESC
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.hideModal('editToneModal');
        }
      });
    },

    async saveEditedTone(e){
      e.preventDefault();

      const tone = {};
      const formData = new FormData(e.target);

      for (const [key, value] of formData) {
        tone[key] = value;
      }

      // console.log(formData,tone)
      const selectedCategory = this.ToneCategories.filter( d => d.Label === tone['Category'])[0];
      // console.log(selectedCategory)
      tone['CategoryID'] = selectedCategory.ID;
      tone['Category'] = selectedCategory.Label;
      // console.log(tone)

      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Sync..'
      );

      // console.log('jdhsjdh')

      this.hideModal('editToneModal');

      const toneNew = {id: tone.ID, label:tone.Label, prompt:tone.Description, user:IN_BOUND.Client.User.Email, company:IN_BOUND.Company};
            
      await this.Client.saveEditTone(toneNew);

      this.refreshData();

      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Tone changes was saved!'
      );

    },

    async showNewToneModal() {

      let newToneModal = document.getElementById('newToneModal');

      this.InputToneCategorySelected = this.ToneCategories[0].ID;

      // if modal does not exist, create it, add event listener on submit and append it to body
      if (!newToneModal) {
        newToneModal = document.createElement('div');
        newToneModal.id = 'newToneModal';

        newToneModal.addEventListener(
          'submit',
          this.saveNewTone.bind(this));

        document.body.appendChild(newToneModal);
      }

      newToneModal.innerHTML = /*html*/ `
      <div style="z-index:100;" class="fixed inset-0 text-center transition-opacity z-50">
        <div class="absolute bg-gray-900 inset-0 opacity-90">
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
                          ${this.ToneCategories?.map(
                            (category) => `
                            <option value="${category.Label}" >
                              </option> 
                          `
                          ).join('')}
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
    `;

      

      newToneModal.style = 'display: block;';

      newToneModal
        .querySelector('#InputToneCategory')
        .addEventListener('change', this.changeInputToneCategory.bind(this));

      // add event listener to close the modal on ESC
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.hideModal('newToneModal');
        }
      });
    },

    async saveNewTone(e){
      e.preventDefault();

      this.hideModal('newToneModal');

      const tone = {};
      const formData = new FormData(e.target);

      for (const [key, value] of formData) {
        tone[key] = value;
      }

      const selectedCategory = this.ToneCategories.filter( d => d.Label === tone['Category'])[0];
      // console.log(selectedCategory)
      tone['CategoryID'] = selectedCategory.ID;
      tone['Category'] = selectedCategory.Label;
      // console.log(tone)

      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Sync..'
      );

      // console.log('jdhsjdh')

      await this.Client.saveNewTone(tone);

      this.refreshData();

      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Tone was added!'
      );

    },

    changeInputToneCategory(e){
      this.InputToneCategorySelected = e.target.value;
    },

    // Insert language select and continue button above the prompt textarea input
    insertLanguageToneWritingStyleContinueActions() {
      // this.tone === undefined ? this.tone = this.SelectedPromptTemplate?.Tone : ""
      // console.log(this.tone, this.SelectedPromptTemplate?.Tone)
      let wrapper = document.createElement('div');

      wrapper.id = 'language-select-wrapper';
      wrapper.className = css('languageSelectWrapper');

      // Get the list of languages
      const languages = this.Languages;

      // If there are no languages, skip
      if (!languages) return;

      // Get the prompt textarea input
      const textarea = document.querySelector('form textarea');

      // If there is no textarea, skip
      if (!textarea) return;

      // Hide the spacer for absolutely positioned prompt input
      const spacer = document.querySelector(
        '.w-full.h-32.md\\:h-48.flex-shrink-0'
      );

      if (spacer) {
        spacer.style = 'display: none';
      }

      // Remove the absolute positioning from the prompt input parent
      const formParent = textarea.form.parentElement;

      if (formParent) {
        formParent.classList.remove(
          'absolute',
          'md:!bg-transparent',
          'md:border-t-0',
          'md:dark:border-transparent',
          'md:border-transparent'
        );
      }

      // Get the parent of the textarea
      const parent = textarea.parentElement;

      // If there is no parent element, skip
      if (!parent) return;

      // Add padding to the parent element
      parent.classList.add('pr-4');

      // Get existing language select wrapper or create a new one
      if (parent.querySelector(`#${wrapper.id}`)) {
        wrapper = parent.querySelector(`#${wrapper.id}`);
      } else {
        parent.prepend(wrapper);
      }

      // Create the HTML for the language select section
      wrapper.innerHTML = /*html*/ `
    <div class="flex w-full">
      <div>
        <select id="languageSelect" class="${css('select')} pr-10">
          <option value ${
            !this.TargetLanguage ? ' selected' : ''
          }>Default language</option>  

          ${this.Languages.map(
            (language) => `
            <option value="${language.languageEnglish}" ${
              this.TargetLanguage === language.languageEnglish
                ? ' selected'
                : ''
            }>
              ${language.languageLabel}
              </option> 
          `
          ).join('')}
        </select>
      </div>
      

      <div class="ml-2">
      
        <select id="writingStyleSelect" class="${css('select')} pr-10">
          <option value ${
            !this.WritingStyle ? ' selected' : ''
          }>Default style</option>

          ${this.WritingStyles.map(
            (writingStyle) => `
            <option value="${writingStyle.ID}" ${
              this.WritingStyle === writingStyle.ID ? ' selected' : ''
            }>
              ${this.WritingStyle === writingStyle.ID? writingStyle.Label + ' style' : writingStyle.Label }
              </option> 
          `
          ).join('')}
        </select>
      </div>

      <div class="ml-2">
        <select id="toneSelect" class="${css('select')} pr-10">

        <option value="" selected > No Variation</option>

          ${this.userTones.map(
            (tone) => `
            <option value="${tone.ID}" ${
              this.Tone === tone.ID ? ' selected' : ''
            }>
              ${this.Tone === tone.ID? tone.Label + ' variation' : tone.Label }
              </option> 
          `
          ).join('')}
        </select>
      </div>

    </div>

    <div class="inline-flex invisible" role="group" id="continueActionsGroup">
      <button id="continueWritingButton" title="Continue writing please" class="${css(
        'continueButton'
      )}" onclick="event.stopPropagation(); IN_BOUND.continueWriting()" type="button">
        Continue
      </button>

      <select id="continueActionSelect" class="${css('continueActionSelect')}">
        <option value selected disabled>-- Select an action --</option>

        ${this.ContinueActions.map(
          (action) => `
          <option value="${action.ID}">${action.Label}</option>
        `
        ).join('')}
      </select>
    </div>
  `;

      // Add event listener to language select to update the target language on change
      wrapper
        .querySelector('#languageSelect')
        .addEventListener('change', this.changeTargetLanguage.bind(this));

      // Add event listener to tone select to update the tone on change
      wrapper
        ?.querySelector('#toneSelect')
        ?.addEventListener('change', this.changeTone.bind(this));

      // wrapper
      //   ?.querySelector('#toneCategorySelect')
      //   ?.addEventListener('change', this.changeToneCategory.bind(this));

      // Add event listener to writing style select to update the writing style on change
      wrapper
        .querySelector('#writingStyleSelect')
        .addEventListener('change', this.changeWritingStyle.bind(this));

      // Add event listener to continue action select to update the continue action on change
      wrapper
        .querySelector('#continueActionSelect')
        .addEventListener('change', this.changeContinueAction.bind(this));
    },

    // Change the TargetLanguage on selection change
    changeTargetLanguage(event) {
      this.TargetLanguage = event.target.value;

      // persist the last selected language in local storage
      localStorage.setItem(lastTargetLanguageKey, this.TargetLanguage);
    },

    // Change the Tone on selection change
    changeTone(event) {
      this.Tone = event.target.value;
      // console.log(event.target.value)
      this.insertLanguageToneWritingStyleContinueActions();
    },
    changeToneCategory(ev){
      const value = ev.target.value;
      // console.log(value)
      this.ToneCategorySelected = value;
      const allTones = this.companyTonesState? [...this.DefaultTones, ...this.userTones] : this.userTones;
      this.Tones = allTones.filter(d => d.CategoryID === this.ToneCategorySelected);
      
      this.Tones.sort((a, b) => a.Label.localeCompare(b.Label));
      // this.Tone = this.Tones[0].ID

      this.insertLanguageToneWritingStyleContinueActions();
    },

    // Change the WritingStyle on selection change
    changeWritingStyle(event) {
      this.WritingStyle = parseInt(event.target.value);
      this.insertLanguageToneWritingStyleContinueActions();
    },

    // Change the ContinueAction on selection change and submit the continue action prompt
    changeContinueAction(event) {
      const continueActionID = parseInt(event.target.value);

      // Get prompt for the selected continue action
      const continueAction = this.ContinueActions.find(
        (action) => action.ID === continueActionID
      );

      // If the continue action is not found, skip
      if (!continueAction) {
        return;
      }

      // Track usage of continue action
      // this.Client.usePrompt(`${continueAction.ID}`, UsageTypeNo.SEND);

      // Submit the continue action prompt
      this.submitContinueActionPrompt(continueAction.Prompt);
    },

    // Ask ChatGPT to continue writing
    continueWriting() {
      this.submitContinueActionPrompt('Continue writing please');
    },

    // Submit the continue action prompt to ChatGPT
    submitContinueActionPrompt(prompt = '') {
      const textarea = document.querySelector('form textarea');

      // If the textarea is not empty and it's not "Continue writing please" - ask for confirmation
      if (
        textarea.value.trim() &&
        textarea.value.trim() !== 'Continue writing please' &&
        !confirm(
          'Are you sure you want to continue? The current prompt text will be lost.'
        )
      ) {
        return;
      }

      // Add the continue action prompt to the textarea
      textarea.value = prompt;
      textarea.focus();

      // select button element which is in form and it's direct next sibling of textarea
      let button = textarea.nextElementSibling;

      // If the button is not found, skip
      if (
        !button ||
        !button.tagName ||
        button.tagName.toLowerCase() !== 'button'
      ) {
        return;
      }

      // Click the "Submit" button
      button.click();
    },

    hideContinueActionsButton() {
      const button = document.querySelector('#continueActionsGroup');

      if (!button) {
        return;
      }

      button.classList.add('invisible');
    },

    showContinueActionsButton() {
      const button = document.querySelector('#continueActionsGroup');

      if (!button) {
        return;
      }

      button.classList.remove('invisible');
    },

    // Decrement the current page of the prompt templates section and re-render
    prevPromptTemplatesPage() {
      this.PromptTemplateSection.currentPage--;
      this.PromptTemplateSection.currentPage = Math.max(
        0,
        this.PromptTemplateSection.currentPage
      );

      // Update the section
      this.insertPromptTemplatesSection();
    },

    // nextPromptTemplatesPage increments the current page and re-renders the templates
    nextPromptTemplatesPage() {
      let templates =
        this.PromptTemplatesType === PromptTemplatesType.OWN
          ? this.OwnPrompts
          : this.DefaultPromptTemplates;

      if (!templates || !Array.isArray(templates)) return;

      
      // Filter templates based on selected activity and search query
      templates = this.filterPromptTemplates(templates);

      // If there are no templates, skip
      if (templates.length === 0) return;

      this.PromptTemplateSection.currentPage++;

      this.PromptTemplateSection.currentPage = Math.min(
        Math.floor((templates.length - 1) / this.PromptTemplateSection.pageSize),
        this.PromptTemplateSection.currentPage
      );

      // console.log("templates: ",templates)
      // Update the section
      this.insertPromptTemplatesSection();
    },

    // Export the current chat log to a file
    exportCurrentChat() {
      const blocks = [
        ...document.querySelector('.flex.flex-col.items-center').children,
      ];

      let markdown = blocks.map((block) => {
        let wrapper = block.querySelector('.whitespace-pre-wrap');

        if (!wrapper) {
          return '';
        }

        // probably a user's, so..
        if (wrapper.children.length === 0) {
          return '**User:**\n' + wrapper.innerText;
        }

        // pass this point is assistant's

        wrapper = wrapper.firstChild;

        return (
          '**ChatGPT:**\n' +
          [...wrapper.children]
            .map((node) => {
              switch (node.nodeName) {
                case 'PRE':
                  return `\`\`\`${
                  node
                    .getElementsByTagName('code')[0]
                    .classList[2].split('-')[1]
                }\n${node.innerText.replace(/^Copy code/g, '').trim()}\n\`\`\``;
                default:
                  return `${node.innerHTML}`;
              }
            })
            .join('\n')
        );
      });

      markdown = markdown.filter((b) => b);

      if (!markdown) return false;

      let header = '';

      try {
        header =
          ExportHeaderPrefix +
          window.__NEXT_DATA__.props.pageProps.user.name +
          ' on ' +
          new Date().toLocaleString() +
          '\n```\n\n---';
      } catch {
        console.error(
          'Failed to get user name from window.__NEXT_DATA__.props.pageProps.user.name. Using default header instead.'
        );
      }

      const blob = new Blob([header + '\n\n\n' + markdown.join('\n\n---\n\n')], {
        type: 'text/plain',
      });

      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      //a.download = 'chatgpt-thread_' + (new Date().toLocaleString('en-US', { hour12: false }).replace(/[\s/:]/g, '-').replace(',', '')) + '.md'
      a.download = ExportFilePrefix + new Date().toISOString() + '.md';
      document.body.appendChild(a);
      a.click();
    },

    // Edit the prompt template
    async editPromptTemplate(idx) {
      const prompt =
        this.PromptTemplatesType === PromptTemplatesType.OWN
          ? this.OwnPrompts[idx]
          : this.PromptTemplates[idx];

          // console.log(prompt)

      // Only allow editing of own prompt templates
      if (
        this.PromptTemplatesType !== PromptTemplatesType.OWN &&
        !prompt.OwnPrompt &&
        !this.isAdminMode()
      ) {
        return;
      }

      await this.showSavePromptModal(new CustomEvent(editPromptTemplateEvent), prompt.ID,prompt);

      // Pre-fill the prompt template modal with the prompt template
      const form = document.getElementById('savePromptForm');

      // console.log(prompt)

      form.elements['Prompt'].value = prompt.Prompt;
      form.elements['Teaser'].value = prompt.Teaser;
      form.elements['PromptHint'].value = prompt.PromptHint;
      form.elements['Title'].value = prompt.Title;
      // form.elements['Community'].value = prompt.Community;
      form.elements['ID'].value = prompt.ID;
      prompt.Tone ? form.elements['Tone'].value = prompt.Tone : "";
      
      // form.elements['AuthorName'].value = prompt.AuthorName;
      // form.elements['AuthorURL'].value = prompt.AuthorURL;
      // form.elements['Views'].value = prompt.Views;
      // form.elements['Usages'].value = prompt.Usages;
      // form.elements['Votes'].value = prompt.Votes;
      form.elements['companyTonesState'].checked = prompt.companyTonesState;

      // Check the "Share as public" checkbox if the prompt template is public
      if (prompt.PromptTypeNo === PromptTypeNo.PUBLIC) {
        form.elements['Public'].checked = true;
      }

      // Trigger onchange event on Topics to update available Activities
      // form.elements['Community'].dispatchEvent(new Event('change'));

      // Set the selected Activity (category)
      // form.elements['Category'].value = prompt.Category;
      form.elements['Tags'].value = prompt.Tags;
    },

    // Delete a prompt template
    async deletePromptTemplate(idx) {
      const prompt =
        this.PromptTemplatesType === PromptTemplatesType.OWN
          ? this.OwnPrompts[idx]
          : this.PromptTemplates[idx];

      // Only allow deleting of own prompt templates
      if (
        this.PromptTemplatesType !== PromptTemplatesType.OWN &&
        !prompt.OwnPrompt &&
        !this.isAdminMode()
      ) {
        return;
      }

      // Ask for confirmation
      if (
        !confirm(
          `Are you sure you want to delete prompt template "${prompt.Title}"?`
        )
      ) {
        return;
      }

      try {
        this.showNotification(
          NotificationSeverity.SUCCESS,
          'Sync..'
        );
        await this.Client.deletePrompt(prompt.ID, this.Company);
        this.refreshData();

        // remove template using ID
        this.OwnPrompts = this.OwnPrompts.filter(
          (ownPrompt) => ownPrompt.ID !== prompt.ID
        );

        // remove template using ID from the public prompt templates if it's public
        if (prompt.PromptTypeNo === PromptTypeNo.PUBLIC) {
          this.PromptTemplates = this.PromptTemplates.filter(
            (promptTemplate) => promptTemplate.ID !== prompt.ID
          );
        }
      } catch (error) {
        this.showNotification(
          NotificationSeverity.ERROR,
          'Something went wrong. Please try again.'
        );
        return;
      }

      // update the section
      this.insertPromptTemplatesSection();
    },

    // Vote for a prompt template with a thumbs up
    async voteThumbsUp(promptID) {
      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Sync..'
      );
      try {
        await this.Client.voteForPrompt(promptID, 1);
        this.refreshData();
      } catch (error) {
        this.showNotification(
          NotificationSeverity.ERROR,
          'Something went wrong. Please try again.'
        );
        return;
      }

      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Prompt added to favorites!'
      );
    },

    // like for a prompt template with a thumbs up
    async likeForPrompt(promptID) {
      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Sync..'
      );
      try {
        await this.Client.likeForPrompt(promptID);
        this.refreshData();
      } catch (error) {
        this.showNotification(
          NotificationSeverity.ERROR,
          'Something went wrong. Please try again.'
        );
        return;
      }

      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Thanks for your like!'
      );
    },

    // Vote for a prompt template with a thumbs down
    async voteThumbsDown(promptID) {
      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Sync..'
      );
      try {
        await this.Client.voteForPrompt(promptID, -1);
        this.refreshData();
      } catch (error) {
        this.showNotification(
          NotificationSeverity.ERROR,
          'Something went wrong. Please try again.'
        );
        return;
      }

      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Prompt removed from favorites!'
      );
    },

    // Report the prompt template as inappropriate
    async reportPrompt(e) {
      // prevent the form from submitting
      e.preventDefault();

      const formData = new FormData(e.target);

      try {
        await this.Client.reportPrompt(
          formData.get('PromptID'),
          +formData.get('FeedbackTypeNo'),
          formData.get('FeedbackText'),
          formData.get('FeedbackContact')
        );
      } catch (error) {
        this.showNotification(
          NotificationSeverity.ERROR,
          'Something went wrong. Please try again.'
        );
        return;
      }

      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Thanks for your feedback! We will review this prompt.'
      );

      this.hideModal('reportPromptModal');
    },

    // Copy link to prompt template to clipboard
    copyPromptDeepLink(idx) {
      const prompt =
        this.PromptTemplatesType === PromptTemplatesType.OWN
          ? this.OwnPrompts[idx]
          : this.PromptTemplates[idx];

      if (!prompt) {
        return;
      }

      // const promptLink =
      //   prompt.PromptTypeNo === PromptTypeNo.PUBLIC
      //     ? `https://app.IN_BOUND.com/prompts/${prompt.ID}`
      //     : `https://chat.openai.com/chat?${queryParamPromptID}=${prompt.ID}`;

      const promptLink = `https://chat.openai.com/chat?${queryParamPromptID}=${prompt.ID}`;

      navigator.clipboard
        .writeText(promptLink)
        .then(
          // successfully copied
          () => {
            // Warning about prompt not shared as public
            if (prompt.PromptTypeNo !== PromptTypeNo.PUBLIC) {
              this.showNotification(
                NotificationSeverity.WARNING,
                'The link to the prompt template was copied to your clipboard.<br>This prompt is not shared as public. Only you can access it.'
              );

              return;
            }

            // Success - copied & public
            this.showNotification(
              NotificationSeverity.SUCCESS,
              'The link to the prompt template was copied to your clipboard.'
            );
          },
          // error - something went wrong (permissions?)
          () => {
            this.showNotification(
              NotificationSeverity.ERROR,
              'Something went wrong. Please try again.'
            );
          }
        );
    },

    // This function selects a prompt template using the index
    selectPromptTemplateByIndex(idx) {
      
      const templates =
        this.PromptTemplatesType === PromptTemplatesType.OWN
          ? this.OwnPrompts
          : this.PromptTemplates;

      // If there are no templates, skip
      if (!templates || !Array.isArray(templates)) return;

      this.selectPromptTemplate(templates[idx]);
      this.Tone = templates[idx]?.Tone;
      // console.log("current tone: ",templates[idx]?.Tone)

      // Hide the "Continue Writing" button (prompt selected/new chat)
      this.hideContinueActionsButton();
      setTimeout(function(){
        IN_BOUND.insertLanguageToneWritingStyleContinueActions();
      },300);
      
    },

    addToOwnPrompts(promptID){
      // console.log(this.OwnPrompts.map(t => t.ID ).includes(promptID))
      this.forkPrompt(promptID);
    },

    /**
     * Select a prompt template and show it in the prompt input field
     *
     * @param {Prompt} template
     */
    selectPromptTemplate(template) {
      const textarea = document.querySelector('textarea');
      const parent = textarea.parentElement;
      let wrapper = document.createElement('div');
      wrapper.id = 'prompt-wrapper';
      if (parent.querySelector('#prompt-wrapper')) {
        wrapper = parent.querySelector('#prompt-wrapper');
      } else {
        textarea.parentNode.insertBefore(wrapper, textarea);
      }

      const url = new URL(window.location.href);

      if (template) {

        
        // this.Tone = template.Tone
        this.companyTonesState = template.companyTonesState || false;
        // console.log(template, this.Tone)

        this.showVariablesModal(template);

        this.activePromptID = template.ID;
        // console.log(this.activePromptID)
        wrapper.innerHTML = /*html*/ `
        <span class="${css`tag`}" title="${sanitizeInput(template.Prompt)}">

        <span class="items-center">
          ${sanitizeInput(template.Title)}

          ${this.OwnPrompts.map(t => t.ID ).includes(template.ID)? '' : `<span class="inline-flex items-center ml-2" >
              <a title="${extensionText.plusOnTextarea}" class="px-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                onclick="IN_BOUND.addToOwnPrompts('${template.ID}')">${svg('add-go')}</a> </span>` }
                </span>

              <span style="font-weight:normal;" class="text-xs font-thin ">
              ${ extensionText.textareaPlaceholderIdentifier}  ${sanitizeInput(template.PromptHint)}
              </span>

        </span>
        `;


        // textarea.placeholder = template.PromptHint;
        textarea.placeholder = "Enter your prompt";
        this.SelectedPromptTemplate = template;
        if( template.Prompt.indexOf('[PROMPT]') > -1 ){
          textarea.innerHTML = '   ';
          textarea.nextElementSibling.disabled = false;
        }
        textarea.focus();

        // Update query param IN_BOUND_PromptID to the selected prompt ID
        if (url.searchParams.get(queryParamPromptID) === template.ID) {
          return;
        }

        url.searchParams.set(queryParamPromptID, template.ID);
      } else {
        wrapper.innerHTML = '';
        textarea.placeholder = '';
        this.SelectedPromptTemplate = null;

        // Remove query param IN_BOUND_PromptID
        if (!url.searchParams.get(queryParamPromptID)) {
          return;
        }

        url.searchParams.delete(queryParamPromptID);
      }

      // Push new URL to browser history
      window.history.pushState({}, '', url);
    },

    CSVToArray(strData, strDelimiter) {
      strDelimiter = strDelimiter || ',';
      var pattern = new RegExp(
        '(\\' +
          strDelimiter +
          '|\\r?\\n|\\r|^)' +
          '(?:"([^"]*(?:""[^"]*)*)"|' +
          '([^"\\' +
          strDelimiter +
          '\\r\\n]*))',
        'gi'
      );
      var data = [[]];
      var matches;
      while ((matches = pattern.exec(strData))) {
        var delimiter = matches[1];
        if (delimiter.length && delimiter !== strDelimiter) {
          data.push([]);
        }
        var value = matches[2]
          ? matches[2].replace(new RegExp('""', 'g'), '"')
          : matches[3];
        data[data.length - 1].push(value);
      }
      return data;
    },

    // get the topic label from the topic ID
    getTopicLabel(TopicID) {
      const topic = this.Topics.find((topic) => topic.ID === TopicID);

      if (!topic) {
        return '';
      }

      return topic.Label;
    },

    // get the activity label from the activity ID
    getActivityLabel(ActivityID) {
      const activity = this.Activities.find(
        (activity) => activity.ID === ActivityID
      );

      if (!activity) {
        return '';
      }

      return activity.Label;
    },

    // current user is admin
    isAdmin() {
      return this.Client.User.UserStatusNo === UserStatusNo.ADMIN;
    },

    // current user is admin and has enabled admin mode
    isAdminMode() {
      return this.isAdmin() && this.AdminMode;
    },

    // toggle admin mode and re-render prompt templates
    toggleAdminMode() {
      if (!this.isAdmin()) {
        return;
      }

      this.AdminMode = !this.AdminMode;

      this.insertPromptTemplatesSection();
    },

    // current user can create public or private prompt template
    canCreatePromptTemplate() {
      return (
        this.canCreatePublicPromptTemplate() ||
        this.canCreatePrivatePromptTemplate() || true
      );
    },

    // current user can create private prompt template
    canCreatePrivatePromptTemplate() {
      return this.isAdmin() || this.Client.User.MaxNewPrivatePromptsAllowed > 0;
    },

    // current user can create public prompt template
    canCreatePublicPromptTemplate() {
      return this.isAdmin() || this.Client.User.MaxNewPublicPromptsAllowed > 0;
    },

    // display notification with "cannot create public prompt template" error
    cannotCreatePublicPromptTemplateError() {
      this.showNotification(
        NotificationSeverity.WARNING,
        'Cannot Create Public Prompt Template',
        false
      );
    },

    // display notification with "cannot create private prompt template" error
    cannotCreatePrivatePromptTemplateError() {
      this.showNotification(
        NotificationSeverity.WARNING,
        "Cannot Create Private Prompt Template",
        false
      );
    },

    // display notification with "cannot create any prompt template" (public nor private) error
    cannotCreatePromptTemplateError() {
      this.showNotification(
        NotificationSeverity.WARNING,
        "Cannot Create Prompt Template",
        false
      );
    },
  };



    if(window.location.hostname === "chat.openai.com"){
      setTimeout(function(){
        fetch(`${APIEndpoint}/user?user=${window.__NEXT_DATA__.props.pageProps.user.email}`)
        .then(res => res.json())
        .then( usr => {
          console.log(usr);
          usr ? window.IN_BOUND.init() : "";
        });
      },500);
    }

})();
