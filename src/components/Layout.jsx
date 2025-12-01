import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, PlusCircle, Settings } from 'lucide-react';

const Layout = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="container">
      <header className="flex-between" style={{ padding: '1rem 0', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'var(--primary)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.28 3.6-1.28 5.14 0l.01.01c0 .01.01.02.01.03 0 .01.01.02.01.03 0 .01.01.02.01.03 0 .01.01.02.01.03l-10 10c-.38.38-.89.59-1.42.59-.53 0-1.04-.21-1.42-.59l-6.5-6.5c-1.28-1.28-1.28-3.36 0-4.64 1.28-1.28 3.36-1.28 4.64 0l3.28 3.28 3.28-3.28c1.28-1.28 3.36-1.28 4.64 0 .38.38.59.89.59 1.42 0 .53-.21 1.04-.59 1.42l-5.5 5.5" />
              <path d="M12 2v4" />
              <path d="M12 18v4" />
              <path d="M4.93 4.93l2.83 2.83" />
              <path d="M16.24 16.24l2.83 2.83" />
              <path d="M2 12h4" />
              <path d="M18 12h4" />
              <path d="M4.93 19.07l2.83-2.83" />
              <path d="M16.24 7.76l2.83-2.83" />
            </svg>
          </div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-dark)' }}>MedTracker</h1>
        </div>
        <button className="btn-icon" onClick={() => alert("Settings feature coming soon!")}>
          <Settings size={24} color="var(--text-secondary)" />
        </button>
      </header>

      <main style={{ flex: 1, paddingBottom: '80px' }}>
        <Outlet />
      </main>

      <nav className="glass-panel" style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 40px)',
        maxWidth: '560px',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '1rem',
        zIndex: 100
      }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            color: isActive('/') ? 'var(--primary)' : 'var(--text-muted)'
          }}>
            <Home size={24} />
            <span className="text-xs font-bold">Home</span>
          </div>
        </Link>

        <Link to="/add" style={{ textDecoration: 'none' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            color: isActive('/add') ? 'var(--primary)' : 'var(--text-muted)'
          }}>
            <PlusCircle size={24} />
            <span className="text-xs font-bold">Add Med</span>
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default Layout;
