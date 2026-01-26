import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import './ContactPage.css';

const ContactPage = () => {
  const position = [34.0522, -118.2437]; // Los Angeles coordinates

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Visit <span className="highlight">LSPA</span> HQ</h1>
        <p>Your premium destination for vehicle analytics.</p>
      </div>

      <div className="contact-content">
        <div className="contact-info-section">
          <div className="info-card">
            <h3>Get in Touch</h3>
            <div className="info-item">
              <MapPin className="icon" />
              <span>Vinewood Blvd 12, Los Santos</span>
            </div>
            <div className="info-item">
              <Phone className="icon" />
              <span>+1 555-0100</span>
            </div>
            <div className="info-item">
              <Mail className="icon" />
              <span>contact@lspa.net</span>
            </div>
          </div>

          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <h3>Send Message</h3>
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <textarea placeholder="Message" rows="4" required></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Send Transmission <Send size={16} />
            </button>
          </form>
        </div>

        <div className="map-section">
          <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                LSPA Headquarters <br /> 12 Vinewood Blvd.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
