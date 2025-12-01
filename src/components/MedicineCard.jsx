import React from 'react';
import { formatDate, getDaysUntilExpiry, getExpiryStatus, getStatusColor } from '../utils/dateUtils';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const MedicineCard = ({ medicine }) => {
    const daysLeft = getDaysUntilExpiry(medicine.expirationDate);
    const status = getExpiryStatus(daysLeft);
    const statusColor = getStatusColor(status);

    const getStatusIcon = () => {
        switch (status) {
            case 'expired': return <AlertTriangle size={20} color={statusColor} />;
            case 'warning': return <Clock size={20} color={statusColor} />;
            case 'good': return <CheckCircle size={20} color={statusColor} />;
            default: return null;
        }
    };

    return (
        <div className="card" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            borderLeft: `4px solid ${statusColor}`
        }}>
            <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'var(--bg-app)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {getStatusIcon()}
            </div>

            <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '2px' }}>{medicine.name}</h3>
                <p className="text-xs text-muted" style={{ color: 'var(--text-secondary)' }}>Lot: {medicine.lotNumber || 'N/A'}</p>
            </div>

            <div style={{ textAlign: 'right' }}>
                <p className="text-xs font-bold" style={{ color: statusColor }}>
                    {status === 'expired' ? 'EXPIRED' : `${daysLeft} days`}
                </p>
                <p className="text-xs text-muted" style={{ color: 'var(--text-muted)' }}>
                    {formatDate(medicine.expirationDate)}
                </p>
            </div>
        </div>
    );
};

export default MedicineCard;
