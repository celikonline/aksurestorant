'use strict';
const feed=document.querySelector('#feed');
const dialog=document.querySelector('#lightbox');
const modalVideo=document.querySelector('#modal-video');
const modalImage=document.querySelector('#modal-image');
const motionButton=document.querySelector('#motion-toggle');
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const clips={5:'assets/grill-fire.mp4',4:'assets/steak-fire.mp4'};
let modalIndex=0;
let motionPaused=reducedMotion.matches;
let ambientWasPaused=false;
let touchStart=null;
const hasObserver='IntersectionObserver' in window;
const videoObserver=hasObserver?new IntersectionObserver(entries=>{
  entries.forEach(({target:v,isIntersecting,intersectionRatio})=>{
    if(isIntersecting&&v.dataset.src){v.src=v.dataset.src;delete v.dataset.src;v.load();}
    if(isIntersecting&&intersectionRatio>.15&&!motionPaused&&!dialog.open){v.muted=true;v.play().catch(()=>{});}else v.pause();
  });
},{rootMargin:'80px',threshold:[0,.15,.5]}):null;
const cardObserver=hasObserver?new IntersectionObserver(entries=>{
  entries.forEach(({target,isIntersecting})=>{if(isIntersecting){target.classList.add('reveal-in');cardObserver.unobserve(target);}});
},{threshold:.03}):null;

function renderFeed(category='Tümü'){
  feed.querySelectorAll('video').forEach(v=>{v.pause();videoObserver?.unobserve(v);});
  feed.querySelectorAll('.post').forEach(p=>cardObserver?.unobserve(p));
  feed.replaceChildren();
  const selection=category==='Tümü'?posts:posts.filter(p=>p.category===category);
  selection.forEach(p=>{
    const article=document.createElement('article');article.className='post';
    const clip=clips[p.id];
    article.innerHTML=`<button class="post-image" aria-label="${p.title} ${clip?'Videoyu aç':'Görseli büyüt'}">${clip?`<video class="feed-video" data-src="${clip}" muted loop playsinline preload="none" poster="assets/post-${p.id}.jpg" aria-label="${p.title}"></video><span class="reel-indicator">AKSU FİLMİ</span>`:`<img src="assets/post-${p.id}.jpg" alt="${p.title} ${p.caption}" loading="lazy" decoding="async" width="640" height="800">`}<span class="post-badge">${p.category.toLocaleUpperCase('tr')}</span><span class="post-open" aria-hidden="true">${clip?'▶':'↗'}</span></button><div class="post-meta"><span>AKSU / ${p.category.toLocaleUpperCase('tr')}</span><span>${p.date}</span></div><h3>${p.title}</h3><p>${p.caption}</p><a class="post-instagram" href="https://www.instagram.com/reel/${p.code}/" target="_blank" rel="noopener">Instagram'da aç ↗</a>`;
    article.querySelector('button').addEventListener('click',()=>openPost(posts.indexOf(p)));
    feed.append(article);cardObserver?.observe(article);
    if(clip){const v=article.querySelector('video');if(videoObserver)videoObserver.observe(v);}
  });
  document.querySelectorAll('[data-filter]').forEach(b=>{const on=b.dataset.filter===category;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});
  document.querySelector('#load-more').hidden=true;
  document.querySelector('#feed-status').textContent=`${selection.length} paylaşım · Yeni anlar için Instagram'da buluşalım.`;
}

