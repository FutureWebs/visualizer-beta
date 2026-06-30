const capaInicio = document.getElementById('capa-inicio');
const capaInteractiva = document.getElementById('capa-interactiva');
const capaVideo = document.getElementById('capa-video');
const videoAdelante = document.getElementById('video-adelante');
const videoAtras = document.getElementById('video-atras');
const tooltip = document.getElementById('tooltip');

function iniciarRecorrido() {
  videoAtras.style.display = 'none';
  videoAdelante.style.display = 'block';
  videoAdelante.currentTime = 0;

  videoAdelante.play().then(() => {
    capaInicio.classList.add('oculta');
  }).catch(e => console.error("Error al reproducir:", e));
}

videoAdelante.onended = () => {
  capaInteractiva.classList.add('visible');
};

function volverAtras() {
  capaInteractiva.classList.remove('visible');

  videoAdelante.style.display = 'none';
  videoAtras.style.display = 'block';
  videoAtras.currentTime = 0;

  videoAtras.play().catch(e => console.error("Error al retroceder:", e));

  videoAtras.onended = () => {
    capaInicio.classList.remove('oculta');
  };
}

function mostrarTooltip(idDepto) {
  const data = departamentos[idDepto];
  if (!data) return;
  document.getElementById('tt-titulo').innerText = data.titulo;
  document.getElementById('tt-sub').innerText = data.subtitulo;
  tooltip.style.opacity = '1';

  document.querySelectorAll('.marcador').forEach(m => m.classList.remove('activo'));
  const markerMap = { depto_1: 'marcador-4a', depto_2: 'marcador-4b' };
  const el = document.getElementById(markerMap[idDepto]);
  if (el) el.classList.add('activo');
}

function moverTooltip(evento) {
  if (tooltip.style.opacity !== '1') return;
  const visorRect = document.getElementById('visor').getBoundingClientRect();
  let x = evento.clientX - visorRect.left + 15;
  let y = evento.clientY - visorRect.top - 12;
  if (x + 160 > visorRect.width) x = visorRect.width - 170;
  if (y < 10) y = evento.clientY - visorRect.top + 20;
  tooltip.style.left = x + 'px';
  tooltip.style.top = y + 'px';
}

function ocultarTooltip() {
  tooltip.style.opacity = '0';
  document.querySelectorAll('.marcador').forEach(m => m.classList.remove('activo'));
}

const modal = document.getElementById('modal-galeria');

function abrirGaleria(idDepto) {
  const data = departamentos[idDepto];
  if (!data) return;

  document.getElementById('modal-titulo').innerText = data.titulo;
  document.getElementById('modal-sub').innerText = data.subtitulo;
  document.getElementById('modal-desc').innerText = data.descripcion;

  const detalles = data.detalles;
  document.getElementById('det-piso').innerText = detalles.piso + '°';
  document.getElementById('det-habitaciones').innerText = detalles.habitaciones + ' hab';
  document.getElementById('det-banos').innerText = detalles.banos + ' baño' + (detalles.banos > 1 ? 's' : '');

  const contenedorFotos = document.getElementById('galeria-contenedor');
  contenedorFotos.innerHTML = '';

  data.galeria.forEach(rutaFoto => {
    const img = document.createElement('img');
    img.src = rutaFoto;
    img.alt = 'Foto de ' + data.titulo;
    img.loading = 'lazy';
    contenedorFotos.appendChild(img);
  });

  modal.classList.add('abierto');
}

function cerrarGaleria() {
  modal.classList.remove('abierto');
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') cerrarGaleria();
});

modal.addEventListener('click', function (e) {
  if (e.target === modal) cerrarGaleria();
});

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('abierta');
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}
