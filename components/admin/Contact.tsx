import { useState, useEffect } from 'react';
import { api } from '../../api';

export default function Contact() {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    address: '',
    hours: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadContact();
  }, []);

  const loadContact = async () => {
    const data = await api.getContact();
    setFormData({
      email: data.email || '',
      phone: data.phone || '',
      address: data.address || '',
      hours: data.hours || ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await api.updateContact(formData);
      setMessage('Contact information updated successfully!');
    } catch (error) {
      setMessage('Error updating contact information');
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="admin-page-header">
        <h2>Contact Information</h2>
      </div>

      <div className="admin-card" style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="admin-form-group">
            <label>Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <div className="admin-form-group">
            <label>Address</label>
            <textarea
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </div>

          <div className="admin-form-group">
            <label>Business Hours</label>
            <textarea
              value={formData.hours}
              onChange={e => setFormData({ ...formData, hours: e.target.value })}
              required
            />
          </div>

          {message && (
            <div style={{ 
              padding: '1rem', 
              marginBottom: '1rem', 
              background: message.includes('Error') ? '#f8d7da' : '#d4edda',
              color: message.includes('Error') ? '#721c24' : '#155724',
              borderRadius: '4px'
            }}>
              {message}
            </div>
          )}

          <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
