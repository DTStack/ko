"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[80],{734:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return g}});var r=n(2435);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=r.createContext({}),p=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},s=function(e){var t=p(e.components);return r.createElement(u.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,u=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),m=p(n),g=a,k=m["".concat(u,".").concat(g)]||m[g]||c[g]||i;return n?r.createElement(k,o(o({ref:t},s),{},{components:n})):r.createElement(k,o({ref:t},s))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=m;var l={};for(var u in t)hasOwnProperty.call(t,u)&&(l[u]=t[u]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var p=2;p<i;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},3506:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return u},metadata:function(){return p},assets:function(){return s},toc:function(){return c},default:function(){return g}});var r=n(7180),a=n(5317),i=(n(2435),n(734)),o=["components"],l={sidebar_position:6,title:"Contributing"},u="Contributing to ko",p={unversionedId:"contributing",id:"contributing",title:"Contributing",description:"We use pnpm workspace to manage our packages. so make sure you use pnpm as package manager than npm or yarn.",source:"@site/docs/contributing.md",sourceDirName:".",slug:"/contributing",permalink:"/ko/docs/contributing",editUrl:"https://github.com/DTStack/ko/website/docs/contributing.md",tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6,title:"Contributing"},sidebar:"tutorialSidebar",previous:{title:"migration",permalink:"/ko/docs/advanced/migration"}},s={},c=[{value:"Code Structure",id:"code-structure",level:2},{value:"Debug",id:"debug",level:3},{value:"Local Testing",id:"local-testing",level:3},{value:"Submitting a Pull Request (PR)",id:"submitting-a-pull-request-pr",level:2}],m={toc:c};function g(e){var t=e.components,n=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"contributing-to-ko"},"Contributing to ko"),(0,i.kt)("p",null,"We use ",(0,i.kt)("strong",{parentName:"p"},"pnpm workspace")," to manage our packages. so make sure you use ",(0,i.kt)("strong",{parentName:"p"},"pnpm")," as package manager than ",(0,i.kt)("strong",{parentName:"p"},"npm")," or ",(0,i.kt)("strong",{parentName:"p"},"yarn"),"."),(0,i.kt)("p",null,"To getting started with this repo:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"pnpm install\n")),(0,i.kt)("h2",{id:"code-structure"},"Code Structure"),(0,i.kt)("p",null,"as a ",(0,i.kt)("strong",{parentName:"p"},"monorepo"),", ko now maintain 4 packages in packages directory:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"ko"),": main package"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"ko-lints"),": code format cli, include ",(0,i.kt)("strong",{parentName:"li"},"eslint"),", ",(0,i.kt)("strong",{parentName:"li"},"prettier")," and ",(0,i.kt)("strong",{parentName:"li"},"stylelint"),", can be integrated in ko or use individually"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"ko-config"),": default config used by ",(0,i.kt)("strong",{parentName:"li"},"ko-lints")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"babel-preset-ko-app"),": babel preset used by ko")),(0,i.kt)("h3",{id:"debug"},"Debug"),(0,i.kt)("p",null,"use ",(0,i.kt)("inlineCode",{parentName:"p"},"pnpm debug")," to debug local packages"),(0,i.kt)("h3",{id:"local-testing"},"Local Testing"),(0,i.kt)("p",null,"use ",(0,i.kt)("strong",{parentName:"p"},"pnpm link")," to link ",(0,i.kt)("inlineCode",{parentName:"p"},"ko")," into local packages for testing"),(0,i.kt)("h2",{id:"submitting-a-pull-request-pr"},"Submitting a Pull Request (PR)"),(0,i.kt)("p",null,"Before you submit your Pull Request (PR) consider the following guidelines:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Run ",(0,i.kt)("inlineCode",{parentName:"p"},"pnpm changeset")," in the root of the repository and describe your changes. The resulting files should be committed as they will be used during release.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Run the full test suite and ensure that all tests pass.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Push your branch to GitHub:"),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"git push origin my-fix-branch\n"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"In GitHub, send a pull request.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"If we suggest changes then:"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Make the required updates.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Re-run the test suites to ensure tests are still passing.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Rebase your branch and force push to your GitHub repository (this will update your Pull Request):"),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"git rebase main -i\ngit push -f\n")))))),(0,i.kt)("p",null,"That's it! Thank you for your contribution!"))}g.isMDXComponent=!0}}]);