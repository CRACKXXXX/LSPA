
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useToast } from '../../context/ToastContext';
import 'leaflet/dist/leaflet.css';
import './Location.css';

// Fix for default marker icon in leaflet with webpack/vite
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const Location = () => {
    const { showToast } = useToast();
    const position = [18.3003, -64.8255]; // Little Saint James

    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate network delay
        setTimeout(() => {
            showToast('success', `¡Mensaje enviado! Gracias, ${form.name}.`);
            setForm({ name: '', email: '', message: '' }); // Reset
        }, 500);
    };

    return (
        <div className="location-container">
            <div className="map-section glass-panel">
                <h2 className="neon-text">📍 NUESTRA UBICACIÓN</h2>
                <div className="map-wrapper">
                    <MapContainer center={position} zoom={15} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position}>
                            <Popup>
                                <strong>LSPA Headquarters</strong><br />Little Saint James, USVI
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>

            <div className="contact-section glass-panel">
                <h2 className="neon-text">🏢 CONTACTO DIRECTO</h2>
                
                <div className="business-info">
                    <div className="info-item">
                        <span className="icon">🏠</span>
                        <div>
                            <strong>OFICINA CENTRAL</strong>
                            <p>Little Saint James Island, U.S. Virgin Islands</p>
                        </div>
                    </div>
                    <div className="info-item">
                        <span className="icon">🕒</span>
                        <div>
                            <strong>HORARIO</strong>
                            <p>24/7 (Siempre abiertos para el negocio)</p>
                        </div>
                    </div>
                </div>
                
                <h3 className="form-title">📩 ENVIAR MENSAJE</h3>
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>👤 NOMBRE</label>
                        <input 
                            type="text" 
                            required 
                            placeholder="Tu nombre o alias..." 
                            value={form.name}
                            onChange={e => setForm({...form, name: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label>📧 EMAIL</label>
                        <input 
                            type="email" 
                            required 
                            placeholder="contacto@ejemplo.com" 
                            value={form.email}
                            onChange={e => setForm({...form, email: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label>📝 MENSAJE</label>
                        <textarea 
                            rows="4" 
                            required 
                            placeholder="¿En qué podemos ayudarte?"
                            value={form.message}
                            onChange={e => setForm({...form, message: e.target.value})}
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-btn neon-pulse">🚀 ENVIAR TRANSMISIÓN</button>
                </form>
            </div>
        </div>
    );
};

export default Location;
