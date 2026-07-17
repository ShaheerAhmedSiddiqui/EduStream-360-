import React from 'react';

export default function AdminDashboard() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8faf9', fontFamily: "'Inter', sans-serif", padding: '30px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ backgroundColor: '#ffffff', padding: '25px', borderRadius: '12px', border: '1px solid #e1e8e4', marginBottom: '30px' }}>
          <h2 style={{ margin: '0 0 5px 0', color: '#004124', fontSize: '22px' }}>System Administration</h2>
          <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Global oversight panel to provision institutional system accounts and manage data schemas.</p>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e1e8e4', padding: '25px' }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#004124', borderBottom: '2px solid #f0f4f2', paddingBottom: '10px', fontSize: '18px' }}>
            ⚙️ Control Hub Actions
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div style={{ border: '1px dashed #004124', backgroundColor: '#fafdfb', padding: '20px', borderRadius: '8px', textAlign: 'center', cursor: 'pointer' }}>
              <span style={{ fontSize: '24px', display: 'block', marginBottom: '5px' }}>👨‍🏫</span>
              <strong style={{ color: '#004124', display: 'block', fontSize: '14px' }}>Manage Users</strong>
              <span style={{ fontSize: '11px', color: '#64748b' }}>Provision, update, or revoke access credentials</span>
            </div>
            <div style={{ border: '1px dashed #004124', backgroundColor: '#fafdfb', padding: '20px', borderRadius: '8px', textAlign: 'center', cursor: 'pointer' }}>
              <span style={{ fontSize: '24px', display: 'block', marginBottom: '5px' }}>🏛️</span>
              <strong style={{ color: '#004124', display: 'block', fontSize: '14px' }}>System Metrics</strong>
              <span style={{ fontSize: '11px', color: '#64748b' }}>Monitor active connections and node execution states</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}