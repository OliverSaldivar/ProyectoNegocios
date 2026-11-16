import React, { useState, useEffect } from 'react'
import { 
  Box, 
  Search, 
  Filter, 
  Upload, 
  Eye, 
  Download, 
  Layers, 
  Zap, 
  MessageSquare, 
  X, 
  Sparkles,
  FolderOpen,
  Plus,
  ShoppingCart,
  Send,
  User,
  CheckCircle2,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Star,
  BookOpen,
  Play,
  Pause,
  LayoutDashboard,
  DollarSign,
  TrendingUp,
  Edit3
} from 'lucide-react'

const API_BASE_URL = 'http://localhost:8081/api'
const API_FALLBACK_URL = 'http://localhost:8080/api'
const getActiveApi = () => window.__ACTIVE_API__ || API_BASE_URL

const INITIAL_MODELS = [
  {
    id: 1,
    title: "Astronauta Espacial Explorador",
    description: "Modelo 3D detallado de un traje espacial con materiales PBR reflectantes, visor dorado y mapa de normales para simulación espacial.",
    category: "Personajes",
    polygonCount: 28500,
    vertexCount: 15200,
    price: 29.99,
    rating: 5.0,
    downloads: 42,
    isRigged: true,
    isAnimated: true,
    hasPbr: true,
    fileUrl: "/models/Astronaut.glb",
    creatorName: "Oliver Saldívar",
    licenseType: "Comercial Standard"
  },
  {
    id: 2,
    title: "Casco de Vuelo Militar Táctico",
    description: "Casco de combate táctico militar con acabado metálico PBR, visor reflectante y mapa de rugosidad en resolución 2K.",
    category: "Props",
    polygonCount: 19400,
    vertexCount: 10150,
    price: 14.50,
    rating: 4.8,
    downloads: 28,
    isRigged: false,
    isAnimated: false,
    hasPbr: true,
    fileUrl: "/models/DamagedHelmet.glb",
    creatorName: "Cristian Berumen",
    licenseType: "Comercial Extended"
  },
  {
    id: 3,
    title: "Vehículo Deportivo ToyCar",
    description: "Auto deportivo de competición estilizado con carrocería aerodinámica y detalles de textura.",
    category: "Vehículos",
    polygonCount: 12450,
    vertexCount: 7800,
    price: 0.0,
    rating: 4.5,
    downloads: 115,
    isRigged: false,
    isAnimated: false,
    hasPbr: true,
    fileUrl: "/models/ToyCar.glb",
    creatorName: "3DMarket Studio",
    licenseType: "CC0 (Dominio Público)"
  },
  {
    id: 4,
    title: "Silla Contemporánea de Diseño",
    description: "Mueble contemporáneo con acabados de tela aterciopelada y estructura ergonómica para renderizado de interiores.",
    category: "Arquitectura",
    polygonCount: 8900,
    vertexCount: 4600,
    price: 9.99,
    rating: 4.9,
    downloads: 19,
    isRigged: false,
    isAnimated: false,
    hasPbr: true,
    fileUrl: "/models/SheenChair.glb",
    creatorName: "Oliver Saldívar",
    licenseType: "Comercial Standard"
  },
  {
    id: 5,
    title: "Robot Centinela Animado",
    description: "Robot bípedo con ciclos de animación de marcha (walk) y alerta (idle). Preparado para motores Unity y Unreal Engine.",
    category: "Personajes",
    polygonCount: 32100,
    vertexCount: 18400,
    price: 39.00,
    rating: 5.0,
    downloads: 64,
    isRigged: true,
    isAnimated: true,
    hasPbr: true,
    fileUrl: "/models/RobotExpressive.glb",
    creatorName: "CyberForge 3D",
    licenseType: "Comercial Extended"
  }
]

const INITIAL_FOLDERS = [
  {
    id: 1,
    name: "Colección Sci-Fi & Espacio",
    description: "Activos diseñados para entornos de ciencia ficción, estaciones espaciales y trajes de exploración.",
    creatorName: "Oliver Saldívar",
    modelIds: [1, 5]
  },
  {
    id: 2,
    name: "Props y Arquitectura Interior",
    description: "Mobiliario y piezas de utilería optimizadas para escenas de arquitectura y videojuegos contemporáneos.",
    creatorName: "Oliver Saldívar",
    modelIds: [4]
  }
]

