import { useState, useRef } from 'react';
import { parseVehicleFile } from '../../utils/fileImport';
import { exportJson, exportCsv, exportXml, exportXlsx } from '../../utils/fileExport';
import { importVehicles, getVehicles } from '../../services/vehicleService';
import './ImportExportPage.css';

const ACCEPTED = '.json,.xml,.csv,.xlsx,.xls,.ods';

const ImportExportPage = () => {
    // ── Import state ──────────────────────────────────────────────────────────
    const [importedData, setImportedData] = useState(null);
    const [importFileName, setImportFileName] = useState('');
    const [importError, setImportError] = useState('');
    const [importing, setImporting] = useState(false);
    const [importSuccess, setImportSuccess] = useState('');
    const fileInputRef = useRef(null);

    // ── Export state ──────────────────────────────────────────────────────────
    const [exportData, setExportData] = useState(null);
    const [loadingExport, setLoadingExport] = useState(false);
    const [exportError, setExportError] = useState('');

    // ─────────────────────────────────────────────────────────────────────────
    // IMPORT HANDLERS
    // ─────────────────────────────────────────────────────────────────────────

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImportError('');
        setImportSuccess('');
        setImportedData(null);
        setImportFileName(file.name);

        try {
            const vehicles = await parseVehicleFile(file);
            setImportedData(vehicles);
        } catch (err) {
            setImportError('Error al leer el archivo: ' + err.message);
        }
    };

    const handleSaveToFirebase = async () => {
        if (!importedData?.length) return;
        setImporting(true);
        setImportError('');
        setImportSuccess('');
        try {
            const count = await importVehicles(importedData);
            setImportSuccess(`✅ ${count} vehículos guardados en Firebase correctamente.`);
        } catch (err) {
            setImportError('Error al guardar en Firebase: ' + err.message);
        } finally {
            setImporting(false);
        }
    };

    // ─────────────────────────────────────────────────────────────────────────
    // EXPORT HANDLERS
    // ─────────────────────────────────────────────────────────────────────────

    const handleLoadFromFirebase = async () => {
        setLoadingExport(true);
        setExportError('');
        try {
            const vehicles = await getVehicles();
            setExportData(vehicles);
        } catch (err) {
            setExportError('Error al cargar desde Firebase: ' + err.message);
        } finally {
            setLoadingExport(false);
        }
    };

    // ─────────────────────────────────────────────────────────────────────────
    // RENDER HELPERS
    // ─────────────────────────────────────────────────────────────────────────

    const VehicleTable = ({ vehicles }) => {
        if (!vehicles?.length) return null;
        const preview = vehicles.slice(0, 20);

        return (
            <div className="ie-table-wrapper">
                {vehicles.length > 20 && (
                    <p className="ie-table-note">
                        Mostrando 20 de {vehicles.length} vehículos
                    </p>
                )}
                <table className="ie-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Fabricante</th>
                            <th>Clase</th>
                            <th>Precio</th>
                            <th>Vel. Real (km/h)</th>
                            <th>Armado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {preview.map((v, i) => (
                            <tr key={v.id || i}>
                                <td className="ie-td-mono">{v.id}</td>
                                <td>{v.name}</td>
                                <td>{v.manufacturer}</td>
                                <td>
                                    <span className="ie-badge">{v.class}</span>
                                </td>
                                <td>${Number(v.price || 0).toLocaleString()}</td>
                                <td>{v.stats?.realKMH ?? '—'} km/h</td>
                                <td>
                                    <span className={v.isWeaponized ? 'ie-tag-yes' : 'ie-tag-no'}>
                                        {v.isWeaponized ? '⚔️ Sí' : 'No'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="ie-page">
            {/* PAGE HEADER */}
            <div className="ie-hero">
                <div className="ie-hero-glow" />
                <h1 className="ie-title">
                    <span className="ie-icon">⚡</span>
                    Import / Export
                </h1>
                <p className="ie-subtitle">
                    Importa o exporta los vehículos de LSPA en formato JSON, XML, CSV o Excel.
                    Los datos se almacenan en Firebase Firestore.
                </p>
            </div>

            <div className="ie-panels">

                {/* ── PANEL IMPORTAR ─────────────────────────────────────────── */}
                <section className="ie-panel ie-panel--import">
                    <div className="ie-panel-header">
                        <span className="ie-panel-icon">📥</span>
                        <h2>Importar Datos</h2>
                    </div>
                    <p className="ie-panel-desc">
                        Selecciona un archivo <strong>JSON</strong>, <strong>XML</strong>, <strong>CSV</strong> o <strong>Excel (.xlsx)</strong> para cargar vehículos en Firebase.
                    </p>

                    {/* Drop zone */}
                    <div
                        className="ie-dropzone"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <span className="ie-dropzone-icon">📂</span>
                        <span className="ie-dropzone-text">
                            {importFileName
                                ? importFileName
                                : 'Haz clic o suelta un archivo aquí'}
                        </span>
                        <span className="ie-dropzone-hint">{ACCEPTED}</span>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept={ACCEPTED}
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            id="file-input"
                        />
                    </div>

                    {/* Sample download links */}
                    <div className="ie-sample-links">
                        <span>Archivos de ejemplo:</span>
                        <a href="/sample-data/datos.json" download className="ie-sample-btn">datos.json</a>
                        <a href="/sample-data/datos.xml" download className="ie-sample-btn">datos.xml</a>
                        <a href="/sample-data/datos.csv" download className="ie-sample-btn">datos.csv</a>
                    </div>

                    {importError && <p className="ie-error">{importError}</p>}
                    {importSuccess && <p className="ie-success">{importSuccess}</p>}

                    {importedData && (
                        <>
                            <div className="ie-loaded-info">
                                <span className="ie-count-badge">{importedData.length}</span>
                                vehículos listos para importar
                            </div>
                            <VehicleTable vehicles={importedData} />
                            <button
                                className="ie-btn ie-btn--primary"
                                onClick={handleSaveToFirebase}
                                disabled={importing}
                            >
                                {importing ? '⏳ Guardando...' : '🔥 Guardar en Firebase'}
                            </button>
                        </>
                    )}
                </section>

                {/* ── PANEL EXPORTAR ─────────────────────────────────────────── */}
                <section className="ie-panel ie-panel--export">
                    <div className="ie-panel-header">
                        <span className="ie-panel-icon">📤</span>
                        <h2>Exportar Datos</h2>
                    </div>
                    <p className="ie-panel-desc">
                        Carga los vehículos desde Firebase y descárgalos en el formato que prefieras.
                    </p>

                    <button
                        className="ie-btn ie-btn--secondary"
                        onClick={handleLoadFromFirebase}
                        disabled={loadingExport}
                    >
                        {loadingExport ? '⏳ Cargando...' : '🔄 Cargar desde Firebase'}
                    </button>

                    {exportError && <p className="ie-error">{exportError}</p>}

                    {exportData && (
                        <>
                            <div className="ie-loaded-info">
                                <span className="ie-count-badge">{exportData.length}</span>
                                vehículos cargados
                            </div>

                            <VehicleTable vehicles={exportData} />

                            <div className="ie-export-btns">
                                <button
                                    className="ie-btn ie-btn--format ie-btn--json"
                                    onClick={() => exportJson(exportData)}
                                    disabled={!exportData.length}
                                >
                                    ⬇️ JSON
                                </button>
                                <button
                                    className="ie-btn ie-btn--format ie-btn--xml"
                                    onClick={() => exportXml(exportData)}
                                    disabled={!exportData.length}
                                >
                                    ⬇️ XML
                                </button>
                                <button
                                    className="ie-btn ie-btn--format ie-btn--csv"
                                    onClick={() => exportCsv(exportData)}
                                    disabled={!exportData.length}
                                >
                                    ⬇️ CSV
                                </button>
                                <button
                                    className="ie-btn ie-btn--format ie-btn--xlsx"
                                    onClick={() => exportXlsx(exportData)}
                                    disabled={!exportData.length}
                                    title="Formato Excel (.xlsx) — Ampliación"
                                >
                                    ⬇️ XLSX
                                </button>
                            </div>

                            <p className="ie-xlsx-note">
                                💡 <strong>XLSX</strong> requiere Microsoft Excel o LibreOffice Calc.
                            </p>
                        </>
                    )}
                </section>

            </div>
        </div>
    );
};

export default ImportExportPage;
