import React, { useState } from 'react';

export default function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'Shaheer Ahmed',
    contactNumber: '+92 300 1234567',
    academicYear: '3rd Year (Semester 6)',
    specialization: 'Software Engineering',
    enrollmentId: 'SE-2026-089'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert('Local profile configuration modified and applied successfully.');
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h4 style={styles.sectionHeading}>Academic Registry Profile</h4>
        <button 
          type="button" 
          onClick={() => setIsEditing(!isEditing)} 
          style={isEditing ? styles.cancelBtn : styles.editBtn}
        >
          {isEditing ? 'Discard Changes' : '✏️ Modify Details'}
        </button>
      </div>

      <form onSubmit={handleSaveSubmit} style={styles.form}>
        <div style={styles.grid}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input type="text" name="fullName" value={profile.fullName} onChange={handleInputChange} disabled style={styles.inputDisabled} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>System Enrollment ID</label>
            <input type="text" name="enrollmentId" value={profile.enrollmentId} onChange={handleInputChange} disabled style={styles.inputDisabled} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Contact Phone String</label>
            <input type="text" name="contactNumber" value={profile.contactNumber} onChange={handleInputChange} disabled={!isEditing} style={isEditing ? styles.input : styles.inputDisabled} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Academic Year Cohort</label>
            <input type="text" name="academicYear" value={profile.academicYear} onChange={handleInputChange} disabled={!isEditing} style={isEditing ? styles.input : styles.inputDisabled} />
          </div>
          <div style={styles.inputGroupFull}>
            <label style={styles.label}>Specialization Focus Track</label>
            <input type="text" name="specialization" value={profile.specialization} onChange={handleInputChange} disabled={!isEditing} style={isEditing ? styles.input : styles.inputDisabled} />
          </div>
        </div>

        {isEditing && (
          <button type="submit" style={styles.saveBtn}>
            💾 Apply Portfolio Updates
          </button>
        )}
      </form>
    </div>
  );
}

const styles = {
  card: { backgroundColor: '#fff', padding: '32px', borderRadius: '12px', border: '1px solid #e2e8f0', maxWidth: '750px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
  sectionHeading: { margin: 0, color: '#004124', fontSize: '18px', fontWeight: '600' },
  editBtn: { padding: '8px 14px', backgroundColor: '#e2e8f0', color: '#334155', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' },
  cancelBtn: { padding: '8px 14px', backgroundColor: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  inputGroupFull: { display: 'flex', flexDirection: 'column', gap: '6px', gridColumn: 'span 2' },
  label: { fontSize: '13px', fontWeight: '600', color: '#475569' },
  input: { padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', width: '100%', color: '#0f172a' },
  inputDisabled: { padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', backgroundColor: '#f8fafc', boxSizing: 'border-box', width: '100%', color: '#64748b' },
  saveBtn: { padding: '14px', backgroundColor: '#004124', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '15px', cursor: 'pointer', alignSelf: 'flex-start', boxShadow: '0 4px 6px rgba(0,65,36,0.1)' }
};