import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../../types/User";

import "./UserForm.css";

interface UserFormProps {
  user?: User;
  onSubmit: (user: User) => Promise<void>;
  onCancel?: () => void;
  onDelete?: () => Promise<void>;
}

// Define a default empty user object to use as initial form data
const newUser: User = {
  first_name: "",
  second_name: "",
  email: "",
  avatar: "",
  id: "",
};

const UserForm = ({ user, onSubmit, onCancel }: UserFormProps) => {
  const navigate = useNavigate();
  // Use state to keep track of the form data and any validation errors
  const [formData, setFormData] = useState<User>(user || newUser);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form data and show errors if necessary
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Submit the form data and navigate back to the user list page
    await onSubmit(formData);
    navigate("/");
  };

  // Validate the form data
  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.first_name.trim()) {
      errors.first_name = "First Name is required";
    }

    if (!formData.second_name.trim()) {
      errors.second_name = "Second Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(formData.email.trim())) {
      errors.email = "Please enter a valid email";
    }

    if (!formData.avatar.trim()) {
      errors.avatar = "Avatar URL is required";
    } else if (!isValidUrl(formData.avatar.trim())) {
      errors.avatar = "Please enter a valid URL";
    }

    return errors;
  };

  // Handle changes to the form input values
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData: any) => ({ ...prevFormData, [name]: value }));
  };

  // Validate an email address using a regular expression
  const isValidEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  // Validate a URL using the URL constructor
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleInputChange}
          required
        />
        {errors.first_name && <div className="error">{errors.first_name}</div>}
      </div>
      <div>
        <label htmlFor="second_name">Second Name</label>
        <input
          type="text"
          name="second_name"
          value={formData.second_name}
          onChange={handleInputChange}
          required
        />
        {errors.second_name && (
          <div className="error">{errors.second_name}</div>
        )}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <div>
        <label htmlFor="avatar">Avatar URL</label>
        <input
          type="url"
          name="avatar"
          value={formData.avatar}
          onChange={handleInputChange}
          required
        />
        {errors.avatar && <div className="error">{errors.avatar}</div>}
      </div>
      <button className="submit-button" type="submit">
        Save
      </button>
      {onCancel && (
        <button className="cancel-button" type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
};


export default UserForm;