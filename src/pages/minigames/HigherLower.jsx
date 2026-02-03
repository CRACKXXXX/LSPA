
import React, { useState, useEffect } from 'react';
import vehicleData from '../../data/vehicles.json';
import { useAuth } from '../../context/AuthContext';
import { useGamification } from '../../context/GamificationContext';
import './HigherLower.css';

const STATS = [
    { key: 'topSpeed', label: 'Velocidad Punta (KM/H)', getValue: (v) => Math.round(v.stats.realKMH || v.stats.realMPH * 1.6) },
    { key: 'acceleration', label: 'Aceleración (0-10)', getValue: (v) => parseFloat(v.stats.acceleration) },
    { key: 'handling', label: 'Manejo (0-10)', getValue: (v) => parseFloat(v.stats.handling) },
    { key: 'braking', label: 'Frenada (0-10)', getValue: (v) => parseFloat(v.stats.braking) }
];

const HigherLower = () => {
    const { addXp, updateHighScore } = useGamification();
    const [leftCar, setLeftCar] = useState(null);
    const [rightCar, setRightCar] = useState(null);
    const [targetStat, setTargetStat] = useState(STATS[0]);
    const [streak, setStreak] = useState(0);
    const [gameState, setGameState] = useState('playing'); // playing, success, fail
    const [message, setMessage] = useState('');

    const getRandomCar = () => vehicleData[Math.floor(Math.random() * vehicleData.length)];

    const initRound = () => {
        const c1 = getRandomCar();
        let c2 = getRandomCar();
        while (c1.id === c2.id) c2 = getRandomCar();
        
        setLeftCar(c1);
        setRightCar(c2);
        setTargetStat(STATS[Math.floor(Math.random() * STATS.length)]);
        setGameState('playing');
        setMessage('');
    };

    useEffect(() => {
        initRound();
    }, []);

    const handleGuess = (prediction) => {
        if (gameState !== 'playing') return;

        const valA = targetStat.getValue(leftCar);
        const valB = targetStat.getValue(rightCar);

        const isHigher = valB > valA;
        const isTie = valB === valA; // Treat ties as win or loose? Let's say win for now

        let correct = false;
        if (prediction === 'higher' && valB >= valA) correct = true;
        if (prediction === 'lower' && valB <= valA) correct = true;

        if (correct) {
            setGameState('success');
            setMessage(`¡CORRECTO! Era ${valB.toLocaleString()}`); // Show value
            setStreak(prev => prev + 1);
            
            // Random XP Reward: Base 40-60 + Streak Bonus
            const bonus = streak * 10;
            addXp(40 + bonus, 60 + bonus); 
            
            setTimeout(initRound, 2000);
        } else {
            setGameState('fail');
            setMessage(`¡FALLASTE! Era ${valB.toLocaleString()}`);
            
            // SAVE HIGH SCORE
            updateHighScore('higherLower', streak); // "streak" is the score here
            
            setStreak(0);
        }
    };

    if (!leftCar || !rightCar) return <div>Cargando...</div>;

    const valA = targetStat.getValue(leftCar);

    return (
        <div className="higher-lower-container">
            <div className="hilo-header">
                <h2>HIGHER <span style={{color:'var(--accent-color)'}}>OR</span> LOWER</h2>
                <div className="streak-badge">RACHA: {streak} 🔥</div>
            </div>

            <div className="hilo-arena">
                {/* LEFT CAR (Known) */}
                <div className="hilo-card left">
                    <img src={leftCar.image} alt={leftCar.name} />
                    <div className="hilo-info">
                        <h3>{leftCar.name}</h3>
                        <div className="stat-reveal">
                            <span>{targetStat.label}</span>
                            <h1>{valA.toLocaleString()}</h1>
                        </div>
                    </div>
                </div>

                {/* VS CIRCLE */}
                <div className="vs-circle">VS</div>

                {/* RIGHT CAR (Unknown) */}
                <div className={`hilo-card right ${gameState}`}>
                    <img src={rightCar.image} alt={rightCar.name} />
                    <div className="hilo-info">
                        <h3>{rightCar.name}</h3>
                        <div className="stat-question">
                            <span>{targetStat.label}</span>
                            {gameState === 'playing' ? (
                                <h1>???</h1>
                            ) : (
                                <h1 className="revealed-value">{targetStat.getValue(rightCar).toLocaleString()}</h1>
                            )}
                        </div>

                        {gameState === 'playing' && (
                            <div className="controls">
                                <button className="btn-higher" onClick={() => handleGuess('higher')}>🔼 MÁS</button>
                                <button className="btn-lower" onClick={() => handleGuess('lower')}>🔽 MENOS</button>
                            </div>
                        )}
                        
                        {gameState !== 'playing' && (
                            <div className={`result-msg ${gameState}`}>
                                {message}
                                {gameState === 'fail' && (
                                    <button className="btn-retry" onClick={initRound}>
                                        🔄 INTENTAR DE NUEVO
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HigherLower;
