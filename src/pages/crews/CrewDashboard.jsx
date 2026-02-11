import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useCrew } from '../../context/CrewContext';
import { useNavigate } from 'react-router-dom';
import './CrewDashboard.css';

// --- HELPER: DATE FORMATTER ---
const getDateLabel = (dateInput) => {
    const d = new Date(dateInput);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Reset hours for clean comparison
    const dStr = d.toDateString();
    const tStr = today.toDateString();
    const yStr = yesterday.toDateString();

    if (dStr === tStr) return 'HOY';
    if (dStr === yStr) return 'AYER';
    return d.toLocaleDateString(); // DD/MM/YYYY
};

// --- COMPONENT: STANDARD MODAL ---
const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-content confirm-modal">
                <h3>{title}</h3>
                <p>{message}</p>
                <div className="modal-actions">
                    <button onClick={onCancel} className="btn-modal-cancel">Cancelar</button>
                    <button onClick={onConfirm} className="btn-modal-confirm">Confirmar</button>
                </div>
            </div>
        </div>
    );
};

// --- COMPONENT: DANGER MODAL (RED THEME) ---
const DangerModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay" style={{backdropFilter: 'blur(5px)'}}>
            <div className="modal-content danger-modal">
                <h3>⚠️ {title}</h3>
                <p>{message}</p>
                <div className="modal-actions">
                    <button onClick={onCancel} className="btn-modal-cancel">CANCELAR</button>
                    <button onClick={onConfirm} className="btn-modal-danger">ELIMINAR DEFINITIVAMENTE</button>
                </div>
            </div>
        </div>
    );
};

const ImageUrlModal = ({ isOpen, onClose, onSend }) => {
    const [url, setUrl] = useState('');
    if (!isOpen) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-content input-modal">
                <h3>Enviar Imagen</h3>
                <input 
                    type="url" 
                    placeholder="https://ejemplo.com/imagen.jpg" 
                    value={url} 
                    onChange={e => setUrl(e.target.value)}
                    autoFocus
                />
                <div className="modal-actions">
                    <button onClick={onClose} className="cancel-btn">Cancelar</button>
                    <button onClick={() => { onSend(url); setUrl(''); onClose(); }} className="confirm-btn">Enviar</button>
                </div>
            </div>
        </div>
    );
};

