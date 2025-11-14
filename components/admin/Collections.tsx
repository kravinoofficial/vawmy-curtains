import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { api } from '../../api';

interface Collection {
  id: string;
  name: string;
  description: string;
  cover_image: string;
  images: string[];
}

export default function Collections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    cover_image: '',
    images: [] as string[]
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadCollections();
  }, []);

  const loadCollections = async () => {
    try {
      const data = await api.getCollections();
      setCollections(data);
    } catch (error) {
      console.error('Error loading collections:', error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.cover_image) {
      alert('Please upload a cover image');
      return;
    }

    if (formData.images.length === 0) {
      alert('Please upload at least one gallery image');
      return;
    }
    
    try {
      if (editingCollection) {
        await api.updateCollection(editingCollection.id, formData);
      } else {
        await api.createCollection(formData);
      }
      
      setShowModal(false);
      setEditingCollection(null);
      setFormData({ name: '', description: '', cover_image: '', images: [] });
      loadCollections();
    } catch (error) {
      console.error('Error saving collection:', error);
      alert('Failed to save collection. Please try again.');
    }
  };

  const handleEdit = (collection: Collection) => {
    setEditingCollection(collection);
    setFormData({
      name: collection.name,
      description: collection.description,
      cover_image: collection.cover_image,
      images: collection.images || []
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this collection?')) {
      try {
        await api.deleteCollection(id);
        loadCollections();
      } catch (error) {
        console.error('Error deleting collection:', error);
        alert('Failed to delete collection. Please try again.');
      }
    }
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>, isCover: boolean) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    setUploading(true);
    try {
      const result = await api.uploadImage(file);
      
      if (result.error) {
        alert(`Upload failed: ${result.error}`);
        return;
      }

      if (isCover) {
        setFormData({ ...formData, cover_image: result.url });
      } else {
        setFormData({ ...formData, images: [...formData.images, result.url] });
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
      // Reset the input
      e.target.value = '';
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  const openAddModal = () => {
    setEditingCollection(null);
    setFormData({ name: '', description: '', cover_image: '', images: [] });
    setShowModal(true);
  };

  return (
    <div>
      <div className="admin-page-header">
        <h2>Collections</h2>
        <button className="admin-btn admin-btn-primary" onClick={openAddModal}>
          Add Collection
        </button>
      </div>

      {collections.length === 0 ? (
        <div className="admin-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: '#666', marginBottom: '1rem' }}>No collections yet. Add your first collection!</p>
        </div>
      ) : (
        <div className="admin-collections-grid">
          {collections.map(collection => (
            <div key={collection.id} className="admin-collection-card">
              <img src={collection.cover_image} alt={collection.name} />
              <div className="admin-collection-card-content">
                <h3>{collection.name}</h3>
                <p>{collection.description}</p>
                <div className="admin-collection-card-actions">
                  <button className="admin-btn admin-btn-primary" onClick={() => handleEdit(collection)}>
                    Edit
                  </button>
                  <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(collection.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingCollection ? 'Edit Collection' : 'Add Collection'}</h3>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="admin-form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Cover Image</label>
                <div className="admin-upload-area">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => handleImageUpload(e, true)}
                    disabled={uploading}
                    className="admin-file-input"
                  />
                  {uploading && <p className="admin-upload-status">Uploading...</p>}
                </div>
                {formData.cover_image && (
                  <div className="admin-image-preview-container">
                    <img src={formData.cover_image} alt="Cover" className="admin-image-preview" />
                    <button 
                      type="button" 
                      className="admin-remove-preview"
                      onClick={() => setFormData({ ...formData, cover_image: '' })}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              <div className="admin-form-group">
                <label>Gallery Images</label>
                <div className="admin-upload-area">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => handleImageUpload(e, false)}
                    disabled={uploading}
                    className="admin-file-input"
                  />
                  {uploading && <p className="admin-upload-status">Uploading...</p>}
                </div>
                <div className="admin-image-grid">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="admin-image-item">
                      <img src={img} alt={`Gallery ${idx}`} />
                      <button type="button" onClick={() => removeImage(idx)}>✕</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="admin-modal-actions">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={uploading}>
                  {uploading ? 'Uploading...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
