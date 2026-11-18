const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const screenshotsDir = 'C:\\Users\\OliverSE\\ProyectoNegocios\\screenshots';
const outPdf = 'C:\\Users\\OliverSE\\Downloads\\Presentacion_Ejecutiva_3DMarket.pdf';

function toBase64(filename) {
  const fullPath = path.join(screenshotsDir, filename);
  if (fs.existsSync(fullPath)) {
    const data = fs.readFileSync(fullPath);
    return `data:image/png;base64,${data.toString('base64')}`;
  }
  return '';
}

const img1 = toBase64('01_catalogo_principal.png');
const img2 = toBase64('02_ficha_tecnica_3d.png');
const img3 = toBase64('03_modo_wireframe.png');
const img4 = toBase64('04_mensajeria_creador.png');
const img5 = toBase64('05_folders_portafolios.png');
const img6 = toBase64('06_mi_biblioteca.png');
const img7 = toBase64('07_panel_creador.png');

const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: #0b0f19;
    color: #f1f5f9;
    -webkit-print-color-adjust: exact;
  }
  
  .slide {
    width: 13.333in;
    height: 7.5in;
    page-break-after: always;
    position: relative;
    padding: 0.5in 0.8in;
    background: #0b0f19;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  .badge {
    color: #38bdf8;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .badge::before {
    content: "●";
    color: #38bdf8;
  }
  
  .title {
    font-size: 26px;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 24px;
    letter-spacing: -0.5px;
  }
  
  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px;
    flex: 1;
  }
  
  .grid-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    flex: 1;
  }
  
  .card {
    background: #111827;
    border: 1px solid #1e293b;
    border-radius: 12px;
    padding: 24px;
    display: flex;
    flex-direction: column;
  }
  
  .card-title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .card ul {
    list-style: none;
  }
  .card ul li {
    font-size: 13.5px;
    line-height: 1.55;
    color: #cbd5e1;
    margin-bottom: 10px;
    position: relative;
    padding-left: 18px;
  }
  .card ul li::before {
    content: "•";
    color: #38bdf8;
    position: absolute;
    left: 0;
    font-weight: bold;
    font-size: 16px;
  }
  
  /* Slide con Screenshot */
  .screen-layout {
    display: grid;
    grid-template-columns: 8in 1fr;
    gap: 28px;
    flex: 1;
    align-items: stretch;
  }
  
  .screen-frame {
    background: #111827;
    border: 1.5px solid #1e293b;
    border-radius: 12px;
    padding: 8px;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .screen-frame img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 6px;
  }
  
  .screen-sidebar {
    background: #111827;
    border: 1px solid #1e293b;
    border-radius: 12px;
    padding: 24px;
    display: flex;
    flex-direction: column;
  }
  
  .screen-sidebar h3 {
    font-size: 18px;
    color: #38bdf8;
    margin-bottom: 14px;
    font-weight: 700;
  }
  
  .screen-sidebar ul li {
    font-size: 13.5px;
    color: #cbd5e1;
    line-height: 1.55;
    margin-bottom: 12px;
    padding-left: 20px;
    position: relative;
    list-style: none;
  }
  .screen-sidebar ul li::before {
    content: "✓";
    color: #22c55e;
    position: absolute;
    left: 0;
    font-weight: bold;
  }

  .cover-card {
    background: #111827;
    border: 1.5px solid #1e293b;
    border-radius: 16px;
    padding: 48px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
</head>
<body>

  <!-- SLIDE 1: PORTADA -->
  <div class="slide">
    <div class="cover-card">
      <div class="badge">Universidad Autónoma de Zacatecas • Negocios Electrónicos</div>
      <h1 style="font-size: 40px; font-weight: 800; color: #ffffff; margin: 12px 0 8px 0;">3DMarket: Plataforma de Comercio de Activos 3D</h1>
      <p style="font-size: 18px; color: #94a3b8; margin-bottom: 32px;">Inspección WebGL en Tiempo Real, Topología Wireframe, Folders de Creador y Licenciamiento Comercial</p>
      
      <div style="display: flex; gap: 40px; border-top: 1px solid #1e293b; padding-top: 24px; margin-top: auto;">
        <div>
          <span style="font-size: 12px; color: #38bdf8; font-weight: 700; text-transform: uppercase;">Entregable Final (MVP + MVE)</span>
          <p style="font-size: 15px; font-weight: 600; color: #f1f5f9; margin-top: 4px;">18 de Noviembre de 2026</p>
        </div>
        <div>
          <span style="font-size: 12px; color: #38bdf8; font-weight: 700; text-transform: uppercase;">Integrantes del Equipo</span>
          <p style="font-size: 15px; font-weight: 600; color: #f1f5f9; margin-top: 4px;">Oliver Saldívar & Cristian Berumen</p>
        </div>
        <div>
          <span style="font-size: 12px; color: #38bdf8; font-weight: 700; text-transform: uppercase;">Stack Tecnológico</span>
          <p style="font-size: 15px; font-weight: 600; color: #f1f5f9; margin-top: 4px;">React 18 • WebGL • Spring Boot 4 • MariaDB • Docker</p>
        </div>
      </div>
    </div>
  </div>

  <!-- SLIDE 2: PROBLEMÁTICA & SOLUCIÓN -->
  <div class="slide">
    <div class="badge">Documento de Negocio</div>
    <div class="title">Problemática de Negocio y Oportunidad en el Mercado 3D</div>
    <div class="grid-2">
      <div class="card">
        <div class="card-title" style="color: #ef4444;">❌ La Problemática del Sector</div>
        <ul>
          <li><strong>Compra a ciegas:</strong> Los compradores adquieren activos 3D solo viendo renders promocionales estilizados sin poder validar la malla real.</li>
          <li><strong>Costos excesivos en dólares:</strong> Marketplaces extranjeros retienen entre 40% y 50% de comisión por venta a los modeladores independientes.</li>
          <li><strong>Topología defectuosa:</strong> Descargas con millones de triángulos no optimizados que colapsan los motores de videojuegos (Unity / Unreal).</li>
          <li><strong>Ambigüedad en licencias:</strong> Falta de claridad sobre el uso permitido en proyectos comerciales independientes vs cinematografía.</li>
        </ul>
      </div>
      <div class="card">
        <div class="card-title" style="color: #22c55e;"> Propuesta de Valor 3DMarket</div>
        <ul>
          <li><strong>Visor WebGL Interactivo a 60 FPS:</strong> Inspección orbital 360°, zoom milimétrico y validación de animaciones antes de la compra sin software extra.</li>
          <li><strong>Auditoría Wireframe en 1 Clic:</strong> Alternancia instantánea a modo malla de alambre para auditar la densidad y limpieza poligonal.</li>
          <li><strong>Folders Temáticos de Creadores:</strong> Portafolios organizados por colecciones (Sci-Fi, Props) facilitando la venta en paquete (bundles).</li>
          <li><strong>Canal de Mensajería Directa:</strong> Comunicación inmediata comprador-creador para pedir cotizaciones o ajustes técnicos personalizados.</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- SLIDE 3: CANVAS DE NEGOCIO -->
  <div class="slide">
    <div class="badge">Estrategia de Negocio</div>
    <div class="title">Business Model Canvas (Lienzo Canva de Negocio)</div>
    <div class="grid-3" style="grid-template-rows: 1fr 1fr; gap: 16px;">
      <div class="card">
        <div class="card-title" style="color: #38bdf8;">Propuesta de Valor</div>
        <ul>
          <li>Visor 3D orbital en navegador sin plugins.</li>
          <li>Auditoría topológica en modo wireframe.</li>
          <li>Licencias comerciales claras con hash único.</li>
          <li>Redescarga permanente en 'Mi Biblioteca'.</li>
        </ul>
      </div>
      <div class="card">
        <div class="card-title" style="color: #38bdf8;">Segmentos de Clientes</div>
        <ul>
          <li>Estudios indie de videojuegos (Unity / Unreal).</li>
          <li>Animadores y diseñadores de entornos 3D.</li>
          <li>Arquitectos y renderistas de interiores.</li>
          <li>Modeladores 3D independientes (creadores).</li>
        </ul>
      </div>
      <div class="card">
        <div class="card-title" style="color: #38bdf8;">Fuentes de Ingresos</div>
        <ul>
          <li>Comisión por transacción del 12% por venta.</li>
          <li>Venta de licencias comerciales extendidas.</li>
          <li>Promoción destacada de activos en catálogo.</li>
          <li>Suscripciones Pro para creadores.</li>
        </ul>
      </div>
      <div class="card">
        <div class="card-title" style="color: #38bdf8;">Relación con Clientes</div>
        <ul>
          <li>Mensajería directa integrada en la plataforma.</li>
          <li>Sistema de valoraciones y reseñas técnicas.</li>
          <li>Autoservicio ágil en biblioteca de compras.</li>
        </ul>
      </div>
      <div class="card">
        <div class="card-title" style="color: #38bdf8;">Canales de Distribución</div>
        <ul>
          <li>Plataforma web responsive (PC y móvil).</li>
          <li>Perfiles públicos y folders de creadores por URL.</li>
          <li>Comunidades especializadas (Discord, ArtStation).</li>
        </ul>
      </div>
      <div class="card">
        <div class="card-title" style="color: #38bdf8;">Socios y Recursos Clave</div>
        <ul>
          <li>Red de modeladores y artistas 3D aliados.</li>
          <li>Infraestructura en Docker con MariaDB y Spring Boot.</li>
          <li>Repositorio y control de versiones en GitHub.</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- SLIDE 4: ARQUITECTURA TÉCNICA & NORMAS ISO -->
  <div class="slide">
    <div class="badge">Documento Técnico</div>
    <div class="title">Arquitectura Técnica y Estándares de Usabilidad (ISO 9241 & DCU)</div>
    <div class="grid-3">
      <div class="card">
        <div class="card-title" style="color: #38bdf8;"> Arquitectura Full-Stack</div>
        <ul>
          <li><strong>Frontend:</strong> React 18, Vite, @google/model-viewer, Lucide Icons.</li>
          <li><strong>WebGL 2.0:</strong> Renderizado PBR, rotación orbital y wireframe a 60 FPS.</li>
          <li><strong>Backend:</strong> Java 21, Spring Boot 4.x, Hibernate / JPA, REST APIs.</li>
          <li><strong>Base de Datos:</strong> MariaDB 11.4 con integridad transaccional ACID.</li>
          <li><strong>DevOps:</strong> Docker Compose orquestando Frontend (Nginx), Backend y DB.</li>
        </ul>
      </div>
      <div class="card">
        <div class="card-title" style="color: #22c55e;">🎯 Norma ISO 9241:11</div>
        <ul>
          <li><strong>Eficacia:</strong> Tasa de éxito &ge; 95% en inspección, compra y descarga de archivos binarios .glb.</li>
          <li><strong>Eficiencia:</strong> Regla de los 3 clics para acceder a la ficha técnica; carga WebGL en &lt; 5 segundos.</li>
          <li><strong>Satisfacción:</strong> Calificación SUS (System Usability Scale) &ge; 80/100 con interfaz gaming ergonómica de alto contraste.</li>
        </ul>
      </div>
      <div class="card">
        <div class="card-title" style="color: #a855f7;">🔄 ISO 9241:210 (DCU)</div>
        <ul>
          <li><strong>Diseño Centrado en el Usuario:</strong> Foco en dos perfiles clave (Desarrollador y Creador 3D).</li>
          <li><strong>Ciclo Iterativo de 4 Fases:</strong> Contexto de uso &rarr; Requisitos de usuario &rarr; Solución y prototipo &rarr; Evaluación con criterios DoD.</li>
          <li><strong>Validación Continua:</strong> Sprints semanales con entrega de software funcional ejecutable (MVP).</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- SLIDE 5: PRODUCT BACKLOG -->
  <div class="slide">
    <div class="badge">Metodología Scrum</div>
    <div class="title">Product Backlog Ágil: 27 Historias de Usuario (114 Story Points)</div>
    <div class="grid-3">
      <div class="card">
        <div class="card-title" style="color: #22c55e;">Sprint 1 (31 SP) - Core 3D</div>
        <ul>
          <li><strong>HU-01:</strong> Cuadrícula responsiva de modelos 3D.</li>
          <li><strong>HU-02:</strong> Búsqueda reactiva con debounce.</li>
          <li><strong>HU-03:</strong> Filtros temáticos por categorías.</li>
          <li><strong>HU-04:</strong> Filtro por rango poligonal.</li>
          <li><strong>HU-07:</strong> Visor WebGL orbital 360°.</li>
          <li><strong>HU-08:</strong> Modo Wireframe / Malla.</li>
          <li><strong>HU-10:</strong> Ficha técnica (polígonos/vértices).</li>
          <li><strong>HU-26/27:</strong> API REST y sanitización UUID.</li>
        </ul>
      </div>
      <div class="card">
        <div class="card-title" style="color: #3b82f6;">Sprint 2 (37 SP) - Creadores</div>
        <ul>
          <li><strong>HU-09:</strong> Reproductor de animación Play/Pause.</li>
          <li><strong>HU-11:</strong> Autenticación con roles (Cliente/Creador).</li>
          <li><strong>HU-13/14:</strong> Perfil público de creador 3D.</li>
          <li><strong>HU-15:</strong> Folders temáticos de trabajo.</li>
          <li><strong>HU-16:</strong> Modelos destacados en carpetas.</li>
          <li><strong>HU-17:</strong> Carga multipart de modelos .glb.</li>
          <li><strong>HU-19:</strong> Edición y gestión de activos.</li>
          <li><strong>HU-12:</strong> Recuperación de contraseñas.</li>
        </ul>
      </div>
      <div class="card">
        <div class="card-title" style="color: #a855f7;">Sprint 3 (46 SP) - Comercio</div>
        <ul>
          <li><strong>HU-20:</strong> Carrito de compras persistente.</li>
          <li><strong>HU-21:</strong> Checkout y generación de licencias.</li>
          <li><strong>HU-22:</strong> 'Mi Biblioteca' con historial.</li>
          <li><strong>HU-23:</strong> Descarga directa segura de .glb.</li>
          <li><strong>HU-24:</strong> Mensajería comprador-creador.</li>
          <li><strong>HU-25:</strong> Reseñas técnicas con estrellas.</li>
          <li><strong style="color: #22c55e;">Estado MVP: 25 HUs completadas y funcionales en código.</strong></li>
        </ul>
      </div>
    </div>
  </div>

  <!-- SLIDE 6: PANTALLA 1 - CATÁLOGO -->
  <div class="slide">
    <div class="badge">Demostración del MVP + MVE</div>
    <div class="title">Pantalla 1: Catálogo Dinámico y Búsqueda Reactiva</div>
    <div class="screen-layout">
      <div class="screen-frame"><img src="${img1}"></div>
      <div class="screen-sidebar">
        <h3>Exploración Rápida de Inventario</h3>
        <ul>
          <li>Renderizado dinámico de tarjetas con miniatura interactiva 3D.</li>
          <li>Búsqueda instantánea por nombre y descripción técnica con debounce.</li>
          <li>Chips de categorías temáticas: Personajes, Props, Vehículos, Arquitectura.</li>
          <li>Filtro ergonómico por poligonaje (Low Poly vs Mid/High Poly).</li>
          <li>Indicadores visibles de precio en USD, estrellas de valoración y licencias.</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- SLIDE 7: PANTALLA 2 - FICHA TÉCNICA -->
  <div class="slide">
    <div class="badge">Demostración del MVP + MVE</div>
    <div class="title">Pantalla 2: Ficha Técnica e Inspección Orbital 360°</div>
    <div class="screen-layout">
      <div class="screen-frame"><img src="${img2}"></div>
      <div class="screen-sidebar">
        <h3>Validación WebGL sin Software Extra</h3>
        <ul>
          <li>Visor WebGL 2.0 a pantalla amplia mediante componente &lt;model-viewer&gt;.</li>
          <li>Controles orbitales de rotación en 360°, zoom milimétrico y paneo táctil.</li>
          <li>Métricas técnicas exactas: número de polígonos, recuento de vértices, rigging y animaciones.</li>
          <li>Materiales PBR reflectantes calculados en tiempo real con iluminación HDR.</li>
          <li>Acceso directo a carrito y botón 'Contactar Creador'.</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- SLIDE 8: PANTALLA 3 - WIREFRAME -->
  <div class="slide">
    <div class="badge">Demostración del MVP + MVE</div>
    <div class="title">Pantalla 3: Auditoría de Topología (Modo Wireframe / Malla)</div>
    <div class="screen-layout">
      <div class="screen-frame"><img src="${img3}"></div>
      <div class="screen-sidebar">
        <h3>Auditoría Poligonal en Tiempo Real</h3>
        <ul>
          <li>Switch en 1 clic entre renderizado PBR final y Modo Malla de Alambre.</li>
          <li>Permite al desarrollador evaluar la densidad de triángulos y flujo de aristas.</li>
          <li>Garantiza que el activo esté optimizado antes de integrarlo en Unity o Unreal.</li>
          <li>Cumple la norma ISO 9241:11 al brindar transparencia total al comprador.</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- SLIDE 9: PANTALLA 4 - MENSAJERÍA -->
  <div class="slide">
    <div class="badge">Demostración del MVP + MVE</div>
    <div class="title">Pantalla 4: Canal de Mensajería Directa Cliente-Creador</div>
    <div class="screen-layout">
      <div class="screen-frame"><img src="${img4}"></div>
      <div class="screen-sidebar">
        <h3>Comunicación Inmediata de Negocio</h3>
        <ul>
          <li>Canal de chat bidireccional integrado directamente en la ficha del modelo.</li>
          <li>Permite solicitar cotizaciones para proyectos a medida o adaptaciones de formato.</li>
          <li>Resolución inmediata de dudas técnicas (compatibilidad de rigs o texturas).</li>
          <li>Fortalece la retención y confianza de la comunidad de artistas 3D.</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- SLIDE 10: PANTALLA 5 - FOLDERS -->
  <div class="slide">
    <div class="badge">Demostración del MVP + MVE</div>
    <div class="title">Pantalla 5: Folders de Trabajo y Portafolios de Creadores</div>
    <div class="screen-layout">
      <div class="screen-frame"><img src="${img5}"></div>
      <div class="screen-sidebar">
        <h3>Vitrinas Profesionales Organizadas</h3>
        <ul>
          <li>Agrupación de modelos por proyectos temáticos ('Sci-Fi & Espacio', 'Props').</li>
          <li>Muestra el perfil del modelador, biografía y cantidad de activos asociados.</li>
          <li>Permite a los estudios explorar el estilo coherente de un mismo autor.</li>
          <li>Facilita la compra en paquete (bundles) de colecciones completas.</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- SLIDE 11: PANTALLA 6 - MI BIBLIOTECA -->
  <div class="slide">
    <div class="badge">Demostración del MVP + MVE</div>
    <div class="title">Pantalla 6: 'Mi Biblioteca' y Redescarga Permanente de .GLB</div>
    <div class="screen-layout">
      <div class="screen-frame"><img src="${img6}"></div>
      <div class="screen-sidebar">
        <h3>Gestión de Compras y Licencias</h3>
        <ul>
          <li>Espacio privado donde el cliente consulta todos los modelos adquiridos.</li>
          <li>Generación y visualización del número de Licencia Comercial Oficial.</li>
          <li>Botón de descarga directa permanente del archivo binario .glb.</li>
          <li>Arquitectura segura que protege la propiedad intelectual de los modeladores.</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- SLIDE 12: PANTALLA 7 - PANEL DEL CREADOR -->
  <div class="slide">
    <div class="badge">Demostración del MVP + MVE</div>
    <div class="title">Pantalla 7: Panel del Creador y Publicación Multipart</div>
    <div class="screen-layout">
      <div class="screen-frame"><img src="${img7}"></div>
      <div class="screen-sidebar">
        <h3>Métricas de Ventas y Carga Segura</h3>
        <ul>
          <li>Métricas clave de negocio: Total de ingresos ($ USD), ventas y valoración promedio.</li>
          <li>Formulario de subida de modelos 3D (.glb) con metadatos técnicos y precio.</li>
          <li>Servicio backend de sanitización con UUIDs aleatorios y validación MIME.</li>
          <li>Gestión y edición rápida de activos publicados.</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- SLIDE 13: CONCLUSIONES -->
  <div class="slide">
    <div class="badge">Cierre y Evaluación</div>
    <div class="title">Conclusiones del Proyecto y Hoja de Ruta Futura</div>
    <div class="grid-2">
      <div class="card">
        <div class="card-title" style="color: #22c55e;">🎯 Logros Clave del MVP (18 de Noviembre)</div>
        <ul>
          <li><strong>Plataforma Full-Stack Funcional:</strong> Dockerizada con React 18, Spring Boot 4 y MariaDB 11.</li>
          <li><strong>25 Historias de Usuario Completadas:</strong> Cumpliendo el 100% de requisitos 'Must Have' del Product Backlog.</li>
          <li><strong>Cumplimiento Riguroso de Normas:</strong> ISO 9241:11 (usabilidad medida en eficacia, eficiencia y satisfacción) e ISO 9241:210 (DCU).</li>
          <li><strong>Repositorio Git Público en Producción:</strong> Código limpio y trazable en GitHub (OliverSaldivar/ProyectoNegocios).</li>
        </ul>
      </div>
      <div class="card">
        <div class="card-title" style="color: #38bdf8;">🚀 Hoja de Ruta (Sprint 4 y Escalabilidad)</div>
        <ul>
          <li><strong>Pasarela de Pagos Reales:</strong> Integración de webhooks con Stripe y PayPal para liquidación internacional.</li>
          <li><strong>Realidad Aumentada (WebXR):</strong> Visualización de modelos en dispositivos móviles a escala real mediante AR QuickLook.</li>
          <li><strong>Búsqueda Inteligente con IA:</strong> Búsqueda por similitud geométrica y visual de activos 3D.</li>
          <li><strong>Sistema de Licencias NFT / Blockchain:</strong> Certificados digitales inmutables de autoría para artistas 3D.</li>
        </ul>
      </div>
    </div>
  </div>

</body>
</html>
`;

async function generatePdf() {
  console.log('Iniciando generación de PDF de la presentación con Puppeteer...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1000));

  await page.pdf({
    path: outPdf,
    width: '13.333in',
    height: '7.5in',
    printBackground: true,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
  });

  await browser.close();
  console.log('¡PDF de la presentación generado con éxito en: ' + outPdf);
}

generatePdf().catch(err => {
  console.error('Error al generar PDF:', err);
  process.exit(1);
});
