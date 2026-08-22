(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();function ht(e){return new Date(`${e}T12:00:00Z`)}function Lt(e){return e.toISOString().slice(0,10)}function Ke(e,t){const n=ht(e);return n.setUTCDate(n.getUTCDate()+t),Lt(n)}function qt(e){return e.slice(0,5)}function Nt(e,t){const n=new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).formatToParts(new Date(e)),a=s=>{var o;return((o=n.find(r=>r.type===s))==null?void 0:o.value)??"00"};return{date:`${a("year")}-${a("month")}-${a("day")}`,time:`${a("hour")}:${a("minute")}`}}function mt(e,t,n,a,s="Asia/Colombo"){const o=Ke(n,a),r=[],u=new Set(t.filter(d=>d.kind!=="extra"&&d.originalDate!==null).map(d=>`${d.batchId}|${d.originalDate}`));for(const d of e)for(let v=n;v<o;v=Ke(v,1))ht(v).getUTCDay()===d.weekday&&(v<d.effectiveFrom||d.effectiveUntil!==null&&v>d.effectiveUntil||u.has(`${d.batchId}|${v}`)||r.push({batchId:d.batchId,date:v,startTime:qt(d.startTime),durationMinutes:d.durationMinutes,location:d.location,status:"scheduled"}));for(const d of t){if(d.newStart===null)continue;const{date:v,time:h}=Nt(d.newStart,s);v<n||v>=o||r.push({batchId:d.batchId,date:v,startTime:h,durationMinutes:d.newDurationMinutes??120,location:d.newLocation??"",status:d.kind==="moved"?"moved":"extra",...d.kind==="moved"&&d.originalDate!==null?{movedFromDate:d.originalDate}:{},...d.note?{note:d.note}:{}})}return r.sort((d,v)=>d.date.localeCompare(v.date)||d.startTime.localeCompare(v.startTime)||d.batchId.localeCompare(v.batchId)||d.status.localeCompare(v.status)),r}function se(e){return new Date(`${e}T12:00:00Z`).toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short",timeZone:"UTC"})}function te(e){const[t=0,n=0]=e.split(":").map(Number),a=t>=12?"PM":"AM",s=t%12===0?12:t%12;return n===0?`${s} ${a}`:`${s}:${String(n).padStart(2,"0")} ${a}`}function Mt(e,t){const n=[];for(const{occ:a,label:s}of e)n.push({heading:s,detail:`${se(a.date)} · ${te(a.startTime)}${a.location?` · ${a.location}`:""}`,marker:"Confirmed by teacher",qualifier:a.status==="moved"?"Moved":a.status==="extra"?"Extra class":"",date:a.date,time:a.startTime});for(const a of t){const s=a.subjectLabel!==""&&a.title.toLowerCase().includes(a.subjectLabel.toLowerCase()),o=a.subjectLabel&&!s?` · ${a.subjectLabel}`:"";n.push({heading:a.title,detail:`${se(a.date)} · ${te(a.time)}${o}`,marker:"Added by you",qualifier:a.kind==="deadline"?"Due":"",date:a.date,time:a.time})}return n.sort((a,s)=>a.date.localeCompare(s.date)||a.time.localeCompare(s.time)||a.heading.localeCompare(s.heading)),n}function ke(e){const t={present:0,absent:0,late:0,total:e.length};for(const n of e)n.marked==="absent"?t.absent+=1:n.marked==="late"?t.late+=1:t.present+=1;return t}function Ve(e){if(e.total===0)return"Nobody on the roll for this class yet.";if(e.absent===0&&e.late===0)return`All ${e.total} present. Tap anyone who is not here.`;const t=[`${e.present} present`];return e.absent&&t.push(`${e.absent} absent`),e.late&&t.push(`${e.late} late`),`${t.join(" · ")} of ${e.total}.`}function Ot(e){return e===null||e==="present"?"absent":e==="absent"?"late":"present"}function Be(e){return e==="absent"?"Absent":e==="late"?"Late":"Present"}function Rt(e,t){const n=a=>a.slice(0,10);return!(n(e.started_at)>t||e.ended_at&&n(e.ended_at)<t)}function O(e){const t=e<0?"-":"",n=Math.abs(e),a=Math.floor(n/100),s=String(n%100).padStart(2,"0"),o=String(a).replace(/\B(?=(\d{3})+(?!\d))/g,",");return`${t}LKR ${o}.${s}`}function Se(e){const t={netCents:0,paidCents:0,reversedCents:0,adjustedCents:0,eventCount:e.length};for(const n of e)t.netCents+=n.amount_cents,n.kind==="payment"?t.paidCents+=n.amount_cents:n.kind==="reversal"?t.reversedCents+=n.amount_cents:t.adjustedCents+=n.amount_cents;return t}function Pt(e){const t=[...e].sort((a,s)=>a.effective_on.localeCompare(s.effective_on));let n=0;return t.map(a=>(n+=a.amount_cents,{runningCents:n,event:a}))}function Ye(e){return e==="payment"?"Payment":e==="reversal"?"Reversed":"Adjustment"}function Ee(e){return e?{cash:"Cash",bank_transfer:"Bank transfer",card:"Card",online:"Online",other:"Other"}[e]??e:""}const Je=[[26,10,1],[44,16,1],[70,26,1],[100,18,2],[134,24,2],[172,16,4]],ue=new Uint8Array(512),je=new Uint8Array(256);{let e=1;for(let t=0;t<255;t+=1)ue[t]=e,je[e]=t,e<<=1,e&256&&(e^=285);for(let t=255;t<512;t+=1)ue[t]=ue[t-255]}const pt=(e,t)=>e&&t?ue[je[e]+je[t]]:0;function Ft(e){let t=new Uint8Array([1]);for(let n=0;n<e;n+=1){const a=new Uint8Array(t.length+1);for(let s=0;s<t.length;s+=1)a[s]^=pt(t[s],ue[n]),a[s+1]^=t[s];t=a}return t}function Ut(e,t){const n=Ft(t).reverse(),a=new Uint8Array(t);for(const s of e){const o=s^a[0];a.copyWithin(0,1),a[t-1]=0;for(let r=0;r<t;r+=1)a[r]^=pt(n[r+1],o)}return a}function Ht(e){for(let t=1;t<=Je.length;t+=1){const[n,a,s]=Je[t-1],o=n-a*s;if(e.length+2>o)continue;const r=new Uint8Array(o);let u=0;const d=(i,l)=>{for(let _=l-1;_>=0;_-=1)i&1<<_&&(r[u>>3]|=128>>(u&7)),u+=1};d(4,4),d(e.length,8);for(const i of e)d(i,8);let v=236;for(let i=Math.ceil(u/8);i<o;i+=1)r[i]=v,v=v===236?17:236;const h=o/s,b=[],g=[];for(let i=0;i<s;i+=1){const l=r.slice(i*h,(i+1)*h);b.push(l),g.push(Ut(l,a))}const E=new Uint8Array(n);let c=0;for(let i=0;i<h;i+=1)for(const l of b)E[c++]=l[i];for(let i=0;i<a;i+=1)for(const l of g)E[c++]=l[i];return{stream:E,version:t}}return null}const Wt={2:[6,18],3:[6,22],4:[6,26],5:[6,30],6:[6,34]};function Gt(e){const t=0|e;let n=t<<10;for(let a=14;a>=10;a-=1)n&1<<a&&(n^=1335<<a-10);return(t<<10|n)^21522}function zt(e){const t=Ht(new TextEncoder().encode(e));if(!t)return null;const{stream:n,version:a}=t,s=17+a*4,o=Array.from({length:s},()=>Array(s).fill(null)),r=(c,i,l)=>{o[c][i]=l},u=(c,i)=>{for(let l=-1;l<=7;l+=1)for(let _=-1;_<=7;_+=1){const $=c+l,k=i+_;if($<0||k<0||$>=s||k>=s)continue;const B=l>=0&&l<=6&&_>=0&&_<=6&&(l===0||l===6||_===0||_===6),V=l>=2&&l<=4&&_>=2&&_<=4;r($,k,B||V)}};u(0,0),u(0,s-7),u(s-7,0);for(let c=8;c<s-8;c+=1)r(6,c,c%2===0),r(c,6,c%2===0);const d=Wt[a]??[];for(const c of d)for(const i of d)if(o[c][i]===null)for(let l=-2;l<=2;l+=1)for(let _=-2;_<=2;_+=1)r(c+l,i+_,Math.max(Math.abs(l),Math.abs(_))!==1);r(s-8,8,!0);const v=Gt(0),h=c=>(v>>c&1)===1;for(let c=0;c<=5;c+=1)r(8,c,h(14-c));r(8,7,h(8)),r(8,8,h(7)),r(7,8,h(6));for(let c=0;c<=5;c+=1)r(5-c,8,h(5-c));for(let c=0;c<=6;c+=1)r(s-1-c,8,h(14-c));for(let c=0;c<=7;c+=1)r(8,s-8+c,h(7-c));let b=0;const g=n.length*8;let E=!0;for(let c=s-1;c>0;c-=2){c===6&&(c-=1);for(let i=0;i<s;i+=1){const l=E?s-1-i:i;for(const _ of[c,c-1]){if(o[l][_]!==null)continue;let $=!1;b<g&&($=(n[b>>3]>>7-(b&7)&1)===1,b+=1),(l+_)%2===0&&($=!$),r(l,_,$)}}E=!E}return o}function Zt(e,t){const n=zt(e);if(!n)return null;const a=n.length,s=4,o=a+s*2;let r="";for(let u=0;u<a;u+=1)for(let d=0;d<a;d+=1)n[u][d]&&(r+=`M${d+s} ${u+s}h1v1h-1z`);return`<svg viewBox="0 0 ${o} ${o}" role="img" aria-label="${t}"
    shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="${r}"/></svg>`}const ft=e=>e.status==="active"&&e.ended_at===null;function Kt(e){const t=new Map;for(const a of[...e].sort((s,o)=>s.marked_at===o.marked_at?s.class_session_id.localeCompare(o.class_session_id):s.marked_at<o.marked_at?-1:1))t.set(`${a.class_session_id}|${a.enrolment_id}`,a);const n=new Map;for(const[a,s]of t)n.set(a,s.state);return n}function Vt(e,t,n){const a=Kt(t);return n.filter(ft).filter(s=>{const o=e.filter(r=>r.batch_id===s.batch_id&&r.held_on>=s.started_at.slice(0,10)).sort((r,u)=>u.held_on.localeCompare(r.held_on));return o.length<2?!1:o.slice(0,2).every(r=>a.get(`${r.id}|${s.id}`)==="absent")})}function Yt(e,t,n,a,s){const o=new Set(t.map(u=>u.enrolment_id)),r=new Date(`${s}T00:00:00Z`).getTime()-30*864e5;return a.filter(ft).filter(u=>new Date(u.started_at).getTime()>r||o.has(u.id)||n.has(u.id)?!1:e.some(d=>d.batch_id===u.batch_id&&d.held_on>=u.started_at.slice(0,10)))}const Jt="batch-offline",Qt=1;function Xt(){return new Promise((e,t)=>{const n=indexedDB.open(Jt,Qt);n.onupgradeneeded=()=>{const a=n.result;a.objectStoreNames.contains("cache")||a.createObjectStore("cache",{keyPath:"key"}),a.objectStoreNames.contains("outbox")||a.createObjectStore("outbox",{keyPath:"id",autoIncrement:!0}).createIndex("by_status","status")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}function he(e,t,n){return Xt().then(a=>new Promise((s,o)=>{const r=a.transaction(e,t),u=n(r.objectStore(e));u.onsuccess=()=>s(u.result),u.onerror=()=>o(u.error),r.oncomplete=()=>a.close()}))}async function ge(e,t){await he("cache","readwrite",n=>n.put({key:e,value:t,savedAt:new Date().toISOString()}))}async function we(e){return await he("cache","readonly",n=>n.get(e))??null}async function en(e){await he("outbox","readwrite",t=>t.add({...e,status:"pending",attempts:0,lastError:"",createdAt:new Date().toISOString()}))}async function vt(){return(await he("outbox","readonly",t=>t.getAll())).sort((t,n)=>(t.id??0)-(n.id??0))}async function Ce(e){await he("outbox","readwrite",t=>t.put(e))}async function tn(e){const t=(await vt()).filter(s=>s.status==="pending"),n=new Map;for(const s of t){const o=n.get(s.lane)??[];o.push(s),n.set(s.lane,o)}const a={delivered:0,failed:[],heldBack:0};return await Promise.all([...n.entries()].map(async([,s])=>{let o=!1;for(const r of s){if(o){a.heldBack+=1;continue}let u;try{u=await e(r)}catch(d){u={result:"unavailable",detail:String(d)}}r.attempts+=1,u.result==="ok"?(r.status="done",await Ce(r),a.delivered+=1):u.result==="rejected"?(r.status="failed",r.lastError=u.detail??"rejected",await Ce(r),a.failed.push({lane:r.lane,kind:r.kind,detail:r.lastError})):(r.lastError=u.detail??"unavailable",await Ce(r),o=!0,a.heldBack+=1)}})),a}const _t=[{id:"multi",label:"Tudent colours",swatch:""},{id:"blue",label:"Blue",swatch:"#3d9be9"},{id:"pink",label:"Pink",swatch:"#f2789f"},{id:"green",label:"Green",swatch:"#34c78a"},{id:"orange",label:"Orange",swatch:"#fb9d3c"}],nn=new Set(_t.map(e=>e.id)),Le="tudent-accent";function bt(e){return e?`${Le}:${e}`:Le}function yt(e){try{const t=localStorage.getItem(bt(e))??localStorage.getItem(Le);return t&&nn.has(t)?t:"multi"}catch{return"multi"}}function gt(e){document.documentElement.dataset.accent=e}function an(e,t){try{localStorage.setItem(bt(t),e)}catch{}gt(e)}function wt(e){const t=yt(e);return gt(t),t}function sn(e){return`
    <div class="accent-choices" role="group" aria-label="Accent colour">
      ${_t.map(t=>`
        <button type="button" class="accent-choice" data-accent-pick="${t.id}"
                aria-pressed="${t.id===e}">
          <span class="accent-swatch${t.id==="multi"?" multi":""}"
                ${t.swatch?`style="--sw:${t.swatch}"`:""} aria-hidden="true"></span>
          ${t.label}
        </button>`).join("")}
    </div>`}function on(e,t,n){e.querySelectorAll("[data-accent-pick]").forEach(a=>a.addEventListener("click",()=>{const s=a.dataset.accentPick;an(s,t),e.querySelectorAll("[data-accent-pick]").forEach(o=>o.setAttribute("aria-pressed",String(o.dataset.accentPick===s)))}))}function rn(e){return`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true">${e}</svg>`}const pe={home:'<path d="M4 11 12 4l8 7"/><path d="M6 10v9h12v-9"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/>',users:'<circle cx="9" cy="8" r="3"/><path d="M3 19a6 6 0 0 1 12 0"/><path d="M17 8h4M19 6v4"/>',wallet:'<path d="M4 7h14a2 2 0 0 1 2 2v9H4a2 2 0 0 1-2-2V6.5A2.5 2.5 0 0 1 4.5 4H18v3"/><path d="M15 11h5v4h-5a2 2 0 1 1 0-4z"/>'};function dn(e,t){const n=e.find(a=>a.match?a.match(t):t===a.id);return`
    <nav class="tabbar" aria-label="Main">
      ${e.map(a=>`
        <button type="button" data-tab="${a.id}"
                ${a===n?'aria-current="page"':""}>
          ${rn(a.icon)}<span>${a.label}</span>
        </button>`).join("")}
    </nav>`}function cn(e){e.querySelectorAll("[data-tab]").forEach(t=>t.addEventListener("click",()=>{const n=t.dataset.tab;if((location.hash.slice(1)||"")===n){window.scrollTo({top:0,behavior:"smooth"});return}location.hash=n}))}const $t=new Map;let kt=location.hash.slice(1)||"";function Oe(){$t.set(kt,window.scrollY)}function ln(e){kt=e;const t=$t.get(e)??0;requestAnimationFrame(()=>requestAnimationFrame(()=>window.scrollTo(0,t)))}function un(e){const t=document,n=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(!t.startViewTransition||n){e();return}t.startViewTransition(e)}const N=864e5,be=()=>new Date,ye=e=>e.toISOString(),M=e=>new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Colombo"}).format(e),S=(e,t)=>`${M(new Date(Date.now()+e*N))}T${t}:00+05:30`,Qe=new Date().getDay(),w="11111111-1111-4111-8111-111111111111",f=e=>`00000000-0000-4000-8000-${String(e).padStart(12,"0")}`,j=f(101),Xe=f(102),fe=f(103),ee=new Map([["Amaya (Demo Student)",f(201)],["Bimsara (Demo Student)",f(202)],["Chatura (Demo Student)",f(203)],["Dilki (Demo Student)",f(204)]]),Z=f(201),ce=f(301),et=f(302),xe=f(401),le=f(402),hn=f(403),mn=f(501),tt=f(601),nt=f(603),Ie=f(604),De=f(602),R={tenants:[{id:w,name:"Nimal Perera (Demo Teacher)"}],batches:[{id:j,tenant_id:w,label:"2027 A/L Chemistry (Demo)",location:"Panadura",archived_at:null,created_at:S(-30,"10:00")},{id:Xe,tenant_id:w,label:"2027 A/L Physics (Demo)",location:"Moratuwa",archived_at:null,created_at:S(-20,"10:00")},{id:fe,tenant_id:w,label:"Revision Class (Demo)",location:"Panadura",archived_at:null,created_at:S(-5,"10:00")}],batch_schedules:[{id:f(111),tenant_id:w,batch_id:j,weekday:Qe,start_time:"16:00",duration_minutes:120,location:"Panadura",effective_from:M(new Date(Date.now()-60*N)),effective_until:null,active:!0},{id:f(112),tenant_id:w,batch_id:Xe,weekday:(Qe+1)%7,start_time:"09:00",duration_minutes:90,location:"Moratuwa",effective_from:M(new Date(Date.now()-60*N)),effective_until:null,active:!0}],schedule_exceptions:[],enrolments:[...ee.entries()].flatMap(([e,t],n)=>[{id:t,tenant_id:w,batch_id:j,student_id:f(900+n),display_name:e,guardian_phone:"07x xxx xxxx (demo)",teacher_reference:"",status:"active",started_at:S(n===3?-2:-28+n,"10:00"),ended_at:null,version:1}]).concat([{id:f(205),tenant_id:w,batch_id:j,student_id:f(905),display_name:"Eshan (Demo Student)",guardian_phone:"",teacher_reference:"",status:"active",started_at:S(-40,"10:00"),ended_at:null,version:1}]),student_private_items:[{id:f(701),kind:"deadline",title:"History essay (your own)",subject_label:"History",starts_at:null,due_at:S(0,"21:00"),estimated_minutes:40,deleted_at:null},{id:f(702),kind:"external_class",title:"Kandy maths class (your own)",subject_label:"Maths",starts_at:S(2,"08:00"),due_at:null,estimated_minutes:90,deleted_at:null}],next_actions:[{id:mn,tenant_id:w,batch_id:j,title:"Finish the electrolysis worksheet",estimated_minutes:8,due_at:S(0,"20:00"),result_visibility:"teacher_sees_completion",topic_id:le}],student_profiles:[{student_id:f(900),preferences:{minutes:8}}],canonical_topics:[{id:xe,name:"Organic chemistry",sort_order:1},{id:le,name:"Electrolysis",sort_order:2},{id:hn,name:"Kinematics",sort_order:3}],topic_assertions:[{id:f(801),tenant_id:w,enrolment_id:Z,topic_id:le,assertion_type:"teacher_observed",value:{},occurred_at:S(-3,"18:00"),supersedes:null},{id:f(804),tenant_id:w,enrolment_id:Z,topic_id:le,assertion_type:"retrieval_success",value:{correct:4,total:5},occurred_at:S(-1,"20:00"),supersedes:null},{id:f(802),tenant_id:w,enrolment_id:Z,topic_id:xe,assertion_type:"student_self_assessment",value:{feeling:"shaky"},occurred_at:S(-2,"19:00"),supersedes:null},{id:f(803),tenant_id:w,enrolment_id:Z,topic_id:xe,assertion_type:"attended_instruction",value:{},occurred_at:S(-9,"18:00"),supersedes:null}],honours:[{kind:"topic_shown",subject:le,earned_on:M(new Date(Date.now()-7*N)),tenant_id:w},{kind:"month_kept_up",subject:M(new Date(Date.now()-31*N)).slice(0,7),earned_on:M(new Date(Date.now()-21*N)),tenant_id:w},{kind:"came_back",subject:"",earned_on:M(new Date(Date.now()-14*N)),tenant_id:w}],class_sessions:[{id:ce,tenant_id:w,batch_id:j,held_on:M(new Date(Date.now()-7*N)),coverage_note:"Electrolysis: Faraday laws worked examples",completed_by:f(999)},{id:et,tenant_id:w,batch_id:j,held_on:M(new Date(Date.now()-14*N)),coverage_note:"Organic chemistry: naming",completed_by:f(999)}],attendance_marks:[{id:f(311),tenant_id:w,batch_id:j,class_session_id:ce,enrolment_id:Z,state:"present",note:"",marked_by:f(999),marked_at:S(-7,"16:05"),created_at:S(-7,"16:05")},{id:f(312),tenant_id:w,batch_id:j,class_session_id:ce,enrolment_id:ee.get("Bimsara (Demo Student)"),state:"absent",note:"",marked_by:f(999),marked_at:S(-7,"16:05"),created_at:S(-7,"16:05")},{id:f(313),tenant_id:w,batch_id:j,class_session_id:ce,enrolment_id:ee.get("Bimsara (Demo Student)"),state:"present",note:"came in late, corrected",marked_by:f(999),marked_at:S(-7,"16:20"),created_at:S(-7,"16:20")},{id:f(314),tenant_id:w,batch_id:j,class_session_id:et,enrolment_id:ee.get("Chatura (Demo Student)"),state:"absent",note:"",marked_by:f(999),marked_at:S(-14,"16:05"),created_at:S(-14,"16:05")},{id:f(315),tenant_id:w,batch_id:j,class_session_id:ce,enrolment_id:ee.get("Chatura (Demo Student)"),state:"absent",note:"",marked_by:f(999),marked_at:S(-7,"16:06"),created_at:S(-7,"16:06")}],fee_events:[{id:f(321),tenant_id:w,batch_id:j,enrolment_id:Z,kind:"payment",amount_cents:25e4,method:"cash",reference:"demo-0001",effective_on:M(new Date(Date.now()-6*N)),note:"",reverses_id:null,recorded_at:S(-6,"17:00")},{id:f(322),tenant_id:w,batch_id:j,enrolment_id:ee.get("Chatura (Demo Student)"),kind:"payment",amount_cents:25e4,method:"transfer",reference:"demo-0002",effective_on:M(new Date(Date.now()-6*N)),note:"",reverses_id:null,recorded_at:S(-6,"17:05")},{id:f(323),tenant_id:w,batch_id:j,enrolment_id:ee.get("Chatura (Demo Student)"),kind:"reversal",amount_cents:-25e4,method:"transfer",reference:"demo-0002",effective_on:M(new Date(Date.now()-5*N)),note:"recorded against the wrong student (demo)",reverses_id:f(322),recorded_at:S(-5,"09:00")},{id:f(324),tenant_id:w,batch_id:j,enrolment_id:ee.get("Chatura (Demo Student)"),kind:"payment",amount_cents:25e4,method:"cash",reference:"demo-0003",effective_on:M(new Date(Date.now()-4*N)),note:"recorded again, correctly",reverses_id:null,recorded_at:S(-4,"17:00")}],prompts:[{id:tt,tenant_id:w,kind:"recall",active:!0},{id:nt,tenant_id:w,kind:"recall",active:!0}],prompt_versions:[{id:De,prompt_id:tt,version:1,question:"In electrolysis of molten NaCl, what forms at the cathode?",answer_key:"Sodium metal. Na+ ions gain electrons (reduction) at the cathode."},{id:Ie,prompt_id:nt,version:1,question:"Why does molten NaCl conduct electricity when solid NaCl does not?",answer_key:"Melting frees the ions to move; in the solid they are locked in the lattice."}],prompt_completions:[{id:f(810),tenant_id:w,enrolment_id:Z,prompt_version_id:De,answer:{text:"Sodium metal"},correct:!0,result_visibility:"private_to_student",occurred_at:S(-9,"19:20")},{id:f(811),tenant_id:w,enrolment_id:Z,prompt_version_id:Ie,answer:{text:"Because heating gives the electrons energy to move around"},correct:!1,result_visibility:"private_to_student",occurred_at:S(-6,"20:05")},{id:f(812),tenant_id:w,enrolment_id:Z,prompt_version_id:Ie,answer:{text:"The ions can move once it melts. In the solid they are held in place."},correct:!0,result_visibility:"visible_to_enrolment_teacher",occurred_at:S(-2,"18:40")},{id:f(813),tenant_id:w,enrolment_id:Z,prompt_version_id:De,answer:{text:"Na, and chlorine gas comes off the other side"},correct:null,result_visibility:"private_to_student",occurred_at:S(-1,"21:10")}]};function pn(){const e=new Map;for(const t of[...R.attendance_marks].sort((n,a)=>n.marked_at===a.marked_at?String(n.id).localeCompare(String(a.id)):n.marked_at<a.marked_at?-1:1))e.set(`${t.class_session_id}|${t.enrolment_id}`,t);return[...e.values()]}const ae=()=>sessionStorage.getItem("tudent-demo-offline")==="1";function at(e){if(e==="attendance_current")return pn().filter(a=>!0);const t=R[e];if(!t)throw new Error(`demo client: no fixture table "${e}". Add it; do not let the demo invent an answer.`);const n=null;return n?t.filter(n):t}const fn={class_sessions:"class_session_id",enrolments:"enrolment_id",batches:"batch_id"};function vn(e,t){var a;const n={...e};for(const s of t.matchAll(/([a-z_]+)\(([a-z_,]+)\)/g)){const[,o,r]=s,u=fn[o],d=(a=R[o])==null?void 0:a.find(v=>v.id===e[u]);n[o]=d?Object.fromEntries(r.split(",").map(v=>[v,d[v]])):null}return n}class _n{constructor(t){this.table=t,this.filters=[],this.orderBy=null,this.limitN=null,this.selectCols="*",this.mode="select",this.payload=null,this.wantSingle=!1,this.wantMaybe=!1}select(t="*"){return this.selectCols=t,this}eq(t,n){return this.filters.push(a=>String(a[t])===String(n)),this}neq(t,n){return this.filters.push(a=>String(a[t])!==String(n)),this}is(t,n){return this.filters.push(a=>a[t]===n),this}in(t,n){const a=new Set(n.map(String));return this.filters.push(s=>a.has(String(s[t]))),this}gte(t,n){return this.filters.push(a=>a[t]>=n),this}lte(t,n){return this.filters.push(a=>a[t]<=n),this}gt(t,n){return this.filters.push(a=>a[t]>n),this}lt(t,n){return this.filters.push(a=>a[t]<n),this}order(t,n){return this.orderBy={col:t,asc:(n==null?void 0:n.ascending)!==!1},this}limit(t){return this.limitN=t,this}single(){return this.wantSingle=!0,this}maybeSingle(){return this.wantSingle=!0,this.wantMaybe=!0,this}insert(t){return this.mode="insert",this.payload=t,this}update(t){return this.mode="update",this.payload=t,this}run(){var t;if(ae())return{data:null,error:{message:"Failed to fetch (demo offline)"},status:0};try{if(this.mode==="insert"){const o=(Array.isArray(this.payload)?this.payload:[this.payload]).map(u=>({id:crypto.randomUUID(),created_at:ye(be()),...u}));return(R[t=this.table]??(R[t]=[])).push(...o),{data:this.wantSingle?o[0]:o,error:null,status:201}}if(this.mode==="update"){const s=at(this.table).filter(o=>this.filters.every(r=>r(o)));for(const o of s)Object.assign(o,this.payload);return{data:s,error:null,status:200}}let n=at(this.table).filter(s=>this.filters.every(o=>o(s)));if(this.orderBy){const{col:s,asc:o}=this.orderBy;n=[...n].sort((r,u)=>(r[s]<u[s]?-1:r[s]>u[s]?1:0)*(o?1:-1))}this.limitN!==null&&(n=n.slice(0,this.limitN));const a=n.map(s=>vn(s,this.selectCols));return this.wantSingle?a.length===1?{data:a[0],error:null,status:200}:a.length===0&&this.wantMaybe?{data:null,error:null,status:200}:{data:null,error:{message:`single() saw ${a.length} rows`},status:406}:{data:a,error:null,status:200}}catch(n){return{data:null,error:{message:String(n.message)},status:500}}}then(t,n){return Promise.resolve(this.run()).then(t,n)}}const ve="tudent-demo-signed-in";function bn(){return{id:f(900),email:"amaya.demo@example.com",user_metadata:{full_name:"Amaya (Demo Student)"}}}function Ae(){return sessionStorage.getItem(ve)==="1"?{access_token:"demo-token",user:bn()}:null}const yn={async getSession(){return{data:{session:Ae()},error:null}},async getUser(){var e;return{data:{user:((e=Ae())==null?void 0:e.user)??null},error:null}},onAuthStateChange(e){return{data:{subscription:{unsubscribe(){}}}}},async signInWithOAuth(e){var n;sessionStorage.setItem(ve,"1");const t=((n=e==null?void 0:e.options)==null?void 0:n.redirectTo)??`${location.origin}${location.pathname}#week`;return location.href=t,location.reload(),{data:{},error:null}},async signInWithPassword(){return sessionStorage.setItem(ve,"1"),{data:{session:Ae()},error:null}},async signOut(){return sessionStorage.removeItem(ve),{error:null}}};function gn(e,t){const n=(a=null)=>Promise.resolve({data:a,error:null,status:200});if(ae())return Promise.resolve({data:null,error:{message:"Failed to fetch (demo offline)"},status:0});switch(e){case"record_event":case"report_client_error":return n();case"ensure_student_account":return n();case"record_attendance_mark":{const a=t;if(R.attendance_marks.some(o=>o.id===a.p_mark_id))return n(a.p_mark_id);let s=R.class_sessions.find(o=>o.batch_id===a.p_batch&&o.held_on===a.p_held_on);return s||(s={id:crypto.randomUUID(),tenant_id:w,batch_id:a.p_batch,held_on:a.p_held_on,coverage_note:"",completed_by:f(999)},R.class_sessions.push(s)),R.attendance_marks.push({id:a.p_mark_id,tenant_id:w,batch_id:a.p_batch,class_session_id:s.id,enrolment_id:a.p_enrolment,state:a.p_state,note:a.p_note??"",marked_by:f(999),marked_at:a.p_marked_at??ye(be()),created_at:ye(be())}),n(a.p_mark_id)}default:throw new Error(`demo client: no rpc fixture for "${e}"`)}}const wn=window.fetch.bind(window);window.fetch=(e,t)=>{var o;const a=(o=(typeof e=="string"?e:e instanceof URL?e.href:e.url).match(/functions\/v1\/([a-z-]+)/))==null?void 0:o[1];if(!a)return wn(e,t);if(ae())return Promise.reject(new TypeError("Failed to fetch (demo offline)"));const s=(r,u={})=>Promise.resolve(new Response(JSON.stringify(u),{status:r,headers:{"Content-Type":"application/json"}}));if(a==="join-opened")return Promise.resolve(new Response(null,{status:204}));if(a==="bill")return s(200,{outcome:"ok"});if(a==="join"){const r=JSON.parse(String((t==null?void 0:t.body)??"{}")),u=R.batches.find(d=>d.id===fe);if(r.action==="preview"&&!["DEMO2GETHER","DEMOROTATED"].includes(String(r.code??"").toUpperCase()))return s(404,{error:"invalid_code"});if(r.action==="preview")return s(200,{batch_label:u.label,teacher_name:"Nimal Perera (Demo Teacher)",location:u.location});if(r.action==="redeem")return R.enrolments.some(d=>d.batch_id===fe&&d.id===f(299))||R.enrolments.push({id:f(299),tenant_id:w,batch_id:fe,student_id:f(900),display_name:"Amaya (Demo Student)",guardian_phone:"",teacher_reference:"",status:"active",started_at:ye(be()),ended_at:null,version:1}),s(200,{batch_label:u.label});if(r.action==="create"||r.action==="rotate"){const d=sessionStorage.getItem("demo-rotated")==="1";r.action==="rotate"&&sessionStorage.setItem("demo-rotated",d?"0":"1");const v=(r.action==="rotate"?!d:d)?"DEMOROTATED":"DEMO2GETHER";return s(200,{code:v,batch_label:u.label})}return s(200,{})}return s(404,{})};function st(){const e=document.createElement("div");e.setAttribute("data-demo-ribbon",""),e.style.cssText="position:fixed;bottom:calc(84px + env(safe-area-inset-bottom,0px));left:0;right:0;z-index:9999;display:flex;gap:10px;align-items:center;justify-content:center;background:#1a4059;color:#fff;font:12px/1.2 -apple-system,system-ui,sans-serif;padding:8px 12px calc(8px + env(safe-area-inset-bottom, 0px));";const t=(r,u)=>{const d=document.createElement("button");return d.textContent=r,d.style.cssText=`font:inherit;border:1px solid rgba(255,255,255,.4);background:${u?"#fff":"transparent"};color:${u?"#1a4059":"#fff"};border-radius:999px;padding:3px 10px;cursor:pointer;`,d},n=document.createElement("span");n.textContent="Demo. Seeded pretend data, nothing here is real.";const a=t(ae()?"Back online":"Try offline",ae());a.addEventListener("click",()=>{sessionStorage.setItem("tudent-demo-offline",ae()?"0":"1"),location.reload()}),e.append(n,a),e.style.flexWrap="wrap",document.body.append(e);const s=()=>{const r=document.querySelector(".tabbar"),u=r?r.offsetHeight+16:0;document.body.style.paddingBottom=`${e.offsetHeight+u+16}px`};s(),new ResizeObserver(s).observe(e);const o=document.getElementById("app");o&&new MutationObserver(s).observe(o,{childList:!0})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",st):st();function $n(e,t){return{auth:yn,rpc:gn,from:n=>new _n(n),functions:{invoke:async n=>({data:null,error:{message:"demo: use fetch path"}})}}}const kn="",Sn="",y=$n(),St=crypto.randomUUID();async function K(e,t){try{await y.rpc("report_client_error",{p_correlation_id:St,p_app:"teacher",p_code:e.slice(0,64),p_message:t.slice(0,500)})}catch{}}window.addEventListener("error",e=>{K("window_error",String(e.message??"unknown"))});window.addEventListener("unhandledrejection",e=>{K("unhandled_rejection",String(e.reason??"unknown"))});async function En(){const{data:e,error:t}=await y.from("tenants").select("id,name").limit(1);if(!t&&e){const a=e[0]??null;return a&&await ge("tenant",a),a}const n=await we("tenant");return n?n.value:null}async function ot(e){var a;const{data:t}=await y.auth.getSession(),n=await fetch(`${kn}/functions/v1/join`,{method:"POST",headers:{"Content-Type":"application/json",apikey:Sn,Authorization:`Bearer ${((a=t.session)==null?void 0:a.access_token)??""}`,"x-correlation-id":St},body:JSON.stringify(e)});return{status:n.status,json:await n.json().catch(()=>({}))}}function Te(e,t={}){y.rpc("record_event",{p_correlation_id:crypto.randomUUID(),p_event_type:e,p_props:t}).then(({error:n})=>{n&&K("telemetry",`${e}: ${n.message}`)})}const Cn={batchId:"all",status:"active",query:"",sort:"name",desc:!1},qe=new Set(["withdrawn","transferred","completed"]);function it(e,t){const n=t.query.trim().normalize("NFC").toLowerCase(),a=e.filter(s=>!(t.batchId!=="all"&&s.batch_id!==t.batchId||t.status==="active"&&qe.has(s.status)||t.status==="ended"&&!qe.has(s.status)||n&&!`${s.display_name} ${s.teacher_reference} ${s.guardian_phone}`.normalize("NFC").toLowerCase().includes(n)));return a.sort((s,o)=>{let r=0;return t.sort==="name"?r=s.display_name.localeCompare(o.display_name):t.sort==="joined"?r=s.started_at.localeCompare(o.started_at):r=s.status.localeCompare(o.status),(t.desc?-r:r)||s.id.localeCompare(o.id)}),a}function Re(e){const t=e.trim().split(/\s+/).filter(Boolean);if(t.length===0)return"?";const n=t[0][0]??"",a=t.length>1?t[t.length-1][0]??"":"";return(n+a).toUpperCase()}function H(e){return new Date(e).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric",timeZone:"Asia/Colombo"})}function oe(e){return qe.has(e)}function xn(e,t){const n=o=>`"${String(o).replaceAll('"','""')}"`,a=["Name","Class","Reference","Guardian phone","Status","Joined"],s=e.map(o=>[o.display_name,t(o.batch_id),o.teacher_reference,o.guardian_phone,o.status,o.started_at.slice(0,10)].map(n).join(","));return[a.map(n).join(","),...s].join(`
`)}async function Et(){const e=await we("roster"),{data:t,error:n}=await y.from("enrolments").select("id,tenant_id,batch_id,display_name,guardian_phone,teacher_reference,status,started_at,ended_at");if(n||t===null){if(e)return{rows:e.value,fromCache:!0,savedAt:e.savedAt};throw new Error((n==null?void 0:n.message)??"roster unavailable")}const a=t;return await ge("roster",a),{rows:a,fromCache:!1,savedAt:null}}async function In(e,t){const{error:n}=await y.from("enrolments").update(t).eq("id",e);if(n)throw new Error(n.message)}async function Dn(e){const{error:t}=await y.from("enrolments").update({status:"withdrawn",ended_at:new Date().toISOString()}).eq("id",e);if(t)throw new Error(t.message)}const rt=(e,t)=>`roll:${e}:${t}`;function dt(e,t){if(e.error)throw new Error(`${t}: ${e.error.message}`);if(e.data===null)throw new Error(`${t}: no data`);return e.data}async function An(e,t){return(await vt()).filter(a=>a.kind==="attendance_mark"&&a.payload.held_on===t&&a.payload.batch_id===e)}async function Tn(e,t){const n=await An(e,t),a=n.filter(r=>r.status==="pending").length,s=n.filter(r=>r.status==="failed").map(r=>({enrolmentId:String(r.payload.enrolment_id??""),detail:r.lastError})),o=await we(rt(e,t));try{const r=dt(await y.from("enrolments").select("id,display_name,started_at,ended_at").eq("batch_id",e),"roll enrolments"),u=await y.from("class_sessions").select("id").eq("batch_id",e).eq("held_on",t).maybeSingle();if(u.error)throw new Error(`roll session: ${u.error.message}`);const d=u.data?dt(await y.from("attendance_current").select("enrolment_id,state,note").eq("class_session_id",u.data.id),"roll marks"):[],v=new Map(d.map(b=>[b.enrolment_id,b])),h=r.filter(b=>Rt(b,t)).map(b=>{var g,E;return{enrolment_id:b.id,display_name:b.display_name,marked:((g=v.get(b.id))==null?void 0:g.state)??null,note:((E=v.get(b.id))==null?void 0:E.note)??""}}).sort(Bn);return await ge(rt(e,t),h),{rows:ct(h,n),fromCache:!1,savedAt:null,pendingCount:a,failed:s}}catch(r){if(!o)throw r;return{rows:ct(o.value,n),fromCache:!0,savedAt:o.savedAt,pendingCount:a,failed:s}}}const Bn=(e,t)=>e.display_name.localeCompare(t.display_name)||e.enrolment_id.localeCompare(t.enrolment_id);function ct(e,t){const n=new Map;for(const a of t){if(a.status==="failed")continue;const s=a.payload;s.enrolment_id&&s.state&&n.set(s.enrolment_id,s.state)}return n.size===0?e:e.map(a=>n.has(a.enrolment_id)?{...a,marked:n.get(a.enrolment_id)}:a)}async function jn(e){await en({lane:e.enrolmentId,kind:"attendance_mark",idempotencyKey:crypto.randomUUID(),payload:{tenant_id:e.tenantId,batch_id:e.batchId,held_on:e.heldOn,enrolment_id:e.enrolmentId,state:e.state,note:e.note??"",marked_at:new Date().toISOString()}})}async function Ln(e){const t=e.payload;try{const{error:n}=await y.rpc("record_attendance_mark",{p_mark_id:e.idempotencyKey,p_tenant:t.tenant_id,p_batch:t.batch_id,p_held_on:t.held_on,p_enrolment:t.enrolment_id,p_state:t.state,p_note:t.note??"",p_marked_at:t.marked_at??null});if(!n)return{result:"ok"};const a=n.status,s=n.code??"";return typeof a=="number"&&a>=400||/^[0-9A-Z]{5}$/.test(s)?{result:"rejected",detail:`${s||a}: ${n.message}`}:{result:"unavailable",detail:n.message}}catch(n){return{result:"unavailable",detail:String(n)}}}async function lt(){const e=await tn(Ln);e.delivered>0&&Te("offline_sync_succeeded",{items:e.delivered});for(const t of e.failed)Te("offline_sync_failed",{reason:"rejected"});return e.heldBack>0&&e.delivered===0&&e.failed.length===0&&Te("offline_sync_failed",{reason:"unavailable"}),e}async function qn(e){const t=await y.from("attendance_marks").select("state,note,marked_at,class_sessions(held_on)").eq("enrolment_id",e).order("marked_at",{ascending:!1});if(t.error)throw new Error(t.error.message);return(t.data??[]).map(n=>{const a=n.class_sessions;return{state:n.state,note:n.note??"",marked_at:n.marked_at,held_on:(a==null?void 0:a.held_on)??""}})}async function Nn(){const{data:e,error:t}=await y.from("fee_events").select("id,enrolment_id,kind,amount_cents,effective_on,method,reference,note,reverses_id,recorded_at").order("effective_on",{ascending:!1}).order("recorded_at",{ascending:!1});if(t)throw new Error(t.message);return e??[]}async function ut(e){if(!Number.isInteger(e.amountCents))throw new Error("Amounts are whole cents.");const{error:t}=await y.from("fee_events").insert({id:crypto.randomUUID(),tenant_id:e.tenantId,enrolment_id:e.enrolmentId,kind:e.kind,amount_cents:e.amountCents,currency:"LKR",effective_on:e.effectiveOn,method:e.method??null,reference:e.reference??"",note:e.note??"",reverses_id:e.reversesId??null,recorded_by:e.recordedBy});if(t)throw new Error(Ne(t.message))}function Ne(e){return/fetch|network|Failed to fetch|NetworkError/i.test(e)?"You are offline, so this has NOT been recorded. Payments need a connection, because a receipt should never be a promise the ledger has not accepted yet. Nothing was saved; record it again when you have signal.":e.includes("fee_before_enrolment")?"That date is before this student joined. Check the date.":e.includes("reversal_must_match_original")?"A reversal has to undo the whole payment. For part of it, record an adjustment instead.":e.includes("cannot_reverse_a_reversal")?"That is already a reversal. To put the money back, record a new payment.":e.includes("fee_events_one_reversal_per_event")?"That payment has already been reversed.":e.includes("duplicate key")?"That was already recorded. Nothing was charged twice.":e.includes("violates check constraint")?"Check the amount and the method. A payment needs both, and cannot be zero.":e}function Mn(e){return{kind:"reversal",amountCents:-e.amount_cents,reversesId:e.id}}const x=document.getElementById("app");wt(localStorage.getItem("tudent-teacher-scope")??void 0);const Pe=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];let P=null;function p(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function W(){return new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Colombo"}).format(new Date)}"serviceWorker"in navigator&&navigator.serviceWorker.register("./sw.js");function ie(){const e=location.hash.slice(1)||"batches";(async()=>{const{data:t}=await y.auth.getSession();if(!t.session)return Rn();if(P===null&&(P=await En()),P===null)return Pn();if(e==="batches")return Fn();if(e==="roster")return Ct();if(e==="fees")return Me();if(e==="new")return Hn();const n=e.match(/^batch\/([0-9a-f-]+)\/roll\/(\d{4}-\d{2}-\d{2})$/);if(n)return Zn(n[1],n[2]);const a=e.match(/^batch\/([0-9a-f-]+)(\/preview)?$/);if(a)return a[2]?Gn(a[1]):_e(a[1]);location.hash="batches"})().catch(t=>{console.error("[route]",e,t),K("route_error",String(t)),x.innerHTML=`<div class="page"><p class="error">Something went wrong. Pull down is disabled, so use this instead:</p>
      <button class="btn" onclick="location.reload()">Reload</button></div>`})}window.addEventListener("hashchange",()=>{un(ie)});window.addEventListener("beforeunload",Oe);document.addEventListener("click",e=>{var t;(t=e.target)!=null&&t.closest("[data-nav],[data-tab]")&&Oe()},!0);window.addEventListener("beforeunload",Oe);const On=[{id:"batches",label:"Today",icon:pe.home,match:e=>e===""||e==="batches"||e.startsWith("batch/")},{id:"new",label:"New class",icon:pe.calendar},{id:"roster",label:"Students",icon:pe.users},{id:"fees",label:"Fees",icon:pe.wallet}];function X(e,t,n){x.innerHTML=`
    <header class="topbar">
      ${n!==void 0?`<button class="back" data-nav="${n}">Back</button>`:""}
      <h1>${p(e)}</h1>
    </header>
    <main class="page">${t}</main>
    ${dn(On,location.hash.slice(1)||"batches")}`,document.body.classList.add("has-tabbar"),x.querySelectorAll("[data-nav]").forEach(a=>a.addEventListener("click",()=>{location.hash=a.dataset.nav})),cn(x),ln(location.hash.slice(1)||"batches")}function Rn(){var t;x.innerHTML=`
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
    </div>`;let e=!1;document.getElementById("google-btn").addEventListener("click",()=>{e||(e=!0,document.getElementById("auth-status").textContent="Opening Google...",y.auth.signInWithOAuth({provider:"google",options:{redirectTo:`${location.origin}${location.pathname}`}}).then(({error:n})=>{if(n){const a=document.getElementById("auth-error");a.hidden=!1,a.textContent="Google sign-in did not finish.",document.getElementById("auth-status").textContent=""}}).finally(()=>{e=!1}))}),(t=document.getElementById("local-rail"))==null||t.addEventListener("submit",n=>{n.preventDefault();const a=new FormData(n.target);y.auth.signInWithPassword({email:String(a.get("email")),password:String(a.get("password"))}).then(({error:s})=>{if(s){const o=document.getElementById("auth-error");o.hidden=!1,o.textContent="That did not work. Check the email and password."}else P=null,ie()})})}function Pn(){X("Batch",`
    <p class="lede">Almost there</p>
    <p class="hint">This account is not linked to a teaching account yet. Ask Business Booster to set that up, then sign in again.</p>
    <button class="btn" id="out">Sign out</button>`),document.getElementById("out").addEventListener("click",()=>{y.auth.signOut().then(()=>{P=null,ie()})})}async function Fn(){var ze,Ze;const e=W(),t=e.slice(0,8)+"01",n=new Date(Date.now()-60*864e5).toISOString().slice(0,10),[{data:a},{data:s},{data:o},{data:r},{data:u},{data:d},{data:v}]=await Promise.all([y.auth.getUser(),y.from("batches").select("id,label,exam_year,location,mode,archived_at,tenant_id").is("archived_at",null).order("created_at"),y.from("batch_schedules").select("*"),y.from("enrolments").select("id,batch_id,display_name,status,started_at,ended_at"),y.from("class_sessions").select("id,batch_id,held_on").gte("held_on",n).lte("held_on",e),y.from("fee_events").select("enrolment_id,kind,amount_cents,effective_on").gte("effective_on",t),y.from("fee_events").select("enrolment_id")]),h=((ze=a.user)==null?void 0:ze.id)??"",b=new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Colombo",month:"long",year:"numeric"}).format(new Date);h&&(localStorage.setItem("tudent-teacher-scope",h),wt(h));const g=s??[],E=r??[],c=E.filter(m=>!oe(m.status)),i=u??[],l=d??[],_=mt((o??[]).map(m=>({id:String(m.id),batchId:String(m.batch_id),weekday:Number(m.weekday),startTime:String(m.start_time),durationMinutes:Number(m.duration_minutes),location:String(m.location),effectiveFrom:String(m.effective_from),effectiveUntil:m.effective_until===null?null:String(m.effective_until)})),[],e,7).sort((m,T)=>m.date===T.date?m.startTime.localeCompare(T.startTime):m.date.localeCompare(T.date)),$=m=>{var T;return((T=g.find(U=>U.id===m))==null?void 0:T.label)??""},k=_.filter(m=>m.date===e&&$(m.batchId)),B=_.find(m=>m.date!==e&&$(m.batchId)),V=m=>c.filter(T=>T.batch_id===m).length,ne=i.filter(m=>m.held_on===e);let G=[];i.length>0&&(G=(await y.from("attendance_current").select("class_session_id,enrolment_id,state,marked_at").in("class_session_id",i.map(T=>T.id))).data??[]);const q=k[0]??null,I=q?V(q.batchId):0,D=q?ne.find(m=>m.batch_id===q.batchId):null,C=D?G.filter(m=>m.class_session_id===D.id&&m.state==="absent").length:null;let L=0,F=0;for(const m of i.filter(T=>T.held_on>=t)){const T=E.filter(U=>U.batch_id===m.batch_id&&!oe(U.status)&&U.started_at.slice(0,10)<=m.held_on).length;L+=T,F+=G.filter(U=>U.class_session_id===m.id&&U.state==="absent").length}const z=L>0?Math.round((L-F)/L*100):null,re=l.reduce((m,T)=>m+T.amount_cents,0),me=new Set(l.filter(m=>m.kind==="payment").map(m=>m.enrolment_id)),de=c.filter(m=>me.has(m.id)).length,$e=c.length-de,Fe=c.length?Math.round(de/c.length*100):0,Ue=E.map(m=>({...m,batch_id:m.batch_id})),He=Vt(i,G,Ue),We=Yt(i,G,new Set((v??[]).map(m=>m.enrolment_id)),Ue,e),At=new Set((o??[]).map(m=>m.batch_id)),Ge=g.filter(m=>!At.has(m.id)),Tt=new Date(Date.now()-7*864e5).toISOString(),Y=c.filter(m=>m.started_at>=Tt),Bt=Y.length===0?"":Y.length<=2?Y.map(m=>m.display_name).join(" and "):`${Y.slice(0,2).map(m=>m.display_name).join(", ")} and ${Y.length-2} more`,J={rows:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h10"/></svg>',warn:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8v5"/><circle cx="12" cy="16.5" r=".6" fill="currentColor"/><path d="M10.3 3.9 2.6 17.2A1.6 1.6 0 0 0 4 19.6h16a1.6 1.6 0 0 0 1.4-2.4L13.7 3.9a1.6 1.6 0 0 0-2.8 0z"/></svg>',mail:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16v12H4z"/><path d="m4 8 8 6 8-6"/></svg>',chev:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m9 6 6 6-6 6"/></svg>'};X(P.name,`
    ${q?`
      <section class="hero" data-print-hide>
        <p class="eyebrow"><i class="dot"></i> Class today</p>
        <p class="h2">${p($(q.batchId))}</p>
        <p class="meta">${p(te(q.startTime))} · ${p(q.location)} · ${I} ${I===1?"student":"students"}</p>
        <div class="btn-row">
          <button class="btn primary full" data-nav="batch/${q.batchId}/roll/${e}">Take the roll</button>
          <button class="btn" data-nav="batch/${q.batchId}">Open class</button>
        </div>
      </section>
      <div class="stats" data-print-hide>
        ${C===null?`
          <div class="stat"><b>${I}</b><span>On the roll today</span></div>
          <div class="stat"><b>–</b><span>Roll not taken yet</span></div>`:`
          <div class="stat good"><b>${I-C}</b><span>Present today</span></div>
          <div class="stat warn"><b>${C}</b><span>Absent today</span></div>`}
        <div class="stat"><b>${z===null?"–":`${z}%`}</b><span>${z===null?"No rolls this month":"Attendance this month"}</span></div>
      </div>`:`
      ${B?`<p class="hint">No class today. Next: ${p($(B.batchId))}, ${p(se(B.date))} at ${p(te(B.startTime))}.</p>`:""}
      <div class="stats">
        <div class="stat"><b>${g.length}</b><span>${g.length===1?"Class":"Classes"}</span></div>
        <div class="stat"><b>${c.length}</b><span>Students</span></div>
        <div class="stat"><b>${z===null?"–":`${z}%`}</b><span>${z===null?"No rolls this month":"Attendance this month"}</span></div>
      </div>`}

    <p class="sec">Your classes</p>
    ${g.length===0?'<p class="hint">No classes yet. Set up your first one and share the join link with your students. It takes about two minutes.</p>':`<div class="card"><div class="list">${g.map(m=>{const T=(o??[]).find(jt=>jt.batch_id===m.id),U=V(m.id);return`
          <div class="row" data-nav="batch/${m.id}" role="link" tabindex="0" style="cursor:pointer">
            <span class="ico">${J.rows}</span>
            <div class="grow">
              <div class="strong">${p(m.label)}</div>
              <div class="hint">${T?`${Pe[T.weekday]}s · ${te(T.start_time.slice(0,5))} · `:""}${p(m.location)}</div>
            </div>
            ${T?U===0?'<span class="pill">No students yet</span>':`<span class="pill on">${U} ${U===1?"student":"students"}</span>`:'<span class="pill due">Needs a time</span>'}
          </div>`}).join("")}</div></div>`}

    <p class="sec" data-print-hide>Fees this month</p>
    <div class="card money-card" data-print-hide>
      <p class="big">${p(O(re))}</p>
      <p class="hint">Received, after reversals. Money that moved, not money that is owed.</p>
      ${c.length>0?`
        <div class="split-bar" role="img" aria-label="${de} paid, ${$e} nothing recorded">
          <i style="width:${Fe}%;background:var(--good)"></i>
          <i style="width:${100-Fe}%;background:var(--surface-2)"></i>
        </div>
        <div class="legend">
          <em><span class="sw" style="background:var(--good)"></span> ${de} paid</em>
          <em><span class="sw" style="background:var(--surface-2)"></span> ${$e} nothing recorded</em>
        </div>`:""}
    </div>

    ${Ge.length>0||Y.length>0||He.length>0||We.length>0?`
      <p class="sec" data-print-hide>Needs you</p>
      <div class="card" data-print-hide><div class="list">
        ${Ge.map(m=>`
          <div class="row" data-nav="batch/${m.id}" role="link" tabindex="0" style="cursor:pointer">
            <span class="ico" style="color:var(--warn)">${J.warn}</span>
            <div class="grow">
              <div class="strong">${p(m.label)} has no weekly time</div>
              <div class="hint">Students cannot see it on their week yet</div>
            </div>
            ${J.chev}
          </div>`).join("")}
        ${He.map(m=>`
          <div class="row" data-nav="roster" role="link" tabindex="0" style="cursor:pointer">
            <span class="ico" style="color:var(--warn)">${J.warn}</span>
            <div class="grow">
              <div class="strong">${p(m.display_name)} has missed 2 classes in a row</div>
              <div class="hint">${p($(m.batch_id))} · worth a call before it becomes a habit</div>
            </div>
            ${J.chev}
          </div>`).join("")}
        ${We.map(m=>`
          <div class="row" data-nav="roster" role="link" tabindex="0" style="cursor:pointer">
            <span class="ico" style="color:var(--warn)">${J.warn}</span>
            <div class="grow">
              <div class="strong">${p(m.display_name)} joined but has never appeared</div>
              <div class="hint">Enrolled over a month, no attendance mark and no fee entry yet</div>
            </div>
            ${J.chev}
          </div>`).join("")}
        ${Y.length>0?`
          <div class="row" data-nav="roster" role="link" tabindex="0" style="cursor:pointer">
            <span class="ico">${J.mail}</span>
            <div class="grow">
              <div class="strong">${Y.length} ${Y.length===1?"student":"students"} joined this week</div>
              <div class="hint">${p(Bt)}</div>
            </div>
            ${J.chev}
          </div>`:""}
      </div></div>`:""}

    <div class="btn-row">
      <button class="btn primary" data-nav="new">Set up a class</button>
      <button class="btn" data-nav="roster">Students</button>
      <button class="btn" data-nav="fees">Fees</button>
    </div>
    
    <div class="print-head">
      <p class="strong">${p(P.name)}</p>
      <p class="hint">Month sheet · ${p(b)} · printed ${p(se(e))}</p>
      
      <div class="print-summary">
        <p><span class="hint">Attendance this month</span>
           <span class="strong">${z===null?"No classes marked yet":`${z}%`}</span></p>
        <p><span class="hint">Received this month</span>
           <span class="strong">${p(O(re))}</span></p>
        <p><span class="hint">Students</span>
           <span class="strong">${c.length} active in ${g.length} ${g.length===1?"class":"classes"}</span></p>
        <p><span class="hint">Fee entries this month</span>
           <span class="strong">${de} paid, ${$e} nothing recorded</span></p>
      </div>
    </div>
    <p class="sec" data-print-hide>This month on paper</p>
    <div class="card" data-print-hide>
      <p class="hint">A single page for your own records or for a parent:
        classes held, attendance and money received. No phone numbers and no
        student-by-student money, because paper cannot be taken back.</p>
      <div class="btn-row">
        <button class="btn" id="print-month">Print the month sheet</button>
      </div>
    </div>
    <div class="print-foot">
      <p class="hint">Attendance is counted against the roll as it stood on
        each class day, so a student who joined mid-month is not counted
        absent for classes held before they joined. Money shown is money
        received after reversals, not money owed.</p>
    </div>

    <p class="sec" data-print-hide>Appearance</p>
    <div class="card" data-print-hide>
      <p class="hint">Your choice, on this phone. It changes the accent colour
        only: money stays green and absences stay amber in every one, so a
        colour never changes what it means.</p>
      ${sn(yt(h))}
    </div>

    <button class="btn quiet" id="out">Sign out</button>`),x.querySelectorAll("[data-nav]").forEach(m=>m.addEventListener("click",()=>{location.hash=m.dataset.nav})),on(x,h),(Ze=document.getElementById("print-month"))==null||Ze.addEventListener("click",()=>window.print()),document.getElementById("out").addEventListener("click",()=>{y.auth.signOut().then(()=>{P=null,ie()})})}let A={...Cn};async function Ct(){xt();const[e,t]=await Promise.all([Et(),y.from("batches").select("id,label").is("archived_at",null).order("created_at")]),n=e.rows,a=t.data??[],s=h=>{var b;return((b=a.find(g=>g.id===h))==null?void 0:b.label)??"Class"},o=it(n,A),r=A.sort+(A.desc?":d":""),u=(h,b)=>`<button data-sort="${h}">${b}${A.sort===h?A.desc?" ↓":" ↑":""}</button>`;X("Students",`
    ${e.fromCache?`
      <div class="card">
        <div class="strong">Working from this phone</div>
        <p class="hint">You are offline, so this is your class list as it was saved here${e.savedAt?` on ${p(new Date(e.savedAt).toLocaleString("en-GB",{timeZone:"Asia/Colombo",weekday:"short",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}))}`:""}. Changes need a connection.</p>
      </div>`:""}
    <div class="card roster-pane">
      <div class="toolbar">
        <label class="grow-2">Search
          <input id="r-q" value="${p(A.query)}" placeholder="Name, reference or phone"
                 autocapitalize="off" autocorrect="off" spellcheck="false" />
        </label>
        <label>Class
          <select id="r-batch">
            <option value="all">All classes</option>
            ${a.map(h=>`<option value="${h.id}" ${A.batchId===h.id?"selected":""}>${p(h.label)}</option>`).join("")}
          </select>
        </label>
        <label>Status
          <select id="r-status">
            ${[["active","On the roll"],["ended","Left"],["all","Everyone"]].map(([h,b])=>`<option value="${h}" ${A.status===h?"selected":""}>${b}</option>`).join("")}
          </select>
        </label>
        <label class="phone-only">Order
          <select id="r-sort">
            ${[["name","Name A to Z"],["name:d","Name Z to A"],["joined","Joined, oldest first"],["joined:d","Joined, newest first"],["status","Status"]].map(([h,b])=>`<option value="${h}" ${r===h?"selected":""}>${b}</option>`).join("")}
          </select>
        </label>
      </div>
      <p class="count-line" id="r-count">${o.length} of ${n.length} ${n.length===1?"student":"students"}</p>
    </div>

    ${o.length===0?`
      <div class="card"><p class="hint empty">${n.length===0?"Nobody has joined yet. Share a class link and they will appear here as they join.":"No students match this search. Clear it to see everyone."}</p></div>`:`
      <div class="card roster-pane">
        <div class="list roster-list">
          ${o.map(h=>`
            <button class="roster-row" data-open="${h.id}">
              <span class="roster-av" aria-hidden="true">${p(Re(h.display_name))}</span>
              <span class="grow">
                <span class="roster-name">${p(h.display_name||"Unnamed")}</span>
                ${A.batchId==="all"?`<span class="roster-meta">${p(s(h.batch_id))}</span>`:""}
                <span class="roster-sub">joined ${H(h.started_at)}</span>
              </span>
              <span class="status-tag ${oe(h.status)?"is-ended":"is-active"}">${p(h.status)}</span>
            </button>`).join("")}
        </div>

        <table class="roster-table">
          <thead><tr>
            <th>${u("name","Name")}</th>
            <th>Class</th>
            <th>Reference</th>
            <th>Guardian phone</th>
            <th>${u("joined","Joined")}</th>
            <th>${u("status","Status")}</th>
          </tr></thead>
          <tbody>
            ${o.map(h=>`
              <tr data-open="${h.id}">
                <td><strong>${p(h.display_name||"Unnamed")}</strong></td>
                <td>${p(s(h.batch_id))}</td>
                <td>${p(h.teacher_reference||"-")}</td>
                <td class="num">${p(h.guardian_phone||"-")}</td>
                <td class="num">${H(h.started_at)}</td>
                <td><span class="status-tag ${oe(h.status)?"is-ended":"is-active"}">${p(h.status)}</span></td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div>`}

    <div class="btn-row">
      <button class="btn" id="r-export" ${o.length===0?"disabled":""}>Export this list</button>
    </div>
    <div class="card" id="r-detail" hidden></div>`,"batches");const d=()=>{Ct()},v=document.getElementById("r-q");v.addEventListener("input",()=>{A={...A,query:v.value};const h=it(n,A);document.getElementById("r-count").textContent=`${h.length} of ${n.length} ${n.length===1?"student":"students"}`,clearTimeout(v._t),v._t=window.setTimeout(d,250)}),document.getElementById("r-batch").addEventListener("change",h=>{A={...A,batchId:h.target.value},d()}),document.getElementById("r-status").addEventListener("change",h=>{A={...A,status:h.target.value},d()}),document.getElementById("r-sort").addEventListener("change",h=>{const[b,g]=h.target.value.split(":");A={...A,sort:b,desc:g==="d"},d()}),x.querySelectorAll("[data-sort]").forEach(h=>h.addEventListener("click",()=>{const b=h.dataset.sort;A={...A,sort:b,desc:A.sort===b?!A.desc:!1},d()})),x.querySelectorAll("[data-open]").forEach(h=>h.addEventListener("click",()=>Un(n.find(b=>b.id===h.dataset.open),s,d))),document.getElementById("r-export").addEventListener("click",()=>{const h=xn(o,s),b=URL.createObjectURL(new Blob([h],{type:"text/csv"})),g=document.createElement("a");g.href=b,g.download=`students-${new Date().toISOString().slice(0,10)}.csv`,g.click(),URL.revokeObjectURL(b)})}function xt(){const e=document.getElementById("r-detail");e&&(e.hidden=!0),document.body.classList.remove("detail-open")}function Un(e,t,n){var s;const a=document.getElementById("r-detail");a.hidden=!1,document.body.classList.add("detail-open"),a.innerHTML=`
    <div class="strong">${p(e.display_name||"Unnamed")}</div>
    <p class="hint">${p(t(e.batch_id))} · joined ${H(e.started_at)} · ${p(e.status)}</p>
    <form id="r-form">
      <label>Name in your class list
        <input name="display_name" value="${p(e.display_name)}" />
      </label>
      <label>Your reference
        <input name="teacher_reference" value="${p(e.teacher_reference)}" placeholder="Optional" />
      </label>
      <label>Guardian phone
        <input name="guardian_phone" value="${p(e.guardian_phone)}" inputmode="tel" />
      </label>
      <button class="btn primary full" type="submit">Save</button>
      <p class="notice" id="r-saved" hidden>Saved.</p>
      <p class="error" id="r-err" hidden></p>
    </form>
    <div id="r-history" class="history-block"><p class="hint">Loading attendance…</p></div>
    ${oe(e.status)?"":'<button class="btn danger-quiet" id="r-withdraw">Remove from the class</button>'}
    <button class="btn quiet" id="r-close">Close</button>`,Kn(e.id,document.getElementById("r-history")).catch(o=>{document.getElementById("r-history").innerHTML='<p class="hint">Attendance could not be loaded just now.</p>',K("attendance_history_failed",String(o))}),a.scrollIntoView({block:"start"}),document.getElementById("r-form").addEventListener("submit",o=>{o.preventDefault();const r=new FormData(o.target);In(e.id,{display_name:String(r.get("display_name")).trim(),teacher_reference:String(r.get("teacher_reference")).trim(),guardian_phone:String(r.get("guardian_phone")).trim()}).then(()=>{document.getElementById("r-saved").hidden=!1,n()}).catch(u=>{K("roster_save",String(u));const d=document.getElementById("r-err");d.hidden=!1,d.textContent="Could not save that. Try again."})}),(s=document.getElementById("r-withdraw"))==null||s.addEventListener("click",()=>{Dn(e.id).then(n).catch(o=>{K("roster_withdraw",String(o))})}),document.getElementById("r-close").addEventListener("click",xt)}function Hn(){const e=new Date().getFullYear();X("New class",`
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
            <select name="weekday">${Pe.map((t,n)=>`<option value="${n}" ${n===6?"selected":""}>${t}</option>`).join("")}</select>
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
    </form>`,"batches"),document.getElementById("nb").addEventListener("submit",t=>{t.preventDefault();const n=new FormData(t.target),a=t.target.querySelector("button[type=submit]");a.disabled=!0,(async()=>{const{data:s,error:o}=await y.from("batches").insert({tenant_id:P.id,label:String(n.get("label")).trim(),exam_year:Number(n.get("exam_year")),location:String(n.get("location")).trim(),mode:String(n.get("mode"))}).select("id").single();if(o||!s)throw new Error((o==null?void 0:o.message)??"batch insert failed");const{error:r}=await y.from("batch_schedules").insert({tenant_id:P.id,batch_id:s.id,weekday:Number(n.get("weekday")),start_time:String(n.get("start_time")),duration_minutes:Number(n.get("duration")),location:String(n.get("location")).trim(),effective_from:W()});if(r)throw new Error(r.message);location.hash=`batch/${s.id}`})().catch(s=>{a.disabled=!1,K("new_batch",String(s));const o=document.getElementById("nb-err");o.hidden=!1,o.textContent="Could not create the class. Try again."})})}async function It(e){const[t,n,a]=await Promise.all([y.from("batches").select("*").eq("id",e).single(),y.from("batch_schedules").select("*").eq("batch_id",e),y.from("schedule_exceptions").select("*").eq("batch_id",e)]),s=t.data,o=n.data??[],r=a.data??[],u=mt(o.map(d=>({id:d.id,batchId:d.batch_id,weekday:d.weekday,startTime:d.start_time,durationMinutes:d.duration_minutes,location:d.location,effectiveFrom:d.effective_from,effectiveUntil:d.effective_until})),r.map(d=>({id:d.id,batchId:d.batch_id,kind:d.kind,originalDate:d.original_date,newStart:d.new_start,newDurationMinutes:d.new_duration_minutes,newLocation:d.new_location,note:d.note})),W(),14);return{batch:s,schedules:o,exceptions:r,occurrences:u}}function Wn(e){const t=e.status==="moved"?`<span class="tag moved">Moved${e.movedFromDate?` from ${se(e.movedFromDate)}`:""}</span>`:e.status==="extra"?'<span class="tag extra">Extra class</span>':"";return`<div class="strong">${se(e.date)} · ${te(e.startTime)}</div>
          <div class="hint">${p(e.location)}${t?" ":""}${t}</div>`}async function _e(e){var c;const{batch:t,schedules:n,occurrences:a}=await It(e),{data:s}=await y.auth.getUser(),o=((c=s.user)==null?void 0:c.id)??"",r=n[0];X(t.label,`
    <div class="card">
      <div class="row">
        <div class="grow">
          <div class="strong">${r?`${Pe[r.weekday]}s · ${te(r.start_time.slice(0,5))}`:"No weekly time set"}</div>
          <div class="hint">${p(t.location)}</div>
        </div>
        <button class="btn quiet" data-nav="batch/${e}/preview">Student preview</button>
      </div>
    </div>

    
    <div class="section-nav" role="navigation" aria-label="Sections">
      <button class="btn quiet" data-jump="sec-roll">Roll</button>
      <button class="btn quiet" data-jump="sec-after">After class</button>
      <button class="btn quiet" data-jump="sec-invite">Invite</button>
      <button class="btn quiet" data-jump="sec-sched">Schedule</button>
    </div>

    <p class="sec" id="sec-roll">Take the roll</p>
    <div class="card primary">
      <p class="hint">Everyone is marked present. Open this and tap only the students who are not here.</p>
      <div class="btn-row">
        ${a.slice(0,2).map(i=>`
          <button class="btn" data-nav="batch/${e}/roll/${i.date}">${p(zn(i.date))}</button>`).join("")||'<p class="hint">No classes scheduled to take a roll for.</p>'}
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
      <p class="hint" id="invite-loading">Getting this class's link...</p>
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
      ${a.length===0?'<p class="hint">No classes in the next two weeks.</p>':a.map((i,l)=>`
        <div>
          <div class="row">
            <div class="grow">${Wn(i)}</div>
            ${i.status==="scheduled"?`<button class="btn quiet" data-occ="${l}">Change</button>`:""}
          </div>
          <div class="btn-row" data-occ-actions="${l}" hidden>
            <button class="btn danger-quiet" data-cancel="${i.date}">Cancel this class</button>
            <button class="btn quiet" data-move="${i.date}|${i.startTime}">Move it</button>
          </div>
          <form class="btn-row" data-move-form="${i.date}" hidden>
            <input name="date" type="date" value="${i.date}" required />
            <input name="time" type="time" value="${i.startTime}" required />
            <button class="btn primary" type="submit">Save</button>
          </form>
        </div>`).join("")}
    </div></div>

    <p class="sec">Add a one-off class</p>
    <form class="card" id="extra">
      <div class="field-pair">
        <label>Date <input name="date" type="date" value="${W()}" required /></label>
        <label>Time <input name="time" type="time" value="${r?r.start_time.slice(0,5):"15:30"}" required /></label>
      </div>
      <button class="btn full" type="submit">Add extra class</button>
    </form>`,"batches"),x.querySelectorAll("[data-nav]").forEach(i=>i.addEventListener("click",()=>{location.hash=i.dataset.nav})),x.querySelectorAll("[data-jump]").forEach(i=>i.addEventListener("click",()=>{var l;(l=document.getElementById(i.dataset.jump))==null||l.scrollIntoView({behavior:"smooth",block:"start"})})),Dt(t,o);const u=document.getElementById("invite-note"),d=document.getElementById("code-line");async function v(i){const l=await ot({action:i,tenant_id:t.tenant_id,batch_id:e});return l.status!==200?(u.hidden=!1,u.textContent="Could not get a join link. Try again.",null):String(l.json.code)}const h=`tudent-join-code:${e}`;let b=null,g=0;const E=i=>{var B;b=i,localStorage.setItem(h,i),d.hidden=!1,d.textContent=i;const l=`https://businessboosterlk.github.io/tudent/app/#join/${encodeURIComponent(i)}`,_=Zt(l,`Join link for ${t.label}`),$=document.getElementById("qr-card"),k=document.getElementById("qr-box");_&&(k.innerHTML=_,$.hidden=!1),(B=document.getElementById("invite-loading"))==null||B.remove()};(async()=>{var $;const i=g,l=localStorage.getItem(h);if(l){const k=await ot({action:"preview",code:l}).catch(()=>null);if(g!==i)return;if(k&&k.status===200)return E(l);if(k===null){E(l),u.hidden=!1,u.textContent="Saved on this phone. Could not check it is still current.";return}localStorage.removeItem(h)}const _=await v("create");g===i&&(_!==null?E(_):($=document.getElementById("invite-loading"))==null||$.remove())})(),document.getElementById("share").addEventListener("click",()=>{g+=1,(async()=>{const i=b??await v("create");if(i===null)return;E(i),u.hidden=!1,u.textContent="This code is also shown here in case WhatsApp does not open.";const l=`Join my ${t.label} class on Tudent.

1. Open https://businessboosterlk.github.io/tudent/
2. Sign in with Google
3. Enter this code: ${i}

The code is for this class group only. Please do not forward it.`;window.open(`https://wa.me/?text=${encodeURIComponent(l)}`,"_blank","noopener")})()}),document.getElementById("rotate").addEventListener("click",()=>{g+=1,(async()=>{const i=await v("rotate");i!==null&&(E(i),u.hidden=!1,u.textContent="The old link no longer works. Share this new one with the class.")})()}),x.querySelectorAll("[data-occ]").forEach(i=>i.addEventListener("click",()=>{const l=i.dataset.occ,_=x.querySelector(`[data-occ-actions="${l}"]`);_.hidden=!_.hidden})),x.querySelectorAll("[data-cancel]").forEach(i=>i.addEventListener("click",()=>{y.from("schedule_exceptions").insert({tenant_id:t.tenant_id,batch_id:e,kind:"cancelled",original_date:i.dataset.cancel,created_by:o}).then(()=>_e(e))})),x.querySelectorAll("[data-move]").forEach(i=>i.addEventListener("click",()=>{const[l]=i.dataset.move.split("|"),_=x.querySelector(`[data-move-form="${l}"]`);_.hidden=!1})),x.querySelectorAll("[data-move-form]").forEach(i=>i.addEventListener("submit",l=>{l.preventDefault();const _=new FormData(i);y.from("schedule_exceptions").insert({tenant_id:t.tenant_id,batch_id:e,kind:"moved",original_date:i.dataset.moveForm,new_start:`${_.get("date")}T${_.get("time")}:00+05:30`,new_location:t.location,created_by:o}).then(()=>_e(e))})),document.getElementById("extra").addEventListener("submit",i=>{i.preventDefault();const l=new FormData(i.target);y.from("schedule_exceptions").insert({tenant_id:t.tenant_id,batch_id:e,kind:"extra",new_start:`${l.get("date")}T${l.get("time")}:00+05:30`,new_location:t.location,created_by:o}).then(()=>_e(e))})}async function Dt(e,t){const n=document.getElementById("complete-card");if(!n)return;const a=W(),[{data:s},{data:o}]=await Promise.all([y.from("canonical_topics").select("id,name").order("sort_order"),y.from("class_sessions").select("id,held_on,topic_id, next_actions(id,title,estimated_minutes,due_at,result_visibility)").eq("batch_id",e.id).eq("held_on",a)]),r=o==null?void 0:o[0];if(r){const u=r.next_actions,d=Array.isArray(u)?u[0]:u;n.innerHTML=`
      <div class="strong">Today's class is recorded</div>
      ${d?`<p class="hint">Your students' next step: ${p(d.title)}, about ${d.estimated_minutes} minutes.</p>`:'<p class="hint">No next step was set for this class.</p>'}`;return}n.innerHTML=`
    <form id="cc">
      <label>What did today's class cover?
        <select name="topic">${(s??[]).map(u=>`<option value="${u.id}">${p(u.name)}</option>`).join("")}</select>
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
    </form>`,document.getElementById("cc").addEventListener("submit",u=>{var E;u.preventDefault();const d=new FormData(u.target),v=String(d.get("topic")),h=((E=(s??[]).find(c=>c.id===v))==null?void 0:E.name)??"today’s topic",b=Number(d.get("due")),g=new Date(Date.now()+b*24*60*60*1e3);(async()=>{const{data:c,error:i}=await y.from("class_sessions").insert({tenant_id:e.tenant_id,batch_id:e.id,held_on:a,topic_id:v,completed_by:t}).select("id").single();if(i||!c)throw new Error((i==null?void 0:i.message)??"session failed");const{error:l}=await y.from("next_actions").insert({tenant_id:e.tenant_id,batch_id:e.id,class_session_id:c.id,title:String(d.get("title")).trim()||`Review ${h}`,topic_id:v,estimated_minutes:Number(d.get("minutes")),due_at:g.toISOString(),result_visibility:String(d.get("visibility")),created_by:t});if(l)throw new Error(l.message);Dt(e,t)})().catch(c=>{K("complete_class",String(c)),y.auth.getSession().then(({data:i})=>{if(!i.session){P=null,ie();return}const l=document.getElementById("cc-err");l.hidden=!1,l.textContent="Could not record the class. Try again."})})})}async function Gn(e){const{batch:t,occurrences:n}=await It(e),a=Mt(n.map(s=>({occ:s,label:t.label})),[]);X("Student preview",`
    <p class="hint">This is exactly what a student in ${p(t.label)} sees on their timetable. Items from this class are marked confirmed by teacher.</p>
    <div class="card"><div class="list">
      ${a.length===0?'<p class="hint empty">Nothing coming up.</p>':a.map(s=>`
        <div${s.date===W()?' class="today"':""}>
          <div class="strong">${p(s.heading)}</div>
          <div class="hint">${p(s.detail)}</div>
          <div class="hint">${s.marker}${s.qualifier?` · ${s.qualifier}`:""}</div>
        </div>`).join("")}
    </div></div>`,`batch/${e}`),x.querySelectorAll("[data-nav]").forEach(s=>s.addEventListener("click",()=>{location.hash=s.dataset.nav}))}ie();function zn(e){return e===W()?"Today":H(`${e}T00:00:00Z`)}async function Zn(e,t){var E;try{await lt()}catch{}const n=await we(`batch:${e}`);let a;const s=await y.from("batches").select("id,label,tenant_id").eq("id",e).maybeSingle();if(!s.error&&s.data)a=s.data,await ge(`batch:${e}`,a);else if(n)a=n.value;else throw new Error(((E=s.error)==null?void 0:E.message)??"batch unavailable offline");let o=await Tn(e,t),r=o.rows;const u=c=>new Date(c).toLocaleString("en-GB",{timeZone:"Asia/Colombo",weekday:"short",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}),d=()=>{const c=ke(r);X(a.label,`
      ${o.fromCache?`
        <div class="card">
          <div class="strong">Working from this phone</div>
          <p class="hint">You are offline, so this is the roll as it was saved here${o.savedAt?` on ${p(u(o.savedAt))}`:""}. Your taps are kept and will send when you have signal.</p>
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
        <p class="roll-day">${p(t===W()?`Today · ${H(`${t}T00:00:00Z`)}`:H(`${t}T00:00:00Z`))}</p>
        <p class="roll-turnout" id="turnout">${p(Ve(c))}</p>
        <div class="btn-row">
          <button class="btn" id="copy-summary">Copy class summary</button>
        </div>
        <p class="notice" id="copy-note" role="status" hidden></p>
      </div>

      ${r.length===0?`
        <div class="card"><p class="hint empty">Nobody was on the roll for this class. Students who join later will appear on the classes held after they joined, never before.</p></div>`:`
        <div class="card">
          <div class="list roll-list">
            ${r.map(i=>`
              <button class="roll-row is-${i.marked??"unmarked"}" data-mark="${i.enrolment_id}">
                <span class="roster-av" aria-hidden="true">${p(Re(i.display_name))}</span>
                <span class="grow">
                  <span class="roster-name">${p(i.display_name)}</span>
                  ${i.note?`<span class="roster-sub">${p(i.note)}</span>`:""}
                </span>
                <span class="mark-tag is-${i.marked??"unmarked"}">${p(Be(i.marked))}</span>
              </button>`).join("")}
          </div>
        </div>
        <p class="hint">Tap a student to change them: present, absent, late, and back. Every tap is kept, so a correction never erases what you first recorded.</p>`}
    `,`batch/${e}`),x.querySelectorAll("[data-nav]").forEach(i=>i.addEventListener("click",()=>{location.hash=i.dataset.nav})),x.querySelectorAll("[data-mark]").forEach(i=>i.addEventListener("click",()=>{v(i.dataset.mark)})),g()};async function v(c){const i=r.find($=>$.enrolment_id===c);if(!i)return;const l=Ot(i.marked),_=i.marked;i.marked=l,h(c,l);try{await jn({tenantId:a.tenant_id,batchId:e,heldOn:t,enrolmentId:c,state:l})}catch($){i.marked=_,h(c,_),K("attendance_queue_failed",String($));const k=document.getElementById("turnout");k&&(k.textContent="That tap could not be saved on this phone. Try again.");return}lt().catch(()=>{})}function h(c,i){const l=x.querySelector(`[data-mark="${c}"]`);if(!l)return;const _=i??"unmarked";l.className=`roll-row is-${_}`;const $=l.querySelector(".mark-tag");$.className=`mark-tag is-${_}`,$.textContent=Be(i);const k=document.getElementById("turnout");k&&(k.textContent=Ve(ke(r)))}async function b(){var $;const c=ke(r),i=H(`${t}T00:00:00Z`),l=c.absent===0&&c.late===0?`All ${c.total} present`:`${c.total-c.absent} of ${c.total} present`+(c.absent?`, ${c.absent} absent`:"")+(c.late?`, ${c.late} late`:"");let _="";try{const B=(($=(await y.from("class_sessions").select("coverage_note").eq("batch_id",e).eq("held_on",t).maybeSingle()).data)==null?void 0:$.coverage_note)??"";B.trim()&&(_=`
Covered: ${B.trim()}`)}catch{}return`${a.label} · ${i}
${l}${_}`}const g=()=>{var c;(c=document.getElementById("copy-summary"))==null||c.addEventListener("click",()=>{(async()=>{const i=await b(),l=document.getElementById("copy-note");try{await navigator.clipboard.writeText(i),l&&(l.hidden=!1,l.textContent="Copied. Paste it into your class group.")}catch{l&&(l.hidden=!1,l.textContent=i)}navigator.share&&navigator.share({text:i}).catch(()=>{})})()})};d()}async function Kn(e,t){const n=await qn(e);if(n.length===0){t.innerHTML='<p class="hint">Present at every class so far. Only absences and corrections are recorded.</p>';return}t.innerHTML=`
    <p class="hint">Every mark, newest first. Corrections are kept beside what they corrected.</p>
    <div class="list">
      ${n.map(a=>`
        <div class="row">
          <span class="grow">${p(a.held_on?H(`${a.held_on}T00:00:00Z`):"Unknown day")}
            ${a.note?`<span class="roster-sub">${p(a.note)}</span>`:""}</span>
          <span class="mark-tag is-${a.state}">${p(Be(a.state))}</span>
        </div>`).join("")}
    </div>`}let Q=null;async function Me(){var E;const{data:e}=await y.auth.getUser(),t=((E=e.user)==null?void 0:E.id)??"",[n,a]=await Promise.all([Nn(),Et()]),s=a.rows,o=c=>{var i;return((i=s.find(l=>l.id===c))==null?void 0:i.display_name)??"Unknown student"},r=Se(n),u=s.filter(c=>!oe(c.status));function d(){const c=W(),i=n.filter(k=>k.effective_on===c),l=H(`${c}T00:00:00Z`);if(i.length===0)return`Tudent daybook · ${l}
Nothing recorded today.`;const _=i.map(k=>{const B=o(k.enrolment_id),V=Ye(k.kind),ne=k.method?` · ${Ee(k.method)}`:"",G=k.reference?` · ref ${k.reference}`:"";return`${O(k.amount_cents)} · ${V} · ${B}${ne}${G}`}),$=i.reduce((k,B)=>k+B.amount_cents,0);return`Tudent daybook · ${l}
${_.join(`
`)}
Recorded today: ${O($)}. Money that moved, not money owed.`}let v=null;const h=()=>{if(Q)return b();X("Fees",`
      <div class="card">
        <p class="kpi-figure">${p(O(r.netCents))}</p>
        <p class="hint">Received, after reversals and adjustments. This is money that moved, not money that is owed.</p>
        <div class="kpi-split">
          <span>${p(O(r.paidCents))} paid</span>
          ${r.reversedCents?`<span class="is-negative">${p(O(r.reversedCents))} reversed</span>`:""}
          ${r.adjustedCents?`<span>${p(O(r.adjustedCents))} adjusted</span>`:""}
          <span>${r.eventCount} ${r.eventCount===1?"entry":"entries"}</span>
        </div>
      </div>

      <div class="btn-row">
        <button class="btn" id="copy-daybook">Copy today's digest</button>
      </div>
      <p class="notice" id="daybook-note" role="status" hidden></p>

      <p class="sec">Received, by student</p>
      ${u.length===0?`
        <div class="card"><p class="hint empty">Nobody is on the roll yet. Students appear here once they join a class.</p></div>`:`
        <div class="card"><div class="list">
          ${u.map(c=>{const i=n.filter(_=>_.enrolment_id===c.id),l=Se(i);return`
            <button class="roster-row" data-fee-student="${c.id}">
              <span class="roster-av" aria-hidden="true">${p(Re(c.display_name))}</span>
              <span class="grow">
                <span class="roster-name">${p(c.display_name)}</span>
                <span class="roster-sub">${i.length===0?"Nothing recorded":`${i.length} ${i.length===1?"entry":"entries"}`}</span>
              </span>
              <span class="money${l.netCents<0?" is-negative":""}">${p(O(l.netCents))}</span>
            </button>`}).join("")}
        </div></div>`}
    `,"batches"),g()};function b(){var ne,G,q;const c=n.filter(I=>I.enrolment_id===Q),i=Se(c),l=Pt(c).reverse(),_=new Set(c.map(I=>I.reverses_id).filter(Boolean));X(o(Q),`
      <div class="card">
        <p class="kpi-figure">${p(O(i.netCents))}</p>
        <p class="hint">Received from this student, after reversals and adjustments.</p>
      </div>

      ${v?`
        <div class="card primary">
          <p class="strong">Recorded.</p>
          <p class="hint" id="receipt-text">${p(v)}</p>
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
      ${l.length===0?`
        <div class="card"><p class="hint empty">Nothing recorded for this student yet.</p></div>`:`
        <div class="card"><div class="list">
          ${l.map(({event:I,runningCents:D})=>{const C=I,L=_.has(C.id);return`
            <div class="fee-line${C.kind==="reversal"?" is-reversal":""}">
              <div class="row">
                <span class="grow">
                  <span class="roster-name">${p(Ye(C.kind))}${L?" · later reversed":""}</span>
                  <span class="roster-sub">${p(H(`${C.effective_on}T00:00:00Z`))}${C.method?` · ${p(Ee(C.method))}`:""}${C.reference?` · ${p(C.reference)}`:""}</span>
                </span>
                <span class="money${C.amount_cents<0?" is-negative":""}">${p(O(C.amount_cents))}</span>
              </div>
              <div class="row fee-foot">
                <span class="grow hint">Balance after this: ${p(O(D))}</span>
                ${C.kind==="payment"&&!L?`<button class="btn danger-quiet small" data-reverse="${C.id}">Reverse</button>`:""}
              </div>
            </div>`}).join("")}
        </div></div>
        <p class="hint">Nothing here can be edited or deleted. Reversing a payment adds an entry that undoes it, and both stay on the record.</p>`}
    `,"fees"),(ne=document.querySelector('[data-nav="fees"]'))==null||ne.addEventListener("click",()=>{Q=null,h()}),(G=x.querySelector(".back"))==null||G.addEventListener("click",I=>{I.preventDefault(),Q=null,h()});const $=x.querySelector("[name=kind]"),k=x.querySelector("[name=method]").closest("label"),B=document.getElementById("adj-hint"),V=()=>{const I=$.value==="adjustment";k.hidden=I,B.hidden=!I,x.querySelector("[name=rupees]").min=I?"":"1"};$.addEventListener("change",V),(q=document.getElementById("copy-receipt"))==null||q.addEventListener("click",()=>{(async()=>{var C;const I=((C=document.getElementById("receipt-text"))==null?void 0:C.textContent)??"",D=document.getElementById("receipt-note");try{await navigator.clipboard.writeText(I),D&&(D.hidden=!1,D.textContent="Copied. Send it to the student or the parent yourself.")}catch{D&&(D.hidden=!1,D.textContent="Could not copy. Long-press the receipt text instead.")}navigator.share&&navigator.share({text:I}).catch(()=>{})})()}),V(),document.getElementById("fee-form").addEventListener("submit",I=>{I.preventDefault();const D=new FormData(I.target),C=document.getElementById("fee-err"),L=String(D.get("kind")),F=Math.round(Number(D.get("rupees"))*100);if(!Number.isFinite(F)||F===0){C.textContent="Enter an amount.",C.hidden=!1;return}const z=o(Q),re=String(D.get("effective_on"));ut({tenantId:P.id,enrolmentId:Q,kind:L,amountCents:F,effectiveOn:re,method:L==="adjustment"?null:String(D.get("method")),reference:String(D.get("reference")??""),recordedBy:t}).then(()=>(L==="payment"&&(v=`Received ${O(F)} from ${z}, ${H(`${re}T00:00:00Z`)}, ${Ee(String(D.get("method")))}${String(D.get("reference")??"")?`, ref ${String(D.get("reference"))}`:""}. Recorded in Tudent.`),Me())).catch(me=>{C.textContent=Ne(String(me.message??me)),C.hidden=!1})}),x.querySelectorAll("[data-reverse]").forEach(I=>I.addEventListener("click",()=>{const D=c.find(F=>F.id===I.dataset.reverse),C=Mn(D),L=document.getElementById("fee-err");ut({tenantId:P.id,enrolmentId:Q,kind:C.kind,amountCents:C.amountCents,effectiveOn:W(),reversesId:C.reversesId,note:"Reversed",recordedBy:t}).then(()=>Me()).catch(F=>{L.textContent=Ne(String(F.message??F)),L.hidden=!1})}))}function g(){var c;x.querySelectorAll("[data-nav]").forEach(i=>i.addEventListener("click",()=>{location.hash=i.dataset.nav})),x.querySelectorAll("[data-fee-student]").forEach(i=>i.addEventListener("click",()=>{Q=i.dataset.feeStudent,h()})),(c=document.getElementById("copy-daybook"))==null||c.addEventListener("click",()=>{(async()=>{const i=d(),l=document.getElementById("daybook-note");try{await navigator.clipboard.writeText(i),l&&(l.hidden=!1,l.textContent="Copied. Paste it to your accountant or your own records.")}catch{l&&(l.hidden=!1,l.textContent=i)}navigator.share&&navigator.share({text:i}).catch(()=>{})})()})}h()}
