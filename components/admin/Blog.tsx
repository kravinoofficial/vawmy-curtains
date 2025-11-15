import React, { useState, useEffect } from 'react';
import { api } from '../../api';
import { BlogPost } from '../../types';
import './admin.css';

const AdminBlog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: 'Vawmy Team',
    cover_image_url: ''
  });
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await api.getBlogPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      alert('Failed to fetch blog posts');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('slug', formData.slug);
      formDataToSend.append('excerpt', formData.excerpt);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('author', formData.author);
      
      if (coverImageFile) {
        formDataToSend.append('cover_image', coverImageFile);
      } else if (formData.cover_image_url) {
        formDataToSend.append('cover_image_url', formData.cover_image_url);
      }

      if (editingPost) {
        await api.updateBlogPost(editingPost.id, formDataToSend);
        alert('Blog post updated successfully!');
      } else {
        await api.createBlogPost(formDataToSend);
        alert('Blog post created successfully!');
      }

      resetForm();
      fetchPosts();
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Failed to save blog post');
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setIsCreating(true);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      cover_image_url: post.cover_image
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      await api.deleteBlogPost(id);
      alert('Blog post deleted successfully!');
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete blog post');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      author: 'Vawmy Team',
      cover_image_url: ''
    });
    setCoverImageFile(null);
    setEditingPost(null);
    setIsCreating(false);
  };

  if (loading) {
    return <div className="admin-loading">Loading blog posts...</div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Blog Management</h1>
        {!isCreating && (
          <button onClick={() => setIsCreating(true)} className="btn-primary">
            Create New Post
          </button>
        )}
      </div>

      {isCreating && (
        <div className="admin-form-card">
          <h2>{editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Slug *</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                required
              />
              <small>URL-friendly version of the title</small>
            </div>

            <div className="form-group">
              <label>Excerpt *</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                rows={3}
                required
              />
              <small>Brief summary for the blog listing page</small>
            </div>

            <div className="form-group">
              <label>Content * (HTML supported)</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={12}
                required
              />
              <small>Use HTML tags for formatting: &lt;h2&gt;, &lt;p&gt;, &lt;strong&gt;, etc.</small>
            </div>

            <div className="form-group">
              <label>Author</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Cover Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {editingPost && !coverImageFile && (
                <div className="image-preview">
                  <img src={formData.cover_image_url} alt="Current cover" />
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Or Cover Image URL</label>
              <input
                type="url"
                name="cover_image_url"
                value={formData.cover_image_url}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingPost ? 'Update Post' : 'Create Post'}
              </button>
              <button type="button" onClick={resetForm} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-list">
        <h2>All Blog Posts ({posts.length})</h2>
        {posts.length === 0 ? (
          <p>No blog posts yet. Create your first post!</p>
        ) : (
          <div className="blog-grid">
            {posts.map(post => (
              <div key={post.id} className="blog-card">
                <img src={post.cover_image} alt={post.title} className="blog-card-image" />
                <div className="blog-card-content">
                  <h3>{post.title}</h3>
                  <p className="blog-meta">
                    By {post.author} • {new Date(post.published_date).toLocaleDateString()}
                  </p>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <div className="blog-card-actions">
                    <button onClick={() => handleEdit(post)} className="btn-edit">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(post.id)} className="btn-delete">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlog;
