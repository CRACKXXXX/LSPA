
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './location.css';

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
    // Coords for "Los Santos" (Los Angeles downtown proxy)
    const position = [34.0522, -118.2437];

  return (
    <div className="location-container">
      <div className="map-section">
        <h2>Nuestra Ubicación</h2>
        <div className="map-wrapper">
            <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                    Los Santos Performance Analyzer HQ <br /> Vinewood Blvd.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
      </div>

      <div className="contact-section">
        <h2>Visítanos</h2>
        <div className="business-info">
            <p><strong>LSPA Headquarters</strong></p>
            <p>1234 Vinewood Blvd, Los Santos, SA 90028</p>
            <p>(Cerca del Aeropuerto Internacional LSIA)</p>
            <br/>
            <p><strong>Horario de Atención:</strong></p>
            <p>Lun - Vie: 09:00 - 18:00</p>
            <p>Sábados: 10:00 - 15:00</p>
        </div>
        
        <h2 style={{marginTop: '2rem'}}>Contáctanos</h2>
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
                <label>Nombre</label>
                <input type="text" required placeholder="Tu nombre" />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="email" required placeholder="tu@email.com" />
            </div>
            <div className="form-group">
                <label>Mensaje</label>
                <textarea rows="5" required placeholder="¿Qué necesitas?"></textarea>
            </div>
            <button type="submit" className="submit-btn">Enviar Mensaje</button>
        </form>
      </div>
    </div>
  );
};

export default Location;
