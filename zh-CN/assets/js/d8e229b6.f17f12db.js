"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[962],{4852:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return m}});var r=n(9231);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=r.createContext({}),l=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(p.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),d=l(n),m=o,f=d["".concat(p,".").concat(m)]||d[m]||s[m]||a;return n?r.createElement(f,i(i({ref:t},u),{},{components:n})):r.createElement(f,i({ref:t},u))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=d;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c.mdxType="string"==typeof e?e:o,i[1]=c;for(var l=2;l<a;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9023:function(e,t,n){n.r(t),n.d(t,{assets:function(){return u},contentTitle:function(){return p},default:function(){return m},frontMatter:function(){return c},metadata:function(){return l},toc:function(){return s}});var r=n(4197),o=n(9567),a=(n(9231),n(4852)),i=["components"],c={sidebar_position:2,title:"\u5165\u95e8\u6307\u5357"},p=void 0,l={unversionedId:"getting-started",id:"getting-started",title:"\u5165\u95e8\u6307\u5357",description:"\u73af\u5883\u8981\u6c42",source:"@site/i18n/zh-CN/docusaurus-plugin-content-docs/current/getting-started.md",sourceDirName:".",slug:"/getting-started",permalink:"/ko/zh-CN/docs/current/getting-started",editUrl:"https://github.com/DTStack/ko/website/docs/getting-started.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"\u5165\u95e8\u6307\u5357"},sidebar:"tutorialSidebar",previous:{title:"\u4ecb\u7ecd",permalink:"/ko/zh-CN/docs/current/introduction"},next:{title:"\u547d\u4ee4\u884c\u754c\u9762",permalink:"/ko/zh-CN/docs/current/cli"}},u={},s=[{value:"\u73af\u5883\u8981\u6c42",id:"\u73af\u5883\u8981\u6c42",level:2},{value:"\u547d\u4ee4\u884c\u521b\u5efa React \u9879\u76ee",id:"\u547d\u4ee4\u884c\u521b\u5efa-react-\u9879\u76ee",level:2},{value:"\u5b89\u88c5 ko",id:"\u5b89\u88c5-ko",level:2},{value:"\u914d\u7f6e",id:"\u914d\u7f6e",level:2}],d={toc:s};function m(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"\u73af\u5883\u8981\u6c42"},"\u73af\u5883\u8981\u6c42"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Node.js \u7248\u672c: Node.js 14+")),(0,a.kt)("h2",{id:"\u547d\u4ee4\u884c\u521b\u5efa-react-\u9879\u76ee"},"\u547d\u4ee4\u884c\u521b\u5efa React \u9879\u76ee"),(0,a.kt)("p",null,"\u60a8\u53ef\u4ee5\u4f7f\u7528 CLI \u901a\u8fc7 TypeScript \u521b\u5efa React \u9879\u76ee\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"pnpm create ko\n# \u6216\u8005\nnpm create ko\n# \u6216\u8005\nyarn create ko\n")),(0,a.kt)("p",null,"\u7a0d\u7b49\u7247\u523b\u540e\uff0c\u60a8\u53ef\u4ee5\u5728\u7ec8\u7aef\u4e2d\u770b\u5230\u201cCreating project in...\u201d\u3002"),(0,a.kt)("p",null,"\u7136\u540e\u8fdb\u5165\u6587\u4ef6\u5939\u5e76\u5b89\u88c5\u4f9d\u8d56\u9879\u3002"),(0,a.kt)("h2",{id:"\u5b89\u88c5-ko"},"\u5b89\u88c5 ko"),(0,a.kt)("p",null,"\u4f60\u53ef\u4ee5\u4f7f\u7528 npm\u3001yarn \u6216 pnpm \u6765\u5b89\u88c5 ko\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"pnpm add ko --save-dev\n# \u6216\u8005\nnpm install ko --save-dev\n# \u6216\u8005\nyarn add ko --dev\n")),(0,a.kt)("p",null,"IE \u6d4f\u89c8\u5668\u9700\u8981\u4f7f\u7528 polyfills\u3002\u6211\u4eec\u63a8\u8350\u4f7f\u7528 ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/zloirock/core-js"},"core-js")," \u548c ",(0,a.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/regenerator-runtime"},"regenerator-runtime"),"\u3002\u4f60\u9700\u8981\u5c06\u5b83\u4eec\u5b89\u88c5\u4e3a\u4f9d\u8d56\u9879\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"pnpm add core-js regenerator-runtime\n")),(0,a.kt)("h2",{id:"\u914d\u7f6e"},"\u914d\u7f6e"),(0,a.kt)("p",null,"\u5b89\u88c5 ko \u540e\uff0c\u4f60\u53ef\u4ee5\u521b\u5efa\u4e00\u4e2a\u540d\u4e3a ",(0,a.kt)("strong",{parentName:"p"},"ko.config.js")," \u7684\u914d\u7f6e\u6587\u4ef6\u6765\u81ea\u5b9a\u4e49 ko\u3002\u4f60\u53ef\u4ee5\u6307\u5b9a\u81ea\u5df1\u7684 ",(0,a.kt)("strong",{parentName:"p"},"entry")," \u548c ",(0,a.kt)("strong",{parentName:"p"},"output")," \u914d\u7f6e\u3002\u66f4\u591a\u914d\u7f6e\u4fe1\u606f\u8bf7\u53c2\u89c1 ",(0,a.kt)("a",{parentName:"p",href:"./configuration"},"\u914d\u7f6e"),"\u3002ko \u5c06\u5e2e\u52a9\u4f60\u5408\u5e76\u8fd9\u4e9b\u914d\u7f6e\u5e76\u5728\u5185\u90e8 webpack \u5b9e\u4f8b\u4e2d\u4f7f\u7528\u5b83\u4eec\u3002\u4ee5\u4e0b\u662f\u4e00\u4e2a\u771f\u5b9e\u7684\u6848\u4f8b\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"module.exports = {\n  entry: './src/app.tsx',\n  outputPath: './dist' // \u4f60\u81ea\u5df1\u7684\u8f93\u51fa\u8def\u5f84\n  serve: {\n    proxy: PROXY_CONFIG, // \u4f60\u81ea\u5df1\u7684\u4ee3\u7406\u914d\u7f6e\n    host: '0.0.0.0',\n    port: 8084,\n  },\n};\n")))}m.isMDXComponent=!0}}]);