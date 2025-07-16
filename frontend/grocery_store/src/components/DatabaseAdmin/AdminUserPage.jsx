import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import NavBarDatabaseAdmin from '../DatabaseAdmin/NavBarDatabaseAdmin';
import AddEditUser from './AddEditUser';
import { Pencil, Trash } from 'lucide-react';

const AdminUserPage = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [availableTables, setAvailableTables] = useState([]);
  const [availablePrivileges, setAvailablePrivileges] = useState([]);
  const [editUser, setEditUser] = useState(false);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getUsers = async () => {
    try {
      const res = await axiosInstance.get('/database_admin/users');
      const filteredUsers = (res.data?.users || []).filter(user => user.Host === '%');
      setAllUsers(filteredUsers);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const getPrivilegesAndTables = async () => {
    try {
      const res = await axiosInstance.get('/database_admin/privileges_and_tables');
      setAvailableTables(res.data.availableTables || []);
      setAvailablePrivileges(res.data.availablePrivileges || []);
    } catch (err) {
      console.error('Error loading tables/privileges:', err);
    }
  };

  const handleAddUser = async (formData) => {
    try {
      await axiosInstance.post('/database_admin/create-user', formData);
      setShowAddUserForm(false);
      setErrorMessage(''); // Clear old error
      getUsers();
    } catch (err) {
      console.error('Add user failed:', err.message);
      window.alert(`ERROR!!!: ${err.response?.data?.message || err.message}`);
    }

  };

  const handleSaveEdit = async (formData) => {
    try {
      await axiosInstance.put(`/database_admin/edit-user/${editUser.username}`, formData);
      setEditUser(false);
      getUsers();
    } catch (err) {
      console.error('Edit user failed:', err.message);
    }
  };

  const handleDelete = async (username) => {
    if (!window.confirm("Are you sure you want to delete this MySQL user and their associated role?")) return;
    try {
      await axiosInstance.delete(`/database_admin/users/${username}`);
      getUsers();
    } catch (err) {
      console.error('Delete user failed:', err);
    }
  };

  useEffect(() => {
    getUsers();
    getPrivilegesAndTables();
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
                <th className="px-6 py-3 text-left font-medium">Privileges</th>
                <th className="px-6 py-3 text-left font-medium">Tables</th>
                <th className="px-6 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {allUsers.length > 0 ? (
                allUsers.map((user, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{user.username}</td>
                    <td className="px-6 py-4">{user.table_privileges || 'N/A'}</td>
                    <td className="px-6 py-4">{user.tables || 'N/A'}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button onClick={() => setEditUser(user)} className="bg-blue-500 text-white p-2 rounded-full">
                        <Pencil size={18} />
                      </button>
                      <button onClick={() => handleDelete(user.username)} className="bg-red-500 text-white p-2 rounded-full">
                        <Trash size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">No users found.</td>
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
          availableTables={availableTables}
          availablePrivileges={availablePrivileges}
          onClose={() => setEditUser(null)}
          onSubmit={handleSaveEdit}
        />
      )}

      {showAddUserForm && (
        <AddEditUser
          mode="add"
          user={{}}
          availableTables={availableTables}
          availablePrivileges={availablePrivileges}
          onClose={() => setShowAddUserForm(false)}
          onSubmit={handleAddUser}
        />
      )}
    </div>
  );
};

export default AdminUserPage;
