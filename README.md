<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<div align="center">
  <a href="https://github.com/CRACKXXXX/LSPA">
    <img src="public/lspa-logo.jpg" alt="LSPA Logo" width="120" height="120" style="border-radius:50%">
  </a>

  <h1 align="center">🏎️ Los Santos Performance Analyzer (LSPA)</h1>

  <p align="center">
    <strong>La base de datos definitiva de vehículos para GTA V Online</strong><br/>
    Estadísticas reales · Comparador VS · Minijuegos · Sistema de Niveles · Panel Admin
    <br /><br />
    <a href="https://github.com/CRACKXXXX/LSPA"><strong>📖 Ver Documentación »</strong></a>
    <br />
    <a href="https://github.com/CRACKXXXX/LSPA">Demo</a>
    ·
    <a href="https://github.com/CRACKXXXX/LSPA/issues">Reportar Bug</a>
    ·
    <a href="https://github.com/CRACKXXXX/LSPA/issues">Solicitar Feature</a>
  </p>

  ![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)
  ![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite)
  ![Chart.js](https://img.shields.io/badge/Chart.js-4.x-FF6384?style=for-the-badge&logo=chartdotjs)
  ![Leaflet](https://img.shields.io/badge/Leaflet-Maps-199900?style=for-the-badge&logo=leaflet)
</div>

---

## 📋 Tabla de Contenidos

- [Sobre el Proyecto](#-sobre-el-proyecto)
- [Características Principales](#-características-principales)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Arquitectura Técnica](#-arquitectura-técnica)
- [Instalación](#-instalación)
- [Scripts Disponibles](#-scripts-disponibles)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Sistema de Usuarios](#-sistema-de-usuarios)
- [Sistema de Gamificación](#-sistema-de-gamificación)
- [Base de Datos de Vehículos](#-base-de-datos-de-vehículos)
- [Páginas y Rutas](#-páginas-y-rutas)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Créditos y Recursos](#-créditos-y-recursos)
- [Contacto](#-contacto)

---

## 🚗 Sobre el Proyecto

**LSPA (Los Santos Performance Analyzer)** es una aplicación web completa que permite a los jugadores de GTA V/Online:

- 📊 Consultar estadísticas **reales** de más de **713 vehículos** (extraídas de los archivos del juego)
- ⚔️ Comparar vehículos cara a cara en el **Modo Versus**
- 🎮 Jugar **3 minijuegos** para ganar XP y subir de nivel
- 🏠 Gestionar un **Garaje Personal** con colección y etiquetas
- 📈 Visualizar **Analytics** de tu colección con gráficos
- 🏆 Competir en el **Leaderboard** global
- 🛡️ Administrar usuarios desde el **Panel Admin** (para admins)

La aplicación utiliza una estética **Cyberpunk/Neon** con modo oscuro, glassmorphism y animaciones fluidas.

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

---

## ✨ Características Principales

### 🏠 Catálogo de Vehículos (Home)
- Grid responsive con **713+ vehículos verificados**
- **Filtros avanzados**: por clase (Super, Muscle, SUV...), fabricante, precio
- **Búsqueda en tiempo real** por nombre
- **Ordenación**: velocidad, precio, aceleración, manejo
- Tarjetas con **código de colores** para estadísticas (verde=excelente, rosa=god-tier)
- Botón de **favoritos** para añadir al garaje

### ⚔️ Modo Versus (Comparador)
- Selección de 2 vehículos para comparación directa
- Visualización lado a lado de todas las estadísticas
- **Ganador destacado** en verde por cada categoría
- Estadísticas: Velocidad, Aceleración, Manejo, Frenada, Precio

### 🎮 Minijuegos Suite
| Juego | Descripción | Recompensa |
|-------|-------------|------------|
| **🔍 Adivina el Coche** | Identifica el vehículo borroso antes de que acabe el tiempo | +50-100 XP |
| **⬆️⬇️ Mayor o Menor** | ¿El siguiente coche es más rápido o más lento? | +25 XP por acierto |
| **⚔️ Batalla de Cartas** | Elige una estadística para vencer a la CPU | +100-150 XP por victoria |

### 🏠 Garaje Personal
- Colección privada vinculada a tu cuenta
- **Estados**: Obtenido ✅ | Pendiente 🎯 | Prioridad ⭐
- Estadísticas del garaje: valor total, velocidad media
- Sincronización con tu perfil público

### 📈 Analytics Dashboard
- **Gráfico de Pastel**: Distribución por clase de vehículo
- **Gráfico de Barras**: Estadísticas promedio
- **Valor Total** de tu colección
- Powered by **Chart.js**

### 🏆 Leaderboard
- Ranking global de usuarios por XP
- Top usuarios con avatares y niveles
- Actualización en tiempo real

### 👤 Sistema de Perfiles
- **Avatar personalizable** (URL de imagen)
- **Biografía** editable
- **Barra de Nivel/XP** visual
- **Récords de Minijuegos** (Mayor/Menor, Adivina, Batalla)
- Estadísticas: coches en garaje, valor total, nivel

### 🛡️ Panel de Administración
- Acceso exclusivo para **Admins** y **Owners**
- **Listar usuarios**: ver todos los registrados
- **Editar perfiles**: nombre, bio, XP, nivel, avatar, contraseña
- **Gestión de roles**: promover/degradar usuarios
- **Eliminar usuarios** (con protección jerárquica)

### 📖 Guía y FAQ
- Explicación detallada de estadísticas
- Tabla de recompensas XP
- **FAQ con acordeón** colapsable
- Guía de uso de cada funcionalidad

### 🗺️ Ubicación (Mapa)
- Mapa interactivo de **Los Santos** con Leaflet
- Formulario de contacto
- Información de la "agencia"

### ⚖️ Páginas Legales
- Términos de Servicio
- Política de Privacidad
- Página 404 temática

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

---

## 🏗️ Arquitectura Técnica

```
src/
├── components/           # Componentes reutilizables
│   ├── header/          # Navegación principal
│   ├── footer/          # Pie de página
│   ├── vehicle-card/    # Tarjeta de vehículo
│   ├── charts/          # Componentes de gráficos
│   └── auth/            # Componentes de autenticación
├── context/             # Estado global (React Context)
│   ├── AuthContext.jsx        # Autenticación y usuarios
│   ├── GarageContext.jsx      # Gestión del garaje
│   └── GamificationContext.jsx # XP, niveles, récords
├── pages/               # Páginas de la aplicación
│   ├── home/            # Catálogo principal
│   ├── versus-mode/     # Comparador
│   ├── garage/          # Garaje personal
│   ├── profile/         # Perfil de usuario
│   ├── admin/           # Panel de administración
│   ├── analytics/       # Dashboard de análisis
│   ├── leaderboard/     # Clasificación global
│   ├── battle-game/     # Minijuego: Batalla
│   ├── guess-game/      # Minijuego: Adivina
│   ├── minigames/       # Minijuego: Mayor/Menor
│   ├── guide/           # Guía y FAQ
│   ├── location/        # Mapa y contacto
│   ├── legal/           # Páginas legales
│   └── auth/            # Login/Registro
├── data/
│   └── vehicles.json    # Base de datos de vehículos
└── scripts/
    ├── import-vehicles.js     # Importador de vehículos
    └── sanitize-vehicles.js   # Validador con doble filtro
```

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

---

## 🚀 Instalación

### Prerrequisitos
- Node.js 18.x o superior
- npm 9.x o superior

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/CRACKXXXX/LSPA.git
cd LSPA

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build de Producción

```bash
npm run build
npm run preview
```

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

---

## 📜 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo (Vite) |
| `npm run build` | Compilar para producción |
| `npm run preview` | Previsualizar build |
| `npm run lint` | Ejecutar ESLint |
| `node scripts/import-vehicles.js` | Importar vehículos desde DurtyFree |
| `node scripts/sanitize-vehicles.js` | Validar vehículos (imagen + stats) |

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

---

## 👥 Sistema de Usuarios

### Autenticación
- **Registro** con usuario, email y contraseña
- **Login** con persistencia de sesión (localStorage)
- **Roles**: `user`, `admin`, `owner`

### Jerarquía de Permisos
| Rol | Puede hacer |
|-----|-------------|
| **User** | Ver catálogo, gestionar garaje, jugar minijuegos |
| **Admin** | Todo lo anterior + Panel Admin (gestionar usuarios, no puede editar owners) |
| **Owner** | Todo lo anterior + Promover/degradar admins, editar cualquier usuario |

### Datos de Usuario
```javascript
{
  id: "uuid",
  username: "string",
  email: "string",
  password: "hashed",
  role: "user|admin|owner",
  avatar: "url",
  bio: "string",
  level: 1,
  xp: 0,
  garage: [],
  highScores: {
    higherLower: 0,
    guessCar: 0,
    battleWinStreak: 0
  }
}
```

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

---

## 🎮 Sistema de Gamificación

### Ganar XP

| Acción | XP |
|--------|-----|
| Añadir vehículo al garaje | +10 XP |
| Acierto en Adivina el Coche | +50-100 XP |
| Acierto en Mayor/Menor | +25 XP |
| Victoria en Batalla de Cartas | +100-150 XP |
| Completar perfil | +50 XP |

### Fórmula de Nivel
```
Nivel = floor(√(XP / 100))
```

| Nivel | XP Requerido |
|-------|--------------|
| 1 | 0 |
| 2 | 400 |
| 3 | 900 |
| 4 | 1,600 |
| 5 | 2,500 |

### Récords
Los mejores resultados de cada minijuego se guardan automáticamente en tu perfil:
- **Mayor/Menor**: Mejor racha de aciertos
- **Adivina el Coche**: Puntuación máxima
- **Batalla**: Mejor racha de victorias

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

---

## 🚗 Base de Datos de Vehículos

### Fuente de Datos
- **Origen**: [DurtyFree/gta-v-data-dumps](https://github.com/DurtyFree/gta-v-data-dumps)
- **Imágenes**: [kevinldg/gtav-vehicle-database](https://github.com/kevinldg/gtav-vehicle-database)

### Script de Sanitización
El script `sanitize-vehicles.js` aplica una **doble validación**:

1. **Validación de Imagen**: HTTP HEAD request para verificar que la imagen existe (status 200)
2. **Validación de Estadísticas**: Comprueba que `MaxSpeed`, `fDriveForce` y `fTractionCurveMax` > 0

Solo los vehículos que pasen AMBAS pruebas se incluyen en la base de datos.

### Estructura de Vehículo
```javascript
{
  id: "zentorno",
  model: "zentorno",
  name: "Zentorno",
  manufacturer: "Pegassi",
  class: "Super",
  seats: 2,
  stats: {
    speed: "9.5",        // Normalizado 0-10
    acceleration: "8.7",
    handling: "7.2",
    braking: "6.5",
    realKMH: 213,        // Velocidad real en km/h
    realMPH: 132
  },
  price: 725000,
  image: "https://...zentorno.png",
  isWeaponized: false,
  hasImaniTech: false,
  isHsw: false
}
```

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

---

## 🗺️ Páginas y Rutas

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/` | Home | Catálogo de vehículos |
| `/versus` | Versus Mode | Comparador de 2 vehículos |
| `/garage` | Garaje | Colección personal |
| `/profile` | Perfil | Tu perfil y estadísticas |
| `/analytics` | Analytics | Dashboard con gráficos |
| `/leaderboard` | Leaderboard | Ranking global |
| `/games/guess` | Adivina | Minijuego |
| `/games/battle` | Batalla | Minijuego |
| `/games/higherlower` | Mayor/Menor | Minijuego |
| `/guide` | Guía | FAQ y documentación |
| `/location` | Ubicación | Mapa y contacto |
| `/admin` | Panel Admin | Gestión de usuarios (solo admins) |
| `/login` | Login | Iniciar sesión |
| `/register` | Registro | Crear cuenta |
| `/terms` | Términos | Términos de servicio |
| `/privacy` | Privacidad | Política de privacidad |

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** - Biblioteca UI
- **Vite 5** - Build tool
- **React Router DOM 6** - Navegación SPA
- **CSS3** - Estilos con variables y glassmorphism

### Visualización
- **Chart.js 4** - Gráficos (Analytics)
- **Leaflet** - Mapas interactivos

### Estado Global
- **React Context API** - AuthContext, GarageContext, GamificationContext

### Datos
- **JSON** - Base de datos de vehículos
- **localStorage** - Persistencia de sesión y datos de usuario

### Herramientas
- **ESLint** - Linting
- **Axios** - Peticiones HTTP (scripts)

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

---

## 🙏 Créditos y Recursos

### Datos de Vehículos
- [DurtyFree/gta-v-data-dumps](https://github.com/DurtyFree/gta-v-data-dumps) - Datos extraídos del juego
- [kevinldg/gtav-vehicle-database](https://github.com/kevinldg/gtav-vehicle-database) - Imágenes de vehículos

### Inspiración de Diseño
- Estética **Cyberpunk 2077** y **GTA Online**
- [Gaming Dashboard UI Kit](https://www.figma.com/community/file/1169620831636988223)

### Documentación y Tutoriales
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/)
- [Chart.js Docs](https://www.chartjs.org/)
- [React Leaflet](https://react-leaflet.js.org/)

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

---

## 📞 Contacto

**Proyecto LSPA** - [GitHub Repository](https://github.com/CRACKXXXX/LSPA)

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

---

<div align="center">
  <sub>Desarrollado con ❤️ para la comunidad de GTA V</sub>
</div>
