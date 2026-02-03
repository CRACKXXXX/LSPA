
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, Sector } from 'recharts';

// Expanded neon palette for many segments
const COLORS = [
    '#00F0FF', '#FF003C', '#FAFF00', '#88FF00', '#AB47BC', 
    '#FF9100', '#0091EA', '#D500F9', '#FF1744', '#1DE9B6',
    '#651FFF', '#3D5AFE', '#C51162', '#00C853', '#FF6D00'
];

const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;

    return (
        <g>
            <text x={cx} y={cy} dy={-10} textAnchor="middle" fill="#fff" fontSize={14} fontWeight="bold">
                {payload.name}
            </text>
            <text x={cx} y={cy} dy={15} textAnchor="middle" fill="#fff" fontSize={12} fillOpacity={0.6}>
                {`${value} Vehículos`}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius + 10}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
                stroke="#fff"
                strokeWidth={2}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 15}
                outerRadius={outerRadius + 20}
                fill={fill}
                fillOpacity={0.3}
            />
        </g>
    );
};

const DistributionChart = ({ vehicles, dataKey = 'manufacturer', title, limit = 0, customGrouping = null }) => {
    const [activeIndex, setActiveIndex] = React.useState(0);

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };
    
    // Process Data
    const data = useMemo(() => {
        const counts = {};
        // ... (Logic remains same, truncated for brevity implies keeping existing logic if not changing, but here I re-include existing logic to be safe or rely on keeping surrounding code)
        // RE-INCLUDING LOGIC TO ENSURE INTEGRITY
        vehicles.forEach(v => {
            let key = v[dataKey] || 'Unknown';
            if (dataKey === 'class' && key === 'Sport') key = 'Sports';

            if (customGrouping) {
                const groupName = Object.keys(customGrouping).find(group => 
                    customGrouping[group].includes(key)
                );
                if (groupName) {
                    key = groupName;
                } else if (customGrouping._others) {
                    key = customGrouping._others;
                }
            }
            counts[key] = (counts[key] || 0) + 1;
        });

        let sorted = Object.keys(counts)
            .map(key => ({ name: key, value: counts[key] }))
            .sort((a, b) => b.value - a.value);

        if (limit > 0 && sorted.length > limit) {
            const topN = sorted.slice(0, limit);
            const othersCount = sorted.slice(limit).reduce((sum, item) => sum + item.value, 0);
            topN.push({ name: 'Otros', value: othersCount });
            return topN;
        }

        return sorted;
    }, [vehicles, dataKey, limit, customGrouping]);

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        // Lower threshold to 1% to show more labels
        if (percent < 0.01) return null; 

        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text 
                x={x} 
                y={y} 
                fill="white" 
                textAnchor={x > cx ? 'start' : 'end'} 
                dominantBaseline="central" 
                fontSize={12} 
                fontWeight="bold"
                stroke="#000"
                strokeWidth={3}
                paintOrder="stroke"
                style={{ pointerEvents: 'none' }} 
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div style={{ width: '100%', height: 400, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{color: 'var(--text-muted)', marginBottom: '1rem'}}>{title}</h3>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape} 
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={130}
                        innerRadius={65} 
                        fill="#8884d8"
                        dataKey="value"
                        stroke="none"
                        paddingAngle={3}
                        onMouseEnter={onPieEnter}
                        animationBegin={0}
                        animationDuration={1500}
                        animationEasing="ease-out"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0.5)" strokeWidth={1} />
                        ))}
                    </Pie>
                    <Legend wrapperStyle={{fontSize: '12px', paddingTop: '20px'}} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DistributionChart;
