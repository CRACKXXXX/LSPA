import React from 'react';
import './Legal.css';

const CookiesPolicy = () => {
    return (
        <div className="legal-page-wrapper">
            <div className="legal-container theme-orange">
                <header className="legal-header">
                    <h1>Política de Cookies</h1>
                </header>

                <div className="legal-content">
                    <section className="legal-section">
                        <h2>Introducción</h2>
                        <p>Este sitio web utiliza cookies. Y no, no son las que venden en los dispensadores de Cluckin' Bell.</p>
                    </section>

                    <section className="legal-section">
                        <h2>Tipos de Cookies</h2>
                        <ul>
                            <li><strong>Cookies Técnicas:</strong> Necesarias para que el sitio funcione y no explote como un Vapid Pinto.</li>
                            <li><strong>Cookies de Personalización:</strong> Recuerdan si prefieres ver "Superdeportivos" o "Bólidos".</li>
                            <li><strong>Cookies de Análisis (Ficticias):</strong> Para saber cuánta gente intenta comprar el Oppressor Mk II.</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>Control de Cookies</h2>
                        <p>Puedes desactivar las cookies en tu navegador, pero entonces tu experiencia será tan lenta como un PostOP Van cuesta arriba.</p>
                    </section>

                    <div className="legal-footer">
                        <span>TRACKING ID: COOKIE-MONSTER-77</span>
                        <span>STATUS: ACTIVE</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookiesPolicy;
