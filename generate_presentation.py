import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def create_deck():
    prs = Presentation()
    # 16:9 widescreen
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6] # blank layout

    screenshots_dir = r"C:\Users\OliverSE\ProyectoNegocios\screenshots"
    out_pptx = r"C:\Users\OliverSE\Downloads\Presentacion_Ejecutiva_3DMarket.pptx"

    # Colores tema oscuro tech
    BG_COLOR = RGBColor(11, 15, 25)       # Slate 950 #0b0f19
    CARD_BG = RGBColor(17, 24, 39)        # Slate 900 #111827
    ACCENT_CYAN = RGBColor(56, 189, 248)  # Cyan #38bdf8
    ACCENT_BLUE = RGBColor(59, 130, 246)  # Blue #3b82f6
    TEXT_LIGHT = RGBColor(241, 245, 249)  # Slate 100
    TEXT_MUTED = RGBColor(148, 163, 184)  # Slate 400
    CARD_BORDER = RGBColor(30, 41, 59)    # Slate 800
    GREEN_ACCENT = RGBColor(34, 197, 94)  # Green #22c55e

    def apply_bg(slide):
        background = slide.background
        fill = background.fill
        fill.solid()
        fill.fore_color.rgb = BG_COLOR

    def add_header(slide, title_text, category_badge="3DMARKET - NEGOCIOS ELECTRÓNICOS"):
        # Badge
        badge_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(8), Inches(0.4))
        tf_b = badge_box.text_frame
        tf_b.word_wrap = True
        p_b = tf_b.paragraphs[0]
        p_b.text = f"● {category_badge.upper()}"
        p_b.font.size = Pt(11)
        p_b.font.bold = True
        p_b.font.color.rgb = ACCENT_CYAN

        # Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.7), Inches(11.7), Inches(0.6))
        tf_t = title_box.text_frame
        tf_t.word_wrap = True
        p_t = tf_t.paragraphs[0]
        p_t.text = title_text
        p_t.font.size = Pt(22)
        p_t.font.bold = True
        p_t.font.color.rgb = TEXT_LIGHT

    # =========================================================================
    # SLIDE 1: PORTADA
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)
    apply_bg(s1)

    # Decorative background card
    card = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.8), Inches(11.733), Inches(5.9))
    card.fill.solid()
    card.fill.fore_color.rgb = CARD_BG
    card.line.color.rgb = CARD_BORDER
    card.line.width = Pt(1.5)

    # Content
    tb = s1.shapes.add_textbox(Inches(1.5), Inches(1.3), Inches(10.3), Inches(4.8))
    tf = tb.text_frame
    tf.word_wrap = True

    p0 = tf.paragraphs[0]
    p0.text = "UNIVERSIDAD AUTÓNOMA DE ZACATECAS • NEGOCIOS ELECTRÓNICOS"
    p0.font.size = Pt(13)
    p0.font.bold = True
    p0.font.color.rgb = ACCENT_CYAN
    p0.space_after = Pt(12)

    p1 = tf.add_paragraph()
    p1.text = "3DMarket: Plataforma de Comercio Electrónico para Activos 3D"
    p1.font.size = Pt(32)
    p1.font.bold = True
    p1.font.color.rgb = TEXT_LIGHT
    p1.space_after = Pt(8)

    p2 = tf.add_paragraph()
    p2.text = "Inspección WebGL en Tiempo Real, Topología Wireframe, Folders de Creador y Licenciamiento Comercial"
    p2.font.size = Pt(16)
    p2.font.color.rgb = TEXT_MUTED
    p2.space_after = Pt(28)

    p3 = tf.add_paragraph()
    p3.text = "ENTREGABLE FINAL — MVP + MVE • 18 DE NOVIEMBRE DE 2026"
    p3.font.size = Pt(13)
    p3.font.bold = True
    p3.font.color.rgb = GREEN_ACCENT
    p3.space_after = Pt(20)

    p4 = tf.add_paragraph()
    p4.text = "Integrantes del Equipo:\n• Oliver Saldívar  |  • Cristian Berumen\n\nStack Técnico: React 18 • WebGL / <model-viewer> • Spring Boot 4 • MariaDB 11 • Docker Compose"
    p4.font.size = Pt(13)
    p4.font.color.rgb = TEXT_LIGHT

    # =========================================================================
    # SLIDE 2: PROBLEMÁTICA & OPORTUNIDAD
    # =========================================================================
    s2 = prs.slides.add_slide(blank_layout)
    apply_bg(s2)
    add_header(s2, "Problemática de Negocio y Oportunidad en el Mercado de Activos 3D", "Documento de Negocio")

    # Columna Izquierda: Problemática
    c_left = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.5), Inches(5.6), Inches(5.3))
    c_left.fill.solid()
    c_left.fill.fore_color.rgb = CARD_BG
    c_left.line.color.rgb = CARD_BORDER
    tb_l = s2.shapes.add_textbox(Inches(1.0), Inches(1.7), Inches(5.2), Inches(4.8))
    tf_l = tb_l.text_frame
    tf_l.word_wrap = True
    p = tf_l.paragraphs[0]
    p.text = "❌ La Problemática del Sector"
    p.font.size = Pt(17)
    p.font.bold = True
    p.font.color.rgb = RGBColor(239, 68, 68)
    p.space_after = Pt(14)

    items_l = [
        "Falta de inspección técnica previa: Los compradores adquieren modelos 'a ciegas' solo viendo renders promocionales engañosos.",
        "Altos costos y plataformas en inglés: Marketplaces extranjeros (TurboSquid, CGTrader) cobran en dólares con comisiones de hasta 40% a 50% al creador.",
        "Topología deficiente: Desarrolladores indie descargan mallas con millones de polígonos no optimizados que colapsan sus motores gráficos (Unity / Unreal).",
        "Vacío en licenciamiento comercial: Ambigüedad legal sobre el uso de modelos en videojuegos comerciales vs renders personales."
    ]
    for it in items_l:
        pi = tf_l.add_paragraph()
        pi.text = f"• {it}"
        pi.font.size = Pt(13)
        pi.font.color.rgb = TEXT_LIGHT
        pi.space_after = Pt(10)

    # Columna Derecha: Solución
    c_right = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.9), Inches(1.5), Inches(5.6), Inches(5.3))
    c_right.fill.solid()
    c_right.fill.fore_color.rgb = CARD_BG
    c_right.line.color.rgb = CARD_BORDER
    tb_r = s2.shapes.add_textbox(Inches(7.1), Inches(1.7), Inches(5.2), Inches(4.8))
    tf_r = tb_r.text_frame
    tf_r.word_wrap = True
    p = tf_r.paragraphs[0]
    p.text = " Solución y Propuesta de Valor 3DMarket"
    p.font.size = Pt(17)
    p.font.bold = True
    p.font.color.rgb = GREEN_ACCENT
    p.space_after = Pt(14)

    items_r = [
        "Visor WebGL Interactivo a 60 FPS: Inspección orbital 360°, zoom milimétrico y validación de animaciones antes de la compra sin instalar software extra.",
        "Auditoría Wireframe en 1 Clic: Switch a modo malla de alambre para contar triángulos y evaluar la limpieza topológica del activo.",
        "Folders Temáticos de Trabajo: Los artistas organizan colecciones ('Sci-Fi', 'Props') ofreciendo vitrinas profesionales y venta por paquetes.",
        "Canal Directo de Mensajería: Chat inmediato comprador-creador para pedir adaptaciones, cotizaciones o despejar dudas técnicas."
    ]
    for it in items_r:
        pi = tf_r.add_paragraph()
        pi.text = f"• {it}"
        pi.font.size = Pt(13)
        pi.font.color.rgb = TEXT_LIGHT
        pi.space_after = Pt(10)

    # =========================================================================
    # SLIDE 3: BUSINESS MODEL CANVAS
    # =========================================================================
    s3 = prs.slides.add_slide(blank_layout)
    apply_bg(s3)
    add_header(s3, "Business Model Canvas (Lienzo Canva de Negocio)", "Estrategia de Negocio")

    canvas_cards = [
        ("Propuesta de Valor", "• Inspección 3D orbital en navegador\n• Modo Wireframe para validar polígonos\n• Licencia Comercial Clara con Hash único\n• Redescarga permanente en 'Mi Biblioteca'", Inches(0.8), Inches(1.5), Inches(3.6), Inches(2.5)),
        ("Segmentos de Clientes", "• Estudios indie de videojuegos\n• Animadores y creadores de contenido 3D\n• Diseñadores de interiores y arquitectos\n• Modeladores que buscan monetizar activos", Inches(4.8), Inches(1.5), Inches(3.6), Inches(2.5)),
        ("Fuentes de Ingresos", "• Comisión por transacción (12% por venta)\n• Venta de licencias comerciales extendidas\n• Modelos destacados y promoción en catálogo\n• Suscripción mensual para creadores Pro", Inches(8.8), Inches(1.5), Inches(3.6), Inches(2.5)),
        ("Relación con Clientes", "• Mensajería directa integrada en la plataforma\n• Sistema de reseñas y calificaciones con estrellas\n• Autoservicio en biblioteca personal de compras", Inches(0.8), Inches(4.3), Inches(3.6), Inches(2.5)),
        ("Canales de Distribución", "• Plataforma web responsive (PC y móvil)\n• Portafolios públicos de creadores por URL\n• Integración con comunidades (Discord, ArtStation)", Inches(4.8), Inches(4.3), Inches(3.6), Inches(2.5)),
        ("Socios y Recursos Clave", "• Creadores 3D destacados de la comunidad\n• Infraestructura Docker + MariaDB + Spring Boot\n• Repositorio y control de versiones en GitHub", Inches(8.8), Inches(4.3), Inches(3.6), Inches(2.5))
    ]

    for title, text, left, top, width, height in canvas_cards:
        sh = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        sh.fill.solid()
        sh.fill.fore_color.rgb = CARD_BG
        sh.line.color.rgb = CARD_BORDER
        tb = s3.shapes.add_textbox(left + Inches(0.15), top + Inches(0.15), width - Inches(0.3), height - Inches(0.3))
        tf = tb.text_frame
        tf.word_wrap = True
        pt = tf.paragraphs[0]
        pt.text = title
        pt.font.size = Pt(14)
        pt.font.bold = True
        pt.font.color.rgb = ACCENT_CYAN
        pt.space_after = Pt(6)
        for line in text.split('\n'):
            pl = tf.add_paragraph()
            pl.text = line
            pl.font.size = Pt(11)
            pl.font.color.rgb = TEXT_LIGHT

    # =========================================================================
    # SLIDE 4: ARQUITECTURA TÉCNICA & NORMAS ISO
    # =========================================================================
    s4 = prs.slides.add_slide(blank_layout)
    apply_bg(s4)
    add_header(s4, "Arquitectura Técnica y Estándares de Usabilidad (ISO 9241 & DCU)", "Documento Técnico")

    # Tarjeta 1: Stack Tecnológico
    sh1 = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.5), Inches(3.6), Inches(5.3))
    sh1.fill.solid()
    sh1.fill.fore_color.rgb = CARD_BG
    sh1.line.color.rgb = CARD_BORDER
    tb1 = s4.shapes.add_textbox(Inches(1.0), Inches(1.7), Inches(3.2), Inches(4.9))
    tf1 = tb1.text_frame
    tf1.word_wrap = True
    p = tf1.paragraphs[0]
    p.text = " Arquitectura de Software"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = ACCENT_CYAN
    p.space_after = Pt(12)
    bullets_arch = [
        "Frontend: React 18, Vite, @google/model-viewer, Lucide Icons.",
        "WebGL 2.0: Motor de sombreado PBR, render orbital y Wireframe a 60 FPS.",
        "Backend: Java 21, Spring Boot 4.x, Hibernate / JPA, Spring Security.",
        "Base de Datos: MariaDB 11.4 con integridad ACID y transacciones comerciales.",
        "DevOps: Docker & Docker Compose orquestando Frontend (Nginx), Backend y DB."
    ]
    for b in bullets_arch:
        pb = tf1.add_paragraph()
        pb.text = f"• {b}"
        pb.font.size = Pt(12)
        pb.font.color.rgb = TEXT_LIGHT
        pb.space_after = Pt(8)

    # Tarjeta 2: ISO 9241:11
    sh2 = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.8), Inches(1.5), Inches(3.6), Inches(5.3))
    sh2.fill.solid()
    sh2.fill.fore_color.rgb = CARD_BG
    sh2.line.color.rgb = CARD_BORDER
    tb2 = s4.shapes.add_textbox(Inches(5.0), Inches(1.7), Inches(3.2), Inches(4.9))
    tf2 = tb2.text_frame
    tf2.word_wrap = True
    p = tf2.paragraphs[0]
    p.text = "🎯 Norma ISO 9241:11"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = GREEN_ACCENT
    p.space_after = Pt(12)
    bullets_iso11 = [
        "Eficacia: Tasa de éxito >= 95% en inspección, compra y descarga de modelos .glb.",
        "Eficiencia: Regla de los 3 clics para acceder a la ficha técnica; carga WebGL en < 5 segundos.",
        "Satisfacción: Puntaje System Usability Scale (SUS) >= 80/100 con interfaz gaming oscura ergonómica y alto contraste WCAG."
    ]
    for b in bullets_iso11:
        pb = tf2.add_paragraph()
        pb.text = f"• {b}"
        pb.font.size = Pt(12)
        pb.font.color.rgb = TEXT_LIGHT
        pb.space_after = Pt(10)

    # Tarjeta 3: ISO 9241:210 y DCU
    sh3 = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.8), Inches(1.5), Inches(3.6), Inches(5.3))
    sh3.fill.solid()
    sh3.fill.fore_color.rgb = CARD_BG
    sh3.line.color.rgb = CARD_BORDER
    tb3 = s4.shapes.add_textbox(Inches(9.0), Inches(1.7), Inches(3.2), Inches(4.9))
    tf3 = tb3.text_frame
    tf3.word_wrap = True
    p = tf3.paragraphs[0]
    p.text = "🔄 Norma ISO 9241:210 (DCU)"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = RGBColor(168, 85, 247)
    p.space_after = Pt(12)
    bullets_iso210 = [
        "Diseño Centrado en el Usuario (DCU): Foco en dos perfiles clave (Desarrollador y Creador 3D).",
        "Ciclo Iterativo de 4 Fases: Contexto de uso -> Requisitos de usuario -> Prototipado y desarrollo -> Evaluación frente a criterios DoD.",
        "Validación Continua: Sprints semanales con entrega de software funcional ejecutable (MVP)."
    ]
    for b in bullets_iso210:
        pb = tf3.add_paragraph()
        pb.text = f"• {b}"
        pb.font.size = Pt(12)
        pb.font.color.rgb = TEXT_LIGHT
        pb.space_after = Pt(10)

    # =========================================================================
    # SLIDE 5: PRODUCT BACKLOG (27 HUs)
    # =========================================================================
    s5 = prs.slides.add_slide(blank_layout)
    apply_bg(s5)
    add_header(s5, "Product Backlog Ágil: 27 Historias de Usuario (114 Story Points)", "Metodología Scrum")

    sprints_data = [
        ("Sprint 1 (31 SP) - Core 3D & Catálogo", "• HU-01: Cuadrícula responsiva de modelos 3D\n• HU-02: Búsqueda reactiva con debounce\n• HU-03: Filtros temáticos por categorías\n• HU-04: Filtro por rango poligonal\n• HU-07: Visor WebGL interactivo orbital 360°\n• HU-08: Switch de topología (Modo Wireframe)\n• HU-10: Ficha técnica con polígonos/vértices\n• HU-26/27: API REST y sanitización UUID", GREEN_ACCENT, Inches(0.8)),
        ("Sprint 2 (37 SP) - Creadores & Portafolios", "• HU-09: Reproductor de animaciones Play/Pause\n• HU-11: Roles de usuario (Cliente / Creador)\n• HU-13/14: Perfil público de creador 3D\n• HU-15: Folders temáticos de trabajo\n• HU-16: Modelos destacados en carpetas\n• HU-17: Carga multipart de modelos .glb\n• HU-19: Edición y gestión de activos\n• HU-12: Recuperación de cuenta", ACCENT_BLUE, Inches(4.8)),
        ("Sprint 3 (46 SP) - Comercio & Comunidad", "• HU-20: Carrito de compras persistente\n• HU-21: Checkout y generación de licencias\n• HU-22: 'Mi Biblioteca' con historial\n• HU-23: Descarga directa segura de .glb\n• HU-24: Mensajería directa comprador-creador\n• HU-25: Reseñas técnicas con estrellas\n• Estado MVP: 25 HUs completadas y funcionales en código", RGBColor(168, 85, 247), Inches(8.8))
    ]

    for title, content, col_color, left in sprints_data:
        sh = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(1.5), Inches(3.6), Inches(5.3))
        sh.fill.solid()
        sh.fill.fore_color.rgb = CARD_BG
        sh.line.color.rgb = CARD_BORDER
        tb = s5.shapes.add_textbox(left + Inches(0.15), Inches(1.7), Inches(3.3), Inches(4.9))
        tf = tb.text_frame
        tf.word_wrap = True
        pt = tf.paragraphs[0]
        pt.text = title
        pt.font.size = Pt(14)
        pt.font.bold = True
        pt.font.color.rgb = col_color
        pt.space_after = Pt(10)
        for line in content.split('\n'):
            pl = tf.add_paragraph()
            pl.text = line
            pl.font.size = Pt(11)
            pl.font.color.rgb = TEXT_LIGHT
            pl.space_after = Pt(3)

    # =========================================================================
    # HELPER FUNCTION FOR SCREENSHOT SLIDES
    # =========================================================================
    def add_screen_slide(title, subtitle, img_filename, highlights_list):
        slide = prs.slides.add_slide(blank_layout)
        apply_bg(slide)
        add_header(slide, title, "Demostración del MVP + MVE")

        # Imagen a la izquierda (con aspect ratio 16:10 / 16:9)
        img_path = os.path.join(screenshots_dir, img_filename)
        if os.path.exists(img_path):
            # Contenedor visual
            img_container = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.4), Inches(7.6), Inches(5.5))
            img_container.fill.solid()
            img_container.fill.fore_color.rgb = CARD_BG
            img_container.line.color.rgb = CARD_BORDER
            img_container.line.width = Pt(1.5)

            # Insertar imagen
            slide.shapes.add_picture(img_path, Inches(0.9), Inches(1.5), width=Inches(7.4), height=Inches(5.3))

        # Panel explicativo a la derecha
        p_card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.7), Inches(1.4), Inches(3.8), Inches(5.5))
        p_card.fill.solid()
        p_card.fill.fore_color.rgb = CARD_BG
        p_card.line.color.rgb = CARD_BORDER

        tb_p = slide.shapes.add_textbox(Inches(8.9), Inches(1.6), Inches(3.4), Inches(5.1))
        tf_p = tb_p.text_frame
        tf_p.word_wrap = True
        pp = tf_p.paragraphs[0]
        pp.text = subtitle
        pp.font.size = Pt(16)
        pp.font.bold = True
        pp.font.color.rgb = ACCENT_CYAN
        pp.space_after = Pt(12)

        for hl in highlights_list:
            ph = tf_p.add_paragraph()
            ph.text = f"✓ {hl}"
            ph.font.size = Pt(12)
            ph.font.color.rgb = TEXT_LIGHT
            ph.space_after = Pt(8)

    # =========================================================================
    # SLIDE 6: PANTALLA 1 - CATÁLOGO DINÁMICO
    # =========================================================================
    add_screen_slide(
        "Pantalla 1: Catálogo Responsivo y Búsqueda Reactiva",
        "Exploración Rápida de Inventario",
        "01_catalogo_principal.png",
        [
            "Renderizado dinámico de tarjetas con miniatura interactiva 3D.",
            "Búsqueda instantánea por nombre y descripción técnica con debounce.",
            "Chips de categorías: Personajes, Props, Vehículos, Arquitectura.",
            "Filtro por poligonaje (Low Poly vs Mid/High Poly).",
            "Indicadores visibles de precio en USD, estrellas de valoración y licencias."
        ]
    )

    # =========================================================================
    # SLIDE 7: PANTALLA 2 - FICHA TÉCNICA 3D
    # =========================================================================
    add_screen_slide(
        "Pantalla 2: Ficha Técnica e Inspección Orbital 360°",
        "Validación WebGL sin Software Extra",
        "02_ficha_tecnica_3d.png",
        [
            "Visor WebGL 2.0 a pantalla amplia mediante componente <model-viewer>.",
            "Controles orbitales de rotación en 360°, zoom milimétrico y paneo táctil.",
            "Métricas técnicas exactas: número de polígonos, recuento de vértices, rigging y animaciones.",
            "Materiales PBR reflectantes calculados en tiempo real con iluminación HDR.",
            "Acceso directo a carrito y botón 'Contactar Creador'."
        ]
    )

    # =========================================================================
    # SLIDE 8: PANTALLA 3 - MODO WIREFRAME
    # =========================================================================
    add_screen_slide(
        "Pantalla 3: Auditoría de Topología (Modo Wireframe / Malla)",
        "Auditoría Poligonal en Tiempo Real",
        "03_modo_wireframe.png",
        [
            "Switch en 1 clic entre renderizado PBR final y Modo Malla de Alambre.",
            "Permite al desarrollador evaluar la densidad de triángulos y flujo de aristas.",
            "Garantiza que el activo esté optimizado antes de integrarlo en Unity o Unreal.",
            "Cumple la norma ISO 9241:11 al brindar transparencia total al comprador."
        ]
    )

    # =========================================================================
    # SLIDE 9: PANTALLA 4 - COMUNICACIÓN Y CHAT
    # =========================================================================
    add_screen_slide(
        "Pantalla 4: Canal de Mensajería Directa Cliente-Creador",
        "Comunicación Inmediata de Negocio",
        "04_mensajeria_creador.png",
        [
            "Canal de chat bidireccional integrado directamente en la ficha del modelo.",
            "Permite solicitar cotizaciones para proyectos a medida o adaptaciones de formato.",
            "Resolución inmediata de dudas técnicas (compatibilidad de rigs o texturas).",
            "Fortalece la retención y confianza de la comunidad de artistas 3D."
        ]
    )

    # =========================================================================
    # SLIDE 10: PANTALLA 5 - FOLDERS Y PORTAFOLIOS
    # =========================================================================
    add_screen_slide(
        "Pantalla 5: Folders de Trabajo y Portafolios de Creadores",
        "Vitrinas Profesionales Organizadas",
        "05_folders_portafolios.png",
        [
            "Agrupación de modelos por proyectos temáticos ('Sci-Fi & Espacio', 'Props').",
            "Muestra el perfil del modelador, biografía y cantidad de activos asociados.",
            "Permite a los estudios explorar el estilo coherente de un mismo autor.",
            "Facilita la compra en paquete (bundles) de colecciones completas."
        ]
    )

    # =========================================================================
    # SLIDE 11: PANTALLA 6 - MI BIBLIOTECA
    # =========================================================================
    add_screen_slide(
        "Pantalla 6: 'Mi Biblioteca' y Redescarga Permanente de .GLB",
        "Gestión de Compras y Licencias",
        "06_mi_biblioteca.png",
        [
            "Espacio privado donde el cliente consulta todos los modelos adquiridos.",
            "Generación y visualización del número de Licencia Comercial Oficial.",
            "Botón de descarga directa permanente del archivo binario .glb.",
            "Arquitectura segura que protege la propiedad intelectual de los modeladores."
        ]
    )

    # =========================================================================
    # SLIDE 12: PANTALLA 7 - PANEL DEL CREADOR
    # =========================================================================
    add_screen_slide(
        "Pantalla 7: Panel del Creador y Publicación de Modelos",
        "Métricas de Ventas y Carga Multipart",
        "07_panel_creador.png",
        [
            "Métricas clave de negocio: Total de ingresos ($ USD), ventas y valoración promedio.",
            "Formulario de subida de modelos 3D (.glb) con metadatos técnicos y precio.",
            "Servicio backend de sanitización con UUIDs aleatorios y validación de tipos MIME.",
            "Gestión y edición rápida de activos publicados."
        ]
    )

    # =========================================================================
    # SLIDE 13: CONCLUSIONES Y SIGUIENTES PASOS
    # =========================================================================
    s13 = prs.slides.add_slide(blank_layout)
    apply_bg(s13)
    add_header(s13, "Conclusiones del Proyecto y Hoja de Ruta Futura", "Cierre y Evaluación")

    # Card Izquierda: Logros
    cl = s13.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.5), Inches(5.6), Inches(5.3))
    cl.fill.solid()
    cl.fill.fore_color.rgb = CARD_BG
    cl.line.color.rgb = CARD_BORDER
    tbl = s13.shapes.add_textbox(Inches(1.0), Inches(1.7), Inches(5.2), Inches(4.8))
    tfl = tbl.text_frame
    tfl.word_wrap = True
    p = tfl.paragraphs[0]
    p.text = "🎯 Logros Clave del MVP (18 de Noviembre)"
    p.font.size = Pt(17)
    p.font.bold = True
    p.font.color.rgb = GREEN_ACCENT
    p.space_after = Pt(14)
    items_cl = [
        "Plataforma Full-Stack Funcional: Dockerizada con React 18, Spring Boot 4 y MariaDB 11.",
        "25 Historias de Usuario Completadas: Cumpliendo el 100% de requisitos 'Must Have' del Product Backlog.",
        "Cumplimiento Riguroso de Normas: ISO 9241:11 (usabilidad medida en eficacia, eficiencia y satisfacción) e ISO 9241:210 (DCU).",
        "Repositorio Git Público en Producción: Código limpio y trazable en GitHub (OliverSaldivar/ProyectoNegocios)."
    ]
    for it in items_cl:
        pi = tfl.add_paragraph()
        pi.text = f"• {it}"
        pi.font.size = Pt(13)
        pi.font.color.rgb = TEXT_LIGHT
        pi.space_after = Pt(10)

    # Card Derecha: Hoja de Ruta
    cr = s13.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.9), Inches(1.5), Inches(5.6), Inches(5.3))
    cr.fill.solid()
    cr.fill.fore_color.rgb = CARD_BG
    cr.line.color.rgb = CARD_BORDER
    tbr = s13.shapes.add_textbox(Inches(7.1), Inches(1.7), Inches(5.2), Inches(4.8))
    tfr = tbr.text_frame
    tfr.word_wrap = True
    p = tfr.paragraphs[0]
    p.text = "🚀 Hoja de Ruta (Sprint 4 y Escalabilidad)"
    p.font.size = Pt(17)
    p.font.bold = True
    p.font.color.rgb = ACCENT_CYAN
    p.space_after = Pt(14)
    items_cr = [
        "Pasarela de Pagos Reales: Integración de webhooks con Stripe y PayPal para liquidación internacional.",
        "Realidad Aumentada (WebXR): Visualización de modelos en dispositivos móviles a escala real mediante AR QuickLook.",
        "Búsqueda Inteligente con IA: Búsqueda por similitud geométrica y visual de activos 3D.",
        "Sistema de Licencias NFT / Blockchain: Certificados digitales inmutables de autoría para artistas 3D."
    ]
    for it in items_cr:
        pi = tfr.add_paragraph()
        pi.text = f"• {it}"
        pi.font.size = Pt(13)
        pi.font.color.rgb = TEXT_LIGHT
        pi.space_after = Pt(10)

    prs.save(out_pptx)
    print(f"Presentación PPTX generada exitosamente en: {out_pptx}")

if __name__ == "__main__":
    create_deck()
