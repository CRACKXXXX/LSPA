/**
 * fileExport.js
 * Utilities to export vehicle data to CSV, XML, JSON and XLSX formats.
 * Adapted from tcrurav/react-import-export-json-xml-csv reference.
 */

import Papa from 'papaparse';
import * as XLSX from 'xlsx';

// ─── Converters ────────────────────────────────────────────────────────────────

/**
 * Flatten a vehicle object (nested stats → top-level columns) for CSV/XLSX.
 * @param {Object} v
 * @returns {Object}
 */
function flattenVehicle(v) {
  return {
    id: v.id ?? '',
    name: v.name ?? '',
    manufacturer: v.manufacturer ?? '',
    class: v.class ?? '',
    seats: v.seats ?? '',
    price: v.price ?? 0,
    speed: v.stats?.speed ?? '',
    acceleration: v.stats?.acceleration ?? '',
    handling: v.stats?.handling ?? '',
    braking: v.stats?.braking ?? '',
    realKMH: v.stats?.realKMH ?? '',
    realMPH: v.stats?.realMPH ?? '',
    isWeaponized: v.isWeaponized ?? false,
    hasImaniTech: v.hasImaniTech ?? false,
    isHsw: v.isHsw ?? false,
    image: v.image ?? '',
  };
}

/**
 * Convert array of vehicles to a CSV string.
 * @param {Array} vehicles
 * @returns {string}
 */
export function vehiclesToCsv(vehicles) {
  const flat = vehicles.map(flattenVehicle);
  return Papa.unparse(flat);
}

/**
 * Convert array of vehicles to an XML string.
 * @param {Array} vehicles
 * @returns {string}
 */
export function vehiclesToXml(vehicles) {
  const rows = vehicles
    .map((v) => {
      const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
      return `  <vehicle>
    <id>${esc(v.id)}</id>
    <name>${esc(v.name)}</name>
    <manufacturer>${esc(v.manufacturer)}</manufacturer>
    <class>${esc(v.class)}</class>
    <seats>${esc(v.seats)}</seats>
    <price>${esc(v.price)}</price>
    <stats>
      <speed>${esc(v.stats?.speed)}</speed>
      <acceleration>${esc(v.stats?.acceleration)}</acceleration>
      <handling>${esc(v.stats?.handling)}</handling>
      <braking>${esc(v.stats?.braking)}</braking>
      <realKMH>${esc(v.stats?.realKMH)}</realKMH>
      <realMPH>${esc(v.stats?.realMPH)}</realMPH>
    </stats>
    <isWeaponized>${v.isWeaponized ?? false}</isWeaponized>
    <hasImaniTech>${v.hasImaniTech ?? false}</hasImaniTech>
    <isHsw>${v.isHsw ?? false}</isHsw>
    <image>${esc(v.image)}</image>
  </vehicle>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<vehicles>\n${rows}\n</vehicles>`;
}

// ─── Download helpers ────────────────────────────────────────────────────────

/**
 * Trigger a browser download of a text blob.
 * @param {string} content
 * @param {string} fileName
 * @param {string} mimeType
 */
function downloadText(content, fileName, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ─── Public export functions ────────────────────────────────────────────────

/**
 * Export vehicles as JSON and trigger download.
 * @param {Array} vehicles
 * @param {string} fileName
 */
export function exportJson(vehicles, fileName = 'datos.json') {
  const content = JSON.stringify(vehicles, null, 2);
  downloadText(content, fileName, 'application/json');
}

/**
 * Export vehicles as CSV and trigger download.
 * @param {Array} vehicles
 * @param {string} fileName
 */
export function exportCsv(vehicles, fileName = 'datos.csv') {
  const content = vehiclesToCsv(vehicles);
  downloadText(content, fileName, 'text/csv');
}

/**
 * Export vehicles as XML and trigger download.
 * @param {Array} vehicles
 * @param {string} fileName
 */
export function exportXml(vehicles, fileName = 'datos.xml') {
  const content = vehiclesToXml(vehicles);
  downloadText(content, fileName, 'application/xml');
}

/**
 * Export vehicles as Excel (.xlsx) and trigger download.
 * AMPLIACIÓN: Microsoft Excel format.
 * @param {Array} vehicles
 * @param {string} fileName
 */
export function exportXlsx(vehicles, fileName = 'datos.xlsx') {
  const flat = vehicles.map(flattenVehicle);
  const ws = XLSX.utils.json_to_sheet(flat);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Vehicles');
  XLSX.writeFile(wb, fileName);
}

/**
 * Export vehicles as Legacy Excel (.xls) and trigger download.
 * AMPLIACIÓN: Microsoft Excel Legacy format (+10%).
 * @param {Array} vehicles
 * @param {string} fileName
 */
export function exportXls(vehicles, fileName = 'datos.xls') {
  const flat = vehicles.map(flattenVehicle);
  const ws = XLSX.utils.json_to_sheet(flat);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Vehicles');
  XLSX.writeFile(wb, fileName);
}

/**
 * Export vehicles as LibreOffice Calc (.ods) and trigger download.
 * AMPLIACIÓN: OpenDocument Spreadsheet format (+10%).
 * @param {Array} vehicles
 * @param {string} fileName
 */
export function exportOds(vehicles, fileName = 'datos.ods') {
  const flat = vehicles.map(flattenVehicle);
  const ws = XLSX.utils.json_to_sheet(flat);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Vehicles');
  XLSX.writeFile(wb, fileName);
}
