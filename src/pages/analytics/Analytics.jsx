

import vehicleData from '../../data/vehicles.json';
import DistributionChart from '../../components/charts/DistributionChart';
import './Analytics.css';

const Analytics = () => {
    // Quick Stats
    const totalVehicles = vehicleData.length;
    const fastestCar = vehicleData.reduce((prev, current) => 
        (parseFloat(current.stats.realKMH) > parseFloat(prev.stats.realKMH)) ? current : prev
    );
    const mostPowerful = vehicleData.reduce((prev, current) => 
        (parseFloat(current.stats.acceleration) > parseFloat(prev.stats.acceleration)) ? current : prev
    );

    return (
        <div className="analytics-page">
            <h1 className="glitch-text" data-text="LSPA ANALYTICS">LSPA ANALYTICS</h1>
            
            {/* KPI Cards */}
            <div className="kpi-grid">
                <div className="kpi-card">
                    <h3>Flota Total</h3>
                    <div className="kpi-value">{totalVehicles}</div>
                    <div className="kpi-sub">Vehículos en Base de Datos</div>
                </div>
                <div className="kpi-card highlight">
                    <h3>Top Velocidad</h3>
                    <div className="kpi-value">{fastestCar.stats.realKMH} <span className="unit">KM/H</span></div>
                    <div className="kpi-sub">{fastestCar.name} ({fastestCar.manufacturer})</div>
                </div>
                <div className="kpi-card">
                    <h3>Mejor Aceleración</h3>
                    <div className="kpi-value">{mostPowerful.stats.acceleration} <span className="unit">/ 10</span></div>
                    <div className="kpi-sub">{mostPowerful.name}</div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="charts-grid">
                <div className="chart-container">
                    <DistributionChart 
                        vehicles={vehicleData} 
                        dataKey="manufacturer" 
                        title="Top Fabricantes" 
                        limit={6}
                    />
                </div>
                
                <div className="chart-container">
                    <DistributionChart 
                        vehicles={vehicleData} 
                        dataKey="class" 
                        title="Tipos de Vehículo"
                        customGrouping={{
                            '🏁 Carreras': ['Super', 'Sports', 'Open Wheel', 'Sports Classics'],
                            '🏙️ Calle': ['Sedan', 'Coupe', 'Muscle', 'Compact', 'SUV', 'Van'],
                            '🏔️ 4x4': ['Off-Road'],
                            '🏍️ Motos': ['Motorcycle', 'Cycle', 'Bikes'],
                            '✈️ Aéreo': ['Plane', 'Helicopter'],
                            '💀 Táctico': ['Military', 'Emergency'],
                            '🚜 Trabajo': ['Industrial', 'Utility', 'Commercial', 'Service', 'Trains', 'Boat']
                        }}
                        limit={7}
                    />
                </div>
            </div>
        </div>
    );
};

export default Analytics;