export default function App() {
  const [activeTab, setActiveTab] = useState('catalog') // 'catalog' | 'folders' | 'library' | 'dashboard'
  const [userRole, setUserRole] = useState('client') // 'client' | 'creator'
  const currentUserName = userRole === 'client' ? 'Carlos (Cliente)' : 'Oliver Saldívar'

  // Modelos, carpetas y biblioteca
  const [models, setModels] = useState(INITIAL_MODELS)
  const [folders, setFolders] = useState(INITIAL_FOLDERS)
  const [selectedFolder, setSelectedFolder] = useState(null)
  const [myLibrary, setMyLibrary] = useState([INITIAL_MODELS[2]])
  const [apiConnected, setApiConnected] = useState(false)

  // Filtros
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [maxPolygonsFilter, setMaxPolygonsFilter] = useState('all')

  // Modales
  const [selectedModel, setSelectedModel] = useState(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showFolderModal, setShowFolderModal] = useState(false)
  const [showChatModal, setShowChatModal] = useState(false)
  const [showCartModal, setShowCartModal] = useState(false)
  const [editingModel, setEditingModel] = useState(null)
  const [checkoutComplete, setCheckoutComplete] = useState(false)

  // Controles de Visor (Wireframe y Animación)
  const [isWireframe, setIsWireframe] = useState(false)
  const [isPlayingAnimation, setIsPlayingAnimation] = useState(true)

  // Reseñas de modelos
  const [modelReviews, setModelReviews] = useState([
    {
      id: 1,
      authorName: "GameDev_Studio99",
      rating: 5,
      comment: "Increíble topología. Cero polígonos no-manifold y el unwrap UV está perfectamente optimizado para Unity."
    },
    {
      id: 2,
      authorName: "VR_Architect",
      rating: 5,
      comment: "Los materiales PBR reaccionan de manera ultra realista a la iluminación dinámica. 100% recomendado."
    }
  ])
  const [newReviewRating, setNewReviewRating] = useState(5)
  const [newReviewComment, setNewReviewComment] = useState('')

  // Carrito de compras
  const [cart, setCart] = useState([])

  // Mensajería directa
  const [chatPartner, setChatPartner] = useState('Oliver Saldívar')
  const [chatModelContext, setChatModelContext] = useState(null)
  const [messages, setMessages] = useState([
    {
      id: 1,
      senderName: "Carlos (Cliente)",
      receiverName: "Oliver Saldívar",
      content: "¡Hola Oliver! Me interesa el modelo del Astronauta Espacial. ¿Sería posible adaptarle una variación con casco iluminado por emisores LED?",
      relatedModelTitle: "Astronauta Espacial Explorador",
      sentAt: "Hoy, 15:30"
    },
    {
      id: 2,
      senderName: "Oliver Saldívar",
      receiverName: "Carlos (Cliente)",
      content: "Hola Carlos, claro que sí. Puedo prepararte el mapa de emisión (Emissive Map) en 2K y dejar el canal listo en el material PBR por un suplemento mínimo.",
      relatedModelTitle: "Astronauta Espacial Explorador",
      sentAt: "Hoy, 15:45"
    }
  ])
  const [newMessageText, setNewMessageText] = useState('')

  // Formulario de Nueva Carpeta
  const [newFolderName, setNewFolderName] = useState('')
  const [newFolderDesc, setNewFolderDesc] = useState('')

  // Formulario de Subida de Modelo
  const [uploadFormData, setUploadFormData] = useState({
    title: '',
    description: '',
    category: 'Personajes',
    polygonCount: 15000,
    price: 15.00,
    creatorName: 'Oliver Saldívar',
    isRigged: false,
    isAnimated: false
  })
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadStatus, setUploadStatus] = useState('')

  // Fetch inicial desde Spring Boot (prueba puerto 8081 de Docker y 8080 local)
  const fetchData = async () => {
    let baseUrl = API_BASE_URL
    try {
      let resModels = await fetch(`${baseUrl}/models`)
      if (!resModels.ok) throw new Error()
      const data = await resModels.json()
      if (data && data.length > 0) setModels(data)
      setApiConnected(true)
      window.__ACTIVE_API__ = baseUrl
    } catch {
      try {
        baseUrl = API_FALLBACK_URL
        let resModels = await fetch(`${baseUrl}/models`)
        if (resModels.ok) {
          const data = await resModels.json()
          if (data && data.length > 0) setModels(data)
          setApiConnected(true)
          window.__ACTIVE_API__ = baseUrl
        }
      } catch {
        setApiConnected(false)
      }
    }

    try {
      const active = window.__ACTIVE_API__ || API_BASE_URL
      const resFolders = await fetch(`${active}/folders`)
      if (resFolders.ok) {
        const dataFolders = await resFolders.json()
        if (dataFolders && dataFolders.length > 0) setFolders(dataFolders)
      }
    } catch {}
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Filtrado de modelos
  const filteredModels = models.filter(m => {
    const matchesSearch = 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (m.description && m.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (m.creatorName && m.creatorName.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === 'Todos' || m.category === selectedCategory

    let matchesPolygons = true
    if (maxPolygonsFilter === 'low') matchesPolygons = m.polygonCount < 10000
    if (maxPolygonsFilter === 'mid') matchesPolygons = m.polygonCount >= 10000 && m.polygonCount <= 30000
    if (maxPolygonsFilter === 'high') matchesPolygons = m.polygonCount > 30000

    return matchesSearch && matchesCategory && matchesPolygons
  })

  // Funciones de Carrito
  const addToCart = (model) => {
    if (!cart.some(item => item.id === model.id)) {
      setCart([...cart, model])
    }
    setShowCartModal(true)
  }

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const handleCheckoutSuccess = async () => {
    setCheckoutComplete(true)
    const newItems = cart.filter(item => !myLibrary.some(lib => lib.id === item.id))
    setMyLibrary([...myLibrary, ...newItems])

    // Registrar órdenes en backend
    for (const item of cart) {
      try {
        await fetch(`${getActiveApi()}/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clientUsername: currentUserName,
            modelId: item.id,
            modelTitle: item.title,
            pricePaid: item.price,
            licenseType: item.licenseType || 'Comercial Standard'
          })
        })
      } catch {}
    }
  }

  const cartTotal = cart.reduce((acc, curr) => acc + (curr.price || 0), 0)

  // Abrir Chat con Creador sobre un Modelo
  const openChatForModel = (model) => {
    setChatPartner(model.creatorName || 'Oliver Saldívar')
    setChatModelContext(model.title)
    setSelectedModel(null)
    setShowChatModal(true)
  }

  // Enviar mensaje de chat
  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessageText.trim()) return

    const newMsg = {
      id: Date.now(),
      senderName: currentUserName,
      receiverName: chatPartner,
      content: newMessageText.trim(),
      relatedModelTitle: chatModelContext,
      sentAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, newMsg])
    setNewMessageText('')

    try {
      await fetch(`${getActiveApi()}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMsg)
      })
    } catch {}
  }

  // Enviar Reseña Técnica
  const handleAddReview = async (e) => {
    e.preventDefault()
    if (!newReviewComment.trim()) return

    const reviewObj = {
      id: Date.now(),
      authorName: currentUserName,
      rating: newReviewRating,
      comment: newReviewComment.trim(),
      modelId: selectedModel ? selectedModel.id : 1
    }

    setModelReviews([reviewObj, ...modelReviews])
    setNewReviewComment('')

    try {
      await fetch(`${getActiveApi()}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewObj)
      })
    } catch {}
  }

  // Crear nueva carpeta de trabajo
  const handleCreateFolder = async (e) => {
    e.preventDefault()
    if (!newFolderName.trim()) return

    const newF = {
      id: Date.now(),
      name: newFolderName,
      description: newFolderDesc,
      creatorName: 'Oliver Saldívar',
      modelIds: [1]
    }

    setFolders([...folders, newF])
    setNewFolderName('')
    setNewFolderDesc('')
    setShowFolderModal(false)

    try {
      await fetch(`${getActiveApi()}/folders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newF)
      })
    } catch {}
  }

  // Guardar edición de modelo (Dashboard Creador)
  const handleSaveEditModel = async (e) => {
    e.preventDefault()
    if (!editingModel) return

    setModels(models.map(m => m.id === editingModel.id ? editingModel : m))
    const toSave = { ...editingModel }
    setEditingModel(null)

    try {
      await fetch(`${getActiveApi()}/models/${toSave.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toSave)
      })
    } catch {}
  }

  // Eliminar modelo (Dashboard Creador)
  const handleDeleteModel = async (id) => {
    if (!confirm("¿Seguro que deseas retirar este modelo del marketplace?")) return
    setModels(models.filter(m => m.id !== id))
    try {
      await fetch(`${getActiveApi()}/models/${id}`, { method: 'DELETE' })
    } catch {}
  }

  // Subir Modelo 3D
  const handleUploadSubmit = async (e) => {
    e.preventDefault()
    if (!selectedFile) {
      alert("Por favor selecciona un archivo .glb o .gltf")
      return
    }

    const formData = new FormData()
    formData.append("title", uploadFormData.title)
    formData.append("description", uploadFormData.description)
    formData.append("category", uploadFormData.category)
    formData.append("polygonCount", uploadFormData.polygonCount)
    formData.append("price", uploadFormData.price)
    formData.append("creatorName", uploadFormData.creatorName)
    formData.append("isRigged", uploadFormData.isRigged)
    formData.append("isAnimated", uploadFormData.isAnimated)
    formData.append("file", selectedFile)

    try {
      setUploadStatus('Subiendo y validando modelo 3D en el servidor...')
      const res = await fetch(`${getActiveApi()}/models`, {
        method: 'POST',
        body: formData
      })
      if (res.ok) {
        const saved = await res.json()
        setModels(prev => [saved, ...prev])
        setUploadStatus('¡Modelo publicado exitosamente en el catálogo!')
        setTimeout(() => {
          setShowUploadModal(false)
          setUploadStatus('')
        }, 1200)
      } else {
        const err = await res.json()
        setUploadStatus('Error: ' + (err.error || 'No se pudo subir'))
      }
    } catch {
      const localModel = {
        id: Date.now(),
        ...uploadFormData,
        fileUrl: URL.createObjectURL(selectedFile),
        hasPbr: true
      }
      setModels(prev => [localModel, ...prev])
      setUploadStatus('¡Modelo cargado en vista local!')
      setTimeout(() => {
        setShowUploadModal(false)
        setUploadStatus('')
      }, 1000)
    }
  }

  // Métricas del creador
  const creatorModels = models.filter(m => m.creatorName === 'Oliver Saldívar')
  const totalEarnings = creatorModels.reduce((acc, curr) => acc + (curr.price * (curr.downloads || 15)), 0)
  const totalDownloads = creatorModels.reduce((acc, curr) => acc + (curr.downloads || 15), 0)

  const categories = ['Todos', 'Personajes', 'Vehículos', 'Arquitectura', 'Props', 'Criaturas']

  return (
    <div>
      {/* NAVBAR */}
      <header className="navbar">
        <div className="container nav-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <a href="#" className="nav-brand" onClick={() => { setActiveTab('catalog'); setSelectedFolder(null); }}>
              <Box size={28} color="#3b82f6" />
              <span>3D<span style={{ color: '#3b82f6' }}>Market</span></span>
              <span className="brand-badge">MVP</span>
            </a>

            {/* Pestañas de Navegación */}
            <div style={{ display: 'flex', gap: '0.4rem', background: 'var(--bg-secondary)', padding: '0.25rem', borderRadius: '10px' }}>
              <button 
                className={`chip ${activeTab === 'catalog' && !selectedFolder ? 'active' : ''}`}
                style={{ border: 'none', padding: '0.4rem 0.9rem' }}
                onClick={() => { setActiveTab('catalog'); setSelectedFolder(null); }}
              >
                Catálogo
              </button>
              <button 
                className={`chip ${activeTab === 'folders' || selectedFolder ? 'active' : ''}`}
                style={{ border: 'none', padding: '0.4rem 0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                onClick={() => { setActiveTab('folders'); setSelectedFolder(null); }}
              >
                <FolderOpen size={15} />
                <span>Folders</span>
              </button>
              <button 
                className={`chip ${activeTab === 'library' ? 'active' : ''}`}
                style={{ border: 'none', padding: '0.4rem 0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                onClick={() => { setActiveTab('library'); setSelectedFolder(null); }}
              >
                <BookOpen size={15} />
                <span>Mi Biblioteca ({myLibrary.length})</span>
              </button>
              <button 
                className={`chip ${activeTab === 'dashboard' ? 'active' : ''}`}
                style={{ border: 'none', padding: '0.4rem 0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                onClick={() => { setActiveTab('dashboard'); setSelectedFolder(null); }}
              >
                <LayoutDashboard size={15} />
                <span>Panel Creador</span>
              </button>
            </div>
          </div>

          {/* Buscador */}
          {activeTab === 'catalog' && (
            <div className="search-bar">
              <Search size={18} className="search-icon" />
              <input 
                type="text" 
                className="search-input" 
                placeholder="Buscar modelos 3D, personajes, armas, props..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}

          {/* Acciones y Roles */}
          <div className="nav-actions">
            <button 
              className="btn btn-outline"
              style={{ fontSize: '0.8rem', padding: '0.45rem 0.8rem', borderColor: userRole === 'creator' ? '#8b5cf6' : 'var(--border-color)' }}
              onClick={() => setUserRole(userRole === 'client' ? 'creator' : 'client')}
              title="Cambiar rol para simular la interfaz"
            >
              <User size={15} color={userRole === 'creator' ? '#c084fc' : '#60a5fa'} />
              <span>Rol: <strong>{userRole === 'creator' ? 'Creador 3D' : 'Cliente'}</strong></span>
            </button>

            <button 
              className="btn btn-outline"
              style={{ position: 'relative', padding: '0.5rem 0.8rem' }}
              onClick={() => setShowChatModal(true)}
              title="Mensajes directos Cliente-Creador"
            >
              <MessageSquare size={17} />
              <span style={{ 
                position: 'absolute', 
                top: -4, 
                right: -4, 
                background: '#3b82f6', 
                color: '#fff', 
                fontSize: '0.65rem', 
                padding: '0.1rem 0.35rem', 
                borderRadius: '10px',
                fontWeight: 700 
              }}>
                {messages.length}
              </span>
            </button>

            <button 
              className="btn btn-outline"
              style={{ position: 'relative', padding: '0.5rem 0.8rem' }}
              onClick={() => setShowCartModal(true)}
              title="Ver Carrito de Compras"
            >
              <ShoppingCart size={17} />
              {cart.length > 0 && (
                <span style={{ 
                  position: 'absolute', 
                  top: -4, 
                  right: -4, 
                  background: '#10b981', 
                  color: '#fff', 
                  fontSize: '0.65rem', 
                  padding: '0.1rem 0.4rem', 
                  borderRadius: '10px',
                  fontWeight: 700 
                }}>
                  {cart.length}
                </span>
              )}
            </button>

            <button 
              className="btn btn-primary"
              onClick={() => setShowUploadModal(true)}
            >
              <Upload size={16} />
              <span>Publicar</span>
            </button>
          </div>
        </div>
      </header>

      {/* VISTA 1: CATÁLOGO GENERAL */}
      {activeTab === 'catalog' && !selectedFolder && (
        <main className="container" style={{ paddingTop: '2rem' }}>
          <div className="hero" style={{ padding: '1.5rem 0 2rem' }}>
            <h1 className="hero-title" style={{ fontSize: '2.3rem' }}>
              Catálogo de Activos 3D Curados <br />
              <span className="hero-gradient">Inspección Orbital en Tiempo Real</span>
            </h1>
            <p className="hero-subtitle" style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>
              Topología técnica verificada, materiales PBR estándar y descarga directa para tus pipelines de videojuegos y visualización.
            </p>
          </div>

          <div className="filters-bar">
            <div className="category-chips">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  className={`chip ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="filter-controls">
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <Filter size={15} /> Polígonos:
              </span>
              <select 
                className="select-filter"
                value={maxPolygonsFilter}
                onChange={(e) => setMaxPolygonsFilter(e.target.value)}
              >
                <option value="all">Cualquier Poligonaje</option>
                <option value="low">Low Poly (&lt; 10k)</option>
                <option value="mid">Mid Poly (10k - 30k)</option>
                <option value="high">High Poly (&gt; 30k)</option>
              </select>
            </div>
          </div>

          <div className="catalog-grid">
            {filteredModels.map(model => (
              <div key={model.id} className="model-card">
                <div className="card-viewer-container">
                  <span className={`card-badge ${model.price === 0 ? 'free' : ''}`}>
                    {model.price === 0 ? 'GRATIS' : `$${model.price.toFixed(2)} USD`}
                  </span>
                  
                  <model-viewer
                    src={model.fileUrl}
                    alt={model.title}
                    auto-rotate
                    rotation-per-second="20deg"
                    camera-controls
                    touch-action="pan-y"
                    shadow-intensity="1"
                    exposure="1"
                  ></model-viewer>
                </div>

                <div className="card-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                    <span className="card-category">{model.category}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.78rem', color: '#f59e0b', fontWeight: 700 }}>
                      <Star size={13} fill="#f59e0b" color="#f59e0b" /> {model.rating || 5.0}
                    </span>
                  </div>

                  <h3 className="card-title">{model.title}</h3>
                  <span className="card-creator">Por {model.creatorName}</span>

                  <div className="card-tech-specs">
                    <div className="spec-item" title="Polígonos">
                      <Layers size={13} color="#60a5fa" />
                      <span>{model.polygonCount.toLocaleString()} poly</span>
                    </div>
                    {model.isRigged && (
                      <div className="spec-item" title="Esqueleto / Rigged">
                        <Zap size={13} color="#10b981" />
                        <span>Rigged</span>
                      </div>
                    )}
                    {model.hasPbr && (
                      <div className="spec-item" title="Texturas PBR">
                        <Sparkles size={13} color="#c084fc" />
                        <span>PBR 2K</span>
                      </div>
                    )}
                  </div>

                  <div className="card-footer" style={{ gap: '0.5rem' }}>
                    <span className={`card-price ${model.price === 0 ? 'free' : ''}`}>
                      {model.price === 0 ? 'Libre' : `$${model.price.toFixed(2)}`}
                    </span>

                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button 
                        className="btn btn-outline"
                        style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem' }}
                        onClick={() => addToCart(model)}
                        title="Agregar al carrito"
                      >
                        <ShoppingCart size={15} />
                      </button>

                      <button 
                        className="btn btn-primary"
                        style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
                        onClick={() => setSelectedModel(model)}
                      >
                        <Eye size={15} />
                        <span>Ficha</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* VISTA 2: FOLDERS Y PORTAFOLIOS DEL CREADOR (HU-14 & HU-15) */}
      {activeTab === 'folders' && (
        <main className="container" style={{ paddingTop: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="card-category" style={{ fontSize: '0.85rem' }}>Portafolio de Creador</span>
              <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>
                {selectedFolder ? selectedFolder.name : "Folders de Trabajo de Oliver Saldívar"}
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                {selectedFolder ? selectedFolder.description : "Carpetas organizadas por temas, proyectos y encargos profesionales."}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.8rem' }}>
              {selectedFolder ? (
                <button 
                  className="btn btn-outline"
                  onClick={() => setSelectedFolder(null)}
                >
                  ← Ver Todas las Carpetas
                </button>
              ) : (
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowFolderModal(true)}
                >
                  <Plus size={16} />
                  <span>Nueva Carpeta de Trabajo</span>
                </button>
              )}
            </div>
          </div>

          {!selectedFolder ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
              {folders.map(f => (
                <div 
                  key={f.id} 
                  className="model-card"
                  style={{ cursor: 'pointer', padding: '1.5rem', background: 'var(--bg-card)' }}
                  onClick={() => setSelectedFolder(f)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ 
                      width: 50, 
                      height: 50, 
                      borderRadius: '12px', 
                      background: 'rgba(59, 130, 246, 0.15)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: '#3b82f6'
                    }}>
                      <FolderOpen size={26} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{f.name}</h3>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {f.modelIds ? f.modelIds.length : (f.models ? f.models.length : 2)} modelos asignados
                      </span>
                    </div>
                  </div>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                    {f.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                    <span style={{ fontSize: '0.8rem', color: '#60a5fa', fontWeight: 600 }}>Explorar Colección</span>
                    <ArrowRight size={16} color="#60a5fa" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <div className="catalog-grid">
                {models
                  .filter(m => (selectedFolder.modelIds ? selectedFolder.modelIds.includes(m.id) : true))
                  .map(model => (
                    <div key={model.id} className="model-card">
                      <div className="card-viewer-container">
                        <model-viewer
                          src={model.fileUrl}
                          alt={model.title}
                          auto-rotate
                          camera-controls
                          shadow-intensity="1"
                        ></model-viewer>
                      </div>

                      <div className="card-body">
                        <span className="card-category">{model.category}</span>
                        <h3 className="card-title">{model.title}</h3>
                        <div className="card-footer" style={{ marginTop: '1rem' }}>
                          <span className="card-price">${model.price.toFixed(2)}</span>
                          <button className="btn btn-primary" onClick={() => setSelectedModel(model)}>
                            <Eye size={15} /> Ficha Técnica
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </main>
      )}

      {/* VISTA 3: MI BIBLIOTECA (HU-22) */}
      {activeTab === 'library' && (
        <main className="container" style={{ paddingTop: '2.5rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <span className="card-category" style={{ fontSize: '0.85rem' }}>Mis Activos Comprados</span>
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Biblioteca Personal</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Modelos 3D adquiridos con licencia comercial y re-descarga ilimitada garantizada.
            </p>
          </div>

          {myLibrary.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
              <BookOpen size={48} style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
              <h3>Aún no has adquirido modelos 3D</h3>
              <p>Explora el catálogo y adquiere modelos para acceder a sus descargas permanentes.</p>
            </div>
          ) : (
            <div className="catalog-grid">
              {myLibrary.map(model => (
                <div key={model.id} className="model-card">
                  <div className="card-viewer-container">
                    <span className="card-badge" style={{ color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.4)' }}>
                      <CheckCircle2 size={13} /> Licencia Adquirida
                    </span>
                    <model-viewer
                      src={model.fileUrl}
                      alt={model.title}
                      camera-controls
                      auto-rotate
                    ></model-viewer>
                  </div>

                  <div className="card-body">
                    <span className="card-category">{model.category}</span>
                    <h3 className="card-title">{model.title}</h3>
                    <span className="card-creator">Por {model.creatorName}</span>

                    <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                      <a 
                        href={model.fileUrl} 
                        download 
                        target="_blank" 
                        rel="noreferrer"
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '0.7rem' }}
                      >
                        <Download size={16} />
                        <span>Descargar Archivo .GLB</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      )}

      {/* VISTA 4: PANEL DEL CREADOR / DASHBOARD (HU-19) */}
      {activeTab === 'dashboard' && (
        <main className="container" style={{ paddingTop: '2.5rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <span className="card-category" style={{ fontSize: '0.85rem' }}>Portal Creador</span>
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Panel de Ventas y Publicaciones</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Gestiona tus activos publicados, ajusta precios y revisa estadísticas de descargas e ingresos.
            </p>
          </div>

          {/* Tarjetas de Métricas */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem', marginBottom: '2.5rem' }}>
            <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Ingresos Totales</span>
                <DollarSign size={20} color="#10b981" />
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981' }}>${totalEarnings.toFixed(2)} USD</h2>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>+14% vs mes anterior</span>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Modelos Publicados</span>
                <Box size={20} color="#3b82f6" />
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{creatorModels.length} activos</h2>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Todos verificados</span>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Descargas Totales</span>
                <TrendingUp size={20} color="#8b5cf6" />
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{totalDownloads} descargas</h2>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Licencias activas</span>
            </div>
          </div>

          {/* Tabla de Gestión de Modelos Propios */}
          <div style={{ background: 'var(--bg-card)', borderRadius: '14px', border: '1px solid var(--border-color)', padding: '1.5rem', overflowX: 'auto' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.2rem' }}>Tus Modelos 3D Publicados</h3>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>Modelo</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Categoría</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Polígonos</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Precio</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Descargas</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {creatorModels.map(m => (
                  <tr key={m.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.9rem 1rem', fontWeight: 600 }}>{m.title}</td>
                    <td style={{ padding: '0.9rem 1rem', color: '#38bdf8' }}>{m.category}</td>
                    <td style={{ padding: '0.9rem 1rem', fontFamily: 'var(--font-mono)' }}>{m.polygonCount.toLocaleString()}</td>
                    <td style={{ padding: '0.9rem 1rem', fontWeight: 700 }}>${m.price.toFixed(2)}</td>
                    <td style={{ padding: '0.9rem 1rem' }}>{m.downloads || 25}</td>
                    <td style={{ padding: '0.9rem 1rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <button 
                          className="btn btn-outline" 
                          style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
                          onClick={() => setEditingModel(m)}
                        >
                          <Edit3 size={14} /> Editar
                        </button>
                        <button 
                          style={{ background: 'transparent', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#ef4444', padding: '0.35rem 0.6rem', borderRadius: '8px', cursor: 'pointer' }}
                          onClick={() => handleDeleteModel(m.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      )}

      {/* MODAL: EDITAR MODELO (HU-19) */}
      {editingModel && (
        <div className="modal-overlay" onClick={() => setEditingModel(null)}>
          <div className="modal-content" style={{ gridTemplateColumns: '1fr', maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setEditingModel(null)}>
              <X size={20} />
            </button>

            <div style={{ padding: '2rem' }}>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Edit3 size={20} color="#3b82f6" /> Editar Modelo Publicado
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                Actualiza el precio, descripción y categoría de tu activo 3D.
              </p>

              <form onSubmit={handleSaveEditModel}>
                <div className="form-group">
                  <label className="form-label">Título</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    required 
                    value={editingModel.title}
                    onChange={(e) => setEditingModel({ ...editingModel, title: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Precio en USD ($)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    className="form-input" 
                    required 
                    value={editingModel.price}
                    onChange={(e) => setEditingModel({ ...editingModel, price: parseFloat(e.target.value) || 0 })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Descripción</label>
                  <textarea 
                    className="form-textarea" 
                    rows={3} 
                    value={editingModel.description}
                    onChange={(e) => setEditingModel({ ...editingModel, description: e.target.value })}
                  ></textarea>
                </div>

                <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                  <button type="button" className="btn btn-outline" onClick={() => setEditingModel(null)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: FICHA TÉCNICA Y AUDITORÍA DE TOPOLOGÍA (ISO 9241:11, HU-08 & HU-09) */}
      {selectedModel && (
        <div className="modal-overlay" onClick={() => setSelectedModel(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedModel(null)}>
              <X size={20} />
            </button>

            {/* Panel Izquierdo: Visor 3D con Controles, Wireframe y Reproducción de Animación */}
            <div className="modal-viewer-pane">
              <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 10, display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button 
                  className={`chip ${!isWireframe ? 'active' : ''}`}
                  style={{ background: !isWireframe ? '#3b82f6' : 'rgba(15,23,42,0.8)', border: '1px solid rgba(255,255,255,0.2)' }}
                  onClick={() => setIsWireframe(false)}
                >
                  <Sparkles size={14} style={{ marginRight: '0.3rem' }} /> Materiales PBR
                </button>
                <button 
                  className={`chip ${isWireframe ? 'active' : ''}`}
                  style={{ background: isWireframe ? '#8b5cf6' : 'rgba(15,23,42,0.8)', border: '1px solid rgba(255,255,255,0.2)' }}
                  onClick={() => setIsWireframe(true)}
                >
                  <Layers size={14} style={{ marginRight: '0.3rem' }} /> Modo Wireframe
                </button>

                {selectedModel.isAnimated && (
                  <button 
                    className="chip"
                    style={{ background: 'rgba(15,23,42,0.85)', border: '1px solid rgba(255,255,255,0.2)', color: '#10b981' }}
                    onClick={() => setIsPlayingAnimation(!isPlayingAnimation)}
                  >
                    {isPlayingAnimation ? <Pause size={14} style={{ marginRight: '0.3rem' }} /> : <Play size={14} style={{ marginRight: '0.3rem' }} />}
                    {isPlayingAnimation ? 'Pausar Animación' : 'Reproducir'}
                  </button>
                )}
              </div>

              <model-viewer
                src={selectedModel.fileUrl}
                alt={selectedModel.title}
                camera-controls
                auto-rotate
                autoplay={isPlayingAnimation}
                shadow-intensity={isWireframe ? "0" : "1.5"}
                exposure={isWireframe ? "2" : "1.2"}
                style={{ height: '100%', minHeight: '460px', filter: isWireframe ? 'grayscale(1) invert(0.1)' : 'none' }}
              ></model-viewer>
            </div>

            {/* Panel Derecho: Ficha Técnica y Reseñas */}
            <div className="modal-details-pane">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="card-category">{selectedModel.category}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#f59e0b', fontWeight: 700 }}>
                  <Star size={15} fill="#f59e0b" color="#f59e0b" /> {selectedModel.rating || 5.0} / 5.0
                </span>
              </div>

              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{selectedModel.title}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1rem' }}>
                Creado por <strong style={{ color: 'var(--text-primary)' }}>{selectedModel.creatorName}</strong>
              </p>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.2rem', lineHeight: '1.5' }}>
                {selectedModel.description}
              </p>

              <h4 style={{ fontSize: '0.9rem', color: '#fff', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.3rem' }}>
                Topología y Especificaciones
              </h4>

              <table className="modal-spec-table">
                <tbody>
                  <tr>
                    <td>Conteo de Polígonos</td>
                    <td>{selectedModel.polygonCount.toLocaleString()} triángulos</td>
                  </tr>
                  <tr>
                    <td>Conteo de Vértices</td>
                    <td>{(selectedModel.vertexCount || selectedModel.polygonCount / 2).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Esqueleto (Rigging)</td>
                    <td>{selectedModel.isRigged ? '✓ Sí (Listo para animación)' : '✗ No incluido'}</td>
                  </tr>
                  <tr>
                    <td>Animación Embebida</td>
                    <td>{selectedModel.isAnimated ? '✓ Sí (Ciclos embebidos)' : '✗ Estático'}</td>
                  </tr>
                  <tr>
                    <td>Mapas PBR</td>
                    <td>{selectedModel.hasPbr ? 'Albedo, Roughness, Metalness, Normal (2K)' : 'Estándar'}</td>
                  </tr>
                  <tr>
                    <td>Licencia</td>
                    <td>{selectedModel.licenseType || 'Comercial Standard'}</td>
                  </tr>
                </tbody>
              </table>

              {/* Reseñas y Calificaciones Técnicas (HU-25) */}
              <div style={{ margin: '1rem 0', borderTop: '1px solid var(--border-color)', paddingTop: '0.8rem' }}>
                <h4 style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '0.6rem' }}>
                  Reseñas Técnicas de Compradores ({modelReviews.length})
                </h4>

                <div style={{ maxHeight: '110px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.8rem' }}>
                  {modelReviews.map(r => (
                    <div key={r.id} style={{ background: 'var(--bg-secondary)', padding: '0.6rem 0.8rem', borderRadius: '8px', fontSize: '0.82rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                        <strong style={{ color: '#60a5fa' }}>{r.authorName}</strong>
                        <span style={{ color: '#f59e0b' }}>{'★'.repeat(r.rating)}</span>
                      </div>
                      <p style={{ color: 'var(--text-secondary)' }}>{r.comment}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddReview} style={{ display: 'flex', gap: '0.5rem' }}>
                  <input 
                    type="text" 
                    className="search-input"
                    style={{ padding: '0.45rem 0.8rem', fontSize: '0.82rem' }}
                    placeholder="Escribe una reseña técnica..."
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                  />
                  <select 
                    className="select-filter"
                    value={newReviewRating}
                    onChange={(e) => setNewReviewRating(parseInt(e.target.value))}
                  >
                    <option value="5">5 ★</option>
                    <option value="4">4 ★</option>
                    <option value="3">3 ★</option>
                  </select>
                  <button type="submit" className="btn btn-primary" style={{ padding: '0.45rem 0.8rem', fontSize: '0.8rem' }}>
                    Publicar
                  </button>
                </form>
              </div>

              {/* Botones de Acción */}
              <div style={{ marginTop: 'auto', display: 'flex', gap: '0.6rem', flexDirection: 'column' }}>
                <button 
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.75rem' }}
                  onClick={() => addToCart(selectedModel)}
                >
                  <ShoppingCart size={17} />
                  <span>
                    {selectedModel.price === 0 ? 'Agregar Modelo Gratuito' : `Comprar por $${selectedModel.price.toFixed(2)} USD`}
                  </span>
                </button>

                <button 
                  className="btn btn-outline"
                  style={{ width: '100%', padding: '0.6rem' }}
                  onClick={() => openChatForModel(selectedModel)}
                >
                  <MessageSquare size={16} />
                  <span>Contactar a {selectedModel.creatorName}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CHAT Y MENSAJERÍA DIRECTA (HU-24) */}
      {showChatModal && (
        <div className="modal-overlay" onClick={() => setShowChatModal(false)}>
          <div className="modal-content" style={{ gridTemplateColumns: '1fr', maxWidth: '650px', height: '620px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowChatModal(false)}>
              <X size={20} />
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                  {chatPartner.charAt(0)}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{chatPartner}</h3>
                  <span style={{ fontSize: '0.78rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981' }}></span> En línea
                  </span>
                </div>
              </div>

              {chatModelContext && (
                <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '0.6rem 1.5rem', fontSize: '0.8rem', borderBottom: '1px solid rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#60a5fa' }}>
                  <Box size={14} /> Consulta sobre: <strong>{chatModelContext}</strong>
                </div>
              )}

              <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {messages.map(msg => {
                  const isMe = msg.senderName === currentUserName
                  return (
                    <div 
                      key={msg.id} 
                      style={{ 
                        alignSelf: isMe ? 'flex-end' : 'flex-start',
                        maxWidth: '80%',
                        background: isMe ? 'linear-gradient(135deg, #2563eb, #1d4ed8)' : 'var(--bg-secondary)',
                        padding: '0.85rem 1.1rem',
                        borderRadius: isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                        border: isMe ? 'none' : '1px solid var(--border-color)'
                      }}
                    >
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: isMe ? 'rgba(255,255,255,0.8)' : '#38bdf8', display: 'block', marginBottom: '0.2rem' }}>
                        {msg.senderName}
                      </span>
                      <p style={{ fontSize: '0.92rem', lineHeight: '1.4' }}>{msg.content}</p>
                      <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', display: 'block', textAlign: 'right', marginTop: '0.3rem' }}>
                        {msg.sentAt}
                      </span>
                    </div>
                  )
                })}
              </div>

              <form onSubmit={handleSendMessage} style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.75rem' }}>
                <input 
                  type="text" 
                  className="search-input"
                  style={{ paddingLeft: '1rem' }}
                  placeholder={`Escribir a ${chatPartner}...`}
                  value={newMessageText}
                  onChange={(e) => setNewMessageText(e.target.value)}
                />
                <button type="submit" className="btn btn-primary" style={{ padding: '0.65rem 1.2rem' }}>
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CARRITO DE COMPRAS Y CHECKOUT (HU-20 & HU-21) */}
      {showCartModal && (
        <div className="modal-overlay" onClick={() => setShowCartModal(false)}>
          <div className="modal-content" style={{ gridTemplateColumns: '1fr', maxWidth: '550px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowCartModal(false)}>
              <X size={20} />
            </button>

            <div style={{ padding: '2rem' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShoppingCart size={22} color="#10b981" /> Carrito de Compras
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                Revisa los modelos seleccionados para adquirir sus licencias comerciales.
              </p>

              {checkoutComplete ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <CheckCircle2 size={54} color="#10b981" style={{ margin: '0 auto 1rem' }} />
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>¡Transacción Completada!</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    Las licencias han sido asignadas a tu cuenta y los archivos .glb están listos en tu pestaña "Mi Biblioteca".
                  </p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => { setCheckoutComplete(false); setCart([]); setShowCartModal(false); setActiveTab('library'); }}
                  >
                    Ver en Mi Biblioteca
                  </button>
                </div>
              ) : cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                  <ShoppingCart size={40} style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
                  <p>Tu carrito está vacío actualmente.</p>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem', maxHeight: '280px', overflowY: 'auto' }}>
                    {cart.map(item => (
                      <div 
                        key={item.id}
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between', 
                          padding: '0.8rem 1rem', 
                          background: 'var(--bg-secondary)', 
                          borderRadius: '10px',
                          border: '1px solid var(--border-color)' 
                        }}
                      >
                        <div>
                          <h4 style={{ fontSize: '0.95rem' }}>{item.title}</h4>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Por {item.creatorName}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <span style={{ fontWeight: 700, color: item.price === 0 ? '#10b981' : '#fff' }}>
                            {item.price === 0 ? 'Gratis' : `$${item.price.toFixed(2)}`}
                          </span>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 800 }}>
                      <span>Total:</span>
                      <span style={{ color: '#3b82f6' }}>${cartTotal.toFixed(2)} USD</span>
                    </div>
                  </div>

                  <button 
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '0.85rem' }}
                    onClick={handleCheckoutSuccess}
                  >
                    <ShieldCheck size={18} />
                    <span>Confirmar Adquisición y Descargas</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: NUEVA CARPETA DE TRABAJO */}
      {showFolderModal && (
        <div className="modal-overlay" onClick={() => setShowFolderModal(false)}>
          <div className="modal-content" style={{ gridTemplateColumns: '1fr', maxWidth: '500px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowFolderModal(false)}>
              <X size={20} />
            </button>

            <div style={{ padding: '2rem' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FolderOpen size={22} color="#3b82f6" /> Crear Carpeta de Trabajo
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                Estructura tu portafolio agrupando modelos por temática o proyecto.
              </p>

              <form onSubmit={handleCreateFolder}>
                <div className="form-group">
                  <label className="form-label">Nombre de la Carpeta *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    required 
                    placeholder="Ej. Armas Medievales, Entornos Low-Poly"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Descripción</label>
                  <textarea 
                    className="form-textarea" 
                    rows={3} 
                    placeholder="Describe los activos que contiene esta colección..."
                    value={newFolderDesc}
                    onChange={(e) => setNewFolderDesc(e.target.value)}
                  ></textarea>
                </div>

                <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                  <button type="button" className="btn btn-outline" onClick={() => setShowFolderModal(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Crear Carpeta
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SUBIR MODELO 3D */}
      {showUploadModal && (
        <div className="modal-overlay" onClick={() => setShowUploadModal(false)}>
          <div className="modal-content" style={{ gridTemplateColumns: '1fr', maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowUploadModal(false)}>
              <X size={20} />
            </button>

            <div style={{ padding: '2rem' }}>
              <h2 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Upload size={22} color="#3b82f6" /> Publicar Modelo 3D
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Sube tu activo en formato .glb o .gltf. Se procesará y pondrá a disposición en el catálogo.
              </p>

              <form onSubmit={handleUploadSubmit}>
                <div className="form-group">
                  <label className="form-label">Título del Modelo *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    required 
                    placeholder="Ej. Espada Medieval Encantada"
                    value={uploadFormData.title}
                    onChange={(e) => setUploadFormData({ ...uploadFormData, title: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Descripción Técnica *</label>
                  <textarea 
                    className="form-textarea" 
                    rows={3} 
                    required
                    placeholder="Detalla el pipeline de texturas, UV unwrapping y uso previsto..."
                    value={uploadFormData.description}
                    onChange={(e) => setUploadFormData({ ...uploadFormData, description: e.target.value })}
                  ></textarea>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Categoría *</label>
                    <select 
                      className="form-select"
                      value={uploadFormData.category}
                      onChange={(e) => setUploadFormData({ ...uploadFormData, category: e.target.value })}
                    >
                      <option value="Personajes">Personajes</option>
                      <option value="Vehículos">Vehículos</option>
                      <option value="Arquitectura">Arquitectura</option>
                      <option value="Props">Props</option>
                      <option value="Criaturas">Criaturas</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Conteo de Polígonos *</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      required 
                      value={uploadFormData.polygonCount}
                      onChange={(e) => setUploadFormData({ ...uploadFormData, polygonCount: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Precio en USD ($0 para gratis) *</label>
                    <input 
                      type="number" 
                      step="0.01" 
                      className="form-input" 
                      required 
                      value={uploadFormData.price}
                      onChange={(e) => setUploadFormData({ ...uploadFormData, price: parseFloat(e.target.value) || 0 })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Nombre del Creador</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={uploadFormData.creatorName}
                      onChange={(e) => setUploadFormData({ ...uploadFormData, creatorName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Archivo 3D Binario (.glb, .gltf, .zip) *</label>
                  <input 
                    type="file" 
                    accept=".glb,.gltf,.zip"
                    required
                    className="form-input"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                  />
                </div>

                {uploadStatus && (
                  <div style={{ 
                    padding: '0.75rem', 
                    borderRadius: '8px', 
                    marginBottom: '1rem', 
                    fontSize: '0.88rem',
                    background: uploadStatus.includes('Error') ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                    color: uploadStatus.includes('Error') ? '#ef4444' : '#10b981'
                  }}>
                    {uploadStatus}
                  </div>
                )}

                <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                  <button type="button" className="btn btn-outline" onClick={() => setShowUploadModal(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <Upload size={16} /> Publicar en el Catálogo
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
