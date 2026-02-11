import React, { useState, useEffect } from 'react';
import vehiclesData from '../../../data/vehicles.json';
import './GuessGame.css';
import { useGamification } from '../../../context/GamificationContext';
import { useAuth } from '../../../context/AuthContext';

const GuessGame = () => {
    const { addXp, updateHighScore } = useGamification();
    const { user } = useAuth();
    
    const [currentVehicle, setCurrentVehicle] = useState(null);
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [isRevealed, setIsRevealed] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [timeLeft, setTimeLeft] = useState(10);
    const [isGameOver, setIsGameOver] = useState(false);

    // Sync High Score from User Profile
    useEffect(() => {
        if (user && user.highScores) {
             setHighScore(user.highScores.guessCar || 0);
        }
    }, [user]);

    useEffect(() => {
        if (score > highScore) {
            setHighScore(score);
            updateHighScore('guessCar', score);
        }
    }, [score, highScore, updateHighScore]);

    useEffect(() => {
        let timer;
        if (!isRevealed && !isGameOver && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0 && !isRevealed) {
            handleGuess(null); // Time's up
        }
        return () => clearInterval(timer);
    }, [timeLeft, isRevealed, isGameOver]);

    const getRandomVehicle = () => {
        if (!vehiclesData || vehiclesData.length === 0) return null;
        return vehiclesData[Math.floor(Math.random() * vehiclesData.length)];
    };

    const startRound = () => {
        if (!vehiclesData || vehiclesData.length < 4) {
            console.error("Not enough vehicles data!");
            return;
        }

        setIsRevealed(false);
        setSelectedOption(null);
        setTimeLeft(10);
        setIsGameOver(false);

        const correct = getRandomVehicle();
        if (!correct) return; // Safety
        
        setCurrentVehicle(correct);

        // Generate options
        const wrongOptions = new Set();
        let safetyCounter = 0;
        
        while (wrongOptions.size < 3 && safetyCounter < 100) {
            const wrong = getRandomVehicle();
            if (wrong && wrong.id !== correct.id) {
                wrongOptions.add(wrong.name);
            }
            safetyCounter++;
        }
        
        const allOptions = [correct.name, ...Array.from(wrongOptions)];
        // Shuffle
        setOptions(allOptions.sort(() => Math.random() - 0.5));
    };

    const handleGuess = (name) => {
        if (isRevealed) return;
        
        setSelectedOption(name);
        setIsRevealed(true);

        if (name === currentVehicle.name) {
            // Correct
            const xpEarned = 50 + (timeLeft * 2);
            setScore(prev => prev + 100 + (timeLeft * 10)); // Score remains same
            addXp(xpEarned, xpEarned + 10); // Gamification XP
        } else {
            // Wrong or Timeout
            setIsGameOver(true);
            setScore(0); // Reset streak on lose? Or just Game Over screen? Let's reset streak/score.
        }
    };

    const [loadingError, setLoadingError] = useState(false);

    // Initial Load
    useEffect(() => {
        try {
            startRound();
        } catch (e) {
            console.error(e);
            setLoadingError(true);
        }
    }, []);

    if (loadingError) return (
        <div className="loading">
            <div style={{textAlign:'center'}}>
                <p>ERROR CRÍTICO</p>
                <p style={{fontSize:'1rem', color:'#fff'}}>Consulta la consola.</p>
                <button className="next-btn" onClick={() => window.location.reload()}>RECARGAR</button>
            </div>
        </div>
    );

    if (!currentVehicle) return (
        <div className="loading">
            <div style={{textAlign:'center'}}>
                <p>CARGANDO MOTORES...</p>
                <p style={{fontSize:'0.8rem', color:'#888', marginTop:'0.5rem'}}>
                    Vehículos detectados: {vehiclesData ? vehiclesData.length : '0'}
                </p>
                <button className="option-btn" style={{marginTop:'1rem', fontSize:'0.8rem'}} onClick={startRound}>
                    INICIAR MANUALMENTE
                </button>
            </div>
        </div>
    );

    const getImage = (vehicle) => {
        // Same image fallback logic
        return vehicle.image || `https://gta-assets.pages.dev/images/vehicles/${vehicle.model}.png`;
    };

    return (
        <div className="guess-container animate-slide-up">
            <h2 className="glitch-text" data-text="ADIVINA EL COCHE">ADIVINA EL COCHE</h2>
            
            <div className="stats-bar">
                <div className="score-box">PUNTOS: <span className="score-val">{score}</span></div>
                <div className="score-box">RECORD: <span className="high-val">{highScore}</span></div>
            </div>

            <div className="game-timer-bar">
                <div 
                    className="timer-fill" 
                    style={{
                        width: `${(timeLeft / 10) * 100}%`,
                        background: timeLeft < 3 ? 'var(--danger)' : 'var(--primary-color)'
                    }}
                ></div>
            </div>

            <div className="guess-card">
                <div className={`image-reveal-box ${isRevealed ? 'revealed' : 'blurred'}`}>
                    <img src={getImage(currentVehicle)} alt="Guess me" />
                    {isGameOver && <div className="fail-overlay">ERROR</div>}
                    {isRevealed && !isGameOver && <div className="success-overlay">¡CORRECTO!</div>}
                </div>

                <div className="options-grid">
                    {options.map((opt, idx) => (
                        <button 
                            key={idx}
                            className={`option-btn 
                                ${isRevealed && opt === currentVehicle.name ? 'correct' : ''}
                                ${isRevealed && opt === selectedOption && opt !== currentVehicle.name ? 'wrong' : ''}
                            `}
                            onClick={() => handleGuess(opt)}
                            disabled={isRevealed}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>

            {isRevealed && (
                <div className="next-actions animate-slide-up">
                    <button className="next-btn" onClick={startRound}>
                        {isGameOver ? 'INTENTAR DE NUEVO' : 'SIGUIENTE RONDA ▶'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default GuessGame;
