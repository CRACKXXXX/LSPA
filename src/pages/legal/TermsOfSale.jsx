import React from 'react';
import './Legal.css';

const TermsOfSale = () => {
    return (
        <div className="legal-page-wrapper">
            <div className="legal-container theme-red">
                <header className="legal-header">
                    <h1>Condiciones de Venta y Donaciones</h1>
                </header>
                
                <div className="legal-content">
                    <section className="legal-section">
                        <h2>1. Naturaleza de los Bienes</h2>
                        <p>
                            Todo lo que se intercambia en LSPA es <strong>VIRTUAL</strong> e INTANGIBLE. Usted no está comprando un coche real. No intente reclamar un Grotti X80 Proto en un concesionario de la vida real mostrando su pantalla del móvil; se reirán de usted.
                        </p>
                    </section>
                    
                    <section className="legal-section">
                        <h2>2. Política de "No Refunds" (Sin Devoluciones)</h2>
                        <p>
                            Debido a la naturaleza digital inmediata de los servicios (Pases VIP, Multiplicadores de XP, Acceso a Torneos), <strong>NO SE ADMITEN DEVOLUCIONES</strong> bajo ninguna circunstancia.
                        </p>
                        <p>
                            Es como pagarle a un mercenario de Merryweather: una vez hecho el encargo, el dinero desaparece. Piense antes de gastar sus GTA$.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>3. Cuentas Fraudulentas</h2>
                        <p>
                            Si detectamos que los fondos provienen de tarjetas de crédito robadas o actividades ilícitas (money laundering a través de tarjetas Shark falsas), su cuenta será <strong>PERMABANNEADA</strong> y reportada a las autoridades competentes de Los Santos.
                        </p>
                    </section>
                    
                    <section className="legal-section">
                        <h2>4. Modificaciones de Servicio</h2>
                        <p>
                            Nos reservamos el derecho a nerfear estadísticas, cambiar precios de vehículos o ajustar la economía del juego sin previo aviso para mantener el balance del servidor. Si su coche favorito ahora corre menos, es por el bien de la comunidad (o culpa de los desarrolladores).
                        </p>
                    </section>

                    <div className="legal-footer">
                        <span>TRANSACTION PROTOCOL: ENCRYPTED-256</span>
                        <span>CURRENCY: USD / GTA$</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsOfSale;
