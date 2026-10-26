var Ie=Object.defineProperty;var We=(o,e,t)=>e in o?Ie(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var g=(o,e,t)=>We(o,typeof e!="symbol"?e+"":e,t);var W=globalThis,K=W.ShadowRoot&&(W.ShadyCSS===void 0||W.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ee=Symbol(),ve=new WeakMap,z=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==ee)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(K&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=ve.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&ve.set(t,e))}return e}toString(){return this.cssText}},fe=o=>new z(typeof o=="string"?o:o+"",void 0,ee),_=(o,...e)=>{let t=o.length===1?o[0]:e.reduce((i,a,s)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+o[s+1],o[0]);return new z(t,o,ee)},xe=(o,e)=>{if(K)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),a=W.litNonce;a!==void 0&&i.setAttribute("nonce",a),i.textContent=t.cssText,o.appendChild(i)}},te=K?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return fe(t)})(o):o;var{is:Ke,defineProperty:Je,getOwnPropertyDescriptor:qe,getOwnPropertyNames:Fe,getOwnPropertySymbols:Ze,getPrototypeOf:Ye}=Object,J=globalThis,$e=J.trustedTypes,Xe=$e?$e.emptyScript:"",Qe=J.reactiveElementPolyfillSupport,H=(o,e)=>o,ie={toAttribute(o,e){switch(e){case Boolean:o=o?Xe:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},we=(o,e)=>!Ke(o,e),ye={attribute:!0,type:String,converter:ie,reflect:!1,useDefault:!1,hasChanged:we};Symbol.metadata??=Symbol("metadata"),J.litPropertyMetadata??=new WeakMap;var x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ye){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),a=this.getPropertyDescriptor(e,i,t);a!==void 0&&Je(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){let{get:a,set:s}=qe(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get:a,set(r){let c=a?.call(this);s?.call(this,r),this.requestUpdate(e,c,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ye}static _$Ei(){if(this.hasOwnProperty(H("elementProperties")))return;let e=Ye(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(H("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(H("properties"))){let t=this.properties,i=[...Fe(t),...Ze(t)];for(let a of i)this.createProperty(a,t[a])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,a]of t)this.elementProperties.set(i,a)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let a=this._$Eu(t,i);a!==void 0&&this._$Eh.set(a,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let a of i)t.unshift(te(a))}else e!==void 0&&t.push(te(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return xe(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,i);if(a!==void 0&&i.reflect===!0){let s=(i.converter?.toAttribute!==void 0?i.converter:ie).toAttribute(t,i.type);this._$Em=e,s==null?this.removeAttribute(a):this.setAttribute(a,s),this._$Em=null}}_$AK(e,t){let i=this.constructor,a=i._$Eh.get(e);if(a!==void 0&&this._$Em!==a){let s=i.getPropertyOptions(a),r=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:ie;this._$Em=a;let c=r.fromAttribute(t,s.type);this[a]=c??this._$Ej?.get(a)??c,this._$Em=null}}requestUpdate(e,t,i,a=!1,s){if(e!==void 0){let r=this.constructor;if(a===!1&&(s=this[e]),i??=r.getPropertyOptions(e),!((i.hasChanged??we)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:a,wrapped:s},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),s!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),a===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[a,s]of this._$Ep)this[a]=s;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[a,s]of i){let{wrapped:r}=s,c=this[a];r!==!0||this._$AL.has(a)||c===void 0||this.C(a,void 0,s,c)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[H("elementProperties")]=new Map,x[H("finalized")]=new Map,Qe?.({ReactiveElement:x}),(J.reactiveElementVersions??=[]).push("2.1.2");var ce=globalThis,ke=o=>o,q=ce.trustedTypes,Se=q?q.createPolicy("lit-html",{createHTML:o=>o}):void 0,ze="$lit$",y=`lit$${Math.random().toFixed(9).slice(2)}$`,He="?"+y,et=`<${He}>`,A=document,j=()=>A.createComment(""),N=o=>o===null||typeof o!="object"&&typeof o!="function",de=Array.isArray,tt=o=>de(o)||typeof o?.[Symbol.iterator]=="function",ae=`[ 	
\f\r]`,P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ae=/-->/g,Ee=/>/g,k=RegExp(`>|${ae}(?:([^\\s"'>=/]+)(${ae}*=${ae}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ce=/'/g,Te=/"/g,Pe=/^(?:script|style|textarea|title)$/i,he=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),n=he(1),xt=he(2),$t=he(3),E=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),Oe=new WeakMap,S=A.createTreeWalker(A,129);function je(o,e){if(!de(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return Se!==void 0?Se.createHTML(e):e}var it=(o,e)=>{let t=o.length-1,i=[],a,s=e===2?"<svg>":e===3?"<math>":"",r=P;for(let c=0;c<t;c++){let d=o[c],h,u,p=-1,f=0;for(;f<d.length&&(r.lastIndex=f,u=r.exec(d),u!==null);)f=r.lastIndex,r===P?u[1]==="!--"?r=Ae:u[1]!==void 0?r=Ee:u[2]!==void 0?(Pe.test(u[2])&&(a=RegExp("</"+u[2],"g")),r=k):u[3]!==void 0&&(r=k):r===k?u[0]===">"?(r=a??P,p=-1):u[1]===void 0?p=-2:(p=r.lastIndex-u[2].length,h=u[1],r=u[3]===void 0?k:u[3]==='"'?Te:Ce):r===Te||r===Ce?r=k:r===Ae||r===Ee?r=P:(r=k,a=void 0);let $=r===k&&o[c+1].startsWith("/>")?" ":"";s+=r===P?d+et:p>=0?(i.push(h),d.slice(0,p)+ze+d.slice(p)+y+$):d+y+(p===-2?c:$)}return[je(o,s+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},D=class o{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let s=0,r=0,c=e.length-1,d=this.parts,[h,u]=it(e,t);if(this.el=o.createElement(h,i),S.currentNode=this.el.content,t===2||t===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(a=S.nextNode())!==null&&d.length<c;){if(a.nodeType===1){if(a.hasAttributes())for(let p of a.getAttributeNames())if(p.endsWith(ze)){let f=u[r++],$=a.getAttribute(p).split(y),I=/([.?@])?(.*)/.exec(f);d.push({type:1,index:s,name:I[2],strings:$,ctor:I[1]==="."?oe:I[1]==="?"?re:I[1]==="@"?ne:T}),a.removeAttribute(p)}else p.startsWith(y)&&(d.push({type:6,index:s}),a.removeAttribute(p));if(Pe.test(a.tagName)){let p=a.textContent.split(y),f=p.length-1;if(f>0){a.textContent=q?q.emptyScript:"";for(let $=0;$<f;$++)a.append(p[$],j()),S.nextNode(),d.push({type:2,index:++s});a.append(p[f],j())}}}else if(a.nodeType===8)if(a.data===He)d.push({type:2,index:s});else{let p=-1;for(;(p=a.data.indexOf(y,p+1))!==-1;)d.push({type:7,index:s}),p+=y.length-1}s++}}static createElement(e,t){let i=A.createElement("template");return i.innerHTML=e,i}};function C(o,e,t=o,i){if(e===E)return e;let a=i!==void 0?t._$Co?.[i]:t._$Cl,s=N(e)?void 0:e._$litDirective$;return a?.constructor!==s&&(a?._$AO?.(!1),s===void 0?a=void 0:(a=new s(o),a._$AT(o,t,i)),i!==void 0?(t._$Co??=[])[i]=a:t._$Cl=a),a!==void 0&&(e=C(o,a._$AS(o,e.values),a,i)),e}var se=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,a=(e?.creationScope??A).importNode(t,!0);S.currentNode=a;let s=S.nextNode(),r=0,c=0,d=i[0];for(;d!==void 0;){if(r===d.index){let h;d.type===2?h=new R(s,s.nextSibling,this,e):d.type===1?h=new d.ctor(s,d.name,d.strings,this,e):d.type===6&&(h=new le(s,this,e)),this._$AV.push(h),d=i[++c]}r!==d?.index&&(s=S.nextNode(),r++)}return S.currentNode=A,a}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},R=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,a){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=C(this,e,t),N(e)?e===l||e==null||e===""?(this._$AH!==l&&this._$AR(),this._$AH=l):e!==this._$AH&&e!==E&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):tt(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==l&&N(this._$AH)?this._$AA.nextSibling.data=e:this.T(A.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,a=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=D.createElement(je(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(t);else{let s=new se(a,this),r=s.u(this.options);s.p(t),this.T(r),this._$AH=s}}_$AC(e){let t=Oe.get(e.strings);return t===void 0&&Oe.set(e.strings,t=new D(e)),t}k(e){de(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,a=0;for(let s of e)a===t.length?t.push(i=new o(this.O(j()),this.O(j()),this,this.options)):i=t[a],i._$AI(s),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let i=ke(e).nextSibling;ke(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},T=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,a,s){this.type=1,this._$AH=l,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=l}_$AI(e,t=this,i,a){let s=this.strings,r=!1;if(s===void 0)e=C(this,e,t,0),r=!N(e)||e!==this._$AH&&e!==E,r&&(this._$AH=e);else{let c=e,d,h;for(e=s[0],d=0;d<s.length-1;d++)h=C(this,c[i+d],t,d),h===E&&(h=this._$AH[d]),r||=!N(h)||h!==this._$AH[d],h===l?e=l:e!==l&&(e+=(h??"")+s[d+1]),this._$AH[d]=h}r&&!a&&this.j(e)}j(e){e===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},oe=class extends T{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===l?void 0:e}},re=class extends T{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==l)}},ne=class extends T{constructor(e,t,i,a,s){super(e,t,i,a,s),this.type=5}_$AI(e,t=this){if((e=C(this,e,t,0)??l)===E)return;let i=this._$AH,a=e===l&&i!==l||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==l&&(i===l||a);a&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},le=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){C(this,e)}};var at=ce.litHtmlPolyfillSupport;at?.(D,R),(ce.litHtmlVersions??=[]).push("3.3.3");var Ne=(o,e,t)=>{let i=t?.renderBefore??e,a=i._$litPart$;if(a===void 0){let s=t?.renderBefore??null;i._$litPart$=a=new R(e.insertBefore(j(),s),s,void 0,t??{})}return a._$AI(o),a};var pe=globalThis,m=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ne(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return E}};m._$litElement$=!0,m.finalized=!0,pe.litElementHydrateSupport?.({LitElement:m});var st=pe.litElementPolyfillSupport;st?.({LitElement:m});(pe.litElementVersions??=[]).push("4.2.2");var U=-1,B=class extends m{constructor(){super(),this.items=[],this.categories=[],this.hidden=[],this._selected=null,this._confirm=null,this._dropTarget=null}_emit(e,t=this.hidden){let i=this.canHide?{categories:e,hidden:t}:{categories:e};this.dispatchEvent(new CustomEvent("change",{detail:i}))}_clone(){return this.categories.map(e=>({name:e.name,panels:[...e.panels]}))}_move(e,t,i=null){let a=this._clone();for(let s of a)s.panels=s.panels.filter(r=>r!==e);if(t!==U){let s=a[t].panels,r=i===null?-1:s.indexOf(i);s.splice(r===-1?s.length:r,0,e)}this._emit(a)}_shift(e,t,i){let a=this._clone(),s=a[t].panels,r=s.indexOf(e),c=r+i;r===-1||c<0||c>=s.length||([s[r],s[c]]=[s[c],s[r]],this._emit(a))}_toggleHidden(e){let t=this.hidden.includes(e)?this.hidden.filter(i=>i!==e):[...this.hidden,e];this._emit(this.categories,t)}_addGroup(){let e=new Set(this.categories.map(i=>i.name.toLowerCase())),t=this.t("new_group");for(let i=2;e.has(t.toLowerCase());i+=1)t=`${this.t("new_group")} ${i}`;this._emit([...this._clone(),{name:t,panels:[]}])}_rename(e,t){let i=this._clone();i[e].name=t.trim()||i[e].name,this._emit(i)}_swapGroups(e,t){let i=this._clone(),a=e+t;a<0||a>=i.length||([i[e],i[a]]=[i[a],i[e]],this._emit(i))}_removeGroup(e){this._confirm=null,this._emit(this._clone().filter((t,i)=>i!==e))}_item(e){return this.items.find(t=>t.path===e)??{path:e,title:e,icon:"mdi:help",missing:!0}}render(){let e=new Set(this.categories.flatMap(i=>i.panels)),t=this.items.filter(i=>!e.has(i.path));return n`
      ${this._zone(U,t,n`
        <div class="title">
          <strong>${this.t("ungrouped")}</strong>
          <span class="hint">${this.t("ungrouped_hint")}</span>
        </div>
      `)}
      ${this.categories.map((i,a)=>this._zone(a,i.panels.map(s=>this._item(s)),this._groupHeader(i,a)))}
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
          @change=${i=>this._rename(t,i.target.value)}
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
    `}_zone(e,t,i){let a=this._selected,s=a&&a.group!==e;return n`
      <section
        class="zone ${this._dropTarget===e?"over":""}"
        @dragover=${r=>this._dragOver(r,e)}
        @dragleave=${()=>this._dropTarget=null}
        @drop=${r=>this._drop(r,e,null)}
      >
        ${i}
        <div class="chips">
          ${t.map(r=>this._chip(r,e))}
          ${!t.length&&e!==U?n`<span class="hint">${this.t("empty_group")}</span>`:l}
        </div>
        ${s?n`<button class="here" @click=${()=>this._moveSelected(e)}>
              <ha-icon icon="mdi:arrow-down-bold"></ha-icon>${this.t("move_here")}
            </button>`:l}
      </section>
    `}_chip(e,t){let i=this.hidden.includes(e.path),a=this._selected?.path===e.path,s=t===U?[]:this.categories[t].panels,r=s.indexOf(e.path);return n`
      <div
        class="chip ${i?"hidden":""} ${a?"selected":""}"
        draggable=${this.disabled?"false":"true"}
        @dragstart=${c=>{c.dataTransfer.setData("text/plain",e.path),c.dataTransfer.effectAllowed="move"}}
        @dragend=${()=>this._dropTarget=null}
        @drop=${c=>{c.stopPropagation(),this._drop(c,t,e.path)}}
      >
        <button
          class="label"
          ?disabled=${this.disabled}
          aria-pressed=${a?"true":"false"}
          @click=${()=>this._selected=a?null:{path:e.path,group:t}}
        >
          <ha-icon .icon=${e.icon}></ha-icon>
          <span>${e.title}</span>
          ${e.missing?n`<em>${this.t("missing")}</em>`:l}
        </button>
        ${a&&t!==U?n`
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
                ?disabled=${r===s.length-1}
                @click=${()=>this._shift(e.path,t,1)}
              >
                <ha-icon icon="mdi:chevron-right"></ha-icon>
              </button>
            `:l}
        ${this.canHide?n`<button
              class="icon"
              title=${i?this.t("show"):this.t("hide")}
              ?disabled=${this.disabled}
              @click=${()=>this._toggleHidden(e.path)}
            >
              <ha-icon icon=${i?"mdi:eye-off-outline":"mdi:eye-outline"}></ha-icon>
            </button>`:l}
      </div>
    `}_dragOver(e,t){this.disabled||(e.preventDefault(),e.dataTransfer.dropEffect="move",this._dropTarget=t)}_drop(e,t,i){if(this.disabled)return;e.preventDefault(),this._dropTarget=null;let a=e.dataTransfer.getData("text/plain");a&&a!==i&&this._move(a,t,i)}_moveSelected(e){let{path:t}=this._selected;this._selected={path:t,group:e},this._move(t,e)}};g(B,"properties",{items:{attribute:!1},categories:{attribute:!1},hidden:{attribute:!1},disabled:{type:Boolean},canHide:{type:Boolean},t:{attribute:!1},_selected:{state:!0},_confirm:{state:!0},_dropTarget:{state:!0}}),g(B,"styles",_`
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
  `);customElements.get("ss-groups-editor")||customElements.define("ss-groups-editor",B);var De={phone:{width:430,height:640},tablet:{width:768,height:600},desktop:{width:760,height:560}},M=class extends m{constructor(){super(),this.settingsLabel="Settings",this.items=[],this.device="desktop",this.page="light",this.expanded=!0,this._scale=1}connectedCallback(){super.connectedCallback(),this._resize=new ResizeObserver(()=>this._fit()),this._resize.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this._resize?.disconnect()}updated(e){e.has("device")&&this._fit()}_fit(){let{width:e}=De[this.device];this._scale=Math.min(1,this.clientWidth/e)||1}render(){let e=this.settings;if(!e)return l;let{width:t,height:i}=De[this.device];return n`
      <div class="viewport" style="height:${i*this._scale}px">
        <div
          class="screen ${this.page}"
          style="width:${t}px;height:${i}px;transform:scale(${this._scale})"
        >
          ${this.device==="desktop"?this._desktop(e):this._modal(e)}
        </div>
      </div>
    `}_desktop(e){let t=e.floating?e.inset:0,i=(this.expanded?256:56)+t*2;return n`
      <div class="desktop">
        <div class="shell" style="width:${i}px;padding:${t}px;${this._shell(e)}">
          ${this._sidebar(e,{radius:e.floating?e.radius:0,floating:e.floating})}
        </div>
        ${this._page()}
      </div>
    `}_modal(e){let t=this.device==="phone",i=t&&e.floating?e.inset:0,a=t?Math.min(430*.9,e.mobile_width):256;return n`
      ${this._page()}
      <div class="backdrop ${t&&e.mobile_blur?"blurred":""}"></div>
      <div class="drawer ${t?"":"plain"}" style="width:${a}px;padding:${i}px">
        ${this._sidebar(e,{radius:t&&e.floating?e.radius:0,floating:t&&e.floating,opacity:t?Math.min(e.opacity+12,100):e.opacity,phone:t,expanded:!0})}
      </div>
    `}_shell(e){return e.shell==="custom"?`background:${e.shell_color}`:e.shell==="theme"?"background:var(--primary-background-color)":"background:transparent"}_sidebar(e,{radius:t,floating:i,opacity:a=e.opacity,phone:s=!1,expanded:r=this.expanded}){let c=Math.min(Math.max((e.floating?e.radius:0)-6,8),14),d=[`border-radius:${t}px`,`--ss-opacity:${a}%`,`--ss-blur:${e.blur}px`,`--ss-item-radius:${c}px`,`--ss-phone-text:${e.mobile_text_size??14}px`,e.accent?`--sidebar-selected-icon-color:${e.accent};--sidebar-selected-text-color:${e.accent}`:""].join(";"),h=this._rows(e),u=h.find(p=>p.item)?.item.path;return n`
      <nav
        class="sidebar ${i?"floating":""} ${s?"phone":""} ${r?"expanded":""} ${e.highlight}"
        style=${d}
      >
        <div class="menu">
          <ha-icon icon="mdi:menu"></ha-icon>
          ${r?n`<span>Home Assistant</span>`:l}
        </div>
        <div class="list">
          ${h.map(p=>p.heading!==void 0?n`<div class="heading">${r?p.heading:""}</div>`:n`
                  <div
                    class="item ${p.item.path===u?"selected":""} ${e.hover_motion?"motion":""}"
                  >
                    <ha-icon .icon=${p.item.icon}></ha-icon>
                    ${r?n`<span>${p.item.title}</span>`:l}
                  </div>
                `)}
        </div>
        <div class="spacer"></div>
        <div class="item">
          <ha-icon icon="mdi:cog"></ha-icon>
          ${r?n`<span>${this.settingsLabel}</span>`:l}
        </div>
      </nav>
    `}_rows(e){let t=new Set(e.hidden??[]),i=new Set(e.categories.flatMap(c=>c.panels)),a=new Map(this.items.map(c=>[c.path,c])),s=this.items.filter(c=>!i.has(c.path)&&!t.has(c.path)).map(c=>({item:c})),r=new Set;for(let c of e.categories){let d=c.panels.filter(h=>!r.has(h)&&!t.has(h)&&a.has(h)).map(h=>a.get(h));d.forEach(h=>r.add(h.path)),d.length&&(s.push({heading:c.name}),s.push(...d.map(h=>({item:h}))))}return s}_page(){return n`
      <div class="page">
        <div class="toolbar"></div>
        <div class="cards">
          ${[0,1,2,3,4,5].map(()=>n`<div class="card"></div>`)}
        </div>
      </div>
    `}};g(M,"properties",{settings:{attribute:!1},items:{attribute:!1},device:{},page:{},expanded:{type:Boolean},settingsLabel:{},_scale:{state:!0}}),g(M,"styles",_`
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
  `);customElements.get("ss-sidebar-preview")||customElements.define("ss-sidebar-preview",M);var ot={title:"Stijl",tab_sidebar:"Zijbalk",tab_themes:"Thema's",tab_rooms:"Kamers en pop-ups",tab_climate:"Klimaat",tab_people:"Per persoon",tab_check:"Controle en herstel",coming:"Dit onderdeel komt in een volgende versie.",glass_intro:"De zijbalk wordt opgemaakt door de uitbreiding Glass Sidebar. Hier stel je die in; wijzigingen gelden voor iedereen en verschijnen direct. De kleuren van de zijbalk stel je in bij Thema's.",glass_missing_title:"Uitbreiding: Glass Sidebar",glass_missing:"Met de uitbreiding Glass Sidebar wordt je zijbalk een zwevend glazen paneel, met groepen en kopjes. Installeer hem via HACS en herstart Home Assistant; daarna stel je hem hier in. De kleuren van de zijbalk stel je ook zonder uitbreiding in bij Thema's.",glass_not_added_title:"Glass Sidebar is ge\xEFnstalleerd",glass_not_added:"Voeg hem nog toe: Instellingen \u203A Apparaten en diensten \u203A Integratie toevoegen \u203A Glass Sidebar. Daarna stel je hem hier in.",glass_not_loaded:"Glass Sidebar is uitgeschakeld of niet geladen. Je kunt instellingen opslaan, maar je ziet ze pas als Glass Sidebar weer draait.",glass_old:"Je hebt Glass Sidebar {version}. Style Studio is gemaakt voor {min} of nieuwer; werk Glass Sidebar bij via HACS. Opties die jouw versie nog niet kent, doen niets.",open_glass:"Instellingen van Glass Sidebar openen",shape:"Vorm",floating:"Zwevend",floating_hint:"Een losse balk met ruimte eromheen.",inset:"Afstand tot de rand",radius:"Hoeken",glass:"Glas",blur:"Vervaging",opacity:"Dekking",opacity_hint:"Lager is meer doorzichtig.",glass_cards:"Glazen dashboardkaarten",glass_cards_hint:"Kaarten worden doorschijnend. Kan zwaar zijn op oudere tablets.",active:"Actieve pagina",highlight_soft:"Zacht",highlight_vivid:"Vol",own_accent:"Eigen kleur",own_accent_hint:"Uit: de kleur van het thema.",motion:"Iconen bewegen bij aanwijzen",phone:"Telefoon",phone_hint:"Voor schermen tot 600 pixels breed.",mobile_width:"Breedte van het menu",mobile_text_size:"Tekstgrootte",mobile_blur:"Pagina achter het menu vervagen",groups:"Groepen",groups_hint:"Sleep items naar een groep, of tik een item aan en kies Hierheen. Items zonder groep staan bovenaan.",ungrouped:"Zonder groep",ungrouped_hint:"Staan bovenaan, in de volgorde van Home Assistant.",add_group:"Groep toevoegen",new_group:"Nieuwe groep",group_name:"Naam van de groep",move_here:"Hierheen",move_up:"Omhoog",move_down:"Omlaag",move_left:"Naar voren",move_right:"Naar achteren",remove_group:"Groep verwijderen",remove_group_confirm:"Verwijderen? De items gaan terug naar Zonder groep.",hide:"Verbergen",show:"Tonen",missing:"niet gevonden",empty_group:"Sleep items hierheen.",preview:"Voorbeeld",preview_hint:"Wordt pas echt toegepast als je opslaat.",device_phone:"Telefoon",device_tablet:"Tablet",device_desktop:"Pc",page_light:"Lichte pagina",page_dark:"Donkere pagina",expanded:"Uitgeklapt",unsaved:"Niet opgeslagen wijzigingen",cancel:"Annuleren",save:"Opslaan",saved:"Opgeslagen",undo:"Vorige versie terugzetten",undo_confirm:"De instellingen van voor de laatste keer opslaan komen terug. Doorgaan?",undone:"Vorige versie teruggezet",nothing_to_undo:"Er is geen vorige versie",yes:"Ja",no:"Nee",discard_confirm:"Je hebt wijzigingen die niet zijn opgeslagen. Weggooien?",error:"Er ging iets mis: {message}",themes_intro:"Bepaal elke kleur in Home Assistant: menu, bovenbalk, kaarten, pop-ups, vensters, schakelaars en meer. Begin met een paar basiskleuren; de rest rekent Style Studio uit. Onder Alles aanpassen kun je elke kleur apart zetten.",your_themes:"Je thema's",new_theme:"Nieuw thema",start_from:"Begin met",copy_existing:"Of kopieer een bestaand thema",pick_theme:"Kies een thema",copy_suffix:"kopie",theme_name:"Naam",badge_default:"standaard",badge_not_loaded:"niet geladen",quick:"Snel",quick_hint:"Hieruit worden alle andere kleuren berekend.",c_background:"Achtergrond",c_card:"Kaarten",c_text:"Tekst",c_accent:"Accent (actief, knoppen, schakelaars)",c_sidebar:"Zijbalk",c_header:"Bovenbalk",header_same:"Bovenbalk zelfde kleur als de achtergrond",corners:"Hoeken van kaarten",shadow:"Schaduw",shadow_none:"Geen",shadow_soft:"Zacht",shadow_strong:"Sterk",card_opacity:"Dekking van kaarten",card_opacity_hint:"Lager laat de achtergrond door de kaarten heen zien.",popups:"Pop-ups",popup_solid:"Ondoorzichtig",popup_glass:"Glas",popup_opacity:"Dekking van pop-ups",all_vars:"Alles aanpassen",all_vars_hint:"Leeg veld: de berekende kleur (grijs). Je mag elke CSS-waarde gebruiken, ook rgba() of een verloop. Een paar plekken in de instellingen van Home Assistant hebben vaste kleuren en volgen geen thema.",reset:"Terug naar berekend",custom_vars:"Eigen variabelen",custom_vars_hint:"Voor variabelen die hierboven niet staan, bijvoorbeeld van een andere kaart.",var_name:"Naam, zonder --",var_value:"Waarde",add_var:"Toevoegen",remove:"Verwijderen",whole_screen:"Ook tonen op dit hele scherm",whole_screen_hint:"Alleen in deze browser, tot je opslaat of annuleert.",show_popup:"Pop-up tonen",delete_theme:"Thema verwijderen",delete_confirm:"Thema {name} verwijderen? Je kunt het daarna nog terugzetten.",deleted:"Verwijderd",set_default:"Standaard voor iedereen",set_default_hint:"Voor iedereen die in het profiel geen eigen thema koos.",default_set:"{name} is nu het standaardthema",is_default:"Dit is het standaardthema",saved_theme:"Opgeslagen in {file}",warn_not_loaded:"Home Assistant heeft dit thema niet geladen. Zet in configuration.yaml: frontend: themes: !include_dir_merge_named themes, en herstart Home Assistant.",err_file_exists:"themes/style_studio.yaml bestaat al en is niet door Style Studio gemaakt. Hernoem of verwijder dat bestand eerst.",err_name_taken:"Er is al een thema met deze naam.",pv_title:"Thuis",pv_tab2:"Kamers",pv_living:"Woonkamer",pv_lights:"3 lampen aan",pv_kitchen:"Keuken",pv_off:"Uit",pv_climate:"Airco",pv_weather:"Zonnig, 21\xB0",pv_switch:"Ventilator",pv_popup:"Woonkamer",warn_old_panel:"Dit scherm gebruikt een oude versie van het paneel ({old}, server {new}). Herlaad de pagina. In de Companion-app: Instellingen \u203A Companion-app \u203A Probleemoplossing \u203A Frontend-cache wissen."},Re={title:"Style",tab_sidebar:"Sidebar",tab_themes:"Themes",tab_rooms:"Rooms and pop-ups",tab_climate:"Climate",tab_people:"People",tab_check:"Check and restore",coming:"This part comes in a later version.",glass_intro:"The sidebar is styled by the Glass Sidebar add-on. You set it up here; changes apply to everyone and show right away. Sidebar colors are set under Themes.",glass_missing_title:"Add-on: Glass Sidebar",glass_missing:"The Glass Sidebar add-on turns your sidebar into a floating glass panel, with groups and headings. Install it through HACS and restart Home Assistant; then set it up here. Sidebar colors can be set under Themes without the add-on.",glass_not_added_title:"Glass Sidebar is installed",glass_not_added:"Add it too: Settings \u203A Devices & services \u203A Add integration \u203A Glass Sidebar. Then set it up here.",glass_not_loaded:"Glass Sidebar is disabled or not loaded. You can save settings, but you'll only see them once Glass Sidebar runs again.",glass_old:"You have Glass Sidebar {version}. Style Studio is made for {min} or newer; update Glass Sidebar through HACS. Options your version doesn't know do nothing.",open_glass:"Open Glass Sidebar settings",shape:"Shape",floating:"Floating",floating_hint:"A separate panel with space around it.",inset:"Distance to the edge",radius:"Corners",glass:"Glass",blur:"Blur",opacity:"Opacity",opacity_hint:"Lower is more see-through.",glass_cards:"Glass dashboard cards",glass_cards_hint:"Cards become translucent. Can be heavy on older tablets.",active:"Active page",highlight_soft:"Soft",highlight_vivid:"Solid",own_accent:"Own color",own_accent_hint:"Off: the theme's color.",motion:"Icons move on hover",phone:"Phone",phone_hint:"For screens up to 600 pixels wide.",mobile_width:"Menu width",mobile_text_size:"Text size",mobile_blur:"Blur the page behind the menu",groups:"Groups",groups_hint:"Drag items into a group, or tap an item and choose Move here. Items without a group stay at the top.",ungrouped:"No group",ungrouped_hint:"Shown at the top, in Home Assistant's order.",add_group:"Add group",new_group:"New group",group_name:"Group name",move_here:"Move here",move_up:"Up",move_down:"Down",move_left:"Earlier",move_right:"Later",remove_group:"Remove group",remove_group_confirm:"Remove? Its items go back to No group.",hide:"Hide",show:"Show",missing:"not found",empty_group:"Drag items here.",preview:"Preview",preview_hint:"Only applied once you save.",device_phone:"Phone",device_tablet:"Tablet",device_desktop:"Desktop",page_light:"Light page",page_dark:"Dark page",expanded:"Expanded",unsaved:"Unsaved changes",cancel:"Cancel",save:"Save",saved:"Saved",undo:"Restore previous version",undo_confirm:"The settings from before the last save come back. Continue?",undone:"Previous version restored",nothing_to_undo:"There is no previous version",yes:"Yes",no:"No",discard_confirm:"You have unsaved changes. Throw them away?",error:"Something went wrong: {message}",themes_intro:"Set every color in Home Assistant: menu, top bar, cards, pop-ups, dialogs, switches and more. Start with a few base colors; Style Studio works out the rest. Under Change everything you can set each color on its own.",your_themes:"Your themes",new_theme:"New theme",start_from:"Start with",copy_existing:"Or copy an existing theme",pick_theme:"Pick a theme",copy_suffix:"copy",theme_name:"Name",badge_default:"default",badge_not_loaded:"not loaded",quick:"Quick",quick_hint:"All other colors are worked out from these.",c_background:"Background",c_card:"Cards",c_text:"Text",c_accent:"Accent (active, buttons, switches)",c_sidebar:"Sidebar",c_header:"Top bar",header_same:"Top bar in the background color",corners:"Card corners",shadow:"Shadow",shadow_none:"None",shadow_soft:"Soft",shadow_strong:"Strong",card_opacity:"Card opacity",card_opacity_hint:"Lower lets the background show through cards.",popups:"Pop-ups",popup_solid:"Solid",popup_glass:"Glass",popup_opacity:"Pop-up opacity",all_vars:"Change everything",all_vars_hint:"Empty field: the worked-out color (grey). Any CSS value works, also rgba() or a gradient. A few places in Home Assistant's settings have fixed colors and don't follow any theme.",reset:"Back to worked-out",custom_vars:"Own variables",custom_vars_hint:"For variables not listed above, for example from another card.",var_name:"Name, without --",var_value:"Value",add_var:"Add",remove:"Remove",whole_screen:"Also show on this whole screen",whole_screen_hint:"Only in this browser, until you save or cancel.",show_popup:"Show pop-up",delete_theme:"Delete theme",delete_confirm:"Delete theme {name}? You can still restore it afterwards.",deleted:"Deleted",set_default:"Default for everyone",set_default_hint:"For everyone who didn't pick a theme in their profile.",default_set:"{name} is now the default theme",is_default:"This is the default theme",saved_theme:"Saved in {file}",warn_not_loaded:"Home Assistant didn't load this theme. Add to configuration.yaml: frontend: themes: !include_dir_merge_named themes, and restart Home Assistant.",err_file_exists:"themes/style_studio.yaml already exists and wasn't made by Style Studio. Rename or remove that file first.",err_name_taken:"There is already a theme with this name.",pv_title:"Home",pv_tab2:"Rooms",pv_living:"Living room",pv_lights:"3 lights on",pv_kitchen:"Kitchen",pv_off:"Off",pv_climate:"Air conditioning",pv_weather:"Sunny, 21\xB0",pv_switch:"Fan",pv_popup:"Living room",warn_old_panel:"This screen runs an old version of the panel ({old}, server {new}). Reload the page. In the Companion app: Settings \u203A Companion app \u203A Troubleshooting \u203A Reset frontend cache."};function F(o){let e=(o?.locale?.language||o?.language||"nl").startsWith("nl")?ot:Re;return(t,i={})=>(e[t]??Re[t]??t).replace(/\{(\w+)\}/g,(a,s)=>i[s]??"")}var v=class extends m{constructor(){super(),this._busy=!1,this._confirm=null}get t(){return F(this.hass)}get dirty(){return!1}_ask(e,t){this._confirm={text:e,action:t}}_showToast(e){this._toast=e,clearTimeout(this._toastTimer),this._toastTimer=setTimeout(()=>this._toast=null,4e3)}_error(e){this._showToast(this.t("error",{message:e?.message??e}))}async _run(e,t){this._busy=!0;try{await e(),t&&this._showToast(t)}catch(i){this._error(i)}finally{this._busy=!1}}_set(){}_warning(e){return n`<div class="warning"><ha-icon icon="mdi:alert-outline"></ha-icon>${e}</div>`}_switch(e,t,i,a){return n`
      <label class="row">
        <span>
          ${i}
          ${a?n`<small>${a}</small>`:l}
        </span>
        <input
          type="checkbox"
          class="switch"
          .checked=${e[t]}
          @change=${s=>this._set(t,s.target.checked)}
        />
      </label>
    `}_slider(e,t,i,a,s,r,c=!1,d){return n`
      <label class="row slider ${c?"off":""}">
        <span>
          ${i}
          ${d?n`<small>${d}</small>`:l}
        </span>
        <span class="inline">
          <input
            type="range"
            min=${a}
            max=${s}
            step="1"
            .value=${String(e[t])}
            ?disabled=${c}
            @input=${h=>this._set(t,Number(h.target.value))}
          />
          <output>${e[t]}${r}</output>
        </span>
      </label>
    `}_segment(e,t,i){return n`
      <div class="segment" role="radiogroup">
        ${i.map(([a,s])=>n`<button
            role="radio"
            aria-checked=${e[t]===a?"true":"false"}
            class=${e[t]===a?"active":""}
            @click=${()=>this._set(t,a)}
          >
            ${s}
          </button>`)}
      </div>
    `}_color(e,t,i,a){return n`
      <label class="row">
        <span>
          ${i}
          ${a?n`<small>${a}</small>`:l}
        </span>
        <input type="color" .value=${e[t]} @input=${s=>this._set(t,s.target.value)} />
      </label>
    `}_bar({left:e=l,onCancel:t,onSave:i}){if(this._confirm){let{text:a,action:s}=this._confirm;return n`
        <footer class="bar">
          <span class="grow">${a}</span>
          <button @click=${()=>this._confirm=null}>${this.t("no")}</button>
          <button
            class="primary"
            @click=${()=>{this._confirm=null,s()}}
          >
            ${this.t("yes")}
          </button>
        </footer>
      `}return e===l&&!this._toast&&!this.dirty?l:n`
      <footer class="bar">
        ${e}
        <span class="grow">${this._toast??(this.dirty?this.t("unsaved"):"")}</span>
        ${this.dirty?n`
              <button ?disabled=${this._busy} @click=${t}>${this.t("cancel")}</button>
              <button class="primary" ?disabled=${this._busy} @click=${i}>
                ${this.t("save")}
              </button>
            `:l}
      </footer>
    `}};g(v,"properties",{hass:{attribute:!1},narrow:{type:Boolean},_busy:{state:!0},_toast:{state:!0},_confirm:{state:!0}}),g(v,"styles",_`
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
  `);var rt=new Set(["config","profile","notfound"]),Ue=o=>o==null?o:JSON.parse(JSON.stringify(o)),nt=(o,e)=>JSON.stringify(o)===JSON.stringify(e);function lt(o,e){let t=s=>String(s).split(".").map(r=>parseInt(r,10)||0),[i,a]=[t(o),t(e)];for(let s=0;s<Math.max(i.length,a.length);s+=1)if((i[s]??0)!==(a[s]??0))return(i[s]??0)<(a[s]??0);return!1}var Z=class extends v{constructor(){super(),this._draft=null,this._device=window.innerWidth<=600?"phone":window.innerWidth<=870?"tablet":"desktop",this._page="light",this._expanded=!0,this._haSidebar={}}connectedCallback(){super.connectedCallback(),this.hass.callWS({type:"frontend/get_user_data",key:"sidebar"}).then(e=>this._haSidebar=e?.value??{}).catch(()=>{})}willUpdate(e){e.has("glass")&&(this._draft=Ue(this.glass?.sidebar??null))}get dirty(){return this._draft!==null&&!nt(this._draft,this.glass?.sidebar??null)}_set(e,t){this._edit({[e]:t})}_edit(e){this._draft={...this._draft,...e},this._toast=null}_reload(){this.dispatchEvent(new CustomEvent("reload"))}_save(){this._run(async()=>{await this.hass.callWS({type:"style_studio/sidebar/save",sidebar:this._draft}),this._reload()},this.t("saved"))}_undo(){this._ask(this.t("undo_confirm"),()=>this._run(async()=>{let{restored:e}=await this.hass.callWS({type:"style_studio/sidebar/undo"});if(!e)throw new Error(this.t("nothing_to_undo"));this._reload()},this.t("undone")))}_items(){let e=this._haSidebar.panelOrder??[],t=new Set(this._haSidebar.hiddenPanels??[]),i=a=>{let s=e.indexOf(a);return s===-1?e.length:s};return Object.values(this.hass.panels??{}).filter(a=>(a.title||a.url_path==="lovelace")&&!rt.has(a.url_path)&&!t.has(a.url_path)).map(a=>({path:a.url_path,icon:a.icon||"mdi:view-dashboard",title:this._panelTitle(a)})).sort((a,s)=>i(a.path)-i(s.path)||(s.path==="lovelace")-(a.path==="lovelace")||a.title.localeCompare(s.title))}_panelTitle(e){return e.title?this.hass.localize(`panel.${e.title}`)||e.title:this.hass.localize("panel.states")||"Overview"}render(){let e=this.glass;if(!e)return l;if(!e.version&&!e.added)return n`<div class="card">
        <h2>${this.t("glass_missing_title")}</h2>
        <p class="hint">${this.t("glass_missing")}</p>
      </div>`;if(!e.added||!this._draft)return n`<div class="card">
        <h2>${this.t("glass_not_added_title")}</h2>
        <p class="hint">${this.t("glass_not_added")}</p>
      </div>`;let t=this._draft;return n`
      <p class="intro">${this.t("glass_intro")}</p>
      ${e.version&&lt(e.version,e.min_version)?this._warning(this.t("glass_old",{version:e.version,min:e.min_version})):l}
      ${e.loaded?l:this._warning(this.t("glass_not_loaded"))}
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
                      @input=${i=>this._set("accent",i.target.value)}
                    />`:l}
                <input
                  type="checkbox"
                  class="switch"
                  .checked=${!!t.accent}
                  @change=${i=>this._set("accent",i.target.checked?"#f59e0b":null)}
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
              @change=${i=>this._edit(i.detail)}
            ></ss-groups-editor>
          </div>
        </div>

        <aside class="card preview">
          <h2>${this.t("preview")}</h2>
          <p class="hint">${this.t("preview_hint")}</p>
          <div class="segment small">
            ${["phone","tablet","desktop"].map(i=>n`<button
                class=${i===this._device?"active":""}
                @click=${()=>this._device=i}
              >
                ${this.t(`device_${i}`)}
                <small>${{phone:430,tablet:768,desktop:1920}[i]}</small>
              </button>`)}
          </div>
          <div class="segment small">
            ${["light","dark"].map(i=>n`<button
                class=${i===this._page?"active":""}
                @click=${()=>this._page=i}
              >
                ${this.t(`page_${i}`)}
              </button>`)}
            ${this._device==="desktop"?n`<button
                  class=${this._expanded?"active":""}
                  @click=${()=>this._expanded=!this._expanded}
                >
                  ${this.t("expanded")}
                </button>`:l}
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
            </button>`:l,onCancel:()=>this._draft=Ue(this.glass.sidebar),onSave:()=>this._save()})}
    `}};g(Z,"properties",{...v.properties,glass:{attribute:!1},_draft:{state:!0},_device:{state:!0},_page:{state:!0},_expanded:{state:!0},_haSidebar:{state:!0}});customElements.get("ss-sidebar-tab")||customElements.define("ss-sidebar-tab",Z);var ct=["active","auto","cool","dry","heat","heat_cool","fan_only"],L=class extends m{render(){if(!this.vars)return l;let e=Object.entries(this.vars).map(([i,a])=>`--${i}:${a}`).join(";"),t=this.t;return n`
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
                  ${ct.map(i=>n`<i title=${i} style="background:var(--state-climate-${i}-color)"></i>`)}
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
              `:l}
        </div>
      </div>
    `}};g(L,"properties",{vars:{attribute:!1},t:{attribute:!1},popup:{type:Boolean}}),g(L,"styles",_`
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
  `);customElements.get("ss-theme-preview")||customElements.define("ss-theme-preview",L);var be=[{key:"basis",nl:"Basis",en:"Basics",vars:[["primary-color","Hoofdkleur","Primary color","color"],["accent-color","Accentkleur","Accent color","color"],["light-primary-color","Hoofdkleur licht","Primary color, light","color"],["dark-primary-color","Hoofdkleur donker","Primary color, dark","color"],["text-primary-color","Tekst op de hoofdkleur","Text on primary color","color"],["primary-background-color","Achtergrond","Background","color"],["secondary-background-color","Tweede achtergrond","Secondary background","color"],["divider-color","Scheidingslijnen","Dividers","color"]]},{key:"text",nl:"Tekst",en:"Text",vars:[["primary-text-color","Tekst","Text","color"],["secondary-text-color","Tekst, tweede","Secondary text","color"],["disabled-text-color","Tekst, uitgeschakeld","Disabled text","color"]]},{key:"header",nl:"Bovenbalk",en:"Top bar",vars:[["app-header-background-color","Achtergrond","Background","color"],["app-header-text-color","Tekst en iconen","Text and icons","color"],["app-header-selection-bar-color","Streep onder actieve tab","Active tab bar","color"],["app-header-edit-background-color","Achtergrond bij bewerken","Background while editing","color"],["app-header-edit-text-color","Tekst bij bewerken","Text while editing","color"]]},{key:"sidebar",nl:"Zijbalk (menu)",en:"Sidebar (menu)",vars:[["sidebar-background-color","Achtergrond","Background","color"],["sidebar-text-color","Tekst","Text","color"],["sidebar-icon-color","Iconen","Icons","color"],["sidebar-selected-icon-color","Icoon actieve pagina","Active page icon","color"],["sidebar-selected-text-color","Tekst actieve pagina","Active page text","color"]]},{key:"cards",nl:"Kaarten",en:"Cards",vars:[["card-background-color","Achtergrond","Background","color"],["ha-card-background","Achtergrond (dashboard)","Background (dashboard)","color"],["ha-card-border-color","Rand","Border","color"],["ha-card-border-width","Randdikte","Border width","size"],["ha-card-border-radius","Hoeken","Corners","size"],["ha-card-box-shadow","Schaduw","Shadow","shadow"]]},{key:"popups",nl:"Pop-ups (Bubble Card)",en:"Pop-ups (Bubble Card)",vars:[["bubble-pop-up-background-color","Achtergrond pop-up","Pop-up background","color"],["bubble-pop-up-main-background-color","Achtergrond inhoud","Content background","color"],["bubble-main-background-color","Knoppen, achtergrond","Buttons, background","color"],["bubble-secondary-background-color","Tweede achtergrond","Secondary background","color"],["bubble-button-background-color","Knop","Button","color"],["bubble-icon-background-color","Achter iconen","Behind icons","color"]]},{key:"dialogs",nl:"Vensters (meer info, instellingen)",en:"Dialogs (more info, settings)",vars:[["ha-dialog-surface-background","Achtergrond","Background","color"],["mdc-theme-surface","Achtergrond (oudere vensters)","Background (older dialogs)","color"],["dialog-box-shadow","Schaduw","Shadow","shadow"],["ha-dialog-border-radius","Hoeken","Corners","size"]]},{key:"controls",nl:"Schakelaars en schuiven",en:"Switches and sliders",vars:[["switch-checked-color","Schakelaar aan","Switch on","color"],["switch-checked-button-color","Knopje aan","Knob on","color"],["switch-checked-track-color","Baan aan","Track on","color"],["switch-unchecked-button-color","Knopje uit","Knob off","color"],["switch-unchecked-track-color","Baan uit","Track off","color"],["slider-color","Schuif","Slider","color"],["slider-bar-color","Baan van de schuif","Slider track","color"]]},{key:"inputs",nl:"Invoervelden",en:"Input fields",vars:[["input-fill-color","Achtergrond","Background","color"],["mdc-text-field-fill-color","Achtergrond (oudere velden)","Background (older fields)","color"],["input-ink-color","Tekst","Text","color"],["input-label-ink-color","Label","Label","color"],["code-editor-background-color","Code-editor","Code editor","color"]]},{key:"states",nl:"Status en iconen",en:"States and icons",vars:[["state-icon-color","Icoon (uit)","Icon (off)","color"],["state-active-color","Aan (algemeen)","On (general)","color"],["state-light-active-color","Lamp aan","Light on","color"],["state-switch-active-color","Schakelaar aan","Switch on","color"],["state-fan-active-color","Ventilator aan","Fan on","color"],["state-cover-active-color","Zonwering open","Cover open","color"],["state-inactive-color","Uit (algemeen)","Off (general)","color"],["state-unavailable-color","Niet beschikbaar","Unavailable","color"]]},{key:"climate",nl:"Airco-ring",en:"Climate ring",vars:[["state-climate-active-color","Actief","Active","color"],["state-climate-auto-color","Auto","Auto","color"],["state-climate-cool-color","Koelen","Cool","color"],["state-climate-dry-color","Drogen","Dry","color"],["state-climate-heat-color","Verwarmen","Heat","color"],["state-climate-heat_cool-color","Koelen en verwarmen","Heat and cool","color"],["state-climate-fan_only-color","Alleen ventilator","Fan only","color"]]},{key:"alerts",nl:"Meldingen",en:"Alerts",vars:[["error-color","Fout","Error","color"],["warning-color","Waarschuwing","Warning","color"],["success-color","Gelukt","Success","color"],["info-color","Informatie","Info","color"]]},{key:"weather",nl:"Weerkaart",en:"Weather card",vars:[["weather-card-gradient","Achtergrond (verloop)","Background (gradient)","text"],["weather-card-accent","Accent","Accent","color"]]}],Me=new Set(be.flatMap(o=>o.vars.map(([e])=>e))),w={background:"#f4efe6",card:"#fffaf2",text:"#3b3127",accent:"#f59e0b",sidebar:"#fbf6ec",header:null,radius:16,shadow:"soft",card_opacity:100,popup:"solid",popup_opacity:80},Le={sand:{nl:"Zand en geel",en:"Sand and yellow",base:{...w}},pink:{nl:"Roze",en:"Pink",base:{...w,background:"#fbf1f4",card:"#fffafc",text:"#3d2b33",accent:"#e8749e",sidebar:"#fdf5f8"}},dark:{nl:"Donker",en:"Dark",base:{...w,background:"#111418",card:"#1b1f25",text:"#e6e8eb",accent:"#f5b301",sidebar:"#161a1f",shadow:"none"}},glass:{nl:"Glas",en:"Glass",base:{...w,background:"#dfe7ef",card:"#ffffff",text:"#1f2a37",accent:"#3b82f6",sidebar:"#f3f6fa",radius:20,card_opacity:62,popup:"glass",popup_opacity:72}}},ue={none:"none",soft:"0 1px 2px rgba(0, 0, 0, 0.05), 0 4px 14px rgba(0, 0, 0, 0.06)",strong:"0 2px 4px rgba(0, 0, 0, 0.08), 0 12px 32px rgba(0, 0, 0, 0.14)"};function Y(o){let e=parseInt(o.slice(1),16);return[e>>16&255,e>>8&255,e&255]}function dt([o,e,t]){return`#${[o,e,t].map(i=>Math.round(i).toString(16).padStart(2,"0")).join("")}`}function b(o,e,t){let[i,a]=[Y(o),Y(e)];return dt(i.map((s,r)=>s*t+a[r]*(1-t)))}function Be(o,e){if(e>=100)return o;let[t,i,a]=Y(o);return`rgba(${t}, ${i}, ${a}, ${e/100})`}function Ve(o){let[e,t,i]=Y(o).map(a=>{let s=a/255;return s<=.03928?s/12.92:((s+.055)/1.055)**2.4});return .2126*e+.7152*t+.0722*i}function ge(o){return Ve(o)>.45?"#1f1f1f":"#ffffff"}var ht=o=>Ve(o)<.2;function X(o){let e={...w,...o},t=ht(e.background),i=e.header??e.background,a=Be(e.card,e.card_opacity),s=b(e.text,e.background,.62),r=b(e.text,e.background,t?.16:.12),c=e.popup==="glass"?Be(e.card,e.popup_opacity):e.card,d=(h,u)=>b(h,e.card,u);return{"primary-color":e.accent,"accent-color":e.accent,"light-primary-color":b(e.accent,e.background,.4),"dark-primary-color":b(e.accent,"#000000",.8),"text-primary-color":ge(e.accent),"primary-background-color":e.background,"secondary-background-color":b(e.text,e.background,t?.06:.04),"divider-color":r,"primary-text-color":e.text,"secondary-text-color":s,"disabled-text-color":b(e.text,e.background,.38),"app-header-background-color":i,"app-header-text-color":i===e.background?e.text:ge(i),"app-header-selection-bar-color":e.accent,"app-header-edit-background-color":b(e.text,e.background,.75),"app-header-edit-text-color":ge(b(e.text,e.background,.75)),"sidebar-background-color":e.sidebar,"sidebar-text-color":e.text,"sidebar-icon-color":s,"sidebar-selected-icon-color":e.accent,"sidebar-selected-text-color":t?e.accent:b(e.accent,e.text,.7),"card-background-color":a,"ha-card-background":a,"ha-card-border-color":r,"ha-card-border-width":"1px","ha-card-border-radius":`${e.radius}px`,"ha-card-box-shadow":ue[e.shadow]??ue.soft,"bubble-pop-up-background-color":c,"bubble-pop-up-main-background-color":c,"bubble-main-background-color":b(e.text,e.card,t?.08:.05),"bubble-secondary-background-color":b(e.text,e.card,t?.12:.08),"bubble-button-background-color":d(e.accent,.22),"bubble-icon-background-color":d(e.accent,.18),"ha-dialog-surface-background":e.card,"mdc-theme-surface":e.card,"dialog-box-shadow":ue.strong,"ha-dialog-border-radius":`${Math.max(e.radius+8,12)}px`,"switch-checked-color":e.accent,"switch-checked-button-color":e.accent,"switch-checked-track-color":e.accent,"switch-unchecked-button-color":t?"#9aa0a6":"#fafafa","switch-unchecked-track-color":b(e.text,e.background,.35),"slider-color":e.accent,"slider-bar-color":b(e.accent,e.background,.3),"input-fill-color":b(e.text,e.card,.05),"mdc-text-field-fill-color":b(e.text,e.card,.05),"input-ink-color":e.text,"input-label-ink-color":s,"code-editor-background-color":e.card,"state-icon-color":s,"state-active-color":e.accent,"state-light-active-color":e.accent,"state-switch-active-color":e.accent,"state-fan-active-color":e.accent,"state-cover-active-color":e.accent,"state-inactive-color":b(e.text,e.background,.4),"state-unavailable-color":b(e.text,e.background,.3),"state-climate-active-color":e.accent,"state-climate-auto-color":"#43a047","state-climate-cool-color":"#2196f3","state-climate-dry-color":"#efbd07","state-climate-heat-color":"#ff8100","state-climate-heat_cool-color":"#ffa000","state-climate-fan_only-color":"#00bcd4","error-color":"#db4437","warning-color":"#ffa600","success-color":"#43a047","info-color":"#039be5","weather-card-gradient":`linear-gradient(135deg, ${d(e.accent,.35)}, ${e.card})`,"weather-card-accent":e.accent}}function Q(o){return{...X(o.base),...o.overrides}}function Ge(o){let e=a=>{let s=String(o[a]??"").trim();return/^#[0-9a-f]{6}$/i.test(s)?s.toLowerCase():null},t={...w};t.background=e("primary-background-color")??t.background,t.card=e("card-background-color")??e("ha-card-background")??t.card,t.text=e("primary-text-color")??t.text,t.accent=e("primary-color")??t.accent,t.sidebar=e("sidebar-background-color")??t.background,t.header=e("app-header-background-color");let i={};for(let[a,s]of Object.entries(o))(typeof s=="string"||typeof s=="number")&&(i[a]=String(s));return{base:t,overrides:i}}var me=o=>o==null?o:JSON.parse(JSON.stringify(o)),pt=(o,e)=>JSON.stringify(o)===JSON.stringify(e),ut=/^#[0-9a-f]{6}$/i,O="new",V=class extends v{constructor(){super(),this._selected=null,this._draft=null,this._picking=!1,this._wholeScreen=!1,this._popup=!0,this._newVar={key:"",value:""},this._applied=null}connectedCallback(){super.connectedCallback(),this._load()}disconnectedCallback(){super.disconnectedCallback(),this._applyToScreen(null)}updated(){this._applyToScreen(this._wholeScreen&&this._draft?Q(this._draft):null)}get _lang(){return(this.hass?.locale?.language||this.hass?.language||"nl").startsWith("nl")?"nl":"en"}get _saved(){return this._state?.themes.find(e=>e.id===this._selected)??null}get dirty(){if(!this._draft)return!1;if(this._selected===O)return!0;let e=this._saved;return!e||!pt(this._editable(this._draft),this._editable(e))}_editable(e){return{name:e.name,base:e.base,overrides:e.overrides}}async _load(e){try{this._state=await this.hass.callWS({type:"style_studio/themes/get"}),this._select(e??this._selected??this._state.themes[0]?.id??null)}catch(t){this._error(t)}}_select(e){let t=this._state.themes.find(i=>i.id===e);this._selected=t?e:null,this._draft=t?me(this._editable(t)):null,this._picking=!t}_applyToScreen(e){let t=document.documentElement;if(this._applied){for(let[i,a]of Object.entries(this._applied))a?t.style.setProperty(i,a):t.style.removeProperty(i);this._applied=null}if(e){this._applied={};for(let[i,a]of Object.entries(e))this._applied[`--${i}`]=t.style.getPropertyValue(`--${i}`),t.style.setProperty(`--${i}`,a)}}_uniqueName(e){let t=new Set([...this._state.themes.map(a=>a.name.toLowerCase()),...Object.keys(this._state.others).map(a=>a.toLowerCase())]),i=e;for(let a=2;t.has(i.toLowerCase());a+=1)i=`${e} ${a}`;return i}_startNew(e,t,i={}){this._selected=O,this._picking=!1,this._draft={name:this._uniqueName(e),base:me(t),overrides:me(i)}}_set(e,t){this._draft={...this._draft,base:{...this._draft.base,[e]:t}},this._toast=null}_override(e,t){let i={...this._draft.overrides};t===""||t==null?delete i[e]:i[e]=t,this._draft={...this._draft,overrides:i},this._toast=null}_cancel(){this._selected===O?this._select(this._state.themes[0]?.id??null):this._select(this._selected)}_save(){let e={...this._draft,vars:Q(this._draft)};this._selected!==O&&(e.id=this._selected),this._run(async()=>{try{let t=await this.hass.callWS({type:"style_studio/themes/save",theme:e});this._wholeScreen=!1,this._state=t,this._select(t.theme.id)}catch(t){throw this._known(t)}},this.t("saved_theme",{file:this._state.file}))}_known(e){let t={file_exists:"err_file_exists",name_taken:"err_name_taken"}[e?.code];return t?new Error(this.t(t)):e}_delete(){this._ask(this.t("delete_confirm",{name:this._saved.name}),()=>this._run(async()=>{this._state=await this.hass.callWS({type:"style_studio/themes/delete",theme_id:this._selected}),this._select(this._state.themes[0]?.id??null)},this.t("deleted")))}_undo(){this._ask(this.t("undo_confirm"),()=>this._run(async()=>{let e=await this.hass.callWS({type:"style_studio/themes/undo"});if(!e.restored)throw new Error(this.t("nothing_to_undo"));this._state=e,this._select(this._selected)},this.t("undone")))}_setDefault(){let e=this._saved.name;this._run(async()=>{this._state=await this.hass.callWS({type:"style_studio/themes/set_default",name:e})},this.t("default_set",{name:e}))}render(){return this._state?n`
      <p class="intro">${this.t("themes_intro")}</p>
      ${this._list()}
      ${this._picking?this._picker():l}
      ${this._draft?this._editor():l}
      ${this._bar({left:this._barButtons(),onCancel:()=>this._cancel(),onSave:()=>this._save()})}
    `:l}_list(){let{themes:e,loaded:t,default_theme:i}=this._state;return n`
      <div class="chips">
        ${e.map(a=>n`<button
            class="chip ${a.id===this._selected?"active":""}"
            @click=${()=>this._pick(()=>this._select(a.id))}
          >
            <span class="swatch" style="background:${a.vars["primary-color"]}"></span>
            ${a.name}
            ${a.name===i?n`<em>${this.t("badge_default")}</em>`:l}
            ${t.includes(a.name)?l:n`<em class="bad">${this.t("badge_not_loaded")}</em>`}
          </button>`)}
        ${this._selected===O?n`<button class="chip active">${this._draft.name}</button>`:l}
        <button
          class="chip add ${this._picking?"active":""}"
          @click=${()=>this._pick(()=>{this._picking=!0,this._selected=null,this._draft=null})}
        >
          <ha-icon icon="mdi:plus"></ha-icon>${this.t("new_theme")}
        </button>
      </div>
    `}_pick(e){this.dirty?this._ask(this.t("discard_confirm"),e):e()}_picker(){let e=Object.keys(this._state.others);return n`
      <div class="card">
        <h2>${this.t("start_from")}</h2>
        <div class="presets">
          ${Object.entries(Le).map(([t,i])=>{let a=X(i.base);return n`<button
              class="preset"
              data-preset=${t}
              @click=${()=>this._startNew(i[this._lang],i.base)}
            >
              <span class="mini" style="background:${a["primary-background-color"]}">
                <i style="background:${a["sidebar-background-color"]}"></i>
                <b style="background:${a["card-background-color"]}"><s style="background:${a["primary-color"]}"></s></b>
              </span>
              ${i[this._lang]}
            </button>`})}
        </div>
        ${e.length?n`<label class="row">
              <span>${this.t("copy_existing")}</span>
              <select
                @change=${t=>{let i=t.target.value;if(!i)return;let{base:a,overrides:s}=Ge(this._state.others[i]);this._startNew(`${i} (${this.t("copy_suffix")})`,a,s)}}
              >
                <option value="">${this.t("pick_theme")}</option>
                ${e.map(t=>n`<option>${t}</option>`)}
              </select>
            </label>`:l}
      </div>
    `}_editor(){let e=this._draft,t={...w,...e.base},i=X(t),a=Q(e),s=this._saved;return n`
      ${s&&!this._state.loaded.includes(s.name)?this._warning(this.t("warn_not_loaded")):l}
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
          </div>

          <div class="card">
            <h2>${this.t("quick")}</h2>
            <p class="hint">${this.t("quick_hint")}</p>
            ${this._color(t,"background",this.t("c_background"))}
            ${this._color(t,"card",this.t("c_card"))}
            ${this._color(t,"text",this.t("c_text"))}
            ${this._color(t,"accent",this.t("c_accent"))}
            ${this._color(t,"sidebar",this.t("c_sidebar"))}
            <label class="row">
              <span>${this.t("header_same")}</span>
              <span class="inline">
                ${t.header?n`<input
                      type="color"
                      aria-label=${this.t("c_header")}
                      .value=${t.header}
                      @input=${r=>this._set("header",r.target.value)}
                    />`:l}
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
            ${t.popup==="glass"?this._slider(t,"popup_opacity",this.t("popup_opacity"),30,100,"%"):l}
          </div>

          <div class="card">
            <h2>${this.t("all_vars")}</h2>
            <p class="hint">${this.t("all_vars_hint")}</p>
            ${be.map(r=>n`
                <details>
                  <summary>
                    ${r[this._lang]}
                    <span class="dots">
                      ${r.vars.filter(([,,,c])=>c==="color").slice(0,6).map(([c])=>n`<i style="background:${a[c]}"></i>`)}
                    </span>
                  </summary>
                  ${r.vars.map(([c,d,h,u])=>this._varRow(c,this._lang==="nl"?d:h,u,i[c]))}
                </details>
              `)}
          </div>

          <div class="card">
            <h2>${this.t("custom_vars")}</h2>
            <p class="hint">${this.t("custom_vars_hint")}</p>
            ${Object.entries(e.overrides).filter(([r])=>!Me.has(r)).map(([r,c])=>this._varRow(r,`--${r}`,"text","",c,!0))}
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
    `}_varRow(e,t,i,a,s=this._draft.overrides[e],r=!1){let c=s??"",d=s??a;return n`
      <div class="var ${s!==void 0?"own":""}">
        <span class="label">${t}<code>--${e}</code></span>
        <span class="inline">
          ${i==="color"?n`<input
                type="color"
                aria-label=${t}
                .value=${ut.test(d)?d:"#000000"}
                @input=${h=>this._override(e,h.target.value)}
              />`:l}
          <input
            type="text"
            aria-label=${t}
            .value=${c}
            placeholder=${a}
            @change=${h=>this._override(e,h.target.value.trim())}
          />
          ${s!==void 0?n`<button
                class="icon"
                title=${r?this.t("remove"):this.t("reset")}
                @click=${()=>this._override(e,null)}
              >
                <ha-icon icon=${r?"mdi:delete-outline":"mdi:restore"}></ha-icon>
              </button>`:n`<span class="icon-space"></span>`}
        </span>
      </div>
    `}_barButtons(){let e=this._selected!==O?this._saved:null,t=[];return this._state.history&&t.push(n`<button ?disabled=${this._busy} @click=${this._undo}>
        <ha-icon icon="mdi:history"></ha-icon>${this.t("undo")}
      </button>`),e&&!this.dirty&&(e.name===this._state.default_theme?t.push(n`<span class="note">${this.t("is_default")}</span>`):this._state.loaded.includes(e.name)&&t.push(n`<button
          ?disabled=${this._busy}
          title=${this.t("set_default_hint")}
          @click=${this._setDefault}
        >
          <ha-icon icon="mdi:account-group"></ha-icon>${this.t("set_default")}
        </button>`),t.push(n`<button ?disabled=${this._busy} @click=${this._delete}>
        <ha-icon icon="mdi:delete-outline"></ha-icon>${this.t("delete_theme")}
      </button>`)),t.length?t:l}};g(V,"properties",{...v.properties,_state:{state:!0},_selected:{state:!0},_draft:{state:!0},_picking:{state:!0},_wholeScreen:{state:!0},_popup:{state:!0},_newVar:{state:!0}}),g(V,"styles",[v.styles,_`
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
    `]);customElements.get("ss-themes-tab")||customElements.define("ss-themes-tab",V);var _e="0.1.0";var gt=["themes","sidebar","rooms","climate","people","check"],G=class extends m{constructor(){super(),this._tab="themes",this._leaving=null}get t(){return F(this.hass)}willUpdate(e){e.has("hass")&&this.hass&&!this._loading&&(this._loading=this._load())}async _load(){try{this._data=await this.hass.callWS({type:"style_studio/get"})}catch(e){this._error=e.message??String(e)}}_pickTab(e){if(e===this._tab)return;this.renderRoot.querySelector(".tab-content > *")?.dirty?this._leaving=e:this._tab=e}render(){return n`
      <div class="toolbar">
        ${this.narrow?n`<button class="icon" @click=${this._toggleMenu} aria-label="Menu">
              <ha-icon icon="mdi:menu"></ha-icon>
            </button>`:l}
        <h1>${this.t("title")}</h1>
      </div>
      <main>
        ${this._error?n`<div class="warning">${this.t("error",{message:this._error})}</div>`:l}
        ${this._data?this._content():l}
      </main>
    `}_toggleMenu(){this.dispatchEvent(new Event("hass-toggle-menu",{bubbles:!0,composed:!0}))}_content(){return n`
      ${this._data.version!==_e?n`<div class="warning">
            <ha-icon icon="mdi:alert-outline"></ha-icon>
            ${this.t("warn_old_panel",{old:_e,new:this._data.version})}
          </div>`:l}
      <nav class="tabs">
        ${gt.map(e=>n`<button
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
          </div>`:l}
      <div class="tab-content">${this._tabContent()}</div>
    `}_tabContent(){switch(this._tab){case"themes":return n`<ss-themes-tab .hass=${this.hass} .narrow=${this.narrow}></ss-themes-tab>`;case"sidebar":return n`<ss-sidebar-tab
          .hass=${this.hass}
          .narrow=${this.narrow}
          .glass=${this._data.glass_sidebar}
          @reload=${()=>this._load()}
        ></ss-sidebar-tab>`;default:return n`<div class="card coming">${this.t("coming")}</div>`}}};g(G,"properties",{hass:{attribute:!1},narrow:{type:Boolean},panel:{attribute:!1},_data:{state:!0},_tab:{state:!0},_leaving:{state:!0}}),g(G,"styles",_`
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
  `);customElements.get("style-studio-panel")||customElements.define("style-studio-panel",G);
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
