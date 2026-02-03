/**
 * SANITIZE-VEHICLES.JS
 * 
 * Senior Data Engineer Script for GTA V Vehicle Database Validation.
 * 
 * This script downloads the master vehicle list and subjects EACH vehicle
 * to a strict "Survival Test". Only vehicles that pass BOTH validation
 * rules are saved to the final clean database.
 * 
 * Author: LSPA Data Team
 * Version: 1.0.0
 */

import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- CONFIGURATION ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_URL = 'https://raw.githubusercontent.com/DurtyFree/gta-v-data-dumps/master/vehicles.json';
const IMAGE_BASE_URL = 'https://gta-assets.pages.dev/images/vehicles';
const OUTPUT_PATH = path.join(__dirname, '../src/data/vehicles-clean.json');

const CONCURRENCY_LIMIT = 20; // Process 20 vehicles at a time
const REQUEST_TIMEOUT = 3000; // 3 seconds timeout for image checks

// --- STATS ---
let stats = {
    processed: 0,
    saved: 0,
    eliminated: {
        noImage: 0,
        noStats: 0,
        duplicate: 0,
        invalid: 0
    }
};

// --- HELPERS ---

/**
 * Process items in chunks with concurrency limit
 */
async function processWithConcurrency(items, limit, processor) {
    const results = [];
    
    for (let i = 0; i < items.length; i += limit) {
        const chunk = items.slice(i, i + limit);
        const chunkResults = await Promise.all(chunk.map(processor));
        results.push(...chunkResults);
        
        // Progress indicator
        const progress = Math.min(i + limit, items.length);
        const percent = Math.round((progress / items.length) * 100);
        process.stdout.write(`\r⏳ Processing: ${progress}/${items.length} (${percent}%)`);
    }
    
    console.log(''); // New line after progress
    return results;
}

/**
 * RULE A: Validate that image exists (HTTP HEAD request)
 * Checks multiple image sources for redundancy
 */
const IMAGE_SOURCES = [
    'https://raw.githubusercontent.com/kevinldg/gtav-vehicle-database/main/public/vehicle-images',
    'https://gta-assets.pages.dev/images/vehicles',
    'https://raw.githubusercontent.com/MericcaN41/gta5carimages/main/images'
];

async function validateImage(modelName) {
    const lowerModel = modelName.toLowerCase();
    
    for (const baseUrl of IMAGE_SOURCES) {
        const imageUrl = `${baseUrl}/${lowerModel}.png`;
        
        try {
            const response = await axios.head(imageUrl, { 
                timeout: REQUEST_TIMEOUT,
                validateStatus: (status) => status < 500
            });
            
            if (response.status === 200) {
                return imageUrl; // Found valid image
            }
        } catch (error) {
            // Try next source
        }
    }
    
    return null; // No source had the image
}

/**
 * RULE B: Validate that vehicle has real physics stats
 */
function validateStats(vehicle) {
    const speed = vehicle.MaxSpeed || vehicle.fInitialDriveMaxFlatVel || 0;
    const accel = vehicle.Acceleration || vehicle.fDriveForce || 0;
    const traction = vehicle.MaxTraction || vehicle.fTractionCurveMax || 0;
    
    // Must have at least speed and one other stat
    return speed > 0 && (accel > 0 || traction > 0);
}

/**
 * Normalize class name for consistency
 */
function normalizeClass(cls) {
    if (!cls) return 'Unknown';
    
    const classMap = {
        'sports classics': 'Sports Classics',
        'sports': 'Sports',
        'super': 'Super',
        'muscle': 'Muscle',
        'sedans': 'Sedans',
        'coupes': 'Coupes',
        'suvs': 'SUVs',
        'offroad': 'Off-Road',
        'off-road': 'Off-Road',
        'compacts': 'Compacts',
        'motorcycles': 'Motorcycles',
        'boats': 'Boats',
        'helicopters': 'Helicopters',
        'planes': 'Planes',
        'military': 'Military',
        'emergency': 'Emergency',
        'commercial': 'Commercial',
        'industrial': 'Industrial',
        'utility': 'Utility',
        'vans': 'Vans',
        'service': 'Service',
        'open wheel': 'Open Wheel'
    };
    
    const lower = cls.toLowerCase();
    return classMap[lower] || cls.charAt(0).toUpperCase() + cls.slice(1).toLowerCase();
}

/**
 * Calculate normalized stats (0-10 scale)
 */
function calculateStats(vehicle) {
    const MAX_SPEED = 70;    // m/s cap
    const MAX_ACCEL = 0.6;   // g-force cap
    const MAX_TRACTION = 3.5;
    const MAX_BRAKING = 1.6;
    
    const rawSpeed = vehicle.MaxSpeed || vehicle.fInitialDriveMaxFlatVel || 30;
    const rawAccel = vehicle.Acceleration || vehicle.fDriveForce || 0.2;
    const rawTraction = vehicle.MaxTraction || vehicle.fTractionCurveMax || 2.0;
    const rawBraking = vehicle.MaxBraking || vehicle.fBrakeForce || 0.8;
    
    // Normalize to 0-10
    let speed = Math.min(10, Math.max(1, (rawSpeed / MAX_SPEED) * 10));
    let accel = Math.min(10, Math.max(1, (rawAccel / MAX_ACCEL) * 10));
    let handling = Math.min(10, Math.max(1, ((rawTraction - 1.0) / (MAX_TRACTION - 1.0)) * 10));
    let braking = Math.min(10, Math.max(1, ((rawBraking - 0.4) / (MAX_BRAKING - 0.4)) * 10));
    
    // Real speed calculation
    const realKMH = Math.round(rawSpeed * 3.6);
    const realMPH = Math.round(realKMH / 1.609);
    
    return {
        speed: speed.toFixed(1),
        acceleration: accel.toFixed(1),
        handling: handling.toFixed(1),
        braking: braking.toFixed(1),
        realKMH,
        realMPH
    };
}

