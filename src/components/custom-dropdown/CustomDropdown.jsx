import React, { useState, useRef, useEffect } from 'react';
import './CustomDropdown.css';

/**
 * CustomDropdown - Reusable glassmorphism dropdown
 * 
 * @param {Array} options - [{ value, label, color?, group? }]
 *   If `group` is specified, options are visually grouped under that header.
 * @param {string} value - Currently selected value
 * @param {function} onChange - Callback(value)
 * @param {string} accentColor - CSS color for borders/glow
 * @param {string} label - Optional label displayed before the trigger
 * @param {boolean} fullWidth - If true, trigger fills available width
 * @param {boolean} disabled - If true, dropdown is non-interactive
 * @param {string} className - Extra class for the wrapper
 */
const CustomDropdown = ({ 
    options, value, onChange, 
    accentColor = 'var(--primary-color)', 
    label = '', 
    fullWidth = false,
    disabled = false,
    className = ''
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const selected = options.find(o => o.value === value) || options[0];

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Group options by their 'group' property if present
    const hasGroups = options.some(o => o.group);

    const renderOptions = () => {
        if (!hasGroups) {
            return options.map(opt => (
                <button
                    key={opt.value}
                    className={`cdrop-option ${opt.value === value ? 'active' : ''}`}
                    onClick={() => { onChange(opt.value); setIsOpen(false); }}
                    style={{ '--opt-color': opt.color || '#fff' }}
                >
                    <span className="cdrop-option-label">{opt.label}</span>
                    {opt.value === value && <span className="cdrop-option-check">✓</span>}
                </button>
            ));
        }

        // Grouped rendering
        const groups = {};
        options.forEach(opt => {
            const g = opt.group || '';
            if (!groups[g]) groups[g] = [];
            groups[g].push(opt);
        });

        return Object.entries(groups).map(([groupName, groupOpts]) => (
            <div key={groupName} className="cdrop-group">
                {groupName && <div className="cdrop-group-header">{groupName}</div>}
                {groupOpts.map(opt => (
                    <button
                        key={opt.value}
                        className={`cdrop-option ${opt.value === value ? 'active' : ''}`}
                        onClick={() => { onChange(opt.value); setIsOpen(false); }}
                        style={{ '--opt-color': opt.color || '#fff' }}
                    >
                        <span className="cdrop-option-label">{opt.label}</span>
                        {opt.value === value && <span className="cdrop-option-check">✓</span>}
                    </button>
                ))}
            </div>
        ));
    };

    return (
        <div 
            className={`cdrop ${fullWidth ? 'cdrop--full' : ''} ${disabled ? 'cdrop--disabled' : ''} ${className}`} 
            ref={dropdownRef} 
            style={{ '--cdrop-accent': accentColor }}
        >
            {label && <span className="cdrop-label">{label}</span>}
            <button
                className={`cdrop-trigger ${isOpen ? 'open' : ''}`}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
            >
                <span className="cdrop-selected" style={{ color: selected?.color || '#fff' }}>
                    {selected?.label || 'Seleccionar...'}
                </span>
                <span className={`cdrop-arrow ${isOpen ? 'rotated' : ''}`}>▾</span>
            </button>

            {isOpen && !disabled && (
                <div className="cdrop-menu">
                    {renderOptions()}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
