"use strict";(()=>{var e={};e.id=7838,e.ids=[7838],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},4567:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>m,patchFetch:()=>L,requestAsyncStorage:()=>d,routeModule:()=>c,serverHooks:()=>E,staticGenerationAsyncStorage:()=>l});var s={};r.r(s),r.d(s,{POST:()=>i});var a=r(9303),o=r(8716),u=r(670),n=r(7070);let p=process.env.SUPABASE_SERVICE_ROLE_KEY;async function i(){let{createClient:e}=await r.e(8336).then(r.bind(r,8336)),t=e("https://zneonjdkseujrzlowfgp.supabase.co",p),{error:s}=await t.rpc("exec",{sql:`
      CREATE TABLE IF NOT EXISTS public.comments (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        slug text NOT NULL,
        author_name text NOT NULL,
        content text NOT NULL,
        created_at timestamptz DEFAULT now()
      );
      ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
      CREATE POLICY "Allow all" ON public.comments FOR ALL USING (true) WITH CHECK (true);
    `});return s?n.NextResponse.json({error:s.message},{status:500}):n.NextResponse.json({success:!0})}let c=new a.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/setup/route",pathname:"/api/setup",filename:"route",bundlePath:"app/api/setup/route"},resolvedPagePath:"/private/tmp/laow-blog-git/app/api/setup/route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:d,staticGenerationAsyncStorage:l,serverHooks:E}=c,m="/api/setup/route";function L(){return(0,u.patchFetch)({serverHooks:E,staticGenerationAsyncStorage:l})}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[8948,5972],()=>r(4567));module.exports=s})();