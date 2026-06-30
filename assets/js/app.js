const WHATSAPP_NUMBER = '5564999075881';
const INSTAGRAM_URL = 'https://www.instagram.com/quintalvivogo/';

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
    btn.textContent = document.body.classList.contains('dark') ? '☀️ Modo claro' : '🌙 Modo escuro';
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
    openWhatsApp(`Olá! Quero solicitar um orçamento do Projeto Quintal Vivo GO.\n\nNome: ${nome}\nCidade/Bairro: ${local}\nSituação: ${msg}\n\nPosso enviar fotos e localização do lote.`);
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

const books = [
  {title:'Dengue — Orientações oficiais', author:'Ministério da Saúde', year:'Atualizado', cat:['gratis','oficial','dengue'], status:'Gratuito', type:'Guia oficial', summary:'Informações oficiais sobre dengue, prevenção, sintomas e controle do Aedes aegypti.', link:'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/d/dengue', colors:['#0e7490','#22d3ee']},
  {title:'Aedes aegypti — prevenção', author:'Ministério da Saúde', year:'Atualizado', cat:['gratis','oficial','dengue'], status:'Gratuito', type:'Guia oficial', summary:'Material sobre eliminação de criadouros, ações permanentes e vigilância do vetor.', link:'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/aedes-aegypti', colors:['#155e75','#67e8f9']},
  {title:'Cartilha para agentes contra arboviroses', author:'Ministério da Saúde', year:'2024', cat:['gratis','oficial','dengue'], status:'Gratuito', type:'PDF oficial', summary:'Cartilha técnica para enfrentamento de dengue, zika e chikungunya nas comunidades.', link:'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/d/dengue/publicacoes/cartilha-agentes-de-combate-as-endemias-e-comunitarios-de-saude-no-enfrentamento-as-arboviroses', colors:['#0369a1','#38bdf8']},
  {title:'Boletins Epidemiológicos de Goiás', author:'Secretaria de Estado da Saúde de Goiás', year:'Atualizado', cat:['gratis','oficial','dengue'], status:'Gratuito', type:'Boletins', summary:'Informes e boletins sobre dengue e arboviroses no estado de Goiás.', link:'https://goias.gov.br/saude/boletins-epidemiologicos/', colors:['#14532d','#22c55e']},
  {title:'Manual de Controle de Escorpiões', author:'Ministério da Saúde / BVSMS', year:'2009', cat:['gratis','oficial','pets'], status:'Gratuito', type:'PDF oficial', summary:'Material técnico sobre prevenção, manejo e orientação para controle de escorpiões.', link:'https://bvsms.saude.gov.br/bvs/publicacoes/manual_controle_escorpioes.pdf', colors:['#7c2d12','#fb923c']},
  {title:'Manual de Controle de Roedores', author:'Fundação Nacional de Saúde / MS', year:'2002', cat:['gratis','oficial','pets'], status:'Gratuito', type:'PDF oficial', summary:'Guia técnico sobre prevenção e controle de roedores, relevante para lixo e saneamento.', link:'https://bvsms.saude.gov.br/bvs/publicacoes/manual_roedores1.pdf', colors:['#44403c','#a8a29e']},
  {title:'Leptospirose — prevenção', author:'Ministério da Saúde', year:'Atualizado', cat:['gratis','oficial','pets'], status:'Gratuito', type:'Guia oficial', summary:'Orientações sobre controle de roedores, lixo adequado e prevenção de leptospirose.', link:'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/l/leptospirose/prevencao', colors:['#365314','#84cc16']},
  {title:'Resíduos Sólidos', author:'Semad Goiás', year:'Atualizado', cat:['gratis','oficial','meio-ambiente'], status:'Gratuito', type:'Página oficial', summary:'Informações sobre gestão de resíduos, redução de impactos e consumo sustentável.', link:'https://goias.gov.br/meioambiente/residuos-solidos/', colors:['#166534','#4ade80']},
  {title:'Cartilha de Coleta Seletiva', author:'Semad Goiás', year:'2024', cat:['gratis','oficial','meio-ambiente'], status:'Gratuito', type:'Cartilha', summary:'Orientações de educação ambiental sobre coleta seletiva para municípios.', link:'https://goias.gov.br/meioambiente/educacao-ambiental-cartilha-da-semad-traz-informacoes-sobre-coleta-seletiva/', colors:['#15803d','#86efac']},
  {title:'Guia de Compostagem Urbana', author:'Semad Goiás', year:'2025', cat:['gratis','oficial','meio-ambiente'], status:'Gratuito', type:'Guia', summary:'Conteúdo acessível sobre compostagem de resíduos orgânicos urbanos.', link:'https://goias.gov.br/meioambiente/semad-lanca-guia-de-compostagem-de-residuos-organicos-urbanos-para-municipios/', colors:['#3f6212','#a3e635']},
  {title:'Publicações de Educação Ambiental', author:'Ministério do Meio Ambiente', year:'Coleção', cat:['gratis','oficial','meio-ambiente'], status:'Gratuito', type:'Acervo', summary:'Acervo de publicações, cartilhas e materiais de educação ambiental do MMA.', link:'https://www.gov.br/mma/pt-br/centrais-de-conteudo/publicacoes/educacao-ambiental', colors:['#0f766e','#2dd4bf']},
  {title:'Programa Nacional de Educação Ambiental', author:'MMA / MEC', year:'2005', cat:['gratis','oficial','meio-ambiente'], status:'Gratuito', type:'PDF oficial', summary:'Documento base de políticas, princípios e ações de educação ambiental no Brasil.', link:'https://portal.mec.gov.br/dmdocuments/publicacao1.pdf', colors:['#047857','#34d399']},
  {title:'Vamos Cuidar do Brasil', author:'MEC', year:'2007', cat:['gratis','oficial','meio-ambiente'], status:'Gratuito', type:'PDF oficial', summary:'Conceitos e práticas em educação ambiental na escola e na comunidade.', link:'https://portal.mec.gov.br/index.php?Itemid=&gid=15842&option=com_docman&task=doc_download', colors:['#166534','#bbf7d0']},
  {title:'Panorama da Educação Ambiental', author:'MEC', year:'2001', cat:['gratis','oficial','meio-ambiente'], status:'Gratuito', type:'PDF', summary:'Material histórico sobre educação ambiental no ensino fundamental.', link:'https://portal.mec.gov.br/secad/arquivos/pdf/educacaoambiental/panorama.pdf', colors:['#065f46','#6ee7b7']},
  {title:'Inventário Turístico de Paraúna', author:'Goiás Turismo / Paraúna', year:'2025', cat:['gratis','oficial','cidade'], status:'Gratuito', type:'PDF regional', summary:'Inventário com atrativos naturais e culturais de Paraúna-GO.', link:'https://goias.gov.br/observatoriodoturismo/wp-content/uploads/sites/64/2025/08/Inventario-Turistico-de-Parauna_compressed.pdf', colors:['#854d0e','#facc15']},
  {title:'Primavera Silenciosa', author:'Rachel Carson', year:'1962', cat:['meio-ambiente'], status:'Livro físico/e-book', type:'Clássico', summary:'Obra clássica sobre impactos de substâncias tóxicas no ambiente e na saúde.', link:'https://www.amazon.com.br/Primavera-Silenciosa-Rachel-Carson/dp/857555235X', colors:['#166534','#65a30d']},
  {title:'A Última Criança na Natureza', author:'Richard Louv', year:'2005', cat:['meio-ambiente','pets'], status:'Livro físico/e-book', type:'Natureza', summary:'Livro sobre a importância do contato com a natureza para crianças e famílias.', link:'https://www.amazon.com.br/s?k=A+%C3%9Altima+Crian%C3%A7a+na+Natureza+Richard+Louv', colors:['#15803d','#bef264']},
  {title:'O Mundo Sem Nós', author:'Alan Weisman', year:'2007', cat:['meio-ambiente','cidade'], status:'Livro físico/e-book', type:'Meio ambiente', summary:'Reflexão sobre impacto humano em cidades, estruturas e ecossistemas.', link:'https://www.amazon.com.br/s?k=O+Mundo+Sem+N%C3%B3s+Alan+Weisman', colors:['#0f172a','#64748b']},
  {title:'A História das Coisas', author:'Annie Leonard', year:'2010', cat:['meio-ambiente'], status:'Livro físico/e-book', type:'Consumo', summary:'Mostra relações entre consumo, resíduos, produção e responsabilidade social.', link:'https://www.amazon.com.br/s?k=A+Hist%C3%B3ria+das+Coisas+Annie+Leonard', colors:['#7f1d1d','#ef4444']},
  {title:'Cradle to Cradle', author:'William McDonough e Michael Braungart', year:'2002', cat:['meio-ambiente'], status:'Livro físico/e-book', type:'Design sustentável', summary:'Ideias sobre produtos, resíduos e sistemas desenhados para reutilização.', link:'https://www.amazon.com.br/s?k=Cradle+to+Cradle+William+McDonough', colors:['#0f766e','#14b8a6']},
  {title:'Educação Ambiental: Princípios e Práticas', author:'Genebaldo Freire Dias', year:'Consultar edição', cat:['meio-ambiente'], status:'Livro físico', type:'Educação', summary:'Referência brasileira para educação ambiental e práticas de conscientização.', link:'https://www.amazon.com.br/s?k=Educa%C3%A7%C3%A3o+Ambiental+Princ%C3%ADpios+e+Pr%C3%A1ticas+Genebaldo+Freire+Dias', colors:['#14532d','#22c55e']},
  {title:'Sustentabilidade: o que é, o que não é', author:'Leonardo Boff', year:'2012', cat:['meio-ambiente'], status:'Livro físico/e-book', type:'Sustentabilidade', summary:'Discussão acessível sobre sustentabilidade como responsabilidade coletiva.', link:'https://www.amazon.com.br/s?k=Sustentabilidade+o+que+%C3%A9+o+que+n%C3%A3o+%C3%A9+Leonardo+Boff', colors:['#166534','#84cc16']},
  {title:'Saber Cuidar', author:'Leonardo Boff', year:'1999', cat:['meio-ambiente','organizacao'], status:'Livro físico/e-book', type:'Cuidado', summary:'Obra sobre ética do cuidado, responsabilidade e relação com a vida.', link:'https://www.amazon.com.br/s?k=Saber+Cuidar+Leonardo+Boff', colors:['#0f766e','#5eead4']},
  {title:'A Teia da Vida', author:'Fritjof Capra', year:'1996', cat:['meio-ambiente'], status:'Livro físico/e-book', type:'Ecologia', summary:'Introdução à visão sistêmica da vida e das relações ecológicas.', link:'https://www.amazon.com.br/s?k=A+Teia+da+Vida+Fritjof+Capra', colors:['#064e3b','#34d399']},
  {title:'A Vida Secreta das Árvores', author:'Peter Wohlleben', year:'2015', cat:['meio-ambiente'], status:'Livro físico/e-book', type:'Natureza', summary:'Livro de divulgação sobre árvores, florestas e conexão com a natureza.', link:'https://www.amazon.com.br/s?k=A+Vida+Secreta+das+%C3%81rvores+Peter+Wohlleben', colors:['#365314','#a3e635']},
  {title:'Cidades para Pessoas', author:'Jan Gehl', year:'2010', cat:['cidade','meio-ambiente'], status:'Livro físico', type:'Urbanismo', summary:'Discussão sobre cidades mais humanas, caminháveis e agradáveis para viver.', link:'https://www.amazon.com.br/s?k=Cidades+para+Pessoas+Jan+Gehl', colors:['#1e3a8a','#60a5fa']},
  {title:'Morte e Vida de Grandes Cidades', author:'Jane Jacobs', year:'1961', cat:['cidade'], status:'Livro físico/e-book', type:'Cidade', summary:'Clássico sobre vida urbana, segurança, ruas, vizinhança e planejamento.', link:'https://www.amazon.com.br/s?k=Morte+e+Vida+de+Grandes+Cidades+Jane+Jacobs', colors:['#312e81','#818cf8']},
  {title:'Cidade Caminhável', author:'Jeff Speck', year:'2012', cat:['cidade'], status:'Livro físico/e-book', type:'Urbanismo', summary:'Ideias sobre ruas melhores, mobilidade e qualidade de vida urbana.', link:'https://www.amazon.com.br/s?k=Cidade+Caminh%C3%A1vel+Jeff+Speck', colors:['#1d4ed8','#93c5fd']},
  {title:'A Mágica da Arrumação', author:'Marie Kondo', year:'2011', cat:['organizacao'], status:'Livro físico/e-book', type:'Organização', summary:'Livro popular sobre organização doméstica, descarte consciente e hábitos de ordem.', link:'https://www.amazon.com.br/s?k=A+M%C3%A1gica+da+Arruma%C3%A7%C3%A3o+Marie+Kondo', colors:['#be185d','#f9a8d4']},
  {title:'Menos é Mais', author:'Francine Jay', year:'2010', cat:['organizacao','meio-ambiente'], status:'Livro físico/e-book', type:'Minimalismo', summary:'Introduz a ideia de reduzir excessos, organizar melhor e consumir com consciência.', link:'https://www.amazon.com.br/s?k=Menos+%C3%A9+Mais+Francine+Jay', colors:['#7c3aed','#c4b5fd']},
  {title:'O Poder do Hábito', author:'Charles Duhigg', year:'2012', cat:['organizacao'], status:'Livro físico/e-book', type:'Hábitos', summary:'Ajuda a entender como hábitos se formam e como criar rotinas de cuidado e limpeza.', link:'https://www.amazon.com.br/s?k=O+Poder+do+H%C3%A1bito+Charles+Duhigg', colors:['#92400e','#fbbf24']}
];

