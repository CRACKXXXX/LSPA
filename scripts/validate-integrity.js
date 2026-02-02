
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, '../src/data/vehicles.json');

async function checkUrl(url) {
    if (!url) return false;
    try {
        await axios.head(url, { timeout: 2000 });
        return true;
    } catch (e) {
        return false;
    }
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
        process.stdout.write(`\r🔍 Verifying Integrity: ${processed}/${items.length}`);
    }
    console.log('');
    return results;
}

async function runValidation() {
    console.log('🛡️ Starting Data Integrity Check...');
    
    if (!fs.existsSync(DATA_PATH)) {
        console.error('❌ Database not found!');
        return;
    }

    const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
    console.log(`📂 Checking ${data.length} vehicles...`);

    let removedCount = 0;
    
    const validated = await mapLimit(data, 50, async (veh) => {
        // 1. Schema Check
        if (!veh.id || !veh.name || veh.name === 'Unknown') return null;
        if (!veh.stats || isNaN(veh.stats.speed)) return null;

        // 2. Image Check
        const isImageValid = await checkUrl(veh.image);
        if (!isImageValid) {
            // Try to recover? Maybe, but for strict check we drop.
            // console.log(`broken image: ${veh.id}`);
            return null;
        }

        return veh;
    });

    const cleanData = validated.filter(Boolean);
    const removed = data.length - cleanData.length;

    if (removed > 0) {
        fs.writeFileSync(DATA_PATH, JSON.stringify(cleanData, null, 2));
        console.log(`🧹 CLEANUP COMPLETE: Removed ${removed} invalid entries (broken links or bad data).`);
        console.log(`✅ Final Valid Database: ${cleanData.length} vehicles.`);
    } else {
        console.log(`✅ PERFECTION: All ${data.length} vehicles are valid!`);
    }
}

runValidation();
