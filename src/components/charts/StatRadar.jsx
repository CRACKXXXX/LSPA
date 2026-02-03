
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';

const StatRadar = ({ vehicleA, vehicleB, title }) => {
    // Normalizing Data for the Chart
    const data = [
        {
            subject: 'Velocidad',
            A: vehicleA ? parseFloat(vehicleA.stats.speed) : 0,
            B: vehicleB ? parseFloat(vehicleB.stats.speed) : 0,
            fullMark: 10,
        },
        {
            subject: 'Aceleración',
            A: vehicleA ? parseFloat(vehicleA.stats.acceleration) : 0,
            B: vehicleB ? parseFloat(vehicleB.stats.acceleration) : 0,
            fullMark: 10,
        },
        {
            subject: 'Manejo',
            A: vehicleA ? parseFloat(vehicleA.stats.handling) : 0,
            B: vehicleB ? parseFloat(vehicleB.stats.handling) : 0,
            fullMark: 10,
        },
        {
            subject: 'Frenada',
            A: vehicleA ? parseFloat(vehicleA.stats.braking) : 0,
            B: vehicleB ? parseFloat(vehicleB.stats.braking) : 0,
            fullMark: 10,
        }
    ];

    return (
        <div style={{ width: '100%', height: 350, background: 'rgba(0,0,0,0.2)', borderRadius: '12px', padding: '1rem', position: 'relative' }}>
            {title && (
                <div style={{
                    position: 'absolute', 
                    top: '10px', 
                    left: 0, 
                    right: 0, 
                    textAlign: 'center', 
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '0.9rem',
                    letterSpacing: '2px',
                    fontWeight: 'bold',
                    zIndex: 1
                }}>
                    {title}
                </div>
            )}
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="55%" outerRadius="70%" data={data}>
                    <PolarGrid stroke="rgba(255,255,255,0.15)" gridType="polygon" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'white', fontSize: 13, fontFamily: 'Outfit', fontWeight: '500' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 10]} tickCount={11} tick={false} axisLine={false} />
                    
                    {/* Vehicle A - Cyan (Left) */}
                    {vehicleA && (
                        <Radar
                            name={vehicleA.name}
                            dataKey="A"
                            stroke={vehicleB ? "var(--accent-color)" : "#00F0FF"} 
                            strokeWidth={3}
                            fill={vehicleB ? "var(--accent-color)" : "#00F0FF"}
                            fillOpacity={0.5}
                        />
                    )}

                    {/* Vehicle B - Magenta (Right) */}
                    {vehicleB && (
                        <Radar
                            name={vehicleB.name}
                            dataKey="B"
                            stroke={vehicleA ? "var(--secondary-color)" : "#FF003C"}
                            strokeWidth={3}
                            fill={vehicleA ? "var(--secondary-color)" : "#FF003C"}
                            fillOpacity={0.5}
                        />
                    )}
                    {vehicleA && vehicleB && <Legend wrapperStyle={{ color: '#fff', bottom: 0 }} iconType="circle" />}
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StatRadar;
