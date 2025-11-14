const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const getAuthHeader = () => {
  // Get credentials from session storage (set by AuthGuard)
  const authToken = sessionStorage.getItem('admin_auth');
  if (authToken) {
    return 'Basic ' + authToken;
  }
  
  // Fallback to env variables (shouldn't happen if AuthGuard is working)
  const username = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
  const password = import.meta.env.VITE_ADMIN_PASSWORD || 'changeme';
  return 'Basic ' + btoa(`${username}:${password}`);
};

export const api = {
  // Public Collections API (no auth needed)
  getCollections: async () => {
    const res = await fetch(`${API_URL}/api/collections`);
    if (!res.ok) throw new Error('Failed to fetch collections');
    return res.json();
  },

  getCollection: async (id: string) => {
    const res = await fetch(`${API_URL}/api/collections/${id}`);
    if (!res.ok) throw new Error('Failed to fetch collection');
    return res.json();
  },

  createCollection: async (data: any) => {
    const res = await fetch(`${API_URL}/api/collections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthHeader()
      },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  updateCollection: async (id: string, data: any) => {
    const res = await fetch(`${API_URL}/api/collections/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthHeader()
      },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  deleteCollection: async (id: string) => {
    const res = await fetch(`${API_URL}/api/collections/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': getAuthHeader() }
    });
    return res.json();
  },

  // Contact
  getContact: async () => {
    const res = await fetch(`${API_URL}/api/contact`);
    return res.json();
  },

  updateContact: async (data: any) => {
    const res = await fetch(`${API_URL}/api/contact`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthHeader()
      },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Upload
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const res = await fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      headers: { 'Authorization': getAuthHeader() },
      body: formData
    });
    return res.json();
  }
};
