import React from 'react';
import './Legal.css';

const CookiesPolicy = () => {
    return (
        <div className="legal-page-wrapper">
            <div className="legal-container theme-orange">
                <header className="legal-header">
                    <h1>Política de Cookies (Digital Crumbs)</h1>
                </header>
                
                <div className="legal-content">
                    <section className="legal-section">
                        <h2>1. ¿Qué son estas Cookies?</h2>
                        <p>
                            No son las galletas de la Abuela de Trevor. Son pequeños fragmentos de código de rastreo (trackers) implantados en su dispositivo terminal para mantener su sesión activa en los servidores de LSPA.
                        </p>
                    </section>
                    
                    <section className="legal-section">
                        <h2>2. Tipos de Cookies que Usamos</h2>
                        <ul>
                            <li><strong>Cookies de Sesión (Session Authentication):</strong> Esenciales para verificar que usted es quien dice ser y no un impostor del Cluckin' Bell.</li>
                            <li><strong>Cookies de Analítica (FIB Surveillance):</strong> Nos ayudan a entender qué páginas visita más (probablemente el Garage) para optimizar la carga del sistema.</li>
                            <li><strong>Cookies de Preferencia:</strong> Recuerdan si prefiere el tema oscuro o si le gusta quemar sus retinas con el tema claro.</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>3. Desactivación de Rastreos</h2>
                        <p>
                            Puede desactivar las cookies en su navegador (iFruit OS, Eyefind, etc.), pero la funcionalidad del sitio se romperá más rápido que un Karin Futo en una curva cerrada.
                            Si continúa navegando, asumimos que acepta que le sigamos el rastro por toda la ciudad.
                        </p>
                    </section>

                    <div className="legal-footer">
                        <span>TRACKING STATUS: ACTIVE</span>
                        <span>SERVER: LOS SANTOS CENTRAL</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookiesPolicy;
