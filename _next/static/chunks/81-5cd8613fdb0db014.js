(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[81],{432:(e,t,r)=>{"use strict";r.d(t,{E:()=>g});var n=r(52020),s=r(39853),i=r(7165),a=r(25910),o=class extends a.Q{constructor(e={}){super(),this.config=e,this.#e=new Map}#e;build(e,t,r){let i=t.queryKey,a=t.queryHash??(0,n.F$)(i,t),o=this.get(a);return o||(o=new s.X({client:e,queryKey:i,queryHash:a,options:e.defaultQueryOptions(t),state:r,defaultOptions:e.getQueryDefaults(i)}),this.add(o)),o}add(e){this.#e.has(e.queryHash)||(this.#e.set(e.queryHash,e),this.notify({type:"added",query:e}))}remove(e){let t=this.#e.get(e.queryHash);t&&(e.destroy(),t===e&&this.#e.delete(e.queryHash),this.notify({type:"removed",query:e}))}clear(){i.jG.batch(()=>{this.getAll().forEach(e=>{this.remove(e)})})}get(e){return this.#e.get(e)}getAll(){return[...this.#e.values()]}find(e){let t={exact:!0,...e};return this.getAll().find(e=>(0,n.MK)(t,e))}findAll(e={}){let t=this.getAll();return Object.keys(e).length>0?t.filter(t=>(0,n.MK)(e,t)):t}notify(e){i.jG.batch(()=>{this.listeners.forEach(t=>{t(e)})})}onFocus(){i.jG.batch(()=>{this.getAll().forEach(e=>{e.onFocus()})})}onOnline(){i.jG.batch(()=>{this.getAll().forEach(e=>{e.onOnline()})})}},u=r(57948),l=r(6784),c=class extends u.k{#t;#r;#n;constructor(e){super(),this.mutationId=e.mutationId,this.#r=e.mutationCache,this.#t=[],this.state=e.state||{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0,submittedAt:0},this.setOptions(e.options),this.scheduleGc()}setOptions(e){this.options=e,this.updateGcTime(this.options.gcTime)}get meta(){return this.options.meta}addObserver(e){this.#t.includes(e)||(this.#t.push(e),this.clearGcTimeout(),this.#r.notify({type:"observerAdded",mutation:this,observer:e}))}removeObserver(e){this.#t=this.#t.filter(t=>t!==e),this.scheduleGc(),this.#r.notify({type:"observerRemoved",mutation:this,observer:e})}optionalRemove(){this.#t.length||("pending"===this.state.status?this.scheduleGc():this.#r.remove(this))}continue(){return this.#n?.continue()??this.execute(this.state.variables)}async execute(e){let t=()=>{this.#s({type:"continue"})};this.#n=(0,l.II)({fn:()=>this.options.mutationFn?this.options.mutationFn(e):Promise.reject(Error("No mutationFn found")),onFail:(e,t)=>{this.#s({type:"failed",failureCount:e,error:t})},onPause:()=>{this.#s({type:"pause"})},onContinue:t,retry:this.options.retry??0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode,canRun:()=>this.#r.canRun(this)});let r="pending"===this.state.status,n=!this.#n.canStart();try{if(r)t();else{this.#s({type:"pending",variables:e,isPaused:n}),await this.#r.config.onMutate?.(e,this);let t=await this.options.onMutate?.(e);t!==this.state.context&&this.#s({type:"pending",context:t,variables:e,isPaused:n})}let s=await this.#n.start();return await this.#r.config.onSuccess?.(s,e,this.state.context,this),await this.options.onSuccess?.(s,e,this.state.context),await this.#r.config.onSettled?.(s,null,this.state.variables,this.state.context,this),await this.options.onSettled?.(s,null,e,this.state.context),this.#s({type:"success",data:s}),s}catch(t){try{throw await this.#r.config.onError?.(t,e,this.state.context,this),await this.options.onError?.(t,e,this.state.context),await this.#r.config.onSettled?.(void 0,t,this.state.variables,this.state.context,this),await this.options.onSettled?.(void 0,t,e,this.state.context),t}finally{this.#s({type:"error",error:t})}}finally{this.#r.runNext(this)}}#s(e){this.state=(t=>{switch(e.type){case"failed":return{...t,failureCount:e.failureCount,failureReason:e.error};case"pause":return{...t,isPaused:!0};case"continue":return{...t,isPaused:!1};case"pending":return{...t,context:e.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:e.isPaused,status:"pending",variables:e.variables,submittedAt:Date.now()};case"success":return{...t,data:e.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...t,data:void 0,error:e.error,failureCount:t.failureCount+1,failureReason:e.error,isPaused:!1,status:"error"}}})(this.state),i.jG.batch(()=>{this.#t.forEach(t=>{t.onMutationUpdate(e)}),this.#r.notify({mutation:this,type:"updated",action:e})})}},h=class extends a.Q{constructor(e={}){super(),this.config=e,this.#i=new Set,this.#a=new Map,this.#o=0}#i;#a;#o;build(e,t,r){let n=new c({mutationCache:this,mutationId:++this.#o,options:e.defaultMutationOptions(t),state:r});return this.add(n),n}add(e){this.#i.add(e);let t=f(e);if("string"==typeof t){let r=this.#a.get(t);r?r.push(e):this.#a.set(t,[e])}this.notify({type:"added",mutation:e})}remove(e){if(this.#i.delete(e)){let t=f(e);if("string"==typeof t){let r=this.#a.get(t);if(r)if(r.length>1){let t=r.indexOf(e);-1!==t&&r.splice(t,1)}else r[0]===e&&this.#a.delete(t)}}this.notify({type:"removed",mutation:e})}canRun(e){let t=f(e);if("string"!=typeof t)return!0;{let r=this.#a.get(t),n=r?.find(e=>"pending"===e.state.status);return!n||n===e}}runNext(e){let t=f(e);if("string"!=typeof t)return Promise.resolve();{let r=this.#a.get(t)?.find(t=>t!==e&&t.state.isPaused);return r?.continue()??Promise.resolve()}}clear(){i.jG.batch(()=>{this.#i.forEach(e=>{this.notify({type:"removed",mutation:e})}),this.#i.clear(),this.#a.clear()})}getAll(){return Array.from(this.#i)}find(e){let t={exact:!0,...e};return this.getAll().find(e=>(0,n.nJ)(t,e))}findAll(e={}){return this.getAll().filter(t=>(0,n.nJ)(e,t))}notify(e){i.jG.batch(()=>{this.listeners.forEach(t=>{t(e)})})}resumePausedMutations(){let e=this.getAll().filter(e=>e.state.isPaused);return i.jG.batch(()=>Promise.all(e.map(e=>e.continue().catch(n.lQ))))}};function f(e){return e.options.scope?.id}var d=r(50920),p=r(21239);function m(e){return{onFetch:(t,r)=>{let s=t.options,i=t.fetchOptions?.meta?.fetchMore?.direction,a=t.state.data?.pages||[],o=t.state.data?.pageParams||[],u={pages:[],pageParams:[]},l=0,c=async()=>{let r=!1,c=e=>{Object.defineProperty(e,"signal",{enumerable:!0,get:()=>(t.signal.aborted?r=!0:t.signal.addEventListener("abort",()=>{r=!0}),t.signal)})},h=(0,n.ZM)(t.options,t.fetchOptions),f=async(e,s,i)=>{if(r)return Promise.reject();if(null==s&&e.pages.length)return Promise.resolve(e);let a={client:t.client,queryKey:t.queryKey,pageParam:s,direction:i?"backward":"forward",meta:t.options.meta};c(a);let o=await h(a),{maxPages:u}=t.options,l=i?n.ZZ:n.y9;return{pages:l(e.pages,o,u),pageParams:l(e.pageParams,s,u)}};if(i&&a.length){let e="backward"===i,t={pages:a,pageParams:o},r=(e?function(e,{pages:t,pageParams:r}){return t.length>0?e.getPreviousPageParam?.(t[0],t,r[0],r):void 0}:y)(s,t);u=await f(t,r,e)}else{let t=e??a.length;do{let e=0===l?o[0]??s.initialPageParam:y(s,u);if(l>0&&null==e)break;u=await f(u,e),l++}while(l<t)}return u};t.options.persister?t.fetchFn=()=>t.options.persister?.(c,{client:t.client,queryKey:t.queryKey,meta:t.options.meta,signal:t.signal},r):t.fetchFn=c}}}function y(e,{pages:t,pageParams:r}){let n=t.length-1;return t.length>0?e.getNextPageParam(t[n],t,r[n],r):void 0}var g=class{#u;#r;#l;#c;#h;#f;#d;#p;constructor(e={}){this.#u=e.queryCache||new o,this.#r=e.mutationCache||new h,this.#l=e.defaultOptions||{},this.#c=new Map,this.#h=new Map,this.#f=0}mount(){this.#f++,1===this.#f&&(this.#d=d.m.subscribe(async e=>{e&&(await this.resumePausedMutations(),this.#u.onFocus())}),this.#p=p.t.subscribe(async e=>{e&&(await this.resumePausedMutations(),this.#u.onOnline())}))}unmount(){this.#f--,0===this.#f&&(this.#d?.(),this.#d=void 0,this.#p?.(),this.#p=void 0)}isFetching(e){return this.#u.findAll({...e,fetchStatus:"fetching"}).length}isMutating(e){return this.#r.findAll({...e,status:"pending"}).length}getQueryData(e){let t=this.defaultQueryOptions({queryKey:e});return this.#u.get(t.queryHash)?.state.data}ensureQueryData(e){let t=this.defaultQueryOptions(e),r=this.#u.build(this,t),s=r.state.data;return void 0===s?this.fetchQuery(e):(e.revalidateIfStale&&r.isStaleByTime((0,n.d2)(t.staleTime,r))&&this.prefetchQuery(t),Promise.resolve(s))}getQueriesData(e){return this.#u.findAll(e).map(({queryKey:e,state:t})=>[e,t.data])}setQueryData(e,t,r){let s=this.defaultQueryOptions({queryKey:e}),i=this.#u.get(s.queryHash),a=i?.state.data,o=(0,n.Zw)(t,a);if(void 0!==o)return this.#u.build(this,s).setData(o,{...r,manual:!0})}setQueriesData(e,t,r){return i.jG.batch(()=>this.#u.findAll(e).map(({queryKey:e})=>[e,this.setQueryData(e,t,r)]))}getQueryState(e){let t=this.defaultQueryOptions({queryKey:e});return this.#u.get(t.queryHash)?.state}removeQueries(e){let t=this.#u;i.jG.batch(()=>{t.findAll(e).forEach(e=>{t.remove(e)})})}resetQueries(e,t){let r=this.#u;return i.jG.batch(()=>(r.findAll(e).forEach(e=>{e.reset()}),this.refetchQueries({type:"active",...e},t)))}cancelQueries(e,t={}){let r={revert:!0,...t};return Promise.all(i.jG.batch(()=>this.#u.findAll(e).map(e=>e.cancel(r)))).then(n.lQ).catch(n.lQ)}invalidateQueries(e,t={}){return i.jG.batch(()=>(this.#u.findAll(e).forEach(e=>{e.invalidate()}),e?.refetchType==="none")?Promise.resolve():this.refetchQueries({...e,type:e?.refetchType??e?.type??"active"},t))}refetchQueries(e,t={}){let r={...t,cancelRefetch:t.cancelRefetch??!0};return Promise.all(i.jG.batch(()=>this.#u.findAll(e).filter(e=>!e.isDisabled()).map(e=>{let t=e.fetch(void 0,r);return r.throwOnError||(t=t.catch(n.lQ)),"paused"===e.state.fetchStatus?Promise.resolve():t}))).then(n.lQ)}fetchQuery(e){let t=this.defaultQueryOptions(e);void 0===t.retry&&(t.retry=!1);let r=this.#u.build(this,t);return r.isStaleByTime((0,n.d2)(t.staleTime,r))?r.fetch(t):Promise.resolve(r.state.data)}prefetchQuery(e){return this.fetchQuery(e).then(n.lQ).catch(n.lQ)}fetchInfiniteQuery(e){return e.behavior=m(e.pages),this.fetchQuery(e)}prefetchInfiniteQuery(e){return this.fetchInfiniteQuery(e).then(n.lQ).catch(n.lQ)}ensureInfiniteQueryData(e){return e.behavior=m(e.pages),this.ensureQueryData(e)}resumePausedMutations(){return p.t.isOnline()?this.#r.resumePausedMutations():Promise.resolve()}getQueryCache(){return this.#u}getMutationCache(){return this.#r}getDefaultOptions(){return this.#l}setDefaultOptions(e){this.#l=e}setQueryDefaults(e,t){this.#c.set((0,n.EN)(e),{queryKey:e,defaultOptions:t})}getQueryDefaults(e){let t=[...this.#c.values()],r={};return t.forEach(t=>{(0,n.Cp)(e,t.queryKey)&&Object.assign(r,t.defaultOptions)}),r}setMutationDefaults(e,t){this.#h.set((0,n.EN)(e),{mutationKey:e,defaultOptions:t})}getMutationDefaults(e){let t=[...this.#h.values()],r={};return t.forEach(t=>{(0,n.Cp)(e,t.mutationKey)&&Object.assign(r,t.defaultOptions)}),r}defaultQueryOptions(e){if(e._defaulted)return e;let t={...this.#l.queries,...this.getQueryDefaults(e.queryKey),...e,_defaulted:!0};return t.queryHash||(t.queryHash=(0,n.F$)(t.queryKey,t)),void 0===t.refetchOnReconnect&&(t.refetchOnReconnect="always"!==t.networkMode),void 0===t.throwOnError&&(t.throwOnError=!!t.suspense),!t.networkMode&&t.persister&&(t.networkMode="offlineFirst"),t.queryFn===n.hT&&(t.enabled=!1),t}defaultMutationOptions(e){return e?._defaulted?e:{...this.#l.mutations,...e?.mutationKey&&this.getMutationDefaults(e.mutationKey),...e,_defaulted:!0}}clear(){this.#u.clear(),this.#r.clear()}}},6101:(e,t,r)=>{"use strict";r.d(t,{s:()=>a,t:()=>i});var n=r(12115);function s(e,t){if("function"==typeof e)return e(t);null!=e&&(e.current=t)}function i(...e){return t=>{let r=!1,n=e.map(e=>{let n=s(e,t);return r||"function"!=typeof n||(r=!0),n});if(r)return()=>{for(let t=0;t<n.length;t++){let r=n[t];"function"==typeof r?r():s(e[t],null)}}}}function a(...e){return n.useCallback(i(...e),e)}},6654:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useMergedRef",{enumerable:!0,get:function(){return s}});let n=r(12115);function s(e,t){let r=(0,n.useRef)(null),s=(0,n.useRef)(null);return(0,n.useCallback)(n=>{if(null===n){let e=r.current;e&&(r.current=null,e());let t=s.current;t&&(s.current=null,t())}else e&&(r.current=i(e,n)),t&&(s.current=i(t,n))},[e,t])}function i(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},6874:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),!function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{default:function(){return y},useLinkStatus:function(){return b}});let n=r(6966),s=r(95155),i=n._(r(12115)),a=r(82757),o=r(95227),u=r(69818),l=r(6654),c=r(69991),h=r(85929);r(43230);let f=r(24930),d=r(92664),p=r(6634);function m(e){return"string"==typeof e?e:(0,a.formatUrl)(e)}function y(e){let t,r,n,[a,y]=(0,i.useOptimistic)(f.IDLE_LINK_STATUS),b=(0,i.useRef)(null),{href:v,as:C,children:O,prefetch:P=null,passHref:w,replace:E,shallow:A,scroll:j,onClick:k,onMouseEnter:S,onTouchStart:x,legacyBehavior:M=!1,onNavigate:q,ref:_,unstable_dynamicOnHover:Q,...T}=e;t=O,M&&("string"==typeof t||"number"==typeof t)&&(t=(0,s.jsx)("a",{children:t}));let N=i.default.useContext(o.AppRouterContext),D=!1!==P,R=null===P?u.PrefetchKind.AUTO:u.PrefetchKind.FULL,{href:I,as:L}=i.default.useMemo(()=>{let e=m(v);return{href:e,as:C?m(C):e}},[v,C]);M&&(r=i.default.Children.only(t));let F=M?r&&"object"==typeof r&&r.ref:_,K=i.default.useCallback(e=>(null!==N&&(b.current=(0,f.mountLinkInstance)(e,I,N,R,D,y)),()=>{b.current&&((0,f.unmountLinkForCurrentNavigation)(b.current),b.current=null),(0,f.unmountPrefetchableInstance)(e)}),[D,I,N,R,y]),U={ref:(0,l.useMergedRef)(K,F),onClick(e){M||"function"!=typeof k||k(e),M&&r.props&&"function"==typeof r.props.onClick&&r.props.onClick(e),N&&(e.defaultPrevented||function(e,t,r,n,s,a,o){let{nodeName:u}=e.currentTarget;if(!("A"===u.toUpperCase()&&function(e){let t=e.currentTarget.getAttribute("target");return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)||e.currentTarget.hasAttribute("download"))){if(!(0,d.isLocalURL)(t)){s&&(e.preventDefault(),location.replace(t));return}e.preventDefault(),i.default.startTransition(()=>{if(o){let e=!1;if(o({preventDefault:()=>{e=!0}}),e)return}(0,p.dispatchNavigateAction)(r||t,s?"replace":"push",null==a||a,n.current)})}}(e,I,L,b,E,j,q))},onMouseEnter(e){M||"function"!=typeof S||S(e),M&&r.props&&"function"==typeof r.props.onMouseEnter&&r.props.onMouseEnter(e),N&&D&&(0,f.onNavigationIntent)(e.currentTarget,!0===Q)},onTouchStart:function(e){M||"function"!=typeof x||x(e),M&&r.props&&"function"==typeof r.props.onTouchStart&&r.props.onTouchStart(e),N&&D&&(0,f.onNavigationIntent)(e.currentTarget,!0===Q)}};return(0,c.isAbsoluteUrl)(L)?U.href=L:M&&!w&&("a"!==r.type||"href"in r.props)||(U.href=(0,h.addBasePath)(L)),n=M?i.default.cloneElement(r,U):(0,s.jsx)("a",{...T,...U,children:t}),(0,s.jsx)(g.Provider,{value:a,children:n})}r(73180);let g=(0,i.createContext)(f.IDLE_LINK_STATUS),b=()=>(0,i.useContext)(g);("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},19946:(e,t,r)=>{"use strict";r.d(t,{A:()=>c});var n=r(12115);let s=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),i=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,r)=>r?r.toUpperCase():t.toLowerCase()),a=e=>{let t=i(e);return t.charAt(0).toUpperCase()+t.slice(1)},o=function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return t.filter((e,t,r)=>!!e&&""!==e.trim()&&r.indexOf(e)===t).join(" ").trim()};var u={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let l=(0,n.forwardRef)((e,t)=>{let{color:r="currentColor",size:s=24,strokeWidth:i=2,absoluteStrokeWidth:a,className:l="",children:c,iconNode:h,...f}=e;return(0,n.createElement)("svg",{ref:t,...u,width:s,height:s,stroke:r,strokeWidth:a?24*Number(i)/Number(s):i,className:o("lucide",l),...f},[...h.map(e=>{let[t,r]=e;return(0,n.createElement)(t,r)}),...Array.isArray(c)?c:[c]])}),c=(e,t)=>{let r=(0,n.forwardRef)((r,i)=>{let{className:u,...c}=r;return(0,n.createElement)(l,{ref:i,iconNode:t,className:o("lucide-".concat(s(a(e))),"lucide-".concat(e),u),...c})});return r.displayName=a(e),r}},35695:(e,t,r)=>{"use strict";var n=r(18999);r.o(n,"usePathname")&&r.d(t,{usePathname:function(){return n.usePathname}})},51362:(e,t,r)=>{"use strict";r.d(t,{D:()=>l,N:()=>c});var n=r(12115),s=(e,t,r,n,s,i,a,o)=>{let u=document.documentElement,l=["light","dark"];function c(t){var r;(Array.isArray(e)?e:[e]).forEach(e=>{let r="class"===e,n=r&&i?s.map(e=>i[e]||e):s;r?(u.classList.remove(...n),u.classList.add(i&&i[t]?i[t]:t)):u.setAttribute(e,t)}),r=t,o&&l.includes(r)&&(u.style.colorScheme=r)}if(n)c(n);else try{let e=localStorage.getItem(t)||r,n=a&&"system"===e?window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":e;c(n)}catch(e){}},i=["light","dark"],a="(prefers-color-scheme: dark)",o=n.createContext(void 0),u={setTheme:e=>{},themes:[]},l=()=>{var e;return null!=(e=n.useContext(o))?e:u},c=e=>n.useContext(o)?n.createElement(n.Fragment,null,e.children):n.createElement(f,{...e}),h=["light","dark"],f=e=>{let{forcedTheme:t,disableTransitionOnChange:r=!1,enableSystem:s=!0,enableColorScheme:u=!0,storageKey:l="theme",themes:c=h,defaultTheme:f=s?"system":"light",attribute:g="data-theme",value:b,children:v,nonce:C,scriptProps:O}=e,[P,w]=n.useState(()=>p(l,f)),[E,A]=n.useState(()=>"system"===P?y():P),j=b?Object.values(b):c,k=n.useCallback(e=>{let t=e;if(!t)return;"system"===e&&s&&(t=y());let n=b?b[t]:t,a=r?m(C):null,o=document.documentElement,l=e=>{"class"===e?(o.classList.remove(...j),n&&o.classList.add(n)):e.startsWith("data-")&&(n?o.setAttribute(e,n):o.removeAttribute(e))};if(Array.isArray(g)?g.forEach(l):l(g),u){let e=i.includes(f)?f:null,r=i.includes(t)?t:e;o.style.colorScheme=r}null==a||a()},[C]),S=n.useCallback(e=>{let t="function"==typeof e?e(P):e;w(t);try{localStorage.setItem(l,t)}catch(e){}},[P]),x=n.useCallback(e=>{A(y(e)),"system"===P&&s&&!t&&k("system")},[P,t]);n.useEffect(()=>{let e=window.matchMedia(a);return e.addListener(x),x(e),()=>e.removeListener(x)},[x]),n.useEffect(()=>{let e=e=>{e.key===l&&(e.newValue?w(e.newValue):S(f))};return window.addEventListener("storage",e),()=>window.removeEventListener("storage",e)},[S]),n.useEffect(()=>{k(null!=t?t:P)},[t,P]);let M=n.useMemo(()=>({theme:P,setTheme:S,forcedTheme:t,resolvedTheme:"system"===P?E:P,themes:s?[...c,"system"]:c,systemTheme:s?E:void 0}),[P,S,t,E,s,c]);return n.createElement(o.Provider,{value:M},n.createElement(d,{forcedTheme:t,storageKey:l,attribute:g,enableSystem:s,enableColorScheme:u,defaultTheme:f,value:b,themes:c,nonce:C,scriptProps:O}),v)},d=n.memo(e=>{let{forcedTheme:t,storageKey:r,attribute:i,enableSystem:a,enableColorScheme:o,defaultTheme:u,value:l,themes:c,nonce:h,scriptProps:f}=e,d=JSON.stringify([i,r,u,t,c,l,a,o]).slice(1,-1);return n.createElement("script",{...f,suppressHydrationWarning:!0,nonce:"",dangerouslySetInnerHTML:{__html:"(".concat(s.toString(),")(").concat(d,")")}})}),p=(e,t)=>{let r;try{r=localStorage.getItem(e)||void 0}catch(e){}return r||t},m=e=>{let t=document.createElement("style");return e&&t.setAttribute("nonce",e),t.appendChild(document.createTextNode("*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")),document.head.appendChild(t),()=>{window.getComputedStyle(document.body),setTimeout(()=>{document.head.removeChild(t)},1)}},y=e=>(e||(e=window.matchMedia(a)),e.matches?"dark":"light")},62098:(e,t,r)=>{"use strict";r.d(t,{A:()=>n});let n=(0,r(19946).A)("sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]])},65299:e=>{e.exports={style:{fontFamily:"'Inter', 'Inter Fallback'",fontStyle:"normal"},className:"__className_16bf16"}},69991:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),!function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{DecodeError:function(){return p},MiddlewareNotFoundError:function(){return b},MissingStaticPage:function(){return g},NormalizeError:function(){return m},PageNotFoundError:function(){return y},SP:function(){return f},ST:function(){return d},WEB_VITALS:function(){return r},execOnce:function(){return n},getDisplayName:function(){return u},getLocationOrigin:function(){return a},getURL:function(){return o},isAbsoluteUrl:function(){return i},isResSent:function(){return l},loadGetInitialProps:function(){return h},normalizeRepeatedSlashes:function(){return c},stringifyError:function(){return v}});let r=["CLS","FCP","FID","INP","LCP","TTFB"];function n(e){let t,r=!1;return function(){for(var n=arguments.length,s=Array(n),i=0;i<n;i++)s[i]=arguments[i];return r||(r=!0,t=e(...s)),t}}let s=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,i=e=>s.test(e);function a(){let{protocol:e,hostname:t,port:r}=window.location;return e+"//"+t+(r?":"+r:"")}function o(){let{href:e}=window.location,t=a();return e.substring(t.length)}function u(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function l(e){return e.finished||e.headersSent}function c(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?"?"+t.slice(1).join("?"):"")}async function h(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await h(t.Component,t.ctx)}:{};let n=await e.getInitialProps(t);if(r&&l(r))return n;if(!n)throw Object.defineProperty(Error('"'+u(e)+'.getInitialProps()" should resolve to an object. But found "'+n+'" instead.'),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return n}let f="undefined"!=typeof performance,d=f&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class p extends Error{}class m extends Error{}class y extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message="Cannot find module for page: "+e}}class g extends Error{constructor(e,t){super(),this.message="Failed to load static file for page: "+e+" "+t}}class b extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function v(e){return JSON.stringify({message:e.message,stack:e.stack})}},73180:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"errorOnce",{enumerable:!0,get:function(){return r}});let r=e=>{}},74466:(e,t,r)=>{"use strict";r.d(t,{F:()=>a});var n=r(52596);let s=e=>"boolean"==typeof e?`${e}`:0===e?"0":e,i=n.$,a=(e,t)=>r=>{var n;if((null==t?void 0:t.variants)==null)return i(e,null==r?void 0:r.class,null==r?void 0:r.className);let{variants:a,defaultVariants:o}=t,u=Object.keys(a).map(e=>{let t=null==r?void 0:r[e],n=null==o?void 0:o[e];if(null===t)return null;let i=s(t)||s(n);return a[e][i]}),l=r&&Object.entries(r).reduce((e,t)=>{let[r,n]=t;return void 0===n||(e[r]=n),e},{});return i(e,u,null==t||null==(n=t.compoundVariants)?void 0:n.reduce((e,t)=>{let{class:r,className:n,...s}=t;return Object.entries(s).every(e=>{let[t,r]=e;return Array.isArray(r)?r.includes({...o,...l}[t]):({...o,...l})[t]===r})?[...e,r,n]:e},[]),null==r?void 0:r.class,null==r?void 0:r.className)}},78859:(e,t)=>{"use strict";function r(e){let t={};for(let[r,n]of e.entries()){let e=t[r];void 0===e?t[r]=n:Array.isArray(e)?e.push(n):t[r]=[e,n]}return t}function n(e){return"string"==typeof e?e:("number"!=typeof e||isNaN(e))&&"boolean"!=typeof e?"":String(e)}function s(e){let t=new URLSearchParams;for(let[r,s]of Object.entries(e))if(Array.isArray(s))for(let e of s)t.append(r,n(e));else t.set(r,n(s));return t}function i(e){for(var t=arguments.length,r=Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];for(let t of r){for(let r of t.keys())e.delete(r);for(let[r,n]of t.entries())e.append(r,n)}return e}Object.defineProperty(t,"__esModule",{value:!0}),!function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{assign:function(){return i},searchParamsToUrlQuery:function(){return r},urlQueryToSearchParams:function(){return s}})},82757:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),!function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{formatUrl:function(){return i},formatWithValidation:function(){return o},urlObjectKeys:function(){return a}});let n=r(6966)._(r(78859)),s=/https?|ftp|gopher|file/;function i(e){let{auth:t,hostname:r}=e,i=e.protocol||"",a=e.pathname||"",o=e.hash||"",u=e.query||"",l=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?l=t+e.host:r&&(l=t+(~r.indexOf(":")?"["+r+"]":r),e.port&&(l+=":"+e.port)),u&&"object"==typeof u&&(u=String(n.urlQueryToSearchParams(u)));let c=e.search||u&&"?"+u||"";return i&&!i.endsWith(":")&&(i+=":"),e.slashes||(!i||s.test(i))&&!1!==l?(l="//"+(l||""),a&&"/"!==a[0]&&(a="/"+a)):l||(l=""),o&&"#"!==o[0]&&(o="#"+o),c&&"?"!==c[0]&&(c="?"+c),""+i+l+(a=a.replace(/[?#]/g,encodeURIComponent))+(c=c.replace("#","%23"))+o}let a=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function o(e){return i(e)}},92664:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isLocalURL",{enumerable:!0,get:function(){return i}});let n=r(69991),s=r(87102);function i(e){if(!(0,n.isAbsoluteUrl)(e))return!0;try{let t=(0,n.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,s.hasBasePath)(r.pathname)}catch(e){return!1}}},93509:(e,t,r)=>{"use strict";r.d(t,{A:()=>n});let n=(0,r(19946).A)("moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]])},99708:(e,t,r)=>{"use strict";r.d(t,{DX:()=>o,TL:()=>a});var n=r(12115),s=r(6101),i=r(95155);function a(e){let t=function(e){let t=n.forwardRef((e,t)=>{let{children:r,...i}=e;if(n.isValidElement(r)){var a;let e,o,u=(a=r,(o=(e=Object.getOwnPropertyDescriptor(a.props,"ref")?.get)&&"isReactWarning"in e&&e.isReactWarning)?a.ref:(o=(e=Object.getOwnPropertyDescriptor(a,"ref")?.get)&&"isReactWarning"in e&&e.isReactWarning)?a.props.ref:a.props.ref||a.ref),l=function(e,t){let r={...t};for(let n in t){let s=e[n],i=t[n];/^on[A-Z]/.test(n)?s&&i?r[n]=(...e)=>{i(...e),s(...e)}:s&&(r[n]=s):"style"===n?r[n]={...s,...i}:"className"===n&&(r[n]=[s,i].filter(Boolean).join(" "))}return{...e,...r}}(i,r.props);return r.type!==n.Fragment&&(l.ref=t?(0,s.t)(t,u):u),n.cloneElement(r,l)}return n.Children.count(r)>1?n.Children.only(null):null});return t.displayName=`${e}.SlotClone`,t}(e),r=n.forwardRef((e,r)=>{let{children:s,...a}=e,o=n.Children.toArray(s),u=o.find(l);if(u){let e=u.props.children,s=o.map(t=>t!==u?t:n.Children.count(e)>1?n.Children.only(null):n.isValidElement(e)?e.props.children:null);return(0,i.jsx)(t,{...a,ref:r,children:n.isValidElement(e)?n.cloneElement(e,void 0,s):null})}return(0,i.jsx)(t,{...a,ref:r,children:s})});return r.displayName=`${e}.Slot`,r}var o=a("Slot"),u=Symbol("radix.slottable");function l(e){return n.isValidElement(e)&&"function"==typeof e.type&&"__radixId"in e.type&&e.type.__radixId===u}}}]);