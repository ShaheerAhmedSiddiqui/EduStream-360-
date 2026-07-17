import React from 'react';

export default function StudentDashboard() {
  const staticSchedule = [
    { id: '1', type: 'Quiz', topic: 'Relational Algebra Key Constraints', closing: 'Closing in 24 hours', group: 'SE-Alpha' },
    { id: '2', type: 'Lecture Video', topic: 'Advanced Multi-Table MySQL Joins', closing: 'Uploaded Today', group: 'SE-Alpha' }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8faf9', fontFamily: "'Inter', sans-serif", padding: '30px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Welcome Area */}
        <div style={{ backgroundColor: '#ffffff', padding: '25px', borderRadius: '12px', border: '1px solid #e1e8e4', marginBottom: '30px' }}>
          <h2 style={{ margin: '0 0 5px 0', color: '#004124', fontSize: '22px' }}>Assalam-o-Alaikum, Student Portal</h2>
          <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Track your current lecture segments, manage pending quizzes, and inspect graded milestones.</p>
        </div>

        {/* Dashboard Sections Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
          
          {/* Main Course Feed */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e1e8e4', padding: '25px' }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#004124', borderBottom: '2px solid #f0f4f2', paddingBottom: '10px', fontSize: '18px' }}>
              📚 Enrolled Modules
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ border: '1px solid #e2e8f0', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 5px 0', color: '#334155' }}>Database Management Systems (MySQL)</h4>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>Section: SE-Alpha</span>
                </div>
                <button style={{ backgroundColor: '#004124', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', color: '#fff', cursor: 'pointer' }}>View Lectures</button>
              </div>
            </div>
          </div>

          {/* Action Center Timeline */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e1e8e4', padding: '25px' }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#004124', borderBottom: '2px solid #f0f4f2', paddingBottom: '10px', fontSize: '17px' }}>
              🔔 Action Timeline
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {staticSchedule.map((item) => (
                <div key={item.id} style={{ paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 'bold', backgroundColor: item.type === 'Quiz' ? '#fef2f2' : '#eff6ff', color: item.type === 'Quiz' ? '#dc2626' : '#2563eb', padding: '2px 6px', borderRadius: '4px' }}>
                      {item.type}
                    </span>
                  </div>
                  <strong style={{ display: 'block', fontSize: '14px', color: '#334155', marginBottom: '3px' }}>{item.topic}</strong>
                  <span style={{ fontSize: '12px', color: '#004124', fontWeight: '500' }}>{item.closing}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}