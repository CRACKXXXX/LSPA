import React, { useEffect, useState } from 'react';
import './BackgroundSparks.css';

const BackgroundSparks = () => {
    const [sparks, setSparks] = useState([]);

    useEffect(() => {
        // Create initial sparks
        const initialSparks = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 3 + Math.random() * 5,
            size: 2 + Math.random() * 4
        }));
        setSparks(initialSparks);
    }, []);

    return (
        <div className="sparks-container">
            {sparks.map(spark => (
                <div 
                    key={spark.id}
                    className="spark"
                    style={{
                        left: `${spark.left}%`,
                        animationDelay: `${spark.delay}s`,
                        animationDuration: `${spark.duration}s`,
                        width: `${spark.size}px`,
                        height: `${spark.size}px`
                    }}
                />
            ))}
            <div className="bg-vignette"></div>
        </div>
    );
};

export default BackgroundSparks;
