(() => {
  'use strict';

  const WA_NUMBER = '573136108019';
  const MAX_QTY = 99;
  const CART_KEY = 'xploshot_cart_v1';

  /* =========================================================
     Catálogo real de XPLOSHOT
  ========================================================= */
  const PRODUCTS = [
    { id: 'nuevo-tamarindo', category: 'premium', isNew: true, name: 'Smirnoff Tamarindo', spirit: 'Vodka', price: 54900, img: 'p-premium-tamarindo',
      desc: 'Smirnoff con tamarindo y un toque picante en cada perla.' },

    { id: 'clasico-smirnoff', category: 'clasico', name: 'Smirnoff', spirit: 'Vodka', price: 49900, img: 'p-clasico-smirnoff',
      desc: 'Vodka Smirnoff, limpio y directo, en perlas listas para explotar.' },
    { id: 'clasico-guaropink', category: 'clasico', name: 'Guaro Pink', spirit: 'Aguardiente', price: 49900, img: 'p-clasico-guaropink',
      desc: 'Aguardiente con cereza: dulce e intenso.' },
    { id: 'clasico-bombonbum', category: 'clasico', name: 'Bombonbum', spirit: 'Vodka', price: 49900, img: 'p-clasico-bombonbum',
      desc: 'Vodka con sabor a bombón.' },
    { id: 'clasico-blueice', category: 'clasico', name: 'Blue Ice', spirit: 'Aguardiente', price: 49900, img: 'p-clasico-blueice',
      desc: 'Aguardiente con menta: fresco y helado.' },
    { id: 'clasico-nebuloso', category: 'clasico', name: 'Nebuloso', spirit: 'Ron-Menta', price: 49900, img: 'p-clasico-nebuloso',
      desc: 'Ron con menta: fresco y envolvente.' },
    { id: 'clasico-tropical', category: 'clasico', name: 'Tropical', spirit: 'Vodka', price: 49900, img: 'p-clasico-tropical',
      desc: 'Vodka con frutas tropicales.' },
    { id: 'clasico-maracumango', category: 'clasico', name: 'Maracumango', spirit: 'Tequila', price: 49900, img: 'p-clasico-maracumango',
      desc: 'Tequila con maracuyá y mango.' },
    { id: 'clasico-blueberry', category: 'clasico', name: 'Blueberry', spirit: 'Vodka', price: 49900, img: 'p-clasico-blueberry',
      desc: 'Vodka con arándanos.' },
    { id: 'clasico-sandia', category: 'clasico', name: 'Sandía', spirit: 'Whiskey', price: 49900, img: 'p-clasico-sandia',
      desc: 'Whiskey con sandía.' },

    { id: 'sinlicor-bombonbum', category: 'sinlicor', name: 'Bombonbum', spirit: 'Sin alcohol', price: 47900, img: 'p-sinlicor-bombonbum',
      desc: 'Sabor a bombón, sin alcohol.' },
    { id: 'sinlicor-chicle', category: 'sinlicor', name: 'Chicle', spirit: 'Sin alcohol', price: 47900, img: 'p-sinlicor-chicle',
      desc: 'Sabor a chicle, sin alcohol.' },
    { id: 'sinlicor-sandia', category: 'sinlicor', name: 'Sandía', spirit: 'Sin alcohol', price: 47900, img: 'p-sinlicor-sandia',
      desc: 'Sandía fresca, sin alcohol.' },
    { id: 'sinlicor-tropical', category: 'sinlicor', name: 'Tropical', spirit: 'Sin alcohol', price: 47900, img: 'p-sinlicor-tropical',
      desc: 'Frutas tropicales, sin alcohol.' },
    { id: 'sinlicor-maracumango', category: 'sinlicor', name: 'Maracumango', spirit: 'Sin alcohol', price: 47900, img: 'p-sinlicor-maracumango',
      desc: 'Maracuyá y mango, sin alcohol.' },
    { id: 'sinlicor-blueberry', category: 'sinlicor', name: 'Blueberry', spirit: 'Sin alcohol', price: 47900, img: 'p-sinlicor-blueberry',
      desc: 'Arándanos, sin alcohol.' },

    // Accesorios: precios confirmados por el cliente (2026-10-21)
    { id: 'accesorio-cuchara', category: 'accesorio', name: 'Cuchara perforada', meta: '6 colores', price: 1900, img: 'p-accesorio-cuchara',
      colors: ['Azul', 'Dorado', 'Negro', 'Tornasol', 'Oro rosa', 'Bronce'],
      desc: 'Para servir esferas moleculares con precisión: el perforado escurre el exceso de líquido.' },
    { id: 'accesorio-soportes', category: 'accesorio', name: 'Soportes Xploshot', meta: 'Transparente o azul', price: 65000, img: 'p-accesorio-soportes',
      colors: ['Transparente', 'Azul'],
      desc: 'Cucharitas especiales para servir y disfrutar tus shots moleculares en eventos y fiestas.' },
  ];

  const CATS = ['premium', 'clasico', 'sinlicor', 'accesorio'];
  const SHOT_CATS = ['premium', 'clasico', 'sinlicor'];
  const CAT_LABEL = { premium: 'Nuevo Premium', clasico: 'Clásicos', sinlicor: 'Sin licor', accesorio: 'Accesorios' };
  const CAT_ONE = { premium: 'Nuevo Premium', clasico: 'Clásico', sinlicor: 'Sin licor', accesorio: 'Accesorio' };
  // muestra de color en los selectores (el nombre siempre va escrito al lado)
  const SWATCH = {
    Azul: '#2F6BFF', Dorado: '#D4A537', Negro: '#15171C', 'Oro rosa': '#E7A99B', Bronce: '#A8693A',
    Tornasol: 'conic-gradient(#3D8BFF, #9B6BFF, #FF6FB5, #FFBE3D, #2FD4FF, #3D8BFF)',
    Transparente: 'rgba(255,255,255,.18)',
  };

  const MSG_INFO = 'Hola XPLOSHOT, quiero información sobre sus shots moleculares.';
  const MSG_HELP = 'Hola XPLOSHOT, ¿me ayudan a elegir un sabor?';
  // formulario de envío que usa el cliente en su WhatsApp, tal cual
  const SHIPPING_FORM = '🚚📦Datos para tu envío\n\n🔹Dirección:\n🔹Barrio:\n🔹Nombre:\n🔹Cel:\n🔹Transferencia o Efectivo:';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const fmt = (n) => '$' + n.toLocaleString('es-CO');
  const byId = (id) => PRODUCTS.find(p => p.id === id);
  const metaOf = (p) => p.meta || p.spirit;
  const isShot = (p) => SHOT_CATS.includes(p.category);
  const waLink = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  const isDesktop = () => window.matchMedia('(min-width:900px)').matches;
  // «3 frascos» si son solo shots; «3 productos» si hay accesorios
  const units = (lines) => {
    const n = lines.reduce((s, l) => s + l.qty, 0);
    const word = lines.every(l => isShot(l.p)) ? (n === 1 ? 'frasco' : 'frascos') : (n === 1 ? 'producto' : 'productos');
    return `${n} ${word}`;
  };
  const lineName = (p, color) => `${p.name} (${CAT_ONE[p.category]}${color ? `, ${color}` : ''})`;

  function orderMessage(lines) {
    const items = lines.map(({ p, qty, color }) => `• ${qty} × ${lineName(p, color)} — ${fmt(p.price * qty)}`).join('\n');
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const total = lines.reduce((n, l) => n + l.p.price * l.qty, 0);
    const totalLine = lines.length > 1 || count > 1 ? `\n\nTotal: ${units(lines)} — ${fmt(total)}` : '';
    return `Hola XPLOSHOT, quiero hacer este pedido:\n\n${items}${totalLine}\n\n${SHIPPING_FORM}`;
  }

  // selector de color con radios reales (teclado nativo); name único por lugar
  function colorPicker(p, name, selected) {
    const sel = selected && p.colors.includes(selected) ? selected : p.colors[0];
    return p.colors.map(c => `
      <label class="chip-color">
        <input type="radio" name="${name}" value="${c}"${c === sel ? ' checked' : ''}>
        <span class="chip-color__dot" style="background:${SWATCH[c] || 'transparent'}"></span><span>${c}</span>
      </label>`).join('');
  }

  let announceTimer;
  function announce(text) {
    const live = $('#toast');
    if (!live) return;
    live.textContent = '';
    clearTimeout(announceTimer);
    announceTimer = setTimeout(() => { live.textContent = text; }, 60);
  }

  /* ---------------------------------------------------------
     Capas (menú, carrito, ficha): foco, Escape, fondo inerte
  --------------------------------------------------------- */
  const BACKGROUND = () => [$('.skip'), $('#header'), $('#main'), $('.footer'), $('.wa-float'), $('#cartBar')].filter(Boolean);
  const stack = [];

  function syncLayers() {
    const open = stack.length > 0;
    BACKGROUND().forEach(el => { el.inert = open; });
    stack.forEach((layer, i) => { layer.el.inert = i !== stack.length - 1; });
    document.body.classList.toggle('no-scroll', open);
  }

  function openLayer(layer, trigger) {
    if (stack.includes(layer)) return;
    layer.returnTo = trigger || document.activeElement;
    stack.push(layer);
    layer.el.classList.add('is-open');
    if (layer.scrim) layer.scrim.classList.add('is-open');
    if (layer.toggle) layer.toggle.setAttribute('aria-expanded', 'true');
    syncLayers();
    const first = layer.focus && layer.focus();
    if (first) first.focus({ preventScroll: true });
  }

  function closeLayer(layer, { restore = true } = {}) {
    const i = stack.indexOf(layer);
    if (i === -1) return;
    stack.splice(i, 1);
    layer.el.classList.remove('is-open');
    layer.el.inert = true;
    if (layer.scrim) layer.scrim.classList.remove('is-open');
    if (layer.toggle) layer.toggle.setAttribute('aria-expanded', 'false');
    syncLayers();
    const back = layer.returnTo;
    if (restore && back && document.contains(back) && back.offsetParent !== null) back.focus({ preventScroll: true });
  }

  document.addEventListener('keydown', (e) => {
    if (!stack.length) return;
    const top = stack[stack.length - 1];
    if (e.key === 'Escape') { e.preventDefault(); closeLayer(top); return; }
    if (e.key !== 'Tab') return;
    // mantiene el foco dentro de la capa abierta
    const items = $$('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])', top.el)
      .filter(el => el.offsetParent !== null || el === document.activeElement);
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* ---------------------------------------------------------
     Menú móvil
  --------------------------------------------------------- */
  function initMenu() {
    const el = $('#mobileMenu');
    const toggle = $('#burgerToggle');
    if (!el || !toggle) return;
    const layer = { el, toggle, scrim: $('#scrim'), focus: () => $('#mobileMenuClose') };
    toggle.addEventListener('click', () => openLayer(layer, toggle));
    $('#mobileMenuClose').addEventListener('click', () => closeLayer(layer));
    layer.scrim.addEventListener('click', () => closeLayer(layer));
    $$('a', el).forEach(a => a.addEventListener('click', () => closeLayer(layer, { restore: false })));
  }

  /* ---------------------------------------------------------
     Carrito (localStorage, cantidades saneadas)
  --------------------------------------------------------- */
  // cada producto+color es una línea del carrito
  const keyOf = (id, color) => `${id}|${color || ''}`;
  function cleanColor(p, color) {
    if (!p.colors) return '';
    return p.colors.includes(color) ? color : p.colors[0];
  }

  function loadCart() {
    try {
      const parsed = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
      if (!Array.isArray(parsed)) return [];
      const merged = new Map();
      for (const item of parsed) {
        const p = item && byId(item.id);
        if (!p) continue;
        const q = Math.floor(Number(item.qty));
        if (!(q >= 1)) continue;
        const color = cleanColor(p, item.color);
        const key = keyOf(p.id, color);
        const prev = merged.get(key);
        merged.set(key, { id: p.id, color, qty: Math.min(MAX_QTY, (prev ? prev.qty : 0) + q) });
      }
      return [...merged.values()];
    } catch { return []; }
  }
  function saveCart(cart) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch { /* almacenamiento no disponible */ }
  }

  function initCart() {
    let cart = loadCart();
    let firstAddDone = false;

    const drawer = $('#cartDrawer');
    const toggle = $('#cartToggle');
    const layer = { el: drawer, toggle, scrim: $('#cartScrim'), focus: () => $('#cartClose') };
    const list = $('#cartList');

    const lines = () => cart.map(i => ({ p: byId(i.id), qty: i.qty, color: i.color || '', key: keyOf(i.id, i.color) })).filter(l => l.p);
    const findKey = (key) => cart.find(i => keyOf(i.id, i.color) === key);
    const rowOf = (key) => [...list.children].find(li => li.dataset.key === key);

    function render() {
      const ls = lines();
      const count = ls.reduce((n, l) => n + l.qty, 0);
      const total = ls.reduce((n, l) => n + l.p.price * l.qty, 0);

      const badge = $('#cartCount');
      badge.hidden = count === 0;
      badge.textContent = count;
      toggle.setAttribute('aria-label', count ? `Abrir carrito (${units(ls)})` : 'Abrir carrito');
      $('#cartQty').textContent = count ? `(${count})` : '';

      $('#cartEmpty').hidden = count > 0;
      $('#cartFoot').hidden = count === 0;
      $('#cartTotal').textContent = fmt(total);

      list.innerHTML = ls.map(({ p, qty, color, key }) => {
        const label = color ? `${p.name} ${color}` : p.name;
        const meta = p.category === 'sinlicor' ? 'Sin licor'
          : p.category === 'accesorio' ? `Accesorio · ${color}`
          : `${CAT_ONE[p.category]} · ${p.spirit}`;
        return `
        <li class="cart-item" data-key="${key}">
          <div class="cart-item__media"><img src="assets/img/${p.img}-sm.webp" alt="" width="64" height="64" loading="lazy"></div>
          <div>
            <p class="cart-item__name">${p.name}</p>
            <p class="cart-item__meta">${meta}</p>
            <div class="cart-item__row">
              <div class="stepper" role="group" aria-label="Cantidad de ${label}">
                <button type="button" data-act="minus" aria-label="Restar uno de ${label}" ${qty <= 1 ? 'disabled' : ''}><svg width="14" height="14" aria-hidden="true"><use href="#i-minus"/></svg></button>
                <span>${qty}</span>
                <button type="button" data-act="plus" aria-label="Sumar uno a ${label}" ${qty >= MAX_QTY ? 'disabled' : ''}><svg width="14" height="14" aria-hidden="true"><use href="#i-plus"/></svg></button>
              </div>
              <span class="cart-item__price">${fmt(p.price * qty)}</span>
              <button type="button" class="link cart-item__remove" data-act="remove" aria-label="Quitar ${label} del carrito">Quitar</button>
            </div>
          </div>
        </li>`;
      }).join('');

      const href = count ? waLink(orderMessage(ls)) : waLink(MSG_INFO);
      $('#cartCheckout').href = href;

      const bar = $('#cartBar');
      bar.hidden = count === 0;
      $('#cartBarCount').textContent = units(ls);
      $('#cartBarTotal').textContent = fmt(total);
      $('#cartBarGo').href = href;
      document.body.classList.toggle('has-cart', count > 0);
    }

    function persist() { saveCart(cart); render(); }

    function addItem(product, qty = 1, { btn, color } = {}) {
      const c = cleanColor(product, color);
      const item = findKey(keyOf(product.id, c));
      if (item) item.qty = Math.min(MAX_QTY, item.qty + qty);
      else cart.push({ id: product.id, color: c, qty: Math.min(MAX_QTY, qty) });
      persist();
      announce(`${lineName(product, c)} agregado al carrito`);
      if (btn) flashAdded(btn);
      if (!firstAddDone && isDesktop()) openLayer(layer, toggle);
      firstAddDone = true;
    }

    function changeQty(key, delta) {
      const item = findKey(key);
      if (!item) return;
      item.qty = Math.max(1, Math.min(MAX_QTY, item.qty + delta));
      persist();
    }

    function removeItem(key) {
      cart = cart.filter(i => keyOf(i.id, i.color) !== key);
      persist();
    }

    list.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-act]');
      const li = e.target.closest('.cart-item');
      if (!btn || !li) return;
      const key = li.dataset.key;
      const act = btn.dataset.act;
      const index = [...list.children].indexOf(li);
      if (act === 'plus') changeQty(key, 1);
      if (act === 'minus') changeQty(key, -1);
      if (act === 'remove') {
        const item = findKey(key);
        const p = item && byId(item.id);
        removeItem(key);
        if (p) announce(`${lineName(p, item.color)} quitado del carrito`);
      }
      // devuelve el foco al mismo control tras redibujar la lista
      const row = rowOf(key);
      const again = row && $(`button[data-act="${act}"]`, row);
      if (again && !again.disabled) again.focus();
      else if (act === 'remove') {
        const next = list.children[Math.min(index, list.children.length - 1)];
        (next ? $('button[data-act="remove"]', next) : $('#cartClose')).focus();
      } else {
        const other = row && $(`button[data-act="${act === 'plus' ? 'minus' : 'plus'}"]`, row);
        if (other) other.focus();
      }
    });

    toggle.addEventListener('click', () => openLayer(layer, toggle));
    $('#cartClose').addEventListener('click', () => closeLayer(layer));
    layer.scrim.addEventListener('click', () => closeLayer(layer));
    $('#cartContinue').addEventListener('click', () => closeLayer(layer));
    $('#cartBrowse').addEventListener('click', () => closeLayer(layer, { restore: false }));
    $('#cartBarOpen').addEventListener('click', (e) => openLayer(layer, e.currentTarget));

    window.addEventListener('storage', (e) => { if (e.key === CART_KEY) { cart = loadCart(); render(); } });

    render();
    return { addItem };
  }

  const addedTimers = new WeakMap();
  function flashAdded(btn) {
    clearTimeout(addedTimers.get(btn));
    if (!btn.dataset.label) btn.dataset.label = btn.innerHTML;
    btn.classList.add('is-added');
    btn.innerHTML = '<svg aria-hidden="true"><use href="#i-check"/></svg><span>Agregado</span>';
    addedTimers.set(btn, setTimeout(() => {
      btn.classList.remove('is-added');
      btn.innerHTML = btn.dataset.label;
    }, 1500));
  }

  /* ---------------------------------------------------------
     Catálogo por líneas
  --------------------------------------------------------- */
  const SIZES = '(min-width:1280px) 300px, (min-width:1100px) 26vw, (min-width:640px) 31vw, 47vw';

  function picture(p, { eager = false } = {}) {
    const alt = p.category === 'accesorio' ? `${p.name}, accesorio XPLOSHOT`
      : `XPLOSHOT ${p.name}${p.category === 'sinlicor' ? ' sin licor' : `, ${p.spirit}`}`;
    return `<picture>
      <source type="image/webp" srcset="assets/img/${p.img}-sm.webp 420w, assets/img/${p.img}.webp 800w" sizes="${SIZES}">
      <img src="assets/img/${p.img}-sm.jpg" srcset="assets/img/${p.img}-sm.jpg 420w, assets/img/${p.img}.jpg 800w" sizes="${SIZES}" width="800" height="800" loading="${eager ? 'eager' : 'lazy'}" alt="${alt}">
    </picture>`;
  }

  function addButton(p, extra = '') {
    return `<button type="button" class="btn btn--line btn--sm js-add${extra}" aria-label="Agregar ${p.name} (${CAT_ONE[p.category]}) al carrito"><svg aria-hidden="true"><use href="#i-plus"/></svg><span>Agregar</span></button>`;
  }

  function cardTemplate(p) {
    return `
      <article class="p-card" data-id="${p.id}">
        <button type="button" class="p-card__media js-open" aria-label="Ver detalle de ${p.name} (${CAT_ONE[p.category]})">${picture(p)}</button>
        <div class="p-card__body">
          <h4 class="p-card__name"><button type="button" class="js-open">${p.name}</button></h4>
          <p class="p-card__meta">${metaOf(p)}</p>
          <div class="p-card__buy">
            <span class="p-card__price">${fmt(p.price)}</span>
            ${addButton(p)}
          </div>
        </div>
      </article>`;
  }

  // Tarjeta ancha: 3 celdas (foto · texto · compra) sobre las mismas columnas
  // del catálogo. La usan el Nuevo Premium y los accesorios (con su color).
  function wideTemplate(p, { eager = false } = {}) {
    const colors = p.colors ? `
        <fieldset class="colors p-card__colors">
          <legend class="label">Color</legend>
          <div class="colors__list">${colorPicker(p, `color-${p.id}`)}</div>
        </fieldset>` : '';
    return `
      <article class="p-card p-card--wide" data-id="${p.id}">
        <button type="button" class="p-card__media js-open" aria-label="Ver detalle de ${p.name}">${picture(p, { eager })}</button>
        <div class="p-card__body">
          <h4 class="p-card__name"><button type="button" class="js-open">${p.name}</button></h4>
          <p class="p-card__meta">${metaOf(p)}</p>
          <p class="p-card__desc">${p.desc}</p>
        </div>${colors}
        <div class="p-card__buy">
          <span class="p-card__price">${fmt(p.price)}</span>
          ${addButton(p)}
          <button type="button" class="link js-open p-card__more">Ver detalle</button>
        </div>
      </article>`;
  }

  function helpTile() {
    return `
      <div class="grid-help">
        <p class="grid-help__k">¿No sabes cuál elegir?</p>
        <p>Te ayudamos por WhatsApp.</p>
        <a class="btn btn--line btn--sm" href="${waLink(MSG_HELP)}" target="_blank" rel="noopener" aria-label="Escribir por WhatsApp para elegir un sabor"><svg aria-hidden="true"><use href="#i-whatsapp"/></svg><span>Escribir</span></a>
      </div>`;
  }

  function initCatalog(cart, modal) {
    for (const cat of CATS) {
      const items = PRODUCTS.filter(p => p.category === cat);
      const grid = $(`[data-grid="${cat}"]`);
      if (!grid) continue;
      const wide = cat === 'premium' || cat === 'accesorio';
      grid.innerHTML = items.map(p => wide ? wideTemplate(p, { eager: cat === 'premium' }) : cardTemplate(p)).join('')
        + (!wide && items.length % 2 === 1 ? helpTile() : '');
      const prices = items.map(p => p.price);
      const min = Math.min(...prices);
      const samePrice = prices.every(v => v === min);
      const word = cat === 'accesorio' ? ['producto', 'productos'] : ['sabor', 'sabores'];
      // con un solo producto la tarjeta ya muestra el precio: el encabezado queda limpio
      const head = $(`[data-head-count="${cat}"]`);
      if (head) head.textContent = items.length === 1 ? '' : `${items.length} ${word[1]}`;
      const price = $(`[data-head-price="${cat}"]`);
      if (price) price.textContent = items.length === 1 ? '' : samePrice ? `${fmt(min)} c/u` : `desde ${fmt(min)}`;
      const jump = $(`[data-count="${cat}"]`);
      if (jump) jump.textContent = items.length;
      const unit = $(`[data-unit="${cat}"]`);
      if (unit) unit.textContent = ` ${items.length === 1 ? word[0] : word[1]}`;
      const jumpPrice = $(`[data-jump-price="${cat}"]`);
      if (jumpPrice) jumpPrice.textContent = samePrice ? fmt(min) : `desde ${fmt(min)}`;
    }
    const flavors = PRODUCTS.filter(isShot).length;
    const extras = PRODUCTS.length - flavors;
    const sub = $('#saboresSub');
    if (sub) sub.textContent = `${flavors} sabores${extras ? ` y ${extras} accesorios` : ''}`;

    const colorIn = (card) => { const r = card && $('input[type="radio"]:checked', card); return r ? r.value : ''; };
    $('#sabores').addEventListener('click', (e) => {
      const card = e.target.closest('.p-card');
      if (!card) return;
      const product = byId(card.dataset.id);
      if (!product) return;
      const add = e.target.closest('.js-add');
      if (add) { cart.addItem(product, 1, { btn: add, color: colorIn(card) }); return; }
      const open = e.target.closest('.js-open');
      if (open) modal.open(product, open, colorIn(card));
    });

    // «Desde» del hero: solo los frascos, no los accesorios
    const from = $('#fromPrice');
    if (from) from.textContent = fmt(Math.min(...PRODUCTS.filter(isShot).map(p => p.price)));
  }

  /* ---------------------------------------------------------
     Ficha de producto
  --------------------------------------------------------- */
  function initModal(cart) {
    const el = $('#productModal');
    const layer = { el, focus: () => $('#modalClose') };
    let state = { product: null, qty: 1, color: '' };
    const colorsBox = $('#modalColors');

    function sync() {
      const { product, qty, color } = state;
      $('#qtyValue').textContent = qty;
      $('#qtyMinus').disabled = qty <= 1;
      $('#qtyPlus').disabled = qty >= MAX_QTY;
      $('#modalBuyWa').href = waLink(orderMessage([{ p: product, qty, color }]));
    }

    function open(product, trigger, color) {
      const acc = product.category === 'accesorio';
      state = { product, qty: 1, color: cleanColor(product, color) };
      $('#modalCat').textContent = CAT_LABEL[product.category] + (product.isNew ? ' · Nuevo' : '');
      $('#modalName').textContent = product.name;
      $('#modalPrice').textContent = fmt(product.price);
      $('#modalDesc').textContent = product.desc;
      const rows = acc
        ? [['Colores', product.colors.join(', ')], ['Línea', CAT_LABEL[product.category]]]
        : [['Licor', product.spirit], ['Contenido', '25 perlas'], ['Línea', CAT_LABEL[product.category]]];
      $('#modalSpec').innerHTML = rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');
      colorsBox.hidden = !product.colors;
      $('.colors__list', colorsBox).innerHTML = product.colors ? colorPicker(product, 'modal-color', state.color) : '';
      $('#modalLegal').hidden = !isShot(product) || product.category === 'sinlicor';
      $('#modalMedia').innerHTML = `<picture><source type="image/webp" srcset="assets/img/${product.img}.webp"><img src="assets/img/${product.img}.jpg" width="800" height="800" alt="${acc ? product.name : `XPLOSHOT ${product.name}`}"></picture>`;
      sync();
      openLayer(layer, trigger);
    }

    colorsBox.addEventListener('change', (e) => {
      if (e.target.name !== 'modal-color') return;
      state.color = e.target.value;
      sync();
    });
    $('#modalClose').addEventListener('click', () => closeLayer(layer));
    el.addEventListener('click', (e) => { if (e.target === el) closeLayer(layer); });
    $('#qtyMinus').addEventListener('click', () => { state.qty = Math.max(1, state.qty - 1); sync(); });
    $('#qtyPlus').addEventListener('click', () => { state.qty = Math.min(MAX_QTY, state.qty + 1); sync(); });
    $('#modalAddCart').addEventListener('click', () => {
      const { product, qty, color } = state;
      closeLayer(layer);
      cart.addItem(product, qty, { color });
    });

    return { open };
  }

  /* ---------------------------------------------------------
     Enlaces de WhatsApp genéricos
  --------------------------------------------------------- */
  function initWaLinks() {
    $$('.js-wa').forEach(a => {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
      a.href = waLink(a.dataset.waMsg || MSG_INFO);
    });
  }

  /* ---------------------------------------------------------
     Burbuja de WhatsApp en celular: solo después del catálogo,
     para que no tape ningún botón «Agregar». Se mide con scroll
     (un IntersectionObserver no ve los saltos de las anclas).
  --------------------------------------------------------- */
  function initWaFloat() {
    const sabores = $('#sabores');
    if (!sabores) return;
    let ticking = false;
    const check = () => {
      ticking = false;
      const past = sabores.getBoundingClientRect().bottom < window.innerHeight * 0.6;
      document.body.classList.toggle('show-wa', past);
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(check); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    check();
  }

  /* ---------------------------------------------------------
     Línea activa en la columna lateral de Sabores (escritorio).
     Se mide en el scroll para que también acierte tras un salto de ancla.
  --------------------------------------------------------- */
  function initLineSpy() {
    const links = $$('.jump a[data-line]');
    const groups = links.map(a => $(a.getAttribute('href'))).filter(Boolean);
    if (!groups.length) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const line = (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 64) + 120;
      let current = -1;
      groups.forEach((g, i) => { if (g.getBoundingClientRect().top <= line) current = i; });
      const sabores = $('#sabores').getBoundingClientRect();
      if (sabores.bottom < line) current = -1;
      links.forEach((a, i) => {
        const on = i === current;
        a.classList.toggle('is-current', on);
        if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      });
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     Pantalla de carga: el logo se enciende dentro de un hexágono.
     Dura lo justo para verse (mín. 1,4 s) y nunca más de 2,1 s.
  --------------------------------------------------------- */
  function initLoader() {
    const root = document.documentElement;
    const loader = $('#loader');
    const done = () => { if (loader) loader.classList.add('is-hidden'); root.classList.add('is-ready'); };
    if (!loader) { done(); return; }
    const minMs = reduceMotion() ? 350 : 1400;
    const since = () => performance.now();
    const loaded = new Promise(r => (document.readyState === 'complete' ? r() : window.addEventListener('load', r, { once: true })));
    const minT = new Promise(r => setTimeout(r, Math.max(0, minMs - since())));
    const maxT = new Promise(r => setTimeout(r, Math.max(0, 2100 - since())));
    Promise.race([Promise.all([loaded, minT]), maxT]).then(done);
  }

  /* ---------------------------------------------------------
     Panal de hexágonos neón del fondo (como la barra LED de la
     marca). El panal es un solo trazo estático; los hexágonos
     encendidos son capas sueltas que solo animan su opacidad y
     cambian de celda cuando están apagados.
  --------------------------------------------------------- */
  function initHexBg() {
    const host = $('#hexbg');
    if (!host) return;
    const NS = 'http://www.w3.org/2000/svg';
    const grid = document.createElementNS(NS, 'svg');
    grid.setAttribute('class', 'hexbg__grid');
    const path = document.createElementNS(NS, 'path');
    grid.appendChild(path);
    host.appendChild(grid);

    let cells = [];
    let geo = { r: 34, w: 0 };
    const lit = [];
    const taken = new Set();
    const pickColor = () => { const n = Math.random(); return n < 0.55 ? '' : n < 0.85 ? 'is-blue' : 'is-violet'; };

    // Una celda está libre si en su centro y sus esquinas solo hay contenedores
    // (nada de texto, fotos ni tarjetas): así el brillo nunca queda detrás de algo que se lee.
    const STRUCT = /^(HTML|BODY|MAIN|SECTION|DIV|HEADER|ASIDE|FOOTER|UL|OL|LI|FIGURE|NAV|DL)$/;
    const BUSY = '.p-card, .step, .btn, .facts, .jump, .grid-help, .cart-bar, .wa-float, .header, .footer__legal';
    // Los títulos grandes se leen bien con un trazo fino detrás; el texto chico, los
    // botones y las fotos no.
    const BIG = 'h1, h2, .cat-group__head h3';
    function isFree(cx, cy) {
      const { r, w } = geo;
      const pts = [[cx, cy], [cx, cy - r * 0.6], [cx, cy + r * 0.6], [cx - w * 0.42, cy], [cx + w * 0.42, cy]];
      return pts.every(([x, y]) => {
        // la pantalla de carga tapa todo al inicio: se mira lo que hay debajo
        const el = document.elementsFromPoint(x, y).find(n => !n.closest('#loader'));
        if (!el || el === document.body || el === document.documentElement) return true;
        if (el.closest(BUSY)) return false;
        if (el.closest(BIG)) return true;
        if (el.tagName === 'MAIN' || el.tagName === 'SECTION' || el.classList.contains('container')) return true;
        return STRUCT.test(el.tagName) && !el.childNodes.length;
      });
    }

    function place(item) {
      if (item.cell != null) taken.delete(item.cell);
      item.cell = null;
      let i = -1;
      // ventana de 0 px (pestaña oculta): no hay celdas
      for (let t = 0; t < 60 && cells.length; t++) {
        const c = Math.floor(Math.random() * cells.length);
        if (!taken.has(c) && isFree(cells[c][0], cells[c][1])) { i = c; break; }
      }
      // sin celda libre (pasa en celular, casi todo es contenido): esta vuelta no se enciende
      item.el.classList.toggle('is-off', i < 0);
      if (i < 0) return;
      taken.add(i);
      item.cell = i;
      const [cx, cy] = cells[i];
      item.el.style.transform = `translate(${(cx - geo.w / 2).toFixed(1)}px, ${(cy - geo.r).toFixed(1)}px)`;
      item.el.classList.remove('is-blue', 'is-violet');
      const c = pickColor();
      if (c) item.el.classList.add(c);
    }

    function makeLit(isStatic) {
      const el = document.createElement('div');
      el.className = 'hexbg__lit' + (isStatic ? ' is-static' : '');
      el.innerHTML = '<svg aria-hidden="true"></svg>';
      host.appendChild(el);
      const item = { el, cell: null };
      if (!isStatic) {
        el.style.setProperty('--d', `${(3.8 + Math.random() * 2.6).toFixed(2)}s`);
        el.style.setProperty('--delay', `${(Math.random() * 5).toFixed(2)}s`);
        el.addEventListener('animationiteration', () => place(item));
      }
      lit.push(item);
      return item;
    }

    function build() {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const r = W < 640 ? 26 : 34;
      const w = Math.sqrt(3) * r;
      const rowH = 1.5 * r;
      geo = { r, w };
      const cols = Math.ceil(W / w) + 1;
      const rows = Math.ceil(H / rowH) + 1;
      let d = '';
      cells = [];
      const f = (n) => n.toFixed(1);
      for (let row = 0; row <= rows; row++) {
        for (let col = 0; col <= cols; col++) {
          const cx = col * w + (row % 2 ? w / 2 : 0);
          const cy = row * rowH;
          // solo celdas completas dentro de la pantalla pueden encenderse
          if (cx - w / 2 >= 0 && cx + w / 2 <= W && cy - r >= 0 && cy + r <= H) cells.push([cx, cy]);
          d += `M${f(cx)} ${f(cy - r)}L${f(cx + w / 2)} ${f(cy - r / 2)}L${f(cx + w / 2)} ${f(cy + r / 2)}L${f(cx)} ${f(cy + r)}L${f(cx - w / 2)} ${f(cy + r / 2)}L${f(cx - w / 2)} ${f(cy - r / 2)}Z`;
        }
      }
      path.setAttribute('d', d);
      // forma del hexágono encendido (un poco más chico que la celda)
      const s = 2;
      const pts = [[w / 2, s], [w - s, r / 2 + s / 2], [w - s, 1.5 * r - s / 2], [w / 2, 2 * r - s], [s, 1.5 * r - s / 2], [s, r / 2 + s / 2]]
        .map(p => p.map(n => n.toFixed(1)).join(',')).join(' ');
      const wanted = reduceMotion() ? 6 : (W < 640 ? 7 : 14);
      while (lit.length < wanted) makeLit(reduceMotion());
      while (lit.length > wanted) { const it = lit.pop(); taken.delete(it.cell); it.el.remove(); }
      taken.clear();
      lit.forEach(item => {
        item.cell = null;
        item.el.style.width = `${w.toFixed(1)}px`;
        item.el.style.height = `${(2 * r).toFixed(1)}px`;
        const svg = item.el.firstChild;
        svg.setAttribute('viewBox', `0 0 ${w.toFixed(1)} ${(2 * r).toFixed(1)}`);
        svg.innerHTML = `<polygon points="${pts}"/>`;
        place(item);
      });
    }

    build();

    // al bajar, el contenido pasa por debajo de los hexágonos (que están fijos):
    // el que quede detrás de algo se apaga hasta su siguiente vuelta
    let scrollTimer = null;
    window.addEventListener('scroll', () => {
      if (scrollTimer) return;
      scrollTimer = setTimeout(() => {
        scrollTimer = null;
        lit.forEach(item => {
          const isStatic = item.el.classList.contains('is-static');
          if (!isStatic && (item.cell == null || item.el.classList.contains('is-off'))) return;
          if (item.cell != null && isFree(cells[item.cell][0], cells[item.cell][1])) return;
          // los quietos (movimiento reducido) se mudan a otra celda libre; los demás se apagan
          if (isStatic) place(item); else item.el.classList.add('is-off');
        });
      }, 120);
    }, { passive: true });

    let resizeTimer;
    let lastW = window.innerWidth;
    let lastH = window.innerHeight;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        // en celular la barra del navegador cambia el alto al bajar: ignorar cambios chicos de alto
        if (window.innerWidth === lastW && Math.abs(window.innerHeight - lastH) < 120) return;
        lastW = window.innerWidth;
        lastH = window.innerHeight;
        build();
      }, 250);
    });
  }

  /* ---------------------------------------------------------
     Aparición al bajar: solo para lo que empieza fuera de pantalla,
     así nada visible al cargar (ni tras un salto de ancla) queda oculto.
  --------------------------------------------------------- */
  function initReveal() {
    if (!('IntersectionObserver' in window) || reduceMotion()) return;
    // los encabezados fijos de cada línea no se animan: son navegación
    const targets = $$('.sabores__head, .p-card, .grid-help, .serve__head, .step, .ig__head, .ig__grid li, .footer__grid > *');
    const fold = window.innerHeight * 0.92;
    const items = targets.filter(el => el.getBoundingClientRect().top > fold);
    items.forEach(el => el.classList.add('reveal'));
    const io = new IntersectionObserver((entries) => {
      let n = 0;
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        el.style.setProperty('--rd', `${Math.min(n++ * 60, 360)}ms`);
        el.classList.add('is-in');
        io.unobserve(el);
        // al terminar se devuelven sus transiciones propias (brillo al pasar el mouse)
        const clean = (ev) => { if (ev.propertyName !== 'opacity') return; el.classList.remove('reveal', 'is-in'); el.style.removeProperty('--rd'); el.removeEventListener('transitionend', clean); };
        el.addEventListener('transitionend', clean);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
    items.forEach(el => io.observe(el));
  }

  /* ---------------------------------------------------------
     Datos estructurados (desde el mismo catálogo)
  --------------------------------------------------------- */
  function injectStructuredData() {
    const base = location.href.split('#')[0].replace(/index\.html$/, '');
    const abs = (p) => new URL(p, base).href;
    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          name: 'XPLOSHOT',
          logo: abs('assets/img/icon-512.png'),
          sameAs: ['https://instagram.com/xploshot', 'https://tiktok.com/@xploshot', 'https://facebook.com/xploshot'],
          contactPoint: { '@type': 'ContactPoint', telephone: '+57 313 610 8019', contactType: 'sales', availableLanguage: 'es' },
        },
        {
          '@type': 'ItemList',
          name: 'Sabores XPLOSHOT',
          itemListElement: PRODUCTS.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'Product',
              name: `XPLOSHOT ${p.name}${p.category === 'sinlicor' ? ' sin licor' : ''}`,
              description: p.desc,
              image: abs(`assets/img/${p.img}.jpg`),
              brand: { '@type': 'Brand', name: 'XPLOSHOT' },
              category: CAT_LABEL[p.category],
              offers: { '@type': 'Offer', price: String(p.price), priceCurrency: 'COP', url: abs('#sabores') },
            },
          })),
        },
      ],
    };
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(data);
    document.head.appendChild(s);
  }

  /* ---------------------------------------------------------
     Inicio
  --------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    const year = $('#year');
    if (year) year.textContent = new Date().getFullYear();

    initLoader();
    initMenu();
    const cart = initCart();
    const modal = initModal(cart);
    initCatalog(cart, modal);
    // decorativo: va después de la tienda para que un fallo aquí nunca la deje vacía
    try { initHexBg(); } catch (e) { /* sin fondo animado */ }
    initWaLinks();
    initWaFloat();
    initLineSpy();
    initReveal();
    injectStructuredData();
  });
})();
