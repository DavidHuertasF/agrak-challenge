import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { User } from "../../../types/User";
import { useUsers } from "../../../hooks/useUsers";
import UserForm from "../../components/UseForm/UseForm";

import './EditUser.css'

const EditUser = () => {
  const { id } = useParams();
  const { users, updateUser, deleteUser } = useUsers();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  // find the user data by id from the users state and set it to the user state
  useEffect(() => {
    const currentUser = users.find((user) => user.id === id);
    setUser(currentUser ?? null);
  }, [id, users]);

  // update the user data by calling the updateUser function and invalidate the users query to update the UI
  const handleUpdateUser = async (userData: User) => {
    try {
      await updateUser(userData);
      navigate("/");
    } catch (error) {
      setError((error as Error).message);
    }
  };

  // delete the user data by calling the deleteUser function and invalidate the users query to update the UI
  const handleDeleteUser = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        await deleteUser(id || "");
        navigate("/");
      } catch (error) {
        setError((error as Error).message);
      }
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <h1>Edit User</h1>
      {error && <div className="error">{error}</div>}
      {user && (
        <UserForm
          user={user}
          onSubmit={handleUpdateUser}
          onCancel={handleCancel}
        />
      )}
      <button type="button" onClick={handleDeleteUser} className="delete-btn">
        🗑️
      </button>
    </div>
  );
};

export default EditUser;
