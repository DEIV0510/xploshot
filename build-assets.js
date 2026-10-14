const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Genera SOLO las imagenes que usa el sitio. Fuentes en raw/ (gitignored).
const RAW = path.join(__dirname, 'raw');
const V2 = path.join(RAW, 'v2');            // material de la carpeta Xploshot2
const OUT = path.join(__dirname, 'assets/img');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

async function saveBoth(pipeline, name, { jpgQ = 80, webpQ = 78 } = {}) {
  await pipeline.clone().webp({ quality: webpQ }).toFile(path.join(OUT, `${name}.webp`));
  await pipeline.clone().jpeg({ quality: jpgQ, mozjpeg: true }).toFile(path.join(OUT, `${name}.jpg`));
}

async function run() {
  /* ================= LOGO ================= */
  // Se muestra a 40-56 px de alto: 240 px de ancho cubre pantallas 3x.
  const wordmark = await sharp(path.join(RAW, 'logo-wordmark.png')).trim({ threshold: 8 }).toBuffer();
  await sharp(wordmark).resize({ width: 240 }).webp({ quality: 90 }).toFile(path.join(OUT, 'logo-240.webp'));
  // pantalla de carga: el logo se muestra a ~220px, 480 cubre pantallas 2x
  await sharp(wordmark).resize({ width: 480 }).webp({ quality: 90 }).toFile(path.join(OUT, 'logo-480.webp'));

  // Favicon / app icon: la esfera que gotea (la O de SHOT) sobre el fondo de la marca.
  const dropBuf = await sharp(path.join(RAW, 'logo-wordmark.png'))
    .extract({ left: 1480, top: 1550, width: 800, height: 800 })
    .toBuffer();
  const dropTrim = await sharp(dropBuf).trim({ threshold: 8 }).toBuffer();
  // la gota suelta: adorno flotante junto a la foto del hero
  await sharp(dropTrim).resize({ width: 160 }).webp({ quality: 88 }).toFile(path.join(OUT, 'drop-160.webp'));
  const bg = { r: 5, g: 7, b: 14 };
  const drop = sharp(dropTrim).resize({ width: 640, withoutEnlargement: true });
  const dm = await drop.clone().metadata();
  const side = 900;
  const iconBuf = await drop
    .extend({
      top: Math.floor((side - dm.height) / 2), bottom: Math.ceil((side - dm.height) / 2),
      left: Math.floor((side - dm.width) / 2), right: Math.ceil((side - dm.width) / 2),
      background: { ...bg, alpha: 1 }
    })
    .flatten({ background: bg })
    .png()
    .toBuffer();
  await sharp(iconBuf).resize(512, 512).png().toFile(path.join(OUT, 'icon-512.png'));
  await sharp(iconBuf).resize(192, 192).png().toFile(path.join(OUT, 'icon-192.png'));
  await sharp(iconBuf).resize(180, 180).png().toFile(path.join(OUT, 'apple-touch-icon.png'));
  await sharp(iconBuf).resize(32, 32).png().toFile(path.join(OUT, 'favicon-32.png'));
  await sharp(iconBuf).resize(16, 16).png().toFile(path.join(OUT, 'favicon-16.png'));

  /* ================= HERO ================= */
  // Foto cenital de los 4 frascos en hielo, girada -90deg: quedan de izquierda
  // a derecha con las etiquetas derechas. 3:2; se muestra a ~700 px como maximo.
  const rot = await sharp(path.join(RAW, 'studio-icebucket1.jpg')).rotate(-90).toBuffer();
  const hero = sharp(rot).extract({ left: 11, top: 0, width: 1620, height: 1080 });
  await hero.clone().webp({ quality: 78 }).toFile(path.join(OUT, 'hero-shop.webp'));
  await hero.clone().resize({ width: 960 }).webp({ quality: 76 }).toFile(path.join(OUT, 'hero-shop-960.webp'));
  await hero.clone().resize({ width: 1200 }).jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(OUT, 'hero-shop.jpg'));
  // Vista previa al compartir el enlace (1200x630, los 4 frascos completos).
  await hero.clone().resize({ width: 1200 }).extract({ left: 0, top: 85, width: 1200, height: 630 })
    .jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(OUT, 'og-image.jpg'));

  /* ================= PRODUCTOS ================= */
  // Una foto cuadrada por producto, con el nombre del sabor pintado arriba.
  const PRODUCTS = [
    'premium-tamarindo',
    'clasico-smirnoff', 'clasico-guaropink', 'clasico-bombonbum', 'clasico-blueice', 'clasico-nebuloso',
    'clasico-tropical', 'clasico-maracumango', 'clasico-blueberry', 'clasico-sandia',
    'sinlicor-bombonbum', 'sinlicor-chicle', 'sinlicor-sandia', 'sinlicor-tropical', 'sinlicor-maracumango', 'sinlicor-blueberry',
  ];
  for (const slug of PRODUCTS) {
    const src = path.join(V2, `${slug}.png`);
    await saveBoth(sharp(src).resize({ width: 800 }), `p-${slug}`, { jpgQ: 80, webpQ: 76 });
    await saveBoth(sharp(src).resize({ width: 420 }), `p-${slug}-sm`, { jpgQ: 78, webpQ: 74 });
  }

  /* ================= PASOS (Destapa / Sirve / Disfruta) ================= */
  for (const step of ['destapa', 'sirve', 'disfruta']) {
    await saveBoth(sharp(path.join(V2, `step-${step}.png`)).resize({ width: 640 }), `step-${step}`, { jpgQ: 80, webpQ: 76 });
    await sharp(path.join(V2, `step-${step}.png`)).resize({ width: 360 }).webp({ quality: 74 }).toFile(path.join(OUT, `step-${step}-sm.webp`));
  }

  /* ================= GALERIA @xploshot (fotos reales, sin caras) ================= */
  const ig = async (src, crop, name) => {
    const oriented = await sharp(path.join(RAW, src)).rotate().toBuffer();
    await sharp(oriented).extract(crop).resize({ width: 600, height: 750, fit: 'cover' })
      .webp({ quality: 72 }).toFile(path.join(OUT, `${name}.webp`));
  };
  await ig('event-castle.jpg', { left: 0, top: 719, width: 4640, height: 5800 }, 'ig-1');
  await ig('event-icebucket-hex.jpg', { left: 0, top: 135, width: 1080, height: 1350 }, 'ig-2');
  await ig('life-toast2.jpg', { left: 108, top: 0, width: 864, height: 1080 }, 'ig-3');
  await ig('life-fogata1.jpg', { left: 0, top: 151, width: 3024, height: 3780 }, 'ig-4');

  console.log('OK -> assets generados en', OUT);
}

run().catch(e => { console.error(e); process.exit(1); });
