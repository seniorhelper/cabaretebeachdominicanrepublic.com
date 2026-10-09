(()=>{const b=document.querySelector('.kitebtn'),p=document.querySelector('.kitepanel');if(b&&p)b.onclick=()=>p.classList.toggle('open');})();
/* lead form + email: FormSubmit AJAX, address assembled at runtime */
(function(){
var ES={wait:'Dale un momento al formulario y vuelve a enviarlo.',req:'Completa los campos obligatorios.',go:'Enviando…',ok:'Enviado. Te responderemos en breve.',err:'No se pudo enviar. Llama al 1-800-481-8638.'},EN={wait:'Give the form a moment, then send again.',req:'Please fill in the required fields.',go:'Sending…',ok:"Sent. We'll get back to you shortly.",err:'That did not go through. Please call 1-800-481-8638.'};
function M(k){return ((document.documentElement.lang||'').indexOf('es')===0?ES:EN)[k];}
function addr(el){return atob(el.getAttribute('data-a'))+String.fromCharCode(64)+atob(el.getAttribute('data-b'));}
var em=document.querySelectorAll('.eml');
for(var i=0;i<em.length;i++){var e=em[i],a=addr(e);if(e.tagName==='A')e.href='mailto:'+a+(e.getAttribute('data-q')||'');var t=e.querySelectorAll('.eml-t');for(var k=0;k<t.length;k++)t[k].textContent=a;if(e.hasAttribute('data-show'))e.textContent=a;}
var t0=Date.now(),fs=document.querySelectorAll('form[data-fs]');
for(var j=0;j<fs.length;j++)(function(f){
var st=f.querySelector('.fs-status');function say(m){if(st)st.textContent=m;}
f.addEventListener('submit',function(ev){ev.preventDefault();
var hp=f.querySelector('[name="_honey"]'),h2=f.querySelector('[name="company_website"]');if((hp&&hp.value)||(h2&&h2.value))return;
if(Date.now()-t0<3500){say(M('wait'));return;}
var rq=f.querySelectorAll('[required]');for(var n=0;n<rq.length;n++){var r=rq[n];if((r.type==='checkbox'&&!r.checked)||!String(r.value||'').trim()){say(M('req'));r.focus();return;}}
var b=f.querySelector('[type="submit"]');if(b)b.disabled=true;say(M('go'));
fetch('https://formsubmit.co/ajax/'+addr(f),{method:'POST',headers:{Accept:'application/json'},body:new FormData(f)})
.then(function(r){if(!r.ok)throw 0;return r.json();})
.then(function(d){if(d&&String(d.success)==='false')throw 0;say(M('ok'));f.reset();})
.catch(function(){say(M('err'));})
.then(function(){if(b)b.disabled=false;});
});})(fs[j]);
})();
