const menuToggle = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const searchToggles = document.querySelectorAll('[data-search-toggle]');
const searchPanel = document.querySelector('[data-search-panel]');
const searchInput = document.querySelector('[data-search-input]');
const searchResults = document.querySelector('[data-search-results]');

const searchItems = [
  { title: 'Películas', type: 'Programación', url: 'peliculas.html', keywords: 'peliculas cartelera festival thriller cine' },
  { title: 'Origen', type: 'Ficha de película', url: 'peliculainfo.html', keywords: 'origen inception christopher nolan sueños' },
  { title: 'Compra de entradas', type: 'Tienda', url: 'compra.html', keywords: 'entradas comprar ticket horario precio' },
  { title: 'Contacto', type: 'Información', url: 'contacto.html', keywords: 'contacto ubicacion malaga redes email' }
];

const movieDetails = {
  zodiac: {
    title: 'Zodiac',
    director: 'David Fincher',
    duration: '157 min',
    session: '18:00',
    image: 'img/zodiac.webp',
    description:
      'Investigacion, obsesion y tension periodistica alrededor de uno de los casos mas inquietantes del cine criminal.',
    synopsis:
      'Un dibujante, dos periodistas y varios detectives intentan seguir la pista del asesino del Zodiaco mientras el caso se vuelve cada vez mas ambiguo, mediatico y personal.',
    reasons: [
      'Una puesta en escena precisa que convierte cada pista en una fuente de tension.',
      'Un relato ideal para amantes del thriller basado en investigacion real.',
      'Perfecta para abrir debate sobre obsesion, miedo colectivo y verdad incompleta.',
    ],
    awards:
      'Reconocida como una de las obras modernas mas solidas de David Fincher dentro del thriller de investigacion.',
    curiosities:
      'La pelicula dedica mucho peso al proceso de busqueda, archivos y contradicciones, reforzando una sensacion de realismo poco habitual.',
  },
  psicosis: {
    title: 'Psicosis',
    director: 'Alfred Hitchcock',
    duration: '109 min',
    session: '19:15',
    image: 'img/psicosis2.jpg',
    description:
      'Un clasico imprescindible del suspense psicologico que cambio para siempre la forma de mirar el terror en pantalla.',
    synopsis:
      'Marion Crane llega al Motel Bates despues de tomar una decision impulsiva. Su encuentro con Norman Bates abre una historia de culpa, secreto y amenaza contenida.',
    reasons: [
      'Una referencia esencial para entender el lenguaje del suspense moderno.',
      'Su ritmo, montaje y uso de la musica siguen funcionando con enorme fuerza.',
      'Ideal para una sesion de festival centrada en atmosfera y tension psicologica.',
    ],
    awards:
      'Nominada a varios premios Oscar y considerada una pieza clave en la historia del cine de suspense.',
    curiosities:
      'Hitchcock pidio que el publico entrara puntual para proteger el impacto narrativo de la pelicula.',
  },
  seven: {
    title: 'Seven',
    director: 'David Fincher',
    duration: '127 min',
    session: '20:30',
    image: 'img/sevenfigure.jpg',
    description:
      'Un thriller oscuro y metodico donde dos detectives investigan una serie de crimenes marcados por los siete pecados capitales.',
    synopsis:
      'Somerset y Mills siguen el rastro de un asesino que convierte cada crimen en una declaracion moral. La investigacion avanza hacia una conclusion tan seca como inolvidable.',
    reasons: [
      'Una atmosfera visual reconocible, densa y muy coherente con su historia.',
      'Gran ejemplo de construccion de tension a traves del ritmo y el detalle.',
      'Funciona muy bien como pelicula central dentro de un ciclo de suspense.',
    ],
    awards:
      'Reconocida por su impacto visual, su montaje y su influencia en el thriller criminal contemporaneo.',
    curiosities:
      'Su final se ha convertido en uno de los desenlaces mas comentados del cine de los noventa.',
  },
  memento: {
    title: 'Memento',
    director: 'Christopher Nolan',
    duration: '113 min',
    session: '21:00',
    image: 'img/memnto1.jpg',
    description:
      'Una historia fragmentada sobre memoria, identidad y venganza que obliga al espectador a reconstruir la verdad paso a paso.',
    synopsis:
      'Leonard busca al responsable de la muerte de su esposa mientras sufre una condicion que le impide formar nuevos recuerdos. Notas, tatuajes y fotografias guian una investigacion cada vez mas inestable.',
    reasons: [
      'Su estructura narrativa convierte al espectador en parte activa del misterio.',
      'Es una gran pieza para hablar de montaje, punto de vista y confianza.',
      'Mantiene una identidad muy clara sin necesitar grandes artificios visuales.',
    ],
    awards:
      'Nominada al Oscar por guion original y montaje, y considerada una de las peliculas clave de Nolan.',
    curiosities:
      'La narracion combina escenas en color y blanco y negro para ordenar dos lineas temporales distintas.',
  },
  'taxi-driver': {
    title: 'Taxi Driver',
    director: 'Martin Scorsese',
    duration: '114 min',
    session: '22:15',
    image: 'img/taxidriver.jpg',
    description:
      'Un retrato urbano, incomodo y magnetico sobre soledad, violencia interior y desconexion social.',
    synopsis:
      'Travis Bickle recorre Nueva York como taxista nocturno mientras su aislamiento crece y su percepcion de la ciudad se vuelve cada vez mas extrema.',
    reasons: [
      'Una interpretacion central poderosa y llena de matices.',
      'Su fotografia nocturna construye una ciudad con identidad propia.',
      'Encaja muy bien en una programacion adulta de cine psicologico y urbano.',
    ],
    awards:
      'Ganadora de la Palma de Oro en Cannes y nominada a varios premios Oscar.',
    curiosities:
      'Su mezcla de voz en off, musica y ciudad nocturna la convirtio en una obra muy influyente.',
  },
  origen: {
    title: 'Origen',
    director: 'Christopher Nolan',
    duration: '148 min',
    session: '22:45',
    image: 'img/origenhero1.webp',
    description:
      'Un viaje de ciencia ficcion, accion y suspense donde las ideas se convierten en escenarios y los suenos tienen reglas propias.',
    synopsis:
      'Dom Cobb lidera un equipo capaz de entrar en los suenos de otras personas. Su mision mas arriesgada no consiste en robar una idea, sino en implantarla.',
    reasons: [
      'Una propuesta visual muy potente para una sesion de gran formato.',
      'Combina espectaculo, emocion y una estructura narrativa de capas.',
      'Es una pelicula atractiva tanto para publico general como para cinefilos.',
    ],
    awards:
      'Ganadora de cuatro premios Oscar y reconocida por su fotografia, sonido y efectos visuales.',
    curiosities:
      'Muchas de sus escenas de accion mezclan efectos practicos, decorados fisicos y posproduccion digital.',
  },
};

