import React from 'react';
import '../legal/Legal.css'; // Reuse the legal styles

const GuidePage = () => {
    return (
        <div className="legal-page-wrapper">
            <div className="legal-container theme-yellow">
                <header className="legal-header">
                    <h1>Guía y FAQ</h1>
                </header>

                <div className="legal-content">
                    <section className="legal-section">
                        <h2>¿Qué es LSPA?</h2>
                        <p>Los Santos Performance Analyzer es la herramienta definitiva para comparar vehículos. Usamos datos extraídos directamente de los archivos del juego para darte estadísticas precisas, no las barras falsas que te muestra el concesionario.</p>
                    </section>

                    <section className="legal-section">
                        <h2>Entendiendo las Estadísticas</h2>
                        <ul className="guide-list">
                            <li><strong>Velocidad Máxima:</strong> La velocidad punta real del vehículo en línea recta. No siempre el coche más rápido gana la carrera si no tiene frenos.</li>
                            <li><strong>Aceleración:</strong> Cuánto tarda en llegar de 0 a 100 km/h. Crucial para carreras urbanas con muchas curvas.</li>
                            <li><strong>Frenada:</strong> A menudo ignorada, pero es lo único que evita que te estrelles contra el Maze Bank.</li>
                            <li><strong>Manejo (Tracción):</strong> La capacidad de mantener el agarre en las curvas. Un valor alto significa que el coche va sobre raíles.</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>¿Cómo uso el "Versus"?</h2>
                        <p>Ve a la sección <strong>VERSUS</strong> en el menú. Selecciona dos vehículos de la lista y verás una comparación directa de velocidad, aceleración y manejo. El ganador se marca en verde. Ideal para decidir tu próxima compra en Legendary Motorsport.</p>
                    </section>

                    <section className="legal-section">
                        <h2>Gestión de Garaje</h2>
                        <p>Puedes guardar tus coches favoritos haciendo clic en el icono del corazón ❤️. Luego, ve a la página de Garaje para organizarlos. Usa las etiquetas para marcar qué coches ya tienes ("Obtenido") y cuáles son tu próximo objetivo ("Pendiente").</p>
                    </section>

                    <section className="legal-section">
                        <h2>Minijuegos</h2>
                        <p>Pon a prueba tu conocimiento criminal:</p>
                        <ul>
                            <li><strong>Adivina el Coche:</strong> Identifica vehículos borrosos antes de que se acabe el tiempo.</li>
                            <li><strong>Batalla de Cartas:</strong> Un juego de estrategia usando las estadísticas de los vehículos. ¿Tu T20 ganará en aceleración al Adder?</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>Preguntas Frecuentes (FAQ)</h2>
                        <p><strong>¿Son estos datos 100% reales?</strong><br/>Son estimaciones basadas en pruebas de rendimiento simuladas por nuestros algoritmos. No corresponden necesariamente a los valores exactos del código del juego, ¡pero son ideales para comparar!</p>
                        <p><strong>¿Incluye vehículos del modo Historia?</strong><br/>Incluye una amplia selección de vehículos de GTA Online para que construyas tu garaje soñado.</p>
                    </section>

                    <div className="legal-footer">
                        <span>MANUAL VERSION: 1.0</span>
                        <span>AGENCY APPROVED</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuidePage;
