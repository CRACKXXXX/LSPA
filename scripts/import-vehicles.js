
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_PATH = path.join(__dirname, '../src/data/vehicles.json');

const SOURCE_URL = 'https://raw.githubusercontent.com/DurtyFree/gta-v-data-dumps/master/vehicles.json';
const IMG_SOURCES = [
    'https://raw.githubusercontent.com/kevinldg/gtav-vehicle-database/main/public/vehicle-images',
    'https://gta-assets.pages.dev/images/vehicles',
    'https://raw.githubusercontent.com/MericcaN41/gta5carimages/main/images'
];

// Configuration for "Invented" Stats based on Class
const CLASS_SPECS = {
    'Super': { speed: [9.2, 10.0], accel: [9.0, 10.0], hand: [8.5, 10.0], brake: [9.0, 10.0], kmh: [320, 420] },
    'Open Wheel': { speed: [9.5, 10.0], accel: [9.8, 10.0], hand: [10.0, 10.0], brake: [10.0, 10.0], kmh: [300, 380] },
    'Sports': { speed: [7.8, 9.2], accel: [7.8, 9.0], hand: [7.5, 9.0], brake: [7.5, 9.0], kmh: [260, 310] },
    'Sports Classics': { speed: [6.5, 8.0], accel: [6.5, 8.0], hand: [6.0, 7.5], brake: [5.5, 7.0], kmh: [210, 260] },
    'Muscle': { speed: [7.0, 8.8], accel: [8.5, 9.8], hand: [4.0, 6.0], brake: [5.0, 7.0], kmh: [240, 290] },
    'Off-Road': { speed: [5.0, 6.5], accel: [6.0, 7.5], hand: [8.5, 9.5], brake: [6.0, 8.0], kmh: [170, 210] },
    'SUV': { speed: [5.0, 7.0], accel: [5.0, 6.5], hand: [5.0, 7.0], brake: [5.0, 7.0], kmh: [190, 240] },
    'Motorcycle': { speed: [7.5, 9.8], accel: [9.0, 10.0], hand: [8.5, 9.5], brake: [8.5, 9.5], kmh: [260, 340] },
    'Coupe': { speed: [5.5, 7.5], accel: [5.5, 7.5], hand: [6.0, 8.0], brake: [6.0, 7.5], kmh: [200, 250] },
    'Sedan': { speed: [4.5, 6.5], accel: [4.0, 6.0], hand: [5.5, 7.0], brake: [5.0, 7.0], kmh: [180, 230] },
    'Compact': { speed: [3.5, 5.5], accel: [4.0, 5.5], hand: [6.0, 8.0], brake: [5.0, 6.5], kmh: [150, 200] },
    'Van': { speed: [3.0, 4.5], accel: [2.5, 4.0], hand: [3.0, 4.5], brake: [3.0, 5.0], kmh: [120, 160] },
    'Utility': { speed: [1.0, 3.0], accel: [1.0, 2.5], hand: [2.0, 4.0], brake: [2.0, 4.0], kmh: [60, 110] }, // Very Slow
    'Industrial': { speed: [1.0, 3.0], accel: [1.0, 2.0], hand: [1.0, 3.0], brake: [1.0, 3.0], kmh: [40, 90] }, // Crawling
    'Service': { speed: [3.0, 5.0], accel: [3.0, 5.0], hand: [4.0, 6.0], brake: [4.0, 6.0], kmh: [110, 150] },
    'Emergency': { speed: [6.0, 8.0], accel: [6.5, 8.5], hand: [6.0, 8.0], brake: [7.0, 9.0], kmh: [200, 260] },
    'Military': { speed: [5.0, 7.0], accel: [4.0, 6.0], hand: [4.0, 6.0], brake: [5.0, 7.0], kmh: [150, 220] },
    'Plane': { speed: [8.0, 10.0], accel: [7.0, 9.0], hand: [6.0, 9.0], brake: [5.0, 7.0], kmh: [250, 450] },
    'Helicopter': { speed: [7.0, 9.0], accel: [6.0, 8.0], hand: [7.0, 9.0], brake: [5.0, 7.0], kmh: [200, 300] },
    'Boat': { speed: [5.0, 8.0], accel: [5.0, 7.0], hand: [4.0, 6.0], brake: [2.0, 4.0], kmh: [100, 180] }
};

const DEFAULT_SPEC = { speed: [4, 6], accel: [4, 6], hand: [4, 6], brake: [4, 6], kmh: [150, 200] };

function rand(min, max) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(1));
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function normalizeClass(cls) {
    if (!cls) return 'Generic';
    if (cls === 'Sports Classics') return 'Sports Classics'; 
    return cls.charAt(0).toUpperCase() + cls.slice(1).toLowerCase();
}

async function checkImage(id) {
    for (const base of IMG_SOURCES) {
        try {
            const url = `${base}/${id}.png`;
            await axios.head(url, { timeout: 1500 }); // Fast check
            return url;
        } catch (e) {
            // Try next source
        }
    }
    return null;
}

// Concurrency helper
async function mapLimit(items, limit, fn) {
    const results = [];
    const chunks = [];
    for (let i = 0; i < items.length; i += limit) {
        chunks.push(items.slice(i, i + limit));
    }
    
    let processed = 0;
    for (const chunk of chunks) {
        const chunkResults = await Promise.all(chunk.map(fn));
        results.push(...chunkResults);
        processed += chunk.length;
        process.stdout.write(`\r🔍 Validating Images: ${processed}/${items.length}`);
    }
    console.log('');
    return results;
}

