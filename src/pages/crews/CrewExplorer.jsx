import React, { useState, useMemo } from 'react';
import { useCrew } from '../../context/CrewContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom'; // Added for navigation
import './CrewExplorer.css'; 

const CrewExplorer = () => {
    const { crews, joinCrew, createCrew, currentCrew, loading } = useCrew(); // Added createCrew
    const { user } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate(); // Navigation hook
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCrew, setSelectedCrew] = useState(null);

    const [sortBy, setSortBy] = useState('level_desc'); // Default: Highest Level First

    // Create Crew State
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [createFormData, setCreateFormData] = useState({
        name: '', tag: '', logoUrl: '', description: '', privacy: 'public'
    });

    // Calculate Points Helper (Hoisted)
    const getCrewPoints = (membersArray) => {
        if (!membersArray || !Array.isArray(membersArray)) return 0;
        return membersArray.reduce((total, member) => {
            const level = parseInt(member.level || 1, 10);
            return total + (isNaN(level) ? 1 : level);
        }, 0);
    };

    // Filter Logic
    const filteredCrews = useMemo(() => crews.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.tag.toLowerCase().includes(searchTerm.toLowerCase())
    ), [crews, searchTerm]);

    // Sort Logic
    const sortedCrews = useMemo(() => [...filteredCrews].sort((a, b) => {
        // Use pre-calculated points from Context if available, else fallback
        const pointsA = a.crewPoints ?? getCrewPoints(a.members);
        const pointsB = b.crewPoints ?? getCrewPoints(b.members);
        const membersA = a.members.length;
        const membersB = b.members.length;

        switch (sortBy) {
            case 'level_desc': return pointsB - pointsA;
            case 'level_asc': return pointsA - pointsB;
            case 'members_desc': return membersB - membersA;
            case 'members_asc': return membersA - membersB;
            default: return 0;
        }
    }), [filteredCrews, sortBy]);

    // Back Button Logic
    const handleBack = () => {
        if (currentCrew) {
            navigate('/crews');
        } else {
            navigate('/profile'); // or /home
        }
    };

    // Handle Create Crew
    const handleCreateCrew = (e) => {
        e.preventDefault();
        if (!createFormData.name || !createFormData.tag) {
            showToast('error', 'Nombre y Tag son obligatorios');
            return;
        }
        createCrew(createFormData);
        setShowCreateModal(false);
        navigate('/crews'); // Redirect to dashboard to see new crew
    };

    return (
        <div className="crew-explorer-container">
            {/* --- HEADER --- */}
            <div className="explorer-header" style={{ position: 'relative' }}>
                <button 
                    onClick={handleBack}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        background: 'transparent',
                        border: '1px solid #444',
                        color: '#ccc',
                        padding: '8px 15px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                    }}
                >
                    ⬅ Volver
                </button>

                <h1>🔭 Explorador de Crews</h1>
                <p style={{ color: '#aaa', marginBottom: '20px' }}>Busca, compite y domina Los Santos.</p>
                
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <input 
                        type="text" 
                        placeholder="Buscar por Nombre o TAG..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    
                    {/* CREATE CREW BUTTON - Restored */}
                    {!currentCrew && (
                        <button 
                            onClick={() => setShowCreateModal(true)}
                            className="neon-pulse"
                            style={{
                                background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                                border: 'none',
                                color: 'black',
                                fontWeight: 'bold',
                                padding: '0 20px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                height: '50px',
                                fontSize: '1rem',
                                boxShadow: '0 0 15px rgba(255, 215, 0, 0.4)'
                            }}
                        >
                            + CREAR CREW
                        </button>
                    )}
                </div>

                {/* SORTING DROPDOWN */}
                <div style={{ 
                    marginTop: '20px', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    gap: '15px',
                    background: 'rgba(0,0,0,0.4)',
                    padding: '10px 20px',
                    borderRadius: '50px',
                    border: '1px solid #333',
                    maxWidth: 'fit-content',
                    margin: '20px auto'
                }}>
                    <label style={{
                        color: '#888', 
                        fontSize: '0.85rem', 
                        textTransform: 'uppercase', 
                        letterSpacing: '1px',
                        fontWeight: 'bold'
                    }}>Ordenar:</label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="neon-dropdown" // Ensure this class doesn't conflict, using inline mainly
                        style={{
                            background: 'transparent',
                            color: 'var(--primary-color)',
                            border: 'none',
                            borderBottom: '1px solid var(--primary-color)',
                            padding: '5px 25px 5px 5px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            outline: 'none',
                            fontWeight: 'bold',
                            appearance: 'none', // Remove default arrow
                            backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFD700%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 0px center',
                            backgroundSize: '12px',
                            minWidth: '220px'
                        }}
                    >
                        <option value="level_desc" style={{background: '#111', color: '#fff'}}>🏆 Nivel Total (Mayor a Menor)</option>
                        <option value="level_asc" style={{background: '#111', color: '#fff'}}>🐣 Nivel Total (Menor a Mayor)</option>
                        <option value="members_desc" style={{background: '#111', color: '#fff'}}>👥 Miembros (Más poblada)</option>
                        <option value="members_asc" style={{background: '#111', color: '#fff'}}>👤 Miembros (Menos poblada)</option>
                    </select>
                </div>
            </div>

            {/* --- GRID --- */}
            <div className="crews-grid-unified">
                {sortedCrews.map(crew => {
                    const isMyCrew = currentCrew?.id === crew.id;
                    const hasCrew = !!currentCrew;
                    const isFull = crew.members.length >= (crew.memberLimit || 50); // UPDATED LIMIT
                    const points = getCrewPoints(crew.members);

                    return (
                        <div 
                            key={crew.id} 
                            className="crew-card-unified" 
                            onClick={() => setSelectedCrew(crew)}
                            style={isMyCrew ? { border: '1px solid var(--primary-color)', background: 'rgba(255, 215, 0, 0.05)' } : {}}
                        >
                            {/* LOGO - STRICTLY SIZED (NUCLEAR OPTION) */}
                            <img 
                                src={crew.logoUrl || 'https://placehold.co/150'} 
                                alt={crew.name}
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    minWidth: '80px',
                                    objectFit: 'cover',
                                    borderRadius: '50%',
                                    flexShrink: 0,
                                    backgroundColor: '#222',
                                    border: '2px solid #333'
                                }}
                                onError={(e) => e.target.src = 'https://placehold.co/150'}
                            />

                            {/* INFO */}
                            <div className="crew-card-info">
                                <span className="crew-tag">[{crew.tag}]</span>
                                <h3 className="crew-name">{crew.name}</h3>
                                <div className="crew-meta">
                                    <span>👥 {crew.members.length} / {crew.memberLimit || 50}</span>
                                    <span>🏆 {points} NIVEL TOTAL</span>
                                </div>
                            </div>

                            {/* ACTION BUTTON (Logic Awareness) */}
                            <div>
                                {isMyCrew ? (
                                    <span style={{ 
                                        color: 'var(--primary-color)', 
                                        fontWeight: 'bold', 
                                        fontSize: '0.8rem', 
                                        border: '1px solid var(--primary-color)', 
                                        padding: '4px 8px', 
                                        borderRadius: '4px' 
                                    }}>TU CREW</span>
                                ) : hasCrew ? (
                                    <button className="card-action-btn btn-member">VER DETALLES</button>
                                ) : isFull ? (
                                    <button className="card-action-btn btn-full">LLENO</button>
                                ) : (
                                    <button className="card-action-btn btn-join">UNIRSE</button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* --- SPECTATOR MODAL --- */}
            {selectedCrew && (
                <div className="explorer-modal-overlay" onClick={() => setSelectedCrew(null)}>
                    {(() => {
                        const isFull = selectedCrew.members.length >= (selectedCrew.memberLimit || 50);
                        return (
                        <div className="explorer-modal-content" onClick={e => e.stopPropagation()}>
                            <img 
                                src={selectedCrew.logoUrl || 'https://placehold.co/150'} 
                                alt="Hero"
                                className="modal-hero-img"
                            />
                        <h2 style={{ fontSize: '1.8rem', margin: '10px 0' }}>{selectedCrew.name}</h2>
                        <span className="crew-tag" style={{ fontSize: '1.2rem' }}>[{selectedCrew.tag}]</span>
                        
                        <p style={{ margin: '20px 0', color: '#ccc', fontStyle: 'italic' }}>
                            "{selectedCrew.description || 'Sin descripción disponible.'}"
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', margin: '20px 0' }}>
                            <div>
                                <h4 style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.8rem' }}>Miembros</h4>
                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{selectedCrew.members.length}</span>
                            </div>
                            <div>
                                <h4 style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.8rem' }}>Puntos</h4>
                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{getCrewPoints(selectedCrew.members)}</span>
                            </div>
                        </div>

                        {/* Modal Action Logic */}
                        {currentCrew?.id === selectedCrew.id ? (
                            <button 
                                className="card-action-btn" 
                                style={{ width: '100%', padding: '15px', background: 'var(--primary-color)', color: 'black' }}
                                onClick={() => navigate('/crews')}
                            >
                                IR A MI DASHBOARD
                            </button>
                        ) : !currentCrew && selectedCrew.members.length < (selectedCrew.memberLimit || 50) ? (
                            <button 
                                className="card-action-btn btn-join" 
                                style={{ width: '100%', padding: '15px', fontSize: '1.1rem' }}
                                onClick={() => {
                                    joinCrew(selectedCrew.id);
                                    setSelectedCrew(null);
                                    navigate('/crews'); // Auto redirect after join
                                }}
                            >
                                SOLICITAR INGRESO
                            </button>
                        ) : (
                             <button 
                                className="card-action-btn btn-member" 
                                style={{ width: '100%', padding: '15px', fontSize: '1.1rem' }}
                                disabled
                            >
                                {isFull ? 'CREW LLENA' : 'YA TIENES CREW'}
                            </button>
                        )}
                        
                        <button 
                            onClick={() => setSelectedCrew(null)}
                            style={{ 
                                background: 'transparent', border: 'none', color: '#666', 
                                marginTop: '15px', cursor: 'pointer', textDecoration: 'underline' 
                            }}
                        >
                            Cerrar Vista Previa
                        </button>
                    </div>
                    );
                })()} 
                </div>
            )}

            {/* --- CREATE CREW MODAL --- */}
            {showCreateModal && (
                <div className="explorer-modal-overlay">
                    <div className="explorer-modal-content" style={{ maxWidth: '500px' }}>
                        <h2 style={{ marginBottom: '20px', color: '#FFD700' }}>👑 Fundar Nueva Crew</h2>
                        
                        <form onSubmit={handleCreateCrew} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', color: '#aaa' }}>Nombre de la Crew</label>
                                <input 
                                    type="text" 
                                    className="search-input" 
                                    style={{ width: '100%' }}
                                    value={createFormData.name}
                                    onChange={e => setCreateFormData({...createFormData, name: e.target.value})}
                                    required 
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', color: '#aaa' }}>TAG (Máx 4 letras)</label>
                                <input 
                                    type="text" 
                                    className="search-input" 
                                    style={{ width: '100%', textTransform: 'uppercase' }}
                                    maxLength={4}
                                    value={createFormData.tag}
                                    onChange={e => setCreateFormData({...createFormData, tag: e.target.value.toUpperCase()})}
                                    required 
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', color: '#aaa' }}>URL del Logo</label>
                                <input 
                                    type="url" 
                                    className="search-input" 
                                    style={{ width: '100%' }}
                                    placeholder="https://..."
                                    value={createFormData.logoUrl}
                                    onChange={e => setCreateFormData({...createFormData, logoUrl: e.target.value})}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', color: '#aaa' }}>Lema / Descripción</label>
                                <textarea 
                                    className="search-input"
                                    style={{ width: '100%', minHeight: '80px', fontFamily: 'inherit' }}
                                    value={createFormData.description}
                                    onChange={e => setCreateFormData({...createFormData, description: e.target.value})}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                <button 
                                    type="button" 
                                    onClick={() => setShowCreateModal(false)}
                                    style={{
                                        flex: 1, padding: '12px', background: '#333', color: 'white',
                                        border: 'none', borderRadius: '4px', cursor: 'pointer'
                                    }}
                                >
                                    Cancelar
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={loading} // Basic check, ideally local state
                                    style={{
                                        flex: 1, padding: '12px', background: loading ? '#555' : '#FFD700', color: loading ? '#ccc' : 'black',
                                        border: 'none', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold'
                                    }}
                                >
                                    {loading ? 'CREANDO...' : 'CREAR CREW'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CrewExplorer;
