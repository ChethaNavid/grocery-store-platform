import React, { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';

const AddEditUser = ({ mode = 'add', user = {}, onClose, onSubmit }) => {
  const availablePrivileges = [
    "SELECT", "INSERT", "UPDATE", "DELETE", "CREATE", "DROP"
  ];

  const [formData, setFormData] = useState({
    username: '',
    phoneNumber: '',
    password: '',
    privileges: [], // array of selected privileges
  });

  useEffect(() => {
    if (mode === 'edit' && user) {
      setFormData({
        username: user.username || '',
        phoneNumber: user.phoneNumber || '',
        password: '', // Don't pre-fill the password
        privileges: user.privileges || [],
      });
    }
  }, [mode, user]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? e.target.files[0] : value,
    }));
  };

  const handlePrivilegeChange = (priv) => {
    setFormData((prev) => {
      const current = prev.privileges || [];
      return {
        ...prev,
        privileges: current.includes(priv)
          ? current.filter((p) => p !== priv)
          : [...current, priv],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append('username', formData.username);
    payload.append('phoneNumber', formData.phoneNumber);
    if (formData.password) payload.append('password', formData.password);

    // Add privileges as a JSON array to the form data
    payload.append('privileges', JSON.stringify(formData.privileges));

    if (mode === 'edit' && user.id) {
      payload.append('id', user.id);
    }

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">
            {mode === 'edit' ? 'Edit User' : 'Add User'}
          </h2>
          <button onClick={onClose} aria-label="Close form">
            <MdClose className="text-gray-500 hover:text-black" size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password {mode === 'edit' && '(leave blank to keep current password)'}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={mode === 'edit' ? '••••••••' : 'Enter password'}
              className="w-full px-3 py-2 border rounded-lg"
              required={mode === 'add'}
            />
          </div>

          {/* Privileges */}
          <div>
            <label className="block text-sm font-medium mb-1">MySQL Privileges</label>
            <div className="grid grid-cols-2 gap-2">
              {availablePrivileges.map((priv) => (
                <label key={priv} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.privileges.includes(priv)}
                    onChange={() => handlePrivilegeChange(priv)}
                    className="form-checkbox"
                  />
                  <span>{priv}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              {mode === 'edit' ? 'Update User' : 'Add User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditUser;
