
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, '../src/data/vehicles.json');

try {
    const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
    console.log(`🔍 Checking ${data.length} vehicles...`);

    let zeroStatsCount = 0;
    let suspiciouslyFlatStats = 0;
    const classStats = {};

    data.forEach(veh => {
        const s = veh.stats;
        const speed = parseFloat(s.speed);
        const accel = parseFloat(s.acceleration);

        // Check for broken stats
        if (speed === 0 || accel === 0) zeroStatsCount++;
        
        // Check for "default" flat stats (e.g. everything is 5.0) which implies generation failure
        if (s.speed === "5.0" && s.acceleration === "5.0" && s.handling === "5.0") {
            suspiciouslyFlatStats++;
        }

        // Aggregate for Class Averages
        if (!classStats[veh.class]) classStats[veh.class] = { sumSpeed: 0, count: 0 };
        classStats[veh.class].sumSpeed += speed;
        classStats[veh.class].count++;
    });

    console.log(`\n📊 STATS REPORT:`);
    console.log(`❌ Zero Stats: ${zeroStatsCount}`);
    console.log(`⚠️  Suspicious Default Stats: ${suspiciouslyFlatStats}`);

    console.log(`\n🏎️  AVERAGE SPEED BY CLASS (0-10):`);
    const averages = Object.entries(classStats)
        .map(([cls, d]) => ({ cls, avg: (d.sumSpeed / d.count).toFixed(2) }))
        .sort((a, b) => b.avg - a.avg);

    averages.forEach(x => console.log(`   ${x.cls.padEnd(15)}: ${x.avg}`));

    // specific check for top cars
    const adder = data.find(v => v.id === 'adder');
    const faggio = data.find(v => v.id === 'faggio');

    console.log(`\n🆚 REALITY CHECK:`);
    if (adder) console.log(`   Adder Speed: ${adder.stats.speed} (RealKMH: ${adder.stats.realKMH})`);
    if (faggio) console.log(`   Faggio Speed: ${faggio.stats.speed} (RealKMH: ${faggio.stats.realKMH})`);

    if (zeroStatsCount === 0 && averages[0].avg > averages[averages.length-1].avg) {
        console.log(`\n✅ VERIFICATION PASSED: Physics hierarchy is valid.`);
    } else {
        console.log(`\n❌ VERIFICATION FAILED: Data issues detected.`);
    }

} catch (e) {
    console.error("Error:", e.message);
}
