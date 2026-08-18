(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();function et(e){return new Date(`${e}T12:00:00Z`)}function ft(e){return e.toISOString().slice(0,10)}function Me(e,t){const n=et(e);return n.setUTCDate(n.getUTCDate()+t),ft(n)}function vt(e){return e.slice(0,5)}function _t(e,t){const n=new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).formatToParts(new Date(e)),a=s=>{var o;return((o=n.find(i=>i.type===s))==null?void 0:o.value)??"00"};return{date:`${a("year")}-${a("month")}-${a("day")}`,time:`${a("hour")}:${a("minute")}`}}function tt(e,t,n,a,s="Asia/Colombo"){const o=Me(n,a),i=[],c=new Set(t.filter(d=>d.kind!=="extra"&&d.originalDate!==null).map(d=>`${d.batchId}|${d.originalDate}`));for(const d of e)for(let v=n;v<o;v=Me(v,1))et(v).getUTCDay()===d.weekday&&(v<d.effectiveFrom||d.effectiveUntil!==null&&v>d.effectiveUntil||c.has(`${d.batchId}|${v}`)||i.push({batchId:d.batchId,date:v,startTime:vt(d.startTime),durationMinutes:d.durationMinutes,location:d.location,status:"scheduled"}));for(const d of t){if(d.newStart===null)continue;const{date:v,time:u}=_t(d.newStart,s);v<n||v>=o||i.push({batchId:d.batchId,date:v,startTime:u,durationMinutes:d.newDurationMinutes??120,location:d.newLocation??"",status:d.kind==="moved"?"moved":"extra",...d.kind==="moved"&&d.originalDate!==null?{movedFromDate:d.originalDate}:{},...d.note?{note:d.note}:{}})}return i.sort((d,v)=>d.date.localeCompare(v.date)||d.startTime.localeCompare(v.startTime)||d.batchId.localeCompare(v.batchId)||d.status.localeCompare(v.status)),i}function ue(e){return new Date(`${e}T12:00:00Z`).toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short",timeZone:"UTC"})}function X(e){const[t=0,n=0]=e.split(":").map(Number),a=t>=12?"PM":"AM",s=t%12===0?12:t%12;return n===0?`${s} ${a}`:`${s}:${String(n).padStart(2,"0")} ${a}`}function bt(e,t){const n=[];for(const{occ:a,label:s}of e)n.push({heading:s,detail:`${ue(a.date)} · ${X(a.startTime)}${a.location?` · ${a.location}`:""}`,marker:"Confirmed by teacher",qualifier:a.status==="moved"?"Moved":a.status==="extra"?"Extra class":"",date:a.date,time:a.startTime});for(const a of t){const s=a.subjectLabel!==""&&a.title.toLowerCase().includes(a.subjectLabel.toLowerCase()),o=a.subjectLabel&&!s?` · ${a.subjectLabel}`:"";n.push({heading:a.title,detail:`${ue(a.date)} · ${X(a.time)}${o}`,marker:"Added by you",qualifier:a.kind==="deadline"?"Due":"",date:a.date,time:a.time})}return n.sort((a,s)=>a.date.localeCompare(s.date)||a.time.localeCompare(s.time)||a.heading.localeCompare(s.heading)),n}function ge(e){const t={present:0,absent:0,late:0,total:e.length};for(const n of e)n.marked==="absent"?t.absent+=1:n.marked==="late"?t.late+=1:t.present+=1;return t}function Oe(e){if(e.total===0)return"Nobody on the roll for this class yet.";if(e.absent===0&&e.late===0)return`All ${e.total} present. Tap anyone who is not here.`;const t=[`${e.present} present`];return e.absent&&t.push(`${e.absent} absent`),e.late&&t.push(`${e.late} late`),`${t.join(" · ")} of ${e.total}.`}function yt(e){return e===null||e==="present"?"absent":e==="absent"?"late":"present"}function xe(e){return e==="absent"?"Absent":e==="late"?"Late":"Present"}function gt(e,t){const n=a=>a.slice(0,10);return!(n(e.started_at)>t||e.ended_at&&n(e.ended_at)<t)}function O(e){const t=e<0?"-":"",n=Math.abs(e),a=Math.floor(n/100),s=String(n%100).padStart(2,"0"),o=String(a).replace(/\B(?=(\d{3})+(?!\d))/g,",");return`${t}LKR ${o}.${s}`}function we(e){const t={netCents:0,paidCents:0,reversedCents:0,adjustedCents:0,eventCount:e.length};for(const n of e)t.netCents+=n.amount_cents,n.kind==="payment"?t.paidCents+=n.amount_cents:n.kind==="reversal"?t.reversedCents+=n.amount_cents:t.adjustedCents+=n.amount_cents;return t}function wt(e){const t=[...e].sort((a,s)=>a.effective_on.localeCompare(s.effective_on));let n=0;return t.map(a=>(n+=a.amount_cents,{runningCents:n,event:a}))}function Pe(e){return e==="payment"?"Payment":e==="reversal"?"Reversed":"Adjustment"}function $e(e){return e?{cash:"Cash",bank_transfer:"Bank transfer",card:"Card",online:"Online",other:"Other"}[e]??e:""}const Ue=[[26,10,1],[44,16,1],[70,26,1],[100,18,2],[134,24,2],[172,16,4]],ce=new Uint8Array(512),De=new Uint8Array(256);{let e=1;for(let t=0;t<255;t+=1)ce[t]=e,De[e]=t,e<<=1,e&256&&(e^=285);for(let t=255;t<512;t+=1)ce[t]=ce[t-255]}const nt=(e,t)=>e&&t?ce[De[e]+De[t]]:0;function $t(e){let t=new Uint8Array([1]);for(let n=0;n<e;n+=1){const a=new Uint8Array(t.length+1);for(let s=0;s<t.length;s+=1)a[s]^=nt(t[s],ce[n]),a[s+1]^=t[s];t=a}return t}function kt(e,t){const n=$t(t).reverse(),a=new Uint8Array(t);for(const s of e){const o=s^a[0];a.copyWithin(0,1),a[t-1]=0;for(let i=0;i<t;i+=1)a[i]^=nt(n[i+1],o)}return a}function St(e){for(let t=1;t<=Ue.length;t+=1){const[n,a,s]=Ue[t-1],o=n-a*s;if(e.length+2>o)continue;const i=new Uint8Array(o);let c=0;const d=(l,p)=>{for(let w=p-1;w>=0;w-=1)l&1<<w&&(i[c>>3]|=128>>(c&7)),c+=1};d(4,4),d(e.length,8);for(const l of e)d(l,8);let v=236;for(let l=Math.ceil(c/8);l<o;l+=1)i[l]=v,v=v===236?17:236;const u=o/s,_=[],h=[];for(let l=0;l<s;l+=1){const p=i.slice(l*u,(l+1)*u);_.push(p),h.push(kt(p,a))}const y=new Uint8Array(n);let r=0;for(let l=0;l<u;l+=1)for(const p of _)y[r++]=p[l];for(let l=0;l<a;l+=1)for(const p of h)y[r++]=p[l];return{stream:y,version:t}}return null}const Et={2:[6,18],3:[6,22],4:[6,26],5:[6,30],6:[6,34]};function Ct(e){const t=0|e;let n=t<<10;for(let a=14;a>=10;a-=1)n&1<<a&&(n^=1335<<a-10);return(t<<10|n)^21522}function xt(e){const t=St(new TextEncoder().encode(e));if(!t)return null;const{stream:n,version:a}=t,s=17+a*4,o=Array.from({length:s},()=>Array(s).fill(null)),i=(r,l,p)=>{o[r][l]=p},c=(r,l)=>{for(let p=-1;p<=7;p+=1)for(let w=-1;w<=7;w+=1){const E=r+p,C=l+w;if(E<0||C<0||E>=s||C>=s)continue;const B=p>=0&&p<=6&&w>=0&&w<=6&&(p===0||p===6||w===0||w===6),j=p>=2&&p<=4&&w>=2&&w<=4;i(E,C,B||j)}};c(0,0),c(0,s-7),c(s-7,0);for(let r=8;r<s-8;r+=1)i(6,r,r%2===0),i(r,6,r%2===0);const d=Et[a]??[];for(const r of d)for(const l of d)if(o[r][l]===null)for(let p=-2;p<=2;p+=1)for(let w=-2;w<=2;w+=1)i(r+p,l+w,Math.max(Math.abs(p),Math.abs(w))!==1);i(s-8,8,!0);const v=Ct(0),u=r=>(v>>r&1)===1;for(let r=0;r<=5;r+=1)i(8,r,u(14-r));i(8,7,u(8)),i(8,8,u(7)),i(7,8,u(6));for(let r=0;r<=5;r+=1)i(5-r,8,u(5-r));for(let r=0;r<=6;r+=1)i(s-1-r,8,u(14-r));for(let r=0;r<=7;r+=1)i(8,s-8+r,u(7-r));let _=0;const h=n.length*8;let y=!0;for(let r=s-1;r>0;r-=2){r===6&&(r-=1);for(let l=0;l<s;l+=1){const p=y?s-1-l:l;for(const w of[r,r-1]){if(o[p][w]!==null)continue;let E=!1;_<h&&(E=(n[_>>3]>>7-(_&7)&1)===1,_+=1),(p+w)%2===0&&(E=!E),i(p,w,E)}}y=!y}return o}function Dt(e,t){const n=xt(e);if(!n)return null;const a=n.length,s=4,o=a+s*2;let i="";for(let c=0;c<a;c+=1)for(let d=0;d<a;d+=1)n[c][d]&&(i+=`M${d+s} ${c+s}h1v1h-1z`);return`<svg viewBox="0 0 ${o} ${o}" role="img" aria-label="${t}"
    shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="${i}"/></svg>`}const at=e=>e.status==="active"&&e.ended_at===null;function It(e){const t=new Map;for(const a of[...e].sort((s,o)=>s.marked_at===o.marked_at?s.class_session_id.localeCompare(o.class_session_id):s.marked_at<o.marked_at?-1:1))t.set(`${a.class_session_id}|${a.enrolment_id}`,a);const n=new Map;for(const[a,s]of t)n.set(a,s.state);return n}function Tt(e,t,n){const a=It(t);return n.filter(at).filter(s=>{const o=e.filter(i=>i.batch_id===s.batch_id&&i.held_on>=s.started_at.slice(0,10)).sort((i,c)=>c.held_on.localeCompare(i.held_on));return o.length<2?!1:o.slice(0,2).every(i=>a.get(`${i.id}|${s.id}`)==="absent")})}function At(e,t,n,a,s){const o=new Set(t.map(c=>c.enrolment_id)),i=new Date(`${s}T00:00:00Z`).getTime()-30*864e5;return a.filter(at).filter(c=>new Date(c.started_at).getTime()>i||o.has(c.id)||n.has(c.id)?!1:e.some(d=>d.batch_id===c.batch_id&&d.held_on>=c.started_at.slice(0,10)))}const jt="batch-offline",Bt=1;function Lt(){return new Promise((e,t)=>{const n=indexedDB.open(jt,Bt);n.onupgradeneeded=()=>{const a=n.result;a.objectStoreNames.contains("cache")||a.createObjectStore("cache",{keyPath:"key"}),a.objectStoreNames.contains("outbox")||a.createObjectStore("outbox",{keyPath:"id",autoIncrement:!0}).createIndex("by_status","status")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}function me(e,t,n){return Lt().then(a=>new Promise((s,o)=>{const i=a.transaction(e,t),c=n(i.objectStore(e));c.onsuccess=()=>s(c.result),c.onerror=()=>o(c.error),i.oncomplete=()=>a.close()}))}async function be(e,t){await me("cache","readwrite",n=>n.put({key:e,value:t,savedAt:new Date().toISOString()}))}async function ye(e){return await me("cache","readonly",n=>n.get(e))??null}async function qt(e){await me("outbox","readwrite",t=>t.add({...e,status:"pending",attempts:0,lastError:"",createdAt:new Date().toISOString()}))}async function st(){return(await me("outbox","readonly",t=>t.getAll())).sort((t,n)=>(t.id??0)-(n.id??0))}async function ke(e){await me("outbox","readwrite",t=>t.put(e))}async function Nt(e){const t=(await st()).filter(s=>s.status==="pending"),n=new Map;for(const s of t){const o=n.get(s.lane)??[];o.push(s),n.set(s.lane,o)}const a={delivered:0,failed:[],heldBack:0};return await Promise.all([...n.entries()].map(async([,s])=>{let o=!1;for(const i of s){if(o){a.heldBack+=1;continue}let c;try{c=await e(i)}catch(d){c={result:"unavailable",detail:String(d)}}i.attempts+=1,c.result==="ok"?(i.status="done",await ke(i),a.delivered+=1):c.result==="rejected"?(i.status="failed",i.lastError=c.detail??"rejected",await ke(i),a.failed.push({lane:i.lane,kind:i.kind,detail:i.lastError})):(i.lastError=c.detail??"unavailable",await ke(i),o=!0,a.heldBack+=1)}})),a}const q=864e5,ve=()=>new Date,_e=e=>e.toISOString(),N=e=>new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Colombo"}).format(e),S=(e,t)=>`${N(new Date(Date.now()+e*q))}T${t}:00+05:30`,Fe=new Date().getDay(),k="11111111-1111-4111-8111-111111111111",b=e=>`00000000-0000-4000-8000-${String(e).padStart(12,"0")}`,L=b(101),He=b(102),he=b(103),J=new Map([["Amaya (Demo Student)",b(201)],["Bimsara (Demo Student)",b(202)],["Chatura (Demo Student)",b(203)],["Dilki (Demo Student)",b(204)]]),ne=b(201),de=b(301),We=b(302),Se=b(401),le=b(402),Rt=b(403),Mt=b(501),Ze=b(601),Ot=b(602),R={tenants:[{id:k,name:"Nimal Perera (Demo Teacher)"}],batches:[{id:L,tenant_id:k,label:"2027 A/L Chemistry (Demo)",location:"Panadura",archived_at:null,created_at:S(-30,"10:00")},{id:He,tenant_id:k,label:"2027 A/L Physics (Demo)",location:"Moratuwa",archived_at:null,created_at:S(-20,"10:00")},{id:he,tenant_id:k,label:"Revision Class (Demo)",location:"Panadura",archived_at:null,created_at:S(-5,"10:00")}],batch_schedules:[{id:b(111),tenant_id:k,batch_id:L,weekday:Fe,start_time:"16:00",duration_minutes:120,location:"Panadura",effective_from:N(new Date(Date.now()-60*q)),effective_until:null,active:!0},{id:b(112),tenant_id:k,batch_id:He,weekday:(Fe+1)%7,start_time:"09:00",duration_minutes:90,location:"Moratuwa",effective_from:N(new Date(Date.now()-60*q)),effective_until:null,active:!0}],schedule_exceptions:[],enrolments:[...J.entries()].flatMap(([e,t],n)=>[{id:t,tenant_id:k,batch_id:L,student_id:b(900+n),display_name:e,guardian_phone:"07x xxx xxxx (demo)",teacher_reference:"",status:"active",started_at:S(n===3?-2:-28+n,"10:00"),ended_at:null,version:1}]).concat([{id:b(205),tenant_id:k,batch_id:L,student_id:b(905),display_name:"Eshan (Demo Student)",guardian_phone:"",teacher_reference:"",status:"active",started_at:S(-40,"10:00"),ended_at:null,version:1}]),student_private_items:[{id:b(701),kind:"deadline",title:"History essay (your own)",subject_label:"History",starts_at:null,due_at:S(0,"21:00"),estimated_minutes:40,deleted_at:null},{id:b(702),kind:"external_class",title:"Kandy maths class (your own)",subject_label:"Maths",starts_at:S(2,"08:00"),due_at:null,estimated_minutes:90,deleted_at:null}],next_actions:[{id:Mt,tenant_id:k,batch_id:L,title:"Finish the electrolysis worksheet",estimated_minutes:8,due_at:S(0,"20:00"),result_visibility:"teacher_sees_completion",topic_id:le}],student_profiles:[{student_id:b(900),preferences:{minutes:8}}],canonical_topics:[{id:Se,name:"Organic chemistry",sort_order:1},{id:le,name:"Electrolysis",sort_order:2},{id:Rt,name:"Kinematics",sort_order:3}],topic_assertions:[{id:b(801),tenant_id:k,enrolment_id:ne,topic_id:le,assertion_type:"teacher_observed",value:{},occurred_at:S(-3,"18:00"),supersedes:null},{id:b(804),tenant_id:k,enrolment_id:ne,topic_id:le,assertion_type:"retrieval_success",value:{correct:4,total:5},occurred_at:S(-1,"20:00"),supersedes:null},{id:b(802),tenant_id:k,enrolment_id:ne,topic_id:Se,assertion_type:"student_self_assessment",value:{feeling:"shaky"},occurred_at:S(-2,"19:00"),supersedes:null},{id:b(803),tenant_id:k,enrolment_id:ne,topic_id:Se,assertion_type:"attended_instruction",value:{},occurred_at:S(-9,"18:00"),supersedes:null}],honours:[{kind:"topic_shown",subject:le,earned_on:N(new Date(Date.now()-7*q)),tenant_id:k},{kind:"month_kept_up",subject:N(new Date(Date.now()-31*q)).slice(0,7),earned_on:N(new Date(Date.now()-21*q)),tenant_id:k},{kind:"came_back",subject:"",earned_on:N(new Date(Date.now()-14*q)),tenant_id:k}],class_sessions:[{id:de,tenant_id:k,batch_id:L,held_on:N(new Date(Date.now()-7*q)),coverage_note:"Electrolysis: Faraday laws worked examples",completed_by:b(999)},{id:We,tenant_id:k,batch_id:L,held_on:N(new Date(Date.now()-14*q)),coverage_note:"Organic chemistry: naming",completed_by:b(999)}],attendance_marks:[{id:b(311),tenant_id:k,batch_id:L,class_session_id:de,enrolment_id:ne,state:"present",note:"",marked_by:b(999),marked_at:S(-7,"16:05"),created_at:S(-7,"16:05")},{id:b(312),tenant_id:k,batch_id:L,class_session_id:de,enrolment_id:J.get("Bimsara (Demo Student)"),state:"absent",note:"",marked_by:b(999),marked_at:S(-7,"16:05"),created_at:S(-7,"16:05")},{id:b(313),tenant_id:k,batch_id:L,class_session_id:de,enrolment_id:J.get("Bimsara (Demo Student)"),state:"present",note:"came in late, corrected",marked_by:b(999),marked_at:S(-7,"16:20"),created_at:S(-7,"16:20")},{id:b(314),tenant_id:k,batch_id:L,class_session_id:We,enrolment_id:J.get("Chatura (Demo Student)"),state:"absent",note:"",marked_by:b(999),marked_at:S(-14,"16:05"),created_at:S(-14,"16:05")},{id:b(315),tenant_id:k,batch_id:L,class_session_id:de,enrolment_id:J.get("Chatura (Demo Student)"),state:"absent",note:"",marked_by:b(999),marked_at:S(-7,"16:06"),created_at:S(-7,"16:06")}],fee_events:[{id:b(321),tenant_id:k,batch_id:L,enrolment_id:ne,kind:"payment",amount_cents:25e4,method:"cash",reference:"demo-0001",effective_on:N(new Date(Date.now()-6*q)),note:"",reverses_id:null,recorded_at:S(-6,"17:00")},{id:b(322),tenant_id:k,batch_id:L,enrolment_id:J.get("Chatura (Demo Student)"),kind:"payment",amount_cents:25e4,method:"transfer",reference:"demo-0002",effective_on:N(new Date(Date.now()-6*q)),note:"",reverses_id:null,recorded_at:S(-6,"17:05")},{id:b(323),tenant_id:k,batch_id:L,enrolment_id:J.get("Chatura (Demo Student)"),kind:"reversal",amount_cents:-25e4,method:"transfer",reference:"demo-0002",effective_on:N(new Date(Date.now()-5*q)),note:"recorded against the wrong student (demo)",reverses_id:b(322),recorded_at:S(-5,"09:00")},{id:b(324),tenant_id:k,batch_id:L,enrolment_id:J.get("Chatura (Demo Student)"),kind:"payment",amount_cents:25e4,method:"cash",reference:"demo-0003",effective_on:N(new Date(Date.now()-4*q)),note:"recorded again, correctly",reverses_id:null,recorded_at:S(-4,"17:00")}],prompts:[{id:Ze,tenant_id:k,kind:"recall",active:!0}],prompt_versions:[{id:Ot,prompt_id:Ze,version:1,question:"In electrolysis of molten NaCl, what forms at the cathode?",answer_key:"Sodium metal. Na+ ions gain electrons (reduction) at the cathode."}],prompt_completions:[]};function Pt(){const e=new Map;for(const t of[...R.attendance_marks].sort((n,a)=>n.marked_at===a.marked_at?String(n.id).localeCompare(String(a.id)):n.marked_at<a.marked_at?-1:1))e.set(`${t.class_session_id}|${t.enrolment_id}`,t);return[...e.values()]}const ae=()=>sessionStorage.getItem("tudent-demo-offline")==="1";function Ge(e){if(e==="attendance_current")return Pt().filter(a=>!0);const t=R[e];if(!t)throw new Error(`demo client: no fixture table "${e}". Add it; do not let the demo invent an answer.`);const n=null;return n?t.filter(n):t}const Ut={class_sessions:"class_session_id",enrolments:"enrolment_id",batches:"batch_id"};function Ft(e,t){var a;const n={...e};for(const s of t.matchAll(/([a-z_]+)\(([a-z_,]+)\)/g)){const[,o,i]=s,c=Ut[o],d=(a=R[o])==null?void 0:a.find(v=>v.id===e[c]);n[o]=d?Object.fromEntries(i.split(",").map(v=>[v,d[v]])):null}return n}class Ht{constructor(t){this.table=t,this.filters=[],this.orderBy=null,this.limitN=null,this.selectCols="*",this.mode="select",this.payload=null,this.wantSingle=!1,this.wantMaybe=!1}select(t="*"){return this.selectCols=t,this}eq(t,n){return this.filters.push(a=>String(a[t])===String(n)),this}neq(t,n){return this.filters.push(a=>String(a[t])!==String(n)),this}is(t,n){return this.filters.push(a=>a[t]===n),this}in(t,n){const a=new Set(n.map(String));return this.filters.push(s=>a.has(String(s[t]))),this}gte(t,n){return this.filters.push(a=>a[t]>=n),this}lte(t,n){return this.filters.push(a=>a[t]<=n),this}gt(t,n){return this.filters.push(a=>a[t]>n),this}lt(t,n){return this.filters.push(a=>a[t]<n),this}order(t,n){return this.orderBy={col:t,asc:(n==null?void 0:n.ascending)!==!1},this}limit(t){return this.limitN=t,this}single(){return this.wantSingle=!0,this}maybeSingle(){return this.wantSingle=!0,this.wantMaybe=!0,this}insert(t){return this.mode="insert",this.payload=t,this}update(t){return this.mode="update",this.payload=t,this}run(){var t;if(ae())return{data:null,error:{message:"Failed to fetch (demo offline)"},status:0};try{if(this.mode==="insert"){const o=(Array.isArray(this.payload)?this.payload:[this.payload]).map(c=>({id:crypto.randomUUID(),created_at:_e(ve()),...c}));return(R[t=this.table]??(R[t]=[])).push(...o),{data:this.wantSingle?o[0]:o,error:null,status:201}}if(this.mode==="update"){const s=Ge(this.table).filter(o=>this.filters.every(i=>i(o)));for(const o of s)Object.assign(o,this.payload);return{data:s,error:null,status:200}}let n=Ge(this.table).filter(s=>this.filters.every(o=>o(s)));if(this.orderBy){const{col:s,asc:o}=this.orderBy;n=[...n].sort((i,c)=>(i[s]<c[s]?-1:i[s]>c[s]?1:0)*(o?1:-1))}this.limitN!==null&&(n=n.slice(0,this.limitN));const a=n.map(s=>Ft(s,this.selectCols));return this.wantSingle?a.length===1?{data:a[0],error:null,status:200}:a.length===0&&this.wantMaybe?{data:null,error:null,status:200}:{data:null,error:{message:`single() saw ${a.length} rows`},status:406}:{data:a,error:null,status:200}}catch(n){return{data:null,error:{message:String(n.message)},status:500}}}then(t,n){return Promise.resolve(this.run()).then(t,n)}}const pe="tudent-demo-signed-in";function Wt(){return{id:b(900),email:"amaya.demo@example.com",user_metadata:{full_name:"Amaya (Demo Student)"}}}function Ee(){return sessionStorage.getItem(pe)==="1"?{access_token:"demo-token",user:Wt()}:null}const Zt={async getSession(){return{data:{session:Ee()},error:null}},async getUser(){var e;return{data:{user:((e=Ee())==null?void 0:e.user)??null},error:null}},onAuthStateChange(e){return{data:{subscription:{unsubscribe(){}}}}},async signInWithOAuth(e){var n;sessionStorage.setItem(pe,"1");const t=((n=e==null?void 0:e.options)==null?void 0:n.redirectTo)??`${location.origin}${location.pathname}#week`;return location.href=t,location.reload(),{data:{},error:null}},async signInWithPassword(){return sessionStorage.setItem(pe,"1"),{data:{session:Ee()},error:null}},async signOut(){return sessionStorage.removeItem(pe),{error:null}}};function Gt(e,t){const n=(a=null)=>Promise.resolve({data:a,error:null,status:200});if(ae())return Promise.resolve({data:null,error:{message:"Failed to fetch (demo offline)"},status:0});switch(e){case"record_event":case"report_client_error":return n();case"ensure_student_account":return n();case"record_attendance_mark":{const a=t;if(R.attendance_marks.some(o=>o.id===a.p_mark_id))return n(a.p_mark_id);let s=R.class_sessions.find(o=>o.batch_id===a.p_batch&&o.held_on===a.p_held_on);return s||(s={id:crypto.randomUUID(),tenant_id:k,batch_id:a.p_batch,held_on:a.p_held_on,coverage_note:"",completed_by:b(999)},R.class_sessions.push(s)),R.attendance_marks.push({id:a.p_mark_id,tenant_id:k,batch_id:a.p_batch,class_session_id:s.id,enrolment_id:a.p_enrolment,state:a.p_state,note:a.p_note??"",marked_by:b(999),marked_at:a.p_marked_at??_e(ve()),created_at:_e(ve())}),n(a.p_mark_id)}default:throw new Error(`demo client: no rpc fixture for "${e}"`)}}const zt=window.fetch.bind(window);window.fetch=(e,t)=>{var o;const a=(o=(typeof e=="string"?e:e instanceof URL?e.href:e.url).match(/functions\/v1\/([a-z-]+)/))==null?void 0:o[1];if(!a)return zt(e,t);if(ae())return Promise.reject(new TypeError("Failed to fetch (demo offline)"));const s=(i,c={})=>Promise.resolve(new Response(JSON.stringify(c),{status:i,headers:{"Content-Type":"application/json"}}));if(a==="join-opened")return Promise.resolve(new Response(null,{status:204}));if(a==="bill")return s(200,{outcome:"ok"});if(a==="join"){const i=JSON.parse(String((t==null?void 0:t.body)??"{}")),c=R.batches.find(d=>d.id===he);if(i.action==="preview"&&!["DEMO2GETHER","DEMOROTATED"].includes(String(i.code??"").toUpperCase()))return s(404,{error:"invalid_code"});if(i.action==="preview")return s(200,{batch_label:c.label,teacher_name:"Nimal Perera (Demo Teacher)",location:c.location});if(i.action==="redeem")return R.enrolments.some(d=>d.batch_id===he&&d.id===b(299))||R.enrolments.push({id:b(299),tenant_id:k,batch_id:he,student_id:b(900),display_name:"Amaya (Demo Student)",guardian_phone:"",teacher_reference:"",status:"active",started_at:_e(ve()),ended_at:null,version:1}),s(200,{batch_label:c.label});if(i.action==="create"||i.action==="rotate"){const d=sessionStorage.getItem("demo-rotated")==="1";i.action==="rotate"&&sessionStorage.setItem("demo-rotated",d?"0":"1");const v=(i.action==="rotate"?!d:d)?"DEMOROTATED":"DEMO2GETHER";return s(200,{code:v,batch_label:c.label})}return s(200,{})}return s(404,{})};function ze(){const e=document.createElement("div");e.setAttribute("data-demo-ribbon",""),e.style.cssText="position:fixed;bottom:0;left:0;right:0;z-index:9999;display:flex;gap:10px;align-items:center;justify-content:center;background:#1a4059;color:#fff;font:12px/1.2 -apple-system,system-ui,sans-serif;padding:8px 12px calc(8px + env(safe-area-inset-bottom, 0px));";const t=(o,i)=>{const c=document.createElement("button");return c.textContent=o,c.style.cssText=`font:inherit;border:1px solid rgba(255,255,255,.4);background:${i?"#fff":"transparent"};color:${i?"#1a4059":"#fff"};border-radius:999px;padding:3px 10px;cursor:pointer;`,c},n=document.createElement("span");n.textContent="Demo. Seeded pretend data, nothing here is real.";const a=t(ae()?"Back online":"Try offline",ae());a.addEventListener("click",()=>{sessionStorage.setItem("tudent-demo-offline",ae()?"0":"1"),location.reload()}),e.append(n,a),e.style.flexWrap="wrap",document.body.append(e);const s=()=>{document.body.style.paddingBottom=`${e.offsetHeight+8}px`};s(),new ResizeObserver(s).observe(e)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ze):ze();function Kt(e,t){return{auth:Zt,rpc:Gt,from:n=>new Ht(n),functions:{invoke:async n=>({data:null,error:{message:"demo: use fetch path"}})}}}const Vt="",Yt="",g=Kt(),ot=crypto.randomUUID();async function Z(e,t){try{await g.rpc("report_client_error",{p_correlation_id:ot,p_app:"teacher",p_code:e.slice(0,64),p_message:t.slice(0,500)})}catch{}}window.addEventListener("error",e=>{Z("window_error",String(e.message??"unknown"))});window.addEventListener("unhandledrejection",e=>{Z("unhandled_rejection",String(e.reason??"unknown"))});async function Jt(){const{data:e,error:t}=await g.from("tenants").select("id,name").limit(1);if(!t&&e){const a=e[0]??null;return a&&await be("tenant",a),a}const n=await ye("tenant");return n?n.value:null}async function Qt(e){var a;const{data:t}=await g.auth.getSession(),n=await fetch(`${Vt}/functions/v1/join`,{method:"POST",headers:{"Content-Type":"application/json",apikey:Yt,Authorization:`Bearer ${((a=t.session)==null?void 0:a.access_token)??""}`,"x-correlation-id":ot},body:JSON.stringify(e)});return{status:n.status,json:await n.json().catch(()=>({}))}}function Ce(e,t={}){g.rpc("record_event",{p_correlation_id:crypto.randomUUID(),p_event_type:e,p_props:t}).then(({error:n})=>{n&&Z("telemetry",`${e}: ${n.message}`)})}const Xt={batchId:"all",status:"active",query:"",sort:"name",desc:!1},Ie=new Set(["withdrawn","transferred","completed"]);function Ke(e,t){const n=t.query.trim().toLowerCase(),a=e.filter(s=>!(t.batchId!=="all"&&s.batch_id!==t.batchId||t.status==="active"&&Ie.has(s.status)||t.status==="ended"&&!Ie.has(s.status)||n&&!`${s.display_name} ${s.teacher_reference} ${s.guardian_phone}`.toLowerCase().includes(n)));return a.sort((s,o)=>{let i=0;return t.sort==="name"?i=s.display_name.localeCompare(o.display_name):t.sort==="joined"?i=s.started_at.localeCompare(o.started_at):i=s.status.localeCompare(o.status),(t.desc?-i:i)||s.id.localeCompare(o.id)}),a}function je(e){const t=e.trim().split(/\s+/).filter(Boolean);if(t.length===0)return"?";const n=t[0][0]??"",a=t.length>1?t[t.length-1][0]??"":"";return(n+a).toUpperCase()}function H(e){return new Date(e).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric",timeZone:"Asia/Colombo"})}function se(e){return Ie.has(e)}function en(e,t){const n=o=>`"${String(o).replaceAll('"','""')}"`,a=["Name","Class","Reference","Guardian phone","Status","Joined"],s=e.map(o=>[o.display_name,t(o.batch_id),o.teacher_reference,o.guardian_phone,o.status,o.started_at.slice(0,10)].map(n).join(","));return[a.map(n).join(","),...s].join(`
`)}async function it(){const e=await ye("roster"),{data:t,error:n}=await g.from("enrolments").select("id,tenant_id,batch_id,display_name,guardian_phone,teacher_reference,status,started_at,ended_at");if(n||t===null){if(e)return{rows:e.value,fromCache:!0,savedAt:e.savedAt};throw new Error((n==null?void 0:n.message)??"roster unavailable")}const a=t;return await be("roster",a),{rows:a,fromCache:!1,savedAt:null}}async function tn(e,t){const{error:n}=await g.from("enrolments").update(t).eq("id",e);if(n)throw new Error(n.message)}async function nn(e){const{error:t}=await g.from("enrolments").update({status:"withdrawn",ended_at:new Date().toISOString()}).eq("id",e);if(t)throw new Error(t.message)}const Ve=(e,t)=>`roll:${e}:${t}`;function Ye(e,t){if(e.error)throw new Error(`${t}: ${e.error.message}`);if(e.data===null)throw new Error(`${t}: no data`);return e.data}async function an(e,t){return(await st()).filter(a=>a.kind==="attendance_mark"&&a.payload.held_on===t&&a.payload.batch_id===e)}async function sn(e,t){const n=await an(e,t),a=n.filter(i=>i.status==="pending").length,s=n.filter(i=>i.status==="failed").map(i=>({enrolmentId:String(i.payload.enrolment_id??""),detail:i.lastError})),o=await ye(Ve(e,t));try{const i=Ye(await g.from("enrolments").select("id,display_name,started_at,ended_at").eq("batch_id",e),"roll enrolments"),c=await g.from("class_sessions").select("id").eq("batch_id",e).eq("held_on",t).maybeSingle();if(c.error)throw new Error(`roll session: ${c.error.message}`);const d=c.data?Ye(await g.from("attendance_current").select("enrolment_id,state,note").eq("class_session_id",c.data.id),"roll marks"):[],v=new Map(d.map(_=>[_.enrolment_id,_])),u=i.filter(_=>gt(_,t)).map(_=>{var h,y;return{enrolment_id:_.id,display_name:_.display_name,marked:((h=v.get(_.id))==null?void 0:h.state)??null,note:((y=v.get(_.id))==null?void 0:y.note)??""}}).sort(on);return await be(Ve(e,t),u),{rows:Je(u,n),fromCache:!1,savedAt:null,pendingCount:a,failed:s}}catch(i){if(!o)throw i;return{rows:Je(o.value,n),fromCache:!0,savedAt:o.savedAt,pendingCount:a,failed:s}}}const on=(e,t)=>e.display_name.localeCompare(t.display_name)||e.enrolment_id.localeCompare(t.enrolment_id);function Je(e,t){const n=new Map;for(const a of t){if(a.status==="failed")continue;const s=a.payload;s.enrolment_id&&s.state&&n.set(s.enrolment_id,s.state)}return n.size===0?e:e.map(a=>n.has(a.enrolment_id)?{...a,marked:n.get(a.enrolment_id)}:a)}async function rn(e){await qt({lane:e.enrolmentId,kind:"attendance_mark",idempotencyKey:crypto.randomUUID(),payload:{tenant_id:e.tenantId,batch_id:e.batchId,held_on:e.heldOn,enrolment_id:e.enrolmentId,state:e.state,note:e.note??"",marked_at:new Date().toISOString()}})}async function dn(e){const t=e.payload;try{const{error:n}=await g.rpc("record_attendance_mark",{p_mark_id:e.idempotencyKey,p_tenant:t.tenant_id,p_batch:t.batch_id,p_held_on:t.held_on,p_enrolment:t.enrolment_id,p_state:t.state,p_note:t.note??"",p_marked_at:t.marked_at??null});if(!n)return{result:"ok"};const a=n.status,s=n.code??"";return typeof a=="number"&&a>=400||/^[0-9A-Z]{5}$/.test(s)?{result:"rejected",detail:`${s||a}: ${n.message}`}:{result:"unavailable",detail:n.message}}catch(n){return{result:"unavailable",detail:String(n)}}}async function Qe(){const e=await Nt(dn);e.delivered>0&&Ce("offline_sync_succeeded",{items:e.delivered});for(const t of e.failed)Ce("offline_sync_failed",{reason:"rejected"});return e.heldBack>0&&e.delivered===0&&e.failed.length===0&&Ce("offline_sync_failed",{reason:"unavailable"}),e}async function ln(e){const t=await g.from("attendance_marks").select("state,note,marked_at,class_sessions(held_on)").eq("enrolment_id",e).order("marked_at",{ascending:!1});if(t.error)throw new Error(t.error.message);return(t.data??[]).map(n=>{const a=n.class_sessions;return{state:n.state,note:n.note??"",marked_at:n.marked_at,held_on:(a==null?void 0:a.held_on)??""}})}async function cn(){const{data:e,error:t}=await g.from("fee_events").select("id,enrolment_id,kind,amount_cents,effective_on,method,reference,note,reverses_id,recorded_at").order("effective_on",{ascending:!1}).order("recorded_at",{ascending:!1});if(t)throw new Error(t.message);return e??[]}async function Xe(e){if(!Number.isInteger(e.amountCents))throw new Error("Amounts are whole cents.");const{error:t}=await g.from("fee_events").insert({id:crypto.randomUUID(),tenant_id:e.tenantId,enrolment_id:e.enrolmentId,kind:e.kind,amount_cents:e.amountCents,currency:"LKR",effective_on:e.effectiveOn,method:e.method??null,reference:e.reference??"",note:e.note??"",reverses_id:e.reversesId??null,recorded_by:e.recordedBy});if(t)throw new Error(Te(t.message))}function Te(e){return/fetch|network|Failed to fetch|NetworkError/i.test(e)?"You are offline, so this has NOT been recorded. Payments need a connection, because a receipt should never be a promise the ledger has not accepted yet. Nothing was saved; record it again when you have signal.":e.includes("fee_before_enrolment")?"That date is before this student joined. Check the date.":e.includes("reversal_must_match_original")?"A reversal has to undo the whole payment. For part of it, record an adjustment instead.":e.includes("cannot_reverse_a_reversal")?"That is already a reversal. To put the money back, record a new payment.":e.includes("fee_events_one_reversal_per_event")?"That payment has already been reversed.":e.includes("duplicate key")?"That was already recorded. Nothing was charged twice.":e.includes("violates check constraint")?"Check the amount and the method. A payment needs both, and cannot be zero.":e}function un(e){return{kind:"reversal",amountCents:-e.amount_cents,reversesId:e.id}}const x=document.getElementById("app"),Be=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];let P=null;function f(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function W(){return new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Colombo"}).format(new Date)}"serviceWorker"in navigator&&navigator.serviceWorker.register("./sw.js");function oe(){const e=location.hash.slice(1)||"batches";(async()=>{const{data:t}=await g.auth.getSession();if(!t.session)return mn();if(P===null&&(P=await Jt()),P===null)return hn();if(e==="batches")return pn();if(e==="roster")return rt();if(e==="fees")return Ae();if(e==="new")return vn();const n=e.match(/^batch\/([0-9a-f-]+)\/roll\/(\d{4}-\d{2}-\d{2})$/);if(n)return gn(n[1],n[2]);const a=e.match(/^batch\/([0-9a-f-]+)(\/preview)?$/);if(a)return a[2]?bn(a[1]):fe(a[1]);location.hash="batches"})().catch(t=>{console.error("[route]",e,t),Z("route_error",String(t)),x.innerHTML=`<div class="page"><p class="error">Something went wrong. Pull down is disabled, so use this instead:</p>
      <button class="btn" onclick="location.reload()">Reload</button></div>`})}window.addEventListener("hashchange",oe);function Y(e,t,n){x.innerHTML=`
    <header class="topbar">
      ${n!==void 0?`<button class="back" data-nav="${n}">Back</button>`:""}
      <h1>${f(e)}</h1>
    </header>
    <main class="page">${t}</main>`,x.querySelectorAll("[data-nav]").forEach(a=>a.addEventListener("click",()=>{location.hash=a.dataset.nav}))}function mn(){var t;x.innerHTML=`
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
    </div>`;let e=!1;document.getElementById("google-btn").addEventListener("click",()=>{e||(e=!0,document.getElementById("auth-status").textContent="Opening Google...",g.auth.signInWithOAuth({provider:"google",options:{redirectTo:`${location.origin}${location.pathname}`}}).then(({error:n})=>{if(n){const a=document.getElementById("auth-error");a.hidden=!1,a.textContent="Google sign-in did not finish.",document.getElementById("auth-status").textContent=""}}).finally(()=>{e=!1}))}),(t=document.getElementById("local-rail"))==null||t.addEventListener("submit",n=>{n.preventDefault();const a=new FormData(n.target);g.auth.signInWithPassword({email:String(a.get("email")),password:String(a.get("password"))}).then(({error:s})=>{if(s){const o=document.getElementById("auth-error");o.hidden=!1,o.textContent="That did not work. Check the email and password."}else P=null,oe()})})}function hn(){Y("Batch",`
    <p class="lede">Almost there</p>
    <p class="hint">This account is not linked to a teaching account yet. Ask Business Booster to set that up, then sign in again.</p>
    <button class="btn" id="out">Sign out</button>`),document.getElementById("out").addEventListener("click",()=>{g.auth.signOut().then(()=>{P=null,oe()})})}async function pn(){const e=W(),t=e.slice(0,8)+"01",n=new Date(Date.now()-60*864e5).toISOString().slice(0,10),[{data:a},{data:s},{data:o},{data:i},{data:c},{data:d}]=await Promise.all([g.from("batches").select("id,label,exam_year,location,mode,archived_at,tenant_id").is("archived_at",null).order("created_at"),g.from("batch_schedules").select("*"),g.from("enrolments").select("id,batch_id,display_name,status,started_at,ended_at"),g.from("class_sessions").select("id,batch_id,held_on").gte("held_on",n).lte("held_on",e),g.from("fee_events").select("enrolment_id,kind,amount_cents,effective_on").gte("effective_on",t),g.from("fee_events").select("enrolment_id")]),v=a??[],u=o??[],_=u.filter(m=>!se(m.status)),h=i??[],y=c??[],r=tt((s??[]).map(m=>({id:String(m.id),batchId:String(m.batch_id),weekday:Number(m.weekday),startTime:String(m.start_time),durationMinutes:Number(m.duration_minutes),location:String(m.location),effectiveFrom:String(m.effective_from),effectiveUntil:m.effective_until===null?null:String(m.effective_until)})),[],e,7).sort((m,A)=>m.date===A.date?m.startTime.localeCompare(A.startTime):m.date.localeCompare(A.date)),l=m=>{var A;return((A=v.find(M=>M.id===m))==null?void 0:A.label)??""},p=r.filter(m=>m.date===e&&l(m.batchId)),w=r.find(m=>m.date!==e&&l(m.batchId)),E=m=>_.filter(A=>A.batch_id===m).length,C=h.filter(m=>m.held_on===e);let B=[];h.length>0&&(B=(await g.from("attendance_current").select("class_session_id,enrolment_id,state,marked_at").in("class_session_id",h.map(A=>A.id))).data??[]);const j=p[0]??null,G=j?E(j.batchId):0,Q=j?C.find(m=>m.batch_id===j.batchId):null,ee=Q?B.filter(m=>m.class_session_id===Q.id&&m.state==="absent").length:null;let D=0,I=0;for(const m of h.filter(A=>A.held_on>=t)){const A=u.filter(M=>M.batch_id===m.batch_id&&!se(M.status)&&M.started_at.slice(0,10)<=m.held_on).length;D+=A,I+=B.filter(M=>M.class_session_id===m.id&&M.state==="absent").length}const $=D>0?Math.round((D-I)/D*100):null,U=y.reduce((m,A)=>m+A.amount_cents,0),F=new Set(y.filter(m=>m.kind==="payment").map(m=>m.enrolment_id)),te=_.filter(m=>F.has(m.id)).length,ie=_.length-te,re=_.length?Math.round(te/_.length*100):0,Le=u.map(m=>({...m,batch_id:m.batch_id})),qe=Tt(h,B,Le),Ne=At(h,B,new Set((d??[]).map(m=>m.enrolment_id)),Le,e),ut=new Set((s??[]).map(m=>m.batch_id)),Re=v.filter(m=>!ut.has(m.id)),mt=new Date(Date.now()-7*864e5).toISOString(),z=_.filter(m=>m.started_at>=mt),ht=z.length===0?"":z.length<=2?z.map(m=>m.display_name).join(" and "):`${z.slice(0,2).map(m=>m.display_name).join(", ")} and ${z.length-2} more`,K={rows:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h10"/></svg>',warn:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8v5"/><circle cx="12" cy="16.5" r=".6" fill="currentColor"/><path d="M10.3 3.9 2.6 17.2A1.6 1.6 0 0 0 4 19.6h16a1.6 1.6 0 0 0 1.4-2.4L13.7 3.9a1.6 1.6 0 0 0-2.8 0z"/></svg>',mail:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16v12H4z"/><path d="m4 8 8 6 8-6"/></svg>',chev:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m9 6 6 6-6 6"/></svg>'};Y(P.name,`
    ${j?`
      <section class="hero">
        <p class="eyebrow"><i class="dot"></i> Class today</p>
        <p class="h2">${f(l(j.batchId))}</p>
        <p class="meta">${f(X(j.startTime))} · ${f(j.location)} · ${G} ${G===1?"student":"students"}</p>
        <div class="btn-row">
          <button class="btn primary full" data-nav="batch/${j.batchId}/roll/${e}">Take the roll</button>
          <button class="btn" data-nav="batch/${j.batchId}">Open class</button>
        </div>
      </section>
      <div class="stats">
        ${ee===null?`
          <div class="stat"><b>${G}</b><span>On the roll today</span></div>
          <div class="stat"><b>–</b><span>Roll not taken yet</span></div>`:`
          <div class="stat good"><b>${G-ee}</b><span>Present today</span></div>
          <div class="stat warn"><b>${ee}</b><span>Absent today</span></div>`}
        <div class="stat"><b>${$===null?"–":`${$}%`}</b><span>${$===null?"No rolls this month":"Attendance this month"}</span></div>
      </div>`:`
      ${w?`<p class="hint">No class today. Next: ${f(l(w.batchId))}, ${f(ue(w.date))} at ${f(X(w.startTime))}.</p>`:""}
      <div class="stats">
        <div class="stat"><b>${v.length}</b><span>${v.length===1?"Class":"Classes"}</span></div>
        <div class="stat"><b>${_.length}</b><span>Students</span></div>
        <div class="stat"><b>${$===null?"–":`${$}%`}</b><span>${$===null?"No rolls this month":"Attendance this month"}</span></div>
      </div>`}

    <p class="sec">Your classes</p>
    ${v.length===0?'<p class="hint">No classes yet. Set up your first one and share the join link with your students. It takes about two minutes.</p>':`<div class="card"><div class="list">${v.map(m=>{const A=(s??[]).find(pt=>pt.batch_id===m.id),M=E(m.id);return`
          <div class="row" data-nav="batch/${m.id}" role="link" tabindex="0" style="cursor:pointer">
            <span class="ico">${K.rows}</span>
            <div class="grow">
              <div class="strong">${f(m.label)}</div>
              <div class="hint">${A?`${Be[A.weekday]}s · ${X(A.start_time.slice(0,5))} · `:""}${f(m.location)}</div>
            </div>
            ${A?M===0?'<span class="pill">No students yet</span>':`<span class="pill on">${M} ${M===1?"student":"students"}</span>`:'<span class="pill due">Needs a time</span>'}
          </div>`}).join("")}</div></div>`}

    <p class="sec">Fees this month</p>
    <div class="card money-card">
      <p class="big">${f(O(U))}</p>
      <p class="hint">Received, after reversals. Money that moved, not money that is owed.</p>
      ${_.length>0?`
        <div class="split-bar" role="img" aria-label="${te} paid, ${ie} nothing recorded">
          <i style="width:${re}%;background:var(--good)"></i>
          <i style="width:${100-re}%;background:var(--surface-2)"></i>
        </div>
        <div class="legend">
          <em><span class="sw" style="background:var(--good)"></span> ${te} paid</em>
          <em><span class="sw" style="background:var(--surface-2)"></span> ${ie} nothing recorded</em>
        </div>`:""}
    </div>

    ${Re.length>0||z.length>0||qe.length>0||Ne.length>0?`
      <p class="sec">Needs you</p>
      <div class="card"><div class="list">
        ${Re.map(m=>`
          <div class="row" data-nav="batch/${m.id}" role="link" tabindex="0" style="cursor:pointer">
            <span class="ico" style="color:var(--warn)">${K.warn}</span>
            <div class="grow">
              <div class="strong">${f(m.label)} has no weekly time</div>
              <div class="hint">Students cannot see it on their week yet</div>
            </div>
            ${K.chev}
          </div>`).join("")}
        ${qe.map(m=>`
          <div class="row" data-nav="roster" role="link" tabindex="0" style="cursor:pointer">
            <span class="ico" style="color:var(--warn)">${K.warn}</span>
            <div class="grow">
              <div class="strong">${f(m.display_name)} has missed 2 classes in a row</div>
              <div class="hint">${f(l(m.batch_id))} · worth a call before it becomes a habit</div>
            </div>
            ${K.chev}
          </div>`).join("")}
        ${Ne.map(m=>`
          <div class="row" data-nav="roster" role="link" tabindex="0" style="cursor:pointer">
            <span class="ico" style="color:var(--warn)">${K.warn}</span>
            <div class="grow">
              <div class="strong">${f(m.display_name)} joined but has never appeared</div>
              <div class="hint">Enrolled over a month, no attendance mark and no fee entry yet</div>
            </div>
            ${K.chev}
          </div>`).join("")}
        ${z.length>0?`
          <div class="row" data-nav="roster" role="link" tabindex="0" style="cursor:pointer">
            <span class="ico">${K.mail}</span>
            <div class="grow">
              <div class="strong">${z.length} ${z.length===1?"student":"students"} joined this week</div>
              <div class="hint">${f(ht)}</div>
            </div>
            ${K.chev}
          </div>`:""}
      </div></div>`:""}

    <div class="btn-row">
      <button class="btn primary" data-nav="new">Set up a class</button>
      <button class="btn" data-nav="roster">Students</button>
      <button class="btn" data-nav="fees">Fees</button>
    </div>
    <button class="btn quiet" id="out">Sign out</button>`),x.querySelectorAll("[data-nav]").forEach(m=>m.addEventListener("click",()=>{location.hash=m.dataset.nav})),document.getElementById("out").addEventListener("click",()=>{g.auth.signOut().then(()=>{P=null,oe()})})}let T={...Xt};async function rt(){dt();const[e,t]=await Promise.all([it(),g.from("batches").select("id,label").is("archived_at",null).order("created_at")]),n=e.rows,a=t.data??[],s=u=>{var _;return((_=a.find(h=>h.id===u))==null?void 0:_.label)??"Class"},o=Ke(n,T),i=T.sort+(T.desc?":d":""),c=(u,_)=>`<button data-sort="${u}">${_}${T.sort===u?T.desc?" ↓":" ↑":""}</button>`;Y("Students",`
    ${e.fromCache?`
      <div class="card">
        <div class="strong">Working from this phone</div>
        <p class="hint">You are offline, so this is your class list as it was saved here${e.savedAt?` on ${f(new Date(e.savedAt).toLocaleString("en-GB",{timeZone:"Asia/Colombo",weekday:"short",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}))}`:""}. Changes need a connection.</p>
      </div>`:""}
    <div class="card roster-pane">
      <div class="toolbar">
        <label class="grow-2">Search
          <input id="r-q" value="${f(T.query)}" placeholder="Name, reference or phone"
                 autocapitalize="off" autocorrect="off" spellcheck="false" />
        </label>
        <label>Class
          <select id="r-batch">
            <option value="all">All classes</option>
            ${a.map(u=>`<option value="${u.id}" ${T.batchId===u.id?"selected":""}>${f(u.label)}</option>`).join("")}
          </select>
        </label>
        <label>Status
          <select id="r-status">
            ${[["active","On the roll"],["ended","Left"],["all","Everyone"]].map(([u,_])=>`<option value="${u}" ${T.status===u?"selected":""}>${_}</option>`).join("")}
          </select>
        </label>
        <label class="phone-only">Order
          <select id="r-sort">
            ${[["name","Name A to Z"],["name:d","Name Z to A"],["joined","Joined, oldest first"],["joined:d","Joined, newest first"],["status","Status"]].map(([u,_])=>`<option value="${u}" ${i===u?"selected":""}>${_}</option>`).join("")}
          </select>
        </label>
      </div>
      <p class="count-line" id="r-count">${o.length} of ${n.length} ${n.length===1?"student":"students"}</p>
    </div>

    ${o.length===0?`
      <div class="card"><p class="hint empty">${n.length===0?"Nobody has joined yet. Share a class link and they will appear here as they join.":"No students match this search. Clear it to see everyone."}</p></div>`:`
      <div class="card roster-pane">
        <div class="list roster-list">
          ${o.map(u=>`
            <button class="roster-row" data-open="${u.id}">
              <span class="roster-av" aria-hidden="true">${f(je(u.display_name))}</span>
              <span class="grow">
                <span class="roster-name">${f(u.display_name||"Unnamed")}</span>
                ${T.batchId==="all"?`<span class="roster-meta">${f(s(u.batch_id))}</span>`:""}
                <span class="roster-sub">joined ${H(u.started_at)}</span>
              </span>
              <span class="status-tag ${se(u.status)?"is-ended":"is-active"}">${f(u.status)}</span>
            </button>`).join("")}
        </div>

        <table class="roster-table">
          <thead><tr>
            <th>${c("name","Name")}</th>
            <th>Class</th>
            <th>Reference</th>
            <th>Guardian phone</th>
            <th>${c("joined","Joined")}</th>
            <th>${c("status","Status")}</th>
          </tr></thead>
          <tbody>
            ${o.map(u=>`
              <tr data-open="${u.id}">
                <td><strong>${f(u.display_name||"Unnamed")}</strong></td>
                <td>${f(s(u.batch_id))}</td>
                <td>${f(u.teacher_reference||"-")}</td>
                <td class="num">${f(u.guardian_phone||"-")}</td>
                <td class="num">${H(u.started_at)}</td>
                <td><span class="status-tag ${se(u.status)?"is-ended":"is-active"}">${f(u.status)}</span></td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div>`}

    <div class="btn-row">
      <button class="btn" id="r-export" ${o.length===0?"disabled":""}>Export this list</button>
    </div>
    <div class="card" id="r-detail" hidden></div>`,"batches");const d=()=>{rt()},v=document.getElementById("r-q");v.addEventListener("input",()=>{T={...T,query:v.value};const u=Ke(n,T);document.getElementById("r-count").textContent=`${u.length} of ${n.length} ${n.length===1?"student":"students"}`,clearTimeout(v._t),v._t=window.setTimeout(d,250)}),document.getElementById("r-batch").addEventListener("change",u=>{T={...T,batchId:u.target.value},d()}),document.getElementById("r-status").addEventListener("change",u=>{T={...T,status:u.target.value},d()}),document.getElementById("r-sort").addEventListener("change",u=>{const[_,h]=u.target.value.split(":");T={...T,sort:_,desc:h==="d"},d()}),x.querySelectorAll("[data-sort]").forEach(u=>u.addEventListener("click",()=>{const _=u.dataset.sort;T={...T,sort:_,desc:T.sort===_?!T.desc:!1},d()})),x.querySelectorAll("[data-open]").forEach(u=>u.addEventListener("click",()=>fn(n.find(_=>_.id===u.dataset.open),s,d))),document.getElementById("r-export").addEventListener("click",()=>{const u=en(o,s),_=URL.createObjectURL(new Blob([u],{type:"text/csv"})),h=document.createElement("a");h.href=_,h.download=`students-${new Date().toISOString().slice(0,10)}.csv`,h.click(),URL.revokeObjectURL(_)})}function dt(){const e=document.getElementById("r-detail");e&&(e.hidden=!0),document.body.classList.remove("detail-open")}function fn(e,t,n){var s;const a=document.getElementById("r-detail");a.hidden=!1,document.body.classList.add("detail-open"),a.innerHTML=`
    <div class="strong">${f(e.display_name||"Unnamed")}</div>
    <p class="hint">${f(t(e.batch_id))} · joined ${H(e.started_at)} · ${f(e.status)}</p>
    <form id="r-form">
      <label>Name in your class list
        <input name="display_name" value="${f(e.display_name)}" />
      </label>
      <label>Your reference
        <input name="teacher_reference" value="${f(e.teacher_reference)}" placeholder="Optional" />
      </label>
      <label>Guardian phone
        <input name="guardian_phone" value="${f(e.guardian_phone)}" inputmode="tel" />
      </label>
      <button class="btn primary full" type="submit">Save</button>
      <p class="notice" id="r-saved" hidden>Saved.</p>
      <p class="error" id="r-err" hidden></p>
    </form>
    <div id="r-history" class="history-block"><p class="hint">Loading attendance…</p></div>
    ${se(e.status)?"":'<button class="btn danger-quiet" id="r-withdraw">Remove from the class</button>'}
    <button class="btn quiet" id="r-close">Close</button>`,wn(e.id,document.getElementById("r-history")).catch(o=>{document.getElementById("r-history").innerHTML='<p class="hint">Attendance could not be loaded just now.</p>',Z("attendance_history_failed",String(o))}),a.scrollIntoView({block:"start"}),document.getElementById("r-form").addEventListener("submit",o=>{o.preventDefault();const i=new FormData(o.target);tn(e.id,{display_name:String(i.get("display_name")).trim(),teacher_reference:String(i.get("teacher_reference")).trim(),guardian_phone:String(i.get("guardian_phone")).trim()}).then(()=>{document.getElementById("r-saved").hidden=!1,n()}).catch(c=>{Z("roster_save",String(c));const d=document.getElementById("r-err");d.hidden=!1,d.textContent="Could not save that. Try again."})}),(s=document.getElementById("r-withdraw"))==null||s.addEventListener("click",()=>{nn(e.id).then(n).catch(o=>{Z("roster_withdraw",String(o))})}),document.getElementById("r-close").addEventListener("click",dt)}function vn(){const e=new Date().getFullYear();Y("New class",`
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
            <select name="weekday">${Be.map((t,n)=>`<option value="${n}" ${n===6?"selected":""}>${t}</option>`).join("")}</select>
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
    </form>`,"batches"),document.getElementById("nb").addEventListener("submit",t=>{t.preventDefault();const n=new FormData(t.target),a=t.target.querySelector("button[type=submit]");a.disabled=!0,(async()=>{const{data:s,error:o}=await g.from("batches").insert({tenant_id:P.id,label:String(n.get("label")).trim(),exam_year:Number(n.get("exam_year")),location:String(n.get("location")).trim(),mode:String(n.get("mode"))}).select("id").single();if(o||!s)throw new Error((o==null?void 0:o.message)??"batch insert failed");const{error:i}=await g.from("batch_schedules").insert({tenant_id:P.id,batch_id:s.id,weekday:Number(n.get("weekday")),start_time:String(n.get("start_time")),duration_minutes:Number(n.get("duration")),location:String(n.get("location")).trim(),effective_from:W()});if(i)throw new Error(i.message);location.hash=`batch/${s.id}`})().catch(s=>{a.disabled=!1,Z("new_batch",String(s));const o=document.getElementById("nb-err");o.hidden=!1,o.textContent="Could not create the class. Try again."})})}async function lt(e){const[t,n,a]=await Promise.all([g.from("batches").select("*").eq("id",e).single(),g.from("batch_schedules").select("*").eq("batch_id",e),g.from("schedule_exceptions").select("*").eq("batch_id",e)]),s=t.data,o=n.data??[],i=a.data??[],c=tt(o.map(d=>({id:d.id,batchId:d.batch_id,weekday:d.weekday,startTime:d.start_time,durationMinutes:d.duration_minutes,location:d.location,effectiveFrom:d.effective_from,effectiveUntil:d.effective_until})),i.map(d=>({id:d.id,batchId:d.batch_id,kind:d.kind,originalDate:d.original_date,newStart:d.new_start,newDurationMinutes:d.new_duration_minutes,newLocation:d.new_location,note:d.note})),W(),14);return{batch:s,schedules:o,exceptions:i,occurrences:c}}function _n(e){const t=e.status==="moved"?`<span class="tag moved">Moved${e.movedFromDate?` from ${ue(e.movedFromDate)}`:""}</span>`:e.status==="extra"?'<span class="tag extra">Extra class</span>':"";return`<div class="strong">${ue(e.date)} · ${X(e.startTime)}</div>
          <div class="hint">${f(e.location)}${t?" ":""}${t}</div>`}async function fe(e){var _;const{batch:t,schedules:n,occurrences:a}=await lt(e),{data:s}=await g.auth.getUser(),o=((_=s.user)==null?void 0:_.id)??"",i=n[0];Y(t.label,`
    <div class="card">
      <div class="row">
        <div class="grow">
          <div class="strong">${i?`${Be[i.weekday]}s · ${X(i.start_time.slice(0,5))}`:"No weekly time set"}</div>
          <div class="hint">${f(t.location)}</div>
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
        ${a.slice(0,2).map(h=>`
          <button class="btn" data-nav="batch/${e}/roll/${h.date}">${f(yn(h.date))}</button>`).join("")||'<p class="hint">No classes scheduled to take a roll for.</p>'}
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
      <div class="qr-card" id="qr-card" hidden>
        <div class="qr-box" id="qr-box"></div>
        <p class="hint">Students point their camera at this to join. A new
          link kills this code, so replace it if it leaks.</p>
      </div>
    </div>

    <p class="sec" id="sec-sched">Next two weeks</p>
    <div class="card"><div class="list" id="occ">
      ${a.length===0?'<p class="hint">No classes in the next two weeks.</p>':a.map((h,y)=>`
        <div>
          <div class="row">
            <div class="grow">${_n(h)}</div>
            ${h.status==="scheduled"?`<button class="btn quiet" data-occ="${y}">Change</button>`:""}
          </div>
          <div class="btn-row" data-occ-actions="${y}" hidden>
            <button class="btn danger-quiet" data-cancel="${h.date}">Cancel this class</button>
            <button class="btn quiet" data-move="${h.date}|${h.startTime}">Move it</button>
          </div>
          <form class="btn-row" data-move-form="${h.date}" hidden>
            <input name="date" type="date" value="${h.date}" required />
            <input name="time" type="time" value="${h.startTime}" required />
            <button class="btn primary" type="submit">Save</button>
          </form>
        </div>`).join("")}
    </div></div>

    <p class="sec">Add a one-off class</p>
    <form class="card" id="extra">
      <div class="field-pair">
        <label>Date <input name="date" type="date" value="${W()}" required /></label>
        <label>Time <input name="time" type="time" value="${i?i.start_time.slice(0,5):"15:30"}" required /></label>
      </div>
      <button class="btn full" type="submit">Add extra class</button>
    </form>`,"batches"),x.querySelectorAll("[data-nav]").forEach(h=>h.addEventListener("click",()=>{location.hash=h.dataset.nav})),x.querySelectorAll("[data-jump]").forEach(h=>h.addEventListener("click",()=>{var y;(y=document.getElementById(h.dataset.jump))==null||y.scrollIntoView({behavior:"smooth",block:"start"})})),ct(t,o);const c=document.getElementById("invite-note"),d=document.getElementById("code-line");async function v(h){const y=await Qt({action:h,tenant_id:t.tenant_id,batch_id:e});return y.status!==200?(c.hidden=!1,c.textContent="Could not get a join link. Try again.",null):String(y.json.code)}const u=h=>{d.hidden=!1,d.textContent=h;const y=`https://businessboosterlk.github.io/tudent/app/#join/${encodeURIComponent(h)}`,r=Dt(y,`Join link for ${t.label}`),l=document.getElementById("qr-card"),p=document.getElementById("qr-box");r&&(p.innerHTML=r,l.hidden=!1)};document.getElementById("share").addEventListener("click",()=>{(async()=>{const h=await v("create");if(h===null)return;u(h),c.hidden=!1,c.textContent="This code is also shown here in case WhatsApp does not open.";const y=`Join my ${t.label} class on Tudent.

1. Open https://businessboosterlk.github.io/tudent/
2. Sign in with Google
3. Enter this code: ${h}

The code is for this class group only. Please do not forward it.`;window.open(`https://wa.me/?text=${encodeURIComponent(y)}`,"_blank","noopener")})()}),document.getElementById("rotate").addEventListener("click",()=>{(async()=>{const h=await v("rotate");h!==null&&(u(h),c.hidden=!1,c.textContent="The old link no longer works. Share this new one with the class.")})()}),x.querySelectorAll("[data-occ]").forEach(h=>h.addEventListener("click",()=>{const y=h.dataset.occ,r=x.querySelector(`[data-occ-actions="${y}"]`);r.hidden=!r.hidden})),x.querySelectorAll("[data-cancel]").forEach(h=>h.addEventListener("click",()=>{g.from("schedule_exceptions").insert({tenant_id:t.tenant_id,batch_id:e,kind:"cancelled",original_date:h.dataset.cancel,created_by:o}).then(()=>fe(e))})),x.querySelectorAll("[data-move]").forEach(h=>h.addEventListener("click",()=>{const[y]=h.dataset.move.split("|"),r=x.querySelector(`[data-move-form="${y}"]`);r.hidden=!1})),x.querySelectorAll("[data-move-form]").forEach(h=>h.addEventListener("submit",y=>{y.preventDefault();const r=new FormData(h);g.from("schedule_exceptions").insert({tenant_id:t.tenant_id,batch_id:e,kind:"moved",original_date:h.dataset.moveForm,new_start:`${r.get("date")}T${r.get("time")}:00+05:30`,new_location:t.location,created_by:o}).then(()=>fe(e))})),document.getElementById("extra").addEventListener("submit",h=>{h.preventDefault();const y=new FormData(h.target);g.from("schedule_exceptions").insert({tenant_id:t.tenant_id,batch_id:e,kind:"extra",new_start:`${y.get("date")}T${y.get("time")}:00+05:30`,new_location:t.location,created_by:o}).then(()=>fe(e))})}async function ct(e,t){const n=document.getElementById("complete-card");if(!n)return;const a=W(),[{data:s},{data:o}]=await Promise.all([g.from("canonical_topics").select("id,name").order("sort_order"),g.from("class_sessions").select("id,held_on,topic_id, next_actions(id,title,estimated_minutes,due_at,result_visibility)").eq("batch_id",e.id).eq("held_on",a)]),i=o==null?void 0:o[0];if(i){const c=i.next_actions,d=Array.isArray(c)?c[0]:c;n.innerHTML=`
      <div class="strong">Today's class is recorded</div>
      ${d?`<p class="hint">Your students' next step: ${f(d.title)}, about ${d.estimated_minutes} minutes.</p>`:'<p class="hint">No next step was set for this class.</p>'}`;return}n.innerHTML=`
    <form id="cc">
      <label>What did today's class cover?
        <select name="topic">${(s??[]).map(c=>`<option value="${c.id}">${f(c.name)}</option>`).join("")}</select>
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
    </form>`,document.getElementById("cc").addEventListener("submit",c=>{var y;c.preventDefault();const d=new FormData(c.target),v=String(d.get("topic")),u=((y=(s??[]).find(r=>r.id===v))==null?void 0:y.name)??"today’s topic",_=Number(d.get("due")),h=new Date(Date.now()+_*24*60*60*1e3);(async()=>{const{data:r,error:l}=await g.from("class_sessions").insert({tenant_id:e.tenant_id,batch_id:e.id,held_on:a,topic_id:v,completed_by:t}).select("id").single();if(l||!r)throw new Error((l==null?void 0:l.message)??"session failed");const{error:p}=await g.from("next_actions").insert({tenant_id:e.tenant_id,batch_id:e.id,class_session_id:r.id,title:String(d.get("title")).trim()||`Review ${u}`,topic_id:v,estimated_minutes:Number(d.get("minutes")),due_at:h.toISOString(),result_visibility:String(d.get("visibility")),created_by:t});if(p)throw new Error(p.message);ct(e,t)})().catch(r=>{Z("complete_class",String(r)),g.auth.getSession().then(({data:l})=>{if(!l.session){P=null,oe();return}const p=document.getElementById("cc-err");p.hidden=!1,p.textContent="Could not record the class. Try again."})})})}async function bn(e){const{batch:t,occurrences:n}=await lt(e),a=bt(n.map(s=>({occ:s,label:t.label})),[]);Y("Student preview",`
    <p class="hint">This is exactly what a student in ${f(t.label)} sees on their timetable. Items from this class are marked confirmed by teacher.</p>
    <div class="card"><div class="list">
      ${a.length===0?'<p class="hint empty">Nothing coming up.</p>':a.map(s=>`
        <div${s.date===W()?' class="today"':""}>
          <div class="strong">${f(s.heading)}</div>
          <div class="hint">${f(s.detail)}</div>
          <div class="hint">${s.marker}${s.qualifier?` · ${s.qualifier}`:""}</div>
        </div>`).join("")}
    </div></div>`,`batch/${e}`),x.querySelectorAll("[data-nav]").forEach(s=>s.addEventListener("click",()=>{location.hash=s.dataset.nav}))}oe();function yn(e){return e===W()?"Today":H(`${e}T00:00:00Z`)}async function gn(e,t){var y;try{await Qe()}catch{}const n=await ye(`batch:${e}`);let a;const s=await g.from("batches").select("id,label,tenant_id").eq("id",e).maybeSingle();if(!s.error&&s.data)a=s.data,await be(`batch:${e}`,a);else if(n)a=n.value;else throw new Error(((y=s.error)==null?void 0:y.message)??"batch unavailable offline");let o=await sn(e,t),i=o.rows;const c=r=>new Date(r).toLocaleString("en-GB",{timeZone:"Asia/Colombo",weekday:"short",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}),d=()=>{const r=ge(i);Y(a.label,`
      ${o.fromCache?`
        <div class="card">
          <div class="strong">Working from this phone</div>
          <p class="hint">You are offline, so this is the roll as it was saved here${o.savedAt?` on ${f(c(o.savedAt))}`:""}. Your taps are kept and will send when you have signal.</p>
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
        <p class="roll-day">${f(t===W()?`Today · ${H(`${t}T00:00:00Z`)}`:H(`${t}T00:00:00Z`))}</p>
        <p class="roll-turnout" id="turnout">${f(Oe(r))}</p>
        <div class="btn-row">
          <button class="btn" id="copy-summary">Copy class summary</button>
        </div>
        <p class="notice" id="copy-note" role="status" hidden></p>
      </div>

      ${i.length===0?`
        <div class="card"><p class="hint empty">Nobody was on the roll for this class. Students who join later will appear on the classes held after they joined, never before.</p></div>`:`
        <div class="card">
          <div class="list roll-list">
            ${i.map(l=>`
              <button class="roll-row is-${l.marked??"unmarked"}" data-mark="${l.enrolment_id}">
                <span class="roster-av" aria-hidden="true">${f(je(l.display_name))}</span>
                <span class="grow">
                  <span class="roster-name">${f(l.display_name)}</span>
                  ${l.note?`<span class="roster-sub">${f(l.note)}</span>`:""}
                </span>
                <span class="mark-tag is-${l.marked??"unmarked"}">${f(xe(l.marked))}</span>
              </button>`).join("")}
          </div>
        </div>
        <p class="hint">Tap a student to change them: present, absent, late, and back. Every tap is kept, so a correction never erases what you first recorded.</p>`}
    `,`batch/${e}`),x.querySelectorAll("[data-nav]").forEach(l=>l.addEventListener("click",()=>{location.hash=l.dataset.nav})),x.querySelectorAll("[data-mark]").forEach(l=>l.addEventListener("click",()=>{v(l.dataset.mark)})),h()};async function v(r){const l=i.find(E=>E.enrolment_id===r);if(!l)return;const p=yt(l.marked),w=l.marked;l.marked=p,u(r,p);try{await rn({tenantId:a.tenant_id,batchId:e,heldOn:t,enrolmentId:r,state:p})}catch(E){l.marked=w,u(r,w),Z("attendance_queue_failed",String(E));const C=document.getElementById("turnout");C&&(C.textContent="That tap could not be saved on this phone. Try again.");return}Qe().catch(()=>{})}function u(r,l){const p=x.querySelector(`[data-mark="${r}"]`);if(!p)return;const w=l??"unmarked";p.className=`roll-row is-${w}`;const E=p.querySelector(".mark-tag");E.className=`mark-tag is-${w}`,E.textContent=xe(l);const C=document.getElementById("turnout");C&&(C.textContent=Oe(ge(i)))}async function _(){var E;const r=ge(i),l=H(`${t}T00:00:00Z`),p=r.absent===0&&r.late===0?`All ${r.total} present`:`${r.total-r.absent} of ${r.total} present`+(r.absent?`, ${r.absent} absent`:"")+(r.late?`, ${r.late} late`:"");let w="";try{const B=((E=(await g.from("class_sessions").select("coverage_note").eq("batch_id",e).eq("held_on",t).maybeSingle()).data)==null?void 0:E.coverage_note)??"";B.trim()&&(w=`
Covered: ${B.trim()}`)}catch{}return`${a.label} · ${l}
${p}${w}`}const h=()=>{var r;(r=document.getElementById("copy-summary"))==null||r.addEventListener("click",()=>{(async()=>{const l=await _(),p=document.getElementById("copy-note");try{await navigator.clipboard.writeText(l),p&&(p.hidden=!1,p.textContent="Copied. Paste it into your class group.")}catch{p&&(p.hidden=!1,p.textContent=l)}navigator.share&&navigator.share({text:l}).catch(()=>{})})()})};d()}async function wn(e,t){const n=await ln(e);if(n.length===0){t.innerHTML='<p class="hint">Present at every class so far. Only absences and corrections are recorded.</p>';return}t.innerHTML=`
    <p class="hint">Every mark, newest first. Corrections are kept beside what they corrected.</p>
    <div class="list">
      ${n.map(a=>`
        <div class="row">
          <span class="grow">${f(a.held_on?H(`${a.held_on}T00:00:00Z`):"Unknown day")}
            ${a.note?`<span class="roster-sub">${f(a.note)}</span>`:""}</span>
          <span class="mark-tag is-${a.state}">${f(xe(a.state))}</span>
        </div>`).join("")}
    </div>`}let V=null;async function Ae(){var y;const{data:e}=await g.auth.getUser(),t=((y=e.user)==null?void 0:y.id)??"",[n,a]=await Promise.all([cn(),it()]),s=a.rows,o=r=>{var l;return((l=s.find(p=>p.id===r))==null?void 0:l.display_name)??"Unknown student"},i=we(n),c=s.filter(r=>!se(r.status));function d(){const r=W(),l=n.filter(C=>C.effective_on===r),p=H(`${r}T00:00:00Z`);if(l.length===0)return`Tudent daybook · ${p}
Nothing recorded today.`;const w=l.map(C=>{const B=o(C.enrolment_id),j=Pe(C.kind),G=C.method?` · ${$e(C.method)}`:"",Q=C.reference?` · ref ${C.reference}`:"";return`${O(C.amount_cents)} · ${j} · ${B}${G}${Q}`}),E=l.reduce((C,B)=>C+B.amount_cents,0);return`Tudent daybook · ${p}
${w.join(`
`)}
Recorded today: ${O(E)}. Money that moved, not money owed.`}let v=null;const u=()=>{if(V)return _();Y("Fees",`
      <div class="card">
        <p class="kpi-figure">${f(O(i.netCents))}</p>
        <p class="hint">Received, after reversals and adjustments. This is money that moved, not money that is owed.</p>
        <div class="kpi-split">
          <span>${f(O(i.paidCents))} paid</span>
          ${i.reversedCents?`<span class="is-negative">${f(O(i.reversedCents))} reversed</span>`:""}
          ${i.adjustedCents?`<span>${f(O(i.adjustedCents))} adjusted</span>`:""}
          <span>${i.eventCount} ${i.eventCount===1?"entry":"entries"}</span>
        </div>
      </div>

      <div class="btn-row">
        <button class="btn" id="copy-daybook">Copy today's digest</button>
      </div>
      <p class="notice" id="daybook-note" role="status" hidden></p>

      <p class="sec">Received, by student</p>
      ${c.length===0?`
        <div class="card"><p class="hint empty">Nobody is on the roll yet. Students appear here once they join a class.</p></div>`:`
        <div class="card"><div class="list">
          ${c.map(r=>{const l=n.filter(w=>w.enrolment_id===r.id),p=we(l);return`
            <button class="roster-row" data-fee-student="${r.id}">
              <span class="roster-av" aria-hidden="true">${f(je(r.display_name))}</span>
              <span class="grow">
                <span class="roster-name">${f(r.display_name)}</span>
                <span class="roster-sub">${l.length===0?"Nothing recorded":`${l.length} ${l.length===1?"entry":"entries"}`}</span>
              </span>
              <span class="money${p.netCents<0?" is-negative":""}">${f(O(p.netCents))}</span>
            </button>`}).join("")}
        </div></div>`}
    `,"batches"),h()};function _(){var G,Q,ee;const r=n.filter(D=>D.enrolment_id===V),l=we(r),p=wt(r).reverse(),w=new Set(r.map(D=>D.reverses_id).filter(Boolean));Y(o(V),`
      <div class="card">
        <p class="kpi-figure">${f(O(l.netCents))}</p>
        <p class="hint">Received from this student, after reversals and adjustments.</p>
      </div>

      ${v?`
        <div class="card primary">
          <p class="strong">Recorded.</p>
          <p class="hint" id="receipt-text">${f(v)}</p>
          <div class="btn-row">
            <button class="btn" id="copy-receipt">Copy receipt</button>
          </div>
          <p class="notice" id="receipt-note" role="status" hidden></p>
        </div>`:""}

      <p class="sec">Record a movement</p>
      <form class="card" id="fee-form">
        <div class="field-pair">
          <label>Amount (LKR)
            <input name="rupees" type="number" min="1" step="0.01" inputmode="decimal" required />
          </label>
          <label>Date it moved
            <input name="effective_on" type="date" value="${W()}" required />
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
      ${p.length===0?`
        <div class="card"><p class="hint empty">Nothing recorded for this student yet.</p></div>`:`
        <div class="card"><div class="list">
          ${p.map(({event:D,runningCents:I})=>{const $=D,U=w.has($.id);return`
            <div class="fee-line${$.kind==="reversal"?" is-reversal":""}">
              <div class="row">
                <span class="grow">
                  <span class="roster-name">${f(Pe($.kind))}${U?" · later reversed":""}</span>
                  <span class="roster-sub">${f(H(`${$.effective_on}T00:00:00Z`))}${$.method?` · ${f($e($.method))}`:""}${$.reference?` · ${f($.reference)}`:""}</span>
                </span>
                <span class="money${$.amount_cents<0?" is-negative":""}">${f(O($.amount_cents))}</span>
              </div>
              <div class="row fee-foot">
                <span class="grow hint">Balance after this: ${f(O(I))}</span>
                ${$.kind==="payment"&&!U?`<button class="btn danger-quiet small" data-reverse="${$.id}">Reverse</button>`:""}
              </div>
            </div>`}).join("")}
        </div></div>
        <p class="hint">Nothing here can be edited or deleted. Reversing a payment adds an entry that undoes it, and both stay on the record.</p>`}
    `,"fees"),(G=document.querySelector('[data-nav="fees"]'))==null||G.addEventListener("click",()=>{V=null,u()}),(Q=x.querySelector(".back"))==null||Q.addEventListener("click",D=>{D.preventDefault(),V=null,u()});const E=x.querySelector("[name=kind]"),C=x.querySelector("[name=method]").closest("label"),B=document.getElementById("adj-hint"),j=()=>{const D=E.value==="adjustment";C.hidden=D,B.hidden=!D,x.querySelector("[name=rupees]").min=D?"":"1"};E.addEventListener("change",j),(ee=document.getElementById("copy-receipt"))==null||ee.addEventListener("click",()=>{(async()=>{var $;const D=(($=document.getElementById("receipt-text"))==null?void 0:$.textContent)??"",I=document.getElementById("receipt-note");try{await navigator.clipboard.writeText(D),I&&(I.hidden=!1,I.textContent="Copied. Send it to the student or the parent yourself.")}catch{I&&(I.hidden=!1,I.textContent="Could not copy. Long-press the receipt text instead.")}navigator.share&&navigator.share({text:D}).catch(()=>{})})()}),j(),document.getElementById("fee-form").addEventListener("submit",D=>{D.preventDefault();const I=new FormData(D.target),$=document.getElementById("fee-err"),U=String(I.get("kind")),F=Math.round(Number(I.get("rupees"))*100);if(!Number.isFinite(F)||F===0){$.textContent="Enter an amount.",$.hidden=!1;return}const te=o(V),ie=String(I.get("effective_on"));Xe({tenantId:P.id,enrolmentId:V,kind:U,amountCents:F,effectiveOn:ie,method:U==="adjustment"?null:String(I.get("method")),reference:String(I.get("reference")??""),recordedBy:t}).then(()=>(U==="payment"&&(v=`Received ${O(F)} from ${te}, ${H(`${ie}T00:00:00Z`)}, ${$e(String(I.get("method")))}${String(I.get("reference")??"")?`, ref ${String(I.get("reference"))}`:""}. Recorded in Tudent.`),Ae())).catch(re=>{$.textContent=Te(String(re.message??re)),$.hidden=!1})}),x.querySelectorAll("[data-reverse]").forEach(D=>D.addEventListener("click",()=>{const I=r.find(F=>F.id===D.dataset.reverse),$=un(I),U=document.getElementById("fee-err");Xe({tenantId:P.id,enrolmentId:V,kind:$.kind,amountCents:$.amountCents,effectiveOn:W(),reversesId:$.reversesId,note:"Reversed",recordedBy:t}).then(()=>Ae()).catch(F=>{U.textContent=Te(String(F.message??F)),U.hidden=!1})}))}function h(){var r;x.querySelectorAll("[data-nav]").forEach(l=>l.addEventListener("click",()=>{location.hash=l.dataset.nav})),x.querySelectorAll("[data-fee-student]").forEach(l=>l.addEventListener("click",()=>{V=l.dataset.feeStudent,u()})),(r=document.getElementById("copy-daybook"))==null||r.addEventListener("click",()=>{(async()=>{const l=d(),p=document.getElementById("daybook-note");try{await navigator.clipboard.writeText(l),p&&(p.hidden=!1,p.textContent="Copied. Paste it to your accountant or your own records.")}catch{p&&(p.hidden=!1,p.textContent=l)}navigator.share&&navigator.share({text:l}).catch(()=>{})})()})}u()}
