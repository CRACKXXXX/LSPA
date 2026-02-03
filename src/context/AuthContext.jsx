
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const DB_KEY = 'lspa_users_db_v2'; // New DB Version for clean slate
const SESSION_KEY = 'lspa_active_user_v2';
const DEFAULT_AVATAR_URL = 'https://img.freepik.com/vector-premium/silueta-negra-es-foto-predeterminada-perfil-avatar_664995-376.jpg';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initial Load
    useEffect(() => {
        const storedUser = localStorage.getItem(SESSION_KEY);
        if (storedUser) {
            try {
                const parsed = JSON.parse(storedUser);
                // Validate Avatar Fallback on Load
                if (!parsed.avatar) parsed.avatar = DEFAULT_AVATAR_URL;
                setUser(parsed);
            } catch (e) {
                console.error("Session Corrupted", e);
                localStorage.removeItem(SESSION_KEY);
            }
        }
        setLoading(false);
    }, []);

    // Helper: Get DB
    const getDb = () => {
        const db = localStorage.getItem(DB_KEY);
        return db ? JSON.parse(db) : [];
    };

    // Helper: Save DB
    const saveDb = (users) => {
        localStorage.setItem(DB_KEY, JSON.stringify(users));
    };

    // Helper: Update Current User in Session & DB
    // This is the CORE method exposed to other contexts
    const updateUser = (updatedFields) => {
        setUser(prevUser => {
            if (!prevUser) return null;

            const newUser = { ...prevUser, ...updatedFields };
            
            // 1. Update Session
            localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));

            // 2. Update DB
            const users = getDb();
            const index = users.findIndex(u => u.id === newUser.id);
            if (index !== -1) {
                users[index] = newUser;
                saveDb(users);
            }

            return newUser;
        });
    };

    // --- AUTH ACTIONS ---

    const login = (username, password) => {
        const users = getDb();
        const found = users.find(u => u.username === username && u.password === password);
        
        if (found) {
            // Ensure avatar fallback
            if (!found.avatar) found.avatar = DEFAULT_AVATAR_URL;
            
            setUser(found);
            localStorage.setItem(SESSION_KEY, JSON.stringify(found));
            return { success: true };
        }
        return { success: false, error: 'Credenciales inválidas' };
    };

    const register = (username, password) => {
        const users = getDb();
        if (users.find(u => u.username === username)) {
            return { success: false, error: 'El usuario ya existe' };
        }

        const newUser = {
            id: crypto.randomUUID(),
            username,
            password, // In real app: Hash this!
            avatar: DEFAULT_AVATAR_URL,
            bio: 'Nuevo conductor en Los Santos.',
            favorites: { brand: 'N/A', style: 'Stock' },
            stats: { 
                xp: 0, 
                level: 1, 
                gamesPlayed: 0 
            },
            highScores: { 
                higherLower: 0 
            },
            garage: [], // IDs of vehicles
            joinedAt: new Date().toISOString()
        };

        users.push(newUser);
        saveDb(users);
        
        // Auto-login immediately
        setUser(newUser);
        localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
        
        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(SESSION_KEY);
    };

    const syncGarage = (newGarage) => {
         updateUser({ garage: newGarage });
    };

    // Helper for Social Features
    const getAllUsers = () => getDb();
    
    const getUserById = (id) => {
        const users = getDb();
        return users.find(u => u.id === id) || null;
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        updateUser,
        syncGarage,
        getAllUsers,
        getUserById,
        DEFAULT_AVATAR_URL
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
