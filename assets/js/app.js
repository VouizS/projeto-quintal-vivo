const WHATSAPP_NUMBER = '5564999075881';
const INSTAGRAM_URL = 'https://www.instagram.com/quintalvivogo/';
const BIBLION_URL = 'https://biblion.odilo.us/';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function encodeMessage(text){ return encodeURIComponent(text.trim()); }
function openWhatsApp(message){ window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeMessage(message)}`, '_blank', 'noopener'); }

function setupMenu(){
  const btn = $('.nav-toggle');
  const nav = $('#menu');
  if(!btn || !nav) return;
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  $$('.nav a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }));
}

function setupActiveLinks(){
  const links = $$('.nav a[href^="#"]');
  const sections = links.map(a => $(a.getAttribute('href'))).filter(Boolean);
  if(!sections.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
      }
    });
  }, {rootMargin:'-40% 0px -55% 0px', threshold:0});
  sections.forEach(sec => observer.observe(sec));
}

function setupTheme(){
  const btn = $('#themeToggle');
  const saved = localStorage.getItem('qv-theme');
  if(saved === 'dark') document.body.classList.add('dark');
  updateThemeButton();
  btn?.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('qv-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    updateThemeButton();
  });
  function updateThemeButton(){
    if(!btn) return;
    btn.textContent = document.body.classList.contains('dark') ? 'Modo claro' : 'Modo escuro';
  }
}

function setupFontTools(){
  let scale = parseFloat(localStorage.getItem('qv-font-scale') || '1');
  applyScale();
  $('#fontPlus')?.addEventListener('click', () => { scale = Math.min(1.18, scale + 0.04); save(); });
  $('#fontMinus')?.addEventListener('click', () => { scale = Math.max(0.94, scale - 0.04); save(); });
  function save(){ localStorage.setItem('qv-font-scale', String(scale)); applyScale(); }
  function applyScale(){ document.documentElement.style.setProperty('--font-scale', scale); }
}

function setupExternalRedirects(){
  $$('a[href="/instagram"]').forEach(a => a.href = INSTAGRAM_URL);
}

function setupForms(){
  $('#quoteWhatsBtn')?.addEventListener('click', () => {
    const nome = $('#quoteNome')?.value || '';
    const local = $('#quoteLocal')?.value || '';
    const msg = $('#quoteMsg')?.value || '';
    openWhatsApp(`Olá! Quero solicitar um orçamento do Projeto Quintal Vivo.\n\nNome: ${nome}\nCidade/Bairro: ${local}\nSituação: ${msg}\n\nPosso enviar fotos e localização do lote.`);
  });
  $('#alertWhatsBtn')?.addEventListener('click', () => {
    const fields = {
      nome: $('#alertNome')?.value || '',
      telefone: $('#alertTelefone')?.value || '',
      bairro: $('#alertBairro')?.value || '',
      endereco: $('#alertEndereco')?.value || '',
      maps: $('#alertMaps')?.value || '',
      tipo: $('#alertTipo')?.value || '',
      descricao: $('#alertDescricao')?.value || ''
    };
    openWhatsApp(`Olá! Quero enviar um alerta de lote/quintal sujo em Paraúna-GO.\n\nNome: ${fields.nome}\nWhatsApp: ${fields.telefone}\nBairro/Setor: ${fields.bairro}\nEndereço aproximado: ${fields.endereco}\nLink do Maps: ${fields.maps}\nTipo de problema: ${fields.tipo}\nDescrição: ${fields.descricao}\n\nVou enviar foto do local, se tiver.`);
  });
}

const libraryItems = [
  {
    title:'BibliON — Biblioteca Digital',
    author:'Governo do Estado de São Paulo / SP Leituras',
    year:'Acervo ativo',
    cat:['gratis','biblioteca','oficial'],
    status:'Gratuito',
    type:'Biblioteca digital',
    summary:'Biblioteca digital gratuita com livros digitais, audiolivros, podcasts e programação cultural. Use para pesquisar obras e formar repertório.',
    link:'https://biblion.org.br/',
    altLink:'https://biblion.odilo.us/',
    kind:'library'
  },
  {
    title:'Primavera Silenciosa',
    author:'Rachel Carson',
    year:'1962',
    cat:['meio-ambiente','livros'],
    status:'Livro',
    type:'Clássico ambiental',
    summary:'Obra clássica sobre pesticidas, contaminação ambiental e responsabilidade pública na proteção da vida.',
    link:'https://openlibrary.org/search?q=Primavera+Silenciosa+Rachel+Carson',
    coverQuery:'Primavera Silenciosa Rachel Carson'
  },
  {
    title:'Uma Vida Sem Lixo',
    author:'Cristal Muniz',
    year:'2018',
    cat:['meio-ambiente','organizacao','livros'],
    status:'Livro',
    type:'Lixo zero',
    summary:'Guia brasileiro para reduzir desperdício, repensar consumo e criar hábitos com menos resíduos dentro e fora de casa.',
    link:'https://www.google.com/search?q=Uma+Vida+Sem+Lixo+Cristal+Muniz+livro',
    coverQuery:'Uma Vida Sem Lixo Cristal Muniz'
  },
  {
    title:'A História das Coisas',
    author:'Annie Leonard',
    year:'2010',
    cat:['meio-ambiente','livros'],
    status:'Livro',
    type:'Consumo e resíduos',
    summary:'Explica como produção, consumo e descarte se conectam, ajudando a entender por que lixo e desperdício não são problemas isolados.',
    link:'https://openlibrary.org/search?q=A+Hist%C3%B3ria+das+Coisas+Annie+Leonard',
    coverQuery:'The Story of Stuff Annie Leonard'
  },
  {
    title:'Ideias para Adiar o Fim do Mundo',
    author:'Ailton Krenak',
    year:'2019',
    cat:['meio-ambiente','livros'],
    status:'Livro',
    type:'Brasil / natureza',
    summary:'Reflexão brasileira sobre sociedade, natureza e futuro, útil para conectar cuidado ambiental com responsabilidade coletiva.',
    link:'https://www.google.com/search?q=Ideias+para+Adiar+o+Fim+do+Mundo+Ailton+Krenak',
    coverQuery:'Ideias para Adiar o Fim do Mundo Ailton Krenak'
  },
  {
    title:'Futuro Ancestral',
    author:'Ailton Krenak',
    year:'2022',
    cat:['meio-ambiente','livros'],
    status:'Livro',
    type:'Natureza e cultura',
    summary:'Livro sobre relação com rios, florestas, ancestralidade e modos de viver menos destrutivos.',
    link:'https://www.google.com/search?q=Futuro+Ancestral+Ailton+Krenak',
    coverQuery:'Futuro Ancestral Ailton Krenak'
  },
  {
    title:'O Mundo Sem Nós',
    author:'Alan Weisman',
    year:'2007',
    cat:['meio-ambiente','cidade','livros'],
    status:'Livro',
    type:'Cidade e impacto humano',
    summary:'Mostra o impacto das atividades humanas nas cidades e no planeta, reforçando como abandono e descarte deixam marcas.',
    link:'https://openlibrary.org/search?q=O+Mundo+Sem+N%C3%B3s+Alan+Weisman',
    coverQuery:'The World Without Us Alan Weisman'
  },
  {
    title:'A Última Criança na Natureza',
    author:'Richard Louv',
    year:'2005',
    cat:['meio-ambiente','pets','livros'],
    status:'Livro',
    type:'Infância e natureza',
    summary:'Defende a importância do contato com a natureza para crianças, famílias, saúde e formação cidadã.',
    link:'https://openlibrary.org/search?q=Last+Child+in+the+Woods+Richard+Louv',
    coverQuery:'Last Child in the Woods Richard Louv'
  },
  {
    title:'A Vida Secreta das Árvores',
    author:'Peter Wohlleben',
    year:'2015',
    cat:['meio-ambiente','livros'],
    status:'Livro',
    type:'Natureza',
    summary:'Livro de divulgação sobre árvores, florestas e relações naturais, bom para aproximar leitores da preservação.',
    link:'https://openlibrary.org/search?q=A+Vida+Secreta+das+%C3%81rvores+Peter+Wohlleben',
    coverQuery:'The Hidden Life of Trees Peter Wohlleben'
  },
  {
    title:'A Teia da Vida',
    author:'Fritjof Capra',
    year:'1996',
    cat:['meio-ambiente','livros'],
    status:'Livro',
    type:'Ecologia sistêmica',
    summary:'Introdução à visão sistêmica da vida: tudo está conectado, inclusive hábitos urbanos, lixo, água e saúde.',
    link:'https://openlibrary.org/search?q=A+Teia+da+Vida+Fritjof+Capra',
    coverQuery:'The Web of Life Fritjof Capra'
  },
  {
    title:'O Ponto de Mutação',
    author:'Fritjof Capra',
    year:'1982',
    cat:['meio-ambiente','livros'],
    status:'Livro',
    type:'Pensamento sistêmico',
    summary:'Obra sobre mudança de visão na ciência e sociedade, útil para debates sobre cuidado, saúde e ambiente.',
    link:'https://openlibrary.org/search?q=The+Turning+Point+Fritjof+Capra',
    coverQuery:'The Turning Point Fritjof Capra'
  },
  {
    title:'Sustentabilidade: o que é, o que não é',
    author:'Leonardo Boff',
    year:'2012',
    cat:['meio-ambiente','livros'],
    status:'Livro',
    type:'Sustentabilidade',
    summary:'Discussão acessível sobre sustentabilidade como atitude prática, ética e responsabilidade social.',
    link:'https://www.google.com/search?q=Sustentabilidade+o+que+%C3%A9+o+que+n%C3%A3o+%C3%A9+Leonardo+Boff',
    coverQuery:'Sustentabilidade o que é o que não é Leonardo Boff'
  },
  {
    title:'Saber Cuidar',
    author:'Leonardo Boff',
    year:'1999',
    cat:['meio-ambiente','organizacao','livros'],
    status:'Livro',
    type:'Ética do cuidado',
    summary:'Ajuda a construir linguagem de cuidado: casa, rua, natureza, pessoas e animais como partes de uma mesma responsabilidade.',
    link:'https://www.google.com/search?q=Saber+Cuidar+Leonardo+Boff',
    coverQuery:'Saber Cuidar Leonardo Boff'
  },
  {
    title:'Cidades para Pessoas',
    author:'Jan Gehl',
    year:'2010',
    cat:['cidade','meio-ambiente','livros'],
    status:'Livro',
    type:'Urbanismo',
    summary:'Mostra como cidades melhores dependem de ruas, espaços públicos e convivência urbana bem planejados.',
    link:'https://openlibrary.org/search?q=Cities+for+People+Jan+Gehl',
    coverQuery:'Cities for People Jan Gehl'
  },
  {
    title:'Morte e Vida de Grandes Cidades',
    author:'Jane Jacobs',
    year:'1961',
    cat:['cidade','livros'],
    status:'Livro',
    type:'Vida urbana',
    summary:'Clássico sobre ruas, vizinhança, segurança e vitalidade urbana — útil para falar de cuidado coletivo.',
    link:'https://openlibrary.org/search?q=Death+and+Life+of+Great+American+Cities+Jane+Jacobs',
    coverQuery:'Death and Life of Great American Cities Jane Jacobs'
  },
  {
    title:'Cidade Caminhável',
    author:'Jeff Speck',
    year:'2012',
    cat:['cidade','livros'],
    status:'Livro',
    type:'Urbanismo',
    summary:'Aborda como ruas, deslocamentos e qualidade urbana influenciam o modo como as pessoas vivem a cidade.',
    link:'https://openlibrary.org/search?q=Walkable+City+Jeff+Speck',
    coverQuery:'Walkable City Jeff Speck'
  },
  {
    title:'A Mágica da Arrumação',
    author:'Marie Kondo',
    year:'2011',
    cat:['organizacao','livros'],
    status:'Livro',
    type:'Organização',
    summary:'Livro popular sobre organização, descarte e mudança de hábitos dentro de casa.',
    link:'https://openlibrary.org/search?q=The+Life-Changing+Magic+of+Tidying+Up+Marie+Kondo',
    coverQuery:'The Life-Changing Magic of Tidying Up Marie Kondo'
  },
  {
    title:'Casa Organizada',
    author:'Thais Godinho',
    year:'2016',
    cat:['organizacao','livros'],
    status:'Livro',
    type:'Rotina da casa',
    summary:'Livro brasileiro sobre organização da casa e da rotina, conectando cuidado do ambiente com bem-estar.',
    link:'https://www.google.com/search?q=Casa+Organizada+Thais+Godinho+livro',
    coverQuery:'Casa Organizada Thais Godinho'
  },
  {
    title:'Menos é Mais',
    author:'Francine Jay',
    year:'2010',
    cat:['organizacao','meio-ambiente','livros'],
    status:'Livro',
    type:'Minimalismo',
    summary:'Introduz a ideia de reduzir excessos, consumir melhor e manter espaços mais simples e organizados.',
    link:'https://openlibrary.org/search?q=The+Joy+of+Less+Francine+Jay',
    coverQuery:'The Joy of Less Francine Jay'
  },
  {
    title:'O Poder do Hábito',
    author:'Charles Duhigg',
    year:'2012',
    cat:['organizacao','livros'],
    status:'Livro',
    type:'Hábitos',
    summary:'Ajuda a entender como rotinas se formam, útil para transformar limpeza e prevenção em prática contínua.',
    link:'https://openlibrary.org/search?q=The+Power+of+Habit+Charles+Duhigg',
    coverQuery:'The Power of Habit Charles Duhigg'
  },

  {
    title:'Hábitos Atômicos',
    author:'James Clear',
    year:'2018',
    cat:['mentalidade','organizacao','livros'],
    status:'Livro',
    type:'Hábitos e rotina',
    summary:'Obra sobre formação de hábitos, melhoria contínua e mudança de comportamento. Útil para transformar limpeza, descarte correto e cuidado em rotina.',
    link:'https://openlibrary.org/search?q=Atomic+Habits+James+Clear',
    coverQuery:'Atomic Habits James Clear'
  },
  {
    title:'Mindset',
    author:'Carol S. Dweck',
    year:'2006',
    cat:['mentalidade','livros'],
    status:'Livro',
    type:'Psicologia e comportamento',
    summary:'Livro de psicologia sobre mentalidade fixa e mentalidade de crescimento, útil para falar de mudança de atitude e responsabilidade pessoal.',
    link:'https://openlibrary.org/search?q=Mindset+Carol+Dweck',
    coverQuery:'Mindset Carol Dweck'
  },
  {
    title:'Rápido e Devagar',
    author:'Daniel Kahneman',
    year:'2011',
    cat:['mentalidade','livros'],
    status:'Livro',
    type:'Psicologia da decisão',
    summary:'Clássico sobre julgamento e tomada de decisão. Ajuda a entender por que pessoas adiam tarefas importantes como limpeza, prevenção e organização.',
    link:'https://openlibrary.org/search?q=Thinking+Fast+and+Slow+Daniel+Kahneman',
    coverQuery:'Thinking Fast and Slow Daniel Kahneman'
  },
  {
    title:'Nudge',
    author:'Richard H. Thaler e Cass R. Sunstein',
    year:'2008',
    cat:['mentalidade','cidade','livros'],
    status:'Livro',
    type:'Comportamento e políticas públicas',
    summary:'Mostra como pequenas mudanças no ambiente podem influenciar escolhas melhores, conceito útil para campanhas de limpeza, descarte e prevenção.',
    link:'https://openlibrary.org/search?q=Nudge+Thaler+Sunstein',
    coverQuery:'Nudge Richard Thaler Cass Sunstein'
  },
  {
    title:'A Mente Organizada',
    author:'Daniel J. Levitin',
    year:'2014',
    cat:['mentalidade','organizacao','livros'],
    status:'Livro',
    type:'Organização e cérebro',
    summary:'Livro sobre atenção, excesso de informação e organização mental, conectado ao cuidado com espaços físicos e decisões do dia a dia.',
    link:'https://openlibrary.org/search?q=The+Organized+Mind+Daniel+Levitin',
    coverQuery:'The Organized Mind Daniel Levitin'
  },
  {
    title:'Essencialismo',
    author:'Greg McKeown',
    year:'2014',
    cat:['mentalidade','organizacao','livros'],
    status:'Livro',
    type:'Prioridade e foco',
    summary:'Obra sobre simplificar escolhas e priorizar o essencial. Ajuda a conectar organização com menos acúmulo e mais clareza.',
    link:'https://openlibrary.org/search?q=Essentialism+Greg+McKeown',
    coverQuery:'Essentialism Greg McKeown'
  },
  {
    title:'Gatilhos',
    author:'Marshall Goldsmith e Mark Reiter',
    year:'2015',
    cat:['mentalidade','livros'],
    status:'Livro',
    type:'Mudança de comportamento',
    summary:'Explica como ambientes e estímulos influenciam atitudes, útil para campanhas que incentivam limpeza, zelo e ação comunitária.',
    link:'https://openlibrary.org/search?q=Triggers+Marshall+Goldsmith',
    coverQuery:'Triggers Marshall Goldsmith Mark Reiter'
  },
  {
    title:'A Coragem de Ser Imperfeito',
    author:'Brené Brown',
    year:'2012',
    cat:['mentalidade','livros'],
    status:'Livro',
    type:'Responsabilidade e vergonha',
    summary:'Ajuda a trabalhar linguagem de cuidado sem humilhar: o objetivo é responsabilidade, não exposição da pessoa ou do proprietário.',
    link:'https://openlibrary.org/search?q=Daring+Greatly+Brene+Brown',
    coverQuery:'Daring Greatly Brene Brown'
  },
  {
    title:'Cradle to Cradle',
    author:'William McDonough e Michael Braungart',
    year:'2002',
    cat:['meio-ambiente','livros'],
    status:'Livro',
    type:'Design sustentável',
    summary:'Ideias sobre produtos, resíduos e sistemas desenhados para reaproveitamento em vez de descarte.',
    link:'https://openlibrary.org/search?q=Cradle+to+Cradle+William+McDonough',
    coverQuery:'Cradle to Cradle William McDonough'
  },
  {
    title:'A Terra Inabitável',
    author:'David Wallace-Wells',
    year:'2019',
    cat:['meio-ambiente','livros'],
    status:'Livro',
    type:'Crise climática',
    summary:'Livro de impacto sobre riscos ambientais e climáticos, útil para despertar senso de urgência.',
    link:'https://openlibrary.org/search?q=The+Uninhabitable+Earth+David+Wallace-Wells',
    coverQuery:'The Uninhabitable Earth David Wallace-Wells'
  },
  {
    title:'Dengue — Orientações oficiais',
    author:'Ministério da Saúde',
    year:'Atualizado',
    cat:['gratis','oficial','dengue'],
    status:'Gratuito',
    type:'Guia oficial',
    summary:'Informações oficiais sobre dengue, prevenção, sintomas e controle do Aedes aegypti.',
    link:'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/d/dengue',
    kind:'official'
  },
  {
    title:'Manual de Controle de Escorpiões',
    author:'Ministério da Saúde / BVSMS',
    year:'2009',
    cat:['gratis','oficial','pets'],
    status:'Gratuito',
    type:'PDF oficial',
    summary:'Material técnico sobre prevenção, manejo e orientação para controle de escorpiões.',
    link:'https://www.gov.br/saude/pt-br/assuntos/saude-com-ciencia/noticias/2024/setembro/esclarecimentos-e-cuidados-sobre-acidentes-com-escorpioes',
    kind:'official'
  },
  {
    title:'Manual de Controle de Roedores',
    author:'Fundação Nacional de Saúde / MS',
    year:'2002',
    cat:['gratis','oficial','pets'],
    status:'Gratuito',
    type:'PDF oficial',
    summary:'Guia técnico sobre prevenção e controle de roedores, relevante para lixo e saneamento.',
    link:'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/l/leptospirose/prevencao',
    kind:'official'
  },
  {
    title:'Leptospirose — prevenção',
    author:'Ministério da Saúde',
    year:'Atualizado',
    cat:['gratis','oficial','pets'],
    status:'Gratuito',
    type:'Guia oficial',
    summary:'Orientações sobre controle de roedores, lixo adequado e prevenção de leptospirose.',
    link:'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/l/leptospirose/prevencao',
    kind:'official'
  },
  {
    title:'Resíduos Sólidos',
    author:'Semad Goiás',
    year:'Atualizado',
    cat:['gratis','oficial','meio-ambiente'],
    status:'Gratuito',
    type:'Página oficial',
    summary:'Informações sobre gestão de resíduos, redução de impactos e consumo sustentável.',
    link:'https://goias.gov.br/meioambiente/residuos-solidos/',
    kind:'official'
  },
  {
    title:'Publicações de Educação Ambiental',
    author:'Ministério do Meio Ambiente',
    year:'Coleção',
    cat:['gratis','oficial','meio-ambiente'],
    status:'Gratuito',
    type:'Acervo oficial',
    summary:'Acervo de publicações, cartilhas e materiais de educação ambiental do MMA.',
    link:'https://www.gov.br/mma/pt-br/centrais-de-conteudo/publicacoes/educacao-ambiental',
    kind:'official'
  },
  {
    title:'Programa Nacional de Educação Ambiental',
    author:'MMA / MEC',
    year:'2005',
    cat:['gratis','oficial','meio-ambiente'],
    status:'Gratuito',
    type:'PDF oficial',
    summary:'Documento base de políticas, princípios e ações de educação ambiental no Brasil.',
    link:'https://portal.mec.gov.br/dmdocuments/publicacao1.pdf',
    kind:'official'
  },
  {
    title:'Inventário Turístico de Paraúna',
    author:'Goiás Turismo / Paraúna',
    year:'2025',
    cat:['gratis','oficial','cidade'],
    status:'Gratuito',
    type:'PDF regional',
    summary:'Inventário com atrativos naturais e culturais de Paraúna-GO.',
    link:'https://www.parauna.go.gov.br/turista',
    kind:'official'
  }
];

const coverCache = new Map();

function setupLibrary(){
  const grid = $('#bookGrid');
  const search = $('#bookSearch');
  const filters = $$('#bookFilters .filter');
  if(!grid) return;
  let active = 'todos';

  function render(){
    const q = normalize(search?.value || '');
    const list = libraryItems.filter(item => {
      const hay = normalize(`${item.title} ${item.author} ${item.summary} ${item.type} ${item.status} ${item.cat.join(' ')}`);
      const filterOk = active === 'todos' || item.cat.includes(active);
      return filterOk && (!q || hay.includes(q));
    });
    grid.innerHTML = list.length ? list.map(itemTemplate).join('') : '<div class="no-results">Nenhum material encontrado. Tente outro termo ou filtro.</div>';
    hydrateCovers();
  }

  function itemTemplate(item){
    const tags = [item.status, item.type].filter(Boolean).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('');
    const isBook = item.coverQuery && item.kind !== 'official';
    const cover = isBook ? `<div class="book-cover real-cover" aria-label="Capa de ${escapeHtml(item.title)}">
        <img class="book-cover-img" data-query="${escapeHtml(item.coverQuery)}" alt="Capa real de ${escapeHtml(item.title)}" loading="lazy">
        <span class="cover-loading">Buscando capa real...</span>
      </div>` : `<div class="book-cover official-cover">
        <i class="bi ${item.kind === 'library' ? 'bi-bookshelf' : 'bi-file-earmark-text'}" aria-hidden="true"></i>
        <strong>${escapeHtml(item.kind === 'library' ? 'Biblioteca digital' : 'Documento oficial')}</strong>
        <span>${escapeHtml(item.author)}</span>
      </div>`;

    const alt = item.altLink ? `<a class="secondary-link" href="${item.altLink}" target="_blank" rel="noopener">Acessar acervo ↗</a>` : '';
    const mainLabel = item.kind === 'official' ? 'Abrir fonte oficial' : item.kind === 'library' ? 'Entrar na biblioteca' : 'Ver livro / acervo';

    return `<article class="book-card ${isBook ? 'has-real-cover' : 'has-official-cover'}" data-cat="${escapeHtml(item.cat.join(' '))}">
      ${cover}
      <div class="book-info">
        <h3>${escapeHtml(item.title)}</h3>
        <p><strong>Criado por:</strong> ${escapeHtml(item.author)}</p>
        <p><strong>Publicado:</strong> ${escapeHtml(item.year)}</p>
        <div class="book-meta">${tags}</div>
        <p>${escapeHtml(item.summary)}</p>
        <div class="book-actions">
          <a href="${item.link}" target="_blank" rel="noopener">${mainLabel} ↗</a>
          ${alt}
        </div>
      </div>
    </article>`;
  }

  filters.forEach(btn => btn.addEventListener('click', () => {
    active = btn.dataset.filter;
    filters.forEach(b => b.classList.toggle('active', b === btn));
    render();
  }));
  search?.addEventListener('input', render);
  render();
}

function normalize(str=''){
  return String(str).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
}

async function hydrateCovers(){
  const images = $$('.book-cover-img');
  for(const img of images){
    const query = img.dataset.query;
    if(!query) continue;
    if(coverCache.has(query)){
      applyCover(img, coverCache.get(query));
      continue;
    }
    try{
      const openLibrary = await fetchOpenLibraryCover(query);
      if(openLibrary){
        coverCache.set(query, openLibrary);
        applyCover(img, openLibrary);
        continue;
      }
      const google = await fetchGoogleBooksCover(query);
      if(google){
        coverCache.set(query, google);
        applyCover(img, google);
        continue;
      }
      coverCache.set(query, null);
      showNoCover(img);
    }catch(err){
      showNoCover(img);
    }
  }
}

async function fetchOpenLibraryCover(query){
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=1&fields=cover_i,title,author_name,first_publish_year`;
  const res = await fetch(url);
  if(!res.ok) return null;
  const data = await res.json();
  const doc = data.docs && data.docs[0];
  if(!doc || !doc.cover_i) return null;
  return `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`;
}

