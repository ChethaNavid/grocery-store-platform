import React, { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosInstance';

const AddEditUser = ({
  mode = 'add',
  user = {},
  onClose,
  onSubmit,
}) => {
  const [availablePrivileges, setAvailablePrivileges] = useState([]);
  const [availableTables, setAvailableTables] = useState([]);

  const [formData, setFormData] = useState({
    username: '',
    phoneNumber: '',
    password: '',
    currentPassword: '', // For edit mode
    newPassword: '',     // For edit mode
    privileges: [],
    tables: [],
  });

  // Load privileges and tables from backend
  useEffect(() => {
    const fetchPrivilegesAndTables = async () => {
      try {
        const res = await axiosInstance.get('/database_admin/privileges_and_tables');
        setAvailablePrivileges(res.data.availablePrivileges || []);
        setAvailableTables(res.data.availableTables || []);
      } catch (err) {
        console.error('Failed to fetch privileges and tables:', err);
      }
    };
    fetchPrivilegesAndTables();
  }, []);

  // Populate form when editing a user
  useEffect(() => {
    if (mode === 'edit' && user) {
      setFormData({
        username: user.username || '',
        phoneNumber: user.phoneNumber || '',
        currentPassword: '', // Reset password fields for edit
        newPassword: '',
        privileges: user.privileges || [],
        tables: [], // Clear tables before edit
      });
    } else {
      setFormData({
        username: '',
        phoneNumber: '',
        password: '',
        currentPassword: '',
        newPassword: '',
        privileges: [],
        tables: [],
      });
    }
  }, [mode, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleCheckbox = (type, value) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      privileges: formData.privileges,
      tables: formData.tables,
    };

    if (mode === 'add') {
      payload.username = formData.username;
      payload.phoneNumber = formData.phoneNumber;
      payload.password = formData.password; // Required in add mode
    } else if (mode === 'edit') {
      payload.username = formData.username;
      payload.currentPassword = formData.currentPassword.trim(); // Send currentPassword for validation
      if (formData.newPassword.trim()) {
        payload.newPassword = formData.newPassword.trim(); // Send newPassword if provided
      }
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
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-1">
          <div className='grid grid-cols-2 gap-4'>
          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              disabled={mode === 'edit'}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>
          {/* Password (Add mode only) */}
          {mode === 'add' && (
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
          )}

          {/* Edit Mode - Current Password */}
          {mode === 'edit' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="Enter current password"
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  New Password (leave blank to keep current)
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className="w-full px-3 py-2 border rounded-lg"
                  required={mode === 'edit' && !formData.newPassword.trim()}
                />
              </div>
            </>
          )}

          {/* Privileges */}
          <div>
            <label className="block text-sm font-medium mb-1">MySQL Privileges</label>
            <div className="grid grid-cols-3 gap-2">
              {availablePrivileges.map((priv) => (
                <label key={priv} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.privileges.includes(priv)}
                    onChange={() => toggleCheckbox('privileges', priv)}
                    className="form-checkbox"
                  />
                  <span>{priv}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tables */}
          <div>
            <label className="block text-sm font-medium mb-1">Tables</label>
            <div className="grid grid-cols-3 gap-2">
              {availableTables.map((table) => (
                <label key={table} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.tables.includes(table)}
                    onChange={() => toggleCheckbox('tables', table)}
                    className="form-checkbox"
                  />
                  <span>{table}</span>
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
