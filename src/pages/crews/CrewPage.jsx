import React from 'react';
import { useCrew } from '../../context/CrewContext';
import { useAuth } from '../../context/AuthContext';
import CrewExplorer from './CrewExplorer';
import CrewDashboard from './CrewDashboard';
import './CrewPage.css';

const CrewPage = () => {
    const { currentCrew, loading } = useCrew();
    const { user } = useAuth();

    if (loading) return <div className="loading-spinner">Cargando Crew System...</div>;

    return (
        <div className="crew-page-container">
            {currentCrew ? (
                <CrewDashboard crew={currentCrew} currentUser={user} />
            ) : (
                <CrewExplorer />
            )}
        </div>
    );
};

export default CrewPage;
