import React, { useState } from 'react';

export default function UploadLecture() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    studyGroup: '',
    classofStudy: 1
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Lecture object ready for payload submission to API:", formData);
    alert('Lecture published locally! Sending processing matrix vectors to admin portal queues for approval.');
    
    // Reset state inputs cleanly
    setFormData({ title: '', description: '', videoUrl: '', studyGroup: '', classofStudy: 1 });
  };

  return (
    <div style={styles.card}>
      <h4 style={styles.sectionHeading}>Publish a Curriculum Syllabus Matrix</h4>
      
      <form onSubmit={handleFormSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Lecture Title</label>
          <input 
            type="text" 
            name="title" 
            placeholder="e.g., Implementing Relational Database Schemas" 
            value={formData.title} 
            onChange={handleInputChange} 
            required 
            style={styles.input} 
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Lecture Description / Scope Summary</label>
          <textarea 
            name="description" 
            rows="4"
            placeholder="Outline the core learning targets and constraints covered throughout this video reference code structure..." 
            value={formData.description} 
            onChange={handleInputChange} 
            required 
            style={styles.textarea} 
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>YouTube Stream Reference URL Link</label>
          <input 
            type="url" 
            name="videoUrl" 
            placeholder="https://www.youtube.com/watch?v=..." 
            value={formData.videoUrl} 
            onChange={handleInputChange} 
            required 
            style={styles.input} 
          />
          <span style={styles.hint}>Upload your video stream material to your YouTube channel first, then paste the shared link path above.</span>
        </div>

        <div style={styles.rowGrid}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Target Study Group / Cohort Code</label>
            <input 
              type="text" 
              name="studyGroup" 
              placeholder="e.g., Alpha-SE, Gamma-CS" 
              value={formData.studyGroup} 
              onChange={handleInputChange} 
              required 
              style={styles.input} 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Class Semester Sequence (Number Number)</label>
            <select 
              name="classofStudy" 
              value={formData.classofStudy} 
              onChange={handleInputChange} 
              style={styles.select}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>Semester {num}</option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" style={styles.submitBtn}>
          🚀 Broadcast Material to Admin Queues
        </button>
      </form>
    </div>
  );
}

const styles = {
  card: { backgroundColor: '#fff', padding: '32px', borderRadius: '12px', border: '1px solid #e2e8f0', maxWidth: '800px' },
  sectionHeading: { margin: '0 0 24px 0', color: '#004124', fontSize: '18px', fontWeight: '600' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  rowGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  label: { fontSize: '13px', fontWeight: '600', color: '#334155' },
  input: { padding: '12px 16px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box', color: '#0f172a' },
  textarea: { padding: '12px 16px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', outline: 'none', fontFamily: 'inherit', width: '100%', boxSizing: 'border-box', color: '#0f172a', resize: 'vertical' },
  select: { padding: '12px 16px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box', backgroundColor: '#fff', color: '#0f172a' },
  hint: { fontSize: '12px', color: '#64748b', marginTop: '2px' },
  submitBtn: { marginTop: '8px', padding: '14px', backgroundColor: '#004124', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '15px', cursor: 'pointer', alignSelf: 'flex-start', boxShadow: '0 4px 6px rgba(0,65,36,0.1)', transition: 'background 0.2s' }
};