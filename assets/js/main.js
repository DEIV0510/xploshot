(() => {
  'use strict';

  const WA_NUMBER = '573136108019';

  /* =========================================================
     Catalogo — precios y sabores reales de XPLOSHOT
  ========================================================= */
  const PRODUCTS = [
    { id: 'nuevo-tamarindo', category: 'premium', badge: 'NUEVO', name: 'Smirnoff Tamarindo', spirit: 'Vodka', emoji: '🌶️', price: 54900, img: 'p-premium-tamarindo',
      desc: 'Vodka Smirnoff con tamarindo y un toque picante en cada perla.' },

    { id: 'clasico-smirnoff', category: 'clasico', name: 'Smirnoff', spirit: 'Vodka', price: 49900, img: 'p-clasico-smirnoff',
      desc: 'El clásico vodka Smirnoff, limpio y directo, en perlas listas para explotar.' },
    { id: 'clasico-guaropink', category: 'clasico', name: 'Guaro Pink', spirit: 'Aguardiente', price: 49900, img: 'p-clasico-guaropink',
      desc: 'Aguardiente con cereza: dulce, intenso y muy rosado.' },
    { id: 'clasico-bombonbum', category: 'clasico', name: 'Bombonbum', spirit: 'Vodka', price: 49900, img: 'p-clasico-bombonbum',
      desc: 'Vodka con sabor a bombón: la explosión más golosa.' },
    { id: 'clasico-blueice', category: 'clasico', name: 'Blue Ice', spirit: 'Aguardiente', price: 49900, img: 'p-clasico-blueice',
      desc: 'Aguardiente con menta: azul, fresco y helado.' },
    { id: 'clasico-nebuloso', category: 'clasico', name: 'Nebuloso', spirit: 'Ron-Menta', price: 49900, img: 'p-clasico-nebuloso',
      desc: 'Ron con menta: fresco y envolvente.' },
    { id: 'clasico-tropical', category: 'clasico', name: 'Tropical', spirit: 'Vodka', price: 49900, img: 'p-clasico-tropical',
      desc: 'Vodka con frutas tropicales: la perla más refrescante.' },
    { id: 'clasico-maracumango', category: 'clasico', name: 'Maracumango', spirit: 'Tequila', price: 49900, img: 'p-clasico-maracumango',
      desc: 'Tequila con maracuyá y mango.' },
    { id: 'clasico-blueberry', category: 'clasico', name: 'Blueberry', spirit: 'Vodka', price: 49900, img: 'p-clasico-blueberry',
      desc: 'Vodka con arándanos: dulce y perfecto para compartir.' },
    { id: 'clasico-sandia', category: 'clasico', name: 'Sandía', spirit: 'Whiskey', price: 49900, img: 'p-clasico-sandia',
      desc: 'Whiskey con sandía: un choque de sabores que sorprende.' },

    { id: 'sinlicor-bombonbum', category: 'sinlicor', name: 'Bombonbum', spirit: 'Sin alcohol', price: 47900, img: 'p-sinlicor-bombonbum',
      desc: 'Todo el sabor a bombón, sin una gota de alcohol.' },
    { id: 'sinlicor-chicle', category: 'sinlicor', name: 'Chicle', spirit: 'Sin alcohol', price: 47900, img: 'p-sinlicor-chicle',
      desc: 'Dulce y nostálgico: sabe a chicle de siempre.' },
    { id: 'sinlicor-sandia', category: 'sinlicor', name: 'Sandía', spirit: 'Sin alcohol', price: 47900, img: 'p-sinlicor-sandia',
      desc: 'Fresca y jugosa, sin alcohol.' },
    { id: 'sinlicor-tropical', category: 'sinlicor', name: 'Tropical', spirit: 'Sin alcohol', price: 47900, img: 'p-sinlicor-tropical',
      desc: 'Frutas tropicales, sin licor y con toda la explosión.' },
    { id: 'sinlicor-maracumango', category: 'sinlicor', name: 'Maracumango', spirit: 'Sin alcohol', price: 47900, img: 'p-sinlicor-maracumango',
      desc: 'Maracuyá y mango, en versión sin alcohol.' },
    { id: 'sinlicor-blueberry', category: 'sinlicor', name: 'Blueberry', spirit: 'Sin alcohol', price: 47900, img: 'p-sinlicor-blueberry',
      desc: 'Arándanos dulces, sin alcohol.' },
  ];

  const CAT_LABEL = { premium: 'Nuevo Premium', clasico: 'Clásico', sinlicor: 'Sin licor' };
  const CAT_NOTE = {
    premium: 'Smirnoff con tamarindo: lo más nuevo de XPLOSHOT.',
    clasico: 'Los 9 sabores clásicos de XPLOSHOT.',
    sinlicor: 'Toda la explosión de sabor, sin alcohol.',
  };

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const fmt = (n) => '$' + n.toLocaleString('es-CO');
  const byId = (id) => PRODUCTS.find(p => p.id === id);

  function waLink(msg) {
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  }

  /* ---------------------------------------------------------
     Loader
  --------------------------------------------------------- */
  function initLoader() {
    const loader = $('#loader');
    if (!loader) return;
    const hide = () => loader.classList.add('is-hidden');
    const minTimer = new Promise(res => setTimeout(res, 500));
    const loaded = new Promise(res => {
      if (document.readyState === 'complete') res();
      else window.addEventListener('load', res, { once: true });
    });
    Promise.race([Promise.all([minTimer, loaded]), new Promise(res => setTimeout(res, 1600))]).then(hide);
  }

  /* ---------------------------------------------------------
     Header scroll + reveal on scroll
  --------------------------------------------------------- */
  function initHeaderScroll() {
    const header = $('#header');
    if (!header) return;
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function initReveal() {
    const items = $$('.reveal');
    if (!('IntersectionObserver' in window) || !items.length) {
      items.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(el => io.observe(el));
  }

  /* ---------------------------------------------------------
     Mobile menu
  --------------------------------------------------------- */
  function initMobileMenu() {
    const burger = $('#burgerToggle');
    const menu = $('#mobileMenu');
    const scrim = $('#scrim');
    const closeBtn = $('#mobileMenuClose');
    if (!burger || !menu || !scrim) return;

    const isCartOpen = () => $('#cartDrawer').classList.contains('is-open');

    const open = () => {
      menu.classList.add('is-open');
      scrim.classList.add('is-open');
      burger.setAttribute('aria-expanded', 'true');
      document.body.classList.add('no-scroll');
    };
    const close = () => {
      menu.classList.remove('is-open');
      scrim.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      if (!isCartOpen()) document.body.classList.remove('no-scroll');
    };
    burger.addEventListener('click', () => menu.classList.contains('is-open') ? close() : open());
    closeBtn && closeBtn.addEventListener('click', close);
    scrim.addEventListener('click', () => { close(); });
    $$('#mobileMenu a').forEach(a => a.addEventListener('click', close));
    window.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  /* ---------------------------------------------------------
     Toast
  --------------------------------------------------------- */
  let toastTimer;
  function showToast(msg) {
    const toast = $('#toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2600);
  }

  /* ---------------------------------------------------------
     Cart (localStorage)
  --------------------------------------------------------- */
  const CART_KEY = 'xploshot_cart_v1';
  function loadCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed.filter(i => byId(i.id)) : [];
    } catch { return []; }
  }
  function saveCart(cart) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch { /* storage unavailable */ }
  }

  function mediaThumb(p) {
    return `<img src="assets/img/${p.img}-sm.webp" alt="" loading="lazy" width="420" height="420">`;
  }

  function initCart() {
    let cart = loadCart();

    const drawer = $('#cartDrawer');
    const scrim = $('#cartScrim');
    const list = $('#cartList');
    const empty = $('#cartEmpty');
    const foot = $('#cartFoot');
    const countBadge = $('#cartCount');
    const totalEl = $('#cartTotal');
    const checkoutLink = $('#cartCheckout');

    function persistAndRender() { saveCart(cart); render(); }

    function addItem(product, qty = 1, { silent = false } = {}) {
      const existing = cart.find(i => i.id === product.id);
      if (existing) existing.qty += qty;
      else cart.push({ id: product.id, qty });
      persistAndRender();
      if (!silent) {
        showToast(`${product.name} agregado al carrito 💥`);
        openCart();
      }
    }

    function changeQty(id, delta) {
      const item = cart.find(i => i.id === id);
      if (!item) return;
      item.qty = Math.max(1, item.qty + delta);
      persistAndRender();
    }
    function removeItem(id) {
      cart = cart.filter(i => i.id !== id);
      persistAndRender();
    }

    function render() {
      const totalQty = cart.reduce((n, i) => n + i.qty, 0);
      if (totalQty > 0) { countBadge.hidden = false; countBadge.textContent = totalQty; }
      else countBadge.hidden = true;

      empty.hidden = cart.length > 0;
      foot.hidden = cart.length === 0;

      let total = 0;
      list.innerHTML = cart.map(item => {
        const p = byId(item.id);
        if (!p) return '';
        total += p.price * item.qty;
        return `
        <li class="cart-item" data-id="${p.id}">
          <div class="cart-item__media">${mediaThumb(p)}</div>
          <div class="cart-item__info">
            <span class="cart-item__name">${p.name} · ${CAT_LABEL[p.category]}</span>
            <span class="cart-item__meta">${p.spirit}</span>
            <div class="cart-item__row">
              <div class="cart-item__qty">
                <button class="js-qty-minus" aria-label="Restar"><svg width="12" height="12"><use href="#i-minus"/></svg></button>
                <span>${item.qty}</span>
                <button class="js-qty-plus" aria-label="Sumar"><svg width="12" height="12"><use href="#i-plus"/></svg></button>
              </div>
              <span class="cart-item__price">${fmt(p.price * item.qty)}</span>
              <button class="cart-item__remove js-remove" aria-label="Quitar"><svg width="16" height="16"><use href="#i-trash"/></svg></button>
            </div>
          </div>
        </li>`;
      }).join('');

      totalEl.textContent = fmt(total);

      if (checkoutLink) {
        if (cart.length === 0) {
          checkoutLink.href = waLink('Hola, quiero pedir información sobre Xploshot 💥');
        } else {
          const lines = cart.map(i => {
            const p = byId(i.id);
            return `• ${p.name} (${CAT_LABEL[p.category]}) x${i.qty} — ${fmt(p.price * i.qty)}`;
          }).join('\n');
          const msg = `Hola, quiero hacer este pedido en XPLOSHOT 💥:\n${lines}\n\nTotal estimado: ${fmt(total)}\n¿Me confirman disponibilidad y forma de pago?`;
          checkoutLink.href = waLink(msg);
        }
      }
    }

    function openCart() {
      drawer.classList.add('is-open');
      scrim.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.classList.add('no-scroll');
    }
    function closeCart() {
      drawer.classList.remove('is-open');
      scrim.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      if (!$('#mobileMenu').classList.contains('is-open')) document.body.classList.remove('no-scroll');
    }

    $('#cartToggle').addEventListener('click', () => drawer.classList.contains('is-open') ? closeCart() : openCart());
    $('#cartClose').addEventListener('click', closeCart);
    scrim.addEventListener('click', closeCart);
    $('#cartContinue').addEventListener('click', closeCart);
    window.addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); });

    list.addEventListener('click', e => {
      const li = e.target.closest('.cart-item');
      if (!li) return;
      const id = li.dataset.id;
      if (e.target.closest('.js-qty-plus')) changeQty(id, 1);
      else if (e.target.closest('.js-qty-minus')) changeQty(id, -1);
      else if (e.target.closest('.js-remove')) removeItem(id);
    });

    render();
    return { addItem, openCart };
  }

  /* ---------------------------------------------------------
     Catalog render + filters
  --------------------------------------------------------- */
  // La foto ya trae el nombre del sabor arriba: la etiqueta NUEVO va abajo
  // para no taparlo.
  function cardMedia(p) {
    const sizes = '(min-width:1020px) 330px, (min-width:640px) 33vw, 50vw';
    return `<div class="p-card__media js-open" data-id="${p.id}">
        ${p.badge ? `<span class="p-card__tag">${p.badge} 🔥</span>` : ''}
        <picture>
          <source type="image/webp" srcset="assets/img/${p.img}-sm.webp 420w, assets/img/${p.img}.webp 800w" sizes="${sizes}">
          <img src="assets/img/${p.img}-sm.jpg" srcset="assets/img/${p.img}-sm.jpg 420w, assets/img/${p.img}.jpg 800w" sizes="${sizes}" alt="XPLOSHOT ${p.name}${p.category === 'sinlicor' ? ' sin licor' : ' — ' + p.spirit}" loading="lazy" width="800" height="800">
        </picture>
      </div>`;
  }

  function cardTemplate(p, { featured = false } = {}) {
    return `
      <article class="p-card${featured ? ' p-card--featured' : ''}" data-id="${p.id}">
        ${cardMedia(p)}
        <div class="p-card__body">
          <span class="p-card__cat">${CAT_LABEL[p.category]}</span>
          <h3 class="p-card__name">${p.name}</h3>
          <span class="p-card__spirit">${p.spirit}${p.emoji ? ' ' + p.emoji : ''}</span>
          ${featured ? `<p class="p-card__desc">${p.desc}</p>` : ''}
          <span class="p-card__price">${fmt(p.price)}</span>
          <div class="p-card__actions">
            <button class="btn btn--outline js-add" data-id="${p.id}">Agregar</button>
            <button class="btn btn--holo js-open" data-id="${p.id}">Lo quiero 💥</button>
          </div>
        </div>
      </article>`;
  }

  function initCatalog(cart) {
    const grid = $('#productGrid');
    const tabs = $$('.tab');
    const note = $('#catNote');
    let active = 'premium';

    function render() {
      const visible = PRODUCTS.filter(p => p.category === active);
      const featured = visible.length === 1;
      grid.classList.toggle('is-single', featured);
      grid.innerHTML = visible.map(p => cardTemplate(p, { featured })).join('');
      note.textContent = CAT_NOTE[active];
      $$('.p-card', grid).forEach((el, i) => {
        setTimeout(() => el.classList.add('is-visible'), i * 45);
      });
    }

    tabs.forEach(tab => tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      active = tab.dataset.filter;
      render();
    }));

    grid.addEventListener('click', e => {
      const card = e.target.closest('[data-id]');
      if (!card) return;
      const product = byId(card.dataset.id);
      if (!product) return;

      if (e.target.closest('.js-open')) {
        openProductModal(product, cart);
      } else if (e.target.closest('.js-add')) {
        cart.addItem(product, 1);
      }
    });

    render();
  }

  /* ---------------------------------------------------------
     Product modal
  --------------------------------------------------------- */
  let modalState = { product: null, qty: 1 };

  function modalMediaHtml(p) {
    return `<picture><source srcset="assets/img/${p.img}.webp" type="image/webp"><img src="assets/img/${p.img}.jpg" alt="XPLOSHOT ${p.name}" width="800" height="800"></picture>`;
  }

  function openProductModal(product, cart) {
    const modal = $('#productModal');
    modalState = { product, qty: 1 };

    $('#modalCat').textContent = CAT_LABEL[product.category] + (product.badge ? ' · ' + product.badge : '');
    $('#modalName').textContent = product.name;
    $('#modalSpirit').textContent = product.spirit + (product.emoji ? ' ' + product.emoji : '');
    $('#modalDesc').textContent = product.desc;
    $('#modalPrice').textContent = fmt(product.price);
    $('#qtyValue').textContent = '1';

    const media = $('#modalMedia');
    media.innerHTML = modalMediaHtml(product);

    updateModalWaLink();

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');

    $('#modalAddCart').onclick = () => {
      cart.addItem(product, modalState.qty);
      closeProductModal();
    };
  }

  function updateModalWaLink() {
    const { product, qty } = modalState;
    if (!product) return;
    const msg = `Hola, quiero pedir esto de XPLOSHOT 💥:\n• ${product.name} (${CAT_LABEL[product.category]}) x${qty} — ${fmt(product.price * qty)}\n\n¿Me confirman disponibilidad y forma de pago?`;
    $('#modalBuyWa').href = waLink(msg);
  }

  function closeProductModal() {
    const modal = $('#productModal');
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    if (!$('#cartDrawer').classList.contains('is-open') && !$('#mobileMenu').classList.contains('is-open')) {
      document.body.classList.remove('no-scroll');
    }
  }

  function initModal() {
    $('#modalClose').addEventListener('click', closeProductModal);
    $('#productModal').addEventListener('click', e => { if (e.target.id === 'productModal') closeProductModal(); });
    window.addEventListener('keydown', e => { if (e.key === 'Escape') closeProductModal(); });

    $('#qtyMinus').addEventListener('click', () => {
      modalState.qty = Math.max(1, modalState.qty - 1);
      $('#qtyValue').textContent = modalState.qty;
      updateModalWaLink();
    });
    $('#qtyPlus').addEventListener('click', () => {
      modalState.qty += 1;
      $('#qtyValue').textContent = modalState.qty;
      updateModalWaLink();
    });
  }

  /* ---------------------------------------------------------
     Generic WhatsApp links (data-wa-msg)
  --------------------------------------------------------- */
  function initWaLinks() {
    $$('.js-wa').forEach(a => {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
      a.href = waLink(a.dataset.waMsg || 'Hola, quiero pedir información sobre Xploshot 💥');
    });
  }

  /* ---------------------------------------------------------
     Init
  --------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    const yearEl = $('#year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    initLoader();
    initHeaderScroll();
    initMobileMenu();
    initWaLinks();
    initModal();

    const cart = initCart();
    initCatalog(cart);
    initReveal();
  });
})();
