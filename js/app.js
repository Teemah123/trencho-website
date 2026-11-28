const features=[
{name:'Wallet Management',icon:'♧',group:'Trading Suite',intro:'Manage your wallet experience and review your available balance from the Trencho Telegram interface.',items:['Wallet connection and management options','Balance visibility and wallet overview','Understand wallet permissions before proceeding']},
{name:'Buy',icon:'♧',group:'Trading Suite',intro:'Explore the buying flow for Solana tokens through the Trencho bot.',items:['Enter or select a token address','Review transaction details and applicable fees','Confirm the purchase only after checking the details']},
{name:'Sell',icon:'♧',group:'Trading Suite',intro:'Explore the selling flow and understand the information presented before a transaction.',items:['Select the token and amount','Review the expected transaction details','Confirm the sale after checking the final details']},
{name:'Copy Trade',icon:'♧',group:'Trading Suite',intro:'A dedicated area for the bot’s copy-trading option. Review its controls and risks before using it.',items:['Understand how a source wallet is selected','Review available copy-trading settings','Set risk limits and monitor activity where supported']},
{name:'Auto Trade',icon:'♧',group:'Trading Suite',intro:'Explore the automated trading option and its configuration workflow.',items:['Review the automation settings available in the bot','Understand when automated actions may execute','Monitor and manage active settings']},
{name:'Withdraw SOL',icon:'♧',group:'Trading Suite',intro:'Review the SOL withdrawal workflow and the checks to make before submitting a transfer.',items:['Enter and verify the destination address','Review the amount and network fees','Confirm the transfer details carefully']},
{name:'Swap Token',icon:'♧',group:'Trading Suite',intro:'Explore the token swap option and the information to check before confirming a swap.',items:['Choose the input and output tokens','Review quoted amounts and price impact where shown','Check fees and transaction details']},
{name:'My Portfolio',icon:'♧',group:'Analytics',intro:'Get an overview of the portfolio tools available through Trencho.',items:['Review supported token holdings','Understand displayed balances','Use portfolio information to monitor your positions']},
{name:'Generate PnL',icon:'♧',group:'Analytics',intro:'Explore the bot’s profit-and-loss reporting option and how it can help review trading activity.',items:['Generate a performance report where supported','Review the period and transactions included','Remember that historical performance does not predict future results']},
{name:'Token Monitor',icon:'♧',group:'Analytics',intro:'A place to explore token monitoring functionality and keep track of selected assets.',items:['Add or identify a token to monitor where supported','Review available market information','Use independent research before making trading decisions']},
{name:'Settings',icon:'♧',group:'Ecosystem',intro:'Review the preferences and configuration options exposed by the Telegram bot.',items:['Explore available bot preferences','Review notification and trading settings where available','Understand the effect of each setting before changing it']},
{name:'Referral',icon:'♧',group:'Ecosystem',intro:'Learn about the Trencho referral option and how invitations work.',items:['Find your referral link or code where available','Review programme eligibility and terms','Check the bot for current reward rules']},
{name:'Trending',icon:'♧',group:'Ecosystem',intro:'Visit the separate Trencho Trending Telegram channel for its community and token-trending updates.',items:['Open the Trencho Trending channel','Review its published content','Verify token information independently']}
];
const grid=document.getElementById('featureGrid');features.forEach((f,i)=>{const b=document.createElement('button');b.className='feature';b.innerHTML=`<div class="ico">${f.icon}</div><b>${f.name}</b><small>${f.group} · Explore feature </small>`;b.onclick=()=>openFeature(i);grid.appendChild(b)});
function showPage(page){document.getElementById('homeView').style.display=page==='home'?'block':'none';document.getElementById('detailPage').classList.toggle('active',page!=='home');document.querySelectorAll('[data-nav]').forEach(a=>a.classList.toggle('active',a.dataset.nav===page));document.getElementById('navlinks').classList.remove('open');if(page==='home'){history.replaceState(null,'','#home');window.scrollTo({top:0,behavior:'smooth'});return}const match=features.findIndex(f=>f.group.toLowerCase()===page);if(match>=0)openFeature(match,false);else{document.getElementById('detailKicker').textContent='TRENCHO · LEARN';document.getElementById('detailTitle').textContent='Learn the Trencho workflow.';document.getElementById('detailIntro').textContent='Explore guides, security information and answers to common questions. Detailed documentation should be populated from verified bot instructions.';document.getElementById('detailList').innerHTML='<li>Getting started with the Telegram bot</li><li>Wallet and transaction safety</li><li>Feature guides and troubleshooting</li><li>Community and support links</li>';document.getElementById('detailNav').innerHTML=''}document.getElementById('detailPage').scrollIntoView({behavior:'smooth'})}
function openFeature(i,scroll=true){const f=features[i];document.getElementById('homeView').style.display='none';document.getElementById('detailPage').classList.add('active');document.getElementById('detailKicker').textContent='TRENCHO · '+f.group.toUpperCase();document.getElementById('detailTitle').textContent=f.name+'.';document.getElementById('detailIntro').textContent=f.intro;document.getElementById('detailList').innerHTML=f.items.map(x=>`<li>${x}</li>`).join('');document.getElementById('detailNav').innerHTML=features.filter(x=>x.group===f.group&&x.name!==f.name).map(x=>`<button onclick="openFeature(${features.indexOf(x)})">${x.name} →</button>`).join('');history.replaceState(null,'','#'+f.name.toLowerCase().replaceAll(' ','-'));if(scroll)document.getElementById('detailPage').scrollIntoView({behavior:'smooth'})}
document.querySelectorAll('[data-nav]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();if(a.dataset.nav==='faq'){showPage('home');history.replaceState(null,'','#faq');document.getElementById('faq').scrollIntoView({behavior:'smooth'});document.querySelectorAll('[data-nav]').forEach(link=>link.classList.toggle('active',link===a));}else showPage(a.dataset.nav)}));

document.querySelectorAll('[data-home-link],[data-back-home]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();showPage('home')}));
document.querySelectorAll('[data-menu-toggle]').forEach(el=>el.addEventListener('click',()=>document.getElementById('navlinks').classList.toggle('open')));
document.querySelectorAll('[data-scroll-how]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();document.getElementById('how').scrollIntoView({behavior:'smooth'})}));
document.querySelectorAll('[data-learn-link]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();showPage('learn')}));

// Scroll reveal: gently animate headings and supporting copy as they enter view.
(function initScrollMotion(){
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const progress = document.getElementById('scrollProgress');
  const revealTargets = [
    '.section-head .kicker', '.section-head h2', '.section-head p',
    '.split .kicker', '.split h2', '.split p', '.steps .step',
    '.security-card > *', '.page > .eyebrow', '.page > h1',
    '.page > .page-intro', '.page-panel > *', '.hero-copy > *'
  ].join(',');

  function attachReveal(scope=document){
    if(reduceMotion) return;
    scope.querySelectorAll(revealTargets).forEach((el,index)=>{
      if(el.classList.contains('reveal')) return;
      el.classList.add('reveal');
      const isHeading = el.matches('h1,h2,h3,.eyebrow,.kicker');
      el.dataset.reveal = isHeading ? 'heading' : 'subtle';
      if(el.closest('.steps')) el.dataset.reveal='card';
      if(el.closest('.page-panel')) el.dataset.reveal='subtle';
      el.style.transitionDelay = `${Math.min(index%5,4)*75}ms`;
      observer.observe(el);
    });
    scope.querySelectorAll('.feature').forEach((el,index)=>{
      if(el.classList.contains('reveal')) return;
      el.classList.add('reveal');
      el.dataset.reveal='card';
      el.style.transitionDelay=`${(index%5)*65}ms`;
      observer.observe(el);
    });
  }

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.12,rootMargin:'0px 0px -45px 0px'});

  function updateProgress(){
    if(!progress) return;
    const max=document.documentElement.scrollHeight-window.innerHeight;
    const ratio=max>0?window.scrollY/max:0;
    progress.style.transform=`scaleX(${Math.max(0,Math.min(1,ratio))})`;
  }
  attachReveal();
  updateProgress();
  window.addEventListener('scroll',updateProgress,{passive:true});
  window.addEventListener('resize',updateProgress,{passive:true});
  // Feature cards are generated by the main script after the initial document parse.
  window.addEventListener('load',()=>attachReveal());
  // Re-attach to detail-page content when feature navigation updates it.
  const detail=document.getElementById('detailPage');
  if(detail){
    new MutationObserver(()=>attachReveal(detail)).observe(detail,{childList:true,subtree:true});
  }
})();

