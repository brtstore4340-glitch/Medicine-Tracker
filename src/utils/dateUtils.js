export const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(date);
    } catch (e) {
        return dateString;
    }
};

export const getDaysUntilExpiry = (expiryDateString) => {
    if (!expiryDateString) return null;
    const today = new Date();
    const expiry = new Date(expiryDateString);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

export const getExpiryStatus = (days) => {
    if (days === null) return 'unknown';
    if (days < 0) return 'expired';
    if (days <= 30) return 'warning';
    return 'good';
};

export const getStatusColor = (status) => {
    switch (status) {
        case 'expired': return 'var(--error)';
        case 'warning': return 'var(--warning)';
        case 'good': return 'var(--success)';
        default: return 'var(--text-muted)';
    }
};
