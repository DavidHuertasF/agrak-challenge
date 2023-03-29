import { useNavigate } from "react-router-dom";
import { useUsers } from "../../../hooks/useUsers";
import UserForm from "../../components/UseForm/UseForm";

import "./CreateUser.css";

const CreateUser = () => {
  const navigate = useNavigate();
  const { createUser } = useUsers();

  const handleSubmit = async (formData: any) => {
    await createUser(formData);
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <h1>Create User</h1>
      <UserForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
};

export default CreateUser;