/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var t=function(){return(t=Object.assign||function(t){for(var n,e=1,o=arguments.length;e<o;e++)for(var i in n=arguments[e])Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i]);return t}).apply(this,arguments)};function n(t,n,e,o){return new(e||(e=Promise))((function(i,r){function s(t){try{c(o.next(t))}catch(t){r(t)}}function u(t){try{c(o.throw(t))}catch(t){r(t)}}function c(t){t.done?i(t.value):new e((function(n){n(t.value)})).then(s,u)}c((o=o.apply(t,n||[])).next())}))}function e(t,n){var e,o,i,r,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return r={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function u(r){return function(u){return function(r){if(e)throw new TypeError("Generator is already executing.");for(;s;)try{if(e=1,o&&(i=2&r[0]?o.return:r[0]?o.throw||((i=o.return)&&i.call(o),0):o.next)&&!(i=i.call(o,r[1])).done)return i;switch(o=0,i&&(r=[2&r[0],i.value]),r[0]){case 0:case 1:i=r;break;case 4:return s.label++,{value:r[1],done:!1};case 5:s.label++,o=r[1],r=[0];continue;case 7:r=s.ops.pop(),s.trys.pop();continue;default:if(!(i=(i=s.trys).length>0&&i[i.length-1])&&(6===r[0]||2===r[0])){s=0;continue}if(3===r[0]&&(!i||r[1]>i[0]&&r[1]<i[3])){s.label=r[1];break}if(6===r[0]&&s.label<i[1]){s.label=i[1],i=r;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(r);break}i[2]&&s.ops.pop(),s.trys.pop();continue}r=n.call(t,s)}catch(t){r=[6,t],o=0}finally{e=i=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}([r,u])}}}var o=function(t){return"[lit-popup] "+t},i=27,r="lit-popup--opening",s="lit-popup--closing",u="lit-popup--opened",c="open",l="open-complete",p="close",a="close-complete",h="destroy",f=function(t){var n=function(n){n.keyCode===i&&(n.preventDefault(),t.isOpen&&t.close())},e=function(){document.removeEventListener("keydown",n)};return t.on(c,(function(){document.addEventListener("keydown",n)})),t.on(p,e),function(){e()}},v={plugins:[],innerContainerSelector:".lit-popup-container",onOpen:function(){},openAnimation:function(){return Promise.resolve()},onOpenComplete:function(){},onClose:function(){},closeAnimation:function(){return Promise.resolve()},onCloseComplete:function(){},onDestroy:function(){}},d=function(){function i(n,e){if(void 0===e&&(e={}),!n)throw new Error(o("Expected a name as a first argument."));this.options=t({},v,e),this.isOpen=!1;var i=document.querySelector('[data-lit-popup="'+n+'"]');if(!i)throw new Error(o("Element not found."));this.el=i,this.listeners=[],this.innerContainer=this.el.querySelector(this.options.innerContainerSelector),this.openButtons=Array.from(document.querySelectorAll('[data-lit-popup-open="'+n+'"]')),this.closeButtons=Array.from(document.querySelectorAll('[data-lit-popup-close="'+n+'"]')),this.plugins=[f].concat(this.options.plugins),this.pluginDestroyers=[],this.previousActiveElement=null,this.open=this.open.bind(this),this.close=this.close.bind(this),this.init()}return i.prototype.init=function(){var t=this;this.openButtons.forEach((function(n){return n.addEventListener("click",t.open)})),this.closeButtons.forEach((function(n){return n.addEventListener("click",t.close)})),this.pluginDestroyers=this.plugins.map((function(n){return n(t)}))},i.prototype.destroy=function(){var t=this;this.options.onDestroy(this),this.trigger(h),this.openButtons.forEach((function(n){return n.removeEventListener("click",t.open)})),this.closeButtons.forEach((function(n){return n.removeEventListener("click",t.close)})),this.pluginDestroyers.forEach((function(t){return t()})),this.listeners.forEach((function(n){var e=n[0],o=n[1];return t.off(e,o)})),this.listeners=[],this.isOpen=!1,this.el=null,this.innerContainer=null,this.openButtons=[],this.closeButtons=[],this.previousActiveElement=null},i.prototype.on=function(t,n){"destroy"===t?this.one(t,n):(this.el.addEventListener(t,n),this.listeners.push([t,n]))},i.prototype.one=function(t,n){!function(t,n,e){t.addEventListener(n,(function o(){for(var i=[],r=0;r<arguments.length;r++)i[r]=arguments[r];t.removeEventListener(n,o),e.apply(void 0,i)}))}(this.el,t,n)},i.prototype.off=function(t,n){this.el.removeEventListener(t,n)},i.prototype.trigger=function(t,n){!function(t,n,e){var o;if(void 0===e&&(e={}),CustomEvent)try{o=new CustomEvent(n,{detail:e})}catch(t){(o=document.createEvent("CustomEvent")).initCustomEvent(n,!0,!0,e)}else(o=document.createEvent("CustomEvent")).initCustomEvent(n,!0,!0,e);t.dispatchEvent(o)}(this.el,t,n)},i.prototype.setOpenAnimation=function(t){this.options.openAnimation=t},i.prototype.setCloseAnimation=function(t){this.options.closeAnimation=t},i.prototype.open=function(){return n(this,void 0,void 0,(function(){return e(this,(function(t){switch(t.label){case 0:return this.previousActiveElement=document.activeElement,this.isOpen=!0,this.el.classList.add(u,r),this.options.onOpen(this),this.trigger(c),[4,this.options.openAnimation(this)];case 1:return t.sent(),this.el.classList.remove(r),this.options.onOpenComplete(this),this.trigger(l),[2]}}))}))},i.prototype.close=function(){return n(this,void 0,void 0,(function(){return e(this,(function(t){switch(t.label){case 0:return this.el.classList.add(s),this.options.onClose(this),this.trigger(p),[4,this.options.closeAnimation(this)];case 1:return t.sent(),this.isOpen=!1,this.el.classList.remove(s),this.el.classList.remove(u),this.innerContainer&&this.innerContainer.scrollTo&&this.innerContainer.scrollTo(0,0),this.options.onCloseComplete(this),this.trigger(a),[2]}}))}))},i}();export default d;
