import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

// Simple UUID generator to avoid dependency issues
const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

const CrewContext = createContext();

export const useCrew = () => useContext(CrewContext);

export const CrewProvider = ({ children }) => {
    const { user } = useAuth();
    const { showToast } = useToast();
    const [crews, setCrews] = useState([]);
    const [currentCrew, setCurrentCrew] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load from LocalStorage on mount
    useEffect(() => {
        const storedCrews = localStorage.getItem('lspa_crews');
        if (storedCrews) {
            try {
                let parsed = JSON.parse(storedCrews);
                const cleanCrews = parsed.filter(c => c.id !== 'crew-1' && c.id !== 'crew-2');
                if (cleanCrews.length !== parsed.length) {
                    localStorage.setItem('lspa_crews', JSON.stringify(cleanCrews));
                }
                
                // Recalculate points on load to ensure consistency
                const crewsWithPoints = cleanCrews.map(crew => ({
                    ...crew,
                    crewPoints: crew.members.reduce((acc, m) => acc + (parseInt(m.level || 1) || 1), 0)
                }));
                
                setCrews(crewsWithPoints);
            } catch (e) {
                console.error("Error parsing crews:", e);
                setCrews([]);
            }
        } else {
            setCrews([]);
        }
        setLoading(false);
    }, []);

    // Sync currentCrew when user or crews change
    useEffect(() => {
        if (!loading && user) {
            const userCrew = crews.find(c => c.members.some(m => m.userId === user.id));
            setCurrentCrew(userCrew || null);
        } else if (!user) {
            setCurrentCrew(null);
        }
    }, [crews, user, loading]);

    // Persist to LS whenever crews change
    useEffect(() => {
        if (!loading) {
            localStorage.setItem('lspa_crews', JSON.stringify(crews));
        }
    }, [crews, loading]);

    // Helper to calculate points
    const calculateCrewPoints = (members) => {
        return members.reduce((acc, m) => {
            const memberLevel = parseInt(m.level) || 1;
            return acc + memberLevel;
        }, 0);
    };

    // --- ACTIONS ---

    const createCrew = (crewData) => {
        if (!user) {
            showToast('error', 'Debes iniciar sesión');
            return;
        }
        
        const initialLevel = parseInt(user.level) || 1;

        const newCrew = {
            id: generateUUID(),
            ...crewData,
            crewPoints: initialLevel, 
            members: [{ 
                userId: user.id, 
                username: user.username,
                avatar: user.avatar,
                level: initialLevel,
                role: 'owner', 
                joinedAt: Date.now() 
            }],
            chat: [],
            memberLimit: 20,
            createdAt: Date.now()
        };

        setCrews(prev => [...prev, newCrew]);
        showToast('success', `¡Crew "${newCrew.name}" fundada con éxito!`);
        return newCrew;
    };

    const joinCrew = (crewId) => {
        if (!user) return;
        if (currentCrew) {
            showToast('error', 'Ya perteneces a una Crew, debes salir antes.');
            return;
        }

        setCrews(prev => prev.map(crew => {
            if (crew.id === crewId) {
                if (crew.privacy === 'public' || crew.privacy === 'invite_only') { 
                    const userLevel = parseInt(user.level) || 1;
                    const newMembers = [...crew.members, { 
                        userId: user.id, 
                        username: user.username,
                        avatar: user.avatar,
                        level: userLevel,
                        role: 'noob', 
                        joinedAt: Date.now() 
                    }];
                    
                    showToast('success', `Te has unido a ${crew.name}`);
                    return {
                        ...crew,
                        members: newMembers,
                        crewPoints: calculateCrewPoints(newMembers)
                    };
                } else {
                    showToast('warning', 'Esta crew es privada.');
                }
            }
            return crew;
        }));
    };

    const deleteCrew = (crewId) => {
        if (!user) return;
        setCrews(prev => prev.filter(c => c.id !== crewId));
        if (currentCrew?.id === crewId) {
            setCurrentCrew(null);
            showToast('info', 'La Crew ha sido disuelta.');
        }
    };

    const leaveCrew = () => {
        if (!user || !currentCrew) return;

        if (currentCrew.members.length === 1 && currentCrew.members[0].userId === user.id) {
            deleteCrew(currentCrew.id);
            return;
        }

        setCrews(prev => prev.map(crew => {
            if (crew.id === currentCrew.id) {
                const updatedMembers = crew.members.filter(m => m.userId !== user.id);
                return {
                    ...crew,
                    members: updatedMembers,
                    crewPoints: calculateCrewPoints(updatedMembers)
                };
            }
            return crew;
        }));
        setCurrentCrew(null);
        showToast('info', 'Has abandonado la crew.');
    };

    const updateCrewInfo = (crewId, updates) => {
        setCrews(prev => prev.map(crew => {
            if (crew.id === crewId) {
                return { ...crew, ...updates };
            }
            return crew;
        }));
        showToast('success', 'Información actualizada');
    };

    const manageMember = (crewId, targetUserId, action) => {
        const rankOrder = ['noob', 'veteran', 'staff', 'co-owner', 'owner'];
        
        setCrews(prev => prev.map(crew => {
            if (crew.id !== crewId) return crew;
            
            let updatedMembers = [...crew.members];
            const targetIndex = updatedMembers.findIndex(m => m.userId === targetUserId);
            if (targetIndex === -1) return crew;
            
            const targetUser = updatedMembers[targetIndex];

            if (action === 'kick') {
                updatedMembers = updatedMembers.filter(m => m.userId !== targetUserId);
                showToast('success', `Has expulsado a ${targetUser.username}`);
            } else if (action === 'promote') {
                const currentRankIdx = rankOrder.indexOf(targetUser.role);
                if (currentRankIdx < rankOrder.length - 2) { 
                     updatedMembers[targetIndex].role = rankOrder[currentRankIdx + 1];
                     showToast('success', `${targetUser.username} promovido a ${rankOrder[currentRankIdx + 1].toUpperCase()}`);
                }
            } else if (action === 'demote') {
                const currentRankIdx = rankOrder.indexOf(targetUser.role);
                if (currentRankIdx > 0) {
                     updatedMembers[targetIndex].role = rankOrder[currentRankIdx - 1];
                     showToast('info', `${targetUser.username} degradado a ${rankOrder[currentRankIdx - 1].toUpperCase()}`);
                }
            }

            // Recalculate points just in case level changed (unlikely here but safe)
            return { 
                ...crew, 
                members: updatedMembers,
                crewPoints: calculateCrewPoints(updatedMembers)
            };
        }));
    };

    const sendCrewMessage = (type, content) => {
        if (!user || !currentCrew) return;

        const newMessage = {
            id: generateUUID(),
            senderId: user.id,
            senderName: user.username, 
            senderAvatar: user.avatar,
            role: currentCrew.members.find(m => m.userId === user.id)?.role || 'noob',
            type, // text, image, vehicle
            content,
            timestamp: Date.now()
        };

        setCrews(prev => prev.map(crew => {
            if (crew.id === currentCrew.id) {
                return {
                    ...crew,
                    chat: [...crew.chat, newMessage]
                };
            }
            return crew;
        }));
    };
    
    const canManage = (myRole, targetRole) => {
        const roles = { 'owner': 4, 'co-owner': 3, 'staff': 2, 'veteran': 1, 'noob': 0 };
        return roles[myRole] > roles[targetRole];
    };

    return (
        <CrewContext.Provider value={{
            crews,
            currentCrew,
            loading,
            createCrew,
            joinCrew,
            leaveCrew,
            deleteCrew,
            updateCrewInfo,
            manageMember,
            sendCrewMessage,
            canManage
        }}>
            {children}
        </CrewContext.Provider>
    );
};
