import { TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { LoginCredentials } from "../types/customTypes";
import { Link } from "react-router";

function Login() {
  const { user, login, logout } = useContext(AuthContext);

  const [loginCredentials, setLoginCredentials] =
    useState<LoginCredentials | null>(null);

  const handleLoginInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setLoginCredentials({
      ...loginCredentials!,
      [e.target.name]: e.target.value,
    });

    // input validation
  };

  const handleSubmitLogin = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (loginCredentials)
      login(loginCredentials.email, loginCredentials.password);

    // input validation
  };

  const handleSubmitLogout = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    logout()
  };

  return (
    <>
      <h1>Login</h1>

      <div className="form-container">
        <form className="register-form">
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            onChange={handleLoginInputChange}
          />
          <TextField
            label="Password"
            variant="outlined"
            name="password"
            onChange={handleLoginInputChange}
          />

          <Button onClick={handleSubmitLogin}>Login</Button>
          <Button onClick={handleSubmitLogout}>Logout</Button>
          <p>Don't have an account yet? <Link to="/register">Create one here!</Link></p>
        </form>
      </div>

      <div>
        {user && (
          <div>
            <h3>Logged in user: {user.username}</h3>
            <img
              src={user.image}
              alt="avatar image"
              style={{ width: "200px" }}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