searchItems.splice(
  1,
  1,
  ...Object.entries(movieDetails).map(([slug, movie]) => ({
    title: movie.title,
    type: 'Ficha de pelicula',
    url: `peliculainfo.html?pelicula=${slug}`,
    keywords: `${movie.title} ${movie.director} thriller suspense festival cine`,
  }))
);

const renderResults = (query = '') => {
  if (!searchResults) return;
  const value = query.trim().toLowerCase();
  const filtered = searchItems.filter((item) => {
    const haystack = `${item.title} ${item.type} ${item.keywords}`.toLowerCase();
    return !value || haystack.includes(value);
  });

  searchResults.innerHTML = filtered.map((item) => `
    <a class="search-result" href="${item.url}">
      <strong>${item.title}</strong>
      <span>${item.type}</span>
    </a>
  `).join('');
};

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

if (searchToggles.length && searchPanel) {
  searchToggles.forEach((button) => {
    button.addEventListener('click', () => {
      const isOpen = searchPanel.classList.toggle('is-open');
      searchToggles.forEach((toggle) => toggle.setAttribute('aria-expanded', String(isOpen)));
      if (isOpen) {
        renderResults(searchInput?.value || '');
        setTimeout(() => searchInput?.focus(), 80);
      }
    });
  });
}

if (searchInput) {
  searchInput.addEventListener('input', (event) => renderResults(event.target.value));
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    mobileMenu?.classList.remove('is-open');
    searchPanel?.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    searchToggles.forEach((toggle) => toggle.setAttribute('aria-expanded', 'false'));
  }
});

const renderMovieDetail = () => {
  const titleElement = document.querySelector('[data-movie-title]');

  if (!titleElement) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const slug = params.get('pelicula') || 'origen';
  const movie = movieDetails[slug] || movieDetails.origen;

  document.title = `${movie.title} | FRAME Festival`;

  const setText = (selector, text) => {
    const element = document.querySelector(selector);
    if (element) {
      element.textContent = text;
    }
  };

  setText('[data-movie-title]', movie.title);
  setText('[data-movie-description]', movie.description);
  setText('[data-movie-director]', movie.director);
  setText('[data-movie-duration]', movie.duration);
  setText('[data-movie-session]', movie.session);
  setText('[data-movie-synopsis]', movie.synopsis);
  setText('[data-movie-awards]', movie.awards);
  setText('[data-movie-curiosities]', movie.curiosities);

  const image = document.querySelector('[data-movie-image]');
  if (image) {
    image.src = movie.image;
    image.alt = `Fotograma de ${movie.title}`;
  }

  const reasonsList = document.querySelector('[data-movie-reasons]');
  if (reasonsList) {
    reasonsList.innerHTML = movie.reasons.map((reason) => `<li>${reason}</li>`).join('');
  }

  const buyLink = document.querySelector('[data-movie-buy]');
  if (buyLink) {
    buyLink.href = `compra.html?pelicula=${encodeURIComponent(movie.title)}`;
  }
};

