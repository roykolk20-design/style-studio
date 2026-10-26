var Je=Object.defineProperty;var qe=(o,e,t)=>e in o?Je(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var g=(o,e,t)=>qe(o,typeof e!="symbol"?e+"":e,t);var K=globalThis,J=K.ShadowRoot&&(K.ShadyCSS===void 0||K.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,te=Symbol(),$e=new WeakMap,O=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==te)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(J&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=$e.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&$e.set(t,e))}return e}toString(){return this.cssText}},ye=o=>new O(typeof o=="string"?o:o+"",void 0,te),b=(o,...e)=>{let t=o.length===1?o[0]:e.reduce((i,s,a)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[a+1],o[0]);return new O(t,o,te)},we=(o,e)=>{if(J)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),s=K.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,o.appendChild(i)}},ie=J?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return ye(t)})(o):o;var{is:Fe,defineProperty:Ze,getOwnPropertyDescriptor:Ye,getOwnPropertyNames:Xe,getOwnPropertySymbols:Qe,getPrototypeOf:et}=Object,q=globalThis,ke=q.trustedTypes,tt=ke?ke.emptyScript:"",it=q.reactiveElementPolyfillSupport,H=(o,e)=>o,se={toAttribute(o,e){switch(e){case Boolean:o=o?tt:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},Ae=(o,e)=>!Fe(o,e),Se={attribute:!0,type:String,converter:se,reflect:!1,useDefault:!1,hasChanged:Ae};Symbol.metadata??=Symbol("metadata"),q.litPropertyMetadata??=new WeakMap;var x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Se){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&Ze(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){let{get:s,set:a}=Ye(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get:s,set(r){let d=s?.call(this);a?.call(this,r),this.requestUpdate(e,d,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Se}static _$Ei(){if(this.hasOwnProperty(H("elementProperties")))return;let e=et(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(H("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(H("properties"))){let t=this.properties,i=[...Xe(t),...Qe(t)];for(let s of i)this.createProperty(s,t[s])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let s of i)t.unshift(ie(s))}else e!==void 0&&t.push(ie(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return we(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){let a=(i.converter?.toAttribute!==void 0?i.converter:se).toAttribute(t,i.type);this._$Em=e,a==null?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(e,t){let i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let a=i.getPropertyOptions(s),r=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:se;this._$Em=s;let d=r.fromAttribute(t,a.type);this[s]=d??this._$Ej?.get(s)??d,this._$Em=null}}requestUpdate(e,t,i,s=!1,a){if(e!==void 0){let r=this.constructor;if(s===!1&&(a=this[e]),i??=r.getPropertyOptions(e),!((i.hasChanged??Ae)(a,t)||i.useDefault&&i.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:a},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),a!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,a]of this._$Ep)this[s]=a;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,a]of i){let{wrapped:r}=a,d=this[s];r!==!0||this._$AL.has(s)||d===void 0||this.C(s,void 0,a,d)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[H("elementProperties")]=new Map,x[H("finalized")]=new Map,it?.({ReactiveElement:x}),(q.reactiveElementVersions??=[]).push("2.1.2");var de=globalThis,Ee=o=>o,F=de.trustedTypes,Ce=F?F.createPolicy("lit-html",{createHTML:o=>o}):void 0,Ne="$lit$",y=`lit$${Math.random().toFixed(9).slice(2)}$`,Pe="?"+y,st=`<${Pe}>`,A=document,N=()=>A.createComment(""),P=o=>o===null||typeof o!="object"&&typeof o!="function",he=Array.isArray,at=o=>he(o)||typeof o?.[Symbol.iterator]=="function",ae=`[ 	
\f\r]`,j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Te=/-->/g,ze=/>/g,k=RegExp(`>|${ae}(?:([^\\s"'>=/]+)(${ae}*=${ae}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Oe=/'/g,He=/"/g,De=/^(?:script|style|textarea|title)$/i,pe=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),n=pe(1),wt=pe(2),kt=pe(3),E=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),je=new WeakMap,S=A.createTreeWalker(A,129);function Re(o,e){if(!he(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ce!==void 0?Ce.createHTML(e):e}var ot=(o,e)=>{let t=o.length-1,i=[],s,a=e===2?"<svg>":e===3?"<math>":"",r=j;for(let d=0;d<t;d++){let c=o[d],h,u,p=-1,f=0;for(;f<c.length&&(r.lastIndex=f,u=r.exec(c),u!==null);)f=r.lastIndex,r===j?u[1]==="!--"?r=Te:u[1]!==void 0?r=ze:u[2]!==void 0?(De.test(u[2])&&(s=RegExp("</"+u[2],"g")),r=k):u[3]!==void 0&&(r=k):r===k?u[0]===">"?(r=s??j,p=-1):u[1]===void 0?p=-2:(p=r.lastIndex-u[2].length,h=u[1],r=u[3]===void 0?k:u[3]==='"'?He:Oe):r===He||r===Oe?r=k:r===Te||r===ze?r=j:(r=k,s=void 0);let $=r===k&&o[d+1].startsWith("/>")?" ":"";a+=r===j?c+st:p>=0?(i.push(h),c.slice(0,p)+Ne+c.slice(p)+y+$):c+y+(p===-2?d:$)}return[Re(o,a+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},D=class o{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let a=0,r=0,d=e.length-1,c=this.parts,[h,u]=ot(e,t);if(this.el=o.createElement(h,i),S.currentNode=this.el.content,t===2||t===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(s=S.nextNode())!==null&&c.length<d;){if(s.nodeType===1){if(s.hasAttributes())for(let p of s.getAttributeNames())if(p.endsWith(Ne)){let f=u[r++],$=s.getAttribute(p).split(y),W=/([.?@])?(.*)/.exec(f);c.push({type:1,index:a,name:W[2],strings:$,ctor:W[1]==="."?re:W[1]==="?"?ne:W[1]==="@"?le:T}),s.removeAttribute(p)}else p.startsWith(y)&&(c.push({type:6,index:a}),s.removeAttribute(p));if(De.test(s.tagName)){let p=s.textContent.split(y),f=p.length-1;if(f>0){s.textContent=F?F.emptyScript:"";for(let $=0;$<f;$++)s.append(p[$],N()),S.nextNode(),c.push({type:2,index:++a});s.append(p[f],N())}}}else if(s.nodeType===8)if(s.data===Pe)c.push({type:2,index:a});else{let p=-1;for(;(p=s.data.indexOf(y,p+1))!==-1;)c.push({type:7,index:a}),p+=y.length-1}a++}}static createElement(e,t){let i=A.createElement("template");return i.innerHTML=e,i}};function C(o,e,t=o,i){if(e===E)return e;let s=i!==void 0?t._$Co?.[i]:t._$Cl,a=P(e)?void 0:e._$litDirective$;return s?.constructor!==a&&(s?._$AO?.(!1),a===void 0?s=void 0:(s=new a(o),s._$AT(o,t,i)),i!==void 0?(t._$Co??=[])[i]=s:t._$Cl=s),s!==void 0&&(e=C(o,s._$AS(o,e.values),s,i)),e}var oe=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??A).importNode(t,!0);S.currentNode=s;let a=S.nextNode(),r=0,d=0,c=i[0];for(;c!==void 0;){if(r===c.index){let h;c.type===2?h=new R(a,a.nextSibling,this,e):c.type===1?h=new c.ctor(a,c.name,c.strings,this,e):c.type===6&&(h=new ce(a,this,e)),this._$AV.push(h),c=i[++d]}r!==c?.index&&(a=S.nextNode(),r++)}return S.currentNode=A,s}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},R=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=C(this,e,t),P(e)?e===l||e==null||e===""?(this._$AH!==l&&this._$AR(),this._$AH=l):e!==this._$AH&&e!==E&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):at(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==l&&P(this._$AH)?this._$AA.nextSibling.data=e:this.T(A.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=D.createElement(Re(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{let a=new oe(s,this),r=a.u(this.options);a.p(t),this.T(r),this._$AH=a}}_$AC(e){let t=je.get(e.strings);return t===void 0&&je.set(e.strings,t=new D(e)),t}k(e){he(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,s=0;for(let a of e)s===t.length?t.push(i=new o(this.O(N()),this.O(N()),this,this.options)):i=t[s],i._$AI(a),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let i=Ee(e).nextSibling;Ee(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},T=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,a){this.type=1,this._$AH=l,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=a,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=l}_$AI(e,t=this,i,s){let a=this.strings,r=!1;if(a===void 0)e=C(this,e,t,0),r=!P(e)||e!==this._$AH&&e!==E,r&&(this._$AH=e);else{let d=e,c,h;for(e=a[0],c=0;c<a.length-1;c++)h=C(this,d[i+c],t,c),h===E&&(h=this._$AH[c]),r||=!P(h)||h!==this._$AH[c],h===l?e=l:e!==l&&(e+=(h??"")+a[c+1]),this._$AH[c]=h}r&&!s&&this.j(e)}j(e){e===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},re=class extends T{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===l?void 0:e}},ne=class extends T{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==l)}},le=class extends T{constructor(e,t,i,s,a){super(e,t,i,s,a),this.type=5}_$AI(e,t=this){if((e=C(this,e,t,0)??l)===E)return;let i=this._$AH,s=e===l&&i!==l||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,a=e!==l&&(i===l||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ce=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){C(this,e)}};var rt=de.litHtmlPolyfillSupport;rt?.(D,R),(de.litHtmlVersions??=[]).push("3.3.3");var Me=(o,e,t)=>{let i=t?.renderBefore??e,s=i._$litPart$;if(s===void 0){let a=t?.renderBefore??null;i._$litPart$=s=new R(e.insertBefore(N(),a),a,void 0,t??{})}return s._$AI(o),s};var ue=globalThis,_=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Me(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return E}};_._$litElement$=!0,_.finalized=!0,ue.litElementHydrateSupport?.({LitElement:_});var nt=ue.litElementPolyfillSupport;nt?.({LitElement:_});(ue.litElementVersions??=[]).push("4.2.2");var lt={title:"Stijl",tab_sidebar:"Zijbalk",tab_themes:"Thema's",tab_rooms:"Kamers en pop-ups",tab_climate:"Klimaat",tab_people:"Per persoon",tab_check:"Controle en herstel",coming:"Dit onderdeel komt in een volgende versie.",glass_intro:"De zijbalk wordt opgemaakt door de uitbreiding Glass Sidebar. Hier stel je die in; wijzigingen gelden voor iedereen en verschijnen direct. De kleuren van de zijbalk stel je in bij Thema's.",glass_missing_title:"Uitbreiding: Glass Sidebar",glass_missing:"Met de uitbreiding Glass Sidebar wordt je zijbalk een zwevend glazen paneel, met groepen en kopjes. Installeer hem via HACS en herstart Home Assistant; daarna stel je hem hier in. De kleuren van de zijbalk stel je ook zonder uitbreiding in bij Thema's.",glass_not_added_title:"Glass Sidebar is ge\xEFnstalleerd",glass_not_added:"Voeg hem nog toe: Instellingen \u203A Apparaten en diensten \u203A Integratie toevoegen \u203A Glass Sidebar. Daarna stel je hem hier in.",glass_not_loaded:"Glass Sidebar is uitgeschakeld of niet geladen. Je kunt instellingen opslaan, maar je ziet ze pas als Glass Sidebar weer draait.",glass_old:"Je hebt Glass Sidebar {version}. Style Studio is gemaakt voor {min} of nieuwer; werk Glass Sidebar bij via HACS. Opties die jouw versie nog niet kent, doen niets.",open_glass:"Instellingen van Glass Sidebar openen",shape:"Vorm",floating:"Zwevend",floating_hint:"Een losse balk met ruimte eromheen.",inset:"Afstand tot de rand",radius:"Hoeken",glass:"Glas",blur:"Vervaging",opacity:"Dekking",opacity_hint:"Lager is meer doorzichtig.",glass_cards:"Glazen dashboardkaarten",glass_cards_hint:"Kaarten worden doorschijnend. Kan zwaar zijn op oudere tablets.",active:"Actieve pagina",highlight_soft:"Zacht",highlight_vivid:"Vol",own_accent:"Eigen kleur",own_accent_hint:"Uit: de kleur van het thema.",motion:"Iconen bewegen bij aanwijzen",phone:"Telefoon",phone_hint:"Voor schermen tot 600 pixels breed.",mobile_width:"Breedte van het menu",mobile_text_size:"Tekstgrootte",mobile_blur:"Pagina achter het menu vervagen",groups:"Groepen",groups_hint:"Sleep items naar een groep, of tik een item aan en kies Hierheen. Items zonder groep staan bovenaan.",ungrouped:"Zonder groep",ungrouped_hint:"Staan bovenaan, in de volgorde van Home Assistant.",add_group:"Groep toevoegen",new_group:"Nieuwe groep",group_name:"Naam van de groep",move_here:"Hierheen",move_up:"Omhoog",move_down:"Omlaag",move_left:"Naar voren",move_right:"Naar achteren",remove_group:"Groep verwijderen",remove_group_confirm:"Verwijderen? De items gaan terug naar Zonder groep.",hide:"Verbergen",show:"Tonen",missing:"niet gevonden",empty_group:"Sleep items hierheen.",preview:"Voorbeeld",preview_hint:"Wordt pas echt toegepast als je opslaat.",device_phone:"Telefoon",device_tablet:"Tablet",device_desktop:"Pc",page_light:"Lichte pagina",page_dark:"Donkere pagina",expanded:"Uitgeklapt",unsaved:"Niet opgeslagen wijzigingen",cancel:"Annuleren",save:"Opslaan",saved:"Opgeslagen",undo:"Vorige versie terugzetten",undo_confirm:"De instellingen van voor de laatste keer opslaan komen terug. Doorgaan?",undone:"Vorige versie teruggezet",nothing_to_undo:"Er is geen vorige versie",yes:"Ja",no:"Nee",discard_confirm:"Je hebt wijzigingen die niet zijn opgeslagen. Weggooien?",error:"Er ging iets mis: {message}",themes_intro:"Bepaal elke kleur in Home Assistant: menu, bovenbalk, kaarten, pop-ups, vensters, schakelaars en meer. Begin met een paar basiskleuren; de rest rekent Style Studio uit. Onder Alles aanpassen kun je elke kleur apart zetten.",your_themes:"Je thema's",new_theme:"Nieuw thema",start_from:"Begin met",copy_existing:"Of kopieer een bestaand thema",pick_theme:"Kies een thema",copy_suffix:"kopie",theme_name:"Naam",badge_default:"standaard",badge_not_loaded:"niet geladen",quick:"Snel",quick_hint:"Hieruit worden alle andere kleuren berekend.",c_background:"Achtergrond",c_card:"Kaarten",c_text:"Tekst",c_accent:"Accent (actief, knoppen, schakelaars)",c_sidebar:"Zijbalk",c_header:"Bovenbalk",header_same:"Bovenbalk zelfde kleur als de achtergrond",corners:"Hoeken van kaarten",shadow:"Schaduw",shadow_none:"Geen",shadow_soft:"Zacht",shadow_strong:"Sterk",card_opacity:"Dekking van kaarten",card_opacity_hint:"Lager laat de achtergrond door de kaarten heen zien.",popups:"Pop-ups",popup_solid:"Ondoorzichtig",popup_glass:"Glas",popup_opacity:"Dekking van pop-ups",all_vars:"Alles aanpassen",all_vars_hint:"Leeg veld: de berekende kleur (grijs). Je mag elke CSS-waarde gebruiken, ook rgba() of een verloop. Een paar plekken in de instellingen van Home Assistant hebben vaste kleuren en volgen geen thema.",reset:"Terug naar berekend",custom_vars:"Eigen variabelen",custom_vars_hint:"Voor variabelen die hierboven niet staan, bijvoorbeeld van een andere kaart.",var_name:"Naam, zonder --",var_value:"Waarde",add_var:"Toevoegen",remove:"Verwijderen",whole_screen:"Ook tonen op dit hele scherm",whole_screen_hint:"Alleen in deze browser, tot je opslaat of annuleert.",show_popup:"Pop-up tonen",delete_theme:"Thema verwijderen",delete_confirm:"Thema {name} verwijderen? Je kunt het daarna nog terugzetten.",deleted:"Verwijderd",set_default:"Standaard voor iedereen",set_default_hint:"Voor iedereen die in het profiel geen eigen thema koos.",default_set:"{name} is nu het standaardthema",is_default:"Dit is het standaardthema",saved_theme:"Opgeslagen. Kies het in je profiel, of gebruik Voor mij gebruiken.",use_for_me:"Voor mij gebruiken",using_now:"Dit scherm gebruikt nu {name}",warn_not_loaded:"Home Assistant heeft dit thema niet geladen. Zet in configuration.yaml: frontend: themes: !include_dir_merge_named themes, en herstart Home Assistant.",err_file_exists:"themes/style_studio.yaml bestaat al en is niet door Style Studio gemaakt. Hernoem of verwijder dat bestand eerst.",err_name_taken:"Er is al een thema met deze naam.",pv_title:"Thuis",pv_tab2:"Kamers",pv_living:"Woonkamer",pv_lights:"3 lampen aan",pv_kitchen:"Keuken",pv_off:"Uit",pv_climate:"Airco",pv_weather:"Zonnig, 21\xB0",pv_switch:"Ventilator",pv_popup:"Woonkamer",people_intro:"Geef iedereen een eigen thema en zijbalkvolgorde. Het wordt toegepast als die persoon Home Assistant opent, op elk apparaat \xE9\xE9n keer; daarna kan diegene in het profiel nog zelf iets anders kiezen.",person_theme:"Thema",person_sidebar:"Zijbalk (volgorde en verborgen items)",self_choice:"Zelf kiezen",like_person:"Zoals {name} nu",copy_all_from:"Alles kopi\xEBren van",pick_person:"Kies een persoon",now_uses:"Gebruikt nu: {value}",ha_default:"standaard",unknown:"onbekend",hidden_count:"{count} verborgen",order_count:"{count} in eigen volgorde",applied:"Toegepast",pending:"Wordt toegepast als {name} Home Assistant opent",never_seen:"Nog niet gezien sinds Style Studio er is",last_seen:"Laatst gezien {when}",devices:"{count} apparaten",device_one:"1 apparaat",app_badge:"app",no_themes_yet:"Er zijn nog geen thema's geladen. Maak er eerst een bij Thema's.",warn_old_panel:"Dit scherm gebruikt een oude versie van het paneel ({old}, server {new}). Herlaad de pagina. In de Companion-app: Instellingen \u203A Companion-app \u203A Probleemoplossing \u203A Frontend-cache wissen."},Ue={title:"Style",tab_sidebar:"Sidebar",tab_themes:"Themes",tab_rooms:"Rooms and pop-ups",tab_climate:"Climate",tab_people:"People",tab_check:"Check and restore",coming:"This part comes in a later version.",glass_intro:"The sidebar is styled by the Glass Sidebar add-on. You set it up here; changes apply to everyone and show right away. Sidebar colors are set under Themes.",glass_missing_title:"Add-on: Glass Sidebar",glass_missing:"The Glass Sidebar add-on turns your sidebar into a floating glass panel, with groups and headings. Install it through HACS and restart Home Assistant; then set it up here. Sidebar colors can be set under Themes without the add-on.",glass_not_added_title:"Glass Sidebar is installed",glass_not_added:"Add it too: Settings \u203A Devices & services \u203A Add integration \u203A Glass Sidebar. Then set it up here.",glass_not_loaded:"Glass Sidebar is disabled or not loaded. You can save settings, but you'll only see them once Glass Sidebar runs again.",glass_old:"You have Glass Sidebar {version}. Style Studio is made for {min} or newer; update Glass Sidebar through HACS. Options your version doesn't know do nothing.",open_glass:"Open Glass Sidebar settings",shape:"Shape",floating:"Floating",floating_hint:"A separate panel with space around it.",inset:"Distance to the edge",radius:"Corners",glass:"Glass",blur:"Blur",opacity:"Opacity",opacity_hint:"Lower is more see-through.",glass_cards:"Glass dashboard cards",glass_cards_hint:"Cards become translucent. Can be heavy on older tablets.",active:"Active page",highlight_soft:"Soft",highlight_vivid:"Solid",own_accent:"Own color",own_accent_hint:"Off: the theme's color.",motion:"Icons move on hover",phone:"Phone",phone_hint:"For screens up to 600 pixels wide.",mobile_width:"Menu width",mobile_text_size:"Text size",mobile_blur:"Blur the page behind the menu",groups:"Groups",groups_hint:"Drag items into a group, or tap an item and choose Move here. Items without a group stay at the top.",ungrouped:"No group",ungrouped_hint:"Shown at the top, in Home Assistant's order.",add_group:"Add group",new_group:"New group",group_name:"Group name",move_here:"Move here",move_up:"Up",move_down:"Down",move_left:"Earlier",move_right:"Later",remove_group:"Remove group",remove_group_confirm:"Remove? Its items go back to No group.",hide:"Hide",show:"Show",missing:"not found",empty_group:"Drag items here.",preview:"Preview",preview_hint:"Only applied once you save.",device_phone:"Phone",device_tablet:"Tablet",device_desktop:"Desktop",page_light:"Light page",page_dark:"Dark page",expanded:"Expanded",unsaved:"Unsaved changes",cancel:"Cancel",save:"Save",saved:"Saved",undo:"Restore previous version",undo_confirm:"The settings from before the last save come back. Continue?",undone:"Previous version restored",nothing_to_undo:"There is no previous version",yes:"Yes",no:"No",discard_confirm:"You have unsaved changes. Throw them away?",error:"Something went wrong: {message}",themes_intro:"Set every color in Home Assistant: menu, top bar, cards, pop-ups, dialogs, switches and more. Start with a few base colors; Style Studio works out the rest. Under Change everything you can set each color on its own.",your_themes:"Your themes",new_theme:"New theme",start_from:"Start with",copy_existing:"Or copy an existing theme",pick_theme:"Pick a theme",copy_suffix:"copy",theme_name:"Name",badge_default:"default",badge_not_loaded:"not loaded",quick:"Quick",quick_hint:"All other colors are worked out from these.",c_background:"Background",c_card:"Cards",c_text:"Text",c_accent:"Accent (active, buttons, switches)",c_sidebar:"Sidebar",c_header:"Top bar",header_same:"Top bar in the background color",corners:"Card corners",shadow:"Shadow",shadow_none:"None",shadow_soft:"Soft",shadow_strong:"Strong",card_opacity:"Card opacity",card_opacity_hint:"Lower lets the background show through cards.",popups:"Pop-ups",popup_solid:"Solid",popup_glass:"Glass",popup_opacity:"Pop-up opacity",all_vars:"Change everything",all_vars_hint:"Empty field: the worked-out color (grey). Any CSS value works, also rgba() or a gradient. A few places in Home Assistant's settings have fixed colors and don't follow any theme.",reset:"Back to worked-out",custom_vars:"Own variables",custom_vars_hint:"For variables not listed above, for example from another card.",var_name:"Name, without --",var_value:"Value",add_var:"Add",remove:"Remove",whole_screen:"Also show on this whole screen",whole_screen_hint:"Only in this browser, until you save or cancel.",show_popup:"Show pop-up",delete_theme:"Delete theme",delete_confirm:"Delete theme {name}? You can still restore it afterwards.",deleted:"Deleted",set_default:"Default for everyone",set_default_hint:"For everyone who didn't pick a theme in their profile.",default_set:"{name} is now the default theme",is_default:"This is the default theme",saved_theme:"Saved. Pick it in your profile, or use Use for me.",use_for_me:"Use for me",using_now:"This screen now uses {name}",warn_not_loaded:"Home Assistant didn't load this theme. Add to configuration.yaml: frontend: themes: !include_dir_merge_named themes, and restart Home Assistant.",err_file_exists:"themes/style_studio.yaml already exists and wasn't made by Style Studio. Rename or remove that file first.",err_name_taken:"There is already a theme with this name.",pv_title:"Home",pv_tab2:"Rooms",pv_living:"Living room",pv_lights:"3 lights on",pv_kitchen:"Kitchen",pv_off:"Off",pv_climate:"Air conditioning",pv_weather:"Sunny, 21\xB0",pv_switch:"Fan",pv_popup:"Living room",people_intro:"Give everyone their own theme and sidebar order. It is applied when that person opens Home Assistant, once on each device; after that they can still pick something else in their profile.",person_theme:"Theme",person_sidebar:"Sidebar (order and hidden items)",self_choice:"Their own choice",like_person:"Like {name} now",copy_all_from:"Copy everything from",pick_person:"Pick a person",now_uses:"Uses now: {value}",ha_default:"default",unknown:"unknown",hidden_count:"{count} hidden",order_count:"{count} in own order",applied:"Applied",pending:"Applied when {name} opens Home Assistant",never_seen:"Not seen since Style Studio was added",last_seen:"Last seen {when}",devices:"{count} devices",device_one:"1 device",app_badge:"app",no_themes_yet:"No themes are loaded yet. Make one under Themes first.",warn_old_panel:"This screen runs an old version of the panel ({old}, server {new}). Reload the page. In the Companion app: Settings \u203A Companion app \u203A Troubleshooting \u203A Reset frontend cache."};function Z(o){let e=(o?.locale?.language||o?.language||"nl").startsWith("nl")?lt:Ue;return(t,i={})=>(e[t]??Ue[t]??t).replace(/\{(\w+)\}/g,(s,a)=>i[a]??"")}var v=class extends _{constructor(){super(),this._busy=!1,this._confirm=null}get t(){return Z(this.hass)}get dirty(){return!1}_ask(e,t){this._confirm={text:e,action:t}}_showToast(e){this._toast=e,clearTimeout(this._toastTimer),this._toastTimer=setTimeout(()=>this._toast=null,4e3)}_error(e){this._showToast(this.t("error",{message:e?.message??e}))}async _run(e,t){this._busy=!0;try{await e(),t&&this._showToast(t)}catch(i){this._error(i)}finally{this._busy=!1}}_set(){}_warning(e){return n`<div class="warning"><ha-icon icon="mdi:alert-outline"></ha-icon>${e}</div>`}_switch(e,t,i,s){return n`
      <label class="row">
        <span>
          ${i}
          ${s?n`<small>${s}</small>`:l}
        </span>
        <input
          type="checkbox"
          class="switch"
          .checked=${e[t]}
          @change=${a=>this._set(t,a.target.checked)}
        />
      </label>
    `}_slider(e,t,i,s,a,r,d=!1,c){return n`
      <label class="row slider ${d?"off":""}">
        <span>
          ${i}
          ${c?n`<small>${c}</small>`:l}
        </span>
        <span class="inline">
          <input
            type="range"
            min=${s}
            max=${a}
            step="1"
            .value=${String(e[t])}
            ?disabled=${d}
            @input=${h=>this._set(t,Number(h.target.value))}
          />
          <output>${e[t]}${r}</output>
        </span>
      </label>
    `}_segment(e,t,i){return n`
      <div class="segment" role="radiogroup">
        ${i.map(([s,a])=>n`<button
            role="radio"
            aria-checked=${e[t]===s?"true":"false"}
            class=${e[t]===s?"active":""}
            @click=${()=>this._set(t,s)}
          >
            ${a}
          </button>`)}
      </div>
    `}_color(e,t,i,s){return n`
      <label class="row">
        <span>
          ${i}
          ${s?n`<small>${s}</small>`:l}
        </span>
        <input type="color" .value=${e[t]} @input=${a=>this._set(t,a.target.value)} />
      </label>
    `}_bar({left:e=l,onCancel:t,onSave:i}){if(this._confirm){let{text:s,action:a}=this._confirm;return n`
        <footer class="bar">
          <span class="grow">${s}</span>
          <button @click=${()=>this._confirm=null}>${this.t("no")}</button>
          <button
            class="primary"
            @click=${()=>{this._confirm=null,a()}}
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
    `}};g(v,"properties",{hass:{attribute:!1},narrow:{type:Boolean},_busy:{state:!0},_toast:{state:!0},_confirm:{state:!0}}),g(v,"styles",b`
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
  `);var ge=o=>o==null?o:JSON.parse(JSON.stringify(o)),me=(o,e)=>JSON.stringify(o??null)===JSON.stringify(e??null),M=class extends v{connectedCallback(){super.connectedCallback(),this._load()}async _load(){try{this._accept(await this.hass.callWS({type:"style_studio/people/get"}))}catch(e){this._error(e)}}_accept(e){this._state=e,this._draft=this._fromSaved()}_fromSaved(){return Object.fromEntries(this._state.users.map(e=>{let t=this._state.persons[e.id]??{};return[e.id,{theme:t.theme??null,sidebar:ge(t.sidebar??null)}]}))}get dirty(){return!!this._state&&!me(this._draft,this._fromSaved())}_setPerson(e,t){this._draft={...this._draft,[e]:{...this._draft[e],...t}},this._toast=null}_latest(e){return this._state.reports.find(t=>t.user_id===e)??null}_devices(e){return this._state.reports.filter(t=>t.user_id===e)}_save(){this._run(async()=>{this._accept(await this.hass.callWS({type:"style_studio/people/save",persons:this._draft})),clearTimeout(this._refresh),this._refresh=setTimeout(()=>!this.dirty&&this._load(),4e3)},this.t("saved"))}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._refresh)}_undo(){this._ask(this.t("undo_confirm"),()=>this._run(async()=>{let e=await this.hass.callWS({type:"style_studio/people/undo"});if(!e.restored)throw new Error(this.t("nothing_to_undo"));this._accept(e)},this.t("undone")))}_when(e){let t=(new Date(e).getTime()-Date.now())/1e3,i=new Intl.RelativeTimeFormat(this.hass.locale?.language??"nl",{numeric:"auto"});for(let[s,a]of[["day",86400],["hour",3600],["minute",60]])if(Math.abs(t)>=a)return i.format(Math.round(t/a),s);return i.format(0,"minute")}render(){if(!this._state||!this._draft)return l;let{users:e,themes:t}=this._state;return n`
      <p class="intro">${this.t("people_intro")}</p>
      ${t.length?l:this._warning(this.t("no_themes_yet"))}
      <div class="people">${e.map(i=>this._person(i))}</div>
      ${this._bar({left:this._state.history?n`<button ?disabled=${this._busy} @click=${this._undo}>
              <ha-icon icon="mdi:history"></ha-icon>${this.t("undo")}
            </button>`:l,onCancel:()=>this._draft=this._fromSaved(),onSave:()=>this._save()})}
    `}_person(e){let t=this._draft[e.id],i=this._state.persons[e.id]??{},s=this._latest(e.id),a=this._devices(e.id),r=this._state.users.filter(c=>c.id!==e.id),d=r.filter(c=>this._latest(c.id)?.sidebar);return n`
      <div class="card person" data-user=${e.name}>
        <div class="head">
          <ha-icon icon=${e.is_admin?"mdi:account-star":"mdi:account"}></ha-icon>
          <div class="who">
            <h2>${e.name}</h2>
            <small>
              ${s?n`${this.t("last_seen",{when:this._when(s.at)})} ·
                  ${a.length===1?this.t("device_one"):this.t("devices",{count:a.length})}
                  ${a.some(c=>c.app)?n`<em>${this.t("app_badge")}</em>`:l}`:this.t("never_seen")}
            </small>
          </div>
          <label class="copy">
            <span>${this.t("copy_all_from")}</span>
            <select
              aria-label="${this.t("copy_all_from")} (${e.name})"
              @change=${c=>{let h=c.target.value;if(c.target.value="",!h)return;let u=this._draft[h];this._setPerson(e.id,{theme:u.theme??this._latest(h)?.theme??null,sidebar:ge(u.sidebar??this._latest(h)?.sidebar??null)})}}
            >
              <option value="">${this.t("pick_person")}</option>
              ${r.map(c=>n`<option value=${c.id}>${c.name}</option>`)}
            </select>
          </label>
        </div>

        <div class="row">
          <span>
            ${this.t("person_theme")}
            <small>${this.t("now_uses",{value:s?s.theme||this.t("ha_default"):this.t("unknown")})}</small>
            ${this._status(e,t.theme,i.theme,s?.theme,s)}
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
            <small>${this._sidebarSummary(t.sidebar??s?.sidebar)}</small>
            ${this._status(e,t.sidebar,i.sidebar,s?.sidebar,s)}
          </span>
          <select
            aria-label="${this.t("person_sidebar")} (${e.name})"
            @change=${c=>{let h=c.target.value;h===""?this._setPerson(e.id,{sidebar:null}):h!=="keep"&&this._setPerson(e.id,{sidebar:ge(this._latest(h).sidebar)})}}
          >
            <option value="" ?selected=${!t.sidebar}>${this.t("self_choice")}</option>
            ${t.sidebar?n`<option value="keep" selected>${this._sidebarSummary(t.sidebar)}</option>`:l}
            ${d.map(c=>n`<option value=${c.id}>${this.t("like_person",{name:c.name})}</option>`)}
            ${s?.sidebar?n`<option value=${e.id}>${this.t("like_person",{name:e.name})}</option>`:l}
          </select>
        </div>
      </div>
    `}_themeOptions(e){let t=[...this._state.themes];return e&&!t.includes(e)&&t.push(e),t.map(i=>n`<option ?selected=${i===e}>${i}</option>`)}_sidebarSummary(e){return e?[this.t("order_count",{count:e.panelOrder?.length??0}),this.t("hidden_count",{count:e.hiddenPanels?.length??0})].join(" \xB7 "):this.t("unknown")}_status(e,t,i,s,a){if(t==null||!me(t,i))return l;let r=a&&me(s,i);return n`<small class=${r?"ok":"wait"}>
      <ha-icon icon=${r?"mdi:check-circle":"mdi:clock-outline"}></ha-icon>
      ${r?this.t("applied"):this.t("pending",{name:e.name})}
    </small>`}};g(M,"properties",{...v.properties,_state:{state:!0},_draft:{state:!0}}),g(M,"styles",[v.styles,b`
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
    `]);customElements.get("ss-people-tab")||customElements.define("ss-people-tab",M);var U=-1,B=class extends _{constructor(){super(),this.items=[],this.categories=[],this.hidden=[],this._selected=null,this._confirm=null,this._dropTarget=null}_emit(e,t=this.hidden){let i=this.canHide?{categories:e,hidden:t}:{categories:e};this.dispatchEvent(new CustomEvent("change",{detail:i}))}_clone(){return this.categories.map(e=>({name:e.name,panels:[...e.panels]}))}_move(e,t,i=null){let s=this._clone();for(let a of s)a.panels=a.panels.filter(r=>r!==e);if(t!==U){let a=s[t].panels,r=i===null?-1:a.indexOf(i);a.splice(r===-1?a.length:r,0,e)}this._emit(s)}_shift(e,t,i){let s=this._clone(),a=s[t].panels,r=a.indexOf(e),d=r+i;r===-1||d<0||d>=a.length||([a[r],a[d]]=[a[d],a[r]],this._emit(s))}_toggleHidden(e){let t=this.hidden.includes(e)?this.hidden.filter(i=>i!==e):[...this.hidden,e];this._emit(this.categories,t)}_addGroup(){let e=new Set(this.categories.map(i=>i.name.toLowerCase())),t=this.t("new_group");for(let i=2;e.has(t.toLowerCase());i+=1)t=`${this.t("new_group")} ${i}`;this._emit([...this._clone(),{name:t,panels:[]}])}_rename(e,t){let i=this._clone();i[e].name=t.trim()||i[e].name,this._emit(i)}_swapGroups(e,t){let i=this._clone(),s=e+t;s<0||s>=i.length||([i[e],i[s]]=[i[s],i[e]],this._emit(i))}_removeGroup(e){this._confirm=null,this._emit(this._clone().filter((t,i)=>i!==e))}_item(e){return this.items.find(t=>t.path===e)??{path:e,title:e,icon:"mdi:help",missing:!0}}render(){let e=new Set(this.categories.flatMap(i=>i.panels)),t=this.items.filter(i=>!e.has(i.path));return n`
      ${this._zone(U,t,n`
        <div class="title">
          <strong>${this.t("ungrouped")}</strong>
          <span class="hint">${this.t("ungrouped_hint")}</span>
        </div>
      `)}
      ${this.categories.map((i,s)=>this._zone(s,i.panels.map(a=>this._item(a)),this._groupHeader(i,s)))}
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
    `}_zone(e,t,i){let s=this._selected,a=s&&s.group!==e;return n`
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
        ${a?n`<button class="here" @click=${()=>this._moveSelected(e)}>
              <ha-icon icon="mdi:arrow-down-bold"></ha-icon>${this.t("move_here")}
            </button>`:l}
      </section>
    `}_chip(e,t){let i=this.hidden.includes(e.path),s=this._selected?.path===e.path,a=t===U?[]:this.categories[t].panels,r=a.indexOf(e.path);return n`
      <div
        class="chip ${i?"hidden":""} ${s?"selected":""}"
        draggable=${this.disabled?"false":"true"}
        @dragstart=${d=>{d.dataTransfer.setData("text/plain",e.path),d.dataTransfer.effectAllowed="move"}}
        @dragend=${()=>this._dropTarget=null}
        @drop=${d=>{d.stopPropagation(),this._drop(d,t,e.path)}}
      >
        <button
          class="label"
          ?disabled=${this.disabled}
          aria-pressed=${s?"true":"false"}
          @click=${()=>this._selected=s?null:{path:e.path,group:t}}
        >
          <ha-icon .icon=${e.icon}></ha-icon>
          <span>${e.title}</span>
          ${e.missing?n`<em>${this.t("missing")}</em>`:l}
        </button>
        ${s&&t!==U?n`
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
                ?disabled=${r===a.length-1}
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
    `}_dragOver(e,t){this.disabled||(e.preventDefault(),e.dataTransfer.dropEffect="move",this._dropTarget=t)}_drop(e,t,i){if(this.disabled)return;e.preventDefault(),this._dropTarget=null;let s=e.dataTransfer.getData("text/plain");s&&s!==i&&this._move(s,t,i)}_moveSelected(e){let{path:t}=this._selected;this._selected={path:t,group:e},this._move(t,e)}};g(B,"properties",{items:{attribute:!1},categories:{attribute:!1},hidden:{attribute:!1},disabled:{type:Boolean},canHide:{type:Boolean},t:{attribute:!1},_selected:{state:!0},_confirm:{state:!0},_dropTarget:{state:!0}}),g(B,"styles",b`
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
  `);customElements.get("ss-groups-editor")||customElements.define("ss-groups-editor",B);var Be={phone:{width:430,height:640},tablet:{width:768,height:600},desktop:{width:760,height:560}},L=class extends _{constructor(){super(),this.settingsLabel="Settings",this.items=[],this.device="desktop",this.page="light",this.expanded=!0,this._scale=1}connectedCallback(){super.connectedCallback(),this._resize=new ResizeObserver(()=>this._fit()),this._resize.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this._resize?.disconnect()}updated(e){e.has("device")&&this._fit()}_fit(){let{width:e}=Be[this.device];this._scale=Math.min(1,this.clientWidth/e)||1}render(){let e=this.settings;if(!e)return l;let{width:t,height:i}=Be[this.device];return n`
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
    `}_modal(e){let t=this.device==="phone",i=t&&e.floating?e.inset:0,s=t?Math.min(430*.9,e.mobile_width):256;return n`
      ${this._page()}
      <div class="backdrop ${t&&e.mobile_blur?"blurred":""}"></div>
      <div class="drawer ${t?"":"plain"}" style="width:${s}px;padding:${i}px">
        ${this._sidebar(e,{radius:t&&e.floating?e.radius:0,floating:t&&e.floating,opacity:t?Math.min(e.opacity+12,100):e.opacity,phone:t,expanded:!0})}
      </div>
    `}_shell(e){return e.shell==="custom"?`background:${e.shell_color}`:e.shell==="theme"?"background:var(--primary-background-color)":"background:transparent"}_sidebar(e,{radius:t,floating:i,opacity:s=e.opacity,phone:a=!1,expanded:r=this.expanded}){let d=Math.min(Math.max((e.floating?e.radius:0)-6,8),14),c=[`border-radius:${t}px`,`--ss-opacity:${s}%`,`--ss-blur:${e.blur}px`,`--ss-item-radius:${d}px`,`--ss-phone-text:${e.mobile_text_size??14}px`,e.accent?`--sidebar-selected-icon-color:${e.accent};--sidebar-selected-text-color:${e.accent}`:""].join(";"),h=this._rows(e),u=h.find(p=>p.item)?.item.path;return n`
      <nav
        class="sidebar ${i?"floating":""} ${a?"phone":""} ${r?"expanded":""} ${e.highlight}"
        style=${c}
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
    `}_rows(e){let t=new Set(e.hidden??[]),i=new Set(e.categories.flatMap(d=>d.panels)),s=new Map(this.items.map(d=>[d.path,d])),a=this.items.filter(d=>!i.has(d.path)&&!t.has(d.path)).map(d=>({item:d})),r=new Set;for(let d of e.categories){let c=d.panels.filter(h=>!r.has(h)&&!t.has(h)&&s.has(h)).map(h=>s.get(h));c.forEach(h=>r.add(h.path)),c.length&&(a.push({heading:d.name}),a.push(...c.map(h=>({item:h}))))}return a}_page(){return n`
      <div class="page">
        <div class="toolbar"></div>
        <div class="cards">
          ${[0,1,2,3,4,5].map(()=>n`<div class="card"></div>`)}
        </div>
      </div>
    `}};g(L,"properties",{settings:{attribute:!1},items:{attribute:!1},device:{},page:{},expanded:{type:Boolean},settingsLabel:{},_scale:{state:!0}}),g(L,"styles",b`
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
  `);customElements.get("ss-sidebar-preview")||customElements.define("ss-sidebar-preview",L);var ct=new Set(["config","profile","notfound"]),Le=o=>o==null?o:JSON.parse(JSON.stringify(o)),dt=(o,e)=>JSON.stringify(o)===JSON.stringify(e);function ht(o,e){let t=a=>String(a).split(".").map(r=>parseInt(r,10)||0),[i,s]=[t(o),t(e)];for(let a=0;a<Math.max(i.length,s.length);a+=1)if((i[a]??0)!==(s[a]??0))return(i[a]??0)<(s[a]??0);return!1}var Y=class extends v{constructor(){super(),this._draft=null,this._device=window.innerWidth<=600?"phone":window.innerWidth<=870?"tablet":"desktop",this._page="light",this._expanded=!0,this._haSidebar={}}connectedCallback(){super.connectedCallback(),this.hass.callWS({type:"frontend/get_user_data",key:"sidebar"}).then(e=>this._haSidebar=e?.value??{}).catch(()=>{})}willUpdate(e){e.has("glass")&&(this._draft=Le(this.glass?.sidebar??null))}get dirty(){return this._draft!==null&&!dt(this._draft,this.glass?.sidebar??null)}_set(e,t){this._edit({[e]:t})}_edit(e){this._draft={...this._draft,...e},this._toast=null}_reload(){this.dispatchEvent(new CustomEvent("reload"))}_save(){this._run(async()=>{await this.hass.callWS({type:"style_studio/sidebar/save",sidebar:this._draft}),this._reload()},this.t("saved"))}_undo(){this._ask(this.t("undo_confirm"),()=>this._run(async()=>{let{restored:e}=await this.hass.callWS({type:"style_studio/sidebar/undo"});if(!e)throw new Error(this.t("nothing_to_undo"));this._reload()},this.t("undone")))}_items(){let e=this._haSidebar.panelOrder??[],t=new Set(this._haSidebar.hiddenPanels??[]),i=s=>{let a=e.indexOf(s);return a===-1?e.length:a};return Object.values(this.hass.panels??{}).filter(s=>(s.title||s.url_path==="lovelace")&&!ct.has(s.url_path)&&!t.has(s.url_path)).map(s=>({path:s.url_path,icon:s.icon||"mdi:view-dashboard",title:this._panelTitle(s)})).sort((s,a)=>i(s.path)-i(a.path)||(a.path==="lovelace")-(s.path==="lovelace")||s.title.localeCompare(a.title))}_panelTitle(e){return e.title?this.hass.localize(`panel.${e.title}`)||e.title:this.hass.localize("panel.states")||"Overview"}render(){let e=this.glass;if(!e)return l;if(!e.version&&!e.added)return n`<div class="card">
        <h2>${this.t("glass_missing_title")}</h2>
        <p class="hint">${this.t("glass_missing")}</p>
      </div>`;if(!e.added||!this._draft)return n`<div class="card">
        <h2>${this.t("glass_not_added_title")}</h2>
        <p class="hint">${this.t("glass_not_added")}</p>
      </div>`;let t=this._draft;return n`
      <p class="intro">${this.t("glass_intro")}</p>
      ${e.version&&ht(e.version,e.min_version)?this._warning(this.t("glass_old",{version:e.version,min:e.min_version})):l}
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
            </button>`:l,onCancel:()=>this._draft=Le(this.glass.sidebar),onSave:()=>this._save()})}
    `}};g(Y,"properties",{...v.properties,glass:{attribute:!1},_draft:{state:!0},_device:{state:!0},_page:{state:!0},_expanded:{state:!0},_haSidebar:{state:!0}});customElements.get("ss-sidebar-tab")||customElements.define("ss-sidebar-tab",Y);var pt=["active","auto","cool","dry","heat","heat_cool","fan_only"],V=class extends _{render(){if(!this.vars)return l;let e=Object.entries(this.vars).map(([i,s])=>`--${i}:${s}`).join(";"),t=this.t;return n`
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
                  ${pt.map(i=>n`<i title=${i} style="background:var(--state-climate-${i}-color)"></i>`)}
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
    `}};g(V,"properties",{vars:{attribute:!1},t:{attribute:!1},popup:{type:Boolean}}),g(V,"styles",b`
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
  `);customElements.get("ss-theme-preview")||customElements.define("ss-theme-preview",V);var ve=[{key:"basis",nl:"Basis",en:"Basics",vars:[["primary-color","Hoofdkleur","Primary color","color"],["accent-color","Accentkleur","Accent color","color"],["light-primary-color","Hoofdkleur licht","Primary color, light","color"],["dark-primary-color","Hoofdkleur donker","Primary color, dark","color"],["text-primary-color","Tekst op de hoofdkleur","Text on primary color","color"],["primary-background-color","Achtergrond","Background","color"],["secondary-background-color","Tweede achtergrond","Secondary background","color"],["divider-color","Scheidingslijnen","Dividers","color"]]},{key:"text",nl:"Tekst",en:"Text",vars:[["primary-text-color","Tekst","Text","color"],["secondary-text-color","Tekst, tweede","Secondary text","color"],["disabled-text-color","Tekst, uitgeschakeld","Disabled text","color"]]},{key:"header",nl:"Bovenbalk",en:"Top bar",vars:[["app-header-background-color","Achtergrond","Background","color"],["app-header-text-color","Tekst en iconen","Text and icons","color"],["app-header-selection-bar-color","Streep onder actieve tab","Active tab bar","color"],["app-header-edit-background-color","Achtergrond bij bewerken","Background while editing","color"],["app-header-edit-text-color","Tekst bij bewerken","Text while editing","color"]]},{key:"sidebar",nl:"Zijbalk (menu)",en:"Sidebar (menu)",vars:[["sidebar-background-color","Achtergrond","Background","color"],["sidebar-text-color","Tekst","Text","color"],["sidebar-icon-color","Iconen","Icons","color"],["sidebar-selected-icon-color","Icoon actieve pagina","Active page icon","color"],["sidebar-selected-text-color","Tekst actieve pagina","Active page text","color"]]},{key:"cards",nl:"Kaarten",en:"Cards",vars:[["card-background-color","Achtergrond","Background","color"],["ha-card-background","Achtergrond (dashboard)","Background (dashboard)","color"],["ha-card-border-color","Rand","Border","color"],["ha-card-border-width","Randdikte","Border width","size"],["ha-card-border-radius","Hoeken","Corners","size"],["ha-card-box-shadow","Schaduw","Shadow","shadow"]]},{key:"popups",nl:"Pop-ups (Bubble Card)",en:"Pop-ups (Bubble Card)",vars:[["bubble-pop-up-background-color","Achtergrond pop-up","Pop-up background","color"],["bubble-pop-up-main-background-color","Achtergrond inhoud","Content background","color"],["bubble-main-background-color","Knoppen, achtergrond","Buttons, background","color"],["bubble-secondary-background-color","Tweede achtergrond","Secondary background","color"],["bubble-button-background-color","Knop","Button","color"],["bubble-icon-background-color","Achter iconen","Behind icons","color"]]},{key:"dialogs",nl:"Vensters (meer info, instellingen)",en:"Dialogs (more info, settings)",vars:[["ha-dialog-surface-background","Achtergrond","Background","color"],["mdc-theme-surface","Achtergrond (oudere vensters)","Background (older dialogs)","color"],["dialog-box-shadow","Schaduw","Shadow","shadow"],["ha-dialog-border-radius","Hoeken","Corners","size"]]},{key:"controls",nl:"Schakelaars en schuiven",en:"Switches and sliders",vars:[["switch-checked-color","Schakelaar aan","Switch on","color"],["switch-checked-button-color","Knopje aan","Knob on","color"],["switch-checked-track-color","Baan aan","Track on","color"],["switch-unchecked-button-color","Knopje uit","Knob off","color"],["switch-unchecked-track-color","Baan uit","Track off","color"],["slider-color","Schuif","Slider","color"],["slider-bar-color","Baan van de schuif","Slider track","color"]]},{key:"inputs",nl:"Invoervelden",en:"Input fields",vars:[["input-fill-color","Achtergrond","Background","color"],["mdc-text-field-fill-color","Achtergrond (oudere velden)","Background (older fields)","color"],["input-ink-color","Tekst","Text","color"],["input-label-ink-color","Label","Label","color"],["code-editor-background-color","Code-editor","Code editor","color"]]},{key:"states",nl:"Status en iconen",en:"States and icons",vars:[["state-icon-color","Icoon (uit)","Icon (off)","color"],["state-active-color","Aan (algemeen)","On (general)","color"],["state-light-active-color","Lamp aan","Light on","color"],["state-switch-active-color","Schakelaar aan","Switch on","color"],["state-fan-active-color","Ventilator aan","Fan on","color"],["state-cover-active-color","Zonwering open","Cover open","color"],["state-inactive-color","Uit (algemeen)","Off (general)","color"],["state-unavailable-color","Niet beschikbaar","Unavailable","color"]]},{key:"climate",nl:"Airco-ring",en:"Climate ring",vars:[["state-climate-active-color","Actief","Active","color"],["state-climate-auto-color","Auto","Auto","color"],["state-climate-cool-color","Koelen","Cool","color"],["state-climate-dry-color","Drogen","Dry","color"],["state-climate-heat-color","Verwarmen","Heat","color"],["state-climate-heat_cool-color","Koelen en verwarmen","Heat and cool","color"],["state-climate-fan_only-color","Alleen ventilator","Fan only","color"]]},{key:"alerts",nl:"Meldingen",en:"Alerts",vars:[["error-color","Fout","Error","color"],["warning-color","Waarschuwing","Warning","color"],["success-color","Gelukt","Success","color"],["info-color","Informatie","Info","color"]]},{key:"weather",nl:"Weerkaart",en:"Weather card",vars:[["weather-card-gradient","Achtergrond (verloop)","Background (gradient)","text"],["weather-card-accent","Accent","Accent","color"]]}],Ge=new Set(ve.flatMap(o=>o.vars.map(([e])=>e))),w={background:"#f4efe6",card:"#fffaf2",text:"#3b3127",accent:"#f59e0b",sidebar:"#fbf6ec",header:null,radius:16,shadow:"soft",card_opacity:100,popup:"solid",popup_opacity:80},Ie={sand:{nl:"Zand en geel",en:"Sand and yellow",base:{...w}},pink:{nl:"Roze",en:"Pink",base:{...w,background:"#fbf1f4",card:"#fffafc",text:"#3d2b33",accent:"#e8749e",sidebar:"#fdf5f8"}},dark:{nl:"Donker",en:"Dark",base:{...w,background:"#111418",card:"#1b1f25",text:"#e6e8eb",accent:"#f5b301",sidebar:"#161a1f",shadow:"none"}},glass:{nl:"Glas",en:"Glass",base:{...w,background:"#dfe7ef",card:"#ffffff",text:"#1f2a37",accent:"#3b82f6",sidebar:"#f3f6fa",radius:20,card_opacity:62,popup:"glass",popup_opacity:72}}},_e={none:"none",soft:"0 1px 2px rgba(0, 0, 0, 0.05), 0 4px 14px rgba(0, 0, 0, 0.06)",strong:"0 2px 4px rgba(0, 0, 0, 0.08), 0 12px 32px rgba(0, 0, 0, 0.14)"};function X(o){let e=parseInt(o.slice(1),16);return[e>>16&255,e>>8&255,e&255]}function ut([o,e,t]){return`#${[o,e,t].map(i=>Math.round(i).toString(16).padStart(2,"0")).join("")}`}function m(o,e,t){let[i,s]=[X(o),X(e)];return ut(i.map((a,r)=>a*t+s[r]*(1-t)))}function Ve(o,e){if(e>=100)return o;let[t,i,s]=X(o);return`rgba(${t}, ${i}, ${s}, ${e/100})`}function We(o){let[e,t,i]=X(o).map(s=>{let a=s/255;return a<=.03928?a/12.92:((a+.055)/1.055)**2.4});return .2126*e+.7152*t+.0722*i}function be(o){return We(o)>.45?"#1f1f1f":"#ffffff"}var gt=o=>We(o)<.2;function Q(o){let e={...w,...o},t=gt(e.background),i=e.header??e.background,s=Ve(e.card,e.card_opacity),a=m(e.text,e.background,.62),r=m(e.text,e.background,t?.16:.12),d=e.popup==="glass"?Ve(e.card,e.popup_opacity):e.card,c=(h,u)=>m(h,e.card,u);return{"primary-color":e.accent,"accent-color":e.accent,"light-primary-color":m(e.accent,e.background,.4),"dark-primary-color":m(e.accent,"#000000",.8),"text-primary-color":be(e.accent),"primary-background-color":e.background,"secondary-background-color":m(e.text,e.background,t?.06:.04),"divider-color":r,"primary-text-color":e.text,"secondary-text-color":a,"disabled-text-color":m(e.text,e.background,.38),"app-header-background-color":i,"app-header-text-color":i===e.background?e.text:be(i),"app-header-selection-bar-color":e.accent,"app-header-edit-background-color":m(e.text,e.background,.75),"app-header-edit-text-color":be(m(e.text,e.background,.75)),"sidebar-background-color":e.sidebar,"sidebar-text-color":e.text,"sidebar-icon-color":a,"sidebar-selected-icon-color":e.accent,"sidebar-selected-text-color":t?e.accent:m(e.accent,e.text,.7),"card-background-color":s,"ha-card-background":s,"ha-card-border-color":r,"ha-card-border-width":"1px","ha-card-border-radius":`${e.radius}px`,"ha-card-box-shadow":_e[e.shadow]??_e.soft,"bubble-pop-up-background-color":d,"bubble-pop-up-main-background-color":d,"bubble-main-background-color":m(e.text,e.card,t?.08:.05),"bubble-secondary-background-color":m(e.text,e.card,t?.12:.08),"bubble-button-background-color":c(e.accent,.22),"bubble-icon-background-color":c(e.accent,.18),"ha-dialog-surface-background":e.card,"mdc-theme-surface":e.card,"dialog-box-shadow":_e.strong,"ha-dialog-border-radius":`${Math.max(e.radius+8,12)}px`,"switch-checked-color":e.accent,"switch-checked-button-color":e.accent,"switch-checked-track-color":e.accent,"switch-unchecked-button-color":t?"#9aa0a6":"#fafafa","switch-unchecked-track-color":m(e.text,e.background,.35),"slider-color":e.accent,"slider-bar-color":m(e.accent,e.background,.3),"input-fill-color":m(e.text,e.card,.05),"mdc-text-field-fill-color":m(e.text,e.card,.05),"input-ink-color":e.text,"input-label-ink-color":a,"code-editor-background-color":e.card,"state-icon-color":a,"state-active-color":e.accent,"state-light-active-color":e.accent,"state-switch-active-color":e.accent,"state-fan-active-color":e.accent,"state-cover-active-color":e.accent,"state-inactive-color":m(e.text,e.background,.4),"state-unavailable-color":m(e.text,e.background,.3),"state-climate-active-color":e.accent,"state-climate-auto-color":"#43a047","state-climate-cool-color":"#2196f3","state-climate-dry-color":"#efbd07","state-climate-heat-color":"#ff8100","state-climate-heat_cool-color":"#ffa000","state-climate-fan_only-color":"#00bcd4","error-color":"#db4437","warning-color":"#ffa600","success-color":"#43a047","info-color":"#039be5","weather-card-gradient":`linear-gradient(135deg, ${c(e.accent,.35)}, ${e.card})`,"weather-card-accent":e.accent}}function ee(o){return{...Q(o.base),...o.overrides}}function Ke(o){let e=s=>{let a=String(o[s]??"").trim();return/^#[0-9a-f]{6}$/i.test(a)?a.toLowerCase():null},t={...w};t.background=e("primary-background-color")??t.background,t.card=e("card-background-color")??e("ha-card-background")??t.card,t.text=e("primary-text-color")??t.text,t.accent=e("primary-color")??t.accent,t.sidebar=e("sidebar-background-color")??t.background,t.header=e("app-header-background-color");let i={};for(let[s,a]of Object.entries(o))(typeof a=="string"||typeof a=="number")&&(i[s]=String(a));return{base:t,overrides:i}}var fe=o=>o==null?o:JSON.parse(JSON.stringify(o)),mt=(o,e)=>JSON.stringify(o)===JSON.stringify(e),_t=/^#[0-9a-f]{6}$/i,z="new",G=class extends v{constructor(){super(),this._selected=null,this._draft=null,this._picking=!1,this._wholeScreen=!1,this._popup=!0,this._newVar={key:"",value:""},this._applied=null}connectedCallback(){super.connectedCallback(),this._load()}disconnectedCallback(){super.disconnectedCallback(),this._applyToScreen(null)}updated(){this._applyToScreen(this._wholeScreen&&this._draft?ee(this._draft):null)}get _lang(){return(this.hass?.locale?.language||this.hass?.language||"nl").startsWith("nl")?"nl":"en"}get _saved(){return this._state?.themes.find(e=>e.id===this._selected)??null}get dirty(){if(!this._draft)return!1;if(this._selected===z)return!0;let e=this._saved;return!e||!mt(this._editable(this._draft),this._editable(e))}_editable(e){return{name:e.name,base:e.base,overrides:e.overrides}}async _load(e){try{this._state=await this.hass.callWS({type:"style_studio/themes/get"}),this._select(e??this._selected??this._state.themes[0]?.id??null)}catch(t){this._error(t)}}_select(e){let t=this._state.themes.find(i=>i.id===e);this._selected=t?e:null,this._draft=t?fe(this._editable(t)):null,this._picking=!t}_applyToScreen(e){let t=document.documentElement;if(this._applied){for(let[i,s]of Object.entries(this._applied))s?t.style.setProperty(i,s):t.style.removeProperty(i);this._applied=null}if(e){this._applied={};for(let[i,s]of Object.entries(e))this._applied[`--${i}`]=t.style.getPropertyValue(`--${i}`),t.style.setProperty(`--${i}`,s)}}_uniqueName(e){let t=new Set([...this._state.themes.map(s=>s.name.toLowerCase()),...Object.keys(this._state.others).map(s=>s.toLowerCase())]),i=e;for(let s=2;t.has(i.toLowerCase());s+=1)i=`${e} ${s}`;return i}_startNew(e,t,i={}){this._selected=z,this._picking=!1,this._draft={name:this._uniqueName(e),base:fe(t),overrides:fe(i)}}_set(e,t){this._draft={...this._draft,base:{...this._draft.base,[e]:t}},this._toast=null}_override(e,t){let i={...this._draft.overrides};t===""||t==null?delete i[e]:i[e]=t,this._draft={...this._draft,overrides:i},this._toast=null}_cancel(){this._selected===z?this._select(this._state.themes[0]?.id??null):this._select(this._selected)}_save(){let e={...this._draft,vars:ee(this._draft)};this._selected!==z&&(e.id=this._selected),this._run(async()=>{try{let t=await this.hass.callWS({type:"style_studio/themes/save",theme:e});this._wholeScreen=!1,this._state=t,this._select(t.theme.id)}catch(t){throw this._known(t)}},this.t("saved_theme",{file:this._state.file}))}_known(e){let t={file_exists:"err_file_exists",name_taken:"err_name_taken"}[e?.code];return t?new Error(this.t(t)):e}_delete(){this._ask(this.t("delete_confirm",{name:this._saved.name}),()=>this._run(async()=>{this._state=await this.hass.callWS({type:"style_studio/themes/delete",theme_id:this._selected}),this._select(this._state.themes[0]?.id??null)},this.t("deleted")))}_undo(){this._ask(this.t("undo_confirm"),()=>this._run(async()=>{let e=await this.hass.callWS({type:"style_studio/themes/undo"});if(!e.restored)throw new Error(this.t("nothing_to_undo"));this._state=e,this._select(this._selected)},this.t("undone")))}_setDefault(){let e=this._saved.name;this._run(async()=>{this._state=await this.hass.callWS({type:"style_studio/themes/set_default",name:e})},this.t("default_set",{name:e}))}render(){return this._state?n`
      <p class="intro">${this.t("themes_intro")}</p>
      ${this._list()}
      ${this._leavingQuestion()}
      ${this._picking?this._picker():l}
      ${this._draft?this._editor():l}
      ${this._bar({left:this._barButtons(),onCancel:()=>this._cancel(),onSave:()=>this._save()})}
    `:l}_list(){let{themes:e,loaded:t,default_theme:i}=this._state;return n`
      <div class="chips">
        ${e.map(s=>n`<button
            class="chip ${s.id===this._selected?"active":""}"
            @click=${()=>this._pick(()=>this._select(s.id))}
          >
            <span class="swatch" style="background:${s.vars["primary-color"]}"></span>
            ${s.name}
            ${s.name===i?n`<em>${this.t("badge_default")}</em>`:l}
            ${t.includes(s.name)?l:n`<em class="bad">${this.t("badge_not_loaded")}</em>`}
          </button>`)}
        ${this._selected===z?n`<button class="chip active">${this._draft.name}</button>`:l}
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
    </div>`:l}_useForMe(){let e=this._saved.name;document.querySelector("home-assistant")?.dispatchEvent(new CustomEvent("settheme",{detail:{theme:e}})),this._showToast(this.t("using_now",{name:e}))}_picker(){let e=Object.keys(this._state.others);return n`
      <div class="card">
        <h2>${this.t("start_from")}</h2>
        <div class="presets">
          ${Object.entries(Ie).map(([t,i])=>{let s=Q(i.base);return n`<button
              class="preset"
              data-preset=${t}
              @click=${()=>this._startNew(i[this._lang],i.base)}
            >
              <span class="mini" style="background:${s["primary-background-color"]}">
                <i style="background:${s["sidebar-background-color"]}"></i>
                <b style="background:${s["card-background-color"]}"><s style="background:${s["primary-color"]}"></s></b>
              </span>
              ${i[this._lang]}
            </button>`})}
        </div>
        ${e.length?n`<label class="row">
              <span>${this.t("copy_existing")}</span>
              <select
                @change=${t=>{let i=t.target.value;if(!i)return;let{base:s,overrides:a}=Ke(this._state.others[i]);this._startNew(`${i} (${this.t("copy_suffix")})`,s,a)}}
              >
                <option value="">${this.t("pick_theme")}</option>
                ${e.map(t=>n`<option>${t}</option>`)}
              </select>
            </label>`:l}
      </div>
    `}_editor(){let e=this._draft,t={...w,...e.base},i=Q(t),s=ee(e),a=this._saved;return n`
      ${a&&!this._state.loaded.includes(a.name)?this._warning(this.t("warn_not_loaded")):l}
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
            ${ve.map(r=>n`
                <details>
                  <summary>
                    ${r[this._lang]}
                    <span class="dots">
                      ${r.vars.filter(([,,,d])=>d==="color").slice(0,6).map(([d])=>n`<i style="background:${s[d]}"></i>`)}
                    </span>
                  </summary>
                  ${r.vars.map(([d,c,h,u])=>this._varRow(d,this._lang==="nl"?c:h,u,i[d]))}
                </details>
              `)}
          </div>

          <div class="card">
            <h2>${this.t("custom_vars")}</h2>
            <p class="hint">${this.t("custom_vars_hint")}</p>
            ${Object.entries(e.overrides).filter(([r])=>!Ge.has(r)).map(([r,d])=>this._varRow(r,`--${r}`,"text","",d,!0))}
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
    `}_varRow(e,t,i,s,a=this._draft.overrides[e],r=!1){let d=a??"",c=a??s;return n`
      <div class="var ${a!==void 0?"own":""}">
        <span class="label">${t}<code>--${e}</code></span>
        <span class="inline">
          ${i==="color"?n`<input
                type="color"
                aria-label=${t}
                .value=${_t.test(c)?c:"#000000"}
                @input=${h=>this._override(e,h.target.value)}
              />`:l}
          <input
            type="text"
            aria-label=${t}
            .value=${d}
            placeholder=${s}
            @change=${h=>this._override(e,h.target.value.trim())}
          />
          ${a!==void 0?n`<button
                class="icon"
                title=${r?this.t("remove"):this.t("reset")}
                @click=${()=>this._override(e,null)}
              >
                <ha-icon icon=${r?"mdi:delete-outline":"mdi:restore"}></ha-icon>
              </button>`:n`<span class="icon-space"></span>`}
        </span>
      </div>
    `}_barButtons(){let e=this._selected!==z?this._saved:null,t=[];return this._state.history&&t.push(n`<button ?disabled=${this._busy} @click=${this._undo}>
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
      </button>`)),t.length?t:l}};g(G,"properties",{...v.properties,_state:{state:!0},_selected:{state:!0},_draft:{state:!0},_picking:{state:!0},_wholeScreen:{state:!0},_popup:{state:!0},_newVar:{state:!0},_leaving:{state:!0}}),g(G,"styles",[v.styles,b`
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
    `]);customElements.get("ss-themes-tab")||customElements.define("ss-themes-tab",G);var xe="0.2.0";var bt=["themes","sidebar","rooms","climate","people","check"],I=class extends _{constructor(){super(),this._tab="themes",this._leaving=null}get t(){return Z(this.hass)}willUpdate(e){e.has("hass")&&this.hass&&!this._loading&&(this._loading=this._load())}async _load(){try{this._data=await this.hass.callWS({type:"style_studio/get"})}catch(e){this._error=e.message??String(e)}}_pickTab(e){if(e===this._tab)return;this.renderRoot.querySelector(".tab-content > *")?.dirty?this._leaving=e:this._tab=e}render(){return n`
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
      ${this._staleVersion()?n`<div class="warning">
            <ha-icon icon="mdi:alert-outline"></ha-icon>
            ${this.t("warn_old_panel",{old:this._staleVersion(),new:this._data.version})}
          </div>`:l}
      <nav class="tabs">
        ${bt.map(e=>n`<button
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
    `}_staleVersion(){let e=window.__styleStudio?.version;return xe!==this._data.version?xe:e&&e!==this._data.version?e:null}_tabContent(){switch(this._tab){case"themes":return n`<ss-themes-tab .hass=${this.hass} .narrow=${this.narrow}></ss-themes-tab>`;case"people":return n`<ss-people-tab .hass=${this.hass} .narrow=${this.narrow}></ss-people-tab>`;case"sidebar":return n`<ss-sidebar-tab
          .hass=${this.hass}
          .narrow=${this.narrow}
          .glass=${this._data.glass_sidebar}
          @reload=${()=>this._load()}
        ></ss-sidebar-tab>`;default:return n`<div class="card coming">${this.t("coming")}</div>`}}};g(I,"properties",{hass:{attribute:!1},narrow:{type:Boolean},panel:{attribute:!1},_data:{state:!0},_tab:{state:!0},_leaving:{state:!0}}),g(I,"styles",b`
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
  `);customElements.get("style-studio-panel")||customElements.define("style-studio-panel",I);
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
