import React, { useState, useEffect } from 'react';
import vehiclesData from '../../data/vehicles.json';
import './GuessGame.css';
import { useGamification } from '../../context/GamificationContext';

const GuessGame = () => {
    const { addXp } = useGamification();
    const [currentVehicle, setCurrentVehicle] = useState(null);
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('lspa_guess_highscore') || '0'));
    const [isRevealed, setIsRevealed] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [timeLeft, setTimeLeft] = useState(10);
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        startRound();
    }, []);

    useEffect(() => {
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('lspa_guess_highscore', score.toString());
        }
    }, [score]);

    useEffect(() => {
        let timer;
        if (!isRevealed && !isGameOver && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0 && !isRevealed) {
            handleGuess(null); // Time's up
        }
        return () => clearInterval(timer);
    }, [timeLeft, isRevealed, isGameOver]);

    const getRandomVehicle = () => vehiclesData[Math.floor(Math.random() * vehiclesData.length)];

    const startRound = () => {
        setIsRevealed(false);
        setSelectedOption(null);
        setTimeLeft(10);
        setIsGameOver(false);

        const correct = getRandomVehicle();
        setCurrentVehicle(correct);

        // Generate options
        const wrongOptions = new Set();
        while (wrongOptions.size < 3) {
            const wrong = getRandomVehicle();
            if (wrong.id !== correct.id) wrongOptions.add(wrong.name);
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

    if (!currentVehicle) return <div className="loading">Cargando...</div>;

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
