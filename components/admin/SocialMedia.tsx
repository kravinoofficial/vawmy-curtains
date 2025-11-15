import React, { useState, useEffect } from 'react';
import { api } from '../../api';
import { SocialMedia } from '../../types';
import { FiFacebook, FiInstagram, FiTwitter, FiLinkedin, FiYoutube } from 'react-icons/fi';
import './admin.css';

const AdminSocialMedia: React.FC = () => {
  const [socialLinks, setSocialLinks] = useState<SocialMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingLink, setEditingLink] = useState<SocialMedia | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    platform: '',
    url: '',
    icon_name: 'facebook',
    is_visible: true,
    display_order: 0
  });

  const iconOptions = [
    { value: 'facebook', label: 'Facebook', icon: FiFacebook },
    { value: 'instagram', label: 'Instagram', icon: FiInstagram },
    { value: 'twitter', label: 'Twitter', icon: FiTwitter },
    { value: 'linkedin', label: 'LinkedIn', icon: FiLinkedin },
    { value: 'youtube', label: 'YouTube', icon: FiYoutube },
    { value: 'pinterest', label: 'Pinterest', icon: null }
  ];

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const fetchSocialLinks = async () => {
    try {
      const data = await api.getSocialMedia();
      setSocialLinks(data);
    } catch (error) {
      console.error('Error fetching social media:', error);
      alert('Failed to fetch social media links');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingLink) {
        await api.updateSocialMedia(editingLink.id, formData);
        alert('Social media link updated successfully!');
      } else {
        await api.createSocialMedia(formData);
        alert('Social media link created successfully!');
      }

      resetForm();
      fetchSocialLinks();
    } catch (error) {
      console.error('Error saving social media:', error);
      alert('Failed to save social media link');
    }
  };

  const handleEdit = (link: SocialMedia) => {
    setEditingLink(link);
    setIsCreating(true);
    setFormData({
      platform: link.platform,
      url: link.url,
      icon_name: link.icon_name,
      is_visible: link.is_visible,
      display_order: link.display_order
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this social media link?')) return;

    try {
      await api.deleteSocialMedia(id);
      alert('Social media link deleted successfully!');
      fetchSocialLinks();
    } catch (error) {
      console.error('Error deleting social media:', error);
      alert('Failed to delete social media link');
    }
  };

  const toggleVisibility = async (link: SocialMedia) => {
    try {
      await api.updateSocialMedia(link.id, {
        ...link,
        is_visible: !link.is_visible
      });
      fetchSocialLinks();
    } catch (error) {
      console.error('Error toggling visibility:', error);
      alert('Failed to update visibility');
    }
  };

  const resetForm = () => {
    setFormData({
      platform: '',
      url: '',
      icon_name: 'facebook',
      is_visible: true,
      display_order: 0
    });
    setEditingLink(null);
    setIsCreating(false);
  };

  const getIcon = (iconName: string) => {
    const option = iconOptions.find(opt => opt.value === iconName);
    if (option && option.icon) {
      const Icon = option.icon;
      return <Icon size={24} />;
    }
    return iconName;
  };

  if (loading) {
    return <div className="admin-loading">Loading social media links...</div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Social Media Management</h1>
        {!isCreating && (
          <button onClick={() => setIsCreating(true)} className="btn-primary">
            Add Social Media Link
          </button>
        )}
      </div>

      {isCreating && (
        <div className="admin-form-card">
          <h2>{editingLink ? 'Edit Social Media Link' : 'Add New Social Media Link'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Platform Name *</label>
              <input
                type="text"
                name="platform"
                value={formData.platform}
                onChange={handleInputChange}
                placeholder="e.g., Facebook, Instagram"
                required
              />
            </div>

            <div className="form-group">
              <label>URL *</label>
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                placeholder="https://facebook.com/yourpage"
                required
              />
            </div>

            <div className="form-group">
              <label>Icon *</label>
              <select
                name="icon_name"
                value={formData.icon_name}
                onChange={handleInputChange}
                required
              >
                {iconOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Display Order</label>
              <input
                type="number"
                name="display_order"
                value={formData.display_order}
                onChange={handleInputChange}
                min="0"
              />
              <small>Lower numbers appear first</small>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="is_visible"
                  checked={formData.is_visible}
                  onChange={handleInputChange}
                />
                <span>Visible on website</span>
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingLink ? 'Update Link' : 'Add Link'}
              </button>
              <button type="button" onClick={resetForm} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-list">
        <h2>All Social Media Links ({socialLinks.length})</h2>
        {socialLinks.length === 0 ? (
          <p>No social media links yet. Add your first link!</p>
        ) : (
          <div className="social-grid">
            {socialLinks.map(link => (
              <div key={link.id} className={`social-card ${!link.is_visible ? 'hidden-card' : ''}`}>
                <div className="social-card-header">
                  <div className="social-icon">
                    {getIcon(link.icon_name)}
                  </div>
                  <div className="social-info">
                    <h3>{link.platform}</h3>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="social-url">
                      {link.url}
                    </a>
                    <p className="social-meta">Order: {link.display_order}</p>
                  </div>
                </div>
                <div className="social-card-actions">
                  <button
                    onClick={() => toggleVisibility(link)}
                    className={link.is_visible ? 'btn-toggle active' : 'btn-toggle'}
                  >
                    {link.is_visible ? '👁️ Visible' : '🚫 Hidden'}
                  </button>
                  <button onClick={() => handleEdit(link)} className="btn-edit">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(link.id)} className="btn-delete">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSocialMedia;