/**
 * Main validation function for a single vehicle
 */
async function validateVehicle(vehicle) {
    const modelName = (vehicle.Name || '').toLowerCase();
    const displayName = vehicle.DisplayName?.English || vehicle.Name || 'Unknown';
    
    // Skip invalid entries
    if (!modelName || modelName === 'null' || modelName.startsWith('prop_')) {
        stats.eliminated.invalid++;
        return null;
    }
    
    // RULE B: Check stats first (faster, no network)
    if (!validateStats(vehicle)) {
        console.log(`❌ [${displayName.toUpperCase()}] Stats: FAILED -> ELIMINATED`);
        stats.eliminated.noStats++;
        return null;
    }
    
    // RULE A: Check image (network request)
    const imageUrl = await validateImage(modelName);
    
    if (!imageUrl) {
        console.log(`❌ [${displayName.toUpperCase()}] Image: 404 -> ELIMINATED`);
        stats.eliminated.noImage++;
        return null;
    }
    
    // PASSED BOTH RULES ✅
    console.log(`✅ [${displayName.toUpperCase()}] Image: OK | Stats: OK -> SAVED`);
    stats.saved++;
    
    // Build clean vehicle object
    return {
        id: modelName,
        model: modelName,
        name: displayName,
        manufacturer: vehicle.ManufacturerDisplayName?.English || vehicle.Manufacturer || 'Unknown',
        class: normalizeClass(vehicle.Class),
        seats: vehicle.Seats || 2,
        stats: calculateStats(vehicle),
        price: vehicle.Price > 0 ? vehicle.Price : 0,
        image: imageUrl,
        isWeaponized: vehicle.Weapons?.length > 0 || false,
        hasImaniTech: false,
        isHsw: false
    };
}

// --- MAIN EXECUTION ---

async function main() {
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║       LSPA VEHICLE SANITIZER - SURVIVAL MODE v1.0          ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log('');
    
    try {
        // STEP 1: Download master list
        console.log(`🌐 Downloading from: ${SOURCE_URL}`);
        const response = await axios.get(SOURCE_URL);
        const rawVehicles = response.data;
        
        console.log(`📥 Downloaded: ${rawVehicles.length} raw entries\n`);
        
        // Remove duplicates by Name
        const seenNames = new Set();
        const uniqueVehicles = rawVehicles.filter(v => {
            const name = (v.Name || '').toLowerCase();
            if (seenNames.has(name)) {
                stats.eliminated.duplicate++;
                return false;
            }
            seenNames.add(name);
            return true;
        });
        
        console.log(`🔍 Unique vehicles to validate: ${uniqueVehicles.length}`);
        console.log(`   (Removed ${stats.eliminated.duplicate} duplicates)\n`);
        
        // STEP 2: Validate each vehicle with concurrency
        console.log('═══════════════════════════════════════════════════════════');
        console.log('  STARTING DOUBLE VALIDATION (Image + Stats)');
        console.log('═══════════════════════════════════════════════════════════\n');
        
        const validatedVehicles = await processWithConcurrency(
            uniqueVehicles,
            CONCURRENCY_LIMIT,
            validateVehicle
        );
        
        // Filter out nulls (eliminated vehicles)
        const cleanVehicles = validatedVehicles.filter(Boolean);
        
        // Sort by class for organization
        cleanVehicles.sort((a, b) => a.class.localeCompare(b.class));
        
        // STEP 3: Save to file
        console.log('\n═══════════════════════════════════════════════════════════');
        console.log('  FINAL REPORT');
        console.log('═══════════════════════════════════════════════════════════');
        
        stats.processed = uniqueVehicles.length;
        
        console.log(`\n📊 SUMMARY:`);
        console.log(`   ├─ Processed:     ${stats.processed}`);
        console.log(`   ├─ ✅ Saved:      ${stats.saved}`);
        console.log(`   └─ ❌ Eliminated: ${stats.processed - stats.saved}`);
        console.log(`       ├─ No Image:  ${stats.eliminated.noImage}`);
        console.log(`       ├─ No Stats:  ${stats.eliminated.noStats}`);
        console.log(`       ├─ Duplicates: ${stats.eliminated.duplicate}`);
        console.log(`       └─ Invalid:   ${stats.eliminated.invalid}`);
        
        // Write output
        fs.writeFileSync(OUTPUT_PATH, JSON.stringify(cleanVehicles, null, 2));
        
        console.log(`\n💾 OUTPUT: ${OUTPUT_PATH}`);
        console.log(`   Total vehicles in clean database: ${cleanVehicles.length}`);
        console.log('\n✨ SANITIZATION COMPLETE! ✨\n');
        
    } catch (error) {
        console.error(`\n❌ FATAL ERROR: ${error.message}`);
        process.exit(1);
    }
}

// Run
main();
