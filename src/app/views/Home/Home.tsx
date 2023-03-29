import { ReactQueryDevtools } from "react-query/devtools";
import { useUsers } from "../../../hooks/useUsers";
import { Link } from "react-router-dom";
import UserList from "../../components/UserList/UserList";

import "./Home.css";

const Home = () => {
  // Retrieve users and loading state from custom hook
  const { users, isLoading, deleteUser } = useUsers();

  // Callback function to delete a user

  const handleDeleteUser = (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      deleteUser(id);
    }
  };

  return (
    <div className="container">
      <h1>Users</h1>
      {/* Link to create a new user */}
      <Link to="/create-user">➕</Link>

      {/* Render loading spinner if users are still being fetched, or render UserList component with users and handleDeleteUser function */}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <UserList users={users} handleDeleteUser={handleDeleteUser} />
      )}

      {/* React Query Devtools component for debugging */}
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
};

export default Home;
