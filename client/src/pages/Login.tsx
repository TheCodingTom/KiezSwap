import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const { user, login } = useContext(AuthContext);

  const goToHome = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleEmailInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmail(e.target.value);
    setErrors({
      ...errors,
      email: validateEmail(e.target.value) ? "" : "Invalid email format",
    });
  };

  const handlePasswordInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(e.target.value);
    setErrors({
      ...errors,
      password: validatePassword(e.target.value)
        ? ""
        : "Password must be at least 6 characters",
    });
  };

  const handleSubmitLogin = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!validateEmail(email) || !validatePassword(password)) {
      setErrors({
        email: validateEmail(email) ? "" : "Invalid email format",
        password: validatePassword(password)
          ? ""
          : "Password must be at least 6 characters",
      });
      return;
    }

    if (email && password) {
      login(email, password);
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
      });

      // setTimeout(() => {
      //   goToHome("/");
      // }, 3000);
    }
  };

  return (
    <>
      <h1>Login</h1>

      <div className="form-container">
        <form className="register-form">
          <Form.Group controlId="email">
            <Form.Control
              type="text"
              placeholder="Enter email"
              name="email"
              onChange={handleEmailInputChange}
            />
          </Form.Group>

          {errors.email && errors.email.length > 0 ? (
            <p className="error">{errors.email}</p>
          ) : (
            ""
          )}

          <Form.Group controlId="password">
            <Form.Control
              type="text"
              placeholder="Enter password"
              name="password"
              onChange={handlePasswordInputChange}
            />
          </Form.Group>

          {errors.password && errors.password.length > 0 ? (
            <p className="error">{errors.password}</p>
          ) : (
            ""
          )}
        </form>
        {!errors.email && !errors.password ? (
          <Button onClick={handleSubmitLogin}>Login</Button>
        ) : (
          <Button disabled>Login</Button>
        )}
        <p>
          Don't have an account yet?{" "}
          <Link to="/register">Create one here!</Link>
        </p>
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

      <ToastContainer />
    </>
  );
}

export default Login;
