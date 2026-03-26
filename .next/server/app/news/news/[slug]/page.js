(()=>{var e={};e.id=2224,e.ids=[2224],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},1017:e=>{"use strict";e.exports=require("path")},7310:e=>{"use strict";e.exports=require("url")},9300:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>d,routeModule:()=>g,tree:()=>c}),r(3042),r(9695),r(1506),r(5866);var n=r(3191),s=r(8716),a=r(7922),i=r.n(a),l=r(5231),o={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>l[e]);r.d(t,o);let c=["",{children:["news",{children:["news",{children:["[slug]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,3042)),"/private/tmp/laow-blog-git/app/news/news/[slug]/page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,9695)),"/private/tmp/laow-blog-git/app/news/layout.tsx"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,7481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,1506)),"/private/tmp/laow-blog-git/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,5866,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,7481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["/private/tmp/laow-blog-git/app/news/news/[slug]/page.tsx"],u="/news/news/[slug]/page",p={require:r,loadChunk:()=>Promise.resolve()},g=new n.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/news/news/[slug]/page",pathname:"/news/news/[slug]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},8120:()=>{},3702:()=>{},6381:(e,t,r)=>{Promise.resolve().then(r.bind(r,7553)),Promise.resolve().then(r.t.bind(r,9404,23))},1896:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,2994,23)),Promise.resolve().then(r.t.bind(r,6114,23)),Promise.resolve().then(r.t.bind(r,9727,23)),Promise.resolve().then(r.t.bind(r,9671,23)),Promise.resolve().then(r.t.bind(r,1868,23)),Promise.resolve().then(r.t.bind(r,4759,23))},7553:(e,t,r)=>{"use strict";r.d(t,{default:()=>o});var n=r(326),s=r(434),a=r(5047),i=r(7577);let l=[{href:"/blog",label:"Blog"},{href:"/news",label:"News"},{href:"/projects",label:"Projects"},{href:"/about",label:"About"}];function o({headerBgImage:e}){let t=(0,a.usePathname)(),[r,o]=(0,i.useState)(!1);return(0,n.jsxs)(n.Fragment,{children:[n.jsx("header",{className:`header${e?" news-detail-header":""}`,style:e?{backgroundImage:`url(${e})`,backgroundSize:"cover",height:"300px"}:void 0,children:(0,n.jsxs)("div",{className:"container",children:[n.jsx(s.default,{href:"/",className:"logo",children:"AI Edge"}),n.jsx("nav",{className:"desktop-nav",children:l.map(e=>n.jsx(s.default,{href:e.href,className:`desktop-nav-link ${t===e.href?"active":""}`,children:e.label},e.href))}),n.jsx("button",{className:"nav-toggle",onClick:()=>o(!0),"aria-label":"Open Navigation",children:"☰"})]})}),n.jsx("div",{className:`nav-overlay ${r?"open":""}`,children:(0,n.jsxs)("div",{className:"nav-overlay-content",children:[(0,n.jsxs)("div",{className:"nav-overlay-header",children:[n.jsx(s.default,{href:"/",className:"logo",onClick:()=>o(!1),children:"AI Edge"}),n.jsx("button",{className:"nav-close",onClick:()=>o(!1),"aria-label":"Close Navigation",children:"✕"})]}),n.jsx("nav",{className:"nav-overlay-menu",children:l.map(e=>n.jsx(s.default,{href:e.href,className:`nav-overlay-link ${t===e.href?"active":""}`,onClick:()=>o(!1),children:e.label},e.href))}),(0,n.jsxs)("div",{className:"nav-overlay-footer",children:[n.jsx("a",{href:"https://twitter.com",target:"_blank",rel:"noopener noreferrer",className:"social-icon",children:n.jsx("i",{className:"fab fa-twitter"})}),n.jsx("a",{href:"https://linkedin.com",target:"_blank",rel:"noopener noreferrer",className:"social-icon",children:n.jsx("i",{className:"fab fa-linkedin-in"})}),n.jsx("a",{href:"https://instagram.com",target:"_blank",rel:"noopener noreferrer",className:"social-icon",children:n.jsx("i",{className:"fab fa-instagram"})}),n.jsx("a",{href:"https://facebook.com",target:"_blank",rel:"noopener noreferrer",className:"social-icon",children:n.jsx("i",{className:"fab fa-facebook-f"})})]})]})})]})}},434:(e,t,r)=>{"use strict";r.d(t,{default:()=>s.a});var n=r(9404),s=r.n(n)},5047:(e,t,r)=>{"use strict";var n=r(7389);r.o(n,"useParams")&&r.d(t,{useParams:function(){return n.useParams}}),r.o(n,"usePathname")&&r.d(t,{usePathname:function(){return n.usePathname}}),r.o(n,"useRouter")&&r.d(t,{useRouter:function(){return n.useRouter}})},1506:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a,metadata:()=>s});var n=r(9510);r(7272);let s={title:"The AI Edge",description:"探索AI与技术的边界"};function a({children:e}){return(0,n.jsxs)("html",{lang:"zh-CN",children:[n.jsx("head",{children:n.jsx("link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"})}),n.jsx("body",{children:e})]})}},9695:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a,metadata:()=>s});var n=r(9510);r(8316);let s={title:"The AI Edge",description:"探索AI与技术的边界"};function a({children:e}){return(0,n.jsxs)("html",{lang:"zh-CN",children:[n.jsx("head",{children:n.jsx("link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"})}),n.jsx("body",{children:e})]})}},3042:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>c,generateStaticParams:()=>o});var n=r(9510),s=r(7371),a=r(8585),i=r(4463);let l=[{slug:"2026-03-20-ai-news",title:"AI日报：全球算力告急涨价，腾讯AI投入翻倍",excerpt:"全球算力告急引发涨价潮，阿里云百度云同日官宣；腾讯2026财年AI投入翻倍；英伟达新功能遭游戏圈抵制",date:"2026-03-20",readTime:"3 min",content:`<h3>1. 全球算力告急引发"涨价潮"</h3>
<p>AWS和腾讯云之后，阿里云与百度云于3月19日同日官宣涨价，最高涨幅达34%。这意味着云计算十年"价格战"正式终结。</p>
<p><strong>影响分析：</strong></p>
<ul>
<li>中小企业成本压力增加</li>
<li>AI算力需求持续旺盛</li>
<li>云计算厂商盈利能力有望改善</li>
</ul>

<h3>2. 腾讯2026财年AI投入翻倍</h3>
<p>稳扎稳打的腾讯也要为AI花大钱了。2026财年，腾讯将减少股票回购，AI投入翻倍。</p>
<p><strong>关键点：</strong></p>
<ul>
<li>AI投入大幅增加</li>
<li>股票回购力度减少</li>
<li>市场期待微信Agent和姚顺雨两张底牌</li>
</ul>

<h3>3. 英伟达新AI功能遭全网抵制</h3>
<p>老黄怒怼玩家"根本不懂AI"，英伟达新AI功能遭全网抵制，游戏圈炸锅了。</p>

<h3>行业观察</h3>
<ul>
<li><strong>算力紧缺</strong>：AI爆发式增长导致全球算力供不应求</li>
<li><strong>投资加码</strong>：科技巨头纷纷加大AI投入</li>
<li><strong>争议显现</strong>：AI新技术应用面临用户接受度挑战</li>
</ul>`,image:"/images/articles/cloud-computing-price.png"},{slug:"openclaw-3-0",title:"OpenClaw 3.0 发布：AI 助手新纪元",excerpt:"全新版本的 OpenClaw 带来了更强大的自动化能力和更好的开发体验",date:"2026-03-19",readTime:"5 min",content:`<p>OpenClaw 3.0 正式发布了！这一版本带来了众多令人兴奋的新功能和改进，标志着 AI 助手开发进入了一个新的里程碑。</p>
    
    <h3>主要更新亮点</h3>
    <ul>
    <li><strong>更智能的任务自动化</strong> - 全新的任务调度系统，能够更智能地处理复杂的工作流程</li>
    <li><strong>增强的插件生态系统</strong> - 支持更多第三方插件，集成能力大幅提升</li>
    <li><strong>改进的协作能力</strong> - 支持多 Agent 协同工作，更好地处理复杂任务</li>
    <li><strong>性能优化</strong> - 响应速度提升 40%，内存占用降低 25%</li>
    <li><strong>全新 UI 设计</strong> - 更现代化的界面，更好的用户体验</li>
    </ul>
    
    <h3>开发者体验提升</h3>
    <p>对于开发者来说，3.0 版本提供了更完善的 SDK 和 API 文档，让集成变得更加简单。新增的调试工具和实时监控功能，大大提升了开发效率。</p>
    
    <h3>安全性增强</h3>
    <p>安全性一直是 OpenClaw 的核心关注点。3.0 版本引入了更严格的权限控制和数据加密机制，确保用户数据的安全。</p>
    
    <p>如果你想了解更多关于 OpenClaw 3.0 的详细信息，可以访问官方网站或关注官方社区。</p>`,image:"/images/articles/news-ai-robot.jpg"},{slug:"ai-agent-workflow",title:"AI Agent 工作流最佳实践",excerpt:"探讨如何构建高效的 AI Agent 协作系统",date:"2026-03-19",readTime:"8 min",content:`<p>随着 AI 技术的快速发展，如何构建高效的 AI Agent 协作系统成为了开发者关注的焦点。本文将分享一些经过验证的最佳实践。</p>
    
    <h3>任务分配策略</h3>
    <ul>
    <li><strong>单一职责原则</strong> - 每个 Agent 只负责特定类型的任务，避免功能过于复杂</li>
    <li><strong>层级架构</strong> - 建立清晰的 Agent 层级，主 Agent 负责协调，子 Agent 负责执行</li>
    <li><strong>动态调度</strong> - 根据任务复杂度自动选择合适的 Agent 处理</li>
    </ul>
    
    <h3>通信协议设计</h3>
    <p>Agent 之间的通信是协作的关键。建议采用结构化的消息格式，明确消息类型和内容规范，便于调试和扩展。</p>
    
    <h3>错误处理机制</h3>
    <ul>
    <li><strong>重试策略</strong> - 实现智能重试，对临时性错误自动重试</li>
    <li><strong>降级方案</strong> - 当主要 Agent 不可用时，自动切换到备用方案</li>
    <li><strong>错误上报</strong> - 完善的错误收集和分析机制</li>
    </ul>
    
    <h3>监控和日志</h3>
    <p>建立全面的监控体系，实时跟踪 Agent 的运行状态和性能指标。详细的日志记录有助于问题排查和系统优化。</p>
    
    <h3>总结</h3>
    <p>构建高效的 AI Agent 系统需要综合考虑多个方面，包括架构设计、通信协议、错误处理和监控等。希望这些最佳实践对你有所帮助。</p>`,image:"/images/articles/news-ai-workflow.jpg"},{slug:"digital-employee-era",title:"数字员工时代的到来",excerpt:"AI 正在改变我们的工作方式，企业数字化转型进入新阶段",date:"2026-03-19",readTime:"6 min",content:`<p>AI 技术的快速发展正在彻底改变我们的工作方式。数字员工不再是科幻概念，而是正在成为企业中不可或缺的力量。</p>
    
    <h3>什么是数字员工？</h3>
    <p>数字员工是基于人工智能技术的虚拟工作者，能够模拟人类员工的行为，执行各种工作任务。它们可以 24/7 不间断工作，处理大量重复性任务，并且不会感到疲劳。</p>
    
    <h3>数字员工的优势</h3>
    <ul>
    <li><strong>效率提升</strong> - 处理速度是人工的 10 倍以上，错误率接近零</li>
    <li><strong>成本降低</strong> - 一次投入，长期使用，大幅降低人力成本</li>
    <li><strong>一致性</strong> - 服务质量稳定，不受情绪和状态影响</li>
    <li><strong>可扩展性</strong> - 根据业务需求快速扩展或缩减</li>
    <li><strong>数据驱动</strong> - 实时收集和分析数据，提供决策支持</li>
    </ul>
    
    <h3>应用场景</h3>
    <ul>
    <li><strong>客户服务</strong> - 智能客服机器人，处理常见问题和咨询</li>
    <li><strong>业务流程</strong> - 自动化处理订单、审批、报表等流程</li>
    <li><strong>数据分析</strong> - 快速处理大量数据，生成洞察报告</li>
    <li><strong>人力资源</strong> - 简历筛选、员工入职流程自动化</li>
    </ul>
    
    <h3>未来展望</h3>
    <p>预计到 2028 年，超过 50% 的大型企业将部署数字员工。随着技术的不断进步，数字员工将能够处理越来越复杂的任务，成为企业数字化转型的重要推动力。</p>
    
    <p>对于企业来说，现在是时候开始规划数字员工战略了。越早布局，就能越早享受AI带来的红利。</p>`,image:"/images/articles/news-digital-era.jpg"}];async function o(){return l.map(e=>({slug:e.slug}))}async function c({params:e}){let{slug:t}=await e,r=l.find(e=>e.slug===t);r||(0,a.notFound)();let o=l.findIndex(e=>e.slug===t);return l[o+1]||l[0],l.length,(0,n.jsxs)(n.Fragment,{children:[n.jsx(i.ZP,{headerBgImage:r.image}),(0,n.jsxs)("article",{className:"article-page news-article-page",style:{padding:0},children:[n.jsx("div",{className:"article-wrapper",style:{padding:"0 24px"},children:n.jsx("span",{className:"blog-entry-category",children:new Date(r.date).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})})}),n.jsx("div",{className:"article-wrapper",children:(0,n.jsxs)("div",{className:"article-content",children:[n.jsx("h1",{children:r.title}),n.jsx("div",{dangerouslySetInnerHTML:{__html:r.content}}),(0,n.jsxs)("div",{className:"share-links",children:[n.jsx("a",{href:"#",title:"Twitter",children:n.jsx("i",{className:"fab fa-twitter"})}),n.jsx("a",{href:"#",title:"LinkedIn",children:n.jsx("i",{className:"fab fa-linkedin-in"})}),n.jsx("a",{href:"#",title:"Facebook",children:n.jsx("i",{className:"fab fa-facebook-f"})})]})]})})]}),n.jsx("section",{className:"bg-light pt-4 pb-4",children:(0,n.jsxs)("div",{className:"container",children:[n.jsx("h3",{style:{marginBottom:"24px",fontSize:"18px",fontWeight:700},children:"其他新闻"}),n.jsx("div",{className:"posts-grid",children:l.filter(e=>e.slug!==t).slice(0,3).map(e=>n.jsx("div",{className:"col-12 col-md-6 col-lg-4 mb-4 blog-item",children:n.jsx("div",{className:"card h-100",children:(0,n.jsxs)(s.default,{href:`/posts/${e.slug}`,children:[n.jsx("div",{className:"position-relative",children:n.jsx("img",{src:e.image,className:"blog-image",alt:e.title})}),(0,n.jsxs)("div",{className:"card-body",children:[n.jsx("h3",{className:"card-title",children:e.title}),(0,n.jsxs)("p",{className:"blog-length",children:[e.date," \xb7 ",e.readTime," 阅读"]})]})]})})},e.slug))})]})}),n.jsx("footer",{className:"footer",children:(0,n.jsxs)("div",{className:"container",children:[(0,n.jsxs)("div",{className:"footer-content",children:[(0,n.jsxs)("div",{className:"footer-section",children:[n.jsx("h3",{children:"Email"}),n.jsx("a",{href:"mailto:hello@laow6.com",children:"hello@laow6.com"})]}),(0,n.jsxs)("div",{className:"footer-section",children:[n.jsx("h3",{children:"Newsletter"}),n.jsx(s.default,{href:"/subscribe",children:"Stay in touch"})]}),(0,n.jsxs)("div",{className:"footer-section",children:[n.jsx("h3",{children:"Connect"}),(0,n.jsxs)("a",{href:"#",children:[n.jsx("i",{className:"fab fa-linkedin-in"})," LinkedIn"]}),(0,n.jsxs)("a",{href:"#",children:[n.jsx("i",{className:"fab fa-instagram"})," Instagram"]})]})]}),n.jsx("div",{className:"footer-bottom",children:n.jsx("p",{children:"\xa9 2026 AI Edge. All rights reserved."})})]})})]})}},4463:(e,t,r)=>{"use strict";r.d(t,{ZP:()=>l});var n=r(8570);let s=(0,n.createProxy)(String.raw`/private/tmp/laow-blog-git/components/Navigation.tsx`),{__esModule:a,$$typeof:i}=s;s.default;let l=(0,n.createProxy)(String.raw`/private/tmp/laow-blog-git/components/Navigation.tsx#default`)},7371:(e,t,r)=>{"use strict";r.d(t,{default:()=>s.a});var n=r(1812),s=r.n(n)},8585:(e,t,r)=>{"use strict";var n=r(1085);r.o(n,"notFound")&&r.d(t,{notFound:function(){return n.notFound}})},1085:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{ReadonlyURLSearchParams:function(){return i},RedirectType:function(){return n.RedirectType},notFound:function(){return s.notFound},permanentRedirect:function(){return n.permanentRedirect},redirect:function(){return n.redirect}});let n=r(3953),s=r(6399);class a extends Error{constructor(){super("Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams")}}class i extends URLSearchParams{append(){throw new a}delete(){throw new a}set(){throw new a}sort(){throw new a}}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},6399:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{isNotFoundError:function(){return s},notFound:function(){return n}});let r="NEXT_NOT_FOUND";function n(){let e=Error(r);throw e.digest=r,e}function s(e){return"object"==typeof e&&null!==e&&"digest"in e&&e.digest===r}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8586:(e,t)=>{"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"RedirectStatusCode",{enumerable:!0,get:function(){return r}}),function(e){e[e.SeeOther=303]="SeeOther",e[e.TemporaryRedirect=307]="TemporaryRedirect",e[e.PermanentRedirect=308]="PermanentRedirect"}(r||(r={})),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},3953:(e,t,r)=>{"use strict";var n;Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{RedirectType:function(){return n},getRedirectError:function(){return o},getRedirectStatusCodeFromError:function(){return h},getRedirectTypeFromError:function(){return g},getURLFromRedirectError:function(){return p},isRedirectError:function(){return u},permanentRedirect:function(){return d},redirect:function(){return c}});let s=r(4580),a=r(2934),i=r(8586),l="NEXT_REDIRECT";function o(e,t,r){void 0===r&&(r=i.RedirectStatusCode.TemporaryRedirect);let n=Error(l);n.digest=l+";"+t+";"+e+";"+r+";";let a=s.requestAsyncStorage.getStore();return a&&(n.mutableCookies=a.mutableCookies),n}function c(e,t){void 0===t&&(t="replace");let r=a.actionAsyncStorage.getStore();throw o(e,t,(null==r?void 0:r.isAction)?i.RedirectStatusCode.SeeOther:i.RedirectStatusCode.TemporaryRedirect)}function d(e,t){void 0===t&&(t="replace");let r=a.actionAsyncStorage.getStore();throw o(e,t,(null==r?void 0:r.isAction)?i.RedirectStatusCode.SeeOther:i.RedirectStatusCode.PermanentRedirect)}function u(e){if("object"!=typeof e||null===e||!("digest"in e)||"string"!=typeof e.digest)return!1;let[t,r,n,s]=e.digest.split(";",4),a=Number(s);return t===l&&("replace"===r||"push"===r)&&"string"==typeof n&&!isNaN(a)&&a in i.RedirectStatusCode}function p(e){return u(e)?e.digest.split(";",3)[2]:null}function g(e){if(!u(e))throw Error("Not a redirect error");return e.digest.split(";",2)[1]}function h(e){if(!u(e))throw Error("Not a redirect error");return Number(e.digest.split(";",4)[3])}(function(e){e.push="push",e.replace="replace"})(n||(n={})),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1812:(e,t,r)=>{"use strict";let{createProxy:n}=r(8570);e.exports=n("/private/tmp/laow-blog-git/node_modules/next/dist/client/link.js")},7481:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});var n=r(6621);let s=e=>[{type:"image/x-icon",sizes:"16x16",url:(0,n.fillMetadataSegment)(".",e.params,"favicon.ico")+""}]},7272:()=>{},8316:()=>{}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[8948,4471,3838],()=>r(9300));module.exports=n})();