const paneles = document.querySelectorAll('.imagenes');

paneles.forEach((panel) => {
  panel.addEventListener('click', () => {
    removerClaseActiva();
    panel.classList.add('activa');
  });
});

function removerClaseActiva() {
  paneles.forEach((panel) => {
    panel.classList.remove('activa');
  });
}
