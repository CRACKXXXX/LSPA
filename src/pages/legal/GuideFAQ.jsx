import React from 'react';
import './Legal.css';

const GuideFAQ = () => {
    return (
        <div className="legal-page-wrapper">
            <div className="legal-container theme-yellow">
                <header className="legal-header">
                    <h1>Guía de Supervivencia y FAQ</h1>
                </header>
                
                <div className="legal-content">
                    <section className="legal-section">
                        <h2>¿Cómo subo de nivel rápidamente?</h2>
                        <p>
                            La forma más rápida es participar en el <strong>"Versus Mode"</strong> y ganar debates sobre qué coche es mejor. También puedes ganar XP acertando en el minijuego de "Adivina el Coche".
                        </p>
                        <ul>
                            <li>Ganar Batalla: +50 XP</li>
                            <li>Adivinar Coche: +15 XP</li>
                            <li>Añadir Coche al Garaje: +5 XP</li>
                        </ul>
                    </section>
                    
                    <section className="legal-section">
                        <h2>¿Cómo registro mis vehículos?</h2>
                        <p>
                            Ve al catálogo global (Inicio), busca tu vehículo y pulsa el botón del corazón. Automáticamente se vinculará a tu ID de ciudadano y aparecerá en tu perfil público. 
                            Puedes organizar tu colección por etiquetas como "CONSEGUIDO" o "BUSCANDO".
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>¿Los datos son reales del juego?</h2>
                        <p>
                            Absolutamente. Utilizamos la base de datos de manejo (handling.meta) extraída directamente de los archivos del juego para calcular:
                        </p>
                        <ul>
                            <li>Velocidad Punta Real (no la barra falsa del juego)</li>
                            <li>Aceleración (0-60 mph)</li>
                            <li>Coeficiente de Tracción</li>
                        </ul>
                    </section>
                    
                    <section className="legal-section">
                        <h2>Análisis de Rendimiento (Analytics)</h2>
                        <p>
                            Accede a la sección de <strong>Análisis</strong> para ver gráficas detalladas sobre la distribución de tus vehículos por clase, valor total del garaje y estadísticas de velocidad promedio. Esta herramienta es esencial para optimizar tu colección y dominar las calles de Los Santos.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>He encontrado un bug / error</h2>
                        <p>
                            Si encuentras un fallo en la Matrix (glitches visuales, datos incorrectos o errores de carga), repórtalo inmediatamente.
                        </p>
                        <p>
                            Dirígete a la sección de <a href="/location" style={{color: 'var(--accent-color)', textDecoration: 'none', fontWeight: 'bold'}}>Ubicación</a> y utiliza el formulario de <strong>"Contáctanos"</strong>. Nuestros desarrolladores (o los agentes del FIB) revisarán tu informe.
                        </p>
                    </section>

                    <div className="legal-footer">
                        <span>MANUAL VERSION: 3.1.5</span>
                        <span>STATUS: OPERATIONAL</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuideFAQ;
