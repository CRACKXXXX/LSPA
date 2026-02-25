// Extra seed script — adds 63 more articles to reach 100 total
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

const extraNews = [
  // ========== GTA Online (13 more) ==========
  {
    titulo: "Nuevo negocio de contrabando de coches exóticos en GTA Online",
    descripcion: "Rockstar introduce una red de contrabando de vehículos exóticos. Los jugadores podrán robar, modificar y exportar coches de lujo a compradores internacionales, ganando hasta 5 millones por envío completo.",
    categoria: "GTA Online", autor: "LS Noticias", fecha: "2026-03-01",
    imagen: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=600&h=400&fit=crop",
    likes: 456, tags: ["Contrabando", "Negocios", "Coches Exóticos"]
  },
  {
    titulo: "Actualización del sistema de policía en GTA Online",
    descripcion: "La policía de Los Santos ahora utiliza helicópteros con visión nocturna, perros rastreadores y unidades SWAT mejoradas. Escapar de niveles altos de búsqueda es más difícil que nunca.",
    categoria: "GTA Online", autor: "LS Noticias", fecha: "2026-02-28",
    imagen: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&h=400&fit=crop",
    likes: 321, tags: ["Policía", "Actualización", "IA"]
  },
  {
    titulo: "Los 5 garajes más exclusivos de Los Santos",
    descripcion: "Desde el penthouse del Diamond Casino hasta la base subterránea en el Monte Chiliad, repasamos los garajes más caros y espectaculares donde guardar tu colección de vehículos.",
    categoria: "GTA Online", autor: "LS Property", fecha: "2026-02-25",
    imagen: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop",
    likes: 234, tags: ["Garajes", "Propiedades", "Lujo"]
  },
  {
    titulo: "Misiones de atraco al banco con drones: nueva jugabilidad",
    descripcion: "Los atracos ahora permiten usar drones de reconocimiento para planificar la entrada. El drone puede desactivar alarmas, marcar guardias y abrir ventilaciones para una infiltración sigilosa perfecta.",
    categoria: "GTA Online", autor: "Heist Masters", fecha: "2026-02-22",
    imagen: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=600&h=400&fit=crop",
    likes: 567, tags: ["Atracos", "Drones", "Estrategia"]
  },
  {
    titulo: "Torneo internacional de carreras: Europa vs América",
    descripcion: "El primer torneo intercontinental de GTA Online enfrenta a los mejores pilotos europeos contra los americanos en 12 circuitos. Las eliminatorias comienzan la próxima semana con premios de 100 millones de GTA$.",
    categoria: "GTA Online", autor: "Racing eSports", fecha: "2026-02-19",
    imagen: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&h=400&fit=crop",
    likes: 445, tags: ["Torneo", "eSports", "Internacional"]
  },
  {
    titulo: "Sistema de reputación callejera: gana respeto en cada barrio",
    descripcion: "El nuevo sistema de reputación permite a los jugadores ganar influencia en distintos barrios de Los Santos. A mayor reputación, mejores precios en tiendas locales, acceso a misiones exclusivas y protección de bandas aliadas.",
    categoria: "GTA Online", autor: "Street Life LS", fecha: "2026-02-16",
    imagen: "https://images.unsplash.com/photo-1517404215738-15263e9f9178?w=600&h=400&fit=crop",
    likes: 389, tags: ["Reputación", "Barrios", "RPG"]
  },
  {
    titulo: "Apertura del concesionario Legendary Motorsport renovado",
    descripcion: "Legendary Motorsport reabre sus puertas con un showroom interactivo donde puedes ver los coches en 3D, probarlos en un circuito privado y configurar cada detalle antes de comprar.",
    categoria: "GTA Online", autor: "LS Noticias", fecha: "2026-02-13",
    imagen: "https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=600&h=400&fit=crop",
    likes: 278, tags: ["Concesionario", "Showroom", "Compras"]
  },
  {
    titulo: "Nuevo modo Taxi: conduce pasajeros por Los Santos",
    descripcion: "El modo Taxi permite a los jugadores ganar dinero llevando pasajeros NPCs por la ciudad. Cuanto más rápido y seguro conduzcas, mejores propinas recibirás. Incluye un sistema de estrellas y clientes VIP.",
    categoria: "GTA Online", autor: "LS Transport", fecha: "2026-02-09",
    imagen: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=400&fit=crop",
    likes: 198, tags: ["Taxi", "Modo Nuevo", "Dinero"]
  },
  {
    titulo: "Club de coches clásicos: encuentros semanales en el muelle",
    descripcion: "Cada viernes a las 20:00 los coleccionistas se reúnen en el muelle de Los Santos para exhibir sus coches clásicos. El mejor coche de cada semana gana un trofeo exclusivo y 500.000 GTA$.",
    categoria: "GTA Online", autor: "Classic Cars LS", fecha: "2026-02-06",
    imagen: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop",
    likes: 345, tags: ["Clásicos", "Encuentros", "Comunidad"]
  },
  {
    titulo: "Isla Cayo Perico recibe expansión con zona volcánica",
    descripcion: "La actualización de Cayo Perico añade una zona volcánica al norte de la isla con nuevas misiones, un laboratorio subterráneo y vehículos anfibios exclusivos para explorar las cuevas marinas.",
    categoria: "GTA Online", autor: "LS Noticias", fecha: "2026-02-02",
    imagen: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=400&fit=crop",
    likes: 612, tags: ["Cayo Perico", "Expansión", "Volcán"]
  },
  {
    titulo: "Los mejores outfits para pilotos de carreras en 2026",
    descripcion: "Repasamos las mejores combinaciones de ropa para pilotos de carreras en GTA Online. Desde trajes de competición hasta cascos personalizados, te mostramos cómo vestir como un verdadero profesional del asfalto.",
    categoria: "GTA Online", autor: "Fashion LS", fecha: "2026-01-30",
    imagen: "https://images.unsplash.com/photo-1541348263662-e068662d82af?w=600&h=400&fit=crop",
    likes: 167, tags: ["Ropa", "Pilotos", "Estilo"]
  },
  {
    titulo: "Evento especial: Carrera de camiones monstruo en el estadio",
    descripcion: "Este fin de semana el estadio de Los Santos acoge el espectáculo de Monster Trucks. Salta rampas, aplasta coches y compite contra 15 jugadores en el evento más destructivo del año.",
    categoria: "GTA Online", autor: "LS Events", fecha: "2026-01-26",
    imagen: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&h=400&fit=crop",
    likes: 423, tags: ["Monster Truck", "Evento", "Estadio"]
  },
  {
    titulo: "Guía de supervivencia para nuevos jugadores en 2026",
    descripcion: "¿Acabas de llegar a Los Santos? Esta guía te enseña los primeros pasos: cómo ganar dinero rápido, qué propiedades comprar primero, cómo defenderte de otros jugadores y los mejores vehículos para principiantes.",
    categoria: "GTA Online", autor: "LS Academy", fecha: "2026-01-22",
    imagen: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&h=400&fit=crop",
    likes: 534, tags: ["Guía", "Principiantes", "Consejos"]
  },

  // ========== Coches Reales (13 more) ==========
  {
    titulo: "Rimac Nevera: El hiperdeportivo eléctrico croata bate récords",
    descripcion: "El Rimac Nevera ha establecido un nuevo récord de velocidad para coches eléctricos con 412 km/h. Sus 1.914 CV lo convierten en el coche eléctrico de producción más potente jamás fabricado.",
    categoria: "Coches Reales", autor: "EV World", fecha: "2026-03-02",
    imagen: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop",
    likes: 378, tags: ["Rimac", "Eléctrico", "Récord"]
  },
  {
    titulo: "Koenigsegg Jesko Absolut: 531 km/h teóricos confirmados",
    descripcion: "Koenigsegg ha confirmado mediante simulaciones que el Jesko Absolut puede alcanzar los 531 km/h. Con su motor V8 biturbo de 1.600 CV y una aerodinámica de ultra baja resistencia, es el candidato al coche más rápido del mundo.",
    categoria: "Coches Reales", autor: "Speed Records", fecha: "2026-02-27",
    imagen: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop",
    likes: 489, tags: ["Koenigsegg", "Velocidad", "Récord"]
  },
  {
    titulo: "Mercedes-AMG ONE: El F1 de calle en acción",
    descripcion: "Hemos probado el Mercedes-AMG ONE con su motor de F1 de 1.063 CV en circuito. La experiencia de conducir un monoplaza con matrícula es surrealista: el sonido, la respuesta y la velocidad son de otro mundo.",
    categoria: "Coches Reales", autor: "Motor Total", fecha: "2026-02-24",
    imagen: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop",
    likes: 534, tags: ["Mercedes", "AMG ONE", "F1"]
  },
  {
    titulo: "Pagani Utopia: La obra maestra artesanal italiana",
    descripcion: "Con solo 99 unidades y un precio de 2.5 millones de euros, el Pagani Utopia es un ejercicio de perfección artesanal. Su motor V12 biturbo de 864 CV está envuelto en una carrocería hecha completamente a mano.",
    categoria: "Coches Reales", autor: "Motor Total", fecha: "2026-02-21",
    imagen: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=600&h=400&fit=crop",
    likes: 312, tags: ["Pagani", "Artesanal", "Exclusivo"]
  },
  {
    titulo: "BMW M4 CSL 2026: El deportivo bávaro más radical",
    descripcion: "El BMW M4 CSL pierde 100 kg respecto al M4 Competition y gana 40 CV adicionales hasta los 590 CV. Su chasis reforzado con fibra de carbono y la suspensión de competición lo hacen imbatible en carreteras secundarias.",
    categoria: "Coches Reales", autor: "Motor Total", fecha: "2026-02-17",
    imagen: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop",
    likes: 267, tags: ["BMW", "M4 CSL", "Deportivo"]
  },
  {
    titulo: "Nissan GT-R R36: Se filtran los primeros bocetos oficiales",
    descripcion: "Nissan ha dejado entrever los primeros diseños del nuevo GT-R R36. Abandona el motor V6 biturbo por un sistema híbrido de 800 CV y promete un sistema de tracción total completamente nuevo con torque vectoring activo.",
    categoria: "Coches Reales", autor: "JDM News", fecha: "2026-02-14",
    imagen: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=600&h=400&fit=crop",
    likes: 445, tags: ["Nissan", "GT-R", "Filtración"]
  },
  {
    titulo: "Toyota GR Supra GRMN: La versión definitiva del Supra",
    descripcion: "Toyota presenta la versión más extrema del GR Supra con un motor de 3.0 litros turbo de 530 CV, frenos cerámicos, chasis aligerado y una aerodinámica activa inspirada en el Super GT japonés.",
    categoria: "Coches Reales", autor: "JDM News", fecha: "2026-02-11",
    imagen: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop",
    likes: 356, tags: ["Toyota", "Supra", "GRMN"]
  },
  {
    titulo: "Ford Mustang GTD: El muscle car que planta cara a Porsche",
    descripcion: "El Ford Mustang GTD con motor V8 sobrealimentado de 815 CV quiere batir al Porsche 911 GT3 en Nürburgring. Sus tiempos de preproducción ya lo sitúan por debajo de los 6:50 en la Nordschleife.",
    categoria: "Coches Reales", autor: "Motor Total", fecha: "2026-02-07",
    imagen: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=400&fit=crop",
    likes: 423, tags: ["Ford", "Mustang", "Muscle Car"]
  },
  {
    titulo: "Lotus Evija: 2.000 CV eléctricos en forma de hiperdeportivo",
    descripcion: "El Lotus Evija es el coche de producción más potente del mundo con 2.000 CV eléctricos. Solo 130 unidades serán fabricadas, cada una personalizada al gusto del cliente. Hemos podido verlo en persona en el salón de Ginebra.",
    categoria: "Coches Reales", autor: "EV World", fecha: "2026-02-04",
    imagen: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&h=400&fit=crop",
    likes: 298, tags: ["Lotus", "Eléctrico", "Hiperdeportivo"]
  },
  {
    titulo: "Chevrolet Corvette E-Ray: El primer Corvette híbrido de la historia",
    descripcion: "El Corvette E-Ray combina un V8 de 6.2 litros con un motor eléctrico para un total de 655 CV y tracción total. Es el Corvette más rápido de 0 a 100 km/h de la historia con solo 2.5 segundos.",
    categoria: "Coches Reales", autor: "Motor Total", fecha: "2026-01-31",
    imagen: "https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=600&h=400&fit=crop",
    likes: 356, tags: ["Corvette", "Híbrido", "V8"]
  },
  {
    titulo: "Alfa Romeo 33 Stradale: renace el mito italiano",
    descripcion: "Alfa Romeo resucita el legendario 33 Stradale con un motor V6 biturbo de 620 CV y una versión 100% eléctrica de 750 CV. Solo 33 unidades serán producidas, cada una con un precio superior a los 2 millones de euros.",
    categoria: "Coches Reales", autor: "Motor Total", fecha: "2026-01-27",
    imagen: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&h=400&fit=crop",
    likes: 412, tags: ["Alfa Romeo", "33 Stradale", "Exclusivo"]
  },
  {
    titulo: "Comparativa: Los 5 mejores sedanes deportivos de 2026",
    descripcion: "Enfrentamos al BMW M5, Mercedes-AMG E63, Audi RS7, Porsche Panamera Turbo y Maserati Ghibli Trofeo en una comparativa épica. Analizamos rendimiento, confort, tecnología y relación calidad-precio.",
    categoria: "Coches Reales", autor: "Motor Total", fecha: "2026-01-24",
    imagen: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&h=400&fit=crop",
    likes: 289, tags: ["Comparativa", "Sedanes", "Deportivos"]
  },
  {
    titulo: "Hyundai N Vision 74: El muscle car coreano de hidrógeno",
    descripcion: "Hyundai confirma la producción del N Vision 74, un coupé retro-futurista propulsado por hidrógeno con 680 CV. Su diseño inspirado en el Pony Coupé de 1974 combina nostalgia con tecnología de vanguardia.",
    categoria: "Coches Reales", autor: "EV World", fecha: "2026-01-20",
    imagen: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&h=400&fit=crop",
    likes: 367, tags: ["Hyundai", "Hidrógeno", "Retro"]
  },

  // ========== Tuning (12 more) ==========
  {
    titulo: "Suspensión neumática vs coilovers: ¿Cuál es mejor para tu coche?",
    descripcion: "Analizamos en profundidad las ventajas y desventajas de cada sistema de suspensión. Desde el confort de la suspensión neumática hasta la precisión de los coilovers, te ayudamos a elegir la mejor opción para tu estilo.",
    categoria: "Tuning", autor: "GTA Mechanics", fecha: "2026-03-03",
    imagen: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop",
    likes: 234, tags: ["Suspensión", "Coilovers", "Neumática"]
  },
  {
    titulo: "Turbo vs Supercargador: La batalla por la potencia",
    descripcion: "¿Turbo o supercargador? Comparamos ambos sistemas de sobrealimentación en el Bravado Banshee. El turbo gana en potencia máxima, pero el supercargador ofrece respuesta instantánea sin turbo lag.",
    categoria: "Tuning", autor: "Power Labs LS", fecha: "2026-02-26",
    imagen: "https://images.unsplash.com/photo-1525609004556-c46c64cc44e0?w=600&h=400&fit=crop",
    likes: 378, tags: ["Turbo", "Supercargador", "Comparativa"]
  },
  {
    titulo: "Pintura camaleón: La tendencia más exclusiva de 2026",
    descripcion: "Las pinturas camaleón que cambian de color según el ángulo de la luz son la última moda en LS Customs. Te explicamos los 8 colores disponibles, precios y los mejores coches para lucir este acabado premium.",
    categoria: "Tuning", autor: "Paint Pro LS", fecha: "2026-02-23",
    imagen: "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?w=600&h=400&fit=crop",
    likes: 312, tags: ["Pintura", "Camaleón", "Tendencia"]
  },
  {
    titulo: "Kit widebody para el Dominator GT: Instalación paso a paso",
    descripcion: "Tutorial completo para instalar el kit de ensanche en el Vapid Dominator GT. Incluye las medidas exactas, herramientas necesarias y consejos para un acabado profesional con faldones, aletines y difusor trasero.",
    categoria: "Tuning", autor: "GTA Mechanics", fecha: "2026-02-20",
    imagen: "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=600&h=400&fit=crop",
    likes: 267, tags: ["Widebody", "Dominator", "Tutorial"]
  },
  {
    titulo: "Llantas forjadas vs fundidas: La diferencia que importa",
    descripcion: "Las llantas forjadas son un 25% más ligeras que las fundidas y mejoran la aceleración, frenada y consumo. Pero cuestan el triple. ¿Valen la pena? Analizamos 6 marcas populares en GTA Online.",
    categoria: "Tuning", autor: "Wheel Masters", fecha: "2026-02-15",
    imagen: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop",
    likes: 198, tags: ["Llantas", "Forjadas", "Rendimiento"]
  },
  {
    titulo: "Iluminación LED underglow: Guía de instalación y colores",
    descripcion: "Todo lo que necesitas saber sobre la iluminación LED bajo el chasis. Repasamos los kits disponibles, los colores más populares, cómo sincronizar las luces con la música y las regulaciones en cada sesión.",
    categoria: "Tuning", autor: "Neon Masters LS", fecha: "2026-02-12",
    imagen: "https://images.unsplash.com/photo-1534996858221-380b92700493?w=600&h=400&fit=crop",
    likes: 345, tags: ["LED", "Underglow", "Iluminación"]
  },
  {
    titulo: "Intercooler frontal: Cómo duplicar la eficiencia de tu turbo",
    descripcion: "Un intercooler frontal bien dimensionado puede reducir la temperatura del aire de admisión en 40°C, mejorando la potencia en un 15%. Te explicamos los tamaños recomendados para cada tipo de motor en GTA Online.",
    categoria: "Tuning", autor: "Power Labs LS", fecha: "2026-02-08",
    imagen: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop",
    likes: 234, tags: ["Intercooler", "Turbo", "Rendimiento"]
  },
  {
    titulo: "Configuración de ECU: Mapas de potencia para cada situación",
    descripcion: "Aprende a programar los distintos mapas de la centralita electrónica. Desde modo eco para conducción diaria hasta modo carrera con máximo boost, pasando por anti-lag y launch control.",
    categoria: "Tuning", autor: "GTA Mechanics", fecha: "2026-02-05",
    imagen: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&h=400&fit=crop",
    likes: 289, tags: ["ECU", "Mapas", "Electrónica"]
  },
  {
    titulo: "Roll cage: Seguridad y rigidez para tu coche de carreras",
    descripcion: "Instalar un roll cage completo aumenta la rigidez torsional del chasis un 40% y puede salvar tu vida en un accidente. Repasamos los materiales, homologaciones y las mejores opciones disponibles en LS Customs.",
    categoria: "Tuning", autor: "Safety First LS", fecha: "2026-02-01",
    imagen: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&h=400&fit=crop",
    likes: 178, tags: ["Roll Cage", "Seguridad", "Competición"]
  },
  {
    titulo: "Frenos de carbono cerámico: ¿Merecen su alto precio?",
    descripcion: "Los frenos de carbono cerámico pesan un 50% menos que los de acero y resisten temperaturas de hasta 1.000°C. Pero cuestan millones. Analizamos si el rendimiento extra justifica la inversión para uso en circuito.",
    categoria: "Tuning", autor: "Brake Tech LS", fecha: "2026-01-29",
    imagen: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=400&fit=crop",
    likes: 256, tags: ["Frenos", "Cerámicos", "Rendimiento"]
  },
  {
    titulo: "El arte del stance: Cómo lograr la postura perfecta",
    descripcion: "El stance es más que bajar la suspensión. Te enseñamos a calcular el camber ideal, el offset de las llantas y la altura justa para que tu coche tenga una postura agresiva pero funcional en las calles de LS.",
    categoria: "Tuning", autor: "Stance Nation LS", fecha: "2026-01-25",
    imagen: "https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=600&h=400&fit=crop",
    likes: 312, tags: ["Stance", "Camber", "Postura"]
  },
  {
    titulo: "Escape catback de titanio: Sonido y rendimiento premium",
    descripcion: "Instalamos un escape catback de titanio en el Pfister Comet S2 y los resultados son impresionantes: 8 kg menos de peso, 15 CV extra y un sonido que hace vibrar las ventanas de todo Vinewood.",
    categoria: "Tuning", autor: "Sound & Speed LS", fecha: "2026-01-21",
    imagen: "https://images.unsplash.com/photo-1517404215738-15263e9f9178?w=600&h=400&fit=crop",
    likes: 345, tags: ["Escape", "Titanio", "Sonido"]
  },

  // ========== Carreras (13 more) ==========
  {
    titulo: "Campeonato de resistencia nocturna: 8 horas bajo las estrellas",
    descripcion: "El campeonato de resistencia nocturna de Los Santos pone a prueba la habilidad y concentración de los pilotos durante 8 horas en completa oscuridad. Solo los faros y las luces de la ciudad iluminan el camino.",
    categoria: "Carreras", autor: "Endurance LS", fecha: "2026-03-01",
    imagen: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop",
    likes: 423, tags: ["Resistencia", "Nocturna", "Campeonato"]
  },
  {
    titulo: "Carrera en el aeropuerto: Pista de aterrizaje convertida en circuito",
    descripcion: "La pista del aeropuerto de Los Santos International se transforma en un circuito de alta velocidad. Las rectas de 2 km permiten alcanzar velocidades superiores a 350 km/h antes de la chicane final.",
    categoria: "Carreras", autor: "Racing Weekly", fecha: "2026-02-28",
    imagen: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=400&fit=crop",
    likes: 312, tags: ["Aeropuerto", "Alta Velocidad", "Circuito"]
  },
  {
    titulo: "Drift Championship: Los mejores ángulos de la temporada",
    descripcion: "Recopilamos los mejores momentos del campeonato de drift de Los Santos. Ángulos de más de 70 grados, transiciones perfectas y humo de neumáticos que cubren la cámara. Puro espectáculo sobre ruedas.",
    categoria: "Carreras", autor: "Drift Kings LS", fecha: "2026-02-25",
    imagen: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=600&h=400&fit=crop",
    likes: 456, tags: ["Drift", "Campeonato", "Espectáculo"]
  },
  {
    titulo: "Time Attack: Los récords de vuelta rápida de febrero 2026",
    descripcion: "Actualizamos la tabla de récords del Time Attack mensual. El piloto 'Phantom_Racer' ha pulverizado el récord del circuito del puerto con un tiempo de 1:12.453 con un Benefactor Schlagen GT completamente tuneado.",
    categoria: "Carreras", autor: "Racing Weekly", fecha: "2026-02-22",
    imagen: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=600&h=400&fit=crop",
    likes: 234, tags: ["Time Attack", "Récord", "Vuelta Rápida"]
  },
  {
    titulo: "Carrera de lanchas rápidas por la costa de Los Santos",
    descripcion: "Las carreras no son solo en tierra. La liga de lanchas rápidas de Los Santos ofrece circuitos costeros con olas, corrientes y obstáculos que hacen de cada carrera una experiencia única e impredecible.",
    categoria: "Carreras", autor: "Marine Racing LS", fecha: "2026-02-18",
    imagen: "https://images.unsplash.com/photo-1534996858221-380b92700493?w=600&h=400&fit=crop",
    likes: 189, tags: ["Lanchas", "Mar", "Costa"]
  },
  {
    titulo: "Liga de karts: Carreras a baja velocidad, máxima diversión",
    descripcion: "La liga de karts de Los Santos demuestra que no hace falta velocidad para divertirse. Con karts limitados a 80 km/h, la habilidad del piloto es lo único que importa en cada curva cerrada del Go-Kart Park.",
    categoria: "Carreras", autor: "Fun Racing LS", fecha: "2026-02-14",
    imagen: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&h=400&fit=crop",
    likes: 267, tags: ["Karts", "Diversión", "Liga"]
  },
  {
    titulo: "Carrera de motos por el cañón de Raton: Alta peligrosidad",
    descripcion: "El circuito más peligroso de GTA Online para motos serpentea por los estrechos caminos del cañón de Raton. Un error significa caer 200 metros al vacío. Solo los pilotos más valientes se atreven.",
    categoria: "Carreras", autor: "Bike Racing LS", fecha: "2026-02-10",
    imagen: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=400&fit=crop",
    likes: 345, tags: ["Motos", "Peligro", "Cañón"]
  },
  {
    titulo: "Copa de coches clásicos: Solo vehículos anteriores a 2000",
    descripcion: "La copa de clásicos restringe la participación a vehículos fabricados antes del año 2000 en el juego. Sin ayudas electrónicas ni tracción total, la habilidad del piloto es lo que marca la diferencia.",
    categoria: "Carreras", autor: "Classic Racing LS", fecha: "2026-02-06",
    imagen: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&h=400&fit=crop",
    likes: 198, tags: ["Clásicos", "Copa", "Retro"]
  },
  {
    titulo: "Carrera de obstáculos: Destrucción total en cada vuelta",
    descripcion: "Las carreras de obstáculos combinan velocidad con destrucción. Muros que se derrumban, rampas explosivas y zonas de aceite convierten cada vuelta en un caos controlado donde cualquier cosa puede pasar.",
    categoria: "Carreras", autor: "Chaos Racing LS", fecha: "2026-02-03",
    imagen: "https://images.unsplash.com/photo-1541348263662-e068662d82af?w=600&h=400&fit=crop",
    likes: 456, tags: ["Obstáculos", "Destrucción", "Caos"]
  },
  {
    titulo: "Maratón de carreras 48h: El evento más largo del año",
    descripcion: "48 horas consecutivas de carreras en 24 circuitos diferentes. Los equipos rotan pilotos cada 4 horas en un evento que pone a prueba la estrategia, la resistencia del equipo y la gestión de recursos.",
    categoria: "Carreras", autor: "Endurance LS", fecha: "2026-01-31",
    imagen: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop",
    likes: 534, tags: ["Maratón", "48 Horas", "Equipo"]
  },
  {
    titulo: "Street Racing Revival: Carreras ilegales por la noche",
    descripcion: "Las carreras callejeras ilegales vuelven con fuerza a las calles de Los Santos. Cada noche, decenas de pilotos se reúnen en el parking del centro comercial para competir por dinero y respeto.",
    categoria: "Carreras", autor: "Underground LS", fecha: "2026-01-28",
    imagen: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&h=400&fit=crop",
    likes: 389, tags: ["Street Racing", "Ilegal", "Nocturno"]
  },
  {
    titulo: "Carrera de todoterrenos por Sandy Shores: Barro y polvo",
    descripcion: "La carrera de todoterrenos más dura de GTA Online atraviesa los caminos de tierra de Sandy Shores. Barro, charcos profundos y pendientes de 45 grados ponen a prueba cada vehículo al máximo.",
    categoria: "Carreras", autor: "Off-Road Legends", fecha: "2026-01-24",
    imagen: "https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=600&h=400&fit=crop",
    likes: 278, tags: ["Todoterreno", "Sandy Shores", "Barro"]
  },
  {
    titulo: "Criterium urbano: 50 vueltas alrededor de la Maze Bank Tower",
    descripcion: "El criterium urbano más emocionante de Los Santos: 50 vueltas en un circuito cerrado alrededor de la Maze Bank Tower. Las rectas cortas y las curvas de 90 grados favorecen a los coches ágiles.",
    categoria: "Carreras", autor: "Racing Weekly", fecha: "2026-01-20",
    imagen: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&h=400&fit=crop",
    likes: 212, tags: ["Criterium", "Urbano", "Maze Bank"]
  },

  // ========== Novedades (12 more) ==========
  {
    titulo: "Editor de circuitos mejorado: Crea tu pista perfecta",
    descripcion: "El editor de circuitos recibe una actualización masiva con más de 200 nuevos objetos, sistema de iluminación personalizable, y la posibilidad de crear circuitos con cambios de elevación de hasta 500 metros.",
    categoria: "Novedades", autor: "LS Noticias", fecha: "2026-03-02",
    imagen: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&h=400&fit=crop",
    likes: 345, tags: ["Editor", "Circuitos", "Creación"]
  },
  {
    titulo: "Sistema de clima extremo llega a Los Santos",
    descripcion: "La nueva actualización introduce tormentas eléctricas, tornados y olas de calor que afectan la jugabilidad. Los coches patinan bajo la lluvia, la visibilidad se reduce en tormentas y el motor puede sobrecalentarse.",
    categoria: "Novedades", autor: "LS Noticias", fecha: "2026-02-27",
    imagen: "https://images.unsplash.com/photo-1534996858221-380b92700493?w=600&h=400&fit=crop",
    likes: 423, tags: ["Clima", "Tormentas", "Física"]
  },
  {
    titulo: "App de compañero iFruit Plus: Gestiona tu garaje desde el móvil",
    descripcion: "La nueva aplicación iFruit Plus permite gestionar tu garaje, comprar coches, y personalizar vehículos desde tu teléfono real. También puedes iniciar misiones, chatear con tu crew y ver estadísticas en tiempo real.",
    categoria: "Novedades", autor: "Rockstar Apps", fecha: "2026-02-24",
    imagen: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop",
    likes: 289, tags: ["App", "iFruit", "Móvil"]
  },
  {
    titulo: "Rockstar introduce sistema de logros vinculados a vehículos",
    descripcion: "Cada vehículo ahora tiene su propio árbol de logros: kilómetros recorridos, victorias en carreras, derrapajes perfectos y más. Completar todos los logros de un vehículo desbloquea una pintura exclusiva única.",
    categoria: "Novedades", autor: "LS Noticias", fecha: "2026-02-21",
    imagen: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop",
    likes: 456, tags: ["Logros", "Vehículos", "Desbloqueo"]
  },
  {
    titulo: "Mercado de segunda mano: Compra y vende coches a otros jugadores",
    descripcion: "El nuevo mercado peer-to-peer permite a los jugadores vender sus coches modificados a otros jugadores. Se incluye un sistema de subastas, historial del vehículo y garantías de compra protegidas por Rockstar.",
    categoria: "Novedades", autor: "LS Market", fecha: "2026-02-17",
    imagen: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&h=400&fit=crop",
    likes: 567, tags: ["Mercado", "Compraventa", "Subastas"]
  },
  {
    titulo: "Modo director cinematográfico recibe herramientas de IA",
    descripcion: "El modo director ahora incluye un asistente de IA que sugiere ángulos de cámara, ajusta la iluminación automáticamente y puede generar bandas sonoras dinámicas basadas en la acción que estés grabando.",
    categoria: "Novedades", autor: "Film LS", fecha: "2026-02-13",
    imagen: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&h=400&fit=crop",
    likes: 234, tags: ["Director", "IA", "Cinematografía"]
  },
  {
    titulo: "Cross-play confirmado entre PC y consolas para carreras",
    descripcion: "Rockstar ha confirmado que el modo carreras será cross-play entre PC, PlayStation y Xbox a partir de marzo. Los jugadores de todas las plataformas competirán juntos en las mismas lobbies de carrera.",
    categoria: "Novedades", autor: "LS Noticias", fecha: "2026-02-10",
    imagen: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop",
    likes: 678, tags: ["Cross-Play", "Multiplataforma", "Carreras"]
  },
  {
    titulo: "Sistema de radio personalizada con streaming integrado",
    descripcion: "GTA Online ahora permite conectar tu cuenta de Spotify o Apple Music para crear una emisora de radio personalizada dentro del juego. La música se sincroniza con otros jugadores en tu mismo vehículo.",
    categoria: "Novedades", autor: "LS Entertainment", fecha: "2026-02-07",
    imagen: "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?w=600&h=400&fit=crop",
    likes: 389, tags: ["Radio", "Música", "Streaming"]
  },
  {
    titulo: "Nuevo sistema de daños realista para vehículos",
    descripcion: "Los vehículos ahora sufren daños progresivos y realistas: los faros se rompen, las puertas se abren, el capó se deforma y las ruedas pueden salirse. Cada impacto afecta al rendimiento del coche de forma diferente.",
    categoria: "Novedades", autor: "LS Noticias", fecha: "2026-02-04",
    imagen: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop",
    likes: 512, tags: ["Daños", "Realismo", "Física"]
  },
  {
    titulo: "Personalización de matrículas con editor avanzado",
    descripcion: "El nuevo editor de matrículas permite elegir entre 20 estilos de placa, incluyendo matrículas europeas, japonesas y de edición limitada. También puedes añadir marcos decorativos y colores personalizados.",
    categoria: "Novedades", autor: "LS Noticias", fecha: "2026-01-31",
    imagen: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=600&h=400&fit=crop",
    likes: 156, tags: ["Matrículas", "Personalización", "Editor"]
  },
  {
    titulo: "Descuentos de San Valentín: Coches rojos al 50%",
    descripcion: "Por San Valentín, todos los vehículos con pintura roja de serie tienen un 50% de descuento. Además, se añaden 5 vinilos románticos exclusivos y un claxon especial con melodía de amor.",
    categoria: "Novedades", autor: "LS Noticias", fecha: "2026-01-28",
    imagen: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=600&h=400&fit=crop",
    likes: 234, tags: ["San Valentín", "Descuentos", "Evento"]
  },
  {
    titulo: "Servicio de grúa premium: Transporta tus coches entre garajes",
    descripcion: "El nuevo servicio de grúa permite transportar vehículos entre garajes sin necesidad de conducirlos. Por una tarifa de 50.000 GTA$, tu coche será recogido y entregado en el garaje de destino en tiempo real.",
    categoria: "Novedades", autor: "LS Transport", fecha: "2026-01-23",
    imagen: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=400&fit=crop",
    likes: 178, tags: ["Grúa", "Transporte", "Servicio"]
  }
];

async function seedExtra() {
  console.log("Starting extra news seed...");
  console.log(`Articles to upload: ${extraNews.length}`);
  const col = collection(db, "noticias");

  let ok = 0, fail = 0;
  for (const n of extraNews) {
    try {
      const ref = await addDoc(col, n);
      ok++;
      console.log(`[${ok}/${extraNews.length}] ✅ "${n.titulo}" (${ref.id})`);
    } catch (e) {
      fail++;
      console.error(`[ERROR] "${n.titulo}":`, e.message);
    }
  }
  console.log(`\nDone! ${ok} added, ${fail} failed. Total in DB should now be ~100.`);
  process.exit(0);
}

seedExtra();
