const O=new WeakMap;function G(t,e,n,i){var r,s;if(!t&&!O.has(e))return!1;const o=(r=O.get(e))!==null&&r!==void 0?r:new WeakMap;if(O.set(e,o),!t&&!O.has(e))return!1;const a=(s=o.get(n))!==null&&s!==void 0?s:new Set;o.set(n,a);const u=a.has(i);return t?a.add(i):a.delete(i),u&&t}function fe(t){return typeof t.addEventListener=="function"}function ge(t,e){let n=t.target;if(n instanceof Text&&(n=n.parentElement),n instanceof Element&&t.currentTarget instanceof Element){const i=n.closest(e);if(i&&t.currentTarget.contains(i))return i}}function re(t,e,n,i,r){if(typeof t=="string"&&(t=document.querySelectorAll(t)),!fe(t)){const h=Array.prototype.map.call(t,d=>re(d,e,n,i,r));return{destroy(){for(const d of h)d.destroy()}}}const s=t instanceof Document?t.documentElement:t,o=Boolean(typeof r=="object"?r.capture:r),a=h=>{const d=ge(h,e);d&&(h.delegateTarget=d,i.call(s,h))};typeof r=="object"&&delete r.once;const u=JSON.stringify({selector:e,type:n,capture:o}),c=G(!0,s,i,u),l={destroy(){s.removeEventListener(n,a,r),G(!1,s,i,u)}};return c||s.addEventListener(n,a,r),l}function R(){return R=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},R.apply(this,arguments)}const se=(t,e)=>String(t).toLowerCase().replace(/[\s/_.]+/g,"-").replace(/[^\w-]+/g,"").replace(/--+/g,"-").replace(/^-+|-+$/g,"")||e||"",w=({hash:t}={})=>location.pathname+location.search+(t?location.hash:""),me=(t,e={})=>{const n=R({url:t=t||w({hash:!0}),random:Math.random(),source:"swup"},e);history.pushState(n,"",t)},D=(t=null,e={})=>{t=t||w({hash:!0});const n=R({},history.state,{url:t,random:Math.random(),source:"swup"},e);history.replaceState(n,"",t)},ve=["base"],Y=(t,e,n,i={})=>{let{base:r=document}=i,s=function(a,u){if(a==null)return{};var c,l,h={},d=Object.keys(a);for(l=0;l<d.length;l++)u.indexOf(c=d[l])>=0||(h[c]=a[c]);return h}(i,ve);const o=re(r,t,e,n,s);return{destroy:()=>o.destroy()}},_=(t,e=document)=>e.querySelector(t),L=(t,e=document)=>Array.from(e.querySelectorAll(t)),we=t=>{requestAnimationFrame(()=>{requestAnimationFrame(()=>{t()})})},Pe=t=>window.CSS&&window.CSS.escape?CSS.escape(t):t,Q=t=>1e3*Number(t.slice(0,-1).replace(",",".")),ye=(t,e)=>{var n,i;let r=document.createElement("html");r.innerHTML=t;let s=[];e.forEach(u=>{if(_(u,r)==null)return console.warn(`[swup] Container ${u} not found on page.`),null;L(u).length!==L(u,r).length&&console.warn("[swup] Mismatched number of containers found on new page."),L(u).forEach((c,l)=>{L(u,r)[l].setAttribute("data-swup",String(s.length)),s.push(L(u,r)[l].outerHTML)})});const o=((n=_("title",r))==null?void 0:n.innerText)||"",a=(i=_("body",r))==null?void 0:i.className;return r.innerHTML="",r=null,{title:o,pageClass:a,blocks:s,originalContent:t}},oe=(t,e)=>{const n={url:window.location.pathname+window.location.search,method:"GET",data:null,headers:{}},{url:i,method:r,headers:s,data:o}=R({},n,t),a=new XMLHttpRequest;return a.onreadystatechange=function(){a.readyState===4&&e(a)},a.open(r,i,!0),Object.entries(s).forEach(([u,c])=>{a.setRequestHeader(u,c)}),a.send(o),a};class C extends URL{constructor(e,n=document.baseURI){super(e.toString(),n)}get url(){return this.pathname+this.search}static fromElement(e){const n=e.getAttribute("href")||e.getAttribute("xlink:href");return new C(n)}static fromUrl(e){return new C(e)}}const Ee=(t,e)=>{let n=0;e.forEach(i=>{_(i,t)==null?console.warn(`[swup] Container ${i} not found on page.`):L(i).forEach((r,s)=>{L(i,t)[s].setAttribute("data-swup",String(n)),n++})})},be=t=>/^to-/.test(t)||["is-changing","is-rendering","is-popstate"].includes(t),Z=()=>{const t=document.documentElement.className.split(" ").filter(be);document.documentElement.classList.remove(...t)};class Se{constructor(e){this.pages={},this.last=null,this.swup=void 0,this.swup=e}getCacheUrl(e){return this.swup.resolveUrl(C.fromUrl(e).url)}cacheUrl(e){e.url=this.getCacheUrl(e.url),e.url in this.pages==0&&(this.pages[e.url]=e),e.responseURL=this.getCacheUrl(e.responseURL),this.last=this.pages[e.url],this.swup.log(`Cache (${Object.keys(this.pages).length})`,this.pages)}getPage(e){return e=this.getCacheUrl(e),this.pages[e]}getCurrentPage(){return this.getPage(w())}exists(e){return(e=this.getCacheUrl(e))in this.pages}empty(){this.pages={},this.last=null,this.swup.log("Cache cleared")}remove(e){delete this.pages[this.getCacheUrl(e)]}}const Te=function({event:t,skipTransition:e}={}){if(e)return this.triggerEvent("transitionEnd",t),this.cleanupAnimationClasses(),[Promise.resolve()];we(()=>{this.triggerEvent("animationInStart"),document.documentElement.classList.remove("is-animating")});const n=this.getAnimationPromises("in");return Promise.all(n).then(()=>{this.triggerEvent("animationInDone"),this.triggerEvent("transitionEnd",t),this.cleanupAnimationClasses()}),n},ee=t=>t?(t.charAt(0)==="#"&&(t=t.substring(1)),t=decodeURIComponent(t),t=Pe(t),_(`#${t}`)||_(`a[name='${t}']`)):null;let q="transition",ae="transitionend",F="animation",ue="animationend";function Le(t){const e=this.options.animationSelector;if(e===!1)return[Promise.resolve()];const n=L(e,document.body);return n.length?n.map(i=>function(r,s,o=null){const{type:a,timeout:u,propCount:c}=function(l,h=null){const d=window.getComputedStyle(l),g=`${q}Duration`,P=`${F}Delay`,y=`${F}Duration`,m=d[`${q}Delay`].split(", "),p=(d[g]||"").split(", "),T=te(m,p),x=(d[P]||"").split(", "),f=(d[y]||"").split(", "),b=te(x,f);let v="",E=0,S=0;return h==="transition"?T>0&&(v="transition",E=T,S=p.length):h==="animation"?b>0&&(v="animation",E=b,S=f.length):(E=Math.max(T,b),v=E>0?T>b?"transition":"animation":null,S=v?v==="transition"?p.length:f.length:0),{type:v,timeout:E,propCount:S}}(r,o);return a&&u?new Promise(l=>{const h=a==="transition"?ae:ue,d=performance.now();let g=0;const P=()=>{r.removeEventListener(h,y),l()},y=m=>{if(m.target===r){if(!(p=>!!p.elapsedTime)(m))throw new Error("Not a transition or animation event.");(performance.now()-d)/1e3<m.elapsedTime||++g>=c&&P()}};setTimeout(()=>{g<c&&P()},u+1),r.addEventListener(h,y)}):(console.warn(`[swup] No CSS transition duration defined for element of selector ${s}`),Promise.resolve())}(i,e)):(console.warn(`[swup] No animated elements found by selector ${e}`),[Promise.resolve()])}function te(t,e){for(;t.length<e.length;)t=t.concat(t);return Math.max(...e.map((n,i)=>Q(n)+Q(t[i])))}window.ontransitionend===void 0&&window.onwebkittransitionend!==void 0&&(q="WebkitTransition",ae="webkitTransitionEnd"),window.onanimationend===void 0&&window.onwebkitanimationend!==void 0&&(F="WebkitAnimation",ue="webkitAnimationEnd");const Ce=function(t){const e=ye(t.responseText,this.options.containers);return e?R({},e,{responseURL:t.responseURL||window.location.href}):(console.warn("[swup] Received page is invalid."),null)};function Re(t){const e=this.options.requestHeaders,{url:n}=t;return this.cache.exists(n)?(this.triggerEvent("pageRetrievedFromCache"),Promise.resolve(this.cache.getPage(n))):new Promise((i,r)=>{oe(R({},t,{headers:e}),s=>{if(s.status===500)return this.triggerEvent("serverError"),void r(n);const o=this.getPageData(s);if(!o||!o.blocks.length)return void r(n);const a=R({},o,{url:n});this.cache.cacheUrl(a),this.triggerEvent("pageLoaded"),i(a)})})}const xe=function({event:t,skipTransition:e}={}){const n=t instanceof PopStateEvent;if(e)return this.triggerEvent("animationSkipped"),[Promise.resolve()];this.triggerEvent("animationOutStart"),document.documentElement.classList.add("is-changing","is-leaving","is-animating"),n&&document.documentElement.classList.add("is-popstate");const i=this.getAnimationPromises("out");return Promise.all(i).then(()=>{this.triggerEvent("animationOutDone")}),i};function Ae(t){const{url:e}=t;this.shouldIgnoreVisit(e)?window.location.href=e:this.performPageLoad(t)}function _e(t){const{url:e,event:n,customTransition:i}=t??{},r=n instanceof PopStateEvent,s=this.shouldSkipTransition({url:e,event:n});this.triggerEvent("transitionStart",n),this.updateTransition(w(),e,i),i!=null&&document.documentElement.classList.add(`to-${se(i)}`);const o=this.leavePage({event:n,skipTransition:s}),a=this.fetchPage(t);r||me(e+(this.scrollToElement||"")),this.currentPageUrl=w(),Promise.all([a,...o]).then(([u])=>{this.renderPage(u,{event:n,skipTransition:s})}).catch(u=>{u!==void 0&&(this.options.skipPopStateHandling=()=>(window.location=u,!0),history.go(-1))})}const Oe=function({blocks:t,title:e}){return t.forEach((n,i)=>{document.body.querySelector(`[data-swup="${i}"]`).outerHTML=n}),document.title=e,Promise.resolve()};function $e(t,e){const n=this._handlers[t];n?n.push(e):console.warn(`Unsupported event ${t}.`)}function He(t,e){if(t&&e){const n=this._handlers[t];n.includes(e)?this._handlers[t]=n.filter(i=>i!==e):console.warn(`Handler for event '${t}' not found.`)}else t?this._handlers[t]=[]:Object.keys(this._handlers).forEach(n=>{this._handlers[n]=[]})}function Me(t,e){this._handlers[t].forEach(i=>{try{i(e)}catch(r){console.error(r)}});const n=new CustomEvent(`swup:${t}`,{detail:t});document.dispatchEvent(n)}const Ue=function(t){var e;if((e=t)!=null&&e.isSwupPlugin){if(t.swup=this,!t._checkRequirements||t._checkRequirements())return t._beforeMount&&t._beforeMount(),t.mount(),this.plugins.push(t),this.plugins}else console.error("Not a swup plugin instance",t)};function ke(t){const e=this.findPlugin(t);if(e)return e.unmount(),e._afterUnmount&&e._afterUnmount(),this.plugins=this.plugins.filter(n=>n!==e),this.plugins;console.error("No such plugin",e)}function Ne(t){return this.plugins.find(e=>e===t||e.name===t)}const je=function(t,{event:e,skipTransition:n}={}){if(document.documentElement.classList.remove("is-leaving"),!this.isSameResolvedUrl(w(),t.url))return;const{url:i}=C.fromUrl(t.responseURL);this.isSameResolvedUrl(w(),i)||(this.cache.cacheUrl(R({},t,{url:i})),this.currentPageUrl=w(),D(i)),n||document.documentElement.classList.add("is-rendering"),this.triggerEvent("willReplaceContent",e),this.replaceContent(t).then(()=>{this.triggerEvent("contentReplaced",e),this.triggerEvent("pageView",e),this.options.cache||this.cache.empty(),this.enterPage({event:e,skipTransition:n}),this.scrollToElement=null})};function De(t,e,n){this.transition={from:t,to:e,custom:n}}function qe({event:t}){return!(!(t instanceof PopStateEvent)||this.options.animateHistoryBrowsing)}class Fe{constructor(e={}){this.version="3.0.5",this._handlers={animationInDone:[],animationInStart:[],animationOutDone:[],animationOutStart:[],animationSkipped:[],clickLink:[],contentReplaced:[],disabled:[],enabled:[],openPageInNewTab:[],pageLoaded:[],pageRetrievedFromCache:[],pageView:[],popState:[],samePage:[],samePageWithHash:[],serverError:[],transitionStart:[],transitionEnd:[],willReplaceContent:[]},this.scrollToElement=null,this.options=void 0,this.plugins=[],this.transition={},this.cache=void 0,this.currentPageUrl=w(),this.delegatedListeners={},this.boundPopStateHandler=void 0,this.loadPage=Ae,this.performPageLoad=_e,this.leavePage=xe,this.renderPage=je,this.replaceContent=Oe,this.enterPage=Te,this.triggerEvent=Me,this.delegateEvent=Y,this.on=$e,this.off=He,this.updateTransition=De,this.shouldSkipTransition=qe,this.getAnimationPromises=Le,this.getPageData=Ce,this.fetchPage=Re,this.getAnchorElement=ee,this.log=()=>{},this.use=Ue,this.unuse=ke,this.findPlugin=Ne,this.getCurrentUrl=w,this.cleanupAnimationClasses=Z,this.defaults={animateHistoryBrowsing:!1,animationSelector:'[class*="transition-"]',cache:!0,containers:["#swup"],ignoreVisit:(n,{el:i}={})=>!(i==null||!i.closest("[data-no-swup]")),linkSelector:"a[href]",plugins:[],resolveUrl:n=>n,requestHeaders:{"X-Requested-With":"swup",Accept:"text/html, application/xhtml+xml"},skipPopStateHandling:n=>{var i;return((i=n.state)==null?void 0:i.source)!=="swup"}},this.options=R({},this.defaults,e),this.boundPopStateHandler=this.popStateHandler.bind(this),this.cache=new Se(this),this.enable()}enable(){typeof Promise<"u"?(this.delegatedListeners.click=Y(this.options.linkSelector,"click",this.linkClickHandler.bind(this)),window.addEventListener("popstate",this.boundPopStateHandler),Ee(document.documentElement,this.options.containers),this.options.plugins.forEach(e=>this.use(e)),D(),this.triggerEvent("enabled"),document.documentElement.classList.add("swup-enabled"),this.triggerEvent("pageView")):console.warn("Promise is not supported")}destroy(){this.delegatedListeners.click.destroy(),window.removeEventListener("popstate",this.boundPopStateHandler),this.cache.empty(),this.options.plugins.forEach(e=>{this.unuse(e)}),L("[data-swup]").forEach(e=>{e.removeAttribute("data-swup")}),this.off(),this.triggerEvent("disabled"),document.documentElement.classList.remove("swup-enabled")}shouldIgnoreVisit(e,{el:n,event:i}={}){const{origin:r,url:s,hash:o}=C.fromUrl(e);return r!==window.location.origin||!(!n||!this.triggerWillOpenNewWindow(n))||!!this.options.ignoreVisit(s+o,{el:n,event:i})}linkClickHandler(e){const n=e.delegateTarget,{href:i,url:r,hash:s}=C.fromElement(n);if(this.shouldIgnoreVisit(i,{el:n,event:e}))return;if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return void this.triggerEvent("openPageInNewTab",e);if(e.button!==0)return;if(this.triggerEvent("clickLink",e),e.preventDefault(),!r||r===w())return void this.handleLinkToSamePage(r,s,e);if(this.isSameResolvedUrl(r,w()))return;this.scrollToElement=s||null;const o=n.getAttribute("data-swup-transition")||void 0;this.performPageLoad({url:r,customTransition:o})}handleLinkToSamePage(e,n,i){if(n){if(this.triggerEvent("samePageWithHash",i),!ee(n))return console.warn(`Element for offset not found (#${n})`);D(e+n)}else this.triggerEvent("samePage",i)}triggerWillOpenNewWindow(e){return!!e.matches('[download], [target="_blank"]')}popStateHandler(e){var n,i;if(this.options.skipPopStateHandling(e)||this.isSameResolvedUrl(w(),this.currentPageUrl))return;const r=(n=(i=e.state)==null?void 0:i.url)!=null?n:location.href;if(this.shouldIgnoreVisit(r,{event:e}))return;const{url:s,hash:o}=C.fromUrl(r);o?this.scrollToElement=o:e.preventDefault(),this.triggerEvent("popState",e),this.options.animateHistoryBrowsing||(document.documentElement.classList.remove("is-animating"),Z()),this.performPageLoad({url:s,event:e})}resolveUrl(e){if(typeof this.options.resolveUrl!="function")return console.warn("[swup] options.resolveUrl expects a callback function."),e;const n=this.options.resolveUrl(e);return n&&typeof n=="string"?n.startsWith("//")||n.startsWith("http")?(console.warn("[swup] options.resolveUrl needs to return a relative url"),e):n:(console.warn("[swup] options.resolveUrl needs to return a url"),e)}isSameResolvedUrl(e,n){return this.resolveUrl(e)===this.resolveUrl(n)}}const ne=t=>String(t).split(".").concat(["0","0"]).slice(0,3).join(".");let M=class{constructor(){this.isSwupPlugin=!0,this.requires={},this.swup=void 0,this.version=void 0}mount(){}unmount(){}_beforeMount(){if(!this.name)throw new Error("You must define a name of plugin when creating a class.")}_afterUnmount(){}_checkRequirements(){return typeof this.requires!="object"||Object.entries(this.requires).forEach(([e,n])=>{if(!function(i,r,s){const o=function(a,u){var c;if(a==="swup")return(c=u.version)!=null?c:"";{var l;const h=u.findPlugin(a);return(l=h?.version)!=null?l:""}}(i,s);return!!o&&((a,u)=>u.every(c=>{const[,l,h]=c.match(/^([\D]+)?(.*)$/)||[];var d,g;return((P,y)=>{const m={"":p=>p===0,">":p=>p>0,">=":p=>p>=0,"<":p=>p<0,"<=":p=>p<=0};return(m[y]||m[""])(P)})((g=h,d=ne(d=a),g=ne(g),d.localeCompare(g,void 0,{numeric:!0})),l||">=")}))(o,r)}(e,n=Array.isArray(n)?n:[n],this.swup)){const i=`${e} ${n.join(", ")}`;throw new Error(`Plugin version mismatch: ${this.name} requires ${i}`)}}),!0}};function I(){return I=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},I.apply(this,arguments)}let Ie=class extends M{constructor(e){super(),this.name="BodyClassPlugin",this.options=I({},{prefix:""},e)}mount(){this.swup.on("contentReplaced",()=>{const e=this.swup.cache.getCurrentPage();document.body.className.split(" ").forEach(n=>{this.isValidClassName(n)&&document.body.classList.remove(n)}),e.pageClass!==""&&e.pageClass.split(" ").forEach(n=>{this.isValidClassName(n)&&document.body.classList.add(n)})})}isValidClassName(e){return e!==""&&e.indexOf(this.options.prefix)!==-1}};function $(){return $=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},$.apply(this,arguments)}class We extends M{constructor(e={}){super(),this.name="PreloadPlugin",this.requires={swup:">=3.0.0"},this.preloadPromises=new Map,this.defaults={throttle:5},this.onContentReplaced=()=>{this.swup.preloadPages()},this.onMouseEnter=n=>{n.target===n.delegateTarget&&this.deviceSupportsHover()&&(this.swup.triggerEvent("hoverLink",n),this.preloadLink(n.delegateTarget))},this.onTouchStart=n=>{this.deviceSupportsHover()||this.preloadLink(n.delegateTarget)},this.preloadPage=n=>{const i=this.swup,{url:r}=C.fromUrl(n);return new Promise((s,o)=>{i.cache.exists(r)?s(i.cache.getPage(r)):oe({url:r,headers:i.options.requestHeaders},a=>{if(a.status===500)return i.triggerEvent("serverError"),void o(r);const u=i.getPageData(a);if(!u||!u.blocks.length)return void o(r);const c=$({},u,{url:r});i.cache.cacheUrl(c),i.triggerEvent("pagePreloaded"),s(c)})})},this.preloadPages=()=>{L("[data-swup-preload]").forEach(n=>{this.shouldIgnoreVisit(n.href,{el:n})||this.swup.preloadPage(n.href)})},this.options=$({},this.defaults,e)}mount(){const e=this.swup;e.options.cache?(e._handlers.pagePreloaded=[],e._handlers.hoverLink=[],e.preloadPage=this.preloadPage,e.preloadPages=this.preloadPages,this.originalSwupFetchPage=e.fetchPage.bind(e),e.fetchPage=this.fetchPreloadedPage.bind(this),e.delegatedListeners.mouseenter=e.delegateEvent(e.options.linkSelector,"mouseenter",this.onMouseEnter.bind(this),{capture:!0}),e.delegatedListeners.touchstart=e.delegateEvent(e.options.linkSelector,"touchstart",this.onTouchStart.bind(this),{capture:!0}),e.preloadPages(),e.on("contentReplaced",this.onContentReplaced),e.preloadPage(w())):console.warn("PreloadPlugin: swup cache needs to be enabled for preloading")}unmount(){const e=this.swup;e.options.cache&&(this.preloadPromises=null,e._handlers.pagePreloaded=null,e._handlers.hoverLink=null,e.preloadPage=null,e.preloadPages=null,this.originalSwupFetchPage&&(e.fetchPage=this.originalSwupFetchPage,this.originalSwupFetchPage=null),e.delegatedListeners.mouseenter.destroy(),e.delegatedListeners.touchstart.destroy(),e.off("contentReplaced",this.onContentReplaced))}shouldIgnoreVisit(e,{el:n}={}){return this.swup.shouldIgnoreVisit(e,{el:n})}deviceSupportsHover(){return window.matchMedia("(hover: hover)").matches}preloadLink(e){const n=this.swup,{url:i}=C.fromElement(e);if(this.shouldIgnoreVisit(e.href,{el:e})||i===w()||n.cache.exists(i)||this.preloadPromises.has(i)||this.preloadPromises.size>=this.options.throttle)return;const r=this.preloadPage(i);r.url=i,r.catch(()=>{}).finally(()=>{this.preloadPromises.delete(i)}),this.preloadPromises.set(i,r)}fetchPreloadedPage(e){const{url:n}=e,i=this.preloadPromises.get(n);return i??this.originalSwupFetchPage(e)}}var le={},B={};Object.defineProperty(B,"__esModule",{value:!0});var Ve=function(){function t(e,n){for(var i=0;i<n.length;i++){var r=n[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();function Be(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var Ke=function(){function t(){Be(this,t),this.isSwupPlugin=!0}return Ve(t,[{key:"mount",value:function(){}},{key:"unmount",value:function(){}},{key:"_beforeMount",value:function(){}},{key:"_afterUnmount",value:function(){}}]),t}();B.default=Ke;var K={};Object.defineProperty(K,"__esModule",{value:!0});K.default=Je;function Je(t,e){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},i=n.shouldPersist,r=i===void 0?function(){return!1}:i,s=Boolean(document.querySelector("[data-swup-theme]")),o=Array.from(t.children),a=Array.from(e.children),u=ze(o,a,{themeActive:s}),c=Xe(o,a);return c.reverse().filter(function(l){var h=l.el;return ie(h)}).filter(function(l){var h=l.el;return!r(h)}).forEach(function(l){var h=l.el;return t.removeChild(h)}),u.filter(function(l){var h=l.el;return ie(h)}).forEach(function(l){var h=l.el,d=l.index;t.insertBefore(h,t.children[d+1]||null)}),{removed:c.map(function(l){var h=l.el;return h}),added:u.map(function(l){var h=l.el;return h})}}function Xe(t,e){return t.reduce(function(n,i){var r=e.some(function(o){return ce(i,o)}),s=i.matches("[data-swup-theme]");return!r&&!s&&n.push({el:i}),n},[])}function ze(t,e,n){var i=n.themeActive;return e.reduce(function(r,s,o){var a=t.some(function(c){return ce(s,c)});if(!a){var u=i?o+1:o;r.push({el:s,index:u})}return r},[])}function ie(t){return t.localName!=="title"}function ce(t,e){return t.outerHTML===e.outerHTML}var J={};Object.defineProperty(J,"__esModule",{value:!0});J.default=Ge;function Ge(t,e){return t.lang!==e.lang?(t.lang=e.lang,t.lang):null}var X={},z={};Object.defineProperty(z,"__esModule",{value:!0});z.default=Ye;function Ye(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,n=function(s){var o=s.href;return Array.from(document.styleSheets).map(function(a){var u=a.href;return u}).includes(o)},i=function r(s){n(t)?s():setTimeout(function(){return r(s)},10)};return new Promise(function(r){i(r),e>0&&setTimeout(r,e)})}Object.defineProperty(X,"__esModule",{value:!0});X.default=tt;var Qe=z,Ze=et(Qe);function et(t){return t&&t.__esModule?t:{default:t}}function tt(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;return t.filter(function(n){return n.matches("link[rel=stylesheet][href]")}).map(function(n){return(0,Ze.default)(n,e)})}Object.defineProperty(le,"__esModule",{value:!0});var nt=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},it=function(){function t(e,n){for(var i=0;i<n.length;i++){var r=n[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),rt=B,st=U(rt),ot=K,at=U(ot),ut=J,lt=U(ut),ct=X,ht=U(ct);function U(t){return t&&t.__esModule?t:{default:t}}function dt(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function pt(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function ft(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var gt=function(t){ft(e,t);function e(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};dt(this,e);var i=pt(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return i.name="HeadPlugin",i.assetLoadPromises=[],i.updateHead=function(){var r=i.swup.cache.getCurrentPage().originalContent,s=new DOMParser().parseFromString(r,"text/html"),o=(0,at.default)(document.head,s.head,{shouldPersist:i.isPersistentTag}),a=o.removed,u=o.added,c=(0,lt.default)(document.documentElement,s.documentElement);i.swup.log("Removed "+a.length+" / added "+u.length+" tags in head"),c&&i.swup.log("Updated lang attribute: "+c),i.options.awaitAssets?i.assetLoadPromises=(0,ht.default)(u,i.options.timeout):i.assetLoadPromises=[],s.documentElement.innerHTML="",s=null},i.isPersistentTag=function(r){var s=i.options.persistTags;return typeof s=="function"?s(r):typeof s=="string"?r.matches(s):Boolean(s)},i.options=nt({persistTags:!1,persistAssets:!1,awaitAssets:!1,timeout:3e3},n),i}return it(e,[{key:"mount",value:function(){this.validateOptions(),this.swup.on("willReplaceContent",this.updateHead),this.options.awaitAssets&&(this.originalSwupReplaceContent=this.swup.replaceContent.bind(this.swup),this.swup.replaceContent=this.replaceContentAfterAssetsLoaded.bind(this))}},{key:"unmount",value:function(){this.swup.off("willReplaceContent",this.updateHead),this.originalSwupReplaceContent&&(this.swup.replaceContent=this.originalSwupReplaceContent,this.originalSwupReplaceContent=null)}},{key:"validateOptions",value:function(){this.options.persistAssets&&!this.options.persistTags&&(this.options.persistTags="link[rel=stylesheet], script[src], style"),this.options.awaitAssets&&!this.swup.replaceContent&&(this.options.awaitAssets=!1,console.error("[Swup Head Plugin] Installed version of swup doesn't support awaitAssets option"))}},{key:"replaceContentAfterAssetsLoaded",value:function(){for(var i=this,r=arguments.length,s=Array(r),o=0;o<r;o++)s[o]=arguments[o];return this.assetLoadPromises.length?(this.swup.log("Waiting for "+this.assetLoadPromises.length+" assets to load"),new Promise(function(a){Promise.all(i.assetLoadPromises).then(function(){i.assetLoadPromises=[],i.originalSwupReplaceContent.apply(i,s).then(a)})})):this.originalSwupReplaceContent.apply(this,s)}}]),e}(st.default),mt=le.default=gt,W={},vt={get exports(){return W},set exports(t){W=t}};(function(t){(function(e){function n(i){i=i||{},this.settings={level:"polite",parent:"body",idPrefix:"live-region-",delay:0};for(var r in i)i.hasOwnProperty(r)&&(this.settings[r]=i[r]);this.settings.parent=document.querySelector(this.settings.parent)}n.prototype.say=function(i,r){var s=this.settings.parent.querySelector('[id^="'+this.settings.idPrefix+'"]')||!1;s&&this.settings.parent.removeChild(s),r=r||this.settings.delay,this.currentRegion=document.createElement("span"),this.currentRegion.id=this.settings.idPrefix+Math.floor(Math.random()*1e4);var o=this.settings.level!=="assertive"?"status":"alert";return this.currentRegion.setAttribute("aria-live",this.settings.level),this.currentRegion.setAttribute("role",o),this.currentRegion.setAttribute("style","clip: rect(1px, 1px, 1px, 1px); height: 1px; overflow: hidden; position: absolute; white-space: nowrap; width: 1px"),this.settings.parent.appendChild(this.currentRegion),window.setTimeout(function(){this.currentRegion.textContent=i}.bind(this),r),this},t.exports=n})()})(vt);(function(){if(!(typeof window>"u"||typeof document>"u"||typeof HTMLElement>"u")){var t=!1;try{var e=document.createElement("div");e.addEventListener("focus",function(s){s.preventDefault(),s.stopPropagation()},!0),e.focus(Object.defineProperty({},"preventScroll",{get:function(){if(navigator&&typeof navigator.userAgent<"u"&&navigator.userAgent&&navigator.userAgent.match(/Edge\/1[7-8]/))return t=!1;t=!0}}))}catch{}if(HTMLElement.prototype.nativeFocus===void 0&&!t){HTMLElement.prototype.nativeFocus=HTMLElement.prototype.focus;var n=function(s){for(var o=s.parentNode,a=[],u=document.scrollingElement||document.documentElement;o&&o!==u;)(o.offsetHeight<o.scrollHeight||o.offsetWidth<o.scrollWidth)&&a.push([o,o.scrollTop,o.scrollLeft]),o=o.parentNode;return o=u,a.push([o,o.scrollTop,o.scrollLeft]),a},i=function(s){for(var o=0;o<s.length;o++)s[o][0].scrollTop=s[o][1],s[o][0].scrollLeft=s[o][2];s=[]},r=function(s){if(s&&s.preventScroll){var o=n(this);if(typeof setTimeout=="function"){var a=this;setTimeout(function(){a.nativeFocus(),i(o)},0)}else this.nativeFocus(),i(o)}else this.nativeFocus()};HTMLElement.prototype.focus=r}}})();function V(){return V=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},V.apply(this,arguments)}let wt=class extends M{constructor(e={}){super(),this.name="SwupA11yPlugin",this.announceVisit=()=>{requestAnimationFrame(()=>{this.announcePageName(),this.focusPageContent()})},this.announcePageName=()=>{const{contentSelector:n,headingSelector:i,urlTemplate:r,announcementTemplate:s}=this.options;let o=r.replace("{url}",window.location.pathname);document.title&&(o=document.title);const a=document.querySelector(n);if(a){const c=a.querySelectorAll(i);if(c&&c.length){const[l]=c;o=l.getAttribute("aria-label")||l.textContent}}const u=s.replace("{title}",o.trim());this.liveRegion.say(u)},this.focusPageContent=()=>{const n=document.querySelector(this.options.contentSelector);n&&(n.setAttribute("tabindex","-1"),n.focus({preventScroll:!0}))},this.onTransitionStart=()=>{document.documentElement.setAttribute("aria-busy","true")},this.onTransitionEnd=()=>{document.documentElement.removeAttribute("aria-busy")},this.options=V({contentSelector:"main",headingSelector:"h1, h2, [role=heading]",announcementTemplate:"Navigated to: {title}",urlTemplate:"New page at {url}"},e),this.liveRegion=new W}mount(){this.swup.on("contentReplaced",this.announceVisit),this.swup.on("transitionStart",this.onTransitionStart),this.swup.on("transitionEnd",this.onTransitionEnd)}unmount(){this.swup.off("contentReplaced",this.announceVisit),this.swup.off("transitionStart",this.onTransitionStart),this.swup.off("transitionEnd",this.onTransitionEnd)}};function Pt(t){for(var e=[],n=0;n<t.length;){var i=t[n];if(i==="*"||i==="+"||i==="?"){e.push({type:"MODIFIER",index:n,value:t[n++]});continue}if(i==="\\"){e.push({type:"ESCAPED_CHAR",index:n++,value:t[n++]});continue}if(i==="{"){e.push({type:"OPEN",index:n,value:t[n++]});continue}if(i==="}"){e.push({type:"CLOSE",index:n,value:t[n++]});continue}if(i===":"){for(var r="",s=n+1;s<t.length;){var o=t.charCodeAt(s);if(o>=48&&o<=57||o>=65&&o<=90||o>=97&&o<=122||o===95){r+=t[s++];continue}break}if(!r)throw new TypeError("Missing parameter name at ".concat(n));e.push({type:"NAME",index:n,value:r}),n=s;continue}if(i==="("){var a=1,u="",s=n+1;if(t[s]==="?")throw new TypeError('Pattern cannot start with "?" at '.concat(s));for(;s<t.length;){if(t[s]==="\\"){u+=t[s++]+t[s++];continue}if(t[s]===")"){if(a--,a===0){s++;break}}else if(t[s]==="("&&(a++,t[s+1]!=="?"))throw new TypeError("Capturing groups are not allowed at ".concat(s));u+=t[s++]}if(a)throw new TypeError("Unbalanced pattern at ".concat(n));if(!u)throw new TypeError("Missing pattern at ".concat(n));e.push({type:"PATTERN",index:n,value:u}),n=s;continue}e.push({type:"CHAR",index:n,value:t[n++]})}return e.push({type:"END",index:n,value:""}),e}function yt(t,e){e===void 0&&(e={});for(var n=Pt(t),i=e.prefixes,r=i===void 0?"./":i,s="[^".concat(A(e.delimiter||"/#?"),"]+?"),o=[],a=0,u=0,c="",l=function(v){if(u<n.length&&n[u].type===v)return n[u++].value},h=function(v){var E=l(v);if(E!==void 0)return E;var S=n[u],k=S.type,N=S.index;throw new TypeError("Unexpected ".concat(k," at ").concat(N,", expected ").concat(v))},d=function(){for(var v="",E;E=l("CHAR")||l("ESCAPED_CHAR");)v+=E;return v};u<n.length;){var g=l("CHAR"),P=l("NAME"),y=l("PATTERN");if(P||y){var m=g||"";r.indexOf(m)===-1&&(c+=m,m=""),c&&(o.push(c),c=""),o.push({name:P||a++,prefix:m,suffix:"",pattern:y||s,modifier:l("MODIFIER")||""});continue}var p=g||l("ESCAPED_CHAR");if(p){c+=p;continue}c&&(o.push(c),c="");var T=l("OPEN");if(T){var m=d(),x=l("NAME")||"",f=l("PATTERN")||"",b=d();h("CLOSE"),o.push({name:x||(f?a++:""),pattern:x&&!f?s:f,prefix:m,suffix:b,modifier:l("MODIFIER")||""});continue}h("END")}return o}function Et(t,e){var n=[],i=de(t,n,e);return bt(i,n,e)}function bt(t,e,n){n===void 0&&(n={});var i=n.decode,r=i===void 0?function(s){return s}:i;return function(s){var o=t.exec(s);if(!o)return!1;for(var a=o[0],u=o.index,c=Object.create(null),l=function(d){if(o[d]===void 0)return"continue";var g=e[d-1];g.modifier==="*"||g.modifier==="+"?c[g.name]=o[d].split(g.prefix+g.suffix).map(function(P){return r(P,g)}):c[g.name]=r(o[d],g)},h=1;h<o.length;h++)l(h);return{path:a,index:u,params:c}}}function A(t){return t.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function he(t){return t&&t.sensitive?"":"i"}function St(t,e){if(!e)return t;for(var n=/\((?:\?<(.*?)>)?(?!\?)/g,i=0,r=n.exec(t.source);r;)e.push({name:r[1]||i++,prefix:"",suffix:"",modifier:"",pattern:""}),r=n.exec(t.source);return t}function Tt(t,e,n){var i=t.map(function(r){return de(r,e,n).source});return new RegExp("(?:".concat(i.join("|"),")"),he(n))}function Lt(t,e,n){return Ct(yt(t,n),e,n)}function Ct(t,e,n){n===void 0&&(n={});for(var i=n.strict,r=i===void 0?!1:i,s=n.start,o=s===void 0?!0:s,a=n.end,u=a===void 0?!0:a,c=n.encode,l=c===void 0?function(N){return N}:c,h=n.delimiter,d=h===void 0?"/#?":h,g=n.endsWith,P=g===void 0?"":g,y="[".concat(A(P),"]|$"),m="[".concat(A(d),"]"),p=o?"^":"",T=0,x=t;T<x.length;T++){var f=x[T];if(typeof f=="string")p+=A(l(f));else{var b=A(l(f.prefix)),v=A(l(f.suffix));if(f.pattern)if(e&&e.push(f),b||v)if(f.modifier==="+"||f.modifier==="*"){var E=f.modifier==="*"?"?":"";p+="(?:".concat(b,"((?:").concat(f.pattern,")(?:").concat(v).concat(b,"(?:").concat(f.pattern,"))*)").concat(v,")").concat(E)}else p+="(?:".concat(b,"(").concat(f.pattern,")").concat(v,")").concat(f.modifier);else f.modifier==="+"||f.modifier==="*"?p+="((?:".concat(f.pattern,")").concat(f.modifier,")"):p+="(".concat(f.pattern,")").concat(f.modifier);else p+="(?:".concat(b).concat(v,")").concat(f.modifier)}}if(u)r||(p+="".concat(m,"?")),p+=n.endsWith?"(?=".concat(y,")"):"$";else{var S=t[t.length-1],k=typeof S=="string"?m.indexOf(S[S.length-1])>-1:S===void 0;r||(p+="(?:".concat(m,"(?=").concat(y,"))?")),k||(p+="(?=".concat(m,"|").concat(y,")"))}return new RegExp(p,he(n))}function de(t,e,n){return t instanceof RegExp?St(t,e):Array.isArray(t)?Tt(t,e,n):Lt(t,e,n)}function H(){return H=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},H.apply(this,arguments)}class Rt extends M{constructor(e={}){super(),this.name="SwupRouteNamePlugin",this.addPathClasses=()=>{if(!this.options.paths)return;const{from:n,to:i}=this.swup.transition,r=this.getPathName(n),s=this.getPathName(i);document.documentElement.classList.add(`from-${r}`),document.documentElement.classList.add(`to-${s}`)},this.addRouteClasses=()=>{if(!this.options.routes.length)return;const{from:n,to:i}=this.swup.transition,r=this.options.unknownRoute,s=this.getRouteName(n),o=this.getRouteName(i);(s||r)&&document.documentElement.classList.add(`from-route-${s||r}`),(o||r)&&document.documentElement.classList.add(`to-route-${o||r}`),s&&s===o&&document.documentElement.classList.add("to-same-route"),this.swup.log(`Route: '${s||r||"(unknown)"}' to '${o||r||"(unknown)"}'`)},this.removeClasses=()=>{const n=document.documentElement.className.split(" ").filter(i=>i.startsWith("from-"));document.documentElement.classList.remove(...n)},this.options=H({routes:[],unknownRoute:"unknown",matchOptions:{},paths:!1},e),this.compileRoutePatterns()}mount(){this.swup.on("animationOutStart",this.addPathClasses),this.swup.on("animationOutStart",this.addRouteClasses),this.swup.on("animationInDone",this.removeClasses)}unmount(){this.swup.off("animationOutStart",this.addPathClasses),this.swup.off("animationOutStart",this.addRouteClasses),this.swup.off("animationInDone",this.removeClasses)}compileRoutePatterns(){this.routePatterns=this.options.routes.map(e=>{const n=e.name.replace(/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~\s]/g,"");return H({},e,{name:n,matches:Et(e.path,this.options.matchOptions)})})}getRouteName(e){const{name:n}=this.routePatterns.find(i=>i.matches(e))||{};return n||null}getPathName(e){return(se(e)||"homepage").replace(/^-+|-+$/g,"")}}const xt=document.getElementById("swup")?.dataset?.routes??"[]",At=JSON.parse(xt),pe=document.createElement("template");pe.innerHTML=`
		<div
			class="absolute top-0 left-1/2 w-[1vmax] h-[1vmax] grow-transition rounded-[50%] absolute transition-all duration-500"
			aria-hidden="true"
		/>
	`;const j=new Fe({containers:["#swup","#swup-header"],plugins:[new Ie,new We,new mt,new wt,new Rt({routes:At})]});j.on("clickLink",t=>{const e=t.target;if(!e?.pathname)return;const n=e.pathname.split("/")[1]??"index";if(n===window.location.pathname.split("/")[1])return;const i=pe.content.firstElementChild.cloneNode(!0),r=e.dataset.bg;r&&(i.classList.add(r),i.style.setProperty("top",`${e.offsetTop+e.offsetHeight/2}px`),i.style.setProperty("left",`${e.offsetLeft+e.offsetWidth/2}px`),document.body.appendChild(i),queueMicrotask(()=>{i.style.setProperty("transform","scale(250)")})),document.querySelectorAll(".is-active").forEach(o=>{o.classList.remove("is-active")});const s=document.querySelector(`[href="${n}"]`);s&&s.classList.add("is-active"),j.on("animationInStart",()=>{i&&i.remove(),j.off("pageLoaded")})});