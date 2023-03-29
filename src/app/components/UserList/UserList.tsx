import { Link } from "react-router-dom";
import { User } from "../../../types/User";
import "./UserList.css";

interface UserListProps {
  users: User[];
  handleDeleteUser: (id: string) => void;
}

const UserList = ({ users, handleDeleteUser }: UserListProps) => {

  if (users.length === 0) {
    return <div>No users found</div>;
  }
  
  return (
    <table className="user-list">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Avatar</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.first_name}</td>
            <td>{user.second_name}</td>
            <td>{user.email}</td>
            <td>
              <img src={user.avatar} alt={user.first_name} />
            </td>
            <td>
              <Link to={`/edit-user/${user.id}`}>
                <button className="action-button edit">✏️</button>
              </Link>
              <button
                className="action-button delete"
                onClick={() => handleDeleteUser(user.id)}
              >
                ❌
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
