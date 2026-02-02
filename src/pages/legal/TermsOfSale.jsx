import React from 'react';
import './Legal.css';

const TermsOfSale = () => {
    return (
         <div className="legal-page-wrapper">
            <div className="legal-container theme-red">
                <header className="legal-header">
                    <h1>Condiciones de Venta</h1>
                </header>

                <div className="legal-content">
                    <section className="legal-section">
                        <h2>1. Naturaleza del Servicio</h2>
                        <p>LSPA es una plataforma gratuita de consulta. No vendemos vehículos reales ni virtuales. No puedes reclamarnos si tu Grotti Itali RSX no corre tanto como dice la ficha técnica.</p>
                    </section>
                    
                    <section className="legal-section">
                        <h2>2. Moneda Virtual ($GTA)</h2>
                        <p>Todos los precios mostrados son en Dólares de GTA ($). Esta moneda no tiene valor en el mundo real (lamentablemente) y no puede ser canjeada por Euros o Dólares.</p>
                    </section>

                    <section className="legal-section">
                        <h2>3. Devoluciones</h2>
                        <p>Dado que no cobramos nada, no ofrecemos reembolsos. Si no te gusta la web, puedes pedirle a Simeon Yetarian que te devuelva el dinero (bajo tu propio riesgo).</p>
                    </section>

                     <div className="legal-footer">
                        <span>CONTRACT REF: NO-REFUNDS-X99</span>
                        <span>BINDING: YES</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsOfSale;