async function runImport() {
    console.log(`🌐 Connecting to Data: ${SOURCE_URL}`);

    try {
        const response = await axios.get(SOURCE_URL);
        const rawData = response.data;
        
        console.log(`✅ Downloaded ${rawData.length} entries. Processing...`);
        
        const seenIds = new Set();
        let existingData = [];
        
        // Load existing data if exists
        if (fs.existsSync(OUTPUT_PATH)) {
            try {
                existingData = JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf8'));
                existingData.forEach(v => seenIds.add(v.id));
                console.log(`📂 Loaded ${existingData.length} existing vehicles.`);
            } catch (e) {
                console.log('⚠️ Could not parse existing data, starting fresh.');
            }
        }

        const candidates = [];

        rawData.forEach(item => {
            const id = (item.Name || '').toLowerCase();
            
            // Filters
            if (!id || seenIds.has(id) || id === 'invisible') return;
            // Exclude common "junk" prefixes
            if (id.startsWith('prop_') || id.startsWith('p_')) return;

            seenIds.add(id); // Mark as seen for this run too

            // Basic Info
            const name = item.DisplayName?.English || item.Name || 'Unknown';
            const manufacturer = item.ManufacturerDisplayName?.English || item.Manufacturer || 'Unknown';
            let category = normalizeClass(item.Class);
            
            // Clean Class Name
            if (category === 'Sports') {
                // Heuristic: check if it's actually classic
                if (item.Name.toLowerCase().includes('classic') || item.Name.toLowerCase().includes('retro')) {
                    category = 'Sports Classics';
                }
            }
            
            // Exclude Non-Land (Updated: Removed Air/Water)
            const excludedClasses = ['Train', 'Subway', 'Rail', 'Trailer'];
            if (excludedClasses.includes(category)) return;

            // Generate "Invented" Stats
            const specs = CLASS_SPECS[category] || DEFAULT_SPEC;
            
            // Flags
            const hswList = ['s95', 'cyclone2', 'hakuchou2', 'arbitergt', 'astron2', 'vigero2', 'entity3', 'brioso3', 'banshee', 'deveste', 'italirsx'];
            const isHsw = hswList.includes(id) || item.Name.includes('hsw');

            const imaniList = ['buffalo4', 'jubilee', 'deity', 'champion', 'granger2', 'patriot3', 'omnisegt', 'virtue', 'stinger2'];
            const hasImaniTech = imaniList.includes(id);
            
            // Military/Weapon check
            const isWeaponized = (category === 'Military') || 
                                 item.Name.toLowerCase().includes('weapon') || 
                                 ['tank', 'rhino', 'khanjali', 'apc', 'insurgent'].some(x => id.includes(x));

            // Apply Bonus for "Good" flags
            let speedBonus = 0;
            if (isHsw) speedBonus += 1.0;

            const finalSpeed = Math.min(10, rand(specs.speed[0], specs.speed[1]) + speedBonus);
            
            const realKMH = randInt(specs.kmh[0], specs.kmh[1]) + (isHsw ? 30 : 0);

            candidates.push({
                id: id,
                model: id,
                name: name,
                manufacturer: manufacturer,
                class: category,
                seats: item.Seats || 2,
                stats: {
                    speed: finalSpeed.toFixed(1),
                    acceleration: Math.min(10, rand(specs.accel[0], specs.accel[1]) + (isHsw?1:0)).toFixed(1),
                    handling: rand(specs.hand[0], specs.hand[1]).toFixed(1),
                    braking: rand(specs.brake[0], specs.brake[1]).toFixed(1),
                    realKMH: realKMH,
                    realMPH: Math.round(realKMH / 1.609)
                },
                price: 0, 
                image: null,
                isWeaponized: !!isWeaponized,
                hasImaniTech: !!hasImaniTech,
                isHsw: !!isHsw
            });
        });

        // PRIORITIZE "Cool" classes for validation first to ensure good matches
        const priorityClasses = ['Super', 'Open Wheel', 'Sports', 'Sports Classics', 'Muscle', 'Off-Road'];
        candidates.sort((a, b) => {
             const aP = priorityClasses.includes(a.class) ? 1 : 0;
             const bP = priorityClasses.includes(b.class) ? 1 : 0;
             return bP - aP;
        });

        console.log(`⚙️  New Candidates found: ${candidates.length}. Validating up to 600...`);

        // Validate Images - Check up to 600 NEW candidates
        const subsetToCheck = candidates.slice(0, 600); 
        
        const validated = await mapLimit(subsetToCheck, 30, async (veh) => {
            const validUrl = await checkImage(veh.id);
            if (validUrl) {
                veh.image = validUrl;
                return veh;
            }
            return null;
        });

        const newVehicles = validated.filter(Boolean); // Remove nulls
        
        const totalData = [...existingData, ...newVehicles];

        fs.writeFileSync(OUTPUT_PATH, JSON.stringify(totalData, null, 2));
        console.log(`💾 SUCCESS: Added ${newVehicles.length} new vehicles. Total Database: ${totalData.length}.`);

    } catch (error) {
        console.error(`❌ Error import: ${error.message}`);
    }
}

runImport();
