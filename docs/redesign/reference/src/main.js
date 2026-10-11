/* Reference JS, the same code as inside portfolio.html. Image paths point to reference/assets/shots. */
(function(){
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var root=document.documentElement,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- theme ---------- */
function curTheme(){var t=root.dataset.theme;if(t)return t;return matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}
try{var st=localStorage.getItem('nv-theme');if(st)root.dataset.theme=st}catch(e){}
$('#themeBtn').addEventListener('click',function(e){
  var next=curTheme()==='dark'?'light':'dark';
  var go=function(){root.dataset.theme=next;try{localStorage.setItem('nv-theme',next)}catch(err){}};
  if(document.startViewTransition&&!reduce){var r=e.currentTarget.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2,rad=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));
    var vt=document.startViewTransition(go);vt.ready.then(function(){root.animate({clipPath:['circle(0 at '+x+'px '+y+'px)','circle('+rad+'px at '+x+'px '+y+'px)']},{duration:550,easing:'cubic-bezier(.2,.8,.2,1)',pseudoElement:'::view-transition-new(root)'})}).catch(function(){})}
  else go();
});

/* ---------- toast + copy ---------- */
var toastT;function toast(t){var el=$('#toast');el.textContent=t;el.classList.add('on');clearTimeout(toastT);toastT=setTimeout(function(){el.classList.remove('on')},1800)}
$$('[data-copy]').forEach(function(b){b.addEventListener('click',function(){var v=b.dataset.copy;
  var ok=function(){toast('Скопировано: '+v)};
  try{navigator.clipboard.writeText(v).then(ok,function(){toast(v)})}catch(e){toast(v)}})});

/* ---------- header shadow ---------- */
var hdr=$('#hdr');addEventListener('scroll',function(){hdr.classList.toggle('sc',scrollY>8)},{passive:true});

