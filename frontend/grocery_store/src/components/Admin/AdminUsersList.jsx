import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import NavBarAdmin from '../../components/Admin/NavBarAdmin';
import UserCardAdmin from './UserCardAdmin';

const AdminUsersList = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // or 'edit'
  const [selectedUser, setSelectedUser] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    type: "add",
    message: "",
  });

  // Fetch users
  const getUsers = async () => {
    try {
      const response = await axiosInstance.get('/admin/users');
      if (response.data?.users) {
        setAllUsers(response.data.users);
      }
    } catch (error) {
      console.log("Unexpected error occurred.");
    }
  };


  // Search User
  const searchUser = async (query) => {
    try {
      const response = await axiosInstance.get('/admin/search-user', {
        params: { query }
      });
      if (response.data && response.data.users) {
        setAllUsers(response.data.users);
      }
    } catch (error) {
      console.log("Search failed", error);
    }
  };

  // Open Add Modal
  const handleAddUser = () => {
    setSelectedUser(null);
    setModalMode('add');
    setShowModal(true);
  };

  // Open Edit Modal
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setModalMode('edit');
    setShowModal(true);
  };

  // Submit Handler for Add/Edit
  const handleSubmit = async (formData) => {
    try {
      if (modalMode === 'add') {
        await axiosInstance.post('/admin/add-user', formData);
        showToastMessage("User Added Successfully", "success");
      } else if (modalMode === 'edit' && selectedUser?.id) {
        await axiosInstance.put(`/admin/edit-user/${selectedUser.id}`, formData);
        showToastMessage("User Updated Successfully", "success");
      }

      setShowModal(false);
      getUsers();
    } catch (error) {
      console.error("Failed to save user", error);
    }
  };

  // Delete
  const handleDelete = async (user) => {
    try {
      await axiosInstance.delete(`/admin/delete-user/${user.id}`);
      showToastMessage("User Deleted Successfully", "delete");
      getUsers();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="pt-[150px]">
      <NavBarAdmin handleAddProduct={null} />
      <NavBarAdmin handleViewUsers={() => Navigate('/admin/users')} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-5 pb-8">
        {allUsers.map((user) => (
          <UserCardAdmin
            key={user.id}
            user={user}
            onDelete={() => {
              setUserToDelete(user);
              setShowConfirmModal(true);
            }}
          />
        ))}
      </div>
      {/* Add/Edit Modal and Confirm Modal components for users here if you have them */}

      {/* Toast Message */}
      {/* <ToastMessage 
        isShown={showToastMsg.isShown}
        type={showToastMsg.type}
        message={showToastMsg.message}
        onClose={handleCloseToast}
      /> */}
    </div>
  );
};

export default AdminUsersList;
