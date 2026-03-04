
import './Legal.css';

const GuideFAQ = () => {
    return (
        <div className="legal-page-wrapper">
            <div className="legal-container theme-yellow">
                <header className="legal-header">
                    <h1>GUÍA DEL JUGADOR & MANUAL DE USO</h1>
                    <p className="legal-subtitle">Todo lo que necesitas saber para dominar LSPA</p>
                </header>
                
                <div className="legal-content">
                    {/* SECCIÓN 1: INTRODUCCIÓN Y GARAJE */}
                    <section className="legal-section">
                        <h2>🚗 TU GARAJE Y COLECCIÓN</h2>
                        <p>
                            LSPA no es solo una lista de coches, es tu concesionario personal. Aquí aprendes a gestionar tu imperio.
                        </p>
                        
                        <h3>El Catálogo Inteligente</h3>
                        <p>
                            Tienes acceso a la base de datos más completa de vehículos. 
                            Usa la barra de búsqueda para encontrar cualquier modelo o filtra por categorías (Super, Deportivos, Clásicos...).
                        </p>
                        <ul>
                            <li><strong>Modo Lectura:</strong> En la ficha de cualquier coche, activa el icono del &ldquo;Ojo&rdquo; presencial. Esto oscurece el fondo y elimina distracciones para que puedas ver las especificaciones con claridad.</li>
                            <li><strong>Ficha Técnica:</strong> Cada coche tiene barras de rendimiento. Puedes activar el interruptor &ldquo;LS Customs&rdquo; para simular cómo mejoraría el coche si estuviera tuneado al máximo.</li>
                        </ul>

                        <h3>Gestionando tu Inventario</h3>
                        <p>
                            Cuando encuentres un coche que te gusta (o que ya tienes en el juego real), pulsa el icono del <strong>Corazón</strong> ❤️. Esto lo añade a tu <strong>Garaje Personal</strong>.
                            Dentro de tu garaje, puedes organizar tus coches con etiquetas:
                        </p>
                        <ul>
                            <li><span style={{color:'#00E676'}}>CONSEGUIDO:</span> Para los coches que ya son tuyos.</li>
                            <li><span style={{color:'#FFD700'}}>BUSCANDO:</span> Para tu lista de deseos o futuros cambios.</li>
                            <li><span style={{color:'#ff4444'}}>VENDIDO:</span> Para mantener un registro histórico de lo que has tenido.</li>
                        </ul>
                    </section>

                    {/* SECCIÓN 2: PROGRESO */}
                    <section className="legal-section">
                        <h2>📈 PROGRESO Y REPUTACIÓN (XP)</h2>
                        <p>
                            Tu nivel de usuario demuestra tu conocimiento sobre el mundo del motor. Cuanto más alto sea tu nivel, más respeto tendrás en la comunidad.
                        </p>
                        <h3>¿Cómo subir de nivel?</h3>
                        <p>
                            Ganas experiencia (XP) interactuando con la aplicación y demostrando tus conocimientos en los minijuegos. No hay límite de nivel, pero cada rango es más difícil de alcanzar que el anterior. La constancia es clave.
                        </p>
                    </section>

                    {/* SECCIÓN 3: MINIJUEGOS */}
                    <section className="legal-section">
                        <h2>🕹️ ZONA DE JUEGOS (ARCADE)</h2>
                        <p>
                            Pon a prueba tus conocimientos y gana XP para subir de rango.
                        </p>
                        
                        <h3>⚔️ Batalla de Especificaciones (Versus)</h3>
                        <p>
                            El desafío definitivo. El sistema pone dos coches frente a frente y elige una característica al azar (ej. Velocidad Punta). 
                            Tú debes decidir cuál de los dos es superior en ese aspecto. 
                            <br/><em>Ideal para: Expertos que conocen cada detalle técnico. Otorga grandes recompensas si mantienes una racha de victorias.</em>
                        </p>
                        
                        <h3>💥 Batallas Normales</h3>
                        <p>
                            El enfrentamiento estratégico. Tienes una carta de vehículo y <strong>tú eliges la estadística</strong> (Velocidad, Aceleración, etc.) que crees que te hará ganar. 
                            Luego se desvela el coche del rival. Si tu número es mejor que el suyo en esa categoría, te llevas la victoria.
                        </p>

                        <h3>🤔 Adivina el Coche</h3>
                        <p>
                            Un juego de agudeza visual. Verás la silueta oscura de un vehículo y tendrás unos segundos para identificarlo entre 4 opciones.
                            <br/><em>Ideal para: Jugadores con memoria fotográfica que reconocen un coche solo por sus faros o su contorno.</em>
                        </p>

                        <h3>🔼 Higher or Lower (Más o Menos)</h3>
                        <p>
                            Juego rápido y adictivo. Se te muestra un coche con un dato (ej. Aceleración: 8.5) y otro coche oculto. ¿Crees que el segundo tiene MÁS o MENOS aceleración?
                            <br/><em>Ideal para: Partidas rápidas y aprender comparativas entre vehículos.</em>
                        </p>
                    </section>

                    {/* SECCIÓN 4: CREWS */}
                    <section className="legal-section">
                        <h2>🏴‍☠️ VIDA SOCIAL: LAS CREWS</h2>
                        <p>
                            LSPA es mejor en equipo. Las Crews son bandas de jugadores donde podéis chatear y competir juntos.
                        </p>
                        <ul>
                            <li><strong>Unirse a una Crew:</strong> Busca una crew pública y únete al instante, o pide invitación para las privadas.</li>
                            <li><strong>Crear tu Crew:</strong> Si tienes liderazgo, funda tu propia banda. Podrás personalizar el nombre, el lema y controlar quién entra.</li>
                            <li><strong>Chat Privado:</strong> Cada Crew tiene un canal de comunicación seguro y encriptado solo para sus miembros.</li>
                        </ul>
                        <h3>Rangos dentro de la Crew</h3>
                        <p>
                            Dentro de una banda, tu estatus importa. Empiezas como novato, pero puedes ascender si el líder confía en ti:
                        </p>
                        <ul>
                            <li><strong>Noob:</strong> El rango inicial. Acabas de llegar, demuestra tu valía en el chat y en los eventos.</li>
                            <li><strong>Veteran:</strong> Miembros de confianza que llevan tiempo en la banda. Son la columna vertebral del grupo.</li>
                            <li><strong>Staff y Co-Owner:</strong> Son los oficiales. Ayudan a gestionar la crew aceptando nuevos miembros.</li>
                            <li><strong>Owner (Líder):</strong> El jefe supremo. Tiene poder absoluto para expulsar miembros o disolver la banda.</li>
                        </ul>
                    </section>

                    {/* SECCIÓN 5: CLASIFICACIÓN GLOBAL */}
                    <section className="legal-section">
                        <h2>🏆 CLASIFICACIÓN Y LEADERBOARDS</h2>
                        <p>
                            ¿Quién es el rey de Los Santos? El sistema de Leaderboards rastrea a los mejores jugadores en tiempo real.
                        </p>
                        <ul>
                            <li><strong>Clasificación Global:</strong> Visible en el Perfil. Muestra a los usuarios con más XP acumulada de todo el servidor.</li>
                            <li><strong>Top 50:</strong> Solo los 50 mejores pilotos aparecen en este muro de la fama. Si quieres ver tu nombre ahí, tendrás que ganar muchas batallas.</li>
                        </ul>
                    </section>

                    {/* SECCIÓN 6: PERFIL */}
                    <section className="legal-section">
                        <h2>👤 PERSONALIZACIÓN DE PERFIL</h2>
                        <p>
                            Haz que tu perfil sea único. Desde la sección de ajustes puedes:
                        </p>
                        <ul>
                            <li><strong>Cambiar tu Avatar:</strong> Usa cualquier imagen de internet para representarte.</li>
                            <li><strong>Definir tu Estilo:</strong> Elige tu Marca Favorita (ej. Grotti, Pegassi) y tu Estilo de Conducción (Drift, Racing, Offroad) para que otros sepan qué tipo de piloto eres.</li>
                            <li><strong>Tema Visual:</strong> En la pantalla de acceso, puedes disfrutar de los nuevos temas visuales dinámicos que se adaptan a la estética de la app.</li>
                        </ul>
                    </section>

                    <div className="legal-footer">
                        <span>GUÍA OFICIAL DEL JUGADOR</span>
                        <span>LSPA APP 2026</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuideFAQ;
