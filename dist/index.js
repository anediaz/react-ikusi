"use strict";function n(n){return n&&"object"==typeof n&&"default"in n?n.default:n}var e=n(require("@babel/runtime/helpers/taggedTemplateLiteralLoose")),t=require("react"),r=n(t),i=n(require("prop-types")),o=n(require("underscore")),u=require("styled-components"),a=n(u);function c(){var n=e(["\n  height: 1rem;\n  width: 1rem;\n  left: calc(50% - 0.5rem);\n  top: calc(50% - 0.5rem);\n  border-color: lightseagreen;\n  border-right: none;\n  animation: "," 5s linear infinite;\n"]);return c=function(){return n},n}function l(){var n=e(["\n  height: 2rem;\n  width: 2rem;\n  left: calc(50% - 1rem);\n  top: calc(50% - 1rem);\n  border-color: deeppink;\n  border-top: none;\n  animation: "," 3s linear infinite;\n"]);return l=function(){return n},n}function f(){var n=e(["\n  height: 3rem;\n  width: 3rem;\n  left: calc(50% - 1.5rem);\n  top: calc(50% - 1.5rem);\n  border-color: deepskyblue;\n  border-left: none;\n  animation: "," 8s linear infinite;\n"]);return f=function(){return n},n}function s(){var n=e(["\n  position: absolute;\n  border: 0.1rem solid;\n  border-radius: 50%;\n  float: left;\n"]);return s=function(){return n},n}function m(){var n=e(["\n  0%{\n    transform: rotate(0deg);\n  }\n  50%{\n    transform: rotate(360deg);\n  }\n  100%{\n    transform: rotate(720deg);\n  }\n"]);return m=function(){return n},n}var d=u.keyframes(m()),h=a.div(s()),g=a(h)(f(),d),p=a(h)(l(),d),v=a(h)(c(),d),b=function(){return r.createElement("div",{className:"Loader"},r.createElement(g,null),r.createElement(p,null),r.createElement(v,null))};function x(){var n=e(["\n  color: white;\n  font-size: ",";\n  opacity: 0.6;\n  @media (max-width: 768px) {\n    font-size: ",";\n  }\n\n  &:hover {\n    cursor: pointer;\n  }\n  @media (min-width: 1920px) {\n    font-size: 125px;\n  }\n"]);return x=function(){return n},n}function w(){var n=e(["\n  width: 5%;\n  visibility: ",";\n  @media (orientation: portrait) {\n    margin: 0 auto;\n  }\n"]);return w=function(){return n},n}function E(){var n=e(["\n  margin: 0 auto;\n  max-height: 100%;\n  max-width: 80%;\n"]);return E=function(){return n},n}function y(){var n=e(["\n  text-align: center;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n  @media (orientation: landscape) {\n    height: 75%;\n  }\n  @media (orientation: portrait) {\n    max-height: 60%;\n  }\n"]);return y=function(){return n},n}function k(){var n=e(["\n  width: 100%;\n  overflow: auto;\n  text-align: center;\n"]);return k=function(){return n},n}function C(){var n=e(["\n  display: ",";\n  flex-direction: column;\n  justify-content: center;\n  height: 100%;\n  align-items: center;\n  left: 0px;\n  position: fixed;\n  top: 0px;\n  width: 100%;\n  z-index: 2001;\n  background: rgba(0, 0, 0, 0.8);\n"]);return C=function(){return n},n}var q=a.div(C(),(function(n){return n.isActive?"flex":"none"})),z=a.div(k()),L=a.div(y()),P=a.img(E()),R=a.div(w(),(function(n){return n.enabled?"visible":"hidden"})),W=a.span(x(),(function(n){return"small"===n.fontSize?"35px":"50px"}),(function(n){return"small"===n.fontSize?"35px":"40px"})),S={img:i.string.isRequired,onClose:i.func,onNext:i.func,onPrev:i.func},N=function(n){var e=n.img,t=n.onClose,i=n.onNext,o=n.onPrev;return r.createElement(q,{isActive:Boolean(e)},r.createElement(z,null,r.createElement(W,{onClick:function(){return t()},fontSize:"big"},"×")),r.createElement(L,null,r.createElement(R,{enabled:Boolean(o)},r.createElement(W,{onClick:function(){return o?o():null}},"<")),r.createElement(P,{src:e,alt:""}),r.createElement(R,{enabled:Boolean(i)},r.createElement(W,{onClick:function(){return i?i():null}},">"))))};function j(){var n=e(["\n  height: 100%;\n  width: auto;\n  &:hover {\n    cursor: ",";\n    opacity: 0.5;\n  }\n"]);return j=function(){return n},n}function B(){var n=e(["\n  width: 100%;\n  margin: ",";\n  display: flex;\n  justify-content: space-evenly;\n  text-align: center;\n  height: ",";\n"]);return B=function(){return n},n}function H(){var n=e(["\n  margin-top: 0.2rem;\n  width: 100%;\n"]);return H=function(){return n},n}N.propTypes=S,N.defaultProps={img:null,onClose:function(){}};var T={configurations:i.arrayOf(i.shape({cols:i.number.isRequired,margin:i.number.isRequired,maxWidth:i.number,minWidth:i.number})),photos:i.arrayOf(i.shape({src:i.string.isRequired,width:i.number.isRequired,height:i.number.isRequired,bigSrc:i.string})).isRequired,withLightbox:i.bool,onClickPhoto:i.func},A=a.div(H()),O=a.div(B(),(function(n){return n.margin+"px 0"}),(function(n){return n.height+"px"})),D=a.img(j(),(function(n){return n.onClick?"pointer":"default"})),F=function(n,e){var t=n.find((function(n){var t=n.minWidth,r=n.maxWidth;return(t&&t<=e||!t)&&(r&&r>=e||!r)}));return{width:e,cols:t.cols||7,margin:t.margin||1}},I=function(n){var e=n.photos,i=n.configurations,u=n.withLightbox,a=n.onClickPhoto,c=t.useRef(null),l=t.useState(null),f=l[0],s=l[1],m=t.useState(F(i,window.screen.width)),d=m[0],h=m[1],g=function(){return c.current.offsetWidth||0};t.useEffect((function(){var n=o.debounce((function(){return h(F(i,g()))}),400);return window.addEventListener("resize",n),h(F(i,g())),function(){return window.removeEventListener("resize",n)}}),[i]);var p,v=function(){return s(null)},x=function(){return 0===f},w=function(){return f===e.length-1},E=function(){return w()?null:s(f+1)},y=function(){return x()?null:s(f-1)},k=function(n){var e=d.width,t=d.cols,r=d.margin,i=0;return n.forEach((function(n){i+=n.width/n.height})),(e-1-t*r*2)/i},C=function(n){for(var e=[].concat(n),t=[];e.length;){var r=e.splice(0,d.cols);t.push({photos:r,lineHeight:k(r)})}return t}(e);return r.createElement(A,{ref:c,onKeyDown:function(n){if(!isNaN(f))switch(n.keyCode){case 37:!x()&&y();break;case 39:!w()&&E();break;case 27:v()}},tabIndex:"0"},e.length?r.createElement(t.Fragment,null,C.map((function(n,e){return n.lineHeight?r.createElement(O,{height:n.lineHeight,margin:d.margin,key:"line-"+e},n.photos.map((function(n,t){var i=e*d.cols+t;return r.createElement(D,{src:n.src,alt:"",key:"item-"+t,onClick:function(){return function(n,e){u&&s(n),a(e)}(i,n.id)}})}))):r.createElement(b,null)})),u&&null!==f&&r.createElement(N,{img:(p=f,null!==p&&e.length>=p&&e[p]?e[p].bigSrc||e[p].src:null),onClose:v,onNext:w()?null:E,onPrev:x()?null:y})):r.createElement(b,null))};I.propTypes=T,I.defaultProps={configurations:[{maxWidth:340,cols:4,margin:1},{maxWidth:1024,cols:6,margin:1},{minWidth:1025,cols:12,margin:1}],withLightbox:!0,onClickPhoto:function(){}},module.exports=I;