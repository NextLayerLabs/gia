import React, { useState, useEffect } from 'react';
import { saveAgentVerification, watchAgentVerification } from '../firebase/agentVerification';
import '../styles/AgentVerificationForm.css';

const initialState = {
  fullName: '',
  agencyName: '',
  licenseNumber: '',
  file: null,
};

const AgentVerificationForm = ({ user }) => {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState('Pending');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = watchAgentVerification(user.uid, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setStatus(data.status || 'Pending');
      }
    });
    return unsubscribe;
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    try {
      await saveAgentVerification(user.uid, {
        fullName: form.fullName,
        agencyName: form.agencyName,
        licenseNumber: form.licenseNumber,
      }, form.file);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setForm(initialState);
    }
  };

  return (
    <form className="agent-verification-form" onSubmit={handleSubmit}>
      <label>
        Full Name
        <input name="fullName" value={form.fullName} onChange={handleChange} required />
      </label>
      <label>
        Agency Name
        <input name="agencyName" value={form.agencyName} onChange={handleChange} required />
      </label>
      <label>
        License Number
        <input name="licenseNumber" value={form.licenseNumber} onChange={handleChange} required />
      </label>
      <label>
        Upload Document
        <input type="file" name="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleChange} />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      <div className="status">Status: {status}</div>
    </form>
  );
};

export default AgentVerificationForm;