/* ---------- projects ---------- */
var A=function(u,t){return '<a href="'+u+'" target="_blank" rel="noopener">'+(t||u.replace(/^https?:\/\//,''))+'</a>'};
var P=[
 {y:'07.2026',n:'Almanac',img:'al-today',media:['al-today','al-phone','al-progress'],d:'Модульное приложение для самодисциплины: веб, Android, десктоп',r:'Свой продукт',c:'#EF8857',
  lead:'Мой собственный продукт - модульное приложение для самодисциплины. Ядро - экран «Сегодня» и прогресс, к нему подключаются модули: привычки, тренировки, чтение, фокус, рефлексия, друзья, достижения. Работает в браузере, на Android и на компьютере.',
  tasks:['Собрать разные инструменты в одно приложение так, чтобы оно не превратилось в свалку функций','Отметка привычки срабатывает за один тап, даже без сети, и ничего не теряется','Чужие данные закрыты на уровне базы, а не только интерфейса','Один код на три платформы, обновления без переустановки','Частые релизы не ломают то, что уже работает'],
  did:['Модульную архитектуру: каждый модуль - отдельная фича со своим API и хуками, его можно включить, выключить и переставить, настройки синхронизируются между устройствами','Дизайн-систему с двумя темами, общую для всех модулей','Офлайн на TanStack Query: оптимистичные обновления, кэш на 7 дней, очередь записей, которая досылается, когда сеть вернулась','Схему в Supabase и 91 политику доступа RLS','Сборки под Android на Capacitor и под десктоп на Tauri','CI: 140+ PR через проверки, 17 e2e-тестов на Playwright и 46 unit-тестов на Vitest','Лэндинг продукта'],
  strong:'Полный цикл продукта в одиночку: модульная архитектура, дизайн-система, база, сборки и тесты. Офлайн-режим, в котором не теряется ни одна запись.',
  when:'С июля 2026, сейчас версия 0.6',stack:['React 19','TypeScript','Vite','Tailwind','TanStack Query','Zustand','Supabase','Capacitor','Tauri','Playwright','Vitest'],
  links:A('https://almanac-sorakiels-projects.vercel.app')+' · '+A('https://github.com/Sorakiel/almanac','GitHub'),more:'case-almanac'},
 {y:'05.2025',n:'Parkovich',img:'pk-site',media:['pk-site','pk-phone','pk-site-m'],d:'Поиск свободных парковочных мест: веб-приложение и сайт',r:'Frontend целиком',c:'#2E7BF6',
  lead:'Сервис для водителей: на схеме парковки видно, какие места свободны прямо сейчас и сколько из них платных, бесплатных и для людей с инвалидностью. Веду весь фронтенд: веб-приложение и сайт.',
  tasks:['Показать живую схему парковки по местам, а не просто точку на карте','Держать статусы свежими и честно показывать, насколько они свежие','Вход без пароля и сессия, которая не обрывается посреди поездки','Понять, как люди на самом деле пользуются сервисом'],
  did:['Свою отрисовку парковки на SVG: по координатам рядов считаю прямоугольники мест, рисую зоны и маркеры с заполненностью, зум, фильтры по типу места, кэш отрисовки','Автообновление статусов и индикатор свежести данных: зелёный, жёлтый, красный','Поиск с подсказками, выбор адреса, избранное, маршрут в 5 навигаторов, поддержку и жалобы','Вход по коду, обновление токена до его истечения, отпечаток устройства','Продуктовую аналитику: 9 событий от открытия приложения до сбоев, с платформой и анонимным id','Сайт с мобильными версиями разделов, шаблон письма, сборку в Docker и nginx'],
  strong:'Сложный интерфейс без готовой библиотеки: своя геометрия и отрисовка схемы, которая быстро работает на телефоне. Продуктовые метрики встроены в само приложение.',
  when:'С мая 2025: сначала сайт, с августа 2025 веб-приложение',stack:['React 19','TypeScript','Vite','React Router','Ant Design','axios','Docker','nginx'],
  links:A('https://parkovich.ru/app')+' · '+A('https://parkovich.ru'),more:'case-parkovich'},
 {y:'12.2025',n:'Giulia Povkh',img:'gp',media:['gp','gp-m','gp-skills'],d:'Сайт-портфолио для контент-мейкера',r:'Frontend целиком',c:'#C98A86',
  lead:'Сайт-портфолио для Giulia Povkh: SMM, рилсы и UGC. Главное в нём - кейсы, по которым клиент сам видит результат её работы.',
  tasks:['Показать кейсы через «до и после» и цифры, а не только красивые картинки','Уместить много фото и видео так, чтобы страница не тормозила','Сделать удобно на телефоне: листать кейсы пальцем'],
  did:['Слайдер кейсов с вкладками «Было», «Стало», «Аналитика», «История», фото и видео внутри','Свайпы на телефоне и анимацию в сторону листания','Ссылки на соцсети, которые сами определяют сервис и ставят нужную иконку','Разделы о себе, навыки, команда, UGC, сертификаты, контакты, кнопку наверх','Ленивую загрузку картинок, у видео грузятся только метаданные'],
  strong:'Аккуратный сайт за шесть дней без лишних зависимостей: только React и TypeScript, слайдер, свайпы и загрузка медиа написаны с нуля.',
  when:'Декабрь 2025, шесть дней',stack:['React 19','TypeScript','Vite']},
 {y:'02.2025',n:'Масленичные пазлы',img:'pz',media:['pz-list','pz-game','pz-lb'],d:'Игра к празднику: мини-приложение ВКонтакте и веб-версия',r:'Frontend целиком',c:'#D9822B',
  lead:'Игра к Масленице: собираешь пазлы на время, получаешь баллы и попадаешь в общий рейтинг. Сначала мини-приложение ВКонтакте, потом отдельная веб-версия со своей регистрацией. Обе работают с одним API.',
  tasks:['Сделать игру, понятную с первого тапа на телефоне','Успеть к празднику','Выпустить вторую платформу за считанные дни на том же API'],
  did:['Механику: поле 6×6 из 36 кусочков, лента кусочков, тап по кусочку и по клетке, при замене кусочек возвращается в ленту','Таймер на 2 минуты и баллы от 10 до 0 в зависимости от времени','Мини-приложение на VKUI: вход по подписи ВКонтакте, игра, коллекция собранных пазлов, рейтинг с моим местом, профиль','Веб-версию: регистрация и вход по токену, закрытые маршруты, свой таб-бар и модальные окна, деплой на сервер'],
  strong:'Две платформы на одной механике и одном API примерно за две с половиной недели, к сроку праздника.',
  when:'Февраль 2025: за две недели мини-приложение ВКонтакте, затем за три дня веб-версия',stack:['React 18','TypeScript','Vite','VKUI','VK Bridge','React Router']},
 {y:'10.2024',n:'Набор в IT-Center',img:'itc',media:['itc'],d:'Сайт структуры студсовета IT-Center с анкетами для набора',r:'Frontend целиком',c:'#6C55D9',
  lead:'Сайт для набора в студенческую структуру IT-Center РЭУ им. Плеханова: рассказывает о наборе и собирает анкеты кандидатов. Можно выбрать несколько структур и заполнить анкету сразу на несколько направлений. Заявки уходят на бэкенд, приём закрывается по дедлайну.',
  tasks:['Показать структуру совета так, чтобы кандидат понял, куда он идёт','Собрать анкеты и довести каждую до сервера','Принимать заявки только до дедлайна набора'],
  did:['Сайт целиком: от вёрстки страниц до форм','Анкеты, которые меняются в зависимости от выбранной структуры, с выбором нескольких направлений сразу','Отправку заявок на бэкенд и ответ пользователю после отправки','Закрытие приёма заявок по дедлайну'],
  strong:'Формы от интерфейса до отправки на бэкенд, сделанные к жёсткому сроку набора.',
  when:'Октябрь - ноябрь 2024',stack:['React','TypeScript']}
];
var IMG={'al-modules':'assets/shots/al-modules.webp','al-phone':'assets/shots/al-phone.webp','al-progress':'assets/shots/al-progress.webp','al-today':'assets/shots/al-today.webp','gp':'assets/shots/gp.webp','gp-m':'assets/shots/gp-m.webp','gp-skills':'assets/shots/gp-skills.webp','itc':'assets/shots/itc.webp','pk-phone':'assets/shots/pk-phone.webp','pk-site':'assets/shots/pk-site.webp','pk-site-m':'assets/shots/pk-site-m.webp','pz':'assets/shots/pz.webp','pz-game':'assets/shots/pz-game.webp','pz-lb':'assets/shots/pz-lb.webp','pz-list':'assets/shots/pz-list.webp'};
var RATIO={'al-modules':1.600,'al-phone':0.462,'al-progress':1.600,'al-today':1.600,'gp-m':0.462,'gp-skills':1.600,'gp':1.600,'itc':1.978,'pk-phone':0.509,'pk-site-m':0.462,'pk-site':1.600,'pz-game':0.462,'pz-lb':0.462,'pz-list':0.462,'pz':1.600};
function pvHTML(p){return '<div class="preview pv-img" style="--pc:'+p.c+'"><img src="'+IMG[p.img]+'" alt="Скриншот '+p.n+'" decoding="async"></div>'}
function UL(a){return '<ul class="pb-list">'+a.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul>'}
function ROW(l,v,c){return '<div class="pb-row'+(c?' '+c:'')+'"><dt>'+l+'</dt><dd>'+v+'</dd></div>'}
function mediaHTML(p){if(!p.media)return '';var A=0,h='';p.media.forEach(function(k){var r=RATIO[k]||1.6;A+=r;h+='<button class="pb-shot'+(r<1?' is-phone':'')+'" type="button" style="flex:'+r+' 1 0" data-zoom="'+k+'" aria-label="Открыть скриншот '+p.n+'"><img src="'+IMG[k]+'" alt="Скриншот '+p.n+'" decoding="async" style="aspect-ratio:'+r+'"></button>'});return '<div class="pb-media" style="--a:'+A.toFixed(3)+'">'+h+'</div>'}
function bodyHTML(p){return '<dl class="pb">'+
 ROW('О проекте',p.lead,'pb-lead')+
 ROW('Задачи',UL(p.tasks))+
 ROW('Что сделал',UL(p.did))+
 (p.strong?ROW('Ключевое',p.strong,'pb-key'):'')+
 ROW('Стек','<span class="chips">'+p.stack.map(function(x){return '<span>'+x+'</span>'}).join('')+'</span>')+
 ROW('Период',p.when)+
 (p.links?ROW('Ссылки',p.links):'')+
 (p.more?'<div class="pb-row pb-foot"><dt></dt><dd><a class="pb-more" href="#'+p.more+'">Подробнее в кейсе ниже <span aria-hidden="true">↓</span></a></dd></div>':'')+
 '</dl>'}
var rows=$('#rows');
$$('img[data-img]').forEach(function(im){im.src=IMG[im.dataset.img];im.classList.add('zoomable');im.tabIndex=0;im.setAttribute('role','button')});
rows.innerHTML=P.map(function(p,i){return '<li class="project rv" style="--pc:'+p.c+'" data-i="'+i+'"><button class="project-toggle" type="button" aria-expanded="false" aria-controls="rp'+i+'"'+(i===0?' data-ins="&lt;ProjectRow&gt;"':'')+'><span class="project-year">'+p.y+'</span><span class="project-name"><i aria-hidden="true"></i>'+p.n+'</span><span class="project-desc">'+p.d+'</span><span class="project-role">'+p.r+'</span><span class="project-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></span></button>'+
 '<div class="project-panel" id="rp'+i+'"><div><div class="grid-12 project-body">'+mediaHTML(p)+bodyHTML(p)+'</div></div></div></li>'}).join('');
$$('.project').forEach(function(row){var b=$('.project-toggle',row);b.addEventListener('click',function(){if(root.classList.contains('inspect'))return;var o=!row.classList.contains('open');row.classList.toggle('open',o);if(o&&peek){peekOn=false;peek.classList.remove('on')}b.setAttribute('aria-expanded',o)})});

/* hover peek that follows the pointer, page takes the project's tint */
var peek=$('#peek'),fine=matchMedia('(hover: hover) and (pointer: fine)').matches,px=0,py=0,cx=0,cy=0,peekOn=false,raf=0;
function side(x){return x+210>innerWidth-180?x-210:x+210}
function peekLoop(){cx+=(px-cx)*.18;cy+=(py-cy)*.18;peek.style.left=cx+'px';peek.style.top=cy+'px';if(peekOn||Math.abs(px-cx)>.5)raf=requestAnimationFrame(peekLoop);else raf=0}
if(fine){$$('.project').forEach(function(row){var p=P[+row.dataset.i];
  row.addEventListener('pointerenter',function(e){if(row.classList.contains('open')||root.classList.contains('inspect'))return;peek.innerHTML=pvHTML(p);px=cx=side(e.clientX);py=cy=e.clientY;peekOn=true;peek.classList.add('on');root.style.setProperty('--tint',p.c);if(!raf)raf=requestAnimationFrame(peekLoop)});
  row.addEventListener('pointermove',function(e){px=side(e.clientX);py=e.clientY;if(row.classList.contains('open')){peekOn=false;peek.classList.remove('on')}});
  row.addEventListener('pointerleave',function(){peekOn=false;peek.classList.remove('on');root.style.setProperty('--tint','transparent')})})}

/* ---------- lightbox ---------- */
(function(){var lb=document.createElement('div');lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','Скриншот');lb.innerHTML='<img alt=""><button class="lb-x" type="button" aria-label="Закрыть">×</button>';document.body.appendChild(lb);
  var im=lb.querySelector('img'),last=null;
  function open(src,alt,from){im.src=src;im.alt=alt||'';last=from;lb.classList.add('on');document.documentElement.style.overflow='hidden';lb.querySelector('.lb-x').focus()}
  function close(){lb.classList.remove('on');document.documentElement.style.overflow='';if(last)last.focus()}
  document.addEventListener('click',function(e){if(root.classList.contains('inspect'))return;var b=e.target.closest('[data-zoom],img.zoomable');if(b){var i=b.tagName==='IMG'?b:b.querySelector('img');open(i.src,i.alt,b);return}if(lb.classList.contains('on')&&(e.target===lb||e.target.closest('.lb-x')))close()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&lb.classList.contains('on'))close();var t=e.target;if((e.key==='Enter'||e.key===' ')&&t.matches&&t.matches('img.zoomable')){e.preventDefault();open(t.src,t.alt,t)}});
})();

/* ---------- inspector ----------
   Measuring (computed styles, tooltip text) happens once per element.
   Scrolling only moves the boxes, once per frame, with transforms. */
var ins=$('#ins'),ibM=$('#ibM'),ibP=$('#ibP'),ibC=$('#ibC'),tip=$('#tip'),insBtn=$('#insBtn'),cur=$('#cur');
var S={el:null,d:null,tw:0,th:0},queued=false,nextEl=null;
function esc(x){return String(x).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function nameOf(el){var t=el.tagName.toLowerCase(),id=el.id?'#'+el.id:'',cn=typeof el.className==='string'?el.className:(el.className&&el.className.baseVal)||'',c=cn.trim()?'.'+cn.trim().split(/\s+/).slice(0,2).join('.'):'';return t+id+c}
function measure(el){var cs=getComputedStyle(el),n=function(k){return parseFloat(cs[k])||0};
  var d={m:[n('marginTop'),n('marginRight'),n('marginBottom'),n('marginLeft')],p:[n('paddingTop'),n('paddingRight'),n('paddingBottom'),n('paddingLeft')],b:[n('borderTopWidth'),n('borderRightWidth'),n('borderBottomWidth'),n('borderLeftWidth')]};
  var r=el.getBoundingClientRect(),comp=el.closest('[data-ins]'),fam=cs.fontFamily.split(',')[0].replace(/["']/g,'');
  var h='<span class="tn">'+esc(nameOf(el))+'</span>  <span class="ts">'+Math.round(r.width)+' × '+Math.round(r.height)+'</span><br>';
  if(el.tagName==='IMG')h+='<span class="tc">img</span> '+el.naturalWidth+' × '+el.naturalHeight+' · '+(el.currentSrc.indexOf('webp')>-1?'webp':'')+' · alt «'+esc(el.alt)+'»<br>';
  else h+='<span class="tc">font</span> '+esc(fam)+' '+cs.fontWeight+' · '+Math.round(n('fontSize'))+'/'+(cs.lineHeight==='normal'?'normal':Math.round(n('lineHeight')))+'<br>';
  h+='<span class="tc">color</span> <span class="sw2" style="background:'+cs.color+'"></span>'+esc(cs.color);
  if(d.p.some(Boolean))h+='<br><span class="tc">padding</span> '+d.p.map(Math.round).join(' ');
  if(comp&&comp!==el)h+='<br><span class="ts">↳ '+esc(comp.dataset.ins)+'</span>';
  d.html=h;return d}
function setBox(el,x,y,w,h,bw){el.style.transform='translate3d('+x+'px,'+y+'px,0)';el.style.width=Math.max(0,w)+'px';el.style.height=Math.max(0,h)+'px';if(bw)el.style.borderWidth=bw.map(function(v){return Math.max(0,v)+'px'}).join(' ')}
function place(withBorders){var el=S.el,d=S.d;if(!el)return;var r=el.getBoundingClientRect(),m=d.m,p=d.p,b=d.b;
  setBox(ibM,r.left-m[3],r.top-m[0],r.width+m[1]+m[3],r.height+m[0]+m[2],withBorders&&m);
  setBox(ibP,r.left+b[3],r.top+b[0],r.width-b[1]-b[3],r.height-b[0]-b[2],withBorders&&p);
  setBox(ibC,r.left+b[3]+p[3],r.top+b[0]+p[0],r.width-b[1]-b[3]-p[1]-p[3],r.height-b[0]-b[2]-p[0]-p[2]);
  var tx=Math.min(Math.max(12,r.left),innerWidth-S.tw-12),ty=r.bottom+10;if(ty+S.th>innerHeight-12)ty=Math.max(12,r.top-S.th-10);
  tip.style.transform='translate3d('+tx+'px,'+ty+'px,0)'}
function show(el){if(!el)return hide();if(el!==S.el){S.el=el;S.d=measure(el);tip.innerHTML=S.d.html;S.tw=tip.offsetWidth;S.th=tip.offsetHeight;place(true)}else place(false);ins.classList.add('on');tip.classList.add('on')}
function hide(){S.el=null;ins.classList.remove('on');tip.classList.remove('on')}
function frame(){queued=false;if(nextEl!==null){var e=nextEl;nextEl=null;if(e===false)hide();else show(e)}else if(S.el)place(false)}
function tick(){if(!queued){queued=true;requestAnimationFrame(frame)}}
function skip(el){return !el||!el.closest||el.closest('.hdr,.ins,.tip,.hud,.toast,.cursor-preview,.grid-ov,.cursor')||el===document.body||el===root||el.tagName==='MAIN'}
function inspecting(){return root.classList.contains('inspect')}
function setInspect(on){stopIntro();root.classList.toggle('inspect',on);insBtn.setAttribute('aria-pressed',on);if(!on)hide();else{peek.classList.remove('on');root.style.setProperty('--tint','transparent');toast('Инспектор включён: наведите на любой элемент')}}
insBtn.addEventListener('click',function(){setInspect(!inspecting())});
addEventListener('keydown',function(e){if(e.target.closest&&e.target.closest('input,textarea,[contenteditable]'))return;if(e.metaKey||e.ctrlKey||e.altKey)return;if(e.key==='i'||e.key==='I'||e.key==='ш'||e.key==='Ш'){setInspect(!inspecting())}else if(e.key==='Escape'&&inspecting())setInspect(false)});
document.addEventListener('pointermove',function(e){if(!inspecting()||e.pointerType==='touch')return;var el=e.target;nextEl=skip(el)?false:(el===S.el?null:el);tick()},{passive:true});
document.addEventListener('click',function(e){if(!inspecting())return;var el=e.target;if(skip(el))return;e.preventDefault();e.stopPropagation();nextEl=el;tick()},true);
addEventListener('scroll',function(){if(S.el)tick()},{passive:true});
addEventListener('resize',function(){if(S.el){var el=S.el;S.el=null;nextEl=el;tick()}});

/* HUD: viewport, scroll and a real fps meter; text is written twice a second, not every frame */
var hudVp=$('#hudVp'),hudY=$('#hudY'),hudF=$('#hudFps'),frames=0,last=performance.now(),hudRaf=0;
function hud(t){frames++;if(t-last>=500){hudF.textContent=Math.round(frames*1000/(t-last));hudVp.textContent=innerWidth+'×'+innerHeight;hudY.textContent='y '+Math.round(scrollY);frames=0;last=t}hudRaf=inspecting()?requestAnimationFrame(hud):0}
new MutationObserver(function(){if(inspecting()&&!hudRaf){frames=0;last=performance.now();hudRaf=requestAnimationFrame(hud)}}).observe(root,{attributes:true,attributeFilter:['class']});

/* ---------- intro: a picker cursor inspects three elements, then hands over the switch.
   Any scroll, wheel, touch or key stops it at once, so it never fights the reader. */
var timers=[],introOn=false,introY=0;
function later(fn,ms){timers.push(setTimeout(fn,ms))}
function stopIntro(){if(!introOn)return;introOn=false;timers.forEach(clearTimeout);timers=[];cur.style.opacity=0;if(!inspecting())hide();removeEventListener('scroll',onIntroScroll);['wheel','touchstart','keydown','pointerdown'].forEach(function(t){removeEventListener(t,stopIntro)})}
function onIntroScroll(){if(Math.abs(scrollY-introY)>4)stopIntro()}
function moveCur(el){var r=el.getBoundingClientRect();cur.style.opacity=1;cur.style.transform='translate3d('+(r.left+Math.min(r.width*.62,r.width-20))+'px,'+(r.top+r.height*.55)+'px,0)'}
function intro(){if(introOn||reduce||inspecting())return;introOn=true;introY=scrollY;
  addEventListener('scroll',onIntroScroll,{passive:true});['wheel','touchstart','keydown','pointerdown'].forEach(function(t){addEventListener(t,stopIntro,{passive:true})});
  var seq=[$('#title .ln:nth-child(3)>span'),$('#status'),$('#ctaWork')];
  cur.style.transition='none';cur.style.transform='translate3d('+(innerWidth*.82)+'px,'+(innerHeight*.9)+'px,0)';void cur.offsetWidth;cur.style.transition='';
  var t=0;seq.forEach(function(el){later(function(){moveCur(el)},t);later(function(){show(el)},t+900);t+=2050});
  later(function(){hide();var r=insBtn.getBoundingClientRect();cur.style.transform='translate3d('+(r.left+r.width/2)+'px,'+(r.top+r.height/2)+'px,0)'},t);
  later(function(){cur.style.opacity=0;insBtn.classList.remove('ping');void insBtn.offsetWidth;insBtn.classList.add('ping');introOn=false;stopIntroListeners()},t+900)}
function stopIntroListeners(){removeEventListener('scroll',onIntroScroll);['wheel','touchstart','keydown','pointerdown'].forEach(function(t){removeEventListener(t,stopIntro)})}
if(!reduce&&scrollY<40){if(fine)later(intro,1500);else setTimeout(function(){insBtn.classList.add('ping')},1400)}
})();
