import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/LoginRegister.css";

function Login() {
  const { user, login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [type, setType] = useState("password");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  //REVIEW the validating functions could be extracted to another file, for better future maintanability
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

  // const handleToggle = () => {
  //   setType(type === "password" ? "text" : "password");
  // };

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
              className={
                errors.email && errors.email.length > 0 ? "errorInput" : ""
              }
            />
            {errors.email && errors.email.length > 0 ? (
              <p className="error">{errors.email}</p>
            ) : (
              ""
            )}
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Control
              type={"password"}
              placeholder="Enter password"
              name="password"
              onChange={handlePasswordInputChange}
              className={
                errors.password && errors.password.length > 0
                  ? "errorInput"
                  : ""
              }
            />

            {/* <div>
              {type === "password" ? (
                <Button onClick={handleToggle}>Show</Button>
              ) : (
                <Button onClick={handleToggle}>Hide</Button>
              )}
            </div> */}

            {errors.password && errors.password.length > 0 ? (
              <p className="error">{errors.password}</p>
            ) : (
              ""
            )}
          </Form.Group>

          <div className="login-button">
            {!errors.email && !errors.password && !user ? (
              <Button onClick={handleSubmitLogin}>Login</Button>
            ) : (
              <Button disabled>Login</Button>
            )}
          </div>
          <div>
            {!user ? (
              <p>
                Don't have an account yet?{" "}
                <Link className="link-register" to="/register">
                  Create one here!
                </Link>
              </p>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>

      <ToastContainer />
    </>
  );
}

export default Login;
