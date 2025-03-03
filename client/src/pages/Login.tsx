import { TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { LoginCredentials } from "../types/customTypes";

function Login() {
  const { user } = useContext(AuthContext);

  const [loginCredentials, setLoginCredentials] = useState<LoginCredentials | null>(null);

  const handleLoginInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(e.target.name);
    console.log(e.target.value);
  };

  const handleSubmitLogin = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
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