async function fetchGoogleBooksCover(query){
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=1&printType=books`;
  const res = await fetch(url);
  if(!res.ok) return null;
  const data = await res.json();
  const volume = data.items && data.items[0] && data.items[0].volumeInfo;
  const links = volume && volume.imageLinks;
  if(!links) return null;
  return (links.extraLarge || links.large || links.medium || links.thumbnail || links.smallThumbnail || '').replace('http://','https://');
}

function applyCover(img, src){
  if(!src){ showNoCover(img); return; }
  img.src = src;
  img.classList.add('loaded');
  const holder = img.closest('.real-cover');
  holder?.classList.add('loaded');
  const label = holder?.querySelector('.cover-loading');
  if(label) label.textContent = 'Capa carregada do acervo';
  img.onerror = () => showNoCover(img);
}

function showNoCover(img){
  const holder = img.closest('.real-cover');
  holder?.classList.add('no-cover');
  const label = holder?.querySelector('.cover-loading');
  if(label) label.textContent = 'Capa não encontrada no acervo';
}

function escapeHtml(str=''){
  return String(str).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
}

function init(){
  $('#year') && ($('#year').textContent = new Date().getFullYear());
  setupMenu();
  setupActiveLinks();
  setupTheme();
  setupFontTools();
  setupExternalRedirects();
  setupForms();
  setupLibrary();
}

document.addEventListener('DOMContentLoaded', init);
