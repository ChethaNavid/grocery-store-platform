import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import NavBarDatabaseAdmin from '../DatabaseAdmin/NavBarDatabaseAdmin';
import AddEditUser from './AddEditUser';
import { Pencil, Trash } from 'lucide-react';

const IconButton = ({ onClick, children, color = 'bg-gray-200' }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-full hover:opacity-80 transition ${color}`}
  >
    {children}
  </button>
);

const AdminUserPage = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [showAddUserForm, setShowAddUserForm] = useState(false);

  const getUsers = async () => {
    try {
      const response = await axiosInstance.get('/database_admin/users');
      const filteredUsers = (response.data?.users || []).filter(user => user.Host === '%');
      setAllUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching MySQL users:", error);
    }
  };

  const handleAddUser = async (formData) => {
    try {
      await axiosInstance.post('/database_admin/create-user', formData);
      setShowAddUserForm(false);
      getUsers();
    } catch (error) {
      console.error("Add MySQL user failed:", error.response?.data || error.message);
    }
  };

  const handleSaveEdit = async (formData) => {
    try {
      await axiosInstance.put(`/database_admin/edit-user/${editUser.username}`, formData);
      setEditUser(null);
      getUsers();
    } catch (error) {
      console.error("Edit MySQL user failed:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (username) => {
    if (!window.confirm("Are you sure you want to delete this MySQL user and their associated role?")) return;
    try {
      // Call your API to delete the user and role
      await axiosInstance.delete(`/database_admin/users/${username}`);
      getUsers();
    } catch (error) {
      console.error("Delete MySQL user failed:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBarDatabaseAdmin />
      <div className="pt-24 px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">MySQL User Management</h1>
          <button
            onClick={() => setShowAddUserForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            + Add User
          </button>
        </div>

        <div className="bg-white shadow rounded-xl overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-200 text-gray-600 text-sm">
              <tr>
                <th className="px-6 py-3 text-left font-medium">Username</th>
                <th className="px-6 py-3 text-left font-medium">Privilege</th>
                <th className="px-6 py-3 text-left font-medium">Table</th>
                <th className="px-6 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {allUsers.length > 0 ? (
                allUsers.map((user, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{user.username}</td>
                    <td className="px-6 py-4">{user.privileges?.join(', ') || 'N/A'}</td>
                    <td className="px-6 py-4">{user.table || 'N/A'}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <IconButton onClick={() => setEditUser(user)} color="bg-blue-500 text-white">
                        <Pencil size={18} />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(user.username)} color="bg-red-500 text-white">
                        <Trash size={18} />
                      </IconButton>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No MySQL users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editUser && (
        <AddEditUser
          mode="edit"
          user={editUser}
          onClose={() => setEditUser(null)}
          onSubmit={handleSaveEdit}
        />
      )}

      {showAddUserForm && (
        <AddEditUser
          mode="add"
          user={{}}  // Empty object for new user
          onClose={() => setShowAddUserForm(false)}
          onSubmit={handleAddUser}
        />
      )}
    </div>
  );
};

export default AdminUserPage;
