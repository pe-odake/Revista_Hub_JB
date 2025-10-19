const MAGAZINES = [
  {
    id: 'm1',
    title: 'Design & Future',
    issue: 'Vol. 13 — Out 2025',
    cover: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80',
    description: 'Tendências em design e experiências humanas.',
    pdf: 'revistas/lorem1.pdf'
  },
  {
    id: 'm2',
    title: 'Ciência Hoje',
    issue: 'Vol. 40 — Set 2025',
    cover: 'https://images.unsplash.com/photo-1509228627159-645a6f8b8f0f?w=1200&q=80',
    description: 'Descobertas recentes em tecnologia e ciência.',
    pdf: 'revistas/lorem1.pdf'
  },
  {
    id: 'teste',
    title: 'teste',
    issue: 'teste',
    cover: 'teste',
    description: 'teste',
    pdf: 'revistas/teste_paragrafos.pdf'
  }
];
const magList = document.getElementById('magList');
MAGAZINES.forEach(m => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="${m.cover}" alt="${m.title}">
    <div class="card-content">
      <h3>${m.title}</h3>
      <p>${m.description}</p>
      <small>${m.issue}</small><br>
      <button onclick="openMagazine('${m.id}')">Ler</button>
    </div>
  `;
  magList.appendChild(card);
});
function openMagazine(id) {
  window.location.href = 'revista.html?id=' + id;
}
document.getElementById('year').textContent = new Date().getFullYear();