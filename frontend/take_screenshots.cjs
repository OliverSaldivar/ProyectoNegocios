const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '..', 'screenshots');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function run() {
  console.log('Iniciando captura de pantallas con Chrome...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1600,1000']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 1 });

  // 1. Pantalla 1: Catálogo Principal
  console.log('1. Capturando Catálogo Principal...');
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 3000)); // Esperar carga de modelos
  await page.screenshot({ path: path.join(outputDir, '01_catalogo_principal.png') });

  // 2. Pantalla 2: Ficha Técnica e Inspección 3D
  console.log('2. Abriendo Ficha Técnica 3D...');
  const fichaButtons = await page.$$('button');
  for (const btn of fichaButtons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('Ficha')) {
      await btn.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 3000));
  await page.screenshot({ path: path.join(outputDir, '02_ficha_tecnica_3d.png') });

  // 3. Pantalla 3: Modo Malla de Alambre (Wireframe)
  console.log('3. Activando Modo Wireframe...');
  const wireframeBtn = await page.$('.btn-wireframe, button');
  const allBtns = await page.$$('button');
  for (const btn of allBtns) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && (text.includes('Wireframe') || text.includes('Malla'))) {
      await btn.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(outputDir, '03_modo_wireframe.png') });

  // 4. Pantalla 4: Mensajería con el Creador
  console.log('4. Abriendo Mensajería...');
  for (const btn of allBtns) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('Contactar Creador')) {
      await btn.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(outputDir, '04_mensajeria_creador.png') });

  // Cerrar modales recargando
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  // 5. Pantalla 5: Folders y Portafolios de Creadores
  console.log('5. Capturando Folders de Creadores...');
  const navChips = await page.$$('.chip');
  for (const chip of navChips) {
    const text = await page.evaluate(el => el.textContent, chip);
    if (text && text.includes('Folders')) {
      await chip.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(outputDir, '05_folders_portafolios.png') });

  // 6. Pantalla 6: Mi Biblioteca
  console.log('6. Capturando Mi Biblioteca...');
  for (const chip of navChips) {
    const text = await page.evaluate(el => el.textContent, chip);
    if (text && text.includes('Biblioteca')) {
      await chip.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(outputDir, '06_mi_biblioteca.png') });

  // 7. Pantalla 7: Panel del Creador
  console.log('7. Capturando Panel del Creador...');
  for (const chip of navChips) {
    const text = await page.evaluate(el => el.textContent, chip);
    if (text && text.includes('Panel')) {
      await chip.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(outputDir, '07_panel_creador.png') });

  // 8. Pantalla 8: Carrito de Compras
  console.log('8. Capturando Carrito de Compras...');
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));
  const cartIconBtn = await page.$('.btn-icon');
  if (cartIconBtn) {
    await cartIconBtn.click();
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(outputDir, '08_carrito_checkout.png') });
  }

  await browser.close();
  console.log('¡Todas las capturas se generaron exitosamente en ' + outputDir + '!');
}

run().catch(err => {
  console.error('Error al capturar:', err);
  process.exit(1);
});