function setupLibrary(){
  const grid = $('#bookGrid');
  const search = $('#bookSearch');
  const filters = $$('#bookFilters .filter');
  if(!grid) return;
  let active = 'todos';
  function render(){
    const q = (search?.value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    const list = books.filter(book => {
      const hay = `${book.title} ${book.author} ${book.summary} ${book.type} ${book.status} ${book.cat.join(' ')}`.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
      const filterOk = active === 'todos' || book.cat.includes(active);
      return filterOk && (!q || hay.includes(q));
    });
    grid.innerHTML = list.length ? list.map(bookTemplate).join('') : '<div class="no-results">Nenhum material encontrado. Tente outro termo ou filtro.</div>';
  }
  function bookTemplate(book){
    const tags = [book.status, book.type].filter(Boolean).map(t => `<span class="tag">${t}</span>`).join('');
    const [a,b] = book.colors || ['#0b5d35','#23b765'];
    return `<article class="book-card" data-cat="${book.cat.join(' ')}">
      <div class="book-cover" style="--cover-a:${a};--cover-b:${b}"><strong>${escapeHtml(book.title)}</strong><span>${escapeHtml(book.author)}</span></div>
      <div>
        <h3>${escapeHtml(book.title)}</h3>
        <p><strong>Criado por:</strong> ${escapeHtml(book.author)}</p>
        <p><strong>Publicado:</strong> ${escapeHtml(book.year)}</p>
        <div class="book-meta">${tags}</div>
        <p>${escapeHtml(book.summary)}</p>
        <a href="${book.link}" target="_blank" rel="noopener">Ver material ↗</a>
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