const CrewDashboard = ({ crew, currentUser }) => {
    // GUARD CLAUSE
    if (!crew) return <div className="loading-spinner">Cargando Crew...</div>;
    if (!currentUser) return <div className="loading-spinner">Esperando usuario...</div>;

    const { leaveCrew, deleteCrew, sendCrewMessage } = useCrew();
    const navigate = useNavigate();
    const [messageInput, setMessageInput] = useState('');
    const chatEndRef = useRef(null);

    // Modals State
    const [confirmModal, setConfirmModal] = useState({ open: false, title: '', message: '', action: null });
    const [dangerModal, setDangerModal] = useState({ open: false, title: '', message: '', action: null });
    const [showImageModal, setShowImageModal] = useState(false);

    // Role Logic
    const myMemberData = crew.members.find(m => m.userId === currentUser.id);
    const myRole = myMemberData ? myMemberData.role : 'noob';
    const isBoss = ['owner', 'co-owner', 'staff'].includes(myRole);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [crew.chat]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!messageInput.trim()) return;
        sendCrewMessage('text', messageInput);
        setMessageInput('');
    };

    const handleSendImage = (url) => {
        if (!url.trim()) return;
        sendCrewMessage('image', url);
    };

    const openConfirm = (title, message, action) => {
        setConfirmModal({ open: true, title, message, action });
    };

    const openDanger = (title, message, action) => {
        setDangerModal({ open: true, title, message, action });
    };

    // Sort users by rank
    const rankOrder = { 'owner': 1, 'co-owner': 2, 'staff': 3, 'veteran': 4, 'noob': 5 };
    const sortedMembers = [...crew.members].sort((a, b) => rankOrder[a.role] - rankOrder[b.role]);

    // Role Styles
    const getRoleStyle = (role) => {
        switch(role) {
            case 'owner': return { border: '3px solid #FF0033', boxShadow: '0 0 10px #FF0033' };
            case 'co-owner': return { border: '3px solid #FF8C00', boxShadow: '0 0 8px #FF8C00' };
            case 'staff': return { border: '3px solid #FFD700' };
            case 'veteran': return { border: '3px solid #00E676' };
            default: return { border: '1px solid #555' }; // Noob
        }
    };

    return (
        <div className="crew-dashboard-vertical">
            {/* --- TOP HEADER --- */}
            <header className="dashboard-header">
                <div className="header-main-content">
                    <div className="header-info-block">
                        <img 
                            src={crew.logoUrl || 'https://placehold.co/150'} 
                            alt="Crew Logo" 
                            className="header-crew-logo"
                            onError={(e) => e.target.src = 'https://placehold.co/150'}
                        />
                        <div className="header-text">
                            <h2>{crew.name} <span className="header-tag">[{crew.tag}]</span></h2>
                            <div className="header-stats-row">
                                <span>🏆 {
                                    useMemo(() => crew.members.reduce((acc, m) => {
                                         const val = parseInt(m.level || 1, 10);
                                         return acc + (isNaN(val) ? 1 : val);
                                    }, 0), [crew.members])
                                } NIVEL TOTAL</span>
                                <span>👥 {crew.members.length} Miembros</span>
                            </div>
                        </div>
                    </div>

                    <div className="header-actions">
                        {isBoss && (
                            <button className="header-btn admin-btn" onClick={() => navigate('/crew-admin')}>
                                ⚙️ LIDER
                            </button>
                        )}
                        <button className="header-btn explore-btn" onClick={() => navigate('/crew-explorer')}>
                            🔭 EXPLORAR
                        </button>
                        <button className="header-btn leave-btn" onClick={() => openConfirm('Abandonar', '¿Salir de la crew?', leaveCrew)}>
                            🚪 SALIR
                        </button>
                    </div>
                </div>

                <div className="header-members-roll">
                    {sortedMembers.map(m => (
                        <div key={m.userId} className="roll-avatar-container" title={`${m.username} (${m.role})`}>
                            <img 
                                src={m.avatar || 'https://placehold.co/100'} 
                                alt={m.username} 
                                className="roll-avatar"
                                style={getRoleStyle(m.role)} 
                            />
                            <div className={`status-indicator ${m.isOnline ? 'online' : 'gold'}`} /> 
                        </div>
                    ))}
                </div>
            </header>

            {/* --- CENTER CHAT --- */}
            <main className="dashboard-chat-expanded">
                <div className="chat-messages-area">
                    {crew.chat.length === 0 && <div className="empty-chat-placeholder">El chat está vacío. ¡Saluda a tu crew! 👋</div>}
                    
                    {crew.chat.map((msg, index) => {
                        const isMe = msg.senderId === currentUser.id;
                        const senderMember = crew.members.find(m => m.userId === msg.senderId);
                        const senderRole = senderMember ? senderMember.role : (msg.role || 'noob');

                        // --- DATE SEPARATOR LOGIC ---
                        let showDateSeparator = false;
                        let dateLabel = '';
                        
                        // If it's the first message, show date
                        if (index === 0) {
                            showDateSeparator = true;
                            dateLabel = getDateLabel(msg.timestamp);
                        } else {
                            // Compare with previous message
                            const prevMsg = crew.chat[index - 1];
                            const prevLabel = getDateLabel(prevMsg.timestamp);
                            const currentLabel = getDateLabel(msg.timestamp);
                            
                            if (prevLabel !== currentLabel) {
                                showDateSeparator = true;
                                dateLabel = currentLabel;
                            }
                        }

                        return (
                            <React.Fragment key={msg.id}>
                                {showDateSeparator && (
                                    <div className="chat-date-separator">
                                        <span>{dateLabel}</span>
                                    </div>
                                )}
                                <div className={`message-row ${isMe ? 'own-message' : 'other-message'}`}>
                                    {!isMe && (
                                        <div className="message-avatar-col">
                                            <img 
                                                src={msg.senderAvatar || 'https://placehold.co/50'} 
                                                alt="av" 
                                                className="chat-msg-avatar" 
                                                style={getRoleStyle(senderRole)}
                                            />
                                        </div>
                                    )}
                                    
                                    <div className="message-bubble-container">
                                        {!isMe && <span className="message-sender-name">{msg.senderName}</span>}
                                        
                                        <div className="message-bubble">
                                            {msg.type === 'text' && <p>{msg.content}</p>}
                                            {msg.type === 'image' && <img src={msg.content} className="chat-shared-image" alt="shared" />}
                                            <span className="message-time">
                                                {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        );
                    })}
                    <div ref={chatEndRef} />
                </div>

                <form className="chat-input-wrapper" onSubmit={handleSend}>
                    <button type="button" className="chat-tool-btn" onClick={() => setShowImageModal(true)}>📷</button>
                    <input 
                        type="text" 
                        placeholder="Escribe un mensaje a tu crew..." 
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        className="chat-main-input"
                    />
                    <button type="submit" className="chat-send-btn">Enviar ➤</button>
                </form>

                {/* EMERGENCY DISBAND BUTTON */}
                {(() => {
                    const hasOwnerOrCo = crew.members.some(m => m.role === 'owner' || m.role === 'co-owner');
                    const hasStaff = crew.members.some(m => m.role === 'staff');
                    
                    let canDisband = false;
                    if (myRole === 'staff') canDisband = !hasOwnerOrCo;
                    else if (myRole === 'veteran') canDisband = !hasOwnerOrCo && !hasStaff;

                    if (canDisband) {
                        return (
                            <div style={{padding: '10px', background: '#111', borderTop: '1px solid #333', textAlign: 'center'}}>
                                <button 
                                    className="disband-btn-emergency"
                                    onClick={() => openDanger('ELIMINAR CREW', '¿ESTÁS SEGURO? La crew está abandonada y tú tienes el mando. Esta acción es IRREVERSIBLE.', () => {
                                        deleteCrew(crew.id);
                                        navigate('/crews');
                                    })}
                                >
                                    ☠️ DISOLVER CREW (EMERGENCIA) ☠️
                                </button>
                            </div>
                        );
                    }
                    return null;
                })()}

            </main>

             <ConfirmModal 
                isOpen={confirmModal.open} 
                title={confirmModal.title} 
                message={confirmModal.message} 
                onConfirm={() => { confirmModal.action(); setConfirmModal({ ...confirmModal, open: false }); }} 
                onCancel={() => setConfirmModal({ ...confirmModal, open: false })} 
            />

            <DangerModal 
                isOpen={dangerModal.open} 
                title={dangerModal.title} 
                message={dangerModal.message} 
                onConfirm={() => { dangerModal.action(); setDangerModal({ ...dangerModal, open: false }); }} 
                onCancel={() => setDangerModal({ ...dangerModal, open: false })}
            />

            <ImageUrlModal 
                isOpen={showImageModal} 
                onClose={() => setShowImageModal(false)} 
                onSend={handleSendImage} 
            />
        </div>
    );
};

export default CrewDashboard;
