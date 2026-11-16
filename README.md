# 3DMarket — Marketplace de Activos 3D (MVP + MVE)
**Universidad Autónoma de Zacatecas (UAZ) — Negocios Electrónicos**  
**Autores:** Oliver Saldívar y Cristian Berumen  
**Stack Tecnológico:** Java 21, Spring Boot 4.x, MariaDB 11.4, React 18, Vite, @google/model-viewer (WebGL 2.0 / PBR), Docker & Docker Compose.

---

## 🌟 Descripción del Proyecto
**3DMarket** es una plataforma de comercio electrónico especializada en la exhibición, inspección en tiempo real y adquisición de modelos tridimensionales (formatos `.glb` y `.gltf`) para desarrolladores de videojuegos, animadores y arquitectos. Diseñado bajo las normas **ISO 9241:11** (Usabilidad: Eficacia, Eficiencia y Satisfacción) e **ISO 9241:210** (Diseño Centrado en el Usuario - DCU).

---

## 🚀 Arquitectura y Módulos Implementados

### 1. Visor 3D Interactivo y Renderizado WebGL
* **Inspección Orbital 360°:** Rotación completa, zoom táctil/ratón, iluminación HDR y sombras PBR en tiempo real mediante `<model-viewer>`.
* **Auditoría de Topología (Modo Wireframe):** Switch interactivo para alternar entre la textura PBR final y la malla de alambre (*wireframe*), permitiendo al desarrollador evaluar la densidad poligonal antes de comprar.
* **Control de Animaciones:** Reproductor embebido con controles Play / Pause para validar ciclos de movimiento (walk, idle, etc.).

### 2. Catálogo y Navegación Ergonómica
* **Búsqueda Reactiva y Filtros Dinámicos:** Búsqueda en tiempo real por título, descripción y etiquetas; filtrado por categorías (*Personajes, Vehículos, Arquitectura, Props*) y por rango de polígonos.
* **Ficha Técnica Detallada:** Especificación de polígonos, vértices, esqueleto (*rigging*), compatibilidad de texturas y tipo de licencia.

### 3. Portafolios y Folders de Creadores
* **Folders Temáticos de Trabajo:** Organización de modelos por proyectos o colecciones (ej. *"Colección Sci-Fi & Espacio"*, *"Props y Arquitectura Interior"*).
* **Panel del Creador:** Métricas de ventas acumuladas, ingresos en USD y formulario multipart para publicar nuevos activos con sanitización UUID.

### 4. Comercio, Licenciamiento y "Mi Biblioteca"
* **Carrito de Compras Persistente:** Desglose de activos y cálculo en tiempo real.
* **Checkout Simulado y Generación de Licencia:** Asignación automática de licencia comercial con código hash único.
* **Mi Biblioteca:** Espacio privado del cliente para volver a descargar permanentemente los archivos `.glb` adquiridos.

### 5. Comunidad y Comunicación
* **Mensajería Directa:** Canal de chat integrado entre comprador y creador para cotizaciones o dudas técnicas.
* **Reseñas y Calificaciones:** Sistema de valoración técnica con estrellas (1 a 5) y comentarios de compradores.

---

## 💻 Cómo Ejecutar el Proyecto

### Opción 1: Con Docker Desktop (1 Clic o Comando)
Haz doble clic en **`run-docker.bat`** o ejecuta en tu terminal:
```bash
docker compose up -d
```

* **Frontend Web:** [http://localhost:5173](http://localhost:5173)
* **Backend API REST:** [http://localhost:8081/api/models](http://localhost:8081/api/models)
* **Base de Datos MariaDB:** Puerto `3306` (`user3d` / `password3d` en base `market3d_db`)

*(Nota: El backend en Docker está mapeado al puerto `8081` para evitar colisiones con servicios locales como Oracle Database XE).*

---

### Opción 2: Ejecución Local en Windows (Sin Docker)
Haz doble clic en **`run-dev.bat`** o ejecuta en terminales separadas:

1. **Backend (Spring Boot):**
   ```bash
   cd backend
   .\mvnw.cmd spring-boot:run
   ```
2. **Frontend (React + Vite):**
   ```bash
   cd frontend
   npm run dev
   ```

---

## 🧪 Pruebas Automatizadas
Para ejecutar la suite de pruebas unitarias del backend (JUnit 5 + Mockito):
```bash
cd backend
.\mvnw.cmd test
```
*Total: 11 tests ejecutados con 0 errores y 0 fallos.*

---

## 👥 Equipo de Desarrollo
* **Oliver Saldívar** — UAZ Ingeniería Eléctrica / Negocios Electrónicos
* **Cristian Berumen** — UAZ Ingeniería Eléctrica / Negocios Electrónicos
