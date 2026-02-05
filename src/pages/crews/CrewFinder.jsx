import React, { useState } from 'react';
import { useCrew } from '../../context/CrewContext';
import './CrewFinder.css';

const CrewFinder = () => {
    const { crews, joinCrew, createCrew } = useCrew();
    const [searchTerm, setSearchTerm] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newCrewData, setNewCrewData] = useState({ name: '', tag: '', description: '', privacy: 'public', logoUrl: '' });

    const filteredCrews = crews.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.tag.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreate = (e) => {
        e.preventDefault();
        createCrew(newCrewData);
        setShowCreateModal(false);
        // Reset form
        setNewCrewData({ name: '', tag: '', description: '', privacy: 'public', logoUrl: '' });
    };

    return (
        <div className="crew-finder">
            <div className="finder-header">
                <h1>🔌 Buscador de Crews</h1>
                <p>Únete a una familia o crea tu propio imperio</p>
                
                <div className="finder-controls">
                    <input 
                        type="text" 
                        placeholder="Buscar por nombre o TAG..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="create-btn" onClick={() => setShowCreateModal(true)}>
                        + CREAR CREW
                    </button>
                </div>
            </div>

            <div className="crews-grid">
                {filteredCrews.length === 0 ? (
                    <div style={{textAlign: 'center', gridColumn: '1/-1', padding: '2rem', opacity: 0.7}}>
                        <p>No hay Crews fundadas aún. ¡Sé el primero!</p>
                    </div>
                ) : (
                    filteredCrews.map(crew => (
                        <div key={crew.id} className="crew-card-item">
                            <img src={crew.logoUrl || 'https://via.placeholder.com/150'} alt={crew.name} className="crew-logo" onError={(e) => e.target.src = 'https://via.placeholder.com/150'} />
                            <div className="crew-info">
                                <span className="crew-tag">[{crew.tag}]</span>
                                <h3>{crew.name}</h3>
                                <div className="crew-stats">
                                    <span>👥 {crew.members.length}/{crew.memberLimit}</span>
                                    <span>🏆 {crew.crewPoints} pts</span>
                                </div>
                                <button className="join-btn" onClick={() => joinCrew(crew.id)}>
                                    UNIRSE
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {showCreateModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Fundar nueva Crew</h2>
                        <form onSubmit={handleCreate}>
                            <input 
                                type="text" 
                                placeholder="Nombre (Ej: Los Santos Kings)" 
                                value={newCrewData.name} 
                                onChange={e => setNewCrewData({...newCrewData, name: e.target.value})} 
                                required 
                            />
                            <div style={{display:'flex', gap:'1rem'}}>
                                <input 
                                    type="text" 
                                    placeholder="TAG (Ej: LSK)" 
                                    maxLength={4} 
                                    style={{width:'100px'}}
                                    value={newCrewData.tag} 
                                    onChange={e => setNewCrewData({...newCrewData, tag: e.target.value})} 
                                    required 
                                />
                                <input 
                                    type="url" 
                                    placeholder="URL del Logo (Opcional)" 
                                    style={{flex:1}}
                                    value={newCrewData.logoUrl} 
                                    onChange={e => setNewCrewData({...newCrewData, logoUrl: e.target.value})} 
                                />
                            </div>

                            {/* Logo Preview */}
                            {newCrewData.logoUrl && (
                                <div style={{textAlign:'center', background:'rgba(0,0,0,0.3)', padding:'0.5rem', borderRadius:'4px'}}>
                                    <p style={{fontSize:'0.8rem', color:'#888', marginBottom:'0.5rem'}}>Vista Previa:</p>
                                    <img 
                                        src={newCrewData.logoUrl} 
                                        alt="Logo Preview" 
                                        style={{width:'80px', height:'80px', borderRadius:'50%', objectFit:'cover', border:'2px solid var(--primary-color)'}} 
                                        onError={(e) => {e.target.style.display='none'}}
                                    />
                                </div>
                            )}

                            <textarea 
                                placeholder="Descripción de tu Crew..." 
                                value={newCrewData.description} 
                                onChange={e => setNewCrewData({...newCrewData, description: e.target.value})} 
                            />
                            <div className="modal-actions">
                                <button type="button" onClick={() => setShowCreateModal(false)}>Cancelar</button>
                                <button type="submit">Fundar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CrewFinder;
