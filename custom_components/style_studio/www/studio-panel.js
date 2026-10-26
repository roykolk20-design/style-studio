var St=Object.defineProperty;var At=(a,t,e)=>t in a?St(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e;var _=(a,t,e)=>At(a,typeof t!="symbol"?t+"":t,e);var j=globalThis,G=j.ShadowRoot&&(j.ShadyCSS===void 0||j.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,B=Symbol(),ot=new WeakMap,E=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==B)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(G&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=ot.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&ot.set(e,t))}return t}toString(){return this.cssText}},at=a=>new E(typeof a=="string"?a:a+"",void 0,B),$=(a,...t)=>{let e=a.length===1?a[0]:t.reduce((i,s,o)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+a[o+1],a[0]);return new E(e,a,B)},rt=(a,t)=>{if(G)a.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),s=j.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,a.appendChild(i)}},V=G?a=>a:a=>a instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return at(e)})(a):a;var{is:Et,defineProperty:Ct,getOwnPropertyDescriptor:Tt,getOwnPropertyNames:zt,getOwnPropertySymbols:Ot,getPrototypeOf:Pt}=Object,L=globalThis,nt=L.trustedTypes,Ht=nt?nt.emptyScript:"",Nt=L.reactiveElementPolyfillSupport,C=(a,t)=>a,W={toAttribute(a,t){switch(t){case Boolean:a=a?Ht:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,t){let e=a;switch(t){case Boolean:e=a!==null;break;case Number:e=a===null?null:Number(a);break;case Object:case Array:try{e=JSON.parse(a)}catch{e=null}}return e}},dt=(a,t)=>!Et(a,t),lt={attribute:!0,type:String,converter:W,reflect:!1,useDefault:!1,hasChanged:dt};Symbol.metadata??=Symbol("metadata"),L.litPropertyMetadata??=new WeakMap;var b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=lt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Ct(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:o}=Tt(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:s,set(r){let n=s?.call(this);o?.call(this,r),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??lt}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;let t=Pt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){let e=this.properties,i=[...zt(e),...Ot(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(V(s))}else t!==void 0&&e.push(V(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return rt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let o=(i.converter?.toAttribute!==void 0?i.converter:W).toAttribute(e,i.type);this._$Em=t,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let o=i.getPropertyOptions(s),r=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:W;this._$Em=s;let n=r.fromAttribute(e,o.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(t!==void 0){let r=this.constructor;if(s===!1&&(o=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??dt)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),o!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,o]of i){let{wrapped:r}=o,n=this[s];r!==!0||this._$AL.has(s)||n===void 0||this.C(s,void 0,o,n)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[C("elementProperties")]=new Map,b[C("finalized")]=new Map,Nt?.({ReactiveElement:b}),(L.reactiveElementVersions??=[]).push("2.1.2");var X=globalThis,ht=a=>a,I=X.trustedTypes,ct=I?I.createPolicy("lit-html",{createHTML:a=>a}):void 0,bt="$lit$",f=`lit$${Math.random().toFixed(9).slice(2)}$`,vt="?"+f,Mt=`<${vt}>`,w=document,z=()=>w.createComment(""),O=a=>a===null||typeof a!="object"&&typeof a!="function",Q=Array.isArray,Ut=a=>Q(a)||typeof a?.[Symbol.iterator]=="function",J=`[ 	
\f\r]`,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pt=/-->/g,gt=/>/g,x=RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ut=/'/g,mt=/"/g,ft=/^(?:script|style|textarea|title)$/i,tt=a=>(t,...e)=>({_$litType$:a,strings:t,values:e}),l=tt(1),Zt=tt(2),Yt=tt(3),k=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),_t=new WeakMap,y=w.createTreeWalker(w,129);function $t(a,t){if(!Q(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return ct!==void 0?ct.createHTML(t):t}var Rt=(a,t)=>{let e=a.length-1,i=[],s,o=t===2?"<svg>":t===3?"<math>":"",r=T;for(let n=0;n<e;n++){let d=a[n],c,g,p=-1,m=0;for(;m<d.length&&(r.lastIndex=m,g=r.exec(d),g!==null);)m=r.lastIndex,r===T?g[1]==="!--"?r=pt:g[1]!==void 0?r=gt:g[2]!==void 0?(ft.test(g[2])&&(s=RegExp("</"+g[2],"g")),r=x):g[3]!==void 0&&(r=x):r===x?g[0]===">"?(r=s??T,p=-1):g[1]===void 0?p=-2:(p=r.lastIndex-g[2].length,c=g[1],r=g[3]===void 0?x:g[3]==='"'?mt:ut):r===mt||r===ut?r=x:r===pt||r===gt?r=T:(r=x,s=void 0);let v=r===x&&a[n+1].startsWith("/>")?" ":"";o+=r===T?d+Mt:p>=0?(i.push(c),d.slice(0,p)+bt+d.slice(p)+f+v):d+f+(p===-2?n:v)}return[$t(a,o+(a[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},P=class a{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0,n=t.length-1,d=this.parts,[c,g]=Rt(t,e);if(this.el=a.createElement(c,i),y.currentNode=this.el.content,e===2||e===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(s=y.nextNode())!==null&&d.length<n;){if(s.nodeType===1){if(s.hasAttributes())for(let p of s.getAttributeNames())if(p.endsWith(bt)){let m=g[r++],v=s.getAttribute(p).split(f),D=/([.?@])?(.*)/.exec(m);d.push({type:1,index:o,name:D[2],strings:v,ctor:D[1]==="."?q:D[1]==="?"?F:D[1]==="@"?Z:A}),s.removeAttribute(p)}else p.startsWith(f)&&(d.push({type:6,index:o}),s.removeAttribute(p));if(ft.test(s.tagName)){let p=s.textContent.split(f),m=p.length-1;if(m>0){s.textContent=I?I.emptyScript:"";for(let v=0;v<m;v++)s.append(p[v],z()),y.nextNode(),d.push({type:2,index:++o});s.append(p[m],z())}}}else if(s.nodeType===8)if(s.data===vt)d.push({type:2,index:o});else{let p=-1;for(;(p=s.data.indexOf(f,p+1))!==-1;)d.push({type:7,index:o}),p+=f.length-1}o++}}static createElement(t,e){let i=w.createElement("template");return i.innerHTML=t,i}};function S(a,t,e=a,i){if(t===k)return t;let s=i!==void 0?e._$Co?.[i]:e._$Cl,o=O(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(a),s._$AT(a,e,i)),i!==void 0?(e._$Co??=[])[i]=s:e._$Cl=s),s!==void 0&&(t=S(a,s._$AS(a,t.values),s,i)),t}var K=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??w).importNode(e,!0);y.currentNode=s;let o=y.nextNode(),r=0,n=0,d=i[0];for(;d!==void 0;){if(r===d.index){let c;d.type===2?c=new H(o,o.nextSibling,this,t):d.type===1?c=new d.ctor(o,d.name,d.strings,this,t):d.type===6&&(c=new Y(o,this,t)),this._$AV.push(c),d=i[++n]}r!==d?.index&&(o=y.nextNode(),r++)}return y.currentNode=w,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},H=class a{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=S(this,t,e),O(t)?t===h||t==null||t===""?(this._$AH!==h&&this._$AR(),this._$AH=h):t!==this._$AH&&t!==k&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ut(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==h&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(w.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=P.createElement($t(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let o=new K(s,this),r=o.u(this.options);o.p(e),this.T(r),this._$AH=o}}_$AC(t){let e=_t.get(t.strings);return e===void 0&&_t.set(t.strings,e=new P(t)),e}k(t){Q(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let o of t)s===e.length?e.push(i=new a(this.O(z()),this.O(z()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=ht(t).nextSibling;ht(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},A=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=h,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=h}_$AI(t,e=this,i,s){let o=this.strings,r=!1;if(o===void 0)t=S(this,t,e,0),r=!O(t)||t!==this._$AH&&t!==k,r&&(this._$AH=t);else{let n=t,d,c;for(t=o[0],d=0;d<o.length-1;d++)c=S(this,n[i+d],e,d),c===k&&(c=this._$AH[d]),r||=!O(c)||c!==this._$AH[d],c===h?t=h:t!==h&&(t+=(c??"")+o[d+1]),this._$AH[d]=c}r&&!s&&this.j(t)}j(t){t===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},q=class extends A{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===h?void 0:t}},F=class extends A{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==h)}},Z=class extends A{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=S(this,t,e,0)??h)===k)return;let i=this._$AH,s=t===h&&i!==h||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==h&&(i===h||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Y=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t)}};var Dt=X.litHtmlPolyfillSupport;Dt?.(P,H),(X.litHtmlVersions??=[]).push("3.3.3");var xt=(a,t,e)=>{let i=e?.renderBefore??t,s=i._$litPart$;if(s===void 0){let o=e?.renderBefore??null;i._$litPart$=s=new H(t.insertBefore(z(),o),o,void 0,e??{})}return s._$AI(a),s};var et=globalThis,u=class extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=xt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return k}};u._$litElement$=!0,u.finalized=!0,et.litElementHydrateSupport?.({LitElement:u});var jt=et.litElementPolyfillSupport;jt?.({LitElement:u});(et.litElementVersions??=[]).push("4.2.2");var N=-1,M=class extends u{constructor(){super(),this.items=[],this.categories=[],this.hidden=[],this._selected=null,this._confirm=null,this._dropTarget=null}_emit(t,e=this.hidden){let i=this.canHide?{categories:t,hidden:e}:{categories:t};this.dispatchEvent(new CustomEvent("change",{detail:i}))}_clone(){return this.categories.map(t=>({name:t.name,panels:[...t.panels]}))}_move(t,e,i=null){let s=this._clone();for(let o of s)o.panels=o.panels.filter(r=>r!==t);if(e!==N){let o=s[e].panels,r=i===null?-1:o.indexOf(i);o.splice(r===-1?o.length:r,0,t)}this._emit(s)}_shift(t,e,i){let s=this._clone(),o=s[e].panels,r=o.indexOf(t),n=r+i;r===-1||n<0||n>=o.length||([o[r],o[n]]=[o[n],o[r]],this._emit(s))}_toggleHidden(t){let e=this.hidden.includes(t)?this.hidden.filter(i=>i!==t):[...this.hidden,t];this._emit(this.categories,e)}_addGroup(){let t=new Set(this.categories.map(i=>i.name.toLowerCase())),e=this.t("new_group");for(let i=2;t.has(e.toLowerCase());i+=1)e=`${this.t("new_group")} ${i}`;this._emit([...this._clone(),{name:e,panels:[]}])}_rename(t,e){let i=this._clone();i[t].name=e.trim()||i[t].name,this._emit(i)}_swapGroups(t,e){let i=this._clone(),s=t+e;s<0||s>=i.length||([i[t],i[s]]=[i[s],i[t]],this._emit(i))}_removeGroup(t){this._confirm=null,this._emit(this._clone().filter((e,i)=>i!==t))}_item(t){return this.items.find(e=>e.path===t)??{path:t,title:t,icon:"mdi:help",missing:!0}}render(){let t=new Set(this.categories.flatMap(i=>i.panels)),e=this.items.filter(i=>!t.has(i.path));return l`
      ${this._zone(N,e,l`
        <div class="title">
          <strong>${this.t("ungrouped")}</strong>
          <span class="hint">${this.t("ungrouped_hint")}</span>
        </div>
      `)}
      ${this.categories.map((i,s)=>this._zone(s,i.panels.map(o=>this._item(o)),this._groupHeader(i,s)))}
      <button class="add" ?disabled=${this.disabled} @click=${this._addGroup}>
        <ha-icon icon="mdi:plus"></ha-icon>${this.t("add_group")}
      </button>
    `}_groupHeader(t,e){return this._confirm===e?l`
        <div class="title confirm">
          <span>${this.t("remove_group_confirm")}</span>
          <button class="danger" @click=${()=>this._removeGroup(e)}>${this.t("yes")}</button>
          <button @click=${()=>this._confirm=null}>${this.t("no")}</button>
        </div>
      `:l`
      <div class="title">
        <input
          .value=${t.name}
          maxlength="40"
          aria-label=${this.t("group_name")}
          ?disabled=${this.disabled}
          @change=${i=>this._rename(e,i.target.value)}
        />
        <button
          class="icon"
          title=${this.t("move_up")}
          ?disabled=${this.disabled||e===0}
          @click=${()=>this._swapGroups(e,-1)}
        >
          <ha-icon icon="mdi:arrow-up"></ha-icon>
        </button>
        <button
          class="icon"
          title=${this.t("move_down")}
          ?disabled=${this.disabled||e===this.categories.length-1}
          @click=${()=>this._swapGroups(e,1)}
        >
          <ha-icon icon="mdi:arrow-down"></ha-icon>
        </button>
        <button
          class="icon"
          title=${this.t("remove_group")}
          ?disabled=${this.disabled}
          @click=${()=>this._confirm=e}
        >
          <ha-icon icon="mdi:delete-outline"></ha-icon>
        </button>
      </div>
    `}_zone(t,e,i){let s=this._selected,o=s&&s.group!==t;return l`
      <section
        class="zone ${this._dropTarget===t?"over":""}"
        @dragover=${r=>this._dragOver(r,t)}
        @dragleave=${()=>this._dropTarget=null}
        @drop=${r=>this._drop(r,t,null)}
      >
        ${i}
        <div class="chips">
          ${e.map(r=>this._chip(r,t))}
          ${!e.length&&t!==N?l`<span class="hint">${this.t("empty_group")}</span>`:h}
        </div>
        ${o?l`<button class="here" @click=${()=>this._moveSelected(t)}>
              <ha-icon icon="mdi:arrow-down-bold"></ha-icon>${this.t("move_here")}
            </button>`:h}
      </section>
    `}_chip(t,e){let i=this.hidden.includes(t.path),s=this._selected?.path===t.path,o=e===N?[]:this.categories[e].panels,r=o.indexOf(t.path);return l`
      <div
        class="chip ${i?"hidden":""} ${s?"selected":""}"
        draggable=${this.disabled?"false":"true"}
        @dragstart=${n=>{n.dataTransfer.setData("text/plain",t.path),n.dataTransfer.effectAllowed="move"}}
        @dragend=${()=>this._dropTarget=null}
        @drop=${n=>{n.stopPropagation(),this._drop(n,e,t.path)}}
      >
        <button
          class="label"
          ?disabled=${this.disabled}
          aria-pressed=${s?"true":"false"}
          @click=${()=>this._selected=s?null:{path:t.path,group:e}}
        >
          <ha-icon .icon=${t.icon}></ha-icon>
          <span>${t.title}</span>
          ${t.missing?l`<em>${this.t("missing")}</em>`:h}
        </button>
        ${s&&e!==N?l`
              <button
                class="icon"
                title=${this.t("move_left")}
                ?disabled=${r===0}
                @click=${()=>this._shift(t.path,e,-1)}
              >
                <ha-icon icon="mdi:chevron-left"></ha-icon>
              </button>
              <button
                class="icon"
                title=${this.t("move_right")}
                ?disabled=${r===o.length-1}
                @click=${()=>this._shift(t.path,e,1)}
              >
                <ha-icon icon="mdi:chevron-right"></ha-icon>
              </button>
            `:h}
        ${this.canHide?l`<button
              class="icon"
              title=${i?this.t("show"):this.t("hide")}
              ?disabled=${this.disabled}
              @click=${()=>this._toggleHidden(t.path)}
            >
              <ha-icon icon=${i?"mdi:eye-off-outline":"mdi:eye-outline"}></ha-icon>
            </button>`:h}
      </div>
    `}_dragOver(t,e){this.disabled||(t.preventDefault(),t.dataTransfer.dropEffect="move",this._dropTarget=e)}_drop(t,e,i){if(this.disabled)return;t.preventDefault(),this._dropTarget=null;let s=t.dataTransfer.getData("text/plain");s&&s!==i&&this._move(s,e,i)}_moveSelected(t){let{path:e}=this._selected;this._selected={path:e,group:t},this._move(e,t)}};_(M,"properties",{items:{attribute:!1},categories:{attribute:!1},hidden:{attribute:!1},disabled:{type:Boolean},canHide:{type:Boolean},t:{attribute:!1},_selected:{state:!0},_confirm:{state:!0},_dropTarget:{state:!0}}),_(M,"styles",$`
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
  `);customElements.get("ss-groups-editor")||customElements.define("ss-groups-editor",M);var yt={phone:{width:430,height:640},tablet:{width:768,height:600},desktop:{width:760,height:560}},U=class extends u{constructor(){super(),this.settingsLabel="Settings",this.items=[],this.device="desktop",this.page="light",this.expanded=!0,this._scale=1}connectedCallback(){super.connectedCallback(),this._resize=new ResizeObserver(()=>this._fit()),this._resize.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this._resize?.disconnect()}updated(t){t.has("device")&&this._fit()}_fit(){let{width:t}=yt[this.device];this._scale=Math.min(1,this.clientWidth/t)||1}render(){let t=this.settings;if(!t)return h;let{width:e,height:i}=yt[this.device];return l`
      <div class="viewport" style="height:${i*this._scale}px">
        <div
          class="screen ${this.page}"
          style="width:${e}px;height:${i}px;transform:scale(${this._scale})"
        >
          ${this.device==="desktop"?this._desktop(t):this._modal(t)}
        </div>
      </div>
    `}_desktop(t){let e=t.floating?t.inset:0,i=(this.expanded?256:56)+e*2;return l`
      <div class="desktop">
        <div class="shell" style="width:${i}px;padding:${e}px;${this._shell(t)}">
          ${this._sidebar(t,{radius:t.floating?t.radius:0,floating:t.floating})}
        </div>
        ${this._page()}
      </div>
    `}_modal(t){let e=this.device==="phone",i=e&&t.floating?t.inset:0,s=e?Math.min(430*.9,t.mobile_width):256;return l`
      ${this._page()}
      <div class="backdrop ${e&&t.mobile_blur?"blurred":""}"></div>
      <div class="drawer ${e?"":"plain"}" style="width:${s}px;padding:${i}px">
        ${this._sidebar(t,{radius:e&&t.floating?t.radius:0,floating:e&&t.floating,opacity:e?Math.min(t.opacity+12,100):t.opacity,phone:e,expanded:!0})}
      </div>
    `}_shell(t){return t.shell==="custom"?`background:${t.shell_color}`:t.shell==="theme"?"background:var(--primary-background-color)":"background:transparent"}_sidebar(t,{radius:e,floating:i,opacity:s=t.opacity,phone:o=!1,expanded:r=this.expanded}){let n=Math.min(Math.max((t.floating?t.radius:0)-6,8),14),d=[`border-radius:${e}px`,`--ss-opacity:${s}%`,`--ss-blur:${t.blur}px`,`--ss-item-radius:${n}px`,`--ss-phone-text:${t.mobile_text_size??14}px`,t.accent?`--sidebar-selected-icon-color:${t.accent};--sidebar-selected-text-color:${t.accent}`:""].join(";"),c=this._rows(t),g=c.find(p=>p.item)?.item.path;return l`
      <nav
        class="sidebar ${i?"floating":""} ${o?"phone":""} ${r?"expanded":""} ${t.highlight}"
        style=${d}
      >
        <div class="menu">
          <ha-icon icon="mdi:menu"></ha-icon>
          ${r?l`<span>Home Assistant</span>`:h}
        </div>
        <div class="list">
          ${c.map(p=>p.heading!==void 0?l`<div class="heading">${r?p.heading:""}</div>`:l`
                  <div
                    class="item ${p.item.path===g?"selected":""} ${t.hover_motion?"motion":""}"
                  >
                    <ha-icon .icon=${p.item.icon}></ha-icon>
                    ${r?l`<span>${p.item.title}</span>`:h}
                  </div>
                `)}
        </div>
        <div class="spacer"></div>
        <div class="item">
          <ha-icon icon="mdi:cog"></ha-icon>
          ${r?l`<span>${this.settingsLabel}</span>`:h}
        </div>
      </nav>
    `}_rows(t){let e=new Set(t.hidden??[]),i=new Set(t.categories.flatMap(n=>n.panels)),s=new Map(this.items.map(n=>[n.path,n])),o=this.items.filter(n=>!i.has(n.path)&&!e.has(n.path)).map(n=>({item:n})),r=new Set;for(let n of t.categories){let d=n.panels.filter(c=>!r.has(c)&&!e.has(c)&&s.has(c)).map(c=>s.get(c));d.forEach(c=>r.add(c.path)),d.length&&(o.push({heading:n.name}),o.push(...d.map(c=>({item:c}))))}return o}_page(){return l`
      <div class="page">
        <div class="toolbar"></div>
        <div class="cards">
          ${[0,1,2,3,4,5].map(()=>l`<div class="card"></div>`)}
        </div>
      </div>
    `}};_(U,"properties",{settings:{attribute:!1},items:{attribute:!1},device:{},page:{},expanded:{type:Boolean},settingsLabel:{},_scale:{state:!0}}),_(U,"styles",$`
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
  `);customElements.get("ss-sidebar-preview")||customElements.define("ss-sidebar-preview",U);var Gt={title:"Stijl",tab_sidebar:"Zijbalk",tab_themes:"Thema's",tab_rooms:"Kamers en pop-ups",tab_climate:"Klimaat",tab_people:"Per persoon",tab_check:"Controle en herstel",coming:"Dit onderdeel komt in een volgende versie.",glass_intro:"De zijbalk wordt opgemaakt door de plugin Glass Sidebar. Hier stel je die in; wijzigingen gelden voor iedereen en verschijnen direct.",glass_missing_title:"Glass Sidebar is niet ge\xEFnstalleerd",glass_missing:"Installeer Glass Sidebar via HACS en herstart Home Assistant. Daarna stel je de zijbalk hier in.",glass_not_added_title:"Glass Sidebar is nog niet toegevoegd",glass_not_added:"Ga naar Instellingen \u203A Apparaten en diensten \u203A Integratie toevoegen \u203A Glass Sidebar.",glass_not_loaded:"Glass Sidebar is uitgeschakeld of niet geladen. Je kunt instellingen opslaan, maar je ziet ze pas als Glass Sidebar weer draait.",glass_old:"Je hebt Glass Sidebar {version}. Style Studio is gemaakt voor {min} of nieuwer; werk Glass Sidebar bij via HACS. Opties die jouw versie nog niet kent, doen niets.",open_glass:"Instellingen van Glass Sidebar openen",shape:"Vorm",floating:"Zwevend",floating_hint:"Een losse balk met ruimte eromheen.",inset:"Afstand tot de rand",radius:"Hoeken",glass:"Glas",blur:"Vervaging",opacity:"Dekking",opacity_hint:"Lager is meer doorzichtig.",glass_cards:"Glazen dashboardkaarten",glass_cards_hint:"Kaarten worden doorschijnend. Kan zwaar zijn op oudere tablets.",active:"Actieve pagina",highlight_soft:"Zacht",highlight_vivid:"Vol",own_accent:"Eigen kleur",own_accent_hint:"Uit: de kleur van het thema.",motion:"Iconen bewegen bij aanwijzen",phone:"Telefoon",phone_hint:"Voor schermen tot 600 pixels breed.",mobile_width:"Breedte van het menu",mobile_text_size:"Tekstgrootte",mobile_blur:"Pagina achter het menu vervagen",groups:"Groepen",groups_hint:"Sleep items naar een groep, of tik een item aan en kies Hierheen. Items zonder groep staan bovenaan.",ungrouped:"Zonder groep",ungrouped_hint:"Staan bovenaan, in de volgorde van Home Assistant.",add_group:"Groep toevoegen",new_group:"Nieuwe groep",group_name:"Naam van de groep",move_here:"Hierheen",move_up:"Omhoog",move_down:"Omlaag",move_left:"Naar voren",move_right:"Naar achteren",remove_group:"Groep verwijderen",remove_group_confirm:"Verwijderen? De items gaan terug naar Zonder groep.",hide:"Verbergen",show:"Tonen",missing:"niet gevonden",empty_group:"Sleep items hierheen.",preview:"Voorbeeld",preview_hint:"Wordt pas echt toegepast als je opslaat.",device_phone:"Telefoon",device_tablet:"Tablet",device_desktop:"Pc",page_light:"Lichte pagina",page_dark:"Donkere pagina",expanded:"Uitgeklapt",unsaved:"Niet opgeslagen wijzigingen",cancel:"Annuleren",save:"Opslaan",saved:"Opgeslagen",undo:"Vorige versie terugzetten",undo_confirm:"De instellingen van voor de laatste keer opslaan komen terug. Doorgaan?",undone:"Vorige versie teruggezet",nothing_to_undo:"Er is geen vorige versie",yes:"Ja",no:"Nee",discard_confirm:"Je hebt wijzigingen die niet zijn opgeslagen. Weggooien?",error:"Er ging iets mis: {message}",warn_old_panel:"Dit scherm gebruikt een oude versie van het paneel ({old}, server {new}). Herlaad de pagina. In de Companion-app: Instellingen \u203A Companion-app \u203A Probleemoplossing \u203A Frontend-cache wissen."},wt={title:"Style",tab_sidebar:"Sidebar",tab_themes:"Themes",tab_rooms:"Rooms and pop-ups",tab_climate:"Climate",tab_people:"People",tab_check:"Check and restore",coming:"This part comes in a later version.",glass_intro:"The sidebar is styled by the Glass Sidebar plugin. You set it up here; changes apply to everyone and show right away.",glass_missing_title:"Glass Sidebar is not installed",glass_missing:"Install Glass Sidebar through HACS and restart Home Assistant. Then set up the sidebar here.",glass_not_added_title:"Glass Sidebar is not added yet",glass_not_added:"Go to Settings \u203A Devices & services \u203A Add integration \u203A Glass Sidebar.",glass_not_loaded:"Glass Sidebar is disabled or not loaded. You can save settings, but you'll only see them once Glass Sidebar runs again.",glass_old:"You have Glass Sidebar {version}. Style Studio is made for {min} or newer; update Glass Sidebar through HACS. Options your version doesn't know do nothing.",open_glass:"Open Glass Sidebar settings",shape:"Shape",floating:"Floating",floating_hint:"A separate panel with space around it.",inset:"Distance to the edge",radius:"Corners",glass:"Glass",blur:"Blur",opacity:"Opacity",opacity_hint:"Lower is more see-through.",glass_cards:"Glass dashboard cards",glass_cards_hint:"Cards become translucent. Can be heavy on older tablets.",active:"Active page",highlight_soft:"Soft",highlight_vivid:"Solid",own_accent:"Own color",own_accent_hint:"Off: the theme's color.",motion:"Icons move on hover",phone:"Phone",phone_hint:"For screens up to 600 pixels wide.",mobile_width:"Menu width",mobile_text_size:"Text size",mobile_blur:"Blur the page behind the menu",groups:"Groups",groups_hint:"Drag items into a group, or tap an item and choose Move here. Items without a group stay at the top.",ungrouped:"No group",ungrouped_hint:"Shown at the top, in Home Assistant's order.",add_group:"Add group",new_group:"New group",group_name:"Group name",move_here:"Move here",move_up:"Up",move_down:"Down",move_left:"Earlier",move_right:"Later",remove_group:"Remove group",remove_group_confirm:"Remove? Its items go back to No group.",hide:"Hide",show:"Show",missing:"not found",empty_group:"Drag items here.",preview:"Preview",preview_hint:"Only applied once you save.",device_phone:"Phone",device_tablet:"Tablet",device_desktop:"Desktop",page_light:"Light page",page_dark:"Dark page",expanded:"Expanded",unsaved:"Unsaved changes",cancel:"Cancel",save:"Save",saved:"Saved",undo:"Restore previous version",undo_confirm:"The settings from before the last save come back. Continue?",undone:"Previous version restored",nothing_to_undo:"There is no previous version",yes:"Yes",no:"No",discard_confirm:"You have unsaved changes. Throw them away?",error:"Something went wrong: {message}",warn_old_panel:"This screen runs an old version of the panel ({old}, server {new}). Reload the page. In the Companion app: Settings \u203A Companion app \u203A Troubleshooting \u203A Reset frontend cache."};function kt(a){let t=(a?.locale?.language||a?.language||"nl").startsWith("nl")?Gt:wt;return(e,i={})=>(t[e]??wt[e]??e).replace(/\{(\w+)\}/g,(s,o)=>i[o]??"")}var it="0.1.0";var Lt=new Set(["config","profile","notfound"]),It=["sidebar","themes","rooms","climate","people","check"],st=a=>a==null?a:JSON.parse(JSON.stringify(a)),Bt=(a,t)=>JSON.stringify(a)===JSON.stringify(t);function Vt(a,t){let e=o=>String(o).split(".").map(r=>parseInt(r,10)||0),[i,s]=[e(a),e(t)];for(let o=0;o<Math.max(i.length,s.length);o+=1)if((i[o]??0)!==(s[o]??0))return(i[o]??0)<(s[o]??0);return!1}var R=class extends u{constructor(){super(),this._draft=null,this._tab="sidebar",this._device="desktop",this._page="light",this._expanded=!0,this._busy=!1,this._confirm=null,this._haSidebar={}}get t(){return kt(this.hass)}willUpdate(t){t.has("hass")&&this.hass&&!this._loading&&(this._loading=this._load(),window.innerWidth<=600?this._device="phone":this.narrow&&(this._device="tablet"))}async _load(){try{let[t,e]=await Promise.all([this.hass.callWS({type:"style_studio/get"}),this.hass.callWS({type:"frontend/get_user_data",key:"sidebar"}).then(i=>i?.value??{}).catch(()=>({}))]);this._data=t,this._haSidebar=e,this._draft=st(this._saved)}catch(t){this._showToast(this.t("error",{message:t.message??t}))}}get _glass(){return this._data.glass_sidebar}get _saved(){return this._data?.glass_sidebar.sidebar??null}get _dirty(){return this._draft!==null&&!Bt(this._draft,this._saved)}_set(t,e){this._edit({[t]:e})}_edit(t){this._draft={...this._draft,...t},this._toast=null}_ask(t,e){this._confirm={text:t,action:e}}_pickTab(t){if(t===this._tab)return;let e=()=>{this._tab=t,this._draft=st(this._saved)};this._dirty?this._ask(this.t("discard_confirm"),e):e()}async _run(t,e){this._busy=!0;try{await t(),await this._load(),e&&this._showToast(e)}catch(i){this._showToast(this.t("error",{message:i.message??i}))}finally{this._busy=!1}}_save(){this._run(()=>this.hass.callWS({type:"style_studio/sidebar/save",sidebar:this._draft}),this.t("saved"))}_undo(){this._ask(this.t("undo_confirm"),()=>this._run(async()=>{let{restored:t}=await this.hass.callWS({type:"style_studio/sidebar/undo"});if(!t)throw new Error(this.t("nothing_to_undo"))},this.t("undone")))}_showToast(t){this._toast=t,clearTimeout(this._toastTimer),this._toastTimer=setTimeout(()=>this._toast=null,4e3)}_items(){let t=this._haSidebar.panelOrder??[],e=new Set(this._haSidebar.hiddenPanels??[]),i=s=>{let o=t.indexOf(s);return o===-1?t.length:o};return Object.values(this.hass.panels??{}).filter(s=>(s.title||s.url_path==="lovelace")&&!Lt.has(s.url_path)&&!e.has(s.url_path)).map(s=>({path:s.url_path,icon:s.icon||"mdi:view-dashboard",title:this._panelTitle(s)})).sort((s,o)=>i(s.path)-i(o.path)||(o.path==="lovelace")-(s.path==="lovelace")||s.title.localeCompare(o.title))}_panelTitle(t){return t.title?this.hass.localize(`panel.${t.title}`)||t.title:this.hass.localize("panel.states")||"Overview"}render(){return l`
      <div class="toolbar">
        ${this.narrow?l`<button class="icon" @click=${this._toggleMenu} aria-label="Menu">
              <ha-icon icon="mdi:menu"></ha-icon>
            </button>`:h}
        <h1>${this.t("title")}</h1>
      </div>
      <main>
        ${this._data?this._content():h}
      </main>
      ${this._data?this._actionBar():h}
    `}_toggleMenu(){this.dispatchEvent(new Event("hass-toggle-menu",{bubbles:!0,composed:!0}))}_content(){return l`
      ${this._data.version!==it?this._warning(this.t("warn_old_panel",{old:it,new:this._data.version})):h}
      <nav class="tabs">
        ${It.map(t=>l`<button
            class=${t===this._tab?"active":""}
            @click=${()=>this._pickTab(t)}
          >
            ${this.t(`tab_${t}`)}
          </button>`)}
      </nav>
      ${this._tab==="sidebar"?this._sidebarTab():l`<div class="card coming">${this.t("coming")}</div>`}
    `}_warning(t){return l`<div class="warning"><ha-icon icon="mdi:alert-outline"></ha-icon>${t}</div>`}_sidebarTab(){let t=this._glass;if(!t.version&&!t.added)return l`<div class="card">
        <h2>${this.t("glass_missing_title")}</h2>
        <p class="hint">${this.t("glass_missing")}</p>
      </div>`;if(!t.added)return l`<div class="card">
        <h2>${this.t("glass_not_added_title")}</h2>
        <p class="hint">${this.t("glass_not_added")}</p>
      </div>`;let e=this._draft;return l`
      <p class="intro">${this.t("glass_intro")}</p>
      ${t.version&&Vt(t.version,t.min_version)?this._warning(this.t("glass_old",{version:t.version,min:t.min_version})):h}
      ${t.loaded?h:this._warning(this.t("glass_not_loaded"))}
      <div class="layout">
        <div class="settings">
          <div class="card">
            <h2>${this.t("shape")}</h2>
            ${this._switch(e,"floating",this.t("floating"),this.t("floating_hint"))}
            ${this._slider(e,"inset",this.t("inset"),0,24,"px",!e.floating)}
            ${this._slider(e,"radius",this.t("radius"),0,32,"px",!e.floating)}
          </div>

          <div class="card">
            <h2>${this.t("glass")}</h2>
            ${this._slider(e,"blur",this.t("blur"),0,40,"px")}
            ${this._slider(e,"opacity",this.t("opacity"),40,100,"%",!1,this.t("opacity_hint"))}
            ${this._switch(e,"glass_cards",this.t("glass_cards"),this.t("glass_cards_hint"))}
          </div>

          <div class="card">
            <h2>${this.t("active")}</h2>
            ${this._segment(e,"highlight",[["soft",this.t("highlight_soft")],["vivid",this.t("highlight_vivid")]])}
            <label class="row">
              <span>
                ${this.t("own_accent")}
                <small>${this.t("own_accent_hint")}</small>
              </span>
              <span class="inline">
                ${e.accent?l`<input
                      type="color"
                      .value=${e.accent}
                      @input=${i=>this._set("accent",i.target.value)}
                    />`:h}
                <input
                  type="checkbox"
                  class="switch"
                  .checked=${!!e.accent}
                  @change=${i=>this._set("accent",i.target.checked?"#f59e0b":null)}
                />
              </span>
            </label>
            ${this._switch(e,"hover_motion",this.t("motion"))}
          </div>

          <div class="card">
            <h2>${this.t("phone")}</h2>
            <p class="hint">${this.t("phone_hint")}</p>
            ${this._slider(e,"mobile_width",this.t("mobile_width"),240,360,"px")}
            ${this._slider(e,"mobile_text_size",this.t("mobile_text_size"),12,20,"px")}
            ${this._switch(e,"mobile_blur",this.t("mobile_blur"))}
          </div>

          <div class="card">
            <h2>${this.t("groups")}</h2>
            <p class="hint">${this.t("groups_hint")}</p>
            <ss-groups-editor
              .items=${this._items()}
              .categories=${e.categories}
              .t=${this.t}
              @change=${i=>this._edit(i.detail)}
            ></ss-groups-editor>
          </div>
        </div>

        <aside class="card preview">
          <h2>${this.t("preview")}</h2>
          <p class="hint">${this.t("preview_hint")}</p>
          <div class="segment small">
            ${["phone","tablet","desktop"].map(i=>l`<button
                class=${i===this._device?"active":""}
                @click=${()=>this._device=i}
              >
                ${this.t(`device_${i}`)}
                <small>${{phone:430,tablet:768,desktop:1920}[i]}</small>
              </button>`)}
          </div>
          <div class="segment small">
            ${["light","dark"].map(i=>l`<button
                class=${i===this._page?"active":""}
                @click=${()=>this._page=i}
              >
                ${this.t(`page_${i}`)}
              </button>`)}
            ${this._device==="desktop"?l`<button
                  class=${this._expanded?"active":""}
                  @click=${()=>this._expanded=!this._expanded}
                >
                  ${this.t("expanded")}
                </button>`:h}
          </div>
          <ss-sidebar-preview
            .settings=${e}
            .items=${this._items()}
            .device=${this._device}
            .page=${this._page}
            .expanded=${this._expanded}
            .settingsLabel=${this.hass.localize("panel.config")||"Settings"}
          ></ss-sidebar-preview>
        </aside>
      </div>
    `}_switch(t,e,i,s){return l`
      <label class="row">
        <span>
          ${i}
          ${s?l`<small>${s}</small>`:h}
        </span>
        <input
          type="checkbox"
          class="switch"
          .checked=${t[e]}
          @change=${o=>this._set(e,o.target.checked)}
        />
      </label>
    `}_slider(t,e,i,s,o,r,n=!1,d){return l`
      <label class="row slider ${n?"off":""}">
        <span>
          ${i}
          ${d?l`<small>${d}</small>`:h}
        </span>
        <span class="inline">
          <input
            type="range"
            min=${s}
            max=${o}
            step="1"
            .value=${String(t[e])}
            ?disabled=${n}
            @input=${c=>this._set(e,Number(c.target.value))}
          />
          <output>${t[e]}${r}</output>
        </span>
      </label>
    `}_segment(t,e,i){return l`
      <div class="segment" role="radiogroup">
        ${i.map(([s,o])=>l`<button
            role="radio"
            aria-checked=${t[e]===s?"true":"false"}
            class=${t[e]===s?"active":""}
            @click=${()=>this._set(e,s)}
          >
            ${o}
          </button>`)}
      </div>
    `}_actionBar(){if(this._confirm){let{text:e,action:i}=this._confirm;return l`
        <footer class="bar">
          <span class="grow">${e}</span>
          <button @click=${()=>this._confirm=null}>${this.t("no")}</button>
          <button
            class="primary"
            @click=${()=>{this._confirm=null,i()}}
          >
            ${this.t("yes")}
          </button>
        </footer>
      `}let t=this._tab==="sidebar"&&this._glass.added?this._glass.history:0;return!t&&!this._toast&&!this._dirty?h:l`
      <footer class="bar">
        ${t?l`<button ?disabled=${this._busy} @click=${this._undo}>
              <ha-icon icon="mdi:history"></ha-icon>${this.t("undo")}
            </button>`:h}
        <span class="grow">${this._toast??(this._dirty?this.t("unsaved"):"")}</span>
        ${this._dirty?l`
              <button ?disabled=${this._busy} @click=${()=>this._draft=st(this._saved)}>
                ${this.t("cancel")}
              </button>
              <button class="primary" ?disabled=${this._busy} @click=${this._save}>
                ${this.t("save")}
              </button>
            `:h}
      </footer>
    `}};_(R,"properties",{hass:{attribute:!1},narrow:{type:Boolean},panel:{attribute:!1},_data:{state:!0},_draft:{state:!0},_tab:{state:!0},_device:{state:!0},_page:{state:!0},_expanded:{state:!0},_busy:{state:!0},_toast:{state:!0},_confirm:{state:!0},_haSidebar:{state:!0}}),_(R,"styles",$`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
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
      padding: 0 16px 24px;
      box-sizing: border-box;
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

    .warning {
      display: flex;
      gap: 10px;
      align-items: flex-start;
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

    .intro {
      margin: 0 0 16px;
      color: var(--secondary-text-color);
      line-height: 1.4;
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
      box-shadow: var(--ha-card-box-shadow, none);
      border: 1px solid var(--ha-card-border-color, var(--divider-color));
      padding: 16px;
      margin-bottom: 16px;
    }

    .coming {
      color: var(--secondary-text-color);
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
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      background: none;
      cursor: pointer;
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
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
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
  `);customElements.get("style-studio-panel")||customElements.define("style-studio-panel",R);
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
*/