renderMovieDetail();

const purchaseForm = document.getElementById('ticketForm');
if (purchaseForm) {
  const quantityInput = document.getElementById('cantidad');
  const dateInput = document.getElementById('fecha');
  const priceOutput = document.getElementById('ticketTotal');
  const unitPrice = 12;
  const movieSelect = purchaseForm.elements.pelicula;
  const selectedMovie = new URLSearchParams(window.location.search).get('pelicula');

  if (selectedMovie && movieSelect) {
    const option = Array.from(movieSelect.options).find(
      (item) => item.value.toLowerCase() === selectedMovie.toLowerCase()
    );

    if (option) {
      movieSelect.value = option.value;
    }
  }

  const updateTotal = () => {
    const quantity = Number(quantityInput.value) || 1;
    if (priceOutput) priceOutput.textContent = `${quantity * unitPrice} €`;
  };

  const today = new Date();
  const minDate = today.toISOString().split('T')[0];
  if (dateInput) {
    dateInput.min = minDate;
    if (!dateInput.value) dateInput.value = minDate;
  }

  document.querySelectorAll('[data-quantity]').forEach((button) => {
    button.addEventListener('click', () => {
      const delta = Number(button.dataset.quantity);
      const next = Math.max(1, Math.min(10, (Number(quantityInput.value) || 1) + delta));
      quantityInput.value = String(next);
      updateTotal();
    });
  });

  purchaseForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = {
      quantity: quantityInput.value,
      date: dateInput.value,
      movie: purchaseForm.elements.pelicula.value,
      time: purchaseForm.elements.hora.value,
      total: priceOutput?.textContent || `${unitPrice} €`
    };
    sessionStorage.setItem('frameTicket', JSON.stringify(data));
    window.location.href = 'datospago.html';
  });

  updateTotal();
}

const summary = document.querySelector('[data-order-summary]');
if (summary) {
  const saved = JSON.parse(sessionStorage.getItem('frameTicket') || 'null');
  if (saved) {
    summary.innerHTML = `
      <p><strong>Película:</strong> ${saved.movie}</p>
      <p><strong>Día y hora:</strong> ${saved.date} · ${saved.time}</p>
      <p><strong>Entradas:</strong> ${saved.quantity}</p>
      <p><strong>Total:</strong> ${saved.total}</p>
    `;
  } else {
    summary.innerHTML = '<p><strong>Resumen:</strong> selecciona tus entradas antes de pagar.</p>';
  }
}

const paymentForm = document.getElementById('paymentForm');
if (paymentForm) {
  const setError = (name, message) => {
    const error = paymentForm.querySelector(`[data-error="${name}"]`);
    if (error) error.textContent = message;
  };

  const clearErrors = () => {
    paymentForm.querySelectorAll('[data-error]').forEach((node) => {
      node.textContent = '';
    });
  };

  paymentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    clearErrors();

    const name = paymentForm.elements.nombre.value.trim();
    const card = paymentForm.elements.tarjeta.value.replace(/\s+/g, '');
    const expiry = paymentForm.elements.fecha.value.trim();
    const cvv = paymentForm.elements.cvv.value.trim();
    let valid = true;

    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}$/.test(name)) {
      setError('nombre', 'Introduce el nombre del titular.');
      valid = false;
    }

    if (!/^[0-9]{13,19}$/.test(card)) {
      setError('tarjeta', 'La tarjeta debe tener entre 13 y 19 dígitos.');
      valid = false;
    }

    if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(expiry)) {
      setError('fecha', 'Usa el formato MM/AA.');
      valid = false;
    }

    if (!/^[0-9]{3,4}$/.test(cvv)) {
      setError('cvv', 'El CVV debe tener 3 o 4 dígitos.');
      valid = false;
    }

    if (!valid) return;

    const button = paymentForm.querySelector('button[type="submit"]');
    const spinner = document.getElementById('spinner');
    button.disabled = true;
    spinner?.classList.remove('d-none');

    setTimeout(() => {
      window.location.href = 'pago_correcto.html';
    }, 900);
  });
}
