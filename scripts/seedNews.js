// Seed script to populate Firestore with forum news data
// Run with: node scripts/seedNews.js

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

// News data array — content in Spanish
const newsData = [
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
    titulo: "Mapa interactivo: Todos los Easter Eggs de vehículos secretos",
    descripcion: "Hemos recopilado la ubicación exacta de todos los vehículos ocultos y Easter Eggs relacionados con coches en el mapa de GTA Online. Desde el fantasma del Monte Gordo hasta el Imponte Ruiner oculto bajo el puente.",
    categoria: "Novedades",
    autor: "LS Explorers",
    fecha: "2026-01-10",
    imagen: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop",
    likes: 445,
    tags: ["Easter Eggs", "Mapa", "Secretos"]
  }
];

// Seed function to upload all news to Firestore
async function seedNews() {
  console.log("Starting news seed process...");
  const newsCollection = collection(db, "noticias");

  for (const news of newsData) {
    try {
      const docRef = await addDoc(newsCollection, news);
      console.log(`Added: "${news.titulo}" (ID: ${docRef.id})`);
    } catch (error) {
      console.error(`Error adding "${news.titulo}":`, error);
    }
  }

  console.log("\nSeed process complete! All news articles uploaded to Firestore.");
  process.exit(0);
}

seedNews();
