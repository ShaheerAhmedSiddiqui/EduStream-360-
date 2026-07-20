import React from 'react';

export default function StudentQuizzes() {
  const staticQuizzes = [
    { id: 101, title: 'MERN Deployment Quiz 1', lectureName: 'Full-Stack Architectures', questionsCount: 10, status: 'Pending' },
    { id: 102, title: 'SQL Constraints Assessment', lectureName: 'Database Normalization', questionsCount: 5, status: 'Completed', score: '85%' }
  ];

  return (
    <div style={styles.card}>
      <h4 style={styles.sectionHeading}>Assigned Evaluation Targets</h4>
      <div style={styles.grid}>
        {staticQuizzes.map((quiz) => (
          <div key={quiz.id} style={styles.quizBox}>
            <div style={styles.badgeRow}>
              <span style={{ ...styles.badge, backgroundColor: quiz.status === 'Completed' ? '#dcfce7' : '#fef9c3', color: quiz.status === 'Completed' ? '#166534' : '#854d0e' }}>
                {quiz.status}
              </span>
              {quiz.score && <span style={styles.scoreText}>Score: {quiz.score}</span>}
            </div>
            <h5 style={styles.quizTitle}>{quiz.title}</h5>
            <span style={styles.subtext}>Linked Context: {quiz.lectureName}</span>
            <span style={styles.subtext}>Scope: {quiz.questionsCount} Multiple Choice Questions</span>
            
            {quiz.status === 'Pending' && (
              <button style={styles.startBtn} onClick={() => alert('Launching evaluation engine sequence...')}>
                🚀 Start Test
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  card: { backgroundColor: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' },
  sectionHeading: { margin: '0 0 20px 0', color: '#004124', fontSize: '18px', fontWeight: '600' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' },
  quizBox: { border: '1px solid #e2e8f0', padding: '20px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '6px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' },
  badgeRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' },
  badge: { padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', uppercase: 'true' },
  scoreText: { fontSize: '13px', fontWeight: '600', color: '#166534' },
  quizTitle: { margin: '0 0 2px 0', fontSize: '16px', color: '#0f172a', fontWeight: '600' },
  subtext: { fontSize: '13px', color: '#64748b' },
  startBtn: { marginTop: '14px', padding: '10px', border: 'none', borderRadius: '6px', backgroundColor: '#004124', color: '#fff', cursor: 'pointer', fontWeight: '600', transition: 'background 0.2s', textAlign: 'center' }
};