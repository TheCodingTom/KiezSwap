import { TextField } from "@mui/material";
import { useContext, useState } from "react";
import { Button } from "react-bootstrap";

import UploadAvatar from "../components/UploadAvatar";
import { AuthContext } from "../context/AuthContext";
import { RegisterCredentials } from "../types/customTypes";
import { useNavigate } from "react-router";

function Register() {
  const { register } = useContext(AuthContext);
  const [newUser, setNewUser] = useState<RegisterCredentials | null>(null);
  const goToLogin = useNavigate();

  const handleRegisterInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(e.target.name);
    console.log(e.target.value);

    setNewUser({ ...newUser!, [e.target.name]: e.target.value });
  };

  const handleSubmitRegister = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (newUser) {
      register(newUser.username, newUser.email, newUser.password);
      goToLogin("/login");
    }
  };

  return (
    <>
      <h1>Register</h1>

      <div className="form-container">
        <form className="register-form">
          <TextField
            label="Username"
            variant="outlined"
            name="username"
            onChange={handleRegisterInputChange}
          />
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            onChange={handleRegisterInputChange}
          />
          <TextField
            label="Password"
            variant="outlined"
            name="password"
            onChange={handleRegisterInputChange}
          />
        </form>
        <Button onClick={handleSubmitRegister}>Register</Button>
      </div>
    </>
  );
}

export default Register;
