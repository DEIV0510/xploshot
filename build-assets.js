const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const RAW = path.join(__dirname, 'raw');
const OUT = path.join(__dirname, 'assets/img');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

async function saveBoth(pipeline, name, { jpgQ = 80, webpQ = 78 } = {}) {
  await pipeline.clone().webp({ quality: webpQ }).toFile(path.join(OUT, `${name}.webp`));
  await pipeline.clone().jpeg({ quality: jpgQ, mozjpeg: true }).toFile(path.join(OUT, `${name}.jpg`));
}

async function savePng(pipeline, name) {
  await pipeline.clone().webp({ quality: 92 }).toFile(path.join(OUT, `${name}.webp`));
  await pipeline.clone().png({ compressionLevel: 9 }).toFile(path.join(OUT, `${name}.png`));
}

function coverResize(input, width, height) {
  return sharp(input).resize({ width, height, fit: 'cover', position: 'attention' });
}

async function run() {
  /* ================= LOGO ================= */
  const wordmarkTrim = sharp(path.join(RAW, 'logo-wordmark.png')).trim({ threshold: 8 });
  await savePng(sharp(await wordmarkTrim.clone().resize({ width: 900 }).toBuffer()), 'logo');
  await savePng(sharp(await wordmarkTrim.clone().resize({ width: 340 }).toBuffer()), 'logo-sm');

  // Marca "gota": la O de SHOT ya es una esfera de vidrio que gotea -- es
  // literalmente "la gota del logo" que pide el brief. La recortamos del
  // wordmark en alta resolucion (region localizada a mano) para usarla
  // como elemento flotante decorativo y como base del favicon/app icon.
  const dropExtractBuf = await sharp(path.join(RAW, 'logo-wordmark.png'))
    .extract({ left: 1480, top: 1550, width: 800, height: 800 })
    .toBuffer();
  const dropTrimBuf = await sharp(dropExtractBuf).trim({ threshold: 8 }).toBuffer();
  await savePng(sharp(dropTrimBuf).resize({ width: 600 }), 'logo-drop');
  await savePng(sharp(dropTrimBuf).resize({ width: 220 }), 'logo-drop-sm');

  // App icon / favicon: la gota sobre fondo cuadrado azul-noche de marca
  const navy = { r: 4, g: 10, b: 26 };
  const dropForIcon = sharp(dropTrimBuf).resize({ width: 640, withoutEnlargement: true });
  const dropMeta = await dropForIcon.clone().metadata();
  const side = 900;
  const iconBuf = await dropForIcon
    .extend({
      top: Math.floor((side - dropMeta.height) / 2), bottom: Math.ceil((side - dropMeta.height) / 2),
      left: Math.floor((side - dropMeta.width) / 2), right: Math.ceil((side - dropMeta.width) / 2),
      background: { ...navy, alpha: 1 }
    })
    .flatten({ background: navy })
    .png()
    .toBuffer();
  await sharp(iconBuf).resize(512, 512).png().toFile(path.join(OUT, 'icon-512.png'));
  await sharp(iconBuf).resize(180, 180).png().toFile(path.join(OUT, 'apple-touch-icon.png'));
  await sharp(iconBuf).resize(32, 32).png().toFile(path.join(OUT, 'favicon-32.png'));
  await sharp(iconBuf).resize(16, 16).png().toFile(path.join(OUT, 'favicon-16.png'));

  /* ================= HERO ================= */
  await saveBoth(sharp(path.join(RAW, 'studio-icebucket2.jpg')).resize({ width: 1500 }), 'hero-main', { jpgQ: 82, webpQ: 80 });
  await saveBoth(sharp(path.join(RAW, 'studio-green-splash.jpg')).resize({ width: 1600 }), 'cta-bg', { jpgQ: 78, webpQ: 74 });
  await saveBoth(coverResize(path.join(RAW, 'studio-icebucket1.jpg'), 1400, 1050), 'destacado-bg', { jpgQ: 80, webpQ: 76 });

  /* ================= FLAVOR CARDS ================= */
  // Recorte comun de las 9 tarjetas de sabor generadas con la misma plantilla:
  // aisla la foto del frasco (sin el badge de nombre inferior).
  const CARD_CROP = { left: 240, top: 460, width: 600, height: 650 };
  const FLAVORS = [
    { n: 1, slug: 'maracumango' },
    { n: 2, slug: 'bombonbum' },
    { n: 3, slug: 'tropical' },
    { n: 4, slug: 'nebuloso' },
    { n: 5, slug: 'sandia' },
    { n: 6, slug: 'blueice' },
    { n: 7, slug: 'guaropink' },
    { n: 8, slug: 'blueberry' },
    { n: 9, slug: 'smirnoff' },
  ];
  for (const f of FLAVORS) {
    const src = path.join(RAW, `flavorcard-${f.n}.jpg`);
    const cropped = sharp(src).extract(CARD_CROP).resize({ width: 720 });
    await saveBoth(cropped, `flavor-${f.slug}`, { jpgQ: 82, webpQ: 78 });
  }
  // Premium (Smirnoff Tamarindo): mismo frasco base "smirnoff" -- el badge
  // "NUEVO PREMIUM" y el acento dorado en la tarjeta lo diferencian.
  const tamarindoBase = sharp(path.join(RAW, 'flavorcard-9.jpg')).extract(CARD_CROP).resize({ width: 720 });
  await saveBoth(tamarindoBase, 'flavor-tamarindo', { jpgQ: 82, webpQ: 78 });

  /* ================= PASOS (como funciona) ================= */
  await saveBoth(sharp(path.join(RAW, 'studio-red-macro.jpg')).resize({ width: 900 }), 'step-destapa', { jpgQ: 80 });
  await saveBoth(sharp(path.join(RAW, 'flavorcard-10.jpg')).resize({ width: 900 }), 'step-sirve', { jpgQ: 80 });
  await saveBoth(coverResize(path.join(RAW, 'macro-teal.jpg'), 900, 900), 'step-disfruta', { jpgQ: 80 });

  /* ================= MOMENTOS ================= */
  await saveBoth(coverResize(path.join(RAW, 'life-fogata1.jpg'), 800, 1000), 'moment-casa', { jpgQ: 78 });
  await saveBoth(coverResize(path.join(RAW, 'life-pool.jpg'), 800, 1000), 'moment-bebidas', { jpgQ: 78 });
  await saveBoth(coverResize(path.join(RAW, 'event-castle.jpg'), 800, 1000), 'moment-fiestas', { jpgQ: 78 });
  await saveBoth(coverResize(path.join(RAW, 'macro-red-fruit.jpg'), 800, 1000), 'moment-granizados', { jpgQ: 78 });

  /* ================= SOCIAL GRID ================= */
  await saveBoth(coverResize(path.join(RAW, 'ad-shotsnormales.png'), 700, 700), 'social-1', { jpgQ: 76 });
  await saveBoth(coverResize(path.join(RAW, 'ad-buenacompania.png'), 700, 700), 'social-2', { jpgQ: 76 });
  await saveBoth(coverResize(path.join(RAW, 'ad-parcheexplosivo.png'), 700, 700), 'social-3', { jpgQ: 76 });
  await saveBoth(coverResize(path.join(RAW, 'ad-comofunciona.png'), 700, 700), 'social-4', { jpgQ: 76 });

  console.log('OK -> assets generados en', OUT);
}

run().catch(e => { console.error(e); process.exit(1); });
