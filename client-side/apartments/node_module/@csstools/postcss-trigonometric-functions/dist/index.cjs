"use strict";var t=require("postcss-value-parser"),e=require("vm");function n(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var r=n(t),u=n(e);function i(t){return t*(180/Math.PI)}const o={turn:function(t){return 2*t*Math.PI},deg:function(t){return t*(Math.PI/180)},grad:function(t){return t*(Math.PI/200)}};function a(t){return"word"===t.type}const s=["+","-","*","/"];var l;function c(t){return!Number.isNaN(t)&&Number.isFinite(t)}function f(t,e=!1){let n=!0;const i=[];if(t.filter((t=>"function"===t.type)).forEach((t=>{var r;if(!n)return;if(""!==t.value)return void(n=!1);const u=f(t.nodes.slice(0),e),i=1===u.length,o=Number((null==(r=u[0])?void 0:r.value)||"");i&&"word"===u[0].type&&!Number.isNaN(o)?(v(t),t.value=u[0].value):n=!1})),!n)return t;const a=t.filter((t=>"word"===t.type||s.includes(t.value)));let d=l.Number;const m=[];let h;const N=(t,e,r)=>{if(d===e){if(e===l.Number){const e=r||"";m.includes(e)||m.push({number:t,unit:e,index:i.length})}i.push(t),d=e===l.Number?l.Operation:l.Number}else n=!1};for(let t=0,u=a.length;t<u&&n;t++){const u=a[t];if(s.includes(u.value)){N(u.value,l.Operation);continue}if("pi"===u.value){N(Math.PI.toString(),l.Number);continue}if("e"===u.value){N(Math.E.toString(),l.Number);continue}const i=r.default.unit(u.value);if(!i){n=!1;break}if(e){if(h||(h=i.unit),h!==i.unit){n=!1;break}N(u.value,l.Operation)}else i.unit?"rad"!==i.unit&&"function"!=typeof o[i.unit]?n=!1:N(i.number,l.Number,i.unit):N(u.value,l.Number)}if(!n)return t;if(i.length%2==0||i.length<3)return t;let b;try{let t="";const e=new Set(m.map((t=>t.unit)));if(e.size>1)if(e.has("")){if(2!==e.size)throw new Error;[t]=Array.from(e).filter((t=>""!==t))}else m.forEach((t=>{if("rad"!==t.unit){const e=o[t.unit](Number(t.number));if(!c(e))throw new Error;i[t.index]=e.toString()}}));const n=u.default.createContext({result:NaN});new u.default.Script(`result = ${i.join(" ")}`).runInContext(n),"number"==typeof n.result&&c(n.result)&&(t&&(n.result=o[t](n.result)),c(n.result)&&(b=n.result))}catch(t){}if(void 0!==b){let e=b.toString();h&&(e+=h);const n=t[0].sourceIndex,r=e.length;t.length=0,t.push({type:"word",value:e,sourceIndex:n,sourceEndIndex:r})}return t}function v(t){delete t.nodes;const e=t;return e.type="word",e}function d(t,e){if(!Number.isNaN(t)){if(t>Number.MAX_SAFE_INTEGER)return"infinity";if(t<Number.MIN_SAFE_INTEGER)return"-infinity"}return Number(t.toFixed(e)).toString()}function m(t){let e,n="";if("infinity"===t.toLowerCase()?e=1/0:"-infinity"===t.toLowerCase()?e=-1/0:"pi"===t?e=Math.PI:"e"===t&&(e=Math.E),!e){const u=r.default.unit(t);if(!u)return!1;e=Number(u.number),Number.isNaN(e)||(n=u.unit)}return{number:e,unit:n}}function h(t,e=!0){t.nodes=f(t.nodes);const n=t.nodes.filter(a);if(1!==t.nodes.length||1!==n.length)return;const{value:r}=n[0],u=m(r);if(!u)return;let i=u.number;if(e){if(u.unit&&"rad"!==u.unit){if(!o[u.unit])return;i=o[u.unit](i)}}else if(u.unit)return;return[v(t),i]}!function(t){t[t.Number=0]="Number",t[t.Operation=1]="Operation"}(l||(l={}));const N=[{check:"asin(",transform:function(t){const e=r.default(t.value);return e.walk((t=>{if("function"!==t.type||"asin"!==t.value)return;const e=h(t,!1);if(!e)return;const[n,r]=e;let u=Math.asin(r);Number.isNaN(u)||"number"!=typeof u||(u=`${d(i(u),2)}deg`),n.value=u+""})),e.toString()}},{check:"acos(",transform:function(t){const e=r.default(t.value);return e.walk((t=>{if("function"!==t.type||"acos"!==t.value)return;const e=h(t,!1);if(!e)return;const[n,r]=e;let u=Math.acos(r);Number.isNaN(u)||"number"!=typeof u||(u=`${d(i(u),2)}deg`),n.value=u+""})),e.toString()}},{check:"atan(",transform:function(t){const e=r.default(t.value);return e.walk((t=>{if("function"!==t.type||"atan"!==t.value)return;const e=h(t,!1);if(!e)return;const[n,r]=e;let u=Math.atan(r);Number.isNaN(u)||"number"!=typeof u||(u=`${d(i(u),2)}deg`),n.value=u+""})),e.toString()}},{check:"atan2(",transform:function(t){const e=r.default(t.value);return e.walk((t=>{if("function"!==t.type||"atan2"!==t.value)return;const e=t.nodes.findIndex((t=>"div"===t.type&&","===t.value));if(e<0)return;let n=t.nodes.slice(0,e).filter(a),r=t.nodes.slice(e+1).filter(a);if(0===n.length||0===r.length)return;if(n.length>1&&(n=f(n,!0)),r.length>1&&(r=f(r,!0)),1!==n.length||1!==r.length)return;const u=m(n[0].value),o=m(r[0].value);if(!u||!o)return;if(u.unit!==o.unit)return;let s=Math.atan2(u.number,o.number);Number.isNaN(s)||"number"!=typeof s||(s=`${d(i(s),2)}deg`);v(t).value=s+""})),e.toString()}},{check:"sin(",transform:function(t){const e=r.default(t.value);return e.walk((t=>{if("function"!==t.type||"sin"!==t.value)return;const e=h(t);if(!e)return;const[n,r]=e;n.value=d(Math.sin(r),5)})),e.toString()}},{check:"cos(",transform:function(t){const e=r.default(t.value);return e.walk((t=>{if("function"!==t.type||"cos"!==t.value)return;const e=h(t);if(!e)return;const[n,r]=e;n.value=d(Math.cos(r),5)})),e.toString()}},{check:"tan(",transform:function(t){const e=r.default(t.value);return e.walk((t=>{if("function"!==t.type||"tan"!==t.value)return;const e=h(t);if(!e)return;const[n,r]=e,u=Number(d(i(r),2)),o=u/90;n.value=u%90==0&&o%2!=0?o>0?"infinity":"-infinity":d(Math.tan(r),5)})),e.toString()}}],b=t=>{const e=Object.assign({preserve:!1},t);return{postcssPlugin:"postcss-trigonometric-functions",Declaration(t){const n=N.filter((e=>t.value.includes(e.check)));if(!t||0===n.length)return;const r=t.clone();n.forEach((t=>{const e=t.transform(r);e&&(r.value=e)})),t.value!==r.value&&(e.preserve?t.cloneBefore({value:r.value}):t.value=r.value)}}};b.postcss=!0,module.exports=b;
