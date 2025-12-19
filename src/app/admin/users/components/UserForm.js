'use client';
import { useState, useEffect } from 'react';

export default function UserForm({ user, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin',
    status: 'active'
  });

  useEffect(() => {
    if (user) {
      setFormData({ ...user, password: '' });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          className="mt-1 block w-full border rounded-md shadow-sm p-2"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="mt-1 block w-full border rounded-md shadow-sm p-2"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {user ? 'New Password (leave blank to keep current)' : 'Password'}
        </label>
        <input
          type="password"
          className="mt-1 block w-full border rounded-md shadow-sm p-2"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required={!user}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <select
          className="mt-1 block w-full border rounded-md shadow-sm p-2"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          className="mt-1 block w-full border rounded-md shadow-sm p-2"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {user ? 'Update User' : 'Create User'}
        </button>
      </div>
    </form>
  );
}