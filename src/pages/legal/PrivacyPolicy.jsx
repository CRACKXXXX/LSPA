import React from 'react';
import './Legal.css';

const PrivacyPolicy = () => {
    return (
        <div className="legal-page-wrapper">
            <div className="legal-container theme-yellow">
                <header className="legal-header">
                    <h1>Política de Privacidad</h1>
                </header>
                
                <div className="legal-content">
                    <section className="legal-section">
                        <h2>Introducción</h2>
                        <p>En <strong>Los Santos Performance Analyzer (LSPA)</strong>, nos tomamos muy en serio tu privacidad (casi tanto como Lester Crest).</p>
                    </section>

                    <section className="legal-section">
                        <h2>1. Información Recopilada</h2>
                        <p>No recopilamos información personal real. Sin embargo, para fines de la simulación del sistema, podemos almacenar:</p>
                        <ul>
                            <li>Preferencias de vehículos guardados en tu "Garaje Virtual".</li>
                            <li>Puntuaciones de minijuegos para avergonzarte o glorificarte.</li>
                            <li>Ajustes de configuración visual (Modo Noche, Filtros).</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>2. Uso de la Información</h2>
                        <p>Toda la información se utiliza exclusivamente para mejorar tu experiencia como criminal virtual de alto nivel. No vendemos tus datos al FIB ni a Merryweather Security.</p>
                    </section>

                    <div className="legal-footer">
                        <span>CONFIDENTIALITY LEVEL: TOP SECRET</span>
                        <span>UPDATED: 2026-02-02</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
