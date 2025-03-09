import { TextField } from "@mui/material";
import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { RegisterCredentials } from "../types/customTypes";
import { useNavigate } from "react-router";

function Register() {
  const { register } = useContext(AuthContext);
  const [newUser, setNewUser] = useState<RegisterCredentials | null>(null);
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const goToLogin = useNavigate();

  const validateUsername = (username: string) => {
    return username.length >= 4;
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // regulare expression used to validate emails
    return emailRegex.test(email); // test method checks if the email string matches the pattern
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleRegisterInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(e.target.name);
    console.log(e.target.value);

    setErrors({
      ...errors,
      username: validateUsername(e.target.value)
        ? ""
        : "Username must be at least 4 characters",
      email: validateEmail(e.target.value) ? "" : "Invalid email format",
      password: validatePassword(e.target.value)
        ? ""
        : "Password must be at least 6 characters",
    });

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
            className={
              errors.username && errors.username.length > 0
                ? "errorInput"
                : "input"
            }
          />

          {errors.username && errors.username.length > 0 ? (
            <p className="error">{errors.username}</p>
          ) : (
            ""
          )}

          <TextField
            label="Email"
            variant="outlined"
            name="email"
            onChange={handleRegisterInputChange}
            className={
              errors.email && errors.email.length > 0 ? "errorInput" : "input"
            }
          />

          {errors.email && errors.email.length > 0 ? (
            <p className="error">{errors.email}</p>
          ) : (
            ""
          )}

          <TextField
            label="Password"
            variant="outlined"
            name="password"
            onChange={handleRegisterInputChange}
            className={
              errors.password && errors.password.length > 0
                ? "errorInput"
                : "input"
            }
          />

          {errors.password && errors.password.length > 0 ? (
            <p className="error">{errors.password}</p>
          ) : (
            ""
          )}
        </form>
        <Button onClick={handleSubmitRegister}>Register</Button>
      </div>
    </>
  );
}

export default Register;
