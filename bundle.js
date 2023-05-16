!function(){"use strict";const c="[PROMPT]",d="[TARGETLANGUAGE]",l="https://api.workengine.ai/api",p={PUBLIC:"public",OWN:"own"},i={SUCCESS:"success",WARNING:"warning",ERROR:"error"},n={UNKNOWN:0,PRIVATE:1,PUBLIC:2,PAID:3},o={UNKNOWN:0,GENERIC_CONCERN:1,GENERIC_LEGAL_CONCERN:2,LEGAL_COPYRIGHT:10,LEGAL_DMCA:11,LEGAL_TRADEMARK:12,PERSONAL_INFO:20,ABUSIVE:21,ILLEGAL:22,NOT_MULTILINGUAL:51,NOT_GENERIC:52,SPAM:91,PROMPT_SUPPORT_FREE:101,PROMPT_SUPPORT_PAID:102,PROMPT_SUPPORT_WANT_PAID:103},B=0,U=16,V=32;const R={UNKNOWN:0,DELETE_MARK:20,DELETE_DONE:29,INACTIVE:99,ACTIVE:100},h={UNKNOWN:0,INFO:1,SUCCESS:2,UPDATE:4,MANDATORY_MUST_CONFIRM:8},_={UNKNOWN:B,MESSAGE_LIKE:U,MESSAGE_DISLIKE:V},F={UNKNOWN:0,NORMAL:1,ADMIN:2,BLACKLIST_BAN:4,BLACKLIST_NO_WRITE:8,BLACKLIST_NO_PUBLIC:16};var W=function(){return(W=Object.assign||function(e){for(var t,r=1,a=arguments.length;r<a;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};function m(e,n,s,l){return new(s=s||Promise)(function(r,t){function a(e){try{i(l.next(e))}catch(e){t(e)}}function o(e){try{i(l.throw(e))}catch(e){t(e)}}function i(e){var t;e.done?r(e.value):((t=e.value)instanceof s?t:new s(function(e){e(t)})).then(a,o)}i((l=l.apply(e,n||[])).next())})}function v(a,o){var i,n,s,l={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]},c={next:e(0),throw:e(1),return:e(2)};return"function"==typeof Symbol&&(c[Symbol.iterator]=function(){return this}),c;function e(r){return function(e){var t=[r,e];if(i)throw new TypeError("Generator is already executing.");for(;l=c&&t[c=0]?0:l;)try{if(i=1,n&&(s=2&t[0]?n.return:t[0]?n.throw||((s=n.return)&&s.call(n),0):n.next)&&!(s=s.call(n,t[1])).done)return s;switch(n=0,(t=s?[2&t[0],s.value]:t)[0]){case 0:case 1:s=t;break;case 4:return l.label++,{value:t[1],done:!1};case 5:l.label++,n=t[1],t=[0];continue;case 7:t=l.ops.pop(),l.trys.pop();continue;default:if(!((s=0<(s=l.trys).length&&s[s.length-1])||6!==t[0]&&2!==t[0])){l=0;continue}if(3===t[0]&&(!s||t[1]>s[0]&&t[1]<s[3]))l.label=t[1];else if(6===t[0]&&l.label<s[1])l.label=s[1],s=t;else{if(!(s&&l.label<s[2])){s[2]&&l.ops.pop(),l.trys.pop();continue}l.label=s[2],l.ops.push(t)}}t=o.call(a,l)}catch(e){t=[6,e],n=0}finally{i=s=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}}}function H(e,t,r){if(r||2===arguments.length)for(var a,o=0,i=t.length;o<i;o++)!a&&o in t||((a=a||Array.prototype.slice.call(t,0,o))[o]=t[o]);return e.concat(a||Array.prototype.slice.call(t))}function g(t,r){return new Promise(function(e){return setTimeout(e,t,r)})}function j(e,t){try{var r=e();(a=r)&&"function"==typeof a.then?r.then(function(e){return t(!0,e)},function(e){return t(!1,e)}):t(!0,r)}catch(e){t(!1,e)}var a}function Z(o,i,n){return void 0===n&&(n=16),m(this,void 0,void 0,function(){var t,r,a;return v(this,function(e){switch(e.label){case 0:t=Date.now(),r=0,e.label=1;case 1:return r<o.length?(i(o[r],r),(a=Date.now())>=t+n?(t=a,[4,g(0)]):[3,3]):[3,4];case 2:e.sent(),e.label=3;case 3:return++r,[3,1];case 4:return[2]}})})}function u(e){e.then(void 0,function(){})}function y(e,t){e=[e[0]>>>16,65535&e[0],e[1]>>>16,65535&e[1]],t=[t[0]>>>16,65535&t[0],t[1]>>>16,65535&t[1]];var r=[0,0,0,0];return r[3]+=e[3]+t[3],r[2]+=r[3]>>>16,r[3]&=65535,r[2]+=e[2]+t[2],r[1]+=r[2]>>>16,r[2]&=65535,r[1]+=e[1]+t[1],r[0]+=r[1]>>>16,r[1]&=65535,r[0]+=e[0]+t[0],r[0]&=65535,[r[0]<<16|r[1],r[2]<<16|r[3]]}function w(e,t){e=[e[0]>>>16,65535&e[0],e[1]>>>16,65535&e[1]],t=[t[0]>>>16,65535&t[0],t[1]>>>16,65535&t[1]];var r=[0,0,0,0];return r[3]+=e[3]*t[3],r[2]+=r[3]>>>16,r[3]&=65535,r[2]+=e[2]*t[3],r[1]+=r[2]>>>16,r[2]&=65535,r[2]+=e[3]*t[2],r[1]+=r[2]>>>16,r[2]&=65535,r[1]+=e[1]*t[3],r[0]+=r[1]>>>16,r[1]&=65535,r[1]+=e[2]*t[2],r[0]+=r[1]>>>16,r[1]&=65535,r[1]+=e[3]*t[1],r[0]+=r[1]>>>16,r[1]&=65535,r[0]+=e[0]*t[3]+e[1]*t[2]+e[2]*t[1]+e[3]*t[0],r[0]&=65535,[r[0]<<16|r[1],r[2]<<16|r[3]]}function f(e,t){return 32==(t%=64)?[e[1],e[0]]:t<32?[e[0]<<t|e[1]>>>32-t,e[1]<<t|e[0]>>>32-t]:[e[1]<<(t-=32)|e[0]>>>32-t,e[0]<<t|e[1]>>>32-t]}function b(e,t){return 0==(t%=64)?e:t<32?[e[0]<<t|e[1]>>>32-t,e[1]<<t]:[e[1]<<t-32,0]}function x(e,t){return[e[0]^t[0],e[1]^t[1]]}function G(e){return e=x(e,[0,e[0]>>>1]),e=x(e=w(e,[4283543511,3981806797]),[0,e[0]>>>1]),x(e=w(e,[3301882366,444984403]),[0,e[0]>>>1])}function a(e){return parseInt(e)}function t(e){return parseFloat(e)}function r(e,t){return"number"==typeof e&&isNaN(e)?t:e}function C(e){return e.reduce(function(e,t){return e+(t?1:0)},0)}function z(e,t){return void 0===t&&(t=1),1<=Math.abs(t)?Math.round(e/t)*t:(t=1/t,Math.round(e*t)/t)}function Y(e){return e&&"object"==typeof e&&"message"in e?e:{message:e}}function X(o,n,i){var s=Object.keys(o).filter(function(e){for(var t=i,r=e,a=0,o=t.length;a<o;++a)if(t[a]===r)return!1;return!0}),l=Array(s.length);return Z(s,function(e,t){var r,i,a;l[t]=(r=o[e],i=n,u(a=new Promise(function(a){var o=Date.now();j(r.bind(null,i),function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var r,i=Date.now()-o;return e[0]?"function"!=typeof(r=e[1])?a(function(){return{value:r,duration:i}}):void a(function(){return new Promise(function(a){var o=Date.now();j(r,function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var r=i+Date.now()-o;if(!e[0])return a({error:Y(e[1]),duration:r});a({value:e[1],duration:r})})})}):a(function(){return{error:Y(e[1]),duration:i}})})})),function(){return a.then(function(e){return e()})})}),function(){return m(this,void 0,void 0,function(){var o,t,r,a,i,n;return v(this,function(e){switch(e.label){case 0:for(o={},t=0,r=s;t<r.length;t++)a=r[t],o[a]=void 0;i=Array(s.length),n=function(){var a;return v(this,function(e){switch(e.label){case 0:return a=!0,[4,Z(s,function(t,e){var r;i[e]||(l[e]?(u(r=l[e]().then(function(e){return o[t]=e})),i[e]=r):a=!1)})];case 1:return e.sent(),a?[2,"break"]:[4,g(1)];case 2:return e.sent(),[2]}})},e.label=1;case 1:return[5,n()];case 2:if("break"===e.sent())return[3,4];e.label=3;case 3:return[3,1];case 4:return[4,Promise.all(i)];case 5:return e.sent(),[2,o]}})})}}function q(){var e=window,t=navigator;return 4<=C(["MSCSSMatrix"in e,"msSetImmediate"in e,"msIndexedDB"in e,"msMaxTouchPoints"in t,"msPointerEnabled"in t])}function k(){var e=window,t=navigator;return 5<=C(["webkitPersistentStorage"in t,"webkitTemporaryStorage"in t,0===t.vendor.indexOf("Google"),"webkitResolveLocalFileSystemURL"in e,"BatteryManager"in e,"webkitMediaStream"in e,"webkitSpeechGrammar"in e])}function T(){var e=window,t=navigator;return 4<=C(["ApplePayError"in e,"CSSPrimitiveValue"in e,"Counter"in e,0===t.vendor.indexOf("Apple"),"getStorageUpdates"in t,"WebKitMediaKeys"in e])}function L(){var e=window;return 3<=C(["safari"in e,!("DeviceMotionEvent"in e),!("ongestureend"in e),!("standalone"in navigator)])}function J(){var e,t=k(),r=(e=window,4<=C(["buildID"in navigator,"MozAppearance"in(null!=(r=null==(r=document.documentElement)?void 0:r.style)?r:{}),"onmozfullscreenchange"in e,"mozInnerScreenX"in e,"CSSMozDocumentRule"in e,"CanvasCaptureMediaStream"in e]));if(t||r)return 2<=C(["onorientationchange"in(e=window),"orientation"in e,t&&!("SharedWorker"in e),r&&/android/i.test(navigator.appVersion)])}function K(e){var t=new Error(e);return t.name=e,t}function Q(t,l,r){var a;return void 0===r&&(r=50),m(this,void 0,void 0,function(){var n,s;return v(this,function(e){switch(e.label){case 0:n=document,e.label=1;case 1:return n.body?[3,3]:[4,g(r)];case 2:return e.sent(),[3,1];case 3:s=n.createElement("iframe"),e.label=4;case 4:return e.trys.push([4,,10,11]),[4,new Promise(function(e,t){var r=!1,a=function(){r=!0,e()},o=(s.onload=a,s.onerror=function(e){r=!0,t(e)},s.style),i=(o.setProperty("display","block","important"),o.position="absolute",o.top="0",o.left="0",o.visibility="hidden",l&&"srcdoc"in s?s.srcdoc=l:s.src="about:blank",n.body.appendChild(s),function(){var e;r||("complete"===(null==(e=null==(e=s.contentWindow)?void 0:e.document)?void 0:e.readyState)?a():setTimeout(i,10))});i()})];case 5:e.sent(),e.label=6;case 6:return null!=(a=null==(a=s.contentWindow)?void 0:a.document)&&a.body?[3,8]:[4,g(r)];case 7:return e.sent(),[3,6];case 8:return[4,t(s,s.contentWindow)];case 9:return[2,e.sent()];case 10:return null!=(a=s.parentNode)&&a.removeChild(s),[7];case 11:return[2]}})})}var s,ee,S=["monospace","sans-serif","serif"],te=["sans-serif-thin","ARNO PRO","Agency FB","Arabic Typesetting","Arial Unicode MS","AvantGarde Bk BT","BankGothic Md BT","Batang","Bitstream Vera Sans Mono","Calibri","Century","Century Gothic","Clarendon","EUROSTILE","Franklin Gothic","Futura Bk BT","Futura Md BT","GOTHAM","Gill Sans","HELV","Haettenschweiler","Helvetica Neue","Humanst521 BT","Leelawadee","Letter Gothic","Levenim MT","Lucida Bright","Lucida Sans","Menlo","MS Mincho","MS Outlook","MS Reference Specialty","MS UI Gothic","MT Extra","MYRIAD PRO","Marlett","Meiryo UI","Microsoft Uighur","Minion Pro","Monotype Corsiva","PMingLiU","Pristina","SCRIPTINA","Segoe UI Light","Serifa","SimHei","Small Fonts","Staccato222 BT","TRAJAN PRO","Univers CE 55 Medium","Vrinda","ZWAdobeF"];function P(e){return e.toDataURL()}function re(){var t,e=this;return void 0===ee&&(t=function(){var e=ae();ee=oe(e)?setTimeout(t,2500):void(s=e)})(),function(){return m(e,void 0,void 0,function(){var r;return v(this,function(e){switch(e.label){case 0:return oe(r=ae())?s?[2,H([],s,!0)]:(t=document).fullscreenElement||t.msFullscreenElement||t.mozFullScreenElement||t.webkitFullscreenElement?[4,((t=document).exitFullscreen||t.msExitFullscreen||t.mozCancelFullScreen||t.webkitExitFullscreen).call(t)]:[3,2]:[3,2];case 1:e.sent(),r=ae(),e.label=2;case 2:return oe(r)||(s=r),[2,r]}var t})})}}function ae(){var e=screen;return[r(t(e.availTop),null),r(t(e.width)-t(e.availWidth)-r(t(e.availLeft),0),null),r(t(e.height)-t(e.availHeight)-r(t(e.availTop),0),null),r(t(e.availLeft),null)]}function oe(e){for(var t=0;t<4;++t)if(e[t])return;return 1}function ie(l){var c;return m(this,void 0,void 0,function(){var t,r,a,o,i,n,s;return v(this,function(e){switch(e.label){case 0:for(t=document,r=t.createElement("div"),a=new Array(l.length),o={},ne(r),s=0;s<l.length;++s)i=function(e){for(var t=(e=function(e){for(var t,r="Unexpected syntax '".concat(e,"'"),a=/^\s*([a-z-]*)(.*)$/i.exec(e),e=a[1]||void 0,o={},i=/([.:#][\w-]+|\[.+?\])/gi,n=function(e,t){o[e]=o[e]||[],o[e].push(t)};;){var s=i.exec(a[2]);if(!s)break;var l=s[0];switch(l[0]){case".":n("class",l.slice(1));break;case"#":n("id",l.slice(1));break;case"[":var c=/^\[([\w-]+)([~|^$*]?=("(.*?)"|([\w-]+)))?(\s+[is])?\]$/.exec(l);if(!c)throw new Error(r);n(c[1],null!=(t=null!=(t=c[4])?t:c[5])?t:"");break;default:throw new Error(r)}}return[e,o]}(e))[0],r=e[1],a=document.createElement(null!=t?t:"div"),o=0,i=Object.keys(r);o<i.length;o++){var n=i[o],s=r[n].join(" ");if("style"===n){l=void 0;c=void 0;d=void 0;p=void 0;g=void 0;h=void 0;m=void 0;var l=a.style;var c=s;for(var d=0,p=c.split(";");d<p.length;d++){var h,m,g=p[d],g=/^\s*([\w-]+)\s*:\s*(.+?)(\s*!([\w-]+))?\s*$/.exec(g);g&&(h=g[1],m=g[2],g=g[4],l.setProperty(h,m,g||""))}}else a.setAttribute(n,s)}return a}(l[s]),ne(n=t.createElement("div")),n.appendChild(i),r.appendChild(n),a[s]=i;e.label=1;case 1:return t.body?[3,3]:[4,g(50)];case 2:return e.sent(),[3,1];case 3:t.body.appendChild(r);try{for(s=0;s<l.length;++s)a[s].offsetParent||(o[l[s]]=!0)}finally{null!=(c=r.parentNode)&&c.removeChild(r)}return[2,o]}})})}function ne(e){e.style.setProperty("display","block","important")}function se(e){return matchMedia("(inverted-colors: ".concat(e,")")).matches}function le(e){return matchMedia("(forced-colors: ".concat(e,")")).matches}function e(e){return matchMedia("(prefers-contrast: ".concat(e,")")).matches}function ce(e){return matchMedia("(prefers-reduced-motion: ".concat(e,")")).matches}function de(e){return matchMedia("(dynamic-range: ".concat(e,")")).matches}function I(){return 0}var N=Math,pe={default:[],apple:[{font:"-apple-system-body"}],serif:[{fontFamily:"serif"}],sans:[{fontFamily:"sans-serif"}],mono:[{fontFamily:"monospace"}],min:[{fontSize:"1px"}],system:[{fontFamily:"system-ui"}]},he={fonts:function(){return Q(function(e,t){function a(e){var t=o.createElement("span"),r=t.style;return r.position="absolute",r.top="0",r.left="0",r.fontFamily=e,t.textContent="mmMwWLliI0O&1",i.appendChild(t),t}var o=t.document,t=o.body,i=(t.style.fontSize="48px",o.createElement("div")),n={},s={},r=S.map(a),l=function(){for(var e={},t=0,r=te;t<r.length;t++)!function(t){e[t]=S.map(function(e){return e=e,a("'".concat(t,"',").concat(e))})}(r[t]);return e}();t.appendChild(i);for(var c=0;c<S.length;c++)n[S[c]]=r[c].offsetWidth,s[S[c]]=r[c].offsetHeight;return te.filter(function(e){return r=l[e],S.some(function(e,t){return r[t].offsetWidth!==n[e]||r[t].offsetHeight!==s[e]});var r})})},domBlockers:function(e){var u=(void 0===e?{}:e).debug;return m(this,void 0,void 0,function(){var p,h,m,g;return v(this,function(e){switch(e.label){case 0:return T()||J()?(d=atob,p={abpIndo:["#Iklan-Melayang","#Kolom-Iklan-728","#SidebarIklan-wrapper",d("YVt0aXRsZT0iN25hZ2EgcG9rZXIiIGld"),'[title="ALIENBOLA" i]'],abpvn:["#quangcaomb",d("Lmlvc0Fkc2lvc0Fkcy1sYXlvdXQ="),".quangcao",d("W2hyZWZePSJodHRwczovL3I4OC52bi8iXQ=="),d("W2hyZWZePSJodHRwczovL3piZXQudm4vIl0=")],adBlockFinland:[".mainostila",d("LnNwb25zb3JpdA=="),".ylamainos",d("YVtocmVmKj0iL2NsaWNrdGhyZ2guYXNwPyJd"),d("YVtocmVmXj0iaHR0cHM6Ly9hcHAucmVhZHBlYWsuY29tL2FkcyJd")],adBlockPersian:["#navbar_notice_50",".kadr",'TABLE[width="140px"]',"#divAgahi",d("I2FkMl9pbmxpbmU=")],adBlockWarningRemoval:["#adblock-honeypot",".adblocker-root",".wp_adblock_detect",d("LmhlYWRlci1ibG9ja2VkLWFk"),d("I2FkX2Jsb2NrZXI=")],adGuardAnnoyances:['amp-embed[type="zen"]',".hs-sosyal","#cookieconsentdiv",'div[class^="app_gdpr"]',".as-oil"],adGuardBase:[".BetterJsPopOverlay",d("I2FkXzMwMFgyNTA="),d("I2Jhbm5lcmZsb2F0MjI="),d("I2FkLWJhbm5lcg=="),d("I2NhbXBhaWduLWJhbm5lcg==")],adGuardChinese:[d("LlppX2FkX2FfSA=="),d("YVtocmVmKj0iL29kMDA1LmNvbSJd"),d("YVtocmVmKj0iLmh0aGJldDM0LmNvbSJd"),".qq_nr_lad","#widget-quan"],adGuardFrench:[d("I2Jsb2NrLXZpZXdzLWFkcy1zaWRlYmFyLWJsb2NrLWJsb2Nr"),"#pavePub",d("LmFkLWRlc2t0b3AtcmVjdGFuZ2xl"),".mobile_adhesion",".widgetadv"],adGuardGerman:[d("LmJhbm5lcml0ZW13ZXJidW5nX2hlYWRfMQ=="),d("LmJveHN0YXJ0d2VyYnVuZw=="),d("LndlcmJ1bmcz"),d("YVtocmVmXj0iaHR0cDovL3d3dy5laXMuZGUvaW5kZXgucGh0bWw/cmVmaWQ9Il0="),d("YVtocmVmXj0iaHR0cHM6Ly93d3cudGlwaWNvLmNvbS8/YWZmaWxpYXRlSWQ9Il0=")],adGuardJapanese:["#kauli_yad_1",d("YVtocmVmXj0iaHR0cDovL2FkMi50cmFmZmljZ2F0ZS5uZXQvIl0="),d("Ll9wb3BJbl9pbmZpbml0ZV9hZA=="),d("LmFkZ29vZ2xl"),d("LmFkX3JlZ3VsYXIz")],adGuardMobile:[d("YW1wLWF1dG8tYWRz"),d("LmFtcF9hZA=="),'amp-embed[type="24smi"]',"#mgid_iframe1",d("I2FkX2ludmlld19hcmVh")],adGuardRussian:[d("YVtocmVmXj0iaHR0cHM6Ly9hZC5sZXRtZWFkcy5jb20vIl0="),d("LnJlY2xhbWE="),'div[id^="smi2adblock"]',d("ZGl2W2lkXj0iQWRGb3hfYmFubmVyXyJd"),d("I2FkX3NxdWFyZQ==")],adGuardSocial:[d("YVtocmVmXj0iLy93d3cuc3R1bWJsZXVwb24uY29tL3N1Ym1pdD91cmw9Il0="),d("YVtocmVmXj0iLy90ZWxlZ3JhbS5tZS9zaGFyZS91cmw/Il0="),".etsy-tweet","#inlineShare",".popup-social"],adGuardSpanishPortuguese:["#barraPublicidade","#Publicidade","#publiEspecial","#queTooltip",d("W2hyZWZePSJodHRwOi8vYWRzLmdsaXNwYS5jb20vIl0=")],adGuardTrackingProtection:["#qoo-counter",d("YVtocmVmXj0iaHR0cDovL2NsaWNrLmhvdGxvZy5ydS8iXQ=="),d("YVtocmVmXj0iaHR0cDovL2hpdGNvdW50ZXIucnUvdG9wL3N0YXQucGhwIl0="),d("YVtocmVmXj0iaHR0cDovL3RvcC5tYWlsLnJ1L2p1bXAiXQ=="),"#top100counter"],adGuardTurkish:["#backkapat",d("I3Jla2xhbWk="),d("YVtocmVmXj0iaHR0cDovL2Fkc2Vydi5vbnRlay5jb20udHIvIl0="),d("YVtocmVmXj0iaHR0cDovL2l6bGVuemkuY29tL2NhbXBhaWduLyJd"),d("YVtocmVmXj0iaHR0cDovL3d3dy5pbnN0YWxsYWRzLm5ldC8iXQ==")],bulgarian:[d("dGQjZnJlZW5ldF90YWJsZV9hZHM="),"#ea_intext_div",".lapni-pop-over","#xenium_hot_offers",d("I25ld0Fk")],easyList:[d("I0FEX0NPTlRST0xfMjg="),d("LnNlY29uZC1wb3N0LWFkcy13cmFwcGVy"),".universalboxADVBOX03",d("LmFkdmVydGlzZW1lbnQtNzI4eDkw"),d("LnNxdWFyZV9hZHM=")],easyListChina:[d("YVtocmVmKj0iLndlbnNpeHVldGFuZy5jb20vIl0="),d("LmFwcGd1aWRlLXdyYXBbb25jbGljayo9ImJjZWJvcy5jb20iXQ=="),d("LmZyb250cGFnZUFkdk0="),"#taotaole","#aafoot.top_box"],easyListCookie:["#AdaCompliance.app-notice",".text-center.rgpd",".panel--cookie",".js-cookies-andromeda",".elxtr-consent"],easyListCzechSlovak:["#onlajny-stickers",d("I3Jla2xhbW5pLWJveA=="),d("LnJla2xhbWEtbWVnYWJvYXJk"),".sklik",d("W2lkXj0ic2tsaWtSZWtsYW1hIl0=")],easyListDutch:[d("I2FkdmVydGVudGll"),d("I3ZpcEFkbWFya3RCYW5uZXJCbG9jaw=="),".adstekst",d("YVtocmVmXj0iaHR0cHM6Ly94bHR1YmUubmwvY2xpY2svIl0="),"#semilo-lrectangle"],easyListGermany:[d("I0FkX1dpbjJkYXk="),d("I3dlcmJ1bmdzYm94MzAw"),d("YVtocmVmXj0iaHR0cDovL3d3dy5yb3RsaWNodGthcnRlaS5jb20vP3NjPSJd"),d("I3dlcmJ1bmdfd2lkZXNreXNjcmFwZXJfc2NyZWVu"),d("YVtocmVmXj0iaHR0cDovL2xhbmRpbmcucGFya3BsYXR6a2FydGVpLmNvbS8/YWc9Il0=")],easyListItaly:[d("LmJveF9hZHZfYW5udW5jaQ=="),".sb-box-pubbliredazionale",d("YVtocmVmXj0iaHR0cDovL2FmZmlsaWF6aW9uaWFkcy5zbmFpLml0LyJd"),d("YVtocmVmXj0iaHR0cHM6Ly9hZHNlcnZlci5odG1sLml0LyJd"),d("YVtocmVmXj0iaHR0cHM6Ly9hZmZpbGlhemlvbmlhZHMuc25haS5pdC8iXQ==")],easyListLithuania:[d("LnJla2xhbW9zX3RhcnBhcw=="),d("LnJla2xhbW9zX251b3JvZG9z"),d("aW1nW2FsdD0iUmVrbGFtaW5pcyBza3lkZWxpcyJd"),d("aW1nW2FsdD0iRGVkaWt1b3RpLmx0IHNlcnZlcmlhaSJd"),d("aW1nW2FsdD0iSG9zdGluZ2FzIFNlcnZlcmlhaS5sdCJd")],estonian:[d("QVtocmVmKj0iaHR0cDovL3BheTRyZXN1bHRzMjQuZXUiXQ==")],fanboyAnnoyances:["#feedback-tab","#taboola-below-article",".feedburnerFeedBlock",".widget-feedburner-counter",'[title="Subscribe to our blog"]'],fanboyAntiFacebook:[".util-bar-module-firefly-visible"],fanboyEnhancedTrackers:[".open.pushModal","#issuem-leaky-paywall-articles-zero-remaining-nag","#sovrn_container",'div[class$="-hide"][zoompage-fontsize][style="display: block;"]',".BlockNag__Card"],fanboySocial:[".td-tags-and-social-wrapper-box",".twitterContainer",".youtube-social",'a[title^="Like us on Facebook"]','img[alt^="Share on Digg"]'],frellwitSwedish:[d("YVtocmVmKj0iY2FzaW5vcHJvLnNlIl1bdGFyZ2V0PSJfYmxhbmsiXQ=="),d("YVtocmVmKj0iZG9rdG9yLXNlLm9uZWxpbmsubWUiXQ=="),"article.category-samarbete",d("ZGl2LmhvbGlkQWRz"),"ul.adsmodern"],greekAdBlock:[d("QVtocmVmKj0iYWRtYW4ub3RlbmV0LmdyL2NsaWNrPyJd"),d("QVtocmVmKj0iaHR0cDovL2F4aWFiYW5uZXJzLmV4b2R1cy5nci8iXQ=="),d("QVtocmVmKj0iaHR0cDovL2ludGVyYWN0aXZlLmZvcnRobmV0LmdyL2NsaWNrPyJd"),"DIV.agores300","TABLE.advright"],hungarian:["#cemp_doboz",".optimonk-iframe-container",d("LmFkX19tYWlu"),d("W2NsYXNzKj0iR29vZ2xlQWRzIl0="),"#hirdetesek_box"],iDontCareAboutCookies:['.alert-info[data-block-track*="CookieNotice"]',".ModuleTemplateCookieIndicator",".o--cookies--container",".cookie-msg-info-container","#cookies-policy-sticky"],icelandicAbp:[d("QVtocmVmXj0iL2ZyYW1ld29yay9yZXNvdXJjZXMvZm9ybXMvYWRzLmFzcHgiXQ==")],latvian:[d("YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiAxMjBweDsgaGVpZ2h0OiA0MHB4OyBvdmVyZmxvdzogaGlkZGVuOyBwb3NpdGlvbjogcmVsYXRpdmU7Il0="),d("YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiA4OHB4OyBoZWlnaHQ6IDMxcHg7IG92ZXJmbG93OiBoaWRkZW47IHBvc2l0aW9uOiByZWxhdGl2ZTsiXQ==")],listKr:[d("YVtocmVmKj0iLy9hZC5wbGFuYnBsdXMuY28ua3IvIl0="),d("I2xpdmVyZUFkV3JhcHBlcg=="),d("YVtocmVmKj0iLy9hZHYuaW1hZHJlcC5jby5rci8iXQ=="),d("aW5zLmZhc3R2aWV3LWFk"),".revenue_unit_item.dable"],listeAr:[d("LmdlbWluaUxCMUFk"),".right-and-left-sponsers",d("YVtocmVmKj0iLmFmbGFtLmluZm8iXQ=="),d("YVtocmVmKj0iYm9vcmFxLm9yZyJd"),d("YVtocmVmKj0iZHViaXp6bGUuY29tL2FyLz91dG1fc291cmNlPSJd")],listeFr:[d("YVtocmVmXj0iaHR0cDovL3Byb21vLnZhZG9yLmNvbS8iXQ=="),d("I2FkY29udGFpbmVyX3JlY2hlcmNoZQ=="),d("YVtocmVmKj0id2Vib3JhbWEuZnIvZmNnaS1iaW4vIl0="),".site-pub-interstitiel",'div[id^="crt-"][data-criteo-id]'],officialPolish:["#ceneo-placeholder-ceneo-12",d("W2hyZWZePSJodHRwczovL2FmZi5zZW5kaHViLnBsLyJd"),d("YVtocmVmXj0iaHR0cDovL2Fkdm1hbmFnZXIudGVjaGZ1bi5wbC9yZWRpcmVjdC8iXQ=="),d("YVtocmVmXj0iaHR0cDovL3d3dy50cml6ZXIucGwvP3V0bV9zb3VyY2UiXQ=="),d("ZGl2I3NrYXBpZWNfYWQ=")],ro:[d("YVtocmVmXj0iLy9hZmZ0cmsuYWx0ZXgucm8vQ291bnRlci9DbGljayJd"),'a[href^="/magazin/"]',d("YVtocmVmXj0iaHR0cHM6Ly9ibGFja2ZyaWRheXNhbGVzLnJvL3Ryay9zaG9wLyJd"),d("YVtocmVmXj0iaHR0cHM6Ly9ldmVudC4ycGVyZm9ybWFudC5jb20vZXZlbnRzL2NsaWNrIl0="),d("YVtocmVmXj0iaHR0cHM6Ly9sLnByb2ZpdHNoYXJlLnJvLyJd")],ruAd:[d("YVtocmVmKj0iLy9mZWJyYXJlLnJ1LyJd"),d("YVtocmVmKj0iLy91dGltZy5ydS8iXQ=="),d("YVtocmVmKj0iOi8vY2hpa2lkaWtpLnJ1Il0="),"#pgeldiz",".yandex-rtb-block"],thaiAds:["a[href*=macau-uta-popup]",d("I2Fkcy1nb29nbGUtbWlkZGxlX3JlY3RhbmdsZS1ncm91cA=="),d("LmFkczMwMHM="),".bumq",".img-kosana"],webAnnoyancesUltralist:["#mod-social-share-2","#social-tools",d("LmN0cGwtZnVsbGJhbm5lcg=="),".zergnet-recommend",".yt.btn-link.btn-md.btn"]},h=Object.keys(p),[4,ie((g=[]).concat.apply(g,h.map(function(e){return p[e]})))]):[2,void 0];case 1:if(m=e.sent(),u){var t=p;var r=m;for(var a="DOM blockers debug:\n```",o=0,i=Object.keys(t);o<i.length;o++){var n=i[o];a+="\n".concat(n,":");for(var s=0,l=t[n];s<l.length;s++){var c=l[s];a+="\n  ".concat(r[c]?"🚫":"➡️"," ").concat(c)}}console.log("".concat(a,"\n```"))}return(g=h.filter(function(e){e=p[e];return C(e.map(function(e){return m[e]}))>.6*e.length})).sort(),[2,g]}var d})})},fontPreferences:function(){return void 0===C&&(C=4e3),Q(function(e,t){for(var r=t.document,a=r.body,o=a.style,o=(o.width="".concat(C,"px"),o.webkitTextSizeAdjust=o.textSizeAdjust="none",k()?a.style.zoom="".concat(1/t.devicePixelRatio):T()&&(a.style.zoom="reset"),r.createElement("div")),i=(o.textContent=H([],Array(C/20<<0),!0).map(function(){return"word"}).join(" "),a.appendChild(o),r),n=a,s={},l={},c=0,d=Object.keys(pe);c<d.length;c++){var p=d[c],h,m=(h=pe[p])[0],g=void 0===m?{}:m,m,h=void 0===(m=h[1])?"mmMwWLliI0fiflO&1":m,u=i.createElement("span");u.textContent=h,u.style.whiteSpace="nowrap";for(var v=0,y=Object.keys(g);v<y.length;v++){var w=y[v],f=g[w];void 0!==f&&(u.style[w]=f)}s[p]=u,n.appendChild(i.createElement("br")),n.appendChild(u)}for(var b=0,x=Object.keys(pe);b<x.length;b++)l[p=x[b]]=s[p].getBoundingClientRect().width;return l},'<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1">');var C},audio:function(){var e,t,r,a,s,l,o=window,o=o.OfflineAudioContext||o.webkitOfflineAudioContext;return o?!T()||L()||3<=C(["DOMRectList"in(e=window),"RTCPeerConnectionIceEvent"in e,"SVGGeometryElement"in e,"ontransitioncancel"in e])?((o=(e=new o(1,5e3,44100)).createOscillator()).type="triangle",o.frequency.value=1e4,(t=e.createDynamicsCompressor()).threshold.value=-50,t.knee.value=40,t.ratio.value=12,t.attack.value=0,t.release.value=.25,o.connect(t),t.connect(e.destination),o.start(0),s=e,l=function(){},t=[new Promise(function(t,r){function e(){setTimeout(function(){return r(K("timeout"))},Math.min(500,n+5e3-Date.now()))}function a(){try{switch(s.startRendering(),s.state){case"running":n=Date.now(),o&&e();break;case"suspended":document.hidden||i++,o&&3<=i?r(K("suspended")):setTimeout(a,500)}}catch(e){r(e)}}var o=!1,i=0,n=0;s.oncomplete=function(e){return t(e.renderedBuffer)};a(),l=function(){o||(o=!0,0<n&&e())}}),l],r=t[1],u(a=t[0].then(function(e){for(var t=e.getChannelData(0).subarray(4500),r=0,a=0;a<t.length;++a)r+=Math.abs(t[a]);return r},function(e){if("timeout"===e.name||"suspended"===e.name)return-3;throw e})),function(){return r(),a}):-1:-2},screenFrame:function(){var e=this,a=re();return function(){return m(e,void 0,void 0,function(){var t,r;return v(this,function(e){switch(e.label){case 0:return[4,a()];case 1:return t=e.sent(),[2,[(r=function(e){return null===e?null:z(e,10)})(t[0]),r(t[1]),r(t[2]),r(t[3])]]}})})}},osCpu:function(){return navigator.oscpu},languages:function(){var e=navigator,t=[],r=e.language||e.userLanguage||e.browserLanguage||e.systemLanguage;return void 0!==r&&t.push([r]),Array.isArray(e.languages)?k()&&3<=C([!("MediaSettingsRange"in(r=window)),"RTCEncodedAudioFrame"in r,""+r.Intl=="[object Intl]",""+r.Reflect=="[object Reflect]"])||t.push(e.languages):"string"==typeof e.languages&&(r=e.languages)&&t.push(r.split(",")),t},colorDepth:function(){return window.screen.colorDepth},deviceMemory:function(){return r(t(navigator.deviceMemory),void 0)},screenResolution:function(){function e(e){return r(a(e),null)}var t=screen,t=[e(t.width),e(t.height)];return t.sort().reverse(),t},hardwareConcurrency:function(){return r(a(navigator.hardwareConcurrency),void 0)},timezone:function(){var e=null==(e=window.Intl)?void 0:e.DateTimeFormat;if(e){e=(new e).resolvedOptions().timeZone;if(e)return e}e=(new Date).getFullYear();e=-Math.max(t(new Date(e,0,1).getTimezoneOffset()),t(new Date(e,6,1).getTimezoneOffset()));return"UTC".concat(0<=e?"+":"").concat(Math.abs(e))},sessionStorage:function(){try{return!!window.sessionStorage}catch(e){return!0}},localStorage:function(){try{return!!window.localStorage}catch(e){return!0}},indexedDB:function(){if(!q()&&(e=window,t=navigator,!(3<=C(["msWriteProfilerMark"in e,"MSStream"in e,"msLaunchUri"in t,"msSaveBlob"in t]))||q()))try{return!!window.indexedDB}catch(e){return!0}var e,t},openDatabase:function(){return!!window.openDatabase},cpuClass:function(){return navigator.cpuClass},platform:function(){var e,t=navigator.platform;return"MacIntel"===t&&T()&&!L()?"iPad"===navigator.platform||(e=(e=screen).width/e.height,2<=C(["MediaSource"in window,!!Element.prototype.webkitRequestFullscreen,.65<e&&e<1.53]))?"iPad":"iPhone":t},plugins:function(){var e=navigator.plugins;if(e){for(var t=[],r=0;r<e.length;++r){var a=e[r];if(a){for(var o=[],i=0;i<a.length;++i){var n=a[i];o.push({type:n.type,suffixes:n.suffixes})}t.push({name:a.name,description:a.description,mimeTypes:o})}}return t}},canvas:function(){var e,t,r,a=!1,o=((o=document.createElement("canvas")).width=1,o.height=1,[o,o.getContext("2d")]),i=o[0],o=o[1];return t=o&&i.toDataURL?((r=o).rect(0,0,10,10),r.rect(2,2,6,6),a=!r.isPointInPath(5,5,"evenodd"),r=o,(t=i).width=240,t.height=60,r.textBaseline="alphabetic",r.fillStyle="#f60",r.fillRect(100,1,62,20),r.fillStyle="#069",r.font='11pt "Times New Roman"',t="Cwm fjordbank gly ".concat(String.fromCharCode(55357,56835)),r.fillText(t,2,15),r.fillStyle="rgba(102, 204, 0, 0.2)",r.font="18pt Arial",r.fillText(t,4,45),(r=P(i))!==P(i)?e="unstable":(e=r,function(e,t){e.width=122,e.height=110,t.globalCompositeOperation="multiply";for(var r=0,a=[["#f2f",40,40],["#2ff",80,40],["#ff2",60,80]];r<a.length;r++){var o=a[r],i=o[0],n=o[1],o=o[2];t.fillStyle=i,t.beginPath(),t.arc(n,o,40,0,2*Math.PI,!0),t.closePath(),t.fill()}t.fillStyle="#f9c",t.arc(60,60,60,0,2*Math.PI,!0),t.arc(60,60,20,0,2*Math.PI,!0),t.fill("evenodd")}(i,o),P(i))):e="",{winding:a,geometry:t,text:e}},touchSupport:function(){var t,e=navigator,r=0;void 0!==e.maxTouchPoints?r=a(e.maxTouchPoints):void 0!==e.msMaxTouchPoints&&(r=e.msMaxTouchPoints);try{document.createEvent("TouchEvent"),t=!0}catch(e){t=!1}return{maxTouchPoints:r,touchEvent:t,touchStart:"ontouchstart"in window}},vendor:function(){return navigator.vendor||""},vendorFlavors:function(){for(var e=[],t=0,r=["chrome","safari","__crWeb","__gCrWeb","yandex","__yb","__ybro","__firefox__","__edgeTrackingPreventionStatistics","webkit","oprt","samsungAr","ucweb","UCShellJava","puffinDevice"];t<r.length;t++){var a=r[t],o=window[a];o&&"object"==typeof o&&e.push(a)}return e.sort()},cookiesEnabled:function(){var e=document;try{e.cookie="cookietest=1; SameSite=Strict;";var t=-1!==e.cookie.indexOf("cookietest=");return e.cookie="cookietest=1; SameSite=Strict; expires=Thu, 01-Jan-1970 00:00:01 GMT",t}catch(e){return!1}},colorGamut:function(){for(var e=0,t=["rec2020","p3","srgb"];e<t.length;e++){var r=t[e];if(matchMedia("(color-gamut: ".concat(r,")")).matches)return r}},invertedColors:function(){return!!se("inverted")||!se("none")&&void 0},forcedColors:function(){return!!le("active")||!le("none")&&void 0},monochrome:function(){if(matchMedia("(min-monochrome: 0)").matches){for(var e=0;e<=100;++e)if(matchMedia("(max-monochrome: ".concat(e,")")).matches)return e;throw new Error("Too high value")}},contrast:function(){return e("no-preference")?0:e("high")||e("more")?1:e("low")||e("less")?-1:e("forced")?10:void 0},reducedMotion:function(){return!!ce("reduce")||!ce("no-preference")&&void 0},hdr:function(){return!!de("high")||!de("standard")&&void 0},math:function(){var e=N.acos||I,t=N.acosh||I,r=N.asin||I,a=N.asinh||I,o=N.atanh||I,i=N.atan||I,n=N.sin||I,s=N.sinh||I,l=N.cos||I,c=N.cosh||I,d=N.tan||I,p=N.tanh||I,h=N.exp||I,m=N.expm1||I,g=N.log1p||I;return{acos:e(.12312423423423424),acosh:t(1e308),acoshPf:N.log(1e154+N.sqrt(1e308)),asin:r(.12312423423423424),asinh:a(1),asinhPf:N.log(1+N.sqrt(2)),atanh:o(.5),atanhPf:N.log(3)/2,atan:i(.5),sin:n(-1e300),sinh:s(1),sinhPf:N.exp(1)-1/N.exp(1)/2,cos:l(10.000000000123),cosh:c(1),coshPf:(N.exp(1)+1/N.exp(1))/2,tan:d(-1e300),tanh:p(1),tanhPf:(N.exp(2)-1)/(N.exp(2)+1),exp:h(1),expm1:m(1),expm1Pf:N.exp(1)-1,log1p:g(10),log1pPf:N.log(11),powPI:N.pow(N.PI,-100)}},videoCard:function(){var e=document.createElement("canvas"),t=null!=(t=e.getContext("webgl"))?t:e.getContext("experimental-webgl");if(t&&"getExtension"in t){e=t.getExtension("WEBGL_debug_renderer_info");if(e)return{vendor:(t.getParameter(e.UNMASKED_VENDOR_WEBGL)||"").toString(),renderer:(t.getParameter(e.UNMASKED_RENDERER_WEBGL)||"").toString()}}},pdfViewerEnabled:function(){return navigator.pdfViewerEnabled},architecture:function(){var e=new Float32Array(1),t=new Uint8Array(e.buffer);return e[0]=1/0,e[0]=e[0]-e[0],t[3]}};function me(e){return JSON.stringify(e,function(e,t){return t instanceof Error?W({name:(r=t).name,message:r.message,stack:null==(a=r.stack)?void 0:a.split("\n")},r):t;var r,a},2)}function ge(e){for(var t=function(e){for(var t="",r=0,a=Object.keys(e).sort();r<a.length;r++){var o=a[r],i=e[o],i=i.error?"error":JSON.stringify(i.value);t+="".concat(t?"|":"").concat(o.replace(/([:|\\])/g,"\\$1"),":").concat(i)}return t}(e),e=void 0,r=(t=t||"").length%16,a=t.length-r,o=[0,e=e||0],i=[0,e],n=[0,0],s=[0,0],l=[2277735313,289559509],c=[1291169091,658871167],d=0;d<a;d+=16)n=[255&t.charCodeAt(d+4)|(255&t.charCodeAt(d+5))<<8|(255&t.charCodeAt(d+6))<<16|(255&t.charCodeAt(d+7))<<24,255&t.charCodeAt(d)|(255&t.charCodeAt(d+1))<<8|(255&t.charCodeAt(d+2))<<16|(255&t.charCodeAt(d+3))<<24],s=[255&t.charCodeAt(d+12)|(255&t.charCodeAt(d+13))<<8|(255&t.charCodeAt(d+14))<<16|(255&t.charCodeAt(d+15))<<24,255&t.charCodeAt(d+8)|(255&t.charCodeAt(d+9))<<8|(255&t.charCodeAt(d+10))<<16|(255&t.charCodeAt(d+11))<<24],n=f(n=w(n,l),31),o=y(o=f(o=x(o,n=w(n,c)),27),i),o=y(w(o,[0,5]),[0,1390208809]),s=f(s=w(s,c),33),i=y(i=f(i=x(i,s=w(s,l)),31),o),i=y(w(i,[0,5]),[0,944331445]);switch(n=[0,0],s=[0,0],r){case 15:s=x(s,b([0,t.charCodeAt(d+14)],48));case 14:s=x(s,b([0,t.charCodeAt(d+13)],40));case 13:s=x(s,b([0,t.charCodeAt(d+12)],32));case 12:s=x(s,b([0,t.charCodeAt(d+11)],24));case 11:s=x(s,b([0,t.charCodeAt(d+10)],16));case 10:s=x(s,b([0,t.charCodeAt(d+9)],8));case 9:s=w(s=x(s,[0,t.charCodeAt(d+8)]),c),i=x(i,s=w(s=f(s,33),l));case 8:n=x(n,b([0,t.charCodeAt(d+7)],56));case 7:n=x(n,b([0,t.charCodeAt(d+6)],48));case 6:n=x(n,b([0,t.charCodeAt(d+5)],40));case 5:n=x(n,b([0,t.charCodeAt(d+4)],32));case 4:n=x(n,b([0,t.charCodeAt(d+3)],24));case 3:n=x(n,b([0,t.charCodeAt(d+2)],16));case 2:n=x(n,b([0,t.charCodeAt(d+1)],8));case 1:n=w(n=x(n,[0,t.charCodeAt(d)]),l),o=x(o,n=w(n=f(n,31),c))}return o=y(o=x(o,[0,t.length]),i=x(i,[0,t.length])),i=y(i,o),o=y(o=G(o),i=G(i)),i=y(i,o),("00000000"+(o[0]>>>0).toString(16)).slice(-8)+("00000000"+(o[1]>>>0).toString(16)).slice(-8)+("00000000"+(i[0]>>>0).toString(16)).slice(-8)+("00000000"+(i[1]>>>0).toString(16)).slice(-8)}function ue(c,d){var p=Date.now();return{get:function(l){return m(this,void 0,void 0,function(){var i,n,s;return v(this,function(e){switch(e.label){case 0:return i=Date.now(),[4,c()];case 1:return n=e.sent(),t=n,s={get visitorId(){return r=void 0===r?ge(this.components):r},set visitorId(e){r=e},confidence:(a=a=t,o=z(.99+.01*(a=J()?.4:T()?L()?.5:.3:(a=a.platform.value||"",/^Win/.test(a)?.6:/^Mac/.test(a)?.5:.7)),1e-4),{score:a,comment:"$ if upgrade to Pro: https://fpjs.dev/pro".replace(/\$/g,"".concat(o))}),components:t,version:"3.4.0"},(d||null!=l&&l.debug)&&console.log("Copy the text below to get the debug data:\n\n```\nversion: ".concat(s.version,"\nuserAgent: ").concat(navigator.userAgent,"\ntimeBetweenLoadAndGet: ").concat(i-p,"\nvisitorId: ").concat(s.visitorId,"\ncomponents: ").concat(me(n),"\n```")),[2,s]}var t,r,a,o})})}}}var ve={load:function(e){var o=(e=void 0===e?{}:e).delayFallback,i=e.debug;return e.monitoring,m(this,void 0,void 0,function(){return v(this,function(e){switch(e.label){case 0:return[4,(void 0===(r=2*(t=t=void 0===(t=o)?50:t))&&(r=1/0),(a=window.requestIdleCallback)?new Promise(function(e){return a.call(window,function(){return e()},{timeout:r})}):g(Math.min(t,r)))];case 1:return e.sent(),[2,ue(X(he,{debug:i},[]),i)]}var t,r,a})})},hashComponents:ge,componentsToDebugString:me};const ye=70005,we=70009,fe=70100,be=70101,xe=70102,Ce=70103,ke=70104,Te=70105,Le=70106,Se={[ye]:"The requested action is not allowed.",[we]:"You've reached the maximum number of prompts.",[fe]:"The prompt title is not in English.",[be]:"The prompt teaser is not in English.",[xe]:"The prompt hint is not in English.",[Ce]:"The prompt title has too many uppercase letters.",[ke]:"The prompt title is too long.",[Te]:"The prompt teaser has too many uppercase letters.",[Le]:"The prompt hint has too many uppercase letters."};class Pe extends Error{message="";constructor(e){super(e),this.message=e}static mapReactionNo(e){return new Pe(Se[e]||"Something went wrong, please try again later.")}}var Ie={APIEndpoint:l,User:null,async init(){return await!(await(await ve.load({monitoring:!1})).get()).visitorId,fetch("/api/auth/session").then(e=>{if(e.ok)return e.json();throw new Error("Network response was not OK.")}).then(e=>{this.User={Email:e.user.email,Name:e.user.name}})},savePrompt(e){var t=e;return t.RevisionTime=(new Date).toISOString(),t.AuthorName=this.User.Name,t.AuthorURL=this.User.Email,fetch(`${this.APIEndpoint}/prompts?user=${this.User.Email}&company=${IN_BOUND.Company}&id=`+e.ID,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...t})}).then(e=>Promise.all([e.json(),e])).then(([e,t])=>{if(t.ok)return e;if(e&&e.ReactionNo)throw Pe.mapReactionNo(e.ReactionNo);throw new Error("Network response was not OK.")})},pinActionForPrompt(e,t){return fetch(`${this.APIEndpoint}/prompts?user=${this.User.Email}&company=${IN_BOUND.Company}&id=`+e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pin:1===t})}).then(e=>{if(e.ok)return e;throw new Error("Network response was not OK")})},reportPrompt(e,t,r,a){return fetch(this.APIEndpoint+"?act=promptsFeedback&promptID="+e,{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify({FeedbackContact:a,FeedbackText:r,FeedbackTypeNo:t,PromptID:e,User:this.User})}).then(e=>{if(e.ok)return e;throw new Error("Network response was not OK")})},saveNewTone(e){return fetch(`${this.APIEndpoint}variations?user=${this.User.Email}&company=${IN_BOUND.Company}&id=`+e.id,{method:"POST",body:JSON.stringify({...e})}).then(e=>{if(e.ok)return e;throw new Error("Network response was not OK")})},saveEditTone(e){return console.log(e),fetch(`${this.APIEndpoint}/variations?user=${this.User.Email}&company=${IN_BOUND.Company}&id=`+e.id,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(e=>{if(e.ok)return e;throw new Error("Network response was not OK")})},deleteTone(e){return console.log(e),fetch(`${this.APIEndpoint}/variations?user=${this.User.Email}&company=${IN_BOUND.Company}&id=`+e,{method:"DELETE",headers:{"Content-Type":"application/json"}}).then(e=>{if(!e.ok)throw new Error("Network response was not OK")})},deletePrompt(e){return fetch(`${this.APIEndpoint}/prompt?user=${this.User.Email}&company=${IN_BOUND.Company}&id=`+e,{method:"DELETE",headers:{"Content-Type":"application/json"}}).then(e=>{if(!e.ok)throw new Error("Network response was not OK")})},voteForPrompt(e,t){return fetch(`${this.APIEndpoint}/prompts?user=${this.User.Email}&company=${IN_BOUND.Company}&id=`+e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({favourite:1===t})}).then(e=>{if(e.ok)return e;throw new Error("Network response was not OK")})},getBingResults(e){IN_BOUND.showNotification(i.SUCCESS,"Fetching web results..."),document.dispatchEvent(new CustomEvent("IN_BOUND.SendBgMsg",{detail:{url:"https://www.bing.com/search?q="+e,type:"IN_BOUND.getRequest",returnType:"getBingResults"},bubbles:!0}))},getDdgResults(e){IN_BOUND.showNotification(i.SUCCESS,"Fetching web results..."),document.dispatchEvent(new CustomEvent("IN_BOUND.SendBgMsg",{detail:{url:"https://html.duckduckgo.com/html/?q="+e,type:"IN_BOUND.getRequest",returnType:"getDdgResults"},bubbles:!0}))},getGoogleNewsResults(e){IN_BOUND.showNotification(i.SUCCESS,"Fetching web results..."),document.dispatchEvent(new CustomEvent("IN_BOUND.SendBgMsg",{detail:{url:`https://www.google.com/search?q=${e}&tbm=nws`,type:"IN_BOUND.getRequest",returnType:"getGoogleNewsResults"},bubbles:!0}))}};function D(e){switch(e=Array.isArray(e)?e[0]:e){case"VersionInfo":case"ExportButton":return"flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm";case"column":return"flex flex-col gap-3.5 flex-1";case"h2":return'text-lg font-normal">IN_BOUND</h2><ul class="flex flex-col gap-3.5 mb-4';case"h3":return"m-0 tracking-tight leading-8 text-gray-900 dark:text-gray-100 text-lg font-bold";case"ul":return"gap-3.5";case"card":return"flex flex-col gap-1 w-full bg-gray-50 dark:bg-white/5 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900 text-left border shadow border-gray-300 dark:border-gray-700 hover:shadow-lg transition duration-300 ease-in-out tw-border-2 tw-border-blue-500 tw-rounded-xl";case"p":return"m-0 font-light text-gray-500";case"paginationText":return"text-sm text-gray-700 dark:text-gray-400";case"paginationNumber":return"font-semibold text-gray-900 dark:text-white";case"paginationButtonGroup":return"inline-flex xs:mt-0";case"paginationButton":return"px-1 py-1 font-small bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white";case"continueButton":return"py-2 font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:border-gray-600 dark:hover:bg-gray-800 bg-gray disabled:text-gray-300 disabled:hover:bg-transparent rounded-l-md px-4";case"continueActionSelect":return"bg-gray-100 border-0 p-1 border-l text-xs rounded-r-md block w-2 dark:bg-gray-600 border-gray-200 dark:border-gray-600 dark:hover:bg-gray-800 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0 focus:border-gray-200 pr-6";case"action":return"p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400 md:invisible md:group-hover:visible";case"tag":return"inline-flex flex-col w-full items-start py-1 px-2 mr-2 mb-2 text-sm font-medium text-white rounded bg-gray-600 whitespace-nowrap";case"languageSelectWrapper":return"flex gap-3 lg:max-w-3xl md:last:mb-6  pt-0 stretch justify-around text-xs items-end lg:-mb-4 pb-9 mb-0  sm:flex-col";case"select":return"bg-gray-100 p-1 px-2 border-0 text-xs rounded block w-full dark:bg-gray-600 dark:border-gray-600 dark:hover:bg-gray-800 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0";case"select-v2":return"bg-gray-100 p-1 px-2 border-0 text-xs w-full dark:bg-gray-600 dark:border-gray-600 dark:hover:bg-gray-800 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0";case"selectLabel":return"block text-xs font-thin"}}function M(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;")}function Ne(e,t,r,a){if(t!==p.OWN){t=r[e];if(t){let e=document.getElementById("reportPromptModal");e||((e=document.createElement("div")).id="reportPromptModal",e.addEventListener("submit",a),document.body.appendChild(e)),e.innerHTML=`
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
  `})(+t.value,t.dataset.promptId),r.classList.remove("hidden"),e.target.innerText="Send Report",e.target.addEventListener("click",()=>{document.querySelector("#reportPromptModal .reportPromptFeedbackContainer:not(.hidden) form").requestSubmit()})},{once:!0}),e.style="display: block;",document.addEventListener("keydown",e=>{"Escape"===e.key&&De("reportPromptModal")})}}}const E=function(e){switch(e=Array.isArray(e)?e[0]:e){case"Logo-dark":return`<?xml version="1.0" encoding="utf-8"?>
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
      <path id="Vector" d="M2.33496 10.3368C2.02171 10.0471 2.19187 9.52339 2.61557 9.47316L8.61914 8.76107C8.79182 8.74059 8.94181 8.63215 9.01465 8.47425L11.5469 2.98446C11.7256 2.59703 12.2764 2.59695 12.4551 2.98439L14.9873 8.47413C15.0601 8.63204 15.2092 8.74077 15.3818 8.76124L21.3857 9.47316C21.8094 9.52339 21.9791 10.0472 21.6659 10.3369L17.2278 14.4419C17.1001 14.56 17.0433 14.7357 17.0771 14.9063L18.255 20.8359C18.3382 21.2544 17.8928 21.5787 17.5205 21.3703L12.2451 18.4166C12.0934 18.3317 11.9091 18.3321 11.7573 18.417L6.48144 21.3695C6.10913 21.5779 5.66294 21.2544 5.74609 20.8359L6.92414 14.9066C6.95803 14.7361 6.90134 14.5599 6.77367 14.4419L2.33496 10.3368Z" stroke="#FFC300" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      </svg>`;case"grid":return'<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 -5 20 20" id="meteor-icon-kit__solid-grip-lines" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 8.5C0 7.6716 0.67157 7 1.5 7H18.5C19.3284 7 20 7.6716 20 8.5C20 9.3284 19.3284 10 18.5 10H1.5C0.67157 10 0 9.3284 0 8.5zM0 1.5C0 0.67157 0.67157 0 1.5 0H18.5C19.3284 0 20 0.67157 20 1.5C20 2.32843 19.3284 3 18.5 3H1.5C0.67157 3 0 2.32843 0 1.5z" fill="gray"/></svg>';case"grid-yellow":return'<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 -5 20 20" id="meteor-icon-kit__solid-grip-lines" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 8.5C0 7.6716 0.67157 7 1.5 7H18.5C19.3284 7 20 7.6716 20 8.5C20 9.3284 19.3284 10 18.5 10H1.5C0.67157 10 0 9.3284 0 8.5zM0 1.5C0 0.67157 0.67157 0 1.5 0H18.5C19.3284 0 20 0.67157 20 1.5C20 2.32843 19.3284 3 18.5 3H1.5C0.67157 3 0 2.32843 0 1.5z" fill="#FFC300"/></svg>';case"list":return`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="h-4 w-4" viewBox="0 0 24 24" version="1.1">
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
      </svg>`;case"pin-yellow":return`<svg xmlns="http://www.w3.org/2000/svg" transform="rotate(-45)" class="h-4 w-4 " viewBox="0 0 15 15" fill="none">
      <path d="M0.5 14.5L5 10M0.5 5.5L9.5 14.5M8.5 0.5L14.5 6.5M1.5 6.5L9.5 1.5M8.5 13.5L13.5 5.5" stroke="#FFC300"/>
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
    </svg>`;case"no-txt-logo-light":return'<svg id="Layer_1" style="width:5em; margin-left:25%;"  data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 198.6 198.6"><defs><style>.cls-1{fill:#505d69;stroke:#505d69;stroke-miterlimit:10;stroke-width:4px;}.cls-2{fill:#fff;}</style></defs><rect class="cls-1" x="3.35" y="3.11" width="192.39" height="192.39" rx="20"/><path class="cls-2" d="M120.14,132.35,107.07,116,89.16,93.72l0,0L57.14,53.6a5,5,0,0,0-3.91-1.88v0H34.45a5,5,0,0,0-4.3,7.67L71.79,144.1a5,5,0,0,0,6.71,2.3,5,5,0,0,0,1.67-1.32L93,129.5l-6.43-8-9.16,11.18L42.51,61.76h8.33l40,49.95,12.35,15.38,0,0,14,17.47a5,5,0,0,0,2,1.72,5,5,0,0,0,6.69-2.4l42.68-84.71a5,5,0,0,0,.64-2.46,5,5,0,0,0-5-5h-18v0a5,5,0,0,0-3.87,1.83l-37,45.11,6.42,8,36.8-44.88h7.65l-36,70.59Z"/></svg>';case"no-txt-logo-dark":return'<svg id="Layer_1" style="width:5em; margin-left:25%;" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200.7 200.7"><defs><style>.cls-1{fill:none;stroke:#fff;stroke-miterlimit:10;stroke-width:4px;}.cls-2{fill:#fff;}</style></defs><rect class="cls-1" x="4.3" y="4.51" width="192.39" height="192.39" rx="20"/><path class="cls-2" d="M121.08,133.74,108,117.41,90.1,95.12l.05,0L58.09,55a5,5,0,0,0-3.92-1.88v0H35.39a5,5,0,0,0-4.29,7.67L72.73,145.5a5,5,0,0,0,6.71,2.3,4.85,4.85,0,0,0,1.67-1.32L93.89,130.9l-6.42-8L78.3,134.09,43.45,63.16h8.34l39.95,50,12.36,15.37,0,0L118,146a4.94,4.94,0,0,0,2,1.71,5,5,0,0,0,6.68-2.39l42.68-84.71a5,5,0,0,0-4.39-7.5h-18v0a5,5,0,0,0-3.87,1.83l-37,45.11,6.42,8,36.8-44.88h7.65l-36,70.59Z"/></svg>';case"reload":return`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="gray" class="h-4 w-4 " version="1.1" id="Capa_1" viewBox="0 0 489.533 489.533" xml:space="preserve"><link xmlns="" type="text/css" rel="stylesheet" id="dark-mode-custom-link"/><link xmlns="" type="text/css" rel="stylesheet" id="dark-mode-general-link"/><style xmlns="" lang="en" type="text/css" id="dark-mode-custom-style"/><style xmlns="" lang="en" type="text/css" id="dark-mode-native-style"/><style xmlns="" lang="en" type="text/css" id="dark-mode-native-sheet"/>
      <g>
        <path d="M268.175,488.161c98.2-11,176.9-89.5,188.1-187.7c14.7-128.4-85.1-237.7-210.2-239.1v-57.6c0-3.2-4-4.9-6.7-2.9   l-118.6,87.1c-2,1.5-2,4.4,0,5.9l118.6,87.1c2.7,2,6.7,0.2,6.7-2.9v-57.5c87.9,1.4,158.3,76.2,152.3,165.6   c-5.1,76.9-67.8,139.3-144.7,144.2c-81.5,5.2-150.8-53-163.2-130c-2.3-14.3-14.8-24.7-29.2-24.7c-17.9,0-31.9,15.9-29.1,33.6   C49.575,418.961,150.875,501.261,268.175,488.161z"/>
      </g>
      </svg>`}},De=function(e){e=document.getElementById(e);e&&(e.style="display: none;")},Me={[h.INFO]:"bg-gray-500",[h.SUCCESS]:"bg-green-500",[h.UPDATE]:"bg-[#5436DA]"},Ee=(e,t,r)=>{var a=e.find(e=>e.MessageStatusNo===R.ACTIVE&&e.MessageSeverityNo===h.MANDATORY_MUST_CONFIRM&&(!e.ExpiryTime||new Date(e.ExpiryTime)>new Date));if(a){var o=a,i=t;let e=document.getElementById("confirmMessageModal");e||((e=document.createElement("div")).id="confirmMessageModal",e.addEventListener("submit",async e=>{e.preventDefault();e=e.target.MessageID.value;await i(e)&&De("confirmMessageModal")}),document.body.appendChild(e)),e.innerHTML=`
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

      </div>`,e.style="display: block;"}else if(a=e.find(e=>e.MessageStatusNo===R.ACTIVE&&e.MessageSeverityNo!==h.MANDATORY_MUST_CONFIRM&&(!e.ExpiryTime||new Date(e.ExpiryTime)>new Date))){var n=a;var s=r;const l=Me[n.MessageSeverityNo],c=document.createElement("div");c.innerHTML=`
      <div class="fixed flex justify-center w-full top-2 px-2 z-50 pointer-events-none">
        <div class="${l} flex pointer-events-auto px-6 py-3 rounded-md text-white" role="alert" style="min-width: 30rem;">
          <div class="flex flex-col gap-2 w-full">

            <h4 class="w-full">${n.MessageSubject}</h4>

            <div class="prose w-full text-white">
              ${n.MessageBodyHTML}
            </div> 

            <div class="flex gap-4 mt-4" style="justify-content: end;">
              <button data-message-vote-type-no="${_.MESSAGE_LIKE}" title="I like this">${E("ThumbUp")}</button>
              <button data-message-vote-type-no="${_.MESSAGE_DISLIKE}" title="I don't like this">${E("ThumbDown")}</button>
            </div>

          </div>
        </div>
      </div>
    `,c.querySelectorAll("button").forEach(e=>{e.addEventListener("click",async e=>{await s(n.MessageID,+e.target.closest("button").dataset.messageVoteTypeNo)&&c.remove()})}),document.body.appendChild(c)}},Oe={english:{tabsLabel:["All Shared","My Prompts"],topicLabel:"Topic",activityLabel:"Activity",sortLabel:"Sort by",feedLabel:"Feed type",search:"Search",newPromptLabel:"Add new prompt template",likeTitle:["Vote ","Vote for this prompt with thumbs up"],dislikeTitle:"Vote for this prompt with thumbs down",forkTitle:["Copy to My Prompts","Prompt already copied!"],labelsOverTextareaElems:["Output in","Tone","Writing Style"],titleOnTopIcons:["Setting","Add New Prompt Templates","Import Prompt Template","Expanded View","Collapsed View","View Favorites"],cardIconsTitle:["Add prompt to favorites","Remove prompt from favorites","Save it as My Prompts","Prompt already copied!","Pin this prompt","UnPin this prompt","Download prompt template"],plusOnTextarea:"Add to My Prompts",reportTitle:"Report this prompt",useTitle:"Usages",topicTitle:"Topic: ",activityTitle:"Activity: ",authorTitle:"Created by ",timeTitle:"Last updated on ",shareTitle:"Copy link to this prompt ",editPrmptTitle:"Edit this prompt",dltPrmptTitle:"Delete this prompt",publicTitle:"Public",ownTitle:"Private",textareaPlaceholderIdentifier:"Enter: ",inputform:{saveAsNew:"Save as New Template",title:{label:"Title",placeholder:"Keyword Stretegy"},teaser:{label:"Teaser",placeholder:"Create a keyword strategy and SEO cotent plan from 1 [KEYWORD]"},promptHint:{label:"Prompt Hint",placeholder:"[KEYWORD] or [Your list of keywords]"},promptTemplate:{label:"Prompt Template",placeholer:"Prompt text including placeholders"},addPromptBtn:"Add New Prompt",topic:"Topic",activity:"Tags",share:"Share prompt template publicly",author:{label:"Author Name",placeholder:"Author Name"},authorUrl:{label:"Author URL",placeholder:"https://www.example.com"},agreeText:"Please be mindful of what you share, and do not include any confidential information, as we are not responsible for any actions taken by others with the information you choose to share.",save:"Save Prompt",cancel:"Cancel"}},danish:{tabsLabel:["Offentlige forslag","Egne forslag"],topicLabel:"Emne",activityLabel:"Aktivitet",sortLabel:"Sortér efter",feedLabel:"Feed type",search:"Søg",newPromptLabel:"Tilføj nyt prompt-mal",likeTitle:["Stem ","Stem på dette prompt med en tommelfinger op"],dislikeTitle:"Stem på dette prompt med en tommelfinger nedad",forkTitle:["Kopier til mine meddelelser","Prompt er allerede kopieret!"],labelsOverTextareaElems:["Output ind","Tone","Skrivestil"],titleOnTopIcons:["Indstilling","Tilføj nye promptskabeloner","Importer promptskabelon","Udvidet visning","Skjult visning","Se favoritter"],cardIconsTitle:["Tilføj prompt til favoritter","Fjern prompt fra favoritter","Gem det som Mine prompter","Prompt er allerede kopieret!","Fastgør denne prompt","Fjern fastgør denne prompt","Download prompt skabelon"],plusOnTextarea:"Føj til mine meddelelser",reportTitle:"Rapporter dette prompt",useTitle:"Anvendelser",topicTitle:"Emne: ",activityTitle:"Aktivitet: ",authorTitle:"Oprettet af ",timeTitle:"Sidst opdateret den ",shareTitle:"Kopier link til dette prompt ",editPrmptTitle:"Rediger dette prompt",dltPrmptTitle:"Slet dette prompt",publicTitle:"Offentligt",ownTitle:"Privat",textareaPlaceholderIdentifier:"Indtast: ",inputform:{saveAsNew:"Gem som ny skabelon",title:{label:"Titel",placeholder:"Keyword Strategi"},teaser:{label:"Teaser",placeholder:"Opret en nøgleord strategi og SEO indholdsplan fra 1 [NØGLEORD]"},promptHint:{label:"Prompt Tip",placeholder:"[NØGLEORD] eller [Din liste over nøgleord]"},promptTemplate:{label:"Prompt-mal",placeholer:"Prompt tekst inklusive pladsholdere"},addPromptBtn:"Tilføj nyt Prompt",topic:"Emne",activity:"Aktivitet",share:"Del prompt-mal offentligt",author:{label:"Forfatternavn",placeholder:"Forfatternavn"},authorUrl:{label:"Forfatter-URL",placeholder:"https://www.example.com"},agreeText:"Vær venlig at være opmærksom på hvad du deler, og inkluder ikke fortrolige oplysninger, da vi ikke er ansvarlige for eventuelle handlinger foretaget af andre med de oplysninger, du vælger at dele.",save:"Gem Prompt",cancel:"Annuller"}}};const O="all",Ae="English*";const $e="lastTargetLanguage",A="IN_BOUND_PromptID";let $=Oe.english;const Be=[4,8,12,16,20,24],Ue="editPromptTemplate";window.IN_BOUND={fetch:window._fetch=window._fetch||window.fetch,CacheBuster:btoa((new Date).toISOString().slice(0,16).toString()),Client:Ie,feedSelect:["All","Favourites"],feedSelected:"All",ExtLang:"english",access:{cardMenuInDots:!1},feedView:window.localStorage.feedView||"grid",feedViewList:["grid","list"],TargetLanguage:null===localStorage.getItem($e)?Ae:localStorage.getItem($e),WebAccess:null!==localStorage.getItem("WebAccess")&&localStorage.getItem("WebAccess"),Tone:null,WritingStyle:null,PromptTopic:localStorage.getItem("lastPromptTopic")||O,PromptActivity:"all",PromptSortMode:1,PromptSearch:"",PromptTemplatesType:p.OWN,PromptTemplates:[],FavouritePromptTemplates:[],PinPromptTemplates:[],forkPromptTemplates:[],activePromptID:"",themeMode:"",ToneCategories:[],DefaultTones:[],userTones:[],ToneCategorySelected:"",InputToneCategorySelected:"",promptVariables:[],settingsActiveTab:"settings",editActivatedTonesInSetting:"",activatedToneSelected:{title:"",tone:""},searchPredictionList:[],webResults:[],current_active_prompts:[],Company:"",companyMeta:{},APIEndpoint:l,companyTones:[],isLoading:!1,import:!1,companyTonesState:!1,companyToneText:"",DefaultPromptTemplates:[],OwnPrompts:[],Languages:[],Tone:"",Theme:"",WritingStyles:[],ContinueActions:[],Topics:[],Activities:[],AdminMode:!1,PromptTemplateSection:{currentPage:0,pageSize:30},SelectedPromptTemplate:null,async init(){this.setupSidebar(),this.isLoading=!0,this.showLoadingInterface(""),console.log("IN_BOUND init"),this.boundHandleArrowKey=this.handleArrowKey.bind(this),await this.Client.init(),this.replaceFetch(),this.createObserver(),await Promise.all([this.fetchUser()]),this.insertLanguageToneWritingStyleContinueActions(),this.fetchPromptFromDeepLink(),this.sendBtnObserver(),this.createThemeObserver(),this.getTheme(),this.isLoading=!1,this.hideLoadingInterface(),this.insertPromptTemplatesSection(),document.addEventListener("IN_BOUND.getRequest",async e=>{this.handleGetRequestEvent(e)}),window.addEventListener("popstate",()=>{this.fetchPromptFromDeepLink()})},changeLoadingText(e){document.querySelector(".loading-text")&&(document.querySelector(".loading-text").innerHTML=e)},async reloadAllData(){this.showLoadingInterface(),await this.fetchUser(),this.hideLoadingInterface(),this.insertPromptTemplatesSection()},async fetchUser(){this.changeLoadingText("Fetching User...");var e=this.Client.User.Email,e=await(await fetch(l+"/user?user="+e)).json();this.Company=e.company,await this.fetchCompany(e.company),await this.fetchPublicPrompts(e.company),await this.fetchPrivatePrompts(e.company),await this.fetchUserVariations(e.company),await this.fetchCompanyVariations(e.company)},async fetchCompany(e){this.changeLoadingText("Fetching Organization...");var t=this.Client.User.Email,t=await(await fetch(l+`/company?user=${t}&company=`+e)).json(),{dark_logo:e,description:r,email:a,id:o,light_logo:i,name:n,website:s}=(this.companyToneText=t.company_tone,t);this.companyMeta={dark_logo:e,description:r,email:a,id:o,light_logo:i,name:n,website:s},this.WritingStyles=t.writing_styles.sort((e,t)=>e.label.localeCompare(t.label)).map((e,t)=>{var{id:e,label:r,prompt:a}=e;return{ID:e,Label:r,Prompt:a}}),this.ContinueActions=t.continue_actions.sort((e,t)=>e.label.localeCompare(t.label)).map((e,t)=>{var{id:e,label:r,prompt:a}=e;return{ID:e,Label:r,Prompt:a}}),this.Languages=t.languages.sort((e,t)=>e.language.localeCompare(t.language)).map((e,t)=>{var{langcode:e,language:r,id:a}=e;return{langcode:e,languageEnglish:r,languageLabel:r,id:a}})},async fetchPublicPrompts(e){this.changeLoadingText("Fetching Public Prompts...");var t=this.Client.User.Email,t=await(await fetch(l+`/prompts?user=${t}&company=${e}&type=2`)).json();this.PromptTemplates=t.documents.map((e,t)=>({...e,OwnPrompt:!1,favourite:!1,pin:!1})).sort((e,t)=>new Date(t.RevisionTime)-new Date(e.RevisionTime)),this.DefaultPromptTemplates=this.PromptTemplates},async fetchPrivatePrompts(e){this.changeLoadingText("Fetching User Prompts...");var t=this.Client.User.Email,t=await(await fetch(l+`/prompts?user=${t}&company=${e}&type=1`)).json();this.OwnPrompts=t.documents.map((e,t)=>({...e,OwnPrompt:!0})).sort((e,t)=>new Date(t.RevisionTime)-new Date(e.RevisionTime))},async fetchUserVariations(e){this.changeLoadingText("Fetching User Variations...");var t=this.Client.User.Email,t=await(await fetch(l+`/variations?user=${t}&company=${e}&type=user`)).json();this.userTones=t.documents.map((e,t)=>({ID:e.id,Label:e.label,Description:e.prompt,type:"user"}))},async fetchCompanyVariations(e){this.changeLoadingText("Fetching Org Variations...");var t=this.Client.User.Email,t=await(await fetch(l+`/variations?user=${t}&company=${e}&type=org`)).json();this.companyTones=t.documents.map((e,t)=>({ID:e.id,Label:e.label,Description:e.prompt,type:"user"}))},async fetchUserPrompt(e){var t=this.Client.User.Email,t=await(await fetch(l+`/prompt?user=${t}&company=${this.Company}&promptID=`+e)).json();return{...null!==t?t:{},OwnPrompt:!0}},pinActionForPrompt(e,t){return fetch(`${this.APIEndpoint}/prompts?user=${this.Client.User.Email}&company=${this.Company}&id=`+e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pin:1===t})}).then(e=>{if(e.ok)return e;throw new Error("Network response was not OK")})},getTheme(){this.Theme=document.documentElement.style.colorScheme},handleGetRequestEvent(e){document.createElement("div").innerHTML=e.detail.data;var t=e.detail,r=e.detail.data;console.log(t),"getBingResults"===e.detail.returnType?this.processBingResults(r):"getDdgResults"===e.detail.returnType?this.processDDGResults(r):"getGoogleNewsResults"===e.detail.returnType&&this.processGoogleNewsResults(r)},processBingResults(e){var t=document.createElement("div");t.innerHTML=e,Array.from(t?.querySelector("#b_results")?.children)?.forEach(e=>{var t=e?.querySelector("p")?.innerText.slice(3,-3),e=e?.querySelector("a")?.href;t&&this.webResults.push({text:t,url:e})});let r=this.SelectedPromptTemplate.Prompt;e=this.webResults.map((e,t)=>`[${t+1}] ${e.text} (URL: ${e.url})`).slice(0,4).join("\n");r=r.replace("{{WebSearch}}",e),this.SelectedPromptTemplate={...this.SelectedPromptTemplate,Prompt:r},this.showNotification(i.SUCCESS,"Results added!")},processDDGResults(e){var t=document.createElement("div"),e=(t.innerHTML=e,(IN_BOUND.searchDiv=t)?.querySelector(".results")?.children||t?.querySelector(".serp__results")?.querySelectorAll("result"));Array.from(e)?.forEach(e=>{var t=e?.querySelector(".result__snippet")?.innerText,e=e?.querySelector(".result__snippet")?.href;t&&20<t.length&&this.webResults.push({text:t,url:e})}),console.log(this.webResults);let r=this.SelectedPromptTemplate.Prompt;t=this.webResults.map((e,t)=>`[${t+1}] ${e.text} (Link:${e.url})`).slice(0,5+Math.floor(5*Math.random())).join("\n");return r=r.replace("{{WebSearch}}",t),this.SelectedPromptTemplate={...this.SelectedPromptTemplate,Prompt:r},this.showNotification(i.SUCCESS,"Results added!"),r},processGoogleNewsResults(e){var t=document.createElement("div"),e=(t.innerHTML=e,console.log(t),t?.querySelector("#search")?.querySelectorAll("a")||t?.querySelector("#main")?.querySelectorAll("a"));console.log(e),Array.from(e)?.forEach(e=>{var t=e?.innerText,e=e?.href;t&&20<t.length&&this.webResults.push({text:t,url:e})});let r=this.SelectedPromptTemplate.Prompt;t=this.webResults.map((e,t)=>`[${t+1}] ${e.text} (Link:${e.url})`).slice(0,5+Math.floor(5*Math.random())).join("\n");return console.log(this.webResults),r=r.replace("{{WebNews}}",t),this.SelectedPromptTemplate={...this.SelectedPromptTemplate,Prompt:r},this.showNotification(i.SUCCESS,"Results added!"),r},async refreshData(){await this.fetchPrivatePrompts(this.Company),await this.fetchUserVariations(this.Company),this.insertPromptTemplatesSection()},async refreshActions(){return await this.fetchUserVariations(this.Company),this.insertLanguageToneWritingStyleContinueActions(),this.showSettingModal(),!0},async fetchPromptFromDeepLink(){var t=new URLSearchParams(window.location.search).get(A);if(t){if(!this.SelectedPromptTemplate||this.SelectedPromptTemplate.ID!==t){let e;try{e=await this.fetchUserPrompt(t)}catch(e){return void this.showNotification(i.ERROR,"Something went wrong. Please try again.")}e&&this.selectPromptTemplate(e)}}else this.selectPromptTemplateByIndex(null)},async fetchMessages(){Ee(await this.Client.getMessages(this.PromptTopic===O?"":this.PromptTopic),this.confirmMessage.bind(this),this.voteForMessage.bind(this))},async confirmMessage(e){try{await this.Client.confirmMessage(e)}catch(e){return this.showNotification(i.ERROR,"Something went wrong. Please try again."),!1}return this.showNotification(i.SUCCESS,"Thanks for the confirmation!"),!0},async voteForMessage(e,t){try{await this.Client.voteForMessage(e,t)}catch(e){return this.showNotification(i.ERROR,"Something went wrong. Please try again."),!1}return!0},setupSidebar(){var e;this.addExportButton(),this.getNewChatButtons().forEach(e=>{e.onclick=()=>{this.selectPromptTemplateByIndex(null),this.hideContinueActionsButton()}}),document.getElementById("sideBarWrapper")||(document.body.classList.toggle("show-nav"),(e=document.createElement("div")).id="sideBarWrapper",e.innerHTML=`
      
      <nav class="nav">
      </nav>`,document.body.appendChild(e))},async fetchTopics(){this.fetch(TopicFeedURL+this.CacheBuster).then(e=>e.text()).then(e=>this.CSVToArray(e)).then(e=>e.map(([e,t])=>({ID:e,Label:t})).filter(({ID:e})=>e&&"ID"!==e)).then(e=>{this.Topics=e.sort((e,t)=>e.Label.localeCompare(t.Label))})},fetchFavourites(){this.fetch(dbMetaURL.query(promptsLikesDBID,this.Client.User.Email)).then(e=>e.text()).then(e=>e.slice(1,-1).replace(/""/gi,'"')).then(e=>""!==e[0]&&e[0]?JSON.parse(e):{likesCollection:[]}).then(e=>{this.FavouritePromptTemplates=e.likesCollection,this.PinPromptTemplates=e?.pinCollection||[],this.userTones=e?.userTones?.map(e=>JSON.parse(e))||[],this.userTones=this.userTones?.map(e=>({...e,type:"user"}))||[],this.fetchToneCategories()})},async fetchActivities(){this.fetch(ActivityFeedURL+this.CacheBuster).then(e=>e.text()).then(e=>this.CSVToArray(e)).then(e=>e.map(([e,t,r])=>({TopicID:e,ID:t,Label:r})).filter(({ID:e})=>e&&"ID"!==e)).then(e=>{this.Activities=e.sort((e,t)=>e.Label.localeCompare(t.Label))})},fetchLanguages(){return this.fetch(LanguageFeedURL+this.CacheBuster).then(e=>e.text()).then(e=>this.CSVToArray(e)).then(e=>e.map(([e,t,r])=>({langcode:e,languageEnglish:t,languageLabel:r})).filter(({langcode:e})=>e&&"langcode"!==e)).then(e=>{this.Languages=e})},fetchTones(){return this.fetch(ToneFeedURL+this.CacheBuster).then(e=>e.text()).then(e=>this.CSVToArray(e)).then(e=>e.map(([e,t,r,a,o])=>({ID:e,Label:t,Description:r,Category:a,CategoryID:o,type:"company"})).filter(({ID:e})=>e&&"ID"!==e).sort((e,t)=>e.Label.localeCompare(t.Label))).then(e=>{this.DefaultTones=e,this.fetchToneCategories()})},fetchCompanyTone(){this.fetch(CompanyToneUrl).then(e=>e.text()).then(e=>{this.companyToneText=e.slice(1,-1)})},fetchToneCategories(){var e=this.companyTonesState?[...this.DefaultTones,...this.userTones]:this.userTones,t=e.map(e=>e.Category+"___||__="+e.CategoryID);let r=[];t.forEach(function(e){r.indexOf(e)<0&&r.push(e)});t=r.map(e=>e.split("___||__="));this.ToneCategories=t.map(e=>({ID:e[1],Label:e[0]}))?.sort((e,t)=>e.Label.localeCompare(t.Label))||[],this.ToneCategorySelected=this.ToneCategories[0]?.ID||[],this.Tones=e?.filter(e=>e.CategoryID===this.ToneCategorySelected)||[],this.insertLanguageToneWritingStyleContinueActions()},fetchWritingStyles(){return this.fetch(WritingStyleFeedURL+this.CacheBuster).then(e=>e.text()).then(e=>this.CSVToArray(e)).then(e=>e.map(([e,t])=>({ID:parseInt(e),Label:t})).filter(({ID:e})=>e&&"ID"!==e).sort((e,t)=>e.Label.localeCompare(t.Label))).then(e=>{this.WritingStyles=e})},fetchContinueActions(){return this.fetch(ContinueActionsFeedURL+this.CacheBuster).then(e=>e.text()).then(e=>this.CSVToArray(e)).then(e=>e.map(([e,t,r])=>({ID:parseInt(e),Label:t,Prompt:r})).filter(({ID:e})=>e&&"ID"!==e).sort((e,t)=>e.Label.localeCompare(t.Label))).then(e=>{this.ContinueActions=e})},async fetchPromptTemplates(){var e=this.import?await this.Client.importPrompts(this.PromptTopic===O?"":this.PromptTopic,this.PromptSortMode):await this.Client.getPrompts(this.PromptTopic===O?"":this.PromptTopic,this.PromptSortMode);[this.PromptTemplates,this.OwnPrompts]=e.reduce((e,t)=>(t.PromptTypeNo===n.PUBLIC&&e[0].push(t),t.AuthorURL===this.Client.User.Email&&e[1].push(t),e),[[],[]]),await this.fetchForks(),this.DefaultPromptTemplates=this.PromptTemplates,this.insertPromptTemplatesSection()},async fetchForks(){var e=(await this.Client.getForks()).filter(e=>e.AuthorURL===this.Client.User.Email);this.forkPromptTemplates=e.map(e=>e.forkID)},createObserver(){new MutationObserver(e=>{e.forEach(e=>{"childList"!==e.type&&0==e.addedNodes.length||(e=e.addedNodes[0])&&e.querySelector&&this.handleElementAdded(e)})}).observe(document.body,{subtree:!0,childList:!0})},createThemeObserver(){var e=document.documentElement;new MutationObserver((e,t)=>{for(const a of e){var r;"childList"!==a.type&&"attributes"===a.type&&(r=document.documentElement.style.colorScheme,IN_BOUND.Theme!==r)&&(IN_BOUND.Theme=r,IN_BOUND.insertPromptTemplatesSection())}}).observe(e,{attributes:!0,childList:!0,subtree:!0})},sendBtnObserver(){var e=document.querySelector("textarea").nextElementSibling;new MutationObserver((e,t)=>{for(const o of e)if("childList"===o.type){var r,a=document.getElementsByClassName("text-gray-400 flex self-end lg:self-center justify-center mt-2 gap-2 md:gap-3 lg:gap-1 lg:absolute lg:top-0 lg:translate-x-full lg:right-0 lg:mt-0 lg:pl-2 visible"),a=a[a.length-1];if(!a)return;a.querySelector("#copy-btn")||((r=document.createElement("button")).className="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400",r.innerHTML=E("copy"),r.id="copy-btn",a.prepend(r),r.onclick=function(e){IN_BOUND.copyResponse(e)})}else o.type}).observe(e,{attributes:!0,childList:!0,subtree:!0})},copyResponse(e){e=e.srcElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.innerText;navigator.clipboard.writeText(e).then(this.showNotification(i.SUCCESS,"The response was copied to your clipboard."))},replaceFetch(){window.fetch=(...t)=>{if("https://chat.openai.com/backend-api/conversation"!==t[0])return this.fetch(...t);if(!(this.SelectedPromptTemplate||this.Tone||this.WritingStyle||this.TargetLanguage))return this.fetch(...t);var e=this.SelectedPromptTemplate;this.showContinueActionsButton();try{var r,a,o=t[1],i=JSON.parse(o.body),n=(e&&(r=i.messages[0].content.parts[0],a=(this.TargetLanguage||Ae).replace("*",""),i.messages[0].content.parts[0]=e.Prompt.replaceAll(c,r).replaceAll(d,a)),[]),s="true"===this.companyTonesState?{Description:this.companyToneText}:this.Tone?this.userTones.find(e=>e.ID===this.Tone):null,l=(s&&n.push(`[${s.Description.toLowerCase()}] tone`),this.WritingStyle?this.WritingStyles.find(e=>e.ID===this.WritingStyle):null);return l&&n.push(l.Label.toLowerCase()+" writing style"),!e&&this.TargetLanguage&&n.push(this.TargetLanguage.replace("*","")+" language"),0<n.length&&(i.messages[0].content.parts[0]+=`

Please write in ${n.join(", ")}.`),o.body=JSON.stringify(i),console.log("Submit Prompt:  ",o.body),this.selectPromptTemplateByIndex(null),this.fetch(t[0],o)}catch(e){return console.log("error:::",e),this.fetch(...t)}}},handleElementAdded(e){"headlessui-portal-root"===e.id||"language-select-wrapper"===e.id?this.setupSidebar():(e.querySelector("h1.text-4xl")&&(this.insertPromptTemplatesSection(),(e=document.getElementById("export-button"))&&(e.style="pointer-events: none;opacity: 0.5"),this.insertLanguageToneWritingStyleContinueActions()),document.querySelector(".xl\\:max-w-3xl")&&((e=document.getElementById("export-button"))&&(e.style=""),this.insertLanguageToneWritingStyleContinueActions()),document.querySelector(".whitespace-pre-wrap")&&this.insertSavePromptAsTemplateButton())},insertSavePromptAsTemplateButton(){var e,t=document.querySelector(".flex.flex-col.items-center .whitespace-pre-wrap:not(:has(*))");!t||!(t=t.parentElement.parentElement.querySelector("button"))||(this.showContinueActionsButton(),e=t.parentElement.querySelector(".save-prompt-button"))||((e=document.createElement("button")).className="save-prompt-button p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400 md:invisible md:group-hover:visible",e.title="Save prompt as template",e.addEventListener("click",this.showSavePromptModal.bind(this)),e.innerHTML=E("Save"),t.parentElement.prepend(e))},getActivities(t=O){var e=this.Activities.filter(e=>!t||t===O||e.TopicID===t);return[...new Set(e.map(e=>e.Label))].map(t=>({ID:this.Activities.find(e=>e.Label===t).ID,Label:t}))},validatePrompt(t){var e=[],r=[...this.PromptTemplates,...this.OwnPrompts].find(e=>e.ID===t.ID),a=r&&r.PromptTypeNo!==t.PromptTypeNo;if(this.canCreatePromptTemplate()||r)if(t.PromptTypeNo!==n.PUBLIC||this.canCreatePublicPromptTemplate()||r&&!a){if(t.PromptTypeNo!==n.PRIVATE||this.canCreatePrivatePromptTemplate()||r&&!a)return t.PromptTypeNo!==n.PUBLIC||t.AuthorName.trim()&&t.AuthorURL.trim()||e.push("Please identify with Author Name and URL to publish a prompt template as public."),r=[],t.PromptTypeNo!==n.PUBLIC||t.Prompt.includes(d)||r.push(d),t.Prompt.includes(c)||r.push(c),0<r.length&&e.push(`
          Make sure you follow the Prompt Template guidelines. <br>
          You must use ${r.join(" and ")} correctly. <br><br>
          Learn more <a class="underline" href="https://lrt.li/IN_BOUNDpromptguide" target="_blank" rel="noopener noreferrer">here</a>.
        `),0<e.length&&(a=`
        <div>
          <strong>Please fix the following errors:</strong> <br><br>
          ${e.join("<br><br>")}
        </div>
      `,this.showNotification(i.ERROR,a,!1)),0===e.length;this.cannotCreatePrivatePromptTemplateError()}else this.cannotCreatePublicPromptTemplateError();else this.cannotCreatePromptTemplateError()},async savePromptAsTemplate(e){var t,r,a={};for([t,r]of new FormData(e.target))a[t]=r;a.ID=a.ID||window.crypto.randomUUID()||(new Date).getTime()+Math.random().toString(16).slice(2),a.PromptTypeNo=1,a.pin=!1,a.favourite=!1,a.CreationTime=(new Date).toISOString(),a.PromptTypeNo=a.Public?n.PUBLIC:n.PRIVATE;try{var o=await this.Client.savePrompt(a);this.refreshData(),a.RevisionTime=(new Date).toISOString(),a.ID||this.PromptTopic!==O&&a.Community!==this.PromptTopic||(a.ID=o.ID,this.OwnPrompts.push(a),a.Public&&this.PromptTemplates.push(a))}catch(e){return void this.showNotification(i.ERROR,e instanceof Pe?e.message:"Something went wrong. Please try again.")}this.hideSavePromptModal(),this.showNotification(i.SUCCESS,'Prompt template was saved successfully to "My Prompts".'),this.insertPromptTemplatesSection()},updatePromptsState(t){var e,r;t.Community!==this.PromptTopic&&this.PromptTopic!==O?(this.PromptTemplates=this.PromptTemplates.filter(e=>e.ID!==t.ID),this.OwnPrompts=this.OwnPrompts.filter(e=>e.ID!==t.ID)):(this.OwnPrompts=this.OwnPrompts.map(e=>e.ID===t.ID?t:e),e=this.PromptTemplates.find(e=>e.ID===t.ID),!(r=t.PromptTypeNo===n.PUBLIC)&&e?this.PromptTemplates=this.PromptTemplates.filter(e=>e.ID!==t.ID):r&&!e?this.PromptTemplates.push(t):r&&e&&(this.PromptTemplates=this.PromptTemplates.map(e=>e.ID===t.ID?t:e)))},showNotification(e=i.SUCCESS,t="",r=!0){var a="IN_BOUND-Notification";let o=document.getElementById(a);o||((o=document.createElement("div")).id=a);a={[i.SUCCESS]:"bg-green-500",[i.WARNING]:"bg-orange-500",[i.ERROR]:"bg-red-500"};o.innerHTML=`
      <div style="z-index:999999999999999;" class="fixed flex justify-center w-full top-2 px-2 pointer-events-none">
        <div class="${a[e]} flex flex-row inline-flex pointer-events-auto px-6 py-3 rounded-md text-white" role="alert">
          <div class="flex gap-4">
            <p class="max-w-md">${t}</p>
            <button>${E("Cross")}</button>
          </div>
        </div>
      </div>
    `,o.querySelector("button").addEventListener("click",()=>{o.remove()}),r&&setTimeout(()=>{o.remove()},5e3),document.body.appendChild(o)},hideModal:De,hideSavePromptModal(){this.hideModal("savePromptModal")},showReportPromptModal(e){Ne(e,this.PromptTemplatesType,this.PromptTemplates,this.reportPrompt.bind(this))},async showSavePromptModal(e,t,r){let a="";var o=e&&e.type===Ue;let i={},n=!1,s=(e&&e.type!==Ue&&(e.target.closest("button"),i=this.DefaultPromptTemplates.filter(e=>e.ID===this.activePromptID)[0]||this.OwnPrompts.filter(e=>e.ID===this.activePromptID)[0])&&(a=i.Prompt,n=!0),document.getElementById("savePromptModal"));s||((s=document.createElement("div")).id="savePromptModal",s.addEventListener("submit",e=>{e.preventDefault(),"savePromptAsTemplate"===e.submitter.name?this.savePromptAsTemplate(e):this.saveAsNewPromptTemplate(e)}),document.body.appendChild(s)),s.innerHTML=`
      <div style="z-index:1000;" class="fixed inset-0 text-center transition-opacity w-full ">
        <div class="absolute bg-gray-900 inset-0 opacity-90">
        </div>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex items-center justify-center min-h-full">
            <form id="savePromptForm">
              <input type="hidden" name="ID" ${t?`value="${t}"`:""}  />
              
              <div
              class="align-center bg-white dark:bg-gray-800 dark:text-gray-200 inline-block overflow-hidden sm:rounded-lg shadow-xl sm:align-middle  sm:my-8  text-left transform transition-all"
              role="dialog" aria-modal="true" aria-labelledby="modal-headline" style="text-align: left;">
          
                <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-y-auto">
                <label>${$.inputform.title.label}</label>
                  <input name="Title" type="text" ${n?`value="${M(i.Title)}"`:""}
                    title="${$.inputform.title.placeholder}" required placeholder="${$.inputform.title.placeholder}" class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded mb-3 mt-2 p-2 w-full" />
            

                    <label>${$.inputform.teaser.label}</label>
                  <textarea name="Teaser" required
                    title="${$.inputform.teaser.placeholder}'"
                    class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded p-2 mt-2 mb-3" style="height: 71px;"
                    placeholder="${$.inputform.teaser.placeholder}"> ${n?`value="${M(i.Teaser)}"`:""}</textarea>
                    
                  <label>${$.inputform.promptHint.label}</label>
                  <input name="PromptHint" required type="text"  ${n?`value="${M(i.PromptHint)}"`:""}
                    title="${$.inputform.promptHint.placeholder}"
                    class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded p-2 mt-2 mb-3" placeholder="${$.inputform.promptHint.placeholder}" />

                  <label>${$.inputform.promptTemplate.label}</label>
                  <textarea name="Prompt" class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded p-2 mt-2 mb-3" style="height: 120px;" required
                            placeholder="${$.inputform.promptTemplate.placeholer}"
                            title="${$.inputform.promptTemplate.placeholer}">${M(a)}</textarea>
            
                  
                  
                  <div class="flex" >
                    <div class="w-full mr-2">
                      <label>${$.inputform.activity}</label>
                      <input type="text" list="tagsList" name="Tags" id="Category" multiple 
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
                                <option  value="${M(e.ID)}">${M(e.Label)}</option>`).join("")}
                        </select>`:"<p  py-2 px-2 mt-6>None Defined</p>"}

                        <label class="text-sm">
                        <input name="companyTonesState" type="checkbox" class="mx-4 dark:bg-gray-700"> 
                        Apply overall company tone
                      </label>
                        
                        </div>

                        <a style="padding-top: 4%;padding-left: 10px;" title="Goto setting and click on My Variations to Manage Variations.">${E("info")}</a>

                        
                      


                </div>
                </div>

                  

                 ${o?"":`<div class="block mx-6 mt-4">
                    <label class="text-sm">
                      <input name="Public" value="true" type="checkbox" class="mx-4 dark:bg-gray-700"> 
                      ${$.inputform.share}
                    </label>
                    
                    
            
                  <p class="mt-6 mx-4 text-[10px]">${$.inputform.agreeText}</p>
                </div>`}
            
                <div class=" px-4 py-3 text-right">
                ${!0===o?`<button type="submit" name="saveAsNewPromptTemplate" class="bg-gray-600 hover:bg-gray-400 mr-2 px-4 py-2 mt-2 rounded text-white"
                          > ${$.inputform.saveAsNew}
                  </button>`:""}
                  <button type="button" class="bg-gray-600 hover:bg-gray-400 mr-2 px-4 py-2 mt-2 rounded text-white"
                          onclick="IN_BOUND.hideSavePromptModal()"> ${$.inputform.cancel}
                  </button>
                  <button type="submit" name="savePromptAsTemplate" class="bg-orange-500 hover:bg-orange-500/10 mr-2 px-4 py-2 mt-2 rounded text-white">${$.inputform.save}
                  </button>
                </div>
            
              </div>
            </form>
          </div>
        </div>
        
      </div>
    `,s.style="display: block;",document.addEventListener("keydown",e=>{"Escape"===e.key&&this.hideSavePromptModal()})},addNewEmptyTone(){var e=[{ID:(new Date).getTime()+Math.random().toString(16).slice(2),Label:"My New Variation",Description:"My Variation Detail"}];this.userTones=[...e,...this.userTones],this.showSettingModal()},async deleteToneFromSetting(e){await this.Client.deleteTone(e),this.refreshActions(),this.showNotification(i.SUCCESS,"Tone was deleted!")},async showSettingModal(){let e=document.getElementById("settingModal");e||((e=document.createElement("div")).id="settingModal",document.body.appendChild(e)),e.innerHTML=`
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
                  onclick="IN_BOUND.hideModal('settingModal')"  >  ${E("Cross-Round")}</a>
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
                  <label>Extension Language</label>
                  <select id="languageExtSelect" name="Community" class="mt-2 mb-3 text-gray-500 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-900 rounded w-full" required>
                  ${Object.keys(Oe).map(e=>`<option   value="${e}" ${this.ExtLang===e?"selected":""}>${e.charAt(0).toUpperCase()+e.slice(1)}</option>`).join("")}
                  </select>

                  


                </div>`:""}

                
                ${"tones"===this.settingsActiveTab?`

                    <div class="flex justify-between items-center text-center ">
                        <h3>Variations</h3>
                        <div class="flex text-center row">
                        
                        <a  class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                              onclick="IN_BOUND.importToneinSetting()"> ${E("import-h5")} <input id="dropzone-file589325" type="file" accept=".json" class="hidden" /> </a>

                        <a  class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                             onclick="IN_BOUND.addNewEmptyTone()"> ${E("add-5")}  </a>

                              </div>
                    </div>
                       ${this.userTones.map(e=>`<div class="  ">
                       <div class="flex items-center  justify-between m-2 bg-gray-50 dark:bg-white/5 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900 border shadow border-gray-300 dark:border-gray-700 hover:shadow-lg transition duration-300 ease-in-out tw-border-2 tw-border-blue-500 tw-rounded-xl">
                          <div> <p>${e.Label}</p> </div>
                          <div class="flex gap-1 justify-end items-start"> 

                              <a title="Copy variation" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                              onclick="IN_BOUND.copyToneFromSetting('${e.ID}')"> ${E("copy")}  </a>

                              <a title="Download variation" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                              onclick="IN_BOUND.exportToneFromSetting('${e.ID}')"> ${E("export")}  </a>
                            
                            
                              <a title="Edit variation" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                              onclick="${IN_BOUND.editActivatedTonesInSetting!==e.ID?`IN_BOUND.editActivatedTonesInSetting = '${e.ID}'; IN_BOUND.showSettingModal();`:"IN_BOUND.editActivatedTonesInSetting = ''; IN_BOUND.showSettingModal()"}"> ${IN_BOUND.editActivatedTonesInSetting===e.ID?E("EditOrange"):E("Edit")}  </a>
                            
                              <a title="Delete variation" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                              onclick="IN_BOUND.deleteToneFromSetting('${e.ID}')"> ${E("Cross")}  </a>
                          
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
                          onclick="IN_BOUND.forkActivatedTonesInSetting('${e.ID}'); IN_BOUND.showSettingModal();"> ${E("fork")}  </a>
                        
                      
                          </div> 
                    </div>
                    `).join("")}
                    
            `:""}


              </div>
            </div>
          <div>
        </div>
  `,e.style="display: block;",e?.querySelector("#languageExtSelect")?.addEventListener("change",this.changeExtLanguage.bind(this));var t=e.querySelectorAll("#saveToneForm");for(let e=0;e<t.length;e++)t[e]?.addEventListener("submit",async function(e){e.preventDefault();e={ID:e.target[0].value,Label:e.target[1].value,Description:e.target[2].value},IN_BOUND.showNotification(i.SUCCESS,"Sync.."),IN_BOUND.editActivatedTonesInSetting="",e={id:e.ID,label:e.Label,prompt:e.Description,user:IN_BOUND.Client.User.Email,company:IN_BOUND.Company};await IN_BOUND.Client.saveEditTone(e),IN_BOUND.refreshActions(),IN_BOUND.showNotification(i.SUCCESS,"Tone changes was saved!"),IN_BOUND.showSettingModal()});e?.querySelector("#companyToneState")?.addEventListener("click",this.changeCompanyToneState.bind(this)),document.addEventListener("keydown",e=>{"Escape"===e.key&&this.hideModal("settingModal")})},async forkActivatedTonesInSetting(t){var e=this.companyTones.filter(e=>e.ID===t)[0],r=Math.random().toString(36).substring(2)+"-"+(new Date).getTime().toString(36);e.ID=window.crypto?.randomUUID()||r,e&&(r={id:e.ID,label:"Copy of: "+e.Label,prompt:e.Description,user:IN_BOUND.Client.User.Email,company:IN_BOUND.Company},await IN_BOUND.Client.saveEditTone(r),await IN_BOUND.refreshActions(),this.showSettingModal(),IN_BOUND.showNotification(i.SUCCESS,"Variation added!"))},exportToneFromSetting(t){var e=this.userTones.filter(e=>e.ID===t)[0],r=Math.random().toString(36).substring(2)+"-"+(new Date).getTime().toString(36);e.ID=window.crypto?.randomUUID()||r,e&&(r={id:e.ID,label:e.Label,prompt:e.Description,user:IN_BOUND.Client.User.Email,company:IN_BOUND.Company},this.exportContent(r,r.label),IN_BOUND.showNotification(i.SUCCESS,"Variation downloaded!"))},copyToneFromSetting(t){var e=this.userTones.filter(e=>e.ID===t)[0];e&&(this.copyTextClipboard(e.Description),IN_BOUND.showNotification(i.SUCCESS,"Variation copied!"))},importToneinSetting(){var e=document.getElementById("dropzone-file589325");e.click(),e.onchange=e=>{var e=e.target.files,r=new FileReader;r.onload=async function(){var e=r.result,e=JSON.parse(e),t=Math.random().toString(36).substring(2)+"-"+(new Date).getTime().toString(36);e.id=window.crypto?.randomUUID()||t,e&&(e.id,e.label,e.prompt,e.prompt?(await IN_BOUND.Client.saveEditTone(e),IN_BOUND.showNotification(i.SUCCESS,"Variation added!"),await IN_BOUND.refreshActions(),IN_BOUND.showSettingModal()):IN_BOUND.showNotification(i.SUCCESS,"Invalid Variation!"))},r.readAsText(e[0])}},changeWebAccess(){this.WebAccess=!this.WebAccess,window.localStorage.setItem("WebAccess","true"),this.showSettingModal()},async showVariablesModal(e){e=e.Prompt.split("{{").map(e=>-1<e.indexOf("}}")?e.split("}}")[0]:"").filter(e=>""!==e);let t=document.getElementById("variablesModal");t||((t=document.createElement("div")).id="variablesModal",t.addEventListener("submit",function(e){e.preventDefault(),IN_BOUND.addVariablesToPrompt(e)}),document.body.appendChild(t)),t.innerHTML=`
      <div style="z-index:1000;" class="fixed inset-0 text-center transition-opacity ">
        <div class="absolute bg-gray-900 inset-0 opacity-90">
        </div>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex items-center justify-center min-h-full">
            <form id="saveVariableForm">
              
              <div
              class="align-center px-6 py-4 bg-white dark:bg-gray-800 dark:text-gray-200 inline-block overflow-hidden sm:rounded-lg shadow-xl sm:align-middle sm:max-w-lg sm:my-8 sm:w-full text-left transform transition-all"
              role="dialog" aria-modal="true" aria-labelledby="modal-headline" style="text-align: left;">
          
                ${e.map(e=>`
                  <label>${e}</label>
                  <textarea name="{{${e}}}" class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded p-2 mt-2 mb-3" style="height: 120px;" required
                            placeholder="Add ${e}"
                            title="Add ${e}"></textarea>
                  `).join("")}
            
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
    `,0<e.length?t.style="display: block;":t.style="display: none;",document.addEventListener("keydown",e=>{"Escape"===e.key&&this.hideModal("variablesModal")})},async addVariablesToPrompt(e){var t,r,e=new FormData(e.target);let a=this.SelectedPromptTemplate.Prompt;for([t,r]of e)"{{WebSearch}}"===t?(this.webResults=[],this.Client.getDdgResults(r)):"{{WebNews}}"===t?(this.webResults=[],this.Client.getGoogleNewsResults(r)):a=a.replace(t,r);this.SelectedPromptTemplate={...this.SelectedPromptTemplate,Prompt:a},this.hideModal("variablesModal")},changeCompanyToneState(e){this.companyTonesState=e.target.checked,window.localStorage.setItem("companyTonesState",this.companyTonesState),this.refreshActions()},addExportButton(){var e,t,r=document.querySelector("nav");r&&!r.querySelector("#export-button")&&((e=document.createElement("a")).id="export-button",e.className=D`ExportButton`,e.innerHTML=E`Export`+" Export Conversation",e.onclick=this.exportCurrentChat.bind(this),document.querySelector(".flex-1.overflow-hidden h1")&&(e.style="pointer-events: none;opacity: 0.5"),t=[...r.children].find(e=>e.innerText.includes("Log out")),r.insertBefore(e,t))},getNewChatButtons(){var e=document.querySelector("nav"),t=document.querySelector(".sticky");return[[...e?.querySelectorAll(".cursor-pointer")??[]].find(e=>"New chat"===e.innerText),t?.querySelector("button.px-3")].filter(e=>e)},copyPromptClipboard(t){setTimeout(function(){var e=IN_BOUND.current_active_prompts.filter(e=>e.promptID===t)[0].Prompt;navigator.clipboard.writeText(e).then(()=>{IN_BOUND.showNotification(i.SUCCESS,"The prompt template was copied to your clipboard.")},()=>{IN_BOUND.showNotification(i.ERROR,"Something went wrong. Please try again.")})},100)},copyTextClipboard(e){navigator.clipboard.writeText(e).then()},filterPromptTemplates(e){return e.filter(e=>!this.PromptSearch||e.Teaser.toLowerCase().includes(this.PromptSearch.toLowerCase())||e.Title.toLowerCase().includes(this.PromptSearch.toLowerCase())||e.Tags.toLowerCase().includes(this.PromptSearch.replace("#","").toLowerCase()))},showLoadingInterface(e){this.getTheme(),console.log("Theme 1:"+this.themeMode,"Theme 2:"+this.Theme);e=`
    <div id="custom__ripple_Loader" class="box">
        <div class="ripple__rounds">
        ${"dark"===this.Theme?E("no-txt-logo-dark"):E("no-txt-logo-light")}
        <p class="loading-text">${e}</p>
        </div>
        
    </div>

    `;let t=document.createElement("div");t.id="templates-wrapper",t.className="mt-2 md:flex items-start text-center gap-2.5 md:max-w-2xl lg:max-w-3xl m-auto text-sm";var r=document.getElementById("sideBarWrapper").querySelector("nav");r.querySelector("#templates-wrapper")?t=r.querySelector("#templates-wrapper"):r.appendChild(t),t.innerHTML=e},hideLoadingInterface(){document.getElementById("sideBarWrapper").querySelector("nav").querySelector(".box").classList.add("not-show")},checkLoader(){this.isLoading?this.showLoadingInterface():(this.hideLoadingInterface(),this.insertPromptTemplatesSection())},insertPromptTemplatesSection(){let i=this.PromptTemplates;if(i){i=(i=this.PromptTemplatesType===p.OWN?this.OwnPrompts:i).map((e,t)=>({...e,promptID:e.ID,ID:t,pin:void 0!==e.pin&&e.pin,favourite:void 0!==e.favourite&&e.favourite}));var n=(i=this.filterPromptTemplates(i)).filter(e=>!0===e.pin),s=i.filter(e=>!1===e.pin),{currentPage:n,pageSize:s}=(i=[...n,...s],i="All"===this.feedSelected?i:i.filter(e=>!0===e.favourite)||[],this.PromptTemplateSection),l=s*n,s=Math.min(s*(n+1),i.length);let e=i.slice(l,s),r=[],a=window.localStorage.getItem("promptCardOrder")?.split(","),o=e.slice();n=this.PromptTemplatesType===p.OWN;if(a&&n){for(let t=0;t<a.length;t++){var c=o.filter(e=>e.promptID===a[t])[0];c&&(r.push(c),o=o.filter(e=>e.promptID!==a[t]))}0<o.length&&(r=[...o,...r]),e=r}n=(this.current_active_prompts=e).map(e=>"#"+e.Tags),n=(this.searchPredictionList=Array.from(new Set(n)),`
    
    <div class="flex flex-1 gap-3.5 justify-between items-center sm:flex-col ">
    <span class="${D`paginationText`}">
        Showing <span class="${D`paginationNumber`}">${1+l}</span> to <span class="${D`paginationNumber`}">${s}</span> of <span class="${D`paginationNumber`}">${i.length} Prompts</span>
      </span>

      <div class="${D`paginationButtonGroup`}">
        <button onclick="IN_BOUND.prevPromptTemplatesPage()" class="${D`paginationButton`}" style="border-radius: 6px 0 0 6px">${E`previous`}</button>
        <button onclick="IN_BOUND.nextPromptTemplatesPage()" class="${D`paginationButton`} border-0 border-l border-gray-500" style="border-radius: 0 6px 6px 0">${E`next`}</button>
      </div>
    </div>
  `),l=`
    <div class="${D`column`} relative">

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
        ${"dark"===this.Theme?this.companyMeta.light_logo?`<img src='${this.companyMeta.light_logo}' class="logo-bg" />`:E("Logo-light"):this.companyMeta.dark_logo?`<img src='${this.companyMeta.dark_logo}' class="logo-bg" />`:E("Logo-dark")}
        </div>
        <div  class="flex gap-1 justify-end items-start" >
        
        <div>
          <input list="prediction" id="promptSearchInput" type="text" class="bg-gray-100 border-0 text-sm rounded block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0 md:w-full" placeholder="${$.search}" 
          value="${M(this.PromptSearch)}" onfocus="this.value = this.value">
            <datalist id="prediction">
            ${this.searchPredictionList.map(e=>`<option style="font-size:small; padding:0;" value="${e}"></option>`).join("")}
            </datalist>
        </div>

        </div>
      </div>
      


  
      <div class="flex flex-1 gap-3.5 justify-between items-center  ">
      <div class="flex flex-1 gap-3.5 justify-between  ">

        <div class="flex flex-1 gap-3.5 justify-start items-start sm:flex-col ">
      
      ${this.import?"":` <div>
          <select id="promptTypeSelect" class="bg-gray-100 pr-7 border-0 text-xs rounded block w-full dark:bg-gray-600 dark:border-gray-600 dark:hover:bg-gray-700 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0">
            
          <option class="mx-1 dark:bg-gray-700 dark:text-white"  value="${p.PUBLIC}" ${this.PromptTemplatesType===p.PUBLIC?"selected":""}>${$.tabsLabel[0]}</option>

          <option class="mx-1 dark:bg-gray-700 dark:text-white"  value="${p.OWN}" ${this.PromptTemplatesType===p.OWN?"selected":""}>${$.tabsLabel[1]}</option>
            
          </select>
        </div>`}

        
        

      </div>

      <div class="flex gap-1 justify-end items-start">

      <a title="Reload All Data" class="p-1 rounded-md hover:bg-gray-100 cursor-pointer hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
        onclick="IN_BOUND.reloadAllData()">${E("reload")}</a>
      
      <a title="${$.titleOnTopIcons[0]}" class="p-1 rounded-md hover:bg-gray-100 cursor-pointer hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
        onclick="IN_BOUND.showSettingModal()">${E("setting")}</a>
        
        <a title="${$.titleOnTopIcons[1]}" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
        onclick="IN_BOUND.showSavePromptModal()">${E("add")}</a>

        <a title="${$.titleOnTopIcons[2]}" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
        onclick="IN_BOUND.clickeFileInput()">${this.import?E("import-yellow"):E("import")} <input id="dropzone-file589" type="file" accept=".json" class="hidden" /></a>

        ${this.import?"":`<a title="${$.titleOnTopIcons[5]}" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="IN_BOUND.changeFeedSelect('${"All"===this.feedSelected?"Favourites":"All"}')">
        ${"All"===this.feedSelected?E`star-gray`:E`star-yellow`} </a>`}
  
        <a title="${$.titleOnTopIcons[3]}" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="IN_BOUND.changeFeedView('list')">
        ${"list"===this.feedView?E`list-yellow`:E`list`} </a>
  
        <a title="${$.titleOnTopIcons[4]}" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="IN_BOUND.changeFeedView('grid')">
        ${"grid"===this.feedView?E`grid-yellow`:E`grid`} </a>

      </div>

      </div>
      </div>

<div class="flex flex-1 gap-3.5 justify-between items-center sm:flex-col ">
        
      

    </div>

      ${i.length,this.PromptTemplateSection.pageSize,""}
      
      <ul class="${D`ul`} grid grid-cols-1 lg:grid-cols-1 ">
        ${("list"===this.feedView?e.map(e=>`
          <button onclick="IN_BOUND.selectPromptTemplateByIndex(${e.ID})" data-id="${e.promptID}" class="${D`card`} relative group  ">
            <div class="flex items-center w-full justify-between">

            <div class="text-gray-500 text-xs flex  max-w-full">
             
              ${e.AuthorURL&&e.AuthorName?`
                    <a href="#" class="mx-1 overflow-hidden text-ellipsis flex-1"
                      style="white-space: nowrap;"
                      onclick="event.stopPropagation()"
                      rel="noopener noreferrer" 
                      title="${$.authorTitle} ${M(e.AuthorName)} - ${M(e.AuthorURL)}">
                      ${M(e.AuthorName).slice(0,15)}
                    </a>`:""}            
              · 
              <span title="${$.timeTitle} ${function(e){e=new Date(e);return e&&"Invalid Date"!=e?e.toISOString().split("T")[0]+" "+e.toTimeString().split(" ")[0]:""}(e.RevisionTime)}" class="mx-1">${function(e){e=new Date(e);if(!e||"Invalid Date"==e)return"";var t=new Date,r=Math.max(0,t-e),a=[{name:"year",value:31556952e3},{name:"month",value:2629746e3},{name:"week",value:6048e5},{name:"day",value:864e5},{name:"hour",value:36e5},{name:"minute",value:6e4},{name:"second",value:1e3}];for(let e=0;e<a.length;e++){var o,i=a[e];if(r>=i.value)return(o=Math.floor(r/i.value))+` ${1<o?i.name+"s":i.name} ago`}return"just now"}(e.RevisionTime)}</span>

            </div>
              
            ${this.access.cardMenuInDots?`<div class="flex gap-4 justify-center lg:gap-1 lg:pl-2 mt-1 right-2 text-gray-400   group-hover:visible">
               <a title="Show Options" id="PromptCardOptionsBtn" onclick="IN_BOUND.toogleOptionsVisibility('PromptCardOptions-${e.ID}')" class=" p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" >${E("horizontal-menu")}</a>
            </div>`:""}

            <div class="${this.access.cardMenuInDots?"hidden absolute right-9 rounded border bg-white dark:bg-gray-800  dark:border-bg-ray-700":"flex right-1"} gap-4 justify-center lg:gap-1 lg:pl-2 mt-1 text-gray-600 group-hover:visible " ${this.access.cardMenuInDots?`onmouseleave="IN_BOUND.hideOptionsVisibility('PromptCardOptions-${e.ID}')"`:""} id="PromptCardOptions-${e.ID}">

                ${this.PromptTemplatesType!==p.PUBLIC||e.OwnPrompt?`<a title="${e.favourite?$.cardIconsTitle[1]:$.cardIconsTitle[0]}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.${e.favourite?"voteThumbsDown":"voteThumbsUp"}('${e.promptID}')">${E(e.favourite?"star-yellow":"star-gray")}</a>

                      `+(this.import?"":`<a title="${e.pin?$.cardIconsTitle[5]:$.cardIconsTitle[4]}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.${e.pin?"removePin":"addToPin"}('${e.promptID}')">${E(e.pin?"pin-yellow":"pin-gray")}</a>
                      
                      <a title="${$.cardIconsTitle[6]}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.exportPromptTemplate('${e.promptID}')">${E("export")}</a>

                      <a title="Drag" class=" PromptCardSelector p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                      >${E("drag-hand")}</a>

                      

                      
                    
                    `):`
                    ${this.import?"":`<a title="${e.favourite?$.cardIconsTitle[1]:$.cardIconsTitle[0]}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.${e.favourite?"voteThumbsDown":"voteThumbsUp"}('${e.promptID}')">${E(e.favourite?"star-yellow":"star-gray")}</a>`}

                      <a title="${this.forkPromptTemplates.includes(e.promptID)?$.cardIconsTitle[3]:$.cardIconsTitle[2]}" class="p-1 ${this.forkPromptTemplates.includes(e.promptID)?"cursor-not-allowed":""} rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                      onclick=" ${this.forkPromptTemplates.includes(e.promptID)?"":`IN_BOUND.forkPrompt('${e.promptID}')`}"> ${this.forkPromptTemplates.includes(e.promptID)?E("fork-yellow"):E("fork")}</a>

                      

                      ${this.import?"":`<a title="${e.pin?$.cardIconsTitle[5]:$.cardIconsTitle[4]}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.${e.pin?"removePin":"addToPin"}('${e.promptID}')">${E(e.pin?"pin-yellow":"pin-gray")}</a>
                      
                      
                    `}

                      
                  
                    `}
                
                ${this.PromptTemplatesType===p.OWN||e.OwnPrompt||this.isAdminMode()?`

                    <a title="Copy Prompt" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                    onclick="event.stopPropagation(); IN_BOUND.copyPromptClipboard('${e.promptID}')">${E("copy")}</a>

                  <a title="${$.editPrmptTitle}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.editPromptTemplate(${e.ID})">${E("Edit")}</a>
                  <a title="${$.dltPrmptTitle}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.deletePromptTemplate(${e.ID})">${E("Cross")}</a>

                  
                  `:""}
              </div>
            </div>      

            <h4 class="${D`h3`}" style="overflow-wrap: anywhere;">${M(e.Title)}</h4>
            
            <p class="${D`p`} text-gray-600 dark:text-gray-200 overflow-hidden text-ellipsis" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;"
              title="${M(e.Teaser)}">
              ${M(e.Teaser)}
            </p>

            

        </button>
      `):e.map(e=>`
          <button onclick="IN_BOUND.selectPromptTemplateByIndex(${e.ID})" class="${D`card`} relative group "  data-id="${e.promptID}"  >
            <div  class="flex items-start w-full justify-between">
              <h4 class="${D`h3`}" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${M(e.Title)}</h4>

            ${this.access.cardMenuInDots?`<div class="flex gap-4 justify-center lg:gap-1 lg:pl-2 mt-1 right-2 text-gray-400   group-hover:visible">
            <a title="Show Options" id="PromptCardOptionsBtn" onclick="IN_BOUND.toogleOptionsVisibility('PromptCardOptions-${e.ID}')" class=" p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" >${E("horizontal-menu")}</a>
            </div>`:""}

            <div class="${this.access.cardMenuInDots?"hidden absolute right-9 rounded border bg-white dark:bg-gray-800  dark:border-bg-ray-700":"flex right-1"} gap-4 justify-center lg:gap-1 lg:pl-2 mt-1 text-gray-600 group-hover:visible " ${this.access.cardMenuInDots?`onmouseleave="IN_BOUND.hideOptionsVisibility('PromptCardOptions-${e.ID}')"`:""} id="PromptCardOptions-${e.ID}">

                ${this.PromptTemplatesType!==p.PUBLIC||e.OwnPrompt?`<a title="${e.favourite?$.cardIconsTitle[1]:$.cardIconsTitle[0]}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.${e.favourite?"voteThumbsDown":"voteThumbsUp"}('${e.promptID}')">${E(e.favourite?"star-yellow":"star-gray")}</a>

                    <a title="${$.cardIconsTitle[6]}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.exportPromptTemplate('${e.promptID}')">${E("export")}</a>

                    <a title="${e.pin?$.cardIconsTitle[5]:$.cardIconsTitle[4]}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.${e.pin?"removePin":"addToPin"}('${e.promptID}')">${E(e.pin?"pin-yellow":"pin-gray")}</a>
                    
                    
                    
                    `:`
                      <a title="${e.favourite?$.cardIconsTitle[1]:$.cardIconsTitle[0]}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.${e.favourite?"voteThumbsDown":"voteThumbsUp"}('${e.promptID}')">${E(e.favourite?"star-yellow":"star-gray")}</a>

                      <a title="${this.forkPromptTemplates.includes(e.promptID)?$.cardIconsTitle[3]:$.cardIconsTitle[2]}" class="p-1 ${this.forkPromptTemplates.includes(e.promptID)?"cursor-not-allowed":""} rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                      onclick=" ${this.forkPromptTemplates.includes(e.promptID)?"":`IN_BOUND.forkPrompt('${e.promptID}')`}"> ${this.forkPromptTemplates.includes(e.promptID)?E("fork-yellow"):E("fork")}</a>

                      

                      <a title="${e.pin?$.cardIconsTitle[5]:$.cardIconsTitle[4]}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.${e.pin?"removePin":"addToPin"}('${e.promptID}')">${E(e.pin?"pin-yellow":"pin-gray")}</a>
                      
                  
                    `}
                
                ${this.PromptTemplatesType===p.OWN||e.OwnPrompt||this.isAdminMode()?`

                    <a title="Copy Prompt" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                    onclick="event.stopPropagation(); IN_BOUND.copyPromptClipboard('${e.promptID}')">${E("copy")}</a>

                  <a title="${$.editPrmptTitle}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.editPromptTemplate(${e.ID})">${E("Edit")}</a>
                  <a title="${$.dltPrmptTitle}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.deletePromptTemplate(${e.ID})">${E("Cross")}</a>
                  `:""}
              </div>
            </div>      

            <div class="-mt-0.5 text-gray-500 text-xs pb-1 max-w-full">
              
            </div>

        </button>
      `)).join("")}
            
        
      </ul>
    
      ${i.length>this.PromptTemplateSection.pageSize?n:""}
      
    </div>
   `;let t=document.createElement("div");t.id="templates-wrapper",t.className="mt-2 md:flex items-start text-center gap-2.5 md:max-w-2xl lg:max-w-3xl m-auto text-sm";s=document.getElementById("sideBarWrapper").querySelector("nav"),n=(s.querySelector("#templates-wrapper")?t=s.querySelector("#templates-wrapper"):s.appendChild(t),t.innerHTML=l,t?.querySelector("#promptTypeSelect")?.addEventListener("change",this.changePromptTemplatesType.bind(this)),t?.querySelector("#promptSearchInput")?.addEventListener("input",this.debounce(this.changePromptSearch.bind(this),1e3).bind(this)),t?.querySelectorAll("select.pageSizeSelect"));document.removeEventListener("keydown",this.boundHandleArrowKey),0<n.length&&(n.forEach(e=>{e.addEventListener("change",this.changePromptPageSize.bind(this))}),document.addEventListener("keydown",this.boundHandleArrowKey))}},toogleOptionsVisibility(e){e=document.getElementById(e);e.className.split(" ").includes("hidden")?e.className=e.className.replace("hidden ","flex "):e.className=e.className.replace("flex ","hidden ")},hideOptionsVisibility(t){setTimeout(function(){var e=document.getElementById(t);e.className=e.className.replace("flex ","hidden ")},500)},dragPromptIDOrder(e,t){let r=window.localStorage.getItem("promptCardOrder")?.split(",");var a,o;r?(o=this.OwnPrompts.map(e=>e.ID).filter(function(e){return-1===r.indexOf(e)}),o=(r=[...o,...r]).indexOf(e),a=r.indexOf(t),r.splice(o,1),r.splice(a,0,e),window.localStorage.setItem("promptCardOrder",r)):(o=this.OwnPrompts.map(e=>e.ID),window.localStorage.setItem("promptCardOrder",o),this.dragPromptIDOrder(e,t))},dragSortPromptsList(){},clickeFileInput(){var e=document.getElementById("dropzone-file589");e.click(),e.onchange=e=>{var e=e.target.files,t=new FileReader;t.onload=function(){var e=t.result,e=JSON.parse(e);IN_BOUND.saveImportedPrompt(e)},t.readAsText(e[0])}},async saveImportedPrompt(e){""===e.Prompt||void 0===e.Prompt?IN_BOUND.showNotification(i.ERROR,"Invalid Prompt!"):(e.AuthorName=this.Client.User.Name,e.AuthorURL=this.Client.User.Email,e.ID=window.crypto.randomUUID()||(new Date).getTime()+Math.random().toString(16).slice(2),e.CreationTime="",e.RevisionTime="",e.PromptTypeNo=1,e.pin=!1,e.favourite=!1,e.Title="Copy via Import: "+e.Title,this.showNotification(i.SUCCESS,"Sync.."),await this.Client.savePrompt(e),this.showNotification(i.SUCCESS,"Prompt imported!"),this.refreshData())},exportPromptTemplate(t){var e={...this.DefaultPromptTemplates.filter(e=>e.ID===t)[0]||this.OwnPrompts.filter(e=>e.ID===t)[0]};delete e.AuthorName,delete e.AuthorURL,delete e.User,e.forkID=e.ID,e.CreationTime="",e.RevisionTime="",e.ID="",this.exportContent(e,e.Title.slice(0,20))},exportContent(e,t){var e=new Blob([JSON.stringify(e)],{type:"text/plain"}),r=document.createElement("a");r.href=URL.createObjectURL(e),r.download=t+".json",document.body.appendChild(r),r.click()},showImport(){this.showNotification(i.SUCCESS,this.import?"Going back to prompts...":"Getting import prompt templates..."),this.import=!this.import,this.refreshData()},async saveAsNewPromptTemplate(e){var t,r,a={};for([t,r]of new FormData(e.target))a[t]=r;a.AuthorName=this.Client.User.Name,a.AuthorURL=this.Client.User.Email,a.forkID=a.ID,a.ID=window.crypto.randomUUID()||(new Date).getTime()+Math.random().toString(16).slice(2),a.CreationTime="",a.RevisionTime="",a.PromptTypeNo=1,a.pin=!1,a.favourite=!1,this.showNotification(i.SUCCESS,"Sync.."),await this.Client.savePrompt(a),this.showNotification(i.SUCCESS,"Prompt saved as new template!"),this.hideSavePromptModal(),this.refreshData()},async forkPrompt(t){var e=this.PromptTemplates.filter(e=>e.ID===t)[0];e.AuthorName=this.Client.User.Name,e.AuthorURL=this.Client.User.Email,e.Title="Copy of: "+e.Title,e.forkID=e.ID,e.ID=window.crypto.randomUUID()||(new Date).getTime()+Math.random().toString(16).slice(2),e.CreationTime=(new Date).toISOString(),e.RevisionTime=(new Date).toISOString(),e.PromptTypeNo=1,this.showNotification(i.SUCCESS,"Sync.."),await this.Client.savePrompt(e),this.showNotification(i.SUCCESS,"Prompt saved to My Prompts!"),this.refreshData()},async removePin(e){this.showNotification(i.SUCCESS,"Sync.."),await this.pinActionForPrompt(e,-1),this.showNotification(i.SUCCESS,"Prompt removed from pin!"),this.refreshData()},async addToPin(e){3<this.PinPromptTemplates.length?this.showNotification(i.ERROR,"You cannot pin more than 4 prompts!"):(this.showNotification(i.SUCCESS,"Sync.."),await this.pinActionForPrompt(e,1),this.showNotification(i.SUCCESS,"Prompt added to pin!"),this.refreshData())},changeExtLanguage(e){this.ExtLang=e.target.value,$=Oe[e.target.value],this.insertPromptTemplatesSection(),this.insertLanguageToneWritingStyleContinueActions()},changeFeedSelect(e){this.feedSelected=e,this.insertPromptTemplatesSection()},changeFeedView(e){this.feedView=e,window.localStorage.setItem("feedView",e),this.insertPromptTemplatesSection()},boundHandleArrowKey:null,handleArrowKey(e){var t="ArrowLeft"===e.key||"ArrowRight"===e.key,r="INPUT"===e.target.tagName||"TEXTAREA"===e.target.tagName;t&&!r&&("ArrowLeft"===e.key?this.prevPromptTemplatesPage():this.nextPromptTemplatesPage())},changePromptPageSize(e){e=+e.target.value,e=Be.includes(e)?e:30;localStorage.setItem("lastPageSize",e),this.PromptTemplateSection.currentPage=0,this.PromptTemplateSection.pageSize=e,this.insertPromptTemplatesSection()},changePromptSearch(e){this.PromptSearch=e.target.value,this.PromptTemplateSection.currentPage=0,this.insertPromptTemplatesSection();e=document.querySelector("#promptSearchInput");e.selectionStart=e.selectionEnd=e.value.length,e.focus()},changePromptTemplatesType(e){e=e.target.value;this.PromptTemplatesType!==e&&(this.PromptTemplatesType=e,this.PromptTemplateSection.currentPage=0,this.insertPromptTemplatesSection())},debounce(t,r){let a;return e=>{clearTimeout(a),a=setTimeout(()=>t(e),r)}},showToneOptions(){var e,t,r;document.getElementsByClassName("tonesList")[0]?((e=document.getElementsByClassName("tonesList")[0]).style.display="flex",t=document.getElementById("optionOpener").getBoundingClientRect(),e.style.left=t.right+"px"):((e=document.createElement("div")).classList.add("chatgpt-all-in-one-toolbar2","gap-3","tonesList"),e.style.overflow="hidden",(t=document.createElement("div")).classList.add("tones-list-container"),t.id="tones-list-container",t.style.overflow="scroll",t.style.maxHeight="332px",t.style.position="absolute",t.style.backgroundColor="#353740",t.style.padding="0.1em",t.style.borderRadius="5px",t.style.width="fit-content",t.style.position="absolute",r=document.getElementById("optionOpener").getBoundingClientRect(),t.style.left=r.x/2-40+"px",t.style.bottom="7vh",t.onmouseleave=function(){IN_BOUND.hideToneOptions()},t.style.borderColor="#202123",t.style.borderWidth="1px",e.appendChild(t),(r=document.querySelector("form textarea")).parentNode.insertBefore(e,r)),this.insertToneOptionsInContainer()},insertToneOptionsInContainer(){var e=document.querySelector(".tones-list-container"),t=`<ul >${this.Tones.map((e,t)=>`
    <li class="tonesLI" style="cursor:pointer; padding:1px; margin:1px;  flex-direction:row; display:flex; align-content:space-between; flex-wrap: wrap; justify-content: space-between; " >

    <p class="tonesLabel" onClick='IN_BOUND.setToneIndexAndRefresh("${e.ID}")' style="font-size:small; font-weight:light; padding:0px; margin:0px; line-height:normal; display:block;">${e.Label}</p>

    ${"user"===e.type?`<div style="display:flex; flex-direction:row;">
    <a style="margin-left:3px; display:block;" class="tonesEdit" onclick="IN_BOUND.editTone('${e.ID}')" > ${E("Edit")} </a>
    <a style="margin-left:3px; display:block;" class="tonesCross" onclick="IN_BOUND.deleteTone('${e.ID}')" > ${E("Cross")} </a>
    </div>`:""}

    </li>`).join("")}</ul>  `;e.innerHTML=t},setToneIndexAndRefresh(e){this.hideToneOptions(),this.insertLanguageToneWritingStyleContinueActions()},hideToneOptions(){document.getElementsByClassName("tonesList")[0].style.display="none"},editTone(e){this.showeditToneModal(e)},async deleteTone(e){this.hideToneOptions(),await this.Client.deleteTone(e),this.refreshData(),this.showNotification(i.SUCCESS,"Tone was deleted!")},async showeditToneModal(t){var e=this.Tones.filter(e=>e.ID===t)[0];this.InputToneCategorySelected=e.CategoryID;let r=document.getElementById("editToneModal");r||((r=document.createElement("div")).id="editToneModal",r.addEventListener("submit",this.saveEditedTone.bind(this)),document.body.appendChild(r)),r.innerHTML=`
      <div style="z-index:100;" class="fixed inset-0 text-center transition-opacity z-50">
        <div class="absolute bg-gray-900 inset-0 opacity-90">
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
    `,r.style="display: block;",document.addEventListener("keydown",e=>{"Escape"===e.key&&this.hideModal("editToneModal")})},async saveEditedTone(e){e.preventDefault();const t={};var r,a;for([r,a]of new FormData(e.target))t[r]=a;e=this.ToneCategories.filter(e=>e.Label===t.Category)[0],t.CategoryID=e.ID,t.Category=e.Label,this.showNotification(i.SUCCESS,"Sync.."),this.hideModal("editToneModal"),e={id:t.ID,label:t.Label,prompt:t.Description,user:IN_BOUND.Client.User.Email,company:IN_BOUND.Company};await this.Client.saveEditTone(e),this.refreshData(),this.showNotification(i.SUCCESS,"Tone changes was saved!")},async showNewToneModal(){let e=document.getElementById("newToneModal");this.InputToneCategorySelected=this.ToneCategories[0].ID,e||((e=document.createElement("div")).id="newToneModal",e.addEventListener("submit",this.saveNewTone.bind(this)),document.body.appendChild(e)),e.innerHTML=`
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
    `,e.style="display: block;",e.querySelector("#InputToneCategory").addEventListener("change",this.changeInputToneCategory.bind(this)),document.addEventListener("keydown",e=>{"Escape"===e.key&&this.hideModal("newToneModal")})},async saveNewTone(e){e.preventDefault(),this.hideModal("newToneModal");const t={};var r,a;for([r,a]of new FormData(e.target))t[r]=a;e=this.ToneCategories.filter(e=>e.Label===t.Category)[0];t.CategoryID=e.ID,t.Category=e.Label,this.showNotification(i.SUCCESS,"Sync.."),await this.Client.saveNewTone(t),this.refreshData(),this.showNotification(i.SUCCESS,"Tone was added!")},changeInputToneCategory(e){this.InputToneCategorySelected=e.target.value},insertLanguageToneWritingStyleContinueActions(){let e=document.createElement("div");var t,r;e.id="language-select-wrapper",e.className=D("languageSelectWrapper"),this.Languages&&(t=document.querySelector("form textarea"))&&((r=document.querySelector(".w-full.h-32.md\\:h-48.flex-shrink-0"))&&(r.style="display: none"),(r=t.form.parentElement)&&r.classList.remove("absolute","md:!bg-transparent","md:border-t-0","md:dark:border-transparent","md:border-transparent"),r=t.parentElement)&&(r.classList.add("pr-4"),r.querySelector("#"+e.id)?e=r.querySelector("#"+e.id):r.prepend(e),e.innerHTML=`
    <div class="flex w-full">
      <div>
        <select id="languageSelect" class="${D("select")} pr-10">
          <option value ${this.TargetLanguage?"":" selected"}>Default language</option>  

          ${this.Languages.map(e=>`
            <option value="${e.languageEnglish}" ${this.TargetLanguage===e.languageEnglish?" selected":""}>
              ${e.languageLabel}
              </option> 
          `).join("")}
        </select>
      </div>
      

      <div class="ml-2">
      
        <select id="writingStyleSelect" class="${D("select")} pr-10">
          <option value ${this.WritingStyle?"":" selected"}>Default style</option>

          ${this.WritingStyles.map(e=>`
            <option value="${e.ID}" ${this.WritingStyle===e.ID?" selected":""}>
              ${this.WritingStyle===e.ID?e.Label+" style":e.Label}
              </option> 
          `).join("")}
        </select>
      </div>

      <div class="ml-2">
        <select id="toneSelect" class="${D("select")} pr-10">

        <option value="" selected > No Variation</option>

          ${this.userTones.map(e=>`
            <option value="${e.ID}" ${this.Tone===e.ID?" selected":""}>
              ${this.Tone===e.ID?e.Label+" variation":e.Label}
              </option> 
          `).join("")}
        </select>
      </div>

    </div>

    <div class="inline-flex invisible" role="group" id="continueActionsGroup">
      <button id="continueWritingButton" title="Continue writing please" class="${D("continueButton")}" onclick="event.stopPropagation(); IN_BOUND.continueWriting()" type="button">
        Continue
      </button>

      <select id="continueActionSelect" class="${D("continueActionSelect")}">
        <option value selected disabled>-- Select an action --</option>

        ${this.ContinueActions.map(e=>`
          <option value="${e.ID}">${e.Label}</option>
        `).join("")}
      </select>
    </div>
  `,e.querySelector("#languageSelect").addEventListener("change",this.changeTargetLanguage.bind(this)),e?.querySelector("#toneSelect")?.addEventListener("change",this.changeTone.bind(this)),e.querySelector("#writingStyleSelect").addEventListener("change",this.changeWritingStyle.bind(this)),e.querySelector("#continueActionSelect").addEventListener("change",this.changeContinueAction.bind(this)))},changeTargetLanguage(e){this.TargetLanguage=e.target.value,localStorage.setItem($e,this.TargetLanguage)},changeTone(e){this.Tone=e.target.value,this.insertLanguageToneWritingStyleContinueActions()},changeToneCategory(e){e=e.target.value,this.ToneCategorySelected=e,e=this.companyTonesState?[...this.DefaultTones,...this.userTones]:this.userTones;this.Tones=e.filter(e=>e.CategoryID===this.ToneCategorySelected),this.Tones.sort((e,t)=>e.Label.localeCompare(t.Label)),this.insertLanguageToneWritingStyleContinueActions()},changeWritingStyle(e){this.WritingStyle=parseInt(e.target.value),this.insertLanguageToneWritingStyleContinueActions()},changeContinueAction(e){const t=parseInt(e.target.value);e=this.ContinueActions.find(e=>e.ID===t);e&&this.submitContinueActionPrompt(e.Prompt)},continueWriting(){this.submitContinueActionPrompt("Continue writing please")},submitContinueActionPrompt(e=""){var t=document.querySelector("form textarea");t.value.trim()&&"Continue writing please"!==t.value.trim()&&!confirm("Are you sure you want to continue? The current prompt text will be lost.")||(t.value=e,t.focus(),(e=t.nextElementSibling)&&e.tagName&&"button"===e.tagName.toLowerCase()&&e.click())},hideContinueActionsButton(){var e=document.querySelector("#continueActionsGroup");e&&e.classList.add("invisible")},showContinueActionsButton(){var e=document.querySelector("#continueActionsGroup");e&&e.classList.remove("invisible")},prevPromptTemplatesPage(){this.PromptTemplateSection.currentPage--,this.PromptTemplateSection.currentPage=Math.max(0,this.PromptTemplateSection.currentPage),this.insertPromptTemplatesSection()},nextPromptTemplatesPage(){var e=this.PromptTemplatesType===p.OWN?this.OwnPrompts:this.DefaultPromptTemplates;e&&Array.isArray(e)&&0!==(e=this.filterPromptTemplates(e)).length&&(this.PromptTemplateSection.currentPage++,this.PromptTemplateSection.currentPage=Math.min(Math.floor((e.length-1)/this.PromptTemplateSection.pageSize),this.PromptTemplateSection.currentPage),this.insertPromptTemplatesSection())},exportCurrentChat(){let e=[...document.querySelector(".flex.flex-col.items-center").children].map(e=>{e=e.querySelector(".whitespace-pre-wrap");return e?0===e.children.length?"**User:**\n"+e.innerText:"**ChatGPT:**\n"+[...e.firstChild.children].map(e=>"PRE"!==e.nodeName?""+e.innerHTML:`\`\`\`${e.getElementsByTagName("code")[0].classList[2].split("-")[1]}
${e.innerText.replace(/^Copy code/g,"").trim()}
\`\`\``).join("\n"):""});if(!(e=e.filter(e=>e)))return!1;let t="";try{t="\n```\n"+window.__NEXT_DATA__.props.pageProps.user.name+" on "+(new Date).toLocaleString()+"\n```\n\n---"}catch{console.error("Failed to get user name from window.__NEXT_DATA__.props.pageProps.user.name. Using default header instead.")}var r=new Blob([t+"\n\n\n"+e.join("\n\n---\n\n")],{type:"text/plain"}),a=document.createElement("a");a.href=URL.createObjectURL(r),a.download="IN_BOUND-export-chatgpt-thread_"+(new Date).toISOString()+".md",document.body.appendChild(a),a.click()},async editPromptTemplate(e){var t,e=(this.PromptTemplatesType===p.OWN?this.OwnPrompts:this.PromptTemplates)[e];(this.PromptTemplatesType===p.OWN||e.OwnPrompt||this.isAdminMode())&&(await this.showSavePromptModal(new CustomEvent(Ue),e.ID,e),(t=document.getElementById("savePromptForm")).elements.Prompt.value=e.Prompt,t.elements.Teaser.value=e.Teaser,t.elements.PromptHint.value=e.PromptHint,t.elements.Title.value=e.Title,t.elements.ID.value=e.ID,e.Tone&&(t.elements.Tone.value=e.Tone),t.elements.companyTonesState.checked=e.companyTonesState,e.PromptTypeNo===n.PUBLIC&&(t.elements.Public.checked=!0),t.elements.Tags.value=e.Tags)},async deletePromptTemplate(e){const t=(this.PromptTemplatesType===p.OWN?this.OwnPrompts:this.PromptTemplates)[e];if((this.PromptTemplatesType===p.OWN||t.OwnPrompt||this.isAdminMode())&&confirm(`Are you sure you want to delete prompt template "${t.Title}"?`)){try{this.showNotification(i.SUCCESS,"Sync.."),await this.Client.deletePrompt(t.ID,this.Company),this.refreshData(),this.OwnPrompts=this.OwnPrompts.filter(e=>e.ID!==t.ID),t.PromptTypeNo===n.PUBLIC&&(this.PromptTemplates=this.PromptTemplates.filter(e=>e.ID!==t.ID))}catch(e){return void this.showNotification(i.ERROR,"Something went wrong. Please try again.")}this.insertPromptTemplatesSection()}},async voteThumbsUp(e){this.showNotification(i.SUCCESS,"Sync..");try{await this.Client.voteForPrompt(e,1),this.refreshData()}catch(e){return void this.showNotification(i.ERROR,"Something went wrong. Please try again.")}this.showNotification(i.SUCCESS,"Prompt added to favorites!")},async likeForPrompt(e){this.showNotification(i.SUCCESS,"Sync..");try{await this.Client.likeForPrompt(e),this.refreshData()}catch(e){return void this.showNotification(i.ERROR,"Something went wrong. Please try again.")}this.showNotification(i.SUCCESS,"Thanks for your like!")},async voteThumbsDown(e){this.showNotification(i.SUCCESS,"Sync..");try{await this.Client.voteForPrompt(e,-1),this.refreshData()}catch(e){return void this.showNotification(i.ERROR,"Something went wrong. Please try again.")}this.showNotification(i.SUCCESS,"Prompt removed from favorites!")},async reportPrompt(e){e.preventDefault();e=new FormData(e.target);try{await this.Client.reportPrompt(e.get("PromptID"),+e.get("FeedbackTypeNo"),e.get("FeedbackText"),e.get("FeedbackContact"))}catch(e){return void this.showNotification(i.ERROR,"Something went wrong. Please try again.")}this.showNotification(i.SUCCESS,"Thanks for your feedback! We will review this prompt."),this.hideModal("reportPromptModal")},copyPromptDeepLink(e){const t=(this.PromptTemplatesType===p.OWN?this.OwnPrompts:this.PromptTemplates)[e];t&&(e=`https://chat.openai.com/chat?${A}=`+t.ID,navigator.clipboard.writeText(e).then(()=>{t.PromptTypeNo!==n.PUBLIC?this.showNotification(i.WARNING,"The link to the prompt template was copied to your clipboard.<br>This prompt is not shared as public. Only you can access it."):this.showNotification(i.SUCCESS,"The link to the prompt template was copied to your clipboard.")},()=>{this.showNotification(i.ERROR,"Something went wrong. Please try again.")}))},selectPromptTemplateByIndex(e){var t=this.PromptTemplatesType===p.OWN?this.OwnPrompts:this.PromptTemplates;t&&Array.isArray(t)&&(this.selectPromptTemplate(t[e]),this.Tone=t[e]?.Tone,this.hideContinueActionsButton(),setTimeout(function(){IN_BOUND.insertLanguageToneWritingStyleContinueActions()},300))},addToOwnPrompts(e){this.forkPrompt(e)},selectPromptTemplate(e){var t=document.querySelector("textarea"),r=t.parentElement;let a=document.createElement("div");a.id="prompt-wrapper",r.querySelector("#prompt-wrapper")?a=r.querySelector("#prompt-wrapper"):t.parentNode.insertBefore(a,t);r=new URL(window.location.href);if(e){if(this.companyTonesState=e.companyTonesState||!1,this.showVariablesModal(e),this.activePromptID=e.ID,a.innerHTML=`
        <span class="${D`tag`}" title="${M(e.Prompt)}">

        <span class="items-center">
          ${M(e.Title)}

          ${this.OwnPrompts.map(e=>e.ID).includes(e.ID)?"":`<span class="inline-flex items-center ml-2" >
              <a title="${$.plusOnTextarea}" class="px-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                onclick="IN_BOUND.addToOwnPrompts('${e.ID}')">${E("add-go")}</a> </span>`}
                </span>

              <span style="font-weight:normal;" class="text-xs font-thin ">
              ${$.textareaPlaceholderIdentifier}  ${M(e.PromptHint)}
              </span>

        </span>
        `,t.placeholder="Enter your prompt",-1<(this.SelectedPromptTemplate=e).Prompt.indexOf("[PROMPT]")&&(t.innerHTML="   ",t.nextElementSibling.disabled=!1),t.focus(),r.searchParams.get(A)===e.ID)return;r.searchParams.set(A,e.ID)}else{if(a.innerHTML="",t.placeholder="",this.SelectedPromptTemplate=null,!r.searchParams.get(A))return;r.searchParams.delete(A)}window.history.pushState({},"",r)},CSVToArray(e,t){t=t||",";for(var r,a=new RegExp("(\\"+t+'|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\'+t+"\\r\\n]*))","gi"),o=[[]];r=a.exec(e);){var i=r[1],i=(i.length&&i!==t&&o.push([]),r[2]?r[2].replace(new RegExp('""',"g"),'"'):r[3]);o[o.length-1].push(i)}return o},getTopicLabel(t){var e=this.Topics.find(e=>e.ID===t);return e?e.Label:""},getActivityLabel(t){var e=this.Activities.find(e=>e.ID===t);return e?e.Label:""},isAdmin(){return this.Client.User.UserStatusNo===F.ADMIN},isAdminMode(){return this.isAdmin()&&this.AdminMode},toggleAdminMode(){this.isAdmin()&&(this.AdminMode=!this.AdminMode,this.insertPromptTemplatesSection())},canCreatePromptTemplate(){return this.canCreatePublicPromptTemplate()||this.canCreatePrivatePromptTemplate()||!0},canCreatePrivatePromptTemplate(){return this.isAdmin()||0<this.Client.User.MaxNewPrivatePromptsAllowed},canCreatePublicPromptTemplate(){return this.isAdmin()||0<this.Client.User.MaxNewPublicPromptsAllowed},cannotCreatePublicPromptTemplateError(){this.showNotification(i.WARNING,"Cannot Create Public Prompt Template",!1)},cannotCreatePrivatePromptTemplateError(){this.showNotification(i.WARNING,"Cannot Create Private Prompt Template",!1)},cannotCreatePromptTemplateError(){this.showNotification(i.WARNING,"Cannot Create Prompt Template",!1)}},"chat.openai.com"===window.location.hostname&&setTimeout(function(){fetch(l+"/user?user="+window.__NEXT_DATA__.props.pageProps.user.email).then(e=>e.json()).then(e=>{console.log(e),e&&window.IN_BOUND.init()})},500)}();