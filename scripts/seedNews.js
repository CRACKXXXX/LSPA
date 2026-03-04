// Seed script to populate Firestore with forum news data
// Run with: node scripts/seed-news.js

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPDjE4Xqn4HINCy_oxNvR4OxnNcjw4wkI",
  authDomain: "lspa-joel.firebaseapp.com",
  projectId: "lspa-joel",
  storageBucket: "lspa-joel.firebasestorage.app",
  messagingSenderId: "96316117978",
  appId: "1:96316117978:web:186d8774afaecb232866e3",
  measurementId: "G-12748SLGT8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// News data array — content in Spanish, 30+ articles
const newsData = [
  // ========== GTA Online ==========
  {
    titulo: "Rockstar confirma el Benefactor Krieger 2.0 para GTA Online",
    descripcion: "El esperado superdeportivo llega con mejoras aerodinámicas y un motor V12 biturbo que promete superar los 350 km/h en las calles de Los Santos. Los jugadores podrán personalizarlo con más de 50 opciones de modificación en el taller de LS Customs.",
    categoria: "GTA Online",
    autor: "LS Noticias",
    fecha: "2026-02-20",
    imagen: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop",
    likes: 245,
    tags: ["GTA Online", "Superdeportivo", "Actualización"]
  },
  {
    titulo: "Nuevo DLC 'Santos Underground' confirmado para marzo",
    descripcion: "Rockstar anuncia oficialmente el DLC que traerá carreras callejeras ilegales, un nuevo sistema de apuestas, 12 vehículos inéditos y una historia completamente nueva ambientada en los bajos fondos de Los Santos.",
    categoria: "GTA Online",
    autor: "LS Noticias",
    fecha: "2026-02-03",
    imagen: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=400&fit=crop",
    likes: 678,
    tags: ["DLC", "GTA Online", "Carreras Callejeras"]
  },
  {
    titulo: "Cómo ganar la carrera del casino todas las semanas",
    descripcion: "Trucos y estrategias para maximizar tus posibilidades en la ruleta del Diamond Casino y llevarte el vehículo semanal. Analizamos las probabilidades y los mejores momentos para girar la rueda de la fortuna.",
    categoria: "GTA Online",
    autor: "Casino Tips LS",
    fecha: "2026-01-28",
    imagen: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&h=400&fit=crop",
    likes: 567,
    tags: ["Casino", "Trucos", "Vehículo Gratis"]
  },
  {
    titulo: "Modo Supervivencia Extrema: 100 jugadores, 1 ganador",
    descripcion: "El nuevo modo de juego enfrenta a 100 jugadores en una isla al norte de Los Santos. Sin respawn, sin tiendas, solo lo que encuentres en el mapa. El último superviviente recibe 50 millones de GTA$ y un trofeo exclusivo.",
    categoria: "GTA Online",
    autor: "LS Noticias",
    fecha: "2026-01-05",
    imagen: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=600&h=400&fit=crop",
    likes: 723,
    tags: ["Battle Royale", "Supervivencia", "Modo Nuevo"]
  },
  {
    titulo: "La economía de GTA Online en 2026: precios y estrategias",
    descripcion: "Análisis completo de cómo han evolucionado los precios de vehículos, propiedades y negocios en GTA Online. Te mostramos las mejores formas de generar dinero en solitario y en grupo para maximizar tus ganancias.",
    categoria: "GTA Online",
    autor: "Financial LS",
    fecha: "2025-12-28",
    imagen: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&h=400&fit=crop",
    likes: 334,
    tags: ["Economía", "Dinero", "Estrategia"]
  },
  {
    titulo: "Nuevo sistema de clanes y territorios en GTA Online",
    descripcion: "Rockstar introduce un sistema de control territorial donde los clanes pueden conquistar y defender zonas de Los Santos. Cada territorio genera ingresos pasivos y ofrece ventajas exclusivas como descuentos en armamento y acceso a misiones especiales.",
    categoria: "GTA Online",
    autor: "LS Noticias",
    fecha: "2025-12-15",
    imagen: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop",
    likes: 489,
    tags: ["Clanes", "Territorios", "PvP"]
  },

  // ========== Coches Reales ==========
  {
    titulo: "El nuevo Bugatti Tourbillon alcanza los 445 km/h en pruebas",
    descripcion: "Bugatti ha desvelado el sucesor del Chiron con un motor híbrido V16 de 1.800 CV. Las pruebas en circuito confirman que es el coche de producción más rápido jamás fabricado, superando todas las expectativas de la industria.",
    categoria: "Coches Reales",
    autor: "Motor Total",
    fecha: "2026-02-18",
    imagen: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop",
    likes: 189,
    tags: ["Bugatti", "Récord", "Hiperdeportivo"]
  },
  {
    titulo: "Lamborghini Revuelto: El híbrido que cambia las reglas",
    descripcion: "Con 1.015 CV combinados entre su V12 atmosférico y tres motores eléctricos, el Lamborghini Revuelto redefine lo que significa ser un superdeportivo en 2026. Probamos sus modos de conducción en las carreteras de Italia.",
    categoria: "Coches Reales",
    autor: "Motor Total",
    fecha: "2026-02-08",
    imagen: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=600&h=400&fit=crop",
    likes: 267,
    tags: ["Lamborghini", "Híbrido", "Superdeportivo"]
  },
  {
    titulo: "Ferrari F80: El futuro del Cavallino Rampante",
    descripcion: "Ferrari presenta su primer hiperdeportivo con motor V6 biturbo híbrido de 1.200 CV. Con un diseño inspirado en la F1, el F80 promete ser el coche más extremo jamás creado por la marca italiana.",
    categoria: "Coches Reales",
    autor: "Motor Total",
    fecha: "2026-02-01",
    imagen: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop",
    likes: 345,
    tags: ["Ferrari", "Hiperdeportivo", "Presentación"]
  },
  {
    titulo: "Porsche 911 GT3 RS 2026: Pura adrenalina en circuito",
    descripcion: "El nuevo GT3 RS llega con un motor bóxer de 4.0 litros atmosférico que alcanza las 9.500 RPM. Su aerodinámica activa genera más de 800 kg de carga descendente, convirtiéndolo en el 911 de calle más radical de la historia.",
    categoria: "Coches Reales",
    autor: "Motor Total",
    fecha: "2026-01-22",
    imagen: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=600&h=400&fit=crop",
    likes: 298,
    tags: ["Porsche", "GT3 RS", "Circuito"]
  },
  {
    titulo: "Tesla Roadster 2026: ¿El eléctrico más rápido del mundo?",
    descripcion: "Tesla confirma las especificaciones finales del Roadster: 0-100 km/h en 1.1 segundos con el paquete SpaceX. Una batería de 200 kWh ofrece más de 1.000 km de autonomía. La revolución eléctrica alcanza un nuevo nivel.",
    categoria: "Coches Reales",
    autor: "EV World",
    fecha: "2026-01-12",
    imagen: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&h=400&fit=crop",
    likes: 412,
    tags: ["Tesla", "Eléctrico", "Récord"]
  },
  {
    titulo: "McLaren W1: El sucesor del P1 rompe récords en Nürburgring",
    descripcion: "El McLaren W1 ha completado una vuelta al Nürburgring Nordschleife en 6:24.3, convirtiéndose en el coche de producción más rápido en el circuito alemán. Su motor V8 híbrido de 1.275 CV demuestra la supremacía tecnológica británica.",
    categoria: "Coches Reales",
    autor: "Track Day Magazine",
    fecha: "2025-12-20",
    imagen: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop",
    likes: 521,
    tags: ["McLaren", "Nürburgring", "Récord"]
  },
  {
    titulo: "Aston Martin Valkyrie: Prueba en pista del F1 de calle",
    descripcion: "Ponemos a prueba el Aston Martin Valkyrie en el circuito de Silverstone. Con su motor V12 Cosworth de 1.160 CV y aerodinámica de F1, este hiperdeportivo desafía los límites de lo posible en un coche homologado para la calle.",
    categoria: "Coches Reales",
    autor: "Motor Total",
    fecha: "2025-12-10",
    imagen: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&h=400&fit=crop",
    likes: 376,
    tags: ["Aston Martin", "Valkyrie", "Prueba"]
  },

  // ========== Tuning ==========
  {
    titulo: "Guía completa de Tuning: Cómo preparar tu Elegy RH8",
    descripcion: "Descubre las mejores combinaciones de motor, transmisión y suspensión para convertir tu Elegy RH8 en una máquina de carreras imbatible. Incluye configuraciones para drift y circuito con presupuestos detallados.",
    categoria: "Tuning",
    autor: "GTA Mechanics",
    fecha: "2026-02-15",
    imagen: "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=600&h=400&fit=crop",
    likes: 312,
    tags: ["Tuning", "Elegy", "Guía"]
  },
  {
    titulo: "Top 10 coches para drift en GTA Online (Actualizado 2026)",
    descripcion: "Analizamos los mejores vehículos para hacer drift en Los Santos, incluyendo configuraciones de suspensión, neumáticos y la relación perfecta entre potencia y tracción. El Karin Futo GTX sigue siendo el rey indiscutible.",
    categoria: "Tuning",
    autor: "Drift Kings LS",
    fecha: "2026-02-05",
    imagen: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop",
    likes: 423,
    tags: ["Drift", "Top 10", "Tuning"]
  },
  {
    titulo: "Body kits más populares para el Jester RR en 2026",
    descripcion: "Repasamos los kits de carrocería más descargados y utilizados para transformar el Dinka Jester RR en una bestia visual. Desde estilos JDM hasta aero packages de competición, hay opciones para todos los gustos.",
    categoria: "Tuning",
    autor: "GTA Mechanics",
    fecha: "2026-01-20",
    imagen: "https://images.unsplash.com/photo-1525609004556-c46c64cc44e0?w=600&h=400&fit=crop",
    likes: 201,
    tags: ["Body Kit", "Jester RR", "JDM"]
  },
  {
    titulo: "Wraps y vinilos personalizados: Las mejores creaciones de la comunidad",
    descripcion: "Recopilamos los diseños de pintura y vinilos más creativos creados por la comunidad de GTA Online. Desde réplicas de coches de F1 hasta diseños anime y culturales, la creatividad no tiene límites en LS Customs.",
    categoria: "Tuning",
    autor: "Vinyl Masters",
    fecha: "2025-12-30",
    imagen: "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?w=600&h=400&fit=crop",
    likes: 356,
    tags: ["Vinilos", "Pintura", "Comunidad"]
  },
  {
    titulo: "Motor swap: Cómo cambiar el motor de cualquier vehículo",
    descripcion: "Tutorial paso a paso para realizar un motor swap en GTA Online. Aprende a instalar motores V8, V10 y V12 en coches que originalmente no los tienen, desbloqueando potencias increíbles y nuevas posibilidades de tuning.",
    categoria: "Tuning",
    autor: "GTA Mechanics",
    fecha: "2025-12-18",
    imagen: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop",
    likes: 445,
    tags: ["Motor Swap", "Tutorial", "Mecánica"]
  },
  {
    titulo: "Comparativa: Mejor sistema de escape para superdeportivos",
    descripcion: "Probamos los 5 sistemas de escape disponibles en LS Customs para superdeportivos. Analizamos el sonido, la ganancia de potencia y el efecto visual de cada opción. El escape de titanio race se lleva la corona por rendimiento puro.",
    categoria: "Tuning",
    autor: "Sound & Speed LS",
    fecha: "2025-12-05",
    imagen: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop",
    likes: 278,
    tags: ["Escape", "Sonido", "Comparativa"]
  },

  // ========== Carreras ==========
  {
    titulo: "Gran Premio de Los Santos: Resultados de la temporada 2026",
    descripcion: "La liga de carreras más competitiva de GTA Online ha llegado a su final con una emocionante carrera en el circuito del aeropuerto. El equipo 'Redwood Racing' se corona campeón tras una remontada épica en las últimas vueltas.",
    categoria: "Carreras",
    autor: "Racing Weekly",
    fecha: "2026-02-12",
    imagen: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&h=400&fit=crop",
    likes: 178,
    tags: ["Carreras", "Liga", "Competición"]
  },
  {
    titulo: "Circuito nocturno del muelle: Nueva carrera disponible",
    descripcion: "Una nueva carrera por las calles iluminadas del muelle de Los Santos está disponible en el modo carreras. Con curvas cerradas, saltos espectaculares y vistas del océano, es perfecta para competir con amigos.",
    categoria: "Carreras",
    autor: "Racing Weekly",
    fecha: "2026-01-25",
    imagen: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&h=400&fit=crop",
    likes: 134,
    tags: ["Carreras", "Nocturno", "Nueva"]
  },
  {
    titulo: "Campeonato de Drag Racing: Inscripciones abiertas",
    descripcion: "El mayor campeonato de carreras de aceleración de GTA Online abre sus inscripciones. Con premios de hasta 10 millones de GTA$ y un vehículo exclusivo para el ganador, la competición promete ser la más intensa del año.",
    categoria: "Carreras",
    autor: "Racing Weekly",
    fecha: "2026-01-15",
    imagen: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&h=400&fit=crop",
    likes: 389,
    tags: ["Drag Racing", "Campeonato", "Premios"]
  },
  {
    titulo: "Rally extremo por el Monte Chiliad: Ruta y consejos",
    descripcion: "La carrera más peligrosa de GTA Online te lleva desde la cima del Monte Chiliad hasta la costa. Compartimos la mejor ruta, los vehículos recomendados y las técnicas de conducción para sobrevivir a las curvas más traicioneras.",
    categoria: "Carreras",
    autor: "Off-Road Legends",
    fecha: "2025-12-22",
    imagen: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=400&fit=crop",
    likes: 287,
    tags: ["Rally", "Monte Chiliad", "Off-Road"]
  },
  {
    titulo: "F1 callejera en Vinewood: El circuito urbano definitivo",
    descripcion: "La comunidad ha creado un circuito urbano inspirado en Mónaco por las calles de Vinewood. Con 23 curvas, un túnel y una recta principal junto al paseo de la fama, es el escenario perfecto para carreras de monoplazas.",
    categoria: "Carreras",
    autor: "Racing Weekly",
    fecha: "2025-12-08",
    imagen: "https://images.unsplash.com/photo-1541348263662-e068662d82af?w=600&h=400&fit=crop",
    likes: 198,
    tags: ["F1", "Circuito Urbano", "Vinewood"]
  },
  {
    titulo: "Endurance 24h de Los Santos: Resumen del evento",
    descripcion: "El evento de resistencia más largo de GTA Online ha concluido. 48 equipos compitieron durante 24 horas reales en un circuito alrededor de la ciudad. El equipo 'Nightshade Motorsport' se alzó con la victoria tras una gestión impecable de neumáticos.",
    categoria: "Carreras",
    autor: "Endurance LS",
    fecha: "2025-11-25",
    imagen: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=600&h=400&fit=crop",
    likes: 567,
    tags: ["Endurance", "24 Horas", "Resistencia"]
  },

  // ========== Novedades ==========
  {
    titulo: "GTA 6: Nuevas imágenes filtradas muestran el sistema de garajes",
    descripcion: "Supuestas capturas de pantalla revelan un sistema de garajes completamente renovado con interacción física, herramientas de personalización avanzadas y la posibilidad de caminar libremente por el taller mientras modificas tu vehículo.",
    categoria: "Novedades",
    autor: "Gaming Insider",
    fecha: "2026-02-10",
    imagen: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&h=400&fit=crop",
    likes: 534,
    tags: ["GTA 6", "Filtración", "Garajes"]
  },
  {
    titulo: "Rockstar añade modo foto mejorado en la última actualización",
    descripcion: "La nueva actualización trae un modo foto completamente renovado con filtros cinematográficos, control de profundidad de campo avanzado y la posibilidad de crear composiciones con hasta 3 vehículos simultáneos.",
    categoria: "Novedades",
    autor: "LS Noticias",
    fecha: "2026-01-18",
    imagen: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop",
    likes: 156,
    tags: ["Modo Foto", "Actualización", "Fotografía"]
  },
  {
    titulo: "Mapa interactivo: Todos los Easter Eggs de vehículos secretos",
    descripcion: "Hemos recopilado la ubicación exacta de todos los vehículos ocultos y Easter Eggs relacionados con coches en el mapa de GTA Online. Desde el fantasma del Monte Gordo hasta el Imponte Ruiner oculto bajo el puente.",
    categoria: "Novedades",
    autor: "LS Explorers",
    fecha: "2026-01-10",
    imagen: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop",
    likes: 445,
    tags: ["Easter Eggs", "Mapa", "Secretos"]
  },
  {
    titulo: "GTA 6 tendrá sistema meteorológico dinámico que afecta la conducción",
    descripcion: "Según nuevos informes, GTA 6 incluirá un sistema de clima en tiempo real que afectará directamente la física de conducción. La lluvia reducirá el agarre, la nieve hará patinar los coches y las tormentas limitarán la visibilidad.",
    categoria: "Novedades",
    autor: "Gaming Insider",
    fecha: "2025-12-25",
    imagen: "https://images.unsplash.com/photo-1534996858221-380b92700493?w=600&h=400&fit=crop",
    likes: 612,
    tags: ["GTA 6", "Clima", "Física"]
  },
  {
    titulo: "Actualización semanal: Descuentos en vehículos militares",
    descripcion: "Esta semana GTA Online ofrece hasta un 40% de descuento en todos los vehículos militares, incluyendo el Khanjali, el Hydra y el nuevo APC blindado. Además, las misiones de Búnker pagan el doble de recompensas.",
    categoria: "Novedades",
    autor: "LS Noticias",
    fecha: "2025-12-01",
    imagen: "https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=600&h=400&fit=crop",
    likes: 234,
    tags: ["Descuentos", "Militar", "Semanal"]
  },
  {
    titulo: "Rockstar prepara evento navideño con nieve y regalos exclusivos",
    descripcion: "Como cada año, Los Santos se cubrirá de nieve durante las fiestas navideñas. Este año, los jugadores que inicien sesión entre el 24 y el 31 de diciembre recibirán un vehículo exclusivo, un traje festivo y 1 millón de GTA$.",
    categoria: "Novedades",
    autor: "LS Noticias",
    fecha: "2025-11-28",
    imagen: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=400&fit=crop",
    likes: 678,
    tags: ["Navidad", "Nieve", "Regalos"]
  }
];

// Seed function to upload all news to Firestore
async function seedNews() {
  console.log("Starting news seed process...");
  console.log(`Total articles to upload: ${newsData.length}`);
  const newsCollection = collection(db, "noticias");

  let success = 0;
  let failed = 0;

  for (const news of newsData) {
    try {
      const docRef = await addDoc(newsCollection, news);
      success++;
      console.log(`[${success}/${newsData.length}] Added: "${news.titulo}" (ID: ${docRef.id})`);
    } catch (error) {
      failed++;
      console.error(`[ERROR] "${news.titulo}":`, error.message);
    }
  }

  console.log(`\nSeed complete! ${success} uploaded, ${failed} failed.`);
  process.exit(0);
}

seedNews();