function openPost(index){
  modalIndex=(index+posts.length)%posts.length;
  const p=posts[modalIndex],clip=clips[p.id];
  modalVideo.pause();modalVideo.removeAttribute('src');modalVideo.load();
  modalVideo.hidden=!clip;modalImage.hidden=!!clip;
  if(clip){modalVideo.src=clip;modalVideo.poster=`assets/post-${p.id}.jpg`;modalVideo.muted=true;modalVideo.play().catch(()=>{});}
  else{modalImage.src=`assets/post-${p.id}.jpg`;modalImage.alt=p.title;}
  document.querySelector('#modal-title').textContent=p.title;
  document.querySelector('#modal-category').textContent=p.category;
  document.querySelector('#modal-caption').textContent=p.caption;
  document.querySelector('#modal-link').href=`https://www.instagram.com/reel/${p.code}/`;
  document.querySelector('#modal-count').textContent=`${modalIndex+1} / ${posts.length}`;
  if(!dialog.open){ambientWasPaused=motionPaused;document.querySelectorAll('video:not(#modal-video)').forEach(v=>v.pause());dialog.showModal();document.body.style.overflow='hidden';}
}
function resumeVisibleVideos(){
  if(motionPaused)return;
  document.querySelectorAll('video:not(#modal-video)').forEach(v=>{const r=v.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight&&v.currentSrc)v.play().catch(()=>{});});
}
function closeModal(){dialog.close();}
dialog.addEventListener('close',()=>{modalVideo.pause();modalVideo.removeAttribute('src');modalVideo.load();document.body.style.overflow='';if(!ambientWasPaused)resumeVisibleVideos();});
document.querySelector('.close-modal').addEventListener('click',closeModal);
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeModal();}});
document.querySelector('#previous').addEventListener('click',()=>openPost(modalIndex-1));
document.querySelector('#next').addEventListener('click',()=>openPost(modalIndex+1));
document.addEventListener('keydown',e=>{if(!dialog.open)return;if(e.key==='ArrowRight')openPost(modalIndex+1);if(e.key==='ArrowLeft')openPost(modalIndex-1);});
modalImage.addEventListener('touchstart',e=>{touchStart=e.changedTouches[0].screenX;},{passive:true});
modalImage.addEventListener('touchend',e=>{if(touchStart===null)return;const delta=e.changedTouches[0].screenX-touchStart;if(Math.abs(delta)>55)openPost(modalIndex+(delta<0?1:-1));touchStart=null;},{passive:true});
document.querySelectorAll('[data-watch]').forEach(b=>b.addEventListener('click',()=>openPost(posts.findIndex(p=>p.id===Number(b.dataset.watch)))));
document.querySelector('[data-opening-film]').addEventListener('click',()=>{
 openPost(0);modalVideo.src='assets/aksu-film.mp4';modalVideo.poster='assets/hero-poster.jpg';
 document.querySelector('#modal-title').textContent='Ateşin bir imzası var.';
 document.querySelector('#modal-caption').textContent='Aksu’nun mangalından ve ustasının elinden, ateşin hikâyesi.';
 document.querySelector('#modal-count').textContent='AKSU / AÇILIŞ FİLMİ';modalVideo.play().catch(()=>{});
});
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>renderFeed(b.dataset.filter)));
document.querySelectorAll('[data-story]').forEach(b=>b.addEventListener('click',()=>{renderFeed(b.dataset.story);document.querySelector('#akis').scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth'});}));

function updateMotionButton(){motionButton.setAttribute('aria-pressed',String(motionPaused));motionButton.setAttribute('aria-label',motionPaused?'Arka plan videosunu oynat':'Arka plan videosunu duraklat');motionButton.innerHTML=motionPaused?'▶ <span>FİLMİ OYNAT</span>':'Ⅱ <span>FİLM OYNUYOR</span>';}
motionButton.addEventListener('click',()=>{motionPaused=!motionPaused;document.querySelectorAll('.ambient-video').forEach(v=>{v.style.opacity=motionPaused?'0.35':'1';if(motionPaused)v.pause();});if(!motionPaused)resumeVisibleVideos();updateMotionButton();});
reducedMotion.addEventListener('change',e=>{motionPaused=e.matches;document.querySelectorAll('video:not(#modal-video)').forEach(v=>{if(motionPaused)v.pause();});if(!motionPaused)resumeVisibleVideos();updateMotionButton();});
document.querySelectorAll('.ambient-video').forEach(v=>{v.muted=true;if(motionPaused){v.autoplay=false;v.pause();}videoObserver?.observe(v);});
const heroVideo=document.querySelector('#hero-film');
heroVideo.addEventListener('error',()=>{motionPaused=true;heroVideo.style.opacity='0';updateMotionButton();});
heroVideo.addEventListener('playing',()=>{if(!motionPaused)updateMotionButton();});
document.addEventListener('visibilitychange',()=>{if(document.hidden)document.querySelectorAll('video').forEach(v=>v.pause());else if(!dialog.open)resumeVisibleVideos();});

const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.header nav');
function closeMenu(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Menüyü aç');toggle.textContent='☰';}
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Menüyü kapat':'Menüyü aç');toggle.textContent=open?'✕':'☰';});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
let scrollQueued=false;
function updateScroll(){scrollQueued=false;const max=document.documentElement.scrollHeight-innerHeight;document.querySelector('.scroll-progress').style.transform=`scaleX(${max>0?scrollY/max:0})`;}
window.addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(updateScroll);}},{passive:true});
renderFeed();updateMotionButton();updateScroll();
