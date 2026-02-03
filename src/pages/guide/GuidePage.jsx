import React, { useState } from 'react';
import '../legal/Legal.css';
import './GuidePage.css';

const FAQItem = ({ question, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <div className={`faq-item ${isOpen ? 'open' : ''}`}>
            <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
                <span>{question}</span>
                <span className="faq-icon">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && <div className="faq-answer">{children}</div>}
        </div>
    );
};

const GuidePage = () => {
    return (
        <div className="legal-page-wrapper">
            <div className="legal-container theme-yellow guide-enhanced">
                <header className="legal-header">
                    <h1>📖 Guía Completa y FAQ</h1>
                    <p className="guide-subtitle">Todo lo que necesitas saber para dominar LSPA</p>
                </header>

                <div className="legal-content">
                    
                    {/* SECTION: What is LSPA */}
                    <section className="legal-section guide-intro">
                        <h2>🚗 ¿Qué es LSPA?</h2>
                        <p>
                            <strong>Los Santos Performance Analyzer</strong> es la herramienta definitiva para comparar 
                            vehículos de GTA V/Online. Usamos datos extraídos directamente de los archivos 
                            del juego (<code>handling.meta</code>) para darte estadísticas <em>reales</em>, 
                            no las barras falsas del concesionario.
                        </p>
                        <div className="feature-grid">
                            <div className="feature-card">
                                <span className="feature-icon">📊</span>
                                <h4>713+ Vehículos</h4>
                                <p>Base de datos verificada con imágenes</p>
                            </div>
                            <div className="feature-card">
                                <span className="feature-icon">⚔️</span>
                                <h4>Comparador VS</h4>
                                <p>Compara coches cara a cara</p>
                            </div>
                            <div className="feature-card">
                                <span className="feature-icon">🎮</span>
                                <h4>3 Minijuegos</h4>
                                <p>Gana XP mientras juegas</p>
                            </div>
                            <div className="feature-card">
                                <span className="feature-icon">🏆</span>
                                <h4>Sistema de Niveles</h4>
                                <p>Sube de nivel y desbloquea logros</p>
                            </div>
                        </div>
                    </section>

                    {/* SECTION: Understanding Stats */}
                    <section className="legal-section">
                        <h2>📈 Entendiendo las Estadísticas</h2>
                        <div className="stats-explanation">
                            <div className="stat-item">
                                <div className="stat-header">
                                    <span className="stat-emoji">⚡</span>
                                    <strong>Velocidad Máxima (km/h)</strong>
                                </div>
                                <p>La velocidad punta real del vehículo en línea recta. Calculada a partir de <code>fInitialDriveMaxFlatVel</code>. No siempre el más rápido gana: necesitas buenos frenos para las curvas.</p>
                            </div>
                            <div className="stat-item">
                                <div className="stat-header">
                                    <span className="stat-emoji">🚀</span>
                                    <strong>Aceleración (0-10)</strong>
                                </div>
                                <p>Cuán rápido alcanza la velocidad máxima. Basado en <code>fDriveForce</code>. Crucial para carreras urbanas con muchos semáforos y curvas cerradas.</p>
                            </div>
                            <div className="stat-item">
                                <div className="stat-header">
                                    <span className="stat-emoji">🎯</span>
                                    <strong>Manejo / Tracción (0-10)</strong>
                                </div>
                                <p>Capacidad de mantener el agarre en curvas. Extraído de <code>fTractionCurveMax</code>. Un valor alto = el coche va sobre raíles.</p>
                            </div>
                            <div className="stat-item">
                                <div className="stat-header">
                                    <span className="stat-emoji">🛑</span>
                                    <strong>Frenada (0-10)</strong>
                                </div>
                                <p>Distancia de frenado. A menudo ignorada, pero es lo único que evita que te estrelles contra el Maze Bank Tower.</p>
                            </div>
                        </div>
                    </section>

                    {/* SECTION: Minigames */}
                    <section className="legal-section">
                        <h2>🎮 Minijuegos y XP</h2>
                        <p>Pon a prueba tu conocimiento vehicular y gana experiencia:</p>
                        
                        <div className="minigame-cards">
                            <div className="minigame-card">
                                <h4>🔍 Adivina el Coche</h4>
                                <p>Identifica vehículos borrosos antes de que se acabe el tiempo. Cuanto más rápido, más puntos.</p>
                                <div className="xp-reward">+50-100 XP por acierto</div>
                            </div>
                            <div className="minigame-card">
                                <h4>⬆️⬇️ Mayor o Menor</h4>
                                <p>¿El siguiente coche tiene más o menos velocidad? Mantén la racha lo más alta posible.</p>
                                <div className="xp-reward">+25 XP por acierto</div>
                            </div>
                            <div className="minigame-card">
                                <h4>⚔️ Batalla de Cartas</h4>
                                <p>Elige una estadística y compite contra la CPU. Estrategia pura: ¿atacas con velocidad o con manejo?</p>
                                <div className="xp-reward">+100-150 XP por victoria</div>
                            </div>
                        </div>

                        <div className="tip-box">
                            <strong>💡 Consejo Pro:</strong> Tus mejores rachas y puntuaciones se guardan automáticamente en tu perfil. ¡Compite por el récord!
                        </div>
                    </section>

                    {/* SECTION: Level System */}
                    <section className="legal-section">
                        <h2>📊 Sistema de Niveles</h2>
                        <p>Gana XP con cada acción y sube de nivel:</p>
                        
                        <table className="xp-table">
                            <thead>
                                <tr>
                                    <th>Acción</th>
                                    <th>XP Ganada</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>Ganar Batalla de Cartas</td><td>+100-150 XP</td></tr>
                                <tr><td>Acertar en Adivina el Coche</td><td>+50-100 XP</td></tr>
                                <tr><td>Acierto en Mayor/Menor</td><td>+25 XP</td></tr>
                                <tr><td>Añadir coche al Garaje</td><td>+10 XP</td></tr>
                                <tr><td>Completar perfil</td><td>+50 XP</td></tr>
                            </tbody>
                        </table>

                        <p>La fórmula de nivel es: <code>Nivel = √(XP / 100)</code>. Necesitas <strong>400 XP</strong> para nivel 2, <strong>900 XP</strong> para nivel 3, etc.</p>
                    </section>

                    {/* SECTION: Garage */}
                    <section className="legal-section">
                        <h2>🏠 Gestión de Garaje</h2>
                        <p>Tu garaje personal para organizar tu colección:</p>
                        <ul className="guide-list enhanced">
                            <li><strong>Añadir Vehículo:</strong> Pulsa el icono ❤️ en cualquier tarjeta de vehículo.</li>
                            <li><strong>Estados:</strong> Marca cada coche como "Obtenido" ✅ o "Pendiente" 🎯.</li>
                            <li><strong>Estadísticas:</strong> Ve el valor total de tu colección y la velocidad media.</li>
                            <li><strong>Privacidad:</strong> Tu garaje es visible en tu perfil público.</li>
                        </ul>
                    </section>

                    {/* SECTION: FAQ Accordion */}
                    <section className="legal-section faq-section">
                        <h2>❓ Preguntas Frecuentes (FAQ)</h2>
                        
                        <FAQItem question="¿Son estos datos 100% reales del juego?">
                            <p>Sí. Los datos provienen de <code>DurtyFree/gta-v-data-dumps</code>, una extracción directa de los archivos del juego. Usamos <code>MaxSpeed</code>, <code>fDriveForce</code>, <code>fTractionCurveMax</code> y <code>fBrakeForce</code> para calcular las estadísticas normalizadas (0-10).</p>
                        </FAQItem>

                        <FAQItem question="¿Por qué algunos coches no tienen imagen?">
                            <p>Solo incluimos vehículos que pasen nuestra "prueba de supervivencia": deben tener una imagen válida (HTTP 200) Y estadísticas físicas reales. Los vehículos de DLC muy nuevos pueden tardar en añadirse a las fuentes de imágenes.</p>
                        </FAQItem>

                        <FAQItem question="¿Cómo puedo ser Administrador?">
                            <p>Los administradores son designados por el Owner del sitio. Si eres admin, verás el botón "Panel Admin 🛡️" en tu menú de usuario. Desde ahí puedes gestionar usuarios, editar perfiles y asignar roles.</p>
                        </FAQItem>

                        <FAQItem question="¿Se guardan mis récords si cierro sesión?">
                            <p>Sí. Todos tus récords (Mayor/Menor, Adivina, Batalla) se guardan automáticamente en tu perfil de usuario y persisten entre sesiones. Puedes verlos en la sección "Récords" de tu perfil.</p>
                        </FAQItem>

                        <FAQItem question="¿Cómo funciona el modo Versus / Comparador?">
                            <p>Ve a la sección VERSUS en el menú. Selecciona dos vehículos y verás una comparación directa de todas sus estadísticas. El ganador se marca en verde. Ideal para decidir tu próxima compra en Legendary Motorsport.</p>
                        </FAQItem>

                        <FAQItem question="He encontrado un bug / error">
                            <p>Repórtalo en la sección de <strong>Ubicación → Contáctanos</strong> o abre un Issue en el repositorio de GitHub. Incluye capturas de pantalla si es posible. Nuestros desarrolladores lo revisarán.</p>
                        </FAQItem>

                        <FAQItem question="¿Puedo cambiar mi avatar?">
                            <p>Sí. Ve a tu Perfil y pulsa el icono de edición junto a tu avatar. Pega la URL de cualquier imagen pública. Los administradores también pueden cambiar avatares desde el Panel Admin.</p>
                        </FAQItem>
                    </section>

                    <div className="legal-footer">
                        <span>MANUAL VERSION: 2.0</span>
                        <span>ÚLTIMA ACTUALIZACIÓN: FEB 2026</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuidePage;
