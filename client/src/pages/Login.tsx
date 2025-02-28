import { TextField } from "@mui/material";
import React from "react";
import { Button } from "react-bootstrap";

function Login() {
  const handleRegisterInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(e.target.name);
    console.log(e.target.value);
  };
  return (
    <div>
      <h1>Login</h1>

      <div className="form-container">
        <form className="register-form">
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

          <Button>Login</Button>
          <p>Don't have an account yet? Register here then!</p> 
        </form>
      </div>
    </div>
  );
}

export default Login;
