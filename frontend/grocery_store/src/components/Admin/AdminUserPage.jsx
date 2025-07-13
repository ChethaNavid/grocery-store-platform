import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import NavBarAdmin from '../../components/Admin/NavBarAdmin';
import { Pencil, Trash } from 'lucide-react';

// Reusable Button Component
const Button = ({ onClick, type = "button", children, className = '' }) => (
  <button
    onClick={onClick}
    type={type}
    className={`px-3 py-1 rounded font-medium shadow hover:opacity-90 transition ${className}`}
  >
    {children}
  </button>
);

// Edit User Modal
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
      roleId: user?.Role?.id || ''
    });
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    onSave(form);
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Edit User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="border w-full px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          <input
            className="border w-full px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <select
            className="border w-full px-2 py-1 rounded"
            name="roleId"
            value={form.roleId}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
          <div className="flex justify-end gap-3 pt-2">
            <Button onClick={onClose} className="bg-gray-300 text-gray-800">Cancel</Button>
            <Button type="submit" className="bg-blue-600 text-white">Save</Button>
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
      if (response.data?.users) setAllUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const getRoles = async () => {
    try {
      const response = await axiosInstance.get('/database_admin/roles');
      if (response.data?.roles) setRoles(response.data.roles);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const handleEdit = (user) => setEditUser(user);

  const handleSaveEdit = async (form) => {
    console.log("Submitting to backend:", form);
    try {
      const updatedData = {
        username: form.username,
        email: form.email,
        roleId: parseInt(form.roleId)
      };
      await axiosInstance.put(`/database_admin/users/${editUser.id}`, updatedData);
      console.log("Save successful");
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
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <NavBarAdmin />
      <div className="pt-24 max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">User Management</h1>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-200 text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Username</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.length > 0 ? (
                allUsers.map((user) => (
                  <tr key={user.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{user.id}</td>
                    <td className="px-4 py-2">{user.username}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.Role?.name || 'N/A'}</td>
                    <td className="px-4 py-2 text-right space-x-2">
                      <Button onClick={() => handleEdit(user)} className="bg-blue-500 text-white">
                        <Pencil size={16} />
                      </Button>
                      <Button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white">
                        <Trash size={16} />
                      </Button>
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
