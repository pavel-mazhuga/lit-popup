!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).LitPopup=e()}(this,function(){"use strict";var t=function(){return(t=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t}).apply(this,arguments)};function e(t,e,n,o){return new(n||(n=Promise))(function(i,r){function s(t){try{c(o.next(t))}catch(t){r(t)}}function u(t){try{c(o.throw(t))}catch(t){r(t)}}function c(t){t.done?i(t.value):new n(function(e){e(t.value)}).then(s,u)}c((o=o.apply(t,e||[])).next())})}function n(t,e){var n,o,i,r,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return r={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function u(r){return function(u){return function(r){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,o&&(i=2&r[0]?o.return:r[0]?o.throw||((i=o.return)&&i.call(o),0):o.next)&&!(i=i.call(o,r[1])).done)return i;switch(o=0,i&&(r=[2&r[0],i.value]),r[0]){case 0:case 1:i=r;break;case 4:return s.label++,{value:r[1],done:!1};case 5:s.label++,o=r[1],r=[0];continue;case 7:r=s.ops.pop(),s.trys.pop();continue;default:if(!(i=(i=s.trys).length>0&&i[i.length-1])&&(6===r[0]||2===r[0])){s=0;continue}if(3===r[0]&&(!i||r[1]>i[0]&&r[1]<i[3])){s.label=r[1];break}if(6===r[0]&&s.label<i[1]){s.label=i[1],i=r;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(r);break}i[2]&&s.ops.pop(),s.trys.pop();continue}r=e.call(t,s)}catch(t){r=[6,t],o=0}finally{n=i=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}([r,u])}}}var o=function(t){return"[lit-popup] "+t},i=27,r=function(t){var e=function(e){e.keyCode===i&&(e.preventDefault(),t.isOpen&&t.close())},n=function(){document.removeEventListener("keydown",e)};return t.on(l.OPEN,function(){document.addEventListener("keydown",e)}),t.on(l.CLOSE,n),function(){n()}},s="lit-popup--opening",u="lit-popup--closing",c="lit-popup--opened",l={OPEN:"open",OPEN_COMPLETE:"open-complete",CLOSE:"close",CLOSE_COMPLETE:"close-complete",DESTROY:"destroy"},p={plugins:[],innerContainerSelector:".lit-popup-container",onOpen:function(){},openAnimation:function(){return Promise.resolve()},onOpenComplete:function(){},onClose:function(){},closeAnimation:function(){return Promise.resolve()},onCloseComplete:function(){},onDestroy:function(){}};return function(){function i(e,n){if(void 0===n&&(n={}),!e)throw new Error(o("Expected a name as a first argument."));this.options=t({},p,n),this.isOpen=!1;var i=document.querySelector('[data-lit-popup="'+e+'"]');if(!i)throw new Error(o("Element not found."));this.el=i,this.listeners=[],this.innerContainer=this.el.querySelector(this.options.innerContainerSelector),this.openButtons=Array.from(document.querySelectorAll('[data-lit-popup-open="'+e+'"]')),this.closeButtons=Array.from(document.querySelectorAll('[data-lit-popup-close="'+e+'"]')),this.plugins=[r].concat(this.options.plugins),this.pluginDestroyers=[],this.previousActiveElement=null,this.open=this.open.bind(this),this.close=this.close.bind(this),this.init()}return i.prototype.init=function(){var t=this;this.openButtons.forEach(function(e){return e.addEventListener("click",t.open)}),this.closeButtons.forEach(function(e){return e.addEventListener("click",t.close)}),this.pluginDestroyers=this.plugins.map(function(e){return e(t)})},i.prototype.destroy=function(){var t=this;this.options.onDestroy(this),this.trigger(l.DESTROY),this.openButtons.forEach(function(e){return e.removeEventListener("click",t.open)}),this.closeButtons.forEach(function(e){return e.removeEventListener("click",t.close)}),this.pluginDestroyers.forEach(function(t){return t()}),this.listeners.forEach(function(e){var n=e[0],o=e[1];return t.off(n,o)}),this.listeners=[],this.isOpen=!1,this.el=null,this.innerContainer=null,this.openButtons=[],this.closeButtons=[],this.previousActiveElement=null},i.prototype.on=function(t,e){"destroy"===t?this.one(t,e):(this.el.addEventListener(t,e),this.listeners.push([t,e]))},i.prototype.one=function(t,e){!function(t,e,n){t.addEventListener(e,function o(){for(var i=[],r=0;r<arguments.length;r++)i[r]=arguments[r];t.removeEventListener(e,o),n.apply(void 0,i)})}(this.el,t,e)},i.prototype.off=function(t,e){this.el.removeEventListener(t,e)},i.prototype.trigger=function(t,e){!function(t,e,n){var o;if(void 0===n&&(n={}),CustomEvent)try{o=new CustomEvent(e,{detail:n})}catch(t){(o=document.createEvent("CustomEvent")).initCustomEvent(e,!0,!0,n)}else(o=document.createEvent("CustomEvent")).initCustomEvent(e,!0,!0,n);t.dispatchEvent(o)}(this.el,t,e)},i.prototype.open=function(){return e(this,void 0,void 0,function(){var t;return n(this,function(e){switch(e.label){case 0:return t=this.el.querySelector(":not([disabled])"),this.previousActiveElement=document.activeElement,t&&t.focus(),this.isOpen=!0,this.el.classList.add(c,s),this.options.onOpen(this),this.trigger(l.OPEN),[4,this.options.openAnimation(this)];case 1:return e.sent(),this.el.classList.remove(s),this.options.onOpenComplete(this),this.trigger(l.OPEN_COMPLETE),[2]}})})},i.prototype.close=function(){return e(this,void 0,void 0,function(){return n(this,function(t){switch(t.label){case 0:return this.el.classList.add(u),this.options.onClose(this),this.trigger(l.CLOSE),[4,this.options.closeAnimation(this)];case 1:return t.sent(),this.isOpen=!1,this.el.classList.remove(u,c),this.innerContainer&&this.innerContainer.scrollTo&&this.innerContainer.scrollTo(0,0),this.previousActiveElement instanceof HTMLElement&&this.previousActiveElement.focus(),this.options.onCloseComplete(this),this.trigger(l.CLOSE_COMPLETE),[2]}})})},i}()});