
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useNoticias } from '../../context/NoticiasContext';
import CustomDropdown from '../../components/custom-dropdown/CustomDropdown';
import './AdminPanel.css';

const CATEGORIES = ['GTA Online', 'Coches Reales', 'Tuning', 'Carreras', 'Novedades'];
const EMPTY_NOTICIA = { titulo: '', descripcion: '', categoria: 'GTA Online', autor: '', fecha: '', imagen: '', tags: '' };

const AdminPanel = () => {
    const { user, getAllUsers, deleteUser, adminUpdateUser, ADMIN_ID, isAdmin } = useAuth();
    const { noticias, addNoticia, updateNoticia, deleteNoticia } = useNoticias();
    const navigate = useNavigate();

    // --- TAB ---
    const [activeTab, setActiveTab] = useState('usuarios');

    // --- USERS ---
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [formData, setFormData] = useState({});

    // --- NOTICIAS ---
    const [searchNoticias, setSearchNoticias] = useState('');
    const [noticiaModal, setNoticiaModal] = useState(null); // null | 'new' | noticia object (edit)
    const [noticiaForm, setNoticiaForm] = useState(EMPTY_NOTICIA);
    const [deleteNoticia_, setDeleteNoticia_] = useState(null);

    // --- SHARED ---
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        if (!isAdmin) { navigate('/'); }
        else { setUsers(getAllUsers()); }
    }, [isAdmin, navigate, getAllUsers]);

    // Tab switch: if url has #noticias, auto-switch
    useEffect(() => {
        if (window.location.hash === '#noticias') setActiveTab('noticias');
    }, []);

    const showNotification = (msg) => {
        setNotification(msg);
        setTimeout(() => setNotification(null), 3000);
    };

    const refreshUsers = () => setUsers(getAllUsers());

    // ─── USERS CRUD ──────────────────────────────────────────────
    const canManage = (currentUser, targetUser) => {
        if (!currentUser) return false;
        if (currentUser.role === 'owner' || currentUser.id === ADMIN_ID) return true;
        if (currentUser.role === 'admin') {
            if (targetUser.role === 'owner' || targetUser.id === ADMIN_ID) return false;
            return true;
        }
        return false;
    };

    const handleDeleteClick = (u) => setDeleteTarget(u);
    const confirmDelete = () => {
        if (deleteTarget) {
            deleteUser(deleteTarget.id);
            setDeleteTarget(null);
            refreshUsers();
            showNotification(`Usuario ${deleteTarget.username} eliminado.`);
        }
    };
    const handleEditClick = (u) => {
        setEditingUser(u);
        setFormData({ username: u.username, bio: u.bio || '', role: u.role || 'user', level: u.stats?.level || 1, xp: u.stats?.xp || 0, password: u.password, avatar: u.avatar || '' });
    };
    const handleSave = () => {
        if (!editingUser) return;
        adminUpdateUser(editingUser.id, { username: formData.username, bio: formData.bio, role: formData.role, password: formData.password, avatar: formData.avatar, stats: { ...editingUser.stats, level: parseInt(formData.level), xp: parseInt(formData.xp) } });
        setEditingUser(null);
        refreshUsers();
        showNotification('Usuario actualizado correctamente.');
    };
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    // ─── NOTICIAS CRUD ────────────────────────────────────────────
    const filteredNoticias = noticias.filter(n => {
        const term = searchNoticias.toLowerCase();
        return !term || n.titulo?.toLowerCase().includes(term) || n.autor?.toLowerCase().includes(term) || n.categoria?.toLowerCase().includes(term);
    });

    const openNewNoticia = () => {
        setNoticiaForm({ ...EMPTY_NOTICIA, fecha: new Date().toISOString().split('T')[0] });
        setNoticiaModal('new');
    };
    const openEditNoticia = (n) => {
        setNoticiaForm({ ...n, tags: Array.isArray(n.tags) ? n.tags.join(', ') : n.tags || '' });
        setNoticiaModal(n);
    };
    const handleNoticiaChange = (e) => setNoticiaForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const handleSaveNoticia = () => {
        if (!noticiaForm.titulo.trim() || !noticiaForm.descripcion.trim()) {
            showNotification('⚠️ Título y descripción son obligatorios.');
            return;
        }
        if (noticiaModal === 'new') {
            addNoticia(noticiaForm);
            showNotification('✅ Noticia creada correctamente.');
        } else {
            updateNoticia(noticiaModal.id, noticiaForm);
            showNotification('✅ Noticia actualizada correctamente.');
        }
        setNoticiaModal(null);
    };
    const confirmDeleteNoticia = () => {
        if (deleteNoticia_) {
            deleteNoticia(deleteNoticia_.id);
            setDeleteNoticia_(null);
            showNotification(`🗑️ Noticia eliminada.`);
        }
    };

    return (
        <div className="admin-container">
            {notification && <div className="admin-notification">{notification}</div>}

            <div className="admin-header">
                <h1>Panel de Administración 🛡️</h1>
                <p>Bienvenido, {user?.role === 'owner' ? 'Owner' : 'Admin'}. Gestiona usuarios y noticias del foro.</p>
            </div>

            {/* TABS */}
            <div className="admin-tabs">
                <button className={`admin-tab ${activeTab === 'usuarios' ? 'active' : ''}`} onClick={() => setActiveTab('usuarios')}>
                    👥 Usuarios
                </button>
                <button id="tab-noticias" className={`admin-tab ${activeTab === 'noticias' ? 'active' : ''}`} onClick={() => setActiveTab('noticias')}>
                    📰 Noticias del Foro
                </button>
            </div>

            {/* ─── TAB: USUARIOS ─── */}
            {activeTab === 'usuarios' && (<>
                <div className="admin-stats">
                    <div className="stat-card"><h3>Usuarios Totales</h3><p>{users.length}</p></div>
                    <div className="stat-card"><h3>Owners / Admins</h3><p>{users.filter(u => u.role === 'admin' || u.role === 'owner' || u.id === ADMIN_ID).length}</p></div>
                </div>
                <div className="users-table-container">
                    <table className="admin-table">
                        <thead><tr><th>Usuario</th><th>ID</th><th>Nivel / XP</th><th>Rol</th><th>Acciones</th></tr></thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u.id}>
                                    <td><div className="user-cell"><img src={u.avatar} alt="avatar" className="user-avatar-mini" /><div><strong>{u.username}</strong><div style={{fontSize:'0.75rem',color:'#888'}}>{u.email}</div></div></div></td>
                                    <td style={{fontFamily:'monospace',fontSize:'0.8rem',color:'#666'}}>{u.id}</td>
                                    <td>LVL {u.stats?.level || 1}<br/><small style={{color:'#888'}}>{u.stats?.xp || 0} XP</small></td>
                                    <td><span className={`role-badge ${u.role === 'owner' || u.id === ADMIN_ID ? 'owner' : (u.role === 'admin' ? 'admin' : 'user')}`}>{u.id === ADMIN_ID ? 'OWNER' : (u.role ? u.role.toUpperCase() : 'USER')}</span></td>
                                    <td>
                                        {canManage(user, u) ? (<>
                                            <button className="action-btn btn-edit" onClick={() => handleEditClick(u)}>EDITAR</button>
                                            {u.id !== user.id && <button className="action-btn btn-delete" onClick={() => handleDeleteClick(u)}>ELIMINAR</button>}
                                        </>) : <span style={{fontSize:'0.8rem',color:'#555',fontStyle:'italic'}}>Protegido</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>)}

            {/* ─── TAB: NOTICIAS ─── */}
            {activeTab === 'noticias' && (
                <div className="noticias-admin-section">
                    <div className="noticias-admin-header">
                        <div className="noticias-search-wrap">
                            <span>🔍</span>
                            <input
                                type="text"
                                placeholder="Buscar por título, autor o categoría..."
                                value={searchNoticias}
                                onChange={e => setSearchNoticias(e.target.value)}
                            />
                        </div>
                        <button className="btn-new-noticia" onClick={openNewNoticia}>➕ Nueva Noticia</button>
                    </div>

                    <p className="noticias-count">{filteredNoticias.length} noticias {searchNoticias && `para "${searchNoticias}"`}</p>

                    <div className="noticias-admin-table-wrap">
                        <table className="admin-table noticias-table">
                            <thead>
                                <tr>
                                    <th>Título</th>
                                    <th>Categoría</th>
                                    <th>Autor</th>
                                    <th>Fecha</th>
                                    <th>Likes</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredNoticias.map(n => (
                                    <tr key={n.id}>
                                        <td className="noticia-titulo-cell" title={n.titulo}>{n.titulo}</td>
                                        <td><span className="noticia-cat-badge">{n.categoria}</span></td>
                                        <td>{n.autor}</td>
                                        <td style={{whiteSpace:'nowrap'}}>{n.fecha}</td>
                                        <td>❤️ {n.likes || 0}</td>
                                        <td>
                                            <button className="action-btn btn-edit" onClick={() => openEditNoticia(n)}>✏️ Editar</button>
                                            <button className="action-btn btn-delete" onClick={() => setDeleteNoticia_(n)}>🗑️ Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* ─── MODAL: EDITAR/CREAR NOTICIA ─── */}
            {noticiaModal !== null && (
                <div className="editor-modal">
                    <div className="editor-content" style={{maxWidth: '640px'}}>
                        <div className="editor-header">
                            <h2>{noticiaModal === 'new' ? '➕ Nueva Noticia' : '✏️ Editar Noticia'}</h2>
                            <button className="close-btn" onClick={() => setNoticiaModal(null)}>×</button>
                        </div>
                        <div className="editor-body">
                            <div className="form-group">
                                <label>Título *</label>
                                <input type="text" name="titulo" value={noticiaForm.titulo} onChange={handleNoticiaChange} placeholder="Título de la noticia..." />
                            </div>
                            <div className="form-group">
                                <label>Descripción *</label>
                                <textarea name="descripcion" value={noticiaForm.descripcion} onChange={handleNoticiaChange} rows="4" placeholder="Contenido de la noticia..." />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Categoría</label>
                                    <CustomDropdown
                                        options={[
                                            { value: 'GTA Online',    label: '🎮 GTA Online',    color: '#00F0FF' },
                                            { value: 'Coches Reales', label: '🏎️ Coches Reales', color: '#FFD700' },
                                            { value: 'Tuning',        label: '🔧 Tuning',        color: '#FF4500' },
                                            { value: 'Carreras',      label: '🏁 Carreras',      color: '#00FF64' },
                                            { value: 'Novedades',     label: '📰 Novedades',     color: '#BE00FF' },
                                        ]}
                                        value={noticiaForm.categoria}
                                        onChange={(val) => setNoticiaForm(prev => ({ ...prev, categoria: val }))}
                                        accentColor="var(--primary-color)"
                                        fullWidth
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Autor</label>
                                    <input type="text" name="autor" value={noticiaForm.autor} onChange={handleNoticiaChange} placeholder="Nombre del autor..." />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Fecha</label>
                                    <input type="date" name="fecha" value={noticiaForm.fecha} onChange={handleNoticiaChange} />
                                </div>
                                <div className="form-group">
                                    <label>Imagen (URL)</label>
                                    <input type="text" name="imagen" value={noticiaForm.imagen} onChange={handleNoticiaChange} placeholder="https://..." />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Tags (separados por coma)</label>
                                <input type="text" name="tags" value={noticiaForm.tags} onChange={handleNoticiaChange} placeholder="ej: gta, tuning, carreras" />
                            </div>
                        </div>
                        <div className="editor-footer">
                            <button className="btn-cancel" onClick={() => setNoticiaModal(null)}>Cancelar</button>
                            <button className="btn-save" onClick={handleSaveNoticia}>
                                {noticiaModal === 'new' ? '✅ Publicar' : '✅ Guardar Cambios'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── MODAL: CONFIRMAR BORRAR NOTICIA ─── */}
            {deleteNoticia_ && (
                <div className="editor-modal">
                    <div className="editor-content" style={{maxWidth:'400px',textAlign:'center'}}>
                        <div className="editor-header" style={{justifyContent:'center',borderBottom:'none'}}>
                            <h2 style={{color:'#ff003c'}}>⚠️ ELIMINAR NOTICIA</h2>
                        </div>
                        <div className="editor-body">
                            <p>¿Eliminar <strong>&ldquo;{deleteNoticia_.titulo}&rdquo;</strong>?</p>
                            <p style={{fontSize:'0.9rem',color:'#888'}}>Esta acción no se puede deshacer.</p>
                        </div>
                        <div className="editor-footer" style={{justifyContent:'center'}}>
                            <button className="btn-cancel" onClick={() => setDeleteNoticia_(null)}>Cancelar</button>
                            <button className="btn-save" style={{background:'#ff003c',color:'white'}} onClick={confirmDeleteNoticia}>ELIMINAR</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── MODAL: EDITAR USUARIO ─── */}
            {editingUser && (
                <div className="editor-modal">
                    <div className="editor-content">
                        <div className="editor-header">
                            <h2>Editando: {editingUser.username}</h2>
                            <button className="close-btn" onClick={() => setEditingUser(null)}>×</button>
                        </div>
                        <div className="editor-body">
                            <div className="form-row">
                                <div className="form-group"><label>Nombre de Usuario</label><input type="text" name="username" value={formData.username} onChange={handleChange} /></div>
                                <div className="form-group">
                                    <label>Rol</label>
                                    <CustomDropdown options={[{ value:'user',label:'👤 Usuario',color:'#fff'},{value:'admin',label:'🛡️ Admin',color:'var(--secondary-color)'},...((user.role==='owner'||user.id===ADMIN_ID)?[{value:'owner',label:'👑 Owner',color:'var(--primary-color)'}]:[])]} value={formData.role} onChange={(val)=>setFormData({...formData,role:val})} accentColor="var(--secondary-color)" fullWidth />
                                </div>
                            </div>
                            <div className="form-group"><label>URL del Avatar</label><input type="text" name="avatar" value={formData.avatar} onChange={handleChange} placeholder="https://..." /></div>
                            <div className="form-group"><label>Contraseña</label><input type="text" name="password" value={formData.password} onChange={handleChange} /></div>
                            <div className="form-group"><label>Biografía</label><textarea name="bio" value={formData.bio} onChange={handleChange} rows="3"/></div>
                            <div className="form-row">
                                <div className="form-group"><label>Nivel</label><input type="number" name="level" value={formData.level} onChange={handleChange} /></div>
                                <div className="form-group"><label>XP Total</label><input type="number" name="xp" value={formData.xp} onChange={handleChange} /></div>
                            </div>
                        </div>
                        <div className="editor-footer">
                            <button className="btn-cancel" onClick={() => setEditingUser(null)}>Cancelar</button>
                            <button className="btn-save" onClick={handleSave}>Guardar Cambios</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── MODAL: CONFIRMAR BORRAR USUARIO ─── */}
            {deleteTarget && (
                <div className="editor-modal">
                    <div className="editor-content" style={{maxWidth:'400px',textAlign:'center'}}>
                        <div className="editor-header" style={{justifyContent:'center',borderBottom:'none'}}>
                            <h2 style={{color:'#ff003c'}}>⚠️ ELIMINAR USUARIO</h2>
                        </div>
                        <div className="editor-body">
                            <p>¿Estás seguro de que quieres eliminar a <strong>{deleteTarget.username}</strong>?</p>
                            <p style={{fontSize:'0.9rem',color:'#888'}}>Esta acción no se puede deshacer.</p>
                        </div>
                        <div className="editor-footer" style={{justifyContent:'center'}}>
                            <button className="btn-cancel" onClick={() => setDeleteTarget(null)}>Cancelar</button>
                            <button className="btn-save" style={{background:'#ff003c',color:'white'}} onClick={confirmDelete}>ELIMINAR</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
