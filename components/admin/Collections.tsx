import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { api } from '../../api';
import { Collection, Subcategory } from '../../types';
import './admin.css';

export default function Collections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    cover_image: '',
    images: [] as string[],
    video_url: '',
    display_order: 0
  });
  const [uploading, setUploading] = useState(false);

  // Subcategories state
  const [managingCollection, setManagingCollection] = useState<string | null>(null);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [subcategoryForm, setSubcategoryForm] = useState({
    name: '',
    images: [] as string[],
    display_order: 0
  });

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
    
    try {
      if (editingCollection) {
        await api.updateCollection(editingCollection.id, formData);
        alert('Collection updated successfully!');
      } else {
        await api.createCollection(formData);
        alert('Collection created successfully! Now add subcategories with images.');
      }
      
      resetForm();
      loadCollections();
    } catch (error) {
      console.error('Error saving collection:', error);
      alert('Failed to save collection');
    }
  };

  const handleEdit = (collection: Collection) => {
    setEditingCollection(collection);
    setFormData({
      name: collection.name,
      description: collection.description,
      cover_image: collection.cover_image,
      images: collection.images,
      video_url: collection.video_url || '',
      display_order: collection.display_order || 0
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this collection?')) return;

    try {
      await api.deleteCollection(id);
      alert('Collection deleted successfully!');
      loadCollections();
    } catch (error) {
      console.error('Error deleting collection:', error);
      alert('Failed to delete collection');
    }
  };

  const handleCoverImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const result = await api.uploadImage(file);
      setFormData(prev => ({ ...prev, cover_image: result.url }));
    } catch (error) {
      alert('Failed to upload cover image');
    } finally {
      setUploading(false);
    }
  };

  const handleGalleryImagesUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const uploadPromises = files.map(file => api.uploadImage(file));
      const results = await Promise.all(uploadPromises);
      const urls = results.map(r => r.url);
      
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...urls]
      }));
    } catch (error) {
      alert('Failed to upload gallery images');
    } finally {
      setUploading(false);
    }
  };

  const handleVideoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('Video must be under 10MB');
      return;
    }

    setUploading(true);
    try {
      const result = await api.uploadVideo(file);
      setFormData(prev => ({ ...prev, video_url: result.url }));
      alert('Video uploaded successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to upload video');
    } finally {
      setUploading(false);
    }
  };

  const removeGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      cover_image: '',
      images: [],
      video_url: '',
      display_order: 0
    });
    setEditingCollection(null);
    setShowModal(false);
  };

  // Subcategories functions
  const openSubcategoriesModal = async (collectionId: string) => {
    setManagingCollection(collectionId);
    try {
      const data = await api.getSubcategories(collectionId);
      setSubcategories(data);
    } catch (error) {
      console.error('Error loading subcategories:', error);
    }
  };

  const handleSubcategoryImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remaining = 5 - subcategoryForm.images.length;
    
    if (files.length > remaining) {
      alert(`You can only add ${remaining} more image(s)`);
      return;
    }

    setUploading(true);
    try {
      const uploadPromises = files.map(file => api.uploadImage(file));
      const results = await Promise.all(uploadPromises);
      const urls = results.map(r => r.url);
      
      setSubcategoryForm(prev => ({
        ...prev,
        images: [...prev.images, ...urls]
      }));
    } catch (error) {
      alert('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const removeSubcategoryImage = (index: number) => {
    setSubcategoryForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubcategorySubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (subcategoryForm.images.length === 0) {
      alert('Please add at least one image');
      return;
    }

    if (subcategoryForm.images.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }

    try {
      await api.createSubcategory({
        collection_id: managingCollection,
        ...subcategoryForm
      });
      
      alert('Subcategory added successfully!');
      setSubcategoryForm({name: '', images: [], display_order: 0});
      
      const data = await api.getSubcategories(managingCollection!);
      setSubcategories(data);
    } catch (error: any) {
      alert(error.message || 'Failed to add subcategory');
    }
  };

  const handleDeleteSubcategory = async (id: string) => {
    if (!confirm('Delete this subcategory?')) return;

    try {
      await api.deleteSubcategory(id);
      alert('Subcategory deleted!');
      
      const data = await api.getSubcategories(managingCollection!);
      setSubcategories(data);
    } catch (error) {
      alert('Failed to delete subcategory');
    }
  };

  return (
    <div className="admin-main">
      <div className="admin-page-header">
        <h2>Collections Management</h2>
        <button onClick={() => setShowModal(true)} className="admin-btn admin-btn-primary">
          Add New Collection
        </button>
      </div>

      {/* Collections Grid */}
      <div className="admin-collections-grid">
        {collections.map(collection => (
          <div key={collection.id} className="admin-collection-card">
            <img src={collection.cover_image} alt={collection.name} />
            <div className="admin-collection-card-content">
              <h3>{collection.name}</h3>
              <p>{collection.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Order: {collection.display_order || 0} • 
                {collection.video_url && ' 🎥 Video'} • 
                {collection.images.length} images
              </p>
              <div className="admin-collection-card-actions">
                <button onClick={() => openSubcategoriesModal(collection.id)} className="admin-btn admin-btn-secondary">
                  Subcategories
                </button>
                <button onClick={() => handleEdit(collection)} className="admin-btn admin-btn-primary">
                  Edit
                </button>
                <button onClick={() => handleDelete(collection.id)} className="admin-btn admin-btn-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Collection Modal */}
      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3>{editingCollection ? 'Edit Collection' : 'Add New Collection'}</h3>
              <button onClick={resetForm}>×</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="admin-form-group">
                <label>Collection Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Display Order</label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value)})}
                />
                <small>Lower numbers appear first</small>
              </div>

              <div className="admin-form-group">
                <label>Cover Image *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImageUpload}
                  disabled={uploading}
                />
                {formData.cover_image && (
                  <img src={formData.cover_image} alt="Cover" className="admin-image-preview" />
                )}
              </div>

              <div className="admin-form-group">
                <label>Video (Optional - Max 10MB)</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  disabled={uploading}
                />
                {formData.video_url && (
                  <div className="mt-2">
                    <video src={formData.video_url} controls className="w-full max-w-md rounded-lg" />
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, video_url: ''})}
                      className="admin-btn admin-btn-danger mt-2"
                    >
                      Remove Video
                    </button>
                  </div>
                )}
              </div>

              <div className="admin-form-group">
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                  ℹ️ Gallery images are now managed through <strong>Subcategories</strong>. 
                  After creating the collection, click "Subcategories" to add images.
                </p>
              </div>

              <div className="admin-modal-actions">
                <button type="submit" className="admin-btn admin-btn-primary" disabled={uploading}>
                  {uploading ? 'Uploading...' : editingCollection ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={resetForm} className="admin-btn admin-btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Subcategories Modal */}
      {managingCollection && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{maxWidth: '800px'}}>
            <div className="admin-modal-header">
              <h3>Manage Subcategories</h3>
              <button onClick={() => setManagingCollection(null)}>×</button>
            </div>

            <form onSubmit={handleSubcategorySubmit} className="mb-8">
              <div className="admin-form-group">
                <label>Subcategory Name *</label>
                <input
                  type="text"
                  value={subcategoryForm.name}
                  onChange={(e) => setSubcategoryForm({...subcategoryForm, name: e.target.value})}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Images (Max 5) *</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleSubcategoryImageUpload}
                  disabled={subcategoryForm.images.length >= 5 || uploading}
                />
                <small>{subcategoryForm.images.length}/5 images</small>
                
                <div className="admin-image-grid">
                  {subcategoryForm.images.map((img, idx) => (
                    <div key={idx} className="admin-image-item">
                      <img src={img} alt={`Image ${idx + 1}`} />
                      <button type="button" onClick={() => removeSubcategoryImage(idx)}>×</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="admin-form-group">
                <label>Display Order</label>
                <input
                  type="number"
                  value={subcategoryForm.display_order}
                  onChange={(e) => setSubcategoryForm({...subcategoryForm, display_order: parseInt(e.target.value)})}
                />
              </div>

              <div className="admin-modal-actions">
                <button type="submit" className="admin-btn admin-btn-primary" disabled={uploading}>
                  {uploading ? 'Uploading...' : 'Add Subcategory'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setSubcategoryForm({name: '', images: [], display_order: 0})}
                  className="admin-btn admin-btn-secondary"
                >
                  Clear
                </button>
              </div>
            </form>

            <div>
              <h4 className="text-xl font-bold mb-4">Existing Subcategories ({subcategories.length})</h4>
              {subcategories.length === 0 ? (
                <p className="text-gray-500">No subcategories yet. Add one above!</p>
              ) : (
                subcategories.map((sub) => (
                  <div key={sub.id} className="admin-card mb-4">
                    <h5 className="font-bold text-lg">{sub.name}</h5>
                    <p className="text-sm text-gray-600">
                      {sub.images.length} images • Order: {sub.display_order}
                    </p>
                    <div className="admin-image-grid mt-2">
                      {sub.images.map((img, idx) => (
                        <img key={idx} src={img} alt="" className="w-20 h-20 object-cover rounded" />
                      ))}
                    </div>
                    <div className="mt-2">
                      <button 
                        onClick={() => handleDeleteSubcategory(sub.id)}
                        className="admin-btn admin-btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
