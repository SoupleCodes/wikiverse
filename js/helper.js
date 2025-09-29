/*! @license DOMPurify 3.0.8 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.0.8/LICENSE */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).DOMPurify=t()}(this,(function(){"use strict";const{entries:e,setPrototypeOf:t,isFrozen:n,getPrototypeOf:o,getOwnPropertyDescriptor:r}=Object;let{freeze:i,seal:a,create:l}=Object,{apply:c,construct:s}="undefined"!=typeof Reflect&&Reflect;i||(i=function(e){return e}),a||(a=function(e){return e}),c||(c=function(e,t,n){return e.apply(t,n)}),s||(s=function(e,t){return new e(...t)});const u=b(Array.prototype.forEach),m=b(Array.prototype.pop),f=b(Array.prototype.push),p=b(String.prototype.toLowerCase),d=b(String.prototype.toString),h=b(String.prototype.match),g=b(String.prototype.replace),T=b(String.prototype.indexOf),y=b(String.prototype.trim),E=b(RegExp.prototype.test),A=(_=TypeError,function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return s(_,t)});var _;function b(e){return function(t){for(var n=arguments.length,o=new Array(n>1?n-1:0),r=1;r<n;r++)o[r-1]=arguments[r];return c(e,t,o)}}function N(e,o){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:p;t&&t(e,null);let i=o.length;for(;i--;){let t=o[i];if("string"==typeof t){const e=r(t);e!==t&&(n(o)||(o[i]=e),t=e)}e[t]=!0}return e}function S(e){for(let t=0;t<e.length;t++)void 0===r(e,t)&&(e[t]=null);return e}function R(t){const n=l(null);for(const[o,i]of e(t))void 0!==r(t,o)&&(Array.isArray(i)?n[o]=S(i):i&&"object"==typeof i&&i.constructor===Object?n[o]=R(i):n[o]=i);return n}function w(e,t){for(;null!==e;){const n=r(e,t);if(n){if(n.get)return b(n.get);if("function"==typeof n.value)return b(n.value)}e=o(e)}return function(e){return console.warn("fallback value for",e),null}}const D=i(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),L=i(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),v=i(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),x=i(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),k=i(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),C=i(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),O=i(["#text"]),I=i(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","xmlns","slot"]),M=i(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),U=i(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),P=i(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),F=a(/\{\{[\w\W]*|[\w\W]*\}\}/gm),H=a(/<%[\w\W]*|[\w\W]*%>/gm),z=a(/\${[\w\W]*}/gm),B=a(/^data-[\-\w.\u00B7-\uFFFF]/),W=a(/^aria-[\-\w]+$/),G=a(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Y=a(/^(?:\w+script|data):/i),j=a(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),q=a(/^html$/i);var X=Object.freeze({__proto__:null,MUSTACHE_EXPR:F,ERB_EXPR:H,TMPLIT_EXPR:z,DATA_ATTR:B,ARIA_ATTR:W,IS_ALLOWED_URI:G,IS_SCRIPT_OR_DATA:Y,ATTR_WHITESPACE:j,DOCTYPE_NAME:q});const K=function(){return"undefined"==typeof window?null:window},V=function(e,t){if("object"!=typeof e||"function"!=typeof e.createPolicy)return null;let n=null;const o="data-tt-policy-suffix";t&&t.hasAttribute(o)&&(n=t.getAttribute(o));const r="dompurify"+(n?"#"+n:"");try{return e.createPolicy(r,{createHTML:e=>e,createScriptURL:e=>e})}catch(e){return console.warn("TrustedTypes policy "+r+" could not be created."),null}};var $=function t(){let n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:K();const o=e=>t(e);if(o.version="3.0.8",o.removed=[],!n||!n.document||9!==n.document.nodeType)return o.isSupported=!1,o;let{document:r}=n;const a=r,c=a.currentScript,{DocumentFragment:s,HTMLTemplateElement:_,Node:b,Element:S,NodeFilter:F,NamedNodeMap:H=n.NamedNodeMap||n.MozNamedAttrMap,HTMLFormElement:z,DOMParser:B,trustedTypes:W}=n,Y=S.prototype,j=w(Y,"cloneNode"),$=w(Y,"nextSibling"),Z=w(Y,"childNodes"),J=w(Y,"parentNode");if("function"==typeof _){const e=r.createElement("template");e.content&&e.content.ownerDocument&&(r=e.content.ownerDocument)}let Q,ee="";const{implementation:te,createNodeIterator:ne,createDocumentFragment:oe,getElementsByTagName:re}=r,{importNode:ie}=a;let ae={};o.isSupported="function"==typeof e&&"function"==typeof J&&te&&void 0!==te.createHTMLDocument;const{MUSTACHE_EXPR:le,ERB_EXPR:ce,TMPLIT_EXPR:se,DATA_ATTR:ue,ARIA_ATTR:me,IS_SCRIPT_OR_DATA:fe,ATTR_WHITESPACE:pe}=X;let{IS_ALLOWED_URI:de}=X,he=null;const ge=N({},[...D,...L,...v,...k,...O]);let Te=null;const ye=N({},[...I,...M,...U,...P]);let Ee=Object.seal(l(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ae=null,_e=null,be=!0,Ne=!0,Se=!1,Re=!0,we=!1,De=!1,Le=!1,ve=!1,xe=!1,ke=!1,Ce=!1,Oe=!0,Ie=!1;const Me="user-content-";let Ue=!0,Pe=!1,Fe={},He=null;const ze=N({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Be=null;const We=N({},["audio","video","img","source","image","track"]);let Ge=null;const Ye=N({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),je="http://www.w3.org/1998/Math/MathML",qe="http://www.w3.org/2000/svg",Xe="http://www.w3.org/1999/xhtml";let Ke=Xe,Ve=!1,$e=null;const Ze=N({},[je,qe,Xe],d);let Je=null;const Qe=["application/xhtml+xml","text/html"],et="text/html";let tt=null,nt=null;const ot=r.createElement("form"),rt=function(e){return e instanceof RegExp||e instanceof Function},it=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!nt||nt!==e){if(e&&"object"==typeof e||(e={}),e=R(e),Je=-1===Qe.indexOf(e.PARSER_MEDIA_TYPE)?et:e.PARSER_MEDIA_TYPE,tt="application/xhtml+xml"===Je?d:p,he="ALLOWED_TAGS"in e?N({},e.ALLOWED_TAGS,tt):ge,Te="ALLOWED_ATTR"in e?N({},e.ALLOWED_ATTR,tt):ye,$e="ALLOWED_NAMESPACES"in e?N({},e.ALLOWED_NAMESPACES,d):Ze,Ge="ADD_URI_SAFE_ATTR"in e?N(R(Ye),e.ADD_URI_SAFE_ATTR,tt):Ye,Be="ADD_DATA_URI_TAGS"in e?N(R(We),e.ADD_DATA_URI_TAGS,tt):We,He="FORBID_CONTENTS"in e?N({},e.FORBID_CONTENTS,tt):ze,Ae="FORBID_TAGS"in e?N({},e.FORBID_TAGS,tt):{},_e="FORBID_ATTR"in e?N({},e.FORBID_ATTR,tt):{},Fe="USE_PROFILES"in e&&e.USE_PROFILES,be=!1!==e.ALLOW_ARIA_ATTR,Ne=!1!==e.ALLOW_DATA_ATTR,Se=e.ALLOW_UNKNOWN_PROTOCOLS||!1,Re=!1!==e.ALLOW_SELF_CLOSE_IN_ATTR,we=e.SAFE_FOR_TEMPLATES||!1,De=e.WHOLE_DOCUMENT||!1,xe=e.RETURN_DOM||!1,ke=e.RETURN_DOM_FRAGMENT||!1,Ce=e.RETURN_TRUSTED_TYPE||!1,ve=e.FORCE_BODY||!1,Oe=!1!==e.SANITIZE_DOM,Ie=e.SANITIZE_NAMED_PROPS||!1,Ue=!1!==e.KEEP_CONTENT,Pe=e.IN_PLACE||!1,de=e.ALLOWED_URI_REGEXP||G,Ke=e.NAMESPACE||Xe,Ee=e.CUSTOM_ELEMENT_HANDLING||{},e.CUSTOM_ELEMENT_HANDLING&&rt(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(Ee.tagNameCheck=e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),e.CUSTOM_ELEMENT_HANDLING&&rt(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(Ee.attributeNameCheck=e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),e.CUSTOM_ELEMENT_HANDLING&&"boolean"==typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements&&(Ee.allowCustomizedBuiltInElements=e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),we&&(Ne=!1),ke&&(xe=!0),Fe&&(he=N({},O),Te=[],!0===Fe.html&&(N(he,D),N(Te,I)),!0===Fe.svg&&(N(he,L),N(Te,M),N(Te,P)),!0===Fe.svgFilters&&(N(he,v),N(Te,M),N(Te,P)),!0===Fe.mathMl&&(N(he,k),N(Te,U),N(Te,P))),e.ADD_TAGS&&(he===ge&&(he=R(he)),N(he,e.ADD_TAGS,tt)),e.ADD_ATTR&&(Te===ye&&(Te=R(Te)),N(Te,e.ADD_ATTR,tt)),e.ADD_URI_SAFE_ATTR&&N(Ge,e.ADD_URI_SAFE_ATTR,tt),e.FORBID_CONTENTS&&(He===ze&&(He=R(He)),N(He,e.FORBID_CONTENTS,tt)),Ue&&(he["#text"]=!0),De&&N(he,["html","head","body"]),he.table&&(N(he,["tbody"]),delete Ae.tbody),e.TRUSTED_TYPES_POLICY){if("function"!=typeof e.TRUSTED_TYPES_POLICY.createHTML)throw A('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if("function"!=typeof e.TRUSTED_TYPES_POLICY.createScriptURL)throw A('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');Q=e.TRUSTED_TYPES_POLICY,ee=Q.createHTML("")}else void 0===Q&&(Q=V(W,c)),null!==Q&&"string"==typeof ee&&(ee=Q.createHTML(""));i&&i(e),nt=e}},at=N({},["mi","mo","mn","ms","mtext"]),lt=N({},["foreignobject","desc","title","annotation-xml"]),ct=N({},["title","style","font","a","script"]),st=N({},[...L,...v,...x]),ut=N({},[...k,...C]),mt=function(e){let t=J(e);t&&t.tagName||(t={namespaceURI:Ke,tagName:"template"});const n=p(e.tagName),o=p(t.tagName);return!!$e[e.namespaceURI]&&(e.namespaceURI===qe?t.namespaceURI===Xe?"svg"===n:t.namespaceURI===je?"svg"===n&&("annotation-xml"===o||at[o]):Boolean(st[n]):e.namespaceURI===je?t.namespaceURI===Xe?"math"===n:t.namespaceURI===qe?"math"===n&&lt[o]:Boolean(ut[n]):e.namespaceURI===Xe?!(t.namespaceURI===qe&&!lt[o])&&(!(t.namespaceURI===je&&!at[o])&&(!ut[n]&&(ct[n]||!st[n]))):!("application/xhtml+xml"!==Je||!$e[e.namespaceURI]))},ft=function(e){f(o.removed,{element:e});try{e.parentNode.removeChild(e)}catch(t){e.remove()}},pt=function(e,t){try{f(o.removed,{attribute:t.getAttributeNode(e),from:t})}catch(e){f(o.removed,{attribute:null,from:t})}if(t.removeAttribute(e),"is"===e&&!Te[e])if(xe||ke)try{ft(t)}catch(e){}else try{t.setAttribute(e,"")}catch(e){}},dt=function(e){let t=null,n=null;if(ve)e="<remove></remove>"+e;else{const t=h(e,/^[\r\n\t ]+/);n=t&&t[0]}"application/xhtml+xml"===Je&&Ke===Xe&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");const o=Q?Q.createHTML(e):e;if(Ke===Xe)try{t=(new B).parseFromString(o,Je)}catch(e){}if(!t||!t.documentElement){t=te.createDocument(Ke,"template",null);try{t.documentElement.innerHTML=Ve?ee:o}catch(e){}}const i=t.body||t.documentElement;return e&&n&&i.insertBefore(r.createTextNode(n),i.childNodes[0]||null),Ke===Xe?re.call(t,De?"html":"body")[0]:De?t.documentElement:i},ht=function(e){return ne.call(e.ownerDocument||e,e,F.SHOW_ELEMENT|F.SHOW_COMMENT|F.SHOW_TEXT,null)},gt=function(e){return e instanceof z&&("string"!=typeof e.nodeName||"string"!=typeof e.textContent||"function"!=typeof e.removeChild||!(e.attributes instanceof H)||"function"!=typeof e.removeAttribute||"function"!=typeof e.setAttribute||"string"!=typeof e.namespaceURI||"function"!=typeof e.insertBefore||"function"!=typeof e.hasChildNodes)},Tt=function(e){return"function"==typeof b&&e instanceof b},yt=function(e,t,n){ae[e]&&u(ae[e],(e=>{e.call(o,t,n,nt)}))},Et=function(e){let t=null;if(yt("beforeSanitizeElements",e,null),gt(e))return ft(e),!0;const n=tt(e.nodeName);if(yt("uponSanitizeElement",e,{tagName:n,allowedTags:he}),e.hasChildNodes()&&!Tt(e.firstElementChild)&&E(/<[/\w]/g,e.innerHTML)&&E(/<[/\w]/g,e.textContent))return ft(e),!0;if(!he[n]||Ae[n]){if(!Ae[n]&&_t(n)){if(Ee.tagNameCheck instanceof RegExp&&E(Ee.tagNameCheck,n))return!1;if(Ee.tagNameCheck instanceof Function&&Ee.tagNameCheck(n))return!1}if(Ue&&!He[n]){const t=J(e)||e.parentNode,n=Z(e)||e.childNodes;if(n&&t){for(let o=n.length-1;o>=0;--o)t.insertBefore(j(n[o],!0),$(e))}}return ft(e),!0}return e instanceof S&&!mt(e)?(ft(e),!0):"noscript"!==n&&"noembed"!==n&&"noframes"!==n||!E(/<\/no(script|embed|frames)/i,e.innerHTML)?(we&&3===e.nodeType&&(t=e.textContent,u([le,ce,se],(e=>{t=g(t,e," ")})),e.textContent!==t&&(f(o.removed,{element:e.cloneNode()}),e.textContent=t)),yt("afterSanitizeElements",e,null),!1):(ft(e),!0)},At=function(e,t,n){if(Oe&&("id"===t||"name"===t)&&(n in r||n in ot))return!1;if(Ne&&!_e[t]&&E(ue,t));else if(be&&E(me,t));else if(!Te[t]||_e[t]){if(!(_t(e)&&(Ee.tagNameCheck instanceof RegExp&&E(Ee.tagNameCheck,e)||Ee.tagNameCheck instanceof Function&&Ee.tagNameCheck(e))&&(Ee.attributeNameCheck instanceof RegExp&&E(Ee.attributeNameCheck,t)||Ee.attributeNameCheck instanceof Function&&Ee.attributeNameCheck(t))||"is"===t&&Ee.allowCustomizedBuiltInElements&&(Ee.tagNameCheck instanceof RegExp&&E(Ee.tagNameCheck,n)||Ee.tagNameCheck instanceof Function&&Ee.tagNameCheck(n))))return!1}else if(Ge[t]);else if(E(de,g(n,pe,"")));else if("src"!==t&&"xlink:href"!==t&&"href"!==t||"script"===e||0!==T(n,"data:")||!Be[e]){if(Se&&!E(fe,g(n,pe,"")));else if(n)return!1}else;return!0},_t=function(e){return e.indexOf("-")>0},bt=function(e){yt("beforeSanitizeAttributes",e,null);const{attributes:t}=e;if(!t)return;const n={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Te};let r=t.length;for(;r--;){const i=t[r],{name:a,namespaceURI:l,value:c}=i,s=tt(a);let f="value"===a?c:y(c);if(n.attrName=s,n.attrValue=f,n.keepAttr=!0,n.forceKeepAttr=void 0,yt("uponSanitizeAttribute",e,n),f=n.attrValue,n.forceKeepAttr)continue;if(pt(a,e),!n.keepAttr)continue;if(!Re&&E(/\/>/i,f)){pt(a,e);continue}we&&u([le,ce,se],(e=>{f=g(f,e," ")}));const p=tt(e.nodeName);if(At(p,s,f)){if(!Ie||"id"!==s&&"name"!==s||(pt(a,e),f=Me+f),Q&&"object"==typeof W&&"function"==typeof W.getAttributeType)if(l);else switch(W.getAttributeType(p,s)){case"TrustedHTML":f=Q.createHTML(f);break;case"TrustedScriptURL":f=Q.createScriptURL(f)}try{l?e.setAttributeNS(l,a,f):e.setAttribute(a,f),m(o.removed)}catch(e){}}}yt("afterSanitizeAttributes",e,null)},Nt=function e(t){let n=null;const o=ht(t);for(yt("beforeSanitizeShadowDOM",t,null);n=o.nextNode();)yt("uponSanitizeShadowNode",n,null),Et(n)||(n.content instanceof s&&e(n.content),bt(n));yt("afterSanitizeShadowDOM",t,null)};return o.sanitize=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=null,r=null,i=null,l=null;if(Ve=!e,Ve&&(e="\x3c!--\x3e"),"string"!=typeof e&&!Tt(e)){if("function"!=typeof e.toString)throw A("toString is not a function");if("string"!=typeof(e=e.toString()))throw A("dirty is not a string, aborting")}if(!o.isSupported)return e;if(Le||it(t),o.removed=[],"string"==typeof e&&(Pe=!1),Pe){if(e.nodeName){const t=tt(e.nodeName);if(!he[t]||Ae[t])throw A("root node is forbidden and cannot be sanitized in-place")}}else if(e instanceof b)n=dt("\x3c!----\x3e"),r=n.ownerDocument.importNode(e,!0),1===r.nodeType&&"BODY"===r.nodeName||"HTML"===r.nodeName?n=r:n.appendChild(r);else{if(!xe&&!we&&!De&&-1===e.indexOf("<"))return Q&&Ce?Q.createHTML(e):e;if(n=dt(e),!n)return xe?null:Ce?ee:""}n&&ve&&ft(n.firstChild);const c=ht(Pe?e:n);for(;i=c.nextNode();)Et(i)||(i.content instanceof s&&Nt(i.content),bt(i));if(Pe)return e;if(xe){if(ke)for(l=oe.call(n.ownerDocument);n.firstChild;)l.appendChild(n.firstChild);else l=n;return(Te.shadowroot||Te.shadowrootmode)&&(l=ie.call(a,l,!0)),l}let m=De?n.outerHTML:n.innerHTML;return De&&he["!doctype"]&&n.ownerDocument&&n.ownerDocument.doctype&&n.ownerDocument.doctype.name&&E(q,n.ownerDocument.doctype.name)&&(m="<!DOCTYPE "+n.ownerDocument.doctype.name+">\n"+m),we&&u([le,ce,se],(e=>{m=g(m,e," ")})),Q&&Ce?Q.createHTML(m):m},o.setConfig=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};it(e),Le=!0},o.clearConfig=function(){nt=null,Le=!1},o.isValidAttribute=function(e,t,n){nt||it({});const o=tt(e),r=tt(t);return At(o,r,n)},o.addHook=function(e,t){"function"==typeof t&&(ae[e]=ae[e]||[],f(ae[e],t))},o.removeHook=function(e){if(ae[e])return m(ae[e])},o.removeHooks=function(e){ae[e]&&(ae[e]=[])},o.removeAllHooks=function(){ae={}},o}();return $}));
//# sourceMappingURL=purify.min.js.map

// Tabs logic
let tabParents = document.querySelectorAll('.tabs')
if (tabParents) {
    Array.from(tabParents).map(t => {
        let tabs = t.querySelectorAll('.tab')
        let tabsContent = document.querySelector(`#${t.id}.tab-content`)
        Array.from(tabsContent.children).map(c => {
            c.classList.add('hidden')
        })
        tabsContent.children[0].classList.remove('hidden')
        tabs[0].classList.add('selected')

        Array.from(tabs).map((c, index) => {
            c.addEventListener('click', function() {
                tabs.forEach(a => {
                    a.classList.remove('selected')
                    tabsContent.children[index].classList.add('hidden')
                })
                c.classList.add('selected')
                Array.from(tabsContent.children).map(c => {
                    c.classList.add('hidden')
                })
                tabsContent.children[index].classList.remove('hidden')
            })
        });
    });
}

// Window functions
window.dummyData = {
    user: {"id":1,"username":"souple","created_at":"2025-05-01T12:00:51.532Z","last_activity":"2025-09-12T22:58:29.957Z","last_login":"2025-09-12T22:57:14.639Z","about_me":"Hey there! You may know me infamously as the creator of soup, or you may have stumbled upon this site because [s]I was begging[/s] politely pasted the link to this site and did not beg anyone to enter :') \n\nHow do y'all like the new design of wikiverse? Comment on the wall below to post your thoughts :smile:\n\n   [i]9/4/25 4:31pm - How do u guys like the new [b]newer[/b] design? The new design is much simpler (which means easier for me to make pages with consistent design and with less time!)[/i]","display_name":"34 + 35","view_count":781,"pfp_url":"https://u.cubeupload.com/ThatCrownedKing/pfp.png","banner_url":"https://images.unsplash.com/photo-1553696590-4b3f68898333","signature":null,"location":"Soupletopia","social_links":[{"username":"souple","name":"darflen","url":"https://darflen.com/users/souple"},{"username":"sssouple","name":"scratch","url":"https://scratch.mit.edu/users/sssouple"},{"username":"souple","name":"wasteof","url":"https://wasteof.money/users/souple"}],"fav_articles":[],"music":[{"artist_name":"Hogbat","song_name":"Blasting Trout Overbite","song_url":"https://the-collective.net/~sashwap/bto/2004-2005/yes/blasting%20trout%20overbite%20-%2005%20-%20hogbat.mp3","cover_art":"https://f4.bcbits.com/img/a0957670253_16.jpg","published":2005,"album":"YES","genre":"Rock","link":"https://blastingtroutoverbite.bandcamp.com/album/yes"},{"artist_name":"Vanessa Carlton","song_name":"A Thousand Miles","song_url":"https://ia601804.us.archive.org/0/items/a-thousand-miles/A%20Thousand%20Miles.mp3","cover_art":"https://ia600604.us.archive.org/BookReader/BookReaderImages.php?zip=/32/items/cd_a-thousand-miles_vanessa-carlton/cd_a-thousand-miles_vanessa-carlton_jp2.zip&file=cd_a-thousand-miles_vanessa-carlton_jp2/cd_a-thousand-miles_vanessa-carlton_0000.jp2&id=cd_a-thousand-miles_vanessa-carlton&scale=4&rotate=0","published":2001,"album":"Be Not Nobody","genre":"Pop Rock","link":"https://archive.org/details/a-thousand-miles"},{"artist_name":"Michael Jackson","song_name":"Smooth Criminal","song_url":"https://ia801503.us.archive.org/23/items/michael-jackson-smooth-criminal-single-version-hd/Michael%20Jackson%20-%20Smooth%20Criminal%20%28Single%20Version%29%20HD.mp3","cover_art":"https://ia800905.us.archive.org/BookReader/BookReaderImages.php?zip=/4/items/lp_smooth-criminal_michael-jackson/lp_smooth-criminal_michael-jackson_jp2.zip&file=lp_smooth-criminal_michael-jackson_jp2/lp_smooth-criminal_michael-jackson_0000.jp2&id=lp_smooth-criminal_michael-jackson&scale=4&rotate=0","published":1987,"album":"Bad","genre":"R&B","link":""},{"artist_name":"Celine Dion","song_name":"Falling Into You","song_url":"https://dn721600.ca.archive.org/0/items/celine-dion-falling-into-you-2015_202409/3.%20Celine%20Dion%20-%20FALLING%20INTO%20YOU.mp3","cover_art":"https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Falling_into_You.png/250px-Falling_into_You.png","published":1996,"album":"Falling Into You","genre":"Pop","link":""},{"artist_name":"The Orlons","song_name":"Don't Hang Up","song_url":"https://ia803400.us.archive.org/21/items/000502/donthangup.mp3","cover_art":"https://i.discogs.com/Eurz4ip2pA5nLEPkKFHDgWU5jBjEX2qd127KCXKwDcw/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQyNDk2/MTQtMTQ4NzUzMTc2/Ni05OTUyLmpwZWc.jpeg","published":1962,"album":"All The Hits by The Orlons","genre":"R&B","link":""}], "theme": null},

    recentComments: [{"author":"souple","comment":"Testing posting comments on wikiverse. This should have already worked in the previous version but I built this from the ground up so who knows? ¯\\_(ツ)_/¯","comment_id":2,"blog_title":"Welcome again!...","blog_id":35},{"author":"souple","comment":"I use arch btw","comment_id":1,"blog_title":"Welcome again!...","blog_id":35},{"author":"stripes","comment":"its so sad that steve jobs died of ligma","comment_id":14,"blog_title":"Who’s Joe?","blog_id":34}],

    recentArticles: [{"title":"HyperCam","id":20,"author":"souple"},{"title":"Yahoo Messenger","id":18,"author":"souple"},{"title":"BBCode","id":23,"author":"souple"},{"title":"Scratch 2.0","id":3,"author":"souple"},{"title":"Fonts","id":8,"author":"souple"}],

    blogs: {"blogs":[{"id":40,"title":"It Was A Good Day","parent":null,"part":null,"author":"souple","content":"It is a good day.... It's especially a good day because i'm finally[i]-ish[/i] finished with restoring all of Wikiverse. It has all the stuff from before the.... [b]wipe[/b] :straightface:\n\nLooking at you ~barney86 :tongue2:\n\nNow you might tell that some things are still missing:\n- Viewing polls\n- Editing blogs\n- Creating themes\n- Docs\n- The essential TOS\n- and that darn login page still doesn't work\n\nBut trust me, by the time you see this, i'll probably get this all done! And besides, I wouldn't be advertising this place if most of the stuff is still incomplete! :attention:\n\nAnyways, here I inserted this dope beat to this blog (yes you can add music to your blogs now!), because well simply it's a.....\n\n[i]  A lovely day (lovely day, lovely day, lovely day, lovely day)[/i]\n\n:thumbsup:","created_at":"2025-09-11T12:46:27.317Z","last_modified":"2025-09-11T12:46:27.317Z","view_count":58,"tags":["cloud9","lovelyday","wikiverse"],"comments_enabled":1,"style":"body {\n  background: url('https://live.staticflickr.com/5483/9049464263_d79ebc95eb_c.jpg');\n  background-size: cover;\n  background-repeat: no-repeat\n}\n\n#main {\n  \n}\n\n#banner {\n  visibility: hidden;\n  position: absolute;\n}\n\n#content {\n  background: #ffffffc4;\n  outline: 1px solid #ffffffc4;\n  outline-offset: 1px;\n  padding: 10px;\n  margin-top: 7px;\n}\n\np {\n  color: #7d7d7d;\n}","music":{"artist_name":"Bill Withers","song_name":"Lovely Day","song_url":"https://ia801604.us.archive.org/26/items/bill-withers-lovely-day/Bill%20Withers%20-%20Lovely%20Day.mp3","cover_art":"https://upload.wikimedia.org/wikipedia/en/f/f8/Billwithersmenagerie.jpg","published":1977,"album":"Menagerie","genre":"Funk","link":"https://archive.org/details/bill-withers-lovely-day"},"includeglobal":0,"comment_count":0},{"id":36,"title":"What do i think about soup?","parent":null,"part":null,"author":"souple","content":"What do i think about soup? Well soup outmatches LITERALLTY EVERYTHINF. SOUP IS GODO SOUP IS AMAZING SAUCE> I think soup is quite soup-tastic. There’s quite nothing like it really...\n\nDefinition: A liquid dish typically consisting of vegetables or meat or even both that are then simmered in broth or water!\nAwesomeness: 5 out of 5 stars","created_at":"2025-08-18T17:18:32.187Z","last_modified":"2025-08-18T17:18:32.187Z","view_count":47,"tags":["soup"],"comments_enabled":1,"style":null,"music":null,"includeglobal":0,"comment_count":0},{"id":35,"title":"Welcome again!...","parent":null,"part":null,"author":"souple","content":"Hello, friends! After like 2 months, the site has been completely made from scratch and the database from the ground up! The source code for the [url=https://github.com/SoupleCodes/wikidb]database[/url] and the [url=https://github.com/SoupleCodes/wikiverse/]client[/url] is available to be freely viewed on github! (well the client was already open-source anyways but who cares :P) I shutdown the site after an incident where some people decided to make a lil worm that sends your token to some groupchat on discord or somethin. Turns out the same people who did the worm was probably @barney86 and @berry. Wow me! [s]Please harass them by commenting you made wikiverse shut down for 2 months dumdum[/s] Well, im kinda glad it happened before some less than savory actors do some [b]real[/b]. I'll implement proper moderation soon and if some more bad stuff happens again, i might just do an invite code system. \n\nIf you want any of your friends to join [b](if i end up using an invite code system)[/b] please contact me using any of my social links in the profile and I’ll gladly give ‘em an invite code! Anyways what do you think of the new redesign? Any things you missed from the old design or want here? Feel free to comment!\n\nP.S. sorry about yall styles :P\n(sorry stripes)","created_at":"2025-08-18T15:37:52.325Z","last_modified":"2025-08-18T15:37:52.325Z","view_count":114,"tags":["wikiverse","welcome"],"comments_enabled":1,"style":null,"music":null,"includeglobal":null,"comment_count":2},{"id":34,"title":"Who’s Joe?","parent":0,"part":0,"author":"souple","content":"\"Who’s joe?\" a distant voice asks.\n\nInstantly everyone nearby hears the sound of 1,000s of bricks rapidly shuffling towards his location.\n\nThe earth itself seemed to cry out in agony, until finally the ground itself split open and a horrific creature crawled from the ground, covered in mucus and tar.\n\n”Joe Momma…” the creature whispered.\n\nThe man cried out in pain as he disintegrated into dust, and the whole world fell silent in fear.\n\n\"I did a little trolling.\" the wretched creature remarked before burrowing back into the earth.","created_at":"2025-05-11T12:35:56.882Z","last_modified":"2025-05-22T17:33:39.020Z","view_count":44,"tags":["copypasta"],"comments_enabled":1,"style":null,"music":null,"includeglobal":0,"comment_count":1},{"id":1,"title":"Make your own article!","parent":0,"part":0,"author":"souple","content":"idk its pretty self-explanatory\n","created_at":"2025-04-24T15:00:00.000Z","last_modified":"2025-04-24T15:00:00.000Z","view_count":47,"tags":["souple","tutorial"],"comments_enabled":1,"style":null,"music":null,"includeglobal":0,"comment_count":0},{"id":2,"title":"you cant delete articles","parent":0,"part":0,"author":"souple","content":"no seriously you can't,...","created_at":"2025-04-24T15:00:00.000Z","last_modified":"2025-04-24T15:00:00.000Z","view_count":6,"tags":[],"comments_enabled":1,"style":null,"music":null,"includeglobal":0,"comment_count":0}],"totalPages":1,"totalBlogs":6,"archive":[{"month":"09","year":"2025","count":1},{"month":"08","year":"2025","count":2},{"month":"05","year":"2025","count":1},{"month":"04","year":"2025","count":2}]},

    comments: [{"id":177,"origin_type":"user","origin_id":"souple","commenter":"souple","created_at":"2025-08-29T12:57:27.448Z","content":"even better, users can now be accessible with tildes!\nlike wikiverse.pages.dev/~souple","reply_to":null,"profile":{"id":1,"username":"souple","about_me":"Hey there! You may know me infamously as the creator of soup, or you may have stumbled upon this site because [s]I was begging[/s] politely pasted the link to this site and did not beg anyone to enter :') \n\nHow do y'all like the new design of wikiverse? Comment on the wall below to post your thoughts :smile:\n\n   [i]9/4/25 4:31pm - How do u guys like the new [b]newer[/b] design? The new design is much simpler (which means easier for me to make pages with consistent design and with less time!)[/i]","display_name":"34 + 35","pfp_url":"https://u.cubeupload.com/ThatCrownedKing/pfp.png","banner_url":"https://images.unsplash.com/photo-1553696590-4b3f68898333","signature":null,"location":"Soupletopia","social_links":[],"fav_articles":[],"music":[]}},{"id":176,"origin_type":"user","origin_id":"souple","commenter":"souple","created_at":"2025-08-28T22:40:56.150Z","content":"now sick urls like this:\nhttps://wikiverse.pages.dev/user/souple\n\nexists!","reply_to":null,"profile":{"id":1,"username":"souple","about_me":"Hey there! You may know me infamously as the creator of soup, or you may have stumbled upon this site because [s]I was begging[/s] politely pasted the link to this site and did not beg anyone to enter :') \n\nHow do y'all like the new design of wikiverse? Comment on the wall below to post your thoughts :smile:\n\n   [i]9/4/25 4:31pm - How do u guys like the new [b]newer[/b] design? The new design is much simpler (which means easier for me to make pages with consistent design and with less time!)[/i]","display_name":"34 + 35","pfp_url":"https://u.cubeupload.com/ThatCrownedKing/pfp.png","banner_url":"https://images.unsplash.com/photo-1553696590-4b3f68898333","signature":null,"location":"Soupletopia","social_links":[],"fav_articles":[],"music":[]}},{"id":174,"origin_type":"user","origin_id":"souple","commenter":"souple","created_at":"2025-08-28T11:31:55.281Z","content":"yey all my comments are baxk :)","reply_to":null,"profile":{"id":1,"username":"souple","about_me":"Hey there! You may know me infamously as the creator of soup, or you may have stumbled upon this site because [s]I was begging[/s] politely pasted the link to this site and did not beg anyone to enter :') \n\nHow do y'all like the new design of wikiverse? Comment on the wall below to post your thoughts :smile:\n\n   [i]9/4/25 4:31pm - How do u guys like the new [b]newer[/b] design? The new design is much simpler (which means easier for me to make pages with consistent design and with less time!)[/i]","display_name":"34 + 35","pfp_url":"https://u.cubeupload.com/ThatCrownedKing/pfp.png","banner_url":"https://images.unsplash.com/photo-1553696590-4b3f68898333","signature":null,"location":"Soupletopia","social_links":[],"fav_articles":[],"music":[]}},{"id":169,"origin_type":"user","origin_id":"souple","commenter":"barney86","created_at":"2025-06-03T16:52:46.681Z","content":"oi @souple why havent you been on chaosdeer for so long?","reply_to":null,"profile":{"id":3,"username":"barney86","about_me":"Кумеднінький волинянський хлопака.","display_name":"Giorno Giobanana","pfp_url":"https://u.cubeupload.com/shreder95ua/photo20241118213916.jpg","banner_url":"","signature":null,"location":"Ukraine","social_links":[],"fav_articles":[],"music":[]}},{"id":173,"origin_type":"user","origin_id":"souple","commenter":"cheesewhisk3rs","created_at":"2025-05-30T13:31:31.966Z","content":"[party]awesome!!![/party]","reply_to":172,"profile":null},{"id":172,"origin_type":"user","origin_id":"souple","commenter":"souple","created_at":"2025-05-30T13:11:10.671Z","content":"@cheesewhisk3rs click this text ----------------> [rainbow][party][b]CONFETTI TIME[/b][/party][/rainbow] <------------------------- for the confetti\n","reply_to":171,"profile":{"id":1,"username":"souple","about_me":"Hey there! You may know me infamously as the creator of soup, or you may have stumbled upon this site because [s]I was begging[/s] politely pasted the link to this site and did not beg anyone to enter :') \n\nHow do y'all like the new design of wikiverse? Comment on the wall below to post your thoughts :smile:\n\n   [i]9/4/25 4:31pm - How do u guys like the new [b]newer[/b] design? The new design is much simpler (which means easier for me to make pages with consistent design and with less time!)[/i]","display_name":"34 + 35","pfp_url":"https://u.cubeupload.com/ThatCrownedKing/pfp.png","banner_url":"https://images.unsplash.com/photo-1553696590-4b3f68898333","signature":null,"location":"Soupletopia","social_links":[],"fav_articles":[],"music":[]}},{"id":171,"origin_type":"user","origin_id":"souple","commenter":"cheesewhisk3rs","created_at":"2025-05-30T13:04:53.878Z","content":"where confetti?\n","reply_to":null,"profile":null},{"id":170,"origin_type":"user","origin_id":"souple","commenter":"souple","created_at":"2025-05-30T13:01:48.971Z","content":"🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳","reply_to":null,"profile":{"id":1,"username":"souple","about_me":"Hey there! You may know me infamously as the creator of soup, or you may have stumbled upon this site because [s]I was begging[/s] politely pasted the link to this site and did not beg anyone to enter :') \n\nHow do y'all like the new design of wikiverse? Comment on the wall below to post your thoughts :smile:\n\n   [i]9/4/25 4:31pm - How do u guys like the new [b]newer[/b] design? The new design is much simpler (which means easier for me to make pages with consistent design and with less time!)[/i]","display_name":"34 + 35","pfp_url":"https://u.cubeupload.com/ThatCrownedKing/pfp.png","banner_url":"https://images.unsplash.com/photo-1553696590-4b3f68898333","signature":null,"location":"Soupletopia","social_links":[],"fav_articles":[],"music":[]}},{"id":168,"origin_type":"user","origin_id":"souple","commenter":"barney86","created_at":"2025-05-28T15:11:27.748","content":"he seems problematic. im following.","reply_to":null,"profile":{"id":3,"username":"barney86","about_me":"Кумеднінький волинянський хлопака.","display_name":"Giorno Giobanana","pfp_url":"https://u.cubeupload.com/shreder95ua/photo20241118213916.jpg","banner_url":"","signature":null,"location":"Ukraine","social_links":[],"fav_articles":[],"music":[]}},{"id":167,"origin_type":"user","origin_id":"souple","commenter":"souple","created_at":"2025-05-28T13:02:09.519Z","content":"Attention all followers! @pix @stripes @barney86 @cheesewhisk3rs @f @mybearworld !!! I have nothing to say...","reply_to":null,"profile":{"id":1,"username":"souple","about_me":"Hey there! You may know me infamously as the creator of soup, or you may have stumbled upon this site because [s]I was begging[/s] politely pasted the link to this site and did not beg anyone to enter :') \n\nHow do y'all like the new design of wikiverse? Comment on the wall below to post your thoughts :smile:\n\n   [i]9/4/25 4:31pm - How do u guys like the new [b]newer[/b] design? The new design is much simpler (which means easier for me to make pages with consistent design and with less time!)[/i]","display_name":"34 + 35","pfp_url":"https://u.cubeupload.com/ThatCrownedKing/pfp.png","banner_url":"https://images.unsplash.com/photo-1553696590-4b3f68898333","signature":null,"location":"Soupletopia","social_links":[],"fav_articles":[],"music":[]}},{"id":166,"origin_type":"user","origin_id":"souple","commenter":"souple","created_at":"2025-05-28T12:10:10.866Z","content":"@barney86 i removed it lol","reply_to":165,"profile":{"id":1,"username":"souple","about_me":"Hey there! You may know me infamously as the creator of soup, or you may have stumbled upon this site because [s]I was begging[/s] politely pasted the link to this site and did not beg anyone to enter :') \n\nHow do y'all like the new design of wikiverse? Comment on the wall below to post your thoughts :smile:\n\n   [i]9/4/25 4:31pm - How do u guys like the new [b]newer[/b] design? The new design is much simpler (which means easier for me to make pages with consistent design and with less time!)[/i]","display_name":"34 + 35","pfp_url":"https://u.cubeupload.com/ThatCrownedKing/pfp.png","banner_url":"https://images.unsplash.com/photo-1553696590-4b3f68898333","signature":null,"location":"Soupletopia","social_links":[],"fav_articles":[],"music":[]}},{"id":165,"origin_type":"user","origin_id":"souple","commenter":"barney86","created_at":"2025-05-28T10:25:48.292Z","content":"damn souple where did the music go? o_O","reply_to":null,"profile":{"id":3,"username":"barney86","about_me":"Кумеднінький волинянський хлопака.","display_name":"Giorno Giobanana","pfp_url":"https://u.cubeupload.com/shreder95ua/photo20241118213916.jpg","banner_url":"","signature":null,"location":"Ukraine","social_links":[],"fav_articles":[],"music":[]}},{"id":164,"origin_type":"user","origin_id":"souple","commenter":"souple","created_at":"2025-05-27T20:12:21.335Z","content":"thanks @maxy!","reply_to":null,"profile":{"id":1,"username":"souple","about_me":"Hey there! You may know me infamously as the creator of soup, or you may have stumbled upon this site because [s]I was begging[/s] politely pasted the link to this site and did not beg anyone to enter :') \n\nHow do y'all like the new design of wikiverse? Comment on the wall below to post your thoughts :smile:\n\n   [i]9/4/25 4:31pm - How do u guys like the new [b]newer[/b] design? The new design is much simpler (which means easier for me to make pages with consistent design and with less time!)[/i]","display_name":"34 + 35","pfp_url":"https://u.cubeupload.com/ThatCrownedKing/pfp.png","banner_url":"https://images.unsplash.com/photo-1553696590-4b3f68898333","signature":null,"location":"Soupletopia","social_links":[],"fav_articles":[],"music":[]}},{"id":163,"origin_type":"user","origin_id":"souple","commenter":"souple","created_at":"2025-05-27T20:06:37.948Z","content":"@stripes mentioning test","reply_to":null,"profile":{"id":1,"username":"souple","about_me":"Hey there! You may know me infamously as the creator of soup, or you may have stumbled upon this site because [s]I was begging[/s] politely pasted the link to this site and did not beg anyone to enter :') \n\nHow do y'all like the new design of wikiverse? Comment on the wall below to post your thoughts :smile:\n\n   [i]9/4/25 4:31pm - How do u guys like the new [b]newer[/b] design? The new design is much simpler (which means easier for me to make pages with consistent design and with less time!)[/i]","display_name":"34 + 35","pfp_url":"https://u.cubeupload.com/ThatCrownedKing/pfp.png","banner_url":"https://images.unsplash.com/photo-1553696590-4b3f68898333","signature":null,"location":"Soupletopia","social_links":[],"fav_articles":[],"music":[]}},{"id":162,"origin_type":"user","origin_id":"souple","commenter":"souple","created_at":"2025-05-27T19:38:11.733Z","content":"thanz","reply_to":161,"profile":{"id":1,"username":"souple","about_me":"Hey there! You may know me infamously as the creator of soup, or you may have stumbled upon this site because [s]I was begging[/s] politely pasted the link to this site and did not beg anyone to enter :') \n\nHow do y'all like the new design of wikiverse? Comment on the wall below to post your thoughts :smile:\n\n   [i]9/4/25 4:31pm - How do u guys like the new [b]newer[/b] design? The new design is much simpler (which means easier for me to make pages with consistent design and with less time!)[/i]","display_name":"34 + 35","pfp_url":"https://u.cubeupload.com/ThatCrownedKing/pfp.png","banner_url":"https://images.unsplash.com/photo-1553696590-4b3f68898333","signature":null,"location":"Soupletopia","social_links":[],"fav_articles":[],"music":[]}},{"id":161,"origin_type":"user","origin_id":"souple","commenter":"maxy","created_at":"2025-05-27T19:24:00.064Z","content":"Souper im a big fan","reply_to":null,"profile":null},{"id":160,"origin_type":"user","origin_id":"souple","commenter":"xbfj","created_at":"2025-05-27T16:10:37.596Z","content":"new design is cool","reply_to":null,"profile":null},{"id":159,"origin_type":"user","origin_id":"souple","commenter":"stripes","created_at":"2025-05-27T15:02:22.412Z","content":"i love crime","reply_to":null,"profile":null},{"id":158,"origin_type":"user","origin_id":"souple","commenter":"barney86","created_at":"2025-05-27T13:59:55.986Z","content":"STEELLL BALLLL RUUUUUN","reply_to":null,"profile":{"id":3,"username":"barney86","about_me":"Кумеднінький волинянський хлопака.","display_name":"Giorno Giobanana","pfp_url":"https://u.cubeupload.com/shreder95ua/photo20241118213916.jpg","banner_url":"","signature":null,"location":"Ukraine","social_links":[],"fav_articles":[],"music":[]}},{"id":157,"origin_type":"user","origin_id":"souple","commenter":"souple","created_at":"2025-05-26T12:49:21.204Z","content":"i just commented on my own profile....W. O W ","reply_to":null,"profile":{"id":1,"username":"souple","about_me":"Hey there! You may know me infamously as the creator of soup, or you may have stumbled upon this site because [s]I was begging[/s] politely pasted the link to this site and did not beg anyone to enter :') \n\nHow do y'all like the new design of wikiverse? Comment on the wall below to post your thoughts :smile:\n\n   [i]9/4/25 4:31pm - How do u guys like the new [b]newer[/b] design? The new design is much simpler (which means easier for me to make pages with consistent design and with less time!)[/i]","display_name":"34 + 35","pfp_url":"https://u.cubeupload.com/ThatCrownedKing/pfp.png","banner_url":"https://images.unsplash.com/photo-1553696590-4b3f68898333","signature":null,"location":"Soupletopia","social_links":[],"fav_articles":[],"music":[]}},{"id":156,"origin_type":"user","origin_id":"souple","commenter":"cheesewhisk3rs","created_at":"2025-05-24T23:30:34.841Z","content":"g","reply_to":null,"profile":null},{"id":155,"origin_type":"user","origin_id":"souple","commenter":"barney86","created_at":"2025-05-24T20:27:29.617Z","content":"the website looks awesome but im kinda too lazy to use it anyways lmao","reply_to":null,"profile":{"id":3,"username":"barney86","about_me":"Кумеднінький волинянський хлопака.","display_name":"Giorno Giobanana","pfp_url":"https://u.cubeupload.com/shreder95ua/photo20241118213916.jpg","banner_url":"","signature":null,"location":"Ukraine","social_links":[],"fav_articles":[],"music":[]}},{"id":154,"origin_type":"user","origin_id":"souple","commenter":"creed","created_at":"2025-05-21T22:23:16.654Z","content":"To a place where blind men see.","reply_to":null,"profile":null},{"id":153,"origin_type":"user","origin_id":"souple","commenter":"creed","created_at":"2025-05-21T22:23:00.851Z","content":"Can you take me higher?","reply_to":null,"profile":null}],

    following: [{"user":"barney86","profile":{"id":3,"username":"barney86","about_me":"Кумеднінький волинянський хлопака.","display_name":"Giorno Giobanana","pfp_url":"https://u.cubeupload.com/shreder95ua/photo20241118213916.jpg","banner_url":"","signature":null,"location":"Ukraine","social_links":[],"fav_articles":[],"music":[]}},{"user":"wikiverse","profile":{"id":2,"username":"wikiverse","about_me":null,"display_name":"Wikiverse","pfp_url":null,"banner_url":null,"signature":null,"location":null,"social_links":[],"fav_articles":[],"music":[]}}],

    followers: [{"user":"barney86","profile":{"id":3,"username":"barney86","about_me":"Кумеднінький волинянський хлопака.","display_name":"Giorno Giobanana","pfp_url":"https://u.cubeupload.com/shreder95ua/photo20241118213916.jpg","banner_url":"","signature":null,"location":"Ukraine","social_links":[],"fav_articles":[],"music":[]}}]
}
window.returnUTCTime = function returnUTCTime(t) { return new Date(t).toLocaleDateString('UTC') }

window.fetchGET = async function fetchGET(endpoint, auth) {
    let response
    headers = { 
        'Content-Type': 'application/json',
    }
    if (auth) {
        headers.Authorization = 'Bearer ' + localStorage.token
    }

    response = await fetch('https://wiki.souple.workers.dev/' + endpoint, {
        method: 'GET',
        headers
    })

    return await response.json()
}

window.setupPopup = function setupPopup(content) {
    if (!document.getElementById('popup-window')) {
        const popupWin = document.createElement('div')
        popupWin.id = 'popup-window'

        const popupDialog = document.createElement('div')
        popupDialog.id = 'dialog'
        popupWin.appendChild(popupDialog)

        document.body.appendChild(popupWin)
    }

    let popupEl = document.getElementById('popup-window')
    popupEl.querySelector('#dialog').appendChild(content)

    setTimeout(() => {
        popupEl.style.opacity = 1
        popupEl.querySelector('#dialog').style.opacity = 1
    }, 500)

    popupEl.addEventListener("click", () => popupEl.remove() )
}

window.previewTheme = function previewTheme(layout_html, css, js) {
    var iframe = document.createElement('iframe');
    var html = `
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <link rel="stylesheet" href="/styles/main.css"/>
    <link rel="stylesheet" href="/styles/user.css"/>
    <link rel="icon" type="image/png" href="/favicon.png"/>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="keywords" content="friends online social networking wiki articles blog poll">
    <script type="text/javascript" src="/js/helper.js"></script>
    <script type="text/javascript" src="/js/comment.js"></script>
    <script type="text/javascript" src="/js/carousel.js"></script>
</head>
<nav id="topbar"></nav>
<style>
    body {
        -ms-overflow-style: none;  /* Internet Explorer 10+ */
        scrollbar-width: none;  /* Firefox, Safari 18.2+, Chromium 121+ */
    }
    body::-webkit-scrollbar { 
        display: none;  /* Older Safari and Chromium */
    }
</style>
<body>
    <div id="main">
        ${layout_html}
    </div>
</body>
<script type="text/javascript" src="/js/nav.js"></script>
<script>window.inIframe = true</script>
<script type="text/javascript" src="/js/music.js"></script>
<script type="text/javascript" src="/js/user.js"></script>
</html>`

    setupPopup(iframe)
  
    iframe.onload = function() {
        iframe.contentDocument.open()
        iframe.contentDocument.write(html)
        iframe.contentDocument.close()
        const style = document.createElement("style");
        style.textContent = css
        iframe.contentDocument.head.appendChild(style);
        if (js) {
            iframe.contentWindow.eval(js)
        }
    }
}

window.setupDropdown = function setupDropdown(kv, parent) {
    const p = document.querySelector(parent)
    p.style.position = 'relative'

    let dropd = document.createElement('div') 
    dropd.classList.add('dropdown', 'hidden')

    let dropdUL = document.createElement('ul')
    for (const [k, v] of Object.entries(kv)) {
        let a = document.createElement('a')
        a.href = v

        let li = document.createElement('li')
        li.textContent = k

        a.appendChild(li)
        dropdUL.appendChild(a)
    }
    dropd.appendChild(dropdUL)
    p.appendChild(dropd)

    p.addEventListener('click', () => {
        dropd.classList.toggle('hidden')
    })
}

const smileys = [
    ":alien:", "/images/emoijs/smileys/alien.gif",
    ":angel:", "/images/emoijs/smileys/angel.gif",
    ":angry:", "/images/emoijs/smileys/angry.gif",
    ":applause:", "/images/emoijs/smileys/applause.gif",
    ":april:", "/images/emoijs/smileys/april.gif",
    ":attention:", "/images/emoijs/smileys/attention.gif",
    ":atwitsend:", "/images/emoijs/smileys/atwitsend.gif",
    ":batseyes:", "/images/emoijs/smileys/batseyes.gif",
    ":beatup:", "/images/emoijs/smileys/beatup.gif",
    ":bighug:", "/images/emoijs/smileys/bighug.gif",
    ":billy:", "/images/emoijs/smileys/billy.gif",
    ":blush:", "/images/emoijs/smileys/blush.gif",
    ":bringiton:", "/images/emoijs/smileys/bringiton.gif",
    ":brokenheart:", "/images/emoijs/smileys/brokenheart.gif",
    ":bug:", "/images/emoijs/smileys/bug.gif",
    ":callme:", "/images/emoijs/smileys/callme.gif",
    ":chatterbox:", "/images/emoijs/smileys/chatterbox.gif",
    ":clover:", "/images/emoijs/smileys/clover.gif",
    ":clown:", "/images/emoijs/smileys/clown.gif",
    ":coffee:", "/images/emoijs/smileys/coffee.gif",
    ":confused:", "/images/emoijs/smileys/confused.gif",
    ":cool:", "/images/emoijs/smileys/cool.gif",
    ":cow:", "/images/emoijs/smileys/cow.gif",
    ":cowboy:", "/images/emoijs/smileys/cowboy.gif",
    ":crying:", "/images/emoijs/smileys/crying.gif",
    ":dancing:", "/images/emoijs/smileys/dancing.gif",
    ":daydream:", "/images/emoijs/smileys/daydream.gif",
    ":devil:", "/images/emoijs/smileys/devil.gif",
    ":doh:", "/images/emoijs/smileys/doh.gif",
    ":drool:", "/images/emoijs/smileys/drool.gif",
    ":eyebrow:", "/images/emoijs/smileys/eyebrow.gif",
    ":eyeroll:", "/images/emoijs/smileys/eyeroll.gif",
    ":frustrated:", "/images/emoijs/smileys/frustrated.gif",
    ":giggle:", "/images/emoijs/smileys/giggle.gif",
    ":grin:", "/images/emoijs/smileys/grin.gif",
    ":haha:", "/images/emoijs/smileys/haha.gif",
    ":hahayeahright:", "/images/emoijs/smileys/hahayeahright.gif",
    ":hiro:", "/images/emoijs/smileys/hiro.gif",
    ":hurryup:", "/images/emoijs/smileys/hurryup.gif",
    ":hypnotized:", "/images/emoijs/smileys/hypnotized.gif",
    ":idea:", "/images/emoijs/smileys/idea.gif",
    ":idontknow:", "/images/emoijs/smileys/idontknow.gif",
    ":idontwannasee:", "/images/emoijs/smileys/idontwannasee.gif",
    ":itwasntme:", "/images/emoijs/smileys/itwasntme.gif",
    ":kiss:", "/images/emoijs/smileys/kiss.gif",
    ":liar:", "/images/emoijs/smileys/liar.gif",
    ":loser:", "/images/emoijs/smileys/loser.gif",
    ":love:", "/images/emoijs/smileys/love.gif",
    ":moneyeyes:", "/images/emoijs/smileys/moneyeyes.gif",
    ":monkey:", "/images/emoijs/smileys/monkey.gif",
    ":nailbiting:", "/images/emoijs/smileys/nailbiting.gif",
    ":nerd:", "/images/emoijs/smileys/nerd.gif",
    ":nono:", "/images/emoijs/smileys/nono.gif",
    ":notlistening:", "/images/emoijs/smileys/notlistening.gif",
    ":nottalking:", "/images/emoijs/smileys/nottalking.gif",
    ":onthephone:", "/images/emoijs/smileys/onthephone.gif",
    ":party:", "/images/emoijs/smileys/party.gif",
    ":peace:", "/images/emoijs/smileys/peace.gif",
    ":pig:", "/images/emoijs/smileys/pig.gif",
    ":pirate:", "/images/emoijs/smileys/pirate.gif",
    ":praise:", "/images/emoijs/smileys/praise.gif",
    ":praying:", "/images/emoijs/smileys/praying.gif",
    ":pumpkin:", "/images/emoijs/smileys/pumpkin.gif",
    ":puppydogeyes:", "/images/emoijs/smileys/puppydogeyes.gif",
    ":rockon:", "/images/emoijs/smileys/rockon.gif",
    ":rofl:", "/images/emoijs/smileys/rofl.gif",
    ":rose:", "/images/emoijs/smileys/rose.gif",
    ":sad:", "/images/emoijs/smileys/sad.gif",
    ":shhhh:", "/images/emoijs/smileys/shhhh.gif",
    ":shocked:", "/images/emoijs/smileys/shocked.gif",
    ":sick:", "/images/emoijs/smileys/sick.gif",
    ":sigh:", "/images/emoijs/smileys/sigh.gif",
    ":silly:", "/images/emoijs/smileys/silly.gif",
    ":skull:", "/images/emoijs/smileys/skull.gif",
    ":sleepy:", "/images/emoijs/smileys/sleepy.gif",
    ":smile:", "/images/emoijs/smileys/smile.gif",
    ":smug:", "/images/emoijs/smileys/smug.gif",
    ":star:", "/images/emoijs/smileys/star.gif",
    ":straightface:", "/images/emoijs/smileys/straightface.gif",
    ":talktohand:", "/images/emoijs/smileys/talktohand.gif",
    ":thinking:", "/images/emoijs/smileys/thinking.gif",
    ":thumbsdown:", "/images/emoijs/smileys/thumbsdown.gif",
    ":thumbsup:", "/images/emoijs/smileys/thumbsup.gif",
    ":timeout:", "/images/emoijs/smileys/timeout.gif",
    ":tongue:", "/images/emoijs/smileys/tongue.gif",
    ":tongue2:", "/images/emoijs/smileys/tongue2.gif",
    ":usa:", "/images/emoijs/smileys/usa.gif",
    ":waiting:", "/images/emoijs/smileys/waiting.gif",
    ":wave:", "/images/emoijs/smileys/wave.gif",
    ":whew:", "/images/emoijs/smileys/whew.gif",
    ":whistling:", "/images/emoijs/smileys/whistling.gif",
    ":worried:", "/images/emoijs/smileys/worried.gif",
    ":yawn:", "/images/emoijs/smileys/yawn.gif",
    ":yinyang:", "/images/emoijs/smileys/yinyang.gif",
]

const meower95emojis = {
    "cat": "1.png",
    "sad": "2.png",
    "smile": "3.png",
    "straightface": "4.png",
    "angry": "5.png",
    "evil": "6.png",
    "happy": "7.png",
    "evil": "8.png",
    "playful": "9.png",
    "annoyed": "10.png",
    "dead": "11.png",
    "joking": "12.png"
}

const bbcodeTags = [
    { html: "<b></b>", tag: "b" },
    { html: "<u></u>", tag: "u" },
    { html: "<s></s>", tag: "s" },
    { html: "<i></i>", tag: "i" },
    { html: "<span style='display:flow;place-self:center;text-align: center;'></span>", tag: "center" },
    { html: "<span style='float: left'>$attr$</span>", tag: "left" },
    { html: "<span style='float: right'>$attr$</span>", tag: "right" },
    { html: "<marquee></marquee>", tag: "marquee" },
    { html: "<span class='rainbow'></span>", tag: "rainbow" },
    { html: "<blink></blink>", tag: "blink" },
    { html: "<code></code>", tag: "code" },
    { html: "<span style='color: $attr$;'></span>", tag: "color" },
    { html: "<span style='width: $attr$px;'></span>", tag: "width" },
    { html: "<span style='float: $attr$;'></span>", tag: "float" },
    { html: "<a href='$attr$'></a>", tag: "url" },
    { html: "<a href='$attr$'>$attr$</a>", tag: "email" },
    { html: "<img src='$attr$' style='width: inherit;'></img>", tag: "img" },
    { html: "<a href='/article/$attr$'></a>", tag: "article" },
    { html: "<a href='/blog/$attr$'></a>", tag: "blog" },
    { html: "<span style='font-size: $attr$px;'></span>", tag: "size" },
    { html: "<span style='font-family: $attr$;'></span>", tag: "font" },
    { html: "<h1></h1>", tag: "h1" },
    { html: "<h2></h2>", tag: "h2" },
    { html: "<h3></h3>", tag: "h3" },
    { html: "<h4></h4>", tag: "h4" },
    { html: "<h5></h5>", tag: "h5" },
    { html: "<h6></h6>", tag: "h6" },
    { html: "<audio src='$attr$'></audio>", tag: "audio"},
    { html: "<video src='$attr$'></video>", tag: "video"},
    { html: "<span style='cursor:help;border-bottom: 1px dashed #ce5151;color: #ce5151;' title=$attr$></span>", tag: "abbr" },
    { html: "<span style='background-color: $attr$'></span>", tag: "bgcolor"},
    { html: "<img class='emoji' src='https://www.pixelcatsend.com/images/catmojis/$attr$.png'></img>", tag: "catmoji" },
];

/*
<button onclick="this.offsetParent.innerHTML+=`<img src='https://web.archive.org/web/20250430162751/https://media1.tenor.com/m/nZsn90X3OpYAAAAC/baby-cat-dancing-png.gif' width='48px' height='48px'>`;">add cat!</button>
*/

function putStrOntoChild(a, b) {
    if (typeof a !== "string" || typeof b !== "string") {
      return "";
    }
    const match = b.match(/<([a-z0-9]+)[^>]*>/i)
    if(!match){
        return b;
    }
    const temp = document.createElement(match[1] || 'div');
    temp.innerHTML = a;
    return b.replace(
      new RegExp(`(<${temp.tagName.toLowerCase()}\\b[^>]*>)(.*?)(</${temp.tagName.toLowerCase()}>)`, 'gi'),
      `$1${temp.innerHTML}$3`
    );
}

function replaceSmileysWithRegex(text) {
    const smileyCodes = smileys.filter((_, index) => index % 2 === 0);
    const regexString = smileyCodes.map(code => code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
    const regex = new RegExp(regexString, 'g');
  
    return text.replace(regex, (match) => {
        const index = smileys.indexOf(match);
        if (index !== -1 && index % 2 === 0 && index + 1 < smileys.length) {
            const imagePath = smileys[index + 1];
            return `<img src="${imagePath}" class="emoji" title="${match}">`;
        }
        return match;
    });
}
  
function replaceBBCodeWithHTML(t, htmlTemplate, bbtag) {
    const regex = new RegExp(
        `\\[${bbtag}=([^\\]]+)\\]([\\s\\S]*?)\\[\\/${bbtag}\\]|\\[${bbtag}\\]([\\s\\S]*?)\\[\\/${bbtag}\\]`,
        "gi"
    );
    return t.replace(regex, (match, attrValue, contentWithAttr, contentWithoutAttr) => {
        let newHtml = htmlTemplate;
        if (attrValue) {
            newHtml = newHtml.replace(/\$attr\$/gi, attrValue);
        }
        if (contentWithAttr === "" && contentWithoutAttr === undefined) {
            return newHtml;
        } else {
            return putStrOntoChild(contentWithAttr || contentWithoutAttr, newHtml);
        }
    });
}

window.bbcodeparse = function bbcodeparse(s, disableImages) {
    let result = s;
    if (!s) {
      return "";
    }
    let changed = true;
    while (changed) {
        changed = false;
        for (const { html, tag } of bbcodeTags) {
          const prevResult = result
          result = replaceBBCodeWithHTML(result, html, tag);
          changed = changed || prevResult !== result
        }
    }

    result = result.replace(/\[(.+?)\]/g, (match, $1) => {
        if (!!meower95emojis[$1]) {
            return `<img src="/images/emojis/meower95/${meower95emojis[$1]}" class="emoji" title="[${$1}]">`
        }
        return $1
    }); 

    if (disableImages) {
        return replaceSmileysWithRegex(DOMPurify.sanitize(result, { FORBID_TAGS: ['img'] }))
    }
    return DOMPurify.sanitize(replaceSmileysWithRegex(result));
}

window.dateDiff = function dateDiff(a, b) {
    // https://stackoverflow.com/a/15289883
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    let r = Math.floor((utc2 - utc1) / _MS_PER_DAY)
    let msg
    if (r > 1) {
        msg = r + ' days ago'
    } else {
        msg = r + ' day ago'
    }
    
    if (r == 0) {
        r = new Date(a).toLocaleString('UTC',{ hour: 'numeric', minute: 'numeric'}).toLowerCase()
        msg = r
    }
  
    return msg;
}