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

const purchaseForm = document.getElementById('ticketForm');
if (purchaseForm) {
  const quantityInput = document.getElementById('cantidad');
  const dateInput = document.getElementById('fecha');
  const priceOutput = document.getElementById('ticketTotal');
  const unitPrice = 12;

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
