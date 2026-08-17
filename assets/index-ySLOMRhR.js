(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function r(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(n){if(n.ep)return;n.ep=!0;const i=r(n);fetch(n.href,i)}})();let s={google:async()=>"error"};const O="../teacher/",H="batch-plain-entry",S={idle:"",starting:"One moment.",waiting_google:"Opening Google...",returning:"Coming back from Google...",validating:"Checking your sign-in...",completing_join:"Adding your class...",cancelled:"Sign-in was cancelled.",network_error:"Google sign-in did not finish.",provider_error:"Google sign-in did not finish.",disabled:"Sign-in is switched off in this preview."};function w(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}const x=`
  <button class="btn full" id="google-btn" style="gap:10px;background:#fff;border-color:#dadce0;min-height:48px">
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92a8.78 8.78 0 0 0 2.68-6.62z"/><path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.97 10.72a5.41 5.41 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3-2.33z"/><path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.59A9 9 0 0 0 .96 4.95l3 2.33C4.68 5.16 6.66 3.58 9 3.58z"/></svg>
    <span>Continue with Google</span>
  </button>`,G={teacher:{h:"Teach with Tudent",p:"Run your classes without the admin taking over."},student:{h:"Study with Tudent",p:"See your week and know what deserves your attention next."},join:{h:"Join your class",p:"Sign in to add this class to your Tudent week."}};let L="idle",N,T,b=!1;function l(e,t){L=e;const r=document.getElementById("auth-status"),a=document.getElementById("auth-error"),n=document.getElementById("auth-retry"),i=document.getElementById("google-btn");if(!r)return;const d=["starting","waiting_google","returning","validating","completing_join"].includes(e);if(r.textContent=d?S[e]:"",a&&n){const c=e==="network_error"||e==="provider_error"||e==="cancelled"||e==="disabled";a.hidden=!c,a.textContent=c?S[e]:"",n.hidden=!(e==="network_error"||e==="provider_error")}i&&(i.disabled=d),clearTimeout(N),clearTimeout(T),e==="waiting_google"&&(T=setTimeout(()=>{const c=document.getElementById("auth-status");c&&L==="waiting_google"&&(c.textContent=t?"Still working. Your class link is safe.":"Still working. You can try again if this does not finish.")},6e3))}async function $(e){var r,a;if(b)return;b=!0;const t=e.kind==="join";try{l("starting",t),t&&sessionStorage.setItem("batch-join-code",e.code);const n=t?`${location.origin}${location.pathname}#join/${encodeURIComponent(e.code)}`:`${location.origin}${location.pathname}`;l("waiting_google",t);const i=await s.google({...e,redirectTo:n});i==="disabled"&&l("disabled",t),i==="error"&&(l("provider_error",t),(r=s.report)==null||r.call(s,"oauth_start","provider refused"))}catch(n){l("network_error",t),(a=s.report)==null||a.call(s,"oauth_network",String(n))}finally{b=!1}}function P(){const e=new URLSearchParams(location.search||(location.hash.split("?")[1]??"")),t=e.get("error")??e.get("error_code");return t?(history.replaceState(null,"",location.pathname+location.hash.split("?")[0]),/denied|cancell/i.test(t)?"cancelled":"provider"):null}function z(e,t,r){const a=G[e];return`
    <span class="page-wordmark">Tudent</span>
    <h1 class="lede">${w(a.h)}</h1>
    <p class="hint">${w(a.p)}</p>
    <div style="margin-top:auto"></div>
    ${x}
    <p class="notice" id="auth-status" role="status" aria-live="polite"></p>
    <p class="error" id="auth-error" hidden></p>
    <button class="btn quiet" id="auth-retry" hidden>Try again</button>
    
    ${r?'<button class="btn quiet" id="entry-back">Close notebook</button>':""}`}function A(e,t){const r=t?"#fffdf8":"#22577a";return`
    <svg class="${e}" viewBox="0 0 390 340" aria-hidden="true">
      <circle cx="72" cy="63" r="28" fill="#2477ff"/>
      <path d="M42 228V106a30 30 0 0 1 60 0v122z" fill="#2477ff"/>
      <circle cx="157" cy="63" r="28" fill="#ec4899"/>
      <path d="M127 228V106a30 30 0 0 1 60 0v122z" fill="#ec4899"/>
      <circle cx="242" cy="63" r="28" fill="#22b573"/>
      <path d="M212 228V106a30 30 0 0 1 60 0v122z" fill="#22b573"/>
      <circle cx="327" cy="63" r="28" fill="#ff7a21"/>
      <path d="M297 228V106a30 30 0 0 1 60 0v122z" fill="#ff7a21"/>
      <circle cx="199.5" cy="206" r="31.5" fill="${r}"/>
      <path d="M145 313a54.5 54.5 0 0 1 109 0z" fill="${r}"/>
    </svg>`}const F=`
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
  </div>`;function R(e,t,r){var _,B;s=r;const a=localStorage.getItem(H)==="1",n=t.kind!=="cover",i=t.kind==="join"?"join":t.kind==="teacher"?"teacher":"student",d=t.kind==="join";e.innerHTML=`
    <div class="entry-canvas">
      <div class="paper-chrome" aria-hidden="true">
        <p class="paper-index">Tudent · sign in</p>
        <div class="paper-swatches"><i></i><i></i><i></i><i></i></div>
        ${A("paper-watermark",!1).replace(/fill="#(2477ff|ec4899|22b573|ff7a21|22577a|fffdf8)"/g,"")}
        <p class="paper-caption">One week · One next step</p>
      </div>
      <main class="entry-shell">
        <section class="scene" id="entry-scene"
                 data-state="${n?"settled":"closed"}"
                 ${a?'data-presentation="plain"':""}
                 aria-label="Tudent sign-in">
          <div class="notebook">
            <div class="page-stack" aria-hidden="true"></div>

            <section class="signin-page">
              <div class="page-content" id="entry-page" ${n?"":"inert"}>
                ${z(i,d,!n)}
              </div>
            </section>

            ${n?"":`
            <div class="cover" id="entry-cover">
              <nav class="cover-face cover-front" aria-label="Open Tudent">
                <div class="brand-lockup">
                  ${A("brand-symbol",!0)}
                  <p class="brand-name">Tudent</p>
                </div>
                <p class="cover-tagline">Made for tuition.</p>
                <div class="choices">
                  <a class="choice" href="${w(O)}" id="choose-teacher">For teachers</a>
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
          ${F}
        </section>
      </main>
    </div>`,d&&n&&((_=s.joinOpened)==null||_.call(s,t.code));const c=document.getElementById("entry-scene"),k=document.getElementById("entry-page"),u=document.getElementById("entry-cover");function E(){var m,f,h;(m=document.getElementById("google-btn"))==null||m.addEventListener("click",()=>void $(t)),(f=document.getElementById("auth-retry"))==null||f.addEventListener("click",()=>void $(t)),(h=document.getElementById("local-rail"))==null||h.addEventListener("submit",g=>{var y;g.preventDefault();const p=new FormData(g.target);(y=s.local)==null||y.call(s,String(p.get("email")),String(p.get("password"))).then(v=>{v?window.dispatchEvent(new HashChangeEvent("hashchange")):l("provider_error",d)})});const o=P();o==="cancelled"&&l("cancelled",d),o==="provider"&&l("provider_error",d)}if(n){E();return}E();function I(o,m){if(c.dataset.state===o)return;c.dataset.turning="true";let f=!1;const h=()=>{f||(f=!0,u.removeEventListener("transitionend",g),document.removeEventListener("visibilitychange",p),delete c.dataset.turning,o==="open"&&(c.dataset.state="settled"),m())},g=v=>{v.target===u&&(v.propertyName==="transform"||v.propertyName==="opacity")&&h()};u.addEventListener("transitionend",g);const p=()=>{document.hidden&&h()};document.addEventListener("visibilitychange",p),c.dataset.state=o;const y=matchMedia("(prefers-reduced-motion: reduce)").matches;setTimeout(h,y?320:2800)}function j(){c.dataset.state==="closed"&&(history.pushState(null,"","#student"),u.setAttribute("aria-hidden","true"),u.setAttribute("inert",""),I("open",()=>{var o;k.removeAttribute("inert"),(o=document.getElementById("google-btn"))==null||o.focus({preventScroll:!0})}))}function M(){c.dataset.state!=="closed"&&(k.setAttribute("inert",""),u.removeAttribute("inert"),u.setAttribute("aria-hidden","false"),I("closed",()=>{var o;(o=document.getElementById("choose-student"))==null||o.focus({preventScroll:!0})}))}document.getElementById("choose-student").addEventListener("click",o=>{o.preventDefault(),j()}),(B=document.getElementById("entry-back"))==null||B.addEventListener("click",o=>{o.preventDefault(),M()})}const D=document.getElementById("app"),V={google:async()=>"disabled",report:()=>{}};function C(){const e=location.hash.slice(1);let t={kind:"cover"};e==="student"?t={kind:"student"}:e==="teacher"?t={kind:"teacher"}:e.startsWith("join/")&&(t={kind:"join",code:decodeURIComponent(e.slice(5))}),R(D,t,V);const r=document.getElementById("preview-home");r&&(r.hidden=e==="")}window.addEventListener("hashchange",C);C();"serviceWorker"in navigator&&navigator.serviceWorker.register("/tudent/sw.js",{scope:"/tudent/"});
