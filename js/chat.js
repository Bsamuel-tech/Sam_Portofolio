(function () {
  function getLang() { return document.documentElement.getAttribute('data-lang') || 'en'; }
  const STRINGS = {
    en: { title: 'Ask about Samuel', placeholder: 'Ask about projects, skills, availability...', send: 'Send', welcome: "Hi! I'm Samuel's portfolio assistant. Ask me anything about his projects, skills, or availability for internships.", error: 'Something went wrong. Please try again.', thinking: 'Thinking...' },
    fr: { title: 'Posez une question', placeholder: 'Projets, compétences, disponibilité...', send: 'Envoyer', welcome: "Bonjour ! Je suis l'assistant portfolio de Samuel. Posez-moi une question sur ses projets, compétences ou disponibilités.", error: 'Une erreur est survenue. Veuillez réessayer.', thinking: 'En train de réfléchir...' }
  };
  const API_URL = '/api/chat';
  const style = document.createElement('style');
  style.textContent = `#sb-chat-btn{position:fixed;bottom:1.5rem;right:1.5rem;z-index:9999;width:52px;height:52px;border-radius:50%;background:#5b9cf6;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(91,156,246,0.4);transition:transform .2s,background .2s}#sb-chat-btn:hover{background:#3a7df5;transform:scale(1.08)}#sb-chat-btn svg{width:24px;height:24px;fill:#fff}#sb-chat-window{position:fixed;bottom:5rem;right:1.5rem;z-index:9998;width:340px;max-height:480px;background:#161b26;border:1px solid rgba(255,255,255,0.10);border-radius:12px;box-shadow:0 8px 40px rgba(0,0,0,0.5);display:flex;flex-direction:column;overflow:hidden;font-family:'Inter',system-ui,sans-serif;font-size:.875rem;transform:scale(0.95) translateY(8px);opacity:0;pointer-events:none;transition:transform .2s cubic-bezier(0.4,0,0.2,1),opacity .2s}#sb-chat-window.open{transform:scale(1) translateY(0);opacity:1;pointer-events:all}#sb-chat-header{background:#1c2333;border-bottom:1px solid rgba(255,255,255,0.08);padding:.85rem 1rem;display:flex;align-items:center;justify-content:space-between}#sb-chat-header-left{display:flex;align-items:center;gap:.6rem}#sb-chat-status-dot{width:8px;height:8px;border-radius:50%;background:#4ade80;flex-shrink:0}#sb-chat-title{font-weight:600;color:#edeef2;font-size:.875rem}#sb-chat-close{background:none;border:none;cursor:pointer;color:#6b788e;font-size:1.1rem;line-height:1;padding:.1rem .3rem;border-radius:4px;transition:color .15s,background .15s}#sb-chat-close:hover{color:#edeef2;background:rgba(255,255,255,0.06)}#sb-chat-messages{flex:1;overflow-y:auto;padding:1rem;display:flex;flex-direction:column;gap:.75rem;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,0.1) transparent}.sb-msg{max-width:85%;padding:.55rem .85rem;border-radius:10px;line-height:1.55;color:#edeef2;font-size:.8125rem}.sb-msg.bot{background:#202a3a;border:1px solid rgba(255,255,255,0.07);align-self:flex-start;border-bottom-left-radius:3px}.sb-msg.user{background:#5b9cf6;color:#fff;align-self:flex-end;border-bottom-right-radius:3px}.sb-msg.thinking{color:#6b788e;font-style:italic}#sb-chat-input-row{display:flex;gap:.5rem;padding:.75rem 1rem;border-top:1px solid rgba(255,255,255,0.08);background:#1c2333}#sb-chat-input{flex:1;background:#202a3a;border:1px solid rgba(255,255,255,0.10);border-radius:7px;color:#edeef2;font-family:inherit;font-size:.8125rem;padding:.55rem .75rem;outline:none;resize:none;line-height:1.4;transition:border-color .2s}#sb-chat-input:focus{border-color:rgba(91,156,246,0.5)}#sb-chat-input::placeholder{color:#6b788e}#sb-chat-send{background:#5b9cf6;border:none;border-radius:7px;color:#fff;cursor:pointer;padding:0 .85rem;font-size:.8125rem;font-weight:500;font-family:inherit;transition:background .2s;white-space:nowrap}#sb-chat-send:hover{background:#3a7df5}#sb-chat-send:disabled{opacity:.5;cursor:not-allowed}@media(max-width:400px){#sb-chat-window{width:calc(100vw - 2rem);right:1rem}}`;
  document.head.appendChild(style);
  const btn = document.createElement('button');
  btn.id = 'sb-chat-btn';
  btn.setAttribute('aria-label', 'Open chat');
  btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>';
  const win = document.createElement('div');
  win.id = 'sb-chat-window';
  win.innerHTML = '<div id="sb-chat-header"><div id="sb-chat-header-left"><span id="sb-chat-status-dot"></span><span id="sb-chat-title"></span></div><button id="sb-chat-close">&#x2715;</button></div><div id="sb-chat-messages" role="log" aria-live="polite"></div><div id="sb-chat-input-row"><textarea id="sb-chat-input" rows="1" maxlength="500"></textarea><button id="sb-chat-send"></button></div>';
  document.body.appendChild(btn);
  document.body.appendChild(win);
  const messagesEl = document.getElementById('sb-chat-messages');
  const inputEl = document.getElementById('sb-chat-input');
  const sendBtn = document.getElementById('sb-chat-send');
  const titleEl = document.getElementById('sb-chat-title');
  const closeBtn = document.getElementById('sb-chat-close');
  let isOpen = false, isThinking = false, welcomed = false;
  function updateStrings() { const s = STRINGS[getLang()]||STRINGS.en; titleEl.textContent=s.title; inputEl.placeholder=s.placeholder; sendBtn.textContent=s.send; }
  function addMsg(text, type) { const m=document.createElement('div'); m.className='sb-msg '+type; m.textContent=text; messagesEl.appendChild(m); messagesEl.scrollTop=messagesEl.scrollHeight; return m; }
  function openChat() { isOpen=true; win.classList.add('open'); updateStrings(); if(!welcomed){addMsg((STRINGS[getLang()]||STRINGS.en).welcome,'bot');welcomed=true;} setTimeout(()=>inputEl.focus(),200); }
  function closeChat() { isOpen=false; win.classList.remove('open'); }
  btn.addEventListener('click', ()=>isOpen?closeChat():openChat());
  closeBtn.addEventListener('click', closeChat);
  async function sendMessage() {
    const text=inputEl.value.trim(); if(!text||isThinking) return;
    const s=STRINGS[getLang()]||STRINGS.en;
    addMsg(text,'user'); inputEl.value=''; isThinking=true; sendBtn.disabled=true;
    const thinking=addMsg(s.thinking,'bot thinking');
    try { const r=await fetch(API_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:text,lang:getLang()})}); const data=await r.json(); thinking.remove(); addMsg(data.reply||s.error,'bot'); }
    catch { thinking.remove(); addMsg(s.error,'bot'); }
    finally { isThinking=false; sendBtn.disabled=false; inputEl.focus(); }
  }
  sendBtn.addEventListener('click', sendMessage);
  inputEl.addEventListener('keydown', e=>{ if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMessage();} });
  inputEl.addEventListener('input', ()=>{ inputEl.style.height='auto'; inputEl.style.height=Math.min(inputEl.scrollHeight,80)+'px'; });
  new MutationObserver(updateStrings).observe(document.documentElement,{attributes:true,attributeFilter:['data-lang']});
  updateStrings();
})();
