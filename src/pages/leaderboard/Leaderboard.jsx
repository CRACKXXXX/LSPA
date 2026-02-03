
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Leaderboard.css';

const Leaderboard = () => {
    const { getAllUsers } = useAuth();
    const [users, setUsers] = useState([]);
    const [activeTab, setActiveTab] = useState('global'); // 'global' | 'higherLower'
    const navigate = useNavigate();

    useEffect(() => {
        const allUsers = getAllUsers();
        setUsers(allUsers);
    }, [getAllUsers]);

    const getSortedUsers = () => {
        if (activeTab === 'global') {
            return [...users].sort((a, b) => (b.stats?.xp || 0) - (a.stats?.xp || 0));
        } else if (activeTab === 'higherLower') {
            return [...users].sort((a, b) => (b.highScores?.higherLower || 0) - (a.highScores?.higherLower || 0));
        }
        return users;
    };

    const sortedUsers = getSortedUsers();
    
    // Top 3 for Podium
    const top3 = sortedUsers.slice(0, 3);
    const rest = sortedUsers.slice(3);

    return (
        <div className="leaderboard-page-container">
            <h1 className="neon-title">CLASIFICACIÓN LSPA</h1>
            
            <div className="leaderboard-tabs">
                <button 
                    className={`tab-btn ${activeTab === 'global' ? 'active' : ''}`}
                    onClick={() => setActiveTab('global')}
                >
                    NIVEL GLOBAL (XP)
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'higherLower' ? 'active' : ''}`}
                    onClick={() => setActiveTab('higherLower')}
                >
                    HIGHER / LOWER
                </button>
            </div>

            {/* PODIUM */}
            <div className="podium-container">
                {top3[1] && (
                    <div className="podium-item silver" onClick={() => navigate(`/profile/${top3[1].id}`)}>
                        <div className="crown">🥈</div>
                        <img src={top3[1].avatar} alt="" className="podium-avatar" />
                        <span className="podium-name">{top3[1].username}</span>
                        <span className="podium-score">
                            {activeTab === 'global' ? `Lvl ${top3[1].stats?.level}` : top3[1].highScores?.higherLower}
                        </span>
                    </div>
                )}
                {top3[0] && (
                    <div className="podium-item gold" onClick={() => navigate(`/profile/${top3[0].id}`)}>
                        <div className="crown">👑</div>
                        <img src={top3[0].avatar} alt="" className="podium-avatar" />
                        <span className="podium-name">{top3[0].username}</span>
                        <span className="podium-score">
                            {activeTab === 'global' ? `Lvl ${top3[0].stats?.level}` : top3[0].highScores?.higherLower}
                        </span>
                    </div>
                )}
                {top3[2] && (
                    <div className="podium-item bronze" onClick={() => navigate(`/profile/${top3[2].id}`)}>
                        <div className="crown">🥉</div>
                        <img src={top3[2].avatar} alt="" className="podium-avatar" />
                        <span className="podium-name">{top3[2].username}</span>
                        <span className="podium-score">
                            {activeTab === 'global' ? `Lvl ${top3[2].stats?.level}` : top3[2].highScores?.higherLower}
                        </span>
                    </div>
                )}
            </div>

            {/* LIST */}
            <div className="ranking-list">
                {rest.map((u, index) => (
                    <div key={u.id} className="ranking-item glass-panel-sm" onClick={() => navigate(`/profile/${u.id}`)}>
                        <span className="rank-num">#{index + 4}</span>
                        <div className="rank-user-info">
                            <img src={u.avatar} alt="" />
                            <span>{u.username}</span>
                        </div>
                        <div className="rank-stat">
                            {activeTab === 'global' 
                                ? <><span className="sub-stat">{u.stats?.xp?.toLocaleString()} XP</span> <span className="main-stat">Lvl {u.stats?.level}</span></>
                                : <span className="main-stat">{u.highScores?.higherLower} pts</span>
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Leaderboard;
