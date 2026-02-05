import React, { useState } from 'react';
import { useCrew } from '../../context/CrewContext';
import './CrewFinder.css'; // Restore base layout styles
import './CrewExplorer.css'; // Tweaks

// Unified Card Component
const CrewCard = ({ crew, onClick }) => {
    return (
        <div className="crew-card-item" onClick={onClick}>
            <img 
                src={crew.logoUrl || 'https://placehold.co/150'} 
                alt={crew.name} 
                className="crew-card-logo" 
                style={{ 
                    width: '80px', 
                    height: '80px', 
                    objectFit: 'cover',
                    borderRadius: '12px',
                    flexShrink: 0,
                    marginRight: '15px', /* Force spacing logic */
                    border: '2px solid #333'
                }}
                onError={(e) => e.target.src = 'https://placehold.co/150'} 
            />
            <div className="crew-info" style={{ flex: 1, minWidth: 0 }}>
                <span className="crew-tag">[{crew.tag}]</span>
                <h3>{crew.name}</h3>
                <div className="crew-stats">
                    <span>👥 {crew.members.length} miembros</span>
                    <span>🏆 {crew.crewPoints} pts</span>
                </div>
            </div>
            {/* Status indicator (purely visual in card, action in modal) */}
            <div className="card-status">
                {crew.members.length >= (crew.memberLimit || 20) ? (
                    <span className="status-badge full">LLENO</span>
                ) : (
                    <span className="status-badge open">ABIERTO</span>
                )}
            </div>
        </div>
    );
};

const CrewExplorer = () => {
    const { crews, joinCrew } = useCrew();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCrew, setSelectedCrew] = useState(null); // For Details Modal

    const filteredCrews = crews.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.tag.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="crew-finder"> {/* Reuse finder class for now */}
            <div className="finder-header">
                <h1>🔭 EXPLORADOR DE CREWS</h1>
                <p>Descubre nuevas alianzas y competidores.</p>
                
                <div className="finder-controls">
                    <input 
                        type="text" 
                        placeholder="Buscar por TAG o Nombre..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="explorer-search"
                    />
                </div>
            </div>

            <div className="crews-grid">
                {filteredCrews.map(crew => (
                    <CrewCard 
                        key={crew.id} 
                        crew={crew} 
                        onClick={() => setSelectedCrew(crew)} 
                    />
                ))}
            </div>

            {/* DETAILS MODAL (Spectator Mode) */}
            {selectedCrew && (
                <div className="modal-overlay" onClick={() => setSelectedCrew(null)}>
                    <div className="modal-content explorer-modal" onClick={e => e.stopPropagation()}>
                        <button className="close-x" onClick={() => setSelectedCrew(null)}>✕</button>
                        
                        <div className="modal-header-hero">
                             <img 
                                src={selectedCrew.logoUrl || 'https://placehold.co/150'} 
                                className="hero-logo"
                                alt="logo"
                            />
                            <h2>{selectedCrew.name} <span className="neon-tag">[{selectedCrew.tag}]</span></h2>
                        </div>

                        <div className="modal-body-stats">
                            <div className="stat-box">
                                <h3>Miembros</h3>
                                <p>{selectedCrew.members.length} / {selectedCrew.memberLimit || 20}</p>
                            </div>
                            <div className="stat-box">
                                <h3>Puntos</h3>
                                <p>{selectedCrew.crewPoints}</p>
                            </div>
                            <div className="stat-box">
                                <h3>Fundado</h3>
                                <p>{new Date(selectedCrew.createdAt || Date.now()).toLocaleDateString()}</p>
                            </div>
                        </div>

                        <p className="crew-desc-hero">"{selectedCrew.description || 'Sin descripción'}"</p>

                        <div className="member-preview-list">
                            <h4>Integrantes Destacados</h4>
                            <div className="avatars-row">
                                {selectedCrew.members.slice(0, 5).map(m => (
                                    <div key={m.userId} className="mini-avatar-container" title={m.role}>
                                         <img src={m.avatar || `https://placehold.co/40?text=${m.username?.charAt(0)}`} className="mini-avatar" />
                                    </div>
                                ))}
                                {selectedCrew.members.length > 5 && <div className="more-members">+{selectedCrew.members.length - 5}</div>}
                            </div>
                        </div>

                        <button className="join-hero-btn" onClick={() => {
                            joinCrew(selectedCrew.id);
                            setSelectedCrew(null);
                        }}>
                            SOLICITAR INGRESO
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CrewExplorer;
