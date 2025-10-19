// Configurar worker do PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
// Lista de revistas
const MAGAZINES = {
  "m1": { title: "Design & Future", pdf: "revistas/lorem1.pdf" },
  "m2": { title: "Ciência Hoje",    pdf: "revistas/lorem1.pdf" },
  "teste": { title: "PDF de Teste", pdf: "revistas/teste_paragrafos.pdf" }
};
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const mag = MAGAZINES[id];
const contentEl = document.getElementById('content');
const magTitle = document.getElementById('magTitle');
if(!mag){
  magTitle.textContent = 'Revista não encontrada';
  contentEl.innerHTML = '<p class="err">Revista não localizada. Verifique a URL (ex: ?id=m1) ou a variável MAGAZINES.</p>';
} else {
  magTitle.textContent = mag.title;
  loadAndRenderPDF(mag.pdf);
}
// Função principal
async function loadAndRenderPDF(url){
  try {
    contentEl.innerHTML = '<p class="loading">Carregando PDF e extraindo texto — aguarde...</p>';
    const pdf = await pdfjsLib.getDocument(url).promise;
    let allParagraphs = [];
    for(let pIndex = 1; pIndex <= pdf.numPages; pIndex++){
      const page = await pdf.getPage(pIndex);
      const textContent = await page.getTextContent({normalizeWhitespace: true});
      const items = textContent.items.map(it => {
        const t = it.transform || [1,0,0,1,0,0];
        return {
          str: it.str,
          x: t[4],
          y: t[5],
          width: it.width || 0
        };
      });
      if(items.length === 0) continue;
      // Agrupar por coordenada Y aproximada
      const roundY = y => Math.round(y * 10) / 10;
      const linesMap = new Map();
      items.forEach(it => {
        const yKey = roundY(it.y);
        if(!linesMap.has(yKey)) linesMap.set(yKey, []);
        linesMap.get(yKey).push(it);
      });
      const uniqueYs = Array.from(linesMap.keys());
      const lines = uniqueYs.map(yKey => {
        const rowItems = linesMap.get(yKey).sort((a,b)=> a.x - b.x);
        const text = rowItems.map(r => r.str).join(' ');
        const leftX = rowItems.length ? rowItems[0].x : 0;
        return { y: yKey, text: text.replace(/\s+/g,' ').trim(), left: leftX };
      }).filter(l => l.text.length > 0);
      // transformar linhas em parágrafos (função simplificada)
      const pageParagraphs = linesToParagraphs(lines);
      allParagraphs = allParagraphs.concat(pageParagraphs);
    }
    renderParagraphs(allParagraphs);
  } catch(err){
    console.error('Erro ao processar PDF', err);
    contentEl.innerHTML = `<p class="err">Erro ao carregar/parsear o PDF. Veja console (F12).</p>`;
  }
}
// Função simplificada para paragrafar
function linesToParagraphs(lines){
  if(!lines.length) return [];
  lines.sort((a,b)=> b.y - a.y); // topo -> baixo
  const paragraphs = [];
  let current = lines[0].text;
  for(let i=1; i<lines.length; i++){
    const line = lines[i];
    const prev = lines[i-1];
    const gapY = Math.abs(prev.y - line.y);
    const indentDiff = line.left - prev.left;
    if(gapY > 15 || indentDiff > 5){
      paragraphs.push(current.trim());
      current = line.text;
    } else {
      current += ' ' + line.text;
    }
  }
  if(current) paragraphs.push(current.trim());
  return paragraphs;
}
// Renderizar no DOM
function renderParagraphs(paragraphs){
  if(!paragraphs || paragraphs.length === 0){
    contentEl.innerHTML = '<p class="loading">Nenhum texto extraído do PDF.</p>';
    return;
  }
  const html = paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('');
  contentEl.innerHTML = html;
}
// Utilitários
function escapeHtml(str){
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}