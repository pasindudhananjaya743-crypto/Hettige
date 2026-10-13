(()=>{
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const nav=$('#mainNav'),menu=$('#menuToggle');if(menu&&nav)menu.addEventListener('click',()=>{nav.classList.toggle('open');menu.setAttribute('aria-expanded',nav.classList.contains('open')?'true':'false')});
if(nav&&menu){$$('a',nav).forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}});}
const head=$('.site-header');const scroll=()=>head&&head.classList.toggle('scrolled',window.scrollY>12);scroll();window.addEventListener('scroll',scroll,{passive:true});
const candidates=$$('main section, .category-card, .product-card, .contact-card, .proof-placeholder, .feature-list article, .cta-panel, .order-note, .panel');
candidates.forEach((el,i)=>{el.classList.add('reveal');el.style.transitionDelay=Math.min((i%5)*65,260)+'ms'});
if('IntersectionObserver'in window){document.documentElement.classList.add('reveal-ready');const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -35px 0px'});candidates.forEach(el=>io.observe(el));}else candidates.forEach(el=>el.classList.add('is-visible'));
const audio=$('#bgMusic');
if(audio){
  audio.volume=.28;
  audio.preload='none';
  const button=document.createElement('button');
  button.type='button';
  button.className='sound-toggle';
  button.setAttribute('aria-label','Turn background music on');
  button.setAttribute('aria-pressed','false');
  button.innerHTML='<span class="sound-icon" aria-hidden="true">♫</span><span class="sound-label">Sound Off</span>';
  document.body.appendChild(button);
  let enabled=false;
  const renderSound=()=>{
    button.setAttribute('aria-pressed',enabled?'true':'false');
    button.setAttribute('aria-label',enabled?'Turn background music off':'Turn background music on');
    button.querySelector('.sound-label').textContent=enabled?'Sound On':'Sound Off';
    button.querySelector('.sound-icon').textContent=enabled?'♫':'♪';
  };
  button.addEventListener('click',async()=>{
    if(!enabled){
      enabled=true;
      renderSound();
      try{await audio.play();}catch(err){enabled=false;renderSound();}
    }else{
      enabled=false;
      audio.pause();
      renderSound();
    }
  });
  audio.addEventListener('pause',()=>{if(enabled){enabled=false;renderSound();}});
  renderSound();
}
$$('.product-card,.category-card,.contact-card').forEach(card=>card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');card.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%')}));
})();