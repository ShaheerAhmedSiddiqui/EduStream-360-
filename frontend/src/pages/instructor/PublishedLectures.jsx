import React from 'react';

export default function PublishedLectures() {
  const staticLectures = [
    {
      id: "65cb123f...",
      title: 'Advanced React Optimization Patterns',
      description: 'Analyzing fiber reconstruction cycles, profiling component trees, and avoiding unneeded state calculations.',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      studyGroup: 'Alpha-SE',
      classofStudy: 6,
      isApproved: true,
      reviewedBy: 'Admin (Dean Office)'
    },
    {
      id: "65cb456e...",
      title: 'Relational Schema Constraints & Foreign Keys',
      description: 'Enforcing data boundaries at the transactional layer inside MySQL instances.',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      studyGroup: 'Beta-CS',
      classofStudy: 4,
      isApproved: false,
      reviewedBy: null
    }
  ];

  return (
    <div style={styles.card}>
      <h4 style={styles.sectionHeading}>Your Academic Publications Timeline</h4>
      <div style={styles.list}>
        {staticLectures.map((lec) => (
          <div key={lec.id} style={styles.item}>
            <div style={styles.meta}>
              <div style={styles.titleRow}>
                <h5 style={styles.title}>{lec.title}</h5>
                <span style={{ 
                  ...styles.badge, 
                  backgroundColor: lec.isApproved ? '#e2fbe8' : '#fff3cd', 
                  color: lec.isApproved ? '#14532d' : '#854d0e' 
                }}>
                  {lec.isApproved ? 'Verified & Live' : 'Awaiting Review Check'}
                </span>
              </div>
              
              <p style={styles.description}>{lec.description}</p>
              
              <div style={styles.parameterGrid}>
                <span style={styles.paramItem}>👥 Group: <strong>{lec.studyGroup}</strong></span>
                <span style={styles.paramItem}>📅 Semester Class: <strong>{lec.classofStudy}</strong></span>
                {lec.reviewedBy && <span style={styles.paramItem}>🔍 Audit By: <strong>{lec.reviewedBy}</strong></span>}
              </div>
            </div>
            
            <a href={lec.videoUrl} target="_blank" rel="noreferrer" style={styles.youtubeLink}>
              🎥 View YouTube Resource Link
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  card: { backgroundColor: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' },
  sectionHeading: { margin: '0 0 20px 0', color: '#004124', fontSize: '18px', fontWeight: '600' },
  list: { display: 'flex', flexDirection: 'column', gap: '16px' },
  item: { padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#fafafa' },
  meta: { display: 'flex', flexDirection: 'column', gap: '6px' },
  titleRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  title: { margin: 0, fontSize: '17px', color: '#0f172a', fontWeight: '600' },
  badge: { padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' },
  description: { margin: 0, color: '#475569', fontSize: '14px', lineHeight: '1.5' },
  parameterGrid: { display: 'flex', gap: '20px', fontSize: '13px', color: '#64748b', borderTop: '1px dashed #e2e8f0', paddingTop: '10px', marginTop: '4px' },
  paramItem: { display: 'inline-block' },
  youtubeLink: { alignSelf: 'flex-start', padding: '8px 14px', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '6px', fontSize: '13px', textDecoration: 'none', fontWeight: '600', transition: 'background 0.2s' }
};