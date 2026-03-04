
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useGamification } from '../../context/GamificationContext';
import { useGarage } from '../../context/GarageContext';
import { useCrew } from '../../context/CrewContext';
import CustomDropdown from '../../components/custom-dropdown/CustomDropdown';
import vehiclesData from '../../data/vehicles.json';
import './ProfilePage.css';

const ProfilePage = () => {
    const { userId } = useParams();
    const { user: currentUser, updateUser, getUserById, getAllUsers } = useAuth();
    const { calculateLevel, getXpForNextLevel, getLeaderboard } = useGamification();
    const { crews } = useCrew(); // Get crews to search for user's crew
    const navigate = useNavigate();

    // The user to display
    const [profileUser, setProfileUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Edit State (Only for own profile)
    const [isEditing, setIsEditing] = useState(false);
    const [newBio, setNewBio] = useState('');
    const [newAvatar, setNewAvatar] = useState('');
    const [newFavBrand, setNewFavBrand] = useState('Pegassi');
    const [newFavStyle, setNewFavStyle] = useState('Grip');
    const [newPlayerType, setNewPlayerType] = useState('Rookie'); // Default
    const [garageExpanded, setGarageExpanded] = useState(false);

    const isOwnProfile = !userId || (currentUser && userId === currentUser.id);

    useEffect(() => {
        if (isOwnProfile) {
            setProfileUser(currentUser);
            if (currentUser) {
                setNewBio(currentUser.bio || '');
                setNewAvatar(currentUser.avatar || '');
                setNewFavBrand(currentUser.favorites?.brand || 'Pegassi');
                setNewFavStyle(currentUser.favorites?.style || 'Grip');
                setNewPlayerType(currentUser.favorites?.playerType || 'Rookie');
            }
            setLoading(false);
        } else {
            const found = getUserById(userId);
            setProfileUser(found);
            setLoading(false);
        }
    }, [userId, currentUser, isOwnProfile, getUserById]);

    if (loading || !profileUser) return <div className="loading">Cargando perfil...</div>;
    if (!profileUser && !loading) return <div className="loading">Usuario no encontrado</div>;

    // --- STATS CALCULATION ---
    // Note: 'calculateLevel' from context is generic math.
    const currentXp = profileUser.stats?.xp || 0;
    const currentLevel = profileUser.stats?.level || calculateLevel(currentXp);
    
    // XP Calculation for Bar
    // XP for Current Level Start: ((Level-1)*10)^2
    const xpForThisLevel = Math.pow((currentLevel - 1) * 10, 2);
    // XP for Next Level Start: ((Level)*10)^2
    const xpForNext = Math.pow(currentLevel * 10, 2);
    
    const xpProgressInLevel = currentXp - xpForThisLevel;
    const xpNeededForLevel = xpForNext - xpForThisLevel;
    
    // Percentage
    const progressPercent = Math.min(100, Math.max(0, (xpProgressInLevel / xpNeededForLevel) * 100));

    // Leaderboard (All users)
    const leaderboard = getLeaderboard(); // Note: This might return simplified objects without ID if I didn't update Context.
    // Actually, getLeaderboard in GamificationContext returns { username, avatar, level, xp }. It lacks ID.
    // I should probably fetch 'getAllUsers' here and sort myself to get IDs for navigation.
    const allUsers = getAllUsers ? getAllUsers() : [];
    const richLeaderboard = allUsers
        .sort((a, b) => (b.stats?.xp || 0) - (a.stats?.xp || 0))
        .slice(0, 50);

    // Find Crew for the displayed user
    const userCrew = crews.find(c => c.members.some(m => m.userId === profileUser.id));
    const memberData = userCrew ? userCrew.members.find(m => m.userId === profileUser.id) : null;


    const handleSave = () => {
        if (!isOwnProfile) return;
        updateUser({ 
            bio: newBio, 
            avatar: newAvatar,
            favorites: { 
                brand: newFavBrand, 
                style: newFavStyle,
                playerType: newPlayerType
            }
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        // Reset all local state to original values
        setNewBio(currentUser.bio || '');
        setNewAvatar(currentUser.avatar || '');
        setNewFavBrand(currentUser.favorites?.brand || 'Pegassi');
        setNewFavStyle(currentUser.favorites?.style || 'Grip');
        setNewPlayerType(currentUser.favorites?.playerType || 'Rookie');
        setIsEditing(false);
    };

    return (
        <div className="profile-container">
            {/* Header Section */}
            <div className="profile-header glass-panel">
                <div className="profile-avatar-section">
                    <img 
                        src={profileUser.avatar} 
                        alt="Avatar" 
                        className="profile-avatar" 
                        onError={(e) => e.target.src = "https://gta-assets.pages.dev/avatars/default_profile.png"}
                    />
                    {isEditing && isOwnProfile && (
                            <input 
                                type="text" 
                                id="profile-avatar-input"
                                className="avatar-input"
                                value={newAvatar}
                                onChange={(e) => setNewAvatar(e.target.value)}
                                placeholder="URL de tu Avatar"
                                aria-label="URL del Avatar"
                            />
                    )}
                </div>
                
                <div className="profile-info">

                    <h1>{profileUser.username}</h1>
                    
                    {isEditing && isOwnProfile ? (
                        <div className="edit-form-container">
                            <textarea 
                                id="profile-bio-input"
                                className="bio-input"
                                value={newBio}
                                onChange={(e) => setNewBio(e.target.value)}
                                placeholder="Tu biografía..."
                                aria-label="Biografía"
                            />
                            <div className="edit-row" style={{display:'flex', gap:'1rem', marginBottom:'1rem', flexWrap: 'wrap'}}>
                                <div style={{flex: 1, minWidth: '140px'}}>
                                    <CustomDropdown
                                        options={[
                                            { value: 'Pegassi', label: 'Pegassi', group: 'Lujo / Deportivo', color: 'var(--secondary-color)' },
                                            { value: 'Grotti', label: 'Grotti', group: 'Lujo / Deportivo', color: 'var(--secondary-color)' },
                                            { value: 'Pfister', label: 'Pfister', group: 'Lujo / Deportivo', color: 'var(--secondary-color)' },
                                            { value: 'Truffade', label: 'Truffade', group: 'Lujo / Deportivo', color: 'var(--secondary-color)' },
                                            { value: 'Progen', label: 'Progen', group: 'Lujo / Deportivo', color: 'var(--secondary-color)' },
                                            { value: 'Ocelot', label: 'Ocelot', group: 'Lujo / Deportivo', color: 'var(--secondary-color)' },
                                            { value: 'Dewbauchee', label: 'Dewbauchee', group: 'Lujo / Deportivo', color: 'var(--secondary-color)' },
                                            { value: 'Overflod', label: 'Överflöd', group: 'Lujo / Deportivo', color: 'var(--secondary-color)' },
                                            { value: 'Enus', label: 'Enus', group: 'Lujo / Deportivo', color: 'var(--secondary-color)' },
                                            { value: 'Benefactor', label: 'Benefactor', group: 'Lujo / Deportivo', color: 'var(--secondary-color)' },
                                            { value: 'Karin', label: 'Karin', group: 'JDM / Tuner', color: '#ff4444' },
                                            { value: 'Annis', label: 'Annis', group: 'JDM / Tuner', color: '#ff4444' },
                                            { value: 'Dinka', label: 'Dinka', group: 'JDM / Tuner', color: '#ff4444' },
                                            { value: 'Maibatsu', label: 'Maibatsu', group: 'JDM / Tuner', color: '#ff4444' },
                                            { value: 'Emperor', label: 'Emperor', group: 'JDM / Tuner', color: '#ff4444' },
                                            { value: 'Vulcar', label: 'Vulcar', group: 'JDM / Tuner', color: '#ff4444' },
                                            { value: 'Vapid', label: 'Vapid', group: 'Muscle / Americano', color: '#00bfff' },
                                            { value: 'Bravado', label: 'Bravado', group: 'Muscle / Americano', color: '#00bfff' },
                                            { value: 'Declasse', label: 'Declasse', group: 'Muscle / Americano', color: '#00bfff' },
                                            { value: 'Imponte', label: 'Imponte', group: 'Muscle / Americano', color: '#00bfff' },
                                            { value: 'Albany', label: 'Albany', group: 'Muscle / Americano', color: '#00bfff' },
                                            { value: 'Cheval', label: 'Cheval', group: 'Muscle / Americano', color: '#00bfff' },
                                            { value: 'Invetero', label: 'Invetero', group: 'Muscle / Americano', color: '#00bfff' },
                                            { value: 'Obey', label: 'Obey', group: 'Otros', color: '#fff' },
                                            { value: 'Gallivanter', label: 'Gallivanter', group: 'Otros', color: '#fff' },
                                            { value: 'Lampadati', label: 'Lampadati', group: 'Otros', color: '#fff' },
                                            { value: 'Coil', label: 'Coil', group: 'Otros', color: '#fff' },
                                            { value: 'BF', label: 'BF', group: 'Otros', color: '#fff' },
                                            { value: 'Canis', label: 'Canis', group: 'Otros', color: '#fff' },
                                            { value: 'Dundreary', label: 'Dundreary', group: 'Otros', color: '#fff' },
                                            { value: 'Maxwell', label: 'Maxwell', group: 'Otros', color: '#fff' },
                                        ]}
                                        value={newFavBrand}
                                        onChange={setNewFavBrand}
                                        accentColor="var(--secondary-color)"
                                        fullWidth
                                    />
                                </div>
                                
                                <div style={{flex: 1, minWidth: '140px'}}>
                                    <CustomDropdown
                                        options={[
                                            { value: 'Grip', label: '🏎️ Grip', color: 'var(--primary-color)' },
                                            { value: 'Drift', label: '💨 Drift', color: 'var(--secondary-color)' },
                                            { value: 'Drag', label: '⚡ Drag (Aceleración)', color: '#ff4444' },
                                            { value: 'Rally', label: '🏞️ Rally', color: '#00bfff' },
                                            { value: 'Offroad', label: '🌍 Todoterreno', color: '#8b4513' },
                                            { value: 'Stance', label: '💪 Stance (Postura)', color: '#da70d6' },
                                            { value: 'Track', label: '🏁 Circuito', color: 'var(--primary-color)' },
                                            { value: 'Street', label: '🌃 Callejero', color: '#00F0FF' },
                                            { value: 'Cruiser', label: '🚗 Paseo', color: 'var(--text-muted)' },
                                            { value: 'Pursuit', label: '🚔 Persecución', color: '#ff6600' },
                                            { value: 'Show', label: '✨ Exhibición', color: 'var(--primary-color)' },
                                            { value: 'Touge', label: '⛰️ Touge (Montaña)', color: '#4caf50' },
                                        ]}
                                        value={newFavStyle}
                                        onChange={setNewFavStyle}
                                        accentColor="var(--primary-color)"
                                        fullWidth
                                    />
                                </div>

                                <div style={{flex: 1, minWidth: '140px'}}>
                                    <CustomDropdown
                                        options={[
                                            { value: 'Rookie', label: '👶 Novato (Rookie)', color: 'var(--text-muted)' },
                                            { value: 'Pro', label: '🏆 Profesional (Pro)', color: 'var(--primary-color)' },
                                            { value: 'Casual', label: '🎮 Casual', color: '#00bfff' },
                                            { value: 'Tryhard', label: '💥 Competitivo (Tryhard)', color: '#ff4444' },
                                            { value: 'Grinder', label: '💰 Farmeador (Grinder)', color: '#4caf50' },
                                            { value: 'Hacker', label: '💀 Hacker (Fake)', color: '#9c27b0' },
                                            { value: 'Collector', label: '💎 Coleccionista', color: 'var(--secondary-color)' },
                                            { value: 'Racer', label: '🏁 Corredor', color: 'var(--primary-color)' },
                                            { value: 'Drifter', label: '💨 Drifter', color: '#ff6600' },
                                            { value: 'Roleplayer', label: '🎭 Roleplayer', color: '#00F0FF' },
                                            { value: 'God', label: '👑 Modo Dios', color: '#FFD700' },
                                        ]}
                                        value={newPlayerType}
                                        onChange={setNewPlayerType}
                                        accentColor="var(--accent-color, var(--secondary-color))"
                                        fullWidth
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <p className="profile-bio">{profileUser.bio}</p>
                            
                            {/* CREW INFO BADGE */}
                            {userCrew && memberData && (
                                <div className="profile-crew-info" style={{
                                    marginTop: '8px', 
                                    marginBottom: '12px',
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '8px', 
                                    justifyContent: 'center',
                                    background: 'rgba(255, 215, 0, 0.05)',
                                    padding: '8px',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255, 215, 0, 0.2)'
                                }}>
                                    <span style={{
                                        background: '#FFD700', 
                                        color: 'black', 
                                        padding: '2px 6px', 
                                        borderRadius: '4px', 
                                        fontWeight: 'bold', 
                                        fontSize: '0.8rem',
                                        boxShadow: '0 0 5px rgba(255, 215, 0, 0.5)'
                                    }}>
                                        [{userCrew.tag}]
                                    </span>
                                    <span style={{color: '#eee', fontSize: '0.9rem', fontWeight: '500'}}>
                                        {userCrew.name}
                                    </span>
                                    <span style={{color: '#666'}}>|</span>
                                    <span style={{
                                        color: '#FFD700', 
                                        textTransform: 'uppercase', 
                                        fontSize: '0.75rem', 
                                        letterSpacing: '1px',
                                        border: '1px solid #FFD700',
                                        padding: '1px 5px',
                                        borderRadius: '4px'
                                    }}>
                                        {memberData.role}
                                    </span>
                                </div>
                            )}
                            <div className="favorites-tags" style={{display:'flex', justifyContent:'center', gap:'10px', marginBottom:'1rem'}}>
                                {profileUser.favorites?.brand && <span className="tag-badge">🏎️ {profileUser.favorites.brand}</span>}
                                {profileUser.favorites?.style && <span className="tag-badge">🎨 {profileUser.favorites.style}</span>}
                                {profileUser.favorites?.playerType && <span className="tag-badge">👤 {profileUser.favorites.playerType}</span>}
                            </div>
                        </>
                    )}

                    {/* RESTORED XP BAR & STATS */}
                    {/* MERGED STATS & XP BAR */}
                    <div className="profile-stats-container glass-panel-sm">
                        <div className="stats-row">
                            <div className="stat-item">
                                <span className="stat-label">NIVEL</span>
                                <span className="stat-value">{currentLevel}</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <span className="stat-label">XP TOTAL</span>
                                <span className="stat-value">{currentXp.toLocaleString()}</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <span className="stat-label">SIGUIENTE</span>
                                <span className="stat-value">{xpForNext.toLocaleString()} XP</span>
                            </div>
                        </div>
                        
                        <div className="xp-bar-integrated">
                            <div className="xp-info-row">
                                <span>PRÓXIMO NIVEL</span>
                                <span>{Math.round(progressPercent)}%</span>
                            </div>
                            <div className="xp-track">
                                <div className="xp-fill" style={{width: `${progressPercent}%`}}></div>
                            </div>
                        </div>
                    </div>

                    {/* HIGH SCORES SECTION */}
                    {profileUser.highScores && (
                        <div className="profile-stats-container glass-panel-sm" style={{marginTop: '1rem', borderColor: 'var(--accent-color)'}}>
                            <div className="xp-info-row" style={{justifyContent: 'center', marginBottom: '1rem'}}>
                                <span style={{color: 'var(--accent-color)', fontWeight: 'bold', letterSpacing: '2px'}}>RÉCORDS DE JUEGOS</span>
                            </div>
                            <div className="stats-row" style={{marginBottom: 0}}>
                                <div className="stat-item">
                                    <span className="stat-label">MAYOR MENOR</span>
                                    <span className="stat-value">{profileUser.highScores.higherLower || 0}</span>
                                </div>
                                <div className="stat-divider"></div>
                                <div className="stat-item">
                                    <span className="stat-label">ADIVINA</span>
                                    <span className="stat-value">{profileUser.highScores.guessCar || 0}</span>
                                </div>
                                <div className="stat-divider"></div>
                                <div className="stat-item">
                                    <span className="stat-label">BATALLA</span>
                                    <span className="stat-value">{profileUser.highScores.battleWinStreak || 0}</span>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {isOwnProfile && (
                        <div className="profile-edit-actions">
                            {isEditing ? (
                                <>
                                    <button 
                                        className="edit-btn save-btn"
                                        onClick={handleSave}
                                    >
                                        ✓ GUARDAR CAMBIOS
                                    </button>
                                    <button 
                                        className="edit-btn cancel-btn"
                                        onClick={handleCancel}
                                    >
                                        ✕ DESCARTAR
                                    </button>
                                </>
                            ) : (
                                <button 
                                    className="edit-btn"
                                    onClick={() => setIsEditing(true)}
                                >
                                    ✏️ EDITAR PERFIL
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="profile-grid">
                {/* GLOBAL RANKING (Clickable) */}
                <div className="leaderboard-section glass-panel">
                    <h3>🏆 CLASIFICACIÓN GLOBAL</h3>
                    <div className="leaderboard-list">
                        {richLeaderboard.map((u, index) => (
                        <div 
                            key={index} 
                            className={`leaderboard-item ${currentUser && u.username === currentUser.username ? 'me' : ''}`}
                            onClick={() => navigate(`/profile/${u.id}`)}
                            style={{cursor: 'pointer'}}
                        >
                            <span className="rank">#{index + 1}</span>
                            <div className="player-info">
                                <img src={u.avatar} alt="P" />
                                <span>{u.username}</span>
                            </div>
                            <span className="u-level">Nivel {u.stats?.level || 1}</span>
                        </div>
                    ))}</div>
                </div>

                {/* GARAGE VIEW */}
                <div className="garage-section glass-panel">
                    <h3>GARAJE DE {profileUser.username.toUpperCase()} ({profileUser.garage?.length || 0})</h3>
                    {profileUser.garage?.length > 0 ? (
                        <div className="garage-preview-grid">
                            {profileUser.garage.slice(0, garageExpanded ? undefined : 4).map((item, idx) => {
                                // Handle both string ID and Object {id, tag}
                                const carId = typeof item === 'string' ? item : item.id;
                                const tag = typeof item === 'object' ? item.tag : null;
                                
                                const carData = vehiclesData.find(v => v.id === carId);
                                if (!carData) return null;
                                
                                return (
                                    <div key={idx} className="garage-mini-card" style={{position: 'relative'}}>
                                        <img 
                                            src={carData.image} 
                                            alt={carData.name} 
                                            onError={(e) => e.target.src = "https://via.placeholder.com/100x60?text=No+Img"}
                                        />
                                        <span>{carData.name}</span>
                                        {tag && (() => {
                                            const getTagStyle = (t) => {
                                                switch(t?.toUpperCase()) {
                                                    // SUCCESS / DONE
                                                    case 'CONSEGUIDO': 
                                                    case 'OBTENIDO':
                                                    case 'OWNED':
                                                        return { bg: '#39FF14CC', color: '#000' }; // Neon Green 80%
                                                    
                                                    // PENDING / WARNING
                                                    case 'PENDIENTE':
                                                    case 'WAITING':
                                                        return { bg: '#FF9900CC', color: '#000' }; // Neon Orange 80%
                                                    
                                                    // SEARCHING / HUNTING
                                                    case 'BUSCANDO':
                                                    case 'HUNTING': 
                                                    case 'WANTED':
                                                        return { bg: '#D500F9CC', color: '#fff' }; // Neon Purple 80%
                                                    
                                                    // IMPORTANT / PRIORITY
                                                    case 'IMPORTANTE':
                                                    case 'PRIORITY':
                                                        return { bg: '#FF0000CC', color: '#fff' }; // Bright Red 80%
                                                    
                                                    // TRADED / MOVED
                                                    case 'INTERCAMBIADO':
                                                    case 'TRADED':
                                                        return { bg: '#00E5FFCC', color: '#000' }; // Cyan 80%
                                                    
                                                    // SOLD / GONE
                                                    case 'VENDIDO':
                                                    case 'SOLD':
                                                        return { bg: '#607D8BCC', color: '#fff' }; // Blue Grey 80%
                                                    
                                                    default: return { bg: '#FFFFFFCC', color: '#000' };
                                                }
                                            };
                                            const style = getTagStyle(tag);
                                            return (
                                                <div className="car-tag-overlay" style={{
                                                    position: 'absolute',
                                                    top: '5px',
                                                    right: '5px',
                                                    background: style.bg,
                                                    color: style.color,
                                                    fontSize: '0.65rem',
                                                    fontWeight: '900', // Extra bold
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    boxShadow: `0 2px 10px ${style.bg}`, // Colored glow
                                                    textTransform: 'uppercase',
                                                    border: '1px solid rgba(0,0,0,0.2)',
                                                    letterSpacing: '0.5px',
                                                    backdropFilter: 'blur(4px)' // Added blur for better "glass" effect
                                                }}>
                                                    {tag}
                                                </div>
                                            );
                                        })()}
                                    </div>
                                );
                            })}
                            {profileUser.garage.length > 4 && (
                                <button 
                                    className="edit-btn" 
                                    onClick={() => setGarageExpanded(!garageExpanded)}
                                    style={{gridColumn:'1/-1', marginTop:'1rem', width: '100%'}}
                                >
                                    {garageExpanded ? `MOSTRAR MENOS (VER SOLO 4)` : `VER MÁS (${profileUser.garage.length - 4} RESTANTES)`}
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="empty-garage-state">
                            <p className="empty-garage-text">Sin vehículos en exposición.</p>
                            {isOwnProfile && <button className="edit-btn" onClick={() => navigate('/garage')}>IR AL CONCESIONARIO</button>}
                        </div>
                    )}
                    {isOwnProfile && profileUser.garage?.length > 0 && <a href="/garage" className="view-garage-link">VER MI GARAJE COMPLETO →</a>}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
