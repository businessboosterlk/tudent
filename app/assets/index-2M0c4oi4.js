(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();const O=60,z=24*O;function _t(e){return e===null?0:e<0?45:e<=6*O?40:e<=24*O?30:e<=2*z?20:e<=7*z?10:0}function vt(e){return e===null||e<0?0:e<=6*O?25:e<=24*O?15:e<=2*z?8:0}function yt(e,t){const n=t-e;return n>0?Math.min(n,10):0}function wt(e){return Math.min(e*8,24)}function bt(e,t){const n=_t(e.dueInMinutes),a=vt(e.nextClassInMinutes),s=e.teacherPriority*10,i=e.reviewReadiness*5,o=e.studentPriority*10,c=yt(e.estimatedMinutes,t),r=wt(e.recentSubjectCompletions),l=n+a+s+i+o-c-r,d=[];return e.dueInMinutes!==null&&(e.dueInMinutes<0?d.push("overdue"):e.dueInMinutes<=6*O?d.push("due_soon"):e.dueInMinutes<=24*O?d.push("due_today"):e.dueInMinutes<=7*z&&d.push("due_this_week")),e.nextClassInMinutes!==null&&e.nextClassInMinutes>=0&&(e.nextClassInMinutes<=6*O?d.push("class_soon"):e.nextClassInMinutes<=24*O?d.push("class_today"):e.nextClassInMinutes<=2*z&&d.push("class_this_week")),e.teacherPriority===1&&d.push("teacher_marked_important"),e.teacherPriority===2&&d.push("teacher_marked_urgent"),e.reviewReadiness===2&&d.push("worth_refreshing"),e.reviewReadiness===3&&d.push("needs_attention"),e.studentPriority===1&&d.push("you_marked_important"),e.studentPriority===2&&d.push("you_marked_urgent"),d.push("fits_your_time"),{id:e.id,score:l,reasons:d}}function kt(e){const t=e.candidates.filter(a=>a.estimatedMinutes<=e.availableMinutes);if(t.length===0)return null;let n=null;for(const a of t){const s=bt(a,e.availableMinutes);(n===null||$t(a,s,n.c,n.s))&&(n={c:a,s})}return n===null?null:n.s}function $t(e,t,n,a){if(t.score!==a.score)return t.score>a.score;const s=e.dueInMinutes??Number.MAX_SAFE_INTEGER,i=n.dueInMinutes??Number.MAX_SAFE_INTEGER;return s!==i?s<i:e.estimatedMinutes!==n.estimatedMinutes?e.estimatedMinutes<n.estimatedMinutes:e.id<n.id}function Ke(e){return new Date(`${e}T12:00:00Z`)}function St(e){return e.toISOString().slice(0,10)}function Ae(e,t){const n=Ke(e);return n.setUTCDate(n.getUTCDate()+t),St(n)}function Et(e){return e.slice(0,5)}function It(e,t){const n=new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).formatToParts(new Date(e)),a=s=>{var i;return((i=n.find(o=>o.type===s))==null?void 0:i.value)??"00"};return{date:`${a("year")}-${a("month")}-${a("day")}`,time:`${a("hour")}:${a("minute")}`}}function Dt(e,t,n,a,s="Asia/Colombo"){const i=Ae(n,a),o=[],c=new Set(t.filter(r=>r.kind!=="extra"&&r.originalDate!==null).map(r=>`${r.batchId}|${r.originalDate}`));for(const r of e)for(let l=n;l<i;l=Ae(l,1))Ke(l).getUTCDay()===r.weekday&&(l<r.effectiveFrom||r.effectiveUntil!==null&&l>r.effectiveUntil||c.has(`${r.batchId}|${l}`)||o.push({batchId:r.batchId,date:l,startTime:Et(r.startTime),durationMinutes:r.durationMinutes,location:r.location,status:"scheduled"}));for(const r of t){if(r.newStart===null)continue;const{date:l,time:d}=It(r.newStart,s);l<n||l>=i||o.push({batchId:r.batchId,date:l,startTime:d,durationMinutes:r.newDurationMinutes??120,location:r.newLocation??"",status:r.kind==="moved"?"moved":"extra",...r.kind==="moved"&&r.originalDate!==null?{movedFromDate:r.originalDate}:{},...r.note?{note:r.note}:{}})}return o.sort((r,l)=>r.date.localeCompare(l.date)||r.startTime.localeCompare(l.startTime)||r.batchId.localeCompare(l.batchId)||r.status.localeCompare(l.status)),o}function Z(e){return new Date(`${e}T12:00:00Z`).toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short",timeZone:"UTC"})}function Te(e){const[t=0,n=0]=e.split(":").map(Number),a=t>=12?"PM":"AM",s=t%12===0?12:t%12;return n===0?`${s} ${a}`:`${s}:${String(n).padStart(2,"0")} ${a}`}function Ct(e,t){const n=[];for(const{occ:a,label:s}of e)n.push({heading:s,detail:`${Z(a.date)} · ${Te(a.startTime)}${a.location?` · ${a.location}`:""}`,marker:"Confirmed by teacher",qualifier:a.status==="moved"?"Moved":a.status==="extra"?"Extra class":"",date:a.date,time:a.startTime});for(const a of t){const s=a.subjectLabel!==""&&a.title.toLowerCase().includes(a.subjectLabel.toLowerCase()),i=a.subjectLabel&&!s?` · ${a.subjectLabel}`:"";n.push({heading:a.title,detail:`${Z(a.date)} · ${Te(a.time)}${i}`,marker:"Added by you",qualifier:a.kind==="deadline"?"Due":a.kind==="exam"?"Exam":"",date:a.date,time:a.time})}return n.sort((a,s)=>a.date.localeCompare(s.date)||a.time.localeCompare(s.time)||a.heading.localeCompare(s.heading)),n}function At(e,t){const n=[],a=new Map;for(const s of e){if(s.qualifier==="Due")continue;const i=a.get(s.date)??[];i.push(s),a.set(s.date,i)}for(const[s,i]of a)for(let o=0;o<i.length;o++)for(let c=o+1;c<i.length;c++){const r=i[o],l=i[c],d=Me(r.time),y=Me(l.time),m=d+(t.get(`${r.heading}|${r.date}|${r.time}`)??60),b=y+(t.get(`${l.heading}|${l.date}|${l.time}`)??60);if(d<b&&y<m){const v=new Date(`${s}T12:00:00Z`).getUTCDay();n.push({date:s,first:r.heading,second:l.heading,key:`${v}|${r.time}|${l.time}|${r.heading}|${l.heading}`})}}return n}function Me(e){const[t=0,n=0]=e.split(":").map(Number);return t*60+n}function ke(e,t=new Date){const n=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Colombo",year:"numeric",month:"2-digit",day:"2-digit"}).format(t),[a,s,i]=n.split("-").map(Number),o=new Date(Date.UTC(a,s-1,i,12,0,0));return o.setUTCDate(o.getUTCDate()+e),o.toISOString().slice(0,10)}function Tt(e,t=new Date){const n=ke(1,t);return e.filter(a=>a.date===n)}function Mt(e,t=new Date){const n=ke(0,t),a=i=>{const[o,c,r]=i.split("-").map(Number);return Math.floor(Date.UTC(o,c-1,r)/864e5)},s=a(n);return e.filter(i=>i.kind==="exam").map(i=>({title:i.title,days:a(i.date)-s})).filter(i=>i.days>=0).sort((i,o)=>i.days-o.days||i.title.localeCompare(o.title)).map(i=>({...i,line:i.days===0?`${i.title} is today`:i.days===1?`${i.title} is tomorrow`:`${i.days} days to ${i.title}`}))}const xe={recall:1,past_paper:2,self_explain:3,confidence_check:4,stuck_check:5};function xt(e,t,n=3){let a;return t===null?a=[...e]:a=e.filter(s=>{var i;return((i=t.get(s.promptId))==null?void 0:i.version)===s.version}),a.sort((s,i)=>xe[s.kind]-xe[i.kind]||s.question.length-i.question.length||s.promptId.localeCompare(i.promptId)),a.slice(0,Math.max(1,n))}const jt=new Set(["retrieval_success","assessment_threshold"]),Nt=new Set(["attended_instruction","completed_assigned_work","teacher_observed"]);function Lt(e){const t=new Set(e.map(n=>n.supersedes).filter(n=>!!n));return e.filter(n=>!t.has(n.id))}const ce=(e,t)=>t.occurred_at.localeCompare(e.occurred_at);function Ot(e,t){const n=Lt(e).filter(l=>l.topic_id===t),a=n.filter(l=>Nt.has(l.assertion_type)).sort(ce),s=n.filter(l=>l.assertion_type==="student_self_assessment").sort(ce),i=n.filter(l=>jt.has(l.assertion_type)).sort(ce),o=a.length===0?null:{tenantIds:[...new Set(a.map(l=>l.tenant_id))],lastAt:a[0].occurred_at},c=s.length===0?null:{feeling:s[0].value.feeling,statedAt:s[0].occurred_at};let r=null;if(i.length>0){const l=i[0],d=Number(l.value.correct??0),y=Number(l.value.total??0);r={status:y>0&&d===y?"shown":"developing",correct:d,total:y,at:l.occurred_at,tenantId:l.tenant_id}}return{topicId:t,taught:o,believes:c,evidence:r}}function Bt(e,t){return t.map(n=>Ot(e,n))}const Pt=24*60*60*1e3;function Rt(e,t){if(!e.evidence)return{daysSinceEvidence:null,suggestion:e.taught?"worth_a_look":"none"};const n=Math.floor((t.getTime()-new Date(e.evidence.at).getTime())/Pt);return e.evidence.status==="developing"?{daysSinceEvidence:n,suggestion:"worth_a_look"}:n>=42?{daysSinceEvidence:n,suggestion:"due_for_a_refresh"}:n>=21?{daysSinceEvidence:n,suggestion:"worth_a_look"}:{daysSinceEvidence:n,suggestion:"none"}}function qt(e){return e.daysSinceEvidence===null?"Not checked yet":e.daysSinceEvidence===0?"Checked today":e.daysSinceEvidence===1?"Checked yesterday":e.daysSinceEvidence<14?`Checked ${e.daysSinceEvidence} days ago`:`Checked ${Math.floor(e.daysSinceEvidence/7)} weeks ago`}function Ut(e){return e==="due_for_a_refresh"?"Due for a refresh":e==="worth_a_look"?"Worth a look":""}function Ht(e){var t,n,a;return((t=e.believes)==null?void 0:t.feeling)==="got"&&((n=e.evidence)==null?void 0:n.status)==="developing"?"felt_sure_check_said_otherwise":e.believes&&e.believes.feeling!=="got"&&((a=e.evidence)==null?void 0:a.status)==="shown"?"felt_lost_check_went_well":e.taught&&!e.evidence?"taught_but_never_checked":!e.taught&&e.evidence?"never_taught_but_checked":"none"}function Yt(e){switch(e){case"felt_sure_check_said_otherwise":return"You felt sure about this, and the last check went differently. Worth another look.";case"felt_lost_check_went_well":return"You were not sure about this, and the last check went well. You may know it better than you think.";case"taught_but_never_checked":return"Covered in class, not checked yet. There is nothing to say about it either way.";case"never_taught_but_checked":return"You have been checked on this without it being covered in class.";default:return""}}function Ft(e,t){switch(e.kind){case"topic_shown":return t(e.subject);case"month_kept_up":return Gt(e.subject);case"came_back":return"Came back"}}function Wt(e){switch(e.kind){case"topic_shown":return"You got every question right when your teacher checked this.";case"month_kept_up":return"You were at every class your teacher recorded this month.";case"came_back":return"You missed a class and came back to the next one."}}function Gt(e){const[t,n]=e.split("-");return`${["January","February","March","April","May","June","July","August","September","October","November","December"][Number(n)-1]??e} ${t}`}function Vt(e){return[...e].sort((t,n)=>n.earned_on.localeCompare(t.earned_on)||t.kind.localeCompare(n.kind))}function Jt(){return"Nothing here yet. Honours come from what your teacher records: a check you got every question right in, or coming back after missing a class."}const de=new Uint8Array(512),Zt=new Uint8Array(256);{let e=1;for(let t=0;t<255;t+=1)de[t]=e,Zt[e]=t,e<<=1,e&256&&(e^=285);for(let t=255;t<512;t+=1)de[t]=de[t-255]}const zt=5*60+30;function je(e,t,n=0){const[a,s,i]=e.split("-").map(Number),[o,c]=t.split(":").map(Number),r=Date.UTC(a,s-1,i,o,c)-zt*6e4+n*6e4;return new Date(r).toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,"")}function X(e){return e.replace(/\\/g,"\\\\").replace(/;/g,";").replace(/,/g,"\\,").replace(/\r?\n/g,"\\n")}function Kt(e){const t=new TextEncoder;if(t.encode(e).length<=75)return e;const n=[];let a="",s=0;for(const i of e){const o=t.encode(i).length,c=n.length===0?75:74;s+o>c&&(n.push(a),a="",s=0),a+=i,s+=o}return a&&n.push(a),n[0]+n.slice(1).map(i=>`\r
 ${i}`).join("")}function Xt(e,t){const n=t.stampedAt.toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,""),a=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Business Booster//Tudent//EN","CALSCALE:GREGORIAN","METHOD:PUBLISH",`X-WR-CALNAME:${X(t.calendarName)}`,"X-WR-TIMEZONE:Asia/Colombo"];for(const s of e)a.push("BEGIN:VEVENT",`UID:${s.key}@tudent.lk`,`DTSTAMP:${n}`,`DTSTART:${je(s.date,s.time)}`,`DTEND:${je(s.date,s.time,Math.max(1,s.minutes))}`,`SUMMARY:${X(s.title)}`,...s.location?[`LOCATION:${X(s.location)}`]:[],"DESCRIPTION:"+X("Added from Tudent. This is a snapshot of the timetable at the moment you downloaded it: if the class moves later, this entry will not move with it. Download again to refresh."),"END:VEVENT");return a.push("END:VCALENDAR"),a.map(Kt).join(`\r
