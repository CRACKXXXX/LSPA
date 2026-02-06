import React, { useState, useEffect } from 'react';
import { useCrew } from '../../context/CrewContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext'; // Import Toast
import './CrewAdmin.css';

// Custom Modal inside Admin for consistent styling
const AdminConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay">
            <div className="admin-modal-content">
                <h3 className="admin-modal-title">{title}</h3>
                <p className="admin-modal-message">{message}</p>
                <div className="modal-actions">
                    <button onClick={onCancel} className="admin-btn-cancel">CANCELAR</button>
                    <button onClick={onConfirm} className="admin-btn-confirm">CONFIRMAR</button>
                </div>
            </div>
        </div>
    );
};

const CrewAdmin = () => {
    const { currentCrew, updateCrewInfo, manageMember, deleteCrew, canManage } = useCrew();
    const { user } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();
    
    // Local state
    const [formData, setFormData] = useState({
        name: '', description: '', tag: '', logoUrl: '', privacy: 'public'
    });

    const [modalConfig, setModalConfig] = useState({ open: false, title: '', message: '', action: null });

    useEffect(() => {
        if (!currentCrew) {
            navigate('/crews');
            return;
        }
        
        const myRole = currentCrew.members.find(m => m.userId === user.id)?.role;
        const allowedRoles = ['owner', 'co-owner', 'staff'];
        if (!allowedRoles.includes(myRole)) {
            navigate('/crews');
        }

        setFormData({
            name: currentCrew.name,
            description: currentCrew.description,
            tag: currentCrew.tag,
            logoUrl: currentCrew.logoUrl || '',
            privacy: currentCrew.privacy || 'public'
        });

    }, [currentCrew, user, navigate]);

    if (!currentCrew) return null;

    const handleSave = () => {
        updateCrewInfo(currentCrew.id, formData);
        // Toast is already handled in context, but we can add one here if context doesn't return
        // Actually context shows 'Success', so we don't need duplicate.
    };

    const openConfirm = (title, message, action) => {
        setModalConfig({ open: true, title, message, action });
    };

    const handleConfirm = () => {
        if (modalConfig.action) modalConfig.action();
        setModalConfig({ ...modalConfig, open: false });
    };

    const myMemberRole = currentCrew.members.find(m => m.userId === user.id)?.role;
    
    // EMERGENCY DISBAND LOGIC (CASCADING AUTHORITY):
    // 1. Owner always can.
    // 2. Staff can IF no Owner AND no Co-Owner.
    // 3. Veteran can IF no Owner, no Co-Owner AND no Staff.
    
    const hasOwnerOrCo = currentCrew.members.some(m => m.role === 'owner' || m.role === 'co-owner');
    const hasStaff = currentCrew.members.some(m => m.role === 'staff');

    let canDisband = false;

    if (myMemberRole === 'owner') {
        canDisband = true;
    } else if (myMemberRole === 'staff') {
        canDisband = !hasOwnerOrCo; // Only if abandoned by leaders
    } else if (myMemberRole === 'veteran') {
        canDisband = !hasOwnerOrCo && !hasStaff; // Only if abandoned by everyone above
    }

    return (
        <div className="crew-admin-container">
            <header className="admin-header">
                <button className="back-btn" onClick={() => navigate('/crews')}>‹ VOLVER AL DASHBOARD</button>
                <h1>⚙️ PANEL DE LIDERAZGO: <span className="neon-text">{currentCrew.name}</span></h1>
            </header>

            <div className="admin-grid">
                {/* SECTION 1: GENERAL SETTINGS */}
                <section className="admin-card settings-card">
                    <h2>✏️ Ajustes Generales</h2>
                    <div className="input-group">
                        <label>Nombre de la Crew</label>
                        <input 
                            type="text" 
                            value={formData.name} 
                            onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                    {/* ... (rest of inputs same as before, simplified for brevity in replacement if needed, but keeping full) ... */}
                    <div className="input-group">
                        <label>TAG (3-4 letras)</label>
                        <input 
                            type="text" 
                            maxLength={4}
                            value={formData.tag} 
                            onChange={e => setFormData({...formData, tag: e.target.value})}
                        />
                    </div>
                    <div className="input-group">
                        <label>Logo URL</label>
                        <input 
                            type="url" 
                            value={formData.logoUrl} 
                            onChange={e => setFormData({...formData, logoUrl: e.target.value})}
                        />
                    </div>
                     <div className="input-group">
                        <label>Privacidad</label>
                        <select 
                            value={formData.privacy}
                            onChange={e => setFormData({...formData, privacy: e.target.value})}
                        >
                            <option value="public">Pública</option>
                            <option value="invite_only">Solo Invitación</option>
                            <option value="closed">Cerrada</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label>Lema / Descripción</label>
                        <textarea 
                            rows={4}
                            value={formData.description} 
                            onChange={e => setFormData({...formData, description: e.target.value})}
                        />
                    </div>
                    <button className="save-changes-btn glow-effect" onClick={handleSave}>
                        GUARDAR CAMBIOS
                    </button>
                </section>

                {/* SECTION 2: MEMBER MANAGEMENT */}
                <section className="admin-card members-card">
                    <h2>👮 Gestión de Personal ({currentCrew.members.length})</h2>
                    <div className="admin-members-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>Usuario</th>
                                    <th>Rango</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCrew.members
                                    .sort((a,b) => (a.role === 'owner' ? -1 : 1)) // Owner first
                                    .map(member => (
                                    <tr key={member.userId}>
                                        <td className="user-cell">
                                            <img src={member.avatar || 'https://placehold.co/40'} alt="avatar" className="mini-avatar"/>
                                            <span>{member.username || member.userId.slice(0,5)}</span>
                                        </td>
                                        <td>
                                            <span className={`badge badge-${member.role}`}>{member.role.toUpperCase()}</span>
                                        </td>
                                        <td className="actions-cell">
                                            {member.userId !== user.id ? (
                                                (() => {
                                                    const roles = { 'owner': 4, 'co-owner': 3, 'staff': 2, 'veteran': 1, 'noob': 0 };
                                                    const myRank = roles[myMemberRole || 'noob'];
                                                    const targetRank = roles[member.role];
                                                    
                                                    // Logic: Can only manage if my rank > target rank
                                                    const canEdit = myRank > targetRank;

                                                    // Logic: Can only assign roles STRICTLY LOWER than mine
                                                    const allRoles = ['co-owner', 'staff', 'veteran', 'noob'];
                                                    const assignableRoles = allRoles.filter(r => roles[r] < myRank);

                                                    return (
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                            <select 
                                                                className="role-selector admin-select"
                                                                disabled={!canEdit}
                                                                value={member.role}
                                                                onChange={(e) => manageMember(currentCrew.id, member.userId, 'setRole', e.target.value)}
                                                            >
                                                                {/* Only show roles I can assign, OR the current role if it's outside my range (so it doesn't vanish visually) */}
                                                                {!assignableRoles.includes(member.role) && <option value={member.role}>{member.role.toUpperCase()}</option>}
                                                                
                                                                {assignableRoles.map(role => (
                                                                    <option key={role} value={role}>{role.toUpperCase()}</option>
                                                                ))}
                                                            </select>

                                                            {canEdit && (
                                                                <button title="Expulsar" className="action-btn kick" onClick={() => 
                                                                    openConfirm('Expulsar Miembro', `¿Seguro que deseas expulsar a ${member.username}?`, () => manageMember(currentCrew.id, member.userId, 'kick'))
                                                                }>✕</button>
                                                            )}
                                                        </div>
                                                    );
                                                })()
                                            ) : (
                                                <span style={{color: '#888', fontSize: '0.8rem'}}>Tú</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* SECTION 3: DANGER ZONE */}
                {canDisband && (
                    <section className="admin-card danger-card">
                        <h2>☠️ ZONA DE PELIGRO</h2>
                        <p>Estas acciones son irreversibles. Ten cuidado.</p>
                        <button className="disband-btn" onClick={() => 
                            openConfirm('ELIMINAR CREW', '¿ESTÁS SEGURO? Esta acción es DEFINITIVA e IRREVERSIBLE. Se borrará todo.', () => {
                                deleteCrew(currentCrew.id);
                                navigate('/crews');
                            })
                        }>
                            DISOLVER CREW
                        </button>
                    </section>
                )}
            </div>

            <AdminConfirmModal 
                isOpen={modalConfig.open} 
                title={modalConfig.title} 
                message={modalConfig.message} 
                onConfirm={handleConfirm} 
                onCancel={() => setModalConfig({...modalConfig, open: false})}
            />
        </div>
    );
};

export default CrewAdmin;
