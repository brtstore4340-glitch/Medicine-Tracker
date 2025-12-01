import React, { useState, useEffect } from 'react';
import { Save, Calendar, Hash, Pill } from 'lucide-react';

const MedicineForm = ({ initialData, onSubmit, onCancel, isSaving }) => {
    const [formData, setFormData] = useState({
        name: '',
        lotNumber: '',
        manufacturingDate: '',
        expirationDate: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData(prev => ({ ...prev, ...initialData }));
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="flex-col gap-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            <div className="input-group">
                <label className="input-label">Medicine Name</label>
                <div style={{ position: 'relative' }}>
                    <Pill size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleChange}
                        className="input-field"
                        style={{ paddingLeft: '40px' }}
                        placeholder="e.g. Paracetamol 500mg"
                        required
                    />
                </div>
            </div>

            <div className="input-group">
                <label className="input-label">Lot / Batch Number</label>
                <div style={{ position: 'relative' }}>
                    <Hash size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        name="lotNumber"
                        value={formData.lotNumber || ''}
                        onChange={handleChange}
                        className="input-field"
                        style={{ paddingLeft: '40px' }}
                        placeholder="e.g. A1234567"
                    />
                </div>
            </div>

            <div className="flex-between" style={{ gap: '1rem' }}>
                <div className="input-group" style={{ flex: 1 }}>
                    <label className="input-label">Mfg Date</label>
                    <input
                        type="date"
                        name="manufacturingDate"
                        value={formData.manufacturingDate || ''}
                        onChange={handleChange}
                        className="input-field"
                    />
                </div>

                <div className="input-group" style={{ flex: 1 }}>
                    <label className="input-label">Exp Date</label>
                    <input
                        type="date"
                        name="expirationDate"
                        value={formData.expirationDate || ''}
                        onChange={handleChange}
                        className="input-field"
                        required
                    />
                </div>
            </div>

            <div className="flex-between" style={{ marginTop: '1rem', gap: '1rem' }}>
                <button type="button" onClick={onCancel} className="btn btn-secondary" style={{ flex: 1 }}>
                    Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={isSaving}>
                    {isSaving ? 'Saving...' : (
                        <>
                            <Save size={18} /> Save Medicine
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default MedicineForm;
