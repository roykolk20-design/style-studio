var js=Object.defineProperty;var Ns=(o,e,t)=>e in o?js(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var g=(o,e,t)=>Ns(o,typeof e!="symbol"?e+"":e,t);var ze=globalThis,Oe=ze.ShadowRoot&&(ze.ShadyCSS===void 0||ze.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ze=Symbol(),xt=new WeakMap,ae=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==Ze)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(Oe&&e===void 0){let s=t!==void 0&&t.length===1;s&&(e=xt.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&xt.set(t,e))}return e}toString(){return this.cssText}},$t=o=>new ae(typeof o=="string"?o:o+"",void 0,Ze),v=(o,...e)=>{let t=o.length===1?o[0]:e.reduce((s,a,i)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+o[i+1],o[0]);return new ae(t,o,Ze)},yt=(o,e)=>{if(Oe)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let s=document.createElement("style"),a=ze.litNonce;a!==void 0&&s.setAttribute("nonce",a),s.textContent=t.cssText,o.appendChild(s)}},Qe=Oe?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(let s of e.cssRules)t+=s.cssText;return $t(t)})(o):o;var{is:Ds,defineProperty:Ps,getOwnPropertyDescriptor:Hs,getOwnPropertyNames:Ms,getOwnPropertySymbols:Bs,getPrototypeOf:Ls}=Object,Te=globalThis,kt=Te.trustedTypes,Rs=kt?kt.emptyScript:"",Ws=Te.reactiveElementPolyfillSupport,ie=(o,e)=>o,Xe={toAttribute(o,e){switch(e){case Boolean:o=o?Rs:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},At=(o,e)=>!Ds(o,e),St={attribute:!0,type:String,converter:Xe,reflect:!1,useDefault:!1,hasChanged:At};Symbol.metadata??=Symbol("metadata"),Te.litPropertyMetadata??=new WeakMap;var z=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=St){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let s=Symbol(),a=this.getPropertyDescriptor(e,s,t);a!==void 0&&Ps(this.prototype,e,a)}}static getPropertyDescriptor(e,t,s){let{get:a,set:i}=Hs(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get:a,set(r){let l=a?.call(this);i?.call(this,r),this.requestUpdate(e,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??St}static _$Ei(){if(this.hasOwnProperty(ie("elementProperties")))return;let e=Ls(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(ie("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ie("properties"))){let t=this.properties,s=[...Ms(t),...Bs(t)];for(let a of s)this.createProperty(a,t[a])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[s,a]of t)this.elementProperties.set(s,a)}this._$Eh=new Map;for(let[t,s]of this.elementProperties){let a=this._$Eu(t,s);a!==void 0&&this._$Eh.set(a,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let s=new Set(e.flat(1/0).reverse());for(let a of s)t.unshift(Qe(a))}else e!==void 0&&t.push(Qe(e));return t}static _$Eu(e,t){let s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return yt(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){let s=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,s);if(a!==void 0&&s.reflect===!0){let i=(s.converter?.toAttribute!==void 0?s.converter:Xe).toAttribute(t,s.type);this._$Em=e,i==null?this.removeAttribute(a):this.setAttribute(a,i),this._$Em=null}}_$AK(e,t){let s=this.constructor,a=s._$Eh.get(e);if(a!==void 0&&this._$Em!==a){let i=s.getPropertyOptions(a),r=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:Xe;this._$Em=a;let l=r.fromAttribute(t,i.type);this[a]=l??this._$Ej?.get(a)??l,this._$Em=null}}requestUpdate(e,t,s,a=!1,i){if(e!==void 0){let r=this.constructor;if(a===!1&&(i=this[e]),s??=r.getPropertyOptions(e),!((s.hasChanged??At)(i,t)||s.useDefault&&s.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:a,wrapped:i},r){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),i!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),a===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[a,i]of this._$Ep)this[a]=i;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[a,i]of s){let{wrapped:r}=i,l=this[a];r!==!0||this._$AL.has(a)||l===void 0||this.C(a,void 0,i,l)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};z.elementStyles=[],z.shadowRootOptions={mode:"open"},z[ie("elementProperties")]=new Map,z[ie("finalized")]=new Map,Ws?.({ReactiveElement:z}),(Te.reactiveElementVersions??=[]).push("2.1.2");var tt=globalThis,Ct=o=>o,je=tt.trustedTypes,Et=je?je.createPolicy("lit-html",{createHTML:o=>o}):void 0,st="$lit$",O=`lit$${Math.random().toFixed(9).slice(2)}$`,at="?"+O,Us=`<${at}>`,L=document,re=()=>L.createComment(""),ne=o=>o===null||typeof o!="object"&&typeof o!="function",it=Array.isArray,Dt=o=>it(o)||typeof o?.[Symbol.iterator]=="function",et=`[ 	
\f\r]`,oe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,zt=/-->/g,Ot=/>/g,M=RegExp(`>|${et}(?:([^\\s"'>=/]+)(${et}*=${et}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Tt=/'/g,jt=/"/g,Pt=/^(?:script|style|textarea|title)$/i,ot=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),n=ot(1),ya=ot(2),ka=ot(3),k=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),Nt=new WeakMap,B=L.createTreeWalker(L,129);function Ht(o,e){if(!it(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return Et!==void 0?Et.createHTML(e):e}var Mt=(o,e)=>{let t=o.length-1,s=[],a,i=e===2?"<svg>":e===3?"<math>":"",r=oe;for(let l=0;l<t;l++){let c=o[l],h,_,p=-1,m=0;for(;m<c.length&&(r.lastIndex=m,_=r.exec(c),_!==null);)m=r.lastIndex,r===oe?_[1]==="!--"?r=zt:_[1]!==void 0?r=Ot:_[2]!==void 0?(Pt.test(_[2])&&(a=RegExp("</"+_[2],"g")),r=M):_[3]!==void 0&&(r=M):r===M?_[0]===">"?(r=a??oe,p=-1):_[1]===void 0?p=-2:(p=r.lastIndex-_[2].length,h=_[1],r=_[3]===void 0?M:_[3]==='"'?jt:Tt):r===jt||r===Tt?r=M:r===zt||r===Ot?r=oe:(r=M,a=void 0);let u=r===M&&o[l+1].startsWith("/>")?" ":"";i+=r===oe?c+Us:p>=0?(s.push(h),c.slice(0,p)+st+c.slice(p)+O+u):c+O+(p===-2?l:u)}return[Ht(o,i+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},le=class o{constructor({strings:e,_$litType$:t},s){let a;this.parts=[];let i=0,r=0,l=e.length-1,c=this.parts,[h,_]=Mt(e,t);if(this.el=o.createElement(h,s),B.currentNode=this.el.content,t===2||t===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(a=B.nextNode())!==null&&c.length<l;){if(a.nodeType===1){if(a.hasAttributes())for(let p of a.getAttributeNames())if(p.endsWith(st)){let m=_[r++],u=a.getAttribute(p).split(O),b=/([.?@])?(.*)/.exec(m);c.push({type:1,index:i,name:b[2],strings:u,ctor:b[1]==="."?De:b[1]==="?"?Pe:b[1]==="@"?He:W}),a.removeAttribute(p)}else p.startsWith(O)&&(c.push({type:6,index:i}),a.removeAttribute(p));if(Pt.test(a.tagName)){let p=a.textContent.split(O),m=p.length-1;if(m>0){a.textContent=je?je.emptyScript:"";for(let u=0;u<m;u++)a.append(p[u],re()),B.nextNode(),c.push({type:2,index:++i});a.append(p[m],re())}}}else if(a.nodeType===8)if(a.data===at)c.push({type:2,index:i});else{let p=-1;for(;(p=a.data.indexOf(O,p+1))!==-1;)c.push({type:7,index:i}),p+=O.length-1}i++}}static createElement(e,t){let s=L.createElement("template");return s.innerHTML=e,s}};function R(o,e,t=o,s){if(e===k)return e;let a=s!==void 0?t._$Co?.[s]:t._$Cl,i=ne(e)?void 0:e._$litDirective$;return a?.constructor!==i&&(a?._$AO?.(!1),i===void 0?a=void 0:(a=new i(o),a._$AT(o,t,s)),s!==void 0?(t._$Co??=[])[s]=a:t._$Cl=a),a!==void 0&&(e=R(o,a._$AS(o,e.values),a,s)),e}var Ne=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:s}=this._$AD,a=(e?.creationScope??L).importNode(t,!0);B.currentNode=a;let i=B.nextNode(),r=0,l=0,c=s[0];for(;c!==void 0;){if(r===c.index){let h;c.type===2?h=new F(i,i.nextSibling,this,e):c.type===1?h=new c.ctor(i,c.name,c.strings,this,e):c.type===6&&(h=new Me(i,this,e)),this._$AV.push(h),c=s[++l]}r!==c?.index&&(i=B.nextNode(),r++)}return B.currentNode=L,a}p(e){let t=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}},F=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,a){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=R(this,e,t),ne(e)?e===d||e==null||e===""?(this._$AH!==d&&this._$AR(),this._$AH=d):e!==this._$AH&&e!==k&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Dt(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==d&&ne(this._$AH)?this._$AA.nextSibling.data=e:this.T(L.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:s}=e,a=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=le.createElement(Ht(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===a)this._$AH.p(t);else{let i=new Ne(a,this),r=i.u(this.options);i.p(t),this.T(r),this._$AH=i}}_$AC(e){let t=Nt.get(e.strings);return t===void 0&&Nt.set(e.strings,t=new le(e)),t}k(e){it(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,s,a=0;for(let i of e)a===t.length?t.push(s=new o(this.O(re()),this.O(re()),this,this.options)):s=t[a],s._$AI(i),a++;a<t.length&&(this._$AR(s&&s._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let s=Ct(e).nextSibling;Ct(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},W=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,a,i){this.type=1,this._$AH=d,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=i,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=d}_$AI(e,t=this,s,a){let i=this.strings,r=!1;if(i===void 0)e=R(this,e,t,0),r=!ne(e)||e!==this._$AH&&e!==k,r&&(this._$AH=e);else{let l=e,c,h;for(e=i[0],c=0;c<i.length-1;c++)h=R(this,l[s+c],t,c),h===k&&(h=this._$AH[c]),r||=!ne(h)||h!==this._$AH[c],h===d?e=d:e!==d&&(e+=(h??"")+i[c+1]),this._$AH[c]=h}r&&!a&&this.j(e)}j(e){e===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},De=class extends W{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===d?void 0:e}},Pe=class extends W{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==d)}},He=class extends W{constructor(e,t,s,a,i){super(e,t,s,a,i),this.type=5}_$AI(e,t=this){if((e=R(this,e,t,0)??d)===k)return;let s=this._$AH,a=e===d&&s!==d||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,i=e!==d&&(s===d||a);a&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Me=class{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){R(this,e)}},Bt={M:st,P:O,A:at,C:1,L:Mt,R:Ne,D:Dt,V:R,I:F,H:W,N:Pe,U:He,B:De,F:Me},Vs=tt.litHtmlPolyfillSupport;Vs?.(le,F),(tt.litHtmlVersions??=[]).push("3.3.3");var Lt=(o,e,t)=>{let s=t?.renderBefore??e,a=s._$litPart$;if(a===void 0){let i=t?.renderBefore??null;s._$litPart$=a=new F(e.insertBefore(re(),i),i,void 0,t??{})}return a._$AI(o),a};var rt=globalThis,$=class extends z{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Lt(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return k}};$._$litElement$=!0,$.finalized=!0,rt.litElementHydrateSupport?.({LitElement:$});var Gs=rt.litElementPolyfillSupport;Gs?.({LitElement:$});(rt.litElementVersions??=[]).push("4.2.2");var T={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Be=o=>(...e)=>({_$litDirective$:o,values:e}),J=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,s){this._$Ct=e,this._$AM=t,this._$Ci=s}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};var{I:Is}=Bt,Rt=o=>o;var Ut=o=>o.strings===void 0,Wt=()=>document.createComment(""),q=(o,e,t)=>{let s=o._$AA.parentNode,a=e===void 0?o._$AB:e._$AA;if(t===void 0){let i=s.insertBefore(Wt(),a),r=s.insertBefore(Wt(),a);t=new Is(i,r,o,o.options)}else{let i=t._$AB.nextSibling,r=t._$AM,l=r!==o;if(l){let c;t._$AQ?.(o),t._$AM=o,t._$AP!==void 0&&(c=o._$AU)!==r._$AU&&t._$AP(c)}if(i!==a||l){let c=t._$AA;for(;c!==i;){let h=Rt(c).nextSibling;Rt(s).insertBefore(c,a),c=h}}}return t},N=(o,e,t=o)=>(o._$AI(e,t),o),Ks={},Le=(o,e=Ks)=>o._$AH=e,Vt=o=>o._$AH,Re=o=>{o._$AR(),o._$AA.remove()};var A=Be(class extends J{constructor(o){if(super(o),o.type!==T.PROPERTY&&o.type!==T.ATTRIBUTE&&o.type!==T.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ut(o))throw Error("`live` bindings can only contain a single expression")}render(o){return o}update(o,[e]){if(e===k||e===d)return e;let t=o.element,s=o.name;if(o.type===T.PROPERTY){if(e===t[s])return k}else if(o.type===T.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(s))return k}else if(o.type===T.ATTRIBUTE&&t.getAttribute(s)===e+"")return k;return Le(o),e}});var Gt="style-studio-popup-format";function nt(){try{return localStorage.getItem(Gt)!=="legacy"}catch{return!0}}function It(o){try{localStorage.setItem(Gt,o?"standalone":"legacy")}catch{}}function We(o,e,t=nt()){return t?{...o,cards:e}:{type:"vertical-stack",cards:[o,...e]}}function U(o){return o.type==="vertical-stack"?o.cards.slice(1):o.cards??[]}function Kt(o){if(o?.type==="custom:bubble-card"&&o.card_type==="pop-up")return o;let e=o?.type==="vertical-stack"?o.cards?.[0]:null;return e?.type==="custom:bubble-card"&&e.card_type==="pop-up"?e:null}var Fs={title:"Stijl",tab_sidebar:"Zijbalk",tab_themes:"Thema's",tab_rooms:"Kamers en pop-ups",tab_climate:"Klimaat",tab_people:"Per persoon",tab_check:"Controle en herstel",coming:"Dit onderdeel komt in een volgende versie.",glass_intro:"De zijbalk wordt opgemaakt door de uitbreiding Glass Sidebar. Hier stel je die in; wijzigingen gelden voor iedereen en verschijnen direct. De kleuren van de zijbalk stel je in bij Thema's.",glass_missing_title:"Uitbreiding: Glass Sidebar",glass_missing:"Met de uitbreiding Glass Sidebar wordt je zijbalk een zwevend glazen paneel, met groepen en kopjes. Installeer hem via HACS en herstart Home Assistant; daarna stel je hem hier in. De kleuren van de zijbalk stel je ook zonder uitbreiding in bij Thema's.",glass_not_added_title:"Glass Sidebar is ge\xEFnstalleerd",glass_not_added:"Voeg hem nog toe: Instellingen \u203A Apparaten en diensten \u203A Integratie toevoegen \u203A Glass Sidebar. Daarna stel je hem hier in.",glass_not_loaded:"Glass Sidebar is uitgeschakeld of niet geladen. Je kunt instellingen opslaan, maar je ziet ze pas als Glass Sidebar weer draait.",glass_old:"Je hebt Glass Sidebar {version}. Style Studio is gemaakt voor {min} of nieuwer; werk Glass Sidebar bij via HACS. Opties die jouw versie nog niet kent, doen niets.",open_glass:"Alle instellingen van Glass Sidebar openen",open_glass_hint:"Daar staan ook stijlen, tint, iconen per groep, het snelmenu en meer telefoonopties. Hier stel je de basis in.",shape:"Vorm",floating:"Zwevend",floating_hint:"Een losse balk met ruimte eromheen.",inset:"Afstand tot de rand",radius:"Hoeken",glass:"Glas",blur:"Vervaging",opacity:"Dekking",opacity_hint:"Lager is meer doorzichtig.",glass_cards:"Glazen dashboardkaarten",glass_cards_hint:"Kaarten worden doorschijnend. Kan zwaar zijn op oudere tablets.",active:"Actieve pagina",highlight_soft:"Zacht",highlight_vivid:"Vol",own_accent:"Eigen kleur",own_accent_hint:"Uit: de kleur van het thema.",motion:"Iconen bewegen bij aanwijzen",phone:"Telefoon",phone_hint:"Voor schermen tot 600 pixels breed.",mobile_width:"Breedte van het menu",mobile_text_size:"Tekstgrootte",mobile_blur:"Pagina achter het menu vervagen",groups:"Groepen",groups_hint:"Sleep items naar een groep, of tik een item aan en kies Hierheen. Items zonder groep staan bovenaan.",ungrouped:"Zonder groep",ungrouped_hint:"Staan bovenaan, in de volgorde van Home Assistant.",add_group:"Groep toevoegen",new_group:"Nieuwe groep",group_name:"Naam van de groep",move_here:"Hierheen",move_up:"Omhoog",move_down:"Omlaag",move_left:"Naar voren",move_right:"Naar achteren",remove_group:"Groep verwijderen",remove_group_confirm:"Verwijderen? De items gaan terug naar Zonder groep.",hide:"Verbergen",show:"Tonen",missing:"niet gevonden",empty_group:"Sleep items hierheen.",preview:"Voorbeeld",preview_hint:"Wordt pas echt toegepast als je opslaat.",device_phone:"Telefoon",device_tablet:"Tablet",device_desktop:"Pc",page_light:"Lichte pagina",page_dark:"Donkere pagina",expanded:"Uitgeklapt",unsaved:"Niet opgeslagen wijzigingen",cancel:"Annuleren",save:"Opslaan",saved:"Opgeslagen",undo:"Vorige versie terugzetten",undo_confirm:"De instellingen van voor de laatste keer opslaan komen terug. Doorgaan?",undone:"Vorige versie teruggezet",nothing_to_undo:"Er is geen vorige versie",yes:"Ja",no:"Nee",discard_confirm:"Je hebt wijzigingen die niet zijn opgeslagen. Weggooien?",error:"Er ging iets mis: {message}",themes_intro:"Bepaal elke kleur in Home Assistant: menu, bovenbalk, kaarten, pop-ups, vensters, schakelaars en meer. Begin met een paar basiskleuren; de rest rekent Style Studio uit. Onder Alles aanpassen kun je elke kleur apart zetten.",your_themes:"Je thema's",new_theme:"Nieuw thema",start_from:"Begin met",start_current:"Je huidige thema",or_preset:"Of kies een voorgemaakte stijl:",my_theme:"Mijn thema",fixed_colors:"{count} kleuren komen vast uit het gekopieerde thema en volgen Snel niet.",follow_quick:"Laat alles Snel volgen",copy_existing:"Of kopieer een bestaand thema",pick_theme:"Kies een thema",copy_suffix:"kopie",theme_name:"Naam",badge_default:"standaard",badge_not_loaded:"niet geladen",quick:"Snel",quick_hint:"Hieruit worden alle andere kleuren berekend.",c_background:"Achtergrond",c_card:"Kaarten",c_text:"Tekst",c_accent:"Accent (actief, knoppen, schakelaars)",c_sidebar:"Zijbalk",c_icons:"Iconen",c_icons_hint:"Uit: een rustige tint van je accentkleur. Nooit meer het standaardblauw.",c_icons_own:"Eigen kleur voor iconen",c_header:"Bovenbalk",header_same:"Bovenbalk zelfde kleur als de achtergrond",corners:"Hoeken van kaarten",shadow:"Schaduw",shadow_none:"Geen",shadow_soft:"Zacht",shadow_strong:"Sterk",card_opacity:"Dekking van kaarten",card_opacity_hint:"Lager laat de achtergrond door de kaarten heen zien.",popups:"Pop-ups",popup_solid:"Ondoorzichtig",popup_glass:"Glas",popup_opacity:"Dekking van pop-ups",all_vars:"Alles aanpassen",all_vars_hint:"Leeg veld: de berekende kleur (grijs). Je mag elke CSS-waarde gebruiken, ook rgba() of een verloop. Een paar plekken in de instellingen van Home Assistant hebben vaste kleuren en volgen geen thema.",reset:"Terug naar berekend",custom_vars:"Eigen variabelen",custom_vars_hint:"Voor variabelen die hierboven niet staan, bijvoorbeeld van een andere kaart.",var_name:"Naam, zonder --",var_value:"Waarde",add_var:"Toevoegen",remove:"Verwijderen",whole_screen:"Ook tonen op dit hele scherm",whole_screen_hint:"Alleen in deze browser, tot je opslaat of annuleert.",show_popup:"Pop-up tonen",delete_theme:"Thema verwijderen",delete_confirm:"Thema {name} verwijderen? Je kunt het daarna nog terugzetten.",deleted:"Verwijderd",set_default:"Standaard voor iedereen",set_default_hint:"Voor iedereen die in het profiel geen eigen thema koos.",default_set:"{name} is nu het standaardthema",is_default:"Dit is het standaardthema",saved_theme:"Opgeslagen. Kies het in je profiel, of gebruik Voor mij gebruiken.",use_for_me:"Voor mij gebruiken",using_now:"Dit scherm gebruikt nu {name}",warn_not_loaded:"Home Assistant heeft dit thema niet geladen. Zet in configuration.yaml: frontend: themes: !include_dir_merge_named themes, en herstart Home Assistant.",err_file_exists:"themes/style_studio.yaml bestaat al en is niet door Style Studio gemaakt. Hernoem of verwijder dat bestand eerst.",err_name_taken:"Er is al een thema met deze naam.",err_reload_failed:"Home Assistant kon de thema's niet laden ({message}). Je vorige thema's staan weer terug.",err_bad_name:"Gebruik in de naam alleen letters, cijfers, spaties en - _ ( ) & + '.",people_not_loaded:"Deze thema's van Style Studio staan hier niet, omdat Home Assistant ze niet geladen heeft: {names}. Kijk bij Controle en herstel.",pv_title:"Thuis",pv_tab2:"Kamers",pv_living:"Woonkamer",pv_lights:"3 lampen aan",pv_kitchen:"Keuken",pv_off:"Uit",pv_climate:"Airco",pv_weather:"Zonnig, 21\xB0",pv_switch:"Ventilator",pv_popup:"Woonkamer",people_intro:"Geef iedereen een eigen thema en zijbalkvolgorde. Het wordt toegepast als die persoon Home Assistant opent, op elk apparaat \xE9\xE9n keer; daarna kan diegene in het profiel nog zelf iets anders kiezen.",person_theme:"Thema",person_sidebar:"Zijbalk (volgorde en verborgen items)",self_choice:"Zelf kiezen",like_person:"Zoals {name} nu",copy_all_from:"Alles kopi\xEBren van",pick_person:"Kies een persoon",now_uses:"Gebruikt nu: {value}",ha_default:"standaard",unknown:"onbekend",hidden_count:"{count} verborgen",order_count:"{count} in eigen volgorde",applied:"Toegepast",pending:"Wordt toegepast als {name} Home Assistant opent",never_seen:"Nog niet gezien sinds Style Studio er is",last_seen:"Laatst gezien {when}",devices:"{count} apparaten",device_one:"1 apparaat",app_badge:"app",no_themes_yet:"Er zijn nog geen thema's geladen. Maak er eerst een bij Thema's.",climate_intro:"Maak per airco een pop-up met temperatuur, standen, ventilator en zwenken. Je ziet het voorbeeld eerst; pas daarna zet Style Studio het op een dashboard, met eerst een back-up van dat dashboard.",no_climate:"Er zijn geen klimaat-apparaten (climate.*) gevonden.",cl_popup:"Pop-up",cl_name:"Naam",cl_hash:"Adres (#)",cl_hash_hint:"Openen met een knop of link naar dit adres, bijvoorbeeld /lovelace/0{hash}.",cl_parts:"Onderdelen",cl_temperature:"Temperatuur met min en plus",cl_temperature_hint:"Van {min}\xB0 tot {max}\xB0, stap {step}\xB0.",cl_modes:"Standen",cl_fan:"Ventilator",cl_fan_none:"Deze airco geeft geen ventilatorstanden door.",cl_swing_title:"Zwenken",cl_swing_v:"Omhoog/omlaag zwenken",cl_swing_h:"Links/rechts zwenken",cl_swing_none:"Deze airco geeft dit niet door als aan/uit.",cl_louvers:"Lamelstanden (de pijltjes in de app van de fabrikant) geeft deze integratie niet door aan Home Assistant. Die kun je hier dus niet instellen.",cl_place:"Op een dashboard zetten",cl_dashboard:"Dashboard",cl_view:"Weergave",cl_opener:"Ook een knop in de weergave die de pop-up opent",cl_add:"Op dashboard zetten",cl_add_confirm:"Pop-up {hash} op {view} zetten? Er gaat eerst een back-up van dit dashboard naar style_studio/backups. Een eerdere pop-up met hetzelfde adres wordt vervangen.",cl_added:"Op {view} gezet ({replaced} vervangen). Back-up gemaakt.",cl_readonly:"Dit dashboard staat in YAML-modus; Style Studio kan het niet aanpassen. Kopieer de kaartcode hieronder.",cl_panel_view:"Deze weergave heeft maar \xE9\xE9n kaart (paneelmodus); kies een andere.",cl_code:"Kaartcode",cl_code_hint:"Plakken in een handmatige kaart, als je het zelf wilt plaatsen.",copy:"Kopi\xEBren",copied:"Gekopieerd",needs_cards:"Nodig via HACS: {cards}. Zonder deze kaarten werkt de pop-up niet; het voorbeeld hieronder is een tekening.",preview_drawing:"Tekening van het resultaat",preview_real:"Echte kaarten; de knoppen werken echt",cl_section:"Airco",cl_now_label:"Nu",mode_off:"Uit",mode_cool:"Koel",mode_heat:"Warm",mode_auto:"Auto",mode_dry:"Droog",mode_fan_only:"Fan",mode_heat_cool:"Koel/warm",fan_auto:"Auto",fan_low:"Laag",fan_medium:"Midden",fan_middle:"Midden",fan_high:"Hoog",rooms_intro:"Maak en bewerk kamertegels met een pop-up, en andere kaarten, op je eigen dashboards. Kies een dashboard: Style Studio vindt de kamers die er al op staan, ook als je ze zelf gemaakt hebt. Elke wijziging zie je eerst in het voorbeeld, en er gaat altijd eerst een back-up van het dashboard naar style_studio/backups.",pf_title:"Pop-up-vorm",pf_hint:"Bubble Card 3.2 en nieuwer gebruikt een nieuwe vorm. Oude pop-ups werken daar nog, met een melding om ze om te zetten.",pf_new:"Nieuw (3.2+)",pf_old:"Oud",rm_view_intro:"Of maak in \xE9\xE9n keer een complete weergave, met een kolom per verdieping uit je ruimtes. Je andere weergaven blijven zoals ze zijn.",rm_whole_view:"Complete weergave maken",rm_add_room:"Kamer toevoegen",rm_design:"Opmaak",rm_like:"Zoals {name}",rm_standard:"Standaard van Style Studio",rm_new_room:"Nieuwe kamer",rm_room:"Kamer",rm_from_area:"uit je ruimtes",rm_lights_pick:"Lampen",rm_filter:"Zoeken",rm_climate_pick:"Airco in de pop-up",rm_no_climate:"Geen",rm_where:"Plaats",rm_section:"Sectie",rm_is_at:"Staat op {view} \u203A {section}",rm_keeps_design:"Je eigen opmaak blijft: alleen naam, icoon, lampen en airco worden aangepast.",rm_put:"Op dashboard zetten",rm_update:"Wijzigingen opslaan",rm_put_confirm:"Kamer {name} op {view} \u203A {section} zetten? Eerst gaat er een back-up van het dashboard naar style_studio/backups.",rm_update_confirm:"Kamer {name} op het dashboard aanpassen? Alleen naam, icoon, lampen en airco veranderen. Eerst gaat er een back-up naar style_studio/backups.",rm_put_done:"Op het dashboard gezet. Back-up gemaakt.",rm_update_done:"Aangepast. Back-up gemaakt.",rm_hash_taken:"Er staat al een kamer met adres {hash} op dit dashboard; kies een andere naam.",rm_no_rooms_found:"Nog geen kamers met pop-up op dit dashboard.",oc_title:"Andere kaarten",oc_hint:"Kaarten van Home Assistant zelf: ze volgen je thema en hebben niets uit HACS nodig.",oc_greeting:"Groet",oc_scenes:"Sc\xE8nes",oc_status:"Huisstatus",oc_weather:"Weer",oc_no_scenes:"Geen sc\xE8nes gevonden.",oc_no_weather:"Geen weer-entiteit gevonden.",oc_add:"Toevoegen",oc_add_confirm:"{card} toevoegen aan {view} \u203A {section}? Eerst gaat er een back-up van het dashboard naar style_studio/backups.",oc_added:"Toegevoegd. Back-up gemaakt.",no_areas:"Er zijn nog geen ruimtes. Maak ze in Instellingen \u203A Ruimtes, labels en zones, en wijs je lampen toe.",rm_view:"Weergave",rm_title:"Titel",rm_path:"Adres",rm_popups:"Pop-ups",rm_solid:"Ondoorzichtig",rm_glass:"Glas",rm_opacity:"Dekking",rm_width:"Breedte op de pc",rm_height:"Ruimte boven de pop-up op de telefoon",rm_header:"Kopknoppen tonen",rm_other:"Overig",rm_lights:"{count} lampen",rm_light_one:"1 lamp",rm_no_lights:"geen lampen",rm_include:"Meenemen",rm_climate:"Airco-knop",rm_climate_hint:"Opent {hash}; maak die pop-up bij Klimaat.",rm_icon:"Icoon (mdi:\u2026)",rm_create:"Weergave maken",rm_create_confirm:"Weergave {title} maken op dit dashboard? Er gaat eerst een back-up van het dashboard naar style_studio/backups.",rm_replace_confirm:"Weergave {title} bestaat al en wordt vervangen. Er gaat eerst een back-up van het dashboard naar style_studio/backups. Doorgaan?",rm_created:"Weergave {title} gemaakt. Open het dashboard om hem te zien.",rm_pick_room:"Tik op een kamer in het voorbeeld om de pop-up te zien.",rm_on:"aan",rm_off:"Uit",rm_climate_label:"Airco",check_intro:"Hier vind je wat het uiterlijk in de weg kan zitten, en zet je eerdere versies terug. Er wordt niets veranderd zonder dat je het bevestigt.",ck_checks:"Controle",ck_again:"Opnieuw controleren",ck_ok:"In orde",ck_cardmod_sidebar:"Thema {theme} maakt met card-mod de zijbalk of de hele app op ({keys}). Dat botst met Glass Sidebar. Haal die regels uit het thema.",ck_cardmod_other:"Thema {theme} gebruikt card-mod ({keys}). Dat werkt naast Style Studio, maar die stijlen volgen de kleuren hier niet.",ck_no_cardmod:"Geen card-mod-stijlen voor de zijbalk in de thema's die in gebruik zijn.",ck_cardmod_handled:"Thema {theme} maakt ook de zijbalk op met card-mod. Glass Sidebar zet dat deel uit; de rest van het thema werkt gewoon.",ck_cardmod_unused:"{count} andere ge\xEFnstalleerde thema's gebruiken card-mod, maar niemand gebruikt ze nu: {names}.",ck_cardmod_unused_one:"Nog een ge\xEFnstalleerd thema gebruikt card-mod, maar niemand gebruikt het nu: {names}.",ck_devices_none_old:"Geen apparaat gebruikt na de update nog oude bestanden.",ck_devices_waiting:"Nog niet geopend sinds de update naar {version}; ze laden de nieuwe bestanden vanzelf zodra Home Assistant opent:",ck_browser_mod:"Browser Mod denkt in deze browser dat hij het standaarddashboard beheert (default_dashboard_plugin_conflict).",ck_browser_mod_ok:"Geen Browser Mod-conflict in deze browser.",ck_fix:"Oplossen",ck_fix_confirm:"De instelling isDefaultPanelManaged uit deze browser verwijderen?",ck_fixed:"Opgelost. Herlaad de pagina.",ck_not_loaded:"Thema's die Home Assistant niet laadt: {names}. Zet in configuration.yaml: frontend: themes: !include_dir_merge_named themes.",ck_loaded:"Alle thema's van Style Studio zijn geladen.",ck_devices_ok:"Alle apparaten gebruiken versie {version}.",ck_devices_old:"Deze apparaten openden Home Assistant na de update, maar gebruiken nog oude bestanden:",ck_device:"{user} \xB7 {kind} \xB7 {version} \xB7 {when}",ck_app:"Companion-app",ck_browser:"browser",ck_app_cache:"In de Companion-app: Instellingen \u203A Companion-app \u203A Probleemoplossing \u203A Frontend-cache wissen. In een browser: herladen.",ck_fixed_styles:"Vaste kleuren en rondingen in dashboards",ck_fixed_hint:"Kleuren en rondingen die in een kaart zelf staan, volgen geen thema. Daarom lijkt een thema op sommige dashboards niets te doen. Style Studio stelt per waarde een themavariabele voor; de oude waarde blijft als reserve.",ck_scan:"Dashboards doorzoeken",ck_none_found:"Geen vaste kleuren of rondingen gevonden.",ck_found:"{count} plekken",ck_found_one:"1 plek",ck_no_suggestion:"geen themakleur met deze waarde",ck_apply:"Gekozen voorstellen toepassen",ck_apply_confirm:"{count} waarden in dashboard {name} vervangen? Er gaat eerst een back-up naar style_studio/backups; je kunt hem hieronder terugzetten.",ck_applied:"Toegepast in {name}. Back-up gemaakt.",ck_backups:"Back-ups en geschiedenis",ck_dashboards:"Dashboards",ck_themes:"Thema's",ck_glass:"Glass Sidebar",ck_people:"Per persoon",ck_nothing:"Nog niets bewaard.",ck_restore:"Terugzetten",ck_restore_confirm:"Deze versie terugzetten? Wat er nu staat, wordt eerst bewaard.",ck_restored:"Teruggezet",warn_old_panel:"Dit scherm gebruikt een oude versie van het paneel ({old}, server {new}). Herlaad de pagina. In de Companion-app: Instellingen \u203A Companion-app \u203A Probleemoplossing \u203A Frontend-cache wissen."},Ft={title:"Style",tab_sidebar:"Sidebar",tab_themes:"Themes",tab_rooms:"Rooms and pop-ups",tab_climate:"Climate",tab_people:"People",tab_check:"Check and restore",coming:"This part comes in a later version.",glass_intro:"The sidebar is styled by the Glass Sidebar add-on. You set it up here; changes apply to everyone and show right away. Sidebar colors are set under Themes.",glass_missing_title:"Add-on: Glass Sidebar",glass_missing:"The Glass Sidebar add-on turns your sidebar into a floating glass panel, with groups and headings. Install it through HACS and restart Home Assistant; then set it up here. Sidebar colors can be set under Themes without the add-on.",glass_not_added_title:"Glass Sidebar is installed",glass_not_added:"Add it too: Settings \u203A Devices & services \u203A Add integration \u203A Glass Sidebar. Then set it up here.",glass_not_loaded:"Glass Sidebar is disabled or not loaded. You can save settings, but you'll only see them once Glass Sidebar runs again.",glass_old:"You have Glass Sidebar {version}. Style Studio is made for {min} or newer; update Glass Sidebar through HACS. Options your version doesn't know do nothing.",open_glass:"Open all Glass Sidebar settings",open_glass_hint:"There you also find styles, tint, icons per group, the quick menu and more phone options. Here you set the basics.",shape:"Shape",floating:"Floating",floating_hint:"A separate panel with space around it.",inset:"Distance to the edge",radius:"Corners",glass:"Glass",blur:"Blur",opacity:"Opacity",opacity_hint:"Lower is more see-through.",glass_cards:"Glass dashboard cards",glass_cards_hint:"Cards become translucent. Can be heavy on older tablets.",active:"Active page",highlight_soft:"Soft",highlight_vivid:"Solid",own_accent:"Own color",own_accent_hint:"Off: the theme's color.",motion:"Icons move on hover",phone:"Phone",phone_hint:"For screens up to 600 pixels wide.",mobile_width:"Menu width",mobile_text_size:"Text size",mobile_blur:"Blur the page behind the menu",groups:"Groups",groups_hint:"Drag items into a group, or tap an item and choose Move here. Items without a group stay at the top.",ungrouped:"No group",ungrouped_hint:"Shown at the top, in Home Assistant's order.",add_group:"Add group",new_group:"New group",group_name:"Group name",move_here:"Move here",move_up:"Up",move_down:"Down",move_left:"Earlier",move_right:"Later",remove_group:"Remove group",remove_group_confirm:"Remove? Its items go back to No group.",hide:"Hide",show:"Show",missing:"not found",empty_group:"Drag items here.",preview:"Preview",preview_hint:"Only applied once you save.",device_phone:"Phone",device_tablet:"Tablet",device_desktop:"Desktop",page_light:"Light page",page_dark:"Dark page",expanded:"Expanded",unsaved:"Unsaved changes",cancel:"Cancel",save:"Save",saved:"Saved",undo:"Restore previous version",undo_confirm:"The settings from before the last save come back. Continue?",undone:"Previous version restored",nothing_to_undo:"There is no previous version",yes:"Yes",no:"No",discard_confirm:"You have unsaved changes. Throw them away?",error:"Something went wrong: {message}",themes_intro:"Set every color in Home Assistant: menu, top bar, cards, pop-ups, dialogs, switches and more. Start with a few base colors; Style Studio works out the rest. Under Change everything you can set each color on its own.",your_themes:"Your themes",new_theme:"New theme",start_from:"Start with",start_current:"Your current theme",or_preset:"Or pick a preset:",my_theme:"My theme",fixed_colors:"{count} colors are fixed from the copied theme and don't follow Quick.",follow_quick:"Let everything follow Quick",copy_existing:"Or copy an existing theme",pick_theme:"Pick a theme",copy_suffix:"copy",theme_name:"Name",badge_default:"default",badge_not_loaded:"not loaded",quick:"Quick",quick_hint:"All other colors are worked out from these.",c_background:"Background",c_card:"Cards",c_text:"Text",c_accent:"Accent (active, buttons, switches)",c_sidebar:"Sidebar",c_icons:"Icons",c_icons_hint:"Off: a calm tone of your accent color. Never the default blue again.",c_icons_own:"Own color for icons",c_header:"Top bar",header_same:"Top bar in the background color",corners:"Card corners",shadow:"Shadow",shadow_none:"None",shadow_soft:"Soft",shadow_strong:"Strong",card_opacity:"Card opacity",card_opacity_hint:"Lower lets the background show through cards.",popups:"Pop-ups",popup_solid:"Solid",popup_glass:"Glass",popup_opacity:"Pop-up opacity",all_vars:"Change everything",all_vars_hint:"Empty field: the worked-out color (grey). Any CSS value works, also rgba() or a gradient. A few places in Home Assistant's settings have fixed colors and don't follow any theme.",reset:"Back to worked-out",custom_vars:"Own variables",custom_vars_hint:"For variables not listed above, for example from another card.",var_name:"Name, without --",var_value:"Value",add_var:"Add",remove:"Remove",whole_screen:"Also show on this whole screen",whole_screen_hint:"Only in this browser, until you save or cancel.",show_popup:"Show pop-up",delete_theme:"Delete theme",delete_confirm:"Delete theme {name}? You can still restore it afterwards.",deleted:"Deleted",set_default:"Default for everyone",set_default_hint:"For everyone who didn't pick a theme in their profile.",default_set:"{name} is now the default theme",is_default:"This is the default theme",saved_theme:"Saved. Pick it in your profile, or use Use for me.",use_for_me:"Use for me",using_now:"This screen now uses {name}",warn_not_loaded:"Home Assistant didn't load this theme. Add to configuration.yaml: frontend: themes: !include_dir_merge_named themes, and restart Home Assistant.",err_file_exists:"themes/style_studio.yaml already exists and wasn't made by Style Studio. Rename or remove that file first.",err_name_taken:"There is already a theme with this name.",err_reload_failed:"Home Assistant couldn't load the themes ({message}). Your previous themes are back.",err_bad_name:"Use only letters, digits, spaces and - _ ( ) & + ' in the name.",people_not_loaded:"These Style Studio themes aren't listed because Home Assistant didn't load them: {names}. See Check and restore.",pv_title:"Home",pv_tab2:"Rooms",pv_living:"Living room",pv_lights:"3 lights on",pv_kitchen:"Kitchen",pv_off:"Off",pv_climate:"Air conditioning",pv_weather:"Sunny, 21\xB0",pv_switch:"Fan",pv_popup:"Living room",people_intro:"Give everyone their own theme and sidebar order. It is applied when that person opens Home Assistant, once on each device; after that they can still pick something else in their profile.",person_theme:"Theme",person_sidebar:"Sidebar (order and hidden items)",self_choice:"Their own choice",like_person:"Like {name} now",copy_all_from:"Copy everything from",pick_person:"Pick a person",now_uses:"Uses now: {value}",ha_default:"default",unknown:"unknown",hidden_count:"{count} hidden",order_count:"{count} in own order",applied:"Applied",pending:"Applied when {name} opens Home Assistant",never_seen:"Not seen since Style Studio was added",last_seen:"Last seen {when}",devices:"{count} devices",device_one:"1 device",app_badge:"app",no_themes_yet:"No themes are loaded yet. Make one under Themes first.",climate_intro:"Make a pop-up per air conditioner with temperature, modes, fan and swing. You see the preview first; only then does Style Studio put it on a dashboard, after a backup of that dashboard.",no_climate:"No climate devices (climate.*) found.",cl_popup:"Pop-up",cl_name:"Name",cl_hash:"Address (#)",cl_hash_hint:"Open it with a button or link to this address, for example /lovelace/0{hash}.",cl_parts:"Parts",cl_temperature:"Temperature with minus and plus",cl_temperature_hint:"From {min}\xB0 to {max}\xB0, step {step}\xB0.",cl_modes:"Modes",cl_fan:"Fan",cl_fan_none:"This air conditioner doesn't report fan modes.",cl_swing_title:"Swing",cl_swing_v:"Swing up/down",cl_swing_h:"Swing left/right",cl_swing_none:"This air conditioner doesn't report this as on/off.",cl_louvers:"Louver positions (the arrows in the manufacturer's app) aren't passed to Home Assistant by this integration, so they can't be set here.",cl_place:"Put on a dashboard",cl_dashboard:"Dashboard",cl_view:"View",cl_opener:"Also a button in the view that opens the pop-up",cl_add:"Put on dashboard",cl_add_confirm:"Put pop-up {hash} on {view}? A backup of this dashboard goes to style_studio/backups first. An earlier pop-up with the same address is replaced.",cl_added:"Put on {view} ({replaced} replaced). Backup made.",cl_readonly:"This dashboard is in YAML mode; Style Studio can't change it. Copy the card code below.",cl_panel_view:"This view holds a single card (panel mode); pick another one.",cl_code:"Card code",cl_code_hint:"Paste into a manual card if you want to place it yourself.",copy:"Copy",copied:"Copied",needs_cards:"Needed through HACS: {cards}. Without these cards the pop-up doesn't work; the preview below is a drawing.",preview_drawing:"Drawing of the result",preview_real:"Real cards; the buttons really work",cl_section:"Air conditioning",cl_now_label:"Now",mode_off:"Off",mode_cool:"Cool",mode_heat:"Heat",mode_auto:"Auto",mode_dry:"Dry",mode_fan_only:"Fan",mode_heat_cool:"Heat/cool",fan_auto:"Auto",fan_low:"Low",fan_medium:"Medium",fan_middle:"Middle",fan_high:"High",rooms_intro:"Make and edit room tiles with a pop-up, and other cards, on your own dashboards. Pick a dashboard: Style Studio finds the rooms already on it, also ones you made yourself. You see every change in the preview first, and the dashboard is always backed up to style_studio/backups first.",pf_title:"Pop-up format",pf_hint:"Bubble Card 3.2 and newer uses a new format. Old pop-ups still work there, with a notice to migrate them.",pf_new:"New (3.2+)",pf_old:"Old",rm_view_intro:"Or make a whole view at once, with a column per floor from your areas. Your other views stay as they are.",rm_whole_view:"Make a whole view",rm_add_room:"Add room",rm_design:"Design",rm_like:"Like {name}",rm_standard:"Style Studio's own",rm_new_room:"New room",rm_room:"Room",rm_from_area:"from your areas",rm_lights_pick:"Lights",rm_filter:"Search",rm_climate_pick:"Air conditioning in the pop-up",rm_no_climate:"None",rm_where:"Place",rm_section:"Section",rm_is_at:"On {view} \u203A {section}",rm_keeps_design:"Your own design stays: only name, icon, lights and air conditioning change.",rm_put:"Put on dashboard",rm_update:"Save changes",rm_put_confirm:"Put room {name} on {view} \u203A {section}? The dashboard is backed up to style_studio/backups first.",rm_update_confirm:"Change room {name} on the dashboard? Only name, icon, lights and air conditioning change. A backup goes to style_studio/backups first.",rm_put_done:"Put on the dashboard. Backup made.",rm_update_done:"Changed. Backup made.",rm_hash_taken:"This dashboard already has a room with address {hash}; pick another name.",rm_no_rooms_found:"No rooms with a pop-up on this dashboard yet.",oc_title:"Other cards",oc_hint:"Home Assistant's own cards: they follow your theme and need nothing from HACS.",oc_greeting:"Greeting",oc_scenes:"Scenes",oc_status:"House status",oc_weather:"Weather",oc_no_scenes:"No scenes found.",oc_no_weather:"No weather entity found.",oc_add:"Add",oc_add_confirm:"Add {card} to {view} \u203A {section}? The dashboard is backed up to style_studio/backups first.",oc_added:"Added. Backup made.",no_areas:"There are no areas yet. Make them under Settings \u203A Areas, labels & zones, and assign your lights.",rm_view:"View",rm_title:"Title",rm_path:"Address",rm_popups:"Pop-ups",rm_solid:"Solid",rm_glass:"Glass",rm_opacity:"Opacity",rm_width:"Width on desktop",rm_height:"Space above the pop-up on phones",rm_header:"Show header buttons",rm_other:"Other",rm_lights:"{count} lights",rm_light_one:"1 light",rm_no_lights:"no lights",rm_include:"Include",rm_climate:"Air conditioning button",rm_climate_hint:"Opens {hash}; make that pop-up under Climate.",rm_icon:"Icon (mdi:\u2026)",rm_create:"Make view",rm_create_confirm:"Make view {title} on this dashboard? A backup of the dashboard goes to style_studio/backups first.",rm_replace_confirm:"View {title} already exists and will be replaced. A backup of the dashboard goes to style_studio/backups first. Continue?",rm_created:"View {title} made. Open the dashboard to see it.",rm_pick_room:"Tap a room in the preview to see its pop-up.",rm_on:"on",rm_off:"Off",rm_climate_label:"Air conditioning",check_intro:"Find what can get in the way of the look, and put back earlier versions. Nothing is changed without your confirmation.",ck_checks:"Checks",ck_again:"Check again",ck_ok:"OK",ck_cardmod_sidebar:"Theme {theme} styles the sidebar or the whole app with card-mod ({keys}). That clashes with Glass Sidebar. Remove those lines from the theme.",ck_cardmod_other:"Theme {theme} uses card-mod ({keys}). That works next to Style Studio, but those styles don't follow the colors here.",ck_no_cardmod:"No card-mod sidebar styles in the themes in use.",ck_cardmod_handled:"Theme {theme} also styles the sidebar with card-mod. Glass Sidebar switches that part off; the rest of the theme just works.",ck_cardmod_unused:"{count} other installed themes use card-mod, but nobody uses them now: {names}.",ck_cardmod_unused_one:"One more installed theme uses card-mod, but nobody uses it now: {names}.",ck_devices_none_old:"No device still uses old files after the update.",ck_devices_waiting:"Not opened since the update to {version}; they load the new files by themselves once Home Assistant opens:",ck_browser_mod:"Browser Mod thinks it manages the default dashboard in this browser (default_dashboard_plugin_conflict).",ck_browser_mod_ok:"No Browser Mod conflict in this browser.",ck_fix:"Fix",ck_fix_confirm:"Remove the isDefaultPanelManaged setting from this browser?",ck_fixed:"Fixed. Reload the page.",ck_not_loaded:"Themes Home Assistant doesn't load: {names}. Add to configuration.yaml: frontend: themes: !include_dir_merge_named themes.",ck_loaded:"All Style Studio themes are loaded.",ck_devices_ok:"All devices run version {version}.",ck_devices_old:"These devices opened Home Assistant after the update but still use old files:",ck_device:"{user} \xB7 {kind} \xB7 {version} \xB7 {when}",ck_app:"Companion app",ck_browser:"browser",ck_app_cache:"In the Companion app: Settings \u203A Companion app \u203A Troubleshooting \u203A Reset frontend cache. In a browser: reload.",ck_fixed_styles:"Fixed colors and corners in dashboards",ck_fixed_hint:"Colors and corners written into a card don't follow any theme. That's why a theme seems to do nothing on some dashboards. Style Studio suggests a theme variable per value; the old value stays as a fallback.",ck_scan:"Search dashboards",ck_none_found:"No fixed colors or corners found.",ck_found:"{count} places",ck_found_one:"1 place",ck_no_suggestion:"no theme color with this value",ck_apply:"Apply chosen suggestions",ck_apply_confirm:"Replace {count} values in dashboard {name}? A backup goes to style_studio/backups first; you can restore it below.",ck_applied:"Applied in {name}. Backup made.",ck_backups:"Backups and history",ck_dashboards:"Dashboards",ck_themes:"Themes",ck_glass:"Glass Sidebar",ck_people:"People",ck_nothing:"Nothing kept yet.",ck_restore:"Restore",ck_restore_confirm:"Restore this version? What is there now is kept first.",ck_restored:"Restored",warn_old_panel:"This screen runs an old version of the panel ({old}, server {new}). Reload the page. In the Companion app: Settings \u203A Companion app \u203A Troubleshooting \u203A Reset frontend cache."};function Ue(o){let e=(o?.locale?.language||o?.language||"nl").startsWith("nl")?Fs:Ft;return(t,s={})=>(e[t]??Ft[t]??t).replace(/\{(\w+)\}/g,(a,i)=>s[i]??"")}var f=class extends ${constructor(){super(),this._busy=!1,this._confirm=null}get t(){return Ue(this.hass)}get dirty(){return!1}_ask(e,t){this._confirm={text:e,action:t}}_showToast(e){this._toast=e,clearTimeout(this._toastTimer),this._toastTimer=setTimeout(()=>this._toast=null,4e3)}_error(e){this._showToast(this.t("error",{message:e?.message??e}))}async _run(e,t){this._busy=!0;try{await e(),t&&this._showToast(t)}catch(s){this._error(s)}finally{this._busy=!1}}_set(){}_warning(e){return n`<div class="warning"><ha-icon icon="mdi:alert-outline"></ha-icon>${e}</div>`}_switch(e,t,s,a){return n`
      <label class="row">
        <span>
          ${s}
          ${a?n`<small>${a}</small>`:d}
        </span>
        <input
          type="checkbox"
          class="switch"
          .checked=${e[t]}
          @change=${i=>this._set(t,i.target.checked)}
        />
      </label>
    `}_slider(e,t,s,a,i,r,l=!1,c){return n`
      <label class="row slider ${l?"off":""}">
        <span>
          ${s}
          ${c?n`<small>${c}</small>`:d}
        </span>
        <span class="inline">
          <input
            type="range"
            min=${a}
            max=${i}
            step="1"
            .value=${String(e[t])}
            ?disabled=${l}
            @input=${h=>this._set(t,Number(h.target.value))}
          />
          <output>${e[t]}${r}</output>
        </span>
      </label>
    `}_segment(e,t,s){return n`
      <div class="segment" role="radiogroup">
        ${s.map(([a,i])=>n`<button
            role="radio"
            aria-checked=${e[t]===a?"true":"false"}
            class=${e[t]===a?"active":""}
            @click=${()=>this._set(t,a)}
          >
            ${i}
          </button>`)}
      </div>
    `}_popupFormat(){let e=nt();return n`
      <div class="row">
        <span>
          ${this.t("pf_title")}
          <small>${this.t("pf_hint")}</small>
        </span>
        <div class="segment small" role="radiogroup">
          ${[[!0,this.t("pf_new")],[!1,this.t("pf_old")]].map(([t,s])=>n`<button
              role="radio"
              aria-checked=${e===t?"true":"false"}
              class=${e===t?"active":""}
              @click=${()=>{It(t),this.requestUpdate()}}
            >
              ${s}
            </button>`)}
        </div>
      </div>
    `}_color(e,t,s,a){return n`
      <label class="row">
        <span>
          ${s}
          ${a?n`<small>${a}</small>`:d}
        </span>
        <input type="color" .value=${e[t]} @input=${i=>this._set(t,i.target.value)} />
      </label>
    `}_bar({left:e=d,onCancel:t,onSave:s,canSave:a=this.dirty}){if(this._confirm){let{text:i,action:r}=this._confirm;return n`
        <footer class="bar">
          <span class="grow">${i}</span>
          <button @click=${()=>this._confirm=null}>${this.t("no")}</button>
          <button
            class="primary"
            @click=${()=>{this._confirm=null,r()}}
          >
            ${this.t("yes")}
          </button>
        </footer>
      `}return e===d&&!this._toast&&!a?d:n`
      <footer class="bar">
        ${e}
        <span class="grow">${this._toast??(this.dirty?this.t("unsaved"):"")}</span>
        ${a?n`
              <button ?disabled=${this._busy} @click=${t}>${this.t("cancel")}</button>
              <button class="primary" ?disabled=${this._busy} @click=${s}>
                ${this.t("save")}
              </button>
            `:d}
      </footer>
    `}};g(f,"properties",{hass:{attribute:!1},narrow:{type:Boolean},_busy:{state:!0},_toast:{state:!0},_confirm:{state:!0}}),g(f,"styles",v`
    :host {
      display: block;
    }

    button {
      font: inherit;
      color: inherit;
      background: none;
      border: 0;
      cursor: pointer;
    }

    button:disabled {
      cursor: default;
      opacity: 0.5;
    }

    .primary {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
      border-radius: 999px;
      padding: 8px 18px;
      font-weight: 500;
    }

    .warning {
      display: flex;
      gap: 10px;
      align-items: flex-start;
      padding: 12px 14px;
      margin-bottom: 12px;
      border-radius: var(--ss-radius, 12px);
      background: color-mix(in srgb, var(--warning-color, #ffa600) 16%, var(--card-background-color));
      line-height: 1.4;
    }

    .warning ha-icon {
      color: var(--warning-color, #ffa600);
      flex-shrink: 0;
    }

    .intro {
      margin: 0 0 16px;
      color: var(--secondary-text-color);
      line-height: 1.4;
    }

    .card {
      background: var(--ha-card-background, var(--card-background-color));
      border-radius: var(--ss-radius, 12px);
      box-shadow: var(--ha-card-box-shadow, none);
      border: 1px solid var(--ha-card-border-color, var(--divider-color));
      padding: 16px;
      margin-bottom: 16px;
    }

    h2 {
      margin: 0 0 8px;
      font-size: 16px;
      font-weight: 500;
    }

    .hint,
    small {
      display: block;
      color: var(--secondary-text-color);
      font-size: 13px;
      line-height: 1.4;
      margin: 0 0 8px;
    }

    .row small {
      margin: 2px 0 0;
    }

    .layout {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(320px, 440px);
      gap: 16px;
      align-items: start;
    }

    .preview {
      position: sticky;
      top: 16px;
    }

    @media (max-width: 900px) {
      .layout {
        grid-template-columns: minmax(0, 1fr);
      }

      .preview {
        position: static;
        order: -1;
      }
    }

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 10px 0;
      min-height: 32px;
    }

    .row + .row {
      border-top: 1px solid color-mix(in srgb, var(--divider-color) 60%, transparent);
    }

    .row.off {
      opacity: 0.45;
    }

    .inline {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }

    input[type="range"] {
      width: 180px;
      accent-color: var(--primary-color);
    }

    @media (max-width: 600px) {
      .row.slider {
        flex-direction: column;
        align-items: stretch;
        gap: 4px;
      }

      .row.slider .inline,
      .row.slider input[type="range"] {
        flex: 1;
        width: auto;
      }
    }

    output {
      min-width: 44px;
      text-align: end;
      font-variant-numeric: tabular-nums;
      color: var(--secondary-text-color);
    }

    input[type="color"] {
      width: 40px;
      height: 32px;
      padding: 0;
      flex-shrink: 0;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      background: none;
      cursor: pointer;
    }

    input[type="text"] {
      font: inherit;
      min-width: 0;
      padding: 6px 8px;
      border-radius: 8px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
    }

    .switch {
      appearance: none;
      position: relative;
      width: 40px;
      height: 22px;
      margin: 0;
      flex-shrink: 0;
      border-radius: 999px;
      background: var(--switch-unchecked-track-color, #bbb);
      cursor: pointer;
      transition: background-color 150ms;
    }

    .switch::after {
      content: "";
      position: absolute;
      top: 3px;
      left: 3px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #fff;
      transition: transform 150ms;
    }

    .switch:checked {
      background: var(--primary-color);
    }

    .switch:checked::after {
      transform: translateX(18px);
    }

    .switch:focus-visible,
    button:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }

    .segment {
      display: inline-flex;
      flex-wrap: wrap;
      gap: 4px;
      padding: 4px;
      margin: 4px 8px 8px 0;
      border-radius: 999px;
      background: var(--secondary-background-color);
    }

    .segment button {
      padding: 6px 14px;
      border-radius: 999px;
    }

    .segment button.active {
      background: var(--card-background-color);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
      font-weight: 500;
    }

    .segment.small button {
      padding: 4px 10px;
      font-size: 13px;
    }

    .segment small {
      display: inline;
      margin: 0 0 0 4px;
      font-size: 11px;
    }

    .bar {
      position: sticky;
      bottom: 0;
      z-index: 2;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      margin: 0 -16px;
      padding: 10px 16px calc(10px + env(safe-area-inset-bottom, 0px));
      background: var(--card-background-color);
      border-top: 1px solid var(--divider-color);
      min-height: 40px;
    }

    .bar button:not(.primary) {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 12px;
      border-radius: 999px;
    }

    .bar .grow {
      flex: 1;
      min-width: 120px;
      color: var(--secondary-text-color);
    }
  `);var Js=o=>(o??"lovelace").toLowerCase().replace(/[^a-z0-9_-]+/g,"-").slice(0,64);async function D(o,e){let t=[],s=o.panels?.lovelace;t.push({url_path:null,title:e,editable:(s?.config?.mode??"storage")==="storage"});try{let a=await o.callWS({type:"lovelace/dashboards/list"});for(let i of a)!i.url_path||i.url_path==="lovelace"||t.push({url_path:i.url_path,title:i.title||i.url_path,editable:i.mode==="storage"})}catch{}return t}async function y(o,e){return o.callWS({type:"lovelace/config",url_path:e,force:!1})}async function C(o,e,t,s){await o.callWS({type:"style_studio/backups/create",kind:"dashboards",key:Js(e),data:{url_path:e,config:t}}),await o.callWS({type:"lovelace/config/save",url_path:e,config:s})}function Jt(o,e,t){let s=0;for(let{card:a,match:i}of e)if(o.type==="sections"){o.sections??=[];let r=!1;for(let c of o.sections){let h=(c.cards??[]).findIndex(i);if(h!==-1){c.cards[h]=a,s+=1,r=!0;break}}if(r)continue;let l=o.sections.find(c=>(c.cards??[]).some(h=>h.type==="heading"&&h.heading===t));l||(l={type:"grid",cards:[{type:"heading",heading:t}]},o.sections.push(l)),l.cards.push(a)}else{o.cards??=[];let r=o.cards.findIndex(i);r!==-1?(o.cards[r]=a,s+=1):o.cards.push(a)}return s}async function qt(o,e){let t=()=>e.filter(s=>!customElements.get(s));if(!t().length)return[];try{let s=await o.callWS({type:"lovelace/resources"});for(let a of s)t().some(i=>a.url.includes(i.replace(/^hui-/,"")))&&(a.type==="module"?await import(a.url).catch(()=>{}):await new Promise(i=>{let r=document.createElement("script");r.src=a.url,r.onload=r.onerror=i,document.head.append(r)}))}catch{}return await Promise.race([Promise.all(e.map(s=>customElements.whenDefined(s))),new Promise(s=>setTimeout(s,3e3))]),t()}async function Yt(o,e){let t=await window.loadCardHelpers?.().catch(()=>null);if(!t)return null;let s=t.createCardElement(e);return s.hass=o,s}var Zt=/(?<!var\([^)]*)#[0-9a-fA-F]{6}\b/g,Qt=/border-radius\s*:\s*(\d+(?:\.\d+)?px)/g,qs=["primary-color","accent-color","state-light-active-color","state-climate-active-color","primary-text-color","secondary-text-color","card-background-color","primary-background-color","secondary-background-color","sidebar-background-color","app-header-background-color","divider-color","error-color","warning-color","success-color","info-color"];function Ys(o){let e=String(o).trim().toLowerCase();if(/^#[0-9a-f]{6}$/.test(e))return e;let t=e.match(/^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/);return t?`#${t.slice(1,4).map(s=>Number(s).toString(16).padStart(2,"0")).join("")}`:null}var Zs={"#44739e":"state-icon-color","#03a9f4":"primary-color","#ff9800":"accent-color","#fdd835":"state-light-active-color","#212121":"primary-text-color","#727272":"secondary-text-color","#fafafa":"primary-background-color"};function Xt(o=document.documentElement){let e=getComputedStyle(o),t=new Map;for(let s of qs){let a=Ys(e.getPropertyValue(`--${s}`));a&&!t.has(a)&&t.set(a,s)}for(let[s,a]of Object.entries(Zs))t.has(s)||t.set(s,a);return t}var lt=o=>`var(--ha-card-border-radius, ${o})`,Qs=(o,e)=>`var(--${o}, ${e})`;function es(o,e){let t=new Map,s=(i,r,l)=>{let c=`${i}:${r.toLowerCase()}`;if(!t.has(c)){let _=i==="color"?e.get(r.toLowerCase()):null;t.set(c,{kind:i,value:r,count:0,places:new Set,suggestion:i==="radius"?lt(r):_?Qs(_,r):null})}let h=t.get(c);h.count+=1,h.places.add(l)},a=(i,r)=>{if(Array.isArray(i)){i.forEach(l=>a(l,r));return}if(i&&typeof i=="object"){let l=i.type?`${r} \u203A ${String(i.type).replace(/^custom:/,"")}`:r;for(let[c,h]of Object.entries(i))c==="border-radius"&&typeof h=="string"&&/^\d+(\.\d+)?px$/.test(h.trim())?s("radius",h.trim(),l):a(h,l);return}if(typeof i=="string"){for(let l of i.matchAll(Zt))s("color",l[0],r);for(let l of i.matchAll(Qt))s("radius",l[1],r)}};return(o.views??[]).forEach((i,r)=>a(i,i.title??i.path??`${r+1}`)),[...t.values()].map(i=>({...i,places:[...i.places]})).sort((i,r)=>r.count-i.count)}function ts(o,e){let t=new Map(e.filter(r=>r.kind==="color"&&r.suggestion).map(r=>[r.value.toLowerCase(),r.suggestion])),s=new Set(e.filter(r=>r.kind==="radius").map(r=>r.value)),a=r=>r.replace(Zt,l=>t.get(l.toLowerCase())??l).replace(Qt,(l,c)=>s.has(c)?`border-radius: ${lt(c)}`:l),i=r=>Array.isArray(r)?r.map(i):r&&typeof r=="object"?Object.fromEntries(Object.entries(r).map(([l,c])=>l==="border-radius"&&typeof c=="string"&&s.has(c.trim())?[l,lt(c.trim())]:[l,i(c)])):typeof r=="string"?a(r):r;return i(o)}var ss="isDefaultPanelManaged";function Xs(o){try{return localStorage.getItem(o)}catch{return null}}var ce=class extends f{connectedCallback(){super.connectedCallback(),this._refresh()}async _refresh(){try{let[e,t,s]=await Promise.all([this.hass.callWS({type:"style_studio/check"}),this.hass.callWS({type:"style_studio/history/list"}),this.hass.callWS({type:"style_studio/backups/list",kind:"dashboards"})]);this._check=e,this._history=t,this._backups=s.backups}catch(e){this._error(e)}}async _scanDashboards(){this._run(async()=>{let e=Xt(),t=(await D(this.hass,this.hass.localize("panel.states")||"Overview")).filter(a=>a.editable),s=[];for(let a of t)try{let i=await y(this.hass,a.url_path);s.push({dashboard:a,findings:es(i,e)})}catch{}this._scan=s,this._chosen=new Set(s.flatMap(a=>a.findings.filter(i=>i.suggestion).map(i=>this._findingKey(a.dashboard,i))))})}_findingKey(e,t){return`${e.url_path??""}|${t.kind}|${t.value.toLowerCase()}`}_toggle(e,t){let s=new Set(this._chosen);t?s.add(e):s.delete(e),this._chosen=s}_apply(e){let t=e.findings.filter(a=>a.suggestion&&this._chosen.has(this._findingKey(e.dashboard,a))),s=t.reduce((a,i)=>a+i.count,0);this._ask(this.t("ck_apply_confirm",{count:s,name:e.dashboard.title}),()=>this._run(async()=>{let a=await y(this.hass,e.dashboard.url_path);await C(this.hass,e.dashboard.url_path,a,ts(a,t)),await this._refresh(),await this._scanDashboards()},this.t("ck_applied",{name:e.dashboard.title})))}_fixBrowserMod(){this._ask(this.t("ck_fix_confirm"),()=>{try{localStorage.removeItem(ss)}catch{}this.requestUpdate(),this._showToast(this.t("ck_fixed"))})}_restoreHistory(e,t){this._ask(this.t("ck_restore_confirm"),()=>this._run(async()=>{await this.hass.callWS({type:"style_studio/history/restore",key:e,index:t}),await this._refresh()},this.t("ck_restored")))}_restoreBackup(e){this._ask(this.t("ck_restore_confirm"),()=>this._run(async()=>{let{data:t}=await this.hass.callWS({type:"style_studio/backups/read",kind:"dashboards",file:e.file}),s=await y(this.hass,t.url_path).catch(()=>({}));await C(this.hass,t.url_path,s,t.config),this._scan=null,await this._refresh()},this.t("ck_restored")))}_when(e){return new Date(e).toLocaleString(this.hass.locale?.language??"nl",{dateStyle:"medium",timeStyle:"short"})}render(){return this._check?n`
      <p class="intro">${this.t("check_intro")}</p>
      ${this._checksCard()} ${this._fixedCard()} ${this._restoreCard()} ${this._bar({})}
    `:d}_item(e,t,s=d){return n`<div class="item ${e?"ok":"warn"}">
      <ha-icon icon=${e?"mdi:check-circle":"mdi:alert-circle"}></ha-icon>
      <div class="text">${t}</div>
      ${s}
    </div>`}_checksCard(){let e=this._check,t=e.card_mod_themes.filter(u=>u.in_use),s=e.card_mod_themes.filter(u=>!u.in_use),a=t.filter(u=>u.sidebar),i=t.filter(u=>!u.sidebar),r=e.version_since?new Date(e.version_since).getTime():0,l=Date.now()-336*3600*1e3,c=e.devices.filter(u=>u.version!==e.version&&new Date(u.at).getTime()>l),h=c.filter(u=>new Date(u.at).getTime()>r),_=c.filter(u=>new Date(u.at).getTime()<=r),p=Xs(ss)==="true",m=u=>n`<ul>
      ${u.map(b=>n`<li>
          ${this.t("ck_device",{user:b.user,kind:b.app?this.t("ck_app"):this.t("ck_browser"),version:b.version,when:this._when(b.at)})}
        </li>`)}
    </ul>`;return n`
      <div class="card">
        <div class="title-row">
          <h2>${this.t("ck_checks")}</h2>
          <button class="small" ?disabled=${this._busy} @click=${()=>this._refresh()}>
            <ha-icon icon="mdi:refresh"></ha-icon>${this.t("ck_again")}
          </button>
        </div>
        ${a.length?a.map(u=>e.glass_handles_themes?this._item(!0,this.t("ck_cardmod_handled",{theme:u.theme})):this._item(!e.glass_sidebar,this.t("ck_cardmod_sidebar",{theme:u.theme,keys:u.keys.join(", ")}))):this._item(!0,this.t("ck_no_cardmod"))}
        ${i.map(u=>this._item(!0,this.t("ck_cardmod_other",{theme:u.theme,keys:u.keys.join(", ")})))}
        ${s.length?this._item(!0,this.t(s.length===1?"ck_cardmod_unused_one":"ck_cardmod_unused",{count:s.length,names:s.map(u=>u.theme).join(", ")})):d}
        ${p?this._item(!1,this.t("ck_browser_mod"),n`<button class="small" @click=${this._fixBrowserMod}>${this.t("ck_fix")}</button>`):this._item(!0,this.t("ck_browser_mod_ok"))}
        ${e.themes_not_loaded.length?this._item(!1,this.t("ck_not_loaded",{names:e.themes_not_loaded.join(", ")})):this._item(!0,this.t("ck_loaded"))}
        ${h.length?this._item(!1,n`${this.t("ck_devices_old")} ${m(h)}
                <small>${this.t("ck_app_cache")}</small>`):this._item(!0,_.length?this.t("ck_devices_none_old"):this.t("ck_devices_ok",{version:e.version}))}
        ${_.length?this._item(!0,n`${this.t("ck_devices_waiting",{version:e.version})} ${m(_)}`):d}
      </div>
    `}_fixedCard(){return n`
      <div class="card">
        <h2>${this.t("ck_fixed_styles")}</h2>
        <p class="hint">${this.t("ck_fixed_hint")}</p>
        <button class="primary" ?disabled=${this._busy} @click=${this._scanDashboards}>
          ${this.t("ck_scan")}
        </button>
        ${this._scan?this._scan.every(e=>!e.findings.length)?n`<p>${this.t("ck_none_found")}</p>`:this._scan.filter(e=>e.findings.length).map(e=>this._dashboardFindings(e)):d}
      </div>
    `}_dashboardFindings(e){let t=e.findings.filter(s=>s.suggestion&&this._chosen.has(this._findingKey(e.dashboard,s)));return n`
      <div class="dashboard" data-dashboard=${e.dashboard.title}>
        <h3>${e.dashboard.title}</h3>
        ${e.findings.map(s=>{let a=this._findingKey(e.dashboard,s);return n`<label class="finding ${s.suggestion?"":"none"}">
            <input
              type="checkbox"
              aria-label=${s.value}
              ?disabled=${!s.suggestion}
              .checked=${A(this._chosen.has(a))}
              @change=${i=>this._toggle(a,i.target.checked)}
            />
            ${s.kind==="color"?n`<span class="swatch" style="background:${s.value}"></span>`:n`<ha-icon icon="mdi:rounded-corner"></ha-icon>`}
            <code>${s.value}</code>
            <span class="arrow">→</span>
            <code class="suggestion">${s.suggestion??this.t("ck_no_suggestion")}</code>
            <small title=${s.places.join(`
`)}>${s.count===1?this.t("ck_found_one"):this.t("ck_found",{count:s.count})} · ${s.places.slice(0,2).join(", ")}${s.places.length>2?" \u2026":""}</small>
          </label>`})}
        <button class="small" ?disabled=${this._busy||!t.length} @click=${()=>this._apply(e)}>
          ${this.t("ck_apply")}
        </button>
      </div>
    `}_restoreCard(){let e=[["themes",this.t("ck_themes")],["glass_sidebar",this.t("ck_glass")],["people",this.t("ck_people")]];return n`
      <div class="card">
        <h2>${this.t("ck_backups")}</h2>
        <details open>
          <summary>${this.t("ck_dashboards")} (${this._backups.length})</summary>
          ${this._backups.length?this._backups.map(t=>n`<div class="version">
                  <span>${t.key}</span>
                  <small>${this._when(t.saved_at)}</small>
                  <button class="small" ?disabled=${this._busy} @click=${()=>this._restoreBackup(t)}>
                    ${this.t("ck_restore")}
                  </button>
                </div>`):n`<p class="hint">${this.t("ck_nothing")}</p>`}
        </details>
        ${e.map(([t,s])=>n`<details>
            <summary>${s} (${this._history[t].length})</summary>
            ${this._history[t].length?this._history[t].map(a=>n`<div class="version">
                    <span>${a.summary}</span>
                    <small>${this._when(a.saved_at)}</small>
                    <button
                      class="small"
                      ?disabled=${this._busy}
                      @click=${()=>this._restoreHistory(t,a.index)}
                    >
                      ${this.t("ck_restore")}
                    </button>
                  </div>`):n`<p class="hint">${this.t("ck_nothing")}</p>`}
          </details>`)}
      </div>
    `}};g(ce,"properties",{...f.properties,_check:{state:!0},_scan:{state:!0},_chosen:{state:!0},_history:{state:!0},_backups:{state:!0}}),g(ce,"styles",[f.styles,v`
      .title-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .item {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        padding: 10px 0;
        border-top: 1px solid var(--divider-color);
        line-height: 1.4;
      }

      .item .text {
        flex: 1;
      }

      .item ul {
        margin: 4px 0;
        padding-inline-start: 18px;
      }

      .item.ok > ha-icon {
        color: var(--success-color, #43a047);
      }

      .item.warn > ha-icon {
        color: var(--warning-color, #ffa600);
      }

      .small {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        border-radius: 999px;
        color: var(--primary-color);
        font-weight: 500;
        white-space: nowrap;
      }

      .dashboard {
        margin-top: 16px;
        padding-top: 8px;
        border-top: 1px solid var(--divider-color);
      }

      h3 {
        margin: 4px 0 8px;
        font-size: 15px;
        font-weight: 500;
      }

      .finding {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
        padding: 6px 0;
      }

      .finding.none {
        opacity: 0.6;
      }

      .finding input {
        accent-color: var(--primary-color);
      }

      .finding small {
        flex-basis: 100%;
        margin: 0 0 0 26px;
      }

      .swatch {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border: 1px solid var(--divider-color);
      }

      code {
        font-size: 12px;
        padding: 2px 6px;
        border-radius: 6px;
        background: var(--secondary-background-color);
      }

      .arrow {
        color: var(--secondary-text-color);
      }

      details {
        border-top: 1px solid var(--divider-color);
        padding: 8px 0;
      }

      summary {
        cursor: pointer;
        font-weight: 500;
      }

      .version {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 6px 0;
      }

      .version span {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .version small {
        margin: 0;
      }
    `]);customElements.get("ss-check-tab")||customElements.define("ss-check-tab",ce);function ct(o,e,t){if(typeof o!="string"||!o.trim().startsWith("[[["))return o;let s=o.trim().slice(3,-3);try{return new Function("entity","states","hass","variables",s)(t,e.states,e,{})}catch{return""}}var de=class extends ${constructor(){super(),this.needs=[],this._real=null,this._missing=null}async updated(e){if(e.has("config")||e.has("needs")){let t=await qt(this.hass,this.needs);this._missing=t;let s=t.length?null:await Yt(this.hass,this.config);this._real=s}this._real&&(this._real.hass=this.hass)}render(){return this.config?this.bare?this._real??this._draw(this.config):n`
      ${this._missing?.length?n`<p class="warning">${this.t("needs_cards",{cards:this._missing.join(", ")})}</p>`:d}
      <small>${this._real?this.t("preview_real"):this.t("preview_drawing")}</small>
      <div class="frame">${this._real??this._draw(this.config)}</div>
    `:d}_draw(e){let t=this.hass.states?.[e.entity];switch(e.type){case"vertical-stack":return n`<div class="stack">${e.cards.map(s=>this._draw(s))}</div>`;case"horizontal-stack":return n`<div class="hstack">${e.cards.map(s=>this._draw(s))}</div>`;case"grid":return n`
          ${e.title?n`<div class="title">${e.title}</div>`:d}
          <div class="grid" style="grid-template-columns: repeat(${e.columns??3}, minmax(0, 1fr))">
            ${e.cards.map(s=>this._draw(s))}
          </div>
        `;case"heading":return n`<div class="title big">${e.heading}</div>`;case"custom:button-card":{let s=(e.state??[]).find(l=>l.operator==="template"&&ct(l.value,this.hass,t)),a=s?s.styles?.card?"active":"lit":"",i=(e.styles?.grid??[]).some(l=>l["grid-template-areas"]),r=(e.styles?.card??[]).map(l=>Object.entries(l)[0]).filter(([l])=>l==="height");return n`<div
          class="button ${a} ${i?"room":""}"
          style=${r.map(([l,c])=>`${l}:${c}`).join(";")}
        >
          ${e.show_icon!==!1&&e.icon?i?n`<span class="room-icon"><ha-icon .icon=${e.icon}></ha-icon></span>`:n`<ha-icon .icon=${e.icon}></ha-icon>`:d}
          ${e.show_name!==!1&&e.name?n`<span class="name ${e.styles?.name?.some(l=>l["font-size"]==="28px")?"huge":""}">${ct(e.name,this.hass,t)}</span>`:d}
          ${e.show_label?n`<small>${ct(e.label,this.hass,t)}</small>`:d}
        </div>`}case"custom:bubble-card":return e.card_type==="pop-up"?n`<div class="popup-head">
            <span class="round"><ha-icon .icon=${e.icon??"mdi:circle"}></ha-icon></span>
            <b>${e.name}</b>
            <code>${e.hash}</code>
          </div>`:n`<div class="pill">
          <span class="round"><ha-icon .icon=${e.icon??t?.attributes?.icon??"mdi:lightbulb"}></ha-icon></span>
          <b>${e.name??t?.attributes?.friendly_name??e.entity}</b>
          <small>${t?t.attributes?.[e.attribute]??t.state:""}${e.attribute==="current_temperature"?"\xB0":""}</small>
        </div>`;case"tile":return n`<div class="tile ${t?.state==="on"?"on":""}">
          <span class="round"><ha-icon .icon=${t?.attributes?.icon??"mdi:lightbulb"}></ha-icon></span>
          <span><b>${e.name??t?.attributes?.friendly_name??e.entity}</b><small>${t?.state??""}</small></span>
        </div>`;case"markdown":{let s=String(e.content??"").replace(/\{%[\s\S]*?%\}/g,"").replace(/\{\{[\s\S]*?\}\}/g,"\u2026").split(`
`).filter(a=>a.trim());return n`<div class="markdown">
          ${s.map(a=>a.startsWith("#")?n`<b class="md-title">${a.replace(/^#+\s*/,"")}</b>`:n`<span>${a.replace(/\*\*/g,"")}</span>`)}
        </div>`}case"weather-forecast":return n`<div class="tile weather">
          <span class="round"><ha-icon icon="mdi:weather-partly-cloudy"></ha-icon></span>
          <span><b>${t?.attributes?.friendly_name??e.entity}</b><small>${t?`${t.state} \xB7 ${t.attributes?.temperature??""}\xB0`:""}</small></span>
        </div>`;default:return n`<div class="unknown">${e.type}</div>`}}};g(de,"properties",{hass:{attribute:!1},config:{attribute:!1},needs:{attribute:!1},t:{attribute:!1},bare:{type:Boolean},_real:{state:!0},_missing:{state:!0}}),g(de,"styles",v`
    :host {
      display: block;
    }

    small {
      display: block;
      color: var(--secondary-text-color);
      font-size: 12px;
      margin-bottom: 6px;
    }

    .warning {
      margin: 0 0 8px;
      padding: 10px 12px;
      border-radius: 10px;
      background: color-mix(in srgb, var(--warning-color, #ffa600) 16%, var(--card-background-color));
      font-size: 13px;
      line-height: 1.4;
    }

    .frame {
      padding: 14px;
      border-radius: 24px;
      background: var(--bubble-pop-up-background-color, var(--card-background-color));
      border: 1px solid var(--divider-color);
    }

    .stack {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .hstack {
      display: flex;
      gap: 10px;
    }

    .title {
      margin: 6px 0 -2px 4px;
      font-size: 13px;
      font-weight: 500;
      color: var(--secondary-text-color);
    }

    .title.big {
      font-size: 16px;
      color: var(--primary-text-color);
    }

    .grid {
      display: grid;
      gap: 8px;
    }

    .button {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      min-height: 64px;
      padding: 8px 4px;
      border-radius: 18px;
      background: var(--bubble-main-background-color, var(--secondary-background-color));
      text-align: center;
      font-size: 13px;
      font-weight: 500;
    }

    .button small {
      margin: 0;
    }

    .button.active {
      background: var(--state-climate-active-color, var(--primary-color));
      color: var(--text-primary-color, #fff);
    }

    .button.active small {
      color: inherit;
    }

    .button.room {
      align-items: flex-start;
      text-align: start;
      min-height: 96px;
      padding: 14px;
      border-radius: var(--ha-card-border-radius, 16px);
      background: var(--ha-card-background, var(--card-background-color));
      border: 1px solid var(--divider-color);
      font-weight: 600;
    }

    .button.room .room-icon {
      display: grid;
      place-items: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--secondary-background-color);
      color: var(--state-icon-color);
      --mdc-icon-size: 22px;
      margin-bottom: 6px;
    }

    .button.room.lit .room-icon {
      background: var(--bubble-icon-background-color, var(--secondary-background-color));
      color: var(--state-light-active-color);
    }

    .button.room small {
      font-weight: 400;
    }

    .name.huge {
      font-size: 28px;
      font-weight: 600;
    }

    .popup-head,
    .pill,
    .tile {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .popup-head code {
      margin-inline-start: auto;
      font-size: 12px;
      color: var(--secondary-text-color);
    }

    .pill,
    .tile {
      padding: 8px;
      border-radius: 999px;
      background: var(--bubble-main-background-color, var(--secondary-background-color));
    }

    .tile {
      border-radius: var(--ha-card-border-radius, 12px);
      background: var(--ha-card-background, var(--card-background-color));
      border: 1px solid var(--divider-color);
    }

    .tile small,
    .pill small {
      margin: 0;
    }

    .pill small {
      margin-inline-start: auto;
      padding-inline-end: 8px;
    }

    .round {
      display: grid;
      place-items: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      flex-shrink: 0;
      background: color-mix(in srgb, var(--primary-color) 18%, transparent);
      color: var(--primary-color);
    }

    .tile.on .round {
      color: var(--state-light-active-color, var(--primary-color));
    }

    .markdown {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 12px;
      border-radius: var(--ha-card-border-radius, 12px);
      background: var(--ha-card-background, var(--card-background-color));
      border: 1px solid var(--divider-color);
      font-size: 13px;
    }

    .md-title {
      font-size: 18px;
    }

    .unknown {
      padding: 8px;
      border: 1px dashed var(--divider-color);
      border-radius: 8px;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
  `);customElements.get("ss-card-preview")||customElements.define("ss-card-preview",de);var ea={off:"mdi:power",cool:"mdi:snowflake",heat:"mdi:fire",auto:"mdi:thermostat-auto",dry:"mdi:water-percent",fan_only:"mdi:fan",heat_cool:"mdi:sun-snowflake-variant"},ta={auto:"mdi:fan-auto",low:"mdi:fan-speed-1",medium:"mdi:fan-speed-2",middle:"mdi:fan-speed-2",high:"mdi:fan-speed-3"},Z=o=>String(o).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"airco";function Ve(o){let e=o?.attributes??{},t=s=>{if(!Array.isArray(s)||s.length<2)return null;let a=s.find(r=>String(r).toLowerCase()==="off"),i=s.find(r=>r!==a);return a&&i?{off:a,on:i}:null};return{modes:Array.isArray(e.hvac_modes)?e.hvac_modes:[],fanModes:Array.isArray(e.fan_modes)?e.fan_modes:[],swing:t(e.swing_modes),swingHorizontal:t(e.swing_horizontal_modes),temperature:e.temperature!==void 0||e.target_temp_low===void 0,min:Number(e.min_temp??16),max:Number(e.max_temp??30),step:Number(e.target_temp_step??.5)}}function as(o,e,t){let s=Ve(e);return{entity:o,name:t,hash:`#airco-${Z(t.replace(/^airco\s*/i,"")||o.split(".")[1])}`,modes:[...s.modes],fan:s.fanModes.length>0,swing:!!s.swing,swing_horizontal:!!s.swingHorizontal,temperature:s.temperature,opener:!0}}var sa={card:[{"background-color":"var(--state-climate-active-color, var(--primary-color))"}],name:[{color:"var(--text-primary-color, #fff)"}],icon:[{color:"var(--text-primary-color, #fff)"}],label:[{color:"var(--text-primary-color, #fff)"}]};function V(o,{name:e,icon:t,tap:s,active:a,extra:i={}}){return{type:"custom:button-card",entity:o,name:e,icon:t,show_state:!1,show_name:!0,show_icon:!!t,tap_action:s??{action:"none"},hold_action:{action:"none"},styles:{card:[{"border-radius":"18px"},{padding:"10px 4px"},{"box-shadow":"none"},{"background-color":"var(--bubble-main-background-color, var(--secondary-background-color))"}],name:[{"font-size":"13px"},{"font-weight":"500"}],icon:[{width:"24px"}]},...a?{state:[{operator:"template",value:`[[[ return ${a}; ]]]`,styles:sa}]}:{},...i}}var Y=(o,e,t)=>({action:"perform-action",perform_action:e,target:{entity_id:o},data:t});function is(o,e,t){let{entity:s}=o,a=Ve(e),i=[{type:"custom:bubble-card",card_type:"pop-up",hash:o.hash,name:o.name,icon:"mdi:air-conditioner",entity:s}];if(o.temperature){let m=S=>`Math.round((${S}) * 10) / 10`,u=`Number(entity.attributes.temperature ?? ${a.min})`,b={card:[{height:"88px"}],icon:[{width:"36px"}]};i.push({type:"grid",columns:3,square:!1,cards:[V(s,{icon:"mdi:minus",tap:Y(s,"climate.set_temperature",{temperature:`[[[ return Math.max(${a.min}, ${m(`${u} - ${a.step}`)}); ]]]`}),extra:{show_name:!1,styles:{card:b.card,icon:b.icon}}}),V(s,{name:"[[[ return (entity.attributes.temperature ?? '\u2013') + '\xB0'; ]]]",extra:{show_label:!0,label:`[[[ return '${t.now} ' + (entity.attributes.current_temperature ?? '\u2013') + '\xB0'; ]]]`,styles:{card:b.card,name:[{"font-size":"28px"},{"font-weight":"600"}],label:[{"font-size":"12px"},{opacity:"0.7"}]}}}),V(s,{icon:"mdi:plus",tap:Y(s,"climate.set_temperature",{temperature:`[[[ return Math.min(${a.max}, ${m(`${u} + ${a.step}`)}); ]]]`}),extra:{show_name:!1,styles:{card:b.card,icon:b.icon}}})]})}let r=a.modes.filter(m=>o.modes.includes(m));r.length&&i.push({type:"grid",title:t.mode,columns:Math.min(r.length,3),square:!1,cards:r.map(m=>V(s,{name:t.modes[m]??m,icon:ea[m]??"mdi:thermostat",tap:Y(s,"climate.set_hvac_mode",{hvac_mode:m}),active:`entity.state === '${m}'`}))}),o.fan&&a.fanModes.length&&i.push({type:"grid",title:t.fan,columns:Math.min(a.fanModes.length,4),square:!1,cards:a.fanModes.map(m=>V(s,{name:t.fanModes[m]??String(m).charAt(0).toUpperCase()+String(m).slice(1),icon:ta[m]??"mdi:fan",tap:Y(s,"climate.set_fan_mode",{fan_mode:m}),active:`entity.attributes.fan_mode === '${m}'`}))});let l=[];if(o.swing&&a.swing){let{on:m,off:u}=a.swing;l.push(V(s,{name:t.swingVertical,icon:"mdi:arrow-up-down",tap:Y(s,"climate.set_swing_mode",{swing_mode:`[[[ return entity.attributes.swing_mode === '${u}' ? '${m}' : '${u}'; ]]]`}),active:`entity.attributes.swing_mode !== '${u}'`}))}if(o.swing_horizontal&&a.swingHorizontal){let{on:m,off:u}=a.swingHorizontal;l.push(V(s,{name:t.swingHorizontal,icon:"mdi:arrow-left-right",tap:Y(s,"climate.set_swing_horizontal_mode",{swing_horizontal_mode:`[[[ return entity.attributes.swing_horizontal_mode === '${u}' ? '${m}' : '${u}'; ]]]`}),active:`entity.attributes.swing_horizontal_mode !== '${u}'`}))}l.length&&i.push({type:"grid",title:t.swing,columns:l.length,square:!1,cards:l});let[c,...h]=i,_=We(c,h),p=o.opener?{type:"custom:bubble-card",card_type:"button",button_type:"name",entity:s,name:o.name,icon:"mdi:air-conditioner",show_state:!0,show_attribute:!0,attribute:"current_temperature",tap_action:{action:"navigate",navigation_path:o.hash},button_action:{tap_action:{action:"navigate",navigation_path:o.hash}}}:null;return{popup:_,opener:p}}var os=o=>e=>Kt(e)?.hash===o,rs=o=>e=>e?.type==="custom:bubble-card"&&e.card_type==="button"&&(e.tap_action?.navigation_path===o||e.button_action?.tap_action?.navigation_path===o);var G=["button-card","bubble-card"],he=class extends f{constructor(){super(),this._options={},this._dashboard=null,this._views=null,this._view=0}connectedCallback(){super.connectedCallback();let e=this._entities()[0];e&&this._pickEntity(e),this._loadDashboards()}_entities(){return Object.keys(this.hass.states).filter(e=>e.startsWith("climate.")).sort()}_defaultName(e){let t=this.hass.entities?.[e],s=t?.area_id??this.hass.devices?.[t?.device_id]?.area_id,a=s?this.hass.areas?.[s]?.name:null,i=this.hass.states[e]?.attributes?.friendly_name??e;return a?`${this.t("cl_section")} ${a.toLowerCase()}`:i}_pickEntity(e){this._entity=e,this._options[e]||(this._options={...this._options,[e]:as(e,this.hass.states[e],this._defaultName(e))})}get _opts(){return this._options[this._entity]}_set(e,t){this._options={...this._options,[this._entity]:{...this._opts,[e]:t}}}async _loadDashboards(){this._dashboards=await D(this.hass,this.hass.localize("panel.states")||"Overview");let e=this._dashboards.find(t=>t.editable)??this._dashboards[0];e&&this._pickDashboard(e.url_path)}async _pickDashboard(e){this._dashboard=e,this._views=null;try{let t=await y(this.hass,e);this._views=t.views??[],this._view=0}catch(t){this._views=[],this._error(t)}}get _labels(){let e=this.t,t=Object.fromEntries(["off","cool","heat","auto","dry","fan_only","heat_cool"].map(a=>[a,e(`mode_${a}`)])),s=Object.fromEntries(["auto","low","medium","middle","high"].map(a=>[a,e(`fan_${a}`)]));return{now:e("cl_now_label"),mode:e("cl_modes"),fan:e("cl_fan"),swing:e("cl_swing_title"),swingVertical:e("cl_swing_v"),swingHorizontal:e("cl_swing_h"),modes:t,fanModes:s}}_cards(){return is(this._opts,this.hass.states[this._entity],this._labels)}_put(){let e=this._dashboards.find(a=>a.url_path===this._dashboard),t=this._views[this._view],s=t?.title??t?.path??`${this._view+1}`;this._ask(this.t("cl_add_confirm",{hash:this._opts.hash,view:s}),()=>this._run(async()=>{let a=await y(this.hass,e.url_path),i=JSON.parse(JSON.stringify(a)),r=i.views[this._view],{popup:l,opener:c}=this._cards(),h=[{card:l,match:os(this._opts.hash)}];c&&h.push({card:c,match:rs(this._opts.hash)});let _=Jt(r,h,this.t("cl_section"));await C(this.hass,e.url_path,a,i),this._views=i.views,this._showToast(this.t("cl_added",{view:s,replaced:_}))}))}render(){let e=this._entities();if(!e.length)return n`<p class="intro">${this.t("climate_intro")}</p>
        <div class="card"><p class="hint">${this.t("no_climate")}</p></div>`;let t=this._opts,s=this.hass.states[this._entity],a=Ve(s),{popup:i}=this._cards();return n`
      <p class="intro">${this.t("climate_intro")}</p>
      <div class="chips">
        ${e.map(r=>n`<button
            class="chip ${r===this._entity?"active":""}"
            @click=${()=>this._pickEntity(r)}
          >
            <ha-icon icon="mdi:air-conditioner"></ha-icon>
            ${this.hass.states[r].attributes.friendly_name??r}
          </button>`)}
      </div>
      <div class="layout">
        <div class="settings">
          <div class="card">
            <h2>${this.t("cl_popup")}</h2>
            <label class="row">
              <span>${this.t("cl_name")}</span>
              <input type="text" .value=${t.name} @input=${r=>this._set("name",r.target.value)} />
            </label>
            <label class="row">
              <span>
                ${this.t("cl_hash")}
                <small>${this.t("cl_hash_hint",{hash:t.hash})}</small>
              </span>
              <input
                type="text"
                .value=${t.hash}
                @change=${r=>{let l=r.target.value.trim().replace(/^#?/,"#").replace(/[^#a-z0-9_-]/gi,"-");this._set("hash",l.length>1?l:t.hash)}}
              />
            </label>
          </div>

          <div class="card">
            <h2>${this.t("cl_parts")}</h2>
            ${this._switch(t,"temperature",this.t("cl_temperature"),this.t("cl_temperature_hint",{min:a.min,max:a.max,step:a.step}))}
            <div class="row column">
              <span>${this.t("cl_modes")}</span>
              <div class="modes">
                ${a.modes.map(r=>n`<label class="mode">
                    <input
                      type="checkbox"
                      .checked=${A(t.modes.includes(r))}
                      @change=${l=>this._set("modes",l.target.checked?[...t.modes,r]:t.modes.filter(c=>c!==r))}
                    />
                    ${this.t(`mode_${r}`)}
                  </label>`)}
              </div>
            </div>
            ${a.fanModes.length?this._switch(t,"fan",this.t("cl_fan"),a.fanModes.join(", ")):this._unavailable(this.t("cl_fan"),this.t("cl_fan_none"))}
            ${a.swing?this._switch(t,"swing",this.t("cl_swing_v")):this._unavailable(this.t("cl_swing_v"),this.t("cl_swing_none"))}
            ${a.swingHorizontal?this._switch(t,"swing_horizontal",this.t("cl_swing_h")):this._unavailable(this.t("cl_swing_h"),this.t("cl_swing_none"))}
            <p class="note"><ha-icon icon="mdi:information-outline"></ha-icon>${this.t("cl_louvers")}</p>
          </div>

          ${this._placeCard()}

          <div class="card">
            <details>
              <summary>${this.t("cl_code")}</summary>
              <p class="hint">${this.t("cl_code_hint")}</p>
              <button
                class="small"
                @click=${async()=>{await navigator.clipboard?.writeText(JSON.stringify(i,null,2)),this._showToast(this.t("copied"))}}
              >
                <ha-icon icon="mdi:content-copy"></ha-icon>${this.t("copy")}
              </button>
              <pre>${JSON.stringify(i,null,2)}</pre>
            </details>
          </div>
        </div>

        <aside class="card preview">
          <h2>${this.t("preview")}</h2>
          <div class="popup-title">
            <ha-icon icon="mdi:air-conditioner"></ha-icon><b>${t.name}</b><code>${t.hash}</code>
          </div>
          <ss-card-preview
            .hass=${this.hass}
            .t=${this.t}
            .needs=${G}
            .config=${{type:"vertical-stack",cards:U(i)}}
          ></ss-card-preview>
        </aside>
      </div>
      ${this._bar({})}
    `}_unavailable(e,t){return n`<div class="row off">
      <span>${e}<small>${t}</small></span>
      <ha-icon icon="mdi:minus-circle-outline"></ha-icon>
    </div>`}_placeCard(){let e=this._dashboards??[],t=e.find(i=>i.url_path===this._dashboard),s=this._views?.[this._view],a=s?.type==="panel";return n`
      <div class="card">
        <h2>${this.t("cl_place")}</h2>
        <label class="row">
          <span>${this.t("cl_dashboard")}</span>
          <select @change=${i=>this._pickDashboard(i.target.value||null)}>
            ${e.map(i=>n`<option value=${i.url_path??""} ?selected=${i.url_path===this._dashboard}>
                ${i.title}
              </option>`)}
          </select>
        </label>
        ${t&&!t.editable?this._warning(this.t("cl_readonly")):d}
        <label class="row">
          <span>${this.t("cl_view")}</span>
          <select @change=${i=>this._view=Number(i.target.value)}>
            ${(this._views??[]).map((i,r)=>n`<option value=${r} ?selected=${r===this._view}>
                ${i.title??i.path??r+1}
              </option>`)}
          </select>
        </label>
        ${a?this._warning(this.t("cl_panel_view")):d}
        ${this._switch(this._opts,"opener",this.t("cl_opener"))}
        ${this._popupFormat()}
        <button
          class="primary place"
          ?disabled=${this._busy||!t?.editable||!s||a}
          @click=${this._put}
        >
          ${this.t("cl_add")}
        </button>
      </div>
    `}};g(he,"properties",{...f.properties,_entity:{state:!0},_options:{state:!0},_dashboards:{state:!0},_dashboard:{state:!0},_views:{state:!0},_view:{state:!0}}),g(he,"styles",[f.styles,v`
      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 16px;
      }

      .chip {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 14px;
        border-radius: 999px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
      }

      .chip.active {
        border-color: var(--primary-color);
        background: color-mix(in srgb, var(--primary-color) 14%, var(--card-background-color));
      }

      .row.column {
        flex-direction: column;
        align-items: stretch;
      }

      .modes {
        display: flex;
        flex-wrap: wrap;
        gap: 6px 14px;
      }

      .mode {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }

      .mode input {
        accent-color: var(--primary-color);
      }

      .note {
        display: flex;
        gap: 8px;
        margin: 8px 0 0;
        font-size: 13px;
        line-height: 1.4;
        color: var(--secondary-text-color);
      }

      .note ha-icon {
        flex-shrink: 0;
        --mdc-icon-size: 18px;
      }

      select {
        font: inherit;
        max-width: 220px;
        padding: 6px 8px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: var(--primary-text-color);
      }

      .place {
        margin-top: 8px;
      }

      .small {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        border-radius: 999px;
        color: var(--primary-color);
        font-weight: 500;
      }

      summary {
        cursor: pointer;
        font-weight: 500;
      }

      pre {
        max-height: 320px;
        overflow: auto;
        padding: 10px;
        border-radius: 8px;
        background: var(--secondary-background-color);
        font-size: 12px;
      }

      .popup-title {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
      }

      .popup-title code {
        margin-inline-start: auto;
        font-size: 12px;
        color: var(--secondary-text-color);
      }

      @media (max-width: 600px) {
        .row {
          flex-wrap: wrap;
        }
      }
    `]);customElements.get("ss-climate-tab")||customElements.define("ss-climate-tab",he);var dt=o=>o==null?o:JSON.parse(JSON.stringify(o)),ht=(o,e)=>JSON.stringify(o??null)===JSON.stringify(e??null),pe=class extends f{connectedCallback(){super.connectedCallback(),this._load()}async _load(){try{this._accept(await this.hass.callWS({type:"style_studio/people/get"}))}catch(e){this._error(e)}}_accept(e){this._state=e,this._draft=this._fromSaved()}_fromSaved(){return Object.fromEntries(this._state.users.map(e=>{let t=this._state.persons[e.id]??{};return[e.id,{theme:t.theme??null,sidebar:dt(t.sidebar??null)}]}))}get dirty(){return!!this._state&&!ht(this._draft,this._fromSaved())}_setPerson(e,t){this._draft={...this._draft,[e]:{...this._draft[e],...t}},this._toast=null}_latest(e){return this._state.reports.find(t=>t.user_id===e)??null}_devices(e){return this._state.reports.filter(t=>t.user_id===e)}_save(){this._run(async()=>{this._accept(await this.hass.callWS({type:"style_studio/people/save",persons:this._draft})),clearTimeout(this._refresh),this._refresh=setTimeout(()=>!this.dirty&&this._load(),4e3)},this.t("saved"))}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._refresh)}_undo(){this._ask(this.t("undo_confirm"),()=>this._run(async()=>{let e=await this.hass.callWS({type:"style_studio/people/undo"});if(!e.restored)throw new Error(this.t("nothing_to_undo"));this._accept(e)},this.t("undone")))}_when(e){let t=(new Date(e).getTime()-Date.now())/1e3,s=new Intl.RelativeTimeFormat(this.hass.locale?.language??"nl",{numeric:"auto"});for(let[a,i]of[["day",86400],["hour",3600],["minute",60]])if(Math.abs(t)>=i)return s.format(Math.round(t/i),a);return s.format(0,"minute")}render(){if(!this._state||!this._draft)return d;let{users:e,themes:t}=this._state;return n`
      <p class="intro">${this.t("people_intro")}</p>
      ${t.length?d:this._warning(this.t("no_themes_yet"))}
      ${this._state.not_loaded?.length?this._warning(this.t("people_not_loaded",{names:this._state.not_loaded.join(", ")})):d}
      <div class="people">${e.map(s=>this._person(s))}</div>
      ${this._bar({left:this._state.history?n`<button ?disabled=${this._busy} @click=${this._undo}>
              <ha-icon icon="mdi:history"></ha-icon>${this.t("undo")}
            </button>`:d,onCancel:()=>this._draft=this._fromSaved(),onSave:()=>this._save()})}
    `}_person(e){let t=this._draft[e.id],s=this._state.persons[e.id]??{},a=this._latest(e.id),i=this._devices(e.id),r=this._state.users.filter(c=>c.id!==e.id),l=r.filter(c=>this._latest(c.id)?.sidebar);return n`
      <div class="card person" data-user=${e.name}>
        <div class="head">
          <ha-icon icon=${e.is_admin?"mdi:account-star":"mdi:account"}></ha-icon>
          <div class="who">
            <h2>${e.name}</h2>
            <small>
              ${a?n`${this.t("last_seen",{when:this._when(a.at)})} ·
                  ${i.length===1?this.t("device_one"):this.t("devices",{count:i.length})}
                  ${i.some(c=>c.app)?n`<em>${this.t("app_badge")}</em>`:d}`:this.t("never_seen")}
            </small>
          </div>
          <label class="copy">
            <span>${this.t("copy_all_from")}</span>
            <select
              aria-label="${this.t("copy_all_from")} (${e.name})"
              @change=${c=>{let h=c.target.value;if(c.target.value="",!h)return;let _=this._draft[h];this._setPerson(e.id,{theme:_.theme??this._latest(h)?.theme??null,sidebar:dt(_.sidebar??this._latest(h)?.sidebar??null)})}}
            >
              <option value="">${this.t("pick_person")}</option>
              ${r.map(c=>n`<option value=${c.id}>${c.name}</option>`)}
            </select>
          </label>
        </div>

        <div class="row">
          <span>
            ${this.t("person_theme")}
            <small>${this.t("now_uses",{value:a?a.theme||this.t("ha_default"):this.t("unknown")})}</small>
            ${this._status(e,t.theme,s.theme,a?.theme,a)}
          </span>
          <select
            aria-label="${this.t("person_theme")} (${e.name})"
            .value=${t.theme??""}
            @change=${c=>this._setPerson(e.id,{theme:c.target.value||null})}
          >
            <option value="" ?selected=${!t.theme}>${this.t("self_choice")}</option>
            ${this._themeOptions(t.theme)}
          </select>
        </div>

        <div class="row">
          <span>
            ${this.t("person_sidebar")}
            <small>${this._sidebarSummary(t.sidebar??a?.sidebar)}</small>
            ${this._status(e,t.sidebar,s.sidebar,a?.sidebar,a)}
          </span>
          <select
            aria-label="${this.t("person_sidebar")} (${e.name})"
            @change=${c=>{let h=c.target.value;h===""?this._setPerson(e.id,{sidebar:null}):h!=="keep"&&this._setPerson(e.id,{sidebar:dt(this._latest(h).sidebar)})}}
          >
            <option value="" ?selected=${!t.sidebar}>${this.t("self_choice")}</option>
            ${t.sidebar?n`<option value="keep" selected>${this._sidebarSummary(t.sidebar)}</option>`:d}
            ${l.map(c=>n`<option value=${c.id}>${this.t("like_person",{name:c.name})}</option>`)}
            ${a?.sidebar?n`<option value=${e.id}>${this.t("like_person",{name:e.name})}</option>`:d}
          </select>
        </div>
      </div>
    `}_themeOptions(e){let t=[...this._state.themes];return e&&!t.includes(e)&&t.push(e),t.map(s=>n`<option ?selected=${s===e}>${s}</option>`)}_sidebarSummary(e){return e?[this.t("order_count",{count:e.panelOrder?.length??0}),this.t("hidden_count",{count:e.hiddenPanels?.length??0})].join(" \xB7 "):this.t("unknown")}_status(e,t,s,a,i){if(t==null||!ht(t,s))return d;let r=i&&ht(a,s);return n`<small class=${r?"ok":"wait"}>
      <ha-icon icon=${r?"mdi:check-circle":"mdi:clock-outline"}></ha-icon>
      ${r?this.t("applied"):this.t("pending",{name:e.name})}
    </small>`}};g(pe,"properties",{...f.properties,_state:{state:!0},_draft:{state:!0}}),g(pe,"styles",[f.styles,v`
      .people {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
        gap: 16px;
      }

      @media (max-width: 600px) {
        .people {
          grid-template-columns: minmax(0, 1fr);
        }
      }

      .person {
        margin: 0;
      }

      .head {
        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
        padding-bottom: 8px;
        border-bottom: 1px solid var(--divider-color);
      }

      .head > ha-icon {
        color: var(--primary-color);
        --mdc-icon-size: 28px;
      }

      .who {
        flex: 1;
        min-width: 140px;
      }

      .who h2 {
        margin: 0;
      }

      .who small {
        margin: 0;
      }

      em {
        font-style: normal;
        font-size: 11px;
        padding: 1px 6px;
        margin-inline-start: 4px;
        border-radius: 999px;
        background: var(--secondary-background-color);
      }

      .copy {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        color: var(--secondary-text-color);
      }

      select {
        font: inherit;
        max-width: 200px;
        padding: 6px 8px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: var(--primary-text-color);
      }

      small.ok,
      small.wait {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-top: 4px;
      }

      small.ok {
        color: var(--success-color, #43a047);
      }

      small ha-icon {
        --mdc-icon-size: 16px;
      }

      @media (max-width: 600px) {
        .row {
          flex-direction: column;
          align-items: stretch;
        }

        select {
          max-width: none;
        }
      }
    `]);customElements.get("ss-people-tab")||customElements.define("ss-people-tab",pe);var ns=(o,e,t)=>{let s=new Map;for(let a=e;a<=t;a++)s.set(o[a],a);return s},ls=Be(class extends J{constructor(o){if(super(o),o.type!==T.CHILD)throw Error("repeat() can only be used in text expressions")}dt(o,e,t){let s;t===void 0?t=e:e!==void 0&&(s=e);let a=[],i=[],r=0;for(let l of o)a[r]=s?s(l,r):r,i[r]=t(l,r),r++;return{values:i,keys:a}}render(o,e,t){return this.dt(o,e,t).values}update(o,[e,t,s]){let a=Vt(o),{values:i,keys:r}=this.dt(e,t,s);if(!Array.isArray(a))return this.ut=r,i;let l=this.ut??=[],c=[],h,_,p=0,m=a.length-1,u=0,b=i.length-1;for(;p<=m&&u<=b;)if(a[p]===null)p++;else if(a[m]===null)m--;else if(l[p]===r[u])c[u]=N(a[p],i[u]),p++,u++;else if(l[m]===r[b])c[b]=N(a[m],i[b]),m--,b--;else if(l[p]===r[b])c[b]=N(a[p],i[b]),q(o,c[b+1],a[p]),p++,b--;else if(l[m]===r[u])c[u]=N(a[m],i[u]),q(o,a[p],a[m]),m--,u++;else if(h===void 0&&(h=ns(r,u,b),_=ns(l,p,m)),h.has(l[p]))if(h.has(l[m])){let S=_.get(r[u]),ee=S!==void 0?a[S]:null;if(ee===null){let te=q(o,a[p]);N(te,i[u]),c[u]=te}else c[u]=N(ee,i[u]),q(o,a[p],ee),a[S]=null;u++}else Re(a[m]),m--;else Re(a[p]),p++;for(;u<=b;){let S=q(o,c[b+1]);N(S,i[u]),c[u++]=S}for(;p<=m;){let S=a[p++];S!==null&&Re(S)}return this.ut=r,Le(o,c),k}});var aa="__other";function pt(o,e){let t=a=>{let i=o.entities?.[a];return!i||i.hidden?!1:(i.area_id??o.devices?.[i.device_id]?.area_id)===e},s=Object.keys(o.states).filter(t).sort();return{lights:s.filter(a=>a.startsWith("light.")),climate:s.find(a=>a.startsWith("climate."))??null}}function cs(o,e){let t=Object.values(o.floors??{}).sort((a,i)=>(a.level??0)-(i.level??0)||a.name.localeCompare(i.name)).map(a=>({id:a.floor_id,name:a.name,areas:[]})),s={id:aa,name:e,areas:[]};for(let a of Object.values(o.areas??{}).sort((i,r)=>i.name.localeCompare(r.name)))(t.find(i=>i.id===a.floor_id)??s).areas.push(a.area_id);return[...t,s].filter(a=>a.areas.length)}function ds(o,e){let{lights:t,climate:s}=pt(o,e.area_id);return{include:t.length>0||!!s,name:e.name,icon:e.icon||"mdi:home-outline",lights:t,climate:s,climate_button:!!s}}var Q=o=>`#l-${Z(o)}`,ut=o=>`#airco-${Z(o)}`;function ue(o,e){let t=JSON.stringify(o.lights),s=`${t}.some((e) => states[e] && states[e].state === 'on')`;return{type:"custom:button-card",name:o.name,icon:o.icon,show_label:!0,label:`[[[ const on = ${t}.filter((e) => states[e] && states[e].state === 'on').length; return on ? on + ' ${e.on}' : '${e.off}'; ]]]`,tap_action:{action:"navigate",navigation_path:Q(o.name)},hold_action:{action:"none"},styles:{grid:[{"grid-template-areas":'"i" "n" "l"'},{"justify-items":"start"}],card:[{padding:"14px"},{"border-radius":"var(--ha-card-border-radius, 16px)"},{"min-height":"96px"}],img_cell:[{width:"40px"},{height:"40px"},{"border-radius":"50%"},{"background-color":"var(--secondary-background-color)"},{"justify-content":"center"}],icon:[{width:"22px"},{color:"var(--state-icon-color)"}],name:[{"font-weight":"600"},{"justify-self":"start"},{"margin-top":"10px"}],label:[{"justify-self":"start"},{"font-size":"12px"},{color:"var(--secondary-text-color)"}]},state:[{operator:"template",value:`[[[ return ${s}; ]]]`,styles:{img_cell:[{"background-color":"var(--bubble-icon-background-color, var(--secondary-background-color))"}],icon:[{color:"var(--state-light-active-color)"}]}}]}}function me(o,e,t){let s={type:"custom:bubble-card",card_type:"pop-up",hash:Q(o.name),name:o.name,icon:o.icon,show_header:e.show_header,width_desktop:`${e.width_desktop}px`,margin_top_mobile:`${e.margin_top_mobile}%`,bg_opacity:e.glass?String(e.opacity):"100",bg_blur:e.glass?"14":"0"},a=[s];for(let i of o.lights)a.push({type:"tile",entity:i,features:[{type:"light-brightness"}]});return o.climate&&o.climate_button&&a.push(_e(o.climate,o.name,t)),We(s,a.slice(1))}function _e(o,e,t){let s=ut(e);return{type:"custom:bubble-card",card_type:"button",button_type:"name",entity:o,name:t.climate,icon:"mdi:air-conditioner",show_state:!0,show_attribute:!0,attribute:"current_temperature",tap_action:{action:"navigate",navigation_path:s},button_action:{tap_action:{action:"navigate",navigation_path:s}}}}function hs(o,e,t){let s=e.filter(a=>a.rooms.length).map(a=>({type:"grid",cards:[{type:"heading",heading:a.name},...a.rooms.map(i=>ue(i,t)),...a.rooms.map(i=>me(i,o.popup,t))]}));return{title:o.title,path:o.path,icon:"mdi:home-floor-plan",type:"sections",max_columns:Math.max(1,Math.min(4,s.length)),sections:s}}var ge=class extends f{connectedCallback(){super.connectedCallback();let e=cs(this.hass,this.t("rm_other"));this._order=Object.fromEntries(e.map(t=>[t.id,[...t.areas]])),this._floorNames=Object.fromEntries(e.map(t=>[t.id,t.name])),this._rooms=Object.fromEntries(Object.values(this.hass.areas??{}).map(t=>[t.area_id,ds(this.hass,t)])),this._settings={title:this.t("tab_rooms").split(" ")[0],path:"kamers",popup:{glass:!1,opacity:80,width_desktop:540,margin_top_mobile:20,show_header:!0}},this._open=null,this._loadDashboards()}async _loadDashboards(){this._dashboards=await D(this.hass,this.hass.localize("panel.states")||"Overview"),this._dashboard=(this._dashboards.find(e=>e.editable)??this._dashboards[0])?.url_path??null}get _labels(){return{on:this.t("rm_on"),off:this.t("rm_off"),climate:this.t("rm_climate_label")}}_floors(){return Object.entries(this._order).map(([e,t])=>({id:e,name:this._floorNames[e],rooms:t.map(s=>this._rooms[s]).filter(s=>s?.include)}))}_room(e,t){this._rooms={...this._rooms,[e]:{...this._rooms[e],...t}}}_move(e,t,s){let a=[...this._order[e]],i=t+s;i<0||i>=a.length||([a[t],a[i]]=[a[i],a[t]],this._order={...this._order,[e]:a})}_setPopup(e,t){this._settings={...this._settings,popup:{...this._settings.popup,[e]:t}}}_create(){let e=this._dashboards.find(a=>a.url_path===this._dashboard),{title:t,path:s}=this._settings;this._run(async()=>{let a=await y(this.hass,e.url_path),i=(a.views??[]).some(r=>r.path===s);this._ask(this.t(i?"rm_replace_confirm":"rm_create_confirm",{title:t}),()=>this._run(async()=>{let r=JSON.parse(JSON.stringify(a));r.views??=[];let l=hs(this._settings,this._floors(),this._labels),c=r.views.findIndex(h=>h.path===s);c===-1?r.views.push(l):r.views[c]=l,await C(this.hass,e.url_path,a,r)},this.t("rm_created",{title:t})))})}render(){if(!Object.keys(this.hass.areas??{}).length)return n`<p class="hint">${this.t("no_areas")}</p>`;let e=this._settings,t=e.popup,s=this._dashboards??[],a=s.find(i=>i.url_path===this._dashboard);return n`
      <p class="hint">${this.t("rm_view_intro")}</p>
      <div class="layout">
        <div class="settings">
          <div class="card">
            <h2>${this.t("rm_view")}</h2>
            <label class="row">
              <span>${this.t("cl_dashboard")}</span>
              <select @change=${i=>this._dashboard=i.target.value||null}>
                ${s.map(i=>n`<option value=${i.url_path??""} ?selected=${i.url_path===this._dashboard}>
                    ${i.title}
                  </option>`)}
              </select>
            </label>
            ${a&&!a.editable?this._warning(this.t("cl_readonly")):d}
            <label class="row">
              <span>${this.t("rm_title")}</span>
              <input
                type="text"
                .value=${e.title}
                @input=${i=>this._settings={...e,title:i.target.value}}
              />
            </label>
            <label class="row">
              <span>${this.t("rm_path")}</span>
              <input
                type="text"
                .value=${e.path}
                @change=${i=>this._settings={...e,path:Z(i.target.value)||"kamers"}}
              />
            </label>
          </div>

          <div class="card">
            <h2>${this.t("rm_popups")}</h2>
            <div class="segment" role="radiogroup">
              ${[[!1,this.t("rm_solid")],[!0,this.t("rm_glass")]].map(([i,r])=>n`<button
                  role="radio"
                  aria-checked=${t.glass===i?"true":"false"}
                  class=${t.glass===i?"active":""}
                  @click=${()=>this._setPopup("glass",i)}
                >
                  ${r}
                </button>`)}
            </div>
            ${t.glass?this._popupSlider("opacity",this.t("rm_opacity"),30,100,"%"):d}
            ${this._popupFormat()}
            ${this._popupSlider("width_desktop",this.t("rm_width"),360,900,"px")}
            ${this._popupSlider("margin_top_mobile",this.t("rm_height"),0,60,"%")}
            <label class="row">
              <span>${this.t("rm_header")}</span>
              <input
                type="checkbox"
                class="switch"
                .checked=${A(t.show_header)}
                @change=${i=>this._setPopup("show_header",i.target.checked)}
              />
            </label>
          </div>

          ${Object.entries(this._order).map(([i,r])=>this._floorCard(i,r))}

          <button
            class="primary create"
            ?disabled=${this._busy||!a?.editable||!this._floors().some(i=>i.rooms.length)}
            @click=${this._create}
          >
            ${this.t("rm_create")}
          </button>
        </div>

        <aside class="card preview">
          <h2>${this.t("preview")}</h2>
          ${this._preview()}
        </aside>
      </div>
      ${this._bar({})}
    `}_popupSlider(e,t,s,a,i){let r=this._settings.popup;return n`
      <label class="row slider">
        <span>${t}</span>
        <span class="inline">
          <input
            type="range"
            min=${s}
            max=${a}
            step="1"
            .value=${String(r[e])}
            @input=${l=>this._setPopup(e,Number(l.target.value))}
          />
          <output>${r[e]}${i}</output>
        </span>
      </label>
    `}_floorCard(e,t){return n`
      <div class="card floor" data-floor=${this._floorNames[e]}>
        <h2>${this._floorNames[e]}</h2>
        ${t.map((s,a)=>{let i=this._rooms[s];return n`
            <div class="room ${i.include?"":"off"}">
              <input
                type="checkbox"
                aria-label="${this.t("rm_include")} ${i.name}"
                .checked=${A(i.include)}
                @change=${r=>this._room(s,{include:r.target.checked})}
              />
              <ha-icon .icon=${i.icon}></ha-icon>
              <div class="fields">
                <input
                  type="text"
                  aria-label=${this.t("cl_name")}
                  .value=${i.name}
                  @input=${r=>this._room(s,{name:r.target.value})}
                />
                <input
                  type="text"
                  class="icon-field"
                  aria-label=${this.t("rm_icon")}
                  .value=${i.icon}
                  @change=${r=>/^mdi:[a-z0-9-]+$/.test(r.target.value.trim())&&this._room(s,{icon:r.target.value.trim()})}
                />
                <details>
                  <summary>
                    ${i.lights.length===1?this.t("rm_light_one"):i.lights.length?this.t("rm_lights",{count:i.lights.length}):this.t("rm_no_lights")}
                  </summary>
                  ${this._lightChoices(s,i)}
                </details>
                ${i.climate?n`<label class="climate">
                      <input
                        type="checkbox"
                        .checked=${A(i.climate_button)}
                        @change=${r=>this._room(s,{climate_button:r.target.checked})}
                      />
                      ${this.t("rm_climate")}
                      <small>${this.t("rm_climate_hint",{hash:ut(i.name)})}</small>
                    </label>`:d}
              </div>
              <span class="moves">
                <button class="icon" title=${this.t("move_up")} ?disabled=${a===0} @click=${()=>this._move(e,a,-1)}>
                  <ha-icon icon="mdi:arrow-up"></ha-icon>
                </button>
                <button
                  class="icon"
                  title=${this.t("move_down")}
                  ?disabled=${a===t.length-1}
                  @click=${()=>this._move(e,a,1)}
                >
                  <ha-icon icon="mdi:arrow-down"></ha-icon>
                </button>
              </span>
            </div>
          `})}
      </div>
    `}_lightChoices(e,t){let s=Object.keys(this.hass.states).filter(a=>a.startsWith("light.")).sort();return n`<div class="lights">
      ${s.map(a=>n`<label>
          <input
            type="checkbox"
            .checked=${A(t.lights.includes(a))}
            @change=${i=>this._room(e,{lights:i.target.checked?[...t.lights,a]:t.lights.filter(r=>r!==a)})}
          />
          ${this.hass.states[a].attributes.friendly_name??a}
        </label>`)}
    </div>`}_preview(){let e=this._floors().filter(s=>s.rooms.length),t=e.flatMap(s=>s.rooms).find(s=>s.name===this._open)??null;return n`
      <div class="columns">
        ${e.map(s=>n`<div class="column">
            <div class="floor-name">${s.name}</div>
            ${s.rooms.map(a=>n`<button class="pick" @click=${()=>this._open=a.name}>
                <ss-card-preview
                  bare
                  .hass=${this.hass}
                  .t=${this.t}
                  .needs=${G}
                  .config=${ue(a,this._labels)}
                ></ss-card-preview>
              </button>`)}
          </div>`)}
      </div>
      ${t?n`<div class="popup-title">
              <ha-icon .icon=${t.icon}></ha-icon><b>${t.name}</b>
              <button class="icon" @click=${()=>this._open=null}><ha-icon icon="mdi:close"></ha-icon></button>
            </div>
            <ss-card-preview
              .hass=${this.hass}
              .t=${this.t}
              .needs=${G}
              .config=${{type:"vertical-stack",cards:U(me(t,this._settings.popup,this._labels))}}
            ></ss-card-preview>`:n`<p class="hint">${this.t("rm_pick_room")}</p>`}
    `}};g(ge,"properties",{...f.properties,_settings:{state:!0},_rooms:{state:!0},_order:{state:!0},_dashboards:{state:!0},_dashboard:{state:!0},_selected:{state:!0},_open:{state:!0}}),g(ge,"styles",[f.styles,v`
      select {
        font: inherit;
        max-width: 220px;
        padding: 6px 8px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: var(--primary-text-color);
      }

      .room {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        padding: 10px 0;
        border-top: 1px solid var(--divider-color);
      }

      .room.off .fields,
      .room.off > ha-icon {
        opacity: 0.45;
      }

      .room > input[type="checkbox"] {
        margin-top: 10px;
        accent-color: var(--primary-color);
      }

      .room > ha-icon {
        margin-top: 6px;
        color: var(--primary-color);
      }

      .fields {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        gap: 6px 10px;
        align-items: center;
      }

      .fields > input[type="text"] {
        flex: 1;
        min-width: 140px;
      }

      .fields .icon-field {
        flex: 0 1 170px;
        font-size: 13px;
      }

      details {
        flex-basis: 100%;
        font-size: 13px;
      }

      summary {
        cursor: pointer;
        color: var(--secondary-text-color);
      }

      .lights {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
        gap: 4px 12px;
        margin-top: 6px;
      }

      .lights label,
      .climate {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
      }

      .climate {
        flex-basis: 100%;
        flex-wrap: wrap;
      }

      .climate small {
        margin: 0;
      }

      .moves {
        display: flex;
      }

      .icon {
        display: inline-flex;
        padding: 6px;
        border-radius: 50%;
      }

      .create {
        margin-bottom: 16px;
      }

      .columns {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 12px;
      }

      .column {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .floor-name {
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--secondary-text-color);
      }

      .pick {
        padding: 0;
        text-align: start;
      }

      .popup-title {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 16px 0 8px;
      }

      .popup-title button {
        margin-inline-start: auto;
      }
    `]);customElements.get("ss-rooms-view")||customElements.define("ss-rooms-view",ge);var us=/\[\s*(?:["'`]light\.[a-z0-9_]+["'`]\s*,?\s*)+\]/g,ms=/(const\s+NAME\s*=\s*)(["'`])((?:\\.|(?!\2).)*)\2/,_s=/(const\s+ICON\s*=\s*)(["'`])((?:\\.|(?!\2).)*)\2/,E=o=>JSON.parse(JSON.stringify(o));function gs(o){return o?.tap_action?.navigation_path??o?.button_action?.tap_action?.navigation_path??null}function be(o){if(o?.type==="custom:bubble-card"&&o.card_type==="pop-up")return o;let e=o?.type==="vertical-stack"?o.cards?.[0]:null;return e?.type==="custom:bubble-card"&&e.card_type==="pop-up"?e:null}function bs(o){return o.type==="vertical-stack"?{list:o.cards,start:1}:(o.cards??=[],{list:o.cards,start:0})}function X(o,e){if(Array.isArray(o))o.forEach((t,s)=>{typeof t=="string"?o[s]=e(t):X(t,e)});else if(o&&typeof o=="object")for(let[t,s]of Object.entries(o))typeof s=="string"?o[t]=e(s):X(s,e)}function ps(o,e){let t=null;return X(E(o),s=>{let a=s.match(e);return a&&t===null&&(t=a[3]),s}),t}function ia(o){let e=null;return X(E(o),t=>{let s=t.match(us);return s&&!e&&(e=JSON.parse(s[0].replace(/['`]/g,'"').replace(/,\s*\]/,"]"))),t}),e}function oa(o,e){(o.views??[]).forEach((t,s)=>{let a=(i,r)=>(i??[]).forEach((l,c)=>{e(l,{...r,index:c}),Array.isArray(l?.cards)&&!be(l)&&a(l.cards,{...r,nested:!0})});a(t.cards,{view:s,section:null}),(t.sections??[]).forEach((i,r)=>a(i.cards,{view:s,section:r}))})}function fe(o){return o?.type!=="sections"?[{index:null,label:o?.title??""}]:(o.sections??[]).map((e,t)=>{let s=(e.cards??[]).find(a=>a.type==="heading")?.heading;return{index:t,label:s??`#${t+1}`}})}function Ge(o){let e=new Map,t=a=>(e.has(a)||e.set(a,{hash:a,tile:null,popup:null}),e.get(a));oa(o,(a,i)=>{let r=be(a);r?.hash?.startsWith("#")&&(t(r.hash).popup={...i});let l=gs(a);if(l?.startsWith("#")&&!r&&!l.startsWith("#airco")){let c=t(l);c.tile||(c.tile={...i})}});let s=[];for(let a of e.values()){if(!a.popup)continue;let i=j(o,a.popup),r=be(i),l=bs(E(i)),c=l.list.slice(l.start),h=a.tile?j(o,a.tile):null,_=c.map(p=>p.entity).filter(p=>p?.startsWith("light."));s.push({hash:a.hash,name:r.name??(h&&(ps(h,ms)??h.name))??a.hash,icon:r.icon??(h&&(ps(h,_s)??h.icon))??"mdi:home-outline",lights:_.length?_:(h&&ia(h))??[],climate:c.find(p=>p.entity?.startsWith("climate."))?.entity??null,tile:a.tile,popup:a.popup})}return s.sort((a,i)=>a.name.localeCompare(i.name))}function j(o,e){let t=o.views[e.view];return(e.section===null?t.cards:t.sections[e.section].cards)[e.index]}function Ie(o,e,t){let s=E(o),{name:a,icon:i,lights:r}=t,l=JSON.stringify(r);if(e.tile){let w=j(s,e.tile);typeof w.name=="string"&&!w.name.includes("[[[")&&(w.name=a),typeof w.icon=="string"&&!w.icon.includes("[[[")&&(w.icon=i),X(w,K=>K.replace(ms,(Ee,se,H)=>`${se}${H}${a.replace(H,`\\${H}`)}${H}`).replace(_s,(Ee,se,H)=>`${se}${H}${i}${H}`).replace(us,l))}let c=j(s,e.popup),h=be(c);h.name=a,h.icon=i;let _=bs(c),p=_.list.slice(_.start),m=w=>w.entity?.startsWith("climate.")||gs(w)?.startsWith("#airco");if("climate"in t){let w=p.find(m);p=p.filter(K=>!m(K)),t.climate&&p.push(w?.entity===t.climate?w:t.climateCard)}let u=w=>w.entity?.startsWith("light."),b=p.findIndex(u),S=b===-1?{type:"tile",features:[{type:"light-brightness"}]}:p[b],ee=r.map(w=>{let K=p.find(se=>se.entity===w);if(K)return K;let Ee={...E(S),entity:w};return delete Ee.name,Ee}),te=p.filter(w=>!u(w)),wt=b===-1?0:p.slice(0,b).filter(w=>!u(w)).length,Ts=[...te.slice(0,wt),...ee,...te.slice(wt)];return _.list.splice(_.start,_.list.length-_.start,...E(Ts)),s}function mt(o,e,t,s){let a=E(o),i=a.views[e];if(i.type==="sections"){i.sections??=[];let r=i.sections[t]??(i.sections.push({type:"grid",cards:[]}),i.sections.at(-1));r.cards??=[],r.cards.push(...s)}else i.cards??=[],i.cards.push(...s);return a}function fs(o,e,t,s){let a=E(o),i=e.tile?E(j(a,e.tile)):null,r=E(j(a,e.popup)),l=t.hash;if(i){X(i,u=>u===e.hash?l:u);for(let u of[i.tap_action,i.button_action?.tap_action])u?.navigation_path===e.hash&&(u.navigation_path=l)}be(r).hash=l;let _=Ie({views:[{cards:[i??{type:"markdown"},r]}]},{...e,...{tile:i?{view:0,section:null,index:0}:null,popup:{view:0,section:null,index:1}}},{name:t.name,icon:t.icon,lights:t.lights,climate:t.climate,climateCard:s}),[p,m]=_.views[0].cards;return i?[p,m]:[m]}var ra={nl:["maandag","dinsdag","woensdag","donderdag","vrijdag","zaterdag","zondag"],en:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]},na={nl:["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"],en:["January","February","March","April","May","June","July","August","September","October","November","December"]},ws={nl:{morning:"Goedemorgen",afternoon:"Goedemiddag",evening:"Goedenavond",lights:"lampen aan",home:"thuis",batteries:"Bijna lege batterijen",offline:"Niet beschikbaar",allGood:"Alles in orde"},en:{morning:"Good morning",afternoon:"Good afternoon",evening:"Good evening",lights:"lights on",home:"home",batteries:"Low batteries",offline:"Unavailable",allGood:"All good"}},vs=o=>`[${o.map(e=>`'${e}'`).join(", ")}]`;function xs(o,e){let t=ws[o],s=e?` \xB7 {{ state_attr('${e}', 'temperature') }}{{ state_attr('${e}', 'temperature_unit') }}`:"";return{type:"markdown",text_only:!0,content:["{% set h = now().hour %}",`## {{ '${t.morning}' if h < 12 else '${t.afternoon}' if h < 18 else '${t.evening}' }}, {{ user }}`,`{{ ${vs(ra[o])}[now().weekday()] }} {{ now().day }} {{ ${vs(na[o])}[now().month - 1] }}`,"",`{{ states.light | selectattr('state', 'eq', 'on') | list | count }} ${t.lights} \xB7 {{ states.person | selectattr('state', 'eq', 'home') | list | count }} ${t.home}${s}`].join(`
`)}}function $s(o){let e=t=>({action:"perform-action",perform_action:"scene.turn_on",target:{entity_id:t}});return{type:"grid",columns:Math.min(3,Math.max(1,o.length)),square:!1,cards:o.map(t=>({type:"tile",entity:t,tap_action:e(t),icon_tap_action:e(t)}))}}function ys(o){let e=ws[o];return{type:"markdown",content:["{% set low = namespace(names=[]) %}","{% for s in states.sensor if s.attributes.device_class == 'battery' and s.state | is_number and s.state | float < 20 %}","{% set low.names = low.names + [s.name ~ ' (' ~ s.state ~ '%)'] %}","{% endfor %}","{% set off = states | selectattr('state', 'eq', 'unavailable') | list | count %}","{% if low.names or off %}",`{% if low.names %}**${e.batteries}:** {{ low.names | join(', ') }}{% endif %}`,"",`{% if off %}**${e.offline}:** {{ off }}{% endif %}`,"{% else %}",`\u2713 ${e.allGood}`,"{% endif %}"].join(`
`)}}function ks(o){return{type:"weather-forecast",entity:o,forecast_type:"daily",show_forecast:!0}}var _t="new",la={glass:!1,opacity:80,width_desktop:540,margin_top_mobile:20,show_header:!0},ve=class extends f{constructor(){super(),this._filter="",this._other={kind:"greeting",scenes:[],view:0,section:0}}connectedCallback(){super.connectedCallback(),this._loadDashboards()}get _lang(){return(this.hass?.locale?.language||this.hass?.language||"nl").startsWith("nl")?"nl":"en"}get _labels(){return{on:this.t("rm_on"),off:this.t("rm_off"),climate:this.t("rm_climate_label")}}async _loadDashboards(){this._dashboards=await D(this.hass,this.hass.localize("panel.states")||"Overview");let e=this._dashboards.find(t=>t.editable)??this._dashboards[0];e&&await this._pickDashboard(e.url_path)}async _pickDashboard(e,t){this._dashboard=e;try{this._config=await y(this.hass,e)}catch{this._config={views:[]}}this._place={view:0,section:0},this._other={...this._other,view:0,section:0};let s=this._found();this._model=s[0]?.hash??null,this._choose(t??(s[0]?`found:${s[0].hash}`:_t))}_found(){return this._config?Ge(this._config):[]}_suggestions(){let e=new Set(this._found().map(t=>t.hash));return Object.values(this.hass.areas??{}).filter(t=>!e.has(Q(t.name))).sort((t,s)=>t.name.localeCompare(s.name))}_choose(e){if(this._selected=e,this._toast=null,e.startsWith("found:")){let t=this._found().find(s=>`found:${s.hash}`===e);this._draft={name:t.name,icon:t.icon,lights:[...t.lights],climate:t.climate};return}if(e.startsWith("area:")){let t=this.hass.areas[e.slice(5)],{lights:s,climate:a}=pt(this.hass,t.area_id);this._draft={name:t.name,icon:t.icon||"mdi:home-outline",lights:s,climate:a},this._place={...this._place,section:this._sectionForFloor(t.floor_id)};return}this._draft={name:this.t("rm_new_room"),icon:"mdi:home-outline",lights:[],climate:null}}_sectionForFloor(e){let t=this.hass.floors?.[e]?.name?.toLowerCase(),s=fe(this._config.views?.[this._place.view]);return s.find(i=>t&&i.label.toLowerCase()===t)?.index??s[0]?.index??0}get _room(){return this._selected?.startsWith("found:")?this._found().find(e=>`found:${e.hash}`===this._selected):null}_set(e,t){this._draft={...this._draft,[e]:t},this._toast=null}get dirty(){let e=this._room;return!e||!this._draft?!1:JSON.stringify(this._draft)!==JSON.stringify({name:e.name,icon:e.icon,lights:e.lights,climate:e.climate})}_changedConfig(){let e=this._room,t=this._draft;return Ie(this._config,e,{name:t.name,icon:t.icon,lights:t.lights,climate:t.climate,climateCard:t.climate?_e(t.climate,t.name,this._labels):null})}_newRoom(){let e=this._draft;return{...e,include:!0,climate_button:!!e.climate}}_newCards(e=this._config){let t=this._newRoom(),s=Ge(e).find(a=>a.hash===this._model);if(s){let a=t.climate?_e(t.climate,t.name,this._labels):null;return fs(e,s,{...t,hash:Q(t.name)},a)}return[ue(t,this._labels),me(t,la,this._labels)]}_placeLabel(e,t){let s=this._config.views[e],a=fe(s).find(i=>i.index===t)?.label??"";return{view:s?.title??s?.path??`${e+1}`,section:a}}_save(){let e=this._room,t=this._dashboards.find(i=>i.url_path===this._dashboard);if(e){this._ask(this.t("rm_update_confirm",{name:this._draft.name}),()=>this._run(async()=>{let i=await y(this.hass,t.url_path),r=Ie(i,Ge(i).find(l=>l.hash===e.hash),{...this._draft,climateCard:this._draft.climate?_e(this._draft.climate,this._draft.name,this._labels):null});await C(this.hass,t.url_path,i,r),await this._pickDashboard(t.url_path,`found:${e.hash}`)},this.t("rm_update_done")));return}let s=Q(this._draft.name);if(this._found().some(i=>i.hash===s)){this._showToast(this.t("rm_hash_taken",{hash:s}));return}let a=this._placeLabel(this._place.view,this._place.section);this._ask(this.t("rm_put_confirm",{name:this._draft.name,...a}),()=>this._run(async()=>{let i=await y(this.hass,t.url_path),r=mt(i,this._place.view,this._place.section,this._newCards(i));await C(this.hass,t.url_path,i,r),await this._pickDashboard(t.url_path,`found:${s}`)},this.t("rm_put_done")))}render(){let e=this._dashboards??[],t=e.find(s=>s.url_path===this._dashboard);return n`
      <p class="intro">${this.t("rooms_intro")}</p>
      <div class="card">
        <label class="row">
          <span>${this.t("cl_dashboard")}</span>
          <select @change=${s=>this._pickDashboard(s.target.value||null)}>
            ${e.map(s=>n`<option value=${s.url_path??""} ?selected=${s.url_path===this._dashboard}>${s.title}</option>`)}
          </select>
        </label>
        ${t&&!t.editable?this._warning(this.t("cl_readonly")):d}
      </div>
      ${this._config&&this._draft?this._roomSection(t):d}
      ${this._config?this._otherCards(t):d}
      <div class="card">
        <details>
          <summary><h2>${this.t("rm_whole_view")}</h2></summary>
          <ss-rooms-view .hass=${this.hass} .narrow=${this.narrow}></ss-rooms-view>
        </details>
      </div>
      ${this._bar({onCancel:()=>this._choose(this._selected),onSave:()=>this._save()})}
    `}_roomSection(e){let t=this._found(),s=this._room,a=this._draft;return n`
      <div class="chips">
        ${t.map(i=>n`<button
            class="chip ${this._selected===`found:${i.hash}`?"active":""}"
            @click=${()=>this._choose(`found:${i.hash}`)}
          >
            <ha-icon .icon=${i.icon}></ha-icon>${i.name}
          </button>`)}
        ${t.length?d:n`<span class="hint">${this.t("rm_no_rooms_found")}</span>`}
        ${this._suggestions().map(i=>n`<button
            class="chip suggestion ${this._selected===`area:${i.area_id}`?"active":""}"
            title=${this.t("rm_from_area")}
            @click=${()=>this._choose(`area:${i.area_id}`)}
          >
            <ha-icon icon="mdi:plus"></ha-icon>${i.name}
          </button>`)}
        <button class="chip add ${this._selected===_t?"active":""}" @click=${()=>this._choose(_t)}>
          <ha-icon icon="mdi:plus"></ha-icon>${this.t("rm_add_room")}
        </button>
      </div>

      <div class="layout">
        <div class="settings">
          <div class="card">
            <h2>${this.t("rm_room")}</h2>
            ${s?n`<p class="hint">${this.t("rm_keeps_design")}</p>`:d}
            <label class="row">
              <span>${this.t("cl_name")}</span>
              <input type="text" .value=${a.name} @input=${i=>this._set("name",i.target.value)} />
            </label>
            <label class="row">
              <span>${this.t("rm_icon")}</span>
              <span class="inline">
                <ha-icon .icon=${a.icon}></ha-icon>
                <input
                  type="text"
                  .value=${a.icon}
                  @change=${i=>/^mdi:[a-z0-9-]+$/.test(i.target.value.trim())&&this._set("icon",i.target.value.trim())}
                />
              </span>
            </label>
            <label class="row">
              <span>${this.t("rm_climate_pick")}</span>
              <select @change=${i=>this._set("climate",i.target.value||null)}>
                <option value="" ?selected=${!a.climate}>${this.t("rm_no_climate")}</option>
                ${Object.keys(this.hass.states).filter(i=>i.startsWith("climate.")).map(i=>n`<option value=${i} ?selected=${i===a.climate}>
                      ${this.hass.states[i].attributes.friendly_name??i}
                    </option>`)}
              </select>
            </label>
            <div class="row column">
              <span>${this.t("rm_lights_pick")} (${a.lights.length})</span>
              <input
                type="text"
                placeholder=${this.t("rm_filter")}
                aria-label=${this.t("rm_filter")}
                .value=${this._filter}
                @input=${i=>this._filter=i.target.value.toLowerCase()}
              />
              ${this._lightList()}
            </div>
          </div>

          <div class="card">
            <h2>${this.t("rm_where")}</h2>
            ${s?n`<p class="hint">${this.t("rm_is_at",this._placeLabel(s.popup.view,s.popup.section))}</p>`:n`${this._placePicker(this._place,i=>this._place=i)} ${this._designPicker()}`}
            <button
              class="primary"
              ?disabled=${this._busy||!e?.editable||s&&!this.dirty||!a.name.trim()}
              @click=${this._save}
            >
              ${s?this.t("rm_update"):this.t("rm_put")}
            </button>
          </div>
        </div>

        <aside class="card preview">
          <h2>${this.t("preview")}</h2>
          ${this._roomPreview()}
        </aside>
      </div>
    `}_lightList(){let e=this._draft,t=Object.keys(this.hass.states).filter(s=>s.startsWith("light.")).map(s=>({id:s,name:this.hass.states[s].attributes.friendly_name??s})).filter(s=>!this._filter||s.name.toLowerCase().includes(this._filter)||s.id.includes(this._filter)||e.lights.includes(s.id)).sort((s,a)=>s.name.localeCompare(a.name));return n`<div class="lights">
      ${ls(t,s=>s.id,s=>n`<label>
          <input
            type="checkbox"
            .checked=${A(e.lights.includes(s.id))}
            @change=${a=>this._set("lights",a.target.checked?[...e.lights,s.id]:e.lights.filter(i=>i!==s.id))}
          />
          ${s.name}
        </label>`)}
    </div>`}_designPicker(){let e=this._found();return n`
      <label class="row">
        <span>${this.t("rm_design")}</span>
        <select @change=${t=>this._model=t.target.value||null}>
          ${e.map(t=>n`<option value=${t.hash} ?selected=${t.hash===this._model}>${this.t("rm_like",{name:t.name})}</option>`)}
          <option value="" ?selected=${!this._model}>${this.t("rm_standard")}</option>
        </select>
      </label>
      ${this._model?d:this._popupFormat()}
    `}_placePicker(e,t){let s=this._config.views??[],a=fe(s[e.view]);return n`
      <label class="row">
        <span>${this.t("cl_view")}</span>
        <select @change=${i=>t({view:Number(i.target.value),section:fe(s[Number(i.target.value)])[0]?.index??0})}>
          ${s.map((i,r)=>n`<option value=${r} ?selected=${r===e.view}>${i.title??i.path??r+1}</option>`)}
        </select>
      </label>
      ${s[e.view]?.type==="sections"?n`<label class="row">
            <span>${this.t("rm_section")}</span>
            <select @change=${i=>t({...e,section:Number(i.target.value)})}>
              ${a.map(i=>n`<option value=${i.index} ?selected=${i.index===e.section}>${i.label}</option>`)}
            </select>
          </label>`:d}
    `}_roomPreview(){let e,t,s=this._room;if(s){let a=this._changedConfig();e=s.tile?j(a,s.tile):null;let i=j(a,s.popup);t=U(i)}else{let a=this._newCards();e=a.length===2?a[0]:null,t=U(a.at(-1))}return n`
      ${e?n`<div class="tile-preview">
            <ss-card-preview bare .hass=${this.hass} .t=${this.t} .needs=${G} .config=${e}></ss-card-preview>
          </div>`:d}
      <div class="popup-title"><ha-icon .icon=${this._draft.icon}></ha-icon><b>${this._draft.name}</b></div>
      <ss-card-preview
        .hass=${this.hass}
        .t=${this.t}
        .needs=${G}
        .config=${{type:"vertical-stack",cards:t}}
      ></ss-card-preview>
    `}_otherConfig(){let e=this._other,t=Object.keys(this.hass.states).find(s=>s.startsWith("weather."));switch(e.kind){case"scenes":return e.scenes.length?$s(e.scenes):null;case"status":return ys(this._lang);case"weather":return t?ks(t):null;default:return xs(this._lang,t)}}_addOther(){let e=this._dashboards.find(i=>i.url_path===this._dashboard),t=this._other,s=this._otherConfig(),a=this._placeLabel(t.view,t.section);this._ask(this.t("oc_add_confirm",{card:this.t(`oc_${t.kind}`),...a}),()=>this._run(async()=>{let i=await y(this.hass,e.url_path);await C(this.hass,e.url_path,i,mt(i,t.view,t.section,[s])),this._config=await y(this.hass,e.url_path)},this.t("oc_added")))}_otherCards(e){let t=this._other,s=Object.keys(this.hass.states).filter(i=>i.startsWith("scene.")).sort(),a=this._otherConfig();return n`
      <div class="card">
        <h2>${this.t("oc_title")}</h2>
        <p class="hint">${this.t("oc_hint")}</p>
        <div class="layout">
          <div>
            <div class="segment" role="radiogroup">
              ${["greeting","scenes","status","weather"].map(i=>n`<button
                  role="radio"
                  aria-checked=${t.kind===i?"true":"false"}
                  class=${t.kind===i?"active":""}
                  @click=${()=>this._other={...t,kind:i}}
                >
                  ${this.t(`oc_${i}`)}
                </button>`)}
            </div>
            ${t.kind==="scenes"?s.length?n`<div class="lights">
                    ${s.map(i=>n`<label>
                        <input
                          type="checkbox"
                          .checked=${A(t.scenes.includes(i))}
                          @change=${r=>this._other={...t,scenes:r.target.checked?[...t.scenes,i]:t.scenes.filter(l=>l!==i)}}
                        />
                        ${this.hass.states[i].attributes.friendly_name??i}
                      </label>`)}
                  </div>`:n`<p class="hint">${this.t("oc_no_scenes")}</p>`:d}
            ${t.kind==="weather"&&!a?n`<p class="hint">${this.t("oc_no_weather")}</p>`:d}
            ${this._placePicker(t,i=>this._other={...t,...i})}
            <button class="primary" ?disabled=${this._busy||!a||!e?.editable} @click=${this._addOther}>
              ${this.t("oc_add")}
            </button>
          </div>
          <div>
            ${a?n`<ss-card-preview .hass=${this.hass} .t=${this.t} .needs=${[]} .config=${a}></ss-card-preview>`:d}
          </div>
        </div>
      </div>
    `}};g(ve,"properties",{...f.properties,_dashboards:{state:!0},_dashboard:{state:!0},_config:{state:!0},_selected:{state:!0},_draft:{state:!0},_place:{state:!0},_filter:{state:!0},_other:{state:!0},_model:{state:!0}}),g(ve,"styles",[f.styles,v`
      select {
        font: inherit;
        max-width: 240px;
        padding: 6px 8px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: var(--primary-text-color);
      }

      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 16px;
      }

      .chip {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 14px;
        border-radius: 999px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
      }

      .chip.suggestion {
        border-style: dashed;
        color: var(--secondary-text-color);
      }

      .chip.add {
        color: var(--primary-color);
      }

      .chip.active {
        border-color: var(--primary-color);
        border-style: solid;
        color: var(--primary-text-color);
        background: color-mix(in srgb, var(--primary-color) 14%, var(--card-background-color));
      }

      .row.column {
        flex-direction: column;
        align-items: stretch;
      }

      .lights {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 4px 12px;
        max-height: 260px;
        overflow-y: auto;
        margin: 6px 0;
        font-size: 14px;
      }

      .lights label {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .lights input,
      .lights label input {
        accent-color: var(--primary-color);
      }

      .tile-preview {
        max-width: 220px;
        margin-bottom: 12px;
      }

      .popup-title {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
      }

      details summary {
        cursor: pointer;
        list-style: none;
      }

      details summary h2 {
        display: inline;
      }
    `]);customElements.get("ss-rooms-tab")||customElements.define("ss-rooms-tab",ve);var we=-1,xe=class extends ${constructor(){super(),this.items=[],this.categories=[],this.hidden=[],this._selected=null,this._confirm=null,this._dropTarget=null}_emit(e,t=this.hidden){let s=this.canHide?{categories:e,hidden:t}:{categories:e};this.dispatchEvent(new CustomEvent("change",{detail:s}))}_clone(){return this.categories.map(e=>({...e,panels:[...e.panels]}))}_move(e,t,s=null){let a=this._clone();for(let i of a)i.panels=i.panels.filter(r=>r!==e);if(t!==we){let i=a[t].panels,r=s===null?-1:i.indexOf(s);i.splice(r===-1?i.length:r,0,e)}this._emit(a)}_shift(e,t,s){let a=this._clone(),i=a[t].panels,r=i.indexOf(e),l=r+s;r===-1||l<0||l>=i.length||([i[r],i[l]]=[i[l],i[r]],this._emit(a))}_toggleHidden(e){let t=this.hidden.includes(e)?this.hidden.filter(s=>s!==e):[...this.hidden,e];this._emit(this.categories,t)}_addGroup(){let e=new Set(this.categories.map(s=>s.name.toLowerCase())),t=this.t("new_group");for(let s=2;e.has(t.toLowerCase());s+=1)t=`${this.t("new_group")} ${s}`;this._emit([...this._clone(),{name:t,panels:[]}])}_rename(e,t){let s=this._clone();s[e].name=t.trim()||s[e].name,this._emit(s)}_swapGroups(e,t){let s=this._clone(),a=e+t;a<0||a>=s.length||([s[e],s[a]]=[s[a],s[e]],this._emit(s))}_removeGroup(e){this._confirm=null,this._emit(this._clone().filter((t,s)=>s!==e))}_item(e){return this.items.find(t=>t.path===e)??{path:e,title:e,icon:"mdi:help",missing:!0}}render(){let e=new Set(this.categories.flatMap(s=>s.panels)),t=this.items.filter(s=>!e.has(s.path));return n`
      ${this._zone(we,t,n`
        <div class="title">
          <strong>${this.t("ungrouped")}</strong>
          <span class="hint">${this.t("ungrouped_hint")}</span>
        </div>
      `)}
      ${this.categories.map((s,a)=>this._zone(a,s.panels.map(i=>this._item(i)),this._groupHeader(s,a)))}
      <button class="add" ?disabled=${this.disabled} @click=${this._addGroup}>
        <ha-icon icon="mdi:plus"></ha-icon>${this.t("add_group")}
      </button>
    `}_groupHeader(e,t){return this._confirm===t?n`
        <div class="title confirm">
          <span>${this.t("remove_group_confirm")}</span>
          <button class="danger" @click=${()=>this._removeGroup(t)}>${this.t("yes")}</button>
          <button @click=${()=>this._confirm=null}>${this.t("no")}</button>
        </div>
      `:n`
      <div class="title">
        <input
          .value=${e.name}
          maxlength="40"
          aria-label=${this.t("group_name")}
          ?disabled=${this.disabled}
          @change=${s=>this._rename(t,s.target.value)}
        />
        <button
          class="icon"
          title=${this.t("move_up")}
          ?disabled=${this.disabled||t===0}
          @click=${()=>this._swapGroups(t,-1)}
        >
          <ha-icon icon="mdi:arrow-up"></ha-icon>
        </button>
        <button
          class="icon"
          title=${this.t("move_down")}
          ?disabled=${this.disabled||t===this.categories.length-1}
          @click=${()=>this._swapGroups(t,1)}
        >
          <ha-icon icon="mdi:arrow-down"></ha-icon>
        </button>
        <button
          class="icon"
          title=${this.t("remove_group")}
          ?disabled=${this.disabled}
          @click=${()=>this._confirm=t}
        >
          <ha-icon icon="mdi:delete-outline"></ha-icon>
        </button>
      </div>
    `}_zone(e,t,s){let a=this._selected,i=a&&a.group!==e;return n`
      <section
        class="zone ${this._dropTarget===e?"over":""}"
        @dragover=${r=>this._dragOver(r,e)}
        @dragleave=${()=>this._dropTarget=null}
        @drop=${r=>this._drop(r,e,null)}
      >
        ${s}
        <div class="chips">
          ${t.map(r=>this._chip(r,e))}
          ${!t.length&&e!==we?n`<span class="hint">${this.t("empty_group")}</span>`:d}
        </div>
        ${i?n`<button class="here" @click=${()=>this._moveSelected(e)}>
              <ha-icon icon="mdi:arrow-down-bold"></ha-icon>${this.t("move_here")}
            </button>`:d}
      </section>
    `}_chip(e,t){let s=this.hidden.includes(e.path),a=this._selected?.path===e.path,i=t===we?[]:this.categories[t].panels,r=i.indexOf(e.path);return n`
      <div
        class="chip ${s?"hidden":""} ${a?"selected":""}"
        draggable=${this.disabled?"false":"true"}
        @dragstart=${l=>{l.dataTransfer.setData("text/plain",e.path),l.dataTransfer.effectAllowed="move"}}
        @dragend=${()=>this._dropTarget=null}
        @drop=${l=>{l.stopPropagation(),this._drop(l,t,e.path)}}
      >
        <button
          class="label"
          ?disabled=${this.disabled}
          aria-pressed=${a?"true":"false"}
          @click=${()=>this._selected=a?null:{path:e.path,group:t}}
        >
          <ha-icon .icon=${e.icon}></ha-icon>
          <span>${e.title}</span>
          ${e.missing?n`<em>${this.t("missing")}</em>`:d}
        </button>
        ${a&&t!==we?n`
              <button
                class="icon"
                title=${this.t("move_left")}
                ?disabled=${r===0}
                @click=${()=>this._shift(e.path,t,-1)}
              >
                <ha-icon icon="mdi:chevron-left"></ha-icon>
              </button>
              <button
                class="icon"
                title=${this.t("move_right")}
                ?disabled=${r===i.length-1}
                @click=${()=>this._shift(e.path,t,1)}
              >
                <ha-icon icon="mdi:chevron-right"></ha-icon>
              </button>
            `:d}
        ${this.canHide?n`<button
              class="icon"
              title=${s?this.t("show"):this.t("hide")}
              ?disabled=${this.disabled}
              @click=${()=>this._toggleHidden(e.path)}
            >
              <ha-icon icon=${s?"mdi:eye-off-outline":"mdi:eye-outline"}></ha-icon>
            </button>`:d}
      </div>
    `}_dragOver(e,t){this.disabled||(e.preventDefault(),e.dataTransfer.dropEffect="move",this._dropTarget=t)}_drop(e,t,s){if(this.disabled)return;e.preventDefault(),this._dropTarget=null;let a=e.dataTransfer.getData("text/plain");a&&a!==s&&this._move(a,t,s)}_moveSelected(e){let{path:t}=this._selected;this._selected={path:t,group:e},this._move(t,e)}};g(xe,"properties",{items:{attribute:!1},categories:{attribute:!1},hidden:{attribute:!1},disabled:{type:Boolean},canHide:{type:Boolean},t:{attribute:!1},_selected:{state:!0},_confirm:{state:!0},_dropTarget:{state:!0}}),g(xe,"styles",v`
    :host {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .zone {
      border: 1px dashed var(--divider-color);
      border-radius: 12px;
      padding: 10px;
      transition: background-color 120ms;
    }

    .zone.over {
      background: color-mix(in srgb, var(--primary-color) 10%, transparent);
      border-color: var(--primary-color);
    }

    .title {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 8px;
      flex-wrap: wrap;
    }

    .title.confirm span {
      flex: 1;
    }

    .title input {
      flex: 1;
      min-width: 0;
      font: inherit;
      font-weight: 600;
      padding: 6px 8px;
      border-radius: 8px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
    }

    .hint {
      color: var(--secondary-text-color);
      font-size: 13px;
    }

    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      border-radius: 999px;
      background: var(--secondary-background-color);
      border: 1px solid transparent;
      cursor: grab;
      max-width: 100%;
    }

    .chip.selected {
      border-color: var(--primary-color);
      background: color-mix(in srgb, var(--primary-color) 14%, var(--card-background-color));
    }

    .chip.hidden .label {
      opacity: 0.45;
      text-decoration: line-through;
    }

    button {
      font: inherit;
      color: inherit;
      background: none;
      border: 0;
      cursor: pointer;
    }

    button:disabled {
      cursor: default;
      opacity: 0.4;
    }

    .label {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 4px 6px 10px;
      min-width: 0;
    }

    .label span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .label em {
      font-size: 12px;
      color: var(--error-color);
    }

    .label ha-icon,
    .icon ha-icon {
      --mdc-icon-size: 18px;
    }

    .icon {
      display: inline-flex;
      padding: 6px;
      border-radius: 999px;
    }

    .icon:hover:not(:disabled) {
      background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
    }

    .danger {
      color: var(--error-color);
      font-weight: 600;
      padding: 6px 10px;
    }

    .confirm button:not(.danger) {
      padding: 6px 10px;
    }

    .here,
    .add {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-top: 8px;
      padding: 6px 12px;
      border-radius: 999px;
      color: var(--primary-color);
      font-weight: 500;
    }

    .here {
      background: color-mix(in srgb, var(--primary-color) 12%, transparent);
    }

    .add {
      align-self: flex-start;
      margin-top: 0;
    }
  `);customElements.get("ss-groups-editor")||customElements.define("ss-groups-editor",xe);var Ss={phone:{width:430,height:640},tablet:{width:768,height:600},desktop:{width:760,height:560}},$e=class extends ${constructor(){super(),this.settingsLabel="Settings",this.items=[],this.device="desktop",this.page="light",this.expanded=!0,this._scale=1}connectedCallback(){super.connectedCallback(),this._resize=new ResizeObserver(()=>this._fit()),this._resize.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this._resize?.disconnect()}updated(e){e.has("device")&&this._fit()}_fit(){let{width:e}=Ss[this.device];this._scale=Math.min(1,this.clientWidth/e)||1}render(){let e=this.settings;if(!e)return d;let{width:t,height:s}=Ss[this.device];return n`
      <div class="viewport" style="height:${s*this._scale}px">
        <div
          class="screen ${this.page}"
          style="width:${t}px;height:${s}px;transform:scale(${this._scale})"
        >
          ${this.device==="desktop"?this._desktop(e):this._modal(e)}
        </div>
      </div>
    `}_desktop(e){let t=e.floating?e.inset:0,s=(this.expanded?256:56)+t*2;return n`
      <div class="desktop">
        <div class="shell" style="width:${s}px;padding:${t}px;${this._shell(e)}">
          ${this._sidebar(e,{radius:e.floating?e.radius:0,floating:e.floating})}
        </div>
        ${this._page()}
      </div>
    `}_modal(e){let t=this.device==="phone",s=t&&e.floating?e.inset:0,a=t?Math.min(430*.9,e.mobile_width):256;return n`
      ${this._page()}
      <div class="backdrop ${t&&e.mobile_blur?"blurred":""}"></div>
      <div class="drawer ${t?"":"plain"}" style="width:${a}px;padding:${s}px">
        ${this._sidebar(e,{radius:t&&e.floating?e.radius:0,floating:t&&e.floating,opacity:t?Math.min(e.opacity+12,100):e.opacity,phone:t,expanded:!0})}
      </div>
    `}_shell(e){return e.shell==="custom"?`background:${e.shell_color}`:e.shell==="theme"?"background:var(--primary-background-color)":"background:transparent"}_sidebar(e,{radius:t,floating:s,opacity:a=e.opacity,phone:i=!1,expanded:r=this.expanded}){let l=Math.min(Math.max((e.floating?e.radius:0)-6,8),14),c=[`border-radius:${t}px`,`--ss-opacity:${a}%`,`--ss-blur:${e.blur}px`,`--ss-item-radius:${l}px`,`--ss-phone-text:${e.mobile_text_size??14}px`,e.accent?`--sidebar-selected-icon-color:${e.accent};--sidebar-selected-text-color:${e.accent}`:""].join(";"),h=this._rows(e),_=h.find(p=>p.item)?.item.path;return n`
      <nav
        class="sidebar ${s?"floating":""} ${i?"phone":""} ${r?"expanded":""} ${e.highlight}"
        style=${c}
      >
        <div class="menu">
          <ha-icon icon="mdi:menu"></ha-icon>
          ${r?n`<span>Home Assistant</span>`:d}
        </div>
        <div class="list">
          ${h.map(p=>p.heading!==void 0?n`<div class="heading">${r?p.heading:""}</div>`:n`
                  <div
                    class="item ${p.item.path===_?"selected":""} ${e.hover_motion?"motion":""}"
                  >
                    <ha-icon .icon=${p.item.icon}></ha-icon>
                    ${r?n`<span>${p.item.title}</span>`:d}
                  </div>
                `)}
        </div>
        <div class="spacer"></div>
        <div class="item">
          <ha-icon icon="mdi:cog"></ha-icon>
          ${r?n`<span>${this.settingsLabel}</span>`:d}
        </div>
      </nav>
    `}_rows(e){let t=new Set(e.hidden??[]),s=new Set(e.categories.flatMap(l=>l.panels)),a=new Map(this.items.map(l=>[l.path,l])),i=this.items.filter(l=>!s.has(l.path)&&!t.has(l.path)).map(l=>({item:l})),r=new Set;for(let l of e.categories){let c=l.panels.filter(h=>!r.has(h)&&!t.has(h)&&a.has(h)).map(h=>a.get(h));c.forEach(h=>r.add(h.path)),c.length&&(i.push({heading:l.name}),i.push(...c.map(h=>({item:h}))))}return i}_page(){return n`
      <div class="page">
        <div class="toolbar"></div>
        <div class="cards">
          ${[0,1,2,3,4,5].map(()=>n`<div class="card"></div>`)}
        </div>
      </div>
    `}};g($e,"properties",{settings:{attribute:!1},items:{attribute:!1},device:{},page:{},expanded:{type:Boolean},settingsLabel:{},_scale:{state:!0}}),g($e,"styles",v`
    :host {
      display: block;
      min-width: 0;
    }

    .viewport {
      overflow: hidden;
      border-radius: 12px;
      border: 1px solid var(--divider-color);
    }

    .screen {
      position: relative;
      overflow: hidden;
      transform-origin: top left;
      font-family: var(--ha-font-family-body, Roboto, sans-serif);
      --page-bg: var(--primary-background-color, #fafafa);
      background: var(--page-bg);
    }

    /* Like the floor plan dashboard that turned the gap black. */
    .screen.dark {
      --page-bg: radial-gradient(circle at 70% 30%, #2b3440, #0d1117 70%);
    }

    .desktop {
      display: flex;
      height: 100%;
    }

    .shell {
      box-sizing: border-box;
      flex-shrink: 0;
      height: 100%;
    }

    .page {
      position: relative;
      flex: 1;
      height: 100%;
      background: var(--page-bg);
    }

    .screen > .page {
      position: absolute;
      inset: 0;
    }

    .toolbar {
      height: 56px;
    }

    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 12px;
      padding: 0 16px;
    }

    .card {
      height: 96px;
      border-radius: var(--ha-card-border-radius, 12px);
      background: var(--card-background-color, #fff);
      box-shadow: var(--ha-card-box-shadow, none);
    }

    .dark .card {
      background: rgba(255, 255, 255, 0.08);
    }

    .backdrop {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.32);
    }

    .backdrop.blurred {
      backdrop-filter: blur(8px) saturate(1.2);
    }

    .drawer {
      position: absolute;
      inset: 0 auto 0 0;
      box-sizing: border-box;
    }

    .drawer.plain {
      background: var(--sidebar-background-color, var(--card-background-color, #fff));
    }

    .sidebar {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
      color: var(--sidebar-text-color, var(--primary-text-color));
      background: color-mix(
        in srgb,
        var(--sidebar-background-color, var(--card-background-color, #fff)) var(--ss-opacity),
        transparent
      );
      backdrop-filter: blur(var(--ss-blur)) saturate(1.5);
    }

    .sidebar.floating {
      border: 1px solid color-mix(in srgb, var(--divider-color, #888) 60%, transparent);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06), 0 12px 32px rgba(0, 0, 0, 0.12);
    }

    .sidebar.floating.phone {
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
    }

    .menu {
      display: flex;
      align-items: center;
      gap: 20px;
      height: 56px;
      padding: 0 16px;
      font-size: 20px;
      flex-shrink: 0;
    }

    .list {
      display: flex;
      flex-direction: column;
      padding: 4px 0;
      overflow: hidden;
    }

    .spacer {
      flex: 1;
    }

    .heading {
      padding: 14px 16px 6px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .sidebar:not(.expanded) .heading {
      height: 1px;
      padding: 0;
      margin: 8px 16px;
      background: var(--divider-color);
    }

    .item {
      position: relative;
      isolation: isolate;
      display: flex;
      align-items: center;
      gap: 20px;
      min-height: 40px;
      margin: 0 4px;
      padding: 0 12px;
      border-radius: var(--ss-item-radius);
      font-size: 14px;
      white-space: nowrap;
      color: var(--sidebar-text-color, var(--primary-text-color));
      flex-shrink: 0;
    }

    .phone .item {
      min-height: 48px;
      font-size: var(--ss-phone-text);
    }

    .item ha-icon {
      color: var(--sidebar-icon-color, var(--secondary-text-color));
      transition: transform 160ms ease-out;
    }

    .item.motion:hover ha-icon {
      transform: translateX(2px);
    }

    .item.selected {
      font-weight: 600;
      color: var(--sidebar-selected-text-color, var(--primary-color));
    }

    .item.selected ha-icon {
      color: var(--sidebar-selected-icon-color, var(--primary-color));
    }

    .item.selected::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: -1;
      border-radius: inherit;
      background: var(--sidebar-selected-icon-color, var(--primary-color));
      opacity: 0.14;
    }

    .vivid .item.selected::before {
      opacity: 1;
      background: linear-gradient(
        135deg,
        color-mix(in srgb, var(--sidebar-selected-icon-color, var(--primary-color)) 78%, black),
        color-mix(in srgb, var(--sidebar-selected-icon-color, var(--primary-color)) 60%, black)
      );
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.25),
        0 6px 18px -4px
          color-mix(in srgb, var(--sidebar-selected-icon-color, var(--primary-color)) 70%, transparent);
    }

    .vivid .item.selected,
    .vivid .item.selected ha-icon {
      color: #fff;
    }

    @media (prefers-reduced-motion: reduce) {
      .item.motion:hover ha-icon {
        transform: none;
      }
    }
  `);customElements.get("ss-sidebar-preview")||customElements.define("ss-sidebar-preview",$e);var ca=new Set(["config","profile","notfound"]),As=o=>o==null?o:JSON.parse(JSON.stringify(o)),da=(o,e)=>JSON.stringify(o)===JSON.stringify(e);function ha(o,e){let t=i=>String(i).split(".").map(r=>parseInt(r,10)||0),[s,a]=[t(o),t(e)];for(let i=0;i<Math.max(s.length,a.length);i+=1)if((s[i]??0)!==(a[i]??0))return(s[i]??0)<(a[i]??0);return!1}var ye=class extends f{constructor(){super(),this._draft=null,this._device=window.innerWidth<=600?"phone":window.innerWidth<=870?"tablet":"desktop",this._page="light",this._expanded=!0,this._haSidebar={}}connectedCallback(){super.connectedCallback(),this.hass.callWS({type:"frontend/get_user_data",key:"sidebar"}).then(e=>this._haSidebar=e?.value??{}).catch(()=>{})}willUpdate(e){e.has("glass")&&(this._draft=As(this.glass?.sidebar??null))}get dirty(){return this._draft!==null&&!da(this._draft,this.glass?.sidebar??null)}_set(e,t){this._edit({[e]:t})}_edit(e){this._draft={...this._draft,...e},this._toast=null}_reload(){this.dispatchEvent(new CustomEvent("reload"))}_save(){this._run(async()=>{await this.hass.callWS({type:"style_studio/sidebar/save",sidebar:this._draft}),this._reload()},this.t("saved"))}_undo(){this._ask(this.t("undo_confirm"),()=>this._run(async()=>{let{restored:e}=await this.hass.callWS({type:"style_studio/sidebar/undo"});if(!e)throw new Error(this.t("nothing_to_undo"));this._reload()},this.t("undone")))}_items(){let e=this._haSidebar.panelOrder??[],t=new Set(this._haSidebar.hiddenPanels??[]),s=a=>{let i=e.indexOf(a);return i===-1?e.length:i};return Object.values(this.hass.panels??{}).filter(a=>(a.title||a.url_path==="lovelace")&&!ca.has(a.url_path)&&!t.has(a.url_path)).map(a=>({path:a.url_path,icon:a.icon||"mdi:view-dashboard",title:this._panelTitle(a)})).sort((a,i)=>s(a.path)-s(i.path)||(i.path==="lovelace")-(a.path==="lovelace")||a.title.localeCompare(i.title))}_panelTitle(e){return e.title?this.hass.localize(`panel.${e.title}`)||e.title:this.hass.localize("panel.states")||"Overview"}render(){let e=this.glass;if(!e)return d;if(!e.version&&!e.added)return n`<div class="card">
        <h2>${this.t("glass_missing_title")}</h2>
        <p class="hint">${this.t("glass_missing")}</p>
      </div>`;if(!e.added||!this._draft)return n`<div class="card">
        <h2>${this.t("glass_not_added_title")}</h2>
        <p class="hint">${this.t("glass_not_added")}</p>
      </div>`;let t=this._draft;return n`
      <p class="intro">${this.t("glass_intro")}</p>
      ${e.settings_page?n`<a class="settings-link" href=${e.settings_page}>
            <ha-icon icon="mdi:open-in-app"></ha-icon>${this.t("open_glass")}
            <small>${this.t("open_glass_hint")}</small>
          </a>`:d}
      ${e.version&&ha(e.version,e.min_version)?this._warning(this.t("glass_old",{version:e.version,min:e.min_version})):d}
      ${e.loaded?d:this._warning(this.t("glass_not_loaded"))}
      <div class="layout">
        <div class="settings">
          <div class="card">
            <h2>${this.t("shape")}</h2>
            ${this._switch(t,"floating",this.t("floating"),this.t("floating_hint"))}
            ${this._slider(t,"inset",this.t("inset"),0,24,"px",!t.floating)}
            ${this._slider(t,"radius",this.t("radius"),0,32,"px",!t.floating)}
          </div>

          <div class="card">
            <h2>${this.t("glass")}</h2>
            ${this._slider(t,"blur",this.t("blur"),0,40,"px")}
            ${this._slider(t,"opacity",this.t("opacity"),40,100,"%",!1,this.t("opacity_hint"))}
            ${this._switch(t,"glass_cards",this.t("glass_cards"),this.t("glass_cards_hint"))}
          </div>

          <div class="card">
            <h2>${this.t("active")}</h2>
            ${this._segment(t,"highlight",[["soft",this.t("highlight_soft")],["vivid",this.t("highlight_vivid")]])}
            <label class="row">
              <span>
                ${this.t("own_accent")}
                <small>${this.t("own_accent_hint")}</small>
              </span>
              <span class="inline">
                ${t.accent?n`<input
                      type="color"
                      .value=${t.accent}
                      @input=${s=>this._set("accent",s.target.value)}
                    />`:d}
                <input
                  type="checkbox"
                  class="switch"
                  .checked=${!!t.accent}
                  @change=${s=>this._set("accent",s.target.checked?"#f59e0b":null)}
                />
              </span>
            </label>
            ${this._switch(t,"hover_motion",this.t("motion"))}
          </div>

          <div class="card">
            <h2>${this.t("phone")}</h2>
            <p class="hint">${this.t("phone_hint")}</p>
            ${this._slider(t,"mobile_width",this.t("mobile_width"),240,360,"px")}
            ${this._slider(t,"mobile_text_size",this.t("mobile_text_size"),12,20,"px")}
            ${this._switch(t,"mobile_blur",this.t("mobile_blur"))}
          </div>

          <div class="card">
            <h2>${this.t("groups")}</h2>
            <p class="hint">${this.t("groups_hint")}</p>
            <ss-groups-editor
              .items=${this._items()}
              .categories=${t.categories}
              .t=${this.t}
              @change=${s=>this._edit(s.detail)}
            ></ss-groups-editor>
          </div>
        </div>

        <aside class="card preview">
          <h2>${this.t("preview")}</h2>
          <p class="hint">${this.t("preview_hint")}</p>
          <div class="segment small">
            ${["phone","tablet","desktop"].map(s=>n`<button
                class=${s===this._device?"active":""}
                @click=${()=>this._device=s}
              >
                ${this.t(`device_${s}`)}
                <small>${{phone:430,tablet:768,desktop:1920}[s]}</small>
              </button>`)}
          </div>
          <div class="segment small">
            ${["light","dark"].map(s=>n`<button
                class=${s===this._page?"active":""}
                @click=${()=>this._page=s}
              >
                ${this.t(`page_${s}`)}
              </button>`)}
            ${this._device==="desktop"?n`<button
                  class=${this._expanded?"active":""}
                  @click=${()=>this._expanded=!this._expanded}
                >
                  ${this.t("expanded")}
                </button>`:d}
          </div>
          <ss-sidebar-preview
            .settings=${t}
            .items=${this._items()}
            .device=${this._device}
            .page=${this._page}
            .expanded=${this._expanded}
            .settingsLabel=${this.hass.localize("panel.config")||"Settings"}
          ></ss-sidebar-preview>
        </aside>
      </div>
      ${this._bar({left:e.history?n`<button ?disabled=${this._busy} @click=${this._undo}>
              <ha-icon icon="mdi:history"></ha-icon>${this.t("undo")}
            </button>`:d,onCancel:()=>this._draft=As(this.glass.sidebar),onSave:()=>this._save()})}
    `}};g(ye,"properties",{...f.properties,glass:{attribute:!1},_draft:{state:!0},_device:{state:!0},_page:{state:!0},_expanded:{state:!0},_haSidebar:{state:!0}});ye.styles=[f.styles,v`
    .settings-link {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      padding: 12px 14px;
      margin-bottom: 16px;
      border-radius: var(--ss-radius, 12px);
      border: 1px solid var(--primary-color);
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 500;
    }

    .settings-link small {
      flex-basis: 100%;
      margin: 0;
      font-weight: 400;
    }
  `];customElements.get("ss-sidebar-tab")||customElements.define("ss-sidebar-tab",ye);var pa=["active","auto","cool","dry","heat","heat_cool","fan_only"],ke=class extends ${render(){if(!this.vars)return d;let e=Object.entries(this.vars).map(([s,a])=>`--${s}:${a}`).join(";"),t=this.t;return n`
      <div class="screen" style=${e}>
        <div class="sidebar">
          <div class="dot"></div>
          <div class="nav selected"><ha-icon icon="mdi:view-dashboard"></ha-icon></div>
          <div class="nav"><ha-icon icon="mdi:lightning-bolt"></ha-icon></div>
          <div class="nav"><ha-icon icon="mdi:map"></ha-icon></div>
          <div class="nav"><ha-icon icon="mdi:palette-swatch-outline"></ha-icon></div>
        </div>
        <div class="main">
          <div class="header">
            <span class="title">${t("pv_title")}</span>
            <span class="tab active">${t("pv_title")}</span>
            <span class="tab">${t("pv_tab2")}</span>
          </div>
          <div class="content">
            <div class="blob"></div>
            <div class="weather">
              <ha-icon icon="mdi:weather-sunny"></ha-icon>
              <span>${t("pv_weather")}</span>
            </div>
            <div class="grid">
              <div class="card tile on">
                <span class="icon"><ha-icon icon="mdi:sofa"></ha-icon></span>
                <span><b>${t("pv_living")}</b><small>${t("pv_lights")}</small></span>
              </div>
              <div class="card tile">
                <span class="icon"><ha-icon icon="mdi:fridge"></ha-icon></span>
                <span><b>${t("pv_kitchen")}</b><small>${t("pv_off")}</small></span>
              </div>
            </div>
            <div class="card">
              <div class="line">
                <ha-icon icon="mdi:fan" class="state"></ha-icon>
                <span>${t("pv_switch")}</span>
                <span class="switch on"></span>
              </div>
              <div class="line">
                <span class="slider"><span></span></span>
              </div>
              <div class="line climate">
                <ha-icon icon="mdi:air-conditioner" class="state"></ha-icon>
                <span>${t("pv_climate")}</span>
                <span class="modes">
                  ${pa.map(s=>n`<i title=${s} style="background:var(--state-climate-${s}-color)"></i>`)}
                </span>
              </div>
            </div>
          </div>
          ${this.popup?n`
                <div class="popup">
                  <div class="popup-head">
                    <span class="icon"><ha-icon icon="mdi:sofa"></ha-icon></span>
                    <b>${t("pv_popup")}</b>
                  </div>
                  <div class="buttons">
                    <span class="bubble on"><ha-icon icon="mdi:ceiling-light"></ha-icon></span>
                    <span class="bubble"><ha-icon icon="mdi:floor-lamp"></ha-icon></span>
                    <span class="bubble"><ha-icon icon="mdi:television"></ha-icon></span>
                  </div>
                  <div class="field">${t("pv_climate")}</div>
                </div>
              `:d}
        </div>
      </div>
    `}};g(ke,"properties",{vars:{attribute:!1},t:{attribute:!1},popup:{type:Boolean}}),g(ke,"styles",v`
    :host {
      display: block;
    }

    .screen {
      display: flex;
      height: 440px;
      overflow: hidden;
      border-radius: 12px;
      border: 1px solid var(--divider-color);
      font-family: var(--ha-font-family-body, Roboto, sans-serif);
      font-size: 13px;
      color: var(--primary-text-color);
      background: var(--primary-background-color);
    }

    ha-icon {
      --mdc-icon-size: 18px;
    }

    .sidebar {
      width: 52px;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 10px 0;
      background: var(--sidebar-background-color);
      border-inline-end: 1px solid var(--divider-color);
    }

    .dot {
      width: 22px;
      height: 22px;
      margin-bottom: 8px;
      border-radius: 50%;
      background: var(--sidebar-text-color);
      opacity: 0.25;
    }

    .nav {
      position: relative;
      display: grid;
      place-items: center;
      width: 38px;
      height: 34px;
      border-radius: 10px;
      color: var(--sidebar-icon-color);
    }

    .nav.selected {
      color: var(--sidebar-selected-icon-color);
    }

    .nav.selected::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: var(--sidebar-selected-icon-color);
      opacity: 0.14;
    }

    .main {
      position: relative;
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
    }

    .header {
      display: flex;
      align-items: flex-end;
      gap: 14px;
      height: 44px;
      padding: 0 14px;
      flex-shrink: 0;
      background: var(--app-header-background-color);
      color: var(--app-header-text-color);
    }

    .title {
      align-self: center;
      font-size: 16px;
      margin-inline-end: auto;
    }

    .tab {
      padding: 0 2px 10px;
      opacity: 0.75;
    }

    .tab.active {
      opacity: 1;
      border-bottom: 2px solid var(--app-header-selection-bar-color);
    }

    .content {
      position: relative;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 12px;
      overflow: hidden;
    }

    /* Something behind the cards, so card and pop-up opacity show. */
    .blob {
      position: absolute;
      width: 220px;
      height: 220px;
      right: -40px;
      top: 30px;
      border-radius: 50%;
      background: var(--primary-color);
      opacity: 0.35;
      filter: blur(30px);
    }

    .card,
    .weather {
      position: relative;
      background: var(--ha-card-background, var(--card-background-color));
      border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color));
      border-radius: var(--ha-card-border-radius, 12px);
      box-shadow: var(--ha-card-box-shadow, none);
      backdrop-filter: blur(12px);
    }

    .weather {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px;
      background: var(--weather-card-gradient);
    }

    .weather ha-icon {
      color: var(--weather-card-accent);
      --mdc-icon-size: 26px;
    }

    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .tile {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px;
    }

    .tile small,
    .line small {
      display: block;
      color: var(--secondary-text-color);
    }

    .icon {
      display: grid;
      place-items: center;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      flex-shrink: 0;
      position: relative;
      color: var(--state-icon-color);
    }

    .icon::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: var(--state-icon-color);
      opacity: 0.15;
    }

    .on .icon {
      color: var(--state-light-active-color);
    }

    .on .icon::before {
      background: var(--state-light-active-color);
      opacity: 0.2;
    }

    .card:not(.tile) {
      padding: 4px 12px;
    }

    .line {
      display: flex;
      align-items: center;
      gap: 10px;
      min-height: 36px;
    }

    .line + .line {
      border-top: 1px solid var(--divider-color);
    }

    .line > span:nth-child(2) {
      flex: 1;
    }

    .state {
      color: var(--state-fan-active-color);
    }

    .climate .state {
      color: var(--state-climate-cool-color);
    }

    .switch {
      position: relative;
      width: 34px;
      height: 14px;
      border-radius: 999px;
      background: var(--switch-checked-track-color);
      opacity: 0.9;
    }

    .switch::after {
      content: "";
      position: absolute;
      top: -3px;
      right: -2px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--switch-checked-button-color);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }

    .slider {
      flex: 1;
      height: 6px;
      border-radius: 999px;
      background: var(--slider-bar-color);
    }

    .slider span {
      display: block;
      width: 62%;
      height: 100%;
      border-radius: inherit;
      background: var(--slider-color);
    }

    .modes {
      display: flex;
      gap: 4px;
    }

    .modes i {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    .popup {
      position: absolute;
      left: 8px;
      right: 8px;
      bottom: 0;
      height: 58%;
      padding: 14px;
      border-radius: 24px 24px 0 0;
      background: var(--bubble-pop-up-background-color, var(--card-background-color));
      backdrop-filter: blur(14px);
      box-shadow: 0 -8px 30px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .popup-head {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 15px;
    }

    .buttons {
      display: flex;
      gap: 10px;
    }

    .bubble {
      display: grid;
      place-items: center;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--bubble-main-background-color);
      color: var(--state-icon-color);
    }

    .bubble.on {
      background: var(--bubble-button-background-color);
      color: var(--state-light-active-color);
    }

    .field {
      padding: 10px 12px;
      border-radius: 14px;
      background: var(--bubble-secondary-background-color);
    }
  `);customElements.get("ss-theme-preview")||customElements.define("ss-theme-preview",ke);var ft=[{key:"basis",nl:"Basis",en:"Basics",vars:[["primary-color","Hoofdkleur","Primary color","color"],["accent-color","Accentkleur","Accent color","color"],["light-primary-color","Hoofdkleur licht","Primary color, light","color"],["dark-primary-color","Hoofdkleur donker","Primary color, dark","color"],["text-primary-color","Tekst op de hoofdkleur","Text on primary color","color"],["primary-background-color","Achtergrond","Background","color"],["secondary-background-color","Tweede achtergrond","Secondary background","color"],["divider-color","Scheidingslijnen","Dividers","color"]]},{key:"text",nl:"Tekst",en:"Text",vars:[["primary-text-color","Tekst","Text","color"],["secondary-text-color","Tekst, tweede","Secondary text","color"],["disabled-text-color","Tekst, uitgeschakeld","Disabled text","color"]]},{key:"header",nl:"Bovenbalk",en:"Top bar",vars:[["app-header-background-color","Achtergrond","Background","color"],["app-header-text-color","Tekst en iconen","Text and icons","color"],["app-header-selection-bar-color","Streep onder actieve tab","Active tab bar","color"],["app-header-edit-background-color","Achtergrond bij bewerken","Background while editing","color"],["app-header-edit-text-color","Tekst bij bewerken","Text while editing","color"]]},{key:"sidebar",nl:"Zijbalk (menu)",en:"Sidebar (menu)",vars:[["sidebar-background-color","Achtergrond","Background","color"],["sidebar-text-color","Tekst","Text","color"],["sidebar-icon-color","Iconen","Icons","color"],["sidebar-selected-icon-color","Icoon actieve pagina","Active page icon","color"],["sidebar-selected-text-color","Tekst actieve pagina","Active page text","color"]]},{key:"cards",nl:"Kaarten",en:"Cards",vars:[["card-background-color","Achtergrond","Background","color"],["ha-card-background","Achtergrond (dashboard)","Background (dashboard)","color"],["ha-card-border-color","Rand","Border","color"],["ha-card-border-width","Randdikte","Border width","size"],["ha-card-border-radius","Hoeken","Corners","size"],["ha-card-box-shadow","Schaduw","Shadow","shadow"]]},{key:"popups",nl:"Pop-ups (Bubble Card)",en:"Pop-ups (Bubble Card)",vars:[["bubble-pop-up-background-color","Achtergrond pop-up","Pop-up background","color"],["bubble-pop-up-main-background-color","Achtergrond inhoud","Content background","color"],["bubble-main-background-color","Knoppen, achtergrond","Buttons, background","color"],["bubble-secondary-background-color","Tweede achtergrond","Secondary background","color"],["bubble-button-background-color","Knop","Button","color"],["bubble-icon-background-color","Achter iconen","Behind icons","color"]]},{key:"dialogs",nl:"Vensters (meer info, instellingen)",en:"Dialogs (more info, settings)",vars:[["ha-dialog-surface-background","Achtergrond","Background","color"],["mdc-theme-surface","Achtergrond (oudere vensters)","Background (older dialogs)","color"],["dialog-box-shadow","Schaduw","Shadow","shadow"],["ha-dialog-border-radius","Hoeken","Corners","size"]]},{key:"controls",nl:"Schakelaars en schuiven",en:"Switches and sliders",vars:[["switch-checked-color","Schakelaar aan","Switch on","color"],["switch-checked-button-color","Knopje aan","Knob on","color"],["switch-checked-track-color","Baan aan","Track on","color"],["switch-unchecked-button-color","Knopje uit","Knob off","color"],["switch-unchecked-track-color","Baan uit","Track off","color"],["slider-color","Schuif","Slider","color"],["slider-bar-color","Baan van de schuif","Slider track","color"]]},{key:"inputs",nl:"Invoervelden",en:"Input fields",vars:[["input-fill-color","Achtergrond","Background","color"],["mdc-text-field-fill-color","Achtergrond (oudere velden)","Background (older fields)","color"],["input-ink-color","Tekst","Text","color"],["input-label-ink-color","Label","Label","color"],["code-editor-background-color","Code-editor","Code editor","color"]]},{key:"states",nl:"Status en iconen",en:"States and icons",vars:[["state-icon-color","Icoon (uit)","Icon (off)","color"],["paper-item-icon-color","Icoon in button-card en oudere kaarten","Icon in button-card and older cards","color"],["paper-item-icon-active-color","Icoon aan in button-card en oudere kaarten","Icon on in button-card and older cards","color"],["state-icon-active-color","Icoon aan","Icon on","color"],["state-active-color","Aan (algemeen)","On (general)","color"],["state-light-active-color","Lamp aan","Light on","color"],["state-switch-active-color","Schakelaar aan","Switch on","color"],["state-fan-active-color","Ventilator aan","Fan on","color"],["state-cover-active-color","Zonwering open","Cover open","color"],["state-input_boolean-active-color","Hulpschakelaar aan","Toggle helper on","color"],["state-automation-active-color","Automatisering aan","Automation on","color"],["state-script-active-color","Script actief","Script running","color"],["state-binary_sensor-active-color","Sensor actief","Binary sensor on","color"],["state-media_player-active-color","Mediaspeler aan","Media player on","color"],["state-person-home-color","Persoon thuis","Person home","color"],["state-inactive-color","Uit (algemeen)","Off (general)","color"],["state-unavailable-color","Niet beschikbaar","Unavailable","color"]]},{key:"climate",nl:"Airco-ring",en:"Climate ring",vars:[["state-climate-active-color","Actief","Active","color"],["state-climate-auto-color","Auto","Auto","color"],["state-climate-cool-color","Koelen","Cool","color"],["state-climate-dry-color","Drogen","Dry","color"],["state-climate-heat-color","Verwarmen","Heat","color"],["state-climate-heat_cool-color","Koelen en verwarmen","Heat and cool","color"],["state-climate-fan_only-color","Alleen ventilator","Fan only","color"]]},{key:"alerts",nl:"Meldingen",en:"Alerts",vars:[["error-color","Fout","Error","color"],["warning-color","Waarschuwing","Warning","color"],["success-color","Gelukt","Success","color"],["info-color","Informatie","Info","color"]]},{key:"weather",nl:"Weerkaart",en:"Weather card",vars:[["weather-card-gradient","Achtergrond (verloop)","Background (gradient)","text"],["weather-card-accent","Accent","Accent","color"]]}],Se=new Set(ft.flatMap(o=>o.vars.map(([e])=>e))),P={background:"#f4efe6",card:"#fffaf2",text:"#3b3127",accent:"#f59e0b",sidebar:"#fbf6ec",header:null,icon:null,radius:16,shadow:"soft",card_opacity:100,popup:"solid",popup_opacity:80},Es={sand:{nl:"Zand en geel",en:"Sand and yellow",base:{...P}},pink:{nl:"Roze",en:"Pink",base:{...P,background:"#fbf1f4",card:"#fffafc",text:"#3d2b33",accent:"#e8749e",sidebar:"#fdf5f8"}},dark:{nl:"Donker",en:"Dark",base:{...P,background:"#111418",card:"#1b1f25",text:"#e6e8eb",accent:"#f5b301",sidebar:"#161a1f",shadow:"none"}},glass:{nl:"Glas",en:"Glass",base:{...P,background:"#dfe7ef",card:"#ffffff",text:"#1f2a37",accent:"#3b82f6",sidebar:"#f3f6fa",radius:20,card_opacity:62,popup:"glass",popup_opacity:72}}},gt={none:"none",soft:"0 1px 2px rgba(0, 0, 0, 0.05), 0 4px 14px rgba(0, 0, 0, 0.06)",strong:"0 2px 4px rgba(0, 0, 0, 0.08), 0 12px 32px rgba(0, 0, 0, 0.14)"};function Ke(o){let e=parseInt(o.slice(1),16);return[e>>16&255,e>>8&255,e&255]}function ua([o,e,t]){return`#${[o,e,t].map(s=>Math.round(s).toString(16).padStart(2,"0")).join("")}`}function x(o,e,t){let[s,a]=[Ke(o),Ke(e)];return ua(s.map((i,r)=>i*t+a[r]*(1-t)))}function Cs(o,e){if(e>=100)return o;let[t,s,a]=Ke(o);return`rgba(${t}, ${s}, ${a}, ${e/100})`}function zs(o){let[e,t,s]=Ke(o).map(a=>{let i=a/255;return i<=.03928?i/12.92:((i+.055)/1.055)**2.4});return .2126*e+.7152*t+.0722*s}function bt(o){return zs(o)>.45?"#1f1f1f":"#ffffff"}var ma=o=>zs(o)<.2;function Fe(o){let e={...P,...o},t=ma(e.background),s=e.header??e.background,a=Cs(e.card,e.card_opacity),i=x(e.text,e.background,.62),r=e.icon??x(e.accent,e.text,.6),l=x(e.text,e.background,t?.16:.12),c=e.popup==="glass"?Cs(e.card,e.popup_opacity):e.card,h=(_,p)=>x(_,e.card,p);return{"primary-color":e.accent,"accent-color":e.accent,"light-primary-color":x(e.accent,e.background,.4),"dark-primary-color":x(e.accent,"#000000",.8),"text-primary-color":bt(e.accent),"primary-background-color":e.background,"secondary-background-color":x(e.text,e.background,t?.06:.04),"divider-color":l,"primary-text-color":e.text,"secondary-text-color":i,"disabled-text-color":x(e.text,e.background,.38),"app-header-background-color":s,"app-header-text-color":s===e.background?e.text:bt(s),"app-header-selection-bar-color":e.accent,"app-header-edit-background-color":x(e.text,e.background,.75),"app-header-edit-text-color":bt(x(e.text,e.background,.75)),"sidebar-background-color":e.sidebar,"sidebar-text-color":e.text,"sidebar-icon-color":i,"sidebar-selected-icon-color":e.accent,"sidebar-selected-text-color":t?e.accent:x(e.accent,e.text,.7),"card-background-color":a,"ha-card-background":a,"ha-card-border-color":l,"ha-card-border-width":"1px","ha-card-border-radius":`${e.radius}px`,"ha-card-box-shadow":gt[e.shadow]??gt.soft,"bubble-pop-up-background-color":c,"bubble-pop-up-main-background-color":c,"bubble-main-background-color":x(e.text,e.card,t?.08:.05),"bubble-secondary-background-color":x(e.text,e.card,t?.12:.08),"bubble-button-background-color":h(e.accent,.22),"bubble-icon-background-color":h(e.accent,.18),"ha-dialog-surface-background":e.card,"mdc-theme-surface":e.card,"dialog-box-shadow":gt.strong,"ha-dialog-border-radius":`${Math.max(e.radius+8,12)}px`,"switch-checked-color":e.accent,"switch-checked-button-color":e.accent,"switch-checked-track-color":e.accent,"switch-unchecked-button-color":t?"#9aa0a6":"#fafafa","switch-unchecked-track-color":x(e.text,e.background,.35),"slider-color":e.accent,"slider-bar-color":x(e.accent,e.background,.3),"input-fill-color":x(e.text,e.card,.05),"mdc-text-field-fill-color":x(e.text,e.card,.05),"input-ink-color":e.text,"input-label-ink-color":i,"code-editor-background-color":e.card,"state-icon-color":r,"paper-item-icon-color":r,"paper-item-icon-active-color":e.accent,"state-icon-active-color":e.accent,"state-active-color":e.accent,"state-light-active-color":e.accent,"state-switch-active-color":e.accent,"state-fan-active-color":e.accent,"state-cover-active-color":e.accent,"state-input_boolean-active-color":e.accent,"state-automation-active-color":e.accent,"state-script-active-color":e.accent,"state-binary_sensor-active-color":e.accent,"state-media_player-active-color":e.accent,"state-person-home-color":e.accent,"state-inactive-color":x(e.text,e.background,.4),"state-unavailable-color":x(e.text,e.background,.3),"state-climate-active-color":e.accent,"state-climate-auto-color":"#43a047","state-climate-cool-color":"#2196f3","state-climate-dry-color":"#efbd07","state-climate-heat-color":"#ff8100","state-climate-heat_cool-color":"#ffa000","state-climate-fan_only-color":"#00bcd4","error-color":"#db4437","warning-color":"#ffa600","success-color":"#43a047","info-color":"#039be5","weather-card-gradient":`linear-gradient(135deg, ${h(e.accent,.35)}, ${e.card})`,"weather-card-accent":e.accent}}function Je(o){return{...Fe(o.base),...o.overrides}}function qe(o){let e=a=>{let i=String(o[a]??"").trim();return/^#[0-9a-f]{6}$/i.test(i)?i.toLowerCase():null},t={...P};t.background=e("primary-background-color")??t.background,t.card=e("card-background-color")??e("ha-card-background")??t.card,t.text=e("primary-text-color")??t.text,t.accent=e("primary-color")??t.accent,t.sidebar=e("sidebar-background-color")??t.background,t.header=e("app-header-background-color");let s={};for(let[a,i]of Object.entries(o))(typeof i=="string"||typeof i=="number")&&(s[a]=String(i));return{base:t,overrides:s}}var Ye=o=>o==null?o:JSON.parse(JSON.stringify(o));function _a(o){let e=String(o).trim().toLowerCase();if(/^#[0-9a-f]{6}$/.test(e))return e;if(/^#[0-9a-f]{3}$/.test(e))return`#${[...e.slice(1)].map(s=>s+s).join("")}`;let t=e.match(/^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/);return t?`#${t.slice(1,4).map(s=>Number(s).toString(16).padStart(2,"0")).join("")}`:null}var Os=(o,e)=>JSON.stringify(o)===JSON.stringify(e),ga=/^#[0-9a-f]{6}$/i,I="new",Ae=class extends f{constructor(){super(),this._selected=null,this._draft=null,this._picking=!1,this._wholeScreen=!1,this._popup=!0,this._newVar={key:"",value:""},this._applied=null}connectedCallback(){super.connectedCallback(),this._load()}disconnectedCallback(){super.disconnectedCallback(),this._applyToScreen(null)}updated(){this._applyToScreen(this._wholeScreen&&this._draft?Je(this._draft):null)}get _lang(){return(this.hass?.locale?.language||this.hass?.language||"nl").startsWith("nl")?"nl":"en"}get _saved(){return this._state?.themes.find(e=>e.id===this._selected)??null}get dirty(){if(!this._draft)return!1;if(this._selected===I)return!this._pristine||!Os(this._editable(this._draft),this._pristine);let e=this._saved;return!e||!Os(this._editable(this._draft),this._editable(e))}_editable(e){return{name:e.name,base:e.base,overrides:e.overrides}}async _load(e){try{this._state=await this.hass.callWS({type:"style_studio/themes/get"}),this._select(e??this._selected??this._state.themes[0]?.id??null),!this._state.themes.length&&this._selected===null&&this._startFromCurrent()}catch(t){this._error(t)}}_select(e){let t=this._state.themes.find(s=>s.id===e);this._selected=t?e:null,this._draft=t?Ye(this._editable(t)):null,this._picking=!t}_applyToScreen(e){let t=document.documentElement;if(this._applied){for(let[s,a]of Object.entries(this._applied))a?t.style.setProperty(s,a):t.style.removeProperty(s);this._applied=null}if(e){this._applied={};for(let[s,a]of Object.entries(e))this._applied[`--${s}`]=t.style.getPropertyValue(`--${s}`),t.style.setProperty(`--${s}`,a)}}_uniqueName(e){let t=new Set([...this._state.themes.map(a=>a.name.toLowerCase()),...Object.keys(this._state.others).map(a=>a.toLowerCase())]),s=e;for(let a=2;t.has(s.toLowerCase());a+=1)s=`${e} ${a}`;return s}_startNew(e,t,s={}){this._selected=I,this._picking=!1,this._draft={name:this._uniqueName(e),base:Ye(t),overrides:Ye(s)},this._pristine=null}_current(){let e=this.hass.selectedTheme?.theme;if(e&&e!=="default"&&this._state.others[e])return{name:e,...qe(this._state.others[e])};let t=getComputedStyle(document.documentElement),s={};for(let a of Se){let i=_a(t.getPropertyValue(`--${a}`));i&&(s[a]=i)}return{name:this.t("my_theme"),base:qe(s).base,overrides:{}}}_startFromCurrent(){let e=this._state.themes.find(i=>i.name===this.hass.selectedTheme?.theme);if(e){this._select(e.id);return}let{name:t,base:s,overrides:a}=this._current();this._startNew(t===this.t("my_theme")?t:`${t} (${this.t("copy_suffix")})`,s,a),this._pristine=Ye(this._draft)}_set(e,t){this._draft={...this._draft,base:{...this._draft.base,[e]:t}},this._toast=null}_override(e,t){let s={...this._draft.overrides};t===""||t==null?delete s[e]:s[e]=t,this._draft={...this._draft,overrides:s},this._toast=null}_cancel(){this._selected===I?this._select(this._state.themes[0]?.id??null):this._select(this._selected)}_save(){let e={...this._draft,vars:Je(this._draft)};this._selected!==I&&(e.id=this._selected),this._run(async()=>{try{let t=await this.hass.callWS({type:"style_studio/themes/save",theme:e});this._wholeScreen=!1,this._state=t,this._select(t.theme.id)}catch(t){throw this._known(t)}},this.t("saved_theme",{file:this._state.file}))}get _nameOk(){return/^[\p{L}\p{N}_][\p{L}\p{N}_ .()&+'-]*$/u.test((this._draft?.name??"").trim())}_known(e){if(e?.code==="reload_failed")return new Error(this.t("err_reload_failed",{message:e.message}));let t={file_exists:"err_file_exists",name_taken:"err_name_taken"}[e?.code];return t?new Error(this.t(t)):e}_delete(){this._ask(this.t("delete_confirm",{name:this._saved.name}),()=>this._run(async()=>{this._state=await this.hass.callWS({type:"style_studio/themes/delete",theme_id:this._selected}),this._select(this._state.themes[0]?.id??null)},this.t("deleted")))}_undo(){this._ask(this.t("undo_confirm"),()=>this._run(async()=>{let e=await this.hass.callWS({type:"style_studio/themes/undo"});if(!e.restored)throw new Error(this.t("nothing_to_undo"));this._state=e,this._select(this._selected)},this.t("undone")))}_setDefault(){let e=this._saved.name;this._run(async()=>{this._state=await this.hass.callWS({type:"style_studio/themes/set_default",name:e})},this.t("default_set",{name:e}))}render(){return this._state?n`
      <p class="intro">${this.t("themes_intro")}</p>
      ${this._list()}
      ${this._leavingQuestion()}
      ${this._picking?this._picker():d}
      ${this._draft?this._editor():d}
      ${this._bar({left:this._barButtons(),onCancel:()=>this._cancel(),onSave:()=>this._save(),canSave:(this._selected===I||this.dirty)&&this._nameOk})}
    `:d}_list(){let{themes:e,loaded:t,default_theme:s}=this._state;return n`
      <div class="chips">
        ${e.map(a=>n`<button
            class="chip ${a.id===this._selected?"active":""}"
            @click=${()=>this._pick(()=>this._select(a.id))}
          >
            <span class="swatch" style="background:${a.vars["primary-color"]}"></span>
            ${a.name}
            ${a.name===s?n`<em>${this.t("badge_default")}</em>`:d}
            ${t.includes(a.name)?d:n`<em class="bad">${this.t("badge_not_loaded")}</em>`}
          </button>`)}
        ${this._selected===I?n`<button class="chip active">${this._draft.name}</button>`:d}
        <button
          class="chip add ${this._picking?"active":""}"
          @click=${()=>this._pick(()=>{this._picking=!0,this._selected=null,this._draft=null})}
        >
          <ha-icon icon="mdi:plus"></ha-icon>${this.t("new_theme")}
        </button>
      </div>
    `}_pick(e){this.dirty?this._leaving=e:e()}_leavingQuestion(){return this._leaving?n`<div class="leaving" role="alert">
      <span>${this.t("discard_confirm")}</span>
      <button @click=${()=>this._leaving=null}>${this.t("no")}</button>
      <button
        class="primary"
        @click=${()=>{let e=this._leaving;this._leaving=null,this._wholeScreen=!1,e()}}
      >
        ${this.t("yes")}
      </button>
    </div>`:d}_useForMe(){let e=this._saved.name;document.querySelector("home-assistant")?.dispatchEvent(new CustomEvent("settheme",{detail:{theme:e}})),this._showToast(this.t("using_now",{name:e}))}_picker(){let e=Object.keys(this._state.others),t=this._current();return n`
      <div class="card">
        <h2>${this.t("start_from")}</h2>
        <button class="current" @click=${()=>this._startFromCurrent()}>
          <ha-icon icon="mdi:palette-swatch"></ha-icon>
          <span>
            <b>${this.t("start_current")}</b>
            <small>${t.name}</small>
          </span>
        </button>
        <p class="hint">${this.t("or_preset")}</p>
        <div class="presets">
          ${Object.entries(Es).map(([s,a])=>{let i=Fe(a.base);return n`<button
              class="preset"
              data-preset=${s}
              @click=${()=>this._startNew(a[this._lang],a.base)}
            >
              <span class="mini" style="background:${i["primary-background-color"]}">
                <i style="background:${i["sidebar-background-color"]}"></i>
                <b style="background:${i["card-background-color"]}"><s style="background:${i["primary-color"]}"></s></b>
              </span>
              ${a[this._lang]}
            </button>`})}
        </div>
        ${e.length?n`<label class="row">
              <span>${this.t("copy_existing")}</span>
              <select
                @change=${s=>{let a=s.target.value;if(!a)return;let{base:i,overrides:r}=qe(this._state.others[a]);this._startNew(`${a} (${this.t("copy_suffix")})`,i,r)}}
              >
                <option value="">${this.t("pick_theme")}</option>
                ${e.map(s=>n`<option>${s}</option>`)}
              </select>
            </label>`:d}
      </div>
    `}_editor(){let e=this._draft,t={...P,...e.base},s=Fe(t),a=Je(e),i=this._saved;return n`
      ${i&&!this._state.loaded.includes(i.name)?this._warning(this.t("warn_not_loaded")):d}
      <div class="layout">
        <div class="settings">
          <div class="card">
            <label class="row">
              <span>${this.t("theme_name")}</span>
              <input
                type="text"
                class="name"
                maxlength="50"
                .value=${e.name}
                @input=${r=>{this._draft={...this._draft,name:r.target.value}}}
              />
            </label>
            ${this._nameOk?d:n`<p class="hint bad">${this.t("err_bad_name")}</p>`}
          </div>

          <div class="card">
            <h2>${this.t("quick")}</h2>
            <p class="hint">${this.t("quick_hint")}</p>
            ${this._fixedNotice()}
            ${this._color(t,"background",this.t("c_background"))}
            ${this._color(t,"card",this.t("c_card"))}
            ${this._color(t,"text",this.t("c_text"))}
            ${this._color(t,"accent",this.t("c_accent"))}
            ${this._color(t,"sidebar",this.t("c_sidebar"))}
            <label class="row">
              <span>
                ${this.t("c_icons")}
                <small>${this.t("c_icons_hint")}</small>
              </span>
              <span class="inline">
                ${t.icon?n`<input
                      type="color"
                      aria-label=${this.t("c_icons")}
                      .value=${t.icon}
                      @input=${r=>this._set("icon",r.target.value)}
                    />`:d}
                <input
                  type="checkbox"
                  class="switch"
                  aria-label=${this.t("c_icons_own")}
                  .checked=${!!t.icon}
                  @change=${r=>this._set("icon",r.target.checked?s["state-icon-color"]:null)}
                />
              </span>
            </label>
            <label class="row">
              <span>${this.t("header_same")}</span>
              <span class="inline">
                ${t.header?n`<input
                      type="color"
                      aria-label=${this.t("c_header")}
                      .value=${t.header}
                      @input=${r=>this._set("header",r.target.value)}
                    />`:d}
                <input
                  type="checkbox"
                  class="switch"
                  .checked=${!t.header}
                  @change=${r=>this._set("header",r.target.checked?null:t.background)}
                />
              </span>
            </label>
            ${this._slider(t,"radius",this.t("corners"),0,28,"px")}
            <div class="row">
              <span>${this.t("shadow")}</span>
              ${this._segment(t,"shadow",[["none",this.t("shadow_none")],["soft",this.t("shadow_soft")],["strong",this.t("shadow_strong")]])}
            </div>
            ${this._slider(t,"card_opacity",this.t("card_opacity"),40,100,"%",!1,this.t("card_opacity_hint"))}
            <div class="row">
              <span>${this.t("popups")}</span>
              ${this._segment(t,"popup",[["solid",this.t("popup_solid")],["glass",this.t("popup_glass")]])}
            </div>
            ${t.popup==="glass"?this._slider(t,"popup_opacity",this.t("popup_opacity"),30,100,"%"):d}
          </div>

          <div class="card">
            <h2>${this.t("all_vars")}</h2>
            <p class="hint">${this.t("all_vars_hint")}</p>
            ${ft.map(r=>n`
                <details>
                  <summary>
                    ${r[this._lang]}
                    <span class="dots">
                      ${r.vars.filter(([,,,l])=>l==="color").slice(0,6).map(([l])=>n`<i style="background:${a[l]}"></i>`)}
                    </span>
                  </summary>
                  ${r.vars.map(([l,c,h,_])=>this._varRow(l,this._lang==="nl"?c:h,_,s[l]))}
                </details>
              `)}
          </div>

          <div class="card">
            <h2>${this.t("custom_vars")}</h2>
            <p class="hint">${this.t("custom_vars_hint")}</p>
            ${Object.entries(e.overrides).filter(([r])=>!Se.has(r)).map(([r,l])=>this._varRow(r,`--${r}`,"text","",l,!0))}
            <div class="row add-var">
              <input
                type="text"
                placeholder=${this.t("var_name")}
                .value=${this._newVar.key}
                @input=${r=>this._newVar={...this._newVar,key:r.target.value}}
              />
              <input
                type="text"
                placeholder=${this.t("var_value")}
                .value=${this._newVar.value}
                @input=${r=>this._newVar={...this._newVar,value:r.target.value}}
              />
              <button
                class="small"
                ?disabled=${!/^[a-z0-9][a-z0-9_-]*$/.test(this._newVar.key.replace(/^--/,""))||!this._newVar.value}
                @click=${()=>{this._override(this._newVar.key.replace(/^--/,""),this._newVar.value),this._newVar={key:"",value:""}}}
              >
                ${this.t("add_var")}
              </button>
            </div>
          </div>
        </div>

        <aside class="card preview">
          <h2>${this.t("preview")}</h2>
          <ss-theme-preview .vars=${a} .t=${this.t} ?popup=${this._popup}></ss-theme-preview>
          <label class="row">
            <span>${this.t("show_popup")}</span>
            <input
              type="checkbox"
              class="switch"
              .checked=${this._popup}
              @change=${r=>this._popup=r.target.checked}
            />
          </label>
          <label class="row">
            <span>
              ${this.t("whole_screen")}
              <small>${this.t("whole_screen_hint")}</small>
            </span>
            <input
              type="checkbox"
              class="switch"
              .checked=${this._wholeScreen}
              @change=${r=>this._wholeScreen=r.target.checked}
            />
          </label>
        </aside>
      </div>
    `}_fixedNotice(){let e=Object.keys(this._draft.overrides).filter(t=>Se.has(t));return e.length?n`<div class="fixed">
      <span>${this.t("fixed_colors",{count:e.length})}</span>
      <button
        class="small"
        @click=${()=>{let t=Object.fromEntries(Object.entries(this._draft.overrides).filter(([s])=>!Se.has(s)));this._draft={...this._draft,overrides:t}}}
      >
        ${this.t("follow_quick")}
      </button>
    </div>`:d}_varRow(e,t,s,a,i=this._draft.overrides[e],r=!1){let l=i??"",c=i??a;return n`
      <div class="var ${i!==void 0?"own":""}">
        <span class="label">${t}<code>--${e}</code></span>
        <span class="inline">
          ${s==="color"?n`<input
                type="color"
                aria-label=${t}
                .value=${ga.test(c)?c:"#000000"}
                @input=${h=>this._override(e,h.target.value)}
              />`:d}
          <input
            type="text"
            aria-label=${t}
            .value=${l}
            placeholder=${a}
            @change=${h=>this._override(e,h.target.value.trim())}
          />
          ${i!==void 0?n`<button
                class="icon"
                title=${r?this.t("remove"):this.t("reset")}
                @click=${()=>this._override(e,null)}
              >
                <ha-icon icon=${r?"mdi:delete-outline":"mdi:restore"}></ha-icon>
              </button>`:n`<span class="icon-space"></span>`}
        </span>
      </div>
    `}_barButtons(){let e=this._selected!==I?this._saved:null,t=[];return this._state.history&&t.push(n`<button ?disabled=${this._busy} @click=${this._undo}>
        <ha-icon icon="mdi:history"></ha-icon>${this.t("undo")}
      </button>`),e&&!this.dirty&&(this._state.loaded.includes(e.name)&&t.push(n`<button ?disabled=${this._busy} @click=${this._useForMe}>
          <ha-icon icon="mdi:account-check"></ha-icon>${this.t("use_for_me")}
        </button>`),e.name===this._state.default_theme?t.push(n`<span class="note">${this.t("is_default")}</span>`):this._state.loaded.includes(e.name)&&t.push(n`<button
          ?disabled=${this._busy}
          title=${this.t("set_default_hint")}
          @click=${this._setDefault}
        >
          <ha-icon icon="mdi:account-group"></ha-icon>${this.t("set_default")}
        </button>`),t.push(n`<button ?disabled=${this._busy} @click=${this._delete}>
        <ha-icon icon="mdi:delete-outline"></ha-icon>${this.t("delete_theme")}
      </button>`)),t.length?t:d}};g(Ae,"properties",{...f.properties,_state:{state:!0},_selected:{state:!0},_draft:{state:!0},_picking:{state:!0},_wholeScreen:{state:!0},_popup:{state:!0},_newVar:{state:!0},_leaving:{state:!0}}),g(Ae,"styles",[f.styles,v`
      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 16px;
      }

      .chip {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 14px;
        border-radius: 999px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
      }

      .chip.active {
        border-color: var(--primary-color);
        background: color-mix(in srgb, var(--primary-color) 14%, var(--card-background-color));
      }

      .chip em {
        font-style: normal;
        font-size: 12px;
        color: var(--secondary-text-color);
      }

      .chip em.bad {
        color: var(--error-color);
      }

      .chip.add {
        color: var(--primary-color);
      }

      .swatch {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid var(--divider-color);
      }

      .presets {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
        gap: 10px;
        margin-bottom: 8px;
      }

      .preset {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 8px;
        border-radius: 12px;
        border: 1px solid var(--divider-color);
        text-align: start;
      }

      .preset:hover {
        border-color: var(--primary-color);
      }

      .mini {
        display: flex;
        height: 64px;
        border-radius: 8px;
        overflow: hidden;
        gap: 6px;
      }

      .mini i {
        width: 18px;
      }

      .mini b {
        flex: 1;
        margin: 8px 8px 8px 0;
        border-radius: 6px;
        padding: 6px;
      }

      .mini s {
        display: block;
        width: 16px;
        height: 16px;
        border-radius: 50%;
      }

      select {
        font: inherit;
        padding: 6px 8px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: var(--primary-text-color);
      }

      .name {
        flex: 1;
        max-width: 280px;
      }

      details {
        border-top: 1px solid var(--divider-color);
      }

      summary {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 0;
        cursor: pointer;
        font-weight: 500;
      }

      .dots {
        display: inline-flex;
        gap: 3px;
        margin-inline-start: auto;
      }

      .dots i {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 1px solid var(--divider-color);
      }

      .var {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 6px 0 6px 8px;
        border-inline-start: 3px solid transparent;
      }

      .var.own {
        border-inline-start-color: var(--primary-color);
      }

      .var .label {
        min-width: 0;
      }

      .var code {
        display: block;
        font-size: 11px;
        color: var(--secondary-text-color);
        overflow-wrap: anywhere;
      }

      .var input[type="text"] {
        width: 190px;
      }

      .icon {
        display: inline-flex;
        padding: 6px;
        border-radius: 50%;
      }

      .icon-space {
        width: 30px;
      }

      .add-var input {
        flex: 1;
      }

      .small {
        padding: 6px 12px;
        border-radius: 999px;
        color: var(--primary-color);
        font-weight: 500;
      }

      .current {
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        padding: 12px;
        margin-bottom: 12px;
        border-radius: 12px;
        border: 1px solid var(--primary-color);
        background: color-mix(in srgb, var(--primary-color) 10%, var(--card-background-color));
        text-align: start;
      }

      .current small {
        margin: 0;
      }

      .fixed {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
        padding: 10px 12px;
        margin-bottom: 8px;
        border-radius: 10px;
        background: var(--secondary-background-color);
        font-size: 13px;
      }

      .fixed span {
        flex: 1;
        min-width: 200px;
      }

      .leaving {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
        padding: 12px 14px;
        margin-bottom: 16px;
        border-radius: var(--ss-radius, 12px);
        background: color-mix(in srgb, var(--warning-color, #ffa600) 16%, var(--card-background-color));
      }

      .leaving span {
        flex: 1;
      }

      .leaving button:not(.primary) {
        padding: 8px 12px;
      }

      .hint.bad {
        color: var(--error-color);
      }

      .note {
        color: var(--secondary-text-color);
        padding: 0 8px;
      }

      @media (max-width: 600px) {
        .var {
          flex-direction: column;
          align-items: stretch;
        }

        .var input[type="text"] {
          flex: 1;
          width: auto;
        }
      }
    `]);customElements.get("ss-themes-tab")||customElements.define("ss-themes-tab",Ae);var vt="0.6.1";var ba=["themes","sidebar","rooms","climate","people","check"],Ce=class extends ${constructor(){super(),this._tab="themes",this._leaving=null}get t(){return Ue(this.hass)}willUpdate(e){e.has("hass")&&this.hass&&!this._loading&&(this._loading=this._load())}async _load(){try{this._data=await this.hass.callWS({type:"style_studio/get"})}catch(e){this._error=e.message??String(e)}}_pickTab(e){if(e===this._tab)return;this.renderRoot.querySelector(".tab-content > *")?.dirty?this._leaving=e:this._tab=e}render(){return n`
      <div class="toolbar">
        ${this.narrow?n`<button class="icon" @click=${this._toggleMenu} aria-label="Menu">
              <ha-icon icon="mdi:menu"></ha-icon>
            </button>`:d}
        <h1>${this.t("title")}</h1>
      </div>
      <main>
        ${this._error?n`<div class="warning">${this.t("error",{message:this._error})}</div>`:d}
        ${this._data?this._content():d}
      </main>
    `}_toggleMenu(){this.dispatchEvent(new Event("hass-toggle-menu",{bubbles:!0,composed:!0}))}_content(){return n`
      ${this._staleVersion()?n`<div class="warning">
            <ha-icon icon="mdi:alert-outline"></ha-icon>
            ${this.t("warn_old_panel",{old:this._staleVersion(),new:this._data.version})}
          </div>`:d}
      <nav class="tabs">
        ${ba.map(e=>n`<button
            class=${e===this._tab?"active":""}
            @click=${()=>this._pickTab(e)}
          >
            ${this.t(`tab_${e}`)}
          </button>`)}
      </nav>
      ${this._leaving?n`<div class="leaving">
            <span>${this.t("discard_confirm")}</span>
            <button @click=${()=>this._leaving=null}>${this.t("no")}</button>
            <button
              class="primary"
              @click=${()=>{this._tab=this._leaving,this._leaving=null}}
            >
              ${this.t("yes")}
            </button>
          </div>`:d}
      <div class="tab-content">${this._tabContent()}</div>
    `}_staleVersion(){let e=window.__styleStudio?.version;return vt!==this._data.version?vt:e&&e!==this._data.version?e:null}_tabContent(){switch(this._tab){case"themes":return n`<ss-themes-tab .hass=${this.hass} .narrow=${this.narrow}></ss-themes-tab>`;case"check":return n`<ss-check-tab .hass=${this.hass} .narrow=${this.narrow}></ss-check-tab>`;case"rooms":return n`<ss-rooms-tab .hass=${this.hass} .narrow=${this.narrow}></ss-rooms-tab>`;case"climate":return n`<ss-climate-tab .hass=${this.hass} .narrow=${this.narrow}></ss-climate-tab>`;case"people":return n`<ss-people-tab .hass=${this.hass} .narrow=${this.narrow}></ss-people-tab>`;case"sidebar":return n`<ss-sidebar-tab
          .hass=${this.hass}
          .narrow=${this.narrow}
          .glass=${this._data.glass_sidebar}
          @reload=${()=>this._load()}
        ></ss-sidebar-tab>`;default:return n`<div class="card coming">${this.t("coming")}</div>`}}};g(Ce,"properties",{hass:{attribute:!1},narrow:{type:Boolean},panel:{attribute:!1},_data:{state:!0},_tab:{state:!0},_leaving:{state:!0}}),g(Ce,"styles",v`
    /* Home Assistant gives a panel a fixed-height box and cuts off what
       sticks out, so the panel scrolls by itself. That also keeps the Save
       bar at the bottom of the screen. */
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow-y: auto;
      box-sizing: border-box;
      background: var(--primary-background-color);
      color: var(--primary-text-color);
      font-family: var(--ha-font-family-body, Roboto, sans-serif);
      --ss-radius: var(--ha-card-border-radius, 12px);
    }

    .toolbar {
      display: flex;
      align-items: center;
      gap: 8px;
      height: var(--header-height, 56px);
      padding: 0 16px;
      flex-shrink: 0;
    }

    h1 {
      margin: 0;
      font-size: 20px;
      font-weight: 400;
    }

    main {
      flex: 1;
      width: 100%;
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 16px;
      box-sizing: border-box;
    }

    button {
      font: inherit;
      color: inherit;
      background: none;
      border: 0;
      cursor: pointer;
    }

    button.icon {
      display: inline-flex;
      padding: 8px;
      border-radius: 50%;
    }

    .primary {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
      border-radius: 999px;
      padding: 8px 18px;
      font-weight: 500;
    }

    .warning,
    .leaving {
      display: flex;
      gap: 10px;
      align-items: center;
      flex-wrap: wrap;
      padding: 12px 14px;
      margin-bottom: 12px;
      border-radius: var(--ss-radius);
      background: color-mix(in srgb, var(--warning-color, #ffa600) 16%, var(--card-background-color));
      line-height: 1.4;
    }

    .warning ha-icon {
      color: var(--warning-color, #ffa600);
      flex-shrink: 0;
    }

    .leaving span {
      flex: 1;
    }

    .leaving button:not(.primary) {
      padding: 8px 12px;
    }

    .tabs {
      display: flex;
      gap: 4px;
      overflow-x: auto;
      border-bottom: 1px solid var(--divider-color);
      margin-bottom: 16px;
    }

    .tabs button {
      padding: 10px 14px;
      white-space: nowrap;
      border-bottom: 2px solid transparent;
      color: var(--secondary-text-color);
    }

    .tabs button.active {
      color: var(--primary-color);
      border-bottom-color: var(--primary-color);
      font-weight: 500;
    }

    .card {
      background: var(--ha-card-background, var(--card-background-color));
      border-radius: var(--ss-radius);
      border: 1px solid var(--ha-card-border-color, var(--divider-color));
      padding: 16px;
      margin-bottom: 16px;
    }

    .coming {
      color: var(--secondary-text-color);
    }
  `);customElements.get("style-studio-panel")||customElements.define("style-studio-panel",Ce);
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
lit-html/directive.js:
lit-html/directives/repeat.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
lit-html/directives/live.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
