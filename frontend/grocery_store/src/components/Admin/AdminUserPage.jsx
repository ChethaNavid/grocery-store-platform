import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import NavBarAdmin from '../../components/Admin/NavBarAdmin';

// Edit User Modal
const EditUserModal = ({ user, roles, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    roleId: user?.Role?.id || '',
  });

  useEffect(() => {
    setForm({
      name: user?.name || '',
      email: user?.email || '',
      roleId: user?.Roleid || '',
    });
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-lg font-bold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Name:
            <input
              className="border w-full px-2 py-1 rounded"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
          <label className="block mb-2">
            Email:
            <input
              className="border w-full px-2 py-1 rounded"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          <label className="block mb-4">
            Role:
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
          </label>
          <div className="flex justify-end gap-2">
            <button type="button" className="px-3 py-1 bg-gray-300 rounded" onClick={onClose}>Cancel</button>
            <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
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

  // Fetch users with joined role table
  const getUsers = async () => {
    try {
      const response = await axiosInstance.get('/database_admin/users'); // Should return users with Role included
      if (response.data?.users) {
        setAllUsers(response.data.users);
      }
    } catch (error) {
      console.log("Unexpected error occurred.");
    }
  };

  // Fetch all roles
  const getRoles = async () => {
    try {
      const response = await axiosInstance.get('/database_admin/roles');
      if (response.data?.roles) {
        setRoles(response.data.roles);
      }
    } catch (error) {
      console.log("Error fetching roles:", error);
    }
  };

  // Edit user
  const handleEdit = (user) => {
    setEditUser(user);
  };

  const handleSaveEdit = async (form) => {
    try {
      await axiosInstance.put(`/admin/users/${editUser.id}`, form);
      setEditUser(null);
      getUsers();
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };

  // Delete user
  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axiosInstance.delete(`/admin/users/${userId}`);
      getUsers();
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  useEffect(() => {
    getUsers();
    getRoles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBarAdmin />
      <div className="pt-24 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">User Management</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user) => (
                <tr key={user.id}>
                  <td className="py-2 px-4 border-b">{user.id}</td>
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.Role ? user.Role.name : 'N/A'}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {allUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
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