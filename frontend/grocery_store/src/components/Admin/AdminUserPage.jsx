import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import NavBarAdmin from '../../components/Admin/NavBarAdmin';
import { Pencil, Trash } from 'lucide-react';

const IconButton = ({ onClick, children, color = 'bg-gray-200' }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-full hover:opacity-80 transition ${color}`}
  >
    {children}
  </button>
);

const EditUserModal = ({ user, roles, onClose, onSave }) => {
  const [form, setForm] = useState({
    username: user?.username || '',
    email: user?.email || '',
    roleId: user?.Role?.id || '',
  });

  useEffect(() => {
    setForm({
      username: user?.username || '',
      email: user?.email || '',
      roleId: user?.Role?.id || '',
    });
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", form);
    alert("Form submitted");
    onSave(form);
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              name="roleId"
              value={form.roleId}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminUserPage = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [editUser, setEditUser] = useState(null);

  const getUsers = async () => {
    try {
      const response = await axiosInstance.get('/database_admin/users');
      setAllUsers(response.data?.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const getRoles = async () => {
    try {
      const response = await axiosInstance.get('/database_admin/roles');
      setRoles(response.data?.roles || []);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const handleEdit = (user) => setEditUser(user);

  const handleSaveEdit = async (form) => {
    try {
      await axiosInstance.put(`/database_admin/users/${editUser.id}`, {
        username: form.username,
        email: form.email,
        roleId: parseInt(form.roleId),
      });
      setEditUser(null);
      getUsers();
    } catch (error) {
      console.error("Save failed:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axiosInstance.delete(`/admin/users/${userId}`);
      getUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    getUsers();
    getRoles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBarAdmin />
      <div className="pt-24 px-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">User Management</h1>
        <div className="bg-white shadow rounded-xl overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="px-6 py-3 text-left font-medium">ID</th>
                <th className="px-6 py-3 text-left font-medium">Username</th>
                <th className="px-6 py-3 text-left font-medium">Email</th>
                <th className="px-6 py-3 text-left font-medium">Role</th>
                <th className="px-6 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {allUsers.length > 0 ? (
                allUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{user.id}</td>
                    <td className="px-6 py-4">{user.username}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.Role?.name || 'N/A'}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <IconButton onClick={() => handleEdit(user)} color="bg-blue-500 text-white">
                        <Pencil size={18} />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(user.id)} color="bg-red-500 text-white">
                        <Trash size={18} />
                      </IconButton>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {editUser && (
        <EditUserModal
          user={editUser}
          roles={roles}
          onClose={() => setEditUser(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default AdminUserPage;
