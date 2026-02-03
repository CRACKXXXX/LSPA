
import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';

const GamificationContext = createContext();

export const useGamification = () => useContext(GamificationContext);

// Shared Key - Must match AuthContext
const DB_KEY = 'lspa_users_db_v2';

export const GamificationProvider = ({ children }) => {
    const { user, updateUser } = useAuth();

    // --- MATH & LOGIC ---

    // Level = floor(0.1 * sqrt(XP)) + 1
    // Example: 100 XP -> sqrt(100)=10 -> 1.0 -> Level 2
    // Example: 10000 XP -> sqrt(10000)=100 -> 10.0 -> Level 11
    const calculateLevel = (xp) => {
        if (xp < 0) return 1;
        return Math.floor(0.1 * Math.sqrt(xp)) + 1;
    };

    // Calculate XP needed for NEXT level
    // Formula Inversion: Level = 0.1 * sqrt(XP) + 1  => (Level - 1) * 10 = sqrt(XP) => XP = ((Level - 1) * 10)^2
    // Next Level XP = ((CurrentLevel) * 10)^2
    // Example: Current Level 1. Next is 2. XP needed for 2 = ((2-1)*10)^2 = 100.
    // Example: Current Level 2. Next is 3. XP needed for 3 = ((3-1)*10)^2 = 400.
    const getXpForNextLevel = (currentLevel) => {
        return Math.pow(currentLevel * 10, 2);
    };

    // --- ACTIONS ---

    const addXp = (min, max) => {
        if (!user) return null;

        const amount = Math.floor(Math.random() * (max - min + 1)) + min;
        
        const currentStats = user.stats || { xp: 0, level: 1, gamesPlayed: 0 };
        const newXp = (currentStats.xp || 0) + amount;
        const newLevel = calculateLevel(newXp);
        const gamesPlayed = (currentStats.gamesPlayed || 0) + 1;

        // Check level up
        const leveledUp = newLevel > (currentStats.level || 1);

        if (leveledUp) {
            const audio = new Audio('https://www.myinstants.com/media/sounds/gta-sa-mission-passed.mp3');
            audio.volume = 0.5;
            audio.play().catch(() => {});
        }

        // Persist via Auth
        updateUser({
            stats: {
                ...currentStats,
                xp: newXp,
                level: newLevel,
                gamesPlayed
            }
        });

        return { amount, leveledUp, newLevel };
    };

    // New: Update High Score for a specific game
    const updateHighScore = (gameKey, score) => {
        if (!user) return false;

        const currentHighScores = user.highScores || {};
        const currentRecord = currentHighScores[gameKey] || 0;

        if (score > currentRecord) {
            // New Record!
            updateUser({
                highScores: {
                    ...currentHighScores,
                    [gameKey]: score
                }
            });
            return true; // Use this to show "NEW RECORD" UI
        }
        return false;
    };

    const getLeaderboard = () => {
        const dbStr = localStorage.getItem(DB_KEY);
        if (!dbStr) return [];
        const users = JSON.parse(dbStr);

        return users
            .map(u => ({
                username: u.username,
                avatar: u.avatar,
                level: u.stats?.level || 1,
                xp: u.stats?.xp || 0
            }))
            .sort((a, b) => b.xp - a.xp)
            .slice(0, 10);
    };

    // Helper to get progress % for UI
    const getLevelProgress = () => {
        if (!user || !user.stats) return 0;
        const { xp, level } = user.stats;
        
        const currentLevelInfo = { xpStart: getXpForNextLevel(level - 1), xpEnd: getXpForNextLevel(level) }; 
        // Note: Logic allows infinite levels.
        
        // Let's simplify progress bar:
        // XP needed for current level base:
        const base = Math.pow((level - 1) * 10, 2);
        const target = Math.pow(level * 10, 2);
        
        const totalRange = target - base;
        const progress = xp - base;
        
        const percent = Math.min(100, Math.max(0, (progress / totalRange) * 100));
        return percent;
    };
    
    // Helpers
    const currentLevel = user?.stats?.level || 1;
    const currentXp = user?.stats?.xp || 0;
    const nextLevelXp = getXpForNextLevel(currentLevel);

    const value = {
        addXp,
        calculateLevel,
        getLeaderboard,
        getLevelProgress,
        level: currentLevel,
        xp: currentXp,
        nextLevelXp,
        updateHighScore
    };

    return (
        <GamificationContext.Provider value={value}>
            {children}
        </GamificationContext.Provider>
    );
};
