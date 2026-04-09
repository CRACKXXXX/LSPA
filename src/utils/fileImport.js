/**
 * fileImport.js
 * Utilities to parse vehicle data from CSV, XML, JSON and XLSX files.
 * Adapted from tcrurav/react-import-export-json-xml-csv reference.
 */

import Papa from 'papaparse';
import * as XLSX from 'xlsx';

// ─── XML helpers ────────────────────────────────────────────────────────────

/**
 * Recursively convert an XML node tree into a plain object.
 * @param {Element} node
 * @returns {string|Object}
 */
function xmlNodeToObject(node) {
  const children = Array.from(node.children);

  if (children.length === 0) {
    return node.textContent?.trim() ?? '';
  }

  const result = {};
  for (const child of children) {
    const value = xmlNodeToObject(child);
    if (result[child.nodeName] !== undefined) {
      if (!Array.isArray(result[child.nodeName])) {
        result[child.nodeName] = [result[child.nodeName]];
      }
      result[child.nodeName].push(value);
    } else {
      result[child.nodeName] = value;
    }
  }
  return result;
}

/**
 * Parse an XML string and return an array of vehicle objects.
 * Expects <vehicles><vehicle>...</vehicle></vehicles> structure.
 * @param {string} text
 * @returns {Array}
 */
function parseXml(text) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(text, 'application/xml');

  const errorNode = xmlDoc.querySelector('parsererror');
  if (errorNode) throw new Error('XML inválido: ' + errorNode.textContent);

  const vehicleNodes = Array.from(xmlDoc.querySelectorAll('vehicle'));
  if (vehicleNodes.length === 0) {
    // Maybe the entire document is a single root — try to parse generically
    const root = xmlDoc.documentElement;
    const parsed = xmlNodeToObject(root);
    // If the root has a 'vehicle' key that is an array, use it
    const arr = parsed.vehicle;
    if (Array.isArray(arr)) return arr.map(normalizeXmlVehicle);
    if (arr && typeof arr === 'object') return [normalizeXmlVehicle(arr)];
    return [parsed];
  }

  return vehicleNodes.map((node) => {
    const raw = xmlNodeToObject(node);
    return normalizeXmlVehicle(raw);
  });
}

/**
 * Convert a raw XML vehicle object (all strings) into the proper shape.
 * @param {Object} raw
 * @returns {Object}
 */
function normalizeXmlVehicle(raw) {
  return {
    id: raw.id ?? '',
    name: raw.name ?? '',
    manufacturer: raw.manufacturer ?? '',
    class: raw.class ?? '',
    seats: raw.seats ? Number(raw.seats) : 0,
    price: raw.price ? Number(raw.price) : 0,
    stats: {
      speed: raw.stats?.speed ?? raw.speed ?? '',
      acceleration: raw.stats?.acceleration ?? raw.acceleration ?? '',
      handling: raw.stats?.handling ?? raw.handling ?? '',
      braking: raw.stats?.braking ?? raw.braking ?? '',
      realKMH: raw.stats?.realKMH ?? raw.realKMH ?? 0,
      realMPH: raw.stats?.realMPH ?? raw.realMPH ?? 0,
    },
    isWeaponized: raw.isWeaponized === 'true' || raw.isWeaponized === true,
    hasImaniTech: raw.hasImaniTech === 'true' || raw.hasImaniTech === true,
    isHsw: raw.isHsw === 'true' || raw.isHsw === true,
    image: raw.image ?? '',
  };
}

// ─── CSV helpers ────────────────────────────────────────────────────────────

/**
 * Parse a CSV string and return array of vehicle objects.
 * Expects flat columns (id, name, manufacturer, class, speed, etc.)
 * @param {string} text
 * @returns {Array}
 */
function parseCsv(text) {
  const result = Papa.parse(text, { header: true, skipEmptyLines: true });
  if (result.errors.length > 0) {
    throw new Error('CSV inválido: ' + result.errors[0].message);
  }
  // Re-inflate the flat rows back into the vehicle shape
  return result.data.map((row) => ({
    id: row.id ?? '',
    name: row.name ?? '',
    manufacturer: row.manufacturer ?? '',
    class: row.class ?? '',
    seats: row.seats ? Number(row.seats) : 0,
    price: row.price ? Number(row.price) : 0,
    stats: {
      speed: row.speed ?? '',
      acceleration: row.acceleration ?? '',
      handling: row.handling ?? '',
      braking: row.braking ?? '',
      realKMH: row.realKMH ? Number(row.realKMH) : 0,
      realMPH: row.realMPH ? Number(row.realMPH) : 0,
    },
    isWeaponized: row.isWeaponized === 'true' || row.isWeaponized === true,
    hasImaniTech: row.hasImaniTech === 'true' || row.hasImaniTech === true,
    isHsw: row.isHsw === 'true' || row.isHsw === true,
    image: row.image ?? '',
  }));
}

// ─── XLSX helpers ────────────────────────────────────────────────────────────

/**
 * Parse an ArrayBuffer (XLSX file content) and return array of vehicles.
 * AMPLIACIÓN: Microsoft Excel format.
 * @param {ArrayBuffer} buffer
 * @returns {Array}
 */
function parseXlsx(buffer) {
  const wb = XLSX.read(buffer, { type: 'array' });
  const sheetName = wb.SheetNames[0];
  const ws = wb.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });

  return rows.map((row) => ({
    id: row.id ?? '',
    name: row.name ?? '',
    manufacturer: row.manufacturer ?? '',
    class: row.class ?? '',
    seats: row.seats ? Number(row.seats) : 0,
    price: row.price ? Number(row.price) : 0,
    stats: {
      speed: row.speed ?? '',
      acceleration: row.acceleration ?? '',
      handling: row.handling ?? '',
      braking: row.braking ?? '',
      realKMH: row.realKMH ? Number(row.realKMH) : 0,
      realMPH: row.realMPH ? Number(row.realMPH) : 0,
    },
    isWeaponized: row.isWeaponized === 'true' || row.isWeaponized === true,
    hasImaniTech: row.hasImaniTech === 'true' || row.hasImaniTech === true,
    isHsw: row.isHsw === 'true' || row.isHsw === true,
    image: row.image ?? '',
  }));
}

// ─── Public function ────────────────────────────────────────────────────────

/**
 * Parse a File object and return an array of vehicle objects.
 * Supports: .json, .xml, .csv, .xlsx, .xls
 * @param {File} file
 * @returns {Promise<Array>}
 */
export async function parseVehicleFile(file) {
  const ext = file.name.split('.').pop().toLowerCase();

  if (ext === 'json') {
    const text = await file.text();
    const parsed = JSON.parse(text);
    // Handle both array and { vehicles: [...] } shapes
    return Array.isArray(parsed) ? parsed : (parsed.vehicles ?? [parsed]);
  }

  if (ext === 'xml') {
    const text = await file.text();
    return parseXml(text);
  }

  if (ext === 'csv') {
    const text = await file.text();
    return parseCsv(text);
  }

  if (ext === 'xlsx' || ext === 'xls' || ext === 'ods') {
    const buffer = await file.arrayBuffer();
    return parseXlsx(buffer);
  }

  throw new Error(`Formato no soportado: .${ext}. Usa JSON, XML, CSV o XLSX.`);
}
