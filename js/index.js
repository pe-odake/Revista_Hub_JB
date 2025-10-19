const MAGAZINES = [
  {
    id: '1',
    title: 'Integrar para não entregar violência e resistência dos povos indígenas na ditadura militar',
    cover: 'img/grupo1.jpg',
    description: 'Revista Grupo 1',
    pdf: 'revistas/grupo1.pdf'
  },
  {
    id: '2',
    title: 'Movimento Negro Unificado Luta, resistência e conquista por igualdade racial no Brasil',
    cover: 'img/grupo2.jpg',
    description: 'Revista Grupo 2',
    pdf: 'revistas/grupo2.pdf'
  },
  {
    id: '3',
    title: 'teste',
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
      <button onclick="openMagazine('${m.id}')">Ler</button>
    </div>
  `;
  magList.appendChild(card);
});
function openMagazine(id) {
  window.location.href = 'revista.html?id=' + id;
}
document.getElementById('year').textContent = new Date().getFullYear();