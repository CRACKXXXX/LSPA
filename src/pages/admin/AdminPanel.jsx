
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const AdminPanel = () => {
    const { user, getAllUsers, deleteUser, adminUpdateUser, ADMIN_ID, isAdmin } = useAuth();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    
    // UI States
    const [editingUser, setEditingUser] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null); // User to potentially delete
    const [notification, setNotification] = useState(null); // Success/Error message
    const [formData, setFormData] = useState({});

    // Protect Route
    useEffect(() => {
        if (!isAdmin) {
            navigate('/');
        } else {
            setUsers(getAllUsers());
        }
    }, [isAdmin, navigate, getAllUsers]);

    const refreshUsers = () => {
        setUsers(getAllUsers());
    };

    const showNotification = (msg) => {
        setNotification(msg);
        setTimeout(() => setNotification(null), 3000);
    };

    // --- DELETE LOGIC ---
    const handleDeleteClick = (u) => {
        setDeleteTarget(u);
    };

    const confirmDelete = () => {
        if (deleteTarget) {
            deleteUser(deleteTarget.id);
            setDeleteTarget(null);
            refreshUsers();
            showNotification(`Usuario ${deleteTarget.username} eliminado.`);
        }
    };

    // --- EDIT LOGIC ---
    const handleEditClick = (u) => {
        setEditingUser(u);
        setFormData({
            username: u.username,
            bio: u.bio || '',
            role: u.role || 'user',
            level: u.stats?.level || 1,
            xp: u.stats?.xp || 0,
            password: u.password,
            avatar: u.avatar || ''
        });
    };

    const handleSave = () => {
        if (!editingUser) return;

        const updates = {
            username: formData.username,
            bio: formData.bio,
            role: formData.role,
            password: formData.password,
            avatar: formData.avatar,
            stats: {
                ...editingUser.stats,
                level: parseInt(formData.level),
                xp: parseInt(formData.xp)
            }
        };

        adminUpdateUser(editingUser.id, updates);
        setEditingUser(null);
        refreshUsers();
        showNotification('Usuario actualizado correctamente.');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // --- PERMISSION HELPER ---
    const canManage = (currentUser, targetUser) => {
        if (!currentUser) return false;
        
        // Owner (or Super ID) can do anything
        if (currentUser.role === 'owner' || currentUser.id === ADMIN_ID) return true;

        // Admin checks
        if (currentUser.role === 'admin') {
            // Admin cannot touch Owner or Super Admin
            if (targetUser.role === 'owner' || targetUser.id === ADMIN_ID) return false;
            // Admin CAN touch other Admins or Users (unless we want to restrict that too, assuming yes for now)
            return true;
        }

        return false;
    };

    return (
        <div className="admin-container">
            {/* NOTIFICATION TOAST */}
            {notification && (
                <div className="admin-notification">
                    {notification}
                </div>
            )}

            <div className="admin-header">
                <h1>Panel de Administración 🛡️</h1>
                <p>Bienvenido, {user?.role === 'owner' ? 'Owner' : 'Admin'}. Tienes control sobre los usuarios.</p>
            </div>

            <div className="admin-stats">
                <div className="stat-card">
                    <h3>Usuarios Totales</h3>
                    <p>{users.length}</p>
                </div>
                <div className="stat-card">
                    <h3>Owners / Admins</h3>
                    <p>{users.filter(u => u.role === 'admin' || u.role === 'owner' || u.id === ADMIN_ID).length}</p>
                </div>
            </div>

            <div className="users-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>ID</th>
                            <th>Nivel / XP</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id}>
                                <td>
                                    <div className="user-cell">
                                        <img src={u.avatar} alt="avatar" className="user-avatar-mini" />
                                        <div>
                                            <strong>{u.username}</strong>
                                            <div style={{fontSize: '0.75rem', color: '#888'}}>{u.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={{fontFamily: 'monospace', fontSize: '0.8rem', color: '#666'}}>
                                    {u.id}
                                </td>
                                <td>
                                    LVL {u.stats?.level || 1} <br/>
                                    <small style={{color: '#888'}}>{u.stats?.xp || 0} XP</small>
                                </td>
                                <td>
                                    <span className={`role-badge ${u.role === 'owner' || u.id === ADMIN_ID ? 'owner' : (u.role === 'admin' ? 'admin' : 'user')}`}>
                                        {u.id === ADMIN_ID ? 'OWNER' : (u.role ? u.role.toUpperCase() : 'USER')}
                                    </span>
                                </td>
                                <td>
                                    {/* Permission Check for Buttons */}
                                    {canManage(user, u) && (
                                        <>
                                            <button className="action-btn btn-edit" onClick={() => handleEditClick(u)}>EDITAR</button>
                                            {u.id !== user.id && ( // Can't delete yourself here, prevent accident
                                                <button className="action-btn btn-delete" onClick={() => handleDeleteClick(u)}>ELIMINAR</button>
                                            )}
                                        </>
                                    )}
                                    {!canManage(user, u) && (
                                        <span style={{fontSize: '0.8rem', color: '#555', fontStyle: 'italic'}}>Protegido</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ERROR / DELETE MODAL */}
            {deleteTarget && (
                <div className="editor-modal">
                    <div className="editor-content" style={{maxWidth: '400px', textAlign: 'center'}}>
                         <div className="editor-header" style={{justifyContent: 'center', borderBottom: 'none'}}>
                            <h2 style={{color: '#ff003c'}}>⚠️ ELIMINAR USUARIO</h2>
                        </div>
                        <div className="editor-body">
                            <p>¿Estás seguro de que quieres eliminar a <strong>{deleteTarget.username}</strong>?</p>
                            <p style={{fontSize: '0.9rem', color: '#888'}}>Esta acción no se puede deshacer.</p>
                        </div>
                        <div className="editor-footer" style={{justifyContent: 'center'}}>
                            <button className="btn-cancel" onClick={() => setDeleteTarget(null)}>Cancelar</button>
                            <button className="btn-save" style={{background: '#ff003c', color: 'white'}} onClick={confirmDelete}>ELIMINAR</button>
                        </div>
                    </div>
                </div>
            )}

            {/* EDIT MODAL */}
            {editingUser && (
                <div className="editor-modal">
                    <div className="editor-content">
                        <div className="editor-header">
                            <h2>Editando: {editingUser.username}</h2>
                            <button className="close-btn" onClick={() => setEditingUser(null)}>×</button>
                        </div>
                        <div className="editor-body">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Nombre de Usuario</label>
                                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label>Rol</label>
                                    <select name="role" value={formData.role} onChange={handleChange}>
                                        <option value="user">Usuario</option>
                                        <option value="admin">Administrador</option>
                                        {/* Only Owner can assign Owner role */}
                                        {(user.role === 'owner' || user.id === ADMIN_ID) && (
                                            <option value="owner">Owner</option>
                                        )}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>URL del Avatar</label>
                                <input type="text" name="avatar" value={formData.avatar} onChange={handleChange} placeholder="https://..." />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Contraseña (Direct)</label>
                                    <input type="text" name="password" value={formData.password} onChange={handleChange} />
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label>Biografía</label>
                                <textarea name="bio" value={formData.bio} onChange={handleChange} rows="3"></textarea>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Nivel</label>
                                    <input type="number" name="level" value={formData.level} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label>XP Total</label>
                                    <input type="number" name="xp" value={formData.xp} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="editor-footer">
                            <button className="btn-cancel" onClick={() => setEditingUser(null)}>Cancelar</button>
                            <button className="btn-save" onClick={handleSave}>Guardar Cambios</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
