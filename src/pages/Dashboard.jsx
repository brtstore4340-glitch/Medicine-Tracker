import React, { useEffect, useState } from 'react';
import { subscribeToMedicines } from '../services/firebase';
import MedicineCard from '../components/MedicineCard';
import { getDaysUntilExpiry } from '../utils/dateUtils';
import { AlertTriangle, Package } from 'lucide-react';

const Dashboard = () => {
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = subscribeToMedicines((data) => {
            setMedicines(data);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const expiringCount = medicines.filter(m => {
        const days = getDaysUntilExpiry(m.expirationDate);
        return days !== null && days <= 30;
    }).length;

    if (loading) {
        return (
            <div className="flex-col" style={{ alignItems: 'center', justifyContent: 'center', height: '50vh', gap: '1rem' }}>
                <div className="spinner" style={{
                    width: '40px',
                    height: '40px',
                    border: '4px solid var(--border)',
                    borderTopColor: 'var(--primary)',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }}></div>
                <p className="text-muted">Loading inventory...</p>
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    return (
        <div style={{ padding: '1rem' }}>
            {/* Summary Card */}
            <div className="card" style={{
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
                color: 'white',
                border: 'none',
                marginBottom: '1.5rem'
            }}>
                <div className="flex-between">
                    <div>
                        <p style={{ opacity: 0.9, fontSize: '0.875rem' }}>Total Medicines</p>
                        <h2 style={{ fontSize: '2rem', fontWeight: '700' }}>{medicines.length}</h2>
                    </div>
                    <div style={{
                        background: 'rgba(255,255,255,0.2)',
                        padding: '0.75rem',
                        borderRadius: '12px'
                    }}>
                        <Package size={32} color="white" />
                    </div>
                </div>

                {expiringCount > 0 && (
                    <div style={{
                        marginTop: '1rem',
                        background: 'rgba(255,255,255,0.15)',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <AlertTriangle size={18} color="#FCA5A5" />
                        <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                            {expiringCount} items expiring soon
                        </span>
                    </div>
                )}
            </div>

            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Inventory</h3>

            <div className="flex-col" style={{ gap: '0.75rem', display: 'flex', flexDirection: 'column' }}>
                {medicines.length === 0 ? (
                    <div className="text-center" style={{ padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                        <Package size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                        <p>No medicines added yet.</p>
                        <p className="text-sm">Tap "Add Med" to get started.</p>
                    </div>
                ) : (
                    medicines.map(med => (
                        <MedicineCard key={med.id} medicine={med} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Dashboard;
