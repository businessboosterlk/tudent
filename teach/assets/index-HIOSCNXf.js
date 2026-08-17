(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();function je(e){return new Date(`${e}T12:00:00Z`)}function He(e){return e.toISOString().slice(0,10)}function be(e,t){const n=je(e);return n.setUTCDate(n.getUTCDate()+t),He(n)}function We(e){return e.slice(0,5)}function Ke(e,t){const n=new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).formatToParts(new Date(e)),a=s=>{var r;return((r=n.find(i=>i.type===s))==null?void 0:r.value)??"00"};return{date:`${a("year")}-${a("month")}-${a("day")}`,time:`${a("hour")}:${a("minute")}`}}function Le(e,t,n,a,s="Asia/Colombo"){const r=be(n,a),i=[],l=new Set(t.filter(o=>o.kind!=="extra"&&o.originalDate!==null).map(o=>`${o.batchId}|${o.originalDate}`));for(const o of e)for(let h=n;h<r;h=be(h,1))je(h).getUTCDay()===o.weekday&&(h<o.effectiveFrom||o.effectiveUntil!==null&&h>o.effectiveUntil||l.has(`${o.batchId}|${h}`)||i.push({batchId:o.batchId,date:h,startTime:We(o.startTime),durationMinutes:o.durationMinutes,location:o.location,status:"scheduled"}));for(const o of t){if(o.newStart===null)continue;const{date:h,time:c}=Ke(o.newStart,s);h<n||h>=r||i.push({batchId:o.batchId,date:h,startTime:c,durationMinutes:o.newDurationMinutes??120,location:o.newLocation??"",status:o.kind==="moved"?"moved":"extra",...o.kind==="moved"&&o.originalDate!==null?{movedFromDate:o.originalDate}:{},...o.note?{note:o.note}:{}})}return i.sort((o,h)=>o.date.localeCompare(h.date)||o.startTime.localeCompare(h.startTime)||o.batchId.localeCompare(h.batchId)||o.status.localeCompare(h.status)),i}function G(e){return new Date(`${e}T12:00:00Z`).toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short",timeZone:"UTC"})}function W(e){const[t=0,n=0]=e.split(":").map(Number),a=t>=12?"PM":"AM",s=t%12===0?12:t%12;return n===0?`${s} ${a}`:`${s}:${String(n).padStart(2,"0")} ${a}`}function Ze(e,t){const n=[];for(const{occ:a,label:s}of e)n.push({heading:s,detail:`${G(a.date)} · ${W(a.startTime)}${a.location?` · ${a.location}`:""}`,marker:"Confirmed by teacher",qualifier:a.status==="moved"?"Moved":a.status==="extra"?"Extra class":"",date:a.date,time:a.startTime});for(const a of t){const s=a.subjectLabel!==""&&a.title.toLowerCase().includes(a.subjectLabel.toLowerCase()),r=a.subjectLabel&&!s?` · ${a.subjectLabel}`:"";n.push({heading:a.title,detail:`${G(a.date)} · ${W(a.time)}${r}`,marker:"Added by you",qualifier:a.kind==="deadline"?"Due":"",date:a.date,time:a.time})}return n.sort((a,s)=>a.date.localeCompare(s.date)||a.time.localeCompare(s.time)||a.heading.localeCompare(s.heading)),n}function ge(e){const t={present:0,absent:0,late:0,total:e.length};for(const n of e)n.marked==="absent"?t.absent+=1:n.marked==="late"?t.late+=1:t.present+=1;return t}function we(e){if(e.total===0)return"Nobody on the roll for this class yet.";if(e.absent===0&&e.late===0)return`All ${e.total} present. Tap anyone who is not here.`;const t=[`${e.present} present`];return e.absent&&t.push(`${e.absent} absent`),e.late&&t.push(`${e.late} late`),`${t.join(" · ")} of ${e.total}.`}function Ge(e){return e===null||e==="present"?"absent":e==="absent"?"late":"present"}function ce(e){return e==="absent"?"Absent":e==="late"?"Late":"Present"}function ze(e,t){const n=a=>a.slice(0,10);return!(n(e.started_at)>t||e.ended_at&&n(e.ended_at)<t)}function O(e){const t=e<0?"-":"",n=Math.abs(e),a=Math.floor(n/100),s=String(n%100).padStart(2,"0"),r=String(a).replace(/\B(?=(\d{3})+(?!\d))/g,",");return`${t}LKR ${r}.${s}`}function se(e){const t={netCents:0,paidCents:0,reversedCents:0,adjustedCents:0,eventCount:e.length};for(const n of e)t.netCents+=n.amount_cents,n.kind==="payment"?t.paidCents+=n.amount_cents:n.kind==="reversal"?t.reversedCents+=n.amount_cents:t.adjustedCents+=n.amount_cents;return t}function Ye(e){const t=[...e].sort((a,s)=>a.effective_on.localeCompare(s.effective_on));let n=0;return t.map(a=>(n+=a.amount_cents,{runningCents:n,event:a}))}function Ve(e){return e==="payment"?"Payment":e==="reversal"?"Reversed":"Adjustment"}function Je(e){return e?{cash:"Cash",bank_transfer:"Bank transfer",card:"Card",online:"Online",other:"Other"}[e]??e:""}const Qe="batch-offline",Xe=1;function et(){return new Promise((e,t)=>{const n=indexedDB.open(Qe,Xe);n.onupgradeneeded=()=>{const a=n.result;a.objectStoreNames.contains("cache")||a.createObjectStore("cache",{keyPath:"key"}),a.objectStoreNames.contains("outbox")||a.createObjectStore("outbox",{keyPath:"id",autoIncrement:!0}).createIndex("by_status","status")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}function z(e,t,n){return et().then(a=>new Promise((s,r)=>{const i=a.transaction(e,t),l=n(i.objectStore(e));l.onsuccess=()=>s(l.result),l.onerror=()=>r(l.error),i.oncomplete=()=>a.close()}))}async function ne(e,t){await z("cache","readwrite",n=>n.put({key:e,value:t,savedAt:new Date().toISOString()}))}async function ae(e){return await z("cache","readonly",n=>n.get(e))??null}async function tt(e){await z("outbox","readwrite",t=>t.add({...e,status:"pending",attempts:0,lastError:"",createdAt:new Date().toISOString()}))}async function Be(){return(await z("outbox","readonly",t=>t.getAll())).sort((t,n)=>(t.id??0)-(n.id??0))}async function oe(e){await z("outbox","readwrite",t=>t.put(e))}async function nt(e){const t=(await Be()).filter(s=>s.status==="pending"),n=new Map;for(const s of t){const r=n.get(s.lane)??[];r.push(s),n.set(s.lane,r)}const a={delivered:0,failed:[],heldBack:0};return await Promise.all([...n.entries()].map(async([,s])=>{let r=!1;for(const i of s){if(r){a.heldBack+=1;continue}let l;try{l=await e(i)}catch(o){l={result:"unavailable",detail:String(o)}}i.attempts+=1,l.result==="ok"?(i.status="done",await oe(i),a.delivered+=1):l.result==="rejected"?(i.status="failed",i.lastError=l.detail??"rejected",await oe(i),a.failed.push({lane:i.lane,kind:i.kind,detail:i.lastError})):(i.lastError=l.detail??"unavailable",await oe(i),r=!0,a.heldBack+=1)}})),a}const I=864e5,X=()=>new Date,ee=e=>e.toISOString(),T=e=>new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Colombo"}).format(e),$=(e,t)=>`${T(new Date(Date.now()+e*I))}T${t}:00+05:30`,re=new Date().getDay(),_="11111111-1111-4111-8111-111111111111",f=e=>`00000000-0000-4000-8000-${String(e).padStart(12,"0")}`,D=f(101),$e=f(102),Z=f(103),F=new Map([["Amaya (Demo Student)",f(201)],["Bimsara (Demo Student)",f(202)],["Chatura (Demo Student)",f(203)],["Dilki (Demo Student)",f(204)]]),U=f(201),Y=f(301),ie=f(401),V=f(402),at=f(403),st=f(501),ke=f(601),ot=f(602),C={tenants:[{id:_,name:"Nimal Perera (Demo Teacher)"}],batches:[{id:D,tenant_id:_,label:"2027 A/L Chemistry (Demo)",location:"Panadura",archived_at:null,created_at:$(-30,"10:00")},{id:$e,tenant_id:_,label:"2027 A/L Physics (Demo)",location:"Moratuwa",archived_at:null,created_at:$(-20,"10:00")},{id:Z,tenant_id:_,label:"Revision Class (Demo)",location:"Panadura",archived_at:null,created_at:$(-5,"10:00")}],batch_schedules:[{id:f(111),tenant_id:_,batch_id:D,weekday:re,start_time:"16:00",duration_minutes:120,location:"Panadura",effective_from:T(new Date(Date.now()-60*I)),effective_until:null,active:!0},{id:f(112),tenant_id:_,batch_id:$e,weekday:(re+1)%7,start_time:"09:00",duration_minutes:90,location:"Moratuwa",effective_from:T(new Date(Date.now()-60*I)),effective_until:null,active:!0},{id:f(113),tenant_id:_,batch_id:Z,weekday:(re+2)%7,start_time:"14:00",duration_minutes:90,location:"Panadura",effective_from:T(new Date(Date.now()-60*I)),effective_until:null,active:!0}],schedule_exceptions:[],enrolments:[...F.entries()].flatMap(([e,t],n)=>[{id:t,tenant_id:_,batch_id:D,student_id:f(900+n),display_name:e,guardian_phone:"07x xxx xxxx (demo)",teacher_reference:"",status:"active",started_at:$(-28+n,"10:00"),ended_at:null,version:1}]),student_private_items:[{id:f(701),kind:"deadline",title:"History essay (your own)",subject_label:"History",starts_at:null,due_at:$(0,"21:00"),estimated_minutes:40,deleted_at:null},{id:f(702),kind:"external_class",title:"Kandy maths class (your own)",subject_label:"Maths",starts_at:$(2,"08:00"),due_at:null,estimated_minutes:90,deleted_at:null}],next_actions:[{id:st,tenant_id:_,batch_id:D,title:"Finish the electrolysis worksheet",estimated_minutes:8,due_at:$(0,"20:00"),result_visibility:"teacher_sees_completion",topic_id:V}],student_profiles:[{student_id:f(900),preferences:{minutes:8}}],canonical_topics:[{id:ie,name:"Organic chemistry",sort_order:1},{id:V,name:"Electrolysis",sort_order:2},{id:at,name:"Kinematics",sort_order:3}],topic_assertions:[{id:f(801),tenant_id:_,enrolment_id:U,topic_id:V,assertion_type:"teacher_observed",value:{},occurred_at:$(-3,"18:00"),supersedes:null},{id:f(804),tenant_id:_,enrolment_id:U,topic_id:V,assertion_type:"retrieval_success",value:{correct:4,total:5},occurred_at:$(-1,"20:00"),supersedes:null},{id:f(802),tenant_id:_,enrolment_id:U,topic_id:ie,assertion_type:"student_self_assessment",value:{feeling:"shaky"},occurred_at:$(-2,"19:00"),supersedes:null},{id:f(803),tenant_id:_,enrolment_id:U,topic_id:ie,assertion_type:"attended_instruction",value:{},occurred_at:$(-9,"18:00"),supersedes:null}],honours:[{kind:"steady_attendance",subject:"Chemistry",earned_on:T(new Date(Date.now()-7*I)),tenant_id:_},{kind:"kept_month",subject:"Chemistry",earned_on:T(new Date(Date.now()-21*I)),tenant_id:_}],class_sessions:[{id:Y,tenant_id:_,batch_id:D,held_on:T(new Date(Date.now()-7*I)),coverage_note:"Electrolysis: Faraday laws worked examples",completed_by:f(999)}],attendance_marks:[{id:f(311),tenant_id:_,batch_id:D,class_session_id:Y,enrolment_id:U,state:"present",note:"",marked_by:f(999),marked_at:$(-7,"16:05"),created_at:$(-7,"16:05")},{id:f(312),tenant_id:_,batch_id:D,class_session_id:Y,enrolment_id:F.get("Bimsara (Demo Student)"),state:"absent",note:"",marked_by:f(999),marked_at:$(-7,"16:05"),created_at:$(-7,"16:05")},{id:f(313),tenant_id:_,batch_id:D,class_session_id:Y,enrolment_id:F.get("Bimsara (Demo Student)"),state:"present",note:"came in late, corrected",marked_by:f(999),marked_at:$(-7,"16:20"),created_at:$(-7,"16:20")}],fee_events:[{id:f(321),tenant_id:_,batch_id:D,enrolment_id:U,kind:"payment",amount_cents:25e4,method:"cash",reference:"demo-0001",effective_on:T(new Date(Date.now()-6*I)),note:"",reverses_id:null,recorded_at:$(-6,"17:00")},{id:f(322),tenant_id:_,batch_id:D,enrolment_id:F.get("Chatura (Demo Student)"),kind:"payment",amount_cents:25e4,method:"transfer",reference:"demo-0002",effective_on:T(new Date(Date.now()-6*I)),note:"",reverses_id:null,recorded_at:$(-6,"17:05")},{id:f(323),tenant_id:_,batch_id:D,enrolment_id:F.get("Chatura (Demo Student)"),kind:"reversal",amount_cents:-25e4,method:"transfer",reference:"demo-0002",effective_on:T(new Date(Date.now()-5*I)),note:"recorded against the wrong student (demo)",reverses_id:f(322),recorded_at:$(-5,"09:00")},{id:f(324),tenant_id:_,batch_id:D,enrolment_id:F.get("Chatura (Demo Student)"),kind:"payment",amount_cents:25e4,method:"cash",reference:"demo-0003",effective_on:T(new Date(Date.now()-4*I)),note:"recorded again, correctly",reverses_id:null,recorded_at:$(-4,"17:00")}],prompts:[{id:ke,tenant_id:_,kind:"recall",active:!0}],prompt_versions:[{id:ot,prompt_id:ke,version:1,question:"In electrolysis of molten NaCl, what forms at the cathode?",answer_key:"Sodium metal. Na+ ions gain electrons (reduction) at the cathode."}],prompt_completions:[]};function rt(){const e=new Map;for(const t of[...C.attendance_marks].sort((n,a)=>n.marked_at===a.marked_at?String(n.id).localeCompare(String(a.id)):n.marked_at<a.marked_at?-1:1))e.set(`${t.class_session_id}|${t.enrolment_id}`,t);return[...e.values()]}const H=()=>sessionStorage.getItem("tudent-demo-offline")==="1";function Se(e){if(e==="attendance_current")return rt().filter(a=>!0);const t=C[e];if(!t)throw new Error(`demo client: no fixture table "${e}". Add it; do not let the demo invent an answer.`);const n=null;return n?t.filter(n):t}const it={class_sessions:"class_session_id",enrolments:"enrolment_id",batches:"batch_id"};function dt(e,t){var a;const n={...e};for(const s of t.matchAll(/([a-z_]+)\(([a-z_,]+)\)/g)){const[,r,i]=s,l=it[r],o=(a=C[r])==null?void 0:a.find(h=>h.id===e[l]);n[r]=o?Object.fromEntries(i.split(",").map(h=>[h,o[h]])):null}return n}class lt{constructor(t){this.table=t,this.filters=[],this.orderBy=null,this.limitN=null,this.selectCols="*",this.mode="select",this.payload=null,this.wantSingle=!1,this.wantMaybe=!1}select(t="*"){return this.selectCols=t,this}eq(t,n){return this.filters.push(a=>String(a[t])===String(n)),this}neq(t,n){return this.filters.push(a=>String(a[t])!==String(n)),this}is(t,n){return this.filters.push(a=>a[t]===n),this}in(t,n){const a=new Set(n.map(String));return this.filters.push(s=>a.has(String(s[t]))),this}gte(t,n){return this.filters.push(a=>a[t]>=n),this}lte(t,n){return this.filters.push(a=>a[t]<=n),this}gt(t,n){return this.filters.push(a=>a[t]>n),this}lt(t,n){return this.filters.push(a=>a[t]<n),this}order(t,n){return this.orderBy={col:t,asc:(n==null?void 0:n.ascending)!==!1},this}limit(t){return this.limitN=t,this}single(){return this.wantSingle=!0,this}maybeSingle(){return this.wantSingle=!0,this.wantMaybe=!0,this}insert(t){return this.mode="insert",this.payload=t,this}update(t){return this.mode="update",this.payload=t,this}run(){var t;if(H())return{data:null,error:{message:"Failed to fetch (demo offline)"},status:0};try{if(this.mode==="insert"){const r=(Array.isArray(this.payload)?this.payload:[this.payload]).map(l=>({id:crypto.randomUUID(),created_at:ee(X()),...l}));return(C[t=this.table]??(C[t]=[])).push(...r),{data:this.wantSingle?r[0]:r,error:null,status:201}}if(this.mode==="update"){const s=Se(this.table).filter(r=>this.filters.every(i=>i(r)));for(const r of s)Object.assign(r,this.payload);return{data:s,error:null,status:200}}let n=Se(this.table).filter(s=>this.filters.every(r=>r(s)));if(this.orderBy){const{col:s,asc:r}=this.orderBy;n=[...n].sort((i,l)=>(i[s]<l[s]?-1:i[s]>l[s]?1:0)*(r?1:-1))}this.limitN!==null&&(n=n.slice(0,this.limitN));const a=n.map(s=>dt(s,this.selectCols));return this.wantSingle?a.length===1?{data:a[0],error:null,status:200}:a.length===0&&this.wantMaybe?{data:null,error:null,status:200}:{data:null,error:{message:`single() saw ${a.length} rows`},status:406}:{data:a,error:null,status:200}}catch(n){return{data:null,error:{message:String(n.message)},status:500}}}then(t,n){return Promise.resolve(this.run()).then(t,n)}}const J="tudent-demo-signed-in";function ct(){return{id:f(900),email:"amaya.demo@example.com",user_metadata:{full_name:"Amaya (Demo Student)"}}}function de(){return sessionStorage.getItem(J)==="1"?{access_token:"demo-token",user:ct()}:null}const ut={async getSession(){return{data:{session:de()},error:null}},async getUser(){var e;return{data:{user:((e=de())==null?void 0:e.user)??null},error:null}},onAuthStateChange(e){return{data:{subscription:{unsubscribe(){}}}}},async signInWithOAuth(e){var n;sessionStorage.setItem(J,"1");const t=((n=e==null?void 0:e.options)==null?void 0:n.redirectTo)??`${location.origin}${location.pathname}#week`;return location.href=t,location.reload(),{data:{},error:null}},async signInWithPassword(){return sessionStorage.setItem(J,"1"),{data:{session:de()},error:null}},async signOut(){return sessionStorage.removeItem(J),{error:null}}};function mt(e,t){const n=(a=null)=>Promise.resolve({data:a,error:null,status:200});if(H())return Promise.resolve({data:null,error:{message:"Failed to fetch (demo offline)"},status:0});switch(e){case"record_event":case"report_client_error":return n();case"ensure_student_account":return n();case"record_attendance_mark":{const a=t;if(C.attendance_marks.some(r=>r.id===a.p_mark_id))return n(a.p_mark_id);let s=C.class_sessions.find(r=>r.batch_id===a.p_batch&&r.held_on===a.p_held_on);return s||(s={id:crypto.randomUUID(),tenant_id:_,batch_id:a.p_batch,held_on:a.p_held_on,coverage_note:"",completed_by:f(999)},C.class_sessions.push(s)),C.attendance_marks.push({id:a.p_mark_id,tenant_id:_,batch_id:a.p_batch,class_session_id:s.id,enrolment_id:a.p_enrolment,state:a.p_state,note:a.p_note??"",marked_by:f(999),marked_at:a.p_marked_at??ee(X()),created_at:ee(X())}),n(a.p_mark_id)}default:throw new Error(`demo client: no rpc fixture for "${e}"`)}}const ht=window.fetch.bind(window);window.fetch=(e,t)=>{var r;const a=(r=(typeof e=="string"?e:e instanceof URL?e.href:e.url).match(/functions\/v1\/([a-z-]+)/))==null?void 0:r[1];if(!a)return ht(e,t);if(H())return Promise.reject(new TypeError("Failed to fetch (demo offline)"));const s=(i,l={})=>Promise.resolve(new Response(JSON.stringify(l),{status:i,headers:{"Content-Type":"application/json"}}));if(a==="join-opened")return Promise.resolve(new Response(null,{status:204}));if(a==="bill")return s(200,{outcome:"ok"});if(a==="join"){const i=JSON.parse(String((t==null?void 0:t.body)??"{}")),l=C.batches.find(o=>o.id===Z);return i.action==="preview"?s(200,{batch_label:l.label,teacher_name:"Nimal Perera (Demo Teacher)",location:l.location}):i.action==="redeem"?(C.enrolments.some(o=>o.batch_id===Z&&o.id===f(299))||C.enrolments.push({id:f(299),tenant_id:_,batch_id:Z,student_id:f(900),display_name:"Amaya (Demo Student)",guardian_phone:"",teacher_reference:"",status:"active",started_at:ee(X()),ended_at:null,version:1}),s(200,{batch_label:l.label})):i.action==="create"||i.action==="rotate"?s(200,{code:"DEMO2GETHER",batch_label:l.label}):s(200,{})}return s(404,{})};function Ee(){const e=document.createElement("div");e.setAttribute("data-demo-ribbon",""),e.style.cssText="position:fixed;bottom:0;left:0;right:0;z-index:9999;display:flex;gap:10px;align-items:center;justify-content:center;background:#1a4059;color:#fff;font:12px/1.2 -apple-system,system-ui,sans-serif;padding:8px 12px calc(8px + env(safe-area-inset-bottom, 0px));";const t=(r,i)=>{const l=document.createElement("button");return l.textContent=r,l.style.cssText=`font:inherit;border:1px solid rgba(255,255,255,.4);background:${i?"#fff":"transparent"};color:${i?"#1a4059":"#fff"};border-radius:999px;padding:3px 10px;cursor:pointer;`,l},n=document.createElement("span");n.textContent="Demo. Seeded pretend data, nothing here is real.";const a=t(H()?"Back online":"Try offline",H());a.addEventListener("click",()=>{sessionStorage.setItem("tudent-demo-offline",H()?"0":"1"),location.reload()}),e.append(n,a),e.style.flexWrap="wrap",document.body.append(e);const s=()=>{document.body.style.paddingBottom=`${e.offsetHeight+8}px`};s(),new ResizeObserver(s).observe(e)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ee):Ee();function pt(e,t){return{auth:ut,rpc:mt,from:n=>new lt(n),functions:{invoke:async n=>({data:null,error:{message:"demo: use fetch path"}})}}}const ft="",vt="",v=pt(),qe=crypto.randomUUID();async function A(e,t){try{await v.rpc("report_client_error",{p_correlation_id:qe,p_app:"teacher",p_code:e.slice(0,64),p_message:t.slice(0,500)})}catch{}}window.addEventListener("error",e=>{A("window_error",String(e.message??"unknown"))});window.addEventListener("unhandledrejection",e=>{A("unhandled_rejection",String(e.reason??"unknown"))});async function _t(){const{data:e,error:t}=await v.from("tenants").select("id,name").limit(1);if(!t&&e){const a=e[0]??null;return a&&await ne("tenant",a),a}const n=await ae("tenant");return n?n.value:null}async function yt(e){var a;const{data:t}=await v.auth.getSession(),n=await fetch(`${ft}/functions/v1/join`,{method:"POST",headers:{"Content-Type":"application/json",apikey:vt,Authorization:`Bearer ${((a=t.session)==null?void 0:a.access_token)??""}`,"x-correlation-id":qe},body:JSON.stringify(e)});return{status:n.status,json:await n.json().catch(()=>({}))}}function le(e,t={}){v.rpc("record_event",{p_correlation_id:crypto.randomUUID(),p_event_type:e,p_props:t}).then(({error:n})=>{n&&A("telemetry",`${e}: ${n.message}`)})}const bt={batchId:"all",status:"active",query:"",sort:"name",desc:!1},ue=new Set(["withdrawn","transferred","completed"]);function Ce(e,t){const n=t.query.trim().toLowerCase(),a=e.filter(s=>!(t.batchId!=="all"&&s.batch_id!==t.batchId||t.status==="active"&&ue.has(s.status)||t.status==="ended"&&!ue.has(s.status)||n&&!`${s.display_name} ${s.teacher_reference} ${s.guardian_phone}`.toLowerCase().includes(n)));return a.sort((s,r)=>{let i=0;return t.sort==="name"?i=s.display_name.localeCompare(r.display_name):t.sort==="joined"?i=s.started_at.localeCompare(r.started_at):i=s.status.localeCompare(r.status),(t.desc?-i:i)||s.id.localeCompare(r.id)}),a}function pe(e){const t=e.trim().split(/\s+/).filter(Boolean);if(t.length===0)return"?";const n=t[0][0]??"",a=t.length>1?t[t.length-1][0]??"":"";return(n+a).toUpperCase()}function M(e){return new Date(e).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric",timeZone:"Asia/Colombo"})}function te(e){return ue.has(e)}function gt(e,t){const n=r=>`"${String(r).replaceAll('"','""')}"`,a=["Name","Class","Reference","Guardian phone","Status","Joined"],s=e.map(r=>[r.display_name,t(r.batch_id),r.teacher_reference,r.guardian_phone,r.status,r.started_at.slice(0,10)].map(n).join(","));return[a.map(n).join(","),...s].join(`
`)}async function Ne(){const e=await ae("roster"),{data:t,error:n}=await v.from("enrolments").select("id,tenant_id,batch_id,display_name,guardian_phone,teacher_reference,status,started_at,ended_at");if(n||t===null){if(e)return{rows:e.value,fromCache:!0,savedAt:e.savedAt};throw new Error((n==null?void 0:n.message)??"roster unavailable")}const a=t;return await ne("roster",a),{rows:a,fromCache:!1,savedAt:null}}async function wt(e,t){const{error:n}=await v.from("enrolments").update(t).eq("id",e);if(n)throw new Error(n.message)}async function $t(e){const{error:t}=await v.from("enrolments").update({status:"withdrawn",ended_at:new Date().toISOString()}).eq("id",e);if(t)throw new Error(t.message)}const De=(e,t)=>`roll:${e}:${t}`;function xe(e,t){if(e.error)throw new Error(`${t}: ${e.error.message}`);if(e.data===null)throw new Error(`${t}: no data`);return e.data}async function kt(e,t){return(await Be()).filter(a=>a.kind==="attendance_mark"&&a.payload.held_on===t&&a.payload.batch_id===e)}async function St(e,t){const n=await kt(e,t),a=n.filter(i=>i.status==="pending").length,s=n.filter(i=>i.status==="failed").map(i=>({enrolmentId:String(i.payload.enrolment_id??""),detail:i.lastError})),r=await ae(De(e,t));try{const i=xe(await v.from("enrolments").select("id,display_name,started_at,ended_at").eq("batch_id",e),"roll enrolments"),l=await v.from("class_sessions").select("id").eq("batch_id",e).eq("held_on",t).maybeSingle();if(l.error)throw new Error(`roll session: ${l.error.message}`);const o=l.data?xe(await v.from("attendance_current").select("enrolment_id,state,note").eq("class_session_id",l.data.id),"roll marks"):[],h=new Map(o.map(d=>[d.enrolment_id,d])),c=i.filter(d=>ze(d,t)).map(d=>{var u,p;return{enrolment_id:d.id,display_name:d.display_name,marked:((u=h.get(d.id))==null?void 0:u.state)??null,note:((p=h.get(d.id))==null?void 0:p.note)??""}}).sort(Et);return await ne(De(e,t),c),{rows:Ie(c,n),fromCache:!1,savedAt:null,pendingCount:a,failed:s}}catch(i){if(!r)throw i;return{rows:Ie(r.value,n),fromCache:!0,savedAt:r.savedAt,pendingCount:a,failed:s}}}const Et=(e,t)=>e.display_name.localeCompare(t.display_name)||e.enrolment_id.localeCompare(t.enrolment_id);function Ie(e,t){const n=new Map;for(const a of t){if(a.status==="failed")continue;const s=a.payload;s.enrolment_id&&s.state&&n.set(s.enrolment_id,s.state)}return n.size===0?e:e.map(a=>n.has(a.enrolment_id)?{...a,marked:n.get(a.enrolment_id)}:a)}async function Ct(e){await tt({lane:e.enrolmentId,kind:"attendance_mark",idempotencyKey:crypto.randomUUID(),payload:{tenant_id:e.tenantId,batch_id:e.batchId,held_on:e.heldOn,enrolment_id:e.enrolmentId,state:e.state,note:e.note??"",marked_at:new Date().toISOString()}})}async function Dt(e){const t=e.payload;try{const{error:n}=await v.rpc("record_attendance_mark",{p_mark_id:e.idempotencyKey,p_tenant:t.tenant_id,p_batch:t.batch_id,p_held_on:t.held_on,p_enrolment:t.enrolment_id,p_state:t.state,p_note:t.note??"",p_marked_at:t.marked_at??null});if(!n)return{result:"ok"};const a=n.status,s=n.code??"";return typeof a=="number"&&a>=400||/^[0-9A-Z]{5}$/.test(s)?{result:"rejected",detail:`${s||a}: ${n.message}`}:{result:"unavailable",detail:n.message}}catch(n){return{result:"unavailable",detail:String(n)}}}async function Te(){const e=await nt(Dt);e.delivered>0&&le("offline_sync_succeeded",{items:e.delivered});for(const t of e.failed)le("offline_sync_failed",{reason:"rejected"});return e.heldBack>0&&e.delivered===0&&e.failed.length===0&&le("offline_sync_failed",{reason:"unavailable"}),e}async function xt(e){const t=await v.from("attendance_marks").select("state,note,marked_at,class_sessions(held_on)").eq("enrolment_id",e).order("marked_at",{ascending:!1});if(t.error)throw new Error(t.error.message);return(t.data??[]).map(n=>{const a=n.class_sessions;return{state:n.state,note:n.note??"",marked_at:n.marked_at,held_on:(a==null?void 0:a.held_on)??""}})}async function It(){const{data:e,error:t}=await v.from("fee_events").select("id,enrolment_id,kind,amount_cents,effective_on,method,reference,note,reverses_id,recorded_at").order("effective_on",{ascending:!1}).order("recorded_at",{ascending:!1});if(t)throw new Error(t.message);return e??[]}async function Ae(e){if(!Number.isInteger(e.amountCents))throw new Error("Amounts are whole cents.");const{error:t}=await v.from("fee_events").insert({id:crypto.randomUUID(),tenant_id:e.tenantId,enrolment_id:e.enrolmentId,kind:e.kind,amount_cents:e.amountCents,currency:"LKR",effective_on:e.effectiveOn,method:e.method??null,reference:e.reference??"",note:e.note??"",reverses_id:e.reversesId??null,recorded_by:e.recordedBy});if(t)throw new Error(me(t.message))}function me(e){return/fetch|network|Failed to fetch|NetworkError/i.test(e)?"You are offline, so this has NOT been recorded. Payments need a connection, because a receipt should never be a promise the ledger has not accepted yet. Nothing was saved; record it again when you have signal.":e.includes("fee_before_enrolment")?"That date is before this student joined. Check the date.":e.includes("reversal_must_match_original")?"A reversal has to undo the whole payment. For part of it, record an adjustment instead.":e.includes("cannot_reverse_a_reversal")?"That is already a reversal. To put the money back, record a new payment.":e.includes("fee_events_one_reversal_per_event")?"That payment has already been reversed.":e.includes("duplicate key")?"That was already recorded. Nothing was charged twice.":e.includes("violates check constraint")?"Check the amount and the method. A payment needs both, and cannot be zero.":e}function Tt(e){return{kind:"reversal",amountCents:-e.amount_cents,reversesId:e.id}}const y=document.getElementById("app"),Oe=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];let x=null;function m(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function j(){return new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Colombo"}).format(new Date)}"serviceWorker"in navigator&&navigator.serviceWorker.register("./sw.js");function K(){const e=location.hash.slice(1)||"batches";(async()=>{const{data:t}=await v.auth.getSession();if(!t.session)return At();if(x===null&&(x=await _t()),x===null)return jt();if(e==="batches")return Lt();if(e==="roster")return Re();if(e==="fees")return he();if(e==="new")return qt();const n=e.match(/^batch\/([0-9a-f-]+)\/roll\/(\d{4}-\d{2}-\d{2})$/);if(n)return Mt(n[1],n[2]);const a=e.match(/^batch\/([0-9a-f-]+)(\/preview)?$/);if(a)return a[2]?Ot(a[1]):Q(a[1]);location.hash="batches"})().catch(t=>{console.error("[route]",e,t),A("route_error",String(t)),y.innerHTML=`<div class="page"><p class="error">Something went wrong. Pull down is disabled, so use this instead:</p>
      <button class="btn" onclick="location.reload()">Reload</button></div>`})}window.addEventListener("hashchange",K);function B(e,t,n){y.innerHTML=`
    <header class="topbar">
      ${n!==void 0?`<button class="back" data-nav="${n}">Back</button>`:""}
      <h1>${m(e)}</h1>
    </header>
    <main class="page">${t}</main>`,y.querySelectorAll("[data-nav]").forEach(a=>a.addEventListener("click",()=>{location.hash=a.dataset.nav}))}function At(){var t;y.innerHTML=`
    <div class="book-scene" data-state="settled">
      <div class="book">
        <div class="book-page">
          <span class="page-wordmark">Tudent</span>
          <h1 class="lede">Teach with Tudent</h1>
          <p class="hint">Run your classes without the admin taking over.</p>
          <div style="margin-top:auto"></div>
          <button class="btn full" id="google-btn" style="gap:10px;background:#fff;border-color:#dadce0;min-height:48px">
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92a8.78 8.78 0 0 0 2.68-6.62z"/><path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.97 10.72a5.41 5.41 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3-2.33z"/><path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.59A9 9 0 0 0 .96 4.95l3 2.33C4.68 5.16 6.66 3.58 9 3.58z"/></svg>
            <span>Continue with Google</span>
          </button>
          <p class="hint signin-support">Your first sign-in creates your account, no new password needed.</p>
          <p class="notice" id="auth-status" role="status" aria-live="polite"></p>
          <p class="error" id="auth-error" hidden></p>
          
        </div>
      </div>
    </div>`;let e=!1;document.getElementById("google-btn").addEventListener("click",()=>{e||(e=!0,document.getElementById("auth-status").textContent="Opening Google...",v.auth.signInWithOAuth({provider:"google",options:{redirectTo:`${location.origin}${location.pathname}`}}).then(({error:n})=>{if(n){const a=document.getElementById("auth-error");a.hidden=!1,a.textContent="Google sign-in did not finish.",document.getElementById("auth-status").textContent=""}}).finally(()=>{e=!1}))}),(t=document.getElementById("local-rail"))==null||t.addEventListener("submit",n=>{n.preventDefault();const a=new FormData(n.target);v.auth.signInWithPassword({email:String(a.get("email")),password:String(a.get("password"))}).then(({error:s})=>{if(s){const r=document.getElementById("auth-error");r.hidden=!1,r.textContent="That did not work. Check the email and password."}else x=null,K()})})}function jt(){B("Batch",`
    <p class="lede">Almost there</p>
    <p class="hint">This account is not linked to a teaching account yet. Ask Business Booster to set that up, then sign in again.</p>
    <button class="btn" id="out">Sign out</button>`),document.getElementById("out").addEventListener("click",()=>{v.auth.signOut().then(()=>{x=null,K()})})}async function Lt(){const[{data:e},{data:t}]=await Promise.all([v.from("batches").select("id,label,exam_year,location,mode,archived_at,tenant_id").is("archived_at",null).order("created_at"),v.from("batch_schedules").select("*")]),n=e??[],a=j(),s=Le((t??[]).map(o=>({id:String(o.id),batchId:String(o.batch_id),weekday:Number(o.weekday),startTime:String(o.start_time),durationMinutes:Number(o.duration_minutes),location:String(o.location),effectiveFrom:String(o.effective_from),effectiveUntil:o.effective_until===null?null:String(o.effective_until)})),[],a,7).sort((o,h)=>o.date===h.date?o.startTime.localeCompare(h.startTime):o.date.localeCompare(h.date)),r=o=>{var h;return((h=n.find(c=>c.id===o))==null?void 0:h.label)??""},i=s.filter(o=>o.date===a&&r(o.batchId)),l=s.find(o=>o.date!==a&&r(o.batchId));B(x.name,`
    ${i.length>0?`
      <p class="sec">Today</p>
      <div class="card primary"><div class="list">
        ${i.map(o=>`
          <div class="row">
            <div class="grow">
              <div class="strong">${m(r(o.batchId))}</div>
              <div class="hint">${m(W(o.startTime))} · ${m(o.location)}</div>
            </div>
            <button class="btn primary" data-nav="batch/${o.batchId}/roll/${o.date}">Take the roll</button>
          </div>`).join("")}
      </div></div>`:l?`
      <p class="hint">No class today. Next: ${m(r(l.batchId))}, ${m(G(l.date))} at ${m(W(l.startTime))}.</p>`:""}

    <p class="lede">Your classes</p>
    ${n.length===0?'<p class="hint">No classes yet. Set up your first one and share the join link with your students. It takes about two minutes.</p>':`<div class="card"><div class="list">${n.map(o=>`
          <div class="row">
            <div class="grow">
              <div class="strong">${m(o.label)}</div>
              <div class="hint">${m(o.location)}${o.exam_year?` · ${o.exam_year}`:""}</div>
            </div>
            <button class="btn quiet" data-nav="batch/${o.id}">Open</button>
          </div>`).join("")}</div></div>`}
    <div class="btn-row">
      <button class="btn primary" data-nav="new">Set up a class</button>
      <button class="btn" data-nav="roster">Students</button>
      <button class="btn" data-nav="fees">Fees</button>
    </div>
    <button class="btn quiet" id="out">Sign out</button>`),y.querySelectorAll("[data-nav]").forEach(o=>o.addEventListener("click",()=>{location.hash=o.dataset.nav})),document.getElementById("out").addEventListener("click",()=>{v.auth.signOut().then(()=>{x=null,K()})})}let g={...bt};async function Re(){Me();const[e,t]=await Promise.all([Ne(),v.from("batches").select("id,label").is("archived_at",null).order("created_at")]),n=e.rows,a=t.data??[],s=c=>{var d;return((d=a.find(u=>u.id===c))==null?void 0:d.label)??"Class"},r=Ce(n,g),i=g.sort+(g.desc?":d":""),l=(c,d)=>`<button data-sort="${c}">${d}${g.sort===c?g.desc?" ↓":" ↑":""}</button>`;B("Students",`
    ${e.fromCache?`
      <div class="card">
        <div class="strong">Working from this phone</div>
        <p class="hint">You are offline, so this is your class list as it was saved here${e.savedAt?` on ${m(new Date(e.savedAt).toLocaleString("en-GB",{timeZone:"Asia/Colombo",weekday:"short",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}))}`:""}. Changes need a connection.</p>
      </div>`:""}
    <div class="card roster-pane">
      <div class="toolbar">
        <label class="grow-2">Search
          <input id="r-q" value="${m(g.query)}" placeholder="Name, reference or phone"
                 autocapitalize="off" autocorrect="off" spellcheck="false" />
        </label>
        <label>Class
          <select id="r-batch">
            <option value="all">All classes</option>
            ${a.map(c=>`<option value="${c.id}" ${g.batchId===c.id?"selected":""}>${m(c.label)}</option>`).join("")}
          </select>
        </label>
        <label>Status
          <select id="r-status">
            ${[["active","On the roll"],["ended","Left"],["all","Everyone"]].map(([c,d])=>`<option value="${c}" ${g.status===c?"selected":""}>${d}</option>`).join("")}
          </select>
        </label>
        <label class="phone-only">Order
          <select id="r-sort">
            ${[["name","Name A to Z"],["name:d","Name Z to A"],["joined","Joined, oldest first"],["joined:d","Joined, newest first"],["status","Status"]].map(([c,d])=>`<option value="${c}" ${i===c?"selected":""}>${d}</option>`).join("")}
          </select>
        </label>
      </div>
      <p class="count-line" id="r-count">${r.length} of ${n.length} ${n.length===1?"student":"students"}</p>
    </div>

    ${r.length===0?`
      <div class="card"><p class="hint empty">${n.length===0?"Nobody has joined yet. Share a class link and they will appear here as they join.":"No students match this search. Clear it to see everyone."}</p></div>`:`
      <div class="card roster-pane">
        <div class="list roster-list">
          ${r.map(c=>`
            <button class="roster-row" data-open="${c.id}">
              <span class="roster-av" aria-hidden="true">${m(pe(c.display_name))}</span>
              <span class="grow">
                <span class="roster-name">${m(c.display_name||"Unnamed")}</span>
                ${g.batchId==="all"?`<span class="roster-meta">${m(s(c.batch_id))}</span>`:""}
                <span class="roster-sub">joined ${M(c.started_at)}</span>
              </span>
              <span class="status-tag ${te(c.status)?"is-ended":"is-active"}">${m(c.status)}</span>
            </button>`).join("")}
        </div>

        <table class="roster-table">
          <thead><tr>
            <th>${l("name","Name")}</th>
            <th>Class</th>
            <th>Reference</th>
            <th>Guardian phone</th>
            <th>${l("joined","Joined")}</th>
            <th>${l("status","Status")}</th>
          </tr></thead>
          <tbody>
            ${r.map(c=>`
              <tr data-open="${c.id}">
                <td><strong>${m(c.display_name||"Unnamed")}</strong></td>
                <td>${m(s(c.batch_id))}</td>
                <td>${m(c.teacher_reference||"-")}</td>
                <td class="num">${m(c.guardian_phone||"-")}</td>
                <td class="num">${M(c.started_at)}</td>
                <td><span class="status-tag ${te(c.status)?"is-ended":"is-active"}">${m(c.status)}</span></td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div>`}

    <div class="btn-row">
      <button class="btn" id="r-export" ${r.length===0?"disabled":""}>Export this list</button>
    </div>
    <div class="card" id="r-detail" hidden></div>`,"batches");const o=()=>{Re()},h=document.getElementById("r-q");h.addEventListener("input",()=>{g={...g,query:h.value};const c=Ce(n,g);document.getElementById("r-count").textContent=`${c.length} of ${n.length} ${n.length===1?"student":"students"}`,clearTimeout(h._t),h._t=window.setTimeout(o,250)}),document.getElementById("r-batch").addEventListener("change",c=>{g={...g,batchId:c.target.value},o()}),document.getElementById("r-status").addEventListener("change",c=>{g={...g,status:c.target.value},o()}),document.getElementById("r-sort").addEventListener("change",c=>{const[d,u]=c.target.value.split(":");g={...g,sort:d,desc:u==="d"},o()}),y.querySelectorAll("[data-sort]").forEach(c=>c.addEventListener("click",()=>{const d=c.dataset.sort;g={...g,sort:d,desc:g.sort===d?!g.desc:!1},o()})),y.querySelectorAll("[data-open]").forEach(c=>c.addEventListener("click",()=>Bt(n.find(d=>d.id===c.dataset.open),s,o))),document.getElementById("r-export").addEventListener("click",()=>{const c=gt(r,s),d=URL.createObjectURL(new Blob([c],{type:"text/csv"})),u=document.createElement("a");u.href=d,u.download=`students-${new Date().toISOString().slice(0,10)}.csv`,u.click(),URL.revokeObjectURL(d)})}function Me(){const e=document.getElementById("r-detail");e&&(e.hidden=!0),document.body.classList.remove("detail-open")}function Bt(e,t,n){var s;const a=document.getElementById("r-detail");a.hidden=!1,document.body.classList.add("detail-open"),a.innerHTML=`
    <div class="strong">${m(e.display_name||"Unnamed")}</div>
    <p class="hint">${m(t(e.batch_id))} · joined ${M(e.started_at)} · ${m(e.status)}</p>
    <form id="r-form">
      <label>Name in your class list
        <input name="display_name" value="${m(e.display_name)}" />
      </label>
      <label>Your reference
        <input name="teacher_reference" value="${m(e.teacher_reference)}" placeholder="Optional" />
      </label>
      <label>Guardian phone
        <input name="guardian_phone" value="${m(e.guardian_phone)}" inputmode="tel" />
      </label>
      <button class="btn primary full" type="submit">Save</button>
      <p class="notice" id="r-saved" hidden>Saved.</p>
      <p class="error" id="r-err" hidden></p>
    </form>
    <div id="r-history" class="history-block"><p class="hint">Loading attendance…</p></div>
    ${te(e.status)?"":'<button class="btn danger-quiet" id="r-withdraw">Remove from the class</button>'}
    <button class="btn quiet" id="r-close">Close</button>`,Pt(e.id,document.getElementById("r-history")).catch(r=>{document.getElementById("r-history").innerHTML='<p class="hint">Attendance could not be loaded just now.</p>',A("attendance_history_failed",String(r))}),a.scrollIntoView({block:"start"}),document.getElementById("r-form").addEventListener("submit",r=>{r.preventDefault();const i=new FormData(r.target);wt(e.id,{display_name:String(i.get("display_name")).trim(),teacher_reference:String(i.get("teacher_reference")).trim(),guardian_phone:String(i.get("guardian_phone")).trim()}).then(()=>{document.getElementById("r-saved").hidden=!1,n()}).catch(l=>{A("roster_save",String(l));const o=document.getElementById("r-err");o.hidden=!1,o.textContent="Could not save that. Try again."})}),(s=document.getElementById("r-withdraw"))==null||s.addEventListener("click",()=>{$t(e.id).then(n).catch(r=>{A("roster_withdraw",String(r))})}),document.getElementById("r-close").addEventListener("click",Me)}function qt(){const e=new Date().getFullYear();B("New class",`
    <form id="nb">
      <div class="card">
        <label>What do your students call this class?
          <input name="label" placeholder="2027 Saturday Chemistry" enterkeyhint="next" required />
        </label>
        <label>Exam year
          <select name="exam_year">${[e,e+1,e+2].map(t=>`<option>${t}</option>`).join("")}</select>
        </label>
        <label>Where does it run?
          <input name="location" placeholder="Panadura" enterkeyhint="next" required />
        </label>
        <label>In person or online?
          <select name="mode">
            <option value="in_person">In person</option>
            <option value="online">Online</option>
            <option value="both">Both</option>
          </select>
        </label>
        <div class="field-pair">
          <label>Day
            <select name="weekday">${Oe.map((t,n)=>`<option value="${n}" ${n===6?"selected":""}>${t}</option>`).join("")}</select>
          </label>
          <label>Starts at
            <input name="start_time" type="time" value="15:30" required />
          </label>
        </div>
        <label>How long is the class?
          <select name="duration">
            <option value="60">1 hour</option>
            <option value="90">1 hour 30</option>
            <option value="120" selected>2 hours</option>
            <option value="180">3 hours</option>
          </select>
        </label>
      </div>
      <button class="btn primary full" type="submit">Create class and get the join link</button>
      <p class="error" id="nb-err" hidden></p>
    </form>`,"batches"),document.getElementById("nb").addEventListener("submit",t=>{t.preventDefault();const n=new FormData(t.target),a=t.target.querySelector("button[type=submit]");a.disabled=!0,(async()=>{const{data:s,error:r}=await v.from("batches").insert({tenant_id:x.id,label:String(n.get("label")).trim(),exam_year:Number(n.get("exam_year")),location:String(n.get("location")).trim(),mode:String(n.get("mode"))}).select("id").single();if(r||!s)throw new Error((r==null?void 0:r.message)??"batch insert failed");const{error:i}=await v.from("batch_schedules").insert({tenant_id:x.id,batch_id:s.id,weekday:Number(n.get("weekday")),start_time:String(n.get("start_time")),duration_minutes:Number(n.get("duration")),location:String(n.get("location")).trim(),effective_from:j()});if(i)throw new Error(i.message);location.hash=`batch/${s.id}`})().catch(s=>{a.disabled=!1,A("new_batch",String(s));const r=document.getElementById("nb-err");r.hidden=!1,r.textContent="Could not create the class. Try again."})})}async function Pe(e){const[t,n,a]=await Promise.all([v.from("batches").select("*").eq("id",e).single(),v.from("batch_schedules").select("*").eq("batch_id",e),v.from("schedule_exceptions").select("*").eq("batch_id",e)]),s=t.data,r=n.data??[],i=a.data??[],l=Le(r.map(o=>({id:o.id,batchId:o.batch_id,weekday:o.weekday,startTime:o.start_time,durationMinutes:o.duration_minutes,location:o.location,effectiveFrom:o.effective_from,effectiveUntil:o.effective_until})),i.map(o=>({id:o.id,batchId:o.batch_id,kind:o.kind,originalDate:o.original_date,newStart:o.new_start,newDurationMinutes:o.new_duration_minutes,newLocation:o.new_location,note:o.note})),j(),14);return{batch:s,schedules:r,exceptions:i,occurrences:l}}function Nt(e){const t=e.status==="moved"?`<span class="tag moved">Moved${e.movedFromDate?` from ${G(e.movedFromDate)}`:""}</span>`:e.status==="extra"?'<span class="tag extra">Extra class</span>':"";return`<div class="strong">${G(e.date)} · ${W(e.startTime)}</div>
          <div class="hint">${m(e.location)}${t?" ":""}${t}</div>`}async function Q(e){var c;const{batch:t,schedules:n,occurrences:a}=await Pe(e),{data:s}=await v.auth.getUser(),r=((c=s.user)==null?void 0:c.id)??"",i=n[0];B(t.label,`
    <div class="card">
      <div class="row">
        <div class="grow">
          <div class="strong">${i?`${Oe[i.weekday]}s · ${W(i.start_time.slice(0,5))}`:"No weekly time set"}</div>
          <div class="hint">${m(t.location)}</div>
        </div>
        <button class="btn quiet" data-nav="batch/${e}/preview">Student preview</button>
      </div>
    </div>

    
    <div class="btn-row section-nav" role="navigation" aria-label="Sections">
      <button class="btn quiet" data-jump="sec-roll">Roll</button>
      <button class="btn quiet" data-jump="sec-after">After class</button>
      <button class="btn quiet" data-jump="sec-invite">Invite</button>
      <button class="btn quiet" data-jump="sec-sched">Schedule</button>
    </div>

    <p class="sec" id="sec-roll">Take the roll</p>
    <div class="card primary">
      <p class="hint">Everyone is marked present. Open this and tap only the students who are not here.</p>
      <div class="btn-row">
        ${a.slice(0,2).map(d=>`
          <button class="btn" data-nav="batch/${e}/roll/${d.date}">${m(Rt(d.date))}</button>`).join("")||'<p class="hint">No classes scheduled to take a roll for.</p>'}
      </div>
    </div>

    <p class="sec" id="sec-after">After class</p>
    <div class="card" id="complete-card"></div>

    <p class="sec" id="sec-invite">Invite students</p>
    <div class="card" id="invite">
      <p class="hint">One link for the class WhatsApp group. Anyone with it can join, so treat it like a key. You can replace it at any time.</p>
      <div class="btn-row">
        <button class="btn primary" id="share">Share to WhatsApp</button>
        <button class="btn" id="rotate">New link</button>
      </div>
      <p class="notice" id="invite-note" hidden></p>
      <p class="code-display" id="code-line" hidden></p>
    </div>

    <p class="sec" id="sec-sched">Next two weeks</p>
    <div class="card"><div class="list" id="occ">
      ${a.length===0?'<p class="hint">No classes in the next two weeks.</p>':a.map((d,u)=>`
        <div>
          <div class="row">
            <div class="grow">${Nt(d)}</div>
            ${d.status==="scheduled"?`<button class="btn quiet" data-occ="${u}">Change</button>`:""}
          </div>
          <div class="btn-row" data-occ-actions="${u}" hidden>
            <button class="btn danger-quiet" data-cancel="${d.date}">Cancel this class</button>
            <button class="btn quiet" data-move="${d.date}|${d.startTime}">Move it</button>
          </div>
          <form class="btn-row" data-move-form="${d.date}" hidden>
            <input name="date" type="date" value="${d.date}" required />
            <input name="time" type="time" value="${d.startTime}" required />
            <button class="btn primary" type="submit">Save</button>
          </form>
        </div>`).join("")}
    </div></div>

    <p class="sec">Add a one-off class</p>
    <form class="card" id="extra">
      <div class="field-pair">
        <label>Date <input name="date" type="date" value="${j()}" required /></label>
        <label>Time <input name="time" type="time" value="${i?i.start_time.slice(0,5):"15:30"}" required /></label>
      </div>
      <button class="btn full" type="submit">Add extra class</button>
    </form>`,"batches"),y.querySelectorAll("[data-nav]").forEach(d=>d.addEventListener("click",()=>{location.hash=d.dataset.nav})),y.querySelectorAll("[data-jump]").forEach(d=>d.addEventListener("click",()=>{var u;(u=document.getElementById(d.dataset.jump))==null||u.scrollIntoView({behavior:"smooth",block:"start"})})),Fe(t,r);const l=document.getElementById("invite-note"),o=document.getElementById("code-line");async function h(d){const u=await yt({action:d,tenant_id:t.tenant_id,batch_id:e});return u.status!==200?(l.hidden=!1,l.textContent="Could not get a join link. Try again.",null):String(u.json.code)}document.getElementById("share").addEventListener("click",()=>{(async()=>{const d=await h("create");if(d===null)return;o.hidden=!1,o.textContent=d,l.hidden=!1,l.textContent="This code is also shown here in case WhatsApp does not open.";const u=`Join my ${t.label} class on Tudent.

1. Open https://businessboosterlk.github.io/tudent/
2. Sign in with Google
3. Enter this code: ${d}

The code is for this class group only. Please do not forward it.`;window.open(`https://wa.me/?text=${encodeURIComponent(u)}`,"_blank","noopener")})()}),document.getElementById("rotate").addEventListener("click",()=>{(async()=>{const d=await h("rotate");d!==null&&(o.hidden=!1,o.textContent=d,l.hidden=!1,l.textContent="The old link no longer works. Share this new one with the class.")})()}),y.querySelectorAll("[data-occ]").forEach(d=>d.addEventListener("click",()=>{const u=d.dataset.occ,p=y.querySelector(`[data-occ-actions="${u}"]`);p.hidden=!p.hidden})),y.querySelectorAll("[data-cancel]").forEach(d=>d.addEventListener("click",()=>{v.from("schedule_exceptions").insert({tenant_id:t.tenant_id,batch_id:e,kind:"cancelled",original_date:d.dataset.cancel,created_by:r}).then(()=>Q(e))})),y.querySelectorAll("[data-move]").forEach(d=>d.addEventListener("click",()=>{const[u]=d.dataset.move.split("|"),p=y.querySelector(`[data-move-form="${u}"]`);p.hidden=!1})),y.querySelectorAll("[data-move-form]").forEach(d=>d.addEventListener("submit",u=>{u.preventDefault();const p=new FormData(d);v.from("schedule_exceptions").insert({tenant_id:t.tenant_id,batch_id:e,kind:"moved",original_date:d.dataset.moveForm,new_start:`${p.get("date")}T${p.get("time")}:00+05:30`,new_location:t.location,created_by:r}).then(()=>Q(e))})),document.getElementById("extra").addEventListener("submit",d=>{d.preventDefault();const u=new FormData(d.target);v.from("schedule_exceptions").insert({tenant_id:t.tenant_id,batch_id:e,kind:"extra",new_start:`${u.get("date")}T${u.get("time")}:00+05:30`,new_location:t.location,created_by:r}).then(()=>Q(e))})}async function Fe(e,t){const n=document.getElementById("complete-card");if(!n)return;const a=j(),[{data:s},{data:r}]=await Promise.all([v.from("canonical_topics").select("id,name").order("sort_order"),v.from("class_sessions").select("id,held_on,topic_id, next_actions(id,title,estimated_minutes,due_at,result_visibility)").eq("batch_id",e.id).eq("held_on",a)]),i=r==null?void 0:r[0];if(i){const l=i.next_actions,o=Array.isArray(l)?l[0]:l;n.innerHTML=`
      <div class="strong">Today's class is recorded</div>
      ${o?`<p class="hint">Your students' next step: ${m(o.title)}, about ${o.estimated_minutes} minutes.</p>`:'<p class="hint">No next step was set for this class.</p>'}`;return}n.innerHTML=`
    <form id="cc">
      <label>What did today's class cover?
        <select name="topic">${(s??[]).map(l=>`<option value="${l.id}">${m(l.name)}</option>`).join("")}</select>
      </label>
      <label>One next step for your students
        <input name="title" placeholder="Review today's topic" enterkeyhint="done" />
      </label>
      <div class="field-pair">
        <label>About how long?
          <select name="minutes">
            <option value="2">2 minutes</option>
            <option value="8" selected>8 minutes</option>
            <option value="20">20 minutes</option>
          </select>
        </label>
        <label>Due
          <select name="due">
            <option value="1">Tomorrow evening</option>
            <option value="3" selected>In three days</option>
            <option value="7">Before next week</option>
          </select>
        </label>
      </div>
      <label>What you will see about their answers
        <select name="visibility">
          <option value="private_to_student" selected>Only that they finished, never the answers</option>
          <option value="visible_to_enrolment_teacher">Their answers to this task</option>
        </select>
      </label>
      <button class="btn primary full" type="submit">Record class and send the next step</button>
      <p class="error" id="cc-err" hidden></p>
    </form>`,document.getElementById("cc").addEventListener("submit",l=>{var p;l.preventDefault();const o=new FormData(l.target),h=String(o.get("topic")),c=((p=(s??[]).find(b=>b.id===h))==null?void 0:p.name)??"today’s topic",d=Number(o.get("due")),u=new Date(Date.now()+d*24*60*60*1e3);(async()=>{const{data:b,error:S}=await v.from("class_sessions").insert({tenant_id:e.tenant_id,batch_id:e.id,held_on:a,topic_id:h,completed_by:t}).select("id").single();if(S||!b)throw new Error((S==null?void 0:S.message)??"session failed");const{error:E}=await v.from("next_actions").insert({tenant_id:e.tenant_id,batch_id:e.id,class_session_id:b.id,title:String(o.get("title")).trim()||`Review ${c}`,topic_id:h,estimated_minutes:Number(o.get("minutes")),due_at:u.toISOString(),result_visibility:String(o.get("visibility")),created_by:t});if(E)throw new Error(E.message);Fe(e,t)})().catch(b=>{A("complete_class",String(b)),v.auth.getSession().then(({data:S})=>{if(!S.session){x=null,K();return}const E=document.getElementById("cc-err");E.hidden=!1,E.textContent="Could not record the class. Try again."})})})}async function Ot(e){const{batch:t,occurrences:n}=await Pe(e),a=Ze(n.map(s=>({occ:s,label:t.label})),[]);B("Student preview",`
    <p class="hint">This is exactly what a student in ${m(t.label)} sees on their timetable. Items from this class are marked confirmed by teacher.</p>
    <div class="card"><div class="list">
      ${a.length===0?'<p class="hint empty">Nothing coming up.</p>':a.map(s=>`
        <div${s.date===j()?' class="today"':""}>
          <div class="strong">${m(s.heading)}</div>
          <div class="hint">${m(s.detail)}</div>
          <div class="hint">${s.marker}${s.qualifier?` · ${s.qualifier}`:""}</div>
        </div>`).join("")}
    </div></div>`,`batch/${e}`),y.querySelectorAll("[data-nav]").forEach(s=>s.addEventListener("click",()=>{location.hash=s.dataset.nav}))}K();function Rt(e){return e===j()?"Today":M(`${e}T00:00:00Z`)}async function Mt(e,t){var d;try{await Te()}catch{}const n=await ae(`batch:${e}`);let a;const s=await v.from("batches").select("id,label,tenant_id").eq("id",e).maybeSingle();if(!s.error&&s.data)a=s.data,await ne(`batch:${e}`,a);else if(n)a=n.value;else throw new Error(((d=s.error)==null?void 0:d.message)??"batch unavailable offline");let r=await St(e,t),i=r.rows;const l=u=>new Date(u).toLocaleString("en-GB",{timeZone:"Asia/Colombo",weekday:"short",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}),o=()=>{const u=ge(i);B(a.label,`
      ${r.fromCache?`
        <div class="card">
          <div class="strong">Working from this phone</div>
          <p class="hint">You are offline, so this is the roll as it was saved here${r.savedAt?` on ${m(l(r.savedAt))}`:""}. Your taps are kept and will send when you have signal.</p>
        </div>`:""}

      ${r.pendingCount>0?`
        <div class="card">
          <p class="hint">${r.pendingCount} ${r.pendingCount===1?"tap has":"taps have"} not sent yet. They stay on this phone until they do.</p>
        </div>`:""}

      ${r.failed.length>0?`
        <div class="card">
          <p class="error">${r.failed.length} ${r.failed.length===1?"mark was":"marks were"} refused by the server and will not send. Nothing was lost: tap the student again, or tell Business Booster.</p>
        </div>`:""}

      <div class="card">
        <p class="roll-day">${m(t===j()?`Today · ${M(`${t}T00:00:00Z`)}`:M(`${t}T00:00:00Z`))}</p>
        <p class="roll-turnout" id="turnout">${m(we(u))}</p>
      </div>

      ${i.length===0?`
        <div class="card"><p class="hint empty">Nobody was on the roll for this class. Students who join later will appear on the classes held after they joined, never before.</p></div>`:`
        <div class="card">
          <div class="list roll-list">
            ${i.map(p=>`
              <button class="roll-row is-${p.marked??"unmarked"}" data-mark="${p.enrolment_id}">
                <span class="roster-av" aria-hidden="true">${m(pe(p.display_name))}</span>
                <span class="grow">
                  <span class="roster-name">${m(p.display_name)}</span>
                  ${p.note?`<span class="roster-sub">${m(p.note)}</span>`:""}
                </span>
                <span class="mark-tag is-${p.marked??"unmarked"}">${m(ce(p.marked))}</span>
              </button>`).join("")}
          </div>
        </div>
        <p class="hint">Tap a student to change them: present, absent, late, and back. Every tap is kept, so a correction never erases what you first recorded.</p>`}
    `,`batch/${e}`),y.querySelectorAll("[data-nav]").forEach(p=>p.addEventListener("click",()=>{location.hash=p.dataset.nav})),y.querySelectorAll("[data-mark]").forEach(p=>p.addEventListener("click",()=>{h(p.dataset.mark)}))};async function h(u){const p=i.find(E=>E.enrolment_id===u);if(!p)return;const b=Ge(p.marked),S=p.marked;p.marked=b,c(u,b);try{await Ct({tenantId:a.tenant_id,batchId:e,heldOn:t,enrolmentId:u,state:b})}catch(E){p.marked=S,c(u,S),A("attendance_queue_failed",String(E));const P=document.getElementById("turnout");P&&(P.textContent="That tap could not be saved on this phone. Try again.");return}Te().catch(()=>{})}function c(u,p){const b=y.querySelector(`[data-mark="${u}"]`);if(!b)return;const S=p??"unmarked";b.className=`roll-row is-${S}`;const E=b.querySelector(".mark-tag");E.className=`mark-tag is-${S}`,E.textContent=ce(p);const P=document.getElementById("turnout");P&&(P.textContent=we(ge(i)))}o()}async function Pt(e,t){const n=await xt(e);if(n.length===0){t.innerHTML='<p class="hint">Present at every class so far. Only absences and corrections are recorded.</p>';return}t.innerHTML=`
    <p class="hint">Every mark, newest first. Corrections are kept beside what they corrected.</p>
    <div class="list">
      ${n.map(a=>`
        <div class="row">
          <span class="grow">${m(a.held_on?M(`${a.held_on}T00:00:00Z`):"Unknown day")}
            ${a.note?`<span class="roster-sub">${m(a.note)}</span>`:""}</span>
          <span class="mark-tag is-${a.state}">${m(ce(a.state))}</span>
        </div>`).join("")}
    </div>`}let R=null;async function he(){var d;const{data:e}=await v.auth.getUser(),t=((d=e.user)==null?void 0:d.id)??"",[n,a]=await Promise.all([It(),Ne()]),s=a.rows,r=u=>{var p;return((p=s.find(b=>b.id===u))==null?void 0:p.display_name)??"Unknown student"},i=se(n),l=s.filter(u=>!te(u.status)),o=()=>{if(R)return h();B("Fees",`
      <div class="card">
        <p class="kpi-figure">${m(O(i.netCents))}</p>
        <p class="hint">Received, after reversals and adjustments. This is money that moved, not money that is owed.</p>
        <div class="kpi-split">
          <span>${m(O(i.paidCents))} paid</span>
          ${i.reversedCents?`<span class="is-negative">${m(O(i.reversedCents))} reversed</span>`:""}
          ${i.adjustedCents?`<span>${m(O(i.adjustedCents))} adjusted</span>`:""}
          <span>${i.eventCount} ${i.eventCount===1?"entry":"entries"}</span>
        </div>
      </div>

      <p class="sec">Received, by student</p>
      ${l.length===0?`
        <div class="card"><p class="hint empty">Nobody is on the roll yet. Students appear here once they join a class.</p></div>`:`
        <div class="card"><div class="list">
          ${l.map(u=>{const p=n.filter(S=>S.enrolment_id===u.id),b=se(p);return`
            <button class="roster-row" data-fee-student="${u.id}">
              <span class="roster-av" aria-hidden="true">${m(pe(u.display_name))}</span>
              <span class="grow">
                <span class="roster-name">${m(u.display_name)}</span>
                <span class="roster-sub">${p.length===0?"Nothing recorded":`${p.length} ${p.length===1?"entry":"entries"}`}</span>
              </span>
              <span class="money${b.netCents<0?" is-negative":""}">${m(O(b.netCents))}</span>
            </button>`}).join("")}
        </div></div>`}
    `,"batches"),c()};function h(){var ve,_e;const u=n.filter(k=>k.enrolment_id===R),p=se(u),b=Ye(u).reverse(),S=new Set(u.map(k=>k.reverses_id).filter(Boolean));B(r(R),`
      <div class="card">
        <p class="kpi-figure">${m(O(p.netCents))}</p>
        <p class="hint">Received from this student, after reversals and adjustments.</p>
      </div>

      <p class="sec">Record a movement</p>
      <form class="card" id="fee-form">
        <div class="field-pair">
          <label>Amount (LKR)
            <input name="rupees" type="number" min="1" step="0.01" inputmode="decimal" required />
          </label>
          <label>Date it moved
            <input name="effective_on" type="date" value="${j()}" required />
          </label>
        </div>
        <div class="field-pair">
          <label>Kind
            <select name="kind">
              <option value="payment">Payment</option>
              <option value="adjustment">Adjustment (discount or late fee)</option>
            </select>
          </label>
          <label>Method
            <select name="method">
              <option value="cash">Cash</option>
              <option value="bank_transfer">Bank transfer</option>
              <option value="card">Card</option>
              <option value="online">Online</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>
        <label>Reference
          <input name="reference" placeholder="Receipt or bank slip number" />
        </label>
        <p class="hint" id="adj-hint" hidden>An adjustment can go either way. Put a minus in front for a discount.</p>
        <button class="btn primary full" type="submit">Record it</button>
        <p class="error" id="fee-err" hidden></p>
      </form>

      <p class="sec">Everything recorded</p>
      ${b.length===0?`
        <div class="card"><p class="hint empty">Nothing recorded for this student yet.</p></div>`:`
        <div class="card"><div class="list">
          ${b.map(({event:k,runningCents:L})=>{const w=k,q=S.has(w.id);return`
            <div class="fee-line${w.kind==="reversal"?" is-reversal":""}">
              <div class="row">
                <span class="grow">
                  <span class="roster-name">${m(Ve(w.kind))}${q?" · later reversed":""}</span>
                  <span class="roster-sub">${m(M(`${w.effective_on}T00:00:00Z`))}${w.method?` · ${m(Je(w.method))}`:""}${w.reference?` · ${m(w.reference)}`:""}</span>
                </span>
                <span class="money${w.amount_cents<0?" is-negative":""}">${m(O(w.amount_cents))}</span>
              </div>
              <div class="row fee-foot">
                <span class="grow hint">Balance after this: ${m(O(L))}</span>
                ${w.kind==="payment"&&!q?`<button class="btn danger-quiet small" data-reverse="${w.id}">Reverse</button>`:""}
              </div>
            </div>`}).join("")}
        </div></div>
        <p class="hint">Nothing here can be edited or deleted. Reversing a payment adds an entry that undoes it, and both stay on the record.</p>`}
    `,"fees"),(ve=document.querySelector('[data-nav="fees"]'))==null||ve.addEventListener("click",()=>{R=null,o()}),(_e=y.querySelector(".back"))==null||_e.addEventListener("click",k=>{k.preventDefault(),R=null,o()});const E=y.querySelector("[name=kind]"),P=y.querySelector("[name=method]").closest("label"),Ue=document.getElementById("adj-hint"),fe=()=>{const k=E.value==="adjustment";P.hidden=k,Ue.hidden=!k,y.querySelector("[name=rupees]").min=k?"":"1"};E.addEventListener("change",fe),fe(),document.getElementById("fee-form").addEventListener("submit",k=>{k.preventDefault();const L=new FormData(k.target),w=document.getElementById("fee-err"),q=String(L.get("kind")),N=Math.round(Number(L.get("rupees"))*100);if(!Number.isFinite(N)||N===0){w.textContent="Enter an amount.",w.hidden=!1;return}Ae({tenantId:x.id,enrolmentId:R,kind:q,amountCents:N,effectiveOn:String(L.get("effective_on")),method:q==="adjustment"?null:String(L.get("method")),reference:String(L.get("reference")??""),recordedBy:t}).then(()=>he()).catch(ye=>{w.textContent=me(String(ye.message??ye)),w.hidden=!1})}),y.querySelectorAll("[data-reverse]").forEach(k=>k.addEventListener("click",()=>{const L=u.find(N=>N.id===k.dataset.reverse),w=Tt(L),q=document.getElementById("fee-err");Ae({tenantId:x.id,enrolmentId:R,kind:w.kind,amountCents:w.amountCents,effectiveOn:j(),reversesId:w.reversesId,note:"Reversed",recordedBy:t}).then(()=>he()).catch(N=>{q.textContent=me(String(N.message??N)),q.hidden=!1})}))}function c(){y.querySelectorAll("[data-nav]").forEach(u=>u.addEventListener("click",()=>{location.hash=u.dataset.nav})),y.querySelectorAll("[data-fee-student]").forEach(u=>u.addEventListener("click",()=>{R=u.dataset.feeStudent,o()}))}o()}
