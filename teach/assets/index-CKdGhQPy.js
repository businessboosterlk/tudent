(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();function He(e){return new Date(`${e}T12:00:00Z`)}function nt(e){return e.toISOString().slice(0,10)}function Ie(e,t){const n=He(e);return n.setUTCDate(n.getUTCDate()+t),nt(n)}function at(e){return e.slice(0,5)}function st(e,t){const n=new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).formatToParts(new Date(e)),a=s=>{var o;return((o=n.find(i=>i.type===s))==null?void 0:o.value)??"00"};return{date:`${a("year")}-${a("month")}-${a("day")}`,time:`${a("hour")}:${a("minute")}`}}function We(e,t,n,a,s="Asia/Colombo"){const o=Ie(n,a),i=[],l=new Set(t.filter(r=>r.kind!=="extra"&&r.originalDate!==null).map(r=>`${r.batchId}|${r.originalDate}`));for(const r of e)for(let f=n;f<o;f=Ie(f,1))He(f).getUTCDay()===r.weekday&&(f<r.effectiveFrom||r.effectiveUntil!==null&&f>r.effectiveUntil||l.has(`${r.batchId}|${f}`)||i.push({batchId:r.batchId,date:f,startTime:at(r.startTime),durationMinutes:r.durationMinutes,location:r.location,status:"scheduled"}));for(const r of t){if(r.newStart===null)continue;const{date:f,time:c}=st(r.newStart,s);f<n||f>=o||i.push({batchId:r.batchId,date:f,startTime:c,durationMinutes:r.newDurationMinutes??120,location:r.newLocation??"",status:r.kind==="moved"?"moved":"extra",...r.kind==="moved"&&r.originalDate!==null?{movedFromDate:r.originalDate}:{},...r.note?{note:r.note}:{}})}return i.sort((r,f)=>r.date.localeCompare(f.date)||r.startTime.localeCompare(f.startTime)||r.batchId.localeCompare(f.batchId)||r.status.localeCompare(f.status)),i}function ae(e){return new Date(`${e}T12:00:00Z`).toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short",timeZone:"UTC"})}function z(e){const[t=0,n=0]=e.split(":").map(Number),a=t>=12?"PM":"AM",s=t%12===0?12:t%12;return n===0?`${s} ${a}`:`${s}:${String(n).padStart(2,"0")} ${a}`}function ot(e,t){const n=[];for(const{occ:a,label:s}of e)n.push({heading:s,detail:`${ae(a.date)} · ${z(a.startTime)}${a.location?` · ${a.location}`:""}`,marker:"Confirmed by teacher",qualifier:a.status==="moved"?"Moved":a.status==="extra"?"Extra class":"",date:a.date,time:a.startTime});for(const a of t){const s=a.subjectLabel!==""&&a.title.toLowerCase().includes(a.subjectLabel.toLowerCase()),o=a.subjectLabel&&!s?` · ${a.subjectLabel}`:"";n.push({heading:a.title,detail:`${ae(a.date)} · ${z(a.time)}${o}`,marker:"Added by you",qualifier:a.kind==="deadline"?"Due":"",date:a.date,time:a.time})}return n.sort((a,s)=>a.date.localeCompare(s.date)||a.time.localeCompare(s.time)||a.heading.localeCompare(s.heading)),n}function je(e){const t={present:0,absent:0,late:0,total:e.length};for(const n of e)n.marked==="absent"?t.absent+=1:n.marked==="late"?t.late+=1:t.present+=1;return t}function Ae(e){if(e.total===0)return"Nobody on the roll for this class yet.";if(e.absent===0&&e.late===0)return`All ${e.total} present. Tap anyone who is not here.`;const t=[`${e.present} present`];return e.absent&&t.push(`${e.absent} absent`),e.late&&t.push(`${e.late} late`),`${t.join(" · ")} of ${e.total}.`}function it(e){return e===null||e==="present"?"absent":e==="absent"?"late":"present"}function ge(e){return e==="absent"?"Absent":e==="late"?"Late":"Present"}function rt(e,t){const n=a=>a.slice(0,10);return!(n(e.started_at)>t||e.ended_at&&n(e.ended_at)<t)}function U(e){const t=e<0?"-":"",n=Math.abs(e),a=Math.floor(n/100),s=String(n%100).padStart(2,"0"),o=String(a).replace(/\B(?=(\d{3})+(?!\d))/g,",");return`${t}LKR ${o}.${s}`}function fe(e){const t={netCents:0,paidCents:0,reversedCents:0,adjustedCents:0,eventCount:e.length};for(const n of e)t.netCents+=n.amount_cents,n.kind==="payment"?t.paidCents+=n.amount_cents:n.kind==="reversal"?t.reversedCents+=n.amount_cents:t.adjustedCents+=n.amount_cents;return t}function dt(e){const t=[...e].sort((a,s)=>a.effective_on.localeCompare(s.effective_on));let n=0;return t.map(a=>(n+=a.amount_cents,{runningCents:n,event:a}))}function lt(e){return e==="payment"?"Payment":e==="reversal"?"Reversed":"Adjustment"}function ct(e){return e?{cash:"Cash",bank_transfer:"Bank transfer",card:"Card",online:"Online",other:"Other"}[e]??e:""}const ut="batch-offline",mt=1;function ht(){return new Promise((e,t)=>{const n=indexedDB.open(ut,mt);n.onupgradeneeded=()=>{const a=n.result;a.objectStoreNames.contains("cache")||a.createObjectStore("cache",{keyPath:"key"}),a.objectStoreNames.contains("outbox")||a.createObjectStore("outbox",{keyPath:"id",autoIncrement:!0}).createIndex("by_status","status")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}function se(e,t,n){return ht().then(a=>new Promise((s,o)=>{const i=a.transaction(e,t),l=n(i.objectStore(e));l.onsuccess=()=>s(l.result),l.onerror=()=>o(l.error),i.oncomplete=()=>a.close()}))}async function he(e,t){await se("cache","readwrite",n=>n.put({key:e,value:t,savedAt:new Date().toISOString()}))}async function pe(e){return await se("cache","readonly",n=>n.get(e))??null}async function pt(e){await se("outbox","readwrite",t=>t.add({...e,status:"pending",attempts:0,lastError:"",createdAt:new Date().toISOString()}))}async function Ke(){return(await se("outbox","readonly",t=>t.getAll())).sort((t,n)=>(t.id??0)-(n.id??0))}async function ve(e){await se("outbox","readwrite",t=>t.put(e))}async function ft(e){const t=(await Ke()).filter(s=>s.status==="pending"),n=new Map;for(const s of t){const o=n.get(s.lane)??[];o.push(s),n.set(s.lane,o)}const a={delivered:0,failed:[],heldBack:0};return await Promise.all([...n.entries()].map(async([,s])=>{let o=!1;for(const i of s){if(o){a.heldBack+=1;continue}let l;try{l=await e(i)}catch(r){l={result:"unavailable",detail:String(r)}}i.attempts+=1,l.result==="ok"?(i.status="done",await ve(i),a.delivered+=1):l.result==="rejected"?(i.status="failed",i.lastError=l.detail??"rejected",await ve(i),a.failed.push({lane:i.lane,kind:i.kind,detail:i.lastError})):(i.lastError=l.detail??"unavailable",await ve(i),o=!0,a.heldBack+=1)}})),a}const L=864e5,ue=()=>new Date,me=e=>e.toISOString(),q=e=>new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Colombo"}).format(e),$=(e,t)=>`${q(new Date(Date.now()+e*L))}T${t}:00+05:30`,Te=new Date().getDay(),b="11111111-1111-4111-8111-111111111111",v=e=>`00000000-0000-4000-8000-${String(e).padStart(12,"0")}`,B=v(101),Be=v(102),de=v(103),G=new Map([["Amaya (Demo Student)",v(201)],["Bimsara (Demo Student)",v(202)],["Chatura (Demo Student)",v(203)],["Dilki (Demo Student)",v(204)]]),Y=v(201),re=v(301),_e=v(401),ne=v(402),vt=v(403),_t=v(501),Le=v(601),bt=v(602),A={tenants:[{id:b,name:"Nimal Perera (Demo Teacher)"}],batches:[{id:B,tenant_id:b,label:"2027 A/L Chemistry (Demo)",location:"Panadura",archived_at:null,created_at:$(-30,"10:00")},{id:Be,tenant_id:b,label:"2027 A/L Physics (Demo)",location:"Moratuwa",archived_at:null,created_at:$(-20,"10:00")},{id:de,tenant_id:b,label:"Revision Class (Demo)",location:"Panadura",archived_at:null,created_at:$(-5,"10:00")}],batch_schedules:[{id:v(111),tenant_id:b,batch_id:B,weekday:Te,start_time:"16:00",duration_minutes:120,location:"Panadura",effective_from:q(new Date(Date.now()-60*L)),effective_until:null,active:!0},{id:v(112),tenant_id:b,batch_id:Be,weekday:(Te+1)%7,start_time:"09:00",duration_minutes:90,location:"Moratuwa",effective_from:q(new Date(Date.now()-60*L)),effective_until:null,active:!0}],schedule_exceptions:[],enrolments:[...G.entries()].flatMap(([e,t],n)=>[{id:t,tenant_id:b,batch_id:B,student_id:v(900+n),display_name:e,guardian_phone:"07x xxx xxxx (demo)",teacher_reference:"",status:"active",started_at:$(n===3?-2:-28+n,"10:00"),ended_at:null,version:1}]),student_private_items:[{id:v(701),kind:"deadline",title:"History essay (your own)",subject_label:"History",starts_at:null,due_at:$(0,"21:00"),estimated_minutes:40,deleted_at:null},{id:v(702),kind:"external_class",title:"Kandy maths class (your own)",subject_label:"Maths",starts_at:$(2,"08:00"),due_at:null,estimated_minutes:90,deleted_at:null}],next_actions:[{id:_t,tenant_id:b,batch_id:B,title:"Finish the electrolysis worksheet",estimated_minutes:8,due_at:$(0,"20:00"),result_visibility:"teacher_sees_completion",topic_id:ne}],student_profiles:[{student_id:v(900),preferences:{minutes:8}}],canonical_topics:[{id:_e,name:"Organic chemistry",sort_order:1},{id:ne,name:"Electrolysis",sort_order:2},{id:vt,name:"Kinematics",sort_order:3}],topic_assertions:[{id:v(801),tenant_id:b,enrolment_id:Y,topic_id:ne,assertion_type:"teacher_observed",value:{},occurred_at:$(-3,"18:00"),supersedes:null},{id:v(804),tenant_id:b,enrolment_id:Y,topic_id:ne,assertion_type:"retrieval_success",value:{correct:4,total:5},occurred_at:$(-1,"20:00"),supersedes:null},{id:v(802),tenant_id:b,enrolment_id:Y,topic_id:_e,assertion_type:"student_self_assessment",value:{feeling:"shaky"},occurred_at:$(-2,"19:00"),supersedes:null},{id:v(803),tenant_id:b,enrolment_id:Y,topic_id:_e,assertion_type:"attended_instruction",value:{},occurred_at:$(-9,"18:00"),supersedes:null}],honours:[{kind:"topic_shown",subject:ne,earned_on:q(new Date(Date.now()-7*L)),tenant_id:b},{kind:"month_kept_up",subject:q(new Date(Date.now()-31*L)).slice(0,7),earned_on:q(new Date(Date.now()-21*L)),tenant_id:b},{kind:"came_back",subject:"",earned_on:q(new Date(Date.now()-14*L)),tenant_id:b}],class_sessions:[{id:re,tenant_id:b,batch_id:B,held_on:q(new Date(Date.now()-7*L)),coverage_note:"Electrolysis: Faraday laws worked examples",completed_by:v(999)}],attendance_marks:[{id:v(311),tenant_id:b,batch_id:B,class_session_id:re,enrolment_id:Y,state:"present",note:"",marked_by:v(999),marked_at:$(-7,"16:05"),created_at:$(-7,"16:05")},{id:v(312),tenant_id:b,batch_id:B,class_session_id:re,enrolment_id:G.get("Bimsara (Demo Student)"),state:"absent",note:"",marked_by:v(999),marked_at:$(-7,"16:05"),created_at:$(-7,"16:05")},{id:v(313),tenant_id:b,batch_id:B,class_session_id:re,enrolment_id:G.get("Bimsara (Demo Student)"),state:"present",note:"came in late, corrected",marked_by:v(999),marked_at:$(-7,"16:20"),created_at:$(-7,"16:20")}],fee_events:[{id:v(321),tenant_id:b,batch_id:B,enrolment_id:Y,kind:"payment",amount_cents:25e4,method:"cash",reference:"demo-0001",effective_on:q(new Date(Date.now()-6*L)),note:"",reverses_id:null,recorded_at:$(-6,"17:00")},{id:v(322),tenant_id:b,batch_id:B,enrolment_id:G.get("Chatura (Demo Student)"),kind:"payment",amount_cents:25e4,method:"transfer",reference:"demo-0002",effective_on:q(new Date(Date.now()-6*L)),note:"",reverses_id:null,recorded_at:$(-6,"17:05")},{id:v(323),tenant_id:b,batch_id:B,enrolment_id:G.get("Chatura (Demo Student)"),kind:"reversal",amount_cents:-25e4,method:"transfer",reference:"demo-0002",effective_on:q(new Date(Date.now()-5*L)),note:"recorded against the wrong student (demo)",reverses_id:v(322),recorded_at:$(-5,"09:00")},{id:v(324),tenant_id:b,batch_id:B,enrolment_id:G.get("Chatura (Demo Student)"),kind:"payment",amount_cents:25e4,method:"cash",reference:"demo-0003",effective_on:q(new Date(Date.now()-4*L)),note:"recorded again, correctly",reverses_id:null,recorded_at:$(-4,"17:00")}],prompts:[{id:Le,tenant_id:b,kind:"recall",active:!0}],prompt_versions:[{id:bt,prompt_id:Le,version:1,question:"In electrolysis of molten NaCl, what forms at the cathode?",answer_key:"Sodium metal. Na+ ions gain electrons (reduction) at the cathode."}],prompt_completions:[]};function yt(){const e=new Map;for(const t of[...A.attendance_marks].sort((n,a)=>n.marked_at===a.marked_at?String(n.id).localeCompare(String(a.id)):n.marked_at<a.marked_at?-1:1))e.set(`${t.class_session_id}|${t.enrolment_id}`,t);return[...e.values()]}const V=()=>sessionStorage.getItem("tudent-demo-offline")==="1";function qe(e){if(e==="attendance_current")return yt().filter(a=>!0);const t=A[e];if(!t)throw new Error(`demo client: no fixture table "${e}". Add it; do not let the demo invent an answer.`);const n=null;return n?t.filter(n):t}const gt={class_sessions:"class_session_id",enrolments:"enrolment_id",batches:"batch_id"};function wt(e,t){var a;const n={...e};for(const s of t.matchAll(/([a-z_]+)\(([a-z_,]+)\)/g)){const[,o,i]=s,l=gt[o],r=(a=A[o])==null?void 0:a.find(f=>f.id===e[l]);n[o]=r?Object.fromEntries(i.split(",").map(f=>[f,r[f]])):null}return n}class $t{constructor(t){this.table=t,this.filters=[],this.orderBy=null,this.limitN=null,this.selectCols="*",this.mode="select",this.payload=null,this.wantSingle=!1,this.wantMaybe=!1}select(t="*"){return this.selectCols=t,this}eq(t,n){return this.filters.push(a=>String(a[t])===String(n)),this}neq(t,n){return this.filters.push(a=>String(a[t])!==String(n)),this}is(t,n){return this.filters.push(a=>a[t]===n),this}in(t,n){const a=new Set(n.map(String));return this.filters.push(s=>a.has(String(s[t]))),this}gte(t,n){return this.filters.push(a=>a[t]>=n),this}lte(t,n){return this.filters.push(a=>a[t]<=n),this}gt(t,n){return this.filters.push(a=>a[t]>n),this}lt(t,n){return this.filters.push(a=>a[t]<n),this}order(t,n){return this.orderBy={col:t,asc:(n==null?void 0:n.ascending)!==!1},this}limit(t){return this.limitN=t,this}single(){return this.wantSingle=!0,this}maybeSingle(){return this.wantSingle=!0,this.wantMaybe=!0,this}insert(t){return this.mode="insert",this.payload=t,this}update(t){return this.mode="update",this.payload=t,this}run(){var t;if(V())return{data:null,error:{message:"Failed to fetch (demo offline)"},status:0};try{if(this.mode==="insert"){const o=(Array.isArray(this.payload)?this.payload:[this.payload]).map(l=>({id:crypto.randomUUID(),created_at:me(ue()),...l}));return(A[t=this.table]??(A[t]=[])).push(...o),{data:this.wantSingle?o[0]:o,error:null,status:201}}if(this.mode==="update"){const s=qe(this.table).filter(o=>this.filters.every(i=>i(o)));for(const o of s)Object.assign(o,this.payload);return{data:s,error:null,status:200}}let n=qe(this.table).filter(s=>this.filters.every(o=>o(s)));if(this.orderBy){const{col:s,asc:o}=this.orderBy;n=[...n].sort((i,l)=>(i[s]<l[s]?-1:i[s]>l[s]?1:0)*(o?1:-1))}this.limitN!==null&&(n=n.slice(0,this.limitN));const a=n.map(s=>wt(s,this.selectCols));return this.wantSingle?a.length===1?{data:a[0],error:null,status:200}:a.length===0&&this.wantMaybe?{data:null,error:null,status:200}:{data:null,error:{message:`single() saw ${a.length} rows`},status:406}:{data:a,error:null,status:200}}catch(n){return{data:null,error:{message:String(n.message)},status:500}}}then(t,n){return Promise.resolve(this.run()).then(t,n)}}const le="tudent-demo-signed-in";function kt(){return{id:v(900),email:"amaya.demo@example.com",user_metadata:{full_name:"Amaya (Demo Student)"}}}function be(){return sessionStorage.getItem(le)==="1"?{access_token:"demo-token",user:kt()}:null}const St={async getSession(){return{data:{session:be()},error:null}},async getUser(){var e;return{data:{user:((e=be())==null?void 0:e.user)??null},error:null}},onAuthStateChange(e){return{data:{subscription:{unsubscribe(){}}}}},async signInWithOAuth(e){var n;sessionStorage.setItem(le,"1");const t=((n=e==null?void 0:e.options)==null?void 0:n.redirectTo)??`${location.origin}${location.pathname}#week`;return location.href=t,location.reload(),{data:{},error:null}},async signInWithPassword(){return sessionStorage.setItem(le,"1"),{data:{session:be()},error:null}},async signOut(){return sessionStorage.removeItem(le),{error:null}}};function Et(e,t){const n=(a=null)=>Promise.resolve({data:a,error:null,status:200});if(V())return Promise.resolve({data:null,error:{message:"Failed to fetch (demo offline)"},status:0});switch(e){case"record_event":case"report_client_error":return n();case"ensure_student_account":return n();case"record_attendance_mark":{const a=t;if(A.attendance_marks.some(o=>o.id===a.p_mark_id))return n(a.p_mark_id);let s=A.class_sessions.find(o=>o.batch_id===a.p_batch&&o.held_on===a.p_held_on);return s||(s={id:crypto.randomUUID(),tenant_id:b,batch_id:a.p_batch,held_on:a.p_held_on,coverage_note:"",completed_by:v(999)},A.class_sessions.push(s)),A.attendance_marks.push({id:a.p_mark_id,tenant_id:b,batch_id:a.p_batch,class_session_id:s.id,enrolment_id:a.p_enrolment,state:a.p_state,note:a.p_note??"",marked_by:v(999),marked_at:a.p_marked_at??me(ue()),created_at:me(ue())}),n(a.p_mark_id)}default:throw new Error(`demo client: no rpc fixture for "${e}"`)}}const Ct=window.fetch.bind(window);window.fetch=(e,t)=>{var o;const a=(o=(typeof e=="string"?e:e instanceof URL?e.href:e.url).match(/functions\/v1\/([a-z-]+)/))==null?void 0:o[1];if(!a)return Ct(e,t);if(V())return Promise.reject(new TypeError("Failed to fetch (demo offline)"));const s=(i,l={})=>Promise.resolve(new Response(JSON.stringify(l),{status:i,headers:{"Content-Type":"application/json"}}));if(a==="join-opened")return Promise.resolve(new Response(null,{status:204}));if(a==="bill")return s(200,{outcome:"ok"});if(a==="join"){const i=JSON.parse(String((t==null?void 0:t.body)??"{}")),l=A.batches.find(r=>r.id===de);return i.action==="preview"?s(200,{batch_label:l.label,teacher_name:"Nimal Perera (Demo Teacher)",location:l.location}):i.action==="redeem"?(A.enrolments.some(r=>r.batch_id===de&&r.id===v(299))||A.enrolments.push({id:v(299),tenant_id:b,batch_id:de,student_id:v(900),display_name:"Amaya (Demo Student)",guardian_phone:"",teacher_reference:"",status:"active",started_at:me(ue()),ended_at:null,version:1}),s(200,{batch_label:l.label})):i.action==="create"||i.action==="rotate"?s(200,{code:"DEMO2GETHER",batch_label:l.label}):s(200,{})}return s(404,{})};function Ne(){const e=document.createElement("div");e.setAttribute("data-demo-ribbon",""),e.style.cssText="position:fixed;bottom:0;left:0;right:0;z-index:9999;display:flex;gap:10px;align-items:center;justify-content:center;background:#1a4059;color:#fff;font:12px/1.2 -apple-system,system-ui,sans-serif;padding:8px 12px calc(8px + env(safe-area-inset-bottom, 0px));";const t=(o,i)=>{const l=document.createElement("button");return l.textContent=o,l.style.cssText=`font:inherit;border:1px solid rgba(255,255,255,.4);background:${i?"#fff":"transparent"};color:${i?"#1a4059":"#fff"};border-radius:999px;padding:3px 10px;cursor:pointer;`,l},n=document.createElement("span");n.textContent="Demo. Seeded pretend data, nothing here is real.";const a=t(V()?"Back online":"Try offline",V());a.addEventListener("click",()=>{sessionStorage.setItem("tudent-demo-offline",V()?"0":"1"),location.reload()}),e.append(n,a),e.style.flexWrap="wrap",document.body.append(e);const s=()=>{document.body.style.paddingBottom=`${e.offsetHeight+8}px`};s(),new ResizeObserver(s).observe(e)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ne):Ne();function Dt(e,t){return{auth:St,rpc:Et,from:n=>new $t(n),functions:{invoke:async n=>({data:null,error:{message:"demo: use fetch path"}})}}}const xt="",It="",_=Dt(),Ze=crypto.randomUUID();async function R(e,t){try{await _.rpc("report_client_error",{p_correlation_id:Ze,p_app:"teacher",p_code:e.slice(0,64),p_message:t.slice(0,500)})}catch{}}window.addEventListener("error",e=>{R("window_error",String(e.message??"unknown"))});window.addEventListener("unhandledrejection",e=>{R("unhandled_rejection",String(e.reason??"unknown"))});async function jt(){const{data:e,error:t}=await _.from("tenants").select("id,name").limit(1);if(!t&&e){const a=e[0]??null;return a&&await he("tenant",a),a}const n=await pe("tenant");return n?n.value:null}async function At(e){var a;const{data:t}=await _.auth.getSession(),n=await fetch(`${xt}/functions/v1/join`,{method:"POST",headers:{"Content-Type":"application/json",apikey:It,Authorization:`Bearer ${((a=t.session)==null?void 0:a.access_token)??""}`,"x-correlation-id":Ze},body:JSON.stringify(e)});return{status:n.status,json:await n.json().catch(()=>({}))}}function ye(e,t={}){_.rpc("record_event",{p_correlation_id:crypto.randomUUID(),p_event_type:e,p_props:t}).then(({error:n})=>{n&&R("telemetry",`${e}: ${n.message}`)})}const Tt={batchId:"all",status:"active",query:"",sort:"name",desc:!1},we=new Set(["withdrawn","transferred","completed"]);function Oe(e,t){const n=t.query.trim().toLowerCase(),a=e.filter(s=>!(t.batchId!=="all"&&s.batch_id!==t.batchId||t.status==="active"&&we.has(s.status)||t.status==="ended"&&!we.has(s.status)||n&&!`${s.display_name} ${s.teacher_reference} ${s.guardian_phone}`.toLowerCase().includes(n)));return a.sort((s,o)=>{let i=0;return t.sort==="name"?i=s.display_name.localeCompare(o.display_name):t.sort==="joined"?i=s.started_at.localeCompare(o.started_at):i=s.status.localeCompare(o.status),(t.desc?-i:i)||s.id.localeCompare(o.id)}),a}function Se(e){const t=e.trim().split(/\s+/).filter(Boolean);if(t.length===0)return"?";const n=t[0][0]??"",a=t.length>1?t[t.length-1][0]??"":"";return(n+a).toUpperCase()}function K(e){return new Date(e).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric",timeZone:"Asia/Colombo"})}function J(e){return we.has(e)}function Bt(e,t){const n=o=>`"${String(o).replaceAll('"','""')}"`,a=["Name","Class","Reference","Guardian phone","Status","Joined"],s=e.map(o=>[o.display_name,t(o.batch_id),o.teacher_reference,o.guardian_phone,o.status,o.started_at.slice(0,10)].map(n).join(","));return[a.map(n).join(","),...s].join(`
`)}async function ze(){const e=await pe("roster"),{data:t,error:n}=await _.from("enrolments").select("id,tenant_id,batch_id,display_name,guardian_phone,teacher_reference,status,started_at,ended_at");if(n||t===null){if(e)return{rows:e.value,fromCache:!0,savedAt:e.savedAt};throw new Error((n==null?void 0:n.message)??"roster unavailable")}const a=t;return await he("roster",a),{rows:a,fromCache:!1,savedAt:null}}async function Lt(e,t){const{error:n}=await _.from("enrolments").update(t).eq("id",e);if(n)throw new Error(n.message)}async function qt(e){const{error:t}=await _.from("enrolments").update({status:"withdrawn",ended_at:new Date().toISOString()}).eq("id",e);if(t)throw new Error(t.message)}const Re=(e,t)=>`roll:${e}:${t}`;function Me(e,t){if(e.error)throw new Error(`${t}: ${e.error.message}`);if(e.data===null)throw new Error(`${t}: no data`);return e.data}async function Nt(e,t){return(await Ke()).filter(a=>a.kind==="attendance_mark"&&a.payload.held_on===t&&a.payload.batch_id===e)}async function Ot(e,t){const n=await Nt(e,t),a=n.filter(i=>i.status==="pending").length,s=n.filter(i=>i.status==="failed").map(i=>({enrolmentId:String(i.payload.enrolment_id??""),detail:i.lastError})),o=await pe(Re(e,t));try{const i=Me(await _.from("enrolments").select("id,display_name,started_at,ended_at").eq("batch_id",e),"roll enrolments"),l=await _.from("class_sessions").select("id").eq("batch_id",e).eq("held_on",t).maybeSingle();if(l.error)throw new Error(`roll session: ${l.error.message}`);const r=l.data?Me(await _.from("attendance_current").select("enrolment_id,state,note").eq("class_session_id",l.data.id),"roll marks"):[],f=new Map(r.map(d=>[d.enrolment_id,d])),c=i.filter(d=>rt(d,t)).map(d=>{var m,p;return{enrolment_id:d.id,display_name:d.display_name,marked:((m=f.get(d.id))==null?void 0:m.state)??null,note:((p=f.get(d.id))==null?void 0:p.note)??""}}).sort(Rt);return await he(Re(e,t),c),{rows:Pe(c,n),fromCache:!1,savedAt:null,pendingCount:a,failed:s}}catch(i){if(!o)throw i;return{rows:Pe(o.value,n),fromCache:!0,savedAt:o.savedAt,pendingCount:a,failed:s}}}const Rt=(e,t)=>e.display_name.localeCompare(t.display_name)||e.enrolment_id.localeCompare(t.enrolment_id);function Pe(e,t){const n=new Map;for(const a of t){if(a.status==="failed")continue;const s=a.payload;s.enrolment_id&&s.state&&n.set(s.enrolment_id,s.state)}return n.size===0?e:e.map(a=>n.has(a.enrolment_id)?{...a,marked:n.get(a.enrolment_id)}:a)}async function Mt(e){await pt({lane:e.enrolmentId,kind:"attendance_mark",idempotencyKey:crypto.randomUUID(),payload:{tenant_id:e.tenantId,batch_id:e.batchId,held_on:e.heldOn,enrolment_id:e.enrolmentId,state:e.state,note:e.note??"",marked_at:new Date().toISOString()}})}async function Pt(e){const t=e.payload;try{const{error:n}=await _.rpc("record_attendance_mark",{p_mark_id:e.idempotencyKey,p_tenant:t.tenant_id,p_batch:t.batch_id,p_held_on:t.held_on,p_enrolment:t.enrolment_id,p_state:t.state,p_note:t.note??"",p_marked_at:t.marked_at??null});if(!n)return{result:"ok"};const a=n.status,s=n.code??"";return typeof a=="number"&&a>=400||/^[0-9A-Z]{5}$/.test(s)?{result:"rejected",detail:`${s||a}: ${n.message}`}:{result:"unavailable",detail:n.message}}catch(n){return{result:"unavailable",detail:String(n)}}}async function Fe(){const e=await ft(Pt);e.delivered>0&&ye("offline_sync_succeeded",{items:e.delivered});for(const t of e.failed)ye("offline_sync_failed",{reason:"rejected"});return e.heldBack>0&&e.delivered===0&&e.failed.length===0&&ye("offline_sync_failed",{reason:"unavailable"}),e}async function Ft(e){const t=await _.from("attendance_marks").select("state,note,marked_at,class_sessions(held_on)").eq("enrolment_id",e).order("marked_at",{ascending:!1});if(t.error)throw new Error(t.error.message);return(t.data??[]).map(n=>{const a=n.class_sessions;return{state:n.state,note:n.note??"",marked_at:n.marked_at,held_on:(a==null?void 0:a.held_on)??""}})}async function Ut(){const{data:e,error:t}=await _.from("fee_events").select("id,enrolment_id,kind,amount_cents,effective_on,method,reference,note,reverses_id,recorded_at").order("effective_on",{ascending:!1}).order("recorded_at",{ascending:!1});if(t)throw new Error(t.message);return e??[]}async function Ue(e){if(!Number.isInteger(e.amountCents))throw new Error("Amounts are whole cents.");const{error:t}=await _.from("fee_events").insert({id:crypto.randomUUID(),tenant_id:e.tenantId,enrolment_id:e.enrolmentId,kind:e.kind,amount_cents:e.amountCents,currency:"LKR",effective_on:e.effectiveOn,method:e.method??null,reference:e.reference??"",note:e.note??"",reverses_id:e.reversesId??null,recorded_by:e.recordedBy});if(t)throw new Error($e(t.message))}function $e(e){return/fetch|network|Failed to fetch|NetworkError/i.test(e)?"You are offline, so this has NOT been recorded. Payments need a connection, because a receipt should never be a promise the ledger has not accepted yet. Nothing was saved; record it again when you have signal.":e.includes("fee_before_enrolment")?"That date is before this student joined. Check the date.":e.includes("reversal_must_match_original")?"A reversal has to undo the whole payment. For part of it, record an adjustment instead.":e.includes("cannot_reverse_a_reversal")?"That is already a reversal. To put the money back, record a new payment.":e.includes("fee_events_one_reversal_per_event")?"That payment has already been reversed.":e.includes("duplicate key")?"That was already recorded. Nothing was charged twice.":e.includes("violates check constraint")?"Check the amount and the method. A payment needs both, and cannot be zero.":e}function Ht(e){return{kind:"reversal",amountCents:-e.amount_cents,reversesId:e.id}}const y=document.getElementById("app"),Ee=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];let N=null;function h(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function M(){return new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Colombo"}).format(new Date)}"serviceWorker"in navigator&&navigator.serviceWorker.register("./sw.js");function Q(){const e=location.hash.slice(1)||"batches";(async()=>{const{data:t}=await _.auth.getSession();if(!t.session)return Wt();if(N===null&&(N=await jt()),N===null)return Kt();if(e==="batches")return Zt();if(e==="roster")return Ge();if(e==="fees")return ke();if(e==="new")return Gt();const n=e.match(/^batch\/([0-9a-f-]+)\/roll\/(\d{4}-\d{2}-\d{2})$/);if(n)return Qt(n[1],n[2]);const a=e.match(/^batch\/([0-9a-f-]+)(\/preview)?$/);if(a)return a[2]?Vt(a[1]):ce(a[1]);location.hash="batches"})().catch(t=>{console.error("[route]",e,t),R("route_error",String(t)),y.innerHTML=`<div class="page"><p class="error">Something went wrong. Pull down is disabled, so use this instead:</p>
      <button class="btn" onclick="location.reload()">Reload</button></div>`})}window.addEventListener("hashchange",Q);function H(e,t,n){y.innerHTML=`
    <header class="topbar">
      ${n!==void 0?`<button class="back" data-nav="${n}">Back</button>`:""}
      <h1>${h(e)}</h1>
    </header>
    <main class="page">${t}</main>`,y.querySelectorAll("[data-nav]").forEach(a=>a.addEventListener("click",()=>{location.hash=a.dataset.nav}))}function Wt(){var t;y.innerHTML=`
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
    </div>`;let e=!1;document.getElementById("google-btn").addEventListener("click",()=>{e||(e=!0,document.getElementById("auth-status").textContent="Opening Google...",_.auth.signInWithOAuth({provider:"google",options:{redirectTo:`${location.origin}${location.pathname}`}}).then(({error:n})=>{if(n){const a=document.getElementById("auth-error");a.hidden=!1,a.textContent="Google sign-in did not finish.",document.getElementById("auth-status").textContent=""}}).finally(()=>{e=!1}))}),(t=document.getElementById("local-rail"))==null||t.addEventListener("submit",n=>{n.preventDefault();const a=new FormData(n.target);_.auth.signInWithPassword({email:String(a.get("email")),password:String(a.get("password"))}).then(({error:s})=>{if(s){const o=document.getElementById("auth-error");o.hidden=!1,o.textContent="That did not work. Check the email and password."}else N=null,Q()})})}function Kt(){H("Batch",`
    <p class="lede">Almost there</p>
    <p class="hint">This account is not linked to a teaching account yet. Ask Business Booster to set that up, then sign in again.</p>
    <button class="btn" id="out">Sign out</button>`),document.getElementById("out").addEventListener("click",()=>{_.auth.signOut().then(()=>{N=null,Q()})})}async function Zt(){const e=M(),t=e.slice(0,8)+"01",[{data:n},{data:a},{data:s},{data:o},{data:i}]=await Promise.all([_.from("batches").select("id,label,exam_year,location,mode,archived_at,tenant_id").is("archived_at",null).order("created_at"),_.from("batch_schedules").select("*"),_.from("enrolments").select("id,batch_id,display_name,status,started_at,ended_at"),_.from("class_sessions").select("id,batch_id,held_on").gte("held_on",t).lte("held_on",e),_.from("fee_events").select("enrolment_id,kind,amount_cents,effective_on").gte("effective_on",t)]),l=n??[],r=s??[],f=r.filter(u=>!J(u.status)),c=o??[],d=i??[],m=We((a??[]).map(u=>({id:String(u.id),batchId:String(u.batch_id),weekday:Number(u.weekday),startTime:String(u.start_time),durationMinutes:Number(u.duration_minutes),location:String(u.location),effectiveFrom:String(u.effective_from),effectiveUntil:u.effective_until===null?null:String(u.effective_until)})),[],e,7).sort((u,C)=>u.date===C.date?u.startTime.localeCompare(C.startTime):u.date.localeCompare(C.date)),p=u=>{var C;return((C=l.find(T=>T.id===u))==null?void 0:C.label)??""},g=m.filter(u=>u.date===e&&p(u.batchId)),S=m.find(u=>u.date!==e&&p(u.batchId)),D=u=>f.filter(C=>C.batch_id===u).length,P=c.filter(u=>u.held_on===e);let X=[];c.length>0&&(X=(await _.from("attendance_current").select("class_session_id,enrolment_id,state").in("class_session_id",c.map(C=>C.id))).data??[]);const j=g[0]??null,Z=j?D(j.batchId):0,ee=j?P.find(u=>u.batch_id===j.batchId):null,E=ee?X.filter(u=>u.class_session_id===ee.id&&u.state==="absent").length:null;let I=0,w=0;for(const u of c){const C=r.filter(T=>T.batch_id===u.batch_id&&!J(T.status)&&T.started_at.slice(0,10)<=u.held_on).length;I+=C,w+=X.filter(T=>T.class_session_id===u.id&&T.state==="absent").length}const x=I>0?Math.round((I-w)/I*100):null,O=d.reduce((u,C)=>u+C.amount_cents,0),oe=new Set(d.filter(u=>u.kind==="payment").map(u=>u.enrolment_id)),ie=f.filter(u=>oe.has(u.id)).length,Ce=f.length-ie,De=f.length?Math.round(ie/f.length*100):0,Qe=new Set((a??[]).map(u=>u.batch_id)),xe=l.filter(u=>!Qe.has(u.id)),Xe=new Date(Date.now()-7*864e5).toISOString(),F=f.filter(u=>u.started_at>=Xe),et=F.length===0?"":F.length<=2?F.map(u=>u.display_name).join(" and "):`${F.slice(0,2).map(u=>u.display_name).join(", ")} and ${F.length-2} more`,te={rows:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h10"/></svg>',warn:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8v5"/><circle cx="12" cy="16.5" r=".6" fill="currentColor"/><path d="M10.3 3.9 2.6 17.2A1.6 1.6 0 0 0 4 19.6h16a1.6 1.6 0 0 0 1.4-2.4L13.7 3.9a1.6 1.6 0 0 0-2.8 0z"/></svg>',mail:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16v12H4z"/><path d="m4 8 8 6 8-6"/></svg>',chev:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m9 6 6 6-6 6"/></svg>'};H(N.name,`
    ${j?`
      <section class="hero">
        <p class="eyebrow"><i class="dot"></i> Class today</p>
        <p class="h2">${h(p(j.batchId))}</p>
        <p class="meta">${h(z(j.startTime))} · ${h(j.location)} · ${Z} ${Z===1?"student":"students"}</p>
        <div class="btn-row">
          <button class="btn primary full" data-nav="batch/${j.batchId}/roll/${e}">Take the roll</button>
          <button class="btn" data-nav="batch/${j.batchId}">Open class</button>
        </div>
      </section>
      <div class="stats">
        ${E===null?`
          <div class="stat"><b>${Z}</b><span>On the roll today</span></div>
          <div class="stat"><b>–</b><span>Roll not taken yet</span></div>`:`
          <div class="stat good"><b>${Z-E}</b><span>Present today</span></div>
          <div class="stat warn"><b>${E}</b><span>Absent today</span></div>`}
        <div class="stat"><b>${x===null?"–":`${x}%`}</b><span>${x===null?"No rolls this month":"Attendance this month"}</span></div>
      </div>`:`
      ${S?`<p class="hint">No class today. Next: ${h(p(S.batchId))}, ${h(ae(S.date))} at ${h(z(S.startTime))}.</p>`:""}
      <div class="stats">
        <div class="stat"><b>${l.length}</b><span>${l.length===1?"Class":"Classes"}</span></div>
        <div class="stat"><b>${f.length}</b><span>Students</span></div>
        <div class="stat"><b>${x===null?"–":`${x}%`}</b><span>${x===null?"No rolls this month":"Attendance this month"}</span></div>
      </div>`}

    <p class="sec">Your classes</p>
    ${l.length===0?'<p class="hint">No classes yet. Set up your first one and share the join link with your students. It takes about two minutes.</p>':`<div class="card"><div class="list">${l.map(u=>{const C=(a??[]).find(tt=>tt.batch_id===u.id),T=D(u.id);return`
          <div class="row" data-nav="batch/${u.id}" role="link" tabindex="0" style="cursor:pointer">
            <span class="ico">${te.rows}</span>
            <div class="grow">
              <div class="strong">${h(u.label)}</div>
              <div class="hint">${C?`${Ee[C.weekday]}s · ${z(C.start_time.slice(0,5))} · `:""}${h(u.location)}</div>
            </div>
            ${C?T===0?'<span class="pill">No students yet</span>':`<span class="pill on">${T} ${T===1?"student":"students"}</span>`:'<span class="pill due">Needs a time</span>'}
          </div>`}).join("")}</div></div>`}

    <p class="sec">Fees this month</p>
    <div class="card money-card">
      <p class="big">${h(U(O))}</p>
      <p class="hint">Received, after reversals. Money that moved, not money that is owed.</p>
      ${f.length>0?`
        <div class="split-bar" role="img" aria-label="${ie} paid, ${Ce} nothing recorded">
          <i style="width:${De}%;background:var(--good)"></i>
          <i style="width:${100-De}%;background:var(--surface-2)"></i>
        </div>
        <div class="legend">
          <em><span class="sw" style="background:var(--good)"></span> ${ie} paid</em>
          <em><span class="sw" style="background:var(--surface-2)"></span> ${Ce} nothing recorded</em>
        </div>`:""}
    </div>

    ${xe.length>0||F.length>0?`
      <p class="sec">Needs you</p>
      <div class="card"><div class="list">
        ${xe.map(u=>`
          <div class="row" data-nav="batch/${u.id}" role="link" tabindex="0" style="cursor:pointer">
            <span class="ico" style="color:var(--warn)">${te.warn}</span>
            <div class="grow">
              <div class="strong">${h(u.label)} has no weekly time</div>
              <div class="hint">Students cannot see it on their week yet</div>
            </div>
            ${te.chev}
          </div>`).join("")}
        ${F.length>0?`
          <div class="row" data-nav="roster" role="link" tabindex="0" style="cursor:pointer">
            <span class="ico">${te.mail}</span>
            <div class="grow">
              <div class="strong">${F.length} ${F.length===1?"student":"students"} joined this week</div>
              <div class="hint">${h(et)}</div>
            </div>
            ${te.chev}
          </div>`:""}
      </div></div>`:""}

    <div class="btn-row">
      <button class="btn primary" data-nav="new">Set up a class</button>
      <button class="btn" data-nav="roster">Students</button>
      <button class="btn" data-nav="fees">Fees</button>
    </div>
    <button class="btn quiet" id="out">Sign out</button>`),y.querySelectorAll("[data-nav]").forEach(u=>u.addEventListener("click",()=>{location.hash=u.dataset.nav})),document.getElementById("out").addEventListener("click",()=>{_.auth.signOut().then(()=>{N=null,Q()})})}let k={...Tt};async function Ge(){Ye();const[e,t]=await Promise.all([ze(),_.from("batches").select("id,label").is("archived_at",null).order("created_at")]),n=e.rows,a=t.data??[],s=c=>{var d;return((d=a.find(m=>m.id===c))==null?void 0:d.label)??"Class"},o=Oe(n,k),i=k.sort+(k.desc?":d":""),l=(c,d)=>`<button data-sort="${c}">${d}${k.sort===c?k.desc?" ↓":" ↑":""}</button>`;H("Students",`
    ${e.fromCache?`
      <div class="card">
        <div class="strong">Working from this phone</div>
        <p class="hint">You are offline, so this is your class list as it was saved here${e.savedAt?` on ${h(new Date(e.savedAt).toLocaleString("en-GB",{timeZone:"Asia/Colombo",weekday:"short",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}))}`:""}. Changes need a connection.</p>
      </div>`:""}
    <div class="card roster-pane">
      <div class="toolbar">
        <label class="grow-2">Search
          <input id="r-q" value="${h(k.query)}" placeholder="Name, reference or phone"
                 autocapitalize="off" autocorrect="off" spellcheck="false" />
        </label>
        <label>Class
          <select id="r-batch">
            <option value="all">All classes</option>
            ${a.map(c=>`<option value="${c.id}" ${k.batchId===c.id?"selected":""}>${h(c.label)}</option>`).join("")}
          </select>
        </label>
        <label>Status
          <select id="r-status">
            ${[["active","On the roll"],["ended","Left"],["all","Everyone"]].map(([c,d])=>`<option value="${c}" ${k.status===c?"selected":""}>${d}</option>`).join("")}
          </select>
        </label>
        <label class="phone-only">Order
          <select id="r-sort">
            ${[["name","Name A to Z"],["name:d","Name Z to A"],["joined","Joined, oldest first"],["joined:d","Joined, newest first"],["status","Status"]].map(([c,d])=>`<option value="${c}" ${i===c?"selected":""}>${d}</option>`).join("")}
          </select>
        </label>
      </div>
      <p class="count-line" id="r-count">${o.length} of ${n.length} ${n.length===1?"student":"students"}</p>
    </div>

    ${o.length===0?`
      <div class="card"><p class="hint empty">${n.length===0?"Nobody has joined yet. Share a class link and they will appear here as they join.":"No students match this search. Clear it to see everyone."}</p></div>`:`
      <div class="card roster-pane">
        <div class="list roster-list">
          ${o.map(c=>`
            <button class="roster-row" data-open="${c.id}">
              <span class="roster-av" aria-hidden="true">${h(Se(c.display_name))}</span>
              <span class="grow">
                <span class="roster-name">${h(c.display_name||"Unnamed")}</span>
                ${k.batchId==="all"?`<span class="roster-meta">${h(s(c.batch_id))}</span>`:""}
                <span class="roster-sub">joined ${K(c.started_at)}</span>
              </span>
              <span class="status-tag ${J(c.status)?"is-ended":"is-active"}">${h(c.status)}</span>
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
            ${o.map(c=>`
              <tr data-open="${c.id}">
                <td><strong>${h(c.display_name||"Unnamed")}</strong></td>
                <td>${h(s(c.batch_id))}</td>
                <td>${h(c.teacher_reference||"-")}</td>
                <td class="num">${h(c.guardian_phone||"-")}</td>
                <td class="num">${K(c.started_at)}</td>
                <td><span class="status-tag ${J(c.status)?"is-ended":"is-active"}">${h(c.status)}</span></td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div>`}

    <div class="btn-row">
      <button class="btn" id="r-export" ${o.length===0?"disabled":""}>Export this list</button>
    </div>
    <div class="card" id="r-detail" hidden></div>`,"batches");const r=()=>{Ge()},f=document.getElementById("r-q");f.addEventListener("input",()=>{k={...k,query:f.value};const c=Oe(n,k);document.getElementById("r-count").textContent=`${c.length} of ${n.length} ${n.length===1?"student":"students"}`,clearTimeout(f._t),f._t=window.setTimeout(r,250)}),document.getElementById("r-batch").addEventListener("change",c=>{k={...k,batchId:c.target.value},r()}),document.getElementById("r-status").addEventListener("change",c=>{k={...k,status:c.target.value},r()}),document.getElementById("r-sort").addEventListener("change",c=>{const[d,m]=c.target.value.split(":");k={...k,sort:d,desc:m==="d"},r()}),y.querySelectorAll("[data-sort]").forEach(c=>c.addEventListener("click",()=>{const d=c.dataset.sort;k={...k,sort:d,desc:k.sort===d?!k.desc:!1},r()})),y.querySelectorAll("[data-open]").forEach(c=>c.addEventListener("click",()=>zt(n.find(d=>d.id===c.dataset.open),s,r))),document.getElementById("r-export").addEventListener("click",()=>{const c=Bt(o,s),d=URL.createObjectURL(new Blob([c],{type:"text/csv"})),m=document.createElement("a");m.href=d,m.download=`students-${new Date().toISOString().slice(0,10)}.csv`,m.click(),URL.revokeObjectURL(d)})}function Ye(){const e=document.getElementById("r-detail");e&&(e.hidden=!0),document.body.classList.remove("detail-open")}function zt(e,t,n){var s;const a=document.getElementById("r-detail");a.hidden=!1,document.body.classList.add("detail-open"),a.innerHTML=`
    <div class="strong">${h(e.display_name||"Unnamed")}</div>
    <p class="hint">${h(t(e.batch_id))} · joined ${K(e.started_at)} · ${h(e.status)}</p>
    <form id="r-form">
      <label>Name in your class list
        <input name="display_name" value="${h(e.display_name)}" />
      </label>
      <label>Your reference
        <input name="teacher_reference" value="${h(e.teacher_reference)}" placeholder="Optional" />
      </label>
      <label>Guardian phone
        <input name="guardian_phone" value="${h(e.guardian_phone)}" inputmode="tel" />
      </label>
      <button class="btn primary full" type="submit">Save</button>
      <p class="notice" id="r-saved" hidden>Saved.</p>
      <p class="error" id="r-err" hidden></p>
    </form>
    <div id="r-history" class="history-block"><p class="hint">Loading attendance…</p></div>
    ${J(e.status)?"":'<button class="btn danger-quiet" id="r-withdraw">Remove from the class</button>'}
    <button class="btn quiet" id="r-close">Close</button>`,Xt(e.id,document.getElementById("r-history")).catch(o=>{document.getElementById("r-history").innerHTML='<p class="hint">Attendance could not be loaded just now.</p>',R("attendance_history_failed",String(o))}),a.scrollIntoView({block:"start"}),document.getElementById("r-form").addEventListener("submit",o=>{o.preventDefault();const i=new FormData(o.target);Lt(e.id,{display_name:String(i.get("display_name")).trim(),teacher_reference:String(i.get("teacher_reference")).trim(),guardian_phone:String(i.get("guardian_phone")).trim()}).then(()=>{document.getElementById("r-saved").hidden=!1,n()}).catch(l=>{R("roster_save",String(l));const r=document.getElementById("r-err");r.hidden=!1,r.textContent="Could not save that. Try again."})}),(s=document.getElementById("r-withdraw"))==null||s.addEventListener("click",()=>{qt(e.id).then(n).catch(o=>{R("roster_withdraw",String(o))})}),document.getElementById("r-close").addEventListener("click",Ye)}function Gt(){const e=new Date().getFullYear();H("New class",`
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
            <select name="weekday">${Ee.map((t,n)=>`<option value="${n}" ${n===6?"selected":""}>${t}</option>`).join("")}</select>
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
    </form>`,"batches"),document.getElementById("nb").addEventListener("submit",t=>{t.preventDefault();const n=new FormData(t.target),a=t.target.querySelector("button[type=submit]");a.disabled=!0,(async()=>{const{data:s,error:o}=await _.from("batches").insert({tenant_id:N.id,label:String(n.get("label")).trim(),exam_year:Number(n.get("exam_year")),location:String(n.get("location")).trim(),mode:String(n.get("mode"))}).select("id").single();if(o||!s)throw new Error((o==null?void 0:o.message)??"batch insert failed");const{error:i}=await _.from("batch_schedules").insert({tenant_id:N.id,batch_id:s.id,weekday:Number(n.get("weekday")),start_time:String(n.get("start_time")),duration_minutes:Number(n.get("duration")),location:String(n.get("location")).trim(),effective_from:M()});if(i)throw new Error(i.message);location.hash=`batch/${s.id}`})().catch(s=>{a.disabled=!1,R("new_batch",String(s));const o=document.getElementById("nb-err");o.hidden=!1,o.textContent="Could not create the class. Try again."})})}async function Ve(e){const[t,n,a]=await Promise.all([_.from("batches").select("*").eq("id",e).single(),_.from("batch_schedules").select("*").eq("batch_id",e),_.from("schedule_exceptions").select("*").eq("batch_id",e)]),s=t.data,o=n.data??[],i=a.data??[],l=We(o.map(r=>({id:r.id,batchId:r.batch_id,weekday:r.weekday,startTime:r.start_time,durationMinutes:r.duration_minutes,location:r.location,effectiveFrom:r.effective_from,effectiveUntil:r.effective_until})),i.map(r=>({id:r.id,batchId:r.batch_id,kind:r.kind,originalDate:r.original_date,newStart:r.new_start,newDurationMinutes:r.new_duration_minutes,newLocation:r.new_location,note:r.note})),M(),14);return{batch:s,schedules:o,exceptions:i,occurrences:l}}function Yt(e){const t=e.status==="moved"?`<span class="tag moved">Moved${e.movedFromDate?` from ${ae(e.movedFromDate)}`:""}</span>`:e.status==="extra"?'<span class="tag extra">Extra class</span>':"";return`<div class="strong">${ae(e.date)} · ${z(e.startTime)}</div>
          <div class="hint">${h(e.location)}${t?" ":""}${t}</div>`}async function ce(e){var c;const{batch:t,schedules:n,occurrences:a}=await Ve(e),{data:s}=await _.auth.getUser(),o=((c=s.user)==null?void 0:c.id)??"",i=n[0];H(t.label,`
    <div class="card">
      <div class="row">
        <div class="grow">
          <div class="strong">${i?`${Ee[i.weekday]}s · ${z(i.start_time.slice(0,5))}`:"No weekly time set"}</div>
          <div class="hint">${h(t.location)}</div>
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
          <button class="btn" data-nav="batch/${e}/roll/${d.date}">${h(Jt(d.date))}</button>`).join("")||'<p class="hint">No classes scheduled to take a roll for.</p>'}
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
      ${a.length===0?'<p class="hint">No classes in the next two weeks.</p>':a.map((d,m)=>`
        <div>
          <div class="row">
            <div class="grow">${Yt(d)}</div>
            ${d.status==="scheduled"?`<button class="btn quiet" data-occ="${m}">Change</button>`:""}
          </div>
          <div class="btn-row" data-occ-actions="${m}" hidden>
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
        <label>Date <input name="date" type="date" value="${M()}" required /></label>
        <label>Time <input name="time" type="time" value="${i?i.start_time.slice(0,5):"15:30"}" required /></label>
      </div>
      <button class="btn full" type="submit">Add extra class</button>
    </form>`,"batches"),y.querySelectorAll("[data-nav]").forEach(d=>d.addEventListener("click",()=>{location.hash=d.dataset.nav})),y.querySelectorAll("[data-jump]").forEach(d=>d.addEventListener("click",()=>{var m;(m=document.getElementById(d.dataset.jump))==null||m.scrollIntoView({behavior:"smooth",block:"start"})})),Je(t,o);const l=document.getElementById("invite-note"),r=document.getElementById("code-line");async function f(d){const m=await At({action:d,tenant_id:t.tenant_id,batch_id:e});return m.status!==200?(l.hidden=!1,l.textContent="Could not get a join link. Try again.",null):String(m.json.code)}document.getElementById("share").addEventListener("click",()=>{(async()=>{const d=await f("create");if(d===null)return;r.hidden=!1,r.textContent=d,l.hidden=!1,l.textContent="This code is also shown here in case WhatsApp does not open.";const m=`Join my ${t.label} class on Tudent.

1. Open https://businessboosterlk.github.io/tudent/
2. Sign in with Google
3. Enter this code: ${d}

The code is for this class group only. Please do not forward it.`;window.open(`https://wa.me/?text=${encodeURIComponent(m)}`,"_blank","noopener")})()}),document.getElementById("rotate").addEventListener("click",()=>{(async()=>{const d=await f("rotate");d!==null&&(r.hidden=!1,r.textContent=d,l.hidden=!1,l.textContent="The old link no longer works. Share this new one with the class.")})()}),y.querySelectorAll("[data-occ]").forEach(d=>d.addEventListener("click",()=>{const m=d.dataset.occ,p=y.querySelector(`[data-occ-actions="${m}"]`);p.hidden=!p.hidden})),y.querySelectorAll("[data-cancel]").forEach(d=>d.addEventListener("click",()=>{_.from("schedule_exceptions").insert({tenant_id:t.tenant_id,batch_id:e,kind:"cancelled",original_date:d.dataset.cancel,created_by:o}).then(()=>ce(e))})),y.querySelectorAll("[data-move]").forEach(d=>d.addEventListener("click",()=>{const[m]=d.dataset.move.split("|"),p=y.querySelector(`[data-move-form="${m}"]`);p.hidden=!1})),y.querySelectorAll("[data-move-form]").forEach(d=>d.addEventListener("submit",m=>{m.preventDefault();const p=new FormData(d);_.from("schedule_exceptions").insert({tenant_id:t.tenant_id,batch_id:e,kind:"moved",original_date:d.dataset.moveForm,new_start:`${p.get("date")}T${p.get("time")}:00+05:30`,new_location:t.location,created_by:o}).then(()=>ce(e))})),document.getElementById("extra").addEventListener("submit",d=>{d.preventDefault();const m=new FormData(d.target);_.from("schedule_exceptions").insert({tenant_id:t.tenant_id,batch_id:e,kind:"extra",new_start:`${m.get("date")}T${m.get("time")}:00+05:30`,new_location:t.location,created_by:o}).then(()=>ce(e))})}async function Je(e,t){const n=document.getElementById("complete-card");if(!n)return;const a=M(),[{data:s},{data:o}]=await Promise.all([_.from("canonical_topics").select("id,name").order("sort_order"),_.from("class_sessions").select("id,held_on,topic_id, next_actions(id,title,estimated_minutes,due_at,result_visibility)").eq("batch_id",e.id).eq("held_on",a)]),i=o==null?void 0:o[0];if(i){const l=i.next_actions,r=Array.isArray(l)?l[0]:l;n.innerHTML=`
      <div class="strong">Today's class is recorded</div>
      ${r?`<p class="hint">Your students' next step: ${h(r.title)}, about ${r.estimated_minutes} minutes.</p>`:'<p class="hint">No next step was set for this class.</p>'}`;return}n.innerHTML=`
    <form id="cc">
      <label>What did today's class cover?
        <select name="topic">${(s??[]).map(l=>`<option value="${l.id}">${h(l.name)}</option>`).join("")}</select>
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
    </form>`,document.getElementById("cc").addEventListener("submit",l=>{var p;l.preventDefault();const r=new FormData(l.target),f=String(r.get("topic")),c=((p=(s??[]).find(g=>g.id===f))==null?void 0:p.name)??"today’s topic",d=Number(r.get("due")),m=new Date(Date.now()+d*24*60*60*1e3);(async()=>{const{data:g,error:S}=await _.from("class_sessions").insert({tenant_id:e.tenant_id,batch_id:e.id,held_on:a,topic_id:f,completed_by:t}).select("id").single();if(S||!g)throw new Error((S==null?void 0:S.message)??"session failed");const{error:D}=await _.from("next_actions").insert({tenant_id:e.tenant_id,batch_id:e.id,class_session_id:g.id,title:String(r.get("title")).trim()||`Review ${c}`,topic_id:f,estimated_minutes:Number(r.get("minutes")),due_at:m.toISOString(),result_visibility:String(r.get("visibility")),created_by:t});if(D)throw new Error(D.message);Je(e,t)})().catch(g=>{R("complete_class",String(g)),_.auth.getSession().then(({data:S})=>{if(!S.session){N=null,Q();return}const D=document.getElementById("cc-err");D.hidden=!1,D.textContent="Could not record the class. Try again."})})})}async function Vt(e){const{batch:t,occurrences:n}=await Ve(e),a=ot(n.map(s=>({occ:s,label:t.label})),[]);H("Student preview",`
    <p class="hint">This is exactly what a student in ${h(t.label)} sees on their timetable. Items from this class are marked confirmed by teacher.</p>
    <div class="card"><div class="list">
      ${a.length===0?'<p class="hint empty">Nothing coming up.</p>':a.map(s=>`
        <div${s.date===M()?' class="today"':""}>
          <div class="strong">${h(s.heading)}</div>
          <div class="hint">${h(s.detail)}</div>
          <div class="hint">${s.marker}${s.qualifier?` · ${s.qualifier}`:""}</div>
        </div>`).join("")}
    </div></div>`,`batch/${e}`),y.querySelectorAll("[data-nav]").forEach(s=>s.addEventListener("click",()=>{location.hash=s.dataset.nav}))}Q();function Jt(e){return e===M()?"Today":K(`${e}T00:00:00Z`)}async function Qt(e,t){var d;try{await Fe()}catch{}const n=await pe(`batch:${e}`);let a;const s=await _.from("batches").select("id,label,tenant_id").eq("id",e).maybeSingle();if(!s.error&&s.data)a=s.data,await he(`batch:${e}`,a);else if(n)a=n.value;else throw new Error(((d=s.error)==null?void 0:d.message)??"batch unavailable offline");let o=await Ot(e,t),i=o.rows;const l=m=>new Date(m).toLocaleString("en-GB",{timeZone:"Asia/Colombo",weekday:"short",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}),r=()=>{const m=je(i);H(a.label,`
      ${o.fromCache?`
        <div class="card">
          <div class="strong">Working from this phone</div>
          <p class="hint">You are offline, so this is the roll as it was saved here${o.savedAt?` on ${h(l(o.savedAt))}`:""}. Your taps are kept and will send when you have signal.</p>
        </div>`:""}

      ${o.pendingCount>0?`
        <div class="card">
          <p class="hint">${o.pendingCount} ${o.pendingCount===1?"tap has":"taps have"} not sent yet. They stay on this phone until they do.</p>
        </div>`:""}

      ${o.failed.length>0?`
        <div class="card">
          <p class="error">${o.failed.length} ${o.failed.length===1?"mark was":"marks were"} refused by the server and will not send. Nothing was lost: tap the student again, or tell Business Booster.</p>
        </div>`:""}

      <div class="card">
        <p class="roll-day">${h(t===M()?`Today · ${K(`${t}T00:00:00Z`)}`:K(`${t}T00:00:00Z`))}</p>
        <p class="roll-turnout" id="turnout">${h(Ae(m))}</p>
      </div>

      ${i.length===0?`
        <div class="card"><p class="hint empty">Nobody was on the roll for this class. Students who join later will appear on the classes held after they joined, never before.</p></div>`:`
        <div class="card">
          <div class="list roll-list">
            ${i.map(p=>`
              <button class="roll-row is-${p.marked??"unmarked"}" data-mark="${p.enrolment_id}">
                <span class="roster-av" aria-hidden="true">${h(Se(p.display_name))}</span>
                <span class="grow">
                  <span class="roster-name">${h(p.display_name)}</span>
                  ${p.note?`<span class="roster-sub">${h(p.note)}</span>`:""}
                </span>
                <span class="mark-tag is-${p.marked??"unmarked"}">${h(ge(p.marked))}</span>
              </button>`).join("")}
          </div>
        </div>
        <p class="hint">Tap a student to change them: present, absent, late, and back. Every tap is kept, so a correction never erases what you first recorded.</p>`}
    `,`batch/${e}`),y.querySelectorAll("[data-nav]").forEach(p=>p.addEventListener("click",()=>{location.hash=p.dataset.nav})),y.querySelectorAll("[data-mark]").forEach(p=>p.addEventListener("click",()=>{f(p.dataset.mark)}))};async function f(m){const p=i.find(D=>D.enrolment_id===m);if(!p)return;const g=it(p.marked),S=p.marked;p.marked=g,c(m,g);try{await Mt({tenantId:a.tenant_id,batchId:e,heldOn:t,enrolmentId:m,state:g})}catch(D){p.marked=S,c(m,S),R("attendance_queue_failed",String(D));const P=document.getElementById("turnout");P&&(P.textContent="That tap could not be saved on this phone. Try again.");return}Fe().catch(()=>{})}function c(m,p){const g=y.querySelector(`[data-mark="${m}"]`);if(!g)return;const S=p??"unmarked";g.className=`roll-row is-${S}`;const D=g.querySelector(".mark-tag");D.className=`mark-tag is-${S}`,D.textContent=ge(p);const P=document.getElementById("turnout");P&&(P.textContent=Ae(je(i)))}r()}async function Xt(e,t){const n=await Ft(e);if(n.length===0){t.innerHTML='<p class="hint">Present at every class so far. Only absences and corrections are recorded.</p>';return}t.innerHTML=`
    <p class="hint">Every mark, newest first. Corrections are kept beside what they corrected.</p>
    <div class="list">
      ${n.map(a=>`
        <div class="row">
          <span class="grow">${h(a.held_on?K(`${a.held_on}T00:00:00Z`):"Unknown day")}
            ${a.note?`<span class="roster-sub">${h(a.note)}</span>`:""}</span>
          <span class="mark-tag is-${a.state}">${h(ge(a.state))}</span>
        </div>`).join("")}
    </div>`}let W=null;async function ke(){var d;const{data:e}=await _.auth.getUser(),t=((d=e.user)==null?void 0:d.id)??"",[n,a]=await Promise.all([Ut(),ze()]),s=a.rows,o=m=>{var p;return((p=s.find(g=>g.id===m))==null?void 0:p.display_name)??"Unknown student"},i=fe(n),l=s.filter(m=>!J(m.status)),r=()=>{if(W)return f();H("Fees",`
      <div class="card">
        <p class="kpi-figure">${h(U(i.netCents))}</p>
        <p class="hint">Received, after reversals and adjustments. This is money that moved, not money that is owed.</p>
        <div class="kpi-split">
          <span>${h(U(i.paidCents))} paid</span>
          ${i.reversedCents?`<span class="is-negative">${h(U(i.reversedCents))} reversed</span>`:""}
          ${i.adjustedCents?`<span>${h(U(i.adjustedCents))} adjusted</span>`:""}
          <span>${i.eventCount} ${i.eventCount===1?"entry":"entries"}</span>
        </div>
      </div>

      <p class="sec">Received, by student</p>
      ${l.length===0?`
        <div class="card"><p class="hint empty">Nobody is on the roll yet. Students appear here once they join a class.</p></div>`:`
        <div class="card"><div class="list">
          ${l.map(m=>{const p=n.filter(S=>S.enrolment_id===m.id),g=fe(p);return`
            <button class="roster-row" data-fee-student="${m.id}">
              <span class="roster-av" aria-hidden="true">${h(Se(m.display_name))}</span>
              <span class="grow">
                <span class="roster-name">${h(m.display_name)}</span>
                <span class="roster-sub">${p.length===0?"Nothing recorded":`${p.length} ${p.length===1?"entry":"entries"}`}</span>
              </span>
              <span class="money${g.netCents<0?" is-negative":""}">${h(U(g.netCents))}</span>
            </button>`}).join("")}
        </div></div>`}
    `,"batches"),c()};function f(){var Z,ee;const m=n.filter(E=>E.enrolment_id===W),p=fe(m),g=dt(m).reverse(),S=new Set(m.map(E=>E.reverses_id).filter(Boolean));H(o(W),`
      <div class="card">
        <p class="kpi-figure">${h(U(p.netCents))}</p>
        <p class="hint">Received from this student, after reversals and adjustments.</p>
      </div>

      <p class="sec">Record a movement</p>
      <form class="card" id="fee-form">
        <div class="field-pair">
          <label>Amount (LKR)
            <input name="rupees" type="number" min="1" step="0.01" inputmode="decimal" required />
          </label>
          <label>Date it moved
            <input name="effective_on" type="date" value="${M()}" required />
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
      ${g.length===0?`
        <div class="card"><p class="hint empty">Nothing recorded for this student yet.</p></div>`:`
        <div class="card"><div class="list">
          ${g.map(({event:E,runningCents:I})=>{const w=E,x=S.has(w.id);return`
            <div class="fee-line${w.kind==="reversal"?" is-reversal":""}">
              <div class="row">
                <span class="grow">
                  <span class="roster-name">${h(lt(w.kind))}${x?" · later reversed":""}</span>
                  <span class="roster-sub">${h(K(`${w.effective_on}T00:00:00Z`))}${w.method?` · ${h(ct(w.method))}`:""}${w.reference?` · ${h(w.reference)}`:""}</span>
                </span>
                <span class="money${w.amount_cents<0?" is-negative":""}">${h(U(w.amount_cents))}</span>
              </div>
              <div class="row fee-foot">
                <span class="grow hint">Balance after this: ${h(U(I))}</span>
                ${w.kind==="payment"&&!x?`<button class="btn danger-quiet small" data-reverse="${w.id}">Reverse</button>`:""}
              </div>
            </div>`}).join("")}
        </div></div>
        <p class="hint">Nothing here can be edited or deleted. Reversing a payment adds an entry that undoes it, and both stay on the record.</p>`}
    `,"fees"),(Z=document.querySelector('[data-nav="fees"]'))==null||Z.addEventListener("click",()=>{W=null,r()}),(ee=y.querySelector(".back"))==null||ee.addEventListener("click",E=>{E.preventDefault(),W=null,r()});const D=y.querySelector("[name=kind]"),P=y.querySelector("[name=method]").closest("label"),X=document.getElementById("adj-hint"),j=()=>{const E=D.value==="adjustment";P.hidden=E,X.hidden=!E,y.querySelector("[name=rupees]").min=E?"":"1"};D.addEventListener("change",j),j(),document.getElementById("fee-form").addEventListener("submit",E=>{E.preventDefault();const I=new FormData(E.target),w=document.getElementById("fee-err"),x=String(I.get("kind")),O=Math.round(Number(I.get("rupees"))*100);if(!Number.isFinite(O)||O===0){w.textContent="Enter an amount.",w.hidden=!1;return}Ue({tenantId:N.id,enrolmentId:W,kind:x,amountCents:O,effectiveOn:String(I.get("effective_on")),method:x==="adjustment"?null:String(I.get("method")),reference:String(I.get("reference")??""),recordedBy:t}).then(()=>ke()).catch(oe=>{w.textContent=$e(String(oe.message??oe)),w.hidden=!1})}),y.querySelectorAll("[data-reverse]").forEach(E=>E.addEventListener("click",()=>{const I=m.find(O=>O.id===E.dataset.reverse),w=Ht(I),x=document.getElementById("fee-err");Ue({tenantId:N.id,enrolmentId:W,kind:w.kind,amountCents:w.amountCents,effectiveOn:M(),reversesId:w.reversesId,note:"Reversed",recordedBy:t}).then(()=>ke()).catch(O=>{x.textContent=$e(String(O.message??O)),x.hidden=!1})}))}function c(){y.querySelectorAll("[data-nav]").forEach(m=>m.addEventListener("click",()=>{location.hash=m.dataset.nav})),y.querySelectorAll("[data-fee-student]").forEach(m=>m.addEventListener("click",()=>{W=m.dataset.feeStudent,r()}))}r()}
