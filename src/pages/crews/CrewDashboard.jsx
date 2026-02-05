import React, { useState, useEffect, useRef } from 'react';
import { useCrew } from '../../context/CrewContext';
import { useNavigate } from 'react-router-dom';
import './CrewDashboard.css';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-content confirm-modal">
                <h3>{title}</h3>
                <p>{message}</p>
                <div className="modal-actions">
                    <button onClick={onCancel} className="cancel-btn">Cancelar</button>
                    <button onClick={onConfirm} className="confirm-btn">Confirmar</button>
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
    const { leaveCrew, sendCrewMessage } = useCrew();
    const navigate = useNavigate();
    const [messageInput, setMessageInput] = useState('');
    const chatEndRef = useRef(null);

    // Modals State
    const [confirmModal, setConfirmModal] = useState({ open: false, title: '', message: '', action: null });
    const [showImageModal, setShowImageModal] = useState(false);

    // Get current user role
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

    // Sort users by rank
    const rankOrder = { 'owner': 1, 'co-owner': 2, 'staff': 3, 'veteran': 4, 'noob': 5 };
    const sortedMembers = [...crew.members].sort((a, b) => rankOrder[a.role] - rankOrder[b.role]);

    const openConfirm = (title, message, action) => {
        setConfirmModal({ open: true, title, message, action });
    };

    return (
        <div className="crew-dashboard-final">
            {/* COLUMN 1: LEFT SIDEBAR (Info & Actions) */}
            <div className="dash-sidebar">
                <div className="sidebar-header">
                    <img 
                        src={crew.logoUrl || 'https://placehold.co/150'} 
                        alt="Logo" 
                        className="sidebar-logo" 
                        onError={(e) => e.target.src = 'https://placehold.co/150'}
                    />
                    <h2>{crew.name}</h2>
                    <span className="sidebar-tag">[{crew.tag}]</span>
                </div>

                <div className="sidebar-stats">
                    <div className="stat-row">
                        <span>🏆 Puntos</span>
                        <strong>{crew.crewPoints}</strong>
                    </div>
                    <div className="stat-row">
                        <span>👥 Miembros</span>
                        <strong>{crew.members.length}</strong>
                    </div>
                </div>

                <div className="sidebar-actions">
                    {/* ADMIN BUTTON (Only for Staff+) */}
                    {isBoss && (
                        <button 
                            className="admin-panel-btn neon-pulse" 
                            onClick={() => navigate('/crew-admin')}
                        >
                            ⚙️ PANEL DE LIDER
                        </button>
                    )}

                    <button 
                        className="explore-btn" 
                        onClick={() => navigate('/crew-explorer')}
                    >
                        🔭 EXPLORAR OTRAS
                    </button>

                    <button className="leave-text-btn" onClick={() => openConfirm('Abandonar Crew', '¿Seguro que deseas salir?', leaveCrew)}>
                        Abandonar Crew
                    </button>
                </div>
            </div>

            {/* COLUMN 2: CENTER (Chat) */}
            <div className="dash-chat">
                <div className="chat-header-bar">
                    <h3>💬 Canal Principal</h3>
                    <span className="online-indicator">🟢 Conectado</span>
                </div>
                
                <div className="chat-area">
                    {crew.chat.length === 0 && <div className="empty-chat">El chat está vacío. ¡Rompe el hielo!</div>}
                    {crew.chat.map(msg => {
                        const isMe = msg.senderId === currentUser.id;
                        return (
                            <div key={msg.id} className={`chat-bubble-row ${isMe ? 'right' : 'left'}`}>
                                {!isMe && <img src={msg.senderAvatar || 'https://placehold.co/40'} className="chat-avatar" alt="av" />}
                                
                                <div className="bubble-wrapper">
                                    {!isMe && (
                                        <span className="bubble-sender-name" style={{
                                            fontSize: '0.75rem', 
                                            color: '#aaa', 
                                            marginBottom: '2px', 
                                            display: 'block', 
                                            fontWeight: 'bold'
                                        }}>
                                            {msg.senderName}
                                        </span>
                                    )}
                                    <div className={`chat-bubble ${isMe ? 'me' : 'others'}`}>
                                        {msg.type === 'text' && <p>{msg.content}</p>}
                                        {msg.type === 'image' && <img src={msg.content} className="bubble-image" alt="shared" />}
                                        
                                        <span className="bubble-time">{new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={chatEndRef} />
                </div>

                <form className="chat-input-bar" onSubmit={handleSend}>
                    <button type="button" className="icon-btn" onClick={() => setShowImageModal(true)}>📷</button>
                    <input 
                        type="text" 
                        placeholder="Escribe un mensaje..." 
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                    />
                    <button type="submit" className="send-plane-btn">➤</button>
                </form>
            </div>

            {/* COLUMN 3: RIGHT SIDEBAR (Members) */}
            <div className="dash-members">
                <h3>MIEMBROS</h3>
                <div className="members-scroll">
                    {sortedMembers.map(member => (
                        <div key={member.userId} className="member-card-mini">
                            <div className={`status-dot ${['owner','co-owner'].includes(member.role) ? 'gold' : 'green'}`} />
                            <div className="member-info">
                                <span className="m-name">{member.username || 'Usuario'}</span>
                                <span className={`m-role role-${member.role}`}>{member.role.toUpperCase()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

             {/* Render Custom Modals */}
             <ConfirmModal 
                isOpen={confirmModal.open} 
                title={confirmModal.title} 
                message={confirmModal.message} 
                onConfirm={() => { confirmModal.action(); setConfirmModal({ ...confirmModal, open: false }); }} 
                onCancel={() => setConfirmModal({ ...confirmModal, open: false })} 
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
