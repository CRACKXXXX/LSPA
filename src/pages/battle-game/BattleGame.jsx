import React, { useState, useEffect } from 'react';
import vehiclesData from '../../data/vehicles.json';
import './BattleGame.css';
import VehicleCard from '../../components/vehicle-card/VehicleCard';
import { useGamification } from '../../context/GamificationContext';

const BattleGame = () => {
    const { addXp } = useGamification();
    const [playerCard, setPlayerCard] = useState(null);
    const [cpuCard, setCpuCard] = useState(null);
    const [gameState, setGameState] = useState('CHOOSING'); // CHOOSING, REVEAL, RESULT
    const [result, setResult] = useState(null);
    const [scores, setScores] = useState({ player: 0, cpu: 0 });
    const [selectedStat, setSelectedStat] = useState(null);

    useEffect(() => {
        startRound();
    }, []);

    const getRandomVehicle = () => vehiclesData[Math.floor(Math.random() * vehiclesData.length)];

    const startRound = () => {
        setGameState('CHOOSING');
        setResult(null);
        setSelectedStat(null);
        
        // Ensure different cards
        const p1 = getRandomVehicle();
        let p2 = getRandomVehicle();
        while (p2.id === p1.id) p2 = getRandomVehicle();

        setPlayerCard(p1);
        setCpuCard(p2);
    };

    const handleStatSelect = (statKey, label) => {
        if (gameState !== 'CHOOSING') return;

        setSelectedStat({ key: statKey, label });
        setGameState('REVEAL');

        // Logic
        // For stats, higher is better. Speed is stored as 'speed' (0-10) or 'realKMH'.
        // Let's use the normalized 0-10 stats for simplicity or calculate real values.
        // vehicles.json structure: stats: { speed, acceleration, braking, handling, realKMH }
        
        const pVal = getStatValue(playerCard, statKey);
        const cVal = getStatValue(cpuCard, statKey);

        setTimeout(() => {
            if (pVal > cVal) {
                setResult('WIN');
                setScores(s => ({ ...s, player: s.player + 1 }));
                addXp(100, 150); // XP Reward
            } else if (pVal < cVal) {
                setResult('LOSE');
                setScores(s => ({ ...s, cpu: s.cpu + 1 }));
            } else {
                setResult('DRAW');
            }
            setGameState('RESULT');
        }, 1000); // 1s delay for tension
    };

    const getStatValue = (card, key) => {
        if (key === 'topSpeed') return card.stats.realKMH || 0;
        return card.stats[key] || 0;
    };

    if (!playerCard) return <div>Loading Arena...</div>;

    return (
        <div className="battle-container">
            <h2 className="gradient-text">BATALLA DE CARTAS</h2>
            
            <div className="battle-scoreboard">
                <div className="score-badge player">JUGADOR: {scores.player}</div>
                <div className="vs-logo">VS</div>
                <div className="score-badge cpu">CPU: {scores.cpu}</div>
            </div>

            <div className="arena-grid">
                {/* Player Side */}
                <div className="battle-side player-side animate-slide-up">
                    <div className="side-label">TU CARTA</div>
                    <div className="card-wrapper">
                        <VehicleCard vehicle={playerCard} />
                        
                        {gameState === 'CHOOSING' && (
                            <div className="stat-selector-overlay">
                                <p>ELIGE TU ATAQUE</p>
                                <div className="stat-buttons">
                                    <button onClick={() => handleStatSelect('topSpeed', 'Velocidad')}>Velocidad Max</button>
                                    <button onClick={() => handleStatSelect('acceleration', 'Aceleración')}>Aceleración</button>
                                    <button onClick={() => handleStatSelect('handling', 'Manejo')}>Manejo</button>
                                    <button onClick={() => handleStatSelect('braking', 'Frenada')}>Frenada</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* CPU Side */}
                <div className="battle-side cpu-side">
                    <div className="side-label">RIVAL</div>
                    <div className={`card-wrapper cpu-card-wrapper ${gameState !== 'CHOOSING' ? 'flipped' : ''}`}>
                         <div className="card-front">
                            {/* Hidden State */}
                            <div className="card-back-design">
                                <span>LSPA</span>
                                <div className="logo-circle">?</div>
                            </div>
                        </div>
                        <div className="card-back">
                            {/* Revealed State */}
                            {cpuCard && <VehicleCard vehicle={cpuCard} />}
                        </div>
                    </div>
                </div>
            </div>

            {gameState === 'RESULT' && (
                <div className="result-modal animate-pulse">
                    <h1 className={result === 'WIN' ? 'win-text' : result === 'LOSE' ? 'lose-text' : 'draw-text'}>
                        {result === 'WIN' ? '¡VICTORIA!' : result === 'LOSE' ? 'DERROTA' : 'EMPATE'}
                    </h1>
                    <p>
                        {selectedStat.label}: <span className="p-val">{getStatValue(playerCard, selectedStat.key)}</span> vs <span className="c-val">{getStatValue(cpuCard, selectedStat.key)}</span>
                    </p>
                    <button className="next-round-btn" onClick={startRound}>SIGUIENTE RONDA</button>
                </div>
            )}
        </div>
    );
};

export default BattleGame;