`)+`\r
`}const Qt="batch-offline",en=1;function tn(){return new Promise((e,t)=>{const n=indexedDB.open(Qt,en);n.onupgradeneeded=()=>{const a=n.result;a.objectStoreNames.contains("cache")||a.createObjectStore("cache",{keyPath:"key"}),a.objectStoreNames.contains("outbox")||a.createObjectStore("outbox",{keyPath:"id",autoIncrement:!0}).createIndex("by_status","status")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}function G(e,t,n){return tn().then(a=>new Promise((s,i)=>{const o=a.transaction(e,t),c=n(o.objectStore(e));c.onsuccess=()=>s(c.result),c.onerror=()=>i(c.error),o.oncomplete=()=>a.close()}))}async function $e(e,t){await G("cache","readwrite",n=>n.put({key:e,value:t,savedAt:new Date().toISOString()}))}async function Se(e){return await G("cache","readonly",n=>n.get(e))??null}async function nn(){return(await G("cache","readonly",t=>t.getAll())??[]).map(t=>({key:t.key,savedAt:t.savedAt})).sort((t,n)=>t.key.localeCompare(n.key))}async function Xe(e){await G("outbox","readwrite",t=>t.add({...e,status:"pending",attempts:0,lastError:"",createdAt:new Date().toISOString()}))}async function Ee(){return(await G("outbox","readonly",t=>t.getAll())).sort((t,n)=>(t.id??0)-(n.id??0))}async function le(e){await G("outbox","readwrite",t=>t.put(e))}async function an(e){const t=(await Ee()).filter(s=>s.status==="pending"),n=new Map;for(const s of t){const i=n.get(s.lane)??[];i.push(s),n.set(s.lane,i)}const a={delivered:0,failed:[],heldBack:0};return await Promise.all([...n.entries()].map(async([,s])=>{let i=!1;for(const o of s){if(i){a.heldBack+=1;continue}let c;try{c=await e(o)}catch(r){c={result:"unavailable",detail:String(r)}}o.attempts+=1,c.result==="ok"?(o.status="done",await le(o),a.delivered+=1):c.result==="rejected"?(o.status="failed",o.lastError=c.detail??"rejected",await le(o),a.failed.push({lane:o.lane,kind:o.kind,detail:o.lastError})):(o.lastError=c.detail??"unavailable",await le(o),i=!0,a.heldBack+=1)}})),a}const Qe=[{id:"multi",label:"Tudent colours",swatch:""},{id:"blue",label:"Blue",swatch:"#3d9be9"},{id:"pink",label:"Pink",swatch:"#f2789f"},{id:"green",label:"Green",swatch:"#34c78a"},{id:"orange",label:"Orange",swatch:"#fb9d3c"}],sn=new Set(Qe.map(e=>e.id)),we="tudent-accent";function et(e){return e?`${we}:${e}`:we}function tt(e){try{const t=localStorage.getItem(et(e))??localStorage.getItem(we);return t&&sn.has(t)?t:"multi"}catch{return"multi"}}function nt(e){document.documentElement.dataset.accent=e}function on(e,t){try{localStorage.setItem(et(t),e)}catch{}nt(e)}function at(e){const t=tt(e);return nt(t),t}function rn(e){return`
    <div class="accent-choices" role="group" aria-label="Accent colour">
      ${Qe.map(t=>`
        <button type="button" class="accent-choice" data-accent-pick="${t.id}"
                aria-pressed="${t.id===e}">
          <span class="accent-swatch${t.id==="multi"?" multi":""}"
                ${t.swatch?`style="--sw:${t.swatch}"`:""} aria-hidden="true"></span>
          ${t.label}
        </button>`).join("")}
    </div>`}function cn(e,t,n){e.querySelectorAll("[data-accent-pick]").forEach(a=>a.addEventListener("click",()=>{const s=a.dataset.accentPick;on(s,t),e.querySelectorAll("[data-accent-pick]").forEach(i=>i.setAttribute("aria-pressed",String(i.dataset.accentPick===s)))}))}function dn(e){return`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true">${e}</svg>`}const Q={calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/>',check:'<path d="m5 12 4 4 10-10"/>',book:'<path d="M4 4h6a3 3 0 0 1 3 3v13a3 3 0 0 0-3-3H4zM20 4h-4a3 3 0 0 0-3 3v13a3 3 0 0 1 3-3h4z"/>',award:'<circle cx="12" cy="9" r="5"/><path d="m9 13.5-1 7 4-2 4 2-1-7"/>'};function ln(e,t){const n=e.find(a=>a.match?a.match(t):t===a.id);return`
    <nav class="tabbar" aria-label="Main">
      ${e.map(a=>`
        <button type="button" data-tab="${a.id}"
                ${a===n?'aria-current="page"':""}>
          ${dn(a.icon)}<span>${a.label}</span>
        </button>`).join("")}
    </nav>`}function un(e){e.querySelectorAll("[data-tab]").forEach(t=>t.addEventListener("click",()=>{const n=t.dataset.tab;if((location.hash.slice(1)||"")===n){window.scrollTo({top:0,behavior:"smooth"});return}location.hash=n}))}const st=new Map;let it=location.hash.slice(1)||"";function ot(){st.set(it,window.scrollY)}function hn(e){it=e;const t=st.get(e)??0;requestAnimationFrame(()=>requestAnimationFrame(()=>window.scrollTo(0,t)))}function mn(e){const t=document,n=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(!t.startViewTransition||n){e();return}t.startViewTransition(e)}const pn={"entry.status.starting":"One moment.","entry.status.waitingGoogle":"Opening Google...","entry.status.returning":"Coming back from Google...","entry.status.validating":"Checking your sign-in...","entry.status.completingJoin":"Adding your class...","entry.status.cancelled":"Sign-in was cancelled.","entry.status.cancelledJoin":"Sign-in was cancelled. Your class invitation is still here.","entry.status.failed":"Google sign-in did not finish.","entry.status.disabled":"Sign-in is switched off in this preview.","entry.status.stillWorkingJoin":"Still working. Your class link is safe.","entry.status.stillWorking":"Still working. You can try again if this does not finish.","entry.retry":"Try again","entry.support":"Your first sign-in creates your account, no new password needed.","entry.teacher.heading":"Teach with Tudent","entry.teacher.line":"Run your classes without the admin taking over.","entry.student.heading":"Study with Tudent","entry.student.line":"See your week and know what deserves your attention next.","entry.join.heading":"Join your class","entry.join.line":"Sign in to add this class to your Tudent week.","entry.google":"Continue with Google","entry.closeNotebook":"Close notebook"},ue={},fn=(ue==null?void 0:ue.VITE_PSEUDO)==="1";function gn(e){const t="øéñ".repeat(Math.max(1,Math.ceil(e.length/6)));return`[!${e}·${t}!]`}function k(e,t={}){let n=pn[e];for(const[a,s]of Object.entries(t))n=n.replaceAll(`{${a}}`,String(s));return fn?gn(n):n}let S={google:async()=>"error"};const _n="../teach/",vn="batch-plain-entry",Ne={idle:"",starting:k("entry.status.starting"),waiting_google:k("entry.status.waitingGoogle"),returning:k("entry.status.returning"),validating:k("entry.status.validating"),completing_join:k("entry.status.completingJoin"),cancelled:k("entry.status.cancelled"),network_error:k("entry.status.failed"),provider_error:k("entry.status.failed"),disabled:k("entry.status.disabled")};function be(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}const yn=`
  <button class="btn full" id="google-btn" style="gap:10px;background:#fff;border-color:#dadce0;min-height:48px">
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92a8.78 8.78 0 0 0 2.68-6.62z"/><path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.97 10.72a5.41 5.41 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3-2.33z"/><path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.59A9 9 0 0 0 .96 4.95l3 2.33C4.68 5.16 6.66 3.58 9 3.58z"/></svg>
    <span>${k("entry.google")}</span>
  </button>`,wn={teacher:{h:k("entry.teacher.heading"),p:k("entry.teacher.line")},student:{h:k("entry.student.heading"),p:k("entry.student.line")},join:{h:k("entry.join.heading"),p:k("entry.join.line")}};let Le="idle",bn,Oe,he=!1;function q(e,t){Le=e;const n=document.getElementById("auth-status"),a=document.getElementById("auth-error"),s=document.getElementById("auth-retry"),i=document.getElementById("google-btn");if(!n)return;const o=["starting","waiting_google","returning","validating","completing_join"].includes(e);if(n.textContent=o?Ne[e]:"",a&&s){const c=e==="network_error"||e==="provider_error"||e==="cancelled"||e==="disabled";a.hidden=!c,a.textContent=c?e==="cancelled"&&t?k("entry.status.cancelledJoin"):Ne[e]:"",s.hidden=!(e==="network_error"||e==="provider_error"||e==="cancelled")}i&&(i.disabled=o),clearTimeout(bn),clearTimeout(Oe),e==="waiting_google"&&(Oe=setTimeout(()=>{const c=document.getElementById("auth-status");c&&Le==="waiting_google"&&(c.textContent=k(t?"entry.status.stillWorkingJoin":"entry.status.stillWorking"))},6e3))}async function Be(e){var n,a,s;if(he)return;he=!0;const t=e.kind==="join";try{q("starting",t),t&&(sessionStorage.setItem("batch-join-code",e.code),(n=S.googleStarted)==null||n.call(S,e.code));const i=t?`${location.origin}${location.pathname}#join/${encodeURIComponent(e.code)}`:`${location.origin}${location.pathname}`;q("waiting_google",t);const o=await S.google({...e,redirectTo:i});o==="disabled"&&q("disabled",t),o==="error"&&(q("provider_error",t),(a=S.report)==null||a.call(S,"oauth_start","provider refused"))}catch(i){q("network_error",t),(s=S.report)==null||s.call(S,"oauth_network",String(i))}finally{he=!1}}function kn(){const e=new URLSearchParams(location.search||(location.hash.split("?")[1]??"")),t=e.get("error")??e.get("error_code");return t?(history.replaceState(null,"",location.pathname+location.hash.split("?")[0]),/denied|cancell/i.test(t)?"cancelled":"provider"):null}function $n(e,t,n){const a=wn[e];return`
    <span class="page-wordmark">Tudent</span>
    <h1 class="lede">${be(a.h)}</h1>
    <p class="hint">${be(a.p)}</p>
    ${yn}
    <p class="hint signin-support">${k("entry.support")}</p>
    <p class="notice" id="auth-status" role="status" aria-live="polite"></p>
    <p class="error" id="auth-error" hidden></p>
    <button class="btn quiet" id="auth-retry" hidden>${k("entry.retry")}</button>
    
    ${n?`<button class="btn quiet" id="entry-back">${k("entry.closeNotebook")}</button>`:""}`}function Pe(e,t){const n=t?"#fffdf8":"#22577a";return`
    <svg class="${e}" viewBox="0 0 390 340" aria-hidden="true">
      <circle cx="72" cy="63" r="28" fill="#2477ff"/>
      <path d="M42 228V106a30 30 0 0 1 60 0v122z" fill="#2477ff"/>
      <circle cx="157" cy="63" r="28" fill="#ec4899"/>
      <path d="M127 228V106a30 30 0 0 1 60 0v122z" fill="#ec4899"/>
      <circle cx="242" cy="63" r="28" fill="#22b573"/>
      <path d="M212 228V106a30 30 0 0 1 60 0v122z" fill="#22b573"/>
      <circle cx="327" cy="63" r="28" fill="#ff7a21"/>
      <path d="M297 228V106a30 30 0 0 1 60 0v122z" fill="#ff7a21"/>
      <circle cx="199.5" cy="206" r="31.5" fill="${n}"/>
      <path d="M145 313a54.5 54.5 0 0 1 109 0z" fill="${n}"/>
    </svg>`}const Sn=`
  <div class="spiral" aria-hidden="true">
    <svg class="spiral-svg" viewBox="0 0 48 520" preserveAspectRatio="none" focusable="false">
      <defs>
        <path id="coil-a" d="M43 -9 H12 C6 -9 3 -7 3 -5 C3 -3 6 -2 12 -2 H43"/>
        <path id="coil-b" d="M43 4 H12 C6 4 3 6 3 8 C3 10 6 11 12 11 H43"/>
        <g id="twin-coil">
          <g class="coil-wire"><use href="#coil-a"/><use href="#coil-b"/></g>
          <rect class="coil-hole" x="37" y="-10.5" width="8" height="10" rx="4"/>
          <rect class="coil-hole" x="37" y="2.5" width="8" height="10" rx="4"/>
        </g>
      </defs>
      ${[28,70,112,154,196,238,280,322,364,406,448,490].map(e=>`<use href="#twin-coil" transform="translate(0 ${e})"/>`).join("")}
    </svg>
  </div>`;function me(e,t,n){var v,$;S=n;const a=localStorage.getItem(vn)==="1",s=t.kind!=="cover",i=t.kind==="join"?"join":t.kind==="teacher"?"teacher":"student",o=t.kind==="join";e.innerHTML=`
    <div class="entry-canvas">
      <div class="paper-chrome" aria-hidden="true">
        <p class="paper-index">Tudent · sign in</p>
        <div class="paper-swatches"><i></i><i></i><i></i><i></i></div>
        ${Pe("paper-watermark",!1).replace(/fill="#(2477ff|ec4899|22b573|ff7a21|22577a|fffdf8)"/g,"")}
        <p class="paper-caption">One week · One next step</p>
      </div>
      <main class="entry-shell">
        <section class="scene" id="entry-scene"
                 data-state="${s?"settled":"closed"}"
                 ${a?'data-presentation="plain"':""}
                 aria-label="Tudent sign-in">
          <div class="notebook">
            <div class="page-stack" aria-hidden="true"></div>

            <section class="signin-page">
              <div class="page-content" id="entry-page" ${s?"":"inert"}>
                ${$n(i,o,!s)}
              </div>
            </section>

            ${s?"":`
            <div class="cover" id="entry-cover">
              <nav class="cover-face cover-front" aria-label="Open Tudent">
                <div class="brand-lockup">
                  ${Pe("brand-symbol",!0)}
                  <p class="brand-name">Tudent</p>
                </div>
                <p class="cover-tagline">Made for tuition.</p>
                <div class="choices">
                  <a class="choice" href="${be(_n)}" id="choose-teacher">For teachers</a>
                  <a class="choice primary" href="#student" id="choose-student">For students</a>
                </div>
              </nav>
              <div class="cover-face cover-back" aria-hidden="true"></div>
            </div>`}
          </div>

          <!-- SIBLING of .notebook, never a child. Inside a preserve-3d
               context the cover's translateZ(1px) outranks any z-index, so a
               nested binding is depth-sorted BEHIND the cover and vanishes.
               Kept outside, it is a flat 2D layer above the whole 3D scene
               and stays stationary through the turn, which is the handoff's
               requirement and the reason the wires are never clipped. -->
          ${Sn}
        </section>
      </main>
    </div>`,o&&s&&((v=S.joinOpened)==null||v.call(S,t.code));const c=document.getElementById("entry-scene"),r=document.getElementById("entry-page"),l=document.getElementById("entry-cover");function d(){var L,j,B;(L=document.getElementById("google-btn"))==null||L.addEventListener("click",()=>void Be(t)),(j=document.getElementById("auth-retry"))==null||j.addEventListener("click",()=>void Be(t)),(B=document.getElementById("local-rail"))==null||B.addEventListener("submit",H=>{var Y;H.preventDefault();const P=new FormData(H.target);(Y=S.local)==null||Y.call(S,String(P.get("email")),String(P.get("password"))).then(h=>{h?window.dispatchEvent(new HashChangeEvent("hashchange")):q("provider_error",o)})});const w=kn();w==="cancelled"&&q("cancelled",o),w==="provider"&&q("provider_error",o)}if(s){d();return}d();function y(w,L){if(c.dataset.state===w)return;c.dataset.turning="true";let j=!1;const B=()=>{j||(j=!0,l.removeEventListener("transitionend",H),document.removeEventListener("visibilitychange",P),delete c.dataset.turning,w==="open"&&(c.dataset.state="settled"),L())},H=h=>{h.target===l&&(h.propertyName==="transform"||h.propertyName==="opacity")&&B()};l.addEventListener("transitionend",H);const P=()=>{document.hidden&&B()};document.addEventListener("visibilitychange",P),c.dataset.state=w;const Y=matchMedia("(prefers-reduced-motion: reduce)").matches;setTimeout(B,Y?320:2800)}function m(){c.dataset.state==="closed"&&(history.pushState(null,"","#student"),l.setAttribute("aria-hidden","true"),l.setAttribute("inert",""),y("open",()=>{var w;r.removeAttribute("inert"),(w=document.getElementById("google-btn"))==null||w.focus({preventScroll:!0})}))}function b(){c.dataset.state!=="closed"&&(r.setAttribute("inert",""),l.removeAttribute("inert"),l.setAttribute("aria-hidden","false"),y("closed",()=>{var w;(w=document.getElementById("choose-student"))==null||w.focus({preventScroll:!0})}))}document.getElementById("choose-student").addEventListener("click",w=>{w.preventDefault(),m()}),($=document.getElementById("entry-back"))==null||$.addEventListener("click",w=>{w.preventDefault(),b()})}const C=864e5,se=()=>new Date,ie=e=>e.toISOString(),A=e=>new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Colombo"}).format(e),_=(e,t)=>`${A(new Date(Date.now()+e*C))}T${t}:00+05:30`,Re=new Date().getDay(),g="11111111-1111-4111-8111-111111111111",u=e=>`00000000-0000-4000-8000-${String(e).padStart(12,"0")}`,E=u(101),qe=u(102),ee=u(103),R=new Map([["Amaya (Demo Student)",u(201)],["Bimsara (Demo Student)",u(202)],["Chatura (Demo Student)",u(203)],["Dilki (Demo Student)",u(204)]]),D=u(201),V=u(301),Ue=u(302),pe=u(401),J=u(402),En=u(403),In=u(501),He=u(601),Ye=u(603),fe=u(604),ge=u(602),T={tenants:[{id:g,name:"Nimal Perera (Demo Teacher)"}],batches:[{id:E,tenant_id:g,label:"2027 A/L Chemistry (Demo)",location:"Panadura",archived_at:null,created_at:_(-30,"10:00")},{id:qe,tenant_id:g,label:"2027 A/L Physics (Demo)",location:"Moratuwa",archived_at:null,created_at:_(-20,"10:00")},{id:ee,tenant_id:g,label:"Revision Class (Demo)",location:"Panadura",archived_at:null,created_at:_(-5,"10:00")}],batch_schedules:[{id:u(111),tenant_id:g,batch_id:E,weekday:Re,start_time:"16:00",duration_minutes:120,location:"Panadura",effective_from:A(new Date(Date.now()-60*C)),effective_until:null,active:!0},{id:u(112),tenant_id:g,batch_id:qe,weekday:(Re+1)%7,start_time:"09:00",duration_minutes:90,location:"Moratuwa",effective_from:A(new Date(Date.now()-60*C)),effective_until:null,active:!0}],schedule_exceptions:[],enrolments:[...R.entries()].flatMap(([e,t],n)=>[{id:t,tenant_id:g,batch_id:E,student_id:u(900+n),display_name:e,guardian_phone:"07x xxx xxxx (demo)",teacher_reference:"",status:"active",started_at:_(n===3?-2:-28+n,"10:00"),ended_at:null,version:1}]).concat([{id:u(205),tenant_id:g,batch_id:E,student_id:u(905),display_name:"Eshan (Demo Student)",guardian_phone:"",teacher_reference:"",status:"active",started_at:_(-40,"10:00"),ended_at:null,version:1}]),student_private_items:[{id:u(701),kind:"deadline",title:"History essay (your own)",subject_label:"History",starts_at:null,due_at:_(0,"21:00"),estimated_minutes:40,deleted_at:null},{id:u(702),kind:"external_class",title:"Kandy maths class (your own)",subject_label:"Maths",starts_at:_(2,"08:00"),due_at:null,estimated_minutes:90,deleted_at:null},{id:u(703),kind:"exam",title:"A/L Chemistry paper",subject_label:"Chemistry",starts_at:null,due_at:_(19,"08:30"),estimated_minutes:null,deleted_at:null}],next_actions:[{id:In,tenant_id:g,batch_id:E,title:"Finish the electrolysis worksheet",estimated_minutes:8,due_at:_(0,"20:00"),result_visibility:"teacher_sees_completion",topic_id:J}],student_profiles:[{student_id:u(900),preferences:{minutes:8}}],canonical_topics:[{id:pe,name:"Organic chemistry",sort_order:1},{id:J,name:"Electrolysis",sort_order:2},{id:En,name:"Kinematics",sort_order:3}],topic_assertions:[{id:u(801),tenant_id:g,enrolment_id:D,topic_id:J,assertion_type:"teacher_observed",value:{},occurred_at:_(-3,"18:00"),supersedes:null},{id:u(804),tenant_id:g,enrolment_id:D,topic_id:J,assertion_type:"retrieval_success",value:{correct:4,total:5},occurred_at:_(-1,"20:00"),supersedes:null},{id:u(802),tenant_id:g,enrolment_id:D,topic_id:pe,assertion_type:"student_self_assessment",value:{feeling:"shaky"},occurred_at:_(-2,"19:00"),supersedes:null},{id:u(803),tenant_id:g,enrolment_id:D,topic_id:pe,assertion_type:"attended_instruction",value:{},occurred_at:_(-9,"18:00"),supersedes:null}],honours:[{kind:"topic_shown",subject:J,earned_on:A(new Date(Date.now()-7*C)),tenant_id:g},{kind:"month_kept_up",subject:A(new Date(Date.now()-31*C)).slice(0,7),earned_on:A(new Date(Date.now()-21*C)),tenant_id:g},{kind:"came_back",subject:"",earned_on:A(new Date(Date.now()-14*C)),tenant_id:g}],class_sessions:[{id:V,tenant_id:g,batch_id:E,held_on:A(new Date(Date.now()-7*C)),coverage_note:"Electrolysis: Faraday laws worked examples",completed_by:u(999)},{id:Ue,tenant_id:g,batch_id:E,held_on:A(new Date(Date.now()-14*C)),coverage_note:"Organic chemistry: naming",completed_by:u(999)}],attendance_marks:[{id:u(311),tenant_id:g,batch_id:E,class_session_id:V,enrolment_id:D,state:"present",note:"",marked_by:u(999),marked_at:_(-7,"16:05"),created_at:_(-7,"16:05")},{id:u(312),tenant_id:g,batch_id:E,class_session_id:V,enrolment_id:R.get("Bimsara (Demo Student)"),state:"absent",note:"",marked_by:u(999),marked_at:_(-7,"16:05"),created_at:_(-7,"16:05")},{id:u(313),tenant_id:g,batch_id:E,class_session_id:V,enrolment_id:R.get("Bimsara (Demo Student)"),state:"present",note:"came in late, corrected",marked_by:u(999),marked_at:_(-7,"16:20"),created_at:_(-7,"16:20")},{id:u(314),tenant_id:g,batch_id:E,class_session_id:Ue,enrolment_id:R.get("Chatura (Demo Student)"),state:"absent",note:"",marked_by:u(999),marked_at:_(-14,"16:05"),created_at:_(-14,"16:05")},{id:u(315),tenant_id:g,batch_id:E,class_session_id:V,enrolment_id:R.get("Chatura (Demo Student)"),state:"absent",note:"",marked_by:u(999),marked_at:_(-7,"16:06"),created_at:_(-7,"16:06")}],fee_events:[{id:u(321),tenant_id:g,batch_id:E,enrolment_id:D,kind:"payment",amount_cents:25e4,method:"cash",reference:"demo-0001",effective_on:A(new Date(Date.now()-6*C)),note:"",reverses_id:null,recorded_at:_(-6,"17:00")},{id:u(322),tenant_id:g,batch_id:E,enrolment_id:R.get("Chatura (Demo Student)"),kind:"payment",amount_cents:25e4,method:"transfer",reference:"demo-0002",effective_on:A(new Date(Date.now()-6*C)),note:"",reverses_id:null,recorded_at:_(-6,"17:05")},{id:u(323),tenant_id:g,batch_id:E,enrolment_id:R.get("Chatura (Demo Student)"),kind:"reversal",amount_cents:-25e4,method:"transfer",reference:"demo-0002",effective_on:A(new Date(Date.now()-5*C)),note:"recorded against the wrong student (demo)",reverses_id:u(322),recorded_at:_(-5,"09:00")},{id:u(324),tenant_id:g,batch_id:E,enrolment_id:R.get("Chatura (Demo Student)"),kind:"payment",amount_cents:25e4,method:"cash",reference:"demo-0003",effective_on:A(new Date(Date.now()-4*C)),note:"recorded again, correctly",reverses_id:null,recorded_at:_(-4,"17:00")}],prompts:[{id:He,tenant_id:g,kind:"recall",active:!0},{id:Ye,tenant_id:g,kind:"recall",active:!0}],prompt_versions:[{id:ge,prompt_id:He,version:1,question:"In electrolysis of molten NaCl, what forms at the cathode?",answer_key:"Sodium metal. Na+ ions gain electrons (reduction) at the cathode."},{id:fe,prompt_id:Ye,version:1,question:"Why does molten NaCl conduct electricity when solid NaCl does not?",answer_key:"Melting frees the ions to move; in the solid they are locked in the lattice."}],prompt_completions:[{id:u(810),tenant_id:g,enrolment_id:D,prompt_version_id:ge,answer:{text:"Sodium metal"},correct:!0,result_visibility:"private_to_student",occurred_at:_(-9,"19:20")},{id:u(811),tenant_id:g,enrolment_id:D,prompt_version_id:fe,answer:{text:"Because heating gives the electrons energy to move around"},correct:!1,result_visibility:"private_to_student",occurred_at:_(-6,"20:05")},{id:u(812),tenant_id:g,enrolment_id:D,prompt_version_id:fe,answer:{text:"The ions can move once it melts. In the solid they are held in place."},correct:!0,result_visibility:"visible_to_enrolment_teacher",occurred_at:_(-2,"18:40")},{id:u(813),tenant_id:g,enrolment_id:D,prompt_version_id:ge,answer:{text:"Na, and chlorine gas comes off the other side"},correct:null,result_visibility:"private_to_student",occurred_at:_(-1,"21:10")}]};function Dn(){const e=new Map;for(const t of[...T.attendance_marks].sort((n,a)=>n.marked_at===a.marked_at?String(n.id).localeCompare(String(a.id)):n.marked_at<a.marked_at?-1:1))e.set(`${t.class_session_id}|${t.enrolment_id}`,t);return[...e.values()]}const W=()=>sessionStorage.getItem("tudent-demo-offline")==="1",te=()=>sessionStorage.getItem("tudent-demo-empty")==="1",Cn=new Set(["batches","batch_schedules","next_actions","student_private_items","topic_assertions","honours","attendance_marks","enrolments"]),Fe={enrolments:e=>e.student_id===u(900),attendance_marks:e=>e.enrolment_id===D,topic_assertions:e=>e.enrolment_id===D,fee_events:e=>e.enrolment_id===D,prompt_completions:e=>e.enrolment_id===D||!e.enrolment_id};function We(e){if(e==="attendance_current")return Dn().filter(a=>Fe.attendance_marks(a));const t=T[e];if(!t)throw new Error(`demo client: no fixture table "${e}". Add it; do not let the demo invent an answer.`);if(te()&&Cn.has(e))return[];const n=Fe[e];return n?t.filter(n):t}const An={class_sessions:"class_session_id",enrolments:"enrolment_id",batches:"batch_id"};function Tn(e,t){var a;const n={...e};for(const s of t.matchAll(/([a-z_]+)\(([a-z_,]+)\)/g)){const[,i,o]=s,c=An[i],r=(a=T[i])==null?void 0:a.find(l=>l.id===e[c]);n[i]=r?Object.fromEntries(o.split(",").map(l=>[l,r[l]])):null}return n}class Mn{constructor(t){this.table=t,this.filters=[],this.orderBy=null,this.limitN=null,this.selectCols="*",this.mode="select",this.payload=null,this.wantSingle=!1,this.wantMaybe=!1}select(t="*"){return this.selectCols=t,this}eq(t,n){return this.filters.push(a=>String(a[t])===String(n)),this}neq(t,n){return this.filters.push(a=>String(a[t])!==String(n)),this}is(t,n){return this.filters.push(a=>a[t]===n),this}in(t,n){const a=new Set(n.map(String));return this.filters.push(s=>a.has(String(s[t]))),this}gte(t,n){return this.filters.push(a=>a[t]>=n),this}lte(t,n){return this.filters.push(a=>a[t]<=n),this}gt(t,n){return this.filters.push(a=>a[t]>n),this}lt(t,n){return this.filters.push(a=>a[t]<n),this}order(t,n){return this.orderBy={col:t,asc:(n==null?void 0:n.ascending)!==!1},this}limit(t){return this.limitN=t,this}single(){return this.wantSingle=!0,this}maybeSingle(){return this.wantSingle=!0,this.wantMaybe=!0,this}insert(t){return this.mode="insert",this.payload=t,this}update(t){return this.mode="update",this.payload=t,this}run(){var t;if(W())return{data:null,error:{message:"Failed to fetch (demo offline)"},status:0};try{if(this.mode==="insert"){const i=(Array.isArray(this.payload)?this.payload:[this.payload]).map(c=>({id:crypto.randomUUID(),created_at:ie(se()),...c}));return(T[t=this.table]??(T[t]=[])).push(...i),{data:this.wantSingle?i[0]:i,error:null,status:201}}if(this.mode==="update"){const s=We(this.table).filter(i=>this.filters.every(o=>o(i)));for(const i of s)Object.assign(i,this.payload);return{data:s,error:null,status:200}}let n=We(this.table).filter(s=>this.filters.every(i=>i(s)));if(this.orderBy){const{col:s,asc:i}=this.orderBy;n=[...n].sort((o,c)=>(o[s]<c[s]?-1:o[s]>c[s]?1:0)*(i?1:-1))}this.limitN!==null&&(n=n.slice(0,this.limitN));const a=n.map(s=>Tn(s,this.selectCols));return this.wantSingle?a.length===1?{data:a[0],error:null,status:200}:a.length===0&&this.wantMaybe?{data:null,error:null,status:200}:{data:null,error:{message:`single() saw ${a.length} rows`},status:406}:{data:a,error:null,status:200}}catch(n){return{data:null,error:{message:String(n.message)},status:500}}}then(t,n){return Promise.resolve(this.run()).then(t,n)}}const ne="tudent-demo-signed-in";function xn(){return{id:u(900),email:"amaya.demo@example.com",user_metadata:{full_name:"Amaya (Demo Student)"}}}function _e(){return sessionStorage.getItem(ne)==="1"?{access_token:"demo-token",user:xn()}:null}const jn={async getSession(){return{data:{session:_e()},error:null}},async getUser(){var e;return{data:{user:((e=_e())==null?void 0:e.user)??null},error:null}},onAuthStateChange(e){return{data:{subscription:{unsubscribe(){}}}}},async signInWithOAuth(e){var n;sessionStorage.setItem(ne,"1");const t=((n=e==null?void 0:e.options)==null?void 0:n.redirectTo)??`${location.origin}${location.pathname}#week`;return location.href=t,location.reload(),{data:{},error:null}},async signInWithPassword(){return sessionStorage.setItem(ne,"1"),{data:{session:_e()},error:null}},async signOut(){return sessionStorage.removeItem(ne),{error:null}}};function Nn(e,t){const n=(a=null)=>Promise.resolve({data:a,error:null,status:200});if(W())return Promise.resolve({data:null,error:{message:"Failed to fetch (demo offline)"},status:0});switch(e){case"record_event":case"report_client_error":return n();case"ensure_student_account":return n();case"record_attendance_mark":{const a=t;if(T.attendance_marks.some(i=>i.id===a.p_mark_id))return n(a.p_mark_id);let s=T.class_sessions.find(i=>i.batch_id===a.p_batch&&i.held_on===a.p_held_on);return s||(s={id:crypto.randomUUID(),tenant_id:g,batch_id:a.p_batch,held_on:a.p_held_on,coverage_note:"",completed_by:u(999)},T.class_sessions.push(s)),T.attendance_marks.push({id:a.p_mark_id,tenant_id:g,batch_id:a.p_batch,class_session_id:s.id,enrolment_id:a.p_enrolment,state:a.p_state,note:a.p_note??"",marked_by:u(999),marked_at:a.p_marked_at??ie(se()),created_at:ie(se())}),n(a.p_mark_id)}default:throw new Error(`demo client: no rpc fixture for "${e}"`)}}const Ln=window.fetch.bind(window);window.fetch=(e,t)=>{var i;const a=(i=(typeof e=="string"?e:e instanceof URL?e.href:e.url).match(/functions\/v1\/([a-z-]+)/))==null?void 0:i[1];if(!a)return Ln(e,t);if(W())return Promise.reject(new TypeError("Failed to fetch (demo offline)"));const s=(o,c={})=>Promise.resolve(new Response(JSON.stringify(c),{status:o,headers:{"Content-Type":"application/json"}}));if(a==="join-opened")return Promise.resolve(new Response(null,{status:204}));if(a==="bill")return s(200,{outcome:"ok"});if(a==="join"){const o=JSON.parse(String((t==null?void 0:t.body)??"{}")),c=T.batches.find(r=>r.id===ee);if(o.action==="preview"&&!["DEMO2GETHER","DEMOROTATED"].includes(String(o.code??"").toUpperCase()))return s(404,{error:"invalid_code"});if(o.action==="preview")return s(200,{batch_label:c.label,teacher_name:"Nimal Perera (Demo Teacher)",location:c.location});if(o.action==="redeem")return T.enrolments.some(r=>r.batch_id===ee&&r.id===u(299))||T.enrolments.push({id:u(299),tenant_id:g,batch_id:ee,student_id:u(900),display_name:"Amaya (Demo Student)",guardian_phone:"",teacher_reference:"",status:"active",started_at:ie(se()),ended_at:null,version:1}),s(200,{batch_label:c.label});if(o.action==="create"||o.action==="rotate"){const r=sessionStorage.getItem("demo-rotated")==="1";o.action==="rotate"&&sessionStorage.setItem("demo-rotated",r?"0":"1");const l=(o.action==="rotate"?!r:r)?"DEMOROTATED":"DEMO2GETHER";return s(200,{code:l,batch_label:c.label})}return s(200,{})}return s(404,{})};function Ge(){const e=document.createElement("div");e.setAttribute("data-demo-ribbon",""),e.style.cssText="position:fixed;bottom:calc(84px + env(safe-area-inset-bottom,0px));left:0;right:0;z-index:9999;display:flex;gap:10px;align-items:center;justify-content:center;background:#1a4059;color:#fff;font:12px/1.2 -apple-system,system-ui,sans-serif;padding:8px 12px calc(8px + env(safe-area-inset-bottom, 0px));";const t=(o,c)=>{const r=document.createElement("button");return r.textContent=o,r.style.cssText=`font:inherit;border:1px solid rgba(255,255,255,.4);background:${c?"#fff":"transparent"};color:${c?"#1a4059":"#fff"};border-radius:999px;padding:3px 10px;cursor:pointer;`,r},n=document.createElement("span");n.textContent="Demo. Seeded pretend data, nothing here is real.";const a=t(W()?"Back online":"Try offline",W());a.addEventListener("click",()=>{sessionStorage.setItem("tudent-demo-offline",W()?"0":"1"),location.reload()}),e.append(n,a);{const o=t(te()?"Full week":"Empty first day",te());o.addEventListener("click",()=>{sessionStorage.setItem("tudent-demo-empty",te()?"0":"1"),location.reload()}),e.append(o)}e.style.flexWrap="wrap",document.body.append(e);const s=()=>{const o=document.querySelector(".tabbar"),c=o?o.offsetHeight+16:0;document.body.style.paddingBottom=`${e.offsetHeight+c+16}px`};s(),new ResizeObserver(s).observe(e);const i=document.getElementById("app");i&&new MutationObserver(s).observe(i,{childList:!0})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ge):Ge();function On(e,t){return{auth:jn,rpc:Nn,from:n=>new Mn(n),functions:{invoke:async n=>({data:null,error:{message:"demo: use fetch path"}})}}}const rt="",ct="",f=On(),Ie=crypto.randomUUID();async function U(e,t){try{await f.rpc("report_client_error",{p_correlation_id:Ie,p_app:"student",p_code:e.slice(0,64),p_message:t.slice(0,500)})}catch{}}window.addEventListener("error",e=>void U("window_error",String(e.message??"")));window.addEventListener("unhandledrejection",e=>void U("unhandled_rejection",String(e.reason??"")));async function Ve(e){var i;const{data:t}=await f.auth.getSession(),n=await fetch(`${rt}/functions/v1/join`,{method:"POST",headers:{"Content-Type":"application/json",apikey:ct,Authorization:`Bearer ${((i=t.session)==null?void 0:i.access_token)??""}`,"x-correlation-id":Ie},body:JSON.stringify(e)}),a=await n.text();let s={};try{s=JSON.parse(a)}catch{}return{status:n.status,json:s,text:a}}function Bn(e){const t=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Colombo",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).formatToParts(new Date(e)),n=a=>{var s;return((s=t.find(i=>i.type===a))==null?void 0:s.value)??"00"};return{date:`${n("year")}-${n("month")}-${n("day")}`,time:`${n("hour")}:${n("minute")}`}}function N(e){var t;if(e.error!==null||e.data===null)throw new Error(((t=e.error)==null?void 0:t.message)??"no data");return e.data}async function Pn(e,t){var P,Y;const[n,a,s,i,o,c]=await Promise.all([f.from("batches").select("id,tenant_id,label,location"),f.from("batch_schedules").select("*"),f.from("schedule_exceptions").select("*"),f.from("student_private_items").select("*").is("deleted_at",null),f.from("next_actions").select("id,batch_id,title,estimated_minutes,due_at,result_visibility,topic_id"),f.from("student_profiles").select("preferences")]),r={data:N(n)},l={data:N(a)},d={data:N(s)},y={data:N(i)},m={data:N(o)},b={data:N(c)},v=new Map((r.data??[]).map(h=>[h.id,h.label])),w=Dt((l.data??[]).map(h=>({id:String(h.id),batchId:String(h.batch_id),weekday:Number(h.weekday),startTime:String(h.start_time),durationMinutes:Number(h.duration_minutes),location:String(h.location),effectiveFrom:String(h.effective_from),effectiveUntil:h.effective_until===null?null:String(h.effective_until)})),(d.data??[]).map(h=>({id:String(h.id),batchId:String(h.batch_id),kind:h.kind,originalDate:h.original_date===null?null:String(h.original_date),newStart:h.new_start===null?null:String(h.new_start),newDurationMinutes:h.new_duration_minutes===null?null:Number(h.new_duration_minutes),newLocation:h.new_location===null?null:String(h.new_location),note:String(h.note??"")})),e,t).map(h=>({occ:h,label:v.get(h.batchId)??"Your class"})),L=new Map;for(const h of w)L.set(`${h.label}|${h.occ.date}|${h.occ.startTime}`,h.occ.durationMinutes);const j=y.data??[],B=j.flatMap(h=>{const De=h.kind==="deadline"||h.kind==="exam"?h.due_at:h.starts_at;if(!De)return[];const{date:Ce,time:gt}=Bn(De);return Ce<e?[]:[{title:h.title,kind:h.kind,date:Ce,time:gt,subjectLabel:h.subject_label}]}),H=((Y=(P=b.data)==null?void 0:P[0])==null?void 0:Y.preferences)??{};return{confirmed:w,privateItems:B,privateRows:j,actions:m.data??[],durations:L,batchLabels:v,silenced:H.silencedCollisions??[]}}function Rn(e){return{...e,durations:[...e.durations],batchLabels:[...e.batchLabels]}}function qn(e){return{...e,durations:new Map(e.durations),batchLabels:new Map(e.batchLabels)}}async function Un(e,t){const{data:n}=await f.from("schedule_changes").select("entity,change,snapshot,changed_at").gt("changed_at",e).order("changed_at"),a=[];for(const s of n??[]){const i=t.get(String(s.snapshot.batch_id))??"Your class";if(s.entity==="exception"&&s.change==="created"){const o=String(s.snapshot.kind);o==="cancelled"?a.push(`${i}: the class on ${String(s.snapshot.original_date)} is cancelled`):o==="moved"?a.push(`${i}: a class has moved, check this week`):a.push(`${i}: an extra class was added`)}else s.entity==="schedule"&&a.push(`${i}: the weekly time or place ${s.change==="created"?"was set":"changed"}`)}return[...new Set(a)]}async function dt(e,t){const n=await Ee(),a=n.filter(o=>o.status==="pending").length,s=n.filter(o=>o.status==="failed").map(o=>({kind:o.kind,detail:o.lastError,title:String(o.payload.title??"")})),i=await Se("week");try{const o=await Pn(e,t),c=i?await Un(i.savedAt,o.batchLabels):[];return await $e("week",Rn(o)),{data:o,fromCache:!1,savedAt:null,changes:c,pendingCount:a,failedItems:s}}catch(o){if(i)return{data:qn(i.value),fromCache:!0,savedAt:i.savedAt,changes:[],pendingCount:a,failedItems:s};throw o}}async function Hn(e){const t={...e,id:crypto.randomUUID()},{error:n,status:a}=await f.from("student_private_items").insert(t);if(!n)return"saved";if(typeof a=="number"&&a>=400||/^[0-9A-Z]{5}$/.test(n.code??""))throw new Error(`${n.code??a}: ${n.message}`);return await Xe({lane:"private",kind:"private_item_insert",payload:t,idempotencyKey:String(t.id)}),"queued"}function lt(e){(async()=>{var n;const{data:t}=await f.auth.getSession();await fetch(`${rt}/functions/v1/bill`,{method:"POST",headers:{"Content-Type":"application/json",apikey:ct,Authorization:`Bearer ${((n=t.session)==null?void 0:n.access_token)??""}`},body:JSON.stringify({event_id:e.id,tenant_id:e.tenant_id,enrolment_id:e.enrolment_id,event_type:"question_answered",occurred_at:new Date().toISOString()})})})().catch(()=>{})}async function Yn(e){const t={...e,id:crypto.randomUUID()},{error:n,status:a}=await f.from("prompt_completions").insert(t);if(!n)return lt(t),"saved";if(typeof a=="number"&&a>=400||/^[0-9A-Z]{5}$/.test(n.code??""))throw new Error(`${n.code??a}: ${n.message}`);return await Xe({lane:e.enrolment_id,kind:"prompt_completion_insert",payload:t,idempotencyKey:String(t.id)}),"queued"}const Fn={private_item_insert:"student_private_items",prompt_completion_insert:"prompt_completions"},Wn=async e=>{const t=Fn[e.kind];if(!t)return{result:"rejected",detail:"unknown kind"};try{const{error:n,status:a}=await f.from(t).insert(e.payload);return n?n.code==="23505"?{result:"ok"}:typeof a=="number"&&a>=500?{result:"unavailable",detail:String(a)}:typeof a=="number"&&a>=400||/^[0-9A-Z]{5}$/.test(n.code??"")?{result:"rejected",detail:`${n.code??a}: ${n.message}`}:{result:"unavailable",detail:n.message}:(e.kind==="prompt_completion_insert"&&lt(e.payload),{result:"ok"})}catch(n){return{result:"unavailable",detail:String(n)}}};async function ut(){const e=await an(Wn);Gn(e)}function Gn(e){e.delivered>0&&M("offline_sync_succeeded",{items:e.delivered});for(const t of e.failed)M("offline_sync_failed",{reason:"rejected"});e.heldBack>0&&e.delivered===0&&e.failed.length===0&&M("offline_sync_failed",{reason:"unavailable"})}async function Vn(e,t){const n=`pack:${e}:${t}`;try{const[a,s]=await Promise.all([f.from("prompts").select("id,kind").eq("tenant_id",e).eq("topic_id",t).eq("status","active"),f.from("prompt_versions").select("id,prompt_id,version,question,answer_key").eq("tenant_id",e)]),i=N(a),o=N(s),c=new Map;for(const l of o){const d=c.get(l.prompt_id);(!d||l.version>d.version)&&c.set(l.prompt_id,l)}const r=i.flatMap(l=>{const d=c.get(l.id);return d?[{promptId:l.id,versionId:d.id,version:d.version,kind:l.kind,question:d.question,answerKey:d.answer_key}]:[]});return await $e(n,r),{pack:r,fromCache:!1}}catch{const a=await Se(n);return{pack:(a==null?void 0:a.value)??[],fromCache:!0}}}async function Jn(e,t){try{const n=await f.from("prompts").select("id").eq("tenant_id",e).eq("topic_id",t).eq("status","active"),a=await f.from("prompt_versions").select("id,prompt_id,version").eq("tenant_id",e),s=new Set(N(n).map(o=>o.id)),i=new Map;for(const o of N(a)){if(!s.has(o.prompt_id))continue;const c=i.get(o.prompt_id);(!c||o.version>c.version)&&i.set(o.prompt_id,{versionId:o.id,version:o.version})}return i}catch{return null}}function M(e,t={}){f.rpc("record_event",{p_correlation_id:Ie,p_event_type:e,p_props:t}).then(({error:n})=>{n&&U("telemetry",`${e}: ${n.message}`)})}async function Zn(e,t){var i;const n=[...new Set([...t,e])],{data:a}=await f.from("student_profiles").select("student_id"),s=(i=a==null?void 0:a[0])==null?void 0:i.student_id;s&&await f.from("student_profiles").update({preferences:{silencedCollisions:n}}).eq("student_id",s)}const ve={async google(e){const t=e.redirectTo??`${location.origin}${location.pathname}`,n=e.kind==="join",{error:a}=await f.auth.signInWithOAuth({provider:"google",options:{redirectTo:t,...n?{queryParams:{prompt:"select_account"}}:{}}});return a?"error":"redirecting"},joinOpened(e){},googleStarted(e){},async local(e,t){const{error:n}=await f.auth.signInWithPassword({email:e,password:t});return!n},report(e,t){U(e,t)}};window.addEventListener("online",()=>{ut().then(()=>{(location.hash.slice(1)||"week")==="week"&&K()})});"serviceWorker"in navigator&&navigator.serviceWorker.register("./sw.js");const I=document.getElementById("app");at(localStorage.getItem("tudent-student-scope")??void 0);function p(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function re(){return new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Colombo"}).format(new Date)}function K(){const e=location.hash.slice(1),t=e||"week";(async()=>{const{data:n}=await f.auth.getSession(),a=e.match(/^join\/(.+)$/);if(!n.session)return a?me(I,{kind:"join",code:decodeURIComponent(a[1])},ve):e===""?me(I,{kind:"cover"},ve):me(I,{kind:"student"},ve);try{const{data:o}=await f.rpc("ensure_student_account");o&&(await $e("student_id",String(o)),localStorage.setItem("tudent-student-scope",String(o)),at(String(o))),await ut()}catch{}const s=(a==null?void 0:a[1])??sessionStorage.getItem("batch-join-code");if(s)return sessionStorage.removeItem("batch-join-code"),history.replaceState(null,"",location.pathname+"#join"),M("entry_surface_chosen",{surface:"join"}),ze(decodeURIComponent(s));if(t==="week")return ae();if(t==="join")return ze();if(t==="add")return ra();if(t==="attendance")return ca();if(t==="topics")return pt();if(t==="history")return ua();if(t==="saved")return la();if(t==="honours")return ha();const i=t.match(/^session\/([0-9a-f-]+)$/);if(i)return oa(i[1]);location.hash="week"})().catch(n=>{U("route_error",String(n)),I.innerHTML=`<div class="page"><p class="error">Something went wrong.</p>
      <button class="btn" onclick="location.reload()">Reload</button></div>`})}window.addEventListener("hashchange",()=>{mn(K)});window.addEventListener("beforeunload",ot);document.addEventListener("click",e=>{var t;(t=e.target)!=null&&t.closest("[data-nav],[data-tab]")&&ot()},!0);window.addEventListener("appinstalled",()=>{M("installed"),F=null,localStorage.setItem("tudent-installed","1")});let F=null;window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),F=e});function zn(){const e=localStorage.getItem("tudent-install-not-now")==="1",t=localStorage.getItem("tudent-installed")==="1"||matchMedia("(display-mode: standalone)").matches;return!F||e||t?"":`
    <div class="card install-card" id="install-card">
      <p class="strong">Keep Tudent on your Home screen</p>
      <p class="hint">Open your week faster and use it when your connection is weak.</p>
      <div class="btn-row">
        <button class="btn primary" id="install-yes">Add to Home screen</button>
        <button class="btn quiet" id="install-no">Not now</button>
      </div>
    </div>`}function Kn(e){var t,n;(t=document.getElementById("install-yes"))==null||t.addEventListener("click",()=>{F==null||F.prompt().catch(()=>{}),F=null,e()}),(n=document.getElementById("install-no"))==null||n.addEventListener("click",()=>{localStorage.setItem("tudent-install-not-now","1"),e()})}const Xn=[{id:"week",label:"Week",icon:Q.calendar,match:e=>e===""||e==="week"||e.startsWith("session/")},{id:"topics",label:"Know",icon:Q.book},{id:"attendance",label:"Days",icon:Q.check},{id:"honours",label:"You",icon:Q.award}];function x(e,t,n){I.innerHTML=`
    <header class="topbar">
      ${n!==void 0?`<button class="back" data-nav="${n}">Back</button>`:""}
      <h1>${p(e)}</h1>
    </header>
    <main class="page">${t}</main>
    ${ln(Xn,location.hash.slice(1)||"week")}`,document.body.classList.add("has-tabbar"),I.querySelectorAll("[data-nav]").forEach(a=>a.addEventListener("click",()=>{location.hash=a.dataset.nav})),un(I),hn(location.hash.slice(1)||"week")}function Qn(e,t){const n=e.map(o=>({date:o.date,time:o.time,minutes:t.get(`${o.heading}|${o.date}|${o.time}`)??(o.qualifier==="Due"?30:60),title:o.heading,location:o.marker==="Confirmed by teacher"&&o.detail.split(" · ").slice(2).join(" · ")||"",key:`${o.date}-${o.time}-${o.heading}`.replace(/[^A-Za-z0-9-]/g,"").slice(0,60)})),a=Xt(n,{calendarName:"My Tudent week",stampedAt:new Date}),s=URL.createObjectURL(new Blob([a],{type:"text/calendar;charset=utf-8"})),i=document.createElement("a");i.href=s,i.download="tudent-week.ics",i.click(),setTimeout(()=>URL.revokeObjectURL(s),0)}const ea={overdue:"it is overdue",due_soon:"it is due very soon",due_today:"it is due today",due_this_week:"it is due this week",class_soon:"the class is in a few hours",class_today:"the class is today",class_this_week:"the class is coming up",teacher_marked_important:"your teacher marked it important",teacher_marked_urgent:"your teacher marked it urgent",worth_refreshing:"it is worth a refresh",needs_attention:"it needs another look",you_marked_important:"you marked it important",you_marked_urgent:"you marked it urgent"};function ta(e,t){const n=e.reasons.find(a=>a!=="fits_your_time");return n?`Suggested because ${ea[n]??"it is next"} and it takes about ${t} minutes.`:`Suggested because it fits the ${t} minutes you have.`}function ye(e){return Math.round((new Date(e).getTime()-Date.now())/6e4)}function na(e){const t=[],n=new Map;for(const a of e.data.confirmed){const s=ye(`${a.occ.date}T${a.occ.startTime}:00+05:30`);if(s<0)continue;const i=n.get(a.occ.batchId);(i===void 0||s<i)&&n.set(a.occ.batchId,s)}for(const a of e.data.actions)t.push({kind:"teacher_action",title:a.title,actionId:a.id,batchId:a.batch_id,topicId:a.topic_id,visibility:a.result_visibility,candidate:{id:a.id,source:"teacher",dueInMinutes:ye(a.due_at),nextClassInMinutes:n.get(a.batch_id)??null,teacherPriority:0,reviewReadiness:0,studentPriority:0,estimatedMinutes:a.estimated_minutes,recentSubjectCompletions:0}});for(const a of e.data.privateRows)a.kind!=="deadline"||!a.due_at||t.push({kind:"private_deadline",title:a.title,privateItemId:a.id,candidate:{id:a.id,source:"student",dueInMinutes:ye(a.due_at),nextClassInMinutes:null,teacherPriority:0,reviewReadiness:0,studentPriority:0,estimatedMinutes:a.estimated_minutes??8,recentSubjectCompletions:0}});return t}let oe=8;const ht=new Set,aa=[["already_did","I already did this"],["need_help","I need help with it"],["more_time","I have more time than this"],["less_time","I have less time than this"],["not_relevant","It is no longer relevant"]];let mt=null;function sa(e){const t=na(e).filter(s=>!ht.has(s.candidate.id)),n=kt({candidates:t.map(s=>s.candidate),availableMinutes:oe}),a=n===null?null:t.find(s=>s.candidate.id===n.id)??null;return mt=(a==null?void 0:a.candidate.id)??null,n===null||a===null?`
      <div class="card">
        <p class="hint empty">Nothing urgent fits right now. Nothing is wrong with that.</p>
      </div>`:`
    <section class="hero">
      <p class="eyebrow"><i class="dot"></i> Best use of your time</p>
      <p class="h2 reco-title">${p(a.title)}</p>
      <p class="meta">${p(ta(n,oe))}</p>
      <div class="btn-row">
        ${a.kind==="teacher_action"?`<button class="btn primary full" data-start="${a.actionId}">Start</button>`:`<button class="btn primary full" data-done-private="${a.privateItemId}">I have done this</button>`}
        <button class="btn" data-defer="${a.candidate.id}">Not now</button>
      </div>
      <div class="btn-row" id="defer-reasons" hidden>
        ${aa.map(([s,i])=>`
          <button class="btn" data-defer-reason="${s}" data-defer-id="${a.candidate.id}">${i}</button>`).join("")}
      </div>
    </section>`}function Je(e){return`<div${e.date===re()?' class="today"':""}>
    <div class="strong">${p(e.heading)}</div>
    <div class="hint">${p(e.detail)}</div>
    <div class="hint">${e.marker}${e.qualifier?` · ${e.qualifier}`:""}</div>
  </div>`}let Ze=!1;function ia(){const e=sessionStorage.getItem("tudent-just-joined");sessionStorage.removeItem("tudent-just-joined");const t=a=>`<svg class="li-icon" viewBox="0 0 24 24" aria-hidden="true"
    fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
    stroke-linejoin="round">${a}</svg>`,n={calendar:t('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>'),plus:t('<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>'),lock:t('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),sun:t('<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1"/>'),ask:t('<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.4 2.3c-.8.3-.9 1-.9 1.7"/><path d="M12 16.5h.01"/>')};return`
    ${e?`<p class="strong">You've joined ${p(e)}.</p>`:""}
    <div class="li-row">${n.calendar}<span>Classes and work your teacher confirms appear here</span></div>
    <div class="li-row">${n.plus}<span>Join another class with its code, or add your own</span></div>
    <div class="li-row">${n.lock}<span>What you add is yours alone. No teacher sees it</span></div>
    <div class="li-row">${n.sun}<span>Come back tomorrow, your week fills in</span></div>
    <div class="li-row">${n.ask}<span>Class missing? Ask your teacher for their Tudent link</span></div>`}async function ae(){var c,r,l;const e=await dt(re(),7),t=e.data;!Ze&&!e.fromCache&&(Ze=!0,M("today_opened"),M("recommendation_shown",{teacher_count:t.actions.length,private_count:t.privateRows.filter(d=>d.kind==="deadline").length}));const n=Ct(t.confirmed,t.privateItems),a=At(n,t.durations).filter(d=>!t.silenced.includes(d.key)),s=n.length===0?"":sa(e),i=t.actions.filter(d=>new Date(d.due_at).getTime()>Date.now()-24*60*60*1e3).filter(d=>d.id!==mt).sort((d,y)=>d.due_at.localeCompare(y.due_at)),o=e.savedAt?new Date(e.savedAt).toLocaleString("en-GB",{timeZone:"Asia/Colombo",weekday:"short",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}):"";x("Your week",`
    ${e.fromCache?`
      <div class="card">
        <div class="strong">Working from this phone</div>
        <p class="hint">You are offline, so this is your week as it was saved here${o?` on ${p(o)}`:""}. Any teacher changes will appear when you are back online.</p>
      </div>`:""}

    ${e.changes.length>0?`
      <p class="sec">Since you last looked</p>
      <div class="card"><div class="list">
        ${e.changes.map(d=>`<div class="hint">${p(d)}</div>`).join("")}
      </div></div>`:""}

    ${e.pendingCount>0?`
      <p class="notice">${e.pendingCount} of your items ${e.pendingCount===1?"is":"are"} saved on this phone, waiting to send.</p>`:""}

    ${e.failedItems.length>0?`
      <div class="card">
        <div class="strong">Some of your items could not be saved online</div>
        ${e.failedItems.map(d=>`
          <p class="hint">${p(d.title||d.kind)} could not be sent. It is kept safely on this phone.</p>`).join("")}
      </div>`:""}

    ${s}

    ${a.length>0?`
      <div class="card" id="collision">
        <div class="strong">Two things land together</div>
        <p class="hint">${p(a[0].first)} and ${p(a[0].second)} overlap on ${Z(a[0].date)}. Only you can see this.</p>
        <div class="btn-row">
          <button class="btn" id="col-ack">Noted</button>
          <button class="btn quiet" id="col-silence">Do not warn me about this one again</button>
        </div>
      </div>`:""}

    ${i.length>0?`
      <p class="sec">From your teachers</p>
      <div class="card"><div class="list">
        ${i.map(d=>`
          <div>
            <div class="strong">${p(d.title)}</div>
            <div class="hint">About ${d.estimated_minutes} minutes · due ${Z(d.due_at.slice(0,10))}</div>
            <div class="hint">${d.result_visibility==="private_to_student"?"Your teacher only learns that you finished":"Your teacher will see your answers"}</div>
          </div>`).join("")}
      </div></div>`:""}

    
    ${(()=>{const d=Mt(t.privateItems);return d.length===0?"":`
        <div class="card">
          ${d.map(y=>`<div class="row"><span class="strong grow">${p(y.line)}</span></div>`).join("")}
          <p class="hint">Only you can see this.</p>
        </div>`})()}
    ${(()=>{const d=Tt(n);return d.length===0?"":(Z(ke(1)),`
        <p class="sec">Tomorrow</p>
        <div class="card"><div class="list">${d.map(Je).join("")}</div></div>`)})()}

    <p class="sec">This week</p>
    <div class="card"><div class="list" id="week">
      ${n.length===0?ia():n.map(Je).join("")}
    </div></div>

    <div class="btn-row">
      <button class="btn primary" data-nav="join">Join a class</button>
      <button class="btn" data-nav="add">Add your own</button>
      <button class="btn" id="ics">Add to my phone calendar</button>
    </div>
    ${zn()}
    <button class="btn quiet" data-nav="honours">What you have earned</button>
    <button class="btn quiet" data-nav="topics">What you know</button>
    <button class="btn quiet" data-nav="attendance">Your attendance</button>
    <button class="btn quiet" id="out">Sign out</button>`),I.querySelectorAll("[data-nav]").forEach(d=>d.addEventListener("click",()=>{location.hash=d.dataset.nav})),document.getElementById("out").addEventListener("click",()=>{f.auth.signOut().then(()=>K())}),Kn(()=>{var d;(d=document.getElementById("install-card"))==null||d.remove()}),(c=document.getElementById("col-ack"))==null||c.addEventListener("click",()=>{document.getElementById("collision").remove()}),(r=document.getElementById("col-silence"))==null||r.addEventListener("click",()=>{Zn(a[0].key,t.silenced).then(()=>ae())}),(l=document.getElementById("ics"))==null||l.addEventListener("click",()=>Qn(n,t.durations)),I.querySelectorAll("[data-start]").forEach(d=>d.addEventListener("click",()=>{M("recommendation_started",{estimated_minutes:oe}),location.hash=`session/${d.dataset.start}`})),I.querySelectorAll("[data-defer]").forEach(d=>d.addEventListener("click",()=>{var y;(y=document.getElementById("defer-reasons"))==null||y.removeAttribute("hidden")})),I.querySelectorAll("[data-defer-reason]").forEach(d=>d.addEventListener("click",()=>{M("recommendation_deferred",{reason:d.dataset.deferReason}),ht.add(d.dataset.deferId),ae()})),I.querySelectorAll("[data-done-private]").forEach(d=>d.addEventListener("click",()=>{f.from("student_private_items").update({deleted_at:new Date().toISOString()}).eq("id",d.dataset.donePrivate).then(()=>ae())}))}async function oa(e){const t=await dt(re(),7),n=t.data.actions.find(v=>v.id===e);if(!n){location.hash="week";return}t.data.confirmed.find(v=>v.occ.batchId===n.batch_id);const{data:a}=await f.from("enrolments").select("id,tenant_id,batch_id").eq("batch_id",n.batch_id),s=a==null?void 0:a[0];if(!s){location.hash="week";return}const{pack:i,fromCache:o}=await Vn(s.tenant_id,n.topic_id),c=o?null:await Jn(s.tenant_id,n.topic_id),r=xt(i,c),l=n.result_visibility==="private_to_student"?"Your teacher will only learn that you finished. Never your answers.":"Your teacher will see your answers to these.";if(r.length===0){x(n.title,`
      <p class="hint">There are no practice questions attached to this yet. Doing the task from your class materials still counts; tell your teacher you are done in class.</p>`,"week");return}let d=0,y=0;function m(){const v=r[d];x(n.title,`
      ${d===0?`<p class="hint">${l}</p>`:""}
      <div class="card">
        <p class="hint">${d+1} of ${r.length}</p>
        <div class="strong">${p(v.question)}</div>
        <label>Your answer
          <input id="ans" autocomplete="off" enterkeyhint="done" />
        </label>
        <button class="btn primary full" id="check">${v.answerKey?"Check":"Done"}</button>
        <div id="feedback" hidden>
          ${v.answerKey?`<p class="hint">A good answer includes: ${p(JSON.stringify(v.answerKey.accepts??[]).replaceAll(/[[\]"]/g,""))}</p>`:""}
          <p class="hint">How did it go? Honest answers make the next suggestion better. Nothing is lost either way.</p>
          <div class="btn-row">
            <button class="btn" id="got">I got it</button>
            <button class="btn" id="notyet">Not yet</button>
          </div>
        </div>
      </div>`,"week"),document.getElementById("check").addEventListener("click",()=>{document.getElementById("check").setAttribute("hidden",""),document.getElementById("feedback").removeAttribute("hidden")});const $=w=>{const L={text:document.getElementById("ans").value};Yn({tenant_id:s.tenant_id,enrolment_id:s.id,prompt_version_id:v.versionId,answer:L,correct:w,result_visibility:n.result_visibility,occurred_at:new Date().toISOString()}).catch(j=>void U("completion",String(j))),w&&(y+=1),d+=1,d<r.length?m():b()};document.getElementById("got").addEventListener("click",()=>$(!0)),document.getElementById("notyet").addEventListener("click",()=>$(v.answerKey?!1:null))}function b(){M("recommendation_completed",{estimated_minutes:oe}),x(n.title,`
      <div class="card">
        <div class="strong">That is ${r.length===1?"it":`all ${r.length}`} done.</div>
        <p class="hint">${y===r.length?"You answered without help. That is real evidence, not a feeling.":"The ones that did not stick will come back at a better time. Nothing is lost."}</p>
        <button class="btn primary" data-nav="week">Back to your week</button>
      </div>`,"week"),I.querySelectorAll("[data-nav]").forEach(v=>v.addEventListener("click",()=>{location.hash=v.dataset.nav}))}m()}function ze(e){x("Join a class",`
    <form class="card" id="jf">
      <label>Enter the code your teacher shared
        <input name="code" value="${e?p(e):""}" placeholder="ABC-DEFG-HJK" autocapitalize="characters"
               autocorrect="off" spellcheck="false" enterkeyhint="go" required />
      </label>
      <button class="btn primary full" type="submit">Check the code</button>
      <p class="error" id="jf-err" hidden></p>
    </form>
    <div class="card" id="jf-confirm" hidden></div>`,"week");const t=document.getElementById("jf-err"),n=document.getElementById("jf-confirm");e&&queueMicrotask(()=>document.getElementById("jf").requestSubmit()),document.getElementById("jf").addEventListener("submit",a=>{a.preventDefault();const s=String(new FormData(a.target).get("code"));(async()=>{var b,v;const i=await Ve({action:"preview",code:s});if(i.status!==200){t.hidden=!1,t.textContent=i.status===429?"Too many tries. Wait a little while and try again.":"That code did not work. Check it with your teacher.";return}t.hidden=!0;const{data:o}=await f.auth.getUser(),c=((b=o.user)==null?void 0:b.user_metadata)??{},r=String(c.full_name??c.name??"").trim(),l=String(((v=o.user)==null?void 0:v.email)??"").trim(),d=r&&l?`${r} · ${l}`:r||l||"this Google account",y=String(c.avatar_url??c.picture??"").trim(),m=/^https:\/\//.test(y)?`<img class="join-as-photo" src="${p(y)}" alt="" width="40" height="40"
             referrerpolicy="no-referrer" onerror="this.remove()">`:"";n.hidden=!1,n.innerHTML=`
        <div class="strong">${p(String(i.json.batch_label))}</div>
        <p class="hint">with ${p(String(i.json.teacher_name))}${i.json.location?` · ${p(String(i.json.location))}`:""}</p>
        <div class="join-as">
          ${m}
          <p class="join-as-q">Joining as <strong>${p(d)}</strong>. Is this you?</p>
          <p class="hint">If this is a parent's or a brother's phone, switch first. A class joined on the wrong account has to be moved by hand.</p>
        </div>
        <button class="btn primary full" id="jf-go">Yes, join this class</button>
        <button class="btn quiet full" id="jf-switch">Use another Google account</button>`,document.getElementById("jf-switch").addEventListener("click",()=>{(async()=>(await f.auth.signOut(),location.hash=`join/${encodeURIComponent(s)}`,K()))()}),document.getElementById("jf-go").addEventListener("click",()=>{(async()=>{const $=await Ve({action:"redeem",code:s});if($.status===200&&(M("joined"),sessionStorage.setItem("tudent-just-joined",String(i.json.batch_label))),$.status!==200){n.hidden=!0,t.hidden=!1,t.textContent="That code did not work. Check it with your teacher.";return}location.hash="week"})()})})()})}function ra(){const e=localStorage.getItem("tudent-student-scope")??void 0;x("Add your own",`
    <p class="hint">Anything you add here is yours alone. No teacher can see it.</p>
    <form class="card" id="af">
      <label>What is it?
        <select name="kind">
          <option value="external_class">A class</option>
          <option value="deadline">A deadline</option>
          <option value="exam">An exam</option>
        </select>
      </label>
      <label>Name it
        <input name="title" placeholder="Physics class" enterkeyhint="next" required />
      </label>
      <label>Subject, if you want
        <input name="subject" placeholder="Physics" enterkeyhint="next" />
      </label>
      <div class="field-pair">
        <label>Date <input name="date" type="date" value="${re()}" required /></label>
        <label>Time <input name="time" type="time" value="16:00" required /></label>
      </div>
      <button class="btn primary full" type="submit">Add it</button>
      <p class="error" id="af-err" hidden></p>
    </form>

    <p class="sec">Appearance</p>
    <div class="card">
      <p class="hint">Pick the colour you like. It is saved on this phone for
        your account only, and it changes the accent alone: nothing that
        carries a meaning changes with it.</p>
      ${rn(tt(e))}
    </div>`,"week"),cn(I,e),document.getElementById("af").addEventListener("submit",t=>{t.preventDefault();const n=new FormData(t.target),a=String(n.get("kind")),s=`${n.get("date")}T${n.get("time")}:00+05:30`;(async()=>{var c;const i=(c=await Se("student_id"))==null?void 0:c.value;if(!i)throw new Error("no_student");await Hn({student_id:i,kind:a,title:String(n.get("title")).trim(),subject_label:String(n.get("subject")??"").trim(),starts_at:a==="external_class"?s:null,due_at:a==="deadline"||a==="exam"?s:null})==="queued"&&U("add_item_queued","saved to outbox"),location.hash="week"})().catch(i=>{U("add_item",String(i));const o=document.getElementById("af-err");o.hidden=!1,o.textContent="Could not save it. Try again."})})}K();async function ca(){const e=await f.from("attendance_marks").select("state,note,marked_at,class_sessions(held_on),enrolments(display_name)").order("marked_at",{ascending:!1});if(e.error)throw new Error(e.error.message);const t=(e.data??[]).map(s=>{const i=s.class_sessions;return{state:String(s.state),note:String(s.note??""),heldOn:(i==null?void 0:i.held_on)??""}}).filter(s=>s.heldOn),n=s=>new Date(`${s}T00:00:00Z`).toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric",timeZone:"Asia/Colombo"}),a=s=>s==="absent"?"Marked absent":s==="late"?"Marked late":"Marked present";x("Your attendance",`
    <div class="card">
      <p class="hint">You are present at every class unless your teacher marks otherwise. This page holds only those marks, so a short page is a good sign.</p>
    </div>

    ${t.length===0?`
      <div class="card"><p class="hint empty">No marks at all: present at every class so far. This page only fills in if a teacher marks an absence or a late.</p></div>`:`
      <div class="card"><div class="list">
        ${t.map(s=>`
          <div class="row">
            <span class="grow">
              <span class="roster-name">${p(n(s.heldOn))}</span>
              <span class="roster-sub">${p(a(s.state))}${s.note?` · ${p(s.note)}`:""}</span>
            </span>
          </div>`).join("")}
      </div></div>
      <p class="hint">If something here looks wrong, tell your teacher. They can add a correction, and both the original and the correction stay on the record.</p>`}
  `,"week")}const da=[{test:e=>e==="week",name:"Your week"},{test:e=>e==="student_id",name:"Who you are signed in as"},{test:e=>e.startsWith("pack:"),name:"Questions for a topic"},{test:e=>e.startsWith("roster"),name:"A class list"}];async function la(){const e=await nn(),t=(await Ee()).filter(i=>i.status!=="done"),n=navigator.onLine,a=i=>{var o;return((o=da.find(c=>c.test(i)))==null?void 0:o.name)??i},s=i=>{const o=new Date(i);return`${o.toLocaleDateString("en-GB",{day:"numeric",month:"short",timeZone:"Asia/Colombo"})}, ${o.toLocaleTimeString("en-GB",{hour:"numeric",minute:"2-digit",timeZone:"Asia/Colombo"})}`};x("Saved on this phone",`
    <div class="card">
      <p class="hint">These are kept here so the app opens without a
        connection. Saved means saved on this phone, not that it matches
        what your teacher has right now.</p>
    </div>

    ${e.length===0?`
      <div class="card"><p class="hint empty">Nothing is saved here yet. Open your week once while you have a connection.</p></div>`:`
      <div class="card">
        ${e.map(i=>`
          <div class="row">
            <span class="grow">
              <span class="strong">${p(a(i.key))}</span><br />
              <span class="hint">Saved ${p(s(i.savedAt))}</span>
            </span>
          </div>`).join("")}
      </div>`}

    <p class="sec">Waiting to send</p>
    <div class="card">
      ${t.length===0?'<p class="hint">Nothing is waiting.</p>':`<p class="strong">${t.length===1?"One thing you did is waiting to send.":`${t.length} things you did are waiting to send.`}</p>
           <p class="hint">They are kept here and go out on their own once you
             have a connection. Nothing is lost by closing the app.</p>`}
      <p class="hint">${n?"You have a connection now.":"You are offline, so nothing can be sent or checked at the moment."}</p>
    </div>

    <div class="card">
      <p class="hint">Your phone can clear all of this on its own when it
        runs short of space, and it does not ask first. If this list is empty
        one day, nothing is broken and nothing you did is lost: open the app
        with a connection and it fills again.</p>
    </div>`,"honours")}async function ua(){const e=await f.from("prompt_completions").select("id,prompt_version_id,answer,correct,result_visibility,occurred_at").order("occurred_at",{ascending:!1});if(e.error)throw new Error(e.error.message);const t=e.data??[],n=await f.from("prompt_versions").select("id,question,answer_key"),a=i=>(n.data??[]).find(o=>o.id===i),s=i=>{const o=i==null?void 0:i.text;if(typeof o=="string"&&o.trim())return o;const c=Object.values(i??{}).find(r=>typeof r=="string"&&r.trim());return typeof c=="string"?c:"No answer was recorded."};x("What you answered",`
    <div class="card">
      <p class="hint">Everything you have answered, newest first, with what you wrote.
        Nothing here is counted or scored.</p>
    </div>

    ${t.length===0?`
      <div class="card"><p class="hint empty">Nothing yet. Answers appear here after you finish a check.</p></div>`:`
      ${t.map(i=>{const o=a(i.prompt_version_id),c=i.correct===!0?{cls:"pill on",word:"Right"}:i.correct===!1?{cls:"pill due",word:"Not right"}:{cls:"pill",word:"Not marked"};return`
        <div class="card">
          <div class="row">
            <span class="hint grow">${p(ft(i.occurred_at))}</span>
            <span class="${c.cls}">${c.word}</span>
          </div>
          <div class="strong">${p((o==null?void 0:o.question)??"This question is no longer available.")}</div>
          <p class="said">You wrote: ${p(s(i.answer))}</p>
          ${i.correct===!1&&typeof(o==null?void 0:o.answer_key)=="string"?`<p class="hint">The answer was: ${p(o.answer_key)}</p>`:""}
          ${i.result_visibility==="visible_to_enrolment_teacher"?'<p class="hint">Your teacher can see this one.</p>':'<p class="hint">Only you can see this one.</p>'}
        </div>`}).join("")}`}

    <button class="btn quiet" data-nav="topics">Back to what you know</button>
  `)}async function pt(){var y;const{data:e}=await f.auth.getUser(),t=((y=e.user)==null?void 0:y.id)??"",n=await f.from("topic_assertions").select("id,tenant_id,enrolment_id,topic_id,assertion_type,value,occurred_at,supersedes").order("occurred_at",{ascending:!1});if(n.error)throw new Error(n.error.message);const a=n.data??[],s=await f.from("canonical_topics").select("id,name"),i=m=>{var b;return((b=(s.data??[]).find(v=>v.id===m))==null?void 0:b.name)??m},o=[...new Set(a.map(m=>m.topic_id))].sort(),c=new Date,r=Bt(a,o).map(m=>({t:m,age:Rt(m,c),gap:Ht(m)})),l=m=>m==="due_for_a_refresh"?0:m==="worth_a_look"?1:2;r.sort((m,b)=>l(m.age.suggestion)-l(b.age.suggestion)||i(m.t.topicId).localeCompare(i(b.t.topicId)));const d={got:"You said you have it",shaky:"You said you were shaky",lost:"You said you were lost"};x("What you know",`
    <div class="card">
      <p class="hint">Three records, kept apart on purpose: covered, you said, and checked. No overall score.</p>
      <button class="btn quiet" data-nav="history">What you answered</button>
    </div>

    ${r.length===0?`
      <div class="card"><p class="hint empty">Nothing recorded yet. Topics appear here once a class covers one or you answer a check.</p></div>`:`
      ${r.map(({t:m,age:b,gap:v})=>`
        <div class="card truth-card">
          <div class="strong">${p(i(m.topicId))}</div>
          ${b.suggestion!=="none"?`<span class="refresh-tag">${p(Ut(b.suggestion))}</span>`:""}

          <div class="truths">
            <div class="truth">
              <span class="truth-label">In class</span>
              <span class="truth-value">${m.taught?`Covered ${p(ft(m.taught.lastAt))}${m.taught.tenantIds.length>1?` · by ${m.taught.tenantIds.length} of your teachers`:""}`:"Not covered yet"}</span>
            </div>
            <div class="truth">
              <span class="truth-label">You said</span>
              <span class="truth-value">${m.believes?p(d[m.believes.feeling]):"You have not said"}</span>
            </div>
            <div class="truth">
              <span class="truth-label">Checks</span>
              <span class="truth-value">${m.evidence?`${m.evidence.correct} of ${m.evidence.total} · ${p(qt(b))}`:"Not checked yet"}</span>
            </div>
          </div>

          ${v!=="none"?`<p class="truth-gap">${p(Yt(v))}</p>`:""}

          <div class="btn-row">
            ${["got","shaky","lost"].map($=>{var w;return`
              <button class="btn quiet small" data-feel="${m.topicId}|${$}"
                      aria-pressed="${((w=m.believes)==null?void 0:w.feeling)===$?"true":"false"}">
                ${$==="got"?"I have this":$==="shaky"?"Shaky":"Lost"}
              </button>`}).join("")}
          </div>
        </div>`).join("")}
      <p class="hint">Saying how you feel never changes what the checks recorded. They are kept separate so both stay worth reading.</p>`}
  `,"week"),I.querySelectorAll("[data-feel]").forEach(m=>m.addEventListener("click",()=>{const[b,v]=m.dataset.feel.split("|"),$=a.find(w=>w.topic_id===b);$&&f.from("topic_assertions").insert({id:crypto.randomUUID(),tenant_id:$.tenant_id,enrolment_id:$.enrolment_id,topic_id:b,assertion_type:"student_self_assessment",value:{feeling:v},visibility:"private_to_student",asserted_by:t,occurred_at:new Date().toISOString()}).then(()=>pt())}))}function ft(e){return new Date(e).toLocaleDateString("en-GB",{day:"numeric",month:"short",timeZone:"Asia/Colombo"})}async function ha(){const e=await f.from("honours").select("kind,subject,earned_on,tenant_id").order("earned_on",{ascending:!1});if(e.error)throw new Error(e.error.message);const t=Vt(e.data??[]),n=await f.from("canonical_topics").select("id,name"),a=i=>{var o;return((o=(n.data??[]).find(c=>c.id===i))==null?void 0:o.name)??i},s=i=>new Date(`${i}T00:00:00Z`).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric",timeZone:"Asia/Colombo"});x("What you have earned",`
    ${t.length===0?`
      <div class="card"><p class="hint empty">${p(Jt())}</p></div>`:`
      <div class="card">
        <p class="hint">Each of these came from something your teacher recorded. They are yours and they stay.</p>
      </div>
      ${t.map(i=>`
        <div class="card honour">
          <div class="honour-head">
            <span class="honour-dot" aria-hidden="true"></span>
            <span class="grow">
              <span class="honour-title">${p(Ft(i,a))}</span>
              <span class="honour-when">${p(s(i.earned_on))}</span>
            </span>
          </div>
          <p class="honour-reason">${p(Wt(i))}</p>
        </div>`).join("")}`}

    <button class="btn quiet" data-nav="saved">Saved on this phone</button>
  `,"week")}
