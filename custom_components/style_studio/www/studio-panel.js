var xt=Object.defineProperty;var wt=(o,e,t)=>e in o?xt(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var m=(o,e,t)=>wt(o,typeof e!="symbol"?e+"":e,t);var te=globalThis,ae=te.ShadowRoot&&(te.ShadyCSS===void 0||te.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,_e=Symbol(),Be=new WeakMap,H=class{constructor(e,t,a){if(this._$cssResult$=!0,a!==_e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(ae&&e===void 0){let a=t!==void 0&&t.length===1;a&&(e=Be.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),a&&Be.set(t,e))}return e}toString(){return this.cssText}},Le=o=>new H(typeof o=="string"?o:o+"",void 0,_e),g=(o,...e)=>{let t=o.length===1?o[0]:e.reduce((a,s,i)=>a+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[i+1],o[0]);return new H(t,o,_e)},Re=(o,e)=>{if(ae)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let a=document.createElement("style"),s=te.litNonce;s!==void 0&&a.setAttribute("nonce",s),a.textContent=t.cssText,o.appendChild(a)}},ge=ae?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(let a of e.cssRules)t+=a.cssText;return Le(t)})(o):o;var{is:$t,defineProperty:yt,getOwnPropertyDescriptor:kt,getOwnPropertyNames:St,getOwnPropertySymbols:At,getPrototypeOf:Et}=Object,se=globalThis,Ve=se.trustedTypes,zt=Ve?Ve.emptyScript:"",Ct=se.reactiveElementPolyfillSupport,D=(o,e)=>o,be={toAttribute(o,e){switch(e){case Boolean:o=o?zt:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},We=(o,e)=>!$t(o,e),Ue={attribute:!0,type:String,converter:be,reflect:!1,useDefault:!1,hasChanged:We};Symbol.metadata??=Symbol("metadata"),se.litPropertyMetadata??=new WeakMap;var w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Ue){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let a=Symbol(),s=this.getPropertyDescriptor(e,a,t);s!==void 0&&yt(this.prototype,e,s)}}static getPropertyDescriptor(e,t,a){let{get:s,set:i}=kt(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get:s,set(r){let l=s?.call(this);i?.call(this,r),this.requestUpdate(e,l,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Ue}static _$Ei(){if(this.hasOwnProperty(D("elementProperties")))return;let e=Et(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(D("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(D("properties"))){let t=this.properties,a=[...St(t),...At(t)];for(let s of a)this.createProperty(s,t[s])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[a,s]of t)this.elementProperties.set(a,s)}this._$Eh=new Map;for(let[t,a]of this.elementProperties){let s=this._$Eu(t,a);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let a=new Set(e.flat(1/0).reverse());for(let s of a)t.unshift(ge(s))}else e!==void 0&&t.push(ge(e));return t}static _$Eu(e,t){let a=t.attribute;return a===!1?void 0:typeof a=="string"?a:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let a of t.keys())this.hasOwnProperty(a)&&(e.set(a,this[a]),delete this[a]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Re(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,a){this._$AK(e,a)}_$ET(e,t){let a=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,a);if(s!==void 0&&a.reflect===!0){let i=(a.converter?.toAttribute!==void 0?a.converter:be).toAttribute(t,a.type);this._$Em=e,i==null?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(e,t){let a=this.constructor,s=a._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let i=a.getPropertyOptions(s),r=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:be;this._$Em=s;let l=r.fromAttribute(t,i.type);this[s]=l??this._$Ej?.get(s)??l,this._$Em=null}}requestUpdate(e,t,a,s=!1,i){if(e!==void 0){let r=this.constructor;if(s===!1&&(i=this[e]),a??=r.getPropertyOptions(e),!((a.hasChanged??We)(i,t)||a.useDefault&&a.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,a))))return;this.C(e,t,a)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:a,reflect:s,wrapped:i},r){a&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),i!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||a||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,i]of this._$Ep)this[s]=i;this._$Ep=void 0}let a=this.constructor.elementProperties;if(a.size>0)for(let[s,i]of a){let{wrapped:r}=i,l=this[s];r!==!0||this._$AL.has(s)||l===void 0||this.C(s,void 0,i,l)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(a=>a.hostUpdate?.()),this.update(t)):this._$EM()}catch(a){throw e=!1,this._$EM(),a}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[D("elementProperties")]=new Map,w[D("finalized")]=new Map,Ct?.({ReactiveElement:w}),(se.reactiveElementVersions??=[]).push("2.1.2");var ke=globalThis,Ge=o=>o,ie=ke.trustedTypes,Ie=ie?ie.createPolicy("lit-html",{createHTML:o=>o}):void 0,Ye="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,Qe="?"+$,Ot=`<${Qe}>`,A=document,M=()=>A.createComment(""),B=o=>o===null||typeof o!="object"&&typeof o!="function",Se=Array.isArray,Tt=o=>Se(o)||typeof o?.[Symbol.iterator]=="function",fe=`[ 	
\f\r]`,P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ke=/-->/g,Je=/>/g,k=RegExp(`>|${fe}(?:([^\\s"'>=/]+)(${fe}*=${fe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Fe=/'/g,qe=/"/g,Xe=/^(?:script|style|textarea|title)$/i,Ae=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),n=Ae(1),aa=Ae(2),sa=Ae(3),E=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),Ze=new WeakMap,S=A.createTreeWalker(A,129);function et(o,e){if(!Se(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ie!==void 0?Ie.createHTML(e):e}var jt=(o,e)=>{let t=o.length-1,a=[],s,i=e===2?"<svg>":e===3?"<math>":"",r=P;for(let l=0;l<t;l++){let d=o[l],h,p,u=-1,v=0;for(;v<d.length&&(r.lastIndex=v,p=r.exec(d),p!==null);)v=r.lastIndex,r===P?p[1]==="!--"?r=Ke:p[1]!==void 0?r=Je:p[2]!==void 0?(Xe.test(p[2])&&(s=RegExp("</"+p[2],"g")),r=k):p[3]!==void 0&&(r=k):r===k?p[0]===">"?(r=s??P,u=-1):p[1]===void 0?u=-2:(u=r.lastIndex-p[2].length,h=p[1],r=p[3]===void 0?k:p[3]==='"'?qe:Fe):r===qe||r===Fe?r=k:r===Ke||r===Je?r=P:(r=k,s=void 0);let x=r===k&&o[l+1].startsWith("/>")?" ":"";i+=r===P?d+Ot:u>=0?(a.push(h),d.slice(0,u)+Ye+d.slice(u)+$+x):d+$+(u===-2?l:x)}return[et(o,i+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),a]},L=class o{constructor({strings:e,_$litType$:t},a){let s;this.parts=[];let i=0,r=0,l=e.length-1,d=this.parts,[h,p]=jt(e,t);if(this.el=o.createElement(h,a),S.currentNode=this.el.content,t===2||t===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(s=S.nextNode())!==null&&d.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let u of s.getAttributeNames())if(u.endsWith(Ye)){let v=p[r++],x=s.getAttribute(u).split($),ee=/([.?@])?(.*)/.exec(v);d.push({type:1,index:i,name:ee[2],strings:x,ctor:ee[1]==="."?xe:ee[1]==="?"?we:ee[1]==="@"?$e:T}),s.removeAttribute(u)}else u.startsWith($)&&(d.push({type:6,index:i}),s.removeAttribute(u));if(Xe.test(s.tagName)){let u=s.textContent.split($),v=u.length-1;if(v>0){s.textContent=ie?ie.emptyScript:"";for(let x=0;x<v;x++)s.append(u[x],M()),S.nextNode(),d.push({type:2,index:++i});s.append(u[v],M())}}}else if(s.nodeType===8)if(s.data===Qe)d.push({type:2,index:i});else{let u=-1;for(;(u=s.data.indexOf($,u+1))!==-1;)d.push({type:7,index:i}),u+=$.length-1}i++}}static createElement(e,t){let a=A.createElement("template");return a.innerHTML=e,a}};function O(o,e,t=o,a){if(e===E)return e;let s=a!==void 0?t._$Co?.[a]:t._$Cl,i=B(e)?void 0:e._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(!1),i===void 0?s=void 0:(s=new i(o),s._$AT(o,t,a)),a!==void 0?(t._$Co??=[])[a]=s:t._$Cl=s),s!==void 0&&(e=O(o,s._$AS(o,e.values),s,a)),e}var ve=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:a}=this._$AD,s=(e?.creationScope??A).importNode(t,!0);S.currentNode=s;let i=S.nextNode(),r=0,l=0,d=a[0];for(;d!==void 0;){if(r===d.index){let h;d.type===2?h=new R(i,i.nextSibling,this,e):d.type===1?h=new d.ctor(i,d.name,d.strings,this,e):d.type===6&&(h=new ye(i,this,e)),this._$AV.push(h),d=a[++l]}r!==d?.index&&(i=S.nextNode(),r++)}return S.currentNode=A,s}p(e){let t=0;for(let a of this._$AV)a!==void 0&&(a.strings!==void 0?(a._$AI(e,a,t),t+=a.strings.length-2):a._$AI(e[t])),t++}},R=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,a,s){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=a,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=O(this,e,t),B(e)?e===c||e==null||e===""?(this._$AH!==c&&this._$AR(),this._$AH=c):e!==this._$AH&&e!==E&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Tt(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==c&&B(this._$AH)?this._$AA.nextSibling.data=e:this.T(A.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:a}=e,s=typeof a=="number"?this._$AC(e):(a.el===void 0&&(a.el=L.createElement(et(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===s)this._$AH.p(t);else{let i=new ve(s,this),r=i.u(this.options);i.p(t),this.T(r),this._$AH=i}}_$AC(e){let t=Ze.get(e.strings);return t===void 0&&Ze.set(e.strings,t=new L(e)),t}k(e){Se(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,a,s=0;for(let i of e)s===t.length?t.push(a=new o(this.O(M()),this.O(M()),this,this.options)):a=t[s],a._$AI(i),s++;s<t.length&&(this._$AR(a&&a._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let a=Ge(e).nextSibling;Ge(e).remove(),e=a}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},T=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,a,s,i){this.type=1,this._$AH=c,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=i,a.length>2||a[0]!==""||a[1]!==""?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=c}_$AI(e,t=this,a,s){let i=this.strings,r=!1;if(i===void 0)e=O(this,e,t,0),r=!B(e)||e!==this._$AH&&e!==E,r&&(this._$AH=e);else{let l=e,d,h;for(e=i[0],d=0;d<i.length-1;d++)h=O(this,l[a+d],t,d),h===E&&(h=this._$AH[d]),r||=!B(h)||h!==this._$AH[d],h===c?e=c:e!==c&&(e+=(h??"")+i[d+1]),this._$AH[d]=h}r&&!s&&this.j(e)}j(e){e===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},xe=class extends T{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===c?void 0:e}},we=class extends T{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==c)}},$e=class extends T{constructor(e,t,a,s,i){super(e,t,a,s,i),this.type=5}_$AI(e,t=this){if((e=O(this,e,t,0)??c)===E)return;let a=this._$AH,s=e===c&&a!==c||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,i=e!==c&&(a===c||s);s&&this.element.removeEventListener(this.name,this,a),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ye=class{constructor(e,t,a){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(e){O(this,e)}};var Nt=ke.litHtmlPolyfillSupport;Nt?.(L,R),(ke.litHtmlVersions??=[]).push("3.3.3");var tt=(o,e,t)=>{let a=t?.renderBefore??e,s=a._$litPart$;if(s===void 0){let i=t?.renderBefore??null;a._$litPart$=s=new R(e.insertBefore(M(),i),i,void 0,t??{})}return s._$AI(o),s};var Ee=globalThis,b=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=tt(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return E}};b._$litElement$=!0,b.finalized=!0,Ee.litElementHydrateSupport?.({LitElement:b});var Ht=Ee.litElementPolyfillSupport;Ht?.({LitElement:b});(Ee.litElementVersions??=[]).push("4.2.2");var Dt={title:"Stijl",tab_sidebar:"Zijbalk",tab_themes:"Thema's",tab_rooms:"Kamers en pop-ups",tab_climate:"Klimaat",tab_people:"Per persoon",tab_check:"Controle en herstel",coming:"Dit onderdeel komt in een volgende versie.",glass_intro:"De zijbalk wordt opgemaakt door de uitbreiding Glass Sidebar. Hier stel je die in; wijzigingen gelden voor iedereen en verschijnen direct. De kleuren van de zijbalk stel je in bij Thema's.",glass_missing_title:"Uitbreiding: Glass Sidebar",glass_missing:"Met de uitbreiding Glass Sidebar wordt je zijbalk een zwevend glazen paneel, met groepen en kopjes. Installeer hem via HACS en herstart Home Assistant; daarna stel je hem hier in. De kleuren van de zijbalk stel je ook zonder uitbreiding in bij Thema's.",glass_not_added_title:"Glass Sidebar is ge\xEFnstalleerd",glass_not_added:"Voeg hem nog toe: Instellingen \u203A Apparaten en diensten \u203A Integratie toevoegen \u203A Glass Sidebar. Daarna stel je hem hier in.",glass_not_loaded:"Glass Sidebar is uitgeschakeld of niet geladen. Je kunt instellingen opslaan, maar je ziet ze pas als Glass Sidebar weer draait.",glass_old:"Je hebt Glass Sidebar {version}. Style Studio is gemaakt voor {min} of nieuwer; werk Glass Sidebar bij via HACS. Opties die jouw versie nog niet kent, doen niets.",open_glass:"Alle instellingen van Glass Sidebar openen",open_glass_hint:"Daar staan ook stijlen, tint, iconen per groep, het snelmenu en meer telefoonopties. Hier stel je de basis in.",shape:"Vorm",floating:"Zwevend",floating_hint:"Een losse balk met ruimte eromheen.",inset:"Afstand tot de rand",radius:"Hoeken",glass:"Glas",blur:"Vervaging",opacity:"Dekking",opacity_hint:"Lager is meer doorzichtig.",glass_cards:"Glazen dashboardkaarten",glass_cards_hint:"Kaarten worden doorschijnend. Kan zwaar zijn op oudere tablets.",active:"Actieve pagina",highlight_soft:"Zacht",highlight_vivid:"Vol",own_accent:"Eigen kleur",own_accent_hint:"Uit: de kleur van het thema.",motion:"Iconen bewegen bij aanwijzen",phone:"Telefoon",phone_hint:"Voor schermen tot 600 pixels breed.",mobile_width:"Breedte van het menu",mobile_text_size:"Tekstgrootte",mobile_blur:"Pagina achter het menu vervagen",groups:"Groepen",groups_hint:"Sleep items naar een groep, of tik een item aan en kies Hierheen. Items zonder groep staan bovenaan.",ungrouped:"Zonder groep",ungrouped_hint:"Staan bovenaan, in de volgorde van Home Assistant.",add_group:"Groep toevoegen",new_group:"Nieuwe groep",group_name:"Naam van de groep",move_here:"Hierheen",move_up:"Omhoog",move_down:"Omlaag",move_left:"Naar voren",move_right:"Naar achteren",remove_group:"Groep verwijderen",remove_group_confirm:"Verwijderen? De items gaan terug naar Zonder groep.",hide:"Verbergen",show:"Tonen",missing:"niet gevonden",empty_group:"Sleep items hierheen.",preview:"Voorbeeld",preview_hint:"Wordt pas echt toegepast als je opslaat.",device_phone:"Telefoon",device_tablet:"Tablet",device_desktop:"Pc",page_light:"Lichte pagina",page_dark:"Donkere pagina",expanded:"Uitgeklapt",unsaved:"Niet opgeslagen wijzigingen",cancel:"Annuleren",save:"Opslaan",saved:"Opgeslagen",undo:"Vorige versie terugzetten",undo_confirm:"De instellingen van voor de laatste keer opslaan komen terug. Doorgaan?",undone:"Vorige versie teruggezet",nothing_to_undo:"Er is geen vorige versie",yes:"Ja",no:"Nee",discard_confirm:"Je hebt wijzigingen die niet zijn opgeslagen. Weggooien?",error:"Er ging iets mis: {message}",themes_intro:"Bepaal elke kleur in Home Assistant: menu, bovenbalk, kaarten, pop-ups, vensters, schakelaars en meer. Begin met een paar basiskleuren; de rest rekent Style Studio uit. Onder Alles aanpassen kun je elke kleur apart zetten.",your_themes:"Je thema's",new_theme:"Nieuw thema",start_from:"Begin met",start_current:"Je huidige thema",or_preset:"Of kies een voorgemaakte stijl:",my_theme:"Mijn thema",fixed_colors:"{count} kleuren komen vast uit het gekopieerde thema en volgen Snel niet.",follow_quick:"Laat alles Snel volgen",copy_existing:"Of kopieer een bestaand thema",pick_theme:"Kies een thema",copy_suffix:"kopie",theme_name:"Naam",badge_default:"standaard",badge_not_loaded:"niet geladen",quick:"Snel",quick_hint:"Hieruit worden alle andere kleuren berekend.",c_background:"Achtergrond",c_card:"Kaarten",c_text:"Tekst",c_accent:"Accent (actief, knoppen, schakelaars)",c_sidebar:"Zijbalk",c_header:"Bovenbalk",header_same:"Bovenbalk zelfde kleur als de achtergrond",corners:"Hoeken van kaarten",shadow:"Schaduw",shadow_none:"Geen",shadow_soft:"Zacht",shadow_strong:"Sterk",card_opacity:"Dekking van kaarten",card_opacity_hint:"Lager laat de achtergrond door de kaarten heen zien.",popups:"Pop-ups",popup_solid:"Ondoorzichtig",popup_glass:"Glas",popup_opacity:"Dekking van pop-ups",all_vars:"Alles aanpassen",all_vars_hint:"Leeg veld: de berekende kleur (grijs). Je mag elke CSS-waarde gebruiken, ook rgba() of een verloop. Een paar plekken in de instellingen van Home Assistant hebben vaste kleuren en volgen geen thema.",reset:"Terug naar berekend",custom_vars:"Eigen variabelen",custom_vars_hint:"Voor variabelen die hierboven niet staan, bijvoorbeeld van een andere kaart.",var_name:"Naam, zonder --",var_value:"Waarde",add_var:"Toevoegen",remove:"Verwijderen",whole_screen:"Ook tonen op dit hele scherm",whole_screen_hint:"Alleen in deze browser, tot je opslaat of annuleert.",show_popup:"Pop-up tonen",delete_theme:"Thema verwijderen",delete_confirm:"Thema {name} verwijderen? Je kunt het daarna nog terugzetten.",deleted:"Verwijderd",set_default:"Standaard voor iedereen",set_default_hint:"Voor iedereen die in het profiel geen eigen thema koos.",default_set:"{name} is nu het standaardthema",is_default:"Dit is het standaardthema",saved_theme:"Opgeslagen. Kies het in je profiel, of gebruik Voor mij gebruiken.",use_for_me:"Voor mij gebruiken",using_now:"Dit scherm gebruikt nu {name}",warn_not_loaded:"Home Assistant heeft dit thema niet geladen. Zet in configuration.yaml: frontend: themes: !include_dir_merge_named themes, en herstart Home Assistant.",err_file_exists:"themes/style_studio.yaml bestaat al en is niet door Style Studio gemaakt. Hernoem of verwijder dat bestand eerst.",err_name_taken:"Er is al een thema met deze naam.",pv_title:"Thuis",pv_tab2:"Kamers",pv_living:"Woonkamer",pv_lights:"3 lampen aan",pv_kitchen:"Keuken",pv_off:"Uit",pv_climate:"Airco",pv_weather:"Zonnig, 21\xB0",pv_switch:"Ventilator",pv_popup:"Woonkamer",people_intro:"Geef iedereen een eigen thema en zijbalkvolgorde. Het wordt toegepast als die persoon Home Assistant opent, op elk apparaat \xE9\xE9n keer; daarna kan diegene in het profiel nog zelf iets anders kiezen.",person_theme:"Thema",person_sidebar:"Zijbalk (volgorde en verborgen items)",self_choice:"Zelf kiezen",like_person:"Zoals {name} nu",copy_all_from:"Alles kopi\xEBren van",pick_person:"Kies een persoon",now_uses:"Gebruikt nu: {value}",ha_default:"standaard",unknown:"onbekend",hidden_count:"{count} verborgen",order_count:"{count} in eigen volgorde",applied:"Toegepast",pending:"Wordt toegepast als {name} Home Assistant opent",never_seen:"Nog niet gezien sinds Style Studio er is",last_seen:"Laatst gezien {when}",devices:"{count} apparaten",device_one:"1 apparaat",app_badge:"app",no_themes_yet:"Er zijn nog geen thema's geladen. Maak er eerst een bij Thema's.",climate_intro:"Maak per airco een pop-up met temperatuur, standen, ventilator en zwenken. Je ziet het voorbeeld eerst; pas daarna zet Style Studio het op een dashboard, met eerst een back-up van dat dashboard.",no_climate:"Er zijn geen klimaat-apparaten (climate.*) gevonden.",cl_popup:"Pop-up",cl_name:"Naam",cl_hash:"Adres (#)",cl_hash_hint:"Openen met een knop of link naar dit adres, bijvoorbeeld /lovelace/0{hash}.",cl_parts:"Onderdelen",cl_temperature:"Temperatuur met min en plus",cl_temperature_hint:"Van {min}\xB0 tot {max}\xB0, stap {step}\xB0.",cl_modes:"Standen",cl_fan:"Ventilator",cl_fan_none:"Deze airco geeft geen ventilatorstanden door.",cl_swing_title:"Zwenken",cl_swing_v:"Omhoog/omlaag zwenken",cl_swing_h:"Links/rechts zwenken",cl_swing_none:"Deze airco geeft dit niet door als aan/uit.",cl_louvers:"Lamelstanden (de pijltjes in de app van de fabrikant) geeft deze integratie niet door aan Home Assistant. Die kun je hier dus niet instellen.",cl_place:"Op een dashboard zetten",cl_dashboard:"Dashboard",cl_view:"Weergave",cl_opener:"Ook een knop in de weergave die de pop-up opent",cl_add:"Op dashboard zetten",cl_add_confirm:"Pop-up {hash} op {view} zetten? Er gaat eerst een back-up van dit dashboard naar style_studio/backups. Een eerdere pop-up met hetzelfde adres wordt vervangen.",cl_added:"Op {view} gezet ({replaced} vervangen). Back-up gemaakt.",cl_readonly:"Dit dashboard staat in YAML-modus; Style Studio kan het niet aanpassen. Kopieer de kaartcode hieronder.",cl_panel_view:"Deze weergave heeft maar \xE9\xE9n kaart (paneelmodus); kies een andere.",cl_code:"Kaartcode",cl_code_hint:"Plakken in een handmatige kaart, als je het zelf wilt plaatsen.",copy:"Kopi\xEBren",copied:"Gekopieerd",needs_cards:"Nodig via HACS: {cards}. Zonder deze kaarten werkt de pop-up niet; het voorbeeld hieronder is een tekening.",preview_drawing:"Tekening van het resultaat",preview_real:"Echte kaarten; de knoppen werken echt",cl_section:"Airco",cl_now_label:"Nu",mode_off:"Uit",mode_cool:"Koel",mode_heat:"Warm",mode_auto:"Auto",mode_dry:"Droog",mode_fan_only:"Fan",mode_heat_cool:"Koel/warm",fan_auto:"Auto",fan_low:"Laag",fan_medium:"Midden",fan_middle:"Midden",fan_high:"Hoog",rooms_intro:"Maak kamertegels per verdieping, met per kamer een pop-up met de lampen. Kamers en lampen komen uit je ruimtes en verdiepingen in Home Assistant. Style Studio maakt er \xE9\xE9n weergave van; je andere weergaven blijven zoals ze zijn.",no_areas:"Er zijn nog geen ruimtes. Maak ze in Instellingen \u203A Ruimtes, labels en zones, en wijs je lampen toe.",rm_view:"Weergave",rm_title:"Titel",rm_path:"Adres",rm_popups:"Pop-ups",rm_solid:"Ondoorzichtig",rm_glass:"Glas",rm_opacity:"Dekking",rm_width:"Breedte op de pc",rm_height:"Ruimte boven de pop-up op de telefoon",rm_header:"Kopknoppen tonen",rm_other:"Overig",rm_lights:"{count} lampen",rm_light_one:"1 lamp",rm_no_lights:"geen lampen",rm_include:"Meenemen",rm_climate:"Airco-knop",rm_climate_hint:"Opent {hash}; maak die pop-up bij Klimaat.",rm_icon:"Icoon (mdi:\u2026)",rm_create:"Weergave maken",rm_create_confirm:"Weergave {title} maken op dit dashboard? Er gaat eerst een back-up van het dashboard naar style_studio/backups.",rm_replace_confirm:"Weergave {title} bestaat al en wordt vervangen. Er gaat eerst een back-up van het dashboard naar style_studio/backups. Doorgaan?",rm_created:"Weergave {title} gemaakt. Open het dashboard om hem te zien.",rm_pick_room:"Tik op een kamer in het voorbeeld om de pop-up te zien.",rm_on:"aan",rm_off:"Uit",rm_climate_label:"Airco",warn_old_panel:"Dit scherm gebruikt een oude versie van het paneel ({old}, server {new}). Herlaad de pagina. In de Companion-app: Instellingen \u203A Companion-app \u203A Probleemoplossing \u203A Frontend-cache wissen."},at={title:"Style",tab_sidebar:"Sidebar",tab_themes:"Themes",tab_rooms:"Rooms and pop-ups",tab_climate:"Climate",tab_people:"People",tab_check:"Check and restore",coming:"This part comes in a later version.",glass_intro:"The sidebar is styled by the Glass Sidebar add-on. You set it up here; changes apply to everyone and show right away. Sidebar colors are set under Themes.",glass_missing_title:"Add-on: Glass Sidebar",glass_missing:"The Glass Sidebar add-on turns your sidebar into a floating glass panel, with groups and headings. Install it through HACS and restart Home Assistant; then set it up here. Sidebar colors can be set under Themes without the add-on.",glass_not_added_title:"Glass Sidebar is installed",glass_not_added:"Add it too: Settings \u203A Devices & services \u203A Add integration \u203A Glass Sidebar. Then set it up here.",glass_not_loaded:"Glass Sidebar is disabled or not loaded. You can save settings, but you'll only see them once Glass Sidebar runs again.",glass_old:"You have Glass Sidebar {version}. Style Studio is made for {min} or newer; update Glass Sidebar through HACS. Options your version doesn't know do nothing.",open_glass:"Open all Glass Sidebar settings",open_glass_hint:"There you also find styles, tint, icons per group, the quick menu and more phone options. Here you set the basics.",shape:"Shape",floating:"Floating",floating_hint:"A separate panel with space around it.",inset:"Distance to the edge",radius:"Corners",glass:"Glass",blur:"Blur",opacity:"Opacity",opacity_hint:"Lower is more see-through.",glass_cards:"Glass dashboard cards",glass_cards_hint:"Cards become translucent. Can be heavy on older tablets.",active:"Active page",highlight_soft:"Soft",highlight_vivid:"Solid",own_accent:"Own color",own_accent_hint:"Off: the theme's color.",motion:"Icons move on hover",phone:"Phone",phone_hint:"For screens up to 600 pixels wide.",mobile_width:"Menu width",mobile_text_size:"Text size",mobile_blur:"Blur the page behind the menu",groups:"Groups",groups_hint:"Drag items into a group, or tap an item and choose Move here. Items without a group stay at the top.",ungrouped:"No group",ungrouped_hint:"Shown at the top, in Home Assistant's order.",add_group:"Add group",new_group:"New group",group_name:"Group name",move_here:"Move here",move_up:"Up",move_down:"Down",move_left:"Earlier",move_right:"Later",remove_group:"Remove group",remove_group_confirm:"Remove? Its items go back to No group.",hide:"Hide",show:"Show",missing:"not found",empty_group:"Drag items here.",preview:"Preview",preview_hint:"Only applied once you save.",device_phone:"Phone",device_tablet:"Tablet",device_desktop:"Desktop",page_light:"Light page",page_dark:"Dark page",expanded:"Expanded",unsaved:"Unsaved changes",cancel:"Cancel",save:"Save",saved:"Saved",undo:"Restore previous version",undo_confirm:"The settings from before the last save come back. Continue?",undone:"Previous version restored",nothing_to_undo:"There is no previous version",yes:"Yes",no:"No",discard_confirm:"You have unsaved changes. Throw them away?",error:"Something went wrong: {message}",themes_intro:"Set every color in Home Assistant: menu, top bar, cards, pop-ups, dialogs, switches and more. Start with a few base colors; Style Studio works out the rest. Under Change everything you can set each color on its own.",your_themes:"Your themes",new_theme:"New theme",start_from:"Start with",start_current:"Your current theme",or_preset:"Or pick a preset:",my_theme:"My theme",fixed_colors:"{count} colors are fixed from the copied theme and don't follow Quick.",follow_quick:"Let everything follow Quick",copy_existing:"Or copy an existing theme",pick_theme:"Pick a theme",copy_suffix:"copy",theme_name:"Name",badge_default:"default",badge_not_loaded:"not loaded",quick:"Quick",quick_hint:"All other colors are worked out from these.",c_background:"Background",c_card:"Cards",c_text:"Text",c_accent:"Accent (active, buttons, switches)",c_sidebar:"Sidebar",c_header:"Top bar",header_same:"Top bar in the background color",corners:"Card corners",shadow:"Shadow",shadow_none:"None",shadow_soft:"Soft",shadow_strong:"Strong",card_opacity:"Card opacity",card_opacity_hint:"Lower lets the background show through cards.",popups:"Pop-ups",popup_solid:"Solid",popup_glass:"Glass",popup_opacity:"Pop-up opacity",all_vars:"Change everything",all_vars_hint:"Empty field: the worked-out color (grey). Any CSS value works, also rgba() or a gradient. A few places in Home Assistant's settings have fixed colors and don't follow any theme.",reset:"Back to worked-out",custom_vars:"Own variables",custom_vars_hint:"For variables not listed above, for example from another card.",var_name:"Name, without --",var_value:"Value",add_var:"Add",remove:"Remove",whole_screen:"Also show on this whole screen",whole_screen_hint:"Only in this browser, until you save or cancel.",show_popup:"Show pop-up",delete_theme:"Delete theme",delete_confirm:"Delete theme {name}? You can still restore it afterwards.",deleted:"Deleted",set_default:"Default for everyone",set_default_hint:"For everyone who didn't pick a theme in their profile.",default_set:"{name} is now the default theme",is_default:"This is the default theme",saved_theme:"Saved. Pick it in your profile, or use Use for me.",use_for_me:"Use for me",using_now:"This screen now uses {name}",warn_not_loaded:"Home Assistant didn't load this theme. Add to configuration.yaml: frontend: themes: !include_dir_merge_named themes, and restart Home Assistant.",err_file_exists:"themes/style_studio.yaml already exists and wasn't made by Style Studio. Rename or remove that file first.",err_name_taken:"There is already a theme with this name.",pv_title:"Home",pv_tab2:"Rooms",pv_living:"Living room",pv_lights:"3 lights on",pv_kitchen:"Kitchen",pv_off:"Off",pv_climate:"Air conditioning",pv_weather:"Sunny, 21\xB0",pv_switch:"Fan",pv_popup:"Living room",people_intro:"Give everyone their own theme and sidebar order. It is applied when that person opens Home Assistant, once on each device; after that they can still pick something else in their profile.",person_theme:"Theme",person_sidebar:"Sidebar (order and hidden items)",self_choice:"Their own choice",like_person:"Like {name} now",copy_all_from:"Copy everything from",pick_person:"Pick a person",now_uses:"Uses now: {value}",ha_default:"default",unknown:"unknown",hidden_count:"{count} hidden",order_count:"{count} in own order",applied:"Applied",pending:"Applied when {name} opens Home Assistant",never_seen:"Not seen since Style Studio was added",last_seen:"Last seen {when}",devices:"{count} devices",device_one:"1 device",app_badge:"app",no_themes_yet:"No themes are loaded yet. Make one under Themes first.",climate_intro:"Make a pop-up per air conditioner with temperature, modes, fan and swing. You see the preview first; only then does Style Studio put it on a dashboard, after a backup of that dashboard.",no_climate:"No climate devices (climate.*) found.",cl_popup:"Pop-up",cl_name:"Name",cl_hash:"Address (#)",cl_hash_hint:"Open it with a button or link to this address, for example /lovelace/0{hash}.",cl_parts:"Parts",cl_temperature:"Temperature with minus and plus",cl_temperature_hint:"From {min}\xB0 to {max}\xB0, step {step}\xB0.",cl_modes:"Modes",cl_fan:"Fan",cl_fan_none:"This air conditioner doesn't report fan modes.",cl_swing_title:"Swing",cl_swing_v:"Swing up/down",cl_swing_h:"Swing left/right",cl_swing_none:"This air conditioner doesn't report this as on/off.",cl_louvers:"Louver positions (the arrows in the manufacturer's app) aren't passed to Home Assistant by this integration, so they can't be set here.",cl_place:"Put on a dashboard",cl_dashboard:"Dashboard",cl_view:"View",cl_opener:"Also a button in the view that opens the pop-up",cl_add:"Put on dashboard",cl_add_confirm:"Put pop-up {hash} on {view}? A backup of this dashboard goes to style_studio/backups first. An earlier pop-up with the same address is replaced.",cl_added:"Put on {view} ({replaced} replaced). Backup made.",cl_readonly:"This dashboard is in YAML mode; Style Studio can't change it. Copy the card code below.",cl_panel_view:"This view holds a single card (panel mode); pick another one.",cl_code:"Card code",cl_code_hint:"Paste into a manual card if you want to place it yourself.",copy:"Copy",copied:"Copied",needs_cards:"Needed through HACS: {cards}. Without these cards the pop-up doesn't work; the preview below is a drawing.",preview_drawing:"Drawing of the result",preview_real:"Real cards; the buttons really work",cl_section:"Air conditioning",cl_now_label:"Now",mode_off:"Off",mode_cool:"Cool",mode_heat:"Heat",mode_auto:"Auto",mode_dry:"Dry",mode_fan_only:"Fan",mode_heat_cool:"Heat/cool",fan_auto:"Auto",fan_low:"Low",fan_medium:"Medium",fan_middle:"Middle",fan_high:"High",rooms_intro:"Make room tiles per floor, each opening a pop-up with its lights. Rooms and lights come from your areas and floors in Home Assistant. Style Studio makes one view of it; your other views stay as they are.",no_areas:"There are no areas yet. Make them under Settings \u203A Areas, labels & zones, and assign your lights.",rm_view:"View",rm_title:"Title",rm_path:"Address",rm_popups:"Pop-ups",rm_solid:"Solid",rm_glass:"Glass",rm_opacity:"Opacity",rm_width:"Width on desktop",rm_height:"Space above the pop-up on phones",rm_header:"Show header buttons",rm_other:"Other",rm_lights:"{count} lights",rm_light_one:"1 light",rm_no_lights:"no lights",rm_include:"Include",rm_climate:"Air conditioning button",rm_climate_hint:"Opens {hash}; make that pop-up under Climate.",rm_icon:"Icon (mdi:\u2026)",rm_create:"Make view",rm_create_confirm:"Make view {title} on this dashboard? A backup of the dashboard goes to style_studio/backups first.",rm_replace_confirm:"View {title} already exists and will be replaced. A backup of the dashboard goes to style_studio/backups first. Continue?",rm_created:"View {title} made. Open the dashboard to see it.",rm_pick_room:"Tap a room in the preview to see its pop-up.",rm_on:"on",rm_off:"Off",rm_climate_label:"Air conditioning",warn_old_panel:"This screen runs an old version of the panel ({old}, server {new}). Reload the page. In the Companion app: Settings \u203A Companion app \u203A Troubleshooting \u203A Reset frontend cache."};function oe(o){let e=(o?.locale?.language||o?.language||"nl").startsWith("nl")?Dt:at;return(t,a={})=>(e[t]??at[t]??t).replace(/\{(\w+)\}/g,(s,i)=>a[i]??"")}var _=class extends b{constructor(){super(),this._busy=!1,this._confirm=null}get t(){return oe(this.hass)}get dirty(){return!1}_ask(e,t){this._confirm={text:e,action:t}}_showToast(e){this._toast=e,clearTimeout(this._toastTimer),this._toastTimer=setTimeout(()=>this._toast=null,4e3)}_error(e){this._showToast(this.t("error",{message:e?.message??e}))}async _run(e,t){this._busy=!0;try{await e(),t&&this._showToast(t)}catch(a){this._error(a)}finally{this._busy=!1}}_set(){}_warning(e){return n`<div class="warning"><ha-icon icon="mdi:alert-outline"></ha-icon>${e}</div>`}_switch(e,t,a,s){return n`
      <label class="row">
        <span>
          ${a}
          ${s?n`<small>${s}</small>`:c}
        </span>
        <input
          type="checkbox"
          class="switch"
          .checked=${e[t]}
          @change=${i=>this._set(t,i.target.checked)}
        />
      </label>
    `}_slider(e,t,a,s,i,r,l=!1,d){return n`
      <label class="row slider ${l?"off":""}">
        <span>
          ${a}
          ${d?n`<small>${d}</small>`:c}
        </span>
        <span class="inline">
          <input
            type="range"
            min=${s}
            max=${i}
            step="1"
            .value=${String(e[t])}
            ?disabled=${l}
            @input=${h=>this._set(t,Number(h.target.value))}
          />
          <output>${e[t]}${r}</output>
        </span>
      </label>
    `}_segment(e,t,a){return n`
      <div class="segment" role="radiogroup">
        ${a.map(([s,i])=>n`<button
            role="radio"
            aria-checked=${e[t]===s?"true":"false"}
            class=${e[t]===s?"active":""}
            @click=${()=>this._set(t,s)}
          >
            ${i}
          </button>`)}
      </div>
    `}_color(e,t,a,s){return n`
      <label class="row">
        <span>
          ${a}
          ${s?n`<small>${s}</small>`:c}
        </span>
        <input type="color" .value=${e[t]} @input=${i=>this._set(t,i.target.value)} />
      </label>
    `}_bar({left:e=c,onCancel:t,onSave:a,canSave:s=this.dirty}){if(this._confirm){let{text:i,action:r}=this._confirm;return n`
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
      `}return e===c&&!this._toast&&!s?c:n`
      <footer class="bar">
        ${e}
        <span class="grow">${this._toast??(this.dirty?this.t("unsaved"):"")}</span>
        ${s?n`
              <button ?disabled=${this._busy} @click=${t}>${this.t("cancel")}</button>
              <button class="primary" ?disabled=${this._busy} @click=${a}>
                ${this.t("save")}
              </button>
            `:c}
      </footer>
    `}};m(_,"properties",{hass:{attribute:!1},narrow:{type:Boolean},_busy:{state:!0},_toast:{state:!0},_confirm:{state:!0}}),m(_,"styles",g`
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
  `);var Pt=o=>(o??"lovelace").toLowerCase().replace(/[^a-z0-9_-]+/g,"-").slice(0,64);async function re(o,e){let t=[],a=o.panels?.lovelace;t.push({url_path:null,title:e,editable:(a?.config?.mode??"storage")==="storage"});try{let s=await o.callWS({type:"lovelace/dashboards/list"});for(let i of s)t.push({url_path:i.url_path,title:i.title||i.url_path,editable:i.mode==="storage"})}catch{}return t}async function V(o,e){return o.callWS({type:"lovelace/config",url_path:e,force:!1})}async function ne(o,e,t,a){await o.callWS({type:"style_studio/backups/create",kind:"dashboards",key:Pt(e),data:{url_path:e,config:t}}),await o.callWS({type:"lovelace/config/save",url_path:e,config:a})}function st(o,e,t){let a=0;for(let{card:s,match:i}of e)if(o.type==="sections"){o.sections??=[];let r=!1;for(let d of o.sections){let h=(d.cards??[]).findIndex(i);if(h!==-1){d.cards[h]=s,a+=1,r=!0;break}}if(r)continue;let l=o.sections.find(d=>(d.cards??[]).some(h=>h.type==="heading"&&h.heading===t));l||(l={type:"grid",cards:[{type:"heading",heading:t}]},o.sections.push(l)),l.cards.push(s)}else{o.cards??=[];let r=o.cards.findIndex(i);r!==-1?(o.cards[r]=s,a+=1):o.cards.push(s)}return a}async function it(o,e){let t=()=>e.filter(a=>!customElements.get(a));if(!t().length)return[];try{let a=await o.callWS({type:"lovelace/resources"});for(let s of a)t().some(i=>s.url.includes(i.replace(/^hui-/,"")))&&(s.type==="module"?await import(s.url).catch(()=>{}):await new Promise(i=>{let r=document.createElement("script");r.src=s.url,r.onload=r.onerror=i,document.head.append(r)}))}catch{}return await Promise.race([Promise.all(e.map(a=>customElements.whenDefined(a))),new Promise(a=>setTimeout(a,3e3))]),t()}async function ot(o,e){let t=await window.loadCardHelpers?.().catch(()=>null);if(!t)return null;let a=t.createCardElement(e);return a.hass=o,a}function ze(o,e,t){if(typeof o!="string"||!o.trim().startsWith("[[["))return o;let a=o.trim().slice(3,-3);try{return new Function("entity","states","hass","variables",a)(t,e.states,e,{})}catch{return""}}var U=class extends b{constructor(){super(),this.needs=[],this._real=null,this._missing=null}async updated(e){if(e.has("config")||e.has("needs")){let t=await it(this.hass,this.needs);this._missing=t;let a=t.length?null:await ot(this.hass,this.config);this._real=a}this._real&&(this._real.hass=this.hass)}render(){return this.config?this.bare?this._real??this._draw(this.config):n`
      ${this._missing?.length?n`<p class="warning">${this.t("needs_cards",{cards:this._missing.join(", ")})}</p>`:c}
      <small>${this._real?this.t("preview_real"):this.t("preview_drawing")}</small>
      <div class="frame">${this._real??this._draw(this.config)}</div>
    `:c}_draw(e){let t=this.hass.states?.[e.entity];switch(e.type){case"vertical-stack":return n`<div class="stack">${e.cards.map(a=>this._draw(a))}</div>`;case"horizontal-stack":return n`<div class="hstack">${e.cards.map(a=>this._draw(a))}</div>`;case"grid":return n`
          ${e.title?n`<div class="title">${e.title}</div>`:c}
          <div class="grid" style="grid-template-columns: repeat(${e.columns??3}, minmax(0, 1fr))">
            ${e.cards.map(a=>this._draw(a))}
          </div>
        `;case"heading":return n`<div class="title big">${e.heading}</div>`;case"custom:button-card":{let a=(e.state??[]).find(l=>l.operator==="template"&&ze(l.value,this.hass,t)),s=a?a.styles?.card?"active":"lit":"",i=(e.styles?.grid??[]).some(l=>l["grid-template-areas"]),r=(e.styles?.card??[]).map(l=>Object.entries(l)[0]).filter(([l])=>l==="height");return n`<div
          class="button ${s} ${i?"room":""}"
          style=${r.map(([l,d])=>`${l}:${d}`).join(";")}
        >
          ${e.show_icon!==!1&&e.icon?i?n`<span class="room-icon"><ha-icon .icon=${e.icon}></ha-icon></span>`:n`<ha-icon .icon=${e.icon}></ha-icon>`:c}
          ${e.show_name!==!1&&e.name?n`<span class="name ${e.styles?.name?.some(l=>l["font-size"]==="28px")?"huge":""}">${ze(e.name,this.hass,t)}</span>`:c}
          ${e.show_label?n`<small>${ze(e.label,this.hass,t)}</small>`:c}
        </div>`}case"custom:bubble-card":return e.card_type==="pop-up"?n`<div class="popup-head">
            <span class="round"><ha-icon .icon=${e.icon??"mdi:circle"}></ha-icon></span>
            <b>${e.name}</b>
            <code>${e.hash}</code>
          </div>`:n`<div class="pill">
          <span class="round"><ha-icon .icon=${e.icon??"mdi:circle"}></ha-icon></span>
          <b>${e.name}</b>
          <small>${t?t.attributes?.[e.attribute]??t.state:""}${e.attribute==="current_temperature"?"\xB0":""}</small>
        </div>`;case"tile":return n`<div class="tile ${t?.state==="on"?"on":""}">
          <span class="round"><ha-icon .icon=${t?.attributes?.icon??"mdi:lightbulb"}></ha-icon></span>
          <span><b>${e.name??t?.attributes?.friendly_name??e.entity}</b><small>${t?.state??""}</small></span>
        </div>`;default:return n`<div class="unknown">${e.type}</div>`}}};m(U,"properties",{hass:{attribute:!1},config:{attribute:!1},needs:{attribute:!1},t:{attribute:!1},bare:{type:Boolean},_real:{state:!0},_missing:{state:!0}}),m(U,"styles",g`
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

    .unknown {
      padding: 8px;
      border: 1px dashed var(--divider-color);
      border-radius: 8px;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
  `);customElements.get("ss-card-preview")||customElements.define("ss-card-preview",U);var Mt={off:"mdi:power",cool:"mdi:snowflake",heat:"mdi:fire",auto:"mdi:thermostat-auto",dry:"mdi:water-percent",fan_only:"mdi:fan",heat_cool:"mdi:sun-snowflake-variant"},Bt={auto:"mdi:fan-auto",low:"mdi:fan-speed-1",medium:"mdi:fan-speed-2",middle:"mdi:fan-speed-2",high:"mdi:fan-speed-3"},N=o=>String(o).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"airco";function le(o){let e=o?.attributes??{},t=a=>{if(!Array.isArray(a)||a.length<2)return null;let s=a.find(r=>String(r).toLowerCase()==="off"),i=a.find(r=>r!==s);return s&&i?{off:s,on:i}:null};return{modes:Array.isArray(e.hvac_modes)?e.hvac_modes:[],fanModes:Array.isArray(e.fan_modes)?e.fan_modes:[],swing:t(e.swing_modes),swingHorizontal:t(e.swing_horizontal_modes),temperature:e.temperature!==void 0||e.target_temp_low===void 0,min:Number(e.min_temp??16),max:Number(e.max_temp??30),step:Number(e.target_temp_step??.5)}}function rt(o,e,t){let a=le(e);return{entity:o,name:t,hash:`#airco-${N(t.replace(/^airco\s*/i,"")||o.split(".")[1])}`,modes:[...a.modes],fan:a.fanModes.length>0,swing:!!a.swing,swing_horizontal:!!a.swingHorizontal,temperature:a.temperature,opener:!0}}var Lt={card:[{"background-color":"var(--state-climate-active-color, var(--primary-color))"}],name:[{color:"var(--text-primary-color, #fff)"}],icon:[{color:"var(--text-primary-color, #fff)"}],label:[{color:"var(--text-primary-color, #fff)"}]};function z(o,{name:e,icon:t,tap:a,active:s,extra:i={}}){return{type:"custom:button-card",entity:o,name:e,icon:t,show_state:!1,show_name:!0,show_icon:!!t,tap_action:a??{action:"none"},hold_action:{action:"none"},styles:{card:[{"border-radius":"18px"},{padding:"10px 4px"},{"box-shadow":"none"},{"background-color":"var(--bubble-main-background-color, var(--secondary-background-color))"}],name:[{"font-size":"13px"},{"font-weight":"500"}],icon:[{width:"24px"}]},...s?{state:[{operator:"template",value:`[[[ return ${s}; ]]]`,styles:Lt}]}:{},...i}}var j=(o,e,t)=>({action:"perform-action",perform_action:e,target:{entity_id:o},data:t});function nt(o,e,t){let{entity:a}=o,s=le(e),i=[{type:"custom:bubble-card",card_type:"pop-up",hash:o.hash,name:o.name,icon:"mdi:air-conditioner",entity:a}];if(o.temperature){let p=x=>`Math.round((${x}) * 10) / 10`,u=`Number(entity.attributes.temperature ?? ${s.min})`,v={card:[{height:"88px"}],icon:[{width:"36px"}]};i.push({type:"grid",columns:3,square:!1,cards:[z(a,{icon:"mdi:minus",tap:j(a,"climate.set_temperature",{temperature:`[[[ return Math.max(${s.min}, ${p(`${u} - ${s.step}`)}); ]]]`}),extra:{show_name:!1,styles:{card:v.card,icon:v.icon}}}),z(a,{name:"[[[ return (entity.attributes.temperature ?? '\u2013') + '\xB0'; ]]]",extra:{show_label:!0,label:`[[[ return '${t.now} ' + (entity.attributes.current_temperature ?? '\u2013') + '\xB0'; ]]]`,styles:{card:v.card,name:[{"font-size":"28px"},{"font-weight":"600"}],label:[{"font-size":"12px"},{opacity:"0.7"}]}}}),z(a,{icon:"mdi:plus",tap:j(a,"climate.set_temperature",{temperature:`[[[ return Math.min(${s.max}, ${p(`${u} + ${s.step}`)}); ]]]`}),extra:{show_name:!1,styles:{card:v.card,icon:v.icon}}})]})}let r=s.modes.filter(p=>o.modes.includes(p));r.length&&i.push({type:"grid",title:t.mode,columns:Math.min(r.length,3),square:!1,cards:r.map(p=>z(a,{name:t.modes[p]??p,icon:Mt[p]??"mdi:thermostat",tap:j(a,"climate.set_hvac_mode",{hvac_mode:p}),active:`entity.state === '${p}'`}))}),o.fan&&s.fanModes.length&&i.push({type:"grid",title:t.fan,columns:Math.min(s.fanModes.length,4),square:!1,cards:s.fanModes.map(p=>z(a,{name:t.fanModes[p]??String(p).charAt(0).toUpperCase()+String(p).slice(1),icon:Bt[p]??"mdi:fan",tap:j(a,"climate.set_fan_mode",{fan_mode:p}),active:`entity.attributes.fan_mode === '${p}'`}))});let l=[];if(o.swing&&s.swing){let{on:p,off:u}=s.swing;l.push(z(a,{name:t.swingVertical,icon:"mdi:arrow-up-down",tap:j(a,"climate.set_swing_mode",{swing_mode:`[[[ return entity.attributes.swing_mode === '${u}' ? '${p}' : '${u}'; ]]]`}),active:`entity.attributes.swing_mode !== '${u}'`}))}if(o.swing_horizontal&&s.swingHorizontal){let{on:p,off:u}=s.swingHorizontal;l.push(z(a,{name:t.swingHorizontal,icon:"mdi:arrow-left-right",tap:j(a,"climate.set_swing_horizontal_mode",{swing_horizontal_mode:`[[[ return entity.attributes.swing_horizontal_mode === '${u}' ? '${p}' : '${u}'; ]]]`}),active:`entity.attributes.swing_horizontal_mode !== '${u}'`}))}l.length&&i.push({type:"grid",title:t.swing,columns:l.length,square:!1,cards:l});let d={type:"vertical-stack",cards:i},h=o.opener?{type:"custom:bubble-card",card_type:"button",button_type:"name",entity:a,name:o.name,icon:"mdi:air-conditioner",show_state:!0,show_attribute:!0,attribute:"current_temperature",tap_action:{action:"navigate",navigation_path:o.hash},button_action:{tap_action:{action:"navigate",navigation_path:o.hash}}}:null;return{popup:d,opener:h}}var lt=o=>e=>e?.type==="vertical-stack"&&e.cards?.[0]?.type==="custom:bubble-card"&&e.cards[0].card_type==="pop-up"&&e.cards[0].hash===o,ct=o=>e=>e?.type==="custom:bubble-card"&&e.card_type==="button"&&(e.tap_action?.navigation_path===o||e.button_action?.tap_action?.navigation_path===o);var ce=["button-card","bubble-card"],W=class extends _{constructor(){super(),this._options={},this._dashboard=null,this._views=null,this._view=0}connectedCallback(){super.connectedCallback();let e=this._entities()[0];e&&this._pickEntity(e),this._loadDashboards()}_entities(){return Object.keys(this.hass.states).filter(e=>e.startsWith("climate.")).sort()}_defaultName(e){let t=this.hass.entities?.[e],a=t?.area_id??this.hass.devices?.[t?.device_id]?.area_id,s=a?this.hass.areas?.[a]?.name:null,i=this.hass.states[e]?.attributes?.friendly_name??e;return s?`${this.t("cl_section")} ${s.toLowerCase()}`:i}_pickEntity(e){this._entity=e,this._options[e]||(this._options={...this._options,[e]:rt(e,this.hass.states[e],this._defaultName(e))})}get _opts(){return this._options[this._entity]}_set(e,t){this._options={...this._options,[this._entity]:{...this._opts,[e]:t}}}async _loadDashboards(){this._dashboards=await re(this.hass,this.hass.localize("panel.states")||"Overview");let e=this._dashboards.find(t=>t.editable)??this._dashboards[0];e&&this._pickDashboard(e.url_path)}async _pickDashboard(e){this._dashboard=e,this._views=null;try{let t=await V(this.hass,e);this._views=t.views??[],this._view=0}catch(t){this._views=[],this._error(t)}}get _labels(){let e=this.t,t=Object.fromEntries(["off","cool","heat","auto","dry","fan_only","heat_cool"].map(s=>[s,e(`mode_${s}`)])),a=Object.fromEntries(["auto","low","medium","middle","high"].map(s=>[s,e(`fan_${s}`)]));return{now:e("cl_now_label"),mode:e("cl_modes"),fan:e("cl_fan"),swing:e("cl_swing_title"),swingVertical:e("cl_swing_v"),swingHorizontal:e("cl_swing_h"),modes:t,fanModes:a}}_cards(){return nt(this._opts,this.hass.states[this._entity],this._labels)}_put(){let e=this._dashboards.find(s=>s.url_path===this._dashboard),t=this._views[this._view],a=t?.title??t?.path??`${this._view+1}`;this._ask(this.t("cl_add_confirm",{hash:this._opts.hash,view:a}),()=>this._run(async()=>{let s=await V(this.hass,e.url_path),i=JSON.parse(JSON.stringify(s)),r=i.views[this._view],{popup:l,opener:d}=this._cards(),h=[{card:l,match:lt(this._opts.hash)}];d&&h.push({card:d,match:ct(this._opts.hash)});let p=st(r,h,this.t("cl_section"));await ne(this.hass,e.url_path,s,i),this._views=i.views,this._showToast(this.t("cl_added",{view:a,replaced:p}))}))}render(){let e=this._entities();if(!e.length)return n`<p class="intro">${this.t("climate_intro")}</p>
        <div class="card"><p class="hint">${this.t("no_climate")}</p></div>`;let t=this._opts,a=this.hass.states[this._entity],s=le(a),{popup:i}=this._cards();return n`
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
            ${this._switch(t,"temperature",this.t("cl_temperature"),this.t("cl_temperature_hint",{min:s.min,max:s.max,step:s.step}))}
            <div class="row column">
              <span>${this.t("cl_modes")}</span>
              <div class="modes">
                ${s.modes.map(r=>n`<label class="mode">
                    <input
                      type="checkbox"
                      .checked=${t.modes.includes(r)}
                      @change=${l=>this._set("modes",l.target.checked?[...t.modes,r]:t.modes.filter(d=>d!==r))}
                    />
                    ${this.t(`mode_${r}`)}
                  </label>`)}
              </div>
            </div>
            ${s.fanModes.length?this._switch(t,"fan",this.t("cl_fan"),s.fanModes.join(", ")):this._unavailable(this.t("cl_fan"),this.t("cl_fan_none"))}
            ${s.swing?this._switch(t,"swing",this.t("cl_swing_v")):this._unavailable(this.t("cl_swing_v"),this.t("cl_swing_none"))}
            ${s.swingHorizontal?this._switch(t,"swing_horizontal",this.t("cl_swing_h")):this._unavailable(this.t("cl_swing_h"),this.t("cl_swing_none"))}
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
            .needs=${ce}
            .config=${{type:"vertical-stack",cards:i.cards.slice(1)}}
          ></ss-card-preview>
        </aside>
      </div>
      ${this._bar({})}
    `}_unavailable(e,t){return n`<div class="row off">
      <span>${e}<small>${t}</small></span>
      <ha-icon icon="mdi:minus-circle-outline"></ha-icon>
    </div>`}_placeCard(){let e=this._dashboards??[],t=e.find(i=>i.url_path===this._dashboard),a=this._views?.[this._view],s=a?.type==="panel";return n`
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
        ${t&&!t.editable?this._warning(this.t("cl_readonly")):c}
        <label class="row">
          <span>${this.t("cl_view")}</span>
          <select @change=${i=>this._view=Number(i.target.value)}>
            ${(this._views??[]).map((i,r)=>n`<option value=${r} ?selected=${r===this._view}>
                ${i.title??i.path??r+1}
              </option>`)}
          </select>
        </label>
        ${s?this._warning(this.t("cl_panel_view")):c}
        ${this._switch(this._opts,"opener",this.t("cl_opener"))}
        <button
          class="primary place"
          ?disabled=${this._busy||!t?.editable||!a||s}
          @click=${this._put}
        >
          ${this.t("cl_add")}
        </button>
      </div>
    `}};m(W,"properties",{..._.properties,_entity:{state:!0},_options:{state:!0},_dashboards:{state:!0},_dashboard:{state:!0},_views:{state:!0},_view:{state:!0}}),m(W,"styles",[_.styles,g`
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
    `]);customElements.get("ss-climate-tab")||customElements.define("ss-climate-tab",W);var Ce=o=>o==null?o:JSON.parse(JSON.stringify(o)),Oe=(o,e)=>JSON.stringify(o??null)===JSON.stringify(e??null),G=class extends _{connectedCallback(){super.connectedCallback(),this._load()}async _load(){try{this._accept(await this.hass.callWS({type:"style_studio/people/get"}))}catch(e){this._error(e)}}_accept(e){this._state=e,this._draft=this._fromSaved()}_fromSaved(){return Object.fromEntries(this._state.users.map(e=>{let t=this._state.persons[e.id]??{};return[e.id,{theme:t.theme??null,sidebar:Ce(t.sidebar??null)}]}))}get dirty(){return!!this._state&&!Oe(this._draft,this._fromSaved())}_setPerson(e,t){this._draft={...this._draft,[e]:{...this._draft[e],...t}},this._toast=null}_latest(e){return this._state.reports.find(t=>t.user_id===e)??null}_devices(e){return this._state.reports.filter(t=>t.user_id===e)}_save(){this._run(async()=>{this._accept(await this.hass.callWS({type:"style_studio/people/save",persons:this._draft})),clearTimeout(this._refresh),this._refresh=setTimeout(()=>!this.dirty&&this._load(),4e3)},this.t("saved"))}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._refresh)}_undo(){this._ask(this.t("undo_confirm"),()=>this._run(async()=>{let e=await this.hass.callWS({type:"style_studio/people/undo"});if(!e.restored)throw new Error(this.t("nothing_to_undo"));this._accept(e)},this.t("undone")))}_when(e){let t=(new Date(e).getTime()-Date.now())/1e3,a=new Intl.RelativeTimeFormat(this.hass.locale?.language??"nl",{numeric:"auto"});for(let[s,i]of[["day",86400],["hour",3600],["minute",60]])if(Math.abs(t)>=i)return a.format(Math.round(t/i),s);return a.format(0,"minute")}render(){if(!this._state||!this._draft)return c;let{users:e,themes:t}=this._state;return n`
      <p class="intro">${this.t("people_intro")}</p>
      ${t.length?c:this._warning(this.t("no_themes_yet"))}
      <div class="people">${e.map(a=>this._person(a))}</div>
      ${this._bar({left:this._state.history?n`<button ?disabled=${this._busy} @click=${this._undo}>
              <ha-icon icon="mdi:history"></ha-icon>${this.t("undo")}
            </button>`:c,onCancel:()=>this._draft=this._fromSaved(),onSave:()=>this._save()})}
    `}_person(e){let t=this._draft[e.id],a=this._state.persons[e.id]??{},s=this._latest(e.id),i=this._devices(e.id),r=this._state.users.filter(d=>d.id!==e.id),l=r.filter(d=>this._latest(d.id)?.sidebar);return n`
      <div class="card person" data-user=${e.name}>
        <div class="head">
          <ha-icon icon=${e.is_admin?"mdi:account-star":"mdi:account"}></ha-icon>
          <div class="who">
            <h2>${e.name}</h2>
            <small>
              ${s?n`${this.t("last_seen",{when:this._when(s.at)})} ·
                  ${i.length===1?this.t("device_one"):this.t("devices",{count:i.length})}
                  ${i.some(d=>d.app)?n`<em>${this.t("app_badge")}</em>`:c}`:this.t("never_seen")}
            </small>
          </div>
          <label class="copy">
            <span>${this.t("copy_all_from")}</span>
            <select
              aria-label="${this.t("copy_all_from")} (${e.name})"
              @change=${d=>{let h=d.target.value;if(d.target.value="",!h)return;let p=this._draft[h];this._setPerson(e.id,{theme:p.theme??this._latest(h)?.theme??null,sidebar:Ce(p.sidebar??this._latest(h)?.sidebar??null)})}}
            >
              <option value="">${this.t("pick_person")}</option>
              ${r.map(d=>n`<option value=${d.id}>${d.name}</option>`)}
            </select>
          </label>
        </div>

        <div class="row">
          <span>
            ${this.t("person_theme")}
            <small>${this.t("now_uses",{value:s?s.theme||this.t("ha_default"):this.t("unknown")})}</small>
            ${this._status(e,t.theme,a.theme,s?.theme,s)}
          </span>
          <select
            aria-label="${this.t("person_theme")} (${e.name})"
            .value=${t.theme??""}
            @change=${d=>this._setPerson(e.id,{theme:d.target.value||null})}
          >
            <option value="" ?selected=${!t.theme}>${this.t("self_choice")}</option>
            ${this._themeOptions(t.theme)}
          </select>
        </div>

        <div class="row">
          <span>
            ${this.t("person_sidebar")}
            <small>${this._sidebarSummary(t.sidebar??s?.sidebar)}</small>
            ${this._status(e,t.sidebar,a.sidebar,s?.sidebar,s)}
          </span>
          <select
            aria-label="${this.t("person_sidebar")} (${e.name})"
            @change=${d=>{let h=d.target.value;h===""?this._setPerson(e.id,{sidebar:null}):h!=="keep"&&this._setPerson(e.id,{sidebar:Ce(this._latest(h).sidebar)})}}
          >
            <option value="" ?selected=${!t.sidebar}>${this.t("self_choice")}</option>
            ${t.sidebar?n`<option value="keep" selected>${this._sidebarSummary(t.sidebar)}</option>`:c}
            ${l.map(d=>n`<option value=${d.id}>${this.t("like_person",{name:d.name})}</option>`)}
            ${s?.sidebar?n`<option value=${e.id}>${this.t("like_person",{name:e.name})}</option>`:c}
          </select>
        </div>
      </div>
    `}_themeOptions(e){let t=[...this._state.themes];return e&&!t.includes(e)&&t.push(e),t.map(a=>n`<option ?selected=${a===e}>${a}</option>`)}_sidebarSummary(e){return e?[this.t("order_count",{count:e.panelOrder?.length??0}),this.t("hidden_count",{count:e.hiddenPanels?.length??0})].join(" \xB7 "):this.t("unknown")}_status(e,t,a,s,i){if(t==null||!Oe(t,a))return c;let r=i&&Oe(s,a);return n`<small class=${r?"ok":"wait"}>
      <ha-icon icon=${r?"mdi:check-circle":"mdi:clock-outline"}></ha-icon>
      ${r?this.t("applied"):this.t("pending",{name:e.name})}
    </small>`}};m(G,"properties",{..._.properties,_state:{state:!0},_draft:{state:!0}}),m(G,"styles",[_.styles,g`
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
    `]);customElements.get("ss-people-tab")||customElements.define("ss-people-tab",G);var Rt="__other";function Vt(o,e){let t=s=>{let i=o.entities?.[s];return!i||i.hidden?!1:(i.area_id??o.devices?.[i.device_id]?.area_id)===e},a=Object.keys(o.states).filter(t).sort();return{lights:a.filter(s=>s.startsWith("light.")),climate:a.find(s=>s.startsWith("climate."))??null}}function dt(o,e){let t=Object.values(o.floors??{}).sort((s,i)=>(s.level??0)-(i.level??0)||s.name.localeCompare(i.name)).map(s=>({id:s.floor_id,name:s.name,areas:[]})),a={id:Rt,name:e,areas:[]};for(let s of Object.values(o.areas??{}).sort((i,r)=>i.name.localeCompare(r.name)))(t.find(i=>i.id===s.floor_id)??a).areas.push(s.area_id);return[...t,a].filter(s=>s.areas.length)}function ht(o,e){let{lights:t,climate:a}=Vt(o,e.area_id);return{include:t.length>0||!!a,name:e.name,icon:e.icon||"mdi:home-outline",lights:t,climate:a,climate_button:!!a}}var pt=o=>`#l-${N(o)}`,Te=o=>`#airco-${N(o)}`;function je(o,e){let t=JSON.stringify(o.lights),a=`${t}.some((e) => states[e] && states[e].state === 'on')`;return{type:"custom:button-card",name:o.name,icon:o.icon,show_label:!0,label:`[[[ const on = ${t}.filter((e) => states[e] && states[e].state === 'on').length; return on ? on + ' ${e.on}' : '${e.off}'; ]]]`,tap_action:{action:"navigate",navigation_path:pt(o.name)},hold_action:{action:"none"},styles:{grid:[{"grid-template-areas":'"i" "n" "l"'},{"justify-items":"start"}],card:[{padding:"14px"},{"border-radius":"var(--ha-card-border-radius, 16px)"},{"min-height":"96px"}],img_cell:[{width:"40px"},{height:"40px"},{"border-radius":"50%"},{"background-color":"var(--secondary-background-color)"},{"justify-content":"center"}],icon:[{width:"22px"},{color:"var(--state-icon-color)"}],name:[{"font-weight":"600"},{"justify-self":"start"},{"margin-top":"10px"}],label:[{"justify-self":"start"},{"font-size":"12px"},{color:"var(--secondary-text-color)"}]},state:[{operator:"template",value:`[[[ return ${a}; ]]]`,styles:{img_cell:[{"background-color":"var(--bubble-icon-background-color, var(--secondary-background-color))"}],icon:[{color:"var(--state-light-active-color)"}]}}]}}function Ne(o,e,t){let s=[{type:"custom:bubble-card",card_type:"pop-up",hash:pt(o.name),name:o.name,icon:o.icon,show_header:e.show_header,width_desktop:`${e.width_desktop}px`,margin_top_mobile:`${e.margin_top_mobile}%`,bg_opacity:e.glass?String(e.opacity):"100",bg_blur:e.glass?"14":"0"}];for(let i of o.lights)s.push({type:"tile",entity:i,features:[{type:"light-brightness"}]});if(o.climate&&o.climate_button){let i=Te(o.name);s.push({type:"custom:bubble-card",card_type:"button",button_type:"name",entity:o.climate,name:t.climate,icon:"mdi:air-conditioner",show_state:!0,show_attribute:!0,attribute:"current_temperature",tap_action:{action:"navigate",navigation_path:i},button_action:{tap_action:{action:"navigate",navigation_path:i}}})}return{type:"vertical-stack",cards:s}}function ut(o,e,t){let a=e.filter(s=>s.rooms.length).map(s=>({type:"grid",cards:[{type:"heading",heading:s.name},...s.rooms.map(i=>je(i,t)),...s.rooms.map(i=>Ne(i,o.popup,t))]}));return{title:o.title,path:o.path,icon:"mdi:home-floor-plan",type:"sections",max_columns:Math.max(1,Math.min(4,a.length)),sections:a}}var I=class extends _{connectedCallback(){super.connectedCallback();let e=dt(this.hass,this.t("rm_other"));this._order=Object.fromEntries(e.map(t=>[t.id,[...t.areas]])),this._floorNames=Object.fromEntries(e.map(t=>[t.id,t.name])),this._rooms=Object.fromEntries(Object.values(this.hass.areas??{}).map(t=>[t.area_id,ht(this.hass,t)])),this._settings={title:this.t("tab_rooms").split(" ")[0],path:"kamers",popup:{glass:!1,opacity:80,width_desktop:540,margin_top_mobile:20,show_header:!0}},this._open=null,this._loadDashboards()}async _loadDashboards(){this._dashboards=await re(this.hass,this.hass.localize("panel.states")||"Overview"),this._dashboard=(this._dashboards.find(e=>e.editable)??this._dashboards[0])?.url_path??null}get _labels(){return{on:this.t("rm_on"),off:this.t("rm_off"),climate:this.t("rm_climate_label")}}_floors(){return Object.entries(this._order).map(([e,t])=>({id:e,name:this._floorNames[e],rooms:t.map(a=>this._rooms[a]).filter(a=>a?.include)}))}_room(e,t){this._rooms={...this._rooms,[e]:{...this._rooms[e],...t}}}_move(e,t,a){let s=[...this._order[e]],i=t+a;i<0||i>=s.length||([s[t],s[i]]=[s[i],s[t]],this._order={...this._order,[e]:s})}_setPopup(e,t){this._settings={...this._settings,popup:{...this._settings.popup,[e]:t}}}_create(){let e=this._dashboards.find(s=>s.url_path===this._dashboard),{title:t,path:a}=this._settings;this._run(async()=>{let s=await V(this.hass,e.url_path),i=(s.views??[]).some(r=>r.path===a);this._ask(this.t(i?"rm_replace_confirm":"rm_create_confirm",{title:t}),()=>this._run(async()=>{let r=JSON.parse(JSON.stringify(s));r.views??=[];let l=ut(this._settings,this._floors(),this._labels),d=r.views.findIndex(h=>h.path===a);d===-1?r.views.push(l):r.views[d]=l,await ne(this.hass,e.url_path,s,r)},this.t("rm_created",{title:t})))})}render(){if(!Object.keys(this.hass.areas??{}).length)return n`<p class="intro">${this.t("rooms_intro")}</p>
        <div class="card"><p class="hint">${this.t("no_areas")}</p></div>`;let e=this._settings,t=e.popup,a=this._dashboards??[],s=a.find(i=>i.url_path===this._dashboard);return n`
      <p class="intro">${this.t("rooms_intro")}</p>
      <div class="layout">
        <div class="settings">
          <div class="card">
            <h2>${this.t("rm_view")}</h2>
            <label class="row">
              <span>${this.t("cl_dashboard")}</span>
              <select @change=${i=>this._dashboard=i.target.value||null}>
                ${a.map(i=>n`<option value=${i.url_path??""} ?selected=${i.url_path===this._dashboard}>
                    ${i.title}
                  </option>`)}
              </select>
            </label>
            ${s&&!s.editable?this._warning(this.t("cl_readonly")):c}
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
                @change=${i=>this._settings={...e,path:N(i.target.value)||"kamers"}}
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
            ${t.glass?this._popupSlider("opacity",this.t("rm_opacity"),30,100,"%"):c}
            ${this._popupSlider("width_desktop",this.t("rm_width"),360,900,"px")}
            ${this._popupSlider("margin_top_mobile",this.t("rm_height"),0,60,"%")}
            <label class="row">
              <span>${this.t("rm_header")}</span>
              <input
                type="checkbox"
                class="switch"
                .checked=${t.show_header}
                @change=${i=>this._setPopup("show_header",i.target.checked)}
              />
            </label>
          </div>

          ${Object.entries(this._order).map(([i,r])=>this._floorCard(i,r))}

          <button
            class="primary create"
            ?disabled=${this._busy||!s?.editable||!this._floors().some(i=>i.rooms.length)}
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
    `}_popupSlider(e,t,a,s,i){let r=this._settings.popup;return n`
      <label class="row slider">
        <span>${t}</span>
        <span class="inline">
          <input
            type="range"
            min=${a}
            max=${s}
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
        ${t.map((a,s)=>{let i=this._rooms[a];return n`
            <div class="room ${i.include?"":"off"}">
              <input
                type="checkbox"
                aria-label="${this.t("rm_include")} ${i.name}"
                .checked=${i.include}
                @change=${r=>this._room(a,{include:r.target.checked})}
              />
              <ha-icon .icon=${i.icon}></ha-icon>
              <div class="fields">
                <input
                  type="text"
                  aria-label=${this.t("cl_name")}
                  .value=${i.name}
                  @input=${r=>this._room(a,{name:r.target.value})}
                />
                <input
                  type="text"
                  class="icon-field"
                  aria-label=${this.t("rm_icon")}
                  .value=${i.icon}
                  @change=${r=>/^mdi:[a-z0-9-]+$/.test(r.target.value.trim())&&this._room(a,{icon:r.target.value.trim()})}
                />
                <details>
                  <summary>
                    ${i.lights.length===1?this.t("rm_light_one"):i.lights.length?this.t("rm_lights",{count:i.lights.length}):this.t("rm_no_lights")}
                  </summary>
                  ${this._lightChoices(a,i)}
                </details>
                ${i.climate?n`<label class="climate">
                      <input
                        type="checkbox"
                        .checked=${i.climate_button}
                        @change=${r=>this._room(a,{climate_button:r.target.checked})}
                      />
                      ${this.t("rm_climate")}
                      <small>${this.t("rm_climate_hint",{hash:Te(i.name)})}</small>
                    </label>`:c}
              </div>
              <span class="moves">
                <button class="icon" title=${this.t("move_up")} ?disabled=${s===0} @click=${()=>this._move(e,s,-1)}>
                  <ha-icon icon="mdi:arrow-up"></ha-icon>
                </button>
                <button
                  class="icon"
                  title=${this.t("move_down")}
                  ?disabled=${s===t.length-1}
                  @click=${()=>this._move(e,s,1)}
                >
                  <ha-icon icon="mdi:arrow-down"></ha-icon>
                </button>
              </span>
            </div>
          `})}
      </div>
    `}_lightChoices(e,t){let a=Object.keys(this.hass.states).filter(s=>s.startsWith("light.")).sort();return n`<div class="lights">
      ${a.map(s=>n`<label>
          <input
            type="checkbox"
            .checked=${t.lights.includes(s)}
            @change=${i=>this._room(e,{lights:i.target.checked?[...t.lights,s]:t.lights.filter(r=>r!==s)})}
          />
          ${this.hass.states[s].attributes.friendly_name??s}
        </label>`)}
    </div>`}_preview(){let e=this._floors().filter(a=>a.rooms.length),t=e.flatMap(a=>a.rooms).find(a=>a.name===this._open)??null;return n`
      <div class="columns">
        ${e.map(a=>n`<div class="column">
            <div class="floor-name">${a.name}</div>
            ${a.rooms.map(s=>n`<button class="pick" @click=${()=>this._open=s.name}>
                <ss-card-preview
                  bare
                  .hass=${this.hass}
                  .t=${this.t}
                  .needs=${ce}
                  .config=${je(s,this._labels)}
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
              .needs=${ce}
              .config=${{type:"vertical-stack",cards:Ne(t,this._settings.popup,this._labels).cards.slice(1)}}
            ></ss-card-preview>`:n`<p class="hint">${this.t("rm_pick_room")}</p>`}
    `}};m(I,"properties",{..._.properties,_settings:{state:!0},_rooms:{state:!0},_order:{state:!0},_dashboards:{state:!0},_dashboard:{state:!0},_selected:{state:!0},_open:{state:!0}}),m(I,"styles",[_.styles,g`
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
    `]);customElements.get("ss-rooms-tab")||customElements.define("ss-rooms-tab",I);var K=-1,J=class extends b{constructor(){super(),this.items=[],this.categories=[],this.hidden=[],this._selected=null,this._confirm=null,this._dropTarget=null}_emit(e,t=this.hidden){let a=this.canHide?{categories:e,hidden:t}:{categories:e};this.dispatchEvent(new CustomEvent("change",{detail:a}))}_clone(){return this.categories.map(e=>({...e,panels:[...e.panels]}))}_move(e,t,a=null){let s=this._clone();for(let i of s)i.panels=i.panels.filter(r=>r!==e);if(t!==K){let i=s[t].panels,r=a===null?-1:i.indexOf(a);i.splice(r===-1?i.length:r,0,e)}this._emit(s)}_shift(e,t,a){let s=this._clone(),i=s[t].panels,r=i.indexOf(e),l=r+a;r===-1||l<0||l>=i.length||([i[r],i[l]]=[i[l],i[r]],this._emit(s))}_toggleHidden(e){let t=this.hidden.includes(e)?this.hidden.filter(a=>a!==e):[...this.hidden,e];this._emit(this.categories,t)}_addGroup(){let e=new Set(this.categories.map(a=>a.name.toLowerCase())),t=this.t("new_group");for(let a=2;e.has(t.toLowerCase());a+=1)t=`${this.t("new_group")} ${a}`;this._emit([...this._clone(),{name:t,panels:[]}])}_rename(e,t){let a=this._clone();a[e].name=t.trim()||a[e].name,this._emit(a)}_swapGroups(e,t){let a=this._clone(),s=e+t;s<0||s>=a.length||([a[e],a[s]]=[a[s],a[e]],this._emit(a))}_removeGroup(e){this._confirm=null,this._emit(this._clone().filter((t,a)=>a!==e))}_item(e){return this.items.find(t=>t.path===e)??{path:e,title:e,icon:"mdi:help",missing:!0}}render(){let e=new Set(this.categories.flatMap(a=>a.panels)),t=this.items.filter(a=>!e.has(a.path));return n`
      ${this._zone(K,t,n`
        <div class="title">
          <strong>${this.t("ungrouped")}</strong>
          <span class="hint">${this.t("ungrouped_hint")}</span>
        </div>
      `)}
      ${this.categories.map((a,s)=>this._zone(s,a.panels.map(i=>this._item(i)),this._groupHeader(a,s)))}
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
          @change=${a=>this._rename(t,a.target.value)}
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
    `}_zone(e,t,a){let s=this._selected,i=s&&s.group!==e;return n`
      <section
        class="zone ${this._dropTarget===e?"over":""}"
        @dragover=${r=>this._dragOver(r,e)}
        @dragleave=${()=>this._dropTarget=null}
        @drop=${r=>this._drop(r,e,null)}
      >
        ${a}
        <div class="chips">
          ${t.map(r=>this._chip(r,e))}
          ${!t.length&&e!==K?n`<span class="hint">${this.t("empty_group")}</span>`:c}
        </div>
        ${i?n`<button class="here" @click=${()=>this._moveSelected(e)}>
              <ha-icon icon="mdi:arrow-down-bold"></ha-icon>${this.t("move_here")}
            </button>`:c}
      </section>
    `}_chip(e,t){let a=this.hidden.includes(e.path),s=this._selected?.path===e.path,i=t===K?[]:this.categories[t].panels,r=i.indexOf(e.path);return n`
      <div
        class="chip ${a?"hidden":""} ${s?"selected":""}"
        draggable=${this.disabled?"false":"true"}
        @dragstart=${l=>{l.dataTransfer.setData("text/plain",e.path),l.dataTransfer.effectAllowed="move"}}
        @dragend=${()=>this._dropTarget=null}
        @drop=${l=>{l.stopPropagation(),this._drop(l,t,e.path)}}
      >
        <button
          class="label"
          ?disabled=${this.disabled}
          aria-pressed=${s?"true":"false"}
          @click=${()=>this._selected=s?null:{path:e.path,group:t}}
        >
          <ha-icon .icon=${e.icon}></ha-icon>
          <span>${e.title}</span>
          ${e.missing?n`<em>${this.t("missing")}</em>`:c}
        </button>
        ${s&&t!==K?n`
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
            `:c}
        ${this.canHide?n`<button
              class="icon"
              title=${a?this.t("show"):this.t("hide")}
              ?disabled=${this.disabled}
              @click=${()=>this._toggleHidden(e.path)}
            >
              <ha-icon icon=${a?"mdi:eye-off-outline":"mdi:eye-outline"}></ha-icon>
            </button>`:c}
      </div>
    `}_dragOver(e,t){this.disabled||(e.preventDefault(),e.dataTransfer.dropEffect="move",this._dropTarget=t)}_drop(e,t,a){if(this.disabled)return;e.preventDefault(),this._dropTarget=null;let s=e.dataTransfer.getData("text/plain");s&&s!==a&&this._move(s,t,a)}_moveSelected(e){let{path:t}=this._selected;this._selected={path:t,group:e},this._move(t,e)}};m(J,"properties",{items:{attribute:!1},categories:{attribute:!1},hidden:{attribute:!1},disabled:{type:Boolean},canHide:{type:Boolean},t:{attribute:!1},_selected:{state:!0},_confirm:{state:!0},_dropTarget:{state:!0}}),m(J,"styles",g`
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
  `);customElements.get("ss-groups-editor")||customElements.define("ss-groups-editor",J);var mt={phone:{width:430,height:640},tablet:{width:768,height:600},desktop:{width:760,height:560}},F=class extends b{constructor(){super(),this.settingsLabel="Settings",this.items=[],this.device="desktop",this.page="light",this.expanded=!0,this._scale=1}connectedCallback(){super.connectedCallback(),this._resize=new ResizeObserver(()=>this._fit()),this._resize.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this._resize?.disconnect()}updated(e){e.has("device")&&this._fit()}_fit(){let{width:e}=mt[this.device];this._scale=Math.min(1,this.clientWidth/e)||1}render(){let e=this.settings;if(!e)return c;let{width:t,height:a}=mt[this.device];return n`
      <div class="viewport" style="height:${a*this._scale}px">
        <div
          class="screen ${this.page}"
          style="width:${t}px;height:${a}px;transform:scale(${this._scale})"
        >
          ${this.device==="desktop"?this._desktop(e):this._modal(e)}
        </div>
      </div>
    `}_desktop(e){let t=e.floating?e.inset:0,a=(this.expanded?256:56)+t*2;return n`
      <div class="desktop">
        <div class="shell" style="width:${a}px;padding:${t}px;${this._shell(e)}">
          ${this._sidebar(e,{radius:e.floating?e.radius:0,floating:e.floating})}
        </div>
        ${this._page()}
      </div>
    `}_modal(e){let t=this.device==="phone",a=t&&e.floating?e.inset:0,s=t?Math.min(430*.9,e.mobile_width):256;return n`
      ${this._page()}
      <div class="backdrop ${t&&e.mobile_blur?"blurred":""}"></div>
      <div class="drawer ${t?"":"plain"}" style="width:${s}px;padding:${a}px">
        ${this._sidebar(e,{radius:t&&e.floating?e.radius:0,floating:t&&e.floating,opacity:t?Math.min(e.opacity+12,100):e.opacity,phone:t,expanded:!0})}
      </div>
    `}_shell(e){return e.shell==="custom"?`background:${e.shell_color}`:e.shell==="theme"?"background:var(--primary-background-color)":"background:transparent"}_sidebar(e,{radius:t,floating:a,opacity:s=e.opacity,phone:i=!1,expanded:r=this.expanded}){let l=Math.min(Math.max((e.floating?e.radius:0)-6,8),14),d=[`border-radius:${t}px`,`--ss-opacity:${s}%`,`--ss-blur:${e.blur}px`,`--ss-item-radius:${l}px`,`--ss-phone-text:${e.mobile_text_size??14}px`,e.accent?`--sidebar-selected-icon-color:${e.accent};--sidebar-selected-text-color:${e.accent}`:""].join(";"),h=this._rows(e),p=h.find(u=>u.item)?.item.path;return n`
      <nav
        class="sidebar ${a?"floating":""} ${i?"phone":""} ${r?"expanded":""} ${e.highlight}"
        style=${d}
      >
        <div class="menu">
          <ha-icon icon="mdi:menu"></ha-icon>
          ${r?n`<span>Home Assistant</span>`:c}
        </div>
        <div class="list">
          ${h.map(u=>u.heading!==void 0?n`<div class="heading">${r?u.heading:""}</div>`:n`
                  <div
                    class="item ${u.item.path===p?"selected":""} ${e.hover_motion?"motion":""}"
                  >
                    <ha-icon .icon=${u.item.icon}></ha-icon>
                    ${r?n`<span>${u.item.title}</span>`:c}
                  </div>
                `)}
        </div>
        <div class="spacer"></div>
        <div class="item">
          <ha-icon icon="mdi:cog"></ha-icon>
          ${r?n`<span>${this.settingsLabel}</span>`:c}
        </div>
      </nav>
    `}_rows(e){let t=new Set(e.hidden??[]),a=new Set(e.categories.flatMap(l=>l.panels)),s=new Map(this.items.map(l=>[l.path,l])),i=this.items.filter(l=>!a.has(l.path)&&!t.has(l.path)).map(l=>({item:l})),r=new Set;for(let l of e.categories){let d=l.panels.filter(h=>!r.has(h)&&!t.has(h)&&s.has(h)).map(h=>s.get(h));d.forEach(h=>r.add(h.path)),d.length&&(i.push({heading:l.name}),i.push(...d.map(h=>({item:h}))))}return i}_page(){return n`
      <div class="page">
        <div class="toolbar"></div>
        <div class="cards">
          ${[0,1,2,3,4,5].map(()=>n`<div class="card"></div>`)}
        </div>
      </div>
    `}};m(F,"properties",{settings:{attribute:!1},items:{attribute:!1},device:{},page:{},expanded:{type:Boolean},settingsLabel:{},_scale:{state:!0}}),m(F,"styles",g`
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
  `);customElements.get("ss-sidebar-preview")||customElements.define("ss-sidebar-preview",F);var Ut=new Set(["config","profile","notfound"]),_t=o=>o==null?o:JSON.parse(JSON.stringify(o)),Wt=(o,e)=>JSON.stringify(o)===JSON.stringify(e);function Gt(o,e){let t=i=>String(i).split(".").map(r=>parseInt(r,10)||0),[a,s]=[t(o),t(e)];for(let i=0;i<Math.max(a.length,s.length);i+=1)if((a[i]??0)!==(s[i]??0))return(a[i]??0)<(s[i]??0);return!1}var q=class extends _{constructor(){super(),this._draft=null,this._device=window.innerWidth<=600?"phone":window.innerWidth<=870?"tablet":"desktop",this._page="light",this._expanded=!0,this._haSidebar={}}connectedCallback(){super.connectedCallback(),this.hass.callWS({type:"frontend/get_user_data",key:"sidebar"}).then(e=>this._haSidebar=e?.value??{}).catch(()=>{})}willUpdate(e){e.has("glass")&&(this._draft=_t(this.glass?.sidebar??null))}get dirty(){return this._draft!==null&&!Wt(this._draft,this.glass?.sidebar??null)}_set(e,t){this._edit({[e]:t})}_edit(e){this._draft={...this._draft,...e},this._toast=null}_reload(){this.dispatchEvent(new CustomEvent("reload"))}_save(){this._run(async()=>{await this.hass.callWS({type:"style_studio/sidebar/save",sidebar:this._draft}),this._reload()},this.t("saved"))}_undo(){this._ask(this.t("undo_confirm"),()=>this._run(async()=>{let{restored:e}=await this.hass.callWS({type:"style_studio/sidebar/undo"});if(!e)throw new Error(this.t("nothing_to_undo"));this._reload()},this.t("undone")))}_items(){let e=this._haSidebar.panelOrder??[],t=new Set(this._haSidebar.hiddenPanels??[]),a=s=>{let i=e.indexOf(s);return i===-1?e.length:i};return Object.values(this.hass.panels??{}).filter(s=>(s.title||s.url_path==="lovelace")&&!Ut.has(s.url_path)&&!t.has(s.url_path)).map(s=>({path:s.url_path,icon:s.icon||"mdi:view-dashboard",title:this._panelTitle(s)})).sort((s,i)=>a(s.path)-a(i.path)||(i.path==="lovelace")-(s.path==="lovelace")||s.title.localeCompare(i.title))}_panelTitle(e){return e.title?this.hass.localize(`panel.${e.title}`)||e.title:this.hass.localize("panel.states")||"Overview"}render(){let e=this.glass;if(!e)return c;if(!e.version&&!e.added)return n`<div class="card">
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
          </a>`:c}
      ${e.version&&Gt(e.version,e.min_version)?this._warning(this.t("glass_old",{version:e.version,min:e.min_version})):c}
      ${e.loaded?c:this._warning(this.t("glass_not_loaded"))}
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
                      @input=${a=>this._set("accent",a.target.value)}
                    />`:c}
                <input
                  type="checkbox"
                  class="switch"
                  .checked=${!!t.accent}
                  @change=${a=>this._set("accent",a.target.checked?"#f59e0b":null)}
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
              @change=${a=>this._edit(a.detail)}
            ></ss-groups-editor>
          </div>
        </div>

        <aside class="card preview">
          <h2>${this.t("preview")}</h2>
          <p class="hint">${this.t("preview_hint")}</p>
          <div class="segment small">
            ${["phone","tablet","desktop"].map(a=>n`<button
                class=${a===this._device?"active":""}
                @click=${()=>this._device=a}
              >
                ${this.t(`device_${a}`)}
                <small>${{phone:430,tablet:768,desktop:1920}[a]}</small>
              </button>`)}
          </div>
          <div class="segment small">
            ${["light","dark"].map(a=>n`<button
                class=${a===this._page?"active":""}
                @click=${()=>this._page=a}
              >
                ${this.t(`page_${a}`)}
              </button>`)}
            ${this._device==="desktop"?n`<button
                  class=${this._expanded?"active":""}
                  @click=${()=>this._expanded=!this._expanded}
                >
                  ${this.t("expanded")}
                </button>`:c}
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
            </button>`:c,onCancel:()=>this._draft=_t(this.glass.sidebar),onSave:()=>this._save()})}
    `}};m(q,"properties",{..._.properties,glass:{attribute:!1},_draft:{state:!0},_device:{state:!0},_page:{state:!0},_expanded:{state:!0},_haSidebar:{state:!0}});q.styles=[_.styles,g`
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
  `];customElements.get("ss-sidebar-tab")||customElements.define("ss-sidebar-tab",q);var It=["active","auto","cool","dry","heat","heat_cool","fan_only"],Z=class extends b{render(){if(!this.vars)return c;let e=Object.entries(this.vars).map(([a,s])=>`--${a}:${s}`).join(";"),t=this.t;return n`
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
                  ${It.map(a=>n`<i title=${a} style="background:var(--state-climate-${a}-color)"></i>`)}
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
              `:c}
        </div>
      </div>
    `}};m(Z,"properties",{vars:{attribute:!1},t:{attribute:!1},popup:{type:Boolean}}),m(Z,"styles",g`
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
  `);customElements.get("ss-theme-preview")||customElements.define("ss-theme-preview",Z);var Pe=[{key:"basis",nl:"Basis",en:"Basics",vars:[["primary-color","Hoofdkleur","Primary color","color"],["accent-color","Accentkleur","Accent color","color"],["light-primary-color","Hoofdkleur licht","Primary color, light","color"],["dark-primary-color","Hoofdkleur donker","Primary color, dark","color"],["text-primary-color","Tekst op de hoofdkleur","Text on primary color","color"],["primary-background-color","Achtergrond","Background","color"],["secondary-background-color","Tweede achtergrond","Secondary background","color"],["divider-color","Scheidingslijnen","Dividers","color"]]},{key:"text",nl:"Tekst",en:"Text",vars:[["primary-text-color","Tekst","Text","color"],["secondary-text-color","Tekst, tweede","Secondary text","color"],["disabled-text-color","Tekst, uitgeschakeld","Disabled text","color"]]},{key:"header",nl:"Bovenbalk",en:"Top bar",vars:[["app-header-background-color","Achtergrond","Background","color"],["app-header-text-color","Tekst en iconen","Text and icons","color"],["app-header-selection-bar-color","Streep onder actieve tab","Active tab bar","color"],["app-header-edit-background-color","Achtergrond bij bewerken","Background while editing","color"],["app-header-edit-text-color","Tekst bij bewerken","Text while editing","color"]]},{key:"sidebar",nl:"Zijbalk (menu)",en:"Sidebar (menu)",vars:[["sidebar-background-color","Achtergrond","Background","color"],["sidebar-text-color","Tekst","Text","color"],["sidebar-icon-color","Iconen","Icons","color"],["sidebar-selected-icon-color","Icoon actieve pagina","Active page icon","color"],["sidebar-selected-text-color","Tekst actieve pagina","Active page text","color"]]},{key:"cards",nl:"Kaarten",en:"Cards",vars:[["card-background-color","Achtergrond","Background","color"],["ha-card-background","Achtergrond (dashboard)","Background (dashboard)","color"],["ha-card-border-color","Rand","Border","color"],["ha-card-border-width","Randdikte","Border width","size"],["ha-card-border-radius","Hoeken","Corners","size"],["ha-card-box-shadow","Schaduw","Shadow","shadow"]]},{key:"popups",nl:"Pop-ups (Bubble Card)",en:"Pop-ups (Bubble Card)",vars:[["bubble-pop-up-background-color","Achtergrond pop-up","Pop-up background","color"],["bubble-pop-up-main-background-color","Achtergrond inhoud","Content background","color"],["bubble-main-background-color","Knoppen, achtergrond","Buttons, background","color"],["bubble-secondary-background-color","Tweede achtergrond","Secondary background","color"],["bubble-button-background-color","Knop","Button","color"],["bubble-icon-background-color","Achter iconen","Behind icons","color"]]},{key:"dialogs",nl:"Vensters (meer info, instellingen)",en:"Dialogs (more info, settings)",vars:[["ha-dialog-surface-background","Achtergrond","Background","color"],["mdc-theme-surface","Achtergrond (oudere vensters)","Background (older dialogs)","color"],["dialog-box-shadow","Schaduw","Shadow","shadow"],["ha-dialog-border-radius","Hoeken","Corners","size"]]},{key:"controls",nl:"Schakelaars en schuiven",en:"Switches and sliders",vars:[["switch-checked-color","Schakelaar aan","Switch on","color"],["switch-checked-button-color","Knopje aan","Knob on","color"],["switch-checked-track-color","Baan aan","Track on","color"],["switch-unchecked-button-color","Knopje uit","Knob off","color"],["switch-unchecked-track-color","Baan uit","Track off","color"],["slider-color","Schuif","Slider","color"],["slider-bar-color","Baan van de schuif","Slider track","color"]]},{key:"inputs",nl:"Invoervelden",en:"Input fields",vars:[["input-fill-color","Achtergrond","Background","color"],["mdc-text-field-fill-color","Achtergrond (oudere velden)","Background (older fields)","color"],["input-ink-color","Tekst","Text","color"],["input-label-ink-color","Label","Label","color"],["code-editor-background-color","Code-editor","Code editor","color"]]},{key:"states",nl:"Status en iconen",en:"States and icons",vars:[["state-icon-color","Icoon (uit)","Icon (off)","color"],["state-active-color","Aan (algemeen)","On (general)","color"],["state-light-active-color","Lamp aan","Light on","color"],["state-switch-active-color","Schakelaar aan","Switch on","color"],["state-fan-active-color","Ventilator aan","Fan on","color"],["state-cover-active-color","Zonwering open","Cover open","color"],["state-inactive-color","Uit (algemeen)","Off (general)","color"],["state-unavailable-color","Niet beschikbaar","Unavailable","color"]]},{key:"climate",nl:"Airco-ring",en:"Climate ring",vars:[["state-climate-active-color","Actief","Active","color"],["state-climate-auto-color","Auto","Auto","color"],["state-climate-cool-color","Koelen","Cool","color"],["state-climate-dry-color","Drogen","Dry","color"],["state-climate-heat-color","Verwarmen","Heat","color"],["state-climate-heat_cool-color","Koelen en verwarmen","Heat and cool","color"],["state-climate-fan_only-color","Alleen ventilator","Fan only","color"]]},{key:"alerts",nl:"Meldingen",en:"Alerts",vars:[["error-color","Fout","Error","color"],["warning-color","Waarschuwing","Warning","color"],["success-color","Gelukt","Success","color"],["info-color","Informatie","Info","color"]]},{key:"weather",nl:"Weerkaart",en:"Weather card",vars:[["weather-card-gradient","Achtergrond (verloop)","Background (gradient)","text"],["weather-card-accent","Accent","Accent","color"]]}],Y=new Set(Pe.flatMap(o=>o.vars.map(([e])=>e))),y={background:"#f4efe6",card:"#fffaf2",text:"#3b3127",accent:"#f59e0b",sidebar:"#fbf6ec",header:null,radius:16,shadow:"soft",card_opacity:100,popup:"solid",popup_opacity:80},bt={sand:{nl:"Zand en geel",en:"Sand and yellow",base:{...y}},pink:{nl:"Roze",en:"Pink",base:{...y,background:"#fbf1f4",card:"#fffafc",text:"#3d2b33",accent:"#e8749e",sidebar:"#fdf5f8"}},dark:{nl:"Donker",en:"Dark",base:{...y,background:"#111418",card:"#1b1f25",text:"#e6e8eb",accent:"#f5b301",sidebar:"#161a1f",shadow:"none"}},glass:{nl:"Glas",en:"Glass",base:{...y,background:"#dfe7ef",card:"#ffffff",text:"#1f2a37",accent:"#3b82f6",sidebar:"#f3f6fa",radius:20,card_opacity:62,popup:"glass",popup_opacity:72}}},He={none:"none",soft:"0 1px 2px rgba(0, 0, 0, 0.05), 0 4px 14px rgba(0, 0, 0, 0.06)",strong:"0 2px 4px rgba(0, 0, 0, 0.08), 0 12px 32px rgba(0, 0, 0, 0.14)"};function de(o){let e=parseInt(o.slice(1),16);return[e>>16&255,e>>8&255,e&255]}function Kt([o,e,t]){return`#${[o,e,t].map(a=>Math.round(a).toString(16).padStart(2,"0")).join("")}`}function f(o,e,t){let[a,s]=[de(o),de(e)];return Kt(a.map((i,r)=>i*t+s[r]*(1-t)))}function gt(o,e){if(e>=100)return o;let[t,a,s]=de(o);return`rgba(${t}, ${a}, ${s}, ${e/100})`}function ft(o){let[e,t,a]=de(o).map(s=>{let i=s/255;return i<=.03928?i/12.92:((i+.055)/1.055)**2.4});return .2126*e+.7152*t+.0722*a}function De(o){return ft(o)>.45?"#1f1f1f":"#ffffff"}var Jt=o=>ft(o)<.2;function he(o){let e={...y,...o},t=Jt(e.background),a=e.header??e.background,s=gt(e.card,e.card_opacity),i=f(e.text,e.background,.62),r=f(e.text,e.background,t?.16:.12),l=e.popup==="glass"?gt(e.card,e.popup_opacity):e.card,d=(h,p)=>f(h,e.card,p);return{"primary-color":e.accent,"accent-color":e.accent,"light-primary-color":f(e.accent,e.background,.4),"dark-primary-color":f(e.accent,"#000000",.8),"text-primary-color":De(e.accent),"primary-background-color":e.background,"secondary-background-color":f(e.text,e.background,t?.06:.04),"divider-color":r,"primary-text-color":e.text,"secondary-text-color":i,"disabled-text-color":f(e.text,e.background,.38),"app-header-background-color":a,"app-header-text-color":a===e.background?e.text:De(a),"app-header-selection-bar-color":e.accent,"app-header-edit-background-color":f(e.text,e.background,.75),"app-header-edit-text-color":De(f(e.text,e.background,.75)),"sidebar-background-color":e.sidebar,"sidebar-text-color":e.text,"sidebar-icon-color":i,"sidebar-selected-icon-color":e.accent,"sidebar-selected-text-color":t?e.accent:f(e.accent,e.text,.7),"card-background-color":s,"ha-card-background":s,"ha-card-border-color":r,"ha-card-border-width":"1px","ha-card-border-radius":`${e.radius}px`,"ha-card-box-shadow":He[e.shadow]??He.soft,"bubble-pop-up-background-color":l,"bubble-pop-up-main-background-color":l,"bubble-main-background-color":f(e.text,e.card,t?.08:.05),"bubble-secondary-background-color":f(e.text,e.card,t?.12:.08),"bubble-button-background-color":d(e.accent,.22),"bubble-icon-background-color":d(e.accent,.18),"ha-dialog-surface-background":e.card,"mdc-theme-surface":e.card,"dialog-box-shadow":He.strong,"ha-dialog-border-radius":`${Math.max(e.radius+8,12)}px`,"switch-checked-color":e.accent,"switch-checked-button-color":e.accent,"switch-checked-track-color":e.accent,"switch-unchecked-button-color":t?"#9aa0a6":"#fafafa","switch-unchecked-track-color":f(e.text,e.background,.35),"slider-color":e.accent,"slider-bar-color":f(e.accent,e.background,.3),"input-fill-color":f(e.text,e.card,.05),"mdc-text-field-fill-color":f(e.text,e.card,.05),"input-ink-color":e.text,"input-label-ink-color":i,"code-editor-background-color":e.card,"state-icon-color":i,"state-active-color":e.accent,"state-light-active-color":e.accent,"state-switch-active-color":e.accent,"state-fan-active-color":e.accent,"state-cover-active-color":e.accent,"state-inactive-color":f(e.text,e.background,.4),"state-unavailable-color":f(e.text,e.background,.3),"state-climate-active-color":e.accent,"state-climate-auto-color":"#43a047","state-climate-cool-color":"#2196f3","state-climate-dry-color":"#efbd07","state-climate-heat-color":"#ff8100","state-climate-heat_cool-color":"#ffa000","state-climate-fan_only-color":"#00bcd4","error-color":"#db4437","warning-color":"#ffa600","success-color":"#43a047","info-color":"#039be5","weather-card-gradient":`linear-gradient(135deg, ${d(e.accent,.35)}, ${e.card})`,"weather-card-accent":e.accent}}function pe(o){return{...he(o.base),...o.overrides}}function ue(o){let e=s=>{let i=String(o[s]??"").trim();return/^#[0-9a-f]{6}$/i.test(i)?i.toLowerCase():null},t={...y};t.background=e("primary-background-color")??t.background,t.card=e("card-background-color")??e("ha-card-background")??t.card,t.text=e("primary-text-color")??t.text,t.accent=e("primary-color")??t.accent,t.sidebar=e("sidebar-background-color")??t.background,t.header=e("app-header-background-color");let a={};for(let[s,i]of Object.entries(o))(typeof i=="string"||typeof i=="number")&&(a[s]=String(i));return{base:t,overrides:a}}var me=o=>o==null?o:JSON.parse(JSON.stringify(o));function Ft(o){let e=String(o).trim().toLowerCase();if(/^#[0-9a-f]{6}$/.test(e))return e;if(/^#[0-9a-f]{3}$/.test(e))return`#${[...e.slice(1)].map(a=>a+a).join("")}`;let t=e.match(/^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/);return t?`#${t.slice(1,4).map(a=>Number(a).toString(16).padStart(2,"0")).join("")}`:null}var vt=(o,e)=>JSON.stringify(o)===JSON.stringify(e),qt=/^#[0-9a-f]{6}$/i,C="new",Q=class extends _{constructor(){super(),this._selected=null,this._draft=null,this._picking=!1,this._wholeScreen=!1,this._popup=!0,this._newVar={key:"",value:""},this._applied=null}connectedCallback(){super.connectedCallback(),this._load()}disconnectedCallback(){super.disconnectedCallback(),this._applyToScreen(null)}updated(){this._applyToScreen(this._wholeScreen&&this._draft?pe(this._draft):null)}get _lang(){return(this.hass?.locale?.language||this.hass?.language||"nl").startsWith("nl")?"nl":"en"}get _saved(){return this._state?.themes.find(e=>e.id===this._selected)??null}get dirty(){if(!this._draft)return!1;if(this._selected===C)return!this._pristine||!vt(this._editable(this._draft),this._pristine);let e=this._saved;return!e||!vt(this._editable(this._draft),this._editable(e))}_editable(e){return{name:e.name,base:e.base,overrides:e.overrides}}async _load(e){try{this._state=await this.hass.callWS({type:"style_studio/themes/get"}),this._select(e??this._selected??this._state.themes[0]?.id??null),!this._state.themes.length&&this._selected===null&&this._startFromCurrent()}catch(t){this._error(t)}}_select(e){let t=this._state.themes.find(a=>a.id===e);this._selected=t?e:null,this._draft=t?me(this._editable(t)):null,this._picking=!t}_applyToScreen(e){let t=document.documentElement;if(this._applied){for(let[a,s]of Object.entries(this._applied))s?t.style.setProperty(a,s):t.style.removeProperty(a);this._applied=null}if(e){this._applied={};for(let[a,s]of Object.entries(e))this._applied[`--${a}`]=t.style.getPropertyValue(`--${a}`),t.style.setProperty(`--${a}`,s)}}_uniqueName(e){let t=new Set([...this._state.themes.map(s=>s.name.toLowerCase()),...Object.keys(this._state.others).map(s=>s.toLowerCase())]),a=e;for(let s=2;t.has(a.toLowerCase());s+=1)a=`${e} ${s}`;return a}_startNew(e,t,a={}){this._selected=C,this._picking=!1,this._draft={name:this._uniqueName(e),base:me(t),overrides:me(a)},this._pristine=null}_current(){let e=this.hass.selectedTheme?.theme;if(e&&e!=="default"&&this._state.others[e])return{name:e,...ue(this._state.others[e])};let t=getComputedStyle(document.documentElement),a={};for(let s of Y){let i=Ft(t.getPropertyValue(`--${s}`));i&&(a[s]=i)}return{name:this.t("my_theme"),base:ue(a).base,overrides:{}}}_startFromCurrent(){let e=this._state.themes.find(i=>i.name===this.hass.selectedTheme?.theme);if(e){this._select(e.id);return}let{name:t,base:a,overrides:s}=this._current();this._startNew(t===this.t("my_theme")?t:`${t} (${this.t("copy_suffix")})`,a,s),this._pristine=me(this._draft)}_set(e,t){this._draft={...this._draft,base:{...this._draft.base,[e]:t}},this._toast=null}_override(e,t){let a={...this._draft.overrides};t===""||t==null?delete a[e]:a[e]=t,this._draft={...this._draft,overrides:a},this._toast=null}_cancel(){this._selected===C?this._select(this._state.themes[0]?.id??null):this._select(this._selected)}_save(){let e={...this._draft,vars:pe(this._draft)};this._selected!==C&&(e.id=this._selected),this._run(async()=>{try{let t=await this.hass.callWS({type:"style_studio/themes/save",theme:e});this._wholeScreen=!1,this._state=t,this._select(t.theme.id)}catch(t){throw this._known(t)}},this.t("saved_theme",{file:this._state.file}))}_known(e){let t={file_exists:"err_file_exists",name_taken:"err_name_taken"}[e?.code];return t?new Error(this.t(t)):e}_delete(){this._ask(this.t("delete_confirm",{name:this._saved.name}),()=>this._run(async()=>{this._state=await this.hass.callWS({type:"style_studio/themes/delete",theme_id:this._selected}),this._select(this._state.themes[0]?.id??null)},this.t("deleted")))}_undo(){this._ask(this.t("undo_confirm"),()=>this._run(async()=>{let e=await this.hass.callWS({type:"style_studio/themes/undo"});if(!e.restored)throw new Error(this.t("nothing_to_undo"));this._state=e,this._select(this._selected)},this.t("undone")))}_setDefault(){let e=this._saved.name;this._run(async()=>{this._state=await this.hass.callWS({type:"style_studio/themes/set_default",name:e})},this.t("default_set",{name:e}))}render(){return this._state?n`
      <p class="intro">${this.t("themes_intro")}</p>
      ${this._list()}
      ${this._leavingQuestion()}
      ${this._picking?this._picker():c}
      ${this._draft?this._editor():c}
      ${this._bar({left:this._barButtons(),onCancel:()=>this._cancel(),onSave:()=>this._save(),canSave:this._selected===C||this.dirty})}
    `:c}_list(){let{themes:e,loaded:t,default_theme:a}=this._state;return n`
      <div class="chips">
        ${e.map(s=>n`<button
            class="chip ${s.id===this._selected?"active":""}"
            @click=${()=>this._pick(()=>this._select(s.id))}
          >
            <span class="swatch" style="background:${s.vars["primary-color"]}"></span>
            ${s.name}
            ${s.name===a?n`<em>${this.t("badge_default")}</em>`:c}
            ${t.includes(s.name)?c:n`<em class="bad">${this.t("badge_not_loaded")}</em>`}
          </button>`)}
        ${this._selected===C?n`<button class="chip active">${this._draft.name}</button>`:c}
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
    </div>`:c}_useForMe(){let e=this._saved.name;document.querySelector("home-assistant")?.dispatchEvent(new CustomEvent("settheme",{detail:{theme:e}})),this._showToast(this.t("using_now",{name:e}))}_picker(){let e=Object.keys(this._state.others),t=this._current();return n`
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
          ${Object.entries(bt).map(([a,s])=>{let i=he(s.base);return n`<button
              class="preset"
              data-preset=${a}
              @click=${()=>this._startNew(s[this._lang],s.base)}
            >
              <span class="mini" style="background:${i["primary-background-color"]}">
                <i style="background:${i["sidebar-background-color"]}"></i>
                <b style="background:${i["card-background-color"]}"><s style="background:${i["primary-color"]}"></s></b>
              </span>
              ${s[this._lang]}
            </button>`})}
        </div>
        ${e.length?n`<label class="row">
              <span>${this.t("copy_existing")}</span>
              <select
                @change=${a=>{let s=a.target.value;if(!s)return;let{base:i,overrides:r}=ue(this._state.others[s]);this._startNew(`${s} (${this.t("copy_suffix")})`,i,r)}}
              >
                <option value="">${this.t("pick_theme")}</option>
                ${e.map(a=>n`<option>${a}</option>`)}
              </select>
            </label>`:c}
      </div>
    `}_editor(){let e=this._draft,t={...y,...e.base},a=he(t),s=pe(e),i=this._saved;return n`
      ${i&&!this._state.loaded.includes(i.name)?this._warning(this.t("warn_not_loaded")):c}
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
            ${this._fixedNotice()}
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
                    />`:c}
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
            ${t.popup==="glass"?this._slider(t,"popup_opacity",this.t("popup_opacity"),30,100,"%"):c}
          </div>

          <div class="card">
            <h2>${this.t("all_vars")}</h2>
            <p class="hint">${this.t("all_vars_hint")}</p>
            ${Pe.map(r=>n`
                <details>
                  <summary>
                    ${r[this._lang]}
                    <span class="dots">
                      ${r.vars.filter(([,,,l])=>l==="color").slice(0,6).map(([l])=>n`<i style="background:${s[l]}"></i>`)}
                    </span>
                  </summary>
                  ${r.vars.map(([l,d,h,p])=>this._varRow(l,this._lang==="nl"?d:h,p,a[l]))}
                </details>
              `)}
          </div>

          <div class="card">
            <h2>${this.t("custom_vars")}</h2>
            <p class="hint">${this.t("custom_vars_hint")}</p>
            ${Object.entries(e.overrides).filter(([r])=>!Y.has(r)).map(([r,l])=>this._varRow(r,`--${r}`,"text","",l,!0))}
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
          <ss-theme-preview .vars=${s} .t=${this.t} ?popup=${this._popup}></ss-theme-preview>
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
    `}_fixedNotice(){let e=Object.keys(this._draft.overrides).filter(t=>Y.has(t));return e.length?n`<div class="fixed">
      <span>${this.t("fixed_colors",{count:e.length})}</span>
      <button
        class="small"
        @click=${()=>{let t=Object.fromEntries(Object.entries(this._draft.overrides).filter(([a])=>!Y.has(a)));this._draft={...this._draft,overrides:t}}}
      >
        ${this.t("follow_quick")}
      </button>
    </div>`:c}_varRow(e,t,a,s,i=this._draft.overrides[e],r=!1){let l=i??"",d=i??s;return n`
      <div class="var ${i!==void 0?"own":""}">
        <span class="label">${t}<code>--${e}</code></span>
        <span class="inline">
          ${a==="color"?n`<input
                type="color"
                aria-label=${t}
                .value=${qt.test(d)?d:"#000000"}
                @input=${h=>this._override(e,h.target.value)}
              />`:c}
          <input
            type="text"
            aria-label=${t}
            .value=${l}
            placeholder=${s}
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
    `}_barButtons(){let e=this._selected!==C?this._saved:null,t=[];return this._state.history&&t.push(n`<button ?disabled=${this._busy} @click=${this._undo}>
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
      </button>`)),t.length?t:c}};m(Q,"properties",{..._.properties,_state:{state:!0},_selected:{state:!0},_draft:{state:!0},_picking:{state:!0},_wholeScreen:{state:!0},_popup:{state:!0},_newVar:{state:!0},_leaving:{state:!0}}),m(Q,"styles",[_.styles,g`
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
    `]);customElements.get("ss-themes-tab")||customElements.define("ss-themes-tab",Q);var Me="0.4.0";var Zt=["themes","sidebar","rooms","climate","people","check"],X=class extends b{constructor(){super(),this._tab="themes",this._leaving=null}get t(){return oe(this.hass)}willUpdate(e){e.has("hass")&&this.hass&&!this._loading&&(this._loading=this._load())}async _load(){try{this._data=await this.hass.callWS({type:"style_studio/get"})}catch(e){this._error=e.message??String(e)}}_pickTab(e){if(e===this._tab)return;this.renderRoot.querySelector(".tab-content > *")?.dirty?this._leaving=e:this._tab=e}render(){return n`
      <div class="toolbar">
        ${this.narrow?n`<button class="icon" @click=${this._toggleMenu} aria-label="Menu">
              <ha-icon icon="mdi:menu"></ha-icon>
            </button>`:c}
        <h1>${this.t("title")}</h1>
      </div>
      <main>
        ${this._error?n`<div class="warning">${this.t("error",{message:this._error})}</div>`:c}
        ${this._data?this._content():c}
      </main>
    `}_toggleMenu(){this.dispatchEvent(new Event("hass-toggle-menu",{bubbles:!0,composed:!0}))}_content(){return n`
      ${this._staleVersion()?n`<div class="warning">
            <ha-icon icon="mdi:alert-outline"></ha-icon>
            ${this.t("warn_old_panel",{old:this._staleVersion(),new:this._data.version})}
          </div>`:c}
      <nav class="tabs">
        ${Zt.map(e=>n`<button
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
          </div>`:c}
      <div class="tab-content">${this._tabContent()}</div>
    `}_staleVersion(){let e=window.__styleStudio?.version;return Me!==this._data.version?Me:e&&e!==this._data.version?e:null}_tabContent(){switch(this._tab){case"themes":return n`<ss-themes-tab .hass=${this.hass} .narrow=${this.narrow}></ss-themes-tab>`;case"rooms":return n`<ss-rooms-tab .hass=${this.hass} .narrow=${this.narrow}></ss-rooms-tab>`;case"climate":return n`<ss-climate-tab .hass=${this.hass} .narrow=${this.narrow}></ss-climate-tab>`;case"people":return n`<ss-people-tab .hass=${this.hass} .narrow=${this.narrow}></ss-people-tab>`;case"sidebar":return n`<ss-sidebar-tab
          .hass=${this.hass}
          .narrow=${this.narrow}
          .glass=${this._data.glass_sidebar}
          @reload=${()=>this._load()}
        ></ss-sidebar-tab>`;default:return n`<div class="card coming">${this.t("coming")}</div>`}}};m(X,"properties",{hass:{attribute:!1},narrow:{type:Boolean},panel:{attribute:!1},_data:{state:!0},_tab:{state:!0},_leaving:{state:!0}}),m(X,"styles",g`
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
  `);customElements.get("style-studio-panel")||customElements.define("style-studio-panel",X);
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
