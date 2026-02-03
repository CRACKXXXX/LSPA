
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Community.css';

const Community = () => {
    const { getAllUsers } = useAuth();
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setUsers(getAllUsers());
    }, [getAllUsers]);

    const filteredUsers = users.filter(u => 
        u.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="community-page">
            <div className="community-header">
                <h1>COMUNIDAD LSPA</h1>
                <div className="search-bar">
                    <input 
                        type="text" 
                        placeholder="Buscar piloto..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button>🔍</button>
                </div>
            </div>

            <div className="users-grid">
                {filteredUsers.length > 0 ? filteredUsers.map(user => (
                    <div key={user.id} className="user-card glass-panel-sm" onClick={() => navigate(`/profile/${user.id}`)}>
                        <img src={user.avatar} alt={user.username} className="user-card-avatar" />
                        <div className="user-card-info">
                            <h3>{user.username}</h3>
                            <span className="user-card-level">Nivel {user.stats?.level || 1}</span>
                            <span className="user-card-bio">{user.bio?.substring(0, 40)}{user.bio?.length > 40 ? '...' : ''}</span>
                        </div>
                    </div>
                )) : (
                    <p className="no-users">No se encontraron pilotos.</p>
                )}
            </div>
        </div>
    );
};

export default Community;
