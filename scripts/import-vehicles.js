
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

const MAX_SPEED_CAP = 70; // m/s (approx 250 km/h for normalizing 0-10)
const MAX_ACCEL_CAP = 0.6; // g-force
const MAX_TRACTION_CAP = 3.5;
const MAX_BRAKING_CAP = 1.6;

// --- HELPERS ---

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

// --- MAIN LOGIC ---

async function runImport() {
    console.log(`🌐 Connecting to Data: ${SOURCE_URL}`);

    try {
        const response = await axios.get(SOURCE_URL);
        const rawData = response.data;
        
        console.log(`✅ Downloaded ${rawData.length} entries. Processing...`);
        
        const existingImages = new Map();
        
        // Load existing data to preserve images
        if (fs.existsSync(OUTPUT_PATH)) {
            try {
                const oldData = JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf8'));
                oldData.forEach(v => {
                    if (v.image) existingImages.set(v.id, v.image);
                });
                console.log(`📂 Loaded ${oldData.length} existing entries (preserving images).`);
            } catch (e) {
                console.log('⚠️ Could not parse existing data, strictly fetching new stats.');
            }
        }

        const candidates = [];
        const seenIds = new Set();

        rawData.forEach(item => {
            const id = (item.Name || '').toLowerCase();
            
            // Filters
            if (!id || seenIds.has(id) || id === 'invisible') return;
            if (id.startsWith('prop_') || id.startsWith('p_')) return;

            seenIds.add(id);

            // Basic Info
            const name = item.DisplayName?.English || item.Name || 'Unknown';
            const manufacturer = item.ManufacturerDisplayName?.English || item.Manufacturer || 'Unknown';
            let category = normalizeClass(item.Class);
            
            // Clean Class Name
            if (category === 'Sports') {
                if (item.Name.toLowerCase().includes('classic') || item.Name.toLowerCase().includes('retro')) {
                    category = 'Sports Classics';
                }
            }
            
            // Exclude Non-Land
            const excludedClasses = ['Train', 'Subway', 'Rail', 'Trailer'];
            if (excludedClasses.includes(category)) return;

            // --- REAL PHYSICS IMPLEMENTATION ---
            // Extract raw values with defaults if missing
            const rawSpeed = item.MaxSpeed || 40;
            const rawAccel = item.Acceleration || 0.2;
            const rawBraking = item.MaxBraking || 0.8;
            const rawTraction = item.MaxTraction || 2.0;

            // Normalize to 0-10 Scale
            // Speed: Map 0-70 m/s -> 0-10
            let speedStat = (rawSpeed / MAX_SPEED_CAP) * 10;
            
            // Acceleration: Map 0-0.6 -> 0-10 (Non-linear boost for game feel)
            let accelStat = (rawAccel / MAX_ACCEL_CAP) * 10;
            
            // Handling: Map 1.0-3.5 -> 0-10
            let handStat = ((rawTraction - 1.0) / (MAX_TRACTION_CAP - 1.0)) * 10;
            
            // Braking: Map 0.4-1.6 -> 0-10
            let brakeStat = ((rawBraking - 0.4) / (MAX_BRAKING_CAP - 0.4)) * 10;

            // Apply specific class buffs/nerfs to align with "UI feel" vs "Raw Data"
            // (Standardizes typical GTA weirdness where some slow cars have high raw max speed values)
            if (category === 'Super' || category === 'Open Wheel') {
                speedStat = Math.max(8.5, speedStat); // Ensure supers look fast
                accelStat *= 1.1; 
            }
            if (category === 'Industrial' || category === 'Utility') {
                speedStat = Math.min(3.0, speedStat); // Ensure slow vehicles look slow
            }

            // Flags
            const hswList = ['s95', 'cyclone2', 'hakuchou2', 'arbitergt', 'astron2', 'vigero2', 'entity3', 'brioso3', 'banshee', 'deveste', 'italirsx'];
            const isHsw = hswList.includes(id) || item.Name.includes('hsw');

            const imaniList = ['buffalo4', 'jubilee', 'deity', 'champion', 'granger2', 'patriot3', 'omnisegt', 'virtue', 'stinger2'];
            const hasImaniTech = imaniList.includes(id);
            
            const isWeaponized = (category === 'Military') || 
                                 item.Name.toLowerCase().includes('weapon') || 
                                 ['tank', 'rhino', 'khanjali', 'apc', 'insurgent'].some(x => id.includes(x));

            // HSW Bonus
            if (isHsw) {
                speedStat += 1.0;
                accelStat += 1.0;
            }

            // Real MPH/KMH Calculation
            const kmh = rawSpeed * 3.6; // exact conversion
            const mph = kmh / 1.609;

            candidates.push({
                id: id,
                model: id, // Keeping model = id for simplicity
                name: name,
                manufacturer: manufacturer,
                class: category,
                seats: item.Seats || 2,
                stats: {
                    speed: Math.min(10, Math.max(1, speedStat)).toFixed(1),
                    acceleration: Math.min(10, Math.max(1, accelStat)).toFixed(1),
                    handling: Math.min(10, Math.max(1, handStat)).toFixed(1),
                    braking: Math.min(10, Math.max(1, brakeStat)).toFixed(1),
                    realKMH: Math.round(kmh + (isHsw ? 20 : 0)), // Add HSW fake buff to display
                    realMPH: Math.round(mph + (isHsw ? 12 : 0))
                },
                price: item.Price > 0 ? item.Price : 0, 
                // PRESERVE IMAGE: Check if we had one before
                image: existingImages.get(id) || null,
                isWeaponized: !!isWeaponized,
                hasImaniTech: !!hasImaniTech,
                isHsw: !!isHsw
            });
        });

        // Validation Logic for NEW images only
        const missingImageCandidates = candidates.filter(c => !c.image);
        const hasImageCandidates = candidates.filter(c => c.image);
        
        console.log(`⚙️  Total Candidates: ${candidates.length}.`);
        console.log(`🖼️  Preserved Images: ${hasImageCandidates.length}.`);
        console.log(`🔍  Scanning for new images: ${missingImageCandidates.length} (Limit: 200)...`);

        const newValidated = await mapLimit(missingImageCandidates.slice(0, 200), 20, async (veh) => {
            const validUrl = await checkImage(veh.id);
            if (validUrl) {
                veh.image = validUrl;
                return veh;
            }
            return null;
        });

        const finalNewVehicles = newValidated.filter(Boolean);
        const totalData = [...hasImageCandidates, ...finalNewVehicles];

        totalData.sort((a, b) => a.class.localeCompare(b.class));

        fs.writeFileSync(OUTPUT_PATH, JSON.stringify(totalData, null, 2));
        console.log(`💾 SUCCESS: Database Updated. Total Vehicles: ${totalData.length}. Stats Synchronized.`);

    } catch (error) {
        console.error(`❌ Error import: ${error.message}`);
    }
}

runImport();
