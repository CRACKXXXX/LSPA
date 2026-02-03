import React from 'react';
import './Legal.css';

const PrivacyPolicy = () => {
    return (
        <div className="legal-page-wrapper">
            <div className="legal-container theme-yellow">
                <header className="legal-header">
                    <h1>Protocolo de Privacidad LSPD-8942</h1>
                </header>
                
                <div className="legal-content">
                    <section className="legal-section">
                        <h2>1. Recopilación de Datos Biométricos</h2>
                        <p>
                            Al conectarse a la red LSPA (Los Santos Performance Analyzer), usted consiente explícitamente el escaneo de sus datos de usuario de Ciudadanos de Los Santos. 
                            Recopilamos:
                        </p>
                        <ul>
                            <li>ID de Ciudadano y Alias (Username) para fichaje policial.</li>
                            <li>Historial de vehículos registrados en el DMV (Garage Data).</li>
                            <li>Telemetría de rendimiento y preferencias de conducción peligrosas.</li>
                        </ul>
                    </section>
                    
                    <section className="legal-section">
                        <h2>2. Uso de la Información (NOOSE Act)</h2>
                        <p>Sus datos se procesan en los servidores seguros de Weazel News Network y FIB Cloud para:</p>
                        <ul>
                            <li>Determinar su nivel de amenaza en el asfalto (Cálculo de XP).</li>
                            <li>Organizar clasificaciones globales de los "Más Buscados".</li>
                            <li>Mejorar la precisión del algoritmo de predicción de rendimiento de vehículos.</li>
                        </ul>
                        <p><strong>AVISO:</strong> LSPA no venderá sus datos a organizaciones ilícitas, salvo orden judicial de la San Andreas Supreme Court.</p>
                    </section>

                    <section className="legal-section">
                        <h2>3. Derechos ARCO (San Andreas Constitution)</h2>
                        <p>
                            Tiene derecho a solicitar la eliminación de su ficha criminal (perfil) de nuestra base de datos si decide abandonar la ciudad o entrar en el programa de protección de testigos.
                            Contacte al administrador del sistema a través de LifeInvader.
                        </p>
                    </section>

                    <div className="legal-footer">
                        <span>CONFIDENTIALITY LEVEL: TOP SECRET</span>
                        <span>UPDATED: 2026-08-12</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
