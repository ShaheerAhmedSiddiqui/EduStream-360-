import React from 'react';

export default function StudentLectures() {
  const staticLectures = [
    { id: 1, title: 'Introduction to Full-Stack Architectures', description: 'Understanding clients, servers, and spatial file hosting networks.', instructor: 'Dr. Sarah Jenkins', link: 'https://youtube.com' },
    { id: 2, title: 'Database Normalization Fundamentals', description: 'Deep dive into relational schemas, table joins, and performance patterns.', instructor: 'Prof. Alex Mercer', link: 'https://youtube.com' }
  ];

  return (
    <div style={styles.card}>
      <h4 style={styles.sectionHeading}>Your Academic Lectures Pipeline</h4>
      <div style={styles.list}>
        {staticLectures.map((lec) => (
          <div key={lec.id} style={styles.item}>
            <div style={styles.meta}>
              <h5 style={styles.title}>{lec.title}</h5>
              <span style={styles.instructor}>Conducted by: {lec.instructor}</span>
              <p style={styles.description}>{lec.description}</p>
            </div>
            <a href={lec.link} target="_blank" rel="noreferrer" style={styles.videoBtn}>
              🎥 Stream Video Material
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
  item: { padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fafafa' },
  meta: { flexGrow: 1, paddingRight: '20px' },
  title: { margin: '0 0 4px 0', fontSize: '16px', color: '#0f172a', fontWeight: '600' },
  instructor: { fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '8px', fontWeight: '500' },
  description: { margin: 0, color: '#334155', fontSize: '14px', lineHeight: '1.5' },
  videoBtn: { display: 'inline-block', padding: '10px 16px', backgroundColor: '#e0f2fe', color: '#0369a1', borderRadius: '6px', fontSize: '13px', textDecoration: 'none', fontWeight: '600', transition: 'background 0.2s', whiteSpace: 'nowrap' }
};